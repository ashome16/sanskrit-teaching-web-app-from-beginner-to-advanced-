export interface VedicSutra {
  id: number;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  description: string;
  category: 'multiplication' | 'squaring' | 'subtraction' | 'division' | 'algebra' | 'general';
  example: {
    problem: string;
    steps: string[];
    answer: string;
  };
}

export interface VedicSubSutra {
  id: number;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  application: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  sutraName: string;
  sutraSanskrit: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  quickTrick: string;
}

export const VEDIC_INTRO = {
  title: 'The Magic of Numbers: An Introduction to Vedic Mathematics',
  subtitle: 'An ultra-efficient system of mental calculation enabling solutions 10 to 15 times faster than conventional methods.',
  p1: 'Vedic Mathematics is a unique, ultra-efficient system of mental calculation that allows people to solve complex arithmetic and algebraic problems 10 to 15 times faster than conventional methods. Grounded in a cohesive framework of natural mental processes, this system bypasses tedious scrap work and finger counting to turn math into an engaging, visual game.',
  p2: 'Whether you are a student preparing for competitive exams, a professional looking to sharpen your analytical skills, or someone trying to conquer a lifelong fear of numbers, Vedic Mathematics offers a refreshing approach to numerical fluency.',
  originTitle: 'What is Vedic Mathematics?',
  originText: 'The modern system of Vedic Mathematics was compiled between 1911 and 1918 by Swami Bharati Krishna Tirtha (1884–1960), a brilliant scholar of Sanskrit, mathematics, and philosophy. After spending years deeply analyzing ancient Indian texts, specifically commentaries linked to the Atharva Veda, he reconstructed a unified mathematical architecture. He published his ground-breaking findings in his landmark book, Vedic Mathematics, in 1965.',
  originQuote: 'Unlike standard column-by-column school math, Vedic Mathematics relies on 16 core Sutras (word-formulas) and 13 Sub-Sutras. These short, easy-to-remember Sanskrit aphorisms describe the way the human mind naturally computes numbers. While some modern academics debate the precise historical chronology, none deny their staggering logical efficiency and practical brilliance.',
  benefits: [
    {
      icon: '🛡️',
      title: 'Eradicates Math Phobia',
      desc: 'By replacing rigid, lengthy algorithms with flexible, single-line mental calculations, it transforms math anxiety into creative problem-solving confidence.'
    },
    {
      icon: '🧠',
      title: 'Minimal Memorization',
      desc: 'You only need to know basic single-digit tables up to 9. The elegant sutra formulas handle multi-digit arithmetic dynamically.'
    },
    {
      icon: '⚡',
      title: 'Enhances Brain Agility',
      desc: 'Acts as a workout gym for your mind, sharpening working memory, structural pattern visualization, and hemispheric brain coordination.'
    },
    {
      icon: '✅',
      title: 'Built-in Instant Verification',
      desc: 'Formulas feature rapid cross-checking tools (such as digital roots / बीजाङ्क Beejank) that verify calculation accuracy in under two seconds.'
    }
  ],
  modernTitle: 'From School Classrooms to Quantum Computing & Microchips',
  modernText: 'Today, Vedic Mathematics is experiencing a massive global resurgence. Beyond classroom arithmetic, researchers apply Vedic algorithms to optimize binary microchip multiplier circuits, error detection in cryptography, and digital signal processing (DSP), achieving higher speeds and lower power consumption.'
};

