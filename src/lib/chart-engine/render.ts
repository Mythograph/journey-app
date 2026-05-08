import type { CenterName } from "./types.js";
import { CHANNELS } from "./data.js";

// ── Canvas ─────────────────────────────────────────────────────────────────────
const W = 520;
const H = 960;

// ── Center positions [cx, cy] ──────────────────────────────────────────────────
// Spine centred at x=260. Side centres at ±130 px.
const POS: Record<CenterName, [number, number]> = {
  Head:        [260,  70],
  Ajna:        [260, 200],
  Throat:      [260, 370],
  G:           [260, 530],
  Ego:         [390, 452],
  Sacral:      [260, 730],
  SolarPlexus: [390, 620],
  Spleen:      [130, 620],
  Root:        [260, 872],
};

// Head/Ajna bigger, Throat smaller, SP/Spleen bigger, Ego small
const CENTER_R: Record<CenterName, number> = {
  Head: 40, Ajna: 46, Throat: 40, G: 46, Ego: 24,
  Sacral: 48, SolarPlexus: 48, Spleen: 48, Root: 44,
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
  SolarPlexus: "solar\nplexus", Spleen: "spleen", Root: "root",
};

// ── Colours ────────────────────────────────────────────────────────────────────
const C_PERSONALITY    = "#111111";
const C_DESIGN         = "#c0392b";
const C_BOTH           = "#6a1da0";
const C_INACTIVE_LINE  = "#ccc8de";
const C_INACTIVE_GATE  = "#b0aac8";
const C_DEF_FILL       = "#c05a3c";
const C_DEF_STROKE     = "#9a3d22";
const C_UNDEF_FILL     = "#f0eef8";
const C_UNDEF_STROKE   = "#c0b8d8";
const C_LABEL_DEF      = "#ffffff";
const C_LABEL_UNDEF    = "#9590b4";

// ── Helpers ────────────────────────────────────────────────────────────────────
function f(n: number): string { return n.toFixed(2); }

interface GatePos { x: number; y: number; }

// ── Gate positions (channel endpoints + label anchors) ─────────────────────────
// Each gate sits OUTSIDE its center edge, directed toward the connected center.
// Multiple channels between the same pair are spread perpendicularly so that
// both ends form perfectly parallel lines.

const GATE_GAP  = 20;  // px from center edge to gate-label anchor
const GATE_STEP = 15;  // px between parallel gate slots in a group

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

// ── Center name label (inside shape) ──────────────────────────────────────────
function renderCenterLabel(cx: number, cy: number, s: Shape, r: number, def: boolean, label: string): string {
  const color = def ? C_LABEL_DEF : C_LABEL_UNDEF;
  const fw = "500";

  let baseY = cy + 4;
  if (s === "tri-up")   baseY = cy + r * 0.35;
  if (s === "tri-down") baseY = cy - r * 0.18;

  const lines = label.split("\n");
  if (lines.length === 2) {
    return [
      `<text x="${f(cx)}" y="${f(baseY - 6)}" text-anchor="middle" font-size="10" font-family="sans-serif" fill="${color}" font-weight="${fw}">${lines[0]}</text>`,
      `<text x="${f(cx)}" y="${f(baseY + 7)}" text-anchor="middle" font-size="10" font-family="sans-serif" fill="${color}" font-weight="${fw}">${lines[1]}</text>`,
    ].join("\n");
  }
  return `<text x="${f(cx)}" y="${f(baseY)}" text-anchor="middle" font-size="10" font-family="sans-serif" fill="${color}" font-weight="${fw}">${label}</text>`;
}

// ── Gate number labels — coloured badge squares, one per channel endpoint ─────
// Badge colour: dark=personality only, red=design only, amber=both, white=undefined
function renderGateLabels(
  gatePositions: Map<number, GatePos>,
  pGates: Set<number>,
  dGates: Set<number>,
): string {
  const bw = 17, bh = 13, rx = 2.5;
  const parts: string[] = [];
  for (const [gate, pos] of gatePositions) {
    const isP = pGates.has(gate), isD = dGates.has(gate);
    let bg: string, textCol: string, strokeCol: string, strokeW: string;
    if (isP && isD)  { bg = "#d4740a"; textCol = "#fff"; strokeCol = "none"; strokeW = "0"; }
    else if (isP)    { bg = "#1a1410"; textCol = "#fff"; strokeCol = "none"; strokeW = "0"; }
    else if (isD)    { bg = "#c0392b"; textCol = "#fff"; strokeCol = "none"; strokeW = "0"; }
    else             { bg = "#ffffff"; textCol = C_INACTIVE_GATE; strokeCol = "#c0b8d8"; strokeW = "0.75"; }
    const x = pos.x, y = pos.y;
    parts.push(
      `<rect x="${f(x-bw/2)}" y="${f(y-bh/2)}" width="${bw}" height="${bh}" rx="${rx}" fill="${bg}" stroke="${strokeCol}" stroke-width="${strokeW}"/>`,
      `<text x="${f(x)}" y="${f(y+3.5)}" text-anchor="middle" font-size="8.5" font-family="sans-serif" fill="${textCol}" font-weight="600">${gate}</text>`,
    );
  }
  return parts.join("\n");
}

// ── Channel rendering ──────────────────────────────────────────────────────────
// Dual-lane: personality lane (black) offset one side, design lane (red) other.
// Each lane split at midpoint — only the half touching an active gate is coloured.

const ARC_GROUPS = new Set(["Spleen__Root", "SolarPlexus__Root"]);

const SW_ACTIVE   = 5.5;
const SW_INACTIVE = 1.5;
const LANE_OFF    = 3.5;  // px perpendicular offset for each lane

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

  // Personality lane offset by −perp (right side), split at midpoint
  const p1 = seg(posA.x-px*O, posA.y-py*O, mx-px*O, my-py*O, gA_p, C_PERSONALITY);
  const p2 = seg(mx-px*O, my-py*O, posB.x-px*O, posB.y-py*O, gB_p, C_PERSONALITY);
  // Design lane offset by +perp (left side), split at midpoint
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
  const isLeft = pA.x < 260;
  const cpx = isLeft ? cx_mid - 155 : cx_mid + 155;
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

  // 1. Channels (lowest layer)
  for (const [gA, gB, cA, cB] of CHANNELS) {
    const key = `${cA}__${cB}`;
    if (ARC_GROUPS.has(key)) {
      parts.push(renderArcChannel(gA, gB, personalityGates, designGates, gatePositions));
    } else {
      parts.push(renderStraightChannel(gA, gB, personalityGates, designGates, gatePositions));
    }
  }

  // 2. Gate number labels (above channels, behind centers)
  parts.push(renderGateLabels(gatePositions, personalityGates, designGates));

  // 3. Centers and their name labels (topmost)
  for (const name of Object.keys(POS) as CenterName[]) {
    const [cx, cy] = POS[name];
    const s = CENTER_SHAPE[name], r = CENTER_R[name];
    const def = definedCenters.has(name);
    parts.push(renderShape(cx, cy, s, r, def));
    parts.push(renderCenterLabel(cx, cy, s, r, def, CENTER_LABEL[name]));
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"`,
    ` width="${W}" height="${H}" style="max-width:100%;height:auto">`,
    ...parts,
    `</svg>`,
  ].join("\n");
}
