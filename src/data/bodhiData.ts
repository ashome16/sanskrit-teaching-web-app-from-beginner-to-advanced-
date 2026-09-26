/**
 * Bodhi (बोधिः) — Gurukul Mascot & Learning Guide
 * Comprehensive knowledge base, contextual tips, Subhāṣitas,
 * spoken Sanskrit phrases, and student Q&A library.
 */

export interface Subhashita {
  id: string;
  verseDevanagari: string;
  verseIast: string;
  englishMeaning: string;
  bodhiReflection: string;
  source?: string;
  theme: string;
}

export interface SpokenPhrase {
  id: string;
  devanagari: string;
  iast: string;
  english: string;
  context: string;
  category: 'greeting' | 'polite' | 'classroom' | 'praise';
}

export interface BodhiContextTip {
  viewId: string;
  title: string;
  sanskritTitle: string;
  summary: string;
  bulletPoints: string[];
  bodhiAdvice: string;
  suggestedAction?: {
    label: string;
    targetView?: string;
  };
}

export interface BodhiQAItem {
  id: string;
  category: 'pronunciation' | 'grammar' | 'cbse' | 'vedic_math' | 'philosophy' | 'engineering';
  question: string;
  sanskritQuestion?: string;
  shortAnswer: string;
  detailedAnswer: string;
  audioDevanagari?: string;
  tip?: string;
  relatedView?: string;
}

export interface BodhiWordSuggestion {
  id: string;
  devanagari: string;
  iast: string;
  english: string;
  category: 'root' | 'tech' | 'grammar' | 'vocab';
  breakdown?: string;
  modernConcept?: string;
}

export const BODHI_PROFILE = {
  name: 'Bodhi',
  devanagariName: 'बोधिः',
  title: 'Gurukul Mascot & Learning Guide',
  sanskritTitle: 'गुरुकुल-सखा एवं ज्ञान-मार्गदर्शकः',
  tagline: 'Illuminating your path through Sanskrit, grammar, and Vedic mathematics with heart, breath, and joy.',
  persona:
    'A calm, unhurried Gurukul guru who speaks slowly and clearly for children — reciting each phrase and half-verse with a gentle pause so young learners can listen and repeat.',
  greetingText: 'नमस्ते! अहं बोधिः — भवतः संस्कृत-सखा। (Namaste! I am Bodhi — your Gurukul Sanskrit friend. Ask me anything!)',
  audioGreeting: 'नमस्ते! अहं बोधिः।',
};

export const BODHI_SUBHASHITAS: Subhashita[] = [
  {
    id: 'subh-1',
    verseDevanagari: 'विद्या ददाति विनयं विनयाद्याति पात्रताम् ।\nपात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ॥',
    verseIast: 'vidyā dadāti vinayaṁ vinayādyāti pātratām |\npātratvāddhanamāpnoti dhanāddharmaṁ tataḥ sukham ||',
    englishMeaning: 'Knowledge bestows humility; from humility comes worthiness; from worthiness one acquires prosperity; from prosperity comes righteousness, and thence lasting joy.',
    bodhiReflection: 'True learning never makes us arrogant. When you learn even a single new Sanskrit word today, let it make you gentler and more curious about the world around you!',
    source: 'Hitopadeśa (हितोपदेशः)',
    theme: 'Humility & Knowledge',
  },
  {
    id: 'subh-2',
    verseDevanagari: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः ।\nन हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः ॥',
    verseIast: 'udyamena hi sidhyanti kāryāṇi na manorathaiḥ |\nna hi suptasya siṁhasya praviśanti mukhe mṛgāḥ ||',
    englishMeaning: 'Tasks are accomplished only by diligent effort, never by mere daydreaming. Deer do not enter the mouth of a sleeping lion on their own.',
    bodhiReflection: 'Even the king of the jungle must take action! Reading just 10 minutes a day and speaking the syllables aloud with me will build your fluency faster than wishing for it.',
    source: 'Pañcatantra (पञ्चतन्त्रम्)',
    theme: 'Perseverance & Action',
  },
  {
    id: 'subh-3',
    verseDevanagari: 'अयं निजः परो वेति गणना लघुचेतसाम् ।\nउदारचरितानां तु वसुधैव कुटुम्बकम् ॥',
    verseIast: 'ayaṁ nijaḥ paro veti gaṇanā laghucetasām |\nudāracaritānāṁ tu vasudhaiva kuṭumbakam ||',
    englishMeaning: '"This is mine, that belongs to another" is the narrow reckoning of small minds. For the noble-hearted, the entire earth is one single family.',
    bodhiReflection: 'Sanskrit literature always reminds us that all human beings share the same heartbeat and the same breath. We learn ancient wisdom to bring everyone closer together.',
    source: 'Mahā-Upaniṣad (महोपनिषद्)',
    theme: 'Universal Harmony (वसुधैव कुटुम्बकम्)',
  },
  {
    id: 'subh-4',
    verseDevanagari: 'भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती ।\nतस्यां हि काव्यं मधुरं तस्मादपि सुभाषितम् ॥',
    verseIast: 'bhāṣāsu mukhyā madhurā divyā gīrvāṇabhāratī |\ntasyāṁ hi kāvyaṁ madhuraṁ tasmādapi subhāṣitam ||',
    englishMeaning: 'Among languages, the divine Sanskrit tongue is foremost, sweet, and luminous. Even sweeter within it is poetry, and sweetest of all are its wise sayings (subhāṣitas).',
    bodhiReflection: 'Notice how melodious Sanskrit sounds when spoken slowly! That sweetness comes from the systematic harmony between vowel lengths and consonant vibration points.',
    source: 'Subhāṣita-ratna-bhāṇḍāgāra',
    theme: 'Beauty of Sanskrit',
  },
  {
    id: 'subh-5',
    verseDevanagari: 'क्षणशः कणशश्चैव विद्यामर्थं च साधयेत् ।\nक्षणत्यागे कुतो विद्या कणत्यागे कुतो धनम् ॥',
    verseIast: 'kṣaṇaśaḥ kaṇaśaścaiva vidyāmarthaṁ ca sādhayet |\nkṣaṇatyāge kuto vidyā kaṇatyāge kuto dhanam ||',
    englishMeaning: 'One should acquire knowledge moment by moment, and wealth grain by grain. If you squander moments, where is knowledge? If you squander grains, where is wealth?',
    bodhiReflection: 'You do not need 3 hours at once. Even 5 mindful minutes tracing one Devanagari letter or practicing one Sandhi formula is a golden grain stored in your mind.',
    source: 'Cāṇakya Nīti (चाणक्य-नीतिः)',
    theme: 'Consistency & Micro-Habits',
  },
  {
    id: 'subh-6',
    verseDevanagari: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः ।',
    verseIast: 'satyameva jayate nānṛtaṁ satyena panthā vitato devayānaḥ |',
    englishMeaning: 'Truth alone triumphs, not untruth. By truth is the divine path laid out.',
    bodhiReflection: 'The sacred motto of India! Truth (Satya) in speech means speaking what is true, gentle, and beneficial for all living beings.',
    source: 'Muṇḍaka Upaniṣad (मुण्डकोपनिषद् 3.1.6)',
    theme: 'Truth & Integrity',
  },
  {
    id: 'subh-7',
    verseDevanagari: 'गुरुर्ब्रह्मा गुरुर्विष्णुर्गुरुर्देवो महेश्वरः ।\nगुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः ॥',
    verseIast: 'gururbrahmā gururviṣṇurgururdevo maheśvaraḥ |\nguruḥ sākṣāt paraṁ brahma tasmai śrīgurave namaḥ ||',
    englishMeaning: 'The Guru is Brahmā (creator of wisdom), the Guru is Viṣṇu (sustainer of learning), the Guru is Śiva (dispeller of ignorance). The Guru is verily the Supreme Reality itself — salutations to that revered Guru.',
    bodhiReflection: 'In our Gurukul, the Guru is not a faster search engine or generative model. The Guru is a living presence — the living breath and constraint that transforms mere information into living realization.',
    source: 'Guru Gītā (गुरुगीता)',
    theme: 'The Living Teacher (गुरु-महिमा)',
  },
];

