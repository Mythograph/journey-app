// One-shot seeder: reads the canonical channel + copy data and writes one CSV
// per Google Sheets tab into ./seed-csv/. Run once to populate the initial
// sheet; thereafter the sheet is the source of truth and copy.ts is generated
// from it by sync-copy.mjs.
//
// Usage: node scripts/generate-seed-csv.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Load source data by reading the .ts files as text and extracting the
// relevant exports. We avoid importing them directly because they use .js
// extensions that don't resolve under bare node.

function loadFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function extractRecord(src, exportName) {
  // Match the object-literal body of `export const NAME: T = { ... };`
  const re = new RegExp(`export const ${exportName}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`);
  const m = src.match(re);
  if (!m) throw new Error(`Could not find export ${exportName}`);
  const body = m[1];
  // Strip line/block comments inside the body so they don't confuse the parser.
  const stripped = body.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
  // Match entries: "key": "value" — value may contain escaped quotes.
  const entryRe = /"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,?/g;
  const out = {};
  let match;
  while ((match = entryRe.exec(stripped)) !== null) {
    const k = match[1];
    const v = match[2].replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, "\\");
    out[k] = v;
  }
  return out;
}

function extractIntro(src, exportName) {
  const re = new RegExp(`export const ${exportName}\\s*=\\s*"((?:[^"\\\\]|\\\\.)*)";`, "m");
  const m = src.match(re);
  if (!m) throw new Error(`Could not find intro ${exportName}`);
  return m[1].replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, "\\");
}

const copyTs = loadFile("src/lib/chart-engine/copy.ts");
const dataTs = loadFile("src/lib/chart-engine/data.ts");

const CHANNEL_DESCRIPTIONS = extractRecord(copyTs, "CHANNEL_DESCRIPTIONS");
const TYPE_DESCRIPTIONS    = extractRecord(copyTs, "TYPE_DESCRIPTIONS");
const AUTHORITY_DESCRIPTIONS = extractRecord(copyTs, "AUTHORITY_DESCRIPTIONS");
const STRATEGY_DESCRIPTIONS = extractRecord(copyTs, "STRATEGY_DESCRIPTIONS");
const PROFILE_NAMES        = extractRecord(copyTs, "PROFILE_NAMES");
const PROFILE_DESCRIPTIONS = extractRecord(copyTs, "PROFILE_DESCRIPTIONS");

const INTROS = {
  type:      extractIntro(copyTs, "TYPE_INTRO"),
  authority: extractIntro(copyTs, "AUTHORITY_INTRO"),
  profile:   extractIntro(copyTs, "PROFILE_INTRO"),
  cross:     extractIntro(copyTs, "INCARNATION_CROSS_INTRO"),
};

// Channel name + center labels from data.ts CHANNELS array
function extractChannels(src) {
  const re = /\[\s*(\d+)\s*,\s*(\d+)\s*,\s*"(\w+)"\s*,\s*"(\w+)"\s*,\s*"([^"]+)"\s*\]/g;
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    out.push({ a: +m[1], b: +m[2], cA: m[3], cB: m[4], name: m[5] });
  }
  return out;
}
const CENTER_LABELS = {
  Head: "Head", Ajna: "Ajna", Throat: "Throat", G: "G", Ego: "Ego",
  Sacral: "Sacral", SolarPlexus: "Solar Plexus", Spleen: "Spleen", Root: "Root",
};
const CHANNELS = extractChannels(dataTs);

