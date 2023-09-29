import TeamCard from "@/containers/TeamCard";
import { env } from "@/lib/env.mjs";
import { getCompetitionDetail } from "@/lib/typeform";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function CompetitionDetails({
  params,
}: {
  params: { id: string };
}) {
  const c = cookies();
  if (!c.has("pwd")) {
    redirect("/");
  }

  if (c.get("pwd")?.value !== env.PASSWORD) {
    redirect("/");
  }

  const data = await getCompetitionDetail(params.id);
  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={env.NEXT_PUBLIC_LOGO_URL}
          alt="logo"
          width={400}
          height={400}
          className="mb-8"
        />
        <h1 className="pb-10 text-center text-4xl font-bold">
          {env.NEXT_PUBLIC_TITLE} Judging Dashboard
        </h1>
        <h1 className="mb-6 pb-6 text-center text-4xl font-bold">
          {data.title} Teams:
        </h1>
      </div>
      <div className="grid gap-7 md:grid-cols-1 lg:grid-cols-3">
        {data.teams.map((team) => (
          <TeamCard
            team={team}
            criteria={data.criterias}
            position={data.teams.indexOf(team) + 1}
            key={team.id}
            judges={data.numberOfJudges}
          />
        ))}
      </div>
    </main>
  );
}
