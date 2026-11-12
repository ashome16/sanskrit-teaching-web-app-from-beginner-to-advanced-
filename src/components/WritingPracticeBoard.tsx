import { createPortal } from 'react-dom';
import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { WRITING_PRACTICE_WORDS, WRITING_CHAINS, SYLLABLE_PRACTICE_WORDS, assignmentPracticeWords, type PracticeWord } from '../data/writingPracticeWords';
import { playSanskritPassage } from '../utils/pronunciation';
import { SanskritInputBox } from './SanskritInputBox';
import '../styles/writing-practice-board.css';

type Point = { x: number; y: number };
type Stroke = { points: Point[]; erase: boolean; color: string; width: number };
const HEIGHT = 500;
const FAMILY = '"Noto Sans Devanagari", "Noto Serif Devanagari", sans-serif';
export const WritingPracticeBoard: React.FC<{ modelText: string; onInkChange?: (hasInk: boolean) => void }> = ({ modelText, onInkChange }) => {
  const assignmentWords = useMemo(() => assignmentPracticeWords(modelText), [modelText]);
  const [theme, setTheme] = useState('Everyday');
  const [query, setQuery] = useState('');
  const [custom, setCustom] = useState('');
  const [customWords, setCustomWords] = useState<PracticeWord[]>([]);
  const [selected, setSelected] = useState<PracticeWord>(WRITING_PRACTICE_WORDS.find(w => w.word === 'लेखनी') ?? WRITING_PRACTICE_WORDS[0]);
  const [message, setMessage] = useState('');
  const [practisedWords, setPractisedWords] = useState<Set<string>>(() => new Set());
  const [printing, setPrinting] = useState(false);
  const [color, setColor] = useState('#1d4ed8');
  const [erase, setErase] = useState(false);
  const [penWidth, setPenWidth] = useState(3);
  const [guides, setGuides] = useState(true);
  const [width, setWidth] = useState(800);
  const [fontSize, setFontSize] = useState(60);
  const [repeatStep, setRepeatStep] = useState(220);
  const [inkCount, setInkCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const activePointer = useRef<number | null>(null);
  const audioStop = useRef<(() => void) | null>(null);
  const allWords = useMemo(() => [...WRITING_PRACTICE_WORDS, ...WRITING_CHAINS, ...SYLLABLE_PRACTICE_WORDS, ...assignmentWords, ...customWords], [assignmentWords, customWords]);
  const filtered = allWords.filter(w => (theme === 'All' || w.theme === theme) && `${w.word} ${w.gloss} ${w.transliteration}`.toLowerCase().includes(query.toLowerCase()));
  const words = filtered.filter((word, i) => filtered.findIndex(w => w.word === word.word) === i);
  const selectedIndex = words.findIndex(w => w.word === selected.word);
  const redraw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (const stroke of strokes.current) {
      ctx.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over';
      ctx.strokeStyle = stroke.color; ctx.fillStyle = stroke.color; ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      const points = stroke.points;
      if (points.length === 1) { ctx.beginPath(); ctx.arc(points[0].x, points[0].y, stroke.width / 2, 0, Math.PI * 2); ctx.fill(); }
      else { ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke(); }
    }
    ctx.globalCompositeOperation = 'source-over';
  }, []);
  useLayoutEffect(() => {
    const el = surfaceRef.current; if (!el) return;
    const observer = new ResizeObserver(() => setWidth(Math.max(1, el.clientWidth)));
    observer.observe(el); setWidth(Math.max(1, el.clientWidth));
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(HEIGHT * dpr); redraw();
  }, [width, redraw]);
  useEffect(() => {
    let alive = true;
    const measure = () => {
      if (!alive) return;
      const ctx = document.createElement('canvas').getContext('2d'); if (!ctx) return;
      ctx.font = `64px ${FAMILY}`;
      const measured = ctx.measureText(selected.word).width;
      const size = Math.min(64, Math.max(12, 64 * (width - 44) / Math.max(measured, 1)));
      setFontSize(size); setRepeatStep(measured * size / 64 + 48);
    };
    measure(); document.fonts?.load(`64px "Noto Sans Devanagari"`, selected.word).then(measure).catch(() => {});
    return () => { alive = false; };
  }, [width, selected.word]);
  useEffect(() => { onInkChange?.(false); return () => audioStop.current?.(); }, [onInkChange]);
  const reportInk = () => {
    const canvas = canvasRef.current; const ctx = canvas?.getContext('2d');
    let visible = false;
    if (canvas && ctx) {
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 0) { visible = true; break; }
    }
    setInkCount(visible ? 1 : 0); onInkChange?.(visible);
  };
  const clear = () => { strokes.current = []; activePointer.current = null; redraw(); reportInk(); setMessage(''); };
  const choose = (word: PracticeWord) => { audioStop.current?.(); audioStop.current = null; setSelected(word); clear(); };
  const coords = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: Math.max(0, Math.min(rect.width, e.clientX - rect.left)), y: Math.max(0, Math.min(rect.height, e.clientY - rect.top)) };
  };
  const down = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointer.current !== null || (e.pointerType === 'mouse' && e.button !== 0)) return;
    e.preventDefault(); activePointer.current = e.pointerId; e.currentTarget.setPointerCapture(e.pointerId);
    strokes.current.push({ points: [coords(e)], erase, color, width: erase ? 24 : penWidth }); redraw(); reportInk();
  };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointer.current !== e.pointerId) return;
    e.preventDefault(); const stroke = strokes.current.at(-1); if (!stroke) return;
    stroke.points.push(coords(e)); redraw();
  };
  const up = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointer.current !== e.pointerId) return;
    activePointer.current = null; reportInk();
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const markPractice = () => {
    if (practisedWords.has(selected.word)) {
      setPractisedWords(previous => { const next = new Set(previous); next.delete(selected.word); return next; });
      setMessage('Practice mark removed for this word.');
      return;
    }
    if (!inkCount) { setMessage('Trace or write on the board first, then select “I practised”.'); return; }
    setPractisedWords(previous => new Set(previous).add(selected.word));
    setMessage('Marked as practised while this notebook is open. Compare your letters and mātrās with the model. This is not a handwriting score.');
  };
  const addCustom = () => {
    const word = custom.normalize('NFC').trim().replace(/\s+/g, ' ');
    if (!word || word.length > 32 || !/^[\u0900-\u097f\s]+$/.test(word)) { setMessage('Add a Devanāgarī word or short phrase, up to 32 characters.'); return; }
    const entry = { word, gloss: 'Your own practice text', transliteration: '', theme: 'My words' };
    setCustomWords(prev => [...prev.filter(w => w.word !== word), entry]); setTheme('My words'); setQuery(''); choose(entry); setCustom('');
  };
  useEffect(() => {
    if (!printing) return;
    document.body.classList.add('writing-practice-print');
    const done = () => { document.body.classList.remove('writing-practice-print'); setPrinting(false); };
    window.addEventListener('afterprint', done);
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
    return () => { cancelAnimationFrame(frame); window.removeEventListener('afterprint', done); document.body.classList.remove('writing-practice-print'); };
  }, [printing]);
  const printSheet = () => setPrinting(true);
  const printFontSize = Math.min(fontSize, fontSize * 650 / Math.max(repeatStep - 48, 1));
  const printRepeatStep = (repeatStep - 48) * printFontSize / fontSize + 48;
  return <section className="wpb" aria-label="Word tracing and copying notebook">
    <header className="wpb-heading"><div><h2>लेखनशाला · Writing Lab</h2><p>Look at the word. Follow the dots. Write it yourself.</p></div><button type="button" onClick={printSheet}>Print practice sheet</button></header>
    <div className="wpb-chain-picker" aria-label="Progressive word-building chains">
      <strong>Start small. Grow a word.</strong>
      {['Chain स', 'Chain न', 'Chain मा'].map(name => <button type="button" key={name} aria-pressed={theme === name} onClick={() => { setTheme(name); setQuery(''); const first = WRITING_CHAINS.find(w => w.theme === name); if (first) choose(first); }}>{name.replace('Chain ', '')} · Start chain</button>)}
    </div>
    {theme.startsWith('Chain ') && <p className="wpb-chain-note">Step {Math.max(0, selectedIndex) + 1} of {words.length}: look, trace, copy, then choose Next word. These steps grow your writing practice; they are not all formed by adding letters to the previous word.</p>}
    {/^[1-6] syllable/.test(theme) && <p className="wpb-chain-note">Count spoken syllables, not separate mātrās or Unicode characters. A final म् or न् is not an extra syllable. सत्य and सत्यम् both have two syllables. Some examples are practice stems rather than complete sentence forms.</p>}
    <div className="wpb-picker">
      <label>Word collection<select value={theme} onChange={e => { setTheme(e.target.value); setQuery(''); const first = allWords.find(w => e.target.value === 'All' || w.theme === e.target.value); if (first) choose(first); }}>{['Everyday', 'Animals', 'Nature', 'Food', 'Ideas', 'Chain स', 'Chain न', 'Chain मा', '1 syllable', '2 syllables', '3 syllables', '4 syllables', '5 syllables', '6 syllables', 'Assignment', 'My words', 'All'].map(t => <option key={t}>{t}</option>)}</select></label>
      <label>Find a word<input value={query} onChange={e => setQuery(e.target.value)} placeholder="Sanskrit, English or transliteration" /></label>
      <span>{words.length} words</span>
    </div>
    <div className="wpb-words" aria-label="Choose a practice word">{words.map(word => <button type="button" key={word.word} lang="sa" aria-pressed={selected.word === word.word} onClick={() => choose(word)}>{word.word}</button>)}{!words.length && <p>No matching words. Try another collection or add your own.</p>}</div>
    <details className="wpb-custom"><summary>Add your own word or short phrase</summary><SanskritInputBox value={custom} onChange={v => setCustom(v.slice(0, 64))} label="Type Sanskrit or use the Devanāgarī keyboard" /><button type="button" onClick={addCustom}>Add to my words</button><p>Custom words stay in this session. Meanings are not automatically checked.</p></details>
    <div className="wpb-model"><span className="wpb-step">1 · LOOK</span><strong lang="sa">{selected.word}</strong><span>{selected.transliteration}{selected.transliteration && ' · '}{selected.gloss}</span><div className="wpb-model-actions"><button type="button" onClick={() => { audioStop.current?.(); audioStop.current = playSanskritPassage(selected.word); }}>Listen</button><button type="button" disabled={selectedIndex <= 0} onClick={() => choose(words[selectedIndex - 1])}>Previous word</button><button type="button" disabled={selectedIndex < 0 || selectedIndex >= words.length - 1} onClick={() => choose(words[selectedIndex + 1])}>Next word</button></div></div>
    <div className="wpb-toolbar" aria-label="Writing tools">
      <label>Ink<input type="color" value={color} onChange={e => { setColor(e.target.value); setErase(false); }} /></label>
      <label>Pen<select value={penWidth} onChange={e => { setPenWidth(Number(e.target.value)); setErase(false); }}><option value={3}>Fine</option><option value={5}>Medium</option><option value={8}>Bold</option></select></label>
      <button type="button" aria-pressed={erase} onClick={() => setErase(!erase)}>{erase ? 'Use pen' : 'Eraser'}</button>
      <button type="button" disabled={!strokes.current.length} onClick={() => { strokes.current.pop(); redraw(); reportInk(); }}>Undo</button>
      <button type="button" onClick={clear}>Clear ink</button>
      <button type="button" aria-pressed={guides} onClick={() => setGuides(!guides)}>{guides ? 'Hide dots' : 'Show dots'}</button>
      <button type="button" className="wpb-practised" aria-pressed={practisedWords.has(selected.word)} onClick={markPractice}>{practisedWords.has(selected.word) ? '✓ Practised' : 'I practised'}</button>
    </div>
    <p className="wpb-message" role="status" aria-live="polite">{message}</p>
    <div className="wpb-surface" ref={surfaceRef}>
      <svg className="wpb-guide" width="100%" height={HEIGHT} aria-hidden="true">
        {[52, 196, 340].map((top, i) => <g key={top}><text x="18" y={top - 20} className="wpb-row-label">{i < 2 ? `2 · TRACE ${i + 1}` : '3 · WRITE IT YOURSELF'}</text><line x1="16" x2={width - 16} y1={top} y2={top} stroke="#f0a6a6" /><line x1="16" x2={width - 16} y1={top + 90} y2={top + 90} stroke="#9fb9da" /><line x1="16" x2={width - 16} y1={top + 45} y2={top + 45} stroke="#cdd9e8" strokeDasharray="5 6" />{guides && i < 2 && Array.from({ length: Math.max(1, Math.floor((width - 28) / repeatStep)) }, (_, repeat) => <text key={repeat} x={22 + repeat * repeatStep} y={top + 65} lang="sa" fontFamily={FAMILY} fontSize={fontSize} fill="none" stroke="#637fa2" strokeWidth="1.6" strokeDasharray="0.5 3.6" strokeLinecap="round">{selected.word}</text>)}</g>)}
      </svg>
      <canvas ref={canvasRef} className="wpb-ink" aria-label={`Trace ${selected.word} on the first two rows, then copy it on the blank row`} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onLostPointerCapture={up} />
    </div>
    <p className="wpb-help">Use a finger, stylus or mouse. The dots outline the shaped letters; they do not teach stroke order. Prefer paper? Print this word’s practice sheet.</p>
    {printing && createPortal(<div id="writing-practice-print-root">
      <h1>लेखनशाला · Word Practice</h1><h2 lang="sa">{selected.word}</h2><p>{selected.transliteration} · {selected.gloss}</p>
      <p>Name: ____________________ Date: ____________________</p>
      <svg width="100%" viewBox="0 0 700 500" aria-label="Two tracing rows and one independent copying row">
        {[52, 196, 340].map((top, i) => <g key={top}><text x="18" y={top - 20} fontSize="11">{i < 2 ? 'TRACE THE DOTS' : 'WRITE IT YOURSELF'}</text>
          <line x1="16" x2="684" y1={top} y2={top} stroke="#b38484" /><line x1="16" x2="684" y1={top + 90} y2={top + 90} stroke="#7994b0" />
          <line x1="16" x2="684" y1={top + 45} y2={top + 45} stroke="#c5cfdb" strokeDasharray="5 6" />
          {i < 2 && Array.from({ length: Math.max(1, Math.floor(672 / printRepeatStep)) }, (_, repeat) => <text key={repeat} x={22 + repeat * printRepeatStep} y={top + 65} lang="sa" fontFamily={FAMILY} fontSize={printFontSize} fill="none" stroke="#526b89" strokeWidth="1.6" strokeDasharray="0.5 3.6" strokeLinecap="round">{selected.word}</text>)}
        </g>)}
      </svg><p>Look at the model. Trace each dotted word. Copy it on the blank row.</p>
    </div>, document.body)}
  </section>;
};
