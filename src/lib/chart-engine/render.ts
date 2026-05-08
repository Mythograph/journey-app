import type { CenterName } from "./types.js";
import { CHANNELS, CENTER_GATES } from "./data.js";

// ── Canvas ─────────────────────────────────────────────────────────────────────
const W = 620;
const H = 860;

// ── Center positions & sizes ───────────────────────────────────────────────────
const POS: Record<CenterName, [number, number]> = {
  Head:        [310,  68],
  Ajna:        [310, 190],
  Throat:      [310, 325],
  G:           [310, 472],
  Ego:         [462, 378],
  Sacral:      [310, 628],
  SolarPlexus: [462, 504],
  Spleen:      [158, 504],
  Root:        [310, 762],
};

const CENTER_R: Record<CenterName, number> = {
  Head: 50, Ajna: 50, Throat: 54, G: 60, Ego: 38,
  Sacral: 64, SolarPlexus: 56, Spleen: 56, Root: 52,
};

type Shape = "tri-up" | "tri-down" | "square" | "diamond";

const CENTER_SHAPE: Record<CenterName, Shape> = {
  Head: "tri-up", Ajna: "tri-down", Throat: "square",
  G: "diamond",   Ego: "square",   Sacral: "square",
  SolarPlexus: "tri-up", Spleen: "tri-up", Root: "square",
};

const CENTER_LABEL: Record<CenterName, string> = {
  Head: "head", Ajna: "ajna", Throat: "throat",
  G: "G", Ego: "ego", Sacral: "sacral",
  SolarPlexus: "solar\nplexus", Spleen: "spleen", Root: "root",
};

// ── Colours ────────────────────────────────────────────────────────────────────
const C_PERSONALITY   = "#111111";
const C_DESIGN        = "#c0392b";
const C_BOTH          = "#d4740a";
const C_INACTIVE_LINE = "#ddd8ee";
const C_INACTIVE_GATE = "#9590b4";
const C_DEF_FILL      = "#c05a3c";
const C_DEF_STROKE    = "#9a3d22";
const C_UNDEF_FILL    = "#edeaf5";
const C_UNDEF_STROKE  = "#bab2d0";
const C_LABEL_DEF     = "#ffffff";
const C_LABEL_UNDEF   = "#8a84aa";

function f(n: number): string { return n.toFixed(1); }

// ── Hardcoded gate positions ───────────────────────────────────────────────────
// Each gate has one fixed (x,y) — derived from the traditional HD bodygraph
// layout: position within the center shape, directed toward the connected center,
// with enough spacing that gate circles don't visually collide.
const GATE_POS: Record<number, [number, number]> = {
  // Head — three gates along the bottom edge (toward Ajna)
  63: [330, 108],  61: [310, 108],  64: [290, 108],

  // Ajna — top row toward Head, bottom cluster near tip toward Throat
  4:  [330, 150],  24: [310, 150],  47: [290, 150],
  17: [323, 228],  11: [310, 228],  43: [297, 228],

  // Throat — top toward Ajna; bottom toward G; sides toward Ego/SP/Spleen
  62: [330, 282],  56: [310, 282],  23: [290, 282],
  31: [334, 370],   8: [314, 370],  33: [294, 370],  20: [274, 370],
  45: [354, 331],
  12: [344, 345],  35: [352, 361],
  16: [266, 352],

  // G — top toward Throat; bottom toward Sacral; right toward Ego
   7: [334, 444],   1: [320, 444],  13: [300, 444],  10: [286, 444],
   2: [330, 500],  15: [310, 500],  46: [290, 500],
  25: [336, 462],

  // Ego — four gates spread across the small square
  21: [432, 348],  26: [428, 374],  51: [434, 399],  40: [462, 408],

  // Sacral — top row (G/Throat side); mid sides (SP/Spleen); bottom (Root)
  34: [270, 577],  29: [290, 577],   5: [310, 577],  14: [330, 577],
  27: [267, 601],  59: [350, 596],
  42: [290, 679],   9: [310, 679],   3: [330, 679],

  // SolarPlexus — top cluster toward Throat/Ego; bottom row toward Root/Sacral
  37: [465, 458],  22: [460, 474],  36: [456, 489],
   6: [437, 517],  55: [453, 519],  49: [469, 521],  30: [485, 519],

  // Spleen — right column toward Throat/G/Ego; bottom fan toward Root/Sacral
  48: [160, 476],  44: [158, 494],  57: [165, 511],
  50: [186, 518],  28: [193, 535],  32: [178, 545],  18: [161, 555],

  // Root — center row (Sacral), left fan (Spleen), right fan (SP)
  53: [290, 716],  52: [310, 716],  60: [330, 716],
  58: [268, 730],  54: [284, 736],  38: [300, 742],
  39: [320, 742],  19: [336, 736],  41: [354, 730],
};

