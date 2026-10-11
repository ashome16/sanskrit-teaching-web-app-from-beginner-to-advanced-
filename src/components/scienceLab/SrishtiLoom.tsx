import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BodhiLabAnecdote, ChallengeList, CoreIdea, TermPanel, type LabChallenge, type LabTerm } from './common';
import { DialKnob, GlowSlider, HudFrame, LedButton } from './controls';
import { soundEffects } from '../../utils/soundEffects';
import { playPronunciation } from '../../utils/pronunciation';

type LangMode = 'both' | 'sanskrit' | 'modern';
type Phase = 'cloud' | 'srishti' | 'sthiti' | 'laya' | 'done';
type AruniNavTab = 'loom' | 'experiments' | 'codex' | 'challenges';
type AruniExpTab = 'salt' | 'banyan' | 'fasting' | 'substratum';

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

/** Trivṛtkaraṇa colours (Chāndogya 6.4): red = fire (tejas), white = water (āpaḥ), black = food/earth (anna). */
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
  { dev: 'उद्दालक आरुणि', iast: 'Uddālaka Āruṇi', en: 'Pioneering natural scientist & sage of the Chāndogya Upaniṣad (c. 8th–7th c. BCE)' },
  { dev: 'श्वेतकेतु', iast: 'Śvetaketu', en: 'Uddālaka’s son, whose academic pride was transformed into empirical wisdom' },
  { dev: 'तत् त्वम् असि', iast: 'tat tvam asi', en: '"That Thou Art": the timeless mahāvākya proclaiming oneness of the individual self with universal Being' },
  { dev: 'सत्', iast: 'sat', en: 'Being, fundamental existence', note: 'Chāndogya 6.2.1: In the beginning, sat alone existed' },
  { dev: 'असत्', iast: 'asat', en: 'non-being, absolute void', note: 'Rejected: Being can never emerge from non-being' },
  { dev: 'त्रिवृत्करण', iast: 'trivṛtkaraṇa', en: 'triplication: compounding fire (tejas), water (āpaḥ) & food/earth (anna)' },
  { dev: 'लवण', iast: 'lavaṇa', en: 'salt', note: 'Dissolved in water: invisible yet saturating every drop (6.13)' },
  { dev: 'न्यग्रोध', iast: 'nyagrodha', en: 'banyan tree', note: 'Colossal tree arising from the invisible subtle power inside a seed (6.12)' },
  { dev: 'अणिमा', iast: 'aṇiman', en: 'subtle essence, unmanifest potentiality', note: 'The invisible root of reality' },
  { dev: 'अन्नमयम् मनः', iast: 'anna-mayaṃ manaḥ', en: 'the mind is constructed from food', note: 'Proven via the 15-day fasting experiment (6.5.4)' },
  { dev: 'मृत्तिका', iast: 'mṛttikā', en: 'clay', note: 'Knowing one lump of clay reveals all clay utensils (6.1.4)' },
  { dev: 'वाचारम्भणम्', iast: 'vācārambhaṇam', en: 'verbal distinction, modification of speech', note: 'Names and forms are linguistic; substance is invariant' },
  { dev: 'सृष्टि', iast: 'sṛṣṭi', en: 'emergence, phase transition into manifestation' },
  { dev: 'स्थिति', iast: 'sthiti', en: 'sustained equilibrium, cosmic order (ṛta)' },
  { dev: 'लय', iast: 'laya', en: 'absorption, involution back into unmanifest causal ground' },
];

const CHALLENGES: LabChallenge[] = [
  {
    q: 'In Uddālaka Āruṇi’s clay analogy (Mṛttikā-dṛṣṭānta), what is real (satyam)?',
    options: ['The pot’s shape and name', 'The clay alone', 'The potter’s tools'],
    answer: 1,
    explain: '“Vācārambhaṇaṃ vikāro nāmadheyaṃ mṛttikety eva satyam” — The modification is merely a name of speech; the enduring truth is solely clay (Chāndogya 6.1.4).',
  },
  {
    q: 'When salt dissolves completely in water overnight, what does tasting from top, middle and bottom prove?',
    options: ['Salt turned into water molecules', 'Salt was destroyed', 'Subtle reality permeates every part even when invisible to the eyes'],
    answer: 2,
    explain: 'Śvetaketu tasted salt at all three depths. Just as salt pervades the water, invisible Sat pervades every atom of the cosmos (6.13).',
  },
  {
    q: 'What is inside the cleaved tiny banyan seed when Śvetaketu looks closely?',
    options: ['A miniature leaf', 'A golden sprout', '“Nothing at all” (Na kiñcana) — the subtle unmanifest essence (Aṇiman)'],
    answer: 2,
    explain: 'The colossal 100-foot banyan tree emerges from that apparent nothingness: the invisible subtle potentiality that commands manifest form (6.12).',
  },
  {
    q: 'What happened to Śvetaketu during his 15-day food fasting experiment?',
    options: ['His memory failed and he could not recall Vedic mantras', 'He gained photographic memory', 'His speech became louder'],
    answer: 0,
    explain: 'Without food (Anna), the 16 cognitive Kalās of his mind collapsed. Once he ate rice and ghee on day 16, memory rushed back — proving the mind is biological (6.7).',
  },
  {
    q: 'Into which three streams does consumed food split according to Āruṇi’s nutritional science?',
    options: ['Bones, blood, and tears', 'Coarsest becomes waste, middle becomes flesh, subtlest becomes mind', 'Hot, cold, and neutral bile'],
    answer: 1,
    explain: 'Sthaviṣṭha becomes excrement, Madhyama becomes physical muscle, and Aṇiṣṭha (finest essence) nourishes the brain and mind (6.5.1).',
  },
  {
    q: 'Which three primordial elements did Being (Sat) generate in Trivṛtkaraṇa?',
    options: ['Tejas (Fire/Heat), Āpaḥ (Water), Anna (Food/Earth)', 'Air, Ether, and Light', 'Mercury, Sulfur, and Salt'],
    answer: 0,
    explain: 'Chāndogya 6.2–6.4: Sat projected Tejas (red), Āpaḥ (white), and Anna (black/dark), which compounded to form all tissues and objects.',
  },
  {
    q: 'Why did Uddālaka reject the theory that the cosmos arose out of non-being (Asat)?',
    options: ['Because non-being cannot produce Being (Katham asataḥ saj jāyeta)', 'Because gods told him in a dream', 'Because matter is an optical illusion'],
    answer: 0,
    explain: 'Āruṇi formulated an early principle of conservation: Being cannot emerge out of nothingness (*ex nihilo nihil fit*). Reality is eternal transformation.',
  },
  {
    q: 'What is the revolutionary ethical takeaway of “Tat Tvam Asi” (That Thou Art)?',
    options: ['Human beings are superior to all nature', 'All beings and elements share one identical essence, creating universal empathy and harmony', 'Only priests possess knowledge'],
    answer: 1,
    explain: 'By recognizing that the same subtle reality animates oneself, trees, rivers, and all creatures, Āruṇi established an empirical foundation for non-harm and universal empathy (Lokasaṃgraha).',
  },
];

