/**
 * Sanskrit Linguistic Analysis Utilities
 * Provides functions for syllable segmentation, conjunct consonant identification,
 * and root word extraction
 */

import type {
  SanskritWordBreakdown,
  Aksara,
  SamyuktAksara,
} from '../types/linguistics';

// Sanskrit character mappings
const DEVANAGARI_VOWELS = [
  'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ'
];

const DEVANAGARI_VOWEL_SIGNS = [
  'ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'े', 'ै', 'ो', 'ौ'
];

// Anusvara/visarga attach to the syllable before them rather than standing alone
const DEVANAGARI_TRAILING_MARKS = ['ं', 'ः'];

// Explicit phonetic overrides so the velar nasal and aspirated retroflex never
// collapse into their plain dental look-alikes ('na', 'dha') in the transliteration.
const PHONETIC_OVERRIDES: Record<string, string> = {
  'ङ': 'ṅa',
  'ढ': 'ḍha',
};

const DEVANAGARI_CONSONANTS = [
  'क', 'ख', 'ग', 'घ', 'ङ', // ka, kha, ga, gha, nga
  'च', 'छ', 'ज', 'झ', 'ञ', // cha, chha, ja, jha, nya
  'ट', 'ठ', 'ड', 'ढ', 'ण', // ta, tha, da, dha, na
  'त', 'थ', 'द', 'ध', 'न', // ta, tha, da, dha, na
  'प', 'फ', 'ब', 'भ', 'म', // pa, pha, ba, bha, ma
  'य', 'र', 'ल', 'व',       // ya, ra, la, va
  'श', 'ष', 'स', 'ह',       // sha, sha, sa, ha
  'ड़', 'ढ़',                 // qa, khha (additional)
  'क्ष', 'त्र', 'ज्ञ'         // ksha, tra, jnya (common conjuncts)
];

// Common conjunct consonants (Samyuktākṣara)
const COMMON_CONJUNCTS: Record<string, string[]> = {
  'क्ष': ['क्', 'ष'],
  'त्र': ['त्', 'र'],
  'ज्ञ': ['ज्', 'ञ'],
  'श्र': ['श्', 'र'],
  'द्य': ['द्', 'य'],
  'द्व': ['द्', 'व'],
  'ध्य': ['ध्', 'य'],
  'ध्व': ['ध्', 'व'],
  'न्य': ['न्', 'य'],
  'न्न': ['न्', 'न'],
  'म्य': ['म्', 'य'],
  'य्य': ['य्', 'य'],
  'र्य': ['र्', 'य'],
  'ल्य': ['ल्', 'य'],
  'व्य': ['व्', 'य'],
  'स्त': ['स्', 'त'],
  'स्न': ['स्', 'न'],
  'स्य': ['स्', 'य'],
  'ह्य': ['ह्', 'य'],
  'ह्म': ['ह्', 'म'],
  'प्त': ['प्', 'त'],
  'प्य': ['प्', 'य'],
  'प्र': ['प्', 'र'],
  'प्ल': ['प्', 'ल'],
  'ब्य': ['ब्', 'य'],
  'ब्र': ['ब्', 'र'],
  'ब्ल': ['ब्', 'ल'],
  'भ्य': ['भ्', 'य'],
  'भ्र': ['भ्', 'र'],
  'भ्ल': ['भ्', 'ल'],
  'म्र': ['म्', 'र'],
  'य्व': ['य्', 'व'],
};

// Transliteration mapping
const DEVANAGARI_TO_IAST: Record<string, string> = {
  // Vowels
  'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū',
  'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ॡ': 'ḹ',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
  
  // Vowel signs
  'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū',
  'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ', 'ॣ': 'ḹ',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
  
  // Consonants (Ka-Varga)
  'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': PHONETIC_OVERRIDES['ङ'],
  
  // Consonants (Cha-Varga)
  'च': 'ca', 'छ': 'cha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'ña',
  
  // Consonants (Ta-Varga)
  'ट': 'ṭa', 'ठ': 'ṭha', 'ड': 'ḍa', 'ढ': PHONETIC_OVERRIDES['ढ'], 'ण': 'ṇa',
  
  // Consonants (Ta-Varga - dental)
  'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
  
  // Consonants (Pa-Varga)
  'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
  
  // Consonants (Semivowels)
  'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va',
  
  // Consonants (Sibilants and ha)
  'श': 'śa', 'ष': 'ṣa', 'स': 'sa', 'ह': 'ha',

  // Anusvara and visarga
  'ं': 'ṃ', 'ः': 'ḥ',
  
  // Halant (virama)
  '्': '',
  
  // Common conjuncts
  'क्ष': 'kṣa', 'त्र': 'tra', 'ज्ञ': 'jña',
  'श्र': 'śra', 'द्य': 'dya', 'ध्य': 'dhya',
};

/**
 * Transliterate a single syllable/cluster, stripping the inherent 'a' when
 * the syllable ends in a bare halant (i.e. it carries no vowel of its own).
 */
const transliterateSyllable = (syllable: string): string => {
  if (DEVANAGARI_TO_IAST[syllable]) return DEVANAGARI_TO_IAST[syllable];

  let result = '';
  for (const ch of syllable) {
    result += DEVANAGARI_TO_IAST[ch] ?? ch;
  }
  if (syllable.endsWith('्') && result.endsWith('a')) {
    result = result.slice(0, -1);
  }
  return result;
};

/**
 * Segment a Sanskrit word into syllables (Akṣaras)
 */
