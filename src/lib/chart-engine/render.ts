import type { CenterName } from "./types.js";
import { CHANNELS } from "./data.js";

const W = 580;
const H = 600;

// Body shifted right to leave room for left (design) gate column
const POS: Record<CenterName, [number, number]> = {
  Head:        [290,  55],
  Ajna:        [290, 125],
  Throat:      [290, 202],
  G:           [290, 286],
  Ego:         [382, 242],
  Sacral:      [290, 384],
  SolarPlexus: [382, 332],
  Spleen:      [198, 332],
  Root:        [290, 470],
};

type Shape = "tri-up" | "tri-down" | "square" | "diamond";

const CENTER_SHAPE: Record<CenterName, Shape> = {
  Head: "tri-up",  Ajna: "tri-down", Throat: "square",
  G: "diamond",    Ego: "tri-up",    Sacral: "square",
  SolarPlexus: "tri-up", Spleen: "tri-up", Root: "square",
};

const CENTER_R: Record<CenterName, number> = {
  Head: 22, Ajna: 22, Throat: 28, G: 32, Ego: 21,
  Sacral: 34, SolarPlexus: 24, Spleen: 24, Root: 25,
};

const CENTER_LABEL: Record<CenterName, string> = {
  Head: "Head", Ajna: "Ajna", Throat: "Throat",
  G: "G", Ego: "Ego", Sacral: "Sacral",
  SolarPlexus: "SP", Spleen: "Spln", Root: "Root",
};

// ── Colours ───────────────────────────────────────────────────────────────────
const C_PERSONALITY   = "#1a1830";   // black  – conscious
const C_DESIGN        = "#c0392b";   // red    – unconscious
const C_INACTIVE      = "#d8d4e8";   // pale   – inactive lane segment
const C_DEF_FILL      = "#3b2f6e";
const C_DEF_STROKE    = "#2d2356";
const C_UNDEF_FILL    = "#f6f4fb";
const C_UNDEF_STROKE  = "#b0a8c8";
const C_LABEL_DEF     = "#fff";
const C_LABEL_UNDEF   = "#9590b4";
const C_GATE_INACTIVE = "#c0bcd4";

// ── Gate column ordering ──────────────────────────────────────────────────────
// Gates ordered top-to-bottom by center position (Head → Root).
// SolarPlexus and Spleen share the same y so their gates are interleaved by number.
const GATE_COLUMN_ORDER: readonly number[] = [
  // Head
  61, 63, 64,
  // Ajna
  4, 11, 17, 24, 43, 47,
  // Throat
  8, 12, 16, 20, 23, 31, 33, 35, 45, 56, 62,
  // Ego (sits between Throat and G)
  21, 26, 40, 51,
  // G
  1, 2, 7, 10, 13, 15, 25, 46,
  // SolarPlexus + Spleen (same vertical level, interleaved by gate number)
  6, 18, 22, 28, 30, 32, 36, 37, 44, 48, 49, 50, 55, 57,
  // Sacral
  3, 5, 9, 14, 27, 29, 34, 42, 59,
  // Root
  19, 38, 39, 41, 52, 53, 54, 58, 60,
];

const COL_Y_START = 32;
const COL_Y_STEP  = 8.3;
const GATE_Y: Map<number, number> = new Map(
  GATE_COLUMN_ORDER.map((g, i) => [g, COL_Y_START + i * COL_Y_STEP]),
);

const COL_P_X = 477;  // right  – personality / conscious
const COL_D_X = 103;  // left   – design / unconscious

// ── Helpers ───────────────────────────────────────────────────────────────────

function f(n: number): string { return n.toFixed(1); }

// ── Center shapes ─────────────────────────────────────────────────────────────

function renderShape(cx: number, cy: number, s: Shape, r: number, defined: boolean): string {
  const fill   = defined ? C_DEF_FILL   : C_UNDEF_FILL;
  const stroke = defined ? C_DEF_STROKE : C_UNDEF_STROKE;
  const sw = 1.5;
  if (s === "square")  return `<rect x="${f(cx-r)}" y="${f(cy-r)}" width="${r*2}" height="${r*2}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (s === "diamond") return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy)} ${f(cx)},${f(cy+r)} ${f(cx-r)},${f(cy)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (s === "tri-up")  return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy+r)} ${f(cx-r)},${f(cy+r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  /* tri-down */       return `<polygon points="${f(cx)},${f(cy+r)} ${f(cx+r)},${f(cy-r)} ${f(cx-r)},${f(cy-r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function renderLabel(cx: number, cy: number, s: Shape, r: number, defined: boolean, label: string): string {
  const color = defined ? C_LABEL_DEF : C_LABEL_UNDEF;
  const fw    = defined ? "700" : "400";
  let ly = cy + 4.5;
  if (s === "tri-up")   ly = cy + r * 0.42;
  if (s === "tri-down") ly = cy - r * 0.15;
  return `<text x="${f(cx)}" y="${f(ly)}" text-anchor="middle" font-size="10" font-family="sans-serif" fill="${color}" font-weight="${fw}">${label}</text>`;
}

