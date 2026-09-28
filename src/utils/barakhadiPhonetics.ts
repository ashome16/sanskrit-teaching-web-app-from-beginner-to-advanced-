/**
 * बारहखड़ी (Guṇintālu / Guṇitākṣarālu) romanization for on-tile labels and speech hints.
 * Similar-looking consonants get distinct spellings so learners can tell them apart visually,
 * while speech synthesis receives authentic Devanagari phonetic representations for Indian TTS voices.
 */
export const CONSONANT_STEM: Record<string, string> = {
  क: 'k', ख: 'kh', ग: 'g', घ: 'gh', ङ: 'ng',
  च: 'ch', छ: 'chh', ज: 'j', झ: 'jh', ञ: 'ny',
  ट: 'tt', ठ: 'tth', ड: 'dd', ढ: 'ddh', ण: 'nn',
  त: 't', थ: 'th', द: 'd', ध: 'dh', न: 'n',
  प: 'p', फ: 'ph', ब: 'b', भ: 'bh', म: 'm',
  य: 'y', र: 'r', ल: 'l', व: 'v',
  श: 'sh', ष: 'shh', स: 's', ह: 'h',
};

/** Matra → vowel ending (school-style: aa, ee, oo). */
export const MATRA_VOWEL: Record<string, string> = {
  '': 'a',
  'ा': 'aa',
  'ि': 'i',
  'ी': 'ee',
  'ु': 'u',
  'ू': 'oo',
  'ृ': 'ri',
  'ॄ': 'rii',
  'े': 'e',
  'ै': 'ai',
  'ो': 'o',
  'ौ': 'au',
  'ं': 'am',
  'ः': 'ah',
};

const INDEPENDENT_VOWELS: Record<string, string> = {
  अ: 'a', आ: 'aa', इ: 'i', ई: 'ee', उ: 'u', ऊ: 'oo',
  ऋ: 'ri', ॠ: 'rī', ऌ: 'li', ए: 'e', ऐ: 'ai', ओ: 'o', औ: 'au',
  अं: 'am', अः: 'ah', अँ: 'an',
};

/** Varnamala conjunct tiles */
const CONJUNCTS: Record<string, string> = {
  क्ष: 'ksha',
  ज्ञ: 'jnya',
  त्र: 'tra',
  श्र: 'shra',
};

export const barakhadiLabel = (akshara: string): string => {
  const clean = akshara.normalize('NFC').trim();
  if (!clean) return '';
  // Explicit diphthong labels: kids see/hear gaau / ghaai (not gau / ghai).
  if (clean === 'गौ') return 'gaau';
  if (clean === 'घै') return 'ghaai';
  if (INDEPENDENT_VOWELS[clean]) return INDEPENDENT_VOWELS[clean];
  if (CONJUNCTS[clean]) return CONJUNCTS[clean];

  const cons = clean[0];
  const stem = CONSONANT_STEM[cons];
  if (!stem) return clean;

  const rest = clean.slice(1);
  if (!rest) return `${stem}a`;
  if (rest === 'ं') return `${stem}am`;
  if (rest === 'ः') return `${stem}ah`;
  const vowel = MATRA_VOWEL[rest];
  if (vowel) return `${stem}${vowel}`;
  // conjunct or unexpected — fall back
  return clean;
};

export const isBarakhadiAkshara = (value: string): boolean => {
  const clean = value.normalize('NFC').trim();
  if (!clean || clean.length > 4) return false;
  if (INDEPENDENT_VOWELS[clean] || CONJUNCTS[clean]) return true;
  const cons = clean[0];
  if (!CONSONANT_STEM[cons]) return false;
  const rest = clean.slice(1);
  return rest === '' || rest in MATRA_VOWEL;
};

/** Traditional Varṇamālā roman (school chart: ri, ṭa, ṣha…). */
const VARNAMALA_VOWELS: Record<string, string> = {
  अ: 'a', आ: 'aa', इ: 'i', ई: 'ee', उ: 'u', ऊ: 'oo',
  ऋ: 'ri', ॠ: 'rī', ऌ: 'li', ए: 'e', ऐ: 'ai', ओ: 'o', औ: 'au',
  अं: 'am', अः: 'ah', अँ: 'an',
};

