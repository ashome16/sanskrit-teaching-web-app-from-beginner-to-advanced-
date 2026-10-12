import React, { useEffect, useRef, useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';

export interface AtomismHistoryVisualizerProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onPronounce?: (word: string) => void;
}

interface MilestoneVisualMeta {
  title: string;
  sanskrit: string;
  era: string;
  thinker: string;
  visualBadge: string;
  conceptSummary: string;
  epistemicFocus: string;
  physicsAccent: string;
  physicsGlow: string;
}

const MILESTONE_METAS: MilestoneVisualMeta[] = [
  {
    title: 'The Trasareṇu & Pīlupāka Oven (Light Scattering & Thermal Chemistry)',
    sanskrit: 'त्रसरेणुः तथा पीलुपाक-भ्राष्ट्रम्',
    era: '~6th c. BCE',
    thinker: 'Sage Kaṇāda (महर्षि-कणादः)',
    visualBadge: '✨ LIGHT-SCATTERING MOTE & PĪLUPĀKA THERMAL KILN',
    conceptSummary:
      '0D Paramāṇu seeds combine into 2D Dvyaṇuka dyads, which cluster into 3D Tryaṇukas (Trasareṇu)—the first unit scattering sunbeams. In the Pīlupāka Kiln, Tejas heat dissociates dyad bonds (vibhāga) down to individual atoms before recombining (saṁyoga) into baked terracotta red.',
    epistemicFocus:
      'The structural emergence of magnitude (Mahatva), Rayleigh-Mie scattering threshold, and atomic chemical bond dissociation via Pīlupāka thermal kinetics.',
    physicsAccent: '#f59e0b',
    physicsGlow: 'rgba(245, 158, 11, 0.4)',
  },
  {
    title: 'Geometrical Hooked Polyhedra',
    sanskrit: 'ज्यामितीय-परमाणवः (ग्रीस-दर्शनम्)',
    era: '~400 BCE',
    thinker: 'Democritus & Leucippus',
    visualBadge: '📐 INTERLOCKING HOOKS IN THE VOID',
    conceptSummary:
      'Indivisible atoms moving through infinite void (kenon). Solids possess interlocking hooks; liquids are smooth spheres; fire consists of sharp tetrahedra.',
    epistemicFocus: 'Purely mechanical shape-interlocking without qualitative inherent guṇas.',
    physicsAccent: '#06b6d4',
    physicsGlow: 'rgba(6, 182, 212, 0.4)',
  },
  {
    title: 'The Atomic Swerve (Clinamen)',
    sanskrit: 'आकस्मिक-विक्षेपः (क्लिनमेन-सिद्धान्तः)',
    era: '~300 BCE',
    thinker: 'Epicurus & Lucretius',
    visualBadge: '🌪️ SPONTANEOUS ANGULAR DEVIATION',
    conceptSummary:
      'Atoms fall straight through infinite void under gravity. A microscopic random swerve (Clinamen) breaks parallel laminar rain, triggering collision cascades and worlds.',
    epistemicFocus: 'Indeterminism and symmetry breaking as the foundation of creative manifestation.',
    physicsAccent: '#a855f7',
    physicsGlow: 'rgba(168, 85, 247, 0.4)',
  },
  {
    title: 'Chemical Stoichiometry & Mass Law',
    sanskrit: 'निश्चित-भारानुपाती गोलकाः (डाल्टनः)',
    era: '1803 CE',
    thinker: 'John Dalton',
    visualBadge: '⚖️ DEFINITE PROPORTIONS & MASS RATIOS',
    conceptSummary:
      'Atoms are impenetrable solid mass spheres of fixed relative weights. Compounds combine in whole-number stoichiometric ratios (2:1 in H₂O, 1:2 in CO₂).',
    epistemicFocus: 'Quantitative gravimetric stoichiometry verifying ancient whole-number combination arithmetic.',
    physicsAccent: '#10b981',
    physicsGlow: 'rgba(16, 185, 129, 0.4)',
  },
  {
    title: 'Plum Pudding & Cathode Rays',
    sanskrit: 'ऋणविद्युद्-अणुः (थॉमसन-प्ररूपः)',
    era: '1897 CE',
    thinker: 'J.J. Thomson',
    visualBadge: '⚡ SUBATOMIC ELECTRONS & CHARGE MATRIX',
    conceptSummary:
      'Discovery of the electron proved the physical atom is divisible. A diffuse sphere of positive electric fluid contains orbiting corpuscles of negative charge.',
    epistemicFocus: 'The breakdown of physical indivisibility into charged subatomic constituents.',
    physicsAccent: '#ec4899',
    physicsGlow: 'rgba(236, 72, 153, 0.4)',
  },
  {
    title: 'Planetary Nucleus & Quantized Orbits',
    sanskrit: 'केन्द्रकम् तथा क्वाण्टम-कक्षाः',
    era: '1911–1913 CE',
    thinker: 'Rutherford & Niels Bohr',
    visualBadge: '🪐 99.999% VACUOUS SPACE & QUANTUM LEAPS',
    conceptSummary:
      '99.999% of the atom is empty space (Ākāśa). An ultradense nucleus holds nearly all mass; electrons occupy quantized orbital energy tiers (n=1, 2, 3).',
    epistemicFocus: 'Quantized angular momentum and discrete photon emission (ΔE = hν) during quantum jumps.',
    physicsAccent: '#38bdf8',
    physicsGlow: 'rgba(56, 189, 248, 0.4)',
  },
  {
    title: 'Quantum Field Foam & Bose Condensates',
    sanskrit: 'शून्य-क्षेत्रम् तथा बसु-सांख्यिकी',
    era: '20th c.–Present',
    thinker: 'S.N. Bose & Quantum Field Theory',
    visualBadge: '🌊 DYNAMIC VACUUM & WAVE CONDENSATION',
    conceptSummary:
      'The vacuum is not passive void but dynamic ground-state Ākāśa. Bose-Einstein statistics govern integer-spin bosons, allowing atoms to coalesce into one coherent wave.',
    epistemicFocus: 'Zero-point energy vacuum fluctuations and macroscopic quantum phase coherence.',
    physicsAccent: '#eab308',
    physicsGlow: 'rgba(234, 179, 8, 0.4)',
  },
];

