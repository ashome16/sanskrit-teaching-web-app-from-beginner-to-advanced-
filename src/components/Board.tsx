import React, { useEffect, useState } from 'react';
import '../styles/board.css';

type Shape = 'जोडो' | 'बनाओ' | 'मेलः' | 'रिक्तम्' | 'प्रश्न' | 'क्रमः';
type Wing = 'prarambhah' | 'sariram' | 'ganitam' | 'bhugolah' | 'sanskritih' | 'krida' | 'nature';

interface Puzzle { shape: Shape; target: string; answer: string; tiles: string[]; sentence: string; english: string; seed: string; }
interface Pack { id: string; wing: Wing; title: string; dropdown: string; shapes: Shape[]; note: string; }
interface WeekRow { day: number; wing: Wing; pack: string; shape: Shape; target: string; }
interface BoardFile { labels?: string[]; packs?: Array<{ id: string; wing: Wing; title: string; dropdown: string; shapes: Shape[]; note: string }>; puzzles?: Array<{ shape: Shape; target: string; answer: string; tiles: string[]; sentence: string; english: string; seed: string }>; week?: Array<{ day: number; wing: Wing; pack: string; shape: Shape; target: string }>; }

const FALLBACK_WINGS: { id: Wing; label: string }[] = [
  { id: 'prarambhah', label: 'Beginners' },
  { id: 'sariram', label: 'Body' },
  { id: 'ganitam', label: 'Maths' },
  { id: 'bhugolah', label: 'Map' },
  { id: 'sanskritih', label: 'Sanskriti' },
  { id: 'krida', label: 'Play' },
  { id: 'nature', label: 'Nature' },
];

const PIECE_LINE = 'Pencil piece: write the next word by hand.';

const parse = (text: string) => text.split(/\r?\n/).filter((line) => line.trim() && !line.startsWith('#')).map((line) => line.split('|').map((part) => part.trim()));
const fetchText = (name: string) => fetch(`./${name}?t=${Date.now()}`).then((response) => response.text());
const cleanTile = (tile: string) => tile.replace(/\u200B/g, '').normalize('NFC').trim();

const MARK: Record<string, string> = { 'आ': 'ा', 'इ': 'ि', 'उ': 'ु', 'ए': 'े', 'ओ': 'ो' };
function glueTiles(tiles: string[]) {
  return tiles.map((tile) => cleanTile(tile)).map((tile) => MARK[tile] ?? tile).join('').normalize('NFC');
}

