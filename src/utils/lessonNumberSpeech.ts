/**
 * Lesson-reader only: speak a numeral as a Sanskrit cardinal in Devanagari.
 *
 * hi-IN reads a Western or Devanagari digit as Hindi ("2" / "२" → "do").
 * Lessons therefore swap the digit for the number-word and keep the existing
 * Hindi voice. Numbers-guide tiles ("२ - द्वे"), Varṇamālā letters, and Bodhi
 * never call this.
 *
 * 0–10 use the cardinal stems (एक, द्वि, … दश). 11–100 use the site list
 * (SANSKRIT_NUMBERS_1_TO_100). Larger counts are spoken digit by digit so a
 * raw numeral never reaches the engine.
 */

import { SANSKRIT_NUMBERS_1_TO_100 } from '../data/sanskritNumbers';

/** Authentic Sanskrit cardinals: 0=शून्यम्, 1=एकम्, 2=द्वे, 3=त्रीणि, 4=चत्वारि, 5=पञ्च, 6=षट्, 7=सप्त, 8=अष्ट, 9=नव, 10=दश. */
const CARDINAL_0_TO_10 = [
  'शून्यम्',
  'एकम्',
  'द्वे',
  'त्रीणि',
  'चत्वारि',
  'पञ्च',
  'षट्',
  'सप्त',
  'अष्ट',
  'नव',
  'दश',
] as const;

/** Ordinal words for numbered exercise/question items (१., २., ३., 1., 2., 3.) */
const ORDINAL_1_TO_10: Record<number, string> = {
  1: 'प्रथमम्',
  2: 'द्वितीयम्',
  3: 'तृतीयम्',
  4: 'चतुर्थम्',
  5: 'पञ्चमम्',
  6: 'षष्ठम्',
  7: 'सप्तमम्',
  8: 'अष्टमम्',
  9: 'नवमम्',
  10: 'दशमम्',
};

const WORD_BY_VALUE = new Map<number, string>(
  SANSKRIT_NUMBERS_1_TO_100.map((item) => [item.value, item.word]),
);

const DEV_DIGITS = '०१२३४५६७८९';
const HAS_LETTER = /[\p{L}\p{M}]/u;

const integerFromDigits = (run: string): number | null => {
  let ascii = '';
  for (const ch of run) {
    if (ch >= '0' && ch <= '9') {
      ascii += ch;
      continue;
    }
    const idx = DEV_DIGITS.indexOf(ch);
    if (idx < 0) return null;
    ascii += String(idx);
  }
  if (!ascii || ascii.length > 15) return null;
  const n = Number(ascii);
  if (!Number.isSafeInteger(n) || n < 0) return null;
  return n;
};

/** One integer → Devanagari word(s). No Roman letters. */
export const cardinalForInteger = (n: number, isOrdinal = false): string[] => {
  if (!Number.isInteger(n) || n < 0) return [];
  if (isOrdinal && n >= 1 && n <= 10 && ORDINAL_1_TO_10[n]) {
    return [ORDINAL_1_TO_10[n]];
  }
  if (n <= 10) return [CARDINAL_0_TO_10[n]];
  const listed = WORD_BY_VALUE.get(n);
  if (listed) return [listed];
  return String(n)
    .split('')
    .map((digit) => CARDINAL_0_TO_10[Number(digit)]);
};

const DIGIT_RUN = /[0-9०-९]+/g;

/**
 * Replace every digit run in lesson text, including inside a sentence
 * ("एकः २", "The 12 Solar", "2.", "१."). Surrounding words stay. No raw digit
 * is left for hi-IN ("do") or an English voice ("two").
 * Numbered list items like "१." or "2." are pronounced as ordinals (प्रथमम्, द्वितीयम्).
 */
export const expandDigitsInLessonText = (text: string): string => {
  if (!text) return '';
  // Check if text is an ordinal item like "१." or "1." or "(१)"
  const trimmed = text.trim();
  const ordinalMatch = trimmed.match(/^[([]?([0-9०-९]+)[.।)\\]]?$/);
  if (ordinalMatch && (trimmed.includes('.') || trimmed.includes('।') || trimmed.startsWith('('))) {
    const n = integerFromDigits(ordinalMatch[1]);
    if (n !== null && n >= 1 && n <= 10) {
      return ORDINAL_1_TO_10[n];
    }
  }

  DIGIT_RUN.lastIndex = 0;
  if (!DIGIT_RUN.test(text)) return text;
  DIGIT_RUN.lastIndex = 0;
  const expanded = text.replace(DIGIT_RUN, (run, offset, fullStr) => {
    const n = integerFromDigits(run);
    if (n === null) return ' ';
    // If followed by dot or closing paren, treat 1-10 as ordinal
    const nextChar = fullStr[offset + run.length];
    const isOrdinal = (nextChar === '.' || nextChar === '।') && n >= 1 && n <= 10;
    const spoken = cardinalForInteger(n, isOrdinal);
    return spoken.length ? ` ${spoken.join(' ')} ` : ' ';
  });
  // Belt: a digit the parser could not read must not reach the engine.
  return expanded
    .replace(DIGIT_RUN, '')
    .replace(/[ \t]+([.,;:!?।॥)\]])/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
};

/**
 * If `raw` is only a numeral (or a punctuation-wrapped one, e.g. "२", "2.",
 * "१५-२१"), return the Devanagari cardinals to speak. Tokens that already
 * contain letters return null — use expandDigitsInLessonText for those.
 */
export const lessonNumberSpeechParts = (raw: string): string[] | null => {
  const trimmed = (raw || '').trim();
  if (!trimmed || HAS_LETTER.test(trimmed)) return null;
  if (!/[0-9०-९]/.test(trimmed)) return null;
  const expanded = expandDigitsInLessonText(trimmed);
  const parts = expanded.split(/\s+/).filter((part) => part && /[\u0900-\u097F]/.test(part));
  return parts.length ? parts : null;
};
