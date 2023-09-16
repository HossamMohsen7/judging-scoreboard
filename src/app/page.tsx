"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ky from "ky";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const password = localStorage.getItem("password");
    if (password) {
      //Check password
      ky.post("/api/login", {
        json: { password: password },
        throwHttpErrors: false,
      }).then((res) => {
        if (res.status == 200) {
          router.push("/scoreboard");
        } else {
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    setError(undefined);
    const res = await ky.post("/api/login", {
      json: { password: password },
      throwHttpErrors: false,
    });
    if (res.status == 200) {
      localStorage.setItem("password", password!);
      router.push("/scoreboard");
    } else {
      setLoading(false);
      setError("Invalid password");
    }
  };
  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center p-24">
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
        <p className="mb-4 text-center text-red-500">{error}</p>
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
