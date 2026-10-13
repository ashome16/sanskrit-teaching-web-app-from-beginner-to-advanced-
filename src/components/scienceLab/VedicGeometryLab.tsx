import React, { useState, useRef, useEffect } from 'react';
import { BodhiLabAnecdote, TermPanel, ChallengeList, type LabTerm, type LabChallenge, type LabSegmentProps } from './common';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/science-lab.css';

// ---------------------------------------------------------------------------
// DATA: Sanskrit Geometry & Root Action Terms
// ---------------------------------------------------------------------------
const GEOMETRY_TERMS: LabTerm[] = [
  {
    dev: 'रेखागणितम्',
    iast: 'Rekhā-Gaṇitam',
    en: 'Geometry / Calculation of Traced Lines',
    note: 'From root Rikh (to scratch, sketch, or trace a path). A line is the physical trajectory of a moving point of energy.',
  },
  {
    dev: 'त्रिकोणमिति',
    iast: 'Trikoṇamiti',
    en: 'Trigonometry (Measurement of Angles)',
    note: 'Tri (three) + Koṇa (corner/angle) + Miti (measure). The etymological and conceptual ancestor of modern Trigonometry.',
  },
  {
    dev: 'वृत्तम् · वर्तुलम्',
    iast: 'Vṛttam · Vartulam',
    en: 'Circle / Rotational Trajectory',
    note: 'From root Vṛt (to roll, turn, revolve). The circle is the structural outcome of continuous rotation.',
  },
  {
    dev: 'भूगोलः',
    iast: 'Bhūgolaḥ',
    en: 'Spherical Earth / Geography',
    note: 'Gola denotes a sphere (round and hollow). Bhūgola directly records the ancient Indian scientific realization of the Earth’s spherical form.',
  },
  {
    dev: 'ब्रह्माण्डम्',
    iast: 'Brahmāṇḍam',
    en: 'Cosmic Egg / Universal Ellipsoid',
    note: 'Brahma + Aṇḍa (egg). The Vedas define cosmic orbits and universal geometry as Aṇḍa-ākāra (elliptical/egg-shaped), anticipating modern elliptical astronomy.',
  },
  {
    dev: 'शङ्कुः',
    iast: 'Śaṅkuḥ',
    en: 'Geometric Cone / Gnomon',
    note: 'Named after Śaṅkha (the sacred natural sea shell). Derived from observing nature’s conical acoustic spirals.',
  },
  {
    dev: 'घनः',
    iast: 'Ghanaḥ',
    en: 'Cube / Solid Crystalline State',
    note: 'Denotes both the 3D geometric cube (volume) and physical solidification (crystals/ice phase change), uniting geometry with chemistry.',
  },
  {
    dev: 'शुल्बसूत्रम्',
    iast: 'Śulba-Sūtram',
    en: 'Vedic Cord Geometry & Altar Construction',
    note: 'From Śulb (to measure with a rope/cord). Contains Baudhāyana’s theorem (the geometric precursor to Pythagoras).',
  },
];

const GEOMETRY_CHALLENGES: LabChallenge[] = [
  {
    q: 'How does the Sanskrit root ‘Vṛt’ (वृत्) transform our understanding of a circle (Vṛtta)?',
    options: [
      'A circle is an arbitrary static set of points on paper.',
      'A circle is not a static drawing, but the dynamic structural outcome of rotation (to roll or revolve).',
      'A circle represents linear motion without angular change.',
      'A circle is defined solely by perimeter measurement cords.',
    ],
    answer: 1,
    explain: 'Root Vṛt means to roll, turn, or revolve. Its derivatives Vṛtta and Vartula teach learners that a circle is a living rotational event.',
  },
  {
    q: 'Why does the Sanskrit word ‘Ghana’ (घन) bridge mathematics and physical chemistry?',
    options: [
      'It only calculates 2D surface areas of flat rectangles.',
      'It identifies both a geometric cube (volume mathematics) and the physical phase change of crystallization/solidification.',
      'It refers strictly to gaseous cloud formations.',
      'It is an astronomical term for solar eclipses.',
    ],
    answer: 1,
    explain: 'Ghana denotes both cubic volume ($a^3$) and solid state matter (such as ice freezing into a crystalline cube lattice), unifying chemistry and geometry.',
  },
  {
    q: 'What astronomical truth was embedded in the Vedic name for the universe, ‘Brahmāṇḍa’ (ब्रह्माण्ड)?',
    options: [
      'Planetary orbits are perfect static circles.',
      'The universe is a flat disc supported on four pillars.',
      'The universe and planetary orbital paths are elliptical/egg-shaped (Aṇḍa-ākāra), rather than simplistic perfect circles.',
      'Space has zero curvature and infinite Euclidean rigidity.',
    ],
    answer: 2,
    explain: 'Aṇḍa means egg. By naming the cosmos Brahmāṇḍa, ancient astronomers recognized the oval/elliptical curvature of orbital paths long before Keplerian astrophysics.',
  },
  {
    q: 'According to the Gurukul philosophy of Rekhā-Gaṇita, what are the two primary universal actions behind all forms?',
    options: [
      'Addition and Subtraction of numbers.',
      'The Activity of Rotation (Vṛt) and the Activity of Extension (Rikh/Tanu).',
      'Combustion and Evaporation.',
      'Gravity and Friction.',
    ],
    answer: 1,
    explain: 'Creation is unified into two primal actions: Rotation (driving orbits, atoms, galaxies) and Extension (shaping waves, crystals, and root growth).',
  },
];

type ShapeKey = 'rekha' | 'trikona' | 'chatushkona' | 'vritta' | 'gola' | 'brahmanda' | 'shanku' | 'ghana';

interface ShapeMeta {
  key: ShapeKey;
  dev: string;
  iast: string;
  name: string;
  icon: string;
  root: string;
  rootMeaning: string;
  physicalEvent: string;
  blurb: string;
}

