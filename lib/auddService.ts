const AUDD_API_URL = "https://api.audd.io/";
const RETURN_FIELDS = "apple_music,spotify,youtube";

export interface AuddMatch {
  artist: string;
  title: string;
  album: string;
  release_date: string;
  song_link: string;
  timecode: string;
}

export interface AuddResult {
  match: AuddMatch;
  apple_music: Record<string, unknown> | null;
  spotify: Record<string, unknown> | null;
  youtube: Record<string, unknown> | null;
}

/**
 * Recognize a song by a publicly accessible audio URL.
 */
export async function recognizeByUrl(audioUrl: string): Promise<AuddResult | null> {
  const form = new FormData();
  form.append("url", audioUrl);
  form.append("return", RETURN_FIELDS);
  form.append("api_token", process.env.AUDD_API_TOKEN!);

  const response = await fetch(AUDD_API_URL, { method: "POST", body: form });

  if (!response.ok) {
    throw new Error(`audD network error: ${response.status}`);
  }

  return handleAuddResponse(await response.json());
}

/**
 * Recognize a song from a Blob or File (used when the user uploads audio).
 */
export async function recognizeByFile(
  file: Blob,
  filename: string = "audio.mp3"
): Promise<AuddResult | null> {
  const form = new FormData();
  form.append("file", file, filename);
  form.append("return", RETURN_FIELDS);
  form.append("api_token", process.env.AUDD_API_TOKEN!);

  const response = await fetch(AUDD_API_URL, { method: "POST", body: form });

  if (!response.ok) {
    throw new Error(`audD network error: ${response.status}`);
  }

  return handleAuddResponse(await response.json());
}

/**
 * Validates the audD response and returns a clean result object.
 * Returns null if no song was matched (not an error — just no result).
 */
function handleAuddResponse(data: any): AuddResult | null {
  if (data.status !== "success") {
    const errMsg = data.error?.error_message ?? "Unknown audD error";
    const errCode = data.error?.error_code ?? "UNKNOWN";
    const error = new Error(errMsg);
    (error as any).code = errCode;
    throw error;
  }

  if (!data.result) return null;

  const { artist, title, album, release_date, song_link, timecode,
          apple_music, spotify, youtube } = data.result;

  return {
    match: { artist, title, album, release_date, song_link, timecode },
    apple_music: apple_music ?? null,
    spotify:     spotify     ?? null,
    youtube:     youtube     ?? null,
  };
}