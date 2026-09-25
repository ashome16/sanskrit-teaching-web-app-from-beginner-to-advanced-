/**
 * Sanskrit Varṇamālā Vector Stroke Paths & Animation Tracing Trajectories
 * Normalized to a [0, 100] x [0, 100] coordinate grid.
 *
 * Ruling Coordinates:
 * - Top roof line (शिरोरेखा): y ≈ 25
 * - Dashed midline: y ≈ 52
 * - Solid baseline: y ≈ 78
 *
 * Enforces authentic Pāṇinian calligraphy:
 * 1. Body curves, loops & stems drawn first.
 * 2. Connecting bars drawn second.
 * 3. Top horizontal roof bar (शिरोरेखा) always drawn last.
 */

export interface StrokePoint {
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
}

export interface AnimatedStrokePath {
  strokeIndex: number; // 1-based index
  label: string;
  points: StrokePoint[];
}

export interface LetterStrokeAnimation {
  letter: string;
  strokes: AnimatedStrokePath[];
}

export const VARNAMALA_STROKE_PATHS: Record<string, LetterStrokeAnimation> = {
  // ==========================================
  // SWARAS (Vowels / स्वराः)
  // ==========================================
  अ: {
    letter: 'अ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Top left C-curve',
        points: [
          { x: 35, y: 34 },
          { x: 42, y: 26 },
          { x: 50, y: 29 },
          { x: 48, y: 46 },
          { x: 40, y: 49 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Bottom left sweeping curve',
        points: [
          { x: 40, y: 49 },
          { x: 52, y: 53 },
          { x: 52, y: 72 },
          { x: 42, y: 78 },
          { x: 30, y: 72 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Middle horizontal connector bar',
        points: [
          { x: 40, y: 49 },
          { x: 64, y: 49 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Vertical standing stem',
        points: [
          { x: 64, y: 25 },
          { x: 64, y: 78 },
        ],
      },
      {
        strokeIndex: 5,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 54, y: 25 },
          { x: 76, y: 25 },
        ],
      },
    ],
  },

  आ: {
    letter: 'आ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Top left C-curve',
        points: [
          { x: 30, y: 34 },
          { x: 37, y: 26 },
          { x: 44, y: 29 },
          { x: 42, y: 46 },
          { x: 34, y: 49 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Bottom left sweeping curve',
        points: [
          { x: 34, y: 49 },
          { x: 46, y: 53 },
          { x: 46, y: 72 },
          { x: 36, y: 78 },
          { x: 25, y: 72 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Middle horizontal connector bar',
        points: [
          { x: 34, y: 49 },
          { x: 56, y: 49 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'First vertical stem',
        points: [
          { x: 56, y: 25 },
          { x: 56, y: 78 },
        ],
      },
      {
        strokeIndex: 5,
        label: 'Second vertical stem (आ-मात्रा)',
        points: [
          { x: 72, y: 25 },
          { x: 72, y: 78 },
        ],
      },
      {
        strokeIndex: 6,
        label: 'Top horizontal roof bar across both stems',
        points: [
          { x: 48, y: 25 },
          { x: 82, y: 25 },
        ],
      },
    ],
  },

  इ: {
    letter: 'इ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Tiny top vertical peg',
        points: [
          { x: 50, y: 25 },
          { x: 50, y: 31 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Top curve turning right',
        points: [
          { x: 50, y: 31 },
          { x: 60, y: 34 },
          { x: 60, y: 44 },
          { x: 50, y: 48 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Bottom S-curve looping down into tail',
        points: [
          { x: 50, y: 48 },
          { x: 38, y: 53 },
          { x: 38, y: 65 },
          { x: 52, y: 69 },
          { x: 47, y: 74 },
          { x: 36, y: 84 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 36, y: 25 },
          { x: 66, y: 25 },
        ],
      },
    ],
  },

  ई: {
    letter: 'ई',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Tiny top vertical peg',
        points: [
          { x: 50, y: 25 },
          { x: 50, y: 31 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Top curve turning right',
        points: [
          { x: 50, y: 31 },
          { x: 60, y: 34 },
          { x: 60, y: 44 },
          { x: 50, y: 48 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Bottom S-curve looping down into tail',
        points: [
          { x: 50, y: 48 },
          { x: 38, y: 53 },
          { x: 38, y: 65 },
          { x: 52, y: 69 },
          { x: 47, y: 74 },
          { x: 36, y: 84 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 36, y: 25 },
          { x: 66, y: 25 },
        ],
      },
      {
        strokeIndex: 5,
        label: 'Upper crest curve (repha antenna)',
        points: [
          { x: 48, y: 25 },
          { x: 52, y: 15 },
          { x: 64, y: 13 },
          { x: 66, y: 20 },
        ],
      },
    ],
  },

  उ: {
    letter: 'उ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Upper left curve',
        points: [
          { x: 38, y: 34 },
          { x: 46, y: 26 },
          { x: 56, y: 30 },
          { x: 52, y: 48 },
          { x: 42, y: 50 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Lower sweeping curve',
        points: [
          { x: 42, y: 50 },
          { x: 58, y: 54 },
          { x: 58, y: 72 },
          { x: 46, y: 78 },
          { x: 32, y: 72 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 32, y: 25 },
          { x: 66, y: 25 },
        ],
      },
    ],
  },

  ऊ: {
    letter: 'ऊ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Upper left curve',
        points: [
          { x: 36, y: 34 },
          { x: 44, y: 26 },
          { x: 54, y: 30 },
          { x: 50, y: 48 },
          { x: 40, y: 50 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Lower sweeping curve',
        points: [
          { x: 40, y: 50 },
          { x: 56, y: 54 },
          { x: 56, y: 72 },
          { x: 44, y: 78 },
          { x: 30, y: 72 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Middle tail curling down and right',
        points: [
          { x: 48, y: 50 },
          { x: 64, y: 52 },
          { x: 68, y: 64 },
          { x: 64, y: 76 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 30, y: 25 },
          { x: 64, y: 25 },
        ],
      },
    ],
  },

  ऋ: {
    letter: 'ऋ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Central vertical stem',
        points: [
          { x: 52, y: 25 },
          { x: 52, y: 78 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Left upward slanted branch',
        points: [
          { x: 52, y: 50 },
          { x: 36, y: 36 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Left downward slanted branch',
        points: [
          { x: 52, y: 50 },
          { x: 36, y: 68 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Right curved loop & hook',
        points: [
          { x: 52, y: 46 },
          { x: 64, y: 46 },
          { x: 68, y: 52 },
          { x: 60, y: 58 },
          { x: 60, y: 72 },
          { x: 68, y: 78 },
        ],
      },
      {
        strokeIndex: 5,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 34, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  ॠ: {
    letter: 'ॠ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Central vertical stem',
        points: [
          { x: 52, y: 25 },
          { x: 52, y: 78 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Left upward slanted branch',
        points: [
          { x: 52, y: 50 },
          { x: 36, y: 36 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Left downward slanted branch',
        points: [
          { x: 52, y: 50 },
          { x: 36, y: 68 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Right first curved loop & hook',
        points: [
          { x: 52, y: 46 },
          { x: 64, y: 46 },
          { x: 68, y: 52 },
          { x: 60, y: 58 },
          { x: 60, y: 70 },
          { x: 68, y: 76 },
        ],
      },
      {
        strokeIndex: 5,
        label: 'Right second doubled bottom curve',
        points: [
          { x: 60, y: 72 },
          { x: 60, y: 84 },
          { x: 68, y: 88 },
        ],
      },
      {
        strokeIndex: 6,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 34, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  ऌ: {
    letter: 'ऌ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left curving spine and loops',
        points: [
          { x: 42, y: 38 },
          { x: 56, y: 38 },
          { x: 56, y: 54 },
          { x: 42, y: 54 },
          { x: 42, y: 74 },
          { x: 58, y: 74 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 34, y: 25 },
          { x: 68, y: 25 },
        ],
      },
    ],
  },

  ए: {
    letter: 'ए',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left vertical stem with inward curved foot',
        points: [
          { x: 40, y: 25 },
          { x: 40, y: 50 },
          { x: 48, y: 56 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right vertical stem angling into diagonal slant',
        points: [
          { x: 58, y: 25 },
          { x: 58, y: 52 },
          { x: 42, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 32, y: 25 },
          { x: 68, y: 25 },
        ],
      },
    ],
  },

  ऐ: {
    letter: 'ऐ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left vertical stem with inward foot',
        points: [
          { x: 40, y: 25 },
          { x: 40, y: 50 },
          { x: 48, y: 56 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right vertical stem and diagonal leg',
        points: [
          { x: 58, y: 25 },
          { x: 58, y: 52 },
          { x: 42, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Slanted top matra arm (ऐ-मात्रा)',
        points: [
          { x: 58, y: 25 },
          { x: 46, y: 12 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 32, y: 25 },
          { x: 68, y: 25 },
        ],
      },
    ],
  },

  ओ: {
    letter: 'ओ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Top left C-curve',
        points: [
          { x: 30, y: 34 },
          { x: 37, y: 26 },
          { x: 44, y: 29 },
          { x: 42, y: 46 },
          { x: 34, y: 49 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Bottom left sweeping curve',
        points: [
          { x: 34, y: 49 },
          { x: 46, y: 53 },
          { x: 46, y: 72 },
          { x: 36, y: 78 },
          { x: 25, y: 72 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Middle horizontal connector bar',
        points: [
          { x: 34, y: 49 },
          { x: 56, y: 49 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'First vertical stem',
        points: [
          { x: 56, y: 25 },
          { x: 56, y: 78 },
        ],
      },
      {
        strokeIndex: 5,
        label: 'Second vertical stem (मात्रा-दण्ड)',
        points: [
          { x: 72, y: 25 },
          { x: 72, y: 78 },
        ],
      },
      {
        strokeIndex: 6,
        label: 'Slanted top matra arm (ओ-मात्रा)',
        points: [
          { x: 72, y: 25 },
          { x: 60, y: 12 },
        ],
      },
      {
        strokeIndex: 7,
        label: 'Top horizontal roof bar across both stems',
        points: [
          { x: 48, y: 25 },
          { x: 82, y: 25 },
        ],
      },
    ],
  },

  औ: {
    letter: 'औ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Top left C-curve',
        points: [
          { x: 30, y: 34 },
          { x: 37, y: 26 },
          { x: 44, y: 29 },
          { x: 42, y: 46 },
          { x: 34, y: 49 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Bottom left sweeping curve',
        points: [
          { x: 34, y: 49 },
          { x: 46, y: 53 },
          { x: 46, y: 72 },
          { x: 36, y: 78 },
          { x: 25, y: 72 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Middle horizontal connector bar',
        points: [
          { x: 34, y: 49 },
          { x: 56, y: 49 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'First vertical stem',
        points: [
          { x: 56, y: 25 },
          { x: 56, y: 78 },
        ],
      },
      {
        strokeIndex: 5,
        label: 'Second vertical stem',
        points: [
          { x: 72, y: 25 },
          { x: 72, y: 78 },
        ],
      },
      {
        strokeIndex: 6,
        label: 'First slanted top matra arm',
        points: [
          { x: 72, y: 25 },
          { x: 58, y: 12 },
        ],
      },
      {
        strokeIndex: 7,
        label: 'Second slanted top matra arm',
        points: [
          { x: 72, y: 25 },
          { x: 68, y: 10 },
        ],
      },
      {
        strokeIndex: 8,
        label: 'Top horizontal roof bar across both stems',
        points: [
          { x: 48, y: 25 },
          { x: 82, y: 25 },
        ],
      },
    ],
  },

  अं: {
    letter: 'अं',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Top left C-curve',
        points: [
          { x: 35, y: 34 },
          { x: 42, y: 26 },
          { x: 50, y: 29 },
          { x: 48, y: 46 },
          { x: 40, y: 49 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Bottom left sweeping curve',
        points: [
          { x: 40, y: 49 },
          { x: 52, y: 53 },
          { x: 52, y: 72 },
          { x: 42, y: 78 },
          { x: 30, y: 72 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Middle horizontal connector bar',
        points: [
          { x: 40, y: 49 },
          { x: 64, y: 49 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Vertical standing stem',
        points: [
          { x: 64, y: 25 },
          { x: 64, y: 78 },
        ],
      },
      {
        strokeIndex: 5,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 54, y: 25 },
          { x: 76, y: 25 },
        ],
      },
      {
        strokeIndex: 6,
        label: 'Anusvāra dot (अनुस्वार-बिन्दु)',
        points: [
          { x: 64, y: 14 },
          { x: 65, y: 14 },
        ],
      },
    ],
  },

  अः: {
    letter: 'अः',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Top left C-curve',
        points: [
          { x: 32, y: 34 },
          { x: 39, y: 26 },
          { x: 47, y: 29 },
          { x: 45, y: 46 },
          { x: 37, y: 49 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Bottom left sweeping curve',
        points: [
          { x: 37, y: 49 },
          { x: 49, y: 53 },
          { x: 49, y: 72 },
          { x: 39, y: 78 },
          { x: 27, y: 72 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Middle horizontal connector bar',
        points: [
          { x: 37, y: 49 },
          { x: 60, y: 49 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Vertical standing stem',
        points: [
          { x: 60, y: 25 },
          { x: 60, y: 78 },
        ],
      },
      {
        strokeIndex: 5,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 50, y: 25 },
          { x: 70, y: 25 },
        ],
      },
      {
        strokeIndex: 6,
        label: 'Upper Visarga dot (विसर्ग-ऊर्ध्व-बिन्दु)',
        points: [
          { x: 78, y: 42 },
          { x: 79, y: 42 },
        ],
      },
      {
        strokeIndex: 7,
        label: 'Lower Visarga dot (विसर्ग-अधो-बिन्दु)',
        points: [
          { x: 78, y: 64 },
          { x: 79, y: 64 },
        ],
      },
    ],
  },

  // ==========================================
  // KA-VARGA (क-वर्गः · Velars)
  // ==========================================
  क: {
    letter: 'क',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Central vertical stem',
        points: [
          { x: 50, y: 25 },
          { x: 50, y: 78 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Left closed circular belly loop',
        points: [
          { x: 50, y: 50 },
          { x: 38, y: 40 },
          { x: 28, y: 50 },
          { x: 38, y: 62 },
          { x: 50, y: 52 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right curling wing hook',
        points: [
          { x: 50, y: 50 },
          { x: 64, y: 40 },
          { x: 72, y: 52 },
          { x: 68, y: 68 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 24, y: 25 },
          { x: 76, y: 25 },
        ],
      },
    ],
  },

  ख: {
    letter: 'ख',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left hooked curve dropping into flat baseline',
        points: [
          { x: 36, y: 32 },
          { x: 46, y: 32 },
          { x: 46, y: 50 },
          { x: 32, y: 60 },
          { x: 32, y: 76 },
          { x: 48, y: 76 },
          { x: 64, y: 76 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Central enclosed belly circle',
        points: [
          { x: 52, y: 58 },
          { x: 44, y: 52 },
          { x: 44, y: 66 },
          { x: 52, y: 68 },
          { x: 52, y: 58 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right vertical stem',
        points: [
          { x: 64, y: 25 },
          { x: 64, y: 78 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 28, y: 25 },
          { x: 76, y: 25 },
        ],
      },
    ],
  },

  ग: {
    letter: 'ग',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left short stem with curled-up bottom knot',
        points: [
          { x: 40, y: 25 },
          { x: 40, y: 64 },
          { x: 34, y: 66 },
          { x: 32, y: 60 },
          { x: 40, y: 60 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right full vertical stem',
        points: [
          { x: 60, y: 25 },
          { x: 60, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 28, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  घ: {
    letter: 'घ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Upper left curve',
        points: [
          { x: 38, y: 34 },
          { x: 46, y: 30 },
          { x: 52, y: 42 },
          { x: 46, y: 50 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Lower left curve sweeping up to stem',
        points: [
          { x: 46, y: 50 },
          { x: 54, y: 56 },
          { x: 48, y: 70 },
          { x: 38, y: 70 },
          { x: 62, y: 70 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 30, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  ङ: {
    letter: 'ङ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Tiny top vertical peg',
        points: [
          { x: 50, y: 25 },
          { x: 50, y: 31 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'S-curve body',
        points: [
          { x: 50, y: 31 },
          { x: 58, y: 35 },
          { x: 56, y: 46 },
          { x: 42, y: 54 },
          { x: 44, y: 68 },
          { x: 56, y: 72 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right nasal dot (बिन्दु)',
        points: [
          { x: 68, y: 54 },
          { x: 69, y: 54 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 36, y: 25 },
          { x: 68, y: 25 },
        ],
      },
    ],
  },

  // ==========================================
  // CHA-VARGA (च-वर्गः · Palatals)
  // ==========================================
  च: {
    letter: 'च',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Middle horizontal start bar',
        points: [
          { x: 32, y: 50 },
          { x: 48, y: 50 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Bottom dipping curve connecting to vertical stem',
        points: [
          { x: 48, y: 50 },
          { x: 38, y: 64 },
          { x: 46, y: 72 },
          { x: 62, y: 62 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 26, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  छ: {
    letter: 'छ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Upper left curve',
        points: [
          { x: 36, y: 34 },
          { x: 46, y: 30 },
          { x: 52, y: 42 },
          { x: 44, y: 48 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Lower loop curling up into terminal knot',
        points: [
          { x: 44, y: 48 },
          { x: 54, y: 54 },
          { x: 48, y: 72 },
          { x: 36, y: 72 },
          { x: 46, y: 56 },
          { x: 52, y: 60 },
          { x: 46, y: 62 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top small vertical connector peg',
        points: [
          { x: 48, y: 25 },
          { x: 48, y: 34 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 30, y: 25 },
          { x: 66, y: 25 },
        ],
      },
    ],
  },

  ज: {
    letter: 'ज',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Leftward open cup curve',
        points: [
          { x: 32, y: 46 },
          { x: 32, y: 66 },
          { x: 46, y: 74 },
          { x: 54, y: 62 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Horizontal connector bar',
        points: [
          { x: 54, y: 52 },
          { x: 64, y: 52 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right vertical stem',
        points: [
          { x: 64, y: 25 },
          { x: 64, y: 78 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 26, y: 25 },
          { x: 76, y: 25 },
        ],
      },
    ],
  },

  झ: {
    letter: 'झ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Tiny top vertical peg',
        points: [
          { x: 42, y: 25 },
          { x: 42, y: 30 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Top curve turning right',
        points: [
          { x: 42, y: 30 },
          { x: 50, y: 34 },
          { x: 50, y: 44 },
          { x: 42, y: 48 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Bottom S-curve looping down into tail',
        points: [
          { x: 42, y: 48 },
          { x: 34, y: 52 },
          { x: 34, y: 64 },
          { x: 42, y: 68 },
          { x: 38, y: 74 },
          { x: 30, y: 82 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Middle horizontal connector bar',
        points: [
          { x: 42, y: 52 },
          { x: 64, y: 52 },
        ],
      },
      {
        strokeIndex: 5,
        label: 'Right vertical stem',
        points: [
          { x: 64, y: 25 },
          { x: 64, y: 78 },
        ],
      },
      {
        strokeIndex: 6,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 30, y: 25 },
          { x: 76, y: 25 },
        ],
      },
    ],
  },

  ञ: {
    letter: 'ञ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left crescent backward curve',
        points: [
          { x: 42, y: 34 },
          { x: 32, y: 46 },
          { x: 36, y: 64 },
          { x: 46, y: 70 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Middle horizontal connector bar',
        points: [
          { x: 42, y: 52 },
          { x: 64, y: 52 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right vertical stem',
        points: [
          { x: 64, y: 25 },
          { x: 64, y: 78 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 28, y: 25 },
          { x: 76, y: 25 },
        ],
      },
    ],
  },

  // ==========================================
  // TA-VARGA (ट-वर्गः · Retroflexes)
  // ==========================================
  ट: {
    letter: 'ट',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Tiny top vertical peg',
        points: [
          { x: 50, y: 25 },
          { x: 50, y: 34 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Large round open cup curve',
        points: [
          { x: 50, y: 34 },
          { x: 62, y: 40 },
          { x: 62, y: 66 },
          { x: 48, y: 76 },
          { x: 36, y: 72 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 32, y: 25 },
          { x: 68, y: 25 },
        ],
      },
    ],
  },

  ठ: {
    letter: 'ठ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Tiny top vertical peg',
        points: [
          { x: 50, y: 25 },
          { x: 50, y: 34 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Full symmetrical circular loop',
        points: [
          { x: 50, y: 34 },
          { x: 64, y: 42 },
          { x: 64, y: 66 },
          { x: 50, y: 76 },
          { x: 36, y: 66 },
          { x: 36, y: 42 },
          { x: 50, y: 34 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 32, y: 25 },
          { x: 68, y: 25 },
        ],
      },
    ],
  },

  ड: {
    letter: 'ड',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Tiny top vertical peg',
        points: [
          { x: 50, y: 25 },
          { x: 50, y: 32 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'S-curve body',
        points: [
          { x: 50, y: 32 },
          { x: 60, y: 36 },
          { x: 58, y: 48 },
          { x: 44, y: 54 },
          { x: 44, y: 68 },
          { x: 58, y: 74 },
          { x: 48, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 34, y: 25 },
          { x: 68, y: 25 },
        ],
      },
    ],
  },

  ढ: {
    letter: 'ढ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Tiny top vertical peg',
        points: [
          { x: 50, y: 25 },
          { x: 50, y: 34 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Cup curve curling inward into small terminal loop',
        points: [
          { x: 50, y: 34 },
          { x: 62, y: 40 },
          { x: 62, y: 66 },
          { x: 46, y: 76 },
          { x: 36, y: 70 },
          { x: 44, y: 58 },
          { x: 50, y: 62 },
          { x: 44, y: 64 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 32, y: 25 },
          { x: 68, y: 25 },
        ],
      },
    ],
  },

  ण: {
    letter: 'ण',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left tall U-shaped loop',
        points: [
          { x: 38, y: 25 },
          { x: 38, y: 66 },
          { x: 46, y: 72 },
          { x: 50, y: 66 },
          { x: 50, y: 25 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right vertical stem',
        points: [
          { x: 64, y: 25 },
          { x: 64, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 30, y: 25 },
          { x: 76, y: 25 },
        ],
      },
    ],
  },

  // ==========================================
  // TA-VARGA (त-वर्गः · Dentals)
  // ==========================================
  त: {
    letter: 'त',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left curved arch dropping down',
        points: [
          { x: 60, y: 50 },
          { x: 42, y: 50 },
          { x: 38, y: 58 },
          { x: 38, y: 78 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right vertical stem',
        points: [
          { x: 60, y: 25 },
          { x: 60, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 32, y: 25 },
          { x: 72, y: 25 },
        ],
      },
    ],
  },

  थ: {
    letter: 'थ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Top-left loop curling into curved dip and baseline',
        points: [
          { x: 36, y: 36 },
          { x: 42, y: 30 },
          { x: 40, y: 42 },
          { x: 34, y: 46 },
          { x: 44, y: 56 },
          { x: 48, y: 74 },
          { x: 62, y: 74 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar over stem (loop left unroofed)',
        points: [
          { x: 54, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  द: {
    letter: 'द',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Tiny top vertical peg',
        points: [
          { x: 48, y: 25 },
          { x: 48, y: 34 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Curved arch with downward hooked tail',
        points: [
          { x: 48, y: 34 },
          { x: 60, y: 40 },
          { x: 60, y: 56 },
          { x: 46, y: 62 },
          { x: 42, y: 68 },
          { x: 54, y: 82 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 34, y: 25 },
          { x: 68, y: 25 },
        ],
      },
    ],
  },

  ध: {
    letter: 'ध',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Top-left curled loop with upper curve',
        points: [
          { x: 38, y: 34 },
          { x: 42, y: 28 },
          { x: 40, y: 38 },
          { x: 48, y: 44 },
          { x: 44, y: 50 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Bottom curve leading to vertical stem',
        points: [
          { x: 44, y: 50 },
          { x: 52, y: 56 },
          { x: 46, y: 72 },
          { x: 38, y: 72 },
          { x: 62, y: 72 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar over stem (loop left unroofed)',
        points: [
          { x: 54, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  न: {
    letter: 'न',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left triangular loop and horizontal connector',
        points: [
          { x: 36, y: 54 },
          { x: 30, y: 60 },
          { x: 36, y: 66 },
          { x: 40, y: 60 },
          { x: 62, y: 60 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 26, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  // ==========================================
  // PA-VARGA (प-वर्गः · Labials)
  // ==========================================
  प: {
    letter: 'प',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left corner cup curve',
        points: [
          { x: 40, y: 25 },
          { x: 40, y: 56 },
          { x: 46, y: 62 },
          { x: 62, y: 62 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 30, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  फ: {
    letter: 'फ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left corner cup curve',
        points: [
          { x: 40, y: 25 },
          { x: 40, y: 56 },
          { x: 46, y: 62 },
          { x: 52, y: 62 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Central vertical stem',
        points: [
          { x: 52, y: 25 },
          { x: 52, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right hanging hook tail',
        points: [
          { x: 52, y: 50 },
          { x: 66, y: 42 },
          { x: 72, y: 54 },
          { x: 68, y: 74 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 30, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  ब: {
    letter: 'ब',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Central belly loop',
        points: [
          { x: 58, y: 48 },
          { x: 44, y: 38 },
          { x: 36, y: 48 },
          { x: 44, y: 64 },
          { x: 58, y: 54 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Diagonal cross slash cutting through belly',
        points: [
          { x: 40, y: 42 },
          { x: 54, y: 60 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right vertical stem',
        points: [
          { x: 58, y: 25 },
          { x: 58, y: 78 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 28, y: 25 },
          { x: 72, y: 25 },
        ],
      },
    ],
  },

  भ: {
    letter: 'भ',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Top-left loop and left stem with bottom knot',
        points: [
          { x: 40, y: 32 },
          { x: 44, y: 26 },
          { x: 42, y: 38 },
          { x: 42, y: 58 },
          { x: 34, y: 62 },
          { x: 34, y: 68 },
          { x: 44, y: 68 },
          { x: 62, y: 68 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar over stem (head left unroofed)',
        points: [
          { x: 54, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  म: {
    letter: 'म',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left vertical stem with bottom triangle loop',
        points: [
          { x: 40, y: 25 },
          { x: 40, y: 60 },
          { x: 32, y: 64 },
          { x: 32, y: 70 },
          { x: 42, y: 70 },
          { x: 62, y: 70 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 28, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  // ==========================================
  // ANTASTHA & USHMANA (य, र, ल, व, श, ष, स, ह)
  // ==========================================
  य: {
    letter: 'य',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left curve leading into bottom scoop to stem',
        points: [
          { x: 40, y: 32 },
          { x: 46, y: 28 },
          { x: 48, y: 40 },
          { x: 42, y: 50 },
          { x: 40, y: 62 },
          { x: 50, y: 70 },
          { x: 62, y: 70 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 28, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  र: {
    letter: 'र',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Top crescent hook',
        points: [
          { x: 42, y: 28 },
          { x: 52, y: 28 },
          { x: 54, y: 42 },
          { x: 46, y: 48 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Diagonal tail kicking down-left',
        points: [
          { x: 46, y: 48 },
          { x: 36, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 32, y: 25 },
          { x: 64, y: 25 },
        ],
      },
    ],
  },

  ल: {
    letter: 'ल',
    strokes: [
      {
        strokeIndex: 1,
        label: 'First bottom-left scoop',
        points: [
          { x: 36, y: 70 },
          { x: 42, y: 58 },
          { x: 48, y: 64 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Second arch curving up to meet right stem',
        points: [
          { x: 48, y: 64 },
          { x: 46, y: 46 },
          { x: 56, y: 46 },
          { x: 62, y: 58 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 28, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  व: {
    letter: 'व',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left belly loop',
        points: [
          { x: 58, y: 48 },
          { x: 44, y: 38 },
          { x: 36, y: 48 },
          { x: 44, y: 64 },
          { x: 58, y: 54 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Right vertical stem',
        points: [
          { x: 58, y: 25 },
          { x: 58, y: 78 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 28, y: 25 },
          { x: 72, y: 25 },
        ],
      },
    ],
  },

  श: {
    letter: 'श',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Curled head loop and diagonal leg',
        points: [
          { x: 40, y: 32 },
          { x: 44, y: 26 },
          { x: 42, y: 38 },
          { x: 48, y: 42 },
          { x: 40, y: 52 },
          { x: 34, y: 76 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Middle connector arm',
        points: [
          { x: 42, y: 52 },
          { x: 62, y: 52 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar over stem (loop left unroofed)',
        points: [
          { x: 54, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  ष: {
    letter: 'ष',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left corner cup curve',
        points: [
          { x: 40, y: 25 },
          { x: 40, y: 56 },
          { x: 46, y: 62 },
          { x: 62, y: 62 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Diagonal slash cutting through cup',
        points: [
          { x: 42, y: 34 },
          { x: 58, y: 62 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 30, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  स: {
    letter: 'स',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Left curve and diagonal leg (र body)',
        points: [
          { x: 42, y: 28 },
          { x: 50, y: 28 },
          { x: 52, y: 42 },
          { x: 44, y: 48 },
          { x: 36, y: 78 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Middle horizontal connector bridge',
        points: [
          { x: 44, y: 52 },
          { x: 62, y: 52 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Right vertical stem',
        points: [
          { x: 62, y: 25 },
          { x: 62, y: 78 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 30, y: 25 },
          { x: 74, y: 25 },
        ],
      },
    ],
  },

  ह: {
    letter: 'ह',
    strokes: [
      {
        strokeIndex: 1,
        label: 'Tiny top vertical peg',
        points: [
          { x: 48, y: 25 },
          { x: 48, y: 32 },
        ],
      },
      {
        strokeIndex: 2,
        label: 'Upper S-curve hook',
        points: [
          { x: 48, y: 32 },
          { x: 58, y: 36 },
          { x: 56, y: 48 },
          { x: 44, y: 54 },
          { x: 42, y: 60 },
          { x: 52, y: 60 },
        ],
      },
      {
        strokeIndex: 3,
        label: 'Lower sickle curve swinging out to bottom right',
        points: [
          { x: 44, y: 54 },
          { x: 38, y: 66 },
          { x: 54, y: 78 },
          { x: 60, y: 74 },
        ],
      },
      {
        strokeIndex: 4,
        label: 'Top horizontal roof bar (शिरोरेखा)',
        points: [
          { x: 34, y: 25 },
          { x: 68, y: 25 },
        ],
      },
    ],
  },
};

/**
 * Get stroke animation data for a specific Sanskrit letter.
 * Falls back to default 'अ' if letter is not present.
 */
export function getLetterStrokeAnimation(letter: string): LetterStrokeAnimation {
  if (VARNAMALA_STROKE_PATHS[letter]) {
    return VARNAMALA_STROKE_PATHS[letter];
  }
  // Fallback
  return VARNAMALA_STROKE_PATHS['अ'];
}

/**
 * Interpolates points along a polyline to create smooth 60fps animations.
 * Uses Catmull-Rom or cubic spline subdivision for silky-smooth curves.
 */
export function interpolateStrokePoints(
  points: StrokePoint[],
  stepsPerSegment: number = 14
): StrokePoint[] {
  if (points.length <= 1) return points;
  if (points.length === 2) {
    // Linear subdivision
    const result: StrokePoint[] = [];
    const p0 = points[0];
    const p1 = points[1];
    for (let i = 0; i <= stepsPerSegment; i++) {
      const t = i / stepsPerSegment;
      result.push({
        x: p0.x + (p1.x - p0.x) * t,
        y: p0.y + (p1.y - p0.y) * t,
      });
    }
    return result;
  }

  // Multi-point Catmull-Rom spline interpolation
  const interpolated: StrokePoint[] = [];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    for (let step = 0; step < stepsPerSegment; step++) {
      const t = step / stepsPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;

      // Catmull-Rom spline formula
      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);

      const y =
        0.5 *
        (2 * p1.y +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

      interpolated.push({ x, y });
    }
  }

  // Include final point
  interpolated.push(points[points.length - 1]);
  return interpolated;
}
