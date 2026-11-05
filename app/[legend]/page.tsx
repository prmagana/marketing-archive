import { getCloudflareContext } from "@opennextjs/cloudflare";
import { notFound } from "next/navigation";
import { legend } from "../legends-data";
import { Nav } from "../nav";

// Read from the bucket on every request, so an upload shows up without a deploy. The catalog is the folder.
export const dynamic = "force-dynamic";

// "halbert-boxtops-1974.png" -> label "halbert-boxtops-1974", year "1974". The filename is the only record yet.
function parse(key: string) {
  const file = key.slice(key.lastIndexOf("/") + 1);
  const label = file.replace(/\.[a-z0-9]+$/i, "");
  const year = label.match(/\b(1[89]\d\d|20\d\d)\b/)?.[1] ?? null;
  return { file, label, year };
}

export default async function Catalog({ params }: PageProps<"/[legend]">) {
  const { legend: route } = await params;
  const who = legend(route);
  if (!who) notFound();

  const { env } = await getCloudflareContext({ async: true });
  const { objects } = await env.CORPUS.list({ prefix: `swipes/${who.slug}/` });
  const ads = objects.map((o) => ({ key: o.key, size: o.size, ...parse(o.key) }));

  return (
    <>
      <Nav />
      <main className="flex-1 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-6xl pt-16 pb-24 sm:pt-24">
          {/* The man's name at the headline size, his count on the right, design's rhythm for a section. */}
          <div className="flex items-baseline justify-between">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{who.name}</h1>
            <span className="text-xl text-muted tabular-nums">{ads.length}</span>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {ads.map(({ key, label, year }) => (
              <li key={key} className="rounded-lg border border-edge bg-surface p-4">
                {/* Scans are tall; a portrait stage with the ad pinned to the top, the way it sat on the page. */}
                <div className="flex aspect-[3/4] items-start justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/${key}`} alt={label} loading="lazy" className="h-full w-full object-contain object-top" />
                </div>
                <p className="mt-3 truncate font-mono text-xs" title={label}>{label}</p>
                <p className="mt-1 font-mono text-xs text-muted tabular-nums">{year ?? "—"}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
