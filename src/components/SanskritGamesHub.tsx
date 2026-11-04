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
import { playPronunciation, speakAsBodhi } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import { devanagariToIast } from '../utils/devanagariToIast';
import '../styles/sanskrit-games.css';

export interface SanskritGamesHubProps {
  initialMode?: 'match' | 'maze' | 'prahelika';
  initialCategory?: string;
  onGoBack?: () => void;
  onModeChange?: (mode: 'match' | 'maze' | 'prahelika') => void;
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
  'cat_animals_birds',
  'cat_shapes_seasons',
  'cat_preschool_numbers',
  'fruits_veg',
  'relationships',
  'vehicles',
  'actions',
]);

const LEVEL2_MATCH_CAT_IDS = new Set([
  'cat_vahanas',
  'household',
  'insects',
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
  'maze_preschool_animal_friends',
  'maze_preschool_numbers_1_10',
]);

const LEVEL2_MAZE_IDS = new Set([
  'maze_identify_fruits_veg',
  'maze_identify_verbs',
  'maze_thirsty_crow',
  'maze_lion_mouse',
]);

const LEVEL3_MAZE_IDS = new Set([
  'maze_tenses_seq',
  'maze_traffic_rescue',
  'maze_srishti_krama',
]);

interface GaneshaTreatItem {
  stepOrder: number;
  wordDev: string;
  wordEn: string;
  icon: string;
  iast: string;
  isModak?: boolean;
}

const GANESHA_TREATS: GaneshaTreatItem[] = [
  { stepOrder: 1, wordDev: 'आम्रम्', wordEn: 'Mango', icon: '🥭', iast: 'āmram' },
  { stepOrder: 2, wordDev: 'कदलीफलम्', wordEn: 'Banana', icon: '🍌', iast: 'kadalīphalam' },
  { stepOrder: 3, wordDev: 'सेवम्', wordEn: 'Apple', icon: '🍎', iast: 'sevam' },
  { stepOrder: 4, wordDev: 'द्राक्षा', wordEn: 'Grapes', icon: '🍇', iast: 'drākṣā' },
  { stepOrder: 5, wordDev: 'नारङ्गम्', wordEn: 'Orange', icon: '🍊', iast: 'nāraṅgam' },
  { stepOrder: 6, wordDev: 'दाडिमम्', wordEn: 'Pomegranate', icon: '❤️', iast: 'dāḍimam' },
  { stepOrder: 7, wordDev: 'मोदकः', wordEn: 'Sweet Modak', icon: '🥟', iast: 'modakaḥ', isModak: true },
];

function getMatchLevelForCategory(catId?: string): GameLevelFilter {
  if (!catId) return 'level1';
  if (LEVEL3_MATCH_CAT_IDS.has(catId)) return 'level3';
  if (LEVEL2_MATCH_CAT_IDS.has(catId)) return 'level2';
  return 'level1';
}

export type PlayerAvatar = 'bodhi' | 'ganesha' | 'archer' | 'scout';

export interface AvatarMeta {
  id: PlayerAvatar;
  name: string;
  sanskrit: string;
  icon: string;
  desc: string;
}

export const AVATARS: Record<PlayerAvatar, AvatarMeta> = {
  bodhi: {
    id: 'bodhi',
    name: 'Bodhi',
    sanskrit: 'ऋषि-कुमारः',
    icon: '🧙‍♂️',
    desc: 'Wise young Sanskrit seeker from the Gurukul',
  },
  ganesha: {
    id: 'ganesha',
    name: 'Ganesha',
    sanskrit: 'बाल-गणेशः',
    icon: '🐘',
    desc: 'Loving elephant god seeking sweet treats & Modak',
  },
  archer: {
    id: 'archer',
    name: 'Prince Rama',
    sanskrit: 'वीर-धनुर्धरः',
    icon: '🏹',
    desc: 'Courageous hero of the forest trail',
  },
  scout: {
    id: 'scout',
    name: 'Vanachara',
    sanskrit: 'वनचरः',
    icon: '🦁',
    desc: 'Agile forest tracker befriending animals',
  },
};

export type TrailTheme = 'temple' | 'jungle' | 'grove' | 'cosmic';

export interface ThemeMeta {
  id: TrailTheme;
  name: string;
  sanskrit: string;
  icon: string;
}

export const TRAIL_THEMES: Record<TrailTheme, ThemeMeta> = {
  temple: {
    id: 'temple',
    name: 'Ancient Temple',
    sanskrit: 'प्राचीन-देवालयः',
    icon: '🛕',
  },
  jungle: {
    id: 'jungle',
    name: 'Dense Jungle',
    sanskrit: 'गहन-काननम्',
    icon: '🌴',
  },
  grove: {
    id: 'grove',
    name: 'Tapovan Grove',
    sanskrit: 'तपोवन-कुटीरम्',
    icon: '🪷',
  },
  cosmic: {
    id: 'cosmic',
    name: 'Starlit Cosmic',
    sanskrit: 'नक्षत्र-लोकः',
    icon: '🌌',
  },
};

