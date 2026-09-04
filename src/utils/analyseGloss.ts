/**
 * Sealed Analyse glosses from public/analyse.json (English + regional).
 * Grow this file word-by-word; never invent Telugu/Kannada here in code.
 */
export type AnalyseLangGloss = {
  label: string;
  meaning: string;
  sentence_sanskrit?: string;
  sentence_translation?: string;
};

export type AnalyseEntry = {
  word: string;
  base_english: string;
  languages?: Record<string, AnalyseLangGloss>;
};

export type AnalyseRegistry = Record<string, AnalyseEntry>;

let cached: AnalyseRegistry | null = null;
let inflight: Promise<AnalyseRegistry> | null = null;

export const loadAnalyseGlosses = async (): Promise<AnalyseRegistry> => {
  if (cached) return cached;
  if (inflight) return inflight;
  inflight = fetch(`./analyse.json?t=${Date.now()}`)
    .then(async (response) => {
      if (!response.ok) return {};
      const data = (await response.json()) as AnalyseRegistry;
      cached = data && typeof data === 'object' ? data : {};
      return cached;
    })
    .catch(() => {
      cached = {};
      return cached;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
};

export const lookupAnalyseGloss = (
  registry: AnalyseRegistry,
  devanagari: string,
): AnalyseEntry | undefined => {
  const key = devanagari.normalize('NFC').trim();
  if (!key) return undefined;
  if (registry[key]) return registry[key];
  // light fallback: strip a trailing visarga for lemma-ish hits
  if (key.endsWith('ः')) {
    const bare = key.slice(0, -1);
    if (registry[bare]) return registry[bare];
  }
  return undefined;
};

export const englishMeaningFromGloss = (entry: AnalyseEntry): string =>
  entry.languages?.en?.meaning?.trim() || entry.base_english?.trim() || '';
