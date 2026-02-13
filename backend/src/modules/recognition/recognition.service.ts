import { parseBuffer } from "music-metadata";
import Tesseract from "tesseract.js";
import { lookupSongByTitleAndArtist } from "./providers/audd.provider";

export type RecognitionSource = "provider" | "ocr_fallback";

export type SongMetadata = {
  songName: string;
  artist: string;
  album: string;
  genre: string;
  platformLinks: {
    appleMusic?: string;
    preview?: string;
  };
  releaseYear: number | null;
  source: RecognitionSource;
};

type OcrCandidateMetadata = {
  songName: string;
  artist: string;
  album: string;
};

const UNKNOWN_METADATA: OcrCandidateMetadata = {
  songName: "Unknown Song",
  artist: "Unknown Artist",
  album: "Unknown Album",
};

function normalize(text: string): string {
  return text
    .replace(/[|]/g, "I")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

function toFallbackResponse(metadata: OcrCandidateMetadata): SongMetadata {
  return {
    ...metadata,
    genre: "Unknown Genre",
    platformLinks: {},
    releaseYear: null,
    source: "ocr_fallback",
  };
}

function parseFromFilename(filename: string): OcrCandidateMetadata {
  const cleaned = filename.replace(/\.[^/.]+$/, "").replace(/[_]+/g, " ").trim();
  const separators = [" - ", " – ", " — "];

  for (const separator of separators) {
    if (cleaned.includes(separator)) {
      const [artist, songName] = cleaned.split(separator).map((part) => part.trim());
      if (songName && artist) {
        return { songName, artist, album: UNKNOWN_METADATA.album };
      }
    }
  }

  return {
    ...UNKNOWN_METADATA,
    songName: cleaned || UNKNOWN_METADATA.songName,
  };
}

function extractSongMetadata(ocrText: string): OcrCandidateMetadata {
  const normalizedText = normalize(ocrText);
  const lines = normalizedText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const songLine = lines.find((line) => /^song\s*:/i.test(line));
  const artistLine = lines.find((line) => /^artist\s*:/i.test(line));
  const albumLine = lines.find((line) => /^album\s*:/i.test(line));

  const songName = songLine?.split(/:/).slice(1).join(":").trim() || lines[0] || UNKNOWN_METADATA.songName;
  const artist = artistLine?.split(/:/).slice(1).join(":").trim() || lines[1] || UNKNOWN_METADATA.artist;
  const album = albumLine?.split(/:/).slice(1).join(":").trim() || lines[2] || UNKNOWN_METADATA.album;

  return {
    songName: songName || UNKNOWN_METADATA.songName,
    artist: artist || UNKNOWN_METADATA.artist,
    album: album || UNKNOWN_METADATA.album,
  };
}

async function canonicalizeFromProvider(candidate: OcrCandidateMetadata): Promise<SongMetadata> {
  const providerResult = await lookupSongByTitleAndArtist(candidate.songName, candidate.artist);

  if (!providerResult) {
    return toFallbackResponse(candidate);
  }

  return {
    songName: providerResult.songName,
    artist: providerResult.artist,
    album: providerResult.album,
    genre: providerResult.genre,
    platformLinks: providerResult.platformLinks,
    releaseYear: providerResult.releaseYear,
    source: "provider",
  };
}

export async function recognizeSongFromAudio(buffer: Buffer, originalName: string): Promise<SongMetadata> {
  try {
    const metadata = await parseBuffer(buffer);
    const songName = metadata.common.title?.trim();
    const artist = metadata.common.artist?.trim();
    const album = metadata.common.album?.trim();

    if (songName || artist || album) {
      return toFallbackResponse({
        songName: songName || UNKNOWN_METADATA.songName,
        artist: artist || UNKNOWN_METADATA.artist,
        album: album || UNKNOWN_METADATA.album,
      });
    }
  } catch {
    // If audio tags cannot be parsed, fallback to file name extraction.
  }

  return toFallbackResponse(parseFromFilename(originalName));
}

export async function recognizeSongFromImage(buffer: Buffer): Promise<SongMetadata> {
  const ocrResult = await Tesseract.recognize(buffer, "eng");
  const candidate = extractSongMetadata(ocrResult.data.text);
  return canonicalizeFromProvider(candidate);
}
