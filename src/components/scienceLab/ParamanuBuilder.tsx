import React, { useRef, useState } from 'react';
import { ChallengeList, CoreIdea, TermPanel, type LabChallenge, type LabTerm } from './common';
import { HudFrame, LedButton } from './controls';
import { localPoint } from './geometry';

type Bhuta = 'prthivi' | 'ap' | 'tejas' | 'vayu';
type Kind = 'p' | 'd' | 't';

interface Item {
  id: number;
  kind: Kind;
  bhuta: Bhuta;
  x: number;
  y: number;
  /** For dvyaṇuka groups: how many dvyaṇukas are held together (1 or 2). */
  n: number;
}

const W = 640;
const H = 420;
const TRAY_W = 112;
const JOIN_DIST = 38;

const BHUTA_INFO: Record<Bhuta, { dev: string; iast: string; en: string; color: string; soft: string; icon: string }> = {
  prthivi: { dev: 'पृथिवी', iast: 'pṛthivī', en: 'earth', color: '#a16207', soft: '#fef3c7', icon: '🪨' },
  ap: { dev: 'अप्', iast: 'ap', en: 'water', color: '#0284c7', soft: '#e0f2fe', icon: '💧' },
  tejas: { dev: 'तेजस्', iast: 'tejas', en: 'fire / light', color: '#ea580c', soft: '#ffedd5', icon: '🔥' },
  vayu: { dev: 'वायु', iast: 'vāyu', en: 'air', color: '#7c3aed', soft: '#ede9fe', icon: '🌬️' },
};
const BHUTAS: Bhuta[] = ['prthivi', 'ap', 'tejas', 'vayu'];
const trayY = (i: number) => 70 + i * 88;

const TERMS: LabTerm[] = [
  { dev: 'परमाणु', iast: 'paramāṇu', en: 'the smallest, indivisible, imperceptible particle', note: 'parama (utmost) + aṇu (tiny)' },
  { dev: 'द्व्यणुक', iast: 'dvyaṇuka', en: 'a dyad: two paramāṇus joined', note: 'still too small to see' },
  { dev: 'त्र्यणुक', iast: 'tryaṇuka', en: 'a triad: three dvyaṇukas joined', note: 'also called trasareṇu; the first perceptible size' },
  { dev: 'त्रसरेणु', iast: 'trasareṇu', en: 'a mote seen dancing in a sunbeam', note: 'the classic comparison for a tryaṇuka' },
  { dev: 'कणाद', iast: 'Kaṇāda', en: 'sage to whom the Vaiśeṣika Sūtra is attributed' },
  { dev: 'पृथिवी', iast: 'pṛthivī', en: 'earth', note: 'special quality: gandha (smell)' },
  { dev: 'अप्', iast: 'ap', en: 'water', note: 'special quality: rasa (taste)' },
  { dev: 'तेजस्', iast: 'tejas', en: 'fire / light', note: 'special quality: rūpa (colour, form)' },
  { dev: 'वायु', iast: 'vāyu', en: 'air', note: 'special quality: sparśa (touch)' },
  { dev: 'आकाश', iast: 'ākāśa', en: 'ether / space', note: 'quality: śabda (sound); one and all-pervading, not atomic' },
  { dev: 'महाभूत', iast: 'mahābhūta', en: 'great element (there are five: pañca-mahābhūta)' },
];

const CHALLENGES: LabChallenge[] = [
  {
    q: 'How many paramāṇus join to make one dvyaṇuka?',
    options: ['1', '2', '3', '4'],
    answer: 1,
    explain: 'Dvi means two: a dvyaṇuka is a pair of paramāṇus.',
  },
  {
    q: 'In the classical account, a tryaṇuka is made of…',
    options: ['three paramāṇus', 'three dvyaṇukas', 'two dvyaṇukas', 'ākāśa'],
    answer: 1,
    explain: 'Three dvyaṇukas (six paramāṇus) make a tryaṇuka, the first size you could see.',
  },
  {
    q: 'Why is ākāśa the background in this builder, not a paramāṇu in the tray?',
    options: [
      'It is too heavy',
      'In Vaiśeṣika it is one and all-pervading, not made of paramāṇus',
      'It was forgotten',
      'It is the same as vāyu',
    ],
    answer: 1,
    explain: 'Ākāśa is one of the five mahābhūtas, but Vaiśeṣika treats it as a single, all-pervading substance.',
  },
  {
    q: 'Which is the first size of the chain that one could perceive?',
    options: ['paramāṇu', 'dvyaṇuka', 'tryaṇuka'],
    answer: 2,
    explain: 'The tryaṇuka (trasareṇu) is often compared to a dust mote shining in a sunbeam.',
  },
];

