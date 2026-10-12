import React, { useState, useEffect, useRef, useId } from 'react';
import { soundEffects } from '../../utils/soundEffects';

export type Bhuta = 'prthivi' | 'ap' | 'tejas' | 'vayu';

interface BhutaReconstructorProps {
  initialBhuta?: Bhuta;
  onSelectBhuta?: (bhuta: Bhuta) => void;
  onBhutaMaterialized?: (bhuta: Bhuta) => void;
  onTryanukaForged?: (bhuta: Bhuta) => void;
  unlockedBhutas?: Record<Bhuta, boolean>;
  macroStock?: Record<Bhuta, number>;
}

interface BhutaProfile {
  id: Bhuta;
  name: string;
  sanskrit: string;
  icon: string;
  color: string;
  glowColor: string;
  r0: number; // Equilibrium bond distance in Angstroms
  epsilon: number; // Well depth in eV
  macroTitle: string;
  macroDesc: string;
  sensoryGuna: string;
  sensoryGunaSanskrit: string;
  sensoryOrgan: string;
  sensoryOrganSanskrit: string;
  baseDensity: number; // g/cm^3
  baseHardness: number; // Mohs scale
  latticeColor: string;
}

const BHUTA_PROFILES: Record<Bhuta, BhutaProfile> = {
  prthivi: {
    id: 'prthivi',
    name: 'Earth (Pṛthivī)',
    sanskrit: 'पार्थिव-द्रव्यम्',
    icon: '🪨',
    color: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.45)',
    r0: 1.54, // Covalent Si-O / C-C bond parallel
    epsilon: 4.8,
    macroTitle: 'Terracotta Silicate Crystal (पार्थिव-शिला)',
    macroDesc: 'Rigid, geometric 3D crystal lattice exhibiting smell (gandha) and high structural cohesion (khaṭinatva).',
    sensoryGuna: 'Smell (Gandha)',
    sensoryGunaSanskrit: 'गन्धवती पृथिवी',
    sensoryOrgan: 'Olfactory (Ghrāṇa / घ्राण)',
    sensoryOrganSanskrit: 'घ्राणेन्द्रियम्',
    baseDensity: 2.65,
    baseHardness: 7.0,
    latticeColor: '#f59e0b',
  },
  ap: {
    id: 'ap',
    name: 'Water (Ap)',
    sanskrit: 'आप्य-द्रव्यम्',
    icon: '💧',
    color: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    r0: 1.00, // O-H bond parallel
    epsilon: 3.5,
    macroTitle: 'Hydrodynamic Fluid Basin (आप्य-द्रव)',
    macroDesc: 'Viscous, tetrahedral hydrogen-bonded liquid matrix exhibiting taste (rasa), coldness (śītatva), and fluidity (dravatva).',
    sensoryGuna: 'Taste & Coldness (Rasa & Śītatva)',
    sensoryGunaSanskrit: 'रूपरसस्पर्शवत्य आपो द्रवाः स्निग्धाः',
    sensoryOrgan: 'Gustatory (Rasanā / रसना)',
    sensoryOrganSanskrit: 'रसनेन्द्रियम्',
    baseDensity: 1.00,
    baseHardness: 2.0,
    latticeColor: '#38bdf8',
  },
  tejas: {
    id: 'tejas',
    name: 'Fire (Tejas)',
    sanskrit: 'तैजस-द्रव्यम्',
    icon: '🔥',
    color: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.45)',
    r0: 1.21, // Double-bond / high-energy parallel
    epsilon: 5.6,
    macroTitle: 'Sacred Agni Plasma (तैजस-ज्वाला)',
    macroDesc: 'Luminous, high-energy electromagnetic plasma lattice exhibiting radiance (bhāsvara-rūpa) and thermal excitation (uṣṇatva).',
    sensoryGuna: 'Radiant Form & Heat (Rūpa & Uṣṇatva)',
    sensoryGunaSanskrit: 'स्पर्शवत् तेजः उष्णम्',
    sensoryOrgan: 'Visual (Cakṣus / चक्षुः)',
    sensoryOrganSanskrit: 'चक्षुरिन्द्रियम्',
    baseDensity: 0.15,
    baseHardness: 1.0,
    latticeColor: '#f97316',
  },
  vayu: {
    id: 'vayu',
    name: 'Air (Vāyu)',
    sanskrit: 'वायव्य-द्रव्यम्',
    icon: '🌬️',
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    r0: 1.10, // N-N triple bond parallel
    epsilon: 2.2,
    macroTitle: 'Atmospheric Aerogel & Vortex (वायव्य-चक्र)',
    macroDesc: 'Dynamic, high-mobility clathrate lattice exhibiting kinetic tactile impulse (aparisphuṭa-sparśa) and velocity.',
    sensoryGuna: 'Kinetic Touch & Mobility (Sparśa & Calatva)',
    sensoryGunaSanskrit: 'स्पर्शवान् वायुः अरूपः',
    sensoryOrgan: 'Tactile (Tvak / त्वक्)',
    sensoryOrganSanskrit: 'त्वगिन्द्रियम्',
    baseDensity: 0.0012,
    baseHardness: 0.5,
    latticeColor: '#a855f7',
  },
};

type LatticePacking = 'SC' | 'BCC' | 'FCC';

interface PackingInfo {
  type: LatticePacking;
  name: string;
  sanskrit: string;
  apf: number; // Atomic packing factor percentage
  coordinationNumber: number;
  hardnessMultiplier: number;
  densityMultiplier: number;
  desc: string;
}

const PACKING_MODES: Record<LatticePacking, PackingInfo> = {
  SC: {
    type: 'SC',
    name: 'Simple Cubic (SC)',
    sanskrit: 'सरल-घन-व्यूहः',
    apf: 52.4,
    coordinationNumber: 6,
    hardnessMultiplier: 0.65,
    densityMultiplier: 0.70,
    desc: 'Loose square coordination (π/6). Porous, lower cohesion (khaṭinatva), cleavage fractures easily.',
  },
  BCC: {
    type: 'BCC',
    name: 'Body-Centered Cubic (BCC)',
    sanskrit: 'अन्तर्क Gary-घन-व्यूहः',
    apf: 68.0,
    coordinationNumber: 8,
    hardnessMultiplier: 1.0,
    densityMultiplier: 1.0,
    desc: 'Intercalated central node (√3π/8). Balanced structural density, ductile bonding planes.',
  },
  FCC: {
    type: 'FCC',
    name: 'Face-Centered / Close-Packed (FCC/HCP)',
    sanskrit: 'फलक-केन्द्रित-व्यूहः',
    apf: 74.0,
    coordinationNumber: 12,
    hardnessMultiplier: 1.35,
    densityMultiplier: 1.30,
    desc: 'Maximum close-packing (π/(3√2)). Highest density, maximum cohesion, dense crystalline cleavage.',
  },
};