// ── Shape helpers ──────────────────────────────────────────────────────────────
function shapeAttrs(cx: number, cy: number, s: Shape, r: number): string {
  if (s === "square")
    return `<rect x="${f(cx - r)}" y="${f(cy - r)}" width="${r * 2}" height="${r * 2}" rx="4"`;
  if (s === "diamond")
    return `<polygon points="${f(cx)},${f(cy - r)} ${f(cx + r)},${f(cy)} ${f(cx)},${f(cy + r)} ${f(cx - r)},${f(cy)}"`;
  if (s === "tri-up")
    return `<polygon points="${f(cx)},${f(cy - r)} ${f(cx + r)},${f(cy + r)} ${f(cx - r)},${f(cy + r)}"`;
  return `<polygon points="${f(cx)},${f(cy + r)} ${f(cx + r)},${f(cy - r)} ${f(cx - r)},${f(cy - r)}"`;
}

function renderShapeFill(cx: number, cy: number, s: Shape, r: number, def: boolean): string {
  return shapeAttrs(cx, cy, s, r) + ` fill="${def ? C_DEF_FILL : C_UNDEF_FILL}"/>`;
}

function renderShapeStroke(cx: number, cy: number, s: Shape, r: number, def: boolean): string {
  return shapeAttrs(cx, cy, s, r) + ` fill="none" stroke="${def ? C_DEF_STROKE : C_UNDEF_STROKE}" stroke-width="2"/>`;
}

// ── Clip-path defs ─────────────────────────────────────────────────────────────
function renderDefs(): string {
  const clips = (Object.keys(POS) as CenterName[]).map(name => {
    const [cx, cy] = POS[name];
    return `<clipPath id="clip-${name}">${shapeAttrs(cx, cy, CENTER_SHAPE[name], CENTER_R[name])}/></clipPath>`;
  });
  return `<defs>${clips.join("")}</defs>`;
}

// ── Body silhouette ────────────────────────────────────────────────────────────
function renderSilhouette(): string {
  return `<path d="M 310,18 C 385,18 445,65 455,135 L 542,322 L 548,518 L 492,742 L 402,842 L 310,855 L 218,842 L 128,742 L 72,518 L 78,322 C 175,65 235,18 310,18 Z" fill="#ede9f6" opacity="0.38"/>`;
}

// ── Gate circles ───────────────────────────────────────────────────────────────
const CIRC_R = 7;

function renderGateCircles(
  center: CenterName,
  pGates: Set<number>,
  dGates: Set<number>,
): string {
  const parts: string[] = [];
  for (const gate of CENTER_GATES[center]) {
    const pos = GATE_POS[gate];
    if (!pos) continue;
    const [gx, gy] = pos;
    const isP = pGates.has(gate), isD = dGates.has(gate);
    let bg: string, textCol: string, strokeAttr: string;
    if (isP && isD)  { bg = C_BOTH;       textCol = "#fff"; strokeAttr = ""; }
    else if (isP)    { bg = C_PERSONALITY; textCol = "#fff"; strokeAttr = ""; }
    else if (isD)    { bg = C_DESIGN;      textCol = "#fff"; strokeAttr = ""; }
    else             { bg = "rgba(255,255,255,0.92)"; textCol = C_INACTIVE_GATE; strokeAttr = ` stroke="${C_UNDEF_STROKE}" stroke-width="0.75"`; }
    parts.push(
      `<circle cx="${gx}" cy="${gy}" r="${CIRC_R}" fill="${bg}"${strokeAttr}/>`,
      `<text x="${gx}" y="${gy + 3}" text-anchor="middle" font-size="7" font-family="sans-serif" fill="${textCol}" font-weight="700">${gate}</text>`,
    );
  }
  return `<g clip-path="url(#clip-${center})">${parts.join("")}</g>`;
}