const QUOTES = [
  { ref: 'Chāndogya 6.2.1', dev: 'सदेव सोम्येदमग्र आसीदेकमेवाद्वितीयम्', iast: 'sad eva somyedam agra āsīd ekam evādvitīyam', en: 'In the beginning, dear one, this was Being (Sat) alone, one only, without a second.' },
  { ref: 'Chāndogya 6.2.2', dev: 'कथमसतः सज्जायेत', iast: 'katham asataḥ saj jāyeta', en: 'How could Being ever be born from non-being? In reality, nothing appears from absolute nothingness; all is transformation.' },
  { ref: 'Chāndogya 6.1.4', dev: 'वाचारम्भणं विकारो नामधेयं मृत्तिकेत्येव सत्यम्', iast: 'vācārambhaṇaṃ vikāro nāmadheyam, mṛttikety eva satyam', en: 'All modification is merely a distinction of language, a name of speech; the enduring truth is solely clay.' },
  { ref: 'Chāndogya 6.8.7', dev: 'स य एषोऽणिमैतदात्म्यमिदं सर्वं तत्सत्यं स आत्मा तत्त्वमसि श्वेतकेतो', iast: 'sa ya eṣo \'ṇimaitad-ātmyam idaṃ sarvaṃ tat satyaṃ sa ātmā tat tvam asi śvetaketo', en: 'That subtle essence which is the Self of all that exists—that is the Truth. That is the Self. And That Thou Art, O Śvetaketu!' },
  { ref: 'Chāndogya 6.5.4', dev: 'अन्नमयं हि सोम्य मन आपोमयः प्राणस्तेजोमयी वागिति', iast: 'anna-mayaṃ hi somya mana āpomayaḥ prāṇas tejomayī vāg iti', en: 'For the mind, dear one, is constructed from food; life-breath is made of water; and speech is made of fire/heat.' },
];

