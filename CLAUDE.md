# Mythograph Journey — project notes for Claude

Working notes for anyone (human or Claude) picking up this codebase. Keep this
file current as the project evolves.

## What this is

A two-part product by Cléa Hernández, live at `journey.mythograph.co`:

1. **Free Human Design bodygraph chart** (`/chart`) — enter birth data, get a
   calculated bodygraph SVG plus type/strategy/authority/profile/channel copy.
2. **Paid Journey Narrative** ($37) — a long-form, first-person personal reading
   structured as a 14-section Heroine's Journey across the chart's planetary
   activations, plus a Gene Keys "Golden Path" section. Sold via Stripe,
   delivered through a token-gated reading page.

The chart engine is **self-hosted** — astronomy + Human Design derivation are
computed in-process, with no third-party chart API at runtime.

## Stack

- **Astro 5** (SSR, `output: "server"`) + **React 19** islands + **Tailwind 4**
  (via `@tailwindcss/vite`, not a config file). TypeScript strict.
- **Netlify** hosting — adapter `@astrojs/netlify`, Functions, and **Blobs** for
  purchase/token storage.
- **Chart engine**: `astronomy-engine`, `luxon`, `tz-lookup`, Nominatim geocoding.
- **Payments**: Stripe Checkout → webhook → Make.com (fulfilment/email).
- **Narrative**: deterministic template engine in `src/lib/cosmic-core/`, with an
  optional LLM polish pass (Anthropic Claude via `@anthropic-ai/sdk`).
- Path alias: `~/*` → `src/*` (see `tsconfig.json`).

## Folder structure

```
src/
  layouts/Base.astro            Shared HTML shell: <head>, centered <main> (max-w-3xl)
  styles/global.css             Tailwind import, @theme palette + fonts, base element styles
  pages/
    index.astro                 Landing page — two cards: free chart + $37 Stripe link
    chart.astro                 Free bodygraph tool (form + server-rendered chart + copy)
    journey/[token].astro       Token-gated paid reading page (3 states: ready / generating / no-data)
    dev/test-journey.ts         DEV ONLY — creates a fake purchase + redirects to a reading. Delete before prod.
    api/
      stripe-webhook.ts         POST — verifies Stripe sig, creates token+purchase, forwards to Make.com
      generate-narrative.ts     GET ?token — triggers the background narrative function if not yet generated
      narrative-ready.ts        GET ?token — polled by the reading page; returns { ready: boolean }
      save-narrative.ts         POST — internal callback (shared-secret) the bg function calls to persist text
  lib/
    purchases.ts                Purchase type, HMAC token creation, Netlify Blobs storage (Map fallback in dev)
    narrative.ts                App-level narrative orchestrator: chart → cosmic-core builder → normalize → (optional) polish
    narrative-template.txt      Reference copy of the original narrative structure (not imported)
    cosmic-core/                ★ SINGLE SOURCE OF TRUTH (shared with Story Loom) — see below
    chart-engine/               Self-hosted HD chart calculator — see below
netlify/functions/
  generate-bg-background.ts     Background function (up to 15 min): generates narrative, POSTs to /api/save-narrative
scripts/
  sync-copy.mjs                 prebuild step — pulls chart copy from a Google Sheet into chart-engine/copy.ts
  generate-seed-csv.mjs         Writes the seed-csv/ files (source copy for the sheet)
seed-csv/                       CSV seeds for chart copy (channels, types, authorities, profiles, strategies, intros)
```

### `src/lib/cosmic-core/` — the narrative source of truth

Framework-free, LLM-free, app-free pure data + builders. Designed to lift cleanly
into a shared package that **both** journey-app and the Story Loom app depend on.

