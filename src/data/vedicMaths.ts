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

export interface VedicSubSutraProblem {
  id: string;
  question: string;
  hint: string;
  answer: string;
  acceptedAnswers?: string[];
  solutionSteps: string[];
  explanation: string;
}

export interface VedicSubSutraWorksheet {
  subSutraId: number;
  title: string;
  titleSa: string;
  level: 'Prāthamika (Beginner)' | 'Madhyama (Intermediate)' | 'Prauḍha (Advanced)';
  targetTimeMinutes: number;
  description: string;
  problems: VedicSubSutraProblem[];
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

export interface GuruParamparaMember {
  id: string;
  name: string;
  sanskritName: string;
  role: string;
  period: string;
  imageIcon: string;
  badge: string;
  description: string;
  keyContributions: string[];
  quote?: string;
}

/** Diagrams rendered by VedicArticleFigure.tsx (clean HTML/SVG, no ASCII art). */
export type VedicArticleFigureId =
  | 'algebra-lineage'
  | 'algebra-three-phases'
  | 'additive-vs-positional'
  | 'place-value-156'
  | 'base-10-to-base-x'
  | 'dhana-rna-number-line'
  | 'brahmagupta-sign-rules'
  | 'cross-signs'
  | 'samikarana-balance'
  | 'transposition-steps'
  | 'manu-weight-chain'
  | 'weight-tables-compared'
  | 'gem-weight-units'
  | 'diamond-grading'
  | 'touchstone-streaks'
  | 'indus-weights'
  | 'coin-compared'
  | 'manu-time-chain'
  | 'panchanga-compared'
  | 'named-powers-three'
  | 'vakyapadiya-semantic-net';

export interface VedicArticleSection {
  title: string;
  sanskritTitle?: string;
  /** Opens a new "Part" of a multi-part article before this section. */
  part?: { label: string; sanskritTitle?: string; title: string; subtitle: string };
  paragraphs: string[];
  /** Diagram shown after the paragraphs. */
  figure?: VedicArticleFigureId;
  highlight?: string;
  /** Site deep links (/vedic-maths#<anchor>) shown under the section. */
  links?: { anchor: string; label: string }[];
  /** End-of-part pull quote and 🎯 takeaways (multi-part articles). */
  quote?: string;
  takeaways?: string[];
  /** Tap-to-hear Sanskrit terms (Devanagari voiced via playPronunciation, IAST beside it). */
  terms?: { sa: string; iast: string; gloss: string }[];
}

export interface VedicArticle {
  id: string;
  slug: string;
  title: string;
  sanskritTitle: string;
  subtitle: string;
  readingTime: string;
  badge: string;
  sections: VedicArticleSection[];
  quote?: string;
  /** Article-level takeaways; may be empty when each part carries its own. */
  keyTakeaways: string[];
  /** Series links shown at the top ("← Prequel: …") and end ("Next: … →"). */
  prequel?: { id: string; label: string };
  next?: { id: string; label: string };
}

export const GURU_PARAMPARA: GuruParamparaMember[] = [
  {
    id: 'swamiji',
    name: 'Jagadguru Swami Bharati Krishna Tirtha',
    sanskritName: 'जगद्गुरु स्वामी भारतीकृष्णतीर्थ',
    role: '143rd Shankaracharya of Govardhan Math, Puri · Reconstructor of Vedic Mathematics',
    period: '1884 – 1960',
    imageIcon: '🕉️',
    badge: 'The Pioneer & Reconstructor',
    description:
      'A towering polymath who held master’s degrees in seven diverse subjects (including Sanskrit, Philosophy, Mathematics, History, and English). Between 1911 and 1918, Swamiji entered deep solitary meditation (tapasya) in the forests surrounding Sringeri. Immersed in the Parishishta (appendices) of the Atharva Veda, he uncovered and reconstructed the 16 core Sutras and 13 Sub-Sutras, revealing a unified computational philosophy.',
    keyContributions: [
      'Reconstructed the complete 16 Sutras & 13 Sub-Sutras after 8 years of intensive tapasya (1911–1918).',
      'Authored 16 exhaustive volumes detailing higher arithmetic, algebra, spherical trigonometry, and calculus.',
      'When the original 16 manuscripts were tragically lost, he rewrote the foundational introductory volume in his twilight years despite failing health and eyesight.',
      'Conducted a historic tour of the United States in 1958, addressing world universities on self-realization and Vedic science.',
      'Established Govardhan Math as a center for Vedic scientific rejuvenation.'
    ],
    quote: 'All mathematics is an organic whole, and the 16 Sutras are the natural pathways along which human intelligence naturally flows.'
  },
  {
    id: 'manjula',
    name: 'Srimati Manjula Trivedi',
    sanskritName: 'श्रीमती मञ्जुला त्रिवेदी',
    role: 'Devoted Disciple & Custodian of the Sole Surviving Manuscript',
    period: 'Mid-20th Century',
    imageIcon: '📜',
    badge: 'The Guardian of the Flame',
    description:
      'Swamiji’s devoted disciple who played the single most critical historical role in preserving Vedic Mathematics for humanity. When Swamiji’s health declined in Mumbai, she lovingly transcribed his spoken dictations, safeguarded the sole surviving handwritten manuscript with fierce devotion, and navigated its posthumous publication.',
    keyContributions: [
      'Faithfully transcribed Swamiji\'s final spoken dictations and mathematical proofs during his illness.',
      'Secured and preserved the single remaining introductory manuscript after 16 original volumes were lost.',
      'Coordinated the landmark 1965 publication through Motilal Banarsidass Publishers in collaboration with Banaras Hindu University.',
      'Penned the foundational historical preface documenting Swamiji\'s life, sadhana, and the miraculous survival of the work.'
    ],
    quote: 'Without her selfless devotion, this monumental wisdom would have been lost forever to the sands of time.'
  },
  {
    id: 'dr-puri',
    name: 'Dr. Narinder Puri',
    sanskritName: 'डॉ. नरिन्दर पुरी',
    role: 'Former Professor of Civil Engineering, University of Roorkee (IIT Roorkee)',
    period: 'Late 20th Century',
    imageIcon: '🏛️',
    badge: 'The Academic Torchbearer',
    description:
      'A prominent disciple of Swamiji and a distinguished professor of Civil Engineering at Roorkee. Dr. Puri was instrumental in taking Vedic Mathematics out of spiritual hermitages and directly into mainstream academic lecture halls, engineering faculties, and scientific conferences during the 1980s.',
    keyContributions: [
      'Delivered hundreds of national and international university lectures proving the mathematical rigor of Vedic Sutras.',
      'Demonstrated that Vedic matrix operations and Urdhva-Tiryagbhyam drastically cut computational steps in structural engineering mechanics.',
      'Trained thousands of school and college educators across India, igniting modern Vedic math pedagogy.',
      'Published early applied research on Vedic algorithms in numerical computing.'
    ]
  },
  {
    id: 'williams-glover',
    name: 'Kenneth Williams & James Glover',
    sanskritName: 'केनेथ विलियम्स एवं जेम्स ग्लोवर',
    role: 'British Mathematicians, Authors & International Educators',
    period: '1970s – Present',
    imageIcon: '🌍',
    badge: 'The Global Expansionists',
    description:
      'Encountering Swamiji\'s 1965 book in London, these British mathematicians recognized its universal psychological and pedagogical truth. They authored structured introductory and school textbook series, introduced Vedic Mathematics to classrooms across the UK, Europe, Australia, and North America, and founded global research symposiums.',
    keyContributions: [
      'Authored classic textbooks: "Discover Vedic Mathematics", "Vedic Mathematics for Schools" (Vols 1–3), and research on astronomy.',
      'Integrated Vedic mental math into British curricula, showing that it dramatically boosts student confidence in GCSE and A-Level exams.',
      'Established international online teacher training certifications, graduating educators from over 40 countries.'
    ]
  },
  {
    id: 'modern-gurukuls',
    name: 'Modern Researchers & EdNet Learn Gurukul',
    sanskritName: 'आधुनिक-संशोधकाः एवं एडनेट लर्न गुरुकुलम्',
    role: 'Digital Educators, Computer Architects & Cryptography Engineers',
    period: '21st Century · Today',
    imageIcon: '💻',
    badge: 'The Modern Digital Renaissance',
    description:
      'Today, Vedic Mathematics powers interactive digital learning platforms and cutting-edge VLSI (Very Large Scale Integration) microchip designs. Computer architects apply Urdhva-Tiryagbhyam and Nikhilam to build ultrafast, low-power binary multiplier circuits in AI processors, digital signal processors (DSP), and cryptographic hardware.',
    keyContributions: [
      'Design of high-speed Vedic multiplier chips in VLSI hardware, reducing gate latency and power consumption.',
      'Interactive digital Gurukuls (such as EdNet Learn) offering gamified mental math to millions of CBSE and global students.',
      'Eradicating math anxiety worldwide by cultivating holistic mental pattern recognition.'
    ]
  }
];

export const VEDIC_ARTICLES: VedicArticle[] = [
  {
    id: 'magic-intro',
    slug: 'magic-of-numbers',
    title: 'The Magic of Numbers: An Introduction to Vedic Mathematics',
    sanskritTitle: '॥ सङ्ख्यानां विस्मयः वैदिक-गणित-परिचयश्च ॥',
    subtitle: 'An ultra-efficient system of mental calculation enabling solutions 10 to 15 times faster than conventional methods.',
    readingTime: '5 min read',
    badge: 'Foundations & Overview',
    sections: [
      {
        title: 'Beyond Scrap Work: Math as an Engaging Mental Game',
        paragraphs: [
          'Vedic Mathematics is a unique, ultra-efficient system of mental calculation that allows people to solve complex arithmetic and algebraic problems 10 to 15 times faster than conventional methods.',
          'Grounded in a cohesive framework of natural mental processes, this system bypasses tedious scrap work, endless scratchpad margins, and finger counting to turn math into an engaging, visual game.',
          'Whether you are a student preparing for competitive exams (CBSE, JEE, CAT, Olympiads), a professional looking to sharpen your analytical skills, or someone trying to conquer a lifelong fear of numbers, Vedic Mathematics offers a refreshing approach to numerical fluency.'
        ],
        highlight: 'Vedic Math does not teach memorized tricks; it awakens the human mind’s natural ability to recognize geometric symmetry in numbers.'
      },
      {
        title: 'The Modern Resurgence of an Ancient Science',
        paragraphs: [
          'The modern system of Vedic Mathematics was compiled between 1911 and 1918 by Swami Bharati Krishna Tirtha (1884–1960), a brilliant scholar of Sanskrit, mathematics, and philosophy.',
          'After spending years deeply analyzing ancient Indian texts—specifically commentaries linked to the Atharva Veda Parishishta—he reconstructed a unified mathematical architecture. He published his ground-breaking findings in his landmark book, Vedic Mathematics, in 1965.',
          'Unlike standard column-by-column school math, Vedic Mathematics relies on 16 core Sutras (word-formulas) and 13 Sub-Sutras. These short, easy-to-remember Sanskrit aphorisms describe the way the human mind naturally computes numbers.'
        ]
      },
      {
        title: 'The Four Cognitive Pillars of Vedic Math',
        paragraphs: [
          '1. Eradicates Math Phobia: By replacing rigid, lengthy algorithms with flexible, single-line mental calculations, it transforms math anxiety into creative problem-solving confidence.',
          '2. Minimal Memorization: You only need to know basic single-digit tables up to 9. The elegant sutra formulas handle multi-digit arithmetic dynamically.',
          '3. Enhances Brain Agility: Acts as a workout gym for your mind, sharpening working memory, structural pattern visualization, and hemispheric brain coordination.',
          '4. Built-in Instant Verification: Formulas feature rapid cross-checking tools (such as digital roots / बीजाङ्क Beejank) that verify calculation accuracy in under two seconds.'
        ]
      }
    ],
    quote: 'Unlike standard classroom math, this system relies on 16 core Sutras that describe the way the human mind naturally processes numbers, honoring a traditional Indian insight: that absolute truth, whether spiritual or mathematical, is inherently simple and harmonious.',
    keyTakeaways: [
      'Calculations run 10–15× faster than standard school methods.',
      'Only requires basic multiplication tables up to 9 × 9.',
      'Built-in instant proof checking using Digital Roots (Beejank).'
    ]
  },
  {
    id: 'birth-grid',
    slug: 'birth-of-the-grid',
    title: 'The Birth of the Grid: The Greatest Leap in Human Thought',
    sanskritTitle: '॥ ग्रिड-व्यवस्थायाः जन्म स्थानमानस्य च प्रभावः ॥',
    subtitle: 'The Evolution of the Numerical Grid, the Roman numeral tally crisis, and the revolutionary power of Decimal Place-Value & Shunya (Zero).',
    readingTime: '7 min read',
    badge: 'Historical Evolution',
    sections: [
      {
        title: 'The Agony of Roman Numerals: A Fixed Tally System',
        paragraphs: [
          'Before the modern system took root, counting was an agonizingly physical chore. Roman numerals (I, V, X, L, C, D, M) were essentially a tally system on paper.',
          'Writing a number like 3,888 required fifteen characters: MMMDCCCLXXXVIII. Because these symbols had fixed values regardless of where they stood, performing basic multiplication or division with Roman numerals was so incredibly difficult that it was reserved for specialized mathematical scholars and abacus masters.',
          'In a tally system, symbols cannot interact dynamically. Every operation required cumbersome manual decomposition, making large-scale scientific computation virtually impossible.'
        ],
        highlight: 'Writing 3,888 in Roman numerals consumed 15 characters (MMMDCCCLXXXVIII). In the Indian decimal system, it takes just 4 digits.'
      },
      {
        title: 'The Indian Breakthrough: Decimal Place-Value & Shunya (Zero)',
        paragraphs: [
          'The global paradigm shifted when ancient Indian mathematicians conceptualized the decimal place-value system alongside Shunya (Zero / शून्य).',
          'By declaring that a symbol\'s value is entirely dictated by its position on a grid, humanity unlocked infinite computational scaling using only ten digits (0–9).',
          'In the number 333, the three identical digits represent completely different magnitudes: 300 + 30 + 3. This simple conceptual breakthrough transformed numbers from rigid, static labels into dynamic, fluid entities.'
        ]
      },
      {
        title: 'The Global Transmission of the Numerical Grid',
        paragraphs: [
          'The mathematical architecture we take for granted today traveled an immense historical distance to reach us:',
          '• Antiquity (India): Scholars like Aryabhata and Brahmagupta formalized the rules of Zero (शून्य) and refined the decimal notation system in seminal treatises such as Aryabhatiya and Brahmasphutasiddhanta.',
          '• The Islamic Golden Age (Middle East): Persian mathematician Muhammad ibn Musa al-Khwarizmi studied these Indian texts, translating them into Arabic. His foundational treatise introduced decimal computation to the Western world, giving us the word "Algorithm", derived from his own name.',
          '• The Renaissance (Europe): Italian mathematician Leonardo Fibonacci discovered this positional system while traveling through North Africa. Recognizing that it was infinitely superior to Roman numerals, he published Liber Abaci in 1202, finally convincing European merchants, scientists, and universities to adopt the Hindu-Arabic numeral system.'
        ]
      }
    ],
    quote: 'By declaring that a symbol\'s value is entirely dictated by its position, ancient Indian mathematicians unlocked infinite computational scaling with just ten digits.',
    keyTakeaways: [
      'Roman numerals were static tallies without positional multiplication scaling.',
      'The Indian discovery of Shunya (Zero) and place-value allowed numbers to scale infinitely.',
      'Traveled through Aryabhata → Al-Khwarizmi (Algorithm) → Fibonacci (Liber Abaci).'
    ]
  },
  {
    id: 'fluid-space',
    slug: 'fluid-space-simultaneous-processing',
    title: 'The Vedic Approach: Treating Place Value as Fluid Space',
    sanskritTitle: '॥ स्थानमानस्य सातत्यं युगपत्-प्रक्रिया च ॥',
    subtitle: 'Beyond rigid classroom columns: How simultaneous parallel processing in Ūrdhva-Tiryagbhyām transforms calculation into a visual dance.',
    readingTime: '6 min read',
    badge: 'Cognitive Architecture',
    sections: [
      {
        title: 'Rigid School Columns vs. Continuous Fluid Space',
        paragraphs: [
          'While conventional school mathematics treats place value as a rigid set of isolated columns (Units, Tens, Hundreds), Vedic Mathematics treats it as a continuous, fluid continuum.',
          'Grounded in a framework that allows people to solve complex arithmetic 10 to 15 times faster than conventional methods, this system bypasses tedious scrap work to turn math into an engaging, visual game.',
          'The system\'s Sutras allow a mathematician to consciously manipulate positional boundaries to solve problems effortlessly.'
        ],
        highlight: 'School math forces you into isolated vertical silos. Vedic math treats place value as an open geometric playground.'
      },
      {
        title: 'Simultaneous Parallel Processing in Ūrdhva-Tiryagbhyām',
        paragraphs: [
          'Consider the concept of Simultaneous Processing found in the Vertically and Crosswise (Ūrdhva-Tiryagbhyām) sutra.',
          'In conventional long math, we multiply step-by-step, generate fragmented partial products, shift them awkwardly to the left with placeholder zeros, and then add them vertically.',
          'Vedic math skips the scrap work entirely by calculating the units, tens, and hundreds columns simultaneously in parallel.'
        ]
      },
      {
        title: 'The Symmetrical Dance across Positional Space',
        paragraphs: [
          'When multiplying two 2-digit numbers, the Vedic system maps out a symmetrical dance across positional space. Instead of treating the digits as isolated steps, it visualizes the geometric interaction of the columns all at once.',
          'Instead of treating the place values as static boxes, the Vedic method views them as a unified structural matrix. The carrying over of numbers becomes a smooth, fluid stream rather than a disjointed secondary operation.'
        ]
      }
    ],
    quote: 'Instead of treating place values as static boxes, the Vedic method views them as a unified structural matrix where carries flow like water.',
    keyTakeaways: [
      'Eliminates multiple rows of fragmented partial products.',
      'Calculates units, tens, and hundreds simultaneously in parallel.',
      'Direct one-line mental answers with flowing single-stream carries.'
    ]
  },
  {
    id: 'roots-of-algebra',
    slug: 'roots-of-algebra',
    title: 'The Roots of Algebra',
    sanskritTitle: '॥ बीजगणितस्य मूलानि ॥',
    subtitle:
      'A prequel in four parts: from the Śulba altar-builders to the variable, from place value and śūnya to negative numbers, and from a ledger of facts to the balanced equation.',
    readingTime: '14 min read',
    badge: 'Prequel · Roots of Algebra',
    sections: [
      // ---------------------------------------------------------------- PART 1
      {
        part: {
          label: 'Part 1',
          title: 'The Genesis of Unknowns: The Ancient Quest for the Variable',
          subtitle:
            'Before algebra became generalized arithmetic, it was the sacred science of measuring the infinite through the finite.',
        },
        title: 'The Geometric Womb of the Variable',
        paragraphs: [
          'Before symbols like x or y existed, how did ancient minds calculate what they could not see? The earliest algebra was not written in letters at all. It was laid out in geometric configurations: lengths, areas and shapes that stood in for the quantities being sought.',
          'Fire Altars (Śulba Sūtras): In Vedic India, the Śulba Sūtras of Baudhāyana, Āpastamba and Kātyāyana (composed roughly between 800 and 200 BCE) gave rope-and-peg rules for constructing sacrificial altars (vedi, citi) with exact shapes and areas.',
          'The spatial dilemma: A priest might need to enlarge an altar’s area by a precise amount while keeping its shape unchanged. The best-known case is the falcon altar (śyenaciti): its first construction covers 7½ square puruṣa, and each later construction adds one square puruṣa while keeping the falcon’s exact proportions, so every length has to grow by a precise square-root factor.',
          'The birth of the unknown: The Śulba texts solve this with geometric constructions (combining and transforming squares and rectangles, as in Baudhāyana’s diagonal rule and his approximation of √2), not with symbolic equations. Read through a modern lens, though, they already treat an unknown side as a scalable entity: a length whose size is not yet known but is fully fixed by the proportion it must satisfy. That reading is our interpretation, not the texts’ own vocabulary.',
        ],
        highlight: 'Geometry was the physical vessel; algebra was the hidden code waiting to break free.',
      },
      {
        title: 'The Shift from Rhetoric to Symbolism',
        paragraphs: [
          'Over thousands of years, algebra moved through three linguistic phases:',
          '1. Rhetorical (Egypt and Babylon): Problems and solutions were written entirely in words. The famous line “A quantity and its seventh, added together, become nineteen” is Egyptian: Problem 24 of the Rhind Mathematical Papyrus (c. 1550 BCE), one of the “aha” (heap) problems. Babylonian scribes were just as rhetorical, stating even quadratic problems as step-by-step verbal recipes on clay tablets.',
          '2. Syncopated (Greece and India): Words were shortened into abbreviations. Diophantus of Alexandria (c. 3rd century CE) used a syncopated notation for a single unknown. Indian algebraists took the decisive step for several unknowns: Brahmagupta (628 CE, Brāhmasphuṭasiddhānta) prescribes varṇa (“colours”) to name different unknowns. The first unknown was called yāvat-tāvat (“as many as”, written yā), and the others kālaka (black, kā), nīlaka (blue, nī), pītaka (yellow, pī) and so on. Bhāskara II (1150 CE, Bījagaṇita) systematized this notation.',
          '3. Symbolic (modern Europe): François Viète used letters for both unknowns and given quantities (1591), and René Descartes (1637) fixed the x, y, z convention we still use.',
        ],
        figure: 'algebra-three-phases',
        highlight:
          'India did not invent abbreviation alone (Diophantus had it too). Its distinct gift was a clean, scalable notation for many unknowns at once: yā, kā, nī, pī, the ancestors of x, y, z.',
      },
      {
        title: 'What’s in a Name: बीजगणित',
        paragraphs: [
          'In Sanskrit, algebra is बीजगणित (bījagaṇita), literally “seed-computation”: the unknown is a seed (बीज, bīja) whose value sprouts when the equation is solved.',
          'Indian texts, Bhāskara II’s among them, also call it अव्यक्त-गणित (avyakta-gaṇita), “computation with the unmanifest”, meaning unknown quantities. Its partner is व्यक्त-गणित (vyakta-gaṇita), computation with manifest (known) numbers: the arithmetic of his Līlāvatī.',
        ],
        quote:
          'Geometry gave algebra its initial physical form; language gave it a voice; but it was the concept of the positional variable that gave it a soul.',
        takeaways: [
          'The earliest “unknowns” lived inside geometry, in constructions like the Śulba Sūtras’ altar enlargements.',
          'Algebra moved from words (Egypt, Babylon) to abbreviations (Diophantus; Brahmagupta and Bhāskara II) to symbols (Viète, Descartes).',
          'Indian algebraists pioneered naming many unknowns at once through colour names (yā, kā, nī, pī).',
        ],
      },
      // ---------------------------------------------------------------- PART 2
      {
        part: {
          label: 'Part 2',
          sanskritTitle: '॥ अङ्कगणित-सेतुः ॥',
          title: 'The Positional Bridge: How the Zero Unlocked Abstract Space',
          subtitle: 'Before we could generalize arithmetic into algebra, we had to liberate numbers from concrete objects.',
        },
        title: 'The Rigidity of Additive Counting',
        paragraphs: [
          'In an additive system such as Roman numerals, each symbol carries a fixed value and a number is just the sum of its symbols. Such a system cannot scale.',
          'Multiply XII by XIII and the symbols give you no structural pattern to follow towards the answer, CLVI (156). Multiply 12 by 13 and every digit sits on a predictable place-value grid.',
        ],
        figure: 'additive-vs-positional',
        highlight: 'In an additive system, numbers are dead ends. In a positional system, numbers are dynamic vectors.',
      },
      {
        title: 'The Zero as a Spatial Placeholder',
        paragraphs: [
          'Indian thinking was base-10 long before the digits. Vedic texts already name the powers of ten: eka, daśa, śata, sahasra, ayuta, niyuta, prayuta, arbuda, nyarbuda, samudra, madhya, anta, parārdha (up to 10¹² in the Yajurveda lists).',
          'Written decimal place-value numerals with a zero came later. Clear evidence appears by about the 5th to 7th centuries CE: Āryabhaṭa’s place-value rule (499 CE) and Brahmagupta’s rules for computing with zero (628 CE). The dating of the Bakhshali manuscript is still debated.',
          'The introduction of śūnya (zero) and decimal place value by Indian mathematicians spatialized mathematics. Every digit now occupies a slot, and the slot, not the shape of the symbol, decides its value. Zero keeps the grid honest: in 106 the empty tens slot must still be marked, or 106 collapses into 16.',
        ],
        figure: 'place-value-156',
      },
      {
        title: 'The Great Leap to the Variable',
        paragraphs: [
          'Once digits are coefficients on powers of a base, a thought experiment opens up: what if the base is left open? Replace 10 with x, and 1·10² + 5·10¹ + 6·10⁰ becomes 1·x² + 5·x + 6. Arithmetic becomes algebra.',
          'This is a conceptual lens, not a documented historical moment: no ancient text records “replacing 10 by x”. But it is mathematically exact. A polynomial evaluated at x = 10 gives back an ordinary number: (x + 2)(x + 3) = x² + 5x + 6, and at x = 10 that is 12 × 13 = 156, the identity explored in the next article.',
        ],
        figure: 'base-10-to-base-x',
        quote:
          'The decimal system did not just give us a way to count wealth; it gave us the spatial architecture required to map the infinite variations of algebra.',
        takeaways: [
          'Additive numerals (Roman) hide structure; positional numerals expose it.',
          'Śūnya and place value turn every digit into a coefficient on a power of the base: 156 = 1·10² + 5·10¹ + 6·10⁰.',
          'Leave the base open as x and numbers become polynomials: algebra as generalized arithmetic.',
        ],
      },
      // ---------------------------------------------------------------- PART 3
      {
        part: {
          label: 'Part 3',
          sanskritTitle: '॥ ऋण-धन-नियमः ॥',
          title: 'The Polar Universe: How Zero Birthed Negative Space',
          subtitle:
            'Before algebra could govern the cosmos, it had to break past the barrier of zero and discover the mirror world of negative existence.',
        },
        title: 'The Conceptual Prison of the Physical',
        paragraphs: [
          'For most of history, a number meant tangible ownership. You could have three cows, or zero cows, but you could not own fewer than zero cows. To Greek and Egyptian mathematicians, a number less than nothing seemed absurd.',
          'The geometric deadlock: in a mathematics built on lines and areas, no square has a side of −4 and no field has a negative area.',
          'The algebraic wall: Diophantus called an equation whose answer would be negative “absurd”. Even in 16th-century Europe, Gerolamo Cardano called negative roots “fictitious”, and Descartes still called them “false” roots in 1637. Whole families of solutions were thrown away, and the mathematical universe was cut in half.',
          'The wall was not universal. Chinese mathematicians working from the Nine Chapters on the Mathematical Art (compiled around the 1st century CE) already computed with negatives, using red and black counting rods for positive and negative quantities when solving systems of equations.',
        ],
      },
      {
        title: 'The Ledger of the Cosmos: Dhana and Ṛṇa',
        paragraphs: [
          'In 628 CE, Brahmagupta’s Brāhmasphuṭasiddhānta gave the earliest known systematic rules for computing with zero and negative quantities together. He treated numbers as relational states: dhana (धन, “fortune”, assets) and ṛṇa (ऋण, “debt”, also called kṣaya, “loss”), with śūnya or kha (zero) between them.',
        ],
        figure: 'dhana-rna-number-line',
      },
      {
        title: 'Brahmagupta’s Laws of Fortune and Debt',
        paragraphs: [
          'His rules (Brāhmasphuṭasiddhānta 18.30–35) read like a cosmic ledger. In a standard translation: “a debt minus zero is a debt, a fortune minus zero is a fortune, zero minus zero is zero”. The product of two debts, or of two fortunes, is a fortune, and the product of a debt and a fortune is a debt.',
          'One rule did not survive. Brahmagupta stated that zero divided by zero is zero. Later mathematicians revisited division by zero (Bhāskara II called a number divided by zero khahara, an infinite quantity), and modern mathematics leaves it undefined.',
        ],
        figure: 'brahmagupta-sign-rules',
        highlight: 'Zero is not mere emptiness: it is the fulcrum between dhana and ṛṇa, assets and debts.',
      },
      {
        title: 'The Vectorial Symmetry of Algebra',
        paragraphs: [
          'Once debts are genuine numbers, numbers become directional: a quantity has a size and a side of zero. The sign rules are what let expressions containing subtractions be multiplied mechanically.',
          'The modern Vedic Maths system of Swami Bhāratī Kṛṣṇa Tīrtha (20th century) applies exactly these rules. Expanding (x − 2)(x + 3) with Ūrdhva-Tiryagbhyām (vertically and crosswise), the crosswise step combines a fortune and a debt, and the last vertical step multiplies a debt by a fortune. Without the laws of signs, neither column could be computed.',
        ],
        figure: 'cross-signs',
        links: [{ anchor: 'sutra-3', label: 'Ūrdhva-Tiryagbhyām (Sutra 3) →' }],
        quote:
          'By defining Zero not as mere emptiness, but as the perfect fulcrum between Assets and Debts, ancient algebra unlocked the hidden half of the mathematical universe.',
        takeaways: [
          'Geometric cultures rejected negative numbers: no negative lengths, no negative areas, no “false” roots.',
          'Indian algebraists, beginning with Brahmagupta, reframed them as dhana (fortune) and ṛṇa (debt), with zero as the mirror between them.',
          'The laws of signs let polynomial cross-multiplication work across positive and negative terms.',
        ],
      },
      // ---------------------------------------------------------------- PART 4
      {
        part: {
          label: 'Part 4',
          sanskritTitle: '॥ अव्यक्त-समीकरणम् ॥',
          title: 'The Dynamic Equilibrium: The Birth of the Equation',
          subtitle:
            'To balance the unknown against the known, mathematics had to evolve from a ledger of facts into a scale of pure symmetry.',
        },
        title: 'The Concept of Samīkaraṇa',
        paragraphs: [
          'Indian algebraists called equation-making samīkaraṇa (समीकरण), literally “making equal”. Bhāskara II’s Bījagaṇita organizes whole chapters this way: ekavarṇa-samīkaraṇa (equations in one unknown) and anekavarṇa-samīkaraṇa (equations in several unknowns). The two sides (pakṣa) were written one beneath the other.',
          'An equation is a statement of balance, not a command. It does not say “calculate this”; it declares that two expressions weigh exactly the same.',
        ],
        figure: 'samikarana-balance',
      },
      {
        title: 'The Architecture of Inversion',
        paragraphs: [
          'To keep the scale balanced, whatever disturbs one side must be mirrored on the other. Indian texts state this as operational rules. Algebra was already well developed in India before the Arabic treatises: Brahmagupta (628 CE) gave rules for solving linear and quadratic equations, for computing with negatives and zero, and for equations in several unknowns.',
          'Similar operations appear later in al-Khwārizmī’s Arabic treatise on algebra (c. 820 CE) as al-jabr (“restoration”: moving a subtracted term to the other side as an added one) and al-muqābala (“balancing”: cancelling like terms on both sides); al-jabr gave algebra its name. Al-Khwārizmī openly credited India for the numerals in his arithmetic book on Hindu reckoning, known in Latin as Algoritmi de numero Indorum. How much of his algebra drew on Indian sources is not recorded. Indian astronomy was available in Baghdad (the Brāhmasphuṭasiddhānta was translated there as the Zīj al-Sindhind in the 770s), so Indian influence is plausible, but its extent is unknown.',
          'Transposition by clearing (śodhana): Bhāskara II’s rule is to subtract the unknown of one side from the other side, and the known numbers (rūpa) of the other side from the first. A term that crosses the scale changes its state: dhana becomes ṛṇa, and ṛṇa becomes dhana.',
          'Viśodhana (clearing equal quantities): identical terms on both sides can be removed together, because taking the same amount from both pans leaves the balance undisturbed.',
          'Brahmagupta then gives the finishing step for bx + c = dx + e: the difference of the known numbers, divided by the difference of the coefficients of the unknown, is the unknown, so x = (e − c) ÷ (b − d).',
          'A note on names: saṅkramaṇa, sometimes quoted for transposition, is the name of a different classical topic, “concurrence”: finding two numbers from their sum and difference.',
        ],
        figure: 'transposition-steps',
      },
      {
        title: 'The Universal Matrix',
        paragraphs: [
          'The Vedic Maths sutras read equations on the same grid as multiplication: coefficients are extracted, operations run crosswise, and the unknown is isolated by tracing relationships instead of by long step-by-step manipulation.',
          'On this site you can see this in Parāvartya Yojayet (“transpose and apply”) for simple equations such as 7x − 5 = 2x + 25, in Śūnyaṃ Sāmyasamuccaye (“when the collection is the same, it is zero”), and in Saṅkalana-Vyavakalanābhyām (“by addition and by subtraction”) for simultaneous equations such as 23x + 17y = 63 and 17x + 23y = 57. These are methods of the 20th-century Vedic Maths system, built on the classical rules above.',
        ],
        links: [
          { anchor: 'sutra-4', label: 'Parāvartya Yojayet (Sutra 4) →' },
          { anchor: 'sutra-5', label: 'Śūnyaṃ Sāmyasamuccaye (Sutra 5) →' },
          { anchor: 'sutra-7', label: 'Saṅkalana-Vyavakalanābhyām (Sutra 7) →' },
        ],
      },
      {
        title: 'गुरु-परम्परा · The Unbroken Lineage of Indian Algebra',
        paragraphs: [
          'Indian algebra grew as a chain of teachers and texts. Authors routinely name their predecessors and gurus: Bhāskara II, closing his Bījagaṇita, says he drew on the algebras of Brahmagupta, Śrīdhara and Padmanābha, which he found too extensive, and condensed them for learners.',
        ],
        figure: 'algebra-lineage',
      },
      {
        title: 'Students Came to India',
        paragraphs: [
          'Learning also travelled with people. Chinese pilgrim-scholars made the long journey to India: Faxian (travelled c. 399–412 CE), then Xuanzang (in India c. 630–645) and Yijing (c. 673–685), who both studied at Nālandā. Teachers went the other way: Kumārajīva (of Indian and Kuchean parentage) reached China in 401 CE, Paramārtha of Ujjayinī arrived in 546 CE, and tradition credits Bodhidharma with carrying Chan (Zen) Buddhism there.',
          'Indian astronomers served at the Tang court. Gautama Siddha (Qutan Xida) translated the Jiuzhi (Navagraha) calendar in 718 CE, and it explains Indian numerals, including a dot for zero.',
          'In Buddhism and astronomy, the flow of learning ran largely from India to China. Chinese mathematics also had strong roots of its own: counting rods and, as we saw in Part 3, computation with negatives in the Nine Chapters.',
          'Lost evidence: around 1200 CE (traditionally c. 1193) Nālandā was sacked, along with Vikramaśilā and Odantapurī, and vast manuscript collections were lost. Many Indian works now survive only as citations in later books; Padmanābha’s algebra, for example, is known only because Bhāskara II names it. The record is lopsided: much of India’s written heritage was lost when centres like Nālandā were destroyed, so the dates we can prove are the latest possible dates, not the earliest. The true age and reach of Indian mathematics may well be greater than surviving texts show.',
        ],
        highlight:
          'India gave the world the number system and the arithmetic of zero and negatives on which all later algebra stands, and sustained an unbroken lineage of mathematicians for over two thousand years.',
        quote:
          'An equation is not a question demanding a calculation; it is a declaration of absolute symmetry, where the unknown is already structurally bound to the known.',
        takeaways: [
          'Samīkaraṇa, “making equal”: an equation is a balance between two sides, not a command.',
          'Transposition (a term crosses the scale and changes sign, ṛṇa ↔ dhana) and clearing equal terms keep the balance; al-jabr and al-muqābala are later Arabic counterparts, and how far Indian sources shaped them is unknown.',
          'Vedic Maths sutras such as Parāvartya Yojayet read equations on the same coefficient grid as multiplication.',
        ],
      },
    ],
    keyTakeaways: [],
    next: { id: 'algebra-engine', label: 'The Universal Engine of Algebra: Unifying Arithmetic & Polynomials' },
  },
  {
    id: 'algebra-engine',
    slug: 'universal-engine-of-algebra',
    title: 'The Universal Engine of Algebra: Unifying Arithmetic & Polynomials',
    sanskritTitle: '॥ बीजगणितस्य सार्वभौम-यन्त्रम् ॥',
    subtitle: 'Arithmetic is Base 10, Algebra is Base x: Discover how the exact same sutra multiplies numbers and polynomials with identical coefficient vectors.',
    readingTime: '6 min read',
    badge: 'Mathematical Unification',
    prequel: { id: 'roots-of-algebra', label: 'बीजगणितस्य मूलानि' },
    sections: [
      {
        title: 'Algebra is Simply Generalized Arithmetic',
        paragraphs: [
          'The most profound proof that Vedic math is a deep conceptual system rather than a bag of tricks is its seamless transition into Algebra.',
          'Universally, arithmetic and algebra are not two distinct subjects—algebra is simply generalized arithmetic.',
          'In arithmetic, our place-value base is 10. In algebra, our place-value base is x.'
        ],
        highlight: 'Vedic Sutras do not distinguish between concrete digits and algebraic unknowns: both obey identical spatial geometries.'
      },
      {
        title: 'The Identical Coefficient Vector [1, 5, 6]',
        paragraphs: [
          'Because the Vedic Sutras operate on the pure structure of positional spacing, the exact same formula used to multiply numbers is used to multiply algebraic polynomials:',
          '• Arithmetic (Base 10): 12 × 13 = (1 · 10 + 2)(1 · 10 + 3) = 100 + 50 + 6 = 156.',
          '• Algebra (Base x): (x + 2)(x + 3) = (1 · x + 2)(1 · x + 3) = x² + 5x + 6.',
          'Notice the identical coefficient structure: [1, 5, 6]. Vedic Mathematics recognizes this beautiful, fundamental truth.'
        ]
      },
      {
        title: 'Bridging Basic Counting and Abstract Mathematics',
        paragraphs: [
          'The system doesn\'t care whether your base column is a concrete ten or an unknown variable x; it maps out the structural space between the components identically.',
          'This fluid grasp of place value bridges the gap between basic counting and abstract higher mathematics effortlessly.',
          'Students who learn Vedic multiplication naturally grasp polynomial expansion, synthetic division, and matrix inversion without cognitive friction.'
        ]
      }
    ],
    quote: 'The system doesn\'t care whether your base column is a concrete ten or an unknown variable x; it maps out the structural space identically.',
    keyTakeaways: [
      'Arithmetic is Base 10; Algebra is Base x.',
      '12 × 13 and (x+2)(x+3) share the exact same coefficient vector [1, 5, 6].',
      'One single mental model governs both elementary arithmetic and higher algebra.'
    ]
  },
  {
    id: 'source-lineage',
    slug: 'source-and-guru-parampara',
    title: 'The Source & The Living Lineage: Swami Bharati Krishna Tirtha & Guru Parampara',
    sanskritTitle: '॥ मूलस्रोतः गुरुपरम्परा च ॥',
    subtitle: 'The master-disciple lineage that revived, preserved, and continues to propagate this cosmic science for humanity.',
    readingTime: '8 min read',
    badge: 'Sacred Lineage & History',
    sections: [
      {
        title: 'Vedic Mathematics as Living Vidya',
        paragraphs: [
          'Vedic Mathematics is far more than an ultra-efficient system of mental calculation; it is a living stream of knowledge (Vidya) flowing through an ancient spiritual lineage.',
          'To understand this science truly is to look beyond the numbers and see the Guru Parampara (the master-disciple lineage) that revived, preserved, and continues to propagate this cosmic science for the modern world.'
        ],
        highlight: 'Vidya survives not in ink alone, but through the unbroken devotion of a living Guru Parampara.'
      },
      {
        title: 'The Tapasya of Swami Bharati Krishna Tirtha (1884–1960)',
        paragraphs: [
          'The modern architecture of Vedic Mathematics was reconstructed between 1911 and 1918 by Jagadguru Swami Bharati Krishna Tirtha (1884–1960), the 143rd Shankaracharya of the Govardhan Math in Puri.',
          'A brilliant polymath with a profound mastery of Sanskrit, mathematics, and philosophy, Swamiji spent years in intense meditation (tapasya) and deep scriptural analysis in the forests of Sringeri.',
          'Diving into the Parishishta (appendix) of the Atharva Veda, he decoded a unified mathematical system latent within the text.',
          'Swamiji originally composed 16 comprehensive manuscript volumes outlining this science, but the manuscripts were tragically lost. Undeterred, in his final years, he rewrote an introductory volume. Published posthumously in 1965 as the landmark book Vedic Mathematics, it serves as the foundational text for the global resurgence we see today.'
        ]
      },
      {
        title: 'The Lineage of Continuity: Guarding and Expanding the Flame',
        paragraphs: [
          'A Guru’s work flourishes through their disciples. The survival and global reach of Vedic Mathematics are due to a dedicated Parampara—a chain of practitioners who took Swamiji’s vision and built upon it:',
          '• Manjula Trivedi: As Swamiji’s devoted disciple, she lovingly transcribed his final dictations, took meticulous care of the sole surviving manuscript, and ensured its publication in 1965 through the Motilal Banarsidass publishers.',
          '• Dr. Narinder Puri: A prominent disciple and former professor of Civil Engineering at the University of Roorkee, Dr. Puri was instrumental in taking Vedic Mathematics from religious hermitages to mainstream academic lecture halls during the 1980s.',
          '• The Global Expansionists: Scholars like Kenneth Williams and James Glover from the UK encountered this knowledge and integrated it into schools globally, showing that the system transcended geographical and cultural boundaries.',
          '• Modern Indian Researchers & Digital Gurukuls: Visionaries and math educators continue to expand the system, writing textbook series and launching digital platforms (like EdNet Learn Gurukul) to train millions of students and teachers worldwide.'
        ]
      }
    ],
    quote: 'Swamiji originally composed 16 volumes, but they were tragically lost. In his final years, despite failing eyesight, he rewrote the foundational introductory volume that sparked a worldwide renaissance.',
    keyTakeaways: [
      'Reconstructed during 8 years of tapasya in Sringeri forests (1911–1918).',
      'Manjula Trivedi preserved the sole surviving manuscript and published it in 1965.',
      'Expanded into universities by Dr. Narinder Puri and globally by Kenneth Williams & James Glover.'
    ]
  },
  {
    id: 'geometry-infinite',
    slug: 'geometry-of-the-infinite',
    title: 'The Geometry of the Infinite: Uniting the Secular and the Sacred',
    sanskritTitle: '॥ अनन्तस्य ज्यामितिः लौकिक-पारलौकिक-समन्वयश्च ॥',
    subtitle: 'Dismantling the modern wall between mathematics and spiritual metaphysics to perceive the structural symmetry of the cosmos.',
    readingTime: '6 min read',
    badge: 'Philosophy & Metaphysics',
    sections: [
      {
        title: 'Dismantling the Wall Between Secular and Sacred',
        paragraphs: [
          'To understand the genesis of Vedic Mathematics, one must dismantle the modern wall separating the secular from the sacred.',
          'In the ancient Vedic paradigm, mathematics meets spiritual metaphysics. Mathematics was never merely an economic tool for accounting; it was a sacred language designed to map the cosmos, construct Vedic fire altars (Sulba Sutras), and understand astronomical cycles.'
        ],
        highlight: '॥ गणितं ब्रह्मज्ञानस्य सोपानम् ॥ — Mathematics is the sacred staircase leading to the knowledge of the Absolute.'
      },
      {
        title: 'Numbers Flowing Harmoniously Through Geometric Space',
        paragraphs: [
          'Vedic Mathematics is a profound tribute to the universal power of place value. It teaches us that numbers are not clunky items to be stacked and dragged across a page, but values that flow harmoniously through geometric space.',
          'By unlocking the natural patterns inherent in our positional system, Swami Bharati Krishna Tirtha did not just invent a faster way to calculate. He revealed the deep, structural symmetry of numbers—offering a timeless manual for looking at the mathematical universe with absolute clarity.'
        ]
      },
      {
        title: 'From Forest Hermitages to Quantum Microchips',
        paragraphs: [
          'Today, computer scientists and semiconductor engineers are rediscovering what ancient rishis understood intuitively.',
          'Vedic multiplication algorithms are now implemented directly into VLSI silicon chips to optimize binary multipliers in AI GPUs and digital signal processors, achieving unprecedented calculation speeds with minimal heat dissipation.',
          'The ancient Sutras continue to guide humanity toward faster, cleaner, and more harmonious computation.'
        ]
      }
    ],
    quote: 'Swami Bharati Krishna Tirtha did not just invent a faster way to calculate. He revealed the deep structural symmetry of numbers—offering a timeless manual for looking at the universe with absolute clarity.',
    keyTakeaways: [
      'Unites practical computational speed with philosophical harmony.',
      'Replaces rote calculation with geometric spatial flow.',
      'Directly applied today in VLSI microchips, AI coprocessors, and quantum computing.'
    ]
  },
  {
    id: 'before-the-carat',
    slug: 'before-the-carat',
    title: 'Before the Carat — Seeds, Slate, and the Metrology of Ancient India',
    sanskritTitle: '॥ प्राचीन-भारतस्य तुलामानम् ॥',
    subtitle:
      'Article 1 · How dust motes, mustard seeds, barley and the red guñjā seed became a precise chain of weights, and how a black stone and a fire kept gold and coins honest.',
    readingTime: '13 min read',
    badge: 'Article 1 · Metrology',
    sections: [
      {
        title: 'Nature’s Blueprints for Weight',
        paragraphs: [
          'Before the metric system, the carat or the gram, the merchants, metallurgists and gemologists of ancient India worked with a sophisticated system of weights. To build it, they turned to nature’s own blueprints: a speck of dust in a sunbeam, mustard seeds, barley, and the bright red guñjā seed.',
          'The story runs from the grid-planned cities of the Indus, whose standardized stone weights we can still put on a balance, to the diamond trade that much later made Golconda (at its peak in the 16th and 17th centuries CE) a byword for gems. Throughout, it combines botanical reference units, practical physics and state oversight.',
          'The texts quoted below are simply the earliest accounts that survive. These systems were very likely in use, and passed on orally, long before any of them. The Indus weights are physical evidence of standardized measurement far earlier still, but the Indus script is undeciphered: we can weigh the weights, yet we cannot read what their makers wrote about them.',
        ],
        highlight:
          'The ratti a jeweller may still quote is a living link in a chain of units that starts with a speck of dust.',
      },
      {
        title: 'The Architecture of Weight',
        paragraphs: [
          'The smallest unit is almost a thought experiment in physics. The earliest surviving account of the full chain is preserved in the Manusmṛti (8.132–137), and the same series appears in the Yājñavalkya Smṛti (1.362–365). The trasareṇu (त्रसरेणु), the tiny mote of dust you see floating when sunlight shines through a lattice window, is declared the least of all quantities.',
          'From there, every step is a natural object: 8 trasareṇu = 1 likṣā (लिक्षा, a louse egg); 3 likṣā = 1 rāja-sarṣapa (black mustard seed); 3 rāja-sarṣapa = 1 gaura-sarṣapa (white mustard seed); 6 gaura-sarṣapa = 1 yava (यव, a middle-sized barley corn); 3 yava = 1 kṛṣṇala, the red-and-black seed also called raktikā (रक्तिका) or guñjā (Abrus precatorius); 5 kṛṣṇala = 1 māṣa (माष); and 16 māṣa = 1 suvarṇa (सुवर्ण), the standard weight for gold. Multiply it out and a single kṛṣṇala is 1,296 dust motes.',
        ],
        figure: 'manu-weight-chain',
      },
      {
        title: 'The Same Mote, as a Length',
        paragraphs: [
          'That chain is a scale of weight. The dust mote is also the start of a scale of length, and the two must not be run together. A length series preserved in the Mayamata (chapter 5) runs entirely in eights: 8 paramāṇu = 1 rathareṇu, a speck of dust; 8 rathareṇu = 1 bālāgra, the tip of a hair; 8 bālāgra = 1 likṣā; 8 likṣā = 1 yūkā, a louse; 8 yūkā = 1 yava, a barley grain; 8 yava = 1 aṅgula, a finger-breadth. A similar series, without the hair-tip, is preserved in the Arthaśāstra (2.20): 8 paramāṇu make the dust thrown up by a chariot wheel, then eightfold steps through likṣā, yūkā and yava to the aṅgula.',
          'The paramāṇu here is simply the smallest particle the texts posit. The Mayamata says it is what the yogins see. It is not a modern atom, and these texts give no measure in micrometres. The Bhāgavata Purāṇa (3.11.5) uses the sunbeam mote too, but as a count of particles rather than this eightfold length: two paramāṇu make one aṇu, and three aṇu make one trasareṇu, the speck seen when sunshine comes through a lattice. The point of all three is a shared visible baseline, so that “the smallest thing a sharp eye can see” meant the same thing in different places.',
        ],
      },
      {
        title: 'Two Tables, One Anchor',
        paragraphs: [
          'The Arthaśāstra (2.19), the manual of statecraft attributed to Kauṭilya, preserves a parallel official table for the Superintendent of Weights and Measures: 10 seeds of māṣa (black gram) or 5 guñjā seeds make one suvarṇa-māṣaka, 16 māṣaka make one suvarṇa (also called karṣa), and 4 karṣa make one pala. Silver and diamonds had their own reckonings: 88 white mustard seeds made one silver māṣaka, and 20 grains of husked rice (taṇḍula, तण्डुल) made one dharaṇa of diamond. The same chapter says the official weights were to be made of iron, of stone from Magadha and Mekala, or of anything that neither swells when wet nor expands in heat.',
          'Both tables land on the same anchor: 80 guñjā seeds to one gold suvarṇa. The guñjā (ratti) seed was the practical reference. By convention a ratti is taken as about 0.12 g (later standard tables use 121.5 mg). Living seeds are not identical, though: measured Abrus seeds vary noticeably from seed to seed and from region to region (one West African sample averaged only about 0.074 g). What made the seed usable was practice: weighing against several seeds at once, keeping seeds of typical size, and above all calibrated weights of stone and metal kept by the state. The Manusmṛti (8.403) orders that all weights and measures be duly marked and re-examined every six months.',
          'Units outlived the ancient tables, but not unchanged. The Manusmṛti counts 5 kṛṣṇala to a māṣa. The later Indian goldsmiths’ system, common in Mughal and British times, counts 8 ratti = 1 māśā and 12 māśā = 1 tolā, so a tolā is 96 ratti. In 1833 the East India Company fixed the tolā at 180 grains (about 11.66 g), and jewellers used it well into the 20th century. The ancient māṣa and the later māśā share a name but are different units.',
        ],
        figure: 'weight-tables-compared',
        terms: [
          { sa: 'त्रसरेणु', iast: 'trasareṇu', gloss: 'dust mote in a sunbeam' },
          { sa: 'लिक्षा', iast: 'likṣā', gloss: 'louse egg (8 trasareṇu)' },
          { sa: 'यव', iast: 'yava', gloss: 'barley corn' },
          { sa: 'तण्डुल', iast: 'taṇḍula', gloss: 'grain of husked rice' },
          { sa: 'रक्तिका', iast: 'raktikā', gloss: 'the red guñjā seed, ratti' },
          { sa: 'माष', iast: 'māṣa', gloss: '5 raktikā (Manusmṛti)' },
          { sa: 'सुवर्ण', iast: 'suvarṇa', gloss: 'gold weight, 16 māṣa' },
        ],
      },
      {
        title: 'The Diamond Monopoly and Pre-Karat Gemology',
        paragraphs: [
          'For over two thousand years India was the world’s main source of diamonds. Borneo produced a few; India’s dominance ended only when large deposits were found in Brazil in the 1720s, and South Africa followed in the 1860s.',
          'Judging gems was a science of its own: ratnaparīkṣā (रत्नपरीक्षा), “the examination of gems”. The Arthaśāstra (2.11) lists the sources and qualities of diamonds, Varāhamihira’s Bṛhatsaṃhitā gives gems a whole chapter (ch. 80), and later treatises such as the Ratnaparīkṣā ascribed to Buddhabhaṭṭa and the Agastimata carried the subject further. Gems were weighed with the smallest units of the system: diamonds in rice grains, pearls in guñjā seeds.',
        ],
        figure: 'gem-weight-units',
      },
      {
        title: 'Why “Carat”?',
        paragraphs: [
          'The Western carat has a parallel botanical story. Its name comes, through Arabic qīrāṭ, from the Greek keration, the seed of the carob tree. Carob seeds are not unusually uniform either: a 2006 study (Turnbull and colleagues, Biology Letters) found their weight varies about as much as that of other seeds, roughly 23%. Traders’ careful selection, not nature, made the carat reliable, and the metric carat was fixed at 200 mg in 1907.',
          'Indian diamonds were judged on three points:',
        ],
        figure: 'diamond-grading',
        terms: [{ sa: 'रत्नपरीक्षा', iast: 'ratnaparīkṣā', gloss: 'the examination of gems' }],
      },
      {
        title: 'Color as a Universal Taxonomic Framework',
        paragraphs: [
          'Just as a physicist might categorize light wavelengths or a modern gemologist uses the GIA D-to-Z color scale, ancient Indian scholars used color as a universal framework to organize everything in nature:',
          '• They categorized soil types by color (white, red, yellow, black) to determine agricultural utility, moisture retention, and drainage capacity.',
          '• They categorized temple building materials by color to determine structural density and load-bearing performance.',
          '• They categorized medicinal herbs by color to identify pharmacological potency and botanical efficacy.',
          'In lapidary texts, this same objective classification was applied to mineral specimens. It was never a matter of social prescription or who should wear what; it was a physical and optical framework to identify how light interacts with the stone’s crystal structure.',
        ],
      },
      {
        title: 'The Principles of Light & Diamond Quality',
        paragraphs: [
          'Indian lapidary science (ratnaparīkṣā) evaluated diamonds on rigorous physical and optical principles: transparency, internal brilliance, dispersion, and crystal symmetry. The Bṛhatsaṃhitā (80.14) identifies the supreme diamond as light, pure, and dazzling—radiating the brilliant flash of lightning, fire, or the multi-hued spectral dispersion of a rainbow (indrāyudha-saṃnibha).',
          'Rather than carving arbitrary facets, early Indian lapidaries respected and polished the stone’s natural crystal geometry. They praised stones possessing regular edges and six- or eight-sided symmetrical forms (80.8), with sharp facets (dhārā) and perfect internal clarity. In modern optical physics, diamond possesses an extraordinarily high refractive index (2.42) and high dispersion (0.044), which splits white incident light into spectral rainbow fire. Long before modern gemological laboratories, ancient Indian examiners used these precise optical phenomena as the universal benchmark of mineral quality.',
        ],
      },
      {
        title: 'Mints, Slate and Fire',
        paragraphs: [
          'Weight alone cannot protect a currency; the metal itself has to be proved. India’s earliest coins, the punch-marked silver pieces later known as kārṣāpaṇa (कार्षापण), were valued by weight and fineness. The oldest found are generally dated to around the 6th–5th century BCE, well before the Mauryas, who continued the series. Their standard was about 32 raktikā of silver, some 3.3–3.5 g. That matches the Manusmṛti’s silver dharaṇa (or purāṇa) of 16 silver māṣaka of 2 kṛṣṇala each; the Manusmṛti itself gives the name kārṣāpaṇa to a karṣa of copper.',
          'The Arthaśāstra, traditionally linked to the Mauryan court though its dating is debated, describes a standardized economy in which state officials supervised weights, measures and the purity of coinage to keep commercial trust. The pautavādhyakṣa, superintendent of weights and measures, had the official weights made and stamped, and traders paid one kākaṇī a day towards the stamping (2.19). The lakṣaṇādhyakṣa, master of the mint, oversaw the silver and copper coins, with an examiner of coins (rūpadarśaka) beside him (2.12). The sauvarṇika, the state goldsmith and assayer, ran the workshop that turned citizens’ bullion into coins and ornaments (2.14), and the paṇyādhyakṣa, superintendent of commerce, watched market prices and, the text adds, weights and measures (2.16, 4.2). Fraud met graded fines. A coin of lowered fineness cost the artisans the first (lowest) amercement, an underweight coin the middle one, and deception with balances or weights the highest (2.14). In the market a difference of one karṣa on the tulā balance was tolerated, two karṣa cost 6 paṇa, larger differences proportionally more, and a merchant who bought with one false balance and sold with another paid double (4.2).',
          'The touchstone, nikaṣa (निकष; Hindi kasauṭī), is described in the Arthaśāstra (2.13). A streak of standard gold is drawn on the stone, then a streak of the gold under test beside it, and the colours are compared. The text praises a stone with a soft, shining lustre and names the green-bean-coloured stone of Kaliṅga among the best. Touchstones in practice are fine-grained, dark siliceous stones (lydite, basanite or black jasper). They are often loosely called “slate”, which is where our title’s word comes from.',
          'For reference pieces of known purity, the same chapter defines sixteen standards (ṣoḍaśa-varṇaka): replace 1, 2, 3 … up to 16 kākaṇī of the gold in a suvarṇa with copper (a kākaṇī is a quarter māṣaka, so 1⁄64 of the suvarṇa) and you get a graded ladder of alloys to match a streak against. The text also names the cheats: a streak that wipes off or rubs away, or one produced by glittering powder under a fingernail, betrays deception.',
        ],
        figure: 'touchstone-streaks',
      },
      {
        title: 'Roman Gold at the Ports & Defacing the Emperor',
        paragraphs: [
          'When Roman ships arrived at ports like Muziris (Kerala) packed with gold coins to buy black pepper and silk, Indian tradesmen treated Roman coins simply as raw bullion scraps. They defaced the Roman coins by slashing a deep line across the Emperor\'s face—effectively saying, "Your politics don\'t matter here; we are melting this down and checking its true purity on our Kasauṭī stones."',
          'The Periplus of the Erythraean Sea confirms the enormous scale of Roman gold (aurei) and silver (denarii) pouring into Malabar and Tamil ports. To Roman authorities, the coin was imperial fiat money bearing the sovereign’s sacred image; to Indian merchants and guild assayers, Roman imperial decrees had zero currency. What mattered was intrinsic metal mass alone. By defacing the portrait with a chisel blow, Indian assayers cancelled the foreign fiat symbol and subjected the coin to the Kasauṭī (touchstone) streak test and the scale pan.',
          'This practice directly contrasted with the monetary collapse of Rome. While the Indian silver kārṣāpaṇa remained rigorously standardized at 32 Ratti (~3.4–3.5 g) of ~75–80% fine silver backed by the state assayer (sauvarṇika), Roman emperors continuously debased their currency. Under Nero (64 CE), the silver denarius was cut from 3.9 g to 3.4 g and debased to ~80% silver; subsequent emperors systematically debased it to under 50%, until under Gallienus it plummeted to less than 5% silver—a mere copper coin dipped in a silver wash.',
        ],
        figure: 'coin-compared',
      },
      {
        title: 'Kautilyan Oversight: The Pautavādhyakṣa & Anti-Fraud Penalties',
        paragraphs: [
          'In the Arthaśāstra (2.19), statecraft left nothing to chance. The Pautavādhyakṣa (Superintendent of Weights and Measures) conducted mandatory recalibration and stamping of all commercial balances and weights every four months (cāturmāsikam). Unstamped weights or overdue scales were seized with severe administrative penalties.',
          'Kauṭilya laid down stringent, mathematically graded fines for any merchant attempting fraud with scales (tulā) or weights: shaving a balance by 1 Māṣa incurred a fine of 6 Paṇas; shaving by 2 Māṣas incurred 12 Paṇas; and deviations greater than 5% incurred a crushing penalty of 200 Paṇas. The gravest crime was operating fraudulent double-balances—known as kūṭatulā (one heavier scale used deceitfully for buying, and a lighter scale for selling)—which was penalized by double fines, confiscation of goods, and severe state punishment.',
          'The state assayer (sauvarṇika) and coin examiner (rūpadarśaka) maintained sixteen reference alloy streaks (ṣoḍaśa-varṇaka) on the dark siliceous nikaṣa (kasauṭī) stone. A merchant’s metal had to streak alongside the king’s benchmark standard without fading, flaking, or powder deception.',
        ],
      },
      {
        title: 'Trial by Fire',
        paragraphs: [
          'Fire gave an independent check. In the Arthaśāstra (2.13), impure gold is fused with lead, four times the weight of the impurity; silver is refined with lead too, and counts as pure when it turns white, glowing and full of globules. Chapter 2.14 describes silver heated again and again with copper sulphate mixed with powdered bone, with lead, in a skull-shaped vessel (kapāla) and finally with rock salt, as R. Shamasastry translates these technical terms. These are processes akin to cupellation, in which lead carries base metals away and leaves the precious metal behind.',
          'The fire also exposed fraud. Gold that keeps the same colour inside and out when heated is the best, and black or blue shows impurity. The mint allowed exactly one kākaṇī of extra metal per suvarṇa coin for loss in manufacture (2.14), so any larger shortfall had to be explained. Gold leaf wrapped over lead could be caught by heating, by the touchstone, or by the dull sound the piece made when rubbed.',
        ],
        highlight:
          'Streak, standard and fire: three independent checks that let a treasury trust a coin or an ingot it had never seen before.',
        terms: [
          { sa: 'कार्षापण', iast: 'kārṣāpaṇa', gloss: 'punch-marked coin, standard silver weight (32 ratti)' },
          { sa: 'निकष', iast: 'nikaṣa', gloss: 'touchstone (Kasauṭī)' },
          { sa: 'पौतवाध्यक्ष', iast: 'pautavādhyakṣa', gloss: 'superintendent of weights and measures' },
          { sa: 'कूटतुला', iast: 'kūṭatulā', gloss: 'fraudulent double-balance' },
        ],
      },
      {
        title: 'The Legacy of Indian Metrology',
        paragraphs: [
          'The ancient Indian approach to metrics reveals a civilization that valued extreme standardization. In the urban centers of Mohenjo-Daro and Harappa, every single commercial brick was baked to a strict 4 : 2 : 1 ratio (Length : Width : Thickness). This exact dimensional ratio ensured optimal structural interlocking and seismic stability across thousands of kilometers of urban architecture.',
          'Excavations at Harappa, Mohenjo-daro, Lothal, and Dholavira unearthed thousands of polished cubical chert weights manufactured to remarkable accuracy across centuries. The Indus metrological system pioneered a dual architecture: a binary progression (ratios 1, 2, 4, 8, 16, 32, 64) for high-precision lightweight trade goods like gems, gold, and perfumes, seamlessly transitioning into a decimal scale (multiples of 160, 200, 320, 640, 1,600, 3,200, 6,400, 8,000, 12,800) for bulk agricultural commodities and civic trade. The base unit (ratio 16) weighed approximately 13.7 grams, creating a unified commercial common market millennia before the modern era.',
        ],
        figure: 'indus-weights',
      },
      {
        title: 'Seeds, Verses and Officials',
        paragraphs: [
          'From Harappan chert cubes to the botanical precision of the guñjā (ratti) and the rigorous touchstone assays of the Arthaśāstra, Indian metrology was characterized by empirical integrity. Memorized in verse, verified on dark lydite slate, tested in sacrificial assay fires, and enforced by civic superintendents every four months, these standards anchored the wealthiest trading civilization in the ancient world for millennia.',
        ],
      },
    ],
    quote:
      'Before there was a carat, there was a seed; before there was a laboratory, there was a dark stone and a fire.',
    keyTakeaways: [
      'The smallest unit, the trasareṇu, is a dust mote in a sunbeam; the chain from it to the gold suvarṇa is preserved in the Manusmṛti (8.132–137) and the Yājñavalkya Smṛti.',
      'The Arthaśāstra (2.19) preserves a parallel state table, including 20 rice grains to one dharaṇa of diamond; both tables give 80 guñjā to a gold suvarṇa.',
      'Guñjā (ratti) seeds were a practical standard, made reliable by averaging and by state-checked weights, not by perfect uniformity.',
      'Gold was proved on the touchstone (nikaṣa) against sixteen graded reference alloys, and by fire.',
      'The Indus weights show binary and decimal standards far older than any text we can read.',
    ],
  },
  {
    id: 'ganita-and-the-calendar',
    slug: 'ganita-and-the-calendar',
    title: 'Gaṇita and the Calendar — The Precision of Indian Astronomy & The 366-Day Vedic Year',
    sanskritTitle: '॥ कालमानं पञ्चाङ्गं च ॥',
    subtitle:
      'Article 2 · How Indian astronomers engineered an inherently accurate, self-correcting luni-solar calendar long before modern resources — and why it never needed a Gregorian fix.',
    readingTime: '14 min read',
    badge: 'Article 2 · Astronomy & Calendar',
    prequel: { id: 'before-the-carat', label: 'Before the Carat' },
    sections: [
      {
        title: 'An Inherently Accurate, Self-Correcting Architecture',
        paragraphs: [
          'A persistent modern myth assumes that non-Western calendars were crude or required "fixing" by European models. In reality, the Indian calendar was inherently accurate, mathematically self-correcting, and synchronized with the cosmos millennia before modern observatories existed. It never needed a "fix" from the Gregorian calendar.',
          'The Gregorian reform of 1582 was an emergency administrative patch for a broken Roman Julian calendar. Because Julius Caesar’s calendar assumed a solar year of exactly 365.25 days instead of the true 365.2422 days, it accumulated an error of roughly 11 minutes per year. By 1582, the Julian calendar had drifted by 10 full days, throwing the celebration of Easter off its theological spring equinox. Pope Gregory XIII had to literally erase ten calendar days by papal decree (October 4 was followed by October 15) and introduce the century leap-year rule.',
          'In stark contrast, ancient Indian astronomers engineered a dynamic, luni-solar calendar (Pañcāṅga) that never required arbitrary administrative surgery. By weaving lunar phases (tithis) and solar entries (saṅkrāntis) with self-regulating intercalary months (Adhika Māsa), the Indian calendar remained in perpetual harmony with celestial mechanics.',
        ],
        highlight:
          'The Gregorian reform was an emergency fix for a drifting Julian calendar; the Indian Pañcāṅga was built on a self-correcting mathematical architecture that never drifted from the sky.',
      },
      {
        title: 'Credit to Indian Astronomers: The 366-Day Vedic Astronomical Year',
        paragraphs: [
          'Long before modern telescopes, atomic clocks, or satellite telemetry, ancient Indian mathematicians and astronomers accurately calculated celestial motions. Supreme credit belongs to the Vedic astronomers who established the foundational parameters of time:',
          '• Lagadha & the Vedāṅga Jyotiṣa (c. 1400–1200 BCE): The earliest dedicated astronomical text surviving in India, the Vedāṅga Jyotiṣa attributed to Sage Lagadha, established a 5-year Yuga cycle containing exactly 1,830 civil days. This divided cleanly into 5 solar years of exactly 366 days each. Within this 5-year Yuga, Lagadha harmonized the solar cycle with 62 synodic lunar months by intercalating two Adhika Māsas (one in the middle and one at the end of the Yuga). This 366-day solar year was a deliberate astronomical benchmark designed for precise equinoctial and solstitial tracking thousands of years before European astronomy.',
          '• Aryabhata (Āryabhaṭīya, 499 CE): Working at Kusumapura (Pāṭaliputra), Aryabhata calculated the length of the sidereal year as 365 days, 6 hours, 12 minutes, and 30 seconds (365.25868 days)—a measurement extraordinarily close to the modern value (365.25636 days). Aryabhata was also the first astronomer on record to demonstrate that the Earth is spherical and rotates daily on its axis (calā pṛthvī sthirā bhāni), explaining that the apparent westward motion of stars is like the scenery rushing past a moving boat.',
          '• Varāhamihira (Pañcasiddhāntikā, 505 CE) & Bhāskara I (629 CE): Synthesized astronomical schools, refining planetary orbital periods and creating brilliant sine approximations without infinite series.',
          '• Sūrya Siddhānta: One of the towering treatises of classical Indian astronomy, counting 1,577,917,828 civil days across a Mahāyuga of 4,320,000 solar years, yielding a sidereal year of 365.258756 days.',
          '• Bhāskarācārya (Siddhānta Śiromaṇi, 1150 CE): Calculated the sidereal year to 365.25875648 days—differing from modern satellite measurements by barely a fraction of a minute across centuries.',
        ],
        highlight:
          'From Lagadha’s 366-day Vedāṅga Jyotiṣa year to Aryabhata’s 365.25868-day calculation, Indian astronomers mastered sidereal precision long before modern instruments.',
      },
      {
        title: 'Nimeṣa, kāṣṭhā, kalā, muhūrta — Microscopic to Macroscopic Time',
        paragraphs: [
          'Indian texts built time from the smallest observable instant. In the Manusmṛti (1.64), the chain begins with human perception: eighteen nimeṣa (निमेष, the twinkling of an eye) make one kāṣṭhā (काष्ठा); thirty kāṣṭhā make one kalā (कला); thirty kalā make one muhūrta (मुहूर्त); and thirty muhūrta make one ahorātra (अहोरात्र), a full day and night.',
          'Taking one ahorātra as a standard mean civil day of 24 hours (86,400 seconds), one muhūrta is exactly 48 minutes, one kalā is 96 seconds, one kāṣṭhā is 3.2 seconds, and one nimeṣa is approximately 0.178 seconds. In the Bhāgavata Purāṇa (3.11.6) and Sūrya Siddhānta, the subdivision goes further into truṭi, vedha, and lava, down to microscopic atomic units of time.',
        ],
        figure: 'manu-time-chain',
        terms: [
          { sa: 'निमेष', iast: 'nimeṣa', gloss: 'a twinkling of the eye (≈ 0.178 s)' },
          { sa: 'काष्ठा', iast: 'kāṣṭhā', gloss: '18 nimeṣa (3.2 seconds)' },
          { sa: 'मुहूर्त', iast: 'muhūrta', gloss: '30 kalā (48 minutes)' },
          { sa: 'अहोरात्र', iast: 'ahorātra', gloss: 'a full day and night (24 hours)' },
        ],
      },
      {
        title: 'What a Pañcāṅga Tracks: The Five Limbs of Celestial Reality',
        paragraphs: [
          'Unlike a flat civil wall calendar, a Pañcāṅga (पञ्चाङ्ग) is a multi-dimensional astronomical almanac tracking five fundamental cosmic variables:',
          '1. Tithi (तिथि): The lunar day, defined strictly as the time taken for the moon to separate from the sun by 12 degrees of celestial longitude. Because the moon travels in an elliptical orbit and its speed varies according to Keplerian dynamics, a tithi varies from about 19 to 26 hours. The mean tithi is approximately 23 hours 37 minutes (1/30th of a synodic month).',
          '2. Vāra (वार): The solar day of the week, named after the governing planetary deities (Ravivāra, Somavāra, Maṅgalavāra, etc.).',
          '3. Nakṣatra (नक्षत्र): The lunar mansion (one of 27 segments of 13°20′ each) in which the moon resides at any given moment.',
          '4. Yoga (योग): The combined angular longitudinal position of the sun and the moon (360° divided into 27 yogas of 13°20′ each).',
          '5. Karaṇa (करण): Half of a tithi (a 6-degree separation of the sun and moon), totaling 11 karaṇas in continuous rotation.',
          'An Adhikamāsa (अधिकमास, intercalary extra month) ensures that festivals never drift across seasons. Whenever two new moons occur within a single solar rāśi (zodiac sign)—meaning a lunar month contains no solar ingress (saṅkrānti)—that month is designated as Adhika Māsa. This intercalary adjustment occurs roughly every 32.5 months (7 times in 19 years), ensuring that Holi always arrives in spring (Phālguna) and Dīpāvalī in autumn (Kārttika).',
        ],
        terms: [
          { sa: 'तिथि', iast: 'tithi', gloss: '12° of sun–moon separation' },
          { sa: 'पक्ष', iast: 'pakṣa', gloss: 'a fortnight (śukla = bright, kṛṣṇa = dark)' },
          { sa: 'अधिकमास', iast: 'adhikamāsa', gloss: 'self-correcting intercalary lunar month' },
          { sa: 'पञ्चाङ्ग', iast: 'pañcāṅga', gloss: 'the five-limbed astronomical almanac' },
        ],
      },
      {
        title: 'Sidereal Precision vs. Civil Convention',
        paragraphs: [
          'The Gregorian calendar is a tropical calendar: it measures the return of the sun to the vernal equinox (~365.2422 days), ignoring the backdrop of the stars. In contrast, traditional Indian calendars follow the Nirayaṇa (sidereal) system: measuring the return of the sun to the exact same fixed star in the Nakṣatra belt (~365.25636 days).',
          'The difference between the two is the precession of the equinoxes (Ayanāṁśa), which shifts by approximately 50.3 arcseconds per year (1 degree every 71.6 years). Indian astronomers recognized precession centuries ago (Munjāla in 932 CE, Bhāskara II in 1150 CE), noting the gradual drift between the Sayana (tropical) and Nirayaṇa (sidereal) zodiacs. By anchoring the Pañcāṅga to the physical sidereal stars, Indian timekeeping preserves true astronomical coordinates rather than arbitrary civil dates.',
        ],
        figure: 'panchanga-compared',
      },
      {
        title: 'Vikram Saṃvat & Continuous Empirical Observation',
        paragraphs: [
          'Vikram Saṃvat (विक्रमसंवत्), initiated in 57 BCE to commemorate King Vikramāditya, is a continuous linear era count. In 2026 CE, the Vikram Saṃvat year is 2083 (2026 + 57). Unlike rigid Western administrative calendars that fossilized mistakes until a pope or king decreed a correction, the Indian astronomical tradition championed Dṛk-Siddha (दृक्सिद्ध) or Dṛk-Gaṇita—the principle that mathematical formulas must constantly be reconciled with direct telescope and celestial observation.',
          'Whenever observations showed a minor divergence, astronomers updated the bija (correction factors), ensuring that eclipses, planetary conjunctions, and seasonal rites remained flawlessly synchronized with the cosmos for over three thousand years.',
        ],
      },
    ],
    quote:
      'The Indian calendar did not wait for papal decrees or administrative patches: by uniting the 366-day solar baseline of the Vedāṅga Jyotiṣa with self-correcting Adhika Māsas, it stayed in perpetual sync with the heavens.',
    keyTakeaways: [
      'The Indian calendar is inherently accurate and self-correcting via Adhika Māsa (intercalary lunar months); it never required a "fix" from the Gregorian calendar.',
      'The 1582 Gregorian reform was an emergency correction for the Roman Julian calendar, which had drifted by 10 days due to an inaccurate 365.25-day year.',
      'Sage Lagadha in the Vedāṅga Jyotiṣa (c. 1400–1200 BCE) established the 5-year Yuga containing 1,830 civil days, giving a 366-day solar year baseline with 2 intercalary months long before modern resources.',
      'Aryabhata (499 CE) calculated the sidereal year to 365.25868 days and proved the Earth\'s daily rotation on its axis; Bhāskarācārya (1150 CE) refined it to 365.25875648 days.',
      'A Pañcāṅga tracks five true astronomical coordinates: Tithi, Vāra, Nakṣatra, Yoga, and Karaṇa, keeping religious and agricultural cycles locked to the sidereal cosmos.',
    ],
  },
  {
    id: 'naming-the-colossal',
    slug: 'naming-the-colossal',
    title: 'Naming the Colossal — How Indian Texts Counted Past a Million',
    sanskritTitle: '॥ दशगुणोत्तरसंज्ञाः महासङ्ख्याश्च ॥',
    subtitle:
      'How ancient India named powers of ten up to 10⁵⁷, 10⁵³, and 10¹⁴⁰ — from the Yajurveda and Vālmīki Rāmāyaṇa to the Lalitavistara Sūtra and Bhāskara’s Līlāvatī.',
    readingTime: '15 min read',
    badge: 'Article 3 · Powers of Ten & Infinity',
    next: { id: 'vakyapadiya-and-ai', label: 'Bhartṛhari’s Vākyapadīya & Modern AI' },
    sections: [
      {
        title: 'A habit of naming the next ten',
        paragraphs: [
          'Carl Sagan, in Cosmos (Random House, 1980), chapter 10, “The Edge of Forever,” observed: “The Hindu religion is the only one of the world’s great faiths dedicated to the idea that the Cosmos itself undergoes an immense, indeed an infinite, number of deaths and rebirths. It is the only religion in which the time scales correspond, no doubt by accident, to those of modern scientific cosmology. Its cycles run from our ordinary day and night to a day and night of Brahma, 8.64 billion years long, longer than the age of the Earth or the Sun and about half the time since the Big Bang. And there are much longer time scales still.”',
          'That cosmological habit did not remain abstract poetry: it directly drove Indian mathematics to invent distinct names and algebraic notation for staggeringly immense powers of ten thousands of years before European science.',
        ],
      },
      {
        title: 'Vedic Number Names: The Thirteen Decuple Rungs',
        sanskritTitle: 'वाजसनेयिसंहिता १७.२ · तैत्तिरीयसंहिता',
        paragraphs: [
          'The earliest surviving systematically named decuple scale in world literature appears in the Vājasaneyi Saṃhitā of the White Yajurveda (17.2), also echoed in the Taittirīya Saṃhitā (4.4.11.4) and Maitrāyaṇī Saṃhitā. The passage names each power of ten as a distinct mathematical entity in sacrificial brick altar geometry:',
          '१. एक (Eka = 10⁰ = 1)\n२. दश (Daśa = 10¹ = 10)\n३. शत (Śata = 10² = 100)\n४. सहस्र (Sahasra = 10³ = 1,000)\n५. अयुत (Ayuta = 10⁴ = 10,000)\n६. नियुत (Niyuta = 10⁵ = 100,000)\n७. प्रयुत (Prayuta = 10⁶ = 1,000,000 / Million)\n८. अर्बुद (Arbuda = 10⁷ = 10,000,000 / Ten Million)\n९. न्यर्बुद (Nyarbuda = 10⁸ = 100,000,000 / Hundred Million)\n१०. समुद्र (Samudra = 10⁹ = 1,000,000,000 / Billion)\n११. मध्य (Madhya = 10¹⁰ = 10,000,000,000 / Ten Billion)\n१२. अन्त (Anta = 10¹¹ = 100,000,000,000 / Hundred Billion)\n१३. परार्ध (Parārdha = 10¹² = 1,000,000,000,000 / Trillion)',
          'To appreciate how extraordinary this was: classical Greek mathematics stopped naming powers of ten at the myriad (10⁴ = 10,000), and Roman numerals had no individual names or symbols beyond mille (10³ = 1,000). Vedic mathematicians were calculating at 10¹² with effortless fluency.',
        ],
        terms: [
          { sa: 'एक', iast: 'eka', gloss: '10⁰ = 1' },
          { sa: 'दश', iast: 'daśa', gloss: '10¹ = 10' },
          { sa: 'शत', iast: 'śata', gloss: '10² = 100' },
          { sa: 'सहस्र', iast: 'sahasra', gloss: '10³ = 1,000' },
          { sa: 'अयुत', iast: 'ayuta', gloss: '10⁴ = 10,000' },
          { sa: 'प्रयुत', iast: 'prayuta', gloss: '10⁶ = million' },
          { sa: 'कोटि / अर्बुद', iast: 'koṭi / arbuda', gloss: '10⁷ = ten million' },
          { sa: 'परार्ध', iast: 'parārdha', gloss: '10¹² in VS 17.2; 10¹⁷ in Līlāvatī' },
        ],
      },
      {
        title: 'The Vālmīki Rāmāyaṇa Census: Counting the Vānara Army to 10⁵⁷',
        sanskritTitle: 'वाल्मीकि-रामायणम् · युद्धकाण्डम् २८.३३-४२',
        paragraphs: [
          'In the Yuddha Kāṇḍa (Book 6, Canto 28) of the Vālmīki Rāmāyaṇa, the spy Śuka returns to the demon king Rāvaṇa after observing the military encampment of Rāma and Sugrīva. When Rāvaṇa demands an exact census of the Vānara forces, Śuka recites an astonishing exponential counting table progressing by factors of 100,000 (एकलक्ष):',
          '• शतम् (Śatam = 10² = 100)\n• सहस्रम् (Sahasram = 1,000 = 10 Śata)\n• लक्षम् (Lakṣam = 100,000 = 100 Sahasra)\n• कोटिः (Koṭi = 10⁷ = 100 Lakṣa = 10,000,000)\n• शङ्कुः (Śaṅku = 100,000 Koṭi = 10¹²)\n• महाशङ्कुः (Mahāśaṅku = 100,000 Śaṅku = 10¹⁷)\n• वृन्दम् (Vṛnda = 100,000 Mahāśaṅku = 10²²)\n• महावृन्दम् (Mahāvṛnda = 100,000 Vṛnda = 10²⁷)\n• पद्मम् (Padma = 100,000 Mahāvṛnda = 10³²)\n• महापद्मम् (Mahāpadma = 100,000 Padma = 10³⁷)\n• खर्वम् (Kharva = 100,000 Mahāpadma = 10⁴²)\n• महाखर्वम् (Mahākharva = 100,000 Kharva = 10⁴⁷)\n• समुद्रः (Samudra = 100,000 Mahākharva = 10⁵²)\n• ओघः (Ogha = 100,000 Samudra = 10⁵⁷)\n• महौघः (Mahaugha = 100,000 Ogha = 10⁶²)',
          'Śuka then details the composition of Sugrīva’s command: "One thousand Śaṅku, one hundred Mahāśaṅku, a thousand Vṛnda, an ocean of Mahāvṛnda..." Demonstrating that large exponential numbers were an organic part of the Sanskrit literary and cultural imagination.',
        ],
        highlight:
          'In the Rāmāyaṇa (Yuddha Kāṇḍa 28), Śuka enumerates the army using 100,000-fold multiplier steps culminating in Ogha (10⁵⁷) and Mahaugha (10⁶²).',
        terms: [
          { sa: 'शङ्कु', iast: 'śaṅku', gloss: '10¹² (100,000 Koṭis)' },
          { sa: 'महाशङ्कु', iast: 'mahāśaṅku', gloss: '10¹⁷' },
          { sa: 'वृन्द', iast: 'vṛnda', gloss: '10²²' },
          { sa: 'पद्म', iast: 'padma', gloss: '10³²' },
          { sa: 'खर्व', iast: 'kharva', gloss: '10⁴²' },
          { sa: 'ओघ', iast: 'ogha', gloss: '10⁵⁷' },
        ],
      },
      {
        title: 'The Lalitavistara: Tallakṣaṇa (10⁵³) & Cosmic Atom Counting (10¹⁴⁰)',
        sanskritTitle: 'ललितविस्तरसूत्रम् द्वादशोऽध्यायः',
        paragraphs: [
          'In Chapter 12 of the Buddhist Lalitavistara Sūtra, Prince Siddhārtha (Gautama Buddha) is examined in the arts of statecraft. The court’s master mathematician, Arjuna, challenges him: "Prince, canst thou recite the numeration running past a hundred Koṭis?"',
          'Siddhārtha recites a centesimal (100-fold) ladder:',
          '• 100 Koṭi = 1 Ayuta (10⁹)\n• 100 Ayuta = 1 Niyuta (10¹¹)\n• 100 Niyuta = 1 Kaṅkara (10¹³)\n• 100 Kaṅkara = 1 Vivara (10¹⁵)\n• 100 Vivara = 1 Akṣobhya (10¹⁷)\n• 100 Akṣobhya = 1 Vivāha (10¹⁹)\n... ascending through 23 centesimal steps to 100 Vibhūtaṅgama = 1 Tallakṣaṇa (तल्लक्षण = 10⁵³).',
          'Siddhārtha then clarifies that Tallakṣaṇa is merely the first scale (Prathama Gaṇanā). He continues into subsequent ladders designed to count every grain of sand along the Gaṅgā, the raindrops falling across all worlds, and the atoms of the universe, culminating in the supreme numeration: Uttaraparamāṇurajaḥpraveśa (उत्तरपरमाणुरजःप्रवेश = 10¹⁴⁰).',
          'For perspective: modern astrophysics estimates that the entire observable universe contains roughly 10⁸⁰ subatomic particles (protons, neutrons, electrons). Ancient Indian mathematicians had named, classified, and manipulated numbers exceeding the universe’s total particle count by sixty orders of magnitude.',
        ],
        terms: [
          { sa: 'तल्लक्षण', iast: 'tallakṣaṇa', gloss: '10⁵³ (centesimal ladder end)' },
          { sa: 'उत्तरपरमाणुरजःप्रवेश', iast: 'uttaraparamāṇurajaḥpraveśa', gloss: '10¹⁴⁰ (cosmic atomic scale)' },
        ],
      },
      {
        title: 'Bhāskarācārya’s 18 Decimal Places: The Līlāvatī Standard (1150 CE)',
        sanskritTitle: 'लीलावती अष्टादश-स्थानानि',
        paragraphs: [
          'In his mathematical masterpiece Līlāvatī (verses 10–11), Bhāskarācārya II codified the eighteen canonical decimal place values (Aṣṭādaśa Sthānāni) utilized by classical astronomers and merchants, declaring: "दशगुणोत्तरं स्यात्" ("Each place is ten times the preceding one"):',
          '१. एक (10⁰ = Units) · २. दश (10¹ = Tens) · ३. शत (10² = Hundreds)\n४. सहस्र (10³ = Thousands) · ५. अयुत (10⁴ = Ten Thousands) · ६. लक्ष (10⁵ = Lakh)\n७. प्रयुत (10⁶ = Million) · ८. कोटि (10⁷ = Crore) · ९. अर्बुद (10⁸ = Ten Crore)\n१०. अब्ज / पद्म (10⁹ = Billion) · ११. खर्व (10¹⁰ = Ten Billion) · १२. निखर्व (10¹¹ = Hundred Billion)\n१३. महापद्म (10¹² = Trillion) · १४. शङ्कु (10¹³ = Ten Trillion) · १५. जलधि / समुद्र (10¹⁴ = Hundred Trillion)\n१६. अन्त्य (10¹⁵ = Quadrillion) · १७. मध्य (10¹⁶ = Ten Quadrillion) · १८. परार्ध (10¹⁷ = Hundred Quadrillion)',
          'This 18-place architecture became the undisputed standard across Indian commerce, astronomy, and architectural surveying for a millennium.',
        ],
      },
      {
        title: 'Jaina Infinities: Saṅkhyāta, Asaṅkhyāta, and Ananta',
        sanskritTitle: 'अनुयोगद्वारसूत्रम् · तिलोयपण्णत्ती',
        paragraphs: [
          'Jaina mathematicians of the 3rd to 2nd centuries BCE made a profound philosophical and mathematical leap: they were the first thinkers in human history to recognize that infinity is not a single vague concept, but comes in distinct mathematical sizes and cardinalities—anticipating the transfinite set theory of Georg Cantor (1874 CE) by over two thousand years.',
          'The Anuyogadvāra Sūtra and Tiloyapannatti divide all quantities into three broad categories:',
          '1. Saṅkhyāta (संख्यात): Countable quantities (finite numbers from 1 to the highest enumerable limit).\n2. Asaṅkhyāta (असंख्यात): Innumerable quantities (numbers beyond calculation but still strictly finite, such as grains of sand in all oceans).\n3. Ananta (अनन्त): Truly infinite quantities.',
          'Crucially, the Jaina texts subdivide Ananta into distinct classes: Ananta (infinite in one direction), Dvi-ananta (infinite in two directions), Samananta (infinite in area), and Anantānanta (अनन्तानन्त, an infinity of infinities). They also distinguished infinities of time (Kāla-ananta) from infinities of space (Pradeśa-ananta), formulating an early conception of higher orders of infinity.',
        ],
        figure: 'named-powers-three',
        terms: [
          { sa: 'संख्यात', iast: 'saṅkhyāta', gloss: 'countable finite' },
          { sa: 'असंख्यात', iast: 'asaṅkhyāta', gloss: 'innumerable yet finite' },
          { sa: 'अनन्त', iast: 'ananta', gloss: 'infinite' },
          { sa: 'अनन्तानन्त', iast: 'anantānanta', gloss: 'infinity of infinities (Cantor-like transfinite)' },
        ],
      },
      {
        title: 'Combinatorics & The Binary Architecture: Piṅgala’s Chandaḥśāstra',
        sanskritTitle: 'पिङ्गल-छन्दःशास्त्रम् · मेरुप्रस्तारः',
        paragraphs: [
          'When ancient Indian scholars weren’t naming powers of ten, they were generating massive exponential counts using combinatorics. In the Chandaḥśāstra, Sage Piṅgala (c. 3rd–2nd century BCE) analyzed the permutations of poetic meters built from two phonetic building blocks: Laghu (लघु, short syllable, duration 1 mātrā) and Guru (गुरु, long syllable, duration 2 mātrās).',
          'For a meter of n syllables, there are 2ⁿ possible combinations. To systematically generate all 2ⁿ patterns, Piṅgala formulated the Prastāra (expansion algorithm). In the 10th century CE, Halāyudha’s commentary on Piṅgala diagrammed this as the Meru-Prastāra (मेरुप्रस्तार)—the triangular array of binomial coefficients that European history would label "Pascal’s Triangle" in 1654, six centuries later!',
          'Piṅgala also documented the earliest binary number system (dyātmaka), the Fibonacci sequence (Mātrā-Vṛtta), and fast exponentiation algorithms for computing 2ⁿ in logarithmic time O(log n).',
        ],
        terms: [
          { sa: 'लघु', iast: 'laghu', gloss: 'short syllable (1)' },
          { sa: 'गुरु', iast: 'guru', gloss: 'long syllable (2)' },
          { sa: 'प्रस्तार', iast: 'prastāra', gloss: 'permutation expansion' },
          { sa: 'मेरुप्रस्तार', iast: 'meru-prastāra', gloss: 'Pyramid of Meru (Pascal’s Triangle, 10th c.)' },
        ],
      },
    ],
    quote:
      'Where ancient Greece stopped at ten thousand and Rome stopped at a thousand, Indian mathematicians danced through 10¹², 10⁵⁷, and 10¹⁴⁰, before investigating the infinite itself.',
    keyTakeaways: [
      'The Vājasaneyi Saṃhitā (17.2) documents a 13-step decuple ladder from Eka (10⁰) to Parārdha (10¹²), an unprecedented scale in bronze-age mathematics.',
      'The Vālmīki Rāmāyaṇa (Yuddha Kāṇḍa 28) census counts Sugrīva’s army using 100,000-fold multiplier steps reaching Ogha (10⁵⁷) and Mahaugha (10⁶²).',
      'The Buddhist Lalitavistara Sūtra (ch. 12) ascends past Tallakṣaṇa (10⁵³) to Uttaraparamāṇurajaḥpraveśa (10¹⁴⁰)—far exceeding the total particle count of the observable universe (~10⁸⁰).',
      'Bhāskarācārya’s Līlāvatī (1150 CE) standardized the 18 classical decimal places (Aṣṭādaśa Sthānāni) from Eka to Parārdha (10¹⁷).',
      'Jaina mathematicians (Anuyogadvāra Sūtra) pioneered transfinite mathematics, classifying numbers into Saṅkhyāta, Asaṅkhyāta, and multiple orders of Ananta (Anantānanta) 2,000 years before Georg Cantor.',
      'Piṅgala’s Chandaḥśāstra established binary combinatorics (2ⁿ) and the Meru Prastāra (Pascal’s triangle) centuries before European discovery.',
    ],
  },
  {
    id: 'vakyapadiya-and-ai',
    slug: 'vakyapadiya-and-ai',
    title: 'Computational Optimization in Classical Semantics: Connecting Bhartṛhari’s Vākyapadīya to Modern AI',
    sanskritTitle: '॥ वाक्यपदीयं कृत्रिमप्रज्ञा च ॥',
    subtitle:
      'How a 5th-century Sanskrit philosopher and Rick Briggs’ 1985 NASA research paper unlocked unambiguous knowledge representation, kāraka dependency logic, and transformer self-attention.',
    readingTime: '18 min read',
    badge: 'Article 4 · Semantics, Grammar & AI',
    prequel: { id: 'naming-the-colossal', label: 'Naming the Colossal' },
    sections: [
      {
        title: 'The 1985 AI Bottleneck & Rick Briggs at NASA Ames',
        sanskritTitle: 'नासा-संशोधनपत्रम् · १९८५',
        paragraphs: [
          'In the mid-1980s, Artificial Intelligence research collided with an obstinate wall: Natural Language Processing (NLP). The prevailing doctrine among computer scientists was that natural human languages were inherently too messy, ambiguous, and irregular for logical reasoning engines. Huge sums were expended inventing artificial formalisms—Semantic Networks, Conceptual Dependency Graphs, and Frame Semantics—to manipulate knowledge without semantic breakdown.',
          'In 1985, Rick Briggs, a computer scientist at NASA Ames Research Center / RIACS, published a landmark paper in AI Magazine titled “Knowledge Representation in Sanskrit and Artificial Intelligence”. Briggs demonstrated that classical Indian grammarians and semanticists had, two millennia earlier, solved the exact knowledge representation problem modern computer scientists were struggling with: creating an unambiguous, machine-interpretable representation of natural language semantics.',
        ],
      },
      {
        title: 'Akhaṇḍa-Vākya-Sphoṭa: Sentence Holism & Pratibhā',
        sanskritTitle: 'अखण्डवाक्यस्फोटः · प्रतिभा',
        paragraphs: [
          'At the foundation of this linguistic architecture stands the 5th-century philosopher-grammarian Bhartṛhari and his treatise, the Vākyapadīya. Bhartṛhari fundamentally rejected lexical reductionism. He demonstrated that individual phonemes (varṇa) or isolated words (pada) have no independent semantic existence. The true, indivisible atomic unit of meaning is the complete sentence: Akhaṇḍa-Vākya-Sphoṭa.',
          'Individual words are merely operational abstractions (apoddhāra) constructed to teach grammar. In actual cognitive reality, meaning is not assembled sequentially like bricks; it bursts forth as an instantaneous, indivisible flash of intuitive comprehension: Pratibhā. Just as a painting is perceived as a unified aesthetic whole rather than isolated pigment dots, sentential meaning is experienced as a holistic gestalt.',
        ],
        terms: [
          { sa: 'स्फोट', iast: 'sphoṭa', gloss: 'the holistic burst of meaning' },
          { sa: 'वाक्यपदीयम्', iast: 'vākyapadīyam', gloss: 'Bhartṛhari’s treatise on words and sentences' },
          { sa: 'प्रतिभा', iast: 'pratibhā', gloss: 'intuitive flash of comprehension' },
          { sa: 'अपोद्धार', iast: 'apoddhāra', gloss: 'pedagogical analytical abstraction' },
        ],
      },
      {
        title: 'Kāraka Dynamics: The Action as Central Semantic Anchor',
        sanskritTitle: 'कारकव्यवस्था · क्रियाप्रधानं वाक्यम्',
        paragraphs: [
          'Extending Pāṇini’s formal grammar (Aṣṭādhyāyī 1.4.23–55), Bhartṛhari established that a sentence is fundamentally an event-centric graph. The central semantic anchor of communication is the action or verb (Kriyā).',
          'Nominal entities in a sentence do not hold static noun labels. Instead, they derive meaning exclusively through their dynamic, causal participation (Kāraka) in actualizing the verb:',
          '१. कर्ता (Kartā): Svatantraḥ kartā (1.4.54) — The independent agent controlling the action.\n२. कर्म (Karma): Kartur-īpsitatamaṃ karma (1.4.49) — The primary target or locus of state change.\n३. करण (Karaṇa): Sādhakatamaṃ karaṇam (1.4.42) — The most effective instrument or auxiliary tool.\n४. सम्प्रदान (Sampradāna): Karmaṇā yam-abhipraiti sa sampradānam (1.4.32) — The recipient or beneficiary.\n५. अपादान (Apādāna): Dhruvam-apāye\'pādānam (1.4.24) — The fixed point of departure/origin.\n६. अधिकरण (Adhikaraṇa): Ādhāro\'dhikaraṇam (1.4.45) — The spatial or temporal locus.',
        ],
        terms: [
          { sa: 'कर्ता', iast: 'kartā', gloss: 'independent agent' },
          { sa: 'कर्म', iast: 'karma', gloss: 'primary object / state-change patient' },
          { sa: 'करण', iast: 'karaṇa', gloss: 'primary instrument' },
          { sa: 'सम्प्रदान', iast: 'sampradāna', gloss: 'recipient / beneficiary' },
          { sa: 'अपादान', iast: 'apādāna', gloss: 'point of departure / source' },
          { sa: 'अधिकरण', iast: 'adhikaraṇa', gloss: 'spatial / temporal locus' },
        ],
      },
      {
        title: 'Contextual Operators for Disambiguation',
        sanskritTitle: 'वाक्यकाण्डम् २.३१५–३१६ · अर्थनिर्णयः',
        paragraphs: [
          'Human language frequently uses polysemous words (e.g., saindhava meaning both "salt" and "horse"). In the Vākyakāṇḍa (2.315–316), Bhartṛhari lists formal contextual operators that deterministically collapse ambiguity:',
          '• Saṃyoga (Connection) & Viyoga (Separation): Explicit linkage or privation of attributes.\n• Sāhacarya (Association) & Virodhitā (Opposition): Co-occurrence (Rāma-Lakṣmaṇa) or antonymic contrast.\n• Artha (Purpose) & Prakaraṇa (Context of Situation): Intent of speaker and pragmatic environment (e.g., "bring saindhava" at meals = salt; on battlefield = horse).\n• Liṅga (Characteristic Mark) & Aucitya (Propriety): Morphological constraints and logical plausibility.\n• Deśa (Space) & Kāla (Time): Geographic and temporal bounding.',
        ],
      },
      {
        title: 'The Paraphrase (Śābdabodha) as Compiler Intermediate Representation',
        sanskritTitle: 'शाब्दबोध-विवरणम् · अन्वय-प्रक्रिया',
        paragraphs: [
          'Rick Briggs highlighted that Indian grammarians did not accept colloquial surface syntax as raw computational data. Instead, they transformed sentences into a standardized semantic paraphrase (Śābdabodha-vivaraṇa) where every implicit case relation and state change was made explicit.',
          'For example, the sentence "Devadatta cooks rice in a pot with firewood" (devadattaḥ sthālyāṃ kāṣṭhaiḥ odanaṃ pacati) compiles into:',
          '1. Viklitti-anukūla-vyāpāra: An activity producing the state change of softening (Kriyā),\n2. Devadatta-kartṛka: Having Devadatta as its conscious initiating agent (Kartā),\n3. Odana-karmaka: Having raw rice grains as the object undergoing softening (Karma),\n4. Kāṣṭha-karaṇaka: Having firewood as the primary auxiliary instrument (Karaṇa),\n5. Sthālī-adhikaraṇaka: Having the cooking pot as the spatial locus of support (Adhikaraṇa).',
          'In modern software engineering, this is identical to how an optimizing compiler translates human code into an Intermediate Representation (IR) or Abstract Syntax Tree (AST) before generating machine bytecode.',
        ],
        figure: 'vakyapadiya-semantic-net',
      },
      {
        title: 'Mathematical Formalization in First-Order Predicate Logic (FOPL)',
        sanskritTitle: 'प्रथमादेश-तर्कशास्त्रम् · Davidsonian Event Semantics',
        paragraphs: [
          'In modern formal semantics, Bhartṛhari’s event-centric kāraka framework maps directly onto Davidsonian event semantics in First-Order Predicate Logic:',
          'Let e be the cooking event: CookingEvent(e). The kārakas bind participants as binary relations: Kartā(e, Devadatta), Karma(e, Rice), Karaṇa(e, Firewood), Adhikaraṇa(e, Pot), Sampradāna(e, Family), Apādāna(e, Grains).',
          'The entire multi-clause proposition compiles into an unambiguous queryable matrix: ∃e ∃x ∃y ∃z ∃l ∃w ∃s [ CookingEvent(e) ∧ Devadatta(x) ∧ Kartā(e,x) ∧ Rice(y) ∧ Karma(e,y) ∧ Firewood(z) ∧ Karaṇa(e,z) ∧ Pot(l) ∧ Adhikaraṇa(e,l) ∧ Family(w) ∧ Sampradāna(e,w) ∧ Grains(s) ∧ Apādāna(e,s) ∧ Devotion(CausalMotive(e)) ].',
          'By enforcing this structured relational matrix, parsing ambiguity is completely eliminated—arguments cannot be misattributed across distance.',
        ],
      },
      {
        title: 'Bhartṛhari’s Four Speech Levels & Modern Transformer Attention',
        sanskritTitle: 'वैखरी-मध्यमा-पश्यन्ती-परा · Neural Network Depths',
        paragraphs: [
          'In the Brahmakāṇḍa, Bhartṛhari identifies four hierarchical strata of speech cognition: Vaikharī (audible acoustic/text tokens), Madhyamā (internal mental syntax and linear sequencing), Paśyantī (holistic semantic vision where all relations exist simultaneously), and Parā (transcendent ground of meaning).',
          'In modern Deep Learning, this hierarchy maps directly onto Transformer architectures: Vaikharī corresponds to input token embeddings; Madhyamā corresponds to lower layers encoding local syntax and positional order; Paśyantī corresponds to deep Multi-Head Self-Attention layers where every token attends to every other token simultaneously; and Parā corresponds to the underlying latent semantic manifold.',
          'Vaswani et al.’s Scaled Dot-Product Self-Attention [Attention(Q, K, V) = softmax(QKᵀ / √dₖ)V] implements Bhartṛhari’s Vākya-Sphoṭa: words have no isolated, static meaning outside of the total context field.',
        ],
      },
      {
        title: 'Dispelling Modern Myths: Practical Lessons for Explainable & Neuro-Symbolic AI',
        sanskritTitle: 'कृत्रिमप्रज्ञायाः भविष्यम् · सम्प्रज्ञातोपायः',
        paragraphs: [
          'A popular urban myth claims that "NASA declared Sanskrit the best language for computer programming." Rick Briggs was not suggesting that programmers write operating systems in spoken Sanskrit instead of C or Python. Rather, he identified that Sanskrit’s scientific meta-language (Vyākaraṇa and Navya-Nyāya Śābdabodha) provides an ideal, human-readable yet machine-interpretable knowledge representation system.',
          'For 21st-century AI, Bhartṛhari’s framework offers three major engineering breakthroughs:',
          '1. Explainable AI (XAI): While Large Language Models rely on opaque vector embeddings, kāraka graphs provide an interpretable, auditable reasoning trace for mission-critical systems.\n2. Knowledge Graphs: The RDF triple architecture (Subject–Predicate–Object) underlying modern web ontologies (Wikidata, Schema.org) mirrors Bhartṛhari’s relational primitives.\n3. Mitigating Hallucinations (Neuro-Symbolic AI): Hybrid architectures, where probabilistic language models generate text constrained by formal kāraka semantic graphs, prevent the factual drift and hallucinations common in pure statistical architectures.',
        ],
      },
    ],
    quote:
      'Rigorous systematic formalization demonstrates that optimal communication does not require trading natural human expression for computational rigor; the two are unified in classical Indian linguistics.',
    keyTakeaways: [
      'In 1985, Rick Briggs (NASA Ames / RIACS) published in AI Magazine demonstrating that Sanskrit’s grammatical traditions had already solved semantic knowledge representation.',
      'Bhartṛhari’s Vākyapadīya (5th c. CE) established sentence holism (Akhaṇḍa-Vākya-Sphoṭa), demonstrating that meaning is an indivisible cognitive flash (Pratibhā).',
      'The six Kārakas (Kartā, Karma, Karaṇa, Sampradāna, Apādāna, Adhikaraṇa) form an action-centered (Kriyā) relational graph that directly anticipates modern semantic networks and frame semantics.',
      'Sanskrit’s standardized paraphrase (Śābdabodha) functions as an Intermediate Representation (IR), compiling colloquial syntax into invariant semantic primitives.',
      'The kāraka system formalizes into First-Order Predicate Logic (FOPL) event matrices, eliminating parsing and binding ambiguities.',
      'Bhartṛhari’s four speech levels (Vaikharī, Madhyamā, Paśyantī, Parā) and holistic Sphoṭa mirror the multi-head self-attention mechanisms of modern Transformer architectures.',
    ],
  },
];

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
      'While conventional school mathematics treats place value as a rigid set of isolated columns (Units, Tens, Hundreds), Vedic Mathematics treats it as a continuous, fluid continuum. Grounded in a framework that allows people to solve complex arithmetic 10 to 15 times faster than conventional methods, this system bypasses tedious scrap work to turn math into an engaging, visual game.',
      'The system\'s Sutras allow a mathematician to consciously manipulate positional boundaries to solve problems. Consider the concept of Simultaneous Processing found in the Vertically and Crosswise (Ūrdhva-Tiryagbhyām) sutra. In conventional long math, we multiply step-by-step, generate fragmented partial products, shift them awkwardly to the left with placeholder zeros, and then add them vertically.',
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
    title: 'Conclusion: The Geometry of the Infinite',
    paragraphs: [
      'To understand the genesis of Vedic Mathematics, one must dismantle the modern wall separating the secular from the sacred. In the ancient Vedic paradigm, mathematics meets spiritual metaphysics.',
      'Vedic Mathematics is a profound tribute to the universal power of place value. It teaches us that numbers are not clunky items to be stacked and dragged across a page, but values that flow harmoniously through geometric space.',
      'By unlocking the natural patterns inherent in our positional system, Swami Bharati Krishna Tirtha did not just invent a faster way to calculate. He revealed the deep, structural symmetry of numbers—offering a timeless manual for looking at the mathematical universe with absolute clarity.'
    ]
  }
};

