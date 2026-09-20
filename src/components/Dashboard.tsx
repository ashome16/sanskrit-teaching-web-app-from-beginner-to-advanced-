import React, { useState, useEffect, lazy, Suspense } from 'react';
import HomePage from './HomePage';
import WordAnalyzerCard, { type WordSelection } from './WordAnalyzerCard';
import AuthModal from './AuthModal';
import UserProfileModal from './UserProfileModal';
import PaymentModal from './PaymentModal';
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
  const [activeView, setActiveView] = useState<
    'home' | 'board' | 'reader' | 'grammar' | 'vedic-maths' | 'quiz' | 'worksheets'
  >(() => {
    const saved = localStorage.getItem('school-active-view');
    if (
      saved === 'home' ||
      saved === 'board' ||
      saved === 'reader' ||
      saved === 'grammar' ||
      saved === 'vedic-maths' ||
      saved === 'quiz' ||
      saved === 'worksheets'
    )
      return saved;
    return 'home';
  });
  const [grammarResetKey, setGrammarResetKey] = useState(0);
  const { currentUser, openAuthModal, openProfileModal, getTrialDaysRemaining } = useAuthStore();
  const trialDaysLeft = getTrialDaysRemaining();

  const handleOpenGrammar = () => {
    setActiveView('grammar');
    setGrammarResetKey((k) => k + 1);
  };

  useEffect(() => {
    localStorage.setItem('school-active-view', activeView);
  }, [activeView]);

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
    const idx = lessons.findIndex((item) => item.id === 'varnamala');
    if (idx >= 0) {
      setLessonIndex(idx);
      setSentenceIndex(0);
      setWordSelection(null);
    }
    setActiveView('reader');
  };

  const openDeepakam = (lessonId?: string) => {
    if (lessonId) {
      const idx = lessons.findIndex((item) => item.id === lessonId);
      if (idx >= 0) {
        setLessonIndex(idx);
        setSentenceIndex(0);
        setWordSelection(null);
        setActiveView('reader');
        return;
      }
    }
    const current = lessons[lessonIndex];
    const guideIds = new Set(['varnamala', 'barakhadi', 'samyukta', 'numbers']);
    if (!current || guideIds.has(current.id) || HIDDEN_DEEPAKAM_IDS.has(current.id)) {
      const idx = firstDeepakamIndex(lessons);
      if (idx >= 0) {
        setLessonIndex(idx);
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
      <header className="dashboard-header">
        <button
          type="button"
          className="dashboard-brand-btn"
          onClick={() => setActiveView('home')}
          title="EdNet Learn Gurukul - Go to Homepage"
        >
          <img src="/logo.jpg" alt="EdNet Learn Gurukul Logo" className="dashboard-brand-logo-img" />
          <div className="dashboard-brand-text-col">
            <span className="dashboard-title">EdNet Learn Gurukul</span>
            <span className="dashboard-brand-sub">संस्कृत-शिक्षणम् · CBSE / NCERT</span>
          </div>
        </button>
        <nav className="dashboard-nav" aria-label="Main learning views">
          <button
            type="button"
            className={`dashboard-nav-home${activeView === 'home' ? ' active' : ''}`}
            onClick={() => setActiveView('home')}
            title="Go to Homepage"
          >
            🏠 Home
          </button>
          <button
            type="button"
            className={activeView === 'reader' && lesson.id === 'varnamala' ? 'active' : ''}
            onClick={openVarnamala}
          >
            Varṇamālā
          </button>
          <button
            type="button"
            className={activeView === 'board' ? 'active' : ''}
            onClick={() => setActiveView('board')}
          >
            जोडो · Tile Puzzle
          </button>
          <div
            className={`dashboard-nav-group${activeView === 'reader' && lesson.id !== 'varnamala' ? ' dashboard-nav-group--active' : ''}`}
          >
            <span className="dashboard-nav-group-label">CBSE · NCERT Deepakam</span>
            <div className="dashboard-nav-sub" role="group" aria-label="CBSE & NCERT Deepakam grades">
              <button
                type="button"
                className={activeView === 'reader' && lesson.id !== 'varnamala' && lesson.id !== 'grade8_prarthana' ? 'active' : ''}
                onClick={() => openDeepakam()}
                title="CBSE Class 7 Sanskrit Board Exam Syllabus"
              >
                Class 7 (CBSE)
              </button>
              <button
                type="button"
                className={activeView === 'reader' && lesson.id === 'grade8_prarthana' ? 'active' : ''}
                onClick={() => openDeepakam('grade8_prarthana')}
                title="CBSE Class 8 Sanskrit Syllabus & Saraswati Prarthana"
              >
                8th (CBSE)
              </button>
              <button type="button" className="dashboard-nav-soon" disabled aria-disabled="true" title="Class 9 CBSE - Coming soon">
                9th (CBSE)
              </button>
            </div>
          </div>
          <button
            type="button"
            className={`dashboard-nav-stacked${activeView === 'grammar' ? ' active' : ''}`}
            onClick={handleOpenGrammar}
            title="Open Grammar shelf with all articles"
          >
            <span className="dashboard-nav-primary">Vyākaraṇa</span>
            <span className="dashboard-nav-secondary">Grammar</span>
          </button>
          <button
            type="button"
            className={`dashboard-nav-stacked${activeView === 'vedic-maths' ? ' active' : ''}`}
            onClick={() => setActiveView('vedic-maths')}
            title="Open Vedic Mathematics (वैदिक-गणितम्)"
          >
            <span className="dashboard-nav-primary">वैदिक-गणितम्</span>
            <span className="dashboard-nav-secondary">Vedic Maths</span>
          </button>
          <button
            type="button"
            className={`dashboard-nav-stacked${activeView === 'quiz' ? ' active' : ''}`}
            onClick={() => setActiveView('quiz')}
            title="Open Sanskrit & Vedic Maths Quiz (प्रश्नोत्तरी)"
          >
            <span className="dashboard-nav-primary">प्रश्नोत्तरी</span>
            <span className="dashboard-nav-secondary">Quiz</span>
          </button>
          <button
            type="button"
            className={`dashboard-nav-stacked${activeView === 'worksheets' ? ' active' : ''}`}
            onClick={() => setActiveView('worksheets')}
            title="Open Printable Worksheets (कार्यपत्रिकाः)"
          >
            <span className="dashboard-nav-primary">कार्यपत्रिकाः</span>
            <span className="dashboard-nav-secondary">Worksheets</span>
          </button>
          <button
            type="button"
            className="dashboard-nav-faq"
            onClick={() => {
              setActiveView('home');
              setTimeout(() => {
                const el = document.getElementById('faq-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 120);
            }}
            title="View FAQ, 2-Week Trial & Pricing"
          >
            ❓ FAQ &amp; Plans
          </button>
        </nav>

        <div className="dashboard-header-user">
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
          onOpenReader={openDeepakam}
          onOpenBoard={() => setActiveView('board')}
          onOpenVarnamala={openVarnamala}
          onOpenGrammar={handleOpenGrammar}
          onOpenVedicMaths={() => setActiveView('vedic-maths')}
          onOpenQuiz={() => setActiveView('quiz')}
          onOpenWorksheets={() => setActiveView('worksheets')}
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
            onOpenWorksheets={() => setActiveView('worksheets')}
            onOpenQuiz={() => setActiveView('quiz')}
          />
        )}
        {activeView === 'vedic-maths' && (
          <VedicMaths
            onGoHome={() => setActiveView('home')}
            onOpenReader={() => openDeepakam()}
          />
        )}
        {activeView === 'quiz' && (
          <QuizSection
            onGoHome={() => setActiveView('home')}
            onOpenWorksheets={() => setActiveView('worksheets')}
            onOpenReader={() => openDeepakam()}
          />
        )}
        {activeView === 'worksheets' && (
          <WorksheetSection
            onGoHome={() => setActiveView('home')}
            onOpenQuiz={() => setActiveView('quiz')}
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
          onOpenQuiz={() => setActiveView('quiz')}
          onOpenWorksheets={() => setActiveView('worksheets')}
        />}
      </Suspense>

      {activeView === 'reader' && <WordAnalyzerCard selection={wordSelection} />}

      {activeView !== 'reader' && (
        <Footer
          onOpenReader={(lessonId) => openDeepakam(lessonId)}
          onOpenBoard={() => setActiveView('board')}
          onOpenVarnamala={openVarnamala}
          onOpenGrammar={handleOpenGrammar}
          onOpenVedicMaths={() => setActiveView('vedic-maths')}
          onOpenQuiz={() => setActiveView('quiz')}
          onOpenWorksheets={() => setActiveView('worksheets')}
          onOpenFAQ={() => setActiveView('home')}
        />
      )}

      <SupportWidget
        onOpenFAQ={() => setActiveView('home')}
        onOpenWorksheets={() => setActiveView('worksheets')}
      />

      <AuthModal />
      <UserProfileModal />
      <PaymentModal />
      <AdminModal />
    </div>
  );
};

export default Dashboard;
