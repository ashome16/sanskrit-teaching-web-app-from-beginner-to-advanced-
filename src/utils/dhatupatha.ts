/**
 * Dhātupāṭha library loader — fetches public/dhatupatha.json once and caches.
 */
import type { DhatuEntry, DhatuPadam } from '../types/linguistics';

let cache: DhatuEntry[] | null = null;
let inflight: Promise<DhatuEntry[]> | null = null;

const PADAMS: ReadonlySet<string> = new Set(['parasmaipada', 'atmanepada', 'ubhayapada']);

function normalizeEntry(raw: Record<string, unknown>): DhatuEntry | null {
  const devanagari = typeof raw.devanagari === 'string' ? raw.devanagari : '';
  const transliteration = typeof raw.transliteration === 'string' ? raw.transliteration : '';
  const meaning = typeof raw.meaning === 'string' ? raw.meaning : '';
  if (!devanagari) return null;

  const ganaRaw = raw.gana ?? raw.class;
  const gana = typeof ganaRaw === 'number' ? ganaRaw : Number(ganaRaw);
  const padamRaw = typeof raw.padam === 'string' ? raw.padam : undefined;
  const padam = padamRaw && PADAMS.has(padamRaw) ? (padamRaw as DhatuPadam) : undefined;
  const examples = Array.isArray(raw.examples)
    ? raw.examples.filter((e): e is string => typeof e === 'string')
    : undefined;

  return {
    id: typeof raw.id === 'string' ? raw.id : undefined,
    devanagari,
    transliteration,
    meaning,
    meaning_hi: typeof raw.meaning_hi === 'string' ? raw.meaning_hi : undefined,
    gana: Number.isFinite(gana) ? gana : undefined,
    class: Number.isFinite(gana) ? gana : undefined,
    gana_name: typeof raw.gana_name === 'string' ? raw.gana_name : undefined,
    padam,
    examples,
    set_anit: typeof raw.set_anit === 'string' ? raw.set_anit : undefined,
    notes: typeof raw.notes === 'string' ? raw.notes : undefined,
  };
}

