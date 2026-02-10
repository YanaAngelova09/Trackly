export default function FuturePage() {
  const roadmap = [
    {
      tag: "Phase 1",
      title: "MVP → Solid core",
      text: "Stabilize recognition flow, improve UI responsiveness, and make the demo experience flawless.",
      items: ["UI polish & accessibility", "Better history (filters, search)", "Performance + caching"],
    },
    {
      tag: "Phase 2",
      title: "Integrations → Official sources",
      text: "Deepen platform integration to make the ‘legal access’ part truly instant and reliable.",
      items: ["Spotify/Apple/YouTube deep links", "Artist pages + metadata enrichment", "Reliable license labeling"],
    },
    {
      tag: "Phase 3",
      title: "Library → Personal experience",
      text: "Turn Trackly into a personal music assistant with collections and user accounts.",
      items: ["User profiles", "Saved tracks & playlists", "Sync across devices"],
    },
    {
      tag: "Phase 4",
      title: "Discovery → Smart recommendations",
      text: "Move from recognition to discovery: help users find more music they’ll love.",
      items: ["Recommendations", "Similar tracks/artists", "Listening insights"],
    },
  ];

  const pillars = [
    {
      title: "Legal-first by design",
      text: "We intentionally route users to official platforms to support artists and reduce piracy.",
    },
    {
      title: "Minimal interaction",
      text: "One main action. Everything else is clarity: result, links, and history — no clutter.",
    },
    {
      title: "Scalable architecture",
      text: "Clear separation between UI, APIs, and integrations so the product can grow without rewriting.",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-10 py-14 backdrop-blur-xl">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--accent)]/25 blur-3xl" />
        <div className="absolute -bottom-44 -right-32 h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(124,92,255,0.9)]" />
            The Future • Roadmap • Vision
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight">
            Where{" "}
            <span className="text-[var(--accent)] drop-shadow-[0_0_18px_rgba(124,92,255,0.35)]">
              Trackly
            </span>{" "}
            goes next
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-white/65 leading-relaxed">
            Our demo is the beginning. The long-term plan is to evolve Trackly from a
            recognition tool into a legal-first music assistant and discovery platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85">
              Roadmap
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              Integrations
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              Library
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              Discovery
            </span>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mt-14 grid gap-6 md:grid-cols-3">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition hover:bg-white/10"
          >
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </section>

      {/* ROADMAP TITLE */}
      <section className="mt-16 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">Roadmap</p>
        <h2 className="mt-4 text-3xl font-semibold">A clear path, step by step</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/65 leading-relaxed">
          Each phase builds on the previous one: first perfect the core experience, then expand
          integrations, then add personalization, then unlock discovery.
        </p>
      </section>

      {/* ROADMAP GRID */}
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {roadmap.map((r) => (
          <div
            key={r.title}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <div className="absolute -top-24 -left-20 h-60 w-60 rounded-full bg-[var(--accent)]/18 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                {r.tag}
              </div>

              <h3 className="mt-4 text-2xl font-semibold">{r.title}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{r.text}</p>

              <ul className="mt-6 space-y-2 text-sm text-white/70">
                {r.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(124,92,255,0.7)]" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* FINAL IMPRESSION / CTA */}
      <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
        <h2 className="text-3xl font-semibold">Final note</h2>
        <p className="mx-auto mt-4 max-w-3xl text-white/70 leading-relaxed">
          Trackly is built with a clear philosophy: make music recognition useful, safe and legal.
          Our roadmap proves this is not just a demo — it’s a product direction with growth potential.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm hover:bg-white/10"
          >
            Back to App
          </a>

          <a
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm text-white/85 hover:bg-white/10"
          >
            Back to App
          </a>

          <a
            href="/idea"
            className="rounded-full border border-white/10 bg-[var(--accent)]/20 px-6 py-2 text-sm text-white hover:bg-[var(--accent)]/30"
          >
            Revisit the Idea
          </a>
        </div>
      </section>
    </main>
  );
}
