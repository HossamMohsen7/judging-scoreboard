"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TeamCard({
  team,
  criteria,
  position,
  judges,
}: {
  team: Team;
  criteria: Criteria[];
  position: number;
  judges: number;
}) {
  return (
    <Card className=" bg-black text-white">
      <CardHeader>
        <CardTitle>
          {position}. {team.name}
        </CardTitle>
        <CardDescription className="text-lg text-inherit">
          {team.responses.length}/{judges} Judges Responded
        </CardDescription>
      </CardHeader>
      <CardContent>
        {criteria.map((c) => (
          <p className="py-3" key={c.id}>
            <strong>{c.title}:</strong>{" "}
            <span className="text-xl">
              {team.averageByCriteria[c.id].toPrecision(3)}
            </span>
            <span className="text-muted-foreground">/{c.max}</span>
          </p>
        ))}
        <p className="py-3">
            <strong>Additional Score:</strong>{" "}
            <span className="text-xl">
              {team.additionalScore.toPrecision(3)}
            </span>
          </p>
        <p>{/* {form.teamsCount} Teams & {form.numberOfJudges} Judges */}</p>
      </CardContent>
      <CardFooter className="text-lg">
        Score: {team.score.toPrecision(3)}/{team.maxScore} = {((team.score / team.maxScore) * 100).toPrecision(3)}%
      </CardFooter>
    </Card>
  );
}
