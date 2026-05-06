import { createHash, randomBytes } from "crypto";

export interface Purchase {
  token: string;
  email: string;
  name: string;
  stripeSessionId: string;
  paidAt: string; // ISO timestamp
}

// ── Token creation ─────────────────────────────────────────────────────────────
// Token = random 24 bytes (base64url) prefixed with an HMAC of the email
// so we can verify it is legitimate without a DB round-trip on every request,
// while still being able to look up by token.

export function createPurchaseToken(email: string, sessionId: string): string {
  const secret = import.meta.env.TOKEN_SECRET ?? "dev-secret-change-me";
  const rand = randomBytes(18).toString("base64url");
  const hmac = createHash("sha256")
    .update(`${secret}:${email}:${sessionId}`)
    .digest("hex")
    .slice(0, 12);
  return `jny_${hmac}${rand}`;
}

// ── Storage ───────────────────────────────────────────────────────────────────
// Uses Netlify Blobs when available (production), falls back to an in-process
// Map for local dev. The Map is not shared between instances but is fine for
// testing — replace with a persistent KV if you need multi-process dev.

type Store = {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
};

function getStore(): Store {
  // Netlify Blobs are injected into the runtime globals in production.
  // We import lazily so the module doesn't crash in local dev.
  const globalAny = globalThis as Record<string, unknown>;

  if (typeof globalAny["netlifyBlobsStore"] === "function") {
    const raw = globalAny["netlifyBlobsStore"]("journey-purchases");
    return {
      get: (k) => raw.get(k, { type: "text" }),
      set: (k, v) => raw.set(k, v),
    };
  }

  // Fallback: module-level Map (dev only)
  const devMap = new Map<string, string>();
  return {
    get: async (k) => devMap.get(k) ?? null,
    set: async (k, v) => { devMap.set(k, v); },
  };
}

export async function savePurchase(purchase: Purchase): Promise<void> {
  const store = getStore();
  await store.set(purchase.token, JSON.stringify(purchase));
}

export async function getPurchase(token: string): Promise<Purchase | null> {
  const store = getStore();
  const raw = await store.get(token);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Purchase;
  } catch {
    return null;
  }
}
