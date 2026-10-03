/**
 * Person-number English beside each generated tiṅanta.
 * The 50 school roots use the user's Laṭ grid (finite verb, same on every lakāra
 * and on ātmanepada). 1st-singular copulas are "I am…", not the sheet's "I are…".
 * Any other library root keeps its stored English gloss. No gloss → pronoun only.
 */
import type { DhatuEntry } from '../types/linguistics';

/** Rows: 3rd, 2nd, 1st. Cols: singular, dual, plural. */
export const PERSON_PRONOUNS: readonly [string, string, string][] = [
  ['He/She/It', 'They two', 'They all'],
  ['You (singular)', 'You two', 'You all'],
  ['I', 'We two', 'We all'],
];

type FiniteGloss = {
  /** 3rd singular verb phrase. */
  third: string;
  /** Every other person-number. */
  base: string;
  /** 1st singular when the copula must be "am". */
  first?: string;
};

/** Keyed by dhatupatha.json id. Do not add roots that are not already in the library. */
const FINITE_BY_ID: Record<string, FiniteGloss> = {
  bhu: { third: 'is/becomes', base: 'are/become', first: 'am/become' },
  kr: { third: 'does', base: 'do' },
  gam: { third: 'goes', base: 'go' },
  path: { third: 'reads', base: 'read' },
  likh: { third: 'writes', base: 'write' },
  drsh: { third: 'sees', base: 'see' },
  shru: { third: 'hears', base: 'hear' },
  vad: { third: 'speaks', base: 'speak' },
  khad: { third: 'eats', base: 'eat' },
  pa: { third: 'drinks', base: 'drink' },
  stha: { third: 'stands', base: 'stand' },
  smr: { third: 'remembers', base: 'remember' },
  ni: { third: 'leads', base: 'lead' },
  pac: { third: 'cooks', base: 'cook' },
  tyaj: { third: 'abandons', base: 'abandon' },
  ji: { third: 'conquers', base: 'conquer' },
  has: { third: 'laughs', base: 'laugh' },
  rud: { third: 'cries', base: 'cry' },
  nrt: { third: 'dances', base: 'dance' },
  krid: { third: 'plays', base: 'play' },
  cal: { third: 'moves', base: 'move' },
  pat: { third: 'falls', base: 'fall' },
  dhav: { third: 'runs', base: 'run' },
  vas: { third: 'dwells', base: 'dwell' },
  jan: { third: 'is born', base: 'are born', first: 'am born' },
  mr: { third: 'dies', base: 'die' },
  da: { third: 'gives', base: 'give' },
  hr: { third: 'takes', base: 'take' },
  labh: { third: 'obtains', base: 'obtain' },
  ish: { third: 'wishes', base: 'wish' },
  jna: { third: 'knows', base: 'know' },
  budh: { third: 'understands', base: 'understand' },
  cint: { third: 'thinks', base: 'think' },
  puj: { third: 'worships', base: 'worship' },
  kath: { third: 'tells', base: 'tell' },
  krudh: { third: 'is angry', base: 'are angry', first: 'am angry' },
  bhi: { third: 'fears', base: 'fear' },
  vrdh: { third: 'grows', base: 'grow' },
  shubh: { third: 'shines', base: 'shine' },
  yudh: { third: 'fights', base: 'fight' },
  vrt: { third: 'exists', base: 'exist' },
  shak: { third: 'can', base: 'can' },
  kup: { third: 'gets angry', base: 'get angry' },
  sprsh: { third: 'touches', base: 'touch' },
  yaj: { third: 'worships', base: 'worship' },
  sev: { third: 'serves', base: 'serve' },
  pal: { third: 'protects', base: 'protect' },
  raksh: { third: 'protects', base: 'protect' },
  muc: { third: 'releases', base: 'release' },
  bhaj: { third: 'shares', base: 'share' },
};

export function personNumberEnglish(
  entry: Pick<DhatuEntry, 'id' | 'meaning'>,
  personIndex: number,
  numberIndex: number,
): string {
  const pronoun =
    PERSON_PRONOUNS[personIndex]?.[numberIndex] ?? PERSON_PRONOUNS[0][0];
  const finite = FINITE_BY_ID[(entry.id || '').toLowerCase()];
  if (finite) {
    const verb =
      personIndex === 2 && numberIndex === 0 && finite.first
        ? finite.first
        : personIndex === 0 && numberIndex === 0
          ? finite.third
          : finite.base;
    return `${pronoun} ${verb}`;
  }
  const gloss = (entry.meaning || '').trim();
  if (!gloss) return pronoun;
  return `${pronoun} (${gloss})`;
}
