import { Typeform, createClient } from "@typeform/api-client";

const responsesData: any = {};
const formsIdentifiers: { [key: string]: string } = {};
let ratingQuestions: any[] = [];

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
      console.log(form.id, form.title);
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
    console.log(team);
    teams.push({
      id: (team as any).id,
      title: team.label,
    });
    return teams;
  }, []);
};

const getFormPref = async (formId: string) => {
  const form = await typeformAPI.forms.get({ uid: formId });
  // handle form not found
  responsesData[formId] = {
    id: formId,
    title: form.title,
    teams: getTeamsNames(form),
    variables: form.variables,
  };

  return responsesData[formId];
};

export const getAllFormsDetails = async () => {
  const formsIds = await getForms();
  const responses = await Promise.all(
    formsIds.map((formId) => getFormPref(formId)),
  );
  return responses;
};

const setRatingQuestions = (form: Typeform.Form) => {
  ratingQuestions = [];

  // Get all Groups fields and loop on it
  const groups = form.fields!.filter((field) => field.type === "group");
  groups.forEach((group) => {
    // Get all rating fields and loop on it
    const ratings = group.properties!.fields!.filter(
      (field: any) => field.type === "rating",
    );
    ratings.forEach((rating: any) => {
      ratingQuestions.push({
        id: rating.id,
        title: rating.title,
        max: rating?.properties?.steps,
      });
    });
  });

  return ratingQuestions;
};

export const getFormDetails = async (formId: string) => {
  const form = await typeformAPI.forms.get({ uid: formId });
  // handle form not found
  responsesData[formId] = {
    id: formId,
    title: form.title,
    teams: getTeamsNames(form),
    ratingQuestions: setRatingQuestions(form),
    variables: form.variables,
  };

  await getFormResponses(formId);

  return responsesData[formId];
};

const getFormResponses = async (formId: string) => {
  const responses = await typeformAPI.responses.list({
    uid: formId,
    pageSize: 750,
  });

  responses.items.forEach((response) => {
    const teamId = (
      response.answers!.find((answer) => answer.type === "choice") as any
    )?.choice?.id;
    if (teamId) {
      const team = responsesData[formId].teams.find(
        (team: any) => team.id === teamId,
      );
      team.responses = team.responses || [];
      team.responses.push({
        // return question id and title, rating answer and max rating
        judge: response.hidden?.judge,
        answers: response
          .answers!.filter((answer) => answer.field!.type === "rating")
          .map((answer) => ({
            id: answer.field!.id,
            rating: answer.number,
          })),
      });
    }
  });
};
