import type { CenterName } from "./types.js";
import { CHANNELS } from "./data.js";

const W = 700;
const H = 660;

// ── Center positions [cx, cy] — scaled up ~1.3× from original ────────────────
const POS: Record<CenterName, [number, number]> = {
  Head:        [350,  60],
  Ajna:        [350, 148],
  Throat:      [350, 247],
  G:           [350, 356],
  Ego:         [470, 302],
  Sacral:      [350, 484],
  SolarPlexus: [470, 419],
  Spleen:      [230, 419],
  Root:        [350, 593],
};

type Shape = "tri-up" | "tri-down" | "square" | "diamond";

const CENTER_SHAPE: Record<CenterName, Shape> = {
  Head: "tri-up",  Ajna: "tri-down", Throat: "square",
  G: "diamond",    Ego: "tri-up",    Sacral: "square",
  SolarPlexus: "tri-up", Spleen: "tri-up", Root: "square",
};

const CENTER_R: Record<CenterName, number> = {
  Head: 25, Ajna: 25, Throat: 34, G: 38, Ego: 24,
  Sacral: 40, SolarPlexus: 27, Spleen: 27, Root: 28,
};

const CENTER_LABEL: Record<CenterName, string> = {
  Head: "Head", Ajna: "Ajna", Throat: "Throat",
  G: "G", Ego: "Ego", Sacral: "Sacral",
  SolarPlexus: "SP", Spleen: "Spleen", Root: "Root",
};

// ── Colours ───────────────────────────────────────────────────────────────────
// Personality = conscious = black; Design = unconscious = red.
// These match standard Human Design convention.
const C_PERSONALITY   = "#111111";   // conscious / personality
const C_DESIGN        = "#c0392b";   // unconscious / design
const C_BOTH          = "#6a1da0";   // gate active on both sides
const C_INACTIVE      = "#9e98b8";   // inactive lane segment — visible grey
const C_GATE_OFF      = "#c0bcd4";   // gate number when not activated
const C_DEF_FILL      = "#3a4f99";   // brand indigo — defined center fill
const C_DEF_STROKE    = "#2d3f80";
const C_UNDEF_FILL    = "#f6f4fb";
const C_UNDEF_STROKE  = "#b0a8c8";
const C_LABEL_DEF     = "#ffffff";
const C_LABEL_UNDEF   = "#9590b4";

// ── Helpers ───────────────────────────────────────────────────────────────────

function f(n: number): string { return n.toFixed(1); }

// ── Gate positions ────────────────────────────────────────────────────────────
// Pre-compute (x, y) for every gate so both channel labels and side columns
// can share the same coordinates.

interface GatePos { x: number; y: number; }

function buildGatePositions(): Map<number, GatePos> {
  const map = new Map<number, GatePos>();
  for (const [gA, gB, cA, cB] of CHANNELS) {
    const [x1, y1] = POS[cA];
    const [x2, y2] = POS[cB];
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / len, ny = dy / len;
    map.set(gA, { x: x1 + nx * len * 0.30, y: y1 + ny * len * 0.30 });
    map.set(gB, { x: x1 + nx * len * 0.70, y: y1 + ny * len * 0.70 });
  }
  return map;
}

// ── Center shapes ─────────────────────────────────────────────────────────────

function renderShape(cx: number, cy: number, s: Shape, r: number, defined: boolean): string {
  const fill   = defined ? C_DEF_FILL   : C_UNDEF_FILL;
  const stroke = defined ? C_DEF_STROKE : C_UNDEF_STROKE;
  const sw = 1.5;
  if (s === "square")  return `<rect x="${f(cx-r)}" y="${f(cy-r)}" width="${r*2}" height="${r*2}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (s === "diamond") return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy)} ${f(cx)},${f(cy+r)} ${f(cx-r)},${f(cy)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (s === "tri-up")  return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy+r)} ${f(cx-r)},${f(cy+r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  /* tri-down */       return `<polygon points="${f(cx)},${f(cy+r)} ${f(cx+r)},${f(cy-r)} ${f(cx-r)},${f(cy-r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function renderLabel(cx: number, cy: number, s: Shape, r: number, defined: boolean, label: string): string {
  const color = defined ? C_LABEL_DEF : C_LABEL_UNDEF;
  const fw    = defined ? "700" : "400";
  let ly = cy + 5;
  if (s === "tri-up")   ly = cy + r * 0.44;
  if (s === "tri-down") ly = cy - r * 0.12;
  return `<text x="${f(cx)}" y="${f(ly)}" text-anchor="middle" font-size="11" font-family="sans-serif" fill="${color}" font-weight="${fw}">${label}</text>`;
}

// ── Channel renderer ──────────────────────────────────────────────────────────
// Two parallel lanes (RIGHT = personality, LEFT = design).
// Each lane is split at the midpoint: the A-half is coloured only when gate A
// is active on that side; the B-half only when gate B is active.

