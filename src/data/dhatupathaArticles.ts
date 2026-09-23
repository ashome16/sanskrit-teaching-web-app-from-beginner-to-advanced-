export interface ArticleSutra {
  sutra: string;
  number: string;
  meaning: string;
}

export interface ArticleExample {
  sanskrit: string;
  transliteration: string;
  meaning: string;
  breakdown?: string;
  audioKey?: string;
}

export interface GanaCard {
  number: number;
  nameSan: string;
  nameEn: string;
  titleBadge: string;
  blueprint: string;
  exampleRoot: string;
  exampleDerivation: string;
  exampleMeaning: string;
  funFact?: string;
  vikarana: string;
}

export interface ModularBlock {
  tag: string;
  nameSan: string;
  nameEn: string;
  status: 'Optional' | 'Mandatory';
  role: string;
  color: 'amber' | 'blue' | 'purple' | 'emerald';
  description: string;
  examplePiece: string;
  exampleRole: string;
}

export interface AssemblyStep {
  stepNumber: number;
  badge: string;
  title: string;
  description: string;
  formulaPieces: {
    text: string;
    type: 'prefix' | 'root' | 'vikarana' | 'suffix' | 'op' | 'arrow' | 'result';
  }[];
  audioText?: string;
  highlightText?: string;
}

export interface DeconStep {
  stepKey: string;
  stepIcon: string;
  stepName: string;
  stepSan: string;
  actionText: string;
  inspectedPiece: string;
  deductionTitle: string;
  deductionText: string;
}