interface SortCard {
  label: string;
  answer: Bhuta | 'akasha';
  why: string;
}
const SORT_CARDS: SortCard[] = [
  { label: '🪨 A pebble', answer: 'prthivi', why: 'Solid things are counted as pṛthivī.' },
  { label: '💧 A raindrop', answer: 'ap', why: 'Liquids are counted as ap.' },
  { label: '🕯️ A candle flame', answer: 'tejas', why: 'Heat and light are tejas.' },
  { label: '🍃 A breeze', answer: 'vayu', why: 'Moving air is vāyu.' },
  { label: '👃 The smell of wet earth', answer: 'prthivi', why: 'Smell (gandha) is the special quality of pṛthivī.' },
  { label: '🔔 The sound of a bell', answer: 'akasha', why: 'Sound (śabda) is the quality of ākāśa, which is not made of paramāṇus.' },
];

const SORT_BINS: { id: Bhuta | 'akasha'; label: string }[] = [
  ...BHUTAS.map((b) => ({ id: b, label: `${BHUTA_INFO[b].icon} ${BHUTA_INFO[b].iast}` })),
  { id: 'akasha', label: '✨ ākāśa' },
];

const BhutaSort: React.FC = () => {
  const [placed, setPlaced] = useState<Record<number, Bhuta | 'akasha'>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [msg, setMsg] = useState<string>('Tap a card, then tap the bhūta it belongs to.');
  const correct = SORT_CARDS.filter((c, i) => placed[i] === c.answer).length;

  const drop = (bin: Bhuta | 'akasha') => {
    if (selected === null) {
      setMsg('First tap a card above.');
      return;
    }
    const card = SORT_CARDS[selected];
    if (card.answer === bin) {
      setPlaced((p) => ({ ...p, [selected]: bin }));
      setMsg(`✓ ${card.why}`);
      setSelected(null);
    } else {
      setMsg(`✗ Not that one. Hint: think about the special quality (smell, taste, colour, touch, sound).`);
    }
  };

  return (
    <section className="vl-panel" aria-label="Bhūta sorting challenge">
      <h3 className="vl-panel-title">
        <span aria-hidden="true">🧺</span> Bhūta sorting challenge
        <span className="vl-score">{correct} / {SORT_CARDS.length} ✓</span>
      </h3>
      <div className="vl-sort-cards">
        {SORT_CARDS.map((c, i) => (
          <button
            key={c.label}
            type="button"
            disabled={placed[i] !== undefined}
            className={`vl-sort-card${selected === i ? ' is-selected' : ''}${placed[i] !== undefined ? ' is-done' : ''}`}
            onClick={() => setSelected(i)}
          >
            {c.label}
            {placed[i] !== undefined && <small> → {SORT_BINS.find((b) => b.id === placed[i])?.label}</small>}
          </button>
        ))}
      </div>
      <div className="vl-sort-bins">
        {SORT_BINS.map((b) => (
          <button key={b.id} type="button" className="vl-sort-bin" onClick={() => drop(b.id)}>
            {b.label}
          </button>
        ))}
      </div>
      <p className="vl-sort-msg" role="status">{correct === SORT_CARDS.length ? '🎉 All sorted! Śobhanam!' : msg}</p>
    </section>
  );
};

const Dot: React.FC<{ x: number; y: number; b: Bhuta; r?: number }> = ({ x, y, b, r = 7 }) => (
  <circle cx={x} cy={y} r={r} fill={BHUTA_INFO[b].color} stroke="#fff" strokeWidth={1.5} />
);

