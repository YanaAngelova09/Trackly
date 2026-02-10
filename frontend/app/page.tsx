import TrackCard from "../components/TrackCard";
import { recentTracks } from "../data/mockTracks";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* HERO HEADER */}
    <div className="mb-10 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        <span className="text-[var(--accent)]">Trackly</span>
      </h1>

      <h2 className="mt-4 text-[var(--muted)] font-semibold">
        Identify any song instantly
      </h2>


    </div>



        {/* LISTEN SECTION */}
        <section
          className="relative mt-10 rounded-2xl border px-6 py-14 backdrop-blur-xl overflow-visible"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            

            <p className="mt-3 text-sm text-[var(--muted)]">
              Tap listen to recognize a song and get official access.
            </p>

            {/* LISTEN BUTTON */}
            <div className="mt-10 relative flex items-center justify-center z-10">
              <div className="absolute h-72 w-72 rounded-full listenGlow"></div>
              <div className="absolute h-56 w-56 rounded-full listenRing"></div>

              <button className="relative flex h-36 w-36 items-center justify-center rounded-full listenButton">
                LISTEN
              </button>
            </div>

            <button className="mt-6 text-xs text-white/60 hover:text-white">
              Upload audio file
            </button>
          </div>
        </section>

        {/* RECENT HISTORY */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/90">Recent</h2>
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
