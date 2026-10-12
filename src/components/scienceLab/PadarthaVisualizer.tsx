import React, { useState, useEffect, useRef } from 'react';
import { soundEffects } from '../../utils/soundEffects';

export type PadarthaKey = 'dravya' | 'guna' | 'karma' | 'samanya' | 'visesa' | 'samavaya';

interface PadarthaVisualizerProps {
  initialPadartha?: PadarthaKey;
  onSelectPadartha?: (key: PadarthaKey) => void;
  onPronounce?: (word: string) => void;
  compact?: boolean;
}

interface PadarthaMeta {
  key: PadarthaKey;
  dev: string;
  iast: string;
  en: string;
  sanskritSub: string;
  badge: string;
  icon: string;
  color: string;
  glowColor: string;
  accentGradient: string;
  sutra: string;
  sutraRef: string;
  principle: string;
  modernParallel: string;
  interactivePrompt: string;
}

export const PADARTHA_METAS: Record<PadarthaKey, PadarthaMeta> = {
  dravya: {
    key: 'dravya',
    dev: 'द्रव्य',
    iast: 'Dravya',
    en: 'Substance / Substratum',
    sanskritSub: 'क्रियागुणवत् समवायिकारणम्',
    badge: 'Category 1 · Substratum',
    icon: '🧱',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    accentGradient: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
    sutra: 'क्रियागुणवत् समवायिकारणम् इति द्रव्यलक्षणम् ॥',
    sutraRef: 'Vaiśeṣika Sūtra 1.1.15',
    principle: 'The foundational physical and metaphysical substrate that hosts inherent qualities (Guṇas) and motions (Karmas). Contains 9 distinct Dravyas: 4 atomic (Earth, Water, Fire, Air), 1 continuous space (Ākāśa), 2 coordinates (Time, Space/Direction), and 2 conscious entities (Soul, Mind).',
    modernParallel: 'Fundamental Matter & Spacetime Substrate (Fermions, Bosons, and Metric Spacetime Tensor)',
    interactivePrompt: 'Observe the 9 Dravya nodes orbiting the atomic nucleus in harmonious celestial and quantum equilibrium.',
  },
  guna: {
    key: 'guna',
    dev: 'गुण',
    iast: 'Guṇa',
    en: 'Inherent Quality',
    sanskritSub: 'द्रव्याश्रय्यगुणवान् संयोगविभागेष्वकारणम्',
    badge: 'Category 2 · Static Attributes',
    icon: '✨',
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    accentGradient: 'linear-gradient(135deg, #db2777 0%, #f472b6 100%)',
    sutra: 'द्रव्याश्रयी अगुणवान् संयोगविभागेष्वकारणमनपेक्ष इति गुणलक्षणम् ॥',
    sutraRef: 'Vaiśeṣika Sūtra 1.1.16',
    principle: 'Static, intrinsic properties residing permanently within substances. Includes the 24 canonical Guṇas: physical forces (Gravity / Gurutva, Momentum / Vega, Viscosity / Sneha), elemental qualities (Temperature, Fluidity), and sensory observables (Color, Smell, Taste, Sound).',
    modernParallel: 'Intrinsic Field Constants, Coupling Constants & State Observables (Charge, Mass, Spin, Viscosity)',
    interactivePrompt: 'Drag the Prism Refractor to disperse fundamental Dravya into its 24 radiant Guṇa wavebands!',
  },
  karma: {
    key: 'karma',
    dev: 'कर्म',
    iast: 'Karma',
    en: 'Action / Motion',
    sanskritSub: 'एकद्रव्यमगुणं संयोगविभागेष्वनपेक्षकारणम्',
    badge: 'Category 3 · Kinematics',
    icon: '⚡',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    accentGradient: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
    sutra: 'एकद्रव्यमगुणं संयोगविभागेष्वनपेक्षकारणं कर्म ॥',
    sutraRef: 'Vaiśeṣika Sūtra 1.1.17',
    principle: 'Dynamic kinetic impulse belonging exclusively to material substances, causing physical separation (Vibhāga) and conjunction (Saṁyoga). Divided into 5 vectors: Utkṣepaṇa (upward), Avakṣepaṇa (downward fall), Ākuñcana (contraction), Prasāraṇa (expansion), and Gamana (locomotion).',
    modernParallel: 'Classical & Relativistic Kinematics (Velocity Vectors, Spatial Transformations, Linear & Angular Momentum)',
    interactivePrompt: 'Trigger the 5 kinematic vector thrusters to witness Kaṇāda\'s classical motion laboratory.',
  },
  samanya: {
    key: 'samanya',
    dev: 'सामान्य',
    iast: 'Sāmānya',
    en: 'Generality / Universals',
    sanskritSub: 'सामान्यं द्विविधं परं चापरं च',
    badge: 'Category 4 · Universal Archetypes',
    icon: '🌐',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    accentGradient: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
    sutra: 'सामान्यं विशेष इति बुद्धयपेक्षम् ॥',
    sutraRef: 'Vaiśeṣika Sūtra 1.2.3',
    principle: 'The eternal universal template or class essence (Jāti) shared across individual entities. For example, "Earth-ness" (Pṛthivītva) exists identically in every single earth paramāṇu across the cosmos, enabling macroscopic classification and universal physical laws.',
    modernParallel: 'Invariance Principles, Symmetry Groups & Class Invariants (Gauge Symmetries, Natural Classes)',
    interactivePrompt: 'Amplify the Universal Field Coherence slider to align diverse atoms into a unified golden morphic resonance!',
  },
  visesa: {
    key: 'visesa',
    dev: 'विशेष',
    iast: 'Viśeṣa',
    en: 'Irreducible Particularity',
    sanskritSub: 'नित्यद्रव्यवृत्तयो व्यावर्त्तका विशेषाः',
    badge: 'Category 5 · Individuation',
    icon: '💎',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    accentGradient: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)',
    sutra: 'अन्यत्रान्त्येभ्यो विशेषेभ्यः ॥',
    sutraRef: 'Vaiśeṣika Sūtra 1.2.6',
    principle: 'The ultimate namesake of the entire Vaiśeṣika darśana! The irreducible individuality (Antya-Viśeṣa) residing in ultimate eternal atoms. Even when two atoms are identical in mass and composition, Viśeṣa ensures they remain distinct, preventing reality from collapsing into an indistinct soup.',
    modernParallel: 'Quantum Identity, Pauli Exclusion Principle & Non-Degeneracy (Unique Quantum Numbers / Eigenstates)',
    interactivePrompt: 'Inspect two identical atoms under the quantum microscope: observe their unique internal vibrational fingerprints!',
  },
  samavaya: {
    key: 'samavaya',
    dev: 'समवाय',
    iast: 'Samavāya',
    en: 'Inseparable Inherence',
    sanskritSub: 'अयुतसिद्धयोराधार्याधारभूतयोः संबन्धः',
    badge: 'Category 6 · Eternal Inherence',
    icon: '🔗',
    color: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    accentGradient: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)',
    sutra: 'इहेदमिति यतः कार्यकारणयोः स समवायः ॥',
    sutraRef: 'Vaiśeṣika Sūtra 7.2.26',
    principle: 'The eternal, inseparable relationship connecting structural parts to wholes, and substances to their inherent qualities. Unlike temporary contact (Saṁyoga) which can be detached without destroying the entities, Samavāya is unbreakable (Ayuta-siddha) and forms reality\'s constitutive fabric.',
    modernParallel: 'Topological Entanglement, Constitutive Binding & Inseparable Inherence (Constituent Quark Binding, Space-Time Curvature)',
    interactivePrompt: 'Pull the Substance and Quality apart: unlike fragile Saṁyoga, the Samavāya quantum ribbon stretches without snapping!',
  },
};