function renderChannel(
  gA: number, gB: number,
  cA: CenterName, cB: CenterName,
  pGates: Set<number>, dGates: Set<number>,
  gatePositions: Map<number, GatePos>,
): string {
  const [x1, y1] = POS[cA];
  const [x2, y2] = POS[cB];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;

  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = dx / len, ny = dy / len;
  const px = -ny, py = nx;   // perpendicular (left-hand turn = left for downward channels)
  const OFF = 4;

  const gA_p = pGates.has(gA), gA_d = dGates.has(gA);
  const gB_p = pGates.has(gB), gB_d = dGates.has(gB);

  function seg(ax: number, ay: number, bx: number, by: number, active: boolean, col: string): string {
    return `<line x1="${f(ax)}" y1="${f(ay)}" x2="${f(bx)}" y2="${f(by)}" stroke="${active ? col : C_INACTIVE}" stroke-width="2"/>`;
  }

  // Personality lane (right = −perp)
  const p1 = seg(x1-px*OFF, y1-py*OFF, mx-px*OFF, my-py*OFF, gA_p, C_PERSONALITY);
  const p2 = seg(mx-px*OFF, my-py*OFF, x2-px*OFF, y2-py*OFF, gB_p, C_PERSONALITY);
  // Design lane (left = +perp)
  const d1 = seg(x1+px*OFF, y1+py*OFF, mx+px*OFF, my+py*OFF, gA_d, C_DESIGN);
  const d2 = seg(mx+px*OFF, my+py*OFF, x2+px*OFF, y2+py*OFF, gB_d, C_DESIGN);

  // Gate labels — shown for all 64 gates on the bodygraph
  function gateLabel(gate: number, gx: number, gy: number, isP: boolean, isD: boolean): string {
    const col = (isP && isD) ? C_BOTH : isP ? C_PERSONALITY : isD ? C_DESIGN : C_GATE_OFF;
    const fw  = (isP || isD) ? "700" : "400";
    // offset label perpendicular to channel, outward from the lanes
    const lx = gx - px * (OFF + 10);
    const ly = gy - py * (OFF + 10);
    return `<text x="${f(lx)}" y="${f(ly+3)}" text-anchor="middle" font-size="8" font-family="monospace" fill="${col}" font-weight="${fw}">${gate}</text>`;
  }

  const posA = gatePositions.get(gA)!;
  const posB = gatePositions.get(gB)!;
  const labelA = gateLabel(gA, posA.x, posA.y, gA_p, gA_d);
  const labelB = gateLabel(gB, posB.x, posB.y, gB_p, gB_d);

  return [p1, p2, d1, d2, labelA, labelB].join("\n");
}

// ── Activated-gate side columns ───────────────────────────────────────────────
// Only the person's activated gates appear here, positioned at the same
// y-coordinate as their gate is on the bodygraph. Right = personality/conscious,
// left = design/unconscious.

function renderSideColumns(
  pGates: Set<number>, dGates: Set<number>,
  gatePositions: Map<number, GatePos>,
): string {
  const parts: string[] = [];

  const COL_P_X = 634;   // right column — personality
  const COL_D_X =  66;   // left  column — design

  // Headers
  parts.push(`<text x="${COL_P_X}" y="20" text-anchor="middle" font-size="7.5" font-family="sans-serif" fill="${C_PERSONALITY}" font-weight="600" letter-spacing="0.3">Conscious</text>`);
  parts.push(`<text x="${COL_D_X}"  y="20" text-anchor="middle" font-size="7.5" font-family="sans-serif" fill="${C_DESIGN}"      font-weight="600" letter-spacing="0.3">Unconscious</text>`);

  // Personality gates (right column)
  for (const gate of [...pGates].sort((a, b) => {
    const ay = gatePositions.get(a)?.y ?? 999;
    const by = gatePositions.get(b)?.y ?? 999;
    return ay - by;
  })) {
    const pos = gatePositions.get(gate);
    if (!pos) continue;
    parts.push(
      `<text x="${COL_P_X}" y="${f(pos.y + 3)}" text-anchor="middle" font-size="9" font-family="monospace" fill="${C_PERSONALITY}" font-weight="700">${gate}</text>`,
    );
  }

  // Design gates (left column)
  for (const gate of [...dGates].sort((a, b) => {
    const ay = gatePositions.get(a)?.y ?? 999;
    const by = gatePositions.get(b)?.y ?? 999;
    return ay - by;
  })) {
    const pos = gatePositions.get(gate);
    if (!pos) continue;
    parts.push(
      `<text x="${COL_D_X}" y="${f(pos.y + 3)}" text-anchor="middle" font-size="9" font-family="monospace" fill="${C_DESIGN}" font-weight="700">${gate}</text>`,
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
  const gatePositions = buildGatePositions();

  const parts: string[] = [
    `<rect width="${W}" height="${H}" fill="#fafaf7"/>`,
  ];

  // Side columns (behind everything)
  parts.push(renderSideColumns(personalityGates, designGates, gatePositions));

  // Channels + gate labels (behind centers)
  for (const [gA, gB, cA, cB] of CHANNELS) {
    parts.push(renderChannel(gA, gB, cA, cB, personalityGates, designGates, gatePositions));
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
