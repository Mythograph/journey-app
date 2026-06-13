# Journey Narrative — session handoff (2026-06-13)

Pick-up notes for the next session. Read this first, then `CLAUDE.md` for the
full project background. Everything below is committed on branch
**`claude/relaxed-ritchie-rmtls9`** (push there, not `main`; `main` is updated
by merging PRs from the working branch).

## What this work is

Progressive enhancement of the paid **$37 Journey Narrative** (`/journey/[token]`):
a deterministic, first-person Human Design + Gene Keys reading built in
`src/lib/cosmic-core/`, rendered by `src/pages/journey/[token].astro`, with a
PDF as the primary deliverable.

## Done this session (latest commits on the branch)

- **192 per-cross incarnation narratives** — `src/lib/cosmic-core/cross-descriptions.ts`,
  keyed `${sunGate}/${RA|JUX|LA}` (same keys as the chart engine's `CROSS_NAMES`),
  rewritten from loveyourhumandesign into first-person voice. Woven into **The Call**
  after the four-gate synthesis, with the cross-variation paragraph
  (`crosses.ts`). Falls back to the four-gate synthesis if a cross has no entry.
- **Reflection / writing prompts** — `src/lib/cosmic-core/reflections.ts`. One
  first-person journaling prompt per stage, injected at section boundaries,
  led by the `REFLECTION_MARKER` (`✎ `). Rendered on the page as a gold-ruled
  "To write with" callout. The Call's prompt is personalized (conscious Sun gift).
- **Gene Keys sequence diagrams** — `src/lib/cosmic-core/sequence-diagram.ts`.
  Hand-built SVG (one per sequence: Activation/Venus/Pearl), a left-rail of
  spheres + named pathways + each sphere's Shadow→Gift→Siddhi. Rendered inline
  before each sequence's prose in **The Village Journey**.
- **Centers diagram** — `src/lib/cosmic-core/centers-diagram.ts`. Compact
  bodygraph of the 9 centers (defined/undefined/open), marking a conscious light
  in non-defined ground (the gift-in-open-ground motif). Mirrors the chart-engine
  geometry. Rendered at the top of **The Shape of My Energy**.
- **Section imagery** — `SECTION_IMAGES` map + cover in `[token].astro`, served
  from `public/images/sections/` (see the README there). All **13 images are in
  place** with semantic names. The Descent image was swapped to `04-descent.png`
  (vintage graphic poster), replacing the Psyche-ants jpg.

Sample word count: ~7,440 (budget is 8,000).

## Architecture quick map

- `src/lib/cosmic-core/` — pure, framework/LLM-free data + builders (shared with
  Story Loom). `index.ts` is the barrel. The narrative builder is `narrative.ts`
  (`buildJourneyNarrative` → Act I `buildLifePurposeNarrative` → hinge →
  `buildVillageJourney` → recap; then `injectReflectionPrompts`).
- `src/lib/narrative.ts` — app orchestrator (chart → profiles → build → normalize →
  optional LLM polish). Exposes `humanDesignProfileFromChart`,
  `geneKeysProfileFromChart`.
- `src/pages/journey/[token].astro` — the reading page / print source.
  `SECTION_META` (I–XVIII numbering), `SECTION_IMAGES`, `SECTION_PLANETS`,
  `parseSections`, and the render loop (images, centers diagram, sequence
  diagrams, reflection callouts). Print CSS lives in the `<style>` block.

## Voice rules (strict — enforce on any new copy)

First person ("I/my") throughout, including prompts and Gene Keys content. No em
dashes in generated prose (section TITLES may keep them). American English.
Banned words: vibration, manifestation (mystical sense), resonance, authentic
self, awakening, frequency. "Universe" as agent is allowed. Plain text; ALL-CAPS
section headings on their own line.

## How to test

- The chart engine's astronomy-engine + Nominatim **fail under `tsx`**. Test
  cosmic-core directly with a hand fixture instead. Pattern in `/tmp/smoke.mts`
  (synthetic 3/5 Manifesting Generator chart). Run: `node_modules/.bin/tsx /tmp/smoke.mts`.
- Scrub checks: grep the output for `\byou\b|\byour\b`, banned words, and em
  dashes on non-title lines — all should be empty.
- `npx astro check` — **2 pre-existing `purchases.ts` Blobs typing errors are
  benign**; everything else should be clean. `npm run build` should pass.
- PDF preview was made in-container with WeasyPrint + Pillow (not the real page).
  The production PDF is the browser "Save as PDF" on the actual reading page.

## Image workflow (avoid the mistake we hit)

Drop image files **straight into `public/images/sections/` with the semantic
names** the README lists (cover.png, 01-ordinary-world.png, …), then commit +
push to the working branch. Do NOT commit to the repo root or to `public/images/`
— that requires manual moving.

## Open items / next steps

1. **PDF delivery decision (her call):** browser "Save as PDF" is enough now, OR
   build a small local headless-Chromium script that renders the real page to a
   `.pdf` file she can run and email (CLAUDE.md anticipates "a script she runs").
2. **Review The Descent image in context** — the section's original rationale
   described the classical Psyche fresco, which was swapped out; the prose may
   want a light touch-up to match the new image.
3. **Stray file:** `stock-vector-human-design-bodygraph-...svg` is at the repo
   root on `main`, not part of the mapping. Decide delete vs keep.
4. **Cléa's editing pass** on all new copy: the 192 cross descriptions, the
   reflection prompts, the cross-variation copy. A few cross descriptions kept
   reworded source imagery (e.g. "outlaw who robs from plenty," "old soothsayer").
5. **Optional imagery** for sections currently without an image file: the hinge
   (Am I Made for This Moment?), The Gauntlet, The Village Journey (it has the
   sequence diagrams but no opener image).

## Git

Branch `claude/relaxed-ritchie-rmtls9`. Commit messages end with the session
URL line. Don't push to `main` directly.
