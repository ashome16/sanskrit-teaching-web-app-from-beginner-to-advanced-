import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CoreIdea, TermPanel, type LabTerm } from './common';
import { DialKnob, GlowSlider, HudFrame, LedButton } from './controls';
import { isSmallScreen, prefersReducedMotion } from './motion';

type Phase = 'orbit' | 'descent' | 'rover';
type Outcome = 'flying' | 'soft' | 'crash';

const MOON_G = 1.62; // m/s², lunar surface gravity (public value)
const MOON_R_KM = 1737.4; // mean lunar radius
/** ISRO Chandrayaan-3 lander touchdown spec: vertical velocity ≤ 2 m/s. The lab asks for under 2 m/s on the displayed (2-decimal) readout. */
const SOFT_VY = 2;
/** Samatva limit used by the lab (ISRO's slope spec is ≤ 12°; here tilt stands in for it). */
const SAMATVA_LIMIT = 12;
const TARGET_ALT_KM = 100; // Chandrayaan-3 lander went into a ~100 km circular lunar orbit before descent
const DESCENT_H0 = 80; // m, start of this terminal-descent sandbox
const MAX_THRUST_A = 3.2; // m/s² at 100% throttle (play value; hover ≈ 51% under lunar g)
const ASSIST_MAX = 0.35; // m/s² — guidance assist can only add this much braking
const ASSIST_BELOW_M = 30; // assist only works in the last 30 m

// Site and Sun (for the rover phase)
const SITE_LAT = -69.37; // Shiv Shakti Point (ISRO-reported touchdown site)
const SITE_LON = 32.32;
const MAX_SUN_EL = 90 - Math.abs(SITE_LAT); // ≈ 20.6° — the Sun never climbs higher here
const WORLD_W = 16; // m — rover map width
const WORLD_H = 9; // m — rover map height
const ROVER_SIM_SPEED = 0.9; // m/s on the map at full drive (time-warped)
const PRAGYAN_REAL_CMS = 1; // ISRO: Pragyan moves at about 1 cm/s
const TIME_WARP = Math.round((ROVER_SIM_SPEED * 100) / PRAGYAN_REAL_CMS);
const VIKRAM = { x: 4.4, y: 4.9 };
const ROVER_START = { x: 6.3, y: 4.9 };

const TERMS: LabTerm[] = [
  { dev: 'कक्षा', iast: 'kakṣyā', tag: 'ORBIT // Path Ring', game: 'The path a craft follows around a body. In the HUD: altitude of your orbit.', en: 'orbit, enclosure' },
  { dev: 'गति', iast: 'gati', tag: 'MOTION // Path Speed', game: 'How the craft or rover is moving. On the surface: Pragyan’s pace (real rover ≈ 1 cm/s).', en: 'motion, course' },
  { dev: 'वेग', iast: 'vega', tag: 'MOTION // Speed Readout', game: 'Speed magnitude. Soft-land when vertical vega is under 2 m/s.', en: 'speed, velocity' },
  { dev: 'उच्चता', iast: 'uccatā', tag: 'HEIGHT // Altitude', game: 'Height above the ground during descent.', en: 'height' },
  { dev: 'गुरुत्वाकर्षण', iast: 'gurutvākarṣaṇa', tag: 'FORCE // Gravity Pull', game: 'The pull of a mass. Earth ≈ 9.81 m/s²; Moon ≈ 1.62 m/s² at the surface.', en: 'gravitation' },
  { dev: 'चन्द्र-भूमि', iast: 'candra-bhūmi', tag: 'WORLD // Lunar Ground', game: 'The Moon’s surface — your landing and rover stage.', en: 'lunar ground' },
  { dev: 'तिथि', iast: 'tithi', tag: 'CALENDAR // Lunar Day', game: 'In Jyotiṣa a tithi is each 12° step of the Moon’s elongation from the Sun. That same angle sets the time of day at a lunar site, so here it drives the Sūrya window.', en: 'lunar day' },
  { dev: 'नक्षत्र', iast: 'nakṣatra', tag: 'SKY // Lunar Mansion', game: 'One of the 27 lunar mansions (Jyotiṣa). Teaching parallel only — not a claim that Jyotiṣa predicts thruster burns.', en: 'lunar mansion' },
  { dev: 'सूर्य', iast: 'sūrya', tag: 'POWER // Sun Gate', game: 'Sunlight. Pragyan’s solar panel needs the Sun above the horizon.', en: 'Sun' },
  { dev: 'प्राणोदन', iast: 'prāṇodana', tag: 'THRUST // Burn Dial', game: 'The thruster burn that drives, brakes or steadies the craft.', en: 'propulsion, thrust', note: 'teaching label for thrusters in this lab' },
  { dev: 'समत्व', iast: 'samatva', tag: 'ATTITUDE // Level Craft', game: 'Keep the lander level (within ±12°) at touchdown or it tips.', en: 'evenness, balance' },
  { dev: 'पृथिवी-तत्त्व', iast: 'pṛthivī-tattva', tag: 'SCAN // Rock Elements', game: 'Earth-element: solid minerals the LIBS-style scan can tag (S, Al, Fe, Ca…).', en: 'earth principle' },
  { dev: 'अप्-तत्त्व', iast: 'ap-tattva', tag: 'SCAN // Water Hunt', game: 'Water principle: ice/water as a science goal. Pragyan’s LIBS confirmed sulphur; hydrogen/ice investigation was reported as underway — not the same as a confirmed ice find.', en: 'water principle' },
  { dev: 'शकलम्', iast: 'śakalam', tag: 'LOOT // Data Shard', game: 'A fragment. Each LIBS scan drops a data shard named in Sanskrit.', en: 'fragment, piece' },
  { dev: 'सोमयानम्', iast: 'somayānam', tag: 'MISSION // Moon Craft', game: 'This lab’s Sanskrit name for a Moon-going craft. Chandrayaan is the ISRO program name.', en: 'Moon-going vehicle' },
  { dev: 'विक्रम', iast: 'vikrama', tag: 'LANDER // Soft Touch', game: 'The Chandrayaan-3 lander that soft-landed on 23 Aug 2023.', en: 'valour; name of the lander' },
  { dev: 'प्रज्ञान', iast: 'prajñāna', tag: 'ROVER // Smart Crawl', game: 'The Chandrayaan-3 rover that rolled onto Candra-Bhūmi.', en: 'wisdom, discernment; name of the rover' },
];

const PHASES: { id: Phase; en: string; sa: string }[] = [
  { id: 'orbit', en: 'Vyoma Insertion', sa: 'व्योम-प्रवेशः' },
  { id: 'descent', en: 'Vikram Descent', sa: 'विक्रम-अवतरणम्' },
  { id: 'rover', en: 'Pragyan Probe', sa: 'प्रज्ञान-अन्वेषणम्' },
];

interface Hud {
  altKm: number;
  ecc: number;
  vega: number;
  g: number;
  h: number;
  vy: number;
  attitude: number;
  fuel: number;
  battery: number;
  gati: number;
  dist: number;
  odo: number;
  rx: number;
  ry: number;
  heading: number;
  tamas: boolean;
  status: string;
  statusSa: string;
}

interface Mineral {
  id: string;
  sa: string;
  iast: string;
  en: string;
  kind: 'prithivi' | 'ap';
  note: string;
  shard: string;
  shardIast: string;
  color: string;
  /** Well-known atomic emission lines (nm) — illustrative, not Pragyan data. */
  lines: number[];
  x: number;
  y: number;
}

