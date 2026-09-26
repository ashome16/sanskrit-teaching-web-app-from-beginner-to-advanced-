/**
 * Dedicated recitation voice for the Śānti mantra "ओं सह नाववतु …"
 * (Taittirīya Upaniṣad 2.2 / Kaṭha Upaniṣad śānti-pāṭha) — and, via
 * `mantraLines`, for any other mantra / śloka (see src/data/mantrasShlokas.ts).
 *
 * Deliberately separate from Bodhi (speakAsBodhi) and from the Varṇamālā
 * letter voice (playPronunciation):
 *  - its own voice preference (calm female hi-IN first) + a user voice picker
 *    saved in localStorage,
 *  - rate ~0.7 (Windows floor 0.75), natural pitch 1.0 — never lowered,
 *  - line-by-line with ~700 ms after । and ~1200 ms after ॥,
 *  - ओं spoken as its own slow "ओम्", visarga as a soft "शान्तिह" echo,
 *  - daṇḍas are never sent to the engine (no "danda" / "poorn viraam"),
 *  - every utterance is short (well under Chrome's ~15 s cut-off).
 */
import { clampRate, isWindowsPlatform, safePitch, whenVoicesReady } from './speechPlatform';
import { getSpeechGeneration, stopPronunciation } from './pronunciation';

export interface ShantiStep {
  /** Devanagari text actually sent to the voice (never contains । ॥). */
  say: string;
  /** Relative rate multiplier (1 = base recitation rate). */
  rateFactor?: number;
  /** Pause after this step inside the same line (ms). */
  pauseAfterMs?: number;
}

export interface ShantiLine {
  devanagari: string;
  iast: string;
  meaning: string;
  steps: ShantiStep[];
  /** Pause after the line: ~700 ms at ।, ~1200 ms at ॥. */
  pauseAfterMs: number;
}

/** ओं: its own slow, elongated syllable before the words. */
export const OM: ShantiStep = { say: 'ओम्', rateFactor: 0.86, pauseAfterMs: 320 };
/** शान्तिः → soft visarga echo "शान्तिह" (audible h, not "shaantee-ha"). */
export const SHANTI: ShantiStep = { say: 'शान्तिह', pauseAfterMs: 560 };

export const SHANTI_MANTRA_SOURCE = 'Taittirīya Upaniṣad 2.2 · Kaṭha Upaniṣad Śānti-pāṭha';

export const SHANTI_MANTRA_LINES: ShantiLine[] = [
  {
    devanagari: 'ओं सह नाववतु ।',
    iast: 'oṃ saha nāvavatu |',
    meaning: 'Oṃ. May That (Brahman) protect us both together.',
    steps: [OM, { say: 'सह नाववतु' }],
    pauseAfterMs: 700,
  },
  {
    devanagari: 'सह नौ भुनक्तु ।',
    iast: 'saha nau bhunaktu |',
    meaning: 'May That nourish us both together.',
    steps: [{ say: 'सह नौ भुनक्तु' }],
    pauseAfterMs: 700,
  },
  {
    devanagari: 'सह वीर्यं करवावहै ।',
    iast: 'saha vīryaṃ karavāvahai |',
    meaning: 'May we both work together with vigour.',
    // वीर्यम् so hi-IN voices sound the anusvāra clearly.
    steps: [{ say: 'सह वीर्यम् करवावहै' }],
    pauseAfterMs: 700,
  },
  {
    devanagari: 'तेजस्वि नावधीतमस्तु मा विद्विषावहै ॥',
    iast: 'tejasvi nāvadhītamastu mā vidviṣāvahai ||',
    meaning: 'May what we study be radiant; may we never hate one another.',
    steps: [{ say: 'तेजस्वि नावधीतमस्तु', pauseAfterMs: 380 }, { say: 'मा विद्विषावहै' }],
    pauseAfterMs: 1200,
  },
  {
    devanagari: 'ओं शान्तिः शान्तिः शान्तिः ॥',
    iast: 'oṃ śāntiḥ śāntiḥ śāntiḥ ||',
    meaning: 'Oṃ. Peace, peace, peace.',
    steps: [OM, SHANTI, SHANTI, { ...SHANTI, rateFactor: 0.9, pauseAfterMs: 0 }],
    pauseAfterMs: 0,
  },
];

