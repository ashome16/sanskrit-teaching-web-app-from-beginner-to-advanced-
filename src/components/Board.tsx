import React, { useEffect, useState } from 'react';
import '../styles/board.css';

type Shape = 'जोडो' | 'बनाओ' | 'मेलः' | 'रिक्तम्' | 'प्रश्न' | 'क्रमः';
type Wing = 'prarambhah' | 'sariram' | 'ganitam' | 'bhugolah' | 'sanskritih' | 'krida' | 'sutram';

interface Puzzle { shape: Shape; target: string; answer: string; tiles: string[]; sentence: string; english: string; seed: string; }
interface Pack { id: string; wing: Wing; title: string; dropdown: string; shapes: Shape[]; note: string; }
interface WeekRow { day: number; wing: Wing; pack: string; shape: Shape; target: string; }
interface SoundRow { letter: string; place: string; voice: string; puff: string; nose: string; beats: string; }

const WINGS: { id: Wing; label: string }[] = [
  { id: 'prarambhah', label: 'Beginners' }, { id: 'sariram', label: 'Body' },
  { id: 'ganitam', label: 'Maths' }, { id: 'bhugolah', label: 'Map' },
  { id: 'sanskritih', label: 'Sanskriti' }, { id: 'krida', label: 'Play' }, { id: 'sutram', label: 'Sūtram' },
];

const parse = (text: string) => text.split(/\r?\n/).filter((line) => line.trim() && !line.startsWith('#')).map((line) => line.split('|').map((part) => part.trim()));
const fetchText = (name: string) => fetch(`./${name}?t=${Date.now()}`).then((response) => response.text());

const Board: React.FC = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [week, setWeek] = useState<WeekRow[]>([]);
  const [soundRows, setSoundRows] = useState<SoundRow[]>([]);
  const [soundLetter, setSoundLetter] = useState<SoundRow | null>(null);
  const [wing, setWing] = useState<Wing>(() => (localStorage.getItem('last-wing') as Wing) || 'prarambhah');
  const [packId, setPackId] = useState(() => localStorage.getItem('last-pack') || '');
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([fetchText('puzzles.txt'), fetchText('packs.txt'), fetchText('week.txt'), fetchText('sound-toy.txt')])
      .then(([puzzleText, packText, weekText, soundText]) => {
        setPuzzles(parse(puzzleText).map(([shape, target, answer, tiles, sentence, english, seed]) => ({ shape: shape as Shape, target, answer, tiles: tiles.split(',').map((tile) => tile.trim()), sentence, english, seed })));
        setPacks(parse(packText).map(([id, packWing, title, dropdown, shapes, note]) => ({ id, wing: packWing as Wing, title, dropdown, shapes: shapes.split(',').map((shape) => shape.trim() as Shape), note })));
        setWeek(parse(weekText).map(([day, rowWing, pack, shape, target]) => ({ day: Number(day), wing: rowWing as Wing, pack, shape: shape as Shape, target })));
        setSoundRows(parse(soundText).map(([letter, place, voice, puff, nose, beats]) => ({ letter, place, voice, puff, nose, beats })));
      })
      .catch(() => setError('The board files could not be loaded.'))
      .finally(() => setLoading(false));
  }, []);

  const visiblePacks = packs.filter((pack) => pack.wing === wing);
  const activePackId = visiblePacks.some((pack) => pack.id === packId) ? packId : visiblePacks[0]?.id || '';
  const activePack = visiblePacks.find((pack) => pack.id === activePackId);
  const today = week.find((row) => row.wing === wing && row.pack === activePackId);
  const puzzle = puzzles.find((item) => item.shape === (today?.shape || activePack?.shapes[0]) && item.target === (today?.target || activePack?.title)) || puzzles.find((item) => activePack?.shapes.includes(item.shape));
  const fusedChosen = chosen.join('').replace(/([क-ह])आ/g, '$1ा').replace(/ः$/, '');

  const chooseWing = (nextWing: Wing) => { setWing(nextWing); setPackId(''); setChecked(false); setChosen([]); localStorage.setItem('last-wing', nextWing); };
  const choosePack = (nextPack: string) => { setPackId(nextPack); setChecked(false); setChosen([]); localStorage.setItem('last-pack', nextPack); };
  const toggleTile = (tile: string) => {
    const sound = soundRows.find((row) => row.letter === tile || tile.startsWith(row.letter));
    if (sound) { setSoundLetter(sound); window.setTimeout(() => setSoundLetter(null), 1000); }
    if (checked) return;
    setChosen((current) => current.includes(tile) ? current.filter((item) => item !== tile) : [...current, tile]);
  };

  return <main className="board-shell">
    <nav className="wing-nav" aria-label="Learning wings">
      {WINGS.map((item) => <button key={item.id} className={wing === item.id ? 'wing-button active' : 'wing-button'} onClick={() => chooseWing(item.id)}>{item.label}</button>)}
    </nav>
    <section className="board-heading"><div><p className="eyebrow">ONE BOARD / {today ? `DAY ${today.day}` : 'SHELF'}</p><h2>{activePack?.title || 'Choose a pack'}</h2><p>{activePack?.note || 'Pick a shelf to begin.'}</p></div><span className="board-mark">ॐ</span></section>
    {loading && <p className="board-status">Loading today&apos;s shelf…</p>}
    {error && <p className="board-status error">{error}</p>}
    {!loading && !error && <>
      <div className="pack-shelf" aria-label="Packs">{visiblePacks.map((pack) => <button key={pack.id} className={pack.id === activePackId ? 'pack-card active' : 'pack-card'} onClick={() => choosePack(pack.id)}><span>{pack.dropdown}</span><strong>{pack.title}</strong><small>{pack.note}</small></button>)}</div>
        {puzzle && <section className={`puzzle-board ${checked ? 'is-checked' : ''}`}>
        <div className="puzzle-meta"><span>{puzzle.shape}</span><span>Target: <b>{puzzle.target}</b></span></div>
        <div className="tile-row">{puzzle.tiles.map((tile, index) => <button key={`${tile}-${index}`} className={chosen.includes(tile) ? 'puzzle-tile chosen' : 'puzzle-tile'} onClick={() => toggleTile(tile)}><span>{tile}</span><small>{puzzle.seed}</small></button>)}</div>
        <button className="check-button" onClick={() => setChecked(true)}>Check</button>
        {checked && <div className={`puzzle-result ${fusedChosen === puzzle.answer.replace(/ः$/, '') ? 'correct' : ''}`}><strong>{fusedChosen === puzzle.answer.replace(/ः$/, '') ? 'अभिनन्दन' : 'Try the row again'}</strong><p className="result-english">{puzzle.english}</p><p className="result-sanskrit">{puzzle.sentence}</p><p className="result-seed">{puzzle.seed}</p></div>}
      </section>}
    </>}
    {soundLetter && <div className="sound-overlay" role="status"><strong>{soundLetter.letter}</strong><span>place: {soundLetter.place}</span><span>voice: {soundLetter.voice === '1' ? 'ghoṣa' : 'aghoṣa'}</span><span>puff: {soundLetter.puff === '1' ? 'mahāprāṇa' : 'alpa'}</span><span>nose: {soundLetter.nose === '1' ? 'anunāsika' : 'oral'}</span><span>{'● '.repeat(Number(soundLetter.beats)).trim()}</span><small>A picture of the rule, not a recording. Hand on throat for voice.</small></div>}
  </main>;
};

export default Board;