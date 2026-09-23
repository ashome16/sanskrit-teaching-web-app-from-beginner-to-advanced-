/**
 * Laṭ (present) 3×3 forms for Dhātupāṭha browser.
 * Thematic gaṇas 1/4/6/10: stem from example 3sg + regular endings.
 * Athematic / irregular: curated school-level tables (wrong forms never invented).
 */
import type { DhatuEntry, DhatuPadam } from '../types/linguistics';

/** One voice table: rows पुरुष (3rd→1st), cols वचन (sg→pl). */
export type LatTable = {
  forms: [[string, string, string], [string, string, string], [string, string, string]];
};

export type LatFormsResult = {
  status: 'ok' | 'coming_soon';
  source: 'generated' | 'curated' | 'none';
  parasmaipada?: LatTable;
  atmanepada?: LatTable;
  note?: string;
};

const PERSON_LABELS = [
  { sa: 'प्रथम पुरुष', en: '3rd person', short: 'प्रथम' },
  { sa: 'मध्यम पुरुष', en: '2nd person', short: 'मध्यम' },
  { sa: 'उत्तम पुरुष', en: '1st person', short: 'उत्तम' },
] as const;

const NUMBER_LABELS = [
  { sa: 'एकवचन', en: 'singular', short: 'ए.व.' },
  { sa: 'द्विवचन', en: 'dual', short: 'द्वि.व.' },
  { sa: 'बहुवचन', en: 'plural', short: 'ब.व.' },
] as const;

export { PERSON_LABELS, NUMBER_LABELS };

/** Thematic Parasmaipada endings (matras for vowel-initial). */
const P_ENDINGS: LatTable['forms'] = [
  ['ति', 'तः', 'न्ति'],
  ['सि', 'थः', 'थ'],
  ['ामि', 'ावः', 'ामः'],
];

/** Thematic Ātmanepada endings. */
const A_ENDINGS: LatTable['forms'] = [
  ['ते', 'ेते', 'न्ते'],
  ['से', 'ेथे', 'ध्वे'],
  ['े', 'ावहे', 'ामहे'],
];

const THEMATIC_GANAS = new Set([1, 4, 6, 10]);

function tableFromStem(stem: string, endings: LatTable['forms']): LatTable {
  return {
    forms: [
      [stem + endings[0][0], stem + endings[0][1], stem + endings[0][2]],
      [stem + endings[1][0], stem + endings[1][1], stem + endings[1][2]],
      [stem + endings[2][0], stem + endings[2][1], stem + endings[2][2]],
    ],
  };
}

function extractThematicStem(example3sg: string): { stem: string; voice: 'P' | 'A' } | null {
  const form = example3sg.trim();
  if (form.endsWith('ति')) return { stem: form.slice(0, -2), voice: 'P' };
  if (form.endsWith('ते')) return { stem: form.slice(0, -2), voice: 'A' };
  return null;
}

function t(
  r0: [string, string, string],
  r1: [string, string, string],
  r2: [string, string, string],
): LatTable {
  return { forms: [r0, r1, r2] };
}

/**
 * Curated Laṭ tables for athematic gaṇas (2, 3, 5, 7, 8, 9) and any
 * thematic root whose examples are incomplete for a full paradigm.
 * School / high-school textbook forms — not a full Pāṇinian engine.
 */
const CURATED: Record<
  string,
  { parasmaipada?: LatTable; atmanepada?: LatTable; note?: string }
