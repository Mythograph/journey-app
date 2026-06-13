// Cosmic Core — centers diagram for "The Shape of My Energy".
//
// A compact bodygraph that shows only the nine centers, colored by definition
// (defined / undefined / open) and marking any center where a conscious light
// (Sun or Earth) lands in non-defined ground — the "defining gift in open
// ground" motif the section's prose turns on. Geometry mirrors the chart
// engine's bodygraph so the two read as the same body. Pure SVG string output.

import type { CenterName, CenterStatus } from "./centers.js";
import type { CenterState } from "./narrative.js";

type Shape = "tri-up" | "tri-down" | "square" | "diamond";

const POS: Record<CenterName, [number, number]> = {
  Head: [310, 68], Ajna: [310, 190], Throat: [310, 325], G: [310, 472],
  Ego: [462, 378], Sacral: [310, 628], SolarPlexus: [462, 504],
  Spleen: [158, 504], Root: [310, 762],
};
const CENTER_R: Record<CenterName, number> = {
  Head: 50, Ajna: 50, Throat: 54, G: 60, Ego: 38,
  Sacral: 64, SolarPlexus: 56, Spleen: 56, Root: 52,
};
const CENTER_SHAPE: Record<CenterName, Shape> = {
  Head: "tri-up", Ajna: "tri-down", Throat: "square", G: "diamond",
  Ego: "square", Sacral: "square", SolarPlexus: "tri-up", Spleen: "tri-up", Root: "square",
};
const CENTER_LABEL: Record<CenterName, string> = {
  Head: "head", Ajna: "ajna", Throat: "throat", G: "G", Ego: "ego",
  Sacral: "sacral", SolarPlexus: "solar plexus", Spleen: "spleen", Root: "root",
};

// Palette.
const TERRA = "#C05A3C";     // defined
const GOLD = "#C8A24A";      // prominent gift / undefined accent
const UNDEF_FILL = "#EFE6D6";
const OPEN_STROKE = "#D8CFC2";
const INK = "#1A1410";
const MUTED = "#7A6D5E";
const LIGHT = "#FAF7F0";

const f = (n: number) => Math.round(n * 10) / 10;

function shapeAttrs(cx: number, cy: number, s: Shape, r: number): string {
  if (s === "square")
    return `<rect x="${f(cx - r)}" y="${f(cy - r)}" width="${r * 2}" height="${r * 2}" rx="4"`;
  if (s === "diamond")
    return `<polygon points="${f(cx)},${f(cy - r)} ${f(cx + r)},${f(cy)} ${f(cx)},${f(cy + r)} ${f(cx - r)},${f(cy)}"`;
  if (s === "tri-up")
    return `<polygon points="${f(cx)},${f(cy - r)} ${f(cx + r)},${f(cy + r)} ${f(cx - r)},${f(cy + r)}"`;
  return `<polygon points="${f(cx)},${f(cy + r)} ${f(cx + r)},${f(cy - r)} ${f(cx - r)},${f(cy - r)}"`;
}

function fillFor(status: CenterStatus): string {
  if (status === "defined") return TERRA;
  if (status === "undefined") return UNDEF_FILL;
  return "#FFFFFF";
}
function strokeFor(status: CenterStatus, prominent: boolean): string {
  if (prominent) return GOLD;
  if (status === "defined") return TERRA;
  if (status === "undefined") return GOLD;
  return OPEN_STROKE;
}

export function buildCentersDiagram(centers: CenterState[]): string | null {
  if (!centers || centers.length === 0) return null;
  const byName = new Map(centers.map(c => [c.name, c]));

  const parts: string[] = [];

  for (const name of Object.keys(POS) as CenterName[]) {
    const state = byName.get(name);
    const status: CenterStatus = state?.status ?? "open";
    const prominent = (state?.prominent ?? []);
    const [cx, cy] = POS[name];
    const r = CENTER_R[name];
    const shape = CENTER_SHAPE[name];
    const hasProm = prominent.length > 0;

    // Shape.
    const strokeW = hasProm ? 3 : status === "open" ? 1.5 : 2;
    parts.push(shapeAttrs(cx, cy, shape, r) + ` fill="${fillFor(status)}" stroke="${strokeFor(status, hasProm)}" stroke-width="${strokeW}"/>`);

    // Center label, inside the shape.
    const labelColor = status === "defined" ? LIGHT : MUTED;
    const labelY = shape === "tri-up" ? cy + 14 : shape === "tri-down" ? cy - 4 : cy + 4;
    parts.push(`<text x="${cx}" y="${labelY}" text-anchor="middle" font-size="13" fill="${labelColor}" font-family="'DM Sans', sans-serif">${CENTER_LABEL[name]}</text>`);

    // Prominent gate badges, to the outer side of the shape.
    if (hasProm) {
      const dir = cx < 300 ? -1 : 1; // Spleen sits left; badge outward
      prominent.forEach((p, i) => {
        const bx = cx + dir * (r + 16) + dir * i * 30;
        parts.push(`<circle cx="${f(bx)}" cy="${cy}" r="13" fill="${GOLD}"/>`);
        parts.push(`<text x="${f(bx)}" y="${cy + 4}" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}" font-family="'DM Sans', sans-serif">${p.gate}</text>`);
      });
    }
  }

  // Legend.
  const legendY = 850;
  const legend = (x: number, fill: string, stroke: string, label: string): string =>
    `<rect x="${x}" y="${legendY}" width="18" height="18" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="2"/>` +
    `<text x="${x + 26}" y="${legendY + 14}" font-size="13" fill="${MUTED}" font-family="'DM Sans', sans-serif">${label}</text>`;
  parts.push(legend(70, TERRA, TERRA, "defined"));
  parts.push(legend(220, UNDEF_FILL, GOLD, "undefined (carries a gate)"));
  parts.push(legend(470, "#FFFFFF", OPEN_STROKE, "open"));

  return (
    `<svg viewBox="0 0 620 884" role="img" aria-label="My centers" ` +
    `style="width:100%;height:auto;display:block">${parts.join("")}</svg>`
  );
}
