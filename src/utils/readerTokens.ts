import { hasDevanagariLetter, isDandaOrVerseNumberToken } from './dandaSpeech';

/**
 * Lesson reader tokens: the words of a paragraph in the order they are read.
 *
 * Many lessons carry a `words` list that is a vocabulary list, not the
 * sentence. It drops small words (इति, च, न, एव, अपि, अस्ति …) and repeats.
 * When the reader showed and spoke that list, those words were skipped.
 * For a Sanskrit reading passage, the words come from `sanskrit` itself.
 * Hindi भावार्थ cards and exercise grids keep their curated `words` list.
 */

type ReaderSentence = { sanskrit?: string; words?: string[] };

const HINDI_MARKERS = new Set([
  'है', 'हैं', 'में', 'और', 'का', 'की', 'के', 'से', 'को', 'नहीं', 'होता', 'होती', 'होते',
  'था', 'थी', 'थे', 'भी', 'जो', 'वह', 'यह', 'वे', 'करता', 'करती', 'करना', 'हुआ', 'गया',
]);

const PUNCT = /[\s।॥,;:!?()[\]{}<>'"“”‘’\-–—….·/\\]+/g;
const bare = (token: string): string => token.replace(PUNCT, '');

const splitTokens = (text: string): string[] => (text || '').split(/\s+/).filter(Boolean);

/** Comparable word sequence (letters only, no punctuation or numbers). */
const wordSequence = (tokens: string[]): string[] =>
  tokens.flatMap((token) => token.split(/[-–—]/)).map(bare).filter((token) => hasDevanagariLetter(token));

/**
 * A Sanskrit reading passage: Devanagari text with no Hindi sentence words,
 * no exercise bullets, and Latin only inside brackets, e.g. "घनः (Solid)".
 */
export const isReadingPassage = (sanskrit: string | undefined): boolean => {
  const text = sanskrit || '';
  if (!hasDevanagariLetter(text)) return false;
  if (/[•[\]➔]/.test(text)) return false;
  if (/[A-Za-z]/.test(text.replace(/\([^)]*\)/g, ' '))) return false;
  return !splitTokens(text).some((token) => HINDI_MARKERS.has(bare(token)));
};

/** Display tokens for a lesson paragraph, in reading order. */
export const readerTokens = (sentence: ReaderSentence): string[] => {
  const words = sentence.words ?? [];
  const sanskrit = sentence.sanskrit || '';
  if (!isReadingPassage(sanskrit)) return words.length ? words : splitTokens(sanskrit);
  const fromText = splitTokens(sanskrit);
  if (!words.length) return fromText;
  // Keep `words` when it already is the sentence, word for word.
  const a = wordSequence(fromText);
  const b = wordSequence(words);
  const same = a.length === b.length && a.every((word, i) => word === b[i]);
  return same ? words : fromText;
};

/**
 * A token the reader speaks. Daṇḍas, verse numbers, dashes, list numbers
 * ("१.", "(२)") and English glosses ("(Solid),") are shown but not spoken.
 */
export const isSpokenReaderToken = (token: string): boolean => {
  if (!token || isDandaOrVerseNumberToken(token)) return false;
  if (hasDevanagariLetter(token)) return true;
  return /^[०-९]+$/.test(token.replace(/[,;:!?—–\-…]/g, ''));
};

export type ReaderSpeechItem = { text: string; tokenIndex: number };

/** Spoken items with the display index of each, so highlight follows the voice. */
export const readerSpeechItems = (tokens: string[]): ReaderSpeechItem[] =>
  tokens
    .map((text, tokenIndex) => ({ text, tokenIndex }))
    .filter((item) => isSpokenReaderToken(item.text));
