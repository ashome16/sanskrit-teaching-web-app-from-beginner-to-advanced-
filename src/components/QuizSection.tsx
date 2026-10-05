import React, { useEffect, useState, useMemo } from 'react';
import { QUIZ_CATEGORIES, QUIZ_QUESTIONS, type QuizQuestionItem } from '../data/quizData';
import { anchorForLiteratureCategory, categoryForLiteratureAnchor } from '../data/literatureGrammarQuizzes';
import { playPronunciation } from '../utils/pronunciation';
import { useAppStore } from '../store';
import { useAuthStore } from '../store/authStore';
import { canAccessAllChapters, canDownloadContent, getDownloadGateReason } from '../utils/premiumAccess';
import { PAID_FEATURE_GATE } from '../utils/paidFeatureGateCopy';
import { downloadQuizSheet } from '../utils/contentDownload';
import '../styles/quiz-section.css';

export type QuizTrackId = 'all' | 'class7' | 'class8' | 'class9' | 'grammar' | 'vedic_maths';

interface QuizTrack {
  id: QuizTrackId;
  label: string;
  sublabel: string;
  icon: string;
  countBadge: string;
  requiresAllChapters?: boolean;
}

const isLiteratureGrammarCategory = (category: string): boolean =>
  category === 'grammar' || category === 'varnamala' || category.startsWith('lit_grammar');

const ALL_QUIZ_COUNT = QUIZ_QUESTIONS.length;
const GRAMMAR_QUIZ_COUNT = QUIZ_QUESTIONS.filter((q) => isLiteratureGrammarCategory(q.category)).length;
const formatQuizCount = (count: number): string => `${count.toLocaleString('en-US')} Qs`;

export const QUIZ_TRACKS: QuizTrack[] = [
  {
    id: 'all',
    label: 'All Topics',
    sublabel: 'Full Curriculum',
    icon: '🎯',
    countBadge: formatQuizCount(ALL_QUIZ_COUNT),
  },
  {
    id: 'class7',
    label: 'Deepakam 7th grade · दीपकम',
    sublabel: '14 Lessons & Appendices',
    icon: '📚',
    countBadge: '486 Qs',
  },
  {
    id: 'class8',
    label: 'Deepakam 8th grade · दीपकम',
    sublabel: '16 Chapters & Appendices',
    icon: '🏛️',
    countBadge: '490 Qs',
    requiresAllChapters: true,
  },
  {
    id: 'class9',
    label: 'शारदा · Class 9',
    sublabel: '16 Chapters & Appendices',
    icon: '🌸',
    countBadge: '480 Qs',
    requiresAllChapters: true,
  },
  {
    id: 'grammar',
    label: 'Grammar & Foundations',
    sublabel: 'Vyākaraṇa, Varṇamālā & literature lines',
    icon: '📐',
    countBadge: formatQuizCount(GRAMMAR_QUIZ_COUNT),
  },
  {
    id: 'vedic_maths',
    label: 'Vedic Mathematics',
    sublabel: 'Speed Sutras & Calculation',
    icon: '⚡',
    countBadge: '5 Qs',
  },
];

export const TRACK_CATEGORY_IDS: Record<QuizTrackId, string[]> = {
  all: [],
  class7: [
    'cbse_deepakam',
    'deep_ch1',
    'deep_ch2',
    'deep_ch3',
    'deep_ch4',
    'deep_ch5',
    'deep_ch6',
    'deep_ch7',
    'deep_ch8',
    'deep_ch9',
    'deep_ch10',
    'deep_ch11',
    'deep_ch12',
    'deep_ch13',
    'deep_ch14',
  ],
  class8: [
    'grade8_all',
    'grade8_prarthana',
    'grade8_ch1',
    'grade8_ch2',
    'grade8_ch3',
    'grade8_ch4',
    'grade8_ch5',
    'grade8_ch6',
    'grade8_ch7',
    'grade8_ch8',
    'grade8_ch9',
    'grade8_ch10',
    'grade8_ch11',
    'grade8_ch12',
    'grade8_ch13',
    'grade8_app1',
    'grade8_app2',
    'grade8_app3',
  ],
  class9: [
    'grade9_all',
    'grade9_ch1',
    'grade9_ch2',
    'grade9_ch3',
    'grade9_ch4',
    'grade9_ch5',
    'grade9_ch6',
    'grade9_ch7',
    'grade9_ch8',
    'grade9_ch9',
    'grade9_ch10',
    'grade9_ch11',
    'grade9_ch12',
    'grade9_samasa',
    'grade9_vachya',
    'grade9_shabda',
    'grade9_dhatu',
  ],
  grammar: ['grammar_all', 'grammar', 'lit_grammar_basic', 'lit_grammar_middle', 'lit_grammar_higher', 'varnamala'],
  vedic_maths: ['vedic_maths'],
};

const formatPillLabel = (label: string): string => {
  return label.replace(/\s*\([^)]*(?:Quizzes|Qs|Chapters)[^)]*\)$/i, '').trim();
};

