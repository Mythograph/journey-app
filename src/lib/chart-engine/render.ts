import type { CenterName } from "./types.js";
import { CHANNELS, CENTER_GATES } from "./data.js";

// ── Layout constants ──────────────────────────────────────────────────────────
// SVG viewBox: 0 0 400 560

const W = 400;
const H = 560;

// Center anchor points [cx, cy]
const CENTER_POS: Record<CenterName, [number, number]> = {
  Head:        [200,  36],
  Ajna:        [200,  96],
  Throat:      [200, 172],
  G:           [200, 264],
  Ego:         [136, 232],
  Sacral:      [200, 356],
  SolarPlexus: [288, 310],
  Spleen:      [112, 310],
  Root:        [200, 444],
};

// Center shape sizes
const SQ = 40;   // square half-size
const TRI = 26;  // triangle half-width

// Colors
const DEFINED_FILL   = "#3b2f6e";  // deep indigo
const UNDEFINED_FILL = "none";
const DEFINED_STROKE = "#3b2f6e";
const UNDEFINED_STROKE = "#8b8ba0";
const CHANNEL_DEFINED = "#3b2f6e";
const CHANNEL_UNDEF   = "#d0cee0";
const GATE_ACTIVE_P   = "#3b2f6e";  // personality (black)
const GATE_ACTIVE_D   = "#c0392b";  // design (red)
const GATE_ACTIVE_B   = "#6a1da0";  // both
const LABEL_DEF   = "#fff";
const LABEL_UNDEF = "#8b8ba0";

// ── Shape helpers ─────────────────────────────────────────────────────────────

function square(
  cx: number, cy: number, defined: boolean, label: string,
): string {
  const fill   = defined ? DEFINED_FILL   : UNDEFINED_FILL;
  const stroke = defined ? DEFINED_STROKE : UNDEFINED_STROKE;
  const lcolor = defined ? LABEL_DEF      : LABEL_UNDEF;
  const x = cx - SQ, y = cy - SQ;
  return [
    `<rect x="${x}" y="${y}" width="${SQ * 2}" height="${SQ * 2}"`,
    ` fill="${fill}" stroke="${stroke}" stroke-width="1.5" rx="3"/>`,
    `<text x="${cx}" y="${cy + 5}" text-anchor="middle"`,
    ` font-size="11" font-family="sans-serif" fill="${lcolor}">${label}</text>`,
  ].join("");
}

function triangle(
  cx: number, cy: number, defined: boolean, label: string,
  pointUp = true,
): string {
  const fill   = defined ? DEFINED_FILL   : UNDEFINED_FILL;
  const stroke = defined ? DEFINED_STROKE : UNDEFINED_STROKE;
  const lcolor = defined ? LABEL_DEF      : LABEL_UNDEF;
  const pts = pointUp
    ? `${cx},${cy - TRI} ${cx + TRI},${cy + TRI} ${cx - TRI},${cy + TRI}`
    : `${cx},${cy + TRI} ${cx + TRI},${cy - TRI} ${cx - TRI},${cy - TRI}`;
  return [
    `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`,
    `<text x="${cx}" y="${cy + (pointUp ? 10 : -2)}" text-anchor="middle"`,
    ` font-size="10" font-family="sans-serif" fill="${lcolor}">${label}</text>`,
  ].join("");
}

function diamond(
  cx: number, cy: number, defined: boolean, label: string,
): string {
  const fill   = defined ? DEFINED_FILL   : UNDEFINED_FILL;
  const stroke = defined ? DEFINED_STROKE : UNDEFINED_STROKE;
  const lcolor = defined ? LABEL_DEF      : LABEL_UNDEF;
  const s = SQ - 4;
  const pts = `${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`;
  return [
    `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`,
    `<text x="${cx}" y="${cy + 4}" text-anchor="middle"`,
    ` font-size="11" font-family="sans-serif" fill="${lcolor}">${label}</text>`,
  ].join("");
}

// ── Channel lines ─────────────────────────────────────────────────────────────

function channelLine(
  gA: number, gB: number,
  cA: CenterName, cB: CenterName,
  defined: boolean,
): string {
  const [x1, y1] = CENTER_POS[cA];
  const [x2, y2] = CENTER_POS[cB];
  const stroke = defined ? CHANNEL_DEFINED : CHANNEL_UNDEF;
  const width  = defined ? 2 : 1;
  // Mid-point gate labels
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  // Offset the two gate numbers slightly off the channel line
  const ox = (-dy / len) * 9;
  const oy = (dx / len) * 9;
  const t1x = mx - dx * 0.12 + ox, t1y = my - dy * 0.12 + oy;
  const t2x = mx + dx * 0.12 + ox, t2y = my + dy * 0.12 + oy;
  return [
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"`,
    ` stroke="${stroke}" stroke-width="${width}"/>`,
    `<text x="${t1x}" y="${t1y}" text-anchor="middle" font-size="8"`,
    ` font-family="sans-serif" fill="${stroke}" opacity="0.85">${gA}</text>`,
    `<text x="${t2x}" y="${t2y}" text-anchor="middle" font-size="8"`,
    ` font-family="sans-serif" fill="${stroke}" opacity="0.85">${gB}</text>`,
  ].join("");
}