const MINERALS: Mineral[] = [
  { id: 'S', sa: 'गन्धकः', iast: 'gandhakaḥ', en: 'Sulphur (S)', kind: 'prithivi', note: 'Pragyan LIBS: first in-situ confirmation near the south pole (ISRO, 28 Aug 2023).', shard: 'गन्धक-शकलम्', shardIast: 'gandhaka-śakalam', color: '#facc15', lines: [921.3, 922.8, 923.8], x: 8.6, y: 2.4 },
  { id: 'Al', sa: 'मृत्तिका-धातुः', iast: 'mṛttikā-dhātuḥ', en: 'Aluminium (Al)', kind: 'prithivi', note: 'Reported in preliminary LIBS analyses with S, Ca, Fe and others.', shard: 'मृत्तिका-धातु-शकलम्', shardIast: 'mṛttikā-dhātu-śakalam', color: '#e2e8f0', lines: [394.4, 396.2], x: 12.4, y: 3.0 },
  { id: 'Fe', sa: 'अयस्', iast: 'ayas', en: 'Iron (Fe)', kind: 'prithivi', note: 'Reported in preliminary LIBS analyses.', shard: 'अयः-शकलम्', shardIast: 'ayaḥ-śakalam', color: '#fb923c', lines: [372.0, 373.5, 374.6, 382.0, 404.6, 438.4], x: 13.4, y: 6.9 },
  { id: 'Ca', sa: 'चूर्ण-धातुः', iast: 'cūrṇa-dhātuḥ', en: 'Calcium (Ca)', kind: 'prithivi', note: 'Reported in preliminary LIBS analyses.', shard: 'चूर्ण-धातु-शकलम्', shardIast: 'cūrṇa-dhātu-śakalam', color: '#fef3c7', lines: [393.4, 396.8, 422.7], x: 9.4, y: 7.3 },
  { id: 'H', sa: 'अप्-संकेतः', iast: 'ap-saṅketaḥ', en: 'Hydrogen (H) · ice hunt', kind: 'ap', note: 'ISRO said thorough investigation for hydrogen was underway — not claimed as confirmed ice by LIBS in the same report as sulphur.', shard: 'अप्-संकेत-शकलम्', shardIast: 'ap-saṅketa-śakalam', color: '#38bdf8', lines: [656.3], x: 2.4, y: 7.4 },
];

/** Rover-map craters (m). Kept clear of Vikram, the ramp and the sample spots. */
const CRATERS = [
  { x: 10.6, y: 5.2, r: 1.15 },
  { x: 6.1, y: 7.7, r: 0.75 },
  { x: 14.6, y: 1.9, r: 0.85 },
  { x: 1.7, y: 2.0, r: 1.0 },
  { x: 12.0, y: 8.3, r: 0.5 },
  { x: 4.0, y: 1.3, r: 0.4 },
];
/** Side-view craters for the descent (fraction of width). Landing zone 0.40–0.60 kept clear. */
const DESCENT_CRATERS = [
  { x: 0.16, r: 0.07 },
  { x: 0.31, r: 0.035 },
  { x: 0.72, r: 0.06 },
  { x: 0.88, r: 0.04 },
];

/** Deterministic PRNG so the regolith looks the same every frame. */
const rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const BOULDERS = (() => {
  const r = rng(42);
  const out: { x: number; y: number; r: number }[] = [];
  while (out.length < 26) {
    const b = { x: 0.4 + r() * 15.2, y: 0.4 + r() * 8.2, r: 0.05 + r() * 0.13 };
    const nearSpot = MINERALS.some((m) => Math.hypot(m.x - b.x, m.y - b.y) < 0.9);
    const nearCraft = Math.hypot(VIKRAM.x - b.x, VIKRAM.y - b.y) < 1.8 || Math.hypot(ROVER_START.x - b.x, ROVER_START.y - b.y) < 0.8;
    const inCrater = CRATERS.some((c) => Math.hypot(c.x - b.x, c.y - b.y) < c.r + 0.2);
    if (!nearSpot && !nearCraft && !inCrater) out.push(b);
  }
  return out;
})();

const tithiName = (t: number) => (t <= 15 ? (t === 15 ? 'Pūrṇimā' : `Śukla ${t}`) : t === 30 ? 'Amāvāsyā' : `Kṛṣṇa ${t - 15}`);

/**
 * Sun at Shiv Shakti Point from a tithi. Tithi k spans Moon–Sun elongation (k−1)·12°…k·12°.
 * Sub-solar longitude ≈ 180° − elongation (near side, libration and the ~1.5° tilt ignored).
 */
const sunFromTithi = (t: number) => {
  const E = (t - 0.5) * 12;
  let H = SITE_LON - (180 - E);
  H = ((H + 540) % 360) - 180;
  const rad = Math.PI / 180;
  const phi = SITE_LAT * rad;
  const up = Math.cos(phi) * Math.cos(H * rad);
  const el = Math.asin(Math.max(-1, Math.min(1, up))) / rad;
  const east = -Math.sin(H * rad);
  const north = -Math.sin(phi) * Math.cos(H * rad);
  const n = Math.hypot(east, north) || 1;
  // Canvas: x → east, y → south. Unit vector pointing toward the Sun on the map.
  const sx = east / n;
  const sy = -north / n;
  const power = el > 0 ? Math.min(1, 0.3 + (el / MAX_SUN_EL) * 0.7) : 0; // panel tilted toward a low Sun
  return { el, sx, sy, power, morning: H < 0 };
};

