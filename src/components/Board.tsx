import React, { useEffect, useRef, useState } from 'react';
import '../styles/board.css';
import { iconForExampleWord } from '../data/exampleIcons';
import { playPronunciation } from '../utils/pronunciation';

type ShelfId = 'prarambhah' | 'sariram' | 'ganitam' | 'bhugolah' | 'sanskritih' | 'krida' | 'prakrtih';

interface ShelfButton { id: ShelfId; label: string; }
interface BoardPuzzle { target: string; tiles: string[]; answer?: string; english: string; sentence?: string; highlight?: string; tapHighlight?: string; seed?: string; prompt?: string; gloss?: string; phase?: string; }
interface BoardShelfLine { shelf: string; native: string; skin: string; puzzles: BoardPuzzle[]; }
interface PackLabel { title: string; gloss: string; }
interface VisitorBlock { heading: 'h2' | 'h3' | 'p'; text: string; }

const BODY_ANECDOTE = 'नाद-पथः — क lives in the throat.';

const DEFAULT_SHELVES: ShelfButton[] = [
  { id: 'prarambhah', label: 'Beginners' },
  { id: 'sariram', label: 'Body' },
  { id: 'ganitam', label: 'Maths' },
  { id: 'bhugolah', label: 'Map' },
  { id: 'sanskritih', label: 'Sanskriti' },
  { id: 'krida', label: 'Play' },
  { id: 'prakrtih', label: 'Nature' },
];

const SHELF_ALIASES: Record<string, ShelfId> = {
  beginners: 'prarambhah',
  body: 'sariram',
  sariram: 'sariram',
  space: 'ganitam',
  ganitam: 'ganitam',
  map: 'bhugolah',
  bhugolah: 'bhugolah',
  sanskriti: 'sanskritih',
  sanskritih: 'sanskritih',
  play: 'krida',
  krida: 'krida',
  nature: 'prakrtih',
  prakrtih: 'prakrtih',
};

const parse = (text: string) => text.split(/\r?\n/).filter((line) => line.trim() && !line.startsWith('#')).map((line) => line.split('|').map((part) => part.trim()));
const parseVisitor = (text: string): VisitorBlock[] => text.split(/\r?\n/).reduce<VisitorBlock[]>((blocks, line) => {
  const trimmed = line.trim();
  if (!trimmed) return blocks;
  if (trimmed.startsWith('## ')) return [...blocks, { heading: 'h3', text: trimmed.slice(3) }];
  if (trimmed.startsWith('# ')) return [...blocks, { heading: 'h2', text: trimmed.slice(2) }];
  return [...blocks, { heading: 'p', text: trimmed }];
}, []);
const fetchText = (name: string) => fetch(`./${name}?t=${Date.now()}`).then((response) => response.text());
const cleanTile = (tile: string) => tile.replace(/\u200B/g, '').normalize('NFC').trim();

// Independent vowel tiles must map to combining matras so glueTiles(क+ई)→की, क+ऊ→कू, etc.
const MARK: Record<string, string> = {
  'आ': 'ा', 'इ': 'ि', 'ई': 'ी', 'उ': 'ु', 'ऊ': 'ू', 'ऋ': 'ृ', 'ए': 'े', 'ऐ': 'ै', 'ओ': 'ो', 'औ': 'ौ',
  'अं': 'ं',
  'अः': 'ः',  // future-proof visarga row
};
function glueTiles(tiles: string[]) {
  return tiles.map((tile) => cleanTile(tile)).map((tile) => MARK[tile] ?? tile).join('').normalize('NFC');
}

/** जोडो: any tap order of the same tiles still counts (आ then म = मा). */
function glueMatchesTarget(tiles: string[], target: string) {
  const cleaned = tiles.map((tile) => cleanTile(tile)).filter(Boolean);
  if (!cleaned.length) return false;
  const goal = target.normalize('NFC');
  if (glueTiles(cleaned) === goal) return true;
  if (cleaned.length === 2) return glueTiles([cleaned[1], cleaned[0]]) === goal;
  if (cleaned.length > 3) return false;
  const perms = (arr: string[]): string[][] => {
    if (arr.length <= 1) return [arr];
    return arr.flatMap((item, index) => perms([...arr.slice(0, index), ...arr.slice(index + 1)]).map((rest) => [item, ...rest]));
  };
  return perms(cleaned).some((order) => glueTiles(order) === goal);
}


