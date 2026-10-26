import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import HomePage from './HomePage';
import FAQSection from './FAQSection';
import WordAnalyzerCard, { type WordSelection } from './WordAnalyzerCard';
import Footer from './Footer';
const SupportWidget = lazy(() => import('./SupportWidget'));
const BodhiGuideWidget = lazy(() => import('./BodhiGuideWidget'));
import { getSearchShortcut } from '../utils/platformShortcut';
import type { SearchItem, SearchTarget } from '../data/searchIndex';
import { categoryForLiteratureAnchor } from '../data/literatureGrammarQuizzes';
import type { VedicTab } from './VedicMaths';
import type { GrammarTopic } from './Grammar';

// Lazy-loaded heavy modules for fast initial homepage performance
const PhilosophyPage = lazy(() => import('./PhilosophyPage'));
const CbseSanskritGuidePage = lazy(() => import('./CbseSanskritGuidePage'));
const FreeResourcesPage = lazy(() => import('./FreeResourcesPage'));
const TextbookReader = lazy(() => import('./TextbookReader'));
const Board = lazy(() => import('./Board'));
const Grammar = lazy(() => import('./Grammar'));
const VedicMaths = lazy(() => import('./VedicMaths'));
const QuizSection = lazy(() => import('./QuizSection'));
const WorksheetSection = lazy(() => import('./WorksheetSection'));
const PaninianStudio = lazy(() => import('./PaninianStudio'));
const SanskritThinkingCourse = lazy(() => import('./SanskritThinkingCourse'));
const CertificatePage = lazy(() => import('./CertificatePage'));
const ScienceLab = lazy(() => import('./scienceLab/ScienceLab'));

// Lazy-loaded dialogs & modals
const AuthModal = lazy(() => import('./AuthModal'));
const UserProfileModal = lazy(() => import('./UserProfileModal'));
const PaymentModal = lazy(() => import('./PaymentModal'));
const AdminModal = lazy(() => import('./AdminModal'));
const GlobalSearchModal = lazy(() => import('./GlobalSearchModal'));
const VoiceSettingsModal = lazy(() => import('./VoiceSettingsModal'));
const BodhiOnlineClassesModal = lazy(() => import('./BodhiOnlineClassesModal'));
const HinduCalendarModal = lazy(() => import('./HinduCalendarModal'));
import { getHinduDate } from '../utils/hinduCalendar';
import '../styles/hindu-calendar.css';
import { useAccessibilityStore } from '../utils/accessibilityStore';

const ViewLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1rem', minHeight: '60vh', color: '#273b35' }}>
    <div style={{ width: '42px', height: '42px', border: '3px solid #e2e8f0', borderTopColor: '#273b35', borderRadius: '50%', animation: 'spin 0.75s linear infinite' }} />
    <div style={{ marginTop: '1.25rem', fontWeight: 700, fontSize: '0.95rem', color: '#475569' }}>Loading Gurukul Learning Module...</div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);
import { useAuthStore } from '../store/authStore';
import { canAccessAllChapters, isFreeTrialOpenLesson } from '../utils/premiumAccess';
import { LESSONS as STATIC_LESSONS, fetchLatestChapters } from '../data/chapters';
import { playLessonText, playPronunciation } from '../utils/pronunciation';
import { expandDigitsInLessonText } from '../utils/lessonNumberSpeech';
import { hasDevanagariLetter, isDandaOrVerseNumberToken } from '../utils/dandaSpeech';
import { readerTokens } from '../utils/readerTokens';
import '../styles/dashboard.css';

/** Conjunct Games live under Grammar now — keep out of Deepakam nav. */
const HIDDEN_DEEPAKAM_IDS = new Set(['samyukta']);

const firstDeepakamIndex = (lessons: typeof STATIC_LESSONS): number => {
  const gsde101 = lessons.findIndex((item) => item.id === 'gsde101');
  if (gsde101 >= 0) return gsde101;
  const gsde = lessons.findIndex((item) => item.id.startsWith('gsde'));
  return gsde >= 0 ? gsde : 0;
};

type DashboardView =
  | 'home'
  | 'board'
  | 'reader'
  | 'grammar'
  | 'vedic-maths'
  | 'quiz'
  | 'worksheets'
  | 'faq'
  | 'philosophy'
  | 'cbse-guide'
  | 'resources'
  | 'dhatupatha'
  | 'course'
  | 'certificate'
  | 'science-lab';

const PHILOSOPHY_PATHS = new Set([
  '/philosophy',
  '/darsana',
  '/darshana',
  '/why-sanskrit-ai',
  '/why-sanskrit',
  '/ai-sanskrit',
]);
const CBSE_GUIDE_PATHS = new Set([
  '/cbse-sanskrit-guide',
  '/ncert-sanskrit-exam',
  '/cbse-sanskrit',
]);
const RESOURCES_PATHS = new Set([
  '/resources',
  '/free-sanskrit-resources',
  '/sanskrit-resources',
  '/events',
  '/news',
  '/live',
  '/updates',
]);
const COURSE_PATHS = new Set([
  '/course',
  '/sanskrit-thinking',
  '/sanskrit-as-a-way-of-thinking',
  '/samskrta-cintanam',
]);

export const VIEW_METADATA: Record<DashboardView, { title: string; desc: string }> = {
  home: {
    title: 'Sanskrit Online Classes & Gurukul Learning: Beginner to Advanced | EdNet Learn',
    desc: 'Interactive Sanskrit online classes with Bodhi: spoken Sanskrit for beginners & kids, 28-lesson curriculum, CBSE NCERT Classes 6–10 coaching, Pāṇinian grammar, and Vedic math with live AI audio feedback.',
  },
  course: {
    title: 'संस्कृत-चिन्तनम् · Sanskrit as a Way of Thinking | EdNet Learn Gurukul',
    desc: 'Complete 6-module curriculum: Sanskrit as an integrated system for taking sound in, processing rules, and producing output. 28 lessons for science and contemplation.',
  },
  'cbse-guide': {
    title: 'CBSE Class 7, 8, 9 & 10 Sanskrit Exam Guide: Blueprint, Question Formation (किम्-पद) & Solved Papers | EdNet Learn',
    desc: 'Master CBSE NCERT Sanskrit exams: official 80-mark blueprint, standardized instructions (निर्देशाः), core question words (क-कार शब्दाः), question formation (प्रश्ननिर्माणम्), and model solutions.',
  },
  resources: {
    title: 'Free Sanskrit Study Vault: NCERT Class 7 Question Bank & CBSE Blueprint Mock Exam | EdNet Learn',
    desc: 'Download complete 15-chapter Class 7 Sanskrit Deepakam question bank, Class 7 & 8 CBSE blueprint mock exam papers, Pāṇinian mouth map, and Koshashri dictionary.',
  },
  worksheets: {
    title: 'CBSE Class 7 & 8 Sanskrit Worksheets, Chapter-wise Practice Exercises & NCERT Solutions | EdNet Learn',
    desc: 'Free printable & interactive CBSE Sanskrit worksheets, translation drills, sandhi practice, and NCERT Deepakam exercise solutions for students.',
  },
  'vedic-maths': {
    title: 'Vaidic Gaṇitam Mastery (वैदिक-गणितम्): 16 Sutras, Fast Mental Math & Astronomy | EdNet Gurukul',
    desc: 'Master fast mental calculation, Vedic geometry, 16 Vedic mathematics sutras, 366-day Vedic astronomical calendar, and ancient metrology with interactive tools.',
  },
  grammar: {
    title: 'CBSE Sanskrit Grammar: Top 100 Shabdroop, 5 Dhaturoop Lakaras, Sandhi & Vibhakti Rules | EdNet Learn',
    desc: 'Interactive Sanskrit Vyakaran guide: declensions (shabdroop), verb conjugations (dhaturoop), sandhi rules, vibhakti charts, and phonetic audio.',
  },
  quiz: {
    title: 'NCERT Class 7 Sanskrit Quizzes & Online Chapter Tests with Instant Solutions | EdNet Learn',
    desc: 'Interactive Sanskrit & Vedic Maths quiz arena: 39+ quiz sets covering CBSE Class 7, 8, 9 Deepakam & Sharada chapters, Vyākaraṇa grammar, and mental speed sutras with instant solutions.',
  },
  board: {
    title: 'Jodo Tile Studio (जोडो): 6,000+ Sanskrit Word Puzzles | EdNet Learn',
    desc: 'Interactive Sanskrit word-building game with 6,000+ puzzles across vocabulary, verbs, anatomy, math, and daily conversation.',
  },
  reader: {
    title: 'NCERT Class 7 Sanskrit Deepakam Solutions & Interactive Reader | EdNet Learn',
    desc: 'Complete NCERT Class 7 Sanskrit Deepakam solutions, chapter-wise verse translations, word-by-word shabdarth, physical textbook page mapping, audio pronunciation, worksheets and quizzes.',
  },
  philosophy: {
    title: 'Why Learn Sanskrit in the Age of AI & Darśana | EdNet Learn Gurukul',
    desc: 'Why learn Sanskrit in the age of AI? Machines will make communication efficient; they will not make it living. Explore transfer vs bind, Pāṇinian phonetics, and mathematical darśana.',
  },
  faq: {
    title: 'Frequently Asked Questions & Help | EdNet Learn Gurukul',
    desc: 'Find answers about subscriptions, UPI payments, NCERT curriculum coverage, interactive puzzles, and learning Sanskrit online.',
  },
  'science-lab': {
    title: 'Science Lab Games · Vijñāna Lab: Preschool to Advanced STEM Physics Sandboxes | EdNet Learn',
    desc: 'Play 16 interactive science lab games and STEM physics sandboxes with Sanskrit terminology from preschool to advanced scholar levels. Build atoms, launch rockets, test gravity, explore cymatics, and soft-land on the Moon.',
  },
  certificate: {
    title: 'Swar · स्वर — Sanskrit Workbook Certificate of Completion | EdNet Learn',
    desc: 'Finished Swar · स्वर — Sanskrit Workbook (The Darśana Series, by Sesha K Penumallu)? Enter your book code, answer one question from each part of the book, score 70% and download or print your colourful certificate.',
  },
  dhatupatha: {
    title: 'Dhātupāṭha & Pāṇinian Verb Engine: 5 Lakāras & Kṛt Pratyayas | EdNet Learn',
    desc: 'Explore the classical Pāṇinian Dhātupāṭha library with 5 CBSE Lakāra conjugations (लट्, लृट्, लङ्, लोट्, विधिलिङ्), Kṛt participles, reverse word deconstructor, and pratyaya quiz.',
  },
};

