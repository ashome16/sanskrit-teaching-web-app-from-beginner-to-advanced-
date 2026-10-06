import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChallengeList, CoreIdea, TermPanel, type LabChallenge, type LabTerm } from './common';

type LangMode = 'both' | 'sanskrit' | 'modern';
type SubstanceId = 'gold' | 'wood' | 'water' | 'ice';
type Phase = 'solid' | 'liquid' | 'gas';
type El = 'Au' | 'C' | 'H' | 'O' | 'W'; // W = one whole H₂O molecule, drawn as O + 2 H

const W = 640;
const H = 400;
const BOX = { x0: 30, y0: 30, x1: 610, y1: 370 };
const K_B = 1.380649e-23; // J/K
const AMU = 1.66053906660e-27; // kg
const T_MIN = 20;
const T_MAX = 4000;
const IGNITE_K = 570; // wood catches fire in air at roughly 250–300 °C, depending on the wood
const GLOW_K = 800; // about where hot solids start to glow dull red (Draper point ≈ 798 K)

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
}

const SUBSTANCES: Record<SubstanceId, Substance> = {
  gold: { id: 'gold', name: 'Gold', dev: 'सुवर्ण', iast: 'suvarṇa', formula: 'Au', massU: 196.97, massNote: 'one Au atom, 196.97 u', melt: 1337.33, boil: 3243, startT: 300, color: '#eab308' },
  wood: { id: 'wood', name: 'Wood', dev: 'काष्ठ', iast: 'kāṣṭha', formula: 'mostly cellulose (C₆H₁₀O₅)ₙ', massU: 12.011, massNote: 'one C atom, 12.011 u, for comparison', melt: null, boil: null, startT: 300, color: '#92400e' },
  water: { id: 'water', name: 'Water', dev: 'जल', iast: 'jala', formula: 'H₂O', massU: 18.015, massNote: 'one H₂O molecule, 18.015 u', melt: 273.15, boil: 373.15, startT: 300, color: '#38bdf8' },
  ice: { id: 'ice', name: 'Ice', dev: 'हिम', iast: 'hima', formula: 'H₂O', massU: 18.015, massNote: 'one H₂O molecule, 18.015 u', melt: 273.15, boil: 373.15, startT: 250, color: '#bae6fd' },
};

const phaseOf = (s: Substance, T: number): Phase => {
  if (s.melt === null || s.boil === null) return 'solid';
  if (T < s.melt) return 'solid';
  if (T < s.boil) return 'liquid';
  return 'gas';
};

const vrms = (T: number, massU: number) => Math.sqrt((3 * K_B * T) / (massU * AMU));

/** Slider position 0..1000 → temperature on a log scale, so 273 K and 3243 K are both easy to reach. */
const posToT = (p: number) => T_MIN * (T_MAX / T_MIN) ** (p / 1000);
const tToPos = (T: number) => (1000 * Math.log(T / T_MIN)) / Math.log(T_MAX / T_MIN);

/** Approximate glow colour of a hot object (a common blackbody RGB fit). */
const glowRGB = (T: number): [number, number, number] => {
  const t = Math.max(T, 1000) / 100;
  const r = t <= 66 ? 255 : 329.7 * (t - 60) ** -0.1332;
  const g = t <= 66 ? 99.47 * Math.log(t) - 161.12 : 288.12 * (t - 60) ** -0.0755;
  const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.52 * Math.log(t - 10) - 305.04;
  const c = (n: number) => Math.round(Math.max(0, Math.min(255, n)));
  // Below 1000 K, fade towards a deep red.
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
}

const gauss = () => {
  const u = Math.random() || 1e-9;
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
};

const mk = (el: El, x: number, y: number): Atom => ({ el, x, y, vx: 0, vy: 0, hx: x, hy: y, ang: Math.random() * 6.28, mol: -1, tx: x, ty: y });

