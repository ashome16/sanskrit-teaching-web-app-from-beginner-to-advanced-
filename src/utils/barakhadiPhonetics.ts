/**
 * बारहखड़ी romanization for on-tile labels and speech hints.
 * Similar-looking consonants get distinct spellings so TTS and kids can tell them apart.
 */
const CONSONANT_STEM: Record<string, string> = {
  क: 'k', ख: 'kh', ग: 'g', घ: 'gh', ङ: 'ng',
  च: 'ch', छ: 'chh', ज: 'j', झ: 'jh', ञ: 'ny',
  ट: 'tt', ठ: 'tth', ड: 'dd', ढ: 'ddh', ण: 'nn',
  त: 't', थ: 'th', द: 'd', ध: 'dh', न: 'n',
  प: 'p', फ: 'ph', ब: 'b', भ: 'bh', म: 'm',
  य: 'y', र: 'r', ल: 'l', व: 'v',
  श: 'sh', ष: 'shh', स: 's', ह: 'h',
};

/** Matra → vowel ending (school-style: aa, ee, oo). */
const MATRA_VOWEL: Record<string, string> = {
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

/** Speech engines need clearer separation for look-alike rows. */
export const barakhadiSpeechText = (akshara: string): string => {
  const label = barakhadiLabel(akshara);
  if (!label || label === akshara) return akshara;

  // Hyphenate long digraphs so engines keep aspiration / retroflex.
  const special: Record<string, string> = {
    nga: 'ng-a', ngaa: 'ng-aa', ngi: 'ng-i', ngee: 'ng-ee', ngu: 'ng-u', ngoo: 'ng-oo',
    nge: 'ng-e', ngai: 'ng-ai', ngo: 'ng-o', ngau: 'ng-au', ngam: 'ng-am', ngah: 'ng-ah', ngru: 'ng-ru',
    nya: 'ny-a', nyaa: 'ny-aa', nyi: 'ny-i', nyee: 'ny-ee',
    tta: 't-ta', ttaa: 't-taa', tti: 't-ti', ttee: 't-tee', ttu: 't-tu', ttoo: 't-too',
    tte: 't-te', ttai: 't-tai', tto: 't-to', ttau: 't-tau', ttam: 't-tam', ttah: 't-tah', ttru: 't-tru',
    ttha: 't-tha', tthaa: 't-thaa', tthi: 't-thi', tthee: 't-thee',
    dda: 'd-da', ddaa: 'd-daa', ddi: 'd-di', ddee: 'd-dee',
    ddha: 'd-dha', ddhaa: 'd-dhaa', ddhi: 'd-dhi', ddhee: 'd-dhee',
    nna: 'n-na', nnaa: 'n-naa', nni: 'n-ni', nnee: 'n-nee',
    shha: 'sh-ha', shhaa: 'sh-haa', shhi: 'sh-hi', shhee: 'sh-hee',
    chha: 'ch-ha', chhaa: 'ch-haa', chhi: 'ch-hi', chhee: 'ch-hee',
    ksha: 'k-sha', jnya: 'j-nya', tra: 't-ra', shra: 'sh-ra',
    li: 'li', ri: 'ri', rii: 'ree',
    kha: 'k-ha', khaa: 'k-haa', khi: 'k-hi', khee: 'k-hee',
    gha: 'g-ha', ghaa: 'g-haa', ghi: 'g-hi', ghee: 'g-hee',
    jha: 'j-ha', jhaa: 'j-haa', jhi: 'j-hi', jhee: 'j-hee',
    pha: 'p-ha', phaa: 'p-haa', phi: 'p-hi', phee: 'p-hee',
    bha: 'b-ha', bhaa: 'b-haa', bhi: 'b-hi', bhee: 'b-hee',
    tha: 't-ha', thaa: 't-haa', thi: 't-hi', thee: 't-hee',
    dha: 'd-ha', dhaa: 'd-haa', dhi: 'd-hi', dhee: 'd-hee',
  };
  if (special[label]) return special[label];

  // Default: slow clear roman (kaa, kee, koo already distinct)
  return label;
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
  क: 'k', ख: 'kh', ग: 'g', घ: 'gh', ङ: 'ng',
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
  // Matras rarely appear on Varṇamālā tiles; fall back to barakhadi scheme.
  return barakhadiLabel(clean);
};

/** Speakable ASCII for traditional labels (ṭ→tt, ṣ→shh, rii→ree). */
export const varnamalaSpeechText = (akshara: string): string => {
  const label = varnamalaLabel(akshara);
  if (!label || label === akshara) return barakhadiSpeechText(akshara);
  const ascii = label
    .replace(/ṭ/g, 'tt')
    .replace(/ḍ/g, 'dd')
    .replace(/ṇ/g, 'nn')
    .replace(/ṣ/g, 'shh')
    .replace(/ī/g, 'ee')
    .replace(/rii/g, 'ree');
  const special: Record<string, string> = {
    nga: 'ng-a', nya: 'ny-a', chha: 'ch-ha',
    tta: 't-ta', ttha: 't-tha', dda: 'd-da', ddha: 'd-dha', nna: 'n-na',
    shha: 'sh-ha', ksha: 'k-sha', jnya: 'j-nya',
  };
  return special[ascii] || ascii;
};
/** Shared default (बारहखड़ी). Prefer varnamalaLabel for Varṇamālā tiles. */
export const aksharaLabel = barakhadiLabel;
export const isPhoneticAkshara = isBarakhadiAkshara;
