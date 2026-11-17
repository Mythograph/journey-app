// Bodygraph renderer — v2.
//
// Draws the traditional bodygraph layout: nine centers in their classic
// positions, channels as hollow "pipes" that fill with color by side, and gate
// numbers set as plain text along the inside edges of each center. Active
// gates become small filled pills (black = Personality/conscious,
// red = Design/unconscious, striped = both) so they read at a glance.
//
// Coordinates are in a 524×900 design space (the classic layout proportions),
// drawn inside a padded canvas. Pipes are drawn first and pass under the
// opaque center fills, so a channel can run from one gate label to another
// and only its visible stretch between centers shows.

import type { CenterName } from "./types.js";
import { CHANNELS, CENTER_GATES } from "./data.js";

// ── Canvas ─────────────────────────────────────────────────────────────────────
const PAD_X = 54;
const PAD_Y = 16;
const W = 524 + PAD_X * 2;
const H = 900 + PAD_Y * 2 + 6;

// ── Palette (Mythograph) ───────────────────────────────────────────────────────
const C_BG          = "#fafaf7";   // page / pipe interior
const C_LINE        = "#b39a6b";   // outlines and empty pipes
const C_TEXT        = "#9c8762";   // inactive gate numbers
const C_PERSONALITY = "#1a1410";   // conscious (black)
const C_DESIGN      = "#b8432c";   // unconscious (red)
const C_DEF_FILL    = "#f1dcb0";   // defined center fill
const C_DEF_LINE    = "#9a7a3c";
const C_FOCUS       = "#c8a24a";
const FONT          = `'DM Sans', 'Helvetica Neue', Arial, sans-serif`;

// ── Centers ────────────────────────────────────────────────────────────────────
type Pt = [number, number];

const BASE_POLY: Record<CenterName, Pt[]> = {
  Head:        [[257, 4], [316, 100], [198, 100]],
  Ajna:        [[198, 143], [316, 143], [257, 247]],
  Throat:      [[203, 305], [310, 305], [310, 412], [203, 412]],
  G:           [[257, 434], [330, 507], [257, 580], [184, 507]],
  Ego:         [[384, 530], [430, 616], [320, 600]],
  Sacral:      [[203, 646], [310, 646], [310, 753], [203, 753]],
  SolarPlexus: [[528, 626], [528, 754], [404, 690]],
  Spleen:      [[-4, 626], [120, 690], [-4, 754]],
  Root:        [[203, 790], [310, 790], [310, 897], [203, 897]],
};

const CENTER_NAME_LABEL: Record<CenterName, string> = {
  Head: "Head", Ajna: "Ajna", Throat: "Throat", G: "G", Ego: "Ego",
  Sacral: "Sacral", SolarPlexus: "Solar Plexus", Spleen: "Spleen", Root: "Root",
};

// ── Gate label positions (text centers, inside each center's edge) ─────────────
const BASE_GATE_POS: Record<number, Pt> = {
  // Head
  64: [231, 86], 61: [257, 86], 63: [283, 86],
  // Ajna
  47: [231, 157], 24: [257, 157], 4: [283, 157], 17: [237, 192], 11: [277, 192], 43: [257, 224],
  // Throat
  62: [231, 320], 23: [257, 320], 56: [283, 320],
  16: [220, 340], 20: [220, 362],
  35: [294, 340], 12: [294, 362], 45: [294, 384],
  31: [231, 398], 8: [257, 398], 33: [283, 398],
  // G
  1: [257, 453], 7: [236, 474], 13: [278, 474], 10: [204, 507], 25: [310, 507],
  15: [234, 540], 46: [280, 540], 2: [257, 562],
  // Ego
  21: [385, 560], 51: [362, 578], 26: [340, 594], 40: [408, 602],
  // Sacral
  5: [231, 661], 14: [257, 661], 29: [283, 661],
  34: [220, 685], 27: [220, 721], 59: [294, 721],
  42: [231, 740], 3: [257, 740], 9: [283, 740],
  // Solar Plexus
  36: [508, 645], 22: [482, 659], 37: [456, 672], 6: [422, 690],
  49: [456, 708], 55: [482, 722], 30: [508, 735],
  // Spleen
  48: [16, 645], 57: [42, 659], 44: [68, 672], 50: [102, 690],
  32: [68, 708], 28: [42, 722], 18: [16, 735],
  // Root
  53: [231, 805], 60: [257, 805], 52: [283, 805],
  54: [220, 826], 38: [220, 850], 58: [220, 874],
  19: [294, 826], 39: [294, 850], 41: [294, 874],
};

