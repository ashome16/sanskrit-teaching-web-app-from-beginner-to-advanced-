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

export interface VedicArticleSection {
  title: string;
  sanskritTitle?: string;
  paragraphs: string[];
  highlight?: string;
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
  keyTakeaways: string[];
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
    id: 'algebra-engine',
    slug: 'universal-engine-of-algebra',
    title: 'The Universal Engine of Algebra: Unifying Arithmetic & Polynomials',
    sanskritTitle: '॥ बीजगणितस्य सार्वभौम-यन्त्रम् ॥',
    subtitle: 'Arithmetic is Base 10, Algebra is Base x: Discover how the exact same sutra multiplies numbers and polynomials with identical coefficient vectors.',
    readingTime: '6 min read',
    badge: 'Mathematical Unification',
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
  }
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