export function formatTime(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function getSpeedrunRank(sec: number): { rank: string; badge: string; color: string } {
  if (sec <= 20) return { rank: 'S-Rank Legendary', badge: '⚡ S-Rank', color: '#f59e0b' };
  if (sec <= 38) return { rank: 'A-Rank Master', badge: '🥇 A-Rank', color: '#10b981' };
  if (sec <= 60) return { rank: 'B-Rank Explorer', badge: '🥈 B-Rank', color: '#38bdf8' };
  return { rank: 'C-Rank Seeker', badge: '🥉 C-Rank', color: '#a855f7' };
}

export interface LootItem {
  type: 'coin' | 'gem' | 'scroll';
  icon: string;
  label: string;
  points: number;
}

export function getCellLoot(_questId: string, cell: MazeCell): LootItem | null {
  if (cell.isPath && (cell.stepOrder === 2 || cell.stepOrder === 5)) {
    return { type: 'coin', icon: '🪙', label: '+10 🪙 Gold Coin!', points: 10 };
  }
  if (cell.isPath && cell.stepOrder === 4) {
    return { type: 'gem', icon: '💎', label: '+25 💎 Mani Gem!', points: 25 };
  }
  if (cell.isPath && cell.stepOrder === 6) {
    return { type: 'scroll', icon: '📜', label: '+50 📜 Sacred Lore Scroll!', points: 50 };
  }
  return null;
}

export function getCellVisual(
  word: string,
  translation: string,
  isPath: boolean
): { icon: string; category: 'fruit' | 'animal' | 'trap' | 'sacred' | 'nature' | 'action' } {
  const emojiMatch = translation.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u);
  let icon = emojiMatch ? emojiMatch[1] : '';

  if (!icon) {
    if (/आम्र/i.test(word)) icon = '🥭';
    else if (/कदली/i.test(word)) icon = '🍌';
    else if (/सेव/i.test(word)) icon = '🍎';
    else if (/द्राक्षा/i.test(word)) icon = '🍇';
    else if (/नारङ्ग/i.test(word)) icon = '🍊';
    else if (/दाडिम/i.test(word)) icon = '❤️';
    else if (/मोदक/i.test(word)) icon = '🥟';
    else if (/गणेश/i.test(word)) icon = '🐘';
    else if (/धेनु/i.test(word)) icon = '🐮';
    else if (/श्वा|श्वान/i.test(word)) icon = '🐶';
    else if (/बिडाल/i.test(word)) icon = '🐱';
    else if (/मूषक/i.test(word)) icon = '🐭';
    else if (/वानर/i.test(word)) icon = '🐒';
    else if (/मयूर/i.test(word)) icon = '🦚';
    else if (/गज/i.test(word)) icon = '🐘';
    else if (/सिंह/i.test(word)) icon = '🦁';
    else if (/काक/i.test(word)) icon = '🦅';
    else if (/घट/i.test(word)) icon = '🏺';
    else if (/जल/i.test(word)) icon = '💧';
    else if (/पिब/i.test(word)) icon = '🥤';
    else if (/पाषाण/i.test(word)) icon = '🪨';
    else if (/उपानह/i.test(word)) icon = '👟';
    else if (/कन्दुक/i.test(word)) icon = '⚽';
    else if (/सम्मार्जनी/i.test(word)) icon = '🧹';
    else if (/घटी/i.test(word)) icon = '⏰';
    else if (/ताल/i.test(word)) icon = '🔒';
    else if (/चक्र/i.test(word)) icon = '🛞';
    else if (/छत्र/i.test(word)) icon = '☂️';
    else if (/दीपक/i.test(word)) icon = '🪔';
    else if (/वृक्ष/i.test(word)) icon = '🌳';
    else if (/पुष्प/i.test(word)) icon = '🌸';
    else if (/आकाश/i.test(word)) icon = '🌌';
    else if (/सूर्य/i.test(word)) icon = '☀️';
    else if (/चन्द्र/i.test(word)) icon = '🌙';
    else if (/वायु/i.test(word)) icon = '💨';
    else if (/अग्नि/i.test(word)) icon = '🔥';
    else if (/भूमि/i.test(word)) icon = '🌍';
    else if (/बालक/i.test(word)) icon = '👦';
    else if (/चिकित्सा/i.test(word)) icon = '🏥';
    else if (/वाहन/i.test(word)) icon = '🚗';
    else if (/साहाय्य/i.test(word)) icon = '🤝';
    else if (/पठ/i.test(word)) icon = '📖';
    else if (/लिख/i.test(word)) icon = '✍️';
    else if (/खाद/i.test(word)) icon = '🍽️';
    else if (/गच्छ/i.test(word)) icon = '🚶';
    else icon = isPath ? '✨' : '⚠️';
  }

  let category: 'fruit' | 'animal' | 'trap' | 'sacred' | 'nature' | 'action' = 'nature';
  if (/आम्र|कदली|सेव|द्राक्षा|नारङ्ग|दाडिम|मोदक|फल|शाक|पलाण्डु|मूलक/i.test(word)) {
    category = 'fruit';
  } else if (/धेनु|श्वा|बिडाल|मूषक|वानर|मयूर|गज|सिंह|काक|मृग|व्याघ्र|शशक|पशु/i.test(word)) {
    category = 'animal';
  } else if (/गणेश|शिव|विष्णु|राम|कृष्ण|ऋषि|सूर्य|चन्द्र|दीपक/i.test(word)) {
    category = 'sacred';
  } else if (!isPath || /पाषाण|उपानह|कन्दुक|सम्मार्जनी|घटी|ताल|चक्र|छत्र/i.test(word)) {
    category = isPath ? 'nature' : 'trap';
  } else if (/पठ|लिख|खाद|पिब|गच्छ|धाव्|क्रीड्|अस्ति|भवति|करोति/i.test(word)) {
    category = 'action';
  }

  return { icon, category };
}

