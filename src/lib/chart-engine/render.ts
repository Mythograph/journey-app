import type { CenterName } from "./types.js";
import { CHANNELS, CENTER_GATES } from "./data.js";

// ── Canvas ─────────────────────────────────────────────────────────────────────
const W = 500;
const H = 900;

// ── Center positions [cx, cy] ──────────────────────────────────────────────────
// Spine centred at x=250. Side centres offset ±122px.
const POS: Record<CenterName, [number, number]> = {
  Head:        [250,  65],
  Ajna:        [250, 188],
  Throat:      [250, 334],
  G:           [250, 490],
  Ego:         [372, 400],
  Sacral:      [250, 660],
  SolarPlexus: [372, 540],
  Spleen:      [128, 540],
  Root:        [250, 800],
};

// Head/Ajna bigger, Throat smaller, SP/Spleen bigger, Ego unchanged
const CENTER_R: Record<CenterName, number> = {
  Head: 44, Ajna: 50, Throat: 46, G: 52, Ego: 36,
  Sacral: 52, SolarPlexus: 56, Spleen: 56, Root: 52,
};

type Shape = "tri-up" | "tri-down" | "square" | "diamond";

const CENTER_SHAPE: Record<CenterName, Shape> = {
  Head: "tri-up",  Ajna: "tri-down", Throat: "square",
  G: "diamond",    Ego: "tri-up",    Sacral: "square",
  SolarPlexus: "tri-up", Spleen: "tri-up", Root: "square",
};

const CENTER_LABEL: Record<CenterName, string> = {
  Head: "head", Ajna: "ajna", Throat: "throat",
  G: "G", Ego: "ego", Sacral: "sacral",
  SolarPlexus: "sp", Spleen: "spleen", Root: "root",
};

// Max gate columns per center (controls gate number grid layout inside shape)
const CENTER_GATE_COLS: Record<CenterName, number> = {
  Head: 3, Ajna: 3, Throat: 4, G: 3,
  Ego: 2, Sacral: 3, SolarPlexus: 4, Spleen: 4, Root: 3,
};

// ── Colours ────────────────────────────────────────────────────────────────────
const C_PERSONALITY    = "#111111";
const C_DESIGN         = "#c0392b";
const C_INACTIVE_LINE  = "#ccc8de";
const C_INACTIVE_GATE  = "#aaa8c0";
const C_DEF_FILL       = "#c05a3c";
const C_DEF_STROKE     = "#9a3d22";
const C_UNDEF_FILL     = "#f0eef8";
const C_UNDEF_STROKE   = "#c0b8d8";
const C_LABEL_DEF      = "#ffffff";
const C_LABEL_UNDEF    = "#9590b4";

// ── Helpers ────────────────────────────────────────────────────────────────────
function f(n: number): string { return n.toFixed(2); }

interface GatePos { x: number; y: number; }

// ── Gate positions (channel endpoints at center edge) ──────────────────────────
const GATE_GAP  = 3;   // px from center edge to channel endpoint
const GATE_STEP = 9;   // px between parallel channel lanes in a group

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
    const baseBx = bx + (-nx) * (rB + GATE_GAP);
    const baseBy = by + (-ny) * (rB + GATE_GAP);

    channels.forEach((ch, i) => {
      const [gA, gB] = ch;
      const offset = -totalSpread / 2 + i * GATE_STEP;
      if (!map.has(gA)) map.set(gA, { x: baseAx + px * offset, y: baseAy + py * offset });
      if (!map.has(gB)) map.set(gB, { x: baseBx + px * offset, y: baseBy + py * offset });
    });
  }

  return map;
}