const Pair: React.FC<{ x: number; y: number; b: Bhuta }> = ({ x, y, b }) => (
  <g>
    <line x1={x - 7} y1={y} x2={x + 7} y2={y} stroke={BHUTA_INFO[b].color} strokeWidth={3} />
    <Dot x={x - 7} y={y} b={b} />
    <Dot x={x + 7} y={y} b={b} />
  </g>
);

const ItemShape: React.FC<{ it: Item }> = ({ it }) => {
  const info = BHUTA_INFO[it.bhuta];
  if (it.kind === 'p') {
    return (
      <g>
        <circle cx={it.x} cy={it.y} r={16} fill={info.soft} opacity={0.75} />
        <Dot x={it.x} y={it.y} b={it.bhuta} r={8} />
      </g>
    );
  }
  if (it.kind === 'd') {
    if (it.n === 1) {
      return (
        <g>
          <ellipse cx={it.x} cy={it.y} rx={26} ry={17} fill={info.soft} opacity={0.85} />
          <Pair x={it.x} y={it.y} b={it.bhuta} />
          <text x={it.x} y={it.y + 30} textAnchor="middle" className="vl-svg-small">dvyaṇuka</text>
        </g>
      );
    }
    return (
      <g>
        <circle cx={it.x} cy={it.y} r={32} fill={info.soft} opacity={0.85} stroke={info.color} strokeDasharray="4 4" />
        <Pair x={it.x} y={it.y - 10} b={it.bhuta} />
        <Pair x={it.x} y={it.y + 10} b={it.bhuta} />
        <text x={it.x} y={it.y + 46} textAnchor="middle" className="vl-svg-small">2 of 3 dvyaṇukas</text>
      </g>
    );
  }
  return (
    <g>
      <circle cx={it.x} cy={it.y} r={46} fill="url(#vl-mote)" />
      <circle cx={it.x} cy={it.y} r={38} fill={info.soft} stroke={info.color} strokeWidth={2} />
      <Pair x={it.x} y={it.y - 14} b={it.bhuta} />
      <Pair x={it.x - 16} y={it.y + 10} b={it.bhuta} />
      <Pair x={it.x + 16} y={it.y + 10} b={it.bhuta} />
      <text x={it.x} y={it.y + 56} textAnchor="middle" className="vl-svg-label">✨ tryaṇuka</text>
    </g>
  );
};

let nextId = 1;

const randomSpot = () => ({ x: TRAY_W + 50 + Math.random() * (W - TRAY_W - 100), y: 60 + Math.random() * (H - 120) });

