import { Nav } from "./nav";

// Evaluated once at build, so the page reads as the last deploy. In dev it is simply today.
const updated = new Date().toISOString().slice(0, 10);

// Design's opening: headline, subline, the dot. The collection fills in beneath it over time.
export default function Home() {
  return (
    <>
      <Nav />
      {/* Padding outside, column inside, exactly like the nav, so the mark and the text share a left edge. */}
      <main className="flex-1 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-6xl pt-16 pb-24 sm:pt-24">
          {/* Everything softened except the brand word, so "tapt" is the one thing at full ink. */}
          <h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-foreground/70 sm:text-5xl">
            {/* First segment never breaks on wider screens, so marketing always closes line one. */}
            <span className="sm:whitespace-nowrap">The start of a vast “marketing”</span><br />
            source for <span className="text-foreground">tapt</span>.
          </h1>
          {/* What the page is, in two lines: a record of the research, and why the domain is the wrong size for it. */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            What you call marketing, I call one expression of a much older skillset:{" "}
            <em className="text-foreground">Directing Attention</em>. This is a growing corpus of research on the exploration of
            that skillset and how to sharpen it.
          </p>
          <p className="mt-5 flex items-center gap-2.5 font-mono text-xs text-muted">
            {/* The live dot: a solid core and a ring that pings out of it. Still for reduced-motion users. */}
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-emerald-500 motion-safe:animate-ping" />
              <span className="relative size-2 rounded-full bg-emerald-500" />
            </span>
            <span>updated {updated}</span>
          </p>
        </div>
      </main>
    </>
  );
}