export const VEDIC_LOGIC_LANGUAGE_ESSAY = {
  title: 'The Logic and Language of Vedic Mathematics: Reconstructing Ancient Sound for Modern Calculation',
  subtitle: 'Vedic Mathematics transforms complex arithmetic into rapid, visual, and rhythmic calculations through the mnemonic genius of classical Sanskrit.',
  intro: [
    'Vedic Mathematics is an ancient system of mental calculation based on 16 main sutras and 13 sub-sutras, originally recovered and structured by Swami Bharati Krishna Tirtha. These principles translate into standard algebraic expressions to provide efficient shortcuts for operations like squaring numbers ending in five, base multiplication, and vertical-crosswise multi-digit multiplication.',
    'Developed in the early 20th century, this methodology transforms complex mathematical operations—such as multi-digit multiplication, division, and algebraic factoring—into rapid, visual, and rhythmic calculations.',
    'The brilliance of the system lies in its linguistic architecture. By encoding mathematical laws into short, easily memorized Sanskrit phrases, it treats calculation not as a series of rigid operations, but as an adaptable pattern-recognition game.'
  ],
  sutraFramework: {
    title: 'The 16 Core Sutras (सूत्र) and Sub-Sutras (उपसूत्र)',
    desc: 'The word Sutra literally translates to "thread" or "aphorism." In traditional Indian pedagogy, a Sutra is designed to compress a vast amount of knowledge into a tiny, poetic phrase. The entire framework of Vedic Mathematics relies on 16 fundamental Sutras and 13 Sub-Sutras.',
    keySutras: [
      {
        id: 1,
        sanskrit: 'एकाधिकेन पूर्वेण',
        transliteration: 'Ekādhikena Pūrveṇa',
        meaning: 'By one more than the previous one.',
        application: 'Quickly square numbers that end in 5, or multiply numbers where the last digits add up to 10.',
        example: 'To square 35, take the "previous" digit (3), multiply it by "one more than itself" (3 × 4 = 12), and append the square of 5 (25). The answer is 1,225.'
      },
      {
        id: 2,
        sanskrit: 'निखिलं नवतश्चरमं दशतः',
        transliteration: 'Nikhilam Navataścaramam Daśataḥ',
        meaning: 'All from 9 and the last from 10.',
        application: 'Rapid subtraction and base multiplication (multiplying numbers close to 10, 100, 1000, etc.).',
        example: 'To subtract 764 from 1000, apply "all from 9" to the first digits (9 − 7 = 2, 9 − 6 = 3) and "the last from 10" to the final digit (10 − 4 = 6). The result is 236.'
      },
      {
        id: 3,
        sanskrit: 'ऊर्ध्व-तिर्यग्भ्याम्',
        transliteration: 'Ūrdhva-Tiryagbhyām',
        meaning: 'Vertically and crosswise.',
        application: 'The master formula for general multiplication. It allows a practitioner to multiply any two numbers entirely in a single line of mental math, bypassing the need for columns of partial products.'
      },
      {
        id: 4,
        sanskrit: 'परावर्त्य योजयेत्',
        transliteration: 'Parāvartya Yojayet',
        meaning: 'Transpose and adjust (or Transpose and apply).',
        application: 'Used extensively in advanced arithmetic and algebra for polynomial division, solving linear equations, and finding partial fractions.'
      }
    ]
  },
  historicalContext: {
    title: 'The Historical Context: Vedic or Modern?',
    intro: 'The system was brought to light by Swami Bharati Krishna Tirtha (1884–1960), a scholar and the Shankaracharya of Govardhan Math, who claimed to have reconstructed the formulae from the appendices of the Atharva Veda between 1911 and 1918.',
    comparisonMatrix: [
      {
        dimension: 'Origin Chronology',
        traditional: 'Derived directly from ancient Indian texts (c. 1500–500 BCE).',
        academic: 'Formulated in the early 20th century (published in 1965).'
      },
      {
        dimension: 'Textual Source',
        traditional: 'Extracted from the Parishishtas (appendices) of the Atharva Veda.',
        academic: 'Formulas do not appear in any known historical Vedic manuscript.'
      },
      {
        dimension: 'Nature of the System',
        traditional: 'A spiritual, holistic math paradigm embedded in ancient seers\' insights.',
        academic: 'A brilliant modern synthesis of mental math, leveraging Sanskrit mnemonic structures.'
      }
    ],
    synthesis: 'While historians note that the 16 Sutras are contemporary creations rather than ancient artifacts, this does not diminish their utility. Swami Bharati Krishna Tirtha successfully mapped complex arithmetic into the rhythmic, mnemonic structure of classical Sanskrit—a language historically optimized for oral preservation and mental processing.'
  },
  cognitiveLoad: {
    title: 'Why the Sanskrit Structure Works: Shifting the Cognitive Load',
    p1: 'Vedic Mathematics works because it shifts the cognitive load. Traditional western arithmetic requires heavy reliance on short-term memory to carry numbers and manage multi-step vertical columns.',
    p2: 'In contrast, the Sanskrit Sutras act as cognitive triggers. Because the rules are poetic phrases, they trigger spatial and holistic patterns in the mind. The system allows a student to look at a problem globally, choose the most elegant Sutra based on the properties of the numbers, and solve it with minimal scratchpad work.',
    conclusion: 'It remains one of the world\'s most enduring systems for cultivating mathematical agility and mental sharpness.'
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
        'Take first differential: d/dx(2x² + 5x + 2) = 4x + 5',
        'Discriminant test: √(5² − 4×2×2) = √(25 − 16) = √9 = 3',
        'Equate derivative to ± discriminant: 4x + 5 = ±3',
        '4x + 5 = 3 ➔ 4x = −2 ➔ 2x + 1 = 0; 4x + 5 = −3 ➔ 4x = −8 ➔ x + 2 = 0'
      ],
      answer: '(2x + 1)(x + 2)'
    }
  },
  {
    id: 10,
    sanskrit: 'यावदूनम्',
    transliteration: 'Yāvadūnam',
    meaning: 'By the deficiency',
    description: 'Squaring numbers close to powers of 10 (e.g., 94², 106²).',
    category: 'squaring',
    example: {
      problem: '94²',
      steps: [
        'Base is 100. Deficiency is 100 − 94 = 6',
        'Lessen number by deficiency: 94 − 6 = 88',
        'Square the deficiency: 6² = 36',
        'Append results: 88 | 36'
      ],
      answer: '8,836'
    }
  },
  {
    id: 11,
    sanskrit: 'व्यष्टिसमष्टिः',
    transliteration: 'Vyaṣṭisamaṣṭiḥ',
    meaning: 'Specific and general (Individual and Aggregate)',
    description: 'Finding particular solutions from general forms and solving symmetric cubic equations.',
    category: 'algebra',
    example: {
      problem: 'Factor x³ + 6x² + 11x + 6',
      steps: [
        'Test specific roots through visual symmetry (x = −1)',
        'Divide aggregate polynomial to yield quadratic: (x + 2)(x + 3)'
      ],
      answer: '(x + 1)(x + 2)(x + 3)'
    }
  },
  {
    id: 12,
    sanskrit: 'शेषाण्यङ्केन चरमेण',
    transliteration: 'Śeṣāṇyaṅkena Carameṇa',
    meaning: 'The remainders by the last digit',
    description: 'Converting fractions into recurring decimals without standard long division.',
    category: 'division',
    example: {
      problem: '1/7 to decimal',
      steps: [
        'Multiply consecutive remainders dynamically from right to left'
      ],
      answer: '0.142857...'
    }
  },
  {
    id: 13,
    sanskrit: 'सोपान्त्यद्वयमन्त्यम्',
    transliteration: 'Sopāntyadvayamantyam',
    meaning: 'The ultimate and twice the penultimate',
    description: 'Solves specific linear rational equations rapidly without cross-multiplying.',
    category: 'algebra',
    example: {
      problem: '1/(x+2) + 1/(x+3) = 1/(x+1) + 1/(x+4)',
      steps: [
        'Recognize penultimate balance: (2 + 3) = (1 + 4) = 5',
        'Apply formula directly to solve for x'
      ],
      answer: 'x = −2.5'
    }
  },
  {
    id: 14,
    sanskrit: 'एकन्यूनेन पूर्वेण',
    transliteration: 'Ekanyūnena Pūrveṇa',
    meaning: 'By one less than the previous one',
    description: 'Multiplying any number by strings of 9s (e.g., 99, 999, 9999) in under two seconds.',
    category: 'multiplication',
    example: {
      problem: '64 × 99',
      steps: [
        'Subtract 1 from 64: Left part = 64 − 1 = 63',
        'Subtract left part from 99: Right part = 99 − 63 = 36',
        'Combine Left and Right parts: 63 | 36'
      ],
      answer: '6,336'
    }
  },
  {
    id: 15,
    sanskrit: 'समुच्चयगुणितः',
    transliteration: 'Samuccayaguṇitaḥ',
    meaning: 'The product of the sum is the sum of the products',
    description: 'Instant algebraic verification tool checking factorizations and expansions.',
    category: 'algebra',
    example: {
      problem: 'Verify (x + 1)(x + 2) = x² + 3x + 2',
      steps: [
        'Substitute x = 1 into LHS: (1 + 1)(1 + 2) = 2 × 3 = 6',
        'Substitute x = 1 into RHS: 1² + 3(1) + 2 = 1 + 3 + 2 = 6',
        'LHS = RHS = 6 (Expansion is mathematically verified!)'
      ],
      answer: 'Verified Valid'
    }
  },
  {
    id: 16,
    sanskrit: 'गुणाकसमुच्चयः',
    transliteration: 'Guṇakasamuccayaḥ',
    meaning: 'The all-factor factor',
    description: 'Advanced polynomial factorization and quadratic root extraction.',
    category: 'algebra',
    example: {
      problem: 'Common factor extraction in polynomials',
      steps: [
        'Identify aggregate coefficient factors',
        'Extract root determinants across degrees'
      ],
      answer: 'Systematic roots'
    }
  }
];

