/**
 * Indic Transliteration Engine for Sanskrit
 * Fast, accurate transliteration between Devanagari (देवनागरी),
 * Malayalam (മലയാളം), and Tamil (தமிழ் with Grantha support).
 */

export type IndicScript = 'devanagari' | 'tamil' | 'malayalam';

// 1. Devanagari to Malayalam Character Mapping (Direct Unicode alignment)
const DEVA_TO_MALAYALAM: Record<string, string> = {
  // Vowels (स्वर)
  'अ': 'അ',
  'आ': 'ആ',
  'इ': 'ഇ',
  'ई': 'ഈ',
  'उ': 'ഉ',
  'ऊ': 'ഊ',
  'ऋ': 'ഋ',
  'ॠ': 'ൠ',
  'ऌ': 'ഌ',
  'ॡ': 'ൡ',
  'ए': 'ഏ',
  'ऐ': 'ഐ',
  'ओ': 'ഓ',
  'औ': 'ഔ',
  'अं': 'അം',
  'अः': 'അഃ',

  // Matras (मात्रा)
  'ा': 'ാ',
  'ि': 'ി',
  'ी': 'ീ',
  'ु': 'ു',
  'ू': 'ൂ',
  'ृ': 'ൃ',
  'ॄ': 'ൄ',
  'ॢ': 'ൢ',
  'ॣ': 'ൣ',
  'े': 'േ',
  'ै': 'ൈ',
  'ो': 'ോ',
  'ौ': 'ൌ',
  '्': '്', // Virama
  'ं': 'ം', // Anusvara
  'ः': 'ഃ', // Visarga
  'ँ': 'origँ', // Candrabindu
  'ऽ': 'ഽ', // Avagraha
  'ॐ': 'ഓം',

  // Consonants (व्यञ्जनानि)
  'क': 'ക', 'ख': 'ഖ', 'ग': 'ഗ', 'घ': 'ഘ', 'ङ': 'ങ',
  'च': 'ച', 'छ': 'ഛ', 'ज': 'ജ', 'झ': 'ഝ', 'ञ': 'ഞ',
  'ट': 'ട', 'ठ': 'ഠ', 'ड': 'ഡ', 'ढ': 'ഢ', 'ण': 'ണ',
  'त': 'ത', 'थ': 'ഥ', 'द': 'ദ', 'ध': 'ധ', 'न': 'ന',
  'प': 'പ', 'फ': 'ഫ', 'ब': 'ബ', 'भ': 'ഭ', 'म': 'മ',
  'य': 'യ', 'र': 'ര', 'ल': 'ല', 'व': 'വ',
  'श': 'ശ', 'ष': 'ഷ', 'स': 'സ', 'ह': 'ഹ',
  'ळ': 'ള', 'क्ष': 'ക്ഷ', 'ज्ञ': 'ജ്ഞ',

  // Digits
  '०': '൦', '१': '൧', '२': '൨', '३': '൩', '४': '൪',
  '५': '൫', '६': '൬', '७': '൭', '८': '൮', '९': '൯',
  '।': '।', '॥': '॥',
};

// 2. Devanagari to Tamil (with Grantha support for aspirated / voiced Sanskrit sounds)
const DEVA_TO_TAMIL: Record<string, string> = {
  // Vowels (உயிரெழுத்துக்கள்)
  'अ': 'அ',
  'आ': 'ஆ',
  'इ': 'இ',
  'ई': 'ஈ',
  'उ': 'உ',
  'ऊ': 'ஊ',
  'ऋ': 'ரி',
  'ॠ': 'ரீ',
  'ऌ': 'லி',
  'ॡ': 'லீ',
  'ए': 'ஏ',
  'ऐ': 'ஐ',
  'ओ': 'ஓ',
  'औ': 'ஔ',
  'अं': 'அம்',
  'अः': 'அ:',

  // Matras
  'ा': 'ா',
  'ि': 'ி',
  'ी': 'ீ',
  'ु': 'ு',
  'ू': 'ூ',
  'ृ': '்ரி',
  'ॄ': '்ரீ',
  'े': 'ே',
  'ै': 'ை',
  'ो': 'ோ',
  'ौ': 'ௌ',
  '्': '்', // Virama
  'ं': 'ம்', // Anusvara
  'ः': ':', // Visarga
  'ऽ': '\'', // Avagraha
  'ॐ': 'ஓம்',

  // Consonants (with Grantha letters: ஜ, ஷ, ஸ, ஹ, க்ஷ, ஸ்ரீ)
  'क': 'க', 'ख': 'க²', 'ग': 'க³', 'घ': 'க⁴', 'ङ': 'ங',
  'च': 'ச', 'छ': 'ச²', 'ज': 'ஜ', 'झ': 'ஜ²', 'ञ': 'ஞ',
  'ट': 'ட', 'ठ': 'ட²', 'ड': 'ட³', 'ढ': 'ட⁴', 'ण': 'ண',
  'त': 'த', 'थ': 'த²', 'द': 'த³', 'ध': 'த⁴', 'न': 'ந',
  'प': 'ப', 'फ': 'ப²', 'ब': 'ப³', 'भ': 'ப⁴', 'म': 'ம',
  'य': 'ய', 'र': 'ர', 'ल': 'ல', 'व': 'வ',
  'श': 'ஶ', 'ष': 'ஷ', 'स': 'ஸ', 'ह': 'ஹ',
  'ळ': 'ள', 'क्ष': 'க்ஷ', 'ज्ञ': 'ஜ்ஞ',

  // Digits
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
  '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
  '।': '।', '॥': '॥',
};

/**
 * Transliterates Devanagari text to Malayalam script (മലയാളം)
 */
export function devanagariToMalayalam(text: string): string {
  if (!text) return '';

  let result = '';
  let i = 0;
  while (i < text.length) {
    // Check two-char combinations like 'क्ष', 'ज्ञ'
    const twoChar = text.slice(i, i + 2);
    if (DEVA_TO_MALAYALAM[twoChar]) {
      result += DEVA_TO_MALAYALAM[twoChar];
      i += 2;
      continue;
    }

    const char = text[i];
    result += DEVA_TO_MALAYALAM[char] ?? char;
    i++;
  }

  return result;
}

/**
 * Transliterates Devanagari text to Tamil script (தமிழ் / கிரந்தம்)
 */
export function devanagariToTamil(text: string, cleanSuperscripts: boolean = true): string {
  if (!text) return '';

  let result = '';
  let i = 0;
  while (i < text.length) {
    // Check two-char combinations like 'क्ष', 'ज्ञ'
    const twoChar = text.slice(i, i + 2);
    if (DEVA_TO_TAMIL[twoChar]) {
      result += DEVA_TO_TAMIL[twoChar];
      i += 2;
      continue;
    }

    const char = text[i];
    result += DEVA_TO_TAMIL[char] ?? char;
    i++;
  }

  if (cleanSuperscripts) {
    // Optionally clean superscripts (², ³, ⁴) for casual modern Tamil reading
    return result.replace(/[²³⁴]/g, '');
  }

  return result;
}

/**
 * Universal Sanskrit Script Transliteration Dispatcher
 */
export function transliterateSanskrit(text: string, targetScript: IndicScript): string {
  if (!text || targetScript === 'devanagari') return text;

  if (targetScript === 'malayalam') {
    return devanagariToMalayalam(text);
  }

  if (targetScript === 'tamil') {
    return devanagariToTamil(text);
  }

  return text;
}
