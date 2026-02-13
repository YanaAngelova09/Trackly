"use client";

import { useState } from "react";
import { useAudd } from "@/hooks/useAudd";

export default function RecognizePage() {
  const { result, loading, error, recognizeByUrl, recognizeByFile, reset } = useAudd();
  const [url, setUrl] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) recognizeByFile(file);
  }

  function handleUrlSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (url.trim()) recognizeByUrl(url.trim());
  }

  return (
    <main className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">Song Recognition</h1>

      {/* URL input */}
      <form onSubmit={handleUrlSubmit} className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste an audio URL..."
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
        >
          Recognize
        </button>
      </form>

      {/* File upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Or upload an audio file</label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          disabled={loading}
          className="text-sm"
        />
      </div>

      {/* States */}
      {loading && <p className="text-gray-500 text-sm">Recognizing...</p>}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="border rounded p-4 space-y-2">
          {result.match ? (
            <>
              <h2 className="font-semibold text-lg">{result.match.title}</h2>
              <p className="text-gray-600">{result.match.artist} · {result.match.album}</p>
              <p className="text-gray-400 text-sm">{result.match.release_date}</p>

              <div className="flex gap-3 pt-2 text-sm">
                {result.spotify && (
                  <a
                    href={(result.spotify as any).external_urls?.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline"
                  >
                    Spotify
                  </a>
                )}
                {result.apple_music && (
                  <a
                    href={(result.apple_music as any).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 underline"
                  >
                    Apple Music
                  </a>
                )}
                {result.youtube && (
                  <a
                    href={(result.youtube as any).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 underline"
                  >
                    YouTube
                  </a>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No song recognized. Try a longer clip.</p>
          )}

          <button onClick={reset} className="text-xs text-gray-400 underline pt-2 block">
            Clear
          </button>
        </div>
      )}
    </main>
  );
}