/** Load the Dhātupāṭha library once (cached). */
export async function loadDhatupatha(): Promise<DhatuEntry[]> {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = fetch('./dhatupatha.json')
    .then(async (res) => {
      if (!res.ok) throw new Error(`Failed to load dhatupatha.json (${res.status})`);
      const data = (await res.json()) as unknown;
      if (!Array.isArray(data)) throw new Error('dhatupatha.json is not an array');
      const entries = data
        .map((item) =>
          item && typeof item === 'object'
            ? normalizeEntry(item as Record<string, unknown>)
            : null,
        )
        .filter((e): e is DhatuEntry => e !== null);
      cache = entries;
      return entries;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function findDhatuById(entries: DhatuEntry[], id: string): DhatuEntry | undefined {
  const needle = id.trim().toLowerCase();
  return entries.find((e) => e.id?.toLowerCase() === needle);
}

export function findDhatuByDevanagari(
  entries: DhatuEntry[],
  devanagari: string,
): DhatuEntry | undefined {
  const needle = devanagari.trim();
  return entries.find((e) => e.devanagari === needle);
}

export function filterDhatuByGana(entries: DhatuEntry[], gana: number): DhatuEntry[] {
  return entries.filter((e) => e.gana === gana || e.class === gana);
}

/** Case-insensitive search across Devanagari, IAST, English, Hindi. */
export function searchDhatupatha(entries: DhatuEntry[], query: string): DhatuEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return entries;
  return entries.filter((e) => {
    const hay = [
      e.devanagari,
      e.transliteration,
      e.meaning,
      e.meaning_hi,
      e.id,
      e.gana_name,
      e.notes,
      ...(e.examples ?? []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  });
}

export const GANA_LABELS: Record<number, string> = {
  1: 'bhvādi',
  2: 'adādi',
  3: 'juhotyādi',
  4: 'divādi',
  5: 'svādi',
  6: 'tudādi',
  7: 'rudhādi',
  8: 'tanādi',
  9: 'kryādi',
  10: 'curādi',
};

/**
 * Section headings for the ten gaṇas, in class order.
 * Sanskrit names and the short English labels match the ten-gaṇa cards
 * already stored in the Dhātupāṭha articles (nameSan / titleBadge).
 * IAST (`bhvādi` …) stays on GANA_LABELS, which is also `gana_name` in the library.
 */
export const GANA_HEADINGS: Record<number, { san: string; en: string }> = {
  1: { san: 'भ्वादिगणः', en: 'The Paradigm Class' },
  2: { san: 'अदादिगणः', en: 'The Direct Class' },
  3: { san: 'जुहोत्यादिगणः', en: 'The Reduplicating Class' },
  4: { san: 'दिवादिगणः', en: 'The "Ya" Class' },
  5: { san: 'स्वादिगणः', en: 'The "Nu" Class' },
  6: { san: 'तुदादिगणः', en: 'The Unstrengthened "A" Class' },
  7: { san: 'रुधादिगणः', en: 'The Infix Class' },
  8: { san: 'तनादिगणः', en: 'The "O" Class' },
  9: { san: 'क्र्यादिगणः', en: 'The "Nā" Class' },
  10: { san: 'चुरादिगणः', en: 'The Causative "Aya" Class' },
};


/**
 * Meaning-theme browse. Buckets are the suggested set; a root is placed in
 * the single closest one by words already present in its English `meaning`.
 * Nothing is added to the gloss. Glosses that match none land in Other.
 * Check order is priority (first match wins), not the order shown on the page.
 */
export const MEANING_THEMES = [
  { id: 'movement', label: 'Movement' },
  { id: 'speech', label: 'Speech and senses' },
  { id: 'daily', label: 'Daily life' },
  { id: 'giving', label: 'Giving and taking' },
  { id: 'protection', label: 'Protection and worship' },
  { id: 'feeling', label: 'Feeling' },
  { id: 'existence', label: 'Existence and growth' },
  { id: 'conflict', label: 'Conflict and release' },
  { id: 'other', label: 'Other' },
] as const;

export type MeaningThemeId = (typeof MEANING_THEMES)[number]['id'];

const THEME_RULES: { id: MeaningThemeId; words: readonly string[] }[] = [
  {
    id: 'protection',
    words: ['worship', 'honor', 'honour', 'sacrifice', 'protect', 'guard', 'austerity', 'soma', 'serve', 'offer'],
  },
  {
    id: 'giving',
    words: ['give', 'take', 'obtain', 'attain', 'seize', 'grasp', 'buy', 'steal', 'beg', 'request', 'find'],
  },
  {
    id: 'conflict',
    words: [
      'conquer', 'win', 'fight', 'kill', 'strike', 'release', 'free', 'abandon', 'cut', 'split', 'break',
      'tear', 'injure', 'injured', 'harm', 'hurt', 'oppress', 'hinder', 'obstruct', 'block', 'punish',
      'bind', 'tie', 'hunt', 'empty',
    ],
  },
  {
    id: 'feeling',
    words: [
      'angry', 'fear', 'wish', 'desire', 'envy', 'covet', 'love', 'hate', 'rejoice', 'glad', 'delight',
      'pleased', 'pleasing', 'satisfied', 'ashamed', 'forgive', 'endure', 'suffer', 'afflicted',
      'confused', 'bold', 'dare', 'weep', 'laugh',
    ],
  },
  {
    id: 'speech',
    words: [
      'speak', 'say', 'hear', 'see', 'read', 'study', 'write', 'tell', 'narrate', 'sing', 'smell', 'touch',
      'know', 'remember', 'think', 'understand', 'reason', 'infer', 'guess', 'perceive', 'notice', 'sound',
      'resound', 'roar', 'proclaim', 'announce', 'chatter', 'prattle', 'coo', 'warble', 'thunder', 'praise',
      'counsel', 'consult', 'describe', 'indicate', 'point', 'show', 'direct', 'name', 'call', 'blame',
      'criticize', 'meditate', 'contemplate',
    ],
  },
  {
    id: 'daily',
    words: [
      'eat', 'drink', 'cook', 'dwell', 'sleep', 'wash', 'wear', 'clothe', 'milk', 'grind', 'lick',
      'swallow', 'play', 'dance', 'purify', 'sprinkle', 'pour', 'toil', 'hungry', 'kiss', 'do', 'make',
    ],
  },
  {
    id: 'existence',
    words: [
      'become', 'exist', 'born', 'die', 'live', 'grow', 'increase', 'prosper', 'thrive', 'nourish',
      'perish', 'decay', 'wither', 'create', 'happen', 'awake', 'breathe',
    ],
  },
  {
    id: 'movement',
    words: [
      'go', 'walk', 'run', 'move', 'fall', 'fly', 'stand', 'sit', 'enter', 'creep', 'crawl', 'step',
      'stride', 'flow', 'cross', 'wander', 'roam', 'float', 'swim', 'travel', 'hasten', 'hurry', 'flee',
      'throw', 'lead', 'carry', 'bow', 'bend', 'tremble', 'shake', 'throb', 'quiver', 'stir', 'place', 'put',
    ],
  },
];

function glossHas(meaning: string, word: string): boolean {
  return new RegExp(`\\b${word}\\b`, 'i').test(meaning);
}

/** One theme per root, from the English gloss only. */
export function meaningThemeFor(meaning: string): MeaningThemeId {
  const text = meaning.trim();
  // "to rule, …" does not name a theme; its other glosses split across speech and conflict.
  if (/^to rule\b/i.test(text)) return 'other';
  for (const rule of THEME_RULES) {
    if (rule.words.some((word) => glossHas(text, word))) return rule.id;
  }
  // Copula "to be" / "to become" is existence. "to be angry" and the like are not.
  if (
    /\bto be\b/i.test(text) &&
    !/\bto be (able|hungry|white|bright|fit|accomplished|lost|hurt|injured|angry|afraid|pleased|confused|glad|awake|ashamed)\b/i.test(text)
  ) {
    return 'existence';
  }
  return 'other';
}

export const PADAM_LABELS: Record<DhatuPadam, string> = {
  parasmaipada: 'परस्मैपद · Parasmaipada',
  atmanepada: 'आत्मनेपद · Ātmanepada',
  ubhayapada: 'उभयपद · Ubhayapada',
};
