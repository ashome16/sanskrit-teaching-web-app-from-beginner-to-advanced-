import { isBarakhadiAkshara, varnamalaSpeechText } from './barakhadiPhonetics';
import {
  applySafeProsody,
  clampRate,
  isApplePlatform,
  isWindowsPlatform,
  pickEnglishCueVoice,
  pickHindiVoice,
  safePitch,
  whenVoicesReady,
} from './speechPlatform';

// Native Web Speech API pronunciation helper for Sanskrit text only.
// Strips whitespace/punctuation plus Devanagari digits and hyphens (e.g. the
// numbers guide's "० - शून्यम्" button labels) so only the word itself is spoken.
const cleanWord = (value: string): string =>
  value.replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’\-–—०-९\.\/\\=+#*~_`]+/g, '').trim();

const isSanskritText = (value: string): boolean => /[\u0900-\u097F]/.test(value);

// Devanagari vowel signs (matras) that can carry a visarga's "echo" vowel.
const VOWEL_MATRAS = ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'े', 'ै', 'ो', 'ौ'];
const VOWEL_TO_MATRA: Record<string, string> = {
  'आ': 'ा', 'इ': 'ि', 'ई': 'ी', 'उ': 'ु', 'ऊ': 'ू',
  'ऋ': 'ृ', 'ॠ': 'ॄ', 'ऌ': 'ॢ', 'ॡ': 'ॣ',
  'ए': 'े', 'ऐ': 'ै', 'ओ': 'ो', 'औ': 'ौ',
};

// Windows speech engines misread roman cues for bare Varṇamālā consonants;
// keep the complete standard consonant row in Devanagari so hi-IN is used.
const WINDOWS_BARE_CONSONANTS = new Set(
  'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह'.split(' '),
);
// Bare conjunct tiles: Hindi Devanagari on every OS (Mac roman ksha/jnya/sh-ra
// and doubled त्र त्र sound worse than the Windows hi-IN letter voice).
const CONJUNCT_TILES = new Set(['क्ष', 'ज्ञ', 'त्र', 'श्र']);

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
// On Windows, a thin space before 'ह' helps SAPI keep the echo audible as one word
// (fixes picture words like एणः, ईशः, उष्ट्रः, डमरुः on Chrome/Edge).
const applyVisargaEcho = (word: string, spacedEcho = false): string => {
  if (!word.endsWith('ः')) return word;
  const base = word.slice(0, -1);
  const lastChar = base[base.length - 1];
  const h = spacedEcho ? ' ह' : 'ह';

  if (VOWEL_MATRAS.includes(lastChar)) {
    return base + h + lastChar;
  }
  if (VOWEL_TO_MATRA[lastChar]) {
    return base + h + VOWEL_TO_MATRA[lastChar];
  }
  // Bare consonant (inherent 'a') or the vowel 'अ': 'ह' already carries the 'a' sound.
  return base + h;
};

/**
 * Rare vocalic picture words use the Windows Devanagari + spaced-visarga path
 * on Apple too, so ॠ / ऌ are not rewritten to री / ली on Mac.
 */
const isRareVocalicWord = (word: string): boolean =>
  word === 'ॠकारः' || word.startsWith('ॠकार') || word === 'ऌकारः' || word.startsWith('ऌकार');

const usesWindowsWordSpeech = (word: string): boolean =>
  isWindowsPlatform() || (isApplePlatform() && isRareVocalicWord(word));

/** True for multi-akṣara picture / vocabulary words (not bare tiles). */
const isFullWord = (word: string): boolean => {
  if (CONJUNCT_TILES.has(word)) return false;
  if (WINDOWS_BARE_CONSONANTS.has(word)) return false;
  if (isBarakhadiAkshara(word)) return false;
  return word.length > 1;
};