const SrishtiLoom: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lang, setLang] = useState<LangMode>('both');
  const [activeNav, setActiveNav] = useState<AruniNavTab>('loom');
  const [activeExp, setActiveExp] = useState<AruniExpTab>('salt');

  // Wave Simulation State
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

  // Experiment 1: Salt-Water State
  const [saltStatus, setSaltStatus] = useState<'undissolved' | 'dissolved' | 'evaporated'>('undissolved');
  const [tastedDepths, setTastedDepths] = useState<{ surface: boolean; middle: boolean; bottom: boolean }>({
    surface: false,
    middle: false,
    bottom: false,
  });

  // Experiment 2: Banyan Seed State
  const [banyanStep, setBanyanStep] = useState<number>(0); // 0: whole fruit, 1: cracked fruit, 2: selected seed, 3: cleaved seed, 4: illuminated tree

  // Experiment 3: Fasting Neuroscience State
  const [fastingDays, setFastingDays] = useState<number>(0);
  const [hasEatenDay16, setHasEatenDay16] = useState<boolean>(false);
  const [reciteFeedback, setReciteFeedback] = useState<string | null>(null);

  // Experiment 4: Substratum Material Forge State
  const [selectedSubstance, setSelectedSubstance] = useState<'clay' | 'gold' | 'iron'>('clay');
  const [activeShape, setActiveShape] = useState<string>('pot');

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

  // Handlers for Experiment 1 (Salt in Water)
  const handleDissolveSalt = () => {
    soundEffects.playElementSummon('ap');
    setSaltStatus('dissolved');
  };

  const handleTasteDepth = (depth: 'surface' | 'middle' | 'bottom') => {
    soundEffects.playPuzzleSnap();
    setTastedDepths((prev) => {
      const next = { ...prev, [depth]: true };
      if (next.surface && next.middle && next.bottom) {
        soundEffects.playTrasarenuChime();
      }
      return next;
    });
  };

  const handleEvaporate = () => {
    soundEffects.playElementSummon('tejas');
    setSaltStatus('evaporated');
  };

  // Handlers for Experiment 2 (Banyan Seed)
  const handleBanyanStep = (targetStep: number) => {
    if (targetStep === 4) {
      soundEffects.playTrasarenuChime();
    } else {
      soundEffects.playPuzzleSnap();
    }
    setBanyanStep(targetStep);
  };

  // Handlers for Experiment 3 (Fasting)
  const handleFastRecite = () => {
    if (hasEatenDay16) {
      soundEffects.playTrasarenuChime();
      setReciteFeedback('✨ “अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम्...” Śvetaketu recites all three Vedas effortlessly! The subtle essence of food has revitalized the 16 cognitive Kalās of his brain.');
    } else if (fastingDays === 0) {
      soundEffects.playPuzzleSnap();
      setReciteFeedback('📖 “अग्निमीळे पुरोहितम्...” Flawless recitation. Śvetaketu retains all 16 Kalās in vibrant health.');
    } else if (fastingDays <= 5) {
      soundEffects.playPuzzleSnap();
      setReciteFeedback('⏳ “उत त्वः पश्यन् न पश्यति...” Verses come with mild hesitation. Energy levels are declining.');
    } else if (fastingDays <= 12) {
      soundEffects.playPuzzleSnap();
      setReciteFeedback('⚠️ “मा नस्तोक...” Verses blur together. Śvetaketu pauses frequently, rubbing his temples in mental fog.');
    } else {
      setReciteFeedback('🚨 “पिता! न मे किञ्चित् प्रतिषेधति! स्मृतिः नश्यति!” — “Father, my mind is blank! Not a single verse appears in my consciousness! My memory has failed!” (Chāndogya 6.7)');
    }
  };

  const handleBreakFast = () => {
    soundEffects.playCelebrationChime();
    setHasEatenDay16(true);
    setReciteFeedback('🍚 Śvetaketu consumes warm rice and clarified butter. The coarsest part forms waste, the middle builds flesh, and the subtlest neuro-active essence ascends to ignite his mind!');
  };

  return (
    <div className="vl-sim">
      <BodhiLabAnecdote
        title="Sage Uddālaka Āruṇi: The Father of Empirical Philosophy & Spiritual Oneness"
        sanskritTitle="उद्दालक-आरुणेः प्रत्यक्ष-विज्ञानम्"
        mood="scholar"
        sutra={{
          dev: 'सदेव सोम्येदमग्र आसीदेकमेवाद्वितीयम् । कथमसतः सज्जायेतेति ॥',
          iast: 'sad eva somyedam agra āsīd ekam evādvitīyam | katham asataḥ saj jāyeteti ||',
          source: 'Chāndogya Upaniṣad 6.2.1–2 (छान्दोग्योपनिषद्)',
          meaning: 'In the beginning, dear one, this universe was Being (Sat) alone, one only without a second. How indeed could Being ever be born from non-being?',
        }}
        anecdote={
          <>
            <p>
              Centuries before early Greek thinkers like Thales or Democritus systematically mapped the physical world,
              <strong> Sage Uddālaka Āruṇi</strong> (c. 8th–7th century BCE, Kuru-Pañcāla) was laying the empirical foundations
              for both physics and metaphysics in ancient India. Celebrated today as one of the world’s first natural scientists,
              Āruṇi rejected blind faith and supernatural myth in favor of <em>Pratyakṣa</em> (direct observation), rigorous logic,
              and repeatable thought experiments.
            </p>
            <p>
              When his son <strong>Śvetaketu</strong> returned from gurukul after twelve arduous years swollen with academic conceit,
              Uddālaka challenged him with history’s ultimate paradigm shift:
              <em> “Have you asked for that instruction, my son, by which we hear what cannot be heard, perceive what cannot be perceived, and know what cannot be known?”</em>
            </p>
            <blockquote style={{ borderLeft: '3px solid #f43f5e', margin: '0.65rem 0', paddingLeft: '0.85rem', fontStyle: 'italic', color: '#9f1239' }}>
              From the dissolution of rock salt in water to cracking open a banyan seed, and from a fifteen-day cognitive fasting test
              to clay and gold metallurgy, Uddālaka proved that underlying matter is indestructible, the mind is thoroughly biological,
              and all cosmic entities share one unified essence: <strong>Tat Tvam Asi</strong> (“That Thou Art”).
            </blockquote>
          </>
        }
        epistemologyAndMethod={
          <>
            Uddālaka formulated the scientific axiom <strong>Satkāryavāda</strong> (the pre-existence of the effect in the cause)
            and the conservation of reality: matter cannot arise from an absolute void (<em>ex nihilo nihil fit</em>), nor can real
            substance vanish into nothingness. Cyclic cosmic phases (<em>Sṛṣṭi</em> emergence, <em>Sthiti</em> sustenance, <em>Laya</em> absorption)
            are thermodynamic phase transitions of an uncreated, indestructible substrate — the primordial <em>Sat</em>.
          </>
        }
        modernBridge={{
          ancientConcept: 'Conservation of Being (Sat-Avināśitā), nutritional genesis of neuro-cognition (Anna-mayaṃ manaḥ), and pervasive unmanifest field potentiality (Aṇiman).',
          modernScience: 'The First Law of Thermodynamics (Conservation of Mass-Energy), Cognitive Neuro-Nutrition (the gut-brain biochemical metabolic axis), and Quantum Field Theory (matter as localized field excitations).',
          relevanceNote: 'Uddālaka’s 15-day fasting test (c. 800 BCE) is humanity’s earliest recorded metabolic neuroscience experiment demonstrating that memory and consciousness require physical nutrition.',
        }}
        societalValue={
          <p>
            Uddālaka’s crowning teaching culminated in the celebrated Mahāvākya: <strong>Tat Tvam Asi</strong> (“You are that subtle truth”).
            This empirical realization demolished artificial social arrogance. By recognizing that all humans, animals, trees, and
            rivers share the identical uncreated substrate, science became the living foundation for universal compassion, non-harm (<em>Ahiṃsā</em>),
            and peaceful ecological coexistence (<em>Lokasaṃgraha</em>).
          </p>
        }
      />

      <CoreIdea>
        <strong>Uddālaka Āruṇi’s Unified Framework:</strong> In the <em>Chāndogya Upaniṣad</em> (chapter 6), the sage uses four
        celebrated empirical proofs: the <strong>Clay, Gold & Iron Substratum</strong> (one substance, endless names),
        the <strong>Trivṛtkaraṇa Cosmology</strong> (fire, water, food), the <strong>15-Day Fasting Neuroscience Lab</strong> (mind is biological),
        and the <strong>Salt in Water & Banyan Seed Tests</strong> (unseen subtle essence pervading all reality: <em>Tat Tvam Asi</em>).
      </CoreIdea>

      {/* Lab Mode Navigation */}
      <nav className="vl-aruni-nav" aria-label="Sage Uddalaka Aruni Lab Modes">
        <button
          type="button"
          className={`vl-aruni-nav-btn${activeNav === 'loom' ? ' is-active' : ''}`}
          onClick={() => setActiveNav('loom')}
        >
          <span>🧵</span> 1. The Cosmic Loom (तन्तु-कक्षा)
        </button>
        <button
          type="button"
          className={`vl-aruni-nav-btn${activeNav === 'experiments' ? ' is-active' : ''}`}
          onClick={() => setActiveNav('experiments')}
        >
          <span>🧪</span> 2. Āruṇi’s 4 Empirical Labs (प्रत्यक्ष-प्रयोगाः)
        </button>
        <button
          type="button"
          className={`vl-aruni-nav-btn${activeNav === 'codex' ? ' is-active' : ''}`}
          onClick={() => setActiveNav('codex')}
        >
          <span>📜</span> 3. Śvetaketu & Tat Tvam Asi (श्वेतकेतु-प्रबोधः)
        </button>
        <button
          type="button"
          className={`vl-aruni-nav-btn${activeNav === 'challenges' ? ' is-active' : ''}`}
          onClick={() => setActiveNav('challenges')}
        >
          <span>🎯</span> 4. Empirical Mastery Quiz ({CHALLENGES.length} Qs)
        </button>
      </nav>

      {/* MODE 1: The Cosmic Wave Loom */}
      {activeNav === 'loom' && (
        <section aria-label="Cosmic Wave Loom Simulation">
          <div className="vl-quest-head">
            <h3 className="vl-quest-title">🧵 The Loom of Āruṇi · Sṛṣṭi-Sthiti-Laya</h3>
            <div className="vl-btn-row" role="radiogroup" aria-label="Language toggle">
              <span className="vl-small">Labels:</span>
              {(['both', 'sanskrit', 'modern'] as LangMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={lang === m}
                  className={`vl-chip${lang === m ? ' is-on' : ''}`}
                  onClick={() => setLang(m)}
                  data-testid={`lang-${m}`}
                >
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
                <canvas
                  ref={canvasRef}
                  className="vl-stage vl-stage--loom"
                  width={W}
                  height={H}
                  data-testid="loom-canvas"
                  role="img"
                  aria-label="Wave lab canvas with Sṛṣṭi, Sthiti and Laya bands along the Kāla axis"
                />
              </HudFrame>
            </div>

            <div className="vl-loom-controls">
              <div className="vl-leds">
                <LedButton kind="toggle" on={playing} color="#4ade80" onClick={() => setPlaying((p) => !p)} testId="loom-play">
                  {playing ? '⏸ Pause' : '▶ Play'}
                </LedButton>
                {phase === 'cloud' && (
                  <button
                    type="button"
                    className="vl-btn vl-btn--gold"
                    onClick={() => { goPhase('srishti'); setPlaying(true); }}
                    data-testid="loom-begin"
                  >
                    Begin {L('Sṛṣṭi', 'emergence')} →
                  </button>
                )}
                {sthitiDone && (
                  <button
                    type="button"
                    className="vl-btn vl-btn--red"
                    onClick={() => { sim.current.layaT = 0; goPhase('laya'); setPlaying(true); }}
                    data-testid="loom-laya"
                  >
                    Set off {L('Laya', 'absorption')} →
                  </button>
                )}
                {phase === 'done' && (
                  <button type="button" className="vl-btn vl-btn--gold" onClick={() => restart()}>
                    ↺ Begin a new cycle
                  </button>
                )}
                <LedButton
                  kind="toggle"
                  on={mixed}
                  color="#f87171"
                  onClick={() => setMixed((m) => !m)}
                  testId="loom-mix"
                  title="Trivṛtkaraṇa: make every particle threefold"
                >
                  🔴⚪⚫ {L('Trivṛtkaraṇa', 'Mix three elements')}
                </LedButton>
                <LedButton
                  kind="action"
                  color="#fb923c"
                  onClick={() => {
                    sim.current.ps.forEach((p) => {
                      p.vx += (Math.random() - 0.5) * 50;
                      p.vy += (Math.random() - 0.5) * 50;
                    });
                  }}
                  testId="loom-entropy"
                  title="Inject thermal perturbation to test stability against entropy"
                >
                  ⚡ Test Entropy Resistance
                </LedButton>
                <LedButton kind="action" onClick={() => { setPlaying(false); restart(); }} testId="loom-reset">
                  Reset
                </LedButton>
              </div>

              <div className="vl-loom-deck">
                <div className="vl-dials">
                  <div className="vl-dial-group">
                    <DialKnob
                      label={<>{L('Spandana', 'Vibration frequency', 'स्पन्दन')}</>}
                      ariaLabel="Vibration frequency in hertz"
                      value={freq}
                      min={0.5}
                      max={6}
                      step={0.1}
                      onChange={setFreq}
                      format={(x) => `${x.toFixed(1)} Hz`}
                      color="#2dd4bf"
                      testId="loom-freq"
                    />
                    <span className="vl-res" title="How strongly the loom responds at this frequency" aria-label={`Response ${Math.round(res * 100)} percent`}>
                      <span style={{ width: `${Math.round(res * 100)}%` }} />
                    </span>
                  </div>
                  <DialKnob
                    label={<>{L('Prāṇa', 'Energy', 'प्राण')}</>}
                    ariaLabel="Energy"
                    value={prana}
                    min={0}
                    max={100}
                    step={1}
                    onChange={setPrana}
                    format={(x) => `${Math.round(x)}`}
                    color="#facc15"
                    testId="loom-prana"
                  />
                </div>
                <div className="vl-loom-faders">
                  <GlowSlider
                    label={<>{L('Kāla', 'Time speed', 'काल')}</>}
                    value={kala}
                    min={0.25}
                    max={2}
                    step={0.05}
                    onChange={setKala}
                    valueText={`×${kala.toFixed(2)}`}
                    color="#a78bfa"
                    ariaLabel="Time speed"
                    testId="loom-kala"
                  />
                  <GlowSlider
                    label={<>{L('Ghanatva', 'Particle density', 'घनत्व')}</>}
                    value={density}
                    min={30}
                    max={180}
                    step={10}
                    onChange={onDensity}
                    valueText={String(density)}
                    disabled={phase !== 'cloud'}
                    color="#60a5fa"
                    ariaLabel="Particle density"
                    testId="loom-density"
                  />
                </div>
              </div>
            </div>

            <div className="vl-readouts" data-testid="loom-readouts">
              <span className="vl-readout">{L('Spandana', 'Frequency')}: <b>{freq.toFixed(1)} Hz</b></span>
              <span className="vl-readout">{L('Taraṅga-vega', 'Wave speed')}: <b>{Math.round(freq * WAVELENGTH)} px/s</b></span>
              <span className="vl-readout">{L('Vyakta', 'Manifest')}: <b data-testid="loom-manifest">{read.manifest}</b> / {read.total}</span>
              <span className="vl-readout">{L('Vikṣepa', 'Scatter')}: <b data-testid="loom-scatter">{Math.round(read.scatter)}%</b></span>
              <span className="vl-readout" style={{ background: '#fef2f2', borderColor: '#fca5a5', color: '#991b1b', fontWeight: 800 }}>
                ⚛️ Sat Conservation: <b>100.0%</b> ({read.total} Quanta Invariant)
              </span>
              {phase === 'sthiti' && (
                <span className="vl-readout">
                  {L('Sthiti', 'Steady')}: <b>{Math.min(HOLD_SECONDS, read.hold).toFixed(1)} / {HOLD_SECONDS} s</b>
                </span>
              )}
            </div>

            <p className="vl-msg" role="status" data-testid="loom-msg">
              {phase === 'cloud' && 'Step 1: a scattered cloud of particles. The total never changes: in this game particles never appear from nothing, they only change form. Press “Begin”.'}
              {phase === 'srishti' && (res * prana / 100 > 0.3
                ? 'The loom is humming! Particles are gathering onto the wave…'
                : 'Step 2: tune Spandana near the loom’s natural frequency (watch the green bar) and raise Prāṇa until the particles gather.')}
              {phase === 'sthiti' && !sthitiDone && `Step 3: keep the pattern steady for ${HOLD_SECONDS} seconds. Too much Prāṇa (over 85) makes it jitter; drifting off the natural frequency loosens it.`}
              {sthitiDone && '🌿 Steady! The Vedic word ṛta (ऋत) names cosmic order: the regular way the universe keeps its course. Now set off Laya.'}
              {phase === 'laya' && 'Step 4: Laya. The binding lets go; particles spread out and fade from view, but none is destroyed: they return to the unmanifest (Avyakta).'}
              {phase === 'done' && '✨ The cycle is complete. Every particle is still on the loom, only faded. In the traditional picture, laya is followed by a new sṛṣṭi.'}
            </p>
          </div>
        </section>
      )}

      {/* MODE 2: Āruṇi’s 4 Empirical Laboratories */}
      {activeNav === 'experiments' && (
        <section aria-label="Aruni 4 Empirical Experiments">
          {/* Sub-selector for the 4 experiments */}
          <div className="vl-aruni-exp-selector">
            <button
              type="button"
              className={`vl-aruni-exp-btn${activeExp === 'salt' ? ' is-active' : ''}`}
              onClick={() => setActiveExp('salt')}
            >
              <div className="vl-aruni-exp-badge"><span>EXP-01</span> <span>🧂</span></div>
              <div className="vl-aruni-exp-dev">लवण-जल-संप्लवः</div>
              <div className="vl-aruni-exp-title">1. Salt in Water Dissolution</div>
              <div className="vl-aruni-exp-sub">Omnipresent subtle Sat permeating every single drop</div>
            </button>

            <button
              type="button"
              className={`vl-aruni-exp-btn${activeExp === 'banyan' ? ' is-active' : ''}`}
              onClick={() => setActiveExp('banyan')}
            >
              <div className="vl-aruni-exp-badge"><span>EXP-02</span> <span>🌰</span></div>
              <div className="vl-aruni-exp-dev">न्यग्रोध-बीज-अणिमा</div>
              <div className="vl-aruni-exp-title">2. Banyan Seed Cleavage</div>
              <div className="vl-aruni-exp-sub">Unmanifest potentiality commanding the colossal tree</div>
            </button>

            <button
              type="button"
              className={`vl-aruni-exp-btn${activeExp === 'fasting' ? ' is-active' : ''}`}
              onClick={() => setActiveExp('fasting')}
            >
              <div className="vl-aruni-exp-badge"><span>EXP-03</span> <span>🧠</span></div>
              <div className="vl-aruni-exp-dev">पञ्चदशाह-उपवासः</div>
              <div className="vl-aruni-exp-title">3. 15-Day Fasting Neuroscience</div>
              <div className="vl-aruni-exp-sub">Proof that mind & memory are rooted in biological food</div>
            </button>

            <button
              type="button"
              className={`vl-aruni-exp-btn${activeExp === 'substratum' ? ' is-active' : ''}`}
              onClick={() => setActiveExp('substratum')}
            >
              <div className="vl-aruni-exp-badge"><span>EXP-04</span> <span>🏺</span></div>
              <div className="vl-aruni-exp-dev">मृत्तिका-सुवर्ण-न्यायः</div>
              <div className="vl-aruni-exp-title">4. Substratum & Modification</div>
              <div className="vl-aruni-exp-sub">Clay & gold invariant; names & forms are linguistic labels</div>
            </button>
          </div>

          {/* EXPERIMENT 1: Salt in Water */}
          {activeExp === 'salt' && (
            <div className="vl-aruni-stage-card">
              <div className="vl-aruni-stage-header">
                <div className="vl-aruni-stage-hgroup">
                  <h3>
                    <span>🧂</span>
                    <span>Experiment 1: The Salt in Water Permeation Test (लवण-जल-संप्लवः)</span>
                  </h3>
                  <p>
                    Uddālaka commanded Śvetaketu to drop rock salt into a vessel of water overnight. Next morning, the solid lump was gone,
                    yet every single drop from surface to bottom tasted intensely salty — demonstrating that invisible does not mean absent!
                  </p>
                </div>
                <button
                  type="button"
                  className="vl-chip"
                  onClick={() => playPronunciation('लवणमेतदुदकेऽवधायाथ मा प्रातरुपसीदथाः')}
                  title="Hear the Sanskrit Sūtra"
                >
                  🔊 Chāndogya 6.13.1
                </button>
              </div>

              <div className="vl-salt-beaker-box">
                {/* Visual Beaker */}
                <div className="vl-beaker-visual">
                  <div className="vl-beaker-water">
                    <div className="vl-beaker-meniscus" />
                    {saltStatus === 'undissolved' && (
                      <div className="vl-salt-crystal" title="Rock Salt Chunk (Lavaṇa-piṇḍa)" />
                    )}
                    {saltStatus === 'dissolved' && (
                      <div className="vl-ion-field">
                        {Array.from({ length: 42 }).map((_, i) => (
                          <div
                            key={i}
                            className="vl-salt-ion"
                            style={{
                              left: `${(i * 19) % 210 + 12}px`,
                              top: `${(i * 27) % 190 + 15}px`,
                              animationDelay: `${(i * 0.12).toFixed(2)}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                    {saltStatus === 'evaporated' && (
                      <div
                        className="vl-salt-crystal"
                        style={{ bottom: '4px', background: '#ffffff', opacity: 1 }}
                        title="Recrystallized Salt (100% Invariant Mass)"
                      />
                    )}
                  </div>
                </div>

                {/* Controls & Pipette Probes */}
                <div>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    <button
                      type="button"
                      className="vl-btn vl-btn--gold"
                      disabled={saltStatus === 'dissolved'}
                      onClick={handleDissolveSalt}
                    >
                      💧 Dissolve Overnight (रात्रौ विलीनम्)
                    </button>
                    <button
                      type="button"
                      className="vl-btn vl-btn--red"
                      disabled={saltStatus !== 'dissolved'}
                      onClick={handleEvaporate}
                    >
                      🔥 Evaporate Water (बाष्पीभवनम्)
                    </button>
                    <button
                      type="button"
                      className="vl-btn vl-btn--cyber-ghost"
                      onClick={() => {
                        setSaltStatus('undissolved');
                        setTastedDepths({ surface: false, middle: false, bottom: false });
                      }}
                    >
                      ↺ Reset Beaker
                    </button>
                  </div>

                  <h4 style={{ margin: '0.75rem 0 0.5rem', fontSize: '0.92rem', color: '#f1f5f9' }}>
                    Interactive Pipette: Sample & Taste from 3 Depths
                  </h4>

                  <div className="vl-sampling-stations">
                    <button
                      type="button"
                      className={`vl-sample-btn${tastedDepths.surface ? ' is-tasted' : ''}`}
                      disabled={saltStatus !== 'dissolved'}
                      onClick={() => handleTasteDepth('surface')}
                    >
                      <span>🥄 1. Sip from Surface (उपरीष्टात् / Upari)</span>
                      <span className="vl-sample-taste-result">
                        {tastedDepths.surface ? '✓ Lavaṇam eva! (Salty)' : 'Take a sip →'}
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`vl-sample-btn${tastedDepths.middle ? ' is-tasted' : ''}`}
                      disabled={saltStatus !== 'dissolved'}
                      onClick={() => handleTasteDepth('middle')}
                    >
                      <span>🥄 2. Sip from Middle (मध्यात् / Madhye)</span>
                      <span className="vl-sample-taste-result">
                        {tastedDepths.middle ? '✓ Lavaṇam eva! (Salty)' : 'Take a sip →'}
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`vl-sample-btn${tastedDepths.bottom ? ' is-tasted' : ''}`}
                      disabled={saltStatus !== 'dissolved'}
                      onClick={() => handleTasteDepth('bottom')}
                    >
                      <span>🥄 3. Sip from Bottom (अधस्तात् / Adhastāt)</span>
                      <span className="vl-sample-taste-result">
                        {tastedDepths.bottom ? '✓ Lavaṇam eva! (Salty)' : 'Take a sip →'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sūtra Revelation Banner */}
              {tastedDepths.surface && tastedDepths.middle && tastedDepths.bottom && (
                <div className="vl-recite-output" style={{ borderLeftColor: '#4ade80' }}>
                  <h4 style={{ margin: '0 0 0.4rem', color: '#4ade80' }}>
                    ✨ Empirical Proof of Omnipresent Being (Sat-Vyāpakatā):
                  </h4>
                  <p style={{ margin: 0, fontStyle: 'italic' }}>
                    “तद्ध तथा न विभावयसे, अत्रैव किल तद्भवति! स य एषोऽणिमैतदात्म्यमिदं सर्वं तत्सत्यं स आत्मा तत्त्वमसि श्वेतकेतो!”<br />
                    “Indeed, you do not see it with your physical eyes, yet right here in every drop it exists!
                    That subtle essence is the Self of all that exists. That is the Truth. That is the Self.
                    <strong> And That, O Śvetaketu, art thou (Tat Tvam Asi)!</strong>” (Chāndogya 6.13.3)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* EXPERIMENT 2: Banyan Seed Cleavage */}
          {activeExp === 'banyan' && (
            <div className="vl-aruni-stage-card">
              <div className="vl-aruni-stage-header">
                <div className="vl-aruni-stage-hgroup">
                  <h3>
                    <span>🌰</span>
                    <span>Experiment 2: The Nyagrodha (Banyan) Seed Cleavage (न्यग्रोध-बीज-भेदः)</span>
                  </h3>
                  <p>
                    Uddālaka asked his son to crack open a tiny seed from a giant banyan fruit. Inside, Śvetaketu saw
                    <em> “nothing at all”</em>. Yet from that subtle unmanifest power (Aṇiman), the colossal 100-foot multi-rooted tree arises!
                  </p>
                </div>
                <button
                  type="button"
                  className="vl-chip"
                  onClick={() => playPronunciation('न्यग्रोधफलमत आहरोतीदं भगव इति भिन्द्धीति भिन्नं भगव इति')}
                  title="Hear the Sanskrit Sūtra"
                >
                  🔊 Chāndogya 6.12.1
                </button>
              </div>

              <div className="vl-banyan-split-box">
                {/* Microscope / Dissection Stage */}
                <div className="vl-seed-lens-viewport">
                  {banyanStep === 0 && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '4.5rem', marginBottom: '0.5rem' }}>🫐</div>
                      <div style={{ color: '#facc15', fontWeight: 800, fontSize: '0.92rem' }}>Nyagrodha Fruit (न्यग्रोध-फलम्)</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Intact ripe banyan fig from the forest</div>
                    </div>
                  )}

                  {banyanStep === 1 && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '3rem', letterSpacing: '8px' }}>🌰 🌰 🌰</div>
                      <div style={{ color: '#facc15', fontWeight: 800, fontSize: '0.92rem', marginTop: '0.5rem' }}>
                        Tiny Seeds (अण्व्यः धानाः)
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Hundreds of minute seeds like mustard grains</div>
                    </div>
                  )}

                  {banyanStep === 2 && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 10px #f59e0b)' }}>🌰</div>
                      <div style={{ color: '#fde047', fontWeight: 800, fontSize: '0.92rem' }}>Single Mustard-Sized Seed (एका धाना)</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Under 500× optical magnification</div>
                    </div>
                  )}

                  {banyanStep === 3 && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px dashed #94a3b8', margin: '0 auto 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#64748b', fontSize: '0.8rem', fontStyle: 'italic' }}>[Empty]</span>
                      </div>
                      <div style={{ color: '#f87171', fontWeight: 800, fontSize: '1rem' }}>“न किञ्चन भगव इति!”</div>
                      <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>“I see nothing at all, revered father!”</div>
                    </div>
                  )}

                  {banyanStep === 4 && (
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <svg className="vl-banyan-tree-svg" viewBox="0 0 200 160">
                        <defs>
                          <radialGradient id="treeGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#fde047" stopOpacity="0.9" />
                            <stop offset="70%" stopColor="#eab308" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        {/* Sprawling Canopy */}
                        <circle cx="100" cy="55" r="48" fill="url(#treeGlow)" />
                        <path d="M 60 70 Q 100 20 140 70 Q 170 50 150 90 Q 50 90 60 70" fill="#22c55e" opacity="0.85" />
                        <path d="M 75 60 Q 100 35 125 60" stroke="#fef08a" strokeWidth="2" fill="none" />
                        {/* Massive Trunk and Prop Roots */}
                        <path d="M 94 85 L 94 145 M 106 85 L 106 145" stroke="#92400e" strokeWidth="6" />
                        <path d="M 75 88 L 70 145" stroke="#b45309" strokeWidth="3" strokeDasharray="3 2" />
                        <path d="M 125 88 L 130 145" stroke="#b45309" strokeWidth="3" strokeDasharray="3 2" />
                        <path d="M 55 95 L 50 145 M 145 95 L 150 145" stroke="#b45309" strokeWidth="2" />
                        <line x1="30" y1="145" x2="170" y2="145" stroke="#a16207" strokeWidth="3" />
                      </svg>
                      <div style={{ color: '#fef08a', fontWeight: 800, fontSize: '0.92rem' }}>The Colossal Banyan Tree (महान् न्यग्रोधः)</div>
                      <div style={{ color: '#a7f3d0', fontSize: '0.78rem' }}>Unfolded from invisible subtle essence (Aṇiman)</div>
                    </div>
                  )}
                </div>

                {/* Step Progression Buttons */}
                <div>
                  <h4 style={{ margin: '0 0 0.8rem', color: '#f1f5f9', fontSize: '0.94rem' }}>
                    Step-by-Step Cleavage Protocol:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <button
                      type="button"
                      className={`vl-sample-btn${banyanStep === 1 ? ' is-tasted' : ''}`}
                      onClick={() => handleBanyanStep(1)}
                    >
                      <span>1. Crack Open Fruit (फल-भेदनम्)</span>
                      <span>Reveal seeds →</span>
                    </button>
                    <button
                      type="button"
                      className={`vl-sample-btn${banyanStep === 2 ? ' is-tasted' : ''}`}
                      disabled={banyanStep < 1}
                      onClick={() => handleBanyanStep(2)}
                    >
                      <span>2. Pick a Single Seed (एकां धानां गृहाण)</span>
                      <span>Zoom 500× →</span>
                    </button>
                    <button
                      type="button"
                      className={`vl-sample-btn${banyanStep === 3 ? ' is-tasted' : ''}`}
                      disabled={banyanStep < 2}
                      onClick={() => handleBanyanStep(3)}
                    >
                      <span>3. Crack Open the Seed Core (एतां भिन्द्धि)</span>
                      <span>Inspect interior →</span>
                    </button>
                    <button
                      type="button"
                      className={`vl-sample-btn${banyanStep === 4 ? ' is-tasted' : ''}`}
                      style={banyanStep === 4 ? { borderColor: '#facc15', background: 'rgba(250, 204, 21, 0.15)' } : {}}
                      disabled={banyanStep < 3}
                      onClick={() => handleBanyanStep(4)}
                    >
                      <span>4. Illuminate Subtle Potentiality (अणिमा)</span>
                      <span style={{ color: '#fde047', fontWeight: 800 }}>Sprout Mighty Banyan 🌿</span>
                    </button>
                  </div>
                </div>
              </div>

              {banyanStep === 4 && (
                <div className="vl-recite-output" style={{ borderLeftColor: '#facc15' }}>
                  <h4 style={{ margin: '0 0 0.4rem', color: '#facc15' }}>
                    🌳 The Principle of Unmanifest Potential (Aṇiman):
                  </h4>
                  <p style={{ margin: 0, fontStyle: 'italic' }}>
                    “यं वै सोम्यैतमणिमानं न निभालयस एतस्य वै सोम्यैषोऽणिम्न एवं महान्न्यग्रोधस्तिष्ठति श्रद्धत्स्व सोम्येति!”<br />
                    “That subtle essence which you do not see with your eyes, my son—from that very subtle essence this mighty Banyan tree stands forth!
                    Have faith, my son! That subtle essence is the Self of all that exists. That is the Truth.
                    <strong> And That Thou Art, O Śvetaketu (Tat Tvam Asi)!</strong>” (Chāndogya 6.12.2)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* EXPERIMENT 3: 15-Day Fasting Neuroscience */}
          {activeExp === 'fasting' && (
            <div className="vl-aruni-stage-card">
              <div className="vl-aruni-stage-header">
                <div className="vl-aruni-stage-hgroup">
                  <h3>
                    <span>🧠</span>
                    <span>Experiment 3: The 15-Day Fasting Neuroscience Lab (पञ्चदशाह-उपवासः)</span>
                  </h3>
                  <p>
                    Centuries before modern neuroscience, Uddālaka proved that consciousness is thoroughly biological.
                    Śvetaketu fasted for fifteen days (drinking only water). As physical nutrition stopped, his memory failed completely.
                    Once he ate again, his brain re-ignited!
                  </p>
                </div>
                <button
                  type="button"
                  className="vl-chip"
                  onClick={() => playPronunciation('षोडशकलः सोम्य पुरुषः पञ्चदशाहानि माशीः काममपः पिब')}
                  title="Hear the Sanskrit Sūtra"
                >
                  🔊 Chāndogya 6.7.1
                </button>
              </div>

              <div className="vl-fasting-hud">
                {/* Timeline Controls & Telemetry */}
                <div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 800, color: '#f8fafc' }}>
                        Fasting Duration: <b>Day {fastingDays} / 15</b>
                      </span>
                      <span style={{ color: '#c084fc', fontFamily: 'JetBrains Mono', fontWeight: 800 }}>
                        {fastingDays === 0 ? 'Fully Nourished' : fastingDays < 15 ? 'Fasting Active' : 'Maximum Cognitive Depletion'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      step={1}
                      value={fastingDays}
                      disabled={hasEatenDay16}
                      onChange={(e) => {
                        setFastingDays(Number(e.target.value));
                        setReciteFeedback(null);
                      }}
                      style={{ width: '100%', accentColor: '#c084fc', cursor: 'pointer' }}
                    />
                  </div>

                  {/* 16 Kalās Matrix */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                      <span style={{ color: '#cbd5e1' }}>16 Cognitive Faculties of the Mind (षोडश-कलाः):</span>
                      <span style={{ color: '#c084fc', fontWeight: 800 }}>
                        {hasEatenDay16 ? 16 : Math.max(1, 16 - fastingDays)} / 16 Active
                      </span>
                    </div>
                    <div className="vl-kala-grid">
                      {Array.from({ length: 16 }).map((_, i) => {
                        const active = hasEatenDay16 || i < Math.max(1, 16 - fastingDays);
                        return (
                          <div key={i} className={`vl-kala-chip ${active ? 'is-active' : 'is-dormant'}`}>
                            Kalā {i + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Fasting Actions */}
                  <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                    <button type="button" className="vl-btn vl-btn--gold" onClick={handleFastRecite}>
                      📜 Test Vedic Recall (स्मरण-परीक्षा)
                    </button>
                    {fastingDays >= 12 && !hasEatenDay16 && (
                      <button type="button" className="vl-btn vl-btn--cyber" onClick={handleBreakFast}>
                        🍚 Day 16: Feed Śvetaketu Rice & Ghee (अन्न-प्राशनम्)
                      </button>
                    )}
                    {hasEatenDay16 && (
                      <button
                        type="button"
                        className="vl-btn vl-btn--cyber-ghost"
                        onClick={() => {
                          setFastingDays(0);
                          setHasEatenDay16(false);
                          setReciteFeedback(null);
                        }}
                      >
                        ↺ Reset Fasting Lab
                      </button>
                    )}
                  </div>

                  {reciteFeedback && (
                    <div className="vl-recite-output">
                      {reciteFeedback}
                    </div>
                  )}
                </div>

                {/* 3-Stream Digestion Chart */}
                <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: '12px', padding: '1.1rem' }}>
                  <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.88rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Uddālaka’s 3-Stream Nutrition
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.82rem' }}>
                    <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.6rem 0.75rem', borderRadius: '8px', borderLeft: '3px solid #64748b' }}>
                      <b style={{ color: '#94a3b8' }}>1. Sthaviṣṭha (स्थविष्ठ / Coarsest):</b>
                      <div style={{ color: '#cbd5e1' }}>Becomes biological waste and bodily excretion.</div>
                    </div>
                    <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.6rem 0.75rem', borderRadius: '8px', borderLeft: '3px solid #f97316' }}>
                      <b style={{ color: '#fb923c' }}>2. Madhyama (मध्यम / Middle):</b>
                      <div style={{ color: '#cbd5e1' }}>Builds physical muscle tissue and bodily flesh (Māṃsa).</div>
                    </div>
                    <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.6rem 0.75rem', borderRadius: '8px', borderLeft: '3px solid #c084fc' }}>
                      <b style={{ color: '#e879f9' }}>3. Aṇiṣṭha (अणिष्ठ / Subtlest):</b>
                      <div style={{ color: '#cbd5e1' }}>Ascends to construct and nourish the cognitive mind (Manas)!</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '0.85rem', fontSize: '0.76rem', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' }}>
                    “Anna-mayaṃ hi saumya manaḥ” — The human mind is thoroughly material and biologically nourished.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EXPERIMENT 4: Substratum: Clay, Gold & Iron */}
          {activeExp === 'substratum' && (
            <div className="vl-aruni-stage-card">
              <div className="vl-aruni-stage-header">
                <div className="vl-aruni-stage-hgroup">
                  <h3>
                    <span>🏺</span>
                    <span>Experiment 4: Principle of Substratum (मृत्तिका-सुवर्ण-लोह-न्यायः)</span>
                  </h3>
                  <p>
                    Uddālaka explained that knowing a single lump of clay reveals everything made of clay.
                    Pots, plates, and pitchers are mere temporary names and linguistic labels (Nāma-Rūpa); the abiding reality is just clay!
                  </p>
                </div>
                <button
                  type="button"
                  className="vl-chip"
                  onClick={() => playPronunciation('यथा सोम्यैकेन मृत्पिण्डेन सर्वं मृन्मयं विज्ञातं स्याद्वाचारम्भणं विकारो नामधेयं मृत्तिकेत्येव सत्यम्')}
                  title="Hear the Sanskrit Sūtra"
                >
                  🔊 Chāndogya 6.1.4
                </button>
              </div>

              <div className="vl-substratum-forge">
                {/* Visual Morph Stage */}
                <div className="vl-forge-display">
                  <div className="vl-morph-shape-icon">
                    {selectedSubstance === 'clay' && activeShape === 'pot' && '🏺'}
                    {selectedSubstance === 'clay' && activeShape === 'plate' && '🥣'}
                    {selectedSubstance === 'clay' && activeShape === 'pitcher' && '🫖'}
                    {selectedSubstance === 'clay' && activeShape === 'lump' && '🧱'}

                    {selectedSubstance === 'gold' && activeShape === 'pot' && '💍'}
                    {selectedSubstance === 'gold' && activeShape === 'plate' && '👑'}
                    {selectedSubstance === 'gold' && activeShape === 'pitcher' && '🪙'}
                    {selectedSubstance === 'gold' && activeShape === 'lump' && '🧈'}

                    {selectedSubstance === 'iron' && activeShape === 'pot' && '✂️'}
                    {selectedSubstance === 'iron' && activeShape === 'plate' && '🗡️'}
                    {selectedSubstance === 'iron' && activeShape === 'pitcher' && '⚓'}
                    {selectedSubstance === 'iron' && activeShape === 'lump' && '🔩'}
                  </div>
                  <div style={{ color: '#facc15', fontWeight: 800, fontSize: '1.05rem', marginTop: '0.5rem' }}>
                    {selectedSubstance === 'clay' && activeShape === 'pot' && 'Ghaṭa (घटः / Water Pot)'}
                    {selectedSubstance === 'clay' && activeShape === 'plate' && 'Śarāva (शरावः / Shallow Dish)'}
                    {selectedSubstance === 'clay' && activeShape === 'pitcher' && 'Udāñcana (उदाञ्चनम् / Pitcher)'}
                    {selectedSubstance === 'clay' && activeShape === 'lump' && 'Mṛt-piṇḍa (मृत्पिण्डः / Raw Clay Lump)'}

                    {selectedSubstance === 'gold' && activeShape === 'pot' && 'Aṅgulīyaka (अङ्गुलीयकम् / Gold Ring)'}
                    {selectedSubstance === 'gold' && activeShape === 'plate' && 'Mukuṭa (मुकुटम् / Royal Crown)'}
                    {selectedSubstance === 'gold' && activeShape === 'pitcher' && 'Niṣka (निष्कः / Gold Coin)'}
                    {selectedSubstance === 'gold' && activeShape === 'lump' && 'Lohamaṇi (लोहमणिः / Raw Gold Nugget)'}

                    {selectedSubstance === 'iron' && activeShape === 'pot' && 'Nakha-kṛntana (नखकृन्तनम् / Nail-Cutter)'}
                    {selectedSubstance === 'iron' && activeShape === 'plate' && 'Khaḍga (खड्गः / Iron Sword)'}
                    {selectedSubstance === 'iron' && activeShape === 'pitcher' && 'Laṅgara (लङ्गरः / Heavy Anchor)'}
                    {selectedSubstance === 'iron' && activeShape === 'lump' && 'Kārṣṇāyasa (कार्ष्णायसम् / Raw Iron Bar)'}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    Substrate Mass: <b>500.000g Invariant</b>
                  </div>
                </div>

                {/* Substrate Selectors & Morph Triggers */}
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.84rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Choose Substratum Material:</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className={`vl-chip${selectedSubstance === 'clay' ? ' is-on' : ''}`}
                        onClick={() => { setSelectedSubstance('clay'); soundEffects.playPuzzleSnap(); }}
                      >
                        🪨 Mṛttikā (Clay / 6.1.4)
                      </button>
                      <button
                        type="button"
                        className={`vl-chip${selectedSubstance === 'gold' ? ' is-on' : ''}`}
                        onClick={() => { setSelectedSubstance('gold'); soundEffects.playPuzzleSnap(); }}
                      >
                        ✨ Suvarṇa / Lohamaṇi (Gold / 6.1.5)
                      </button>
                      <button
                        type="button"
                        className={`vl-chip${selectedSubstance === 'iron' ? ' is-on' : ''}`}
                        onClick={() => { setSelectedSubstance('iron'); soundEffects.playPuzzleSnap(); }}
                      >
                        ⚒️ Kārṣṇāyasa (Iron / 6.1.6)
                      </button>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.84rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Modify Shape & Name (Nāma-Rūpa):</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className={`vl-sample-btn${activeShape === 'lump' ? ' is-tasted' : ''}`}
                        onClick={() => { setActiveShape('lump'); soundEffects.playPuzzleSnap(); }}
                      >
                        <span>Original Raw Lump</span>
                        <span>[Piṇḍa]</span>
                      </button>
                      <button
                        type="button"
                        className={`vl-sample-btn${activeShape === 'pot' ? ' is-tasted' : ''}`}
                        onClick={() => { setActiveShape('pot'); soundEffects.playPuzzleSnap(); }}
                      >
                        <span>Form 1 (Pot / Ring / Cutter)</span>
                        <span>Morph →</span>
                      </button>
                      <button
                        type="button"
                        className={`vl-sample-btn${activeShape === 'plate' ? ' is-tasted' : ''}`}
                        onClick={() => { setActiveShape('plate'); soundEffects.playPuzzleSnap(); }}
                      >
                        <span>Form 2 (Dish / Crown / Sword)</span>
                        <span>Morph →</span>
                      </button>
                      <button
                        type="button"
                        className={`vl-sample-btn${activeShape === 'pitcher' ? ' is-tasted' : ''}`}
                        onClick={() => { setActiveShape('pitcher'); soundEffects.playPuzzleSnap(); }}
                      >
                        <span>Form 3 (Pitcher / Coin / Anchor)</span>
                        <span>Morph →</span>
                      </button>
                    </div>
                  </div>

                  <div className="vl-recite-output" style={{ marginTop: '1rem', borderLeftColor: '#f59e0b' }}>
                    <div style={{ fontWeight: 800, color: '#facc15', marginBottom: '0.25rem' }}>
                      Vācārambhaṇaṃ vikāro nāmadheyam (वाचारम्भणं विकारो नामधेयम्)
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                      “The variation in shape and name is merely an arbitrary convention of human speech; the immutable reality remains 100% {selectedSubstance}!”
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* MODE 3: The Awakening of Śvetaketu & Tat Tvam Asi Codex */}
      {activeNav === 'codex' && (
        <section aria-label="Awakening of Shvetaketu & Tat Tvam Asi Codex" className="vl-aruni-codex-wrap">
          {/* Narrative Dialogue Card */}
          <div className="vl-dialogue-card">
            <h3 style={{ margin: '0 0 1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span>📜</span> The Awakening of Śvetaketu: From Conceit to Enlightenment
            </h3>

            <div className="vl-speaker-dialogue is-uddalaka">
              <div className="vl-speaker-name is-uddalaka">SAGE UDDĀLAKA ĀRUṆI:</div>
              <div className="vl-dialogue-text">
                “Śvetaketu, my son! You have returned from school after twelve long years, having recited all the Vedas.
                You walk with your chin raised, grave in manner, swollen with academic pride.
                Tell me, did you ask your preceptors for that instruction by which what is unheard becomes heard,
                what is unthought becomes thought, and what is unknown becomes known?”
              </div>
            </div>

            <div className="vl-speaker-dialogue is-shvetaketu">
              <div className="vl-speaker-name is-shvetaketu">ŚVETAKETU:</div>
              <div className="vl-dialogue-text">
                “What is that instruction, venerable father? Surely my learned teachers did not know this,
                for had they known, why would they not have taught it to me?
                Please, reverend sir, teach this knowledge to me yourself!”
              </div>
            </div>

            <div className="vl-speaker-dialogue is-uddalaka">
              <div className="vl-speaker-name is-uddalaka">SAGE UDDĀLAKA ĀRUṆI:</div>
              <div className="vl-dialogue-text">
                “Listen closely, dear boy! Just as by knowing a single lump of clay, all things fashioned from clay are understood—their
                differing names and forms being mere linguistic figures of speech—so is this ultimate teaching.
                In the beginning was Being alone (Sat), one without a second. And That subtle essence, Śvetaketu, is what you truly are: <strong>Tat Tvam Asi!</strong>”
              </div>
            </div>
          </div>

          {/* The 9 Refrains of Tat Tvam Asi */}
          <div className="vl-panel vl-tradition">
            <h3 className="vl-panel-title">
              <span>🪷</span> The 9 Empirical Analogies of Tat Tvam Asi (Chāndogya Chapter 6)
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '0 0 1rem' }}>
              Nine times Śvetaketu asked for further demonstration, and nine times Uddālaka provided concrete, real-world analogies:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {[
                { n: '1', title: 'The Clay (मृत्तिका)', desc: 'One lump known, all pots known. Form is verbal; clay is the enduring substance.' },
                { n: '2', title: 'The Gold Nugget (लोहमणि)', desc: 'One piece of gold known, all necklaces and bangles are understood.' },
                { n: '3', title: 'The Iron Cutter (कार्ष्णायस)', desc: 'One iron nail-cutter explains all iron implements and weapons.' },
                { n: '4', title: 'The Honey from Flowers (मधुकृतः)', desc: 'Bees gather juices from diverse trees; in the honey, no drop can say “I am of that mango tree”. All merge into unified essence.' },
                { n: '5', title: 'Rivers into the Ocean (नद्यः समुद्रे)', desc: 'Ganga, Yamuna, and Indus flow into the ocean; once dissolved, they do not remember separate identities.' },
                { n: '6', title: 'The Sap in the Tree (वृक्ष-रसः)', desc: 'A tree bled at the base or crown bleeds sap and lives on, because the invisible life-force pervades the entire trunk.' },
                { n: '7', title: 'The Banyan Seed (न्यग्रोध-बीज)', desc: 'Breaking open the seed reveals apparent “nothing”, yet that very unmanifest subtle essence powers the colossal tree.' },
                { n: '8', title: 'The Salt in Water (लवण-जल)', desc: 'Dissolved rock salt cannot be seen, yet every sip from surface, middle, or floor is salty. Sat pervades all.' },
                { n: '9', title: 'The Man from Gandhāra (गन्धार-पुरुष)', desc: 'A blindfolded traveler led into the wilderness finds his way home once the blindfold of ignorance is removed by a wise guide.' },
              ].map((item) => (
                <div key={item.n} style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                  <div style={{ color: '#fb7185', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    {item.n}. {item.title}
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: '1.45' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparative Philosophy: Aruni vs Pre-Socratics */}
          <div className="vl-panel vl-modern">
            <h3 className="vl-panel-title">
              <span>🌐</span> Historical Timeline: Uddālaka Āruṇi vs The Pre-Socratics
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.86rem', margin: '0 0 1rem' }}>
              Uddālaka Āruṇi preceded the earliest Greek natural philosophers by centuries, introducing empirical observation
              while avoiding the nihilism of reductionist materialism:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table className="vl-comparative-matrix-table">
                <thead>
                  <tr>
                    <th>Thinker & Period</th>
                    <th>Geography</th>
                    <th>Primary Scientific Principle</th>
                    <th>Philosophical Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b style={{ color: '#fb7185' }}>Sage Uddālaka Āruṇi</b><br /><small>c. 8th–7th Century BCE</small></td>
                    <td>Kuru-Pañcāla (India)</td>
                    <td><b>Sat (Indestructible Being)</b> + <b>Trivṛtkaraṇa</b> (3-element compounding) + Biological mind</td>
                    <td><b>Spiritual Non-Duality (Tat Tvam Asi)</b>: Empirical physics grounding universal empathy</td>
                  </tr>
                  <tr>
                    <td><b>Thales of Miletus</b><br /><small>c. 624–546 BCE</small></td>
                    <td>Ionia (Greece)</td>
                    <td><b>Water (Hydor)</b> as the single primary material substrate (Archē)</td>
                    <td>Naturalism without mythological gods, but lacked a rigorous epistemology of mind</td>
                  </tr>
                  <tr>
                    <td><b>Anaximenes</b><br /><small>c. 586–526 BCE</small></td>
                    <td>Miletus (Greece)</td>
                    <td><b>Air (Aer)</b> changing via rarefaction and condensation into all matter</td>
                    <td>Kinetic model of matter modification</td>
                  </tr>
                  <tr>
                    <td><b>Heraclitus</b><br /><small>c. 535–475 BCE</small></td>
                    <td>Ephesus (Greece)</td>
                    <td><b>Fire & Flux (Panta Rhei)</b> governed by cosmic Logos</td>
                    <td>Perpetual strife and change; no permanent substrate</td>
                  </tr>
                  <tr>
                    <td><b>Democritus</b><br /><small>c. 460–370 BCE</small></td>
                    <td>Abdera (Greece)</td>
                    <td><b>Atoms & Void</b> moving mechanistically in empty space</td>
                    <td>Material reductionism; consciousness dismissed as passive collision of atoms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* MODE 4: Empirical Mastery Challenges & Quizzes */}
      {activeNav === 'challenges' && (
        <section aria-label="Empirical Mastery Quizzes">
          <div className="vl-grid-2">
            <ChallengeList items={CHALLENGES} title="Āruṇi’s Empirical Physics & Metaphysics Challenges" />
            <div className="vl-panel vl-tradition">
              <h3 className="vl-panel-title">📜 Upaniṣadic Sūtra Reference Bank</h3>
              {QUOTES.map((q) => (
                <figure key={q.ref} className="vl-quote" style={{ marginBottom: '1rem' }}>
                  <blockquote lang="sa">{q.dev}</blockquote>
                  <div className="vl-term-iast">{q.iast}</div>
                  <figcaption>
                    {q.en} <small>({q.ref})</small>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global Vocabulary Panel & Modern Scientific Notes */}
      <div className="vl-grid-2" style={{ marginTop: '2rem' }}>
        <TermPanel terms={TERMS} title="Sanskrit Scientific Terms in Āruṇi’s Discourse" />
        <section className="vl-panel vl-modern" aria-label="Modern scientific reflections">
          <h3 className="vl-panel-title">🔬 Modern Scientific Parallels & Epistemology</h3>
          <ul className="vl-list">
            <li>
              <b>Conservation of Mass-Energy (Lavoisier & Einstein):</b> Āruṇi’s rejection of creation from nothing (*Katham asataḥ saj jāyeta*)
              mirrors the First Law of Thermodynamics: energy and mass cannot be created or destroyed, only transformed.
            </li>
            <li>
              <b>Nutritional Neuroscience:</b> Uddālaka’s demonstration that food splits into coarse waste, medium flesh, and subtlest neuro-active
              energy matches modern metabolic biochemistry: glucose, lipids, and neurotransmitter precursors derived from food regulate memory.
            </li>
            <li>
              <b>Quantum Coherence & Resonance:</b> The cosmic wave loom reflects how quantum fields oscillate at natural frequencies to form stable particle wavepackets.
            </li>
            <li>
              <b>Ecological Oneness:</b> The realization of *Tat Tvam Asi* provides an ethical bridge between modern objective science and environmental preservation.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SrishtiLoom;
