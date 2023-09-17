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

export default function CompetitionCard({ form }: { form: Competition }) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/scoreboard/${form.id}`);
  };

  return (
    <Card className="cursor-pointer bg-black text-white" onClick={onClick}>
      <CardHeader>
        <CardTitle>
          <Image
            src={form.imageUrl!}
            width={200}
            height={200}
            alt={form.title}
          />
        </CardTitle>
        <CardDescription className="text-lg text-inherit">
          {form.title}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {form.teamsCount} Teams & {form.numberOfJudges} Judges
        </p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>Click to view</p>
      </CardFooter>
    </Card>
  );
}
