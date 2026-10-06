import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChallengeList, CoreIdea, TermPanel, type LabChallenge, type LabTerm } from './common';
import { DialKnob, GlowSlider, HudFrame, LedButton } from './controls';

type LangMode = 'both' | 'sanskrit' | 'modern';
type Phase = 'cloud' | 'srishti' | 'sthiti' | 'laya' | 'done';

const W = 720;
const H = 360;
const BAND = W / 3;
const AXIS_Y = H - 30;
const MID_Y = 170;
const WAVELENGTH = 160; // px
const F0 = 3; // natural frequency of the loom, Hz
const HOLD_SECONDS = 4;

const BANDS = [
  { key: 'srishti', dev: 'सृष्टि', sk: 'Sṛṣṭi', modern: 'Emergence', fill: 'rgba(250, 204, 21, 0.08)', strong: 'rgba(250, 204, 21, 0.2)', ink: '#fde047' },
  { key: 'sthiti', dev: 'स्थिति', sk: 'Sthiti', modern: 'Sustenance', fill: 'rgba(59, 130, 246, 0.1)', strong: 'rgba(59, 130, 246, 0.24)', ink: '#93c5fd' },
  { key: 'laya', dev: 'लय', sk: 'Laya', modern: 'Absorption', fill: 'rgba(239, 68, 68, 0.09)', strong: 'rgba(239, 68, 68, 0.22)', ink: '#fca5a5' },
] as const;

/** Trivṛtkaraṇa colours (Chāndogya 6.4): red = fire, white = water, black = food. */
const KIND_COLORS = ['#ef4444', '#f8fafc', '#334155'];

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number; // 1 = manifest (vyakta), fades toward avyakta in laya
  kind: number;
  bind: number; // 0..1: how much the particle rides the wave
}

