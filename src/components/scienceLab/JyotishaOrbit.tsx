import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChallengeList, TermPanel, type LabChallenge, type LabTerm, type LabSegmentProps } from './common';
import { GlowSlider } from './controls';
import { soundEffects } from '../../utils/soundEffects';

type Script = 'dev' | 'iast' | 'en';
type JyotishaMode = 'sandbox' | 'challenges' | 'lunar_tides' | 'nakshatras';
type ChallengeId = 'stable_orbit' | 'binary_stars' | 'slingshot' | 'crash_rescue';

// -------------------------------------------------------------------------
// 1. DATA CONFIGURATION & VOCABULARY
// -------------------------------------------------------------------------
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

const TERMS: LabTerm[] = [
  { dev: 'गुरुत्वाकर्षणम्', iast: 'gurutvākarṣaṇam', en: 'Gravitational attraction — mutual pulling force between mass bodies ($F = G \\frac{M m}{r^2}$)' },
  { dev: 'कक्षा', iast: 'kakṣā', en: 'Orbit — continuous freefall trajectory where forward speed balances inward gravitational pull' },
  { dev: 'कक्षीय-वेगः', iast: 'kakṣīya-vegaḥ', en: 'Orbital velocity — required speed ($v = \\sqrt{GM/r}$) to maintain stable circular orbit' },
  { dev: 'पलायन-वेगः', iast: 'palāyana-vegaḥ', en: 'Escape velocity — speed ($v_{esc} = \\sqrt{2GM/r}$) required to break free from gravitational binding energy' },
  { dev: 'उपग्रहः', iast: 'upagrahaḥ', en: 'Satellite (natural or artificial) revolving around a primary planet' },
  { dev: 'राहु-केतु', iast: 'Rāhu, Ketu', en: 'The two lunar orbital nodes where the Moon’s 5.14° inclined path intersects Earth’s ecliptic' },
];

const CHALLENGES: LabChallenge[] = [
  {
    q: 'Why does an orbiting planet not crash into the Sun even though the Sun is pulling it with immense gravitational force?',
    options: [
      'The planet possesses high sideways (tangential) velocity, so as it falls toward the Sun, the surface curves away beneath it at the exact same rate.',
      'Space has no gravity, so planets float freely without any downward pull.',
      'The Sun pushes planets away with solar heat wind that cancels out gravity.',
      'Planets are attached to invisible glass spheres that keep them fixed.',
    ],
    answer: 0,
    explain: 'An orbit is continuous perpetual freefall: gravity bends the planet’s path into an ellipse/circle, but the forward velocity ensures it constantly misses the central body.',
  },
  {
    q: 'If a probe accelerates past escape velocity ($v > \\sqrt{2} \\cdot v_{circ}$), what trajectory shape does its path become?',
    options: [
      'Hyperbolic escape trajectory (it never returns to the star).',
      'It immediately stops moving and freezes.',
      'A perfect tiny circle.',
      'A sharp right angle zigzag.',
    ],
    answer: 0,
    explain: 'When total mechanical energy ($E = K + U$) is greater than zero ($v > v_{esc}$), the orbital eccentricity $e > 1$, forming an open hyperbolic escape trajectory.',
  },
  {
    q: 'In classical Indian astronomy (Āryabhaṭīya & Sūrya Siddhānta), what physically are Rāhu and Ketu?',
    options: [
      'The two mathematical nodes where the Moon’s inclined orbital plane cuts the Earth’s ecliptic plane.',
      'Two physical dark dwarf planets hidden behind Jupiter.',
      'Cosmic lasers that destroy passing satellites.',
      'Solid crystal pyramids floating in deep space.',
    ],
    answer: 0,
    explain: 'Āryabhaṭa proved in the 5th century CE that eclipses occur purely through shadow geometry (Chāyā) when Sun, Moon, and Earth align near the two orbital nodes (Pātāḥ / Rāhu-Ketu).',
  },
];

interface GravityChallengeConfig {
  id: ChallengeId;
  titleDev: string;
  titleEn: string;
  badge: string;
  desc: string;
  goal: string;
  setup: {
    sunMass: number;
    planetMass: number;
    speedFactor: number;
    distance: number;
    moon: boolean;
    binary: boolean;
    slingshotProbe: boolean;
  };
  diagnostic: string;
}

