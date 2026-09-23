import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import HomePage from './HomePage';
import FAQSection from './FAQSection';
import PhilosophyPage from './PhilosophyPage';
import WordAnalyzerCard, { type WordSelection } from './WordAnalyzerCard';
import AuthModal from './AuthModal';
import UserProfileModal from './UserProfileModal';
import PaymentModal from './PaymentModal';
import AccessExpiredBanner from './AccessExpiredBanner';
import AdminModal from './AdminModal';
import Footer from './Footer';
import SupportWidget from './SupportWidget';

// Lazy-loaded heavy modules for fast initial homepage performance
const TextbookReader = lazy(() => import('./TextbookReader'));
const Board = lazy(() => import('./Board'));
const Grammar = lazy(() => import('./Grammar'));
const VedicMaths = lazy(() => import('./VedicMaths'));
const QuizSection = lazy(() => import('./QuizSection'));
const WorksheetSection = lazy(() => import('./WorksheetSection'));

const ViewLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1rem', minHeight: '60vh', color: '#273b35' }}>
    <div style={{ width: '42px', height: '42px', border: '3px solid #e2e8f0', borderTopColor: '#273b35', borderRadius: '50%', animation: 'spin 0.75s linear infinite' }} />
    <div style={{ marginTop: '1.25rem', fontWeight: 700, fontSize: '0.95rem', color: '#475569' }}>Loading Gurukul Learning Module...</div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);
import { useAuthStore } from '../store/authStore';
import { LESSONS as STATIC_LESSONS, fetchLatestChapters } from '../data/chapters';
import { playPronunciation } from '../utils/pronunciation';
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
  | 'philosophy';

const PHILOSOPHY_PATHS = new Set(['/philosophy', '/darsana', '/darshana']);

const pathToView = (pathname: string): DashboardView | null => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (PHILOSOPHY_PATHS.has(clean)) return 'philosophy';
  return null;
};

const viewToPath = (view: DashboardView): string => {
  if (view === 'philosophy') return '/philosophy';
  return '/';
};

const isValidSavedView = (saved: string | null): saved is DashboardView =>
  saved === 'home' ||
  saved === 'board' ||
  saved === 'reader' ||
  saved === 'grammar' ||
  saved === 'vedic-maths' ||
  saved === 'quiz' ||
  saved === 'worksheets' ||
  saved === 'faq' ||
  saved === 'philosophy';

