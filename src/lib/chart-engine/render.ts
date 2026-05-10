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
  SolarPlexus: "solar plexus", Spleen: "spleen", Root: "root",
};

// ── Colours ────────────────────────────────────────────────────────────────────
const C_PERSONALITY   = "#111111";
const C_DESIGN        = "#c0392b";
const C_BOTH          = "#d4740a";
const C_INACTIVE_LINE = "#b0a8d0";
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
  // Head (tri-up, cx=310, cy=68, r=50): apex(310,18), base y=118
  // All gates → Ajna; placed along bottom base
  64: [290, 110],  61: [310, 110],  63: [330, 110],

  // Ajna (tri-down, cx=310, cy=190, r=50): flat top y=140, apex(310,240)
  // → Head: top edge
  47: [290, 148],  24: [310, 148],   4: [330, 148],
  // → Throat: y=192 hw=24 range 286-334 (gates inset ≥3px from walls)
  43: [296, 192],  11: [310, 192],  17: [324, 192],

  // Throat (square, cx=310, cy=325, r=54): top 271, bot 379, left 256, right 364
  // → Ajna (top edge, y=282 so circles inset 4px from top wall)
  23: [292, 282],  56: [310, 282],  62: [328, 282],
  // → G (bottom edge, y=368 so circles inset 4px from bottom wall)
  20: [278, 368],  33: [294, 368],   8: [310, 368],  31: [326, 368],
  // → Ego (right edge, upper)
  45: [355, 302],
  // → SolarPlexus (right edge, mid/lower)
  12: [355, 330],  35: [355, 356],
  // → Spleen (left edge, x=266 insets circles 3px from left wall)
  16: [266, 340],

  // G (diamond, cx=310, cy=472, r=60)
  // upper half edges: x_left=722-y, x_right=y-102
  // → Throat (top): y=450, range 272-348, 4 gates at spacing 20px
  10: [281, 450],  13: [301, 450],   1: [321, 450],   7: [341, 450],
  // → Sacral (bottom): y=496, range 274-346, inset 3px
  46: [285, 496],  15: [310, 496],   2: [335, 496],
  // → Ego (right)
  25: [355, 472],

  // Ego (square, cx=462, cy=378, r=38): top 340, bot 416, left 424, right 500
  21: [432, 350],  // → Throat (left edge, upper)
  51: [432, 395],  // → G (left edge, lower)
  26: [438, 408],  // → Spleen (bottom edge, left)
  40: [462, 408],  // → SolarPlexus (bottom edge, center)

  // Sacral (square, cx=310, cy=628, r=64): top 564, bot 692, left 246, right 374
  // → G / Throat (top edge)
  34: [256, 572],  29: [292, 572],   5: [310, 572],  14: [328, 572],
  // → Spleen (left edge)
  27: [254, 610],
  // → SolarPlexus (right edge)
  59: [366, 600],
  // → Root (bottom edge)
  42: [292, 684],   9: [310, 684],   3: [328, 684],

  // SolarPlexus (tri-up, cx=462, cy=504, r=56): apex(462,448), base y=560
  // hw(y) = (y-448)/2
  // → Throat (near top): y=482, hw=17
  22: [454, 482],  36: [470, 482],
  // → Ego (left side): y=500, hw=26
  37: [444, 500],
  // → Sacral (left side): y=520, hw=36
   6: [434, 520],
  // → Root (bottom base): y=550, hw=51
  55: [448, 550],  49: [462, 550],  30: [476, 550],

  // Spleen (tri-up, cx=158, cy=504, r=56): apex(158,448), base y=560
  // right edge x_right(y) = 158 + (y-448)/2
  // → Throat (upper-right)
  48: [164, 478],
  // → Ego (right side)
  44: [170, 490],
  // → G + Sacral (right side, mid)
  57: [178, 506],
  // → Sacral (right side, lower)
  50: [184, 522],
  // → Root (lower base)
  18: [148, 550],  32: [163, 550],  28: [178, 550],

  // Root (square, cx=310, cy=762, r=52): top 710, bot 814, left 258, right 362
  // → Sacral (top edge)
  53: [292, 718],  52: [310, 718],  60: [328, 718],
  // → SolarPlexus (right edge)
  41: [354, 732],  19: [354, 750],  39: [354, 768],
  // → Spleen (left edge)
  58: [266, 732],  54: [266, 750],  38: [266, 768],
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
  if (s === "tri-up")    ly = cy + r * 0.4;
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
const SW_ACTIVE   = 5;
const SW_INACTIVE = 1.4;

