/**
 * High-Performance Sanskrit Transliteration & Devanagari Typing Engine
 * Supports phonetic Roman input (ITRANS / Harvard-Kyoto style), Devanagari conversion,
 * consonant clusters, matras, halant, anusvara, visarga, and smart answer grading.
 */

// 1. Standalone Vowels (स्वर)
const INDEPENDENT_VOWELS: [string, string][] = [
  ['aum', 'ॐ'],
  ['om', 'ॐ'],
  ['aM', 'अं'],
  ['am', 'अं'],
  ['aH', 'अः'],
  ['ah', 'अः'],
  ['aa', 'आ'],
  ['A', 'आ'],
  ['ii', 'ई'],
  ['ee', 'ई'],
  ['I', 'ई'],
  ['uu', 'ऊ'],
  ['oo', 'ऊ'],
  ['U', 'ऊ'],
  ['R^i', 'ऋ'],
  ['R^I', 'ॠ'],
  ['ri', 'ऋ'],
  ['rI', 'ॠ'],
  ['R', 'ऋ'],
  ['ai', 'ऐ'],
  ['au', 'औ'],
  ['a', 'अ'],
  ['i', 'इ'],
  ['u', 'उ'],
  ['e', 'ए'],
  ['o', 'ओ'],
];

// 2. Dependent Vowel Signs (मात्रा)
const VOWEL_MATRAS: [string, string][] = [
  ['aa', 'ा'],
  ['A', 'ा'],
  ['ii', 'ी'],
  ['ee', 'ी'],
  ['I', 'ी'],
  ['uu', 'ू'],
  ['oo', 'ू'],
  ['U', 'ू'],
  ['R^i', 'ृ'],
  ['R^I', 'ॄ'],
  ['ri', 'ृ'],
  ['rI', 'ॄ'],
  ['R', 'ृ'],
  ['ai', 'ै'],
  ['au', 'ौ'],
  ['e', 'े'],
  ['o', 'ो'],
  ['i', 'ि'],
  ['u', 'ु'],
  ['a', ''], // Implicit 'a' removes virama
];

// 3. Consonants with Virama (व्यञ्जन) sorted longest-first
const CONSONANTS: [string, string][] = [
  // Compound conjuncts
  ['kSh', 'क्ष्'],
  ['ksh', 'क्ष्'],
  ['x', 'क्ष्'],
  ['j~n', 'ज्ञ्'],
  ['gy', 'ज्ञ्'],
  ['dny', 'ज्ञ्'],
  ['shr', 'श्र्'],
  ['tr', 'त्र्'],

  // Aspirated & Velar / Palatal / Retroflex / Dental / Labial
  ['kh', 'ख्'],
  ['gh', 'घ्'],
  ['N^', 'ङ्'],
  ['ng', 'ङ्'],
  ['chh', 'छ्'],
  ['Ch', 'छ्'],
  ['ch', 'च्'],
  ['c', 'च्'],
  ['jh', 'झ्'],
  ['~n', 'ञ्'],
  ['ny', 'ञ्'],
  ['Th', 'ठ्'],
  ['t.h', 'ठ्'],
  ['Dh', 'ढ्'],
  ['d.h', 'ढ्'],
  ['shh', 'ष्'],
  ['Sh', 'ष्'],
  ['s.', 'ष्'],
  ['th', 'थ्'],
  ['dh', 'ध्'],
  ['ph', 'फ्'],
  ['bh', 'भ्'],
  ['sh', 'श्'],

  // Retroflex single
  ['T', 'ट्'],
  ['t.', 'ट्'],
  ['D', 'ड्'],
  ['d.', 'ड्'],
  ['N', 'ण्'],
  ['n.', 'ण्'],

  // Basic single consonants
  ['k', 'क्'],
  ['g', 'ग्'],
  ['j', 'ज्'],
  ['t', 'त्'],
  ['d', 'द्'],
  ['n', 'न्'],
  ['p', 'प्'],
  ['f', 'फ्'],
  ['b', 'ब्'],
  ['m', 'म्'],
  ['y', 'य्'],
  ['r', 'र्'],
  ['l', 'ल्'],
  ['v', 'व्'],
  ['w', 'व्'],
  ['s', 'स्'],
  ['h', 'ह्'],
];

// 4. Diacritics & Signs
const SPECIAL_SIGNS: [string, string][] = [
  ['||', '॥'],
  ['|', '।'],
  ['..', '॥'],
  ['.', '।'],
  ['M', 'ं'],
  ['H', 'ः'],
  ['~', 'ँ'],
  ['\'', 'ऽ'], // Avagraha
];