> = {
  // —— Gaṇa 2 (adādi) ——
  as: {
    parasmaipada: t(
      ['अस्ति', 'स्तः', 'सन्ति'],
      ['असि', 'स्थः', 'स्थ'],
      ['अस्मि', 'स्वः', 'स्मः'],
    ),
  },
  i: {
    parasmaipada: t(
      ['एति', 'इतः', 'यन्ति'],
      ['एषि', 'इथः', 'इथ'],
      ['एमि', 'इवः', 'इमः'],
    ),
  },
  ad: {
    parasmaipada: t(
      ['अत्ति', 'अत्तः', 'अदन्ति'],
      ['अत्सि', 'अत्थः', 'अत्थ'],
      ['अद्मि', 'अद्वः', 'अद्मः'],
    ),
  },
  ya: {
    parasmaipada: t(
      ['याति', 'यातः', 'यान्ति'],
      ['यासि', 'याथः', 'याथ'],
      ['यामि', 'यावः', 'यामः'],
    ),
  },
  vac: {
    parasmaipada: t(
      ['वक्ति', 'वक्तः', 'वचन्ति'],
      ['वक्षि', 'वक्थः', 'वक्थ'],
      ['वच्मि', 'उच्वः', 'उच्मः'],
    ),
    note: '1st dual/plural use weak stem उच्- (samprasāraṇa).',
  },
  han: {
    parasmaipada: t(
      ['हन्ति', 'हतः', 'घ्नन्ति'],
      ['हंसि', 'हथः', 'हथ'],
      ['हन्मि', 'हन्वः', 'हन्मः'],
    ),
  },
  rud: {
    parasmaipada: t(
      ['रोदिति', 'रुदितः', 'रुदन्ति'],
      ['रोदिषि', 'रुदिथः', 'रुदथ'],
      ['रोदिमि', 'रुदिवः', 'रुदिमः'],
    ),
  },
  bru: {
    parasmaipada: t(
      ['ब्रवीति', 'ब्रूतः', 'ब्रुवन्ति'],
      ['ब्रवीषि', 'ब्रूथः', 'ब्रूथ'],
      ['ब्रवीमि', 'ब्रूवः', 'ब्रूमः'],
    ),
  },
  jagr: {
    parasmaipada: t(
      ['जागर्ति', 'जागृतः', 'जाग्रति'],
      ['जागर्षि', 'जागृथः', 'जागृथ'],
      ['जागर्मि', 'जागृवः', 'जागृमः'],
    ),
  },

  // —— Gaṇa 3 (juhotyādi) ——
  da: {
    parasmaipada: t(
      ['ददाति', 'दत्तः', 'ददति'],
      ['ददासि', 'दत्थः', 'दत्थ'],
      ['ददामि', 'दद्वः', 'दद्मः'],
    ),
    atmanepada: t(
      ['दत्ते', 'ददाते', 'ददते'],
      ['दत्से', 'ददाथे', 'दद्ध्वे'],
      ['ददे', 'दद्वहे', 'दद्महे'],
    ),
  },
  dha: {
    parasmaipada: t(
      ['दधाति', 'धत्तः', 'दधति'],
      ['दधासि', 'धत्थः', 'धत्थ'],
      ['दधामि', 'दध्वः', 'दध्मः'],
    ),
    atmanepada: t(
      ['धत्ते', 'दधाते', 'दधते'],
      ['धत्से', 'दधाथे', 'धद्ध्वे'],
      ['दधे', 'दध्वहे', 'दध्महे'],
    ),
  },
  hu: {
    parasmaipada: t(
      ['जुहोति', 'जुहुतः', 'जुह्वति'],
      ['जुहोषि', 'जुहुथः', 'जुहुथ'],
      ['जुहोमि', 'जुहुवः', 'जुहुमः'],
    ),
  },
  bhi: {
    parasmaipada: t(
      ['बिभेति', 'बिभितः', 'बिभ्यति'],
      ['बिभेषि', 'बिभिथः', 'बिभिथ'],
      ['बिभेमि', 'बिभिवः', 'बिभिमः'],
    ),
  },

  // —— Gaṇa 5 (svādi) ——
  shru: {
    parasmaipada: t(
      ['शृणोति', 'शृणुतः', 'शृण्वन्ति'],
      ['शृणोषि', 'शृणुथः', 'शृणुथ'],
      ['शृणोमि', 'शृणुवः', 'शृणुमः'],
    ),
  },
  shak: {
    parasmaipada: t(
      ['शक्नोति', 'शक्नुतः', 'शक्नुवन्ति'],
      ['शक्नोषि', 'शक्नुथः', 'शक्नुथ'],
      ['शक्नोमि', 'शक्नुवः', 'शक्नुमः'],
    ),
  },
  su: {
    parasmaipada: t(
      ['सुनोति', 'सुनुतः', 'सुन्वन्ति'],
      ['सुनोषि', 'सुनुथः', 'सुनुथ'],
      ['सुनोमि', 'सुनुवः', 'सुनुमः'],
    ),
  },
  ap: {
    parasmaipada: t(
      ['आप्नोति', 'आप्नुतः', 'आप्नुवन्ति'],
      ['आप्नोषि', 'आप्नुथः', 'आप्नुथ'],
      ['आप्नोमि', 'आप्नुवः', 'आप्नुमः'],
    ),
  },

  // —— Gaṇa 7 (rudhādi) ——
  bhanj: {
    parasmaipada: t(
      ['भनक्ति', 'भङ्क्तः', 'भञ्जन्ति'],
      ['भनक्षि', 'भङ्क्थः', 'भङ्क्थ'],
      ['भनज्मि', 'भञ्ज्वः', 'भञ्ज्मः'],
    ),
  },
  chid: {
    parasmaipada: t(
      ['छिनत्ति', 'छिन्तः', 'छिन्दन्ति'],
      ['छिनत्सि', 'छिन्थः', 'छिन्थ'],
      ['छिनद्मि', 'छिन्द्वः', 'छिन्द्मः'],
    ),
    atmanepada: t(
      ['छित्ते', 'छिन्दाते', 'छिन्दते'],
      ['छित्स्रे', 'छिन्दाथे', 'छिद्ध्वे'],
      ['छिन्दे', 'छिन्द्वहे', 'छिन्द्महे'],
    ),
  },
  bhid: {
    parasmaipada: t(
      ['भिनत्ति', 'भिन्तः', 'भिन्दन्ति'],
      ['भिनत्सि', 'भिन्थः', 'भिन्थ'],
      ['भिनद्मि', 'भिन्द्वः', 'भिन्द्मः'],
    ),
    atmanepada: t(
      ['भित्ते', 'भिन्दाते', 'भिन्दते'],
      ['भित्स्रे', 'भिन्दाथे', 'भिद्ध्वे'],
      ['भिन्दे', 'भिन्द्वहे', 'भिन्द्महे'],
    ),
  },
  yuj: {
    parasmaipada: t(
      ['युनक्ति', 'युङ्क्तः', 'युञ्जन्ति'],
      ['युनक्षि', 'युङ्क्थः', 'युङ्क्थ'],
      ['युनज्मि', 'युञ्ज्वः', 'युञ्ज्मः'],
    ),
    atmanepada: t(
      ['युङ्क्ते', 'युञ्जाते', 'युञ्जते'],
      ['युङ्क्षे', 'युञ्जाथे', 'युङ्ग्ध्वे'],
      ['युञ्जे', 'युञ्ज्वहे', 'युञ्ज्महे'],
    ),
  },
  rudh: {
    parasmaipada: t(
      ['रुणद्धि', 'रुन्द्धः', 'रुन्धन्ति'],
      ['रुणत्सि', 'रुन्द्धः', 'रुन्द्ध'],
      ['रुणध्मि', 'रुन्ध्वः', 'रुन्ध्मः'],
    ),
    atmanepada: t(
      ['रुद्धे', 'रुन्धाते', 'रुन्धते'],
      ['रुत्से', 'रुन्धाथे', 'रुद्ध्वे'],
      ['रुन्धे', 'रुन्ध्वहे', 'रुन्ध्महे'],
    ),
  },

  // —— Gaṇa 8 (tanādi) ——
  kr: {
    parasmaipada: t(
      ['करोति', 'कुरुतः', 'कुर्वन्ति'],
      ['करोषि', 'कुरुथः', 'कुरुथ'],
      ['करोमि', 'कुर्वः', 'कुर्मः'],
    ),
    atmanepada: t(
      ['कुरुते', 'कुर्वाते', 'कुर्वते'],
      ['कुरुषे', 'कुर्वाथे', 'कुरुध्वे'],
      ['कुरवे', 'कुर्वहे', 'कुर्महे'],
    ),
  },
  tan: {
    parasmaipada: t(
      ['तनोति', 'तनुतः', 'तन्वन्ति'],
      ['तनोषि', 'तनुथः', 'तनुथ'],
      ['तनोमि', 'तनुवः', 'तनुमः'],
    ),
    atmanepada: t(
      ['तनुते', 'तन्वाते', 'तन्वते'],
      ['तनुषे', 'तन्वाथे', 'तनुध्वे'],
      ['तन्वे', 'तनुवहे', 'तनुमहे'],
    ),
  },

  // —— Gaṇa 9 (kryādi) ——
  jna: {
    parasmaipada: t(
      ['जानाति', 'जानीतः', 'जानन्ति'],
      ['जानासि', 'जानीथः', 'जानीथ'],
      ['जानामि', 'जानीवः', 'जानीमः'],
    ),
  },
  dr: {
    parasmaipada: t(
      ['दृणाति', 'दृणीतः', 'दृणन्ति'],
      ['दृणासि', 'दृणीथः', 'दृणीथ'],
      ['दृणामि', 'दृणीवः', 'दृणीमः'],
    ),
  },
  pu: {
    parasmaipada: t(
      ['पुनाति', 'पुनीतः', 'पुनन्ति'],
      ['पुनासि', 'पुनीथः', 'पुनीथ'],
      ['पुनामि', 'पुनीवः', 'पुनीमः'],
    ),
    atmanepada: t(
      ['पुनीते', 'पुनाते', 'पुनते'],
      ['पुनीषे', 'पुनाथे', 'पुनीध्वे'],
      ['पुने', 'पुनीवहे', 'पुनीमहे'],
    ),
  },
  kri: {
    parasmaipada: t(
      ['क्रीणाति', 'क्रीणीतः', 'क्रीणन्ति'],
      ['क्रीणासि', 'क्रीणीथः', 'क्रीणीथ'],
      ['क्रीणामि', 'क्रीणीवः', 'क्रीणीमः'],
    ),
    atmanepada: t(
      ['क्रीणीते', 'क्रीणाते', 'क्रीणते'],
      ['क्रीणीषे', 'क्रीणाथे', 'क्रीणीध्वे'],
      ['क्रीणे', 'क्रीणीवहे', 'क्रीणीमहे'],
    ),
  },
  grah: {
    parasmaipada: t(
      ['गृह्णाति', 'गृह्णीतः', 'गृह्णन्ति'],
      ['गृह्णासि', 'गृह्णीथः', 'गृह्णीथ'],
      ['गृह्णामि', 'गृह्णीवः', 'गृह्णीमः'],
    ),
    atmanepada: t(
      ['गृह्णीते', 'गृह्णाते', 'गृह्णते'],
      ['गृह्णीषे', 'गृह्णाथे', 'गृह्णीध्वे'],
      ['गृह्णे', 'गृह्णीवहे', 'गृह्णीमहे'],
    ),
  },
  ash: {
    parasmaipada: t(
      ['अश्नाति', 'अश्नीतः', 'अश्नन्ति'],
      ['अश्नासि', 'अश्नीथः', 'अश्नीथ'],
      ['अश्नामि', 'अश्नीवः', 'अश्नीमः'],
    ),
  },
};