/** /barakhadi aliases the reader view. Copy is the existing search-index entry, not new marketing. */
export const BARAKHADI_METADATA: { title: string; desc: string } = {
  title: 'बारहखड़ी · Guṇitākṣarāṇi Sound Combinations',
  desc: 'Master all 12+ vowel modifier combinations with every consonant (क् + अ = क, क् + आ = का, etc.) with audio playback and phonetic charts.',
};

const pathToView = (pathname: string): DashboardView | null => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/' || clean === '/home' || clean === '/index' || clean === '/learn-sanskrit-online-free') return 'home';
  if (COURSE_PATHS.has(clean) || clean === '/spoken-sanskrit-course') return 'course';
  if (PHILOSOPHY_PATHS.has(clean)) return 'philosophy';
  if (CBSE_GUIDE_PATHS.has(clean) || clean === '/cbse-sanskrit-classes') return 'cbse-guide';
  if (RESOURCES_PATHS.has(clean)) return 'resources';
  if (clean === '/worksheets') return 'worksheets';
  if (clean === '/vedic-maths' || clean === '/vedic-math') return 'vedic-maths';
  if (clean === '/grammar' || clean === '/sanskrit-grammar-lessons') return 'grammar';
  if (clean === '/dhatupatha' || clean === '/dhatu' || clean === '/dhaturoop') return 'dhatupatha';
  if (clean === '/quiz' || clean === '/quizzes') return 'quiz';
  if (
    clean === '/board' ||
    clean === '/jodo' ||
    clean === '/puzzles' ||
    clean === '/sanskrit-for-kids' ||
    clean === '/match' ||
    clean === '/match-games' ||
    clean === '/maze' ||
    clean === '/word-maze' ||
    clean === '/games' ||
    clean === '/sanskrit-games'
  ) return 'board';
  if (
    clean === '/reader' ||
    clean === '/varnamala' ||
    clean === '/swar' ||
    clean === '/swar-review' ||
    clean === '/swar-quizzes' ||
    clean === '/workbooks' ||
    clean === '/lessons' ||
    clean === '/barakhadi' ||
    clean === '/sanskrit-pronunciation-guide'
  ) return 'reader';
  if (clean === '/faq' || clean === '/help') return 'faq';
  if (clean === '/certificate' || clean === '/swar-certificate') return 'certificate';
  if (
    clean === '/vignana-lab' ||
    clean === '/vignana' ||
    clean === '/vijnana-lab' ||
    clean === '/vijnana' ||
    clean === '/science-lab' ||
    clean === '/science-lab-games'
  ) return 'science-lab';
  return null;
};

const viewToPath = (view: DashboardView): string => {
  if (view === 'course') return '/course';
  if (view === 'philosophy') return '/philosophy';
  if (view === 'cbse-guide') return '/cbse-sanskrit-guide';
  if (view === 'resources') return '/resources';
  if (view === 'worksheets') return '/worksheets';
  if (view === 'vedic-maths') return '/vedic-maths';
  if (view === 'grammar') return '/grammar';
  if (view === 'dhatupatha') return '/dhatupatha';
  if (view === 'quiz') return '/quiz';
  if (view === 'board') return '/board';
  if (view === 'reader') return '/reader';
  if (view === 'faq') return '/faq';
  if (view === 'certificate') return '/certificate';
  if (view === 'science-lab') {
    if (typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '/science-lab') {
      return '/science-lab';
    }
    return '/vignana-lab';
  }
  return '/';
};

const isValidSavedView = (saved: string | null): saved is DashboardView =>
  saved === 'home' ||
  saved === 'course' ||
  saved === 'board' ||
  saved === 'reader' ||
  saved === 'grammar' ||
  saved === 'vedic-maths' ||
  saved === 'quiz' ||
  saved === 'worksheets' ||
  saved === 'faq' ||
  saved === 'philosophy' ||
  saved === 'cbse-guide' ||
  saved === 'resources' ||
  saved === 'dhatupatha' ||
  saved === 'certificate' ||
  saved === 'science-lab';


/** Strip punctuation / digits so only the Devanagari token remains for analysis. */
const cleanWord = (value: string): string =>
  value.replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’\-–—०-९./\\=+#*~_`]+/g, '').trim();