/** Evaluate whether `tiles` is a correct answer for this puzzle (same rules as isCorrect). */
function evaluateChosen(puzzle: BoardPuzzle | null, tiles: string[]): boolean {
  if (!puzzle) return false;
  const target = (puzzle.answer ?? puzzle.target).normalize('NFC');
  const wholeWordRow = puzzle.tiles.some((tile) => cleanTile(tile).normalize('NFC') === target);
  if (wholeWordRow) {
    return tiles.length === 1 && cleanTile(tiles[0]).normalize('NFC') === target;
  }
  if (puzzle.target === 'का') {
    const chosenSet = new Set(tiles.map((tile) => cleanTile(tile).normalize('NFC')));
    const isKaAaPair = chosenSet.size === 2 && tiles.length === 2
      && (chosenSet.has('क') && (chosenSet.has('आ') || chosenSet.has('ा')));
    return glueMatchesTarget(tiles, 'का') || isKaAaPair;
  }
  return glueMatchesTarget(tiles, target);
}

function highlightedSentence(sentence: string | undefined, highlight: string | undefined, tapHighlight: string | undefined) {
  if (!sentence || !highlight) return sentence;
  const matchStart = sentence.indexOf(highlight);
  if (matchStart < 0) return sentence;
  const before = sentence.slice(0, matchStart);
  const after = sentence.slice(matchStart + highlight.length);
  const tapStart = tapHighlight ? after.indexOf(tapHighlight) : -1;
  const afterNode = tapStart < 0
    ? after
    : <>{after.slice(0, tapStart)}<span className="word-tap">{tapHighlight}</span>{after.slice(tapStart + (tapHighlight as string).length)}</>;
  return <>{before}<span className="word-focus">{highlight}</span>{afterNode}</>;
}


/** Bold Click Next (and legacy phrases) inside tip or welcome copy (labels loop + visitor **markdown**). */
function emphasizeTipText(text: string): React.ReactNode {
  const pattern = /(Read the sentence|click\s+Next|Click\s+Next|\*\*[^*]+\*\*|\bNext\b)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const phrase = match[0];
    if (phrase.startsWith('**') && phrase.endsWith('**')) {
      const inner = phrase.slice(2, -2);
      const isNext = /next/i.test(inner);
      nodes.push(<strong key={key++} className={isNext ? 'tip-next' : undefined}>{inner}</strong>);
    } else {
      const isNext = /next/i.test(phrase);
      const label = isNext && !/^click\s/i.test(phrase) ? 'Click Next' : phrase;
      nodes.push(<strong key={key++} className={isNext ? 'tip-next' : undefined}>{label}</strong>);
    }
    last = match.index + phrase.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length ? <>{nodes}</> : text;
}


/** Matra section chips for Beginners · मात्रा (scan for first matching target). */
const MATRA_SECTION_DEFS: { label: string; exemplar: string; mark: string }[] = [
  { label: 'आ', exemplar: 'का', mark: 'ा' },
  { label: 'इ', exemplar: 'कि', mark: 'ि' },
  { label: 'ई', exemplar: 'की', mark: 'ी' },
  { label: 'उ', exemplar: 'कु', mark: 'ु' },
  { label: 'ऊ', exemplar: 'कू', mark: 'ू' },
  { label: 'ए', exemplar: 'के', mark: 'े' },
  { label: 'ऐ', exemplar: 'कै', mark: 'ै' },
  { label: 'ओ', exemplar: 'को', mark: 'ो' },
  { label: 'औ', exemplar: 'कौ', mark: 'ौ' },
  { label: 'ऋ', exemplar: 'कृ', mark: 'ृ' },
  { label: 'अं', exemplar: 'कं', mark: 'ं' },
  { label: 'अः', exemplar: 'कः', mark: 'ः' },
];

type BoardSectionChip = { id: string; label: string; start: number };

function isPrashnaPuzzle(puzzle: BoardPuzzle): boolean {
  if ((puzzle.phase || '').trim() === 'prashna') return true;
  return false;
}

function findMatraSectionStart(puzzles: BoardPuzzle[], exemplar: string, mark: string): number {
  const byExemplar = puzzles.findIndex((p) => {
    if (isPrashnaPuzzle(p)) return false;
    const t = (p.target || '').normalize('NFC');
    return t === exemplar || t.startsWith(exemplar);
  });
  if (byExemplar >= 0) return byExemplar;
  return puzzles.findIndex((p) => {
    if (isPrashnaPuzzle(p)) return false;
    return (p.target || '').normalize('NFC').includes(mark);
  });
}

function findPrashnaSectionStart(puzzles: BoardPuzzle[]): number {
  const byPhase = puzzles.findIndex((p) => (p.phase || '').trim() === 'prashna');
  if (byPhase >= 0) return byPhase;
  // First whole-word question row (target appears as a full cream tile).
  return puzzles.findIndex((p) => {
    const target = ((p.answer ?? p.target) || '').normalize('NFC');
    if (!target) return false;
    return p.tiles.some((tile) => cleanTile(tile).normalize('NFC') === target);
  });
}

