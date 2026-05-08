import type { CenterName } from "./types.js";
import { CHANNELS } from "./data.js";

// ── Canvas ─────────────────────────────────────────────────────────────────────
// Portrait layout: bodygraph centred, activation columns on each side.
const W = 700;
const H = 840;

// ── Center positions [cx, cy] ──────────────────────────────────────────────────
// Spine centred at x=350. Side centres offset ±145px.
const POS: Record<CenterName, [number, number]> = {
  Head:        [350,  72],
  Ajna:        [350, 178],
  Throat:      [350, 304],
  G:           [350, 450],
  Ego:         [495, 376],
  Sacral:      [350, 580],
  SolarPlexus: [495, 516],
  Spleen:      [205, 516],
  Root:        [350, 720],
};

const CENTER_R: Record<CenterName, number> = {
  Head: 28, Ajna: 26, Throat: 40, G: 46, Ego: 26,
  Sacral: 44, SolarPlexus: 30, Spleen: 30, Root: 36,
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
const C_PERSONALITY    = "#111111";  // conscious  — black
const C_DESIGN         = "#c0392b";  // unconscious — red
const C_BOTH           = "#6a1da0";  // both sides — purple
const C_INACTIVE_LINE  = "#c8c4d8";  // undefined channel line
const C_INACTIVE_GATE  = "#b0acc4";  // inactive gate label
const C_DEF_FILL       = "#c05a3c";  // brand terra — defined center
const C_DEF_STROKE     = "#9a3d22";
const C_UNDEF_FILL     = "#f5f3fb";
const C_UNDEF_STROKE   = "#b0a8c8";
const C_LABEL_DEF      = "#ffffff";
const C_LABEL_UNDEF    = "#9590b4";

// ── Planet glyphs ──────────────────────────────────────────────────────────────
const PLANET_GLYPH: Record<string, string> = {
  Sun: "☉", Earth: "⊕", Moon: "☽", Mercury: "☿", Venus: "♀",
  Mars: "♂", Jupiter: "♃", Saturn: "♄", Uranus: "♅", Neptune: "♆",
  Pluto: "♇", NorthNode: "☊", SouthNode: "☋",
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function f(n: number): string { return n.toFixed(2); }

interface GatePos { x: number; y: number; }

// ── Gate positions ─────────────────────────────────────────────────────────────
// Each gate sits just outside its center's edge, directed toward the other
// center in its channel. Multiple channels between the same pair of centres are
// spread perpendicularly (using a consistent canonical perpendicular so both
// ends form perfectly parallel lines).

const GATE_GAP  = 14;  // px from center edge to gate-label anchor
const GATE_STEP =  9;  // px between parallel gate slots in a group

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
    const px = -ny, py = nx;  // canonical perpendicular (left-hand turn of cA→cB)

    const n = channels.length;
    const totalSpread = (n - 1) * GATE_STEP;

    // Gate-label anchors just outside each center's edge
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

// ── Center shapes ──────────────────────────────────────────────────────────────
function renderShape(cx: number, cy: number, s: Shape, r: number, def: boolean): string {
  const fill   = def ? C_DEF_FILL   : C_UNDEF_FILL;
  const stroke = def ? C_DEF_STROKE : C_UNDEF_STROKE;
  const sw = 1.5;
  if (s === "square")
    return `<rect x="${f(cx-r)}" y="${f(cy-r)}" width="${r*2}" height="${r*2}" rx="5" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (s === "diamond")
    return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy)} ${f(cx)},${f(cy+r)} ${f(cx-r)},${f(cy)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (s === "tri-up")
    return `<polygon points="${f(cx)},${f(cy-r)} ${f(cx+r)},${f(cy+r)} ${f(cx-r)},${f(cy+r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  return `<polygon points="${f(cx)},${f(cy+r)} ${f(cx+r)},${f(cy-r)} ${f(cx-r)},${f(cy-r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function renderCenterLabel(cx: number, cy: number, s: Shape, r: number, def: boolean, label: string): string {
  const color = def ? C_LABEL_DEF : C_LABEL_UNDEF;
  const fw    = "500";
  let baseY = cy + 4;
  if (s === "tri-up")   baseY = cy + r * 0.44;
  if (s === "tri-down") baseY = cy - r * 0.14;

  // Handle two-line labels (SolarPlexus)
  const lines = label.split("\n");
  if (lines.length === 2) {
    return [
      `<text x="${f(cx)}" y="${f(baseY - 5)}" text-anchor="middle" font-size="10" font-family="sans-serif" fill="${color}" font-weight="${fw}">${lines[0]}</text>`,
      `<text x="${f(cx)}" y="${f(baseY + 7)}" text-anchor="middle" font-size="10" font-family="sans-serif" fill="${color}" font-weight="${fw}">${lines[1]}</text>`,
    ].join("\n");
  }
  return `<text x="${f(cx)}" y="${f(baseY)}" text-anchor="middle" font-size="10" font-family="sans-serif" fill="${color}" font-weight="${fw}">${label}</text>`;
}

// ── Gate labels ────────────────────────────────────────────────────────────────
// Plain text, no circles. Colour shows which side activated the gate.

function renderGateLabels(
  gatePositions: Map<number, GatePos>,
  pGates: Set<number>,
  dGates: Set<number>,
): string {
  const parts: string[] = [];
  for (const [gate, pos] of gatePositions) {
    const isP = pGates.has(gate), isD = dGates.has(gate);
    const col = (isP && isD) ? C_BOTH : isP ? C_PERSONALITY : isD ? C_DESIGN : C_INACTIVE_GATE;
    const fw  = (isP || isD) ? "700" : "400";
    const fs  = (isP || isD) ? "10"  : "9";
    parts.push(
      `<text x="${f(pos.x)}" y="${f(pos.y + 3.5)}" text-anchor="middle" ` +
      `font-size="${fs}" font-family="sans-serif" fill="${col}" font-weight="${fw}">${gate}</text>`,
    );
  }
  return parts.join("\n");
}

// ── Channel line rendering ─────────────────────────────────────────────────────
// One line per channel, connecting the two gate-label positions.
// Defined channel (any gate active on either side) = coloured; else grey.
// For Spleen→Root and SP→Root, sweeping bezier arcs are used instead.

const ARC_GROUPS = new Set(["Spleen__Root", "SolarPlexus__Root"]);

function channelColour(gA: number, gB: number, pGates: Set<number>, dGates: Set<number>): string {
  const pDef = pGates.has(gA) || pGates.has(gB);
  const dDef = dGates.has(gA) || dGates.has(gB);
  if (pDef && dDef) return C_BOTH;
  if (pDef) return C_PERSONALITY;
  if (dDef) return C_DESIGN;
  return C_INACTIVE_LINE;
}

function renderStraightChannel(
  gA: number, gB: number,
  cA: CenterName, _cB: CenterName,
  pGates: Set<number>, dGates: Set<number>,
  gatePositions: Map<number, GatePos>,
): string {
  const posA = gatePositions.get(gA), posB = gatePositions.get(gB);
  if (!posA || !posB) return "";

  const col = channelColour(gA, gB, pGates, dGates);
  const sw  = col === C_INACTIVE_LINE ? "1.2" : "2";

  // Half-channel colouring: split at midpoint; each half coloured by its gate.
  const mx = (posA.x + posB.x) / 2, my = (posA.y + posB.y) / 2;
  const dx = posB.x - posA.x, dy = posB.y - posA.y;
  const len = Math.sqrt(dx*dx + dy*dy);
  if (len < 1) return "";
  const nx = dx/len, ny = dy/len;
  const px = -ny, py = nx;
  const OFF = 3;

  const gA_p = pGates.has(gA), gA_d = dGates.has(gA);
  const gB_p = pGates.has(gB), gB_d = dGates.has(gB);
  void cA; // used via col above

  function half(x1: number, y1: number, x2: number, y2: number, active: boolean, c: string) {
    const s = active ? (col === C_INACTIVE_LINE ? "1.2" : sw) : "1.2";
    const fc = active ? c : C_INACTIVE_LINE;
    return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${fc}" stroke-width="${s}"/>`;
  }

  // Personality lane (right = −perp)
  const p1 = half(posA.x-px*OFF, posA.y-py*OFF, mx-px*OFF, my-py*OFF, gA_p, C_PERSONALITY);
  const p2 = half(mx-px*OFF, my-py*OFF, posB.x-px*OFF, posB.y-py*OFF, gB_p, C_PERSONALITY);
  // Design lane (left = +perp)
  const d1 = half(posA.x+px*OFF, posA.y+py*OFF, mx+px*OFF, my+py*OFF, gA_d, C_DESIGN);
  const d2 = half(mx+px*OFF, my+py*OFF, posB.x+px*OFF, posB.y+py*OFF, gB_d, C_DESIGN);

  return [p1, p2, d1, d2].join("\n");
}

function renderArcChannel(
  gA: number, gB: number,
  cA: CenterName, _cB: CenterName,
  pGates: Set<number>, dGates: Set<number>,
  gatePositions: Map<number, GatePos>,
): string {
  const posA = gatePositions.get(gA), posB = gatePositions.get(gB);
  if (!posA || !posB) return "";
  const pA = posA, pB = posB;

  const col = channelColour(gA, gB, pGates, dGates);
  const sw  = col === C_INACTIVE_LINE ? "1.2" : "2";
  void cA;

  // Control point: sweep outward (left for Spleen, right for SP)
  const cx_mid = (pA.x + pB.x) / 2;
  const cy_mid = (pA.y + pB.y) / 2;
  const isLeft = pA.x < 350;  // Spleen side
  const cpx = isLeft ? cx_mid - 185 : cx_mid + 185;
  const cpy = cy_mid;

  // Dual-lane offset along the chord perpendicular
  const dx = pB.x - pA.x, dy = pB.y - pA.y;
  const len = Math.sqrt(dx*dx + dy*dy);
  const nx = dx/len, ny = dy/len;
  const px = -ny, py = nx;
  const OFF = 3;

  function arc(off: number, c: string, strokeW: string): string {
    const ax1 = pA.x + px*off, ay1 = pA.y + py*off;
    const ax2 = pB.x + px*off, ay2 = pB.y + py*off;
    const cpx2 = cpx + px*off, cpy2 = cpy + py*off;
    return `<path d="M ${f(ax1)} ${f(ay1)} Q ${f(cpx2)} ${f(cpy2)} ${f(ax2)} ${f(ay2)}" stroke="${c}" stroke-width="${strokeW}" fill="none"/>`;
  }

  const pActive = pGates.has(gA) || pGates.has(gB);
  const dActive = dGates.has(gA) || dGates.has(gB);

  return [
    arc(-OFF, C_INACTIVE_LINE, "1.2"),  // personality lane base
    arc(+OFF, C_INACTIVE_LINE, "1.2"),  // design lane base
    pActive ? arc(-OFF, C_PERSONALITY, "2")  : "",
    dActive ? arc(+OFF, C_DESIGN,       "2") : "",
  ].filter(Boolean).join("\n");
}

// ── Side activation columns ────────────────────────────────────────────────────
// Personality (right) and Design (left), showing planet glyph + gate.line
// at the y-coordinate of each activated gate on the chart.

function renderSideColumns(
  personalityActivations: { planet: string; gate: number; line: number }[],
  designActivations:      { planet: string; gate: number; line: number }[],
  gatePositions: Map<number, GatePos>,
): string {
  const parts: string[] = [];
  const PX = 648, DX = 52;  // column x centres

  parts.push(`<text x="${PX}" y="22" text-anchor="middle" font-size="8" font-family="sans-serif" fill="${C_PERSONALITY}" font-weight="600" letter-spacing="1">PERSONALITY</text>`);
  parts.push(`<text x="${DX}" y="22" text-anchor="middle" font-size="8" font-family="sans-serif" fill="${C_DESIGN}" font-weight="600" letter-spacing="1">DESIGN</text>`);

  function colEntries(
    activations: { planet: string; gate: number; line: number }[],
    x: number, col: string,
  ) {
    const sorted = [...activations].sort((a, b) => {
      return (gatePositions.get(a.gate)?.y ?? 999) - (gatePositions.get(b.gate)?.y ?? 999);
    });
    for (const { planet, gate, line } of sorted) {
      const pos = gatePositions.get(gate);
      if (!pos) continue;
      const glyph = PLANET_GLYPH[planet] ?? planet;
      parts.push(
        `<text x="${x}" y="${f(pos.y + 3.5)}" text-anchor="middle" font-size="9.5" font-family="sans-serif" fill="${col}" font-weight="600">${glyph} ${gate}.${line}</text>`,
      );
    }
  }

  colEntries(personalityActivations, PX, C_PERSONALITY);
  colEntries(designActivations, DX, C_DESIGN);

  return parts.join("\n");
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
  personalityActivations, designActivations,
}: RenderInput): string {
  const gatePositions = buildGatePositions();

  const parts: string[] = [
    `<rect width="${W}" height="${H}" fill="#fafaf7"/>`,
  ];

  // Side columns
  parts.push(renderSideColumns(personalityActivations, designActivations, gatePositions));

  // Channels (behind gates and centers)
  for (const [gA, gB, cA, cB] of CHANNELS) {
    const key = `${cA}__${cB}`;
    if (ARC_GROUPS.has(key)) {
      parts.push(renderArcChannel(gA, gB, cA, cB, personalityGates, designGates, gatePositions));
    } else {
      parts.push(renderStraightChannel(gA, gB, cA, cB, personalityGates, designGates, gatePositions));
    }
  }

  // Gate labels (on top of channels, behind centers)
  parts.push(renderGateLabels(gatePositions, personalityGates, designGates));

  // Centers (topmost)
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
