import type { CenterName } from "./types.js";
import { CHANNELS } from "./data.js";

// ── Canvas ────────────────────────────────────────────────────────────────────
const W = 800;
const H = 700;

// ── Center positions [cx, cy] ─────────────────────────────────────────────────
const POS: Record<CenterName, [number, number]> = {
  Head:        [400,  62],
  Ajna:        [400, 152],
  Throat:      [400, 255],
  G:           [400, 368],
  Ego:         [528, 308],
  Sacral:      [400, 496],
  SolarPlexus: [528, 430],
  Spleen:      [272, 430],
  Root:        [400, 614],
};

// ── Center radii ──────────────────────────────────────────────────────────────
const CENTER_R: Record<CenterName, number> = {
  Head: 26, Ajna: 26, Throat: 38, G: 42, Ego: 26,
  Sacral: 44, SolarPlexus: 30, Spleen: 30, Root: 32,
};

type Shape = "tri-up" | "tri-down" | "square" | "diamond";

const CENTER_SHAPE: Record<CenterName, Shape> = {
  Head: "tri-up",  Ajna: "tri-down", Throat: "square",
  G: "diamond",    Ego: "tri-up",    Sacral: "square",
  SolarPlexus: "tri-up", Spleen: "tri-up", Root: "square",
};

const CENTER_LABEL: Record<CenterName, string> = {
  Head: "Head", Ajna: "Ajna", Throat: "Throat",
  G: "G", Ego: "Ego", Sacral: "Sacral",
  SolarPlexus: "SP", Spleen: "Spleen", Root: "Root",
};

// ── Colours ───────────────────────────────────────────────────────────────────
const C_PERSONALITY      = "#111111";
const C_DESIGN           = "#c0392b";
const C_BOTH             = "#6a1da0";
const C_INACTIVE         = "#9e98b8";
const C_DEF_FILL         = "#c05a3c";
const C_DEF_STROKE       = "#9a3d22";
const C_UNDEF_FILL       = "#f6f4fb";
const C_UNDEF_STROKE     = "#b0a8c8";
const C_LABEL_DEF        = "#ffffff";
const C_LABEL_UNDEF      = "#9590b4";
const C_GATE_ACT_TEXT    = "#ffffff";
const C_GATE_INACT_TEXT  = "#9590b4";