export const BhutaReconstructor: React.FC<BhutaReconstructorProps> = ({
  initialBhuta = 'prthivi',
  onSelectBhuta,
  onBhutaMaterialized,
  onTryanukaForged,
  unlockedBhutas = { prthivi: false, ap: false, tejas: false, vayu: false },
  macroStock = { prthivi: 0, ap: 0, tejas: 0, vayu: 0 },
}) => {
  const [activeBhuta, setActiveBhuta] = useState<Bhuta>(initialBhuta);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // SVG Unique Mask/Gradient IDs for strict isolation
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  // Step 1 States: Dimerization & Potential Well
  const [bondDistance, setBondDistance] = useState<number>(2.8); // Angstroms
  const [isDimerLocked, setIsDimerLocked] = useState<boolean>(false);

  // Step 2 States: Triadic Clustering & Light Scattering
  const [triadFoldingAngle, setTriadFoldingAngle] = useState<number>(15); // Degrees (0 to 60)
  const [triadClusterProximity, setTriadClusterProximity] = useState<number>(35); // Percentage (0 to 100)
  const [triadYawAngle, setTriadYawAngle] = useState<number>(30); // 3D View rotation
  const [isTriadLocked, setIsTriadLocked] = useState<boolean>(false);

  // Step 3 States: Lattice Ordering & Crystallization
  const [selectedPacking, setSelectedPacking] = useState<LatticePacking>('BCC');
  const [latticeRotation, setLatticeRotation] = useState<number>(25);
  const [isCrystallized, setIsCrystallized] = useState<boolean>(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);

  const profile = BHUTA_PROFILES[activeBhuta];
  const packing = PACKING_MODES[selectedPacking];

  // Canvas Refs
  const step1CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const step2CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const step3CanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Physics calculation: Lennard-Jones Potential V(r)
  const calculateLennardJones = (r: number, r0: number, eps: number) => {
    // sigma = r0 / (2^(1/6))
    const sigma = r0 / 1.122462;
    const ratio = sigma / Math.max(0.4, r);
    const r6 = Math.pow(ratio, 6);
    const r12 = r6 * r6;
    const potential = 4 * eps * (r12 - r6);
    // Force: F = -dV/dr
    const force = (24 * eps / Math.max(0.4, r)) * (2 * r12 - r6);
    return { potential, force };
  };

  const { potential: currentV, force: currentF } = calculateLennardJones(
    bondDistance,
    profile.r0,
    profile.epsilon
  );

  const isSweetSpot = Math.abs(bondDistance - profile.r0) <= 0.12;

  // Auto-reset locks when switching Bhūta
  const handleSelectBhuta = (bhuta: Bhuta) => {
    setActiveBhuta(bhuta);
    if (onSelectBhuta) onSelectBhuta(bhuta);
    const newProfile = BHUTA_PROFILES[bhuta];
    setBondDistance(newProfile.r0 + 1.2);
    setIsDimerLocked(false);
    setIsTriadLocked(false);
    setIsCrystallized(false);
    setShowCelebrationModal(false);
    setCurrentStep(1);
    soundEffects.playElementSummon(bhuta);
  };

  // ---------------------------------------------------------------------------
  // STEP 1 CANVAS: 1D Wave-Packet Collision & Lennard-Jones Energy Well
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (currentStep !== 1) return;
    const canvas = step1CanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animId: number;

    const render = () => {
      time += 0.04;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // UPPER HALF: Wave packets colliding along 1D X-axis
      const axisY = height * 0.28;
      const centerX = width * 0.5;

      // 1D Collision Vector Axis Line
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(25, axisY);
      ctx.lineTo(width - 25, axisY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Pixel distance mapped from Angstroms (0.6 Å -> 30px, 4.5 Å -> 240px)
      const pxSeparation = Math.max(35, Math.min(260, (bondDistance / 4.5) * 260));
      const leftX = centerX - pxSeparation / 2;
      const rightX = centerX + pxSeparation / 2;

      // Wave-packet probability ripples around atoms
      const waveColor = profile.color;
      [leftX, rightX].forEach((ax, idx) => {
        const dir = idx === 0 ? 1 : -1;
        ctx.save();
        ctx.strokeStyle = profile.glowColor;
        ctx.lineWidth = 1.5;
        for (let ring = 1; ring <= 3; ring++) {
          const rRadius = ring * 12 + Math.sin(time * 3 + ring) * 3;
          ctx.beginPath();
          ctx.arc(ax, axisY, rRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw de Broglie wave modulation on collision axis
        ctx.strokeStyle = waveColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let dx = -30; dx <= 30; dx += 2) {
          const waveEnv = Math.exp(-Math.pow(dx / 14, 2));
          const waveOsc = Math.sin((dx + time * dir * 15) * 0.45);
          const py = axisY + waveEnv * waveOsc * 14;
          if (dx === -30) ctx.moveTo(ax + dx, py);
          else ctx.lineTo(ax + dx, py);
        }
        ctx.stroke();

        // 0D Point-Charge / Atom Core
        const coreGradient = ctx.createRadialGradient(ax, axisY, 2, ax, axisY, 14);
        coreGradient.addColorStop(0, '#ffffff');
        coreGradient.addColorStop(0.3, waveColor);
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');

        ctx.fillStyle = coreGradient;
        ctx.shadowColor = waveColor;
        ctx.shadowBlur = isSweetSpot ? 25 : 12;
        ctx.beginPath();
        ctx.arc(ax, axisY, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Atom label (Paramāṇu 0D)
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`P${idx + 1} (0D)`, ax, axisY - 18);
        ctx.restore();
      });

      // Inter-atomic Force Vector Arrows or Resonant Bond
      if (isDimerLocked) {
        // Covalent bond cylinder / resonance link
        ctx.save();
        const bondGrad = ctx.createLinearGradient(leftX, axisY, rightX, axisY);
        bondGrad.addColorStop(0, profile.color);
        bondGrad.addColorStop(0.5, '#fef08a');
        bondGrad.addColorStop(1, profile.color);
        ctx.strokeStyle = bondGrad;
        ctx.lineWidth = 6;
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(leftX + 10, axisY);
        ctx.lineTo(rightX - 10, axisY);
        ctx.stroke();

        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`🔒 LOCKED DVYAṆUKA (r₀ = ${profile.r0}Å)`, centerX, axisY - 12);
        ctx.restore();
      } else {
        // Dynamic Force Arrows
        ctx.save();
        if (currentF > 0.5) {
          // Repulsive regime (Pushing apart)
          ctx.fillStyle = '#ef4444';
          ctx.strokeStyle = '#ef4444';
          ctx.font = 'bold 10px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('⚡ PAULI REPULSION (विद्वेष / अपकर्षण)', centerX, axisY + 22);

          // Force vectors pointing outward
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(leftX - 15, axisY);
          ctx.lineTo(leftX - 35, axisY);
          ctx.lineTo(leftX - 30, axisY - 4);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(rightX + 15, axisY);
          ctx.lineTo(rightX + 35, axisY);
          ctx.lineTo(rightX + 30, axisY - 4);
          ctx.stroke();
        } else if (currentF < -0.5) {
          // Attractive regime (Pulling together)
          ctx.fillStyle = '#38bdf8';
          ctx.strokeStyle = '#38bdf8';
          ctx.font = 'bold 10px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('🧲 VAN DER WAALS ATTRACTION (आकर्षण)', centerX, axisY + 22);

          // Force vectors pointing inward
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(leftX + 15, axisY);
          ctx.lineTo(leftX + 35, axisY);
          ctx.lineTo(leftX + 30, axisY - 4);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(rightX - 15, axisY);
          ctx.lineTo(rightX - 35, axisY);
          ctx.lineTo(rightX - 30, axisY - 4);
          ctx.stroke();
        } else {
          // Equilibrium sweet spot!
          ctx.fillStyle = '#4ade80';
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('✨ STABLE POTENTIAL WELL SWEETSPOT (संयोग-साम्यम्)', centerX, axisY + 24);
        }
        ctx.restore();
      }

      // LOWER HALF: Lennard-Jones Potential Curve V(r)
      const graphTop = height * 0.48;
      const graphBottom = height - 32;
      const graphLeft = 45;
      const graphRight = width - 25;
      const graphWidth = graphRight - graphLeft;
      const graphHeight = graphBottom - graphTop;

      // Coordinate axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // Y-axis
      ctx.moveTo(graphLeft, graphTop);
      ctx.lineTo(graphLeft, graphBottom);
      // Zero-energy baseline
      const zeroY = graphTop + graphHeight * 0.35;
      ctx.moveTo(graphLeft, zeroY);
      ctx.lineTo(graphRight, zeroY);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('+V', graphLeft - 6, graphTop + 10);
      ctx.fillText('0', graphLeft - 6, zeroY + 3);
      ctx.fillText('-ε', graphLeft - 6, graphBottom - 8);

      ctx.textAlign = 'center';
      ctx.fillText('Inter-atomic Distance r (Å) ➔', graphLeft + graphWidth / 2, height - 12);

      // Shaded Equilibrium Potential Well band
      const rToX = (r: number) => graphLeft + ((r - 0.6) / (4.5 - 0.6)) * graphWidth;
      const wellX1 = rToX(profile.r0 - 0.12);
      const wellX2 = rToX(profile.r0 + 0.12);

      ctx.fillStyle = 'rgba(74, 222, 128, 0.12)';
      ctx.fillRect(wellX1, graphTop, wellX2 - wellX1, graphHeight);
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.4)';
      ctx.setLineDash([2, 2]);
      ctx.strokeRect(wellX1, graphTop, wellX2 - wellX1, graphHeight);
      ctx.setLineDash([]);

      // Draw V(r) Curve
      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const yRange = profile.epsilon * 2.2;
      const vToY = (v: number) => {
        const clampedV = Math.max(-profile.epsilon * 1.3, Math.min(profile.epsilon * 1.5, v));
        return zeroY - (clampedV / yRange) * (graphHeight * 0.55);
      };

      let started = false;
      for (let r = 0.75; r <= 4.5; r += 0.05) {
        const { potential } = calculateLennardJones(r, profile.r0, profile.epsilon);
        const gx = rToX(r);
        const gy = vToY(potential);
        if (!started) {
          ctx.moveTo(gx, gy);
          started = true;
        } else {
          ctx.lineTo(gx, gy);
        }
      }
      ctx.stroke();
      ctx.restore();

      // Current operating point on the curve (Red/Green marker)
      const currentMarkerX = rToX(bondDistance);
      const currentMarkerY = vToY(currentV);

      ctx.save();
      ctx.fillStyle = isSweetSpot ? '#4ade80' : '#f59e0b';
      ctx.shadowColor = isSweetSpot ? '#4ade80' : '#f59e0b';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(currentMarkerX, currentMarkerY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Dropline to X-axis
      ctx.strokeStyle = isSweetSpot ? 'rgba(74, 222, 128, 0.5)' : 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(currentMarkerX, currentMarkerY);
      ctx.lineTo(currentMarkerX, zeroY);
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentStep, bondDistance, isDimerLocked, activeBhuta, isSweetSpot]);

  // ---------------------------------------------------------------------------
  // STEP 2 CANVAS: 3D Dyadic Clustering & Light Scattering Simulator
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (currentStep !== 2) return;
    const canvas = step2CanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animId: number;

    const render = () => {
      time += 0.035;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background ambient space
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Central chamber dimensions
      const centerX = width * 0.52;
      const centerY = height * 0.5;

      // SUNBEAM INCIDENT LIGHT: Enters from Left to Center
      // Sunbeam rays
      const beamY = centerY;
      const beamStartX = 0;
      const beamStopX = isTriadLocked ? centerX : width;

      // Incident ray glow
      const incidentGrad = ctx.createLinearGradient(beamStartX, beamY, beamStopX, beamY);
      incidentGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
      incidentGrad.addColorStop(0.7, 'rgba(253, 224, 71, 0.7)');
      incidentGrad.addColorStop(1, 'rgba(250, 204, 21, 0.4)');

      ctx.save();
      ctx.fillStyle = incidentGrad;
      // Incident light cone/beam
      ctx.beginPath();
      ctx.moveTo(beamStartX, beamY - 14);
      ctx.lineTo(beamStopX, beamY - 8);
      ctx.lineTo(beamStopX, beamY + 8);
      ctx.lineTo(beamStartX, beamY + 14);
      ctx.closePath();
      ctx.fill();

      // Photon wave packets streaming along incident beam
      for (let p = 0; p < 7; p++) {
        const px = ((time * 70 + p * 45) % beamStopX);
        const py = beamY + Math.sin(time * 6 + p) * 3;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // OPTICAL SCATTERING EFFECT: If 3D Triad is nucleated & locked!
      if (isTriadLocked) {
        // Rayleigh Scattering 360-degree radial golden bursts
        ctx.save();
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 20;

        const numRays = 16;
        for (let i = 0; i < numRays; i++) {
          const angle = (i * (Math.PI * 2)) / numRays + time * 0.3;
          const rayLen = 50 + Math.sin(time * 5 + i) * 25;
          const rx = centerX + Math.cos(angle) * rayLen;
          const ry = centerY + Math.sin(angle) * rayLen;

          const rayGrad = ctx.createLinearGradient(centerX, centerY, rx, ry);
          rayGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
          rayGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

          ctx.strokeStyle = rayGrad;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(rx, ry);
          ctx.stroke();
        }

        // Dancing Sunbeam Motes (Trasareṇu dust motes sparkling)
        for (let m = 0; m < 14; m++) {
          const mAngle = m * 2.4 + time * 0.4;
          const mDist = 20 + ((m * 19 + time * 25) % 95);
          const mx = centerX + Math.cos(mAngle) * mDist;
          const my = centerY + Math.sin(mAngle) * mDist;
          const mAlpha = Math.max(0, 1 - mDist / 95);

          ctx.fillStyle = `rgba(254, 243, 199, ${mAlpha})`;
          ctx.beginPath();
          ctx.arc(mx, my, 1.8 + Math.sin(m * 2 + time * 3) * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 3D TRIAD GEOMETRY: 3 Linear Dyads clustering into a Pyramid/Prism
      // Math: 3 dyads, each represented by 2 atoms (6 Paramāṇus total).
      // Clustering proximity: 0% = far apart, 100% = tight unit cell.
      // Folding angle: 0 deg = flat 2D plane (coplanar), 60 deg = 3D non-coplanar pyramid!

      const foldRad = (triadFoldingAngle * Math.PI) / 180;
      const yawRad = (triadYawAngle * Math.PI) / 180;
      const proxFactor = triadClusterProximity / 100;

      // Base radius of cluster
      const clusterR = 75 - proxFactor * 42; // Collapses from 75px to 33px
      const dyadLength = 28;

      // 3 Dyad Center Positions in 3D:
      // In 2D coplanar, all Z = 0.
      // As foldRad increases, the apex or dyad 3 lifts into Z-axis!
      const dyadAngles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

      ctx.save();
      ctx.translate(centerX, centerY);

      // Simple 3D to 2D isometric projection helper: (x, y, z) -> (screenX, screenY)
      const project3D = (x: number, y: number, z: number) => {
        // Rotate around Y-axis by yawRad
        const rx = x * Math.cos(yawRad) - z * Math.sin(yawRad);
        const rz = x * Math.sin(yawRad) + z * Math.cos(yawRad);
        // Tilt perspective slightly (30 deg pitch)
        const screenX = rx;
        const screenY = y * 0.86 - rz * 0.5;
        return { x: screenX, y: screenY, depth: rz };
      };

      // Calculate each dyad's 2 atoms
      interface AtomPoint {
        x: number;
        y: number;
        z: number;
        dyadIdx: number;
      }
      const atoms: AtomPoint[] = [];

      dyadAngles.forEach((baseAngle, dIdx) => {
        // Elevation of dyad in 3D based on folding angle
        let cx = Math.cos(baseAngle) * clusterR;
        let cy = Math.sin(baseAngle) * clusterR;
        let cz = 0;

        if (dIdx === 2) {
          // Third dyad elevates out of the 2D plane!
          cz = Math.sin(foldRad) * (55 * proxFactor);
          cy = cy * Math.cos(foldRad);
        }

        // Dyad orientation vector
        const tangent = baseAngle + Math.PI / 2;
        const dx = Math.cos(tangent) * (dyadLength / 2);
        const dy = Math.sin(tangent) * (dyadLength / 2);

        atoms.push({ x: cx - dx, y: cy - dy, z: cz, dyadIdx: dIdx });
        atoms.push({ x: cx + dx, y: cy + dy, z: cz, dyadIdx: dIdx });
      });

      // Render Dyad Internal Bonds
      for (let d = 0; d < 3; d++) {
        const a1 = atoms[d * 2];
        const a2 = atoms[d * 2 + 1];
        const p1 = project3D(a1.x, a1.y, a1.z);
        const p2 = project3D(a2.x, a2.y, a2.z);

        ctx.strokeStyle = profile.color;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // If cluster is tightening, render Inter-Dyadic Clustered Struts (Pracaya Bonds)
      if (proxFactor > 0.4) {
        ctx.strokeStyle = isTriadLocked ? '#fde047' : 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = isTriadLocked ? 2 : 1;
        ctx.setLineDash(isTriadLocked ? [] : [3, 3]);

        // Connect midpoints of dyads
        const mids = [0, 1, 2].map((d) => {
          const a1 = atoms[d * 2];
          const a2 = atoms[d * 2 + 1];
          return project3D((a1.x + a2.x) / 2, (a1.y + a2.y) / 2, (a1.z + a2.z) / 2);
        });

        ctx.beginPath();
        ctx.moveTo(mids[0].x, mids[0].y);
        ctx.lineTo(mids[1].x, mids[1].y);
        ctx.lineTo(mids[2].x, mids[2].y);
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Render 6 Atoms (Paramāṇu nodes) sorted by depth
      const projectedAtoms = atoms.map((a, i) => ({
        ...project3D(a.x, a.y, a.z),
        id: i,
        dyadIdx: a.dyadIdx,
      }));
      projectedAtoms.sort((a, b) => a.depth - b.depth);

      projectedAtoms.forEach((pa) => {
        const atomGrad = ctx.createRadialGradient(pa.x, pa.y, 1, pa.x, pa.y, 9);
        atomGrad.addColorStop(0, '#ffffff');
        atomGrad.addColorStop(0.4, profile.color);
        atomGrad.addColorStop(1, '#000000');

        ctx.fillStyle = atomGrad;
        ctx.shadowColor = profile.color;
        ctx.shadowBlur = isTriadLocked ? 14 : 6;
        ctx.beginPath();
        ctx.arc(pa.x, pa.y, 7.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();

      // Status text banner at top of canvas
      ctx.fillStyle = isTriadLocked ? '#fef08a' : '#cbd5e1';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      if (isTriadLocked) {
        ctx.fillText('✨ TRYAṆUKA FORMED: Rayleigh Optical Scattering ACTIVE (3D Mahatva)!', 15, 22);
      } else if (triadFoldingAngle < 40) {
        ctx.fillText('⚠️ COPALANAR 2D SHEET: Zero Depth (Z=0). Photons pass unscattered!', 15, 22);
      } else {
        ctx.fillText('📐 3D SPATIAL EXTENSION EMERGING: Increase proximity to bind unit cell!', 15, 22);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentStep, triadFoldingAngle, triadClusterProximity, triadYawAngle, isTriadLocked, activeBhuta]);

  // ---------------------------------------------------------------------------
  // STEP 3 CANVAS: 3D Isometric Periodic Crystal Lattice Visualizer
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (currentStep !== 3) return;
    const canvas = step3CanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animId: number;

    const render = () => {
      time += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.52;

      // Dynamic rotation angle from slider + gentle idle oscillation
      const totalRot = ((latticeRotation + Math.sin(time * 0.4) * 6) * Math.PI) / 180;
      const pitchRad = (32 * Math.PI) / 180;

      // Project 3D point (x, y, z) into isometric screen coordinates
      const project = (x: number, y: number, z: number) => {
        // Y-axis rotation
        const rx = x * Math.cos(totalRot) - z * Math.sin(totalRot);
        const rz = x * Math.sin(totalRot) + z * Math.cos(totalRot);
        // Pitch rotation
        const ry = y * Math.cos(pitchRad) - rz * Math.sin(pitchRad);
        const finalZ = y * Math.sin(pitchRad) + rz * Math.cos(pitchRad);

        return {
          px: centerX + rx,
          py: centerY + ry,
          depth: finalZ,
        };
      };

      // Build 3x3x3 Periodic Lattice Nodes
      // Spacing based on APF and active profile
      const spacing = 46;
      interface LatticeNode {
        x: number;
        y: number;
        z: number;
        isFace?: boolean;
        isCenter?: boolean;
      }
      const nodes: LatticeNode[] = [];

      // 1. Primitive Simple Cubic Corner Nodes (-1, 0, 1)
      for (let ix = -1; ix <= 1; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          for (let iz = -1; iz <= 1; iz++) {
            nodes.push({ x: ix * spacing, y: iy * spacing, z: iz * spacing });
          }
        }
      }

      // 2. Add Center Nodes for BCC (8 body centers)
      if (selectedPacking === 'BCC') {
        [-0.5, 0.5].forEach((cx) => {
          [-0.5, 0.5].forEach((cy) => {
            [-0.5, 0.5].forEach((cz) => {
              nodes.push({
                x: cx * spacing,
                y: cy * spacing,
                z: cz * spacing,
                isCenter: true,
              });
            });
          });
        });
      }

      // 3. Add Face Nodes for FCC
      if (selectedPacking === 'FCC') {
        for (let ix = -0.5; ix <= 0.5; ix += 1) {
          for (let iy = -0.5; iy <= 0.5; iy += 1) {
            [-1, 0, 1].forEach((iz) => {
              nodes.push({ x: ix * spacing, y: iy * spacing, z: iz * spacing, isFace: true });
            });
          }
        }
      }

      // Sort nodes by depth for correct 3D occluded rendering
      const projectedNodes = nodes.map((n, idx) => ({
        ...project(n.x, n.y, n.z),
        node: n,
        id: idx,
      }));
      projectedNodes.sort((a, b) => a.depth - b.depth);

      // Render Crystalline Struts / Bonds
      ctx.save();
      ctx.strokeStyle = profile.glowColor;
      ctx.lineWidth = 1.2;

      // Draw grid bonds between adjacent cubic corners
      for (let ix = -1; ix <= 1; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          for (let iz = -1; iz <= 1; iz++) {
            const p1 = project(ix * spacing, iy * spacing, iz * spacing);
            // X-bond
            if (ix < 1) {
              const p2 = project((ix + 1) * spacing, iy * spacing, iz * spacing);
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.stroke();
            }
            // Y-bond
            if (iy < 1) {
              const p2 = project(ix * spacing, (iy + 1) * spacing, iz * spacing);
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.stroke();
            }
            // Z-bond
            if (iz < 1) {
              const p2 = project(ix * spacing, iy * spacing, (iz + 1) * spacing);
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.stroke();
            }
          }
        }
      }
      ctx.restore();

      // Render Nodes (Tryaṇuka unit cells in lattice)
      projectedNodes.forEach((pn) => {
        ctx.save();
        const radius = pn.node.isCenter ? 6.5 : pn.node.isFace ? 5.5 : 7;
        const grad = ctx.createRadialGradient(pn.px, pn.py, 1, pn.px, pn.py, radius);

        if (pn.node.isCenter) {
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.5, '#fde047');
          grad.addColorStop(1, '#ca8a04');
        } else if (pn.node.isFace) {
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.5, '#38bdf8');
          grad.addColorStop(1, '#0284c7');
        } else {
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.4, profile.latticeColor);
          grad.addColorStop(1, '#090e17');
        }

        ctx.fillStyle = grad;
        ctx.shadowColor = profile.color;
        ctx.shadowBlur = isCrystallized ? 12 : 5;
        ctx.beginPath();
        ctx.arc(pn.px, pn.py, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Ambient crystal energy shimmer if crystallized
      if (isCrystallized) {
        ctx.save();
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, 130 + Math.sin(time * 3) * 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentStep, selectedPacking, latticeRotation, isCrystallized, activeBhuta]);

  // ---------------------------------------------------------------------------
  // Action Handlers
  // ---------------------------------------------------------------------------
  const handleLockDimer = () => {
    if (!isSweetSpot) return;
    setIsDimerLocked(true);
    soundEffects.playPuzzleSnap();
    soundEffects.playSuccessDing();
  };

  const handleLockTriad = () => {
    if (triadFoldingAngle < 45 || triadClusterProximity < 70) return;
    setIsTriadLocked(true);
    soundEffects.playTrasarenuChime();
    soundEffects.playSuccessDing();
  };

  const handleCrystallize = () => {
    setIsCrystallized(true);
    setShowCelebrationModal(true);
    soundEffects.playCelebrationChime();
    if (onTryanukaForged) onTryanukaForged(activeBhuta);
    if (onBhutaMaterialized) onBhutaMaterialized(activeBhuta);
  };

  const handleResetCurrentBhuta = () => {
    setIsDimerLocked(false);
    setIsTriadLocked(false);
    setIsCrystallized(false);
    setShowCelebrationModal(false);
    setBondDistance(profile.r0 + 1.2);
    setTriadFoldingAngle(15);
    setTriadClusterProximity(35);
    setCurrentStep(1);
    soundEffects.playSteamHiss();
  };

  // Calculated Real-Time Macroscopic Properties in Step 3
  const calculatedHardness = (profile.baseHardness * packing.hardnessMultiplier).toFixed(1);
  const calculatedDensity = (profile.baseDensity * packing.densityMultiplier).toFixed(2);

  return (
    <section className="vl-reconstructor-panel" aria-label="Rigorous 3-Step Bhoota Reconstructor">
      {/* 1. Header with Bhūta Selector */}
      <div className="vl-reconstructor-header">
        <div>
          <h3 className="vl-reconstructor-title">
            <span>🏗️ BHOOTA RECONSTRUCTOR (स्थूल-द्रव्य-निर्माणम्)</span>
          </h3>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
            The Rigorous 3-Step Construction: Paramāṇu (0D) ➔ Dvyaṇuka (1D) ➔ Tryaṇuka (3D) ➔ Macroscopic Bhūta!
          </p>
        </div>

        {/* 4 Physical Bhūtas Selector */}
        <div className="vl-reconstructor-tabs" role="tablist">
          {(['prthivi', 'ap', 'tejas', 'vayu'] as Bhuta[]).map((bKey) => {
            const bProf = BHUTA_PROFILES[bKey];
            const isSelected = activeBhuta === bKey;
            const isUnlocked = unlockedBhutas[bKey] || macroStock[bKey] >= 3;
            return (
              <button
                key={bKey}
                type="button"
                className={`vl-reconstructor-tab${isSelected ? ' is-active' : ''}`}
                onClick={() => handleSelectBhuta(bKey)}
                style={{
                  borderColor: isSelected ? bProf.color : undefined,
                  boxShadow: isSelected ? `0 0 12px ${bProf.glowColor}` : undefined,
                }}
              >
                <span>{bProf.icon} {bProf.name}</span>
                {isUnlocked && <span style={{ marginLeft: '4px', fontSize: '0.75rem' }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Visual 3-Step Pipeline Stepper */}
      <div className="br-stepper-nav">
        {/* Step 1 Tab */}
        <button
          type="button"
          className={`br-step-tab${currentStep === 1 ? ' is-active' : ''}${isDimerLocked ? ' is-completed' : ''}`}
          onClick={() => setCurrentStep(1)}
        >
          <div className="br-step-number">1</div>
          <div className="br-step-label-group">
            <span className="br-step-subtext">Dvyaṇuka-Siddhi (0D ➔ 1D)</span>
            <span className="br-step-title">1. Binary Dimerization</span>
          </div>
          {isDimerLocked && <span className="br-step-badge">LOCKED ✓</span>}
        </button>

        <div className="br-stepper-connector" />

        {/* Step 2 Tab */}
        <button
          type="button"
          className={`br-step-tab${currentStep === 2 ? ' is-active' : ''}${isTriadLocked ? ' is-completed' : ''}`}
          onClick={() => setCurrentStep(2)}
        >
          <div className="br-step-number">2</div>
          <div className="br-step-label-group">
            <span className="br-step-subtext">Tryaṇuka-Emergence (3D Volume)</span>
            <span className="br-step-title">2. Triadic Clustering & Light</span>
          </div>
          {isTriadLocked && <span className="br-step-badge">LOCKED ✓</span>}
        </button>

        <div className="br-stepper-connector" />

        {/* Step 3 Tab */}
        <button
          type="button"
          className={`br-step-tab${currentStep === 3 ? ' is-active' : ''}${isCrystallized ? ' is-completed' : ''}`}
          onClick={() => setCurrentStep(3)}
        >
          <div className="br-step-number">3</div>
          <div className="br-step-label-group">
            <span className="br-step-subtext">Pracaya-Viśeṣa (Macro Solid)</span>
            <span className="br-step-title">3. Lattice Ordering & Guṇas</span>
          </div>
          {isCrystallized && <span className="br-step-badge">MANIFESTED ✓</span>}
        </button>
      </div>

      {/* 3. STEP CONTENT SECTIONS */}

      {/* =====================================================================
          STEP 1: BINARY CONJUNCTION & DIMERIZATION (Dvyaṇuka-Siddhi)
          ===================================================================== */}
      {currentStep === 1 && (
        <div className="br-stage-container">
          {/* Canvas Viewport: Wave-Packet Collision & Lennard-Jones Graph */}
          <div className="br-canvas-column">
            <div className="br-canvas-card">
              <div className="br-canvas-header">
                <span>⚡ WAVE-PACKET COLLISION & LENNARD-JONES POTENTIAL WELL</span>
                <span className="br-canvas-badge">1D Vector Collision Axis</span>
              </div>
              <div className="br-canvas-wrapper">
                <canvas
                  ref={step1CanvasRef}
                  width={480}
                  height={320}
                  className="br-canvas"
                />
              </div>
              <div className="br-canvas-footer">
                <span>Target Bond Distance: <strong>r₀ = {profile.r0} Å</strong></span>
                <span>Current Distance: <strong>{bondDistance.toFixed(2)} Å</strong></span>
              </div>
            </div>
          </div>

          {/* Interactive Controls & Philosophy Column */}
          <div className="br-controls-column">
            {/* Vaiśeṣika Philosophical Principle Card */}
            <div className="br-sutra-box">
              <div className="br-sutra-badge">VAIŚEṢIKA SŪTRA 4.1.2 & 7.1.9</div>
              <p className="br-sutra-sanskrit">
                कारणगुणपूर्वकः कार्यगुणो दृष्टः ॥ द्व्यणुके अणुत्वं ह्रस्वत्वं च ॥
              </p>
              <p className="br-sutra-desc">
                <strong>The Principle:</strong> Two indivisible, zero-dimensional Paramāṇus undergo localized
                conjunction (<em>Saṁyoga</em>) propelled by kinetic impulse (<em>Karma</em>). The resulting Dyad
                (<em>Dvyaṇuka</em>) possesses minuteness (<em>Aṇutva</em>) and linear length (<em>Hrasvatva</em>),
                yet remains entirely <strong>imperceptible (Atīndriya)</strong> because it lacks 3D spatial depth.
              </p>
            </div>

            {/* Potential Well Slider Controls */}
            <div className="br-control-panel">
              <div className="br-slider-row">
                <div className="br-slider-labels">
                  <span className="br-slider-title">📏 Inter-atomic Distance (r)</span>
                  <span className="br-slider-val" style={{ color: isSweetSpot ? '#4ade80' : '#f59e0b' }}>
                    {bondDistance.toFixed(2)} Å ({(bondDistance * 100).toFixed(0)} pm)
                  </span>
                </div>
                <input
                  type="range"
                  min="0.75"
                  max="4.20"
                  step="0.02"
                  value={bondDistance}
                  disabled={isDimerLocked}
                  onChange={(e) => setBondDistance(parseFloat(e.target.value))}
                  className="br-range-slider"
                  style={{ accentColor: profile.color }}
                />
                <div className="br-slider-ticks">
                  <span>0.75 Å (Repulsion)</span>
                  <span style={{ color: '#4ade80', fontWeight: 700 }}>Well Minimum: {profile.r0} Å</span>
                  <span>4.20 Å (Unbound)</span>
                </div>
              </div>

              {/* Dynamic Real-time Readings */}
              <div className="br-metrics-grid">
                <div className="br-metric-card">
                  <span className="br-metric-label">Potential Energy V(r)</span>
                  <span className="br-metric-val" style={{ color: currentV < 0 ? '#38bdf8' : '#ef4444' }}>
                    {currentV.toFixed(2)} eV
                  </span>
                </div>
                <div className="br-metric-card">
                  <span className="br-metric-label">Force Regime</span>
                  <span className="br-metric-val" style={{ color: isSweetSpot ? '#4ade80' : currentF > 0 ? '#ef4444' : '#38bdf8' }}>
                    {isSweetSpot ? 'Equilibrium (F ≈ 0)' : currentF > 0 ? 'Repulsive (+F)' : 'Attractive (-F)'}
                  </span>
                </div>
                <div className="br-metric-card">
                  <span className="br-metric-label">Dimensionality</span>
                  <span className="br-metric-val" style={{ color: '#a855f7' }}>
                    {isDimerLocked ? '1D Linear (Hrasvatva)' : '0D Point Packets'}
                  </span>
                </div>
                <div className="br-metric-card">
                  <span className="br-metric-label">Perceptibility</span>
                  <span className="br-metric-val" style={{ color: '#94a3b8' }}>
                    👁️ Atīndriya (Imperceptible)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="br-actions-row">
                {!isDimerLocked ? (
                  <button
                    type="button"
                    className="vl-btn vl-btn--cyber br-lock-btn"
                    disabled={!isSweetSpot}
                    onClick={handleLockDimer}
                    style={{
                      opacity: isSweetSpot ? 1 : 0.6,
                      background: isSweetSpot
                        ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
                        : undefined,
                    }}
                  >
                    {isSweetSpot
                      ? '🔒 Lock Covalent Dyad (द्व्यणुक-संयोग)'
                      : `Tune Distance into Well (${(profile.r0 - 0.12).toFixed(2)}–${(profile.r0 + 0.12).toFixed(2)} Å)`}
                  </button>
                ) : (
                  <div className="br-success-banner">
                    <div>
                      <strong style={{ color: '#86efac' }}>✓ Dvyaṇuka Successfully Locked!</strong>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1' }}>
                        1D Dimerized pair established. Proceed to Step 2 to cluster 3 Dyads into a 3D Triad.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="vl-btn vl-btn--cyber"
                      onClick={() => setCurrentStep(2)}
                      style={{ padding: '0.45rem 1rem', fontSize: '0.84rem' }}
                    >
                      Proceed to Step 2 ➔
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          STEP 2: TRIADIC CLUSTERING & SPATIAL DIMENSIONALITY (Tryaṇuka-Emergence)
          ===================================================================== */}
      {currentStep === 2 && (
        <div className="br-stage-container">
          {/* Canvas Viewport: 3D Triadic Geometry & Optical Scattering */}
          <div className="br-canvas-column">
            <div className="br-canvas-card">
              <div className="br-canvas-header">
                <span>☀️ INCIDENT SUNBEAM & 3D RAYLEIGH OPTICAL SCATTERING</span>
                <span className="br-canvas-badge">
                  {isTriadLocked ? '🌟 Optical Scattering Active' : '👁️ Photons Unscattered'}
                </span>
              </div>
              <div className="br-canvas-wrapper">
                <canvas
                  ref={step2CanvasRef}
                  width={480}
                  height={320}
                  className="br-canvas"
                />
              </div>
              <div className="br-canvas-footer">
                <span>Cross-Section: <strong>{isTriadLocked ? '96% Rayleigh' : '0% (Transparent)'}</strong></span>
                <span>Geometry: <strong>{triadFoldingAngle >= 45 ? '3D Non-Coplanar' : '2D Planar Sheet'}</strong></span>
              </div>
            </div>
          </div>

          {/* Interactive Controls & Spatial Geometry Column */}
          <div className="br-controls-column">
            {/* Vaiśeṣika Philosophical Principle Card */}
            <div className="br-sutra-box">
              <div className="br-sutra-badge">VAIŚEṢIKA SŪTRA 7.1.10 & 4.1.6</div>
              <p className="br-sutra-sanskrit">
                महत्त्वात् चाक्षुषम् ॥ जालसूर्यमरीचिस्थं त्रसरेणुं प्रचक्षते ॥
              </p>
              <p className="br-sutra-desc">
                <strong>The Principle:</strong> Three Dvyaṇukas cluster in a non-coplanar spatial arrangement
                (<em>Pracaya</em>) to synthesize a Triad (<em>Tryaṇuka</em> or <em>Trasareṇu</em>).
                This introduces <strong>magnitude (Mahatva)</strong> and 3D spatial volume, breaking the threshold
                of visibility where light waves finally scatter, appearing as a dancing mote in a sunbeam!
              </p>
            </div>

            {/* The Trasareṇu: The Epistemic Bridge to Perception */}
            <div className="br-epistemic-bridge-box">
              <div className="br-epistemic-bridge-badge">
                EPISTEMIC BRIDGE · महर्षि-कणादः
              </div>
              <h4 className="br-epistemic-bridge-title">
                ☀️ The Trasareṇu: The Epistemic Bridge to Perception
              </h4>
              <div className="br-epistemic-bridge-sub">
                Sage Kaṇāda (महर्षि-कणादः) · वैशेषिक-दर्शनम्
              </div>
              <p className="br-epistemic-bridge-lead">
                Kaṇāda recognized that human senses cannot perceive a zero-dimensional point (Paramāṇu) or a two-dimensional linear link (Dvyaṇuka). The transition from abstract mathematics to observable physical reality requires a structural threshold:
              </p>
              <div className="br-epistemic-bridge-bullets">
                <div className="br-epistemic-bridge-bullet">
                  <span className="br-ebb-icon">📐</span>
                  <div>
                    <strong>The Leap to Magnitude (Mahatva): </strong>
                    <span>A single Paramāṇu has zero dimension. A Dvyaṇuka (dyad) possesses length but zero volume. Only when three dyads cluster into a triad (Tryaṇuka / Trasareṇu) does three-dimensional spatial volume suddenly emerge.</span>
                  </div>
                </div>
                <div className="br-epistemic-bridge-bullet">
                  <span className="br-ebb-icon">☀️</span>
                  <div>
                    <strong>The Light-Scattering Criterion: </strong>
                    <span>Kaṇāda observed the microscopic dust motes dancing in shafts of sunlight passing through a lattice window. He deduced that this mote is the absolute smallest unit of visible matter.</span>
                  </div>
                </div>
                <div className="br-epistemic-bridge-bullet">
                  <span className="br-ebb-icon">🔬</span>
                  <div>
                    <strong>The Modern Parallel: </strong>
                    <span>This is the exact physical threshold of Rayleigh and Mie Scattering. An object smaller than the wavelength of visible light cannot reflect or scatter photons; it remains invisible. The Trasareṇu represents the exact cluster size where matter finally interacts with electromagnetic waves.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Geometry Puzzle Controls */}
            <div className="br-control-panel">
              {/* Slider 1: Folding Angle out of 2D plane */}
              <div className="br-slider-row">
                <div className="br-slider-labels">
                  <span className="br-slider-title">📐 Spatial Folding Angle (Non-Coplanar θ)</span>
                  <span className="br-slider-val" style={{ color: triadFoldingAngle >= 45 ? '#4ade80' : '#f59e0b' }}>
                    {triadFoldingAngle}° {triadFoldingAngle >= 45 ? '(3D Trigonal Pyramid)' : '(2D Flat Plane)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="1"
                  value={triadFoldingAngle}
                  disabled={isTriadLocked}
                  onChange={(e) => setTriadFoldingAngle(parseInt(e.target.value, 10))}
                  className="br-range-slider"
                  style={{ accentColor: '#38bdf8' }}
                />
              </div>

              {/* Slider 2: Cluster Nucleation Proximity */}
              <div className="br-slider-row">
                <div className="br-slider-labels">
                  <span className="br-slider-title">🧲 Cluster Cohesion & Packing Proximity</span>
                  <span className="br-slider-val" style={{ color: triadClusterProximity >= 70 ? '#4ade80' : '#f59e0b' }}>
                    {triadClusterProximity}% {triadClusterProximity >= 70 ? '(Nucleated Unit Cell)' : '(Dispersed)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={triadClusterProximity}
                  disabled={isTriadLocked}
                  onChange={(e) => setTriadClusterProximity(parseInt(e.target.value, 10))}
                  className="br-range-slider"
                  style={{ accentColor: profile.color }}
                />
              </div>

              {/* Slider 3: 3D Orbit / Perspective Yaw */}
              <div className="br-slider-row">
                <div className="br-slider-labels">
                  <span className="br-slider-title">🔄 3D Viewpoint Orbit (Yaw)</span>
                  <span className="br-slider-val" style={{ color: '#cbd5e1' }}>
                    {triadYawAngle}°
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="2"
                  value={triadYawAngle}
                  onChange={(e) => setTriadYawAngle(parseInt(e.target.value, 10))}
                  className="br-range-slider"
                />
              </div>

              {/* Dynamic Real-time Readings */}
              <div className="br-metrics-grid">
                <div className="br-metric-card">
                  <span className="br-metric-label">Spatial Volume (Mahatva)</span>
                  <span className="br-metric-val" style={{ color: triadFoldingAngle >= 45 ? '#4ade80' : '#ef4444' }}>
                    {triadFoldingAngle >= 45 ? '1.48 nm³ (V > 0)' : '0.00 nm³ (Flat 2D)'}
                  </span>
                </div>
                <div className="br-metric-card">
                  <span className="br-metric-label">Optical Scattering (σ)</span>
                  <span className="br-metric-val" style={{ color: isTriadLocked ? '#fef08a' : '#94a3b8' }}>
                    {isTriadLocked ? '96% (Rayleigh active)' : '0% (Transparent)'}
                  </span>
                </div>
                <div className="br-metric-card">
                  <span className="br-metric-label">Particle State</span>
                  <span className="br-metric-val" style={{ color: isTriadLocked ? '#86efac' : '#cbd5e1' }}>
                    {isTriadLocked ? '☀️ Tryaṇuka / Trasareṇu' : '3 × Unbound Dvyaṇukas'}
                  </span>
                </div>
                <div className="br-metric-card">
                  <span className="br-metric-label">Sunbeam Mote Visibility</span>
                  <span className="br-metric-val" style={{ color: isTriadLocked ? '#fde047' : '#94a3b8' }}>
                    {isTriadLocked ? '👁️ Perceptible (चाक्षुष)' : 'Atīndriya (Imperceptible)'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="br-actions-row">
                {!isTriadLocked ? (
                  <button
                    type="button"
                    className="vl-btn vl-btn--cyber br-lock-btn"
                    disabled={triadFoldingAngle < 45 || triadClusterProximity < 70}
                    onClick={handleLockTriad}
                    style={{
                      opacity: triadFoldingAngle >= 45 && triadClusterProximity >= 70 ? 1 : 0.6,
                      background:
                        triadFoldingAngle >= 45 && triadClusterProximity >= 70
                          ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                          : undefined,
                    }}
                  >
                    {triadFoldingAngle >= 45 && triadClusterProximity >= 70
                      ? '☀️ Awaken Tryaṇuka in Sunbeam (त्रसरेणु-प्रकाशन)'
                      : 'Fold into 3D (θ ≥ 45°) & Increase Proximity (≥ 70%)'}
                  </button>
                ) : (
                  <div className="br-success-banner">
                    <div>
                      <strong style={{ color: '#fef08a' }}>✓ 3D Tryaṇuka Emergence Complete!</strong>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1' }}>
                        Magnitude (Mahatva) achieved. Light waves scatter off the dancing sunbeam mote. Proceed to Step 3.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="vl-btn vl-btn--cyber"
                      onClick={() => setCurrentStep(3)}
                      style={{ padding: '0.45rem 1rem', fontSize: '0.84rem' }}
                    >
                      Proceed to Step 3 ➔
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          STEP 3: LATTICE ORDERING & STRUCTURAL MANIFESTATION (Bhūta-Crystallization)
          ===================================================================== */}
      {currentStep === 3 && (
        <div className="br-stage-container">
          {/* Canvas Viewport: 3D Isometric Crystal Lattice */}
          <div className="br-canvas-column">
            <div className="br-canvas-card">
              <div className="br-canvas-header">
                <span>💎 3D ISOMETRIC PERIODIC CRYSTAL LATTICE NETWORK</span>
                <span className="br-canvas-badge">
                  {packing.name} · APF {packing.apf}%
                </span>
              </div>
              <div className="br-canvas-wrapper">
                <canvas
                  ref={step3CanvasRef}
                  width={480}
                  height={320}
                  className="br-canvas"
                />
              </div>
              <div className="br-canvas-footer">
                <span>Coordination Number: <strong>CN = {packing.coordinationNumber}</strong></span>
                <span>Calculated Hardness: <strong>{calculatedHardness} Mohs</strong></span>
              </div>
            </div>
          </div>

          {/* Interactive Controls & Crystallization Column */}
          <div className="br-controls-column">
            {/* Vaiśeṣika Philosophical Principle Card */}
            <div className="br-sutra-box">
              <div className="br-sutra-badge">VAIŚEṢIKA SŪTRA 4.1.7 & 2.2.1</div>
              <p className="br-sutra-sanskrit">
                प्रचयविशेषात् स्थूलद्रव्योत्पत्तिः ॥ तत्र गन्धवती पृथिवी ॥
              </p>
              <p className="br-sutra-desc">
                <strong>The Principle:</strong> Billions of Tryaṇukas undergo macroscopic arrangement (<em>Pracaya-Viśeṣa</em>).
                The specific crystal packing dictates structural density and triggers the emergence of the element's definitive sensory signature
                (<strong>{profile.sensoryGuna}</strong>). Individual atoms do not possess smell or taste—sensory qualities
                are collective macroscopic emergent phenomena of long-range periodic order!
              </p>
            </div>

            {/* Lattice Packing Factor Selector */}
            <div className="br-control-panel">
              <span className="br-slider-title" style={{ marginBottom: '0.5rem', display: 'block' }}>
                🧱 Atomic Packing Factor (APF) & Space Group Selector:
              </span>
              <div className="br-packing-selector">
                {(['SC', 'BCC', 'FCC'] as LatticePacking[]).map((pKey) => {
                  const pMode = PACKING_MODES[pKey];
                  const isSelected = selectedPacking === pKey;
                  return (
                    <button
                      key={pKey}
                      type="button"
                      className={`br-packing-btn${isSelected ? ' is-active' : ''}`}
                      onClick={() => {
                        setSelectedPacking(pKey);
                        soundEffects.playPuzzleSnap();
                      }}
                      style={{
                        borderColor: isSelected ? profile.color : undefined,
                      }}
                    >
                      <div className="br-packing-header">
                        <strong>{pMode.name}</strong>
                        <span className="br-apf-tag">{pMode.apf}%</span>
                      </div>
                      <p className="br-packing-desc">{pMode.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Lattice View Rotation Slider */}
              <div className="br-slider-row" style={{ marginTop: '0.75rem' }}>
                <div className="br-slider-labels">
                  <span className="br-slider-title">🔄 Isometric Lattice Rotation</span>
                  <span className="br-slider-val">{latticeRotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="2"
                  value={latticeRotation}
                  onChange={(e) => setLatticeRotation(parseInt(e.target.value, 10))}
                  className="br-range-slider"
                  style={{ accentColor: profile.color }}
                />
              </div>

              {/* Macroscopic Physical & Sensory Manifestation Dashboard */}
              <div className="br-metrics-grid">
                <div className="br-metric-card">
                  <span className="br-metric-label">Cohesion (Khaṭinatva)</span>
                  <span className="br-metric-val" style={{ color: '#f59e0b' }}>
                    {calculatedHardness} Mohs
                  </span>
                </div>
                <div className="br-metric-card">
                  <span className="br-metric-label">Packing Density (ρ)</span>
                  <span className="br-metric-val" style={{ color: '#38bdf8' }}>
                    {calculatedDensity} g/cm³
                  </span>
                </div>
                <div className="br-metric-card">
                  <span className="br-metric-label">Emergent Sensory Guṇa</span>
                  <span className="br-metric-val" style={{ color: '#4ade80' }}>
                    {profile.sensoryGuna}
                  </span>
                </div>
                <div className="br-metric-card">
                  <span className="br-metric-label">Perceiving Organ (Indriya)</span>
                  <span className="br-metric-val" style={{ color: '#c084fc' }}>
                    {profile.sensoryOrgan}
                  </span>
                </div>
              </div>

              {/* Crystallization Trigger Button */}
              <div className="br-actions-row">
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber br-crystallize-btn"
                  onClick={handleCrystallize}
                  style={{
                    background: isCrystallized
                      ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                      : `linear-gradient(135deg, ${profile.color} 0%, #b45309 100%)`,
                    boxShadow: `0 0 20px ${profile.glowColor}`,
                  }}
                >
                  {isCrystallized ? '🎉 MACRO BHŪTA MATERIALIZED!' : '⚡ MATERIALIZE MACROSCOPIC BHŪTA (स्थूल-द्रव्य-प्रत्यक्षीकरण)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CELEBRATION MODAL ON SUCCESSFUL CRYSTALLIZATION */}
      {showCelebrationModal && (
        <div className="br-modal-overlay" onClick={() => setShowCelebrationModal(false)}>
          <div className="br-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="br-modal-header">
              <span className="br-modal-icon">{profile.icon}</span>
              <div>
                <h4 className="br-modal-title">
                  {profile.macroTitle} Materialized!
                </h4>
                <p className="br-modal-subtitle">
                  {profile.sanskrit} · From 0D Paramāṇu to Tangible Substance
                </p>
              </div>
            </div>

            <div className="br-modal-body">
              <div className="br-modal-art">
                <svg viewBox="0 0 160 160" style={{ width: 120, height: 120, margin: '0 auto', display: 'block' }}>
                  <defs>
                    <radialGradient id={`modalGlow-${uid}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor={profile.color} />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                  <circle cx="80" cy="80" r="70" fill={`url(#modalGlow-${uid})`} opacity="0.25" />
                  <circle cx="80" cy="80" r="45" fill={profile.color} stroke="#fef08a" strokeWidth="2.5" />
                  <text x="80" y="88" textAnchor="middle" fontSize="36">
                    {profile.icon}
                  </text>
                </svg>
              </div>

              <p className="br-modal-narrative">
                You have systematically reconstructed matter using Kaṇāda's rigorous ontological pipeline:
              </p>

              <div className="br-modal-summary-steps">
                <div className="br-modal-step-item">
                  <strong>1. Dvyaṇuka (Dyad):</strong> 2 indivisible Paramāṇus fused along the Lennard-Jones potential well into a 1D linear dyad (r₀ = {profile.r0} Å).
                </div>
                <div className="br-modal-step-item">
                  <strong>2. Tryaṇuka (Triad):</strong> 3 dyads clustered into non-coplanar 3D spatial magnitude (<em>Mahatva</em>), unlocking optical Rayleigh scattering.
                </div>
                <div className="br-modal-step-item">
                  <strong>3. Macroscopic Bhūta:</strong> Billions of triads arrayed into <em>{packing.name}</em> periodic lattice (APF {packing.apf}%), giving rise to <em>{profile.sensoryGuna}</em>!
                </div>
              </div>
            </div>

            <div className="br-modal-actions">
              <button
                type="button"
                className="vl-btn vl-btn--cyber"
                onClick={() => setShowCelebrationModal(false)}
              >
                Close & Explore Other Bhūtas
              </button>
              <button
                type="button"
                className="vl-btn"
                onClick={handleResetCurrentBhuta}
                style={{ background: '#334155', color: '#f8fafc' }}
              >
                🔄 Re-run Simulation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default BhutaReconstructor;
