/**
 * Multi-Role Speech Synthesis Configuration System
 * 
 * Provides distinct voice options, sensible defaults, and rates for:
 * 1. Bodhi Mascot & Gurukul Guide ('bodhi')
 * 2. Deepakam Textbook Reader ('reader')
 * 3. Course Mantras & Sacred Ślokas ('mantras')
 * 
 * Handles OS differences smoothly between Windows (Microsoft / SAPI / Edge Natural voices)
 * and macOS (Lekha, Samantha, Rishi, Siri voices).
 */

import { isWindowsPlatform, clampRate, safePitch } from './speechPlatform';

export type VoiceRole = 'bodhi' | 'reader' | 'mantras';

export interface VoiceRoleMeta {
  id: VoiceRole;
  title: string;
  devanagariTitle: string;
  description: string;
  defaultRate: number;
  sampleText: string;
  sampleLang: 'sa' | 'en';
}

export const VOICE_ROLES: Record<VoiceRole, VoiceRoleMeta> = {
  mantras: {
    id: 'mantras',
    title: 'Course Mantras & Ślokas',
    devanagariTitle: 'मन्त्राः श्लोकाश्च',
    description: 'Slow, melodious, resonant chanting voice for Upanishadic peace mantras, Gita verses, and Vedic hymns.',
    defaultRate: 0.72,
    sampleText: 'ओं सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । ओं शान्तिः शान्तिः शान्तिः ॥',
    sampleLang: 'sa',
  },
  reader: {
    id: 'reader',
    title: 'Deepakam Textbook Reader',
    devanagariTitle: 'दीपकम-पाठाः (वाचनम्)',
    description: 'Clear, steady pronunciation for sentences, word glosses, exercises, and vocabulary in textbook lessons.',
    defaultRate: 0.95,
    sampleText: 'समुद्रः भारतमातुः चरणौ प्रक्षालयति। The ocean washes Mother India’s feet.',
    sampleLang: 'sa',
  },
  bodhi: {
    id: 'bodhi',
    title: 'Bodhi Mascot & Gurukul Guide',
    devanagariTitle: 'बोधिः (सखा मार्गदर्शकश्च)',
    description: 'Warm, friendly companion voice for pronunciation tips, spoken Sanskrit phrases, and Gurukul Q&A.',
    defaultRate: 0.85,
    sampleText: 'नमस्ते! I am Bodhi. Let us explore Sanskrit sounds and grammar together!',
    sampleLang: 'en',
  },
};

const STORAGE_KEY_PREFIX = 'voice_role_';
const RATE_KEY_PREFIX = 'voice_rate_';

export const getSavedVoiceName = (role: VoiceRole): string => {
  try {
    return window.localStorage?.getItem(`${STORAGE_KEY_PREFIX}${role}`) || '';
  } catch {
    return '';
  }
};

export const setSavedVoiceName = (role: VoiceRole, name: string): void => {
  try {
    if (name) {
      window.localStorage?.setItem(`${STORAGE_KEY_PREFIX}${role}`, name);
    } else {
      window.localStorage?.removeItem(`${STORAGE_KEY_PREFIX}${role}`);
    }
    dispatchVoiceConfigChange();
  } catch {
    /* storage unavailable */
  }
};

export const getSavedRate = (role: VoiceRole): number => {
  try {
    const raw = window.localStorage?.getItem(`${RATE_KEY_PREFIX}${role}`);
    if (raw) {
      const val = parseFloat(raw);
      if (!isNaN(val) && val >= 0.5 && val <= 1.5) return val;
    }
  } catch {
    /* ignore */
  }
  return VOICE_ROLES[role].defaultRate;
};

export const setSavedRate = (role: VoiceRole, rate: number): void => {
  try {
    window.localStorage?.setItem(`${RATE_KEY_PREFIX}${role}`, rate.toFixed(2));
    dispatchVoiceConfigChange();
  } catch {
    /* ignore */
  }
};

export const resetVoicesToDefaults = (): void => {
  try {
    (['bodhi', 'reader', 'mantras'] as VoiceRole[]).forEach((role) => {
      window.localStorage?.removeItem(`${STORAGE_KEY_PREFIX}${role}`);
      window.localStorage?.removeItem(`${RATE_KEY_PREFIX}${role}`);
    });
    dispatchVoiceConfigChange();
  } catch {
    /* ignore */
  }
};

/** Listeners for reactive updates when user changes voice settings */
const listeners: Array<() => void> = [];

export const onVoiceConfigChange = (callback: () => void): (() => void) => {
  listeners.push(callback);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx !== -1) listeners.splice(idx, 1);
  };
};

const dispatchVoiceConfigChange = () => {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      /* ignore */
    }
  });
};

/* --------------------------------------------------------------------------
   Voice Scoring & Role-Specific Recommendation Engine
   -------------------------------------------------------------------------- */

