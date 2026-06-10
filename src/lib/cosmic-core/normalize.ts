// Cosmic Core — deterministic grammar normalizer.
//
// Runs after template assembly to fix the mechanical seams that slot-filled
// templates produce: wrong articles, doubled function words, stray spacing,
// and lowercase paragraph openings. It never touches meaning — every rule
// here is a pure surface repair. Anything that requires understanding what
// two fragments mean together belongs to the (optional) polish pass, not
// this file.

// Words whose spelling starts with a vowel but are pronounced with a
// consonant sound ("a unique gift", "a one-time thing").
const CONSONANT_SOUND = new Set([
  "unique", "uniquely", "universal", "universally", "universe", "unified",
  "unifying", "union", "unit", "united", "user", "useful", "usual", "usually",
  "one", "once", "european", "eulogy",
]);

// Words whose spelling starts with a consonant but are pronounced with a
// vowel sound ("an hour", "an honest answer").
const VOWEL_SOUND = new Set([
  "hour", "hourly", "honest", "honestly", "honor", "honour", "honored",
  "honoured", "heir", "heirloom",
]);

function wantsAn(word: string): boolean {
  const w = word.toLowerCase().replace(/[^a-z].*$/, "");
  if (!w) return false;
  if (VOWEL_SOUND.has(w)) return true;
  if (CONSONANT_SOUND.has(w)) return false;
  return /^[aeiou]/.test(w);
}

// Function words that are never legitimately doubled at a template seam.
// (Content words like "had had" are left alone.)
const DEDUP_WORDS = new Set([
  "a", "an", "and", "as", "at", "by", "for", "from", "in", "into", "is",
  "my", "of", "on", "or", "that", "the", "to", "through", "toward", "with",
]);

export function normalizeGrammar(text: string): string {
  let out = text;

  // Collapse runs of spaces/tabs (not newlines).
  out = out.replace(/[ \t]{2,}/g, " ");

  // No space before closing punctuation; one space after sentence punctuation.
  out = out.replace(/ +([,.;:!?])/g, "$1");

  // Doubled punctuation from seams: ",." → "." ; ".." → "." (leave "…" alone).
  out = out.replace(/,\s*\./g, ".");
  out = out.replace(/([^.])\.\.(?!\.)/g, "$1.");

  // Doubled function words at seams ("to to", "and and", "the the").
  out = out.replace(/\b([A-Za-z]+) (\1)\b/g, (match, w1: string) =>
    DEDUP_WORDS.has(w1.toLowerCase()) ? w1 : match
  );

  // a/an agreement against the following word.
  out = out.replace(/\b(a|an|A|An) ([A-Za-zÀ-ÿ'-]+)/g, (match, art: string, word: string) => {
    const an = wantsAn(word);
    const isAn = art.toLowerCase() === "an";
    if (an === isAn) return match;
    const fixed = an ? "an" : "a";
    const cased = art[0] === art[0].toUpperCase() ? fixed[0].toUpperCase() + fixed.slice(1) : fixed;
    return `${cased} ${word}`;
  });

  // Capitalize the first letter of each paragraph (template slots can open
  // a paragraph with a lowercase fragment).
  out = out
    .split("\n")
    .map((line, i, lines) => {
      const prev = i > 0 ? lines[i - 1] : "";
      const isParagraphStart = i === 0 || prev.trim() === "";
      if (!isParagraphStart) return line;
      return line.replace(/^(\s*)([a-z])/, (_, ws: string, ch: string) => ws + ch.toUpperCase());
    })
    .join("\n");

  // Trim trailing whitespace per line.
  out = out.replace(/[ \t]+$/gm, "");

  return out;
}
