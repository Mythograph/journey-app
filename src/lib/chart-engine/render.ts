import type { CenterName } from "./types.js";
import { CHANNELS, CENTER_GATES } from "./data.js";

// ── Canvas ─────────────────────────────────────────────────────────────────────
const W = 620;
const H = 860;

// ── Center positions ───────────────────────────────────────────────────────────
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
const C_INACTIVE_LINE = "#d0cce0";
const C_INACTIVE_GATE = "#9590b4";
const C_DEF_FILL      = "#c05a3c";
const C_DEF_STROKE    = "#9a3d22";
const C_UNDEF_FILL    = "#edeaf5";
const C_UNDEF_STROKE  = "#bab2d0";
const C_LABEL_DEF     = "#ffffff";
const C_LABEL_UNDEF   = "#8a84aa";

function f(n: number): string { return n.toFixed(2); }

interface GatePos { x: number; y: number; }

// ── Gate positions ─────────────────────────────────────────────────────────────
// Each gate circle sits at GATE_FRAC × radius from its center, directed toward
// the connected center. Gates in the same center-pair group spread perpendicularly
// so their channel lines form a visible parallel bundle between centers.

const GATE_FRAC = 0.80;  // gates near the center boundary edge
const GATE_STEP = 13;    // px between parallel channels in the same corridor

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
    const px = -ny, py = nx;  // perpendicular direction

    const n = channels.length;
    const totalSpread = (n - 1) * GATE_STEP;

    // Gate anchors: inside each center near its facing edge
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
    return `<rect x="${f(cx - r)}" y="${f(cy - r)}" width="${r * 2}" height="${r * 2}" rx="4"`;
  if (s === "diamond")
    return `<polygon points="${f(cx)},${f(cy - r)} ${f(cx + r)},${f(cy)} ${f(cx)},${f(cy + r)} ${f(cx - r)},${f(cy)}"`;
  if (s === "tri-up")
    return `<polygon points="${f(cx)},${f(cy - r)} ${f(cx + r)},${f(cy + r)} ${f(cx - r)},${f(cy + r)}"`;
  // tri-down
  return `<polygon points="${f(cx)},${f(cy + r)} ${f(cx + r)},${f(cy - r)} ${f(cx - r)},${f(cy - r)}"`;
}

function renderShapeFill(cx: number, cy: number, s: Shape, r: number, def: boolean): string {
  return shapeAttrs(cx, cy, s, r) + ` fill="${def ? C_DEF_FILL : C_UNDEF_FILL}"/>`;
}

function renderShapeStroke(cx: number, cy: number, s: Shape, r: number, def: boolean): string {
  const stroke = def ? C_DEF_STROKE : C_UNDEF_STROKE;
  return shapeAttrs(cx, cy, s, r) + ` fill="none" stroke="${stroke}" stroke-width="2"/>`;
}

// ── Clip-path defs (one per center) ───────────────────────────────────────────
function renderDefs(): string {
  const clips: string[] = [];
  for (const name of Object.keys(POS) as CenterName[]) {
    const [cx, cy] = POS[name];
    const r = CENTER_R[name] - 1;
    const s = CENTER_SHAPE[name];
    clips.push(`<clipPath id="clip-${name}">${shapeAttrs(cx, cy, s, r)}/></clipPath>`);
  }
  return `<defs>${clips.join("")}</defs>`;
}

// ── Body silhouette background ─────────────────────────────────────────────────
function renderSilhouette(): string {
  // Simplified humanoid torso outline enclosing all centers
  return `<path d="M 310,18 C 385,18 445,65 455,135 L 542,322 L 548,518 L 492,742 L 402,842 L 310,855 L 218,842 L 128,742 L 72,518 L 78,322 C 175,65 235,18 310,18 Z" fill="#ede9f6" opacity="0.40"/>`;
}

// ── Gate circles (clipped inside each center) ──────────────────────────────────
const CIRC_R = 9;

function renderGateCircles(
  center: CenterName,
  gatePositions: Map<number, GatePos>,
  pGates: Set<number>,
  dGates: Set<number>,
): string {
  const parts: string[] = [];
  for (const gate of CENTER_GATES[center]) {
    const pos = gatePositions.get(gate);
    if (!pos) continue;
    const isP = pGates.has(gate), isD = dGates.has(gate);
    let bg: string, textCol: string, strokeAttr: string;
    if (isP && isD)  { bg = C_BOTH;                     textCol = "#fff"; strokeAttr = ""; }
    else if (isP)    { bg = C_PERSONALITY;               textCol = "#fff"; strokeAttr = ""; }
    else if (isD)    { bg = C_DESIGN;                    textCol = "#fff"; strokeAttr = ""; }
    else             { bg = "rgba(255,255,255,0.92)";    textCol = C_INACTIVE_GATE; strokeAttr = ` stroke="${C_UNDEF_STROKE}" stroke-width="0.75"`; }
    parts.push(
      `<circle cx="${f(pos.x)}" cy="${f(pos.y)}" r="${CIRC_R}" fill="${bg}"${strokeAttr}/>`,
      `<text x="${f(pos.x)}" y="${f(pos.y + 3.5)}" text-anchor="middle" font-size="8" font-family="sans-serif" fill="${textCol}" font-weight="700">${gate}</text>`,
    );
  }
  return `<g clip-path="url(#clip-${center})">${parts.join("")}</g>`;
}

