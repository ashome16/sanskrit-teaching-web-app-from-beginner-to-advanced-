import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VARNAMALA_MNEMONICS, type LetterMnemonic } from '../../data/varnamalaMnemonics';
import { playPronunciation, playSequence } from '../../utils/pronunciation';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/preschool-varnamala.css';

export interface PreschoolVarnamalaGameProps {
  onEarnStar?: () => void;
  className?: string;
}

type GameMode = 'explore' | 'find_letter' | 'sound_picture' | 'train';

type FilterGroup =
  | 'all'
  | 'svara'
  | 'kavarga'
  | 'cavarga'
  | 'tavarga_retro'
  | 'tavarga_dental'
  | 'pavarga'
  | 'whispers'
  | 'samyukta';

const ALL_MNEMONICS: LetterMnemonic[] = Object.values(VARNAMALA_MNEMONICS);

// Clean, child-friendly group chips with minimal text
const FILTER_GROUPS: { id: FilterGroup; labelSa: string; icon: string; letters: string[] }[] = [
  {
    id: 'all',
    labelSa: 'सर्व (All)',
    icon: '🌟',
    letters: ALL_MNEMONICS.map((m) => m.letter),
  },
  {
    id: 'svara',
    labelSa: 'स्वराः (Vowels)',
    icon: '🍬',
    letters: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः', 'अँ'],
  },
  {
    id: 'kavarga',
    labelSa: 'क-वर्ग',
    icon: '🪷',
    letters: ['क', 'ख', 'ग', 'घ', 'ङ'],
  },
  {
    id: 'cavarga',
    labelSa: 'च-वर्ग',
    icon: '🥄',
    letters: ['च', 'छ', 'ज', 'झ', 'ञ'],
  },
  {
    id: 'tavarga_retro',
    labelSa: 'ट-वर्ग',
    icon: '🔔',
    letters: ['ट', 'ठ', 'ड', 'ढ', 'ण'],
  },
  {
    id: 'tavarga_dental',
    labelSa: 'त-वर्ग',
    icon: '⭐',
    letters: ['त', 'थ', 'द', 'ध', 'न'],
  },
  {
    id: 'pavarga',
    labelSa: 'प-वर्ग',
    icon: '🪁',
    letters: ['प', 'फ', 'ब', 'भ', 'म'],
  },
  {
    id: 'whispers',
    labelSa: 'य-ह',
    icon: '💨',
    letters: ['य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],
  },
  {
    id: 'samyukta',
    labelSa: 'क्ष-श्र',
    icon: '✨',
    letters: ['क्ष', 'त्र', 'ज्ञ', 'श्र'],
  },
];

// Helper to shuffle an array
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const PreschoolVarnamalaGame: React.FC<PreschoolVarnamalaGameProps> = ({
  onEarnStar,
  className = '',
}) => {
  const [mode, setMode] = useState<GameMode>('explore');
  const [activeFilter, setActiveFilter] = useState<FilterGroup>('svara');
  const [selectedLetterKey, setSelectedLetterKey] = useState<string>('अ');
  const [exploredLetters, setExploredLetters] = useState<Set<string>>(() => new Set(['अ']));
  const [starsCollected, setStarsCollected] = useState<number>(0);

  // Train playback state
  const [isPlayingTrain, setIsPlayingTrain] = useState<boolean>(false);
  const [trainIndex, setTrainIndex] = useState<number>(0);
  const carriageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Find Letter Challenge State
  const [findTarget, setFindTarget] = useState<LetterMnemonic>(VARNAMALA_MNEMONICS['अ']);
  const [findOptions, setFindOptions] = useState<LetterMnemonic[]>([]);
  const [findCorrectOption, setFindCorrectOption] = useState<string | null>(null);
  const [findWrongOptions, setFindWrongOptions] = useState<Set<string>>(new Set());

  // "Sound and Picture" State & Direction
  const [soundPicDirection, setSoundPicDirection] = useState<'pic_to_sound' | 'sound_to_pic'>('pic_to_sound');
  const [picTarget, setPicTarget] = useState<LetterMnemonic>(VARNAMALA_MNEMONICS['आ']);
  const [picOptions, setPicOptions] = useState<LetterMnemonic[]>([]);
  const [picCorrectOption, setPicCorrectOption] = useState<string | null>(null);
  const [picWrongOptions, setPicWrongOptions] = useState<Set<string>>(new Set());
  const [isShareCopied, setIsShareCopied] = useState(false);

  const handleShareVarnamala = async () => {
    try {
      soundEffects.playStrokeChime();
    } catch {}
    const shareData = {
      title: 'Free Preschool Games for Ages 3–6 | Play 2 Learn – EdNet Learn',
      text: 'Play free preschool games that build letters, numbers, shapes, memory, and early Sanskrit sounds. Safe, simple, and fun for ages 3–6.',
      url: window.location.origin + '/preschool',
    };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {}
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setIsShareCopied(true);
        setTimeout(() => setIsShareCopied(false), 2400);
      } catch {}
    }
  };

  // Filtered letters based on active group
  const filteredMnemonics = useMemo(() => {
    const groupDef = FILTER_GROUPS.find((g) => g.id === activeFilter);
    if (!groupDef || activeFilter === 'all') return ALL_MNEMONICS;
    return groupDef.letters
      .map((l) => VARNAMALA_MNEMONICS[l])
      .filter((m): m is LetterMnemonic => Boolean(m));
  }, [activeFilter]);

  // Current spotlight letter mnemonic
  const activeMnemonic = useMemo(() => {
    return VARNAMALA_MNEMONICS[selectedLetterKey] || ALL_MNEMONICS[0];
  }, [selectedLetterKey]);

  // Handle letter click in explore grid
  const handleSelectLetter = (letter: LetterMnemonic) => {
    setSelectedLetterKey(letter.letter);
    setExploredLetters((prev) => {
      const next = new Set(prev);
      next.add(letter.letter);
      return next;
    });
    try {
      soundEffects.playStrokeChime();
    } catch {
      // safe fallback
    }
    playPronunciation(letter.letter);
  };

  // Replay audio for spotlight card
  const replaySpotlightAudio = () => {
    try {
      soundEffects.playStrokeChime();
    } catch {
      // safe fallback
    }
    playSequence([activeMnemonic.letter, activeMnemonic.wordSan], { gapMs: 450 });
  };

  // Step through letters in Explore mode
  const handleStepLetter = (direction: -1 | 1) => {
    const list = filteredMnemonics.length > 0 ? filteredMnemonics : ALL_MNEMONICS;
    const currentIndex = list.findIndex((m) => m.letter === selectedLetterKey);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = list.length - 1;
    if (nextIndex >= list.length) nextIndex = 0;
    const nextLetter = list[nextIndex];
    if (nextLetter) {
      handleSelectLetter(nextLetter);
    }
  };

  // ==========================================
  // Find Letter Game Generator
  // ==========================================
  const generateFindQuestion = () => {
    const pool = filteredMnemonics.length >= 3 ? filteredMnemonics : ALL_MNEMONICS;
    const target = pool[Math.floor(Math.random() * pool.length)] || ALL_MNEMONICS[0];

    // Pick 2 distinct distractors
    const distractors: LetterMnemonic[] = [];
    const distractorPool = shuffleArray(ALL_MNEMONICS.filter((m) => m.letter !== target.letter));
    for (let i = 0; i < 2 && i < distractorPool.length; i++) {
      distractors.push(distractorPool[i]);
    }

    const options = shuffleArray([target, ...distractors]);
    setFindTarget(target);
    setFindOptions(options);
    setFindCorrectOption(null);
    setFindWrongOptions(new Set());

    // Audio instruction on load
    setTimeout(() => {
      playPronunciation(target.letter);
    }, 250);
  };

  // Replay audio instruction for Find the Letter
  const replayFindAudio = () => {
    try {
      soundEffects.playBubblePop();
    } catch {
      // safe fallback
    }
    playSequence([findTarget.letter, findTarget.wordSan], { gapMs: 400 });
  };

  const handlePickFindOption = (option: LetterMnemonic) => {
    if (findCorrectOption) return;

    if (option.letter === findTarget.letter) {
      // CORRECT VISUAL & AUDIO FEEDBACK
      setFindCorrectOption(option.letter);
      setStarsCollected((prev) => prev + 1);
      try {
        soundEffects.playCelebrationChime();
      } catch {
        // safe fallback
      }
      playSequence([option.letter, option.wordSan], { gapMs: 400 });
      if (onEarnStar) onEarnStar();

      setTimeout(() => {
        generateFindQuestion();
      }, 1600);
    } else {
      // INCORRECT VISUAL & AUDIO FEEDBACK
      setFindWrongOptions((prev) => {
        const next = new Set(prev);
        next.add(option.letter);
        return next;
      });
      try {
        soundEffects.playBubblePop();
      } catch {
        // safe fallback
      }
      playPronunciation(option.letter);
    }
  };

  // ==========================================
  // "Sound and Picture" Game Generator
  // ==========================================
  const generateSoundPicQuestion = (direction = soundPicDirection) => {
    const pool = filteredMnemonics.length >= 3 ? filteredMnemonics : ALL_MNEMONICS;
    const target = pool[Math.floor(Math.random() * pool.length)] || ALL_MNEMONICS[0];

    const distractors: LetterMnemonic[] = [];
    const distractorPool = shuffleArray(ALL_MNEMONICS.filter((m) => m.letter !== target.letter));
    for (let i = 0; i < 2 && i < distractorPool.length; i++) {
      distractors.push(distractorPool[i]);
    }

    const options = shuffleArray([target, ...distractors]);
    setPicTarget(target);
    setPicOptions(options);
    setPicCorrectOption(null);
    setPicWrongOptions(new Set());

    // Audio instruction depends on direction
    setTimeout(() => {
      if (direction === 'pic_to_sound') {
        playPronunciation(target.wordSan);
      } else {
        playPronunciation(target.letter);
      }
    }, 250);
  };

  // Replay audio instruction for Sound and Picture
  const replaySoundPicAudio = () => {
    try {
      soundEffects.playBubblePop();
    } catch {
      // safe fallback
    }
    if (soundPicDirection === 'pic_to_sound') {
      playPronunciation(picTarget.wordSan);
    } else {
      playSequence([picTarget.letter, picTarget.wordSan], { gapMs: 400 });
    }
  };

  const handlePickSoundPicOption = (option: LetterMnemonic) => {
    if (picCorrectOption) return;

    if (option.letter === picTarget.letter) {
      // CORRECT VISUAL & AUDIO FEEDBACK
      setPicCorrectOption(option.letter);
      setStarsCollected((prev) => prev + 1);
      try {
        soundEffects.playCelebrationChime();
      } catch {
        // safe fallback
      }
      playSequence([picTarget.letter, picTarget.wordSan], { gapMs: 400 });
      if (onEarnStar) onEarnStar();

      setTimeout(() => {
        generateSoundPicQuestion();
      }, 1600);
    } else {
      // INCORRECT VISUAL & AUDIO FEEDBACK
      setPicWrongOptions((prev) => {
        const next = new Set(prev);
        next.add(option.letter);
        return next;
      });
      try {
        soundEffects.playBubblePop();
      } catch {
        // safe fallback
      }
      if (soundPicDirection === 'pic_to_sound') {
        playPronunciation(option.letter);
      } else {
        playPronunciation(option.wordSan);
      }
    }
  };

  // Mode change side-effects
  useEffect(() => {
    if (mode === 'find_letter') {
      generateFindQuestion();
    } else if (mode === 'sound_picture') {
      generateSoundPicQuestion();
    } else if (mode === 'train') {
      setTrainIndex(0);
      setIsPlayingTrain(false);
    }
  }, [mode]);

  // Train Sing-Along Interval Engine
  useEffect(() => {
    if (!isPlayingTrain || mode !== 'train') return;

    const list = filteredMnemonics.length > 0 ? filteredMnemonics : ALL_MNEMONICS;
    const currentItem = list[trainIndex % list.length];
    if (currentItem) {
      playPronunciation(currentItem.letter);
      const elem = carriageRefs.current[trainIndex % list.length];
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }

    const timer = setInterval(() => {
      setTrainIndex((prev) => {
        const next = (prev + 1) % list.length;
        const item = list[next];
        if (item) {
          playPronunciation(item.letter);
          const elem = carriageRefs.current[next];
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        }
        return next;
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [isPlayingTrain, mode, filteredMnemonics, trainIndex]);

  return (
    <div className={`pvg-root ${className}`}>
      {/* ------------------------------------------------------------------
          TOP BENCHMARK & MODE NAVIGATION BAR
          ------------------------------------------------------------------ */}
      <div className="pvg-top-bar">
        <div className="pvg-hero-left">
          <span className="pvg-hero-icon" aria-hidden="true">🔤</span>
          <div>
            <span className="pvg-kicker">Play 2 Learn · Ages 3–6</span>
            <h3 className="pvg-title">
              <span className="pvg-title-sa">वर्णमाला</span>
              <span>Letter Garden</span>
            </h3>
          </div>
        </div>

        <div className="pvg-top-actions">
          <button
            type="button"
            className="pvg-share-btn"
            onClick={handleShareVarnamala}
            title="Share Play 2 Learn Varnamala with parents & teachers"
            aria-label="Share preschool game"
          >
            <span>{isShareCopied ? '✅ Link Copied!' : '📤 Share'}</span>
          </button>

          <div className="pvg-star-pill" title="Stars won">
            <span aria-hidden="true">⭐</span>
            <span>{starsCollected} Stars</span>
          </div>

          <div className="pvg-mode-bar" role="tablist" aria-label="Play Modes">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'explore'}
              className={`pvg-mode-btn ${mode === 'explore' ? 'is-active' : ''}`}
              onClick={() => {
                setMode('explore');
                soundEffects.playStrokeChime();
              }}
            >
              <span aria-hidden="true">🌸</span>
              <span>Explore</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={mode === 'find_letter'}
              className={`pvg-mode-btn ${mode === 'find_letter' ? 'is-active' : ''}`}
              onClick={() => {
                setMode('find_letter');
                soundEffects.playStrokeChime();
              }}
            >
              <span aria-hidden="true">🎯</span>
              <span>Find</span>
            </button>

            {/* “Sound and Picture” Mode Tab */}
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'sound_picture'}
              className={`pvg-mode-btn ${mode === 'sound_picture' ? 'is-active' : ''}`}
              onClick={() => {
                setMode('sound_picture');
                soundEffects.playStrokeChime();
              }}
            >
              <span aria-hidden="true">🔊🖼️</span>
              <span>Sound &amp; Picture</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={mode === 'train'}
              className={`pvg-mode-btn ${mode === 'train' ? 'is-active' : ''}`}
              onClick={() => {
                setMode('train');
                soundEffects.playStrokeChime();
              }}
            >
              <span aria-hidden="true">🚂</span>
              <span>Train</span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          MINIMAL, LARGE GROUP FILTER CHIPS
          ------------------------------------------------------------------ */}
      <div className="pvg-group-filters" role="region" aria-label="Groups">
        {FILTER_GROUPS.map((group) => {
          const isActive = activeFilter === group.id;
          return (
            <button
              key={group.id}
              type="button"
              className={`pvg-group-chip ${isActive ? 'is-active' : ''}`}
              onClick={() => {
                setActiveFilter(group.id);
                soundEffects.playStrokeChime();
              }}
            >
              <span aria-hidden="true">{group.icon}</span>
              <span>{group.labelSa}</span>
            </button>
          );
        })}
      </div>

      {/* ==================================================================
          MODE 1: TOUCH & EXPLORE (अक्षर-वाटिका)
          ================================================================== */}
      {mode === 'explore' && (
        <>
          {/* Spotlight Hero Banner with Huge Touch Targets & Minimal Text */}
          <div className="pvg-spotlight-card">
            <div className="pvg-spotlight-left">
              {/* Giant Akshara Tile */}
              <button
                type="button"
                className="pvg-spotlight-akshara-badge"
                onClick={() => {
                  soundEffects.playStrokeChime();
                  playPronunciation(activeMnemonic.letter);
                }}
                aria-label={`Letter ${activeMnemonic.letter}. Tap to hear.`}
              >
                {activeMnemonic.letter}
              </button>

              {/* Giant Mnemonic Emoji Box */}
              <button
                type="button"
                className="pvg-spotlight-emoji-box"
                onClick={() => {
                  soundEffects.playBubblePop();
                  playPronunciation(activeMnemonic.wordSan);
                }}
                aria-label={`${activeMnemonic.wordSan}. Tap to hear.`}
              >
                {activeMnemonic.emoji}
              </button>

              <div className="pvg-spotlight-meta">
                <h4 className="pvg-spotlight-word-sa">
                  {activeMnemonic.wordSan}
                </h4>
                <p className="pvg-spotlight-word-en">
                  {activeMnemonic.emoji} {activeMnemonic.wordEn}
                </p>
              </div>
            </div>

            <div className="pvg-spotlight-actions">
              {/* Big Replay Button */}
              <button
                type="button"
                className="pvg-big-replay-btn"
                onClick={replaySpotlightAudio}
                aria-label="Replay sound"
              >
                <span className="pvg-speaker-pulse" aria-hidden="true">🔊</span>
                <span>Listen Again</span>
              </button>

              {/* Large Round Steppers */}
              <div className="pvg-nav-steppers">
                <button
                  type="button"
                  className="pvg-nav-btn"
                  onClick={() => handleStepLetter(-1)}
                  aria-label="Previous letter"
                >
                  ◀
                </button>
                <button
                  type="button"
                  className="pvg-nav-btn"
                  onClick={() => handleStepLetter(1)}
                  aria-label="Next letter"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>

          {/* Grid of Big Letter Cards */}
          <div className="pvg-cards-grid" role="grid" aria-label="Alphabet Cards">
            {filteredMnemonics.map((mnemonic) => {
              const isSelected = mnemonic.letter === activeMnemonic.letter;
              const isExplored = exploredLetters.has(mnemonic.letter);

              return (
                <div
                  key={mnemonic.letter}
                  role="button"
                  tabIndex={0}
                  className={`pvg-card ${isSelected ? 'is-active' : ''}`}
                  onClick={() => handleSelectLetter(mnemonic)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectLetter(mnemonic);
                    }
                  }}
                  aria-label={`Letter ${mnemonic.letter}, ${mnemonic.wordSan}`}
                >
                  {isExplored && (
                    <span className="pvg-card-star-tag" aria-label="Explored">
                      ⭐
                    </span>
                  )}
                  <span className="pvg-card-letter">{mnemonic.letter}</span>
                  <span className="pvg-card-emoji" aria-hidden="true">{mnemonic.emoji}</span>
                  <p className="pvg-card-word-sa">{mnemonic.wordSan}</p>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ==================================================================
          MODE 2: FIND-THE-LETTER CHALLENGE (अक्षर-खोज)
          ================================================================== */}
      {mode === 'find_letter' && (
        <div className="pvg-quiz-arena">
          {/* Confetti / Star burst when correct */}
          {findCorrectOption && (
            <div className="pvg-burst-overlay" aria-hidden="true">
              <span className="pvg-burst-star">⭐</span>
              <span className="pvg-burst-star" style={{ animationDelay: '0.15s' }}>🌟</span>
              <span className="pvg-burst-star" style={{ animationDelay: '0.3s' }}>✨</span>
            </div>
          )}

          {/* Minimal Prompt Header */}
          <div className="pvg-quiz-prompt">
            <h4 className="pvg-quiz-heading">Find the Letter:</h4>
            <div className="pvg-target-highlight">
              <span>{findTarget.letter}</span>
              <span style={{ fontSize: '1.8rem' }} aria-hidden="true">{findTarget.emoji}</span>
            </div>

            {/* VERY LARGE AUDIO REPLAY BUTTON */}
            <button
              type="button"
              className="pvg-big-replay-btn"
              onClick={replayFindAudio}
              aria-label="Replay sound instructions"
            >
              <span className="pvg-speaker-pulse" aria-hidden="true">🔊</span>
              <span>Listen Again · पुनः शृणोतु</span>
            </button>
          </div>

          {/* VERY LARGE TOUCH CHOICE CARDS (Min 145px x 170px) */}
          <div className="pvg-quiz-options-grid" role="group" aria-label="Letter choices">
            {findOptions.map((opt) => {
              const isCorrect = findCorrectOption === opt.letter;
              const isWrong = findWrongOptions.has(opt.letter);

              return (
                <button
                  key={opt.letter}
                  type="button"
                  className={`pvg-quiz-option-card ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                  onClick={() => handlePickFindOption(opt)}
                  aria-label={`Letter ${opt.letter}`}
                >
                  {/* Visual Status Badges */}
                  {isCorrect && (
                    <span className="pvg-feedback-badge pvg-feedback-badge--correct" aria-hidden="true">
                      ✅
                    </span>
                  )}
                  {isWrong && (
                    <span className="pvg-feedback-badge pvg-feedback-badge--wrong" aria-hidden="true">
                      ❌
                    </span>
                  )}

                  <span className="pvg-quiz-option-akshara">{opt.letter}</span>
                  <span className="pvg-quiz-option-emoji">{opt.emoji}</span>
                </button>
              );
            })}
          </div>

          {/* Minimal Visual Feedback Banners */}
          {findCorrectOption && (
            <div className="pvg-quiz-feedback is-win" role="status">
              <span>🎉 उत्तमम्! Correct! (+1 ⭐)</span>
            </div>
          )}

          {findWrongOptions.size > 0 && !findCorrectOption && (
            <div className="pvg-quiz-feedback is-retry" role="status">
              <span>👂 Listen again &amp; try another card! 🎧</span>
            </div>
          )}

          <button
            type="button"
            className="pvg-skip-btn"
            onClick={generateFindQuestion}
          >
            <span>⏭️ Next Letter</span>
          </button>
        </div>
      )}

      {/* ==================================================================
          MODE 3: “SOUND AND PICTURE” MATCH (ध्वनि-चित्र-मेलनम्)
          Match an animal or object to its initial Sanskrit sound!
          ================================================================== */}
      {mode === 'sound_picture' && (
        <div className="pvg-picmatch-arena">
          {/* Confetti / Star burst when correct */}
          {picCorrectOption && (
            <div className="pvg-burst-overlay" aria-hidden="true">
              <span className="pvg-burst-star">⭐</span>
              <span className="pvg-burst-star" style={{ animationDelay: '0.15s' }}>🌟</span>
              <span className="pvg-burst-star" style={{ animationDelay: '0.3s' }}>✨</span>
            </div>
          )}

          {/* Dual Direction Mode Toggle */}
          <div className="pvg-submode-bar" role="tablist" aria-label="Sound and Picture Direction">
            <button
              type="button"
              role="tab"
              aria-selected={soundPicDirection === 'pic_to_sound'}
              className={`pvg-submode-btn ${soundPicDirection === 'pic_to_sound' ? 'is-active' : ''}`}
              onClick={() => {
                setSoundPicDirection('pic_to_sound');
                soundEffects.playStrokeChime();
                generateSoundPicQuestion('pic_to_sound');
              }}
            >
              <span aria-hidden="true">🖼️ ➔ 🔤</span>
              <span>Picture to Initial Sound</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={soundPicDirection === 'sound_to_pic'}
              className={`pvg-submode-btn ${soundPicDirection === 'sound_to_pic' ? 'is-active' : ''}`}
              onClick={() => {
                setSoundPicDirection('sound_to_pic');
                soundEffects.playStrokeChime();
                generateSoundPicQuestion('sound_to_pic');
              }}
            >
              <span aria-hidden="true">🔤 ➔ 🖼️</span>
              <span>Sound to Picture</span>
            </button>
          </div>

          {/* DIRECTION 1: PICTURE TO INITIAL SOUND */}
          {soundPicDirection === 'pic_to_sound' && (
            <>
              {/* Huge Picture Hero */}
              <div className="pvg-picmatch-hero-emoji" aria-hidden="true">
                {picTarget.emoji}
              </div>

              {/* Minimal Prompt & Big Replay Button */}
              <div className="pvg-quiz-prompt">
                <h4 className="pvg-quiz-heading">
                  Initial Sanskrit Sound for {picTarget.wordSan} ({picTarget.wordEn})?
                </h4>

                <button
                  type="button"
                  className="pvg-big-replay-btn pvg-big-replay-btn--pic"
                  onClick={replaySoundPicAudio}
                  aria-label={`Listen to ${picTarget.wordSan}`}
                >
                  <span className="pvg-speaker-pulse" aria-hidden="true">🔊</span>
                  <span>Listen: {picTarget.wordSan} · पुनः शृणोतु</span>
                </button>
              </div>

              {/* VERY LARGE LETTER CHOICE CARDS */}
              <div className="pvg-quiz-options-grid" role="group" aria-label="Initial sound choices">
                {picOptions.map((opt) => {
                  const isCorrect = picCorrectOption === opt.letter;
                  const isWrong = picWrongOptions.has(opt.letter);

                  return (
                    <button
                      key={opt.letter}
                      type="button"
                      className={`pvg-quiz-option-card ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                      onClick={() => handlePickSoundPicOption(opt)}
                      aria-label={`Initial sound ${opt.letter}`}
                    >
                      {isCorrect && (
                        <span className="pvg-feedback-badge pvg-feedback-badge--correct" aria-hidden="true">
                          ✅
                        </span>
                      )}
                      {isWrong && (
                        <span className="pvg-feedback-badge pvg-feedback-badge--wrong" aria-hidden="true">
                          ❌
                        </span>
                      )}

                      <span className="pvg-quiz-option-akshara">{opt.letter}</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#64748b' }}>
                        {opt.iast}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* DIRECTION 2: SOUND TO PICTURE */}
          {soundPicDirection === 'sound_to_pic' && (
            <>
              {/* Huge Target Sound Tile */}
              <div className="pvg-target-sound-card">
                <div className="pvg-target-sound-badge" aria-label={`Target sound ${picTarget.letter}`}>
                  {picTarget.letter}
                </div>
              </div>

              {/* Minimal Prompt & Big Replay Button */}
              <div className="pvg-quiz-prompt">
                <h4 className="pvg-quiz-heading">
                  Who starts with the sound &quot;{picTarget.letter}&quot;?
                </h4>

                <button
                  type="button"
                  className="pvg-big-replay-btn"
                  onClick={replaySoundPicAudio}
                  aria-label={`Listen to sound ${picTarget.letter}`}
                >
                  <span className="pvg-speaker-pulse" aria-hidden="true">🔊</span>
                  <span>Listen Sound: &quot;{picTarget.letter}&quot; · पुनः शृणोतु</span>
                </button>
              </div>

              {/* VERY LARGE ANIMAL / OBJECT PICTURE CARDS */}
              <div className="pvg-quiz-options-grid" role="group" aria-label="Animal or object choices">
                {picOptions.map((opt) => {
                  const isCorrect = picCorrectOption === opt.letter;
                  const isWrong = picWrongOptions.has(opt.letter);

                  return (
                    <button
                      key={opt.letter}
                      type="button"
                      className={`pvg-quiz-option-card pvg-quiz-option-card--picture ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                      onClick={() => handlePickSoundPicOption(opt)}
                      aria-label={`${opt.wordSan} (${opt.wordEn})`}
                    >
                      {isCorrect && (
                        <span className="pvg-feedback-badge pvg-feedback-badge--correct" aria-hidden="true">
                          ✅
                        </span>
                      )}
                      {isWrong && (
                        <span className="pvg-feedback-badge pvg-feedback-badge--wrong" aria-hidden="true">
                          ❌
                        </span>
                      )}

                      <span className="pvg-quiz-pic-emoji" aria-hidden="true">{opt.emoji}</span>
                      <p className="pvg-quiz-pic-sa">{opt.wordSan}</p>
                      <p className="pvg-quiz-pic-en">{opt.wordEn}</p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Minimal Visual Feedback Banners */}
          {picCorrectOption && (
            <div className="pvg-quiz-feedback is-win" role="status">
              <span>🎉 उत्तमम्! Correct! {picTarget.letter} starts {picTarget.emoji} {picTarget.wordSan}! (+1 ⭐)</span>
            </div>
          )}

          {picWrongOptions.size > 0 && !picCorrectOption && (
            <div className="pvg-quiz-feedback is-retry" role="status">
              <span>👂 Listen closely &amp; try another card! 🎧</span>
            </div>
          )}

          <button
            type="button"
            className="pvg-skip-btn"
            onClick={() => generateSoundPicQuestion()}
          >
            <span>⏭️ Next Challenge</span>
          </button>
        </div>
      )}

      {/* ==================================================================
          MODE 4: SING-ALONG ALPHABET TRAIN (अक्षर-रेलगाड़ी)
          ================================================================== */}
      {mode === 'train' && (
        <div className="pvg-train-arena">
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: '#0369a1' }}>
              🚂 अक्षर-रेलगाड़ी · Sing-Along Train
            </h4>
          </div>

          {/* Train track with Engine and Carriages */}
          <div className="pvg-train-track" role="region" aria-label="Alphabet Train Track">
            {/* Engine */}
            <div className="pvg-train-engine">
              <span style={{ fontSize: '3rem' }} aria-hidden="true">🚂</span>
              <span style={{ fontWeight: 900, fontSize: '1rem' }}>BODHI</span>
            </div>

            {/* Letter Carriages (110px x 130px) */}
            {filteredMnemonics.map((item, idx) => {
              const isCurrent = (trainIndex % filteredMnemonics.length) === idx;

              return (
                <div
                  key={item.letter}
                  ref={(el) => {
                    carriageRefs.current[idx] = el;
                  }}
                  role="button"
                  tabIndex={0}
                  className={`pvg-train-carriage ${isCurrent ? 'is-current' : ''}`}
                  onClick={() => {
                    setTrainIndex(idx);
                    soundEffects.playStrokeChime();
                    playPronunciation(item.letter);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setTrainIndex(idx);
                      playPronunciation(item.letter);
                    }
                  }}
                  aria-label={`Carriage ${item.letter}, ${item.wordSan}`}
                >
                  <span className="pvg-train-carriage-letter">{item.letter}</span>
                  <span className="pvg-train-carriage-emoji" aria-hidden="true">{item.emoji}</span>
                  <span className="pvg-train-carriage-word">{item.wordSan}</span>
                </div>
              );
            })}
          </div>

          {/* Large Train controls */}
          <div className="pvg-train-controls">
            <button
              type="button"
              className="pvg-nav-btn"
              onClick={() => {
                setTrainIndex((prev) => {
                  const len = filteredMnemonics.length || 1;
                  return (prev - 1 + len) % len;
                });
              }}
              aria-label="Previous carriage"
            >
              ◀
            </button>

            <button
              type="button"
              className={`pvg-train-btn ${isPlayingTrain ? 'is-active' : ''}`}
              onClick={() => {
                setIsPlayingTrain((prev) => !prev);
                soundEffects.playStrokeChime();
              }}
            >
              <span aria-hidden="true">{isPlayingTrain ? '⏸️' : '▶️'}</span>
              <span>{isPlayingTrain ? 'Pause Train' : 'Start Sing-Along'}</span>
            </button>

            <button
              type="button"
              className="pvg-nav-btn"
              onClick={() => {
                setTrainIndex((prev) => {
                  const len = filteredMnemonics.length || 1;
                  return (prev + 1) % len;
                });
              }}
              aria-label="Next carriage"
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreschoolVarnamalaGame;