interface Sim {
  ps: P[];
  t: number;
  hold: number;
  layaT: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const gauss = () => {
  const u = Math.random() || 1e-9;
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const makeCloud = (n: number): Sim => ({
  ps: Array.from({ length: n }, (_, i) => ({
    x: rand(14, BAND + 60),
    y: rand(40, AXIS_Y - 20),
    vx: rand(-20, 20),
    vy: rand(-20, 20),
    a: 0.55 + Math.random() * 0.25,
    kind: i % 3,
    bind: 0,
  })),
  t: 0,
  hold: 0,
  layaT: 0,
});

/** Travelling wave with an envelope that rises in Sṛṣṭi, holds in Sthiti and decays in Laya. */
const envelope = (x: number) => {
  if (x < BAND) return 0.15 + 0.85 * (x / BAND);
  if (x < 2 * BAND) return 1;
  return Math.max(0.12, Math.exp(-((x - 2 * BAND) / BAND) * 2.2));
};
const waveY = (x: number, t: number, f: number, amp: number) =>
  MID_Y + amp * envelope(x) * Math.sin(2 * Math.PI * (f * t - x / WAVELENGTH));

const bandIndex = (phase: Phase) => (phase === 'cloud' || phase === 'srishti' ? 0 : phase === 'sthiti' ? 1 : 2);

/** Rest position for particle i: a three-row ribbon inside the active band. Bound particles also ride the wave. */
const target = (i: number, n: number, band: number) => {
  const rows = 3;
  const cols = Math.ceil(n / rows);
  const col = i % cols;
  const row = Math.floor(i / cols);
  const x0 = band * BAND + 22;
  const x = x0 + (cols > 1 ? (col * (BAND - 44)) / (cols - 1) : (BAND - 44) / 2);
  const y = MID_Y + (row - (rows - 1) / 2) * 16;
  return { x, y };
};

const resonance = (f: number) => 1 / (1 + ((f - F0) / 0.7) ** 2);

const TERMS: LabTerm[] = [
  { dev: 'सृष्टि', iast: 'sṛṣṭi', en: 'emergence, "letting forth"' },
  { dev: 'स्थिति', iast: 'sthiti', en: 'sustenance, staying in place' },
  { dev: 'लय', iast: 'laya', en: 'absorption, dissolving back' },
  { dev: 'सत्', iast: 'sat', en: 'being, what is', note: 'Chāndogya 6.2: sat alone was in the beginning' },
  { dev: 'उद्दालक आरुणि', iast: 'Uddālaka Āruṇi', en: 'teacher of his son Śvetaketu in Chāndogya Upaniṣad ch. 6' },
  { dev: 'मृत्तिका', iast: 'mṛttikā', en: 'clay', note: 'one lump known, all clay things known (6.1.4)' },
  { dev: 'लोहमणि', iast: 'lohamaṇi', en: 'a nugget of gold (some translate copper)', note: '6.1.5' },
  { dev: 'कार्ष्णायस', iast: 'kārṣṇāyasa', en: 'iron', note: 'a nail-cutter of iron, 6.1.6' },
  { dev: 'लवण', iast: 'lavaṇa', en: 'salt', note: 'dissolved in water: unseen yet present (6.13)' },
  { dev: 'त्रिवृत्करण', iast: 'trivṛtkaraṇa', en: 'making threefold: mixing fire, water and food', note: '6.3–6.4' },
  { dev: 'ऋत', iast: 'ṛta', en: 'cosmic order, the regular way things go', note: 'a Vedic idea' },
  { dev: 'स्पन्द', iast: 'spanda', en: 'vibration, subtle throb', note: 'Kashmir Śaiva Spanda tradition' },
  { dev: 'व्यक्त / अव्यक्त', iast: 'vyakta / avyakta', en: 'manifest / unmanifest' },
  { dev: 'काल', iast: 'kāla', en: 'time' },
  { dev: 'तत् त्वम् असि', iast: 'tat tvam asi', en: '"you are that": the refrain of chapter 6' },
];

const CHALLENGES: LabChallenge[] = [
  { q: 'In Āruṇi’s clay example, what is “real” (satyam)?', options: ['The pot’s name', 'The clay', 'The potter'], answer: 1, explain: '“The change is only a name; the truth is it’s clay” (6.1.4).' },
  { q: 'Salt dissolved in water: where did it go?', options: ['It vanished', 'It is still there, just unseen', 'It turned into water'], answer: 1, explain: 'Śvetaketu tastes the water from top, middle and bottom: salty every time (6.13).' },
  { q: 'Can a new particle appear from nothing in this game?', options: ['Yes, in Sṛṣṭi', 'No: they only change form'], answer: 1, explain: '“Katham asataḥ saj jāyeta?” How could being come from non-being? (6.2.2)' },
  { q: 'Which three are mixed in trivṛtkaraṇa?', options: ['Fire, water and food', 'Air, space and time', 'Gold, silver and iron'], answer: 0, explain: 'Red is the form of fire, white of water, black of food (6.4).' },
  { q: 'The word spanda (vibration) comes from…', options: ['Uddālaka Āruṇi', 'the later Kashmir Śaiva Spanda tradition', 'Kaṇāda'], answer: 1, explain: 'Two different traditions, centuries apart: the lab places them side by side.' },
];

const QUOTES = [
  { ref: 'Chāndogya 6.2.1', dev: 'सदेव सोम्येदमग्र आसीदेकमेवाद्वितीयम्', iast: 'sad eva somyedam agra āsīd ekam evādvitīyam', en: 'In the beginning, dear one, this was being (sat) alone, one only, without a second.' },
  { ref: 'Chāndogya 6.2.2', dev: 'कथमसतः सज्जायेत', iast: 'katham asataḥ saj jāyeta', en: 'How could being come from non-being? In the game: particles never appear from nothing; they only change form.' },
  { ref: 'Chāndogya 6.1.4', dev: 'वाचारम्भणं विकारो नामधेयं मृत्तिकेत्येव सत्यम्', iast: 'vācārambhaṇaṃ vikāro nāmadheyam, mṛttikety eva satyam', en: 'The change is only a name, a matter of words; the truth is: it is clay.' },
];

const SrishtiLoom: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lang, setLang] = useState<LangMode>('both');
  const [phase, setPhase] = useState<Phase>('cloud');
  const [playing, setPlaying] = useState(false);
  const [kala, setKala] = useState(1);
  const [freq, setFreq] = useState(1.2);
  const [prana, setPrana] = useState(40);
  const [density, setDensity] = useState(90);
  const [mixed, setMixed] = useState(false);
  const sim = useRef<Sim>(makeCloud(90));
  const phaseRef = useRef<Phase>('cloud');
  const params = useRef({ kala, freq, prana, mixed, lang });
  useEffect(() => {
    params.current = { kala, freq, prana, mixed, lang };
  }, [kala, freq, prana, mixed, lang]);
  const [read, setRead] = useState({ manifest: 90, total: 90, scatter: 100, hold: 0 });

