import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  MATCH_CATEGORIES,
  WORD_MAZE_QUESTS,
  PRESCHOOL_MAZE_IDS,
  type MatchCategoryMetadata,
  type MatchPairItem,
  type WordMazeQuest,
  type MazeCell,
} from '../data/sanskritGamesData';
import { playPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import { devanagariToIast } from '../utils/devanagariToIast';
import '../styles/sanskrit-games.css';

export interface SanskritGamesHubProps {
  initialMode?: 'match' | 'maze';
  initialCategory?: string;
  onGoBack?: () => void;
  onModeChange?: (mode: 'match' | 'maze') => void;
  embeddedInBoard?: boolean;
}

type MatchPlayStyle = 'classic' | 'blitz' | 'memory';
type MazeDifficulty = 'guided' | 'scholar';
type GameLevelFilter = 'level1' | 'level2' | 'level3' | 'all';

interface MemoryCardItem {
  uid: string;
  pairId: string;
  side: 'sanskrit' | 'meaning';
  sanskrit: string;
  english: string;
  transliteration: string;
  emoji?: string;
}

interface BlitzRoundQuestion {
  target: MatchPairItem;
  options: MatchPairItem[];
}

const PAIRS_PER_ROUND = 6;
const STARS_STORAGE_KEY = 'ednet_sgh_stars_v1';
const ROMAN_STORAGE_KEY = 'ednet_sgh_roman_v1';
const BLITZ_BEST_STORAGE_KEY = 'ednet_sgh_blitz_best_v1';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Strip spoiler tags like "(Trap)", "(Noun Trap)", "(Action)", "(Fruit)" from maze cell glosses
function cleanMazeGloss(gloss: string): string {
  return gloss
    .replace(/\s*\([^)]*(?:trap|action|fruit|vegetable|spice veg|item)\)/gi, '')
    .replace(/^trap\s+/i, '')
    .trim();
}

function getRomanForItem(item: MatchPairItem): string {
  return item.transliteration || devanagariToIast(item.sanskrit);
}

const LEVEL1_MATCH_CAT_IDS = new Set([
  'cat_vahanas',
  'cat_shapes_seasons',
  'cat_preschool_numbers',
  'fruits_veg',
  'relationships',
  'household',
  'vehicles',
  'insects',
  'actions',
]);

const LEVEL2_MATCH_CAT_IDS = new Set([
  'addressing',
  'occupations',
  'cat_directions_traffic',
  'cat_numbers_mnemonics',
  'time_date',
  'genders',
]);

const LEVEL3_MATCH_CAT_IDS = new Set([
  'tenses',
  'exam_words',
  'vastu',
  'ayurveda',
  'cat_deepakam_sciences',
]);

const LEVEL1_MAZE_IDS = new Set([
  'maze_preschool_ganesha_fruits',
  'maze_preschool_numbers_1_10',
  'maze_identify_fruits_veg',
]);

const LEVEL2_MAZE_IDS = new Set([
  'maze_identify_verbs',
  'maze_thirsty_crow',
  'maze_lion_mouse',
]);

const LEVEL3_MAZE_IDS = new Set([
  'maze_tenses_seq',
  'maze_traffic_rescue',
  'maze_srishti_krama',
]);

function getMatchLevelForCategory(catId?: string): GameLevelFilter {
  if (!catId) return 'level1';
  if (LEVEL3_MATCH_CAT_IDS.has(catId)) return 'level3';
  if (LEVEL2_MATCH_CAT_IDS.has(catId)) return 'level2';
  return 'level1';
}

