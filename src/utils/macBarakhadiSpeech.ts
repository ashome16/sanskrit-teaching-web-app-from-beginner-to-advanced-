/**
 * Mac-only बारहखड़ी (Barakhadi grid) pronunciation overrides.
 *
 * Scope (deliberately narrow):
 *  - macOS desktop only (Safari / Chrome on a Mac). Not Windows, not iPhone/iPad.
 *  - Only while the बारहखड़ी lesson is on screen (TextbookReader sets the context),
 *    so Varṇamālā single-letter tiles, conjunct tiles (क्ष ज्ञ त्र श्र), picture words
 *    and Bodhi's voice are untouched even though they share letters with the grid.
 *  - Only cells the user reported as wrong on Mac. Every other cell keeps the
 *    existing getGuninthaluSpeechText() output (plain Devanagari).
 *  - Voice is forced to a Hindi (hi-IN) voice: Lekha → Google हिन्दी → any hi-*.
 *    Pitch stays 1.0; rate comes from the normal configureUtterance() rules.
 *
 * Round 2 (after Mac listening of e511961):
 *  - ृ column (every consonant): plain Cृ AND the C्रि cue were both reported as
 *    very bad. New cue C्ऋ = consonant + halant + the independent vowel ऋ. Grounded
 *    in what already works on Mac: the Varṇamālā ऋ tile is spoken as plain "ऋ" by
 *    Lekha (and ॠकारः uses the same Devanagari hi-IN path), so C्ऋ asks the voice to
 *    say the consonant followed by that same proven ऋ sound, not a र-cluster.
 *  - ञ, ठ, थ rows: the न्य / C्+vowel cues were reported far worse, so these rows
 *    go back to plain Devanagari (exactly what the Varṇamālā ञ tile sends to Lekha).
 *  - ड row: reverted to plain Devanagari (possible "doggo" effect from ड्आ/ड्ओ);
 *    only डा → डाआ (vowel stretch, still avoids the डा. = डॉक्टर abbreviation) and
 *    डः → "ड ह" stay.
 *  - भी / भि: the split भ्ई / भ्इ was bad. भि → plain भि; भी → भीई (vowel stretch so
 *    Lekha does not read the Hindi function word भी "also" quickly and weakly).
 *
 * Round 3 (after Mac listening of 749acbd):
 *  - ृ column and ड row approved — unchanged.
 *  - ै / ौ: the split diphthong cues (C्आइ, C्आउ, याइ, णाउ) and the stretch डाआ gave
 *    "khai", "khau", "nauau", "dauauau". All ै/ौ overrides are now the plain syllable
 *    with a trailing danda (फै → फै।, यै → यै।, णौ → णौ।, ढौ → ढौ।); डा → डा। (danda ends
 *    the token so it is not the abbreviation डा. = डॉक्टर).
 *  - जु was read as "July" (Hindi abbreviation जु. = जुलाई) → ज्उ, same pattern as पु.
 *  - ठ / थ rows sounded like "ka". Checked the code: no path maps them to क — the grid
 *    sends exactly the same text ("ठ") and voice (Lekha, hi-IN) as the Varṇamālā tile.
 *    It is Lekha's reading of the lone syllable, so these rows now get a trailing
 *    danda (ठ → ठ।, ठा → ठा। …, ठं → ठम्।, ठः → ठह।) to make each cell a complete
 *    utterance rather than a bare glyph.
 *
 * Cell → cue table (current)
 * ----------------------------------------------------------------------------
 *  ृ column, all 33 consonants:  Cृ → C्ऋ   (ङृ → ङ्ग्ऋ to match the ङ्ग row cues)
 *  Individually reported cells
 *   ङ  → ङ्ग     ङं → ङ्गम्    ङः → ङ्ग ह
 *   छः → छ ह     टः → ट ह      तः → त ह      पः → प ह      डः → ड ह
 *   णौ → णौ।    ढौ → ढौ।      यै → यै।      रै → रै।
 *   ल  → ल्अ     लि → ल्इ      मी → म्ई      जू → ज्ऊ      पु → प्उ      जु → ज्उ
 *   डा → डा।
 *   भी → भीई    भि → भि (plain)
 *  Whole rows still overridden: फ भ ष  (C = row consonant)
 *   C  → C्अ    Cा → C्आ    Cु → C्उ    Cू → C्ऊ    Cे → C्ए    Cै → Cै।
 *   Cो → C्ओ   Cौ → Cौ।   Cं → C्अम्   Cः → "C ह"
 *   Cि → C्इ / Cी → C्ई  (फ, ष only; भ uses the entries above)
 *  ठ थ rows: plain syllable + "।" (ठं → ठम्।, ठः → ठह।).
 *  Plain Devanagari (no override except ृ): ञ ड rows (except डा, डः).
 * ----------------------------------------------------------------------------
 */

/** Rows whose "rest are fine" C्+vowel cues are kept on Mac. */
const MAC_WHOLE_ROWS = ['फ', 'भ', 'ष'];

