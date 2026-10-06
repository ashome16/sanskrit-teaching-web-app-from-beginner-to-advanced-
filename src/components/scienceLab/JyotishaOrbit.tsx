import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChallengeList, CoreIdea, TermPanel, type LabChallenge, type LabTerm } from './common';
import { DialKnob, GlowSlider, HudFrame, LedButton } from './controls';

type Script = 'dev' | 'iast' | 'en';

const NAKSHATRAS: { dev: string; iast: string }[] = [
  { dev: 'अश्विनी', iast: 'Aśvinī' },
  { dev: 'भरणी', iast: 'Bharaṇī' },
  { dev: 'कृत्तिका', iast: 'Kṛttikā' },
  { dev: 'रोहिणी', iast: 'Rohiṇī' },
  { dev: 'मृगशिरा', iast: 'Mṛgaśirā' },
  { dev: 'आर्द्रा', iast: 'Ārdrā' },
  { dev: 'पुनर्वसु', iast: 'Punarvasu' },
  { dev: 'पुष्य', iast: 'Puṣya' },
  { dev: 'आश्लेषा', iast: 'Āśleṣā' },
  { dev: 'मघा', iast: 'Maghā' },
  { dev: 'पूर्वफल्गुनी', iast: 'Pūrva Phalgunī' },
  { dev: 'उत्तरफल्गुनी', iast: 'Uttara Phalgunī' },
  { dev: 'हस्त', iast: 'Hasta' },
  { dev: 'चित्रा', iast: 'Citrā' },
  { dev: 'स्वाती', iast: 'Svātī' },
  { dev: 'विशाखा', iast: 'Viśākhā' },
  { dev: 'अनुराधा', iast: 'Anurādhā' },
  { dev: 'ज्येष्ठा', iast: 'Jyeṣṭhā' },
  { dev: 'मूल', iast: 'Mūla' },
  { dev: 'पूर्वाषाढा', iast: 'Pūrvāṣāḍhā' },
  { dev: 'उत्तराषाढा', iast: 'Uttarāṣāḍhā' },
  { dev: 'श्रवण', iast: 'Śravaṇa' },
  { dev: 'धनिष्ठा', iast: 'Dhaniṣṭhā' },
  { dev: 'शतभिषा', iast: 'Śatabhiṣā' },
  { dev: 'पूर्वभाद्रपदा', iast: 'Pūrva Bhādrapadā' },
  { dev: 'उत्तरभाद्रपदा', iast: 'Uttara Bhādrapadā' },
  { dev: 'रेवती', iast: 'Revatī' },
];

const BODY_NAMES: Record<'sun' | 'earth' | 'moon', Record<Script, string>> = {
  sun: { dev: 'सूर्य', iast: 'Sūrya', en: 'Sun' },
  earth: { dev: 'पृथिवी', iast: 'Pṛthivī', en: 'Earth' },
  moon: { dev: 'चन्द्र', iast: 'Candra', en: 'Moon' },
};

const GRAHAS: { dev: string; iast: string; en: string; note?: string }[] = [
  { dev: 'सूर्य', iast: 'Sūrya', en: 'Sun' },
  { dev: 'चन्द्र', iast: 'Candra', en: 'Moon' },
  { dev: 'मङ्गल', iast: 'Maṅgala', en: 'Mars' },
  { dev: 'बुध', iast: 'Budha', en: 'Mercury' },
  { dev: 'बृहस्पति / गुरु', iast: 'Bṛhaspati / Guru', en: 'Jupiter' },
  { dev: 'शुक्र', iast: 'Śukra', en: 'Venus' },
  { dev: 'शनि', iast: 'Śani', en: 'Saturn' },
  { dev: 'राहु', iast: 'Rāhu', en: 'ascending lunar node', note: 'a point, not a body' },
  { dev: 'केतु', iast: 'Ketu', en: 'descending lunar node', note: 'a point, not a body' },
];