const langOf = (v: SpeechSynthesisVoice): string => (v.lang || '').toLowerCase().replace('_', '-');

export const scoreVoiceForRole = (v: SpeechSynthesisVoice, role: VoiceRole): number => {
  const lang = langOf(v);
  const name = (v.name || '').toLowerCase();
  const isWindows = isWindowsPlatform();
  let score = 0;

  if (role === 'mantras') {
    // Mantras need calm, resonant Indic pronunciation.
    if (lang === 'hi-in' || lang === 'sa-in') score += 50;
    else if (lang.startsWith('hi') || lang.startsWith('sa') || /hindi|हिन्दी|हिंदी/i.test(name)) score += 40;
    else if (lang.startsWith('mr')) score += 25;
    else return 0; // English voices are unsuitable for mantras

    // Windows high-quality / natural voices
    if (/swara.*(online|natural)/i.test(name)) score += 65;
    if (/google.*(हिन्दी|hindi)/i.test(name)) score += 60;
    if (/kalpana/i.test(name)) score += 50;
    if (/lekha/i.test(name)) score += 55;
    if (/swara/i.test(name)) score += 45;
    if (/hemant|madhur/i.test(name)) score += 20;
    if (v.localService) score += 5;
  } else if (role === 'reader') {
    // Reader voice needs crisp, articulate pronunciation of words & sentences.
    if (lang === 'hi-in') score += 50;
    else if (lang.startsWith('hi') || /hindi|हिन्दी/i.test(name)) score += 35;
    else if (lang === 'en-in') score += 30; // en-IN can read bilingual translations
    else if (lang.startsWith('en')) score += 15;

    if (isWindows) {
      if (/swara/i.test(name)) score += 45;
      if (/ravi/i.test(name)) score += 40;
      if (/hemant/i.test(name)) score += 35;
      if (/david|zira|mark/i.test(name)) score += 20;
    } else {
      if (/lekha/i.test(name)) score += 50;
      if (/rishi/i.test(name)) score += 40;
      if (/samantha/i.test(name)) score += 30;
    }
  } else if (role === 'bodhi') {
    // Bodhi speaks conversational English with Sanskrit terms, or spoken phrases.
    if (lang === 'en-in') score += 50;
    else if (lang === 'hi-in') score += 40;
    else if (lang === 'en-gb') score += 35;
    else if (lang.startsWith('en')) score += 25;

    if (/rishi/i.test(name)) score += 50;
    if (/ravi/i.test(name)) score += 45;
    if (/swara/i.test(name)) score += 40;
    if (/lekha/i.test(name)) score += 35;
    if (/samantha|daniel/i.test(name)) score += 30;
  }

  return score;
};

export const getRecommendedVoicesForRole = (
  role: VoiceRole,
  allVoices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice[] => {
  return allVoices
    .filter((v) => scoreVoiceForRole(v, role) > 0)
    .sort((a, b) => scoreVoiceForRole(b, role) - scoreVoiceForRole(a, role) || a.name.localeCompare(b.name));
};

export const resolveVoiceForRole = (
  role: VoiceRole,
  allVoices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | undefined => {
  const savedName = getSavedVoiceName(role);
  if (savedName) {
    const saved = allVoices.find((v) => v.name === savedName);
    if (saved) return saved;
  }
  const recommended = getRecommendedVoicesForRole(role, allVoices);
  return recommended[0];
};

/* --------------------------------------------------------------------------
   Interactive Voice Preview Sample Player
   -------------------------------------------------------------------------- */

let currentSampleUtterance: SpeechSynthesisUtterance | null = null;

export const playVoiceSample = (
  role: VoiceRole,
  voiceName?: string,
  rateOverride?: number,
  onEnd?: () => void,
): (() => void) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onEnd?.();
    return () => {};
  }

  window.speechSynthesis.cancel();
  currentSampleUtterance = null;

  const voices = window.speechSynthesis.getVoices();
  const voice = voiceName
    ? voices.find((v) => v.name === voiceName)
    : resolveVoiceForRole(role, voices);

  const meta = VOICE_ROLES[role];
  const rate = rateOverride ?? getSavedRate(role);

  const utterance = new SpeechSynthesisUtterance(meta.sampleText);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = meta.sampleLang === 'sa' ? 'hi-IN' : 'en-IN';
  }

  utterance.rate = clampRate(rate);
  utterance.pitch = safePitch(1);
  utterance.volume = 1;

  currentSampleUtterance = utterance;

  const cleanup = () => {
    if (currentSampleUtterance === utterance) {
      currentSampleUtterance = null;
    }
    onEnd?.();
  };

  utterance.onend = cleanup;
  utterance.onerror = cleanup;

  window.speechSynthesis.speak(utterance);

  return () => {
    if (currentSampleUtterance === utterance) {
      window.speechSynthesis.cancel();
      cleanup();
    }
  };
};

export const stopVoiceSample = (): void => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    currentSampleUtterance = null;
  }
};