// ── Center shape ───────────────────────────────────────────────────────────────
function renderShape(cx: number, cy: number, s: Shape, r: number, def: boolean): string {
  const fill   = def ? C_DEF_FILL   : C_UNDEF_FILL;
  const stroke = def ? C_DEF_STROKE : C_UNDEF_STROKE;
  const sw = 1.5;
  if (s === "square")
    return `<rect x="${f(cx-r)}" y="${f(cy-r)}" width="${r*2}" height="${r*2}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (s === "diamond")
    return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy)} ${f(cx)},${f(cy+r)} ${f(cx-r)},${f(cy)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (s === "tri-up")
    return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy+r)} ${f(cx-r)},${f(cy+r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  // tri-down
  return `<polygon points="${f(cx)},${f(cy+r)} ${f(cx+r)},${f(cy-r)} ${f(cx-r)},${f(cy-r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

// ── Gate numbers inside centers ────────────────────────────────────────────────
function renderGatesInCenter(
  center: CenterName,
  cx: number, cy: number,
  shape: Shape, r: number,
  pGates: Set<number>, dGates: Set<number>,
): string {
  const gates = [...CENTER_GATES[center]];
  const maxCols = CENTER_GATE_COLS[center];
  const lineH = 11;
  const colW  = 16;
  const fs    = 8;

  // Vertical center of the gate grid, offset by shape geometry
  let gridCy: number;
  if (shape === "square")    gridCy = cy + 5;
  else if (shape === "diamond") gridCy = cy - 8;
  else if (shape === "tri-up")  gridCy = cy + r * 0.12;
  else                          gridCy = cy - r * 0.10; // tri-down

  // Build rows
  const rows: number[][] = [];
  for (let i = 0; i < gates.length; i += maxCols) {
    rows.push(gates.slice(i, i + maxCols));
  }
  const totalH = (rows.length - 1) * lineH;

  const parts: string[] = [];
  rows.forEach((row, ri) => {
    const y = gridCy - totalH / 2 + ri * lineH;
    const rowSpan = (row.length - 1) * colW;
    row.forEach((gate, ci) => {
      const x = cx - rowSpan / 2 + ci * colW;
      const isP = pGates.has(gate), isD = dGates.has(gate);
      let col: string, fw: string;
      if (isP && isD) { col = "#6a1da0"; fw = "700"; }
      else if (isP)   { col = C_PERSONALITY; fw = "700"; }
      else if (isD)   { col = C_DESIGN; fw = "700"; }
      else            { col = C_INACTIVE_GATE; fw = "400"; }
      parts.push(
        `<text x="${f(x)}" y="${f(y + 3)}" text-anchor="middle" font-size="${fs}" ` +
        `font-family="monospace" fill="${col}" font-weight="${fw}">${gate}</text>`,
      );
    });
  });
  return parts.join("\n");
}

// ── Center name label ──────────────────────────────────────────────────────────
function renderCenterLabel(cx: number, cy: number, s: Shape, r: number, def: boolean, label: string): string {
  const color = def ? C_LABEL_DEF : C_LABEL_UNDEF;
  let labelY: number;
  if (s === "square")   labelY = cy - r + 11;  // inside top of square
  else if (s === "diamond") labelY = cy + r - 8; // inside bottom of diamond
  else if (s === "tri-up")  labelY = cy + r - 9; // inside near base
  else                      labelY = cy - r + 11; // tri-down: inside near wide top

  return `<text x="${f(cx)}" y="${f(labelY)}" text-anchor="middle" font-size="9" font-family="sans-serif" fill="${color}" font-weight="500">${label}</text>`;
}

// ── Channel rendering ──────────────────────────────────────────────────────────
const ARC_GROUPS = new Set(["Spleen__Root", "SolarPlexus__Root"]);

const SW_ACTIVE   = 4.5;
const SW_INACTIVE = 1.5;
const LANE_OFF    = 3.5;

function renderStraightChannel(
  gA: number, gB: number,
  pGates: Set<number>, dGates: Set<number>,
  gatePositions: Map<number, GatePos>,
): string {
  const posA = gatePositions.get(gA), posB = gatePositions.get(gB);
  if (!posA || !posB) return "";

  const mx = (posA.x + posB.x) / 2, my = (posA.y + posB.y) / 2;
  const dx = posB.x - posA.x, dy = posB.y - posA.y;
  const len = Math.sqrt(dx*dx + dy*dy);
  if (len < 1) return "";
  const nx = dx/len, ny = dy/len;
  const px = -ny, py = nx;
  const O = LANE_OFF;

  const gA_p = pGates.has(gA), gA_d = dGates.has(gA);
  const gB_p = pGates.has(gB), gB_d = dGates.has(gB);

  function seg(x1: number, y1: number, x2: number, y2: number, active: boolean, c: string): string {
    const sw = active ? SW_ACTIVE : SW_INACTIVE;
    const fc = active ? c : C_INACTIVE_LINE;
    return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${fc}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }

  // Personality lane (right = −perp) — split at midpoint by gate
  const p1 = seg(posA.x-px*O, posA.y-py*O, mx-px*O, my-py*O, gA_p, C_PERSONALITY);
  const p2 = seg(mx-px*O, my-py*O, posB.x-px*O, posB.y-py*O, gB_p, C_PERSONALITY);
  // Design lane (left = +perp)
  const d1 = seg(posA.x+px*O, posA.y+py*O, mx+px*O, my+py*O, gA_d, C_DESIGN);
  const d2 = seg(mx+px*O, my+py*O, posB.x+px*O, posB.y+py*O, gB_d, C_DESIGN);

  return [p1, p2, d1, d2].join("\n");
}

function renderArcChannel(
  gA: number, gB: number,
  pGates: Set<number>, dGates: Set<number>,
  gatePositions: Map<number, GatePos>,
): string {
  const posA = gatePositions.get(gA), posB = gatePositions.get(gB);
  if (!posA || !posB) return "";
  const pA = posA, pB = posB;

  const cx_mid = (pA.x + pB.x) / 2;
  const cy_mid = (pA.y + pB.y) / 2;
  const isLeft = pA.x < 250;
  const cpx = isLeft ? cx_mid - 175 : cx_mid + 175;
  const cpy = cy_mid;

  const dx = pB.x - pA.x, dy = pB.y - pA.y;
  const len = Math.sqrt(dx*dx + dy*dy);
  const nx = dx/len, ny = dy/len;
  const px = -ny, py = nx;
  const O = LANE_OFF;

  function arc(off: number, c: string, sw: number): string {
    const ax1 = pA.x + px*off, ay1 = pA.y + py*off;
    const ax2 = pB.x + px*off, ay2 = pB.y + py*off;
    const cpx2 = cpx + px*off, cpy2 = cpy + py*off;
    return `<path d="M ${f(ax1)} ${f(ay1)} Q ${f(cpx2)} ${f(cpy2)} ${f(ax2)} ${f(ay2)}" stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>`;
  }

  const pActive = pGates.has(gA) || pGates.has(gB);
  const dActive = dGates.has(gA) || dGates.has(gB);

  return [
    arc(-O, C_INACTIVE_LINE, SW_INACTIVE),
    arc(+O, C_INACTIVE_LINE, SW_INACTIVE),
    pActive ? arc(-O, C_PERSONALITY, SW_ACTIVE) : "",
    dActive ? arc(+O, C_DESIGN,      SW_ACTIVE) : "",
  ].filter(Boolean).join("\n");
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

  const parts: string[] = [
    `<rect width="${W}" height="${H}" fill="#fafaf7"/>`,
  ];

  // Channels behind centers
  for (const [gA, gB, cA, cB] of CHANNELS) {
    const key = `${cA}__${cB}`;
    if (ARC_GROUPS.has(key)) {
      parts.push(renderArcChannel(gA, gB, personalityGates, designGates, gatePositions));
    } else {
      parts.push(renderStraightChannel(gA, gB, personalityGates, designGates, gatePositions));
    }
  }

  // Centers on top of channels
  for (const name of Object.keys(POS) as CenterName[]) {
    const [cx, cy] = POS[name];
    const s = CENTER_SHAPE[name], r = CENTER_R[name];
    const def = definedCenters.has(name);
    parts.push(renderShape(cx, cy, s, r, def));
    parts.push(renderGatesInCenter(name, cx, cy, s, r, personalityGates, designGates));
    parts.push(renderCenterLabel(cx, cy, s, r, def, CENTER_LABEL[name]));
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"`,
    ` width="${W}" height="${H}" style="max-width:100%;height:auto">`,
    ...parts,
    `</svg>`,
  ].join("\n");
}
