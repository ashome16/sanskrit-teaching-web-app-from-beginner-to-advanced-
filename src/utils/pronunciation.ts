// Native Web Speech API pronunciation helper for Sanskrit text only.
// Strips whitespace/punctuation plus Devanagari digits and hyphens (e.g. the
// numbers guide's "० - शून्यम्" button labels) so only the word itself is spoken.
const cleanWord = (value: string): string =>
  value.replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’\-०-९]+/g, '').trim();

const isSanskritText = (value: string): boolean => /[\u0900-\u097F]/.test(value);

// Devanagari vowel signs (matras) that can carry a visarga's "echo" vowel.
const VOWEL_MATRAS = ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'े', 'ै', 'ो', 'ौ'];
const VOWEL_TO_MATRA: Record<string, string> = {
  'आ': 'ा', 'इ': 'ि', 'ई': 'ी', 'उ': 'ु', 'ऊ': 'ू',
  'ऋ': 'ृ', 'ॠ': 'ॄ', 'ऌ': 'ॢ', 'ॡ': 'ॣ',
  'ए': 'े', 'ऐ': 'ै', 'ओ': 'ो', 'औ': 'ौ',
};

// Some speech engines flatten 'ङ' and 'ढ' into their plain dental look-alikes
// ('na', 'dha' without aspiration); force the correct phonetic sound instead.
const CONSONANT_PHONETIC_HINTS: Record<string, string> = {
  'ङ': 'nga',
  'ढ': 'dha',
};

// Exact/substring phonetic overrides for numbers-guide words that speech engines
// otherwise mispronounce or misinterpret entirely.
const applyWordOverrides = (word: string): string => {
  // 'नव' (nava, 9) is otherwise auto-corrected by some engines to the English
  // month "November"; force a pure Devanagari override to keep it Sanskrit.
  if (word.includes('नव')) return word.replace(/नव/g, 'नवम्');
  // 'सप्त' (sapta, 7) gets clipped to "sat" without the plosive 'p'; a
  // hyphenated romanized hint forces the engine to articulate it in full.
  if (word === 'सप्त') return 'sap-ta';
  return word;
};

// Visarga (ः) is a breathy 'h' echo of the preceding vowel, e.g. अर्थः -> अर्थह,
// मातुः -> मातुहु. Voice engines otherwise drop it or mispronounce it silently.
const applyVisargaEcho = (word: string): string => {
  if (!word.endsWith('ः')) return word;
  const base = word.slice(0, -1);
  const lastChar = base[base.length - 1];

  if (VOWEL_MATRAS.includes(lastChar)) {
    return base + 'ह' + lastChar;
  }
  if (VOWEL_TO_MATRA[lastChar]) {
    return base + 'ह' + VOWEL_TO_MATRA[lastChar];
  }
  // Bare consonant (inherent 'a') or the vowel 'अ': 'ह' already carries the 'a' sound.
  return base + 'ह';
};

// Builds the text actually sent to the speech engine: applies word-specific
// overrides and the visarga echo, then swaps any ङ/ढ occurrences for their
// explicit phonetic hint. 'viṃśatiḥ' (विंशतिः -> विंशतिहि) falls out of the
// visarga echo rule automatically since it just echoes the preceding vowel.
const toSpeechText = (word: string): string => {
  const withVisargaEcho = applyVisargaEcho(applyWordOverrides(word));
  let result = '';
  for (const ch of withVisargaEcho) {
    result += CONSONANT_PHONETIC_HINTS[ch] ?? ch;
  }
  return result;
};

const pickPreferredVoice = (): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) => voice.lang === 'hi-IN') ||
    voices.find((voice) => voice.lang?.startsWith('hi')) ||
    voices.find((voice) => voice.lang === 'sa-IN')
  );
};

export const playPronunciation = (value: string, rate = 0.85): void => {
  const word = cleanWord(value) || value.trim();
  if (!word || !isSanskritText(word) || typeof window === 'undefined' || !window.speechSynthesis) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(toSpeechText(word));
  const voice = pickPreferredVoice();
  utterance.voice = voice || null;
  utterance.lang = voice?.lang || 'hi-IN';
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
};
