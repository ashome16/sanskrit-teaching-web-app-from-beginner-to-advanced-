/**
 * Person-number English beside each generated tiṅanta.
 * 100 roots use the latest Laṭ sheet (same verb phrase on every person,
 * lakāra, and pada). Roots absent from that sheet keep the stored library
 * gloss, or the pronoun alone when the library has no English.
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

export function personNumberEnglish(
  entry: Pick<DhatuEntry, 'id' | 'meaning'>,
  personIndex: number,
  numberIndex: number,
): string {
  const verb = SHEET_VERB[(entry.id || '').toLowerCase()];
  if (verb) {
    const pronoun =
      SHEET_PRONOUNS[personIndex]?.[numberIndex] ?? SHEET_PRONOUNS[0][0];
    return `${pronoun} ${verb}`;
  }
  const pronoun =
    PERSON_PRONOUNS[personIndex]?.[numberIndex] ?? PERSON_PRONOUNS[0][0];
  const gloss = (entry.meaning || '').trim();
  if (!gloss) return pronoun;
  return `${pronoun} (${gloss})`;
}