// 5. Devanagari Digits
const DIGITS_MAP: Record<string, string> = {
  '0': '०',
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९',
};

/**
 * Converts phonetic Roman text (English keyboard) to authentic Sanskrit Devanagari.
 * Example:
 *  "namaste" -> "नमस्ते"
 *  "aham vidyaalayam gacchaami" -> "अहम् विद्यालयम् गच्छामि"
 *  "raamaH satyam vadati" -> "रामः सत्यम् वदति"
 */
export function transliterateToDevanagari(input: string): string {
  if (!input) return '';

  let out = '';
  let i = 0;
  const len = input.length;

  while (i < len) {
    const ch = input[i];

    // Preserve existing Devanagari characters unchanged
    if (ch >= '\u0900' && ch <= '\u097F') {
      out += ch;
      i++;
      continue;
    }

    // Preserve whitespace, brackets, commas, quotes
    if (/[ \t\n\r,;?!"()[\]{}<>=+*#@&_%-]/.test(ch)) {
      out += ch;
      i++;
      continue;
    }

    // Special signs (danda, anusvara, visarga, avagraha)
    let matchedSpecial = false;
    for (const [key, dev] of SPECIAL_SIGNS) {
      if (input.startsWith(key, i)) {
        out += dev;
        i += key.length;
        matchedSpecial = true;
        break;
      }
    }
    if (matchedSpecial) continue;

    // Digits
    if (DIGITS_MAP[ch]) {
      out += DIGITS_MAP[ch];
      i++;
      continue;
    }

    // Check if the current position starts with a Consonant
    let matchedConsonant: { eng: string; dev: string } | null = null;
    for (const [eng, dev] of CONSONANTS) {
      if (input.startsWith(eng, i)) {
        matchedConsonant = { eng, dev };
        break;
      }
    }

    if (matchedConsonant) {
      i += matchedConsonant.eng.length;
      let consonantBase = matchedConsonant.dev; // e.g. "क्"

      // Check if immediately followed by a vowel matra
      let matchedMatra: { eng: string; dev: string } | null = null;
      for (const [vEng, vMatra] of VOWEL_MATRAS) {
        if (input.startsWith(vEng, i)) {
          matchedMatra = { eng: vEng, dev: vMatra };
          break;
        }
      }

      if (matchedMatra) {
        i += matchedMatra.eng.length;
        // Strip virama (्) from the consonant
        const bareConsonant = consonantBase.replace(/्$/, '');
        out += bareConsonant + matchedMatra.dev;

        // Check if immediately followed by Anusvara (m / M) or Visarga (h / H)
        if (input.startsWith('M', i) || input.startsWith('m', i) && (i + 1 >= len || /[^a-zA-Z]/.test(input[i + 1]))) {
          out += 'ं';
          i++;
        } else if (input.startsWith('H', i) || input.startsWith('h', i) && (i + 1 >= len || /[^a-zA-Z]/.test(input[i + 1]))) {
          out += 'ः';
          i++;
        }
      } else {
        // No vowel immediately follows -> retain virama (half-consonant for conjuncts)
        out += consonantBase;
      }
      continue;
    }

    // Check if starts with an Independent Vowel
    let matchedVowel = false;
    for (const [vEng, vDev] of INDEPENDENT_VOWELS) {
      if (input.startsWith(vEng, i)) {
        out += vDev;
        i += vEng.length;
        matchedVowel = true;
        break;
      }
    }
    if (matchedVowel) continue;

    // Fallback: character unrecognized by Sanskrit mapping (e.g. punctuation, unsupported symbols)
    out += ch;
    i++;
  }

  return out;
}

/**
 * Checks if a string contains any Devanagari character.
 */
export function hasDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

/**
 * Normalizes Sanskrit text for grading: removes diacritics, extra spaces, danda, and punctuation.
 */
export function normalizeSanskritAnswer(text: string): string {
  if (!text) return '';
  return text
    .replace(/[।॥,;:\-–—\s!?()[\]{}<>'"०-९./\\=+#*~_`]+/g, '')
    .trim()
    .toLowerCase();
}

/**
 * Calculates string similarity using Levenshtein distance.
 */
export function calculateSanskritSimilarity(str1: string, str2: string): number {
  const s1 = normalizeSanskritAnswer(str1);
  const s2 = normalizeSanskritAnswer(str2);

  if (s1 === s2) return 100;
  if (!s1 || !s2) return 0;

  const len1 = s1.length;
  const len2 = s2.length;
  const matrix: number[][] = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);
  const similarity = Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));
  return similarity;
}