const TERMS: LabTerm[] = [
  { dev: 'ज्योतिष', iast: 'jyotiṣa', en: 'the traditional science of the heavenly lights (astronomy and calendar)' },
  { dev: 'ग्रह', iast: 'graha', en: '"seizer": a moving light in the sky' },
  { dev: 'नक्षत्र', iast: 'nakṣatra', en: 'one of 27 star-markers along the Moon’s path' },
  { dev: 'कक्षा', iast: 'kakṣā', en: 'orbit, path' },
  { dev: 'गति', iast: 'gati', en: 'motion, speed' },
  { dev: 'सूर्य', iast: 'Sūrya', en: 'Sun' },
  { dev: 'पृथिवी', iast: 'Pṛthivī', en: 'Earth' },
  { dev: 'चन्द्र', iast: 'Candra', en: 'Moon' },
  { dev: 'राहु केतु', iast: 'Rāhu, Ketu', en: 'the two lunar nodes', note: 'where the Moon’s path crosses the Sun’s; eclipses happen near them' },
];

const CHALLENGES: LabChallenge[] = [
  { q: 'How many nakṣatras does Candra cross in one orbit (one trip around the starry sky)?', options: ['12', '27', '30', '365'], answer: 1, explain: 'All 27, about one per day, because a sidereal month is ≈ 27.3 days.' },
  { q: 'Set Pṛthivī’s speed very low and press play. What happens?', options: ['It flies away', 'It falls into Sūrya', 'Nothing changes'], answer: 1, explain: 'Too slow, and gravity wins: the path dives toward the Sun.' },
  { q: 'Above about how many times the circular speed does Pṛthivī escape?', options: ['1.0×', '√2 ≈ 1.41×', '3×'], answer: 1, explain: 'Escape speed is √2 times the circular-orbit speed at the same distance.' },
  { q: 'Rāhu and Ketu are…', options: ['two hidden planets', 'the lunar nodes: points, not bodies', 'comets'], answer: 1, explain: 'They mark where the Moon’s orbit crosses the ecliptic, the Sun’s yearly path.' },
  { q: 'What happens to the orbit if you make Sūrya heavier while Pṛthivī is moving?', options: ['The pull gets stronger and the path curves more tightly', 'Nothing', 'Pṛthivī stops'], answer: 0, explain: 'Gravity grows with mass, so the same speed now gives a tighter, stretched orbit.' },
];

// --- Physics (sim units: px, seconds, G = 1) ---
const SIZE = 640;
const C = SIZE / 2;
const A_EARTH = 168;
const MOON_R = 14;
const T_EARTH = 24; // seconds for one circular orbit at default mass
const GM_SUN = (4 * Math.PI * Math.PI * A_EARTH ** 3) / (T_EARTH * T_EARTH);
const EARTH_RATIO = 0.03; // exaggerated so Candra can be drawn and stays bound
const MOON_RATIO = 0.0123; // real Moon/Earth mass ratio
const SUBSTEPS = 40;
const DT = 1 / 60 / SUBSTEPS;
const SUN_RADIUS = 18;
const TRAIL = 1400;

interface Body {
  m: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
}

interface SimState {
  bodies: Body[]; // 0 sun, 1 earth, 2 moon
  moonOn: boolean;
  t: number;
  trails: { x: number; y: number }[][];
  status: 'ok' | 'fell' | 'escaped' | 'moon-lost' | 'moon-crash';
  moonAngle: number;
  moonPrevAngle: number;
  naksIdx: number;
  naksCrossed: number;
  earthAngle: number;
  earthPrevAngle: number;
}

const accel = (bodies: Body[], n: number) => {
  for (let i = 0; i < n; i += 1) {
    bodies[i].ax = 0;
    bodies[i].ay = 0;
  }
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      const dx = bodies[j].x - bodies[i].x;
      const dy = bodies[j].y - bodies[i].y;
      const r2 = dx * dx + dy * dy + 0.01;
      const inv = 1 / (r2 * Math.sqrt(r2));
      bodies[i].ax += bodies[j].m * dx * inv;
      bodies[i].ay += bodies[j].m * dy * inv;
      bodies[j].ax -= bodies[i].m * dx * inv;
      bodies[j].ay -= bodies[i].m * dy * inv;
    }
  }
};

