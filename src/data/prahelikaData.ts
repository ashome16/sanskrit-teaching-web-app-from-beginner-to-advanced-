/**
 * Classical Sanskrit Prahelikā (Riddles) Data
 * Masterpieces of Sanskrit wit, wordplay, internal answers (अन्तरालापिका),
 * and paradoxes (विरोधाभासः).
 */

export interface PrahelikaQuestion {
  qId: string;
  num: number;
  questionSa: string;
  questionEn: string;
  answerSa: string;
  answerEn: string;
  verseRefWord: string;
  explanation: string;
}

export interface PrahelikaClue {
  icon: string;
  textSa: string;
  textEn: string;
  explanation: string;
}

export interface PrahelikaOption {
  id: string;
  sa: string;
  en: string;
  isCorrect: boolean;
}

export interface PrahelikaItem {
  id: string;
  num: number;
  titleEn: string;
  titleSa: string;
  genre: 'अन्तरालापिका' | 'बहिरालापिका' | 'विरोधाभासः' | 'पद-गूढम्';
  genreDesc: string;
  verseSa: string;
  verseLines: string[];
  iast: string;
  iastLines: string[];
  englishTranslation: string;
  questions?: PrahelikaQuestion[];
  answerSa: string;
  answerEn: string;
  options: PrahelikaOption[];
  clues: PrahelikaClue[];
  literarySecret: string;
  audioPronunciationText: string;
  emoji: string;
  funFact: string;
  illustrationUrl?: string;
  illustrationCaption?: string;
}