export interface ArticleSection {
  title: string;
  titleSan?: string;
  paragraphs: string[];
  sutras?: ArticleSutra[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  keyTakeaway?: string;
  examples?: ArticleExample[];
  ganaCards?: GanaCard[];
  modularBlocks?: ModularBlock[];
  assemblySteps?: AssemblyStep[];
  deconSteps?: DeconStep[];
}

export interface DhatupathaArticle {
  id: string;
  titleSan: string;
  titleEn: string;
  badge: string;
  badgeColor: string;
  readTime: string;
  summary: string;
  suggestedAction?: {
    type: 'deconstruct' | 'generate';
    targetWord?: string;
    dhatuId?: string;
    label: string;
  };
  sections: ArticleSection[];
}

export const DHATUPATHA_ARTICLES: DhatupathaArticle[] = [
  {
    id: 'intro-dhatupatha',
    titleSan: 'महर्षि-पाणिनेः धातुपाठः — परिचयः एवं संरचना',
    titleEn: 'Introduction to Pāṇinian Dhātupāṭha & Upadeśa Architecture',
    badge: 'पाणिनीय-परिचयः',
    badgeColor: '#0f766e',
    readTime: '6 min read',
    summary:
      'Discover the structural genius of Maharshi Pāṇini’s verbal lexicon. Learn how 2,000 verbal roots generate the entire Sanskrit universe of words through mathematical precision and silent code-letters (इत्-संज्ञा).',
    suggestedAction: {
      type: 'deconstruct',
      targetWord: 'भवति',
      label: 'Deconstruct "भवति" in Studio ➔',
    },
    sections: [
      {
        title: 'The Seed Theory of Sanskrit Vocabulary (धातुमूलकत्वम्)',
        titleSan: 'सर्वशब्दानां धातुमूलकत्वम्',
        paragraphs: [
          'In ancient Indian linguistics, Acharya Yāska (Nirukta) and Maharshi Pāṇini (Aṣṭādhyāyī) established the revolutionary principle: "नामानि आख्यातजानि" — every noun, pronoun, adjective, and verbal expression in Sanskrit is born from a fundamental verbal root called a Dhātu (धातु).',
          'A Dhātu is not merely a dictionary entry; it is an elemental atom of action (क्रियावाचक). From roughly 2,000 roots cataloged in Pāṇini’s Dhātupāṭha, millions of sentences, philosophical treatises, and scientific texts are derived algorithmically.',
        ],
        keyTakeaway:
          'To master Sanskrit, one must not memorize infinite nouns; one must understand how verbal roots combine with prefixes (उपसर्ग) and suffixes (प्रत्यय).',
      },
      {
        title: 'The Five Upadeśas (पञ्चोपदेशाः)',
        titleSan: 'व्याकरणस्य पञ्च आधारस्तम्भाः',
        paragraphs: [
          'Pāṇini’s grammatical system rests on five foundational texts, canonically known as the Upadeśas (primordial teachings). Without the Dhātupāṭha, the Aṣṭādhyāyī cannot function because its rules directly reference roots listed here.',
        ],
        sutras: [
          {
            sutra: 'धातुसूत्रगणोणादिवाक्यलिङ्गानुशासनम् । आगमप्रत्ययादेशा उपदेशाः प्रकीर्तिताः ॥',
            number: 'पारम्परिक-कारिका',
            meaning:
              'The verbal roots (Dhātu), grammatical rules (Sūtra), nominal groups (Gaṇa), primitive suffixes (Uṇādi), and gender rules (Liṅga) are the primordial Upadeśas.',
          },
        ],
        table: {
          headers: ['Upadeśa (उपदेश)', 'Role & Content', 'Significance'],
          rows: [
            ['सूत्रपाठः (Sūtrapāṭha)', '3,995 algebraic transformation rules (Aṣṭādhyāyī)', 'The Derivation Engine'],
            ['धातुपाठः (Dhātupāṭha)', 'Catalog of ~2,000 verbal roots classified into 10 Gaṇas', 'The Vocabulary Source'],
            ['गणपाठः (Gaṇapāṭha)', 'Lists of nominal stems that behave similarly under rules', 'Nominal Grouping'],
            ['उणादिपाठः (Uṇādipāṭha)', 'Special suffixes deriving irregular nouns directly from roots', 'Archaic & Etymological'],
            ['लिङ्गानुशासनम् (Liṅgānuśāsana)', 'Comprehensive rules for determining grammatical gender', 'Semantic Gender System'],
          ],
        },
      },
      {
        title: 'Anubandhas: Pāṇini’s Secret Code Letters (इत्-संज्ञा)',
        titleSan: 'अनुबन्धाः (इत्-संज्ञा-व्यवस्था)',
        paragraphs: [
          'When you view authentic Dhātupāṭha manuscripts, roots appear with strange extra consonants or nasal markers: "डु-पच्-ँष्" instead of simple "पच्" (pac), "टु-ओ-श्वि-ँ" instead of "श्वि" (śvi), or "डु-कृ-ञ्" instead of "कृ" (kṛ).',
          'These attached letters are called Anubandhas or It-markers (इत्-संज्ञा). They are computational flags that dissolve automatically during derivation (*तस्य लोपः १.३.९*) but leave behind instructions:',
        ],
        table: {
          headers: ['It-Marker (इत्-संज्ञा)', 'Pāṇinian Sūtra', 'Grammatical Instruction Encoded'],
          rows: [
            ['Initial ञि-, टु-, डु-', 'आदिर्ञिटुडवः (१.३.५)', 'Indicates nominal derivations take special Kṛt affixes like क्त (क्तप्रत्यय)'],
            ['Final Svarita or ञ्', 'स्वरितञितः कर्त्रभिप्राये... (१.३.७२)', 'Indicates the root is Ubhayapadī (can be both Parasmaipada and Ātmanepada)'],
            ['Final ष्', 'षः प्रत्ययस्य (१.३.६)', 'Indicates the noun formed takes feminine suffix ङीष् (-ī)'],
            ['Final ङ्', 'अनुदात्तङित आत्मनेपदम् (१.३.१२)', 'Indicates the root strictly takes Ātmanepada endings'],
          ],
        },
      },
    ],
  },
  {
    id: 'ten-ganas-breakdown',
    titleSan: 'दशगणाः — विकरण-व्यवस्था एवं लक्षणम्',
    titleEn: 'The 10 Gaṇa Classes: Conjugational Markers & Structural Templates',
    badge: 'दशगणाः',
    badgeColor: '#b45309',
    readTime: '9 min read',
    summary:
      'In Sanskrit grammar, the 2,000+ verbal roots (dhātus) are systematically organized into 10 distinct classes called Gaṇas. Each class acts like a specific workshop or structural template, dictating root-vowel strengthening (Guṇa) and conjugational infixes (Vikaraṇas).',
    suggestedAction: {
      type: 'generate',
      dhatuId: 'bhu',
      label: 'Explore Bhvādi Roots in Generator ➔',
    },
    sections: [
      {
        title: 'The Concept of Gaṇas: The 10 Grammatical Workshops',
        titleSan: 'गण-स्वरूपम् एवं स्मरण-कारिका',
        paragraphs: [
          'In Sanskrit grammar, the 2,000+ verbal roots (dhātus) are systematically organized into 10 distinct classes called Gaṇas (गणाः). Each class acts like a specific workshop or structural template. It determines exactly how a raw root modifies its internal vowels and what specific suffix it takes before receiving a tense/person ending.',
          'Tradition encodes this classification in a timeless mnemonic couplet revered across centuries of Pāṇinian scholarship:',
        ],
        sutras: [
          {
            sutra: 'भ्वादिरदादिर्जुहोत्यादिर्दैवादिः स्वादिरेव च ।\nतुदादिश्च रुधादिश्च तन्-क्र्यादी चुरादयः ॥',
            number: 'स्मरण-कारिका',
            meaning:
              'The 10 classes are: 1. Bhvādi, 2. Adādi, 3. Juhotyādi, 4. Divādi, 5. Svādi, 6. Tudādi, 7. Rudhādi, 8. Tanādi, 9. Kryādi, and 10. Curādi.',
          },
        ],
      },
      {
        title: 'The Definitive Guide to All 10 Classical Gaṇas',
        titleSan: 'दशगणानां कार्यशाला-विमर्शः (The 10 Workshops)',
        paragraphs: [
          'Here is the definitive guide to all 10 classical Gaṇas as cataloged in Maharṣi Pāṇini’s grammatical framework, complete with their structural blueprints, derivations, and authentic linguistic insights:',
        ],
        ganaCards: [
          {
            number: 1,
            nameSan: 'भ्वादिगणः (Bhvādi gaṇa)',
            nameEn: 'Class 1',
            titleBadge: 'The Paradigm Class',
            vikarana: 'शप् (-a-)',
            blueprint:
              'The root vowel gets strengthened (a process called Guṇa), and a stabilizing theme vowel -a- (शप्) is inserted before the personal ending.',
            exampleRoot: '√भू (bhū - to be)',
            exampleDerivation: 'भव- + ति ➔ भवति (bhavati)',
            exampleMeaning: 'He / She / It is, exists, or becomes',
            funFact:
              'This is by far the largest class, containing roughly half of all verbal roots in the entire language (~1,000+ roots!).',
          },
          {
            number: 2,
            nameSan: 'अदादिगणः (Adādi gaṇa)',
            nameEn: 'Class 2',
            titleBadge: 'The Direct Class',
            vikarana: 'लुक् (Zero / Athematic)',
            blueprint:
              'This is an athematic class, meaning it completely bypasses any theme vowels (शपः श्लुक्). The personal endings are glued directly onto the raw root.',
            exampleRoot: '√अद् (ad - to eat)',
            exampleDerivation: 'अद्- + ति ➔ अत्ति (atti)',
            exampleMeaning: 'He / She / It eats',
            funFact:
              'Bypasses connecting vowels. Contains ancient high-frequency verbs like अद् (eat), या (go), अस् (to be ➔ अस्ति), and विद् (know).',
          },
          {
            number: 3,
            nameSan: 'जुहोत्यादिगणः (Juhotyādi gaṇa)',
            nameEn: 'Class 3',
            titleBadge: 'The Reduplicating Class',
            vikarana: 'श्लु (Reduplication / द्वित्वम्)',
            blueprint:
              'To create its conjugational stem, the first syllable of the root is completely doubled or repeated (reduplication) following strict sound-matching rules (श्लौ ६.१.१०).',
            exampleRoot: '√हु (hu - to sacrifice)',
            exampleDerivation: 'जुहु- + ति ➔ जुहोति (juhoti)',
            exampleMeaning: 'He / She / It sacrifices or offers oblations',
            funFact:
              'Reduplication is a deep Proto-Indo-European relic: compare Sanskrit dadāti (दा ➔ ददाति) with ancient Greek dídōmi!',
          },
          {
            number: 4,
            nameSan: 'दिवादिगणः (Divādi gaṇa)',
            nameEn: 'Class 4',
            titleBadge: 'The "Ya" Class',
            vikarana: 'श्यन् (-ya-)',
            blueprint:
              'A distinct -ya- suffix (श्यन्) is welded between the verbal root and the final conjugation ending. The root vowel typically remains unstrengthened.',
            exampleRoot: '√नृत् (nṛt - to dance)',
            exampleDerivation: 'नृत्य- + ति ➔ नृत्यति (nṛtyati)',
            exampleMeaning: 'He / She / It dances',
            funFact:
              'Contains ~140 roots, many expressing psychological, mental, or intransitive states (e.g. कुप् ➔ कुप्यति, क्रुध् ➔ क्रुध्यति, मन् ➔ मन्यते).',
          },
          {
            number: 5,
            nameSan: 'स्वादिगणः (Svādi gaṇa)',
            nameEn: 'Class 5',
            titleBadge: 'The "Nu" Class',
            vikarana: 'श्नु (-nu- / -no-)',
            blueprint:
              'The verbal stem is generated by attaching a characteristic -nu- (weak) or -no- (strong with Guṇa) suffix directly to the root before the ending.',
            exampleRoot: '√आप् (āp - to obtain/reach)',
            exampleDerivation: 'आप्नो- + ति ➔ आप्नोति (āpnoti)',
            exampleMeaning: 'He / She / It obtains, reaches, or acquires',
            funFact:
              'The signature root सु (extract Soma nectar) gives this entire Gaṇa its ancient Vedic name (सु + आदि = स्वादि).',
          },
          {
            number: 6,
            nameSan: 'तुदादिगणः (Tudādi gaṇa)',
            nameEn: 'Class 6',
            titleBadge: 'The Unstrengthened "A" Class',
            vikarana: 'श (-a-, No Guṇa)',
            blueprint:
              'Like Class 1, a basic -a- vowel (श) is inserted. However, the root vowel remains completely unstrengthened (no Guṇa modification), and the accent shifts to the inserted vowel.',
            exampleRoot: '√विश् (viś - to enter)',
            exampleDerivation: 'विश- + ति ➔ विशति (viśati)',
            exampleMeaning: 'He / She / It enters',
            funFact:
              'The "non-strengthened" twin to Bhvādi: compare √bhū (becomes bhavati with Guṇa) with √tud (remains tudati, never *todati!).',
          },
          {
            number: 7,
            nameSan: 'रुधादिगणः (Rudhādi gaṇa)',
            nameEn: 'Class 7',
            titleBadge: 'The Infix Class',
            vikarana: 'श्नम् (Nasal Infix -na- / -n-)',
            blueprint:
              'The most eccentric class in Sanskrit. Instead of tacking a suffix to the end, it splits the root wide open to insert a nasal infix (-na- or -n-) directly inside the root consonants before the final consonant!',
            exampleRoot: '√भिद् (bhid - to split)',
            exampleDerivation: 'भि-न-द्- + ति ➔ भिनत्ति (bhinatti)',
            exampleMeaning: 'He / She / It splits, cleaves, or breaks apart',
            funFact:
              'Linguists consider this internal nasal infix one of the oldest Indo-European structural relics, identical to Latin vi-n-co (root vic-).',
          },
          {
            number: 8,
            nameSan: 'तनादिगणः (Tanādi gaṇa)',
            nameEn: 'Class 8',
            titleBadge: 'The "O" Class',
            vikarana: 'उ (-u- / -o-)',
            blueprint:
              'The verbal root undergoes stem formulation by adding an -o- (strengthened) or -u- (weak) directly to its tail end.',
            exampleRoot: '√कृ (kṛ - to do/make)',
            exampleDerivation: 'करो- + ति ➔ करोति (karoti)',
            exampleMeaning: 'He / She / It does, makes, or performs',
            funFact:
              'Contains very few roots (~10 roots), but includes कृ (to do), one of the most frequently used words in all of Sanskrit literature!',
          },
          {
            number: 9,
            nameSan: 'क्र्यादिगणः (Kryādi gaṇa)',
            nameEn: 'Class 9',
            titleBadge: 'The "Nā" Class',
            vikarana: 'श्ना (-nā- / -nī-)',
            blueprint:
              'This class anchors its conjugational stem using a strong -nā- (in singular active) or weaker -nī- (in dual/plural) joining suffix.',
            exampleRoot: '√क्री (krī - to buy)',
            exampleDerivation: 'क्रीणा- + ति ➔ क्रीणाति (krīṇāti)',
            exampleMeaning: 'He / She / It buys or purchases',
            funFact:
              'Under Pāṇini’s Sandhi rule अट्कुप्वाङ्नुम्व्यवायेऽपि, the -na- routinely cerebralizes into -ṇa- after roots with ṛ or r (krīṇāti, gṛhṇāti).',
          },
          {
            number: 10,
            nameSan: 'चुरादिगणः (Curādi gaṇa)',
            nameEn: 'Class 10',
            titleBadge: 'The Causative "Aya" Class',
            vikarana: 'णिच् + शप् (-aya-)',
            blueprint:
              'Roots entering this class are modified with an obligatory -aya- (णिच्) suffix. This class is structurally unique because it often converts basic actions into causative structures (making someone else do it).',
            exampleRoot: '√चुर् (cur - to steal)',
            exampleDerivation: 'चोरय- + ति ➔ चोरयति (corayati)',
            exampleMeaning: 'He / She / It steals',
            funFact:
              'Unlike other Gaṇas where णिच् is an optional causative modifier, in Curādi the णिच् affix is Svārthe (inherent to the root itself).',
          },
        ],
      },
      {
        title: 'Comprehensive Gaṇa Classification Table',
        titleSan: 'दशगणानां तुलनात्मक-सारणी',
        paragraphs: [
          'The following quick-reference matrix summarizes the distinctive Vikaraṇa, Sūtra authority, and classic paradigm across all 10 Gaṇas:',
        ],
        table: {
          headers: ['Gaṇa (गण)', 'Vikaraṇa (विकरण)', 'Pāṇinian Sūtra', 'Example Root', 'Present Form (लट्)'],
          rows: [
            ['१. भ्वादिगणः (Bhvādi)', 'शप् (a)', 'कर्तरि शप् (३.१.६८)', 'भू (to be)', 'भवति (bhavati)'],
            ['२. अदादिगणः (Adādi)', 'लुक् (Zero/None)', 'अदिप्रभृतिभ्यः शपः (२.४.७२)', 'अद् (to eat)', 'अत्ति (atti)'],
            ['३. जुहोत्यादिगणः (Juhotyādi)', 'श्लु (Reduplication)', 'जुहोत्यादिभ्यः श्लुः (२.४.७५)', 'हु (to sacrifice)', 'जुहोति (juhoti)'],
            ['४. दिवादिगणः (Divādi)', 'श्यन् (ya)', 'दिवादिभ्यः श्यन् (३.१.६९)', 'दिव् / नृत् (dance)', 'नृत्यति (nṛtyati)'],
            ['५. स्वादिगणः (Svādi)', 'श्नु (nu)', 'स्वादिभ्यः श्नुः (३.१.७३)', 'सु / आप् (obtain)', 'आप्नोति (āpnoti)'],
            ['६. तुदादिगणः (Tudādi)', 'श (a - no guṇa)', 'तुदादिभ्यः शः (३.१.७७)', 'तुद् (strike) / विश्', 'तुदति / विशति'],
            ['७. रुधादिगणः (Rudhādi)', 'श्नम् (na infix)', 'रुधादिभ्यः श्नम् (३.१.७८)', 'रुध् (block) / भुज्', 'रुणद्धि / भुनक्ति'],
            ['८. तनादिगणः (Tanādi)', 'उ (u)', 'तनादिकृञ्भ्य उः (३.१.७९)', 'तन् (stretch) / कृ', 'तनोति / करोति'],
            ['९. क्र्यादिगणः (Kryādi)', 'श्ना (nā)', 'क्र्यादिभ्यः श्ना (३.१.८१)', 'क्री (buy) / ज्ञा', 'क्रीणाति / जानाति'],
            ['१०. चुरादिगणः (Curādi)', 'णिच् + शप् (ay)', 'सत्यापपाश... णिच् (३.१.२५)', 'चुर् (steal) / कथ्', 'चोरयति / कथयति'],
          ],
        },
        keyTakeaway:
          'Notice that Gaṇa 1 (Bhvādi) undergoes vowel strengthening (Guṇa), whereas Gaṇa 6 (Tudādi) keeps the weak vowel: compare भू ➔ भवति with तुद् ➔ तुदति.',
      },
    ],
  },
  {
    id: 'verb-machine-deconstruction',
    titleSan: 'संस्कृत-क्रियायन्त्रस्य विनिर्माणम् — पदविश्लेषण-पद्धतिः',
    titleEn: 'Deconstructing the Sanskrit Verb Machine: 4-Part Modular Architecture & Pada-Viśleṣaṇam',
    badge: 'क्रिया-यन्त्रम्',
    badgeColor: '#0284c7',
    readTime: '7 min read',
    summary:
      'Pāṇini designed the Sanskrit verb like an algorithmic software engineer. Discover the 4-part modular architecture (Upasarga + Dhātu + Vikaraṇa + Pratyaya), watch the assembly line forge "समूपागच्छति", and master the 4-step reverse-engineering checklist (Pada-Viśleṣaṇam).',
    suggestedAction: {
      type: 'deconstruct',
      targetWord: 'समूपागच्छति',
      label: 'Deconstruct "समूपागच्छति" in Studio ➔',
    },
    sections: [
      {
        title: 'The 4-Part Modular Hardware Architecture (चतुरङ्ग-संरचना)',
        titleSan: 'तिङन्तपदस्य चत्वारि मूल-घटकानि',
        paragraphs: [
          'To the untrained eye, a complex Sanskrit verb looks like a long, intimidating wall of text. But Maharshi Pāṇini designed the language like a modern software engineer: every verb is a perfectly assembled machine built out of swappable, modular components stacked in a precise, mathematical sequence.',
          'By understanding how a verb is assembled, you can use a process called Pada-Viśleṣaṇam (पद-विश्लेषणम् — Word Deconstruction) to reverse-engineer any complex word back to its dictionary root. Every fully formed Sanskrit verb (Tiṅanta) consists of up to four structural blocks:',
        ],
        modularBlocks: [
          {
            tag: '[ UPASARGA ]',
            nameSan: 'उपसर्गः (Prefix)',
            nameEn: 'Directional Modifier',
            status: 'Optional',
            role: 'Direction (दिशा)',
            color: 'amber',
            description:
              'Optional. Modifies or steers the direction of the action. Pāṇini catalogs 22 classical Upasargas that can reverse, intensify, or specialize the root meaning.',
            examplePiece: 'सम् + उप + आ (sam + upa + ā)',
            exampleRole: 'Completely + near + towards (अभिसम्बन्धः)',
          },
          {
            tag: '[ DHĀTU ]',
            nameSan: 'धातुः (Verbal Root)',
            nameEn: 'Core Semantic Seed',
            status: 'Mandatory',
            role: 'Core DNA (मूल-बीजम्)',
            color: 'blue',
            description:
              'Mandatory. The unchangeable, raw semantic core of the action. Cataloged in Pāṇini’s Dhātupāṭha across 2,000+ roots with their silent diagnostic code-letters (इत्-संज्ञा).',
            examplePiece: '√गम् (gam)',
            exampleRole: 'Core Meaning: To go (गतौ)',
          },
          {
            tag: '[ VIKARAṆA ]',
            nameSan: 'विकरणम् (Class Suffix)',
            nameEn: 'Gaṇa Characteristic Spacer',
            status: 'Mandatory',
            role: 'Class Badge (गण-चिह्नम्)',
            color: 'purple',
            description:
              'Mandatory. The specific structural spacer that identifies which of the 10 Gaṇas the root belongs to. It governs internal vowel mutation and theme-vowel insertion.',
            examplePiece: 'शप् ➔ अ (a) / गच्छ',
            exampleRole: '1st Gaṇa (Bhvādi) spacer mutating gam ➔ gacch',
          },
          {
            tag: '[ PRATYAYA ]',
            nameSan: 'तिङ्-प्रत्ययः (Personal Ending)',
            nameEn: 'Inflectional Termination',
            status: 'Mandatory',
            role: 'Who & When (काल-पुरुष-वचनानि)',
            color: 'emerald',
            description:
              'Mandatory. The terminal code from Pāṇini’s 18 Tiṅ affixes that specifies the Person (प्रथम/मध्यम/उत्तम), Number (एक/द्वि/बहु), Tense/Mood (लट्, लङ्, etc.), and Voice.',
            examplePiece: 'तिप् ➔ ति (ti)',
            exampleRole: 'Present Tense (Laṭ), 3rd Person Singular',
          },
        ],
        keyTakeaway:
          'A Sanskrit verb is not an arbitrary sequence of syllables; it is a 4-part software object: [ Upasarga ] + [ Dhātu ] + [ Vikaraṇa ] + [ Pratyaya ].',
      },
      {
        title: 'The Assembly Line in Action: Forging "Samupāgacchati" (समूपागच्छति)',
        titleSan: 'पाणिनीय-निर्माण-प्रक्रिया',
        paragraphs: [
          'Let’s look at how the verb "Samupāgacchati" (समूपागच्छति) — which means "He approaches completely" or "He draws near" — is assembled on Pāṇini’s grammatical assembly line.',
          'Watch each module snap into place, from the raw root seed to the final euphonic Sandhi fusion:',
        ],
        assemblySteps: [
          {
            stepNumber: 1,
            badge: 'Step 1 · Core DNA',
            title: 'The Raw Semantic Seed (धातु-ग्रहणम्)',
            description:
              'We begin with the raw semantic root √gam (गम् — "to go") from Pāṇini\'s Dhātupāṭha.',
            formulaPieces: [
              { text: '√गम्', type: 'root' },
              { text: '(to go / गमनम्)', type: 'op' },
            ],
            highlightText: 'Raw root: √gam',
          },
          {
            stepNumber: 2,
            badge: 'Step 2 · Class Pipeline',
            title: 'The Class Suffix Insertion (विकरण-योजनम्)',
            description:
              '√gam belongs to the 1st Gaṇa (Bhvādi). By Sūtra "इषुगमियमां छः" (७.३.७७), the root mutates into the stem gaccha- and takes the theme vowel spacer -a- (शप् per ३.१.६८).',
            formulaPieces: [
              { text: '√गम्', type: 'root' },
              { text: '+', type: 'op' },
              { text: 'शप् (अ)', type: 'vikarana' },
              { text: '➔', type: 'arrow' },
              { text: 'गच्छ', type: 'result' },
            ],
            highlightText: 'Stem mutated: gaccha-',
          },
          {
            stepNumber: 3,
            badge: 'Step 3 · Who & When',
            title: 'The Personal Ending (प्रत्यय-संयोगः)',
            description:
              'We want Present Tense (Laṭ-lakāra), 3rd Person Singular (He/She/It). We slap on the suffix -ti (तिप् per ३.४.७८). Now we have our base verb: gacchati (He goes).',
            formulaPieces: [
              { text: 'गच्छ', type: 'root' },
              { text: '+', type: 'op' },
              { text: 'तिप् (ति)', type: 'suffix' },
              { text: '➔', type: 'arrow' },
              { text: 'गच्छति', type: 'result' },
            ],
            audioText: 'गच्छति',
            highlightText: 'Base verb: gacchati ("He goes")',
          },
          {
            stepNumber: 4,
            badge: 'Step 4 · Directional Steering',
            title: 'Stacking the Steering Prefixes (उपसर्ग-सन्निवेशः)',
            description:
              'To transform generic "going" into "completely approaching near", we stack three directional prefixes at the front: Sam (सम् — completely) + Upa (उप — near) + Ā (आ — towards).',
            formulaPieces: [
              { text: 'सम्', type: 'prefix' },
              { text: '+', type: 'op' },
              { text: 'उप', type: 'prefix' },
              { text: '+', type: 'op' },
              { text: 'आ', type: 'prefix' },
              { text: '+', type: 'op' },
              { text: 'गच्छति', type: 'result' },
            ],
            highlightText: 'Prefixed chain: Sam + Upa + Ā + gacchati',
          },
          {
            stepNumber: 5,
            badge: 'Step 5 · Euphonic Sandhi Fusion',
            title: 'The Final Polish (सन्धि-सङ्घटनम्)',
            description:
              'We run the whole chain through Sandhi blending rules: सम् + उप fuses into समुप्- (m merges with u ➔ mu); then समुप् + आ fuses by Dīrgha Sandhi (प + आ ➔ पा) into समूपा-. Combining with gacchati yields the final seamless word: Samupāgacchati (समूपागच्छति).',
            formulaPieces: [
              { text: 'सम् + उप + आ + गच्छति', type: 'prefix' },
              { text: '➔', type: 'arrow' },
              { text: 'समूपागच्छति', type: 'result' },
            ],
            audioText: 'समूपागच्छति',
            highlightText: 'Final word: Samupāgacchati ("He approaches completely")',
          },
        ],
        keyTakeaway:
          'From a single root √gam, prefixes steer meaning from "going" (गच्छति) to "coming" (आगच्छति) to "completely approaching" (समूपागच्छति).',
      },
      {
        title: 'Step-by-Step Deconstruction (Pada-Viśleṣaṇam / पद-विश्लेषणम्)',
        titleSan: 'विपरीत-विश्लेषण-प्रक्रिया (४ चरणाः)',
        paragraphs: [
          'When you encounter a massive verb in a classical Sanskrit text, you do not need to feel overwhelmed. A Deconstructor tool or a trained student applies Pada-Viśleṣaṇam (पद-विश्लेषणम्) to run Pāṇini’s assembly line backward.',
          'Let’s peel back the layers of "Samupāgacchati" using a 4-step reverse-engineering checklist from tail to head:',
        ],
        deconSteps: [
          {
            stepKey: 'Step A',
            stepIcon: '🔍',
            stepName: 'Peel Off the Tail (The Pratyaya)',
            stepSan: 'प्रत्यय-निष्कासनम्',
            actionText: 'Look at the very end of the word. We spot the termination -ti (-ति).',
            inspectedPiece: '-ति (-ti)',
            deductionTitle: 'Tense, Person & Number Deduction:',
            deductionText:
              'This instantly tells us the action is happening right now (Present Tense / Laṭ-lakāra / वर्तमाने लट्) and is being done by one person who is not you or me (3rd Person Singular / Prathama-puruṣa, Eka-vacana: He / She / It).',
          },
          {
            stepKey: 'Step B',
            stepIcon: '🔍',
            stepName: 'Identify the Stem Core (The Vikaraṇa)',
            stepSan: 'विकरण-निर्णयः',
            actionText: 'Look right before the -ti ending. We see the stem element gaccha (गच्छ).',
            inspectedPiece: 'गच्छ (gaccha-)',
            deductionTitle: 'Root & Gaṇa Identification:',
            deductionText:
              'A student trained in the 10 Gaṇas recognizes that gaccha is the altered present-stem form of the root √gam (गम्). Because of the lingering theme vowel -a-, we know this root went through the 1st Gaṇa (Bhvādi) pipeline.',
          },
          {
            stepKey: 'Step C',
            stepIcon: '🔍',
            stepName: 'Untangle the Head (The Upasargas)',
            stepSan: 'उपसर्ग-विच्छेदः',
            actionText: 'Now inspect what is left at the front: Samupā- (समूपा-).',
            inspectedPiece: 'समूपा- (Samupā-)',
            deductionTitle: 'Reverse Sandhi & Directional Nuances:',
            deductionText:
              'We use Sandhi rules in reverse to unblend the vowels: Samupā- untangles cleanly into Sam (सम्) + Upa (उप) + Ā (आ). These are three of the 22 classical Upasargas. Together, they shift the meaning from a simple "going" to "completely approaching near."',
          },
          {
            stepKey: 'Step D',
            stepIcon: '📋',
            stepName: 'The Final Blueprint Report',
            stepSan: 'पद-शारीरिक-मानचित्रम्',
            actionText: 'By deconstructing the word, the system generates a complete anatomical map of the verb:',
            inspectedPiece: 'समूपागच्छति (Samupāgacchati)',
            deductionTitle: 'Complete Morphological Synthesis:',
            deductionText:
              'Every component is mapped to its precise grammatical role in Pāṇini’s generative grammar, removing all ambiguity.',
          },
        ],
        table: {
          headers: ['Component Type (अङ्ग-प्रकारः)', 'Component Piece (घटक-खण्डः)', 'Grammatical Meaning (व्याकरणार्थः)'],
          rows: [
            ['Upasargas (उपसर्गाः)', 'सम् + उप + आ (sam + upa + ā)', 'Direction: Completely, near, towards (आभिमुख्ये)'],
            ['Dhātu (मूल-धातुः)', '√गम् (gam)', 'Core Meaning: To go (गतौ)'],
            ['Gaṇa (गणः)', '१ · भ्वादिगणः (1st Gaṇa)', 'Class marker inserting the -a- theme spacer (शप्)'],
            ['Lakāra (लकारः)', 'लट्-लकारः (Laṭ-lakāra)', 'Timeframe: Present Indicative Tense (वर्तमाने लट्)'],
            ['Puruṣa & Vacana (पुरुष-वचने)', 'प्रथमपुरुषः, एकवचनम्', 'Subject: He / She / It (3rd Person Singular)'],
            ['Synthesized Word (निष्पन्न-पदम्)', 'समूपागच्छति (samupāgacchati)', 'Complete Meaning: "He approaches completely" / "पास आता है"'],
          ],
        },
        keyTakeaway:
          'Pada-Viśleṣaṇam is the master key to Sanskrit: Peel the tail (Pratyaya) ➔ Identify the stem & class (Vikaraṇa) ➔ Untangle the prefixes (Upasargas) ➔ Retrieve the root (Dhātu).',
      },
      {
        title: 'Why Pāṇini’s Design is Unbeatable (संस्कृत-वाक्-सामर्थ्यम्)',
        titleSan: 'शब्द-सम्पुट-सिद्धान्तः',
        paragraphs: [
          'In modern analytical languages like English, if you want to say "he approaches completely", you are forced to write three separate words: "he" + "approaches" + "completely". Furthermore, in English, word order strictly dictates grammatical sense.',
          'In Sanskrit, because of this tight modular design, you can compress an entire sentence or phrase into a single, structurally unbreakable word capsule. The verb alone encapsulates the subject pronoun, the timeframe, the direction, the mood, and the root action.',
          'As long as you know how to run the deconstruction process, a single Sanskrit word tells you the whole story without needing any auxiliary crutches.',
        ],
        keyTakeaway:
          'Sanskrit verbs are self-contained information packets: each word capsule carries its own actor, timeframe, directional modifier, and semantic root.',
      },
    ],
  },
  {
    id: 'pada-vyavastha',
    titleSan: 'पद-व्यवस्था — परस्मैपदम्, आत्मनेपदम् एवं उभयपदम्',
    titleEn: 'Verbal Voice in Sanskrit: Parasmaipada, Ātmanepada & Ubhayapada',
    badge: 'पद-व्यवस्था',
    badgeColor: '#1d4ed8',
    readTime: '7 min read',
    summary:
      'Uncover the spiritual and philosophical logic behind Sanskrit verbal voice. Learn why some actions point outward (Parasmaipada) while others reflect upon the self (Ātmanepada), and how Ubhayapada roots offer subtle poetic nuance.',
    suggestedAction: {
      type: 'deconstruct',
      targetWord: 'कुरुते',
      label: 'Analyze "कुरुते" (Ātmanepada) ➔',
    },
    sections: [
      {
        title: 'The Semantic Depth of "Padas"',
        titleSan: 'पदार्थ-विचारः',
        paragraphs: [
          'In European grammars, active and passive voices describe the syntactic position of subject and object. Sanskrit, however, goes deeper: the distinction between Parasmaipada and Ātmanepada reflects the psychological and karmic direction of the action’s fruit (क्रियाफल).',
          '• परस्मैपदम् (Parasmaipada): "परस्मै पदम्" — a word whose fruit or outcome is directed towards another or an external entity. Examples: पठति (studies), गच्छति (goes).',
          '• आत्मनेपदम् (Ātmanepada): "आत्मने पदम्" — a word whose fruit or result returns directly to the agent (कर्तृ). Examples: लभते (attains for oneself), मोदते (rejoices internally), वर्तते (exists).',
        ],
        sutras: [
          {
            sutra: 'स्वरितञितः कर्त्रभिप्राये क्रियाफले (१.३.७२)',
            number: 'अष्टाध्यायी १.३.७२',
            meaning:
              'A root marked with a svarita accent or an anubandha ञ् takes Ātmanepada endings if the fruit of the action is intended for the agent.',
          },
        ],
      },
      {
        title: 'The Classic Vedic Example: यजति vs. यजते',
        titleSan: 'दृष्टान्तः — यज्-धातोः उभयरूपत्वम्',
        paragraphs: [
          'Consider the root यज् (yaj - to sacrifice / worship). It is an Ubhayapada root. In classical Vedic usage:',
          '1. ऋत्विक् यजति (Parasmaipada): The officiating priest performs the sacrifice because the spiritual benefit belongs to the patron who hired him.',
          '2. राजा / यजमानः यजते (Ātmanepada): The king or patron performs the sacrifice because the spiritual fruit (the merit and heavenly realm) accrues to himself!',
          'Similarly with root पच् (pac - to cook):',
          '• माता पचति (Mother cooks for the family).',
          '• सः स्वयमेव पचते (He cooks food solely for his own consumption).',
        ],
        table: {
          headers: ['Voice (पद)', '1st Person (उत्तम)', '2nd Person (मध्यम)', '3rd Person (प्रथम)'],
          rows: [
            ['Parasmaipada (पठ्)', 'पठामि, पठावः, पठामः', 'पठसि, पठथः, पठथ', 'पठति, पठतः, पठन्ति'],
            ['Ātmanepada (लभ्)', 'लभे, लभावहे, लभामहे', 'लभसे, लभेथे, लभध्वे', 'लभते, लभेते, लभन्ते'],
          ],
        },
      },
    ],
  },
  {
    id: 'pancha-lakaras',
    titleSan: 'पञ्चलकाराः — शालेय-व्याकरणे मुख्यलकाराणां विमर्शः',
    titleEn: 'The 5 Core School Lakāras: Semantic Functions & Usage Guide',
    badge: 'लकार-विमर्शः',
    badgeColor: '#7c3aed',
    readTime: '9 min read',
    summary:
      'A comprehensive guide to the 5 Lakāras required for CBSE, NCERT, and competitive Sanskrit exams: Present (लट्), Future (लृट्), Past (लङ्), Imperative (लोट्), and Potential (विधिलिङ्).',
    suggestedAction: {
      type: 'generate',
      dhatuId: 'gam',
      label: 'Generate All 5 Lakāras for "गम्" ➔',
    },
    sections: [
      {
        title: 'Why are Tenses Called "Lakāras"? (लकारत्वम्)',
        titleSan: 'लकाराणां नामकरणम्',
        paragraphs: [
          'In Sanskrit grammar, tense and mood are unified under 10 tokens known as the Daśa Lakāras (दश लकाराः). They are named "Lakāras" because every single one begins with the auspicious letter "ल" (la).',
          'Six lakāras have an indicative "ट्" marker (लट्, लिट्, लुट्, लृट्, लेट्, लोट् — called टिन्-लकाराः), and four have an augment-governing "ङ्" marker (लङ्, लिङ्, लुङ्, लृङ् — called ङिन्-लकाराः).',
          'For school curricula (CBSE Classes 6 to 10), 5 core lakāras form the entire foundation.',
        ],
      },
      {
        title: 'The 5 Essential Lakāras Explained',
        titleSan: 'पञ्चलकाराणां लक्षणम् एवं प्रयोगाः',
        paragraphs: [
          'Below is the functional breakdown, temporal nuance, and exam markers for each of the 5 school lakāras:',
        ],
        table: {
          headers: ['Lakāra (लकार)', 'Tense / Mood', 'Identifying Marker', 'Pāṇinian Sūtra', 'Example Sentence'],
          rows: [
            ['लट् (Laṭ)', 'Present (वर्तमान)', 'Endings -ति, -तः, -अन्ति', 'वर्तमाने लट् (३.२.१२३)', 'बालकः पुस्तकं पठति । (The boy reads.)'],
            ['लृट् (Lṛṭ)', 'Future (भविष्यत्)', 'Infix -ष्य- / -स्य-', 'लृट् शेषे च (३.३.१३)', 'वयम् श्वः गमिष्यामः । (We shall go tomorrow.)'],
            ['लङ् (Laṅ)', 'Past Imperfect (भूतकाल)', 'Prefix augment अ- (अपठत्)', 'अनद्यतने लङ् (३.२.१११)', 'रामः अयोध्यायाम् अवसत् । (Rama lived in Ayodhya.)'],
            ['लोट् (Loṭ)', 'Imperative / Order (आज्ञा)', 'Endings -तु, -ताम्, -न्तु', 'लोट् च (३.३.१६२)', 'सत्यं वद, धर्मं चर । (Speak truth, do duty.)'],
            ['विधिलिङ् (Vidhiliṅ)', 'Potential / Duty (चाहिए)', 'Vowel -ए- in endings (-एत्)', 'विधि-निमन्त्रण... (३.३.१६१)', 'छात्रः प्रतिदिनं पठेत् । (A student should study.)'],
          ],
        },
        keyTakeaway:
          'Exam Rule of Thumb: If you see "अ-" at the start, it is past tense (लङ्). If you see "ष्य/स्य" in the middle, it is future tense (लृट्). If you see "-एत्" at the end, it is should/ought (विधिलिङ्)!',
      },
    ],
  },
  {
    id: 'krt-pratyayas-guide',
    titleSan: 'कृदन्त-रहस्यम् — क्त्वा, ल्यप्, तुमुन्, क्त एवं शतृ-प्रत्ययाः',
    titleEn: 'The Architecture of Non-Finite Verb Participles (Kṛt Pratyayas)',
    badge: 'कृदन्त-प्रक्रिया',
    badgeColor: '#059669',
    readTime: '8 min read',
    summary:
      'Learn how Sanskrit transforms verbs into nouns, adjectives, and indeclinable gerunds using Kṛt suffixes. Master the strict rule governing when to use क्त्वा vs. ल्यप् and how to construct sentences.',
    suggestedAction: {
      type: 'deconstruct',
      targetWord: 'आगत्य',
      label: 'Deconstruct "आगत्य" in Studio ➔',
    },
    sections: [
      {
        title: 'What are Kṛt Pratyayas? (कृत्-प्रत्यय-स्वरूपम्)',
        titleSan: 'कृदन्त-परिचयः',
        paragraphs: [
          'In Sanskrit, when an affix attaches to a finite conjugated verb to indicate person and number, it is called Tiṅ (तिङ्). However, when an affix attaches directly to a verbal root to create a gerund, infinitive, adjective, or noun, it is called a Kṛt suffix (कृत्-प्रत्यय).',
          'Words formed with Kṛt suffixes are known as Kṛdantas (कृदन्ताः). They bridge the gap between verbs and nouns, allowing rich, expressive sentence structures without compounding finite verbs.',
        ],
      },
      {
        title: 'The Golden Rule of Prior Action: क्त्वा vs. ल्यप्',
        titleSan: 'क्त्वा-ल्यपोः विशेष-नियमः',
        paragraphs: [
          'Both क्त्वा (ktvā) and ल्यप् (lyap) mean "having done" (करके / after doing). They denote an action completed by the same subject prior to another action.',
          'Pāṇini formulated a strict algorithmic rule for selecting between them:',
        ],
        sutras: [
          {
            sutra: 'समानकर्तृकयोः पूर्वकाले (३.४.२१)',
            number: 'अष्टाध्यायी ३.४.२१',
            meaning:
              'When two actions are performed by the same agent, the suffix क्त्वा attaches to the root denoting the earlier action.',
          },
          {
            sutra: 'समासेऽनञ्पूर्वे क्त्वो ल्यप् (७.१.३७)',
            number: 'अष्टाध्यायी ७.१.३७',
            meaning:
              'When the verbal root is compounded with an Upasarga (prefix) other than negative "नञ्", the suffix क्त्वा is obligatorily replaced by ल्यप् (-ya).',
          },
        ],
        table: {
          headers: ['Root Condition', 'Suffix Used', 'Ending Sound', 'Example Derivation', 'Sample Sentence'],
          rows: [
            ['Simple Root (No Prefix)', 'क्त्वा (ktvā)', '-त्वा (-tvā)', 'गम् + क्त्वा ➔ गत्वा', 'छात्रः गृहं गत्वा पठति । (Having gone home, the student studies.)'],
            ['Root with Prefix (उपसर्ग)', 'ल्यप् (lyap)', '-य (-ya)', 'आ + गम् + ल्यप् ➔ आगत्य', 'गुरुः आगत्य पाठयति । (Having arrived, the teacher teaches.)'],
            ['Infinitive of Purpose', 'तुमुन् (tumun)', '-तुम् (-tum)', 'पठ् + तुमुन् ➔ पठितुम्', 'सः ज्ञानं लब्धुं पठति । (He studies in order to gain knowledge.)'],
            ['Past Passive Participle', 'क्त (kta)', '-तः, -ता, -तम्', 'कृ + क्त ➔ कृतम्', 'मया कार्यं कृतम् । (The work was done by me.)'],
            ['Present Continuous', 'शतृ (śatṛ)', '-न्, -न्ती, -त्', 'पठ् + शतृ ➔ पठन्', 'पठन् बालकः हसति । (The studying boy laughs.)'],
          ],
        },
      },
    ],
  },
  {
    id: 'guna-vriddhi-sandhi',
    titleSan: 'ध्वनि-परिवर्तनम् — गुण-वृद्धि-संधि-विचाराः',
    titleEn: 'Sound Transformations: Guṇa, Vṛddhi & Morphological Derivation',
    badge: 'ध्वनि-विज्ञानम्',
    badgeColor: '#dc2626',
    readTime: '7 min read',
    summary:
      'Step inside the computational mechanics of Pāṇinian phonology. Understand the exact algorithmic steps behind why "भू + अति" turns into "भवति" and "नी + अति" turns into "नयति".',
    suggestedAction: {
      type: 'deconstruct',
      targetWord: 'पठितुम्',
      label: 'Analyze "पठितुम्" with Guṇa ➔',
    },
    sections: [
      {
        title: 'The Sound Hierarchy: Normal, Guṇa, and Vṛddhi',
        titleSan: 'स्वराणां त्रिविधा अवस्था',
        paragraphs: [
          'Sanskrit verbal roots undergo predictable acoustic strengthening depending on whether the following suffix is strong (सार्वधातुक) or weak. This strengthening follows a strict mathematical ternary scale:',
        ],
        sutras: [
          {
            sutra: 'अदेङ् गुणः (१.१.२)',
            number: 'अष्टाध्यायी १.१.२',
            meaning:
              'The vowels short अ (a), ए (e), and ओ (o) are formally designated as Guṇa (गुण).',
          },
          {
            sutra: 'वृद्धिरादैच् (१.१.१)',
            number: 'अष्टाध्यायी १.१.१',
            meaning:
              'The vowels long आ (ā), ऐ (ai), and औ (au) are formally designated as Vṛddhi (वृद्धि).',
          },
        ],
        table: {
          headers: ['Base Vowel (मूल स्वर)', 'Guṇa Level (गुण)', 'Vṛddhi Level (वृद्धि)', 'Phonetic Articulation'],
          rows: [
            ['इ / ई (i / ī)', 'ए (e)', 'ऐ (ai)', 'Palatal (कण्ठ-तालु)'],
            ['उ / ऊ (u / ū)', 'ओ (o)', 'औ (au)', 'Labial (कण्ठ-ओष्ठ)'],
            ['ऋ / ॠ (ṛ / ṝ)', 'अर् (ar)', 'आर् (ār)', 'Retroflex (कण्ठ-मूर्धा)'],
            ['ऌ (ḷ)', 'अल् (al)', 'आल् (āl)', 'Dental (कण्ठ-दन्त्य)'],
          ],
        },
      },
      {
        title: 'Step-by-Step Derivation of "भवति" (bhavati)',
        titleSan: 'भवति-रूपस्य सोपान-क्रमः',
        paragraphs: [
          'Watch how Pāṇini’s algorithms transform the abstract root "भू" into the finished word "भवति":',
          '1. Root: भू (bhū, Gaṇa 1, Parasmaipada).',
          '2. Desired Tense: वर्तमाने लट् (Present Tense) ➔ भू + लट्.',
          '3. 3rd Person Singular ending: तिप् (tip) ➔ भू + ति.',
          '4. Class Vikaraṇa: In Gaṇa 1, the rule कर्तरि शप् (३.१.६८) inserts suffix "शप्" (which leaves "अ") ➔ भू + अ + ति.',
          '5. Guṇa Vowel Strengthening: Rule सार्वधातुकार्धधातुकयोः (७.३.८४) applies because "शप्" is a Sārvadhātuka affix. The root vowel "ऊ" turns into its Guṇa equivalent "ओ" ➔ भो + अ + ति.',
          '6. Internal Vowel Sandhi: Rule एचोऽयवायावः (६.१.७८) dictates that "ओ" before a vowel turns into "अव्" (av) ➔ भ् + अव् + अ + ति.',
          '7. Synthesis: Merging letters gives the glorious final form: भवति (bhavati — "He/She/It becomes")!',
        ],
        keyTakeaway:
          'Every Sanskrit verb is generated through this exact algebraic pipeline. Once you know the Sūtra sequence, Sanskrit grammar behaves like predictable code.',
      },
    ],
  },
];
