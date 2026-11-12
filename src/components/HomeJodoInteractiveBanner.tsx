import React, { useState, useEffect, useRef } from 'react';
import { playPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import '../styles/home-jodo-interactive-banner.css';
import '../styles/home-calm-overrides.css';

export interface HomeJodoInteractiveBannerProps {
  onOpenBoard: (mode?: 'jodo' | 'match' | 'maze' | 'prahelika', category?: string) => void;
  className?: string;
}

interface JodoWordSample {
  id: string;
  word: string;
  transliteration: string;
  meaning: string;
  category: string;
  emoji: string;
  tiles: string[];
}

const JODO_SAMPLES: JodoWordSample[] = [
  {
    id: 'jodo',
    word: 'जोडो',
    transliteration: 'jodo',
    meaning: 'Connect & Snap Syllable Puzzle',
    category: 'Word Puzzle',
    emoji: '🧩',
    tiles: ['जो', 'डो'],
  },
  {
    id: 'vidya',
    word: 'विद्या',
    transliteration: 'vidyā',
    meaning: 'Sacred Knowledge & Learning',
    category: 'Foundations',
    emoji: '📚',
    tiles: ['वि', 'द्या'],
  },
  {
    id: 'ananda',
    word: 'आनन्दः',
    transliteration: 'ānandaḥ',
    meaning: 'Supreme Joy & Wonder',
    category: 'Daily Words',
    emoji: '✨',
    tiles: ['आ', 'नन्', 'दः'],
  },
  {
    id: 'shuka',
    word: 'शुकः',
    transliteration: 'śukaḥ',
    meaning: 'Playful Green Parrot',
    category: 'Friendly Animals',
    emoji: '🦜',
    tiles: ['शु', 'कः'],
  },
  {
    id: 'sanskritam',
    word: 'संस्कृतम्',
    transliteration: 'saṁskṛtam',
    meaning: 'The Refined Classical Language',
    category: 'Cultural Heritage',
    emoji: '🕉️',
    tiles: ['सं', 'स्कृ', 'तम्'],
  },
];

export const HomeJodoInteractiveBanner: React.FC<HomeJodoInteractiveBannerProps> = ({
  onOpenBoard,
  className = '',
}) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeTileIdx, setActiveTileIdx] = useState<number | null>(null);
  const [hasSnapped, setHasSnapped] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const bannerRef = useRef<HTMLDivElement>(null);

  const currentSample = JODO_SAMPLES[activeIdx];

  // Auto-cycle samples on idle unless hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setHasSnapped(false);
      setActiveIdx((prev) => (prev + 1) % JODO_SAMPLES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  // Handle tile click preview
  const handleTileClick = (e: React.MouseEvent, tile: string, idx: number) => {
    e.stopPropagation();
    setActiveTileIdx(idx);
    soundEffects.playPuzzleSnap();
    playPronunciation(tile);
    setTimeout(() => {
      setHasSnapped(true);
      soundEffects.playStrokeChime();
    }, 450);
  };

  // Cursor coordinates tracking for dynamic 3D tilt & cursor glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleLaunchBoard = () => {
    soundEffects.playCelebrationChime();
    playPronunciation(currentSample.word);
    onOpenBoard();
  };

  return (
    <div
      ref={bannerRef}
      className={`home-jodo-banner ${className}${isHovered ? ' is-hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveTileIdx(null);
      }}
      onMouseMove={handleMouseMove}
      onClick={handleLaunchBoard}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleLaunchBoard();
        }
      }}
      title="Click to launch interactive जोडो (Jodo) Sanskrit Word Puzzle Studio"
      style={
        {
          '--mouse-x': `${mousePos.x}px`,
          '--mouse-y': `${mousePos.y}px`,
        } as React.CSSProperties
      }
    >
      {/* Ambient Animated Glow & Loading Shimmer */}
      <div className="hjb-ambient-glow" aria-hidden="true" />
      <div className="hjb-shimmer-sweep" aria-hidden="true" />

      {/* Top Header Pill Bar */}
      <div className="hjb-top-bar">
        <div className="hjb-live-indicator">
          <span className="hjb-pulsing-dot" />
          <span className="hjb-live-text">100% INTERACTIVE PUZZLE ARCADE</span>
        </div>
        <div className="hjb-cursor-hint">
          <span className="hjb-cursor-icon">👆</span>
          <span className="hjb-cursor-label">Live Preview · Hover &amp; Tap Tiles</span>
        </div>
      </div>

      <div className="hjb-content-grid">
        {/* Left Column: Branding, Value Prop & Stats */}
        <div className="hjb-info-col">
          <div className="hjb-title-lockup">
            <span className="hjb-icon" aria-hidden="true">🧩</span>
            <div>
              <div className="hjb-sanskrit-tag" lang="sa">
                संस्कृत-पद-निर्माणम् · जोडो
              </div>
              <h2 className="hjb-title">
                जोडो (JODO) Syllable Tile Studio
              </h2>
            </div>
          </div>

          <p className="hjb-desc">
            Snap syllable tiles into complete Sanskrit words with instant audio pronunciation.
            Accelerate vocabulary recall 3× faster than static memorization!
          </p>

          <div className="hjb-pills-row">
            <button
              type="button"
              className="hjb-feature-pill"
              onClick={(e) => {
                e.stopPropagation();
                soundEffects.playCelebrationChime();
                onOpenBoard('jodo');
              }}
              title="Launch 6,000+ Sanskrit Syllable Puzzles (जोडो)"
              aria-label="Launch 6,000+ Sanskrit Syllable Puzzles"
            >
              <span aria-hidden="true">🧩</span> 6,000+ Syllable Puzzles
            </button>
            <button
              type="button"
              className="hjb-feature-pill"
              onClick={(e) => {
                e.stopPropagation();
                soundEffects.playCelebrationChime();
                onOpenBoard('match');
              }}
              title="Launch 18 Match-the-Following Categories (युग्म-मेलनम्)"
              aria-label="Launch 18 Match-the-Following Categories"
            >
              <span aria-hidden="true">🎯</span> 18 Match Pairs
            </button>
            <button
              type="button"
              className="hjb-feature-pill hjb-feature-pill--highlight"
              onClick={(e) => {
                e.stopPropagation();
                soundEffects.playCelebrationChime();
                onOpenBoard('maze', 'maze_thirsty_crow');
              }}
              title="Launch Panchatantra Word Mazes &amp; Story Quests (कथा-व्यूहाः)"
              aria-label="Launch Panchatantra Word Mazes and Story Quests"
            >
              <span aria-hidden="true">🦁</span> Panchatantra Mazes
            </button>
            <button
              type="button"
              className="hjb-feature-pill"
              onClick={(e) => {
                e.stopPropagation();
                soundEffects.playCelebrationChime();
                onOpenBoard('prahelika');
              }}
              title="Launch Classical Sanskrit Riddles Studio (प्रहेलिकाः)"
              aria-label="Launch Classical Sanskrit Riddles Studio"
            >
              <span aria-hidden="true">📜</span> Classical Riddles (प्रहेलिकाः)
            </button>
          </div>
        </div>

        {/* Right Column: Live Animated Syllable Snap Workbench */}
        <div className="hjb-workbench-col">
          <div className="hjb-workbench-header">
            <span className="hjb-wb-badge">
              <span>✨</span> {currentSample.category}
            </span>
            <div className="hjb-wb-switcher" onClick={(e) => e.stopPropagation()}>
              {JODO_SAMPLES.map((sample, sIdx) => (
                <button
                  key={sample.id}
                  type="button"
                  className={`hjb-sample-dot${sIdx === activeIdx ? ' active' : ''}`}
                  onClick={() => {
                    setActiveIdx(sIdx);
                    setHasSnapped(false);
                    soundEffects.playStrokeChime();
                  }}
                  title={`Preview ${sample.word} (${sample.transliteration})`}
                  aria-label={`Preview ${sample.word}`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Tiles Stage */}
          <div className="hjb-stage-assembly">
            {/* Unassembled Tiles */}
            <div className="hjb-tiles-tray" aria-label="Syllable Tiles">
              {currentSample.tiles.map((tile, tIdx) => {
                const isSelected = activeTileIdx === tIdx;
                return (
                  <button
                    key={`${tile}-${tIdx}`}
                    type="button"
                    className={`hjb-interactive-tile${isSelected ? ' is-selected' : ''}`}
                    onClick={(e) => handleTileClick(e, tile, tIdx)}
                    title={`Click to sound out and snap "${tile}"`}
                  >
                    <span className="hjb-tile-char" lang="sa">{tile}</span>
                    <span className="hjb-tile-sub">Tap tile</span>
                    <span className="hjb-tile-pulse-ring" />
                  </button>
                );
              })}
            </div>

            <div className="hjb-snap-connector" aria-hidden="true">
              <span className="hjb-snap-arrow">➔</span>
              <span className="hjb-snap-label">Snap</span>
            </div>

            {/* Assembled Combined Word Result */}
            <div className={`hjb-assembled-card${hasSnapped ? ' is-snapped' : ''}`}>
              <div className="hjb-assembled-emoji">{currentSample.emoji}</div>
              <div className="hjb-assembled-text">
                <span className="hjb-assembled-word" lang="sa">
                  {currentSample.word}
                </span>
                <span className="hjb-assembled-trans">
                  {currentSample.transliteration}
                </span>
              </div>
              <span className="hjb-assembled-meaning">
                {currentSample.meaning}
              </span>
            </div>
          </div>

          {/* Bottom Interactive CTA Bar */}
          <div className="hjb-cta-action-row">
            <span className="hjb-play-prompt">
              <span>🎮</span>
              <span><strong>Ready to solve?</strong> Click anywhere to open Jodo Studio</span>
            </span>
            <span className="hjb-launch-btn">
              <span>Play जोडो Studio</span>
              <span className="hjb-btn-arrow">➔</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeJodoInteractiveBanner;
