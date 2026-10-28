import React, { useState, useEffect, useMemo, useRef } from 'react';
import BodhiAvatar, { type BodhiMood } from './BodhiAvatar';
import {
  BODHI_PROFILE,
  BODHI_SUBHASHITAS,
  BODHI_SPOKEN_PHRASES,
  BODHI_CONTEXT_TIPS,
  BODHI_QA_LIBRARY,
  BODHI_WORD_SUGGESTIONS,
  BODHI_ANECDOTES,
  type BodhiQAItem,
} from '../data/bodhiData';
import { SEARCH_INDEX, type SearchItem } from '../data/searchIndex';
import { matchesSearchQuery, normalizeSearchText } from '../utils/searchNormalizer';
import {
  speakAsBodhi,
  splitBodhiSegments,
  getBodhiVoiceSpeed,
  setBodhiVoiceSpeed,
  type BodhiSpeechLang,
  type BodhiVoiceSpeed,
} from '../utils/pronunciation';
import BodhiMentorPositioning from './BodhiMentorPositioning';
import '../styles/bodhi.css';

interface BodhiGuideWidgetProps {
  activeView: string;
  onNavigateView?: (view: any) => void;
  onOpenVarnamala?: () => void;
  forceOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialTab?: GuideTab;
  onSearchResultNavigate?: (item: SearchItem) => void;
  /** Bodhi Q&A id from site search; a Micro-Anecdote id opens that story. */
  initialQuestionId?: string | null;
}

/** Ask Bodhi library plus the ✨ Did you know? Micro-Anecdotes. */
const BODHI_QA_WITH_ANECDOTES: BodhiQAItem[] = [...BODHI_QA_LIBRARY, ...BODHI_ANECDOTES];

type GuideTab = 'context' | 'qa' | 'safeguards' | 'subhashita' | 'phrases';

/**
 * Renders text split into the same chunks speakAsBodhi() speaks, so the chunk
 * currently being spoken can be highlighted (follow-along).
 */
const FollowAlongText: React.FC<{ text: string; lang?: BodhiSpeechLang; activeChunk: number | null }> = ({
  text,
  lang = 'sa',
  activeChunk,
}) => {
  const segments = useMemo(() => splitBodhiSegments(text, lang), [text, lang]);
  return (
    <>
      {segments.map((seg, i) =>
        seg.chunkIndex === null ? (
          <React.Fragment key={i}>{seg.text}</React.Fragment>
        ) : (
          <span
            key={i}
            className={`bodhi-chunk ${activeChunk === seg.chunkIndex ? 'bodhi-chunk-active' : ''}`}
            aria-current={activeChunk === seg.chunkIndex ? 'true' : undefined}
          >
            {seg.text}
          </span>
        ),
      )}
    </>
  );
};

