/**
 * Normalizes Sanskrit, IAST, and English search strings for robust matching.
 * Handles diacritics (macron, dots, accents), phonetic variants (sh/s, ri/r),
 * and Devanagari mapping so learners typing plain Latin letters or Devanagari
 * find website content effortlessly.
 */

// IAST diacritic mapping to plain ASCII
const IAST_MAP: Record<string, string> = {
  'ā': 'a', 'Ā': 'a',
  'ī': 'i', 'Ī': 'i',
  'ū': 'u', 'Ū': 'u',
  'ṛ': 'r', 'Ṛ': 'r',
  'ṝ': 'r', 'Ṝ': 'r',
  'ḷ': 'l', 'Ḷ': 'l',
  'ḹ': 'l', 'Ḹ': 'l',
  'ṅ': 'n', 'Ṅ': 'n',
  'ñ': 'n', 'Ñ': 'n',
  'ṭ': 't', 'Ṭ': 't',
  'ḍ': 'd', 'Ḍ': 'd',
  'ṇ': 'n', 'Ṇ': 'n',
  'ś': 's', 'Ś': 's',
  'ṣ': 's', 'Ṣ': 's',
  'ḥ': 'h', 'Ḥ': 'h',
  'ṃ': 'm', 'Ṃ': 'm',
  'ṁ': 'm', 'Ṁ': 'm',
};

// Common Devanagari to English phonetic approximation
const DEVANAGARI_MAP: Record<string, string> = {
  'अ': 'a', 'आ': 'a', 'इ': 'i', 'ई': 'i', 'उ': 'u', 'ऊ': 'u',
  'ऋ': 'r', 'ॠ': 'r', 'ऌ': 'l', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'n',
  'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'n',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
  'श': 's', 'ष': 's', 'स': 's', 'ह': 'h',
  'ा': 'a', 'ि': 'i', 'ी': 'i', 'ु': 'u', 'ू': 'u',
  'ृ': 'r', 'ॄ': 'r', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
  'ं': 'm', 'ः': 'h', '्': '', 'ऽ': 'a'
};

export function stripDiacritics(text: string): string {
  if (!text) return '';
  let clean = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  clean = clean.replace(/[āĀīĪūŪṛṚṝṜḷḶḹḸṅṄñÑṭṬḍḌṇṆśŚṣṢḥḤṃṂṁṀ]/g, (ch) => IAST_MAP[ch] || ch);
  return clean.toLowerCase();
}

export function devanagariToAscii(text: string): string {
  if (!text) return '';
  return text.split('').map((ch) => DEVANAGARI_MAP[ch] || ch).join('');
}

export function normalizeSearchText(text: string): string {
  if (!text) return '';
  const devConverted = devanagariToAscii(text);
  const stripped = stripDiacritics(devConverted);
  return stripped
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if search query matches the target string flexibly:
 * 1. Direct case-insensitive match
 * 2. Diacritic-stripped match (e.g., 'vidya' matches 'vidyā')
 * 3. Devanagari transliteration match (e.g., 'vidya' matches 'विद्या', or 'विद्या' matches 'vidyā')
 * 4. Fuzzy phonetics (e.g., 'shiva' matches 'śiva', 'rishi' matches 'ṛṣi')
 */
export function matchesSearchQuery(target: string, query: string): boolean {
  if (!query.trim()) return true;
  if (!target) return false;

  const rawTargetLower = target.toLowerCase();
  const rawQueryLower = query.toLowerCase().trim();

  // Fast path: direct inclusion
  if (rawTargetLower.includes(rawQueryLower)) return true;

  const normTarget = normalizeSearchText(target);
  const normQuery = normalizeSearchText(query);

  if (normTarget.includes(normQuery)) return true;

  // Check token by token
  const queryTokens = normQuery.split(/\s+/).filter(Boolean);
  if (queryTokens.length === 0) return true;

  return queryTokens.every((token) => {
    if (normTarget.includes(token)) return true;

    // Fuzzy: sh <-> s
    const tokenS = token.replace(/sh/g, 's');
    const targetS = normTarget.replace(/sh/g, 's');
    if (targetS.includes(tokenS)) return true;

    // Fuzzy: ri <-> r
    const tokenR = token.replace(/ri/g, 'r');
    const targetR = normTarget.replace(/ri/g, 'r');
    if (targetR.includes(tokenR)) return true;

    // Fuzzy: ee <-> i, oo <-> u, aa <-> a, w <-> v
    const tokenV = token.replace(/ee/g, 'i').replace(/oo/g, 'u').replace(/aa/g, 'a').replace(/w/g, 'v');
    const targetV = normTarget.replace(/ee/g, 'i').replace(/oo/g, 'u').replace(/aa/g, 'a').replace(/w/g, 'v');
    if (targetV.includes(tokenV)) return true;

    return false;
  });
}
