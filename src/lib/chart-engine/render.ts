import type { CenterName } from "./types.js";
import { CHANNELS, CENTER_GATES } from "./data.js";

// ── Canvas ─────────────────────────────────────────────────────────────────────
const W = 720;
const H = 1280;

// ── Center positions & sizes ───────────────────────────────────────────────────
const POS: Record<CenterName, [number, number]> = {
  Head:        [360,  90],
  Ajna:        [360, 256],
  Throat:      [360, 472],
  G:           [360, 686],
  Ego:         [545, 588],
  Sacral:      [360, 1008],
  SolarPlexus: [545, 800],
  Spleen:      [175, 800],
  Root:        [360, 1180],
};

// Head/Ajna bigger; Throat medium; SP/Spleen/Sacral bigger; Ego small
const CENTER_R: Record<CenterName, number> = {
  Head: 52, Ajna: 60, Throat: 76, G: 68, Ego: 40,
  Sacral: 74, SolarPlexus: 66, Spleen: 66, Root: 70,
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

function f(n: number): string { return n.toFixed(2); }

interface GatePos { x: number; y: number; }

// ── Gate positions ─────────────────────────────────────────────────────────────
// Each gate sits at GATE_FRAC × radius from its center, directed toward the
// other center in its channel. This places gate circles inside their center
// shape near the edge that faces the connected center.
// Multiple channels between the same pair spread perpendicularly.

const GATE_FRAC = 0.45;  // fraction of radius from center (inside edge)
const GATE_STEP = 12;    // px between parallel channel positions

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
    const px = -ny, py = nx;   // canonical perpendicular

    const n = channels.length;
    const totalSpread = (n - 1) * GATE_STEP;

    // Gate-circle anchors inside each center, directed toward the other center
    const baseAx = ax + nx * (rA * GATE_FRAC);
    const baseAy = ay + ny * (rA * GATE_FRAC);
    const baseBx = bx - nx * (rB * GATE_FRAC);
    const baseBy = by - ny * (rB * GATE_FRAC);

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
function shapeAttrs(cx: number, cy: number, s: Shape, r: number): string {
  if (s === "square")
    return `<rect x="${f(cx-r)}" y="${f(cy-r)}" width="${r*2}" height="${r*2}" rx="5"`;
  if (s === "diamond")
    return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy)} ${f(cx)},${f(cy+r)} ${f(cx-r)},${f(cy)}"`;
  if (s === "tri-up")
    return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy+r)} ${f(cx-r)},${f(cy+r)}"`;
  return `<polygon points="${f(cx)},${f(cy+r)} ${f(cx+r)},${f(cy-r)} ${f(cx-r)},${f(cy-r)}"`;
}

function renderShapeFill(cx: number, cy: number, s: Shape, r: number, def: boolean): string {
  return shapeAttrs(cx, cy, s, r) + ` fill="${def ? C_DEF_FILL : C_UNDEF_FILL}"/>`;
}

function renderShapeStroke(cx: number, cy: number, s: Shape, r: number, def: boolean): string {
  const stroke = def ? C_DEF_STROKE : C_UNDEF_STROKE;
  return shapeAttrs(cx, cy, s, r) + ` fill="none" stroke="${stroke}" stroke-width="2.5"/>`;
}

// ── SVG clip-path defs (one per center) ───────────────────────────────────────
// Gate circles are clipped to their center shape so they never overflow the edge.
function renderDefs(): string {
  const clips: string[] = [];
  for (const name of Object.keys(POS) as CenterName[]) {
    const [cx, cy] = POS[name];
    const r = CENTER_R[name] - 3;   // slight inset from visible border
    const s = CENTER_SHAPE[name];
    clips.push(`<clipPath id="clip-${name}">${shapeAttrs(cx, cy, s, r)}/></clipPath>`);
  }
  return `<defs>${clips.join("")}</defs>`;
}

// ── Gate circles inside centers (at gate positions, clipped to shape) ──────────
const CIRC_R = 10;

function renderGateCircles(
  center: CenterName,
  gatePositions: Map<number, GatePos>,
  pGates: Set<number>, dGates: Set<number>,
): string {
  const gates = CENTER_GATES[center];
  const parts: string[] = [];

  for (const gate of gates) {
    const pos = gatePositions.get(gate);
    if (!pos) continue;
    const isP = pGates.has(gate), isD = dGates.has(gate);
    let bg: string, textCol: string, strokeAttr: string;
    if (isP && isD)  { bg = C_BOTH;        textCol = "#fff"; strokeAttr = ""; }
    else if (isP)    { bg = C_PERSONALITY;  textCol = "#fff"; strokeAttr = ""; }
    else if (isD)    { bg = C_DESIGN;       textCol = "#fff"; strokeAttr = ""; }
    else             { bg = "rgba(255,255,255,0.8)"; textCol = C_INACTIVE_GATE; strokeAttr = ` stroke="${C_UNDEF_STROKE}" stroke-width="0.75"`; }
    parts.push(
      `<circle cx="${f(pos.x)}" cy="${f(pos.y)}" r="${CIRC_R}" fill="${bg}"${strokeAttr}/>`,
      `<text x="${f(pos.x)}" y="${f(pos.y + 3.5)}" text-anchor="middle" font-size="9" font-family="sans-serif" fill="${textCol}" font-weight="700">${gate}</text>`,
    );
  }

  // Wrap in clip group so circles stay within center boundary
  return `<g clip-path="url(#clip-${center})">${parts.join("")}</g>`;
}

