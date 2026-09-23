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

/** Load the 100-root Dhātupāṭha once (cached). */
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

export const PADAM_LABELS: Record<DhatuPadam, string> = {
  parasmaipada: 'परस्मैपद · Parasmaipada',
  atmanepada: 'आत्मनेपद · Ātmanepada',
  ubhayapada: 'उभयपद · Ubhayapada',
};
