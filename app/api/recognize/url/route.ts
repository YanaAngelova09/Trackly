import { NextRequest, NextResponse } from "next/server";
import { recognizeByUrl } from "@/lib/auddService";

export async function POST(req: NextRequest) {
  // Parse the JSON body
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { url } = body;

  if (!url) {
    return NextResponse.json({ error: "Missing required field: url" }, { status: 400 });
  }

  // Validate URL format
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  try {
    const result = await recognizeByUrl(url);

    if (!result) {
      return NextResponse.json({ match: null, message: "No song recognized" });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[audD /url]", err.message);
    return NextResponse.json(
      { error: "audD recognition failed", details: err.message, code: err.code ?? null },
      { status: 502 }
    );
  }
}