const VARNAMALA_STEM: Record<string, string> = {
  क: 'k', ख: 'kh', ग: 'g', घ: 'gh', ङ: 'ṅ',
  च: 'ch', छ: 'chh', ज: 'j', झ: 'jh', ञ: 'ny',
  ट: 'ṭ', ठ: 'ṭh', ड: 'ḍ', ढ: 'ḍh', ण: 'ṇ',
  त: 't', थ: 'th', द: 'd', ध: 'dh', न: 'n',
  प: 'p', फ: 'ph', ब: 'b', भ: 'bh', म: 'm',
  य: 'y', र: 'r', ल: 'l', व: 'v',
  श: 'sh', ष: 'ṣh', स: 's', ह: 'h',
};

const VARNAMALA_CONJUNCTS: Record<string, string> = {
  क्ष: 'ksha',
  ज्ञ: 'jnya',
  त्र: 'tra',
  श्र: 'shra',
};

export const varnamalaLabel = (akshara: string): string => {
  const clean = akshara.normalize('NFC').trim();
  if (!clean) return '';
  if (VARNAMALA_VOWELS[clean]) return VARNAMALA_VOWELS[clean];
  if (VARNAMALA_CONJUNCTS[clean]) return VARNAMALA_CONJUNCTS[clean];
  const cons = clean[0];
  const stem = VARNAMALA_STEM[cons];
  if (!stem) return clean;
  const rest = clean.slice(1);
  if (!rest) return `${stem}a`;
  if (rest === 'ं') return `${stem}am`;
  if (rest === 'ः') return `${stem}ah`;
  return barakhadiLabel(clean);
};

/**
 * Convert any Barakhadi / Guninthalu / Varnamala akshara into authentic Devanagari speech text
 * optimized for Indian TTS engines (hi-IN, sa-IN) across iOS, macOS, Windows, and Android.
 */