/** Fix a few curated Ātmanepada 2sg forms that use -से not -स्रे. */
function normalizeCurated(): void {
  // छिद् / भिद् 2sg A is छित्से / भित्से in school books
  if (CURATED.chid?.atmanepada) {
    CURATED.chid.atmanepada.forms[1][0] = 'छित्से';
  }
  if (CURATED.bhid?.atmanepada) {
    CURATED.bhid.atmanepada.forms[1][0] = 'भित्से';
  }
  // रुध् 2du P should be रुन्द्धः already; 2sg A रुत्से ok
}

normalizeCurated();

function voicesForPadam(padam: DhatuPadam | undefined): { wantP: boolean; wantA: boolean } {
  if (padam === 'atmanepada') return { wantP: false, wantA: true };
  if (padam === 'ubhayapada') return { wantP: true, wantA: true };
  // default / parasmaipada
  return { wantP: true, wantA: false };
}

function generateThematic(entry: DhatuEntry): LatFormsResult | null {
  const gana = entry.gana ?? entry.class;
  if (gana == null || !THEMATIC_GANAS.has(gana)) return null;

  const examples = entry.examples ?? [];
  const first = examples[0];
  if (!first) return null;

  const extracted = extractThematicStem(first);
  if (!extracted || !extracted.stem) return null;

  const { stem } = extracted;
  const { wantP, wantA } = voicesForPadam(entry.padam);

  const result: LatFormsResult = {
    status: 'ok',
    source: 'generated',
  };

  if (wantP) result.parasmaipada = tableFromStem(stem, P_ENDINGS);
  if (wantA) result.atmanepada = tableFromStem(stem, A_ENDINGS);

  // Sanity: generated 3sg P should match example when padam is P or U
  if (wantP && result.parasmaipada && extracted.voice === 'P') {
    const got = result.parasmaipada.forms[0][0];
    if (got !== first.trim()) {
      return {
        status: 'coming_soon',
        source: 'none',
        note: `Stem check failed for ${entry.id ?? entry.devanagari} (${got} ≠ ${first}).`,
      };
    }
  }
  if (wantA && !wantP && result.atmanepada && extracted.voice === 'A') {
    const got = result.atmanepada.forms[0][0];
    if (got !== first.trim()) {
      return {
        status: 'coming_soon',
        source: 'none',
        note: `Stem check failed for ${entry.id ?? entry.devanagari} (${got} ≠ ${first}).`,
      };
    }
  }

  return result;
}

