import { useState } from "react";

interface AuddMatch {
  artist: string;
  title: string;
  album: string;
  release_date: string;
  song_link: string;
  timecode: string;
}

interface AuddResult {
  match: AuddMatch | null;
  apple_music: Record<string, unknown> | null;
  spotify: Record<string, unknown> | null;
  youtube: Record<string, unknown> | null;
  message?: string;
}

interface UseAuddReturn {
  result: AuddResult | null;
  loading: boolean;
  error: string | null;
  recognizeByUrl: (url: string) => Promise<void>;
  recognizeByFile: (file: File) => Promise<void>;
  reset: () => void;
}

export function useAudd(): UseAuddReturn {
  const [result, setResult] = useState<AuddResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setResult(null);
    setError(null);
    setLoading(false);
  }

  async function recognizeByUrl(url: string) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/recognize/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Recognition failed");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function recognizeByFile(file: File) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
      form.append("audio", file);

      const res = await fetch("/api/recognize/file", {
        method: "POST",
        body: form,
        // Don't set Content-Type manually — browser sets it with the boundary automatically
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Recognition failed");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return { result, loading, error, recognizeByUrl, recognizeByFile, reset };
}