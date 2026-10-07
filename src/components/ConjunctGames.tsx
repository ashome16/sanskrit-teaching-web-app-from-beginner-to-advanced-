import React, { useState, useMemo } from 'react';
import { playPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import '../styles/conjunct-games.css';

// ---------------------------------------------------------------------------
// DATA: Game 1 - Drop the Stick (दण्ड-त्यागः)
// ---------------------------------------------------------------------------
interface StemOption {
  dev: string;
  roman: string;
  halfDev: string;
  name: string;
  partners: {
    partnerDev: string;
    partnerRoman: string;
    resultDev: string;
    resultRoman: string;
    exampleWord: string;
    exampleRoman: string;
    meaning: string;
  }[];
}

const STEM_OPTIONS: StemOption[] = [
  {
    dev: 'स',
    roman: 'sa',
    halfDev: 'स्',
    name: 'Sa with Walking Stick',
    partners: [
      {
        partnerDev: 'त',
        partnerRoman: 'ta',
        resultDev: 'स्त',
        resultRoman: 'sta',
        exampleWord: 'अस्ति',
        exampleRoman: 'as-ti',
        meaning: 'It is / There is (Exists)',
      },
      {
        partnerDev: 'त',
        partnerRoman: 'ta',
        resultDev: 'स्त',
        resultRoman: 'sta',
        exampleWord: 'नमस्ते',
        exampleRoman: 'na-mas-te',
        meaning: 'Salutations / Greetings to you!',
      },
      {
        partnerDev: 'य',
        partnerRoman: 'ya',
        resultDev: 'स्य',
        resultRoman: 'sya',
        exampleWord: 'तस्य',
        exampleRoman: 'tas-ya',
        meaning: 'His / Of that',
      },
      {
        partnerDev: 'म',
        partnerRoman: 'ma',
        resultDev: 'स्म',
        resultRoman: 'sma',
        exampleWord: 'स्मरणम्',
        exampleRoman: 'sma-ra-nam',
        meaning: 'Memory / Remembrance',
      },
    ],
  },
  {
    dev: 'प',
    roman: 'pa',
    halfDev: 'प्',
    name: 'Pa with Walking Stick',
    partners: [
      {
        partnerDev: 'त',
        partnerRoman: 'ta',
        resultDev: 'प्त',
        resultRoman: 'pta',
        exampleWord: 'प्राप्तम्',
        exampleRoman: 'praap-tam',
        meaning: 'Obtained / Received',
      },
      {
        partnerDev: 'य',
        partnerRoman: 'ya',
        resultDev: 'प्य',
        resultRoman: 'pya',
        exampleWord: 'रूप्यकम्',
        exampleRoman: 'roop-ya-kam',
        meaning: 'Silver coin / Rupee',
      },
      {
        partnerDev: 'न',
        partnerRoman: 'na',
        resultDev: 'प्न',
        resultRoman: 'pna',
        exampleWord: 'स्वप्नः',
        exampleRoman: 'swap-nah',
        meaning: 'Dream',
      },
    ],
  },
  {
    dev: 'त',
    roman: 'ta',
    halfDev: 'त्',
    name: 'Ta with Walking Stick',
    partners: [
      {
        partnerDev: 'य',
        partnerRoman: 'ya',
        resultDev: 'त्य',
        resultRoman: 'tya',
        exampleWord: 'सत्यम्',
        exampleRoman: 'sat-yam',
        meaning: 'Truth / Reality',
      },
      {
        partnerDev: 'त',
        partnerRoman: 'ta',
        resultDev: 'त्त',
        resultRoman: 'tta',
        exampleWord: 'उत्तमम्',
        exampleRoman: 'ut-ta-mam',
        meaning: 'Excellent / Supreme',
      },
      {
        partnerDev: 'व',
        partnerRoman: 'va',
        resultDev: 'त्व',
        resultRoman: 'tva',
        exampleWord: 'महत्त्वम्',
        exampleRoman: 'ma-hat-tvam',
        meaning: 'Importance / Greatness',
      },
    ],
  },
  {
    dev: 'न',
    roman: 'na',
    halfDev: 'न्',
    name: 'Na with Walking Stick',
    partners: [
      {
        partnerDev: 'य',
        partnerRoman: 'ya',
        resultDev: 'न्य',
        resultRoman: 'nya',
        exampleWord: 'धन्यम्',
        exampleRoman: 'dhan-yam',
        meaning: 'Blessed / Thankful',
      },
      {
        partnerDev: 'न',
        partnerRoman: 'na',
        resultDev: 'न्न',
        resultRoman: 'nna',
        exampleWord: 'अन्नम्',
        exampleRoman: 'an-nam',
        meaning: 'Sacred Food / Grain',
      },
    ],
  },
  {
    dev: 'म',
    roman: 'ma',
    halfDev: 'म्',
    name: 'Ma with Walking Stick',
    partners: [
      {
        partnerDev: 'य',
        partnerRoman: 'ya',
        resultDev: 'म्य',
        resultRoman: 'mya',
        exampleWord: 'रम्यम्',
        exampleRoman: 'ram-yam',
        meaning: 'Charming / Beautiful',
      },
    ],
  },
  {
    dev: 'च',
    roman: 'cha',
    halfDev: 'च्',
    name: 'Cha with Walking Stick',
    partners: [
      {
        partnerDev: 'छ',
        partnerRoman: 'chha',
        resultDev: 'च्छ',
        resultRoman: 'ccha',
        exampleWord: 'इच्छा',
        exampleRoman: 'ic-chaa',
        meaning: 'Wish / Desire',
      },
    ],
  },
  {
    dev: 'ब',
    roman: 'ba',
    halfDev: 'ब्',
    name: 'Ba with Walking Stick',
    partners: [
      {
        partnerDev: 'द',
        partnerRoman: 'da',
        resultDev: 'ब्द',
        resultRoman: 'bda',
        exampleWord: 'शब्दः',
        exampleRoman: 'shab-dah',
        meaning: 'Sound / Word',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// DATA: Game 2 - Piggyback Ride (ऊर्ध्वाधः संयोगः)
// ---------------------------------------------------------------------------
interface PiggybackOption {
  carrierDev: string;
  carrierRoman: string;
  carrierTrait: string;
  riderDev: string;
  riderRoman: string;
  resultDev: string;
  resultRoman: string;
  exampleWord: string;
  exampleRoman: string;
  meaning: string;
}

const PIGGYBACK_OPTIONS: PiggybackOption[] = [
  {
    carrierDev: 'द',
    carrierRoman: 'da',
    carrierTrait: 'Chubby round base',
    riderDev: 'व',
    riderRoman: 'va',
    resultDev: 'द्व',
    resultRoman: 'dva',
    exampleWord: 'द्वन्द्व',
    exampleRoman: 'dvan-dva',
    meaning: 'Double / Twice / Dual',
  },
  {
    carrierDev: 'द',
    carrierRoman: 'da',
    carrierTrait: 'Chubby round base',
    riderDev: 'ध',
    riderRoman: 'dha',
    resultDev: 'द्ध',
    resultRoman: 'ddha',
    exampleWord: 'युद्धम्',
    exampleRoman: 'yud-dham',
    meaning: 'Battle / Epic Struggle',
  },
  {
    carrierDev: 'द',
    carrierRoman: 'da',
    carrierTrait: 'Chubby round base',
    riderDev: 'ध',
    riderRoman: 'dha',
    resultDev: 'द्ध',
    resultRoman: 'ddha',
    exampleWord: 'बुद्धः',
    exampleRoman: 'bud-dhah',
    meaning: 'The Awakened One (Buddha)',
  },
  {
    carrierDev: 'द',
    carrierRoman: 'da',
    carrierTrait: 'Chubby round base',
    riderDev: 'य',
    riderRoman: 'ya',
    resultDev: 'द्य',
    resultRoman: 'dya',
    exampleWord: 'विद्या',
    exampleRoman: 'vid-yaa',
    meaning: 'Sacred Knowledge & Learning',
  },
  {
    carrierDev: 'द',
    carrierRoman: 'da',
    carrierTrait: 'Chubby round base',
    riderDev: 'द',
    riderRoman: 'da',
    resultDev: 'द्द',
    resultRoman: 'dda',
    exampleWord: 'उद्देश्यम्',
    exampleRoman: 'ud-desh-yam',
    meaning: 'Goal / Intention',
  },
  {
    carrierDev: 'ह',
    carrierRoman: 'ha',
    carrierTrait: 'Hollow chest letter',
    riderDev: 'म',
    riderRoman: 'ma',
    resultDev: 'ह्म',
    resultRoman: 'hma',
    exampleWord: 'ब्रह्मा',
    exampleRoman: 'brah-maa',
    meaning: 'Lord Brahma / Creator',
  },
  {
    carrierDev: 'ह',
    carrierRoman: 'ha',
    carrierTrait: 'Hollow chest letter',
    riderDev: 'न',
    riderRoman: 'na',
    resultDev: 'ह्न',
    resultRoman: 'hna',
    exampleWord: 'अपराह्नः',
    exampleRoman: 'apa-raah-nah',
    meaning: 'Afternoon',
  },
  {
    carrierDev: 'ट',
    carrierRoman: 'ta',
    carrierTrait: 'Round bottom pot',
    riderDev: 'ट',
    riderRoman: 'ta',
    resultDev: 'ट्ट',
    resultRoman: 'tta',
    exampleWord: 'पट्टिका',
    exampleRoman: 'pat-ti-kaa',
    meaning: 'Signboard / Slate',
  },
];

// ---------------------------------------------------------------------------
// DATA: Game 3 - Superhero Shape-Shifters (रूपांतरिणः महावीराः)
// ---------------------------------------------------------------------------
interface SuperheroOption {
  heroTitle: string;
  heroIcon: string;
  source1Dev: string;
  source1Roman: string;
  source2Dev: string;
  source2Roman: string;
  resultDev: string;
  resultRoman: string;
  soundCue: string;
  kidWord: string;
  kidWordRoman: string;
  meaning: string;
  superpower: string;
}

const SUPERHERO_OPTIONS: SuperheroOption[] = [
  {
    heroTitle: 'The Cosmic Shield (ढाल-वीरः)',
    heroIcon: '🛡️',
    source1Dev: 'क्',
    source1Roman: 'k',
    source2Dev: 'ष',
    source2Roman: 'sha',
    resultDev: 'क्ष',
    resultRoman: 'ksha',
    soundCue: 'Big throat cough sound followed by quiet "shhh"',
    kidWord: 'कक्षा',
    kidWordRoman: 'kak-shaa',
    meaning: 'Your school classroom!',
    superpower: 'Deflects noise and protects knowledge!',
  },
  {
    heroTitle: 'The Star Rocket (अग्नि-बाणः)',
    heroIcon: '🚀',
    source1Dev: 'त्',
    source1Roman: 't',
    source2Dev: 'र',
    source2Roman: 'ra',
    resultDev: 'त्र',
    resultRoman: 'tra',
    soundCue: 'Sharp laser blast "Trrr!"',
    kidWord: 'मित्रम्',
    kidWordRoman: 'mit-ram',
    meaning: 'Your best friend!',
    superpower: 'Blasts through space like a laser rocket!',
  },
  {
    heroTitle: 'The Eye of Wisdom (ज्ञान-ऋषिः)',
    heroIcon: '👁️',
    source1Dev: 'ज्',
    source1Roman: 'j',
    source2Dev: 'ञ',
    source2Roman: 'nya',
    resultDev: 'ज्ञ',
    resultRoman: 'jnya',
    soundCue: 'Nasal palate resonance "Jñya"',
    kidWord: 'ज्ञानम्',
    kidWordRoman: 'jnyaa-nam',
    meaning: 'Wisdom, science and deep insight!',
    superpower: 'Reveals the truth hidden in all things!',
  },
  {
    heroTitle: 'The Royal Crown (राज-मुकुटः)',
    heroIcon: '👑',
    source1Dev: 'श्',
    source1Roman: 'sh',
    source2Dev: 'र',
    source2Roman: 'ra',
    resultDev: 'श्र',
    resultRoman: 'shra',
    soundCue: 'Soft wind hiss rolling into swift "r"',
    kidWord: 'श्रीः',
    kidWordRoman: 'shreeh',
    meaning: 'Auspicious radiance & respect!',
    superpower: 'Brings prosperity and harmony everywhere!',
  },
  {
    heroTitle: 'The Sky-Surfer Repha (व्योम-पङ्खः)',
    heroIcon: '🦅',
    source1Dev: 'र्',
    source1Roman: 'r',
    source2Dev: 'य',
    source2Roman: 'ya',
    resultDev: 'र्य',
    resultRoman: 'rya',
    soundCue: 'Curved solar wing riding on top of the next letter!',
    kidWord: 'सूर्यः',
    kidWordRoman: 'soor-yah',
    meaning: 'The golden Sun who lights the world!',
    superpower: 'Flies above the roof to become a shining solar crown!',
  },
];

// ---------------------------------------------------------------------------
// DATA: Quiz Challenge Levels (स्तरानुकूल-स्पर्धा)
// ---------------------------------------------------------------------------
interface QuizQuestion {
  id: string;
  level: 1 | 2 | 3;
  tag: string;
  question: string;
  targetGlyph?: string;
  targetMeta?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- LEVEL 1: ROOKIE SCOUT (बाल-वीर) ---
  {
    id: 'q1',
    level: 1,
    tag: 'Rule 1 · Drop the Stick',
    question: 'In the word अस्ति (asti = "it is here"), which letter dropped its walking stick to hug त?',
    targetGlyph: 'अस्ति',
    targetMeta: 'as-ti · It is / exists',
    options: ['Letter स (Sa)', 'Letter अ (A)', 'Letter त (Ta)', 'Letter म (Ma)'],
    correctIndex: 0,
    explanation: 'Correct! "स" has a long walking stick on its right side. To hug "त", it drops the stick, turns skinny (स्), and makes "स्त".',
  },
  {
    id: 'q2',
    level: 1,
    tag: 'Rule 2 · Piggyback Ride',
    question: 'Round letters like द (Da) and ट (Ta) don’t have a vertical stick to drop! How do they join their friends?',
    targetGlyph: 'द & ट',
    targetMeta: 'Round / Chubby letters',
    options: ['They give the next friend a piggyback ride underneath!', 'They disappear completely', 'They add a circle above', 'They drop their tail'],
    correctIndex: 0,
    explanation: 'Correct! Chubby round letters like द and ट cannot drop a stick. Instead, the second letter scoots underneath for a piggyback ride (e.g. द्व, ट्ट)!',
  },
  {
    id: 'q3',
    level: 1,
    tag: 'Rule 1 · The Magic Hug',
    question: 'When letter त (Ta) drops its stick and hugs य (Ya), what sacred conjunct does it create?',
    targetGlyph: 'त् + य = ?',
    targetMeta: 'Inside the word सत्यम् (satyam)',
    options: ['त्य', 'स्त', 'प्य', 'द्य'],
    correctIndex: 0,
    explanation: 'Awesome! त् + य forms "त्य", which you see in iconic Sanskrit words like सत्यम् (Satyam - Truth) and नित्यम् (Nityam).',
  },
  {
    id: 'q4',
    level: 1,
    tag: 'Rule 1 · Common Words',
    question: 'Which conjunct is hiding in the universal Indian greeting नमस्ते (namaste)?',
    targetGlyph: 'नमस्ते',
    targetMeta: 'na-mas-te · Greetings / Salutations',
    options: ['स्त (स् + त)', 'प्य (प् + य)', 'त्य (त् + य)', 'क्त (क् + त)'],
    correctIndex: 0,
    explanation: 'Spot on! न + म + स् + त + े. The "स" drops its stick to hold hands with "त", forming "स्त".',
  },

  // --- LEVEL 2: WORD DETECTIVE (शब्द-शोधक) ---
  {
    id: 'q5',
    level: 2,
    tag: 'Level 2 · Word Detective',
    question: 'Deconstruct the word विद्या (vidyā = knowledge). What two consonants are riding together in the conjunct?',
    targetGlyph: 'विद्या',
    targetMeta: 'vid-yaa · Knowledge & Learning',
    options: ['द् + य (Da carrier + Ya rider)', 'द् + व (Da + Va)', 'द् + ध (Da + Dha)', 'त् + य (Ta + Ya)'],
    correctIndex: 0,
    explanation: 'Brilliant! द is round and cannot drop a stick, so य jumps right below it to form "द्य" in विद्या!',
  },
  {
    id: 'q6',
    level: 2,
    tag: 'Level 2 · Stacking Master',
    question: 'In the sacred word बुद्धः (The Buddha / Awakened), what two consonants are stacked?',
    targetGlyph: 'बुद्धः',
    targetMeta: 'bud-dhah · The Awakened One',
    options: ['द् + ध', 'द् + द', 'त् + ध', 'ब् + ध'],
    correctIndex: 0,
    explanation: 'Exactly right! द (Da) holds ध (Dha) underneath in a piggyback ride to create "द्ध" in बुद्धः and युद्धम्!',
  },
  {
    id: 'q7',
    level: 2,
    tag: 'Level 2 · Word Detective',
    question: 'In the sentence "सत्यमेव जयते", which letter is the skinny half-letter that dropped its stick?',
    targetGlyph: 'सत्यम्',
    targetMeta: 'sat-yam · Truth alone triumphs',
    options: ['त् (Half Ta)', 'स् (Half Sa)', 'म् (Half Ma)', 'य् (Half Ya)'],
    correctIndex: 0,
    explanation: 'Spot on! त् dropped its vertical stick to join य, creating the conjunct त्य in सत्यम्.',
  },
  {
    id: 'q8',
    level: 2,
    tag: 'Level 2 · Hollow Letter',
    question: 'In ब्रह्मा (Lord Brahma), which letter jumped into the hollow chest of ह (Ha)?',
    targetGlyph: 'ह् + म = ह्म',
    targetMeta: 'brah-maa · Creator of the Universe',
    options: ['Letter म (Ma)', 'Letter न (Na)', 'Letter य (Ya)', 'Letter व (Va)'],
    correctIndex: 0,
    explanation: 'Outstanding! ह has no vertical stick, so म nestles inside the curve/underneath to form "ह्म".',
  },

  // --- LEVEL 3: SUPERHERO MASTER (संयोग-पण्डित) ---
  {
    id: 'q9',
    level: 3,
    tag: 'Level 3 · Superhero Fusion',
    question: 'When क् and ष join forces in the fusion reactor, which superhero glyph do they form?',
    targetGlyph: 'क् + ष = ?',
    targetMeta: 'Word: कक्षा (classroom) & वृक्षः (tree)',
    options: ['क्ष (The Shield Hero)', 'ज्ञ (The Seer)', 'श्र (The Crown)', 'त्र (The Rocket)'],
    correctIndex: 0,
    explanation: 'Kaboom! क् + ष completely fuses into "क्ष", the superhero shield glyph seen in कक्षा (classroom) and रक्षा (protection)!',
  },
  {
    id: 'q10',
    level: 3,
    tag: 'Level 3 · The Classic Trap',
    question: 'Many beginners mistakenly think "ज्ञ" is formed by ग + य. What are the REAL two letters behind ज्ञ (ज्ञानम्)?',
    targetGlyph: 'ज्ञ',
    targetMeta: 'jnya · Inside ज्ञानम् (Wisdom / Science)',
    options: ['ज् + ञ (Ja + Nya)', 'ग + य (Ga + Ya)', 'ज + य (Ja + Ya)', 'क + य (Ka + Ya)'],
    correctIndex: 0,
    explanation: 'Genius! In Paninian phonetics, ज्ञ is strictly formed by ज् + ञ (palatal voiced stop + palatal nasal). Never let someone fool you into thinking it is ग + य!',
  },
  {
    id: 'q11',
    level: 3,
    tag: 'Level 3 · Flying Repha',
    question: 'In the word सूर्यः (Sūrya = The Sun), what happened to the consonant र् (Ra)?',
    targetGlyph: 'सूर्यः',
    targetMeta: 'soor-yah · The Sun',
    options: ['It became a sky-surfer (रेफ) and flew to the top of य', 'It dropped a stick', 'It jumped underneath य', 'It transformed into त्र'],
    correctIndex: 0,
    explanation: 'Superb! When र् comes first before a consonant without a vowel, it flies onto the top roof like a solar crescent feather called रेफ (Repha)!',
  },
  {
    id: 'q12',
    level: 3,
    tag: 'Level 3 · The Rocket Blast',
    question: 'Which superhero letter is called "The Rocket" and is formed by त् + र?',
    targetGlyph: 'त् + र = ?',
    targetMeta: 'Word: मित्रम् (best friend)',
    options: ['त्र (The Rocket Hero)', 'क्र', 'प्र', 'ध्र'],
    correctIndex: 0,
    explanation: 'Bullseye! त् + र rockets into "त्र", the dynamic glyph seen in मित्रम्, पत्रम्, and छात्रः!',
  },
];

// ---------------------------------------------------------------------------
// POSTERS LIST
// ---------------------------------------------------------------------------
const CONJUNCT_POSTERS = [
  {
    id: 'game1',
    number: 'GAME 1',
    title: 'The "Drop the Stick" Game · दण्ड-त्यागः',
    subtitle: 'Vertical stem consonants drop their stick to hug their friend',
    src: './conjunct-game1.jpg',
    alt: 'Sanskrit conjunct consonant Drop the Stick game for kids',
    rule: 'Rule: Letters with a walking stick on the right (स, प, त, न, म, च, ब) drop their stick, turn skinny (स्, प्, त्, न्), and hold hands with their friend (स्त, प्य, त्य)!',
  },
  {
    id: 'game2',
    number: 'GAME 2',
    title: 'The "Piggyback Ride" Stacking Game · ऊर्ध्वाधः संयोगः',
    subtitle: 'Chubby round letters give friends a ride underneath',
    src: './conjunct-game2.jpg',
    alt: 'Sanskrit conjunct Piggyback Ride stacking game for school children',
    rule: 'Rule: Round letters without sticks (द, ट, ठ, ड, ढ, ह) cannot drop a stick. Instead, the second letter scoots right underneath them for a piggyback ride (द्व, ट्ट, द्ध, ह्म)!',
  },
  {
    id: 'game3',
    number: 'GAME 3',
    title: 'The Superhero Shape-Shifters · रूपांतरिणः महावीराः',
    subtitle: 'Secret agents that fuse into completely brand new superhero symbols',
    src: './conjunct-game3.jpg',
    alt: 'Sanskrit conjunct Superhero Shape-Shifters game for beginners',
    rule: 'Rule: When secret agent letters team up, they morph into completely new superhero symbols: क् + ष = क्ष (The Shield), त् + र = त्र (The Rocket), ज् + ञ = ज्ञ (The Seer)!',
  },
];

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
const ConjunctGames: React.FC = () => {
  // Top level mode: 'forges' | 'arena' | 'posters'
  const [activeMode, setActiveMode] = useState<'forges' | 'arena' | 'posters'>('forges');

  // Sub-game for Forge: 1 | 2 | 3
  const [activeForgeGame, setActiveForgeGame] = useState<1 | 2 | 3>(1);

  // Score & Streaks
  const [score, setScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sanskrit_conjunct_score');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [streak, setStreak] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);

  // --- Game 1 Interactive Forge States ---
  const [selectedStemIdx, setSelectedStemIdx] = useState<number>(0);
  const [selectedPartnerIdx, setSelectedPartnerIdx] = useState<number>(0);
  const [isStickDropped, setIsStickDropped] = useState<boolean>(true);
  const [isFused, setIsFused] = useState<boolean>(true);

  // --- Game 2 Interactive Forge States ---
  const [selectedPiggyIdx, setSelectedPiggyIdx] = useState<number>(0);
  const [isPiggyStacked, setIsPiggyStacked] = useState<boolean>(true);

  // --- Game 3 Superhero Fusion States ---
  const [selectedHeroIdx, setSelectedHeroIdx] = useState<number>(0);
  const [isHeroFused, setIsHeroFused] = useState<boolean>(true);

  // --- Quiz Arena States ---
  const [activeQuizLevel, setActiveQuizLevel] = useState<1 | 2 | 3>(1);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [levelCompleted, setLevelCompleted] = useState<boolean>(false);

  // Filter questions for active quiz level
  const levelQuestions = useMemo(
    () => QUIZ_QUESTIONS.filter((q) => q.level === activeQuizLevel),
    [activeQuizLevel]
  );
  const currentQuestion = levelQuestions[currentQIndex] || levelQuestions[0];

  // Helper to persist score
  const addPoints = (points: number) => {
    setScore((prev) => {
      const next = prev + points;
      try {
        localStorage.setItem('sanskrit_conjunct_score', next.toString());
      } catch {
        // ignore storage error
      }
      return next;
    });
  };

  // --- Handlers for Game 1 ---
  const handleDropStick = () => {
    soundEffects.playPuzzleSnap();
    setIsStickDropped(true);
  };

  const handleFuseTogether = () => {
    soundEffects.playSuccessDing();
    setIsFused(true);
    addPoints(25);
  };

  const handleSelectStem = (idx: number) => {
    setSelectedStemIdx(idx);
    setSelectedPartnerIdx(0);
    setIsStickDropped(true);
    setIsFused(true);
    soundEffects.playStrokeChime();
  };

  // --- Handlers for Game 2 ---
  const handlePiggyJump = () => {
    soundEffects.playSuccessDing();
    setIsPiggyStacked(true);
    addPoints(25);
  };

  const handleSelectPiggy = (idx: number) => {
    setSelectedPiggyIdx(idx);
    setIsPiggyStacked(true);
    soundEffects.playStrokeChime();
  };

  // --- Handlers for Game 3 ---
  const handleHeroActivate = () => {
    soundEffects.playCelebrationChime();
    setIsHeroFused(true);
    addPoints(50);
  };

  const handleSelectHero = (idx: number) => {
    setSelectedHeroIdx(idx);
    setIsHeroFused(true);
    soundEffects.playStrokeChime();
  };

  // --- Quiz Handlers ---
  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
    setIsAnswerSubmitted(true);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      soundEffects.playSuccessDing();
      const levelMultiplier = activeQuizLevel * 100;
      const streakBonus = streak >= 3 ? 50 : 0;
      addPoints(levelMultiplier + streakBonus);
      setStreak((s) => s + 1);
      setStars((st) => st + 1);
    } else {
      soundEffects.playPuzzleSnap();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < levelQuestions.length) {
      setCurrentQIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      soundEffects.playCelebrationChime();
      setLevelCompleted(true);
    }
  };

  const handleRestartQuiz = (level: 1 | 2 | 3) => {
    setActiveQuizLevel(level);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setLevelCompleted(false);
    soundEffects.playStrokeChime();
  };

  // Current active data references
  const currentStem = STEM_OPTIONS[selectedStemIdx];
  const currentPartner = currentStem.partners[selectedPartnerIdx] || currentStem.partners[0];
  const currentPiggy = PIGGYBACK_OPTIONS[selectedPiggyIdx];
  const currentHero = SUPERHERO_OPTIONS[selectedHeroIdx];

  return (
    <div className="cg-container" aria-label="Sanskrit Conjunct Games Studio">
      {/* ===================================================================
          1. CONSOLE STATS & TOP BAR
         =================================================================== */}
      <div className="cg-console-bar">
        <div className="cg-console-left">
          <div className="cg-console-badge" aria-hidden="true">
            🪔
          </div>
          <div className="cg-console-titles">
            <h3>संयुक्त-क्रीडा-मण्डलम् · Sanskrit Conjunct Studio</h3>
            <p>Master half-letters, vertical piggyback stacks &amp; superhero fusions</p>
          </div>
        </div>

        <div className="cg-console-stats">
          <div className="cg-stat-pill" title="Total Experience Score">
            <span>🪙</span>
            <span>{score.toLocaleString()} PTS</span>
          </div>

          <div
            className={`cg-stat-pill${streak >= 2 ? ' cg-streak-active' : ''}`}
            title="Active Streak Multiplier"
          >
            <span>🔥</span>
            <span>Streak {streak}x</span>
          </div>

          <div className="cg-stat-pill" title="Stars Collected">
            <span>⭐</span>
            <span>{stars} Stars</span>
          </div>
        </div>
      </div>

      {/* ===================================================================
          2. PRIMARY MODE SELECTOR TABS
         =================================================================== */}
      <nav className="cg-mode-nav" aria-label="Game Mode Switcher">
        <button
          type="button"
          className={`cg-mode-btn${activeMode === 'forges' ? ' active' : ''}`}
          onClick={() => {
            setActiveMode('forges');
            soundEffects.playStrokeChime();
          }}
        >
          <span>🛠️ Interactive Forges</span>
          <span className="cg-tab-badge">Dynamic Sandbox</span>
        </button>

        <button
          type="button"
          className={`cg-mode-btn${activeMode === 'arena' ? ' active' : ''}`}
          onClick={() => {
            setActiveMode('arena');
            soundEffects.playStrokeChime();
          }}
        >
          <span>🎯 Level Challenge Arena</span>
          <span className="cg-tab-badge">3 Levels · Points</span>
        </button>

        <button
          type="button"
          className={`cg-mode-btn${activeMode === 'posters' ? ' active' : ''}`}
          onClick={() => {
            setActiveMode('posters');
            soundEffects.playStrokeChime();
          }}
        >
          <span>🖼️ Illustrated Posters</span>
          <span className="cg-tab-badge">Comic Boards</span>
        </button>
      </nav>

      {/* ===================================================================
          3. MODE A: INTERACTIVE FORGES (DYNAMIC SANDBOX)
         =================================================================== */}
      {activeMode === 'forges' && (
        <section aria-label="Interactive Ligature Forges">
          {/* Sub-game selection cards */}
          <div className="cg-sub-nav">
            <button
              type="button"
              className={`cg-sub-card${activeForgeGame === 1 ? ' active' : ''}`}
              onClick={() => {
                setActiveForgeGame(1);
                soundEffects.playStrokeChime();
              }}
            >
              <div className="cg-sub-card-icon">🦯</div>
              <div className="cg-sub-card-meta">
                <div className="cg-sub-tag">Game 1 · दण्ड-त्यागः</div>
                <div className="cg-sub-title">Drop the Stick Forge</div>
                <div className="cg-sub-desc">Stem letters drop their stick to hold hands</div>
              </div>
            </button>

            <button
              type="button"
              className={`cg-sub-card${activeForgeGame === 2 ? ' active' : ''}`}
              onClick={() => {
                setActiveForgeGame(2);
                soundEffects.playStrokeChime();
              }}
            >
              <div className="cg-sub-card-icon">🤾</div>
              <div className="cg-sub-card-meta">
                <div className="cg-sub-tag">Game 2 · ऊर्ध्वाधः संयोगः</div>
                <div className="cg-sub-title">Piggyback Stacker</div>
                <div className="cg-sub-desc">Chubby round letters give friends a ride underneath</div>
              </div>
            </button>

            <button
              type="button"
              className={`cg-sub-card${activeForgeGame === 3 ? ' active' : ''}`}
              onClick={() => {
                setActiveForgeGame(3);
                soundEffects.playStrokeChime();
              }}
            >
              <div className="cg-sub-card-icon">⚡</div>
              <div className="cg-sub-card-meta">
                <div className="cg-sub-tag">Game 3 · रूपांतरिणः महावीराः</div>
                <div className="cg-sub-title">Superhero Reactor</div>
                <div className="cg-sub-desc">Secret agents fuse into brand new superhero glyphs</div>
              </div>
            </button>
          </div>

          {/* -------------------------------------------------------------
              GAME 1 FORGE: DROP THE STICK
             ------------------------------------------------------------- */}
          {activeForgeGame === 1 && (
            <div className="cg-forge-panel">
              <div className="cg-forge-header">
                <span className="cg-forge-badge drop-stick">Game 1 · दण्ड-त्यागः</span>
                <h3 className="cg-forge-title">The "Drop the Stick" Forge</h3>
                <p className="cg-forge-subtitle">
                  Consonants that carry a vertical walking stick on their right side (like{' '}
                  <strong>त, म, न, प, स, ब, च</strong>) drop their stick to become a skinny half-letter (
                  <strong>त्, म्, न्, प्, स्</strong>) so they can hug the next letter!
                </p>
              </div>

              {/* Letter Crucible */}
              <div className="cg-chamber">
                {/* Letter Pod 1 */}
                <div className="cg-letter-pod">
                  <span className="cg-pod-label">
                    {isStickDropped ? 'Skinny Letter (Dropped Stick)' : 'With Stick'}
                  </span>
                  <div className="cg-tile-large stem-source">
                    {isStickDropped ? currentStem.halfDev : currentStem.dev}
                    {!isStickDropped && (
                      <span className="cg-tile-stick-badge" title="Walking stick active">
                        🦯 Stick
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {isStickDropped ? `${currentStem.roman} (half)` : currentStem.roman}
                  </span>
                </div>

                <span className="cg-operator">+</span>

                {/* Letter Pod 2 */}
                <div className="cg-letter-pod">
                  <span className="cg-pod-label">Friend Letter</span>
                  <div className="cg-tile-large partner">{currentPartner.partnerDev}</div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {currentPartner.partnerRoman}
                  </span>
                </div>

                <span className="cg-operator">=</span>

                {/* Letter Pod 3: Result */}
                <div className="cg-letter-pod">
                  <span className="cg-pod-label">Together Hug!</span>
                  <div className="cg-tile-large result">
                    {isFused ? currentPartner.resultDev : '?'}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 700 }}>
                    {isFused ? currentPartner.resultRoman : 'Ready to fuse'}
                  </span>
                </div>

                {/* Interactive Action Controls */}
                <div className="cg-chamber-actions">
                  {!isStickDropped ? (
                    <button type="button" className="cg-fuse-btn" onClick={handleDropStick}>
                      <span>🦯 Drop the Stick!</span>
                    </button>
                  ) : !isFused ? (
                    <button type="button" className="cg-fuse-btn" onClick={handleFuseTogether}>
                      <span>🤝 Hug &amp; Fuse Together!</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="cg-fuse-btn"
                      style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                      onClick={() => {
                        soundEffects.playStrokeChime();
                        setIsFused(false);
                        setIsStickDropped(false);
                      }}
                    >
                      <span>🔄 Re-play Hug Animation</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Selector Racks: Pick Stem Letter */}
              <div className="cg-selector-group">
                <div className="cg-selector-label">
                  <span>1. Choose a letter carrying a walking stick:</span>
                </div>
                <div className="cg-tile-rack">
                  {STEM_OPTIONS.map((stem, idx) => (
                    <button
                      key={stem.dev}
                      type="button"
                      className={`cg-rack-tile${selectedStemIdx === idx ? ' selected' : ''}`}
                      onClick={() => handleSelectStem(idx)}
                      title={stem.name}
                    >
                      <span>{stem.dev}</span>
                      <span className="cg-roman-sub">{stem.roman}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector Racks: Pick Partner Letter */}
              <div className="cg-selector-group">
                <div className="cg-selector-label">
                  <span>2. Choose friend to hug:</span>
                </div>
                <div className="cg-tile-rack">
                  {currentStem.partners.map((partner, pIdx) => (
                    <button
                      key={`${partner.partnerDev}-${pIdx}`}
                      type="button"
                      className={`cg-rack-tile${selectedPartnerIdx === pIdx ? ' selected' : ''}`}
                      onClick={() => {
                        setSelectedPartnerIdx(pIdx);
                        setIsFused(true);
                        setIsStickDropped(true);
                        soundEffects.playStrokeChime();
                      }}
                    >
                      <span>{partner.partnerDev}</span>
                      <span className="cg-roman-sub">{partner.partnerRoman}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Word Showcase Spotlight */}
              <div className="cg-word-spotlight">
                <div className="cg-word-details">
                  <div className="cg-word-sa">
                    <span className="cg-word-highlight">{currentPartner.resultDev}</span>
                    {currentPartner.exampleWord.replace(currentPartner.resultDev, '')}
                  </div>
                  <div className="cg-word-text">
                    <span className="cg-word-translit">{currentPartner.exampleRoman}</span>
                    <span className="cg-word-meaning">{currentPartner.meaning}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="cg-audio-btn"
                  onClick={() => playPronunciation(currentPartner.exampleWord)}
                >
                  <span>🔊 Hear Word</span>
                </button>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              GAME 2 FORGE: PIGGYBACK RIDE
             ------------------------------------------------------------- */}
          {activeForgeGame === 2 && (
            <div className="cg-forge-panel">
              <div className="cg-forge-header">
                <span className="cg-forge-badge piggyback">Game 2 · ऊर्ध्वाधः संयोगः</span>
                <h3 className="cg-forge-title">The "Piggyback Ride" Stacker</h3>
                <p className="cg-forge-subtitle">
                  Round and chubby letters (like <strong>द, ट, ठ, ड, ह</strong>) do NOT carry a vertical
                  stick! They cannot drop a stick. Instead, the second friend scoots right underneath
                  them for a vertical piggyback ride!
                </p>
              </div>

              {/* Letter Crucible */}
              <div className="cg-chamber">
                {/* Carrier Pod */}
                <div className="cg-letter-pod">
                  <span className="cg-pod-label">Top Carrier</span>
                  <div className="cg-tile-large stem-source">{currentPiggy.carrierDev}</div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {currentPiggy.carrierRoman} ({currentPiggy.carrierTrait})
                  </span>
                </div>

                <span className="cg-operator">+</span>

                {/* Rider Pod */}
                <div className="cg-letter-pod">
                  <span className="cg-pod-label">Bottom Rider</span>
                  <div className="cg-tile-large partner">{currentPiggy.riderDev}</div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {currentPiggy.riderRoman}
                  </span>
                </div>

                <span className="cg-operator">=</span>

                {/* Stacked Result */}
                <div className="cg-letter-pod">
                  <span className="cg-pod-label">Piggyback Stack!</span>
                  <div className="cg-tile-large result">
                    {isPiggyStacked ? currentPiggy.resultDev : '?'}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 700 }}>
                    {isPiggyStacked ? currentPiggy.resultRoman : 'Ready to stack'}
                  </span>
                </div>

                {/* Interactive Action Controls */}
                <div className="cg-chamber-actions">
                  {!isPiggyStacked ? (
                    <button type="button" className="cg-fuse-btn" onClick={handlePiggyJump}>
                      <span>🤾 Jump Underneath!</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="cg-fuse-btn"
                      style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                      onClick={() => {
                        soundEffects.playStrokeChime();
                        setIsPiggyStacked(false);
                      }}
                    >
                      <span>🔄 Separate &amp; Re-Stack</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Preset Selector */}
              <div className="cg-selector-group">
                <div className="cg-selector-label">
                  <span>Choose a round piggyback pair:</span>
                </div>
                <div className="cg-tile-rack">
                  {PIGGYBACK_OPTIONS.map((piggy, idx) => (
                    <button
                      key={`${piggy.carrierDev}-${piggy.riderDev}-${idx}`}
                      type="button"
                      className={`cg-rack-tile${selectedPiggyIdx === idx ? ' selected' : ''}`}
                      onClick={() => handleSelectPiggy(idx)}
                      title={`${piggy.carrierDev} + ${piggy.riderDev} = ${piggy.resultDev}`}
                    >
                      <span>{piggy.resultDev}</span>
                      <span className="cg-roman-sub">{piggy.resultRoman}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Word Spotlight */}
              <div className="cg-word-spotlight">
                <div className="cg-word-details">
                  <div className="cg-word-sa">
                    <span className="cg-word-highlight">{currentPiggy.resultDev}</span>
                    {currentPiggy.exampleWord.replace(currentPiggy.resultDev, '')}
                  </div>
                  <div className="cg-word-text">
                    <span className="cg-word-translit">{currentPiggy.exampleRoman}</span>
                    <span className="cg-word-meaning">{currentPiggy.meaning}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="cg-audio-btn"
                  onClick={() => playPronunciation(currentPiggy.exampleWord)}
                >
                  <span>🔊 Hear Word</span>
                </button>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              GAME 3 FORGE: SUPERHERO SHAPE-SHIFTERS
             ------------------------------------------------------------- */}
          {activeForgeGame === 3 && (
            <div className="cg-forge-panel">
              <div className="cg-forge-header">
                <span className="cg-forge-badge superhero">Game 3 · रूपांतरिणः महावीराः</span>
                <h3 className="cg-forge-title">The Superhero Shape-Shifter Reactor</h3>
                <p className="cg-forge-subtitle">
                  Absolute secret agents! When these specific letter pairs join forces, they undergo an
                  alchemical metamorphosis and fuse into a completely brand-new superhero glyph!
                </p>
              </div>

              {/* Letter Crucible */}
              <div className="cg-chamber">
                {/* Agent 1 */}
                <div className="cg-letter-pod">
                  <span className="cg-pod-label">Secret Agent 1</span>
                  <div className="cg-tile-large stem-source">{currentHero.source1Dev}</div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {currentHero.source1Roman}
                  </span>
                </div>

                <span className="cg-operator">+</span>

                {/* Agent 2 */}
                <div className="cg-letter-pod">
                  <span className="cg-pod-label">Secret Agent 2</span>
                  <div className="cg-tile-large partner">{currentHero.source2Dev}</div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {currentHero.source2Roman}
                  </span>
                </div>

                <span className="cg-operator">=</span>

                {/* Superhero Result */}
                <div className="cg-letter-pod">
                  <span className="cg-pod-label">{currentHero.heroTitle}</span>
                  <div className="cg-tile-large hero-result">
                    {isHeroFused ? currentHero.resultDev : '?'}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#6d28d9', fontWeight: 800 }}>
                    {isHeroFused ? `${currentHero.heroIcon} ${currentHero.resultRoman}` : 'Fusion Ready'}
                  </span>
                </div>

                {/* Interactive Action Controls */}
                <div className="cg-chamber-actions">
                  {!isHeroFused ? (
                    <button type="button" className="cg-fuse-btn" onClick={handleHeroActivate}>
                      <span>⚡ ACTIVATE SUPERHERO FUSION!</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="cg-fuse-btn"
                      style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}
                      onClick={() => {
                        soundEffects.playStrokeChime();
                        setIsHeroFused(false);
                      }}
                    >
                      <span>🔄 Reset Reactor Chamber</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Superhero Selector Rack */}
              <div className="cg-selector-group">
                <div className="cg-selector-label">
                  <span>Choose a Superhero Shape-Shifter to summon:</span>
                </div>
                <div className="cg-tile-rack">
                  {SUPERHERO_OPTIONS.map((hero, idx) => (
                    <button
                      key={hero.resultDev}
                      type="button"
                      className={`cg-rack-tile${selectedHeroIdx === idx ? ' selected' : ''}`}
                      onClick={() => handleSelectHero(idx)}
                      title={hero.heroTitle}
                    >
                      <span>{hero.resultDev}</span>
                      <span className="cg-roman-sub">{hero.resultRoman}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Word & Lore Spotlight */}
              <div className="cg-word-spotlight">
                <div className="cg-word-details">
                  <div className="cg-word-sa">
                    <span className="cg-word-highlight">{currentHero.resultDev}</span>
                    {currentHero.kidWord.replace(currentHero.resultDev, '')}
                  </div>
                  <div className="cg-word-text">
                    <span className="cg-word-translit">
                      {currentHero.kidWordRoman} · {currentHero.meaning}
                    </span>
                    <span className="cg-word-meaning" style={{ color: '#7c3aed', fontWeight: 700 }}>
                      ⚡ Superpower: {currentHero.superpower}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="cg-audio-btn"
                  onClick={() => playPronunciation(currentHero.kidWord)}
                >
                  <span>🔊 Hear Word</span>
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ===================================================================
          4. MODE B: LEVEL CHALLENGE ARENA (QUIZ & POINT SYSTEM)
         =================================================================== */}
      {activeMode === 'arena' && (
        <section className="cg-arena" aria-label="Level Challenge Quiz Arena">
          {/* Arena Header & Level Selector */}
          <div className="cg-arena-header">
            <div className="cg-level-pills">
              <button
                type="button"
                className={`cg-level-pill-btn${activeQuizLevel === 1 ? ' active' : ''}`}
                onClick={() => handleRestartQuiz(1)}
              >
                <span>🐣 Level 1 · Rookie Scout</span>
              </button>

              <button
                type="button"
                className={`cg-level-pill-btn${activeQuizLevel === 2 ? ' active' : ''}`}
                onClick={() => handleRestartQuiz(2)}
              >
                <span>🔍 Level 2 · Word Detective</span>
              </button>

              <button
                type="button"
                className={`cg-level-pill-btn${activeQuizLevel === 3 ? ' active' : ''}`}
                onClick={() => handleRestartQuiz(3)}
              >
                <span>⚡ Level 3 · Superhero Master</span>
              </button>
            </div>

            <div className="cg-arena-scoreboard">
              <div className="cg-score-box">
                <span>🪙</span>
                <span>+{activeQuizLevel * 100} pts/correct</span>
              </div>
            </div>
          </div>

          {!levelCompleted ? (
            <>
              {/* Question Progress Track */}
              <div className="cg-progress-row">
                <div className="cg-progress-bar-bg">
                  <div
                    className="cg-progress-bar-fill"
                    style={{
                      width: `${((currentQIndex + 1) / levelQuestions.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="cg-progress-text">
                  Question {currentQIndex + 1} of {levelQuestions.length}
                </span>
              </div>

              {/* Active Quiz Question Card */}
              <div className="cg-quiz-card">
                <div className="cg-quiz-q-tag">{currentQuestion.tag}</div>
                <h3 className="cg-quiz-question">{currentQuestion.question}</h3>

                {currentQuestion.targetGlyph && (
                  <div className="cg-quiz-target-box">
                    <span className="cg-target-glyph">{currentQuestion.targetGlyph}</span>
                    {currentQuestion.targetMeta && (
                      <span className="cg-target-meta">{currentQuestion.targetMeta}</span>
                    )}
                  </div>
                )}

                {/* Multiple Choice Options */}
                <div className="cg-options-grid">
                  {currentQuestion.options.map((option, optIdx) => {
                    let btnClass = 'cg-option-btn';
                    if (isAnswerSubmitted) {
                      if (optIdx === currentQuestion.correctIndex) {
                        btnClass += ' correct';
                      } else if (optIdx === selectedAnswer) {
                        btnClass += ' wrong';
                      }
                    } else if (selectedAnswer === optIdx) {
                      btnClass += ' selected';
                    }

                    return (
                      <button
                        key={`${option}-${optIdx}`}
                        type="button"
                        className={btnClass}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleSelectOption(optIdx)}
                      >
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Feedback Panel */}
                {isAnswerSubmitted && (
                  <>
                    <div
                      className={`cg-feedback-panel ${
                        selectedAnswer === currentQuestion.correctIndex ? 'correct' : 'wrong'
                      }`}
                    >
                      <span className="cg-feedback-icon">
                        {selectedAnswer === currentQuestion.correctIndex ? '🎉' : '💡'}
                      </span>
                      <div className="cg-feedback-text">
                        <h4>
                          {selectedAnswer === currentQuestion.correctIndex
                            ? 'Excellent! Correct Answer!'
                            : 'Good effort! Review the rule:'}
                        </h4>
                        <p>{currentQuestion.explanation}</p>
                      </div>
                    </div>

                    <button type="button" className="cg-next-btn" onClick={handleNextQuestion}>
                      <span>
                        {currentQIndex + 1 < levelQuestions.length
                          ? 'Next Question ▶'
                          : 'Complete Level 🏆'}
                      </span>
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            /* Level Complete Screen */
            <div className="cg-results-card">
              <span className="cg-trophy-badge">🏆</span>
              <h3 className="cg-results-title">
                Level {activeQuizLevel} Conquered! · उत्तमम्!
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                You have mastered all conjunct challenges in this tier.
              </p>
              <div className="cg-results-score-display">Total Score: {score} PTS</div>

              <div className="cg-results-btn-row">
                <button
                  type="button"
                  className="cg-next-btn"
                  onClick={() => handleRestartQuiz(activeQuizLevel)}
                >
                  <span>🔄 Replay Level {activeQuizLevel}</span>
                </button>

                {activeQuizLevel < 3 && (
                  <button
                    type="button"
                    className="cg-next-btn"
                    style={{ background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' }}
                    onClick={() => handleRestartQuiz((activeQuizLevel + 1) as 1 | 2 | 3)}
                  >
                    <span>Advance to Level {activeQuizLevel + 1} ▶</span>
                  </button>
                )}

                <button
                  type="button"
                  className="cg-next-btn"
                  style={{ background: '#3b82f6' }}
                  onClick={() => setActiveMode('forges')}
                >
                  <span>🛠️ Practice in Forge</span>
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ===================================================================
          5. MODE C: ILLUSTRATED POSTERS
         =================================================================== */}
      {activeMode === 'posters' && (
        <section className="cg-poster-gallery" aria-label="Original Comic Posters">
          {CONJUNCT_POSTERS.map((poster) => (
            <article key={poster.id} className="cg-poster-item">
              <div className="cg-poster-header">
                <div>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#b45309',
                      textTransform: 'uppercase',
                    }}
                  >
                    {poster.number}
                  </span>
                  <h4 className="cg-poster-title">{poster.title}</h4>
                </div>

                <button
                  type="button"
                  className="cg-audio-btn"
                  onClick={() => {
                    setActiveMode('forges');
                    setActiveForgeGame(poster.id === 'game1' ? 1 : poster.id === 'game2' ? 2 : 3);
                    soundEffects.playStrokeChime();
                  }}
                >
                  <span>🛠️ Open in Interactive Forge</span>
                </button>
              </div>

              <div className="cg-poster-img-wrap">
                <img
                  src={poster.src}
                  alt={poster.alt}
                  className="cg-poster-img"
                  loading="lazy"
                />
              </div>

              <div className="cg-poster-footer">
                <strong>Grammar Core:</strong> {poster.rule}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default ConjunctGames;
