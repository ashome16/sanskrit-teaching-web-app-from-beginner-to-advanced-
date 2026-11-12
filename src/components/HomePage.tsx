import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import { playPronunciation, playSequence, stopPronunciation } from '../utils/pronunciation';
import { useAuthStore } from '../store/authStore';
import { canAccessAllChapters, canAccessThinkLabs, isFreeTrialOpenLesson } from '../utils/premiumAccess';
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
import { TrustAndMethodology } from './TrustAndMethodology';
import { MobileStickyBar } from './MobileStickyBar';
import { StudentStaircaseBlackboard } from './StudentStaircaseBlackboard';
import { PracticeVaultShowcase } from './PracticeVaultShowcase';
import { ChitraKavyaPathwayCard } from './ChitraKavyaPathwayCard';
import { VedicKnowledgeSystemShowcase } from './VedicKnowledgeSystemShowcase';
import { HomeJodoInteractiveBanner } from './HomeJodoInteractiveBanner';
import { getHinduDate } from '../utils/hinduCalendar';
import '../styles/hindu-calendar.css';
import '../styles/home-page.css';
import '../styles/bodhi.css';
import '../styles/bodhi-online-classes.css';

const Grade8SyllabusModal = lazy(() => import('./Grade8SyllabusModal').then((m) => ({ default: m.Grade8SyllabusModal })));
const VarnamalaFlashcardDownloadModal = lazy(() => import('./VarnamalaFlashcardDownloadModal'));

