import React, { useState } from 'react';
import { playPronunciation } from '../utils/pronunciation';
import FAQSection from './FAQSection';
import { Grade8SyllabusModal } from './Grade8SyllabusModal';
import { useAuthStore } from '../store/authStore';
import '../styles/home-page.css';

export interface HomePageProps {
  onOpenReader: (lessonId?: string) => void;
  onOpenBoard: () => void;
  onOpenVarnamala: () => void;
  onOpenGrammar: () => void;
  onOpenVedicMaths?: () => void;
  onOpenQuiz?: () => void;
  onOpenWorksheets?: () => void;
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
    num: 'Grade 8 · First Prayer',
    title: 'सरस्वतीप्रार्थना (Page 16)',
    english: 'Prayer to Goddess Saraswati (Yā Kundendu-Tuṣāra-Hāra-Dhavalā)',
    icon: '🪕',
    category: 'shlokas',
    genreBadge: 'प्रार्थना · Sacred Hymn',
    theme: 'Sacred invocation of Goddess Saraswati: dispeller of ignorance and mental inertia, bestower of intellect, seated upon the white lotus',
    grammarFocus: 'सम्बोधन-विभक्तिः, विशेषण-पदानि, विपरीतार्थक-शब्दाः',
  },
  {
    id: 'grade8_ch1',
    num: 'Grade 8 · Chapter 1',
    title: 'संगच्छध्वं संवदध्वम् (Pages 2–8)',
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
];