export const getGuninthaluSpeechText = (akshara: string): string => {
  const clean = akshara.normalize('NFC').trim();
  if (!clean) return '';

  // 1. Visarga combinations (ः) -> Sanskrit echo vowel (कः -> कह, खः -> खह, किः -> किहि, etc.)
  if (clean.endsWith('ः')) {
    const base = clean.slice(0, -1);
    if (!base) return 'अह';
    const lastChar = base[base.length - 1];
    if (lastChar === 'ि' || lastChar === 'ी') return base + 'हि';
    if (lastChar === 'ु' || lastChar === 'ू') return base + 'हु';
    if (lastChar === 'े' || lastChar === 'ै') return base + 'हे';
    if (lastChar === 'ो' || lastChar === 'ौ') return base + 'हो';
    if (lastChar === 'ा') return base + 'हा';
    if (lastChar === 'ृ' || lastChar === 'ॄ') return base + 'हृ';
    if (base === 'अ') return 'अह';
    if (base === 'आ') return 'आहा';
    if (base === 'इ') return 'इहि';
    if (base === 'ई') return 'ईहि';
    if (base === 'उ') return 'उहु';
    if (base === 'ऊ') return 'ऊहु';
    return base + 'ह';
  }

  // 2. Anusvara combinations (ं) -> Halanta Makara (कम्, खम्, गम्, दम् - prevents dropping or English "damn")
  if (clean.endsWith('ं')) {
    const base = clean.slice(0, -1);
    if (!base) return 'अम्';
    return base + 'म्';
  }

  // 3. Velar nasal ङ row: clear audible velar articulation
  if (clean === 'ङ') return 'ङ्ङ';
  if (clean === 'ङा') return 'ङ्गा';
  if (clean === 'ङि') return 'ङ्गि';
  if (clean === 'ङी') return 'ङ्गी';
  if (clean === 'ङु') return 'ङ्गु';
  if (clean === 'ङू') return 'ङ्गू';
  if (clean === 'ङृ') return 'ङ्गृ';
  if (clean === 'ङे') return 'ङ्गे';
  if (clean === 'ङै') return 'ङ्गै';
  if (clean === 'ङो') return 'ङ्गो';
  if (clean === 'ङौ') return 'ङ्गौ';

  // 4. Palatal nasal ञ row
  if (clean === 'ञ') return 'ञ';
  if (clean === 'ञा') return 'ञा';
  if (clean === 'ञि') return 'ञि';
  if (clean === 'ञी') return 'ञी';
  if (clean === 'ञु') return 'ञु';
  if (clean === 'ञू') return 'ञू';
  if (clean === 'ञृ') return 'ञृ';
  if (clean === 'ञे') return 'ञे';
  if (clean === 'ञै') return 'ञै';
  if (clean === 'ञो') return 'ञो';
  if (clean === 'ञौ') return 'ञौ';

  // 4b. Retroflex aspirated ठ row: most TTS voices don't render the aspiration
  // puff, so ठ collapses into the same sound as the unaspirated ट. Force an
  // audible aspirate release by inserting an extra 'ह' after the halant —
  // the same technique already used above for the visarga echo. ट itself is
  // left untouched (falls through to case 7, plain Devanagari) so the two
  // stay clearly distinct. (ठः / ठं are already handled correctly above by
  // the generic visarga/anusvara rules in cases 1–2, which run first.)
  if (clean === 'ठ') return 'ठ्ह';
  if (clean === 'ठा') return 'ठ्हा';
  if (clean === 'ठि') return 'ठ्हि';
  if (clean === 'ठी') return 'ठ्ही';
  if (clean === 'ठु') return 'ठ्हु';
  if (clean === 'ठू') return 'ठ्हू';
  if (clean === 'ठृ') return 'ठ्हृ';
  if (clean === 'ठे') return 'ठ्हे';
  if (clean === 'ठै') return 'ठ्है';
  if (clean === 'ठो') return 'ठ्हो';
  if (clean === 'ठौ') return 'ठ्हौ';



  // 4b. Retroflex aspirated ठ row: most TTS voices don't render the aspiration
  // puff, so ठ collapses into the same sound as the unaspirated ट. Force an
  // audible aspirate release by inserting an extra 'ह' after the halant —
  // the same technique already used above for the visarga echo. ट itself is
  // left untouched (falls through to case 7, plain Devanagari) so the two
  // stay clearly distinct. (ठः / ठं are already handled correctly above by
  // the generic visarga/anusvara rules in cases 1–2, which run first.)
  if (clean === 'ठ') return 'ठ्ह';
  if (clean === 'ठा') return 'ठ्हा';
  if (clean === 'ठि') return 'ठ्हि';
  if (clean === 'ठी') return 'ठ्ही';
  if (clean === 'ठु') return 'ठ्हु';
  if (clean === 'ठू') return 'ठ्हू';
  if (clean === 'ठृ') return 'ठ्हृ';
  if (clean === 'ठे') return 'ठ्हे';
  if (clean === 'ठै') return 'ठ्है';
  if (clean === 'ठो') return 'ठ्हो';
  if (clean === 'ठौ') return 'ठ्हौ';


  // 5. Conjuncts
  if (clean === 'क्ष') return 'क्ष';
  if (clean === 'ज्ञ') return 'ज्ञ';
  if (clean === 'त्र') return 'त्र';
  if (clean === 'श्र') return 'श्र';

  // 6. Independent vowels
  if (clean === 'अ') return 'अ';
  if (clean === 'आ') return 'आ';
  if (clean === 'इ') return 'इ';
  if (clean === 'ई') return 'ई';
  if (clean === 'उ') return 'उ';
  if (clean === 'ऊ') return 'ऊ';
  if (clean === 'ऋ') return 'ऋ';
  if (clean === 'ॠ') return 'ॠ';
  if (clean === 'ऌ') return 'लृ';
  if (clean === 'ए') return 'ए';
  if (clean === 'ऐ') return 'ऐ';
  if (clean === 'ओ') return 'ओ';
  if (clean === 'औ') return 'औ';

  // 7. Standard consonant + matra combinations: return pure Devanagari directly
  return clean;
};

/** Speech text for Barakhadi / Guninthalu syllables: always returns native Devanagari. */
export const barakhadiSpeechText = (akshara: string): string => {
  return getGuninthaluSpeechText(akshara);
};

/** Speakable text for Varnamala tiles: always returns native Devanagari. */
export const varnamalaSpeechText = (akshara: string): string => {
  return getGuninthaluSpeechText(akshara);
};

/** Shared default (बारहखड़ी). Prefer varnamalaLabel for Varṇamālā tiles. */
export const aksharaLabel = barakhadiLabel;
export const isPhoneticAkshara = isBarakhadiAkshara;
