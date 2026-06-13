// Pulls chart-page narrative copy from a public Google Sheet and writes it
// into src/lib/chart-engine/copy.ts. Runs as a Netlify prebuild step so
// every deploy reflects the latest copy in the sheet.
//
// Setup:
//   1. Sheet must be shared as "Anyone with the link → Viewer".
//   2. Set env var JOURNEY_COPY_SHEET_ID (in Netlify → Site settings → Env vars)
//      to the sheet's ID (the part of the URL between /d/ and /edit).
//   3. Sheet must have tabs named exactly: Channels, Types, Authorities,
//      Profiles, Strategies, Intros (matching the seed-csv/ files).
//
// Behavior:
//   - If JOURNEY_COPY_SHEET_ID is set, fetch + regenerate copy.ts. Build
//     fails loudly on any missing/invalid data.
//   - If JOURNEY_COPY_SHEET_ID is unset, skip silently. Local dev works
//     against whatever copy.ts is already committed.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COPY_TS = path.join(ROOT, "src/lib/chart-engine/copy.ts");

const SHEET_ID = process.env.JOURNEY_COPY_SHEET_ID;
if (!SHEET_ID) {
  console.log("[sync-copy] JOURNEY_COPY_SHEET_ID not set; skipping (using committed copy.ts).");
  process.exit(0);
}

// ── HTTP fetch + CSV parse ────────────────────────────────────────────────────

async function fetchTab(tabName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`[sync-copy] Failed to fetch tab "${tabName}": HTTP ${res.status}. ` +
      `Check sheet sharing (must be "Anyone with the link → Viewer") and tab name.`);
  }
  const text = await res.text();
  if (text.startsWith("<")) {
    throw new Error(`[sync-copy] Tab "${tabName}" returned HTML (likely a sign-in page). ` +
      `Sheet must be shared as "Anyone with the link → Viewer".`);
  }
  return parseCSV(text);
}

// RFC 4180 parser. Returns array of rows, each row is an array of cell strings.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { cell += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); cell = "";
        if (row.length > 1 || row[0] !== "") rows.push(row);
        row = [];
      } else { cell += ch; }
    }
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    if (row.length > 1 || row[0] !== "") rows.push(row);
  }
  return rows;
}

// Convert a 2D rows array (first row = headers) to an array of objects.
function rowsToObjects(rows) {
  if (rows.length < 1) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((row) => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (row[i] ?? "").trim(); });
    return obj;
  });
}

// ── Validation + extraction ──────────────────────────────────────────────────

function buildRecord(rows, keyCol, valueCol, expectedKeys, label) {
  const objs = rowsToObjects(rows);
  const out = {};
  for (const o of objs) {
    if (!o[keyCol]) continue; // skip blank rows
    if (out[o[keyCol]] !== undefined) {
      throw new Error(`[sync-copy] ${label}: duplicate key "${o[keyCol]}"`);
    }
    if (!o[valueCol]) {
      throw new Error(`[sync-copy] ${label}: empty "${valueCol}" for key "${o[keyCol]}"`);
    }
    out[o[keyCol]] = o[valueCol];
  }
  for (const k of expectedKeys) {
    if (!(k in out)) {
      throw new Error(`[sync-copy] ${label}: missing key "${k}"`);
    }
  }
  const extras = Object.keys(out).filter((k) => !expectedKeys.includes(k));
  if (extras.length) {
    console.warn(`[sync-copy] ${label}: ignoring unknown keys: ${extras.join(", ")}`);
    for (const k of extras) delete out[k];
  }
  return out;
}

const TYPES = ["Generator","Manifesting Generator","Manifestor","Projector","Reflector"];
const AUTHORITIES = ["Emotional","Sacral","Splenic","Ego Manifested","Ego Projected","Self-Projected","Mental Projected","Lunar","None"];
const PROFILES = ["1/3","1/4","2/4","2/5","3/5","3/6","4/6","4/1","5/1","5/2","6/2","6/3"];
const INTRO_KEYS = ["type","authority","profile","cross"];

// Channels: keys come from data.ts; we read them dynamically so adding a
// channel in data.ts auto-extends the expected list.
function getExpectedChannelKeys() {
  const dataTs = fs.readFileSync(path.join(ROOT, "src/lib/chart-engine/data.ts"), "utf8");
  const re = /\[\s*(\d+)\s*,\s*(\d+)\s*,\s*"\w+"\s*,\s*"\w+"\s*,\s*"[^"]+"\s*\]/g;
  const out = [];
  let m;
  while ((m = re.exec(dataTs)) !== null) {
    const a = +m[1], b = +m[2];
    out.push(a < b ? `${a}-${b}` : `${b}-${a}`);
  }
  return out;
}

// ── TypeScript escaping ──────────────────────────────────────────────────────

function tsString(s) {
  return JSON.stringify(s);
}

function tsRecord(record, indent = "  ") {
  const lines = [];
  for (const [k, v] of Object.entries(record)) {
    lines.push(`${indent}${tsString(k)}: ${tsString(v)},`);
  }
  return lines.join("\n");
}

// ── Generate copy.ts ─────────────────────────────────────────────────────────