const SHAPES: Record<ShapeKey, ShapeMeta> = {
  rekha: {
    key: 'rekha',
    dev: 'रेखा',
    iast: 'Rekhā',
    name: 'The Line',
    icon: '📏',
    root: 'Rikh (ऋख् / लिख्)',
    rootMeaning: 'To scratch, sketch, or trace a path',
    physicalEvent: 'Trajectory of a moving energy point',
    blurb: 'A line is never static; it is the physical pathway left behind by a point of consciousness in motion.',
  },
  trikona: {
    key: 'trikona',
    dev: 'त्रिकोण व त्रिकोणमिति',
    iast: 'Trikoṇa & Trikoṇamiti',
    name: 'Triangle & Trigonometry',
    icon: '📐',
    root: 'Tri + Koṇa + Miti (त्रि + कोण + मिति)',
    rootMeaning: 'Three + corner/angle + measurement',
    physicalEvent: 'Vector angular convergence',
    blurb: 'Tri (three) + Koṇa (corner) evolved into corner; adding Miti (measure) gives Trikonamiti—ancestor of modern Trigonometry.',
  },
  chatushkona: {
    key: 'chatushkona',
    dev: 'चतुष्कोण',
    iast: 'Catuṣkoṇa',
    name: 'Quadrilateral & Altars',
    icon: '🟩',
    root: 'Catur + Koṇa (चतुर् + कोण)',
    rootMeaning: 'Four corners / orthogonal boundary',
    physicalEvent: 'Orthogonal area bounding (Śulba Citis)',
    blurb: 'In the Śulba Sūtras, cords manipulate four-angled figures to preserve exact sacred area during shape transformations.',
  },
  vritta: {
    key: 'vritta',
    dev: 'वृत्त व वर्तुल',
    iast: 'Vṛtta & Vartula',
    name: 'The Circle',
    icon: '⭕',
    root: 'Vṛt (वृत्)',
    rootMeaning: 'To roll, turn, or revolve',
    physicalEvent: 'Rotational equilibrium',
    blurb: 'A circle is the structural outcome of continuous rotation. Form is the fingerprint of motion.',
  },
  gola: {
    key: 'gola',
    dev: 'गोल व भूगोल',
    iast: 'Gola & Bhūgola',
    name: 'The Sphere & Planet',
    icon: '🌐',
    root: 'Gola (गोल)',
    rootMeaning: 'Round and hollow volume',
    physicalEvent: 'Spherical planetary mass curvature',
    blurb: 'Gola captures both roundness and hollowness. Bhūgola (Earth-Sphere) taught children planetary geography through geometry.',
  },
  brahmanda: {
    key: 'brahmanda',
    dev: 'ब्रह्माण्ड (अण्डाकार)',
    iast: 'Brahmāṇḍa (Aṇḍa-ākāra)',
    name: 'The Cosmic Egg & Ellipse',
    icon: '🥚',
    root: 'Brahma + Aṇḍa (ब्रह्म + अण्ड)',
    rootMeaning: 'Cosmic Egg / Oval curvature',
    physicalEvent: 'Keplerian orbital eccentricity',
    blurb: 'Planetary orbits and galactic envelopes are not circles; they are ovals. The Vedic name for the cosmos encoded this truth.',
  },
  shanku: {
    key: 'shanku',
    dev: 'शङ्कु (शङ्खाद् उद्भूतम्)',
    iast: 'Śaṅku',
    name: 'The Cone (from Conch Shell)',
    icon: '🐚',
    root: 'Derived from Śaṅkha (शङ्ख)',
    rootMeaning: 'Sacred sea conch shell',
    physicalEvent: 'Fibonacci logarithmic acoustic spiral',
    blurb: 'A cone was not invented as an abstract formula; it was borrowed directly from the natural logarithmic spiral of the conch shell.',
  },
  ghana: {
    key: 'ghana',
    dev: 'घन (घनता व स्फटिकम्)',
    iast: 'Ghana',
    name: 'The Cube of Solidification',
    icon: '🧊',
    root: 'Han / Ghan (हन् / घन्)',
    rootMeaning: 'To strike together, solidify, compact',
    physicalEvent: 'Phase change to crystalline lattice',
    blurb: 'Ghana means both a geometric cube ($a^3$) and physical solid crystal, seamlessly unifying geometry with phase chemistry.',
  },
};

const SHAPE_KEYS: ShapeKey[] = ['rekha', 'trikona', 'chatushkona', 'vritta', 'gola', 'brahmanda', 'shanku', 'ghana'];

// Chapter timestamps for the Conscious Cosmos video
const VIDEO_CHAPTERS = [
  { ts: 11, label: '0:11 · Introduction & Sacred Shapes' },
  { ts: 150, label: '2:30 · Root Actions: Rikh to Rekhā' },
  { ts: 315, label: '5:15 · Trikoṇamiti & Trigonometry' },
  { ts: 525, label: '8:45 · Vṛtta & Rotational Form' },
  { ts: 720, label: '12:00 · Brahmāṇḍa: The Cosmic Oval' },
  { ts: 920, label: '15:20 · Ghana: Cube & Crystallization' },
  { ts: 1120, label: '18:40 · Universal Actions: Rotation & Extension' },
];

