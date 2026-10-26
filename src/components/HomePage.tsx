import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import { playPronunciation, playSequence, stopPronunciation } from '../utils/pronunciation';
import { useAuthStore } from '../store/authStore';
import { canAccessAllChapters, isFreeTrialOpenLesson } from '../utils/premiumAccess';
import { GRADE_7_SYLLABUS } from '../data/grade7Syllabus';
import { GRADE_9_SYLLABUS } from '../data/grade9Syllabus';
import { NCERT_TEXTBOOKS, getTextbookMetaForLesson } from '../utils/textbookCovers';
import HomeLabBanner from './HomeLabBanner';
import { getSearchShortcut } from '../utils/platformShortcut';
import { GurukulEntranceIntro } from './GurukulEntranceIntro';
import { useAccessibilityStore } from '../utils/accessibilityStore';
import ProofOfQuality from './ProofOfQuality';
import BodhiMentorPositioning from './BodhiMentorPositioning';
import { SegmentedLearningPaths } from './SegmentedLearningPaths';
import { ToolInteractiveDemos } from './ToolInteractiveDemos';
import { GamificationShowcase } from './GamificationShowcase';
import { TrustAndMethodology } from './TrustAndMethodology';
import { MobileStickyBar } from './MobileStickyBar';
import '../styles/home-page.css';
import '../styles/bodhi.css';

const Grade8SyllabusModal = lazy(() => import('./Grade8SyllabusModal').then((m) => ({ default: m.Grade8SyllabusModal })));
const VarnamalaFlashcardDownloadModal = lazy(() => import('./VarnamalaFlashcardDownloadModal'));

export interface HomePageProps {
  onOpenReader: (lessonId?: string) => void;
  onOpenBoard: () => void;
  onOpenVarnamala: () => void;
  onOpenGrammar: () => void;
  onOpenVedicMaths?: () => void;
  onOpenPhilosophy?: () => void;
  onOpenCbseGuide?: () => void;
  onOpenOnlineClasses?: () => void;
  onOpenQuiz?: () => void;
  onOpenWorksheets?: () => void;
  onOpenDhatupatha?: () => void;
  onOpenBodhi?: () => void;
  onOpenSearch?: () => void;
  onOpenResources?: () => void;
  onOpenCourse?: () => void;
  onOpenScienceLab?: (segment?: string) => void;
  onOpenRegister?: () => void;
  onOpenCertificate?: () => void;
}

interface DemoWord {
  devanagari: string;
  transliteration: string;
  english: string;
  sanskrit: string;
  hindi: string;
  icon: string;
  syllables: string[];
}

const DEMO_WORDS: DemoWord[] = [
  {
    devanagari: 'विद्या',
    transliteration: 'vidyā',
    english: 'Knowledge / Learning / Science',
    sanskrit: 'ज्ञानम्, पाण्डित्यम्',
    hindi: 'ज्ञान, विद्या, शिक्षा',
    icon: '📚',
    syllables: ['वि (vi)', 'द्या (dyā)'],
  },
  {
    devanagari: 'सत्यम्',
    transliteration: 'satyam',
    english: 'Truth / Reality / Virtue',
    sanskrit: 'यथार्थवचनम्, ऋतम्',
    hindi: 'सत्य, सच, यथार्थ',
    icon: '⚖️',
    syllables: ['स (sa)', 'त्यम् (tyam)'],
  },
  {
    devanagari: 'शान्तिः',
    transliteration: 'śāntiḥ',
    english: 'Peace / Tranquility / Calm',
    sanskrit: 'उपशमः, प्रशान्तिः',
    hindi: 'शांति, अमन, सुख',
    icon: '🕊️',
    syllables: ['शान् (śān)', 'तिः (tiḥ)'],
  },
  {
    devanagari: 'आनन्दः',
    transliteration: 'ānandaḥ',
    english: 'Bliss / Supreme Joy / Delight',
    sanskrit: 'हर्षः, प्रमोदः, सुखम्',
    hindi: 'आनंद, परम सुख, उल्लास',
    icon: '✨',
    syllables: ['आ (ā)', 'नन् (nan)', 'दः (daḥ)'],
  },
  {
    devanagari: 'मित्रम्',
    transliteration: 'mitram',
    english: 'Friend / Companion / Ally',
    sanskrit: 'सखा, सुहृत्',
    hindi: 'मित्र, दोस्त, सखा',
    icon: '🤝',
    syllables: ['मि (mi)', 'त्रम् (tram)'],
  },
  {
    devanagari: 'गुरुः',
    transliteration: 'guruḥ',
    english: 'Teacher / Spiritual Mentor',
    sanskrit: 'आचार्यः, उपाध्यायः',
    hindi: 'गुरु, शिक्षक, मार्गदर्शक',
    icon: '📿',
    syllables: ['गु (gu)', 'रुः (ruḥ)'],
  },
  {
    devanagari: 'वृक्षः',
    transliteration: 'vṛkṣaḥ',
    english: 'Tree / Plant',
    sanskrit: 'तरुः, पादपः, द्रुमः',
    hindi: 'पेड़, वृक्ष, तरु',
    icon: '🌳',
    syllables: ['वृ (vṛ)', 'क्षः (kṣaḥ)'],
  },
  {
    devanagari: 'सूर्यः',
    transliteration: 'sūryaḥ',
    english: 'Sun / Solar Deity',
    sanskrit: 'आदित्यः, भानुः, रविः',
    hindi: 'सूर्य, सूरज, रवि',
    icon: '☀️',
    syllables: ['सूर् (sūr)', 'यः (yaḥ)'],
  },
];

interface SubhashitaWord {
  sa: string;
  en: string;
}

interface SubhashitaItem {
  id: string;
  categorySa: string;
  categoryEn: string;
  line1: string;
  line2: string;
  transliteration: string;
  words: SubhashitaWord[];
  meaningEn: string;
  meaningHi: string;
  source: string;
}

const SUBHASHITAS: SubhashitaItem[] = [
  {
    id: 'vidya-vinaya',
    categorySa: 'विद्या-महिमा',
    categoryEn: 'Glory of True Learning',
    line1: 'विद्या ददाति विनयं विनयाद्याति पात्रताम् ।',
    line2: 'पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ॥',
    transliteration: 'vidyā dadāti vinayaṁ vinayād yāti pātratām | pātratvād dhanam āpnoti dhanād dharmaṁ tataḥ sukham ||',
    words: [
      { sa: 'विद्या', en: 'Knowledge' },
      { sa: 'ददाति', en: 'bestows' },
      { sa: 'विनयम्', en: 'humility & grace' },
      { sa: 'विनयात्', en: 'from humility' },
      { sa: 'याति', en: 'comes / reaches' },
      { sa: 'पात्रताम्', en: 'worthiness' },
      { sa: 'पात्रत्वात्', en: 'from worthiness' },
      { sa: 'धनम्', en: 'prosperity' },
      { sa: 'धनात्', en: 'from wealth' },
      { sa: 'धर्मम्', en: 'righteous action' },
      { sa: 'ततः सुखम्', en: 'thence true joy' },
    ],
    meaningEn: 'True knowledge bestows humility; from humility arises worthiness and capability; through worthiness one earns wealth; with wealth one performs noble duties (Dharma); and from righteousness flows lasting joy.',
    meaningHi: 'विद्या विनम्रता प्रदान करती है; विनम्रता से योग्यता आती है; योग्यता से धन की प्राप्ति होती है; धन से धर्म का आचरण होता है और धर्म से ही शाश्वत सुख प्राप्त होता है।',
    source: 'हितोपदेशः (Hitopadeśa, Prastāvikā 6)',
  },
  {
    id: 'udyama-siddhi',
    categorySa: 'उद्योग-प्रशंसा',
    categoryEn: 'Power of Diligent Effort',
    line1: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः ।',
    line2: 'न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः ॥',
    transliteration: 'udyamena hi sidhyanti kāryāṇi na manorathaiḥ | na hi suptasya siṁhasya praviśanti mukhe mṛgāḥ ||',
    words: [
      { sa: 'उद्यमेन', en: 'through diligent effort' },
      { sa: 'हि', en: 'indeed / truly' },
      { sa: 'सिध्यन्ति', en: 'are accomplished' },
      { sa: 'कार्याणि', en: 'all deeds & goals' },
      { sa: 'न मनोरथैः', en: 'not by mere daydreams' },
      { sa: 'सुप्तस्य', en: 'of a sleeping' },
      { sa: 'सिंहस्य', en: 'lion' },
      { sa: 'मुखे', en: 'into the mouth' },
      { sa: 'मृगाः', en: 'deer / prey' },
    ],
    meaningEn: 'All undertakings are accomplished only through persistent effort and action, never by mere daydreaming. Even for the king of beasts, the lion, deer do not walk into his mouth while he sleeps.',
    meaningHi: 'सभी कार्य परिश्रम करने से ही सिद्ध होते हैं, केवल मन की इच्छाओं से नहीं। सोते हुए सिंह के मुख में हिरण स्वयं चलकर कभी प्रवेश नहीं करते।',
    source: 'पञ्चतन्त्रम् (Pañcatantra, Mitrabheda)',
  },
  {
    id: 'bhashasu-mukhya',
    categorySa: 'गीर्वाणभारती-गौरवम्',
    categoryEn: 'Divine Melodies of Sanskrit',
    line1: 'भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती ।',
    line2: 'तस्यां हि काव्यं मधुरं तस्मादपि सुभाषितम् ॥',
    transliteration: 'bhāṣāsu mukhyā madhurā divyā gīrvāṇabhāratī | tasyāṁ hi kāvyaṁ madhuraṁ tasmād api subhāṣitam ||',
    words: [
      { sa: 'भाषासु', en: 'among all languages' },
      { sa: 'मुख्या', en: 'the foremost' },
      { sa: 'मधुरा', en: 'melodious & sweet' },
      { sa: 'दिव्या', en: 'divine' },
      { sa: 'गीर्वाणभारती', en: 'Sanskrit (speech of the sages)' },
      { sa: 'तस्याम्', en: 'in it' },
      { sa: 'काव्यम्', en: 'poetry' },
      { sa: 'मधुरम्', en: 'is sweet' },
      { sa: 'सुभाषितम्', en: 'wise ethical maxims' },
    ],
    meaningEn: 'Foremost, sweet, and divine among all languages is the Sanskrit tongue (Gīrvāṇabhāratī). Within it, classical poetry is even sweeter, and sweetest of all are its wise philosophical maxims (Subhāṣitas).',
    meaningHi: 'संसार की सभी भाषाओं में संस्कृत भाषा मुख्य, मधुर और दिव्य है। उसमें भी उसका काव्य मधुर है, और काव्य से भी अधिक मधुर उसके सुभाषित हैं।',
    source: 'सुभाषितरत्नभाण्डागारम् (Subhāṣitaratnabhaṇḍāgāram)',
  },
];

interface SpokenPhraseItem {
  sa: string;
  en: string;
  hi: string;
  audioText: string;
}

const SPOKEN_PHRASES: SpokenPhraseItem[] = [
  {
    sa: 'नमो नमः! भवन्तः कथम् सन्ति? — अहम् कुशली अस्मि।',
    en: 'Greetings! How are you? — I am well.',
    hi: 'नमस्कार! आप कैसे हैं? — मैं कुशलपूर्वक हूँ।',
    audioText: 'नमो नमः। भवन्तः कथम् सन्ति? अहम् कुशली अस्मि।',
  },
  {
    sa: 'स्वागतम्! अद्य वयं सरल-संस्कृतम् आनन्देन पठामः।',
    en: 'Welcome! Today we study simple Sanskrit with joy.',
    hi: 'स्वागत है! आज हम सरलता और आनंद से संस्कृत पढ़ेंगे।',
    audioText: 'स्वागतम्। अद्य वयं सरल संस्कृतम् आनन्देन पठामः।',
  },
  {
    sa: 'शुभप्रभातम्! भवताम् दिनम् मङ्गलमयम् भवतु।',
    en: 'Good morning! May your day be blessed and auspicious.',
    hi: 'शुभ प्रभात! आपका दिन मंगलमय और कल्याणकारी हो।',
    audioText: 'शुभप्रभातम्। भवताम् दिनम् मङ्गलमयम् भवतु।',
  },
  {
    sa: 'भवतः नाम किम्? — मम नाम ... अस्ति।',
    en: 'What is your name? — My name is...',
    hi: 'आपका नाम क्या है? — मेरा नाम ... है।',
    audioText: 'भवतः नाम किम्? मम नाम अस्ति।',
  },
];

interface ChapterInfo {
  id: string;
  num: string;
  title: string;
  english: string;
  icon: string;
  category: 'stories' | 'shlokas' | 'dialogue' | 'grammar';
  genreBadge: string;
  theme: string;
  grammarFocus: string;
}

