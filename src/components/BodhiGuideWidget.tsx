import React, { useState, useEffect, useMemo, useRef } from 'react';
import BodhiAvatar, { type BodhiMood } from './BodhiAvatar';
import {
  BODHI_PROFILE,
  BODHI_SUBHASHITAS,
  BODHI_SPOKEN_PHRASES,
  BODHI_CONTEXT_TIPS,
  BODHI_QA_LIBRARY,
  BODHI_WORD_SUGGESTIONS,
} from '../data/bodhiData';
import { SEARCH_INDEX, type SearchItem } from '../data/searchIndex';
import { matchesSearchQuery } from '../utils/searchNormalizer';
import {
  speakAsBodhi,
  splitBodhiSegments,
  getBodhiVoiceSpeed,
  setBodhiVoiceSpeed,
  type BodhiSpeechLang,
  type BodhiVoiceSpeed,
} from '../utils/pronunciation';
import '../styles/bodhi.css';

interface BodhiGuideWidgetProps {
  activeView: string;
  onNavigateView?: (view: any) => void;
  onOpenVarnamala?: () => void;
  forceOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialTab?: GuideTab;
  onSearchResultNavigate?: (item: SearchItem) => void;
}

type GuideTab = 'context' | 'qa' | 'subhashita' | 'phrases';

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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<GuideTab>(initialTab || 'context');
  const [mood, setMood] = useState<BodhiMood>('namaste');
  const [subhashitaIdx, setSubhashitaIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showMiniBubble, setShowMiniBubble] = useState(true);
  const [bubbleText, setBubbleText] = useState('नमस्ते! I am Bodhi. Need a tip?');
  const [isSpeaking, setIsSpeaking] = useState(false);

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
    if (!isOpen) stopSpeaking();
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
    else if (activeTab === 'qa') setMood('scholar');
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
        {active ? '⏹' : '🔊'}
      </button>
    );
  };

  const currentContextTip = useMemo(() => {
    return BODHI_CONTEXT_TIPS[activeView] || BODHI_CONTEXT_TIPS.home;
  }, [activeView]);

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

      const targetString = [
        item.title,
        item.subtitle || '',
        item.description,
        item.categoryLabel,
        ...item.keywords,
      ].join(' ');

      return matchesSearchQuery(targetString, q);
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
    let list = BODHI_QA_LIBRARY;
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
            <button
              type="button"
              className="bodhi-floating-trigger"
              onClick={() => {
                setShowMiniBubble(false);
                updateIsOpen(true);
                setMood('happy');
              }}
              title="Open Bodhi Gurukul Guide (बोधिः)"
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
                <div className="bodhi-speed-toggle" role="group" aria-label="Bodhi voice speed">
                  <button
                    type="button"
                    className={`bodhi-speed-btn ${voiceSpeed === 'slow' ? 'active' : ''}`}
                    aria-pressed={voiceSpeed === 'slow'}
                    onClick={() => changeVoiceSpeed('slow')}
                    title="Slow, calm voice (best for young learners)"
                  >
                    🐢 Slow
                  </button>
                  <button
                    type="button"
                    className={`bodhi-speed-btn ${voiceSpeed === 'normal' ? 'active' : ''}`}
                    aria-pressed={voiceSpeed === 'normal'}
                    onClick={() => changeVoiceSpeed('normal')}
                    title="Normal speaking pace"
                  >
                    Normal
                  </button>
                </div>
                <button
                  type="button"
                  className="bodhi-control-btn"
                  onClick={() => updateIsOpen(false)}
                  title="Close Guide"
                  aria-label="Close Guide"
                >
                  ✕
                </button>
              </div>
            </header>

            {/* 2. Spoken Greeting Strip */}
            <div className="bodhi-audio-greeting-strip">
              <div className="bodhi-greeting-text">
                <div>
                  <strong>नमस्ते!</strong> अहं बोधिः — भवतः संस्कृत-सखा।
                </div>
                <p className="bodhi-persona-line">🌿 {BODHI_PROFILE.persona}</p>
              </div>
              <button
                type="button"
                className="bodhi-speak-btn"
                onClick={() => speakSanskrit(BODHI_PROFILE.audioGreeting)}
                title={speakingText === BODHI_PROFILE.audioGreeting ? 'Stop Bodhi' : 'Hear Bodhi speak Namaste'}
              >
                {speakingText === BODHI_PROFILE.audioGreeting ? '⏹ Speaking… (tap to stop)' : '🔊 Listen'}
              </button>
            </div>

            {/* 3. Navigation Tabs */}
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

            {/* 4. Tab Contents */}
            <div className="bodhi-card-body">
              {/* TAB 1: Contextual Page Guide */}
              {activeTab === 'context' && (
                <div className="bodhi-context-banner">
                  <div className="bodhi-context-header">
                    <span className="bodhi-context-tag">Active Section</span>
                    <span className="bodhi-context-sanskrit">{currentContextTip.sanskritTitle}</span>
                  </div>

                  <h4 className="bodhi-context-title">{currentContextTip.title}</h4>
                  <p className="bodhi-context-summary">{currentContextTip.summary}</p>

                  <ul className="bodhi-context-bullets">
                    {currentContextTip.bulletPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
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
              )}

              {/* TAB 2: Ask Bodhi (Q&A Library) */}
              {activeTab === 'qa' && (
                <div>
                  <div className="bodhi-search-row">
                    <span className="bodhi-search-icon">🔍</span>
                    <input
                      type="text"
                      className="bodhi-search-input"
                      placeholder="Ask Bodhi: vidya, kṛtrima, AI, sandhi, retroflex, zero..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Live Word Autocomplete Radar */}
                  {matchingWords.length > 0 && (
                    <div className="bodhi-word-suggestions-tray">
                      <div className="bodhi-word-suggestions-header">
                        <span>💡 Bodhi’s Word Radar (click to explore & hear):</span>
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

                  <div className="bodhi-category-chips">
                    {[
                      { id: 'all', label: 'All Topics' },
                      { id: 'engineering', label: '🧩 Word Riddles' },
                      { id: 'pronunciation', label: '🗣️ Pronunciation' },
                      { id: 'grammar', label: '📚 Grammar' },
                      { id: 'cbse', label: '🎯 CBSE Exams' },
                      { id: 'vedic_math', label: '⚡ Vedic Math' },
                      { id: 'philosophy', label: '🌿 Philosophy' },
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

                  {searchQuery.trim().length > 0 ? (
                    <div style={{ marginTop: '0.85rem' }}>
                      {/* Personal Bodhi Greeting Banner */}
                      <div className="bodhi-personal-search-banner">
                        <div className="bodhi-personal-badge">
                          <span>🌿 अहं बोधिः</span>
                        </div>
                        <p className="bodhi-personal-message">
                          {gurukulMatches.length + filteredQA.length > 0 ? (
                            <>
                              I explored our Gurukul library for <strong>"{searchQuery.trim()}"</strong> and found <strong>{gurukulMatches.length + filteredQA.length}</strong> {gurukulMatches.length + filteredQA.length === 1 ? 'treasure' : 'treasures'} for you:
                            </>
                          ) : (
                            <>
                              I searched our entire Gurukul library, but didn't find an exact match for <strong>"{searchQuery.trim()}"</strong>. Let me guide you to related topics below!
                            </>
                          )}
                        </p>
                      </div>

                      {/* 1. Gurukul Lessons, Studios & Articles */}
                      {gurukulMatches.length > 0 && selectedCategory !== 'engineering' && (
                        <div className="bodhi-search-group">
                          <div className="bodhi-search-group-title">
                            <span>🧭 Gurukul Lessons & Interactive Studios ({gurukulMatches.length})</span>
                          </div>
                          <div className="bodhi-gurukul-results-list">
                            {gurukulMatches.map((item) => (
                              <div key={item.id} className="bodhi-gurukul-card">
                                <div className="bodhi-gurukul-card-header">
                                  <span
                                    className="bodhi-gurukul-badge"
                                    style={{
                                      backgroundColor: `${item.badgeColor}15`,
                                      color: item.badgeColor,
                                      borderColor: `${item.badgeColor}40`,
                                    }}
                                  >
                                    {item.badgeEmoji} {item.categoryLabel}
                                  </span>
                                  <button
                                    type="button"
                                    className="bodhi-guide-btn"
                                    onClick={() => handleNavigateToGurukulItem(item)}
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
                      {filteredQA.length > 0 && selectedCategory !== 'lessons' && (
                        <div className="bodhi-search-group" style={{ marginTop: gurukulMatches.length > 0 ? '1rem' : '0' }}>
                          <div className="bodhi-search-group-title">
                            <span>❓ Bodhi’s Direct Explanations ({filteredQA.length})</span>
                          </div>
                          <div className="bodhi-qa-list">
                            {filteredQA.map((item) => (
                              <article key={item.id} className="bodhi-qa-card">
                                <h5 className="bodhi-qa-question">{item.question}</h5>
                                {item.sanskritQuestion && (
                                  <div className="bodhi-qa-sanskrit-q">{item.sanskritQuestion}</div>
                                )}
                                <div className="bodhi-qa-short">{item.shortAnswer}</div>
                                <div className="bodhi-qa-details">{item.detailedAnswer}</div>

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
                              </article>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Empty State with Warm Personal Recommendations */}
                      {gurukulMatches.length === 0 && filteredQA.length === 0 && (
                        <div className="bodhi-search-empty-personal">
                          <div className="bodhi-empty-avatar-icon">🧘🏽‍♂️</div>
                          <h5>मित्र! (Dear friend), no worries at all!</h5>
                          <p>
                            Sanskrit spelling or script variations happen. Let Bodhi take you straight to our most popular study rooms:
                          </p>
                          <div className="bodhi-empty-shortcut-row">
                            <button type="button" onClick={() => setSearchQuery('lakara')}>Verb Lakāras (लट्, लृट्)</button>
                            <button type="button" onClick={() => setSearchQuery('sandhi')}>Sandhi Rules (संधि)</button>
                            <button type="button" onClick={() => setSearchQuery('vibhakti')}>7 Vibhaktis (विभक्ति)</button>
                            <button type="button" onClick={() => setSearchQuery('nikhilam')}>Vedic Math Tricks</button>
                            <button type="button" onClick={() => setSearchQuery('vidya')}>Vidyā (विद्या)</button>
                            <button type="button" onClick={() => setSearchQuery('krtrimantram')}>AI Riddle (कृत्रिमन्त्रम्)</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bodhi-qa-list" style={{ marginTop: '0.85rem' }}>
                      {filteredQA.map((item) => (
                        <article key={item.id} className="bodhi-qa-card">
                          <h5 className="bodhi-qa-question">{item.question}</h5>
                          {item.sanskritQuestion && (
                            <div className="bodhi-qa-sanskrit-q">{item.sanskritQuestion}</div>
                          )}
                          <div className="bodhi-qa-short">{item.shortAnswer}</div>
                          <div className="bodhi-qa-details">{item.detailedAnswer}</div>

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
                        </article>
                      ))}
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
          </div>
        </div>
      )}
    </>
  );
};

export default BodhiGuideWidget;