export const SHANTI_MANTRA_DEVANAGARI = SHANTI_MANTRA_LINES.map((l) => l.devanagari).join(' ');
export const SHANTI_MANTRA_IAST = SHANTI_MANTRA_LINES.map((l) => l.iast).join(' ');
export const SHANTI_MANTRA_TRANSLATION =
  'Oṃ. May That (Brahman) protect us both together; may That nourish us both together; may we both work together with vigour; may what we study be radiant; may we never hate one another. Oṃ, peace, peace, peace.';

export const SHANTI_WORD_MEANINGS: Array<[string, string, string]> = [
  ['ओं', 'oṃ', 'the sacred syllable (praṇava) that opens and closes the recitation'],
  ['सह', 'saha', 'together'],
  ['नौ / नाव्', 'nau / nāv', '“us two” — dual of asmad (teacher and student); nau + avatu → nāvavatu by sandhi'],
  ['अवतु', 'avatu', 'may (That) protect — √av, imperative 3rd sg.'],
  ['भुनक्तु', 'bhunaktu', 'may (That) nourish / sustain — √bhuj, imperative 3rd sg.'],
  ['वीर्यम्', 'vīryam', 'vigour, strength, energy'],
  ['करवावहै', 'karavāvahai', 'may we two make / exert — √kṛ, imperative 1st dual (ātmanepada)'],
  ['तेजस्वि', 'tejasvi', 'radiant, full of brilliance'],
  ['अधीतम्', 'adhītam', 'what has been studied — adhi + √i, past participle'],
  ['अस्तु', 'astu', 'let it be — √as, imperative 3rd sg.'],
  ['मा', 'mā', 'not (prohibitive)'],
  ['विद्विषावहै', 'vidviṣāvahai', 'may we two hate each other — vi + √dviṣ, 1st dual; with mā: “may we never hate”'],
  ['शान्तिः', 'śāntiḥ', 'peace — from √śam, to become quiet; said three times for self, others and the world'],
];

