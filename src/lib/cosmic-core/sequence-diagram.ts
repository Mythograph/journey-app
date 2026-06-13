// Cosmic Core — Gene Keys sequence diagrams.
//
// Hand-built SVG (the same approach as the chart engine's bodygraph) that draws
// each Golden Path sequence as a left-rail of spheres connected by their named
// pathways, personalized with the reader's Gene Keys, lines, and the
// Shadow -> Gift -> Siddhi spectrum for each sphere. Pure and dependency-free:
// returns an SVG string the reading page and the PDF can drop in directly.

import { GK_SEQUENCES, GENE_KEY_FREQUENCIES, getSphereLineExpression } from "./gene-keys.js";
import type { SequenceSpec, GeneKeysProfile } from "./gene-keys.js";
import { GATES } from "./gates.js";

// Mythograph palette.
const INK = "#1A1410";
const MUTED = "#7A6D5E";
const TERRA = "#C05A3C"; // Shadow
const GOLD = "#C8A24A";  // Gift
const INDIGO = "#3A4F99"; // Siddhi
const WARM = "#FAF7F0";
const RULE = "#E8E0D6";

const WIDTH = 600;
const CX = 56;       // sphere center x (left rail)
const R = 24;        // sphere radius
const ROW = 138;     // vertical distance between sphere centers
const TOP = 34;      // first sphere center y
const TEXT_X = CX + R + 22;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Render one sphere's node + label block; returns the SVG fragment.
function sphereNode(label: string, num: number, line: number | null, lineKey: string, cy: number): string {
  const freq = GENE_KEY_FREQUENCIES[num];
  const gate = GATES[num];
  const lineExpr = line ? getSphereLineExpression(lineKey, line) : null;

  const meta =
    `Gene Key ${num}` +
    (gate ? ` · ${esc(gate.traditionalName)}` : "") +
    (line ? ` · Line ${line}${lineExpr ? ` (${esc(lineExpr.name)})` : ""}` : "");

  const triad = freq
    ? `<text x="${TEXT_X}" y="${cy + 20}" font-size="12.5" font-family="'DM Sans', sans-serif">` +
      `<tspan fill="${TERRA}">${esc(freq.shadow)}</tspan>` +
      `<tspan fill="${MUTED}"> → </tspan>` +
      `<tspan fill="${GOLD}" font-weight="600">${esc(freq.gift)}</tspan>` +
      `<tspan fill="${MUTED}"> → </tspan>` +
      `<tspan fill="${INDIGO}">${esc(freq.siddhi)}</tspan>` +
      `</text>`
    : "";

  return [
    `<circle cx="${CX}" cy="${cy}" r="${R}" fill="${WARM}" stroke="${GOLD}" stroke-width="1.5"/>`,
    `<text x="${CX}" y="${cy + 6}" text-anchor="middle" font-size="18" font-weight="600" fill="${INK}" font-family="'DM Sans', sans-serif">${num}</text>`,
    `<text x="${TEXT_X}" y="${cy - 16}" font-size="15" font-weight="700" fill="${INK}" font-family="'DM Sans', sans-serif">${esc(label)}</text>`,
    `<text x="${TEXT_X}" y="${cy + 2}" font-size="11" fill="${MUTED}" font-family="'DM Sans', sans-serif">${meta}</text>`,
    triad,
  ].join("");
}

// Connector line + pathway name between two consecutive spheres.
function connector(yTop: number, yBottom: number, pathwayName: string): string {
  const midY = (yTop + yBottom) / 2;
  return [
    `<line x1="${CX}" y1="${yTop}" x2="${CX}" y2="${yBottom}" stroke="${RULE}" stroke-width="2"/>`,
    `<text x="${TEXT_X}" y="${midY + 4}" font-size="11.5" font-style="italic" fill="${MUTED}" font-family="'DM Sans', sans-serif">${esc(pathwayName)}</text>`,
  ].join("");
}

// Build one sequence diagram. Returns null if no sphere is populated.
export function buildSequenceDiagram(
  sequenceKey: "activation" | "venus" | "pearl",
  geneKeys: GeneKeysProfile,
): string | null {
  const seq = GK_SEQUENCES.find((s) => s.key === sequenceKey);
  if (!seq) return null;

  // Spheres that actually carry a Gene Key, keeping their original index so the
  // right pathway label can sit between consecutive ones.
  const present = seq.spheres
    .map((spec, idx) => ({ spec, idx, num: geneKeys[spec.gateField] as number | null }))
    .filter((s) => s.num !== null) as { spec: SequenceSpec["spheres"][number]; idx: number; num: number }[];

  if (present.length === 0) return null;

  const parts: string[] = [];

  present.forEach((node, i) => {
    const cy = TOP + i * ROW;
    // Connector up from the previous present sphere.
    if (i > 0) {
      const prev = present[i - 1];
      const prevCy = TOP + (i - 1) * ROW;
      // Pathway between the two original spheres only when they are adjacent.
      const pw = prev.idx + 1 === node.idx ? seq.pathways[prev.idx] : undefined;
      parts.push(connector(prevCy + R, cy - R, pw ? pw.name : ""));
    }
    const line = geneKeys[node.spec.lineField] as number | null;
    parts.push(sphereNode(node.spec.label, node.num, line, node.spec.lineKey, cy));
  });

  const height = TOP + (present.length - 1) * ROW + R + 16;

  return (
    `<svg viewBox="0 0 ${WIDTH} ${height}" role="img" ` +
    `aria-label="${esc(seq.title)} diagram" ` +
    `style="width:100%;height:auto;display:block">${parts.join("")}</svg>`
  );
}

// All three sequence diagrams, in reading order, skipping any with no data.
export function buildSequenceDiagrams(
  geneKeys: GeneKeysProfile,
): { key: string; title: string; subtitle: string; svg: string }[] {
  const out: { key: string; title: string; subtitle: string; svg: string }[] = [];
  for (const seq of GK_SEQUENCES) {
    const svg = buildSequenceDiagram(seq.key, geneKeys);
    if (svg) out.push({ key: seq.key, title: seq.title, subtitle: seq.subtitle, svg });
  }
  return out;
}