const ParamanuBuilder: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [items, setItemsState] = useState<Item[]>([]);
  const itemsRef = useRef<Item[]>([]);
  const commit = (list: Item[]) => {
    itemsRef.current = list;
    setItemsState(list);
  };
  const setItems = (fn: (list: Item[]) => Item[]) => commit(fn(itemsRef.current));
  const [msg, setMsg] = useState('Drag a paramāṇu out of the tray. Drop it on another of the same bhūta to join them.');
  const drag = useRef<{ id: number; dx: number; dy: number; fromTray: boolean; moved: boolean } | null>(null);

  const pt = (e: React.PointerEvent) => localPoint(svgRef.current!, e.clientX, e.clientY, W, H);


  const startTray = (b: Bhuta, e: React.PointerEvent) => {
    e.preventDefault();
    const p = pt(e);
    const id = nextId++;
    setItems((list) => [...list, { id, kind: 'p', bhuta: b, x: p.x, y: p.y, n: 1 }]);
    drag.current = { id, dx: 0, dy: 0, fromTray: true, moved: false };
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  const startItem = (it: Item, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const p = pt(e);
    drag.current = { id: it.id, dx: it.x - p.x, dy: it.y - p.y, fromTray: false, moved: false };
    svgRef.current?.setPointerCapture(e.pointerId);
    // bring to front
    setItems((list) => [...list.filter((i) => i.id !== it.id), it]);
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const p = pt(e);
    d.moved = true;
    setItems((list) =>
      list.map((i) =>
        i.id === d.id
          ? { ...i, x: Math.max(14, Math.min(W - 14, p.x + d.dx)), y: Math.max(14, Math.min(H - 14, p.y + d.dy)) }
          : i,
      ),
    );
  };

  const tryJoin = (list: Item[], a: Item): { list: Item[]; msg: string } => {
    let best: Item | null = null;
    let bestD = Infinity;
    for (const b of list) {
      if (b.id === a.id) continue;
      const dist = Math.hypot(b.x - a.x, b.y - a.y);
      const reach = JOIN_DIST + (b.kind === 'p' ? 0 : b.kind === 'd' ? 10 : 20);
      if (dist < reach && dist < bestD) {
        best = b;
        bestD = dist;
      }
    }
    if (!best) return { list, msg: '' };
    const b = best;
    const nudge = (m: string) => ({
      list: list.map((i) => (i.id === a.id ? { ...i, x: Math.min(W - 20, a.x + 46), y: Math.min(H - 20, a.y + 20) } : i)),
      msg: m,
    });
    if (a.bhuta !== b.bhuta) {
      return nudge(`Only same-bhūta paramāṇus combine in this builder: ${BHUTA_INFO[a.bhuta].iast} and ${BHUTA_INFO[b.bhuta].iast} stay apart.`);
    }
    if (a.kind === 't' || b.kind === 't') {
      return nudge('A tryaṇuka is already perceptible. In the traditional account, bigger visible things grow from many of these; this builder stops here.');
    }
    if (a.kind !== b.kind) {
      return nudge('A paramāṇu pairs with another paramāṇu. Dvyaṇukas join with dvyaṇukas, in threes.');
    }
    const rest = list.filter((i) => i.id !== a.id && i.id !== b.id);
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    if (a.kind === 'p') {
      return {
        list: [...rest, { id: nextId++, kind: 'd', bhuta: a.bhuta, x: mx, y: my, n: 1 }],
        msg: `Two ${BHUTA_INFO[a.bhuta].iast} paramāṇus made a dvyaṇuka (द्व्यणुक), a bit like a pair. It is still too small to see.`,
      };
    }
    const total = a.n + b.n;
    if (total === 2) {
      return {
        list: [...rest, { id: nextId++, kind: 'd', bhuta: a.bhuta, x: mx, y: my, n: 2 }],
        msg: 'Two dvyaṇukas are waiting together. Bring one more dvyaṇuka to make a tryaṇuka.',
      };
    }
    if (total === 3) {
      return {
        list: [...rest, { id: nextId++, kind: 't', bhuta: a.bhuta, x: mx, y: my, n: 3 }],
        msg: 'Three dvyaṇukas made a tryaṇuka (त्र्यणुक)! In the classical account this is the first perceptible size, like a mote in a sunbeam.',
      };
    }
    return nudge('Three dvyaṇukas make a tryaṇuka, not four. Try adding a single dvyaṇuka.');
  };

  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const list = itemsRef.current;
    const cur = list.find((i) => i.id === d.id);
    if (!cur) return;
    if (cur.x < TRAY_W) {
      // Tapped (or dropped back on) the tray: place it in the open sky.
      const placed = { ...cur, ...randomSpot() };
      commit(list.map((i) => (i.id === d.id ? placed : i)));
      setMsg(`A ${BHUTA_INFO[cur.bhuta].iast} paramāṇu (magnified!) is in the sky. Add another and drag one onto the other.`);
      return;
    }
    const res = tryJoin(list, cur);
    if (res.msg) setMsg(res.msg);
    commit(res.list);
  };

  /** Keyboard-friendly: drop one paramāṇu of a bhūta into an open patch of sky. */
  const addOne = (b: Bhuta) => {
    let spot = randomSpot();
    for (let k = 0; k < 30; k += 1) {
      const c = randomSpot();
      if (itemsRef.current.every((i) => Math.hypot(i.x - c.x, i.y - c.y) > 70)) {
        spot = c;
        break;
      }
    }
    commit([...itemsRef.current, { id: nextId++, kind: 'p', bhuta: b, ...spot, n: 1 }]);
    setMsg(`A ${BHUTA_INFO[b].iast} paramāṇu (magnified!) is in the sky. Drag it onto another of the same bhūta to join them.`);
  };

  /** Keyboard / test helper: add two earth paramāṇus and join them. */
  const demoJoin = () => {
    // Find an open patch of sky so the demo pair only meets each other.
    let spot = randomSpot();
    for (let k = 0; k < 30; k += 1) {
      const c = randomSpot();
      if (itemsRef.current.every((i) => Math.hypot(i.x - c.x, i.y - c.y) > 90)) {
        spot = c;
        break;
      }
    }
    const a: Item = { id: nextId++, kind: 'p', bhuta: 'prthivi', x: spot.x - 8, y: spot.y, n: 1 };
    const b: Item = { id: nextId++, kind: 'p', bhuta: 'prthivi', x: spot.x + 8, y: spot.y + 2, n: 1 };
    const res = tryJoin([...itemsRef.current, a, b], b);
    setMsg(res.msg);
    commit(res.list);
  };

  const counts = {
    p: items.filter((i) => i.kind === 'p').length,
    d: items.filter((i) => i.kind === 'd').reduce((s, i) => s + i.n, 0),
    t: items.filter((i) => i.kind === 't').length,
  };

  return (
    <div className="vl-sim">
      <CoreIdea
        note={
          <>
            🌱 <strong>Gentle note:</strong> paramāṇu is an ancient philosophical idea, not the same as the modern atom, but a
            fascinating early way of thinking about tiny building blocks.
          </>
        }
      >
        The <em>Vaiśeṣika Sūtra</em>, attributed to the sage <strong>Kaṇāda</strong>, describes material things as made of{' '}
        <strong lang="sa">परमाणु paramāṇu</strong>: indivisible, imperceptible particles. In the classical Nyāya-Vaiśeṣika
        account, two paramāṇus make a <strong>dvyaṇuka</strong>, and three dvyaṇukas make a <strong>tryaṇuka</strong>, the
        first size that can be perceived.
      </CoreIdea>

      <div className="vl-sandbox" data-testid="paramanu-sandbox">
        <div className="vl-stage-wrap">
          <HudFrame accent="#facc15" tr={<>P {counts.p} · D {counts.d} · T {counts.t}</>} br={<>ĀKĀŚA · all-pervading</>}>
            <svg
              ref={svgRef}
              className="vl-stage vl-stage--paramanu"
              viewBox={`0 0 ${W} ${H}`}
              role="application"
              aria-label="Paramāṇu builder sandbox"
              data-testid="paramanu-stage"
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <defs>
                <linearGradient id="vl-akasha" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#0b1026" />
                  <stop offset="1" stopColor="#1a1033" />
                </linearGradient>
                <linearGradient id="vl-beam" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fde68a" stopOpacity="0.22" />
                  <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="vl-mote">
                  <stop offset="0" stopColor="#fde047" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#fde047" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Ākāśa: the space itself */}
              <rect x={0} y={0} width={W} height={H} rx={16} fill="url(#vl-akasha)" />
              <polygon points={`${W - 60},0 ${W},0 ${TRAY_W + 120},${H} ${TRAY_W + 10},${H}`} fill="url(#vl-beam)" />
              {Array.from({ length: 36 }, (_, i) => (
                <circle key={i} cx={TRAY_W + ((i * 137) % (W - TRAY_W))} cy={(i * 89) % H} r={1.2} fill="#e9d5ff" opacity={0.7} />
              ))}
              <text x={W - 14} y={54} textAnchor="end" className="vl-svg-label">आकाश · ākāśa: the space itself</text>
              <text x={W - 14} y={70} textAnchor="end" className="vl-svg-small">one, all-pervading, not made of paramāṇus</text>
              <text x={W - 14} y={H - 40} textAnchor="end" className="vl-svg-small">☀️ sunbeam: where a tryaṇuka-sized mote would glint</text>

              {/* Tray */}
              <rect x={6} y={6} width={TRAY_W - 12} height={H - 12} rx={14} fill="#0b1220" stroke="#334155" />
              <text x={TRAY_W / 2} y={30} textAnchor="middle" className="vl-svg-label">Tray</text>
              <text x={TRAY_W / 2} y={44} textAnchor="middle" className="vl-svg-small">drag or tap</text>
              {BHUTAS.map((b, i) => (
                <g
                  key={b}
                  className="vl-tray-well"
                  data-testid={`tray-${b}`}
                  onPointerDown={(e) => startTray(b, e)}
                  style={{ cursor: 'grab' }}
                >
                  <rect x={14} y={trayY(i) - 6} width={TRAY_W - 28} height={76} rx={12} fill={BHUTA_INFO[b].color} fillOpacity={0.22} stroke={BHUTA_INFO[b].soft} strokeOpacity={0.5} />
                  <circle cx={TRAY_W / 2 - 12} cy={trayY(i) + 16} r={7} fill={BHUTA_INFO[b].soft} />
                  <circle cx={TRAY_W / 2 + 4} cy={trayY(i) + 12} r={7} fill={BHUTA_INFO[b].soft} opacity={0.75} />
                  <circle cx={TRAY_W / 2 + 14} cy={trayY(i) + 22} r={7} fill={BHUTA_INFO[b].soft} opacity={0.55} />
                  <text x={TRAY_W / 2} y={trayY(i) + 46} textAnchor="middle" className="vl-svg-dev">{BHUTA_INFO[b].dev}</text>
                  <text x={TRAY_W / 2} y={trayY(i) + 62} textAnchor="middle" className="vl-svg-small">{BHUTA_INFO[b].iast} · {BHUTA_INFO[b].en}</text>
                </g>
              ))}

              {items.map((it) => (
                <g
                  key={it.id}
                  data-kind={it.kind}
                  data-bhuta={it.bhuta}
                  className="vl-item"
                  onPointerDown={(e) => startItem(it, e)}
                  style={{ cursor: 'grab' }}
                >
                  <ItemShape it={it} />
                </g>
              ))}
            </svg>
          </HudFrame>
        </div>

        <div className="vl-leds" role="group" aria-label="Add a paramāṇu">
          {BHUTAS.map((b) => (
            <LedButton key={b} kind="action" color={BHUTA_INFO[b].soft} onClick={() => addOne(b)} testId={`paramanu-add-${b}`}>
              {BHUTA_INFO[b].icon} + <span lang="sa">{BHUTA_INFO[b].dev}</span> {BHUTA_INFO[b].iast}
            </LedButton>
          ))}
        </div>
        <div className="vl-readouts">
          <span className="vl-readout"><b>{counts.p}</b> paramāṇu</span>
          <span className="vl-readout"><b>{counts.d}</b> dvyaṇuka</span>
          <span className="vl-readout"><b>{counts.t}</b> tryaṇuka</span>
          <LedButton kind="action" color="#facc15" onClick={demoJoin} testId="paramanu-demo">Show me a join</LedButton>
          <LedButton kind="action" onClick={() => { commit([]); setMsg('Fresh sky! Drag a paramāṇu from the tray.'); }} testId="paramanu-reset">Reset</LedButton>
        </div>
        <p className="vl-msg" role="status" data-testid="paramanu-msg">{msg}</p>
      </div>

      <div className="vl-note">
        <strong>Why is ākāśa not in the tray?</strong> Ākāśa is one of the pañca-mahābhūtas (five great elements), but in
        Vaiśeṣika it is <em>not</em> made of paramāṇus. It is one and all-pervading, so here it is the sky-coloured space
        that everything sits in. Its special quality is <em>śabda</em> (sound).
      </div>

      <div className="vl-grid-2">
        <TermPanel terms={TERMS} />
        <div>
          <BhutaSort />
          <ChallengeList items={CHALLENGES} />
        </div>
      </div>
    </div>
  );
};

export default ParamanuBuilder;
