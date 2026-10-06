import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CoreIdea, TermPanel, type LabTerm } from './common';
import { DialKnob, HudFrame, LedButton } from './controls';
import { isSmallScreen, prefersReducedMotion } from './motion';

type LangMode = 'both' | 'sanskrit' | 'modern';
type SubstanceId = 'gold' | 'wood' | 'water' | 'ice';
type Phase = 'solid' | 'liquid' | 'gas';
type El = 'Au' | 'C' | 'H' | 'O' | 'W'; // W = one whole H₂O molecule, drawn as O + 2 H
type LevelNo = 1 | 2 | 3;
interface Levels {
  l1: boolean;
  l2: boolean;
  l3: boolean;
}

const W = 640;
const H = 400;
const BOX = { x0: 24, y0: 24, x1: 616, y1: 376 };
const K_B = 1.380649e-23; // J/K
const AMU = 1.6605390666e-27; // kg
const T_MIN = 1;
const T_MAX = 4000;
const IGNITE_K = 570; // wood catches fire in air at roughly 250–300 °C, depending on the wood
const GLOW_K = 800; // about where hot solids start to glow dull red (Draper point ≈ 798 K)
const COLD_K = 10; // Level 1 goal
const FAST_MS = 1000; // Level 2 goal
const LEVEL_KEY = 'vl-asato-levels-v1';
const SCAN_S = 0.9;
const GLITCH_S = 0.3;

interface Substance {
  id: SubstanceId;
  name: string;
  dev: string;
  iast: string;
  formula: string;
  massU: number;
  massNote: string;
  melt: number | null;
  boil: number | null;
  startT: number;
  color: string;
  sp: number; // lattice spacing on screen, px
}

const SUBSTANCES: Record<SubstanceId, Substance> = {
  gold: { id: 'gold', name: 'Gold', dev: 'सुवर्ण', iast: 'suvarṇa', formula: 'Au', massU: 196.97, massNote: 'one Au atom, 196.97 u', melt: 1337.33, boil: 3243, startT: 300, color: '#eab308', sp: 24 },
  wood: { id: 'wood', name: 'Wood', dev: 'काष्ठ', iast: 'kāṣṭha', formula: 'mostly cellulose (C₆H₁₀O₅)ₙ', massU: 12.011, massNote: 'one C atom, 12.011 u, for comparison', melt: null, boil: null, startT: 300, color: '#b45309', sp: 30 },
  water: { id: 'water', name: 'Water', dev: 'जल', iast: 'jala', formula: 'H₂O', massU: 18.015, massNote: 'one H₂O molecule, 18.015 u', melt: 273.15, boil: 373.15, startT: 300, color: '#38bdf8', sp: 30 },
  ice: { id: 'ice', name: 'Ice', dev: 'हिम', iast: 'hima', formula: 'H₂O', massU: 18.015, massNote: 'one H₂O molecule, 18.015 u', melt: 273.15, boil: 373.15, startT: 250, color: '#bae6fd', sp: 30 },
};

const phaseOf = (s: Substance, T: number): Phase => {
  if (s.melt === null || s.boil === null) return 'solid';
  if (T < s.melt) return 'solid';
  if (T < s.boil) return 'liquid';
  return 'gas';
};

const vrms = (T: number, massU: number) => Math.sqrt((3 * K_B * T) / (massU * AMU));
/** Temperature at which v_rms reaches v, from v_rms = √(3kT/m). */
const tempFor = (v: number, massU: number) => (v * v * massU * AMU) / (3 * K_B);

/** Approximate glow colour of a hot object (a common blackbody RGB fit). */
const glowRGB = (T: number): [number, number, number] => {
  const t = Math.max(T, 1000) / 100;
  const r = t <= 66 ? 255 : 329.7 * (t - 60) ** -0.1332;
  const g = t <= 66 ? 99.47 * Math.log(t) - 161.12 : 288.12 * (t - 60) ** -0.0755;
  const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.52 * Math.log(t - 10) - 305.04;
  const c = (n: number) => Math.round(Math.max(0, Math.min(255, n)));
  if (T < 1000) return [c(r * 0.85), c(g * 0.35), c(b * 0.2)];
  return [c(r), c(g), c(b)];
};
const glowAlpha = (T: number) => Math.max(0, Math.min(0.85, (T - 750) / 900));

interface Atom {
  el: El;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hx: number;
  hy: number;
  ang: number;
  mol: number; // product molecule id after burning (-1 before)
  tx: number;
  ty: number;
  hist: number[]; // recent positions for the thermal trail: x0,y0,x1,y1,…
}

const gauss = () => {
  const u = Math.random() || 1e-9;
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
};

const mk = (el: El, x: number, y: number): Atom => ({ el, x, y, vx: 0, vy: 0, hx: x, hy: y, ang: Math.random() * 6.28, mol: -1, tx: x, ty: y, hist: [] });

const buildAtoms = (sid: SubstanceId, o2: number): Atom[] => {
  if (sid === 'gold') {
    const out: Atom[] = [];
    const cols = 14;
    const rows = 8;
    const sp = SUBSTANCES.gold.sp;
    const x0 = W / 2 - ((cols - 1) * sp) / 2 - sp / 4;
    const y0 = BOX.y1 - 18 - (rows - 1) * sp * 0.9;
    for (let r = 0; r < rows; r += 1) for (let c = 0; c < cols; c += 1) out.push(mk('Au', x0 + c * sp + (r % 2 ? sp / 2 : 0), y0 + r * sp * 0.9));
    return out;
  }
  if (sid === 'water' || sid === 'ice') {
    const out: Atom[] = [];
    const cols = 11;
    const rows = 6;
    const sp = SUBSTANCES.water.sp;
    const x0 = W / 2 - ((cols - 1) * sp) / 2 - sp / 4;
    const y0 = BOX.y1 - 22 - (rows - 1) * sp * 0.9;
    for (let r = 0; r < rows; r += 1) for (let c = 0; c < cols; c += 1) {
      const a = mk('W', x0 + c * sp + (r % 2 ? sp / 2 : 0), y0 + r * sp * 0.9);
      a.ang = (r + c) % 2 ? 0.5 : -0.5;
      out.push(a);
    }
    return out;
  }
  // Wood: one simplified C₆H₁₀O₅ cellulose unit, plus O₂ from the air.
  const cx = 230;
  const cy = 230;
  const out: Atom[] = [];
  const ring: [El, number][] = [['C', 0], ['C', 1], ['C', 2], ['C', 3], ['C', 4], ['O', 5]];
  ring.forEach(([el, i]) => out.push(mk(el, cx + 38 * Math.cos((i * Math.PI) / 3), cy + 38 * Math.sin((i * Math.PI) / 3))));
  out.push(mk('C', cx + 70, cy - 52)); // C6
  out.push(mk('O', cx + 102, cy - 60)); // O6
  out.push(mk('O', cx - 72, cy + 28)); // O2
  out.push(mk('O', cx - 40, cy + 74)); // O3
  out.push(mk('O', cx - 74, cy - 36)); // O4 (link to the next unit)
  const hs: [number, number][] = [[54, 22], [8, 58], [-34, 46], [-56, 4], [6, -60], [86, -26], [58, -78], [124, -48], [-96, 34], [-34, 100]];
  hs.forEach(([dx, dy]) => out.push(mk('H', cx + dx, cy + dy)));
  for (let i = 0; i < o2; i += 1) {
    const x = 430 + (i % 3) * 52;
    const y = 90 + Math.floor(i / 3) * 52;
    out.push(mk('O', x - 7, y));
    out.push(mk('O', x + 7, y));
  }
  return out;
};