const makeState = (sunF: number, earthF: number, speedF: number, moonOn: boolean): SimState => {
  const ms = GM_SUN * sunF;
  const me = GM_SUN * EARTH_RATIO * earthF;
  const mm = me * MOON_RATIO;
  const vCirc = Math.sqrt(GM_SUN / A_EARTH); // reference: default Sun mass
  const ve = vCirc * speedF;
  const vm = Math.sqrt(me / MOON_R);
  const sun: Body = { m: ms, x: C, y: C, vx: 0, vy: 0, ax: 0, ay: 0 };
  const earth: Body = { m: me, x: C + A_EARTH, y: C, vx: 0, vy: -ve, ax: 0, ay: 0 };
  const moon: Body = { m: mm, x: earth.x + MOON_R, y: C, vx: 0, vy: earth.vy - vm, ax: 0, ay: 0 };
  const bodies = moonOn ? [sun, earth, moon] : [sun, earth];
  // Zero total momentum so the system's centre of mass stays put.
  const px = bodies.reduce((s, b) => s + b.m * b.vx, 0);
  const py = bodies.reduce((s, b) => s + b.m * b.vy, 0);
  const mt = bodies.reduce((s, b) => s + b.m, 0);
  for (const b of bodies) {
    b.vx -= px / mt;
    b.vy -= py / mt;
  }
  accel(bodies, bodies.length);
  const ang = Math.atan2(-(moon.y - earth.y), moon.x - earth.x);
  return {
    bodies,
    moonOn,
    t: 0,
    trails: bodies.map(() => []),
    status: 'ok',
    moonAngle: 0,
    moonPrevAngle: ang,
    naksIdx: naksFor(ang),
    naksCrossed: 0,
    earthAngle: 0,
    earthPrevAngle: 0,
  };
};

/** Sky angle (counter-clockwise from the right, as seen on screen) → nakṣatra index. */
function naksFor(angle: number): number {
  const a = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  return Math.floor(a / ((2 * Math.PI) / 27)) % 27;
}

/** Candra's direction from Pṛthivī against the fixed-star frame: sky angle, counter-clockwise on screen. */
function naksAngle(s: SimState): number {
  const [, earth, moon] = s.bodies;
  if (!moon) return 0;
  return Math.atan2(-(moon.y - earth.y), moon.x - earth.x);
}

const unwrap = (d: number) => {
  let x = d;
  while (x > Math.PI) x -= 2 * Math.PI;
  while (x < -Math.PI) x += 2 * Math.PI;
  return x;
};

const step = (s: SimState) => {
  const b = s.bodies;
  const n = b.length;
  for (let k = 0; k < SUBSTEPS; k += 1) {
    for (let i = 0; i < n; i += 1) {
      b[i].vx += 0.5 * b[i].ax * DT;
      b[i].vy += 0.5 * b[i].ay * DT;
      b[i].x += b[i].vx * DT;
      b[i].y += b[i].vy * DT;
    }
    accel(b, n);
    for (let i = 0; i < n; i += 1) {
      b[i].vx += 0.5 * b[i].ax * DT;
      b[i].vy += 0.5 * b[i].ay * DT;
    }
    s.t += DT;
  }
  const [sun, earth, moon] = b;
  const de = Math.hypot(earth.x - sun.x, earth.y - sun.y);
  if (de < SUN_RADIUS + 4) s.status = 'fell';
  else if (de > 330) {
    const v2 = (earth.vx - sun.vx) ** 2 + (earth.vy - sun.vy) ** 2;
    if (v2 / 2 - (sun.m + earth.m) / de > 0) s.status = 'escaped';
  }
  // Pṛthivī's heliocentric angle (for counting years)
  const ea = Math.atan2(-(earth.y - sun.y), earth.x - sun.x);
  s.earthAngle += unwrap(ea - s.earthPrevAngle);
  s.earthPrevAngle = ea;
  if (moon && s.status === 'ok') {
    const dm = Math.hypot(moon.x - earth.x, moon.y - earth.y);
    if (dm < 5) s.status = 'moon-crash';
    else if (dm > MOON_R * 4.5) s.status = 'moon-lost';
    // Direction from Pṛthivī to Candra against the far-away stars
    const ma = naksAngle(s);
    const d = unwrap(ma - s.moonPrevAngle);
    s.moonAngle += d;
    s.moonPrevAngle = ma;
    const idx = naksFor(ma);
    if (idx !== s.naksIdx) {
      s.naksCrossed += 1;
      s.naksIdx = idx;
    }
  }
  b.forEach((body, i) => {
    const tr = s.trails[i];
    tr.push({ x: body.x, y: body.y });
    if (tr.length > TRAIL) tr.shift();
  });
};

const naksName = (i: number, script: Script) => (script === 'dev' ? NAKSHATRAS[i].dev : NAKSHATRAS[i].iast);