const buildRow = (c: string): Record<string, string> => {
  const h = `${c}्`;
  return {
    [c]: `${h}अ`,
    [`${c}ा`]: `${h}आ`,
    [`${c}ि`]: `${h}इ`,
    [`${c}ी`]: `${h}ई`,
    [`${c}ु`]: `${h}उ`,
    [`${c}ू`]: `${h}ऊ`,
    [`${c}े`]: `${h}ए`,
    [`${c}ै`]: `${c}ै।`,
    [`${c}ो`]: `${h}ओ`,
    [`${c}ौ`]: `${c}ौ।`,
    [`${c}ं`]: `${h}अम्`,
    [`${c}ः`]: `${c} ह`,
  };
};

/** Plain Devanagari syllable + "।" for every cell of a row (visarga keeps the default echo C+ह). */
const dandaRow = (c: string): Record<string, string> => ({
  [c]: `${c}।`,
  [`${c}ा`]: `${c}ा।`,
  [`${c}ि`]: `${c}ि।`,
  [`${c}ी`]: `${c}ी।`,
  [`${c}ु`]: `${c}ु।`,
  [`${c}ू`]: `${c}ू।`,
  [`${c}े`]: `${c}े।`,
  [`${c}ै`]: `${c}ै।`,
  [`${c}ो`]: `${c}ो।`,
  [`${c}ौ`]: `${c}ौ।`,
  [`${c}ं`]: `${c}म्।`,
  [`${c}ः`]: `${c}ह।`,
});

const ALL_CONSONANTS = 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह'.split(' ');

/** ृ column: C्ऋ (reuses the Mac-proven Varṇamālā ऋ sound). */
const RI_COLUMN: Record<string, string> = Object.fromEntries(
  ALL_CONSONANTS.map((c) => [`${c}ृ`, c === 'ङ' ? 'ङ्ग्ऋ' : `${c}्ऋ`]),
);

const MAC_BARAKHADI_CUES: Record<string, string> = {
  // Whole rows kept from round 1 (फ भ ष)
  ...Object.assign({}, ...MAC_WHOLE_ROWS.map(buildRow)),
  // Individually reported cells
  'ङ': 'ङ्ग',
  'ङं': 'ङ्गम्',
  'ङः': 'ङ्ग ह',
  'छः': 'छ ह',
  'टः': 'ट ह',
  'तः': 'त ह',
  'पः': 'प ह',
  'डः': 'ड ह',
  'डा': 'डा।',
  'णौ': 'णौ।',
  'ढौ': 'ढौ।',
  'यै': 'यै।',
  'रै': 'रै।',
  'जु': 'ज्उ',
  'ल': 'ल्अ',
  'लि': 'ल्इ',
  'मी': 'म्ई',
  'जू': 'ज्ऊ',
  'पु': 'प्उ',
  // भ row: split vowel failed for these two
  'भी': 'भीई',
  'भि': 'भि',
  // ठ / थ rows: plain syllable + trailing danda (ृ column below still wins)
  ...Object.assign({}, ...['ठ', 'थ'].map(dandaRow)),
  // ृ column for every consonant (overrides any row entry)
  ...RI_COLUMN,
};

let barakhadiContextActive = false;

/** TextbookReader turns this on while the बारहखड़ी lesson is shown. */
export const setBarakhadiSpeechContext = (active: boolean): void => {
  barakhadiContextActive = active;
};

/** macOS desktop only — excludes Windows, iPhone, and iPadOS (which reports "Macintosh"). */
export const isMacDesktopPlatform = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (!/Macintosh|Mac OS X/i.test(ua)) return false;
  if (/iPhone|iPad|iPod|Windows/i.test(ua)) return false;
  // iPadOS Safari masquerades as a Mac; real Macs have no multi-touch screen.
  if (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1) return false;
  return true;
};

/** Mac + बारहखड़ी lesson + reported cell → cue text; otherwise null (no change). */
export const macBarakhadiCue = (word: string): string | null => {
  if (!barakhadiContextActive || !isMacDesktopPlatform()) return null;
  const clean = word.normalize('NFC').trim();
  return MAC_BARAKHADI_CUES[clean] ?? null;
};

const macHindiScore = (v: SpeechSynthesisVoice): number => {
  const lang = (v.lang || '').toLowerCase().replace('_', '-');
  const name = v.name || '';
  if (!lang.startsWith('hi')) return 0;
  let score = lang === 'hi-in' ? 50 : 30;
  if (/lekha/i.test(name)) score += 60;
  else if (/google/i.test(name) && /हिन्दी|hindi/i.test(name)) score += 40;
  else if (/kiran|neel/i.test(name)) score += 30;
  if (v.localService) score += 5;
  return score;
};

/** Hindi voice for the Mac overrides: saved Hindi reader voice, else Lekha → Google हिन्दी → any hi-*. */
export const pickMacBarakhadiVoice = (
  voices: SpeechSynthesisVoice[],
  preferred?: SpeechSynthesisVoice,
): SpeechSynthesisVoice | undefined => {
  if (preferred && (preferred.lang || '').toLowerCase().startsWith('hi')) return preferred;
  let best: SpeechSynthesisVoice | undefined;
  let bestScore = 0;
  for (const v of voices) {
    const s = macHindiScore(v);
    if (s > bestScore) {
      best = v;
      bestScore = s;
    }
  }
  return best;
};

/** Exposed for tests / debugging. */
export const MAC_BARAKHADI_CUE_TABLE: Readonly<Record<string, string>> = MAC_BARAKHADI_CUES;