// Centers and their gate numbers are drawn a little larger than the base
// layout: each center, with its gates, is scaled about its own middle.
const CENTER_SCALE = 1.1;
const CENTER_POLY = {} as Record<CenterName, Pt[]>;
const GATE_POS: Record<number, Pt> = {};
for (const name of Object.keys(BASE_POLY) as CenterName[]) {
  const pts = BASE_POLY[name];
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const mx = (Math.min(...xs) + Math.max(...xs)) / 2, my = (Math.min(...ys) + Math.max(...ys)) / 2;
  const grow = ([x, y]: Pt): Pt => [mx + (x - mx) * CENTER_SCALE, my + (y - my) * CENTER_SCALE];
  CENTER_POLY[name] = pts.map(grow);
  for (const gate of CENTER_GATES[name]) if (BASE_GATE_POS[gate]) GATE_POS[gate] = grow(BASE_GATE_POS[gate]);
}

// Curved channels: [from gate, to gate, control 1, control 2]. Controls run in
// that direction, so each pair reads as one smooth arc. Channels not listed
// are drawn straight. Left and right outer arcs mirror each other.
const CURVE_LIST: [number, number, Pt, Pt][] = [
  // Throat → Spleen (outer left arcs) and Throat → Solar Plexus (outer right)
  [16, 48, [90, 330], [6, 470]],
  [20, 57, [110, 356], [30, 490]],
  [35, 36, [434, 330], [518, 470]],
  [12, 22, [414, 356], [494, 490]],
  // Integration (G / Throat / Sacral / Spleen): nested arcs on the left
  [10, 20, [150, 490], [150, 372]],
  [20, 34, [112, 380], [112, 670]],
  [10, 34, [156, 530], [156, 676]],
  [10, 57, [130, 507], [62, 570]],
  [34, 57, [150, 690], [90, 650]],
  // Ego
  [45, 21, [360, 390], [392, 470]],
  [26, 44, [260, 600], [140, 612]],
  // Sacral → Spleen / Solar Plexus
  [27, 50, [170, 721], [140, 700]],
  [59, 6, [344, 721], [384, 700]],
  // Root → Spleen
  [54, 32, [140, 826], [76, 780]],
  [38, 28, [120, 852], [48, 800]],
  [58, 18, [100, 878], [20, 820]],
  // Root → Solar Plexus
  [19, 49, [374, 826], [448, 780]],
  [39, 55, [394, 852], [476, 800]],
  [41, 30, [414, 878], [504, 820]],
];

const CURVES = new Map<string, [number, Pt, Pt]>();
for (const [from, to, c1, c2] of CURVE_LIST) {
  CURVES.set(`${Math.min(from, to)}-${Math.max(from, to)}`, [from, c1, c2]);
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function f(n: number): string { return n.toFixed(1); }
const X = (x: number) => x + PAD_X;
const Y = (y: number) => y + PAD_Y;

/** Closed path for a polygon with softly rounded corners. */
function roundedPoly(pts: Pt[], r = 7): string {
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const v = pts[i], prev = pts[(i + n - 1) % n], next = pts[(i + 1) % n];
    const toward = (q: Pt): Pt => {
      const dx = q[0] - v[0], dy = q[1] - v[1];
      const len = Math.hypot(dx, dy) || 1;
      const k = Math.min(r, len / 2) / len;
      return [v[0] + dx * k, v[1] + dy * k];
    };
    const a = toward(prev), b = toward(next);
    d += `${i === 0 ? "M" : "L"} ${f(X(a[0]))},${f(Y(a[1]))} Q ${f(X(v[0]))},${f(Y(v[1]))} ${f(X(b[0]))},${f(Y(b[1]))} `;
  }
  return d + "Z";
}

