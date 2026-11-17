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
const PAD_X = 44;
const PAD_Y = 16;
const W = 524 + PAD_X * 2;
const H = 900 + PAD_Y * 2 + 22;

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

const CENTER_POLY: Record<CenterName, Pt[]> = {
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
const GATE_POS: Record<number, Pt> = {
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
  21: [386, 556], 51: [366, 572], 26: [342, 592], 40: [408, 600],
  // Sacral
  5: [231, 661], 14: [257, 661], 29: [283, 661],
  34: [220, 685], 27: [220, 721], 59: [294, 721],
  42: [231, 740], 3: [257, 740], 9: [283, 740],
  // Solar Plexus
  36: [506, 646], 22: [484, 660], 37: [462, 673], 6: [422, 690],
  49: [456, 708], 55: [480, 721], 30: [504, 734],
  // Spleen
  48: [18, 646], 57: [40, 660], 44: [62, 673], 50: [102, 690],
  32: [68, 708], 28: [44, 721], 18: [20, 734],
  // Root
  53: [231, 805], 60: [257, 805], 52: [283, 805],
  54: [220, 826], 38: [220, 850], 58: [220, 874],
  19: [294, 826], 39: [294, 850], 41: [294, 874],
};

// Cubic control points for channels that curve (keyed "a-b", lower gate first).
// Channels not listed are drawn straight.
const CURVES: Record<string, [Pt, Pt]> = {
  // Spleen ↔ Throat (outer left arcs)
  "16-48": [[2, 520], [90, 372]],
  "20-57": [[30, 548], [116, 398]],
  // Integration (G / Throat / Sacral / Spleen)
  "10-20": [[168, 480], [176, 400]],
  "20-34": [[150, 440], [150, 640]],
  "10-34": [[150, 560], [176, 650]],
  "10-57": [[130, 520], [70, 600]],
  "34-57": [[90, 668], [150, 676]],
  // Ego ↔ Throat, Ego ↔ Spleen
  "21-45": [[386, 470], [330, 394]],
  "26-44": [[240, 572], [118, 616]],
  // Solar Plexus ↔ Throat (outer right arcs)
  "35-36": [[420, 352], [520, 520]],
  "12-22": [[398, 376], [486, 540]],
  // Sacral ↔ Spleen / Solar Plexus
  "27-50": [[170, 716], [130, 696]],
  "6-59":  [[380, 700], [340, 716]],
  // Root ↔ Spleen
  "32-54": [[140, 824], [86, 764]],
  "28-38": [[120, 856], [58, 786]],
  "18-58": [[100, 888], [24, 806]],
  // Root ↔ Solar Plexus
  "19-49": [[374, 824], [430, 764]],
  "39-55": [[394, 856], [466, 786]],
  "30-41": [[414, 888], [500, 806]],
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function f(n: number): string { return n.toFixed(1); }
const X = (x: number) => x + PAD_X;
const Y = (y: number) => y + PAD_Y;

function polyPoints(pts: Pt[]): string {
  return pts.map(([x, y]) => `${f(X(x))},${f(Y(y))}`).join(" ");
}

type Side = "p" | "d" | "both" | null;

function sideOf(gate: number, p: Set<number>, d: Set<number>): Side {
  const ip = p.has(gate), id = d.has(gate);
  return ip && id ? "both" : ip ? "p" : id ? "d" : null;
}

// Each SVG gets its own pattern id: several charts on one page must not share
// one, or a chart hidden inside a closed <details> can blank the others.
let renderCount = 0;

function sideColor(s: Side, uid: string): string {
  return s === "p" ? C_PERSONALITY : s === "d" ? C_DESIGN : s === "both" ? `url(#${uid})` : C_BG;
}

// Cubic for any channel (straight ones get thirds as control points).
function channelCubic(a: number, b: number): [Pt, Pt, Pt, Pt] {
  const pa = GATE_POS[a], pb = GATE_POS[b];
  const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
  const curve = CURVES[key];
  if (curve) {
    // Stored controls run from the lower gate to the higher one.
    const [c1, c2] = curve;
    return a < b ? [pa, c1, c2, pb] : [pa, c2, c1, pb];
  }
  const c1: Pt = [pa[0] + (pb[0] - pa[0]) / 3, pa[1] + (pb[1] - pa[1]) / 3];
  const c2: Pt = [pa[0] + 2 * (pb[0] - pa[0]) / 3, pa[1] + 2 * (pb[1] - pa[1]) / 3];
  return [pa, c1, c2, pb];
}

function splitCubic([p0, p1, p2, p3]: [Pt, Pt, Pt, Pt]): [[Pt, Pt, Pt, Pt], [Pt, Pt, Pt, Pt]] {
  const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const m1 = mid(p0, p1), m2 = mid(p1, p2), m3 = mid(p2, p3);
  const n1 = mid(m1, m2), n2 = mid(m2, m3), m = mid(n1, n2);
  return [[p0, m1, n1, m], [m, n2, m3, p3]];
}

function cubicPath([p0, p1, p2, p3]: [Pt, Pt, Pt, Pt]): string {
  return `M ${f(X(p0[0]))},${f(Y(p0[1]))} C ${f(X(p1[0]))},${f(Y(p1[1]))} ${f(X(p2[0]))},${f(Y(p2[1]))} ${f(X(p3[0]))},${f(Y(p3[1]))}`;
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
  /** Small center names beside each center (useful in explainers). */
  showCenterNames?: boolean;
}

export function renderBodygraph({
  definedCenters, personalityGates, designGates, focus, showCenterNames,
}: RenderInput): string {
  const focusGates = new Set(focus?.gates ?? []);
  const focusCenters = new Set<CenterName>(focus?.centers ?? []);
  const focusing = focusGates.size + focusCenters.size > 0;
  const FADE = 0.22;
  const centerOf = (g: number) => (Object.keys(CENTER_GATES) as CenterName[]).find(c => CENTER_GATES[c].includes(g));
  const centerLit = (c: CenterName) => !focusing || focusCenters.has(c) || CENTER_GATES[c].some(g => focusGates.has(g));
  const op = (lit: boolean) => (focusing && !lit ? ` opacity="${FADE}"` : "");

  const uid = `bg-both-${++renderCount}`;
  const parts: string[] = [];
  parts.push(
    `<defs><pattern id="${uid}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">` +
    `<rect width="3" height="6" fill="${C_PERSONALITY}"/><rect x="3" width="3" height="6" fill="${C_DESIGN}"/></pattern></defs>`
  );

  // 1 — channel pipes: outline, hollow interior, then colored halves.
  for (const [a, b] of CHANNELS) {
    if (!GATE_POS[a] || !GATE_POS[b]) continue;
    const cubic = channelCubic(a, b);
    const lit = !focusing || focusGates.has(a) || focusGates.has(b) ||
      (focusCenters.has(centerOf(a)!) && focusCenters.has(centerOf(b)!));
    const [ha, hb] = splitCubic(cubic);
    const sa = sideOf(a, personalityGates, designGates);
    const sb = sideOf(b, personalityGates, designGates);
    let g = `<path d="${cubicPath(cubic)}" fill="none" stroke="${C_LINE}" stroke-width="9" stroke-linecap="butt"/>`;
    g += `<path d="${cubicPath(cubic)}" fill="none" stroke="${C_BG}" stroke-width="6.4" stroke-linecap="butt"/>`;
    if (sa) g += `<path d="${cubicPath(ha)}" fill="none" stroke="${sideColor(sa, uid)}" stroke-width="6.4" stroke-linecap="butt"/>`;
    if (sb) g += `<path d="${cubicPath(hb)}" fill="none" stroke="${sideColor(sb, uid)}" stroke-width="6.4" stroke-linecap="butt"/>`;
    parts.push(`<g${op(lit)}>${g}</g>`);
  }

  // 2 — centers.
  for (const name of Object.keys(CENTER_POLY) as CenterName[]) {
    const def = definedCenters.has(name);
    const lit = centerLit(name);
    const ring = focusCenters.has(name)
      ? `<polygon points="${polyPoints(CENTER_POLY[name])}" fill="none" stroke="${C_FOCUS}" stroke-width="7" stroke-linejoin="round" opacity="0.9"/>`
      : "";
    parts.push(
      `<g${op(lit)}>${ring}<polygon points="${polyPoints(CENTER_POLY[name])}" fill="${def ? C_DEF_FILL : C_BG}" ` +
      `stroke="${def ? C_DEF_LINE : C_LINE}" stroke-width="1.8" stroke-linejoin="round"/></g>`
    );
  }

  // 3 — gate numbers (plain when inactive, filled pill when active).
  for (const [gs, pos] of Object.entries(GATE_POS)) {
    const gate = Number(gs);
    const [x, y] = [X(pos[0]), Y(pos[1])];
    const side = sideOf(gate, personalityGates, designGates);
    const center = centerOf(gate)!;
    const lit = !focusing || focusGates.has(gate) || (focusCenters.has(center) && !focusGates.size) || (focusCenters.has(center) && side !== null);
    const w = gate >= 10 ? 22 : 16;
    let el = "";
    if (side) {
      el += `<rect x="${f(x - w / 2)}" y="${f(y - 8)}" width="${w}" height="16" rx="8" fill="${sideColor(side, uid)}"/>`;
      el += `<text x="${f(x)}" y="${f(y + 4.2)}" text-anchor="middle" font-size="11.5" font-weight="700" font-family="${FONT}" fill="#ffffff">${gate}</text>`;
    } else {
      el += `<text x="${f(x)}" y="${f(y + 4.2)}" text-anchor="middle" font-size="11.5" font-family="${FONT}" fill="${C_TEXT}">${gate}</text>`;
    }
    if (focusGates.has(gate)) {
      el += `<rect x="${f(x - w / 2 - 4)}" y="${f(y - 12)}" width="${w + 8}" height="24" rx="12" fill="none" stroke="${C_FOCUS}" stroke-width="2.6"/>`;
    }
    parts.push(`<g${op(lit)}>${el}</g>`);
  }

  // 4 — optional center names (outside the shapes, small caps).
  if (showCenterNames) {
    const at: Record<CenterName, [Pt, string]> = {
      Head: [[330, 60], "start"], Ajna: [[330, 175], "start"], Throat: [[322, 300], "start"],
      G: [[257, 511], "middle"], Ego: [[440, 546], "start"], Sacral: [[322, 773], "start"],
      SolarPlexus: [[548, 690], "middle"], Spleen: [[-24, 690], "middle"], Root: [[257, 918], "middle"],
    };
    for (const name of Object.keys(at) as CenterName[]) {
      const [[lx, ly], anchor] = at[name];
      const rot = name === "Spleen" ? ` transform="rotate(-90 ${f(X(lx))} ${f(Y(ly))})"` : name === "SolarPlexus" ? ` transform="rotate(90 ${f(X(lx))} ${f(Y(ly))})"` : "";
      parts.push(`<text${rot} x="${f(X(lx))}" y="${f(Y(ly))}" text-anchor="${anchor}" font-size="11" letter-spacing="1.2" font-family="${FONT}" fill="${C_TEXT}"${op(centerLit(name))}>${CENTER_NAME_LABEL[name].toUpperCase()}</text>`);
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto" role="img" aria-label="Human Design bodygraph">\n` +
    `<rect width="${W}" height="${H}" fill="${C_BG}"/>\n` +
    parts.join("\n") + `\n</svg>`;
}