export const segmentSyllables = (devanagari: string): Aksara[] => {
  const syllables: Aksara[] = [];
  let i = 0;

  while (i < devanagari.length) {
    const char = devanagari[i];

    // Check for conjunct consonants first
    let foundConjunct = false;
    for (const [conjunct, _] of Object.entries(COMMON_CONJUNCTS)) {
      if (devanagari.slice(i, i + conjunct.length) === conjunct) {
        syllables.push({
          devanagari: conjunct,
          transliteration: DEVANAGARI_TO_IAST[conjunct] || conjunct,
          iotype: 'conjunct',
        });
        i += conjunct.length;
        foundConjunct = true;
        break;
      }
    }

    if (foundConjunct) continue;

    // Check for standalone vowels
    if (DEVANAGARI_VOWELS.includes(char)) {
      let syllable = char;
      let iotype: 'vowel' | 'consonant' | 'vowel-sign' = 'vowel';

      // Look ahead for vowel signs
      if (i + 1 < devanagari.length && DEVANAGARI_VOWEL_SIGNS.includes(devanagari[i + 1])) {
        syllable += devanagari[i + 1];
        i++;
      }

      syllables.push({
        devanagari: syllable,
        transliteration: DEVANAGARI_TO_IAST[syllable] || syllable,
        iotype,
      });
      i++;
      continue;
    }

    // Check for consonants
    if (DEVANAGARI_CONSONANTS.includes(char)) {
      let syllable = char;
      i++;

      // Consume any halant(+consonant) chain, e.g. मध्यमेन half-consonants,
      // so an unrecognized conjunct stays together as one syllable unit
      // instead of a half-consonant being silently dropped.
      while (i < devanagari.length && devanagari[i] === '्') {
        syllable += devanagari[i];
        i++;
        if (i < devanagari.length && DEVANAGARI_CONSONANTS.includes(devanagari[i])) {
          syllable += devanagari[i];
          i++;
        } else {
          // Trailing halant with nothing after it (a word-final half-consonant)
          break;
        }
      }

      // Consume vowel sign on the final consonant of the cluster, if present
      if (i < devanagari.length && DEVANAGARI_VOWEL_SIGNS.includes(devanagari[i])) {
        syllable += devanagari[i];
        i++;
      }

      // Consume a trailing anusvara/visarga (ं/ः) as part of this syllable
      // rather than letting it fall through and get silently dropped.
      if (i < devanagari.length && DEVANAGARI_TRAILING_MARKS.includes(devanagari[i])) {
        syllable += devanagari[i];
        i++;
      }

      const transliteration = transliterateSyllable(syllable);
      if (syllable.endsWith('्') && syllables.length > 0) {
        // A standalone trailing half-consonant has no vowel of its own, so it
        // belongs to the previous syllable's coda rather than standing alone.
        const previous = syllables[syllables.length - 1];
        previous.devanagari += syllable;
        previous.transliteration += transliteration;
      } else {
        syllables.push({
          devanagari: syllable,
          transliteration,
          iotype: 'consonant',
        });
      }
      continue;
    }

    // A trailing anusvara/visarga after a standalone vowel syllable
    if (DEVANAGARI_TRAILING_MARKS.includes(char) && syllables.length > 0) {
      const previous = syllables[syllables.length - 1];
      previous.devanagari += char;
      previous.transliteration += DEVANAGARI_TO_IAST[char] ?? char;
      i++;
      continue;
    }

    // Skip other characters (spaces, punctuation, etc.)
    i++;
  }

  return syllables;
};

/**
 * Identify conjunct consonants (Samyuktākṣara) in a word
 */
export const identifyConjuncts = (devanagari: string): SamyuktAksara[] => {
  const conjuncts: SamyuktAksara[] = [];

  for (const [conjunct, components] of Object.entries(COMMON_CONJUNCTS)) {
    if (devanagari.includes(conjunct)) {
      conjuncts.push({
        devanagari: conjunct,
        transliteration: DEVANAGARI_TO_IAST[conjunct] || conjunct,
        components,
        description: `Conjunct consonant made of: ${components.join(' + ')}`,
      });
    }
  }

  return conjuncts;
};

/**
 * Convert Devanagari to IAST transliteration
 */
export const devanagariToIAST = (devanagari: string): string => {
  let result = '';
  let i = 0;

  while (i < devanagari.length) {
    let foundMatch = false;

    // Try to match longest sequences first (for conjuncts and vowel+sign)
    for (let len = 3; len > 0; len--) {
      const substring = devanagari.slice(i, i + len);
      if (DEVANAGARI_TO_IAST[substring]) {
        result += DEVANAGARI_TO_IAST[substring];
        i += len;
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      result += devanagari[i];
      i++;
    }
  }

  return result;
};

/**
 * Convert IAST transliteration to Devanagari
 */
export const iastToDevanagari = (iast: string): string => {
  // This is a simplified version - a full implementation would be more complex
  const iastToDevanagariMap: Record<string, string> = {};
  for (const [dev, ia] of Object.entries(DEVANAGARI_TO_IAST)) {
    iastToDevanagariMap[ia] = dev;
  }

  let result = '';
  let i = 0;

  while (i < iast.length) {
    let foundMatch = false;

    // Try to match longest sequences first
    for (let len = 4; len > 0; len--) {
      const substring = iast.slice(i, i + len);
      if (iastToDevanagariMap[substring]) {
        result += iastToDevanagariMap[substring];
        i += len;
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      result += iast[i];
      i++;
    }
  }

  return result;
};

/**
 * Extract basic linguistic information from a word
 */
export const extractLinguisticInfo = (devanagari: string, transliteration: string): Partial<SanskritWordBreakdown> => {
  return {
    devanagari,
    transliteration: transliteration || devanagariToIAST(devanagari),
    syllables: segmentSyllables(devanagari),
    conjunctConsonants: identifyConjuncts(devanagari),
  };
};