export const VEDIC_SUBSUTRAS: VedicSubSutra[] = [
  {
    id: 1,
    sanskrit: 'आनुरूप्येण',
    transliteration: 'Ānurūpyeṇa',
    meaning: 'Proportionately',
    application: 'Enables base multiplication and division when numbers are near working bases (such as 20, 50, 200, 500) rather than standard powers of 10.'
  },
  {
    id: 2,
    sanskrit: 'शिष्यते शेषसंज्ञः',
    transliteration: 'Śiṣyate Śeṣasaṁjñaḥ',
    meaning: 'The remainder remains a constant',
    application: 'Used in polynomial remainder theorem and cyclic division algorithms.'
  },
  {
    id: 3,
    sanskrit: 'आद्यमाद्येनान्त्यमन्त्येन',
    transliteration: 'Ādyamādyenāntyamantyena',
    meaning: 'The first by the first and the last by the last',
    application: 'Instant verification of the first and last terms in polynomial multiplications and factoring.'
  },
  {
    id: 4,
    sanskrit: 'केवलैः सप्तकं गुण्यात्',
    transliteration: 'Kevalaiḥ Saptakaṁ Guṇyāt',
    meaning: 'For 7 the multiplicand is 143',
    application: 'Shortcut for dividing and finding decimal cycles of denominator 7.'
  },
  {
    id: 5,
    sanskrit: 'वेष्टनम्',
    transliteration: 'Veṣṭanam',
    meaning: 'By osculation',
    application: 'Checking divisibility of any large number by prime numbers (7, 13, 17, 19, 23, 29).'
  },
  {
    id: 6,
    sanskrit: 'यावदूनं तावदूनम्',
    transliteration: 'Yāvadūnaṁ Tāvadūnam',
    meaning: 'Lessen by the deficiency and square the deficiency',
    application: 'Direct mental calculation for cubing numbers close to a base.'
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

export const VEDIC_SUBSUTRA_WORKSHEETS: VedicSubSutraWorksheet[] = [
  {
    subSutraId: 1,
    title: 'Ānurūpyeṇa (Proportionately)',
    titleSa: 'आनुरूप्येण अभ्यास-पत्रकम्',
    level: 'Madhyama (Intermediate)',
    targetTimeMinutes: 5,
    description: 'Master working bases (such as 20, 50, 200, 500) where standard base multiplication is scaled proportionately.',
    problems: [
      {
        id: 'ss1-p1',
        question: 'Calculate 48 × 54 using working base 50 (Theoretical base 100 ÷ 2).',
        hint: 'Deviations from 50 are -2 and +4. Cross-add: 48 + 4 = 52. Proportion: divide by 2 to get LHS. RHS is (-2) × (+4) = -8.',
        answer: '2592',
        acceptedAnswers: ['2592', '2,592'],
        solutionSteps: [
          'Theoretical Base = 100; Working Base = 50 (Ratio = ÷ 2).',
          'Deviations from 50: 48 is -2, 54 is +4.',
          'Cross-addition: 48 + 4 = 52 (or 54 - 2 = 52).',
          'Proportionately divide LHS by 2: 52 ÷ 2 = 26 (represents 2,600).',
          'RHS product of deviations: (-2) × (+4) = -08.',
          'Combine: 2,600 - 8 = 2,592.'
        ],
        explanation: 'By scaling the theoretical base by 1/2, Ānurūpyeṇa enables rapid base arithmetic for numbers far from 10 or 100.'
      },
      {
        id: 'ss1-p2',
        question: 'Calculate 196 × 204 using working base 200 (Theoretical base 100 × 2).',
        hint: 'Deviations from 200 are -4 and +4. Cross-add: 196 + 4 = 200. Proportion: multiply LHS by 2.',
        answer: '39984',
        acceptedAnswers: ['39984', '39,984'],
        solutionSteps: [
          'Theoretical Base = 100; Working Base = 200 (Ratio = × 2).',
          'Deviations from 200: 196 is -4, 204 is +4.',
          'Cross-addition: 196 + 4 = 200.',
          'Scale LHS by proportion factor 2: 200 × 2 = 400 (represents 40,000).',
          'RHS product: (-4) × (+4) = -16.',
          'Combine: 40,000 - 16 = 39,984.'
        ],
        explanation: 'Working base 200 doubles the cross-sum before appending the deviation difference.'
      },
      {
        id: 'ss1-p3',
        question: 'Calculate 492 × 498 using working base 500 (Theoretical base 1,000 ÷ 2).',
        hint: 'Deviations: -8 and -2. Cross-add: 492 - 2 = 490. Divide by 2 = 245. RHS is (-8) × (-2) = 016 (3 digits for base 1000).',
        answer: '245016',
        acceptedAnswers: ['245016', '245,016'],
        solutionSteps: [
          'Theoretical Base = 1,000; Working Base = 500 (Ratio = ÷ 2).',
          'Deviations: 492 is -8, 498 is -2.',
          'Cross-operation: 492 - 2 = 490.',
          'Proportionately divide by 2: 490 ÷ 2 = 245.',
          'RHS product: (-8) × (-2) = 016 (3 digits because base 1,000 has 3 zeros).',
          'Combine: 245,016.'
        ],
        explanation: 'Three digits on the RHS correspond to the three zeros of base 1,000.'
      }
    ]
  },
  {
    subSutraId: 2,
    title: 'Śiṣyate Śeṣasaṁjñaḥ (The Remainder Remains a Constant)',
    titleSa: 'शिष्यते शेषसंज्ञः अभ्यास-पत्रकम्',
    level: 'Madhyama (Intermediate)',
    targetTimeMinutes: 4,
    description: 'Rapid polynomial remainder determinations and cyclical quotient extractions.',
    problems: [
      {
        id: 'ss2-p1',
        question: 'Find the remainder when P(x) = 2x³ - 5x² + 4x - 7 is divided by (x - 2).',
        hint: 'By Śiṣyate Śeṣasaṁjñaḥ (Remainder Theorem), substitute x = 2 directly into P(x).',
        answer: '-3',
        acceptedAnswers: ['-3'],
        solutionSteps: [
          'Set divisor to zero: x - 2 = 0 ➔ x = 2.',
          'Substitute x = 2 into P(x):',
          'P(2) = 2(2)³ - 5(2)² + 4(2) - 7',
          'P(2) = 2(8) - 5(4) + 8 - 7',
          'P(2) = 16 - 20 + 8 - 7 = -3.',
          'The constant remainder is -3.'
        ],
        explanation: 'The sub-sutra affirms that remainder evaluation requires only constant substitution into the dividend.'
      },
      {
        id: 'ss2-p2',
        question: 'Find the remainder when 3x² + 5x + 9 is divided by (x + 1).',
        hint: 'Set x + 1 = 0 ➔ x = -1, and evaluate the expression.',
        answer: '7',
        acceptedAnswers: ['7', '+7'],
        solutionSteps: [
          'Set divisor to zero: x + 1 = 0 ➔ x = -1.',
          'Substitute: 3(-1)² + 5(-1) + 9',
          '= 3(1) - 5 + 9',
          '= 3 - 5 + 9 = 7.',
          'The remainder is 7.'
        ],
        explanation: 'Eliminates tedious long division by reducing it to simple integer arithmetic.'
      },
      {
        id: 'ss2-p3',
        question: 'Find the remainder when x⁴ - 2x² + 5 is divided by (x - 3).',
        hint: 'Evaluate at x = 3: 3⁴ - 2(3²) + 5.',
        answer: '68',
        acceptedAnswers: ['68'],
        solutionSteps: [
          'Set x = 3.',
          '3⁴ = 81.',
          '2(3²) = 2(9) = 18.',
          'Remainder = 81 - 18 + 5 = 68.'
        ],
        explanation: 'Direct evaluation remains constant and exact regardless of polynomial power.'
      }
    ]
  },
  {
    subSutraId: 3,
    title: 'Ādyamādyenāntyamantyena (First by First and Last by Last)',
    titleSa: 'आद्यमाद्येनान्त्यमन्त्येन अभ्यास-पत्रकम्',
    level: 'Prāthamika (Beginner)',
    targetTimeMinutes: 4,
    description: 'Instant inspection and verification of extreme terms in quadratic factoring and algebraic expansions.',
    problems: [
      {
        id: 'ss3-p1',
        question: 'For 2x² + 7x + 3 = (2x + 1)(x + k), find the constant k by inspecting the first and last terms.',
        hint: 'Last by last: 1 × k = 3.',
        answer: '3',
        acceptedAnswers: ['3', '+3'],
        solutionSteps: [
          'First term verification: 2x · x = 2x².',
          'Last term principle: 1 · k = 3.',
          'Therefore, k = 3 ÷ 1 = 3.',
          'Factors are (2x + 1)(x + 3).'
        ],
        explanation: 'Extreme terms fix both the leading coefficients and constant terms immediately.'
      },
      {
        id: 'ss3-p2',
        question: 'When expanding (4x + 3)(3x + 5), what is the sum of the first coefficient (a) and last constant (c) in ax² + bx + c?',
        hint: 'First by first: a = 4 × 3 = 12. Last by last: c = 3 × 5 = 15.',
        answer: '27',
        acceptedAnswers: ['27'],
        solutionSteps: [
          'First coefficient a = 4 × 3 = 12.',
          'Last constant c = 3 × 5 = 15.',
          'Sum a + c = 12 + 15 = 27.'
        ],
        explanation: 'First and last terms can be written down at glance without computing middle terms.'
      },
      {
        id: 'ss3-p3',
        question: 'If (3x + 2)(x + 4) = 3x² + bx + 8, what is the middle coefficient b obtained from cross-multiplying?',
        hint: 'Inner product + outer product: (2 × 1) + (3 × 4).',
        answer: '14',
        acceptedAnswers: ['14'],
        solutionSteps: [
          'Inner product: 2 · x = 2x.',
          'Outer product: 3x · 4 = 12x.',
          'Sum = 2x + 12x = 14x.',
          'Therefore, b = 14.'
        ],
        explanation: 'Cross-multiplication of inner and outer terms provides the middle coefficient.'
      }
    ]
  },
  {
    subSutraId: 4,
    title: 'Kevalaiḥ Saptakaṁ Guṇyāt (For 7 the Multiplicand is 143)',
    titleSa: 'केवलैः सप्तकं गुण्यात् अभ्यास-पत्रकम्',
    level: 'Madhyama (Intermediate)',
    targetTimeMinutes: 4,
    description: 'Mental shortcuts for decimal cycles of fraction families with denominator 7.',
    problems: [
      {
        id: 'ss4-p1',
        question: 'What is the complete 6-digit repeating decimal cycle of 1/7?',
        hint: '1/7 = 0.142857142857... Enter the 6 recurring digits.',
        answer: '142857',
        acceptedAnswers: ['142857', '0.142857'],
        solutionSteps: [
          '7 × 143 = 1001.',
          '1/7 = 143 ÷ 1001 = 0.142857142857...',
          'The repeating 6-digit cycle is 142857.'
        ],
        explanation: 'Multiplicand 143 links 7 to 1001, defining the cyclic ring (1-4-2-8-5-7).'
      },
      {
        id: 'ss4-p2',
        question: 'Using the cyclic ring 142857, what are the 6 repeating decimal digits for 3/7?',
        hint: '30 ÷ 7 = 4 with remainder 2. Trace the 142857 ring starting from digit 4.',
        answer: '428571',
        acceptedAnswers: ['428571', '0.428571'],
        solutionSteps: [
          '3 ÷ 7 starts at 0.4... (since 30 ÷ 7 = 4).',
          'Follow the cyclic ring 142857 starting from 4: 4 ➔ 2 ➔ 8 ➔ 5 ➔ 7 ➔ 1.',
          'Result: 3/7 = 0.428571428571...'
        ],
        explanation: 'All fractions n/7 (for n=1..6) have the exact same cyclic permutation starting at different digits.'
      },
      {
        id: 'ss4-p3',
        question: 'What are the 6 repeating decimal digits of 2/7?',
        hint: '20 ÷ 7 = 2 with remainder 6. Trace starting from digit 2.',
        answer: '285714',
        acceptedAnswers: ['285714', '0.285714'],
        solutionSteps: [
          '2 ÷ 7 begins with 0.2...',
          'Starting from digit 2 in 142857 gives 2 ➔ 8 ➔ 5 ➔ 7 ➔ 1 ➔ 4.',
          'Result: 285714.'
        ],
        explanation: 'Mental cyclic shift gives the answer in under 2 seconds.'
      }
    ]
  },
  {
    subSutraId: 5,
    title: 'Veṣṭanam (By Osculation)',
    titleSa: 'वेष्टनम् अभ्यास-पत्रकम्',
    level: 'Prauḍha (Advanced)',
    targetTimeMinutes: 5,
    description: 'Instant prime divisibility checks using positive (Ekādhika) and negative osculators.',
    problems: [
      {
        id: 'ss5-p1',
        question: 'What is the positive osculator (Ekādhika P) for testing divisibility by 19?',
        hint: 'For 19, the next multiple of 10 is 20. Drop the trailing zero.',
        answer: '2',
        acceptedAnswers: ['2', '+2'],
        solutionSteps: [
          'Divisor ending in 9: add 1 ➔ 19 + 1 = 20.',
          'Drop the zero (divide by 10): 20 ÷ 10 = 2.',
          'Therefore, positive osculator P = 2.'
        ],
        explanation: 'The osculator P multiplies the units digit to be added iteratively to the truncated number.'
      },
      {
        id: 'ss5-p2',
        question: 'Test 247 for divisibility by 19 using osculator 2. What is the reduced sum: 24 + (7 × 2)?',
        hint: 'Truncate last digit 7. Multiply by 2: 14. Add to 24.',
        answer: '38',
        acceptedAnswers: ['38'],
        solutionSteps: [
          'Truncate 247: remaining = 24, last digit = 7.',
          'Multiply last digit by osculator 2: 7 × 2 = 14.',
          'Add: 24 + 14 = 38.',
          'Since 38 = 19 × 2, 247 is divisible by 19!'
        ],
        explanation: 'A 3-digit number is reduced in one step to an easily recognizable multiple.'
      },
      {
        id: 'ss5-p3',
        question: 'What is the positive osculator P for testing divisibility by 13 (since 13 × 3 = 39)?',
        hint: '39 ends in 9. Add 1 to get 40, then drop the zero.',
        answer: '4',
        acceptedAnswers: ['4', '+4'],
        solutionSteps: [
          'Find a multiple of 13 ending in 9: 13 × 3 = 39.',
          'Add 1: 39 + 1 = 40.',
          'Drop the zero: P = 4.',
          'Hence positive osculator for 13 is 4.'
        ],
        explanation: 'Any prime can be osculated by finding its multiple ending in 9 or 1.'
      }
    ]
  },
  {
    subSutraId: 6,
    title: 'Yāvadūnaṁ Tāvadūnam (Lessen by Deficiency, Square Deficiency)',
    titleSa: 'यावदूनं तावदूनम् अभ्यास-पत्रकम्',
    level: 'Prauḍha (Advanced)',
    targetTimeMinutes: 6,
    description: 'Three-part mental cubing formula for numbers close to powers of 10.',
    problems: [
      {
        id: 'ss6-p1',
        question: 'Calculate 103³ using Yāvadūnaṁ with base 100 (surplus d = 3).',
        hint: 'Formula: (N + 2d) | 3d² | d³. Here d = 3.',
        answer: '1092727',
        acceptedAnswers: ['1092727', '1,092,727'],
        solutionSteps: [
          'Base = 100; deviation d = +3.',
          'LHS = 103 + 2(3) = 109.',
          'Middle = 3 × (3²) = 3 × 9 = 27.',
          'RHS = 3³ = 27.',
          'Combine parts (2 digits each): 109 | 27 | 27 = 1,092,727.'
        ],
        explanation: 'Directly yields the cube in three parallel mental calculations.'
      },
      {
        id: 'ss6-p2',
        question: 'Calculate 102³ using base 100 (surplus d = 2).',
        hint: 'LHS: 102 + 2(2) = 106. Middle: 3 × 2² = 12. RHS: 2³ = 08.',
        answer: '1061208',
        acceptedAnswers: ['1061208', '1,061,208'],
        solutionSteps: [
          'Deviation d = +2 from base 100.',
          'LHS = 102 + 4 = 106.',
          'Middle = 3 × 4 = 12.',
          'RHS = 2³ = 08 (padded to 2 digits).',
          'Combine: 1,061,208.'
        ],
        explanation: 'Base 100 requires 2 digits in both middle and RHS segments.'
      },
      {
        id: 'ss6-p3',
        question: 'Calculate 98³ using base 100 (deficiency d = -2).',
        hint: 'LHS: 98 - 4 = 94. Middle: 3 × (-2)² = 12. RHS: (-2)³ = -08. Borrow 1 from 12.',
        answer: '941192',
        acceptedAnswers: ['941192', '941,192'],
        solutionSteps: [
          'Deviation d = -2 from base 100.',
          'LHS = 98 + 2(-2) = 94.',
          'Middle = 3 × (-2)² = 12.',
          'RHS = (-2)³ = -08.',
          'Borrow 1 from middle: middle becomes 11, RHS becomes 100 - 8 = 92.',
          'Combine: 941,192.'
        ],
        explanation: 'Handling negative cubic deviations via simple base borrowing.'
      }
    ]
  },
  {
    subSutraId: 7,
    title: 'Yāvadūnaṁ Tāvadūnīkṛtya Vargaṁ Ca Yojayet (Base Squaring)',
    titleSa: 'यावदूनं तावदूनीकृत्य वर्गं च योजयेत् अभ्यास-पत्रकम्',
    level: 'Prāthamika (Beginner)',
    targetTimeMinutes: 4,
    description: 'The universal Vedic squaring shortcut: lessen by deficiency and append the square.',
    problems: [
      {
        id: 'ss7-p1',
        question: 'Calculate 96² using Yāvadūnaṁ Tāvadūnīkṛtya (Base 100).',
        hint: 'Deficiency is 4. LHS: 96 - 4 = 92. RHS: 4² = 16.',
        answer: '9216',
        acceptedAnswers: ['9216', '9,216'],
        solutionSteps: [
          'Base = 100; deficiency = 100 - 96 = 4.',
          'LHS: Lessen number by deficiency: 96 - 4 = 92.',
          'RHS: Square the deficiency: 4² = 16.',
          'Combine: 9,216.'
        ],
        explanation: 'One of the most famous and widely celebrated Vedic mental math techniques.'
      },
      {
        id: 'ss7-p2',
        question: 'Calculate 107² using base 100 (surplus = 7).',
        hint: 'LHS: 107 + 7 = 114. RHS: 7² = 49.',
        answer: '11449',
        acceptedAnswers: ['11449', '11,449'],
        solutionSteps: [
          'Surplus over 100 = +7.',
          'LHS: 107 + 7 = 114.',
          'RHS: 7² = 49.',
          'Combine: 11,449.'
        ],
        explanation: 'Works identically for numbers above the base by adding the surplus.'
      },
      {
        id: 'ss7-p3',
        question: 'Calculate 994² using base 1,000 (deficiency = 6).',
        hint: 'LHS: 994 - 6 = 988. RHS: 6² = 036 (3 digits for base 1000).',
        answer: '988036',
        acceptedAnswers: ['988036', '988,036'],
        solutionSteps: [
          'Base = 1,000; deficiency = 6.',
          'LHS: 994 - 6 = 988.',
          'RHS: 6² = 36 ➔ written as 036 (3 digits).',
          'Combine: 988,036.'
        ],
        explanation: 'Instant 6-digit mental square in under 3 seconds.'
      }
    ]
  },
  {
    subSutraId: 8,
    title: 'Antyayordaśake\'pi (When Final Digits Sum to 10)',
    titleSa: 'अन्त्ययोर्दशकेऽपि अभ्यास-पत्रकम्',
    level: 'Prāthamika (Beginner)',
    targetTimeMinutes: 3,
    description: 'Rapid product when units sum to 10 and all previous digits are identical.',
    problems: [
      {
        id: 'ss8-p1',
        question: 'Calculate 43 × 47 using Antyayordaśake\'pi.',
        hint: 'Tens match (4), units 3 + 7 = 10. Left: 4 × 5 = 20. Right: 3 × 7 = 21.',
        answer: '2021',
        acceptedAnswers: ['2021', '2,021'],
        solutionSteps: [
          'Check condition: 3 + 7 = 10; tens digit = 4.',
          'Left part: 4 × (4 + 1) = 4 × 5 = 20.',
          'Right part: 3 × 7 = 21.',
          'Combine: 2,021.'
        ],
        explanation: 'Combines Ekādhikena on the tens with direct product on the units.'
      },
      {
        id: 'ss8-p2',
        question: 'Calculate 62 × 68.',
        hint: 'Tens: 6 × 7 = 42. Units: 2 × 8 = 16.',
        answer: '4216',
        acceptedAnswers: ['4216', '4,216'],
        solutionSteps: [
          'Check: 2 + 8 = 10; identical tens = 6.',
          'Left: 6 × 7 = 42.',
          'Right: 2 × 8 = 16.',
          'Combine: 4,216.'
        ],
        explanation: 'Eliminates multi-step multiplication instantly.'
      },
      {
        id: 'ss8-p3',
        question: 'Calculate 91 × 99.',
        hint: 'Left: 9 × 10 = 90. Right: 1 × 9 = 09 (two digits required).',
        answer: '9009',
        acceptedAnswers: ['9009', '9,009'],
        solutionSteps: [
          'Left: 9 × (9 + 1) = 90.',
          'Right: 1 × 9 = 9 ➔ format with 2 digits as 09.',
          'Combine: 9,009.'
        ],
        explanation: 'Remembering zero-padding on single digit products ensures exact place value.'
      }
    ]
  },
  {
    subSutraId: 9,
    title: 'Antyayoreva (Only the Last Terms)',
    titleSa: 'अन्त्ययोरेव अभ्यास-पत्रकम्',
    level: 'Madhyama (Intermediate)',
    targetTimeMinutes: 3,
    description: 'Rapid deduction of constant terms in polynomial expansions and rational functions.',
    problems: [
      {
        id: 'ss9-p1',
        question: 'Find the constant term in the expansion of (x + 3)(x - 4)(x + 5).',
        hint: 'Consider only the last terms: (+3) × (-4) × (+5).',
        answer: '-60',
        acceptedAnswers: ['-60'],
        solutionSteps: [
          'Independent constant term equals the product of individual constants.',
          'By Antyayoreva: 3 × (-4) × 5.',
          '3 × (-4) = -12; -12 × 5 = -60.',
          'The constant term is -60.'
        ],
        explanation: 'Higher-degree polynomials reveal their constant term immediately upon inspecting trailing numbers.'
      },
      {
        id: 'ss9-p2',
        question: 'Find the constant term of the rational expression [(x + 6)(x - 2)] / [(x + 4)(x + 3)].',
        hint: 'Evaluate at x = 0 (only the last terms): [6 × (-2)] / [4 × 3].',
        answer: '-1',
        acceptedAnswers: ['-1'],
        solutionSteps: [
          'Numerator constant: 6 × (-2) = -12.',
          'Denominator constant: 4 × 3 = 12.',
          'Ratio = -12 ÷ 12 = -1.'
        ],
        explanation: 'Rational limits and asymptotes benefit directly from evaluating only terminal terms.'
      },
      {
        id: 'ss9-p3',
        question: 'In the product (2x + 5)(3x - 2), what is the value of the independent constant?',
        hint: 'Multiply only the last terms: 5 × (-2).',
        answer: '-10',
        acceptedAnswers: ['-10'],
        solutionSteps: [
          'Multiply constants: 5 · (-2) = -10.',
          'The independent term is -10.'
        ],
        explanation: 'Directly isolates the term independent of x.'
      }
    ]
  },
  {
    subSutraId: 10,
    title: 'Samuccayaguṇitaḥ (Sum of Coefficients into the Product)',
    titleSa: 'समुच्चयगुणितः अभ्यास-पत्रकम्',
    level: 'Madhyama (Intermediate)',
    targetTimeMinutes: 4,
    description: 'Verifying polynomial identities: the sum of coefficients in factors equals sum of coefficients in product.',
    problems: [
      {
        id: 'ss10-p1',
        question: 'For (2x + 3)(3x + 4) = 6x² + 17x + 12, what is the verified sum of coefficients on both sides?',
        hint: 'Evaluate at x = 1: (2 + 3) × (3 + 4) = 5 × 7.',
        answer: '35',
        acceptedAnswers: ['35'],
        solutionSteps: [
          'Sum of coefficients in (2x + 3): 2 + 3 = 5.',
          'Sum of coefficients in (3x + 4): 3 + 4 = 7.',
          'Product of sums = 5 × 7 = 35.',
          'RHS sum: 6 + 17 + 12 = 35.',
          'Both sides equal 35 (identity verified!).'
        ],
        explanation: 'Provides an infallible algebraic check without expanding terms.'
      },
      {
        id: 'ss10-p2',
        question: 'What is the sum of coefficients in the expansion of (4x - 1)³?',
        hint: 'Substitute x = 1: (4(1) - 1)³ = 3³.',
        answer: '27',
        acceptedAnswers: ['27'],
        solutionSteps: [
          'Substitute x = 1 into (4x - 1)³.',
          '(4 - 1)³ = 3³.',
          '3³ = 27.',
          'The sum of coefficients is 27.'
        ],
        explanation: 'Bypasses lengthy binomial expansions to obtain total coefficient magnitude.'
      },
      {
        id: 'ss10-p3',
        question: 'If (x² - 3x + 5)(2x - 1) is expanded, what is the sum of coefficients of the resulting polynomial?',
        hint: 'Evaluate at x = 1: (1 - 3 + 5) × (2 - 1).',
        answer: '3',
        acceptedAnswers: ['3'],
        solutionSteps: [
          'First factor: 1 - 3 + 5 = 3.',
          'Second factor: 2 - 1 = 1.',
          'Product = 3 × 1 = 3.'
        ],
        explanation: 'Works across polynomials of any degree.'
      }
    ]
  },
  {
    subSutraId: 11,
    title: 'Lopanasthāpanābhyām (By Elimination and Retention)',
    titleSa: 'लोपनस्थापनाभ्याम् अभ्यास-पत्रकम्',
    level: 'Prauḍha (Advanced)',
    targetTimeMinutes: 5,
    description: 'Factoring multi-variable polynomials by systematically eliminating one variable, solving, and assembling.',
    problems: [
      {
        id: 'ss11-p1',
        question: 'In Lopanasthāpanābhyām, to factorize 2x² + 5xy + 2y² + 7x + 7y + 3, if we eliminate y (set y = 0), what is the constant k when 2x² + 7x + 3 is factored into (2x + 1)(x + k)?',
        hint: '2x² + 7x + 3 = (2x + 1)(x + 3).',
        answer: '3',
        acceptedAnswers: ['3'],
        solutionSteps: [
          'Eliminate variable y by setting y = 0.',
          'Expression reduces to: 2x² + 7x + 3.',
          'Factorizing: 2x² + 6x + x + 3 = (2x + 1)(x + 3).',
          'Hence constant k = 3.'
        ],
        explanation: 'Eliminating y isolates the pure x-structure.'
      },
      {
        id: 'ss11-p2',
        question: 'When x is eliminated (x = 0) in x² + 3xy + 2y² + 4x + 5y + 3, we get 2y² + 5y + 3 = (2y + 3)(y + m). What is m?',
        hint: 'Last term 3 ÷ 3 = 1.',
        answer: '1',
        acceptedAnswers: ['1'],
        solutionSteps: [
          'Set x = 0 to eliminate x.',
          'Remaining: 2y² + 5y + 3.',
          'Factorizing: (2y + 3)(y + 1).',
          'Therefore, m = 1.'
        ],
        explanation: 'Symmetrically solves the y-component.'
      },
      {
        id: 'ss11-p3',
        question: 'For assembled factors (x + 2y + 3)(x + y + 1), what is the coefficient of the xy cross term in its expansion?',
        hint: 'Cross terms: (x · y) + (2y · x) = 3xy.',
        answer: '3',
        acceptedAnswers: ['3'],
        solutionSteps: [
          'Multiply x by y = xy.',
          'Multiply 2y by x = 2xy.',
          'Sum = xy + 2xy = 3xy.',
          'Coefficient is 3 (matches original expression!).'
        ],
        explanation: 'Cross terms confirm that the independent factorizations combine seamlessly.'
      }
    ]
  },
  {
    subSutraId: 12,
    title: 'Vilokanam (By Observation / Inspection)',
    titleSa: 'विलोकनम् अभ्यास-पत्रकम्',
    level: 'Prāthamika (Beginner)',
    targetTimeMinutes: 3,
    description: 'Mental inspection of symmetry, reciprocal relationships, and simultaneous balances.',
    problems: [
      {
        id: 'ss12-p1',
        question: 'Solve for x by Vilokanam (inspection): x + 1/x = 2.5 (where x > 1).',
        hint: 'Rewrite 2.5 as 2 + 1/2. By visual symmetry with x + 1/x, what is x?',
        answer: '2',
        acceptedAnswers: ['2'],
        solutionSteps: [
          'Write 2.5 as the sum of an integer and its reciprocal: 2 + 1/2.',
          'Compare: x + 1/x = 2 + 1/2.',
          'By inspection, x = 2 (or 1/2).',
          'Since x > 1, x = 2.'
        ],
        explanation: 'Bypasses setting up a quadratic equation through visual pattern recognition.'
      },
      {
        id: 'ss12-p2',
        question: 'Solve for x by inspection: x + 1/x = 10/3 (where x > 1).',
        hint: '10/3 = 3 + 1/3.',
        answer: '3',
        acceptedAnswers: ['3'],
        solutionSteps: [
          'Decompose 10/3 into 3 + 1/3.',
          'Compare directly with x + 1/x.',
          'x = 3.'
        ],
        explanation: 'Symmetry allows immediate solution without paper and pencil.'
      },
      {
        id: 'ss12-p3',
        question: 'Inspect the system: x + y = 12 and x - y = 4. What is the value of x?',
        hint: 'x is the arithmetic mean of sum and difference: (12 + 4) ÷ 2.',
        answer: '8',
        acceptedAnswers: ['8'],
        solutionSteps: [
          'In any sum and difference pair, x = (Sum + Diff) / 2.',
          'x = (12 + 4) / 2 = 16 / 2 = 8.',
          '(And y = (12 - 4) / 2 = 4).'
        ],
        explanation: 'Observation solves two simultaneous equations in one mental breath.'
      }
    ]
  },
  {
    subSutraId: 13,
    title: 'Guṇitasamuccayaḥ Samuccayaguṇakaḥ (Product of Sum is Sum of Products)',
    titleSa: 'गुणितसमुच्चयः समुच्चयगुणकः अभ्यास-पत्रकम्',
    level: 'Prauḍha (Advanced)',
    targetTimeMinutes: 4,
    description: 'Higher-degree verification matrix: product of coefficient sums equals sum of expansion coefficients.',
    problems: [
      {
        id: 'ss13-p1',
        question: 'For (x + 2)(x + 3)(x + 4) = x³ + 9x² + 26x + 24, verify by Guṇitasamuccayaḥ: what is the product of the sums of the coefficients of the three binomial factors?',
        hint: 'Evaluate each factor at x = 1: (1 + 2) × (1 + 3) × (1 + 4).',
        answer: '60',
        acceptedAnswers: ['60'],
        solutionSteps: [
          'Factor 1 sum: 1 + 2 = 3.',
          'Factor 2 sum: 1 + 3 = 4.',
          'Factor 3 sum: 1 + 4 = 5.',
          'Product of factor sums = 3 × 4 × 5 = 60.',
          'RHS expansion sum: 1 + 9 + 26 + 24 = 60.',
          'Both equal 60, confirming the cubic expansion is 100% correct.'
        ],
        explanation: 'A rigorous verification safeguard for factoring and expanding higher-order polynomials.'
      },
      {
        id: 'ss13-p2',
        question: 'For the polynomial product (2x - 1)(3x + 2)(x - 2), what is the sum of coefficients of the expanded polynomial?',
        hint: 'Evaluate at x = 1: (2 - 1) × (3 + 2) × (1 - 2).',
        answer: '-5',
        acceptedAnswers: ['-5'],
        solutionSteps: [
          'Factor 1: 2 - 1 = 1.',
          'Factor 2: 3 + 2 = 5.',
          'Factor 3: 1 - 2 = -1.',
          'Product of sums = 1 × 5 × (-1) = -5.',
          'The expanded polynomial coefficient sum will equal -5.'
        ],
        explanation: 'Predicts the coefficient sum before multiplying.'
      },
      {
        id: 'ss13-p3',
        question: 'Apply Guṇitasamuccayaḥ to (x² + x + 1)(x - 1) = x³ - 1. What is the verified sum of coefficients on both sides?',
        hint: 'Evaluate factor (x - 1) at x = 1: 1 - 1 = 0.',
        answer: '0',
        acceptedAnswers: ['0'],
        solutionSteps: [
          'Factor 1 sum: 1 + 1 + 1 = 3.',
          'Factor 2 sum: 1 - 1 = 0.',
          'Product: 3 × 0 = 0.',
          'RHS sum: 1 - 1 = 0.',
          'Both sides equal 0.'
        ],
        explanation: 'Demonstrates zero-product property in coefficient validation.'
      }
    ]
  }
];