// Scale Ladder Tiers
interface ScaleTier {
  exponent: string;
  label: string;
  sanskrit: string;
  sizeMeters: string;
  eraMarker: string;
  description: string;
  color: string;
}

const SCALE_TIERS: ScaleTier[] = [
  {
    exponent: '10⁻³ m',
    label: 'Macroscopic Grain',
    sanskrit: 'बालवाल-कणिका',
    sizeMeters: '1 mm – 100 μm',
    eraMarker: 'Sensory Realm (प्रत्यक्षम्)',
    description: 'Fine beach sand or sesame seed; directly visible to unassisted human vision.',
    color: '#94a3b8',
  },
  {
    exponent: '10⁻⁶ m',
    label: 'Kaṇāda’s Trasareṇu (Sunbeam Mote)',
    sanskrit: 'जालसूर्यमरीचिस्थं त्रसरेणुः',
    sizeMeters: '1 μm – 500 nm',
    eraMarker: 'Sage Kaṇāda (~600 BCE)',
    description: 'Smallest visible particulate in sunbeams. Exact threshold of optical Mie & Rayleigh scattering.',
    color: '#f59e0b',
  },
  {
    exponent: '10⁻⁸ m',
    label: 'Dvyaṇuka (Binary Dyad)',
    sanskrit: 'द्व्यणुक-संयोगः',
    sizeMeters: '10 nm – 1 nm',
    eraMarker: 'Kaṇāda & Macromolecules',
    description: 'Sub-optical binary molecular cluster; invisible to photons, possessing length without volume.',
    color: '#a855f7',
  },
  {
    exponent: '10⁻¹⁰ m',
    label: 'Bohr Atomic Radius (a₀)',
    sanskrit: 'बोर-परमाणु-व्यासः',
    sizeMeters: '0.1 nm (1 Å)',
    eraMarker: 'Dalton (1803) & Bohr (1913)',
    description: 'Electron orbital cloud extent; matter is 99.999% empty space (Ākāśa).',
    color: '#38bdf8',
  },
  {
    exponent: '10⁻¹⁵ m',
    label: 'Rutherford Atomic Nucleus',
    sanskrit: 'अणुकरा-केन्द्रकम्',
    sizeMeters: '1 Femtometer (1 fm)',
    eraMarker: 'Rutherford (1911)',
    description: 'Ultradense nucleus of protons and neutrons held by the strong nuclear force.',
    color: '#ec4899',
  },
  {
    exponent: '10⁻¹⁸ m',
    label: 'Paramāṇu / Point-like Quark',
    sanskrit: 'परम-अणुः (अविभाज्यम्)',
    sizeMeters: '< 10⁻¹⁸ m (Point-like)',
    eraMarker: 'Kaṇāda (0D Point) & Modern QFT',
    description: 'Zero-dimensional point particles with no internal sub-structure; fundamental quantum limits.',
    color: '#eab308',
  },
];

