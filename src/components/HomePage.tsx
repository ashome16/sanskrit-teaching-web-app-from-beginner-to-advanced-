import React, { useState } from 'react';
import { playPronunciation } from '../utils/pronunciation';
import FAQSection from './FAQSection';
import { useAuthStore } from '../store/authStore';
import '../styles/home-page.css';

export interface HomePageProps {
  onOpenReader: (lessonId?: string) => void;
  onOpenBoard: () => void;
  onOpenVarnamala: () => void;
  onOpenGrammar: () => void;
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
    num: 'Chapter 1',
    title: 'वन्दे भारतमातरम्',
    english: 'Salutations to Mother India',
    icon: '🇮🇳',
    category: 'shlokas',
    genreBadge: 'प्रार्थना · Patriotism',
    theme: 'National prayer celebrating the natural and spiritual glory of India',
    grammarFocus: 'सम्बोधनम् & द्वितीया-विभक्तिः',
  },
  {
    id: 'gsde102',
    num: 'Chapter 2',
    title: 'नित्यं पिबामः सुभाषितरसम्',
    english: 'Daily Nectar of Wise Sayings',
    icon: '📜',
    category: 'shlokas',
    genreBadge: 'सुभाषितानि · Moral Wisdom',
    theme: 'Timeless morals on sweet speech, charity, virtue, and steadfast conduct',
    grammarFocus: 'प्रथमा-तृतीया विभक्तयः, अव्ययानि',
  },
  {
    id: 'gsde103',
    num: 'Chapter 3',
    title: 'मित्राय नमः',
    english: 'Salutations to the Friend (Sun)',
    icon: '☀️',
    category: 'dialogue',
    genreBadge: 'संवादः · Health & Yoga',
    theme: 'Conversation on Surya Namaskar, physical wellness, and solar salutations',
    grammarFocus: 'चतुर्थी-विभक्तिः (नमः योगे)',
  },
  {
    id: 'gsde104',
    num: 'Chapter 4',
    title: 'न लभ्यते चेत् आम्लं द्राक्षाफलम्',
    english: 'Sour Grapes (Animal Fable)',
    icon: '🍇',
    category: 'stories',
    genreBadge: 'नीतिकथा · Animal Fable',
    theme: 'Humorous fable of the thirsty fox and sour grapes illustrating rationalization',
    grammarFocus: 'लट्-लकारः, विशेषण-विशेष्यम्',
  },
  {
    id: 'gsde105',
    num: 'Chapter 5',
    title: 'सेवा हि परमो धर्मः',
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
];

const HomePage: React.FC<HomePageProps> = ({
  onOpenReader,
  onOpenBoard,
  onOpenVarnamala,
  onOpenGrammar,
}) => {
  const [selectedDemo, setSelectedDemo] = useState<DemoWord>(DEMO_WORDS[0]);
  const [curriculumCategory, setCurriculumCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { openAuthModal } = useAuthStore();

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
        <div className="home-hero-badge">
          <span>🕉️</span>
          <span className="home-hero-badge-sanskrit">
            सरस्वति नमस्तुभ्यं वरदे कामरूपिणि
          </span>
        </div>

        <h1 className="home-hero-title">
          Master Sanskrit Through Interactive Sound &amp; Stories
          <span className="home-hero-title-dev">
            संस्कृत-शिक्षण-मञ्चः · सम्पूर्णं सरल-संस्कृतम्
          </span>
        </h1>

        <p className="home-hero-subtitle">
          An intuitive, interactive learning platform designed for NCERT Class 7 school students,
          beginners, and language enthusiasts. Experience word-by-word instant audio analysis,
          gamified tile puzzles, complete grammar declensions, and trilingual meanings without friction.
        </p>

        <div className="home-hero-actions">
          <button
            type="button"
            className="home-btn-primary"
            onClick={() => onOpenReader('gsde101')}
          >
            📖 Read Deepakam Class 7
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
        </div>

        {/* Live Platform Highlights */}
        <div className="home-stats-grid">
          <div className="home-stat-item">
            <span className="home-stat-val">15</span>
            <span className="home-stat-label">NCERT Chapters &amp; Appendices</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-val">5,160+</span>
            <span className="home-stat-label">Words with Native Audio</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-val">7</span>
            <span className="home-stat-label">Interactive Puzzle Shelves</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-val">100%</span>
            <span className="home-stat-label">Vocabulary Trilingual Gloss</span>
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
                <span className="home-feature-badge">NCERT Grade 7</span>
              </div>
              <h3 className="home-feature-title">Interactive Deepakam Reader</h3>
              <p className="home-feature-desc">
                Study the complete 15 lessons from Class 7 NCERT textbook 'दीपकम्'. Click any word to hear crystal-clear pronunciation,
                inspect syllable breakdowns, and see trilingual meanings instantly without scrolling!
              </p>
              <ul className="home-feature-points">
                <li>Word-by-word instant dictionary lookup</li>
                <li>Full sentence and paragraph audio auto-play</li>
                <li>Clear Hindi &amp; English paragraph translations</li>
              </ul>
            </div>
            <button
              type="button"
              className="home-feature-btn"
              onClick={() => onOpenReader('gsde101')}
            >
              Open Textbook Reader ▶
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
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Curriculum Directory (Class 7 Deepakam All 15 Lessons)
          ------------------------------------------------------------------ */}
      <section className="home-curriculum-section">
        <div className="home-section-header">
          <span className="home-section-tag">Full NCERT Curriculum</span>
          <h2 className="home-section-title">Complete 15 Lessons Directory</h2>
          <p className="home-section-subtitle">
            Explore the entire NCERT Class 7 'दीपकम्' syllabus. Every chapter features full Sanskrit text,
            Hindi translation, audio recitation, and complete word-by-word grammar analysis.
          </p>
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
                School Curriculum
              </span>
              <h3 className="home-pathway-title">🎒 NCERT Class 7 Student</h3>
              <p className="home-pathway-desc">
                Follow the 15 Deepakam chapters sequentially. Read each shloka, play audio to perfect your recitation,
                and click unfamiliar words to see their full grammatical analysis and Hindi meanings.
              </p>
            </div>
            <button
              type="button"
              className="home-pathway-btn"
              onClick={() => onOpenReader('gsde101')}
            >
              Start Chapter 1 (वन्दे भारतमातरम्) ▶
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
        </div>
      </section>

      {/* ------------------------------------------------------------------
          FAQ & 2-Week Trial Pricing Section
          ------------------------------------------------------------------ */}
      <FAQSection onOpenRegister={() => openAuthModal('register')} />

      {/* ------------------------------------------------------------------
          Footer Call to Action
          ------------------------------------------------------------------ */}
      <footer className="home-footer-cta">
        <div className="home-footer-shloka">
          भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती ।
        </div>
        <p className="home-footer-meaning">
          &ldquo;Among all languages, the divine tongue of Sanskrit is the foremost, sweet, and pure.&rdquo;
        </p>

        <div className="home-footer-links">
          <button type="button" className="home-footer-link" onClick={() => onOpenReader('gsde101')}>
            📖 Deepakam Textbook
          </button>
          <button type="button" className="home-footer-link" onClick={onOpenBoard}>
            🧩 जोडो Tile Puzzle
          </button>
          <button type="button" className="home-footer-link" onClick={onOpenVarnamala}>
            🔤 Varṇamālā Alphabet
          </button>
          <button type="button" className="home-footer-link" onClick={onOpenGrammar}>
            📚 Grammar Reference
          </button>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