export const SanskritGamesHub: React.FC<SanskritGamesHubProps> = ({
  initialMode = 'match',
  initialCategory,
  onGoBack,
  onModeChange,
  embeddedInBoard = false,
}) => {
  const [activeGameMode, setActiveGameMode] = useState<'match' | 'maze'>(
    initialMode === 'maze' ? 'maze' : 'match'
  );

  useEffect(() => {
    if (initialMode === 'match' || initialMode === 'maze') {
      setActiveGameMode(initialMode);
    }
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

  // Gamified RPG Fantasy Quest States
  const [selectedAvatar, setSelectedAvatar] = useState<PlayerAvatar>('bodhi');
  const [questTheme, setQuestTheme] = useState<TrailTheme>('temple');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('sgh_trail_dark_mode') === 'true';
      } catch {}
    }
    return false;
  });
  const [fogOfWar, setFogOfWar] = useState<boolean>(false);
  const [rpgMode, setRpgMode] = useState<'hero' | 'casual'>('hero');
  const [hearts, setHearts] = useState<number>(3);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [collectedLootIds, setCollectedLootIds] = useState<Set<string>>(new Set());
  const [lootScores, setLootScores] = useState<{ coins: number; gems: number; scrolls: number }>({
    coins: 0,
    gems: 0,
    scrolls: 0,
  });
  const [floatingLootToast, setFloatingLootToast] = useState<{
    id: number;
    icon: string;
    label: string;
  } | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showQuestVictoryModal, setShowQuestVictoryModal] = useState<boolean>(false);

  const speedrunRank = useMemo(() => getSpeedrunRank(timerSeconds), [timerSeconds]);

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
    setHearts(3);
    setIsGameOver(false);
    setShowQuestVictoryModal(false);
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setCollectedLootIds(new Set());
    setLootScores({ coins: 0, gems: 0, scrolls: 0 });

    // Intelligently default theme for the quest
    if (
      activeQuest.id === 'maze_preschool_animal_friends' ||
      activeQuest.id === 'maze_lion_mouse' ||
      activeQuest.id === 'maze_thirsty_crow'
    ) {
      setQuestTheme('jungle');
    } else if (
      activeQuest.id === 'maze_preschool_ganesha_fruits' ||
      activeQuest.id === 'maze_preschool_numbers_1_10'
    ) {
      setQuestTheme('temple');
    } else if (activeQuest.id === 'maze_srishti_krama') {
      setQuestTheme('cosmic');
    } else {
      setQuestTheme('grove');
    }
  }, [activeQuest]);

  const totalPathSteps = useMemo(() => {
    return activeQuest.cells.filter((c) => c.isPath).length;
  }, [activeQuest]);

  const nextPathCell = useMemo(() => {
    return activeQuest.cells.find((c) => c.isPath && c.stepOrder === currentMazeStep) || null;
  }, [activeQuest, currentMazeStep]);

  const lastSteppedCell = steppedCells.length > 0 ? steppedCells[steppedCells.length - 1] : null;
  const isMazeCompleted = steppedCells.length >= totalPathSteps;

  // Stopwatch timer ticker
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && !isMazeCompleted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isMazeCompleted]);

  const steppedOrders = useMemo(() => {
    return new Set(steppedCells.map((c) => c.stepOrder).filter(Boolean) as number[]);
  }, [steppedCells]);

  const isModakCollected = steppedOrders.has(7);
  const isGaneshaReached = steppedOrders.has(8);
  const steppedTreatCount = GANESHA_TREATS.filter((t) => steppedOrders.has(t.stepOrder)).length;

  const handleReplayGaneshaPrompt = () => {
    if (isGaneshaReached) {
      speakAsBodhi("Modakahasta Shri Ganesha! Baby Ganesha happily received his favourite sweet Modak in his hand! Om Gam Ganapataye Namah!", { lang: 'en' });
    } else if (isModakCollected) {
      speakAsBodhi("Sweet Modak collected! Now tap on Ganesha on the grid below to put the sweet Modak in Ganesha's hand!", { lang: 'en' });
    } else if (steppedCells.length > 0) {
      speakAsBodhi(`Delicious ${lastSteppedCell?.word || 'fruit'}! Keep following the sweet fruit trail to reach the Modak!`, { lang: 'en' });
    } else {
      speakAsBodhi("Baby Ganesha is hungry for sweet fruits and his favourite Modak! Step on the fruits on the grid to collect them!", { lang: 'en' });
    }
  };

  const handleMazeCellClick = (cell: MazeCell) => {
    if (isGameOver) return;
    if (isMazeCompleted) {
      playPronunciation(cell.word);
      return;
    }

    if (cell.isPath && cell.stepOrder === currentMazeStep) {
      if (!isTimerRunning && steppedCells.length === 0) {
        setIsTimerRunning(true);
      }
      soundEffects.playFootstepSoft();
      if (activeQuest.id === 'maze_preschool_ganesha_fruits') {
        soundEffects.playFruitHarvestPop();
      } else {
        soundEffects.playPuzzleSnap();
      }
      playPronunciation(cell.word);
      setSteppedCells((prev) => [...prev, cell]);
      setCurrentMazeStep((prev) => prev + 1);
      setTrapCell(null);
      setTrapMessage(null);
      setHintedStep(null);

      // Collectible Loot Pickup
      const cellLoot = getCellLoot(activeQuest.id, cell);
      if (cellLoot && !collectedLootIds.has(`${cell.row}-${cell.col}`)) {
        setCollectedLootIds((prev) => new Set(prev).add(`${cell.row}-${cell.col}`));
        setLootScores((prev) => ({
          coins: prev.coins + (cellLoot.type === 'coin' ? cellLoot.points : 0),
          gems: prev.gems + (cellLoot.type === 'gem' ? 1 : 0),
          scrolls: prev.scrolls + (cellLoot.type === 'scroll' ? 1 : 0),
        }));
        setFloatingLootToast({ id: Date.now(), icon: cellLoot.icon, label: cellLoot.label });
        soundEffects.playLootPickup();
        setTimeout(() => setFloatingLootToast(null), 1800);
      }

      if (fogOfWar) {
        soundEffects.playFogReveal();
      }

      if (activeQuest.id === 'maze_preschool_ganesha_fruits') {
        if (cell.stepOrder === 7) {
          // Sweet Modak is collected!
          soundEffects.playTempleBell();
          setTimeout(() => {
            speakAsBodhi("Sweet Modak collected! Now tap Ganesha on the grid below to complete the quest!", { lang: 'en' });
          }, 650);
        } else if (cell.stepOrder === 8) {
          // Final goal: Ganesha reached with Modak in hand!
          setIsTimerRunning(false);
          soundEffects.playVictoryFanfare();
          soundEffects.playRetro8BitVictory();
          awardStars(10);
          setTimeout(() => {
            speakAsBodhi("Modakahasta Shri Ganesha! Baby Ganesha happily received his favourite sweet Modak in his hand!", { lang: 'en' });
            setShowQuestVictoryModal(true);
          }, 700);
        }
      } else if (cell.stepOrder === totalPathSteps) {
        setIsTimerRunning(false);
        soundEffects.playVictoryFanfare();
        soundEffects.playRetro8BitVictory();
        if (
          activeQuest.id === 'maze_preschool_animal_friends' ||
          activeQuest.id === 'maze_lion_mouse' ||
          cell.word === 'सिंहः'
        ) {
          setTimeout(() => soundEffects.playLionRoar(), 900);
        }
        awardStars(10);
        setTimeout(() => setShowQuestVictoryModal(true), 600);
      }
    } else if (cell.isPath && (cell.stepOrder || 0) < currentMazeStep) {
      playPronunciation(cell.word);
    } else if (activeQuest.id === 'maze_preschool_ganesha_fruits' && cell.word === 'श्रीगणेशः' && currentMazeStep < 8) {
      soundEffects.playEncouragementDing();
      setTrapCell({ row: cell.row, col: cell.col });
      setTrapMessage(
        `🐘 Baby Ganesha is waiting for his treats! Collect all yummy fruits and the sweet Modak first, then bring them to Ganesha!`
      );
      setTimeout(() => setTrapCell(null), 1400);
    } else {
      if (rpgMode === 'hero') {
        soundEffects.playHeartDamage();
        setHearts((prev) => {
          const nextH = Math.max(0, prev - 1);
          if (nextH === 0) {
            setTimeout(() => setIsGameOver(true), 400);
          }
          return nextH;
        });
      } else if (isPreschoolMaze) {
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
    setHearts(3);
    setIsGameOver(false);
    setShowQuestVictoryModal(false);
    setTimerSeconds(0);
    setIsTimerRunning(false);
  };

  const handleNextQuest = () => {
    const currentIndex = WORD_MAZE_QUESTS.findIndex((q) => q.id === activeQuest.id);
    const nextQuest = WORD_MAZE_QUESTS[(currentIndex + 1) % WORD_MAZE_QUESTS.length];
    if (nextQuest) {
      setSelectedQuestId(nextQuest.id);
    }
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
              {onModeChange && (
                <button
                  type="button"
                  className="sgh-mode-btn"
                  onClick={() => {
                    soundEffects.playStrokeChime();
                    onModeChange('prahelika');
                  }}
                  title="Explore Classical Sanskrit Riddles (प्रहेलिकाः)"
                >
                  <span>📜</span>
                  <span>प्रहेलिकाः</span>
                </button>
              )}
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
                <span style={{ fontSize: '2.4rem', lineHeight: 1 }}>{activeQuest.icon}</span>
                <div>
                  <h2>{activeQuest.titleDev} · {activeQuest.titleEn}</h2>
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

            {/* Gamified RPG Fantasy Quest HUD */}
            <div className="sgh-trail-hud" role="region" aria-label="Quest HUD & Game Controls">
              {/* Group 1: Avatar & Health */}
              <div className="sgh-hud-group">
                <div className="sgh-hud-avatar-chip" title="Selected Hero Avatar">
                  <span className="sgh-hud-avatar-icon">{AVATARS[selectedAvatar].icon}</span>
                  <div className="sgh-hud-avatar-meta">
                    <span className="sgh-hud-avatar-name">{AVATARS[selectedAvatar].name}</span>
                    <span className="sgh-hud-avatar-sa">{AVATARS[selectedAvatar].sanskrit.split(' ')[0]}</span>
                  </div>
                  <div className="sgh-hud-avatar-switcher" role="group" aria-label="Choose Character Sprite">
                    {(Object.keys(AVATARS) as PlayerAvatar[]).map((avKey) => (
                      <button
                        key={avKey}
                        type="button"
                        className={`sgh-hud-av-btn${selectedAvatar === avKey ? ' is-selected' : ''}`}
                        onClick={() => {
                          setSelectedAvatar(avKey);
                          soundEffects.playStrokeChime();
                        }}
                        title={`${AVATARS[avKey].name} (${AVATARS[avKey].sanskrit})`}
                      >
                        {AVATARS[avKey].icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className="sgh-hud-hearts-card"
                  title={rpgMode === 'hero' ? `${hearts} of 3 Hearts remaining` : 'Casual Mode (Infinite Hearts)'}
                >
                  <div className="sgh-hud-hearts-row">
                    {rpgMode === 'hero' ? (
                      [1, 2, 3].map((hIndex) => (
                        <span
                          key={hIndex}
                          className={`sgh-heart-icon${hIndex <= hearts ? ' sgh-heart--active' : ' sgh-heart--broken'}`}
                        >
                          {hIndex <= hearts ? '❤️' : '💔'}
                        </span>
                      ))
                    ) : (
                      <span className="sgh-infinite-heart">💚 Casual (∞)</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="sgh-hud-mode-toggle"
                    onClick={() => {
                      setRpgMode((m) => (m === 'hero' ? 'casual' : 'hero'));
                      soundEffects.playStrokeChime();
                    }}
                    title="Switch between 3-Heart Hero Mode and Infinite Casual Mode"
                  >
                    {rpgMode === 'hero' ? '⚔️ Hero Mode' : '🌱 Casual Mode'}
                  </button>
                </div>
              </div>

              {/* Group 2: Loot Pouch & Speedrun Stopwatch */}
              <div className="sgh-hud-group sgh-hud-group--center">
                <div className="sgh-hud-loot-pouch" title="Collected Quest Loot">
                  <span className="sgh-loot-chip" title="Gold Coins (+10 XP)">
                    <span>🪙</span>
                    <strong>{lootScores.coins}</strong>
                  </span>
                  <span className="sgh-loot-chip" title="Vedic Gems (+25 XP)">
                    <span>💎</span>
                    <strong>{lootScores.gems}</strong>
                  </span>
                  <span className="sgh-loot-chip" title="Sacred Palm Scrolls (+50 XP)">
                    <span>📜</span>
                    <strong>{lootScores.scrolls}</strong>
                  </span>
                </div>

                <div className="sgh-hud-timer-chip" title="Speedrun Stopwatch">
                  <span className="sgh-timer-icon">⏱️</span>
                  <strong className="sgh-timer-val">{formatTime(timerSeconds)}</strong>
                  <span className="sgh-timer-rank" style={{ color: speedrunRank.color }}>
                    {speedrunRank.badge}
                  </span>
                </div>
              </div>

              {/* Group 3: Environment Theme, Fog of War & High-Contrast Dark Mode */}
              <div className="sgh-hud-group sgh-hud-group--controls">
                <button
                  type="button"
                  className={`sgh-hud-tool-btn${fogOfWar ? ' is-active' : ''}`}
                  onClick={() => {
                    setFogOfWar((f) => {
                      const next = !f;
                      if (next) soundEffects.playFogReveal();
                      else soundEffects.playStrokeChime();
                      return next;
                    });
                  }}
                  title="Fog of War: Hides tiles in mist until you step close"
                >
                  <span>🌫️ Fog</span>
                  <small>{fogOfWar ? 'ON' : 'OFF'}</small>
                </button>

                <div className="sgh-hud-theme-picker" role="group" aria-label="Select Map Theme">
                  {(Object.keys(TRAIL_THEMES) as TrailTheme[]).map((thmKey) => (
                    <button
                      key={thmKey}
                      type="button"
                      className={`sgh-theme-dot${questTheme === thmKey ? ' is-active' : ''}`}
                      onClick={() => {
                        setQuestTheme(thmKey);
                        soundEffects.playStrokeChime();
                      }}
                      title={`${TRAIL_THEMES[thmKey].name} (${TRAIL_THEMES[thmKey].sanskrit})`}
                    >
                      <span>{TRAIL_THEMES[thmKey].icon}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className={`sgh-hud-tool-btn sgh-dark-toggle${isDarkMode ? ' is-active' : ''}`}
                  onClick={() => {
                    setIsDarkMode((d) => {
                      const next = !d;
                      try {
                        localStorage.setItem('sgh_trail_dark_mode', String(next));
                      } catch {}
                      soundEffects.playStrokeChime();
                      return next;
                    });
                  }}
                  title="Toggle Cyber-Vedic High-Contrast Dark Theme with neon text borders"
                >
                  <span>{isDarkMode ? '☀️' : '🌙'}</span>
                  <small>{isDarkMode ? 'Light' : 'Dark'}</small>
                </button>
              </div>
            </div>

            {/* Prominent Mission Objective Callout with Large Font & Audio Button */}
            <div className="sgh-maze-mission-callout" role="region" aria-label="Mission Objective">
              <span className="sgh-maze-mission-icon" aria-hidden="true">🎯</span>
              <div className="sgh-maze-mission-body">
                <span className="sgh-maze-mission-tag">लक्ष्यम् · Mission Objective</span>
                <p className="sgh-maze-mission-text">{activeQuest.missionObjective}</p>
              </div>
              <button
                type="button"
                className="sgh-mission-audio-btn"
                onClick={() => speakAsBodhi(activeQuest.missionObjective, { lang: 'en' })}
                title="Listen to mission objective instructions"
                aria-label="Listen to mission objective"
              >
                <span>🔊 Listen</span>
              </button>
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
                {activeQuest.id === 'maze_preschool_ganesha_fruits' ? (
                  <div className="sgh-ganesha-celebrate-hero">
                    <div className="sgh-gch-avatar-wrap">
                      <img
                        src="/preschool/festivals/ganesha.webp"
                        alt="Modakahasta Ganesha"
                        className="sgh-gch-img"
                        width={120}
                        height={120}
                      />
                      <div className="sgh-gch-modak-overlay">
                        <span className="sgh-gch-modak">🥟</span>
                        <span className="sgh-gch-sparkles">✨🌟✨</span>
                      </div>
                    </div>
                    <h3 className="sgh-celebrate-title">🎉 मोदकहस्तः श्रीगणेशः प्रसन्नः जातः!</h3>
                    <p className="sgh-celebrate-desc">
                      Outstanding! Little Baby Ganesha is happily holding his sweet Modak in his hand (<strong>मोदकहस्तः</strong>)! You safely gathered all yummy fruits and offered the sweet Modak to Ganesha! (+5 ⭐)
                    </p>
                  </div>
                ) : (
                  <>
                    <span style={{ fontSize: '3rem' }}>🏆</span>
                    <h3 className="sgh-celebrate-title">व्यूह-विजयः! Maze Quest Completed! (+5 ⭐)</h3>
                    <p className="sgh-celebrate-desc">
                      Outstanding! You navigated all {totalPathSteps} Sanskrit steps without getting trapped!
                    </p>
                  </>
                )}
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

            {/* THEMED ARENA CANVAS (Temple Floor, Dense Jungle, Tapovan Grove, Starlit Cosmic, Dark Mode) */}
            <div
              className={`sgh-maze-arena-canvas sgh-theme-${questTheme}${isDarkMode ? ' sgh-trail--dark-mode' : ''}`}
            >
              {/* Floating Loot Collection Toast */}
              {floatingLootToast && (
                <div className="sgh-floating-loot-toast" key={floatingLootToast.id}>
                  <span className="sgh-flt-icon">{floatingLootToast.icon}</span>
                  <span className="sgh-flt-label">{floatingLootToast.label}</span>
                </div>
              )}

              {/* Interactive Ganesha Fruit & Modak Offering Stage (Preschool Special) */}
              {activeQuest.id === 'maze_preschool_ganesha_fruits' && (
                <div className="sgh-ganesha-stage" role="region" aria-label="Ganesha Fruit and Modak Feast Stage">
                  <div className="sgh-ganesha-stage-header">
                    {/* Ganesha Avatar with Modak in Hand overlay */}
                    <div className="sgh-ganesha-avatar-card">
                      <div className="sgh-ganesha-avatar-frame">
                        <img
                          src="/preschool/festivals/ganesha.webp"
                          alt="Baby Ganesha"
                          className="sgh-ganesha-img"
                          width={110}
                          height={110}
                        />
                        {isGaneshaReached ? (
                          <div className="sgh-ganesha-modak-hand" title="मोदकहस्तः · Sweet Modak in Ganesha's Hand!">
                            <span className="sgh-gmh-aura" aria-hidden="true" />
                            <span className="sgh-gmh-modak">🥟</span>
                            <span className="sgh-gmh-sparkle">✨</span>
                          </div>
                        ) : isModakCollected ? (
                          <div className="sgh-ganesha-waiting-hand" title="Waiting for you to tap Ganesha on the grid!">
                            <span className="sgh-gwh-badge">मोदकं देहि 🤲</span>
                          </div>
                        ) : (
                          <span className="sgh-ganesha-waiting-badge">क्षुधितः 🐘</span>
                        )}
                      </div>
                      <div className="sgh-ganesha-avatar-label">
                        {isGaneshaReached ? '🏆 मोदकहस्तः श्रीगणेशः' : '🐘 बाल-गणेशः (Baby Ganesha)'}
                      </div>
                    </div>

                    {/* Ganesha Speech & Dynamic Story Guidance */}
                    <div className="sgh-ganesha-speech-wrap">
                      <div className="sgh-ganesha-speech-bubble">
                        <div className="sgh-gsb-header">
                          <span className="sgh-gsb-speaker">🐘 श्रीगणेशः उवाच (Ganesha says):</span>
                          <button
                            type="button"
                            className="sgh-speech-audio-btn"
                            onClick={handleReplayGaneshaPrompt}
                            title="Hear Ganesha's voice guidance"
                            aria-label="Hear Ganesha's guidance"
                          >
                            🔊 Listen
                          </button>
                        </div>
                        <div className="sgh-gsb-text">
                          {isGaneshaReached ? (
                            <>
                              <strong>🎉 अहो मोदकहस्तः श्रीगणेशः! (Modakahasta!)</strong>
                              <p>
                                "Thank you, dear friend! I have happily received my favourite sweet Modak in my hand! 🥟🐘 ॐ गं गणपतये नमः!"
                              </p>
                            </>
                          ) : isModakCollected ? (
                            <>
                              <strong style={{ color: '#b45309' }}>🥟 अहो मोदकः प्राप्तः! (Sweet Modak Collected!)</strong>
                              <p className="sgh-gsb-highlight">
                                "You found my favourite Modak! Now tap <strong>[ श्रीगणेशः 🐘 ]</strong> on the grid below to put it in my hand!"
                              </p>
                            </>
                          ) : steppedCells.length > 0 ? (
                            <>
                              <strong>😋 अतिस्वादिष्टम्! (Delicious {lastSteppedCell?.word}!)</strong>
                              <p>
                                "Yummy fruits for my plate! Keep following the sweet fruit trail to reach my Modak!"
                              </p>
                            </>
                          ) : (
                            <>
                              <strong>🐘 नमो गणपतये! (Hello Friend!)</strong>
                              <p>
                                "Help me collect sweet fruits on my tray and reach my golden Modak! Tap <strong>[ आम्रम् 🥭 ]</strong> to begin!"
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ganesha's Sweet Offering Plate (नैवेद्य-थालम्) */}
                  <div className="sgh-ganesha-tray" role="region" aria-label="Ganesha's Sweet Treats Tray">
                    <div className="sgh-tray-header">
                      <div className="sgh-tray-title-wrap">
                        <span className="sgh-tray-icon">🍽️</span>
                        <div>
                          <h4 className="sgh-tray-title">नैवेद्य-थालम् · Ganesha's Sweet Treat Plate</h4>
                          <span className="sgh-tray-sub">Watch each fruit appear on Ganesha's plate as you step on it!</span>
                        </div>
                      </div>
                      <span className="sgh-tray-counter-pill">
                        {steppedTreatCount} / {GANESHA_TREATS.length} Treats
                      </span>
                    </div>

                    <div className="sgh-tray-grid">
                      {GANESHA_TREATS.map((treat) => {
                        const isCollected = steppedOrders.has(treat.stepOrder);
                        const isNextTarget = currentMazeStep === treat.stepOrder;
                        return (
                          <button
                            key={treat.stepOrder}
                            type="button"
                            className={`sgh-tray-slot${isCollected ? ' is-collected' : ''}${isNextTarget ? ' is-target' : ''}${treat.isModak ? ' is-modak-slot' : ''}${treat.isModak && isGaneshaReached ? ' is-in-hand' : ''}`}
                            onClick={() => {
                              if (isCollected) {
                                soundEffects.playStrokeChime();
                                playPronunciation(treat.wordDev);
                              }
                            }}
                            title={isCollected ? `Hear: ${treat.wordDev} (${treat.wordEn})` : `Step ${treat.stepOrder}: ${treat.wordDev} (${treat.wordEn})`}
                          >
                            <div className="sgh-tray-slot-emoji-wrap">
                              <span className="sgh-tray-slot-emoji">
                                {isCollected ? treat.icon : '❓'}
                              </span>
                              {isCollected && (
                                <span className="sgh-tray-slot-check" aria-hidden="true">✓</span>
                              )}
                              {isNextTarget && (
                                <span className="sgh-tray-slot-next-badge">NEXT</span>
                              )}
                            </div>
                            <span className="sgh-tray-slot-dev">{treat.wordDev}</span>
                            <span className="sgh-tray-slot-en">{treat.wordEn}</span>
                            {treat.isModak && isGaneshaReached && (
                              <span className="sgh-tray-modak-tag">➔ In Hand 🖐️</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dedicated Instruction Bar when Modak is Collected (Step 7 -> Step 8) */}
                  {isModakCollected && !isGaneshaReached && (
                    <div className="sgh-modak-feed-banner" role="alert">
                      <span className="sgh-mfb-icon">🥟 👉 🐘</span>
                      <div className="sgh-mfb-text">
                        <strong>🥟 मोदकः प्राप्तः! Sweet Modak is in the tray!</strong>
                        <p>
                          Now tap on <strong>श्रीगणेशः (Ganesha 🐘)</strong> at row 4, col 3 on the grid below to put the sweet Modak in Baby Ganesha's hand!
                        </p>
                      </div>
                      <button
                        type="button"
                        className="sgh-mission-audio-btn"
                        onClick={() => speakAsBodhi("Sweet Modak collected! Now tap on Ganesha at the bottom of the grid to complete the quest!", { lang: 'en' })}
                      >
                        🔊 Hear Next Step
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Interactive Anti-Spoiler Maze Grid with RPG Cards & Character Sprite */}
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

                    const isGaneshaReady =
                      activeQuest.id === 'maze_preschool_ganesha_fruits' &&
                      cell.isPath &&
                      cell.stepOrder === 8 &&
                      currentMazeStep === 8 &&
                      !isStepped;

                    // Fog of War Check
                    const isFogged = (() => {
                      if (!fogOfWar || isMazeCompleted || isStepped) return false;
                      const ref = lastSteppedCell || activeQuest.cells.find((c) => c.isPath && c.stepOrder === 1);
                      if (!ref) return false;
                      const dR = Math.abs(cell.row - ref.row);
                      const dC = Math.abs(cell.col - ref.col);
                      return dR > 1 || dC > 1;
                    })();

                    // Subtle Golden Aura on valid next adjacent steps
                    const isValidAdjacentNext =
                      !isMazeCompleted &&
                      !isStepped &&
                      cell.isPath &&
                      cell.stepOrder === currentMazeStep &&
                      (lastSteppedCell === null
                        ? cell.stepOrder === 1
                        : Math.abs(cell.row - lastSteppedCell.row) <= 1 &&
                          Math.abs(cell.col - lastSteppedCell.col) <= 1);

                    // Collectible Loot Item
                    const cellLoot = getCellLoot(activeQuest.id, cell);
                    const hasLoot = cellLoot && !collectedLootIds.has(`${cell.row}-${cell.col}`) && !isStepped;

                    const { icon: visualIcon, category: visualCategory } = getCellVisual(
                      cell.word,
                      cell.translation,
                      cell.isPath
                    );

                    let cellClass = `sgh-maze-cell sgh-maze-cell--${visualCategory}`;
                    if (isStepped) cellClass += ' sgh-maze-cell--stepped';
                    if (isAvatarHere) cellClass += ' sgh-maze-cell--avatar';
                    if (isStartEntrance || isHinted) cellClass += ' sgh-maze-cell--current';
                    else if (isTrap) cellClass += ' sgh-maze-cell--trap';
                    else if (isReachableNeighbor) cellClass += ' sgh-maze-cell--neighbor';
                    if (isGaneshaReady) cellClass += ' sgh-maze-cell--ganesha-ready';
                    if (isValidAdjacentNext) cellClass += ' sgh-maze-cell--valid-adjacent';
                    if (isFogged) cellClass += ' sgh-maze-cell--fogged';

                    const cleanedGloss = cleanMazeGloss(cell.translation);
                    const showCellGloss = isStepped || mazeDifficulty === 'guided';

                    return (
                      <button
                        key={`cell-${cell.row}-${cell.col}`}
                        type="button"
                        className={cellClass}
                        onClick={() => {
                          if (isFogged) {
                            soundEffects.playStrokeChime();
                            setTrapMessage('🌫️ Shrouded in mist! Step onto neighboring tiles first to part the fog!');
                            setTimeout(() => setTrapMessage(null), 1400);
                            return;
                          }
                          handleMazeCellClick(cell);
                        }}
                        title={isFogged ? 'Shrouded in mist' : showCellGloss ? `${cell.word} — ${cleanedGloss}` : cell.word}
                      >
                        {isFogged ? (
                          <div className="sgh-fog-veil">
                            <span className="sgh-fog-icon">🌫️</span>
                            <span className="sgh-fog-rune">?</span>
                          </div>
                        ) : (
                          <>
                            {/* Top Badges & Loot indicator */}
                            <div className="sgh-mc-top-bar">
                              {isStepped && cell.stepOrder ? (
                                <span className="sgh-step-badge sgh-step-badge--done">
                                  ✓{cell.stepOrder}
                                </span>
                              ) : cell.stepOrder === 1 && !isStepped ? (
                                <span className="sgh-step-badge sgh-step-badge--pill sgh-badge--start">
                                  🚩 Start
                                </span>
                              ) : isGaneshaReady ? (
                                <span className="sgh-step-badge sgh-step-badge--pill sgh-badge--ganesha-feed">
                                  🥟 Feed!
                                </span>
                              ) : cell.stepOrder === totalPathSteps && !isStepped ? (
                                <span className="sgh-step-badge sgh-step-badge--pill sgh-badge--goal">
                                  🏆 Goal
                                </span>
                              ) : null}

                              {hasLoot && (
                                <span className="sgh-cell-loot-sparkle" title={cellLoot.label}>
                                  {cellLoot.icon}
                                </span>
                              )}
                            </div>

                            {/* Vibrant Central Illustration Medallion */}
                            <div className={`sgh-mc-illustration-frame sgh-frame--${visualCategory}`}>
                              <span className="sgh-mc-icon-art">{visualIcon}</span>
                            </div>

                            {/* Player Physical Walking Sprite on Current Tile */}
                            {isAvatarHere && (
                              <div className="sgh-player-sprite-token" title={AVATARS[selectedAvatar].name}>
                                <span className="sgh-sprite-glyph">{AVATARS[selectedAvatar].icon}</span>
                                <span className="sgh-sprite-label">{AVATARS[selectedAvatar].name}</span>
                              </div>
                            )}

                            {/* Traversed Golden Lotus Footstep Marker */}
                            {isStepped && !isAvatarHere && (
                              <span className="sgh-mc-lotus-footprint" title="Traversed path step">🪷</span>
                            )}

                            {/* Devanagari Sanskrit Word */}
                            <span className="sgh-mc-word">{cell.word}</span>

                            {/* Roman Transliteration */}
                            {showRoman && (
                              <span className="sgh-mc-roman">{devanagariToIast(cell.word)}</span>
                            )}

                            {/* English Meaning Gloss */}
                            <span className="sgh-mc-trans">
                              {showCellGloss ? cleanedGloss : '•••'}
                            </span>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Game Over Modal (Hero Mode Stamina Depleted) */}
            {isGameOver && (
              <div className="sgh-modal-backdrop" role="dialog" aria-modal="true">
                <div className="sgh-gameover-card">
                  <div className="sgh-gameover-icon">💔</div>
                  <h3>प्राण-शक्तिः समाप्ता · Out of Stamina!</h3>
                  <p>
                    Your hero encountered too many hazard obstacles on the trail! Take a breath, regain your sacred stamina, and continue your Sanskrit quest!
                  </p>
                  <div className="sgh-gameover-actions">
                    <button
                      type="button"
                      className="sgh-gameover-btn sgh-gameover-btn--revive"
                      onClick={() => {
                        setHearts(3);
                        setIsGameOver(false);
                        soundEffects.playSuccessDing();
                      }}
                    >
                      ❤️ Revive (3 Hearts) &amp; Continue
                    </button>
                    <button
                      type="button"
                      className="sgh-gameover-btn sgh-gameover-btn--casual"
                      onClick={() => {
                        setRpgMode('casual');
                        setHearts(3);
                        setIsGameOver(false);
                        soundEffects.playStrokeChime();
                      }}
                    >
                      🌱 Switch to Casual Mode (∞)
                    </button>
                    <button
                      type="button"
                      className="sgh-gameover-btn sgh-gameover-btn--restart"
                      onClick={() => {
                        handleResetMaze();
                      }}
                    >
                      🔄 Restart Quest
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Level Clear Fanfare & Quest Complete Modal with Confetti */}
            {showQuestVictoryModal && (
              <div className="sgh-modal-backdrop" role="dialog" aria-modal="true">
                <div className="sgh-confetti-layer" aria-hidden="true">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span
                      key={i}
                      className="sgh-confetti-piece"
                      style={{
                        left: `${(i * 2.1 + (i % 7) * 3) % 100}%`,
                        animationDelay: `${(i % 12) * 0.12}s`,
                        animationDuration: `${1.7 + (i % 5) * 0.4}s`,
                        backgroundColor: [
                          '#f59e0b',
                          '#10b981',
                          '#38bdf8',
                          '#ec4899',
                          '#8b5cf6',
                          '#f43f5e',
                          '#fbbf24',
                        ][i % 7],
                      }}
                    />
                  ))}
                </div>

                <div className="sgh-victory-modal-card">
                  <div className="sgh-vm-header">
                    <span className="sgh-vm-avatar-hero">{AVATARS[selectedAvatar].icon}</span>
                    <div className="sgh-vm-stars">⭐⭐⭐⭐⭐</div>
                    <h2 className="sgh-vm-title">QUEST COMPLETE!</h2>
                    <span className="sgh-vm-sanskrit">विजय-यात्रा संपूर्णा!</span>
                  </div>

                  <div className="sgh-vm-stats-grid">
                    <div className="sgh-vm-stat-box">
                      <span className="sgh-vm-stat-lbl">⏱️ Quest Time</span>
                      <strong className="sgh-vm-stat-val">{formatTime(timerSeconds)}</strong>
                      <span className="sgh-vm-stat-sub" style={{ color: speedrunRank.color }}>
                        {speedrunRank.badge}
                      </span>
                    </div>
                    <div className="sgh-vm-stat-box">
                      <span className="sgh-vm-stat-lbl">🪙 Loot Collected</span>
                      <strong className="sgh-vm-stat-val">
                        {lootScores.coins > 0 ? `${lootScores.coins}c ` : ''}
                        {lootScores.gems > 0 ? `${lootScores.gems}💎 ` : ''}
                        {lootScores.scrolls > 0 ? `${lootScores.scrolls}📜` : ''}
                        {lootScores.coins === 0 && lootScores.gems === 0 && lootScores.scrolls === 0 ? '✨ Clean Run' : ''}
                      </strong>
                      <span className="sgh-vm-stat-sub">Treasure Explorer</span>
                    </div>
                    <div className="sgh-vm-stat-box">
                      <span className="sgh-vm-stat-lbl">👣 Trail Steps</span>
                      <strong className="sgh-vm-stat-val">{steppedCells.length} / {totalPathSteps}</strong>
                      <span className="sgh-vm-stat-sub">100% Path Accuracy</span>
                    </div>
                  </div>

                  {/* Assembled Sanskrit Story Inscription */}
                  <div className="sgh-vm-story-box">
                    <span className="sgh-vm-story-tag">📜 Completed Sanskrit Inscription:</span>
                    <p className="sgh-vm-story-dev">{activeQuest.fullSentenceOrStoryDev}</p>
                    <p className="sgh-vm-story-en">{activeQuest.fullSentenceOrStoryEn}</p>
                    {activeQuest.moral && (
                      <div className="sgh-vm-moral">
                        <strong>💡 Moral:</strong> {activeQuest.moral}
                      </div>
                    )}
                  </div>

                  <div className="sgh-vm-actions">
                    <button
                      type="button"
                      className="sgh-vm-btn sgh-vm-btn--audio"
                      onClick={() => playPronunciation(activeQuest.fullSentenceOrStoryDev)}
                    >
                      🔊 Listen to Full Tale
                    </button>
                    <button
                      type="button"
                      className="sgh-vm-btn sgh-vm-btn--replay"
                      onClick={() => {
                        setShowQuestVictoryModal(false);
                        handleResetMaze();
                      }}
                    >
                      🔄 Play Again
                    </button>
                    <button
                      type="button"
                      className="sgh-vm-btn sgh-vm-btn--next"
                      onClick={() => {
                        setShowQuestVictoryModal(false);
                        handleNextQuest();
                      }}
                    >
                      Next Quest ➔
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SanskritGamesHub;
