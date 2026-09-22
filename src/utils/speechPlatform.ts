/**
 * OS-aware Web Speech helpers.
 * Windows Microsoft/SAPI voices distort at extreme rate/pitch; macOS enhanced
 * voices tolerate the Varṇamālā-tuned values. Keep Mac quality; clamp on Windows.
 */

export const isWindowsPlatform = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /Windows/i.test(navigator.userAgent);
};

/** Windows-safe rate: never below ~0.7; soft upper bound ~1.05. */
export const clampRate = (rate: number): number => {
  if (!isWindowsPlatform()) return rate;
  return Math.min(1.05, Math.max(0.75, rate));
};

/** Windows: always natural pitch 1.0 (pitch shifts chipmunk/garble on SAPI). */
export const safePitch = (pitch: number): number => {
  if (!isWindowsPlatform()) return pitch;
  return 1;
};

let voicesReadyPromise: Promise<SpeechSynthesisVoice[]> | null = null;

/** Resolve once voices are available (Chrome/Edge often empty until voiceschanged). */
export const whenVoicesReady = (): Promise<SpeechSynthesisVoice[]> => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return Promise.resolve([]);
  }
  const existing = window.speechSynthesis.getVoices();
  if (existing.length > 0) return Promise.resolve(existing);

  if (voicesReadyPromise) return voicesReadyPromise;

  voicesReadyPromise = new Promise((resolve) => {
    const synth = window.speechSynthesis;
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      synth.removeEventListener('voiceschanged', onChanged);
      resolve(synth.getVoices());
    };
    const onChanged = () => finish();
    synth.addEventListener('voiceschanged', onChanged);
    // Fallback if voiceschanged never fires (Safari quirks / already loaded).
    window.setTimeout(finish, 750);
  });

  return voicesReadyPromise;
};

const scoreHindiVoice = (voice: SpeechSynthesisVoice): number => {
  const name = voice.name || '';
  const lang = (voice.lang || '').toLowerCase();
  let score = 0;
  if (lang === 'hi-in') score += 50;
  else if (lang.startsWith('hi')) score += 30;
  else if (lang === 'sa-in' || lang.startsWith('sa')) score += 20;
  // Prefer local Microsoft Hindi voices on Windows.
  if (/hemant/i.test(name)) score += 40;
  if (/swara/i.test(name)) score += 38;
  if (/microsoft/i.test(name) && /hi/i.test(lang + name)) score += 15;
  if (voice.localService) score += 10;
  return score;
};

const scoreEnglishVoice = (voice: SpeechSynthesisVoice): number => {
  const name = voice.name || '';
  const lang = (voice.lang || '').toLowerCase();
  let score = 0;
  if (lang === 'en-in') score += 50;
  else if (lang === 'en-gb') score += 35;
  else if (lang.startsWith('en')) score += 15;
  if (/ravi/i.test(name)) score += 40;
  if (/microsoft/i.test(name) && /en-?in|india|ravi/i.test(name + lang)) score += 20;
  if (voice.localService) score += 10;
  return score;
};

const bestVoice = (
  voices: SpeechSynthesisVoice[],
  scoreFn: (v: SpeechSynthesisVoice) => number,
  minScore = 1,
): SpeechSynthesisVoice | undefined => {
  let best: SpeechSynthesisVoice | undefined;
  let bestScore = minScore - 1;
  for (const voice of voices) {
    const s = scoreFn(voice);
    if (s > bestScore) {
      best = voice;
      bestScore = s;
    }
  }
  return best;
};

export const pickHindiVoice = (
  voices?: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | undefined => {
  const list = voices ?? (typeof window !== 'undefined' ? window.speechSynthesis?.getVoices() ?? [] : []);
  return bestVoice(list, scoreHindiVoice, 1);
};

export const pickEnglishCueVoice = (
  voices?: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | undefined => {
  const list = voices ?? (typeof window !== 'undefined' ? window.speechSynthesis?.getVoices() ?? [] : []);
  return bestVoice(list, scoreEnglishVoice, 1);
};

/**
 * Apply OS-safe rate/pitch to an utterance after callers set desired values.
 */
export const applySafeProsody = (utterance: SpeechSynthesisUtterance): void => {
  utterance.rate = clampRate(utterance.rate);
  utterance.pitch = safePitch(utterance.pitch);
};