function generateCopyTs(data) {
  return `// AUTO-GENERATED from Google Sheet by scripts/sync-copy.mjs.
// DO NOT EDIT — your changes will be overwritten on the next deploy.
// Source of truth: https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit

import type { Authority, HdType, Chart } from "./types.js";

// ── Concept intros ────────────────────────────────────────────────────────────

export const TYPE_INTRO = ${tsString(data.intros.type)};

export const AUTHORITY_INTRO = ${tsString(data.intros.authority)};

export const PROFILE_INTRO = ${tsString(data.intros.profile)};

export const INCARNATION_CROSS_INTRO = ${tsString(data.intros.cross)};

// ── Channel descriptions ──────────────────────────────────────────────────────

export const CHANNEL_DESCRIPTIONS: Record<string, string> = {
${tsRecord(data.channels)}
};

// Lower-first gate-pair key.
export function channelKey(a: number, b: number): string {
  return a < b ? \`\${a}-\${b}\` : \`\${b}-\${a}\`;
}

// ── Type / Strategy / Authority ───────────────────────────────────────────────

export const TYPE_DESCRIPTIONS: Record<HdType, string> = {
${tsRecord(data.types)}
};

export const STRATEGY_DESCRIPTIONS: Record<HdType, string> = {
${tsRecord(data.strategies)}
};

export const AUTHORITY_DESCRIPTIONS: Record<Authority, string> = {
${tsRecord(data.authorities)}
};

// ── Profile ───────────────────────────────────────────────────────────────────

export const PROFILE_NAMES: Record<string, string> = {
${tsRecord(data.profileNames)}
};

export const PROFILE_DESCRIPTIONS: Record<string, string> = {
${tsRecord(data.profileDescriptions)}
};

// ── Synopsis ──────────────────────────────────────────────────────────────────
// A paragraph-long through-line that pulls together type, profile, authority,
// strategy, defined channels, and incarnation cross. Generated dynamically per
// chart so every reader gets their own custom version. (Edit this function in
// scripts/sync-copy.mjs, not in the sheet.)

interface SynopsisChannel { name: string; }

export function chartSynopsis(chart: Chart, channels: SynopsisChannel[]): string {
  const { type, profile, authority, strategy, incarnationCross } = chart;
  const authPart = authority === "None" ? "" : \`\${authority} \`;
  const profileName = PROFILE_NAMES[profile] ?? profile;

  const id = \`You are a \${profile} \${authPart}\${type}, the \${profileName}.\`;
  const strategyLine = \`Your strategy is \${strategy.toLowerCase()}, and your decisions arise from \${authority === "None" ? "your lunar reflection" : \`your \${authority.toLowerCase()} authority\`}.\`;

  let channelsLine: string;
  if (channels.length === 0) {
    channelsLine = "You have no fully-defined channels, which is unusual. Your design is highly responsive to whoever and whatever is in the room with you.";
  } else if (channels.length === 1) {
    channelsLine = \`1 channel is defined: \${channels[0].name}. That is the theme your life keeps coming back to.\`;
  } else {
    const names = channels.map((c) => c.name);
    const list =
      names.length === 2
        ? \`\${names[0]} and \${names[1]}\`
        : \`\${names.slice(0, -1).join(", ")}, and \${names[names.length - 1]}\`;
    channelsLine = \`\${names.length} channels are defined: \${list}. These are the themes your life keeps coming back to.\`;
  }

  const crossLine = \`Your incarnation cross is \${incarnationCross}, the larger arc your life is here to play out. The Journey Narrative reads it in full.\`;

  return \`\${id} \${strategyLine} \${channelsLine} \${crossLine}\`;
}
`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`[sync-copy] Fetching from sheet ${SHEET_ID}...`);

  const expectedChannels = getExpectedChannelKeys();

  const [chRows, tyRows, auRows, prRows, stRows, inRows] = await Promise.all([
    fetchTab("Channels"),
    fetchTab("Types"),
    fetchTab("Authorities"),
    fetchTab("Profiles"),
    fetchTab("Strategies"),
    fetchTab("Intros"),
  ]);

  const data = {
    channels: buildRecord(chRows, "key", "description", expectedChannels, "Channels"),
    types: buildRecord(tyRows, "key", "description", TYPES, "Types"),
    authorities: buildRecord(auRows, "key", "description", AUTHORITIES, "Authorities"),
    profileNames: buildRecord(prRows, "key", "name", PROFILES, "Profiles (name)"),
    profileDescriptions: buildRecord(prRows, "key", "description", PROFILES, "Profiles (description)"),
    strategies: buildRecord(stRows, "key", "text", TYPES, "Strategies"),
    intros: buildRecord(inRows, "key", "text", INTRO_KEYS, "Intros"),
  };

  const out = generateCopyTs(data);
  fs.writeFileSync(COPY_TS, out);
  console.log(`[sync-copy] Wrote ${COPY_TS}`);
  console.log(`[sync-copy]   ${Object.keys(data.channels).length} channels, ` +
    `${Object.keys(data.types).length} types, ` +
    `${Object.keys(data.authorities).length} authorities, ` +
    `${Object.keys(data.profileNames).length} profiles, ` +
    `${Object.keys(data.intros).length} intros.`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