export const VEDIC_ZERO_ESSAY = {
  title: 'The Architecture of Absolute Zero: How Vedic Math Explores the Universal Power of Place Value',
  subtitle: 'Beyond the speed tricks lies the single most revolutionary concept in human history: the positional place-value system and the absolute power of Shunya (Zero).',
  intro: [
    'When people first discover Vedic Mathematics, they are often drawn to its lightning-fast calculations—the clever short-cuts that turn complex multiplication or long division into a five-second mental game. However, focusing purely on these "tricks" misses the architectural masterpiece beneath them.',
    'Vedic Mathematics is not a collection of arbitrary hacks. It is a highly sophisticated, unified philosophy of numbers built upon the single most revolutionary concept in human history: the positional place-value system and the absolute power of zero.',
    'To truly appreciate Vedic Math, one must look past the speed tricks and examine how it utilizes place value as a dynamic, living scaffolding for all universal mathematics.'
  ],
  birthGrid: {
    title: 'The Birth of the Grid: The Greatest Leap in Human Thought',
    paragraphs: [
      'Before the modern system took root, counting was an agonizingly physical chore. Roman numerals (I, V, X, L, C, D, M) were essentially a tally system on paper. Writing a number like 3,888 required fifteen characters: MMMDCCCLXXXVIII. Because these symbols had fixed values regardless of where they stood, performing basic multiplication or division with Roman numerals was so incredibly difficult that it was reserved for specialized mathematical scholars.',
      'The global paradigm shifted when ancient Indian mathematicians conceptualized the decimal place-value system alongside Shunya (Zero / शून्य).',
      'By declaring that a symbol\'s value is entirely dictated by its position, humanity unlocked infinite computational scaling using only ten digits (0–9). In the number 333, the three identical digits represent completely different magnitudes: 300 + 30 + 3. This simple conceptual breakthrough transformed numbers from rigid, static labels into dynamic, fluid entities.'
    ]
  },
  fluidSpace: {
    title: 'The Vedic Approach: Treating Place Value as Fluid Space',
    paragraphs: [
      'While conventional school mathematics treats place value as a rigid set of isolated columns (Units, Tens, Hundreds), Vedic Mathematics treats it as a continuous, fluid continuum. The Sutras allow a mathematician to consciously manipulate positional boundaries to solve problems.',
      'Consider the concept of Simultaneous Processing found in the Vertically and Crosswise (Ūrdhva-Tiryagbhyām) sutra. In conventional long math, we multiply step-by-step, generate fragmented partial products, shift them awkwardly to the left with placeholder zeros, and then add them vertically.',
      'Vedic math skips the scrap work entirely by calculating the units, tens, and hundreds columns simultaneously in parallel.'
    ]
  },
  visualFlow: {
    title: 'The Visual Flow of Positional Columns',
    paragraphs: [
      'When multiplying two 2-digit numbers, the Vedic system maps out a symmetrical dance across positional space. Instead of treating the digits as isolated steps, it visualizes the geometric interaction of the columns all at once.',
      'Instead of treating the place values as static boxes, the Vedic method views them as a unified structural matrix. The carrying over of numbers becomes a smooth, fluid stream rather than a disjointed secondary operation.'
    ]
  },
  algebraEngine: {
    title: 'The Universal Engine of Algebra: Base 10 vs Base x',
    paragraphs: [
      'The most profound proof that Vedic math is a deep conceptual system rather than a bag of tricks is its seamless transition into Algebra.',
      'Universally, arithmetic and algebra are not two distinct subjects—algebra is simply generalized arithmetic. In arithmetic, our place-value base is 10. In algebra, our place-value base is x.',
      'Because the Vedic Sutras operate on the pure structure of positional spacing, the exact same formula used to multiply numbers is used to multiply algebraic polynomials:'
    ],
    comparisonTable: [
      {
        system: 'Arithmetic (Base 10)',
        example: '12 × 13',
        expansion: '(1 · 10 + 2)(1 · 10 + 3)',
        result: '100 + 50 + 6 = 156',
        coefficients: '[1, 5, 6]'
      },
      {
        system: 'Algebra (Base x)',
        example: '(x + 2)(x + 3)',
        expansion: '(1 · x + 2)(1 · x + 3)',
        result: 'x² + 5x + 6',
        coefficients: '[1, 5, 6]'
      }
    ],
    summary: 'Notice the identical coefficient structure (1, 5, 6). Vedic Mathematics recognizes this beautiful, fundamental truth. The system doesn\'t care whether your base column is a concrete ten or an unknown variable x; it maps out the structural space between the components identically. This fluid grasp of place value bridges the gap between basic counting and abstract mathematics effortlessly.'
  },
  globalJourney: {
    title: 'The Global Journey of the Numbers',
    timeline: [
      {
        era: 'Antiquity (India)',
        who: 'Aryabhata & Brahmagupta',
        description: 'Scholars formalized the rules of Zero (शून्य) and refined the decimal notation system in seminal treatises such as Aryabhatiya and Brahmasphutasiddhanta.'
      },
      {
        era: 'The Islamic Golden Age (Middle East)',
        who: 'Muhammad ibn Musa al-Khwarizmi',
        description: 'Studied these Indian astronomical and mathematical texts, translating them into Arabic. His foundational treatise introduced decimal computation to the Western world, and his name gave rise to the term "Algorithm".'
      },
      {
        era: 'The Renaissance (Europe)',
        who: 'Leonardo Fibonacci of Pisa',
        description: 'Encountered the Hindu-Arabic positional system while traveling through North Africa. Recognizing that it was infinitely superior to Roman numerals, he published Liber Abaci in 1202, finally convincing European merchants, scientists, and universities to adopt decimal place value.'
      }
    ]
  },
  conclusion: {
    title: 'Conclusion: A Masterclass in Visual Harmony',
    paragraphs: [
      'Vedic Mathematics is a profound tribute to the universal power of place value. It teaches us that numbers are not clunky items to be stacked and dragged across a page, but values that flow harmoniously through geometric space.',
      'By unlocking the natural patterns inherent in our positional system, Swami Bharati Krishna Tirtha did not just invent a faster way to calculate. He revealed the deep, structural symmetry of numbers—offering a timeless manual for looking at the mathematical universe with absolute clarity.'
    ]
  }
};

