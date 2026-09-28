import { CONSONANT_STEM, MATRA_VOWEL, isBarakhadiAkshara } from './barakhadiPhonetics';

let pronunciationMuted = false;

export const setPronunciationMuted = (muted: boolean) => {
  pronunciationMuted = muted;
};

export const getPronunciationMuted = () => pronunciationMuted;

export const speakConfigured = (word: string, onEnd?: () => void): void => {
  if (pronunciationMuted) return;

  // 1. स्वतंत्र स्वरों (अ से औ) के लिए लोकल MP3 मैपिंग
  const VOWEL_MP3_MAP: Record<string, string> = {
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
    'ऋ': 'ri', 'ॠ': 'rii', 'ऌ': 'li', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
    'अं': 'am', 'अः': 'ah', 'अँ': 'an'
  };

  if (VOWEL_MP3_MAP[word]) {
    const audioPath = `/audio/barakhadi/${VOWEL_MP3_MAP[word]}.mp3`;
    const audio = new Audio(audioPath);
    if (onEnd) { audio.onended = onEnd; audio.onerror = onEnd; }
    audio.play().catch(err => { console.error(err); if (onEnd) onEnd(); });
    return;
  }

  // 2. बाराखड़ी अक्षरों के लिए इंटरसेप्टर
  if (isBarakhadiAkshara(word)) {
    const cons = word[0];
    const rest = word.slice(1);
    const stem = CONSONANT_STEM[cons];
    const vowel = MATRA_VOWEL[rest] || (rest === '' ? 'a' : undefined);

    if (stem && vowel) {
      const audioPath = `/audio/barakhadi/${stem}_${vowel}.mp3`;
      const audio = new Audio(audioPath);
      if (onEnd) {
        audio.onended = onEnd;
        audio.onerror = onEnd;
      }
      audio.play().catch(err => {
        console.error(`Could not play audio for ${word}:`, err);
        if (onEnd) onEnd();
      });
      return;
    }
  }

  // 3. फॉलबैक टेक्स्ट-टू-स्पीच लॉजिक
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'hi-IN';
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }
  window.speechSynthesis.speak(utterance);
};

export const playPronunciation = (word: string, onEnd?: () => void): void => {
  speakConfigured(word, onEnd);
};

export const playSequence = (words: string[], onComplete?: () => void): void => {
  if (!words || words.length === 0) {
    if (onComplete) onComplete();
    return;
  }
  let index = 0;
  const playNext = () => {
    if (index >= words.length) {
      if (onComplete) onComplete();
      return;
    }
    speakConfigured(words[index], () => {
      index++;
      playNext();
    });
  };
  playNext();
};

export const stopPronunciation = (): void => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

export const getSpeechGeneration = (): number => {
  return 1;
};