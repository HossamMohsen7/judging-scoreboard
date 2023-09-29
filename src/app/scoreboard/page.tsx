import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CompetitionCard from "@/containers/CompetitionCard";
import { getAllFormsDetails } from "@/lib/typeform";
import ky from "ky";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/env.mjs";

export default async function Scoreboard() {
  const forms = await getAllFormsDetails();
  const c = cookies();
  if (!c.has("pwd")) {
    redirect("/");
  }

  if (c.get("pwd")?.value !== process.env.PASSWORD) {
    redirect("/");
  }

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
          Welcome to {env.NEXT_PUBLIC_TITLE} Judging Dashboard
        </h1>
        <h1 className="mb-6 text-center text-4xl font-bold">Competition:</h1>
      </div>
      <div className="grid gap-7 md:grid-cols-1 lg:grid-cols-3">
        {forms.map((form) => (
          <CompetitionCard form={form} key={form.id} />
        ))}
      </div>
    </main>
  );
}
