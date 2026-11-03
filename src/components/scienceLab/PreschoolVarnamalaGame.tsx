import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VARNAMALA_MNEMONICS, type LetterMnemonic } from '../../data/varnamalaMnemonics';
import { playPronunciation, playSequence } from '../../utils/pronunciation';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/preschool-varnamala.css';

export interface PreschoolVarnamalaGameProps {
  onEarnStar?: () => void;
  className?: string;
}

type GameMode = 'explore' | 'find_letter' | 'picture_match' | 'train';

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

// Group definitions
const FILTER_GROUPS: { id: FilterGroup; labelSa: string; labelEn: string; icon: string; letters: string[] }[] = [
  {
    id: 'all',
    labelSa: 'सर्वे वर्णाः',
    labelEn: 'All Letters',
    icon: '🌟',
    letters: ALL_MNEMONICS.map((m) => m.letter),
  },
  {
    id: 'svara',
    labelSa: 'स्वराः',
    labelEn: 'Sweet Vowels',
    icon: '🍬',
    letters: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः', 'अँ'],
  },
  {
    id: 'kavarga',
    labelSa: 'क-वर्गः',
    labelEn: 'Ka Family (Throat)',
    icon: '🪷',
    letters: ['क', 'ख', 'ग', 'घ', 'ङ'],
  },
  {
    id: 'cavarga',
    labelSa: 'च-वर्गः',
    labelEn: 'Cha Family (Palate)',
    icon: '🥄',
    letters: ['च', 'छ', 'ज', 'झ', 'ञ'],
  },
  {
    id: 'tavarga_retro',
    labelSa: 'ट-वर्गः',
    labelEn: 'Ta Family (Tongue-Tap)',
    icon: '🔔',
    letters: ['ट', 'ठ', 'ड', 'ढ', 'ण'],
  },
  {
    id: 'tavarga_dental',
    labelSa: 'त-वर्गः',
    labelEn: 'Ta Family (Teeth)',
    icon: '⭐',
    letters: ['त', 'थ', 'द', 'ध', 'न'],
  },
  {
    id: 'pavarga',
    labelSa: 'प-वर्गः',
    labelEn: 'Pa Family (Lips)',
    icon: '🪁',
    letters: ['प', 'फ', 'ब', 'भ', 'म'],
  },
  {
    id: 'whispers',
    labelSa: 'अन्तःस्थाः ऊष्माणः',
    labelEn: 'Flow & Whispers',
    icon: '💨',
    letters: ['य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],
  },
  {
    id: 'samyukta',
    labelSa: 'संयुक्ताक्षराणि',
    labelEn: 'Super Stars',
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
  const [findStatus, setFindStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [findSelectedOption, setFindSelectedOption] = useState<string | null>(null);

  // Picture Match State
  const [picTarget, setPicTarget] = useState<LetterMnemonic>(VARNAMALA_MNEMONICS['आ']);
  const [picOptions, setPicOptions] = useState<LetterMnemonic[]>([]);
  const [picStatus, setPicStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [picSelectedOption, setPicSelectedOption] = useState<string | null>(null);

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

  // Speak both letter and mnemonic word
  const speakLetterAndWord = (mnemonic: LetterMnemonic) => {
    playSequence([mnemonic.letter, mnemonic.wordSan], { gapMs: 500 });
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

    // Pick 2 or 3 distinct distractors from ALL_MNEMONICS
    const distractors: LetterMnemonic[] = [];
    const distractorPool = shuffleArray(ALL_MNEMONICS.filter((m) => m.letter !== target.letter));
    for (let i = 0; i < 2 && i < distractorPool.length; i++) {
      distractors.push(distractorPool[i]);
    }

    const options = shuffleArray([target, ...distractors]);
    setFindTarget(target);
    setFindOptions(options);
    setFindStatus('idle');
    setFindSelectedOption(null);

    // Speak prompt letter
    setTimeout(() => {
      playPronunciation(target.letter);
    }, 200);
  };

  const handlePickFindOption = (option: LetterMnemonic) => {
    if (findStatus === 'correct') return;
    setFindSelectedOption(option.letter);

    if (option.letter === findTarget.letter) {
      setFindStatus('correct');
      setStarsCollected((prev) => prev + 1);
      try {
        soundEffects.playCelebrationChime();
      } catch {
        // safe fallback
      }
      playSequence([option.letter, option.wordSan], { gapMs: 400 });
      if (onEarnStar) onEarnStar();

      // Auto advance to next question after 1.5s
      setTimeout(() => {
        generateFindQuestion();
      }, 1500);
    } else {
      setFindStatus('wrong');
      try {
        soundEffects.playBubblePop();
      } catch {
        // safe fallback
      }
      playPronunciation(option.letter);
      // Reset back to idle so child can try again
      setTimeout(() => {
        setFindStatus('idle');
        setFindSelectedOption(null);
      }, 900);
    }
  };

  // ==========================================
  // Picture Match Game Generator
  // ==========================================
  const generatePicQuestion = () => {
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
    setPicStatus('idle');
    setPicSelectedOption(null);

    // Speak word
    setTimeout(() => {
      playPronunciation(target.wordSan);
    }, 200);
  };

  const handlePickPicOption = (option: LetterMnemonic) => {
    if (picStatus === 'correct') return;
    setPicSelectedOption(option.letter);

    if (option.letter === picTarget.letter) {
      setPicStatus('correct');
      setStarsCollected((prev) => prev + 1);
      try {
        soundEffects.playCelebrationChime();
      } catch {
        // safe fallback
      }
      playSequence([option.letter, picTarget.wordSan], { gapMs: 400 });
      if (onEarnStar) onEarnStar();

      setTimeout(() => {
        generatePicQuestion();
      }, 1600);
    } else {
      setPicStatus('wrong');
      try {
        soundEffects.playBubblePop();
      } catch {
        // safe fallback
      }
      playPronunciation(option.letter);
      setTimeout(() => {
        setPicStatus('idle');
        setPicSelectedOption(null);
      }, 900);
    }
  };

  // Mode change side-effects
  useEffect(() => {
    if (mode === 'find_letter') {
      generateFindQuestion();
    } else if (mode === 'picture_match') {
      generatePicQuestion();
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
            <span className="pvg-kicker">Play 2 Learn · Early Literacy (Ages 3–6)</span>
            <h3 className="pvg-title">
              <span className="pvg-title-sa">वर्णमाला-वाटिका</span>
              <span>Letter Garden</span>
            </h3>
          </div>
        </div>

        <div className="pvg-top-actions">
          <div className="pvg-star-pill" title="Stars collected in this Varṇamālā session">
            <span aria-hidden="true">⭐</span>
            <span>{starsCollected} Stars Won</span>
          </div>

          <div className="pvg-mode-bar" role="tablist" aria-label="Varṇamālā Play Modes">
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
              <span>Explore Letters</span>
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
              <span>Find the Letter</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={mode === 'picture_match'}
              className={`pvg-mode-btn ${mode === 'picture_match' ? 'is-active' : ''}`}
              onClick={() => {
                setMode('picture_match');
                soundEffects.playStrokeChime();
              }}
            >
              <span aria-hidden="true">🥭</span>
              <span>Picture Match</span>
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
              <span>Alphabet Train</span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          FAMILY FILTER CHIPS (Swara, Ka-Family, etc.)
          ------------------------------------------------------------------ */}
      <div className="pvg-group-filters" role="region" aria-label="Letter Family Groups">
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
              <span style={{ opacity: 0.85, fontSize: '0.75rem' }}>({group.labelEn})</span>
            </button>
          );
        })}
      </div>

      {/* ==================================================================
          MODE 1: TOUCH & EXPLORE (अक्षर-वाटिका)
          ================================================================== */}
      {mode === 'explore' && (
        <>
          {/* Spotlight Hero Banner */}
          <div className="pvg-spotlight-card">
            <div className="pvg-spotlight-left">
              {/* Huge Akshara Tile */}
              <button
                type="button"
                className="pvg-spotlight-akshara-badge"
                onClick={() => {
                  soundEffects.playStrokeChime();
                  playPronunciation(activeMnemonic.letter);
                }}
                aria-label={`Letter ${activeMnemonic.letter}. Tap to hear sound.`}
                title="Tap to hear letter sound!"
              >
                {activeMnemonic.letter}
              </button>

              {/* Mnemonic Emoji Box */}
              <button
                type="button"
                className="pvg-spotlight-emoji-box"
                onClick={() => {
                  soundEffects.playBubblePop();
                  playPronunciation(activeMnemonic.wordSan);
                }}
                aria-label={`${activeMnemonic.wordSan} (${activeMnemonic.wordEn}). Tap to hear.`}
                title="Tap to hear word!"
              >
                {activeMnemonic.emoji}
              </button>

              <div className="pvg-spotlight-meta">
                <h4 className="pvg-spotlight-word-sa">
                  <span>{activeMnemonic.wordSan}</span>
                  <span className="pvg-spotlight-word-iast">({activeMnemonic.wordIast})</span>
                </h4>
                <p className="pvg-spotlight-word-en">
                  {activeMnemonic.emoji} {activeMnemonic.wordEn} · {activeMnemonic.wordHi}
                </p>
                <span className="pvg-spotlight-word-hi">
                  Family: <strong>{activeMnemonic.groupLabelSan}</strong> ({activeMnemonic.groupLabelEn})
                </span>
              </div>
            </div>

            <div className="pvg-spotlight-actions">
              <button
                type="button"
                className="pvg-speaker-btn pvg-speaker-btn--letter"
                onClick={() => playPronunciation(activeMnemonic.letter)}
              >
                <span aria-hidden="true">🔊</span>
                <span>Hear Letter &quot;{activeMnemonic.letter}&quot;</span>
              </button>

              <button
                type="button"
                className="pvg-speaker-btn"
                onClick={() => speakLetterAndWord(activeMnemonic)}
              >
                <span aria-hidden="true">🎵</span>
                <span>Say &quot;{activeMnemonic.letter}&quot; as in {activeMnemonic.wordSan}</span>
              </button>

              <div className="pvg-nav-steppers">
                <button
                  type="button"
                  className="pvg-step-btn"
                  onClick={() => handleStepLetter(-1)}
                  aria-label="Previous letter"
                >
                  ◀ Prev
                </button>
                <button
                  type="button"
                  className="pvg-step-btn"
                  onClick={() => handleStepLetter(1)}
                  aria-label="Next letter"
                >
                  Next ▶
                </button>
              </div>
            </div>
          </div>

          {/* Grid of Letter Cards */}
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
                  aria-label={`Letter ${mnemonic.letter}, ${mnemonic.wordSan} (${mnemonic.wordEn})`}
                >
                  {isExplored && (
                    <span className="pvg-card-star-tag" aria-label="Explored">
                      ⭐
                    </span>
                  )}
                  <span className="pvg-card-letter">{mnemonic.letter}</span>
                  <span className="pvg-card-emoji" aria-hidden="true">{mnemonic.emoji}</span>
                  <p className="pvg-card-word-sa">{mnemonic.wordSan}</p>
                  <p className="pvg-card-word-en">{mnemonic.wordEn}</p>
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
          <div className="pvg-quiz-prompt">
            <span style={{ fontSize: '2.5rem' }} aria-hidden="true">👂</span>
            <h4 className="pvg-quiz-heading">Can you find this letter?</h4>
            <div className="pvg-quiz-target-chip">
              <span className="pvg-quiz-target-akshara">{findTarget.letter}</span>
              <span className="pvg-quiz-target-word">
                as in {findTarget.emoji} {findTarget.wordSan} ({findTarget.wordEn})
              </span>
              <button
                type="button"
                className="pvg-step-btn"
                onClick={() => playPronunciation(findTarget.letter)}
                title="Hear target letter sound"
                aria-label="Replay sound"
              >
                🔊 Listen
              </button>
            </div>
          </div>

          <div className="pvg-quiz-options-grid" role="group" aria-label="Letter choices">
            {findOptions.map((opt) => {
              const isChosen = findSelectedOption === opt.letter;
              const isCorrect = isChosen && findStatus === 'correct';
              const isWrong = isChosen && findStatus === 'wrong';

              return (
                <button
                  key={opt.letter}
                  type="button"
                  className={`pvg-quiz-option-card ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                  onClick={() => handlePickFindOption(opt)}
                  aria-label={`Choose letter ${opt.letter}`}
                >
                  <span className="pvg-quiz-option-akshara">{opt.letter}</span>
                  <span className="pvg-quiz-option-emoji">{opt.emoji}</span>
                </button>
              );
            })}
          </div>

          {findStatus === 'correct' && (
            <div className="pvg-quiz-feedback is-win">
              🎉 अद्भुतम्! Brilliant! You found <strong>{findTarget.letter}</strong> for {findTarget.emoji} {findTarget.wordSan}! (+1 ⭐)
            </div>
          )}

          {findStatus === 'wrong' && (
            <div className="pvg-quiz-feedback is-retry">
              😊 Almost! Listen again and try another card! 👂
            </div>
          )}

          <button
            type="button"
            className="pvg-step-btn"
            style={{ marginTop: '0.5rem' }}
            onClick={generateFindQuestion}
          >
            ⏭️ Skip to Another Letter
          </button>
        </div>
      )}

      {/* ==================================================================
          MODE 3: PICTURE-TO-LETTER MATCH (चित्र-मेलनम्)
          ================================================================== */}
      {mode === 'picture_match' && (
        <div className="pvg-picmatch-arena">
          <div className="pvg-picmatch-hero-emoji" aria-hidden="true">
            {picTarget.emoji}
          </div>

          <div>
            <h4 className="pvg-picmatch-prompt-text">
              Which letter starts &quot;{picTarget.wordSan}&quot; ({picTarget.wordEn})?
            </h4>
            <div style={{ marginTop: '0.4rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                className="pvg-step-btn"
                onClick={() => playPronunciation(picTarget.wordSan)}
                title="Hear word"
              >
                🔊 Listen: {picTarget.wordSan}
              </button>
            </div>
          </div>

          <div className="pvg-quiz-options-grid" role="group" aria-label="Letter choices for picture">
            {picOptions.map((opt) => {
              const isChosen = picSelectedOption === opt.letter;
              const isCorrect = isChosen && picStatus === 'correct';
              const isWrong = isChosen && picStatus === 'wrong';

              return (
                <button
                  key={opt.letter}
                  type="button"
                  className={`pvg-quiz-option-card ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                  onClick={() => handlePickPicOption(opt)}
                  aria-label={`Choose letter ${opt.letter}`}
                >
                  <span className="pvg-quiz-option-akshara">{opt.letter}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b' }}>
                    {opt.iast}
                  </span>
                </button>
              );
            })}
          </div>

          {picStatus === 'correct' && (
            <div className="pvg-quiz-feedback is-win">
              🌟 साधु! Excellent! <strong>{picTarget.letter}</strong> starts {picTarget.emoji} {picTarget.wordSan}! (+1 ⭐)
            </div>
          )}

          {picStatus === 'wrong' && (
            <div className="pvg-quiz-feedback is-retry">
              👂 Listen closely to &quot;{picTarget.wordSan}&quot; and pick its first letter!
            </div>
          )}

          <button
            type="button"
            className="pvg-step-btn"
            style={{ marginTop: '0.5rem' }}
            onClick={generatePicQuestion}
          >
            ⏭️ Pick Another Picture
          </button>
        </div>
      )}

      {/* ==================================================================
          MODE 4: SING-ALONG ALPHABET TRAIN (अक्षर-रेलगाड़ी)
          ================================================================== */}
      {mode === 'train' && (
        <div className="pvg-train-arena">
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: '#0369a1' }}>
              🚂 अक्षर-रेलगाड़ी · Sing-Along Alphabet Train
            </h4>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
              Hop on the Bodhi Express! Watch each carriage roll by, hear its sound, and sing along!
            </p>
          </div>

          {/* Train track with Engine and Carriages */}
          <div className="pvg-train-track" role="region" aria-label="Alphabet Train Track">
            {/* Engine */}
            <div className="pvg-train-engine">
              <span style={{ fontSize: '2.5rem' }} aria-hidden="true">🚂</span>
              <span style={{ fontWeight: 900, fontSize: '0.85rem' }}>BODHI</span>
              <span style={{ fontSize: '0.72rem', opacity: 0.9 }}>Express</span>
            </div>

            {/* Letter Carriages */}
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

          {/* Train controls */}
          <div className="pvg-train-controls">
            <button
              type="button"
              className="pvg-step-btn"
              onClick={() => {
                setTrainIndex((prev) => {
                  const len = filteredMnemonics.length || 1;
                  return (prev - 1 + len) % len;
                });
              }}
              aria-label="Previous carriage"
            >
              ◀ Back Carriage
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
              <span>{isPlayingTrain ? 'Pause Train' : 'Start Sing-Along Train'}</span>
            </button>

            <button
              type="button"
              className="pvg-step-btn"
              onClick={() => {
                setTrainIndex((prev) => {
                  const len = filteredMnemonics.length || 1;
                  return (prev + 1) % len;
                });
              }}
              aria-label="Next carriage"
            >
              Next Carriage ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreschoolVarnamalaGame;
