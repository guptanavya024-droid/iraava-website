const CAPABILITIES = [
  "100+ formulations",
  "GMP-compliant manufacturing",
  "Private-label and custom formulation",
  "Low starting MOQs",
  "Stability and microbiological testing",
  "Multiple packaging formats",
  "Made in India",
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="marquee-track flex shrink-0 items-center gap-0"
      aria-hidden={ariaHidden || undefined}
    >
      {CAPABILITIES.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="mx-8 h-1 w-1 rounded-full bg-primary-foreground/40" />
          <span className="text-sm font-medium tracking-wide text-primary-foreground/90">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Deep-green capability band. A slow infinite ticker rather than a static
// grid of identical leaf icons: it reads as a running spec line, and the
// motion ties into the rest of the page. Pauses on hover; static wrap under
// prefers-reduced-motion (the track animation is disabled and the second
// copy simply continues the line).
export function CapabilityMarquee() {
  return (
    <div className="marquee-mask relative flex overflow-hidden border-y border-primary-foreground/10 bg-primary py-4">
      <Row />
      <Row ariaHidden />
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-primary to-transparent" />
    </div>
  );
}
