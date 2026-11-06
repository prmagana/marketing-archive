import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Article } from "../article";
import { doc } from "../docs";
import { HIDDEN, legend } from "../legends-data";
import { Nav } from "../nav";
import { Cover } from "../shapes";

// One segment under the root, two kinds of page behind it: a document from content/ (/toolset) or a shelf
// read from the bucket (/halbert). The catalogs read R2 on every request, so an upload shows without a deploy.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = doc(slug);
  if (d) return { title: d.title, description: d.description };
  const who = legend(slug);
  return who ? { title: who.name } : {};
}

// "halbert-boxtops-1974.png" -> label "halbert-boxtops-1974", year "1974". "book-great-leads.pdf" -> "great-leads".
// The filename is the only record yet.
function parse(key: string) {
  const file = key.slice(key.lastIndexOf("/") + 1);
  const pdf = /\.pdf$/i.test(file);
  const label = file.replace(/\.[a-z0-9]+$/i, "").replace(/^book-/, "");
  const year = label.match(/\b(1[89]\d\d|20\d\d)\b/)?.[1] ?? null;
  return { file, pdf, label, year };
}

const mb = (bytes: number) => `${(bytes / 1048576).toFixed(1)} MB`;

// The nav and the column every page under the root shares with the home.
function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-6xl pt-16 pb-24 sm:pt-24">{children}</div>
      </main>
    </>
  );
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;

  const d = doc(slug);
  if (d) {
    return (
      <Shell>
        <Article doc={d} date={process.env.BUILD_DATE!} />
      </Shell>
    );
  }

  const who = legend(slug);
  if (!who) notFound();

  const { env } = await getCloudflareContext({ async: true });
  const { objects } = await env.CORPUS.list({ prefix: who.prefix });
  const items = objects.filter((o) => !HIDDEN.has(o.key)).map((o) => ({ key: o.key, size: o.size, ...parse(o.key) }));

  return (
    <Shell>
      {/* The shelf's name at the headline size, its count on the right, design's rhythm for a section. */}
      <div className="flex items-baseline justify-between">
        <h1 className="text-[1.625rem] font-semibold leading-tight tracking-tight sm:text-5xl">{who.name}</h1>
        <span className="text-xl text-muted tabular-nums">{items.length}</span>
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map(({ key, size, pdf, label, year }) =>
          pdf ? (
            // A book: a solid cover for a face, the size where an ad would show its year. The card opens the PDF.
            <li key={key}>
              <a href={`/corpus/${key}`} className="block rounded-lg border border-edge bg-surface p-4 transition-colors hover:bg-spot">
                <div className="flex aspect-[3/4] items-center justify-center overflow-hidden">
                  <Cover className="h-3/4 text-edge" />
                </div>
                <p className="mt-3 truncate font-mono text-xs" title={label}>{label}</p>
                <p className="mt-1 font-mono text-xs text-muted tabular-nums">{mb(size)}</p>
              </a>
            </li>
          ) : (
            <li key={key} className="rounded-lg border border-edge bg-surface p-4">
              {/* Scans are tall; a portrait stage with the ad pinned to the top, the way it sat on the page. */}
              <div className="flex aspect-[3/4] items-start justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/corpus/${key}`} alt={label} loading="lazy" className="h-full w-full object-contain object-top" />
              </div>
              <p className="mt-3 truncate font-mono text-xs" title={label}>{label}</p>
              <p className="mt-1 font-mono text-xs text-muted tabular-nums">{year ?? "—"}</p>
            </li>
          ),
        )}
      </ul>
    </Shell>
  );
}
