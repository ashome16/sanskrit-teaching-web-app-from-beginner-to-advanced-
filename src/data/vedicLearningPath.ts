/**
 * Numbers → Vedic Maths learning path (Classes 6–8).
 *
 * ONE ordered list shared by the Numbers guide ("Next step") and the Vedic
 * Maths page (path card, sutra-card order, "Step k of N", ← Previous / Next →).
 * It only points at content that already exists in vedicMaths.ts / VedicMaths.tsx.
 *
 * Anchors (all handled by VedicMaths.tsx, also as /vedic-maths#<anchor>):
 *   zero            → "The Numerical Grid & Zero" tab (place value)
 *   sutra-<id>      → that sutra's card on the Sutras tab
 *   solver-<key>    → that interactive solver on the Solvers tab
 */
import { VEDIC_SUTRAS, type VedicSutra } from './vedicMaths';

export type VedicSolverKey = 'ekadhikena' | 'nikhilam-sub' | 'nikhilam-mul' | 'urdhva' | 'ekanyunena' | 'antya' | 'beejank';

export interface VedicPathStep {
  /** URL-hash anchor on /vedic-maths. */
  anchor: string;
  /** VEDIC_SUTRAS id, when the step is a sutra. */
  sutraId?: number;
  title: string;
  sanskrit: string;
  /** One line: what you'll learn. */
  learn: string;
  /** Interactive solver for this sutra, if the site has one. */
  solver?: VedicSolverKey;
}

const sutra = (id: number): VedicSutra => {
  const found = VEDIC_SUTRAS.find((s) => s.id === id);
  if (!found) throw new Error(`Vedic sutra ${id} missing`);
  return found;
};

const sutraStep = (id: number, learn: string, solver?: VedicSolverKey): VedicPathStep => {
  const s = sutra(id);
  return { anchor: `sutra-${id}`, sutraId: id, title: s.transliteration, sanskrit: s.sanskrit, learn, solver };
};

export const VEDIC_LEARNING_PATH: VedicPathStep[] = [
  {
    anchor: 'zero',
    title: 'Place value & complements',
    sanskrit: 'स्थानमानम् · शून्यम्',
    learn: 'Why ४२ means 4 tens + 2, and how far a number is from 10 or 100 — the idea every sutra builds on.',
  },
  sutraStep(1, 'Square any number ending in 5 in seconds (75² = 5625).', 'ekadhikena'),
  sutraStep(2, 'Subtract from 100/1000 and multiply numbers near a base (96 × 93) using complements.', 'nikhilam-mul'),
  sutraStep(3, 'Multiply any two numbers, vertically and crosswise (23 × 45).', 'urdhva'),
  sutraStep(4, '“Transpose and apply”: divide by numbers just above a base and solve simple equations (7x − 5 = 2x + 25).'),
  sutraStep(14, 'Multiply any number by 9, 99 or 999 almost instantly.', 'ekanyunena'),
  sutraStep(10, 'Square numbers close to 10, 100 or 1000 (94², 106²).'),
  sutraStep(12, 'Turn fractions into recurring decimals without long division.'),
];

/** Sutra ids on the path, in path order. */
export const VEDIC_PATH_SUTRA_IDS: number[] = VEDIC_LEARNING_PATH.flatMap((step) =>
  step.sutraId !== undefined ? [step.sutraId] : [],
);

/** 0-based index of an anchor in the path, or -1. */
export const vedicPathIndex = (anchor: string): number =>
  VEDIC_LEARNING_PATH.findIndex((step) => step.anchor === anchor);