export const BodhiGuideWidget: React.FC<BodhiGuideWidgetProps> = ({
  activeView,
  onNavigateView,
  onOpenVarnamala,
  forceOpen,
  onOpenChange,
  initialTab,
  onSearchResultNavigate,
  initialQuestionId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // ✨ Did you know? — the Micro-Anecdote currently popped up in Ask Bodhi.
  const [storyId, setStoryId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<GuideTab>(initialTab || 'context');
  const [mood, setMood] = useState<BodhiMood>('namaste');
  const [subhashitaIdx, setSubhashitaIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showMiniBubble, setShowMiniBubble] = useState(true);
  const [bubbleText, setBubbleText] = useState('नमस्ते। I am Bodhi. Need a tip?');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTriggerCollapsed, setIsTriggerCollapsed] = useState(() => {
    try {
      return localStorage.getItem('bodhi_floating_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  // Sync external open request
  useEffect(() => {
    if (forceOpen !== undefined && forceOpen !== isOpen) {
      setIsOpen(forceOpen);
      if (forceOpen) setShowMiniBubble(false);
    }
  }, [forceOpen]);

  // Sync initialTab when provided from external navigation (e.g. Search modal)
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Site search → a Micro-Anecdote: open Ask Bodhi with that story popped up.
  useEffect(() => {
    if (forceOpen && initialQuestionId && BODHI_ANECDOTES.some((a) => a.id === initialQuestionId)) {
      setActiveTab('qa');
      setSearchQuery('');
      setStoryId(initialQuestionId);
    }
  }, [forceOpen, initialQuestionId]);

  const updateIsOpen = (nextOpen: boolean) => {
    setIsOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };


  // Audio helper — Bodhi's calm teacher voice (slow, chunked recitation).
  const stopSpeechRef = useRef<(() => void) | null>(null);
  const speakingTextRef = useRef<string | null>(null);
  const activeTabRef = useRef<GuideTab>(activeTab);
  activeTabRef.current = activeTab;

  const tabMood = (tab: GuideTab): BodhiMood =>
    tab === 'subhashita' ? 'meditate' : tab === 'qa' ? 'scholar' : tab === 'phrases' ? 'happy' : 'namaste';

  const [speakingText, setSpeakingText] = useState<string | null>(null);
  // Index of the chunk currently being spoken (follow-along highlight).
  const [activeChunk, setActiveChunk] = useState<number | null>(null);
  // 🐢 Slow (default) / Normal — persisted in localStorage (bodhiVoiceSpeed).
  const [voiceSpeed, setVoiceSpeedState] = useState<BodhiVoiceSpeed>(() => getBodhiVoiceSpeed());
  const changeVoiceSpeed = (speed: BodhiVoiceSpeed) => {
    setVoiceSpeedState(speed);
    setBodhiVoiceSpeed(speed);
  };

  const resetSpeakingUi = () => {
    setIsSpeaking(false);
    setSpeakingText(null);
    setActiveChunk(null);
    setMood(tabMood(activeTabRef.current));
  };

  const stopSpeaking = (resetUi = true) => {
    const stop = stopSpeechRef.current;
    stopSpeechRef.current = null;
    speakingTextRef.current = null;
    stop?.();
    if (stop && resetUi) resetSpeakingUi();
  };

  const speakSanskrit = (text: string, lang: BodhiSpeechLang = 'sa') => {
    // Clicking the same item again while Bodhi is speaking stops him.
    if (stopSpeechRef.current && speakingTextRef.current === text) {
      stopSpeaking();
      return;
    }
    stopSpeaking(false);
    let finished = false;
    let stopFn: (() => void) | null = null;
    try {
      setIsSpeaking(true);
      setSpeakingText(text);
      setActiveChunk(null);
      setMood('reading');
      stopFn = speakAsBodhi(text, {
        lang,
        onChunk: (index) => {
          if (stopFn !== null && stopSpeechRef.current !== stopFn) return;
          setActiveChunk(index);
        },
        // Driven by the real utterance onend (with per-chunk fallback timers
        // inside speakAsBodhi), not a fixed timeout.
        onEnd: () => {
          finished = true;
          // Ignore end events from a recitation that was superseded/stopped.
          if (stopFn !== null && stopSpeechRef.current !== stopFn) return;
          stopSpeechRef.current = null;
          speakingTextRef.current = null;
          resetSpeakingUi();
        },
      });
      if (!finished) {
        stopSpeechRef.current = stopFn;
        speakingTextRef.current = text;
      }
    } catch {
      stopSpeechRef.current = null;
      speakingTextRef.current = null;
      resetSpeakingUi();
    }
  };

  // Stop Bodhi when the guide closes or the widget unmounts.
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      setStoryId(null);
    }
  }, [isOpen]);
  useEffect(() => () => stopSpeaking(), []);

  // Update Bodhi's mini bubble message when active view changes
  useEffect(() => {
    const tip = BODHI_CONTEXT_TIPS[activeView];
    if (tip) {
      setBubbleText(`Bodhi’s Tip: ${tip.summary.slice(0, 85)}...`);
      setShowMiniBubble(true);
      const timer = setTimeout(() => {
        setShowMiniBubble(false);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [activeView]);

  // Adjust mood depending on tab
  useEffect(() => {
    if (activeTab === 'subhashita') setMood('meditate');
    else if (activeTab === 'qa' || activeTab === 'safeguards') setMood('scholar');
    else if (activeTab === 'phrases') setMood('happy');
    else setMood('namaste');
  }, [activeTab]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        updateIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const chunkFor = (text: string): number | null => (speakingText === text ? activeChunk : null);

  /** Visual soundwave feedback bars while Bodhi is speaking */
  const renderSoundwave = () => (
    <span className="bodhi-soundwave-graphic" aria-label="Audio speaking animation">
      <span className="bodhi-wave-bar bar-1" />
      <span className="bodhi-wave-bar bar-2" />
      <span className="bodhi-wave-bar bar-3" />
      <span className="bodhi-wave-bar bar-4" />
    </span>
  );

  /** Child-friendly visual icons for bullet points to guide early readers */
  const getBulletVisualIcon = (text: string, index: number): string => {
    const lower = text.toLowerCase();
    if (lower.includes('alphabet') || lower.includes('varnamala') || lower.includes('letter') || lower.includes('syllable') || lower.includes('varna') || lower.includes('akshara')) {
      return '🔤';
    }
    if (lower.includes('class 7') || lower.includes('class 8') || lower.includes('class 9') || lower.includes('cbse') || lower.includes('deepakam') || lower.includes('textbook') || lower.includes('ruchira') || lower.includes('shemushi') || lower.includes('chapter')) {
      return '📚';
    }
    if (lower.includes('audio') || lower.includes('listen') || lower.includes('pronounc') || lower.includes('voice') || lower.includes('sound') || lower.includes('hear')) {
      return '🔊';
    }
    if (lower.includes('puzzle') || lower.includes('jodo') || lower.includes('tile') || lower.includes('drag') || lower.includes('build')) {
      return '🧩';
    }
    if (lower.includes('quiz') || lower.includes('test') || lower.includes('score') || lower.includes('mcq') || lower.includes('streak')) {
      return '🎯';
    }
    if (lower.includes('worksheet') || lower.includes('print') || lower.includes('pdf') || lower.includes('exercise')) {
      return '📑';
    }
    if (lower.includes('math') || lower.includes('number') || lower.includes('count') || lower.includes('vedic')) {
      return '🔢';
    }
    if (lower.includes('science') || lower.includes('lab') || lower.includes('experiment') || lower.includes('physics') || lower.includes('biology')) {
      return '🔬';
    }
    if (lower.includes('story') || lower.includes('katha') || lower.includes('friends') || lower.includes('read')) {
      return '📖';
    }
    if (lower.includes('speed') || lower.includes('slow') || lower.includes('fast') || lower.includes('pace')) {
      return '🐢';
    }
    if (lower.includes('star') || lower.includes('planet') || lower.includes('space') || lower.includes('moon')) {
      return '🪐';
    }
    if (lower.includes('grammar') || lower.includes('verb') || lower.includes('noun') || lower.includes('dhatu') || lower.includes('sandhi')) {
      return '🏛️';
    }
    const fallbacks = ['🌟', '✨', '💡', '🌱', '🎯'];
    return fallbacks[index % fallbacks.length];
  };

  /** Small 🔊 for Bodhi's English tips (en-IN voice, sentence chunks). */
  const renderEnglishSpeakBtn = (text: string, label: string) => {
    const active = speakingText === text;
    return (
      <button
        type="button"
        className={`bodhi-tip-speak-btn ${active ? 'is-speaking' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          speakSanskrit(text, 'en');
        }}
        title={active ? 'Stop Bodhi' : `Hear Bodhi read ${label}`}
        aria-label={active ? 'Stop Bodhi' : `Hear Bodhi read ${label}`}
        aria-pressed={active}
      >
        <span>{active ? '⏹' : '🔊'}</span>
        {active && renderSoundwave()}
      </button>
    );
  };

  const currentContextTip = useMemo(() => {
    return BODHI_CONTEXT_TIPS[activeView] || BODHI_CONTEXT_TIPS.home;
  }, [activeView]);

  const isGreetingSpeaking = isSpeaking && speakingText === BODHI_PROFILE.audioGreeting;

  const fullPageReadingText = useMemo(() => {
    return `${currentContextTip.title}. ${currentContextTip.summary}. What you can explore: ${currentContextTip.bulletPoints.join('. ')}. Bodhi's advice: ${currentContextTip.bodhiAdvice}`;
  }, [currentContextTip]);

  const isReadingFullPage = isSpeaking && speakingText === fullPageReadingText;

  const handleToggleReadPage = () => {
    if (isReadingFullPage) {
      stopSpeaking();
    } else {
      speakSanskrit(fullPageReadingText, 'en');
    }
  };

  const currentSubhashita = BODHI_SUBHASHITAS[subhashitaIdx % BODHI_SUBHASHITAS.length];

  // Navigate to any Gurukul learning room clicked inside Bodhi
  const handleNavigateToGurukulItem = (item: SearchItem) => {
    updateIsOpen(false);
    if (onSearchResultNavigate) {
      onSearchResultNavigate(item);
    } else if (item.target.view && onNavigateView) {
      onNavigateView(item.target.view);
    }
  };

  // Gurukul site-wide content matches (Chapters, Dhātupāṭha, Grammar, Vedic Math, Quizzes, Worksheets)
  const gurukulMatches = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return [];
    return SEARCH_INDEX.filter((item) => {
      // Avoid duplicate Bodhi guide items in this section
      if (item.target.openBodhi) return false;

      if (selectedCategory === 'grammar' && item.category !== 'grammar') return false;
      if (selectedCategory === 'vedic_math' && item.category !== 'maths') return false;
      if (selectedCategory === 'cbse' && item.category !== 'lessons' && item.category !== 'grammar') return false;
      if (selectedCategory === 'lessons' && item.category !== 'lessons') return false;
      if (selectedCategory === 'philosophy' && item.target.view !== 'philosophy' && item.category !== 'guides') return false;

      const targetString = [
        item.title,
        item.subtitle || '',
        item.description,
        item.categoryLabel,
        ...item.keywords,
      ].join(' ');

      return matchesSearchQuery(targetString, q);
    }).sort((a, b) => {
      const qNorm = normalizeSearchText(q);
      const aTitle = normalizeSearchText(a.title).includes(qNorm) ? 2 : 0;
      const bTitle = normalizeSearchText(b.title).includes(qNorm) ? 2 : 0;
      return bTitle - aTitle;
    }).slice(0, 6);
  }, [searchQuery, selectedCategory]);

  // Live word auto-suggestions when typing
  const matchingWords = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return [];
    return BODHI_WORD_SUGGESTIONS.filter(
      (w) =>
        matchesSearchQuery(w.devanagari, q) ||
        matchesSearchQuery(w.iast, q) ||
        matchesSearchQuery(w.english, q) ||
        (w.modernConcept && matchesSearchQuery(w.modernConcept, q))
    ).slice(0, 6);
  }, [searchQuery]);

  // Filter Q&A with diacritic & phonetic awareness
  const filteredQA = useMemo(() => {
    let list = BODHI_QA_WITH_ANECDOTES;
    if (selectedCategory !== 'all') {
      list = list.filter((item) => item.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      list = list.filter(
        (item) =>
          matchesSearchQuery(item.question, q) ||
          matchesSearchQuery(item.shortAnswer, q) ||
          matchesSearchQuery(item.detailedAnswer, q) ||
          (item.sanskritQuestion && matchesSearchQuery(item.sanskritQuestion, q)) ||
          (item.audioDevanagari && matchesSearchQuery(item.audioDevanagari, q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  // "Open this lab / article / quiz" from a Bodhi answer (same landing as site search).
  const openRelated = (item: BodhiQAItem) => {
    if (!item.relatedView) return;
    updateIsOpen(false);
    if (item.relatedQuizAnchor && onSearchResultNavigate) {
      onSearchResultNavigate({
        id: item.id,
        title: item.shortAnswer,
        category: 'tools',
        categoryLabel: 'Assessment · Quiz',
        badgeEmoji: '🎯',
        badgeColor: '#b45309',
        description: item.shortAnswer,
        keywords: [],
        target: { view: 'quiz', quizAnchor: item.relatedQuizAnchor },
      });
    } else if (item.relatedView === 'science-lab' && onSearchResultNavigate) {
      onSearchResultNavigate({
        id: item.id,
        title: item.question,
        category: 'tools',
        categoryLabel: 'Interactive Lab',
        badgeEmoji: '🔬',
        badgeColor: '#0f766e',
        description: item.shortAnswer,
        keywords: [],
        target: { view: 'science-lab', labAnchor: item.relatedLabAnchor },
      });
    } else if (item.relatedVedicAnchor && onSearchResultNavigate) {
      onSearchResultNavigate({
        id: item.id,
        title: item.question,
        category: 'maths',
        categoryLabel: 'Vedic Maths · Article',
        badgeEmoji: '📖',
        badgeColor: '#b45309',
        description: item.shortAnswer,
        keywords: [],
        target: { view: 'vedic-maths', vedicAnchor: item.relatedVedicAnchor },
      });
    } else if (item.relatedGrammarTopic && onSearchResultNavigate) {
      onSearchResultNavigate({
        id: item.id,
        title: item.question,
        category: 'grammar',
        categoryLabel: 'Guide · Grammar',
        badgeEmoji: '📖',
        badgeColor: '#b45309',
        description: item.shortAnswer,
        keywords: [],
        target: {
          view: 'grammar',
          grammarTopic: item.relatedGrammarTopic,
        },
      });
    } else if (item.relatedGrammarArticleId && onSearchResultNavigate) {
      onSearchResultNavigate({
        id: item.id,
        title: item.question,
        category: 'grammar',
        categoryLabel: 'Article · Grammar',
        badgeEmoji: '📖',
        badgeColor: '#b45309',
        description: item.shortAnswer,
        keywords: [],
        target: {
          view: 'grammar',
          grammarTopic: 'article',
          grammarArticleId: item.relatedGrammarArticleId,
        },
      });
    } else if (item.relatedView === 'reader' && onSearchResultNavigate) {
      onSearchResultNavigate({
        id: item.id,
        title: item.question,
        category: 'lessons',
        categoryLabel: 'Reader · Deepakam',
        badgeEmoji: '📚',
        badgeColor: '#b45309',
        description: item.shortAnswer,
        keywords: [],
        target: { view: 'reader' },
      });
    } else if (item.relatedView === 'dhatupatha' && onSearchResultNavigate) {
      onSearchResultNavigate({
        id: item.id,
        title: item.question,
        category: 'tools',
        categoryLabel: 'Dhātupāṭha Browser',
        badgeEmoji: '📖',
        badgeColor: '#0284c7',
        description: item.shortAnswer,
        keywords: [],
        target: { view: 'dhatupatha' },
      });
    } else if (item.relatedView === 'philosophy' && item.id.includes('ujjain')) {
      if (onSearchResultNavigate) {
        onSearchResultNavigate({
          id: 'darshana-essay-ujjain-geodesy',
          title: 'Madhya-Rekhā: Ujjain, the Sacred Meridian',
          category: 'maths',
          categoryLabel: 'Darśana Essay',
          badgeEmoji: '🧭',
          badgeColor: '#0284c7',
          description: 'Ujjain Prime Meridian & Geodesy',
          keywords: [],
          target: { view: 'philosophy', philosophyEssay: 'ujjain_geodesy' },
        });
      } else if (onNavigateView) {
        onNavigateView('philosophy');
      }
    } else if (onNavigateView) {
      onNavigateView(item.relatedView);
    }
  };

  const relatedLabelFor = (item: BodhiQAItem) =>
    item.relatedLabel ?? (item.relatedView === 'science-lab' ? '🔬 Open this lab ➔' : item.relatedQuizAnchor ? 'Open this quiz ➔' : item.relatedGrammarTopic ? 'Open this guide ➔' : item.relatedVedicAnchor || item.relatedGrammarArticleId ? 'Open this article ➔' : item.id.includes('ujjain') ? '🧭 Open Ujjain Studio & Article ➔' : `Explore in ${item.relatedView} ➔`);

  const currentStory = BODHI_ANECDOTES.find((a) => a.id === storyId) || null;

  const openStory = (id: string) => {
    stopSpeaking();
    setStoryId(id);
    setMood('celebrate');
    setTimeout(() => setMood('scholar'), 1200);
  };

  // 🎲 Tell me a story — a random anecdote, never the same one twice in a row.
  const tellRandomStory = () => {
    const pool = BODHI_ANECDOTES.filter((a) => a.id !== storyId);
    openStory(pool[Math.floor(Math.random() * pool.length)].id);
  };

  const handleNextSubhashita = () => {
    stopSpeaking();
    setSubhashitaIdx((prev) => (prev + 1) % BODHI_SUBHASHITAS.length);
    setMood('celebrate');
    setTimeout(() => setMood('meditate'), 1200);
  };

  const handlePrevSubhashita = () => {
    stopSpeaking();
    setSubhashitaIdx((prev) => (prev - 1 + BODHI_SUBHASHITAS.length) % BODHI_SUBHASHITAS.length);
    setMood('reading');
  };

  return (
    <>
      {/* ------------------------------------------------------------------
          Floating Trigger & Mini Bubble (Bottom-Left)
          ------------------------------------------------------------------ */}
      <aside className="bodhi-widget-container" aria-label="Bodhi Gurukul Guide Companion">
        {!isOpen && (
          <div style={{ position: 'relative' }}>
            {/* Optional Speech Bubble */}
            {showMiniBubble && (
              <div className="bodhi-mini-bubble" role="status">
                <div className="bodhi-mini-bubble-header">
                  <span>✨ बोधि-सन्देशः</span>
                  <button
                    type="button"
                    className="bodhi-mini-bubble-close"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMiniBubble(false);
                    }}
                    title="Dismiss bubble"
                    aria-label="Dismiss bubble"
                  >
                    ×
                  </button>
                </div>
                <p className="bodhi-mini-bubble-text">{bubbleText}</p>
                <button
                  type="button"
                  className="bodhi-mini-bubble-action"
                  onClick={() => {
                    setShowMiniBubble(false);
                    updateIsOpen(true);
                  }}
                >
                  Ask Bodhi &amp; Explore Guide →
                </button>
              </div>
            )}

            {/* Clickable Floating Mascot Button */}
            {isTriggerCollapsed ? (
              <button
                type="button"
                className="bodhi-collapsed-trigger"
                onClick={() => {
                  setIsTriggerCollapsed(false);
                  try {
                    localStorage.setItem('bodhi_floating_collapsed', 'false');
                  } catch {
                    /* ignore storage quota */
                  }
                }}
                title="Expand Bodhi Gurukul Guide (बोधिः)"
                aria-label="Expand Bodhi Guide"
              >
                <BodhiAvatar mood={mood} size="sm" showHalo={false} />
                <span className="bodhi-collapsed-badge">बोधिः</span>
              </button>
            ) : (
              <div className="bodhi-trigger-group">
                <button
                  type="button"
                  className="bodhi-floating-trigger"
                  onClick={() => {
                    setShowMiniBubble(false);
                    updateIsOpen(true);
                    setMood('happy');
                  }}
                  title="Open Bodhi Gurukul Guide (बोधिः)"
                  aria-label="Open Bodhi Gurukul Guide (बोधिः)"
                  aria-expanded={isOpen}
                >
                  <div className="bodhi-trigger-avatar-wrap">
                    <BodhiAvatar mood={mood} size="sm" showHalo={false} />
                    <span className="bodhi-trigger-badge">मार्गदर्शकः</span>
                  </div>
                  <div className="bodhi-trigger-text-wrap">
                    <span className="bodhi-trigger-name">
                      Bodhi <span className="bodhi-trigger-name-dev">बोधिः</span>
                    </span>
                    <span className="bodhi-trigger-sub">Gurukul Guide</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="bodhi-trigger-minimize"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTriggerCollapsed(true);
                    setShowMiniBubble(false);
                    try {
                      localStorage.setItem('bodhi_floating_collapsed', 'true');
                    } catch {
                      /* ignore storage quota */
                    }
                  }}
                  title="Minimize Bodhi to small icon"
                  aria-label="Minimize Bodhi guide"
                >
                  ─
                </button>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* ------------------------------------------------------------------
          Interactive Full Guide Drawer / Modal
          ------------------------------------------------------------------ */}
      {isOpen && (
        <div
          className="bodhi-modal-overlay"
          onClick={() => updateIsOpen(false)}
          role="presentation"
        >
          <div
            className="bodhi-guide-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bodhi-card-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Header with Avatar & Voice Button */}
            <header className="bodhi-card-header">
              <div className="bodhi-card-header-left">
                <BodhiAvatar mood={mood} size="md" showHalo={true} isSpeaking={isSpeaking} />
                <div className="bodhi-card-title-group">
                  <h3 id="bodhi-card-title" className="bodhi-card-title">
                    Bodhi <span className="bodhi-card-title-dev">बोधिः</span>
                  </h3>
                  <span className="bodhi-card-subtitle">{BODHI_PROFILE.sanskritTitle}</span>
                </div>
              </div>

              <div className="bodhi-card-controls">
                <button
                  type="button"
                  className={`bodhi-header-listen-btn ${isGreetingSpeaking ? 'is-speaking' : ''}`}
                  onClick={() => speakSanskrit(BODHI_PROFILE.audioGreeting)}
                  title={isGreetingSpeaking ? 'Stop Bodhi speaking' : 'Hear Bodhi say Namaste'}
                  aria-pressed={isGreetingSpeaking}
                >
                  <span className="bodhi-header-listen-icon">{isGreetingSpeaking ? '⏹' : '🔊'}</span>
                  <span>{isGreetingSpeaking ? 'Speaking…' : 'नमस्ते'}</span>
                  {isGreetingSpeaking && renderSoundwave()}
                </button>
                <div className="bodhi-speed-toggle" role="group" aria-label="Bodhi voice speed">
                  <button
                    type="button"
                    className={`bodhi-speed-btn ${voiceSpeed === 'slow' ? 'active' : ''}`}
                    aria-pressed={voiceSpeed === 'slow'}
                    onClick={() => changeVoiceSpeed('slow')}
                    title="Slow, calm voice (best for young learners)"
                  >
                    <span>🐢</span>
                    <span>Slow</span>
                  </button>
                  <button
                    type="button"
                    className={`bodhi-speed-btn ${voiceSpeed === 'normal' ? 'active' : ''}`}
                    aria-pressed={voiceSpeed === 'normal'}
                    onClick={() => changeVoiceSpeed('normal')}
                    title="Normal speaking pace"
                  >
                    <span>⚡</span>
                    <span>Normal</span>
                  </button>
                </div>
                <button
                  type="button"
                  className="bodhi-control-btn"
                  onClick={() => updateIsOpen(false)}
                  title="Close Guide (✕)"
                  aria-label="Close Guide"
                >
                  ✕
                </button>
              </div>
            </header>

            {/* 2. Navigation Tabs */}
            <nav className="bodhi-tabs" aria-label="Bodhi Guide Tabs">
              <button
                type="button"
                className={`bodhi-tab-btn ${activeTab === 'context' ? 'active' : ''}`}
                onClick={() => setActiveTab('context')}
              >
                🧭 Page Guide
              </button>
              <button
                type="button"
                className={`bodhi-tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
                onClick={() => setActiveTab('qa')}
              >
                ❓ Ask Bodhi
              </button>
              <button
                type="button"
                className={`bodhi-tab-btn ${activeTab === 'safeguards' ? 'active' : ''}`}
                onClick={() => setActiveTab('safeguards')}
              >
                🛡️ Scope &amp; AI Safeguards
              </button>
              <button
                type="button"
                className={`bodhi-tab-btn ${activeTab === 'subhashita' ? 'active' : ''}`}
                onClick={() => setActiveTab('subhashita')}
              >
                🪔 Daily Subhāṣita
              </button>
              <button
                type="button"
                className={`bodhi-tab-btn ${activeTab === 'phrases' ? 'active' : ''}`}
                onClick={() => setActiveTab('phrases')}
              >
                🗣️ Spoken Sanskrit
              </button>
            </nav>

            {/* 3. Tab Contents */}
            <div className="bodhi-card-body">
              {/* TAB 1: Contextual Page Guide with Enhanced Contrast & Child-Centric Visual Icons */}
              {activeTab === 'context' && (
                <div className="bodhi-context-view-wrapper">
                  {/* Spoken Greeting Hero Card (scrolls with Page Guide, never traps modal height) */}
                  <div className="bodhi-greeting-hero-card">
                    <div className="bodhi-greeting-content">
                      <div className="bodhi-greeting-headline">
                        <span className="bodhi-greeting-namaste" lang="sa">नमस्ते !</span>
                        <span className="bodhi-greeting-identity" lang="sa">अहं बोधिः — भवतः संस्कृत-सखा।</span>
                      </div>
                      <p className="bodhi-greeting-bio">
                        <span className="bodhi-bio-icon" aria-hidden="true">🌿</span>
                        <span>{BODHI_PROFILE.persona} · Your friendly Gurukul companion!</span>
                      </p>
                      <div className="bodhi-greeting-action-row">
                        <button
                          type="button"
                          className={`bodhi-speak-hero-btn ${isGreetingSpeaking ? 'is-speaking' : ''}`}
                          onClick={() => speakSanskrit(BODHI_PROFILE.audioGreeting)}
                          title={isGreetingSpeaking ? 'Stop Bodhi speaking' : 'Hear Bodhi say Namaste'}
                          aria-pressed={isGreetingSpeaking}
                        >
                          <span className="bodhi-speak-icon">{isGreetingSpeaking ? '⏹' : '🔊'}</span>
                          <span className="bodhi-speak-label">
                            {isGreetingSpeaking ? 'Speaking Namaste… (Tap to Stop)' : 'Listen to Bodhi (नमस्ते)'}
                          </span>
                          {isGreetingSpeaking && renderSoundwave()}
                        </button>
                        <span className="bodhi-greeting-subhint">
                          Tap to hear Bodhi greet you in native Sanskrit!
                        </span>
                      </div>
                    </div>
                  </div>
                <div className="bodhi-context-banner">
                  <div className="bodhi-context-header">
                    <div className="bodhi-context-tag-wrap">
                      <span className="bodhi-context-tag">
                        <span aria-hidden="true">📍</span> Active Section
                      </span>
                      <span className="bodhi-context-sanskrit">{currentContextTip.sanskritTitle}</span>
                    </div>
                    {renderEnglishSpeakBtn(
                      `${currentContextTip.title}. ${currentContextTip.summary}`,
                      'this section'
                    )}
                  </div>

                  <h4 className="bodhi-context-title">{currentContextTip.title}</h4>
                  <p className="bodhi-context-summary">{currentContextTip.summary}</p>

                  {/* Bullet points with child-friendly visual icons */}
                  <ul className="bodhi-context-bullets">
                    {currentContextTip.bulletPoints.map((pt, i) => (
                      <li key={i} className="bodhi-context-bullet-item">
                        <span className="bodhi-bullet-badge" aria-hidden="true">
                          {getBulletVisualIcon(pt, i)}
                        </span>
                        <span className="bodhi-bullet-text">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bodhi-advice-box">
                    <div className="bodhi-advice-label">
                      <span>💡</span> Bodhi’s Insight
                      {renderEnglishSpeakBtn(currentContextTip.bodhiAdvice, 'this insight')}
                    </div>
                    <p className="bodhi-advice-text">
                      "<FollowAlongText
                        text={currentContextTip.bodhiAdvice}
                        lang="en"
                        activeChunk={chunkFor(currentContextTip.bodhiAdvice)}
                      />"
                    </p>
                  </div>

                  {currentContextTip.suggestedAction && (
                    <button
                      type="button"
                      className="bodhi-action-suggest-btn"
                      onClick={() => {
                        const target = currentContextTip.suggestedAction?.targetView;
                        if ((target === 'reader' || target === 'varnamala') && onOpenVarnamala && activeView !== 'reader') {
                          onOpenVarnamala();
                        } else if (target && onNavigateView) {
                          onNavigateView(target);
                        }
                        updateIsOpen(false);
                      }}
                    >
                      🚀 {currentContextTip.suggestedAction.label} →
                    </button>
                  )}
                </div>
                </div>
              )}

              {/* TAB 2: Ask Bodhi (Q&A Library & Gurukul Direct Search) */}
              {activeTab === 'qa' && (
                <div className="bodhi-qa-wrapper">
                  <div className="bodhi-search-row">
                    <span className="bodhi-search-icon">🔍</span>
                    <input
                      type="text"
                      className="bodhi-search-input"
                      placeholder="Ask Bodhi: assignment, grammar, dictionary, sandhi, vedic math, zero..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery.trim().length > 0 && (
                      <button
                        type="button"
                        className="bodhi-search-clear-btn"
                        onClick={() => setSearchQuery('')}
                        title="Clear search"
                        aria-label="Clear search"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {searchQuery.trim().length > 0 ? (
                    /* Active Search View: Results are immediately placed right under the search bar */
                    <div className="bodhi-search-results-section">
                      {/* Compact Result Header */}
                      <div className="bodhi-search-active-header">
                        <span className="bodhi-search-count-badge">
                          🔍 Found <strong>{gurukulMatches.length + filteredQA.length}</strong> result{gurukulMatches.length + filteredQA.length === 1 ? '' : 's'} for <em>"{searchQuery.trim()}"</em>
                        </span>
                        <button
                          type="button"
                          className="bodhi-search-clear-pill"
                          onClick={() => setSearchQuery('')}
                          title="Clear search query"
                        >
                          ✕ Clear
                        </button>
                      </div>

                      {/* Live Word Autocomplete Radar if any */}
                      {matchingWords.length > 0 && (
                        <div className="bodhi-word-suggestions-tray" style={{ marginBottom: '0.85rem' }}>
                          <div className="bodhi-word-suggestions-header">
                            <span>💡 Word Radar:</span>
                          </div>
                          <div className="bodhi-word-chips-flow">
                            {matchingWords.map((w) => (
                              <button
                                key={w.id}
                                type="button"
                                className={`bodhi-word-chip bodhi-word-chip--${w.category}`}
                                onClick={() => {
                                  setSearchQuery(w.devanagari);
                                  speakSanskrit(w.devanagari);
                                }}
                                title={w.breakdown || w.english}
                              >
                                <span className="bodhi-word-chip-dev">{w.devanagari}</span>
                                <span className="bodhi-word-chip-iast">({w.iast})</span>
                                <span className="bodhi-word-chip-meaning">— {w.english}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 1. Gurukul Lessons, Studios, Articles & Tools */}
                      {gurukulMatches.length > 0 && (
                        <div className="bodhi-search-group">
                          <div className="bodhi-search-group-title">
                            <span>🧭 Gurukul Lessons, Studios & Tools ({gurukulMatches.length})</span>
                          </div>
                          <div className="bodhi-gurukul-results-list">
                            {gurukulMatches.map((item) => (
                              <div
                                key={item.id}
                                className="bodhi-gurukul-card"
                                onClick={() => handleNavigateToGurukulItem(item)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    handleNavigateToGurukulItem(item);
                                  }
                                }}
                              >
                                <div className="bodhi-gurukul-card-header">
                                  <span
                                    className="bodhi-gurukul-badge"
                                    style={{
                                      backgroundColor: `${item.badgeColor}18`,
                                      color: item.badgeColor,
                                      borderColor: `${item.badgeColor}50`,
                                    }}
                                  >
                                    {item.badgeEmoji} {item.categoryLabel}
                                  </span>
                                  <button
                                    type="button"
                                    className="bodhi-guide-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleNavigateToGurukulItem(item);
                                    }}
                                    title={`Open ${item.title}`}
                                  >
                                    Guide Me There 🚀
                                  </button>
                                </div>
                                <h5 className="bodhi-gurukul-title">{item.title}</h5>
                                {item.subtitle && <div className="bodhi-gurukul-subtitle">{item.subtitle}</div>}
                                <p className="bodhi-gurukul-desc">
                                  <span className="bodhi-persona-prefix">🌿 Bodhi’s note:</span> {item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 2. Bodhi’s Direct Explanations & Answers */}
                      {filteredQA.length > 0 && (
                        <div className="bodhi-search-group" style={{ marginTop: gurukulMatches.length > 0 ? '1rem' : '0' }}>
                          <div className="bodhi-search-group-title">
                            <span>❓ Bodhi’s Direct Explanations ({filteredQA.length})</span>
                          </div>
                          <div className="bodhi-qa-list">
                            {filteredQA.map((item) => (
                              <article key={item.id} className="bodhi-qa-card">
                                <h5 className="bodhi-qa-question">{item.emoji && <span aria-hidden="true">{item.emoji} </span>}{item.question}</h5>
                                {item.sanskritQuestion && (
                                  <div className="bodhi-qa-sanskrit-q">{item.sanskritQuestion}</div>
                                )}
                                <div className="bodhi-qa-short">{item.shortAnswer}</div>
                                <div className="bodhi-qa-details">{item.detailedAnswer}</div>
                                {item.science && <div className="bodhi-qa-details"><strong>🔬 The science bit:</strong> {item.science}</div>}
                                {item.source && <div className="bodhi-anecdote-source">📜 {item.source}</div>}

                                <div className="bodhi-qa-bottom-bar">
                                  {item.audioDevanagari ? (
                                    <button
                                      type="button"
                                      className="bodhi-audio-pill"
                                      onClick={() => speakSanskrit(item.audioDevanagari!)}
                                      title="Hear pronunciation"
                                    >
                                      🔊 {item.audioDevanagari}
                                    </button>
                                  ) : <span />}

                                  {item.tip && (
                                    <span className="bodhi-tip-tag">
                                      💡 <FollowAlongText text={item.tip} lang="en" activeChunk={chunkFor(item.tip)} />
                                      {renderEnglishSpeakBtn(item.tip, 'this tip')}
                                    </span>
                                  )}
                                </div>

                                {item.relatedView && (
                                  <div style={{ marginTop: '0.65rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                    {item.id === 'qa-sanskrit-dictionary-koshashri' && (
                                      <a
                                        href="https://koshashri-dc.ac.in/search/catalog/1/10?searchTerm=%E0%A4%85"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bodhi-guide-btn"
                                        style={{ background: '#0284c7', borderColor: '#0369a1', color: '#ffffff', textDecoration: 'none' }}
                                      >
                                        🌐 Search Kōshaśrī Catalog ↗
                                      </a>
                                    )}
                                    <button
                                      type="button"
                                      className="bodhi-guide-btn"
                                      onClick={() => openRelated(item)}
                                    >
                                      {relatedLabelFor(item)}
                                    </button>
                                  </div>
                                )}
                              </article>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Empty State with Warm Recommendations */}
                      {gurukulMatches.length === 0 && filteredQA.length === 0 && (
                        <div className="bodhi-search-empty-personal">
                          <div className="bodhi-empty-avatar-icon">🧘🏽‍♂️</div>
                          <h5>मित्र! (Dear friend), no worries at all!</h5>
                          <p>
                            Sanskrit spelling or script variations happen. Let Bodhi take you straight to our most popular study rooms:
                          </p>
                          <div className="bodhi-empty-shortcut-row">
                            <button type="button" onClick={() => setSearchQuery('assignment')}>✍️ Written Assignment</button>
                            <button type="button" onClick={() => setSearchQuery('nana moutou')}>Nana Moutou (1768)</button>
                            <button type="button" onClick={() => setSearchQuery('spheres of certainty')}>Indus Spheres (3.5 cm)</button>
                            <button type="button" onClick={() => setSearchQuery('terracotta matrix')}>Terracotta Matrix (BKG)</button>
                            <button type="button" onClick={() => setSearchQuery('koshashri')}>Sanskrit Dictionary (कोशश्री)</button>
                            <button type="button" onClick={() => setSearchQuery('deepakam')}>Class 7 & 8 Deepakam</button>
                            <button type="button" onClick={() => setSearchQuery('lakara')}>Verb Lakāras (लट्, लृट्)</button>
                            <button type="button" onClick={() => setSearchQuery('sandhi')}>Sandhi Rules (संधि)</button>
                            <button type="button" onClick={() => setSearchQuery('vibhakti')}>7 Vibhaktis (विभक्ति)</button>
                            <button type="button" onClick={() => setSearchQuery('nikhilam')}>Vedic Math Tricks</button>
                            <button type="button" onClick={() => setSearchQuery('krtrimantram')}>AI Riddle (कृत्रिमन्त्रम्)</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Default Browsing View (when search box is empty) */
                    <div className="bodhi-qa-browse-view">
                      {/* Curated Quick Search Term Discovery Pills */}
                      <div className="bodhi-quick-terms-flow" aria-label="Bodhi suggested search terms">
                        <span className="bodhi-quick-terms-label">⚡ Explore:</span>
                        {[
                          { label: '✍️ Written Assignment', term: 'assignment' },
                          { label: '🐚 Nana Moutou (1768)', term: 'nana moutou' },
                          { label: '📏 Indus Spheres (3.5 cm)', term: 'spheres of certainty' },
                          { label: '🏺 Terracotta Matrix', term: 'terracotta matrix' },
                          { label: '📖 Sanskrit Dictionary', term: 'koshashri' },
                          { label: '🎯 Deepakam (Classes 7 & 8)', term: 'deepakam' },
                          { label: '🧭 Ujjain Prime Meridian', term: 'ujjain' },
                          { label: '⚡ 16 Vedic Sutras', term: 'nikhilam' },
                          { label: '🤖 AI (कृत्रिमन्त्रम्)', term: 'krtrimantram' },
                        ].map((item) => (
                          <button
                            key={item.term}
                            type="button"
                            className="bodhi-quick-term-pill"
                            onClick={() => setSearchQuery(item.term)}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      {/* ✨ Did you know? — Micro-Anecdotes */}
                      <div className="bodhi-anecdote-strip" data-testid="bodhi-anecdote-strip">
                        <div className="bodhi-anecdote-strip-head">
                          <span className="bodhi-anecdote-strip-title">✨ Did you know?</span>
                          <button type="button" className="bodhi-anecdote-random" onClick={tellRandomStory}>
                            🎲 Tell me a story
                          </button>
                        </div>
                        <div className="bodhi-anecdote-chips">
                          {BODHI_ANECDOTES.map((a) => (
                            <button
                              key={a.id}
                              type="button"
                              className={`bodhi-anecdote-chip ${storyId === a.id ? 'active' : ''}`}
                              aria-pressed={storyId === a.id}
                              data-testid={`anecdote-chip-${a.id}`}
                              onClick={() => (storyId === a.id ? setStoryId(null) : openStory(a.id))}
                              title={a.shortAnswer}
                            >
                              <span aria-hidden="true">{a.emoji}</span> {a.question.split(':')[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {currentStory && (
                        <article className="bodhi-anecdote-pop" data-testid="bodhi-anecdote-pop" aria-live="polite">
                          <button
                            type="button"
                            className="bodhi-anecdote-close"
                            onClick={() => setStoryId(null)}
                            aria-label="Close story"
                            title="Close story"
                          >
                            ×
                          </button>
                          <div className="bodhi-anecdote-graphic" aria-hidden="true">{currentStory.emoji}</div>
                          <div className="bodhi-anecdote-hook">{currentStory.shortAnswer}</div>
                          <h5 className="bodhi-anecdote-title">{currentStory.question}</h5>
                          {currentStory.sanskritQuestion && (
                            <div className="bodhi-qa-sanskrit-q">{currentStory.sanskritQuestion}</div>
                          )}
                          <p className="bodhi-anecdote-story">
                            <FollowAlongText
                              text={currentStory.detailedAnswer}
                              lang="en"
                              activeChunk={chunkFor(currentStory.detailedAnswer)}
                            />
                            {renderEnglishSpeakBtn(currentStory.detailedAnswer, 'this story')}
                          </p>
                          {currentStory.science && (
                            <div className="bodhi-anecdote-science">
                              <strong>🔬 The science bit</strong>
                              <p>{currentStory.science}</p>
                            </div>
                          )}
                          {currentStory.tip && <p className="bodhi-anecdote-tip">💡 {currentStory.tip}</p>}
                          {currentStory.source && <p className="bodhi-anecdote-source">📜 {currentStory.source}</p>}
                          <div className="bodhi-anecdote-actions">
                            {currentStory.relatedView && (
                              <button type="button" className="bodhi-guide-btn" onClick={() => openRelated(currentStory)}>
                                {relatedLabelFor(currentStory)}
                              </button>
                            )}
                            <button type="button" className="bodhi-anecdote-random" onClick={tellRandomStory}>
                              🎲 Another story
                            </button>
                          </div>
                        </article>
                      )}

                      <div className="bodhi-category-chips">
                        {[
                          { id: 'all', label: 'All Topics' },
                          { id: 'engineering', label: '🧩 Word Riddles' },
                          { id: 'pronunciation', label: '🗣️ Pronunciation' },
                          { id: 'grammar', label: '📚 Grammar' },
                          { id: 'cbse', label: '🎯 CBSE Exams' },
                          { id: 'vedic_math', label: '⚡ Vedic Math' },
                          { id: 'philosophy', label: '🌿 Philosophy' },
                          { id: 'anecdote', label: '✨ Did you know?' },
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            className={`bodhi-chip-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>

                      <div className="bodhi-qa-list" style={{ marginTop: '0.85rem' }}>
                        {filteredQA.map((item) => (
                          <article key={item.id} className="bodhi-qa-card">
                            <h5 className="bodhi-qa-question">{item.emoji && <span aria-hidden="true">{item.emoji} </span>}{item.question}</h5>
                            {item.sanskritQuestion && (
                              <div className="bodhi-qa-sanskrit-q">{item.sanskritQuestion}</div>
                            )}
                            <div className="bodhi-qa-short">{item.shortAnswer}</div>
                            <div className="bodhi-qa-details">{item.detailedAnswer}</div>
                            {item.science && <div className="bodhi-qa-details"><strong>🔬 The science bit:</strong> {item.science}</div>}
                            {item.source && <div className="bodhi-anecdote-source">📜 {item.source}</div>}

                            <div className="bodhi-qa-bottom-bar">
                              {item.audioDevanagari ? (
                                <button
                                  type="button"
                                  className="bodhi-audio-pill"
                                  onClick={() => speakSanskrit(item.audioDevanagari!)}
                                  title="Hear pronunciation"
                                >
                                  🔊 {item.audioDevanagari}
                                </button>
                              ) : <span />}

                              {item.tip && (
                                <span className="bodhi-tip-tag">
                                  💡 <FollowAlongText text={item.tip} lang="en" activeChunk={chunkFor(item.tip)} />
                                  {renderEnglishSpeakBtn(item.tip, 'this tip')}
                                </span>
                              )}
                            </div>

                            {item.relatedView && (
                              <div style={{ marginTop: '0.65rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                {item.id === 'qa-sanskrit-dictionary-koshashri' && (
                                  <a
                                    href="https://koshashri-dc.ac.in/search/catalog/1/10?searchTerm=%E0%A4%85"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bodhi-guide-btn"
                                    style={{ background: '#0284c7', borderColor: '#0369a1', color: '#ffffff', textDecoration: 'none' }}
                                  >
                                    🌐 Search Kōshaśrī Catalog ↗
                                  </a>
                                )}
                                <button
                                  type="button"
                                  className="bodhi-guide-btn"
                                  onClick={() => openRelated(item)}
                                >
                                  {relatedLabelFor(item)}
                                </button>
                              </div>
                            )}
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Daily Subhāṣita */}
              {activeTab === 'subhashita' && (
                <div className="bodhi-subhashita-card">
                  <div className="bodhi-subhashita-meta">
                    <span className="bodhi-subhashita-theme">{currentSubhashita.theme}</span>
                    {currentSubhashita.source && (
                      <span className="bodhi-subhashita-source">{currentSubhashita.source}</span>
                    )}
                  </div>

                  <div className="bodhi-shloka-box">
                    <div className="bodhi-shloka-dev">
                      <FollowAlongText
                        text={currentSubhashita.verseDevanagari}
                        activeChunk={chunkFor(currentSubhashita.verseDevanagari)}
                      />
                    </div>
                    <div className="bodhi-shloka-iast">{currentSubhashita.verseIast}</div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      className="bodhi-speak-btn"
                      style={{ margin: '0 auto', display: 'inline-flex' }}
                      onClick={() => speakSanskrit(currentSubhashita.verseDevanagari)}
                    >
                      {isSpeaking && speakingText === currentSubhashita.verseDevanagari
                        ? '⏹ Reciting… (tap to stop)'
                        : '🔊 Recite Subhāṣita'}
                    </button>
                  </div>

                  <div className="bodhi-subhashita-meaning">
                    <strong>Meaning:</strong> {currentSubhashita.englishMeaning}
                  </div>

                  <div className="bodhi-advice-box">
                    <div className="bodhi-advice-label">
                      <span>🪔</span> Bodhi’s Reflection
                      {renderEnglishSpeakBtn(currentSubhashita.bodhiReflection, 'this reflection')}
                    </div>
                    <p className="bodhi-advice-text">
                      "<FollowAlongText
                        text={currentSubhashita.bodhiReflection}
                        lang="en"
                        activeChunk={chunkFor(currentSubhashita.bodhiReflection)}
                      />"
                    </p>
                  </div>

                  <div className="bodhi-subhashita-nav-row">
                    <button
                      type="button"
                      className="bodhi-nav-btn"
                      onClick={handlePrevSubhashita}
                    >
                      ← Previous
                    </button>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {subhashitaIdx + 1} of {BODHI_SUBHASHITAS.length}
                    </span>
                    <button
                      type="button"
                      className="bodhi-nav-btn"
                      onClick={handleNextSubhashita}
                    >
                      Next Pearl →
                    </button>
                  </div>
                </div>
              )}

              {/* TAB: Scope, AI Safeguards & Sample Interactions */}
              {activeTab === 'safeguards' && (
                <BodhiMentorPositioning
                  compact={true}
                  onOpenVarnamala={onOpenVarnamala}
                />
              )}

              {/* TAB 4: Spoken Sanskrit Soundboard */}
              {activeTab === 'phrases' && (
                <div>
                  <p style={{ margin: '0 0 0.85rem', fontSize: '0.84rem', color: '#64748b' }}>
                    Tap any card to hear Bodhi speak authentic spoken Sanskrit. Practice repeating after him!
                  </p>
                  <div className="bodhi-phrases-grid">
                    {BODHI_SPOKEN_PHRASES.map((phr) => (
                      <button
                        key={phr.id}
                        type="button"
                        className={`bodhi-phrase-card ${speakingText === phr.devanagari ? 'is-speaking' : ''}`}
                        onClick={() => speakSanskrit(phr.devanagari)}
                      >
                        <div className="bodhi-phrase-top">
                          <span className="bodhi-phrase-dev">
                            <FollowAlongText text={phr.devanagari} activeChunk={chunkFor(phr.devanagari)} />
                          </span>
                          <span className="bodhi-phrase-speak-icon">{speakingText === phr.devanagari ? '⏹' : '🔊'}</span>
                        </div>
                        <span className="bodhi-phrase-iast">{phr.iast}</span>
                        <span className="bodhi-phrase-en">{phr.english}</span>
                        <span className="bodhi-phrase-context">{phr.context}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Persistent Bottom Text-to-Speech & Mute Toolbar for Child-Centric Audio Access */}
            <footer className="bodhi-card-footer" role="toolbar" aria-label="Bodhi Audio Toolbar">
              <div className="bodhi-footer-left">
                {activeTab === 'context' ? (
                  <button
                    type="button"
                    className={`bodhi-footer-tts-btn ${isReadingFullPage ? 'is-speaking' : ''}`}
                    onClick={handleToggleReadPage}
                    title={isReadingFullPage ? 'Stop reading page' : 'Have Bodhi read this entire section aloud'}
                    aria-pressed={isReadingFullPage}
                  >
                    <span className="bodhi-footer-icon">{isReadingFullPage ? '⏹' : '🗣️'}</span>
                    <span className="bodhi-footer-text">
                      {isReadingFullPage ? 'Stop Reading' : 'Speak Page Guide'}
                    </span>
                    {isReadingFullPage && renderSoundwave()}
                  </button>
                ) : isSpeaking ? (
                  <button
                    type="button"
                    className="bodhi-footer-tts-btn is-speaking"
                    onClick={() => stopSpeaking()}
                    title="Stop Bodhi speaking"
                  >
                    <span className="bodhi-footer-icon">⏹</span>
                    <span className="bodhi-footer-text">Stop Bodhi Voice</span>
                    {renderSoundwave()}
                  </button>
                ) : (
                  <span className="bodhi-footer-search-tip">
                    {activeTab === 'qa' ? '💡 Tap any result to explore right away!' : '🌿 Bodhi Gurukul Companion'}
                  </span>
                )}
              </div>

              <div className="bodhi-footer-right">
                <button
                  type="button"
                  className="bodhi-footer-mute-btn"
                  onClick={() => stopSpeaking()}
                  title="Silence all Bodhi speech"
                  aria-label="Mute all Bodhi speech"
                  disabled={!isSpeaking}
                >
                  <span>🔇</span>
                  <span>Mute</span>
                </button>
                <span className="bodhi-footer-hint">
                  {isSpeaking ? 'Bodhi is speaking…' : 'Child-Friendly AI Companion'}
                </span>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default BodhiGuideWidget;
