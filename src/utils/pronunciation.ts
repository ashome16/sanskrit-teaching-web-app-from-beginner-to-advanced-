import { CONSONANT_STEM, MATRA_VOWEL, isBarakhadiAkshara } from './barakhadiPhonetics';

let pronunciationMuted = false;

export const setPronunciationMuted = (muted: boolean) => {
  pronunciationMuted = muted;
};

export const getPronunciationMuted = () => pronunciationMuted;

// Helper stubs for Mac/fallback speech overrides if defined elsewhere
const speakMacBarakhadiOverride = (word: string, onEnd?: () => void): boolean => false;
const speakMacVocalicVowel = (word: string, onEnd?: () => void): boolean => false;
const playNyaEnya = (onEnd?: () => void) => { if (onEnd) onEnd(); };
const resolveVoiceForRole = (role: string, voices: SpeechSynthesisVoice[]) => null;
const pickHindiVoice = (voices: SpeechSynthesisVoice[]) => null;
const isWindowsPlatform = () => navigator.userAgent.includes('Windows');
const toSpeechText = (word: string) => word;
const configureUtterance = (utterance: SpeechSynthesisUtterance, word: string, speech: string) => {};

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
  if (speakMacBarakhadiOverride(word, onEnd)) return;
  if (speakMacVocalicVowel(word, onEnd)) return;
  if (word === 'ञ') {
    const voices = window.speechSynthesis.getVoices();
    const hasHindi = !!(resolveVoiceForRole('reader', voices) || pickHindiVoice(voices));
    if (!hasHindi && !isWindowsPlatform()) {
      playNyaEnya(onEnd);
      return;
    }
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