const draw = (ctx: CanvasRenderingContext2D, s: SimState, script: Script, showTrails: boolean) => {
  ctx.clearRect(0, 0, SIZE, SIZE);
  // sky
  const g = ctx.createRadialGradient(C, C, 40, C, C, C);
  g.addColorStop(0, '#0b1026');
  g.addColorStop(1, '#030712');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, SIZE, SIZE);
  // faint background stars (fixed pattern)
  ctx.fillStyle = 'rgba(226,232,240,0.55)';
  for (let i = 0; i < 90; i += 1) {
    const x = (i * 197.3) % SIZE;
    const y = (i * 131.7 + (i % 7) * 41) % SIZE;
    ctx.fillRect(x, y, i % 9 === 0 ? 1.6 : 1, i % 9 === 0 ? 1.6 : 1);
  }
  // nakṣatra ring
  const R1 = 262;
  const R2 = 312;
  const seg = (2 * Math.PI) / 27;
  for (let i = 0; i < 27; i += 1) {
    const a0 = -i * seg; // canvas y is down: counter-clockwise on screen means negative angles
    const a1 = -(i + 1) * seg;
    ctx.beginPath();
    ctx.arc(C, C, R2, a0, a1, true);
    ctx.arc(C, C, R1, a1, a0, false);
    ctx.closePath();
    const active = s.moonOn && i === s.naksIdx;
    ctx.fillStyle = active ? 'rgba(250, 204, 21, 0.38)' : i % 2 ? 'rgba(99, 102, 241, 0.16)' : 'rgba(139, 92, 246, 0.12)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 0.6;
    ctx.stroke();
    const mid = -(i + 0.5) * seg;
    ctx.save();
    ctx.translate(C + Math.cos(mid) * ((R1 + R2) / 2), C + Math.sin(mid) * ((R1 + R2) / 2));
    let rot = mid + Math.PI / 2;
    if (Math.sin(mid) > 0) rot += Math.PI;
    ctx.rotate(rot);
    ctx.fillStyle = active ? '#fde68a' : '#cbd5e1';
    ctx.font = `${active ? 700 : 500} ${script === 'dev' ? 11 : 9.5}px "Noto Sans Devanagari", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(naksName(i, script), 0, 0);
    ctx.restore();
  }
  const [sun, earth, moon] = s.bodies;
  // trails
  if (showTrails) {
    const colors = ['rgba(251,146,60,0.4)', 'rgba(96,165,250,0.75)', 'rgba(203,213,225,0.6)'];
    s.trails.forEach((tr, i) => {
      if (tr.length < 2 || i === 0) return;
      ctx.beginPath();
      ctx.moveTo(tr[0].x, tr[0].y);
      for (let k = 1; k < tr.length; k += 1) ctx.lineTo(tr[k].x, tr[k].y);
      ctx.strokeStyle = colors[i];
      ctx.lineWidth = i === 1 ? 1.6 : 1;
      ctx.stroke();
    });
  }
  // Line of sight. The nakṣatras stand for very distant stars, so only Candra's DIRECTION from Pṛthivī matters
  // (the same angle that picks s.naksIdx). Show it twice: a short ray from Pṛthivī through Candra, and the same
  // direction carried to the ring's centre, pointing at the highlighted segment.
  if (moon && s.moonOn && s.status !== 'escaped') {
    const ang = -naksAngle(s); // back to canvas orientation (y down)
    const ux = Math.cos(ang);
    const uy = Math.sin(ang);
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.75)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(earth.x, earth.y);
    ctx.lineTo(earth.x + ux * 46, earth.y + uy * 46);
    ctx.stroke();
    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(C + ux * (SUN_RADIUS + 10), C + uy * (SUN_RADIUS + 10));
    ctx.lineTo(C + ux * (R1 - 2), C + uy * (R1 - 2));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(250, 204, 21, 0.9)';
    ctx.beginPath();
    ctx.moveTo(C + ux * R1, C + uy * R1);
    ctx.lineTo(C + ux * (R1 - 10) - uy * 4, C + uy * (R1 - 10) + ux * 4);
    ctx.lineTo(C + ux * (R1 - 10) + uy * 4, C + uy * (R1 - 10) - ux * 4);
    ctx.closePath();
    ctx.fill();
  }
  // Sūrya
  const sg = ctx.createRadialGradient(sun.x, sun.y, 4, sun.x, sun.y, SUN_RADIUS * 2);
  sg.addColorStop(0, '#fde047');
  sg.addColorStop(0.5, '#f59e0b');
  sg.addColorStop(1, 'rgba(245,158,11,0)');
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, SUN_RADIUS * 2, 0, 2 * Math.PI);
  ctx.fill();
  const label = (txt: string, x: number, y: number, color: string) => {
    ctx.font = '600 12px "Noto Sans Devanagari", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.fillText(txt, x, y);
  };
  label(BODY_NAMES.sun[script], sun.x, sun.y + SUN_RADIUS + 22, '#fbbf24');
  // Pṛthivī
  ctx.save();
  ctx.shadowColor = '#60a5fa';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.arc(earth.x, earth.y, 6, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  label(BODY_NAMES.earth[script], earth.x, earth.y - 22, '#93c5fd');
  if (moon) {
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(moon.x, moon.y, 3, 0, 2 * Math.PI);
    ctx.fill();
    label(BODY_NAMES.moon[script], moon.x + 16, moon.y + 16, '#e2e8f0');
  }
};

const JyotishaOrbit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sunF, setSunF] = useState(1);
  const [earthF, setEarthF] = useState(1);
  const [speedF, setSpeedF] = useState(1);
  const [moonOn, setMoonOn] = useState(true);
  const [script, setScript] = useState<Script>('iast');
  const [showTrails, setShowTrails] = useState(true);
  const [playing, setPlaying] = useState(false);
  const sim = useRef<SimState>(makeState(1, 1, 1, true));
  const naksRef = useRef<HTMLElement>(null);
  const hudNaksRef = useRef<HTMLSpanElement>(null);
  const [read, setRead] = useState({ t: 0, years: 0, moonOrbits: 0, crossed: 0, status: 'ok' as SimState['status'], speed: 1, dist: 1 });

  const refresh = useCallback(() => {
    const s = sim.current;
    const [sun, earth] = s.bodies;
    setRead({
      t: s.t,
      years: Math.abs(s.earthAngle) / (2 * Math.PI),
      moonOrbits: Math.abs(s.moonAngle) / (2 * Math.PI),
      crossed: s.naksCrossed,
      status: s.status,
      speed: Math.hypot(earth.vx - sun.vx, earth.vy - sun.vy) / Math.sqrt(GM_SUN / A_EARTH),
      dist: Math.hypot(earth.x - sun.x, earth.y - sun.y) / A_EARTH,
    });
  }, []);

  const paint = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (cv.width !== SIZE * dpr) {
      cv.width = SIZE * dpr;
      cv.height = SIZE * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const s = sim.current;
    draw(ctx, s, script, showTrails);
    // The ring highlight and the nakṣatra readouts come from the same index in the same frame.
    const i = s.naksIdx;
    cv.dataset.naks = String(i);
    const full = `${NAKSHATRAS[i].dev} · ${NAKSHATRAS[i].iast}`;
    if (naksRef.current && naksRef.current.textContent !== full) {
      naksRef.current.textContent = full;
      naksRef.current.dataset.idx = String(i);
    }
    const short = naksName(i, script);
    if (hudNaksRef.current && hudNaksRef.current.textContent !== short) hudNaksRef.current.textContent = short;
  }, [script, showTrails]);

  const reset = useCallback(
    (sf = sunF, ef = earthF, vf = speedF, mo = moonOn) => {
      sim.current = makeState(sf, ef, vf, mo);
      refresh();
      paint();
    },
    [sunF, earthF, speedF, moonOn, refresh, paint],
  );

  // Re-paint when Candra is toggled so the freshly mounted readouts get filled in.
  useEffect(() => {
    paint();
  }, [paint, moonOn]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let frame = 0;
    const loop = () => {
      const s = sim.current;
      if (s.status !== 'fell' && s.status !== 'escaped') step(s);
      paint();
      frame += 1;
      if (frame % 6 === 0) refresh();
      if (s.status === 'fell' || s.status === 'escaped') {
        refresh();
        setPlaying(false);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, paint, refresh]);

  // Mass changes act live (like turning up gravity mid-orbit).
  const onSun = (v: number) => {
    setSunF(v);
    sim.current.bodies[0].m = GM_SUN * v;
    if (!playing) paint();
  };
  const onEarth = (v: number) => {
    setEarthF(v);
    const s = sim.current;
    s.bodies[1].m = GM_SUN * EARTH_RATIO * v;
    if (s.bodies[2]) s.bodies[2].m = s.bodies[1].m * MOON_RATIO;
  };
  // Starting speed is a starting condition, so it restarts the run.
  const onSpeed = (v: number) => {
    setSpeedF(v);
    reset(sunF, earthF, v, moonOn);
  };
  const preset = (v: number) => {
    setSpeedF(v);
    reset(sunF, earthF, v, moonOn);
    setPlaying(true);
  };

  const statusMsg: Record<SimState['status'], string> = {
    ok: 'Gravity pulls Pṛthivī toward Sūrya; its sideways speed keeps it falling around instead of in.',
    fell: '💥 Too slow! Pṛthivī fell into Sūrya. Gravity won because there was not enough sideways speed.',
    escaped: '🚀 Too fast! Pṛthivī escaped Sūrya’s pull and flew off into space.',
    'moon-lost': '🌑 Candra drifted away from Pṛthivī: the Sun’s pull out-tugged Pṛthivī’s. Try a gentler orbit or a heavier Pṛthivī.',
    'moon-crash': '🌑 Candra crashed into Pṛthivī in this run. Try Reset.',
  };

  return (
    <div className="vl-sim">
      <CoreIdea>
        In <strong lang="sa">ज्योतिष jyotiṣa</strong>, the traditional study of the heavenly lights, careful watchers tracked
        the Moon against 27 <strong>nakṣatras</strong> (star-markers). This sandbox uses real Newtonian gravity: every body
        pulls every other, and a small-step <em>Verlet</em> integrator moves them. Watch how speed decides between a steady
        orbit, falling in, or escaping, and see which nakṣatra Candra is in as it goes round.
      </CoreIdea>

      <div className="vl-sandbox" data-testid="orbit-sandbox">
        <div className="vl-orbit-grid">
          <div className="vl-stage-wrap">
            <HudFrame
              accent="#818cf8"
              tl={<>t {read.t.toFixed(1)} s</>}
              tr={moonOn ? <span ref={hudNaksRef} data-testid="orbit-hud-naks" /> : <>orbits {read.years.toFixed(2)}</>}
              bl={<>v ×{read.speed.toFixed(2)} · r ×{read.dist.toFixed(2)}</>}
              br={moonOn ? <>{read.crossed} nakṣatras</> : <>{read.status === 'ok' ? 'stable' : read.status}</>}
            >
              <canvas ref={canvasRef} className="vl-stage vl-stage--orbit" width={SIZE} height={SIZE} data-testid="orbit-canvas" aria-label="Orbit sandbox with Sūrya, Pṛthivī and Candra inside the ring of 27 nakṣatras" role="img" />
            </HudFrame>
            <p className="vl-hud-caption">Not to scale: sizes, distances and Pṛthivī’s mass are stretched so you can see Candra. The stars are so far away that only direction matters, so the dashed pointer carries Candra’s direction from Pṛthivī to the centre of the ring. Nakṣatras run Aśvinī → Bharaṇī → Kṛttikā… counter-clockwise, the way Candra moves.</p>
          </div>
          <div className="vl-controls">
            <div className="vl-leds">
              <LedButton kind="toggle" on={playing} color="#4ade80" onClick={() => setPlaying((p) => !p)} testId="orbit-play">{playing ? '⏸ Pause' : '▶ Play'}</LedButton>
              <LedButton kind="action" onClick={() => { setPlaying(false); reset(); }} testId="orbit-reset">↺ Reset</LedButton>
            </div>
            <div className="vl-dials">
              <DialKnob label={<>☀️ Sūrya mass</>} ariaLabel="Sūrya mass, times normal" value={sunF} min={0.5} max={2} step={0.05} onChange={onSun} format={(x) => `×${x.toFixed(2)}`} color="#fbbf24" testId="orbit-sun-mass" />
              <DialKnob label={<>🌍 Pṛthivī mass</>} ariaLabel="Pṛthivī mass, times normal" value={earthF} min={0.5} max={1.5} step={0.05} onChange={onEarth} format={(x) => `×${x.toFixed(2)}`} color="#60a5fa" testId="orbit-earth-mass" />
            </div>
            <GlowSlider label={<>💨 Pṛthivī starting speed</>} value={speedF} min={0.2} max={1.8} step={0.05} onChange={onSpeed} valueText={`×${speedF.toFixed(2)} of circular`} color="#22d3ee" ariaLabel="Pṛthivī starting speed, times circular speed" testId="orbit-speed" />
            <div className="vl-leds">
              <LedButton kind="action" color="#fb923c" onClick={() => preset(0.3)} testId="orbit-too-slow">🐢 Too slow</LedButton>
              <LedButton kind="action" color="#4ade80" onClick={() => preset(1)} testId="orbit-just-right">🙂 Just right</LedButton>
              <LedButton kind="action" color="#f472b6" onClick={() => preset(1.5)} testId="orbit-too-fast">🚀 Too fast</LedButton>
            </div>
            <div className="vl-leds" role="radiogroup" aria-label="Name script">
              {(['dev', 'iast', 'en'] as Script[]).map((sc) => (
                <LedButton key={sc} kind="radio" on={script === sc} color="#a78bfa" onClick={() => setScript(sc)}>
                  {sc === 'dev' ? 'देवनागरी' : sc === 'iast' ? 'IAST' : 'English'}
                </LedButton>
              ))}
            </div>
            <div className="vl-leds">
              <LedButton kind="toggle" on={showTrails} color="#60a5fa" onClick={() => setShowTrails((x) => !x)} testId="orbit-trails">Path trails</LedButton>
              <LedButton kind="toggle" on={moonOn} color="#e2e8f0" onClick={() => { const nx = !moonOn; setMoonOn(nx); setPlaying(false); reset(sunF, earthF, speedF, nx); }} testId="orbit-moon">Include Candra</LedButton>
            </div>

            <div className="vl-readout-grid" data-testid="orbit-readouts">
              <span>Time</span><b data-testid="orbit-time">{read.t.toFixed(1)} s</b>
              <span>Pṛthivī orbits</span><b>{read.years.toFixed(2)}</b>
              <span>Speed (× circular)</span><b>{read.speed.toFixed(2)}</b>
              <span>Distance (× start)</span><b>{read.dist.toFixed(2)}</b>
              {moonOn && (
                <>
                  <span>Candra is in</span><b className="vl-naks" data-testid="orbit-naks" ref={naksRef} />
                  <span>Candra orbits (vs stars)</span><b>{read.moonOrbits.toFixed(2)}</b>
                  <span>Nakṣatras crossed</span><b data-testid="orbit-crossed">{read.crossed}</b>
                </>
              )}
            </div>
            <p className={`vl-msg${read.status === 'ok' ? '' : ' is-alert'}`} role="status" data-testid="orbit-status">{statusMsg[read.status]}</p>
          </div>
        </div>
      </div>

      <div className="vl-note">
        <strong>The real sky:</strong> Candra goes once round the starry sky in a <em>sidereal month</em> of about 27.3 days, so
        it moves through roughly one nakṣatra per day. In this sandbox time is sped up, but the rule is the same: one full
        orbit against the stars carries Candra through all 27.
      </div>

      <div className="vl-grid-2">
        <section className="vl-panel" aria-label="Graha names">
          <h3 className="vl-panel-title"><span aria-hidden="true">🪐</span> Graha names</h3>
          <table className="vl-table">
            <thead><tr><th>देवनागरी</th><th>IAST</th><th>English</th></tr></thead>
            <tbody>
              {GRAHAS.map((g) => (
                <tr key={g.iast}>
                  <td lang="sa">{g.dev}</td>
                  <td>{g.iast}</td>
                  <td>{g.en}{g.note && <small className="vl-small"> ({g.note})</small>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="vl-small">Rāhu and Ketu are the <strong>lunar nodes</strong>: the two points where Candra’s path crosses Sūrya’s yearly path (the ecliptic). They are points, not bodies; eclipses happen when the Sun and Moon are near them. Pṛthivī is where we watch from, so she is not in this list.</p>
          <details className="vl-details">
            <summary>All 27 nakṣatras, in order</summary>
            <ol className="vl-naks-list">
              {NAKSHATRAS.map((n) => (<li key={n.iast}><span lang="sa">{n.dev}</span> {n.iast}</li>))}
            </ol>
          </details>
        </section>
        <div>
          <TermPanel terms={TERMS} />
          <ChallengeList items={CHALLENGES} />
        </div>
      </div>
    </div>
  );
};

export default JyotishaOrbit;