export const VEDIC_SUTRAS: VedicSutra[] = [
  {
    id: 1,
    sanskrit: 'एकाधिकेन पूर्वेण',
    transliteration: 'Ekādhikena Pūrveṇa',
    meaning: 'By one more than the previous one',
    description: 'Instant squaring of numbers ending in 5, and division/conversion of fractions whose denominators end in 9 (e.g., 1/19, 1/29).',
    category: 'squaring',
    example: {
      problem: '75²',
      steps: [
        'Identify previous digit: 7',
        'One more than 7 is 8: Left part = 7 × 8 = 56',
        'Square the trailing 5: Right part = 5² = 25',
        'Combine Left and Right parts: 56 | 25'
      ],
      answer: '5,625'
    }
  },
  {
    id: 2,
    sanskrit: 'निखिलं नवतश्चरमं दशतः',
    transliteration: 'Nikhilaṁ Navataścaramaṁ Daśataḥ',
    meaning: 'All from 9 and the last from 10',
    description: 'Lightning subtraction from powers of 10 (100, 1000, 10000) without borrowing, and multiplication of numbers close to base powers (e.g., 96 × 93).',
    category: 'subtraction',
    example: {
      problem: '10,000 − 3,456',
      steps: [
        'Subtract first three digits from 9: (9 − 3 = 6), (9 − 4 = 5), (9 − 5 = 4)',
        'Subtract the last non-zero digit from 10: (10 − 6 = 4)',
        'Write digits seamlessly from left to right: 6, 5, 4, 4'
      ],
      answer: '6,544'
    }
  },
  {
    id: 3,
    sanskrit: 'ऊर्ध्वतिर्यग्भ्याम्',
    transliteration: 'Ūrdhva-Tiryagbhyām',
    meaning: 'Vertically and crosswise',
    description: 'The master universal formula for multiplication of any numbers (2-digit, 3-digit, n-digit), matrix inversion, and polynomial division.',
    category: 'multiplication',
    example: {
      problem: '23 × 45',
      steps: [
        'Step 1 (Vertical Right): 3 × 5 = 15 (write 5, carry 1)',
        'Step 2 (Crosswise): (2 × 5) + (3 × 4) + 1 = 10 + 12 + 1 = 23 (write 3, carry 2)',
        'Step 3 (Vertical Left): (2 × 4) + 2 = 8 + 2 = 10',
        'Combine digits: 10, 3, 5'
      ],
      answer: '1,035'
    }
  },
  {
    id: 4,
    sanskrit: 'परावर्त्य योजयेत्',
    transliteration: 'Parāvartya Yojayet',
    meaning: 'Transpose and apply',
    description: 'Rapid algebraic division when divisor is slightly greater than a base, linear systems, and synthetic division.',
    category: 'division',
    example: {
      problem: 'Solve: 7x − 5 = 2x + 25',
      steps: [
        'Transpose variables to left and constants to right with reversed signs',
        '7x − 2x = 25 + 5',
        '5x = 30 ➔ x = 30 / 5'
      ],
      answer: 'x = 6'
    }
  },
  {
    id: 5,
    sanskrit: 'शून्यं साम्यसमुच्चये',
    transliteration: 'Śūnyaṁ Sāmyasamuccaye',
    meaning: 'When the collection is the same, it is zero',
    description: 'Instant zeroing of algebraic factors when symmetrical terms or sum of roots match across equations.',
    category: 'algebra',
    example: {
      problem: 'Solve (x + 2) + (x + 3) = (x + 1) + (x + 4)',
      steps: [
        'Independent terms sum on LHS: 2 + 3 = 5',
        'Independent terms sum on RHS: 1 + 4 = 5',
        'Since the collection (sum of constants) is identical, x must equate to 0'
      ],
      answer: 'x = 0'
    }
  },
  {
    id: 6,
    sanskrit: '(आनुरूप्ये) शून्यमन्यत्',
    transliteration: '(Ānurūpye) Śūnyamanyat',
    meaning: 'If one is in ratio, the other is zero',
    description: 'Solves simultaneous linear equations where the ratio of coefficients of one variable equals the ratio of constants.',
    category: 'algebra',
    example: {
      problem: '6x + 7y = 8 and 12x + 14y = 16',
      steps: [
        'Observe ratio of coefficients: 6/12 = 7/14 = 8/16 = 1/2',
        'By this sutra, dependent terms balance symmetrically and simplify instantly'
      ],
      answer: 'Parametric solution in constant ratio'
    }
  },
  {
    id: 7,
    sanskrit: 'सङ्कलनव्यवकलनाभ्याम्',
    transliteration: 'Saṅkalana-Vyavakalanābhyām',
    meaning: 'By addition and by subtraction',
    description: 'Solves simultaneous equations where coefficients of x and y are interchanged (e.g., 23x + 17y = 63 and 17x + 23y = 57).',
    category: 'algebra',
    example: {
      problem: '23x + 17y = 63 and 17x + 23y = 57',
      steps: [
        'Add equations: 40x + 40y = 120 ➔ x + y = 3',
        'Subtract equations: 6x − 6y = 6 ➔ x − y = 1',
        'Add simple results: 2x = 4 ➔ x = 2; y = 1'
      ],
      answer: 'x = 2, y = 1'
    }
  },
  {
    id: 8,
    sanskrit: 'पूरणापूरणाभ्याम्',
    transliteration: 'Pūraṇāpūraṇābhyām',
    meaning: 'By the completion or non-completion',
    description: 'Solving quadratic equations and higher powers by completing the square or cube.',
    category: 'algebra',
    example: {
      problem: 'Solve x² + 6x = 16',
      steps: [
        'Complete the square: Add (6/2)² = 9 to both sides',
        'x² + 6x + 9 = 16 + 9 ➔ (x + 3)² = 25',
        'x + 3 = ±5 ➔ x = 2 or −8'
      ],
      answer: 'x = 2, −8'
    }
  },
  {
    id: 9,
    sanskrit: 'चलनकलनाभ्याम्',
    transliteration: 'Calana-Kalanābhyām',
    meaning: 'By calculus (differential) and accumulation',
    description: 'Finding roots of polynomial equations and factoring quadratics using initial derivatives.',
    category: 'algebra',
    example: {
      problem: 'Factor 2x² + 5x + 2',
      steps: [
        'Differentiate with respect to x: 4x + 5',
        'Discriminant Δ = 5² − 4(2)(2) = 25 − 16 = 9. √9 = 3',
        '4x + 5 = ±3 ➔ 4x = −2 or −8 ➔ x = −1/2 or −2'
      ],
      answer: '(2x + 1)(x + 2)'
    }
  },
  {
    id: 10,
    sanskrit: 'यावदूनम्',
    transliteration: 'Yāvadūnam',
    meaning: 'By whatever the extent of its deficiency',
    description: 'Instant squaring of numbers near base powers of 10 (e.g. 97², 93², 106²).',
    category: 'squaring',
    example: {
      problem: '97²',
      steps: [
        'Base = 100. Deficiency d = 100 − 97 = 3',
        'Left part: Subtract deficiency from number = 97 − 3 = 94',
        'Right part: Square of deficiency = 3² = 09 (two digits for base 100)',
        'Combine: 94 | 09'
      ],
      answer: '9,409'
    }
  },
  {
    id: 11,
    sanskrit: 'व्यष्टिसमष्टिः',
    transliteration: 'Vyaṣṭi-Samaṣṭiḥ',
    meaning: 'By specific and general (part and whole)',
    description: 'Used for solving polynomial systems and factoring biquadratics by isolating parts from whole expressions.',
    category: 'algebra',
    example: {
      problem: 'Factoring symmetric polynomials in cyclic terms',
      steps: [
        'Examine individual (vyaṣṭi) symmetry terms against the collective (samaṣṭi) sum',
        'Deduce cyclic factors: (a + b), (b + c), (c + a)'
      ],
      answer: 'Identifies factors without brute expansion'
    }
  },
  {
    id: 12,
    sanskrit: 'शेषाण्यङ्केन चरमेण',
    transliteration: 'Śeṣāṇyaṅkena Carameṇa',
    meaning: 'The remainders by the last digit',
    description: 'Converting rational vulgar fractions into recurring decimals using trailing remainder cycles.',
    category: 'division',
    example: {
      problem: '1/7 decimal expansion',
      steps: [
        'Use the remainder series (3, 2, 6, 4, 5, 1)',
        'Successive multiplication by last digit generates full cycle: 0.142857...'
      ],
      answer: '0.142857...'
    }
  },
  {
    id: 13,
    sanskrit: 'सोपान्त्यद्वयमन्त्यम्',
    transliteration: 'Sopāntyadvayamantyam',
    meaning: 'The ultimate and twice the penultimate',
    description: 'Solves specific fraction equations of the form 1/(AB) + 1/(AC) = 1/(AD) + 1/(BD).',
    category: 'algebra',
    example: {
      problem: '1/(x+2)(x+3) + 1/(x+2)(x+4) = 1/(x+1)(x+4) + 1/(x+1)(x+3)',
      steps: [
        'Apply formula: Penultimate terms + twice ultimate terms = 0',
        'Reduces complex algebraic fractions to a linear 1st-degree equation'
      ],
      answer: 'Solves in 1 line'
    }
  },
  {
    id: 14,
    sanskrit: 'एकन्यूनेन पूर्वेण',
    transliteration: 'Ekanyūnena Pūrveṇa',
    meaning: 'By one less than the previous one',
    description: 'Lightning mental multiplication of any number by a sequence of 9s (e.g. 9, 99, 999, 9999).',
    category: 'multiplication',
    example: {
      problem: '64 × 99',
      steps: [
        'Left part: Subtract 1 from the number (64 − 1 = 63)',
        'Right part: Subtract the left part from 99 (99 − 63 = 36)',
        'Concatenate: 63 | 36'
      ],
      answer: '6,336'
    }
  },
  {
    id: 15,
    sanskrit: 'गुणितासमुच्चयः',
    transliteration: 'Guṇitasamuccayaḥ',
    meaning: 'The product of sums is the sum of products',
    description: 'The famous Beejank (बीजाङ्क) Digital Root check to instantly verify if any multiplication or factorization is correct.',
    category: 'general',
    example: {
      problem: 'Check: 23 × 45 = 1035',
      steps: [
        'Digital root of 23: 2 + 3 = 5',
        'Digital root of 45: 4 + 5 = 9 (or 0)',
        'Product of roots: 5 × 9 = 45 ➔ 4 + 5 = 9',
        'Digital root of answer 1035: 1 + 0 + 3 + 5 = 9',
        'Both match (9 = 9) ➔ Calculation is verified!'
      ],
      answer: 'Verified Correct (Digital Root = 9)'
    }
  },
  {
    id: 16,
    sanskrit: 'गुणकसमुच्चयः',
    transliteration: 'Guṇakasamuccayaḥ',
    meaning: 'The factors of the sum is equal to the sum of factors',
    description: 'Verifying polynomial factorizations by substituting numerical values for variables.',
    category: 'algebra',
    example: {
      problem: 'Verify: (x + 2)(x + 3) = x² + 5x + 6',
      steps: [
        'Set x = 1 in factors: (1 + 2)(1 + 3) = 3 × 4 = 12',
        'Set x = 1 in expansion: 1² + 5(1) + 6 = 1 + 5 + 6 = 12',
        'Both sums match (12 = 12) ➔ Factorization verified!'
      ],
      answer: 'Verified Correct'
    }
  }
];