const buildAtoms = (sid: SubstanceId, o2: number): Atom[] => {
  if (sid === 'gold') {
    const out: Atom[] = [];
    const cols = 10;
    const rows = 7;
    const sp = 22;
    const x0 = W / 2 - ((cols - 1) * sp) / 2;
    const y0 = BOX.y1 - 14 - (rows - 1) * sp;
    for (let r = 0; r < rows; r += 1) for (let c = 0; c < cols; c += 1) out.push(mk('Au', x0 + c * sp + (r % 2 ? sp / 2 : 0), y0 + r * sp));
    return out;
  }
  if (sid === 'water' || sid === 'ice') {
    const out: Atom[] = [];
    const cols = 8;
    const rows = 5;
    const sp = 30;
    const x0 = W / 2 - ((cols - 1) * sp) / 2;
    const y0 = BOX.y1 - 20 - (rows - 1) * sp;
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

const ATOM_STYLE: Record<El, { r: number; fill: string; stroke: string }> = {
  Au: { r: 9, fill: '#facc15', stroke: '#a16207' },
  C: { r: 8, fill: '#334155', stroke: '#0f172a' },
  H: { r: 5, fill: '#f8fafc', stroke: '#64748b' },
  O: { r: 7.5, fill: '#ef4444', stroke: '#991b1b' },
  W: { r: 7, fill: '#ef4444', stroke: '#991b1b' },
};

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

const CHALLENGES: LabChallenge[] = [
  { q: 'How does the Bṛhadāraṇyaka Upaniṣad itself explain “asat” and “sat” in this verse?', options: ['asat = darkness, sat = sun', 'asat = death, sat = immortality', 'asat = atoms, sat = a gold bar'], answer: 1, explain: '“Mṛtyur vā asat, sad amṛtam”: death is the unreal, the real is immortality (BU 1.3.28).' },
  { q: 'Ice and water are…', options: ['two different substances', 'the same substance, H₂O, in different forms', 'both made of gold'], answer: 1, explain: 'Same molecules; only the arrangement and motion change, and so does the name.' },
  { q: 'Why does a very hot piece of gold start to glow, and look yellower as it gets hotter?', options: ['It is painted', 'Hot things give off light; hotter means more light at shorter wavelengths', 'Gold is always glowing'], answer: 1, explain: 'Colour is how our eyes and brain read light of different wavelengths; hotter objects shift toward yellow-white.' },
  { q: 'When the log burns, what happens to its carbon atoms?', options: ['They are destroyed', 'They end up in CO₂, and the count stays the same', 'They turn into oxygen'], answer: 1, explain: 'C₆H₁₀O₅ + 6 O₂ → 6 CO₂ + 5 H₂O: 6 C, 10 H and 17 O on both sides.' },
  { q: 'The words māyā and avidyā in this sense come from…', options: ['this verse itself', 'later Vedānta, as a separate layer of interpretation', 'modern physics'], answer: 1, explain: 'The verse is a prayer; Vedānta teachers later used māyā and avidyā to explain the many names and forms.' },
];

const AsatoMa: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lang, setLang] = useState<LangMode>('both');
  const [sid, setSid] = useState<SubstanceId>('ice');
  const [view, setView] = useState<'asat' | 'sat'>('asat');
  const [T, setT] = useState(250);
  const [coef, setCoef] = useState({ o2: 1, co2: 1, h2o: 1 });
  const [burned, setBurned] = useState(false);
  const [done, setDone] = useState({ s1: false, s2: false, s3: false });
  const atoms = useRef<Atom[]>(buildAtoms('ice', 0));
  const burnT = useRef(-1);
  const live = useRef({ sid, view, T, burned, lang });
  useEffect(() => {
    live.current = { sid, view, T, burned, lang };
  }, [sid, view, T, burned, lang]);

  const sub = SUBSTANCES[sid];
  const phase: Phase = sid === 'wood' ? (burned ? 'gas' : 'solid') : phaseOf(sub, T);
  const glowing = sid !== 'wood' && phase !== 'gas' && T >= GLOW_K;

  const L = useCallback(
    (sk: string, modern: string, dev?: string) =>
      lang === 'modern' ? modern : lang === 'sanskrit' ? (dev ? `${dev} ${sk}` : sk) : `${dev ? `${dev} ` : ''}${sk} · ${modern}`,
    [lang],
  );

  const changeT = (next: number) => {
    setT(next);
    const glowsNow = sid !== 'wood' && phaseOf(SUBSTANCES[sid], next) !== 'gas' && next >= GLOW_K;
    if (glowsNow) setDone((d) => (d.s2 ? d : { ...d, s2: true }));
  };
  const showSat = () => {
    setView('sat');
    setDone((d) => (d.s1 ? d : { ...d, s1: true }));
  };

  const pickSubstance = (id: SubstanceId) => {
    setSid(id);
    setT(SUBSTANCES[id].startT);
    setBurned(false);
    burnT.current = -1;
    setCoef({ o2: 1, co2: 1, h2o: 1 });
    atoms.current = buildAtoms(id, id === 'wood' ? 1 : 0);
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
    burnT.current = 0;
    setBurned(true);
    if (T < 900) setT(900);
    setDone((d) => ({ ...d, s3: true }));
  };

  const paint = useCallback((dt: number) => {
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
    const { sid: s, view: v, T: temp, burned: b, lang: lm } = live.current;
    const S = SUBSTANCES[s];
    const ph: Phase = s === 'wood' ? (b ? 'gas' : 'solid') : phaseOf(S, temp);
    const glow = s !== 'wood' && ph !== 'gas' && temp >= GLOW_K;
    const [gr, gg, gb] = glowRGB(temp);
    const ga = glowAlpha(temp);
    const lab = (sk: string, modern: string) => (lm === 'modern' ? modern : lm === 'sanskrit' ? sk : `${sk} · ${modern}`);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = v === 'sat' ? '#f8fafc' : '#fffdf8';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#e2e8f0';
    ctx.strokeRect(BOX.x0, BOX.y0, BOX.x1 - BOX.x0, BOX.y1 - BOX.y0);

    if (v === 'asat') {
      // The everyday look: one smooth thing.
      const cx = W / 2;
      ctx.save();
      if (glow) {
        ctx.shadowColor = `rgba(${gr},${gg},${gb},${ga})`;
        ctx.shadowBlur = 40;
      }
      if (s === 'wood') {
        if (!b) {
          ctx.fillStyle = '#92400e';
          ctx.beginPath();
          ctx.roundRect(cx - 170, 220, 300, 90, 40);
          ctx.fill();
          ctx.fillStyle = '#d6a36a';
          ctx.beginPath();
          ctx.ellipse(cx + 130, 265, 34, 45, 0, 0, 2 * Math.PI);
          ctx.fill();
          ctx.strokeStyle = '#92400e';
          for (let r = 10; r < 40; r += 10) {
            ctx.beginPath();
            ctx.ellipse(cx + 130, 265, r * 0.75, r, 0, 0, 2 * Math.PI);
            ctx.stroke();
          }
          if (temp >= IGNITE_K) {
            ctx.fillStyle = 'rgba(249,115,22,0.6)';
            for (let k = 0; k < 6; k += 1) {
              ctx.beginPath();
              ctx.ellipse(cx - 140 + k * 50, 205 - Math.random() * 8, 14, 26, 0, 0, 2 * Math.PI);
              ctx.fill();
            }
          }
        } else {
          ctx.fillStyle = '#cbd5e1';
          ctx.beginPath();
          ctx.ellipse(cx, 340, 60, 10, 0, 0, 2 * Math.PI);
          ctx.fill();
          ctx.fillStyle = '#64748b';
          ctx.font = '600 13px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('The log seems to have vanished… switch to Sat to see where the atoms went.', cx, 200);
        }
      } else if (ph === 'solid') {
        const grd = ctx.createLinearGradient(0, 180, 0, 330);
        grd.addColorStop(0, s === 'gold' ? '#fde68a' : '#e0f2fe');
        grd.addColorStop(1, S.color);
        ctx.fillStyle = grd;
        ctx.beginPath();
        if (s === 'gold') {
          ctx.moveTo(cx - 120, 330);
          ctx.lineTo(cx - 80, 220);
          ctx.lineTo(cx + 80, 220);
          ctx.lineTo(cx + 120, 330);
          ctx.closePath();
        } else {
          ctx.roundRect(cx - 80, 190, 160, 140, 18);
        }
        ctx.fill();
      } else if (ph === 'liquid') {
        ctx.fillStyle = s === 'gold' ? '#f59e0b' : 'rgba(56,189,248,0.75)';
        ctx.beginPath();
        ctx.ellipse(cx, 335, 200, 26, 0, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        for (let k = 0; k < 7; k += 1) {
          ctx.fillStyle = s === 'gold' ? 'rgba(234,179,8,0.12)' : 'rgba(148,163,184,0.18)';
          ctx.beginPath();
          ctx.ellipse(cx - 180 + k * 60, 160 + Math.sin(k + performance.now() / 900) * 20, 70, 44, 0, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      if (glow) {
        // Tint only the shape just drawn (its path is still current).
        ctx.fillStyle = `rgba(${gr},${gg},${gb},${ga})`;
        ctx.fill();
      }
      ctx.restore();
    } else {
      // The atom view: same thing, seen as particles.
      const list = atoms.current;
      const ratio = S.melt ? temp / S.melt : temp / 600;
      const vDisp = Math.max(40, Math.min(260, vrms(temp, s === 'wood' ? 30 : S.massU) * 0.25));
      const step = Math.min(0.05, dt);
      if (s === 'wood') {
        if (b && burnT.current >= 0) {
          burnT.current += step;
          const t = burnT.current;
          const groups = new Map<number, { vx: number; vy: number }>();
          list.forEach((a) => {
            if (t < 1.8) {
              a.x += (a.tx - a.x) * Math.min(1, step * 3);
              a.y += (a.ty - a.y) * Math.min(1, step * 3);
            } else {
              if (!groups.has(a.mol)) {
                const seed = Math.sin(a.mol * 12.9898) * 43758.5453;
                const ang = (seed - Math.floor(seed)) * 2 * Math.PI;
                groups.set(a.mol, { vx: Math.cos(ang) * 60, vy: Math.sin(ang) * 60 - 20 });
              }
              if (a.vx === 0 && a.vy === 0) {
                const g = groups.get(a.mol)!;
                a.vx = g.vx;
                a.vy = g.vy;
              }
              a.x += a.vx * step;
              a.y += a.vy * step;
            }
          });
          // Bounce whole molecules off the walls together.
          if (t >= 1.8) {
            const byMol = new Map<number, Atom[]>();
            list.forEach((a) => byMol.set(a.mol, [...(byMol.get(a.mol) || []), a]));
            byMol.forEach((arr) => {
              const minX = Math.min(...arr.map((a) => a.x));
              const maxX = Math.max(...arr.map((a) => a.x));
              const minY = Math.min(...arr.map((a) => a.y));
              const maxY = Math.max(...arr.map((a) => a.y));
              if (minX < BOX.x0 + 8 || maxX > BOX.x1 - 8) arr.forEach((a) => { a.vx = (minX < BOX.x0 + 8 ? 1 : -1) * Math.abs(a.vx); });
              if (minY < BOX.y0 + 8 || maxY > BOX.y1 - 8) arr.forEach((a) => { a.vy = (minY < BOX.y0 + 8 ? 1 : -1) * Math.abs(a.vy); });
            });
          }
        } else {
          const amp = 0.4 + 2.2 * Math.sqrt(temp / 600);
          list.forEach((a, i) => {
            const isAir = i >= 21;
            if (isAir) {
              a.hx += Math.sin(performance.now() / 700 + i) * 0.2;
              a.hy += Math.cos(performance.now() / 900 + i) * 0.15;
            }
            a.x += (a.hx + gauss() * amp * 0.5 - a.x) * 0.5;
            a.y += (a.hy + gauss() * amp * 0.5 - a.y) * 0.5;
          });
        }
      } else if (ph === 'solid') {
        const amp = 0.3 + 2 * Math.max(0, ratio);
        list.forEach((a) => {
          a.x += (a.hx + gauss() * amp - a.x) * 0.5;
          a.y += (a.hy + gauss() * amp - a.y) * 0.5;
          a.vx = 0;
          a.vy = 0;
        });
      } else if (ph === 'liquid') {
        const kick = 30 + 60 * Math.min(1.5, ratio - 1);
        for (let i = 0; i < list.length; i += 1) {
          const a = list[i];
          let fx = gauss() * kick;
          let fy = gauss() * kick + 260;
          for (let j = 0; j < list.length; j += 1) {
            if (i === j) continue;
            const dx = a.x - list[j].x;
            const dy = a.y - list[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 400 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              fx += (dx / d) * (20 - d) * 60;
              fy += (dy / d) * (20 - d) * 60;
            }
          }
          a.vx = (a.vx + fx * step) * 0.9;
          a.vy = (a.vy + fy * step) * 0.9;
        }
        list.forEach((a) => {
          a.x += a.vx * step;
          a.y += a.vy * step;
          a.ang += gauss() * 0.1;
        });
      } else {
        list.forEach((a) => {
          const sp = Math.hypot(a.vx, a.vy);
          if (sp < 1) {
            const ang = Math.random() * 2 * Math.PI;
            a.vx = Math.cos(ang) * vDisp;
            a.vy = Math.sin(ang) * vDisp;
          } else {
            const target = vDisp * (0.6 + 0.8 * Math.abs(gauss()) * 0.6);
            const k = 1 + (target / sp - 1) * 0.02;
            const rot = gauss() * 0.05;
            const c = Math.cos(rot);
            const si = Math.sin(rot);
            const nvx = (a.vx * c - a.vy * si) * k;
            const nvy = (a.vx * si + a.vy * c) * k;
            a.vx = nvx;
            a.vy = nvy;
          }
          a.x += a.vx * step;
          a.y += a.vy * step;
          a.ang += 0.1;
        });
      }
      // Walls
      if (!(s === 'wood' && b)) {
        list.forEach((a) => {
          if (a.x < BOX.x0 + 10) { a.x = BOX.x0 + 10; a.vx = Math.abs(a.vx); }
          if (a.x > BOX.x1 - 10) { a.x = BOX.x1 - 10; a.vx = -Math.abs(a.vx); }
          if (a.y < BOX.y0 + 10) { a.y = BOX.y0 + 10; a.vy = Math.abs(a.vy); }
          if (a.y > BOX.y1 - 10) { a.y = BOX.y1 - 10; a.vy = -Math.abs(a.vy); }
        });
      }
      // Bonds for the wood unit before burning, and inside product molecules after.
      ctx.strokeStyle = 'rgba(100,116,139,0.55)';
      ctx.lineWidth = 2;
      if (s === 'wood') {
        const near = (a: Atom, c: Atom) => Math.hypot(a.x - c.x, a.y - c.y);
        for (let i = 0; i < list.length; i += 1) {
          for (let j = i + 1; j < list.length; j += 1) {
            const a = list[i];
            const c = list[j];
            const sameUnit = b ? a.mol === c.mol && a.mol >= 0 : (i < 21 && j < 21) || (i >= 21 && j === i + 1 && (i - 21) % 2 === 0);
            if (sameUnit && near(a, c) < (b ? 20 : 46)) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(c.x, c.y);
              ctx.stroke();
            }
          }
        }
      }
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
            ctx.strokeStyle = '#64748b';
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
      ctx.fillStyle = '#64748b';
      ctx.font = '600 11px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(s === 'wood' ? (b ? 'Products: CO₂ and H₂O molecules (gases)' : 'One simplified C₆H₁₀O₅ unit of cellulose, with O₂ from the air (top right)') : 'Each dot is an atom or molecule. Screen speeds are scaled down.', BOX.x0 + 6, BOX.y0 + 16);
    }
    // corner label
    ctx.fillStyle = '#0f766e';
    ctx.font = '700 13px "Noto Sans Devanagari", system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(v === 'asat' ? lab('असत् Asat', 'Everyday view') : lab('सत् Sat', 'Atom view'), BOX.x1 - 6, BOX.y0 + 18);
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      paint((now - last) / 1000);
      last = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paint]);

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
  const allDone = done.s1 && done.s2 && done.s3;

  const steps = [
    { key: 's1', dev: 'असतो मा सद्गमय', iast: 'asato mā sad gamaya', modern: 'Switch to the atom view', ok: done.s1 },
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

  return (
    <div className="vl-sim">
      <CoreIdea>
        A famous prayer from the <em>Bṛhadāraṇyaka Upaniṣad</em> (1.3.28) asks to be led from asat to sat, from darkness
        to light, from death to immortality. In this game, the <strong>Asat / Sat</strong> switch is a playful way to move
        from the everyday look of a thing to what stays the same underneath, while you change its name and form by heating
        and burning. (The Upaniṣad’s own explanation of the words is in the panel below.)
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

      <ol className="vl-steps vl-steps--3" data-testid="asato-steps">
        {steps.map((s, i) => (
          <li key={s.key} className={s.ok ? 'is-done' : ''}>
            <span className="vl-step-n">{s.ok ? '✓' : i + 1}</span>{' '}
            {lang === 'modern' ? s.modern : lang === 'sanskrit' ? <span lang="sa">{s.dev} · {s.iast}</span> : <><span lang="sa">{s.dev}</span> · {s.modern}</>}
          </li>
        ))}
      </ol>

      <div className="vl-orbit-grid">
        <div className="vl-stage-wrap">
          <canvas ref={canvasRef} className="vl-stage vl-stage--asato" width={W} height={H} data-testid="asato-canvas" role="img" aria-label="Substance viewer: everyday view or atom view" />
        </div>
        <div className="vl-controls">
          <div className="vl-btn-row" role="radiogroup" aria-label="Substance">
            {(Object.keys(SUBSTANCES) as SubstanceId[]).map((id) => (
              <button key={id} type="button" role="radio" aria-checked={sid === id} className={`vl-chip${sid === id ? ' is-on' : ''}`} onClick={() => pickSubstance(id)} data-testid={`asato-sub-${id}`}>
                {lang === 'modern' ? SUBSTANCES[id].name : lang === 'sanskrit' ? `${SUBSTANCES[id].dev} ${SUBSTANCES[id].iast}` : `${SUBSTANCES[id].dev} · ${SUBSTANCES[id].name}`}
              </button>
            ))}
          </div>
          <div className="vl-btn-row vl-toggle" role="radiogroup" aria-label="Asat or Sat view">
            <button type="button" role="radio" aria-checked={view === 'asat'} className={`vl-chip${view === 'asat' ? ' is-on' : ''}`} onClick={() => setView('asat')} data-testid="asato-view-asat">
              {L('Asat', 'Everyday view', 'असत्')}
            </button>
            <button type="button" role="radio" aria-checked={view === 'sat'} className={`vl-chip${view === 'sat' ? ' is-on' : ''}`} onClick={showSat} data-testid="asato-view-sat">
              {L('Sat', 'Atom view', 'सत्')}
            </button>
          </div>
          <label className="vl-slider">
            <span className="vl-slider-label">🌡️ {L('Tāpa', 'Temperature', 'ताप')}: {Math.round(T)} K ({Math.round(T - 273.15)} °C)</span>
            <input type="range" min={0} max={1000} step={1} value={Math.round(tToPos(T))} onChange={(e) => changeT(posToT(Number(e.target.value)))} data-testid="asato-temp" disabled={sid === 'wood' && burned} />
            <span className="vl-small">Log scale, {T_MIN}–{T_MAX} K</span>
          </label>
          <div className="vl-readout-grid" data-testid="asato-readouts">
            <span>State</span><b data-testid="asato-state">{sid === 'wood' && !burned ? stateLabel.solid : stateLabel[phase]}</b>
            <span>Substance</span><b>{sub.formula}</b>
            {sub.melt && <><span>Melts / boils</span><b>{sub.melt} K / {sub.boil} K</b></>}
            <span>Thermal speed v<sub>rms</sub></span><b data-testid="asato-vrms">{Math.round(v)} m/s</b>
            <span>{L('Varṇa', 'Glow', 'वर्ण')}</span><b>{glowing ? 'glowing (approx. colour)' : 'none visible'}</b>
          </div>
          <p className="vl-small">v<sub>rms</sub> = √(3kT/m), with k = 1.380649 × 10⁻²³ J/K and m = {burnedWood ? 'one CO₂ molecule, 44.01 u' : sub.massNote}. Heat is atoms moving: hotter means faster.</p>
          {sid === 'wood' && <p className="vl-msg">{woodState}</p>}
          {(sid === 'ice' || sid === 'water') && <p className="vl-small">Ice and water are one substance, H₂O. Slide past 273 K and watch the name change with the form.</p>}
          {glowing && <p className="vl-small">Glow colour is approximate. Colour is how our eyes and brain read light of different wavelengths; hotter objects give off more light, shifting from red toward yellow-white.</p>}
        </div>
      </div>

      <div className="vl-note">
        <strong>How much of an atom is empty space?</strong> Almost all of it: the nucleus is tiny compared with the atom.
        Yet a gold bar really is solid. Electric forces between atoms hold them in place and push back when you press.
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

      <div className="vl-grid-2">
        <TermPanel terms={TERMS} />
        <ChallengeList items={CHALLENGES} />
      </div>
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