export const BODHI_SPOKEN_PHRASES: SpokenPhrase[] = [
  {
    id: 'phr-1',
    devanagari: 'नमस्ते',
    iast: 'Namaste',
    english: 'Hello / Greetings (I bow to the divine in you)',
    context: 'Traditional universal greeting at any time of day',
    category: 'greeting',
  },
  {
    id: 'phr-2',
    devanagari: 'सुप्रभातम्',
    iast: 'Suprabhātam',
    english: 'Good Morning',
    context: 'Morning greeting for teachers, elders, and peers',
    category: 'greeting',
  },
  {
    id: 'phr-3',
    devanagari: 'शुभरात्रिः',
    iast: 'Śubharātriḥ',
    english: 'Good Night',
    context: 'Parting wish before going to sleep',
    category: 'greeting',
  },
  {
    id: 'phr-4',
    devanagari: 'धन्यवादः',
    iast: 'Dhanyavādaḥ',
    english: 'Thank you',
    context: 'Expressing gratitude for help or kindness',
    category: 'polite',
  },
  {
    id: 'phr-5',
    devanagari: 'स्वागतम्',
    iast: 'Swāgatam',
    english: 'Welcome',
    context: 'Welcoming someone to your home or classroom',
    category: 'polite',
  },
  {
    id: 'phr-6',
    devanagari: 'क्षम्यताम्',
    iast: 'Kṣamyatām',
    english: 'Excuse me / Please forgive me',
    context: 'Polite apology or asking for someone’s attention',
    category: 'polite',
  },
  {
    id: 'phr-7',
    devanagari: 'पुनर्मिलामः',
    iast: 'Punarmilāmaḥ',
    english: 'We will meet again (See you later)',
    context: 'Warm farewell instead of "goodbye"',
    category: 'greeting',
  },
  {
    id: 'phr-8',
    devanagari: 'अस्तु',
    iast: 'Astu',
    english: 'Alright / So be it / Okay',
    context: 'Expressing agreement or acknowledgment',
    category: 'classroom',
  },
  {
    id: 'phr-9',
    devanagari: 'साधु साधु!',
    iast: 'Sādhu sādhu!',
    english: 'Well done! Splendid!',
    context: 'Expressing praise and joy when someone succeeds',
    category: 'praise',
  },
  {
    id: 'phr-10',
    devanagari: 'उत्तमम्!',
    iast: 'Uttamam!',
    english: 'Excellent! Perfect!',
    context: 'Top praise for correct answers or graceful recitation',
    category: 'praise',
  },
  {
    id: 'phr-11',
    devanagari: 'कथमस्ति भवान्?',
    iast: 'Katham asti bhavān?',
    english: 'How are you? (to a male)',
    context: 'Friendly inquiry about someone’s well-being',
    category: 'classroom',
  },
  {
    id: 'phr-12',
    devanagari: 'कथमस्ति भवती?',
    iast: 'Katham asti bhavatī?',
    english: 'How are you? (to a female)',
    context: 'Friendly inquiry about someone’s well-being',
    category: 'classroom',
  },
];

