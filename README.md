# Mythograph Journey

A Human Design bodygraph chart tool and paid Journey Narrative reading,
in Cléa Hernández's voice. Lives at `journey.mythograph.co`.

## Stack

- **Astro 5** + **React 19** islands
- **Tailwind 4** (via `@tailwindcss/vite`)
- **TypeScript** strict
- **Netlify** (Functions + Blobs) for hosting and one-time-use token storage
- **Anthropic Claude** (Sonnet 4.6) for the long-form narrative engine
- **Stripe** ($37 product) → **Make.com** → token email
- **Kit** (free plan, tagging only)
- **Self-hosted Human Design chart engine** — `astronomy-engine` + I-Ching gate
  mapping + channel/center derivation. No third-party chart API at runtime.

## Local dev

```sh
npm install
npm run dev      # http://localhost:4321
npm run build
```

Copy `.env.example` to `.env.local` and fill keys for the features you're
working on (most are not needed until Day 3+).

## Routes

- `/` — landing page
- `/chart` — free bodygraph tool (Day 2)
- `/journey/[token]` — gated paid Journey Narrative (Day 3+)

## Sprint

7-day build, May 2026. See the brief; tracked in conversation, not in repo.

## License

Private. © Mythograph 2026.