// ── Center name labels ─────────────────────────────────────────────────────────
function renderCenterLabel(cx: number, cy: number, s: Shape, r: number, def: boolean, label: string): string {
  const color = def ? C_LABEL_DEF : C_LABEL_UNDEF;
  let baseY: number;
  if (s === "square")       baseY = cy - r + 16;  // top interior of square
  else if (s === "diamond") baseY = cy + r - 14;  // bottom interior of diamond
  else if (s === "tri-up")  baseY = cy + r - 14;  // near base of triangle
  else                      baseY = cy - r + 16;  // near wide top of tri-down

  const lines = label.split("\n");
  if (lines.length === 2) {
    return [
      `<text x="${f(cx)}" y="${f(baseY - 7)}" text-anchor="middle" font-size="12" font-family="sans-serif" fill="${color}" font-weight="500">${lines[0]}</text>`,
      `<text x="${f(cx)}" y="${f(baseY + 8)}" text-anchor="middle" font-size="12" font-family="sans-serif" fill="${color}" font-weight="500">${lines[1]}</text>`,
    ].join("\n");
  }
  return `<text x="${f(cx)}" y="${f(baseY)}" text-anchor="middle" font-size="13" font-family="sans-serif" fill="${color}" font-weight="500">${label}</text>`;
}

// ── Channel rendering ──────────────────────────────────────────────────────────
// Single thick band per channel. Channels span from gate-circle position in one
// center to gate-circle position in the other. Center fills cover the interior
// segments, so channels appear to emerge from each center at the correct gate.
// Each channel is split at its midpoint; each half is coloured by its gate's
// activation state (personality=black, design=red, both=amber, inactive=grey).

const ARC_GROUPS  = new Set(["Spleen__Root", "SolarPlexus__Root"]);
const SW_ACTIVE   = 8;
const SW_INACTIVE = 2;

function gateStyle(isP: boolean, isD: boolean): { col: string; sw: number } {
  if (isP && isD) return { col: C_BOTH,          sw: SW_ACTIVE };
  if (isP)        return { col: C_PERSONALITY,    sw: SW_ACTIVE };
  if (isD)        return { col: C_DESIGN,         sw: SW_ACTIVE };
  return           { col: C_INACTIVE_LINE,  sw: SW_INACTIVE };
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
  const isLeft = pA.x < 360;
  const cpx = isLeft ? cx_mid - 220 : cx_mid + 220;
  const cpy = cy_mid;

  // Split quadratic bezier at t=0.5 into two halves
  const midX = 0.25 * pA.x + 0.5 * cpx + 0.25 * pB.x;
  const midY = 0.25 * pA.y + 0.5 * cpy + 0.25 * pB.y;
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
  const names = Object.keys(POS) as CenterName[];
  const parts: string[] = [];

  // Defs: clip paths so gate circles stay within center boundaries
  parts.push(renderDefs());

  parts.push(`<rect width="${W}" height="${H}" fill="#fafaf7"/>`);

  // Layer 1: channel bands (behind everything)
  for (const [gA, gB, cA, cB] of CHANNELS) {
    const key = `${cA}__${cB}`;
    parts.push(
      ARC_GROUPS.has(key)
        ? renderArcChannel(gA, gB, personalityGates, designGates, gatePositions)
        : renderStraightChannel(gA, gB, personalityGates, designGates, gatePositions),
    );
  }

  // Layer 2: center fills (cover channel segments inside each center)
  for (const name of names) {
    const [cx, cy] = POS[name];
    parts.push(renderShapeFill(cx, cy, CENTER_SHAPE[name], CENTER_R[name], definedCenters.has(name)));
  }

  // Layer 3: gate circles (clipped inside each center, at channel-direction positions)
  for (const name of names) {
    parts.push(renderGateCircles(name, gatePositions, personalityGates, designGates));
  }

  // Layer 4: center name labels (on top of gate circles)
  for (const name of names) {
    const [cx, cy] = POS[name];
    const s = CENTER_SHAPE[name], r = CENTER_R[name];
    parts.push(renderCenterLabel(cx, cy, s, r, definedCenters.has(name), CENTER_LABEL[name]));
  }

  // Layer 5: center outlines (clean borders on top)
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
