import { Section } from "./section";

// One model, drawn once, meant to grow. Two pillars so far, mirrored around the circles: influence above the
// filled circle, its mode above its name and its definition above that; perception below the hollow circle,
// name, then mode, then definition. The words are verbatim.
// Each definition is three pairs of words, read left to right with a divider between the pairs.
const INFLUENCE = { name: "Influence", mode: "active", definition: ["Placing signal", "into context", "to impress."] };
const PERCEPTION = { name: "Perception", mode: "passive", definition: ["Observing signal", "within context", "to understand."] };

// The pairs in a row, a hairline between them.
function Definition({ pairs, className = "" }: { pairs: string[]; className?: string }) {
  return (
    <p className={`flex flex-wrap justify-center divide-x divide-edge text-base leading-relaxed text-foreground/70 ${className}`}>
      {pairs.map((pair) => (
        <span key={pair} className="px-4">{pair}</span>
      ))}
    </p>
  );
}

// One circle. Hollow is a stroke with nothing inside; filled is solid. Never translucent.
function Circle({ filled, className = "" }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <circle cx="50" cy="50" r="44" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="6" />
    </svg>
  );
}

export function Pillars() {
  return (
    <Section title="Influencing Perception" centered>
      {/* A single figure down the middle of the page. The two circles touch at the center; the words fan out from them. */}
      <figure className="mx-auto flex max-w-xl flex-col items-center text-center">
        <Definition pairs={INFLUENCE.definition} />
        <p className="mt-6 font-mono text-xs text-muted">{INFLUENCE.mode}</p>
        <p className="mt-2 font-mono text-xs">{INFLUENCE.name}</p>
        <Circle filled className="mt-6 size-16 text-foreground" />
        <Circle filled={false} className="mt-4 size-16 text-foreground" />
        <p className="mt-6 font-mono text-xs">{PERCEPTION.name}</p>
        <p className="mt-2 font-mono text-xs text-muted">{PERCEPTION.mode}</p>
        <Definition pairs={PERCEPTION.definition} className="mt-6" />
      </figure>
    </Section>
  );
}
