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
            <span className="text-xl">{team.averageByCriteria[c.id]}</span>
            <span className="text-muted-foreground">/{c.max}</span>
          </p>
        ))}
        <p>{/* {form.teamsCount} Teams & {form.numberOfJudges} Judges */}</p>
      </CardContent>
      <CardFooter className="text-lg">Score: {team.score}</CardFooter>
    </Card>
  );
}
