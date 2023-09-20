interface Competition {
  id: string;
  title: string;
  teamsCount: number;
  imageUrl?: string;
  numberOfJudges: number;
}

interface CompetitionDetails {
  id: string;
  title: string;
  imageUrl?: string;
  numberOfJudges: number;
  teams: Team[];
  criterias: Criteria[];
  numberOfResponses: number;
}

interface Team {
  id: string;
  name: string;
  responses: TeamResponse[];
  average: number;
  score: number;
  averageByCriteria: { [criteriaId: string]: number };
  additionalScore: number;
  maxScore: number;
}

interface Criteria {
  id: string;
  title: string;
  max: number;
  groupName: string;
}

interface TeamResponse {
  at: string;
  judge: string;
  scores: { [criteriaId: string]: number };
}
