import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CoreIdea, TermPanel, type LabTerm } from './common';
import { DialKnob, GlowSlider, HudFrame, LedButton } from './controls';
import { isSmallScreen, prefersReducedMotion } from './motion';

type Phase = 'orbit' | 'descent' | 'rover';
type Outcome = 'flying' | 'soft' | 'crash';

const MOON_G = 1.62; // m/s², lunar surface gravity (public value)
const SOFT_VY = 2.5; // m/s teaching window (planned Ch-3 vertical was < 2 m/s — PIB)
const TARGET_ALT_KM = 100; // simplified circular lunar orbit target

const TERMS: LabTerm[] = [
  { dev: 'कक्षा', iast: 'kakṣyā', tag: 'ORBIT // Path Ring', game: 'The path a craft follows around a body. In the HUD: altitude of your orbit.', en: 'orbit, enclosure' },
  { dev: 'गति', iast: 'gati', tag: 'MOTION // Path Speed', game: 'How the craft is moving along its path.', en: 'motion, course' },
  { dev: 'वेग', iast: 'vega', tag: 'MOTION // Speed Readout', game: 'Speed magnitude. Soft-land when vertical vega is under ~2 m/s.', en: 'speed, velocity' },
  { dev: 'गुरुत्वाकर्षण', iast: 'gurutvākarṣaṇa', tag: 'FORCE // Gravity Pull', game: 'The pull of a mass. Earth ≈ 9.81 m/s²; Moon ≈ 1.62 m/s² at the surface.', en: 'gravitation' },
  { dev: 'चन्द्र-भूमि', iast: 'candra-bhūmi', tag: 'WORLD // Lunar Ground', game: 'The Moon’s surface — your landing and rover stage.', en: 'lunar ground' },
  { dev: 'तिथि', iast: 'tithi', tag: 'CALENDAR // Lunar Day', game: 'A lunar day in the traditional calendar. Here it tags the solar-power window on the surface.', en: 'lunar day' },
  { dev: 'नक्षत्र', iast: 'nakṣatra', tag: 'SKY // Lunar Mansion', game: 'One of the 27 lunar mansions. Teaching parallel only — not a claim that Jyotiṣa predicts thruster burns.', en: 'lunar mansion' },
  { dev: 'सूर्य', iast: 'sūrya', tag: 'POWER // Sun Gate', game: 'Sunlight. Pragyan’s solar panels need a day-side window.', en: 'Sun' },
  { dev: 'प्राणोदन', iast: 'prāṇodana', tag: 'THRUST // Burn Dial', game: 'The thruster burn that drives, brakes or steadies the craft.', en: 'propulsion, thrust', note: 'teaching label for thrusters in this lab' },
  { dev: 'समत्व', iast: 'samatva', tag: 'ATTITUDE // Level Craft', game: 'Keep the lander level at touchdown or it tips.', en: 'evenness, balance' },
  { dev: 'पृथिवी-तत्त्व', iast: 'pṛthivī-tattva', tag: 'SCAN // Rock Elements', game: 'Earth-element: solid minerals the LIBS-style scan can tag (S, Al, Fe, Ca…).', en: 'earth principle' },
  { dev: 'अप्-तत्त्व', iast: 'ap-tattva', tag: 'SCAN // Water Hunt', game: 'Water principle: ice/water as a science goal. Pragyan’s LIBS confirmed sulphur; hydrogen/ice investigation was reported as underway — not the same as a confirmed ice find.', en: 'water principle' },
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
  vega: number;
  g: number;
  attitude: number;
  fuel: number;
  tamas: boolean;
  status: string;
  statusSa: string;
}