export const AtomismHistoryVisualizer: React.FC<AtomismHistoryVisualizerProps> = ({
  activeIndex,
  onSelectIndex,
  onPronounce,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  // Interactive Model Simulation States
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [actionPulse, setActionPulse] = useState<number>(0);
  const [selectedScaleIndex, setSelectedScaleIndex] = useState<number>(1); // Default to Trasareṇu
  const [showMatrixComparison, setShowMatrixComparison] = useState<boolean>(false);

  // Model-specific interactive states
  const [quantumJumpActive, setQuantumJumpActive] = useState<boolean>(false);
  const [clinamenTriggered, setClinamenTriggered] = useState<boolean>(false);
  const [condensateActive, setCondensateActive] = useState<boolean>(false);
  const [sunbeamFilterBoost, setSunbeamFilterBoost] = useState<boolean>(true);
  const [pilupakaBakeActive, setPilupakaBakeActive] = useState<boolean>(false);

  const meta = MILESTONE_METAS[activeIndex] || MILESTONE_METAS[0];

  // =========================================================================
  // INTERACTIVE ACTION TRIGGERS
  // =========================================================================
  const handleSunbeamFilter = () => {
    setActionPulse((prev) => prev + 1);
    setPilupakaBakeActive(false);
    setSunbeamFilterBoost((prev) => !prev);
    soundEffects.playTrasarenuChime();
  };

  const handleTriggerAction = () => {
    setActionPulse((prev) => prev + 1);

    if (activeIndex === 0) {
      // Kaṇāda: toggle Pīlupāka kiln bake vs sunbeam
      const next = !pilupakaBakeActive;
      setPilupakaBakeActive(next);
      if (next) {
        soundEffects.playElementSummon('tejas');
      } else {
        soundEffects.playTrasarenuChime();
      }
    } else if (activeIndex === 1) {
      // Democritus: agitate void
      soundEffects.playPuzzleSnap();
    } else if (activeIndex === 2) {
      // Epicurus: trigger Clinamen swerve
      setClinamenTriggered(true);
      soundEffects.playStrokeChime();
      setTimeout(() => setClinamenTriggered(false), 2400);
    } else if (activeIndex === 3) {
      // Dalton: chemical synthesis chime
      soundEffects.playCelebrationChime();
    } else if (activeIndex === 4) {
      // Thomson: cathode ray electric zap
      soundEffects.playElectricZap();
    } else if (activeIndex === 5) {
      // Bohr: quantum leap jump
      setQuantumJumpActive(true);
      soundEffects.playSwara(587.33, 0.4); // D5 chime
      setTimeout(() => setQuantumJumpActive(false), 1800);
    } else if (activeIndex === 6) {
      // Bose: condensate phase lock
      setCondensateActive((prev) => !prev);
      soundEffects.playCelebrationChime();
    }
  };

  // =========================================================================
  // MAIN HIGH-RESOLUTION CANVAS RENDER LOOP
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;
    let t = 0;

    // Pre-generate static particles for simulations
    const dustMotes = Array.from({ length: 48 }, () => ({
      x: 100 + Math.random() * 450,
      y: 50 + Math.random() * 260,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 1.2 + Math.random() * 2.5,
      phase: Math.random() * Math.PI * 2,
    }));

    const democritusParticles = Array.from({ length: 24 }, (_, i) => ({
      x: 120 + Math.random() * 440,
      y: 70 + Math.random() * 230,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      type: i % 3, // 0: hooked, 1: smooth sphere, 2: sharp fire pyramid
      angle: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.05,
    }));

    const rainParticles = Array.from({ length: 52 }, () => ({
      x: 60 + Math.random() * 560,
      y: Math.random() * 350,
      vy: 1.8 + Math.random() * 1.4,
      swerved: false,
      color: Math.random() > 0.4 ? '#a855f7' : '#38bdf8',
    }));

    const render = () => {
      if (!running) return;
      if (isPlaying) {
        t += 0.02 * simSpeed;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Subtle background grid
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 35) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // =====================================================================
      // 1. SAGE KAṆĀDA: SUNBEAM MOTE & TRASAREṆU SCATTERING (INDEX 0)
      // =====================================================================
      if (activeIndex === 0) {
        if (pilupakaBakeActive) {
          // Blazing Vedic Agni Kiln (Tejas flames)
          const fireGrad = ctx.createLinearGradient(120, h - 30, 120, h - 160);
          fireGrad.addColorStop(0, 'rgba(239, 68, 68, 0.85)');
          fireGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.6)');
          fireGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
          ctx.fillStyle = fireGrad;
          for (let fx = 80; fx < 380; fx += 22) {
            const fH = 55 + Math.sin(t * 8 + fx) * 26;
            ctx.beginPath();
            ctx.moveTo(fx, h - 25);
            ctx.quadraticCurveTo(fx + 11, h - 25 - fH, fx + 22, h - 25);
            ctx.fill();
          }

          // Terracotta clay jar inside crucible
          ctx.fillStyle = '#b45309';
          ctx.beginPath();
          ctx.ellipse(220, h - 110, 52, 42, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#f97316';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.fillStyle = '#fef08a';
          ctx.font = 'bold 10px JetBrains Mono, monospace';
          ctx.fillText('🔥 पीलुपाक-भ्राष्ट्रम् (Pīlupāka Kiln)', 150, h - 170);
          ctx.fillStyle = '#fed7aa';
          ctx.font = '8.5px JetBrains Mono, monospace';
          ctx.fillText('Tejas heat dissociates dyad bonds (Vibhāga)', 150, h - 154);
        } else {
          // Lattice window top-left
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(20, 20, 90, 110);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(20, 20, 90, 110);

          // Lattice wooden bars (Jālamārga)
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
          ctx.lineWidth = 1.5;
          for (let lx = 35; lx < 110; lx += 15) {
            ctx.beginPath();
            ctx.moveTo(lx, 20);
            ctx.lineTo(lx, 130);
            ctx.stroke();
          }
          for (let ly = 35; ly < 130; ly += 18) {
            ctx.beginPath();
            ctx.moveTo(20, ly);
            ctx.lineTo(110, ly);
            ctx.stroke();
          }

          ctx.fillStyle = '#fbbf24';
          ctx.font = 'bold 8.5px JetBrains Mono, monospace';
          ctx.fillText('जालमार्गः (Lattice Window)', 22, 145);

          // Radiant golden diagonal sunlight beam
          const beamGrad = ctx.createLinearGradient(65, 75, 580, 360);
          const opacity = sunbeamFilterBoost ? 0.35 : 0.18;
          beamGrad.addColorStop(0, `rgba(254, 240, 138, ${opacity * 1.5})`);
          beamGrad.addColorStop(0.5, `rgba(245, 158, 11, ${opacity})`);
          beamGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

          ctx.beginPath();
          ctx.moveTo(40, 50);
          ctx.lineTo(110, 130);
          ctx.lineTo(620, 370);
          ctx.lineTo(440, 370);
          ctx.closePath();
          ctx.fillStyle = beamGrad;
          ctx.fill();

          // Dancing golden motes (Trasareṇu)
          dustMotes.forEach((m) => {
            m.x += m.vx + Math.sin(t + m.phase) * 0.3;
            m.y += m.vy + Math.cos(t + m.phase) * 0.3;
            if (m.x < 120) m.x = 480;
            if (m.x > 500) m.x = 130;
            if (m.y < 70) m.y = 320;
            if (m.y > 330) m.y = 80;

            ctx.beginPath();
            ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
            ctx.fillStyle = '#fef08a';
            ctx.shadowColor = '#facc15';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          });
        }

        // Magnified Triadic Unit Callout Lens (Tryaṇuka / Trasareṇu or Pīlupāka Dissociation)
        const cx = 520;
        const cy = 160;
        const cr = 85;

        // Magnifier rim
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.fill();
        ctx.strokeStyle = pilupakaBakeActive ? '#f97316' : '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = pilupakaBakeActive ? '#fb923c' : '#fde047';
        ctx.font = 'bold 9px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pilupakaBakeActive ? '🔥 पीलुपाकः (Bond Dissociation)' : 'त्रसरेणु-आकृतिः (Tryaṇuka Core)', cx, cy - 65);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '8px JetBrains Mono, monospace';
        ctx.fillText(pilupakaBakeActive ? 'Vibhāga (Separation) ➔ Saṁyoga (Re-bond)' : '3 Dvyaṇuka Dyads = 6 Atoms', cx, cy - 52);

        // 3D Triad Pyramid Geometry / Thermal Dissociation
        const triadR = 32 + (pilupakaBakeActive ? Math.sin(t * 8) * 12 : Math.sin(t * 2) * 3);
        const nodes = [
          { x: cx, y: cy - triadR * 0.8 },
          { x: cx - triadR * 0.86, y: cy + triadR * 0.5 },
          { x: cx + triadR * 0.86, y: cy + triadR * 0.5 },
        ];

        // Light wave scattering rings or Thermal heat waves
        const waveProgress = (t * 2.5) % 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 20 + waveProgress * 65, 0, Math.PI * 2);
        ctx.strokeStyle = pilupakaBakeActive
          ? `rgba(249, 115, 22, ${1 - waveProgress})`
          : `rgba(254, 240, 138, ${1 - waveProgress})`;
        ctx.lineWidth = 1.8;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Triad Dyad link bars (Flickering / breaking if Pīlupāka is active!)
        ctx.strokeStyle = pilupakaBakeActive ? 'rgba(239, 68, 68, 0.5)' : '#38bdf8';
        ctx.lineWidth = pilupakaBakeActive ? 1.5 : 2.2;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[1].x, nodes[1].y);
        ctx.lineTo(nodes[2].x, nodes[2].y);
        ctx.closePath();
        ctx.stroke();

        // 6 Atoms (2 on each dyad edge) - turn glowing terracotta red if baking!
        nodes.forEach((n, idx) => {
          const next = nodes[(idx + 1) % 3];
          const midX = (n.x + next.x) / 2;
          const midY = (n.y + next.y) / 2;

          [n, { x: midX, y: midY }].forEach((atom, aIdx) => {
            ctx.beginPath();
            ctx.arc(atom.x, atom.y, 6.5, 0, Math.PI * 2);
            ctx.fillStyle = pilupakaBakeActive
              ? (aIdx === 0 ? '#ea580c' : '#f97316')
              : (aIdx === 0 ? '#facc15' : '#38bdf8');
            ctx.shadowColor = pilupakaBakeActive ? '#ef4444' : '#fef08a';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          });
        });

        ctx.fillStyle = pilupakaBakeActive ? '#fdba74' : '#86efac';
        ctx.font = 'bold 8.5px JetBrains Mono, monospace';
        ctx.fillText(pilupakaBakeActive ? 'Baking into Terracotta Red Ceramic' : 'Photons Scatter (λ ≈ 500nm)', cx, cy + 62);
        ctx.textAlign = 'start';
      }

      // =====================================================================
      // 2. DEMOCRITUS & LEUCIPPUS: HOOKED & SHARP POLYHEDRA (INDEX 1)
      // =====================================================================
      else if (activeIndex === 1) {
        ctx.fillStyle = '#06b6d4';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('ΤΟ ΚΕΝΟΝ (The Infinite Void) · Mechanistic Polyhedral Atoms', 30, 32);

        democritusParticles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.vRot;

          // Boundary bounce
          if (p.x < 35 || p.x > w - 35) p.vx *= -1;
          if (p.y < 50 || p.y > h - 35) p.vy *= -1;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);

          if (p.type === 0) {
            // Hooked Solid Atom (Earth / Iron) - square with protruding hooks
            ctx.fillStyle = '#eab308';
            ctx.fillRect(-10, -10, 20, 20);
            ctx.strokeStyle = '#fef08a';
            ctx.lineWidth = 2;
            ctx.strokeRect(-10, -10, 20, 20);

            // Hooks
            ctx.beginPath();
            ctx.moveTo(10, 0);
            ctx.lineTo(18, 0);
            ctx.lineTo(18, -6);
            ctx.moveTo(-10, 0);
            ctx.lineTo(-18, 0);
            ctx.lineTo(-18, 6);
            ctx.stroke();
          } else if (p.type === 1) {
            // Smooth Fluid Atom (Water) - slippery spheres
            ctx.beginPath();
            ctx.arc(0, 0, 11, 0, Math.PI * 2);
            ctx.fillStyle = '#06b6d4';
            ctx.fill();
            ctx.strokeStyle = '#a5f3fc';
            ctx.lineWidth = 1.8;
            ctx.stroke();
          } else {
            // Sharp Fiery Atom (Fire) - sharp triangle with spikes
            ctx.beginPath();
            ctx.moveTo(0, -13);
            ctx.lineTo(11, 10);
            ctx.lineTo(-11, 10);
            ctx.closePath();
            ctx.fillStyle = '#f97316';
            ctx.fill();
            ctx.strokeStyle = '#fdba74';
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }
          ctx.restore();
        });

        // Explanatory legend in corner
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 1;
        ctx.fillRect(w - 230, 20, 210, 75);
        ctx.strokeRect(w - 230, 20, 210, 75);

        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 8.5px JetBrains Mono, monospace';
        ctx.fillText('■ Hooked Atoms (Solid Rigid Matter)', w - 220, 38);
        ctx.fillStyle = '#67e8f9';
        ctx.fillText('● Smooth Spheres (Fluids & Glide)', w - 220, 56);
        ctx.fillStyle = '#fb923c';
        ctx.fillText('▲ Sharp Spikes (Kinetic Heat & Fire)', w - 220, 74);
      }

      // =====================================================================
      // 3. EPICURUS & LUCRETIUS: THE ATOMIC SWERVE / CLINAMEN (INDEX 2)
      // =====================================================================
      else if (activeIndex === 2) {
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('CLINAMEN (The Microscopic Swerve) · Gravitational Downward Flow', 30, 32);

        rainParticles.forEach((p, idx) => {
          p.y += p.vy;

          if (clinamenTriggered && idx === 12) {
            p.swerved = true;
            p.x += Math.sin(t * 5) * 4.5;
          }

          if (p.swerved) {
            // Collides with nearby particles causing vortex swirl
            p.x += Math.cos(t * 3) * 1.5;
          }

          if (p.y > h - 20) {
            p.y = 40;
            p.x = 60 + Math.random() * 560;
            if (!clinamenTriggered) p.swerved = false;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.swerved ? 5.5 : 3.5, 0, Math.PI * 2);
          ctx.fillStyle = p.swerved ? '#facc15' : p.color;
          ctx.shadowColor = p.swerved ? '#facc15' : 'transparent';
          ctx.shadowBlur = p.swerved ? 12 : 0;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Trail
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - 8);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = p.swerved ? 'rgba(250, 204, 21, 0.6)' : 'rgba(168, 85, 247, 0.25)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });

        if (clinamenTriggered) {
          ctx.fillStyle = '#fde047';
          ctx.font = 'bold 11px JetBrains Mono, monospace';
          ctx.fillText('⚡ CLINAMEN ACTIVE: Spontaneous deviation broke linear determinism!', 60, h - 35);
        } else {
          ctx.fillStyle = '#94a3b8';
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.fillText('Click "Trigger Clinamen Swerve" to induce quantum microscopic collision!', 60, h - 35);
        }
      }

      // =====================================================================
      // 4. JOHN DALTON: CHEMICAL STOICHIOMETRY & HARD SPHERES (INDEX 3)
      // =====================================================================
      else if (activeIndex === 3) {
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('DALTONIAN STOICHIOMETRY (1803) · Law of Multiple Proportions', 30, 32);

        // Water Molecule (H2O) Assembly Center Left
        const h2oX = 220;
        const h2oY = 180;
        const oRad = 26;
        const hRad = 15;
        const bondLen = 48 + Math.sin(t * 3) * 2;

        // Oxygen (Red mass sphere, M=16)
        ctx.beginPath();
        ctx.arc(h2oX, h2oY, oRad, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('O (16u)', h2oX, h2oY + 4);

        // Two Hydrogen Atoms (White mass spheres, M=1)
        const angles = [-0.6, 0.6];
        angles.forEach((ang) => {
          const hx = h2oX + Math.cos(ang) * bondLen;
          const hy = h2oY + Math.sin(ang) * bondLen;

          // Valency bond stick
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(h2oX, h2oY);
          ctx.lineTo(hx, hy);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(hx, hy, hRad, 0, Math.PI * 2);
          ctx.fillStyle = '#f8fafc';
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 9px JetBrains Mono, monospace';
          ctx.fillText('H (1u)', hx, hy + 3);
        });

        ctx.fillStyle = '#86efac';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('H₂O (Water: 2 : 1 Ratio)', h2oX, h2oY + 68);

        // Carbon Dioxide Molecule (CO2) Center Right
        const co2X = 480;
        const co2Y = 180;
        const cRad = 22;

        // Carbon Center (Dark Grey, M=12)
        ctx.beginPath();
        ctx.arc(co2X, co2Y, cRad, 0, Math.PI * 2);
        ctx.fillStyle = '#334155';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('C (12u)', co2X, co2Y + 4);

        // Linear Oxygen Double Bonds
        [-bondLen, bondLen].forEach((offset) => {
          const ox = co2X + offset;
          const oy = co2Y;

          // Double bond
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(co2X, co2Y - 3);
          ctx.lineTo(ox, oy - 3);
          ctx.moveTo(co2X, co2Y + 3);
          ctx.lineTo(ox, oy + 3);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(ox, oy, 22, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px JetBrains Mono, monospace';
          ctx.fillText('O (16u)', ox, oy + 4);
        });

        ctx.fillStyle = '#86efac';
        ctx.fillText('CO₂ (Carbon Dioxide: 1 : 2 Ratio)', co2X, co2Y + 68);
        ctx.textAlign = 'start';
      }

      // =====================================================================
      // 5. J.J. THOMSON: PLUM PUDDING & CATHODE RAY DEFLECTION (INDEX 4)
      // =====================================================================
      else if (activeIndex === 4) {
        ctx.fillStyle = '#ec4899';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('THOMSON PLUM PUDDING (1897) · Subatomic Electron Discovery', 30, 32);

        // Large diffuse sphere of positive charge
        const px = w / 2;
        const py = h / 2;
        const pRad = 100;

        const pGrad = ctx.createRadialGradient(px, py, 10, px, py, pRad);
        pGrad.addColorStop(0, 'rgba(236, 72, 153, 0.45)');
        pGrad.addColorStop(0.7, 'rgba(219, 39, 119, 0.25)');
        pGrad.addColorStop(1, 'rgba(157, 23, 77, 0.05)');

        ctx.beginPath();
        ctx.arc(px, py, pRad, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.fill();
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#fbcfe8';
        ctx.font = 'bold 9.5px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Positive Charge Substratum (+)', px, py - 110);

        // 14 Embedded Negative Electrons (Plums)
        for (let i = 0; i < 14; i++) {
          const ang = (i * Math.PI * 2) / 14 + t * 0.4;
          const dist = 32 + (i % 3) * 26 + Math.sin(t * 3 + i) * 3;
          const ex = px + Math.cos(ang) * dist;
          const ey = py + Math.sin(ang) * dist;

          ctx.beginPath();
          ctx.arc(ex, ey, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 9px JetBrains Mono, monospace';
          ctx.fillText('−', ex, ey + 3);
        }

        // Cathode Ray Deflection Beam Bottom Left to Right
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(35, h - 35);
        ctx.quadraticCurveTo(w / 2, h - 60, w - 35, h - 25);
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#4ade80';
        ctx.font = '8.5px JetBrains Mono, monospace';
        ctx.fillText('Cathode Ray Electron Beam deflected by Electric Field', px, h - 15);
        ctx.textAlign = 'start';
      }

      // =====================================================================
      // 6. RUTHERFORD & BOHR: PLANETARY NUCLEUS & QUANTIZED ORBITALS (INDEX 5)
      // =====================================================================
      else if (activeIndex === 5) {
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('RUTHERFORD-BOHR MODEL (1913) · Ultradense Nucleus & Quantized Jump', 30, 32);

        const bx = w / 2;
        const by = h / 2;

        // Concentric Quantized Orbits (n=1, n=2, n=3)
        const orbits = [45, 85, 130];
        orbits.forEach((r, idx) => {
          ctx.beginPath();
          ctx.arc(bx, by, r, 0, Math.PI * 2);
          ctx.strokeStyle = idx === 0 ? 'rgba(56, 189, 248, 0.4)' : idx === 1 ? 'rgba(56, 189, 248, 0.3)' : 'rgba(56, 189, 248, 0.2)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 5]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#94a3b8';
          ctx.font = '8px JetBrains Mono, monospace';
          ctx.fillText(`n = ${idx + 1}`, bx + r + 4, by - 4);
        });

        // Ultradense Central Nucleus (+Ze)
        ctx.beginPath();
        ctx.arc(bx, by, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 8px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('+Ze', bx, by + 3);

        // Orbiting Electron
        const currentOrbit = quantumJumpActive ? orbits[0] : orbits[2];
        const eAngle = t * (quantumJumpActive ? 4 : 2);
        const ex = bx + Math.cos(eAngle) * currentOrbit;
        const ey = by + Math.sin(eAngle) * currentOrbit;

        ctx.beginPath();
        ctx.arc(ex, ey, 6.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 8px JetBrains Mono, monospace';
        ctx.fillText('e⁻', ex, ey + 2.5);

        // Photon wave packet emission during Quantum Leap!
        if (quantumJumpActive) {
          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          for (let px = bx + 45; px < bx + 160; px += 4) {
            const py = by + Math.sin((px - bx) * 0.25 + t * 15) * 8;
            px === bx + 45 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.stroke();

          ctx.fillStyle = '#fde047';
          ctx.font = 'bold 9px JetBrains Mono, monospace';
          ctx.fillText('Photon Emitted (ΔE = hν)!', bx + 100, by - 16);
        }

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '8.5px JetBrains Mono, monospace';
        ctx.fillText('99.999% Vacuous Space (Ākāśa Substrate)', bx, by + 155);
        ctx.textAlign = 'start';
      }

      // =====================================================================
      // 7. S.N. BOSE & QFT: DYNAMIC VACUUM FOAM & BOSON CONDENSATE (INDEX 6)
      // =====================================================================
      else if (activeIndex === 6) {
        ctx.fillStyle = '#eab308';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('BOSE-EINSTEIN CONDENSATE & QFT (Dynamic Ākāśa Ground State)', 30, 32);

        const qx = w / 2;
        const qy = h / 2;

        if (condensateActive) {
          // Coherent Giant Macroscopic Quantum Wave (BEC State)
          const rad = 110 + Math.sin(t * 3) * 12;
          const qGrad = ctx.createRadialGradient(qx, qy, 10, qx, qy, rad);
          qGrad.addColorStop(0, 'rgba(250, 204, 21, 0.8)');
          qGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.35)');
          qGrad.addColorStop(1, 'rgba(234, 179, 8, 0)');

          ctx.beginPath();
          ctx.arc(qx, qy, rad, 0, Math.PI * 2);
          ctx.fillStyle = qGrad;
          ctx.fill();

          ctx.fillStyle = '#fef08a';
          ctx.font = 'bold 11px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('❄️ MACROSCOPIC BOSON WAVE (Ψ_BEC COHERENCE)', qx, qy);
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.fillStyle = '#cbd5e1';
          ctx.fillText('All atoms occupy identical quantum ground state', qx, qy + 18);
        } else {
          // Quantum Probability Wave Clouds (|ψ|²) & Vacuum Zero-Point Foam
          for (let ring = 1; ring <= 4; ring++) {
            ctx.beginPath();
            ctx.ellipse(
              qx,
              qy,
              40 * ring + Math.sin(t * 2 + ring) * 8,
              25 * ring + Math.cos(t * 2 + ring) * 8,
              (ring * Math.PI) / 4 + t * 0.3,
              0,
              Math.PI * 2
            );
            ctx.strokeStyle = `rgba(234, 179, 8, ${0.45 - ring * 0.08})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Quantum vacuum zero-point harmonic particles pop in and out
          for (let p = 0; p < 28; p++) {
            const px = qx + Math.sin(t * 2 + p * 1.3) * (80 + (p % 4) * 25);
            const py = qy + Math.cos(t * 3 + p * 1.7) * (60 + (p % 4) * 20);
            const alpha = 0.3 + 0.7 * Math.abs(Math.sin(t * 4 + p));

            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.fill();
          }

          ctx.fillStyle = '#fde047';
          ctx.font = 'bold 9.5px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('|ψ|² Probability Density & Zero-Point Vacuum Energy', qx, qy + 130);
        }
        ctx.textAlign = 'start';
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activeIndex, isPlaying, simSpeed, actionPulse, clinamenTriggered, quantumJumpActive, condensateActive, sunbeamFilterBoost]);

  return (
    <div className="vl-atomism-visualizer-container" role="region" aria-label="History of Atomism Visual Laboratory">
      {/* 1. Interactive Model Showcase Header */}
      <div className="vl-atomism-header-card">
        <div className="vl-atomism-header-top">
          <div>
            <div className="vl-hud-pill">2,600-YEAR EVOLUTIONARY GRAPHICS · वैशेषिक-तुलनात्मकम्</div>
            <h3 className="vl-atomism-title">
              <span>{meta.title}</span> <span className="vl-atomism-sanskrit" lang="sa">({meta.sanskrit})</span>
              {onPronounce && (
                <button
                  type="button"
                  className="vl-word-pronounce-btn"
                  onClick={() => onPronounce(meta.sanskrit)}
                  style={{ fontSize: '0.74rem', padding: '0.15rem 0.45rem', marginLeft: '0.5rem' }}
                  title={`Pronounce ${meta.sanskrit}`}
                >
                  🔊
                </button>
              )}
            </h3>
            <div className="vl-atomism-meta-strip">
              <span className="vl-meta-badge" style={{ borderColor: meta.physicsAccent, color: meta.physicsAccent }}>
                📍 {meta.thinker} · {meta.era}
              </span>
              <span className="vl-meta-highlight">{meta.visualBadge}</span>
            </div>
          </div>

          {/* Quick Era Switcher Bar */}
          <div className="vl-era-switcher-pills">
            {MILESTONE_METAS.map((m, idx) => (
              <button
                key={idx}
                type="button"
                className={`vl-era-pill-btn${activeIndex === idx ? ' is-active' : ''}`}
                onClick={() => {
                  onSelectIndex(idx);
                  soundEffects.playPuzzleSnap();
                }}
                style={{
                  borderColor: activeIndex === idx ? m.physicsAccent : 'rgba(148, 163, 184, 0.25)',
                  boxShadow: activeIndex === idx ? `0 0 12px ${m.physicsGlow}` : 'none',
                }}
                title={`${m.thinker} (${m.era})`}
              >
                <span className="vl-era-pill-num">{idx + 1}</span>
                <span className="vl-era-pill-name">{m.thinker.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="vl-atomism-summary-text">{meta.conceptSummary}</p>
      </div>

      {/* 2. Interactive Real-Time Canvas Stage */}
      <div className="vl-atomism-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={700}
          height={380}
          className="vl-atomism-canvas"
          style={{
            borderColor: meta.physicsAccent,
            boxShadow: `0 0 25px ${meta.physicsGlow}`,
          }}
        />

        {/* Live Simulation Control Overlay */}
        <div className="vl-atomism-canvas-toolbar">
          <div className="vl-canvas-tool-group">
            <button
              type="button"
              className="vl-sim-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            <button
              type="button"
              className="vl-sim-btn"
              onClick={() => setSimSpeed(simSpeed === 1 ? 2 : simSpeed === 2 ? 0.5 : 1)}
              title="Adjust simulation speed"
            >
              ⚡ {simSpeed}x Speed
            </button>
          </div>

          <div className="vl-canvas-action-trigger">
            {activeIndex === 0 ? (
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber"
                  onClick={handleSunbeamFilter}
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.4rem 0.8rem',
                  }}
                  title="Intensify sunbeam and observe light scattering off Trasareṇu motes"
                >
                  ☀️ Filter Sunbeam (Trasareṇu)
                </button>
                <button
                  type="button"
                  className="vl-btn vl-btn--gold is-pulsing"
                  onClick={handleTriggerAction}
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.4rem 0.85rem',
                    borderColor: pilupakaBakeActive ? '#f97316' : '#f59e0b',
                    boxShadow: pilupakaBakeActive ? '0 0 16px rgba(249, 115, 22, 0.6)' : undefined,
                  }}
                  title="Activate Kaṇāda's Pīlupāka kiln to view thermal bond dissociation"
                >
                  {pilupakaBakeActive ? '☀️ Return to Sunbeam View' : '🔥 Activate Pīlupāka Oven Bake'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="vl-btn vl-btn--gold is-pulsing"
                onClick={handleTriggerAction}
                style={{
                  fontSize: '0.82rem',
                  padding: '0.4rem 0.85rem',
                  borderColor: meta.physicsAccent,
                }}
              >
                {activeIndex === 1 && '💥 Agitate Greek Void (Kinetic Impulse)'}
                {activeIndex === 2 && '⚡ Trigger Clinamen (Microscopic Swerve)'}
                {activeIndex === 3 && '⚗️ Synthesize Compound (H₂O & CO₂)'}
                {activeIndex === 4 && '🧲 Deflect Cathode Ray Beam'}
                {activeIndex === 5 && '✨ Trigger Quantum Leap (n=3 ➔ n=1)'}
                {activeIndex === 6 && (condensateActive ? '🔥 Warm to Fluid Field' : '❄️ Condense Bose State (Absolute 0)')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Interactive Epistemic Scale Ladder (From Macro to Planck Boundary) */}
      <div className="vl-scale-ladder-card">
        <div className="vl-scale-header">
          <div>
            <h4 className="vl-scale-title">
              📏 THE EPISTEMIC SCALE LADDER: FROM SENSE PERCEPTION TO PLANCK BOUNDARY
            </h4>
            <div className="vl-scale-sub">
              Notice how Sage Kaṇāda deduced the exact 500nm light-scattering boundary (Trasareṇu) 2,400 years before modern optics!
            </div>
          </div>
          <span className="vl-hud-pill">SCALE: 10⁻³ m ➔ 10⁻¹⁸ m</span>
        </div>

        {/* Clickable Scale Steps */}
        <div className="vl-scale-track">
          {SCALE_TIERS.map((tier, idx) => (
            <button
              key={tier.exponent}
              type="button"
              className={`vl-scale-node-btn${selectedScaleIndex === idx ? ' is-active' : ''}`}
              onClick={() => {
                setSelectedScaleIndex(idx);
                soundEffects.playPuzzleSnap();
              }}
              style={{
                borderColor: selectedScaleIndex === idx ? tier.color : 'rgba(148, 163, 184, 0.2)',
                background: selectedScaleIndex === idx ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.5)',
              }}
            >
              <div className="vl-scale-node-exp" style={{ color: tier.color }}>{tier.exponent}</div>
              <div className="vl-scale-node-label">{tier.label}</div>
              <div className="vl-scale-node-size">{tier.sizeMeters}</div>
            </button>
          ))}
        </div>

        {/* Selected Scale Tier Inspection Callout */}
        {(() => {
          const st = SCALE_TIERS[selectedScaleIndex];
          return (
            <div className="vl-scale-detail-box" style={{ borderLeftColor: st.color }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                <strong style={{ color: st.color, fontSize: '0.94rem' }}>
                  {st.exponent} · {st.label} <span lang="sa" style={{ color: '#fed7aa', fontWeight: 600 }}>({st.sanskrit})</span>
                </strong>
                <span className="vl-meta-badge" style={{ fontSize: '0.72rem', borderColor: st.color, color: st.color }}>
                  {st.eraMarker}
                </span>
              </div>
              <p style={{ margin: '0.35rem 0 0', color: '#cbd5e1', fontSize: '0.86rem', lineHeight: 1.5 }}>
                {st.description}
              </p>
            </div>
          );
        })()}
      </div>

      {/* 4. The 2,600-Year Paradigm Shift Matrix Toggle Button */}
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button
          type="button"
          className="vl-btn vl-btn--cyber"
          onClick={() => setShowMatrixComparison(!showMatrixComparison)}
          style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem' }}
        >
          {showMatrixComparison ? '▲ Hide 2,600-Year Paradigm Shift Matrix' : '📊 View 2,600-Year Comparative Paradigm Shift Matrix ▼'}
        </button>
      </div>

      {/* 5. Paradigm Shift Matrix (Comparative Infographic Grid) */}
      {showMatrixComparison && (
        <div className="vl-paradigm-matrix-wrap">
          <h4 style={{ color: '#fef08a', margin: '0 0 0.75rem', fontSize: '1.05rem', fontWeight: 800 }}>
            🏛️ 2,600-YEAR ATOMIC PARADIGM COMPARISON: VAIŚEṢIKA VS. WESTERN PHYSICS
          </h4>
          <div className="vl-matrix-table-scroll">
            <table className="vl-matrix-table">
              <thead>
                <tr>
                  <th>Tradition &amp; Era</th>
                  <th>Fundamental Unit</th>
                  <th>Ontology of Space / Void</th>
                  <th>Prime Driver of Motion</th>
                  <th>Modern Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Sage Kaṇāda (~600 BCE)</strong>
                    <div style={{ fontSize: '0.75rem', color: '#fbbf24' }}>Vaiśeṣika Darśana (India)</div>
                  </td>
                  <td>
                    <span style={{ color: '#86efac', fontWeight: 700 }}>Paramāṇu (0D) ➔ Tryaṇuka (3D)</span>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Qualitative guṇas inherent per bhūta</div>
                  </td>
                  <td>
                    <strong>Ākāśa (आकाश)</strong>: Continuous, non-atomic substrate conducting sound waves.
                  </td>
                  <td>
                    <strong>Adṛṣṭa &amp; Vega</strong>: Unseen cosmic moral order and kinetic impulse (Karma).
                  </td>
                  <td>
                    <span style={{ color: '#86efac' }}>Verified</span>: Rayleigh scattering &amp; spatial volume thresholds match Trasareṇu.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Democritus (~400 BCE)</strong>
                    <div style={{ fontSize: '0.75rem', color: '#67e8f9' }}>Ancient Greece</div>
                  </td>
                  <td>
                    <strong>Atomos (ἄτομος)</strong>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Shape polyhedra (hooks, smooth balls, spikes)</div>
                  </td>
                  <td>
                    <strong>To Kenon (Void)</strong>: Empty non-being; infinite nothingness separating atoms.
                  </td>
                  <td>
                    <strong>Mechanical collisions</strong>: Passive inertial tumbling in void.
                  </td>
                  <td>
                    Superseded: Interatomic bonds are electromagnetic fields, not mechanical physical hooks.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Epicurus (~300 BCE)</strong>
                    <div style={{ fontSize: '0.75rem', color: '#c084fc' }}>Hellenistic Rome</div>
                  </td>
                  <td>
                    <strong>Swerving Atomos</strong>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Invariable mass packets in parallel rainfall</div>
                  </td>
                  <td>
                    <strong>Empty Void</strong> with uniform vertical gravitational vector.
                  </td>
                  <td>
                    <strong>Clinamen</strong>: Spontaneous indeterminate angular swerve.
                  </td>
                  <td>
                    Anticipated quantum indeterminism and spontaneous symmetry breaking.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>John Dalton (1803 CE)</strong>
                    <div style={{ fontSize: '0.75rem', color: '#34d399' }}>Industrial England</div>
                  </td>
                  <td>
                    <strong>Stoichiometric Spheres</strong>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Hard, solid spheres of fixed elemental mass</div>
                  </td>
                  <td>
                    Volumetric container space filled with chemical atmospheres.
                  </td>
                  <td>
                    <strong>Chemical affinities</strong> and thermodynamic heating.
                  </td>
                  <td>
                    <span style={{ color: '#86efac' }}>Verified</span>: Whole-number multiple proportions (mirroring Kaṇāda’s arithmetic).
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Rutherford &amp; Bohr (1913)</strong>
                    <div style={{ fontSize: '0.75rem', color: '#38bdf8' }}>England / Denmark</div>
                  </td>
                  <td>
                    <strong>Planetary Nuclear Atom</strong>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Dense nucleus + quantized electron orbitals</div>
                  </td>
                  <td>
                    <strong>99.999% Empty Space</strong> surrounding ultradense central core.
                  </td>
                  <td>
                    <strong>Coulomb force</strong> &amp; quantized angular momentum (h/2π).
                  </td>
                  <td>
                    <span style={{ color: '#86efac' }}>Verified</span>: Proved atoms are predominantly vacuous space (Ākāśa).
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>S.N. Bose &amp; QFT (Present)</strong>
                    <div style={{ fontSize: '0.75rem', color: '#facc15' }}>Global Modern Physics</div>
                  </td>
                  <td>
                    <strong>Quantum Field Excitations</strong>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Fermions &amp; Bosons as localized field quanta</div>
                  </td>
                  <td>
                    <strong>Quantum Vacuum</strong>: Teeming with zero-point harmonic energy foam.
                  </td>
                  <td>
                    <strong>Gauge symmetries</strong> &amp; quantum vacuum potential.
                  </td>
                  <td>
                    <span style={{ color: '#86efac' }}>Current Frontier</span>: Vacuum is not void, but active ground state Ākāśa.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
