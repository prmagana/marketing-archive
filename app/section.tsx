import type { ReactNode } from "react";

// Heading with the count on the right, the Nexvyn rhythm.
export function Section({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <span className="text-xl text-muted tabular-nums">{count}</span>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

// One cell of a grid: a preview on top, mono label, then who uses it. Shared by icons and swatches.
export function Cell({ preview, label, repos }: { preview: ReactNode; label: string; repos: string[] }) {
  return (
    <li className="rounded-lg border border-edge bg-surface p-4">
      <div className="flex h-10 items-center justify-center">{preview}</div>
      <p className="mt-3 truncate font-mono text-xs" title={label}>{label}</p>
      <p className="mt-1 truncate font-mono text-xs text-muted">{repos.join(" ")}</p>
    </li>
  );
}

export const grid = "grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6";