export const SanskritGamesHub: React.FC<SanskritGamesHubProps> = ({
  initialMode = 'match',
  initialCategory,
  onGoBack,
  onModeChange,
  embeddedInBoard = false,
}) => {
  const [activeGameMode, setActiveGameMode] = useState<'match' | 'maze'>(initialMode);

  useEffect(() => {
    setActiveGameMode(initialMode);
  }, [initialMode]);

  const switchGameMode = useCallback(
    (nextMode: 'match' | 'maze') => {
      setActiveGameMode(nextMode);
      onModeChange?.(nextMode);
    },
    [onModeChange]
  );

  // Persistent Star Rewards & Roman / IAST Phonetics toggle
  const [totalStars, setTotalStars] = useState<number>(() => {
    try {
      return Math.max(0, Number(localStorage.getItem(STARS_STORAGE_KEY)) || 0);
    } catch {
      return 0;
    }
  });

  const awardStars = useCallback((amount: number) => {
    if (amount <= 0) return;
    setTotalStars((prev) => {
      const next = prev + amount;
      try {
        localStorage.setItem(STARS_STORAGE_KEY, String(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const [showRoman, setShowRoman] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(ROMAN_STORAGE_KEY);
      return saved ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleRoman = () => {
    setShowRoman((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(ROMAN_STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // --------------------------------------------------------------------------
  // 1. MATCH-THE-FOLLOWING STATE (Classic, 4-Card Blitz, Memory Flip)
  // --------------------------------------------------------------------------
  const [selectedCatId, setSelectedCatId] = useState<string>(() => {
    if (initialCategory && MATCH_CATEGORIES.some((c) => c.id === initialCategory)) {
      return initialCategory;
    }
    return MATCH_CATEGORIES[0].id;
  });

  const [filterMode, setFilterMode] = useState<GameLevelFilter>(() =>
    getMatchLevelForCategory(initialCategory)
  );

  const [matchPlayStyle, setMatchPlayStyle] = useState<MatchPlayStyle>('classic');
  // roundIndex === -1 means "All pairs at once", otherwise 0..totalRounds-1 (6 pairs per round)
  const [roundIndex, setRoundIndex] = useState<number>(0);

  const showPreschoolOnly = filterMode === 'level1';

  useEffect(() => {
    if (initialCategory && MATCH_CATEGORIES.some((c) => c.id === initialCategory)) {
      setSelectedCatId(initialCategory);
      setFilterMode(getMatchLevelForCategory(initialCategory));
    }
  }, [initialCategory]);

  const displayedCategories = useMemo(() => {
    if (filterMode === 'level1') {
      return MATCH_CATEGORIES.filter((c) => LEVEL1_MATCH_CAT_IDS.has(c.id));
    }
    if (filterMode === 'level2') {
      return MATCH_CATEGORIES.filter((c) => LEVEL2_MATCH_CAT_IDS.has(c.id));
    }
    if (filterMode === 'level3') {
      return MATCH_CATEGORIES.filter((c) => LEVEL3_MATCH_CAT_IDS.has(c.id));
    }
    return MATCH_CATEGORIES;
  }, [filterMode]);

  const switchMatchLevel = (nextLevel: GameLevelFilter) => {
    setFilterMode(nextLevel);
    const pool =
      nextLevel === 'level1'
        ? MATCH_CATEGORIES.filter((c) => LEVEL1_MATCH_CAT_IDS.has(c.id))
        : nextLevel === 'level2'
          ? MATCH_CATEGORIES.filter((c) => LEVEL2_MATCH_CAT_IDS.has(c.id))
          : nextLevel === 'level3'
            ? MATCH_CATEGORIES.filter((c) => LEVEL3_MATCH_CAT_IDS.has(c.id))
            : MATCH_CATEGORIES;
    if (pool.length > 0 && !pool.some((c) => c.id === selectedCatId)) {
      setSelectedCatId(pool[0].id);
    }
    soundEffects.playStrokeChime();
  };

  const activeCategory: MatchCategoryMetadata = useMemo(() => {
    return (
      MATCH_CATEGORIES.find((c) => c.id === selectedCatId) || displayedCategories[0] || MATCH_CATEGORIES[0]
    );
  }, [selectedCatId, displayedCategories]);

  const totalRounds = useMemo(
    () => Math.max(1, Math.ceil(activeCategory.pairs.length / PAIRS_PER_ROUND)),
    [activeCategory.pairs.length]
  );

  // Reset round to 0 when category changes
  useEffect(() => {
    setRoundIndex(0);
  }, [activeCategory.id]);

  const activeRoundPairs: MatchPairItem[] = useMemo(() => {
    if (roundIndex === -1 || activeCategory.pairs.length <= PAIRS_PER_ROUND) {
      return activeCategory.pairs;
    }
    const safeRound = Math.min(roundIndex, totalRounds - 1);
    const start = safeRound * PAIRS_PER_ROUND;
    return activeCategory.pairs.slice(start, start + PAIRS_PER_ROUND);
  }, [activeCategory, roundIndex, totalRounds]);

  // --- Classic Match State ---
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [errorPair, setErrorPair] = useState<{ leftId: string; rightId: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [shuffledEnglishItems, setShuffledEnglishItems] = useState<MatchPairItem[]>([]);

  useEffect(() => {
    setShuffledEnglishItems(shuffleArray(activeRoundPairs));
    setMatchedIds(new Set());
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setErrorPair(null);
  }, [activeRoundPairs]);

  const evaluateMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      if (showPreschoolOnly) {
        soundEffects.playCelebrationChime();
      } else {
        soundEffects.playSuccessDing();
      }
      setMatchedIds((prev) => {
        const next = new Set(prev);
        next.add(leftId);
        if (next.size === activeRoundPairs.length) {
          soundEffects.playVictoryFanfare();
          awardStars(3);
        }
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
      if (showPreschoolOnly) {
        soundEffects.playEncouragementDing();
      } else {
        soundEffects.playErrorBuzzer();
      }
      setErrorPair({ leftId, rightId });
      setStreak(0);
      setTimeout(() => {
        setErrorPair(null);
        setSelectedLeftId(null);
        setSelectedRightId(null);
      }, 650);
    }
  };

  const handleLeftClick = (item: MatchPairItem) => {
    if (matchedIds.has(item.id)) return;
    if (showPreschoolOnly) {
      soundEffects.playBubblePop();
    } else {
      soundEffects.playPuzzleSnap();
    }
    playPronunciation(item.sanskrit);
    setSelectedLeftId(item.id);

    if (selectedRightId) {
      evaluateMatch(item.id, selectedRightId);
    }
  };

  const handleRightClick = (item: MatchPairItem) => {
    if (matchedIds.has(item.id)) return;
    if (showPreschoolOnly) {
      soundEffects.playBubblePop();
    } else {
      soundEffects.playPuzzleSnap();
    }
    setSelectedRightId(item.id);

    if (selectedLeftId) {
      evaluateMatch(selectedLeftId, item.id);
    }
  };

  const handleResetMatchGame = () => {
    setMatchedIds(new Set());
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setErrorPair(null);
    setShuffledEnglishItems(shuffleArray(activeRoundPairs));
  };

  const handleNextCategory = () => {
    const list = displayedCategories.length > 0 ? displayedCategories : MATCH_CATEGORIES;
    const currentIndex = list.findIndex((c) => c.id === activeCategory.id);
    const nextIndex = (currentIndex + 1) % list.length;
    setSelectedCatId(list[nextIndex].id);
  };

  const isMatchRoundComplete =
    activeRoundPairs.length > 0 && matchedIds.size === activeRoundPairs.length;

  // --- 4-Card Audio Blitz State ---
  const [blitzTimed, setBlitzTimed] = useState<boolean>(false);
  const [blitzSecondsLeft, setBlitzSecondsLeft] = useState<number>(60);
  const [blitzFinished, setBlitzFinished] = useState<boolean>(false);
  const [blitzScore, setBlitzScore] = useState<number>(0);
  const [blitzStreak, setBlitzStreak] = useState<number>(0);
  const [blitzAnsweredCount, setBlitzAnsweredCount] = useState<number>(0);
  const [blitzFeedback, setBlitzFeedback] = useState<{ chosenId: string; correct: boolean } | null>(null);
  const [bestBlitzScore, setBestBlitzScore] = useState<number>(() => {
    try {
      return Math.max(0, Number(localStorage.getItem(BLITZ_BEST_STORAGE_KEY)) || 0);
    } catch {
      return 0;
    }
  });

  const buildBlitzQuestion = useCallback(
    (excludeId?: string): BlitzRoundQuestion => {
      const pool = activeCategory.pairs;
      const candidates = pool.length > 1 && excludeId ? pool.filter((p) => p.id !== excludeId) : pool;
      const target = candidates[Math.floor(Math.random() * candidates.length)] || pool[0];
      const distractors = shuffleArray(pool.filter((p) => p.id !== target.id)).slice(0, 3);
      return {
        target,
        options: shuffleArray([target, ...distractors]),
      };
    },
    [activeCategory.pairs]
  );

  const [blitzQuestion, setBlitzQuestion] = useState<BlitzRoundQuestion>(() => buildBlitzQuestion());

  const startFreshBlitz = useCallback(
    (timed: boolean) => {
      const q = buildBlitzQuestion();
      setBlitzQuestion(q);
      setBlitzTimed(timed);
      setBlitzSecondsLeft(60);
      setBlitzFinished(false);
      setBlitzScore(0);
      setBlitzStreak(0);
      setBlitzAnsweredCount(0);
      setBlitzFeedback(null);
    },
    [buildBlitzQuestion]
  );

  useEffect(() => {
    if (matchPlayStyle === 'blitz') {
      const q = buildBlitzQuestion();
      setBlitzQuestion(q);
      setBlitzSecondsLeft(60);
      setBlitzFinished(false);
      setBlitzScore(0);
      setBlitzStreak(0);
      setBlitzAnsweredCount(0);
      setBlitzFeedback(null);
      playPronunciation(q.target.sanskrit);
    }
  }, [activeCategory.id, matchPlayStyle, buildBlitzQuestion]);

  useEffect(() => {
    if (activeGameMode !== 'match' || matchPlayStyle !== 'blitz' || !blitzTimed || blitzFinished) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setBlitzSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setBlitzFinished(true);
          soundEffects.playVictoryFanfare();
          awardStars(4);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeGameMode, matchPlayStyle, blitzTimed, blitzFinished, awardStars]);

  const handleBlitzOptionClick = (opt: MatchPairItem) => {
    if (blitzFeedback || blitzFinished) return;
    const isRight = opt.id === blitzQuestion.target.id;
    setBlitzFeedback({ chosenId: opt.id, correct: isRight });

    if (isRight) {
      soundEffects.playSuccessDing();
      playPronunciation(blitzQuestion.target.sanskrit);
      const nextScore = blitzScore + 10 + blitzStreak * 3;
      setBlitzScore(nextScore);
      setBlitzStreak((s) => s + 1);
      setBlitzAnsweredCount((c) => {
        const nextCount = c + 1;
        if (!blitzTimed && nextCount % 8 === 0) {
          awardStars(3);
        }
        return nextCount;
      });
      if (nextScore > bestBlitzScore) {
        setBestBlitzScore(nextScore);
        try {
          localStorage.setItem(BLITZ_BEST_STORAGE_KEY, String(nextScore));
        } catch {
          // ignore
        }
      }
      setTimeout(() => {
        const nextQ = buildBlitzQuestion(blitzQuestion.target.id);
        setBlitzQuestion(nextQ);
        setBlitzFeedback(null);
        playPronunciation(nextQ.target.sanskrit);
      }, 550);
    } else {
      if (showPreschoolOnly) {
        soundEffects.playEncouragementDing();
      } else {
        soundEffects.playErrorBuzzer();
      }
      setBlitzStreak(0);
      setTimeout(() => {
        setBlitzFeedback(null);
      }, 650);
    }
  };

  // --- 12-Card Memory Flip State ---
  const [memoryDeck, setMemoryDeck] = useState<MemoryCardItem[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedMemoryPairs, setMatchedMemoryPairs] = useState<Set<string>>(new Set());
  const [memoryMoves, setMemoryMoves] = useState<number>(0);
  const [memoryLock, setMemoryLock] = useState<boolean>(false);

  const initMemoryBoard = useCallback(() => {
    const sourcePairs = activeRoundPairs.slice(0, 6);
    const cards: MemoryCardItem[] = [];
    sourcePairs.forEach((p) => {
      const roman = getRomanForItem(p);
      cards.push({
        uid: `${p.id}-sa`,
        pairId: p.id,
        side: 'sanskrit',
        sanskrit: p.sanskrit,
        english: p.english,
        transliteration: roman,
        emoji: p.emoji,
      });
      cards.push({
        uid: `${p.id}-en`,
        pairId: p.id,
        side: 'meaning',
        sanskrit: p.sanskrit,
        english: p.english,
        transliteration: roman,
        emoji: p.emoji,
      });
    });
    setMemoryDeck(shuffleArray(cards));
    setFlippedUids([]);
    setMatchedMemoryPairs(new Set());
    setMemoryMoves(0);
    setMemoryLock(false);
  }, [activeRoundPairs]);

  useEffect(() => {
    if (matchPlayStyle === 'memory') {
      initMemoryBoard();
    }
  }, [matchPlayStyle, initMemoryBoard]);

  const handleMemoryCardClick = (card: MemoryCardItem) => {
    if (memoryLock) return;
    if (matchedMemoryPairs.has(card.pairId)) return;
    if (flippedUids.includes(card.uid)) return;

    soundEffects.playBubblePop();
    if (card.side === 'sanskrit') {
      playPronunciation(card.sanskrit);
    }

    const nextFlipped = [...flippedUids, card.uid];
    setFlippedUids(nextFlipped);

    if (nextFlipped.length === 2) {
      setMemoryMoves((m) => m + 1);
      const firstCard = memoryDeck.find((c) => c.uid === nextFlipped[0]);
      if (firstCard && firstCard.pairId === card.pairId && firstCard.side !== card.side) {
        // Pair matched!
        soundEffects.playCelebrationChime();
        playPronunciation(card.sanskrit);
        const totalPairsInDeck = memoryDeck.length / 2;
        setMatchedMemoryPairs((prev) => {
          const next = new Set(prev);
          next.add(card.pairId);
          if (next.size === totalPairsInDeck) {
            soundEffects.playVictoryFanfare();
            awardStars(4);
          }
          return next;
        });
        setFlippedUids([]);
      } else {
        setMemoryLock(true);
        setTimeout(() => {
          setFlippedUids([]);
          setMemoryLock(false);
        }, 850);
      }
    }
  };

  const isMemoryComplete =
    memoryDeck.length > 0 && matchedMemoryPairs.size === memoryDeck.length / 2;

  // --------------------------------------------------------------------------
  // 2. WORD MAZE QUEST STATE (शब्द-व्यूहः)
  // --------------------------------------------------------------------------
  const [mazeAudienceFilter, setMazeAudienceFilter] = useState<GameLevelFilter>('level1');
  const [mazeDifficulty, setMazeDifficulty] = useState<MazeDifficulty>('guided');
  const [selectedQuestId, setSelectedQuestId] = useState<string>(WORD_MAZE_QUESTS[0].id);

  const displayedQuests = useMemo(() => {
    if (mazeAudienceFilter === 'level1') {
      return WORD_MAZE_QUESTS.filter((q) => LEVEL1_MAZE_IDS.has(q.id));
    }
    if (mazeAudienceFilter === 'level2') {
      return WORD_MAZE_QUESTS.filter((q) => LEVEL2_MAZE_IDS.has(q.id));
    }
    if (mazeAudienceFilter === 'level3') {
      return WORD_MAZE_QUESTS.filter((q) => LEVEL3_MAZE_IDS.has(q.id));
    }
    return WORD_MAZE_QUESTS;
  }, [mazeAudienceFilter]);

  const switchMazeLevel = (nextLevel: GameLevelFilter) => {
    setMazeAudienceFilter(nextLevel);
    if (nextLevel === 'level1' || nextLevel === 'level2') {
      setMazeDifficulty('guided');
    }
    const pool =
      nextLevel === 'level1'
        ? WORD_MAZE_QUESTS.filter((q) => LEVEL1_MAZE_IDS.has(q.id))
        : nextLevel === 'level2'
          ? WORD_MAZE_QUESTS.filter((q) => LEVEL2_MAZE_IDS.has(q.id))
          : nextLevel === 'level3'
            ? WORD_MAZE_QUESTS.filter((q) => LEVEL3_MAZE_IDS.has(q.id))
            : WORD_MAZE_QUESTS;
    if (pool.length > 0 && !pool.some((q) => q.id === selectedQuestId)) {
      setSelectedQuestId(pool[0].id);
    }
    soundEffects.playStrokeChime();
  };

  const activeQuest: WordMazeQuest = useMemo(() => {
    return (
      WORD_MAZE_QUESTS.find((q) => q.id === selectedQuestId) ||
      displayedQuests[0] ||
      WORD_MAZE_QUESTS[0]
    );
  }, [selectedQuestId, displayedQuests]);

  const isPreschoolMaze =
    activeQuest.audience === 'preschool' || PRESCHOOL_MAZE_IDS.has(activeQuest.id);

  const [currentMazeStep, setCurrentMazeStep] = useState<number>(1);
  const [steppedCells, setSteppedCells] = useState<MazeCell[]>([]);
  const [trapCell, setTrapCell] = useState<{ row: number; col: number } | null>(null);
  const [trapMessage, setTrapMessage] = useState<string | null>(null);
  const [hintedStep, setHintedStep] = useState<number | null>(null);

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

  useEffect(() => {
    setCurrentMazeStep(1);
    setSteppedCells([]);
    setTrapCell(null);
    setTrapMessage(null);
    setHintedStep(null);
  }, [activeQuest]);

  const totalPathSteps = useMemo(() => {
    return activeQuest.cells.filter((c) => c.isPath).length;
  }, [activeQuest]);

  const nextPathCell = useMemo(() => {
    return activeQuest.cells.find((c) => c.isPath && c.stepOrder === currentMazeStep) || null;
  }, [activeQuest, currentMazeStep]);

  const lastSteppedCell = steppedCells.length > 0 ? steppedCells[steppedCells.length - 1] : null;
  const isMazeCompleted = steppedCells.length >= totalPathSteps;

  const handleMazeCellClick = (cell: MazeCell) => {
    if (isMazeCompleted) return;

    if (cell.isPath && cell.stepOrder === currentMazeStep) {
      soundEffects.playPuzzleSnap();
      playPronunciation(cell.word);
      setSteppedCells((prev) => [...prev, cell]);
      setCurrentMazeStep((prev) => prev + 1);
      setTrapCell(null);
      setTrapMessage(null);
      setHintedStep(null);

      if (cell.stepOrder === totalPathSteps) {
        soundEffects.playVictoryFanfare();
        awardStars(5);
      }
    } else if (cell.isPath && (cell.stepOrder || 0) < currentMazeStep) {
      playPronunciation(cell.word);
    } else {
      if (isPreschoolMaze) {
        soundEffects.playEncouragementDing();
      } else {
        soundEffects.playErrorBuzzer();
      }
      setTrapCell({ row: cell.row, col: cell.col });
      const cleanTrans = cleanMazeGloss(cell.translation);
      if (lastSteppedCell) {
        const dist =
          Math.abs(cell.row - lastSteppedCell.row) + Math.abs(cell.col - lastSteppedCell.col);
        if (dist > 2 || Math.abs(cell.row - lastSteppedCell.row) > 1 || Math.abs(cell.col - lastSteppedCell.col) > 1) {
          setTrapMessage(
            `🧭 Hop to a neighboring tile right next to ${activeQuest.icon} "${lastSteppedCell.word}"!`
          );
        } else if (!cell.isPath) {
          setTrapMessage(
            `🙈 Oops! "${cell.word}" (${cleanTrans}) is an obstacle — try another neighboring word!`
          );
        } else {
          setTrapMessage(`⏳ Almost! "${cell.word}" comes later in the path — try another neighbor!`);
        }
      } else {
        setTrapMessage(`🚩 Start at the green "Start" tile (step #1) to begin the quest!`);
      }
      setTimeout(() => {
        setTrapCell(null);
      }, 1100);
    }
  };

  const handleResetMaze = () => {
    setCurrentMazeStep(1);
    setSteppedCells([]);
    setTrapCell(null);
    setTrapMessage(null);
    setHintedStep(null);
  };

  const handleHearNextMazeWord = () => {
    if (!nextPathCell) return;
    soundEffects.playStrokeChime();
    playPronunciation(nextPathCell.word);
  };

  const handleHintNextMazeStep = () => {
    if (!nextPathCell) return;
    soundEffects.playPuzzleSnap();
    setHintedStep(currentMazeStep);
    playPronunciation(nextPathCell.word);
  };

  const assembledStoryWords = steppedCells.map((c) => c.word).join(' ');

  return (
    <div className="sgh-shell">
      {/* 1. Hub Header */}
      <div className="sgh-header">
        <div className="sgh-header-left">
          <span className="sgh-om-badge" aria-hidden="true">🕉️</span>
          <div className="sgh-title-box">
            <h1>
              {activeGameMode === 'maze'
                ? 'शब्द-व्यूहः · Sanskrit Word Maze Quests'
                : 'युग्म-मेलनम् · Sanskrit Match & Memory Arcade'}
            </h1>
            <p>
              {activeGameMode === 'maze'
                ? 'Preschool Fruit & Counting Trails, Panchatantra Story Mazes, and Grammar Quests'
                : 'Classic Bite-Sized Pairs, 4-Card Audio Blitz, and 12-Card Memory Flip'}
            </p>
          </div>
        </div>

        <div className="sgh-header-controls">
          <span className="sgh-star-wallet" title="Stars earned across Sanskrit games">
            <span>⭐</span>
            <strong>{totalStars}</strong>
            <small>Stars</small>
          </span>

          <button
            type="button"
            className={`sgh-roman-toggle${showRoman ? ' is-on' : ''}`}
            onClick={toggleRoman}
            aria-pressed={showRoman}
            title="Show or hide Roman (IAST) pronunciation guide alongside Devanagari"
          >
            <span>🔤</span>
            <span>Roman: {showRoman ? 'ON' : 'OFF'}</span>
          </button>

          {!embeddedInBoard && (
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
                onClick={() => switchGameMode('match')}
                role="tab"
                aria-selected={activeGameMode === 'match'}
              >
                <span>🎯</span>
                <span>युग्म-मेलनम्</span>
              </button>
              <button
                type="button"
                className={`sgh-mode-btn${activeGameMode === 'maze' ? ' sgh-mode-btn--active' : ''}`}
                onClick={() => switchGameMode('maze')}
                role="tab"
                aria-selected={activeGameMode === 'maze'}
              >
                <span>🌀</span>
                <span>शब्द-व्यूहः</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ====================================================================
          VIEW 1: MATCH-THE-FOLLOWING & ARCADE (युग्म-मेलनम्)
          ==================================================================== */}
      {activeGameMode === 'match' && (
        <>
          {/* Progressive Level Filter Bar */}
          <div className="sgh-filter-bar" role="tablist" aria-label="Choose Match Game Level">
            <button
              type="button"
              role="tab"
              aria-selected={filterMode === 'level1'}
              className={`sgh-filter-chip sgh-filter-chip--preschool${filterMode === 'level1' ? ' sgh-filter-chip--active' : ''}`}
              onClick={() => switchMatchLevel('level1')}
            >
              <span>🌱 Level 1 · Starter &amp; Kids ({LEVEL1_MATCH_CAT_IDS.size})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filterMode === 'level2'}
              className={`sgh-filter-chip sgh-filter-chip--nextlevel${filterMode === 'level2' ? ' sgh-filter-chip--active' : ''}`}
              onClick={() => switchMatchLevel('level2')}
            >
              <span>🚀 Level 2 · Next Level Games ({LEVEL2_MATCH_CAT_IDS.size})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filterMode === 'level3'}
              className={`sgh-filter-chip sgh-filter-chip--deepakam${filterMode === 'level3' ? ' sgh-filter-chip--active' : ''}`}
              onClick={() => switchMatchLevel('level3')}
            >
              <span>🎓 Level 3 · Advanced &amp; Scholar ({LEVEL3_MATCH_CAT_IDS.size})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filterMode === 'all'}
              className={`sgh-filter-chip${filterMode === 'all' ? ' sgh-filter-chip--active' : ''}`}
              onClick={() => switchMatchLevel('all')}
            >
              <span>🌟 All ({MATCH_CATEGORIES.length})</span>
            </button>
          </div>

          {filterMode === 'level1' && (
            <div className="sgh-preschool-banner">
              <span className="spb-icon" aria-hidden="true">🌱</span>
              <div>
                <strong>स्तरः १ · Starter &amp; Kids Picture Play (Ages 3–7)</strong>
                <span>Gentle 6-card rounds with pictures &amp; spoken Sanskrit — animals, shapes, 1–10 counting, fruits, home &amp; family!</span>
              </div>
            </div>
          )}

          {filterMode === 'level2' && (
            <div className="sgh-nextlevel-banner">
              <span className="snb-icon" aria-hidden="true">🚀</span>
              <div>
                <strong>स्तरः २ · Next Level Games (Ages 8–12)</strong>
                <span>Step up to polite greetings, village professions, compass &amp; traffic directions, clock time, natural number symbols &amp; 3 genders!</span>
              </div>
            </div>
          )}

          {filterMode === 'level3' && (
            <div className="sgh-deepakam-banner">
              <span className="sdb-icon" aria-hidden="true">🎓</span>
              <div>
                <strong>स्तरः ३ · Advanced &amp; Scholar Games (Ages 12+ · Deepakam &amp; Śāstra)</strong>
                <span>Master past-present-future Lakāras, CBSE exam directives, Vāstu zones, Āyurveda herbs &amp; Class 7 Deepakam Vedic sciences!</span>
              </div>
            </div>
          )}

          {/* Category Selector Strip */}
          <div className="sgh-category-strip" role="tablist" aria-label="Vocabulary Categories">
            {displayedCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`sgh-cat-pill${activeCategory.id === cat.id ? ' sgh-cat-pill--active' : ''}`}
                onClick={() => setSelectedCatId(cat.id)}
                role="tab"
                aria-selected={activeCategory.id === cat.id}
                title={cat.description}
              >
                <span>{cat.icon}</span>
                <span>{cat.titleDev}</span>
              </button>
            ))}
          </div>

          {/* Match Arena Card */}
          <div className="sgh-arena-card">
            <div className="sgh-arena-header">
              <div className="sgh-arena-title-wrap">
                <span style={{ fontSize: '1.9rem', lineHeight: 1 }}>{activeCategory.icon}</span>
                <div>
                  <h2>{activeCategory.titleDev} · {activeCategory.titleEn}</h2>
                  <p className="sgh-arena-desc">{activeCategory.description}</p>
                </div>
              </div>

              {/* 3 Play Style Switcher Pills */}
              <div className="sgh-playstyle-tabs" role="tablist" aria-label="Play Styles">
                <button
                  type="button"
                  role="tab"
                  aria-selected={matchPlayStyle === 'classic'}
                  className={`sgh-playstyle-btn${matchPlayStyle === 'classic' ? ' is-active' : ''}`}
                  onClick={() => setMatchPlayStyle('classic')}
                >
                  🎯 Classic Match
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={matchPlayStyle === 'blitz'}
                  className={`sgh-playstyle-btn${matchPlayStyle === 'blitz' ? ' is-active' : ''}`}
                  onClick={() => setMatchPlayStyle('blitz')}
                >
                  ⚡ 4-Card Blitz
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={matchPlayStyle === 'memory'}
                  className={`sgh-playstyle-btn${matchPlayStyle === 'memory' ? ' is-active' : ''}`}
                  onClick={() => setMatchPlayStyle('memory')}
                >
                  🃏 Memory Flip
                </button>
              </div>
            </div>

            {/* Bite-Sized Round Selector Bar (for Classic & Memory when > 6 pairs) */}
            {matchPlayStyle !== 'blitz' && totalRounds > 1 && (
              <div className="sgh-round-bar" role="group" aria-label="Round Selector">
                <span className="sgh-round-label">📦 Bite-Sized Rounds:</span>
                <div className="sgh-round-pills">
                  {Array.from({ length: totalRounds }).map((_, idx) => {
                    const startNum = idx * PAIRS_PER_ROUND + 1;
                    const endNum = Math.min((idx + 1) * PAIRS_PER_ROUND, activeCategory.pairs.length);
                    return (
                      <button
                        key={`round-${idx}`}
                        type="button"
                        className={`sgh-round-pill${roundIndex === idx ? ' is-active' : ''}`}
                        onClick={() => setRoundIndex(idx)}
                      >
                        Round {idx + 1} <small>({startNum}–{endNum})</small>
                      </button>
                    );
                  })}
                  {matchPlayStyle === 'classic' && (
                    <button
                      type="button"
                      className={`sgh-round-pill${roundIndex === -1 ? ' is-active' : ''}`}
                      onClick={() => setRoundIndex(-1)}
                    >
                      All ({activeCategory.pairs.length})
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ==============================================================
                PLAY STYLE A: CLASSIC MATCH (Bite-Sized Two-Column Matching)
               ============================================================== */}
            {matchPlayStyle === 'classic' && (
              <>
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
                    <span>✅ Matched:</span>
                    <strong>{matchedIds.size} / {activeRoundPairs.length}</strong>
                  </span>
                  <button
                    type="button"
                    className="sanskrit-tool-btn"
                    onClick={handleResetMatchGame}
                    title="Reset and shuffle pairs"
                  >
                    <span>🔄</span>
                    <span>Shuffle</span>
                  </button>
                </div>

                {isMatchRoundComplete ? (
                  <div className="sgh-celebrate-box">
                    <span style={{ fontSize: '3rem' }}>🎉</span>
                    <h3 className="sgh-celebrate-title">
                      अति उत्तमम्! {roundIndex >= 0 && totalRounds > 1 ? `Round ${roundIndex + 1} Complete!` : 'All Pairs Matched!'} (+3 ⭐)
                    </h3>
                    <p className="sgh-celebrate-desc">
                      You matched all {activeRoundPairs.length} Sanskrit pairs in &ldquo;{activeCategory.titleDev}&rdquo; with a best streak of {bestStreak}!
                    </p>
                    <div className="sgh-celebrate-actions">
                      {roundIndex >= 0 && roundIndex + 1 < totalRounds && (
                        <button
                          type="button"
                          className="sgh-mode-btn sgh-mode-btn--active"
                          onClick={() => setRoundIndex(roundIndex + 1)}
                        >
                          <span>▶️ Next Round ({roundIndex + 2} / {totalRounds})</span>
                        </button>
                      )}
                      <button
                        type="button"
                        className="sgh-mode-btn"
                        style={{ background: '#059669', color: '#ffffff' }}
                        onClick={handleResetMatchGame}
                      >
                        <span>🔄 Replay Round</span>
                      </button>
                      <button
                        type="button"
                        className="sgh-mode-btn"
                        style={{ background: '#f59e0b', color: '#ffffff' }}
                        onClick={handleNextCategory}
                      >
                        <span>Next Category ➔</span>
                      </button>
                      {(filterMode === 'level1' || filterMode === 'level2') && (
                        <button
                          type="button"
                          className="sgh-mode-btn"
                          style={{ background: '#4f46e5', color: '#ffffff' }}
                          onClick={() => switchMatchLevel(filterMode === 'level1' ? 'level2' : 'level3')}
                        >
                          <span>
                            {filterMode === 'level1' ? '🚀 Next Level Games ➔' : '🎓 Scholar Level ➔'}
                          </span>
                        </button>
                      )}
                      <button
                        type="button"
                        className="sgh-mode-btn"
                        style={{ background: '#7c3aed', color: '#ffffff' }}
                        onClick={() => switchGameMode('maze')}
                      >
                        <span>Try Word Maze 🌀</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="sgh-match-grid">
                    {/* Left Column: Sanskrit Devanagari + Audio + Optional Roman */}
                    <div>
                      <div className="sgh-col-heading">
                        <span>🕉️</span>
                        <span>Sanskrit Terms (संस्कृत-पदानि) — Tap to Hear</span>
                      </div>
                      <div className="sgh-tiles-list">
                        {activeRoundPairs.map((item) => {
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
                              role="button"
                              tabIndex={isMatched ? -1 : 0}
                              aria-pressed={isSelected}
                              className={tileClass}
                              onClick={() => handleLeftClick(item)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleLeftClick(item);
                                }
                              }}
                            >
                              <div className="sgh-tile-left-stack">
                                <span className="sgh-tile-devanagari">{item.sanskrit}</span>
                                {showRoman && (
                                  <span className="sgh-tile-roman">{getRomanForItem(item)}</span>
                                )}
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

                    {/* Right Column: Emoji Picture + English Meanings (Shuffled) */}
                    <div>
                      <div className="sgh-col-heading">
                        <span>🎨</span>
                        <span>Pictures &amp; Meanings (चित्राणि अर्थाश्च)</span>
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
                            <button
                              key={`right-${item.id}`}
                              type="button"
                              aria-pressed={isSelected}
                              disabled={isMatched}
                              className={tileClass}
                              onClick={() => handleRightClick(item)}
                            >
                              <div className="sgh-tile-right-content">
                                {item.emoji && (
                                  <span className="sgh-tile-emoji" aria-hidden="true">{item.emoji}</span>
                                )}
                                <div className="sgh-tile-right-text">
                                  <span className="sgh-tile-english">{item.english}</span>
                                  {item.hint && (
                                    <span className="sgh-tile-hint">💡 {item.hint}</span>
                                  )}
                                </div>
                              </div>
                              {isMatched && <span className="sgh-tile-check">✓</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ==============================================================
                PLAY STYLE B: 4-CARD AUDIO BLITZ (द्रुत-चयनम्)
               ============================================================== */}
            {matchPlayStyle === 'blitz' && (
              <div className="sgh-blitz-stage">
                <div className="sgh-blitz-toolbar">
                  <div className="sgh-stats-row">
                    <span className="sgh-stat-chip">
                      <span>⚡ Score:</span>
                      <strong>{blitzScore}</strong>
                    </span>
                    <span className="sgh-stat-chip">
                      <span>🔥 Combo:</span>
                      <strong>{blitzStreak}x</strong>
                    </span>
                    <span className="sgh-stat-chip">
                      <span>🏅 Best:</span>
                      <strong>{bestBlitzScore}</strong>
                    </span>
                    {blitzTimed && (
                      <span className={`sgh-stat-chip sgh-stat-chip--timer${blitzSecondsLeft <= 10 ? ' is-urgent' : ''}`}>
                        <span>⏱️ Time:</span>
                        <strong>{blitzSecondsLeft}s</strong>
                      </span>
                    )}
                  </div>

                  <div className="sgh-blitz-mode-btns">
                    <button
                      type="button"
                      className={`sgh-round-pill${!blitzTimed ? ' is-active' : ''}`}
                      onClick={() => startFreshBlitz(false)}
                    >
                      🌿 Relaxed Practice
                    </button>
                    <button
                      type="button"
                      className={`sgh-round-pill${blitzTimed ? ' is-active' : ''}`}
                      onClick={() => startFreshBlitz(true)}
                    >
                      ⏱️ 60s Blitz Sprint
                    </button>
                  </div>
                </div>

                {blitzFinished ? (
                  <div className="sgh-celebrate-box">
                    <span style={{ fontSize: '3rem' }}>⚡</span>
                    <h3 className="sgh-celebrate-title">समयः समाप्तः! 60s Blitz Complete! (+4 ⭐)</h3>
                    <p className="sgh-celebrate-desc">
                      You scored <strong>{blitzScore}</strong> points across <strong>{blitzAnsweredCount}</strong> Sanskrit words in &ldquo;{activeCategory.titleDev}&rdquo;!
                    </p>
                    <div className="sgh-celebrate-actions">
                      <button
                        type="button"
                        className="sgh-mode-btn sgh-mode-btn--active"
                        onClick={() => startFreshBlitz(true)}
                      >
                        <span>⚡ Play 60s Sprint Again</span>
                      </button>
                      <button
                        type="button"
                        className="sgh-mode-btn"
                        style={{ background: '#059669', color: '#ffffff' }}
                        onClick={() => startFreshBlitz(false)}
                      >
                        <span>🌿 Switch to Relaxed</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="sgh-blitz-prompt-card">
                      <span className="sgh-blitz-eyebrow">LISTEN &amp; TAP THE RIGHT MEANING</span>
                      <div className="sgh-blitz-word-row">
                        <span className="sgh-blitz-sanskrit">{blitzQuestion.target.sanskrit}</span>
                        <button
                          type="button"
                          className="sgh-blitz-speak-btn"
                          onClick={() => playPronunciation(blitzQuestion.target.sanskrit)}
                          title="Hear Sanskrit pronunciation"
                        >
                          🔊 Hear Word
                        </button>
                      </div>
                      {showRoman && (
                        <span className="sgh-blitz-roman">{getRomanForItem(blitzQuestion.target)}</span>
                      )}
                    </div>

                    <div className="sgh-blitz-options-grid">
                      {blitzQuestion.options.map((opt) => {
                        const isPicked = blitzFeedback?.chosenId === opt.id;
                        let cardClass = 'sgh-blitz-option-card';
                        if (isPicked && blitzFeedback?.correct) cardClass += ' is-correct';
                        else if (isPicked && !blitzFeedback?.correct) cardClass += ' is-wrong';

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            className={cardClass}
                            onClick={() => handleBlitzOptionClick(opt)}
                          >
                            {opt.emoji && <span className="sgh-blitz-opt-emoji">{opt.emoji}</span>}
                            <span className="sgh-blitz-opt-eng">{opt.english}</span>
                            {opt.hint && <small className="sgh-blitz-opt-hint">{opt.hint}</small>}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ==============================================================
                PLAY STYLE C: 12-CARD MEMORY FLIP (स्मृति-पटलम्)
               ============================================================== */}
            {matchPlayStyle === 'memory' && (
              <div className="sgh-memory-stage">
                <div className="sgh-stats-row">
                  <span className="sgh-stat-chip">
                    <span>🃏 Pairs Found:</span>
                    <strong>{matchedMemoryPairs.size} / {memoryDeck.length / 2}</strong>
                  </span>
                  <span className="sgh-stat-chip">
                    <span>👆 Moves:</span>
                    <strong>{memoryMoves}</strong>
                  </span>
                  <button
                    type="button"
                    className="sanskrit-tool-btn"
                    onClick={initMemoryBoard}
                    title="Shuffle and deal a fresh Memory Flip board"
                  >
                    <span>🔄</span>
                    <span>New Deal</span>
                  </button>
                </div>

                {isMemoryComplete ? (
                  <div className="sgh-celebrate-box">
                    <span style={{ fontSize: '3rem' }}>🃏</span>
                    <h3 className="sgh-celebrate-title">अद्भुत-स्मृतिः! Memory Board Cleared! (+4 ⭐)</h3>
                    <p className="sgh-celebrate-desc">
                      You matched all {memoryDeck.length / 2} Sanskrit &amp; Picture pairs in just <strong>{memoryMoves}</strong> moves!
                    </p>
                    <div className="sgh-celebrate-actions">
                      {roundIndex >= 0 && roundIndex + 1 < totalRounds && (
                        <button
                          type="button"
                          className="sgh-mode-btn sgh-mode-btn--active"
                          onClick={() => setRoundIndex(roundIndex + 1)}
                        >
                          <span>▶️ Next Round ({roundIndex + 2} / {totalRounds})</span>
                        </button>
                      )}
                      <button
                        type="button"
                        className="sgh-mode-btn"
                        style={{ background: '#059669', color: '#ffffff' }}
                        onClick={initMemoryBoard}
                      >
                        <span>🔄 Play Again</span>
                      </button>
                      {(filterMode === 'level1' || filterMode === 'level2') && (
                        <button
                          type="button"
                          className="sgh-mode-btn"
                          style={{ background: '#4f46e5', color: '#ffffff' }}
                          onClick={() => switchMatchLevel(filterMode === 'level1' ? 'level2' : 'level3')}
                        >
                          <span>
                            {filterMode === 'level1' ? '🚀 Next Level Games ➔' : '🎓 Scholar Level ➔'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="sgh-memory-grid">
                    {memoryDeck.map((card) => {
                      const isMatched = matchedMemoryPairs.has(card.pairId);
                      const isFlipped = isMatched || flippedUids.includes(card.uid);

                      return (
                        <button
                          key={card.uid}
                          type="button"
                          className={`sgh-memory-card${isFlipped ? ' is-flipped' : ''}${isMatched ? ' is-matched' : ''}`}
                          onClick={() => handleMemoryCardClick(card)}
                          aria-label={isFlipped ? `${card.sanskrit} ${card.english}` : 'Hidden memory card'}
                        >
                          {isFlipped ? (
                            card.side === 'sanskrit' ? (
                              <div className="sgh-mem-face sgh-mem-face--sa">
                                <span className="sgh-mem-badge">🕉️ संस्कृतम्</span>
                                <span className="sgh-mem-sa-word">{card.sanskrit}</span>
                                {showRoman && (
                                  <span className="sgh-mem-roman">{card.transliteration}</span>
                                )}
                              </div>
                            ) : (
                              <div className="sgh-mem-face sgh-mem-face--en">
                                {card.emoji && <span className="sgh-mem-emoji">{card.emoji}</span>}
                                <span className="sgh-mem-en-word">{card.english}</span>
                              </div>
                            )
                          ) : (
                            <div className="sgh-mem-back">
                              <span className="sgh-mem-lotus" aria-hidden="true">🪷</span>
                              <span className="sgh-mem-tap">Tap to Flip</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
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
          {/* Progressive Maze Level Filter Bar */}
          <div className="sgh-filter-bar" role="tablist" aria-label="Choose Maze Level">
            <button
              type="button"
              role="tab"
              aria-selected={mazeAudienceFilter === 'level1'}
              className={`sgh-filter-chip sgh-filter-chip--preschool${mazeAudienceFilter === 'level1' ? ' sgh-filter-chip--active' : ''}`}
              onClick={() => switchMazeLevel('level1')}
            >
              <span>🌱 Level 1 · Starter Trails ({LEVEL1_MAZE_IDS.size})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mazeAudienceFilter === 'level2'}
              className={`sgh-filter-chip sgh-filter-chip--nextlevel${mazeAudienceFilter === 'level2' ? ' sgh-filter-chip--active' : ''}`}
              onClick={() => switchMazeLevel('level2')}
            >
              <span>🚀 Level 2 · Next Level Stories ({LEVEL2_MAZE_IDS.size})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mazeAudienceFilter === 'level3'}
              className={`sgh-filter-chip sgh-filter-chip--deepakam${mazeAudienceFilter === 'level3' ? ' sgh-filter-chip--active' : ''}`}
              onClick={() => switchMazeLevel('level3')}
            >
              <span>🎓 Level 3 · Advanced &amp; Scholar ({LEVEL3_MAZE_IDS.size})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mazeAudienceFilter === 'all'}
              className={`sgh-filter-chip${mazeAudienceFilter === 'all' ? ' sgh-filter-chip--active' : ''}`}
              onClick={() => switchMazeLevel('all')}
            >
              <span>🌟 All ({WORD_MAZE_QUESTS.length})</span>
            </button>
          </div>

          {/* Quest Selector Strip */}
          <div className="sgh-quest-strip" role="tablist" aria-label="Word Maze Quests">
            {displayedQuests.map((quest) => (
              <button
                key={quest.id}
                type="button"
                className={`sgh-quest-btn${activeQuest.id === quest.id ? ' sgh-quest-btn--active' : ''}`}
                onClick={() => setSelectedQuestId(quest.id)}
                role="tab"
                aria-selected={activeQuest.id === quest.id}
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
                <span style={{ fontSize: '2.1rem', lineHeight: 1 }}>{activeQuest.icon}</span>
                <div>
                  <h2>{activeQuest.titleDev} · {activeQuest.titleEn}</h2>
                  <p className="sgh-arena-desc">{activeQuest.missionObjective}</p>
                </div>
              </div>

              <div className="sgh-stats-row">
                <span className="sgh-stat-chip">
                  <span>👣 Steps:</span>
                  <strong>{steppedCells.length} / {totalPathSteps}</strong>
                </span>
                <button
                  type="button"
                  className="sanskrit-tool-btn"
                  onClick={handleResetMaze}
                  title="Reset maze progress"
                >
                  <span>🔄</span>
                  <span>Restart</span>
                </button>
              </div>
            </div>

            {/* Anti-Spoiler Difficulty & Audio Helper Bar */}
            <div className="sgh-maze-helper-bar">
              <div className="sgh-maze-diff-pills" role="group" aria-label="Maze Challenge Mode">
                <button
                  type="button"
                  className={`sgh-round-pill${mazeDifficulty === 'guided' ? ' is-active' : ''}`}
                  onClick={() => setMazeDifficulty('guided')}
                  title="Shows clean word meanings and highlights reachable adjacent cells"
                >
                  🧭 Guided Explorer
                </button>
                <button
                  type="button"
                  className={`sgh-round-pill${mazeDifficulty === 'scholar' ? ' is-active' : ''}`}
                  onClick={() => setMazeDifficulty('scholar')}
                  title="Hides English meanings on unvisited tiles for a pure Devanagari reading quest"
                >
                  🔥 Scholar (Devanagari Only)
                </button>
              </div>

              {!isMazeCompleted && nextPathCell && (
                <div className="sgh-maze-assist-btns">
                  <button
                    type="button"
                    className="sgh-assist-btn sgh-assist-btn--audio"
                    onClick={handleHearNextMazeWord}
                    title="Listen to the next Sanskrit word on the path and find it on the board!"
                  >
                    🔊 Hear Next Word
                  </button>
                  <button
                    type="button"
                    className="sgh-assist-btn sgh-assist-btn--hint"
                    onClick={handleHintNextMazeStep}
                    title="Highlight the next step if you get stuck"
                  >
                    💡 Hint Step #{currentMazeStep}
                  </button>
                </div>
              )}
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
                    <div className="sgh-traffic-canvas" role="region" aria-label="Crossroads Traffic Scene">
                      <div className="sgh-road-cross" aria-hidden="true" />
                      <div className="sgh-road-hcross" aria-hidden="true" />
                      <div className="sgh-zebra-crossing" aria-hidden="true" />

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

                      <div className="sgh-canvas-row">
                        <button
                          type="button"
                          className={`sgh-hotspot ${trafficHotspot?.word === 'ऋजु-मार्गेण अग्रे धावति' ? 'sgh-hotspot--active' : ''}`}
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
              <div className="sgh-mp-header-row">
                <div className="sgh-mp-label">
                  <span>📜</span>
                  <span>Assembled Sanskrit Trail ({steppedCells.length} / {totalPathSteps}):</span>
                </div>
                {(steppedCells.length > 0 || isMazeCompleted) && (
                  <button
                    type="button"
                    className="sgh-parchment-speak-btn"
                    onClick={() =>
                      playPronunciation(
                        isMazeCompleted ? activeQuest.fullSentenceOrStoryDev : assembledStoryWords
                      )
                    }
                  >
                    🔊 {isMazeCompleted ? 'Listen to Full Story' : 'Hear Progress'}
                  </button>
                )}
              </div>
              <p className="sgh-mp-text">
                {assembledStoryWords ? (
                  assembledStoryWords
                ) : (
                  <span style={{ color: '#b45309', opacity: 0.78, fontStyle: 'italic', fontSize: '0.98rem' }}>
                    Tap the pulsing 🚩 Start tile (step #1) to begin your quest, then step onto adjacent Sanskrit tiles!
                  </span>
                )}
              </p>
              {isMazeCompleted && (
                <p className="sgh-mp-sub">
                  Meaning: {activeQuest.fullSentenceOrStoryEn}
                </p>
              )}
            </div>

            {/* Trap / Direction Warning Alert */}
            {trapMessage && (
              <div className="sgh-trap-alert" role="status">
                {trapMessage}
              </div>
            )}

            {/* Completion Banner */}
            {isMazeCompleted && (
              <div className="sgh-celebrate-box">
                <span style={{ fontSize: '3rem' }}>🏆</span>
                <h3 className="sgh-celebrate-title">व्यूह-विजयः! Maze Quest Completed! (+5 ⭐)</h3>
                <p className="sgh-celebrate-desc">
                  Outstanding! You navigated all {totalPathSteps} Sanskrit steps without getting trapped!
                </p>
                {activeQuest.moral && (
                  <div className="sgh-moral-card">
                    <strong style={{ color: '#065f46' }}>💡 नीति-वचनम् (Moral): </strong>
                    <span style={{ color: '#166534', fontWeight: 600 }}>{activeQuest.moral}</span>
                  </div>
                )}
                <div className="sgh-celebrate-actions">
                  <button
                    type="button"
                    className="sgh-mode-btn"
                    style={{ background: '#059669', color: '#ffffff' }}
                    onClick={() => playPronunciation(activeQuest.fullSentenceOrStoryDev)}
                  >
                    <span>🔊 Hear Full Sanskrit Story</span>
                  </button>
                  <button
                    type="button"
                    className="sgh-mode-btn sgh-mode-btn--active"
                    onClick={handleResetMaze}
                  >
                    <span>🔄 Replay Quest</span>
                  </button>
                  <button
                    type="button"
                    className="sgh-mode-btn"
                    style={{ background: '#f59e0b', color: '#ffffff' }}
                    onClick={() => {
                      const list = displayedQuests.length > 0 ? displayedQuests : WORD_MAZE_QUESTS;
                      const curIdx = list.findIndex((q) => q.id === activeQuest.id);
                      const nxt = (curIdx + 1) % list.length;
                      setSelectedQuestId(list[nxt].id);
                    }}
                  >
                    <span>Next Quest ➔</span>
                  </button>
                  {(mazeAudienceFilter === 'level1' || mazeAudienceFilter === 'level2') && (
                    <button
                      type="button"
                      className="sgh-mode-btn"
                      style={{ background: '#4f46e5', color: '#ffffff' }}
                      onClick={() => switchMazeLevel(mazeAudienceFilter === 'level1' ? 'level2' : 'level3')}
                    >
                      <span>
                        {mazeAudienceFilter === 'level1' ? '🚀 Next Level Mazes ➔' : '🎓 Scholar Mazes ➔'}
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    className="sgh-mode-btn"
                    style={{ background: '#7c3aed', color: '#ffffff' }}
                    onClick={() => switchGameMode('match')}
                  >
                    <span>Play Match &amp; Flip 🎯</span>
                  </button>
                </div>
              </div>
            )}

            {/* Interactive Anti-Spoiler Maze Grid */}
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
                  const isAvatarHere =
                    lastSteppedCell?.row === cell.row && lastSteppedCell?.col === cell.col;
                  const isStartEntrance =
                    steppedCells.length === 0 && cell.isPath && cell.stepOrder === 1;
                  const isHinted =
                    hintedStep !== null && cell.isPath && cell.stepOrder === hintedStep;
                  const isReachableNeighbor =
                    mazeDifficulty === 'guided' &&
                    !isMazeCompleted &&
                    !isStepped &&
                    lastSteppedCell !== null &&
                    Math.abs(cell.row - lastSteppedCell.row) <= 1 &&
                    Math.abs(cell.col - lastSteppedCell.col) <= 1;
                  const isTrap = trapCell?.row === cell.row && trapCell?.col === cell.col;

                  let cellClass = 'sgh-maze-cell';
                  if (isStepped) cellClass += ' sgh-maze-cell--stepped';
                  if (isAvatarHere) cellClass += ' sgh-maze-cell--avatar';
                  if (isStartEntrance || isHinted) cellClass += ' sgh-maze-cell--current';
                  else if (isTrap) cellClass += ' sgh-maze-cell--trap';
                  else if (isReachableNeighbor) cellClass += ' sgh-maze-cell--neighbor';

                  const cleanedGloss = cleanMazeGloss(cell.translation);
                  const showCellGloss = isStepped || mazeDifficulty === 'guided';

                  return (
                    <button
                      key={`cell-${cell.row}-${cell.col}`}
                      type="button"
                      className={cellClass}
                      onClick={() => handleMazeCellClick(cell)}
                      title={showCellGloss ? `${cell.word} — ${cleanedGloss}` : cell.word}
                    >
                      {isStepped && cell.stepOrder && (
                        <span className="sgh-step-badge sgh-step-badge--done">
                          {isAvatarHere ? `${activeQuest.icon}${cell.stepOrder}` : `✓${cell.stepOrder}`}
                        </span>
                      )}
                      {cell.stepOrder === 1 && !isStepped && (
                        <span className="sgh-step-badge sgh-step-badge--pill" style={{ background: '#10b981' }}>
                          🚩 Start
                        </span>
                      )}
                      {cell.stepOrder === totalPathSteps && !isStepped && (
                        <span className="sgh-step-badge sgh-step-badge--pill" style={{ background: '#d97706' }}>
                          🏆 Goal
                        </span>
                      )}

                      <span className="sgh-mc-word">{cell.word}</span>
                      {showRoman && (
                        <span className="sgh-mc-roman">{devanagariToIast(cell.word)}</span>
                      )}
                      <span className="sgh-mc-trans">
                        {showCellGloss ? cleanedGloss : '•••'}
                      </span>
                    </button>
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
