/**
 * Reusable VVM class study packs (notes + printable worksheet + interactive quiz).
 * Add later classes (7–11) under the same keying: '7', '8', … or '11-pcm' / '11-pcb'.
 */

export type VvmPackClassId = 6 | 7 | 8 | 9 | 10 | 11;
export type VvmPackStream = 'pcm' | 'pcb';

export interface VvmNoteBullet {
  label?: string;
  text: string;
}

export interface VvmNoteBlock {
  heading: string;
  intro?: string;
  bullets?: VvmNoteBullet[];
  paragraphs?: string[];
}

export interface VvmNoteModule {
  id: string;
  title: string;
  blocks: VvmNoteBlock[];
}

export interface VvmWorksheetBlank {
  number: number;
  prompt: string;
  answer: string;
}

export interface VvmWorksheetMatchRow {
  number: number;
  left: string;
  key: string;
  right: string;
}

export interface VvmWorksheetProblem {
  number: number;
  label?: string;
  prompt: string;
  answer: string;
}

export interface VvmQuizOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface VvmQuizQuestion {
  number: number;
  prompt: string;
  options: VvmQuizOption[];
  correct: 'A' | 'B' | 'C' | 'D';
  hint: string;
  /** Explanation body only — the page adds "Correct!" or "Not quite…" */
  explanation: string;
}

export interface VvmClassPack {
  classId: VvmPackClassId;
  stream?: VvmPackStream;
  title: string;
  path: string;
  aliases: string[];
  notes: {
    title: string;
    modules: VvmNoteModule[];
  };
  worksheet: {
    title: string;
    intro: string;
    blanks: VvmWorksheetBlank[];
    match: {
      title: string;
      rows: VvmWorksheetMatchRow[];
    };
    problems: VvmWorksheetProblem[];
  };
  quiz: {
    title: string;
    questions: VvmQuizQuestion[];
  };
}

