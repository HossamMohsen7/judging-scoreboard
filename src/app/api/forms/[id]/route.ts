import { getFormDetails } from "@/lib/typeform";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const formResponses = await getFormDetails(params.id);
    return NextResponse.json(formResponses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Can't get form" }, { status: 500 });
  }
}