// ── CSV writer (RFC 4180) ─────────────────────────────────────────────────────
function csvCell(v) {
  if (v == null) return "";
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function csv(rows) {
  return rows.map((r) => r.map(csvCell).join(",")).join("\n") + "\n";
}

// ── Build CSVs ────────────────────────────────────────────────────────────────
const outDir = path.join(ROOT, "seed-csv");
fs.mkdirSync(outDir, { recursive: true });

// Channels: key, name, centers, description
const channelRows = [["key", "name", "centers", "description"]];
for (const ch of CHANNELS) {
  const lo = Math.min(ch.a, ch.b);
  const hi = Math.max(ch.a, ch.b);
  const key = `${lo}-${hi}`;
  const centers = `${CENTER_LABELS[ch.cA]} ↔ ${CENTER_LABELS[ch.cB]}`;
  channelRows.push([key, ch.name, centers, CHANNEL_DESCRIPTIONS[key] ?? ""]);
}
fs.writeFileSync(path.join(outDir, "channels.csv"), csv(channelRows));

// Types: key, description
const typeRows = [["key", "description"]];
for (const k of ["Generator","Manifesting Generator","Manifestor","Projector","Reflector"]) {
  typeRows.push([k, TYPE_DESCRIPTIONS[k] ?? ""]);
}
fs.writeFileSync(path.join(outDir, "types.csv"), csv(typeRows));

// Authorities: key, description
const authRows = [["key", "description"]];
for (const k of ["Emotional","Sacral","Splenic","Ego Manifested","Ego Projected","Self-Projected","Mental Projected","Lunar","None"]) {
  authRows.push([k, AUTHORITY_DESCRIPTIONS[k] ?? ""]);
}
fs.writeFileSync(path.join(outDir, "authorities.csv"), csv(authRows));

// Profiles: key, name, description
const profileRows = [["key", "name", "description"]];
for (const k of ["1/3","1/4","2/4","2/5","3/5","3/6","4/6","4/1","5/1","5/2","6/2","6/3"]) {
  profileRows.push([k, PROFILE_NAMES[k] ?? "", PROFILE_DESCRIPTIONS[k] ?? ""]);
}
fs.writeFileSync(path.join(outDir, "profiles.csv"), csv(profileRows));

// Strategies: key, text
const stratRows = [["key", "text"]];
for (const k of ["Generator","Manifesting Generator","Manifestor","Projector","Reflector"]) {
  stratRows.push([k, STRATEGY_DESCRIPTIONS[k] ?? ""]);
}
fs.writeFileSync(path.join(outDir, "strategies.csv"), csv(stratRows));

// Intros: key, text
const introRows = [["key", "text"]];
for (const k of ["type","authority","profile","cross"]) {
  introRows.push([k, INTROS[k] ?? ""]);
}
fs.writeFileSync(path.join(outDir, "intros.csv"), csv(introRows));

// Gates: key (1–64), name, center (filled from data.ts), theme, gift,
// shadow, keywords. Only `key` and `center` are pre-populated; the user
// pastes her own gate copy into the rest.
function extractCenterGates(src) {
  const re = /export const CENTER_GATES[^=]*=\s*\{([\s\S]*?)\n\};/;
  const m = src.match(re);
  if (!m) throw new Error("Could not find CENTER_GATES");
  const body = m[1];
  const out = {}; // gate → center
  const entryRe = /(\w+):\s*\[([\d,\s]+)\]/g;
  let entry;
  while ((entry = entryRe.exec(body)) !== null) {
    const center = entry[1];
    const gates = entry[2].split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
    for (const g of gates) out[g] = center;
  }
  return out;
}
const CENTER_LABEL = {
  Head: "Head", Ajna: "Ajna", Throat: "Throat", G: "G", Ego: "Ego",
  Sacral: "Sacral", SolarPlexus: "Solar Plexus", Spleen: "Spleen", Root: "Root",
};
const GATE_CENTER = extractCenterGates(dataTs);
const gateRows = [["key", "name", "center", "theme", "gift", "shadow", "keywords"]];
for (let g = 1; g <= 64; g++) {
  gateRows.push([String(g), "", CENTER_LABEL[GATE_CENTER[g]] ?? "", "", "", "", ""]);
}
fs.writeFileSync(path.join(outDir, "gates.csv"), csv(gateRows));

// Lines: 384 rows (gate.line for each gate × 6 lines), description blank.
const lineRows = [["key", "description"]];
for (let g = 1; g <= 64; g++) {
  for (let l = 1; l <= 6; l++) {
    lineRows.push([`${g}.${l}`, ""]);
  }
}
fs.writeFileSync(path.join(outDir, "lines.csv"), csv(lineRows));

console.log("Wrote seed-csv/{channels,types,authorities,profiles,strategies,intros,gates,lines}.csv");
console.log("Channel rows:    ", channelRows.length - 1);
console.log("Type rows:       ", typeRows.length - 1);
console.log("Authority rows:  ", authRows.length - 1);
console.log("Profile rows:    ", profileRows.length - 1);
console.log("Strategy rows:   ", stratRows.length - 1);
console.log("Intro rows:      ", introRows.length - 1);
console.log("Gate rows:       ", gateRows.length - 1, "(scaffold — fill in name + theme/gift/shadow/keywords from your sheet)");
console.log("Line rows:       ", lineRows.length - 1, "(scaffold — fill in descriptions later)");