export const BODHI_CONTEXT_TIPS: Record<string, BodhiContextTip> = {
  home: {
    viewId: 'home',
    title: 'Welcome to the Gurukul Campus!',
    sanskritTitle: 'गुरुकुल-प्राङ्गणम्',
    summary: 'Here you have all learning paths at your fingertips: NCERT Deepakam, interactive puzzles, grammar charts, and Vedic Math.',
    bulletPoints: [
      'New to Sanskrit? Start with the Alphabet & Syllables (वर्णमाला) to train your mouth and ear.',
      'Studying for CBSE Class 7 or 8? Jump straight into the NCERT Deepakam Living Reader.',
      'Love mental challenges? Play 6,000+ Jodo tile puzzles or learn 16 Vedic Mathematics speed sutras.',
    ],
    bodhiAdvice: 'Don’t try to rush everything in a single day. Pick one module, recite the words with warmth, and let your mind settle into the rhythm!',
    suggestedAction: {
      label: 'Open Alphabet Studio (वर्णमाला)',
      targetView: 'reader',
    },
  },
  reader: {
    viewId: 'reader',
    title: 'NCERT Deepakam Living Reader',
    sanskritTitle: 'दीपकम् - सजीव-वाचकः',
    summary: 'Explore full chapters word-by-word with instant audio pronunciation, Sandhi split, and case analysis.',
    bulletPoints: [
      'Tap any Sanskrit word in a verse to view its root (धातु), gender (लिङ्गम्), and grammatical case (विभक्ति).',
      'Listen to the sentence audio first, then mute the speaker and recite it aloud yourself.',
      'Notice the Anvaya (अन्वयः) — rearranging poetic shlokas into natural prose word order.',
    ],
    bodhiAdvice: 'Bodhi’s Golden Rule: Read aloud! The magical bind between breath, tongue, and mind happens only when your vocal cords vibrate.',
    suggestedAction: {
      label: 'Practice CBSE Worksheets',
      targetView: 'worksheets',
    },
  },
  board: {
    viewId: 'board',
    title: 'Jodo (जोडो) Tile Puzzle Studio',
    sanskritTitle: 'जोडो - पद-निर्माण-क्रीडा',
    summary: 'Combine Aksharas and syllables to build over 6,000 authentic Sanskrit words across daily themes.',
    bulletPoints: [
      'Look for the root verb or noun stem before picking your prefix (उपसर्ग) or suffix (प्रत्यय).',
      'Pay special attention to conjunct consonants (संयुक्ताक्षर) like क्ष, त्र, and ज्ञ.',
      'Listen to the completed word audio to lock its acoustic pattern into your memory.',
    ],
    bodhiAdvice: 'Puzzles are the most natural way to discover that Sanskrit words are not arbitrary labels — they are logical lego blocks built from roots!',
    suggestedAction: {
      label: 'Explore Verb Conjugations',
      targetView: 'dhatupatha',
    },
  },
  grammar: {
    viewId: 'grammar',
    title: 'Vyākaraṇa: Declensions & Conjugations',
    sanskritTitle: 'व्याकरणम् · शब्दरूपाणि धातुरूपाणि च',
    summary: 'Master noun cases (विभक्ति), verb families (गण), Sandhi formulas, and Indeclinables (अव्यय).',
    bulletPoints: [
      'Learn the 7 Vibhaktis as answers to questions: Who? Whom? By what? For whom? From where? Whose? In what?',
      'Focus on the 5 core school Lakāras: Present (लट्), Future (लृट्), Past (लङ्), Command (लोट्), Potential (विधिलिङ्).',
      'Observe recurring patterns: dual endings (-औ, -भ्याम्) often stay identical across multiple cases!',
    ],
    bodhiAdvice: 'Think of grammar not as a set of cold rules to memorize, but as Pāṇini’s precision instrument for tuning human consciousness.',
    suggestedAction: {
      label: 'Test Knowledge in Quiz',
      targetView: 'quiz',
    },
  },
  dhatupatha: {
    viewId: 'dhatupatha',
    title: 'Pāṇinian Dhātupāṭha Studio',
    sanskritTitle: 'माहेश्वर-धातुपाठ-मञ्चः',
    summary: 'The living engine of Sanskrit verbs: explore 10 Gaṇas, 5 CBSE Lakāras, and Kṛt participles.',
    bulletPoints: [
      'All Sanskrit verbs branch out from approximately 2,000 root dhātus cataloged by Maharṣi Pāṇini.',
      'Use the reverse deconstructor tool to break complex participle words like "गत्वा" back into "गम् + क्त्वा".',
      'Check whether a verb is Parasmaipada (परस्मैपद - action directed outwards) or Ātmanepada (आत्मनेपद - action directed inwards).',
    ],
    bodhiAdvice: 'Roots are living seeds! From the single root "कृ" (to do) grows karma, kartā, karaṇa, kārya, and saṁskāra.',
    suggestedAction: {
      label: 'Explore CBSE Exam Guide',
      targetView: 'cbse-guide',
    },
  },
  'vedic-maths': {
    viewId: 'vedic-maths',
    title: 'Vedic Mathematics Studio',
    sanskritTitle: 'वैदिक-गणित-शाला',
    summary: '16 ancient aphorisms (सूल्राणि) for lightning-fast mental arithmetic, algebra, and geometry.',
    bulletPoints: [
      'Master "Ekādhikena Pūrveṇa" (By one more than the previous) to square numbers ending in 5 in two seconds!',
      'Use "Nikhilam Navataścaramaṁ Daśataḥ" (All from 9 and the last from 10) for rapid base multiplication.',
      'Notice how Vedic Math works visually and symmetrically — giving your left and right brain a joyful workout.',
    ],
    bodhiAdvice: 'Math in ancient India was not separate from philosophy. Zero (शून्य) and Infinity (अनन्त) are two windows into the same mystery!',
    suggestedAction: {
      label: 'Read Philosophy Essay',
      targetView: 'philosophy',
    },
  },
  quiz: {
    viewId: 'quiz',
    title: 'Interactive Quiz Arena',
    sanskritTitle: 'प्रश्नोत्तरी-मञ्चः',
    summary: 'Test your understanding across 39+ interactive quizzes mapped to CBSE curriculum standards.',
    bulletPoints: [
      'Read both the Sanskrit prompt and the answer options carefully before clicking.',
      'Review explanation cards on every question to understand WHY an answer is grammatically correct.',
      'Replay quizzes to achieve 100% mastery and earn Gurukul merit badges!',
    ],
    bodhiAdvice: 'Mistakes are simply gentle guides showing where your attention wants to go next. Never fear a wrong answer — Bodhi celebrates every attempt!',
    suggestedAction: {
      label: 'Practice Worksheets',
      targetView: 'worksheets',
    },
  },
  worksheets: {
    viewId: 'worksheets',
    title: 'Worksheets & Printables',
    sanskritTitle: 'कार्यपत्रिकाः एवं अभ्यास-पुस्तिका',
    summary: 'Printable chapter exercises, translation worksheets, and sandhi drills for school practice.',
    bulletPoints: [
      'Writing with a real pencil on paper activates motor pathways that typing on a screen cannot replace.',
      'Use the answer keys after attempting all problems independently.',
      'Bring these worksheets to your CBSE school class for exam revision!',
    ],
    bodhiAdvice: 'Keep one quiet practice off-screen. Sit with a printed worksheet, take a slow breath, and write each stroke with mindful love.',
  },
  philosophy: {
    viewId: 'philosophy',
    title: 'Darśana: Why Learn Sanskrit in the Age of AI',
    sanskritTitle: 'दर्शनम् · ए.आई. युगे किमर्थं संस्कृतम्?',
    summary: 'Deep reflections on human speech, geological timescales, and why AI will make language chosen rather than obsolete.',
    bulletPoints: [
      'Communication has two faces: Transfer (information) and Bind (breath, body, presence).',
      'AI optimizes transfer at lightning speed; Sanskrit preserves the sacred bind of human attention.',
      'Explore the four levels of speech: Vaikharī (spoken), Madhyamā (mental), Paśyantī (vision), and Parā (source).',
    ],
    bodhiAdvice: 'The phone is new; your vocal cords and vagus nerve are millions of years old. Let the machine assist you, but never let it chant for you!',
  },
  'cbse-guide': {
    viewId: 'cbse-guide',
    title: 'CBSE Sanskrit Exam Blueprint',
    sanskritTitle: 'सी.बी.एस.ई. संस्कृत-परीक्षा-मार्गदर्शिका',
    summary: 'Master the 4 examination sections: Reading Comprehension, Creative Writing, Applied Grammar, and Literature.',
    bulletPoints: [
      'Memorize the "Kim-family" question words: कः (who), कम् (whom), केन (by whom), कस्मै (to whom), कस्मात् (from where), कस्य (whose), कस्मिन् (in what).',
      'In Unseen Passages (अपठित-अवबोधनम्), look for exact sentence parallels in the text for one-word answers.',
      'Keep your picture sentences (चित्र-वर्णनम्) simple: Subject + Object + Verb (लट्-लकार).',
    ],
    bodhiAdvice: 'Exam confidence comes from familiar patterns. Follow the section blueprints step-by-step, and Sanskrit will be your highest-scoring subject!',
  },
  faq: {
    viewId: 'faq',
    title: 'Frequently Asked Questions & Care Desk',
    sanskritTitle: 'प्रायिक-प्रश्नाः एवं सहायता-केन्द्रम्',
    summary: 'Got questions about subscriptions, UPI payments, NCERT coverage, or technical features? We are here to help.',
    bulletPoints: [
      'All Chapter 1 lessons and Varṇamālā sounds are completely free for everyone.',
      'UPI and Card payments unlock all 15 chapters, full worksheets, and advanced Vedic math calculators.',
      'Need academic help? Reach out directly to our Learner Care Desk at care@ednetlearn.in.',
    ],
    bodhiAdvice: 'No question is too small. If you ever feel stuck on any concept, just tap on me or send our teachers an email!',
  },
};

