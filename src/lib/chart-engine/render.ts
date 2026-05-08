import type { CenterName } from "./types.js";
import { CHANNELS, CENTER_GATES } from "./data.js";

// ── Canvas ─────────────────────────────────────────────────────────────────────
const W = 560;
const H = 1200;

// ── Center positions & sizes ───────────────────────────────────────────────────
const POS: Record<CenterName, [number, number]> = {
  Head:        [280,  86],
  Ajna:        [280, 248],
  Throat:      [280, 456],
  G:           [280, 658],
  Ego:         [430, 564],
  Sacral:      [280, 928],
  SolarPlexus: [430, 788],
  Spleen:      [130, 788],
  Root:        [280, 1096],
};

// Head/Ajna bigger; Throat smaller; SP/Spleen bigger; Ego small
const CENTER_R: Record<CenterName, number> = {
  Head: 50, Ajna: 58, Throat: 72, G: 64, Ego: 38,
  Sacral: 70, SolarPlexus: 62, Spleen: 62, Root: 66,
};

type Shape = "tri-up" | "tri-down" | "square" | "diamond";

const CENTER_SHAPE: Record<CenterName, Shape> = {
  Head: "tri-up", Ajna: "tri-down", Throat: "square",
  G: "diamond",   Ego: "tri-up",   Sacral: "square",
  SolarPlexus: "tri-up", Spleen: "tri-up", Root: "square",
};

const CENTER_LABEL: Record<CenterName, string> = {
  Head: "head", Ajna: "ajna", Throat: "throat",
  G: "G", Ego: "ego", Sacral: "sacral",
  SolarPlexus: "solar\nplexus", Spleen: "spleen", Root: "root",
};

// Gate circle columns per center (controls grid inside shape)
const CENTER_GATE_COLS: Record<CenterName, number> = {
  Head: 3, Ajna: 3, Throat: 4, G: 3,
  Ego: 2, Sacral: 3, SolarPlexus: 3, Spleen: 3, Root: 3,
};

// ── Colours ────────────────────────────────────────────────────────────────────
const C_PERSONALITY    = "#111111";
const C_DESIGN         = "#c0392b";
const C_BOTH           = "#d4740a";
const C_INACTIVE_LINE  = "#d0cce0";
const C_INACTIVE_GATE  = "#9590b4";
const C_DEF_FILL       = "#c05a3c";
const C_DEF_STROKE     = "#9a3d22";
const C_UNDEF_FILL     = "#edeaf5";
const C_UNDEF_STROKE   = "#bab2d0";
const C_LABEL_DEF      = "#ffffff";
const C_LABEL_UNDEF    = "#8a84aa";

// ── Helpers ────────────────────────────────────────────────────────────────────
function f(n: number): string { return n.toFixed(2); }

interface GatePos { x: number; y: number; }

// ── Channel endpoints at center edge ───────────────────────────────────────────
// GATE_GAP=0: channels start exactly at the center edge boundary.
// GATE_STEP: perpendicular spacing between parallel channels from same pair.
const GATE_GAP  = 0;
const GATE_STEP = 18;

function buildGatePositions(): Map<number, GatePos> {
  const groups = new Map<string, typeof CHANNELS[number][]>();
  for (const ch of CHANNELS) {
    const key = `${ch[2]}__${ch[3]}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(ch);
  }

  const map = new Map<number, GatePos>();

  for (const [, channels] of groups) {
    const [, , cA, cB] = channels[0];
    const [ax, ay] = POS[cA];
    const [bx, by] = POS[cB];
    const rA = CENTER_R[cA], rB = CENTER_R[cB];

    const dx = bx - ax, dy = by - ay;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / len, ny = dy / len;
    const px = -ny, py = nx;

    const n = channels.length;
    const totalSpread = (n - 1) * GATE_STEP;

    const baseAx = ax + nx * (rA + GATE_GAP);
    const baseAy = ay + ny * (rA + GATE_GAP);
    const baseBx = bx - nx * (rB + GATE_GAP);
    const baseBy = by - ny * (rB + GATE_GAP);

    channels.forEach((ch, i) => {
      const [gA, gB] = ch;
      const offset = -totalSpread / 2 + i * GATE_STEP;
      if (!map.has(gA)) map.set(gA, { x: baseAx + px * offset, y: baseAy + py * offset });
      if (!map.has(gB)) map.set(gB, { x: baseBx + px * offset, y: baseBy + py * offset });
    });
  }

  return map;
}

// ── Shape helpers ──────────────────────────────────────────────────────────────
function shapePoints(cx: number, cy: number, s: Shape, r: number): string {
  if (s === "square")
    return `<rect x="${f(cx-r)}" y="${f(cy-r)}" width="${r*2}" height="${r*2}" rx="5"`;
  if (s === "diamond")
    return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy)} ${f(cx)},${f(cy+r)} ${f(cx-r)},${f(cy)}"`;
  if (s === "tri-up")
    return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy+r)} ${f(cx-r)},${f(cy+r)}"`;
  return `<polygon points="${f(cx)},${f(cy+r)} ${f(cx+r)},${f(cy-r)} ${f(cx-r)},${f(cy-r)}"`;
}

