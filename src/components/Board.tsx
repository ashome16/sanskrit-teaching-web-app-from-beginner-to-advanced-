import React, { useEffect, useState } from 'react';
import '../styles/board.css';
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

const MARK: Record<string, string> = { 'आ': 'ा', 'इ': 'ि', 'उ': 'ु', 'ए': 'े', 'ओ': 'ो' };
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


/** Bold “Read the sentence” / Click Next inside tip or welcome copy (labels loop + visitor **markdown**). */
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

  const isCorrect = (() => {
    if (!activePuzzle) return false;
    const target = (activePuzzle.answer ?? activePuzzle.target).normalize('NFC');
    const wholeWordRow = activePuzzle.tiles.some((tile) => cleanTile(tile).normalize('NFC') === target);
    // Question-word rows: exactly one tile, exact match (कः ≠ क, and कथम् is never right here)
    if (wholeWordRow) {
      return chosen.length === 1 && cleanTile(chosen[0]).normalize('NFC') === target;
    }
    // जोडो joins: any order of the two cream tiles
    if (activePuzzle.target === 'का') {
      const chosenSet = new Set(chosen.map((tile) => cleanTile(tile).normalize('NFC')));
      const isKaAaPair = chosenSet.size === 2 && chosen.length === 2
        && (chosenSet.has('क') && (chosenSet.has('आ') || chosenSet.has('ा')));
      return glueMatchesTarget(chosen, 'का') || isKaAaPair;
    }
    return glueMatchesTarget(chosen, target);
  })();

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
  const phaseBanner = isPrashnaPart
    ? 'Part 2 — question words. Click one cream tile.'
    : (activeBoardShelf?.skin === 'जोडो' && activeShelf === 'prarambhah' && !targetIsWholeTile
      ? 'Part 1 — join letters. Click two cream tiles.'
      : '');

  // जोडो joins (क+आ) stay multi-tap. Question-words (कः on a tile) are one tap.
  const isJodoSkin = (!activeBoardShelf || activeBoardShelf.skin === 'जोडो') && !targetIsWholeTile;

  const shownTarget = (activePuzzle?.prompt ?? activePuzzle?.target) || '';
  const hasBlank = !isLearnPhase && !isMatchMeaningPhase && (
    shownTarget.includes('____')
    || activeBoardShelf?.skin === 'रिक्तम्'
    || isPrashnaPart
  );
  const wrongAttemptMessage = isMatchMeaningPhase
    ? 'Not that cream word — pick the one that matches the meaning, then Read the sentence again.'
    : hasBlank
      ? 'Not that cream tile — try another, then Read the sentence again.'
      : isJodoSkin
        ? 'Not those tiles. Click the right letter and vowel (any order), then Read the sentence again.'
        : 'Not that cream tile — try another, then Read the sentence again.';

  const toggleTile = (tile: string) => {
    if (checked && isCorrect) return;
    const clean = cleanTile(tile);
    if (!clean) return;
    setWrongAttempt(false);
    if (!isJodoSkin) {
      setChosen((current) => current[0] === clean ? [] : [clean]);
      return;
    }
    setChosen((current) => current.includes(clean) ? current.filter((item) => item !== clean) : [...current, clean]);
  };

  const submitCheck = () => {
    if (chosen.length === 0) return;
    if (isCorrect) {
      setChecked(true);
      setWrongAttempt(false);
    } else {
      setWrongAttempt(true);
      setChecked(false);
      // One-tile rows: keep the gold tile so the child can click a different word
      if (!targetIsWholeTile) setChosen([]);
    }
  };

  const hasNextPuzzle = (isLearnPhase || isCorrect) && activePuzzles.length > 0;
  const isLastPuzzle = activePuzzles.length > 0 && puzzleIndex + 1 >= activePuzzles.length;

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

  /** Advance without wrapping — used by Next and auto-advance. */
  const goNext = () => {
    if (!activePuzzles.length) return;
    if (puzzleIndex + 1 >= activePuzzles.length) return;
    setPuzzleIndexByShelf((current) => ({ ...current, [activeShelf]: puzzleIndex + 1 }));
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

  // After a correct Check, auto-advance so later मात्रा rows still appear if Next is missed.
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

  return <main className="board-shell">
    <nav className="wing-nav" aria-label="Learning shelves">
      {shelfButtons.map((item) => (
        <button key={item.id} className={activeShelf === item.id ? 'wing-button active' : 'wing-button'} onClick={() => chooseShelf(item.id)}>{item.label}</button>
      ))}
    </nav>

    <div className="board-tip-row">
      <p className="board-tip">{isLearnPhase
        ? <>Hear the word, read the meaning, then <strong className="tip-next">Click Next</strong>.</>
        : isMatchMeaningPhase
          ? <>Click the first cream tile — numbers are on the tiles. Then <strong>Read the sentence</strong>. Then <strong className="tip-next">Click Next</strong>.</>
          : isPrashnaPart
            ? <>Click the first cream tile — numbers are on the tiles. Part 2: who/what/where…. Then <strong>Read the sentence</strong>. Then <strong className="tip-next">Click Next</strong>.</>
            : (activeBoardShelf?.skin === 'जोडो' && activeShelf === 'prarambhah' && !targetIsWholeTile
              ? <>Part 1: click TWO cream tiles (any order) — numbers are on the tiles. Then <strong>Read the sentence</strong>. Then <strong className="tip-next">Click Next</strong> — or wait a few seconds and it moves on.</>
              : hasBlank
                ? <>Click the first cream tile — numbers are on the tiles. Then <strong>Read the sentence</strong>. Then <strong className="tip-next">Click Next</strong>.</>
                : isJodoSkin
                  ? <>Click TWO cream tiles (any order) — numbers are on the tiles. Then <strong>Read the sentence</strong>. Then <strong className="tip-next">Click Next</strong>.</>
                  : <>Click the first cream tile — numbers are on the tiles. Then <strong>Read the sentence</strong>. Then <strong className="tip-next">Click Next</strong>.</>)}</p>
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
            : isMatchMeaningPhase
              ? 'Click first tile'
              : (targetIsWholeTile || !isJodoSkin
                ? 'Click first tile'
                : (activeBoardShelf?.skin === 'जोडो' ? 'Click 2 tiles' : 'Click first tile'))}</span>
          <span className="meta-sep" aria-hidden="true">·</span>
          <span className="meta-progress">{puzzleIndex + 1} / {activePuzzles.length}</span>
        </div>

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
              <button className="next-button learn-next" type="button" onClick={onNextOrAgain}>
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

            <div className="puzzle-actions">
              <button className="check-button" onClick={submitCheck}>Read the sentence</button>
            </div>

            {checked && isCorrect && (
              <div className="puzzle-result correct">
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
                {hasNextPuzzle && <button className="next-button" type="button" onClick={onNextOrAgain}>{isLastPuzzle ? 'Again' : 'Next'}</button>}
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