export const BODHI_QA_LIBRARY: BodhiQAItem[] = [
  {
    id: 'qa-retroflex',
    category: 'pronunciation',
    question: 'How do I pronounce retroflex (मूर्धन्य) sounds like ट, ठ, ड, ढ, ण, and ष?',
    sanskritQuestion: 'मूर्धन्य-वर्णानाम् उच्चारणं कथं भवति?',
    shortAnswer: 'Curl the tip of your tongue backwards and touch the hard roof (palate) of your mouth.',
    detailedAnswer: 'In Sanskrit phonetics (शिक्षा), the mouth has 5 distinct contact zones. For dental sounds (त, थ, द) the tongue touches the back of the teeth. But for retroflex sounds (मूर्धन्य: ट, ठ, ड, ढ, ण, ष), you curl the tongue tip up and tap the domed roof of your mouth. Notice the crisp, percussive sound it creates!',
    audioDevanagari: 'ट ठ ड ढ ण',
    tip: 'Try saying the English word "train" — notice where your tongue sits. Move it slightly further back, and you have found the Mūrdhanya position!',
    relatedView: 'reader',
  },
  {
    id: 'qa-visarga',
    category: 'pronunciation',
    question: 'What does the Visarga (ः) actually sound like?',
    sanskritQuestion: 'विसर्गस्य उच्चारणं किम्?',
    shortAnswer: 'It is a soft, breathy echo of the preceding vowel, like a gentle exhale.',
    detailedAnswer: 'The Visarga (ः) is not a hard "hah". It mirrors whichever vowel comes before it! After "a" (रामः) it sounds like "raamaha". After "i" (हरिः) it sounds like "harihi". After "u" (गुरुः) it sounds like "guruhu". It is an unvoiced, breathy aspiration that marks the end of a breath group.',
    audioDevanagari: 'रामः हरिः गुरुः',
    tip: 'Think of the visarga as the wind gently rustling through leaves — keep it soft and natural!',
    relatedView: 'reader',
  },
  {
    id: 'qa-vowel-length',
    category: 'pronunciation',
    question: 'What does the symbol on top of vowels mean (like ā in [vidyā]), and what is the difference between Hrasva (ह्रस्व) and Dīrgha (दीर्घ)?',
    sanskritQuestion: 'ह्रस्व-दीर्घ-स्वरयोः कः भेदः? आ-कारे उपरि दण्डस्य कः अर्थः?',
    shortAnswer: 'The horizontal bar on top (called a macron: ā) denotes a Dīrgha (दीर्घ / long) vowel held for 2 beats (mātrās), like "aa" in father versus "u" in cut.',
    detailedAnswer: 'In Sanskrit transliteration (IAST), the horizontal bar above a vowel (like ā, ī, ū) is called a macron. In Sanskrit phonetics (शिक्षा / Śikṣā), it denotes a Dīrgha (दीर्घ) or long vowel:\n• Plain "a" (अ) = Hrasva (ह्रस्व / short, 1 mātrā), pronounced like the "u" in "cut" or "sun".\n• "ā" with a macron (आ) = Dīrgha (दीर्घ / long, 2 mātrās), held for twice the duration, sounding like "aa" in "father".\nIn [vidyā] (विद्या), "vi" has a short "i" (1 mātrā), while "dyā" has a long "ā" (2 mātrās). In Sanskrit, vowel duration changes the entire meaning of a word! For example: "शिव" (Śiva - auspicious) with short "i", but "शीत" (cold) with long "ī"; or "सुतः" (son) vs "सुता" (daughter). In the ancient Prātiśākhyas, 1 mātrā is compared to the call of a blue jay (चाष), 2 mātrās to the crowing of a rooster, and 3 mātrās (pluta) to the cry of a peacock.',
    audioDevanagari: 'अ आ इ ई उ ऊ विद्या',
    tip: 'Tap your finger on your desk: short vowels (a, i, u) get one quick tap (1 mātrā); long vowels with a macron (ā, ī, ū) get two smooth taps (2 mātrās).',
    relatedView: 'reader',
  },
  {
    id: 'qa-vibhaktis',
    category: 'grammar',
    question: 'What are the 7 Vibhaktis (noun cases) and what role do they play?',
    sanskritQuestion: 'सप्त-विभक्तयः काः? तासां किं कार्यम्?',
    shortAnswer: 'Vibhaktis are suffix endings attached to nouns that tell you exactly what job the word is doing in the sentence.',
    detailedAnswer: 'Because Sanskrit uses Vibhakti endings, word order does not change the meaning! \n1. Prathamā (प्रथमा - Nominative): The Subject (रामः गच्छति - Rama goes)\n2. Dvitīyā (द्वितीया - Accusative): The Object (पुस्तकं पठति - Reads a book)\n3. Tṛtīyā (तृतीया - Instrumental): With/By (कलमेन लिखति - Writes with a pen)\n4. Caturthī (चतुर्थी - Dative): For/To (ज्ञानाय पठति - Studies for knowledge)\n5. Pañcamī (पञ्चमी - Ablative): From (वृक्षात् फलं पतति - Fruit falls from tree)\n6. Ṣaṣṭhī (षष्ठी - Genitive): Of/Belonging to (रामस्य भ्राता - Rama’s brother)\n7. Saptamī (सप्तमी - Locative): In/On/At (वने वसति - Dwells in the forest)\nPlus Sambodhana (सम्बोधनम्) for calling or addressing someone (हे राम!).',
    audioDevanagari: 'प्रथमा द्वितीया तृतीया चतुर्थी पञ्चमी षष्ठी सप्तमी सम्बोधनम्',
    tip: 'Whenever you see a noun in a verse, ask "Which case ending is attached to it?" This unlocks the entire sentence meaning!',
    relatedView: 'grammar',
  },
  {
    id: 'qa-lat-lakara',
    category: 'grammar',
    question: 'How do present-tense verb endings (लट्-लकार) work?',
    sanskritQuestion: 'लट्-लकारस्य प्रत्ययाः के?',
    shortAnswer: 'For singular, dual, and plural across 3 persons: ति, तः, अन्ति / सि, थः, थ / मि, वः, मः.',
    detailedAnswer: 'Present tense (लट्) for standard Parasmaipada verbs uses a clean 3×3 grid:\n• Prathama Puruṣa (Third Person): पठति (he/she reads), पठतः (they two read), पठन्ति (they all read)\n• Madhyama Puruṣa (Second Person): पठसि (you read), पठथः (you two read), पठथ (you all read)\n• Uttama Puruṣa (First Person): पठामि (I read), पठावः (we two read), पठामः (we all read)\nNotice that Sanskrit first person is called "Uttama" (highest/inner) and third person is called "Prathama" (first to be observed)!',
    audioDevanagari: 'पठति पठतः पठन्ति पठसि पठथः पठथ पठामि पठावः पठामः',
    tip: 'Memorize the rhythm like a song: "ti-taḥ-anti, si-thaḥ-tha, mi-vaḥ-maḥ"!',
    relatedView: 'grammar',
  },
  {
    id: 'qa-sandhi',
    category: 'grammar',
    question: 'Why does Sandhi (संधिः) happen in Sanskrit?',
    sanskritQuestion: 'संस्कृत-भाषायां संधिः किमर्थं भवति?',
    shortAnswer: 'Sandhi happens because human vocal organs prefer smooth, effortless acoustic flow when two sounds meet.',
    detailedAnswer: 'Sandhi is not an arbitrary rule invented to torture students! It is the natural law of phonetic economy. When the final sound of one word meets the beginning sound of the next word, your tongue naturally merges them so you don’t have to pause awkwardly. For example: विद्या + आलयः becomes विद्यालयः (Dīrgha Sandhi). इति + आदि becomes इत्यादि (Yaṇ Sandhi).',
    audioDevanagari: 'विद्या आलयः विद्यालयः',
    tip: 'When reading shlokas, Sandhi splitting (पदच्छेद) is like undoing a zipper so you can see the individual words clearly.',
    relatedView: 'grammar',
  },
  {
    id: 'qa-kim-words',
    category: 'cbse',
    question: 'What are the essential Kim-family words for CBSE questions?',
    sanskritQuestion: 'सी.बी.एस.ई. परीक्षायाः प्रमुख-किम्-शब्दाः के?',
    shortAnswer: 'कः (who), किम् (what), कुत्र (where), कदा (when), कुतः (from where), कथम् (how), किमर्थम् (why).',
    detailedAnswer: 'In CBSE Sanskrit exams, question formation (प्रश्न-निर्माणम्) carries significant marks! Memorize these 7 interrogative keywords:\n1. कः / का / किम् = Who? / What?\n2. कुत्र = Where? (Location)\n3. कदा = When? (Time)\n4. कुतः = From where? (Source)\n5. कथम् = How? (Manner/State)\n6. किमर्थम् = Why / For what reason? (Purpose)\n7. कति = How many? (Count)',
    audioDevanagari: 'कः किम् कुत्र कदा कुतः कथम् किमर्थम् कति',
    tip: 'Look at the underlined word in the exam paper: its gender, number, and case will tell you which exact Kim-word form to substitute!',
    relatedView: 'cbse-guide',
  },
  {
    id: 'qa-chitra-varnana',
    category: 'cbse',
    question: 'How do I score full marks in Picture Description (चित्र-वर्णनम्)?',
    sanskritQuestion: 'चित्र-वर्णने सम्पूर्ण-अङ्कान् कथं लभेय?',
    shortAnswer: 'Write 5 simple, grammatically rock-solid sentences using words directly from the given Mañjūṣā (word box).',
    detailedAnswer: 'Follow Bodhi’s golden 4-step formula:\nSentence 1 (Setting the scene): "इदं चित्रं [Place in Genitive/Locative] अस्ति।" e.g. "इदं चित्रं विद्यालयस्य अस्ति।"\nSentence 2 & 3 (What is visible): "चित्रे [Subject] अस्ति / सन्ति।" e.g. "चित्रे वृक्षाः सन्ति। बालकाः क्रीडन्ति।"\nSentence 4 (Action taking place): "बालकाः प्रसन्नाः दृश्यन्ते।"\nSentence 5 (Concluding harmony): "चित्रं रमणीयम् अस्ति।"\nAvoid complicated compound words; keep subject and verb in agreement!',
    tip: 'Always double-check that your verb matches whether the subject is singular (अस्ति) or plural (सन्ति)!',
    relatedView: 'cbse-guide',
  },
  {
    id: 'qa-ekadhikena',
    category: 'vedic_math',
    question: 'How does the Vedic Math sutra "Ekādhikena Pūrveṇa" work for squaring?',
    sanskritQuestion: 'एकाधिकेन पूर्वेण सूत्रस्य प्रयोगः कथं क्रियते?',
    shortAnswer: 'Multiply the tens digit by (tens digit + 1), and append "25" at the end!',
    detailedAnswer: 'For any two-digit number ending in 5 (like 35, 65, 85):\nLet’s square 35²:\nStep 1: The tens digit is 3. One more than 3 is 4.\nStep 2: Multiply 3 × 4 = 12.\nStep 3: Square the last digit: 5² = 25.\nAnswer: 1225! Done in 2 seconds.\nAnother example: 75² → 7 × 8 = 56, append 25 → 5625. Magic, yet pure mathematical elegance!',
    audioDevanagari: 'एकाधिकेन पूर्वेण',
    tip: 'Try calculating 95² in your head right now: 9 × 10 = 90, append 25 = 9025!',
    relatedView: 'vedic-maths',
  },
  {
    id: 'qa-zero-concept',
    category: 'vedic_math',
    question: 'Why did ancient Indian mathematicians consider zero (शून्य) so profound?',
    sanskritQuestion: 'शून्यस्य संकल्पना किमर्थं महती?',
    shortAnswer: 'Śūnya is not mere nothingness; it is the boundless fertile matrix from which all numbers emerge.',
    detailedAnswer: 'In Sanskrit, Śūnya (शून्य) means the void that is full of potential. Brahmagupta in the 7th century was the first mathematician in human history to define zero as a full mathematical number with arithmetic operations (a + 0 = a, a × 0 = 0). Combined with place value (दशगुण-पद्धति), it revolutionized science, astronomy, and modern computing.',
    audioDevanagari: 'शून्यम् अनन्तम्',
    tip: 'The famous verse says: "पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते" — take fullness from fullness, and fullness remains!',
    relatedView: 'vedic-maths',
  },
  {
    id: 'qa-four-levels-vak',
    category: 'philosophy',
    question: 'What are the 4 levels of speech (चतस्रो वाचः)?',
    sanskritQuestion: 'चत्वारि वाक्-रूपाणि कानि?',
    shortAnswer: 'Vaikharī (spoken sound), Madhyamā (mental thought), Paśyantī (inner vision), and Parā (pure unmanifest source).',
    detailedAnswer: 'The Ṛgveda (1.164.45) declares: "चत्वारि वाक् परिमिता पदानि तानि विदुर्ब्राह्मणा ये मनीषिणः".\n1. Vaikharī (वैखरी): Audible speech produced by vocal organs.\n2. Madhyamā (मध्यमा): The internal monologue or whispered thought inside your mind.\n3. Paśyantī (पश्यन्ती): The flash of intuitive visual understanding before words are chosen.\n4. Parā (परा): The silent, transcendent awareness that precedes all thought.\nSanskrit was designed so chanting in Vaikharī leads the mind all the way back to the stillness of Parā.',
    audioDevanagari: 'वैखरी मध्यमा पश्यन्ती परा',
    tip: 'Notice when you have a creative idea: first you "see" it whole (Paśyantī), then you formulate sentences (Madhyamā), then you speak it (Vaikharī)!',
    relatedView: 'philosophy',
  },
  {
    id: 'qa-bodhi-meaning',
    category: 'philosophy',
    question: 'What does the name "Bodhi" (बोधि) mean?',
    sanskritQuestion: 'बोधि-शब्दस्य कः अर्थः?',
    shortAnswer: 'Bodhi means awakening, enlightenment, luminous intelligence, and spiritual wisdom.',
    detailedAnswer: 'Derived from the Sanskrit root "बुध्" (budh — to perceive, to awaken, to understand). Words like Buddhi (intellect), Bodha (comprehension), and Buddha (the awakened one) all share this same radiant root. As your mascot and companion, Bodhi is here to awaken your natural love for sound, clarity, and knowledge!',
    audioDevanagari: 'बोधिः बुद्धः बुद्धिः बोधः',
    tip: 'Whenever you learn something with understanding rather than blind memorization, that moment is a spark of Bodhi!',
    relatedView: 'home',
  },
  {
    id: 'qa-guru-parampara',
    category: 'philosophy',
    question: 'Why is the Guru not just a faster model? What is the role of Guru-Paramparā in the age of AI?',
    sanskritQuestion: 'किं कृत्रिम-बुद्धेः युगे गुरु-परम्परायाः स्थाने यन्त्रं भवितुम् अर्हति?',
    shortAnswer: 'A generative model is an accumulator and processor of recorded traces, whereas a Guru is a living constraint and unbroken lineage who transmits Prāṇa (breath/life) into speech.',
    detailedAnswer: 'In the Sanskrit Gurukul tradition, the guru is not an informational bottleneck or a faster search engine. Machines process representations; humans live conditions. A model can print a mantra, parse its grammar, or recite a commentary, but it has no breath (prāṇa), no mortality, no fear, and no lineage commitment. The Guru is a living constraint whose voice is bonded to breath and attention, passing down the principle of a text\'s use (प्रयोग). As Bodhi\'s study note reminds us: AI can move information; only a living lineage can turn intention into invocation. The guru is why Sanskrit did not die when paper was printed, and why it will remain living in the age of AI.',
    audioDevanagari: 'गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः',
    tip: 'An app or AI is a wonderful scaffold or reference shelf, but never confuse the scaffold for the temple or the search engine for the living teacher.',
    relatedView: 'philosophy',
  },
  {
    id: 'qa-gunitaakshara',
    category: 'pronunciation',
    question: 'What are Guṇitākṣarāṇi (गुणिताक्षराणि) and how do Mātrās work?',
    sanskritQuestion: 'गुणिताक्षराणि कानि? मात्राणां किं कार्यम्?',
    shortAnswer: 'Guṇitākṣarāṇi are combination letters formed when a pure consonant (marked with a Halanta, e.g. क्) merges with a vowel via its Mātrā sign.',
    detailedAnswer: 'In Sanskrit Devanagari, a pure consonant cannot be easily pronounced on its own and is written with a slanting line underneath called a Halanta (e.g., क्, ख्, ग्). When a vowel is added, it loses its independent shape and turns into a specific modifier symbol called a Mātrā:\n• क् + अ = क (inherent vowel, removes Halanta)\n• क् + आ = का (vertical bar ा)\n• क् + इ = कि (left hook ि)\n• क् + ई = की (right hook ी)\n• क् + उ = कु (curve below ु)\n• क् + ऊ = कू (loop below ू)\n• क् + ऋ = कृ (c-hook below ृ)\n• क् + ॠ = कॄ (double c-hook ॄ)\n• क् + ऌ = कॢ (sign below ॢ)\n• क् + ए = के (single stroke े)\n• क् + ऐ = कै (double stroke ै)\n• क् + ओ = को (bar + stroke ो)\n• क् + औ = कौ (bar + double stroke ौ)\n• क् + अं = कं (anusvāra dot ं)\n• क् + अः = कः (visarga dots ः).',
    audioDevanagari: 'क का कि की कु कू कृ के कै को कौ कं कः',
    tip: 'Remember: A pure consonant is like a silent instrument; the vowel Mātrā is the breath that makes it resonate!',
    relatedView: 'reader',
  },
  {
    id: 'qa-gunita-exceptions',
    category: 'pronunciation',
    question: "What are the special script exceptions for र (ra) with 'u/ū' and ह (ha) with 'ṛ'?",
    sanskritQuestion: 'रु, रू, हृ इत्येतेषां विशेष-नियमाः के?',
    shortAnswer: 'For र, vowels उ and ऊ attach directly to the middle-right side (रु, रू). For ह, the vowel ऋ sits inside its belly (हृ)!',
    detailedAnswer: "In standard Devanagari, vowels u, ū, and ṛ go underneath the consonant. But Sanskrit has two vital script exceptions:\n1. The Letter र (ra) with 'u' or 'ū':\n• र् + उ = रु (curved attach, as in गुरुः, पुरुषः, रुचिः)\n• र् + ऊ = रू (looped attach with a horizontal stem, as in रूपम्, रूढिः)\n2. The Letter ह (ha) with 'ṛ':\n• ह् + ऋ = हृ (the hook goes inside the stomach of the letter, pronounced hṛ as in हृदयम् - heart, and हृष्टः - delighted).",
    audioDevanagari: 'रु रू हृ हृदयम्',
    tip: 'Look closely at the word "हृदयम्" (heart): you can see the little curl tucked right into the belly of the letter ह!',
    relatedView: 'grammar',
  },
  {
    id: 'qa-numbers-gender',
    category: 'grammar',
    question: 'How do numbers 1 to 4 decline across genders in Sanskrit?',
    sanskritQuestion: '१ तः ४ संख्यानां लिङ्ग-भेदाः के?',
    shortAnswer: 'Numbers 1-4 act as adjectives and change forms for Masculine, Feminine, and Neuter. From 5 onwards, forms are identical in all genders.',
    detailedAnswer: 'In Sanskrit:\n• 1: एकः (M), एका (F), एकम् (N) — always singular (e.g. एकः बालकः, एका बालिका, एकम् फलम्)\n• 2: द्वौ (M), द्वे (F), द्वे (N) — always dual (e.g. द्वौ छात्रौ, द्वे बालिके, द्वे फले)\n• 3: त्रयः (M), तिस्रः (F), त्रीणि (N) — always plural (e.g. त्रयः बालकाः, तिस्रः बालिकाः, त्रीणि पुस्तकानि)\n• 4: चत्वारः (M), चतस्रः (F), चत्वारि (N) — always plural (e.g. चत्वारः वेदाः, चतस्रः नद्यः, चत्वारि पुष्पाणि)\nFrom 5 (पञ्च) onwards, the numeral remains identical for all genders: पञ्च बालकाः, पञ्च बालिकाः, पञ्च फलानि!',
    audioDevanagari: 'एकः एका एकम् द्वौ द्वे त्रयः तिस्रः त्रीणि चत्वारः चतस्रः चत्वारि पञ्च',
    tip: 'Notice that for 2, feminine and neuter have the exact same form: द्वे बालिके (two girls) and द्वे फले (two fruits)!',
    relatedView: 'reader',
  },
  {
    id: 'qa-numbers-large-scale',
    category: 'vedic_math',
    question: 'What are the ancient Sanskrit powers of 10 like Koṭi, Mahāpadma, and Parārdha?',
    sanskritQuestion: 'महा-संख्या-परिमाणं किम्?',
    shortAnswer: 'The Yajurveda, Rāmāyaṇa, and Līlāvatī name powers of 10 all the way to 10¹⁷ (Parārdham - One Hundred Quadrillion)!',
    detailedAnswer: 'Long before modern decimal prefixes, Indian mathematicians named every single power of 10:\n• 10⁰ = एकम् (1)\n• 10¹ = दश (10)\n• 10² = शतम् (100)\n• 10³ = सहस्रम् (1,000)\n• 10⁴ = अयुतम् (10,000)\n• 10⁵ = लक्षम् (1,00,000 / 1 Lakh)\n• 10⁶ = प्रयुतम् (10,00,000 / 1 Million)\n• 10⁷ = कोटिः (1,00,00,000 / 1 Crore)\n• 10⁸ = अर्बुदम् (100 Million)\n• 10⁹ = अब्जम् / पद्मम् (1 Billion)\n• 10¹⁰ = खर्वम् (10 Billion)\n• 10¹² = महापद्मम् (1 Trillion)\n• 10¹³ = शङ्कुः / शङ्खः (10 Trillion)\n• 10¹⁷ = परार्धम् (100 Quadrillion / Quintillion).\nThese were routinely calculated in astronomical texts like Āryabhaṭīya and Sūrya Siddhānta!',
    audioDevanagari: 'शतम् सहस्रम् लक्षम् कोटिः अर्बुदम् महापद्मम् परार्धम्',
    tip: 'When you hear "33 Koti Devata", remember that Koṭi in Sanskrit also meant supreme category/class, not just numerical crore!',
    relatedView: 'vedic-maths',
  },
  {
    id: 'qa-riddle-ai',
    category: 'engineering',
    question: '🧩 Riddle #1: What modern tech concept is engineered by "कृत्रिमन्त्रम्" (Kṛtrimantram)?',
    sanskritQuestion: 'कृत्रिमन्त्रम् इति नवीन-शब्देन कस्य आधुनिक-तन्त्रज्ञानस्य बोधः भवति?',
    shortAnswer: 'Artificial Intelligence (AI) — literally an engineered tool/mechanism (मन्त्र) for active thinking, reasoning, and computing!',
    detailedAnswer: 'Blueprint Breakdown:\n• Stage 1 (Raw Materials): Core Root √मन् (Man = to think, ponder, compute) + instrumental suffix "त्र" (tra = instrument/mechanism) + modifier "कृत्रिम" (artificial/man-made, from √कृ + त्रिमप्).\n• Stage 2 (Grammar Forge): √मन् + त्र = मन्त्र (Pāṇini 3.2.182: tool for thinking). Compounded via Tatpuruṣa Samāsa: कृत्रिम + मन्त्रम् = कृत्रिमन्त्रम्.\n• Stage 3 (Final Outcome): "कृत्रिमन्त्रम्" = An engineered instrument designed for synthetic intelligence and reasoning!\nWhy this is pure genius: While modern languages translate AI clumsily as "कृत्रिम बुद्धिमत्ता" (three words), classical Pāṇinian morphology creates a single, elegant nominal: कृत्रिमन्त्रम्!',
    audioDevanagari: 'कृत्रिमन्त्रम्',
    tip: 'In ancient times, "Mantra" meant an instrument of thought (मननात् त्रायते इति). Today, AI is quite literally a machine that calculates thoughts!',
    relatedView: 'philosophy',
  },
  {
    id: 'qa-riddle-internet',
    category: 'engineering',
    question: '🧩 Riddle #2: What modern communication network is engineered by "अन्तर्जालम्" (Antarjālam) / "विश्वजालम्" (Viśvajālam)?',
    sanskritQuestion: 'अन्तर्जालम् अथवा विश्वजालम् इति शब्देन किम् अभिधीयते?',
    shortAnswer: 'The Internet / World Wide Web (WWW) — an interconnected mesh (जाल) spanning the interior space between all computational nodes.',
    detailedAnswer: 'Blueprint Breakdown:\n• Stage 1 (Raw Materials): Core word "जालम्" (Jālam = net, lattice, matrix, web) + prefix "अन्तर्" (Antar = within, interconnected among entities; cognate to Latin "inter-") or "विश्व" (Viśva = universe/global).\n• Stage 2 (Grammar Forge): Tatpuruṣa Samāsa (अन्तर्गतं जालं यत् सर्वान् संबध्नाति = The inner web linking all). Compounding with Sandhi yields "अन्तर्जालम्" (The Internet) and "विश्वजालम्" (The World Wide Web).\n• Stage 3 (Final Outcome): Precise Sanskrit descriptive nominals that perfectly encapsulate nodes interconnected across global cyberspace.',
    audioDevanagari: 'अन्तर्जालम् विश्वजालम्',
    tip: 'Think of spiderwebs or fishing nets: "जाल" describes any interconnected node network where every thread holds tension with the rest!',
    relatedView: 'philosophy',
  },
  {
    id: 'qa-riddle-smartphone',
    category: 'engineering',
    question: '🧩 Riddle #3: What everyday pocket device is engineered by "चलदूरभाषः" (Caladūrabhāṣaḥ)?',
    sanskritQuestion: 'चलदूरभाषः इति शब्देन कस्य यन्त्रस्य निर्देशः भवति?',
    shortAnswer: 'Mobile Phone / Smartphone — literally a mobile (चल) instrument for speaking across long distances (दूरभाष).',
    detailedAnswer: 'Blueprint Breakdown:\n• Stage 1 (Raw Materials): Root √भाष् (to speak/voice) + Ghañ suffix = भाषः (instrument of speech) + prefix "दूर" (dūra = at a distance/tele-) + adjective "चल" (moving, portable, from √चल् = to move).\n• Stage 2 (Grammar Forge): दूर + भाषः = दूरभाषः (Telephone). Then Karmadhāraya Samāsa: चलः चासौ दूरभाषश्च = चलदूरभाषः (Mobile phone). If equipped with intelligence (Smartphone), it is engineered as "सचेतन-चलदूरभाषः"!\n• Stage 3 (Final Outcome): "चलदूरभाषः" (Mobile phone) and "चलदूरवाणी" (Cellular voice terminal).',
    audioDevanagari: 'चलदूरभाषः',
    tip: 'Notice how "Dūra" matches the Greek prefix "Tele-" (as in Telephone, Television, Telescope)!',
    relatedView: 'reader',
  },
  {
    id: 'qa-riddle-satellite',
    category: 'engineering',
    question: '🧩 Riddle #4: What aerospace technology is engineered by "कृत्रिमोपग्रहः" (Kṛtrimopagrahaḥ)?',
    sanskritQuestion: 'कृत्रिमोपग्रहः इति शब्देन कस्य आकाश-यन्त्रस्य ग्रहणं भवति?',
    shortAnswer: 'Artificial Space Satellite — a man-made (कृत्रिम) secondary companion body (उपग्रह) locked in orbital gravitation.',
    detailedAnswer: 'Blueprint Breakdown:\n• Stage 1 (Raw Materials): Root √ग्रह् (to seize/gravitate) + Ac suffix = ग्रहः (celestial body holding orbit) + prefix "उप" (secondary/orbiting companion, as in Upaniṣad) + adjective "कृत्रिम" (artificial).\n• Stage 2 (Grammar Forge): उप + ग्रहः = उपग्रहः (a moon or satellite orbiting a primary planet). Compounded with "कृत्रिम" via Karmadhāraya: कृत्रिम + उपग्रहः. Applying Guṇa Sandhi (a + u = o, Pāṇini 6.1.87 "आद्गुणः") morphs it into "कृत्रिमोपग्रहः".\n• Stage 3 (Final Outcome): "कृत्रिमोपग्रहः" = An artificial orbiting satellite orbiting Earth for GPS, weather, and telecommunications!',
    audioDevanagari: 'कृत्रिमोपग्रहः',
    tip: 'In Sanskrit astronomy, the Moon (चन्द्र) is a natural उपग्रहः, while Chandrayaan and GSAT are कृत्रिमोपग्रहाः!',
    relatedView: 'vedic-maths',
  },
  {
    id: 'qa-riddle-blockchain',
    category: 'engineering',
    question: '🧩 Riddle #5: What decentralized fintech architecture is engineered by "खण्डशृङ्खला" (Khaṇḍaśṛṅkhalā)?',
    sanskritQuestion: 'खण्डशृङ्खला इति पदं कस्याः आधुनिक-तन्त्र-व्यवस्थायाः वाचकम्?',
    shortAnswer: 'Blockchain — an immutable, cryptographically verified chain (शृङ्खला) of discrete data blocks (खण्ड).',
    detailedAnswer: 'Blueprint Breakdown:\n• Stage 1 (Raw Materials): Root √खण्ड् (to divide, partition) = खण्डः (a discrete block or ledger record) + nominal base "शृङ्खला" (an interlocking unbroken chain or series).\n• Stage 2 (Grammar Forge): Ṣaṣṭhī Tatpuruṣa Samāsa: खण्डानां शृङ्खला = खण्डशृङ्खला (A linked chain of blocks). When encrypted cryptographically with root √गुप् (to protect/hash), it is termed "गोपिता खण्डशृङ्खला" (Cryptographic Blockchain)!\n• Stage 3 (Final Outcome): "खण्डशृङ्खला" captures the distributed ledger architecture with 100% mathematical precision without borrowing a single foreign word.',
    audioDevanagari: 'खण्डशृङ्खला',
    tip: 'Sanskrit compounds (Samāsa) are naturally modular — just like software object-oriented design and cryptography blocks!',
    relatedView: 'vedic-maths',
  },
];