const Chandrayaan: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('orbit');
  const [paused, setPaused] = useState(() => prefersReducedMotion());
  const [outcome, setOutcome] = useState<Outcome>('flying');
  const [crashWhy, setCrashWhy] = useState('');
  const [orbitDone, setOrbitDone] = useState(false);
  const [softDone, setSoftDone] = useState(false);
  const [burn, setBurn] = useState(0);
  const [vertThrust, setVertThrust] = useState(0);
  const [attitudeCmd, setAttitudeCmd] = useState(0);
  const [assist, setAssist] = useState(true);
  const [roverDrive, setRoverDrive] = useState(0);
  const [roverSteer, setRoverSteer] = useState(0);
  const [tithi, setTithi] = useState(7);
  const [scanned, setScanned] = useState<string[]>([]);
  const [scanMsg, setScanMsg] = useState('Roll Pragyan onto a glowing spot, then fire LIBS.');
  const [pop, setPop] = useState<{ mid: string; left: number; anchorY: number; n: number } | null>(null);
  const [hud, setHud] = useState<Hud>({
    altKm: 150, ecc: 0.45, vega: 1.6, g: MOON_G, h: DESCENT_H0, vy: 5, attitude: 0, fuel: 100, battery: 100,
    gati: 0, dist: 0, odo: 0, rx: ROVER_START.x, ry: ROVER_START.y, heading: 0,
    tamas: false, status: 'Match Candra-Kakṣyā (~100 km circular).', statusSa: 'चन्द्र-कक्षां समं कुरु।',
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sim = useRef({
    alt: 150, e: 0.45, vx: 1.6,
    h: DESCENT_H0, vy: 5, att: 5, fuel: 100, x: 0,
    rx: ROVER_START.x, ry: ROVER_START.y, heading: 0, battery: 100, odo: 0, bump: 0,
    trail: [] as { x: number; y: number; h: number }[],
    t: 0, burnTime: 0,
  });
  const input = useRef({ burn: 0, vert: 0, att: 0, drive: 0, steer: 0, tithi: 7, assist: true });
  const phaseRef = useRef(phase);
  const pauseRef = useRef(paused);
  const outRef = useRef(outcome);
  const visibleRef = useRef(true);
  const scannedRef = useRef<string[]>([]);
  const reducedRef = useRef(prefersReducedMotion());
  const texRef = useRef<{ key: string; c: HTMLCanvasElement } | null>(null);
  const raf = useRef(0);
  const stepRef = useRef<(dt: number) => void>(() => {});
  const drawRef = useRef<(ctx: CanvasRenderingContext2D, W: number, H: number) => void>(() => {});

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { pauseRef.current = paused; }, [paused]);
  useEffect(() => { outRef.current = outcome; }, [outcome]);
  useEffect(() => { input.current.burn = burn; }, [burn]);
  useEffect(() => { input.current.vert = vertThrust; }, [vertThrust]);
  useEffect(() => { input.current.att = attitudeCmd; }, [attitudeCmd]);
  useEffect(() => { input.current.assist = assist; }, [assist]);
  useEffect(() => { input.current.drive = roverDrive; }, [roverDrive]);
  useEffect(() => { input.current.steer = roverSteer; }, [roverSteer]);
  useEffect(() => { input.current.tithi = tithi; }, [tithi]);
  useEffect(() => { scannedRef.current = scanned; }, [scanned]);
  useEffect(() => {
    if (!pop) return;
    const t = window.setTimeout(() => setPop(null), 6000);
    return () => window.clearTimeout(t);
  }, [pop]);

  // Place the LIBS pop-up next to its spot, measured so it never sits on the corner HUD chips.
  const popRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = popRef.current;
    const canvas = canvasRef.current;
    if (!pop || !el || !canvas) return;
    const H = canvas.clientHeight;
    const ph = el.offsetHeight;
    const band = 34; // corner chip band (top and bottom)
    let top = pop.anchorY > H / 2 ? pop.anchorY - ph - 16 : pop.anchorY + 16;
    top = Math.max(band, Math.min(H - band - ph, top));
    el.style.top = `${Math.max(4, top)}px`;
  }, [pop]);

  const resetOrbit = useCallback(() => {
    Object.assign(sim.current, { alt: 150, e: 0.45, vx: 1.6, burnTime: 0 });
    setBurn(0); setOrbitDone(false); setOutcome('flying');
    setHud((h) => ({ ...h, altKm: 150, ecc: 0.45, vega: 1.6, tamas: false, status: 'Match Candra-Kakṣyā (~100 km circular).', statusSa: 'चन्द्र-कक्षां समं कुरु।' }));
  }, []);

  const resetDescent = useCallback(() => {
    Object.assign(sim.current, { h: DESCENT_H0, vy: 5, att: 5, fuel: 100, x: 0, t: 0 });
    setVertThrust(0); setAttitudeCmd(0); setOutcome('flying'); setCrashWhy('');
    outRef.current = 'flying';
    setHud((h) => ({ ...h, h: DESCENT_H0, vy: 5, g: MOON_G, attitude: 5, fuel: 100, tamas: true, status: 'Powered descent to Shiv Shakti Point.', statusSa: 'शिव-शक्ति-बिन्दुं प्रति अवतर।' }));
  }, []);

  const resetRover = useCallback(() => {
    Object.assign(sim.current, { rx: ROVER_START.x, ry: ROVER_START.y, heading: 0, battery: 100, odo: 0, bump: 0, trail: [] });
    setRoverDrive(0); setRoverSteer(0); setScanned([]); setPop(null);
    setScanMsg('Roll Pragyan onto a glowing spot, then fire LIBS.');
    setHud((h) => ({ ...h, g: MOON_G, battery: 100, gati: 0, dist: Math.hypot(ROVER_START.x - VIKRAM.x, ROVER_START.y - VIKRAM.y), odo: 0, rx: ROVER_START.x, ry: ROVER_START.y, heading: 0, status: 'Drive Pragyan. Stay in the Sūrya window.', statusSa: 'प्रज्ञानं नय। सूर्य-प्रकाशे तिष्ठ।' }));
  }, []);

  const restartCrash = () => {
    resetDescent();
    setPhase('descent');
  };

  // Off-screen / hidden-tab pause for drawing
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; }, { threshold: 0.05, rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const step = (dt: number) => {
    const s = sim.current;
    const ph = phaseRef.current;
    s.t += dt;
    if (ph === 'orbit') {
      const b = input.current.burn / 100;
      const mag = Math.abs(b);
      s.e = Math.max(0, Math.min(0.9, s.e - mag * 0.4 * dt + (mag < 0.05 ? 0.015 * dt : 0)));
      s.alt += (TARGET_ALT_KM - s.alt) * (0.15 + mag * 1.2) * dt;
      // Circular speed at this altitude: v = √(GM/r), GM_moon ≈ 4902.8 km³/s²
      s.vx = Math.sqrt(4902.8 / (MOON_R_KM + s.alt)) * (1 + s.e * 0.25);
      if (mag > 0.55) s.burnTime += dt; else s.burnTime = Math.max(0, s.burnTime - dt * 0.5);
      const circular = (s.e < 0.1 && Math.abs(s.alt - TARGET_ALT_KM) < 15) || s.burnTime > 2.2;
      if (circular) { s.e = Math.min(s.e, 0.05); s.alt = TARGET_ALT_KM + (s.alt - TARGET_ALT_KM) * 0.2; }
      const gAlt = MOON_G * (MOON_R_KM / (MOON_R_KM + s.alt)) ** 2;
      setHud((h) => ({
        ...h, altKm: s.alt, ecc: s.e, vega: s.vx, g: gAlt,
        tamas: s.e > 0.35 && !circular,
        status: circular ? 'Candra-Kakṣyā matched. Unlock Vikram Descent.' : 'Burn Prāṇodana to circularise near 100 km.',
        statusSa: circular ? 'कक्षा सिद्धा। अवतरणं उद्घाटय।' : 'प्राणोदनेन कक्षा समीकुरु।',
      }));
      if (circular) setOrbitDone(true);
    } else if (ph === 'descent') {
      const thr = s.fuel > 0 ? input.current.vert : 0;
      const aCmd = input.current.att;
      const assistOn = input.current.assist;
      let a = MOON_G - thr * MAX_THRUST_A; // + = speeding up downward
      // Guidance assist: brake-only, bounded, last 30 m, needs pilot throttle and near-level attitude.
      if (assistOn && thr > 0.2 && s.h < ASSIST_BELOW_M && Math.abs(s.att) < SAMATVA_LIMIT) {
        const target = Math.min(1.6, 0.7 + s.h * 0.04);
        if (s.vy > target) a -= Math.min(ASSIST_MAX, (s.vy - target) * 0.8);
      }
      s.vy += a * dt;
      s.h -= s.vy * dt;
      if (s.h > 120) { s.h = 120; s.vy = Math.max(0, s.vy); }
      // Attitude: a slow wobble the pilot must trim; assist adds damping.
      const disturb = 2.2 + 2.8 * Math.sin(s.t * 0.6);
      const damp = assistOn ? 0.95 : 0.3;
      s.att += (aCmd * 40 + disturb - s.att * damp) * dt;
      if (thr > 0.02) s.fuel = Math.max(0, s.fuel - thr * 1.5 * dt);
      s.x += Math.sin((s.att * Math.PI) / 180) * 12 * dt;
      const brakeNeed = s.vy > 0 && s.h > 0.5 ? (s.vy * s.vy) / (2 * s.h) : 0;
      const tamas = s.vy > 6 || brakeNeed > 1.2 || Math.abs(s.att) > SAMATVA_LIMIT;
      setHud((h) => ({
        ...h, h: Math.max(0, s.h), vy: s.vy, g: MOON_G, attitude: s.att, fuel: s.fuel,
        tamas,
        status: tamas ? 'Tamas rising — brake and level!' : 'Hold Samatva; touch down under 2 m/s.',
        statusSa: tamas ? 'तमः वर्धते — वेगं समत्वं च साधय।' : 'समत्वं धृत्वा मन्दं स्पृश।',
      }));
      if (s.h <= 0) {
        s.h = 0;
        const vyShown = Math.round(s.vy * 100) / 100;
        const attShown = Math.round(Math.abs(s.att));
        const lx = 0.5 + s.x / 160;
        const inCrater = DESCENT_CRATERS.some((c) => Math.abs(lx - c.x) < c.r * 0.8);
        const soft = vyShown < SOFT_VY && attShown < SAMATVA_LIMIT && !inCrater;
        setOutcome(soft ? 'soft' : 'crash');
        outRef.current = soft ? 'soft' : 'crash';
        if (soft) {
          setSoftDone(true);
          setHud((h) => ({ ...h, h: 0, vy: s.vy, attitude: s.att, tamas: false, status: `Soft landing at Shiv Shakti Point — ${vyShown.toFixed(2)} m/s.`, statusSa: 'शिव-शक्ति-बिन्दौ मृदु-स्पर्शः!' }));
        } else {
          const why = inCrater
            ? 'Touched down inside a crater hazard — drifted off the flat zone.'
            : vyShown >= SOFT_VY
              ? `Impact Vega ${vyShown.toFixed(2)} m/s (target under 2 m/s).`
              : `Samatva ${attShown}° (limit ±${SAMATVA_LIMIT}°) — the lander tipped.`;
          setCrashWhy(why);
          setHud((h) => ({ ...h, h: 0, vy: s.vy, attitude: s.att, tamas: true, status: 'Descent Sequence Interrupted', statusSa: 'विक्षेप दोषः' }));
        }
      }
    } else {
      const sun = sunFromTithi(input.current.tithi);
      const drive = input.current.drive;
      const load = 0.4 + Math.abs(drive) * 2.6;
      s.battery = Math.max(0, Math.min(100, s.battery + (sun.power * 2.2 - load) * dt));
      let gati = 0;
      if (s.battery > 5) {
        s.heading += input.current.steer * 60 * dt;
        const sp = drive * ROVER_SIM_SPEED;
        const nx = s.rx + Math.cos((s.heading * Math.PI) / 180) * sp * dt;
        const ny = s.ry + Math.sin((s.heading * Math.PI) / 180) * sp * dt;
        const blocked = CRATERS.some((c) => Math.hypot(nx - c.x, ny - c.y) < c.r * 0.85)
          || Math.hypot(nx - VIKRAM.x, ny - VIKRAM.y) < 1.05;
        if (!blocked) {
          const cx = Math.max(0.6, Math.min(WORLD_W - 0.6, nx));
          const cy = Math.max(0.9, Math.min(WORLD_H - 0.9, ny));
          const moved = Math.hypot(cx - s.rx, cy - s.ry);
          s.odo += moved;
          s.rx = cx; s.ry = cy;
          gati = Math.abs(drive) * PRAGYAN_REAL_CMS;
          const last = s.trail[s.trail.length - 1];
          if (!last || Math.hypot(last.x - s.rx, last.y - s.ry) > 0.12) {
            s.trail.push({ x: s.rx, y: s.ry, h: s.heading });
            if (s.trail.length > 900) s.trail.shift();
          }
        } else if (Math.abs(drive) > 0.05) {
          s.bump = 1.5;
        }
      }
      s.bump = Math.max(0, s.bump - dt);
      const dist = Math.hypot(s.rx - VIKRAM.x, s.ry - VIKRAM.y);
      const night = sun.el <= 0;
      const lowBatt = s.battery < 15;
      setHud((h) => ({
        ...h, g: MOON_G, battery: s.battery, gati, dist, odo: s.odo, rx: s.rx, ry: s.ry, heading: s.heading,
        tamas: night || lowBatt || s.bump > 0,
        status: night
          ? 'Lunar night at the site — no Sūrya. (ISRO put Pragyan to sleep on 2 Sep 2023 before nightfall.)'
          : s.bump > 0
            ? 'Crater rim ahead — reverse and re-route (ISRO re-routed Pragyan around a ~4 m crater on 27 Aug 2023).'
            : lowBatt
              ? 'Battery low — idle in the Sūrya window to recharge.'
              : 'Scan Pṛthivī-tattva spots. Ap-tattva is a hunt, not a claim.',
        statusSa: night ? 'रात्रिः — सूर्य-प्रकाशः नास्ति।' : s.bump > 0 ? 'गर्तः पुरतः — परावर्तस्व।' : 'पृथिवी-तत्त्वं अन्विष्य।',
      }));
    }
  };

  /** Pre-rendered grey regolith (speckles + craterlets), cached per canvas size. */
  const regolith = (W: number, H: number) => {
    const key = `${Math.round(W)}x${Math.round(H)}`;
    if (texRef.current?.key === key) return texRef.current.c;
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(W));
    c.height = Math.max(1, Math.round(H));
    const x = c.getContext('2d');
    if (x) {
      const g = x.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#8d8f93');
      g.addColorStop(0.55, '#7a7c80');
      g.addColorStop(1, '#68696d');
      x.fillStyle = g;
      x.fillRect(0, 0, W, H);
      const r = rng(7);
      const n = Math.round((W * H) / 70);
      for (let i = 0; i < n; i++) {
        const v = 70 + Math.floor(r() * 90);
        x.fillStyle = `rgba(${v},${v},${v + 2},${0.25 + r() * 0.35})`;
        const sz = r() < 0.9 ? 1 : 2;
        x.fillRect(r() * W, r() * H, sz, sz);
      }
      for (let i = 0; i < 70; i++) {
        const cx = r() * W;
        const cy = r() * H;
        const rr = 1.5 + r() * 5;
        x.beginPath(); x.arc(cx, cy, rr, 0, Math.PI * 2);
        x.fillStyle = 'rgba(40,42,46,0.28)'; x.fill();
        x.beginPath(); x.arc(cx + rr * 0.25, cy + rr * 0.25, rr * 0.75, 0, Math.PI * 2);
        x.fillStyle = 'rgba(190,192,196,0.18)'; x.fill();
      }
    }
    texRef.current = { key, c };
    return c;
  };

  const draw = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
    const s = sim.current;
    const ph = phaseRef.current;
    const now = reducedRef.current ? 0 : performance.now() / 1000;
    ctx.clearRect(0, 0, W, H);
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#020617');
    sky.addColorStop(1, '#0b1120');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    if (ph === 'orbit' || ph === 'descent') {
      for (let i = 0; i < 46; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.2 + (i % 5) * 0.12})`;
        ctx.fillRect((i * 97) % W, (i * 53) % (H * 0.6), 1.4, 1.4);
      }
    }

    if (ph === 'orbit') {
      const cx0 = W * 0.5;
      const cy0 = H * 0.52;
      const R = Math.min(W, H) * 0.2;
      // Moon lit from the left (low-angle terminator)
      const mg = ctx.createRadialGradient(cx0 - R * 0.4, cy0 - R * 0.3, R * 0.1, cx0, cy0, R);
      mg.addColorStop(0, '#d6d3d1');
      mg.addColorStop(0.7, '#9ca3af');
      mg.addColorStop(1, '#4b5563');
      ctx.beginPath(); ctx.arc(cx0, cy0, R, 0, Math.PI * 2); ctx.fillStyle = mg; ctx.fill();
      ctx.fillStyle = 'rgba(30,41,59,0.35)';
      [[-0.3, -0.1, 0.18], [0.25, 0.2, 0.12], [0.05, -0.4, 0.09], [-0.1, 0.45, 0.1]].forEach(([dx, dy, rr]) => {
        ctx.beginPath(); ctx.arc(cx0 + dx * R, cy0 + dy * R, rr * R, 0, Math.PI * 2); ctx.fill();
      });
      // south-pole marker
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(cx0 + R * 0.12, cy0 + R * 0.93, 3, 0, Math.PI * 2); ctx.fill();
      const rT = Math.min(W, H) * 0.32;
      ctx.strokeStyle = 'rgba(52,211,153,0.5)';
      ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.ellipse(cx0, cy0, rT, rT * 0.55, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      const rA = rT * (0.7 + (s.alt - 80) / 200);
      const e = s.e;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(cx0 + e * 28, cy0, rA * (1 + e * 0.35), rA * 0.5 * (1 - e * 0.2), e * 0.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1;
      const ang = s.t * 0.7;
      const px = cx0 + e * 28 + Math.cos(ang) * rA * (1 + e * 0.35);
      const py = cy0 + Math.sin(ang) * rA * 0.5 * (1 - e * 0.2);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(px - 5, py - 3, 10, 6);
      if (Math.abs(input.current.burn) > 8) {
        ctx.strokeStyle = '#fb923c';
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - Math.sign(input.current.burn) * 16, py + 8); ctx.stroke();
      }
      ctx.fillStyle = '#99f6e4';
      ctx.font = '11px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Candra-Kakṣyā target ~100 km', cx0, cy0 + rT * 0.55 + 16);
      ctx.textAlign = 'start';
    } else if (ph === 'descent') {
      const groundY = H * 0.8;
      // Low Sun from the left: lit regolith, long shadows to the right
      const gg = ctx.createLinearGradient(0, groundY - 10, 0, H);
      gg.addColorStop(0, '#a3a5a9');
      gg.addColorStop(0.25, '#7d7f83');
      gg.addColorStop(1, '#4a4b4f');
      ctx.fillStyle = gg;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      for (let x = 0; x <= W; x += 6) ctx.lineTo(x, groundY + Math.sin(x * 0.035) * 4 + Math.sin(x * 0.11) * 1.5);
      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
      DESCENT_CRATERS.forEach((c) => {
        const cx = c.x * W;
        const rw = c.r * W;
        const rh = Math.max(4, rw * 0.22);
        ctx.beginPath(); ctx.ellipse(cx, groundY + 3, rw, rh, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#2b2c30'; ctx.fill();
        // sunlit far (right) wall
        ctx.save();
        ctx.beginPath(); ctx.ellipse(cx, groundY + 3, rw, rh, 0, 0, Math.PI * 2); ctx.clip();
        ctx.beginPath(); ctx.ellipse(cx + rw * 0.75, groundY + 3, rw, rh, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#b4b6ba'; ctx.fill();
        ctx.restore();
        // raised rims catching light on the sun side
        ctx.strokeStyle = 'rgba(235,235,230,0.7)';
        ctx.beginPath(); ctx.ellipse(cx, groundY + 2, rw * 1.03, rh * 1.15, 0, Math.PI * 0.95, Math.PI * 1.45); ctx.stroke();
      });
      // landing flag (above the ground, clear of the HUD corners)
      const fx = W * 0.5;
      ctx.strokeStyle = '#fbbf24';
      ctx.beginPath(); ctx.moveTo(fx + 34, groundY); ctx.lineTo(fx + 34, groundY - 16); ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(fx + 34, groundY - 16, 9, 6);
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillText('Shiv Shakti Point', fx + 46, groundY - 8);
      const lx = W * (0.5 + s.x / 160);
      const legs = 18;
      const ly = groundY - legs - (Math.max(0, s.h) / DESCENT_H0) * (groundY - 70);
      // long shadow on the ground, stretching away from the low Sun
      const shadowA = Math.max(0.08, 0.4 - s.h / 300);
      ctx.fillStyle = `rgba(10,10,14,${shadowA})`;
      ctx.beginPath(); ctx.ellipse(lx + 30 + s.h * 0.4, groundY + 2, 34, 4, 0, 0, Math.PI * 2); ctx.fill();
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate((s.att * Math.PI) / 180);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-10, 6); ctx.lineTo(-18, legs); ctx.moveTo(10, 6); ctx.lineTo(18, legs); ctx.stroke();
      ctx.lineWidth = 1;
      const body = ctx.createLinearGradient(-14, 0, 14, 0);
      body.addColorStop(0, outRef.current === 'crash' ? '#fca5a5' : '#fde68a');
      body.addColorStop(1, outRef.current === 'crash' ? '#b91c1c' : '#b45309');
      ctx.fillStyle = body;
      ctx.fillRect(-14, -10, 28, 18);
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(-12, -16, 24, 6);
      if (input.current.vert > 0.05 && outRef.current === 'flying' && s.fuel > 0) {
        ctx.fillStyle = `rgba(251,146,60,${0.4 + input.current.vert * 0.6})`;
        ctx.beginPath(); ctx.moveTo(-6, 8); ctx.lineTo(0, 8 + 22 * input.current.vert); ctx.lineTo(6, 8); ctx.fill();
      }
      ctx.restore();
      if (outRef.current === 'soft') {
        ctx.fillStyle = '#6ee7b7';
        ctx.font = 'bold 15px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SOFT LANDING — Vikram', W * 0.5, H * 0.38);
        ctx.textAlign = 'start';
      }
    } else {
      // Rover map: top-down, north up. World is 16 × 9 m, centred.
      const sun = sunFromTithi(input.current.tithi);
      const sc = Math.min(W / WORLD_W, H / WORLD_H);
      const ox = (W - WORLD_W * sc) / 2;
      const oy = (H - WORLD_H * sc) / 2;
      const P = (x: number, y: number) => [ox + x * sc, oy + y * sc] as const;
      ctx.drawImage(regolith(W, H), 0, 0, W, H);
      // shadow geometry: away from the Sun, length = height / tan(elevation)
      const elR = (Math.max(0.5, sun.el) * Math.PI) / 180;
      const cot = Math.min(8, 1 / Math.tan(elR));
      const shx = -sun.sx;
      const shy = -sun.sy;
      const castShadow = (x: number, y: number, rad: number, height: number, alpha = 0.45) => {
        if (sun.el <= 0) return;
        const L = Math.min(4, height * cot); // capped so long polar shadows stay readable
        const [ax, ay] = P(x, y);
        const [bx, by] = P(x + shx * L, y + shy * L);
        const nx = -shy * rad * sc;
        const ny = shx * rad * sc;
        ctx.fillStyle = `rgba(8,8,12,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(ax + nx, ay + ny);
        ctx.lineTo(bx + nx * 0.6, by + ny * 0.6);
        ctx.lineTo(bx - nx * 0.6, by - ny * 0.6);
        ctx.lineTo(ax - nx, ay - ny);
        ctx.closePath();
        ctx.fill();
      };
      // craters: shadowed sunward wall, lit far wall, bright sunward rim
      CRATERS.forEach((c) => {
        const [cx, cy] = P(c.x, c.y);
        const R = c.r * sc;
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fillStyle = '#101114'; ctx.fill();
        if (sun.el > 0) {
          const d = Math.min(2 * R, 0.13 * R * cot);
          ctx.save();
          ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
          ctx.beginPath(); ctx.arc(cx + shx * d, cy + shy * d, R, 0, Math.PI * 2);
          const wall = ctx.createRadialGradient(cx - shx * R, cy - shy * R, R * 0.2, cx, cy, R * 1.6);
          wall.addColorStop(0, '#6f7175');
          wall.addColorStop(1, '#b9bbbf');
          ctx.fillStyle = wall; ctx.fill();
          ctx.restore();
          const ang = Math.atan2(sun.sy, sun.sx);
          ctx.lineWidth = Math.max(1.5, R * 0.12);
          ctx.strokeStyle = 'rgba(232,232,226,0.75)';
          ctx.beginPath(); ctx.arc(cx, cy, R * 1.04, ang - 1.1, ang + 1.1); ctx.stroke();
          ctx.strokeStyle = 'rgba(10,10,14,0.45)';
          ctx.beginPath(); ctx.arc(cx, cy, R * 1.06, ang + Math.PI - 0.9, ang + Math.PI + 0.9); ctx.stroke();
          ctx.lineWidth = 1;
        }
      });
      BOULDERS.forEach((b) => castShadow(b.x, b.y, b.r, b.r * 1.4, 0.4));
      BOULDERS.forEach((b) => {
        const [bx, by] = P(b.x, b.y);
        const rr = Math.max(1.5, b.r * sc);
        ctx.beginPath(); ctx.arc(bx, by, rr, 0, Math.PI * 2);
        ctx.fillStyle = '#5b5d61'; ctx.fill();
        ctx.beginPath(); ctx.arc(bx + sun.sx * rr * 0.35, by + sun.sy * rr * 0.35, rr * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = '#c4c6ca'; ctx.fill();
      });
      // Pragyan's wheel tracks
      if (s.trail.length > 1) {
        ctx.strokeStyle = 'rgba(38,38,44,0.5)';
        ctx.lineWidth = Math.max(1, sc * 0.07);
        [-0.32, 0.32].forEach((off) => {
          ctx.beginPath();
          s.trail.forEach((p, i) => {
            const hr = (p.h * Math.PI) / 180;
            const [tx, ty] = P(p.x - Math.sin(hr) * off, p.y + Math.cos(hr) * off);
            if (i === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
          });
          ctx.stroke();
        });
        ctx.lineWidth = 1;
      }
      // Vikram lander + ramp
      castShadow(VIKRAM.x, VIKRAM.y, 0.95, 1.2, 0.36);
      {
        const [vx, vy] = P(VIKRAM.x, VIKRAM.y);
        const half = 0.9 * sc;
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth = Math.max(1, sc * 0.08);
        [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([dx, dy]) => {
          ctx.beginPath(); ctx.moveTo(vx + dx * half * 0.7, vy + dy * half * 0.7); ctx.lineTo(vx + dx * half * 1.35, vy + dy * half * 1.35); ctx.stroke();
          ctx.beginPath(); ctx.arc(vx + dx * half * 1.35, vy + dy * half * 1.35, Math.max(2, sc * 0.14), 0, Math.PI * 2);
          ctx.fillStyle = '#d1d5db'; ctx.fill();
        });
        // ramp to the east, toward the rover start
        const [rx0, ry0] = P(VIKRAM.x + 0.9, VIKRAM.y);
        const [rx1] = P(ROVER_START.x - 0.45, VIKRAM.y);
        ctx.fillStyle = '#a8a29e';
        ctx.fillRect(rx0, ry0 - sc * 0.3, rx1 - rx0, sc * 0.6);
        const foil = ctx.createLinearGradient(vx - half, vy - half, vx + half, vy + half);
        foil.addColorStop(0, '#fde68a');
        foil.addColorStop(0.5, '#d97706');
        foil.addColorStop(1, '#92400e');
        ctx.fillStyle = foil;
        ctx.fillRect(vx - half, vy - half, half * 2, half * 2);
        ctx.strokeStyle = 'rgba(120,53,15,0.6)';
        ctx.lineWidth = 1;
        for (let i = 1; i < 4; i++) {
          ctx.beginPath(); ctx.moveTo(vx - half, vy - half + (i * half) / 2); ctx.lineTo(vx + half, vy - half + (i * half) / 2 + 2); ctx.stroke();
        }
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(vx - half * 0.8, vy - half - sc * 0.32, half * 1.6, sc * 0.3);
        ctx.fillStyle = '#fef3c7';
        ctx.font = `${Math.max(9, Math.min(11, sc * 0.26))}px ui-monospace, monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('VIKRAM', vx, vy + half * 1.35 + Math.max(11, sc * 0.4));
        ctx.textAlign = 'start';
      }
      // Element scan spots — pulsing glow until scanned
      MINERALS.forEach((m, i) => {
        const [mx, my] = P(m.x, m.y);
        const got = scannedRef.current.includes(m.id);
        const base = 0.36 * sc;
        const pulse = got ? 1 : 1 + 0.28 * Math.sin(now * 3 + i * 1.3);
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, base * 2 * pulse);
        glow.addColorStop(0, m.color);
        glow.addColorStop(0.35, `${m.color}aa`);
        glow.addColorStop(1, `${m.color}00`);
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(mx, my, base * 2 * pulse, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(mx, my, base * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = got ? '#0f172a' : 'rgba(15,23,42,0.75)';
        ctx.fill();
        ctx.strokeStyle = got ? '#4ade80' : m.color;
        ctx.lineWidth = got ? 2 : 1.2;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.fillStyle = got ? '#bbf7d0' : m.color;
        ctx.font = `bold ${Math.max(9, Math.min(12, sc * 0.3))}px ui-monospace, monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(got ? `✓${m.id}` : m.id, mx, my + 4);
        ctx.textAlign = 'start';
      });
      // Pragyan
      castShadow(s.rx, s.ry, 0.4, 0.9, 0.36);
      {
        const [px, py] = P(s.rx, s.ry);
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate((s.heading * Math.PI) / 180);
        const L = 0.46 * sc;
        const Wd = 0.38 * sc;
        ctx.fillStyle = '#334155';
        [-0.7, 0, 0.7].forEach((f) => {
          ctx.fillRect(f * L - sc * 0.09, -Wd - sc * 0.12, sc * 0.18, sc * 0.12);
          ctx.fillRect(f * L - sc * 0.09, Wd, sc * 0.18, sc * 0.12);
        });
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(-L, -Wd, L * 2, Wd * 2);
        ctx.fillStyle = '#1d4ed8';
        ctx.fillRect(-L * 0.9, -Wd * 0.85, L * 1.1, Wd * 1.7);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(L * 0.55, -Wd * 0.35, L * 0.4, Wd * 0.7);
        ctx.restore();
      }
      // night / low-light dimming
      const dark = sun.el <= 0 ? 0.62 : Math.max(0, 0.32 - sun.power * 0.32);
      if (dark > 0) {
        ctx.fillStyle = `rgba(2,6,23,${dark})`;
        ctx.fillRect(0, 0, W, H);
      }
    }
  };

  useEffect(() => {
    stepRef.current = step;
    drawRef.current = draw;
  });

  useEffect(() => {
    let last = performance.now();
    const loop = (now: number) => {
      raf.current = requestAnimationFrame(loop);
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const run = !pauseRef.current && document.visibilityState === 'visible' && outRef.current === 'flying';
      if (run) stepRef.current(dt);
      if (!visibleRef.current) return; // skip painting while off-screen
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth || 640;
      const h = canvas.clientHeight || 360;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawRef.current(ctx, w, h);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const fireLibs = () => {
    if (phase !== 'rover') return;
    const s = sim.current;
    if (sunFromTithi(tithi).el <= 0) {
      setScanMsg('Lunar night — no power for the LIBS laser. Move the Tithi to a sunlit day.');
      return;
    }
    if (s.battery < 8) {
      setScanMsg('Battery too low for LIBS. Idle in sunlight to recharge.');
      return;
    }
    const hit = MINERALS.find((m) => Math.hypot(s.rx - m.x, s.ry - m.y) < 0.75);
    if (!hit) {
      setScanMsg('No sample under Pragyan. Drive onto a glowing spot.');
      return;
    }
    s.battery = Math.max(0, s.battery - 4);
    if (!scanned.includes(hit.id)) setScanned((list) => [...list, hit.id]);
    setScanMsg(`${hit.en} · ${hit.shard} (${hit.shardIast}). ${hit.note}`);
    const canvas = canvasRef.current;
    if (canvas) {
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      const sc = Math.min(W / WORLD_W, H / WORLD_H);
      const mx = (W - WORLD_W * sc) / 2 + hit.x * sc;
      const my = (H - WORLD_H * sc) / 2 + hit.y * sc;
      const popW = Math.min(210, W - 24);
      const left = Math.max(12, Math.min(W - popW - 12, mx - popW / 2));
      setPop((old) => ({ mid: hit.id, left, anchorY: my, n: (old?.n ?? 0) + 1 }));
    }
  };

  const enterPhase = (p: Phase) => {
    if (p === 'descent' && !orbitDone) return;
    if (p === 'rover' && !softDone) return;
    setPhase(p);
    setOutcome('flying');
    outRef.current = 'flying';
    if (p === 'orbit') resetOrbit();
    if (p === 'descent') resetDescent();
    if (p === 'rover') resetRover();
  };

  const small = isSmallScreen();
  const sunNow = sunFromTithi(tithi);
  const popM = pop ? MINERALS.find((m) => m.id === pop.mid) : undefined;

  const chips = (() => {
    if (phase === 'orbit') {
      return {
        tl: <>KAKṢYĀ {hud.altKm.toFixed(0)} km</>,
        tr: <>VEGA {hud.vega.toFixed(2)} km/s</>,
        bl: <>ECC {hud.ecc.toFixed(2)}</>,
        br: <><span className="vl-hud-long">TARGET ~100 km</span><span className="vl-hud-short">→100 km</span></>,
      };
    }
    if (phase === 'descent') {
      return {
        tl: <>UCCATĀ {hud.h.toFixed(0)} m</>,
        tr: <>VEGA {hud.vy.toFixed(2)} m/s {hud.vy >= 0 ? '↓' : '↑'}</>,
        bl: <>FUEL {hud.fuel.toFixed(0)}%<span className="vl-hud-long"> · ASSIST {assist ? 'ON' : 'OFF'}</span></>,
        br: <>SAMATVA {hud.attitude.toFixed(0)}°</>,
      };
    }
    return {
      tl: <>GATI {hud.gati.toFixed(2)} cm/s</>,
      tr: <>SŪRYA {sunNow.el.toFixed(0)}°<span className="vl-hud-long"> · ☀ {(sunNow.power * 100).toFixed(0)}%</span></>,
      bl: <>BATT {hud.battery.toFixed(0)}% · {hud.dist.toFixed(1)} m<span className="vl-hud-long"> to Vikram</span></>,
      br: <>ŚAKALA {scanned.length}/5</>,
    };
  })();

  return (
    <div
      className="vl-sim cy-sim cy-mission"
      data-testid="chandrayaan-lab"
      data-orbit-done={orbitDone ? 'true' : 'false'}
      data-soft-done={softDone ? 'true' : 'false'}
      data-phase={phase}
      data-outcome={outcome}
      data-h={hud.h.toFixed(2)}
      data-vy={hud.vy.toFixed(3)}
      data-att={hud.attitude.toFixed(2)}
      data-rover={`${hud.rx.toFixed(2)},${hud.ry.toFixed(2)},${hud.heading.toFixed(1)}`}
    >
      <CoreIdea>
        Chandrayaan-3 (ISRO) soft-landed Vikram near the lunar south pole on 23 August 2023; the site was named Shiv Shakti Point.
        This sandbox uses Sanskrit HUD labels for modern flight quantities — teaching parallels, not a claim that Jyotiṣa proves orbital mechanics.
        Circularise Candra-Kakṣyā, soft-land Vikram (vertical Vega under 2 m/s, Samatva within ±12°), then drive Pragyan and scan with a LIBS-style laser.
      </CoreIdea>

      <div className="cy-lab cy-mission-lab" ref={wrapRef} data-testid="cy-mission-panel">
        <div className="cy-main">
          <div className="cy-window cy-mission-window">
            <div className="cy-window-head">
              <span className="cy-window-title">
                SOMAYĀNA MISSION-03 <i>//</i> <span lang="sa">सोमयानम्</span>
              </span>
              <button type="button" className="cy-pause" onClick={() => setPaused((x) => !x)} aria-pressed={paused} aria-label={paused ? 'Play' : 'Pause'} data-testid="cy-pause">
                {paused ? '▶' : '❚❚'}
              </button>
            </div>

            <div className="cy-seg cy-mission-phases" role="tablist" aria-label="Mission phases">
              {PHASES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={phase === p.id}
                  className={phase === p.id ? 'is-on' : ''}
                  disabled={(p.id === 'descent' && !orbitDone) || (p.id === 'rover' && !softDone)}
                  onClick={() => enterPhase(p.id)}
                  data-testid={`cy-phase-${p.id}`}
                >
                  {p.en} <small lang="sa">{p.sa}</small>
                </button>
              ))}
            </div>

            <div className="cy-hud-wrap">
            <HudFrame accent={hud.tamas ? '#f97316' : '#22d3ee'} tl={chips.tl} tr={chips.tr} bl={chips.bl} br={chips.br}>
              <div className="cy-mission-stage" data-testid="cy-mission-stage">
                <canvas ref={canvasRef} className="cy-mission-canvas" data-testid="cy-mission-canvas" aria-label="Chandrayaan mission sandbox" />
                {phase === 'rover' && pop && popM && (
                  <div className="cy-libs-pop" ref={popRef} key={pop.n} style={{ left: pop.left, top: 34 }} role="status" data-testid="cy-libs-pop">
                    <button type="button" className="cy-libs-x" onClick={() => setPop(null)} aria-label="Close spectrum">×</button>
                    <div className="cy-libs-head">
                      <b lang="sa">{popM.shard}</b> <span>{popM.shardIast}</span>
                    </div>
                    <svg viewBox="0 0 200 46" className="cy-libs-spec" aria-label={`Illustrative ${popM.en} emission lines`}>
                      <line x1="4" y1="38" x2="196" y2="38" stroke="#334155" />
                      {[400, 500, 600, 700, 800, 900].map((nm) => (
                        <g key={nm}>
                          <line x1={4 + ((nm - 350) / 600) * 192} y1="38" x2={4 + ((nm - 350) / 600) * 192} y2="41" stroke="#475569" />
                          <text x={4 + ((nm - 350) / 600) * 192} y="46" fontSize="5" fill="#64748b" textAnchor="middle">{nm}</text>
                        </g>
                      ))}
                      <path d="M4 36 C 50 33, 120 32, 196 35" fill="none" stroke="#1e293b" />
                      {popM.lines.map((nm, i) => {
                        const x = 4 + ((nm - 350) / 600) * 192;
                        return <line key={nm} x1={x} y1="37" x2={x} y2={10 + (i % 3) * 7} stroke={popM.color} strokeWidth="1.6" />;
                      })}
                      <text x={Math.min(186, 4 + ((popM.lines[0] - 350) / 600) * 192 + 6)} y="12" fontSize="8" fill={popM.color} fontWeight="700">{popM.id}</text>
                    </svg>
                    <small>{popM.en} · illustrative lines (nm), not Pragyan data</small>
                  </div>
                )}
              </div>
            </HudFrame>
            {outcome === 'crash' && (
              <div className="cy-crash" role="alertdialog" aria-labelledby="cy-crash-title" data-testid="cy-crash">
                <h3 id="cy-crash-title">Descent Sequence Interrupted <span lang="sa">// विक्षेप दोषः</span></h3>
                {crashWhy && <p className="cy-crash-why" data-testid="cy-crash-why">{crashWhy}</p>}
                <p>Recalibrate before restart:</p>
                <ul>
                  <li><b>Prāṇodana thrusters</b> — burn earlier; do not wait until the last metres.</li>
                  <li><b>Vega &lt; 2 m/s</b> — inside ISRO’s Chandrayaan-3 touchdown spec (vertical ≤ 2 m/s).</li>
                  <li><b>Samatva</b> — keep attitude within ±12° at contact or the lander tips.</li>
                </ul>
                <button type="button" className="cy-reset" onClick={restartCrash} data-testid="cy-restart">↺ Restart Descent</button>
              </div>
            )}
            </div>

            <div className={`cy-ticker${hud.tamas ? ' is-alert' : ''}`} role="status" data-testid="cy-ticker">
              <p className="cy-feed is-new">
                <b lang="sa">{hud.statusSa}</b> <span>{hud.status}</span>
                {hud.tamas && phase === 'descent' && outcome === 'flying' && <span className="cy-modern">⚠ Tamas (chaos) rising — vertical speed too high for the height left, or tilt past ±12°.</span>}
              </p>
            </div>
          </div>
        </div>

        <aside className="cy-panel" aria-label="Mission controls">
          <div className="cy-stats" data-testid="cy-stats">
            <div><span>PHASE</span><b>{PHASES.find((p) => p.id === phase)?.en}</b><small lang="sa">{PHASES.find((p) => p.id === phase)?.sa}</small></div>
            <div><span>GURUTVĀKARṢAṆA</span><b>{hud.g.toFixed(2)} m/s²</b><small>{phase === 'orbit' ? 'in orbit' : 'surface'}</small></div>
            {phase === 'rover' ? (
              <div><span>DRIVEN</span><b data-testid="cy-odo">{hud.odo.toFixed(1)} m</b><small>real: 100+ m</small></div>
            ) : (
              <div><span>OUTCOME</span><b data-testid="cy-outcome">{outcome === 'flying' ? 'IN FLIGHT' : outcome === 'soft' ? 'SOFT LAND' : 'INTERRUPT'}</b><small>{phase === 'descent' ? 'Vega < 2 m/s' : 'orbit first'}</small></div>
            )}
          </div>

          {phase === 'orbit' && (
            <div className="cy-group">
              <span className="cy-label">Prāṇodana · circularisation burn</span>
              <GlowSlider label={<span lang="sa">प्राणोदन · burn</span>} value={burn} min={-100} max={100} step={1} onChange={setBurn} valueText={`${burn > 0 ? '+' : ''}${burn}`} color="#38bdf8" testId="cy-burn" ariaLabel="Orbit thruster burn" />
              <DialKnob label={<span lang="sa">प्राणोदन</span>} ariaLabel="Orbit thruster burn dial" value={burn} min={-100} max={100} step={1} onChange={setBurn} format={(v) => `${v > 0 ? '+' : ''}${v}`} color="#38bdf8" size={small ? 72 : 88} testId="cy-burn-dial" />
              <p className="vl-small">Nudge eccentricity down and altitude toward ~100 km. When the ring turns calm, Vikram Descent unlocks.</p>
              <button type="button" className="cy-reset" onClick={resetOrbit} data-testid="cy-reset-orbit">↺ Reset Orbit</button>
            </div>
          )}

          {phase === 'descent' && outcome !== 'crash' && (
            <div className="cy-group">
              <span className="cy-label">Vertical Prāṇodana</span>
              <GlowSlider label="Upward thrust" value={vertThrust} min={0} max={1} step={0.01} onChange={setVertThrust} valueText={`${(vertThrust * 100).toFixed(0)}% · hover ≈ 51%`} color="#fb923c" testId="cy-vert" ariaLabel="Vertical thruster" disabled={outcome !== 'flying'} />
              <span className="cy-label">Samatva · attitude</span>
              <GlowSlider label="Tilt left / right" value={attitudeCmd} min={-1} max={1} step={0.01} onChange={setAttitudeCmd} valueText={attitudeCmd.toFixed(2)} color="#a78bfa" testId="cy-att" ariaLabel="Attitude thruster" disabled={outcome !== 'flying'} />
              <LedButton on={assist} onClick={() => setAssist((a) => !a)} color="#34d399" testId="cy-assist" title="Brake-only helper for the last 30 m">
                Guidance assist
              </LedButton>
              <p className="vl-small">
                Moon g ≈ 1.62 m/s². Touch down with vertical Vega under 2 m/s and Samatva within ±12°.
                Guidance assist only helps: below 30 m it adds at most {ASSIST_MAX} m/s² of extra braking and some attitude damping — you still fly the throttle.
              </p>
            </div>
          )}

          {phase === 'rover' && (
            <div className="cy-group">
              <span className="cy-label">Pragyan drive</span>
              <GlowSlider label="Drive" value={roverDrive} min={-1} max={1} step={0.01} onChange={setRoverDrive} valueText={`${(Math.abs(roverDrive) * PRAGYAN_REAL_CMS).toFixed(2)} cm/s ${roverDrive < 0 ? 'rev' : 'fwd'}`} color="#4ade80" testId="cy-drive" ariaLabel="Rover drive" />
              <GlowSlider label="Steer" value={roverSteer} min={-1} max={1} step={0.01} onChange={setRoverSteer} valueText={roverSteer.toFixed(2)} color="#2dd4bf" testId="cy-steer" ariaLabel="Rover steer" />
              <span className="cy-label">Tithi → Sūrya window</span>
              <GlowSlider label="Tithi" value={tithi} min={1} max={30} step={1} onChange={setTithi} valueText={tithiName(tithi)} color="#c4b5fd" testId="cy-tithi" ariaLabel="Tithi (lunar day)" />
              <p className="vl-small">
                Tithi = 12° steps of Moon–Sun elongation, which also sets local time at the landing site. Here the Sun is up from about Śukla 5 to Kṛṣṇa 5 and never climbs above ~{MAX_SUN_EL.toFixed(0)}° — long polar shadows.
                Map is time-warped ×{TIME_WARP}; Gati shows the real-pace equivalent (Pragyan ≈ 1 cm/s, ISRO).
              </p>
              <LedButton on kind="action" onClick={fireLibs} color="#38bdf8" testId="cy-libs" title="Fire LIBS-style scan">⚡ LIBS Scan</LedButton>
              <p className="vl-small" data-testid="cy-scan-msg">{scanMsg}</p>
              <ul className="cy-scan-list" data-testid="cy-scan-list">
                {MINERALS.map((m) => (
                  <li key={m.id} className={scanned.includes(m.id) ? 'is-got' : ''}>
                    <b>{m.id}</b> <span lang="sa">{m.shard}</span> · {m.kind === 'ap' ? 'ap-tattva' : 'pṛthivī-tattva'}
                  </li>
                ))}
              </ul>
              <p className="vl-small">Gandhaka (sulphur) and ayas (iron/metal) are classical words; the Al and Ca names are descriptive lab coinages.</p>
            </div>
          )}

          {orbitDone && phase === 'orbit' && (
            <LedButton on kind="action" onClick={() => enterPhase('descent')} color="#fbbf24" testId="cy-goto-descent">Unlock Vikram Descent →</LedButton>
          )}
          {softDone && phase === 'descent' && outcome === 'soft' && (
            <LedButton on kind="action" onClick={() => enterPhase('rover')} color="#4ade80" testId="cy-goto-rover">Deploy Pragyan →</LedButton>
          )}
        </aside>
      </div>

      <div className="cy-lore-grid">
        <section className="cy-lore" aria-label="Chandrayaan-3 mission facts">
          <h3 className="cy-lore-title">📜 Scroll I <i>//</i> Chandrayaan-3 · soft landing</h3>
          <ul className="cy-list">
            <li>ISRO’s Chandrayaan-3 soft-landed on <b>23 August 2023</b> near the lunar south pole (public ISRO / PIB timeline).</li>
            <li>Lander <b>Vikram</b>; rover <b>Pragyan</b>. ISRO touchdown spec: vertical velocity ≤ 2 m/s, horizontal ≤ 0.5 m/s, slope ≤ 12°.</li>
            <li>Landing site named <b>Shiv Shakti Point</b> by the Prime Minister (26 Aug 2023); IAU form <em>Statio Shiv Shakti</em> (2024).</li>
            <li>This lab’s burns, fuel and assist numbers are <b>for play</b>, not published propulsion tables.</li>
          </ul>
        </section>
        <section className="cy-lore" aria-label="LIBS and ice framing">
          <h3 className="cy-lore-title">📜 Scroll II <i>//</i> LIBS · sulphur · ice hunt</h3>
          <ul className="cy-list">
            <li>Pragyan’s <b>LIBS</b> made the first in-situ elemental measurements near the south pole and <b>confirmed sulphur (S)</b> (ISRO, 28 Aug 2023).</li>
            <li>Preliminary analyses also indicated Al, Ca, Fe, Cr, Ti, then Mn, Si, O.</li>
            <li>ISRO said thorough investigation regarding <b>hydrogen</b> was underway — water-ice remains a science goal / inferred theme in polar studies, <b>not</b> claimed here as a LIBS “ice find” equal to the sulphur result.</li>
            <li>Pragyan moved at about <b>1 cm/s</b>, re-routed around a ~4 m crater, and covered <b>100+ m</b> before being put to sleep on 2 Sep 2023 (ISRO).</li>
          </ul>
        </section>
        <section className="cy-lore" aria-label="Sanskrit HUD teaching note">
          <h3 className="cy-lore-title">📜 Scroll III <i>//</i> Sanskrit names · teaching parallels</h3>
          <p className="vl-small">
            Kakṣyā, Gati, Vega, Gurutvākarṣaṇa, Tithi and Nakṣatra are real Sanskrit / Jyotiṣa vocabulary.
            Mapping them onto HUD readouts is a <b>teaching parallel</b> so learners hear the words beside modern quantities.
            The tithi → sunlight link uses modern geometry (elongation and the site’s longitude); it does <b>not</b> mean Vedic astronomy secretly contains rocket equations.
          </p>
        </section>
        <section className="cy-lore" aria-label="Modern comparison">
          <h3 className="cy-lore-title">🔬 Modern comparison (for fun)</h3>
          <ul className="cy-list">
            <li>Lunar surface gravity ≈ <b>1.62 m/s²</b> (~1/6 of Earth’s 9.81); a 100 km lunar orbit moves at ≈ 1.6 km/s.</li>
            <li>Soft landing = low residual vertical speed + level attitude + hazard avoidance.</li>
            <li>At ~69°S the Sun stays low (≤ ~21°), so shadows are long; solar-powered Vikram and Pragyan were built for one lunar day (~14 Earth days).</li>
          </ul>
        </section>
      </div>

      <TermPanel title="Vocabulary Codex // Mission HUD Sanskrit" terms={TERMS} />
    </div>
  );
};

export default Chandrayaan;
