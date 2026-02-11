"use client";
import TrackCard from "../components/TrackCard";
import { recentTracks } from "../data/mockTracks";
import { useState } from "react";


export default function Home() {
  const [listening, setListening] = useState(false);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* HERO */}
        <section className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(124,92,255,0.9)]" />
            Music recognition • Legal access • History
          </div>

          <h1 className="mt-7 text-5xl font-semibold tracking-tight">
            <span className="text-[var(--accent)] drop-shadow-[0_0_18px_rgba(124,92,255,0.35)]">
              Trackly
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
            Identify songs in seconds and instantly open the official source —
            Spotify, YouTube Music, Apple Music — plus keep a clean history of your
            recognitions.
          </p>

          
        </section>

        {/* LISTEN SECTION */}
        <section
          className="relative mt-10 overflow-visible rounded-2xl border px-6 py-14 backdrop-blur-xl"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Music recognition
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white/90">
              One tap. Full result.
            </h2>

            <p className="mt-6 max-w-md text-sm text-[var(--muted)] leading-relaxed">
  Tap Listen to recognize a song and get official access immediately.
</p>


            
            <div className="relative mt-20 mb-16 flex items-center justify-center">

  {/* huge ambient glow */}
  <div className="absolute h-[420px] w-[420px] rounded-full listenAura"></div>

  {/* outer breathing ring */}
  <div className="absolute h-[300px] w-[300px] rounded-full listenWave"></div>

  {/* inner pulse */}
  <div className="absolute h-[220px] w-[220px] rounded-full listenRing"></div>

  {/* button */}
  <button
    onClick={() => setListening(!listening)}
    className={`relative z-10 flex h-40 w-40 items-center justify-center rounded-full listenButton ${
      listening ? "listeningActive" : ""
    }`}
  >
    {listening ? "LISTENING..." : "LISTEN"}
  </button>

</div>



            {/* SECONDARY ACTIONS */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 transition hover:bg-white/10">
                Upload audio file
              </button>

              <button className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/70 transition hover:bg-white/5">
                View recognition tips
              </button>
            </div>
          </div>
        </section>

        {/* RECENT HISTORY */}
        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white/90">Recent</h3>
              <p className="mt-1 text-xs text-white/55">
                Your latest recognized tracks
              </p>
            </div>

            <button className="text-xs text-white/60 hover:text-white/90">
              View all
            </button>
          </div>

          <div className="space-y-3">
            {recentTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