/**
 * Evaluates a user's typed Sanskrit answer against the expected answer.
 */
export function evaluateSanskritAnswer(
  userAnswer: string,
  expectedAnswer: string
): {
  isMatch: boolean;
  similarityPct: number;
  feedback: string;
} {
  const normUser = normalizeSanskritAnswer(userAnswer);
  const normExpected = normalizeSanskritAnswer(expectedAnswer);

  if (!normUser) {
    return {
      isMatch: false,
      similarityPct: 0,
      feedback: 'कृपया उत्तरं लिखतु (Please type your answer).',
    };
  }

  // Exact match
  if (normUser === normExpected) {
    return {
      isMatch: true,
      similarityPct: 100,
      feedback: '✓ सम्यक्! अति उत्तमम् (Accurate & Correct)!',
    };
  }

  // Check if expected answer contains multiple slash-separated accepted variants
  const variants = expectedAnswer.split(/[/,;]/).map((v) => normalizeSanskritAnswer(v));
  if (variants.some((v) => v === normUser)) {
    return {
      isMatch: true,
      similarityPct: 100,
      feedback: '✓ सम्यक्! (Accepted variant match)!',
    };
  }

  // Compute similarity
  const similarity = calculateSanskritSimilarity(userAnswer, expectedAnswer);
  if (similarity >= 85) {
    return {
      isMatch: true,
      similarityPct: similarity,
      feedback: `✓ साधु! Near-perfect (${similarity}% match). Check minor matra/visarga spelling.`,
    };
  }

  if (similarity >= 60) {
    return {
      isMatch: false,
      similarityPct: similarity,
      feedback: `अभ्यासः आवश्यकः (${similarity}% match). You are close! Double-check spelling.`,
    };
  }

  return {
    isMatch: false,
    similarityPct: similarity,
    feedback: `अशुद्धम् (${similarity}% match). Expected: "${expectedAnswer}".`,
  };
}

/**
 * Full Sanskrit Keyboard layout keys categorized for virtual keyboard UI
 */
export interface SanskritKeyboardCategory {
  id: string;
  label: string;
  labelEn: string;
  keys: string[];
}

export const SANSKRIT_KEYBOARD_LAYOUT: SanskritKeyboardCategory[] = [
  {
    id: 'swara',
    label: 'स्वराः',
    labelEn: 'Vowels',
    keys: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
  },
  {
    id: 'matra',
    label: 'मात्राः & चिह्नानि',
    labelEn: 'Vowel Signs & Marks',
    keys: ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ', 'ऽ', '।', '॥'],
  },
  {
    id: 'vyanjana_k',
    label: 'क & च वर्ग',
    labelEn: 'Velar & Palatal',
    keys: ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ'],
  },
  {
    id: 'vyanjana_t',
    label: 'ट & त वर्ग',
    labelEn: 'Retroflex & Dental',
    keys: ['ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न'],
  },
  {
    id: 'vyanjana_p',
    label: 'प, अन्तःस्था & ऊष्म',
    labelEn: 'Labial, Semi-vowels & Sibilants',
    keys: ['प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],
  },
  {
    id: 'samyukta',
    label: 'संयुक्तानि',
    labelEn: 'Conjuncts',
    keys: ['क्ष', 'त्र', 'ज्ञ', 'श्र', 'द्य', 'द्व', 'द्ध', 'त्त', 'न्न', 'ह्म'],
  },
  {
    id: 'anka',
    label: 'अङ्काः',
    labelEn: 'Vedic Digits',
    keys: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  },
];

/**
 * Common Sanskrit Quick Words & Phrases for Instant Insertion
 */
export const SANSKRIT_QUICK_PHRASES = [
  { dev: 'नमस्ते', en: 'Namaste (Greetings)' },
  { dev: 'धन्यवादः', en: 'Dhanyavādah (Thank you)' },
  { dev: 'आम्', en: 'Ām (Yes)' },
  { dev: 'न', en: 'Na (No)' },
  { dev: 'अहम्', en: 'Aham (I am)' },
  { dev: 'त्वम्', en: 'Tvam (You)' },
  { dev: 'गच्छति', en: 'Gacchati (Goes)' },
  { dev: 'पठति', en: 'Paṭhati (Reads)' },
  { dev: 'सत्यम्', en: 'Satyam (Truth)' },
  { dev: 'विद्या', en: 'Vidyā (Knowledge)' },
  { dev: 'सुप्रभातम्', en: 'Suprabhātam (Good morning)' },
  { dev: 'ॐ', en: 'Om' },
];