// Builds the text actually sent to the speech engine: word overrides + visarga echo.
// Full words stay Devanagari (Hindi voice). Single tiles use roman cues.
// Bare conjuncts always use Devanagari + hi-IN (Mac + Windows). On Windows,
// bare consonants also skip roman cues — SAPI garbles those.
const toSpeechText = (word: string): string => {
  if (CONJUNCT_TILES.has(word)) {
    return word;
  }
  // Mac roman cues still work for non-conjunct tiles — this is Windows-only.
  if (isWindowsPlatform() && WINDOWS_BARE_CONSONANTS.has(word)) {
    return word;
  }
  // Single बारहखड़ी / Varṇamālā tiles: distinct roman cues.
  if (isBarakhadiAkshara(word)) {
    return varnamalaSpeechText(word);
  }

  const overridden = applyWordOverrides(word);

  // Windows whole-word path: keep Devanagari + spaced visarga echo for hi-IN.
  // Mac rare-vocalic words use this same path instead of a री / ली rewrite.
  if (usesWindowsWordSpeech(word)) {
    // Never let roman overrides win for ordinary picture words on Windows —
    // force Devanagari so pickHindiVoice is used (एणः, ईशः, …).
    if (/^[a-z\- ]+$/i.test(overridden) && !/^(an gam|gun ga|run ga|sap-ta)$/i.test(overridden)) {
      return applyVisargaEcho(word, true);
    }
    if (/^[a-z\- ]+$/i.test(overridden)) {
      return overridden; // intentional ङ / सप्त roman anchors
    }
    return applyVisargaEcho(overridden, true);
  }

  return applyVisargaEcho(overridden, false);
};

/** Default playback rate (1x). Slow presets were removed. */
const DEFAULT_RATE = 1;

const configureUtterance = (utterance: SpeechSynthesisUtterance, word: string, speech: string): void => {
  const voices = window.speechSynthesis.getVoices();
  const voice = pickHindiVoice(voices);
  utterance.voice = voice || null;
  // Roman cues (tiles or word anchors like angam/ganga/ranga) use English; Devanagari uses Hindi.
  if (/^[a-z\- ]+$/i.test(speech)) {
    const en = pickEnglishCueVoice(voices);
    if (en) {
      utterance.voice = en;
      utterance.lang = en.lang;
    } else {
      utterance.lang = 'en-IN';
    }
  } else {
    // Windows picture-words, plus Mac ॠकारः / ऌकारः: always prefer a real
    // hi-IN voice with Devanagari text so the platform paths match.
    if (usesWindowsWordSpeech(word) && isFullWord(word)) {
      const hi = pickHindiVoice(voices);
      utterance.voice = hi || voice || null;
      utterance.lang = hi?.lang || voice?.lang || 'hi-IN';
    } else {
      utterance.lang = voice?.lang || 'hi-IN';
    }
  }
  // औ/ऐ: slower diphthong; घ: gha a touch slower.
  // छ uses Devanagari + Hindi voice (roman chhha was letter-spelled as C-A).
  // ञ uses a two-beat contour in playPronunciation (fast en + slow ya).
  // Any word ending in visarga (ः): speak the whole word slowly so the echo is clear.
  const isAu = word === 'औ' || speech === 'au' || speech === 'gaau' || /aau$/i.test(speech);
  const isAi = word === 'ऐ' || speech === 'ai' || speech === 'ghaai' || /aai$/i.test(speech);
  const isGha = word === 'घ' || speech === 'gha';
  const isChha = word === 'छ' || speech === 'छ';
  const isTtha = word === 'ठ' || speech === 'ठ';
  const isDdha = word === 'ढ' || speech === 'dhah';
  const isKsha = word === 'क्ष' || speech === 'क्ष' || speech === 'ksha' || speech === 'क्ष क्ष';
  const isLongEe = word === 'ई' || /^yee+$/i.test(speech);
  const isRih = word === 'ऋ' || /^rih$/i.test(speech);
  const isReee = word === 'ॠ' || /^reee$/i.test(speech);
  const isGya = word === 'ज्ञ' || speech === 'ज्ञ' || speech === 'jnya' || speech === 'ज्ञ ज्ञ';
  const isTra = word === 'त्र' || speech === 'त्र' || speech === 'त्र त्र';
  const isLongUu = /ooooh$/i.test(speech);
  const isShortUu = /ooh$/i.test(speech) && !isLongUu;
  const isVisargaWord = word.endsWith('ः');
  // गङ्गा / रङ्गः / अङ्गम्: original roman cues, extended slowly + full volume.
  const isNgaWord =
    speech === 'gun ga' || speech === 'run ga' || speech === 'an gam';

  // Windows: known-problem tiles/conjuncts — mild Devanagari rate, no pitch tricks.
  const isJa = word === 'ज' || speech === 'ज';
  const isDha = word === 'ध' || speech === 'ध';
  const isJha = word === 'झ' || speech === 'झ';
  if (isWindowsPlatform() && (isGya || isTra || isKsha || isGha || isJa || isDha || isJha)) {
    utterance.rate = clampRate(0.9);
    utterance.pitch = safePitch(1);
    utterance.volume = 1;
    return;
  }

  utterance.rate = isNgaWord
    ? 0.42
    : isTtha
      ? 0.5
      : isKsha || isGya || isTra
        ? 0.85
        : isLongEe
          ? 0.8
          : isRih || isReee
            ? 0.58
            : isLongUu
                ? 0.62
                : isShortUu
                  ? 1.05
                  : isDdha
                    ? 0.72
                    : isVisargaWord
                      ? 0.45
                      : isAu || isAi
                        ? 0.45
                        : isGha
                          ? 0.75
                          : isChha
                            ? 0.9
                            : DEFAULT_RATE;
  // Natural pitch (1.0) for clean conjuncts and vowels
  utterance.pitch = isNgaWord
    ? 1.15
    : isTtha
      ? 1.35
      : isRih || isReee
        ? 1.12
        : isDdha
          ? 1.12
          : 1;
  utterance.volume = 1;
  applySafeProsody(utterance);
};