type Side = "p" | "d" | "both" | null;
type Cubic = [Pt, Pt, Pt, Pt];

function sideOf(gate: number, p: Set<number>, d: Set<number>): Side {
  const ip = p.has(gate), id = d.has(gate);
  return ip && id ? "both" : ip ? "p" : id ? "d" : null;
}

// Cubic for any channel, running from gate a to gate b (straight ones get
// thirds as control points).
function channelCubic(a: number, b: number): Cubic {
  const pa = GATE_POS[a], pb = GATE_POS[b];
  const curve = CURVES.get(`${Math.min(a, b)}-${Math.max(a, b)}`);
  if (curve) {
    const [from, c1, c2] = curve;
    return from === a ? [pa, c1, c2, pb] : [pa, c2, c1, pb];
  }
  const c1: Pt = [pa[0] + (pb[0] - pa[0]) / 3, pa[1] + (pb[1] - pa[1]) / 3];
  const c2: Pt = [pa[0] + 2 * (pb[0] - pa[0]) / 3, pa[1] + 2 * (pb[1] - pa[1]) / 3];
  return [pa, c1, c2, pb];
}

function splitCubic([p0, p1, p2, p3]: Cubic): [Cubic, Cubic] {
  const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const m1 = mid(p0, p1), m2 = mid(p1, p2), m3 = mid(p2, p3);
  const n1 = mid(m1, m2), n2 = mid(m2, m3), m = mid(n1, n2);
  return [[p0, m1, n1, m], [m, n2, m3, p3]];
}

function cubicPath([p0, p1, p2, p3]: Cubic): string {
  return `M ${f(X(p0[0]))},${f(Y(p0[1]))} C ${f(X(p1[0]))},${f(Y(p1[1]))} ${f(X(p2[0]))},${f(Y(p2[1]))} ${f(X(p3[0]))},${f(Y(p3[1]))}`;
}

function cubicAt([p0, p1, p2, p3]: Cubic, t: number): Pt {
  const u = 1 - t;
  const k0 = u * u * u, k1 = 3 * u * u * t, k2 = 3 * u * t * t, k3 = t * t * t;
  return [k0 * p0[0] + k1 * p1[0] + k2 * p2[0] + k3 * p3[0], k0 * p0[1] + k1 * p1[1] + k2 * p2[1] + k3 * p3[1]];
}

/**
 * A channel half carried by both sides is split lengthwise: two thin parallel
 * strands, black (conscious) on the left or upper side, red (unconscious) on
 * the other. Returns the two strand paths.
 */
function strands(c: Cubic, offset: number): [string, string] {
  const N = 18;
  const pts: Pt[] = [];
  for (let i = 0; i <= N; i++) pts.push(cubicAt(c, i / N));
  // Fix which side black runs on from the overall direction of the half.
  const cx = pts[N][0] - pts[0][0], cy = pts[N][1] - pts[0][1];
  let sign = 1;
  const nx0 = -cy, ny0 = cx;
  if (nx0 > 0.01 || (Math.abs(nx0) <= 0.01 && ny0 > 0)) sign = -1;
  const build = (dir: number): string => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(N, i + 1)];
    const tx = b[0] - a[0], ty = b[1] - a[1];
    const len = Math.hypot(tx, ty) || 1;
    const ox = (-ty / len) * offset * dir * sign, oy = (tx / len) * offset * dir * sign;
    return `${i === 0 ? "M" : "L"} ${f(X(p[0] + ox))},${f(Y(p[1] + oy))}`;
  }).join(" ");
  return [build(1), build(-1)];
}