function renderShapeFill(cx: number, cy: number, s: Shape, r: number, def: boolean): string {
  return shapePoints(cx, cy, s, r) + ` fill="${def ? C_DEF_FILL : C_UNDEF_FILL}"/>`;
}

function renderShapeStroke(cx: number, cy: number, s: Shape, r: number, def: boolean): string {
  return shapePoints(cx, cy, s, r) + ` fill="none" stroke="${def ? C_DEF_STROKE : C_UNDEF_STROKE}" stroke-width="2"/>`;
}

// ── Gate circles inside centers ────────────────────────────────────────────────
const CIRC_R = 10;   // gate circle radius px
const COL_W  = 22;   // horizontal spacing between circle centres
const LINE_H = 22;   // vertical spacing between rows

function renderGateCircles(
  center: CenterName, cx: number, cy: number,
  shape: Shape, r: number,
  pGates: Set<number>, dGates: Set<number>,
): string {
  const gates = [...CENTER_GATES[center]];
  const maxCols = CENTER_GATE_COLS[center];

  // Vertical center of the gate grid within each shape
  let gridCy: number;
  if (shape === "square")      gridCy = cy + 4;
  else if (shape === "diamond") gridCy = cy - 10;
  else if (shape === "tri-up")  gridCy = cy + r * 0.28;
  else                          gridCy = cy - r * 0.15; // tri-down

  const rows: number[][] = [];
  for (let i = 0; i < gates.length; i += maxCols) rows.push(gates.slice(i, i + maxCols));
  const totalH = (rows.length - 1) * LINE_H;

  const parts: string[] = [];
  rows.forEach((row, ri) => {
    const y = gridCy - totalH / 2 + ri * LINE_H;
    const rowSpan = (row.length - 1) * COL_W;
    row.forEach((gate, ci) => {
      const x = cx - rowSpan / 2 + ci * COL_W;
      const isP = pGates.has(gate), isD = dGates.has(gate);
      let bg: string, textCol: string, stroke: string;
      if (isP && isD)  { bg = C_BOTH;       textCol = "#fff"; stroke = "none"; }
      else if (isP)    { bg = C_PERSONALITY; textCol = "#fff"; stroke = "none"; }
      else if (isD)    { bg = C_DESIGN;      textCol = "#fff"; stroke = "none"; }
      else             { bg = "rgba(255,255,255,0.75)"; textCol = C_INACTIVE_GATE; stroke = C_UNDEF_STROKE; }
      parts.push(
        `<circle cx="${f(x)}" cy="${f(y)}" r="${CIRC_R}" fill="${bg}" stroke="${stroke}" stroke-width="0.75"/>`,
        `<text x="${f(x)}" y="${f(y+3.5)}" text-anchor="middle" font-size="8.5" font-family="sans-serif" fill="${textCol}" font-weight="700">${gate}</text>`,
      );
    });
  });
  return parts.join("\n");
}

// ── Center name label ──────────────────────────────────────────────────────────
function renderCenterLabel(cx: number, cy: number, s: Shape, r: number, def: boolean, label: string): string {
  const color = def ? C_LABEL_DEF : C_LABEL_UNDEF;
  let baseY: number;
  if (s === "square")       baseY = cy - r + 15;
  else if (s === "diamond") baseY = cy + r - 12;
  else if (s === "tri-up")  baseY = cy + r - 12;
  else                      baseY = cy - r + 15; // tri-down

  const lines = label.split("\n");
  if (lines.length === 2) {
    return [
      `<text x="${f(cx)}" y="${f(baseY - 7)}" text-anchor="middle" font-size="11" font-family="sans-serif" fill="${color}" font-weight="500">${lines[0]}</text>`,
      `<text x="${f(cx)}" y="${f(baseY + 7)}" text-anchor="middle" font-size="11" font-family="sans-serif" fill="${color}" font-weight="500">${lines[1]}</text>`,
    ].join("\n");
  }
  return `<text x="${f(cx)}" y="${f(baseY)}" text-anchor="middle" font-size="12" font-family="sans-serif" fill="${color}" font-weight="500">${label}</text>`;
}

// ── Channel rendering — single thick band, half-coloured by gate activation ────
const ARC_GROUPS  = new Set(["Spleen__Root", "SolarPlexus__Root"]);
const SW_ACTIVE   = 8;
const SW_INACTIVE = 2;

function gateStyle(isP: boolean, isD: boolean): { col: string; sw: number } {
  if (isP && isD) return { col: C_BOTH,         sw: SW_ACTIVE };
  if (isP)        return { col: C_PERSONALITY,   sw: SW_ACTIVE };
  if (isD)        return { col: C_DESIGN,        sw: SW_ACTIVE };
  return           { col: C_INACTIVE_LINE, sw: SW_INACTIVE };
}