// ── Gate dot on a channel ─────────────────────────────────────────────────────

function gateActivations(
  pGates: Set<number>, dGates: Set<number>,
): string {
  const parts: string[] = [];
  const rendered = new Set<number>();

  for (const [gA, gB, cA, cB] of CHANNELS) {
    for (const [g, frac, cFrom, cTo] of [
      [gA, 0.35, cA, cB] as [number, number, CenterName, CenterName],
      [gB, 0.65, cA, cB] as [number, number, CenterName, CenterName],
    ]) {
      if (rendered.has(g)) continue;
      rendered.add(g);
      const isP = pGates.has(g), isD = dGates.has(g);
      if (!isP && !isD) continue;
      const [x1, y1] = CENTER_POS[cFrom];
      const [x2, y2] = CENTER_POS[cTo];
      const cx = x1 + (x2 - x1) * frac;
      const cy = y1 + (y2 - y1) * frac;
      const color = isP && isD ? GATE_ACTIVE_B : isP ? GATE_ACTIVE_P : GATE_ACTIVE_D;
      parts.push(
        `<circle cx="${cx}" cy="${cy}" r="5" fill="${color}" opacity="0.6"/>`,
      );
    }
  }
  return parts.join("\n");
}

// ── Public render function ────────────────────────────────────────────────────

export interface RenderInput {
  definedCenters: Set<CenterName>;
  definedChannels: [number, number][];
  personalityGates: Set<number>;
  designGates: Set<number>;
}

export function renderBodygraph(input: RenderInput): string {
  const { definedCenters, definedChannels, personalityGates, designGates } = input;
  const definedChSet = new Set(
    definedChannels.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`),
  );

  const parts: string[] = [];

  // ── Background
  parts.push(`<rect width="${W}" height="${H}" fill="#faf9f7"/>`);

  // ── Channel lines (bottom layer)
  for (const [gA, gB, cA, cB] of CHANNELS) {
    const key = `${Math.min(gA, gB)}-${Math.max(gA, gB)}`;
    parts.push(channelLine(gA, gB, cA, cB, definedChSet.has(key)));
  }

  // ── Gate activation dots
  parts.push(gateActivations(personalityGates, designGates));

  // ── Centers (top layer)
  const dc = definedCenters;
  parts.push(triangle(CENTER_POS.Head[0], CENTER_POS.Head[1], dc.has("Head"), "Head", false));
  parts.push(triangle(CENTER_POS.Ajna[0], CENTER_POS.Ajna[1], dc.has("Ajna"), "Ajna", true));
  parts.push(square  (CENTER_POS.Throat[0], CENTER_POS.Throat[1], dc.has("Throat"), "Throat"));
  parts.push(diamond (CENTER_POS.G[0], CENTER_POS.G[1], dc.has("G"), "G"));
  parts.push(square  (CENTER_POS.Ego[0], CENTER_POS.Ego[1], dc.has("Ego"), "Ego"));
  parts.push(square  (CENTER_POS.Sacral[0], CENTER_POS.Sacral[1], dc.has("Sacral"), "Sacral"));
  parts.push(triangle(CENTER_POS.SolarPlexus[0], CENTER_POS.SolarPlexus[1], dc.has("SolarPlexus"), "SP", true));
  parts.push(triangle(CENTER_POS.Spleen[0], CENTER_POS.Spleen[1], dc.has("Spleen"), "Spleen", true));
  parts.push(square  (CENTER_POS.Root[0], CENTER_POS.Root[1], dc.has("Root"), "Root"));

  // ── Center gate lists (tiny, outside shapes)
  for (const [center, gates] of Object.entries(CENTER_GATES) as [CenterName, readonly number[]][]) {
    const [cx, cy] = CENTER_POS[center];
    gates.forEach((g, i) => {
      const isP = personalityGates.has(g), isD = designGates.has(g);
      if (!isP && !isD) return;
      const color = isP && isD ? GATE_ACTIVE_B : isP ? GATE_ACTIVE_P : GATE_ACTIVE_D;
      void i; void cx; void cy; void color;
      // already shown as channel dots; skip duplicate labels to keep SVG clean
    });
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"`,
    ` width="${W}" height="${H}" style="max-width:100%;height:auto">`,
    ...parts,
    `</svg>`,
  ].join("\n");
}