const CHAPTERS_INFO: ChapterInfo[] = [
  {
    id: 'gsde101',
    num: 'Chapter 1 (Pages 1–7)',
    title: 'वन्दे भारतमातरम् (पाठः पृष्ठानि १-७)',
    english: 'Salutations to Mother India',
    icon: '🇮🇳',
    category: 'shlokas',
    genreBadge: 'प्रार्थना · Patriotism',
    theme: 'National prayer celebrating the natural and spiritual glory of India',
    grammarFocus: 'सम्बोधनम् & द्वितीया-विभक्तिः',
  },
  {
    id: 'gsde102',
    num: 'Chapter 2 (Pages 15–21)',
    title: 'नित्यं पिबामः सुभाषितरसम् (पाठः पृष्ठानि १५-२१)',
    english: 'Daily Nectar of Wise Sayings',
    icon: '📜',
    category: 'shlokas',
    genreBadge: 'सुभाषितानि · Moral Wisdom',
    theme: 'Timeless morals on sweet speech, charity, virtue, and steadfast conduct',
    grammarFocus: 'प्रथमा-तृतीया विभक्तयः, अव्ययानि',
  },
  {
    id: 'gsde103',
    num: 'Chapter 3 (Pages 29–31)',
    title: 'मित्राय नमः (पाठः पृष्ठानि २९-३१)',
    english: 'Salutations to the Friend (Sun)',
    icon: '☀️',
    category: 'dialogue',
    genreBadge: 'संवादः · Health & Yoga',
    theme: 'Conversation on Surya Namaskar, physical wellness, and solar salutations',
    grammarFocus: 'चतुर्थी-विभक्तिः (नमः योगे)',
  },
  {
    id: 'gsde104',
    num: 'Chapter 4 (Pages 39–41)',
    title: 'न लभ्यते चेत् आम्लं द्राक्षाफलम् (पाठः पृष्ठानि ३९-४१)',
    english: 'Sour Grapes (Animal Fable)',
    icon: '🍇',
    category: 'stories',
    genreBadge: 'नीतिकथा · Animal Fable',
    theme: 'Humorous fable of the thirsty fox and sour grapes illustrating rationalization',
    grammarFocus: 'लट्-लकारः, विशेषण-विशेष्यम्',
  },
  {
    id: 'gsde105',
    num: 'Chapter 5 (Pages 47–50)',
    title: 'सेवा हि परमो धर्मः (पाठः पृष्ठानि ४७-५०)',
    english: 'Service is the Highest Virtue',
    icon: '🤝',
    category: 'stories',
    genreBadge: 'कथा · Character Building',
    theme: 'Inspiring story of selfless devotion, serving the elderly, and moral duty',
    grammarFocus: 'तृतीया-विभक्तिः (सह योगे), क्त्वा-प्रत्ययः',
  },
  {
    id: 'gsde106',
    num: 'Chapter 6',
    title: 'क्रीडाम वयं श्लोकान्त्याक्षरीम्',
    english: 'Let’s Play Shloka Antyakshari',
    icon: '🎵',
    category: 'shlokas',
    genreBadge: 'काव्यक्रीडा · Poetry Game',
    theme: 'Engaging classroom Antyakshari game reciting shlokas across poetic meters',
    grammarFocus: 'श्लोकरचना, अनुष्टुप्-छन्दः, सन्धयः',
  },
  {
    id: 'gsde107',
    num: 'Chapter 7',
    title: 'ईशावास्यम् इदं सर्वम्',
    english: 'The Divine in Everything',
    icon: '🕉️',
    category: 'shlokas',
    genreBadge: 'उपनिषद् · Spiritual Wisdom',
    theme: 'Isha Upanishad teachings on renunciation, detachment, and divine omnipresence',
    grammarFocus: 'अव्ययानि, सर्वनामपदानि, सप्तमी',
  },
  {
    id: 'gsde108',
    num: 'Chapter 8',
    title: 'हितं मनोहारि च दुर्लभं वचः',
    english: 'Beneficial & Pleasing Words are Rare',
    icon: '💬',
    category: 'dialogue',
    genreBadge: 'संवादः · Class Discussion',
    theme: 'Kirātārjunīyam wisdom: words that are simultaneously beneficial and pleasant',
    grammarFocus: 'विशेषण-विशेष्य-भावः, सुभाषित-प्रयोगाः',
  },
  {
    id: 'gsde109',
    num: 'Chapter 9',
    title: 'अन्नाद् भवन्ति भूतानि',
    english: 'All Beings Arise from Food',
    icon: '🌾',
    category: 'dialogue',
    genreBadge: 'संवादः · Science & Ecology',
    theme: 'Gita ecology: The cosmic cycle of rain, agriculture, food, and living beings',
    grammarFocus: 'पञ्चमी-विभक्तिः (अपादानम् — अन्नात्)',
  },
  {
    id: 'gsde110',
    num: 'Chapter 10',
    title: 'दशमः कः ?',
    english: 'Who is the Tenth? (Story of Wisdom)',
    icon: '🤔',
    category: 'stories',
    genreBadge: 'हास्यकथा · Humorous Riddle',
    theme: 'The famous philosophical tale of the ten boys counting everyone except oneself',
    grammarFocus: 'संख्यावाचक-शब्दाः (एकः तः दशमः)',
  },
  {
    id: 'gsde111',
    num: 'Chapter 11',
    title: 'द्वीपेषु रम्यः द्वीपोऽण्डमानः',
    english: 'The Beautiful Andaman Islands',
    icon: '🏝️',
    category: 'dialogue',
    genreBadge: 'भूगोलः · Geography & Travel',
    theme: 'Rich exploration of Andaman & Nicobar archipelago, freedom struggle, and nature',
    grammarFocus: 'सप्तमी-विभक्तिः, गुणवाचक-विशेषणानि',
  },
  {
    id: 'gsde112',
    num: 'Chapter 12',
    title: 'वीराङ्गना पन्नाधाया',
    english: 'The Heroic Panna Dhai',
    icon: '🛡️',
    category: 'stories',
    genreBadge: 'इतिहासः · Heroic History',
    theme: 'The supreme sacrifice of foster-mother Panna Dhai saving Prince Uday Singh of Mewar',
    grammarFocus: 'लङ्-लकारः (भूतकालः / Past Tense)',
  },
  {
    id: 'gsde113',
    num: 'Extra Study',
    title: 'वर्णमात्रा-परिचयः',
    english: 'Alphabet & Accent Guide',
    icon: '🔤',
    category: 'grammar',
    genreBadge: 'ध्वनिविज्ञानम् · Phonetics',
    theme: 'Comprehensive guide to Hrasva, Dirgha, and Pluta vowels and Vedic pitch accents',
    grammarFocus: 'मात्राज्ञानम्, उदात्तः-अनुदात्तः-स्वरितः',
  },
  {
    id: 'gsde114',
    num: 'Appendix 1',
    title: 'शब्दरूपाणि',
    english: 'Noun Declensions (Shabdarupani)',
    icon: '📊',
    category: 'grammar',
    genreBadge: 'व्याकरणम् · Noun Tables',
    theme: 'Complete declension reference for masculine, feminine, neuter nouns and pronouns',
    grammarFocus: 'अजन्त-हलन्त-रूपाणि, 7 विभक्तयः',
  },
  {
    id: 'gsde115',
    num: 'Appendix 2',
    title: 'धातुरूपाणि',
    english: 'Verb Conjugations (Dhaturupani)',
    icon: '⚡',
    category: 'grammar',
    genreBadge: 'व्याकरणम् · Verb Paradigms',
    theme: 'Full verb conjugation paradigms for Parasmaipada, Atmanepada & Ubhayapada roots',
    grammarFocus: 'लट्, लोट्, लङ्, विधिलिङ्, लृट् लकाराः',
  },
  {
    id: 'grade8_prarthana',
    num: 'Grade 8 · Invocations',
    title: 'सरस्वतीप्रार्थना एवं राष्ट्र-गानम्',
    english: 'Goddess Saraswati Prayer & The National Anthem',
    icon: '🪕',
    category: 'shlokas',
    genreBadge: 'प्रार्थना · Sacred Hymn & Anthem',
    theme: 'Sacred invocation to Goddess Saraswati (जय जय हे भगवति सुरभारति) and the National Anthem in authentic Sanskrit orthography',
    grammarFocus: 'सम्बोधन-विभक्तिः, विशेषण-पदानि, संस्कृत-वर्तनी',
  },
  {
    id: 'grade8_ch1',
    num: 'Grade 8 · Chapter 1',
    title: 'संगच्छध्वं संवदध्वम् (Pages 1–9)',
    english: 'May We Walk Together, Speak Together in Harmony (Rigveda)',
    icon: '🏛️',
    category: 'shlokas',
    genreBadge: 'ऋग्वेद-मन्त्रः · Vedic Hymn',
    theme: 'The timeless Rigvedic hymn of universal solidarity: cultivating unified speech, harmony of thought, and collective cooperation.',
    grammarFocus: 'लोट्-लकारः (Imperative Mood), प्रश्ननिर्माणम् (किम-शब्दाः), लट्-लोट् परिवर्तनम्',
  },
  {
    id: 'grade8_ch2',
    num: 'Grade 8 · Chapter 2',
    title: 'अल्पानामपि वस्तूनां संहतिः कार्यसाधिका (Pages 10–22)',
    english: 'Unity of Small Things Accomplishes the Task (Hitopadesha)',
    icon: '🕊️',
    category: 'stories',
    genreBadge: 'नीतिकथा · Moral Fable',
    theme: 'The celebrated Hitopadesha fable of the united flock of doves lifting the hunter\'s snare through collective solidarity.',
    grammarFocus: 'ल्यप्-प्रत्ययः, सन्धिविच्छेदः, षष्ठी-विभक्तिः',
  },
  {
    id: 'grade8_ch3',
    num: 'Grade 8 · Chapter 3',
    title: 'सुभाषितरसं पीत्वा जीवनं सफलं कुरु (Pages 24–35)',
    english: 'Drinking the Nectar of Epigrams, Make Life Successful (Subhashitas)',
    icon: '🍯',
    category: 'shlokas',
    genreBadge: 'सुभाषितानि · Moral Epigrams',
    theme: 'Priceless classical epigrams on virtue, humility, discriminating true friends, testing gold vs humans, eight noble qualities, and human effort.',
    grammarFocus: 'सुभाषित-मञ्जरी, विसर्गसन्धिः (नम्रास्तरवः), यण्-सन्धिः (अभ्युपैति)',
  },
  {
    id: 'grade8_ch4',
    num: 'Grade 8 · Chapter 4',
    title: 'प्रणम्यो देशभक्तोऽयं गोपबन्धुर्महामनाः (Pages 36–44)',
    english: 'The Venerable Patriot Gopabandhu Das, the Great-Souled',
    icon: '🇮🇳',
    category: 'stories',
    genreBadge: 'चरितम् · Patriotic Biography',
    theme: 'The moving life of Utkalmani Pandit Gopabandhu Das: selfless flood relief in Odisha, Satyavadi open-air forest school, and total devotion to Bharat.',
    grammarFocus: 'यत्-तद् सर्वनाम-प्रयोगाः, अनीयर्/ण्यत्-प्रत्ययः (प्रणम्यः), विसर्ग-उत्व-सन्धिः',
  },
  {
    id: 'grade8_ch5',
    num: 'Grade 8 · Chapter 5',
    title: 'गीता सुगीता कर्तव्या (Pages 49–58)',
    english: 'The Gita Should Be Well-Studied and Practiced',
    icon: '🕉️',
    category: 'shlokas',
    genreBadge: 'श्रीमद्भगवद्गीता · Spiritual Wisdom',
    theme: 'Foundational teachings of the Bhagavad Gita: steady intellect (Sthitadhi), sense restraint, selfless action, holy speech, and mastery over anger.',
    grammarFocus: 'तव्यत्-प्रत्ययः (कर्तव्या), क्तवतु-प्रत्ययः, विसर्ग-उत्व-पूर्वरूप-सन्धयः',
  },
  {
    id: 'grade8_ch6',
    num: 'Grade 8 · Chapter 6',
    title: 'डिजिभारतम् – युगपरिवर्तनम् (Pages 61–66)',
    english: 'Digital India – An Epochal Transformation',
    icon: '💻',
    category: 'dialogue',
    genreBadge: 'विज्ञान-प्रौद्योगिकी · Modern Era',
    theme: 'India\'s digital revolution: from oral Shruti and palm leaves to modern computers, smartphones, cashless transactions, and green paperless living.',
    grammarFocus: 'कर्मवाच्य-प्रयोगाः (पठ्यते, लिख्यते, कृत्यन्ते), ल्युट्-प्रत्ययः, पारिभाषिक-शब्दाः',
  },
  {
    id: 'grade8_ch7',
    num: 'Grade 8 · Chapter 7',
    title: 'मञ्जुलमञ्जूषा सुन्दरसुरभाषा (Pages 75–83)',
    english: 'The Charming Treasury of the Divine Sanskrit Language',
    icon: '💎',
    category: 'shlokas',
    genreBadge: 'काव्यम् · Linguistic Glory',
    theme: 'Sanskrit Day celebration, Valmiki-Vyasa-Kalidasa-Bana literature, nine rasas, and scientific heritage.',
    grammarFocus: 'सन्धयः, समास-परिचयः (तत्पुरुष, कर्मधारय), नवरसाः, सम्बोधन-रूपाणि',
  },
  {
    id: 'grade8_ch8',
    num: 'Grade 8 · Chapter 8',
    title: 'पश्यत कोणमैशान्यं भारतस्य मनोहरम् (Pages 85–88)',
    english: 'Behold the Enchanting Northeast Corner of India',
    icon: '🏞️',
    category: 'dialogue',
    genreBadge: 'भूगोलः · Geography & Culture',
    theme: 'The Seven Sisters and Brother Sikkim, Barak-Brahmaputra rivers, tribal arts, and bamboo craftsmanship.',
    grammarFocus: 'प्रत्ययाः (तुमुन्, अनीयर्, ल्यप्, क्त), विशेषण-विशेष्य-सम्बन्धः, षष्ठी-विभक्तिः',
  },
  {
    id: 'grade8_ch9',
    num: 'Grade 8 · Chapter 9',
    title: 'कोऽरुक् ? कोऽरुक् ? कोऽरुक् ? (Pages 97–105)',
    english: 'Who is Free from Disease? (Ayurvedic Health Riddle)',
    icon: '🌿',
    category: 'dialogue',
    genreBadge: 'आयुर्वेदः · Holistic Health',
    theme: 'Lord Dhanvantari and Vagbhata: the threefold health axioms—Hitabhuk, Mitabhuk, Ritubhuk—and daily regimens.',
    grammarFocus: 'पूर्वरूप-सन्धिः (कोऽरुक् = कः + अरुक्), विशेषण-विशेष्य-मेलनम्, दिनचर्या-नियमाः',
  },
  {
    id: 'grade8_ch10',
    num: 'Grade 8 · Chapter 10',
    title: 'सन्निमित्ते वरं त्यागः (क-भागः) (Pages 111–122)',
    english: 'Better to Sacrifice for a Noble Cause (Part 1)',
    icon: '⚖️',
    category: 'stories',
    genreBadge: 'नीतिकथा · Noble Sacrifice',
    theme: 'Hitopadesha tale of prince Viravara: righteous fourfold division of salary, unmatched loyalty to King Shudraka, and encounter with weeping Rajalaxmi.',
    grammarFocus: 'अन्वय-रचना, भूतकालिक-प्रयोगाः (स्म, क्त, क्तवतु, लङ्), सन्धि-विच्छेदः, सर्वनामपदानि',
  },
  {
    id: 'grade8_ch11',
    num: 'Grade 8 · Chapter 11',
    title: 'सन्निमित्ते वरं त्यागः (ख-भागः) (Pages 124–135)',
    english: 'Better to Sacrifice for a Noble Cause (Part 2)',
    icon: '🕊️',
    category: 'stories',
    genreBadge: 'नीतिकथा · Supreme Sacrifice',
    theme: 'Viravara\'s family sacrifice at the temple of Sarvamangala, King Shudraka\'s boundless devotion to his servant, divine resurrection, and coronation over Karnataka.',
    grammarFocus: 'वाच्य-प्रकरणम् (कर्तृवाच्य, कर्मवाच्य, भाववाच्य), अकर्मक-सकर्मक-धातवः, सन्धिकार्यम्',
  },
  {
    id: 'grade8_ch12',
    num: 'Grade 8 · Chapter 12',
    title: 'सम्यग्वर्णप्रयोगेण ब्रह्मलोके महीयते (Pages 137–145)',
    english: 'Through Perfect Pronunciation One Attains Glory in Brahmaloka',
    icon: '🗣️',
    category: 'grammar',
    genreBadge: 'पाणिनीय-शिक्षा · Articulation & Reader Qualities',
    theme: 'Paniniya Shiksha principles: the Vritrasura/Indrashatru accent parable, maternal tigress grip metaphor, 6 attributes of ideal readers, and 6 flaws of poor readers.',
    grammarFocus: 'तृतीया-विभक्तिः (प्रयोगेण), कर्मणि-लट् (महीयते), वर्णोच्चारणम्, पाठकगुणाः, सन्धि-विच्छेदः',
  },
  {
    id: 'grade8_ch13',
    num: 'Grade 8 · Chapter 13',
    title: 'वर्णोच्चारण-शिक्षा १ (Pages 146–156)',
    english: 'Science of Sound Articulation 1 (Anatomy & Places)',
    icon: '🔤',
    category: 'grammar',
    genreBadge: 'ध्वनिविज्ञानम् · Places & Tools of Articulation',
    theme: 'Anatomy of voice production: 4 bodily systems (muscular, air-pressure, phonatory, articulatory), 6 places (स्थानम्) with flute-holes analogy, and active tools (करणम्) with playing-fingers analogy.',
    grammarFocus: 'ध्वनिविज्ञानम्, षडुच्चारणस्थानानि (कण्ठ, तालु, मूर्धा, दन्त, ओष्ठ, नासिका), करणम् (जिह्वा, स्वस्थानकरणम्)',
  },
  {
    id: 'grade8_app1',
    num: 'Grade 8 · Appendix 1',
    title: 'परिशिष्टम् १: व्याकरणम् (Pages 159–165)',
    english: 'Comprehensive Grammar (Prefixes, Suffixes, Cases & Sandhi)',
    icon: '📐',
    category: 'grammar',
    genreBadge: 'व्याकरणम् · Prefixes, Suffixes & Cases',
    theme: 'Foundational Paninian grammar: 22 Upasargas with meaning shifts, Krit suffixes (ktva, lyap, tumun, ktavatu past participle), 6 Karakas, Upapada case rules, and vowel/consonant Sandhis.',
    grammarFocus: 'उपसर्गाः (२२), क्त्वा, ल्यप्, तुमुन्, क्तवतु (त्रिषु लिङ्गेषु), षट् कारकाणि, उपपद-विभक्तयः, अयादि-पूर्वरूप-व्यञ्जन-सन्धयः',
  },
  {
    id: 'grade9_prarthana',
    num: 'Grade 9 · मङ्गलाचरणम्',
    title: 'मङ्गलाचरणम् (प्रार्थना)',
    english: 'Auspicious Vedic Invocation (Rigveda 10.191 Concord Mantras)',
    icon: '🕉️',
    category: 'shlokas',
    genreBadge: 'प्रार्थना · Rigveda Samvad',
    theme: 'Sangachhadhvam mantras fostering universal unity, common purpose, harmonized hearts, and concord across all people.',
    grammarFocus: 'ऋग्वेदमन्त्राः, लोट्-लकारः (सङ्गच्छध्वम्, संवदध्वम्), समान-विभक्ति-प्रयोगाः (समानम्, समानेन)',
  },
  {
    id: 'grade9_ch1',
    num: 'Grade 9 · Chapter 1',
    title: 'अहं वृक्षः अस्मि (Pages 1–8)',
    english: 'I am a Tree (Autobiography of a Tree)',
    icon: '🌳',
    category: 'stories',
    genreBadge: 'आत्मकथा · Ecological Heritage',
    theme: 'The life journey of a tree: selfless service, universal shelter, shade, oxygen, and environmental guardianship.',
    grammarFocus: 'उत्तमपुरुष-प्रयोगाः (अस्मि, यच्छामि), ल्यप्/तुमुन् प्रत्ययाः, विशेषण-विशेष्य-सम्बन्धः',
  },
  {
    id: 'grade9_ch2',
    num: 'Grade 9 · Chapter 2',
    title: 'सुखस्य मूलं धर्मः, धर्मस्य मूलम् अर्थः (Pages 9–18)',
    english: 'Righteousness is the Root of Happiness; Wealth is the Root of Righteousness',
    icon: '⚖️',
    category: 'dialogue',
    genreBadge: 'नीतिशास्त्रम् · Arthashastra & Ethics',
    theme: 'Kautilya Arthashastra and Upanishadic wisdom on ethical wealth creation, purity of livelihood, and disciplined conduct.',
    grammarFocus: 'षष्ठी-विभक्तिः (सुखस्य, धर्मस्य), कर्मधारय-समासः, सूक्ति-सङ्ग्रहः, अव्ययपदानि',
  },
  {
    id: 'grade9_ch3',
    num: 'Grade 9 · Chapter 3',
    title: 'आत्मवत्सर्वभूतेषु यः पश्यति सः पण्डितः (Pages 19–30)',
    english: 'He Who Sees All Beings as Himself is Truly Wise',
    icon: '🪷',
    category: 'stories',
    genreBadge: 'महात्मा-चरितम् · Compassion & Universal Empathy',
    theme: 'Sant Namdev, compassion towards animals and all creatures, and realizing the divine presence in every living being.',
    grammarFocus: 'सप्तमी-विभक्तिः (सर्वभूतेषु), यत्-तत् प्रयोगाः (यः... सः), कृदन्त-रूपाणि (दृष्ट्वा, गत्वा), अन्वय-रचना',
  },
];