- `gates.ts` — all 64 HD gates. Each gate carries three frequency bands
  (`low` = shadow, `high` = gift, `arc` = the low→high journey), each in four
  grammatical forms (`short`, `expanded`, `verb`, `gerund`) so templates can slot
  them into different sentence positions, plus `traditionalName`, `quantumName`
  (Mythograph's original name), and a standalone `storyParagraph`.
- `gene-keys.ts` — Gene Keys layer: `GENE_KEY_FREQUENCIES` (Shadow→Gift→Siddhi
  for all 64), `SPHERE_LINE_EXPRESSIONS` (Golden Path line 1–6 meanings for 13
  spheres), `GK_SEQUENCES` (Activation / Venus / Pearl, with double-duty gates),
  and `buildSequenceNarrative`.
- `types.ts` — the 5 HD types. **Standard HD names are canonical** (Generator,
  Manifestor, …); the Mythograph "quantum" name (Builder, Initiator, …) is
  metadata. Carries first-person `typeDescription` + `purposeGerund`.
- `profiles.ts` — the 6 profile-line keynotes.
- `narrative.ts` — the deterministic builders: `buildLifePurposeNarrative` (the
  14-section Heroine's Journey Soul Map, ported from Story Loom — uses
  `renderPair` to collapse near-identical conscious/unconscious placements),
  `buildGoldenPathSection` (the Gene Keys section), and `buildJourneyNarrative`
  (full reading: Soul Map I–XII → Golden Path → recap → larger story).
- `normalize.ts` — deterministic grammar repair after template assembly
  (a/an articles, doubled function words at seams, spacing, paragraph caps).
- `index.ts` — barrel export.

Three naming systems coexist per gate by design: HD traditional name, Mythograph
quantum name, and Gene Keys Shadow/Gift/Siddhi. Keep all three.

### `src/lib/chart-engine/` — self-hosted chart calculator

Pipeline (entry: `index.ts` → `generateChart(birthData)`):

1. `geocode.ts` — city → lat/lng + IANA timezone (Nominatim + tz-lookup).
2. luxon — local birth date/time + tz → UTC instant.
3. `astronomy.ts` — planetary longitudes at birth ("Personality") and ~88° solar
   arc earlier ("Design"); also `findSunLongitude`.
4. `derivation.ts` — longitude → gate (1–64) + line (1–6) via the I-Ching wheel
   (note the **1.75° offset** documented in the file header, validated against
   known charts), then gates → channels → centers → type / strategy / authority /
   profile / incarnation cross.
5. `render.ts` — hand-built SVG bodygraph (620×860 canvas, fixed center coords).
6. `data.ts` — static tables: gate wheel sequence, 34 channels, center→gates,
   motor centers, 192 incarnation cross names.
7. `copy.ts` — human-written interpretive copy (channel essays, type/authority/
   profile/strategy descriptions, intros, dynamic `chartSynopsis`).
   **Regenerated at deploy time** by `scripts/sync-copy.mjs` from a Google Sheet
   when `JOURNEY_COPY_SHEET_ID` is set — don't hand-edit if the sheet is live.
8. `gate-data.ts` — now a thin re-export shim of `cosmic-core/gates.ts`.

## Design choices

Defined in `src/styles/global.css` via Tailwind 4 `@theme`:

- **Palette** (Mythograph): warm-white `#fafaf7` (bg), ink `#1a1410` (text),
  terra `#c05a3c`, indigo `#3a4f99` (links), gold `#c8a24a`, sage `#7a9e7e`.
- **Fonts**: display = Playfair Display (h1–h3, 600, tight tracking); serif =
  Fraunces; sans = DM Sans (body, 17px / 1.6). Self-hosted via `@fontsource`.
- **Layout**: single centered column. `Base.astro` wraps `<main>` at `max-w-3xl`,
  generous padding; the reading page uses its own wider container with numbered
  Roman-numeral section headers.
- Antialiased; links are indigo with a 1px underline and offset.

## Narrative voice (Cléa Hernández)

Strict, and baked into the cosmic-core copy:

- First person ("I", "my") throughout.
- Direct, embodied, specific. No vague spirituality, no new-age filler.
- **No em dashes in generated prose; no "not X, but Y" constructions.**
- Banned words: vibration, manifestation (as mystical concept), resonance,
  authentic self, awakening, frequency. ("Universe" as agent is allowed.)
- Plain text only — no markdown symbols. Section headings are ALL CAPS on their
  own line; the reading page maps them to numbered titles.

## How the narrative is generated (current)

Deterministic, not streamed from an LLM:

1. `generate-narrative.ts` fires the Netlify **background function**
   (`generate-bg-background.ts`).
2. That builds the chart, calls `streamNarrative` → `generateNarrative` in
   `src/lib/narrative.ts`, which: maps the chart to HD + Gene Keys profiles →
   `buildJourneyNarrative` (cosmic-core) → `normalizeGrammar`.
3. Optional **layer 3 polish**: if `ENABLE_NARRATIVE_POLISH=true`, a constrained
   Claude pass smooths grammar/flow only (meaning/structure/headings locked;
   falls back to unpolished text on any shape change). Off by default.
4. Result is POSTed to `/api/save-narrative` (shared-secret) → Netlify Blobs.
5. The reading page polls `/api/narrative-ready` and renders the stored text.

Because it's deterministic + stored, readings render instantly and reproducibly.
Edit the narrative by changing the **template strings in
`cosmic-core/narrative.ts`**, not a prompt.

## Pages / routes

- `/` — landing: intro + two cards (free chart, $37 Journey Narrative → Stripe link).
- `/chart` — free bodygraph tool. Birth-data form; on submit, server-renders the
  SVG plus type/authority/profile/channel copy and a synopsis.
- `/journey/[token]` — paid reading. Verifies the purchase by token; three UI
  states: narrative ready (renders sections), generating (polls), or awaiting
  birth data.
- `/dev/test-journey` — dev shortcut that fakes a purchase. **Remove before prod.**

## Purchase / fulfilment flow

Stripe Checkout (`buy.stripe.com/...` link on the landing page) →
`checkout.session.completed` webhook → `stripe-webhook.ts` creates an HMAC token
(`createPurchaseToken`, salted with `TOKEN_SECRET`) and a `Purchase` record in
Blobs → forwards to `MAKE_WEBHOOK_URL` (Make.com) for the token email. The reading
page later triggers narrative generation on first visit.

## Env vars (set in Netlify; see `.env.example`)

- `ANTHROPIC_API_KEY` — only needed if the polish pass is enabled.
- `ENABLE_NARRATIVE_POLISH` — `"true"` to turn on layer-3 LLM polish (default off).
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `MAKE_WEBHOOK_URL` (Stripe→token email), `MAKE_NARRATIVE_WEBHOOK_URL` (narrative→email)
- `INTERNAL_CALLBACK_SECRET` — guards `/api/save-narrative`
- `TOKEN_SECRET` — HMAC salt for purchase tokens
- `SITE_URL` = https://journey.mythograph.co
- `JOURNEY_COPY_SHEET_ID` — Google Sheet ID for chart copy sync (prebuild)
- Netlify Blobs credentials are auto-injected in deployed environments.

## Commands

```sh
npm run dev        # astro dev → http://localhost:4321
npm run build      # runs prebuild (sync-copy) then astro build
npm run check      # astro check (type-check)
npm run sync-copy  # pull chart copy from the Google Sheet
```

Note: `astro check` reports 2 pre-existing `@netlify/blobs` typing errors in
`purchases.ts` (the Blobs `get`/`set` return types) — these are benign and not
introduced by recent work.

## Conventions & preferences

- Keep `cosmic-core/` pure: no Astro/React/Anthropic imports — it must stay
  framework- and LLM-agnostic so it can become a shared package.
- The chart engine stays self-hosted; don't introduce a runtime chart API.
- Chart **copy** (channels/types/profiles) is sheet-driven via `sync-copy`; gate
  and Gene Keys **narrative content** is code-driven in `cosmic-core`.
- Prefer deterministic builders over LLM generation for the reading; the LLM is a
  finishing tool only.

## Git

- Cléa's standing preference: commit directly to `main` and push to `origin main`
  after every commit; no feature branches.
- (Automated/web sessions may be pinned to a working branch by the harness — when
  that happens, develop and push there, but the project's default is `main`.)