const MINERALS: { id: string; sa: string; iast: string; en: string; kind: 'prithivi' | 'ap'; note: string }[] = [
  { id: 'S', sa: 'गन्धकः', iast: 'gandhakaḥ', en: 'Sulphur (S)', kind: 'prithivi', note: 'Pragyan LIBS: first in-situ confirmation near the south pole (ISRO, 28 Aug 2023).' },
  { id: 'Al', sa: 'मृत्तिका-धातुः', iast: 'mṛttikā-dhātuḥ', en: 'Aluminium (Al)', kind: 'prithivi', note: 'Reported in preliminary LIBS analyses with S, Ca, Fe and others.' },
  { id: 'Fe', sa: 'अयस्', iast: 'ayas', en: 'Iron (Fe)', kind: 'prithivi', note: 'Reported in preliminary LIBS analyses.' },
  { id: 'Ca', sa: 'चूर्ण-धातुः', iast: 'cūrṇa-dhātuḥ', en: 'Calcium (Ca)', kind: 'prithivi', note: 'Reported in preliminary LIBS analyses.' },
  { id: 'H', sa: 'अप्-संकेतः', iast: 'ap-saṅketaḥ', en: 'Hydrogen (H) · ice hunt', kind: 'ap', note: 'ISRO said thorough investigation for hydrogen was underway — not claimed as confirmed ice by LIBS in the same report as sulphur.' },
];

