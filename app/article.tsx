import Link from "next/link";
import type { ReactNode } from "react";
import type { Doc } from "./docs";

// The typed memorandum. What a typewriter could do and nothing it could not: one face at one size, ragged
// right, a fixed measure, capitals and underlining for emphasis, numbered paragraphs with a hanging indent,
// two spaces after a sentence. Bold in the markdown becomes underline here, because the machine had no bold.

// Inline subset, same as docs: `code`, [text](href), **bold**.
function inline(text: string): ReactNode[] {
  const re = /(`[^`]+`)|\[([^\]]+)\]\(([^)]+)\)|(\*\*[^*]+\*\*)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(spaced(text.slice(last, m.index)));
    if (m[1]) nodes.push(<span key={m.index}>{m[1].slice(1, -1)}</span>);
    else if (m[2] && m[3]) {
      const href = m[3];
      const cls = "underline underline-offset-4 decoration-1 hover:text-muted";
      nodes.push(
        href.startsWith("/") ? (
          <Link key={m.index} href={href} className={cls}>{m[2]}</Link>
        ) : (
          <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{m[2]}</a>
        ),
      );
    } else if (m[4]) nodes.push(<u key={m.index} className="underline-offset-4 decoration-1">{m[4].slice(2, -2)}</u>);
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(spaced(text.slice(last)));
  return nodes;
}

// Two spaces after a sentence, the typist's habit. Paragraphs render pre-wrap so the second space survives.
const spaced = (s: string) => s.replace(/([.?!])\s+(?=[A-Z"“(])/g, "$1  ");

// Heading text -> anchor id: "The shared model" -> the-shared-model.
const anchor = (text: string) => text.toLowerCase().replace(/[`*[\]()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// A numbered paragraph: the number in its own column, the text hanging under its first letter.
function Numbered({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[4ch_1fr]">
      <span className="select-none">{n}</span>
      <p className="whitespace-pre-wrap">{children}</p>
    </div>
  );
}

const letter = (i: number) => String.fromCharCode(97 + i) + ".";

export function Article({ doc, date }: { doc: Doc; date: string }) {
  // Paragraph numbers, counted once up front so the render callbacks stay pure.
  const numbers: number[] = [];
  let n = 0;
  for (const b of doc.blocks) numbers.push(b.kind === "p" ? ++n : 0);
  return (
    <article className="mx-auto max-w-[68ch] font-mono text-[15px] leading-7 text-foreground">
      {/* Letterhead: the house on the left, the date and the plain copy on the right, two lines of air below. */}
      <div className="flex items-baseline justify-between">
        <span>tapt.marketing</span>
        <span>
          {date}
          {"  "}
          <a href={`/${doc.slug}.md`} className="underline underline-offset-4 decoration-1 hover:text-muted">.md</a>
        </span>
      </div>
      <div className="mt-14 grid grid-cols-[10ch_1fr] gap-y-7">
        <span>SUBJECT:</span>
        <h1 className="uppercase">{doc.title}</h1>
        <span />
        <p className="whitespace-pre-wrap">{spaced(doc.description)}</p>
      </div>
      <div className="mt-14 flex flex-col gap-7">
        {doc.blocks.map((b, i) => {
          switch (b.kind) {
            case "h2":
              return (
                <h2 key={i} id={anchor(b.text)} className="mt-7 scroll-mt-28 uppercase underline underline-offset-4 decoration-1">
                  {inline(b.text)}
                </h2>
              );
            case "h3":
              return <h3 key={i} className="uppercase underline underline-offset-4 decoration-1">{inline(b.text)}</h3>;
            case "p":
              return <Numbered key={i} n={`${numbers[i]}.`}>{inline(b.text)}</Numbered>;
            case "list":
              return (
                <div key={i} className="flex flex-col gap-3 pl-[4ch]">
                  {b.items.map((item, j) => (
                    <Numbered key={j} n={letter(j)}>{inline(item)}</Numbered>
                  ))}
                </div>
              );
          }
        })}
      </div>
    </article>
  );
}