export const VedicGeometryLab: React.FC<LabSegmentProps> = ({ onNextLab }) => {
  const [selectedShape, setSelectedShape] = useState<ShapeKey>('rekha');
  const [cosmicAction, setCosmicAction] = useState<'rotation' | 'extension' | 'unified'>('rotation');
  const [videoTimestamp, setVideoTimestamp] = useState<number>(11);
  const [theaterMode, setTheaterMode] = useState<boolean>(false);
  const [animTick, setAnimTick] = useState<number>(0);

  // Interactive slider controls for the live sandbox
  const [paramA, setParamA] = useState<number>(50); // General parameter 1 (e.g., length, radius, angle)
  const [paramB, setParamB] = useState<number>(50); // General parameter 2 (e.g., eccentricity, temperature)

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation ticker for 60fps simulation canvas
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      setAnimTick((t) => (t + 1) % 3600);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Jump to specific chapter in Conscious Cosmos video
  const handleSeekVideo = (ts: number) => {
    soundEffects.playStrokeChime();
    setVideoTimestamp(ts);
  };

  const handleSelectShape = (key: ShapeKey) => {
    soundEffects.playStrokeChime();
    setSelectedShape(key);
  };

  const currentMeta = SHAPES[selectedShape];

  // Canvas renderer for the interactive living geometry sandbox
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const w = cvs.width;
    const h = cvs.height;
    ctx.clearRect(0, 0, w, h);

    // Subtle dark blueprint grid
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const cx = w / 2;
    const cy = h / 2;
    const t = animTick * 0.03;

    // Render based on selected shape archetype
    if (selectedShape === 'rekha') {
      // 1. REKHĀ: Moving energy point tracing a trajectory (Root: Rikh)
      const length = 60 + paramA * 1.6;
      const angle = (paramB / 100) * Math.PI * 2 + (cosmicAction === 'rotation' ? t * 0.5 : 0);
      const x1 = cx - Math.cos(angle) * (length / 2);
      const y1 = cy - Math.sin(angle) * (length / 2);
      const x2 = cx + Math.cos(angle) * (length / 2);
      const y2 = cy + Math.sin(angle) * (length / 2);

      // Glowing traced trail
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Moving energy point
      const progress = (Math.sin(t * 1.5) + 1) / 2;
      const px = x1 + (x2 - x1) * progress;
      const py = y1 + (y2 - y1) * progress;
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Coordinate marker
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`P_traversed (${Math.round(px)}, ${Math.round(py)})`, px + 10, py - 10);
      ctx.fillText(`Vector: Rikh Energy Trajectory // Length: ${Math.round(length)}px`, 15, h - 15);
    } else if (selectedShape === 'trikona') {
      // 2. TRIKOṆA & TRIKOṆAMITI: Triangle with angle arcs and Baudhayana right-triangle decomposition
      const r = 50 + paramA * 0.8;
      const tilt = (paramB / 100) * Math.PI - Math.PI / 2;

      // Vertices
      const pA = { x: cx, y: cy - r };
      const pB = { x: cx - r * Math.cos(tilt), y: cy + r * 0.8 };
      const pC = { x: cx + r * 1.1, y: cy + r * 0.8 };

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.lineTo(pC.x, pC.y);
      ctx.closePath();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Fill with subtle warm glow
      ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
      ctx.fill();

      // Right-triangle altitude (Koṭi & Jyā)
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pA.x, pC.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Vertex dots
      [pA, pB, pC].forEach((pt, idx) => {
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(['A (Śikhara)', 'B (Koṇa 1)', 'C (Koṇa 2)'][idx], pt.x + 8, pt.y - 6);
      });
      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('Koṭi (Height) & Jyā (Base) // Trikonamiti Anchor', 15, h - 15);
    } else if (selectedShape === 'chatushkona') {
      // 3. CATUṢKOṆA: Altar boundary geometry (Śulba Citis)
      const size = 60 + paramA * 0.9;
      const shear = (paramB - 50) * 0.6;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.moveTo(cx - size + shear, cy - size);
      ctx.lineTo(cx + size + shear, cy - size);
      ctx.lineTo(cx + size - shear, cy + size);
      ctx.lineTo(cx - size - shear, cy + size);
      ctx.closePath();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.fill();

      // Diagonals (Akṣṇayā-rajjuḥ)
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
      ctx.beginPath();
      ctx.moveTo(cx - size + shear, cy - size);
      ctx.lineTo(cx + size - shear, cy + size);
      ctx.moveTo(cx + size + shear, cy - size);
      ctx.lineTo(cx - size - shear, cy + size);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#a7f3d0';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('Śulba-Citis: Akṣṇayā-Rajjuḥ (Diagonal Cord Alignment)', 15, h - 15);
    } else if (selectedShape === 'vritta') {
      // 4. VṚTTA: Rotational wheel (Root: Vṛt)
      const r = 40 + paramA * 0.8;
      const rot = t * (paramB / 40);

      // Outer circle
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Rotating spokes showing rotational event
      const numSpokes = 8;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < numSpokes; i++) {
        const ang = rot + (i / numSpokes) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
        ctx.stroke();
      }

      // Center hub & rolling marker
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      const markerX = cx + Math.cos(rot) * r;
      const markerY = cy + Math.sin(rot) * r;
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(markerX, markerY, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#67e8f9';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`Vṛt (Revolve) // Circumference: ${Math.round(2 * Math.PI * r)}px · ω = ${(paramB / 40).toFixed(1)} rad/s`, 15, h - 15);
    } else if (selectedShape === 'gola') {
      // 5. GOLA & BHŪGOLA: 3D wireframe rotating globe
      const r = 50 + paramA * 0.7;
      const rot = t * 0.5;

      // Outer rim
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Meridians (Longitudes)
      for (let i = -2; i <= 2; i++) {
        const rx = Math.abs(r * Math.cos(rot + (i * Math.PI) / 5));
        ctx.strokeStyle = i === 0 ? '#60a5fa' : 'rgba(96, 165, 250, 0.35)';
        ctx.lineWidth = i === 0 ? 1.5 : 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, r, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Parallels (Latitudes)
      for (let j = -2; j <= 2; j++) {
        const latY = cy + (j * r) / 3;
        const latW = Math.sqrt(Math.max(0, r * r - ((j * r) / 3) * ((j * r) / 3)));
        ctx.strokeStyle = j === 0 ? '#38bdf8' : 'rgba(56, 189, 248, 0.25)';
        ctx.beginPath();
        ctx.ellipse(cx, latY, latW, latW * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = '#93c5fd';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('Bhūgola (Earth-Sphere): Spherical Mass & Hollow Interior Definition', 15, h - 15);
    } else if (selectedShape === 'brahmanda') {
      // 6. BRAHMĀṆḌA: Cosmic Egg & Keplerian Orbital Ellipse
      const a = 60 + paramA * 0.8; // Semi-major axis
      const ecc = (paramB / 100) * 0.75; // Eccentricity
      const b = a * Math.sqrt(1 - ecc * ecc); // Semi-minor axis
      const c = a * ecc; // Focus distance

      // Elliptical Orbit
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Two Foci
      const f1 = { x: cx - c, y: cy };
      const f2 = { x: cx + c, y: cy };

      // Sun at Focus 1 (Sūrya)
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(f1.x, f1.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Empty Focus 2 (Bindu)
      ctx.fillStyle = 'rgba(168, 85, 247, 0.7)';
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(f2.x, f2.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Planet traversing orbit
      const planetAngle = t * (1 - ecc * 0.5);
      const px = cx + a * Math.cos(planetAngle);
      const py = cy + b * Math.sin(planetAngle);

      ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(f1.x, f1.y);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#d8b4fe';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`Brahmāṇḍa (Cosmic Egg): Eccentricity e = ${ecc.toFixed(2)} // Sūrya at Primary Focus`, 15, h - 15);
    } else if (selectedShape === 'shanku') {
      // 7. ŚAṄKU: Cone & Conch Spiral (Śaṅkha)
      const baseR = 30 + paramA * 0.7;
      const height = 60 + paramB * 0.9;
      const apex = { x: cx, y: cy - height / 2 };
      const baseCy = cy + height / 2;

      // Base Ellipse
      ctx.strokeStyle = '#14b8a6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(cx, baseCy, baseR, baseR * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Slant Edges
      ctx.beginPath();
      ctx.moveTo(apex.x, apex.y);
      ctx.lineTo(cx - baseR, baseCy);
      ctx.moveTo(apex.x, apex.y);
      ctx.lineTo(cx + baseR, baseCy);
      ctx.stroke();

      // Fibonacci Conch Shell Spiral Trace
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (let s = 0; s < 50; s++) {
        const phi = (s / 50) * Math.PI * 6;
        const progress = s / 50;
        const spiralR = progress * baseR * 0.85;
        const spiralY = apex.y + progress * height;
        const sx = cx + Math.cos(phi) * spiralR;
        const sy = spiralY + Math.sin(phi) * (spiralR * 0.25);
        if (s === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      ctx.fillStyle = '#5eead4';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('Śaṅku (Cone) Born from Śaṅkha (Sea Shell): Natural Acoustic Spiral', 15, h - 15);
    } else {
      // 8. GHANA: Crystalline Solid Cube (Phase Change Chemistry)
      const a = 40 + paramA * 0.5;
      const temp = paramB; // High temp = fluid chaos; Low temp = crystalline rigid lattice
      const jitter = (temp / 100) * 8;

      ctx.strokeStyle = temp < 40 ? '#0284c7' : '#f97316';
      ctx.lineWidth = 2.5;

      // 3D Isometric Cube Projection
      const offset = a * 0.55;
      const fx1 = cx - a, fy1 = cy - a / 2;
      const fx2 = cx, fy2 = cy - a / 2 - offset * 0.5;
      const fx3 = cx + a, fy3 = cy - a / 2;
      const fx4 = cx, fy4 = cy - a / 2 + offset * 0.5;

      const by1 = fy1 + a, by2 = fy2 + a, by3 = fy3 + a, by4 = fy4 + a;

      // Draw Cube Edges
      ctx.beginPath();
      // Top face
      ctx.moveTo(fx1, fy1); ctx.lineTo(fx2, fy2); ctx.lineTo(fx3, fy3); ctx.lineTo(fx4, fy4); ctx.closePath();
      // Front Left
      ctx.moveTo(fx1, fy1); ctx.lineTo(fx1, by1); ctx.lineTo(fx4, by4); ctx.lineTo(fx4, fy4);
      // Front Right
      ctx.moveTo(fx4, fy4); ctx.lineTo(fx4, by4); ctx.lineTo(fx3, by3); ctx.lineTo(fx3, fy3);
      ctx.stroke();

      // Crystalline Lattice Nodes (Molecules locking in)
      const nodes = [
        { x: fx1, y: fy1 }, { x: fx2, y: fy2 }, { x: fx3, y: fy3 }, { x: fx4, y: fy4 },
        { x: fx1, y: by1 }, { x: fx2, y: by2 }, { x: fx3, y: by3 }, { x: fx4, y: by4 },
        { x: cx, y: cy },
      ];

      nodes.forEach((n) => {
        const jx = (Math.sin(t * 3 + n.x) * jitter);
        const jy = (Math.cos(t * 3 + n.y) * jitter);
        ctx.fillStyle = temp < 40 ? '#38bdf8' : '#fb923c';
        ctx.beginPath();
        ctx.arc(n.x + jx, n.y + jy, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = temp < 40 ? '#7dd3fc' : '#fdba74';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`Ghana: Crystalline Lattice Solidification // Temp: ${temp}°C (${temp < 40 ? 'Rigid Solid Crystal' : 'Thermal Dissolution'})`, 15, h - 15);
    }

    // -----------------------------------------------------------------------
    // The Two Universal Cosmic Actions Background Overlay
    // -----------------------------------------------------------------------
    if (cosmicAction === 'rotation' || cosmicAction === 'unified') {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    if (cosmicAction === 'extension' || cosmicAction === 'unified') {
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.15)';
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      ctx.moveTo(0, cy); ctx.lineTo(w, cy);
      ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [selectedShape, paramA, paramB, cosmicAction, animTick]);

  return (
    <div className="vl-sim vl-geo-sim" data-testid="vedic-geometry-root">
      {/* 1. Bodhi Lab Anecdote */}
      <BodhiLabAnecdote
        title="Baudhāyana, Pāṇini & The Living Geometry of the Gurukul"
        sanskritTitle="गुरुकुलस्य जीवन्त-रेखागणितम् · शब्द-सृष्टि-सङ्गमः"
        mood="scholar"
        sutra={{
          dev: 'ऋख गतौ (पाणिनि-धातुपाठः १.१२४) ।\nवृत् वर्तने (धातुपाठः १.७९५) ।\nदीर्घचतुरश्रस्याक्ष्णया रज्जुः पार्श्वमानी तिर्यङ्मानी च यत् पृथग् भूते कुरुतस्तदुभयं करोति ॥',
          iast: 'rikh gatau (pāṇini-dhātupāṭha 1.124) |\nvṛt vartane (dhātupāṭha 1.795) |\ndīrghacaturaśrasyākṣṇayā rajjuḥ pārśvamānī tiryaṅmānī ca yat pṛthag bhūte kurutas tad ubhayaṃ karoti ||',
          source: 'Pāṇini Dhātupāṭha & Baudhāyana Śulba Sūtra 1.48',
          meaning: '“Rikh denotes motion and traced pathway; Vṛt denotes turning, rolling, and revolving. The cord stretched across the diagonal of a rectangle produces by itself an area equal to the sum of the areas produced separately by its length and breadth.”',
        }}
        anecdote={
          <>
            <p>
              In the traditional Gurukul curriculum, mathematics was never segregated into an abstract, lifeless box.
              Sanskrit is an explicitly engineered linguistic architecture built around <strong>Dhātus (root actions)</strong>.
              When a student learned geometry, the name of a shape was not a disconnected sound attached to a plastic block:
              it directly described the physical, cosmic action that generates the shape.
            </p>
            <p>
              A line (<em>Rekhā</em>) is not static: it is the traced scratch-path (<em>Rikh</em>) of a moving point of energy.
              A circle (<em>Vṛtta</em>) is the structural residue of rotation (<em>Vṛt</em>). A cone (<em>Śaṅku</em>) is borrowed
              from the natural Fibonacci spiral of the conch shell (<em>Śaṅkha</em>). And a cube (<em>Ghana</em>) collapses the boundary
              between mathematics and chemistry, describing crystalline phase solidification alongside volume.
            </p>
          </>
        }
        epistemologyAndMethod={
          <>
            Vedic geometry operates through <strong>Pratyakṣa (direct observation of natural form)</strong> paired with
            <strong>Śulba (empirical cord measurement)</strong>. By grounding geometry in root actions, learners perceive that
            every geometric shape is an event occurring in consciousness, seamlessly connecting engineering with spiritual self-realization.
          </>
        }
        modernBridge={{
          ancientConcept: 'Dhātu-driven structural geometry: Rekhā (traced energy vector), Vṛtta (rotational equilibrium), Brahmāṇḍa (elliptical orbit), and Ghana (solid crystal phase).',
          modernScience: 'Vector calculus, differential geometry of curves and surfaces, Kepler’s first law of elliptical planetary orbits, and solid-state crystallographic lattices.',
          relevanceNote: 'Modern physics now validates what the seers encoded in language: matter is standing wave geometry, orbits are ovals (Brahmāṇḍa), and lines are relativistic space-time world lines.',
        }}
        societalValue={
          <p>
            Understanding living geometry prevents cognitive fragmentation in education. By showing that grammar, physics,
            astronomy, and art are mutually resonant facets of a unified cosmic reality, the Gurukul model fosters integrated
            systems thinkers capable of building sustainable technologies in harmony with the natural order.
          </p>
        }
      />

      {/* 2. Conscious Cosmos Curated Documentary Video Player Console */}
      <div className="vl-panel" style={{ background: 'linear-gradient(135deg, rgba(24,34,60,0.95), rgba(15,23,42,0.95))', border: '1.5px solid rgba(245,158,11,0.4)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', color: '#f59e0b', fontWeight: 800 }}>
              <span className="vl-hud-blink">●</span> CONSCIOUS COSMOS ARCHIVE // OFFICIAL DOCUMENTARY MASTERCLASS
            </div>
            <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.28rem', color: '#f8fafc', fontWeight: 900 }}>
              🎥 Vedic Geometry: The Science of Shapes
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem', borderRadius: '8px', background: 'rgba(245,158,11,0.15)', color: '#fde047', fontWeight: 700, border: '1px solid rgba(245,158,11,0.3)' }}>
              Curated by Conscious Cosmos
            </span>
            <button
              type="button"
              className="vl-btn vl-btn--cyber-ghost"
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
              onClick={() => setTheaterMode((prev) => !prev)}
            >
              {theaterMode ? 'Standard View' : 'Theater Mode ⛶'}
            </button>
          </div>
        </div>

        {/* Video Embed Frame */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: theaterMode ? '100%' : '880px',
          margin: '0 auto',
          paddingBottom: theaterMode ? '56.25%' : '50%',
          height: 0,
          background: '#030712',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(245,158,11,0.3)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
        }}>
          <iframe
            key={`cc-video-${videoTimestamp}`}
            src={`https://www.youtube-nocookie.com/embed/bp9m53Tp6xg?start=${videoTimestamp}&rel=0&autoplay=0`}
            title="Vedic Geometry: The Science Of Shapes by Conscious Cosmos"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Chapter Quick-Jump Buttons */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#cbd5e1', marginBottom: '0.4rem', fontWeight: 700 }}>
            ⚡ JUMP TO DOCUMENTARY CHAPTERS:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {VIDEO_CHAPTERS.map((ch) => (
              <button
                key={ch.ts}
                type="button"
                className={`vl-btn vl-btn--cyber${videoTimestamp === ch.ts ? ' is-active' : ''}`}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.35rem 0.7rem',
                  background: videoTimestamp === ch.ts ? '#f59e0b' : 'rgba(30,41,59,0.85)',
                  color: videoTimestamp === ch.ts ? '#090e17' : '#fde047',
                  borderColor: 'rgba(245,158,11,0.4)',
                }}
                onClick={() => handleSeekVideo(ch.ts)}
              >
                {ch.label}
              </button>
            ))}
            <a
              href="https://www.youtube.com/watch?v=bp9m53Tp6xg&t=11s"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.74rem',
                color: '#ef4444',
                textDecoration: 'none',
                fontWeight: 700,
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)',
              }}
            >
              <span>Watch on YouTube ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Interactive Living Geometry Simulation Bench */}
      <div className="vl-panel" style={{ background: 'linear-gradient(135deg, rgba(24,34,60,0.95), rgba(15,23,42,0.95))', border: '1.5px solid rgba(56,189,248,0.35)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', color: '#38bdf8', fontWeight: 800 }}>
              <span className="vl-hud-blink">●</span> REKHĀ-GAṆITA REALITY SANDBOX // 8 VEDIC ARCHETYPES
            </div>
            <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.2rem', color: '#f8fafc', fontWeight: 800 }}>
              Shape-to-Action Transformer · आकार-क्रिया-दर्शनम्
            </h3>
          </div>

          {/* Universal Cosmic Action Toggles */}
          <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(15,23,42,0.85)', padding: '0.3rem', borderRadius: '10px', border: '1px solid rgba(148,163,184,0.3)' }}>
            <button
              type="button"
              className={`vl-btn vl-btn--cyber${cosmicAction === 'rotation' ? ' is-active' : ''}`}
              style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}
              onClick={() => { soundEffects.playStrokeChime(); setCosmicAction('rotation'); }}
              title="Vṛt: Governing planetary orbits and atomic spins"
            >
              🔄 Rotation (Vṛt)
            </button>
            <button
              type="button"
              className={`vl-btn vl-btn--cyber${cosmicAction === 'extension' ? ' is-active' : ''}`}
              style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}
              onClick={() => { soundEffects.playStrokeChime(); setCosmicAction('extension'); }}
              title="Rikh/Tanu: Governing waves, crystals, and root sprouting"
            >
              ↔️ Extension (Rikh)
            </button>
            <button
              type="button"
              className={`vl-btn vl-btn--cyber${cosmicAction === 'unified' ? ' is-active' : ''}`}
              style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}
              onClick={() => { soundEffects.playStrokeChime(); setCosmicAction('unified'); }}
              title="Unified: Both actions forming living matter"
            >
              ✨ Unified Resonance
            </button>
          </div>
        </div>

        {/* 8 Shape Archetype Selector Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1rem' }} role="tablist" aria-label="Vedic Shapes">
          {SHAPE_KEYS.map((k) => {
            const sh = SHAPES[k];
            const isSelected = selectedShape === k;
            return (
              <button
                key={k}
                type="button"
                className={`vl-btn vl-btn--cyber${isSelected ? ' is-active' : ''}`}
                style={{
                  fontSize: '0.78rem',
                  padding: '0.45rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: isSelected ? 'linear-gradient(135deg, #0284c7, #38bdf8)' : 'rgba(30,41,59,0.85)',
                  color: isSelected ? '#030712' : '#f1f5f9',
                  borderColor: isSelected ? '#38bdf8' : 'rgba(148,163,184,0.3)',
                  fontWeight: isSelected ? 800 : 600,
                }}
                onClick={() => handleSelectShape(k)}
              >
                <span>{sh.icon}</span>
                <span>{sh.name}</span>
                <span lang="sa" style={{ fontSize: '0.72rem', opacity: 0.85 }}>({sh.dev})</span>
              </button>
            );
          })}
        </div>

        {/* Sandbox Canvas & Meta Readout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', alignItems: 'stretch' }}>
          {/* Canvas Box */}
          <div style={{ background: '#090f1d', borderRadius: '12px', border: '1.5px solid rgba(56,189,248,0.32)', padding: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <canvas
              ref={canvasRef}
              width={380}
              height={260}
              style={{ width: '100%', maxWidth: '380px', height: '260px', background: 'radial-gradient(circle at center, #18223c 0%, #090f1d 100%)', borderRadius: '8px' }}
            />
            {/* Live Sliders */}
            <div style={{ width: '100%', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#cbd5e1', fontFamily: 'JetBrains Mono, monospace' }}>
                <span>Scale / Magnitude:</span>
                <span style={{ color: '#38bdf8', fontWeight: 800 }}>{paramA}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={paramA}
                onChange={(e) => setParamA(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#38bdf8' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#cbd5e1', fontFamily: 'JetBrains Mono, monospace' }}>
                <span>Curvature / Dynamics:</span>
                <span style={{ color: '#f59e0b', fontWeight: 800 }}>{paramB}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={paramB}
                onChange={(e) => setParamB(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f59e0b' }}
              />
            </div>
          </div>

          {/* Archetype Meta Card */}
          <div style={{ background: 'rgba(30,41,59,0.85)', borderRadius: '12px', border: '1.5px solid rgba(148,163,184,0.3)', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{currentMeta.icon}</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#f8fafc', fontWeight: 800 }}>
                    {currentMeta.name} · <span lang="sa" style={{ color: '#fde047' }}>{currentMeta.dev}</span>
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', fontStyle: 'italic' }}>
                    IAST: {currentMeta.iast}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ background: 'rgba(24,34,60,0.85)', padding: '0.6rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                  <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                    SANSKRIT ROOT ACTION (धातुः)
                  </div>
                  <div style={{ fontSize: '0.92rem', color: '#f1f5f9', fontWeight: 700, marginTop: '0.15rem' }}>
                    {currentMeta.root} ➔ <span style={{ color: '#cbd5e1', fontWeight: 500 }}>{currentMeta.rootMeaning}</span>
                  </div>
                </div>

                <div style={{ background: 'rgba(24,34,60,0.85)', padding: '0.6rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                  <div style={{ fontSize: '0.7rem', color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                    PHYSICAL COSMIC EVENT
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#fef3c7', fontWeight: 600, marginTop: '0.15rem' }}>
                    {currentMeta.physicalEvent}
                  </div>
                </div>

                <p style={{ margin: '0.4rem 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                  {currentMeta.blurb}
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(148,163,184,0.2)', fontSize: '0.75rem', color: '#cbd5e1', fontFamily: 'JetBrains Mono, monospace' }}>
              STATUS: Active in Reality Sandbox // Consciousness in Motion
            </div>
          </div>
        </div>
      </div>

      {/* 4. Complete Curated Monograph: "The Living Geometry of the Gurukul" */}
      <div className="vl-panel" style={{ background: 'linear-gradient(135deg, rgba(24,34,60,0.95), rgba(15,23,42,0.95))', border: '1.5px solid rgba(148,163,184,0.3)', borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ borderBottom: '1px solid rgba(148,163,184,0.2)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            CURATED TREATISE // EDNETLEARN.IN &amp; CONSCIOUS COSMOS
          </span>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#f8fafc', margin: '0.35rem 0 0.25rem' }}>
            The Living Geometry of the Gurukul
          </h2>
          <div style={{ fontSize: '1.05rem', color: '#38bdf8', fontWeight: 700 }}>
            Where Language, Science, and Consciousness Converge
          </div>
        </div>

        {/* Section 0: The Educational Paradox & Unified Knowledge */}
        <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1.75rem' }}>
          <p>
            In the modern educational framework, subjects are often taught as isolated silos. A student sits through a mathematics class drawing abstract shapes on a chalkboard, moves to a chemistry lab to observe molecular transitions, and later studies language as a mere tool for social utility. The connection between the three is rarely made.
          </p>
          <p>
            In the ancient Gurukul model, however, knowledge was structured to prevent this fragmentation. By utilizing <strong>Samskritam (Sanskrit)</strong>—a language engineered with mathematical and phonetic precision—the Gurukul system ensured that the name of any entity immediately revealed its inherent physics, geometry, and functional reality. In this system, data was never disconnected; instead, it built a holistic, deeply unified picture of the cosmos.
          </p>
          <p>
            Ultimately, the Gurukul system encourages students to see themselves as part of the natural world, not separate from it. By building vocabulary systematically around root actions (<em>Dhātus</em>), the name of a shape is never just an arbitrary label or a sound attached to a picture. Instead, geometric names directly describe the phenomenon that creates the shape.
          </p>
        </div>

        {/* Section: Language as a Scientific Tool */}
        <div style={{ marginBottom: '2rem', background: 'rgba(30,41,59,0.7)', padding: '1.25rem', borderRadius: '12px', border: '1.5px solid rgba(56,189,248,0.25)' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#38bdf8', fontWeight: 800, margin: '0 0 0.75rem' }}>
            Language as a Scientific Tool
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65, margin: '0 0 1rem' }}>
            In Sanskrit, words are not arbitrary labels assigned by social convention. They are built systematically from root actions (<em>Dhātus</em>). When a student learns the name of a shape, they are simultaneously learning the dynamic physical process that creates it. Consider three foundational geometric concepts:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'rgba(24,34,60,0.85)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(6,182,212,0.3)' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#06b6d4', fontSize: '1rem', fontWeight: 800 }}>
                1. Vṛtta (वृत्त) – The Circle
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                Derived from the verbal root <em>Vṛt</em> (वृत्), meaning to roll, turn, or revolve. With the past participle suffix, <em>Vṛtta</em> literally translates to &quot;that which has been continuously turned or rolled.&quot; The language does not treat a circle as a static form on a page. It defines the circle through its generation—the physics of continuous rotation around a central axis.
              </p>
            </div>

            <div style={{ background: 'rgba(24,34,60,0.85)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.3)' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#f59e0b', fontSize: '1rem', fontWeight: 800 }}>
                2. Trikoṇa (त्रिकोण) – The Triangle
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                Combines the prefix <em>Tri</em> (three) and the base word <em>Koṇa</em> (angle or corner). Rather than just giving the shape an arbitrary title, the word explicitly dictates its structural properties. <em>Koṇa</em> traces back to roots signifying an intermediate point or bend, mapping the exact intersections that give the shape structural strength.
              </p>
            </div>

            <div style={{ background: 'rgba(24,34,60,0.85)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(234,179,8,0.3)' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#fde047', fontSize: '1rem', fontWeight: 800 }}>
                3. Ghana (घन) – The Cube or Solid
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                Masterfully collapses the artificial boundary between mathematics and chemistry. In geometry, <em>Ghana</em> identifies a cube; in physical science, it means solid, dense, or crystal. The word identifies the process of solidification. When liquid freezes, molecules lock into a structured crystalline cube. The Gurukul model taught the chemistry of phase changes alongside the mathematics of volume.
              </p>
            </div>
          </div>

          {/* ASCII / Visual Flow Representation */}
          <div style={{ background: '#090f1d', padding: '0.85rem 1.25rem', borderRadius: '8px', border: '1px solid rgba(148,163,184,0.28)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#fde047', overflowX: 'auto' }}>
            <div style={{ color: '#cbd5e1', marginBottom: '0.35rem' }}>// THE ROOT GENERATION PROCESS:</div>
            <div>[ PHYSICAL ACTION ]                     [ GEOMETRIC FORM ]</div>
            <div style={{ color: '#38bdf8' }}>Vṛt (Continuous Rolling)        ───&gt;   Vṛtta (Circle)</div>
            <div style={{ color: '#f59e0b' }}>Koṇa (Three-Way Bending)         ───&gt;   Trikoṇa (Triangle)</div>
            <div style={{ color: '#4ade80' }}>Ghana (Phase Solidification)    ───&gt;   Ghana (Cube / Solid Crystal)</div>
          </div>
        </div>

        {/* Section: Rekha Ganit: The Ultimate Bridge */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#fde047', fontWeight: 800, borderLeft: '4px solid #f59e0b', paddingLeft: '0.75rem', marginBottom: '0.75rem' }}>
            Rekhā Gaṇita: The Ultimate Bridge
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
            To map these universal movements, the Gurukul utilized <strong>Rekhā Gaṇita (रेखागणित)</strong>—traditionally translated as geometry. But its etymological roots run much deeper. <em>Rekhā</em> comes from the root <em>Rikh</em>, meaning to scratch, scrape, sketch, or trace a path. A <em>Rekhā</em> (line) is the literal physical trajectory left behind by a moving point of energy. Therefore, Rekhā Gaṇita is not just the calculation of static lines, but the mathematics of traced pathways and living functions.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
            Because it focuses on the underlying forces that shape reality, Rekhā Gaṇita serves as the ultimate bridge between three seemingly distinct realms:
          </p>

          <div style={{ marginTop: '1rem', background: 'rgba(15,23,42,0.85)', borderRadius: '10px', border: '1.5px solid rgba(148,163,184,0.28)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(30,41,59,0.95)', borderBottom: '1.5px solid rgba(148,163,184,0.28)' }}>
                  <th style={{ padding: '0.75rem 1rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', width: '30%' }}>DIMENSION</th>
                  <th style={{ padding: '0.75rem 1rem', color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace' }}>REALIZATION OF REKHĀ GAṆITA</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.15)' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#60a5fa', fontWeight: 700 }}>Modern Design Engineering</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#cbd5e1' }}>It provides the predictive mathematics, structural optimization, and dynamic load-bearing calculations required to build stable technology.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.15)' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#34d399', fontWeight: 700 }}>Physical Sciences</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#cbd5e1' }}>It maps the phase changes of matter (Ghana), the trajectories of orbits (Vṛtta), and the vectors of physical forces.</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem 1rem', color: '#c084fc', fontWeight: 700 }}>Spiritual Realization</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#cbd5e1' }}>It offers the profound recognition that geometry is consciousness in motion—the sacred, orderly architecture through which the unmanifested universe prints itself into physical creation.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 1: The Geometry of Root Actions */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#fde047', fontWeight: 800, borderLeft: '4px solid #f59e0b', paddingLeft: '0.75rem', marginBottom: '1rem' }}>
            1. The Geometry of Root Actions
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
            When a child learns shapes in the Gurukul model, they are simultaneously learning physics, geography, and chemistry. The language ensures that the form is never separated from its cosmic function.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {/* Rekha */}
            <div style={{ background: 'rgba(30,41,59,0.85)', borderRadius: '10px', padding: '1rem', border: '1.5px solid rgba(56,189,248,0.28)' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#38bdf8', fontSize: '1.02rem', fontWeight: 800 }}>
                📏 Rekhā Gaṇita (रेखागणित) – The Calculation of Lines
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                Geometry begins with the simplest element: a single line. <em>Rekhā</em> comes from the root <em>Rikh</em>, meaning to scratch, sketch, or trace a path. A line is not static; it is the physical trajectory left behind by a moving point of energy. From that humble beginning, our ancestors built an entire understanding of the cosmos through Rekhā Gaṇita—the mathematics of traced pathways.
              </p>
            </div>

            {/* Trikona */}
            <div style={{ background: 'rgba(30,41,59,0.85)', borderRadius: '10px', padding: '1rem', border: '1.5px solid rgba(245,158,11,0.28)' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#f59e0b', fontSize: '1.02rem', fontWeight: 800 }}>
                📐 Trikoṇa &amp; Trikoṇamiti – The Angle &amp; Measure
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                In most languages, names are disconnected, but Sanskrit tracks linguistic evolution alongside structural geometry:
                <strong> Trikoṇa</strong> combines <em>Tri</em> (three) and <em>Koṇa</em> (angle/corner). Through Indo-European linguistic pathways, <em>Tri</em> became three and <em>Koṇa</em> became corner.
                <strong> Catuṣkoṇa</strong> (चतुष्कोण) naturally follows as a four-angled quadrilateral.
                By adding the Sanskrit word for measurement, <em>Miti</em> (मिति), to the root, a student derives <strong>Trikoṇamiti</strong>—the direct etymological and conceptual ancestor of modern Trigonometry.
              </p>
            </div>

            {/* Vritta */}
            <div style={{ background: 'rgba(30,41,59,0.85)', borderRadius: '10px', padding: '1rem', border: '1.5px solid rgba(6,182,212,0.28)' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#06b6d4', fontSize: '1.02rem', fontWeight: 800 }}>
                ⭕ Vṛtta (वृत्त) &amp; Vartula (वर्तुल) – The Circle
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                The word for a circle, <em>Vṛtta</em>, stems from the root <em>Vṛt</em> (वृत्), meaning to roll, turn, or revolve. Its derivative, <em>Vartula</em>, literally describes the rolling, turning motion that forms the circle itself. A child isn&apos;t just told a circle is round; they are taught that a circle is the structural outcome of rotation.
              </p>
            </div>

            {/* Gola */}
            <div style={{ background: 'rgba(30,41,59,0.85)', borderRadius: '10px', padding: '1rem', border: '1.5px solid rgba(59,130,246,0.28)' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#60a5fa', fontSize: '1.02rem', fontWeight: 800 }}>
                🌐 Gola (गोल) &amp; Bhūgola (भूगोल) – The Sphere &amp; Planet
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                The word <em>Gola</em> denotes a sphere, capturing the dual physical properties of roundness and hollowness. Because of this definition, a child learning the word for a sphere is learning the shape of our planet at the exact same time. The Sanskrit word for geography and the Earth is <strong>Bhūgola</strong> (भू-गोल)—a direct, ancient reference to the Earth&apos;s round, spherical form.
              </p>
            </div>

            {/* Brahmanda */}
            <div style={{ background: 'rgba(30,41,59,0.85)', borderRadius: '10px', padding: '1rem', border: '1.5px solid rgba(168,85,247,0.28)' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#c084fc', fontSize: '1.02rem', fontWeight: 800 }}>
                🥚 Brahmāṇḍa (ब्रह्माण्ड) – The Cosmic Oval
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                While we often picture orbits as perfect circles, modern science proves the universe is full of ovals. The Vedas call an oval <em>Aṇḍa-ākāra</em> (Egg-shape). Crucially, the ancient Vedic name for the universe itself is <strong>Brahmāṇḍa</strong> (ब्रह्म-अण्ड)—the Cosmic Egg. The modern astronomical discovery of an imperfect, oval-shaped universe was hidden in the roots of the language all along.
              </p>
            </div>

            {/* Shanku */}
            <div style={{ background: 'rgba(30,41,59,0.85)', borderRadius: '10px', padding: '1rem', border: '1.5px solid rgba(20,184,166,0.28)' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#2dd4bf', fontSize: '1.02rem', fontWeight: 800 }}>
                🐚 Śaṅku (शङ्कु) – The Cone Borrowed from Nature
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                A cone is named <em>Śaṅku</em>, which comes directly from <em>Śaṅkha</em> (शङ्ख), the natural sea shell revered for its sacred sound. The geometric shape is not invented as an abstract, isolated category; it is drawn directly from an object found in the natural world.
              </p>
            </div>

            {/* Ghana */}
            <div style={{ background: 'rgba(30,41,59,0.85)', borderRadius: '10px', padding: '1rem', border: '1.5px solid rgba(234,179,8,0.28)' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#fde047', fontSize: '1.02rem', fontWeight: 800 }}>
                🧊 Ghana (घन) – The Cube of Solidification
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                The term <em>Ghana</em> masterfully collapses the boundary between geometry and physics. Meaning both a geometric cube and a solid crystal, Ghana identifies the exact physical process of solidification. When water freezes, it locks into the crystalline structure of ice cubes. By simply learning the word Ghana, a child understands the chemistry of phase changes alongside the mathematics of volume.
              </p>
            </div>
          </div>

          {/* Root Action Matrix Table */}
          <div style={{ marginTop: '1.5rem', background: 'rgba(15,23,42,0.85)', borderRadius: '10px', border: '1.5px solid rgba(148,163,184,0.28)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(30,41,59,0.95)', borderBottom: '1.5px solid rgba(148,163,184,0.28)' }}>
                  <th style={{ padding: '0.75rem 1rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace' }}>VERBAL ROOT / NATURAL FORM</th>
                  <th style={{ padding: '0.75rem 1rem', color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace' }}>GEOMETRIC &amp; SCIENTIFIC REALITY</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
                  <td style={{ padding: '0.65rem 1rem', color: '#f1f5f9', fontWeight: 700 }}>Vṛt (To roll / revolve)</td>
                  <td style={{ padding: '0.65rem 1rem', color: '#cbd5e1' }}>Vṛtta (Circle / Rotational Event)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
                  <td style={{ padding: '0.65rem 1rem', color: '#f1f5f9', fontWeight: 700 }}>Bhūgola (Earth-Sphere)</td>
                  <td style={{ padding: '0.65rem 1rem', color: '#cbd5e1' }}>Geography (The planet is round &amp; hollow)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
                  <td style={{ padding: '0.65rem 1rem', color: '#f1f5f9', fontWeight: 700 }}>Brahmāṇḍa (Cosmic Egg)</td>
                  <td style={{ padding: '0.65rem 1rem', color: '#cbd5e1' }}>Astronomy (The universe is an oval / ellipsoid)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
                  <td style={{ padding: '0.65rem 1rem', color: '#f1f5f9', fontWeight: 700 }}>Śaṅkha (Sea Shell)</td>
                  <td style={{ padding: '0.65rem 1rem', color: '#cbd5e1' }}>Śaṅku (Cone drawn from nature)</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.65rem 1rem', color: '#f1f5f9', fontWeight: 700 }}>Ghana (Solidification)</td>
                  <td style={{ padding: '0.65rem 1rem', color: '#cbd5e1' }}>Cube (Crystalline solid phase of matter)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Shapes as Universal Events */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#fde047', fontWeight: 800, borderLeft: '4px solid #f59e0b', paddingLeft: '0.75rem', marginBottom: '1rem' }}>
            2. Shapes as Universal Events
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
            True knowledge in the Vedic paradigm isn&apos;t just about knowing facts; it is about realizing your fundamental relationship with everything. Form is what separates one object from another, but the principle behind each form is what connects them to each other and to a single universal manifestation.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
            When a modern child learns shapes through plastic blocks, the focus lands entirely on the static form. Gurukul teaching ensures the child understands that form has a deeper foundation: shapes are the living events driving cosmic existence. All around us, creation appears as a chaotic mix of different activities, but in reality, it is highly unified into two primary actions:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: 'rgba(30,41,59,0.88)', borderRadius: '10px', padding: '1rem', border: '1.5px solid rgba(56,189,248,0.32)' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.35rem' }}>
                🔄 1. The Activity of Rotation
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                The force moving planets in their orbits, subatomic particles within atoms, and star systems across galaxies. These are all a single class of circular events governed by <strong>Vṛt</strong>.
              </p>
            </div>

            <div style={{ background: 'rgba(30,41,59,0.88)', borderRadius: '10px', padding: '1rem', border: '1.5px solid rgba(249,115,22,0.35)' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fb923c', marginBottom: '0.35rem' }}>
                ↔️ 2. The Activity of Extension
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                The force shaping the formation of ocean waves, the lattice growth of crystals, and the sprouting of roots from a seed. These all belong to a singular action of expansion.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The Secondary Step: Art, Engineering, and Spirituality */}
        <div>
          <h3 style={{ fontSize: '1.25rem', color: '#fde047', fontWeight: 800, borderLeft: '4px solid #f59e0b', paddingLeft: '0.75rem', marginBottom: '1rem' }}>
            3. The Secondary Step: Art, Engineering, and Spirituality
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
            In the Gurukul model, the ultimate goal is to understand the universal principle first, leaving the practical application of that knowledge as a secondary step. Once the universal geometry is understood, it is allowed to breathe through everyday life, science, and culture.
          </p>

          <div style={{ background: 'rgba(30,41,59,0.88)', borderRadius: '10px', padding: '1.25rem', border: '1.5px solid rgba(168,85,247,0.35)', margin: '1rem 0' }}>
            <h4 style={{ margin: '0 0 0.4rem', color: '#c084fc', fontSize: '1.05rem', fontWeight: 800 }}>
              Geometry in Sacred Art and Performance
            </h4>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              Form doesn&apos;t just govern macro-cosmic planets and micro-cosmic atoms; it translates directly into sacred art. In traditional Indian culture, dance and music are not mere entertainment—they are spiritual performances of creation itself. Every precise mudrā (hand gesture), every calculated step, and every musical note is localized vibration. When a dancer moves, their body becomes a visual spectacle of geometry, dynamically reflecting the universe&apos;s cosmic activity.
            </p>
          </div>

          <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(56,189,248,0.15))', borderRadius: '10px', padding: '1.25rem', border: '1.5px solid rgba(245,158,11,0.35)' }}>
            <h4 style={{ margin: '0 0 0.4rem', color: '#fde047', fontSize: '1.05rem', fontWeight: 800 }}>
              The Ultimate Synthesis
            </h4>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              By defining <strong>Rekhā Gaṇita</strong> as an integrated study of form and its living function, the ancient model creates a seamless continuum. It flawlessly unites the predictive mathematics of modern design engineering with the profound spiritual recognition that geometry is consciousness in motion. The dynamic equations used by an engineer to stabilize a structure today are the very same geometric laws that the ancient seers recognized as the divine, orderly architecture of the cosmos.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Sanskrit Geometry Terms Panel */}
      <TermPanel terms={GEOMETRY_TERMS} title="Vedic Geometry & Etymological Vocabulary" />

      {/* 6. Challenge Questions */}
      <ChallengeList items={GEOMETRY_CHALLENGES} title="Vedic Geometry Knowledge Challenges" />

      {/* 7. Next Lab Navigation Action */}
      {onNextLab && (
        <div style={{
          marginTop: '2rem',
          padding: '1.25rem',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))',
          border: '1.5px solid rgba(168,85,247,0.35)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', color: '#c084fc', fontWeight: 800 }}>
              <span className="vl-hud-blink">●</span> SECTOR 11 COMPLETE // ADVANCE TO SECTOR 12
            </div>
            <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 800 }}>
              Proceed to Sector 12: Mantra Acoustics &amp; The Language of Matter
            </h4>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#cbd5e1' }}>
              Explore how sound was discovered as an immutable law of physics: Saptak harmonics, Chandas 1:2 quantisation, and the Chamakam code!
            </p>
          </div>

          <button
            type="button"
            className="vl-btn vl-btn--cyber"
            onClick={onNextLab}
            style={{
              padding: '0.7rem 1.3rem',
              fontSize: '0.9rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #c084fc, #38bdf8)',
              color: '#090e17',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <span>ENTER MANTRA ACOUSTICS LAB ➔</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default VedicGeometryLab;