/** How many atoms each set-up starts with (the simulation never adds or removes any). */
const startCount = (sid: SubstanceId, o2: number) => (sid === 'gold' ? 14 * 8 : sid === 'wood' ? 21 + 2 * o2 : 11 * 6 * 3);
const atomCount = (list: Atom[]) => list.reduce((n, a) => n + (a.el === 'W' ? 3 : 1), 0);

const ATOM_STYLE: Record<El, { r: number; fill: string; stroke: string }> = {
  Au: { r: 9, fill: '#facc15', stroke: '#fef08a' },
  C: { r: 8, fill: '#9ca3af', stroke: '#e5e7eb' },
  H: { r: 5, fill: '#f8fafc', stroke: '#94a3b8' },
  O: { r: 7.5, fill: '#ef4444', stroke: '#fca5a5' },
  W: { r: 7, fill: '#ef4444', stroke: '#fca5a5' },
};

/** Trail colour by on-screen speed: slow = blue, fast = red. */
const speedHue = (sp: number) => 230 - 230 * Math.max(0, Math.min(1, sp / 320));

const TERMS: LabTerm[] = [
  { dev: 'असत्', iast: 'asat', en: 'non-being, the unreal', note: 'BU 1.3.28 glosses it as death (mṛtyu)' },
  { dev: 'सत्', iast: 'sat', en: 'being, the real', note: 'BU 1.3.28 glosses it as immortality (amṛta)' },
  { dev: 'तमस्', iast: 'tamas', en: 'darkness' },
  { dev: 'ज्योतिस्', iast: 'jyotis', en: 'light' },
  { dev: 'मृत्यु', iast: 'mṛtyu', en: 'death' },
  { dev: 'अमृत', iast: 'amṛta', en: 'immortality, the deathless' },
  { dev: 'नामरूप', iast: 'nāma-rūpa', en: 'name and form' },
  { dev: 'माया', iast: 'māyā', en: 'appearance, power of appearing', note: 'developed in later Vedānta' },
  { dev: 'अविद्या', iast: 'avidyā', en: 'not-knowing, ignorance', note: 'developed in later Vedānta' },
  { dev: 'ताप', iast: 'tāpa', en: 'heat, temperature' },
  { dev: 'वर्ण', iast: 'varṇa', en: 'colour' },
  { dev: 'घन', iast: 'ghana', en: 'solid, dense' },
  { dev: 'द्रव', iast: 'drava', en: 'liquid, flowing' },
  { dev: 'वाष्प', iast: 'vāṣpa', en: 'vapour, steam' },
  { dev: 'अग्नि', iast: 'agni', en: 'fire' },
];


const loadLevels = (): Levels => {
  try {
    const j = JSON.parse(window.localStorage.getItem(LEVEL_KEY) || '{}');
    return { l1: !!j.l1, l2: !!j.l2, l3: !!j.l3 };
  } catch {
    return { l1: false, l2: false, l3: false };
  }
};