const GRAVITY_CHALLENGES: Record<ChallengeId, GravityChallengeConfig> = {
  stable_orbit: {
    id: 'stable_orbit',
    titleDev: 'स्थिर-सौरमण्डलम्',
    titleEn: '1. Stable Circular Orbit',
    badge: 'Orbital Mechanics',
    desc: 'Calibrate the tangential velocity of Pṛthivī so it achieves a stable near-circular path without spiraling in or escaping.',
    goal: 'Maintain an orbital eccentricity < 0.15 for 3 complete revolutions.',
    setup: { sunMass: 1.0, planetMass: 1.0, speedFactor: 1.0, distance: 168, moon: true, binary: false, slingshotProbe: false },
    diagnostic: 'Circular orbital speed requires $v = \\sqrt{GM/r}$. If velocity is too low, the planet plunges into the star; if too high, it stretches into an ellipse or escapes.',
  },
  binary_stars: {
    id: 'binary_stars',
    titleDev: 'द्वितारा-युगलम्',
    titleEn: '2. Binary Star System',
    badge: 'Barycenter Physics',
    desc: 'Witness two massive stars of equal mass orbiting their common center of mass (barycenter). Observe how binary stars perturb planetary paths.',
    goal: 'Observe both stars rotating smoothly around the central crosshair barycenter.',
    setup: { sunMass: 1.2, planetMass: 1.2, speedFactor: 0.95, distance: 140, moon: false, binary: true, slingshotProbe: false },
    diagnostic: 'In a binary system, neither star is stationary. Both accelerate around their mutual barycenter according to Newton’s third law.',
  },
  slingshot: {
    id: 'slingshot',
    titleDev: 'गुरुत्वीय-प्रक्षेपः',
    titleEn: '3. Gravitational Slingshot',
    badge: 'Deep Space Navigation',
    desc: 'Launch a light scientific probe past a massive gas giant planet. Steal a fraction of the planet’s orbital momentum to slingshot out of the solar system.',
    goal: 'Guide the probe to gain speed during flyby and achieve an escape trajectory.',
    setup: { sunMass: 1.2, planetMass: 3.5, speedFactor: 0.85, distance: 180, moon: false, binary: false, slingshotProbe: true },
    diagnostic: 'A gravitational slingshot (gravity assist) transfers angular momentum from a moving planet to a lightweight spacecraft, boosting velocity without fuel consumption.',
  },
  crash_rescue: {
    id: 'crash_rescue',
    titleDev: 'ग्रह-संरक्षणम्',
    titleEn: '4. Planetary Crash Rescue',
    badge: 'Emergency Telemetry',
    desc: 'Atmospheric drag has severely slowed down the planet to 55% of circular speed. It is spiraling inward towards the star! Apply tangential velocity thrust before it burns up!',
    goal: 'Boost velocity above 0.95× before distance drops below 35px.',
    setup: { sunMass: 1.0, planetMass: 1.0, speedFactor: 0.58, distance: 168, moon: false, binary: false, slingshotProbe: false },
    diagnostic: 'When orbital velocity is reduced, gravity overpowers centrifugal inertia. Increasing tangential speed lifts the periapsis back into safe space.',
  },
};

// -------------------------------------------------------------------------
// 2. SIMULATION CONSTANTS & N-BODY PHYSICS ENGINE
// -------------------------------------------------------------------------
const SIZE = 640;
const C = SIZE / 2;
const A_EARTH = 168;
const MOON_R = 14;
const T_EARTH = 24;
const GM_SUN = (4 * Math.PI * Math.PI * A_EARTH ** 3) / (T_EARTH * T_EARTH);
const EARTH_RATIO = 0.03;
const MOON_RATIO = 0.0123;
const SUBSTEPS = 40;
const DT = 1 / 60 / SUBSTEPS;
const TRAIL = 1200;

interface Body {
  m: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  name: string;
  color: string;
  radius: number;
}