/** Consonant rows (त / द …): first target matching consonant + matra. */
const CONSONANT_ROW_CHIP_DEFS: { id: string; consonant: string }[] = [
  { id: 'त', consonant: 'त' },
  { id: 'द', consonant: 'द' },
  { id: 'ब', consonant: 'ब' },
  { id: 'भ', consonant: 'भ' },
  { id: 'ध', consonant: 'ध' },
  { id: 'य', consonant: 'य' },
  { id: 'र', consonant: 'र' },
  { id: 'ल', consonant: 'ल' },
  { id: 'व', consonant: 'व' },
  { id: 'श', consonant: 'श' },
  { id: 'ष', consonant: 'ष' },
  { id: 'स', consonant: 'स' },
  { id: 'ह', consonant: 'ह' },
  { id: 'ट', consonant: 'ट' },
  { id: 'ठ', consonant: 'ठ' },
  { id: 'ड', consonant: 'ड' },
  { id: 'ढ', consonant: 'ढ' },
  { id: 'ण', consonant: 'ण' },
  { id: 'क', consonant: 'क' },
  { id: 'ख', consonant: 'ख' },
  { id: 'ग', consonant: 'ग' },
  { id: 'घ', consonant: 'घ' },
  { id: 'ङ', consonant: 'ङ' },
  { id: 'च', consonant: 'च' },
  { id: 'छ', consonant: 'छ' },
  { id: 'ज', consonant: 'ज' },
  { id: 'झ', consonant: 'झ' },
  { id: 'ञ', consonant: 'ञ' },
  { id: 'प', consonant: 'प' },
  { id: 'फ', consonant: 'फ' },
  { id: 'म', consonant: 'म' },
  { id: 'न', consonant: 'न' },
  { id: 'थ', consonant: 'थ' },
  { id: 'क्ष', consonant: 'क्ष' },
  { id: 'ज्ञ', consonant: 'ज्ञ' },
  { id: 'त्र', consonant: 'त्र' },
  { id: 'श्र', consonant: 'श्र' },
  { id: 'प्र', consonant: 'प्र' },
  { id: 'क्र', consonant: 'क्र' },
  { id: 'ग्र', consonant: 'ग्र' },
  { id: 'द्र', consonant: 'द्र' },
  { id: 'ब्र', consonant: 'ब्र' },
  { id: 'द्व', consonant: 'द्व' },
  { id: 'त्व', consonant: 'त्व' },
  { id: 'स्त', consonant: 'स्त' },
  { id: 'स्व', consonant: 'स्व' },
  { id: 'स्म', consonant: 'स्म' },
  { id: 'स्न', consonant: 'स्न' },
  { id: 'ष्ट', consonant: 'ष्ट' },
  { id: 'ह्र', consonant: 'ह्र' },
  { id: 'ह्य', consonant: 'ह्य' },
  { id: 'स्त्र', consonant: 'स्त्र' },
  { id: 'ङ्क', consonant: 'ङ्क' },
  { id: 'च्छ', consonant: 'च्छ' },
  { id: 'क्त', consonant: 'क्त' },
  { id: 'र्थ', consonant: 'र्थ' },
  { id: 'र्ण', consonant: 'र्ण' },
  { id: 'ष्ण', consonant: 'ष्ण' },
  { id: 'त्त', consonant: 'त्त' },
  { id: 'द्ध', consonant: 'द्ध' },
  { id: 'ब्ध', consonant: 'ब्ध' },
  { id: 'म्भ', consonant: 'म्भ' },
  { id: 'ञ्ज', consonant: 'ञ्ज' },
  { id: 'ञ्च', consonant: 'ञ्च' },
  { id: 'त्थ', consonant: 'त्थ' },
  { id: 'द्द', consonant: 'द्द' },
  { id: 'प्प', consonant: 'प्प' },
  { id: 'च्च', consonant: 'च्च' },
  { id: 'ल्ल', consonant: 'ल्ल' },
  { id: 'र्त', consonant: 'र्त' },
  { id: 'र्ध', consonant: 'र्ध' },
  { id: 'र्भ', consonant: 'र्भ' },
  { id: 'र्ग', consonant: 'र्ग' },
  { id: 'र्म', consonant: 'र्म' },
  { id: 'न्न', consonant: 'न्न' },
  { id: 'म्म', consonant: 'म्म' },
  { id: 'य्य', consonant: 'य्य' },
  { id: 'र्र', consonant: 'र्र' },
  { id: 'व्व', consonant: 'व्व' },
  { id: 'स्क', consonant: 'स्क' },
  { id: 'स्प', consonant: 'स्प' },
  { id: 'त्न', consonant: 'त्न' },
  { id: 'द्न', consonant: 'द्न' },
  { id: 'ल्प', consonant: 'ल्प' },
  { id: 'त्क', consonant: 'त्क' },
  { id: 'त्प', consonant: 'त्प' },
  { id: 'त्म', consonant: 'त्म' },
  { id: 'द्ग', consonant: 'द्ग' },
  { id: 'द्ब', consonant: 'द्ब' },
  { id: 'ङ्ग', consonant: 'ङ्ग' },
  { id: 'ङ्ख', consonant: 'ङ्ख' },
  { id: 'ट्ट', consonant: 'ट्ट' },
  { id: 'ड्ड', consonant: 'ड्ड' },
  { id: 'ब्ब', consonant: 'ब्ब' },
  { id: 'ह्न', consonant: 'ह्न' },
  { id: 'ह्म', consonant: 'ह्म' },
  { id: 'च्ज', consonant: 'च्ज' },
  { id: 'प्न', consonant: 'प्न' },
  { id: 'म्न', consonant: 'म्न' },
  { id: 'स्फ', consonant: 'स्फ' },
  { id: 'स्थ', consonant: 'स्थ' },
  { id: 'श्च', consonant: 'श्च' },
  { id: 'श्क', consonant: 'श्क' },
  { id: 'ल्क', consonant: 'ल्क' },
];

