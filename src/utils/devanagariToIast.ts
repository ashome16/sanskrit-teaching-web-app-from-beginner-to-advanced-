// Lightweight Devanagari → IAST romanizer for kid-facing pronunciation hints.
const VOWELS: Record<string, string> = {
  'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऑ': 'o',
};
const SIGNS: Record<string, string> = {
  'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ॉ': 'o',
};
const CONS: Record<string, string> = {
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ', 'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
  'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'ळ': 'ḷ', 'व': 'v',
  'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h',
};
const OTHER: Record<string, string> = {
  'ं': 'ṁ', 'ँ': 'm̐', 'ः': 'ḥ', 'ऽ': "'", '।': '.', '॥': '.', '़': '',
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
};

export function devanagariToIast(text?: string): string {
  if (!text || typeof text !== 'string') return '';
  let out = '';
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (CONS[ch] !== undefined) {
      out += CONS[ch];
      let next = chars[i + 1];
      if (next === '़') { i++; next = chars[i + 1]; }
      if (next === '्') { i++; continue; }
      if (next && SIGNS[next] !== undefined) { out += SIGNS[next]; i++; continue; }
      out += 'a';
    } else if (VOWELS[ch] !== undefined) out += VOWELS[ch];
    else if (OTHER[ch] !== undefined) out += OTHER[ch];
    else if (ch === '्') continue;
    else out += ch;
  }
  return out;
}