const Dashboard: React.FC = () => {
  const [lessons, setLessons] = useState(STATIC_LESSONS);
  const [lessonIndex, setLessonIndex] = useState(() => {
    try {
      if (window.location.pathname.replace(/\/+$/, '') === '/barakhadi') {
        const bIdx = STATIC_LESSONS.findIndex((item) => item.id === 'barakhadi');
        if (bIdx >= 0) return bIdx;
      }
    } catch {
      /* no window (SSR) */
    }
    const saved = localStorage.getItem('school-lesson-id');
    if (saved && !HIDDEN_DEEPAKAM_IDS.has(saved)) {
      const idx = STATIC_LESSONS.findIndex((item) => item.id === saved);
      if (idx >= 0) return idx;
    }
    const varna = STATIC_LESSONS.findIndex((item) => item.id === 'varnamala');
    return varna >= 0 ? varna : 0;
  });
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [wordSelection, setWordSelection] = useState<WordSelection | null>(null);
  const [isAnalyzerCollapsed, setIsAnalyzerCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<DashboardView>(() => {
    try {
      const fromPath = pathToView(window.location.pathname);
      if (fromPath) return fromPath;
    } catch {}
    const saved = localStorage.getItem('school-active-view');
    if (isValidSavedView(saved)) return saved;
    return 'home';
  });
  const [grammarResetKey, setGrammarResetKey] = useState(0);
  const [grammarTargetTopic, setGrammarTargetTopic] = useState<GrammarTopic>('home');
  const [grammarTargetArticleId, setGrammarTargetArticleId] = useState<string | null>(null);
  const [vedicTarget, setVedicTarget] = useState<{ tab: VedicTab; anchor?: string; key: number }>({ tab: 'sutras', key: 0 });
  const [quizAnchor, setQuizAnchor] = useState<string | null>(() => {
    try {
      if (pathToView(window.location.pathname) !== 'quiz') return null;
      return categoryForLiteratureAnchor(window.location.hash) ? window.location.hash.replace(/^#/, '') : null;
    } catch {
      return null;
    }
  });
  const [varnamalaInitialSubMode, setVarnamalaInitialSubMode] = useState<
    'sound' | 'writing' | 'quizzes' | 'workbooks' | 'worksheets'
  >(() => {
    try {
      const clean = window.location.pathname.replace(/\/+$/, '');
      if (clean === '/swar-review' || clean === '/swar-quizzes' || window.location.hash === '#swar-review') return 'quizzes';
      if (clean === '/workbooks' || window.location.hash === '#workbooks') return 'workbooks';
    } catch {}
    return 'sound';
  });
  const [philosophyEssay, setPhilosophyEssay] = useState<'ai_sanskrit' | 'sunyat_anantam' | 'tagore_sanskrit' | 'music_of_matter' | 'pingala_binary' | 'turanga_bandha' | 'lilavati_math' | 'shad_darshana' | 'medha_mind' | 'ujjain_geodesy'>('ai_sanskrit');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isBodhiGuideOpen, setIsBodhiGuideOpen] = useState(false);
  const [isOnlineClassesOpen, setIsOnlineClassesOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [panchang, setPanchang] = useState(() => getHinduDate());

  // Keep Hindu Panchang date and time updated every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPanchang(getHinduDate());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Allow any section or widget to open the Hindu Calendar modal via event
  useEffect(() => {
    const handleOpenCalendar = () => setIsCalendarModalOpen(true);
    window.addEventListener('open-hindu-calendar', handleOpenCalendar);
    return () => window.removeEventListener('open-hindu-calendar', handleOpenCalendar);
  }, []);
  const searchShortcut = getSearchShortcut();
  const [bodhiGuideInitialTab, setBodhiGuideInitialTab] = useState<'context' | 'qa' | 'subhashita' | 'phrases'>('context');
  const [bodhiGuideQuestionId, setBodhiGuideQuestionId] = useState<string | null>(null);
  const { englishFirst } = useAccessibilityStore();
  const {
    currentUser,
    openAuthModal,
    openProfileModal,
    openAdminModal,
    openPaymentModal,
    refreshPlanStatus,
    accessMode,
    pendingRedirectView,
    pendingRedirectLessonId,
    setPendingRedirect,
    isAdminLoggedIn,
  } = useAuthStore();
  const canReadAllChapters = canAccessAllChapters(currentUser, isAdminLoggedIn);

  useEffect(() => {
    refreshPlanStatus();
    try {
      const h = (window.location.hash || '').toLowerCase();
      if (h === '#classes' || h === '#online-classes' || h === '#bodhi-classes') {
        setIsOnlineClassesOpen(true);
      }
    } catch {}
  }, [currentUser?.id, refreshPlanStatus]);

  // Global search shortcut: Cmd+K / Ctrl+K or '/'
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        !isSearchModalOpen &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isSearchModalOpen]);

  // Check whether a view or specific chapter is gated behind account registration
  const isContentGated = (targetView: string, targetLessonId?: string): boolean => {
    if (currentUser) return false;
    if (accessMode === 'open_access') return false;
    if (accessMode === 'strict_gate') {
      return targetView !== 'home';
    }
    // smart_freemium mode (default & recommended):
    if (targetView === 'home' || targetView === 'faq' || targetView === 'philosophy' || targetView === 'cbse-guide' || targetView === 'resources' || targetView === 'dhatupatha' || targetView === 'science-lab' || targetView === 'certificate') return false;
    if (targetView === 'reader') {
      const lessonToCheck = targetLessonId || lessons[lessonIndex]?.id;
      // Content from the beginning (Alphabet, Barakhadi, Samyukta, Numbers)
      // and opening/first chapters across all grades (Class 7, 8, 9) are open under free trial!
      if (lessonToCheck && isFreeTrialOpenLesson(lessonToCheck)) {
        return false;
      }
      return true;
    }
    // Gated in smart_freemium: board (Tile Puzzle), grammar, vedic-maths, quiz, worksheets
    return true;
  };

  const checkAccess = (
    targetView: DashboardView,
    targetLessonId?: string
  ): boolean => {
    if (isContentGated(targetView, targetLessonId)) {
      setPendingRedirect(targetView, targetLessonId);
      openAuthModal('register');
      return false;
    }
    return true;
  };

  // Guests opening the /barakhadi deep link get the same sign-up box as other gated lessons.
  useEffect(() => {
    try {
      if (window.location.pathname.replace(/\/+$/, '') !== '/barakhadi') return;
    } catch {
      return;
    }
    if (isContentGated('reader', 'barakhadi')) {
      setPendingRedirect('reader', 'barakhadi');
      openAuthModal('register');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FAQ is rendered at the bottom of the home page; /faq (and footer/support FAQ links) scroll to it.
  const [faqScrollKey, setFaqScrollKey] = useState(0);
  useEffect(() => {
    if (activeView !== 'faq') return;
    let attempts = 0;
    let timer: number | undefined;
    const tryScroll = () => {
      const el = document.getElementById('faq-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempts++ < 20) timer = window.setTimeout(tryScroll, 100);
    };
    timer = window.setTimeout(tryScroll, 60);
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [activeView, faqScrollKey]);

  // On mobile/tablet, keep the active navigation pill horizontally visible in the scroller
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = window.setTimeout(() => {
      const activeBtn = document.querySelector('.dashboard-nav button.active') as HTMLElement | null;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }, 120);
    return () => window.clearTimeout(timer);
  }, [activeView]);

  // Deep link into a Vijñāna Lab segment (#paramanu, #prakriti, #jyotisha, #srishti-sthiti-laya) + remount key.
  const [labTarget, setLabTarget] = useState<{ segment: string | null; key: number }>({ segment: null, key: 0 });
  const openScienceLab = (segment?: string) => {
    setLabTarget((prev) => ({ segment: segment || null, key: prev.key + 1 }));
    navigateToView('science-lab');
  };

  // Deep link into a Course Addendum unit (e.g. Mantras & Ślokas) + remount key.
  const [courseAddendumTarget, setCourseAddendumTarget] = useState<{ id: string; key: number } | null>(null);

  const navigateToView = (
    view: DashboardView,
    lessonId?: string
  ) => {
    setQuizAnchor(null);
    if (view !== 'course') setCourseAddendumTarget(null);
    if (view === 'faq') {
      setActiveView('faq');
      setFaqScrollKey((k) => k + 1);
      return;
    }
    if (view === 'home' || view === 'philosophy' || view === 'cbse-guide' || view === 'resources' || view === 'science-lab') {
      setActiveView(view);
      return;
    }
    if (view === 'reader') {
      openDeepakam(lessonId);
      return;
    }
    if (!checkAccess(view, lessonId)) return;
    if (view === 'grammar') {
      setGrammarResetKey((k) => k + 1);
    }
    setActiveView(view);
  };

  const [worksheetsCategory, setWorksheetsCategory] = useState<string>('all');
  const openCourseAddendum = (addendumId: string) => {
    setCourseAddendumTarget((prev) => ({ id: addendumId, key: (prev?.key || 0) + 1 }));
    navigateToView('course');
  };

  const handleOpenWorksheets = (category: string = 'all') => {
    setWorksheetsCategory(category);
    navigateToView('worksheets');
  };

  const handleOpenGrammar = (
    topicOrEvent?: GrammarTopic | React.MouseEvent,
    articleId?: string | null
  ) => {
    const topic: GrammarTopic = typeof topicOrEvent === 'string' ? topicOrEvent : 'home';
    const artId: string | null = typeof articleId === 'string' ? articleId : null;
    setGrammarTargetTopic(topic);
    setGrammarTargetArticleId(artId);
    setGrammarResetKey((k) => k + 1);
    navigateToView('grammar');
  };

  const handleSearchResultNavigate = (item: SearchItem) => {
    const { target } = item;
    if (target.openBodhi) {
      if (target.bodhiTab) {
        setBodhiGuideInitialTab(target.bodhiTab);
      }
      setBodhiGuideQuestionId(target.bodhiQuestionId || null);
      setIsBodhiGuideOpen(true);
      return;
    }

    if (target.view === 'grammar') {
      handleOpenGrammar(target.grammarTopic || 'home', target.grammarArticleId || null);
      return;
    }

    if (target.view === 'reader' && target.lessonId) {
      openDeepakam(target.lessonId);
      return;
    }

    if (target.view === 'vedic-maths') {
      const anchor = target.vedicAnchor;
      let tab: VedicTab = 'sutras';
      if (anchor === 'zero' || target.mathsTab === 'zero') tab = 'zero';
      else if (anchor === 'kerala' || anchor === 'yuktibhasa' || anchor === 'melakarta' || target.mathsTab === 'kerala') tab = 'kerala';
      else if (anchor?.startsWith('sutra-') || anchor === 'vedic-path' || target.mathsTab === 'sutras') tab = 'sutras';
      else if (anchor?.startsWith('solver-') || target.mathsTab === 'multiplication' || target.mathsTab === 'divisibility') tab = 'solvers';
      else if (anchor?.startsWith('article-') || anchor === 'articles' || anchor === 'spheres-of-certainty' || anchor === 'terracotta-matrix') tab = 'articles';
      else if (target.mathsTab === 'altars') tab = 'geometry';
      setVedicTarget((prev) => ({ tab, anchor, key: prev.key + 1 }));
      navigateToView('vedic-maths');
      return;
    }

    if (target.view === 'quiz' && target.quizAnchor === 'swar-review') {
      // Swar workbook readers (p. 24 QR) reach the review practice in the Swar & Workbooks section
      openVarnamala('quizzes');
      return;
    }
    if (target.view === 'quiz') {
      navigateToView('quiz');
      if (target.quizAnchor && categoryForLiteratureAnchor(target.quizAnchor)) {
        setQuizAnchor(target.quizAnchor);
      }
      return;
    }

    if (target.view === 'worksheets') {
      handleOpenWorksheets(target.worksheetsCategory || 'all');
      return;
    }

    if (target.view === 'course') {
      if (target.courseAddendumId) {
        openCourseAddendum(target.courseAddendumId);
        return;
      }
      if (target.courseMode) {
        window.location.hash = `#${target.courseMode}`;
        navigateToView('course');
        return;
      }
    }


    if (target.view === 'science-lab') {
      openScienceLab(target.labAnchor);
      return;
    }

    if (target.view === 'philosophy') {
      if (target.philosophyEssay) {
        setPhilosophyEssay(target.philosophyEssay);
      }
      navigateToView('philosophy');
      return;
    }

    navigateToView(target.view);
  };

  // In-page links (e.g. Numbers guide "Read more") ask for the same navigation as search.
  const searchNavigateRef = useRef(handleSearchResultNavigate);
  searchNavigateRef.current = handleSearchResultNavigate;
  useEffect(() => {
    const onOpenTarget = (event: Event) => {
      const detail = (event as CustomEvent<{ target?: SearchTarget; handled?: boolean }>).detail;
      if (!detail?.target?.view) return;
      detail.handled = true;
      searchNavigateRef.current({ target: detail.target } as SearchItem);
    };
    window.addEventListener('ednet:open-target', onOpenTarget);
    return () => window.removeEventListener('ednet:open-target', onOpenTarget);
  }, []);

  // Hidden / Secret trigger for Admin Portal:
  // 1. Triple-clicking the Gurukul brand logo
  // 2. Secret URL parameter: ?admin or #admin
  // 3. Secret keyboard shortcut: Ctrl + Shift + A (or Cmd + Shift + A on Mac)
  const logoClicksRef = useRef<{ count: number; lastTime: number }>({ count: 0, lastTime: 0 });

  const handleBrandClick = () => {
    setActiveView('home');
    const now = Date.now();
    if (now - logoClicksRef.current.lastTime < 700) {
      logoClicksRef.current.count += 1;
      if (logoClicksRef.current.count >= 3) {
        logoClicksRef.current.count = 0;
        openAdminModal();
      }
    } else {
      logoClicksRef.current.count = 1;
    }
    logoClicksRef.current.lastTime = now;
  };

  useEffect(() => {
    const checkSecretUrl = () => {
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has('admin') || window.location.hash === '#admin') {
          openAdminModal();
        }
      } catch {}
    };
    checkSecretUrl();
    window.addEventListener('hashchange', checkSecretUrl);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        openAdminModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkSecretUrl);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openAdminModal]);

  // Seamlessly resume user's journey after registration or login
  useEffect(() => {
    if (currentUser && pendingRedirectView) {
      const target = pendingRedirectView as DashboardView;
      const targetLesson = pendingRedirectLessonId;
      setPendingRedirect(null, undefined);
      if (target === 'reader') {
        openDeepakam(targetLesson);
      } else if (
        target === 'home' ||
        target === 'board' ||
        target === 'grammar' ||
        target === 'vedic-maths' ||
        target === 'quiz' ||
        target === 'worksheets' ||
        target === 'faq' ||
        target === 'philosophy' ||
        target === 'cbse-guide' ||
        target === 'resources' ||
        target === 'science-lab'
      ) {
        if (target === 'grammar') {
          setGrammarResetKey((k) => k + 1);
        }
        setActiveView(target);
      }
    }
  }, [currentUser, pendingRedirectView, pendingRedirectLessonId]);

  // Guard against stale localStorage pointing to gated content for guest visitors
  useEffect(() => {
    if (!currentUser) {
      if (accessMode === 'strict_gate' && activeView !== 'home' && activeView !== 'faq' && activeView !== 'philosophy' && activeView !== 'cbse-guide' && activeView !== 'resources' && activeView !== 'science-lab') {
        setActiveView('home');
      } else if (accessMode === 'smart_freemium') {
        // /certificate and /quiz stay open: printed QR codes in the Swar workbook (pp. 24, 149) point here.
        // Guests on /quiz see only Swar Review Practice; the full quiz arena keeps its sign-up gate.
        if (activeView !== 'home' && activeView !== 'reader' && activeView !== 'faq' && activeView !== 'philosophy' && activeView !== 'cbse-guide' && activeView !== 'resources' && activeView !== 'science-lab' && activeView !== 'certificate' && activeView !== 'quiz') {
          setActiveView('home');
        } else if (activeView === 'reader') {
          const currId = lessons[lessonIndex]?.id;
          if (currId && currId !== 'varnamala' && currId !== 'gsde101') {
            const defaultFreeIdx = firstDeepakamIndex(lessons);
            setLessonIndex(defaultFreeIdx >= 0 ? defaultFreeIdx : 0);
            setSentenceIndex(0);
          }
        }
      }
    }
  }, [accessMode, currentUser]);

  useEffect(() => {
    localStorage.setItem('school-active-view', activeView);
  }, [activeView]);

  // Keep clean canonical URLs and SEO meta tags in sync with activeView
  useEffect(() => {
    try {
      const onBarakhadi = activeView === 'reader' && lessons[lessonIndex]?.id === 'barakhadi';
      const desired = onBarakhadi ? '/barakhadi' : viewToPath(activeView);
      const current = window.location.pathname.replace(/\/+$/, '') || '/';
      const quizHash =
        activeView === 'quiz' && quizAnchor && categoryForLiteratureAnchor(quizAnchor)
          ? `#${quizAnchor}`
          : '';
      if (current !== desired) {
        window.history.pushState({ view: activeView }, '', desired + quizHash);
      } else if (quizHash && window.location.hash !== quizHash) {
        window.history.pushState({ view: activeView }, '', desired + quizHash);
      }

      // Dynamically update document title & meta tags for SEO & social sharing
      const meta = onBarakhadi ? BARAKHADI_METADATA : VIEW_METADATA[activeView] || VIEW_METADATA.home;
      document.title = meta.title;
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) descEl.setAttribute('content', meta.desc);
      const ogTitleEl = document.querySelector('meta[property="og:title"]');
      if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title);
      const ogDescEl = document.querySelector('meta[property="og:description"]');
      if (ogDescEl) ogDescEl.setAttribute('content', meta.desc);
      const canonicalHref = `https://ednetlearn.in${desired.endsWith('/') ? desired : `${desired}/`}`;
      const ogUrlEl = document.querySelector('meta[property="og:url"]');
      if (ogUrlEl) ogUrlEl.setAttribute('content', canonicalHref);
      const canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) canonicalEl.setAttribute('href', canonicalHref);
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView, lessons[lessonIndex]?.id, quizAnchor]);

  useEffect(() => {
    const onPop = () => {
      const fromPath = pathToView(window.location.pathname);
      setActiveView(fromPath || 'home');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const id = lessons[lessonIndex]?.id;
    if (id && !HIDDEN_DEEPAKAM_IDS.has(id)) {
      localStorage.setItem('school-lesson-id', id);
    }
  }, [lessonIndex, lessons]);

  // If a stale save still points at samyukta, bounce to Chapter 1.
  useEffect(() => {
    const id = lessons[lessonIndex]?.id;
    if (!id || !HIDDEN_DEEPAKAM_IDS.has(id)) return;
    const fallback = firstDeepakamIndex(lessons);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLessonIndex(fallback);
    setSentenceIndex(0);
    setWordSelection(null);
  }, [lessonIndex, lessons]);

  // Guests: if saved lesson is Class 8 or Class 9, bounce to Class 7 (or Varṇamālā).
  // Registered users with an account may keep Class 8 and Class 9 open for reading.
  useEffect(() => {
    if (canReadAllChapters) return;
    const id = lessons[lessonIndex]?.id;
    if (!id || (!id.startsWith('grade8_') && !id.startsWith('grade9_'))) return;
    const fallback = firstDeepakamIndex(lessons);
    const varna = lessons.findIndex((item) => item.id === 'varnamala');
    const next = fallback >= 0 ? fallback : varna >= 0 ? varna : 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLessonIndex(next);
    setSentenceIndex(0);
    setWordSelection(null);
    if (activeView === 'reader') {
      // stay on reader at Class 7 / varnamala
    }
  }, [canReadAllChapters, lessonIndex, lessons, activeView]);

  const [chaptersLoading, setChaptersLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchLatestChapters()
      .then((fresh) => {
        if (!cancelled) {
          if (fresh.length > 0) setLessons(fresh);
          setChaptersLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setChaptersLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Ensure sentenceIndex stays within bounds when chapters load
  useEffect(() => {
    const cur = lessons[lessonIndex];
    if (cur?.sentences?.length && sentenceIndex >= cur.sentences.length) {
      setSentenceIndex(Math.max(0, cur.sentences.length - 1));
    }
  }, [lessonIndex, sentenceIndex, lessons]);

  const findNextVisibleLesson = (from: number, direction: 1 | -1): number => {
    let i = from + direction;
    while (i >= 0 && i < lessons.length) {
      if (!HIDDEN_DEEPAKAM_IDS.has(lessons[i]?.id)) return i;
      i += direction;
    }
    return from;
  };

  const lesson = lessons[lessonIndex];
  const sentence = lesson?.sentences?.[sentenceIndex];
  const isFirstSentence = lessonIndex === 0 && sentenceIndex === 0;
  const lastVisible = (() => {
    for (let i = lessons.length - 1; i >= 0; i -= 1) {
      if (!HIDDEN_DEEPAKAM_IDS.has(lessons[i]?.id)) return i;
    }
    return Math.max(0, lessons.length - 1);
  })();
  const isLastSentence =
    lessonIndex === lastVisible && sentenceIndex === Math.max(0, (lesson?.sentences?.length ?? 1) - 1);

  const handleWordClick = (word: string) => {
    // । ॥ / verse numbers are punctuation: no speech, no analysis entry.
    if (isDandaOrVerseNumberToken(word)) return;
    // Lessons only. Numbers guide, Varṇamālā, and बारहखड़ी keep their own audio.
    const skipNumberSpeech = lesson?.id === 'numbers' || lesson?.id === 'varnamala' || lesson?.id === 'barakhadi';
    if (!skipNumberSpeech) {
      // Any digit in the line (एकः २, 2., page numbers), not only a bare numeral.
      playLessonText(word);
      const spoken = expandDigitsInLessonText(word);
      const cleaned = cleanWord(spoken) || spoken.trim();
      localStorage.setItem('last-stem', cleaned);
      setIsAnalyzerCollapsed(false);
      setWordSelection({ text: cleaned, nonce: Date.now() });
      return;
    }
    const cleaned = cleanWord(word) || word.trim();
    playPronunciation(cleaned);
    localStorage.setItem('last-stem', cleaned);
    setIsAnalyzerCollapsed(false);
    setWordSelection({ text: cleaned, nonce: Date.now() });
  };

  // Auto-show first analyzable Devanagari word when the reader lesson/paragraph loads.
  // Does NOT play audio — only populates WordAnalyzerCard. Manual clicks still play.
  useEffect(() => {
    if (activeView !== 'reader') {
      setWordSelection(null);
      return;
    }
    const currentLesson = lessons[lessonIndex];
    if (currentLesson?.id === 'varnamala' || currentLesson?.id === 'barakhadi') {
      // In Varnamala and Barakhadi studio, do not auto-select a word. Let the user explore the alphabet chart!
      setWordSelection(null);
      return;
    }
    const s = lessons[lessonIndex]?.sentences[sentenceIndex];
    if (!s) {
      setWordSelection(null);
      return;
    }
    const raw = readerTokens(s);
    const candidates = raw
      .map((w) => cleanWord(w) || w.replace(/[॥।,;:!?—–\-…/()]+/g, '').trim())
      .filter((w) => hasDevanagariLetter(w));
    const first = candidates[0];
    if (!first) {
      setWordSelection(null);
      return;
    }
    setWordSelection({ text: first, nonce: Date.now() });
  }, [activeView, lessonIndex, sentenceIndex, lessons]);

  const handleSelectLesson = (nextLessonId: string) => {
    if (HIDDEN_DEEPAKAM_IDS.has(nextLessonId)) return;
    if (!checkAccess('reader', nextLessonId)) return;
    const nextIndex = lessons.findIndex((item) => item.id === nextLessonId);
    if (nextIndex === -1) return;
    setLessonIndex(nextIndex);
    setSentenceIndex(0);
    // wordSelection: auto-select effect fills from the new sentence
  };

  const goNext = () => {
    if (!lesson) return;
    if (sentenceIndex < (lesson.sentences?.length ?? 0) - 1) {
      setSentenceIndex(sentenceIndex + 1);
    } else {
      const next = findNextVisibleLesson(lessonIndex, 1);
      if (next !== lessonIndex) {
        const nextId = lessons[next]?.id;
        if (!checkAccess('reader', nextId)) return;
        setLessonIndex(next);
        setSentenceIndex(0);
      }
    }
    // wordSelection: auto-select effect fills from the new sentence
  };

  const goPrevious = () => {
    if (!lesson) return;
    if (sentenceIndex > 0) {
      setSentenceIndex(sentenceIndex - 1);
    } else {
      const prev = findNextVisibleLesson(lessonIndex, -1);
      if (prev !== lessonIndex) {
        const prevId = lessons[prev]?.id;
        if (!checkAccess('reader', prevId)) return;
        setLessonIndex(prev);
        setSentenceIndex(Math.max(0, (lessons[prev]?.sentences?.length ?? 1) - 1));
      }
    }
    // wordSelection: auto-select effect fills from the new sentence
  };

  const jumpToSentence = (index: number) => {
    if (!lesson?.sentences?.length) return;
    const clamped = Math.max(0, Math.min(index, lesson.sentences.length - 1));
    setSentenceIndex(clamped);
    // wordSelection: auto-select effect fills from the new sentence
  };

  const openVarnamala = (
    subMode?: 'sound' | 'writing' | 'quizzes' | 'workbooks' | 'worksheets'
  ) => {
    if (!checkAccess('reader', 'varnamala')) return;
    const idx = lessons.findIndex((item) => item.id === 'varnamala');
    if (idx >= 0) {
      setLessonIndex(idx);
      setSentenceIndex(0);
      setVarnamalaInitialSubMode(subMode || 'sound');
      setIsAnalyzerCollapsed(true);
      setWordSelection(null);
    }
    setActiveView('reader');
  };

  const openDeepakam = (lessonId?: string) => {
    const targetId =
      lessonId || (firstDeepakamIndex(lessons) >= 0 ? lessons[firstDeepakamIndex(lessons)].id : 'gsde101');
    if (targetId === 'varnamala' || targetId === 'barakhadi') {
      setIsAnalyzerCollapsed(true);
      setWordSelection(null);
    }
    // Guests without an account: prompt login/registration for Class 8 and Class 9.
    if (typeof targetId === 'string' && (targetId.startsWith('grade8_') || targetId.startsWith('grade9_')) && !canReadAllChapters) {
      openAuthModal('login');
      return;
    }
    if (!checkAccess('reader', targetId)) return;
    const idx = lessons.findIndex((item) => item.id === targetId);
    if (idx >= 0) {
      setLessonIndex(idx);
      setSentenceIndex(0);
      // wordSelection: auto-select effect fills from the new sentence
      setActiveView('reader');
      return;
    }
    const current = lessons[lessonIndex];
    const guideIds = new Set(['varnamala', 'barakhadi', 'samyukta', 'numbers']);
    if (!current || guideIds.has(current.id) || HIDDEN_DEEPAKAM_IDS.has(current.id)) {
      const fallbackIdx = firstDeepakamIndex(lessons);
      if (fallbackIdx >= 0) {
        setLessonIndex(fallbackIdx);
        setSentenceIndex(0);
        // wordSelection: auto-select effect fills from the new sentence
      }
    }
    setActiveView('reader');
  };

  return (
    <div className={`dashboard dashboard--${activeView}${activeView !== 'reader' ? ' dashboard--scrollable' : ''}${isAnalyzerCollapsed ? ' dashboard--analyzer-collapsed' : ''}`}>
      <header className="dashboard-header">
        <button
          type="button"
          className="dashboard-brand-btn"
          onClick={handleBrandClick}
          title="EdNet Learn Gurukul - Go to Homepage"
        >
          <img src="/logo.jpg" alt="Interactive Sanskrit language learning dashboard for school children" className="dashboard-brand-logo-img" width={48} height={48} />
          <div className="dashboard-brand-text-col">
            <span className="dashboard-title">EdNet Learn Gurukul</span>
            <span className="dashboard-brand-sub">संस्कृत-शिक्षणम् · NCERT · CBSE</span>
          </div>
        </button>
        <nav className="dashboard-nav" aria-label="Main learning views">
          {/* Desktop: row 1 sits between brand and tools (Home + CBSE Exam Guide group);
              row 2 spans the full header width (learning tools). Mobile: rows flatten
              into the single horizontal scroller. */}
          <div className="dashboard-nav-row dashboard-nav-row--primary">
            <button
              type="button"
              className={`dashboard-nav-home dashboard-nav-item${activeView === 'home' ? ' active' : ''}`}
              onClick={() => setActiveView('home')}
              title="Go to Homepage"
            >
              <img src="/nav/nav-home.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
              <span className="dashboard-nav-sanskrit">गृहम्</span>
              <span className="dashboard-nav-secondary">Home</span>
            </button>
            <div
              className={`dashboard-nav-group${(activeView === 'reader' && lesson?.id !== 'varnamala') || activeView === 'cbse-guide' ? ' dashboard-nav-group--active' : ''}`}
            >
              <button
                type="button"
                className={`dashboard-nav-group-label${activeView === 'cbse-guide' ? ' dashboard-nav-group-label--active' : ''}`}
                onClick={() => navigateToView('cbse-guide')}
                title="CBSE NCERT Sanskrit Exam Blueprint, Syllabus & Question Paper Guide"
              >
                <img src="/nav/nav-deepakam.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={18} height={18} />
                <span className="dashboard-nav-sanskrit">सीबीएसई</span>
                <span className="dashboard-nav-sub-en">Exam Guide</span>
              </button>
              <div className="dashboard-nav-sub" role="group" aria-label="Deepakam 7th, Deepakam 8th, and 9th Grade शारदा lessons">
                <button
                  type="button"
                  className={activeView === 'reader' && lesson?.id !== 'varnamala' && !lesson?.id?.startsWith('grade8_') && !lesson?.id?.startsWith('grade9_') ? 'active' : ''}
                  onClick={() => openDeepakam()}
                  title="Deepakam 7th · दीपकम · Class 7 Sanskrit"
                >
                  <img src="/textbooks/ncert-deepakam-class7.webp" alt="Deepakam 7th Grade Textbook Cover" className="dashboard-nav-sub-img" />
                  <span className="dashboard-nav-sanskrit">दीपकम</span> <span className="dashboard-nav-sub-en">7th</span>
                </button>
                <button
                  type="button"
                  className={activeView === 'reader' && lesson?.id?.startsWith('grade8_') ? 'active' : ''}
                  onClick={() => {
                    if (!canReadAllChapters) {
                      openAuthModal('login');
                    } else {
                      openDeepakam('grade8_prarthana');
                    }
                  }}
                  title={canReadAllChapters ? 'Deepakam 8th · दीपकम · Class 8 Sanskrit' : 'Sign in to access Deepakam 8th'}
                >
                  <img src="/textbooks/ncert-deepakam-class8.jpg" alt="Deepakam 8th Grade Textbook Cover" className="dashboard-nav-sub-img" />
                  <span className="dashboard-nav-sanskrit">दीपकम</span> <span className="dashboard-nav-sub-en">8th</span>
                </button>
                <button
                  type="button"
                  className={activeView === 'reader' && lesson?.id?.startsWith('grade9_') ? 'active' : ''}
                  onClick={() => {
                    if (!canReadAllChapters) {
                      openAuthModal('login');
                    } else {
                      openDeepakam('grade9_prarthana');
                    }
                  }}
                  title={canReadAllChapters ? '9th Grade · शारदा · Class 9 Sanskrit' : 'Sign in to access शारदा Class 9'}
                >
                  <img src="/textbooks/ncert-sharada-class9.jpg" alt="Sharada 9th Grade Textbook Cover" className="dashboard-nav-sub-img" />
                  <span className="dashboard-nav-sanskrit">शारदा</span> <span className="dashboard-nav-sub-en">9th</span>
                </button>
              </div>
            </div>
          </div>
          <div className="dashboard-nav-row dashboard-nav-row--secondary">
            <button
              type="button"
              className={`dashboard-nav-item dashboard-nav-stacked${activeView === 'reader' && (lesson?.id === 'varnamala' || lesson?.id === 'barakhadi') ? ' active' : ''}`}
              onClick={() => openVarnamala()}
              title="Open Alphabet & Syllables (वर्णमाला)"
            >
              <img src="/nav/nav-varnamala.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
              <span className="dashboard-nav-sanskrit">वर्णमाला</span>
              <span className="dashboard-nav-secondary">{englishFirst ? 'Alphabet & Sounds' : 'Alphabet & Syllables'}</span>
            </button>
            <button
              type="button"
              className={`dashboard-nav-item dashboard-nav-stacked${activeView === 'board' ? ' active' : ''}`}
              onClick={() => navigateToView('board')}
              title="Open जोडो tile puzzles, Match-the-Following & Word Mazes"
            >
              <img src="/nav/nav-jodo.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
              <span className="dashboard-nav-sanskrit">जोडो</span>
              <span className="dashboard-nav-secondary">{englishFirst ? 'Word Games & Puzzles' : 'Tile Puzzle & Games'}</span>
            </button>
            <button
              type="button"
              className={`dashboard-nav-stacked dashboard-nav-item${activeView === 'grammar' ? ' active' : ''}`}
              onClick={handleOpenGrammar}
              title="Open Vyakaran (Grammar) shelf with all articles"
            >
              <img src="/nav/nav-grammar.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
              <span className="dashboard-nav-sanskrit">व्याकरणम्</span>
              <span className="dashboard-nav-secondary">{englishFirst ? 'Grammar & Rules' : 'Vyakaran · Grammar'}</span>
            </button>
            <button
              type="button"
              className={`dashboard-nav-stacked dashboard-nav-item${activeView === 'dhatupatha' ? ' active' : ''}`}
              onClick={() => navigateToView('dhatupatha')}
              title="Pāṇinian Dhātupāṭha Studio - 5 Lakāras, Kṛt pratyayas & word deconstructor"
            >
              <img src="/nav/nav-dhatu.svg" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
              <span className="dashboard-nav-sanskrit">धातुपाठः</span>
              <span className="dashboard-nav-secondary">{englishFirst ? 'Verb Roots & Tenses' : 'Dhātupāṭha'}</span>
            </button>
            <button
              type="button"
              className={`dashboard-nav-stacked dashboard-nav-item${activeView === 'vedic-maths' ? ' active' : ''}`}
              onClick={() => navigateToView('vedic-maths')}
              title="Open Vaidic Gaṇitam (वैदिक-गणितम्)"
            >
              <img src="/nav/nav-vedic.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
              <span className="dashboard-nav-sanskrit">वैदिक-गणितम्</span>
              <span className="dashboard-nav-secondary">{englishFirst ? 'Vedic Speed Math' : 'Mental Math'}</span>
            </button>
            <button
              type="button"
              className={`dashboard-nav-stacked dashboard-nav-item${activeView === 'quiz' ? ' active' : ''}`}
              onClick={() => navigateToView('quiz')}
              title="Open Sanskrit & Vedic Maths Quiz (प्रश्नोत्तरी)"
            >
              <img src="/nav/nav-quiz.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
              <span className="dashboard-nav-sanskrit">प्रश्नोत्तरी</span>
              <span className="dashboard-nav-secondary">{englishFirst ? 'Practice Quizzes' : 'Tests & Quiz'}</span>
            </button>
            <button
              type="button"
              className={`dashboard-nav-stacked dashboard-nav-item${activeView === 'worksheets' ? ' active' : ''}`}
              onClick={() => navigateToView('worksheets')}
              title="Open Printable Worksheets (कार्यपत्रिकाः)"
            >
              <img src="/nav/nav-worksheets.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
              <span className="dashboard-nav-sanskrit">कार्यपत्रिकाः</span>
              <span className="dashboard-nav-secondary">{englishFirst ? 'CBSE Worksheets' : 'Printable PDFs'}</span>
            </button>
            <button
              type="button"
              className={`dashboard-nav-stacked dashboard-nav-item${activeView === 'resources' ? ' active' : ''}`}
              onClick={() => navigateToView('resources')}
              title="Open Sanskrit Resources &amp; Study Vault (साधनानि)"
            >
              <img src="/nav/nav-resources.svg" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
              <span className="dashboard-nav-sanskrit">साधनानि</span>
              <span className="dashboard-nav-secondary">{englishFirst ? 'Study Vault' : 'Free Resources'}</span>
            </button>
            <button
              type="button"
              className={`dashboard-nav-stacked dashboard-nav-item${activeView === 'course' ? ' active' : ''}`}
              onClick={() => navigateToView('course')}
              title="संस्कृत-चिन्तनम् · Complete Sanskrit as a Way of Thinking Course"
            >
              <span className="dashboard-nav-icon" style={{ fontSize: '1.25rem', lineHeight: 1 }} aria-hidden="true">🧠</span>
              <span className="dashboard-nav-sanskrit">संस्कृत-चिन्तनम्</span>
              <span className="dashboard-nav-secondary">{englishFirst ? 'Sanskrit Course' : '28 Lessons'}</span>
            </button>
            <button
              type="button"
              className={`dashboard-nav-stacked dashboard-nav-item${isOnlineClassesOpen ? ' active' : ''}`}
              onClick={() => setIsOnlineClassesOpen(true)}
              title="Sanskrit Online Classes with Bodhi (कक्षासु)"
              style={{ background: 'rgba(245, 158, 11, 0.08)' }}
            >
              <span className="dashboard-nav-icon" style={{ fontSize: '1.25rem', lineHeight: 1 }} aria-hidden="true">🎓</span>
              <span className="dashboard-nav-sanskrit">ऑनलाइन-वर्गाः</span>
              <span className="dashboard-nav-secondary">{englishFirst ? 'Live Classes' : 'Online Classes'}</span>
            </button>
          </div>
        </nav>

        <div className="dashboard-header-user">
          {/* Hindu Calendar & Panchang Corner Widget */}
          <button
            type="button"
            className="dashboard-panchang-btn"
            onClick={() => setIsCalendarModalOpen(true)}
            title="आज का पञ्चाङ्ग एवं हिन्दू कैलेण्डर · Vedic Hindu Calendar (Click for full calendar)"
            aria-label="Open Hindu Calendar and Panchang"
          >
            <span className="dpb-icon" aria-hidden="true">🕉️</span>
            <div className="dpb-text">
              <span className="dpb-tithi">{panchang.formattedTithiPill}</span>
              <span className="dpb-sub">
                <span>{panchang.vara} · {panchang.timeIST}</span>
                <span className="dpb-link-tag">📅 कैलेण्डर</span>
              </span>
            </div>
          </button>
          <a
            href="https://koshashri-dc.ac.in/search/catalog/1/10?searchTerm=%E0%A4%85"
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-search-trigger-btn"
            style={{ padding: '0.45rem 0.65rem', textDecoration: 'none' }}
            title="Open Koshashri Sanskrit Dictionary (Deccan College)"
            aria-label="Open Koshashri Sanskrit Dictionary"
          >
            <span aria-hidden="true">📖</span>
            <span className="dashboard-search-trigger-text">Dictionary</span>
          </a>
          <button
            type="button"
            className="dashboard-search-trigger-btn"
            style={{ padding: '0.45rem 0.65rem' }}
            onClick={() => setIsVoiceModalOpen(true)}
            title="Audio & Voice Studio: Configure voices for Mantras, Deepakam, and Bodhi"
            aria-label="Open Voice Studio"
          >
            <span aria-hidden="true">🔊</span>
            <span className="dashboard-search-trigger-text">Voices</span>
          </button>
          <button
            type="button"
            className="dashboard-search-trigger-btn dashboard-search-trigger-btn--site"
            onClick={() => setIsSearchModalOpen(true)}
            title={searchShortcut.searchTitle}
            aria-label="Search site and articles"
          >
            <span className="dashboard-search-trigger-icon" aria-hidden="true">🔍</span>
            <span className="dashboard-search-trigger-text">Search…</span>
            <kbd className="dashboard-search-trigger-kbd">{searchShortcut.kbd}</kbd>
          </button>
          {currentUser ? (
            <button
              type="button"
              className="nav-profile-chip"
              onClick={openProfileModal}
              title={`View profile for ${currentUser.fullName}`}
            >
              <span className="nav-profile-avatar">{currentUser.avatar}</span>
              <span className="nav-profile-name">{currentUser.fullName.split(' ')[0]}</span>
              {currentUser.planStatus === 'active' ? (
                <span className="nav-trial-pill nav-active-pill" title="Subscription Active">⭐ Active</span>
              ) : currentUser.planStatus === 'trial' ? (
                <span className="nav-trial-pill" title="14-Day Free Access Active">🎁 14d Trial</span>
              ) : null}
            </button>
          ) : (
            <div className="nav-auth-group" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <button
                type="button"
                className="nav-free-trial-btn"
                onClick={() => openAuthModal('register')}
                title="Claim your unrestricted 14-day free access · No credit card required"
                aria-label="Start 14-day free trial"
              >
                <span className="nav-free-trial-gift" aria-hidden="true">🎁</span>
                <span className="nav-free-trial-text">14-Day Free Access</span>
                <span className="nav-free-trial-badge">Free</span>
              </button>
              <button
                type="button"
                className="nav-auth-btn"
                onClick={() => openAuthModal('login')}
                title="Sign in to your Gurukul account"
              >
                <span>👤</span>
                <span>Sign In</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <main id="main-content" className="dashboard-main-content" tabIndex={-1}>
        {(activeView === 'home' || activeView === 'faq') && (
        <HomePage
          onOpenReader={(lessonId) => openDeepakam(lessonId)}
          onOpenBoard={() => navigateToView('board')}
          onOpenVarnamala={openVarnamala}
          onOpenGrammar={handleOpenGrammar}
          onOpenDhatupatha={() => navigateToView('dhatupatha')}
          onOpenVedicMaths={() => navigateToView('vedic-maths')}
          onOpenQuiz={() => navigateToView('quiz')}
          onOpenWorksheets={() => handleOpenWorksheets('all')}
          onOpenPhilosophy={() => navigateToView('philosophy')}
          onOpenCbseGuide={() => navigateToView('cbse-guide')}
          onOpenOnlineClasses={() => setIsOnlineClassesOpen(true)}
          onOpenCalendar={() => setIsCalendarModalOpen(true)}
          onOpenBodhi={() => setIsBodhiGuideOpen(true)}
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onOpenResources={() => navigateToView('resources')}
          onOpenCourse={() => navigateToView('course')}
          onOpenScienceLab={(segment) => openScienceLab(segment)}
          onOpenRegister={() => openAuthModal('register')}
          onOpenCertificate={() => navigateToView('certificate')}
        />
      )}
      {/* FAQ lives at the bottom of the home page (no longer in the top menu). /faq scrolls here. */}
      {(activeView === 'home' || activeView === 'faq') && <FAQSection />}
      <Suspense fallback={<ViewLoader />}>
        {activeView === 'philosophy' && (
          <PhilosophyPage
            initialEssay={philosophyEssay}
            onOpenRegister={() => openAuthModal('register')}
            onOpenVedicMaths={() => navigateToView('vedic-maths')}
            onOpenVarnamala={openVarnamala}
            onOpenReader={() => navigateToView('reader')}
            onGoHome={() => navigateToView('home')}
            onOpenGrammarArticle={(articleId) => handleOpenGrammar('article', articleId)}
            onOpenCourseAddendum={openCourseAddendum}
            onOpenScienceLab={(segment) => openScienceLab(segment)}
          />
        )}
        {activeView === 'cbse-guide' && (
          <CbseSanskritGuidePage
            onOpenRegister={() => openAuthModal('register')}
            onGoHome={() => navigateToView('home')}
            onOpenPhilosophy={() => navigateToView('philosophy')}
            onOpenGrammar={handleOpenGrammar}
            onOpenResources={() => navigateToView('resources')}
          />
        )}
        {activeView === 'resources' && (
          <FreeResourcesPage
            onGoHome={() => navigateToView('home')}
            onOpenGrammar={handleOpenGrammar}
            onOpenRoadmap={() => handleOpenGrammar('article', 'beginners-roadmap')}
            onOpenCbseGuide={() => navigateToView('cbse-guide')}
            onOpenPhilosophy={() => navigateToView('philosophy')}
            onOpenRegister={() => openAuthModal('register')}
            onOpenQuiz={() => navigateToView('quiz')}
            onOpenWorksheets={() => handleOpenWorksheets('all')}
            onOpenScienceLab={() => openScienceLab()}
          />
        )}
        {activeView === 'certificate' && (
          <CertificatePage
            onGoHome={() => navigateToView('home')}
            onOpenBodhi={() => setIsBodhiGuideOpen(true)}
            onOpenWorksheets={() => handleOpenWorksheets('all')}
            onOpenPuzzles={() => navigateToView('board')}
            onOpenGames={() => navigateToView('science-lab')}
            onOpenReviewPractice={() => { setQuizAnchor(null); setActiveView('quiz'); }}
          />
        )}
        {activeView === 'science-lab' && (
          <ScienceLab
            key={`lab-${labTarget.key}`}
            initialSegment={labTarget.segment}
            onGoHome={() => navigateToView('home')}
            onOpenResources={() => navigateToView('resources')}
          />
        )}
        {activeView === 'board' && (
          <Board
            onNavigateToHome={() => setActiveView('home')}
            onNavigateToReader={() => openDeepakam()}
            onNavigateToVarnamala={openVarnamala}
            onNavigateToGrammar={handleOpenGrammar}
          />
        )}
        {activeView === 'grammar' && (
          <Grammar
            key={grammarResetKey}
            initialTopic={grammarTargetTopic}
            initialArticleId={grammarTargetArticleId}
            onGoHome={() => setActiveView('home')}
            onOpenWorksheets={() => handleOpenWorksheets('grammar')}
            onOpenQuiz={(anchor?: string) => {
              if (anchor) setQuizAnchor(anchor);
              navigateToView('quiz');
            }}
          />
        )}
        {activeView === 'dhatupatha' && (
          <PaninianStudio
            onGoBack={() => handleOpenGrammar('home')}
            onGoHome={() => navigateToView('home')}
          />
        )}
        {activeView === 'vedic-maths' && (
          <VedicMaths
            key={`vedic-${vedicTarget.key}`}
            initialTab={vedicTarget.tab}
            initialAnchor={vedicTarget.anchor}
            onOpenNumbers={() => handleOpenGrammar('numbers')}
            onGoHome={() => setActiveView('home')}
            onOpenReader={() => openDeepakam()}
            onOpenPhilosophy={() => navigateToView('philosophy')}
            onOpenGrammar={handleOpenGrammar}
            onOpenRegister={() => openAuthModal('register')}
            onOpenLogin={() => openAuthModal('login')}
          />
        )}
        {activeView === 'quiz' && (
          <QuizSection
            initialAnchor={quizAnchor}
            onGoHome={() => setActiveView('home')}
            onOpenWorksheets={() => handleOpenWorksheets('all')}
            onOpenReader={() => openDeepakam()}
            onOpenCertificate={() => { setQuizAnchor(null); setActiveView('certificate'); }}
            onOpenBodhi={() => setIsBodhiGuideOpen(true)}
            onOpenPuzzles={() => navigateToView('board')}
            onOpenGames={() => navigateToView('science-lab')}
            onOpenSwarSection={() => openVarnamala('quizzes')}
            onOpenRegister={() => { setPendingRedirect('quiz'); openAuthModal('register'); }}
          />
        )}
        {activeView === 'worksheets' && (
          <WorksheetSection
            initialCategory={worksheetsCategory}
            onGoHome={() => setActiveView('home')}
            onOpenQuiz={() => navigateToView('quiz')}
            onOpenReader={() => openDeepakam()}
          />
        )}
        {activeView === 'reader' && (
          !lesson || !sentence ? (
            chaptersLoading ? (
              <ViewLoader />
            ) : (
              <div className="dashboard-empty" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '1.25rem' }}>
                  No chapter content available for this section.
                </p>
                <button
                  type="button"
                  className="dashboard-primary-btn"
                  onClick={() => openDeepakam()}
                  style={{
                    padding: '0.65rem 1.4rem',
                    borderRadius: '8px',
                    background: '#273b35',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Go to Chapter 1
                </button>
              </div>
            )
          ) : (
            <TextbookReader
              lessons={lessons}
              activeLessonId={lesson.id}
              initialVarnamalaSubMode={varnamalaInitialSubMode}
              onSelectLesson={handleSelectLesson}
              sentence={sentence}
              sentenceNumber={sentenceIndex + 1}
              totalSentences={lesson.sentences.length}
              activeWord={wordSelection?.text || ''}
              onWordClick={handleWordClick}
              onNext={goNext}
              onPrevious={goPrevious}
              onJumpToSentence={jumpToSentence}
              isFirstSentence={isFirstSentence}
              isLastSentence={isLastSentence}
              onOpenCertificate={() => { setQuizAnchor(null); setActiveView('certificate'); }}
              onOpenBodhi={() => setIsBodhiGuideOpen(true)}
              onOpenGames={() => navigateToView('science-lab')}
              onOpenQuiz={(category) => {
                navigateToView('quiz');
                if (category) setQuizAnchor(category);
              }}
              onOpenWorksheets={(category) => handleOpenWorksheets(category || 'all')}
              onOpenPuzzle={() => navigateToView('board')}
              onOpenVoiceSettings={() => setIsVoiceModalOpen(true)}
              onOpenCbseGuide={() => navigateToView('cbse-guide')}
              onOpenBarakhadi={() => openDeepakam('barakhadi')}
            />
          )
        )}
        {activeView === 'course' && (
          <SanskritThinkingCourse
            key={courseAddendumTarget ? `addendum-${courseAddendumTarget.key}` : 'course'}
            initialAddendumId={courseAddendumTarget?.id}
            onGoHome={() => navigateToView('home')}
            onOpenReader={(chapterId) => openDeepakam(chapterId)}
            onOpenVarnamala={openVarnamala}
            onOpenGrammar={handleOpenGrammar}
            onOpenDhatupatha={() => navigateToView('dhatupatha')}
            onOpenVedicMaths={() => navigateToView('vedic-maths')}
            onOpenPhilosophy={() => navigateToView('philosophy')}
            onOpenWorksheets={() => handleOpenWorksheets('all')}
            onOpenQuiz={() => navigateToView('quiz')}
            onOpenBoard={() => navigateToView('board')}
            onOpenCbseGuide={() => navigateToView('cbse-guide')}
            onOpenRegister={() => openAuthModal('register')}
            onOpenPayment={() => openPaymentModal()}
            onOpenVoiceSettings={() => setIsVoiceModalOpen(true)}
          />
        )}
      </Suspense>
      </main>

      {activeView === 'reader' && (
        isAnalyzerCollapsed ? (
          <aside className="wac-collapsed-rail" aria-label="Word Analyzer Collapsed">
            <button
              type="button"
              className="wac-collapsed-tab-btn"
              onClick={() => setIsAnalyzerCollapsed(false)}
              title="Expand Sanskrit Word Analyzer (शब्द-विश्लेषणम्)"
              aria-label="Expand Sanskrit Word Analyzer"
            >
              <span className="wac-collapsed-tab-icon" aria-hidden="true">🪷</span>
              <span className="wac-collapsed-tab-label">शब्द-विश्लेषणम् · Word Analyzer</span>
              <span className="wac-collapsed-tab-arrow" aria-hidden="true">◀</span>
            </button>
          </aside>
        ) : (
          <WordAnalyzerCard
            selection={wordSelection}
            onClose={() => setIsAnalyzerCollapsed(true)}
            onSelectWord={handleWordClick}
          />
        )
      )}

      {activeView !== 'reader' && (
        <Footer
          onOpenReader={(lessonId) => openDeepakam(lessonId)}
          onOpenBoard={() => navigateToView('board')}
          onOpenVarnamala={openVarnamala}
          onOpenGrammar={handleOpenGrammar}
          onOpenDhatupatha={() => navigateToView('dhatupatha')}
          onOpenVedicMaths={() => navigateToView('vedic-maths')}
          onOpenQuiz={() => navigateToView('quiz')}
          onOpenWorksheets={() => handleOpenWorksheets('all')}
          onOpenFAQ={() => navigateToView('faq')}
          onOpenPhilosophy={() => navigateToView('philosophy')}
          onOpenCbseGuide={() => navigateToView('cbse-guide')}
          onOpenResources={() => navigateToView('resources')}
          onOpenRoadmap={() => handleOpenGrammar('article', 'beginners-roadmap')}
          onOpenBodhi={() => setIsBodhiGuideOpen(true)}
          onOpenCourse={() => navigateToView('course')}
          onOpenScienceLab={() => openScienceLab()}
        />
      )}

      <Suspense fallback={null}>
        <SupportWidget
          onOpenFAQ={() => navigateToView('faq')}
          onOpenWorksheets={() => handleOpenWorksheets('all')}
        />

        <BodhiGuideWidget
          activeView={activeView}
          onNavigateView={navigateToView}
          onOpenVarnamala={openVarnamala}
          forceOpen={isBodhiGuideOpen}
          onOpenChange={(open) => {
            setIsBodhiGuideOpen(open);
            if (!open) setBodhiGuideQuestionId(null);
          }}
          initialTab={bodhiGuideInitialTab}
          initialQuestionId={bodhiGuideQuestionId}
          onSearchResultNavigate={handleSearchResultNavigate}
        />

        {isSearchModalOpen && (
          <GlobalSearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
            onNavigate={handleSearchResultNavigate}
          />
        )}
        {isVoiceModalOpen && (
          <VoiceSettingsModal
            isOpen={isVoiceModalOpen}
            onClose={() => setIsVoiceModalOpen(false)}
          />
        )}
        {isOnlineClassesOpen && (
          <BodhiOnlineClassesModal
            isOpen={isOnlineClassesOpen}
            onClose={() => setIsOnlineClassesOpen(false)}
            onNavigateView={navigateToView}
            onOpenVarnamala={openVarnamala}
            onOpenReader={(lessonId) => openDeepakam(lessonId)}
            onOpenGrammar={handleOpenGrammar}
            onOpenVedicMaths={() => navigateToView('vedic-maths')}
            onOpenCourse={() => navigateToView('course')}
            onOpenBodhi={() => setIsBodhiGuideOpen(true)}
          />
        )}
        {isCalendarModalOpen && (
          <HinduCalendarModal
            isOpen={isCalendarModalOpen}
            onClose={() => setIsCalendarModalOpen(false)}
          />
        )}
        <AuthModal />
        <UserProfileModal />
        <PaymentModal />
        <AdminModal />
      </Suspense>
    </div>
  );
};

export default Dashboard;