const CONSONANT_ROW_MATRA_CHARS = new Set([
  '\u093E', '\u093F', '\u0940', '\u0941', '\u0942', '\u0943',
  '\u0947', '\u0948', '\u094B', '\u094C', '\u0902', '\u0903',
]);

/** True when target is exactly base (one or more code points) + a single matra — so क्षा≠क, त्रा≠त, ज्ञा≠ज. */
function isConsonantMatraTarget(target: string, consonant: string): boolean {
  const t = target.normalize('NFC');
  const base = consonant.normalize('NFC');
  if (!base || !t.startsWith(base)) return false;
  const rest = t.slice(base.length);
  return rest.length === 1 && CONSONANT_ROW_MATRA_CHARS.has(rest);
}

/** First cons+matra at index >= minIndex (skips early रा/ला/सा once prior row ended). */
function findConsonantRowStart(puzzles: BoardPuzzle[], consonant: string, minIndex = 0): number {
  for (let i = Math.max(0, minIndex); i < puzzles.length; i++) {
    const p = puzzles[i];
    if (isPrashnaPuzzle(p)) continue;
    const t = (p.target || '').normalize('NFC');
    if (isConsonantMatraTarget(t, consonant)) return i;
  }
  return -1;
}

/** Exclusive end index of a contiguous cons+matra block starting at `start`. */
function consonantRowEnd(puzzles: BoardPuzzle[], consonant: string, start: number): number {
  let end = start;
  for (let i = start; i < puzzles.length; i++) {
    const p = puzzles[i];
    if (isPrashnaPuzzle(p)) break;
    const t = (p.target || '').normalize('NFC');
    if (!isConsonantMatraTarget(t, consonant)) break;
    end = i + 1;
  }
  return end;
}

function buildMatraSectionChips(puzzles: BoardPuzzle[]): BoardSectionChip[] {
  const chips: BoardSectionChip[] = [];
  for (const def of MATRA_SECTION_DEFS) {
    const start = findMatraSectionStart(puzzles, def.exemplar, def.mark);
    if (start >= 0) chips.push({ id: def.label, label: def.label, start });
  }
  // Sequential: each row starts at/after the previous consonant row's end (so ल≠early ला, स≠early सा).
  let minIndex = 0;
  for (const row of CONSONANT_ROW_CHIP_DEFS) {
    const start = findConsonantRowStart(puzzles, row.consonant, minIndex);
    if (start >= 0) {
      chips.push({ id: row.id, label: row.id, start });
      minIndex = consonantRowEnd(puzzles, row.consonant, start);
    }
  }
  const prashnaStart = findPrashnaSectionStart(puzzles);
  if (prashnaStart >= 0) chips.push({ id: 'प्रश्न', label: 'प्रश्न', start: prashnaStart });
  return chips.sort((a, b) => a.start - b.start);
}

function buildNatureSectionChips(puzzles: BoardPuzzle[]): BoardSectionChip[] {
  const defs: { id: string; label: string; match: (p: BoardPuzzle) => boolean }[] = [
    { id: 'रिक्तम्', label: 'रिक्तम्', match: (p) => {
      const ph = (p.phase || '').trim();
      return ph !== 'learn' && ph !== 'match-meaning';
    } },
    { id: 'शिक्षा', label: 'शिक्षा', match: (p) => (p.phase || '').trim() === 'learn' },
    { id: 'अर्थ', label: 'अर्थ', match: (p) => (p.phase || '').trim() === 'match-meaning' },
  ];
  const chips: BoardSectionChip[] = [];
  for (const def of defs) {
    const start = puzzles.findIndex(def.match);
    if (start >= 0) chips.push({ id: def.id, label: def.label, start });
  }
  return chips;
}

