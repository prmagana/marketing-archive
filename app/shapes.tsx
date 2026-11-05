// Stand-ins for a face and a cover, one solid shape each in the edge grey. Never translucent.

// Head and shoulders, where a bust will go.
export function Shade({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" className={className}>
      <circle cx="50" cy="34" r="20" />
      <path d="M 8 100 C 8 74 26 62 50 62 C 74 62 92 74 92 100 Z" />
    </svg>
  );
}

// A closed book seen from the front, a hair of spine on the left.
export function Cover({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 75 100" fill="currentColor" aria-hidden="true" className={className}>
      <rect x="0" y="0" width="6" height="100" rx="1" />
      <rect x="9" y="0" width="66" height="100" rx="3" />
    </svg>
  );
}
