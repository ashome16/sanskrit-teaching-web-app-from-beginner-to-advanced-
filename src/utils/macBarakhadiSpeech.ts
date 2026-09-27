/**
 * Mac-only बारहखड़ी (Barakhadi grid) pronunciation overrides.
 *
 * Scope (deliberately narrow):
 *  - macOS desktop only (Safari / Chrome on a Mac). Not Windows, not iPhone/iPad.
 *  - Only while the बारहखड़ी lesson is on screen (TextbookReader sets the context),
 *    so Varṇamālā single-letter tiles, conjunct tiles (क्ष ज्ञ त्र श्र), picture words
 *    and Bodhi's voice are untouched even though they share letters with the grid.
 *  - Only the cells the user reported as wrong on Mac. Every other cell keeps the
 *    existing getGuninthaluSpeechText() output.
 *  - Voice is forced to a Hindi (hi-IN) voice: Lekha → Google हिन्दी → any hi-*.
 *    Pitch stays 1.0; rate comes from the normal configureUtterance() rules.
 *
 * Why these cues (Lekha / Google हिन्दी are *Hindi* text-to-speech engines):
 *  1. Lone syllables that are also Hindi words or abbreviations get read as the word:
 *     डा. = डॉक्टर ("doctor"), मी. = मीटर ("meter"), लि. = लिमिटेड ("limited"),
 *     जू. = जून/जूनियर, पु. = पुल्लिंग; and old visarga echoes छह = "six", तह = "fold".
 *     Fix: write the syllable as consonant + halant + independent vowel (म्ई = m + ī).
 *     It sounds the same but no longer matches a dictionary word/abbreviation, and the
 *     explicit vowel stops Hindi schwa-deletion from clipping bare cells (ल → "l").
 *  2. Visarga (ः): spaced echo "C ह" (same idea as the Windows picture-word fix, e.g.
 *     एणः → "एण ह"), so the engine says "ta … ha" rather than a Hindi word.
 *  3. ऋ-matra (ृ): spelled with र + ि (तृ → त्रि) — Hindi voices garble lone C+ृ.
 *  4. ऐ / औ in the reported cells: Sanskrit diphthongs "ai" / "au" (याइ, णाउ), matching
 *     the earlier approved Mac cues yaai / gaau. Hindi voices say ɛ / ɔ for ै / ौ.
 *  5. ङ row base cells follow the already-accepted ङा → ङ्गा pattern (ङ → ङ्ग).
 *  6. ञ row: Hindi voices barely know ञ, so it is voiced as palatal "nya" (न्य).
 *
 * Cell → cue table
 * ----------------------------------------------------------------------------
 *  Individually reported cells
 *   ङ  → ङ्ग     ङं → ङ्गम्    ङः → ङ्ग ह
 *   छः → छ ह     टः → ट ह      तः → त ह      पः → प ह
 *   णृ → ण्रि    तृ → त्रि      नृ → न्रि      मृ → म्रि      जृ → ज्रि
 *   णौ → णाउ    यै → याइ      रै → राइ
 *   ल  → ल्अ     लि → ल्इ      मी → म्ई      जू → ज्ऊ      पु → प्उ
 *  Whole rows reported wrong: ञ ठ ड थ फ भ ष  (C = row consonant; ञ uses न्य)
 *   C  → C्अ    Cा → C्आ    Cि → C्इ    Cी → C्ई    Cु → C्उ    Cू → C्ऊ
 *   Cृ → C्रि   Cे → C्ए    Cै → C्आइ   Cो → C्ओ   Cौ → C्आउ
 *   Cं → C्अम्  Cः → "C ह"
 *   ञ row: ञ→न्य ञा→न्या ञि→न्यि ञी→न्यी ञु→न्यु ञू→न्यू ञृ→न्य्रि ञे→न्ये
 *          ञै→न्याइ ञो→न्यो ञौ→न्याउ ञं→न्यम् ञः→"न्य ह"
 *   (डा and डः are in the ड row: ड्आ and "ड ह".)
 * ----------------------------------------------------------------------------
 */

/** Rows the user reported as wrong in all cells on Mac. */
const MAC_WHOLE_ROWS = ['ञ', 'ठ', 'ड', 'थ', 'फ', 'भ', 'ष'];

const buildRow = (letter: string): Record<string, string> => {
  if (letter === 'ञ') {
    const s = 'न्य';
    return {
      'ञ': s, 'ञा': `${s}ा`, 'ञि': `${s}ि`, 'ञी': `${s}ी`, 'ञु': `${s}ु`, 'ञू': `${s}ू`,
      'ञृ': `${s}्रि`, 'ञे': `${s}े`, 'ञै': `${s}ाइ`, 'ञो': `${s}ो`, 'ञौ': `${s}ाउ`,
      'ञं': `${s}म्`, 'ञः': `${s} ह`,
    };
  }
  const c = letter;
  const h = `${c}्`;
  return {
    [c]: `${h}अ`,
    [`${c}ा`]: `${h}आ`,
    [`${c}ि`]: `${h}इ`,
    [`${c}ी`]: `${h}ई`,
    [`${c}ु`]: `${h}उ`,
    [`${c}ू`]: `${h}ऊ`,
    [`${c}ृ`]: `${h}रि`,
    [`${c}े`]: `${h}ए`,
    [`${c}ै`]: `${h}आइ`,
    [`${c}ो`]: `${h}ओ`,
    [`${c}ौ`]: `${h}आउ`,
    [`${c}ं`]: `${h}अम्`,
    [`${c}ः`]: `${c} ह`,
  };
};

const MAC_BARAKHADI_CUES: Record<string, string> = {
  // Individually reported cells
  'ङ': 'ङ्ग',
  'ङं': 'ङ्गम्',
  'ङः': 'ङ्ग ह',
  'छः': 'छ ह',
  'टः': 'ट ह',
  'तः': 'त ह',
  'पः': 'प ह',
  'णृ': 'ण्रि',
  'तृ': 'त्रि',
  'नृ': 'न्रि',
  'मृ': 'म्रि',
  'जृ': 'ज्रि',
  'णौ': 'णाउ',
  'यै': 'याइ',
  'रै': 'राइ',
  'ल': 'ल्अ',
  'लि': 'ल्इ',
  'मी': 'म्ई',
  'जू': 'ज्ऊ',
  'पु': 'प्उ',
  // Whole rows (includes डा → ड्आ and डः → "ड ह")
  ...Object.assign({}, ...MAC_WHOLE_ROWS.map(buildRow)),
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