  const L = useCallback(
    (sk: string, modern: string, dev?: string) =>
      lang === 'modern' ? modern : lang === 'sanskrit' ? (dev ? `${dev} ${sk}` : sk) : `${dev ? `${dev} ` : ''}${sk} · ${modern}`,
    [lang],
  );

  const goPhase = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  const metrics = useCallback(() => {
    const s = sim.current;
    const band = bandIndex(phaseRef.current);
    const n = s.ps.length;
    let sq = 0;
    let manifest = 0;
    s.ps.forEach((p, i) => {
      const tg = target(i, n, band);
      sq += (p.x - tg.x) ** 2 + (p.y - tg.y) ** 2;
      if (p.a > 0.5) manifest += 1;
    });
    const rms = Math.sqrt(sq / Math.max(1, n));
    return { manifest, total: n, scatter: Math.min(100, (rms / 90) * 100) };
  }, []);

  const tick = useCallback((dtReal: number) => {
    const s = sim.current;
    const { kala: k, freq: f, prana: pr } = params.current;
    const dt = Math.min(0.05, dtReal) * k;
    s.t += dt;
    const ph = phaseRef.current;
    const n = s.ps.length;
    const band = bandIndex(ph);
    const drive = ph === 'srishti' || ph === 'sthiti' ? resonance(f) * (pr / 100) : 0;
    const overheat = pr > 85 ? (pr - 85) * 9 : 0;
    const spring = drive > 0.3 ? 14 * drive : 0;
    const damping = drive > 0.3 ? 4 : 0.6;
    const noise = ph === 'laya' ? 260 : (spring > 0 ? 6 : 60) + overheat;
    s.ps.forEach((p, i) => {
      let fx = 0;
      let fy = 0;
      if (spring > 0) {
        const tg = target(i, n, band);
        fx += spring * spring * 0.25 * (tg.x - p.x);
        fy += spring * spring * 0.25 * (tg.y - p.y);
        const near = Math.hypot(tg.x - p.x, tg.y - p.y) < 30;
        p.bind = Math.max(0, Math.min(1, p.bind + dt * (near ? 1.2 : -0.8)));
      } else {
        p.bind = Math.max(0, p.bind - dt * 0.9);
      }
      if (ph === 'laya') {
        // Drift into the Laya band, then wander freely: order turns into disorder.
        if (p.x < 2 * BAND + 10) fx += 160;
        p.a = Math.max(0.12, p.a - dt * 0.13 * (0.6 + Math.random()));
      } else if (ph === 'cloud') {
        p.a = 0.55 + 0.2 * Math.sin(s.t + i);
      } else if (spring > 0) {
        p.a = Math.min(1, p.a + dt * 0.8);
      }
      fx += noise * gauss() - damping * p.vx;
      fy += noise * gauss() - damping * p.vy;
      p.vx += fx * dt;
      p.vy += fy * dt;
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > 420) {
        p.vx *= 420 / sp;
        p.vy *= 420 / sp;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      // Walls: particles never leave the loom (nothing is lost, nothing is added).
      const minX = ph === 'laya' && p.x > 2 * BAND ? 2 * BAND + 4 : 6;
      if (p.x < minX) { p.x = minX; p.vx = Math.abs(p.vx); }
      if (p.x > W - 6) { p.x = W - 6; p.vx = -Math.abs(p.vx); }
      if (p.y < 30) { p.y = 30; p.vy = Math.abs(p.vy); }
      if (p.y > AXIS_Y - 8) { p.y = AXIS_Y - 8; p.vy = -Math.abs(p.vy); }
    });
    if (ph === 'laya') s.layaT += dt;
  }, []);

