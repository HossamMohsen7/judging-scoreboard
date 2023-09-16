"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    setLoading(true);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/white_logo.png"
          alt="logo"
          width={400}
          height={400}
          className="mb-8"
        />
        <h1 className="mb-4 text-center text-4xl font-bold">
          Welcome to IEEE Victoris 2.0 Judging Dashboard
        </h1>
        <p className="mb-8 text-center text-xl">Please enter your password</p>
        <Input
          disabled={loading}
          type="password"
          className="mb-4 w-60 rounded-full border bg-transparent p-2"
          onChange={onPasswordChange}
        />
        <Button disabled={loading} onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </main>
  );
}
