/**
 * Daṇḍa (।) and double daṇḍa (॥) are punctuation, not words.
 *
 * Browser hi-IN voices read a bare "।" / "॥" aloud ("poorn viraam", "danda",
 * "double danda"), and lesson word lists often carry them as standalone
 * tokens (plus verse numbers such as "॥ १ ॥"). These helpers keep the marks in
 * the displayed text but out of speech, word chips and word analysis.
 */

/** Devanagari letters / signs only — excludes । ॥ (U+0964/5), digits ०-९ and ॰. */
const DEVANAGARI_LETTER = /[\u0900-\u0963\u0971-\u097F\uA8E0-\uA8FF]/;

/** True when a token contains at least one real Devanagari letter. */
export const hasDevanagariLetter = (value: string): boolean => DEVANAGARI_LETTER.test(value || '');

/** Token is only daṇḍa / double daṇḍa / verse number / punctuation (e.g. "।", "॥", "॥१॥", "१।"). */
export const isDandaOrVerseNumberToken = (value: string): boolean => {
  const trimmed = (value || '').trim();
  if (!trimmed) return false;
  // No letters/vowel signs of any script (\p{L}\p{M}); । ॥ are \p{P}, digits \p{Nd}.
  return !/[\p{L}\p{M}]/u.test(trimmed) && /[।॥|]/.test(trimmed);
};

/**
 * Remove daṇḍa marks (and verse numbers enclosed by / attached to them) from
 * text that will be spoken. Each mark becomes a comma so voices still take a
 * short breath without saying a word. ASCII "|" / "||" used as daṇḍa in
 * transliteration lines are handled the same way.
 */
export const stripDandaForSpeech = (text: string): string =>
  (text || '')
    // Verse numbers between/after daṇḍas: "॥ १ ॥", "॥१॥", "।। 12 ।।", "|| 1 ||"
    .replace(/(?:[।॥]+|\|\|)\s*[०-९0-9]+(?:\s*[.\-–]\s*[०-९0-9]+)*\s*(?:[।॥]+|\|\|)?/g, ', ')
    .replace(/[।॥|]+/g, ', ')
    .replace(/\s*,(\s*,)+/g, ',')
    .replace(/\s+,/g, ',')
    .replace(/^[\s,]+|[\s,]+$/g, '')
    .replace(/\s{2,}/g, ' ');