function activeSectionChipId(chips: BoardSectionChip[], puzzleIndex: number): string | null {
  if (!chips.length) return null;
  let active = chips[0].id;
  for (const chip of chips) {
    if (puzzleIndex >= chip.start) active = chip.id;
    else break;
  }
  return active;
}

const Board: React.FC = () => {
  const [shelfButtons, setShelfButtons] = useState<ShelfButton[]>(DEFAULT_SHELVES);
  const [boardShelves, setBoardShelves] = useState<BoardShelfLine[]>([]);
  const [fallbackPuzzles, setFallbackPuzzles] = useState<BoardPuzzle[]>([]);
  const [packLabels, setPackLabels] = useState<PackLabel[]>([]);
  const [visitorBlocks, setVisitorBlocks] = useState<VisitorBlock[]>([]);
  const [activeShelf, setActiveShelf] = useState<ShelfId>(() => (localStorage.getItem('last-board-shelf') as ShelfId) || 'prarambhah');
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [puzzleIndexByShelf, setPuzzleIndexByShelf] = useState<Partial<Record<ShelfId, number>>>({});
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const [labelsText, boardText, puzzleText, visitorText] = await Promise.all([
          fetchText('labels.txt').catch(() => ''),
          fetchText('board.json').catch(() => ''),
          fetchText('puzzles.txt').catch(() => ''),
          fetchText('visitor.txt').catch(() => ''),
        ]);

        const labelRows = parse(labelsText);
        const parsedShelves = labelRows.filter((parts) => parts[0] === 'shelf' && parts[1]);
        if (parsedShelves.length > 0) {
          setShelfButtons(parsedShelves.map(([, id, title]) => ({ id: (SHELF_ALIASES[id] ?? id) as ShelfId, label: title })));
        }
        const parsedPackLabels = labelRows
          .filter((parts) => parts[0] === 'pack' && parts[2])
          .map(([, , title, gloss]) => ({ title, gloss: gloss ?? '' }));
        setPackLabels(parsedPackLabels);
        if (visitorText.trim()) setVisitorBlocks(parseVisitor(visitorText));

        if (boardText.trim()) {
          const parsedBoard = JSON.parse(boardText) as BoardShelfLine[];
          if (Array.isArray(parsedBoard)) {
            setBoardShelves(parsedBoard);
          }
        }

        if (puzzleText.trim()) {
          const parsedPuzzles = parse(puzzleText)
            .map(([_shape, target, answer, tiles, sentence, english, seed]) => ({
              target,
              answer,
              tiles: tiles.split(',').map((tile) => cleanTile(tile)).filter(Boolean),
              sentence,
              english,
              seed,
            }))
            .filter((item) => item.target);
          setFallbackPuzzles(parsedPuzzles);
        }
      } catch {
        setError('The board files could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    void loadBoard();
  }, []);

  const activeBoardShelf = boardShelves.find((entry) => SHELF_ALIASES[entry.shelf.toLowerCase()] === activeShelf || entry.shelf.toLowerCase() === activeShelf) ?? null;
  const activePuzzles = activeBoardShelf?.puzzles.length
    ? activeBoardShelf.puzzles
    : fallbackPuzzles.filter((item) => item.target === 'का' || item.target === 'मा' || item.target === 'सा' || item.target === 'बालः');
  const rawPuzzleIndex = puzzleIndexByShelf[activeShelf] ?? 0;
  const puzzleIndex = activePuzzles.length
    ? Math.max(0, Math.min(rawPuzzleIndex, activePuzzles.length - 1))
    : 0;
  const activePuzzle = activePuzzles[puzzleIndex] ?? activePuzzles[0] ?? fallbackPuzzles[0] ?? null;
  const activePackLabel = packLabels.find((item) => item.title === activeBoardShelf?.native) ?? null;
  const packTitle = activePackLabel?.title ?? activeBoardShelf?.native ?? '';
  const packGloss = activePackLabel?.gloss ?? '';
  const puzzlePhase = (activePuzzle?.phase || '').trim();
  const isLearnPhase = puzzlePhase === 'learn';
  const isMatchMeaningPhase = puzzlePhase === 'match-meaning';

  const isCorrect = evaluateChosen(activePuzzle, chosen);

  const chooseShelf = (nextShelf: ShelfId) => {
    const switched = nextShelf !== activeShelf;
    setActiveShelf(nextShelf);
    if (switched) {
      setPuzzleIndexByShelf((current) => ({ ...current, [nextShelf]: 0 }));
    }
    setChecked(false);
    setWrongAttempt(false);
    setChosen([]);
    localStorage.setItem('last-board-shelf', nextShelf);
  };

  const targetWord = ((activePuzzle?.answer ?? activePuzzle?.target) || '').normalize('NFC');
  const targetIsWholeTile = !!activePuzzle?.tiles?.some((tile) => cleanTile(tile).normalize('NFC') === targetWord);
  // प्रश्न-पदानि is Beginners Part 2 only — never hijack Sanskriti/Vastu रिक्तम् rows
  const isPrashnaPart = activeShelf === 'prarambhah' && targetIsWholeTile;
  const displaySkin = isLearnPhase
    ? 'शिक्षा'
    : isMatchMeaningPhase
      ? 'अर्थ'
      : (isPrashnaPart ? 'प्रश्न' : (activeBoardShelf?.skin ?? ''));
  const displayPackTitle = isPrashnaPart ? 'प्रश्न-पदानि' : packTitle;
  const displayPackGloss = isPrashnaPart ? 'who · what · where · when · how' : packGloss;
  // जोडो: no Part banner — board-tip alone covers the instructions
  const phaseBanner = isPrashnaPart
    ? 'Part 2 — question words.'
    : '';

  // जोडो joins (क+आ) stay multi-tap. Question-words (कः on a tile) are one tap.
  const isJodoSkin = (!activeBoardShelf || activeBoardShelf.skin === 'जोडो') && !targetIsWholeTile;

  const shownTarget = (activePuzzle?.prompt ?? activePuzzle?.target) || '';
  const hasBlank = !isLearnPhase && !isMatchMeaningPhase && (
    shownTarget.includes('____')
    || activeBoardShelf?.skin === 'रिक्तम्'
    || isPrashnaPart
  );
  const wrongAttemptMessage = isMatchMeaningPhase
    ? 'Not that cream word — try another cream tile.'
    : hasBlank
      ? 'Not that cream tile — try another cream tile.'
      : isJodoSkin
        ? 'Not those tiles. Click the right letter and vowel (any order), or try another cream tile.'
        : 'Not that cream tile — try another cream tile.';

  /** Apply a new cream-tile selection and immediately reveal sentence/graphic if correct. */
  const applySelection = (nextChosen: string[]) => {
    setChosen(nextChosen);
    if (!isJodoSkin) {
      if (nextChosen.length === 0) {
        setChecked(false);
        setWrongAttempt(false);
        return;
      }
      if (evaluateChosen(activePuzzle, nextChosen)) {
        setChecked(true);
        setWrongAttempt(false);
      } else {
        setChecked(false);
        setWrongAttempt(true);
      }
      return;
    }
    // जोडो: wait until two tiles, then auto-reveal or tip
    if (nextChosen.length < 2) {
      setChecked(false);
      setWrongAttempt(false);
      return;
    }
    if (evaluateChosen(activePuzzle, nextChosen)) {
      setChecked(true);
      setWrongAttempt(false);
    } else {
      setChecked(false);
      setWrongAttempt(true);
    }
  };

  const toggleTile = (tile: string) => {
    const clean = cleanTile(tile);
    if (!clean) return;
    // Selecting a tile must always work — never freeze. Wrong/other click replaces and re-evaluates.
    if (!isJodoSkin) {
      applySelection([clean]);
      return;
    }
    // जोडो: after success, a new tap starts a fresh pair; otherwise toggle membership (any order).
    if (checked && isCorrect) {
      applySelection([clean]);
      return;
    }
    // Never accumulate more than 2 tiles — a third tap starts fresh with that tile.
    if (chosen.includes(clean)) {
      applySelection(chosen.filter((item) => item !== clean));
      return;
    }
    if (chosen.length >= 2) {
      applySelection([clean]);
      return;
    }
    applySelection([...chosen, clean]);
  };

  const hasNextPuzzle = (isLearnPhase || isCorrect) && activePuzzles.length > 0;
  const isLastPuzzle = activePuzzles.length > 0 && puzzleIndex + 1 >= activePuzzles.length;

  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!(checked && isCorrect)) return;
    nextBtnRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [checked, isCorrect, puzzleIndex, activeShelf]);


  // If shelf grew/shrank or index is stale, keep progress in range (avoids wild N / length vs puzzle 0).
  useEffect(() => {
    const len = activePuzzles.length;
    if (len === 0) return;
    setPuzzleIndexByShelf((current) => {
      const idx = current[activeShelf] ?? 0;
      const clamped = Math.max(0, Math.min(idx, len - 1));
      if (clamped === idx) return current;
      return { ...current, [activeShelf]: clamped };
    });
  }, [activeShelf, activePuzzles.length]);

  const resetPuzzleUi = () => {
    setChecked(false);
    setWrongAttempt(false);
    setChosen([]);
  };

  // Unlock cream tiles on every puzzle advance / shelf change (guards race or sticky checked+chosen,
  // especially back-to-back same targets like नदी → नदी).
  useEffect(() => {
    setChosen([]);
    setChecked(false);
    setWrongAttempt(false);
  }, [puzzleIndex, activeShelf]);

  /** Advance without wrapping — used by Next and auto-advance. */
  const goNext = () => {
    if (!activePuzzles.length) return;
    setPuzzleIndexByShelf((current) => {
      const idx = current[activeShelf] ?? 0;
      if (idx + 1 >= activePuzzles.length) return current;
      return { ...current, [activeShelf]: idx + 1 };
    });
    resetPuzzleUi();
  };

  /** Again on the last puzzle — restart shelf at 0. */
  const restartShelf = () => {
    if (!activePuzzles.length) return;
    setPuzzleIndexByShelf((current) => ({ ...current, [activeShelf]: 0 }));
    resetPuzzleUi();
  };

  const onNextOrAgain = () => {
    if (isLastPuzzle) restartShelf();
    else goNext();
  };

  // After a correct cream-tile reveal, auto-advance so later मात्रा rows still appear if Next is missed.
  // Learn cards never auto-advance — child must hear, then click Next.
  // Do not wrap on the last puzzle (that felt like the chain broke).
  useEffect(() => {
    if (isLearnPhase) return undefined;
    if (!checked || !isCorrect || activePuzzles.length < 2) return undefined;
    if (puzzleIndex + 1 >= activePuzzles.length) return undefined;
    const timer = window.setTimeout(() => {
      goNext();
    }, 8000);
    return () => window.clearTimeout(timer);
    // goNext closes over puzzleIndex/activeShelf; listing those deps avoids stale advance / double-fire.
  }, [checked, isCorrect, puzzleIndex, activeShelf, activePuzzles.length, isLearnPhase]);

  const sectionChips: BoardSectionChip[] =
    activeShelf === 'prarambhah' ? buildMatraSectionChips(activePuzzles)
      : activeShelf === 'prakrtih' ? buildNatureSectionChips(activePuzzles)
        : [];
  const activeChipId = activeSectionChipId(sectionChips, puzzleIndex);

  const jumpToSection = (start: number) => {
    if (start < 0 || !activePuzzles.length) return;
    const clamped = Math.max(0, Math.min(start, activePuzzles.length - 1));
    setPuzzleIndexByShelf((current) => ({ ...current, [activeShelf]: clamped }));
    setChosen([]);
    setChecked(false);
    setWrongAttempt(false);
  };

  const activeStep = (checked && isCorrect) ? 2 : 1;
  const graphicWord = ((activePuzzle?.answer ?? activePuzzle?.target ?? activePuzzle?.highlight) || '').normalize('NFC');
  const puzzleGraphic = graphicWord ? iconForExampleWord(graphicWord) : '✨';

  return <main className="board-shell">
    <nav className="wing-nav" aria-label="Learning shelves">
      {shelfButtons.map((item) => (
        <button key={item.id} type="button" className={activeShelf === item.id ? 'wing-button active' : 'wing-button'} onClick={() => chooseShelf(item.id)}>{item.label}</button>
      ))}
    </nav>

    {sectionChips.length > 0 && (
      <div className="board-sections" role="group" aria-label="Jump to section">
        {sectionChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className={activeChipId === chip.id ? 'board-section-chip active' : 'board-section-chip'}
            onClick={() => jumpToSection(chip.start)}
          >
            {chip.label}
          </button>
        ))}
      </div>
    )}

    <div className="board-tip-row">
      <p className="board-tip">{isLearnPhase
        ? <>Hear the word, read the meaning, then <strong className="tip-next">Click Next</strong>.</>
        : isJodoSkin
          ? <>On top, click one or two letter chips. Below, click क then आ — picture and sentence appear. Then <strong className="tip-next">Click Next</strong>.</>
          : emphasizeTipText('Click a cream tile. The picture and sentence appear. Then Click Next.')}</p>
      {phaseBanner ? <p className="board-phase">{phaseBanner}</p> : null}
      <button className="welcome-open" type="button" aria-label="Open Welcome" onClick={() => setWelcomeOpen(true)}>?</button>
    </div>

    {loading && <p className="board-status">Loading today&apos;s shelf…</p>}
    {error && <p className="board-status error">{error}</p>}

    {!loading && !error && activePuzzle && <>
      {packTitle && <div className="pack-shelf" aria-label="Packs">
        <div className="pack-card active">
          <strong>{displayPackTitle}</strong>
          {displayPackGloss && <small>{displayPackGloss}</small>}
        </div>
      </div>}

      <section className="puzzle-board">
        <div className="puzzle-meta">
          <span className="meta-skin">{displaySkin}</span>
          <span className="meta-sep" aria-hidden="true">·</span>
          <span className="meta-hint">{isLearnPhase
            ? 'Learn the word'
            : isJodoSkin
              ? 'जोडो'
              : '1 tile → Next'}</span>
          <span className="meta-sep" aria-hidden="true">·</span>
          <span className="meta-progress">{puzzleIndex + 1} / {activePuzzles.length}</span>
        </div>

        {!isLearnPhase && !isJodoSkin && (
          <ol className="puzzle-steps" aria-label="Puzzle steps">
            <li className={activeStep === 1 ? 'active' : undefined}>
              <span className="step-num" aria-hidden="true">1</span>
              <span className="step-label">
                <>Click a cream tile <small>(numbers on tiles)</small></>
              </span>
            </li>
            <li className={activeStep === 2 ? 'active' : undefined}>
              <span className="step-num" aria-hidden="true">2</span>
              <span className="step-label">Click Next</span>
            </li>
          </ol>
        )}

        {isLearnPhase ? (
          <div className="learn-card">
            <p className="learn-word">{activePuzzle.target}</p>
            <p className="learn-gloss">{activePuzzle.gloss ?? activePuzzle.english}</p>
            <button
              className="hear-button"
              type="button"
              onClick={() => playPronunciation(activePuzzle.target)}
            >
              Hear
            </button>
            <div className="tile-row learn-tile-row">
              {activePuzzle.tiles.map((tile, index) => (
                <button
                  key={`${tile}-${index}`}
                  className="puzzle-tile"
                  type="button"
                  onClick={() => playPronunciation(cleanTile(tile))}
                >
                  <span className="tile-num" aria-hidden="true">{index + 1}</span>
                  <span>{tile}</span>
                </button>
              ))}
            </div>
            <div className="puzzle-actions">
              <button ref={nextBtnRef} className="next-button learn-next" type="button" onClick={onNextOrAgain}>
                {isLastPuzzle ? 'Again' : 'I learnt it · Next'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="puzzle-prompt">
              {isMatchMeaningPhase
                ? (activePuzzle.prompt ?? `Which word means · ${activePuzzle.gloss ?? activePuzzle.english}?`)
                : (activePuzzle.prompt ?? activePuzzle.target)}
            </p>

            <div className="tile-row">
              {activePuzzle.tiles.map((tile, index) => (
                <button key={`${tile}-${index}`} className={chosen.includes(cleanTile(tile)) ? 'puzzle-tile chosen' : 'puzzle-tile'} onClick={() => toggleTile(tile)}>
                  <span className="tile-num" aria-hidden="true">{index + 1}</span>
                  <span>{tile}</span>
                </button>
              ))}
            </div>

            {checked && isCorrect && (
              <div className="puzzle-result correct">
                <div className="puzzle-graphic" aria-hidden="true">{puzzleGraphic}</div>
                <p className="result-sanskrit">{highlightedSentence(activePuzzle.sentence, activePuzzle.highlight, activePuzzle.tapHighlight)}</p>
                <p className="result-english">{activePuzzle.english}</p>
                {isMatchMeaningPhase && (
                  <button
                    className="hear-button hear-button--inline"
                    type="button"
                    onClick={() => playPronunciation(activePuzzle.target)}
                  >
                    Hear
                  </button>
                )}
                {activePuzzle.seed && <p className="result-seed">{activePuzzle.seed}</p>}
                {hasNextPuzzle && <button ref={nextBtnRef} className="next-button" type="button" onClick={onNextOrAgain}>{isLastPuzzle ? 'Again' : 'Next'}</button>}
              </div>
            )}
            {wrongAttempt && (
              <div className="puzzle-result"><strong>{wrongAttemptMessage}</strong></div>
            )}
          </>
        )}
      </section>

      {activeShelf === 'sariram' && <aside className="board-sidebar" aria-label="Body anecdote">
        <p>{BODY_ANECDOTE}</p>
      </aside>}
    </>}

    {welcomeOpen && <>
      <div className="welcome-scrim" role="presentation" onClick={() => setWelcomeOpen(false)} />
      <aside className="welcome-overlay" aria-label="Welcome">
        <button className="welcome-close" type="button" aria-label="Close Welcome" onClick={() => setWelcomeOpen(false)}>×</button>
        {visitorBlocks.map((block, index) => React.createElement(block.heading, { key: `${block.heading}-${index}` }, emphasizeTipText(block.text)))}
      </aside>
    </>}
  </main>;
};

export default Board;