export const VEDIC_SUBSUTRAS: VedicSubSutra[] = [
  {
    id: 1,
    sanskrit: 'आनुरूप्येण',
    transliteration: 'Ānurūpyeṇa',
    meaning: 'Proportionately',
    application: 'Enables base-multiplication when numbers are near sub-bases like 50 (half of 100) or 200, 300, 500.'
  },
  {
    id: 2,
    sanskrit: 'शिष्यते शेषसंज्ञः',
    transliteration: 'Śiṣyate Śeṣasaṁjñaḥ',
    meaning: 'The remainder remains constant',
    application: 'Used in remainder theorem arithmetic and division modulos.'
  },
  {
    id: 3,
    sanskrit: 'आद्यमाद्येनान्त्यमन्त्येन',
    transliteration: 'Ādyamādyenāntyamantyena',
    meaning: 'First by first and last by last',
    application: 'Determines the first and last terms in algebraic factorizations and quadratic products immediately.'
  },
  {
    id: 4,
    sanskrit: 'केवलैः सप्तकं गुण्यात्',
    transliteration: 'Kevalaiḥ Saptakaṁ Guṇyāt',
    meaning: 'For 7 the multiplicand is 143',
    application: 'Shortcut for decimal conversion cycles involving 7.'
  },
  {
    id: 5,
    sanskrit: 'वेष्टनम्',
    transliteration: 'Veṣṭanam',
    meaning: 'By osculation',
    application: 'Lightning divisibility tests for prime numbers (7, 13, 17, 19, 29, etc.) without performing long division.'
  },
  {
    id: 6,
    sanskrit: 'यावदूनं तावदूनम्',
    transliteration: 'Yāvadūnaṁ Tāvadūnam',
    meaning: 'Lessen by the deficiency',
    application: 'Used for finding cubes of numbers close to a base power of 10 (e.g. 98³).'
  },
  {
    id: 7,
    sanskrit: 'यावदूनं तावदूनीकृत्य वर्गं च योजयेत्',
    transliteration: 'Yāvadūnaṁ Tāvadūnīkṛtya Vargaṁ Ca Yojayet',
    meaning: 'Whatever the extent of deficiency, lessen it by that extent and set up the square',
    application: 'Master sub-formula for squaring numbers near 10, 100, 1000.'
  },
  {
    id: 8,
    sanskrit: 'अन्त्ययोर्दशकेऽपि',
    transliteration: 'Antyayordaśake\'pi',
    meaning: 'When the sum of the final digits is 10 and previous digits are identical',
    application: 'Multiplying numbers like 43 × 47 = 2021, 62 × 68 = 4216, 91 × 99 = 9009.'
  },
  {
    id: 9,
    sanskrit: 'अन्त्ययोरेव',
    transliteration: 'Antyayoreva',
    meaning: 'Only the last terms',
    application: 'Rapidly finding independent constants in complex rational algebraic simplifications.'
  },
  {
    id: 10,
    sanskrit: 'समुच्चयगुणितः',
    transliteration: 'Samuccayaguṇitaḥ',
    meaning: 'The sum of the coefficients into the product',
    application: 'Verifies linear and polynomial expansions.'
  },
  {
    id: 11,
    sanskrit: 'लोपनस्थापनाभ्याम्',
    transliteration: 'Lopanasthāpanābhyām',
    meaning: 'By elimination and retention',
    application: 'Factorizing polynomials of three or more variables by eliminating one variable cyclically.'
  },
  {
    id: 12,
    sanskrit: 'विलोकनम्',
    transliteration: 'Vilokanam',
    meaning: 'By mere observation (inspection)',
    application: 'Solving cubic equations and quadratic forms by recognizing visual symmetry patterns.'
  },
  {
    id: 13,
    sanskrit: 'गुणितसमुच्चयः समुच्चयगुणकः',
    transliteration: 'Guṇitasamuccayaḥ Samuccayaguṇakaḥ',
    meaning: 'The product of the sum is the sum of the products',
    application: 'Advanced verification matrix for multi-variable expansions.'
  }
];