/**
 * Resolve Laṭ 3×3 tables for a library entry.
 * Prefer curated overrides; else thematic generation for gaṇas 1/4/6/10.
 */
export function getLatForms(entry: DhatuEntry): LatFormsResult {
  const id = entry.id?.trim();
  if (id && CURATED[id]) {
    const c = CURATED[id];
    const { wantP, wantA } = voicesForPadam(entry.padam);
    const result: LatFormsResult = {
      status: 'ok',
      source: 'curated',
      note: c.note,
    };
    if (wantP && c.parasmaipada) result.parasmaipada = c.parasmaipada;
    if (wantA && c.atmanepada) result.atmanepada = c.atmanepada;
    // Ubhayapada missing A table → still show P; note coming for the other
    if (wantP && !result.parasmaipada && wantA && !result.atmanepada) {
      return { status: 'coming_soon', source: 'none', note: c.note };
    }
    if (!result.parasmaipada && !result.atmanepada) {
      return { status: 'coming_soon', source: 'none', note: c.note };
    }
    return result;
  }

  const generated = generateThematic(entry);
  if (generated && generated.status === 'ok') return generated;

  return {
    status: 'coming_soon',
    source: 'none',
    note: 'Full Laṭ table for this root is coming soon — we only show forms we trust for students.',
  };
}

/** Coverage helper for tests / Phase reports. */
export function summarizeLatCoverage(entries: DhatuEntry[]): {
  total: number;
  withTables: number;
  comingSoon: number;
  generated: number;
  curated: number;
} {
  let withTables = 0;
  let comingSoon = 0;
  let generated = 0;
  let curated = 0;
  for (const e of entries) {
    const r = getLatForms(e);
    if (r.status === 'ok' && (r.parasmaipada || r.atmanepada)) {
      withTables += 1;
      if (r.source === 'generated') generated += 1;
      if (r.source === 'curated') curated += 1;
    } else {
      comingSoon += 1;
    }
  }
  return { total: entries.length, withTables, comingSoon, generated, curated };
}