interface QuizSectionProps {
  onGoHome?: () => void;
  onOpenWorksheets?: () => void;
  onOpenReader?: () => void;
  /** Opens one literature-grammar quiz, e.g. lit-grammar-basic. */
  initialAnchor?: string | null;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  onGoHome,
  onOpenWorksheets,
  onOpenReader,
  initialAnchor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTrack, setActiveTrack] = useState<QuizTrackId>('all');
  const [chapterSearch, setChapterSearch] = useState<string>('');
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestionItem[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  useEffect(() => {
    if (!initialAnchor) return;
    const categoryId = categoryForLiteratureAnchor(initialAnchor);
    if (!categoryId) return;
    setActiveTrack('grammar');
    setSelectedCategory(categoryId);
    setChapterSearch('');
  }, [initialAnchor]);

  useEffect(() => {
    if (!initialAnchor) return;
    if (categoryForLiteratureAnchor(initialAnchor) !== selectedCategory) return;
    document.getElementById(initialAnchor)?.scrollIntoView({ block: 'start' });
  }, [initialAnchor, selectedCategory, activeTrack]);


  const { recordQuizAttempt, progress } = useAppStore();
  const quizAttempts = progress?.quizzesCompleted || [];
  const { isAdminLoggedIn, currentUser, openAuthModal, openPaymentModal } = useAuthStore();
  const canDownload = canDownloadContent(currentUser, isAdminLoggedIn);
  const gateReason = getDownloadGateReason(currentUser, isAdminLoggedIn);

  const canReadAllChapters = canAccessAllChapters(currentUser, isAdminLoggedIn);

  const visibleCategories = useMemo(
    () =>
      QUIZ_CATEGORIES.filter(
        (cat) =>
          canReadAllChapters ||
          (!cat.id.startsWith('grade8') && !cat.id.startsWith('grade9'))
      ),
    [canReadAllChapters]
  );

  const publicQuestions = useMemo(
    () =>
      canReadAllChapters
        ? QUIZ_QUESTIONS
        : QUIZ_QUESTIONS.filter(
            (q) =>
              !String(q.category).startsWith('grade8') &&
              !String(q.category).startsWith('grade9')
          ),
    [canReadAllChapters]
  );

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return publicQuestions;
    if (selectedCategory === 'grade8_all') {
      return publicQuestions.filter((q) => String(q.category).startsWith('grade8'));
    }
    if (selectedCategory === 'grade9_all') {
      return publicQuestions.filter((q) => String(q.category).startsWith('grade9'));
    }
    if (selectedCategory === 'grammar_all') {
      return publicQuestions.filter((q) => isLiteratureGrammarCategory(q.category));
    }
    if (selectedCategory === 'cbse_deepakam') {
      return publicQuestions.filter(
        (q) =>
          q.category === 'cbse_deepakam' ||
          (typeof q.category === 'string' && q.category.startsWith('deep_ch'))
      );
    }
    if (selectedCategory === 'deep_ch1') {
      return publicQuestions.filter(
        (q) =>
          q.category === 'cbse_deepakam' ||
          q.category === 'deep_ch1' ||
          ((q.chapterRef?.includes('Chapter 1:') || q.chapterRef?.includes('वन्दे भारतमातरम्')) &&
            q.category !== 'grammar' &&
            !String(q.category).startsWith('deep_ch1') &&
            !String(q.category).startsWith('grade8') &&
            !String(q.category).startsWith('grade9'))
      );
    }
    if (selectedCategory === 'deep_ch2') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch2' || q.chapterRef?.includes('Chapter 2') || q.chapterRef?.includes('नित्यं पिबाम')
      );
    }
    if (selectedCategory === 'deep_ch3') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch3' || q.chapterRef?.includes('Chapter 3') || q.chapterRef?.includes('मित्राय नमः')
      );
    }
    if (selectedCategory === 'deep_ch4') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch4' || q.chapterRef?.includes('Chapter 4') || q.chapterRef?.includes('द्राक्षाफलम्')
      );
    }
    if (selectedCategory === 'deep_ch5') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch5' || q.chapterRef?.includes('Chapter 5') || q.chapterRef?.includes('सेवा हि परमो धर्मः')
      );
    }
    if (selectedCategory === 'deep_ch6') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch6' || q.chapterRef?.includes('Chapter 6') || q.chapterRef?.includes('श्लोकान्त्याक्षरीम्')
      );
    }
    if (selectedCategory === 'deep_ch7') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch7' || q.chapterRef?.includes('Chapter 7') || q.chapterRef?.includes('ईशावास्यम्')
      );
    }
    if (selectedCategory === 'deep_ch8') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch8' || q.chapterRef?.includes('Chapter 8') || q.chapterRef?.includes('हितं मनोहारि')
      );
    }
    if (selectedCategory === 'deep_ch9') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch9' || q.chapterRef?.includes('Chapter 9') || q.chapterRef?.includes('अन्नाद् भवन्ति')
      );
    }
    if (selectedCategory === 'deep_ch10') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch10' || q.chapterRef?.includes('Chapter 10') || q.chapterRef?.includes('दशमः कः')
      );
    }
    if (selectedCategory === 'deep_ch11') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch11' || q.chapterRef?.includes('Chapter 11') || q.chapterRef?.includes('द्वीपोऽण्डमानः') || q.chapterRef?.includes('अण्डमान')
      );
    }
    if (selectedCategory === 'deep_ch12') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch12' || q.chapterRef?.includes('Chapter 12') || q.chapterRef?.includes('पन्नाधाया')
      );
    }
    if (selectedCategory === 'deep_ch13') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch13' || q.chapterRef?.includes('वर्णमात्रा')
      );
    }
    if (selectedCategory === 'deep_ch14') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch14' || q.chapterRef?.includes('शब्दरूपाणि')
      );
    }
    return publicQuestions.filter((q) => q.category === selectedCategory);
  }, [selectedCategory, publicQuestions]);

  const activeTrackObj = useMemo(
    () => QUIZ_TRACKS.find((t) => t.id === activeTrack) || QUIZ_TRACKS[0],
    [activeTrack]
  );

  const currentCategoryItem = useMemo(
    () => QUIZ_CATEGORIES.find((c) => c.id === selectedCategory),
    [selectedCategory]
  );

  const getCategoryCount = useMemo(() => {
    return (catId: string): number => {
      if (catId === 'all') return publicQuestions.length;
      if (catId === 'grade8_all') return publicQuestions.filter((q) => String(q.category).startsWith('grade8')).length;
      if (catId === 'grade9_all') return publicQuestions.filter((q) => String(q.category).startsWith('grade9')).length;
      if (catId === 'grammar_all') return publicQuestions.filter((q) => isLiteratureGrammarCategory(q.category)).length;
      if (catId === 'cbse_deepakam') {
        return publicQuestions.filter(
          (q) => q.category === 'cbse_deepakam' || (typeof q.category === 'string' && q.category.startsWith('deep_ch'))
        ).length;
      }
      if (catId === 'deep_ch1') {
        return publicQuestions.filter(
          (q) =>
            q.category === 'cbse_deepakam' ||
            q.category === 'deep_ch1' ||
            ((q.chapterRef?.includes('Chapter 1:') || q.chapterRef?.includes('वन्दे भारतमातरम्')) &&
              q.category !== 'grammar' &&
              !String(q.category).startsWith('deep_ch1') &&
              !String(q.category).startsWith('grade8') &&
              !String(q.category).startsWith('grade9'))
        ).length;
      }
      return publicQuestions.filter((q) => q.category === catId).length;
    };
  }, [publicQuestions]);

  const displayedCategories = useMemo(() => {
    let list = visibleCategories;
    if (activeTrack !== 'all') {
      const allowed = new Set(TRACK_CATEGORY_IDS[activeTrack]);
      list = list.filter((cat) => allowed.has(cat.id));
    }
    if (chapterSearch.trim()) {
      const query = chapterSearch.toLowerCase().trim();
      list = list.filter(
        (cat) =>
          cat.label.toLowerCase().includes(query) ||
          cat.id.toLowerCase().includes(query)
      );
    }
    return list;
  }, [activeTrack, chapterSearch, visibleCategories]);

  const handleSelectTrack = (trackId: QuizTrackId) => {
    if ((trackId === 'class8' || trackId === 'class9') && !canReadAllChapters) {
      if (gateReason === 'guest') {
        openAuthModal('register');
      } else {
        openPaymentModal('unlock_paid_features');
      }
      setShowUpgradePrompt(true);
      return;
    }
    setActiveTrack(trackId);
    setChapterSearch('');
    if (trackId === 'all') setSelectedCategory('all');
    else if (trackId === 'class7') setSelectedCategory('cbse_deepakam');
    else if (trackId === 'class8') setSelectedCategory('grade8_all');
    else if (trackId === 'class9') setSelectedCategory('grade9_all');
    else if (trackId === 'grammar') setSelectedCategory('grammar_all');
    else if (trackId === 'vedic_maths') setSelectedCategory('vedic_maths');
  };

  const requireDownloadAccess = (): boolean => {
    if (canDownload) {
      setShowUpgradePrompt(false);
      return true;
    }
    setShowUpgradePrompt(true);
    if (gateReason === 'guest') {
      openAuthModal('register');
    } else {
      openPaymentModal('unlock_paid_features');
    }
    return false;
  };

  /** Paid-only: finishing a quiz for the full assessment report (score + answer review). */
  const requireAssessmentAccess = (): boolean => requireDownloadAccess();

  const handleDownloadFilteredQuiz = () => {
    if (!requireDownloadAccess()) return;
    if (filteredQuestions.length === 0) return;
    // Cap oversized "All Topics" exports so the HTML stays printable offline.
    const MAX_PRACTICE = 80;
    const questions =
      selectedCategory === 'all' && filteredQuestions.length > MAX_PRACTICE
        ? filteredQuestions.slice(0, MAX_PRACTICE)
        : filteredQuestions;
    const catLabel =
      QUIZ_CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'Quiz Practice';
    const title =
      questions.length < filteredQuestions.length
        ? `${catLabel} (first ${questions.length} of ${filteredQuestions.length})`
        : catLabel;
    downloadQuizSheet(title, questions, {
      includeAnswers: false,
      filenameHint: `practice-${selectedCategory}`,
    });
  };

  const handleDownloadResults = () => {
    if (!activeQuestions) return;
    if (!requireDownloadAccess()) return;
    const catLabel =
      QUIZ_CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'Quiz Results';
    downloadQuizSheet(`${catLabel} · Results`, activeQuestions, {
      includeAnswers: true,
      userAnswers,
      scoreLabel: `Score: ${score} / ${activeQuestions.length * 10} points`,
      filenameHint: `results-${selectedCategory}`,
    });
  };

  const availableSubQuizzes = useMemo(() => {
    const list: { title: string; count: number }[] = [];
    const seen = new Set<string>();
    filteredQuestions.forEach((q) => {
      if (q.subCategory && !seen.has(q.subCategory)) {
        seen.add(q.subCategory);
        const count = filteredQuestions.filter((item) => item.subCategory === q.subCategory).length;
        list.push({ title: q.subCategory, count });
      }
    });
    return list;
  }, [filteredQuestions]);

  const startSpecificQuiz = (subCategoryTitle: string) => {
    const specificQuestions = publicQuestions.filter((q) => q.subCategory === subCategoryTitle);
    if (specificQuestions.length === 0) return;
    setActiveQuestions(specificQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setUserAnswers({});
    setScore(0);
    setIsCompleted(false);
    setShowReview(false);
  };

  const startQuiz = (count: number) => {
    const pool = [...filteredQuestions].sort(() => 0.5 - Math.random());
    const selected = pool.slice(0, Math.min(count, pool.length));
    setActiveQuestions(selected);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setUserAnswers({});
    setScore(0);
    setIsCompleted(false);
    setShowReview(false);
  };

  const handleShareScore = () => {
    if (!activeQuestions) return;
    const catObj = QUIZ_CATEGORIES.find((c) => c.id === selectedCategory);
    const catLabel = catObj?.label || 'Sanskrit & Vedic Maths';
    const percent = Math.round((score / (activeQuestions.length * 10)) * 100);
    const shareText = `🎯 I scored ${score}/${activeQuestions.length * 10} points (${percent}%) on the "${catLabel}" Quiz at EdNet Learn Gurukul!\n\nCan you beat my score? Test your Sanskrit & Vedic Maths skills here:\n${window.location.origin}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: 'EdNet Learn Gurukul Quiz Score',
          text: shareText,
          url: window.location.origin,
        })
        .catch(() => {});
    } else {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(idx);
    setIsAnswerChecked(true);

    if (!activeQuestions) return;
    const currentQ = activeQuestions[currentIndex];
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + currentQ.points);
    }
  };

  const handleNext = () => {
    if (!activeQuestions) return;
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      // Final submit → assessment report is paid-only (trial users must subscribe).
      if (!requireAssessmentAccess()) return;
      setIsCompleted(true);
      const attempt = {
        id: 'quiz_' + Date.now(),
        quizId: selectedCategory,
        userId: 'current_user',
        timestamp: Date.now(),
        score: score + (selectedOption === activeQuestions[currentIndex].correctIndex ? activeQuestions[currentIndex].points : 0),
        totalPoints: activeQuestions.length * 10,
        answers: activeQuestions.map((q) => ({
          questionId: q.id,
          userAnswer: q.options[userAnswers[q.id]] || '',
          correct: userAnswers[q.id] === q.correctIndex,
          points: userAnswers[q.id] === q.correctIndex ? q.points : 0,
        })),
      };
      recordQuizAttempt(attempt);
    }
  };

  const currentQ = activeQuestions ? activeQuestions[currentIndex] : null;

  return (
    <section className="quiz-section">
      {/* Top Header */}
      <header className="quiz-header">
        <div className="quiz-header-left">
          <img src="/logo.jpg" alt="Sanskrit and Vedic Maths quiz practice for school children" className="quiz-header-logo" />
          <div>
            <h2 className="quiz-title">प्रश्नोत्तरी · Sanskrit &amp; Vedic Maths Quiz</h2>
            <p className="quiz-subtitle">
              CBSE Class 7 Deepakam Exam Prep · Vyākaraṇa Grammar · Vedic Mental Maths
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {!activeQuestions && (
            <>
              <button
                type="button"
                className={`quiz-download-btn${canDownload ? '' : ' locked'}`}
                onClick={handleDownloadFilteredQuiz}
                title={
                  canDownload
                    ? 'Download current topic as offline practice HTML'
                    : 'Paid subscription required to download practice sheets'
                }
              >
                {canDownload ? '⬇️ Download Practice Sheet' : '🔒 Download (Paid)'}
              </button>
              <button
                type="button"
                className={`quiz-history-btn${canDownload ? '' : ' locked'}`}
                onClick={() => {
                  if (!requireAssessmentAccess()) return;
                  setShowHistoryModal(true);
                }}
                title={
                  canDownload
                    ? 'View your past quiz submissions & graded answers'
                    : 'Paid subscription required to view My Submissions history'
                }
              >
                {canDownload ? '📋 My Submissions' : '🔒 My Submissions (Paid)'}
              </button>
            </>
          )}
          {onOpenReader && (
            <button type="button" className="quiz-home-btn" onClick={onOpenReader}>
              📖 Deepakam Reader
            </button>
          )}
          {onOpenWorksheets && (
            <button type="button" className="quiz-home-btn" onClick={onOpenWorksheets}>
              📑 Printable Worksheets
            </button>
          )}
          {onGoHome && (
            <button type="button" className="quiz-home-btn" onClick={onGoHome}>
              🏠 Back to Home
            </button>
          )}
        </div>
      </header>

      {showUpgradePrompt && !canDownload && (
        <div className="quiz-upgrade-banner" role="status">
          <div>
            <strong>
              {gateReason === 'guest'
                ? PAID_FEATURE_GATE.bannerTitleGuest
                : gateReason === 'trial'
                ? PAID_FEATURE_GATE.bannerTitleTrial
                : PAID_FEATURE_GATE.bannerTitleExpired}
            </strong>
            <p>
              {gateReason === 'guest'
                ? PAID_FEATURE_GATE.bannerBodyGuest
                : gateReason === 'trial'
                ? PAID_FEATURE_GATE.bannerBodyTrial
                : PAID_FEATURE_GATE.bannerBodyExpired}
            </p>
          </div>
          <div className="quiz-upgrade-actions">
            {gateReason === 'guest' ? (
              <button type="button" className="quiz-retry-btn" onClick={() => openAuthModal('register')}>
                {PAID_FEATURE_GATE.ctaGuest}
              </button>
            ) : gateReason === 'expired' ? (
              <button type="button" className="quiz-retry-btn" onClick={() => openPaymentModal('unlock_paid_features')}>
                {PAID_FEATURE_GATE.ctaSubscribe}
              </button>
            ) : null}
            <button type="button" className="quiz-home-btn" onClick={() => setShowUpgradePrompt(false)}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* View 1: Quiz Home / Mode Picker */}
      {!activeQuestions ? (
        <>
          {/* Tier 1: Primary Curriculum Track Tabs */}
          <nav className="quiz-tracks-nav" aria-label="Curriculum Tracks">
            {QUIZ_TRACKS.map((track) => {
              const isLocked = track.requiresAllChapters && !canReadAllChapters;
              const isActive = activeTrack === track.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  className={`quiz-track-tab${isActive ? ' active' : ''}`}
                  onClick={() => handleSelectTrack(track.id)}
                  title={isLocked ? `${track.label} (Premium Access Required)` : track.label}
                >
                  <span className="quiz-track-tab-icon">{track.icon}</span>
                  <div className="quiz-track-tab-text">
                    <span className="quiz-track-tab-title">
                      {track.label} {isLocked ? '🔒' : ''}
                    </span>
                    <span className="quiz-track-tab-sub">{track.sublabel}</span>
                  </div>
                  <span className="quiz-track-tab-badge">{track.countBadge}</span>
                </button>
              );
            })}
          </nav>

          {/* Tier 2: Contextual Chapter Panel */}
          <div className="quiz-chapter-panel">
            <div className="quiz-chapter-panel-header">
              <h3 className="quiz-chapter-panel-title">
                <span>{activeTrack === 'all' && !chapterSearch.trim() ? '🎯' : activeTrackObj.icon}</span>
                <span>
                  {activeTrack === 'all'
                    ? chapterSearch.trim()
                      ? `Matching Chapters (${displayedCategories.length})`
                      : 'Curriculum Tracks Overview'
                    : `${activeTrackObj.label} Chapters`}
                </span>
                <span className="quiz-chapter-panel-badge">
                  {activeTrack === 'all' && !chapterSearch.trim()
                    ? `5 Tracks · ${formatQuizCount(ALL_QUIZ_COUNT)}`
                    : `${displayedCategories.length} Topics`}
                </span>
              </h3>

              <div className="quiz-chapter-search-box">
                <span aria-hidden="true">🔍</span>
                <input
                  type="text"
                  className="quiz-chapter-search-input"
                  placeholder={
                    activeTrack === 'all'
                      ? 'Search all 51+ chapters & shlokas...'
                      : `Search ${activeTrackObj.label} chapters...`
                  }
                  value={chapterSearch}
                  onChange={(e) => setChapterSearch(e.target.value)}
                />
                {chapterSearch && (
                  <button
                    type="button"
                    className="quiz-chapter-search-clear"
                    onClick={() => setChapterSearch('')}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* When 'all' track has no active search: Render curated Curriculum Overview Cards */}
            {activeTrack === 'all' && !chapterSearch.trim() ? (
              <div className="quiz-overview-grid">
                {QUIZ_TRACKS.filter((t) => t.id !== 'all').map((track) => {
                  const isLocked = track.requiresAllChapters && !canReadAllChapters;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      className="quiz-overview-card"
                      onClick={() => handleSelectTrack(track.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{track.icon}</span>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1f2937' }}>
                            {track.label} {isLocked ? '🔒' : ''}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#786b59', fontWeight: 600, marginTop: '0.15rem' }}>
                            {track.sublabel}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid #f4ede2' }}>
                        <span
                          style={{
                            fontSize: '0.76rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '999px',
                            background: '#fef3c7',
                            color: '#92400e',
                            border: '1px solid #fde68a',
                          }}
                        >
                          {track.countBadge}
                        </span>
                        <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#b3472f' }}>
                          {isLocked ? 'Unlock Track ➔' : 'Explore Chapters ➔'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Specific track or active search: Scoped Chapter Pills */
              <div className="quiz-categories-bar">
                {displayedCategories.length === 0 ? (
                  <div style={{ padding: '1rem', color: '#786b59', fontStyle: 'italic', fontSize: '0.9rem' }}>
                    No chapters match "{chapterSearch}". Try searching by chapter name or Sanskrit keyword.
                  </div>
                ) : (
                  displayedCategories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const count = getCategoryCount(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        id={anchorForLiteratureCategory(cat.id) || undefined}
                        className={`quiz-cat-pill${isSelected ? ' active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                      >
                        <span>{cat.icon}</span>
                        <span>{formatPillLabel(cat.label)}</span>
                        {count > 0 && <span className="quiz-pill-count">{count} Qs</span>}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Active Topic Summary Card */}
          <div className="quiz-active-topic-card">
            <div className="quiz-active-topic-header">
              <span className="quiz-active-topic-icon">{currentCategoryItem?.icon || '🎯'}</span>
              <div>
                <div className="quiz-active-topic-tag">
                  {activeTrackObj.label} · Active Selection
                </div>
                <h3 className="quiz-active-topic-title">
                  {currentCategoryItem ? formatPillLabel(currentCategoryItem.label) : 'All Topics (समग्र-प्रश्नोत्तरी)'}
                </h3>
              </div>
            </div>
            <div className="quiz-active-topic-stats">
              <span className="quiz-active-stat-badge">
                🎯 {filteredQuestions.length} Questions Available
              </span>
              {availableSubQuizzes.length > 0 && (
                <span className="quiz-active-stat-badge">
                  📋 {availableSubQuizzes.length} Practice Quizzes
                </span>
              )}
              <button
                type="button"
                className={`quiz-download-btn${canDownload ? '' : ' locked'}`}
                onClick={handleDownloadFilteredQuiz}
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                title={canDownload ? 'Download printable practice sheet' : 'Paid subscription required to download'}
              >
                {canDownload ? '📥 Download Printable Sheet' : '🔒 Download Sheet (Paid)'}
              </button>
            </div>
          </div>

          {/* Individual Chapter / Topic Quizzes (if available and focused) */}
          {availableSubQuizzes.length > 0 && selectedCategory !== 'all' && (
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2b2118', margin: 0 }}>
                  📋 Individual Practice Quizzes ({availableSubQuizzes.length} Available)
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#78350f', fontWeight: 700 }}>
                  {availableSubQuizzes.length > 15
                    ? `Showing 12 of ${availableSubQuizzes.length} · Pick a specific chapter above to focus`
                    : 'Select a quiz to practise its questions'}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '0.85rem' }}>
                {(availableSubQuizzes.length > 15 ? availableSubQuizzes.slice(0, 12) : availableSubQuizzes).map((sq) => (
                  <button
                    key={sq.title}
                    type="button"
                    onClick={() => startSpecificQuiz(sq.title)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1.15rem',
                      background: '#fff',
                      border: '1.5px solid #ebdcc5',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#b3472f';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(179, 71, 47, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#ebdcc5';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#1f2937', lineHeight: 1.35 }}>
                        {sq.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#b3472f', fontWeight: 700, marginTop: '0.25rem' }}>
                        🎯 {sq.count} Questions · {sq.count * 10} Points
                      </div>
                    </div>
                    <span style={{ fontSize: '1.2rem', color: '#b3472f', marginLeft: '0.5rem', flexShrink: 0 }}>➔</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Mode Cards */}
          <div className="quiz-modes-grid">
            <div className="quiz-mode-card" onClick={() => startQuiz(5)}>
              <span className="quiz-mode-icon">⚡</span>
              <h3 className="quiz-mode-title">Quick 5-Question Sprint</h3>
              <p className="quiz-mode-desc">
                Ideal for a rapid 3-minute test on your phone or between classes. Earn points and maintain your daily streak!
              </p>
              <span className="quiz-mode-action-btn">Start Sprint (5 Questions) ➔</span>
            </div>

            <div className="quiz-mode-card" onClick={() => startQuiz(10)}>
              <span className="quiz-mode-icon">🎯</span>
              <h3 className="quiz-mode-title">10-Question CBSE Board Exam Drill</h3>
              <p className="quiz-mode-desc">
                Balanced mix of shloka anvaya, sandhi rules, vibhakti identification, and Sanskrit vocabulary.
              </p>
              <span className="quiz-mode-action-btn">Start Exam Drill (10 Questions) ➔</span>
            </div>

            <div className="quiz-mode-card" onClick={() => startQuiz(filteredQuestions.length)}>
              <span className="quiz-mode-icon">🏆</span>
              <h3 className="quiz-mode-title">Master Challenge (All Questions)</h3>
              <p className="quiz-mode-desc">
                Comprehensive challenge covering all available questions in {selectedCategory === 'all' ? 'all categories' : 'this topic'}.
              </p>
              <span className="quiz-mode-action-btn">
                Start All ({filteredQuestions.length} Questions) ➔
              </span>
            </div>
          </div>
        </>
      ) : isCompleted ? (
        /* View 3: Quiz Results & Review */
        <div className="quiz-result-container">
          <div className="quiz-result-icon">
            {score >= activeQuestions.length * 8 ? '🎉' : score >= activeQuestions.length * 5 ? '🌟' : '📚'}
          </div>
          <h3 className="quiz-result-title">
            {score >= activeQuestions.length * 8
              ? 'अति उत्तमम्! · Outstanding Performance!'
              : score >= activeQuestions.length * 5
              ? 'उत्तमम्! · Well Done!'
              : 'अभ्यासः करणीयः · Keep Practicing!'}
          </h3>
          <p className="quiz-result-subtitle">
            You completed the quiz with {Math.round((score / (activeQuestions.length * 10)) * 100)}% accuracy.
          </p>

          <div className="quiz-score-circle">
            <span className="quiz-score-num">{score}</span>
            <span className="quiz-score-total">/ {activeQuestions.length * 10} Points</span>
          </div>

          <div className="quiz-result-actions">
            <button
              type="button"
              className="quiz-retry-btn"
              onClick={() => startQuiz(activeQuestions.length)}
            >
              🔄 Retake Quiz
            </button>
            <button
              type="button"
              className={`quiz-download-btn${canDownload ? '' : ' locked'}`}
              onClick={handleDownloadResults}
              title={canDownload ? 'Generate and download printable evaluation report with answer key' : 'Paid access required'}
            >
              {canDownload ? '📄 Generate Evaluation Report' : '🔒 Generate Evaluation Report (Paid)'}
            </button>
            <button
              type="button"
              className={`quiz-review-toggle-btn${canDownload ? '' : ' locked'}`}
              onClick={() => {
                if (!requireAssessmentAccess()) return;
                setShowReview(!showReview);
              }}
              title={canDownload ? 'Review questions, your answers and detailed explanations' : 'Paid subscription required to view detailed answers'}
            >
              {canDownload ? (showReview ? 'Hide Answer Review' : '📝 Review My Answers') : '🔒 Review My Answers (Paid)'}
            </button>
            <button
              type="button"
              className="quiz-share-btn"
              onClick={handleShareScore}
              title="Share your score with classmates and parents on WhatsApp"
            >
              📲 Share on WhatsApp
            </button>
            <button
              type="button"
              className="quiz-review-toggle-btn"
              onClick={() => setActiveQuestions(null)}
            >
              Select Another Topic
            </button>
          </div>

          {!canDownload && gateReason === 'expired' && (
            <div className="quiz-subscription-pitch-card">
              <div className="quiz-pitch-header">
                <span className="quiz-pitch-badge">⭐ Free trial ended · Full access</span>
                <h4 className="quiz-pitch-title">Unlock Full Graded Answers &amp; Detailed Evaluation Reports</h4>
                <p className="quiz-pitch-desc">
                  Accelerate Sanskrit and Vedic Maths fluency. Subscribed students get CBSE teacher-reviewed answer explanations, unlimited quiz submissions, verified performance certificates, and printable evaluation reports.
                </p>
              </div>
              <ul className="quiz-pitch-perks">
                <li>
                  <span>📄</span>
                  <span><strong>Detailed Evaluation Reports:</strong> Printable question-by-question analytics &amp; CBSE mark sheets.</span>
                </li>
                <li>
                  <span>📝</span>
                  <span><strong>Full Answer Keys:</strong> Comprehensive Vyākaraṇa &amp; Sutra breakdowns for all questions.</span>
                </li>
                <li>
                  <span>📋</span>
                  <span><strong>Submission History:</strong> Track retention curve, accuracy trends, and chapter mastery over time.</span>
                </li>
                <li>
                  <span>🏆</span>
                  <span><strong>Verified Certificate:</strong> Earned upon completing master challenges across all chapters.</span>
                </li>
              </ul>
              <button
                type="button"
                className="quiz-pitch-cta-btn"
                onClick={() => openPaymentModal('unlock_paid_features')}
              >
                🔒 Pay ₹200 once · Unlock Full Access
              </button>
            </div>
          )}

          {/* Detailed Question Review */}
          {showReview && (
            <div style={{ marginTop: '2rem', textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1f2937', marginBottom: '1rem' }}>
                Detailed Question Review:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeQuestions.map((q, idx) => {
                  const userAns = userAnswers[q.id];
                  const isCorrect = userAns === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '10px',
                        border: `1.5px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                        background: isCorrect ? '#f0fdf4' : '#fef2f2',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', color: isCorrect ? '#166534' : '#991b1b' }}>
                          Q{idx + 1}. {q.categoryLabel}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '0.8rem', color: isCorrect ? '#166534' : '#991b1b' }}>
                          {isCorrect ? '✓ Correct (+10)' : '✗ Incorrect (0)'}
                        </span>
                      </div>
                      <p style={{ fontWeight: 700, color: '#1f2937', margin: '0 0 0.5rem', fontSize: '0.95rem' }}>
                        {q.question}
                      </p>
                      {q.questionSanskrit && (
                        <p style={{ color: '#7f231c', fontWeight: 700, margin: '0 0 0.5rem', fontSize: '0.92rem' }}>
                          {q.questionSanskrit}
                        </p>
                      )}
                      <div style={{ fontSize: '0.88rem', color: '#374151', margin: '0.35rem 0' }}>
                        <strong>Your answer:</strong>{' '}
                        {userAns !== undefined ? q.options[userAns] : 'Skipped'}
                      </div>
                      {!isCorrect && (
                        <div style={{ fontSize: '0.88rem', color: '#15803d', fontWeight: 700, margin: '0.2rem 0' }}>
                          <strong>Correct answer:</strong> {q.options[q.correctIndex]}
                        </div>
                      )}
                      <div style={{ marginTop: '0.45rem', fontSize: '0.82rem', color: '#6b7280', fontStyle: 'italic' }}>
                        💡 {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* View 2: Active Question Flow */
        currentQ && (
          <div className="quiz-active-box">
            {/* Progress Row */}
            <div className="quiz-progress-row">
              <span>
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              <span>Score: {score} Points</span>
            </div>

            <div className="quiz-progress-bar-bg">
              <div
                className="quiz-progress-bar-fill"
                style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Meta */}
            <div className="quiz-question-meta">
              <span className="quiz-question-badge">
                {currentQ.chapterRef || currentQ.categoryLabel}
              </span>
              <span className="quiz-question-points">+{currentQ.points} Pts</span>
            </div>

            {/* Questions Text */}
            <h3 className="quiz-question-text">{currentQ.question}</h3>
            {currentQ.questionSanskrit && (
              <p className="quiz-question-sanskrit">
                <span>{currentQ.questionSanskrit}</span>
                <button
                  type="button"
                  className="quiz-audio-btn"
                  onClick={() => playPronunciation(currentQ.questionSanskrit || '')}
                  title="Hear pronunciation"
                >
                  🔊
                </button>
              </p>
            )}

            {/* Options List */}
            <div className="quiz-options-list">
              {currentQ.options.map((opt, idx) => {
                const letters = ['A', 'B', 'C', 'D'];
                const isSelected = selectedOption === idx;
                let btnClass = 'quiz-option-btn';
                if (isAnswerChecked) {
                  if (idx === currentQ.correctIndex) {
                    btnClass += ' correct';
                  } else if (isSelected) {
                    btnClass += ' incorrect';
                  }
                } else if (isSelected) {
                  btnClass += ' selected';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={btnClass}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerChecked}
                  >
                    <span className="quiz-option-letter">{letters[idx]}</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation Box on Answer */}
            {isAnswerChecked && (
              <div
                className={`quiz-explanation-card${
                  selectedOption !== currentQ.correctIndex ? ' incorrect-box' : ''
                }`}
              >
                <div className="quiz-explanation-title">
                  {selectedOption === currentQ.correctIndex ? '✓ Correct! व्याख्या (Explanation):' : '✗ Incorrect. सही उत्तर व्याख्या:'}
                </div>
                <p className="quiz-explanation-text">{currentQ.explanation}</p>
              </div>
            )}

            {/* Controls */}
            <div className="quiz-controls-row">
              <button
                type="button"
                className="quiz-skip-btn"
                onClick={() => setActiveQuestions(null)}
              >
                Quit Quiz
              </button>

              {isAnswerChecked && (
                <button
                  type="button"
                  className="quiz-next-btn"
                  onClick={handleNext}
                >
                  {currentIndex < activeQuestions.length - 1
                    ? 'Next Question ➔'
                    : canDownload
                    ? 'Submit & View Evaluation Report ➔'
                    : '🔒 Submit Quiz & Unlock Evaluation Report (Paid)'}
                </button>
              )}
            </div>
          </div>
        )
      )}

      {/* Submissions History Modal (Paid Feature) */}
      {showHistoryModal && (
        <div className="quiz-history-modal-overlay" onClick={() => setShowHistoryModal(false)}>
          <div className="quiz-history-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="quiz-history-modal-header">
              <h3 className="quiz-history-modal-title">📋 My Quiz Submissions</h3>
              <button
                type="button"
                className="quiz-history-modal-close"
                onClick={() => setShowHistoryModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="quiz-history-modal-body">
              {quizAttempts.length === 0 ? (
                <div className="quiz-history-empty">
                  <div className="quiz-history-empty-icon">📝</div>
                  <h4>No submissions recorded yet</h4>
                  <p>Complete any quiz drill and submit to record your graded score and evaluation history.</p>
                </div>
              ) : (
                <div className="quiz-history-list">
                  {quizAttempts.slice().reverse().map((att, idx) => {
                    const dateStr = new Date(att.timestamp).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                    const catObj = QUIZ_CATEGORIES.find((c) => c.id === att.quizId);
                    const catLabel = catObj?.label || (att.quizId === 'all' ? 'All Topics Drill' : att.quizId);
                    const percent = att.totalPoints > 0 ? Math.round((att.score / att.totalPoints) * 100) : 0;
                    return (
                      <div key={att.id || idx} className="quiz-history-item">
                        <div className="quiz-history-details">
                          <h4>{catLabel}</h4>
                          <span className="quiz-history-meta">
                            📅 {dateStr} · {att.answers?.length || 0} Questions
                          </span>
                        </div>
                        <div className="quiz-history-score-badge">
                          {att.score} / {att.totalPoints} ({percent}%)
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuizSection;
