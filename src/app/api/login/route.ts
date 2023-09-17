import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const password = (await request.json()).password;
  if (password === process.env.PASSWORD) {
    const res = NextResponse.json({ success: true }, { status: 200 });
    res.cookies.set({
      name: "pwd",
      value: password,
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict",
    });
    return res;
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