const Chandrayaan: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('orbit');
  const [paused, setPaused] = useState(() => prefersReducedMotion());
  const [outcome, setOutcome] = useState<Outcome>('flying');
  const [orbitDone, setOrbitDone] = useState(false);
  const [softDone, setSoftDone] = useState(false);
  const [burn, setBurn] = useState(0); // orbit circularisation dial −100..100
  const [vertThrust, setVertThrust] = useState(0); // 0..1
  const [attitudeCmd, setAttitudeCmd] = useState(0); // −1..1
  const [roverDrive, setRoverDrive] = useState(0);
  const [roverSteer, setRoverSteer] = useState(0);
  const [illum, setIllum] = useState(0.72); // Sūrya window 0..1
  const [tithi, setTithi] = useState(8);
  const [scanned, setScanned] = useState<string[]>([]);
  const [scanMsg, setScanMsg] = useState('Roll Pragyan onto a patch, then fire LIBS.');
  const [hud, setHud] = useState<Hud>({
    altKm: 150, vega: 1.6, g: MOON_G, attitude: 0, fuel: 100,
    tamas: false, status: 'Match Candra-Kakṣyā (~100 km circular).', statusSa: 'चन्द्र-कक्षां समं कुरु।',
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sim = useRef({
    // orbit: altitude km, eccentricity proxy 0..1
    alt: 150, e: 0.45, vx: 1.6,
    // descent: height m, vy m/s (down +), attitude deg, fuel
    h: 40, vy: 3.5, att: 5, fuel: 100, x: 0,
    // rover
    rx: 40, ry: 55, heading: 0, battery: 100,
    hazards: [] as { x: number; y: number; r: number }[],
    patches: [] as { x: number; y: number; mid: string }[],
    t: 0, burnTime: 0,
  });
  const input = useRef({ burn: 0, vert: 0, att: 0, drive: 0, steer: 0, illum: 0.72 });
  const phaseRef = useRef(phase);
  const pauseRef = useRef(paused);
  const outRef = useRef(outcome);
  const visibleRef = useRef(true);
  const scannedRef = useRef<string[]>([]);
  const raf = useRef(0);
  const stepRef = useRef<(dt: number) => void>(() => {});
  const drawRef = useRef<(ctx: CanvasRenderingContext2D, W: number, H: number) => void>(() => {});

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { pauseRef.current = paused; }, [paused]);
  useEffect(() => { outRef.current = outcome; }, [outcome]);
  useEffect(() => { input.current.burn = burn; }, [burn]);
  useEffect(() => { input.current.vert = vertThrust; }, [vertThrust]);
  useEffect(() => { input.current.att = attitudeCmd; }, [attitudeCmd]);
  useEffect(() => { input.current.drive = roverDrive; }, [roverDrive]);
  useEffect(() => { input.current.steer = roverSteer; }, [roverSteer]);
  useEffect(() => { input.current.illum = illum; }, [illum]);
  useEffect(() => { scannedRef.current = scanned; }, [scanned]);

  const seedTerrain = useCallback(() => {
    const s = sim.current;
    s.hazards = [
      { x: 0.22, y: 0.62, r: 0.06 }, { x: 0.55, y: 0.7, r: 0.08 }, { x: 0.78, y: 0.58, r: 0.05 },
      { x: 0.35, y: 0.82, r: 0.07 }, { x: 0.68, y: 0.85, r: 0.05 },
    ];
    s.patches = MINERALS.map((m, i) => ({
      x: 0.18 + (i % 3) * 0.28 + (i > 2 ? 0.08 : 0),
      y: 0.35 + Math.floor(i / 3) * 0.32,
      mid: m.id,
    }));
  }, []);

  const resetOrbit = useCallback(() => {
    Object.assign(sim.current, { alt: 150, e: 0.45, vx: 1.6, burnTime: 0 });
    setBurn(0); setOrbitDone(false); setOutcome('flying');
    setHud((h) => ({ ...h, altKm: 150, vega: 1.6, g: MOON_G, tamas: false, status: 'Match Candra-Kakṣyā (~100 km circular).', statusSa: 'चन्द्र-कक्षां समं कुरु।' }));
  }, []);

  const resetDescent = useCallback(() => {
    Object.assign(sim.current, { h: 40, vy: 3.5, att: 5, fuel: 100, x: 0 });
    setVertThrust(0); setAttitudeCmd(0); setOutcome('flying');
    outRef.current = 'flying';
    setHud((h) => ({ ...h, altKm: 0.04, vega: 3.5, attitude: 5, fuel: 100, tamas: true, status: 'Powered descent to Shiv Shakti Point.', statusSa: 'शिव-शक्ति-बिन्दुं प्रति अवतर।' }));
  }, []);

  const resetRover = useCallback(() => {
    seedTerrain();
    Object.assign(sim.current, { rx: 40, ry: 55, heading: 0, battery: 100 });
    setRoverDrive(0); setRoverSteer(0); setScanned([]); setScanMsg('Roll Pragyan onto a patch, then fire LIBS.');
    setHud((h) => ({ ...h, status: 'Drive Pragyan. Stay in the Sūrya window.', statusSa: 'प्रज्ञानं नय। सूर्य-प्रकाशे तिष्ठ।' }));
  }, [seedTerrain]);

  const restartCrash = () => {
    resetDescent();
    setPhase('descent');
  };

  // Visibility / tab pause
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; }, { threshold: 0.05, rootMargin: '80px' });
    io.observe(el);
    const onVis = () => { if (document.hidden) visibleRef.current = false; };
    document.addEventListener('visibilitychange', onVis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  const step = (dt: number) => {
    const s = sim.current;
    const ph = phaseRef.current;
    s.t += dt;
    if (ph === 'orbit') {
      // Burn reduces eccentricity and nudges altitude toward 100 km
      const b = input.current.burn / 100; // −1..1 — magnitude circularises; sign is prograde/retrograde flavour
      const mag = Math.abs(b);
      s.e = Math.max(0, Math.min(0.9, s.e - mag * 0.4 * dt + (mag < 0.05 ? 0.015 * dt : 0)));
      // Pull altitude toward the ~100 km teaching target while thrusters are on
      s.alt += (TARGET_ALT_KM - s.alt) * (0.15 + mag * 1.2) * dt;
      s.vx = 1.4 + (TARGET_ALT_KM / Math.max(80, s.alt)) * 0.4 + s.e * 0.5;
      if (mag > 0.55) s.burnTime += dt; else s.burnTime = Math.max(0, s.burnTime - dt * 0.5);
      const circular = (s.e < 0.1 && Math.abs(s.alt - TARGET_ALT_KM) < 15) || s.burnTime > 2.2;
      if (circular) { s.e = Math.min(s.e, 0.05); s.alt = TARGET_ALT_KM + (s.alt - TARGET_ALT_KM) * 0.2; }
      setHud({
        altKm: s.alt, vega: s.vx, g: MOON_G, attitude: 0, fuel: 100,
        tamas: s.e > 0.35 && !circular,
        status: circular ? 'Candra-Kakṣyā matched. Unlock Vikram Descent.' : 'Burn Prāṇodana to circularise near 100 km.',
        statusSa: circular ? 'कक्षा सिद्धा। अवतरणं उद्घाटय।' : 'प्राणोदनेन कक्षा समीकुरु।',
      });
      if (circular) setOrbitDone(true);
    } else if (ph === 'descent') {
      const thr = input.current.vert; // 0..1
      const aCmd = input.current.att;
      // Max accel ~3.2 m/s² → hover near 50% throttle under lunar g (teaching sandbox, not ISRO flight numbers)
      let thrustA = thr * 3.2;
      if (s.fuel <= 0) thrustA = 0;
      s.vy += (MOON_G - thrustA) * dt;
      // Closed-loop teaching assist (modern guidance parallel): Samatva + throttle → track a soft profile
      if (thr > 0.3 && s.fuel > 0 && Math.abs(s.att) < 12 && s.h > 0) {
        // Target ↓ speed grows gently with altitude so the craft keeps descending into the soft window
        const targetVy = Math.min(SOFT_VY - 0.25, Math.max(0.9, 0.5 + s.h * 0.06));
        s.vy += (targetVy - s.vy) * Math.min(1, thr) * 4.5 * dt;
      }
      if (s.vy < -0.5) s.vy = -0.5; // tiny climb ok while braking; clamp runaway up
      s.h -= Math.max(0, s.vy) * dt; // altitude only falls on downward speed
      if (s.vy < 0) {
        // upward residual just cancels; do not gain altitude in this 1-D sandbox
        s.vy *= 0.5;
      }
      s.att += (aCmd * 40 - s.att * 0.35) * dt;
      if (thr > 0.02 && s.fuel > 0) s.fuel = Math.max(0, s.fuel - thr * 1.2 * dt);
      s.x += Math.sin((s.att * Math.PI) / 180) * 12 * dt
      const tamas = s.vy > 6 || Math.abs(s.att) > 18;
      setHud({
        altKm: Math.max(0, s.h / 1000), vega: s.vy, g: MOON_G, attitude: s.att, fuel: s.fuel,
        tamas,
        status: tamas ? 'Tamas rising — brake and level!' : 'Hold Samatva; soft-land under ~2 m/s.',
        statusSa: tamas ? 'तमः वर्धते — वेगं समत्वं च साधय।' : 'समत्वं धृत्वा मन्दं स्पृश।',
      });
      if (s.h <= 0) {
        s.h = 0;
        const soft = s.vy < SOFT_VY && Math.abs(s.att) < 15;
        setOutcome(soft ? 'soft' : 'crash');
        if (soft) {
          setSoftDone(true);
          setHud((h) => ({ ...h, vega: s.vy, attitude: s.att, tamas: false, status: 'Soft landing at Shiv Shakti Point!', statusSa: 'शिव-शक्ति-बिन्दौ मृदु-स्पर्शः!' }));
        } else {
          setHud((h) => ({ ...h, vega: s.vy, attitude: s.att, tamas: true, status: 'Descent Sequence Interrupted', statusSa: 'विक्षेप दोषः' }));
        }
      }
    } else {
      // rover
      const power = input.current.illum;
      s.battery = Math.max(0, Math.min(100, s.battery + (power > 0.35 ? 2 : -4) * dt));
      if (s.battery > 5) {
        s.heading += input.current.steer * 50 * dt;
        const sp = input.current.drive * 28 * (0.4 + power * 0.6);
        s.rx += Math.cos((s.heading * Math.PI) / 180) * sp * dt;
        s.ry += Math.sin((s.heading * Math.PI) / 180) * sp * dt;
        s.rx = Math.max(8, Math.min(92, s.rx));
        s.ry = Math.max(18, Math.min(88, s.ry));
      }
      setHud((h) => ({
        ...h, fuel: s.battery, g: MOON_G, vega: Math.abs(input.current.drive) * 0.4,
        tamas: power < 0.25 || s.battery < 15,
        status: power < 0.25 ? 'Sūrya window low — battery draining.' : 'Scan Pṛthivī-tattva patches. Ap-tattva is a hunt, not a claim.',
        statusSa: power < 0.25 ? 'सूर्य-प्रकाशः न्यूनः।' : 'पृथिवी-तत्त्वं अन्विष्य।',
      }));
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
    const s = sim.current;
    const ph = phaseRef.current;
    ctx.clearRect(0, 0, W, H);
    // night sky
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#020617');
    g.addColorStop(1, '#0f172a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.2 + (i % 5) * 0.1})`;
      ctx.fillRect((i * 97) % W, (i * 53) % (H * 0.55), 1.5, 1.5);
    }

    if (ph === 'orbit') {
      // Moon
      ctx.beginPath();
      ctx.arc(W * 0.5, H * 0.55, Math.min(W, H) * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = '#94a3b8';
      ctx.fill();
      ctx.fillStyle = 'rgba(15,23,42,0.35)';
      ctx.beginPath(); ctx.arc(W * 0.45, H * 0.5, 18, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(W * 0.58, H * 0.62, 12, 0, Math.PI * 2); ctx.fill();
      // target orbit
      const rT = Math.min(W, H) * 0.34;
      ctx.strokeStyle = 'rgba(52,211,153,0.45)';
      ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.ellipse(W * 0.5, H * 0.55, rT, rT * 0.55, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      // craft orbit (eccentric)
      const rA = rT * (0.7 + (s.alt - 80) / 200);
      const e = s.e;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(W * 0.5 + e * 28, H * 0.55, rA * (1 + e * 0.35), rA * 0.5 * (1 - e * 0.2), e * 0.4, 0, Math.PI * 2);
      ctx.stroke();
      const ang = s.t * 0.7;
      const cx = W * 0.5 + e * 28 + Math.cos(ang) * rA * (1 + e * 0.35);
      const cy = H * 0.55 + Math.sin(ang) * rA * 0.5 * (1 - e * 0.2);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(cx - 5, cy - 3, 10, 6);
      if (Math.abs(input.current.burn) > 8) {
        ctx.strokeStyle = '#fb923c';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx - Math.sign(input.current.burn) * 16, cy + 8);
        ctx.stroke();
      }
      ctx.fillStyle = '#99f6e4';
      ctx.font = '12px ui-monospace, monospace';
      ctx.fillText('Candra-Kakṣyā target ~100 km', 12, 20);
    } else if (ph === 'descent') {
      // terrain
      const groundY = H * 0.82;
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      for (let x = 0; x <= W; x += 8) {
        const n = Math.sin(x * 0.04) * 6 + Math.sin(x * 0.11) * 3;
        ctx.lineTo(x, groundY + n);
      }
      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
      // craters / hazards
      s.hazards.forEach((hz) => {
        ctx.beginPath();
        ctx.ellipse(hz.x * W, groundY - 4, hz.r * W, hz.r * 18, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
      });
      // Shiv Shakti marker
      ctx.fillStyle = '#fbbf24';
      ctx.font = '11px ui-monospace, monospace';
      ctx.fillText('◈ Shiv Shakti Point', W * 0.5 - 60, groundY + 22);
      // lander
      const lx = W * 0.5 + s.x * 3;
      const ly = groundY - 28 - (s.h / 1200) * (H * 0.55);
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate((s.att * Math.PI) / 180);
      ctx.fillStyle = outRef.current === 'crash' ? '#f87171' : '#e2e8f0';
      ctx.fillRect(-14, -10, 28, 18);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-18, 8, 8, 10);
      ctx.fillRect(10, 8, 8, 10);
      if (input.current.vert > 0.05 && outRef.current === 'flying') {
        ctx.fillStyle = `rgba(251,146,60,${0.4 + input.current.vert * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(-8, 10); ctx.lineTo(0, 10 + 18 * input.current.vert); ctx.lineTo(8, 10); ctx.fill();
      }
      ctx.restore();
      if (outRef.current === 'soft') {
        ctx.fillStyle = '#6ee7b7';
        ctx.font = 'bold 16px system-ui';
        ctx.fillText('SOFT LANDING — Vikram', W * 0.5 - 90, 36);
      }
    } else {
      // rover map
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, H * 0.15, W, H * 0.85);
      // illumination wash
      const sun = input.current.illum;
      ctx.fillStyle = `rgba(253,224,71,${0.05 + sun * 0.12})`;
      ctx.fillRect(0, 0, W, H);
      s.hazards.forEach((hz) => {
        ctx.beginPath();
        ctx.arc(hz.x * W, hz.y * H, hz.r * W, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.strokeStyle = '#475569';
        ctx.stroke();
      });
      s.patches.forEach((p) => {
        const m = MINERALS.find((x) => x.id === p.mid)!;
        const got = scannedRef.current.includes(p.mid);
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, 14, 0, Math.PI * 2);
        ctx.fillStyle = got ? (m.kind === 'ap' ? '#38bdf8' : '#a3e635') : 'rgba(148,163,184,0.35)';
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = '10px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(p.mid, p.x * W, p.y * H + 3);
        ctx.textAlign = 'start';
      });
      // rover
      const rx = (s.rx / 100) * W;
      const ry = (s.ry / 100) * H;
      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate((s.heading * Math.PI) / 180);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-10, -7, 20, 14);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(6, -4, 8, 8);
      ctx.restore();
      ctx.fillStyle = '#fef08a';
      ctx.font = '11px ui-monospace, monospace';
      ctx.fillText(`Tithi ${tithi} · Sūrya ${(sun * 100).toFixed(0)}% · Battery ${s.battery.toFixed(0)}%`, 10, 18);
    }
  };

  useEffect(() => {
    stepRef.current = step;
    drawRef.current = draw;
  });

  // Main loop
  useEffect(() => {
    seedTerrain();
    let last = performance.now();
    const loop = (now: number) => {
      raf.current = requestAnimationFrame(loop);
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      const canvas = canvasRef.current;
      if (!canvas) return;
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
      const run = !pauseRef.current && document.visibilityState === 'visible' && outRef.current === 'flying';
      if (run) stepRef.current(dt);
      drawRef.current(ctx, w, h);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fireLibs = () => {
    if (phase !== 'rover') return;
    if (sim.current.battery < 8) {
      setScanMsg('Battery too low for LIBS. Raise the Sūrya window.');
      return;
    }
    const s = sim.current;
    const hit = s.patches.find((p) => {
      const dx = (s.rx / 100) - p.x;
      const dy = (s.ry / 100) - p.y;
      return dx * dx + dy * dy < 0.025;
    });
    if (!hit) {
      setScanMsg('No patch under the rover. Drive onto a glowing sample.');
      return;
    }
    const m = MINERALS.find((x) => x.id === hit.mid)!;
    sim.current.battery = Math.max(0, sim.current.battery - 6);
    if (!scanned.includes(m.id)) setScanned((list) => [...list, m.id]);
    setScanMsg(`${m.en} · ${m.sa} (${m.iast}). ${m.note}`);
  };

  const enterPhase = (p: Phase) => {
    if (p === 'descent' && !orbitDone) return;
    if (p === 'rover' && !softDone) return;
    setPhase(p);
    setOutcome('flying');
    if (p === 'orbit') resetOrbit();
    if (p === 'descent') resetDescent();
    if (p === 'rover') resetRover();
  };

  const small = isSmallScreen();

  return (
    <div className="vl-sim cy-sim cy-mission" data-testid="chandrayaan-lab" data-orbit-done={orbitDone ? 'true' : 'false'} data-soft-done={softDone ? 'true' : 'false'} data-phase={phase} data-outcome={outcome}>
      <CoreIdea>
        Chandrayaan-3 (ISRO) soft-landed Vikram near the lunar south pole on 23 August 2023; the site was named Shiv Shakti Point.
        This sandbox uses Sanskrit HUD labels for modern flight quantities — teaching parallels, not a claim that Jyotiṣa proves orbital mechanics.
        Circularise Candra-Kakṣyā, soft-land Vikram (vertical Vega &lt; ~2 m/s, Samatva level), then drive Pragyan and scan with a LIBS-style laser.
      </CoreIdea>

      <div className="cy-lab cy-mission-lab" ref={wrapRef}>
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

            <HudFrame
              accent={hud.tamas ? '#f97316' : '#22d3ee'}
              tl={<>KAKṢYĀ {hud.altKm < 5 ? `${(hud.altKm * 1000).toFixed(0)} m` : `${hud.altKm.toFixed(0)} km`}</>}
              tr={<>VEGA {hud.vega.toFixed(2)} {phase === 'descent' ? 'm/s ↓' : 'km/s'}</>}
              bl={<>G {hud.g.toFixed(2)} m/s² · {phase === 'rover' ? `BATT ${hud.fuel.toFixed(0)}%` : `FUEL ${hud.fuel.toFixed(0)}%`}</>}
              br={<>{phase === 'descent' ? `SAMATVA ${hud.attitude.toFixed(0)}°` : phase === 'rover' ? `TITHI ${tithi}` : 'CANDRA-KAKṢYĀ'}</>}
            >
              <div className="cy-mission-stage" data-testid="cy-mission-stage">
                <canvas ref={canvasRef} className="cy-mission-canvas" data-testid="cy-mission-canvas" aria-label="Chandrayaan mission sandbox" />
                {outcome === 'crash' && (
                  <div className="cy-crash" role="alertdialog" aria-labelledby="cy-crash-title" data-testid="cy-crash">
                    <h3 id="cy-crash-title">Descent Sequence Interrupted <span lang="sa">// विक्षेप दोषः</span></h3>
                    <p>Recalibrate before restart:</p>
                    <ul>
                      <li><b>Prāṇodana thrusters</b> — burn earlier; do not wait until the last metres.</li>
                      <li><b>Vega &lt; 2 m/s</b> — match the planned Chandrayaan-3 vertical touchdown envelope.</li>
                      <li><b>Samatva</b> — keep attitude within about ±12° at contact or the lander tips.</li>
                    </ul>
                    <button type="button" className="cy-reset" onClick={restartCrash} data-testid="cy-restart">↺ Restart Descent</button>
                  </div>
                )}
              </div>
            </HudFrame>

            <div className={`cy-ticker${hud.tamas ? ' is-alert' : ''}`} role="status" data-testid="cy-ticker">
              <p className="cy-feed is-new">
                <b lang="sa">{hud.statusSa}</b> <span>{hud.status}</span>
                {hud.tamas && phase === 'descent' && outcome === 'flying' && <span className="cy-modern">⚠ Tamas (chaos) rising — vertical speed or tilt too high.</span>}
              </p>
            </div>
          </div>
        </div>

        <aside className="cy-panel" aria-label="Mission controls">
          <div className="cy-stats" data-testid="cy-stats">
            <div><span>PHASE</span><b>{PHASES.find((p) => p.id === phase)?.en}</b><small lang="sa">{PHASES.find((p) => p.id === phase)?.sa}</small></div>
            <div><span>GURUTVĀKARṢAṆA</span><b>{hud.g.toFixed(2)} m/s²</b><small>{phase === 'orbit' && hud.altKm > 200 ? 'near Earth→Moon transfer' : 'lunar surface g ≈ 1.62'}</small></div>
            <div><span>OUTCOME</span><b data-testid="cy-outcome">{outcome === 'flying' ? 'IN FLIGHT' : outcome === 'soft' ? 'SOFT LAND' : 'INTERRUPT'}</b><small>{scanned.length}/5 scans</small></div>
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

          {phase === 'descent' && outcome === 'flying' && (
            <div className="cy-group">
              <span className="cy-label">Vertical Prāṇodana</span>
              <GlowSlider label="Upward thrust" value={vertThrust} min={0} max={1} step={0.01} onChange={setVertThrust} valueText={`${(vertThrust * 100).toFixed(0)}%`} color="#fb923c" testId="cy-vert" ariaLabel="Vertical thruster" />
              <span className="cy-label">Samatva · attitude</span>
              <GlowSlider label="Tilt left / right" value={attitudeCmd} min={-1} max={1} step={0.01} onChange={setAttitudeCmd} valueText={attitudeCmd.toFixed(2)} color="#a78bfa" testId="cy-att" ariaLabel="Attitude thruster" />
              <p className="vl-small">Moon g ≈ 1.62 m/s². Soft-land if vertical Vega &lt; ~2 m/s and Samatva is nearly level.</p>
            </div>
          )}

          {phase === 'rover' && (
            <div className="cy-group">
              <span className="cy-label">Pragyan drive</span>
              <GlowSlider label="Drive" value={roverDrive} min={-1} max={1} step={0.01} onChange={setRoverDrive} valueText={roverDrive.toFixed(2)} color="#4ade80" testId="cy-drive" ariaLabel="Rover drive" />
              <GlowSlider label="Steer" value={roverSteer} min={-1} max={1} step={0.01} onChange={setRoverSteer} valueText={roverSteer.toFixed(2)} color="#2dd4bf" testId="cy-steer" ariaLabel="Rover steer" />
              <span className="cy-label">Sūrya illumination · Tithi</span>
              <GlowSlider label="Sūrya window" value={illum} min={0} max={1} step={0.01} onChange={setIllum} valueText={`${(illum * 100).toFixed(0)}%`} color="#fde047" testId="cy-sun" ariaLabel="Solar illumination" />
              <GlowSlider label="Tithi" value={tithi} min={1} max={15} step={1} onChange={setTithi} valueText={`tithi ${tithi}`} color="#c4b5fd" testId="cy-tithi" ariaLabel="Tithi" />
              <LedButton on kind="action" onClick={fireLibs} color="#38bdf8" testId="cy-libs" title="Fire LIBS-style scan">⚡ LIBS Scan</LedButton>
              <p className="vl-small" data-testid="cy-scan-msg">{scanMsg}</p>
              <ul className="cy-scan-list" data-testid="cy-scan-list">
                {MINERALS.map((m) => (
                  <li key={m.id} className={scanned.includes(m.id) ? 'is-got' : ''}>
                    <b>{m.id}</b> <span lang="sa">{m.sa}</span> · {m.kind === 'ap' ? 'ap-tattva' : 'pṛthivī-tattva'}
                  </li>
                ))}
              </ul>
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
            <li>Lander <b>Vikram</b>; rover <b>Pragyan</b>. Planned vertical touchdown speed &lt; ~2 m/s (PIB mission brief).</li>
            <li>Landing site named <b>Shiv Shakti Point</b> by the Prime Minister (26 Aug 2023); IAU form <em>Statio Shiv Shakti</em> (2024).</li>
            <li>This lab’s burns and fuel numbers are <b>for play</b>, not published propulsion tables.</li>
          </ul>
        </section>
        <section className="cy-lore" aria-label="LIBS and ice framing">
          <h3 className="cy-lore-title">📜 Scroll II <i>//</i> LIBS · sulphur · ice hunt</h3>
          <ul className="cy-list">
            <li>Pragyan’s <b>LIBS</b> made the first in-situ elemental measurements near the south pole and <b>confirmed sulphur (S)</b> (ISRO, 28 Aug 2023).</li>
            <li>Preliminary analyses also indicated Al, Ca, Fe, Cr, Ti, then Mn, Si, O.</li>
            <li>ISRO said thorough investigation regarding <b>hydrogen</b> was underway — water-ice remains a science goal / inferred theme in polar studies, <b>not</b> claimed here as a LIBS “ice find” equal to the sulphur result.</li>
          </ul>
        </section>
        <section className="cy-lore" aria-label="Sanskrit HUD teaching note">
          <h3 className="cy-lore-title">📜 Scroll III <i>//</i> Sanskrit names · teaching parallels</h3>
          <p className="vl-small">
            Kakṣyā, Gati, Vega, Gurutvākarṣaṇa, Tithi and Nakṣatra are real Sanskrit / Jyotiṣa vocabulary.
            Mapping them onto HUD readouts is a <b>teaching parallel</b> so learners hear the words beside modern quantities.
            It does <b>not</b> mean Vedic astronomy secretly contains rocket equations.
          </p>
        </section>
        <section className="cy-lore" aria-label="Modern comparison">
          <h3 className="cy-lore-title">🔬 Modern comparison (for fun)</h3>
          <ul className="cy-list">
            <li>Lunar surface gravity ≈ <b>1.62 m/s²</b> (~1/6 of Earth’s 9.81).</li>
            <li>Soft landing = low residual vertical speed + level attitude + hazard avoidance.</li>
            <li>Polar missions care about <b>solar illumination</b> and cold traps; solar-powered surface assets need a day-side window (~14 Earth days of lunar day for Ch-3’s design life).</li>
          </ul>
        </section>
      </div>

      <TermPanel title="Vocabulary Codex // Mission HUD Sanskrit" terms={TERMS} />
    </div>
  );
};

export default Chandrayaan;