  const paint = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (cv.width !== W * dpr) {
      cv.width = W * dpr;
      cv.height = H * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const s = sim.current;
    const { freq: f, prana: pr, mixed: mx, lang: lm } = params.current;
    const lab = (sk: string, modern: string, dev: string) =>
      lm === 'modern' ? modern : lm === 'sanskrit' ? `${dev} ${sk}` : `${dev} ${sk} · ${modern}`;
    const ph = phaseRef.current;
    const active = ph === 'cloud' ? -1 : ph === 'done' ? -1 : bandIndex(ph);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, W, H);
    BANDS.forEach((b, i) => {
      ctx.fillStyle = i === active ? b.strong : b.fill;
      ctx.fillRect(i * BAND, 0, BAND, AXIS_Y);
      ctx.fillStyle = b.ink;
      ctx.font = '700 14px "Noto Sans Devanagari", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(lab(b.sk, b.modern, b.dev), i * BAND + BAND / 2, 50);
      if (i > 0) {
        ctx.strokeStyle = 'rgba(148,163,184,0.35)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(i * BAND, 30);
        ctx.lineTo(i * BAND, AXIS_Y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
    // wave
    const amp = 10 + 0.4 * pr;
    ctx.beginPath();
    for (let x = 0; x <= W; x += 3) {
      const y = waveY(x, s.t, f, amp);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.save();
    ctx.shadowColor = '#2dd4bf';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = 'rgba(45, 212, 191, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    // particles
    s.ps.forEach((p) => {
      ctx.globalAlpha = p.a;
      const py = p.y + (waveY(p.x, s.t, f, amp) - MID_Y) * p.bind;
      const pt = { x: p.x, y: py };
      if (mx) {
        for (let k = 0; k < 3; k += 1) {
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.arc(pt.x, pt.y, 4.5, (k * 2 * Math.PI) / 3 - Math.PI / 2, ((k + 1) * 2 * Math.PI) / 3 - Math.PI / 2);
          ctx.closePath();
          ctx.fillStyle = KIND_COLORS[k];
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3.8, 0, 2 * Math.PI);
        ctx.fillStyle = KIND_COLORS[p.kind];
        ctx.fill();
      }
      ctx.strokeStyle = 'rgba(226,232,240,0.6)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, mx ? 4.5 : 3.8, 0, 2 * Math.PI);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
    // Kāla axis
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(10, AXIS_Y);
    ctx.lineTo(W - 14, AXIS_Y);
    ctx.lineTo(W - 22, AXIS_Y - 5);
    ctx.moveTo(W - 14, AXIS_Y);
    ctx.lineTo(W - 22, AXIS_Y + 5);
    ctx.stroke();
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '600 12px "Noto Sans Devanagari", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(lab('Kāla', 'Time', 'काल') + ' →', W / 2, AXIS_Y + 20);
    // "now" marker on the Kāla axis
    const nowX = ph === 'cloud' ? 8 : ph === 'done' ? W - 20 : bandIndex(ph) * BAND + BAND / 2;
    ctx.fillStyle = '#2dd4bf';
    ctx.beginPath();
    ctx.moveTo(nowX, AXIS_Y - 2);
    ctx.lineTo(nowX - 7, AXIS_Y - 14);
    ctx.lineTo(nowX + 7, AXIS_Y - 14);
    ctx.closePath();
    ctx.fill();
  }, []);

  useEffect(() => {
    paint();
  }, [paint, lang, mixed, freq, prana]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    let frame = 0;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      tick(dt);
      paint();
      frame += 1;
      const m = metrics();
      const ph = phaseRef.current;
      const s = sim.current;
      if (ph === 'srishti' && m.scatter < 25) {
        goPhase('sthiti');
        s.hold = 0;
      } else if (ph === 'sthiti') {
        if (m.scatter < 30) s.hold += Math.min(0.05, dt);
        else s.hold = 0;
      } else if (ph === 'laya' && m.manifest <= m.total * 0.15) {
        goPhase('done');
      }
      if (frame % 6 === 0) setRead({ ...m, hold: s.hold });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, tick, paint, metrics]);

  const restart = (n = density) => {
    sim.current = makeCloud(n);
    goPhase('cloud');
    setMixed(false);
    setRead({ manifest: n, total: n, scatter: 100, hold: 0 });
    requestAnimationFrame(paint);
  };

  const onDensity = (n: number) => {
    setDensity(n);
    restart(n);
  };

  const sthitiDone = phase === 'sthiti' && read.hold >= HOLD_SECONDS;
  const steps: { id: Phase; label: string; done: boolean }[] = [
    { id: 'cloud', label: L('Avyakta', 'A scattered cloud', 'अव्यक्त'), done: phase !== 'cloud' },
    { id: 'srishti', label: L('Sṛṣṭi', 'Bring them together', 'सृष्टि'), done: phase === 'sthiti' || phase === 'laya' || phase === 'done' },
    { id: 'sthiti', label: L('Sthiti', `Hold steady ${HOLD_SECONDS} s`, 'स्थिति'), done: sthitiDone || phase === 'laya' || phase === 'done' },
    { id: 'laya', label: L('Laya', 'Let it dissolve', 'लय'), done: phase === 'done' },
  ];

  const res = resonance(freq);

  return (
    <div className="vl-sim">
      <CoreIdea>
        <strong>Sṛṣṭi · sthiti · laya</strong> (emergence, sustenance, absorption) is a widely used traditional way of
        describing a cycle. In the <em>Chāndogya Upaniṣad</em> (chapter 6), the teacher <strong>Uddālaka Āruṇi</strong> tells
        his son Śvetaketu that <em>sat</em> (being) alone was in the beginning, and the many arose from it. He uses clay,
        gold and iron (one substance, many forms) and salt dissolved in water (present, though unseen).
      </CoreIdea>

      <div className="vl-quest-head">
        <h3 className="vl-quest-title">🧵 The Loom of Āruṇi</h3>
        <div className="vl-btn-row" role="radiogroup" aria-label="Language toggle">
          <span className="vl-small">Labels:</span>
          {(['both', 'sanskrit', 'modern'] as LangMode[]).map((m) => (
            <button key={m} type="button" role="radio" aria-checked={lang === m} className={`vl-chip${lang === m ? ' is-on' : ''}`} onClick={() => setLang(m)} data-testid={`lang-${m}`}>
              {m === 'both' ? 'Both' : m === 'sanskrit' ? 'Sanskrit' : 'Modern'}
            </button>
          ))}
        </div>
      </div>

      <div className="vl-sandbox" data-testid="loom-sandbox">
        <ol className="vl-steps" data-testid="loom-steps">
          {steps.map((s, i) => (
            <li key={s.id} className={`${s.done ? 'is-done' : ''}${phase === s.id && !s.done ? ' is-now' : ''}`}>
              <span className="vl-step-n">{s.done ? '✓' : i + 1}</span> {s.label}
            </li>
          ))}
        </ol>

        <div className="vl-stage-wrap">
          <HudFrame
            accent="#fb7185"
            tl={<>{L('Spandana', 'f')} {freq.toFixed(1)} Hz</>}
            tr={<>{phase === 'cloud' ? 'READY' : phase === 'done' ? 'CYCLE DONE' : L(BANDS[bandIndex(phase)].sk, BANDS[bandIndex(phase)].modern).toUpperCase()}</>}
            bl={<>{L('Vyakta', 'Manifest')} {read.manifest}/{read.total}</>}
            br={<>{L('Vikṣepa', 'Scatter')} {Math.round(read.scatter)}%</>}
          >
            <canvas ref={canvasRef} className="vl-stage vl-stage--loom" width={W} height={H} data-testid="loom-canvas" role="img" aria-label="Wave lab canvas with Sṛṣṭi, Sthiti and Laya bands along the Kāla (time) axis" />
          </HudFrame>
        </div>

        <div className="vl-loom-controls">
          <div className="vl-leds">
            <LedButton kind="toggle" on={playing} color="#4ade80" onClick={() => setPlaying((p) => !p)} testId="loom-play">{playing ? '⏸ Pause' : '▶ Play'}</LedButton>
            {phase === 'cloud' && (
              <button type="button" className="vl-btn vl-btn--gold" onClick={() => { goPhase('srishti'); setPlaying(true); }} data-testid="loom-begin">
                Begin {L('Sṛṣṭi', 'emergence')} →
              </button>
            )}
            {sthitiDone && (
              <button type="button" className="vl-btn vl-btn--red" onClick={() => { sim.current.layaT = 0; goPhase('laya'); setPlaying(true); }} data-testid="loom-laya">
                Set off {L('Laya', 'absorption')} →
              </button>
            )}
            {phase === 'done' && (
              <button type="button" className="vl-btn vl-btn--gold" onClick={() => restart()}>↺ Begin a new cycle</button>
            )}
            <LedButton kind="toggle" on={mixed} color="#f87171" onClick={() => setMixed((m) => !m)} testId="loom-mix" title="Trivṛtkaraṇa: make every particle threefold">
              🔴⚪⚫ {L('Trivṛtkaraṇa', 'Mix three')}
            </LedButton>
            <LedButton kind="action" onClick={() => { setPlaying(false); restart(); }} testId="loom-reset">Reset</LedButton>
          </div>
          <div className="vl-loom-deck">
            <div className="vl-dials">
              <div className="vl-dial-group">
                <DialKnob label={<>{L('Spandana', 'Vibration frequency', 'स्पन्दन')}</>} ariaLabel="Vibration frequency in hertz" value={freq} min={0.5} max={6} step={0.1} onChange={setFreq} format={(x) => `${x.toFixed(1)} Hz`} color="#2dd4bf" testId="loom-freq" />
                <span className="vl-res" title="How strongly the loom responds at this frequency" aria-label={`Response ${Math.round(res * 100)} percent`}><span style={{ width: `${Math.round(res * 100)}%` }} /></span>
              </div>
              <DialKnob label={<>{L('Prāṇa', 'Energy', 'प्राण')}</>} ariaLabel="Energy" value={prana} min={0} max={100} step={1} onChange={setPrana} format={(x) => `${Math.round(x)}`} color="#facc15" testId="loom-prana" />
            </div>
            <div className="vl-loom-faders">
              <GlowSlider label={<>{L('Kāla', 'Time speed', 'काल')}</>} value={kala} min={0.25} max={2} step={0.05} onChange={setKala} valueText={`×${kala.toFixed(2)}`} color="#a78bfa" ariaLabel="Time speed" testId="loom-kala" />
              <GlowSlider label={<>{L('Ghanatva', 'Particle density', 'घनत्व')}</>} value={density} min={30} max={180} step={10} onChange={onDensity} valueText={String(density)} disabled={phase !== 'cloud'} color="#60a5fa" ariaLabel="Particle density" testId="loom-density" />
            </div>
          </div>
        </div>

        <div className="vl-readouts" data-testid="loom-readouts">
          <span className="vl-readout">{L('Spandana', 'Frequency')}: <b>{freq.toFixed(1)} Hz</b></span>
          <span className="vl-readout">{L('Taraṅga-vega', 'Wave speed')}: <b>{Math.round(freq * WAVELENGTH)} px/s</b></span>
          <span className="vl-readout">{L('Vyakta', 'Manifest')}: <b data-testid="loom-manifest">{read.manifest}</b> / {read.total}</span>
          <span className="vl-readout">{L('Vikṣepa', 'Scatter')}: <b data-testid="loom-scatter">{Math.round(read.scatter)}%</b></span>
          {phase === 'sthiti' && <span className="vl-readout">{L('Sthiti', 'Steady')}: <b>{Math.min(HOLD_SECONDS, read.hold).toFixed(1)} / {HOLD_SECONDS} s</b></span>}
        </div>

        <p className="vl-msg" role="status" data-testid="loom-msg">
          {phase === 'cloud' && 'Step 1: a scattered cloud of particles. The total never changes: in this game particles never appear from nothing, they only change form. Press “Begin”.'}
          {phase === 'srishti' && (res * prana / 100 > 0.3
            ? 'The loom is humming! Particles are gathering onto the wave…'
            : 'Step 2: tune Spandana near the loom’s natural frequency (watch the green bar) and raise Prāṇa until the particles gather.')}
          {phase === 'sthiti' && !sthitiDone && `Step 3: keep the pattern steady for ${HOLD_SECONDS} seconds. Too much Prāṇa (over 85) makes it jitter; drifting off the natural frequency loosens it.`}
          {sthitiDone && '🌿 Steady! The Vedic word ṛta (ऋत) names cosmic order: the regular way the seasons, days and stars keep their course. Now set off Laya.'}
          {phase === 'laya' && 'Step 4: Laya. The binding lets go; particles spread out and fade from view, but none is destroyed: they become unmanifest (avyakta).'}
          {phase === 'done' && '✨ The cycle is complete. Every particle is still on the loom, only faded. In the traditional picture, laya is followed by a new sṛṣṭi.'}
        </p>
      </div>

      <div className="vl-grid-2">
        <section className="vl-panel vl-tradition" aria-label="Uddālaka Āruṇi">
          <h3 className="vl-panel-title">📜 Uddālaka Āruṇi · Chāndogya Upaniṣad 6</h3>
          {QUOTES.map((q) => (
            <figure key={q.ref} className="vl-quote">
              <blockquote lang="sa">{q.dev}</blockquote>
              <div className="vl-term-iast">{q.iast}</div>
              <figcaption>{q.en} <small>({q.ref})</small></figcaption>
            </figure>
          ))}
          <ul className="vl-small vl-list">
            <li><b>Clay</b> (6.1.4): know one lump of clay and you know all things made of clay.</li>
            <li><b>Gold</b> (6.1.5): know one nugget and you know all gold ornaments.</li>
            <li><b>Iron</b> (6.1.6): know one nail-cutter and you know all things of iron.</li>
            <li><b>Salt</b> (6.13): salt left in water overnight cannot be seen, yet every sip tastes salty.</li>
            <li><b>Trivṛtkaraṇa</b> (6.3–6.4): fire, water and food are each made threefold; red is the form of fire, white of water, black of food. Tap <em>Mix three</em> to see it.</li>
          </ul>
        </section>
        <section className="vl-panel vl-tradition vl-tradition--spanda" aria-label="Spanda tradition">
          <h3 className="vl-panel-title">〰️ Spanda · Kashmir Śaiva tradition</h3>
          <p>
            The idea of <strong lang="sa">स्पन्द spanda</strong>, a subtle vibration or “throb” of consciousness, belongs to
            the later Kashmir Śaiva <em>Spanda</em> tradition (the <em>Spandakārikā</em>, c. 9th century CE), many centuries
            after the Upaniṣad.
          </p>
          <p className="vl-small">
            <b>Two separate traditions, side by side.</b> Spanda is not Uddālaka Āruṇi’s teaching. This lab borrows the
            word for its <em>Spandana</em> slider and keeps the two apart.
          </p>
        </section>
      </div>

      <section className="vl-panel vl-modern" aria-label="Modern comparison for fun">
        <h3 className="vl-panel-title">🔬 Modern comparison (for fun) <span className="vl-panel-hint">not what the texts say</span></h3>
        <ul className="vl-list">
          <li>Carbon stays carbon as graphite or diamond: compare the clay example.</li>
          <li>Dissolved salt can be tasted, and it comes back when the water evaporates: compare the salt example.</li>
          <li>The loom gathers best near one frequency, like a swing that goes highest when pushed at its natural rhythm (physicists call this resonance).</li>
          <li>In the Laya step, ordered particles spreading out is a bit like what physicists describe with entropy. A modern comparison for fun, not something the texts claim.</li>
        </ul>
      </section>

      <div className="vl-grid-2">
        <TermPanel terms={TERMS} />
        <ChallengeList items={CHALLENGES} />
      </div>
    </div>
  );
};

export default SrishtiLoom;
