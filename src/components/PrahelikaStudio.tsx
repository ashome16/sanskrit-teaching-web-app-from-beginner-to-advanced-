import React, { useState, useCallback } from 'react';
import {
  PRAHELIKAS,
  type PrahelikaItem,
  type PrahelikaQuestion,
} from '../data/prahelikaData';
import { playPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import '../styles/prahelika.css';

export interface PrahelikaStudioProps {
  onGoBack?: () => void;
  onOpenIks?: () => void;
  className?: string;
}

const PRAHELIKA_STARS_KEY = 'ednet_prahelika_stars_v1';
const PRAHELIKA_SOLVED_KEY = 'ednet_prahelika_solved_v1';
const PRAHELIKA_IAST_KEY = 'ednet_prahelika_show_iast_v1';

interface PrahelikaCardViewProps {
  riddle: PrahelikaItem;
  riddleIndex: number;
  totalRiddles: number;
  showIast: boolean;
  isSolvedAlready: boolean;
  onSolveRiddle: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const PrahelikaCardView: React.FC<PrahelikaCardViewProps> = ({
  riddle,
  riddleIndex,
  totalRiddles,
  showIast,
  isSolvedAlready,
  onSolveRiddle,
  onPrev,
  onNext,
}) => {
  // State for Riddle 1: Antarālāpikā (Sequential question-to-word matching)
  const [antaralapikaStep, setAntaralapikaStep] = useState<number>(0);
  const [antaralapikaWrongWord, setAntaralapikaWrongWord] = useState<string | null>(null);

  // State for Riddles 2, 3, 4: Multiple choice
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isWrongSelection, setIsWrongSelection] = useState<boolean>(false);
  const [isSecretExpanded, setIsSecretExpanded] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

  // Handle word tap in Antarālāpikā Line 4
  const handleAntaralapikaWordClick = (word: string) => {
    if (!riddle.questions) return;
    const currentQ: PrahelikaQuestion | undefined = riddle.questions[antaralapikaStep];
    if (!currentQ) return;

    if (currentQ.verseRefWord === word) {
      soundEffects.playStrokeChime();
      playPronunciation(word);
      const nextStep = antaralapikaStep + 1;
      setAntaralapikaStep(nextStep);
      setAntaralapikaWrongWord(null);

      if (nextStep === riddle.questions.length) {
        soundEffects.playCelebrationChime();
        onSolveRiddle();
      }
    } else {
      soundEffects.playErrorBuzzer();
      setAntaralapikaWrongWord(word);
      setTimeout(() => setAntaralapikaWrongWord(null), 700);
    }
  };

  // Handle option selection for Riddles 2, 3, 4
  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    setSelectedOptionId(optionId);
    if (isCorrect) {
      setIsWrongSelection(false);
      soundEffects.playCelebrationChime();
      playPronunciation(riddle.answerSa);
      onSolveRiddle();
    } else {
      setIsWrongSelection(true);
      soundEffects.playErrorBuzzer();
    }
  };

  const isCurrentRiddleSolved =
    riddle.genre === 'अन्तरालापिका'
      ? antaralapikaStep >= (riddle.questions?.length || 3) || isSolvedAlready
      : (selectedOptionId && riddle.options.find((o) => o.id === selectedOptionId)?.isCorrect) ||
        isSolvedAlready;

  return (
    <div className="prahelika-card">
      <div className="prahelika-genre-tag-row">
        <span className="prahelika-genre-tag">
          <span>✨</span> {riddle.genre} · {riddle.genreDesc.split('—')[0]}
        </span>
        <span className="prahelika-riddle-num">
          Riddle {riddle.num} of {totalRiddles}
        </span>
      </div>

      {/* Indian Folklore Miniature Painting Artwork */}
      {riddle.illustrationUrl && (
        <div className="prahelika-folklore-card">
          <div
            className="prahelika-folklore-frame"
            role="button"
            tabIndex={0}
            onClick={() => {
              soundEffects.playStrokeChime();
              setIsImageModalOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsImageModalOpen(true);
              }
            }}
            title="Click to view full-screen high-resolution Indian folklore painting"
          >
            <img
              src={riddle.illustrationUrl}
              alt={riddle.illustrationCaption || riddle.titleEn}
              className="prahelika-folklore-img"
              width={1024}
              height={640}
              loading="lazy"
            />
            <div className="prahelika-folklore-badge">
              <span>🎨 भारतीय लोक-कला · Indian Folklore Miniature Painting</span>
              <span className="prahelika-zoom-pill">🔍 Enlarge HD</span>
            </div>
          </div>
          {riddle.illustrationCaption && (
            <p className="prahelika-folklore-caption">
              <strong>चित्र-रहस्यम् · Folklore Painting:</strong> {riddle.illustrationCaption}
            </p>
          )}
        </div>
      )}

      {/* Golden Shloka Box */}
      <div className="prahelika-shloka-box">
        <div className="prahelika-shloka-top">
          <span className="prahelika-shloka-label">संस्कृत-श्लोकः · CLASSICAL VERSE</span>
          <button
            type="button"
            className="prahelika-audio-btn"
            onClick={() => playPronunciation(riddle.audioPronunciationText)}
            title="Recite the full verse in Sanskrit"
          >
            <span>🔊</span>
            <span>Recite Verse</span>
          </button>
        </div>

        <div className="prahelika-shloka-sa" lang="sa">
          {riddle.verseLines.map((line, lIdx) => (
            <span key={`line-${lIdx}`} className="prahelika-shloka-sa-line">
              {line}
            </span>
          ))}
        </div>

        {showIast && (
          <div className="prahelika-shloka-iast">
            {riddle.iastLines.map((iastLine, iIdx) => (
              <div key={`iast-${iIdx}`}>{iastLine}</div>
            ))}
          </div>
        )}

        <div className="prahelika-shloka-translation">
          <strong>English Poetic Translation:</strong>
          <br />
          {riddle.englishTranslation}
        </div>
      </div>

      {/* MODE 1: ANTARĀLĀPIKĀ SEQUENTIAL GAMEPLAY (Riddle 1) */}
      {riddle.genre === 'अन्तरालापिका' && riddle.questions && (
        <div className="antaralapika-game-container">
          <div className="antaralapika-instructions">
            <h3>
              <span>🎯</span> The Antarālāpikā Challenge (अन्तरालापिका)
            </h3>
            <p>
              The last line looks like: <em>&ldquo;From a deer, a lion flees!&rdquo;</em> (absurd!).
              In reality, it conceals the 3 answers in exact chronological order.
              <strong> Tap the word in Line 4 that answers each question!</strong>
            </p>
          </div>

          {/* Current Question */}
          {antaralapikaStep < riddle.questions.length ? (
            <div className="antaralapika-quest-card">
              <div className="antaralapika-quest-q-num">
                Question {antaralapikaStep + 1} of 3
              </div>
              <div className="antaralapika-quest-q-sa" lang="sa">
                {riddle.questions[antaralapikaStep].questionSa}
              </div>
              <div className="antaralapika-quest-q-en">
                {riddle.questions[antaralapikaStep].questionEn}
              </div>
            </div>
          ) : null}

          {/* Line 4 Interactive Tap Row */}
          <div className="antaralapika-line4-interactive">
            <div className="antaralapika-line4-label">
              पादः ४ (Line 4) · Tap the Matching Answer Word:
            </div>
            <div className="antaralapika-words-row">
              {['मृगात्', 'सिंहः', 'पलायते'].map((w, wIdx) => {
                const isSolved = wIdx < antaralapikaStep;
                const isWrong = antaralapikaWrongWord === w;
                return (
                  <button
                    key={w}
                    type="button"
                    className={`antaralapika-word-btn${isSolved ? ' is-solved' : ''}${isWrong ? ' is-wrong' : ''}`}
                    onClick={() => handleAntaralapikaWordClick(w)}
                    disabled={isSolved || antaralapikaStep >= 3}
                  >
                    {w}
                    {isSolved && <span> ✔</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Antarālāpikā Solved Summary */}
          {antaralapikaStep >= riddle.questions.length && (
            <div className="antaralapika-results-summary">
              <h4 className="antaralapika-summary-title">
                <span>🎉</span> साध्यम्! Mathematical Sanskrit Symmetry Solved! (+5 ⭐)
              </h4>
              <div className="antaralapika-summary-grid">
                {riddle.questions.map((q) => (
                  <div key={q.qId} className="antaralapika-summary-cell">
                    <span className="antaralapika-summary-q">{q.questionSa}</span>
                    <span className="antaralapika-summary-ans-sa">{q.answerSa}</span>
                    <span className="antaralapika-summary-ans-en">{q.answerEn}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: PARADOX CLUES & MULTIPLE-CHOICE (Riddles 2, 3, 4) */}
      {riddle.genre !== 'अन्तरालापिका' && (
        <div className="prahelika-interactive-solve">
          {/* Clues Breakdown */}
          <div className="prahelika-clues-strip">
            {riddle.clues.map((clue, cIdx) => (
              <div key={`clue-${cIdx}`} className="prahelika-clue-item">
                <span className="prahelika-clue-icon" aria-hidden="true">
                  {clue.icon}
                </span>
                <div>
                  <div className="prahelika-clue-text-sa" lang="sa">
                    {clue.textSa}
                  </div>
                  <div className="prahelika-clue-text-en">{clue.textEn}</div>
                  <p className="prahelika-clue-exp">{clue.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Answer Options */}
          <h3 className="prahelika-options-title">
            <span>🤔</span> किमस्ति तत्? What is this object? (Choose the correct answer):
          </h3>

          <div className="prahelika-options-grid">
            {riddle.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const showCorrect =
                (isSelected && opt.isCorrect) ||
                (isSolvedAlready && opt.isCorrect);
              const showWrong = isSelected && isWrongSelection && !opt.isCorrect;

              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`prahelika-opt-btn${showCorrect ? ' is-correct' : ''}${showWrong ? ' is-wrong' : ''}`}
                  onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                >
                  <div>
                    <span className="prahelika-opt-sa" lang="sa">
                      {opt.sa}
                    </span>
                    <span className="prahelika-opt-en">{opt.en}</span>
                  </div>
                  {showCorrect && <span style={{ fontSize: '1.4rem' }}>✅</span>}
                  {showWrong && <span style={{ fontSize: '1.4rem' }}>❌</span>}
                </button>
              );
            })}
          </div>

          {/* Feedback Banner */}
          {selectedOptionId && (
            <div
              className={`prahelika-feedback-banner ${
                riddle.options.find((o) => o.id === selectedOptionId)?.isCorrect
                  ? 'is-success'
                  : 'is-fail'
              }`}
            >
              <span className="prahelika-feedback-icon" aria-hidden="true">
                {riddle.options.find((o) => o.id === selectedOptionId)?.isCorrect
                  ? '🎉'
                  : '💡'}
              </span>
              <div className="prahelika-feedback-text">
                <h4>
                  {riddle.options.find((o) => o.id === selectedOptionId)?.isCorrect
                    ? `साधु! Correct Answer: ${riddle.answerSa} (+5 ⭐)`
                    : 'Not quite! Re-examine the paradox clues above.'}
                </h4>
                <p>
                  {riddle.options.find((o) => o.id === selectedOptionId)?.isCorrect
                    ? `English Meaning: ${riddle.answerEn}`
                    : 'Notice how the verse contrasts opposing attributes to describe an everyday marvel.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Poetic Genius & Literary Secret (रहस्यम्) Accordion */}
      <div className="prahelika-secret-accordion">
        <button
          type="button"
          className="prahelika-secret-toggle"
          onClick={() => setIsSecretExpanded(!isSecretExpanded)}
          aria-expanded={isSecretExpanded}
        >
          <span>
            🔍 श्लोक-रहस्यम् · Poetic Genius &amp; Literary Secret of Riddle #{riddle.num}
          </span>
          <span>{isSecretExpanded ? '▲ Close' : '▼ Reveal Secret'}</span>
        </button>

        {isSecretExpanded && (
          <div className="prahelika-secret-body">
            <p className="prahelika-secret-desc">{riddle.literarySecret}</p>
            <div className="prahelika-fun-fact-chip">
              <span>💡</span>
              <span>
                <strong>Gurukul Tradition:</strong> {riddle.funFact}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="prahelika-bottom-nav">
        <button
          type="button"
          className="prahelika-nav-btn"
          disabled={riddleIndex === 0}
          onClick={onPrev}
        >
          <span>◀</span>
          <span>Previous Riddle</span>
        </button>

        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
          {riddleIndex + 1} / {totalRiddles}
        </span>

        <button
          type="button"
          className={`prahelika-nav-btn${isCurrentRiddleSolved && riddleIndex < totalRiddles - 1 ? ' is-next-solve' : ''}`}
          disabled={riddleIndex === totalRiddles - 1}
          onClick={onNext}
        >
          <span>Next Riddle</span>
          <span>▶</span>
        </button>
      </div>

      {/* Lightbox Modal for Full-Screen HD Folklore Miniature Painting */}
      {isImageModalOpen && riddle.illustrationUrl && (
        <div
          className="prahelika-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="prahelika-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="prahelika-lightbox-header">
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>
                🎨 {riddle.titleSa} · {riddle.titleEn} (Indian Folklore Miniature)
              </h3>
              <button
                type="button"
                className="prahelika-lightbox-close"
                onClick={() => setIsImageModalOpen(false)}
                title="Close Lightbox"
              >
                ✕ Close
              </button>
            </div>
            <div className="prahelika-lightbox-body">
              <img
                src={riddle.illustrationUrl}
                alt={riddle.illustrationCaption || riddle.titleEn}
                className="prahelika-lightbox-img"
              />
            </div>
            {riddle.illustrationCaption && (
              <div className="prahelika-lightbox-footer">
                {riddle.illustrationCaption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const PrahelikaStudio: React.FC<PrahelikaStudioProps> = ({
  onGoBack,
  onOpenIks,
  className = '',
}) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeRiddle: PrahelikaItem = PRAHELIKAS[activeIdx] || PRAHELIKAS[0];

  // Persistent Stars
  const [stars, setStars] = useState<number>(() => {
    try {
      return Math.max(0, Number(localStorage.getItem(PRAHELIKA_STARS_KEY)) || 0);
    } catch {
      return 0;
    }
  });

  const awardStars = useCallback((amount: number) => {
    if (amount <= 0) return;
    setStars((prev) => {
      const next = prev + amount;
      try {
        localStorage.setItem(PRAHELIKA_STARS_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // Solved riddles set
  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(PRAHELIKA_SOLVED_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const markSolved = useCallback((id: string) => {
    setSolvedIds((prev) => {
      const next = new Set(prev);
      if (!next.has(id)) {
        next.add(id);
        try {
          localStorage.setItem(PRAHELIKA_SOLVED_KEY, JSON.stringify([...next]));
        } catch {
          // ignore
        }
      }
      return next;
    });
  }, []);

  // IAST toggle
  const [showIast, setShowIast] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(PRAHELIKA_IAST_KEY);
      return saved ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleIast = () => {
    setShowIast((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(PRAHELIKA_IAST_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleSolveCurrentRiddle = useCallback(() => {
    if (!solvedIds.has(activeRiddle.id)) {
      awardStars(5);
      markSolved(activeRiddle.id);
    }
  }, [activeRiddle.id, awardStars, markSolved, solvedIds]);

  return (
    <div className={`prahelika-studio ${className}`}>
      {/* Header Banner */}
      <div className="prahelika-header-banner">
        <div className="prahelika-top-row">
          {onGoBack && (
            <button
              type="button"
              className="prahelika-back-btn"
              onClick={onGoBack}
              title="Return to Sanskrit Puzzles & Games"
            >
              <span>◀</span>
              <span>All Puzzles (जोडो / Games)</span>
            </button>
          )}

          <div className="prahelika-header-actions">
            <span className="prahelika-star-pill" title="Total Stars Earned">
              <span>⭐</span>
              <span>{stars} Stars</span>
            </span>

            <button
              type="button"
              className="prahelika-toggle-btn"
              onClick={toggleIast}
              title="Toggle Roman English Pronunciation"
            >
              <span>🔤</span>
              <span>{showIast ? 'IAST Roman: ON' : 'IAST Roman: OFF'}</span>
            </button>
          </div>
        </div>

        <div className="prahelika-title-group">
          <h1>
            <span>📜</span>
            <span>प्रहेलिका-मञ्जरी · Classical Riddles Studio</span>
          </h1>
          <p className="prahelika-subtitle">
            Ancient Sanskrit wit, internal-answer verses (अन्तरालापिका), paradoxical wordplay (विरोधाभासः),
            and concealed object riddles (पद-गूढम्) from authentic Gurukul traditions!
          </p>
        </div>

        {/* Indian Knowledge Systems (IKS) Ribbon */}
        <div className="prahelika-iks-ribbon">
          <span className="prahelika-iks-badge">
            <span>🕉️</span> भारतीय ज्ञान परंपरा · Ancient Indian Linguistic &amp; Cognitive Arts
          </span>
          <button
            type="button"
            className="prahelika-iks-link"
            onClick={() => {
              if (onOpenIks) {
                onOpenIks();
              } else {
                window.location.hash = '#vedic-knowledge-system';
              }
            }}
          >
            Explore Vedic Indian Knowledge System (IKS) ➔
          </button>
        </div>
      </div>

      {/* Riddle Selector Tabs */}
      <div className="prahelika-tabs-strip" role="tablist" aria-label="Select a Sanskrit Riddle">
        {PRAHELIKAS.map((riddle, idx) => {
          const isAct = idx === activeIdx;
          const isSolved = solvedIds.has(riddle.id);
          return (
            <button
              key={riddle.id}
              type="button"
              role="tab"
              aria-selected={isAct}
              className={`prahelika-tab-btn${isAct ? ' is-active' : ''}`}
              onClick={() => {
                soundEffects.playStrokeChime();
                setActiveIdx(idx);
              }}
            >
              <div className="prahelika-tab-top">
                <span className="prahelika-tab-emoji" aria-hidden="true">
                  {riddle.emoji}
                </span>
                <span className="prahelika-tab-badge">Riddle #{riddle.num}</span>
              </div>
              <span className="prahelika-tab-title-sa">{riddle.titleSa}</span>
              <span className="prahelika-tab-title-en">{riddle.titleEn}</span>
              {isSolved && (
                <span className="prahelika-solved-check" title="Solved! +5 ⭐">
                  ✅
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Riddle Card View — keyed to automatically reset local interactive state */}
      <PrahelikaCardView
        key={activeRiddle.id}
        riddle={activeRiddle}
        riddleIndex={activeIdx}
        totalRiddles={PRAHELIKAS.length}
        showIast={showIast}
        isSolvedAlready={solvedIds.has(activeRiddle.id)}
        onSolveRiddle={handleSolveCurrentRiddle}
        onPrev={() => {
          soundEffects.playStrokeChime();
          setActiveIdx((prev) => Math.max(0, prev - 1));
        }}
        onNext={() => {
          soundEffects.playStrokeChime();
          setActiveIdx((prev) => Math.min(PRAHELIKAS.length - 1, prev + 1));
        }}
      />
    </div>
  );
};

export default PrahelikaStudio;