interface FeatureTrialCalloutProps {
  badge?: string;
  title: string;
  subtitle: string;
  perks: string[];
  buttonText?: string;
  onAction?: () => void;
  accent?: 'emerald' | 'amber' | 'terracotta' | 'indigo' | 'slate';
  planStatus?: 'trial' | 'active' | 'expired' | null;
}

const FeatureTrialCallout: React.FC<FeatureTrialCalloutProps> = ({
  badge = '🎁 14-DAY FULL ACCESS TRIAL',
  title,
  subtitle,
  perks,
  buttonText,
  onAction,
  accent = 'emerald',
  planStatus,
}) => {
  const displayBadge = planStatus === 'active'
    ? '⭐ FULL ACCESS ACTIVE'
    : planStatus === 'trial'
      ? '🎁 14-DAY TRIAL ACTIVE'
      : badge;

  const displayButtonText = buttonText || (
    planStatus === 'active'
      ? 'Explore Curriculum ➔'
      : planStatus === 'trial'
        ? 'Continue Learning ➔'
        : 'Start 14-Day Free Access ➔'
  );

  return (
    <div className={`home-feature-trial-callout home-ftc--${accent}`} role="region" aria-label={title}>
      <div className="home-ftc-left">
        <div className="home-ftc-badge-row">
          <span className="home-ftc-badge">{displayBadge}</span>
          <span className="home-ftc-zero-risk">
            {planStatus === 'active'
              ? 'Unrestricted Gurukul access enabled'
              : planStatus === 'trial'
                ? 'Your free trial is currently active'
                : 'No credit card required · Instant online access'}
          </span>
        </div>
        <h3 className="home-ftc-title">{title}</h3>
        <p className="home-ftc-desc">{subtitle}</p>
        <div className="home-ftc-perks">
          {perks.map((perk, idx) => (
            <span key={idx} className="home-ftc-perk-item">
              <span className="home-ftc-check" aria-hidden="true">✓</span> {perk}
            </span>
          ))}
        </div>
      </div>
      <div className="home-ftc-right">
        <button
          type="button"
          className="home-ftc-btn"
          onClick={onAction}
          title={title}
        >
          <span>{displayButtonText}</span>
        </button>
        <span className="home-ftc-reassurance">
          {planStatus === 'active' || planStatus === 'trial'
            ? 'All NCERT texts & tools unlocked'
            : 'Zero risk · Cancel anytime · No auto-debit'}
        </span>
      </div>
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({
  onOpenReader,
  onOpenBoard,
  onOpenVarnamala,
  onOpenGrammar,
  onOpenVedicMaths,
  onOpenPhilosophy,
  onOpenCbseGuide,
  onOpenOnlineClasses,
  onOpenQuiz,
  onOpenWorksheets,
  onOpenDhatupatha,
  onOpenBodhi,
  onOpenSearch,
  onOpenResources,
  onOpenCourse,
  onOpenScienceLab,
  onOpenRegister,
  onOpenCertificate,
}) => {
  const [selectedDemo, setSelectedDemo] = useState<DemoWord>(DEMO_WORDS[0]);
  const [curriculumCategory, setCurriculumCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { isAdminLoggedIn, currentUser, openAuthModal } = useAuthStore();
  const canReadAllChapters = canAccessAllChapters(currentUser, isAdminLoggedIn);

  const handleStartTrial = useCallback(() => {
    if (currentUser?.planStatus === 'active' || currentUser?.planStatus === 'trial') {
      onOpenReader('gsde101');
    } else if (onOpenRegister) {
      onOpenRegister();
    } else {
      openAuthModal('register');
    }
  }, [currentUser, onOpenReader, onOpenRegister, openAuthModal]);
  const { englishFirst, toggleEnglishFirst } = useAccessibilityStore();
  const [isGrade7ModalOpen, setIsGrade7ModalOpen] = useState<boolean>(false);
  const [isGrade8ModalOpen, setIsGrade8ModalOpen] = useState<boolean>(false);
  const [isGrade9ModalOpen, setIsGrade9ModalOpen] = useState<boolean>(false);
  const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState<boolean>(false);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'all' | '7' | '8' | '9'>('all');
  const [isLogoArrived, setIsLogoArrived] = useState<boolean>(false);
  const [showEntranceIntro, setShowEntranceIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const alreadySeen = sessionStorage.getItem('ednet_gurukul_intro_seen');
      return !alreadySeen;
    } catch {
      return false;
    }
  });

  const handleIntroComplete = useCallback(() => {
    setShowEntranceIntro(false);
    setIsLogoArrived(true);
    setTimeout(() => {
      setIsLogoArrived(false);
    }, 1200);
    try {
      sessionStorage.setItem('ednet_gurukul_intro_seen', 'true');
    } catch {}
  }, []);

  const visibleChapters = CHAPTERS_INFO.filter(
    (ch) => canReadAllChapters || isFreeTrialOpenLesson(ch.id) || (!ch.id.startsWith('grade8_') && !ch.id.startsWith('grade9_'))
  );

  const categories = [
    { id: 'all', label: 'All Content', count: visibleChapters.length },
    { id: 'stories', label: '📖 Stories & Fables', count: visibleChapters.filter((c) => c.category === 'stories').length },
    { id: 'shlokas', label: '📜 Shlokas & Wisdom', count: visibleChapters.filter((c) => c.category === 'shlokas').length },
    { id: 'dialogue', label: '💬 Dialogues & Culture', count: visibleChapters.filter((c) => c.category === 'dialogue').length },
    { id: 'grammar', label: '📐 Grammar Reference', count: visibleChapters.filter((c) => c.category === 'grammar').length },
  ];

  const filteredChapters = visibleChapters.filter((ch) => {
    const matchesCategory = curriculumCategory === 'all' || ch.category === curriculumCategory;
    const matchesGrade =
      selectedGradeFilter === 'all' ||
      (selectedGradeFilter === '7' && !ch.id.startsWith('grade8_') && !ch.id.startsWith('grade9_')) ||
      (selectedGradeFilter === '8' && ch.id.startsWith('grade8_')) ||
      (selectedGradeFilter === '9' && ch.id.startsWith('grade9_'));

    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory && matchesGrade;

    const matchesSearch =
      ch.title.toLowerCase().includes(query) ||
      ch.english.toLowerCase().includes(query) ||
      ch.num.toLowerCase().includes(query) ||
      (ch.theme ? ch.theme.toLowerCase().includes(query) : false) ||
      (ch.grammarFocus ? ch.grammarFocus.toLowerCase().includes(query) : false) ||
      (ch.genreBadge ? ch.genreBadge.toLowerCase().includes(query) : false);

    return matchesCategory && matchesGrade && matchesSearch;
  });

  const openGrade7Syllabus = () => {
    setIsGrade7ModalOpen(true);
  };

  const openGrade8Syllabus = () => {
    setIsGrade8ModalOpen(true);
  };

  const openGrade9Syllabus = () => {
    setIsGrade9ModalOpen(true);
  };

  const handleDemoClick = (demo: DemoWord) => {
    setSelectedDemo(demo);
    playPronunciation(demo.devanagari);
  };

  const [activeSubhashitaIdx, setActiveSubhashitaIdx] = useState<number>(0);
  const [activeSpokenIdx, setActiveSpokenIdx] = useState<number>(0);
  const [activeWordIdx, setActiveWordIdx] = useState<number | null>(null);
  const [isChantingSubhashita, setIsChantingSubhashita] = useState<boolean>(false);
  const [isChantingMangalam, setIsChantingMangalam] = useState<boolean>(false);

  const stopMangalamRef = useRef<(() => void) | null>(null);
  const stopSubhashitaRef = useRef<(() => void) | null>(null);

  const currentSubhashita = SUBHASHITAS[activeSubhashitaIdx];
  const currentSpoken = SPOKEN_PHRASES[activeSpokenIdx];

  // Clean up any active recitation timers or synthesis on unmount
  useEffect(() => {
    return () => {
      if (stopMangalamRef.current) stopMangalamRef.current();
      if (stopSubhashitaRef.current) stopSubhashitaRef.current();
      stopPronunciation();
    };
  }, []);

  const handleNextSubhashita = () => {
    if (stopSubhashitaRef.current) stopSubhashitaRef.current();
    stopPronunciation();
    setIsChantingSubhashita(false);
    setActiveSubhashitaIdx((prev) => (prev + 1) % SUBHASHITAS.length);
    setActiveWordIdx(null);
  };

  const handleReciteSubhashita = () => {
    if (isChantingSubhashita) {
      if (stopSubhashitaRef.current) stopSubhashitaRef.current();
      stopPronunciation();
      setIsChantingSubhashita(false);
      return;
    }

    if (stopMangalamRef.current) stopMangalamRef.current();
    setIsChantingMangalam(false);

    setIsChantingSubhashita(true);
    // Break into rhythmic half-verses for proper Vedic meter and breath
    const cleanL1 = currentSubhashita.line1.replace(/[।॥]/g, '').trim();
    const cleanL2 = currentSubhashita.line2.replace(/[।॥]/g, '').trim();

    stopSubhashitaRef.current = playSequence([cleanL1, cleanL2], {
      gapMs: 1000, // natural poetic pause between lines
      plainDevanagari: true,
      rate: 0.70, // Calm, slow shloka meter
      onDone: () => {
        setIsChantingSubhashita(false);
        stopSubhashitaRef.current = null;
      },
    });
  };

  const handleNextSpoken = () => {
    setActiveSpokenIdx((prev) => (prev + 1) % SPOKEN_PHRASES.length);
  };

  const handlePlaySpoken = () => {
    playPronunciation(currentSpoken.audioText, { plainDevanagari: true, rate: 0.75 });
  };

  const handlePlaySubhashitaWord = (wordObj: SubhashitaWord, idx: number) => {
    setActiveWordIdx(idx);
    playPronunciation(wordObj.sa, { plainDevanagari: true, rate: 0.72 });
  };

  const handleReciteMangalam = () => {
    if (isChantingMangalam) {
      if (stopMangalamRef.current) stopMangalamRef.current();
      stopPronunciation();
      setIsChantingMangalam(false);
      return;
    }

    if (stopSubhashitaRef.current) stopSubhashitaRef.current();
    setIsChantingSubhashita(false);

    setIsChantingMangalam(true);
    // Meditative, quarter-by-quarter slow chanting with respectful pauses and clear articulation
    const verses = [
      'ओम्',
      'असतो मा सद्गमय',
      'तमसो मा ज्योतिर्गमय',
      'मृत्योर्मा, अमृतम् गमय',
      'ओम् शान्तिः शान्तिः शान्तिः',
    ];

    stopMangalamRef.current = playSequence(verses, {
      gapMs: 850, // peaceful breath pause between pādas
      plainDevanagari: true,
      rate: 0.68, // Slow, meditative, sacred chant pace
      onDone: () => {
        setIsChantingMangalam(false);
        stopMangalamRef.current = null;
      },
    });
  };

  return (
    <>
      {showEntranceIntro && (
        <GurukulEntranceIntro
          onComplete={handleIntroComplete}
          targetLogoId="home-hero-crest-logo"
          autoAdvanceMs={8500}
        />
      )}
      <div className="homepage-container">
        {englishFirst && (
          <div className="a11y-parent-guide-banner" role="region" aria-label="Parent and Beginner Mode Active">
            <div className="a11y-parent-guide-icon" aria-hidden="true">👨‍👩‍👧‍👦</div>
            <div className="a11y-parent-guide-content">
              <strong>English-First (Beginner &amp; Parent) Mode Active:</strong>
              <span> Core learning areas, verb conjugations, and syllabus chapters prioritize intuitive English names and layman glosses first, with classical Devanagari script displayed as secondary subtitles.</span>
            </div>
            <button
              type="button"
              className="a11y-parent-guide-toggle-btn"
              onClick={toggleEnglishFirst}
              title="Switch back to Sanskrit-First"
            >
              Switch to Sanskrit-First
            </button>
          </div>
        )}
        {/* ------------------------------------------------------------------
            Hero Section
            ------------------------------------------------------------------ */}
        <section className="home-hero">
          {/* Gurukul Official Brand Crest */}
          <div className="home-hero-crest">
            <img
              id="home-hero-crest-logo"
              src="/logo.jpg"
              alt="EdNet Gurukul - Learn Sanskrit Online &amp; Vedic Mathematics"
              className={`home-hero-logo${isLogoArrived ? ' is-arrived' : ''}`}
              width={76}
              height={76}
              onClick={() => setShowEntranceIntro(true)}
              title="EdNet Gurukul"
              style={{ cursor: 'pointer' }}
            />
          </div>

        {/* 1. Who It Is For (Audience Callout) */}
        <div className="home-hero-audience-banner" role="note" aria-label="Target Audience">
          <span className="home-hero-audience-tag">
            <span aria-hidden="true">🎯</span>
            <strong>{englishFirst ? 'WHO IT IS FOR' : 'लक्ष्य-वर्गः · WHO IT IS FOR'}</strong>
          </span>
          <span className="home-hero-audience-text">
            {englishFirst
              ? 'CBSE & NCERT Students (Classes 6–10) · Complete Beginners · Parents & Adult Learners'
              : 'CBSE एवं NCERT छात्राः (कक्षा ६–१०) · प्रारम्भिकाः · अभिभावकाः स्वाध्यायिनश्च'}
          </span>
        </div>

        <div className="home-hero-badge">
          <span>🕉️</span>
          <span className="home-hero-badge-sanskrit">
            सरस्वति नमस्तुभ्यं वरदे कामरूपिणि
          </span>
        </div>

        {/* 2. Main Outcome & Core Promise */}
        <h1 className="home-hero-title">
          <span className="home-hero-title-primary">
            {englishFirst ? 'Master Sanskrit Step by Step' : 'सरल-संस्कृत-प्रवेशः · Master Sanskrit'}
          </span>
          <p className="home-hero-main-outcome">
            {englishFirst
              ? 'Go from alphabet basics to confident speaking, Pāṇinian grammar mastery, and top CBSE exam scores—with line-by-line audio and 6,000+ interactive practice puzzles.'
              : 'वर्णमालातः आरभ्य संभाषणम्, पाणिनीय-व्याकरणम्, NCERT-दीपकं तथा CBSE-परीक्षा-सिद्धिम् अधिगच्छन्तु—ध्वनि-सहितम् अभ्यास-साधनैश्च।'}
          </p>
          <div className="home-hero-outcomes-strip" aria-label="Key Outcomes">
            <span className="home-hero-outcome-item">
              <span className="hhoi-icon" aria-hidden="true">🔊</span>
              <span>{englishFirst ? 'Native Pronunciation Audio' : 'शुद्धोच्चारण-ध्वनिः'}</span>
            </span>
            <span className="home-hero-outcome-sep" aria-hidden="true">•</span>
            <span className="home-hero-outcome-item">
              <span className="hhoi-icon" aria-hidden="true">📖</span>
              <span>{englishFirst ? 'NCERT Deepakam & CBSE Support' : 'NCERT दीपकम् & CBSE'}</span>
            </span>
            <span className="home-hero-outcome-sep" aria-hidden="true">•</span>
            <span className="home-hero-outcome-item">
              <span className="hhoi-icon" aria-hidden="true">🌿</span>
              <span>{englishFirst ? 'Pāṇinian Dhātupāṭha Engine' : 'पाणिनीय-धातुपाठः'}</span>
            </span>
            <span className="home-hero-outcome-sep" aria-hidden="true">•</span>
            <span className="home-hero-outcome-item">
              <span className="hhoi-icon" aria-hidden="true">📐</span>
              <span>{englishFirst ? '16 Vedic Math Sutras' : '१६ वैदिक-सूत्राणि'}</span>
            </span>
          </div>
        </h1>

        {/* 3. The 3 Primary High-Conversion Calls to Action */}
        <div className="home-hero-three-actions" role="region" aria-label="Primary Actions">
          {/* Action 1: Start Free Lesson */}
          <button
            type="button"
            className="home-hero-action-card home-hero-action-card--lesson"
            onClick={() => {
              const el = document.getElementById('proof-of-quality');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onOpenReader('gsde101');
            }}
            title="Start your first free interactive lesson with audio and word analyzer (No sign-up required)"
          >
            <div className="hhac-icon-col" aria-hidden="true">
              <span className="hhac-icon">🚀</span>
            </div>
            <div className="hhac-text-col">
              <div className="hhac-badge-row">
                <span className="hhac-tag hhac-tag--lesson">Instant · No Signup</span>
              </div>
              <strong className="hhac-title">Start Free Lesson</strong>
              <span className="hhac-desc">
                Begin learning in 5 minutes with audio &amp; word tools
              </span>
            </div>
            <span className="hhac-arrow" aria-hidden="true">➔</span>
          </button>

          {/* Action 2: Take Sanskrit Placement Test */}
          <button
            type="button"
            className="home-hero-action-card home-hero-action-card--placement"
            onClick={() => {
              if (onOpenQuiz) onOpenQuiz();
              else {
                const el = document.getElementById('courses');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            title="Assess your Sanskrit knowledge in 3 minutes to find your starting level"
          >
            <div className="hhac-icon-col" aria-hidden="true">
              <span className="hhac-icon">🎯</span>
            </div>
            <div className="hhac-text-col">
              <div className="hhac-badge-row">
                <span className="hhac-tag hhac-tag--placement">3-Min Diagnostic</span>
              </div>
              <strong className="hhac-title">Take Sanskrit Placement Test</strong>
              <span className="hhac-desc">
                Find your level: Alphabet, Words, or CBSE
              </span>
            </div>
            <span className="hhac-arrow" aria-hidden="true">➔</span>
          </button>

          {/* Action 3: Begin in 5 Minutes (14-Day Free Access) */}
          <button
            type="button"
            className="home-hero-action-card home-hero-action-card--trial"
            onClick={handleStartTrial}
            title={currentUser?.planStatus ? 'Continue to your Gurukul lessons' : 'Begin learning in 5 minutes with full 14-day unrestricted access'}
          >
            <div className="hhac-icon-col" aria-hidden="true">
              <span className="hhac-icon">⚡</span>
            </div>
            <div className="hhac-text-col">
              <div className="hhac-badge-row">
                <span className="hhac-tag hhac-tag--trial">
                  {currentUser?.planStatus === 'active'
                    ? 'Active'
                    : currentUser?.planStatus === 'trial'
                      ? 'Trial Active'
                      : '14-Day Free Access'}
                </span>
              </div>
              <strong className="hhac-title">
                {currentUser?.planStatus ? 'Continue Learning' : 'Begin Learning in 5 Minutes'}
              </strong>
              <span className="hhac-desc">
                {currentUser?.planStatus
                  ? 'Jump back into your curriculum'
                  : 'Unlock all 6 stages · No credit card required'}
              </span>
            </div>
            <span className="hhac-arrow" aria-hidden="true">➔</span>
          </button>
        </div>

        {/* Trust Badges & Contact (WhatsApp + Email) */}
        <div className="home-hero-trust-bar">
          <span className="hhtb-item"><span>✓</span> 100% Free for 14 Days</span>
          <span className="hhtb-item"><span>✓</span> No Credit Card / Auto-Debit</span>
          <span className="hhtb-item"><span>✓</span> Instant Online Activation</span>
          <div className="hhtb-contact-group">
            <span className="hhtb-contact-label">Contact :</span>
            <a
              href="https://wa.me/919000335468?text=Hello%20EdNet%20Gurukul%2C%20I%20have%20a%20question%20about%20Sanskrit%20learning"
              target="_blank"
              rel="noopener noreferrer"
              className="hhtb-item hhtb-whatsapp"
              title="Message on WhatsApp: 9000335468 (Only WhatsApp)"
            >
              <span aria-hidden="true">💬</span> Message at (9000335468) <span className="hhtb-wa-only">(Only WhatsApp)</span>
            </a>
            <span className="hhtb-contact-or">or</span>
            <a
              href="mailto:admin@ednetlearn.in"
              className="hhtb-item hhtb-email"
              title="Email: admin@ednetlearn.in"
            >
              <span aria-hidden="true">✉️</span> Email : admin@ednetlearn.in
            </a>
          </div>
        </div>

        {onOpenSearch && (
          <div
            className="home-hero-search-box"
            onClick={onOpenSearch}
            role="button"
            tabIndex={0}
            title={getSearchShortcut().searchTitle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenSearch();
              }
            }}
          >
            <span className="home-hero-search-icon" aria-hidden="true">🔍</span>
            <span className="home-hero-search-text">Search articles, lessons, 16 Vedic Sutras, Kaṭapayādi, Vibhakti...</span>
            <kbd className="home-hero-search-badge">{getSearchShortcut().searchBadge}</kbd>
          </div>
        )}

        {/* ================================================================
            VISIBLE LEARNER JOURNEY: 6-STEP PROGRESSION
            Alphabet → Basic words → Simple sentences → Grammar → NCERT texts → Exam readiness
            ================================================================ */}
        <div className="home-learner-journey" role="region" aria-label="Sanskrit Learning Progression Journey">
          <div className="home-journey-header">
            <div className="home-journey-eyebrow">
              <span>🛣️</span>
              <span>The Gurukul Learning Pathway · सोपान-मार्गः</span>
            </div>
            <h2 className="home-journey-title">
              Your Step-by-Step Sanskrit Journey · Measurable Outcomes
            </h2>
            <p className="home-journey-subtitle">
              A visible 6-stage roadmap designed for school students, parents, and beginners to achieve tangible outcomes at every milestone:
            </p>
          </div>

          <div className="home-journey-steps">
            {/* Step 1: Alphabet */}
            <div
              className="home-journey-step-card"
              onClick={onOpenVarnamala}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpenVarnamala?.();
              }}
              title="Step 1: Read letters and 400+ syllables with guided audio practice in 7 days"
            >
              <span className="home-journey-step-num">Step 1</span>
              <span className="home-journey-step-icon" aria-hidden="true">🌱</span>
              <h3 className="home-journey-step-title">Alphabet</h3>
              <span className="home-journey-step-sanskrit">वर्णमाला</span>
              <p className="home-journey-step-desc">
                Read letters and 400+ syllables with authentic native audio in 7 days.
              </p>
              <span className="home-journey-step-cta">Start Sounds →</span>
            </div>

            <div className="home-journey-arrow" aria-hidden="true">→</div>

            {/* Step 2: Basic words */}
            <div
              className="home-journey-step-card"
              onClick={onOpenBoard}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpenBoard?.();
              }}
              title="Step 2: Build 6,000+ words playfully with interactive tile puzzles"
            >
              <span className="home-journey-step-num">Step 2</span>
              <span className="home-journey-step-icon" aria-hidden="true">🧩</span>
              <h3 className="home-journey-step-title">Basic Words</h3>
              <span className="home-journey-step-sanskrit">शब्दाः · जोडो</span>
              <p className="home-journey-step-desc">
                Build 6,000+ practical words through interactive tile puzzles.
              </p>
              <span className="home-journey-step-cta">Build Words →</span>
            </div>

            <div className="home-journey-arrow" aria-hidden="true">→</div>

            {/* Step 3: Simple sentences */}
            <div
              className="home-journey-step-card"
              onClick={() => onOpenReader('gsde101')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpenReader('gsde101');
              }}
              title="Step 3: Speak everyday conversational sentences with correct word order"
            >
              <span className="home-journey-step-num">Step 3</span>
              <span className="home-journey-step-icon" aria-hidden="true">💬</span>
              <h3 className="home-journey-step-title">Simple Sentences</h3>
              <span className="home-journey-step-sanskrit">सरल-वाक्यानि</span>
              <p className="home-journey-step-desc">
                Speak everyday conversational sentences with correct word order.
              </p>
              <span className="home-journey-step-cta">Speak Phrases →</span>
            </div>

            <div className="home-journey-arrow" aria-hidden="true">→</div>

            {/* Step 4: Grammar */}
            <div
              className="home-journey-step-card"
              onClick={onOpenGrammar}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpenGrammar?.();
              }}
              title="Step 4: Master all 7 case endings (Vibhaktis) & verb forms without rote fear"
            >
              <span className="home-journey-step-num">Step 4</span>
              <span className="home-journey-step-icon" aria-hidden="true">🌿</span>
              <h3 className="home-journey-step-title">Grammar</h3>
              <span className="home-journey-step-sanskrit">व्याकरणम् · धातुपाठः</span>
              <p className="home-journey-step-desc">
                Master all 7 case endings (Vibhaktis) &amp; verb roots without rote fear.
              </p>
              <span className="home-journey-step-cta">Master Rules →</span>
            </div>

            <div className="home-journey-arrow" aria-hidden="true">→</div>

            {/* Step 5: NCERT texts */}
            <div
              className="home-journey-step-card"
              onClick={() => onOpenReader()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpenReader();
              }}
              title="Step 5: Understand original NCERT chapters with 1-tap word meanings"
            >
              <span className="home-journey-step-num">Step 5</span>
              <span className="home-journey-step-icon" aria-hidden="true">📖</span>
              <h3 className="home-journey-step-title">NCERT Texts</h3>
              <span className="home-journey-step-sanskrit">दीपकम् · शारदा</span>
              <p className="home-journey-step-desc">
                Read authentic stories and shlokas with instant word-by-word meanings.
              </p>
              <span className="home-journey-step-cta">Read Texts →</span>
            </div>

            <div className="home-journey-arrow" aria-hidden="true">→</div>

            {/* Step 6: Exam readiness */}
            <div
              className="home-journey-step-card"
              onClick={onOpenCbseGuide}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpenCbseGuide?.();
              }}
              title="Step 6: Score 95%+ in school & CBSE exams with solved blueprints and mock tests"
            >
              <span className="home-journey-step-num">Step 6</span>
              <span className="home-journey-step-icon" aria-hidden="true">🎯</span>
              <h3 className="home-journey-step-title">Exam Readiness</h3>
              <span className="home-journey-step-sanskrit">परीक्षा-सिद्धिः</span>
              <p className="home-journey-step-desc">
                Score 95%+ in school &amp; CBSE exams with solved blueprints and mock tests.
              </p>
              <span className="home-journey-step-cta">Ace Exams →</span>
            </div>
          </div>
        </div>

        {/* ================================================================
            FREE TRIAL CALLOUT 1: AFTER LEARNER JOURNEY ROADMAP
            ================================================================ */}
        <FeatureTrialCallout
          badge="🎁 6-STEP PROGRESSION UNLOCKED"
          title="Experience Every Step of the Sanskrit Journey Free"
          subtitle="From Alphabet & 400+ Syllables to full NCERT Deepakam, Pāṇinian grammar rules, and 80-mark CBSE exam prep. Test-drive all 6 milestones with 14 days of unrestricted access."
          perks={[
            'All 6 Progression Stages Unlocked',
            'Native Audio on Every Word & Verse',
            'No Credit Card · Instant Activation',
          ]}
          buttonText={currentUser?.planStatus ? 'Explore Progression ➔' : 'Start 14-Day Free Access ➔'}
          onAction={handleStartTrial}
          accent="emerald"
          planStatus={currentUser?.planStatus}
        />

        {/* ------------------------------------------------------------------
            Targeted Learning Pathways (Beginners, School Students, Scholars)
            ------------------------------------------------------------------ */}
        <SegmentedLearningPaths
          onOpenVarnamala={onOpenVarnamala}
          onOpenBoard={onOpenBoard}
          onOpenReader={onOpenReader}
          onOpenGrammar={onOpenGrammar}
          onOpenCbseGuide={onOpenCbseGuide}
          onOpenWorksheets={onOpenWorksheets}
          onOpenQuiz={onOpenQuiz}
          onOpenDhatupatha={onOpenDhatupatha}
          onOpenCourse={onOpenCourse}
          onOpenVedicMaths={onOpenVedicMaths}
          onOpenScienceLab={onOpenScienceLab ? () => onOpenScienceLab() : undefined}
        />

        {/* Sacred Mangalācaraṇam (मङ्गलाचरणम्) Invocation */}
        <div className="home-mangalacaranam-strip" role="region" aria-label="मङ्गलाचरणम् · Sacred Invocation">
          <div className="home-mangalacaranam-crest">
            <span className="home-mangalacaranam-om" aria-hidden="true">ॐ</span>
          </div>
          <div className="home-mangalacaranam-body">
            <div className="home-mangalacaranam-badge">
              <span>🪷 मङ्गलाचरणम्</span>
              <span className="home-mangalacaranam-sep">✦</span>
              <span>बृहदारण्यकोपनिषत् (Bṛhadāraṇyaka Upaniṣad 1.3.28)</span>
            </div>
            <div className="home-mangalacaranam-verse">
              ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥ ॐ शान्तिः शान्तिः शान्तिः ॥
            </div>
            <div className="home-mangalacaranam-translation">
              <em>Lead me from falsehood to truth, from darkness to divine light, from mortality to immortality.</em>
            </div>
          </div>
          <button
            type="button"
            className={`home-mangalacaranam-audio-btn${isChantingMangalam ? ' playing' : ''}`}
            onClick={handleReciteMangalam}
            title={isChantingMangalam ? 'Stop Chanting (विरामय)' : 'Recite Sacred Mangalācaraṇam at slow, peaceful pace (मङ्गलाचरण-श्रवणम्)'}
            aria-label={isChantingMangalam ? 'Stop chant' : 'Listen to Mangalācaraṇam chant'}
          >
            <span className="home-mangalacaranam-icon">{isChantingMangalam ? '⏹' : '🔔'}</span>
            <span className="home-mangalacaranam-btn-text">
              <strong>{isChantingMangalam ? 'विरामय (Stop)' : 'मङ्गलाचरणम्'}</strong>
              <small>{isChantingMangalam ? 'Chanting…' : 'Slow Chant · मन्द-पठनम्'}</small>
            </span>
          </button>
        </div>

        {/* Daily Spoken Sanskrit Bar (दैनिक-सम्भाषणम्) */}
        <div className="home-spoken-phrase-pill" role="region" aria-label="दैनिक-सम्भाषणम् · Daily Spoken Sanskrit">
          <div className="hsp-tag">
            <span>💬</span>
            <span>दैनिक-सम्भाषणम्</span>
          </div>
          <div className="hsp-content">
            <span className="hsp-sanskrit">{currentSpoken.sa}</span>
            <span className="hsp-translation">({currentSpoken.en})</span>
          </div>
          <div className="hsp-actions">
            <button
              type="button"
              className="hsp-audio-btn"
              onClick={handlePlaySpoken}
              title="Hear Pronunciation (उच्चारण-श्रवणम्)"
              aria-label={`Listen to ${currentSpoken.sa}`}
            >
              🔊
            </button>
            <button
              type="button"
              className="hsp-next-btn"
              onClick={handleNextSpoken}
              title="Next Spoken Phrase (अग्रिम-सम्भाषणम्)"
              aria-label="Next Spoken Phrase"
            >
              ↻ अन्यत्
            </button>
          </div>
        </div>

        {/* Featured Complete Course Banner: संस्कृत-चिन्तनम् */}
        {onOpenCourse && (
          <div
            className="home-course-feature-card"
            style={{
              marginTop: '1.75rem',
              background: 'linear-gradient(135deg, #134e4a 0%, #1e1b4b 100%)',
              borderRadius: '16px',
              padding: '1.5rem 1.75rem',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
              boxShadow: '0 8px 24px rgba(19, 78, 74, 0.25)',
              border: '1.5px solid rgba(254, 240, 138, 0.3)',
              cursor: 'pointer',
              textAlign: 'left',
            }}
            onClick={onOpenCourse}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                <span style={{ background: '#fef08a', color: '#713f12', padding: '0.15rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  Complete Course · 6 Modules
                </span>
                <span style={{ color: '#99f6e4', fontSize: '0.8rem', fontWeight: 700 }}>
                  All 28 Lessons · Audio · Interactive Drills
                </span>
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fef08a', margin: '0 0 0.35rem', fontFamily: 'Noto Sans Devanagari, serif' }}>
                संस्कृत-चिन्तनम् · Sanskrit as a Way of Thinking
              </h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#ccfbf1', lineHeight: 1.5, maxWidth: '44rem' }}>
                Sound as Input → Rules as Processing → Meaning as Output. 28 structured lessons with audio, rules, interactive drills, and bridges to the Scientific Mind (algorithms &amp; logic) and Contemplative Mind (recitation &amp; darśana).
              </p>
            </div>
            <button
              type="button"
              style={{
                background: '#f59e0b',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenCourse();
              }}
            >
              Start Course →
            </button>
          </div>
        )}

        {/* Vijñāna Lab banner: free science sandboxes with Sanskrit terms */}
        {onOpenScienceLab && <HomeLabBanner onOpen={onOpenScienceLab} />}

        {/* Live Platform Highlights */}
        <div className="home-stats-grid">
          <div className="home-stat-item">
            <span className="home-stat-val">{englishFirst ? '6,000+' : '६,०००+'}</span>
            <span className="home-stat-label">{englishFirst ? 'Word Puzzles (६,०००+)' : 'Word Puzzles (क्रीडाः)'}</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-val">{englishFirst ? '400+' : '४००+'}</span>
            <span className="home-stat-label">{englishFirst ? 'Audio Syllables (४००+)' : 'Audio Syllables (ध्वनयः)'}</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-val">{englishFirst ? '28' : '२८'}</span>
            <span className="home-stat-label">{englishFirst ? 'Course Lessons (२८)' : 'Course Lessons (पाठाः)'}</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-val">{englishFirst ? '17' : '१७'}</span>
            <span className="home-stat-label">{englishFirst ? 'Grammar Masterclasses (१७)' : 'Vyakaran Classes (वर्गाः)'}</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-val">{englishFirst ? '16' : '१६'}</span>
            <span className="home-stat-label">{englishFirst ? 'Vedic Math Sutras (१६)' : 'Vedic Math Sutras (सूत्राणि)'}</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-val">{englishFirst ? '40+' : '४०+'}</span>
            <span className="home-stat-label">{englishFirst ? 'NCERT Chapters (४०+)' : 'NCERT Chapters (अध्यायाः)'}</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Trust & Academic Standards Bar
          ------------------------------------------------------------------ */}
      <section className="home-trust-banner" aria-label="Academic Standards">
        <div className="home-trust-item">
          <span className="home-trust-icon">🌟</span>
          <div className="home-trust-text">
            <strong>सर्वजन-हितम् · For All Ages &amp; Levels</strong>
            <span>Beginners, adult self-learners, university scholars &amp; school students</span>
          </div>
        </div>
        <div className="home-trust-item">
          <span className="home-trust-icon">🎧</span>
          <div className="home-trust-text">
            <strong>शुद्धोच्चारणम् · Native Phonetic Speech</strong>
            <span>Alphabet, syllable &amp; shloka audio with authentic visarga echoes</span>
          </div>
        </div>
        <div className="home-trust-item">
          <span className="home-trust-icon">🏛️</span>
          <div className="home-trust-text">
            <strong>पाणिनीय-गम्भीरता · Classical Pāṇinian Depth</strong>
            <span>Dhātupāṭha verb engine, 7 Vibhaktis &amp; Śābdabodha semantic architecture</span>
          </div>
        </div>
        <div className="home-trust-item">
          <span className="home-trust-icon">🎒</span>
          <div className="home-trust-text">
            <strong>सीबीएसई-एनसीईआरटी · CBSE &amp; NEP Aligned</strong>
            <span>Full NCERT Deepakam &amp; Sharada curriculum (Classes 7–9) with exam preparation</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          दैनिक-सुभाषित-मञ्जरी (Daily Subhāṣita & Shloka Jewel)
          ------------------------------------------------------------------ */}
      <section className="home-subhashita-section" aria-label="दैनिक-सुभाषित-मञ्जरी · Daily Shloka Jewel">
        <div className="home-subhashita-card">
          <div className="hsub-header">
            <div className="hsub-badge-group">
              <span className="hsub-lotus" aria-hidden="true">🪷</span>
              <div>
                <span className="hsub-kicker">दैनिक-सुभाषित-मञ्जरी · Daily Shloka Jewel</span>
                <h2 className="hsub-title">{currentSubhashita.categorySa} · {currentSubhashita.categoryEn}</h2>
              </div>
            </div>
            <div className="hsub-header-actions">
              <span className="hsub-counter">
                सुभाषितम् {activeSubhashitaIdx + 1} / {SUBHASHITAS.length}
              </span>
              <button
                type="button"
                className="hsub-cycle-btn"
                onClick={handleNextSubhashita}
                title="Next Subhāṣita (अग्रिम-सुभाषितम्)"
              >
                <span>अग्रे सुभाषितम् ➔</span>
              </button>
            </div>
          </div>

          <div className="hsub-shloka-box">
            <div className="hsub-shloka-lines">
              <div className="hsub-line">{currentSubhashita.line1}</div>
              <div className="hsub-line">{currentSubhashita.line2}</div>
            </div>
            <div className="hsub-transliteration">
              {currentSubhashita.transliteration}
            </div>

            <div className="hsub-recite-row">
              <button
                type="button"
                className={`hsub-recite-btn${isChantingSubhashita ? ' chanting' : ''}`}
                onClick={handleReciteSubhashita}
                title={isChantingSubhashita ? 'Stop Recitation (विरामय)' : 'Hear Shloka Recitation at a slow, clear pace'}
                aria-label={isChantingSubhashita ? 'Stop recitation' : `Listen to ${currentSubhashita.line1}`}
              >
                <span aria-hidden="true">{isChantingSubhashita ? '⏹' : '🎶'}</span>
                <span>{isChantingSubhashita ? 'विरामय · Stop' : 'श्लोक-श्रवणम् · Slow Chant'}</span>
              </button>
              <span className="hsub-source-pill">
                📜 {currentSubhashita.source}
              </span>
            </div>
          </div>

          <div className="hsub-breakdown-section">
            <div className="hsub-breakdown-heading">
              <span>🌿 पदच्छेदः एवं प्रतिपदार्थः (Tap word to listen):</span>
            </div>
            <div className="hsub-word-chips">
              {currentSubhashita.words.map((w, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`hsub-word-chip${activeWordIdx === idx ? ' active' : ''}`}
                  onClick={() => handlePlaySubhashitaWord(w, idx)}
                  title={`Pronounce "${w.sa}" · Meaning: ${w.en}`}
                >
                  <span className="hsub-word-sa">{w.sa}</span>
                  <span className="hsub-word-en">{w.en}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hsub-meanings-grid">
            <div className="hsub-meaning-item">
              <strong className="hsub-meaning-label">🇬🇧 English Translation:</strong>
              <p className="hsub-meaning-text">{currentSubhashita.meaningEn}</p>
            </div>
            <div className="hsub-meaning-item">
              <strong className="hsub-meaning-label">🇮🇳 हिन्दी भावार्थः:</strong>
              <p className="hsub-meaning-text">{currentSubhashita.meaningHi}</p>
            </div>
          </div>

          <div className="hsub-fleuron" aria-hidden="true">
            <span>✦</span>
            <span>॥ ॐ तत्सत् ॥</span>
            <span>✦</span>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROOF OF QUALITY: EXPERIENCE BEFORE YOU SIGN UP
          Demo Lessons, Sample Audio, Word Analyzer UI, Complete Free Chapter 1
          ================================================================ */}
      <ProofOfQuality
        onOpenReader={onOpenReader}
        onOpenVarnamala={onOpenVarnamala}
        onOpenGrammar={onOpenGrammar}
        onOpenRegister={handleStartTrial}
      />

      {/* ------------------------------------------------------------------
          INTERACTIVE TOOL DEMOS: Dhātupāṭha Deconstructor & Jodo Tile Mini-Puzzle
          ------------------------------------------------------------------ */}
      <ToolInteractiveDemos
        onOpenDhatupatha={onOpenDhatupatha}
        onOpenBoard={onOpenBoard}
        onOpenGrammar={onOpenGrammar}
      />

      {/* ------------------------------------------------------------------
          Learning Pathways Section (5 Clear Learner Tracks)
          ------------------------------------------------------------------ */}
      <section id="courses" className="home-pathways-section" aria-label="Learning Pathways">
        <div className="home-section-header">
          <span className="home-section-tag">मार्गदर्शिका · Structured Tracks</span>
          <h2 className="home-section-title">अध्ययन-मार्गाः · Guided Learning Pathways</h2>
          <p className="home-section-subtitle">
            Whether you are learning your first Sanskrit syllable, researching Pāṇinian linguistics, computing mental math, or preparing for exams:
          </p>
        </div>

        <div className="home-pathways-grid">
          {/* Pathway 1: Beginner */}
          <div className="home-pathway-card">
            <div>
              <span className="home-pathway-badge home-pathway-badge--beginner">
                प्रारम्भिक-मार्गः · Beginner Track
              </span>
              <h3 className="home-pathway-title">🌱 Read Sanskrit Confidently in 7 Days</h3>
              <p className="home-pathway-desc">
                Learn to read Sanskrit letters, 400+ syllables, and essential starter vocabulary with guided native audio practice and mouth positions.
              </p>
            </div>
            <button
              type="button"
              className="home-pathway-btn"
              onClick={onOpenVarnamala}
            >
              वर्णमाला-अभ्यासः · Start with Alphabet ▶
            </button>
          </div>

          {/* Pathway 2: Sanskrit Thinking Course */}
          {onOpenCourse && (
            <div className="home-pathway-card" style={{ borderColor: '#c7d2fe' }}>
              <div>
                <span className="home-pathway-badge home-pathway-badge--course">
                  क्रमबद्ध-पाठ्यक्रमः · Structured Course
                </span>
                <h3 className="home-pathway-title">🧠 Think in Sanskrit &amp; Computational Logic</h3>
                <p className="home-pathway-desc">
                  Our flagship 6-module, 28-lesson program. Master Sanskrit through generative logic (Input ➔ Rules ➔ Meaning), bridging linguistics, computer science, and philosophical contemplation.
                </p>
              </div>
              <button
                type="button"
                className="home-pathway-btn"
                style={{ background: '#4338ca', color: '#ffffff', borderColor: '#4338ca' }}
                onClick={onOpenCourse}
              >
                पाठ्यक्रम-प्रवेशः · Explore 28-Lesson Course ▶
              </button>
            </div>
          )}

          {/* Pathway 3: Paninian Grammar & Dhatupatha */}
          <div className="home-pathway-card">
            <div>
              <span className="home-pathway-badge home-pathway-badge--grammar">
                पाणिनीय-व्याकरणम् · Pāṇinian Grammar
              </span>
              <h3 className="home-pathway-title">🌿 Master Cases &amp; Verb Roots Without Rote Fear</h3>
              <p className="home-pathway-desc">
                Deconstruct complex words to their roots in seconds, generate 5-lakāra verb tables with 1-tap audio, master all 7 Vibhaktis, and ace grammar questions.
              </p>
            </div>
            <button
              type="button"
              className="home-pathway-btn"
              onClick={onOpenDhatupatha || onOpenGrammar}
            >
              व्याकरण-मण्डलम् · Launch Dhātupāṭha &amp; Vyakaran ▶
            </button>
          </div>

          {/* Pathway 4: Vedic Mental Math */}
          {onOpenVedicMaths && (
            <div className="home-pathway-card">
              <div>
                <span className="home-pathway-badge home-pathway-badge--maths">
                  वेदाङ्ग-गणितम् · Speed Math &amp; Heritage
                </span>
                <h3 className="home-pathway-title">⚡ Solve Multi-Step Math in a Single Line</h3>
                <p className="home-pathway-desc">
                  Replace slow scratchpad calculations with 16 pattern-based Vedic sutras (Tirtha, 1965), cross-multiplication shortcuts, and instant digital-root verification.
                </p>
              </div>
              <button
                type="button"
                className="home-pathway-btn"
                style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#ffffff', borderColor: '#b45309' }}
                onClick={onOpenVedicMaths}
              >
                गणित-सूत्र-शिक्षणम् · Start Vaidic Gaṇitam ▶
              </button>
            </div>
          )}

          {/* Pathway 5: CBSE & NCERT School Track */}
          <div className="home-pathway-card">
            <div>
              <span className="home-pathway-badge home-pathway-badge--school">
                पाठ्यपुस्तक-क्रमः · NCERT Curriculum (Classes 7–9)
              </span>
              <h3 className="home-pathway-title">🎒 Understand Chapters Word-by-Word &amp; Score 95%+</h3>
              <p className="home-pathway-desc">
                Follow all Deepakam (Classes 7–8) and Sharada (Class 9) chapters with 1-tap word meanings, shloka anvaya, audio recitation, and solved 80-mark CBSE exam blueprints.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', margin: '0.65rem 0' }}>
                {NCERT_TEXTBOOKS.map((tb) => (
                  <div
                    key={tb.id}
                    title={`${tb.titleSa} · ${tb.classEn}`}
                    style={{
                      width: '40px',
                      height: '54px',
                      borderRadius: '5px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                      border: '1px solid #d4c5b2',
                      flexShrink: 0,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (tb.id === 'class7') onOpenReader('gsde101');
                      else if (tb.id === 'class8') onOpenReader('grade8_prarthana');
                      else onOpenReader('grade9_prarthana');
                    }}
                  >
                    <img
                      src={tb.coverUrl}
                      alt={tb.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="home-pathway-btn"
              onClick={() => onOpenReader('gsde101')}
            >
              एनसीईआरटी-वाचनम् · Start NCERT Reader ▶
            </button>
          </div>
        </div>
      </section>

      {/* ================================================================
          FREE TRIAL CALLOUT 2: AFTER LEARNING PATHWAYS
          ================================================================ */}
      <FeatureTrialCallout
        badge="🎁 ALL 4 PATHWAYS INCLUDED"
        title="Unlock All 4 Learning Pathways with Your Free Trial"
        subtitle="Beginner phonetics, NCERT Class 7–9 textbooks, Pāṇinian grammar conjugators, and 16 Vedic Mathematics sutras. Everything is 100% open for 14 days."
        perks={[
          'Deepakam 7 & 8 + Sharada 9',
          '6,000+ Jodo Tile Puzzles',
          '16 Vedic Sutras & Math Sandboxes',
        ]}
        buttonText={currentUser?.planStatus ? 'Explore All Pathways ➔' : 'Unlock All 4 Pathways Free ➔'}
        onAction={handleStartTrial}
        accent="amber"
        planStatus={currentUser?.planStatus}
      />

      {/* ------------------------------------------------------------------
          Live Interactive Word Demo Section
          ------------------------------------------------------------------ */}
      <section className="home-demo-section" aria-label="Interactive Word Demo">
        <div className="home-demo-header">
          <span className="home-section-tag" style={{ margin: '0 auto 0.45rem', display: 'inline-block' }}>
            पद-विश्लेषणम् · Lexicon Breakdown
          </span>
          <h2 className="home-demo-title">
            <span>✨</span> शब्द-विश्लेषणम् · Interactive Word Analyzer
          </h2>
          <p className="home-demo-desc">
            Tap any word below to experience instant pronunciation, syllable breakdown, and trilingual meanings:
          </p>
        </div>

        <div className="home-demo-chips">
          {DEMO_WORDS.map((item) => (
            <button
              key={item.devanagari}
              type="button"
              className={`home-demo-chip${selectedDemo.devanagari === item.devanagari ? ' active' : ''}`}
              onClick={() => handleDemoClick(item)}
            >
              <span className="home-demo-chip-icon">{item.icon}</span>
              <span>{item.devanagari}</span>
            </button>
          ))}
        </div>

        {selectedDemo && (
          <div className="home-demo-result-card">
            <div className="home-demo-word-info">
              <button
                type="button"
                className="home-demo-speaker-btn"
                onClick={() => playPronunciation(selectedDemo.devanagari)}
                title="Hear Pronunciation"
                aria-label={`Hear ${selectedDemo.devanagari}`}
              >
                🔊
              </button>
              <div>
                <span className="home-demo-devanagari">{selectedDemo.devanagari}</span>
                <span className="home-demo-translit">[{selectedDemo.transliteration}]</span>
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.35rem' }}>
                  {selectedDemo.syllables.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#f0e6d2',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#273b35',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="home-demo-meanings">
              <div className="home-demo-meaning-en">{selectedDemo.english}</div>
              <div className="home-demo-meaning-sub">
                <span>
                  <strong>संस्कृतम्:</strong> {selectedDemo.sanskrit}
                </span>
                <span>
                  <strong>हिन्दी:</strong> {selectedDemo.hindi}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="home-demo-action-btn"
              onClick={() => onOpenReader('gsde101')}
            >
              Explore in Reader ▶
            </button>
          </div>
        )}
      </section>

      {/* ================================================================
          FREE TRIAL CALLOUT 3: AFTER WORD ANALYZER & JODO DEMO
          ================================================================ */}
      <FeatureTrialCallout
        badge="🎁 6,000+ SANSKRIT WORDS & TILES"
        title="Deconstruct Any Sanskrit Word with Native Audio & Sandhi Rules"
        subtitle="Master vocabulary with trilingual meanings, syllable-by-syllable audio breakdown, and the full Jodo Studio tile puzzle engine across all chapters free for 14 days."
        perks={[
          'Instant Native Audio Pronunciation',
          'Root Verb & Suffix Breakdown',
          'Spaced Memory Review Loop',
        ]}
        buttonText={currentUser?.planStatus ? 'Open Jodo Studio ➔' : 'Try Jodo Studio Free for 14 Days ➔'}
        onAction={handleStartTrial}
        accent="terracotta"
        planStatus={currentUser?.planStatus}
      />

      {/* ------------------------------------------------------------------
          Sanskrit Online Classes with Bodhi Showcase
          ------------------------------------------------------------------ */}
      <section className="home-online-classes-section" id="online-classes" aria-label="Sanskrit Online Classes with Bodhi">
        <div className="hoc-header">
          <div className="hoc-badge">
            <span>🎓</span>
            <span>Interactive Sanskrit Online Classes</span>
          </div>
          <h2 className="hoc-title">
            Sanskrit Online Classes with Bodhi
            <span className="hoc-title-sa">बोधेः ऑनलाइन-संस्कृत-वर्गाः · 24/7 Virtual Gurukul</span>
          </h2>
          <p className="hoc-subtitle">
            Experience 1-on-1 guided Sanskrit learning with Bodhi, your personal AI Gurukul mentor. Learn spoken Sanskrit, master CBSE/NCERT school syllabus, deconstruct Pāṇinian grammar, or calculate at lightning speed with Vedic mathematics.
          </p>
        </div>

        <div className="hoc-grid">
          {/* Track 1 */}
          <div className="hoc-card">
            <div>
              <div className="hoc-card-icon">🗣️</div>
              <div className="hoc-card-badge">Level 1 · Beginners &amp; Kids</div>
              <h3 className="hoc-card-title">Spoken Sanskrit &amp; Sounds</h3>
              <p className="hoc-card-desc">
                Learn 400+ aksharas, authentic 5-vocal-zone pronunciation, conversational greetings, and daily spoken dialogue.
              </p>
              <ul className="hoc-card-points">
                <li>15-min daily micro-lessons with audio</li>
                <li>Greetings: Namaste, Hariḥ Om, Suprabhātam</li>
                <li>Self-introduction &amp; family vocabulary</li>
              </ul>
            </div>
            <button
              type="button"
              className="hoc-card-btn"
              onClick={onOpenOnlineClasses || onOpenVarnamala}
            >
              Start Spoken Class ▶
            </button>
          </div>

          {/* Track 2 */}
          <div className="hoc-card">
            <div>
              <div className="hoc-card-icon">🏫</div>
              <div className="hoc-card-badge">Classes 6–10 · CBSE &amp; NCERT</div>
              <h3 className="hoc-card-title">CBSE School Exam Prep</h3>
              <p className="hoc-card-desc">
                Line-by-line Deepakam chapter solutions, word-by-word sandhi breakdown, anvaya reconstruction, and mock board papers.
              </p>
              <ul className="hoc-card-points">
                <li>NCERT Class 7, 8 &amp; 9 textbooks with audio</li>
                <li>Question formation (किम्-पद प्रश्ननिर्माणम्)</li>
                <li>80-mark blueprint revision &amp; practice</li>
              </ul>
            </div>
            <button
              type="button"
              className="hoc-card-btn"
              onClick={onOpenOnlineClasses || (() => onOpenReader('gsde101'))}
            >
              Start CBSE Class ▶
            </button>
          </div>

          {/* Track 3 */}
          <div className="hoc-card">
            <div>
              <div className="hoc-card-icon">🏛️</div>
              <div className="hoc-card-badge">Intermediate · Classical</div>
              <h3 className="hoc-card-title">Pāṇinian Vyakaran &amp; Shlokas</h3>
              <p className="hoc-card-desc">
                Algorithmically derive words from roots (Dhātu). Master 7 Vibhaktis, 5 Lakāras, Sandhi rules, and shloka chanting cadence.
              </p>
              <ul className="hoc-card-points">
                <li>Nominal declensions: Bālaka, Latā, Phalam</li>
                <li>Verb tables: 5 Lakāras in active &amp; middle voice</li>
                <li>Bhagavad Gita &amp; Stotra chanting meter</li>
              </ul>
            </div>
            <button
              type="button"
              className="hoc-card-btn"
              onClick={onOpenOnlineClasses || onOpenGrammar}
            >
              Start Vyakaran Class ▶
            </button>
          </div>

          {/* Track 4 */}
          <div className="hoc-card">
            <div>
              <div className="hoc-card-icon">⚡</div>
              <div className="hoc-card-badge">Mental Agility · All Ages</div>
              <h3 className="hoc-card-title">Vedic Maths &amp; Astronomy</h3>
              <p className="hoc-card-desc">
                Supercharge mental math with 16 Vedic Sutras. Compute squares, roots, and calendar positions in seconds.
              </p>
              <ul className="hoc-card-points">
                <li>Ekadhikena Purvena &amp; Nikhilam sutras</li>
                <li>Vinculum negative-digit mental arithmetic</li>
                <li>Baudhayana geometry &amp; astronomical day-counts</li>
              </ul>
            </div>
            <button
              type="button"
              className="hoc-card-btn"
              onClick={onOpenOnlineClasses || onOpenVedicMaths}
            >
              Start Vedic Math Class ▶
            </button>
          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div className="hoc-bottom-banner">
          <div className="hoc-banner-text">
            <span style={{ fontSize: '2rem' }}>✨</span>
            <div>
              <h4>Try Bodhi's Virtual Classroom for Free Today</h4>
              <p>Experience an interactive 3-step micro-lesson with authentic audio, repeat-after-me practice, and instant feedback.</p>
            </div>
          </div>
          <button
            type="button"
            className="hoc-banner-btn"
            onClick={onOpenOnlineClasses}
          >
            🚀 Launch Online Classroom with Bodhi
          </button>
        </div>
      </section>

      {/* ================================================================
          FREE TRIAL CALLOUT 4: AFTER SANSKRIT ONLINE CLASSES
          ================================================================ */}
      <FeatureTrialCallout
        badge="🎁 SELF-PACED + LIVE TUTORING"
        title="Start Your 14-Day Free Access · Pair with Live Online Mentorship"
        subtitle="Explore all digital lessons, NCERT readers, worksheets, and 24/7 AI Guru Bodhi completely free today, and join live online classes whenever you want personalized 1-on-1 coaching."
        perks={[
          '24/7 AI Companion Bodhi Included',
          'Class 7, 8 & 9 Curriculum Aligned',
          'Instant 14-Day Account Activation',
        ]}
        buttonText={currentUser?.planStatus ? 'Explore Online Classes ➔' : 'Activate 14-Day Free Pass ➔'}
        onAction={handleStartTrial}
        accent="indigo"
        planStatus={currentUser?.planStatus}
      />

      {/* ------------------------------------------------------------------
          GAMIFICATION & RETENTION: Streaks, Badges, 5 Ranks & Certificate
          ------------------------------------------------------------------ */}
      <GamificationShowcase
        onOpenQuiz={onOpenQuiz}
        onOpenCertificate={onOpenCertificate}
        onOpenRegister={handleStartTrial}
      />

      {/* ------------------------------------------------------------------
          Meet Bodhi (बोधिः) — AI Mentor Positioning, Scope, Safeguards & Interactions
          ------------------------------------------------------------------ */}
      <BodhiMentorPositioning
        onOpenBodhi={onOpenBodhi}
        onOpenOnlineClasses={onOpenOnlineClasses}
        onOpenVarnamala={onOpenVarnamala}
      />

      {/* ------------------------------------------------------------------
          Featured Video Masterclasses Section
          ------------------------------------------------------------------ */}
      <section className="home-videos-section" aria-label="Featured Video Masterclasses" style={{
        padding: '3rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            display: 'inline-block',
            background: '#F5EFE6',
            color: '#BA3C00',
            border: '1px solid #D97706',
            fontWeight: 800,
            fontSize: '0.8rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.75rem',
          }}>
            🎥 Curated Video Masterclasses
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#3D1B04', margin: '0 0 0.6rem 0' }}>
            The Science of Sound &amp; Shapes
          </h2>
          <p style={{ fontSize: '1rem', color: '#3D1B04', maxWidth: '650px', margin: '0 auto', lineHeight: 1.55 }}>
            Watch these curated documentary masterclasses exploring the articulatory phonetics of Sanskrit (Śikṣā) and the mathematical structures of Vedic sutras.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {/* Video 1: Science of Sound */}
          <div style={{
            background: '#FDFBF7',
            borderRadius: '16px',
            border: '1.5px solid #E5D7C5',
            boxShadow: '0 6px 24px rgba(61, 27, 4, 0.06)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, background: '#090d16' }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/tkvYjNZSsZA?start=32&rel=0"
                title="Sanskrit: The Science of Sound"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  background: '#F5EFE6',
                  color: '#BA3C00',
                  border: '1px solid #E5D7C5',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px',
                  marginBottom: '0.5rem',
                }}>
                  SANSKRIT PHONETICS &amp; ARTICULATORY ACOUSTICS
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#3D1B04', margin: '0 0 0.5rem 0' }}>
                  Sanskrit: The Science of Sound
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#3D1B04', lineHeight: 1.5, margin: 0 }}>
                  Discover how the 5 classical vocal articulation points (Kaṇṭhya to Oṣṭhya) optimize speech clarity, breath regulation (Prāṇāyāma), and acoustic resonance in linguistic phonetics.
                </p>
              </div>
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #E5D7C5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', color: '#3D1B04', opacity: 0.85 }}>Curated by Conscious Cosmos</span>
                <button
                  type="button"
                  onClick={onOpenVarnamala}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#BA3C00',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Explore in Alphabet &amp; Syllables ➔
                </button>
              </div>
            </div>
          </div>

          {/* Video 2: Vedic Geometry */}
          <div style={{
            background: '#FDFBF7',
            borderRadius: '16px',
            border: '1.5px solid #E5D7C5',
            boxShadow: '0 6px 24px rgba(61, 27, 4, 0.06)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, background: '#090d16' }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/bp9m53Tp6xg?start=11&rel=0"
                title="Vedic Geometry: The Science Of Shapes"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  background: '#F5EFE6',
                  color: '#BA3C00',
                  border: '1px solid #E5D7C5',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px',
                  marginBottom: '0.5rem',
                }}>
                  ŚULBA SŪTRAS &amp; SACRED GEOMETRY
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#3D1B04', margin: '0 0 0.5rem 0' }}>
                  Vedic Geometry: The Science of Shapes
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#3D1B04', lineHeight: 1.5, margin: 0 }}>
                  Explore how ancient Indian mathematicians used cords, geometric transformations, and Baudhāyana's Theorem centuries before Pythagoras to design sacred altars.
                </p>
              </div>
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #E5D7C5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', color: '#3D1B04', opacity: 0.85 }}>Curated by Conscious Cosmos</span>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {onOpenScienceLab && (
                    <button
                      type="button"
                      onClick={() => onOpenScienceLab('vedic-geometry')}
                      style={{
                        background: '#BA3C00',
                        border: 'none',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(186, 60, 0, 0.25)',
                      }}
                    >
                      Open Vedic Geometry Lab ➔
                    </button>
                  )}
                  {onOpenVedicMaths && (
                    <button
                      type="button"
                      onClick={onOpenVedicMaths}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#BA3C00',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Vedic Maths ➔
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Featured Essay: Why Learn Sanskrit in the Age of AI
          ------------------------------------------------------------------ */}
      {onOpenPhilosophy && (
        <section style={{ maxWidth: '1100px', margin: '0 auto 3rem', padding: '0 1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #fffdf8 0%, #fdf8ee 50%, #faede6 100%)',
            border: '1.5px solid #ebdcc5',
            borderRadius: '20px',
            padding: '2.25rem 2rem',
            boxShadow: '0 10px 30px rgba(179, 71, 47, 0.07)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#b3472f',
                background: '#faede6',
                border: '1px solid #f2cfc5',
                padding: '0.25rem 0.85rem',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                Featured Gurukul Darśana · दर्शनम्
              </span>
              <span style={{ fontSize: '0.82rem', color: '#9a3412', fontWeight: 700 }}>
                🤖 In the Age of AI
              </span>
            </div>

            <div style={{ maxWidth: '850px' }}>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.95rem)', fontWeight: 800, color: '#2b2118', margin: '0 0 0.5rem', lineHeight: 1.3 }}>
                Why Learn a Language — Especially Sanskrit — in the Age of AI
              </h2>
              <p style={{ fontSize: '1.08rem', fontWeight: 700, color: '#9a3423', margin: '0 0 0.75rem' }}>
                Machines will make communication efficient. They will not make it living.
              </p>
              <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                Because language was never only a pipe for information. It is also how a mind binds to breath, sound, culture, and attention. Explore why Pāṇinian phonetics, acoustic resonance, and human presence cannot be replaced by automated prompts.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                className="home-btn-primary"
                style={{ background: 'linear-gradient(135deg, #b3472f 0%, #ea580c 100%)', boxShadow: '0 4px 14px rgba(179, 71, 47, 0.25)', padding: '0.7rem 1.45rem', fontSize: '0.95rem' }}
                onClick={onOpenPhilosophy}
              >
                Read the Essay ➔
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------
          Core Features Grid - Real Learner Outcomes
          ------------------------------------------------------------------ */}
      <section className="home-features-section">
        <div className="home-section-header">
          <span className="home-section-tag">फलश्रुतिः · Real Learner Outcomes</span>
          <h2 className="home-section-title">What You Will Achieve · Results-Driven Sanskrit Mastery</h2>
          <p className="home-section-subtitle">
            No more dry memorization. Every module delivers tangible, measurable outcomes—from reading your first word in 7 days to achieving top CBSE exam marks.
          </p>
        </div>

        <div className="home-features-grid">
          {/* Feature 1: Sanskrit Thinking Course */}
          {onOpenCourse && (
            <div className="home-feature-card">
              <div className="home-feature-card-top">
                <div className="home-feature-icon-row">
                  <span className="home-feature-icon">🧠</span>
                  <span className="home-feature-badge" style={{ background: '#ede9fe', color: '#4f46e5' }}>
                    Cognitive Linguistics &amp; Computational Track
                  </span>
                </div>
                <h3 className="home-feature-title">Think in Sanskrit &amp; Discover the Computational Logic of Pāṇini</h3>
                <p className="home-feature-desc">
                  Transform Sanskrit from a memorization chore into an algorithmic mental superpower bridging ancient grammar, context-free languages, and philosophical clarity across 28 structured lessons.
                </p>
                <ul className="home-feature-points">
                  <li>Understand the generative rule model: Sound (Input) ➔ Rules (Processing) ➔ Meaning (Output)</li>
                  <li>Connect Sanskrit grammar to modern computer science: BNF syntax &amp; algorithmic parsing</li>
                  <li>Interactive comprehension quizzes, recitation audio &amp; study notes</li>
                  <li>Accredited Certificate of Completion with milestone progress tracking</li>
                </ul>
              </div>
              <button
                type="button"
                className="home-feature-btn"
                style={{ background: '#4338ca', color: '#ffffff' }}
                onClick={onOpenCourse}
              >
                Launch Course Modules ▶
              </button>
            </div>
          )}

          {/* Feature 2: Classical & NCERT Reader */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">📖</span>
                <span className="home-feature-badge">NCERT &amp; CBSE Textbooks (Classes 6–9)</span>
              </div>
              <h3 className="home-feature-title">Understand Original Sanskrit Texts Without Word-by-Word Fear</h3>
              <p className="home-feature-desc">
                Read classical stories, shlokas, and NCERT chapters with instant 1-tap word translations, syllable audio, and grammatical breakdowns.
              </p>
              <ul className="home-feature-points">
                <li>1-tap dictionary lookup &amp; authentic native audio on every word</li>
                <li>Untangle poetic Sanskrit word orders into simple conversational meaning (Anvaya)</li>
                <li>Parallel English &amp; Hindi translations for effortless paragraph comprehension</li>
                <li>100% aligned with CBSE Sanskrit Board exam patterns and question formats</li>
              </ul>
            </div>
            <button
              type="button"
              className="home-feature-btn"
              onClick={() => onOpenReader('gsde101')}
            >
              Open Sanskrit Reader ▶
            </button>
          </div>

          {/* Feature 3: Jodo Tile Puzzle */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">🧩</span>
                <span className="home-feature-badge">Gamified Vocabulary Builder</span>
              </div>
              <h3 className="home-feature-title">Build a 6,000+ Sanskrit Vocabulary Through Addictive 3-Minute Games</h3>
              <p className="home-feature-desc">
                Retain words effortlessly by snapping syllable tiles together, matching trilingual meanings, and unlocking visual story rewards without tedious rote drills.
              </p>
              <ul className="home-feature-points">
                <li>Accelerate vocabulary recall 3× faster than traditional memorization</li>
                <li>Master matra joining (e.g. क + आ → का) and letter ligatures hands-on</li>
                <li>7 themed shelves covering animals, daily objects, verbs, and nature</li>
                <li>Instant encouraging feedback with direct links back to textbook lessons</li>
              </ul>
            </div>
            <button
              type="button"
              className="home-feature-btn"
              onClick={onOpenBoard}
            >
              Play जोडो Puzzle ▶
            </button>
          </div>

          {/* Feature 4: Varṇamālā Studio */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">🔤</span>
                <span className="home-feature-badge">Phonetics &amp; Reading Studio</span>
              </div>
              <h3 className="home-feature-title">Learn to Read Sanskrit Confidently in 7 Days with Guided Audio Practice</h3>
              <p className="home-feature-desc">
                Go from zero knowledge to sounding out any Sanskrit word with authentic native pronunciation, anatomical mouth positions, and full Barakhadi audio charts.
              </p>
              <ul className="home-feature-points">
                <li>Read any Sanskrit syllable or matra combination within your first week</li>
                <li>Master accurate mouth articulation zones (Kaṇṭha to Oṣṭha) for crisp pronunciation</li>
                <li>Decode conjunct consonants (Saṃyuktākṣara) effortlessly without guessing</li>
                <li>Downloadable Varṇamālā &amp; Bārahkhaḍī flashcards and printable workbook PDFs</li>
              </ul>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="home-feature-btn"
                style={{ flex: 1, minWidth: '150px' }}
                onClick={onOpenVarnamala}
              >
                Explore Letters ▶
              </button>
              <button
                type="button"
                className="home-feature-btn"
                style={{
                  background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                }}
                onClick={() => setIsFlashcardModalOpen(true)}
                title="Download / Print Varṇamālā & Bārahkhaḍī Flashcards or PDF"
              >
                📥 Flashcards &amp; PDF
              </button>
            </div>
          </div>

          {/* Feature 5: Vyakarana Shelf */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">📚</span>
                <span className="home-feature-badge">Grammar &amp; Case Mastery</span>
              </div>
              <h3 className="home-feature-title">Master All 7 Cases (Vibhaktis) &amp; Verb Forms Without Rote Confusion</h3>
              <p className="home-feature-desc">
                Demystify Sanskrit grammar! Know exactly which case ending to use in every sentence with visual role maps, 5 school lakāra conjugations, and real-world examples.
              </p>
              <ul className="home-feature-points">
                <li>Never confuse Ramena, Ramaya, or Ramasya again with clear case-role maps</li>
                <li>Conjugate past, present, future, imperative, and potential verbs (5 Lakāras)</li>
                <li>Full declension tables for Dev, Hari, Guru, Lata, Mati, Phalam, etc.</li>
                <li>Direct exam application for school sentence construction and translation</li>
              </ul>
            </div>
            <button
              type="button"
              className="home-feature-btn"
              onClick={onOpenGrammar}
            >
              Browse Vyakaran Shelf ▶
            </button>
          </div>

          {/* Feature 6: Pāṇinian Dhātupāṭha & Verb Studio */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">🌿</span>
                <span className="home-feature-badge" style={{ background: '#dcfce7', color: '#15803d' }}>
                  Pāṇinian Generative Root Science
                </span>
              </div>
              <h3 className="home-feature-title">Deconstruct Any Complex Sanskrit Word to Its Root in Seconds</h3>
              <p className="home-feature-desc">
                Reverse-engineer verbs and participles to their generative roots (dhātu) and suffixes (pratyaya), unlocking the generative DNA of the entire Sanskrit vocabulary.
              </p>
              <ul className="home-feature-points">
                <li>Reverse Word Deconstructor (गत्वा ➔ गम् + क्त्वा, पठितुम् ➔ पठ् + तुमुन्)</li>
                <li>Instant 3×3 conjugation tables for 5 school Lakāras with 1-tap audio</li>
                <li>Master Kṛt Participles (क्त्वा, तुमुन्, ल्यप्, क्त, शतृ) &amp; CBSE Lakāra rules</li>
                <li>Interactive Pratyaya Challenge Quiz with detailed grammatical explanations</li>
              </ul>
            </div>
            {onOpenDhatupatha && (
              <button
                type="button"
                className="home-feature-btn"
                style={{ background: 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)', color: '#ffffff' }}
                onClick={onOpenDhatupatha}
              >
                Launch Dhātupāṭha Studio ▶
              </button>
            )}
          </div>

          {/* Feature 7: Vedic Mathematics */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">📐</span>
                <span className="home-feature-badge" style={{ background: '#fef3c7', color: '#92400e' }}>
                  Mental Arithmetic &amp; Speed Math
                </span>
              </div>
              <h3 className="home-feature-title">Solve Multi-Step Math Problems Mentally in a Single Line</h3>
              <p className="home-feature-desc">
                Replace slow scratchpad arithmetic with pattern-based mental short-cuts, algebraic identities, base complements, and cross-multiplication (Tirtha, 1965).
              </p>
              <ul className="home-feature-points">
                <li>16 Primary Sutras &amp; 13 Sub-Sutras with Sanskrit recitation audio</li>
                <li>Interactive step-by-step mental math solvers (Ekādhikena, Nikhilaṁ, Ūrdhva)</li>
                <li>Instant calculation verification via Beejank digital root checks</li>
                <li>Connects Vedic mathematics to modern computing and algebraic logic</li>
              </ul>
            </div>
            {onOpenVedicMaths && (
              <button
                type="button"
                className="home-feature-btn"
                style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#ffffff' }}
                onClick={onOpenVedicMaths}
              >
                Launch Vaidic Gaṇitam ▶
              </button>
            )}
          </div>

          {/* Feature 8: Sanskrit Numbers Masterclass */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">🔢</span>
                <span className="home-feature-badge" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                  Numbers &amp; Counting Masterclass
                </span>
              </div>
              <h3 className="home-feature-title">Count, Tell Time, and Master Sanskrit Numbers from 1 to 100</h3>
              <p className="home-feature-desc">
                From foundational digits to ancient cosmological scales! Master Sanskrit counting from 1 to 100, ace gender agreement rules for 1–4, and explore powers of 10 up to 10¹⁷.
              </p>
              <ul className="home-feature-points">
                <li>Complete 1 to 100 interactive grid with 1-tap authentic pronunciation audio</li>
                <li>Gender Declension Rules for 1–4 across Masculine, Feminine, and Neuter</li>
                <li>Ordinal Numbers (प्रथमः, द्वितीयः...) &amp; Sandhi secrets (षण्णवतिः 96)</li>
                <li>Astronomical Vedic scale (शतम्, सहस्रम्, लक्षम्, कोटिः to परार्धम् 10¹⁷)</li>
              </ul>
            </div>
            <button
              type="button"
              className="home-feature-btn"
              style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)', color: '#ffffff' }}
              onClick={() => onOpenReader('numbers')}
            >
              Explore Numbers Masterclass ▶
            </button>
          </div>

          {/* Feature 9: Practice Quizzes & Worksheets */}
          {(onOpenQuiz || onOpenWorksheets) && (
            <div className="home-feature-card">
              <div className="home-feature-card-top">
                <div className="home-feature-icon-row">
                  <span className="home-feature-icon">🎯</span>
                  <span className="home-feature-badge" style={{ background: '#dcfce7', color: '#166534' }}>
                    Exam Readiness &amp; Assessment
                  </span>
                </div>
                <h3 className="home-feature-title">Achieve 95%+ in CBSE Sanskrit Exams with Target Worksheets &amp; Mocks</h3>
                <p className="home-feature-desc">
                  Turn exam anxiety into effortless top scores with timed quizzes, chapter-wise worksheets, and full 80-mark blueprint practice for CBSE Classes 6–10.
                </p>
                <ul className="home-feature-points">
                  <li>Vibhaktis, Lakāras, Sandhi &amp; Samāsa topic-wise quizzes with instant scoring</li>
                  <li>Practice with real CBSE-style question formats (किम्-पद question creation, gap fills)</li>
                  <li>Printable classroom &amp; homework practice sheets with complete answer keys</li>
                  <li>Instant answer evaluation with Pāṇinian sutra explanations</li>
                </ul>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                {onOpenQuiz && (
                  <button
                    type="button"
                    className="home-feature-btn"
                    style={{ flex: 1, minWidth: '140px', background: '#059669', color: '#ffffff' }}
                    onClick={onOpenQuiz}
                  >
                    Start Quiz ▶
                  </button>
                )}
                {onOpenWorksheets && (
                  <button
                    type="button"
                    className="home-feature-btn"
                    style={{ flex: 1, minWidth: '140px', background: '#d97706', color: '#ffffff' }}
                    onClick={onOpenWorksheets}
                  >
                    Worksheets ▶
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Feature 10: Free Study Vault & Resources */}
          {onOpenResources && (
            <div className="home-feature-card">
              <div className="home-feature-card-top">
                <div className="home-feature-icon-row">
                  <span className="home-feature-icon">🌐</span>
                  <span className="home-feature-badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                    Free Open-Access Study Vault
                  </span>
                </div>
                <h3 className="home-feature-title">Access 50+ Free Downloadable Sanskrit Cheat Sheets, Audio &amp; Charts</h3>
                <p className="home-feature-desc">
                  Everything parents, teachers, and self-learners need for quick reference—available 100% free with zero registration.
                </p>
                <ul className="home-feature-points">
                  <li>Trilingual root lexicon (Sanskrit–Hindi–English)</li>
                  <li>Printable PDF cheat sheets for 16 Vedic math formulas &amp; Sandhi rules</li>
                  <li>Pronunciation audio charts and Visarga guide for homeschoolers</li>
                  <li>Free Varṇamālā flashcards and printable workbook excerpts</li>
                </ul>
              </div>
              <button
                type="button"
                className="home-feature-btn"
                style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff' }}
                onClick={onOpenResources}
              >
                Access Free Vault ▶
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          FREE TRIAL CALLOUT 5: AFTER FEATURES & TOOLS SHOWCASE
          ================================================================ */}
      <FeatureTrialCallout
        badge="🎁 12+ GRAMMAR ENGINES & MATH LABS"
        title="Full Access to Dhātupāṭha, Sound Lab, Quizzes & 16 Vedic Sutras"
        subtitle="Dive into interactive verb conjugation paradigms, Pāṇinian phonetics, Pi & Sulba-sūtra geometric sandboxes, and printable worksheets without paying a single rupee today."
        perks={[
          '2,000+ Dhātu Paradigms',
          '16 Vedic Math Sutras & Quests',
          '100+ Downloadable Worksheets',
        ]}
        buttonText={currentUser?.planStatus ? 'Open Grammar & Math Lab ➔' : 'Claim 14-Day Free Pass ➔'}
        onAction={handleStartTrial}
        accent="emerald"
        planStatus={currentUser?.planStatus}
      />

      {/* ------------------------------------------------------------------
          Curriculum Directory (Class 7 Deepakam All 15 Lessons)
          ------------------------------------------------------------------ */}
      <section className="home-curriculum-section">
        <div className="home-section-header">
          <span className="home-section-tag">साहित्य-मञ्जूषा एवं पाठ्यपुस्तकानि · Literature &amp; Curriculum</span>
          <h2 className="home-section-title">साहित्य-पाठ्यपुस्तक-निर्देशिका · Classical Literature &amp; NCERT Reader Directory</h2>
          <p className="home-section-subtitle">
            Explore graded classical stories, shlokas, dialogues, and official NCERT Sanskrit textbooks—दीपकम् (Classes 7 &amp; 8) and शारदा (Class 9)—with line-by-line Sanskrit text, word analysis, and parallel translations.
          </p>
        </div>

        {/* NCERT Official Textbooks Showcase Hub */}
        <div className="home-ncert-showcase-section" aria-label="NCERT Sanskrit Textbooks Showcase">
          <div className="home-ncert-showcase-grid">
            {NCERT_TEXTBOOKS.map((tb) => {
              return (
                <div key={tb.id} className="home-ncert-book-card">
                  <div className="home-ncert-book-cover-wrap">
                    <img
                      src={tb.coverUrl}
                      alt={tb.alt}
                      className="home-ncert-book-cover-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="home-ncert-book-info">
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span
                        className="home-ncert-book-badge"
                        style={{ background: `${tb.badgeColor}15`, color: tb.badgeColor, border: `1px solid ${tb.badgeColor}35` }}
                      >
                        {tb.classSa} · {tb.classEn}
                      </span>
                      {!canReadAllChapters && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.5rem',
                            borderRadius: '999px',
                            background: 'rgba(16, 185, 129, 0.12)',
                            color: '#059669',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                          }}
                        >
                          🎁 Free Trial Open
                        </span>
                      )}
                    </div>
                    <h3 className="home-ncert-book-title-sa">{tb.titleSa} ({tb.titleEn})</h3>
                    <p className="home-ncert-book-subtitle">{tb.subtitle}</p>
                    <div className="home-ncert-book-stats">
                      📚 {tb.totalLessons} · 📄 {tb.pageSpan}
                    </div>
                    <div className="home-ncert-book-actions">
                      <button
                        type="button"
                        className="home-ncert-book-btn-primary"
                        onClick={() => {
                          onOpenReader(tb.firstLessonId);
                        }}
                      >
                        📖 Read {tb.titleSa} {!canReadAllChapters ? '(Free Trial)' : ''}
                      </button>
                      <button
                        type="button"
                        className="home-ncert-book-btn-secondary"
                        onClick={() => {
                          if (tb.id === 'class7') openGrade7Syllabus();
                          else if (tb.id === 'class8') openGrade8Syllabus();
                          else openGrade9Syllabus();
                        }}
                      >
                        📜 Index (पाठानुक्रमणिका)
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Grade Filter Bar */}
        <div className="home-grade-filter-bar" role="group" aria-label="Filter by NCERT Class">
          <span className="home-grade-filter-label">📚 Textbook Filter:</span>
          {[
            { id: 'all', label: 'All Classes (सर्वम्)', thumb: null },
            { id: '7', label: 'दीपकम् · Class 7', thumb: '/textbooks/ncert-deepakam-class7.webp' },
            { id: '8', label: 'दीपकम् · Class 8', thumb: '/textbooks/ncert-deepakam-class8.jpg' },
            { id: '9', label: 'शारदा · Class 9', thumb: '/textbooks/ncert-sharada-class9.jpg' },
          ].map((gradeTab) => (
            <button
              key={gradeTab.id}
              type="button"
              className={`home-grade-filter-btn ${selectedGradeFilter === gradeTab.id ? 'active' : ''}`}
              onClick={() => setSelectedGradeFilter(gradeTab.id as any)}
            >
              {gradeTab.thumb && (
                <img
                  src={gradeTab.thumb}
                  alt=""
                  className="home-grade-filter-thumb"
                  aria-hidden="true"
                />
              )}
              <span>{gradeTab.label}</span>
            </button>
          ))}
        </div>

        {/* Search & Category Filter Controls */}
        <div className="home-curriculum-controls">
          <div className="home-curriculum-search-wrap">
            <span className="home-curriculum-search-icon">🔍</span>
            <input
              type="text"
              className="home-curriculum-search-input"
              placeholder="Search by chapter, theme, grammar rule (e.g. लट्, पञ्चमी, सम्बोधनम्)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search Sanskrit Curriculum"
            />
            {searchQuery && (
              <button
                type="button"
                className="home-curriculum-search-clear"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="home-curriculum-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`home-filter-btn ${curriculumCategory === cat.id ? 'active' : ''}`}
                onClick={() => setCurriculumCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="home-filter-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {filteredChapters.length === 0 ? (
          <div className="home-curriculum-empty">
            <p className="home-empty-title">No chapters found</p>
            <p className="home-empty-desc">
              No lessons match your current search query "{searchQuery}".
            </p>
            <button
              type="button"
              className="home-btn-secondary"
              onClick={() => {
                setCurriculumCategory('all');
                setSearchQuery('');
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="home-chapter-grid">
            {filteredChapters.map((ch) => (
              <div
                key={ch.id}
                className="home-chapter-card"
                onClick={() => onOpenReader(ch.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenReader(ch.id);
                }}
              >
                <div className="home-chapter-card-top">
                  <div className="home-chapter-card-header">
                    <div className="home-chapter-meta-left">
                      <span className="home-chapter-num">{ch.num}</span>
                      {ch.genreBadge && (
                        <span className="home-genre-badge">{ch.genreBadge}</span>
                      )}
                    <div className="home-chapter-profile-thumb" title={getTextbookMetaForLesson(ch.id).tagline}>
                      <img
                        src={getTextbookMetaForLesson(ch.id).coverUrl}
                        alt={getTextbookMetaForLesson(ch.id).alt}
                        className="home-chapter-profile-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                  {englishFirst ? (
                    <>
                      <h4 className="home-chapter-meaning-en" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0.35rem 0 0.2rem' }}>
                        {ch.english}
                      </h4>
                      <div className="home-chapter-title-sanskrit" style={{ fontSize: '0.92rem', fontWeight: 600, color: '#9a3412', marginBottom: '0.4rem' }}>
                        {ch.title}
                      </div>
                    </>
                  ) : (
                    <>
                      <h4 className="home-chapter-title-sanskrit">{ch.title}</h4>
                      <p className="home-chapter-meaning-en">{ch.english}</p>
                    </>
                  )}
                  
                  {ch.theme && (
                    <p className="home-chapter-theme-desc">{ch.theme}</p>
                  )}
                </div>

                <div className="home-chapter-card-bottom">
                  {ch.grammarFocus && (
                    <div className="home-grammar-tag">
                      <span className="home-grammar-tag-label">{englishFirst ? '🔖 Grammar Rules:' : '🔖 व्याकरणम्:'}</span> {ch.grammarFocus}
                    </div>
                  )}

                  <div className="home-chapter-footer-row">
                    <span className="home-chapter-read-cta">
                      Read Lesson ➔
                    </span>
                    {ch.id.startsWith('grade8_') && (
                      <button
                        type="button"
                        style={{
                          background: '#fef3c7',
                          color: '#92400e',
                          border: '1px solid #fcd34d',
                          borderRadius: '6px',
                          padding: '0.2rem 0.6rem',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsGrade8ModalOpen(true);
                        }}
                      >
                        📜 Class 8 Syllabus
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {onOpenCbseGuide && (
              <div
                className="home-chapter-card home-chapter-card--guide"
                onClick={onOpenCbseGuide}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenCbseGuide();
                }}
              >
                <div className="home-chapter-card-top">
                  <div className="home-chapter-card-header">
                    <div className="home-chapter-meta-left">
                      <span className="home-chapter-num">परीक्षा-मार्गदर्शिका</span>
                      <span className="home-genre-badge">CBSE Board Exam Blueprint</span>
                    </div>
                    <span className="home-chapter-icon">📋</span>
                  </div>

                  <h4 className="home-chapter-title-sanskrit">CBSE संस्कृत-परीक्षा-मार्गदर्शिका</h4>
                  <p className="home-chapter-meaning-en">CBSE NCERT Sanskrit Exam Blueprint &amp; Question Formula Guide</p>
                  <p className="home-chapter-theme-desc">
                    Standardized 4-section exam blueprint (खण्ड क–घ), formulaic instruction headings (निर्देशाः), 10 core question words (क-कार शब्दाः), and grammatical directives (कर्तृपदम्, क्रियापदम्, अन्वयः).
                  </p>
                </div>

                <div className="home-chapter-card-bottom">
                  <div className="home-grammar-tag">
                    <span className="home-grammar-tag-label">🎯 Board Exam Prep:</span> एकपदेन, पूर्णवाक्येन, प्रश्ननिर्माणम्, क-कार शब्दाः
                  </div>
                  <div className="home-chapter-footer-row">
                    <span className="home-chapter-read-cta">
                      Explore Exam Guide ➔
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {onOpenCbseGuide && (
          <div className="home-curriculum-guide-banner">
            <div className="home-curriculum-guide-info">
              <span className="home-curriculum-guide-badge">CBSE &amp; NCERT Exam Blueprint</span>
              <h3>Ace Your School &amp; Board Sanskrit Exams</h3>
              <p>
                NCERT and CBSE Sanskrit exam questions follow standardized, formulaic patterns. Master repetitive instruction phrases (निर्देशाः), interrogative root words (क-कार शब्दाः), and grammatical directives like कर्तृपदम् and क्रियापदम्.
              </p>
            </div>
            <button type="button" className="home-curriculum-guide-cta" onClick={onOpenCbseGuide}>
              📋 View Complete Exam Guide ➔
            </button>
          </div>
        )}
      </section>

      {/* ================================================================
          FREE TRIAL CALLOUT 6: AFTER CURRICULUM DIRECTORY & CBSE BLUEPRINT
          ================================================================ */}
      <FeatureTrialCallout
        badge="🎁 ALL 15 NCERT CHAPTERS UNLOCKED"
        title="Master Every Chapter & Ace Your Sanskrit Exams"
        subtitle="Line-by-line textbook translations, grammatical glosses, CBSE question blueprint patterns, and model answers across all 15 chapters are included in your 14-day free access."
        perks={[
          'All 15 Deepakam Chapters',
          'Official 80-Mark Exam Blueprint',
          'No Auto-Debit · Zero Risk',
        ]}
        buttonText={currentUser?.planStatus ? 'Read All Chapters ➔' : 'Start Your 14-Day Free Trial ➔'}
        onAction={handleStartTrial}
        accent="amber"
        planStatus={currentUser?.planStatus}
      />

      {/* ------------------------------------------------------------------
          TRUST & METHODOLOGY: Founders, Pedagogy, NEP 2020 & Direct Contact
          ------------------------------------------------------------------ */}
      <TrustAndMethodology />



      <Suspense fallback={null}>
        {isGrade7ModalOpen && (
          <Grade8SyllabusModal
            isOpen={isGrade7ModalOpen}
            onClose={() => setIsGrade7ModalOpen(false)}
            onSelectLesson={(lessonId) => onOpenReader(lessonId)}
            onOpenCbseGuide={onOpenCbseGuide}
            syllabus={GRADE_7_SYLLABUS}
            gradeBadge="सप्तमकक्षा-पाठ्यक्रमः · Deepakam 7th grade · दीपकम"
            intro="Index of the Class 7 Deepakam lessons in this reader: chapters, extra study, and the two grammar appendices."
            coreLessonCount={12}
            appendixCount={2}
            pageSpan="1–15"
            pageStatSuffix="Deepakam lessons"
            lessonIdPrefix="gsde"
            accessGated={false}
            examTitle="CBSE Class 7 Sanskrit Exam Guide & Question Directives"
            examBlurb="The same CBSE Sanskrit exam guide used with this reader: question words, section instructions, and how the paper grows from Class 7."
          />
        )}

        {isGrade8ModalOpen && (
          <Grade8SyllabusModal
            isOpen={isGrade8ModalOpen}
            onClose={() => setIsGrade8ModalOpen(false)}
            onSelectLesson={(lessonId) => onOpenReader(lessonId)}
            onOpenCbseGuide={onOpenCbseGuide}
          />
        )}

        {isGrade9ModalOpen && (
          <Grade8SyllabusModal
            isOpen={isGrade9ModalOpen}
            onClose={() => setIsGrade9ModalOpen(false)}
            onSelectLesson={(lessonId) => onOpenReader(lessonId)}
            onOpenCbseGuide={onOpenCbseGuide}
            syllabus={GRADE_9_SYLLABUS}
            gradeBadge="नवमकक्षा-पाठ्यक्रमः · शारदा (Class 9) · CBSE"
            intro="Complete index of all 12 textbook chapters, opening invocations, and grammatical appendices with exact page references."
            coreLessonCount={12}
            appendixCount={4}
            pageSpan="Page 1 to 244"
            pageStatSuffix="References"
            lessonIdPrefix="grade9_"
            accessGated={true}
            examTitle="CBSE Class 9 Sanskrit Exam Guide & Question Directives"
            examBlurb="Master high school paper structure: अन्वय-पूरणम्, प्रश्ननिर्माणम्, सन्धि-समास-प्रत्यय rules, and board scoring directives."
          />
        )}

        {isFlashcardModalOpen && (
          <VarnamalaFlashcardDownloadModal
            isOpen={isFlashcardModalOpen}
            onClose={() => setIsFlashcardModalOpen(false)}
            initialMode="varnamala"
          />
        )}
      </Suspense>

      {/* Mobile-First Sticky Action Bar (visible on mobile after scroll > 320px) */}
      <MobileStickyBar
        onStartLesson={() => onOpenReader()}
        onPlacementTest={() => {
          if (onOpenQuiz) onOpenQuiz();
          else {
            const el = document.getElementById('learning-paths');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onStartTrial={handleStartTrial}
      />
    </div>
  </>
  );
};

export default HomePage;
