# Chart copy → Google Sheet workflow

The narrative copy on the free chart page (channel paragraphs, type / authority / profile / cross descriptions, intros) lives in a Google Sheet. On every Netlify build, `scripts/sync-copy.mjs` pulls the sheet and rewrites `src/lib/chart-engine/copy.ts`. The synopsis logic and the Journey Narrative link styling stay in code; everything else is editable from the sheet.

## One-time setup

1. **Create a new Google Sheet** named e.g. *"Mythograph Journey — Chart Copy"*.

2. **Add six tabs**, named exactly:
   - `Channels`
   - `Types`
   - `Authorities`
   - `Profiles`
   - `Strategies`
   - `Intros`

3. **Import the seed CSVs** (in this folder) into each matching tab:
   - In each tab: **File → Import → Upload → choose the matching `.csv`**
   - **Import location**: *Replace current sheet*
   - **Separator**: *Comma*
   - **Convert text to numbers/dates**: *No*

4. **Share the sheet**: Share button (top right) → General access → **Anyone with the link → Viewer**.

5. **Get the sheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`

6. **Add it to Netlify**: Site settings → Environment variables → Add:
   - Key: `JOURNEY_COPY_SHEET_ID`
   - Value: *(the ID from step 5)*

That's it. From now on, every Netlify deploy regenerates `copy.ts` from the sheet.

## Editing copy

1. Edit the relevant cell(s) in the sheet.
2. In Netlify: **Deploys → Trigger deploy → Clear cache and deploy site**.
3. Live in ~1–2 minutes.

## Tab structure

| Tab          | Required columns                        | Notes |
|--------------|-----------------------------------------|-------|
| `Channels`   | `key` (`4-63`), `name`, `centers`, `description` | `name` and `centers` are display-only context; only `description` is read by the build. |
| `Types`      | `key`, `description`                    | Keys: Generator, Manifesting Generator, Manifestor, Projector, Reflector |
| `Authorities`| `key`, `description`                    | Keys: Emotional, Sacral, Splenic, Ego Manifested, Ego Projected, Self-Projected, Mental Projected, Lunar, None |
| `Profiles`   | `key` (`4/6`), `name`, `description`    | Both `name` and `description` are used. |
| `Strategies` | `key`, `text`                           | Short — usually one sentence. |
| `Intros`     | `key`, `text`                           | Keys: type, authority, profile, cross |

## What happens if the sheet has problems?

The build fails loudly with a specific error:
- Missing key (e.g. *"Profiles: missing key '5/2'"*)
- Empty cell (e.g. *"Channels: empty 'description' for key '4-63'"*)
- Sheet not public (HTTP 401/403)
- Wrong tab name

The previous deploy stays live until the issue is fixed.

## Local development

`npm run dev` does NOT auto-sync (no `JOURNEY_COPY_SHEET_ID` locally). It uses whatever `copy.ts` is committed in the repo. To pull the latest from the sheet locally:

```bash
JOURNEY_COPY_SHEET_ID=<the-id> npm run sync-copy
```

## Re-seeding from copy.ts (rare)

If you ever want to regenerate the seed CSVs from the current `copy.ts` (e.g. you edited copy.ts directly in an emergency and want to push it back to the sheet):

```bash
npm run seed-csv
```

This rewrites `seed-csv/*.csv` from the current `copy.ts`. Then re-import each into the matching tab.
