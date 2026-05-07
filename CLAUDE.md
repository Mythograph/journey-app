# Mythograph Journey — project notes for Claude

## Git
- Always commit directly to `main`. Do not create feature branches.
- Push to `origin main` after every commit.

## Stack
- Astro 5, React 19, Tailwind 4, Netlify (SSR)
- Chart engine: `src/lib/chart-engine/` — astronomy-engine, luxon, tz-lookup
- Payments: Stripe webhooks → `src/pages/api/stripe-webhook.ts`
- Purchase storage: Netlify Blobs via `src/lib/purchases.ts`
- Token-gated reading page: `src/pages/journey/[token].astro`

## Env vars (set in Netlify)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `MAKE_WEBHOOK_URL`
- `TOKEN_SECRET`
- `SITE_URL` = https://journey.mythograph.co