// ── Center labels ──────────────────────────────────────────────────────────────
function renderCenterLabel(cx: number, cy: number, s: Shape, r: number, def: boolean, label: string): string {
  const color = def ? C_LABEL_DEF : C_LABEL_UNDEF;
  let ly: number;
  if (s === "tri-up")    ly = cy + r * 0.6;
  else if (s === "tri-down") ly = cy - r * 0.28;
  else                   ly = cy;
  const lines = label.split("\n");
  const fs = s === "diamond" ? 14 : 12;
  if (lines.length === 2) {
    return `<text x="${f(cx)}" y="${f(ly - 7)}" text-anchor="middle" font-size="${fs}" font-family="sans-serif" fill="${color}" font-weight="500">${lines[0]}</text>` +
           `<text x="${f(cx)}" y="${f(ly + 8)}" text-anchor="middle" font-size="${fs}" font-family="sans-serif" fill="${color}" font-weight="500">${lines[1]}</text>`;
  }
  return `<text x="${f(cx)}" y="${f(ly + 4)}" text-anchor="middle" font-size="${fs}" font-family="sans-serif" fill="${color}" font-weight="500">${label}</text>`;
}

// ── Channel rendering ──────────────────────────────────────────────────────────
const SW_ACTIVE   = 6;
const SW_INACTIVE = 0.75;

function gateStyle(isP: boolean, isD: boolean): { col: string; sw: number } {
  if (isP && isD) return { col: C_BOTH,        sw: SW_ACTIVE };
  if (isP)        return { col: C_PERSONALITY,  sw: SW_ACTIVE };
  if (isD)        return { col: C_DESIGN,        sw: SW_ACTIVE };
  return           { col: C_INACTIVE_LINE,  sw: SW_INACTIVE };
}

function renderChannel(
  gA: number, gB: number,
  pGates: Set<number>, dGates: Set<number>,
): string {
  const posA = GATE_POS[gA], posB = GATE_POS[gB];
  if (!posA || !posB) return "";
  const [ax, ay] = posA, [bx, by] = posB;
  const mx = (ax + bx) / 2, my = (ay + by) / 2;
  const sA = gateStyle(pGates.has(gA), dGates.has(gA));
  const sB = gateStyle(pGates.has(gB), dGates.has(gB));
  const dashA = sA.sw === SW_INACTIVE ? ` stroke-dasharray="3,4"` : "";
  const dashB = sB.sw === SW_INACTIVE ? ` stroke-dasharray="3,4"` : "";
  return `<line x1="${ax}" y1="${ay}" x2="${mx}" y2="${my}" stroke="${sA.col}" stroke-width="${sA.sw}" stroke-linecap="butt"${dashA}/>` +
         `<line x1="${mx}" y1="${my}" x2="${bx}" y2="${by}" stroke="${sB.col}" stroke-width="${sB.sw}" stroke-linecap="butt"${dashB}/>`;
}

// ── Public API ─────────────────────────────────────────────────────────────────
export interface RenderInput {
  definedCenters: Set<CenterName>;
  definedChannels: [number, number][];
  personalityGates: Set<number>;
  designGates: Set<number>;
  personalityActivations: { planet: string; gate: number; line: number }[];
  designActivations:      { planet: string; gate: number; line: number }[];
}

export function renderBodygraph({
  definedCenters, personalityGates, designGates,
}: RenderInput): string {
  const names = Object.keys(POS) as CenterName[];
  const parts: string[] = [];

  parts.push(renderDefs());
  parts.push(`<rect width="${W}" height="${H}" fill="#fafaf7"/>`);
  parts.push(renderSilhouette());

  // 1 — channel bands (behind everything)
  for (const [gA, gB] of CHANNELS) {
    parts.push(renderChannel(gA, gB, personalityGates, designGates));
  }

  // 2 — center fills (cover channel interiors)
  for (const name of names) {
    const [cx, cy] = POS[name];
    parts.push(renderShapeFill(cx, cy, CENTER_SHAPE[name], CENTER_R[name], definedCenters.has(name)));
  }

  // 3 — gate circles (clipped to center shape)
  for (const name of names) {
    parts.push(renderGateCircles(name, personalityGates, designGates));
  }

  // 4 — center name labels
  for (const name of names) {
    const [cx, cy] = POS[name];
    parts.push(renderCenterLabel(cx, cy, CENTER_SHAPE[name], CENTER_R[name], definedCenters.has(name), CENTER_LABEL[name]));
  }

  // 5 — center outlines
  for (const name of names) {
    const [cx, cy] = POS[name];
    parts.push(renderShapeStroke(cx, cy, CENTER_SHAPE[name], CENTER_R[name], definedCenters.has(name)));
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto">\n` +
    parts.join("\n") + `\n</svg>`;
}
