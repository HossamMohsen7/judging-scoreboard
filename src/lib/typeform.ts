import { Typeform, createClient } from "@typeform/api-client";

const competitionData: { [index: string]: Competition } = {};
const formsIdentifiers: { [key: string]: string } = {};
const typeformAPI = createClient({
  token: process.env.TYPEFORM_PERSONAL_TOKEN,
});

// Get Forms IDs from forms Identifiers if exist, else get from typeform
export const getForms = async () => {
  if (Object.keys(formsIdentifiers).length === 0) {
    const forms = await typeformAPI.forms.list({
      pageSize: 100,
      workspaceId: process.env.TYPEFORM_WORKSPACE_ID,
    });
    forms.items.forEach((form) => {
      formsIdentifiers[form.id] = form.title;
    });
  }
  return Object.keys(formsIdentifiers);
};

const getTeamsNames = (form: Typeform.Form) => {
  const teams = form.fields!.find(
    (field) =>
      field.type === "picture_choice" || field.type === "multiple_choice",
  );
  return teams!.properties!.choices!.reduce((teams: any[], team) => {
    teams.push({
      id: (team as any).id,
      title: team.label,
    });
    return teams;
  }, []);
};

const getCompetitionData = async (formId: string) => {
  if (!competitionData[formId]) {
    const form = await typeformAPI.forms.get({ uid: formId });
    competitionData[formId] = {
      id: formId,
      title: form.title!,
      imageUrl: form.settings?.meta?.image?.href,
      teamsCount: getTeamsNames(form).length,
      numberOfJudges: (form.variables as any).noofjudge ?? 0,
    };
  }

  return competitionData[formId];
};

export const getAllFormsDetails = async () => {
  const formsIds = await getForms();
  const responses = await Promise.all(
    formsIds.map((formId) => getCompetitionData(formId)),
  );
  return responses;
};

export const getCompetitionDetail = async (id: string) => {
  const data = await getCompetitionData(id);
  const form = await typeformAPI.forms.get({ uid: id });

  const criterias: Criteria[] = [];
  const groups = form.fields!.filter((field) => field.type === "group");

  const additionalScoreName = "Additional Score";
  let additionalScoreId = "";

  groups.forEach((group) => {
    const ratings = group!.properties!.fields!.filter(
      (field: any) => field.type === "rating",
    );
    ratings
      .filter((r: any) => r.title !== additionalScoreName)
      .forEach((rating: any) => {
        criterias.push({
          id: rating.id,
          title: rating.title.replaceAll("*", ""),
          max: rating?.properties?.steps,
        });
      });

    const numbers = group!.properties!.fields!.filter(
      (field: any) => field.type === "number",
    );

    additionalScoreId = (
      numbers.find((n: any) => n.title === additionalScoreName) as any
    ).id;

    numbers
      .filter((r: any) => r.title !== additionalScoreName)
      .forEach((number: any) => {
        criterias.push({
          id: number.id,
          title: (number.title as string).replaceAll("*", ""),
          max: number?.validations?.max_value,
        });
      });
  });

  const teams: Team[] = [];
  getTeamsNames(form).forEach((t) =>
    teams.push({
      id: t.id,
      name: t.title,
      responses: [],
      average: 0,
      score: 0,
      averageByCriteria: {},
    }),
  );
  const responses = await typeformAPI.responses.list({
    uid: id,
    pageSize: 750,
  });

  let additonalScores: { [key: string]: number } = {};
  responses.items.forEach((item) => {
    const at = item.submitted_at!;
    const judgeName = item.hidden!.judge;
    const teamId = (
      item.answers!.find((answer) => answer.type === "choice")?.choice as any
    ).id;
    const team = teams.find((team) => team.id == teamId);

    const scores: { [key: string]: number } = {};
    criterias.forEach((c) => {
      const response =
        item.answers!.find((answer) => answer.field!.id === c.id)?.number ?? 0;
      scores[c.id] = response;
    });

    const additonalScore = item.answers!.find(
      (answer) => answer.field!.id === additionalScoreId,
    )?.number;

    if (additonalScore) {
      additonalScores[teamId] = additonalScore;
    }

    //check if judge is duplicated, only take the newest response
    const judgeResponse = team!.responses.find(
      (response) => response.judge === judgeName,
    );
    if (judgeResponse) {
      if (judgeResponse.at > at) {
        return;
      }
      const index = team!.responses.indexOf(judgeResponse);
      team!.responses.splice(index, 1);
    }

    team!.responses.push({ at, judge: judgeName, scores });
  });

  //compute final scores for each team
  for (const team of teams) {
    //Per criteria total
    const criteriaTotal: { [key: string]: number } = {};
    for (const criteria of criterias) {
      criteriaTotal[criteria.id] = 0;
    }

    team.responses.forEach((response) => {
      for (const criteria of criterias) {
        criteriaTotal[criteria.id] += response.scores[criteria.id];
      }
    });

    //Per criteria average
    const criteriaAverage: { [key: string]: number } = {};
    for (const criteria of criterias) {
      if (team.responses.length === 0) {
        criteriaAverage[criteria.id] = 0;
        continue;
      }
      criteriaAverage[criteria.id] =
        criteriaTotal[criteria.id] / team.responses.length;
    }

    team.averageByCriteria = criteriaAverage;

    //sum
    const sum = Object.values(criteriaAverage).reduce(
      (sum, value) => sum + value,
      0,
    );

console.log(additonalScores);
    team.score = sum + 0;
  }

  teams.sort((a, b) => b.score - a.score);
console.log(teams);
  return {
    id,
    imageUrl: data.imageUrl,
    title: data.title,
    numberOfJudges: data.numberOfJudges,
    criterias,
    teams,
    numberOfResponses: responses.items.length,
    average: 0,
  } as CompetitionDetails;
};