export const BODHI_WORD_SUGGESTIONS: BodhiWordSuggestion[] = [
  // Tech / Neologisms
  { id: 'w-ai', devanagari: 'कृत्रिमन्त्रम्', iast: 'Kṛtrimantram', english: 'Artificial Intelligence (AI)', category: 'tech', modernConcept: 'AI / Thinking Machine', breakdown: 'कृत्रिम (artificial) + √मन् (to think) + त्र (mechanism)' },
  { id: 'w-net', devanagari: 'अन्तर्जालम्', iast: 'Antarjālam', english: 'The Internet / Cyberspace', category: 'tech', modernConcept: 'Internet', breakdown: 'अन्तर् (inter-) + जालम् (net / web)' },
  { id: 'w-phone', devanagari: 'चलदूरभाषः', iast: 'Caladūrabhāṣaḥ', english: 'Mobile Phone / Smartphone', category: 'tech', modernConcept: 'Smartphone', breakdown: 'चल (mobile) + दूर (tele) + √भाष् (to speak)' },
  { id: 'w-sat', devanagari: 'कृत्रिमोपग्रहः', iast: 'Kṛtrimopagrahaḥ', english: 'Artificial Space Satellite', category: 'tech', modernConcept: 'Satellite', breakdown: 'कृत्रिम (man-made) + उपग्रहः (satellite orbiter)' },
  { id: 'w-chain', devanagari: 'खण्डशृङ्खला', iast: 'Khaṇḍaśṛṅkhalā', english: 'Blockchain / Distributed Ledger', category: 'tech', modernConcept: 'Blockchain', breakdown: 'खण्ड (block) + शृङ्खला (interlocked chain)' },
  { id: 'w-comp', devanagari: 'सङ्गणकम्', iast: 'Saṅgaṇakam', english: 'Computer / Calculating Machine', category: 'tech', modernConcept: 'Computer', breakdown: 'सम् (well/together) + √गण् (to compute) + ल्युट् (noun suffix)' },
  { id: 'w-vr', devanagari: 'आभासीय-यथार्थता', iast: 'Ābhāsīya-Yathārthatā', english: 'Virtual Reality (VR)', category: 'tech', modernConcept: 'Virtual Reality', breakdown: 'आभास (simulated appearance) + यथार्थता (reality)' },
  { id: 'w-email', devanagari: 'विद्युत्पत्रम्', iast: 'Vidyut-patram', english: 'Electronic Mail (E-mail)', category: 'tech', modernConcept: 'Email', breakdown: 'विद्युत् (electric) + पत्रम् (letter/message)' },

  // Roots (Dhātus)
  { id: 'w-dhatu-man', devanagari: '√मन्', iast: '√man', english: 'To think, reason, ponder, calculate', category: 'root', breakdown: 'Divādi Gaṇa (मन्यते) — Root of mantra, manas, manana' },
  { id: 'w-dhatu-kr', devanagari: '√कृ', iast: '√kṛ', english: 'To do, create, make, perform', category: 'root', breakdown: 'Tanādi Gaṇa (करोति) — Root of karma, kārya, kartā, kṛtrima' },
  { id: 'w-dhatu-jna', devanagari: '√ज्ञा', iast: '√jñā', english: 'To know, understand, cognize', category: 'root', breakdown: 'Kryādi Gaṇa (जानाति) — Root of jñāna, vijñāna, saṁjñā' },
  { id: 'w-dhatu-gam', devanagari: '√गम्', iast: '√gam', english: 'To go, move, progress', category: 'root', breakdown: 'Bhavādi Gaṇa (गच्छति) — Root of gati, āgama, jaṅgama' },
  { id: 'w-dhatu-path', devanagari: '√पठ्', iast: '√paṭh', english: 'To read, study, recite aloud', category: 'root', breakdown: 'Bhavādi Gaṇa (पठति) — Root of pāṭha, pāṭhaśālā' },
  { id: 'w-dhatu-likh', devanagari: '√लिख्', iast: '√likh', english: 'To write, scratch, record, sketch', category: 'root', breakdown: 'Tudādi Gaṇa (लिखति) — Root of lekha, lipi, lekhaka' },
  { id: 'w-dhatu-drs', devanagari: '√दृश्', iast: '√dṛś', english: 'To see, perceive, realize', category: 'root', breakdown: 'Bhavādi Gaṇa (पश्यति) — Root of darśana, dṛṣṭi' },

  // Core Vocabulary & Grammar
  { id: 'w-vidya', devanagari: 'विद्या', iast: 'Vidyā', english: 'Sacred Knowledge, Science, Wisdom', category: 'vocab', breakdown: '√विद् (to know) + क्यप् + टाप् (feminine)' },
  { id: 'w-vibhakti', devanagari: 'विभक्तिः', iast: 'Vibhaktiḥ', english: 'Noun Case Inflection (7 Cases)', category: 'grammar', breakdown: 'वि + √भज् (to divide/distribute) + क्तिन्' },
  { id: 'w-sandhi', devanagari: 'सन्धिः', iast: 'Sandhiḥ', english: 'Phonological Sound Junction / Union', category: 'grammar', breakdown: 'सम् + √धा (to place together) + कि' },
  { id: 'w-samasa', devanagari: 'समासः', iast: 'Samāsaḥ', english: 'Nominal Word Compounding', category: 'grammar', breakdown: 'सम् + √अस् (to throw/merge together) + घञ्' },
  { id: 'w-sutra', devanagari: 'सूत्रम्', iast: 'Sūtram', english: 'Aphorism, Concise Algorithmic Code', category: 'grammar', breakdown: '√सिव् (to sew) + ष्ट्रन् — An unbroken thread of rules' },
  { id: 'w-visarga', devanagari: 'विसर्गः', iast: 'Visargaḥ', english: 'Aspiration Sound (ः) Mirroring Preceding Vowel', category: 'grammar', breakdown: 'वि + √सृज् (to emit/release breath) + घञ्' },
  { id: 'w-anusvara', devanagari: 'अनुस्वारः', iast: 'Anusvāraḥ', english: 'Pure Nasal Sound (ं) Following a Vowel', category: 'grammar', breakdown: 'अनु (after) + स्वर (vowel) — That which follows a vowel' },
  { id: 'w-guru', devanagari: 'गुरुः', iast: 'Guruḥ', english: 'Living Teacher, Spiritual Guide (Heavy with Wisdom)', category: 'vocab', breakdown: '√गृ (to invoke/guide) or गु (darkness) + रु (dispeller) — The living dispeller of darkness' },
  { id: 'w-parampara', devanagari: 'परम्परा', iast: 'Paramparā', english: 'Unbroken Living Lineage / Succession', category: 'vocab', breakdown: 'परम् (beyond) + परम् (higher) — From one generation of teachers to the next' },
  { id: 'w-prana', devanagari: 'प्राणः', iast: 'Prāṇaḥ', english: 'Vital Breath, Life-Force in Speech and Being', category: 'vocab', breakdown: 'प्र + √अन् (to breathe) + घञ् — The breath that binds intention to sound' },
];