// ── Planet glyphs ─────────────────────────────────────────────────────────────
const PLANET_GLYPH: Record<string, string> = {
  Sun:        "☉",
  Earth:      "⊕",
  Moon:       "☽",
  Mercury:    "☿",
  Venus:      "♀",
  Mars:       "♂",
  Jupiter:    "♃",
  Saturn:     "♄",
  Uranus:     "♅",
  Neptune:    "♆",
  Pluto:      "♇",
  NorthNode:  "☊",
  SouthNode:  "☋",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function f(n: number): string { return n.toFixed(1); }

interface GatePos { x: number; y: number; }

// ── Gate position algorithm ───────────────────────────────────────────────────
// Gate circles are placed at the edge of their center, directed toward the
// other center in the channel. Groups of channels sharing the same cA/cB pair
// are spread perpendicularly with a consistent step.
//
// Key constraint: BOTH gatesA and gatesB for the same group use the SAME
// canonical perpendicular (px = -ny, py = nx where nx,ny = cA→cB direction),
// ensuring matching channel pairs form perfectly parallel lines.

function buildGatePositions(): Map<number, GatePos> {
  const GR   = 9;  // gate circle radius
  const GAP  = 3;  // gap from center edge to circle edge
  const STEP = GR * 2 + 3;  // 21 — step between adjacent gate circles in a group

  // Group channels by (cA, cB) pair — preserving CHANNELS array order
  type GroupKey = string;
  const groups = new Map<GroupKey, typeof CHANNELS[number][]>();
  for (const ch of CHANNELS) {
    const key: GroupKey = `${ch[2]}__${ch[3]}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(ch);
  }

  const map = new Map<number, GatePos>();

  for (const [, channels] of groups) {
    const [, , cA, cB] = channels[0];
    const [ax, ay] = POS[cA];
    const [bx, by] = POS[cB];
    const rA = CENTER_R[cA];
    const rB = CENTER_R[cB];

    const dx = bx - ax, dy = by - ay;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / len, ny = dy / len;
    // Canonical perpendicular (left-hand turn from cA→cB direction)
    const px = -ny, py = nx;

    const n = channels.length;
    const totalSpread = (n - 1) * STEP;

    // Base positions on each center's edge, pointing toward the other center
    const baseAx = ax + nx * (rA + GAP + GR);
    const baseAy = ay + ny * (rA + GAP + GR);
    const baseBx = bx + (-nx) * (rB + GAP + GR);
    const baseBy = by + (-ny) * (rB + GAP + GR);

    channels.forEach((ch, i) => {
      const [gA, gB] = ch;
      const offset = -totalSpread / 2 + i * STEP;

      // Place gA (at cA side) — skip if already positioned (integration gates)
      if (!map.has(gA)) {
        map.set(gA, {
          x: baseAx + px * offset,
          y: baseAy + py * offset,
        });
      }

      // Place gB (at cB side) — skip if already positioned (integration gates)
      if (!map.has(gB)) {
        map.set(gB, {
          x: baseBx + px * offset,
          y: baseBy + py * offset,
        });
      }
    });
  }

  return map;
}

// ── Center shape rendering ────────────────────────────────────────────────────
function renderShape(cx: number, cy: number, s: Shape, r: number, defined: boolean): string {
  const fill   = defined ? C_DEF_FILL   : C_UNDEF_FILL;
  const stroke = defined ? C_DEF_STROKE : C_UNDEF_STROKE;
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

function renderCenterLabel(cx: number, cy: number, s: Shape, r: number, defined: boolean, label: string): string {
  const color = defined ? C_LABEL_DEF : C_LABEL_UNDEF;
  const fw    = defined ? "700" : "400";
  let ly = cy + 5;
  if (s === "tri-up")   ly = cy + r * 0.44;
  if (s === "tri-down") ly = cy - r * 0.12;
  return `<text x="${f(cx)}" y="${f(ly)}" text-anchor="middle" font-size="11" font-family="sans-serif" fill="${color}" font-weight="${fw}">${label}</text>`;
}

// ── Channel lane rendering ────────────────────────────────────────────────────
// Two parallel lanes between gate circle positions.
// Right lane = personality (−perp), left lane = design (+perp).
// Each lane is split at midpoint; each half coloured only when that gate is active.

function renderChannelLanes(
  gA: number, gB: number,
  pGates: Set<number>, dGates: Set<number>,
  gatePositions: Map<number, GatePos>,
): string {
  const posA = gatePositions.get(gA);
  const posB = gatePositions.get(gB);
  if (!posA || !posB) return "";

  const { x: x1, y: y1 } = posA;
  const { x: x2, y: y2 } = posB;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;

  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 0.001) return "";
  const nx = dx / len, ny = dy / len;
  const px = -ny, py = nx;  // perpendicular (left-hand turn)
  const OFF = 3.5;

  const gA_p = pGates.has(gA), gA_d = dGates.has(gA);
  const gB_p = pGates.has(gB), gB_d = dGates.has(gB);

  function seg(ax: number, ay: number, bx: number, by: number, active: boolean, col: string): string {
    return `<line x1="${f(ax)}" y1="${f(ay)}" x2="${f(bx)}" y2="${f(by)}" stroke="${active ? col : C_INACTIVE}" stroke-width="2"/>`;
  }

  // Personality lane (right = −perp)
  const p1 = seg(x1 - px*OFF, y1 - py*OFF, mx - px*OFF, my - py*OFF, gA_p, C_PERSONALITY);
  const p2 = seg(mx - px*OFF, my - py*OFF, x2 - px*OFF, y2 - py*OFF, gB_p, C_PERSONALITY);
  // Design lane (left = +perp)
  const d1 = seg(x1 + px*OFF, y1 + py*OFF, mx + px*OFF, my + py*OFF, gA_d, C_DESIGN);
  const d2 = seg(mx + px*OFF, my + py*OFF, x2 + px*OFF, y2 + py*OFF, gB_d, C_DESIGN);

  return [p1, p2, d1, d2].join("\n");
}

// ── Gate circle rendering ─────────────────────────────────────────────────────
function renderGateCircles(
  gatePositions: Map<number, GatePos>,
  pGates: Set<number>,
  dGates: Set<number>,
): string {
  const parts: string[] = [];
  const GR = 9;

  for (const [gate, pos] of gatePositions) {
    const isP = pGates.has(gate);
    const isD = dGates.has(gate);

    let fill: string, stroke: string, textCol: string;
    if (isP && isD) {
      fill = C_BOTH; stroke = "#5a0d90"; textCol = C_GATE_ACT_TEXT;
    } else if (isP) {
      fill = C_PERSONALITY; stroke = "#000000"; textCol = C_GATE_ACT_TEXT;
    } else if (isD) {
      fill = C_DESIGN; stroke = "#9a2218"; textCol = C_GATE_ACT_TEXT;
    } else {
      fill = C_UNDEF_FILL; stroke = C_UNDEF_STROKE; textCol = C_GATE_INACT_TEXT;
    }

    parts.push(
      `<circle cx="${f(pos.x)}" cy="${f(pos.y)}" r="${GR}" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`,
    );
    parts.push(
      `<text x="${f(pos.x)}" y="${f(pos.y)}" dy="3" text-anchor="middle" font-size="8" font-family="monospace" fill="${textCol}">${gate}</text>`,
    );
  }

  return parts.join("\n");
}

// ── Side columns ──────────────────────────────────────────────────────────────
function renderSideColumns(
  personalityActivations: { planet: string; gate: number; line: number }[],
  designActivations: { planet: string; gate: number; line: number }[],
  gatePositions: Map<number, GatePos>,
): string {
  const parts: string[] = [];

  const COL_P_X = 720;  // right column — personality
  const COL_D_X =  80;  // left  column — design

  // Headers
  parts.push(
    `<text x="${COL_P_X}" y="20" text-anchor="middle" font-size="7.5" font-family="sans-serif" fill="${C_PERSONALITY}" font-weight="600" letter-spacing="0.3">PERSONALITY</text>`,
  );
  parts.push(
    `<text x="${COL_D_X}" y="20" text-anchor="middle" font-size="7.5" font-family="sans-serif" fill="${C_DESIGN}" font-weight="600" letter-spacing="0.3">DESIGN</text>`,
  );

  // Personality activations — sorted by gate's y-position ascending
  const sortedP = [...personalityActivations].sort((a, b) => {
    const ay = gatePositions.get(a.gate)?.y ?? 999;
    const by2 = gatePositions.get(b.gate)?.y ?? 999;
    return ay - by2;
  });
  for (const { planet, gate, line } of sortedP) {
    const pos = gatePositions.get(gate);
    if (!pos) continue;
    const glyph = PLANET_GLYPH[planet] ?? planet;
    parts.push(
      `<text x="${COL_P_X}" y="${f(pos.y + 3)}" text-anchor="middle" font-size="9" font-family="sans-serif" fill="${C_PERSONALITY}" font-weight="600">${glyph} ${gate}.${line}</text>`,
    );
  }

  // Design activations — sorted by gate's y-position ascending
  const sortedD = [...designActivations].sort((a, b) => {
    const ay = gatePositions.get(a.gate)?.y ?? 999;
    const by2 = gatePositions.get(b.gate)?.y ?? 999;
    return ay - by2;
  });
  for (const { planet, gate, line } of sortedD) {
    const pos = gatePositions.get(gate);
    if (!pos) continue;
    const glyph = PLANET_GLYPH[planet] ?? planet;
    parts.push(
      `<text x="${COL_D_X}" y="${f(pos.y + 3)}" text-anchor="middle" font-size="9" font-family="sans-serif" fill="${C_DESIGN}" font-weight="600">${glyph} ${gate}.${line}</text>`,
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
  personalityActivations: { planet: string; gate: number; line: number }[];
  designActivations: { planet: string; gate: number; line: number }[];
}

export function renderBodygraph({
  definedCenters,
  personalityGates,
  designGates,
  personalityActivations,
  designActivations,
}: RenderInput): string {
  const gatePositions = buildGatePositions();

  const parts: string[] = [
    `<rect width="${W}" height="${H}" fill="#fafaf7"/>`,
  ];

  // 1. Side columns (behind everything)
  parts.push(renderSideColumns(personalityActivations, designActivations, gatePositions));

  // 2. Channel lanes (behind gate circles and centers)
  for (const [gA, gB] of CHANNELS) {
    parts.push(renderChannelLanes(gA, gB, personalityGates, designGates, gatePositions));
  }

  // 3. Gate circles (on top of lanes, below centers)
  parts.push(renderGateCircles(gatePositions, personalityGates, designGates));

  // 4. Center shapes (on top)
  for (const name of Object.keys(POS) as CenterName[]) {
    const [cx, cy] = POS[name];
    const s       = CENTER_SHAPE[name];
    const r       = CENTER_R[name];
    const defined = definedCenters.has(name);
    parts.push(renderShape(cx, cy, s, r, defined));
    parts.push(renderCenterLabel(cx, cy, s, r, defined, CENTER_LABEL[name]));
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"`,
    ` width="${W}" height="${H}" style="max-width:100%;height:auto">`,
    ...parts,
    `</svg>`,
  ].join("\n");
}
