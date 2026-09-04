import React, { useEffect, useState } from 'react';
import '../styles/board.css';

type ShelfId = 'prarambhah' | 'sariram' | 'ganitam' | 'bhugolah' | 'sanskritih' | 'krida' | 'prakrtih';

interface ShelfButton { id: ShelfId; label: string; }
interface BoardPuzzle { target: string; tiles: string[]; answer?: string; english: string; sentence?: string; highlight?: string; tapHighlight?: string; seed?: string; prompt?: string; }
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

const Board: React.FC = () => {
  const [shelfButtons, setShelfButtons] = useState<ShelfButton[]>(DEFAULT_SHELVES);
  const [boardShelves, setBoardShelves] = useState<BoardShelfLine[]>([]);
  const [fallbackPuzzles, setFallbackPuzzles] = useState<BoardPuzzle[]>([]);
  const [packLabels, setPackLabels] = useState<PackLabel[]>([]);
  const [visitorBlocks, setVisitorBlocks] = useState<VisitorBlock[]>([]);
  const [loopLine, setLoopLine] = useState('Pick a shelf. Tap tiles. Then Check.');
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
        const loopRow = labelRows.find((parts) => parts[0] === 'site' && parts[1] === 'loop');
        if (loopRow?.[2]) setLoopLine(loopRow[2]);
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
  const puzzleIndex = puzzleIndexByShelf[activeShelf] ?? 0;
  const activePuzzle = activePuzzles[puzzleIndex] ?? activePuzzles[0] ?? fallbackPuzzles[0] ?? null;
  const activePackLabel = packLabels.find((item) => item.title === activeBoardShelf?.native) ?? null;
  const packTitle = activePackLabel?.title ?? activeBoardShelf?.native ?? '';
  const packGloss = activePackLabel?.gloss ?? '';

  const isCorrect = (() => {
    if (!activePuzzle) return false;
    const target = (activePuzzle.answer ?? activePuzzle.target).normalize('NFC');
    if (activePuzzle.target === 'का') {
      const glued = glueTiles(chosen);
      const chosenSet = new Set(chosen.map((tile) => cleanTile(tile).normalize('NFC')));
      const isKaAaPair = chosenSet.size === 2 && chosen.length === 2
        && (chosenSet.has('क') && (chosenSet.has('आ') || chosenSet.has('ा')));
      return glued === 'का' || isKaAaPair;
    }
    if (activePuzzle.target === 'मा' || activePuzzle.target === 'सा' || activePuzzle.target === 'बालः') {
      // Same glue as का: म+आ → मा, not मआ
      return glueTiles(chosen) === target;
    }
    const targetNoVisarga = target.replace(/ः$/, '');
    const glued = glueTiles(chosen);
    return glued === target || glued === targetNoVisarga;
  })();

  const chooseShelf = (nextShelf: ShelfId) => {
    setActiveShelf(nextShelf);
    setChecked(false);
    setWrongAttempt(false);
    setChosen([]);
    localStorage.setItem('last-board-shelf', nextShelf);
  };

  const targetWord = ((activePuzzle?.answer ?? activePuzzle?.target) || '').normalize('NFC');
  const targetIsWholeTile = !!activePuzzle?.tiles?.some((tile) => cleanTile(tile).normalize('NFC') === targetWord);
  // जोडो joins (क+आ) stay multi-tap. Question-words (कः on a tile) are one tap.
  const isJodoSkin = (!activeBoardShelf || activeBoardShelf.skin === 'जोडो') && !targetIsWholeTile;

  const toggleTile = (tile: string) => {
    if (checked) return;
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
    if (isCorrect) {
      setChecked(true);
      setWrongAttempt(false);
    } else {
      setChecked(false);
      setWrongAttempt(true);
      setChosen([]);
    }
  };

  const hasNextPuzzle = isCorrect && puzzleIndex + 1 < activePuzzles.length;

  const chooseNextPuzzle = () => {
    if (!hasNextPuzzle) return;
    setPuzzleIndexByShelf((current) => ({ ...current, [activeShelf]: puzzleIndex + 1 }));
    setChecked(false);
    setWrongAttempt(false);
    setChosen([]);
  };

  return <main className="board-shell">
    <nav className="wing-nav" aria-label="Learning shelves">
      {shelfButtons.map((item) => (
        <button key={item.id} className={activeShelf === item.id ? 'wing-button active' : 'wing-button'} onClick={() => chooseShelf(item.id)}>{item.label}</button>
      ))}
    </nav>

    <div className="board-tip-row">
      <p className="board-tip">{targetIsWholeTile ? 'Tap one tile (the whole word). Then Check.' : loopLine}</p>
      <button className="welcome-open" type="button" aria-label="Open Welcome" onClick={() => setWelcomeOpen(true)}>?</button>
    </div>

    {loading && <p className="board-status">Loading today&apos;s shelf…</p>}
    {error && <p className="board-status error">{error}</p>}

    {!loading && !error && activePuzzle && <>
      {packTitle && <div className="pack-shelf" aria-label="Packs">
        <div className="pack-card active">
          <strong>{packTitle}</strong>
          {packGloss && <small>{packGloss}</small>}
        </div>
      </div>}

      <section className="puzzle-board">
        <div className="puzzle-meta">
          <span>{activeBoardShelf?.skin}</span>
          <span>Target: <b>{activePuzzle.prompt ?? activePuzzle.target}</b></span>
        </div>

        <div className="tile-row">
          {activePuzzle.tiles.map((tile, index) => (
            <button key={`${tile}-${index}`} className={chosen.includes(tile) ? 'puzzle-tile chosen' : 'puzzle-tile'} onClick={() => toggleTile(tile)}>
              <span>{tile}</span>
            </button>
          ))}
        </div>

        <button className="check-button" onClick={submitCheck}>Check</button>

        {checked && isCorrect && (
          <div className="puzzle-result correct">
            <p className="result-sanskrit">{highlightedSentence(activePuzzle.sentence, activePuzzle.highlight, activePuzzle.tapHighlight)}</p>
            <p className="result-english">{activePuzzle.english}</p>
            {activePuzzle.seed && <p className="result-seed">{activePuzzle.seed}</p>}
            {hasNextPuzzle && <button className="next-button" type="button" onClick={chooseNextPuzzle}>Next</button>}
          </div>
        )}
        {wrongAttempt && (
          <div className="puzzle-result"><strong>Try the row again.</strong></div>
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
        {visitorBlocks.map((block, index) => React.createElement(block.heading, { key: `${block.heading}-${index}` }, block.text))}
      </aside>
    </>}
  </main>;
};

export default Board;