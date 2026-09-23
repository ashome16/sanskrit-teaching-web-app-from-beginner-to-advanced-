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
    titleEn: 'The 10 Gaṇa Classes: Conjugational Markers & Characteristics',
    badge: 'दशगणाः',
    badgeColor: '#b45309',
    readTime: '8 min read',
    summary:
      'Master the 10 conjugational classes of Sanskrit verbs. Understand why different roots require different conjugational infixes (Vikaraṇas) like शप्, श्यन्, and णिच्, complete with mnemonic shlokas and examples.',
    suggestedAction: {
      type: 'generate',
      dhatuId: 'bhu',
      label: 'Explore Bhvādi Roots in Generator ➔',
    },
    sections: [
      {
        title: 'The Great Gaṇa Mnemonic (स्मरण-कारिका)',
        titleSan: 'दशगणानां श्लोकः',
        paragraphs: [
          'All 2,000 roots in the Dhātupāṭha are divided into 10 distinct classes called Gaṇas (गणाः). Each Gaṇa is identified by its first root and inserts a specific connecting element called a Vikaraṇa-pratyaya (विकरण-प्रत्यय) between the root and the ending.',
          'Tradition encodes this in a timeless mnemonic couplet:',
        ],
        sutras: [
          {
            sutra: 'भ्वादिरदादिर्जुहोत्यादिर्दैवादिः स्वादिरेव च ।\nतुदादिश्च रुधादिश्च तन्-क्र्यादी चुरादयः ॥',
            number: 'स्मरण-कारिका',
            meaning:
              'The 10 classes are: Bhvādi (1), Adādi (2), Juhotyādi (3), Divādi (4), Svādi (5), Tudādi (6), Rudhādī (7), Tanādi (8), Kryādi (9), and Curādi (10).',
          },
        ],
      },
      {
        title: 'Comprehensive Gaṇa Classification Table',
        titleSan: 'दशगणानां तुलनात्मक-सारणी',
        paragraphs: [
          'The following reference table outlines the distinctive Vikaraṇa, Sūtra authority, and classic paradigm for each of the 10 Gaṇas:',
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