const Dashboard: React.FC = () => {
  const [lessons, setLessons] = useState(STATIC_LESSONS);
  const [lessonIndex, setLessonIndex] = useState(() => {
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
  const {
    currentUser,
    openAuthModal,
    openProfileModal,
    openAdminModal,
    getTrialDaysRemaining,
    refreshPlanStatus,
    accessMode,
    pendingRedirectView,
    pendingRedirectLessonId,
    setPendingRedirect,
    isAdminLoggedIn,
  } = useAuthStore();
  const trialDaysLeft = getTrialDaysRemaining();

  useEffect(() => {
    refreshPlanStatus();
  }, [currentUser?.id, refreshPlanStatus]);


  // Check whether a view or specific chapter is gated behind account registration
  const isContentGated = (targetView: string, targetLessonId?: string): boolean => {
    if (currentUser) return false;
    if (accessMode === 'open_access') return false;
    if (accessMode === 'strict_gate') {
      return targetView !== 'home';
    }
    // smart_freemium mode (default & recommended):
    if (targetView === 'home' || targetView === 'faq' || targetView === 'philosophy') return false;
    if (targetView === 'reader') {
      const lessonToCheck = targetLessonId || lessons[lessonIndex]?.id;
      // Varṇamālā and Chapter 1 (gsde101) are free for guests!
      if (lessonToCheck === 'varnamala' || lessonToCheck === 'gsde101') {
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

  const navigateToView = (
    view: DashboardView,
    lessonId?: string
  ) => {
    if (view === 'home' || view === 'faq' || view === 'philosophy') {
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

  const handleOpenGrammar = () => {
    navigateToView('grammar');
  };

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
        target === 'philosophy'
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
      if (accessMode === 'strict_gate' && activeView !== 'home' && activeView !== 'faq' && activeView !== 'philosophy') {
        setActiveView('home');
      } else if (accessMode === 'smart_freemium') {
        if (activeView !== 'home' && activeView !== 'reader' && activeView !== 'faq' && activeView !== 'philosophy') {
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

  // Keep shareable /philosophy URL in sync (other views stay on /)
  useEffect(() => {
    try {
      const desired = viewToPath(activeView);
      const current = window.location.pathname.replace(/\/+$/, '') || '/';
      if (current !== desired) {
        window.history.pushState({ view: activeView }, '', desired);
      }
    } catch {}
  }, [activeView]);

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

  // Public: if saved/current lesson is Class 8, bounce to Class 7 (or Varṇamālā).
  useEffect(() => {
    if (isAdminLoggedIn) return;
    const id = lessons[lessonIndex]?.id;
    if (!id || !id.startsWith('grade8_')) return;
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
  }, [isAdminLoggedIn, lessonIndex, lessons, activeView]);

  useEffect(() => {
    let cancelled = false;
    fetchLatestChapters()
      .then((fresh) => {
        if (!cancelled && fresh.length > 0) setLessons(fresh);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const findNextVisibleLesson = (from: number, direction: 1 | -1): number => {
    let i = from + direction;
    while (i >= 0 && i < lessons.length) {
      if (!HIDDEN_DEEPAKAM_IDS.has(lessons[i]?.id)) return i;
      i += direction;
    }
    return from;
  };

  const lesson = lessons[lessonIndex];
  const sentence = lesson?.sentences[sentenceIndex];
  const isFirstSentence = lessonIndex === 0 && sentenceIndex === 0;
  const lastVisible = (() => {
    for (let i = lessons.length - 1; i >= 0; i -= 1) {
      if (!HIDDEN_DEEPAKAM_IDS.has(lessons[i]?.id)) return i;
    }
    return lessons.length - 1;
  })();
  const isLastSentence =
    lessonIndex === lastVisible && sentenceIndex === (lesson?.sentences.length ?? 1) - 1;

  const cleanWord = (value: string): string =>
    value.replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’\-–—०-९./\\=+#*~_`]+/g, '').trim();

  const handleWordClick = (word: string) => {
    const cleaned = cleanWord(word) || word.trim();
    playPronunciation(cleaned);
    localStorage.setItem('last-stem', cleaned);
    setWordSelection({ text: cleaned, nonce: Date.now() });
  };

  const handleSelectLesson = (nextLessonId: string) => {
    if (HIDDEN_DEEPAKAM_IDS.has(nextLessonId)) return;
    if (!checkAccess('reader', nextLessonId)) return;
    const nextIndex = lessons.findIndex((item) => item.id === nextLessonId);
    if (nextIndex === -1) return;
    setLessonIndex(nextIndex);
    setSentenceIndex(0);
    setWordSelection(null);
  };

  const goNext = () => {
    if (sentenceIndex < lesson.sentences.length - 1) {
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
    setWordSelection(null);
  };

  const goPrevious = () => {
    if (sentenceIndex > 0) {
      setSentenceIndex(sentenceIndex - 1);
    } else {
      const prev = findNextVisibleLesson(lessonIndex, -1);
      if (prev !== lessonIndex) {
        const prevId = lessons[prev]?.id;
        if (!checkAccess('reader', prevId)) return;
        setLessonIndex(prev);
        setSentenceIndex(lessons[prev].sentences.length - 1);
      }
    }
    setWordSelection(null);
  };

  const jumpToSentence = (index: number) => {
    if (!lesson?.sentences?.length) return;
    const clamped = Math.max(0, Math.min(index, lesson.sentences.length - 1));
    setSentenceIndex(clamped);
    setWordSelection(null);
  };

  const openVarnamala = () => {
    if (!checkAccess('reader', 'varnamala')) return;
    const idx = lessons.findIndex((item) => item.id === 'varnamala');
    if (idx >= 0) {
      setLessonIndex(idx);
      setSentenceIndex(0);
      setWordSelection(null);
    }
    setActiveView('reader');
  };

  const openDeepakam = (lessonId?: string) => {
    const targetId =
      lessonId || (firstDeepakamIndex(lessons) >= 0 ? lessons[firstDeepakamIndex(lessons)].id : 'gsde101');
    // Public visitors: Class 8 is upcoming — do not open grade8_* lessons
    if (typeof targetId === 'string' && targetId.startsWith('grade8_') && !isAdminLoggedIn) {
      return;
    }
    if (!checkAccess('reader', targetId)) return;
    const idx = lessons.findIndex((item) => item.id === targetId);
    if (idx >= 0) {
      setLessonIndex(idx);
      setSentenceIndex(0);
      setWordSelection(null);
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
        setWordSelection(null);
      }
    }
    setActiveView('reader');
  };

  if (!lesson || !sentence) {
    return <div className="dashboard-empty">No chapter content available.</div>;
  }

  return (
    <div className={`dashboard dashboard--${activeView}${activeView !== 'reader' ? ' dashboard--scrollable' : ''}`}>
      <AccessExpiredBanner />
      <header className="dashboard-header">
        <button
          type="button"
          className="dashboard-brand-btn"
          onClick={handleBrandClick}
          title="EdNet Learn Gurukul - Go to Homepage"
        >
          <img src="/logo.jpg" alt="Interactive Sanskrit language learning dashboard for school children" className="dashboard-brand-logo-img" />
          <div className="dashboard-brand-text-col">
            <span className="dashboard-title">EdNet Learn Gurukul</span>
            <span className="dashboard-brand-sub">संस्कृत-शिक्षणम् · CBSE / NCERT</span>
          </div>
        </button>
        <nav className="dashboard-nav" aria-label="Main learning views">
          <button
            type="button"
            className={`dashboard-nav-home dashboard-nav-item${activeView === 'home' ? ' active' : ''}`}
            onClick={() => setActiveView('home')}
            title="Go to Homepage"
          >
            <img src="/nav/nav-home.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
            <span className="dashboard-nav-primary">Home</span>
          </button>
          <button
            type="button"
            className={`dashboard-nav-item dashboard-nav-stacked${activeView === 'reader' && lesson.id === 'varnamala' ? ' active' : ''}`}
            onClick={openVarnamala}
            title="Open Varṇamālā alphabet"
          >
            <img src="/nav/nav-varnamala.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
            <span className="dashboard-nav-primary">वर्णमाला</span>
            <span className="dashboard-nav-secondary">Varṇamālā</span>
          </button>
          <button
            type="button"
            className={`dashboard-nav-item dashboard-nav-stacked${activeView === 'board' ? ' active' : ''}`}
            onClick={() => navigateToView('board')}
            title="Open जोडो tile puzzle"
          >
            <img src="/nav/nav-jodo.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
            <span className="dashboard-nav-primary">जोडो</span>
            <span className="dashboard-nav-secondary">Tile Puzzle</span>
          </button>
          <div
            className={`dashboard-nav-group${activeView === 'reader' && lesson.id !== 'varnamala' ? ' dashboard-nav-group--active' : ''}`}
          >
            <span className="dashboard-nav-group-label">
              <img src="/nav/nav-deepakam.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={18} height={18} />
              CBSE · NCERT Deepakam
            </span>
            <div className="dashboard-nav-sub" role="group" aria-label="CBSE & NCERT Deepakam grades">
              <button
                type="button"
                className={activeView === 'reader' && lesson.id !== 'varnamala' && !lesson.id.startsWith('grade8_') ? 'active' : ''}
                onClick={() => openDeepakam()}
                title="CBSE Class 7 Sanskrit Board Exam Syllabus"
              >
                Class 7 (CBSE)
              </button>
              {isAdminLoggedIn ? (
                <button
                  type="button"
                  className={activeView === 'reader' && lesson.id.startsWith('grade8_') ? 'active' : ''}
                  onClick={() => openDeepakam('grade8_prarthana')}
                  title="Admin preview · CBSE Class 8 Sanskrit"
                >
                  8th (CBSE)
                  <span className="dashboard-nav-admin-chip" title="Visible only while admin is logged in">
                    Admin preview · Class 8
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  className="dashboard-nav-soon"
                  disabled
                  aria-disabled="true"
                  title="Class 8 CBSE — Upcoming"
                >
                  8th (CBSE)
                </button>
              )}
              <button type="button" className="dashboard-nav-soon" disabled aria-disabled="true" title="Class 9 CBSE - Coming soon">
                9th (CBSE)
              </button>
            </div>
          </div>
          <button
            type="button"
            className={`dashboard-nav-stacked dashboard-nav-item${activeView === 'grammar' ? ' active' : ''}`}
            onClick={handleOpenGrammar}
            title="Open Grammar shelf with all articles"
          >
            <img src="/nav/nav-grammar.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
            <span className="dashboard-nav-primary">Vyākaraṇa</span>
            <span className="dashboard-nav-secondary">Grammar</span>
          </button>
          <button
            type="button"
            className={`dashboard-nav-stacked dashboard-nav-item${activeView === 'vedic-maths' ? ' active' : ''}`}
            onClick={() => navigateToView('vedic-maths')}
            title="Open Vedic Mathematics (वैदिक-गणितम्)"
          >
            <img src="/nav/nav-vedic.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
            <span className="dashboard-nav-primary">वैदिक-गणितम्</span>
            <span className="dashboard-nav-secondary">Vedic Maths</span>
          </button>
          <button
            type="button"
            className={`dashboard-nav-stacked dashboard-nav-item${activeView === 'quiz' ? ' active' : ''}`}
            onClick={() => navigateToView('quiz')}
            title="Open Sanskrit & Vedic Maths Quiz (प्रश्नोत्तरी)"
          >
            <img src="/nav/nav-quiz.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
            <span className="dashboard-nav-primary">प्रश्नोत्तरी</span>
            <span className="dashboard-nav-secondary">Quiz</span>
          </button>
          <button
            type="button"
            className={`dashboard-nav-stacked dashboard-nav-item${activeView === 'worksheets' ? ' active' : ''}`}
            onClick={() => navigateToView('worksheets')}
            title="Open Printable Worksheets (कार्यपत्रिकाः)"
          >
            <img src="/nav/nav-worksheets.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
            <span className="dashboard-nav-primary">कार्यपत्रिकाः</span>
            <span className="dashboard-nav-secondary">Worksheets</span>
          </button>
          <button
            type="button"
            className={`dashboard-nav-faq dashboard-nav-item${activeView === 'faq' ? ' active' : ''}`}
            onClick={() => navigateToView('faq')}
            title="View FAQ & Pricing"
          >
            <img src="/nav/nav-faq.png" alt="" className="dashboard-nav-icon" aria-hidden="true" width={22} height={22} />
            <span className="dashboard-nav-primary">FAQ &amp; Pricing</span>
          </button>
        </nav>

        <div className="dashboard-header-user" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {currentUser ? (
            <button
              type="button"
              className="nav-profile-chip"
              onClick={openProfileModal}
              title={`View profile for ${currentUser.fullName}`}
            >
              <span className="nav-profile-avatar">{currentUser.avatar}</span>
              <span className="nav-profile-name">{currentUser.fullName.split(' ')[0]}</span>
              {currentUser.planStatus === 'trial' && (
                <span className="nav-trial-pill">{trialDaysLeft}d trial</span>
              )}
              {currentUser.planStatus === 'active' && (
                <span className="nav-trial-pill nav-active-pill" title="Subscription Active">⭐ Active</span>
              )}
            </button>
          ) : (
            <button
              type="button"
              className="nav-auth-btn"
              onClick={() => openAuthModal('login')}
            >
              <span>👤</span>
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </header>

      {activeView === 'home' && (
        <HomePage
          onOpenReader={(lessonId) => openDeepakam(lessonId)}
          onOpenBoard={() => navigateToView('board')}
          onOpenVarnamala={openVarnamala}
          onOpenGrammar={handleOpenGrammar}
          onOpenVedicMaths={() => navigateToView('vedic-maths')}
          onOpenQuiz={() => navigateToView('quiz')}
          onOpenWorksheets={() => navigateToView('worksheets')}
          onOpenPhilosophy={() => navigateToView('philosophy')}
        />
      )}
      {activeView === 'faq' && (
        <FAQSection onOpenRegister={() => openAuthModal('register')} />
      )}
      {activeView === 'philosophy' && (
        <PhilosophyPage
          onOpenRegister={() => openAuthModal('register')}
          onOpenVedicMaths={() => navigateToView('vedic-maths')}
          onGoHome={() => navigateToView('home')}
        />
      )}
      <Suspense fallback={<ViewLoader />}>
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
            onGoHome={() => setActiveView('home')}
            onOpenWorksheets={() => navigateToView('worksheets')}
            onOpenQuiz={() => navigateToView('quiz')}
          />
        )}
        {activeView === 'vedic-maths' && (
          <VedicMaths
            onGoHome={() => setActiveView('home')}
            onOpenReader={() => openDeepakam()}
            onOpenPhilosophy={() => navigateToView('philosophy')}
          />
        )}
        {activeView === 'quiz' && (
          <QuizSection
            onGoHome={() => setActiveView('home')}
            onOpenWorksheets={() => navigateToView('worksheets')}
            onOpenReader={() => openDeepakam()}
          />
        )}
        {activeView === 'worksheets' && (
          <WorksheetSection
            onGoHome={() => setActiveView('home')}
            onOpenQuiz={() => navigateToView('quiz')}
            onOpenReader={() => openDeepakam()}
          />
        )}
        {activeView === 'reader' && <TextbookReader
          lessons={lessons}
          activeLessonId={lesson.id}
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
          onOpenQuiz={() => navigateToView('quiz')}
          onOpenWorksheets={() => navigateToView('worksheets')}
        />}
      </Suspense>

      {activeView === 'reader' && <WordAnalyzerCard selection={wordSelection} />}

      {activeView !== 'reader' && (
        <Footer
          onOpenReader={(lessonId) => openDeepakam(lessonId)}
          onOpenBoard={() => navigateToView('board')}
          onOpenVarnamala={openVarnamala}
          onOpenGrammar={handleOpenGrammar}
          onOpenVedicMaths={() => navigateToView('vedic-maths')}
          onOpenQuiz={() => navigateToView('quiz')}
          onOpenWorksheets={() => navigateToView('worksheets')}
          onOpenFAQ={() => navigateToView('faq')}
          onOpenPhilosophy={() => navigateToView('philosophy')}
        />
      )}

      <SupportWidget
        onOpenFAQ={() => navigateToView('faq')}
        onOpenWorksheets={() => navigateToView('worksheets')}
      />

      <AuthModal />
      <UserProfileModal />
      <PaymentModal />
      <AdminModal />
    </div>
  );
};

export default Dashboard;
