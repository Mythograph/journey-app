import type { CenterName } from "./types.js";
import { CHANNELS } from "./data.js";

const W = 400;
const H = 560;

// ── Center positions [cx, cy] ─────────────────────────────────────────────────
const POS: Record<CenterName, [number, number]> = {
  Head:        [200,  46],
  Ajna:        [200, 114],
  Throat:      [200, 190],
  G:           [200, 274],
  Ego:         [294, 232],  // RIGHT side (will / heart centre)
  Sacral:      [200, 372],
  SolarPlexus: [294, 322],  // RIGHT side
  Spleen:      [106, 322],  // LEFT side
  Root:        [200, 456],
};

type Shape = "tri-up" | "tri-down" | "square" | "diamond";

const CENTER_SHAPE: Record<CenterName, Shape> = {
  Head: "tri-up", Ajna: "tri-down", Throat: "square",
  G: "diamond",   Ego: "tri-up",    Sacral: "square",
  SolarPlexus: "tri-up", Spleen: "tri-up", Root: "square",
};

const CENTER_R: Record<CenterName, number> = {
  Head: 20, Ajna: 20, Throat: 27, G: 30, Ego: 19,
  Sacral: 33, SolarPlexus: 22, Spleen: 22, Root: 23,
};

const CENTER_LABEL: Record<CenterName, string> = {
  Head: "Head", Ajna: "Ajna", Throat: "Throat",
  G: "G", Ego: "Ego", Sacral: "Sacral",
  SolarPlexus: "SP", Spleen: "Spleen", Root: "Root",
};

// ── Colours ───────────────────────────────────────────────────────────────────
const C_PERSONALITY  = "#1a1830";   // near-black  – conscious / right lane
const C_DESIGN       = "#c0392b";   // red         – unconscious / left lane
const C_BOTH         = "#6a1da0";   // purple      – both sides
const C_INACTIVE     = "#e2ddf0";   // pale lavender-grey
const C_DEF_FILL     = "#3b2f6e";
const C_DEF_STROKE   = "#2d2356";
const C_UNDEF_FILL   = "#f6f4fb";
const C_UNDEF_STROKE = "#b0a8c8";
const C_LABEL_DEF    = "#fff";
const C_LABEL_UNDEF  = "#9590b4";

// ── Helpers ───────────────────────────────────────────────────────────────────

function f(n: number): string { return n.toFixed(1); }

// ── Center shapes ─────────────────────────────────────────────────────────────

function renderShape(cx: number, cy: number, s: Shape, r: number, defined: boolean): string {
  const fill   = defined ? C_DEF_FILL   : C_UNDEF_FILL;
  const stroke = defined ? C_DEF_STROKE : C_UNDEF_STROKE;
  const sw = 1.5;
  if (s === "square")   return `<rect x="${f(cx-r)}" y="${f(cy-r)}" width="${r*2}" height="${r*2}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (s === "diamond")  return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy)} ${f(cx)},${f(cy+r)} ${f(cx-r)},${f(cy)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (s === "tri-up")   return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy+r)} ${f(cx-r)},${f(cy+r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  /* tri-down */        return `<polygon points="${f(cx)},${f(cy+r)} ${f(cx+r)},${f(cy-r)} ${f(cx-r)},${f(cy-r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function renderLabel(cx: number, cy: number, s: Shape, r: number, defined: boolean, label: string): string {
  const color = defined ? C_LABEL_DEF : C_LABEL_UNDEF;
  const fw    = defined ? "600" : "400";
  let ly = cy + 4;
  if (s === "tri-up")   ly = cy + r * 0.38;
  if (s === "tri-down") ly = cy - r * 0.20;
  return `<text x="${f(cx)}" y="${f(ly)}" text-anchor="middle" font-size="9" font-family="sans-serif" fill="${color}" font-weight="${fw}">${label}</text>`;
}

// ── Channel dual-lane renderer ────────────────────────────────────────────────
// Standard HD convention:
//   RIGHT lane (– perpendicular for a downward channel) = personality / conscious  (black)
//   LEFT  lane (+ perpendicular for a downward channel) = design / unconscious     (red)
//
// The perpendicular is derived from the channel direction vector, so "right" and
// "left" remain consistent regardless of channel orientation.