export const PRAHELIKAS: PrahelikaItem[] = [
  // 1. अन्तरालापिका: कस्तूरी जायते कस्मात्...
  {
    id: 'prahelika-1-antaralapika',
    num: 1,
    titleEn: 'The Multi-Question Verse',
    titleSa: 'अन्तरालापिका (मृगात् सिंहः पलायते)',
    genre: 'अन्तरालापिका',
    genreDesc:
      'Antarālāpikā (Internal Answer Verse) — A renowned classical Sanskrit riddle genre where three questions asked in the first three lines find their exact sequential answers hidden in the final line.',
    verseSa:
      'कस्तूरी जायते कस्मात् को हन्ति करिणां कुलम् ।\nकिं कुर्यात् कातरो युद्धे मृगात् सिंहः पलायते ॥',
    verseLines: [
      'कस्तूरी जायते कस्मात्',
      'को हन्ति करिणां कुलम् ।',
      'किं कुर्यात् कातरो युद्धे',
      'मृगात् सिंहः पलायते ॥',
    ],
    iast:
      'Kastūrī jāyate kasmāt ko hanti kariṇāṁ kulam |\nKiṁ kuryāt kātaro yuddhe mṛgāt siṁhaḥ palāyate ||',
    iastLines: [
      'Kastūrī jāyate kasmāt',
      'ko hanti kariṇāṁ kulam |',
      'Kiṁ kuryāt kātaro yuddhe',
      'mṛgāt siṁhaḥ palāyate ||',
    ],
    englishTranslation:
      '1. From where is musk (Kasturi) produced?\n2. Who kills a herd of elephants?\n3. What does a coward do in a battle?\n(Last line literal: "From a deer, a lion flees!").',
    questions: [
      {
        qId: 'q1',
        num: 1,
        questionSa: 'कस्तूरी कस्मात् जायते?',
        questionEn: 'From where is musk (Kasturi) produced?',
        answerSa: 'मृगात्',
        answerEn: 'From a deer',
        verseRefWord: 'मृगात्',
        explanation:
          'Kasturi (fragrant deer musk) is naturally secreted by the musk deer (कस्तूरीमृगः).',
      },
      {
        qId: 'q2',
        num: 2,
        questionSa: 'करिणां कुलं को हन्ति?',
        questionEn: 'Who kills a herd of elephants?',
        answerSa: 'सिंहः',
        answerEn: 'A lion',
        verseRefWord: 'सिंहः',
        explanation:
          'The lion (सिंहः), king of beasts, is poetically celebrated in Sanskrit as the conqueror of elephants (करिहन्ता).',
      },
      {
        qId: 'q3',
        num: 3,
        questionSa: 'कातरो युद्धे किं कुर्यात्?',
        questionEn: 'What does a coward do in a battle?',
        answerSa: 'पलायते',
        answerEn: 'Flees / Runs away',
        verseRefWord: 'पलायते',
        explanation:
          'A fearful coward (कातरः) abandons the battlefield and runs away (पलायते).',
      },
    ],
    answerSa: 'मृगात् · सिंहः · पलायते (अन्तिमे पादे क्रमेण त्रयः उत्तराः)',
    answerEn: '1. From a deer · 2. A lion · 3. Flees (In order from the last line)',
    options: [
      { id: 'opt1', sa: 'मृगात्, सिंहः, पलायते', en: 'From a deer, a lion, flees', isCorrect: true },
      { id: 'opt2', sa: 'वनात्, गजः, जयति', en: 'From forest, elephant, wins', isCorrect: false },
      { id: 'opt3', sa: 'पर्वतात्, व्याघ्रः, गर्जति', en: 'From mountain, tiger, roars', isCorrect: false },
      { id: 'opt4', sa: 'नद्याः, सर्पः, संसरति', en: 'From river, serpent, slithers', isCorrect: false },
    ],
    clues: [
      {
        icon: '🦌',
        textSa: 'कस्तूरी जायते कस्मात् ➔ मृगात्',
        textEn: 'Musk comes from ➔ Deer',
        explanation: 'The musk gland is found exclusively in the deer species.',
      },
      {
        icon: '🦁',
        textSa: 'को हन्ति करिणां कुलम् ➔ सिंहः',
        textEn: 'Destroyer of elephant herds ➔ Lion',
        explanation: 'In Sanskrit literature, the lion is known as करि-कुंभ-विदारकः.',
      },
      {
        icon: '🏃',
        textSa: 'किं कुर्यात् कातरो युद्धे ➔ पलायते',
        textEn: 'What does a coward do ➔ Flees',
        explanation: 'Cowards lack courage and escape the battle.',
      },
    ],
    literarySecret:
      'If you read the fourth line as a single clause, it says: "मृगात् सिंहः पलायते" ("From a deer, a lion flees!"), which sounds absurd and impossible (विरोधाभासः). The poetic marvel is that it is not one clause; it is the 3 answers ordered with mathematical precision!',
    audioPronunciationText:
      'कस्तूरी जायते कस्मात् को हन्ति करिणां कुलम् । किं कुर्यात् कातरो युद्धे मृगात् सिंहः पलायते ॥',
    emoji: '🦌',
    funFact:
      'This verse is celebrated across India from classical Gurukuls to modern university debate halls as the crowning jewel of the Antarālāpikā genre!',
    illustrationUrl: '/images/prahelika/prahelika-1-antaralapika.jpg',
    illustrationCaption:
      'Pahari-Kangra Folklore Miniature: Musk Deer (मृगः), Lion scattering elephant herds (सिंहः), and coward in battle (पलायते).',
  },

  // 2. पद-गूढम्: अपदो दूरगामी च... (पत्रम्)
  {
    id: 'prahelika-2-patram',
    num: 2,
    titleEn: 'The Smart Messenger',
    titleSa: 'अपदो दूरगामी (पत्रम्)',
    genre: 'पद-गूढम्',
    genreDesc:
      'Pada-gūḍham (Concealed Object Riddle) — Uses witty paradoxes and double entendre (श्लेषः) to describe a familiar inanimate object as though it were a human traveler.',
    verseSa:
      'अपदो दूरगामी च साक्षरो न च पण्डितः ।\nअमुखः स्फुटवक्ता च यो जानाति स पण्डितः ॥',
    verseLines: [
      'अपदो दूरगामी च',
      'साक्षरो न च पण्डितः ।',
      'अमुखः स्फुटवक्ता च',
      'यो जानाति स पण्डितः ॥',
    ],
    iast:
      'Apado dūragāmī ca sākṣaro na ca paṇḍitaḥ |\nAmukhaḥ sphuṭavaktā ca yo jānāti sa paṇḍitaḥ ||',
    iastLines: [
      'Apado dūragāmī ca',
      'sākṣaro na ca paṇḍitaḥ |',
      'Amukhaḥ sphuṭavaktā ca',
      'yo jānāti sa paṇḍitaḥ ||',
    ],
    englishTranslation:
      'It has no feet, yet travels far away. It is full of letters/literate, but is not a scholar. It has no mouth, but speaks clearly. Whoever figures this out is truly wise!',
    answerSa: 'पत्रम् (लिखित-पत्रम् / सन्देशः)',
    answerEn: 'A Letter / Written Postal Mail (Patram)',
    options: [
      { id: 'opt1', sa: 'पत्रम्', en: 'A Letter / Mail', isCorrect: true },
      { id: 'opt2', sa: 'वायुः', en: 'The Wind', isCorrect: false },
      { id: 'opt3', sa: 'विमानम्', en: 'An Airplane', isCorrect: false },
      { id: 'opt4', sa: 'मनः', en: 'The Human Mind', isCorrect: false },
    ],
    clues: [
      {
        icon: '👣',
        textSa: 'अपदो दूरगामी च',
        textEn: 'Footless, yet travels across continents',
        explanation: 'A letter travels by hand, courier, and air across the world without a single step of its own.',
      },
      {
        icon: '✍️',
        textSa: 'साक्षरो न च पण्डितः',
        textEn: 'Full of letters, but not a scholar',
        explanation: 'Punning double meaning (श्लेषः): साक्षर means "literate" for a person, but "covered in written characters (अक्षराणि)" for a letter!',
      },
      {
        icon: '🗣️',
        textSa: 'अमुखः स्फुटवक्ता च',
        textEn: 'Mouthless, yet speaks crystal clear',
        explanation: 'It has no physical vocal cords, yet its written text speaks with absolute clarity to the reader.',
      },
    ],
    literarySecret:
      'The genius of this riddle hinges on the word "साक्षर" (sa-akṣara). For a human, it means "literate / educated"; but for parchment or paper, it literally means "containing written alphabet glyphs" (स-अक्षर).',
    audioPronunciationText:
      'अपदो दूरगामी च साक्षरो न च पण्डितः । अमुखः स्फुटवक्ता च यो जानाति स पण्डितः ॥',
    emoji: '✉️',
    funFact:
      'This riddle was taught to royal princes in ancient India to sharpen their awareness of metaphor and wordplay!',
    illustrationUrl: '/images/prahelika/prahelika-2-patram.jpg',
    illustrationCaption:
      'Rajasthani Folklore Painting: The Footless Messenger (पत्रम्) with royal courier dove above ancient temple spires and sacred rivers.',
  },

  // 3. विरोधाभासः: वृक्षाग्रवासी न च पक्षीराजः... (नारिकेलः)
  {
    id: 'prahelika-3-narikelah',
    num: 3,
    titleEn: 'The Three-Eyed Forest Dweller',
    titleSa: 'त्रिनेत्रधारी (नारिकेलः)',
    genre: 'विरोधाभासः',
    genreDesc:
      'Virodhābhāsa (Apparent Contradiction) — Playfully attributes divine traits of Lord Śiva, ascetic yogis, and Garuda to a humble tropical fruit.',
    verseSa:
      'वृक्षाग्रवासी न च पक्षीराजः त्रिनेत्रधारी न च शूलपाणिः ।\nत्वग्वस्त्रधारी न च सिद्धयोगी जलं च बिभ्रन्न घटो न मेघः ॥',
    verseLines: [
      'वृक्षाग्रवासी न च पक्षीराजः',
      'त्रिनेत्रधारी न च शूलपाणिः ।',
      'त्वग्वस्त्रधारी न च सिद्धयोगी',
      'जलं च बिभ्रन्न घटो न मेघः ॥',
    ],
    iast:
      'Vṛkṣāgravāsī na ca pakṣīrājaḥ trinetradhārī na ca śūlapāṇiḥ |\nTvagvastradhārī na ca siddhayogī jalaṁ ca bibhranna ghaṭo na meghaḥ ||',
    iastLines: [
      'Vṛkṣāgravāsī na ca pakṣīrājaḥ',
      'trinetradhārī na ca śūlapāṇiḥ |',
      'Tvagvastradhārī na ca siddhayogī',
      'jalaṁ ca bibhranna ghaṭo na meghaḥ ||',
    ],
    englishTranslation:
      'It lives at the top of a tree, but is not the king of birds (Garuda). It has three eyes, but is not Lord Shiva (wielder of the trident). It wears skin/bark clothes, but is not an ascetic yogi. It holds water inside, but is neither a pot nor a cloud.',
    answerSa: 'नारिकेलः (श्रीफलम्)',
    answerEn: 'A Coconut (Nārikelaḥ)',
    options: [
      { id: 'opt1', sa: 'नारिकेलः', en: 'A Coconut', isCorrect: true },
      { id: 'opt2', sa: 'तालफलम्', en: 'A Palmyra fruit', isCorrect: false },
      { id: 'opt3', sa: 'वानरः', en: 'A Monkey', isCorrect: false },
      { id: 'opt4', sa: 'घटः', en: 'A Clay Pot', isCorrect: false },
    ],
    clues: [
      {
        icon: '🌴',
        textSa: 'वृक्षाग्रवासी न च पक्षीराजः',
        textEn: 'Dwells at treetop, but not Garuda',
        explanation: 'Coconuts grow only at the highest crown of palm trees.',
      },
      {
        icon: '👁️',
        textSa: 'त्रिनेत्रधारी न च शूलपाणिः',
        textEn: 'Three eyes, but not Lord Shiva',
        explanation: 'The hard coconut shell features three distinct circular germination eyes (eyes of Shiva).',
      },
      {
        icon: '🥥',
        textSa: 'त्वग्वस्त्रधारी न च सिद्धयोगी',
        textEn: 'Coarse bark clothes, but not an ascetic',
        explanation: 'Wrapped in dense, fibrous coir husk resembling an ascetic ascetic’s bark robes.',
      },
      {
        icon: '💧',
        textSa: 'जलं च बिभ्रत् न घटो न मेघः',
        textEn: 'Holds pure water, but neither pot nor cloud',
        explanation: 'Contains refreshing, naturally filtered sweet coconut water inside its sealed shell.',
      },
    ],
    literarySecret:
      'By invoking Garuda (पक्षीराजः), Lord Śiva (शूलपाणिः), and a Siddhayogī (सिद्धयोगी), the poet elevates a daily kitchen fruit into a sacred cosmic mystery.',
    audioPronunciationText:
      'वृक्षाग्रवासी न च पक्षीराजः त्रिनेत्रधारी न च शूलपाणिः । त्वग्वस्त्रधारी न च सिद्धयोगी जलं च बिभ्रन्न घटो न मेघः ॥',
    emoji: '🥥',
    funFact:
      'Because of its three eyes, the coconut is revered in Indian tradition as a symbol of Lord Shiva and offered in temples as "Śrīphalam"!',
    illustrationUrl: '/images/prahelika/prahelika-3-narikelah.jpg',
    illustrationCaption:
      'Kerala Mural Folk Art: The Three-Eyed Coconut (नारिकेलः / श्रीफलम्) with fresh coconut water, palm crown, and Shiva’s trident motifs.',
  },

  // 4. पद-गूढम्: एकचक्षुर्न काकोऽयं... (सूची-सूत्रम्)
  {
    id: 'prahelika-4-suchi-sutram',
    num: 4,
    titleEn: 'The Blind Seamstress',
    titleSa: 'एकचक्षुः (सूची-सूत्रम्)',
    genre: 'पद-गूढम्',
    genreDesc:
      'Pada-gūḍham with Classical Folklore — Juxtaposes a tiny household sewing needle with grand celestial metaphors of the waxing moon, the tidal ocean, and the serpent.',
    verseSa:
      'एकचक्षुर्न काकोऽयं बिलमिच्छन्न पन्नगः ।\nक्षीयते वर्धते चैव न समुद्रो न चन्द्रमाः ॥',
    verseLines: [
      'एकचक्षुर्न काकोऽयं',
      'बिलमिच्छन्न पन्नगः ।',
      'क्षीयते वर्धते चैव',
      'न समुद्रो न चन्द्रमाः ॥',
    ],
    iast:
      'Ekacakṣurna kāko\'yaṁ bilamicchanna pannagaḥ |\nKṣīyate vardhate caiva na samudro na candramāḥ ||',
    iastLines: [
      'Ekacakṣurna kāko\'yaṁ',
      'bilamicchanna pannagaḥ |',
      'Kṣīyate vardhate caiva',
      'na samudro na candramāḥ ||',
    ],
    englishTranslation:
      'It has one eye, but is not a crow. It enters a hole, but is not a serpent. It wastes away and grows larger, yet it is neither the ocean nor the moon.',
    answerSa: 'सूची-सूत्रम् (सूची / सीवन-सूची)',
    answerEn: 'A Needle and Thread (Sūcī-Sūtram)',
    options: [
      { id: 'opt1', sa: 'सूची-सूत्रम्', en: 'Needle and Thread', isCorrect: true },
      { id: 'opt2', sa: 'अङ्गुलीयकम्', en: 'A Finger Ring', isCorrect: false },
      { id: 'opt3', sa: 'दीपवर्तिः', en: 'A Lamp Wick', isCorrect: false },
      { id: 'opt4', sa: 'कर्तरी', en: 'A Pair of Scissors', isCorrect: false },
    ],
    clues: [
      {
        icon: '🪡',
        textSa: 'एकचक्षुः न काकः',
        textEn: 'One eye, but not a crow',
        explanation: 'A needle has a single eyelet (नेत्रम्/छिद्रम्). In Indian folklore, the crow is known as एकाक्ष (one-eyed).',
      },
      {
        icon: '🐍',
        textSa: 'बिलम् इच्छन् न पन्नगः',
        textEn: 'Enters holes, but not a snake',
        explanation: 'The needle passes into and through perforations in fabric as you sew.',
      },
      {
        icon: '🧵',
        textSa: 'क्षीयते वर्धते चैव',
        textEn: 'Wastes away and grows larger',
        explanation: 'The thread becomes shorter and shorter as you sew (क्षीयते), while the sewn seam grows larger (वर्धते)!',
      },
    ],
    literarySecret:
      'The metaphor of the waxing/waning moon (क्षीयते वर्धते) and the ocean tide is playfully transferred to the thread shrinking and the stitched garment growing under the tailor’s hands.',
    audioPronunciationText:
      'एकचक्षुर्न काकोऽयं बिलमिच्छन्न पन्नगः । क्षीयते वर्धते चैव न समुद्रो न चन्द्रमाः ॥',
    emoji: '🪡',
    funFact:
      'In Vedic times, bronze and bone needles (सूची) were crafted with such microscopic precision in Harappa and Lothal that they amazed ancient traders!',
    illustrationUrl: '/images/prahelika/prahelika-4-suchisutram.jpg',
    illustrationCaption:
      'Pahari & Kalamkari Folk Painting: The Bronze Needle (सूची) & Crimson Thread (सूत्रम्) weaving silk tapestry with one-eyed crow & moon motifs.',
  },
];
