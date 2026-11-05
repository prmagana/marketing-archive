import { Nav } from "./nav";

// Design's opening, one headline and nothing under it yet. The collection fills in beneath it over time.
export default function Home() {
  return (
    <>
      <Nav />
      {/* Padding outside, column inside, exactly like the nav, so the mark and the text share a left edge. */}
      <main className="flex-1 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-6xl pt-16 pb-24 sm:pt-24">
          {/* Everything softened except the brand word, so "tapt" is the one thing at full ink. */}
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground/70 sm:text-5xl">
            The energy marketing pulls from, collected for{" "}
            <span className="text-foreground">tapt</span>.
          </h1>
        </div>
      </main>
    </>
  );
}