export interface HomePageProps {
  onOpenReader: (lessonId?: string) => void;
  onOpenBoard: (mode?: 'jodo' | 'match' | 'maze' | 'prahelika', category?: string) => void;
  onOpenVarnamala: () => void;
  onOpenGrammar: () => void;
  onOpenVedicMaths?: () => void;
  onOpenPhilosophy?: () => void;
  onOpenCbseGuide?: () => void;
  onOpenOnlineClasses?: () => void;
  onOpenQuiz?: () => void;
  onOpenWorksheets?: () => void;
  onOpenAssignmentEvaluator?: () => void;
  onOpenDhatupatha?: () => void;
  onOpenBodhi?: () => void;
  onOpenSearch?: () => void;
  onOpenResources?: () => void;
  onOpenCourse?: () => void;
  onOpenScienceLab?: (segment?: string) => void;
  onOpenTurangaBandha?: () => void;
  onOpenRegister?: () => void;
  onOpenCertificate?: () => void;
  onOpenCalendar?: () => void;
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
    categoryEn: 'Wisdom is to Acquire, Apply Knowledge with rightful Purpose = Dharm',
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
              ? 'All features unlocked'
              : planStatus === 'trial'
                ? '14-Day trial active'
                : 'No credit card required'}
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
            ? 'NCERT texts & tools unlocked'
            : 'Zero risk · Cancel anytime'}
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
  onOpenAssignmentEvaluator,
  onOpenDhatupatha,
  onOpenBodhi,
  onOpenSearch,
  onOpenResources,
  onOpenCourse,
  onOpenScienceLab,
  onOpenTurangaBandha,
  onOpenRegister,
  onOpenCertificate,
  onOpenCalendar,
}) => {
  const [selectedDemo, setSelectedDemo] = useState<DemoWord>(DEMO_WORDS[0]);
  void onOpenCertificate; void FeatureTrialCallout;
  const [curriculumCategory, setCurriculumCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { isAdminLoggedIn, currentUser, openAuthModal, openPaymentModal } = useAuthStore();
  const canReadAllChapters = canAccessAllChapters(currentUser, isAdminLoggedIn);
  const thinkLabsUnlocked = canAccessThinkLabs(currentUser, isAdminLoggedIn);

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
  const [homePanchang, setHomePanchang] = useState(() => getHinduDate());
  useEffect(() => {
    const timer = window.setInterval(() => setHomePanchang(getHinduDate()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'all' | '7' | '8' | '9'>('all');
  const [isLogoArrived, setIsLogoArrived] = useState<boolean>(false);
  const [showEntranceIntro, setShowEntranceIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const alreadySeen = sessionStorage.getItem('ednet_gurukul_intro_seen_v5');
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
      sessionStorage.setItem('ednet_gurukul_intro_seen_v5', 'true');
    } catch {}
  }, []);

  const scrollToJourneyStep = useCallback((stepId: string) => {
    const el = document.getElementById(stepId) || document.getElementById('journey');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('is-journey-highlight');
      setTimeout(() => {
        el.classList.remove('is-journey-highlight');
      }, 1600);
    }
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
          autoAdvanceMs={8000}
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
          {/* 1. SANSKRIT PRIMARY IDENTITY & BIG DEVANAGARI TEXT (Immediate Focal Point) */}
          <div className="home-hero-sanskrit-centerpiece">
            <div className="home-hero-sanskrit-wordmark">
              <span className="home-hero-sanskrit-calligraphy" lang="sa">
                संस्कृतम्
              </span>
              <span className="home-hero-sanskrit-shloka" lang="sa">
                ॥ भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती ॥
              </span>
            </div>
          </div>

          {/* EdNet Learn brand identity: play + IKS (Sanskrit is the gateway) */}
          <div className="home-brand-identity" role="region" aria-label="EdNet Learn">
            <p className="home-brand-kicker">EdNet Learn · Free &amp; interactive</p>
            <h1 className="home-brand-h1">Learn Through Play.</h1>
            <p className="home-brand-sub">Exploring Indian Knowledge Systems, creativity and the wonders of learning.</p>
            <p className="home-brand-sub">A place where children can explore, question, experiment and discover connections between traditional knowledge and modern science.</p>
            <section className="home-intro-video" aria-label="EdNet Learn introductory video" style={{ margin: "1rem auto 1.25rem", maxWidth: 760, textAlign: "center" }}>
        {/* Sacred Mangalācaraṇam (मङ्गलाचरणम्) Invocation */}
        <div className="home-mangalacaranam-strip" role="region" aria-label="मङ्गलाचरणम् · Sacred Invocation">
          <div className="home-mangalacaranam-crest">
            <span className="home-mangalacaranam-om" aria-hidden="true">ॐ</span>
          </div>
          <div className="home-mangalacaranam-body">
            <div className="home-mangalacaranam-badge">
              <span>मङ्गलाचरणम्</span>
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
              <video src="/videos/ednetlearn-intro.mp4" poster="/videos/ednetlearn-intro-poster.jpg" controls playsInline preload="metadata" aria-label="EdNet Learn introductory video" style={{ width: "100%", borderRadius: 16, boxShadow: "0 6px 24px rgba(0,0,0,.12)", background: "#000" }}>
                Your browser does not support the video tag. <a href="/videos/ednetlearn-intro.mp4">Download the EdNet Learn introduction</a>.
              </video>
            </section>
            <nav className="home-brand-strip" aria-label="Explore EdNet Learn">
              {[
                { href: '/indian-knowledge-systems/', icon: '🪷', t: 'Explore the World of Indian Knowledge Systems' },
                { href: '/sanskrit-learning/', icon: 'अ', t: 'Sanskrit – The Language of Knowledge' },
                { href: '/vedic-mathematics/', icon: '∑', t: 'Vedic Mathematics & Mathematical Thinking' },
                { href: '/science-and-discovery/', icon: '🔭', t: 'Discover Science Through Exploration' },
                { href: '/educational-games/', icon: '🎲', t: 'Learn with Stories, Games & Interactive Activities' },
                { href: '/worksheets-and-learning-resources/', icon: '📝', t: 'Worksheets, Quizzes & Learning Resources' },
                { href: '/philosophy/', icon: '🌉', t: 'Connecting Ancient Wisdom with Modern Knowledge' },
              ].map((x) => (
                <a key={x.href} href={x.href} className="home-brand-tile">
                  <span className="home-brand-tile-icon" aria-hidden="true">{x.icon}</span>
                  <h2 className="home-brand-tile-title">{x.t}</h2>
                </a>
              ))}
            </nav>
          </div>

          {/* Trust strip (under Devanagari centerpiece) */}
          <div className="home-trust-banner home-trust-banner--hero" role="region" aria-label="Academic Standards">
            <div className="home-trust-item">
              <span className="home-trust-icon">🌟</span>
              <div className="home-trust-text">
                <strong>सर्वजन-हितम् · For All Ages</strong>
                <span>Beginners, students &amp; scholars</span>
              </div>
            </div>
            <div className="home-trust-item">
              <span className="home-trust-icon">🎧</span>
              <div className="home-trust-text">
                <strong>शुद्धोच्चारणम् · Native Speech Audio</strong>
                <span>Alphabet, syllables &amp; shlokas in clear classical pronunciation</span>
              </div>
            </div>
            <div className="home-trust-item">
              <span className="home-trust-icon">🏛️</span>
              <div className="home-trust-text">
                <strong>पाणिनीय-गम्भीरता · Pāṇinian Depth</strong>
                <span>Dhātus, vibhaktis &amp; meaning</span>
              </div>
            </div>
            <div className="home-trust-item">
              <span className="home-trust-icon">🎒</span>
              <div className="home-trust-text">
                <strong>सीबीएसई-एनसीईआरटी · CBSE &amp; NEP Aligned</strong>
                <span>NCERT Classes 7–9 + exam prep</span>
              </div>
            </div>
          </div>

          {/* 2. STEP-BY-STEP JOURNEY HEADLINE (Moved to Top & Made Bigger) */}
          <div className="home-hero-journey-header">
            <h2 style={{ margin: 0 }}>
              <a
                href="#journey"
                className="home-hero-journey-top-title"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('journey');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                title="Explore the complete 6-stage step-by-step Sanskrit roadmap"
              >
                <span className="hhjt-text">Your Step-by-Step Sanskrit Journey</span>
                <span className="hhjt-arrow" aria-hidden="true">➔</span>
              </a>
            </h2>
            <p className="home-hero-journey-subtitle">
              {englishFirst
                ? 'Select your starting level below or explore the full 6-stage roadmap from alphabet basics to complete fluency.'
                : 'प्रारम्भिक-स्तरात् आरभ्य प्रौढ-स्तरान्तं स्वस्तरं चिनुत, अथवा सोपान-क्रमेण संस्कृत-यात्रां पश्यन्तु।'}
            </p>
          </div>

          {/* 3. INTERACTIVE LEVELS BAR (6 Milestones from Beginner to Exam Prep) */}
          <div className="home-hero-levels-container" role="region" aria-label="Select Learning Level">
            <div className="home-hero-levels-grid">
              <button
                type="button"
                className="home-hero-level-chip home-hero-level-chip--l1"
                onClick={() => scrollToJourneyStep('step-1')}
                title="Level 1: Beginner — Alphabet, Sounds & Syllables (वर्णमाला)"
              >
                <span className="hhl-badge">Level 1</span>
                <strong className="hhl-name">Beginner</strong>
                <span className="hhl-sub">वर्णमाला · Alphabet</span>
              </button>

              <button
                type="button"
                className="home-hero-level-chip home-hero-level-chip--l2"
                onClick={() => scrollToJourneyStep('step-2')}
                title="Level 2: Elementary — Words, Vocabulary & Interactive Puzzles (शब्दाः)"
              >
                <span className="hhl-badge">Level 2</span>
                <strong className="hhl-name">Elementary</strong>
                <span className="hhl-sub">शब्दाः · Words</span>
              </button>

              <button
                type="button"
                className="home-hero-level-chip home-hero-level-chip--l3"
                onClick={() => onOpenReader('simple-sentences')}
                title="Level 3: Intermediate — Simple Sentences & Root Words (सरल-वाक्यानि एवं धातवः)"
              >
                <span className="hhl-badge">Level 3</span>
                <strong className="hhl-name">Intermediate</strong>
                <span className="hhl-sub">वाक्यानि · Sentences</span>
              </button>

              <button
                type="button"
                className="home-hero-level-chip home-hero-level-chip--l4"
                onClick={() => scrollToJourneyStep('step-4')}
                title="Level 4: Upper Intermediate — Pāṇinian Grammar & Dhātupāṭha (व्याकरणम्)"
              >
                <span className="hhl-badge">Level 4</span>
                <strong className="hhl-name">Grammar</strong>
                <span className="hhl-sub">व्याकरणम् · Dhātu</span>
              </button>

              <button
                type="button"
                className="home-hero-level-chip home-hero-level-chip--l5"
                onClick={() => scrollToJourneyStep('step-5')}
                title="Level 5: Advanced — NCERT Deepakam & Classical Texts (एनसीईआरटी)"
              >
                <span className="hhl-badge">Level 5</span>
                <strong className="hhl-name">Advanced</strong>
                <span className="hhl-sub">एनसीईआरटी · NCERT</span>
              </button>

              <button
                type="button"
                className="home-hero-level-chip home-hero-level-chip--l6"
                onClick={() => scrollToJourneyStep('step-6')}
                title="Level 6: Mastery — CBSE 80-Mark Board Exam Preparation (परीक्षा-सिद्धिः)"
              >
                <span className="hhl-badge">Level 6</span>
                <strong className="hhl-name">Exam Prep</strong>
                <span className="hhl-sub">परीक्षा-सिद्धिः · CBSE</span>
              </button>
            </div>
          </div>

          {/* Institutional Crest & Intro Replay */}
          <div className="home-hero-institution-strip" role="region" aria-label="Gurukul Learning Platform">
            <div className="home-hero-inst-badge">
              <img
                id="home-hero-crest-logo"
                src="/logo.jpg"
                alt="EdNet Gurukul - Learn Sanskrit Online &amp; Vedic Mathematics"
                className={`home-hero-inst-logo${isLogoArrived ? ' is-arrived' : ''}`}
                width={44}
                height={44}
                onClick={() => setShowEntranceIntro(true)}
                title="EdNet Gurukul · Tap to experience Gurukul dawn animation"
              />
              <div className="home-hero-inst-text">
                <span className="home-hero-inst-title">EdNet Learn Gurukul</span>
                <span className="home-hero-inst-sub">The Darśana Series</span>
              </div>
            </div>

            <div className="home-hero-top-actions-row" style={{ margin: 0 }}>
              <button
                type="button"
                className="home-hero-replay-intro-btn"
                onClick={() => setShowEntranceIntro(true)}
                title="Replay Gurukul Dawn Intro &amp; Sacred Temple Bell Animation"
                aria-label="Replay Gurukul Dawn Intro &amp; Sacred Temple Bell Animation"
              >
                <span className="hhri-icon" aria-hidden="true">🔔</span>
                <span>Replay Gurukul Intro</span>
                <span className="hhri-badge">Anime &amp; Bell</span>
              </button>
            </div>
          </div>

          {/* ================================================================
              VISIBLE LEARNER JOURNEY: 6-STEP PROGRESSION
              Alphabet → Basic words → Simple sentences → Grammar → NCERT texts → Exam readiness
              ================================================================ */}
          <div id="journey" className="home-learner-journey" role="region" aria-label="Sanskrit Learning Progression Journey">

            <div className="home-journey-steps">
              {/* Step 1: Alphabet */}
              <div
                id="step-1"
                className="home-journey-step-card"
                onClick={() => onOpenVarnamala?.()}
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

              {/* Step 2: Basic words & Jodo Interactive Puzzles */}
              <div
                id="step-2"
                className="home-journey-step-card"
                onClick={() => onOpenBoard?.('jodo')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenBoard?.('jodo');
                }}
                title="Step 2: Build 6,000+ words playfully with interactive जोडो tile puzzles"
              >
                <span className="home-journey-step-num">Step 2</span>
                <span className="home-journey-step-icon" aria-hidden="true">🧩</span>
                <span className="home-journey-live-badge">
                  <span className="home-journey-live-dot" /> 100% Interactive
                </span>
                <h3 className="home-journey-step-title">Words &amp; Games</h3>
                <span className="home-journey-step-sanskrit">शब्दाः · जोडो एवं क्रीडाः</span>
                <div className="home-step-jodo-mini-tiles" aria-hidden="true">
                  <span className="hs-tile">जो</span>
                  <span className="hs-plus">+</span>
                  <span className="hs-tile">डो</span>
                  <span className="hs-eq">=</span>
                  <span className="hs-word">जोडो 🧩</span>
                </div>
                <p className="home-journey-step-desc">
                  Build 6,000+ practical words with tile puzzles, 18 match-pair categories, word mazes &amp; classical Sanskrit riddles (प्रहेलिकाः).
                </p>
                <span className="home-journey-step-cta">Play &amp; Build →</span>
              </div>

              <div className="home-journey-arrow" aria-hidden="true">→</div>

              {/* Step 3: Simple sentences & Root Words */}
              <div
                id="step-3"
                className="home-journey-step-card"
                onClick={() => onOpenReader('simple-sentences')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenReader('simple-sentences');
                }}
                title="Step 3: Root words, verb formation, and everyday conversational sentences"
              >
                <span className="home-journey-step-num">Step 3</span>
                <span className="home-journey-step-icon" aria-hidden="true">💬</span>
                <h3 className="home-journey-step-title">Simple Sentences &amp; Roots</h3>
                <span className="home-journey-step-sanskrit">सरल-वाक्यानि एवं धातवः</span>
                <p className="home-journey-step-desc">
                  Learn core root words (धातवः), verb formation, and everyday sentences.
                </p>
                <span className="home-journey-step-cta">Learn Sentences →</span>
              </div>

              <div className="home-journey-arrow" aria-hidden="true">→</div>

              {/* Step 4: Grammar */}
              <div
                id="step-4"
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
                id="step-5"
                className="home-journey-step-card"
                onClick={() => onOpenReader()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenReader();
                }}
                title="Step 5: NCERT chapters — listen, translate, practise"
              >
                <span className="home-journey-step-num">Step 5</span>
                <span className="home-journey-step-icon" aria-hidden="true">📖</span>
                <h3 className="home-journey-step-title">NCERT Texts</h3>
                <span className="home-journey-step-sanskrit">दीपकम् · शारदा</span>
                <p className="home-journey-step-desc">
                  Listen, translate and practise each chapter.
                </p>
                <span className="home-journey-step-cta">Read Texts →</span>
              </div>

              <div className="home-journey-arrow" aria-hidden="true">→</div>

              {/* Step 6: Exam readiness */}
              <div
                id="step-6"
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
            KNOWLEDGE STAIRCASE & ANCIENT GURUKUL DOCUMENT
            ================================================================ */}
        <StudentStaircaseBlackboard
          onOpenVarnamala={onOpenVarnamala}
          onOpenReader={onOpenReader}
          onOpenGrammar={onOpenGrammar}
          onOpenCbseGuide={onOpenCbseGuide}
          onOpenQuiz={onOpenQuiz}
          onOpenBodhi={onOpenBodhi}
        />

        {/* Animated Jodo Interactive Syllable Banner (Direct Launch to 6,000+ Word Studio) */}
        <HomeJodoInteractiveBanner onOpenBoard={onOpenBoard} />

        {/* 3. The 4 Primary High-Conversion Calls to Action */}
        <div className="home-hero-three-actions" role="region" aria-label="Primary Actions">
          {/* Action 1: Start Free Lesson */}
          <button
            type="button"
            className="home-hero-action-card home-hero-action-card--lesson"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('start-free-audio-lesson'));
              const el = document.getElementById('audio-lesson') || document.getElementById('poq-audio-lesson') || document.getElementById('proof-of-quality');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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


          {/* Action 3: Take Sanskrit Placement Test */}
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

          {/* Action 4: Begin in 5 Minutes (14-Day Free Access) */}
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
          PROOF OF QUALITY: EXPERIENCE BEFORE YOU SIGN UP
          Demo Lessons, Sample Audio, Word Analyzer UI, Complete Free Chapter 1
          ================================================================ */}
      <ProofOfQuality
        onOpenReader={onOpenReader}
        onOpenVarnamala={onOpenVarnamala}
        onOpenGrammar={onOpenGrammar}
        onOpenRegister={handleStartTrial}
      />

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
                <h2 className="hsub-title">
                  {currentSubhashita.id === 'vidya-vinaya'
                    ? 'Wisdom is to Acquire, Apply Knowledge with rightful Purpose = Dharm'
                    : `${currentSubhashita.categorySa} · ${currentSubhashita.categoryEn}`}
                </h2>
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
            Tap a word to see how it works.
          </p>
          <style>{`@keyframes wdStep{0%,100%{opacity:.45;transform:translateY(0)}12%,30%{opacity:1;transform:translateY(-3px);background:#fff3dc;border-color:#d9a441}}
.wd-steps{display:flex;flex-wrap:wrap;justify-content:center;gap:.35rem;margin:.7rem auto 0;list-style:none;padding:0;max-width:640px}
.wd-steps li{font-size:.8rem;padding:.3rem .6rem;border-radius:999px;border:1px solid #e2d3bd;background:#faf6ef;color:#4a3518;animation:wdStep 6s infinite}
.wd-steps li:nth-child(2){animation-delay:1.5s}.wd-steps li:nth-child(3){animation-delay:3s}.wd-steps li:nth-child(4){animation-delay:4.5s}
@media (prefers-reduced-motion:reduce){.wd-steps li{animation:none;opacity:1}}`}</style>
          <ol className="wd-steps" aria-label="How the word analyzer works">
            <li>① Tap a word</li>
            <li>② 🔊 Hear it</li>
            <li>③ Split into syllables</li>
            <li>④ Read the meaning</li>
          </ol>
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

      {/* NCERT Curriculum (moved above Vijñāna Lab) */}
      <section id="ncert-curriculum" className="home-pathways-section" aria-label="NCERT Curriculum">
        <div className="home-pathways-grid home-pathways-grid--duo" style={{ maxWidth: 1100, margin: '0 auto', alignItems: 'stretch' }}>
          {/* Pathway 1: Beginner */}
          <div className="home-pathway-card home-duo-beginner">
            <div>
              <span className="home-pathway-badge home-pathway-badge--beginner">
                प्रारम्भिक-मार्गः · Beginner Track
              </span>
              <h3 className="home-pathway-title">🌱 Read Sanskrit Confidently in 7 Days</h3>
              <p className="home-pathway-desc">
                Learn to read Sanskrit letters, 400+ syllables, and essential starter vocabulary with guided native audio practice and mouth positions.
              </p>
              <div style={{ display: 'flex', gap: '0.35rem', margin: '0.6rem 0', flexWrap: 'wrap' }} aria-label="Sample letters">
                {['अ', 'आ', 'क', 'का', 'कि', 'क्ष', 'ज्ञ', 'ॐ'].map((l) => (
                  <span key={l} style={{ minWidth: '2rem', padding: '0.2rem 0.35rem', textAlign: 'center', fontSize: '1.05rem', border: '1px solid #e2d3bd', borderRadius: '6px', background: '#ffffff', color: '#5a3e1b' }}>{l}</span>
                ))}
              </div>
              <div className="home-duo-plan" style={{ padding: '0.6rem 0.75rem', border: '1px solid #e2d3bd', borderRadius: '10px', background: '#fffdf9', fontSize: '0.8rem', color: '#5a3e1b', lineHeight: 1.45 }} aria-label="7-day plan">
                <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>🗓️ सप्ताह-योजना · Your 7-day plan</div>
                {[
                  ['Day 1–2', 'Vowels (स्वराः) with audio & mouth positions'],
                  ['Day 3–4', 'Consonants (व्यञ्जनानि), 5 articulation zones'],
                  ['Day 5', 'Bārahkhaḍī: 400+ syllables with mātrās'],
                  ['Day 6', 'Conjuncts (संयुक्ताक्षराणि) like क्ष, त्र, ज्ञ'],
                  ['Day 7', 'Read real words with the Word Deconstructor'],
                ].map(([d, t]) => (
                  <div key={d} className="home-duo-plan-item" style={{ display: 'flex', gap: '0.5rem', padding: '0.2rem 0', borderLeft: '3px solid #15803d', paddingLeft: '0.45rem', marginBottom: '0.2rem' }}>
                    <strong style={{ whiteSpace: 'nowrap', minWidth: '3.8rem' }}>{d}</strong><span>{t}</span>
                  </div>
                ))}
                <div style={{ marginTop: '0.35rem', fontSize: '0.76rem', opacity: 0.85 }}>🔊 Native audio · 🖨️ Printable flashcards · ✅ Self-check quizzes</div>
              </div>
            </div>
            <button
              type="button"
              className="home-pathway-btn"
              onClick={() => onOpenVarnamala?.()}
            >
              वर्णमाला · Start Alphabet ▶
            </button>
          </div>
          {/* Pathway 5: CBSE & NCERT School Track */}
          <div className="home-duo-right" style={{ display: 'contents' }}>
          <div className="home-pathway-card home-duo-ncert">
            <div>
              <span className="home-pathway-badge home-pathway-badge--school">
                पाठ्यपुस्तक-क्रमः · NCERT Curriculum (Classes 7–9)
              </span>
              <h3 className="home-pathway-title">🎒 Deepakam &amp; Sharada, Chapter by Chapter</h3>
              <p className="home-pathway-desc">
                Every Class 7–9 chapter in textbook order — listen, translate (EN / HI / TE / TA / ML), solutions, quizzes &amp; worksheets.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', margin: '0.75rem 0' }}>
                {NCERT_TEXTBOOKS.map((tb) => (
                  <div key={tb.id} style={{ textAlign: 'center' }}>
                  <div
                    title={`${tb.titleSa} · ${tb.classEn}`}
                    style={{
                      width: '100%',
                      aspectRatio: '3 / 4',
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
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#5a3e1b', marginTop: '0.3rem', lineHeight: 1.25 }}>
                    <strong>{tb.titleSa}</strong><br />{tb.classEn}
                  </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '0.4rem', padding: '0.65rem 0.75rem', border: '1px solid #e2d3bd', borderRadius: '10px', background: '#fffdf9', fontSize: '0.8rem', color: '#5a3e1b', lineHeight: 1.45 }} aria-label="Inside Deepakam and Sharada">
                <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>📚 अन्तर्गतम् · What's inside</div>
                {[
                  { k: '7', t: 'दीपकम् · Class 7', d: '12 chapters + 2 grammar appendices', open: () => setIsGrade7ModalOpen(true) },
                  { k: '8', t: 'दीपकम् · Class 8', d: '13 chapters + 3 appendices', open: () => setIsGrade8ModalOpen(true) },
                  { k: '9', t: 'शारदा · Class 9', d: '12 chapters + 4 appendices', open: () => setIsGrade9ModalOpen(true) },
                ].map((g) => (
                  <button key={g.k} type="button" onClick={g.open} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textAlign: 'left', gap: '0.5rem', padding: '0.4rem 0.55rem', marginBottom: '0.35rem', border: '1px solid #e2d3bd', borderLeft: '3px solid #b45309', borderRadius: '8px', background: '#ffffff', color: '#5a3e1b', cursor: 'pointer', font: 'inherit' }}>
                    <span><strong>{g.t}</strong><br /><span style={{ fontSize: '0.74rem', opacity: 0.85 }}>{g.d}</span></span>
                    <span style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>Chapters →</span>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '0.6rem' }} aria-label="Included Academic Curriculum">
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#5a3e1b', marginBottom: '0.35rem' }}>🎒 विद्यालय-वर्गः · CBSE &amp; State Boards (6–10)</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  {[
                    { i: '📖', t: 'NCERT Reader', d: 'Audio, translation & अभ्यास solutions', go: () => onOpenReader('gsde101') },
                    { i: '📑', t: 'Worksheets', d: 'Printable, with answer keys', go: () => (onOpenWorksheets ? onOpenWorksheets() : onOpenReader('worksheets')) },
                    { i: '🎯', t: 'Practice Quizzes', d: 'Vibhakti, lakāra & pratyaya drills', go: () => onOpenQuiz?.() },
                    { i: '📘', t: 'CBSE Exam Guide', d: '80-mark blueprint & mock papers', go: () => onOpenCbseGuide?.() },
                  ].map((m) => (
                    <button key={m.t} type="button" onClick={m.go} style={{ textAlign: 'left', padding: '0.45rem 0.55rem', border: '1px solid #e2d3bd', borderRadius: '8px', background: '#fffdf9', color: '#5a3e1b', cursor: 'pointer', font: 'inherit', fontSize: '0.76rem', lineHeight: 1.3 }}>
                      <strong>{m.i} {m.t}</strong><br /><span style={{ opacity: 0.85 }}>{m.d}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="home-pathway-btn"
              onClick={() => onOpenReader('gsde101')}
            >
              पाठ्यपुस्तकम् · Open Reader ▶
            </button>
          </div>
        {/* Featured Complete Course Banner: संस्कृत-चिन्तनम् */}
        {onOpenCourse && (
          <div
            className="home-course-feature-card"
            style={{
              marginTop: 0,
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
            <div style={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ alignSelf: 'flex-start', display: 'inline-block', background: '#fef08a', color: '#713f12', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.02em' }}>
                चिन्तन-मार्गः · Complete Course
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fef08a', margin: '0.6rem 0 0.2rem', fontFamily: 'Noto Sans Devanagari, serif', lineHeight: 1.3 }}>
                🧠 संस्कृत-चिन्तनम्
              </h3>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.45rem' }}>Sanskrit as a Way of Thinking</div>
              <p style={{ margin: '0 0 0.75rem', fontSize: '0.86rem', color: '#ccfbf1', lineHeight: 1.5 }}>
                Sound → Rules → Meaning. Learn how Sanskrit trains the mind, in 28 lessons with audio and interactive drills.
              </p>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#99f6e4', marginBottom: '0.4rem' }}>📚 6 Modules · 28 Lessons</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }} aria-label="Course modules">
                {[
                  ['🔊', 'ध्वनिः', 'Sound as Input'],
                  ['✍️', 'लिपिः', 'Script & Symbols'],
                  ['⚙️', 'व्याकरणम्', 'Rules as Processing'],
                  ['📜', 'वाक्यम्', 'Meaning as Output'],
                  ['🔬', 'गणितम्, तर्कः', 'The Scientific Mind'],
                  ['🪔', 'दर्शनम्', 'The Contemplative Mind'],
                ].map(([i, sa, en], idx) => (
                  <div key={sa} style={{ flex: 1, maxHeight: '3.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.6rem', borderRadius: '8px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(153,246,228,0.18)', fontSize: '0.8rem', color: '#e6fffa' }}>
                    <span style={{ opacity: 0.7, minWidth: '1rem' }}>{idx + 1}</span>
                    <span>{i}</span>
                    <span><strong style={{ color: '#fef08a' }}>{sa}</strong> · {en}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '0.7rem', fontSize: '0.76rem', color: '#ccfbf1', opacity: 0.9 }}>🔊 Audio · 🎯 Drills · 🏅 Progress tracking</div>
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
                width: '100%',
                marginTop: '0.9rem',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenCourse();
              }}
            >
              चिन्तनम् · Start Course ▶
            </button>
          </div>
        )}
          </div>

        </div>
      </section>


      {/* Daily Pañcāṅga — compact strip in the gap above Self-Study vault (moved off header menu) */}
      <section
        className="home-daily-panchang"
        id="daily-panchang"
        aria-label="आज का पञ्चाङ्गम् · Daily Pañcāṅga"
      >
        <button
          type="button"
          className="home-daily-panchang-card"
          onClick={() => {
            if (onOpenCalendar) onOpenCalendar();
            else window.dispatchEvent(new Event('open-hindu-calendar'));
          }}
          title="आज का पञ्चाङ्ग एवं हिन्दू कैलेण्डर · Open full Vedic Hindu Calendar"
          aria-label="Open Hindu Calendar and Daily Pañcāṅga"
        >
          <span className="home-daily-panchang-icon" aria-hidden="true">🕉️</span>
          <div className="home-daily-panchang-main">
            <span className="home-daily-panchang-kicker">आज का पञ्चाङ्गम् · Daily Pañcāṅga</span>
            <span className="home-daily-panchang-tithi">{homePanchang.formattedTithiPill}</span>
            <span className="home-daily-panchang-meta">
              <span>{homePanchang.vara} · {homePanchang.varaEn}</span>
              <span className="home-daily-panchang-dot" aria-hidden="true">·</span>
              <span>{homePanchang.nakshatra} · {homePanchang.nakshatraEn}</span>
              <span className="home-daily-panchang-dot" aria-hidden="true">·</span>
              <span>{homePanchang.timeIST}</span>
            </span>
          </div>
          <span className="home-daily-panchang-cta">
            <span>📅 कैलेण्डर</span>
            <span className="home-daily-panchang-arrow" aria-hidden="true">→</span>
          </span>
        </button>
        {thinkLabsUnlocked ? (
          <a className="home-daily-panchang-lab" href="/cosmic-alignment-lab/">How to read a Pañcāṅga · Open Cosmic Alignment →</a>
        ) : (
          <button
            type="button"
            className="home-daily-panchang-lab"
            onClick={() => {
              if (!currentUser) openAuthModal('login');
              else openPaymentModal();
            }}
            style={{ cursor: 'pointer', border: 'none', background: 'inherit', font: 'inherit', textAlign: 'inherit' }}
          >
            How to read a Pañcāṅga · Cosmic Alignment (All-Access)
          </button>
        )}
      </section>

      {/* Workbooks + Writing Studio (moved above Vijñāna Lab) */}
      <section className="home-features-section" aria-label="Workbooks and Writing Studio">
        <div className="home-features-grid">
            {/* Practice Vault: Workbooks, Quizzes & CBSE Worksheets Showcase (moved above Writing Studio) */}
            <div style={{ gridColumn: '1 / -1', minWidth: 0 }}>
              <PracticeVaultShowcase
                onOpenQuiz={onOpenQuiz}
                onOpenWorksheets={onOpenWorksheets}
                onOpenResources={onOpenResources}
              />
            </div>

            {/* Feature 4b: लेखन-शाला · Writing Studio */}
            {onOpenAssignmentEvaluator && (
              <div className="home-feature-card home-feature-card--full" id="writing-studio">
                <div className="home-feature-card-top">
                  <div className="home-feature-icon-row">
                    <span className="home-feature-icon">✍️</span>
                    <span className="home-feature-badge">Handwriting &amp; Composition Studio</span>
                  </div>
                  <h3 className="home-feature-title">लेखन-शाला · Writing Studio — Guided Writing Paths &amp; Feedback on Your Written Sanskrit</h3>
                  <p className="home-feature-desc">
                    Once you can read the letters, learn to write them — then compose and get your written Sanskrit checked.
                  </p>
                  <ul className="home-feature-points">
                    <li>Guided sequential writing paths (क्रमिक-लेखन-अभ्यासः): basics → shlokas → Class 7–9</li>
                    <li>Stroke-by-stroke handwriting practice for clean Devanāgarī</li>
                    <li>Paste or upload written work for Pāṇinian grammar feedback</li>
                    <li>CBSE letter (पत्र) and paragraph (अनुच्छेद) writing practice</li>
                  </ul>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="home-feature-btn"
                    style={{ flex: 1, minWidth: '150px', background: '#1b352f', color: '#ffffff' }}
                    onClick={onOpenAssignmentEvaluator}
                  >
                    Open Writing Studio ▶
                  </button>
                </div>
              </div>
            )}
        </div>
      </section>

      {/* Vijñāna Lab banner (moved down) */}
      {onOpenScienceLab && <HomeLabBanner onOpen={onOpenScienceLab} />}

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
          <h2 className="home-section-title">अध्ययन-मार्गाः · Choose Your Track</h2>
          <p className="home-section-subtitle">
            Whether you are learning your first Sanskrit syllable, researching Pāṇinian linguistics, computing mental math, or preparing for exams:
          </p>
        </div>

        <div className="home-pathways-grid">
          {/* Visual poster panels: Course / Grammar / Vedic Math */}
          {onOpenCourse && (
            <div className="home-pathway-card vposter vposter--course">
              <div className="vposter-art" aria-hidden="true">
                <svg viewBox="0 0 220 90" className="vposter-svg">
                  <g fill="none" stroke="#6366f1" strokeWidth="1.6" opacity=".55">
                    <path d="M40 45 H95 M125 45 H180" strokeDasharray="4 4" />
                  </g>
                  <g fontFamily="inherit" fontSize="11" textAnchor="middle" fill="#3730a3">
                    <circle cx="30" cy="45" r="22" fill="#eef2ff" stroke="#a5b4fc" />
                    <text x="30" y="49">Input</text>
                    <circle cx="110" cy="45" r="22" fill="#e0e7ff" stroke="#818cf8" />
                    <text x="110" y="49">Rules</text>
                    <circle cx="190" cy="45" r="22" fill="#eef2ff" stroke="#a5b4fc" />
                    <text x="190" y="49">Meaning</text>
                  </g>
                </svg>
              </div>
              <span className="vposter-kicker">क्रमबद्ध-पाठ्यक्रमः · Structured Course</span>
              <h3 className="vposter-title">🧠 Think in Sanskrit &amp; Computational Logic</h3>
              <div className="vposter-chips">
                <span>6 modules</span><span>28 lessons</span><span>Logic + Linguistics</span>
              </div>
              <button type="button" className="vposter-btn" onClick={onOpenCourse}>
                पाठ्यक्रमम् आरभत · Explore 28-Lesson Course ▶
              </button>
            </div>
          )}

          <div className="home-pathway-card vposter vposter--grammar">
            <div className="vposter-art" aria-hidden="true">
              <svg viewBox="0 0 220 90" className="vposter-svg">
                <g stroke="#65a30d" strokeWidth="1.5" fill="none" opacity=".6">
                  <path d="M110 30 V48 M110 48 L45 66 M110 48 L110 66 M110 48 L175 66" />
                </g>
                <g fontSize="12" textAnchor="middle" fill="#3f6212">
                  <rect x="78" y="6" width="64" height="24" rx="12" fill="#ecfccb" stroke="#bef264" />
                  <text x="110" y="23">√गम्</text>
                  <rect x="15" y="64" width="60" height="22" rx="11" fill="#f7fee7" stroke="#d9f99d" />
                  <text x="45" y="80">गच्छति</text>
                  <rect x="80" y="64" width="60" height="22" rx="11" fill="#f7fee7" stroke="#d9f99d" />
                  <text x="110" y="80">गतः</text>
                  <rect x="145" y="64" width="60" height="22" rx="11" fill="#f7fee7" stroke="#d9f99d" />
                  <text x="175" y="80">गमनम्</text>
                </g>
              </svg>
            </div>
            <span className="vposter-kicker">पाणिनीय-व्याकरणम् · Pāṇinian Grammar</span>
            <h3 className="vposter-title">🌿 Master Cases &amp; Verb Roots Without Rote Fear</h3>
            <div className="vposter-chips">
              <span>7 Vibhaktis</span><span>5 lakāras</span><span>🔊 1-tap audio</span>
            </div>
            <button type="button" className="vposter-btn" onClick={onOpenDhatupatha || onOpenGrammar}>
              व्याकरण-मण्डलम् · Launch Dhātupāṭha &amp; Vyakaran ▶
            </button>
          </div>

          {onOpenVedicMaths && (
            <div className="home-pathway-card vposter vposter--maths">
              <div className="vposter-art" aria-hidden="true">
                <svg viewBox="0 0 220 90" className="vposter-svg">
                  <g fontSize="15" textAnchor="middle" fill="#92400e">
                    <text x="62" y="30">97</text>
                    <text x="62" y="52">× 96</text>
                    <line x1="40" y1="60" x2="85" y2="60" stroke="#d97706" strokeWidth="1.4" />
                    <text x="62" y="80" fontWeight="700">9312</text>
                  </g>
                  <g fill="none" stroke="#f59e0b" opacity=".5">
                    <circle cx="160" cy="45" r="34" />
                    <polygon points="160,13 189,62 131,62" />
                    <polygon points="160,77 131,28 189,28" />
                  </g>
                  <text x="160" y="50" fontSize="13" textAnchor="middle" fill="#92400e">16 सूत्र</text>
                </svg>
              </div>
              <span className="vposter-kicker">वेदाङ्ग-गणितम् · Speed Math &amp; Heritage</span>
              <h3 className="vposter-title">⚡ Solve Multi-Step Math in a Single Line</h3>
              <div className="vposter-chips">
                <span>16 sutras</span><span>Tirtha, 1965</span><span>Digital-root check</span>
              </div>
              <button type="button" className="vposter-btn" onClick={onOpenVedicMaths}>
                गणित-सूत्र-शिक्षणम् · Start Vaidic Gaṇitam ▶
              </button>
            </div>
          )}

          {/* Pathway 6 / Feature Card: Chitra-Kavya & The Sanskrit Knight's Tour (Fills the remaining 3 columns) */}
          <ChitraKavyaPathwayCard
            onOpenTurangaBandha={onOpenTurangaBandha}
            onOpenGrammar={onOpenGrammar}
            onOpenCourse={onOpenCourse}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Core Features Grid - Real Learner Outcomes
          ------------------------------------------------------------------ */}
      <section className="home-features-section">
        <div className="home-section-header">
          <span className="home-section-tag">फलश्रुतिः · Real Learner Outcomes</span>
          <h2 className="home-section-title">यत् प्राप्स्यथ · What You Will Achieve · Results-Driven संस्कृत Mastery</h2>
          <p className="home-section-subtitle">
            शुष्कं कण्ठस्थीकरणं न। Every module delivers tangible, measurable outcomes—from reading your first word in 7 days to achieving top CBSE exam marks.
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
                <h3 className="home-feature-title">संस्कृत्या चिन्तयत · Think in Sanskrit &amp; Discover the Computational Logic of Pāṇini</h3>
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
              <h3 className="home-feature-title">मूलपाठम् अवगच्छत · Read the Original Text</h3>
              <p className="home-feature-desc">
                Classical stories, shlokas and NCERT chapters, line by line—tap any word to hear it and see its meaning.
              </p>
              <ul className="home-feature-points">
                <li>Translation language: English, Hindi, Telugu, Tamil or Malayalam</li>
                <li>Anvaya: poetic word order made plain</li>
                <li>Grammar notes on each word (root, vibhakti)</li>
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
              <h3 className="home-feature-title">शब्दकोशः · Build a 6,000+ Sanskrit Vocabulary Through Addictive 3-Minute Games</h3>
              <p className="home-feature-desc">
                Retain words effortlessly by snapping syllable tiles together, matching trilingual meanings, and unlocking visual story rewards without tedious rote drills.
              </p>
              <ul className="home-feature-points">
                <li>Accelerate vocabulary recall 3× faster than traditional memorization</li>
                <li>Master matra joining (e.g. क + आ → का) and letter ligatures hands-on</li>
                <li>
                  <button
                    type="button"
                    className="home-feature-inline-link"
                    onClick={() => onOpenBoard('match')}
                    title="Play 18 Match-the-Following categories"
                  >
                    🎯 18 Match-the-Following categories
                  </button>
                  : actions, relationships, time, vastu, ayurveda, occupations &amp; genders
                </li>
                <li>
                  <button
                    type="button"
                    className="home-feature-inline-link"
                    onClick={() => onOpenBoard('prahelika')}
                    title="Solve Classical Sanskrit Riddles (प्रहेलिकाः)"
                  >
                    📜 Classical Sanskrit Riddles (प्रहेलिकाः)
                  </button>
                  : Antarālāpikā internal-answer verses, poetic paradoxes &amp; Gurukul wit
                </li>
                <li>
                  <button
                    type="button"
                    className="home-feature-inline-link"
                    onClick={() => onOpenBoard('maze', 'maze_thirsty_crow')}
                    title="Play Panchatantra Word Maze story quests"
                  >
                    🦁 Word Maze story quests
                  </button>
                  : navigate Panchatantra story paths, avoid traps &amp; assemble full sentences
                </li>
                <li>7 themed shelves covering animals, daily objects, verbs, and nature</li>
                <li>Instant encouraging feedback with direct links back to textbook lessons</li>
              </ul>
            </div>
            <button
              type="button"
              className="home-feature-btn"
              onClick={() => onOpenBoard?.('jodo')}
            >
              Play जोडो &amp; Sanskrit Games ▶
            </button>
          </div>

          {/* Feature 4: Varṇamālā Studio */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">🔤</span>
                <span className="home-feature-badge">Phonetics &amp; Reading Studio</span>
              </div>
              <h3 className="home-feature-title">वर्णमाला · Learn to Read Sanskrit Confidently in 7 Days with Guided Audio Practice</h3>
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
                onClick={() => onOpenVarnamala?.()}
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
              <h3 className="home-feature-title">विभक्तयः · Master All 7 Cases (Vibhaktis) &amp; Verb Forms Without Rote Confusion</h3>
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
              <h3 className="home-feature-title">धातुपातः · Deconstruct Any Complex Sanskrit Word to Its Root in Seconds</h3>
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
              <h3 className="home-feature-title">वैदिक-गणितम् · Solve Multi-Step Math Problems Mentally in a Single Line</h3>
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
              <h3 className="home-feature-title">सङ्ख्याः · Count, Tell Time, and Master Sanskrit Numbers from 1 to 100</h3>
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
                <h3 className="home-feature-title">परीक्षा-सिद्धिः · Achieve 95%+ in CBSE Sanskrit Exams with Target Worksheets &amp; Mocks</h3>
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
                <h3 className="home-feature-title">निःशुल्क-सामग्री · Access 50+ Free Downloadable Sanskrit Cheat Sheets, Audio &amp; Charts</h3>
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

      {/* ------------------------------------------------------------------
          Vedic Indian Knowledge System (भारतीय ज्ञान परंपरा) Showcase
          ------------------------------------------------------------------ */}
      <VedicKnowledgeSystemShowcase
        onOpenPhilosophy={onOpenPhilosophy}
        onOpenVedicMaths={onOpenVedicMaths}
        onOpenScienceLab={onOpenScienceLab}
        onOpenGrammar={onOpenGrammar}
        onOpenReader={onOpenReader}
        onOpenCourse={onOpenCourse}
        imageSrc="/images/vedic-indian-knowledge-system-v2.jpg"
        imageWebpSrc="/images/vedic-indian-knowledge-system-v2.webp"
        imageAlt="Vedic Indian Knowledge System · भारतीय ज्ञान परंपरा — Philosophy (Darshana), Mathematics (Ganita), Martial Arts & Warfare (Dhanurveda), Statecraft & Polity, Cosmology & Astronomy, History, Ayurveda, Architecture (Vastu), and Grammar & Linguistics"
        imageWidth={1920}
        imageHeight={1072}
        artBadge="Indian Knowledge Systems"
      />

      {/* ------------------------------------------------------------------
          Sanskrit Online Classes with Bodhi Showcase (Direct Lessons)
          ------------------------------------------------------------------ */}
      <section className="home-online-classes-section" id="online-classes" aria-label="Sanskrit Direct Lessons and Classes">
        <div className="hoc-header">
          <div className="hoc-badge">
            <span>🎓 DIRECT GUIDED LESSONS</span>
          </div>
          <h2 className="hoc-title">
            Direct Guided Lessons
            <span className="hoc-title-sa">प्रत्यक्ष-पाठाः · Instant 1-Tap Access</span>
          </h2>
          <p className="hoc-subtitle">
            Jump straight into interactive micro-lessons across Spoken Sanskrit, CBSE, Grammar, and Vedic Math.
          </p>
        </div>

        <div className="hoc-grid">
          {/* Track 1: Spoken Sanskrit */}
          <div className="hoc-card">
            <div>
              <div className="hoc-card-header-row">
                <span className="hoc-card-icon" aria-hidden="true">🗣️</span>
                <span className="hoc-card-badge">Level 1</span>
              </div>
              <h3 className="hoc-card-title">Spoken Sanskrit</h3>
              <p className="hoc-card-desc">
                Pronunciation, 400+ aksharas &amp; daily dialogue.
              </p>
              <div className="hoc-lesson-links">
                <button
                  type="button"
                  className="hoc-lesson-pill"
                  onClick={() => onOpenVarnamala?.()}
                  title="Open Lesson 1: Varnamala Alphabet & Sounds"
                >
                  <span className="hoc-pill-num">1</span>
                  <span className="hoc-pill-label">वर्णमाला · Alphabet &amp; Sounds</span>
                  <span className="hoc-pill-arrow" aria-hidden="true">➔</span>
                </button>

                <button
                  type="button"
                  className="hoc-lesson-pill"
                  onClick={() => onOpenReader('simple-sentences')}
                  title="Open Lesson 2: Greetings & Daily Dialogue"
                >
                  <span className="hoc-pill-num">2</span>
                  <span className="hoc-pill-label">शिष्टाचारः · Daily Greetings</span>
                  <span className="hoc-pill-arrow" aria-hidden="true">➔</span>
                </button>

                <button
                  type="button"
                  className="hoc-lesson-pill"
                  onClick={() => onOpenReader('numbers')}
                  title="Open Lesson 3: Numbers 1–100"
                >
                  <span className="hoc-pill-num">3</span>
                  <span className="hoc-pill-label">सङ्ख्याः · Numbers 1–100</span>
                  <span className="hoc-pill-arrow" aria-hidden="true">➔</span>
                </button>
              </div>
            </div>
            <button
              type="button"
              className="hoc-card-btn"
              onClick={() => onOpenVarnamala?.()}
            >
              Explore Spoken Lessons ➔
            </button>
          </div>

          {/* Track 2: CBSE School Track */}
          <div className="hoc-card">
            <div>
              <div className="hoc-card-header-row">
                <span className="hoc-card-icon" aria-hidden="true">🏫</span>
                <span className="hoc-card-badge">Classes 6–10</span>
              </div>
              <h3 className="hoc-card-title">CBSE Exam Prep</h3>
              <p className="hoc-card-desc">
                NCERT solutions, sandhi breakdown &amp; mock papers.
              </p>
              <div className="hoc-lesson-links">
                <button
                  type="button"
                  className="hoc-lesson-pill"
                  onClick={() => onOpenReader('gsde101')}
                  title="Open Class 7 Chapter 1: Subhashitani"
                >
                  <span className="hoc-pill-num">Ch 1</span>
                  <span className="hoc-pill-label">सुभाषितानि · Gems of Wisdom</span>
                  <span className="hoc-pill-arrow" aria-hidden="true">➔</span>
                </button>

                <button
                  type="button"
                  className="hoc-lesson-pill"
                  onClick={() => onOpenReader('gsde102')}
                  title="Open Class 7 Chapter 2: Durbuddhir Vinashyati"
                >
                  <span className="hoc-pill-num">Ch 2</span>
                  <span className="hoc-pill-label">दुर्बुद्धिः विनश्यति · Turtle Fable</span>
                  <span className="hoc-pill-arrow" aria-hidden="true">➔</span>
                </button>

                <button
                  type="button"
                  className="hoc-lesson-pill"
                  onClick={() => onOpenReader('gsde103')}
                  title="Open Class 7 Chapter 3: Swavalambanam"
                >
                  <span className="hoc-pill-num">Ch 3</span>
                  <span className="hoc-pill-label">स्वावलम्बनम् · Self-Reliance</span>
                  <span className="hoc-pill-arrow" aria-hidden="true">➔</span>
                </button>
              </div>
            </div>
            <button
              type="button"
              className="hoc-card-btn"
              onClick={() => (onOpenCbseGuide ? onOpenCbseGuide() : onOpenReader('gsde101'))}
            >
              Browse CBSE Chapters ➔
            </button>
          </div>

          {/* Track 3: Paninian Vyakaran */}
          <div className="hoc-card">
            <div>
              <div className="hoc-card-header-row">
                <span className="hoc-card-icon" aria-hidden="true">🏛️</span>
                <span className="hoc-card-badge">Classical</span>
              </div>
              <h3 className="hoc-card-title">Pāṇinian Grammar</h3>
              <p className="hoc-card-desc">
                Deconstruct verb roots (Dhātu), 7 Vibhaktis &amp; Sandhi.
              </p>
              <div className="hoc-lesson-links">
                <button
                  type="button"
                  className="hoc-lesson-pill"
                  onClick={onOpenGrammar}
                  title="Open Lesson: 7 Vibhakti Cases"
                >
                  <span className="hoc-pill-num">1</span>
                  <span className="hoc-pill-label">७ विभक्तयः · Case Declensions</span>
                  <span className="hoc-pill-arrow" aria-hidden="true">➔</span>
                </button>

                <button
                  type="button"
                  className="hoc-lesson-pill"
                  onClick={() => (onOpenDhatupatha ? onOpenDhatupatha() : onOpenGrammar())}
                  title="Open Lesson: 2,000+ Dhatupatha Verb Roots"
                >
                  <span className="hoc-pill-num">2</span>
                  <span className="hoc-pill-label">धातुपाठः · 2,000+ Verb Roots</span>
                  <span className="hoc-pill-arrow" aria-hidden="true">➔</span>
                </button>

                <button
                  type="button"
                  className="hoc-lesson-pill"
                  onClick={onOpenGrammar}
                  title="Open Lesson: Sandhi Rules"
                >
                  <span className="hoc-pill-num">3</span>
                  <span className="hoc-pill-label">सन्धि-प्रकरणम् · Sandhi Rules</span>
                  <span className="hoc-pill-arrow" aria-hidden="true">➔</span>
                </button>
              </div>
            </div>
            <button
              type="button"
              className="hoc-card-btn"
              onClick={onOpenGrammar}
            >
              Open Grammar Studio ➔
            </button>
          </div>

          {/* Track 4: Vedic Math */}
          <div className="hoc-card">
            <div>
              <div className="hoc-card-header-row">
                <span className="hoc-card-icon" aria-hidden="true">⚡</span>
                <span className="hoc-card-badge">Mental Agility</span>
              </div>
              <h3 className="hoc-card-title">Vedic Mathematics</h3>
              <p className="hoc-card-desc">
                16 Vedic Sutras for lightning mental arithmetic &amp; roots.
              </p>
                          </div>
            <button
              type="button"
              className="hoc-card-btn"
              onClick={() => (onOpenVedicMaths ? onOpenVedicMaths() : onOpenCourse?.())}
            >
              Practice 16 Sutras ➔
            </button>
          </div>
        </div>

      </section>

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

              </section>

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
          <p style={{ margin: '0.6rem 0 0' }}>
            <a href="/sanskrit-videos/" style={{ color: '#9a3412', fontWeight: 700 }}>दृश्य-पाठाः · All video lessons →</a>
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
                  onClick={() => onOpenVarnamala?.()}
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
          Meet Bodhi (बोधिः) — AI Mentor Positioning, Scope, Safeguards & Interactions
          ------------------------------------------------------------------ */}
      <BodhiMentorPositioning
        onOpenBodhi={onOpenBodhi}
        onOpenOnlineClasses={onOpenOnlineClasses}
        onOpenVarnamala={onOpenVarnamala}
      />

      {/* ------------------------------------------------------------------
          In the Age of AI Deep-Dive Callout
          ------------------------------------------------------------------ */}
      {onOpenPhilosophy && (
        <section style={{ maxWidth: '1100px', margin: '0 auto 3rem', padding: '0 1rem' }} aria-label="Sanskrit in the Age of AI">
          <div style={{
            background: 'linear-gradient(135deg, #fffdf8 0%, #fdf8ee 50%, #faede6 100%)',
            border: '1.5px solid #ebdcc5',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 24px rgba(179, 71, 47, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}>
            <div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#b3472f',
                background: '#faede6',
                border: '1px solid #f2cfc5',
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'inline-block',
                marginBottom: '0.5rem',
              }}>
                दर्शनम् · DARŚANA ESSAY
              </span>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2b2118', margin: '0 0 0.35rem' }}>
                Why Learn a Language — Especially Sanskrit — in the Age of AI
              </h4>
              <p style={{ fontSize: '0.98rem', fontWeight: 700, color: '#9a3423', margin: '0 0 0.4rem' }}>
                Machines will make communication efficient. They will not make it living.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                Language was never only a pipe for information. It is also how a mind binds to breath, sound, culture, and attention. Explore why Pāṇinian phonetics, acoustic resonance, and human presence cannot be replaced by automated prompts.
              </p>
            </div>

            <div>
              <button
                type="button"
                className="home-btn-primary"
                style={{ background: '#7c2d12', padding: '0.55rem 1.25rem', fontSize: '0.88rem' }}
                onClick={onOpenPhilosophy}
              >
                Read Philosophy Essay ➔
              </button>
            </div>
          </div>
        </section>
      )}

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
        onStartLesson={() => {
          window.dispatchEvent(new CustomEvent('start-free-audio-lesson'));
          const el = document.getElementById('audio-lesson') || document.getElementById('poq-audio-lesson');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          else onOpenReader('gsde101');
        }}
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
