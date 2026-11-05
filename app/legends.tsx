import Link from "next/link";
import { LEGENDS } from "./legends-data";
import { Section } from "./section";
import { Cover, Shade } from "./shapes";

export function Legends() {
  const total = LEGENDS.reduce((n, l) => n + l.count, 0);
  return (
    <Section title="Swipes" count={total}>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {LEGENDS.map(({ slug, route, name, bust, count }) => (
          <li key={slug}>
            {/* The whole card is the link into the man's catalog. */}
            <Link href={`/${route}`} className="block rounded-lg border border-edge bg-surface p-4 transition-colors hover:bg-spot">
              {/* Square stage, bust pinned to the floor so every pair of shoulders sits on the same line. */}
              <div className="flex aspect-square items-end justify-center overflow-hidden">
                {bust ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/legends/${slug}.png`} alt={name} className="h-full w-full object-contain object-bottom" />
                ) : slug === "books" ? (
                  <Cover className="h-3/4 text-edge" />
                ) : (
                  <Shade className="h-full w-full text-edge" />
                )}
              </div>
              <p className="mt-3 truncate font-mono text-xs" title={name}>{name}</p>
              <p className="mt-1 font-mono text-xs text-muted tabular-nums">{count}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
