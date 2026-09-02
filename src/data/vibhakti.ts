/**
 * Vibhakti (noun case) reference data shared by the header guide and the Word Analyzer.
 */

export interface VibhaktiCase {
  number: number;
  sanskrit: string;
  iast: string;
  role: string;
  description: string;
  form: string;
  template: string;
}

export const VIBHAKTI_CASES: VibhaktiCase[] = [
  { number: 1, sanskrit: 'प्रथमा', iast: 'Prathamā', role: 'Subject', description: 'Who is doing it', form: 'रामः', template: 'रामः पठति।' },
  { number: 2, sanskrit: 'द्वितीया', iast: 'Dvitīyā', role: 'Object', description: 'Receiving the action', form: 'रामम्', template: 'सीता रामम् पश्यति।' },
  { number: 3, sanskrit: 'तृतीया', iast: 'Tṛtīyā', role: 'Instrument', description: 'By / With something', form: 'रामेण', template: 'रामेण सह गच्छामि।' },
  { number: 4, sanskrit: 'चतुर्थी', iast: 'Caturthī', role: 'Purpose', description: 'For / To someone', form: 'रामाय', template: 'रामाय फलम्।' },
  { number: 5, sanskrit: 'पञ्चमी', iast: 'Pañcamī', role: 'Source', description: 'From somewhere', form: 'रामात्', template: 'रामात् पत्रम्।' },
  { number: 6, sanskrit: 'षष्ठी', iast: 'Ṣaṣṭhī', role: 'Possession', description: "Of / Someone's", form: 'रामस्य', template: 'रामस्य पुस्तकम्।' },
  { number: 7, sanskrit: 'सप्तमी', iast: 'Saptamī', role: 'Location', description: 'In / On / At a place', form: 'रामे', template: 'रामे विश्वासः।' },
  { number: 8, sanskrit: 'सम्बोधन', iast: 'Sambodhana', role: 'Calling', description: 'Speaking to someone', form: 'हे राम', template: 'हे राम, आगच्छ।' },
];

const CASE_NAME_BY_NUMBER: Record<number, string> = Object.fromEntries(
  VIBHAKTI_CASES.map((item) => [item.number, item.iast])
);

/** Formats a raw case value (e.g. 6 or "1/2") into its traditional label, e.g. "6 - Ṣaṣṭhī". */
export const formatCaseLabel = (value: number | string): string => {
  const raw = String(value).trim();
  if (!raw) return raw;

  const names = raw
    .split('/')
    .map((part) => part.trim())
    .map((part) => CASE_NAME_BY_NUMBER[Number(part)] ?? part);

  return `${raw} - ${names.join(' / ')}`;
};