function renderStraightChannel(
  gA: number, gB: number,
  pGates: Set<number>, dGates: Set<number>,
  gatePositions: Map<number, GatePos>,
): string {
  const posA = gatePositions.get(gA), posB = gatePositions.get(gB);
  if (!posA || !posB) return "";

  const mx = (posA.x + posB.x) / 2, my = (posA.y + posB.y) / 2;
  const sA = gateStyle(pGates.has(gA), dGates.has(gA));
  const sB = gateStyle(pGates.has(gB), dGates.has(gB));

  return [
    `<line x1="${f(posA.x)}" y1="${f(posA.y)}" x2="${f(mx)}" y2="${f(my)}" stroke="${sA.col}" stroke-width="${sA.sw}" stroke-linecap="round"/>`,
    `<line x1="${f(mx)}" y1="${f(my)}" x2="${f(posB.x)}" y2="${f(posB.y)}" stroke="${sB.col}" stroke-width="${sB.sw}" stroke-linecap="round"/>`,
  ].join("\n");
}

function renderArcChannel(
  gA: number, gB: number,
  pGates: Set<number>, dGates: Set<number>,
  gatePositions: Map<number, GatePos>,
): string {
  const posA = gatePositions.get(gA), posB = gatePositions.get(gB);
  if (!posA || !posB) return "";
  const pA = posA, pB = posB;

  const cx_mid = (pA.x + pB.x) / 2, cy_mid = (pA.y + pB.y) / 2;
  const isLeft = pA.x < 280;
  const cpx = isLeft ? cx_mid - 185 : cx_mid + 185;
  const cpy = cy_mid;

  // Quadratic bezier midpoint: 0.25*A + 0.5*CP + 0.25*B
  const midX = 0.25 * pA.x + 0.5 * cpx + 0.25 * pB.x;
  const midY = 0.25 * pA.y + 0.5 * cpy + 0.25 * pB.y;
  // Sub-control points for each half
  const cp1x = (pA.x + cpx) / 2, cp1y = (pA.y + cpy) / 2;
  const cp2x = (cpx + pB.x) / 2, cp2y = (cpy + pB.y) / 2;

  const sA = gateStyle(pGates.has(gA), dGates.has(gA));
  const sB = gateStyle(pGates.has(gB), dGates.has(gB));

  return [
    `<path d="M ${f(pA.x)} ${f(pA.y)} Q ${f(cp1x)} ${f(cp1y)} ${f(midX)} ${f(midY)}" stroke="${sA.col}" stroke-width="${sA.sw}" fill="none" stroke-linecap="round"/>`,
    `<path d="M ${f(midX)} ${f(midY)} Q ${f(cp2x)} ${f(cp2y)} ${f(pB.x)} ${f(pB.y)}" stroke="${sB.col}" stroke-width="${sB.sw}" fill="none" stroke-linecap="round"/>`,
  ].join("\n");
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
  const gatePositions = buildGatePositions();
  const parts: string[] = [`<rect width="${W}" height="${H}" fill="#fafaf7"/>`];
  const names = Object.keys(POS) as CenterName[];

  // 1. Channel bands (behind everything)
  for (const [gA, gB, cA, cB] of CHANNELS) {
    const key = `${cA}__${cB}`;
    parts.push(
      ARC_GROUPS.has(key)
        ? renderArcChannel(gA, gB, personalityGates, designGates, gatePositions)
        : renderStraightChannel(gA, gB, personalityGates, designGates, gatePositions),
    );
  }

  // 2. Center fills (cover channel ends inside each center)
  for (const name of names) {
    const [cx, cy] = POS[name];
    parts.push(renderShapeFill(cx, cy, CENTER_SHAPE[name], CENTER_R[name], definedCenters.has(name)));
  }

  // 3. Gate circles on top of center fills
  for (const name of names) {
    const [cx, cy] = POS[name];
    const s = CENTER_SHAPE[name], r = CENTER_R[name];
    parts.push(renderGateCircles(name, cx, cy, s, r, personalityGates, designGates));
  }

  // 4. Center name labels
  for (const name of names) {
    const [cx, cy] = POS[name];
    const s = CENTER_SHAPE[name], r = CENTER_R[name];
    parts.push(renderCenterLabel(cx, cy, s, r, definedCenters.has(name), CENTER_LABEL[name]));
  }

  // 5. Center outlines on top for clean edges
  for (const name of names) {
    const [cx, cy] = POS[name];
    parts.push(renderShapeStroke(cx, cy, CENTER_SHAPE[name], CENTER_R[name], definedCenters.has(name)));
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"`,
    ` width="${W}" height="${H}" style="max-width:100%;height:auto">`,
    ...parts,
    `</svg>`,
  ].join("\n");
}
