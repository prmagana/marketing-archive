import Link from "next/link";
import { shelves, type Book, type Ink } from "./books";
import { DOCS } from "./docs";
import { Legends } from "./legends";
import { Nav } from "./nav";
import { Pillars } from "./pillars";
import { Section } from "./section";

// Inlined at build from next.config.ts, so the page reads as the last deploy. In dev it is simply today.
const updated = process.env.BUILD_DATE!;

// Design's opening: headline, subline, the dot. The collection fills in beneath it over time.
export default function Home() {
  return (
    <>
      <Nav />
      {/* Padding outside, column inside, exactly like the nav, so the mark and the text share a left edge. */}
      <main className="flex-1 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-6xl pt-16 pb-24 sm:pt-24">
          {/* Everything softened except the brand word, so "tapt" is the one thing at full ink. */}
          <h1 className="max-w-4xl text-[1.625rem] font-semibold leading-tight tracking-tight text-foreground/70 sm:text-5xl">
            {/* Wide: the first segment holds and a break puts marketing at the end of line one. Phone: no break,
                natural wrap, and "for tapt." travels as one piece so the brand never sits alone on a line. */}
            <span className="sm:whitespace-nowrap">The start of a vast “marketing”</span>
            <br className="hidden sm:inline" />{" "}
            source{" "}
            <span className="whitespace-nowrap">
              for <span className="text-foreground">tapt</span>.
            </span>
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
          {/* The tools, left to right in the order a funnel meets them, one per document in content/. Docs' tab
              row in Courier, minus the bar: dim at rest, full ink and an underline on hover. */}
          <nav aria-label="Tools" className="mt-16 flex flex-wrap items-center gap-6">
            {DOCS.map((d) => (
              <Link key={d.slug} href={`/${d.slug}`} className="inline-flex h-9 select-none items-center whitespace-nowrap border-b border-transparent font-mono text-sm font-bold text-foreground/60 transition-colors hover:border-foreground/30 hover:text-foreground hover:transition-none">
                {d.title}
              </Link>
            ))}
          </nav>
          {/* The shelves, design's rhythm: a heading with the count on the right, then the titles as a plain list. */}
          {shelves.map(({ title, books }) => (
            <Section key={title} title={title} count={books.filter(Boolean).length}>
              <ul className="font-mono text-xs">
                {books.map((book: Book, i) => {
                  if (book === null) return <li key={i} className="h-6" />;
                  const [title, ink, href]: [string, Ink?, string?] =
                    typeof book === "string" ? [book] : Array.isArray(book) ? book : [book.title, book.ink, book.href];
                  return (
                    <li key={title} className={`border-b border-edge py-2 ${ink === "light" ? "text-foreground/30" : ink === "mid" ? "text-foreground/60" : ""}`}>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-1">{title}</a>
                      ) : (
                        title
                      )}
                    </li>
                  );
                })}
              </ul>
            </Section>
          ))}
          <Legends />
          <Pillars />
        </div>
      </main>
    </>
  );
}