const Board: React.FC = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [week, setWeek] = useState<WeekRow[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [wing, setWing] = useState<Wing>(() => (localStorage.getItem('last-wing') as Wing) || 'prarambhah');
  const [packId, setPackId] = useState(() => localStorage.getItem('last-pack') || '');
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const boardText = await fetchText('board.json').catch(() => '');
        if (boardText.trim()) {
          const boardJson = JSON.parse(boardText) as BoardFile;
          if (boardJson?.puzzles?.length) {
            setPuzzles(boardJson.puzzles.map((item) => ({ ...item, tiles: item.tiles.map(cleanTile).filter(Boolean) })));
            setPacks((boardJson.packs ?? []).map((item) => ({ ...item, shapes: item.shapes.map((shape) => shape.trim() as Shape) })));
            setWeek((boardJson.week ?? []).map((item) => ({ ...item, shape: item.shape as Shape })));
            setLabels(boardJson.labels && boardJson.labels.length ? boardJson.labels : FALLBACK_WINGS.map((wingDef) => wingDef.label));
            setLoading(false);
            return;
          }
        }

        const [puzzleText, packText, weekText, labelText] = await Promise.all([
          fetchText('puzzles.txt'),
          fetchText('packs.txt'),
          fetchText('week.txt'),
          fetchText('labels.txt').catch(() => ''),
        ]);

        const parsedLabels = labelText
          .split(/\r?\n/)
          .map((item) => item.trim())
          .filter(Boolean);

        setPuzzles(parse(puzzleText).map(([shape, target, answer, tiles, sentence, english, seed]) => ({
          shape: shape as Shape,
          target,
          answer,
          tiles: tiles.split(',').map((tile) => cleanTile(tile)).filter(Boolean),
          sentence,
          english,
          seed,
        })));

        setPacks(parse(packText).map(([id, packWing, title, dropdown, shapes, note]) => ({
          id,
          wing: packWing as Wing,
          title,
          dropdown,
          shapes: shapes.split(',').map((shape) => shape.trim() as Shape),
          note,
        })));

        setWeek(parse(weekText).map(([day, rowWing, pack, shape, target]) => ({
          day: Number(day),
          wing: rowWing as Wing,
          pack,
          shape: shape as Shape,
          target,
        })));

        setLabels(parsedLabels.length ? parsedLabels : FALLBACK_WINGS.map((wingDef) => wingDef.label));
      } catch {
        setError('The board files could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    void loadBoard();
  }, []);

  const wingLabels = FALLBACK_WINGS.map((item) => ({ ...item, label: labels[item.id === 'nature' ? 6 : FALLBACK_WINGS.findIndex((entry) => entry.id === item.id)] || item.label }));
  const visiblePacks = packs.filter((pack) => pack.wing === wing);
  const activePackId = visiblePacks.some((pack) => pack.id === packId) ? packId : visiblePacks[0]?.id || '';
  const activePack = visiblePacks.find((pack) => pack.id === activePackId);
  const today = week.find((row) => row.wing === wing && row.pack === activePackId);
  const puzzle = puzzles.find((item) => item.shape === (today?.shape || activePack?.shapes[0]) && item.target === (today?.target || activePack?.title)) || puzzles.find((item) => activePack?.shapes.includes(item.shape)) || puzzles[0];

  const isJoinShape = puzzle?.shape === 'जोडो' || puzzle?.shape === 'बनाओ';
  const isCorrect = (() => {
    if (!puzzle) return false;
    const target = puzzle.answer.normalize('NFC');
    if (isJoinShape) {
      const targetNoVisarga = target.replace(/ः$/, '');
      const matches = (tiles: string[]) => {
        const glued = glueTiles(tiles);
        return glued === target || glued === targetNoVisarga;
      };
      if (chosen.length === 2) return matches(chosen) || matches([chosen[1], chosen[0]]);
      return matches(chosen);
    }
    return chosen.map((tile) => cleanTile(tile).normalize('NFC')).join('') === target;
  })();

  const chooseWing = (nextWing: Wing) => {
    setWing(nextWing);
    setPackId('');
    setChecked(false);
    setChosen([]);
    localStorage.setItem('last-wing', nextWing);
  };

  const choosePack = (nextPack: string) => {
    setPackId(nextPack);
    setChecked(false);
    setChosen([]);
    localStorage.setItem('last-pack', nextPack);
  };

  const toggleTile = (tile: string) => {
    if (checked) return;
    const clean = cleanTile(tile);
    setChosen((current) => current.includes(clean) ? current.filter((item) => item !== clean) : [...current, clean]);
  };

  return <main className="board-shell">
    <nav className="wing-nav" aria-label="Learning wings">
      {wingLabels.map((item) => <button key={item.id} className={wing === item.id ? 'wing-button active' : 'wing-button'} onClick={() => chooseWing(item.id)}>{item.label}</button>)}
    </nav>

    <p className="board-tip">Pick a shelf. Tap tiles. Then Check.</p>

    <section className="board-heading">
      <div>
        <p className="eyebrow">ONE BOARD / {today ? `DAY ${today.day}` : 'BOARD'}</p>
        <h2>{activePack?.title || 'Choose a pack'}</h2>
        {!activePack && <p>Pick a shelf to begin.</p>}
      </div>
      <span className="board-mark">ॐ</span>
    </section>

    {loading && <p className="board-status">Loading today&apos;s shelf…</p>}
    {error && <p className="board-status error">{error}</p>}

    {!loading && !error && <>
      <div className="pack-shelf" aria-label="Packs">
        {visiblePacks.map((pack) => (
          <button key={pack.id} className={pack.id === activePackId ? 'pack-card active' : 'pack-card'} onClick={() => choosePack(pack.id)}>
            <span>{pack.dropdown}</span>
            <small>{pack.note}</small>
          </button>
        ))}
      </div>

      {puzzle && <section className={`puzzle-board ${checked ? 'is-checked' : ''}`}>
        <div className="puzzle-meta">
          <span>{puzzle.shape}</span>
          <span>Target: <b>{puzzle.target}</b></span>
        </div>

        {puzzle.shape === 'रिक्तम्' && <p className="puzzle-prompt">{puzzle.sentence.replace(puzzle.answer, '____')}</p>}

        <div className="tile-row">
          {puzzle.tiles.map((tile, index) => (
            <button key={`${tile}-${index}`} className={chosen.includes(tile) ? 'puzzle-tile chosen' : 'puzzle-tile'} onClick={() => toggleTile(tile)}>
              <span>{tile}</span>
            </button>
          ))}
        </div>

        <button className="check-button" onClick={() => setChecked(true)}>Check</button>

        {checked && (isCorrect ? (
          <div className="puzzle-result correct">
            <strong>{puzzle.target}</strong>
            <p className="result-english">{puzzle.english}</p>
            <p className="result-sanskrit">{puzzle.sentence}</p>
            {puzzle.seed && <p className="result-seed">{puzzle.seed}</p>}
          </div>
        ) : (
          <div className="puzzle-result"><strong>Try again.</strong></div>
        ))}
      </section>}

      <aside className="board-sidebar" aria-label="Piece note">
        <span aria-hidden="true">✎</span>
        <p>{PIECE_LINE}</p>
      </aside>
    </>}
  </main>;
};

export default Board;