export const VEDIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is 85² using the Sutra Ekādhikena Pūrveṇa?',
    sutraName: 'Ekādhikena Pūrveṇa',
    sutraSanskrit: 'एकाधिकेन पूर्वेण',
    options: ['7,225', '6,425', '7,025', '7,425'],
    correctAnswer: '7,225',
    explanation: 'Left part = 8 × (8 + 1) = 8 × 9 = 72. Right part = 5² = 25. Result = 7,225.',
    quickTrick: '8 × 9 = 72, then append 25!'
  },
  {
    id: 2,
    question: 'Calculate 10,000 − 4,372 using Nikhilaṁ Navataścaramaṁ Daśataḥ:',
    sutraName: 'Nikhilaṁ Navataścaramaṁ Daśataḥ',
    sutraSanskrit: 'निखिलं नवतश्चरमं दशतः',
    options: ['5,628', '5,638', '6,628', '5,728'],
    correctAnswer: '5,628',
    explanation: 'All from 9: (9 − 4 = 5), (9 − 3 = 6), (9 − 7 = 2). Last from 10: (10 − 2 = 8). Result = 5,628.',
    quickTrick: 'Subtract each digit from 9 and the final one from 10 — done in 2 seconds!'
  },
  {
    id: 3,
    question: 'What is 53 × 57 using the Sub-Sutra Antyayordaśake\'pi?',
    sutraName: 'Antyayordaśake\'pi',
    sutraSanskrit: 'अन्त्ययोर्दशकेऽपि',
    options: ['3,021', '2,821', '3,121', '2,921'],
    correctAnswer: '3,021',
    explanation: 'Tens match (5) and units add to 10 (3 + 7 = 10). Left: 5 × (5 + 1) = 30. Right: 3 × 7 = 21. Result = 3,021.',
    quickTrick: '5 × 6 = 30, and 3 × 7 = 21!'
  },
  {
    id: 4,
    question: 'Calculate 48 × 99 using the Sutra Ekanyūnena Pūrveṇa:',
    sutraName: 'Ekanyūnena Pūrveṇa',
    sutraSanskrit: 'एकन्यूनेन पूर्वेण',
    options: ['4,752', '4,852', '4,652', '4,754'],
    correctAnswer: '4,752',
    explanation: 'Left: 48 − 1 = 47. Right: 99 − 47 = 52. Result = 4,752.',
    quickTrick: 'Subtract 1 from 48 ➔ 47; take 99 − 47 ➔ 52!'
  },
  {
    id: 5,
    question: 'What is 96 × 93 using Nikhilaṁ (Base 100)?',
    sutraName: 'Nikhilaṁ Navataścaramaṁ Daśataḥ',
    sutraSanskrit: 'निखिलं नवतश्चरमं दशतः',
    options: ['8,928', '8,828', '9,028', '8,938'],
    correctAnswer: '8,928',
    explanation: 'Deficiencies from 100: 96 is −4, 93 is −7. Left: 96 − 7 = 89. Right: (−4) × (−7) = 28. Result = 8,928.',
    quickTrick: '96 − 7 = 89, 4 × 7 = 28 ➔ 8,928!'
  },
  {
    id: 6,
    question: 'Find 104 × 107 using Vedic Base Multiplication (Surplus over 100):',
    sutraName: 'Nikhilaṁ (Surplus Base)',
    sutraSanskrit: 'निखिलं नवतश्चरमं दशतः',
    options: ['11,128', '11,028', '11,228', '10,928'],
    correctAnswer: '11,128',
    explanation: 'Surplus over 100: +4 and +7. Left: 104 + 7 = 111. Right: 4 × 7 = 28. Result = 11,128.',
    quickTrick: '104 + 7 = 111, and 4 × 7 = 28!'
  }
];
