import { getAllFormsDetails } from "@/lib/typeform";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const forms = await getAllFormsDetails();
    return NextResponse.json(forms);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Can't get forms" }, { status: 500 });
  }
}