const PADARTHA_KEYS: PadarthaKey[] = ['dravya', 'guna', 'karma', 'samanya', 'visesa', 'samavaya'];

export const PadarthaVisualizer: React.FC<PadarthaVisualizerProps> = ({
  initialPadartha = 'dravya',
  onSelectPadartha,
  onPronounce,
  compact = false,
}) => {
  const [selectedKey, setSelectedKey] = useState<PadarthaKey>(initialPadartha);

  // Interactive Sub-states for specific Padārthas
  // 1. Dravya: 4 Elements vs 5 Cosmic
  const [dravyaMode, setDravyaMode] = useState<'all' | 'atomic' | 'cosmic'>('all');
  const dravyaOrbitalSpeed = 1;

  // 2. Guṇa: Prismatic Refraction Angle
  const [gunaRefraction, setGunaRefraction] = useState<number>(45);

  // 3. Karma: Active Kinematic Vector
  const [activeKarmaVector, setActiveKarmaVector] = useState<'utksepana' | 'avaksepana' | 'akuncana' | 'prasarana' | 'gamana'>('gamana');

  // 4. Sāmānya: Coherence Level (0 to 100%)
  const [samanyaCoherence, setSamanyaCoherence] = useState<number>(75);

  // 5. Viśeṣa: Quantum Frequency delta
  const [visesaZoom, setVisesaZoom] = useState<number>(1.5);

  // 6. Samavāya: Mechanical Tension (0 to 100%)
  const [samavayaTension, setSamavayaTension] = useState<number>(30);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeMeta = PADARTHA_METAS[selectedKey];

  const handleSelect = (key: PadarthaKey) => {
    setSelectedKey(key);
    if (onSelectPadartha) onSelectPadartha(key);
    soundEffects.playPuzzleSnap();
  };

  // ---------------------------------------------------------------------------
  // MAIN ANIMATION RENDER LOOP FOR THE ACTIVE PADĀRTHA
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animId: number;

    const render = () => {
      time += 0.03;
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Deep Cosmic Backdrop
      ctx.fillStyle = '#040814';
      ctx.fillRect(0, 0, width, height);

      // Subtle Cyber-Vedic Geometric Grid & Mandala Rings
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      for (let r = 40; r <= 220; r += 45) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(cx, 15);
      ctx.lineTo(cx, height - 15);
      ctx.moveTo(20, cy);
      ctx.lineTo(width - 20, cy);
      ctx.stroke();
      ctx.restore();

      // =======================================================================
      // 1. DRAVYA: 9 Substratum Nodes & Atomic Matrix
      // =======================================================================
      if (selectedKey === 'dravya') {
        const dravyas = [
          { name: 'Pṛthivī (Earth)', icon: '🪨', color: '#f59e0b', atomic: true },
          { name: 'Ap (Water)', icon: '💧', color: '#38bdf8', atomic: true },
          { name: 'Tejas (Fire)', icon: '🔥', color: '#ef4444', atomic: true },
          { name: 'Vāyu (Air)', icon: '🌬️', color: '#a855f7', atomic: true },
          { name: 'Ākāśa (Space)', icon: '🌌', color: '#6366f1', atomic: false },
          { name: 'Kāla (Time)', icon: '⏳', color: '#10b981', atomic: false },
          { name: 'Dik (Direction)', icon: '🧭', color: '#06b6d4', atomic: false },
          { name: 'Ātman (Self)', icon: '🧘', color: '#fbbf24', atomic: false },
          { name: 'Manas (Mind)', icon: '🧠', color: '#ec4899', atomic: false },
        ];

        // Central Atomic Core
        ctx.save();
        const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 32);
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.3, '#38bdf8');
        coreGrad.addColorStop(1, 'rgba(2, 132, 199, 0.1)');
        ctx.fillStyle = coreGrad;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.arc(cx, cy, 22 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('DRAVYA', cx, cy - 2);
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillStyle = '#bae6fd';
        ctx.fillText('SUBSTRATUM', cx, cy + 9);
        ctx.restore();

        // Orbiting Nodes (9 Substances)
        const visibleDravyas = dravyas.filter((d) => {
          if (dravyaMode === 'atomic') return d.atomic;
          if (dravyaMode === 'cosmic') return !d.atomic;
          return true;
        });

        visibleDravyas.forEach((d, i) => {
          const orbitR = d.atomic ? 72 : 125;
          const speed = (d.atomic ? 0.6 : 0.35) * dravyaOrbitalSpeed;
          const angle = time * speed + (i * (Math.PI * 2)) / visibleDravyas.length;
          const nx = cx + Math.cos(angle) * orbitR;
          const ny = cy + Math.sin(angle) * (orbitR * 0.72); // Elliptical tilt

          // Draw orbital connector spoke
          ctx.save();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nx, ny);
          ctx.stroke();

          // Node sphere
          const nGrad = ctx.createRadialGradient(nx, ny, 1, nx, ny, 14);
          nGrad.addColorStop(0, '#ffffff');
          nGrad.addColorStop(0.4, d.color);
          nGrad.addColorStop(1, '#020617');
          ctx.fillStyle = nGrad;
          ctx.shadowColor = d.color;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(nx, ny, 11, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = '10px serif';
          ctx.textAlign = 'center';
          ctx.fillText(d.icon, nx, ny + 3);

          // Name label
          ctx.fillStyle = '#cbd5e1';
          ctx.font = 'bold 8.5px Inter, sans-serif';
          ctx.fillText(d.name.split(' ')[0], nx, ny + 19);
          ctx.restore();
        });
      }

      // =======================================================================
      // 2. GUṆA: Prismatic Dispersion of the 24 Inherent Qualities
      // =======================================================================
      if (selectedKey === 'guna') {
        // Incident Beam entering from left
        const beamStartX = 30;
        const beamStartY = cy;
        const prismX = cx - 35;
        const prismY = cy;

        ctx.save();
        // White Incident Beam
        const bGrad = ctx.createLinearGradient(beamStartX, beamStartY, prismX, prismY);
        bGrad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        bGrad.addColorStop(1, '#ffffff');
        ctx.strokeStyle = bGrad;
        ctx.lineWidth = 4;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(beamStartX, beamStartY);
        ctx.lineTo(prismX, prismY);
        ctx.stroke();

        // Triangular Refracting Crystal Prism
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 18;
        ctx.fillStyle = 'rgba(236, 72, 153, 0.25)';
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(prismX, prismY - 55);
        ctx.lineTo(prismX + 55, prismY);
        ctx.lineTo(prismX, prismY + 55);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // 24 Spectral Quality Rays dispersing outward
        const spectrumColors = [
          { name: 'गन्ध (Smell)', color: '#f59e0b', angle: -0.55 },
          { name: 'रस (Taste)', color: '#38bdf8', angle: -0.42 },
          { name: 'रूप (Color)', color: '#ef4444', angle: -0.28 },
          { name: 'स्पर्श (Touch)', color: '#a855f7', angle: -0.15 },
          { name: 'संख्या (Number)', color: '#10b981', angle: -0.02 },
          { name: 'परिमाण (Magnitude)', color: '#fbbf24', angle: 0.12 },
          { name: 'गुरुत्व (Gravity)', color: '#3b82f6', angle: 0.25 },
          { name: 'द्रवत्व (Fluidity)', color: '#06b6d4', angle: 0.38 },
          { name: 'स्नेह (Viscosity)', color: '#ec4899', angle: 0.52 },
        ];

        const spreadMultiplier = (gunaRefraction / 45);

        spectrumColors.forEach((ray, idx) => {
          const exitAngle = ray.angle * spreadMultiplier;
          const rayLen = 150 + Math.sin(time * 4 + idx) * 12;
          const ex = prismX + 55 + Math.cos(exitAngle) * rayLen;
          const ey = prismY + Math.sin(exitAngle) * rayLen;

          ctx.save();
          const rGrad = ctx.createLinearGradient(prismX + 55, prismY, ex, ey);
          rGrad.addColorStop(0, '#ffffff');
          rGrad.addColorStop(0.3, ray.color);
          rGrad.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.strokeStyle = rGrad;
          ctx.lineWidth = 2.5;
          ctx.shadowColor = ray.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(prismX + 55, prismY);
          ctx.lineTo(ex, ey);
          ctx.stroke();

          // Particle pulse along ray
          const pT = ((time * 1.5 + idx * 0.4) % 1);
          const px = prismX + 55 + Math.cos(exitAngle) * (rayLen * pT);
          const py = prismY + Math.sin(exitAngle) * (rayLen * pT);
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Ray Label
          ctx.fillStyle = ray.color;
          ctx.font = 'bold 9px Inter, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(ray.name, ex + 6, ey + 3);
          ctx.restore();
        });
      }

      // =======================================================================
      // 3. KARMA: The 5 Classical Motion Vectors
      // =======================================================================
      if (selectedKey === 'karma') {
        let px = cx;
        let py = cy;

        if (activeKarmaVector === 'utksepana') {
          // Upward elevation
          py = cy - 35 + Math.sin(time * 3) * 35;
        } else if (activeKarmaVector === 'avaksepana') {
          // Downward gravitational plunge
          py = cy + 35 - Math.sin(time * 3) * 35;
        } else if (activeKarmaVector === 'akuncana') {
          // Centripetal contraction
          const scale = 0.5 + Math.abs(Math.sin(time * 2.5)) * 0.9;
          px = cx + Math.cos(time * 2) * (30 * scale);
          py = cy + Math.sin(time * 2) * (30 * scale);
        } else if (activeKarmaVector === 'prasarana') {
          // Centrifugal expansion
          const scale = 0.2 + (time * 1.2 % 1.6);
          px = cx + Math.cos(time * 3) * (55 * scale);
          py = cy + Math.sin(time * 3) * (45 * scale);
        } else if (activeKarmaVector === 'gamana') {
          // Curvilinear locomotion (transverse velocity)
          px = cx + Math.cos(time * 1.8) * 95;
          py = cy + Math.sin(time * 3.6) * 45; // Lissajous figure-8
        }

        // Motion Vector Arrow
        ctx.save();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.setLineDash([]);

        // Active Moving Particle
        const partGrad = ctx.createRadialGradient(px, py, 2, px, py, 18);
        partGrad.addColorStop(0, '#ffffff');
        partGrad.addColorStop(0.3, '#f59e0b');
        partGrad.addColorStop(1, 'rgba(217, 119, 6, 0.1)');
        ctx.fillStyle = partGrad;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚡', px, py + 4);

        // Vector Description Callout
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 11px Inter, sans-serif';
        const vectorLabels: Record<string, string> = {
          utksepana: 'उत्क्षेपणम् (Upward Propulsion ↑)',
          avaksepana: 'अवक्षेपणम् (Gravitational Fall ↓)',
          akuncana: 'आकुञ्चनम् (Centripetal Contraction →←)',
          prasarana: 'प्रसारणम् (Centrifugal Expansion ←→)',
          gamana: 'गमनम् (Locomotion & Orbital Flow ⤹)',
        };
        ctx.fillText(vectorLabels[activeKarmaVector], cx, height - 25);
        ctx.restore();
      }

      // =======================================================================
      // 4. SĀMĀNYA: Universal Morphic Archetype Ring
      // =======================================================================
      if (selectedKey === 'samanya') {
        const coherence = samanyaCoherence / 100;
        const numAtoms = 12;

        ctx.save();
        // Golden Universal Field (Sāmānya Mandalic Ring)
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.4 + coherence * 0.5})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 20 * coherence;
        ctx.beginPath();
        ctx.arc(cx, cy, 95, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(16, 185, 129, ${0.05 + coherence * 0.12})`;
        ctx.fill();

        ctx.fillStyle = '#6ee7b7';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SĀMĀNYA · UNIVERSAL TEMPLATE (सामान्यम्)', cx, cy - 10);
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#a7f3d0';
        ctx.fillText(`PṚTHIVĪTVA (Earth-ness) · Coherence: ${samanyaCoherence}%`, cx, cy + 8);

        // Individual discrete atoms aligning under the universal ring
        for (let i = 0; i < numAtoms; i++) {
          const baseAngle = (i * Math.PI * 2) / numAtoms;
          // When coherence is low, atoms have jitter; when high, they align in geometric perfection
          const jitterR = (1 - coherence) * 28 * Math.sin(time * 3 + i * 2);
          const jitterA = (1 - coherence) * 0.4 * Math.cos(time * 2 + i);
          const ar = 95 + jitterR;
          const aa = baseAngle + jitterA;
          const ax = cx + Math.cos(aa) * ar;
          const ay = cy + Math.sin(aa) * ar;

          // Resonance spoke to center
          if (coherence > 0.4) {
            ctx.strokeStyle = `rgba(52, 211, 153, ${coherence * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(ax, ay);
            ctx.stroke();
          }

          const aGrad = ctx.createRadialGradient(ax, ay, 1, ax, ay, 10);
          aGrad.addColorStop(0, '#ffffff');
          aGrad.addColorStop(0.5, '#10b981');
          aGrad.addColorStop(1, '#022c22');
          ctx.fillStyle = aGrad;
          ctx.beginPath();
          ctx.arc(ax, ay, 7.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // =======================================================================
      // 5. VIŚEṢA: Dual Quantum Microscope Fingerprints
      // =======================================================================
      if (selectedKey === 'visesa') {
        // Two seemingly identical atoms side-by-side
        const sep = 90;
        const leftAx = cx - sep;
        const rightAx = cx + sep;

        ctx.save();
        // Magnifier Reticles
        [leftAx, rightAx].forEach((ax, idx) => {
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(ax, cy, 58, 0, Math.PI * 2);
          ctx.stroke();

          // Reticle crosshairs
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(ax - 65, cy);
          ctx.lineTo(ax + 65, cy);
          ctx.moveTo(ax, cy - 65);
          ctx.lineTo(ax, cy + 65);
          ctx.stroke();
          ctx.setLineDash([]);

          // Inside core: Unique Quantum Eigen-frequency Vibration (Viśeṣa Signature!)
          const freq = idx === 0 ? 3.4 : 5.8;
          const phase = idx === 0 ? 0 : Math.PI / 2;

          ctx.strokeStyle = idx === 0 ? '#c084fc' : '#e879f9';
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let th = 0; th <= Math.PI * 2; th += 0.1) {
            const rad = 24 + Math.sin(th * 6 + time * freq + phase) * (7 * visesaZoom);
            const rx = ax + Math.cos(th) * rad;
            const ry = cy + Math.sin(th) * rad;
            if (th === 0) ctx.moveTo(rx, ry);
            else ctx.lineTo(rx, ry);
          }
          ctx.closePath();
          ctx.stroke();

          // Core seed point
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(ax, cy, 6, 0, Math.PI * 2);
          ctx.fill();

          // Labels
          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 10px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`PARAMĀṆU ${idx === 0 ? 'α' : 'β'}`, ax, cy - 72);
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillStyle = '#d8b4fe';
          ctx.fillText(`Viśeṣa Key: #${idx === 0 ? '7A89-E1' : '3F12-B4'}`, ax, cy + 74);
          ctx.fillText(`Eigenfreq: ${(freq * 12.5).toFixed(1)} THz`, ax, cy + 86);
        });

        // Center Inequality Sign
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('≠', cx, cy + 7);
        ctx.font = 'bold 9px Inter, sans-serif';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText('ANTYA-VIŚEṢA (Irreducible Uniqueness)', cx, height - 15);
        ctx.restore();
      }

      // =======================================================================
      // 6. SAMAVĀYA: Inseparable Inherence Quantum Möbius Loop
      // =======================================================================
      if (selectedKey === 'samavaya') {
        const pull = (samavayaTension / 100) * 45;
        const subX = cx - 75 - pull;
        const qualX = cx + 75 + pull;

        ctx.save();
        // Substance Anchor (e.g. Lotus / Terracotta Pot)
        const sGrad = ctx.createRadialGradient(subX, cy, 2, subX, cy, 28);
        sGrad.addColorStop(0, '#ffffff');
        sGrad.addColorStop(0.3, '#6366f1');
        sGrad.addColorStop(1, '#090e17');
        ctx.fillStyle = sGrad;
        ctx.shadowColor = '#6366f1';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(subX, cy, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9.5px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('DRAVYA', subX, cy - 2);
        ctx.font = '7.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#c7d2fe';
        ctx.fillText('(Substance)', subX, cy + 9);

        // Quality Anchor (e.g. Redness / Fragrance)
        const qGrad = ctx.createRadialGradient(qualX, cy, 2, qualX, cy, 28);
        qGrad.addColorStop(0, '#ffffff');
        qGrad.addColorStop(0.3, '#ec4899');
        qGrad.addColorStop(1, '#090e17');
        ctx.fillStyle = qGrad;
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(qualX, cy, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9.5px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GUṆA', qualX, cy - 2);
        ctx.font = '7.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#fbcfe8';
        ctx.fillText('(Quality)', qualX, cy + 9);

        // Interwoven Double-Helix Entanglement Braids (Unbreakable Samavāya Bond)
        const numTwists = 4;
        const step = (qualX - subX) / 80;

        // Helix Ribbon 1
        ctx.strokeStyle = '#818cf8';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#818cf8';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        for (let x = subX + 22; x <= qualX - 22; x += step) {
          const tNorm = (x - subX) / (qualX - subX);
          const yOff = Math.sin(tNorm * Math.PI * numTwists + time * 3) * (18 - pull * 0.15);
          if (x === subX + 22) ctx.moveTo(x, cy + yOff);
          else ctx.lineTo(x, cy + yOff);
        }
        ctx.stroke();

        // Helix Ribbon 2
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        for (let x = subX + 22; x <= qualX - 22; x += step) {
          const tNorm = (x - subX) / (qualX - subX);
          const yOff = -Math.sin(tNorm * Math.PI * numTwists + time * 3) * (18 - pull * 0.15);
          if (x === subX + 22) ctx.moveTo(x, cy + yOff);
          else ctx.lineTo(x, cy + yOff);
        }
        ctx.stroke();

        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔗 SAMAVĀYA · INSEPARABLE INHERENCE BOND', cx, height - 25);
        ctx.font = '8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#c7d2fe';
        ctx.fillText('Ayuta-Siddha (Permanent Entanglement · Will Never Snap)', cx, height - 12);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [
    selectedKey,
    dravyaMode,
    dravyaOrbitalSpeed,
    gunaRefraction,
    activeKarmaVector,
    samanyaCoherence,
    visesaZoom,
    samavayaTension,
  ]);

  return (
    <div className={`vl-padartha-holo-stage${compact ? ' is-compact' : ''}`}>
      {/* 1. Holographic Hexagonal Selector Tray */}
      <div className="vl-padartha-holo-nav" role="tablist">
        {PADARTHA_KEYS.map((pKey) => {
          const meta = PADARTHA_METAS[pKey];
          const isActive = selectedKey === pKey;
          return (
            <button
              key={pKey}
              type="button"
              className={`vl-padartha-holo-tab${isActive ? ' is-active' : ''}`}
              onClick={() => handleSelect(pKey)}
              style={{
                borderColor: isActive ? meta.color : undefined,
                boxShadow: isActive ? `0 0 16px ${meta.glowColor}` : undefined,
              }}
            >
              <span className="vl-holo-tab-icon">{meta.icon}</span>
              <div className="vl-holo-tab-labels">
                <span className="vl-holo-tab-dev">{meta.dev}</span>
                <span className="vl-holo-tab-iast">{meta.iast}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Main Visualizer Showcase Grid */}
      <div className="vl-padartha-showcase-grid">
        {/* Left: Dynamic 60fps Canvas Simulation */}
        <div className="vl-padartha-canvas-card">
          <div className="vl-padartha-canvas-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>{activeMeta.icon}</span>
              <span style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.9rem' }}>
                {activeMeta.dev} ({activeMeta.iast})
              </span>
            </div>
            <span
              className="vl-padartha-holo-tag"
              style={{ color: activeMeta.color, borderColor: activeMeta.glowColor }}
            >
              {activeMeta.badge}
            </span>
          </div>

          <div className="vl-padartha-canvas-viewport">
            <canvas
              ref={canvasRef}
              width={480}
              height={300}
              className="vl-padartha-canvas"
            />
          </div>

          {/* Interactive Sub-Control Dock according to active Padārtha */}
          <div className="vl-padartha-dock">
            {selectedKey === 'dravya' && (
              <div className="vl-dock-controls">
                <span className="vl-dock-label">Substrate Filter:</span>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {(['all', 'atomic', 'cosmic'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`vl-dock-btn${dravyaMode === m ? ' is-active' : ''}`}
                      onClick={() => setDravyaMode(m)}
                    >
                      {m === 'all' ? 'All 9 Substances' : m === 'atomic' ? '4 Atomic Elements' : '5 Cosmic Coordinates'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedKey === 'guna' && (
              <div className="vl-dock-controls">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.78rem' }}>
                  <span className="vl-dock-label">Prismatic Spectral Dispersion:</span>
                  <span style={{ color: '#ec4899', fontWeight: 700 }}>{gunaRefraction}° Refraction</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  value={gunaRefraction}
                  onChange={(e) => setGunaRefraction(parseInt(e.target.value, 10))}
                  className="br-range-slider"
                  style={{ accentColor: '#ec4899' }}
                />
              </div>
            )}

            {selectedKey === 'karma' && (
              <div className="vl-dock-controls">
                <span className="vl-dock-label">Fire Kinematic Vector:</span>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { id: 'utksepana', label: '↑ Utkṣepaṇa' },
                    { id: 'avaksepana', label: '↓ Avakṣepaṇa' },
                    { id: 'akuncana', label: '→← Ākuñcana' },
                    { id: 'prasarana', label: '←→ Prasāraṇa' },
                    { id: 'gamana', label: '⤹ Gamana' },
                  ].map((kv) => (
                    <button
                      key={kv.id}
                      type="button"
                      className={`vl-dock-btn${activeKarmaVector === kv.id ? ' is-active' : ''}`}
                      onClick={() => {
                        setActiveKarmaVector(kv.id as typeof activeKarmaVector);
                        soundEffects.playElectricZap();
                      }}
                    >
                      {kv.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedKey === 'samanya' && (
              <div className="vl-dock-controls">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.78rem' }}>
                  <span className="vl-dock-label">Universal Field Coherence (Jāti):</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>{samanyaCoherence}% Harmony</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={samanyaCoherence}
                  onChange={(e) => setSamanyaCoherence(parseInt(e.target.value, 10))}
                  className="br-range-slider"
                  style={{ accentColor: '#10b981' }}
                />
              </div>
            )}

            {selectedKey === 'visesa' && (
              <div className="vl-dock-controls">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.78rem' }}>
                  <span className="vl-dock-label">Quantum Scanner Magnification:</span>
                  <span style={{ color: '#a855f7', fontWeight: 700 }}>{visesaZoom.toFixed(1)}x Zoom</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.1"
                  value={visesaZoom}
                  onChange={(e) => setVisesaZoom(parseFloat(e.target.value))}
                  className="br-range-slider"
                  style={{ accentColor: '#a855f7' }}
                />
              </div>
            )}

            {selectedKey === 'samavaya' && (
              <div className="vl-dock-controls">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.78rem' }}>
                  <span className="vl-dock-label">Mechanical Pull Tension:</span>
                  <span style={{ color: '#6366f1', fontWeight: 700 }}>{samavayaTension}% Stretch (Unbreakable)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={samavayaTension}
                  onChange={(e) => setSamavayaTension(parseInt(e.target.value, 10))}
                  className="br-range-slider"
                  style={{ accentColor: '#6366f1' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Ontological Philosophy & Scientific Deep-Dive Card */}
        <div className="vl-padartha-info-card">
          <div className="vl-info-sutra-header">
            <span className="vl-info-sutra-badge">{activeMeta.sutraRef}</span>
            {onPronounce && (
              <button
                type="button"
                className="vl-word-pronounce-btn"
                onClick={() => onPronounce(activeMeta.dev)}
                style={{ fontSize: '0.76rem', padding: '0.2rem 0.55rem' }}
              >
                🔊 Pronounce <strong>{activeMeta.dev}</strong>
              </button>
            )}
          </div>

          <p className="vl-info-sanskrit-sutra">{activeMeta.sutra}</p>

          <div className="vl-info-section">
            <span className="vl-info-label">VAIŚEṢIKA PRINCIPLE</span>
            <p className="vl-info-text">{activeMeta.principle}</p>
          </div>

          <div className="vl-info-section" style={{ borderLeftColor: activeMeta.color }}>
            <span className="vl-info-label">MODERN SCIENTIFIC PARALLEL</span>
            <p className="vl-info-text" style={{ color: '#e0f2fe' }}>
              {activeMeta.modernParallel}
            </p>
          </div>

          <div className="vl-info-prompt-box">
            <span className="vl-prompt-icon">💡</span>
            <span className="vl-prompt-text">{activeMeta.interactivePrompt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PadarthaVisualizer;