// ── Channel renderer ──────────────────────────────────────────────────────────
// Each channel has two parallel lanes:
//   RIGHT lane (−perp) = personality / conscious  (black)
//   LEFT  lane (+perp) = design / unconscious      (red)
//
// Each lane is split at the channel midpoint. The gate-A half is coloured only
// if gate A is active on that side; the gate-B half only if gate B is active.
// Inactive halves render as pale grey. This gives the standard HD "half-channel"
// activation look.

function renderChannel(
  gA: number, gB: number,
  cA: CenterName, cB: CenterName,
  pGates: Set<number>, dGates: Set<number>,
): string {
  const [x1, y1] = POS[cA];
  const [x2, y2] = POS[cB];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;

  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = dx / len, ny = dy / len;
  const px = -ny, py = nx;   // perpendicular (left-hand turn)
  const OFF = 3.5;

  const gA_p = pGates.has(gA), gA_d = dGates.has(gA);
  const gB_p = pGates.has(gB), gB_d = dGates.has(gB);

  // Helper: one lane segment
  function seg(
    ax: number, ay: number, bx: number, by: number,
    active: boolean, baseCol: string,
  ): string {
    const col = active ? baseCol : C_INACTIVE;
    const sw  = active ? "2" : "1";
    return `<line x1="${f(ax)}" y1="${f(ay)}" x2="${f(bx)}" y2="${f(by)}" stroke="${col}" stroke-width="${sw}"/>`;
  }

  const rOff = OFF;  // right offset scalar (personality)
  const lOff = OFF;  // left  offset scalar (design)

  // Personality lane (right = −perp): gA-half then gB-half
  const p1 = seg(x1-px*rOff, y1-py*rOff, mx-px*rOff, my-py*rOff, gA_p, C_PERSONALITY);
  const p2 = seg(mx-px*rOff, my-py*rOff, x2-px*rOff, y2-py*rOff, gB_p, C_PERSONALITY);

  // Design lane (left = +perp): gA-half then gB-half
  const d1 = seg(x1+px*lOff, y1+py*lOff, mx+px*lOff, my+py*lOff, gA_d, C_DESIGN);
  const d2 = seg(mx+px*lOff, my+py*lOff, x2+px*lOff, y2+py*lOff, gB_d, C_DESIGN);

  return [p1, p2, d1, d2].join("\n");
}

// ── Gate side columns ─────────────────────────────────────────────────────────
// All 64 gates shown on both sides. Right = personality (black/grey).
// Left = design (red/grey). Active gates are bold + full colour.

function renderGateColumns(pGates: Set<number>, dGates: Set<number>): string {
  const parts: string[] = [];

  // Column headers
  parts.push(`<text x="${COL_P_X}" y="18" text-anchor="start" font-size="7.5" font-family="sans-serif" fill="${C_PERSONALITY}" font-weight="600" letter-spacing="0.5">CONSCIOUS</text>`);
  parts.push(`<text x="${COL_D_X}" y="18" text-anchor="end"   font-size="7.5" font-family="sans-serif" fill="${C_DESIGN}"      font-weight="600" letter-spacing="0.5">UNCONSCIOUS</text>`);

  for (const gate of GATE_COLUMN_ORDER) {
    const y = GATE_Y.get(gate)!;

    const isP = pGates.has(gate);
    const isD = dGates.has(gate);

    // Personality column (right)
    parts.push(
      `<text x="${COL_P_X}" y="${f(y+3)}" text-anchor="start" font-size="8" font-family="monospace" ` +
      `fill="${isP ? C_PERSONALITY : C_GATE_INACTIVE}" font-weight="${isP ? "700" : "400"}">${gate}</text>`,
    );

    // Design column (left)
    parts.push(
      `<text x="${COL_D_X}" y="${f(y+3)}" text-anchor="end" font-size="8" font-family="monospace" ` +
      `fill="${isD ? C_DESIGN : C_GATE_INACTIVE}" font-weight="${isD ? "700" : "400"}">${gate}</text>`,
    );
  }

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

  // Gate side columns (behind everything)
  parts.push(renderGateColumns(personalityGates, designGates));

  // Channels (behind centers)
  for (const [gA, gB, cA, cB] of CHANNELS) {
    parts.push(renderChannel(gA, gB, cA, cB, personalityGates, designGates));
  }

  // Centers (on top)
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
