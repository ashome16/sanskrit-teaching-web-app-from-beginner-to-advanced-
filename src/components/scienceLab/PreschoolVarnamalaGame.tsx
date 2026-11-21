import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VARNAMALA_MNEMONICS, type LetterMnemonic } from '../../data/varnamalaMnemonics';
import { playPronunciation, playSequence } from '../../utils/pronunciation';
import { soundEffects } from '../../utils/soundEffects';
import { trainSoundEngine } from '../../utils/trainSoundEngine';
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
  const [trainSpeedMs, setTrainSpeedMs] = useState<number>(2000);
  const [trainSoundOn, setTrainSoundOn] = useState<boolean>(true);
  const [isWhistleBurst, setIsWhistleBurst] = useState<boolean>(false);

  const triggerWhistle = () => {
    if (trainSoundOn) {
      trainSoundEngine.playWhistle();
    }
    setIsWhistleBurst(true);
    window.setTimeout(() => setIsWhistleBurst(false), 900);
  };
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

  // Train Sing-Along Interval Engine with synchronized chug-chug + rail click-clack audio
  useEffect(() => {
    if (!isPlayingTrain || mode !== 'train') return;

    const list = filteredMnemonics.length > 0 ? filteredMnemonics : ALL_MNEMONICS;
    const currentItem = list[trainIndex % list.length];
    if (currentItem) {
      if (trainSoundOn) {
        trainSoundEngine.playChugBeat();
      }
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
          if (trainSoundOn) {
            trainSoundEngine.playChugBeat();
          }
          playPronunciation(item.letter);
          const elem = carriageRefs.current[next];
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        }
        return next;
      });
    }, trainSpeedMs);

    return () => clearInterval(timer);
  }, [isPlayingTrain, mode, filteredMnemonics, trainIndex, trainSpeedMs, trainSoundOn]);

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
          MODE 4: SING-ALONG ALPHABET TRAIN (अक्षर-रेलगाड़ी · AKSHARA EXPRESS)
          ================================================================== */}
      {mode === 'train' && (() => {
        const trainList = filteredMnemonics.length > 0 ? filteredMnemonics : ALL_MNEMONICS;
        const activeIdx = trainIndex % trainList.length;
        const activeItem = trainList[activeIdx] || trainList[0];
        const coachThemes = ['crimson', 'saffron', 'teal', 'indigo', 'emerald'] as const;

        return (
          <div className={`pvg-train-arena pvg-express-arena ${isPlayingTrain ? 'is-running' : ''}`}>
            {/* Scenic Sky + Station Signboard Header */}
            <div className="pvg-express-sky">
              <div className="pvg-express-clouds" aria-hidden="true">
                <span className="pvg-cloud pvg-cloud-1" />
                <span className="pvg-cloud pvg-cloud-2" />
                <span className="pvg-cloud pvg-cloud-3" />
              </div>

              <div className="pvg-station-header">
                <div className="pvg-station-title-block">
                  <span className="pvg-station-kicker">SANSKRIT AKṢARA EXPRESS</span>
                  <h4 className="pvg-station-heading">
                    <span lang="sa">अक्षर-रेलगाड़ी</span> &middot; Syllable Train
                  </h4>
                </div>

                {/* Live Active Station Signboard */}
                {activeItem && (
                  <div className="pvg-station-board" aria-live="polite">
                    <span className="pvg-board-coach-no">COACH {String(activeIdx + 1).padStart(2, '0')}</span>
                    <span className="pvg-board-letter" lang="sa">{activeItem.letter}</span>
                    <div className="pvg-board-meta">
                      <strong lang="sa">{activeItem.wordSan}</strong>
                      <span>{activeItem.wordEn}</span>
                    </div>
                    <button
                      type="button"
                      className="pvg-board-speak-btn"
                      onClick={() => {
                        if (trainSoundOn) trainSoundEngine.playChugBeat();
                        playPronunciation(activeItem.letter);
                      }}
                      title="Hear this syllable again"
                    >
                      Speak
                    </button>
                  </div>
                )}
              </div>

              {/* Distant Scenic Rolling Hills */}
              <svg className="pvg-express-hills" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 90 Q180 22 360 66 T740 44 T1200 60 L1200 90 Z" fill="rgba(16, 185, 129, 0.22)" />
                <path d="M0 90 Q240 42 520 74 T980 38 T1200 72 L1200 90 Z" fill="rgba(5, 150, 105, 0.3)" />
              </svg>
            </div>

            {/* Scrollable Railway Corridor with Locomotive, Couplers, Compartments & Steel Track */}
            <div className="pvg-express-corridor">
              <div className="pvg-train-track pvg-express-track" role="region" aria-label="Sanskrit Syllable Train Track">
                {/* Authentic SVG Steam Locomotive Engine (Click to Blow Whistle!) */}
                <button
                  type="button"
                  className={`pvg-locomotive ${isPlayingTrain ? 'is-running' : ''} ${isWhistleBurst ? 'is-whistling' : ''}`}
                  onClick={triggerWhistle}
                  title="Tap the Bodhi Express Locomotive to blow the steam whistle!"
                  aria-label="Bodhi Express Steam Locomotive. Click to blow whistle."
                >
                  {/* Animated Rising Steam Puffs from Chimney */}
                  <span className="pvg-steam-stack" aria-hidden="true">
                    <span className="pvg-steam-puff pvg-puff-1" />
                    <span className="pvg-steam-puff pvg-puff-2" />
                    <span className="pvg-steam-puff pvg-puff-3" />
                    <span className="pvg-steam-puff pvg-puff-4" />
                  </span>

                  {/* Detailed Vector Steam Locomotive */}
                  <svg className="pvg-loco-svg" viewBox="0 0 210 142" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    {/* Headlight Beam when running */}
                    <polygon points="18,62 0,44 0,88" fill="rgba(254, 240, 138, 0.45)" className="pvg-headlight-beam" />
                    {/* Front Cowcatcher Bumper */}
                    <polygon points="18,108 4,124 28,124 28,108" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
                    {/* Chimney Funnel */}
                    <path d="M36,52 L30,22 L52,22 L46,52 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.8" />
                    <rect x="27" y="18" width="28" height="6" rx="2" fill="#f59e0b" />
                    {/* Steam Dome */}
                    <path d="M74,52 Q84,34 94,52 Z" fill="#d97706" stroke="#fef3c7" strokeWidth="1.4" />
                    {/* Boiler Body */}
                    <rect x="24" y="52" width="106" height="54" rx="8" fill="#0f766e" stroke="#f59e0b" strokeWidth="2.2" />
                    {/* Brass Boiler Bands */}
                    <line x1="56" y1="52" x2="56" y2="106" stroke="#fbbf24" strokeWidth="3" />
                    <line x1="94" y1="52" x2="94" y2="106" stroke="#fbbf24" strokeWidth="3" />
                    {/* Headlight Lamp */}
                    <circle cx="22" cy="64" r="6" fill="#fef08a" stroke="#f59e0b" strokeWidth="2" />
                    {/* Driver Cabin */}
                    <rect x="126" y="26" width="72" height="80" rx="6" fill="#991b1b" stroke="#f59e0b" strokeWidth="2.2" />
                    {/* Curved Cabin Roof */}
                    <path d="M120,28 Q162,14 204,28 L200,34 L124,34 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    {/* Arched Cabin Window */}
                    <rect x="138" y="42" width="46" height="30" rx="6" fill="#fef3c7" stroke="#fbbf24" strokeWidth="2" />
                    {/* Nameplate on Boiler */}
                    <rect x="34" y="70" width="84" height="20" rx="4" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.2" />
                    <text x="76" y="84" fill="#fef08a" fontSize="9.5" fontWeight="900" textAnchor="middle" letterSpacing="1">BODHI EXP</text>
                    {/* Chassis Frame */}
                    <rect x="20" y="102" width="182" height="12" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />

                    {/* 3 Rotating Spoked Locomotive Wheels */}
                    {[48, 102, 162].map((cx, wIdx) => (
                      <g key={cx} className="pvg-wheel-group" style={{ transformOrigin: `${cx}px 120px` }}>
                        <circle cx={cx} cy="120" r={wIdx === 2 ? 17 : 15} fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
                        <circle cx={cx} cy="120" r="4.5" fill="#fbbf24" />
                        <line x1={cx - 12} y1="120" x2={cx + 12} y2="120" stroke="#94a3b8" strokeWidth="1.8" />
                        <line x1={cx} y1="108" x2={cx} y2="132" stroke="#94a3b8" strokeWidth="1.8" />
                      </g>
                    ))}
                    {/* Reciprocating Piston Connecting Rod */}
                    <line x1="48" y1="120" x2="162" y2="120" stroke="#e2e8f0" strokeWidth="3.2" strokeLinecap="round" className="pvg-piston-rod" />
                  </svg>
                  <span className="pvg-loco-hint">Tap to Whistle</span>
                </button>

                {/* Linked Syllable Compartments (Each Syllable = Authentic Railway Coach) */}
                {trainList.map((item, idx) => {
                  const isCurrent = activeIdx === idx;
                  const theme = coachThemes[idx % coachThemes.length];

                  return (
                    <React.Fragment key={item.letter}>
                      {/* Metallic Iron Coupler Linking Adjacent Compartments */}
                      <div className="pvg-coupler" aria-hidden="true">
                        <span className="pvg-coupler-bar" />
                        <span className="pvg-coupler-pin" />
                      </div>

                      {/* Authentic Railway Compartment Coach */}
                      <div
                        ref={(el) => {
                          carriageRefs.current[idx] = el;
                        }}
                        role="button"
                        tabIndex={0}
                        className={`pvg-coach pvg-coach--${theme} ${isCurrent ? 'is-current' : ''}`}
                        onClick={() => {
                          setTrainIndex(idx);
                          if (trainSoundOn) trainSoundEngine.playChugBeat();
                          playPronunciation(item.letter);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setTrainIndex(idx);
                            if (trainSoundOn) trainSoundEngine.playChugBeat();
                            playPronunciation(item.letter);
                          }
                        }}
                        aria-label={`Compartment ${idx + 1}: ${item.letter}, ${item.wordSan}`}
                      >
                        {/* Curved Heritage Coach Roof & Number Plate */}
                        <div className="pvg-coach-roof">
                          <span className="pvg-coach-vent" aria-hidden="true" />
                          <span className="pvg-coach-num">{String(idx + 1).padStart(2, '0')}</span>
                          <span className="pvg-coach-vent" aria-hidden="true" />
                        </div>

                        {/* Painted Coach Body with Dual Arched Compartment Windows */}
                        <div className="pvg-coach-body">
                          <div className="pvg-coach-windows">
                            <div className="pvg-window pvg-window--letter">
                              <span className="pvg-coach-letter" lang="sa">{item.letter}</span>
                            </div>
                            <div className="pvg-window pvg-window--word">
                              <span className="pvg-coach-word-sa" lang="sa">{item.wordSan}</span>
                              <span className="pvg-coach-word-en">{item.wordEn}</span>
                            </div>
                          </div>
                          <div className="pvg-coach-stripe" aria-hidden="true" />
                        </div>

                        {/* Underframe Chassis & Dual Rotating Spoked Bogie Wheels */}
                        <div className="pvg-coach-chassis" aria-hidden="true">
                          <svg className="pvg-bogie-svg" viewBox="0 0 156 34" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="2" width="148" height="8" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />
                            {[34, 122].map((cx) => (
                              <g key={cx} className="pvg-wheel-group" style={{ transformOrigin: `${cx}px 18px` }}>
                                <circle cx={cx} cy="18" r="13" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.8" />
                                <circle cx={cx} cy="18" r="3.8" fill="#fbbf24" />
                                <line x1={cx - 10} y1="18" x2={cx + 10} y2="18" stroke="#94a3b8" strokeWidth="1.6" />
                                <line x1={cx} y1="8" x2={cx} y2="28" stroke="#94a3b8" strokeWidth="1.6" />
                              </g>
                            ))}
                          </svg>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Continuous Steel Railway Track & Wooden Sleepers */}
              <div className="pvg-steel-rails" aria-hidden="true">
                <div className="pvg-rail-beam" />
                <div className="pvg-rail-sleepers" />
              </div>
            </div>

            {/* Train Driver Control Deck */}
            <div className="pvg-driver-deck">
              <div className="pvg-train-controls">
                <button
                  type="button"
                  className="pvg-nav-btn"
                  onClick={() => {
                    if (trainSoundOn) trainSoundEngine.playChugBeat();
                    setTrainIndex((prev) => {
                      const len = trainList.length || 1;
                      const next = (prev - 1 + len) % len;
                      playPronunciation(trainList[next].letter);
                      carriageRefs.current[next]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                      return next;
                    });
                  }}
                  aria-label="Previous compartment"
                >
                  &larr; Prev
                </button>

                <button
                  type="button"
                  className={`pvg-train-btn pvg-express-play-btn ${isPlayingTrain ? 'is-active' : ''}`}
                  onClick={() => {
                    setIsPlayingTrain((prev) => {
                      const starting = !prev;
                      if (starting) {
                        triggerWhistle();
                      } else if (trainSoundOn) {
                        trainSoundEngine.playBrakeHiss();
                      }
                      return starting;
                    });
                  }}
                >
                  <span>{isPlayingTrain ? 'Pause Train' : 'Start Akṣara Express'}</span>
                </button>

                <button
                  type="button"
                  className="pvg-whistle-btn"
                  onClick={triggerWhistle}
                  title="Blow the steam whistle"
                >
                  Blow Whistle
                </button>

                <button
                  type="button"
                  className="pvg-nav-btn"
                  onClick={() => {
                    if (trainSoundOn) trainSoundEngine.playChugBeat();
                    setTrainIndex((prev) => {
                      const len = trainList.length || 1;
                      const next = (prev + 1) % len;
                      playPronunciation(trainList[next].letter);
                      carriageRefs.current[next]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                      return next;
                    });
                  }}
                  aria-label="Next compartment"
                >
                  Next &rarr;
                </button>
              </div>

              {/* Speed & Train Sound Options */}
              <div className="pvg-driver-subcontrols">
                <div className="pvg-speed-group" role="group" aria-label="Train speed">
                  <span className="pvg-deck-label">Speed:</span>
                  {[
                    { label: 'Slow', ms: 2500 },
                    { label: 'Normal', ms: 1900 },
                    { label: 'Fast', ms: 1300 },
                  ].map((sp) => (
                    <button
                      key={sp.label}
                      type="button"
                      className={`pvg-speed-pill ${trainSpeedMs === sp.ms ? 'is-active' : ''}`}
                      onClick={() => setTrainSpeedMs(sp.ms)}
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className={`pvg-sfx-toggle ${trainSoundOn ? 'is-on' : ''}`}
                  onClick={() => setTrainSoundOn((prev) => !prev)}
                  aria-pressed={trainSoundOn}
                >
                  Train Sounds: {trainSoundOn ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default PreschoolVarnamalaGame;