export const VVM_CLASS_PACKS: Record<string, VvmClassPack> = {
  '6': {
    classId: 6,
    title: 'Class 6 VVM Study Notes, Interactive Quiz, and Printable Worksheet Pack',
    path: '/vvm/class-6/',
    aliases: ['/vvm-class-6', '/vvm-class-6/', '/vvm/class-6'],
    notes: {
      title: 'Class 6 Quick-Revision Study Notes',
      modules: [
        {
          id: 'module-1',
          title: '1. Indian Contributions to Science (Module 1)',
          blocks: [
            {
              heading: 'Zero & Place-Value System',
              paragraphs: [
                'Ancient Indian mathematicians introduced Shunya (zero) both as a placeholder and an independent number, enabling the modern 10-digit decimal system.',
              ],
            },
            {
              heading: 'Harappan Engineering (c. 2600–1900 BCE)',
              bullets: [
                {
                  label: 'Standardized Bricks',
                  text: 'Fired mud bricks strictly followed a 1 : 2 : 4 ratio (thickness : width : length) — the same as 4 : 2 : 1 (length : breadth : thickness) — across cities like Mohenjo-daro, Harappa, and Lothal.',
                },
                {
                  label: 'Waterproofing & Drainage',
                  text: 'Covered street drains with inspection manholes; the Great Bath was sealed using gypsum mortar and natural bitumen.',
                },
                {
                  label: 'Weights & Measures',
                  text: 'Cubical chert stone weights progressed in binary ratios (1, 2, 4, 8, 16, 32, 64) and then decimal multiples.',
                },
              ],
            },
            {
              heading: 'Traditional Water Harvesting',
              paragraphs: [
                'Stepwells (Baolis / Vavs) stored groundwater in arid regions, while South Indian Eris (interconnected tank cascades) prevented floods and irrigated farms.',
              ],
            },
          ],
        },
        {
          id: 'module-2',
          title: '2. Tri-Shakti — Three Women Pioneers of Indian Science (Module 2)',
          blocks: [
            {
              heading: 'Anna Mani (1918–2001) — "Weather Woman of India"',
              bullets: [
                {
                  text: 'Researched the spectroscopy of diamonds and rubies under C.V. Raman at IISc Bengaluru.',
                },
                {
                  text: "Standardized over 100 meteorological instruments in India and built India's first ozonesonde (1964) to measure atmospheric ozone.",
                },
              ],
            },
            {
              heading: 'Asima Chatterjee (1917–2006) — Medicinal Chemistry Pioneer',
              bullets: [
                {
                  text: 'First woman to receive a Doctorate of Science (D.Sc.) from an Indian university (University of Calcutta, 1944).',
                },
                {
                  text: 'Developed Ayush-56 (an anti-epileptic drug from the aquatic fern Marsilea minuta) and anti-malarial compounds from indigenous plants.',
                },
              ],
            },
            {
              heading: 'Rohini Godbole (1952–2024) — Theoretical Particle Physicist',
              bullets: [
                {
                  text: "Professor at IISc Bengaluru who researched subatomic particles, quarks, and the Higgs boson; awarded the Padma Shri (2019) and co-edited Lilavati's Daughters.",
                },
              ],
            },
          ],
        },
        {
          id: 'module-3',
          title: '3. Class 6 Core Science & Maths Essentials (Module 3)',
          blocks: [
            {
              heading: 'Physics',
              bullets: [
                {
                  label: 'Measurement & Motion',
                  text: 'SI unit of length is metre (m); 1 km = 1000 m, 1 m = 100 cm = 1000 mm. Types of motion: rectilinear (straight line), circular (fan blade), and periodic (pendulum/swing).',
                },
                {
                  label: 'Light & Shadows',
                  text: 'Pinhole cameras form upside-down (inverted) real images. Plane mirrors form upright, laterally inverted virtual images at the exact same distance behind the mirror.',
                },
                {
                  label: 'Electricity & Magnets',
                  text: 'Electric current flows only in a closed circuit from the positive (+) to negative (-) terminal (conventional current). Like magnetic poles repel (N–N, S–S); unlike poles attract (N–S).',
                },
              ],
            },
            {
              heading: 'Chemistry',
              bullets: [
                {
                  label: 'Separation Methods',
                  text: 'Winnowing (wind separates light husk from heavy grain), Sieving (different particle sizes), Sedimentation & Decantation (insoluble heavy solids settling in liquid), Evaporation (recovering dissolved salt from water).',
                },
                {
                  label: 'States of Water & Temperature',
                  text: 'Melting (solid → liquid), Evaporation (liquid → gas), Condensation (gas → liquid), Freezing (liquid → solid). Normal human body temperature is 37.0 °C (98.6 °F).',
                },
              ],
            },
            {
              heading: 'Biology',
              bullets: [
                {
                  label: 'Food Nutrients & Tests',
                  text: 'Starch + Iodine → Blue-black; Protein + Copper sulfate & Caustic soda → Violet; Fat on paper → Translucent oily patch.',
                },
                {
                  label: 'Deficiency Diseases',
                  text: 'Vitamin A (Night blindness), Vitamin B₁ (Beriberi), Vitamin C (Scurvy), Vitamin D (Rickets), Iodine (Goitre), Iron (Anaemia).',
                },
                {
                  label: 'Plants',
                  text: 'Plants with reticulate leaf venation usually have taproots (dicots); plants with parallel leaf venation have fibrous roots (monocots).',
                },
              ],
            },
            {
              heading: 'Mathematics',
              bullets: [
                {
                  label: 'Numbers',
                  text: 'Smallest prime number is 2 (the only even prime); 1 is neither prime nor composite.',
                },
                {
                  label: 'Mensuration',
                  text: 'Perimeter of rectangle = 2 × (l + b); Area of rectangle = l × b; Perimeter of square = 4 × side; Area of square = side².',
                },
              ],
            },
          ],
        },
      ],
    },
    worksheet: {
      title: 'Class 6 Practice Worksheet (15 Questions — Printable Format)',
      intro: 'Complete Section A, match the pairs in Section B, then attempt the short application problems in Section C.',
      blanks: [
        {
          number: 1,
          prompt: 'Harappan baked bricks were manufactured in a standard thickness : width : length ratio of __________.',
          answer: '1 : 2 : 4',
        },
        {
          number: 2,
          prompt: '__________ is known as the "Weather Woman of India" and developed India\'s first ozonesonde.',
          answer: 'Anna Mani',
        },
        {
          number: 3,
          prompt: 'A __________ camera forms an inverted image of a bright object on a screen.',
          answer: 'Pinhole',
        },
        {
          number: 4,
          prompt: 'Plants with parallel leaf venation generally possess __________ roots.',
          answer: 'Fibrous',
        },
        {
          number: 5,
          prompt: 'The only even prime number is __________.',
          answer: '2',
        },
      ],
      match: {
        title: 'Section B: Match the Following',
        rows: [
          { number: 1, left: 'Asima Chatterjee', key: 'c', right: 'Anti-epileptic drug Ayush-56' },
          { number: 2, left: 'Winnowing', key: 'e', right: 'Separating husk from grain using wind' },
          { number: 3, left: 'Protein Test', key: 'a', right: 'Violet color with CuSO₄ + NaOH' },
          { number: 4, left: 'Scurvy', key: 'b', right: 'Deficiency of Vitamin C' },
          { number: 5, left: 'Swinging pendulum', key: 'd', right: 'Periodic motion' },
        ],
      },
      problems: [
        {
          number: 1,
          label: 'Physics',
          prompt:
            'Rohan stands 3 m away from a large plane mirror. If he steps 1 m backward away from the mirror, what is the new distance between Rohan and his image?',
          answer: 'New object distance = 3 + 1 = 4 m; image is 4 m behind the mirror, so total distance = 8 m.',
        },
        {
          number: 2,
          label: 'Chemistry',
          prompt:
            'You are given a dry mixture of iron filings, sand, and common salt. Write the three steps in order to separate all three components.',
          answer:
            '(i) Move a magnet over the mixture to remove iron filings; (ii) Add water to dissolve salt and filter out insoluble sand; (iii) Evaporate the filtrate to recover common salt.',
        },
        {
          number: 3,
          label: 'Biology',
          prompt: 'Why do desert plants like cacti have leaves modified into spines and thick green stems?',
          answer:
            'Spines reduce water loss through transpiration, while the thick green stem performs photosynthesis and stores water.',
        },
        {
          number: 4,
          label: 'Maths',
          prompt: 'A square park has a perimeter of 100 m. Find the length of one side and the total area of the park.',
          answer: 'Side = 100 ÷ 4 = 25 m; Area = 25 × 25 = 625 m².',
        },
        {
          number: 5,
          label: 'Logic',
          prompt: 'Find the missing term in the series: 4, 9, 19, 39, 79, ?',
          answer: '159 (Each number is doubled and 1 is added: 79 × 2 + 1 = 159).',
        },
      ],
    },
    quiz: {
      title: 'VVM Prep Quiz: Class 6 Science, Mathematics, Indian Heritage & Reasoning',
      questions: [
        {
          number: 1,
          prompt:
            'In the Indus Valley (Harappan) civilization, bricks used in construction were remarkably uniform in shape and size. What was the standard ratio of the length, breadth, and thickness of Harappan bricks?',
          options: [
            { id: 'A', text: '3 : 2 : 1' },
            { id: 'B', text: '4 : 2 : 1' },
            { id: 'C', text: '2 : 1 : 1' },
            { id: 'D', text: '5 : 3 : 2' },
          ],
          correct: 'B',
          hint: 'Think about multiples of a base unit where the length is twice the breadth, and the breadth is twice the thickness.',
          explanation:
            'Harappan bricks universally maintained a standard dimensional ratio of 4 : 2 : 1 for length, breadth, and thickness.',
        },
        {
          number: 2,
          prompt:
            'Ancient Indian stepwells (known as Baoris or Vavs) in arid regions were architectural marvels designed primarily for which of the following purposes?',
          options: [
            { id: 'A', text: 'Astronomical observation and charting constellations' },
            { id: 'B', text: 'Long-term storage of harvested grains and spices' },
            { id: 'C', text: 'Water harvesting and conservation during dry seasons' },
            { id: 'D', text: 'Conducting royal coronations and musical concerts' },
          ],
          correct: 'C',
          hint: 'Consider semi-arid and dry regions in western India where water retention throughout the year was a matter of survival.',
          explanation:
            'Stepwells reached the subterranean water table and served as dependable community water sources during dry, hot months.',
        },
        {
          number: 3,
          prompt: "Dr. Anna Mani, one of India's pioneering women scientists, made remarkable contributions in which scientific field?",
          options: [
            { id: 'A', text: 'Organic chemistry and plant alkaloids' },
            { id: 'B', text: 'Meteorology and weather instrumentation' },
            { id: 'C', text: 'Theoretical particle physics and high-energy physics' },
            { id: 'D', text: 'Molecular biology and genetics' },
          ],
          correct: 'B',
          hint: 'She worked extensively with the India Meteorological Department (IMD) and helped make India self-reliant in weather-monitoring equipment.',
          explanation:
            'Anna Mani designed, tested, and manufactured numerous meteorological instruments to measure solar radiation, wind, and ozone.',
        },
        {
          number: 4,
          prompt: 'Dr. Asima Chatterjee was a celebrated Indian chemist renowned for her pioneering research on:',
          options: [
            { id: 'A', text: 'Quantum computing algorithms' },
            { id: 'B', text: 'Medicinal chemistry of plant-derived natural products' },
            { id: 'C', text: 'Synthetic plastics and polymers' },
            { id: 'D', text: 'Astrophysics and black hole radiation' },
          ],
          correct: 'B',
          hint: 'She was the first Indian woman to receive a Doctorate of Science from an Indian university for her work on natural plant extracts.',
          explanation: 'Dr. Chatterjee investigated indigenous plants to develop anti-epileptic and anti-malarial drugs.',
        },
        {
          number: 5,
          prompt: 'Which of the following sets of items is strictly required to form a shadow?',
          options: [
            { id: 'A', text: 'A transparent object, a lens, and a wall' },
            { id: 'B', text: 'A source of light, an opaque object, and a screen' },
            { id: 'C', text: 'A translucent object and a plane mirror' },
            { id: 'D', text: 'A source of light and a transparent glass sheet' },
          ],
          correct: 'B',
          hint: 'Ask yourself what blocks the light and where the dark silhouette appears.',
          explanation:
            'A shadow requires a light source, an opaque object to block the light path, and a surface (screen) to catch the shadow.',
        },
        {
          number: 6,
          prompt: 'In the process of preparing tea, which method is most appropriate to separate the used tea leaves from the liquid?',
          options: [
            { id: 'A', text: 'Evaporation' },
            { id: 'B', text: 'Decantation' },
            { id: 'C', text: 'Filtration' },
            { id: 'D', text: 'Winnowing' },
          ],
          correct: 'C',
          hint: 'Think about using a mesh or sieve when pouring your tea into a cup.',
          explanation: 'A strainer or filter paper acts as a barrier that lets the liquid pass through while retaining the solid tea leaves.',
        },
        {
          number: 7,
          prompt: 'Bleeding gums, swollen joints, and slow-healing wounds are classic deficiency symptoms of which vitamin?',
          options: [
            { id: 'A', text: 'Vitamin A' },
            { id: 'B', text: 'Vitamin B1' },
            { id: 'C', text: 'Vitamin C' },
            { id: 'D', text: 'Vitamin D' },
          ],
          correct: 'C',
          hint: 'This vitamin is rich in citrus fruits like oranges, lemons, and amla (Indian gooseberry).',
          explanation: 'Deficiency of Vitamin C causes scurvy, characterized by bleeding gums and slow wound healing.',
        },
        {
          number: 8,
          prompt: 'A rectangular park is 40 meters long and 25 meters wide. What is the total perimeter of the park?',
          options: [
            { id: 'A', text: '65 meters' },
            { id: 'B', text: '130 meters' },
            { id: 'C', text: '1000 square meters' },
            { id: 'D', text: '110 meters' },
          ],
          correct: 'B',
          hint: 'Remember that a rectangle has two lengths and two breadths: Perimeter = 2 × (Length + Breadth).',
          explanation: 'Perimeter of a rectangle = 2 × (Length + Breadth) = 2 × (40 + 25) = 2 × 65 = 130 meters.',
        },
        {
          number: 9,
          prompt: 'Look at the number series: 4, 9, 16, 25, 36, ? What number should come next in the pattern?',
          options: [
            { id: 'A', text: '45' },
            { id: 'B', text: '48' },
            { id: 'C', text: '49' },
            { id: 'D', text: '50' },
          ],
          correct: 'C',
          hint: 'Notice that 4 = 2×2, 9 = 3×3, 16 = 4×4, and so on.',
          explanation:
            'The series represents squares of consecutive integers: 2² (4), 3² (9), 4² (16), 5² (25), 6² (36), followed by 7² = 49.',
        },
        {
          number: 10,
          prompt:
            'In a certain code language, if the word CAT is coded as 3-1-20, how would DOG be coded using the same alphabetical position rule?',
          options: [
            { id: 'A', text: '4-14-6' },
            { id: 'B', text: '4-15-7' },
            { id: 'C', text: '3-14-6' },
            { id: 'D', text: '5-16-8' },
          ],
          correct: 'B',
          hint: 'Count the position of each letter starting from A = 1 up to Z = 26.',
          explanation: 'D is the 4th letter, O is the 15th letter, and G is the 7th letter of the alphabet, giving 4-15-7.',
        },
      ],
    },
  },
};

export function parseVvmClassPackPath(pathname: string): { classId: number } | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const match = clean.match(/^\/vvm\/class-(\d+)$/) || clean.match(/^\/vvm-class-(\d+)$/);
  if (!match) return null;
  const classId = Number(match[1]);
  if (!Number.isInteger(classId) || classId < 6 || classId > 11) return null;
  return { classId };
}

export function getVvmClassPack(classId: number, stream?: VvmPackStream): VvmClassPack | undefined {
  if (stream) {
    const streamed = VVM_CLASS_PACKS[`${classId}-${stream}`];
    if (streamed) return streamed;
  }
  return VVM_CLASS_PACKS[String(classId)];
}

export function vvmClassPackPath(classId: number, hash?: string): string {
  const pack = getVvmClassPack(classId);
  const base = pack?.path ?? `/vvm/class-${classId}/`;
  return hash ? `${base}#${hash}` : base;
}
