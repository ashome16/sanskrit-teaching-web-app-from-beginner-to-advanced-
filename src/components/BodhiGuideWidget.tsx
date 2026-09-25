import React, { useState, useEffect, useMemo, useRef } from 'react';
import BodhiAvatar, { type BodhiMood } from './BodhiAvatar';
import {
  BODHI_PROFILE,
  BODHI_SUBHASHITAS,
  BODHI_SPOKEN_PHRASES,
  BODHI_CONTEXT_TIPS,
  BODHI_QA_LIBRARY,
} from '../data/bodhiData';
import { speakAsBodhi } from '../utils/pronunciation';
import '../styles/bodhi.css';

interface BodhiGuideWidgetProps {
  activeView: string;
  onNavigateView?: (view: any) => void;
  onOpenVarnamala?: () => void;
  forceOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialTab?: GuideTab;
}

type GuideTab = 'context' | 'qa' | 'subhashita' | 'phrases';

export const BodhiGuideWidget: React.FC<BodhiGuideWidgetProps> = ({
  activeView,
  onNavigateView,
  onOpenVarnamala,
  forceOpen,
  onOpenChange,
  initialTab,
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

  const resetSpeakingUi = () => {
    setIsSpeaking(false);
    setSpeakingText(null);
    setMood(tabMood(activeTabRef.current));
  };

  const stopSpeaking = (resetUi = true) => {
    const stop = stopSpeechRef.current;
    stopSpeechRef.current = null;
    speakingTextRef.current = null;
    stop?.();
    if (stop && resetUi) resetSpeakingUi();
  };

  const speakSanskrit = (text: string) => {
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
      setMood('reading');
      stopFn = speakAsBodhi(text, {
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

  const currentContextTip = useMemo(() => {
    return BODHI_CONTEXT_TIPS[activeView] || BODHI_CONTEXT_TIPS.home;
  }, [activeView]);

  const currentSubhashita = BODHI_SUBHASHITAS[subhashitaIdx % BODHI_SUBHASHITAS.length];

  // Filter Q&A
  const filteredQA = useMemo(() => {
    let list = BODHI_QA_LIBRARY;
    if (selectedCategory !== 'all') {
      list = list.filter((item) => item.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.shortAnswer.toLowerCase().includes(q) ||
          item.detailedAnswer.toLowerCase().includes(q) ||
          (item.sanskritQuestion && item.sanskritQuestion.includes(q))
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
                <BodhiAvatar mood={mood} size="md" showHalo={true} />
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
              <div>
                <strong>नमस्ते!</strong> अहं बोधिः — भवतः संस्कृत-सखा।
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
                    </div>
                    <p className="bodhi-advice-text">"{currentContextTip.bodhiAdvice}"</p>
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
                      placeholder="Ask Bodhi: retroflex sounds, vibhakti, sandhi, zero..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="bodhi-category-chips">
                    {[
                      { id: 'all', label: 'All Topics' },
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

                  <div className="bodhi-qa-list" style={{ marginTop: '0.85rem' }}>
                    {filteredQA.length === 0 ? (
                      <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', padding: '2rem 1rem' }}>
                        No questions found matching "{searchQuery}". Try searching for "pronunciation", "lakāra", or "sutra"!
                      </p>
                    ) : (
                      filteredQA.map((item) => (
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

                            {item.tip && <span className="bodhi-tip-tag">💡 {item.tip}</span>}
                          </div>
                        </article>
                      ))
                    )}
                  </div>
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
                    <div className="bodhi-shloka-dev">{currentSubhashita.verseDevanagari}</div>
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
                    </div>
                    <p className="bodhi-advice-text">"{currentSubhashita.bodhiReflection}"</p>
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
                        className="bodhi-phrase-card"
                        onClick={() => speakSanskrit(phr.devanagari)}
                      >
                        <div className="bodhi-phrase-top">
                          <span className="bodhi-phrase-dev">{phr.devanagari}</span>
                          <span className="bodhi-phrase-speak-icon">🔊</span>
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
