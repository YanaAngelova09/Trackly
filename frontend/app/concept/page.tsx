export default function ConceptPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-white">
      {/* HERO */}
      <section className="mb-20 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">
          Trackly Concept
        </p>

        <h1
          className="mt-6 text-5xl font-semibold tracking-tight"
          style={{
            background: "linear-gradient(90deg,#9b8cff,#6c4dff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Music recognition should not end with recognition.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
          Most applications tell you what song is playing. Trackly tells you what to do next.
        </p>
      </section>

      {/* CORE IDEA */}
      <section className="mb-16 rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <h2 className="mb-4 text-2xl font-semibold">The Core Idea</h2>

        <p className="leading-relaxed text-white/75">
          Trackly is designed around a simple principle: recognition is not the final goal — access is.
          The user does not just want a song title. The user wants to listen to it immediately, safely and legally.
        </p>

        <p className="mt-4 leading-relaxed text-white/75">
          Instead of forcing users to search across multiple platforms, Trackly becomes a bridge between
          identification and consumption. One action leads directly to the official source.
        </p>
      </section>

      {/* DESIGN PHILOSOPHY */}
      <section className="mb-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <h3 className="mb-2 font-semibold">Minimal Interaction</h3>
          <p className="text-sm leading-relaxed text-white/70">
            The interface focuses on a single primary action: Listen. No complex menus, no distractions.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <h3 className="mb-2 font-semibold">Instant Result</h3>
          <p className="text-sm leading-relaxed text-white/70">
            The user receives meaningful output immediately, not just data but usable actions.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <h3 className="mb-2 font-semibold">Legal First</h3>
          <p className="text-sm leading-relaxed text-white/70">
            Every recognized track leads to an official platform, encouraging artist support instead of piracy.
          </p>
        </div>
      </section>

      {/* USER FLOW */}
      <section className="mb-16 rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <h2 className="mb-6 text-2xl font-semibold">User Flow</h2>

        <div className="grid gap-4 text-center text-sm text-white/80 md:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-black/20 p-5">Hear music</div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-5">Tap Listen</div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-5">Identify Track</div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-5">Open Official Source</div>
        </div>
      </section>

      {/* VISION */}
      <section className="text-center">
        <h2 className="mb-4 text-2xl font-semibold">Long-term Vision</h2>

        <p className="mx-auto max-w-2xl leading-relaxed text-white/70">
          Trackly aims to evolve from a recognition tool into a music discovery platform.
          Future versions may include personalized libraries, artist profiles, recommendations and listening analytics.
        </p>
      </section>
    </main>
  );
}