/** ञ = enya with fast en then slow ya (Mac). Windows: plain Devanagari + hi-IN. */
const playNyaEnya = (onDone?: () => void): void => {
  if (isWindowsPlatform()) {
    const hi = pickHindiVoice();
    const utterance = new SpeechSynthesisUtterance('ञ');
    utterance.voice = hi || null;
    utterance.lang = hi?.lang || 'hi-IN';
    utterance.rate = clampRate(0.9);
    utterance.pitch = safePitch(1);
    utterance.volume = 1;
    utterance.onend = () => onDone?.();
    utterance.onerror = () => onDone?.();
    window.speechSynthesis.speak(utterance);
    return;
  }

  const enVoice = pickEnglishCueVoice();
  const enPart = new SpeechSynthesisUtterance('enn');
  enPart.voice = enVoice || null;
  enPart.lang = enVoice?.lang || 'en-IN';
  enPart.rate = clampRate(1.95);
  enPart.pitch = safePitch(1);
  const yaPart = new SpeechSynthesisUtterance('ya');
  yaPart.voice = enVoice || null;
  yaPart.lang = enVoice?.lang || 'en-IN';
  yaPart.rate = clampRate(0.55);
  yaPart.pitch = safePitch(1);
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

/** Bumps on every play/stop so stale whenVoicesReady() callbacks do not speak. */
let speakGeneration = 0;

export const stopPronunciation = (): void => {
  speakGeneration += 1;
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
};


const speakConfigured = (word: string, onEnd?: () => void): void => {
  if (word === 'ञ') {
    playNyaEnya(onEnd);
    return;
  }
  const speech = toSpeechText(word);
  const utterance = new SpeechSynthesisUtterance(speech);
  configureUtterance(utterance, word, speech);
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }
  window.speechSynthesis.speak(utterance);
};

export const playPronunciation = (value: string): void => {
  const word = cleanWord(value) || value.trim();
  if (!word || !isSanskritText(word) || typeof window === 'undefined' || !window.speechSynthesis) {
    return;
  }

  stopPronunciation();
  const gen = speakGeneration;
  void whenVoicesReady().then(() => {
    if (gen !== speakGeneration) return;
    speakConfigured(word);
  });
};

/** Speak a list of words/letters in order. Returns stop(). */
export const playSequence = (
  values: string[],
  options?: {
    gapMs?: number;
    onDone?: () => void;
    /** Fired just before each item is spoken (for tile highlight). */
    onItem?: (word: string, index: number) => void;
  },
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
  let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
  let index = 0;
  let settledForIndex = -1;

  const clearTimer = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    if (fallbackTimer !== null) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
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
    const itemIndex = index;
    index += 1;
    options?.onItem?.(word, itemIndex);

    const after = () => {
      if (cancelled || settledForIndex === itemIndex) return;
      // External stopPronunciation() bumps speakGeneration — abort the queue.
      if (gen !== speakGeneration) {
        cancelled = true;
        return;
      }
      settledForIndex = itemIndex;
      clearTimer();
      timer = setTimeout(speakNext, gapMs);
    };

    // Some Chrome/Edge builds skip onend; advance after a safe upper bound.
    const fallbackMs = Math.max(1800, word.length * 420);
    fallbackTimer = setTimeout(after, fallbackMs);
    speakConfigured(word, after);
  };

  stopPronunciation();
  const gen = speakGeneration;
  void whenVoicesReady().then(() => {
    if (cancelled || gen !== speakGeneration) return;
    speakNext();
  });
  return stop;
};