const AsatoMa: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countHudRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLElement>(null);
  const [lang, setLang] = useState<LangMode>('both');
  const [sid, setSid] = useState<SubstanceId>('ice');
  const [view, setView] = useState<'asat' | 'sat'>('asat');
  const [T, setT] = useState(250);
  const [coef, setCoef] = useState({ o2: 1, co2: 1, h2o: 1 });
  const [burned, setBurned] = useState(false);
  const [done, setDone] = useState({ s1: false, s2: false, s3: false });
  const [trails, setTrails] = useState(true);
  const [arrows, setArrows] = useState(false);
  const [levels, setLevels] = useState<Levels>(loadLevels);
  const [lvl, setLvl] = useState<LevelNo>(() => {
    const l = loadLevels();
    return !l.l1 ? 1 : !l.l2 ? 2 : 3;
  });
  const atoms = useRef<Atom[]>(buildAtoms('ice', 0));
  const burnT = useRef(-1);
  const scan = useRef<{ dir: 1 | -1; t: number } | null>(null);
  const glitch = useRef(0);
  const fx = useRef({ frame: 0, ema: 16, low: false, lastPhase: 'solid' as Phase, gasV: 0 });
  const live = useRef({ sid, view, T, burned, trails, arrows });
  useEffect(() => {
    live.current = { sid, view, T, burned, trails, arrows };
  }, [sid, view, T, burned, trails, arrows]);

  const sub = SUBSTANCES[sid];
  const phase: Phase = sid === 'wood' ? (burned ? 'gas' : 'solid') : phaseOf(sub, T);
  const glowing = sid !== 'wood' && phase !== 'gas' && T >= GLOW_K;
  const allDone = done.s1 && done.s2 && done.s3;
  const lv: Levels = { ...levels, l3: levels.l3 || allDone };
  const levelCount = Number(lv.l1) + Number(lv.l2) + Number(lv.l3);

  useEffect(() => {
    try {
      window.localStorage.setItem(LEVEL_KEY, JSON.stringify({ l1: lv.l1, l2: lv.l2, l3: lv.l3 }));
    } catch {
      /* private mode: progress just won't persist */
    }
  }, [lv.l1, lv.l2, lv.l3]);

  const L = useCallback(
    (sk: string, modern: string, dev?: string) =>
      lang === 'modern' ? modern : lang === 'sanskrit' ? (dev ? `${dev} ${sk}` : sk) : `${dev ? `${dev} ` : ''}${sk} · ${modern}`,
    [lang],
  );

  const checkLevels = (id: SubstanceId, temp: number) => {
    const s = SUBSTANCES[id];
    if (id === 'gold' && temp < COLD_K) setLevels((l) => (l.l1 ? l : { ...l, l1: true }));
    if ((id === 'water' || id === 'ice') && phaseOf(s, temp) === 'gas' && vrms(temp, s.massU) > FAST_MS) setLevels((l) => (l.l2 ? l : { ...l, l2: true }));
  };

  const changeT = (next: number) => {
    setT(next);
    const glowsNow = sid !== 'wood' && phaseOf(SUBSTANCES[sid], next) !== 'gas' && next >= GLOW_K;
    if (glowsNow) setDone((d) => (d.s2 ? d : { ...d, s2: true }));
    checkLevels(sid, next);
  };

  const startScan = (dir: 1 | -1) => {
    if (prefersReducedMotion()) {
      scan.current = null;
      glitch.current = 0;
      return;
    }
    // Reversing mid-scan continues from where the line is.
    const cur = scan.current;
    const t = cur && cur.dir !== dir ? Math.max(0, SCAN_S - cur.t) : 0;
    scan.current = { dir, t };
    glitch.current = 0;
  };
  const showSat = () => {
    if (view !== 'sat') startScan(1);
    setView('sat');
    setDone((d) => (d.s1 ? d : { ...d, s1: true }));
  };
  const showAsat = () => {
    if (view !== 'asat') startScan(-1);
    setView('asat');
  };
  const toggleScanner = () => (view === 'sat' ? showAsat() : showSat());

  const pickSubstance = (id: SubstanceId) => {
    setSid(id);
    setT(SUBSTANCES[id].startT);
    setBurned(false);
    burnT.current = -1;
    setCoef({ o2: 1, co2: 1, h2o: 1 });
    atoms.current = buildAtoms(id, id === 'wood' ? 1 : 0);
    fx.current.lastPhase = 'solid';
  };

  const setO2 = (n: number) => {
    setCoef((c) => ({ ...c, o2: n }));
    if (sid === 'wood' && !burned) atoms.current = buildAtoms('wood', n);
  };

  const left = { C: 6, H: 10, O: 5 + 2 * coef.o2 };
  const right = { C: coef.co2, H: 2 * coef.h2o, O: 2 * coef.co2 + coef.h2o };
  const balanced = left.C === right.C && left.H === right.H && left.O === right.O;

  const burn = () => {
    if (!balanced || burned) return;
    // Assign every existing atom a seat in a product molecule: nothing added, nothing lost.
    const list = atoms.current;
    const cs = list.filter((a) => a.el === 'C');
    const hs = list.filter((a) => a.el === 'H');
    const os = list.filter((a) => a.el === 'O');
    let mol = 0;
    for (let i = 0; i < coef.co2; i += 1, mol += 1) {
      const x = 120 + (i % 6) * 80;
      const y = 90;
      const c = cs[i];
      const o1 = os.shift()!;
      const o2 = os.shift()!;
      [[c, 0], [o1, -15], [o2, 15]].forEach(([a, dx]) => {
        const at = a as Atom;
        at.mol = mol;
        at.tx = x + (dx as number);
        at.ty = y;
      });
    }
    for (let j = 0; j < coef.h2o; j += 1, mol += 1) {
      const x = 150 + j * 85;
      const y = 170;
      const o = os.shift()!;
      const h1 = hs[2 * j];
      const h2 = hs[2 * j + 1];
      [[o, 0, 0], [h1, -10, 8], [h2, 10, 8]].forEach(([a, dx, dy]) => {
        const at = a as Atom;
        at.mol = mol;
        at.tx = x + (dx as number);
        at.ty = y + (dy as number);
      });
    }
    list.forEach((a) => {
      a.vx = 0;
      a.vy = 0;
    });
    burnT.current = 0;
    setBurned(true);
    if (T < 900) setT(900);
    setDone((d) => ({ ...d, s3: true }));
  };

  const setupLevel = (n: LevelNo) => {
    setLvl(n);
    if (n === 1) {
      pickSubstance('gold');
      showSat();
    } else if (n === 2) {
      pickSubstance('water');
      showSat();
    } else {
      pickSubstance('gold');
      showAsat();
    }
  };
  const resetProgress = () => {
    setLevels({ l1: false, l2: false, l3: false });
    setDone({ s1: false, s2: false, s3: false });
    setLvl(1);
  };

  // ---------------------------------------------------------------------------
  // Particle engine (runs every frame, whichever view is showing)
  // ---------------------------------------------------------------------------
  const step = (dt: number) => {
    const { sid: s, T: temp, burned: b } = live.current;
    const S = SUBSTANCES[s];
    const ph: Phase = s === 'wood' ? (b ? 'gas' : 'solid') : phaseOf(S, temp);
    const list = atoms.current;
    const st = fx.current;
    const vPhys = vrms(temp, S.massU);
    if (s === 'wood') {
      if (b && burnT.current >= 0) {
        burnT.current += dt;
        const t = burnT.current;
        if (t < 1.8) {
          list.forEach((a) => {
            const nx = a.x + (a.tx - a.x) * Math.min(1, dt * 3);
            const ny = a.y + (a.ty - a.y) * Math.min(1, dt * 3);
            a.vx = (nx - a.x) / Math.max(dt, 1e-3);
            a.vy = (ny - a.y) / Math.max(dt, 1e-3);
            a.x = nx;
            a.y = ny;
          });
        } else {
          const byMol = new Map<number, Atom[]>();
          list.forEach((a) => byMol.set(a.mol, [...(byMol.get(a.mol) || []), a]));
          byMol.forEach((arr, m) => {
            if (t - dt < 1.8 || arr[0].vx === 0) {
              const seed = Math.sin(m * 12.9898) * 43758.5453;
              const ang = (seed - Math.floor(seed)) * 2 * Math.PI;
              const sp = 70 + 50 * Math.abs(Math.sin(m * 3.1));
              arr.forEach((a) => {
                a.vx = Math.cos(ang) * sp;
                a.vy = Math.sin(ang) * sp;
              });
            }
            arr.forEach((a) => {
              a.x += a.vx * dt;
              a.y += a.vy * dt;
            });
            const minX = Math.min(...arr.map((a) => a.x));
            const maxX = Math.max(...arr.map((a) => a.x));
            const minY = Math.min(...arr.map((a) => a.y));
            const maxY = Math.max(...arr.map((a) => a.y));
            if (minX < BOX.x0 + 8 || maxX > BOX.x1 - 8) arr.forEach((a) => { a.vx = (minX < BOX.x0 + 8 ? 1 : -1) * Math.abs(a.vx); });
            if (minY < BOX.y0 + 8 || maxY > BOX.y1 - 8) arr.forEach((a) => { a.vy = (minY < BOX.y0 + 8 ? 1 : -1) * Math.abs(a.vy); });
          });
        }
      } else {
        // Unburnt wood: atoms vibrate about their places; air molecules drift.
        const A = Math.min(3, 1.2 * Math.sqrt(temp / 600));
        const om = 26;
        const ga = 6;
        const sig = A * om * Math.sqrt(2 * ga);
        list.forEach((a, i) => {
          if (i >= 21) {
            const now = performance.now();
            a.hx += Math.sin(now / 700 + i) * 0.2;
            a.hy += Math.cos(now / 900 + i) * 0.15;
          }
          a.vx += (-om * om * (a.x - a.hx) - ga * a.vx) * dt + sig * Math.sqrt(dt) * gauss();
          a.vy += (-om * om * (a.y - a.hy) - ga * a.vy) * dt + sig * Math.sqrt(dt) * gauss();
          a.x += a.vx * dt;
          a.y += a.vy * dt;
        });
      }
    } else if (ph === 'solid') {
      // Each atom jiggles about its lattice site (an Ornstein–Uhlenbeck oscillator).
      // The jiggle amplitude grows with √T, about a tenth of the spacing near melting.
      const A = 0.16 * S.sp * Math.sqrt(temp / (S.melt || 600));
      const om = 30;
      const ga = 6;
      const sig = A * om * Math.sqrt(2 * ga);
      list.forEach((a) => {
        a.vx += (-om * om * (a.x - a.hx) - ga * a.vx) * dt + sig * Math.sqrt(dt) * gauss();
        a.vy += (-om * om * (a.y - a.hy) - ga * a.vy) * dt + sig * Math.sqrt(dt) * gauss();
        const cap = 600;
        a.vx = Math.max(-cap, Math.min(cap, a.vx));
        a.vy = Math.max(-cap, Math.min(cap, a.vy));
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        if (a.el === 'W') a.ang += gauss() * 0.02 * Math.sqrt(temp / 273);
      });
    } else if (ph === 'liquid') {
      // Bonds break and re-form: atoms slide past each other but stay together in a pool.
      const ratio = temp / (S.melt || 600);
      const kick = 40 + 70 * Math.min(1.5, Math.sqrt(Math.max(0, ratio - 1)) * 1.5);
      const rr = S.sp * 0.82;
      for (let i = 0; i < list.length; i += 1) {
        const a = list[i];
        let fxv = gauss() * kick;
        let fyv = gauss() * kick + 260;
        for (let j = 0; j < list.length; j += 1) {
          if (i === j) continue;
          const dx = a.x - list[j].x;
          const dy = a.y - list[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < rr * rr && d2 > 0.01) {
            const d = Math.sqrt(d2);
            fxv += (dx / d) * (rr - d) * 60;
            fyv += (dy / d) * (rr - d) * 60;
          }
        }
        a.vx = (a.vx + fxv * dt) * 0.9;
        a.vy = (a.vy + fyv * dt) * 0.9;
      }
      list.forEach((a) => {
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.ang += gauss() * 0.1;
      });
    } else {
      // Gas: free flight with Maxwell-like speeds (Gaussian velocity components), re-drawn now and then.
      const vd = Math.max(25, Math.min(420, vPhys * 0.15)); // on-screen rms speed
      const sComp = vd / Math.SQRT2;
      if (st.lastPhase !== 'gas') {
        list.forEach((a) => {
          a.vx = gauss() * sComp;
          a.vy = gauss() * sComp;
        });
      } else if (st.gasV > 0 && Math.abs(st.gasV - vd) > 0.5) {
        const k = vd / st.gasV;
        list.forEach((a) => {
          a.vx *= k;
          a.vy *= k;
        });
      }
      st.gasV = vd;
      list.forEach((a) => {
        if (Math.random() < 0.5 * dt) {
          a.vx = gauss() * sComp;
          a.vy = gauss() * sComp;
        }
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.ang += 0.08;
      });
    }
    if (ph !== 'gas') st.gasV = 0;
    st.lastPhase = ph;
    // Walls of the sealed chamber
    if (!(s === 'wood' && b)) {
      list.forEach((a) => {
        if (a.x < BOX.x0 + 10) { a.x = BOX.x0 + 10; a.vx = Math.abs(a.vx); }
        if (a.x > BOX.x1 - 10) { a.x = BOX.x1 - 10; a.vx = -Math.abs(a.vx); }
        if (a.y < BOX.y0 + 10) { a.y = BOX.y0 + 10; a.vy = Math.abs(a.vy); }
        if (a.y > BOX.y1 - 10) { a.y = BOX.y1 - 10; a.vy = -Math.abs(a.vy); }
      });
    }
    // Trails
    const maxLen = (st.low || isSmallScreen() ? 5 : 10) * 2;
    list.forEach((a) => {
      a.hist.push(a.x, a.y);
      while (a.hist.length > maxLen) a.hist.splice(0, 2);
    });
    return ph;
  };

  const drawShell = (ctx: CanvasRenderingContext2D, s: SubstanceId, ph: Phase, temp: number, b: boolean) => {
    const S = SUBSTANCES[s];
    const glow = s !== 'wood' && ph !== 'gas' && temp >= GLOW_K;
    const [gr, gg, gb] = glowRGB(temp);
    const ga = glowAlpha(temp);
    const cx = W / 2;
    // floor
    ctx.fillStyle = 'rgba(148,163,184,0.10)';
    ctx.fillRect(BOX.x0, BOX.y1 - 30, BOX.x1 - BOX.x0, 30);
    ctx.save();
    if (glow) {
      ctx.shadowColor = `rgba(${gr},${gg},${gb},${ga})`;
      ctx.shadowBlur = 40;
    }
    if (s === 'wood') {
      if (!b) {
        ctx.fillStyle = '#92400e';
        ctx.beginPath();
        ctx.roundRect(cx - 170, 240, 300, 90, 40);
        ctx.fill();
        ctx.fillStyle = '#d6a36a';
        ctx.beginPath();
        ctx.ellipse(cx + 130, 285, 34, 45, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#92400e';
        for (let r = 10; r < 40; r += 10) {
          ctx.beginPath();
          ctx.ellipse(cx + 130, 285, r * 0.75, r, 0, 0, 2 * Math.PI);
          ctx.stroke();
        }
        if (temp >= IGNITE_K) {
          ctx.fillStyle = 'rgba(249,115,22,0.7)';
          for (let k = 0; k < 6; k += 1) {
            ctx.beginPath();
            ctx.ellipse(cx - 140 + k * 50, 225 - Math.random() * 8, 14, 26, 0, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      } else {
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.ellipse(cx, 352, 60, 10, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '600 13px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('The log seems to have vanished… scan with Viveka to see where the atoms went.', cx, 200);
      }
    } else if (ph === 'solid') {
      const grd = ctx.createLinearGradient(0, 190, 0, 350);
      grd.addColorStop(0, s === 'gold' ? '#fef3c7' : '#f0f9ff');
      grd.addColorStop(1, S.color);
      ctx.fillStyle = grd;
      ctx.beginPath();
      if (s === 'gold') {
        ctx.moveTo(cx - 140, 346);
        ctx.lineTo(cx - 95, 226);
        ctx.lineTo(cx + 95, 226);
        ctx.lineTo(cx + 140, 346);
        ctx.closePath();
      } else {
        ctx.roundRect(cx - 95, 196, 190, 150, 20);
      }
      ctx.fill();
    } else if (ph === 'liquid') {
      ctx.fillStyle = s === 'gold' ? '#f59e0b' : 'rgba(56,189,248,0.8)';
      ctx.beginPath();
      ctx.ellipse(cx, 348, 230, 24, 0, 0, 2 * Math.PI);
      ctx.fill();
    } else {
      for (let k = 0; k < 7; k += 1) {
        ctx.fillStyle = s === 'gold' ? 'rgba(234,179,8,0.16)' : 'rgba(203,213,225,0.16)';
        ctx.beginPath();
        ctx.ellipse(cx - 180 + k * 60, 170 + Math.sin(k + performance.now() / 900) * 20, 70, 44, 0, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    if (glow) {
      // Tint only the shape just drawn (its path is still current).
      ctx.fillStyle = `rgba(${gr},${gg},${gb},${ga})`;
      ctx.fill();
    }
    ctx.restore();
  };

  const drawAtoms = (ctx: CanvasRenderingContext2D, s: SubstanceId, ph: Phase, temp: number, b: boolean, showTrails: boolean, showArrows: boolean) => {
    const S = SUBSTANCES[s];
    const list = atoms.current;
    const glow = s !== 'wood' && ph !== 'gas' && temp >= GLOW_K;
    const [gr, gg, gb] = glowRGB(temp);
    const ga = glowAlpha(temp);
    const low = fx.current.low;
    // Thermal trails
    if (showTrails) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      list.forEach((a) => {
        const hst = a.hist;
        if (hst.length < 4) return;
        const hue = speedHue(Math.hypot(a.vx, a.vy));
        ctx.beginPath();
        ctx.moveTo(hst[0], hst[1]);
        for (let k = 2; k < hst.length; k += 2) ctx.lineTo(hst[k], hst[k + 1]);
        if (!low) {
          ctx.strokeStyle = `hsla(${hue},95%,60%,0.22)`;
          ctx.lineWidth = 7;
          ctx.stroke();
        }
        ctx.strokeStyle = `hsla(${hue},95%,65%,0.75)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      ctx.restore();
    }
    // Bonds: a fixed lattice in a solid; short-lived bonds that break and re-form in a liquid.
    ctx.strokeStyle = 'rgba(148,163,184,0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (s === 'wood') {
      for (let i = 0; i < list.length; i += 1) {
        for (let j = i + 1; j < list.length; j += 1) {
          const a = list[i];
          const c = list[j];
          const sameUnit = b ? a.mol === c.mol && a.mol >= 0 : (i < 21 && j < 21) || (i >= 21 && j === i + 1 && (i - 21) % 2 === 0);
          if (sameUnit && Math.hypot(a.x - c.x, a.y - c.y) < (b ? 20 : 46)) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
          }
        }
      }
    } else if (ph !== 'gas') {
      const lim = (ph === 'solid' ? 1.15 : 0.92) * S.sp;
      const lim2 = lim * lim;
      for (let i = 0; i < list.length; i += 1) {
        for (let j = i + 1; j < list.length; j += 1) {
          const dx = list[i].x - list[j].x;
          const dy = list[i].y - list[j].y;
          if (dx * dx + dy * dy < lim2) {
            ctx.moveTo(list[i].x, list[i].y);
            ctx.lineTo(list[j].x, list[j].y);
          }
        }
      }
    }
    ctx.stroke();
    // Atoms
    list.forEach((a) => {
      if (a.el === 'W') {
        const hx = Math.cos(a.ang);
        const hy = Math.sin(a.ang);
        [[-0.9, 0.6], [0.9, 0.6]].forEach(([u, w]) => {
          const x = a.x + (u * hx - w * hy) * 8;
          const y = a.y + (u * hy + w * hx) * 8;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fillStyle = '#f8fafc';
          ctx.fill();
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }
      const st = ATOM_STYLE[a.el];
      ctx.beginPath();
      ctx.arc(a.x, a.y, st.r, 0, 2 * Math.PI);
      ctx.fillStyle = st.fill;
      ctx.fill();
      ctx.strokeStyle = st.stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
      if (glow) {
        ctx.beginPath();
        ctx.arc(a.x, a.y, st.r + 3, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${gr},${gg},${gb},${ga * 0.6})`;
        ctx.fill();
      }
    });
    // Velocity arrows
    if (showArrows) {
      ctx.strokeStyle = 'rgba(224,242,254,0.9)';
      ctx.fillStyle = 'rgba(224,242,254,0.9)';
      ctx.lineWidth = 1.4;
      list.forEach((a) => {
        const sp = Math.hypot(a.vx, a.vy);
        if (sp < 2) return;
        const len = Math.min(38, sp * 0.12);
        const ux = a.vx / sp;
        const uy = a.vy / sp;
        const ex = a.x + ux * len;
        const ey = a.y + uy * len;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex - ux * 5 - uy * 3, ey - uy * 5 + ux * 3);
        ctx.lineTo(ex - ux * 5 + uy * 3, ey - uy * 5 - ux * 3);
        ctx.closePath();
        ctx.fill();
      });
    }
  };

  const paint = (dt: number) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const small = isSmallScreen();
    const dpr = Math.min(small ? 1.5 : 2, window.devicePixelRatio || 1);
    if (cv.width !== Math.round(W * dpr)) {
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const st = fx.current;
    st.frame += 1;
    st.ema = st.ema * 0.95 + dt * 1000 * 0.05;
    if (st.frame > 120) st.low = st.ema > 28;
    const step1 = Math.min(0.033, dt);
    const { sid: s, view: v, T: temp, burned: b, trails: tr, arrows: ar } = live.current;
    const ph = step(step1);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, W, H);
    // Sealed chamber walls
    ctx.strokeStyle = 'rgba(34,211,238,0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(BOX.x0, BOX.y0, BOX.x1 - BOX.x0, BOX.y1 - BOX.y0, 10);
    ctx.stroke();

    let lineX: number | null = null;
    const sc = scan.current;
    if (sc) {
      sc.t += step1;
      const p = Math.min(1, sc.t / SCAN_S);
      const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
      lineX = sc.dir === 1 ? e * W : (1 - e) * W;
      if (p >= 1) {
        scan.current = null;
        if (sc.dir === 1) glitch.current = GLITCH_S;
        lineX = null;
      }
    }
    const drawSat = v === 'sat' || lineX !== null;
    const drawAsat = v === 'asat' || lineX !== null;
    if (drawSat) drawAtoms(ctx, s, ph, temp, b, tr, ar);
    if (drawAsat) {
      ctx.save();
      if (lineX !== null) {
        ctx.beginPath();
        ctx.rect(lineX, 0, W - lineX, H);
        ctx.clip();
        ctx.fillStyle = '#030712';
        ctx.fillRect(lineX, 0, W - lineX, H);
        ctx.strokeStyle = 'rgba(34,211,238,0.45)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(BOX.x0, BOX.y0, BOX.x1 - BOX.x0, BOX.y1 - BOX.y0, 10);
        ctx.stroke();
      }
      drawShell(ctx, s, ph, temp, b);
      ctx.restore();
    }
    if (lineX !== null) {
      // Dissolving shell fragments around the scan line
      const col = SUBSTANCES[s].color;
      ctx.fillStyle = col;
      for (let k = 0; k < 40; k += 1) {
        const d = Math.random() ** 2 * 60;
        const x = lineX - d;
        const y = BOX.y0 + Math.random() * (BOX.y1 - BOX.y0);
        ctx.globalAlpha = 0.6 * (1 - d / 60);
        ctx.fillRect(x, y, 2 + Math.random() * 4, 2 + Math.random() * 4);
      }
      ctx.globalAlpha = 1;
      const grd = ctx.createLinearGradient(lineX - 30, 0, lineX + 30, 0);
      grd.addColorStop(0, 'rgba(34,211,238,0)');
      grd.addColorStop(0.5, 'rgba(34,211,238,0.45)');
      grd.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(lineX - 30, 0, 60, H);
      ctx.fillStyle = '#cffafe';
      ctx.fillRect(lineX - 1, 0, 2, H);
      ctx.font = '700 12px "JetBrains Mono", ui-monospace, monospace';
      ctx.textAlign = lineX > W / 2 ? 'right' : 'left';
      ctx.fillText('विवेक · VIVEKA SCAN', lineX + (lineX > W / 2 ? -8 : 8), H / 2);
    }
    if (glitch.current > 0) {
      glitch.current -= step1;
      const k = Math.max(0, glitch.current / GLITCH_S);
      for (let i = 0; i < 7; i += 1) {
        const y = Math.random() * H;
        const h = 3 + Math.random() * 16;
        const off = (Math.random() - 0.5) * 30 * k;
        ctx.drawImage(cv, 0, y * dpr, W * dpr, h * dpr, off, y, W, h);
      }
      ctx.fillStyle = `rgba(34,211,238,${0.14 * k})`;
      ctx.fillRect(0, 0, W, H);
    }
    // Live atom-count meter (read straight from the simulation, every few frames)
    if (st.frame % 10 === 0) {
      const n = atomCount(atoms.current);
      const txt = `${n} atoms`;
      if (countHudRef.current && countHudRef.current.textContent !== `N ${txt}`) countHudRef.current.textContent = `N ${txt}`;
      if (countRef.current && countRef.current.textContent !== txt) countRef.current.textContent = txt;
    }
  };
  const paintRef = useRef(paint);
  useEffect(() => {
    paintRef.current = paint;
  });

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      paintRef.current((now - last) / 1000);
      last = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Re-seat the solid lattice when we cool back into a solid.
  const prevPhase = useRef<Phase>(phase);
  useEffect(() => {
    if (prevPhase.current !== phase && phase === 'solid' && sid !== 'wood') {
      const fresh = buildAtoms(sid, 0);
      atoms.current.forEach((a, i) => {
        if (fresh[i]) {
          a.hx = fresh[i].hx;
          a.hy = fresh[i].hy;
        }
      });
    }
    prevPhase.current = phase;
  }, [phase, sid]);

  const stateLabel: Record<Phase, string> = {
    solid: L('Ghana', 'Solid', 'घन'),
    liquid: L('Drava', 'Liquid', 'द्रव'),
    gas: L('Vāṣpa', 'Gas', 'वाष्प'),
  };
  const burnedWood = sid === 'wood' && burned;
  const v = vrms(T, burnedWood ? 44.01 : sub.massU);
  const tStr = T < 10 ? T.toFixed(1) : String(Math.round(T));
  const crystal =
    sid === 'wood' || phase !== 'solid'
      ? null
      : T / (sub.melt || 1) < 0.01
        ? 'calm, near-perfect'
        : T / (sub.melt || 1) < 0.6
          ? 'gently vibrating'
          : 'vibrating hard, close to melting';

  const steps = [
    { key: 's1', dev: 'असतो मा सद्गमय', iast: 'asato mā sad gamaya', modern: 'Scan with Viveka to the atom view', ok: done.s1 },
    { key: 's2', dev: 'तमसो मा ज्योतिर्गमय', iast: 'tamaso mā jyotir gamaya', modern: 'Heat gold until it glows', ok: done.s2 },
    { key: 's3', dev: 'मृत्योर्माऽमृतं गमय', iast: 'mṛtyor mā’mṛtaṃ gamaya', modern: 'Burn the log and count the atoms', ok: done.s3 },
  ];

  let woodState = '';
  if (sid === 'wood') {
    woodState = burned
      ? 'Burned: the atoms now form CO₂ and H₂O gases.'
      : T >= IGNITE_K
        ? 'Hot enough to start burning in air (roughly 250–300 °C, depending on the wood). Wood does not melt.'
        : 'Solid. Wood does not melt; heated in air it burns.';
  }

  const waterT1000 = tempFor(FAST_MS, SUBSTANCES.water.massU);
  const goldT1000 = tempFor(FAST_MS, SUBSTANCES.gold.massU);

  const LEVELS: { n: LevelNo; icon: string; title: string; dev: string; done: boolean }[] = [
    { n: 1, icon: '🔨', title: 'The Forge of Kaṇāda', dev: 'काणाद', done: lv.l1 },
    { n: 2, icon: '🌀', title: 'The Āruṇi Singularity', dev: 'आरुणि', done: lv.l2 },
    { n: 3, icon: '🕯️', title: 'Asato mā', dev: 'असतो मा', done: lv.l3 },
  ];

  return (
    <div className="vl-sim">
      <CoreIdea>
        A famous prayer from the <em>Bṛhadāraṇyaka Upaniṣad</em> (1.3.28) asks to be led from asat to sat, from darkness
        to light, from death to immortality. In this game, the <strong>Viveka Scanner</strong> (viveka: discernment) is a
        playful way to move from the everyday look of a thing to what stays the same underneath, while you change its name
        and form by cooling, heating and burning. (The Upaniṣad’s own explanation of the words is in the panel below.)
      </CoreIdea>

      <div className="vl-quest-head">
        <h3 className="vl-quest-title">🕯️ {L('Asato mā', 'Lead me from the unreal to the real', 'असतो मा')}</h3>
        <div className="vl-btn-row" role="radiogroup" aria-label="Language toggle">
          <span className="vl-small">Labels:</span>
          {(['both', 'sanskrit', 'modern'] as LangMode[]).map((m) => (
            <button key={m} type="button" role="radio" aria-checked={lang === m} className={`vl-chip${lang === m ? ' is-on' : ''}`} onClick={() => setLang(m)} data-testid={`asato-lang-${m}`}>
              {m === 'both' ? 'Both' : m === 'sanskrit' ? 'Sanskrit' : 'Modern'}
            </button>
          ))}
        </div>
      </div>

      <div className="vl-sandbox" data-testid="asato-sandbox">
        <section className="vl-levels" aria-label="Levels">
          <div className="vl-btn-row" style={{ justifyContent: 'space-between' }}>
            <b style={{ color: '#f1f5f9' }}>🏆 Levels · {levelCount} / 3</b>
            <button type="button" className="vl-btn vl-btn--ghost" onClick={resetProgress} data-testid="asato-reset-levels">Reset progress</button>
          </div>
          <div className="vl-level-bar" role="progressbar" aria-label="Level progress" aria-valuemin={0} aria-valuemax={3} aria-valuenow={levelCount} data-testid="asato-levels-progress">
            <span style={{ width: `${(levelCount / 3) * 100}%` }} />
          </div>
          <div className="vl-badges" role="tablist" aria-label="Choose a level">
            {LEVELS.map((l) => (
              <button
                key={l.n}
                type="button"
                role="tab"
                aria-selected={lvl === l.n}
                className={`vl-badge${lvl === l.n ? ' is-sel' : ''}${l.done ? ' is-done' : ''}`}
                onClick={() => setLvl(l.n)}
                data-testid={`asato-level-${l.n}`}
                data-done={l.done ? 'true' : 'false'}
                title={l.n === 2 ? 'A game name, not a black hole' : undefined}
              >
                <span className="vl-badge-icon" aria-hidden="true">{l.icon}</span>
                <span>
                  <b>Level {l.n}{l.done ? ' ✓' : ''}</b>
                  {l.title} · <span lang="sa">{l.dev}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="vl-level-card" role="tabpanel" data-testid="asato-level-card">
            {lvl === 1 && (
              <>
                <h4>🔨 Level 1 · The Forge of Kaṇāda · <span lang="sa">काणाद</span> {lv.l1 && '✓'}</h4>
                <p>Cool gold below {COLD_K} K and watch its atoms settle into a calm, near-perfect crystal. The jiggle on each lattice site grows with √T, so near absolute zero it almost stops.</p>
                <p className="vl-small">
                  Kaṇāda, to whom the Vaiśeṣika Sūtra is attributed, pictured matter as tiny paramāṇus; the level name is just for
                  the game. ❄️ Friendly fact: you can get very close to absolute zero (0 K), but never quite reach it, and even
                  then quantum physics says atoms keep a tiny jiggle.
                </p>
              </>
            )}
            {lvl === 2 && (
              <>
                <h4>
                  🌀 Level 2 · The Āruṇi <span className="vl-tip" title="A game name, not a black hole">Singularity</span> {lv.l2 && '✓'}{' '}
                  <span className="vl-sealed">🔒 sealed chamber</span>
                </h4>
                <p>In the sealed chamber, heat water until the bonds holding the molecules together break (steam), then keep going until v<sub>rms</sub> tops {FAST_MS} m/s. Watch the atom meter: the count never changes, so the mass inside stays the same.</p>
                <p className="vl-small">
                  “Singularity” is a game name, not a black hole. Why water? From v<sub>rms</sub> = √(3kT/m), light H₂O molecules
                  (18.015 u) reach {FAST_MS} m/s at about {Math.round(waterT1000)} K. Heavy gold atoms (196.97 u) would need about{' '}
                  {(Math.round(goldT1000 / 100) * 100).toLocaleString('en-IN')} K, far hotter than this chamber goes. (Melting and boiling points here are
                  at normal air pressure; a real sealed chamber would build up pressure.) Named for Uddālaka Āruṇi, who taught that
                  being does not come from non-being.
                </p>
              </>
            )}
            {lvl === 3 && (
              <>
                <h4>🕯️ Level 3 · Asato mā · the three lines {lv.l3 && '✓'}</h4>
                <ol className="vl-steps vl-steps--3" data-testid="asato-steps">
                  {steps.map((s, i) => (
                    <li key={s.key} className={s.ok ? 'is-done' : ''}>
                      <span className="vl-step-n">{s.ok ? '✓' : i + 1}</span>{' '}
                      {lang === 'modern' ? s.modern : lang === 'sanskrit' ? <span lang="sa">{s.dev} · {s.iast}</span> : <><span lang="sa">{s.dev}</span> · {s.modern}</>}
                    </li>
                  ))}
                </ol>
              </>
            )}
            <div className="vl-btn-row" style={{ marginTop: '0.5rem' }}>
              <LedButton kind="action" color="#facc15" onClick={() => setupLevel(lvl)} testId="asato-setup">
                ▶ Set up Level {lvl}
              </LedButton>
            </div>
          </div>
        </section>

        <div className="vl-orbit-grid">
          <div className="vl-stage-wrap">
            <HudFrame
              accent={view === 'sat' ? '#22d3ee' : '#facc15'}
              tl={<>T {tStr} K</>}
              tr={<>{view === 'sat' ? L('SAT', 'ATOM VIEW') : L('ASAT', 'EVERYDAY')}</>}
              bl={<>v<sub>rms</sub> {Math.round(v)} m/s · {stateLabel[sid === 'wood' && !burned ? 'solid' : phase]}</>}
              br={<span ref={countHudRef}>N {startCount(sid, coef.o2)} atoms</span>}
            >
              <canvas ref={canvasRef} className="vl-stage vl-stage--asato" width={W} height={H} data-testid="asato-canvas" data-view={view} role="img" aria-label={`Sealed chamber, ${view === 'sat' ? 'atom view' : 'everyday view'}`} />
            </HudFrame>
            <p className="vl-hud-caption">
              {sid === 'wood'
                ? burned
                  ? 'Products: CO₂ and H₂O molecules (gases).'
                  : 'One simplified C₆H₁₀O₅ unit of cellulose, with O₂ from the air (top right).'
                : 'Each dot is an atom or molecule. Screen speeds are scaled down. Trail colour: slow (blue) → fast (red).'}
            </p>
          </div>
          <div className="vl-controls">
            <div className="vl-leds" role="radiogroup" aria-label="Substance">
              {(Object.keys(SUBSTANCES) as SubstanceId[]).map((id) => (
                <LedButton key={id} kind="radio" on={sid === id} color={SUBSTANCES[id].color} onClick={() => pickSubstance(id)} testId={`asato-sub-${id}`}>
                  {lang === 'modern' ? SUBSTANCES[id].name : lang === 'sanskrit' ? `${SUBSTANCES[id].dev} ${SUBSTANCES[id].iast}` : `${SUBSTANCES[id].dev} · ${SUBSTANCES[id].name}`}
                </LedButton>
              ))}
            </div>
            <LedButton kind="toggle" on={view === 'sat'} color="#22d3ee" onClick={toggleScanner} testId="asato-scan" className="vl-led--big">
              👁️ {L('Viveka', 'Scanner', 'विवेक')}
              <small>{view === 'sat' ? 'ON · Sat, the atom view (tap to return to Asat)' : 'OFF · Asat, the everyday view (tap to scan)'}</small>
            </LedButton>
            <div className="vl-dials">
              <DialKnob
                label={<>🌡️ {L('Tāpa', 'Temperature', 'ताप')}</>}
                ariaLabel="Temperature in kelvin"
                value={T}
                min={T_MIN}
                max={T_MAX}
                scale="log"
                size={112}
                color={glowing ? '#fb923c' : '#22d3ee'}
                format={(x) => `${x < 10 ? x.toFixed(1) : Math.round(x)} K (${Math.round(x - 273.15)} °C)`}
                onChange={changeT}
                disabled={sid === 'wood' && burned}
                testId="asato-temp"
              />
              <div className="vl-leds" style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <LedButton kind="toggle" on={trails} color="#a78bfa" onClick={() => setTrails((x) => !x)} testId="asato-trails">Thermal trails</LedButton>
                <LedButton kind="toggle" on={arrows} color="#f0abfc" onClick={() => setArrows((x) => !x)} testId="asato-arrows">Velocity arrows</LedButton>
              </div>
            </div>
            <p className="vl-small">Drag the dial, scroll on it, or use the arrow keys (Shift for big steps). Log scale, {T_MIN}–{T_MAX} K.</p>
            <div className="vl-readout-grid" data-testid="asato-readouts">
              <span>State</span><b data-testid="asato-state">{sid === 'wood' && !burned ? stateLabel.solid : stateLabel[phase]}</b>
              <span>Substance</span><b>{sub.formula}</b>
              {sub.melt && <><span>Melts / boils</span><b>{sub.melt} K / {sub.boil} K</b></>}
              <span>Thermal speed v<sub>rms</sub></span><b data-testid="asato-vrms">{Math.round(v)} m/s</b>
              <span>Atoms in chamber</span><b data-testid="asato-count" ref={countRef}>{startCount(sid, coef.o2)} atoms</b>
              {crystal && <><span>Crystal</span><b data-testid="asato-crystal">{crystal}</b></>}
              <span>{L('Varṇa', 'Glow', 'वर्ण')}</span><b>{glowing ? 'glowing (approx. colour)' : 'none visible'}</b>
            </div>
            <p className="vl-small">v<sub>rms</sub> = √(3kT/m), with k = 1.380649 × 10⁻²³ J/K and m = {burnedWood ? 'one CO₂ molecule, 44.01 u' : sub.massNote}. Heat is atoms moving: hotter means faster.</p>
            {sid === 'wood' && <p className="vl-msg">{woodState}</p>}
            {(sid === 'ice' || sid === 'water') && <p className="vl-small">Ice, water and steam are one substance, H₂O. Turn past 273 K and 373 K and watch the name change with the form.</p>}
            {sid === 'gold' && T < COLD_K && <p className="vl-msg is-ok">❄️ Below {COLD_K} K: a calm crystal. Absolute zero itself can never quite be reached, only approached.</p>}
            {(sid === 'water' || sid === 'ice') && phase === 'gas' && v > FAST_MS && <p className="vl-msg is-ok">🌀 Steam molecules above {FAST_MS} m/s, and the atom count has not changed.</p>}
            {glowing && <p className="vl-small">Glow colour is approximate. Colour is how our eyes and brain read light of different wavelengths; hotter objects give off more light, shifting from red toward yellow-white.</p>}
          </div>
        </div>

        {sid === 'wood' && (
          <section className="vl-panel" aria-label="Balance the burning equation">
            <h3 className="vl-panel-title">
              🔥 Balance the burning, then burn the log
              <span className={`vl-score${balanced ? '' : ' vl-score--off'}`}>{balanced ? 'Balanced ✓' : 'Not balanced yet'}</span>
            </h3>
            <div className="vl-eq" data-testid="asato-equation">
              <span>C₆H₁₀O₅ +</span>
              <Stepper value={coef.o2} onChange={setO2} disabled={burned} testId="asato-o2" /> <span>O₂ →</span>
              <Stepper value={coef.co2} onChange={(n) => setCoef((c) => ({ ...c, co2: n }))} disabled={burned} testId="asato-co2" /> <span>CO₂ +</span>
              <Stepper value={coef.h2o} onChange={(n) => setCoef((c) => ({ ...c, h2o: n }))} disabled={burned} testId="asato-h2o" /> <span>H₂O</span>
            </div>
            <table className="vl-table vl-count" data-testid="asato-counts">
              <thead><tr><th>Atom</th><th>Before (log + air)</th><th>After (gases)</th><th /></tr></thead>
              <tbody>
                {(['C', 'H', 'O'] as const).map((el) => (
                  <tr key={el}>
                    <td><b>{el}</b></td>
                    <td>{left[el]}</td>
                    <td>{right[el]}</td>
                    <td>{left[el] === right[el] ? '✓' : '✗'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="vl-btn-row">
              <button type="button" className="vl-btn vl-btn--red" onClick={burn} disabled={!balanced || burned} data-testid="asato-burn">🔥 Burn the log</button>
              {burned && <button type="button" className="vl-btn vl-btn--ghost" onClick={() => pickSubstance('wood')}>↺ New log</button>}
            </div>
            <p className="vl-small">Hint: 6 carbons need 6 CO₂; 10 hydrogens make 5 H₂O; then count the oxygens. Real wood also has lignin and leaves a little mineral ash; this picture follows just the cellulose.</p>
          </section>
        )}

        {allDone && (
          <div className="vl-sama is-ok" role="status" data-testid="asato-win">
            🌟 From changing name and form (nāma-rūpa) to what stays the same.
          </div>
        )}
      </div>

      <div className="vl-note">
        <strong>How much of an atom is empty space?</strong> Almost all of it: the nucleus is tiny compared with the atom.
        Yet a gold bar really is solid. Electric forces between atoms hold them in place and push back when you press.
      </div>

      <div className="vl-grid-2">
        <section className="vl-panel vl-tradition" aria-label="Bṛhadāraṇyaka Upaniṣad 1.3.28">
          <h3 className="vl-panel-title">📜 Bṛhadāraṇyaka Upaniṣad 1.3.28</h3>
          <figure className="vl-quote">
            <blockquote lang="sa">असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥</blockquote>
            <div className="vl-term-iast">asato mā sad gamaya | tamaso mā jyotir gamaya | mṛtyor mā’mṛtaṃ gamaya ||</div>
            <figcaption>Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality.</figcaption>
          </figure>
          <p className="vl-small">These are the <em>abhyāroha</em> (“ascent”) verses, recited with the pavamāna chants. The Upaniṣad then explains each line itself:</p>
          <figure className="vl-quote">
            <blockquote lang="sa">मृत्युर्वा असत् सदमृतम्</blockquote>
            <div className="vl-term-iast">mṛtyur vā asat, sad amṛtam</div>
            <figcaption>“The unreal is death; the real is immortality.” So “lead me from the unreal to the real” means “make me immortal”.</figcaption>
          </figure>
          <figure className="vl-quote">
            <blockquote lang="sa">मृत्युर्वै तमो ज्योतिरमृतम्</blockquote>
            <div className="vl-term-iast">mṛtyur vai tamo, jyotir amṛtam</div>
            <figcaption>“Darkness is death; light is immortality.”</figcaption>
          </figure>
          <figure className="vl-quote">
            <blockquote lang="sa">नात्र तिरोहितमिवास्ति</blockquote>
            <div className="vl-term-iast">nātra tirohitam ivāsti</div>
            <figcaption>Of the third line: “here nothing is hidden”. Its meaning is plain.</figcaption>
          </figure>
        </section>
        <section className="vl-panel vl-tradition vl-tradition--spanda" aria-label="Māyā and avidyā in later Vedānta">
          <h3 className="vl-panel-title">🎭 Māyā and avidyā · later Vedānta</h3>
          <p>
            The idea of a “veil of <strong lang="sa">माया māyā</strong>” and of <strong lang="sa">अविद्या avidyā</strong>{' '}
            (not-knowing) belongs to later Vedānta, especially the Advaita tradition associated with Śaṅkara (c. 8th century
            CE). These teachers used the words to explain how one reality appears as many names and forms (nāma-rūpa).
          </p>
          <p className="vl-small">
            <b>A separate layer.</b> The prayer itself does not use these words. This segment’s title borrows the later image
            and keeps it apart from what BU 1.3.28 says.
          </p>
        </section>
      </div>

      <section className="vl-panel vl-modern" aria-label="Modern comparison for fun">
        <h3 className="vl-panel-title">🔬 Modern comparison (for fun) <span className="vl-panel-hint">not what the texts say</span></h3>
        <ul className="vl-list">
          <li>Burning the log is a chemistry picture of conservation of mass: atoms are rearranged into new molecules, not destroyed (Lavoisier, 1700s).</li>
          <li>The tiny nucleus and the electron cloud around it come from modern quantum physics, which explains why atoms are mostly empty yet solids still push back.</li>
          <li>People sometimes say science shows “reality is an illusion”. It does not: a gold bar is truly solid at our scale, and made of mostly-empty atoms at a tiny scale. Both descriptions are true at their own scale.</li>
        </ul>
      </section>

      <TermPanel terms={TERMS} />
    </div>
  );
};

const Stepper: React.FC<{ value: number; onChange: (n: number) => void; disabled?: boolean; testId: string }> = ({ value, onChange, disabled, testId }) => (
  <span className="vl-stepper" data-testid={testId}>
    <button type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={disabled} aria-label="less">−</button>
    <b>{value}</b>
    <button type="button" onClick={() => onChange(Math.min(9, value + 1))} disabled={disabled} aria-label="more">+</button>
  </span>
);

export default AsatoMa;
