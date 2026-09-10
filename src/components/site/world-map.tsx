/* eslint-disable @next/next/no-img-element */

// Everything is authored in the base map's 1010 x 666 viewBox so the overlay
// lines up with world-map.svg. Coordinates are country centroids taken from
// that SVG's own paths, so every pin lands on the country, not the sea.
const INDIA = { x: 707, y: 400 };

const DESTINATIONS: Array<[number, number]> = [
  [130, 318], // United States (west)
  [233, 292], // United States (east)
  [187, 394], // Mexico
  [268, 448], // Colombia
  [322, 506], // Brazil
  [466, 274], // United Kingdom
  [490, 291], // Netherlands
  [482, 316], // France
  [452, 350], // Spain
  [510, 333], // Italy
  [529, 292], // Poland
  [455, 369], // Morocco
  [499, 437], // Nigeria
  [581, 462], // Kenya
  [548, 560], // South Africa
  [602, 392], // Saudi Arabia
  [663, 307], // Kazakhstan
  [853, 357], // Japan
  [852, 555], // Australia
];

function arc(dx: number, dy: number) {
  const mx = (INDIA.x + dx) / 2;
  const my = (INDIA.y + dy) / 2;
  const vx = dx - INDIA.x;
  const vy = dy - INDIA.y;
  const len = Math.hypot(vx, vy) || 1;
  // unit perpendicular, forced to point upward so every arc bows north
  let px = -vy / len;
  let py = vx / len;
  if (py > 0) {
    px = -px;
    py = -py;
  }
  const lift = len * 0.22;
  const cx = (mx + px * lift).toFixed(1);
  const cy = (my + py * lift).toFixed(1);
  return `M${INDIA.x} ${INDIA.y} Q${cx} ${cy} ${dx} ${dy}`;
}

function Pin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(0.62)`}>
      <path
        d="M0 0c-3.7-6.6-7-9.2-7-13.2a7 7 0 1 1 14 0c0 4-3.3 6.6-7 13.2Z"
        fill="#1d5327"
      />
      <circle cx="0" cy="-13.2" r="2.5" fill="#eef2e6" />
    </g>
  );
}

export function WorldMap() {
  return (
    <div>
      <div className="relative mx-auto max-w-3xl">
        <img
          src="/images/world-map.svg"
          alt="World map with India highlighted and export routes to buyers worldwide"
          loading="lazy"
          className="w-full select-none"
        />

        <svg
          viewBox="0 0 1010 666"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          {DESTINATIONS.map(([dx, dy], i) => (
            <path
              key={i}
              d={arc(dx, dy)}
              fill="none"
              stroke="#1d5327"
              strokeWidth="1.3"
              strokeOpacity="0.55"
              strokeDasharray="3 3"
              strokeLinecap="round"
            />
          ))}
          {DESTINATIONS.map(([dx, dy], i) => (
            <Pin key={i} x={dx} y={dy} />
          ))}
          <circle cx={INDIA.x} cy={INDIA.y} r="3.4" fill="#1d5327" />
        </svg>

        <span
          className="absolute -translate-y-1/2 whitespace-nowrap rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm"
          style={{ left: "73%", top: "61%" }}
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