interface SimState {
  bodies: Body[];
  moonOn: boolean;
  t: number;
  trails: { x: number; y: number }[][];
  status: 'ok' | 'fell' | 'escaped' | 'moon-lost' | 'moon-crash';
  statusExplanation: string;
  orbitalSpeed: number;
  distance: number;
  gravForce: number;
  moonAngle: number;
  moonPrevAngle: number;
  naksIdx: number;
  naksCrossed: number;
  earthAngle: number;
  earthPrevAngle: number;
  isBinary: boolean;
  isSlingshot: boolean;
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

function naksFor(angle: number): number {
  const a = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  return Math.floor(a / ((2 * Math.PI) / 27)) % 27;
}


// -------------------------------------------------------------------------
// 3. MAIN COMPONENT: JYOTIṢA GRAVITY SANDBOX
// -------------------------------------------------------------------------
export const JyotishaOrbit: React.FC<LabSegmentProps> = ({ onNextLab }) => {
  const [activeMode, setActiveMode] = useState<JyotishaMode>('sandbox');
  const [activeChallenge, setActiveChallenge] = useState<ChallengeId>('stable_orbit');
  const [script] = useState<Script>('dev');
  const [showTrails, setShowTrails] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(false);

  // User adjustable physics parameters
  const [sunMassMult, setSunMassMult] = useState<number>(1.0);
  const [planetMassMult, setPlanetMassMult] = useState<number>(1.0);
  const [speedMult, setSpeedMult] = useState<number>(1.0);
  const [orbitalRadius, setOrbitalRadius] = useState<number>(168);
  const [includeMoon, setIncludeMoon] = useState<boolean>(true);

  // Lunar phases mini-mission state
  const [lunarDay, setLunarDay] = useState<number>(1); // 1-30 tithi

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<SimState | null>(null);
  const animRef = useRef<number | null>(null);

  // Initialize or reset physical simulation state
  const initState = useCallback((
    sunF = sunMassMult,
    earthF = planetMassMult,
    speedF = speedMult,
    rad = orbitalRadius,
    moon = includeMoon,
    binary = false,
    slingshot = false
  ): SimState => {
    const ms = GM_SUN * sunF;
    const me = GM_SUN * EARTH_RATIO * earthF;
    const mm = me * MOON_RATIO;
    const vCirc = Math.sqrt(ms / rad);
    const ve = vCirc * speedF;
    const vm = Math.sqrt(me / MOON_R);

    let bodies: Body[] = [];

    if (binary) {
      // Two equal mass stars orbiting mutual barycenter
      const dHalf = rad * 0.45;
      const vBin = Math.sqrt((GM_SUN * sunF) / (4 * dHalf));
      const star1: Body = { m: ms, x: C - dHalf, y: C, vx: 0, vy: vBin, ax: 0, ay: 0, name: 'Sūrya-A', color: '#f59e0b', radius: 14 };
      const star2: Body = { m: ms, x: C + dHalf, y: C, vx: 0, vy: -vBin, ax: 0, ay: 0, name: 'Sūrya-B', color: '#fbbf24', radius: 14 };
      // Light outer planet orbiting both
      const pDist = rad * 1.35;
      const vOuter = Math.sqrt((2 * ms) / pDist) * speedF;
      const planet: Body = { m: me, x: C, y: C - pDist, vx: vOuter, vy: 0, ax: 0, ay: 0, name: 'Pṛthivī', color: '#60a5fa', radius: 8 };
      bodies = [star1, star2, planet];
    } else if (slingshot) {
      // Central Star + Massive Gas Giant + Fast Scientific Probe
      const sun: Body = { m: ms, x: C, y: C, vx: 0, vy: 0, ax: 0, ay: 0, name: 'Sūrya', color: '#fbbf24', radius: 18 };
      const jupiterDist = rad * 1.05;
      const vJup = Math.sqrt(ms / jupiterDist);
      const jupiter: Body = { m: me * 4.5, x: C + jupiterDist, y: C, vx: 0, vy: -vJup, ax: 0, ay: 0, name: 'Bṛhaspati', color: '#ea580c', radius: 12 };
      // Probe heading towards Jupiter for slingshot flyby
      const probe: Body = { m: 0.0001, x: C - 130, y: C + 65, vx: vCirc * 0.85, vy: -vCirc * 0.25, ax: 0, ay: 0, name: 'Somayāna-Probe', color: '#38bdf8', radius: 4 };
      bodies = [sun, jupiter, probe];
    } else {
      // Standard Sun + Earth (+ Moon)
      const sun: Body = { m: ms, x: C, y: C, vx: 0, vy: 0, ax: 0, ay: 0, name: 'Sūrya', color: '#fbbf24', radius: 18 };
      const earth: Body = { m: me, x: C + rad, y: C, vx: 0, vy: -ve, ax: 0, ay: 0, name: 'Pṛthivī', color: '#60a5fa', radius: 8 };
      const moonBody: Body = { m: mm, x: earth.x + MOON_R, y: C, vx: 0, vy: earth.vy - vm, ax: 0, ay: 0, name: 'Candra', color: '#e2e8f0', radius: 3.5 };
      bodies = moon ? [sun, earth, moonBody] : [sun, earth];
    }

    // Zero net momentum so barycenter stays stationary
    const px = bodies.reduce((s, b) => s + b.m * b.vx, 0);
    const py = bodies.reduce((s, b) => s + b.m * b.vy, 0);
    const mt = bodies.reduce((s, b) => s + b.m, 0);
    for (const b of bodies) {
      b.vx -= px / mt;
      b.vy -= py / mt;
    }
    accel(bodies, bodies.length);

    const initialDist = Math.hypot(bodies[1].x - bodies[0].x, bodies[1].y - bodies[0].y);
    const initialSpeed = Math.hypot(bodies[1].vx - bodies[0].vx, bodies[1].vy - bodies[0].vy);
    const initialForce = (bodies[0].m * bodies[1].m) / (initialDist * initialDist);

    return {
      bodies,
      moonOn: moon,
      t: 0,
      trails: bodies.map(() => []),
      status: 'ok',
      statusExplanation: 'Stable ongoing trajectory.',
      orbitalSpeed: Number(initialSpeed.toFixed(2)),
      distance: Math.round(initialDist),
      gravForce: Number(initialForce.toFixed(2)),
      moonAngle: 0,
      moonPrevAngle: moon ? Math.atan2(-(bodies[2]?.y - bodies[1].y), bodies[2]?.x - bodies[1].x) : 0,
      naksIdx: moon ? naksFor(0) : 0,
      naksCrossed: 0,
      earthAngle: 0,
      earthPrevAngle: 0,
      isBinary: binary,
      isSlingshot: slingshot,
    };
  }, [sunMassMult, planetMassMult, speedMult, orbitalRadius, includeMoon]);

  // Load a challenge scenario
  const handleSelectChallenge = (cId: ChallengeId) => {
    setActiveChallenge(cId);
    const cfg = GRAVITY_CHALLENGES[cId];
    setSunMassMult(cfg.setup.sunMass);
    setPlanetMassMult(cfg.setup.planetMass);
    setSpeedMult(cfg.setup.speedFactor);
    setOrbitalRadius(cfg.setup.distance);
    setIncludeMoon(cfg.setup.moon);

    stateRef.current = initState(
      cfg.setup.sunMass,
      cfg.setup.planetMass,
      cfg.setup.speedFactor,
      cfg.setup.distance,
      cfg.setup.moon,
      cfg.setup.binary,
      cfg.setup.slingshotProbe
    );
    soundEffects.playStrokeChime();
  };

  // Run the physics step and update diagnostics
  const stepPhysics = useCallback((s: SimState) => {
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

    const [b0, b1] = b;
    const de = Math.hypot(b1.x - b0.x, b1.y - b0.y);
    const curSpeed = Math.hypot(b1.vx - b0.vx, b1.vy - b0.vy);
    const vCirc = Math.sqrt(b0.m / de);
    const vEsc = Math.sqrt(2 * b0.m / de);

    s.distance = Math.round(de);
    s.orbitalSpeed = Number(curSpeed.toFixed(2));
    s.gravForce = Number(((b0.m * b1.m) / (de * de)).toFixed(2));

    // Collision detection
    if (de < b0.radius + b1.radius + 2 && s.status === 'ok') {
      s.status = 'fell';
      s.statusExplanation = `💥 Planetary Crash! The planet was moving too slowly (${curSpeed.toFixed(1)} px/s vs circular speed ${vCirc.toFixed(1)} px/s). Solar gravity overpowered orbital forward momentum and pulled the planet inward into the star.`;
      soundEffects.playErrorBuzzer();
    } else if (de > 350 && s.status === 'ok') {
      const v2 = (b1.vx - b0.vx) ** 2 + (b1.vy - b0.vy) ** 2;
      if (v2 / 2 - (b0.m + b1.m) / de > 0) {
        s.status = 'escaped';
        s.statusExplanation = `🚀 Hyperbolic Escape! Orbital speed (${curSpeed.toFixed(1)} px/s) exceeded the escape threshold (v_esc = ${vEsc.toFixed(1)} px/s). The body broke free from gravitational binding energy into deep space.`;
        soundEffects.playLaserPulse();
      }
    }

    // Trajectory trails
    b.forEach((body, i) => {
      const tr = s.trails[i];
      tr.push({ x: body.x, y: body.y });
      if (tr.length > TRAIL) tr.shift();
    });
  }, []);

  // Canvas drawing loop
  useEffect(() => {
    if (!stateRef.current) {
      stateRef.current = initState();
    }

    let isMounted = true;

    const render = () => {
      if (!isMounted) return;
      const cvs = canvasRef.current;
      const s = stateRef.current;
      if (!cvs || !s) return;

      if (!paused) {
        stepPhysics(s);
      }

      const ctx = cvs.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, SIZE, SIZE);

        // Dark celestial vacuum
        const g = ctx.createRadialGradient(C, C, 40, C, C, C);
        g.addColorStop(0, '#0a0f24');
        g.addColorStop(1, '#020617');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, SIZE, SIZE);

        // Fixed background star field
        ctx.fillStyle = 'rgba(226,232,240,0.45)';
        for (let i = 0; i < 75; i += 1) {
          const x = (i * 197.3) % SIZE;
          const y = (i * 131.7 + (i % 7) * 41) % SIZE;
          ctx.fillRect(x, y, i % 9 === 0 ? 1.6 : 1, i % 9 === 0 ? 1.6 : 1);
        }

        // Nakshatra Outer Zodiac Ring
        const R1 = 265;
        const R2 = 315;
        const seg = (2 * Math.PI) / 27;
        for (let i = 0; i < 27; i += 1) {
          const a0 = -i * seg;
          const a1 = -(i + 1) * seg;
          ctx.beginPath();
          ctx.arc(C, C, R2, a0, a1, true);
          ctx.arc(C, C, R1, a1, a0, false);
          ctx.closePath();
          ctx.fillStyle = i % 2 ? 'rgba(99, 102, 241, 0.08)' : 'rgba(139, 92, 246, 0.05)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
          ctx.lineWidth = 0.5;
          ctx.stroke();

          const mid = -(i + 0.5) * seg;
          ctx.save();
          ctx.translate(C + Math.cos(mid) * ((R1 + R2) / 2), C + Math.sin(mid) * ((R1 + R2) / 2));
          let rot = mid + Math.PI / 2;
          if (Math.sin(mid) > 0) rot += Math.PI;
          ctx.rotate(rot);
          ctx.fillStyle = '#94a3b8';
          ctx.font = `500 ${script === 'dev' ? 10 : 8.5}px "Noto Sans Devanagari", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(script === 'dev' ? NAKSHATRAS[i].dev : NAKSHATRAS[i].iast, 0, 0);
          ctx.restore();
        }

        // Barycenter / Center of gravity crosshair
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(C - 8, C); ctx.lineTo(C + 8, C);
        ctx.moveTo(C, C - 8); ctx.lineTo(C, C + 8);
        ctx.stroke();

        // Orbital Trails
        if (showTrails) {
          s.trails.forEach((tr, i) => {
            if (tr.length < 2) return;
            ctx.beginPath();
            ctx.moveTo(tr[0].x, tr[0].y);
            for (let j = 1; j < tr.length; j += 1) {
              ctx.lineTo(tr[j].x, tr[j].y);
            }
            ctx.strokeStyle = i === 0 ? 'rgba(251, 191, 36, 0.35)' : i === 1 ? 'rgba(96, 165, 250, 0.75)' : 'rgba(56, 189, 248, 0.6)';
            ctx.lineWidth = i === 1 ? 2 : 1.2;
            ctx.stroke();
          });
        }

        // Render Celestial Bodies
        s.bodies.forEach((b) => {
          // Luminous aura
          const aura = ctx.createRadialGradient(b.x, b.y, b.radius * 0.4, b.x, b.y, b.radius * 2.2);
          aura.addColorStop(0, b.color);
          aura.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = aura;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 2.2, 0, 2 * Math.PI);
          ctx.fill();

          // Physical Body Sphere
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, 2 * Math.PI);
          ctx.fill();

          // Body Label
          ctx.fillStyle = '#f8fafc';
          ctx.font = '700 11px system-ui, sans-serif';
          ctx.fillText(b.name, b.x + b.radius + 4, b.y + 4);
        });

        // Real-Time Telemetry HUD Overlay (Top-Left of Canvas)
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1;
        ctx.fillRect(16, 16, 175, 88);
        ctx.strokeRect(16, 16, 175, 88);

        ctx.fillStyle = '#38bdf8';
        ctx.font = '800 10px monospace';
        ctx.fillText('ORBITAL TELEMETRY', 24, 32);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '600 11px sans-serif';
        ctx.fillText(`Radius (r): ${s.distance} px`, 24, 50);
        ctx.fillText(`Velocity (v): ${s.orbitalSpeed} px/s`, 24, 68);
        ctx.fillText(`Force (Fg): ${s.gravForce} N`, 24, 86);
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [paused, showTrails, script, stepPhysics, initState]);

  // Restart / Reset Sandbox
  const handleReset = () => {
    stateRef.current = initState();
    soundEffects.playStrokeChime();
  };

  // Quick Velocity Boost / Retro (Planetary Rescue thrust)
  const applyVelocityImpulse = (deltaFactor: number) => {
    if (!stateRef.current) return;
    const b = stateRef.current.bodies[1];
    if (b) {
      b.vx *= deltaFactor;
      b.vy *= deltaFactor;
      soundEffects.playRocketLaunchSound();
    }
  };

  return (
    <div className="vl-segment-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* =========================================================================
          TOP HERO BANNER & ASTRONOMICAL SCALE DISCLAIMER
          ========================================================================= */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
          border: '1.5px solid rgba(129, 140, 248, 0.4)',
          borderRadius: '16px',
          padding: '1.25rem 1.6rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🪐</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#a5b4fc', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              SEC-05 · ASTROPHYSICS &amp; ORBITAL GRAVITY
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#f8fafc', margin: '0.3rem 0 0.2rem' }}>
            Jyotiṣa Gravity Sandbox <span lang="sa" style={{ color: '#c7d2fe', fontWeight: 700 }}>गुरुत्व-कक्षा-क्रीडा</span>
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1', maxWidth: '750px', lineHeight: 1.5 }}>
            <strong>Observe. Question. Discover.</strong> Set masses and initial velocities to explore orbital mechanics, binary stars, and gravitational slingshot maneuvers. Understand why orbits fall or escape through universal gravitation.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div style={{ display: 'inline-flex', background: 'rgba(15, 23, 42, 0.65)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
          <button
            type="button"
            onClick={() => { setActiveMode('sandbox'); soundEffects.playStrokeChime(); }}
            style={{
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              border: 'none',
              background: activeMode === 'sandbox' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
              color: activeMode === 'sandbox' ? '#ffffff' : '#94a3b8',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>🌌</span>
            <span>Gravity Sandbox</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveMode('challenges'); soundEffects.playStrokeChime(); }}
            style={{
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              border: 'none',
              background: activeMode === 'challenges' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
              color: activeMode === 'challenges' ? '#ffffff' : '#94a3b8',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>🎯</span>
            <span>Orbit Challenges</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveMode('lunar_tides'); soundEffects.playStrokeChime(); }}
            style={{
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              border: 'none',
              background: activeMode === 'lunar_tides' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
              color: activeMode === 'lunar_tides' ? '#ffffff' : '#94a3b8',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>🌙</span>
            <span>Phases &amp; Tides</span>
          </button>
        </div>
      </div>

      {/* Planetary Scale Warning Disclaimer */}
      <div
        style={{
          background: 'rgba(245, 158, 11, 0.1)',
          borderLeft: '4px solid #f59e0b',
          borderRadius: '8px',
          padding: '0.75rem 1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.84rem',
          color: '#fef3c7',
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>⚠️</span>
        <div>
          <strong>Astronomical Scale Disclaimer:</strong> Real space is immense: the Sun’s diameter is 109× Earth, and 1 Astronomical Unit is 11,700× Earth’s diameter. If rendered to true scale, planets would be sub-pixel invisible specks! Radii and distances here are normalized for interactive physical exploration.
        </div>
      </div>

      {/* =========================================================================
          MODE 1 & 2: GRAVITY SANDBOX & ORBIT PRESET CHALLENGES
          ========================================================================= */}
      {(activeMode === 'sandbox' || activeMode === 'challenges') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Preset Challenge Strip if in challenges mode */}
          {activeMode === 'challenges' && (
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(129, 140, 248, 0.3)',
                borderRadius: '16px',
                padding: '1.1rem',
              }}
            >
              <div style={{ fontSize: '0.74rem', color: '#a5b4fc', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                🎯 PRESET GRAVITATIONAL CHALLENGES
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.65rem' }}>
                {(Object.keys(GRAVITY_CHALLENGES) as ChallengeId[]).map((cKey) => {
                  const cfg = GRAVITY_CHALLENGES[cKey];
                  const isCur = activeChallenge === cKey;
                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => handleSelectChallenge(cKey)}
                      style={{
                        padding: '0.75rem 0.9rem',
                        borderRadius: '10px',
                        border: isCur ? '1.5px solid #6366f1' : '1px solid rgba(148, 163, 184, 0.2)',
                        background: isCur ? 'rgba(99, 102, 241, 0.22)' : 'rgba(30, 41, 59, 0.5)',
                        color: isCur ? '#ffffff' : '#cbd5e1',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontSize: '0.7rem', color: '#a5b4fc', fontWeight: 800 }}>{cfg.badge}</span>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.15rem' }}>{cfg.titleEn}</div>
                    </button>
                  );
                })}
              </div>

              {/* Challenge Brief */}
              <div style={{ marginTop: '0.85rem', padding: '0.75rem 1rem', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '8px', borderLeft: '3px solid #6366f1' }}>
                <div style={{ fontSize: '0.84rem', color: '#f1f5f9' }}>
                  <strong>Objective:</strong> {GRAVITY_CHALLENGES[activeChallenge].desc}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#a5b4fc', marginTop: '0.25rem' }}>
                  <strong>Scientific Goal:</strong> {GRAVITY_CHALLENGES[activeChallenge].goal}
                </div>
              </div>
            </div>
          )}

          {/* Interactive Simulation Arena: Canvas & Controls Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.35fr) minmax(280px, 1fr)', gap: '1.25rem' }}>
            {/* Canvas Container */}
            <div
              style={{
                background: '#020617',
                border: '1.5px solid rgba(129, 140, 248, 0.35)',
                borderRadius: '16px',
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                position: 'relative',
              }}
            >
              <canvas
                ref={canvasRef}
                width={SIZE}
                height={SIZE}
                style={{ width: '100%', height: 'auto', maxHeight: '540px', borderRadius: '12px', display: 'block' }}
              />

              {/* Real-time "Why Did It Happen?" Diagnostic Banner on Failure */}
              {stateRef.current && stateRef.current.status !== 'ok' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    background: stateRef.current.status === 'fell' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(14, 165, 233, 0.95)',
                    color: '#ffffff',
                    padding: '0.85rem 1.1rem',
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                    fontSize: '0.85rem',
                    lineHeight: 1.45,
                    zIndex: 10,
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                    🔍 DIAGNOSTIC: WHY DID THIS HAPPEN?
                  </div>
                  <div>{stateRef.current.statusExplanation}</div>
                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      marginTop: '0.5rem',
                      background: '#ffffff',
                      color: '#0f172a',
                      fontWeight: 800,
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.3rem 0.75rem',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                    }}
                  >
                    🔄 Re-launch Simulation
                  </button>
                </div>
              )}
            </div>

            {/* Control Panel: Sliders & Quick Thrust Impulses */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(129, 140, 248, 0.25)',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.74rem', color: '#a5b4fc', fontWeight: 800, textTransform: 'uppercase' }}>
                    ASTROPHYSICAL VARIABLE TUNING
                  </span>
                  <h3 style={{ margin: '0.15rem 0 0', fontSize: '1.15rem', color: '#f8fafc', fontWeight: 800 }}>
                    Adjust Mass, Radius &amp; Velocity
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <GlowSlider
                    label="☀️ Central Star Mass (M_sun)"
                    value={sunMassMult}
                    min={0.3}
                    max={2.5}
                    step={0.1}
                    color="#fbbf24"
                    onChange={(v) => { setSunMassMult(v); stateRef.current = initState(v); soundEffects.playStrokeChime(); }}
                  />

                  <GlowSlider
                    label="🪐 Orbital Distance (Radius r)"
                    value={orbitalRadius}
                    min={80}
                    max={220}
                    step={5}
                    color="#38bdf8"
                    onChange={(v) => { setOrbitalRadius(v); stateRef.current = initState(sunMassMult, planetMassMult, speedMult, v); soundEffects.playStrokeChime(); }}
                  />

                  <GlowSlider
                    label="🚀 Initial Velocity Factor (v / v_circ)"
                    value={speedMult}
                    min={0.3}
                    max={1.8}
                    step={0.05}
                    color="#a78bfa"
                    onChange={(v) => { setSpeedMult(v); stateRef.current = initState(sunMassMult, planetMassMult, v, orbitalRadius); soundEffects.playStrokeChime(); }}
                  />
                </div>

                {/* Planetary Rescue Thrust Buttons */}
                <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    ⚡ Real-Time Thrust Burn (Δv)
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => applyVelocityImpulse(1.15)}
                      style={{
                        flex: 1,
                        padding: '0.45rem 0.65rem',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      🚀 Prograde Thrust (+15% v)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyVelocityImpulse(0.85)}
                      style={{
                        flex: 1,
                        padding: '0.45rem 0.65rem',
                        background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      🛑 Retrograde Burn (-15% v)
                    </button>
                  </div>
                </div>
              </div>

              {/* Simulation Toolbar */}
              <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(148,163,184,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => { setPaused(!paused); soundEffects.playStrokeChime(); }}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: paused ? '#10b981' : '#f59e0b',
                      color: '#0f172a',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    {paused ? '▶ Resume' : '⏸ Pause'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(148,163,184,0.3)',
                      background: 'rgba(30,41,59,0.6)',
                      color: '#f8fafc',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    🔄 Reset Orbits
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.75rem', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <input
                      type="checkbox"
                      checked={showTrails}
                      onChange={(e) => setShowTrails(e.target.checked)}
                    />
                    Trails
                  </label>
                  <label style={{ fontSize: '0.75rem', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <input
                      type="checkbox"
                      checked={includeMoon}
                      onChange={(e) => {
                        setIncludeMoon(e.target.checked);
                        stateRef.current = initState(sunMassMult, planetMassMult, speedMult, orbitalRadius, e.target.checked);
                      }}
                    />
                    Moon
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 3: LUNAR PHASES, TIDES & ECLIPSES MINI-MISSION
          ========================================================================= */}
      {activeMode === 'lunar_tides' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(129, 140, 248, 0.3)',
              borderRadius: '16px',
              padding: '1.5rem',
            }}
          >
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.74rem', color: '#a5b4fc', fontWeight: 800, textTransform: 'uppercase' }}>
                MINI-MISSION // LUNAR GEOMETRY &amp; GRAVITATIONAL TIDES
              </span>
              <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.35rem', color: '#f8fafc', fontWeight: 900 }}>
                Candra-Kalāḥ: Moon Phases, Ocean Tides &amp; Eclipse Nodes
              </h3>
            </div>

            {/* Interactive Tithi / Phase Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
              <GlowSlider
                label="🌓 Lunar Day (तिथि / Tithi): 1 to 30"
                value={lunarDay}
                min={1}
                max={30}
                step={1}
                color="#e0e7ff"
                onChange={(v) => { setLunarDay(v); soundEffects.playStrokeChime(); }}
              />
            </div>

            {/* Visual Diagrams: 3 Column Display */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {/* Card 1: Lunar Phase Visual */}
              <div style={{ background: '#0b1120', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#cbd5e1', textTransform: 'uppercase', fontWeight: 800 }}>Moon Appearance</span>
                <div style={{ fontSize: '4rem', margin: '0.6rem 0' }}>
                  {lunarDay === 30 ? '🌑' : lunarDay < 7 ? '🌒' : lunarDay === 8 ? '🌓' : lunarDay < 15 ? '🌔' : lunarDay === 15 ? '🌕' : lunarDay < 22 ? '🌖' : lunarDay === 23 ? '🌗' : '🌘'}
                </div>
                <h4 style={{ margin: 0, color: '#f8fafc', fontSize: '1rem' }}>
                  {lunarDay === 15 ? 'पूर्णिमा (Full Moon)' : lunarDay === 30 ? 'अमावास्या (New Moon)' : lunarDay <= 15 ? `शुक्लपक्षः · Day ${lunarDay}` : `कृष्णपक्षः · Day ${lunarDay - 15}`}
                </h4>
                <p style={{ margin: '0.45rem 0 0', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  Sunlight illuminates 50% of the Moon always; the phase we see from Earth is purely the illuminated angle visible from our position.
                </p>
              </div>

              {/* Card 2: Ocean Tides */}
              <div style={{ background: '#0b1120', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 800 }}>Differential Gravity</span>
                <h4 style={{ margin: '0.4rem 0 0.35rem', color: '#f8fafc', fontSize: '1rem' }}>
                  🌊 Oceanic Tides (ज्वार-भाटा)
                </h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  {lunarDay === 15 || lunarDay === 30 ? (
                    <strong style={{ color: '#67e8f9' }}>Spring Tides (बृहत्-ज्वारः):</strong>
                  ) : (
                    <strong style={{ color: '#a5b4fc' }}>Neap Tides (लघु-ज्वारः):</strong>
                  )}{' '}
                  {lunarDay === 15 || lunarDay === 30
                    ? 'Sun and Moon align along the same axis (Syzygy). Their gravitational pulls combine to produce the highest ocean bulges.'
                    : 'Sun and Moon form a 90° right angle. Their gravitational pulls counteract each other, yielding moderate tides.'}
                </p>
              </div>

              {/* Card 3: Eclipses & Rahu-Ketu */}
              <div style={{ background: '#0b1120', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <span style={{ fontSize: '0.72rem', color: '#f87171', textTransform: 'uppercase', fontWeight: 800 }}>Orbital Node Intersections</span>
                <h4 style={{ margin: '0.4rem 0 0.35rem', color: '#f8fafc', fontSize: '1rem' }}>
                  🌑 Eclipses (सूर्य-चन्द्र-ग्रहणम्)
                </h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  The Moon’s orbit is tilted <strong>5.14°</strong> relative to Earth’s ecliptic plane. Eclipses can only occur when a New Moon or Full Moon falls directly on the intersection nodes (<strong>Rāhu</strong> or <strong>Ketu</strong>).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cross-Cutting Educational Terms & Challenges */}
      <TermPanel terms={TERMS} />
      <ChallengeList items={CHALLENGES} />

      {/* Direct Next Lab (SEC-06 Somayana Chandrayaan) Gateway */}
      {onNextLab && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.15))',
            border: '1.5px solid rgba(6, 182, 212, 0.4)',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>🛰️</span>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>
                NEXT SPACE LAB // SEC-06
              </span>
              <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', color: '#f8fafc', fontWeight: 900 }}>
                Somayāna Mission-03 · Lunar Spaceflight &amp; Lander Telemetry
              </h4>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: '#cbd5e1' }}>
                Advance from planetary orbits to staged rocket propulsion, trans-lunar injection &amp; soft-landing!
              </p>
            </div>
          </div>

          <button
            type="button"
            className="vl-btn vl-btn--cyber"
            onClick={onNextLab}
            style={{
              padding: '0.75rem 1.4rem',
              fontSize: '0.92rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
              color: '#090e17',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <span>ENTER SOMAYĀNA LAB ➔</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default JyotishaOrbit;