function renderChannel(
  gA: number, gB: number,
  cA: CenterName, cB: CenterName,
  pGates: Set<number>, dGates: Set<number>,
): string {
  const [x1, y1] = POS[cA];
  const [x2, y2] = POS[cB];
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = dx / len, ny = dy / len;
  const px = -ny, py = nx;   // perpendicular (left-hand turn of direction vector)
  const OFF = 3.5;

  const gA_p = pGates.has(gA), gA_d = dGates.has(gA);
  const gB_p = pGates.has(gB), gB_d = dGates.has(gB);

  // Lane colours and weights
  const anyP       = gA_p || gB_p;
  const anyD       = gA_d || gB_d;
  const pLaneCol   = anyP ? C_PERSONALITY : C_INACTIVE;
  const dLaneCol   = anyD ? C_DESIGN      : C_INACTIVE;

  const parts: string[] = [
    // Personality lane = – perp (RIGHT for vertical downward channels)
    `<line x1="${f(x1-px*OFF)}" y1="${f(y1-py*OFF)}" x2="${f(x2-px*OFF)}" y2="${f(y2-py*OFF)}" stroke="${pLaneCol}" stroke-width="${anyP ? 2 : 1}"/>`,
    // Design lane = + perp (LEFT for vertical downward channels)
    `<line x1="${f(x1+px*OFF)}" y1="${f(y1+py*OFF)}" x2="${f(x2+px*OFF)}" y2="${f(y2+py*OFF)}" stroke="${dLaneCol}" stroke-width="${anyD ? 2 : 1}"/>`,
  ];

  // Gate activation dots + numbers
  // gA is 30% along from cA, gB is 70% (= 30% from cB)
  const FRAC_A = 0.30, FRAC_B = 0.70;
  const axBase = x1 + nx * len * FRAC_A, ayBase = y1 + ny * len * FRAC_A;
  const bxBase = x1 + nx * len * FRAC_B, byBase = y1 + ny * len * FRAC_B;

  function dotAndLabel(
    gx: number, gy: number, gate: number,
    isP: boolean, isD: boolean,
  ): void {
    const col = (isP && isD) ? C_BOTH : isP ? C_PERSONALITY : C_DESIGN;
    if (isP) {
      // personality dot on right lane (– perp)
      parts.push(`<circle cx="${f(gx-px*OFF)}" cy="${f(gy-py*OFF)}" r="4" fill="${col}"/>`);
      const lx = gx - px * (OFF + 9), ly = gy - py * (OFF + 9);
      parts.push(`<text x="${f(lx)}" y="${f(ly+3.5)}" text-anchor="middle" font-size="7.5" font-family="sans-serif" fill="${col}" font-weight="600">${gate}</text>`);
    }
    if (isD) {
      // design dot on left lane (+ perp)
      const dCol = (isP && isD) ? C_BOTH : C_DESIGN;
      parts.push(`<circle cx="${f(gx+px*OFF)}" cy="${f(gy+py*OFF)}" r="4" fill="${dCol}"/>`);
      const lx = gx + px * (OFF + 9), ly = gy + py * (OFF + 9);
      parts.push(`<text x="${f(lx)}" y="${f(ly+3.5)}" text-anchor="middle" font-size="7.5" font-family="sans-serif" fill="${dCol}" font-weight="600">${gate}</text>`);
    }
  }

  if (gA_p || gA_d) dotAndLabel(axBase, ayBase, gA, gA_p, gA_d);
  if (gB_p || gB_d) dotAndLabel(bxBase, byBase, gB, gB_p, gB_d);

  return parts.join("\n");
}

// ── Public API ────────────────────────────────────────────────────────────────

export interface RenderInput {
  definedCenters: Set<CenterName>;
  definedChannels: [number, number][];
  personalityGates: Set<number>;
  designGates: Set<number>;
}

export function renderBodygraph({
  definedCenters, personalityGates, designGates,
}: RenderInput): string {
  const parts: string[] = [
    `<rect width="${W}" height="${H}" fill="#faf9f7"/>`,
  ];

  // Channels drawn first (behind centers)
  for (const [gA, gB, cA, cB] of CHANNELS) {
    parts.push(renderChannel(gA, gB, cA, cB, personalityGates, designGates));
  }

  // Centers drawn on top
  for (const name of Object.keys(POS) as CenterName[]) {
    const [cx, cy] = POS[name];
    const s       = CENTER_SHAPE[name];
    const r       = CENTER_R[name];
    const defined = definedCenters.has(name);
    parts.push(renderShape(cx, cy, s, r, defined));
    parts.push(renderLabel(cx, cy, s, r, defined, CENTER_LABEL[name]));
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"`,
    ` width="${W}" height="${H}" style="max-width:100%;height:auto">`,
    ...parts,
    `</svg>`,
  ].join("\n");
}