// ── Center name labels ─────────────────────────────────────────────────────────
function renderCenterLabel(cx: number, cy: number, s: Shape, r: number, def: boolean, label: string): string {
  const color = def ? C_LABEL_DEF : C_LABEL_UNDEF;
  // For triangles, shift toward the "wide" end so the label avoids the tip
  let ly: number;
  if (s === "tri-up")   ly = cy + r * 0.28;
  else if (s === "tri-down") ly = cy - r * 0.28;
  else                  ly = cy;

  const lines = label.split("\n");
  const fs = s === "diamond" ? 14 : 12;
  if (lines.length === 2) {
    return [
      `<text x="${f(cx)}" y="${f(ly - 7)}" text-anchor="middle" font-size="${fs}" font-family="sans-serif" fill="${color}" font-weight="500">${lines[0]}</text>`,
      `<text x="${f(cx)}" y="${f(ly + 8)}" text-anchor="middle" font-size="${fs}" font-family="sans-serif" fill="${color}" font-weight="500">${lines[1]}</text>`,
    ].join("");
  }
  return `<text x="${f(cx)}" y="${f(ly + 4)}" text-anchor="middle" font-size="${fs}" font-family="sans-serif" fill="${color}" font-weight="500">${label}</text>`;
}

// ── Channel rendering ──────────────────────────────────────────────────────────
// Each channel is a single band split at its midpoint; each half is coloured by
// the activation state of the gate at that end. Center fills cover the interior
// segments so channels appear to run between centers, not through them.

const SW_ACTIVE   = 6;
const SW_INACTIVE = 1.5;

function gateStyle(isP: boolean, isD: boolean): { col: string; sw: number } {
  if (isP && isD) return { col: C_BOTH,        sw: SW_ACTIVE };
  if (isP)        return { col: C_PERSONALITY,  sw: SW_ACTIVE };
  if (isD)        return { col: C_DESIGN,        sw: SW_ACTIVE };
  return           { col: C_INACTIVE_LINE,  sw: SW_INACTIVE };
}

function renderChannel(
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
    `<line x1="${f(posA.x)}" y1="${f(posA.y)}" x2="${f(mx)}" y2="${f(my)}" stroke="${sA.col}" stroke-width="${sA.sw}" stroke-linecap="butt"/>`,
    `<line x1="${f(mx)}" y1="${f(my)}" x2="${f(posB.x)}" y2="${f(posB.y)}" stroke="${sB.col}" stroke-width="${sB.sw}" stroke-linecap="butt"/>`,
  ].join("");
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

  parts.push(renderDefs());
  parts.push(`<rect width="${W}" height="${H}" fill="#fafaf7"/>`);
  parts.push(renderSilhouette());

  // Layer 1 — channel bands (drawn behind centers)
  for (const [gA, gB] of CHANNELS) {
    parts.push(renderChannel(gA, gB, personalityGates, designGates, gatePositions));
  }

  // Layer 2 — center fills (cover channel interiors)
  for (const name of names) {
    const [cx, cy] = POS[name];
    parts.push(renderShapeFill(cx, cy, CENTER_SHAPE[name], CENTER_R[name], definedCenters.has(name)));
  }

  // Layer 3 — gate circles (clipped to center shape)
  for (const name of names) {
    parts.push(renderGateCircles(name, gatePositions, personalityGates, designGates));
  }

  // Layer 4 — center name labels
  for (const name of names) {
    const [cx, cy] = POS[name];
    const s = CENTER_SHAPE[name], r = CENTER_R[name];
    parts.push(renderCenterLabel(cx, cy, s, r, definedCenters.has(name), CENTER_LABEL[name]));
  }

  // Layer 5 — center outlines
  for (const name of names) {
    const [cx, cy] = POS[name];
    parts.push(renderShapeStroke(cx, cy, CENTER_SHAPE[name], CENTER_R[name], definedCenters.has(name)));
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto">`,
    ...parts,
    `</svg>`,
  ].join("\n");
}
