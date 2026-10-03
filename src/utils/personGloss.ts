/**
 * Person-number English beside each generated tiṅanta.
 * 100 roots use the Laṭ sheet's meaning words, conjugated for person
 * (He/She/It goes; They two go; I am, become). Same line on every lakāra
 * and pada. Other library roots use the same pattern on their stored gloss.
 * No gloss → pronoun only. No roots are added.
 */
import type { DhatuEntry } from '../types/linguistics';

/** Fallback pronouns for roots that are not in the Laṭ sheet. */
export const PERSON_PRONOUNS: readonly [string, string, string][] = [
  ['He/She/It', 'They two', 'They all'],
  ['You (singular)', 'You two', 'You all'],
  ['I', 'We two', 'We all'],
];

/** Pronouns exactly as the 100-root sheet writes them. */
const SHEET_PRONOUNS: readonly [string, string, string][] = [
  ['He/She/It', 'They two', 'They all'],
  ['You (one)', 'You two', 'You all'],
  ['I', 'We two', 'We all'],
];

/** Verb phrase after the pronoun. Keyed by dhatupatha.json id. */
const SHEET_VERB: Record<string, string> = {
  bhu: 'be, become',
  kr: 'do, make',
  gam: 'go',
  path: 'read, study',
  likh: 'write',
  drsh: 'see',
  shru: 'hear',
  vad: 'speak',
  khad: 'eat',
  pa: 'drink',
  stha: 'stand',
  smr: 'remember',
  ni: 'lead, carry',
  pac: 'cook',
  tyaj: 'abandon, leave',
  ji: 'conquer, win',
  has: 'laugh',
  rud: 'cry, weep',
  nrt: 'dance',
  krid: 'play',
  cal: 'move, walk',
  pat: 'fall, fly',
  dhav: 'run',
  vas: 'dwell, live',
  jan: 'be born, produce',
  mr: 'die',
  da: 'give',
  hr: 'take, carry away',
  labh: 'obtain, get',
  ish: 'wish, desire',
  jna: 'know',
  budh: 'understand, wake',
  cint: 'think',
  puj: 'worship, honor',
  kath: 'tell, narrate',
  krudh: 'be angry',
  bhi: 'fear',
  vrdh: 'grow, increase',
  shubh: 'shine',
  yudh: 'fight',
  vrt: 'exist, turn, happen',
  shak: 'be able',
  kup: 'become angry',
  sprsh: 'touch',
  yaj: 'worship, sacrifice',
  sev: 'serve',
  pal: 'protect, nurture',
  raksh: 'protect, guard',
  muc: 'release, free',
  bhaj: 'share, serve, worship',
  as: 'be, exist',
  i: 'go',
  vac: 'speak, say',
  han: 'kill, strike',
  ad: 'eat',
  ya: 'go',
  bru: 'speak, say',
  jagr: 'be awake, wake up',
  dha: 'place, put',
  hu: 'offer, sacrifice (infire)',
  bhr: 'bear, carry, support',
  edh: 'grow, prosper',
  kram: 'step, stride',
  sad: 'sit',
  nam: 'bow, bend',
  gai: 'sing',
  dhyai: 'meditate, contemplate',
  srp: 'creep, crawl',
  tap: 'heat, practice austerity',
  sr: 'flow, move',
  tr: 'cross over',
  car: 'move, wander, practice',
  bhram: 'wander, roam',
  kalp: 'be fit, arrange',
  srj: 'create',
  vish: 'enter',
  tud: 'strike, push',
  kship: 'throw',
  lup: 'cut off, disappear',
  sidh: 'succeed, be accomplished',
  kshudh: 'be hungry',
  div: 'play, gamble, shine',
  push: 'nourish, thrive',
  nash: 'perish, be lost',
  klish: 'suffer, be afflicted',
  bhanj: 'break',
  chid: 'cut',
  bhid: 'split, break',
  yuj: 'join, yoke',
  rudh: 'obstruct, block',
  tan: 'stretch, extend',
  su: 'press out (soma juice)',
  ap: 'obtain, attain',
  dr: 'tear, split',
  pu: 'purify',
  kri: 'buy',
  grah: 'take, seize, grasp',
  ash: 'eat, consume',
  cur: 'steal',
  sprh: 'desire, envy',
};

type Agreement = 'thirdSg' | 'firstSg' | 'base';

function agreementOf(personIndex: number, numberIndex: number): Agreement {
  if (personIndex === 0 && numberIndex === 0) return 'thirdSg';
  if (personIndex === 2 && numberIndex === 0) return 'firstSg';
  return 'base';
}

/** 3rd-singular -s, plus be/have/do/can. */
function thirdSingularWord(word: string): string {
  const lower = word.toLowerCase();
  if (lower === 'be') return 'is';
  if (lower === 'have') return 'has';
  if (lower === 'do') return 'does';
  if (lower === 'can') return word;
  if (/(?:s|x|z|ch|sh|o)$/i.test(word)) return `${word}es`;
  if (/[^aeiou]y$/i.test(word)) return `${word.slice(0, -1)}ies`;
  return `${word}s`;
}

/** One comma-separated sense: "be angry", "study", "sacrifice (infire)". */
function conjugateSense(sense: string, agreement: Agreement): string {
  const bare = sense.trim().replace(/^to\s+/i, '');
  const match = bare.match(/^(\S+)([\s\S]*)$/);
  if (!match) return bare;
  const head = match[1];
  const rest = match[2];
  if (head.toLowerCase() === 'be') {
    const copula = agreement === 'thirdSg' ? 'is' : agreement === 'firstSg' ? 'am' : 'are';
    return `${copula}${rest}`;
  }
  if (head.toLowerCase() === 'can' || agreement !== 'thirdSg') return bare;
  return `${thirdSingularWord(head)}${rest}`;
}

function conjugatePhrase(phrase: string, agreement: Agreement): string {
  return phrase
    .split(',')
    .map((sense) => conjugateSense(sense, agreement))
    .filter((sense) => sense.length > 0)
    .join(', ');
}

export function personNumberEnglish(
  entry: Pick<DhatuEntry, 'id' | 'meaning'>,
  personIndex: number,
  numberIndex: number,
): string {
  const agreement = agreementOf(personIndex, numberIndex);
  const sheet = SHEET_VERB[(entry.id || '').toLowerCase()];
  if (sheet) {
    const pronoun =
      SHEET_PRONOUNS[personIndex]?.[numberIndex] ?? SHEET_PRONOUNS[0][0];
    return `${pronoun} ${conjugatePhrase(sheet, agreement)}`;
  }
  const pronoun =
    PERSON_PRONOUNS[personIndex]?.[numberIndex] ?? PERSON_PRONOUNS[0][0];
  const gloss = (entry.meaning || '').trim();
  if (!gloss) return pronoun;
  return `${pronoun} ${conjugatePhrase(gloss, agreement)}`;
}
