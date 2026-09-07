import { isBarakhadiAkshara, varnamalaSpeechText } from './barakhadiPhonetics';

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

// Exact/substring phonetic overrides for words that speech engines
// otherwise mispronounce or misinterpret entirely.
const applyWordOverrides = (word: string): string => {
  // ङ example words: stable English cues (same every click).
  if (word === 'अङ्गम्' || word === 'अंगम्') return 'an gam';
  if (word === 'गङ्गा' || word === 'गंगा') return 'gun ga';
  if (word === 'रङ्गः' || word === 'रंगः' || word === 'रङ्ग' || word === 'रंग') return 'run ga';
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

// Builds the text actually sent to the speech engine: word overrides + visarga echo.
// Full words stay Devanagari (Hindi voice). Single tiles use roman cues.
const toSpeechText = (word: string): string => {
  // Single बारहखड़ी / Varṇamālā tiles: distinct roman cues.
  if (isBarakhadiAkshara(word)) {
    return varnamalaSpeechText(word);
  }
  return applyVisargaEcho(applyWordOverrides(word));
};

const pickPreferredVoice = (): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) => voice.lang === 'hi-IN') ||
    voices.find((voice) => voice.lang?.startsWith('hi')) ||
    voices.find((voice) => voice.lang === 'sa-IN')
  );
};

/** Default playback rate (1x). Slow presets were removed. */
const DEFAULT_RATE = 1;

const configureUtterance = (utterance: SpeechSynthesisUtterance, word: string, speech: string): void => {
  const voice = pickPreferredVoice();
  utterance.voice = voice || null;
  // Roman cues (tiles or word anchors like angam/ganga/ranga) use English; Devanagari uses Hindi.
  if (/^[a-z\- ]+$/i.test(speech)) {
    const voices = window.speechSynthesis.getVoices();
    const en =
      voices.find((item) => item.lang === 'en-IN') ||
      voices.find((item) => item.lang?.startsWith('en'));
    if (en) {
      utterance.voice = en;
      utterance.lang = en.lang;
    } else {
      utterance.lang = 'en-IN';
    }
  } else {
    utterance.lang = voice?.lang || 'hi-IN';
  }
  // औ: slower diphthong; घ: gha a touch slower.
  // छ uses Devanagari + Hindi voice (roman chhha was letter-spelled as C-A).
  // ञ uses a two-beat contour in playPronunciation (fast en + slow ya).
  const isAu = word === 'औ' || speech === 'au';
  const isGha = word === 'घ' || speech === 'gha';
  const isChha = word === 'छ' || speech === 'छ';
  utterance.rate = isAu ? 0.45 : isGha ? 0.75 : isChha ? 0.9 : DEFAULT_RATE;
  utterance.pitch = 1;
};

const pickEnglishVoice = (): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((item) => item.lang === 'en-IN') ||
    voices.find((item) => item.lang?.startsWith('en'))
  );
};


/** ङ words गङ्गा / रङ्गः: slow clear first beat, then ga. */
const isGangaWord = (word: string): boolean =>
  word === 'गङ्गा' || word === 'गंगा';
const isRangaWord = (word: string): boolean =>
  word === 'रङ्गः' || word === 'रंगः' || word === 'रङ्ग' || word === 'रंग';

const playGunRunGa = (first: 'gun' | 'run', onDone?: () => void): void => {
  const enVoice = pickEnglishVoice();
  const firstPart = new SpeechSynthesisUtterance(first);
  firstPart.voice = enVoice || null;
  firstPart.lang = enVoice?.lang || 'en-IN';
  firstPart.rate = 0.55;
  firstPart.pitch = 1.1;
  firstPart.volume = 1;
  const gaPart = new SpeechSynthesisUtterance('ga');
  gaPart.voice = enVoice || null;
  gaPart.lang = enVoice?.lang || 'en-IN';
  gaPart.rate = 0.85;
  gaPart.pitch = 1;
  firstPart.onend = () => {
    window.speechSynthesis.speak(gaPart);
  };
  gaPart.onend = () => onDone?.();
  gaPart.onerror = () => onDone?.();
  firstPart.onerror = () => {
    window.speechSynthesis.speak(gaPart);
  };
  window.speechSynthesis.speak(firstPart);
};

/** ञ = enya with fast en then slow ya. */
const playNyaEnya = (onDone?: () => void): void => {
  const enVoice = pickEnglishVoice();
  const enPart = new SpeechSynthesisUtterance('enn');
  enPart.voice = enVoice || null;
  enPart.lang = enVoice?.lang || 'en-IN';
  enPart.rate = 1.95;
  enPart.pitch = 1;
  const yaPart = new SpeechSynthesisUtterance('ya');
  yaPart.voice = enVoice || null;
  yaPart.lang = enVoice?.lang || 'en-IN';
  yaPart.rate = 0.55;
  yaPart.pitch = 1;
  enPart.onend = () => {
    window.speechSynthesis.speak(yaPart);
  };
  yaPart.onend = () => onDone?.();
  yaPart.onerror = () => onDone?.();
  enPart.onerror = () => {
    window.speechSynthesis.speak(yaPart);
  };
  window.speechSynthesis.speak(enPart);
};


export const stopPronunciation = (): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
};

export const playPronunciation = (value: string): void => {
  const word = cleanWord(value) || value.trim();
  if (!word || !isSanskritText(word) || typeof window === 'undefined' || !window.speechSynthesis) {
    return;
  }

  stopPronunciation();
  if (word === 'ञ') {
    playNyaEnya();
    return;
  }
  if (isGangaWord(word)) {
    playGunRunGa('gun');
    return;
  }
  if (isRangaWord(word)) {
    playGunRunGa('run');
    return;
  }
  const speech = toSpeechText(word);
  const utterance = new SpeechSynthesisUtterance(speech);
  configureUtterance(utterance, word, speech);
  window.speechSynthesis.speak(utterance);
};

/** Speak a list of words/letters in order. Returns stop(). */
export const playSequence = (
  values: string[],
  options?: { gapMs?: number; onDone?: () => void },
): (() => void) => {
  const gapMs = options?.gapMs ?? 220;
  const items = values
    .map((value) => cleanWord(value) || value.trim())
    .filter((word) => word && isSanskritText(word));

  if (!items.length || typeof window === 'undefined' || !window.speechSynthesis) {
    options?.onDone?.();
    return () => undefined;
  }

  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let index = 0;

  const clearTimer = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const stop = () => {
    cancelled = true;
    clearTimer();
    stopPronunciation();
  };

  const speakNext = () => {
    if (cancelled) return;
    if (index >= items.length) {
      options?.onDone?.();
      return;
    }
    const word = items[index];
    index += 1;
    const after = () => {
      if (cancelled) return;
      timer = setTimeout(speakNext, gapMs);
    };
    if (word === 'ञ') {
      playNyaEnya(after);
      return;
    }
    if (isGangaWord(word)) {
      playGunRunGa('gun', after);
      return;
    }
    if (isRangaWord(word)) {
      playGunRunGa('run', after);
      return;
    }
    const speech = toSpeechText(word);
    const utterance = new SpeechSynthesisUtterance(speech);
    configureUtterance(utterance, word, speech);
    utterance.onend = after;
    utterance.onerror = () => {
      if (cancelled) return;
      timer = setTimeout(speakNext, gapMs);
    };
    window.speechSynthesis.speak(utterance);
  };

  stopPronunciation();
  speakNext();
  return stop;
};