const HomePage: React.FC<HomePageProps> = ({
  onOpenReader,
  onOpenBoard,
  onOpenVarnamala,
  onOpenGrammar,
  onOpenVedicMaths,
  onOpenQuiz,
  onOpenWorksheets,
}) => {
  const [selectedDemo, setSelectedDemo] = useState<DemoWord>(DEMO_WORDS[0]);
  const [curriculumCategory, setCurriculumCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { openAuthModal } = useAuthStore();
  const [isGrade8ModalOpen, setIsGrade8ModalOpen] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Content', count: CHAPTERS_INFO.length },
    { id: 'stories', label: '📖 Stories & Fables', count: CHAPTERS_INFO.filter((c) => c.category === 'stories').length },
    { id: 'shlokas', label: '📜 Shlokas & Wisdom', count: CHAPTERS_INFO.filter((c) => c.category === 'shlokas').length },
    { id: 'dialogue', label: '💬 Dialogues & Culture', count: CHAPTERS_INFO.filter((c) => c.category === 'dialogue').length },
    { id: 'grammar', label: '📐 Grammar Reference', count: CHAPTERS_INFO.filter((c) => c.category === 'grammar').length },
  ];

  const filteredChapters = CHAPTERS_INFO.filter((ch) => {
    const matchesCategory = curriculumCategory === 'all' || ch.category === curriculumCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesSearch =
      ch.title.toLowerCase().includes(query) ||
      ch.english.toLowerCase().includes(query) ||
      ch.num.toLowerCase().includes(query) ||
      (ch.theme ? ch.theme.toLowerCase().includes(query) : false) ||
      (ch.grammarFocus ? ch.grammarFocus.toLowerCase().includes(query) : false) ||
      (ch.genreBadge ? ch.genreBadge.toLowerCase().includes(query) : false);

    return matchesCategory && matchesSearch;
  });

  const handleDemoClick = (demo: DemoWord) => {
    setSelectedDemo(demo);
    playPronunciation(demo.devanagari);
  };

  return (
    <main className="homepage-container">
      {/* ------------------------------------------------------------------
          Hero Section
          ------------------------------------------------------------------ */}
      <section className="home-hero">
        {/* Gurukul Official Brand Crest */}
        <div className="home-hero-crest">
          <img
            src="/logo.jpg"
            alt="EdNet Learn Gurukul"
            className="home-hero-logo"
          />
          <div className="home-hero-brand-details">
            <h2 className="home-hero-org-title">EdNet Learn Gurukul</h2>
            <div className="home-hero-org-subtitle">गुरुकुलम् · Sanskrit &amp; Vedic Studies</div>
          </div>
        </div>

        <div className="home-hero-badge">
          <span>🕉️</span>
          <span className="home-hero-badge-sanskrit">
            सरस्वति नमस्तुभ्यं वरदे कामरूपिणि
          </span>
        </div>

        <h1 className="home-hero-title">
          Master Sanskrit &amp; Vedic Mathematics
          <span className="home-hero-title-dev">
            संस्कृत-शिक्षण-मञ्चः · CBSE बोर्ड-पाठ्यक्रमः · सम्पूर्णं सरल-संस्कृतम्
          </span>
        </h1>

        <p className="home-hero-subtitle">
          An intuitive, interactive Gurukul learning platform tailored for <strong>CBSE Class 7 Sanskrit Board Exams</strong> (NCERT दीपकम),
          beginners, and Vedic scholars. Experience word-by-word instant audio analysis, shloka anvaya,
          gamified tile puzzles, complete grammar declensions, and speed Vedic Mathematics without friction.
        </p>

        <div className="home-hero-actions">
          <button
            type="button"
            className="home-btn-primary"
            onClick={() => onOpenReader('gsde101')}
          >
            📖 Read CBSE Deepakam Class 7
          </button>
          <button
            type="button"
            className="home-btn-secondary"
            onClick={onOpenBoard}
          >
            🧩 Play जोडो Tile Puzzle
          </button>
          <button
            type="button"
            className="home-btn-secondary"
            onClick={onOpenVarnamala}
          >
            🔤 Varṇamālā Alphabet
          </button>
          <button
            type="button"
            className="home-btn-accent"
            onClick={onOpenGrammar}
          >
            📚 Vyākaraṇa (Grammar)
          </button>
          {onOpenVedicMaths && (
            <button
              type="button"
              className="home-btn-primary"
              style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', boxShadow: '0 4px 12px rgba(180, 83, 9, 0.25)' }}
              onClick={onOpenVedicMaths}
            >
              📐 Vedic Maths (वैदिक-गणितम्)
            </button>
          )}
          {onOpenQuiz && (
            <button
              type="button"
              className="home-btn-accent"
              style={{ background: '#059669', borderColor: '#059669', color: '#fff' }}
              onClick={onOpenQuiz}
            >
              🎯 प्रश्नोत्तरी · Quiz
            </button>
          )}
          {onOpenWorksheets && (
            <button
              type="button"
              className="home-btn-secondary"
              onClick={onOpenWorksheets}
            >
              📑 कार्यपत्रिकाः · Worksheets
            </button>
          )}
        </div>

        {/* Live Platform Highlights */}
        <div className="home-stats-grid">
          <div className="home-stat-item">
            <span className="home-stat-val">15</span>
            <span className="home-stat-label">NCERT Deepakam Chapters</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-val">2,200+</span>
            <span className="home-stat-label">Interactive Tile Puzzles</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-val">16</span>
            <span className="home-stat-label">Vedic Math Sutras</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-val">5,160+</span>
            <span className="home-stat-label">Words with Sanskrit Audio</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Trust & Academic Accreditation Bar
          ------------------------------------------------------------------ */}
      <section className="home-trust-banner" aria-label="Academic Standards">
        <div className="home-trust-item">
          <span className="home-trust-icon">🏛️</span>
          <div className="home-trust-text">
            <strong>CBSE Class 7 Syllabus</strong>
            <span>Aligned with Board Exam pattern &amp; NCERT Textbook 'दीपकम'</span>
          </div>
        </div>
        <div className="home-trust-item">
          <span className="home-trust-icon">🇮🇳</span>
          <div className="home-trust-text">
            <strong>NEP 2020 Compliant</strong>
            <span>Multidisciplinary Sanskrit &amp; computational thinking</span>
          </div>
        </div>
        <div className="home-trust-item">
          <span className="home-trust-icon">🎧</span>
          <div className="home-trust-text">
            <strong>Native Phonetic Speech</strong>
            <span>Varnamala audio synthesis with authentic visarga echoes</span>
          </div>
        </div>
        <div className="home-trust-item">
          <span className="home-trust-icon">🛡️</span>
          <div className="home-trust-text">
            <strong>100% Verified &amp; Safe</strong>
            <span>UPI, Google Pay, Apple Pay &amp; 14-day risk-free trial</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Live Interactive Word Demo Section
          ------------------------------------------------------------------ */}
      <section className="home-demo-section" aria-label="Interactive Word Demo">
        <div className="home-demo-header">
          <h2 className="home-demo-title">
            <span>✨</span> Try the Instant Word Analyzer
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

      {/* ------------------------------------------------------------------
          Core Features Grid
          ------------------------------------------------------------------ */}
      <section className="home-features-section">
        <div className="home-section-header">
          <span className="home-section-tag">Platform Highlights</span>
          <h2 className="home-section-title">Built for Modern, Joyful Learning</h2>
          <p className="home-section-subtitle">
            Every tool in the platform is engineered to make ancient Sanskrit intuitive, engaging, and directly applicable.
          </p>
        </div>

        <div className="home-features-grid">
          {/* Feature 1: Deepakam Reader */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">📖</span>
                <span className="home-feature-badge">CBSE Board Exam · NCERT Class 7</span>
              </div>
              <h3 className="home-feature-title">Interactive Deepakam Reader (CBSE Class 7)</h3>
              <p className="home-feature-desc">
                Study the complete 15 lessons from the prescribed CBSE/NCERT textbook 'दीपकम्'. Click any word to hear crystal-clear pronunciation,
                inspect syllable breakdowns, see trilingual meanings, and master CBSE board question patterns!
              </p>
              <ul className="home-feature-points">
                <li>100% CBSE Class 7 Sanskrit Board Exam Syllabus aligned</li>
                <li>Shloka Anvaya (श्लोकान्वयः) &amp; exam question drills</li>
                <li>Word-by-word instant dictionary lookup &amp; native audio</li>
                <li>Parallel English &amp; Hindi translations for all paragraphs</li>
              </ul>
            </div>
            <button
              type="button"
              className="home-feature-btn"
              onClick={() => onOpenReader('gsde101')}
            >
              Open CBSE Textbook Reader ▶
            </button>
          </div>

          {/* Feature 2: Jodo Tile Puzzle */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">🧩</span>
                <span className="home-feature-badge">Interactive Game</span>
              </div>
              <h3 className="home-feature-title">जोडो (Jodo Tile Puzzle)</h3>
              <p className="home-feature-desc">
                Learn word construction through gamification! Tap consonant and vowel tiles to form matras (e.g. क + आ → का),
                match meanings, and unlock vibrant illustrations with Sanskrit sentences.
              </p>
              <ul className="home-feature-points">
                <li>7 curated shelves: Beginners, Body, Maths, Map, Culture, Grammar &amp; Nature</li>
                <li>Clear 3-step instructions &amp; encouraging feedback</li>
                <li>Seamless website navigation back to lessons</li>
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

          {/* Feature 3: Varṇamālā Studio */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">🔤</span>
                <span className="home-feature-badge">Phonetics Studio</span>
              </div>
              <h3 className="home-feature-title">Varṇamālā &amp; Barakhadi Audio</h3>
              <p className="home-feature-desc">
                The foundation of Sanskrit starts with sound. Master all Swaras (vowels), Vyanjanas (consonants), and Svaras (accents)
                with exact articulation points and native pronunciation audio for every letter.
              </p>
              <ul className="home-feature-points">
                <li>Velars, Palatals, Retroflexes, Dentals &amp; Labials</li>
                <li>Full Barakhadi table (क, का, कि, की, कु, कू...) with audio</li>
                <li>Conjunct consonants (संयुक्ताक्षर) and ligature breakdown</li>
              </ul>
            </div>
            <button
              type="button"
              className="home-feature-btn"
              onClick={onOpenVarnamala}
            >
              Explore Varṇamālā ▶
            </button>
          </div>

          {/* Feature 4: Vyakarana Shelf */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">📚</span>
                <span className="home-feature-badge">Grammar Shelf</span>
              </div>
              <h3 className="home-feature-title">Vyākaraṇa &amp; Vibhakti Guide</h3>
              <p className="home-feature-desc">
                Demystify Sanskrit grammar! Access comprehensive declension tables (Shabdarupani) across all genders and numbers,
                and verb conjugations (Dhaturupams) across all 5 school lakāras.
              </p>
              <ul className="home-feature-points">
                <li>All 7 Vibhaktis (Cases) + Sambodhana with roles &amp; examples</li>
                <li>Noun declensions: Dev, Hari, Guru, Lata, Mati, Phalam, etc.</li>
                <li>Verbs in Lat, Lit, Lot, Lang, and Vidhilin lakāras</li>
              </ul>
            </div>
            <button
              type="button"
              className="home-feature-btn"
              onClick={onOpenGrammar}
            >
              Browse Grammar Shelf ▶
            </button>
          </div>

          {/* Feature 5: Vedic Mathematics */}
          <div className="home-feature-card">
            <div className="home-feature-card-top">
              <div className="home-feature-icon-row">
                <span className="home-feature-icon">📐</span>
                <span className="home-feature-badge" style={{ background: '#fef3c7', color: '#92400e' }}>
                  Speed Math
                </span>
              </div>
              <h3 className="home-feature-title">वैदिक-गणितम् (Vedic Mathematics)</h3>
              <p className="home-feature-desc">
                The Magic of Numbers: An ultra-efficient mental calculation system enabling arithmetic solutions 10 to 15 times
                faster than conventional methods. Explore the 16 Sutras, interactive step-by-step visual solvers, and speed challenges!
              </p>
              <ul className="home-feature-points">
                <li>16 Primary Sutras &amp; 13 Sub-Sutras with Sanskrit audio</li>
                <li>Interactive step-by-step mental math solvers (Ekādhikena, Nikhilaṁ, Ūrdhva)</li>
                <li>Speed Math Practice Challenge &amp; Beejank digital root verification</li>
              </ul>
            </div>
            {onOpenVedicMaths && (
              <button
                type="button"
                className="home-feature-btn"
                style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#ffffff' }}
                onClick={onOpenVedicMaths}
              >
                Launch Vedic Mathematics ▶
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Curriculum Directory (Class 7 Deepakam All 15 Lessons)
          ------------------------------------------------------------------ */}
      <section className="home-curriculum-section">
        <div className="home-section-header">
          <span className="home-section-tag">CBSE Board Exam &amp; NCERT Syllabus</span>
          <h2 className="home-section-title">Complete 15 Lessons Directory · CBSE Class 7 (दीपकम्)</h2>
          <p className="home-section-subtitle">
            Explore the entire NCERT Class 7 'दीपकम्' syllabus mapped to CBSE Board Exam guidelines. Every chapter features full Sanskrit text,
            parallel English &amp; Hindi translations, authentic audio recitation, and complete word-by-word grammar analysis for top exam scores.
          </p>
        </div>

        {/* Grade 8 Syllabus Quick Banner */}
        <div
          className="home-grade8-syllabus-banner"
          onClick={() => setIsGrade8ModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setIsGrade8ModalOpen(true);
          }}
        >
          <div className="g8-banner-left">
            <span className="g8-banner-badge">✨ NEW CURRICULUM ADDITION</span>
            <h3 className="g8-banner-title">अष्टमकक्षा-पाठानुक्रमणिका · Grade 8 Sanskrit Complete Syllabus</h3>
            <p className="g8-banner-desc">
              Explore all 13 textbook chapters, introductory prayers, and grammatical appendices with exact page numbers (Page iii to 173).
            </p>
          </div>
          <button
            type="button"
            className="g8-banner-cta-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsGrade8ModalOpen(true);
            }}
          >
            📜 View Table of Contents ➔
          </button>
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
                    </div>
                    <span className="home-chapter-icon">{ch.icon}</span>
                  </div>

                  <h4 className="home-chapter-title-sanskrit">{ch.title}</h4>
                  <p className="home-chapter-meaning-en">{ch.english}</p>
                  
                  {ch.theme && (
                    <p className="home-chapter-theme-desc">{ch.theme}</p>
                  )}
                </div>

                <div className="home-chapter-card-bottom">
                  {ch.grammarFocus && (
                    <div className="home-grammar-tag">
                      <span className="home-grammar-tag-label">🔖 व्याकरणम्:</span> {ch.grammarFocus}
                    </div>
                  )}

                  <div className="home-chapter-footer-row">
                    <span className="home-chapter-read-cta">
                      Read Lesson ➔
                    </span>
                    {(ch.id === 'grade8_prarthana' || ch.id === 'grade8_ch1' || ch.id === 'grade8_ch2' || ch.id === 'grade8_ch3') && (
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
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------
          Learning Pathways Section
          ------------------------------------------------------------------ */}
      <section className="home-pathways-section">
        <div className="home-section-header">
          <span className="home-section-tag">Guided Journeys</span>
          <h2 className="home-section-title">Choose Your Learning Path</h2>
          <p className="home-section-subtitle">
            Whether you are picking up your very first Sanskrit syllable or prepping for school exams, we have a clear path for you:
          </p>
        </div>

        <div className="home-pathways-grid">
          <div className="home-pathway-card">
            <div>
              <span className="home-pathway-badge home-pathway-badge--beginner">
                Beginner Track
              </span>
              <h3 className="home-pathway-title">🌱 New to Sanskrit?</h3>
              <p className="home-pathway-desc">
                Start with hearing and repeating the 13 vowels and 33 consonants in Varṇamālā. Then head over to the
                Beginners shelf of the जोडो Tile Puzzle to master matra additions.
              </p>
            </div>
            <button
              type="button"
              className="home-pathway-btn"
              onClick={onOpenVarnamala}
            >
              Start with Varṇamālā ▶
            </button>
          </div>

          <div className="home-pathway-card">
            <div>
              <span className="home-pathway-badge home-pathway-badge--school">
                CBSE Board Exam
              </span>
              <h3 className="home-pathway-title">🎒 CBSE Class 7 Student</h3>
              <p className="home-pathway-desc">
                Follow the 15 Deepakam chapters sequentially. Master shloka recitation, anvaya, sandhi,
                and exam question patterns with instant word-by-word grammatical breakdowns and translations.
              </p>
            </div>
            <button
              type="button"
              className="home-pathway-btn"
              onClick={() => onOpenReader('gsde101')}
            >
              Start CBSE Chapter 1 (वन्दे भारतमातरम्) ▶
            </button>
          </div>

          <div className="home-pathway-card">
            <div>
              <span className="home-pathway-badge home-pathway-badge--grammar">
                Grammar Master
              </span>
              <h3 className="home-pathway-title">📖 Grammar &amp; Shlokas</h3>
              <p className="home-pathway-desc">
                Dive straight into noun declensions (Shabdarupani) and verb conjugations (Dhaturupams).
                Learn the 7 vibhakti cases and understand sentence structures like a true scholar.
              </p>
            </div>
            <button
              type="button"
              className="home-pathway-btn"
              onClick={onOpenGrammar}
            >
              Explore Vyākaraṇa Shelf ▶
            </button>
          </div>

          <div className="home-pathway-card">
            <div>
              <span className="home-pathway-badge" style={{ background: '#fef3c7', color: '#92400e' }}>
                Mental Fluency
              </span>
              <h3 className="home-pathway-title">⚡ Vedic Mental Math</h3>
              <p className="home-pathway-desc">
                Conquer arithmetic phobia and compute 10 to 15 times faster! Master the 16 Sutras, instant squaring,
                lightning subtraction without borrowing, and digital root verification.
              </p>
            </div>
            {onOpenVedicMaths && (
              <button
                type="button"
                className="home-pathway-btn"
                style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#ffffff' }}
                onClick={onOpenVedicMaths}
              >
                Start Vedic Maths ▶
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          FAQ & 2-Week Trial Pricing Section
          ------------------------------------------------------------------ */}
      <FAQSection onOpenRegister={() => openAuthModal('register')} />

      <Grade8SyllabusModal
        isOpen={isGrade8ModalOpen}
        onClose={() => setIsGrade8ModalOpen(false)}
        onSelectLesson={(lessonId) => onOpenReader(lessonId)}
      />
    </main>
  );
};

export default HomePage;
