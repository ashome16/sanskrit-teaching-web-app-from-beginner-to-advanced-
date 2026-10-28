import React, { useState, useEffect, useMemo } from 'react';
import {
  MATCH_CATEGORIES,
  WORD_MAZE_QUESTS,
  type MatchCategoryMetadata,
  type MatchPairItem,
  type WordMazeQuest,
  type MazeCell,
} from '../data/sanskritGamesData';
import { playPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import '../styles/sanskrit-games.css';

export interface SanskritGamesHubProps {
  initialMode?: 'match' | 'maze';
  initialCategory?: string;
  onGoBack?: () => void;
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const PRESCHOOL_MATCH_CAT_IDS = new Set([
  'cat_vahanas',
  'cat_shapes_seasons',
  'fruits_veg',
  'relationships',
  'vehicles',
  'cat_numbers_mnemonics',
  'actions',
  'household',
]);

export const SanskritGamesHub: React.FC<SanskritGamesHubProps> = ({
  initialMode = 'match',
  initialCategory,
  onGoBack,
}) => {
  const [activeGameMode, setActiveGameMode] = useState<'match' | 'maze'>(initialMode);

  useEffect(() => {
    setActiveGameMode(initialMode);
  }, [initialMode]);

  // --------------------------------------------------------------------------
  // MATCH-THE-FOLLOWING STATE
  // --------------------------------------------------------------------------
  const [selectedCatId, setSelectedCatId] = useState<string>(() => {
    if (initialCategory && MATCH_CATEGORIES.some((c) => c.id === initialCategory)) {
      return initialCategory;
    }
    return MATCH_CATEGORIES[0].id;
  });

  const [showPreschoolOnly, setShowPreschoolOnly] = useState<boolean>(false);

  const displayedCategories = useMemo(() => {
    if (!showPreschoolOnly) return MATCH_CATEGORIES;
    return MATCH_CATEGORIES.filter((c) => PRESCHOOL_MATCH_CAT_IDS.has(c.id));
  }, [showPreschoolOnly]);

  const activeCategory: MatchCategoryMetadata = useMemo(() => {
    return (
      MATCH_CATEGORIES.find((c) => c.id === selectedCatId) || displayedCategories[0] || MATCH_CATEGORIES[0]
    );
  }, [selectedCatId, displayedCategories]);

  // Selected Sanskrit word (left column)
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  // Selected English translation (right column)
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  // Matched IDs
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  // Error flash IDs
  const [errorPair, setErrorPair] = useState<{ leftId: string; rightId: string } | null>(null);
  // Match score & combo streaks
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);

  // Shuffled right-column items (only shuffles when category changes or reset)
  const [shuffledEnglishItems, setShuffledEnglishItems] = useState<MatchPairItem[]>([]);

  useEffect(() => {
    setShuffledEnglishItems(shuffleArray(activeCategory.pairs));
    setMatchedIds(new Set());
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setErrorPair(null);
  }, [activeCategory]);

  // Handle clicking left (Sanskrit) tile
  const handleLeftClick = (item: MatchPairItem) => {
    if (matchedIds.has(item.id)) return;
    if (showPreschoolOnly) {
      soundEffects.playBubblePop();
    }
    playPronunciation(item.sanskrit);
    setSelectedLeftId(item.id);

    if (selectedRightId) {
      evaluateMatch(item.id, selectedRightId);
    }
  };

  // Handle clicking right (English) tile
  const handleRightClick = (item: MatchPairItem) => {
    if (matchedIds.has(item.id)) return;
    if (showPreschoolOnly) {
      soundEffects.playBubblePop();
    }
    setSelectedRightId(item.id);

    if (selectedLeftId) {
      evaluateMatch(selectedLeftId, item.id);
    }
  };

  // Evaluate pair
  const evaluateMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // MATCH!
      if (showPreschoolOnly) {
        soundEffects.playCelebrationChime();
      } else {
        soundEffects.playSuccessDing();
      }
      setMatchedIds((prev) => {
        const next = new Set(prev);
        next.add(leftId);
        return next;
      });
      setScore((prev) => prev + 10 + streak * 2);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
      setSelectedLeftId(null);
      setSelectedRightId(null);
      setErrorPair(null);
    } else {
      // MISMATCH
      soundEffects.playErrorBuzzer();
      setErrorPair({ leftId, rightId });
      setStreak(0);
      setTimeout(() => {
        setErrorPair(null);
        setSelectedLeftId(null);
        setSelectedRightId(null);
      }, 700);
    }
  };

  const handleResetMatchGame = () => {
    setMatchedIds(new Set());
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setErrorPair(null);
    setShuffledEnglishItems(shuffleArray(activeCategory.pairs));
  };

  const handleNextCategory = () => {
    const currentIndex = MATCH_CATEGORIES.findIndex((c) => c.id === selectedCatId);
    const nextIndex = (currentIndex + 1) % MATCH_CATEGORIES.length;
    setSelectedCatId(MATCH_CATEGORIES[nextIndex].id);
  };

  const isMatchRoundComplete =
    matchedIds.size > 0 && matchedIds.size === activeCategory.pairs.length;

  // --------------------------------------------------------------------------
  // WORD MAZE QUEST STATE (शब्द-व्यूहः)
  // --------------------------------------------------------------------------
  const [selectedQuestId, setSelectedQuestId] = useState<string>(WORD_MAZE_QUESTS[0].id);

  const activeQuest: WordMazeQuest = useMemo(() => {
    return (
      WORD_MAZE_QUESTS.find((q) => q.id === selectedQuestId) || WORD_MAZE_QUESTS[0]
    );
  }, [selectedQuestId]);

  // Current step in the maze sequence (1-based)
  const [currentMazeStep, setCurrentMazeStep] = useState<number>(1);
  // Cells that have been successfully stepped on
  const [steppedCells, setSteppedCells] = useState<MazeCell[]>([]);
  // Last tapped trap cell for warning animation
  const [trapCell, setTrapCell] = useState<{ row: number; col: number } | null>(null);
  const [trapMessage, setTrapMessage] = useState<string | null>(null);

  // Traffic visual scene interactive hotspot state
  const [trafficHotspot, setTrafficHotspot] = useState<{
    word: string;
    trans: string;
    icon?: string;
    note?: string;
  } | null>({
    word: 'चतुष्पथः',
    trans: 'Crossroads / Intersection',
    icon: '🚦',
    note: 'Tap the child, ambulance, traffic lights, or directions to hear native Sanskrit pronunciation!',
  });
  const [trafficSceneTab, setTrafficSceneTab] = useState<'scene' | 'maze'>('scene');

  const handleTrafficClick = (word: string, trans: string, icon?: string, note?: string) => {
    playPronunciation(word);
    soundEffects.playStrokeChime();
    setTrafficHotspot({ word, trans, icon, note });
  };

  // Reset maze on quest change
  useEffect(() => {
    setCurrentMazeStep(1);
    setSteppedCells([]);
    setTrapCell(null);
    setTrapMessage(null);
  }, [activeQuest]);

  const totalPathSteps = useMemo(() => {
    return activeQuest.cells.filter((c) => c.isPath).length;
  }, [activeQuest]);

  const isMazeCompleted = steppedCells.length >= totalPathSteps;

  const handleMazeCellClick = (cell: MazeCell) => {
    if (isMazeCompleted) return;

    // Check if this cell is the NEXT step in the path
    if (cell.isPath && cell.stepOrder === currentMazeStep) {
      soundEffects.playPuzzleSnap();
      playPronunciation(cell.word);
      setSteppedCells((prev) => [...prev, cell]);
      setCurrentMazeStep((prev) => prev + 1);
      setTrapCell(null);
      setTrapMessage(null);

      if (cell.stepOrder === totalPathSteps) {
        // Quest completed!
        soundEffects.playVictoryFanfare();
      }
    } else if (cell.isPath && (cell.stepOrder || 0) < currentMazeStep) {
      // Already visited cell — speak word
      playPronunciation(cell.word);
    } else {
      // Wrong cell / Trap / Out-of-order!
      soundEffects.playErrorBuzzer();
      setTrapCell({ row: cell.row, col: cell.col });
      if (!cell.isPath) {
        setTrapMessage(`⚠️ "${cell.word}" (${cell.translation}) is a trap! It is not part of this path.`);
      } else {
        setTrapMessage(`⚠️ Step out of order! Look for step #${currentMazeStep} next.`);
      }
      setTimeout(() => {
        setTrapCell(null);
      }, 1200);
    }
  };

  const handleResetMaze = () => {
    setCurrentMazeStep(1);
    setSteppedCells([]);
    setTrapCell(null);
    setTrapMessage(null);
  };

  const assembledStoryWords = steppedCells.map((c) => c.word).join(' ');

  return (
    <div className="sgh-shell">
      {/* 1. Hub Header */}
      <div className="sgh-header">
        <div className="sgh-header-left">
          <span className="sgh-om-badge" aria-hidden="true">🕉️</span>
          <div className="sgh-title-box">
            <h1>संस्कृत-क्रीडा-मण्डपम् · Sanskrit Games Pavilion</h1>
            <p>Interactive Match-the-Following &amp; Word Mazes for Vocabulary Mastery</p>
          </div>
        </div>

        {/* Studio Mode Tabs */}
        <div className="sgh-mode-tabs" role="tablist">
          {onGoBack && (
            <button
              type="button"
              className="sgh-mode-btn sgh-mode-btn--back"
              onClick={onGoBack}
              title="Return to Jodo tile puzzles"
            >
              <span>🧩</span>
              <span>जोडो Puzzles</span>
            </button>
          )}
          <button
            type="button"
            className={`sgh-mode-btn${activeGameMode === 'match' ? ' sgh-mode-btn--active' : ''}`}
            onClick={() => setActiveGameMode('match')}
            role="tab"
            aria-selected={activeGameMode === 'match'}
          >
            <span>🎯</span>
            <span>युग्म-मेलनम् · Match Pairs</span>
          </button>
          <button
            type="button"
            className={`sgh-mode-btn${activeGameMode === 'maze' ? ' sgh-mode-btn--active' : ''}`}
            onClick={() => setActiveGameMode('maze')}
            role="tab"
            aria-selected={activeGameMode === 'maze'}
          >
            <span>🌀</span>
            <span>शब्द-व्यूहः · Word Maze</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          VIEW 1: MATCH-THE-FOLLOWING (युग्म-मेलनम्)
          ==================================================================== */}
      {activeGameMode === 'match' && (
        <>
          {/* Category Filter Bar (All Categories vs Preschool / Toddler Favorites) */}
          <div className="sgh-filter-bar">
            <button
              type="button"
              className={`sgh-filter-chip${!showPreschoolOnly ? ' sgh-filter-chip--active' : ''}`}
              onClick={() => setShowPreschoolOnly(false)}
            >
              <span>🌟 All Categories ({MATCH_CATEGORIES.length})</span>
            </button>
            <button
              type="button"
              className={`sgh-filter-chip sgh-filter-chip--preschool${showPreschoolOnly ? ' sgh-filter-chip--active' : ''}`}
              onClick={() => {
                setShowPreschoolOnly(true);
                if (!PRESCHOOL_MATCH_CAT_IDS.has(selectedCatId)) {
                  setSelectedCatId('fruits_veg');
                }
              }}
            >
              <span>🧸 Preschool &amp; Kids (Ages 3–7)</span>
            </button>
          </div>

          {showPreschoolOnly && (
            <div className="sgh-preschool-banner">
              <span className="spb-icon" aria-hidden="true">🧸</span>
              <div>
                <strong>शिशु-युग्म-क्रीडा · Preschool Picture Match (Ages 3–7)</strong>
                <span>Tap matching cards with emojis and hear the native Sanskrit pronunciation! 100% fun, gentle, and tactile.</span>
              </div>
            </div>
          )}

          {/* Category Selector Strip */}
          <div className="sgh-category-strip" role="tablist" aria-label="Vocabulary Categories">
            {displayedCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`sgh-cat-pill${selectedCatId === cat.id ? ' sgh-cat-pill--active' : ''}`}
                onClick={() => setSelectedCatId(cat.id)}
                role="tab"
                aria-selected={selectedCatId === cat.id}
                title={cat.description}
              >
                <span>{cat.icon}</span>
                <span>{cat.titleDev}</span>
              </button>
            ))}
          </div>

          {/* Match Arena */}
          <div className="sgh-arena-card">
            <div className="sgh-arena-header">
              <div className="sgh-arena-title-wrap">
                <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{activeCategory.icon}</span>
                <div>
                  <h2>{activeCategory.titleDev} · {activeCategory.titleEn}</h2>
                  <p className="sgh-arena-desc">{activeCategory.description}</p>
                </div>
              </div>

              {/* Stats & Score */}
              <div className="sgh-stats-row">
                <span className="sgh-stat-chip">
                  <span>🏆 Score:</span>
                  <strong>{score}</strong>
                </span>
                <span className="sgh-stat-chip">
                  <span>🔥 Streak:</span>
                  <strong>{streak}</strong>
                </span>
                <span className="sgh-stat-chip">
                  <span>Matched:</span>
                  <strong>{matchedIds.size} / {activeCategory.pairs.length}</strong>
                </span>
                <button
                  type="button"
                  className="sanskrit-tool-btn"
                  onClick={handleResetMatchGame}
                  title="Reset and shuffle pairs"
                >
                  <span>🔄</span>
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Completion Banner */}
            {isMatchRoundComplete ? (
              <div className="sgh-celebrate-box">
                <span style={{ fontSize: '3rem' }}>🎉</span>
                <h3 className="sgh-celebrate-title">अति उत्तमम्! All Pairs Matched!</h3>
                <p className="sgh-celebrate-desc">
                  You successfully mastered all {activeCategory.pairs.length} terms in "{activeCategory.titleDev}" with an amazing streak of {bestStreak}!
                </p>
                <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="sgh-mode-btn sgh-mode-btn--active"
                    onClick={handleResetMatchGame}
                  >
                    <span>🔄 Replay This Category</span>
                  </button>
                  <button
                    type="button"
                    className="sgh-mode-btn"
                    style={{ background: '#f59e0b', color: '#ffffff' }}
                    onClick={handleNextCategory}
                  >
                    <span>Next Category ➔</span>
                  </button>
                  <button
                    type="button"
                    className="sgh-mode-btn"
                    style={{ background: '#7c3aed', color: '#ffffff' }}
                    onClick={() => setActiveGameMode('maze')}
                  >
                    <span>Try Word Maze 🌀</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Two-Column Match Arena */
              <div className="sgh-match-grid">
                {/* Left Column: Sanskrit Devanagari */}
                <div>
                  <div className="sgh-col-heading">
                    <span>🕉️</span>
                    <span>Sanskrit Terms (संस्कृत-पदानि)</span>
                  </div>
                  <div className="sgh-tiles-list">
                    {activeCategory.pairs.map((item) => {
                      const isMatched = matchedIds.has(item.id);
                      const isSelected = selectedLeftId === item.id;
                      const isError = errorPair?.leftId === item.id;

                      let tileClass = 'sgh-match-tile';
                      if (isMatched) tileClass += ' sgh-match-tile--matched';
                      else if (isSelected) tileClass += ' sgh-match-tile--selected';
                      else if (isError) tileClass += ' sgh-match-tile--error';

                      return (
                        <div
                          key={`left-${item.id}`}
                          className={tileClass}
                          onClick={() => handleLeftClick(item)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            {item.emoji && <span style={{ fontSize: '1.25rem' }}>{item.emoji}</span>}
                            <span className="sgh-tile-devanagari">{item.sanskrit}</span>
                          </div>
                          <button
                            type="button"
                            className="sgh-tile-audio-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              playPronunciation(item.sanskrit);
                            }}
                            title={`Hear: ${item.sanskrit}`}
                            aria-label={`Listen to ${item.sanskrit}`}
                          >
                            🔊
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: English Meanings (Shuffled) */}
                <div>
                  <div className="sgh-col-heading">
                    <span>🌐</span>
                    <span>English Meanings (आङ्ग्ल-अर्थाः)</span>
                  </div>
                  <div className="sgh-tiles-list">
                    {shuffledEnglishItems.map((item) => {
                      const isMatched = matchedIds.has(item.id);
                      const isSelected = selectedRightId === item.id;
                      const isError = errorPair?.rightId === item.id;

                      let tileClass = 'sgh-match-tile';
                      if (isMatched) tileClass += ' sgh-match-tile--matched';
                      else if (isSelected) tileClass += ' sgh-match-tile--selected';
                      else if (isError) tileClass += ' sgh-match-tile--error';

                      return (
                        <div
                          key={`right-${item.id}`}
                          className={tileClass}
                          onClick={() => handleRightClick(item)}
                        >
                          <span className="sgh-tile-english">{item.english}</span>
                          {isMatched && <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ====================================================================
          VIEW 2: WORD MAZE QUESTS (शब्द-व्यूहः)
          ==================================================================== */}
      {activeGameMode === 'maze' && (
        <>
          {/* Quest Selector Strip */}
          <div className="sgh-quest-strip" role="tablist" aria-label="Word Maze Quests">
            {WORD_MAZE_QUESTS.map((quest) => (
              <button
                key={quest.id}
                type="button"
                className={`sgh-quest-btn${selectedQuestId === quest.id ? ' sgh-quest-btn--active' : ''}`}
                onClick={() => setSelectedQuestId(quest.id)}
                role="tab"
                aria-selected={selectedQuestId === quest.id}
              >
                <span>{quest.icon}</span>
                <span>{quest.titleDev}</span>
              </button>
            ))}
          </div>

          {/* Maze Arena Card */}
          <div className="sgh-arena-card">
            <div className="sgh-arena-header">
              <div className="sgh-arena-title-wrap">
                <span style={{ fontSize: '2rem' }}>{activeQuest.icon}</span>
                <div>
                  <h2>{activeQuest.titleDev}</h2>
                  <p className="sgh-arena-desc">{activeQuest.missionObjective}</p>
                </div>
              </div>

              <div className="sgh-stats-row">
                <span className="sgh-stat-chip">
                  <span>👣 Path Steps:</span>
                  <strong>{steppedCells.length} / {totalPathSteps}</strong>
                </span>
                <button
                  type="button"
                  className="sanskrit-tool-btn"
                  onClick={handleResetMaze}
                  title="Reset maze progress"
                >
                  <span>🔄</span>
                  <span>Restart Maze</span>
                </button>
              </div>
            </div>

            {/* Traffic Scene & Directions Exploration Block */}
            {activeQuest.id === 'maze_traffic_rescue' && (
              <div className="sgh-traffic-scene">
                <div className="sgh-traffic-scene-header">
                  <div className="sgh-traffic-scene-title">
                    <span style={{ fontSize: '1.8rem' }}>🚑</span>
                    <div>
                      <h3>मार्ग-यातायात-दृश्यम् · Interactive Traffic &amp; Directions Scene</h3>
                      <p>Tap the child, ambulance, signals, or direction arrows to hear native Sanskrit pronunciation!</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      type="button"
                      className={`sgh-quest-btn ${trafficSceneTab === 'scene' ? 'sgh-quest-btn--active' : ''}`}
                      onClick={() => setTrafficSceneTab('scene')}
                    >
                      🏙️ Scene View
                    </button>
                    <button
                      type="button"
                      className={`sgh-quest-btn ${trafficSceneTab === 'maze' ? 'sgh-quest-btn--active' : ''}`}
                      onClick={() => setTrafficSceneTab('maze')}
                    >
                      🌀 Maze View
                    </button>
                  </div>
                </div>

                {trafficSceneTab === 'scene' && (
                  <>
                    {/* The Visual Crossroads Canvas */}
                    <div className="sgh-traffic-canvas" role="region" aria-label="Crossroads Traffic Scene">
                      {/* Asphalt crossroad markings */}
                      <div className="sgh-road-cross" aria-hidden="true" />
                      <div className="sgh-road-hcross" aria-hidden="true" />
                      <div className="sgh-zebra-crossing" aria-hidden="true" />

                      {/* TOP ROW: Hospital & Ahead / North */}
                      <div className="sgh-canvas-row">
                        <button
                          type="button"
                          className={`sgh-hotspot ${trafficHotspot?.word === 'चिकित्सालयः' ? 'sgh-hotspot--active' : ''}`}
                          onClick={() => handleTrafficClick('चिकित्सालयः', 'Hospital', '🏥', 'The ambulance is rushing ahead to reach the hospital safely!')}
                        >
                          <span>🏥</span>
                          <span>चिकित्सालयः (Hospital)</span>
                          <span className="sgh-hotspot-badge">पुरतः / अग्रे ⬆️</span>
                        </button>

                        <button
                          type="button"
                          className={`sgh-hotspot ${trafficHotspot?.word === 'हरितदीपः' ? 'sgh-hotspot--active' : ''}`}
                          onClick={() => handleTrafficClick('हरितदीपः', 'Green Light (Go!)', '🟢', 'हरितदीपः = चलतु (Green light signals vehicles to move)')}
                        >
                          <span>🟢</span>
                          <span>हरितदीपः (चलतु / Go)</span>
                        </button>
                      </div>

                      {/* CENTER ROW: Crossroads, Traffic Light, Child Helping Elder */}
                      <div className="sgh-canvas-center-row">
                        <button
                          type="button"
                          className={`sgh-hotspot ${trafficHotspot?.word === 'वामतः' ? 'sgh-hotspot--active' : ''}`}
                          onClick={() => handleTrafficClick('वामतः', 'To the Left', '⬅️', 'वाहनानि वामतः गच्छन्ति (Vehicles move to the left to give way)')}
                        >
                          <span>⬅️</span>
                          <span>वामतः (Left)</span>
                          <span className="sgh-hotspot-badge">🚗 वाहनानि</span>
                        </button>

                        {/* Crossroads center: Child helping elder on zebra crossing */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', zIndex: 6 }}>
                          <button
                            type="button"
                            className={`sgh-hotspot ${trafficHotspot?.word === 'बालकः वृद्धस्य साहाय्यं करोति' ? 'sgh-hotspot--active' : ''}`}
                            onClick={() => handleTrafficClick('बालकः वृद्धस्य साहाय्यं करोति', 'The child helps the elder cross safely', '🤝', 'The kind child takes the elderly person across the zebra crossing safely!')}
                            style={{ background: '#fef3c7', borderColor: '#d97706' }}
                          >
                            <span>👦👴🤝</span>
                            <span>बालकः वृद्धस्य साहाय्यं करोति</span>
                          </button>

                          <button
                            type="button"
                            className={`sgh-hotspot ${trafficHotspot?.word === 'चतुष्पथः' ? 'sgh-hotspot--active' : ''}`}
                            onClick={() => handleTrafficClick('चतुष्पथः', 'Crossroads / Intersection', '🚦', 'Where four roads meet (चत्वारः पन्थानः यत्र मिलन्ति)')}
                          >
                            <span>🚦</span>
                            <span>चतुष्पथः (Crossroads)</span>
                            <span className="sgh-hotspot-badge">🛑 रक्तदीपः</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          className={`sgh-hotspot ${trafficHotspot?.word === 'दक्षिणतः' ? 'sgh-hotspot--active' : ''}`}
                          onClick={() => handleTrafficClick('दक्षिणतः', 'To the Right', '➡️', 'सः वामतः दक्षिणतः च पश्यति (He looks left and right before crossing)')}
                        >
                          <span>➡️</span>
                          <span>दक्षिणतः (Right)</span>
                        </button>
                      </div>

                      {/* BOTTOM ROW: Ambulance Approaching from Behind & Straight Ahead */}
                      <div className="sgh-canvas-row">
                        <button
                          type="button"
                          className={`sgh-hotspot ${trafficHotspot?.word === 'ऋजु-मार्गेण' ? 'sgh-hotspot--active' : ''}`}
                          onClick={() => handleTrafficClick('ऋजु-मार्गेण अग्रे धावति', 'Speeds straight forward ahead', '🧭', 'Straight ahead without stopping (सीधा अग्रे)')}
                        >
                          <span>🧭</span>
                          <span>ऋजु-मार्गेण अग्रे (Straight)</span>
                        </button>

                        <button
                          type="button"
                          className={`sgh-hotspot ${trafficHotspot?.word === 'रुग्णवाहनम्' ? 'sgh-hotspot--active' : ''}`}
                          onClick={() => handleTrafficClick('रुग्णवाहनम्', 'Ambulance', '🚑', '🚨 रुग्णवाहनम् / आपद्वाहनम् — The emergency ambulance!')}
                          style={{ background: '#fee2e2', borderColor: '#ef4444' }}
                        >
                          <span>🚨🚑</span>
                          <span>रुग्णवाहनम् (Ambulance)</span>
                          <span className="sgh-hotspot-badge">पृष्ठतः आगच्छति ⬇️</span>
                        </button>
                      </div>
                    </div>

                    {/* Active Insight Speech Bubble */}
                    {trafficHotspot && (
                      <div className="sgh-traffic-bubble">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>{trafficHotspot.icon || '🗣️'}</span>
                          <div>
                            <span style={{ fontSize: '1.05rem', color: '#78350f', fontWeight: 800 }}>{trafficHotspot.word}</span>
                            <span style={{ margin: '0 0.4rem', color: '#b45309' }}>•</span>
                            <span style={{ color: '#92400e', fontWeight: 600 }}>{trafficHotspot.trans}</span>
                            {trafficHotspot.note && (
                              <div style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 500, marginTop: '0.15rem' }}>
                                {trafficHotspot.note}
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="sanskrit-tool-btn"
                          onClick={() => playPronunciation(trafficHotspot.word)}
                          title="Listen to Sanskrit pronunciation"
                          style={{ background: '#ffffff', border: '1.5px solid #fed7aa', padding: '0.4rem 0.65rem' }}
                        >
                          🔊 Hear Audio
                        </button>
                      </div>
                    )}

                    {/* Direction Compass Quick Reference Bar */}
                    <div className="sgh-direction-tray">
                      <button
                        type="button"
                        className="sgh-dir-chip"
                        onClick={() => handleTrafficClick('वामतः', 'To the Left', '⬅️', 'वाम-हस्तस्य दिशि (On the side of the left hand)')}
                      >
                        <span>⬅️ वामतः</span>
                        <small style={{ color: '#64748b' }}>Left</small>
                      </button>
                      <button
                        type="button"
                        className="sgh-dir-chip"
                        onClick={() => handleTrafficClick('दक्षिणतः', 'To the Right', '➡️', 'दक्षिण-हस्तस्य दिशि (On the side of the right hand)')}
                      >
                        <span>➡️ दक्षिणतः</span>
                        <small style={{ color: '#64748b' }}>Right</small>
                      </button>
                      <button
                        type="button"
                        className="sgh-dir-chip"
                        onClick={() => handleTrafficClick('पुरतः / अग्रे', 'In Front / Ahead', '⬆️', 'अग्रे गच्छतु (Move forward ahead)')}
                      >
                        <span>⬆️ पुरतः / अग्रे</span>
                        <small style={{ color: '#64748b' }}>Ahead</small>
                      </button>
                      <button
                        type="button"
                        className="sgh-dir-chip"
                        onClick={() => handleTrafficClick('पृष्ठतः', 'Behind / Backward', '⬇️', 'पृष्ठतः पश्यतु (Look behind)')}
                      >
                        <span>⬇️ पृष्ठतः</span>
                        <small style={{ color: '#64748b' }}>Behind</small>
                      </button>
                      <button
                        type="button"
                        className="sgh-dir-chip"
                        onClick={() => handleTrafficClick('ऋजु-मार्गेण', 'Straight Ahead', '🧭', 'ऋजु = सीधा / सरल (Straight without turns)')}
                      >
                        <span>🧭 ऋजु-मार्गेण</span>
                        <small style={{ color: '#64748b' }}>Straight</small>
                      </button>
                      <button
                        type="button"
                        className="sgh-dir-chip"
                        onClick={() => handleTrafficClick('उपरि', 'Above / Overhead', '🌤️', 'उपरि आकाशः अस्ति (Above is the sky)')}
                      >
                        <span>🌤️ उपरि</span>
                        <small style={{ color: '#64748b' }}>Above</small>
                      </button>
                      <button
                        type="button"
                        className="sgh-dir-chip"
                        onClick={() => handleTrafficClick('अधः', 'Below / Underneath', '⬇️', 'अधः भूमिः अस्ति (Below is the earth)')}
                      >
                        <span>⬇️ अधः</span>
                        <small style={{ color: '#64748b' }}>Below</small>
                      </button>
                      <button
                        type="button"
                        className="sgh-dir-chip"
                        onClick={() => handleTrafficClick('समीपे', 'Near / Nearby', '📍', 'चिकित्सालयः समीपे अस्ति (The hospital is nearby)')}
                      >
                        <span>📍 समीपे</span>
                        <small style={{ color: '#64748b' }}>Near</small>
                      </button>
                      <button
                        type="button"
                        className="sgh-dir-chip"
                        onClick={() => handleTrafficClick('दूरे', 'Far away', '🔭', 'ग्रामः दूरे अस्ति (The village is far away)')}
                      >
                        <span>🔭 दूरे</span>
                        <small style={{ color: '#64748b' }}>Far</small>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Live Story / Sentence Formation Banner */}
            <div className="sgh-maze-parchment">
              <div className="sgh-mp-label">
                <span>📜</span>
                <span>Assembled Sanskrit Sentence / Story Progress:</span>
              </div>
              <p className="sgh-mp-text">
                {assembledStoryWords ? (
                  assembledStoryWords
                ) : (
                  <span style={{ color: '#b45309', opacity: 0.7, fontStyle: 'italic', fontSize: '1rem' }}>
                    Click the starting word in the maze to begin your journey...
                  </span>
                )}
              </p>
              {steppedCells.length > 0 && (
                <p className="sgh-mp-sub">
                  Meaning: {activeQuest.fullSentenceOrStoryEn}
                </p>
              )}
            </div>

            {/* Trap Warning Alert */}
            {trapMessage && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1.5px solid #fecaca',
                  borderRadius: '10px',
                  padding: '0.65rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#991b1b',
                  animation: 'sghFadeIn 0.2s ease-out',
                }}
              >
                {trapMessage}
              </div>
            )}

            {/* Completion Banner */}
            {isMazeCompleted && (
              <div className="sgh-celebrate-box">
                <span style={{ fontSize: '3rem' }}>🏆</span>
                <h3 className="sgh-celebrate-title">व्यूह-विजयः! Maze Quest Completed!</h3>
                <p className="sgh-celebrate-desc">
                  Outstanding! You successfully formed the full classical Sanskrit story/sentence through the maze!
                </p>
                {activeQuest.moral && (
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.85)',
                      padding: '0.65rem 1.15rem',
                      borderRadius: '12px',
                      border: '1px solid #86efac',
                      margin: '0.35rem 0',
                    }}
                  >
                    <strong style={{ color: '#065f46' }}>💡 नीति-वचनम् (Moral): </strong>
                    <span style={{ color: '#166534', fontWeight: 600 }}>{activeQuest.moral}</span>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="sgh-mode-btn sgh-mode-btn--active"
                    onClick={handleResetMaze}
                  >
                    <span>🔄 Replay This Quest</span>
                  </button>
                  <button
                    type="button"
                    className="sgh-mode-btn"
                    style={{ background: '#f59e0b', color: '#ffffff' }}
                    onClick={() => {
                      const curIdx = WORD_MAZE_QUESTS.findIndex((q) => q.id === selectedQuestId);
                      const nxt = (curIdx + 1) % WORD_MAZE_QUESTS.length;
                      setSelectedQuestId(WORD_MAZE_QUESTS[nxt].id);
                    }}
                  >
                    <span>Next Quest ➔</span>
                  </button>
                  <button
                    type="button"
                    className="sgh-mode-btn"
                    style={{ background: '#7c3aed', color: '#ffffff' }}
                    onClick={() => setActiveGameMode('match')}
                  >
                    <span>Play Match Pairs 🎯</span>
                  </button>
                </div>
              </div>
            )}

            {/* Interactive Maze Grid */}
            <div className="sgh-maze-grid-container">
              <div
                className="sgh-maze-grid"
                style={{
                  gridTemplateColumns: `repeat(${activeQuest.gridCols}, 1fr)`,
                }}
              >
                {activeQuest.cells.map((cell) => {
                  const isStepped = steppedCells.some(
                    (sc) => sc.row === cell.row && sc.col === cell.col
                  );
                  const isNextStep = cell.isPath && cell.stepOrder === currentMazeStep;
                  const isTrap = trapCell?.row === cell.row && trapCell?.col === cell.col;

                  let cellClass = 'sgh-maze-cell';
                  if (isStepped) cellClass += ' sgh-maze-cell--stepped';
                  else if (isNextStep) cellClass += ' sgh-maze-cell--current';
                  else if (isTrap) cellClass += ' sgh-maze-cell--trap';

                  return (
                    <div
                      key={`cell-${cell.row}-${cell.col}`}
                      className={cellClass}
                      onClick={() => handleMazeCellClick(cell)}
                      title={`Word: ${cell.word} (${cell.translation})`}
                    >
                      {/* Step Badge */}
                      {isStepped && cell.stepOrder && (
                        <span className="sgh-step-badge">✓{cell.stepOrder}</span>
                      )}
                      {cell.stepOrder === 1 && !isStepped && (
                        <span className="sgh-step-badge" style={{ background: '#10b981' }}>🚩 Start</span>
                      )}
                      {cell.stepOrder === totalPathSteps && !isStepped && (
                        <span className="sgh-step-badge" style={{ background: '#d97706' }}>🏆 Goal</span>
                      )}

                      <span className="sgh-mc-word">{cell.word}</span>
                      <span className="sgh-mc-trans">{cell.translation}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SanskritGamesHub;
