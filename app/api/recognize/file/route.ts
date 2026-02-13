import { NextRequest, NextResponse } from "next/server";
import { recognizeByFile } from "@/lib/auddService";

// Tell Next.js not to parse the body — we handle it as FormData ourselves
export const runtime = "nodejs";

const ALLOWED_TYPES = ["audio/mpeg", "audio/mp4", "audio/wav", "audio/ogg", "audio/flac", "audio/webm"];
const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20MB

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
  }

  const file = formData.get("audio");

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      { error: 'No audio file found. Send the file under the field name "audio".' },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: `Unsupported audio type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(", ")}` },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 20MB." },
      { status: 400 }
    );
  }

  const filename = (file as File).name ?? "audio.mp3";

  try {
    const result = await recognizeByFile(file, filename);

    if (!result) {
      return NextResponse.json({ match: null, message: "No song recognized" });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[audD /file]", err.message);
    return NextResponse.json(
      { error: "audD recognition failed", details: err.message, code: err.code ?? null },
      { status: 502 }
    );
  }
}