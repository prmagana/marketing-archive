import player from "../content/player.md";
import toolset from "../content/toolset.md";

// The documents: markdown files in content/, imported as strings. The file is the truth, the page and the
// .md mirror are two views of it. Add a file, add a line here.
const SOURCES: { slug: string; md: string }[] = [
  { slug: "toolset", md: toolset },
  { slug: "player", md: player },
];

// The subset the files use: a frontmatter title and description, ## and ### headings, paragraphs, - lists.
// Inline, the renderer understands **bold**, `code` and [text](href). Nothing else, on purpose.
export type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] };

export type Doc = { slug: string; title: string; description: string; md: string; body: string; blocks: Block[] };

function parse(slug: string, md: string): Doc {
  const m = md.match(/^---\n([\s\S]*?)\n---\n/);
  const front = Object.fromEntries(
    (m?.[1] ?? "").split("\n").map((line) => {
      const i = line.indexOf(":");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
  );
  const body = md.slice(m?.[0].length ?? 0).trim();

  const blocks: Block[] = [];
  for (const chunk of body.split(/\n{2,}/)) {
    const text = chunk.trim();
    if (!text) continue;
    if (text.startsWith("### ")) blocks.push({ kind: "h3", text: text.slice(4) });
    else if (text.startsWith("## ")) blocks.push({ kind: "h2", text: text.slice(3) });
    else if (text.startsWith("- ")) blocks.push({ kind: "list", items: text.split("\n").map((l) => l.replace(/^- /, "")) });
    else blocks.push({ kind: "p", text: text.replace(/\n/g, " ") });
  }
  return { slug, title: front.title ?? slug, description: front.description ?? "", md, body, blocks };
}

export const DOCS: Doc[] = SOURCES.map(({ slug, md }) => parse(slug, md));

export const doc = (slug: string) => DOCS.find((d) => d.slug === slug);