// Diagonal channels bow gently outward from the canvas center, framing the
// bodygraph; near-vertical channels stay straight.
const CANVAS_CX = 310;
const CANVAS_CY = 430;

function gateStyle(isP: boolean, isD: boolean): { col: string; active: boolean } {
  if (isP && isD) return { col: C_BOTH,         active: true  };
  if (isP)        return { col: C_PERSONALITY,  active: true  };
  if (isD)        return { col: C_DESIGN,       active: true  };
  return           { col: C_INACTIVE_LINE,      active: false };
}

// Cubic bezier control points: offset 1/3 and 2/3 along the line, perpendicular
// outward from the canvas center, magnitude proportional to line length.
// Near-vertical channels (the middle-section spine) stay straight.
function controlPoints(ax: number, ay: number, bx: number, by: number): [number, number, number, number] {
  const dx = bx - ax, dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const mx = (ax + bx) / 2, my = (ay + by) / 2;
  const isVertical = Math.abs(dx) / Math.max(Math.abs(dy), 1) < 0.25;
  let nx = -dy / len, ny = dx / len;
  // Bow outward: flip the perpendicular so it points away from canvas center.
  if (nx * (CANVAS_CX - mx) + ny * (CANVAS_CY - my) > 0) { nx = -nx; ny = -ny; }
  const bow = isVertical ? 0 : Math.min(110, len * 0.38);
  return [
    ax + dx / 3 + nx * bow, ay + dy / 3 + ny * bow,
    ax + 2 * dx / 3 + nx * bow, ay + 2 * dy / 3 + ny * bow,
  ];
}

// De Casteljau split of a cubic bezier at t=0.5. Returns the midpoint and the
// two pairs of control points for the two half-curves.
function splitHalf(
  ax: number, ay: number, p1x: number, p1y: number, p2x: number, p2y: number, bx: number, by: number,
): { mx: number; my: number; aC1x: number; aC1y: number; aC2x: number; aC2y: number; bC1x: number; bC1y: number; bC2x: number; bC2y: number } {
  const m1x = (ax + p1x) / 2,  m1y = (ay + p1y) / 2;
  const m2x = (p1x + p2x) / 2, m2y = (p1y + p2y) / 2;
  const m3x = (p2x + bx) / 2,  m3y = (p2y + by) / 2;
  const n1x = (m1x + m2x) / 2, n1y = (m1y + m2y) / 2;
  const n2x = (m2x + m3x) / 2, n2y = (m2y + m3y) / 2;
  const mx  = (n1x + n2x) / 2, my  = (n1y + n2y) / 2;
  return {
    mx, my,
    aC1x: m1x, aC1y: m1y, aC2x: n1x, aC2y: n1y,
    bC1x: n2x, bC1y: n2y, bC2x: m3x, bC2y: m3y,
  };
}

function halfPath(
  sx: number, sy: number, c1x: number, c1y: number, c2x: number, c2y: number, ex: number, ey: number,
  col: string, active: boolean,
): string {
  const sw = active ? SW_ACTIVE : SW_INACTIVE;
  const dash = active ? "" : ` stroke-dasharray="5,4"`;
  return `<path d="M ${f(sx)} ${f(sy)} C ${f(c1x)} ${f(c1y)}, ${f(c2x)} ${f(c2y)}, ${f(ex)} ${f(ey)}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"${dash}/>`;
}

function renderChannel(
  gA: number, gB: number,
  pGates: Set<number>, dGates: Set<number>,
): string {
  const posA = GATE_POS[gA], posB = GATE_POS[gB];
  if (!posA || !posB) return "";
  const [ax, ay] = posA, [bx, by] = posB;
  const [p1x, p1y, p2x, p2y] = controlPoints(ax, ay, bx, by);
  const sA = gateStyle(pGates.has(gA), dGates.has(gA));
  const sB = gateStyle(pGates.has(gB), dGates.has(gB));
  const s = splitHalf(ax, ay, p1x, p1y, p2x, p2y, bx, by);
  return halfPath(ax, ay, s.aC1x, s.aC1y, s.aC2x, s.aC2y, s.mx, s.my, sA.col, sA.active) +
         halfPath(s.mx, s.my, s.bC1x, s.bC1y, s.bC2x, s.bC2y, bx, by, sB.col, sB.active);
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