// ── Public API ─────────────────────────────────────────────────────────────────
export interface RenderInput {
  definedCenters: Set<CenterName>;
  definedChannels: [number, number][];
  personalityGates: Set<number>;
  designGates: Set<number>;
  personalityActivations: { planet: string; gate: number; line: number }[];
  designActivations:      { planet: string; gate: number; line: number }[];
  /** Optional chapter focus: fade everything else and ring these gates/centers in gold. */
  focus?: { gates?: number[]; centers?: CenterName[] };
  /** Center names are shown by default; pass false to hide them. */
  showCenterNames?: boolean;
}

export function renderBodygraph({
  definedCenters, personalityGates, designGates, focus, showCenterNames,
}: RenderInput): string {
  const focusGates = new Set(focus?.gates ?? []);
  const focusCenters = new Set<CenterName>(focus?.centers ?? []);
  const focusing = focusGates.size + focusCenters.size > 0;
  const FADE = 0.4;
  const centerOf = (g: number) => (Object.keys(CENTER_GATES) as CenterName[]).find(c => CENTER_GATES[c].includes(g));
  const centerLit = (c: CenterName) => !focusing || focusCenters.has(c) || CENTER_GATES[c].some(g => focusGates.has(g));
  const op = (lit: boolean) => (focusing && !lit ? ` opacity="${FADE}"` : "");

  const parts: string[] = [];
  const PIPE = 13.6, BORE = 10;

  // 1 — channel pipes: outline, hollow interior, then each gate's colored half.
  const half = (c: Cubic, side: Side): string => {
    if (!side) return "";
    if (side === "both") {
      const [black, red] = strands(c, BORE / 4);
      return `<path d="${black}" fill="none" stroke="${C_PERSONALITY}" stroke-width="${BORE / 2}" stroke-linejoin="round"/>` +
             `<path d="${red}" fill="none" stroke="${C_DESIGN}" stroke-width="${BORE / 2}" stroke-linejoin="round"/>`;
    }
    return `<path d="${cubicPath(c)}" fill="none" stroke="${side === "p" ? C_PERSONALITY : C_DESIGN}" stroke-width="${BORE}"/>`;
  };
  for (const [a, b] of CHANNELS) {
    if (!GATE_POS[a] || !GATE_POS[b]) continue;
    const cubic = channelCubic(a, b);
    const lit = !focusing || focusGates.has(a) || focusGates.has(b) ||
      (focusCenters.has(centerOf(a)!) && focusCenters.has(centerOf(b)!));
    const [ha, hb] = splitCubic(cubic);
    const g =
      `<path d="${cubicPath(cubic)}" fill="none" stroke="${C_LINE}" stroke-width="${PIPE}"/>` +
      `<path d="${cubicPath(cubic)}" fill="none" stroke="${C_BG}" stroke-width="${BORE}"/>` +
      half(ha, sideOf(a, personalityGates, designGates)) +
      half(hb, sideOf(b, personalityGates, designGates));
    parts.push(`<g${op(lit)}>${g}</g>`);
  }

  // 2 — centers (opaque, so pipes pass underneath).
  for (const name of Object.keys(CENTER_POLY) as CenterName[]) {
    const def = definedCenters.has(name);
    const lit = centerLit(name);
    const d = roundedPoly(CENTER_POLY[name]);
    const ring = focusCenters.has(name)
      ? `<path d="${d}" fill="none" stroke="${C_FOCUS}" stroke-width="7.5" stroke-linejoin="round" opacity="0.9"/>`
      : "";
    // An opaque base keeps faded centers from showing the pipes beneath them.
    parts.push(
      `<path d="${d}" fill="${C_BG}"/>` +
      `<g${op(lit)}>${ring}<path d="${d}" fill="${def ? C_DEF_FILL : C_BG}" stroke="${def ? C_DEF_LINE : C_LINE}" stroke-width="1.8" stroke-linejoin="round"/></g>`
    );
  }

  // 3 — gate numbers (plain when inactive, filled pill when active).
  for (const [gs, pos] of Object.entries(GATE_POS)) {
    const gate = Number(gs);
    const [x, y] = [X(pos[0]), Y(pos[1])];
    const side = sideOf(gate, personalityGates, designGates);
    const center = centerOf(gate)!;
    const lit = !focusing || focusGates.has(gate) || (focusCenters.has(center) && !focusGates.size) || (focusCenters.has(center) && side !== null);
    const w = gate >= 10 ? 26 : 19;
    const R = 9.5; // pill half-height
    let el = "";
    if (side) {
      if (side === "both") {
        // Split pill: left half black (conscious), right half red (unconscious).
        const x0 = x - w / 2, x1 = x + w / 2;
        el += `<path d="M ${f(x)},${f(y - R)} H ${f(x0 + R)} A ${R} ${R} 0 0 0 ${f(x0 + R)},${f(y + R)} H ${f(x)} Z" fill="${C_PERSONALITY}"/>`;
        el += `<path d="M ${f(x)},${f(y - R)} H ${f(x1 - R)} A ${R} ${R} 0 0 1 ${f(x1 - R)},${f(y + R)} H ${f(x)} Z" fill="${C_DESIGN}"/>`;
      } else {
        el += `<rect x="${f(x - w / 2)}" y="${f(y - R)}" width="${w}" height="${R * 2}" rx="${R}" fill="${side === "p" ? C_PERSONALITY : C_DESIGN}"/>`;
      }
      el += `<text x="${f(x)}" y="${f(y + 4.8)}" text-anchor="middle" font-size="13.5" font-weight="700" font-family="${FONT}" fill="#ffffff">${gate}</text>`;
    } else {
      el += `<text x="${f(x)}" y="${f(y + 4.8)}" text-anchor="middle" font-size="13.5" font-family="${FONT}" fill="${C_TEXT}">${gate}</text>`;
    }
    if (focusGates.has(gate)) {
      el += `<rect x="${f(x - w / 2 - 4)}" y="${f(y - R - 4)}" width="${w + 8}" height="${R * 2 + 8}" rx="${R + 4}" fill="none" stroke="${C_FOCUS}" stroke-width="2.6"/>`;
    }
    parts.push(`<g${op(lit)}>${el}</g>`);
  }

  // 4 — center names: inside the shape where there is room, beside it where
  // the gate numbers fill it (Ajna, Ego).
  if (showCenterNames !== false) {
    for (const name of Object.keys(CENTER_POLY) as CenterName[]) {
      const pts = CENTER_POLY[name];
      const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]);
      const l = Math.min(...xs), r = Math.max(...xs), t = Math.min(...ys), b = Math.max(...ys);
      const mx = (l + r) / 2, my = (t + b) / 2;
      let lines: string[] = [CENTER_NAME_LABEL[name].toUpperCase()];
      let at: Pt = [mx, my], anchor = "middle", inside = true;
      if (name === "Head") at = [mx, t + (b - t) * 0.56];
      if (name === "Spleen") at = [l + (r - l) * 0.3, my];
      if (name === "SolarPlexus") { at = [r - (r - l) * 0.27, my]; lines = ["SOLAR", "PLEXUS"]; }
      if (name === "Ajna") { at = [r + 8, t + (b - t) * 0.3]; anchor = "start"; inside = false; }
      if (name === "Ego") { at = [r + 8, my]; anchor = "start"; inside = false; }
      const fill = inside && definedCenters.has(name) ? C_DEF_LINE : C_TEXT;
      const y0 = at[1] + 4 - (lines.length - 1) * 6.5;
      const text = lines.map((ln, i) =>
        `<text x="${f(X(at[0]))}" y="${f(Y(y0 + i * 13))}" text-anchor="${anchor}" font-size="11" font-weight="600" letter-spacing="1.3" font-family="${FONT}" fill="${fill}">${ln}</text>`
      ).join("");
      parts.push(`<g${op(centerLit(name))}>${text}</g>`);
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto" role="img" aria-label="Human Design bodygraph">\n` +
    `<rect width="${W}" height="${H}" fill="${C_BG}"/>\n` +
    parts.join("\n") + `\n</svg>`;
}
