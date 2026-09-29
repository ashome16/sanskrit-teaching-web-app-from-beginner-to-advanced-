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

/** Cardinal stems. 1–10 are एक द्वि त्रि चतुर् … not the neuter एकम् / द्वे forms. */
const CARDINAL_0_TO_10 = [
  'शून्यम्',
  'एक',
  'द्वि',
  'त्रि',
  'चतुर्',
  'पञ्च',
  'षट्',
  'सप्त',
  'अष्ट',
  'नव',
  'दश',
] as const;

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
export const cardinalForInteger = (n: number): string[] => {
  if (!Number.isInteger(n) || n < 0) return [];
  if (n <= 10) return [CARDINAL_0_TO_10[n]];
  const listed = WORD_BY_VALUE.get(n);
  if (listed) return [listed];
  return String(n)
    .split('')
    .map((digit) => CARDINAL_0_TO_10[Number(digit)]);
};

/**
 * If `raw` is only a numeral (or a punctuation-wrapped one, e.g. "२", "2.",
 * "१५-२१"), return the Devanagari cardinals to speak. Tokens that already
 * contain letters (number-guide labels, ordinary words) return null.
 */
export const lessonNumberSpeechParts = (raw: string): string[] | null => {
  const trimmed = (raw || '').trim();
  if (!trimmed || HAS_LETTER.test(trimmed)) return null;
  if (!/[0-9०-९]/.test(trimmed)) return null;
  const runs = trimmed.match(/[0-9०-९]+/g);
  if (!runs?.length) return null;
  const parts: string[] = [];
  for (const run of runs) {
    const n = integerFromDigits(run);
    if (n === null) return null;
    const spoken = cardinalForInteger(n);
    if (!spoken.length) return null;
    parts.push(...spoken);
  }
  return parts;
};