/** Normalise any display variant (ॐ / ओं / ओम्, spacing, daṇḍas) for matching. */
const normalise = (value: string): string =>
  (value || '')
    .replace(/ॐ|ओं|ओम्|ओँ/g, '')
    .replace(/[\s।॥|,.;:!?०-९0-9()\-–—'"“”‘’]+/g, '')
    .replace(/ं/g, 'म्')
    .trim();

/** Index of the mantra line matching a lesson chip / label, or -1. */
export const findShantiLineIndex = (value: string): number => {
  const n = normalise(value);
  if (!n) return -1;
  return SHANTI_MANTRA_LINES.findIndex((line) => normalise(line.devanagari) === n);
};

/** True when a block of text is (or contains) this mantra. */
export const isShantiMantraText = (value: string): boolean => /नाववतु|नाव् अवतु/.test(value || '');

/* ---------------------------------------------------------------------------
 * Voice selection
 * ------------------------------------------------------------------------- */

export const SHANTI_VOICE_STORAGE_KEY = 'shantiMantraVoiceName';

const langOf = (v: SpeechSynthesisVoice): string => (v.lang || '').toLowerCase().replace('_', '-');

const isRecitationLang = (v: SpeechSynthesisVoice): boolean => {
  const lang = langOf(v);
  const name = (v.name || '').toLowerCase();
  return lang.startsWith('hi') || lang.startsWith('mr') || lang.startsWith('sa') || /hindi|हिन्दी|हिंदी/.test(name);
};

/**
 * Preference order (female, clear, calm first):
 *  1. Google हिन्दी (Chrome)            2. Microsoft Swara Online (Natural) (Edge)
 *  3. Lekha (macOS / iOS)               4. Microsoft Kalpana
 *  5. Microsoft Swara (local)           6. any other hi-IN voice (Hemant etc. last)
 *  7. mr-IN / sa-IN voices
 */
export const scoreShantiVoice = (v: SpeechSynthesisVoice): number => {
  const name = v.name || '';
  const lang = langOf(v);
  if (!isRecitationLang(v)) return 0;
  let score = 0;
  if (lang === 'hi-in') score = 50;
  else if (lang.startsWith('hi') || /hindi|हिन्दी|हिंदी/i.test(name)) score = 45;
  else if (lang.startsWith('mr')) score = 20;
  else if (lang.startsWith('sa')) score = 18;
  if (/google/i.test(name) && (lang.startsWith('hi') || /हिन्दी|हिंदी|hindi/i.test(name))) score += 60;
  else if (/swara/i.test(name) && /online|natural/i.test(name)) score += 55;
  else if (/lekha/i.test(name)) score += 50;
  else if (/kalpana/i.test(name)) score += 45;
  else if (/swara/i.test(name)) score += 40;
  else if (/madhur|hemant|rishi|male/i.test(name)) score -= 5; // male voices last
  return score;
};

/** All usable recitation voices, best first (for the picker). */
export const listShantiVoices = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] =>
  voices
    .filter(isRecitationLang)
    .sort((a, b) => scoreShantiVoice(b) - scoreShantiVoice(a) || a.name.localeCompare(b.name));

export const getSavedShantiVoiceName = (): string => {
  try {
    return window.localStorage?.getItem(SHANTI_VOICE_STORAGE_KEY) || '';
  } catch {
    return '';
  }
};

export const setSavedShantiVoiceName = (name: string): void => {
  try {
    if (name) window.localStorage?.setItem(SHANTI_VOICE_STORAGE_KEY, name);
    else window.localStorage?.removeItem(SHANTI_VOICE_STORAGE_KEY);
  } catch {
    /* storage unavailable (private mode) */
  }
};

export const pickShantiVoice = (
  voices: SpeechSynthesisVoice[],
  preferredName: string = getSavedShantiVoiceName(),
): SpeechSynthesisVoice | undefined => {
  if (preferredName) {
    const saved = voices.find((v) => v.name === preferredName);
    if (saved) return saved;
  }
  return listShantiVoices(voices)[0];
};

/* ---------------------------------------------------------------------------
 * Recitation
 * ------------------------------------------------------------------------- */

/** Base rate: 0.7 (Mac/other). Windows SAPI floor is 0.75 (clampRate). */
export const SHANTI_BASE_RATE = 0.7;
const SHANTI_PITCH = 1;

// Chrome can garbage-collect an utterance mid-speech and never fire onend —
// keep a module-level reference to the one currently speaking.
let liveUtterance: SpeechSynthesisUtterance | null = null;

export interface ReciteShantiOptions {
  /** Which mantra to recite (default: ओं सह नाववतु). Any ShantiLine[] works. */
  mantraLines?: ShantiLine[];
  /** Only these line indexes (default: all lines in order). */
  lines?: number[];
  /** Voice name override (default: saved picker choice, then preference order). */
  voiceName?: string;
  /** Fired when a line starts (for highlight). */
  onLine?: (lineIndex: number) => void;
  /** Fired exactly once: finished, stopped, or interrupted by other audio. */
  onEnd?: () => void;
  /** Fired if no Hindi / Marathi / Sanskrit voice is installed. */
  onNoVoice?: () => void;
}

export const reciteShantiMantra = (options: ReciteShantiOptions = {}): (() => void) => {
  const mantraLines = options.mantraLines && options.mantraLines.length ? options.mantraLines : SHANTI_MANTRA_LINES;
  const lineIdx = (options.lines && options.lines.length
    ? options.lines
    : mantraLines.map((_, i) => i)
  ).filter((i) => i >= 0 && i < mantraLines.length);

  let ended = false;
  const finish = () => {
    if (ended) return;
    ended = true;
    liveUtterance = null;
    options.onEnd?.();
  };

  if (!lineIdx.length || typeof window === 'undefined' || !window.speechSynthesis) {
    finish();
    return () => undefined;
  }

  const synth = window.speechSynthesis;
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

  const clearTimers = () => {
    if (timer !== null) clearTimeout(timer);
    if (fallbackTimer !== null) clearTimeout(fallbackTimer);
    timer = null;
    fallbackTimer = null;
  };

  // Stops Bodhi / word chips / any previous recitation first.
  stopPronunciation();
  const gen = getSpeechGeneration();

  const stop = () => {
    if (cancelled) return;
    cancelled = true;
    clearTimers();
    // Only cancel the engine if we still own it.
    if (gen === getSpeechGeneration()) stopPronunciation();
    finish();
  };

  const abortedElsewhere = () => gen !== getSpeechGeneration();

  const win = isWindowsPlatform();
  const baseRate = clampRate(SHANTI_BASE_RATE);
  // Windows can't go below 0.75, so its pauses are a little longer to feel as calm.
  const pauseScale = win ? 1.15 : 1;

  let voice: SpeechSynthesisVoice | undefined;
  let li = 0;
  let si = 0;
  let settledKey = '';

  const speakStep = () => {
    if (cancelled) return;
    if (abortedElsewhere()) {
      cancelled = true;
      clearTimers();
      finish();
      return;
    }
    if (li >= lineIdx.length) {
      clearTimers();
      finish();
      return;
    }
    const line = mantraLines[lineIdx[li]];
    const step = line.steps[si];
    if (si === 0) {
      try {
        options.onLine?.(lineIdx[li]);
      } catch {
        /* UI errors must not break recitation */
      }
    }
    const key = `${li}:${si}`;
    const isLastStep = si === line.steps.length - 1;
    const isLastLine = li === lineIdx.length - 1;

    const after = () => {
      if (cancelled || settledKey === key) return;
      settledKey = key;
      clearTimers();
      if (abortedElsewhere()) {
        cancelled = true;
        finish();
        return;
      }
      let pause: number;
      if (!isLastStep) {
        pause = step.pauseAfterMs ?? 250;
        si += 1;
      } else {
        pause = isLastLine ? 0 : line.pauseAfterMs;
        li += 1;
        si = 0;
      }
      timer = setTimeout(speakStep, Math.round(pause * pauseScale));
    };

    const u = new SpeechSynthesisUtterance(step.say);
    u.voice = voice || null;
    u.lang = voice?.lang || 'hi-IN';
    u.rate = clampRate(baseRate * (step.rateFactor ?? 1));
    u.pitch = safePitch(SHANTI_PITCH);
    u.volume = 1;
    u.onend = after;
    u.onerror = after;
    liveUtterance = u;
    // Some Chrome/Edge builds skip onend — advance after a generous bound.
    const fallbackMs = Math.max(2600, Math.round((step.say.length * 300) / u.rate));
    fallbackTimer = setTimeout(after, fallbackMs);
    // Chrome sometimes leaves the engine "paused" after idling.
    try {
      synth.resume();
    } catch {
      /* ignore */
    }
    synth.speak(u);
  };

  void whenVoicesReady().then((voices) => {
    if (cancelled || abortedElsewhere()) {
      finish();
      return;
    }
    const all = voices.length ? voices : synth.getVoices();
    voice = pickShantiVoice(all, options.voiceName ?? getSavedShantiVoiceName());
    if (!voice) options.onNoVoice?.();
    // Safari drops an utterance queued in the same tick as cancel().
    timer = setTimeout(speakStep, 80);
  });

  return stop;
};

/** Keep TS from flagging the GC guard as unused. */
export const isShantiSpeaking = (): boolean => liveUtterance !== null;
