/* eslint-disable @next/next/no-img-element */

// India is filled in brand green directly inside world-map.svg (path.in),
// so the country reads as the marker. The label just points at it. Position
// values are the India bounding-box centre in the SVG's 1010x666 viewBox.
export function WorldMap() {
  return (
    <div>
      <div className="relative mx-auto max-w-2xl">
        <img src="/images/world-map.svg" alt="World map with India highlighted" loading="lazy" className="w-full select-none" />
        <span
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5"
          style={{ left: "71%", top: "61%" }}
          aria-hidden
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary ring-4 ring-primary/15" />
        </span>
        <span
          className="absolute -translate-y-1/2 whitespace-nowrap rounded-full bg-background/80 px-2 py-0.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm"
          style={{ left: "74%", top: "61%" }}
          aria-hidden
        >
          India
        </span>
      </div>
      <p className="mt-5 text-center text-sm text-muted-foreground">
        Formulated and manufactured in India, shipped to buyers worldwide.
      </p>
    </div>
  );
}
