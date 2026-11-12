import React, { useState, useRef, useEffect } from 'react';
import { BodhiLabAnecdote, TermPanel, ChallengeList, LabNextAction, type LabTerm, type LabChallenge, type LabSegmentProps } from './common';
import { playPronunciation } from '../../utils/pronunciation';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/science-lab.css';

// ---------------------------------------------------------------------------
// DATA: Sanskrit Architectural & Engineering Terminology
// ---------------------------------------------------------------------------
const TEMPLE_TERMS: LabTerm[] = [
  {
    dev: 'सन्धि-बन्धनम्',
    iast: 'Sandhi-Bandhanam',
    en: 'Interlocking Dry Masonry / Kinetic Joint Engineering',
    note: 'Mortarless joinery using tenon-and-mortise, dovetail, and tongue-and-groove systems chiseled directly out of granite. Dissipates seismic kinetic energy through frictional yielding and self-healing gravity realignment.',
  },
  {
    dev: 'वास्तुपुरुष-मण्डलम्',
    iast: 'Vāstupuruṣa-Maṇḍalam',
    en: 'Metaphysical Fractal Ground Matrix',
    note: 'Square geometric layout (8x8 Mandūka or 9x9 Paramaśāyika) governing micro-to-macro self-similar cosmic scaling in temple design.',
  },
  {
    dev: 'विमानम् · शिखरम्',
    iast: 'Vimānam · Śikharam',
    en: 'Soaring Temple Spire / Sacred Mountain Archetype',
    note: 'The primary central superstructure rising above the sanctum, designed as a 3D fractal pyramid distributing vertical stone weight across self-similar sub-units.',
  },
  {
    dev: 'उरुशृङ्गम्',
    iast: 'Uruśṛṅgam',
    en: 'Miniature Subsidiary Fractal Spire',
    note: 'A precise, mathematically scaled-down replica of the central tower repeated along exterior faces to diffuse structural load and manifest cosmic self-similarity.',
  },
  {
    dev: 'गर्भगृहम्',
    iast: 'Garbhagṛham',
    en: 'Sanctum Sanctorum / Womb Chamber',
    note: 'The innermost cubical sanctum at the Brahma-Bindu center of the mandala, engineered so that equinoctial solar rays penetrate on astronomical inflection dates.',
  },
  {
    dev: 'अधिष्ठानम्',
    iast: 'Adhiṣṭhānam',
    en: 'Multi-Layered Geotechnical Plinth & Base',
    note: 'The massive stepped stone platform resting atop compacted sand and charcoal buffers, counteracting soil liquefaction and differential settlement.',
  },
  {
    dev: 'स्थपतिः',
    iast: 'Sthapatiḥ',
    en: 'Master Architect-Engineer & Geometer',
    note: 'The chief architectural scientist of the Gurukul tradition, fluent in structural mechanics, astronomy, metallurgy, geology, and sacred geometry.',
  },
  {
    dev: 'कूटम्',
    iast: 'Kūṭam',
    en: 'Structural Roof Pavilion / Weight-Bearing Unit',
    note: 'Square domed miniature pavilions framing the edges of temple tiers (Talās), functioning as structural counterweights and rhythmic geometric dividers.',
  },
];

const TEMPLE_CHALLENGES: LabChallenge[] = [
  {
    q: 'Why did ancient Indian temple craftsmen deliberately reject rigid mortar and chemical cement in seismic zones?',
    options: [
      'Chemical mortar was too expensive to manufacture in ancient times.',
      'Rigidity causes brittle stress concentration; interlocking dry masonry yields dynamically, absorbing and dissipating seismic energy via friction.',
      'They believed mortar angered the Earth goddess Bhūmi.',
      'Mortar made stone blocks too lightweight to withstand monsoons.',
    ],
    answer: 1,
    explain:
      'Exact! Rigidity is the enemy of structural longevity in shifting ground. Dry masonry (Sandhi Bandhana) allows individual granite blocks to displace by millimeters, dissipating seismic shockwaves through friction across precision-chiseled joints before gravity pulls them back into place.',
  },
  {
    q: 'How did the compacted sand cushion at Kudavelli Sangameswara Temple prevent catastrophic collapse at a turbulent river confluence?',
    options: [
      'The sand dissolved in floodwater to lower the river height.',
      'Sand served as a natural hydraulic buffer and shock absorber, distributing load uniformly and allowing groundwater to weep through without eroding the core.',
      'Sand attracted magnetic iron plates that welded the stone together.',
      'It made the entire temple float like a wooden boat on top of the river.',
    ],
    answer: 1,
    explain:
      'Spot on! Under flooding or seismic pressure, compacted sand acts as a natural hydraulic shock absorber. It distributes millions of tons of stone weight uniformly across the riverbank, prevents localized sinkholes, and permits groundwater to weep through without scouring.',
  },
  {
    q: 'In the Vastupurusha Mandala, how does repeating miniature spires (Urushringas) serve structural mechanics as well as aesthetics?',
    options: [
      'It makes the temple look frightening to deter invaders.',
      'It distributes vertical load across repeating structural sub-units, enabling taller spires without risking structural failure from uneven weight concentration.',
      'It creates acoustic echoes that amplify outdoor temple bells.',
      'It was solely done for decorative symmetry with no mechanical function.',
    ],
    answer: 1,
    explain:
      'Precisely! By adopting a self-similar fractal geometry (repeating the central tower motif at decreasing scales), architects distributed the massive downward thrust over a broad, stepped pyramidal perimeter, preventing catastrophic point-load failure at the apex.',
  },
  {
    q: 'What astronomical alignment was achieved by anchoring the Vastupurusha Mandala to the cardinal axes?',
    options: [
      'Lunar eclipses would cast square shadows on the temple floor.',
      'During equinoxes and solstices, solar rays penetrated the deepest recesses of the dark sanctum sanctorum (Garbhagriha).',
      'The temple rotated 1 degree each year to match precession.',
      'Rainfall was directed strictly towards the south-west corner.',
    ],
    answer: 1,
    explain:
      'Correct! By orienting the grid with exact cardinal precision, ancient Sthapatis calculated celestial orbits so that at dawn on vernal and autumnal equinoxes, the rising sun sent a direct beam through the outer gopuram portal into the dark Garbhagriha, illuminating the central sanctum.',
  },
];

type ProtocolTab = 'seismic' | 'hydro' | 'fractal' | 'treatises';

export const TempleEngineeringLab: React.FC<LabSegmentProps> = ({ onNextLab }) => {
  const [activeTab, setActiveTab] = useState<ProtocolTab>('seismic');

  // ---------------------------------------------------------------------------
  // EXPERIMENT 1: Sandhi Bandhana Seismic Simulator State
  // ---------------------------------------------------------------------------
  const [masonryMode, setMasonryMode] = useState<'dry' | 'mortar'>('dry');
  const [seismicMag, setSeismicMag] = useState<number>(7.2);
  const [isQuaking, setIsQuaking] = useState<boolean>(false);
  const [continuousTremor, setContinuousTremor] = useState<boolean>(true);
  const [seismicIntegrity, setSeismicIntegrity] = useState<number>(100);
  const [dissipatedEnergy, setDissipatedEnergy] = useState<number>(0);
  const [maxDisplacement, setMaxDisplacement] = useState<number>(0);
  const [shearStress, setShearStress] = useState<number>(0);

  const seismicCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const seismicAnimRef = useRef<number | null>(null);
  const seismicTimeRef = useRef<number>(0);
  const blockOffsetsRef = useRef<{ x: number; y: number; rot: number; cracked: boolean; heat: number }[]>([]);
  const seismoTraceRef = useRef<{ ground: number; roof: number }[]>([]);
  const restackProgressRef = useRef<number>(0);
  const [stonesResetFlash, setStonesResetFlash] = useState<boolean>(false);
  const draggingTierRef = useRef<number | null>(null);
  const dragStartXRef = useRef<number>(0);
  const isDraggingStoneRef = useRef<boolean>(false);
  const [isDraggingActive, setIsDraggingActive] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // EXPERIMENT 2: Kudavelli Sand Hydro-Mechanics Simulator State
  // ---------------------------------------------------------------------------
  const [foundationType, setFoundationType] = useState<'sand-cushion' | 'rigid-slab'>('sand-cushion');
  const [floodLevel, setFloodLevel] = useState<number>(8.5); // meters
  const [isLiquefying, setIsLiquefying] = useState<boolean>(false);
  const [foundationTilt, setFoundationTilt] = useState<number>(0);
  const [porePressure, setPorePressure] = useState<number>(120); // kPa
  const [settlementDepth, setSettlementDepth] = useState<number>(2.4); // mm

  const hydroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const hydroAnimRef = useRef<number | null>(null);
  const hydroTimeRef = useRef<number>(0);
  const smoothTiltRef = useRef<number>(0);
  const smoothSinkRef = useRef<number>(0);

  // ---------------------------------------------------------------------------
  // EXPERIMENT 3: Vastupurusha Mandala & Fractal Spire State
  // ---------------------------------------------------------------------------
  const [mandalaGrid, setMandalaGrid] = useState<'8x8' | '9x9'>('8x8');
  const [fractalDepth, setFractalDepth] = useState<number>(3); // 1 to 4
  const [viewMode, setViewMode] = useState<'mandala' | 'fractal-spire' | 'solar-align'>('fractal-spire');
  const [sunHour, setSunHour] = useState<number>(6.2); // 6 AM dawn to 18 PM dusk
  const [solarSeason, setSolarSeason] = useState<'equinox' | 'summer-solstice' | 'winter-solstice'>('equinox');

  const fractalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fractalAnimRef = useRef<number | null>(null);
  const fractalTimeRef = useRef<number>(0);

  // ---------------------------------------------------------------------------
  // Canvas Loop 1: Seismic Dry Masonry vs. Rigid Mortar (Upgraded Graphics)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const rows = 6;
    const blocksPerRow = 6;
    const totalBlocks = rows * blocksPerRow;
    if (blockOffsetsRef.current.length !== totalBlocks) {
      blockOffsetsRef.current = Array.from({ length: totalBlocks }, () => ({
        x: 0,
        y: 0,
        rot: 0,
        cracked: false,
        heat: 0,
      }));
    }

    let running = true;
    const canvas = seismicCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderSeismic = () => {
      if (!running) return;
      seismicTimeRef.current += 0.04;
      const t = seismicTimeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // 1. Deep Twilight Architectural Sky & Subtle Starfield
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#060b16');
      bgGrad.addColorStop(0.55, '#0f172a');
      bgGrad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant subtle stars & sacred golden dust
      for (let s = 0; s < 28; s++) {
        const sx = (s * 97 + 31) % w;
        const sy = (s * 53 + 17) % (h - 140);
        const alpha = 0.15 + 0.25 * Math.sin(t * 1.5 + s);
        ctx.fillStyle = `rgba(253, 224, 71, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, (s % 2) + 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle background architectural grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
      ctx.lineWidth = 1;
      for (let gx = 40; gx < w; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h - 62);
        ctx.stroke();
      }

      const groundY = h - 62;
      const activeQuake = isQuaking || continuousTremor;
      const amplitude = activeQuake ? (seismicMag - 3.2) * 3.8 : 0;
      const primaryWave = activeQuake ? Math.sin(t * 11.5) * amplitude + Math.cos(t * 17.3) * (amplitude * 0.28) : 0;
      const groundShift = primaryWave;

      // 2. Stratified Granite Bedrock & Tectonic Fault Line
      const rockGrad = ctx.createLinearGradient(0, groundY, 0, h);
      rockGrad.addColorStop(0, '#1e293b');
      rockGrad.addColorStop(0.4, '#0f172a');
      rockGrad.addColorStop(1, '#090d16');
      ctx.fillStyle = rockGrad;
      ctx.fillRect(0, groundY, w, h - groundY);

      // Propagating Seismic P-Wave & S-Wave Rings in Bedrock
      if (activeQuake) {
        const epicenterX = w / 2 + Math.sin(t * 3) * 18;
        const epicenterY = h - 8;
        for (let ring = 0; ring < 4; ring++) {
          const prog = ((t * 1.8 + ring * 0.25) % 1);
          const rad = prog * 280;
          const ringAlpha = (1 - prog) * 0.45;
          ctx.strokeStyle = ring % 2 === 0 ? `rgba(245, 158, 11, ${ringAlpha})` : `rgba(239, 68, 68, ${ringAlpha})`;
          ctx.lineWidth = 2.5 - prog * 1.5;
          ctx.beginPath();
          ctx.arc(epicenterX, epicenterY, rad, Math.PI, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Bedrock strata & surface shear wave line
      ctx.strokeStyle = activeQuake ? '#f59e0b' : '#475569';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) {
        const wy = groundY + (activeQuake ? Math.sin(x * 0.045 + t * 13) * (amplitude * 0.3) : 0);
        if (x === 0) ctx.moveTo(x, wy);
        else ctx.lineTo(x, wy);
      }
      ctx.stroke();

      // 3. Adhiṣṭhānam (Moulded Granite Plinth Base)
      const plinthW = 360;
      const plinthH = 26;
      const plinthX = w / 2 - plinthW / 2 + groundShift;
      const plinthY = groundY - plinthH;

      const plinthGrad = ctx.createLinearGradient(plinthX, plinthY, plinthX, groundY);
      plinthGrad.addColorStop(0, '#475569');
      plinthGrad.addColorStop(0.5, '#334155');
      plinthGrad.addColorStop(1, '#1e293b');
      ctx.fillStyle = plinthGrad;
      ctx.strokeStyle = masonryMode === 'dry' ? '#38bdf8' : '#94a3b8';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.roundRect(plinthX, plinthY, plinthW, plinthH, 4);
      ctx.fill();
      ctx.stroke();

      // Lotus Jagati & Kumuda moldings on plinth
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(plinthX + 8, plinthY + 8);
      ctx.lineTo(plinthX + plinthW - 8, plinthY + 8);
      ctx.moveTo(plinthX + 8, plinthY + 18);
      ctx.lineTo(plinthX + plinthW - 8, plinthY + 18);
      ctx.stroke();

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('अधिष्ठानम् · ADHIṢṬHĀNAM SEISMIC ISOLATION PLINTH', plinthX + plinthW / 2, plinthY + 15);

      // 4. Multi-Tier Stepped Chola Vimāna Tower Blocks
      const bW = 54;
      const bH = 30;
      let currStress = 0;
      let maxDisp = 0;
      let topTierDriftX = 0;

      // Advance re-stacking crane/plumb-line animation if triggered by "Reset Stones"
      const isRestacking = restackProgressRef.current > 0;
      if (isRestacking) {
        restackProgressRef.current = Math.max(0, restackProgressRef.current - 0.022);
      }
      const restackProg = 1 - restackProgressRef.current; // 0 -> 1

      for (let r = rows - 1; r >= 0; r--) {
        const tierIndex = rows - 1 - r; // 0 at bottom, 5 at top
        const rowBlocks = blocksPerRow - tierIndex; // 6, 5, 4, 3, 2, 1
        const rowStartX = w / 2 - (rowBlocks * bW) / 2 + groundShift;
        const baseY = plinthY - (tierIndex + 1) * bH;

        // Per-tier sequential drop-in progress during "Reset Stones" animation
        const tierWindowStart = tierIndex * 0.11;
        const tierDropRaw = isRestacking
          ? Math.max(0, Math.min(1, (restackProg - tierWindowStart) / 0.36))
          : 1;
        // Smooth ease-out cubic with slight lock-in snap
        const tierEase = 1 - Math.pow(1 - tierDropRaw, 3);
        const restackLiftY = isRestacking ? -(1 - tierEase) * (34 + tierIndex * 18) : 0;
        const restackSpreadX = isRestacking ? (1 - tierEase) : 0;

        for (let c = 0; c < rowBlocks; c++) {
          const idx = r * blocksPerRow + c;
          const bData = blockOffsetsRef.current[idx] || { x: 0, y: 0, rot: 0, cracked: false, heat: 0 };

          const heightFactor = (tierIndex + 1) * 0.32;
          if (isRestacking) {
            bData.x = 0;
            bData.y = 0;
            bData.rot = 0;
            bData.cracked = false;
            bData.heat = Math.max(0, 1 - Math.abs(tierDropRaw - 0.85) * 5);
          } else if (activeQuake) {
            if (masonryMode === 'dry') {
              // Kinetic Sandhi-Bandhana: controlled frictional slip + gravity self-centering
              const targetOffsetX = Math.sin(t * 10.5 - tierIndex * 0.55) * amplitude * heightFactor * 0.42;
              bData.x += (targetOffsetX - bData.x) * 0.28;
              bData.y = Math.abs(Math.sin(t * 10.5 - tierIndex * 0.55)) * 0.6;
              bData.rot = Math.sin(t * 8.5 + c * 0.7) * 0.012 * heightFactor;
              bData.cracked = false;
              bData.heat = Math.min(1, 0.35 + (Math.abs(bData.x) / 10) * 0.65);
              maxDisp = Math.max(maxDisp, Math.abs(bData.x));
              currStress = Math.min(31.5, seismicMag * 3.3);
            } else {
              // Rigid Mortar: high shear concentration, permanent lateral dislocation & brittle fracture
              currStress = seismicMag * 12.2;
              bData.heat = Math.min(1, (seismicMag - 4.5) / 3.5);
              if (seismicMag >= 6.0) {
                bData.cracked = true;
                const shearDir = (c + tierIndex) % 2 === 0 ? -1 : 1;
                const permanentShearTarget = shearDir * (tierIndex + 1) * 3.6;
                const whip = Math.sin(t * 15 + r * 0.9) * amplitude * heightFactor * 0.65;
                bData.x += ((permanentShearTarget + whip) - bData.x) * 0.16;
                const targetRot = shearDir * 0.028 * (tierIndex + 1) + Math.sin(t * 18 + c) * 0.015;
                bData.rot += (targetRot - bData.rot) * 0.14;
                if (tierIndex >= 2) {
                  bData.y = Math.min(16, bData.y + 0.22);
                }
                maxDisp = Math.max(maxDisp, Math.abs(bData.x) * 1.4);
              } else {
                bData.x = Math.sin(t * 14) * amplitude * 0.15;
                maxDisp = Math.max(maxDisp, Math.abs(bData.x));
              }
            }
          } else if (isRestacking) {
            // Smoothly ease stones back along golden Brahma-Sūtra plumb line
            bData.x += (0 - bData.x) * 0.14;
            bData.y += (0 - bData.y) * 0.14;
            bData.rot += (0 - bData.rot) * 0.14;
            bData.cracked = false;
            bData.heat *= 0.85;
          } else if (draggingTierRef.current === tierIndex) {
            // Actively being dragged by user pointer
            bData.heat = Math.min(1, bData.heat + 0.05);
            maxDisp = Math.max(maxDisp, Math.abs(bData.x));
          } else {
            // Natural friction settling: in dry mode, retaining displacement long enough for learner inspection!
            bData.heat *= 0.92;
            if (masonryMode === 'dry') {
              bData.x *= 0.988;
              bData.y *= 0.98;
              bData.rot *= 0.98;
            }
          }

          if (tierIndex === rows - 1) {
            topTierDriftX = bData.x;
          }

          const spreadOffset = (c - (rowBlocks - 1) / 2) * 18 * restackSpreadX;
          const blockX = rowStartX + c * bW + bData.x + spreadOffset;
          const blockY = baseY + bData.y + restackLiftY;

          ctx.save();
          ctx.translate(blockX + bW / 2, blockY + bH / 2);
          ctx.rotate(bData.rot);

          // 3D Carved Granite Ashlar Block Gradient
          const stoneGrad = ctx.createLinearGradient(0, -bH / 2, 0, bH / 2);
          if (bData.cracked) {
            stoneGrad.addColorStop(0, '#7f1d1d');
            stoneGrad.addColorStop(1, '#450a0a');
          } else if (masonryMode === 'dry') {
            stoneGrad.addColorStop(0, '#475569');
            stoneGrad.addColorStop(0.5, '#334155');
            stoneGrad.addColorStop(1, '#1e293b');
          } else {
            stoneGrad.addColorStop(0, '#64748b');
            stoneGrad.addColorStop(1, '#334155');
          }

          ctx.fillStyle = stoneGrad;
          ctx.strokeStyle = bData.cracked
            ? '#ef4444'
            : masonryMode === 'dry'
            ? `rgba(56, 189, 248, ${0.65 + bData.heat * 0.35})`
            : '#cbd5e1';
          ctx.lineWidth = masonryMode === 'dry' ? 1.6 : 2.2;

          ctx.beginPath();
          ctx.roundRect(-bW / 2 + 1, -bH / 2 + 1, bW - 2, bH - 2, 3);
          ctx.fill();
          ctx.stroke();

          // Carved Dravidian Gavākṣa / Kūḍu Arch Relief on Stone Face
          ctx.strokeStyle = bData.cracked ? 'rgba(248, 113, 113, 0.35)' : 'rgba(253, 224, 71, 0.28)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 2, 7, Math.PI, 0);
          ctx.stroke();

          // Interlocking Mortise-and-Tenon + Dovetail Keys vs. Brittle Mortar
          if (masonryMode === 'dry') {
            // Frictional Energy Dissipation Glow along sliding horizontal bed joint
            if (bData.heat > 0.08) {
              ctx.fillStyle = `rgba(251, 191, 36, ${bData.heat * 0.55})`;
              ctx.fillRect(-bW / 2 + 2, bH / 2 - 3, bW - 4, 4);
            }
            // Top Dovetail Tenon Key
            ctx.fillStyle = bData.heat > 0.2 ? '#f59e0b' : '#0284c7';
            ctx.strokeStyle = '#fde047';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-5, -bH / 2 + 1);
            ctx.lineTo(-8, -bH / 2 - 5);
            ctx.lineTo(8, -bH / 2 - 5);
            ctx.lineTo(5, -bH / 2 + 1);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Bottom Mortise Socket
            ctx.strokeStyle = '#38bdf8';
            ctx.strokeRect(-7, bH / 2 - 5, 14, 4);
          } else if (bData.cracked) {
            // Glowing Brittle Fracture Cracks
            ctx.strokeStyle = '#fca5a5';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(-16, -bH / 2 + 2);
            ctx.lineTo(-3, -1);
            ctx.lineTo(6, 4);
            ctx.lineTo(14, bH / 2 - 2);
            ctx.stroke();
          }

          // Sanskrit Epigraphic Stamp
          ctx.fillStyle = 'rgba(248, 250, 252, 0.32)';
          ctx.font = '9px Noto Sans Devanagari, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(masonryMode === 'dry' ? 'सन्धि' : 'सुधा', 0, 2);

          ctx.restore();
        }
      }

      // 5. 80-Ton Octagonal Śikhara Cupola, Golden Kalaśa & Fluttering Dhvaja Banner
      const apexDropRaw = isRestacking ? Math.max(0, Math.min(1, (restackProg - 0.62) / 0.38)) : 1;
      const apexEase = 1 - Math.pow(1 - apexDropRaw, 3);
      const apexLiftY = isRestacking ? -(1 - apexEase) * 65 : 0;
      const apexX = w / 2 + groundShift + topTierDriftX;
      const apexBaseY = plinthY - rows * bH + apexLiftY;

      ctx.save();
      ctx.translate(apexX, apexBaseY);

      // Grīva (Neck) & Octagonal Śikhara Dome
      const domeGrad = ctx.createRadialGradient(-6, -18, 4, 0, -14, 34);
      domeGrad.addColorStop(0, '#fde047');
      domeGrad.addColorStop(0.45, '#d97706');
      domeGrad.addColorStop(1, '#78350f');
      ctx.fillStyle = domeGrad;
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.8;

      ctx.beginPath();
      ctx.moveTo(-28, 0);
      ctx.bezierCurveTo(-30, -18, -16, -32, 0, -34);
      ctx.bezierCurveTo(16, -32, 30, -18, 28, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Āmalaka Ribs
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.5)';
      ctx.lineWidth = 1;
      for (let rx = -18; rx <= 18; rx += 6) {
        ctx.beginPath();
        ctx.moveTo(rx, -2);
        ctx.lineTo(rx * 0.55, -30);
        ctx.stroke();
      }

      // Golden Kalaśa Finial Spire
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(0, -40, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-3.5, -44);
      ctx.lineTo(0, -60);
      ctx.lineTo(3.5, -44);
      ctx.closePath();
      ctx.fill();

      // Animated Saffron Dhvaja (Temple Flag fluttering in the wind)
      ctx.fillStyle = '#f97316';
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -58);
      const wave1 = Math.sin(t * 6) * 4;
      const wave2 = Math.cos(t * 6) * 5;
      ctx.quadraticCurveTo(14, -62 + wave1, 28, -55 + wave2);
      ctx.lineTo(22, -49 + wave2 * 0.6);
      ctx.quadraticCurveTo(12, -52 + wave1, 0, -48);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      // 5b. Brahma-Sūtra Plumb Laser Line & Re-Stacking Status Overlay when "Reset Stones" is triggered
      if (isRestacking) {
        ctx.save();
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.9)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(w / 2, 42);
        ctx.lineTo(w / 2, groundY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Plumb bob & alignment badge
        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(w / 2 - 122, 16, 244, 26, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 9.5px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('↺ RE-STACKING 21 STONES TO BRAHMA-SŪTRA PLUMB', w / 2, 32);
        ctx.restore();
      }

      // 6. Gravity Restoring Force Vector Arrows along Flanks
      if (masonryMode === 'dry') {
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.7)';
        ctx.fillStyle = 'rgba(34, 197, 94, 0.85)';
        ctx.lineWidth = 1.8;
        const pulseY = (t * 28) % 120;
        [-175, 175].forEach((sideOffset) => {
          const ax = w / 2 + sideOffset;
          const ayTop = plinthY - 165;
          const ayBot = plinthY - 15;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(ax, ayTop);
          ctx.lineTo(ax, ayBot);
          ctx.stroke();
          ctx.setLineDash([]);

          // Moving gravity pulse bead
          const beadY = ayTop + pulseY;
          ctx.beginPath();
          ctx.arc(ax, beadY, 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Arrowhead
          ctx.beginPath();
          ctx.moveTo(ax - 5, ayBot - 7);
          ctx.lineTo(ax, ayBot);
          ctx.lineTo(ax + 5, ayBot - 7);
          ctx.closePath();
          ctx.fill();
        });
      }

      // 7. HUD Inset 1 (Top-Left): Magnified 4× Interlocking Joint Zoom Loupe
      ctx.save();
      const loupeX = 14;
      const loupeY = 14;
      const loupeW = 186;
      const loupeH = 98;
      ctx.fillStyle = 'rgba(9, 14, 23, 0.88)';
      ctx.strokeStyle = masonryMode === 'dry' ? 'rgba(56, 189, 248, 0.6)' : 'rgba(239, 68, 68, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(loupeX, loupeY, loupeW, loupeH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = masonryMode === 'dry' ? '#38bdf8' : '#f87171';
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(
        masonryMode === 'dry' ? '🔍 4× ZOOM: DOVETAIL SANDHI' : '🔍 4× ZOOM: BRITTLE MORTAR',
        loupeX + 8,
        loupeY + 14
      );

      const jCenterX = loupeX + loupeW / 2;
      const jCenterY = loupeY + 56;
      const slipPx = activeQuake ? Math.sin(t * 11.5) * (masonryMode === 'dry' ? 7 : 2) : 0;
      const anyCracked = blockOffsetsRef.current.some((b) => b.cracked);

      // Bottom stone in loupe
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#64748b';
      ctx.fillRect(jCenterX - 68, jCenterY + 2, 136, 26);
      ctx.strokeRect(jCenterX - 68, jCenterY + 2, 136, 26);

      // Top stone in loupe (sliding)
      ctx.fillStyle = '#334155';
      ctx.fillRect(jCenterX - 68 + slipPx, jCenterY - 26, 136, 26);
      ctx.strokeRect(jCenterX - 68 + slipPx, jCenterY - 26, 136, 26);

      if (masonryMode === 'dry') {
        // Interlocking Dovetail Tenon inside socket
        ctx.fillStyle = activeQuake ? '#f59e0b' : '#0284c7';
        ctx.strokeStyle = '#fde047';
        ctx.beginPath();
        ctx.moveTo(jCenterX - 10 + slipPx, jCenterY - 2);
        ctx.lineTo(jCenterX - 15 + slipPx, jCenterY + 14);
        ctx.lineTo(jCenterX + 15 + slipPx, jCenterY + 14);
        ctx.lineTo(jCenterX + 10 + slipPx, jCenterY - 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        if (activeQuake) {
          ctx.fillStyle = '#fde047';
          ctx.font = '8px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('⇄ FRICTION DISSIPATES WAVE', jCenterX, loupeY + loupeH - 6);
        } else {
          ctx.fillStyle = '#86efac';
          ctx.font = '8px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('✓ GRAVITY LOCKED IN PLUMB', jCenterX, loupeY + loupeH - 6);
        }
      } else {
        // Rigid mortar layer & shear crack
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(jCenterX - 68, jCenterY - 2, 136, 4);
        if (anyCracked || (activeQuake && seismicMag >= 6.0)) {
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(jCenterX - 25, jCenterY - 22);
          ctx.lineTo(jCenterX - 5, jCenterY);
          ctx.lineTo(jCenterX + 18, jCenterY + 24);
          ctx.stroke();
          ctx.fillStyle = '#fca5a5';
          ctx.font = '8px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('⚡ SHEAR FRACTURE IN CEMENT', jCenterX, loupeY + loupeH - 6);
        } else {
          ctx.fillStyle = '#86efac';
          ctx.font = '8px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('✓ MORTAR JOINT RESET (INTACT)', jCenterX, loupeY + loupeH - 6);
        }
      }
      ctx.restore();

      // 8. HUD Inset 2 (Top-Right): Real-Time Dual Seismograph Waveform
      seismoTraceRef.current.push({
        ground: activeQuake ? groundShift : 0,
        roof: activeQuake ? (masonryMode === 'dry' ? topTierDriftX * 0.35 : topTierDriftX * 1.45) : 0,
      });
      if (seismoTraceRef.current.length > 80) seismoTraceRef.current.shift();

      ctx.save();
      const sBoxW = 190;
      const sBoxH = 86;
      const sBoxX = w - sBoxW - 14;
      const sBoxY = 14;
      ctx.fillStyle = 'rgba(9, 14, 23, 0.88)';
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(sBoxX, sBoxY, sBoxW, sBoxH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText('📈 LIVE SEISMOGRAPH TRACE', sBoxX + 8, sBoxY + 14);

      // Ground wave (Red)
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      seismoTraceRef.current.forEach((pt, i) => {
        const px = sBoxX + 10 + i * 2.15;
        const py = sBoxY + 46 + Math.max(-22, Math.min(22, pt.ground * 0.8));
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Roof damped response wave (Cyan for dry, Orange/Red for mortar)
      ctx.strokeStyle = masonryMode === 'dry' ? '#22c55e' : '#f97316';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      seismoTraceRef.current.forEach((pt, i) => {
        const px = sBoxX + 10 + i * 2.15;
        const py = sBoxY + 46 + Math.max(-24, Math.min(24, pt.roof * 0.8));
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '8px JetBrains Mono, monospace';
      ctx.fillText('— Ground Wave', sBoxX + 10, sBoxY + sBoxH - 7);
      ctx.fillStyle = masonryMode === 'dry' ? '#4ade80' : '#fb923c';
      ctx.fillText(masonryMode === 'dry' ? '— Damped Spire' : '— Amplified Spire', sBoxX + 96, sBoxY + sBoxH - 7);
      ctx.restore();

      // Update telemetry
      if (activeQuake) {
        setMaxDisplacement(Number(maxDisp.toFixed(1)));
        setShearStress(Number(currStress.toFixed(1)));
        if (masonryMode === 'dry') {
          setDissipatedEnergy(Math.min(96, Math.round(seismicMag * 11.8)));
          setSeismicIntegrity(99);
        } else {
          setDissipatedEnergy(Math.round(seismicMag * 3.1));
          setSeismicIntegrity(seismicMag >= 6.0 ? Math.max(12, Math.round(100 - (seismicMag - 5.5) * 35)) : 75);
        }
      } else {
        if (masonryMode === 'dry') {
          setSeismicIntegrity(100);
          setMaxDisplacement((prev) => Math.max(0, Number((prev * 0.9).toFixed(1))));
          setShearStress((prev) => Math.max(0, Number((prev * 0.9).toFixed(1))));
        }
      }

      seismicAnimRef.current = requestAnimationFrame(renderSeismic);
    };

    seismicAnimRef.current = requestAnimationFrame(renderSeismic);

    return () => {
      running = false;
      if (seismicAnimRef.current) cancelAnimationFrame(seismicAnimRef.current);
    };
  }, [masonryMode, seismicMag, isQuaking, continuousTremor]);

  const getTierFromPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = seismicCanvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top) * scaleY;
    const groundY = canvas.height - 55;
    const plinthY = groundY - 28;
    const bH = 30;
    const bW = 54;
    for (let r = 0; r < 6; r++) {
      const topY = plinthY - (r + 1) * bH;
      const botY = plinthY - r * bH;
      const rowBlocks = 6 - r;
      const rowW = rowBlocks * bW;
      const leftX = canvas.width / 2 - rowW / 2 - 40;
      const rightX = canvas.width / 2 + rowW / 2 + 40;
      if (py >= topY && py <= botY && px >= leftX && px <= rightX) {
        return { tier: r, px, py };
      }
    }
    return null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const hit = getTierFromPointer(e);
    if (hit !== null) {
      draggingTierRef.current = hit.tier;
      dragStartXRef.current = hit.px;
      isDraggingStoneRef.current = true;
      setIsDraggingActive(true);
      try {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      } catch (_) {}
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingStoneRef.current || draggingTierRef.current === null) return;
    const canvas = seismicCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const px = (e.clientX - rect.left) * scaleX;
    const deltaX = Math.max(-75, Math.min(75, px - dragStartXRef.current));

    const tier = draggingTierRef.current;
    let idx = 0;
    for (let r = 0; r < 6; r++) {
      const count = 6 - r;
      if (r === tier) {
        for (let c = 0; c < count; c++) {
          const b = blockOffsetsRef.current[idx + c];
          if (b) {
            b.x = deltaX;
            b.rot = (deltaX / 100) * 0.05;
            if (masonryMode === 'mortar' && Math.abs(deltaX) > 22) {
              b.cracked = true;
            }
          }
        }
      }
      idx += count;
    }
    setMaxDisplacement(Math.abs(deltaX));
    setShearStress(Math.min(100, Math.round(Math.abs(deltaX) * 1.3)));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingStoneRef.current) {
      isDraggingStoneRef.current = false;
      draggingTierRef.current = null;
      setIsDraggingActive(false);
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch (_) {}
    }
  };

  const handleDislocateStones = () => {
    setIsQuaking(false);
    setContinuousTremor(false);
    restackProgressRef.current = 0;
    const tierShifts = [0, -18, 26, -34, 30, -22];
    let idx = 0;
    for (let r = 0; r < 6; r++) {
      const count = 6 - r;
      const shift = tierShifts[r] || 0;
      for (let c = 0; c < count; c++) {
        const b = blockOffsetsRef.current[idx + c];
        if (b) {
          b.x = shift + (Math.random() - 0.5) * 8;
          b.rot = (shift / 120) * 0.04;
          if (masonryMode === 'mortar' && Math.abs(shift) > 20) {
            b.cracked = true;
          }
        }
      }
      idx += count;
    }
    setMaxDisplacement(34);
    setShearStress(masonryMode === 'mortar' ? 92 : 36);
    if (masonryMode === 'mortar') {
      setSeismicIntegrity(42);
    }
    soundEffects.playErrorBuzzer();
  };

  const handleResetStones = () => {
    setIsQuaking(false);
    setContinuousTremor(false);
    restackProgressRef.current = 1.0;
    seismoTraceRef.current = [];
    setSeismicIntegrity(100);
    setDissipatedEnergy(0);
    setMaxDisplacement(0);
    setShearStress(0);
    soundEffects.playStrokeChime();
    setStonesResetFlash(true);
    window.setTimeout(() => setStonesResetFlash(false), 1600);
  };

  // ---------------------------------------------------------------------------
  // Canvas Loop 2: Kudavelli Sand Foundation Hydro-Mechanics (Upgraded Graphics)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let running = true;
    const canvas = hydroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderHydro = () => {
      if (!running) return;
      hydroTimeRef.current += 0.035;
      const t = hydroTimeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Stratigraphic Boundaries
      const groundY = 128;
      const graniteCapY = 170;
      const sandBedY = 238;
      const charcoalY = 286;
      const clayIronY = 332;
      const riverbedY = h;

      const floodHeightPx = (floodLevel / 15) * 86;
      const currentWaterY = groundY - floodHeightPx;

      // 1. Monsoon Sky & Rain Streaks
      const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
      skyGrad.addColorStop(0, '#060b16');
      skyGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, groundY);

      if (floodLevel >= 6.0) {
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.22)';
        ctx.lineWidth = 1;
        for (let r = 0; r < 28; r++) {
          const rx = ((r * 47 + t * 90) % w);
          const ry = ((r * 29 + t * 180) % groundY);
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx - 4, ry + 11);
          ctx.stroke();
        }
      }

      // Smoothly interpolate foundation tilt & settlement depth
      const targetTilt = foundationType === 'rigid-slab' && (floodLevel > 6.5 || isLiquefying)
        ? 0.055 + (floodLevel / 15) * 0.055 + (isLiquefying ? 0.035 : 0)
        : 0;
      const targetSink = foundationType === 'rigid-slab' && (floodLevel > 6.5 || isLiquefying)
        ? 8 + (floodLevel / 15) * 10 + (isLiquefying ? 6 : 0)
        : 0;

      smoothTiltRef.current += (targetTilt - smoothTiltRef.current) * 0.08;
      smoothSinkRef.current += (targetSink - smoothSinkRef.current) * 0.08;

      const tiltDeg = Number(((smoothTiltRef.current * 180) / Math.PI).toFixed(1));
      setFoundationTilt(tiltDeg);
      setSettlementDepth(foundationType === 'rigid-slab' ? Math.round(35 + floodLevel * 8.5 + (isLiquefying ? 45 : 0)) : 3.2);
      setPorePressure(Math.round(80 + floodLevel * 14.5 + (isLiquefying ? 65 : 0)));

      // 2. Stratigraphic Foundation Trench Cross-Section
      // Riverbank side soil slopes
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, groundY, w, riverbedY - groundY);

      // Layer 1: Interlocking Granite Padma-Pīṭha Foundation Cap
      const capGrad = ctx.createLinearGradient(0, groundY, 0, graniteCapY);
      capGrad.addColorStop(0, '#475569');
      capGrad.addColorStop(1, '#334155');
      ctx.fillStyle = capGrad;
      ctx.fillRect(42, groundY, w - 84, graniteCapY - groundY);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(42, groundY, w - 84, graniteCapY - groundY);

      // Dressed masonry joints in Layer 1 + Downward Load Dispersion Cones
      for (let bx = 42; bx < w - 84; bx += 68) {
        ctx.beginPath();
        ctx.moveTo(bx, groundY);
        ctx.lineTo(bx, graniteCapY);
        ctx.stroke();
      }

      // Layer 2: Compacted River Sand Cushion vs. Rigid Slab
      if (foundationType === 'sand-cushion') {
        const sandGrad = ctx.createLinearGradient(0, graniteCapY, 0, sandBedY);
        sandGrad.addColorStop(0, '#d97706');
        sandGrad.addColorStop(0.5, '#b45309');
        sandGrad.addColorStop(1, '#92400e');
        ctx.fillStyle = sandGrad;
        ctx.fillRect(42, graniteCapY, w - 84, sandBedY - graniteCapY);

        // 95 Animated Multi-Toned Quartz Sand Particles (vibro-compacted cushion)
        for (let i = 0; i < 95; i++) {
          const jitter = isLiquefying ? Math.sin(t * 14 + i) * 1.5 : Math.sin(t * 3 + i) * 0.4;
          const sx = 48 + ((i * 43) % (w - 96)) + jitter;
          const sy = graniteCapY + 5 + ((i * 17) % (sandBedY - graniteCapY - 10));
          ctx.fillStyle = i % 3 === 0 ? 'rgba(254, 240, 138, 0.65)' : 'rgba(251, 191, 36, 0.45)';
          ctx.beginPath();
          ctx.arc(sx, sy, (i % 2) + 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Animated Weeping Darcy-Flow Groundwater Streamlines & Droplets
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([6, 6]);
        ctx.lineDashOffset = -t * 28;
        for (let j = 0; j < 4; j++) {
          const lineY = graniteCapY + 12 + j * 15;
          ctx.beginPath();
          ctx.moveTo(44, lineY);
          ctx.bezierCurveTo(
            w / 3,
            lineY + Math.sin(t * 2 + j) * 5,
            (2 * w) / 3,
            lineY - Math.sin(t * 2 + j) * 5,
            w - 44,
            lineY
          );
          ctx.stroke();
        }
        ctx.setLineDash([]);
      } else {
        // Rigid Impermeable Slab -> Hydrostatic Uplift & Edge Scouring Cavities
        ctx.fillStyle = '#475569';
        ctx.fillRect(42, graniteCapY, w - 84, sandBedY - graniteCapY);

        // Eroded Liquefaction Scour Cavities at right edge
        ctx.fillStyle = 'rgba(6, 182, 212, 0.42)';
        ctx.beginPath();
        ctx.arc(w - 95, sandBedY - 8, 26 + Math.sin(t * 5) * 4, Math.PI, 0);
        ctx.fill();

        // Red Hydrostatic Uplift Arrows punching upward
        ctx.strokeStyle = '#ef4444';
        ctx.fillStyle = '#ef4444';
        ctx.lineWidth = 2;
        for (let ux = 110; ux < w - 100; ux += 85) {
          const uy = sandBedY - 6 + Math.sin(t * 8 + ux) * 3;
          ctx.beginPath();
          ctx.moveTo(ux, uy + 16);
          ctx.lineTo(ux, uy - 12);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ux - 5, uy - 6);
          ctx.lineTo(ux, uy - 13);
          ctx.lineTo(ux + 5, uy - 6);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Layer 3: Crushed Granite Dust & Charcoal Pore-Filtration Bed
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(42, sandBedY, w - 84, charcoalY - sandBedY);
      for (let k = 0; k < 36; k++) {
        ctx.fillStyle = k % 2 === 0 ? '#334155' : '#1e293b';
        ctx.fillRect(50 + ((k * 29) % (w - 100)), sandBedY + 6 + ((k * 11) % (charcoalY - sandBedY - 12)), 6, 4);
      }

      // Layer 4: Compacted Clay & Interlocking Forged Iron Plates
      ctx.fillStyle = '#78350f';
      ctx.fillRect(42, charcoalY, w - 84, clayIronY - charcoalY);
      for (let m = 0; m < 5; m++) {
        const ix = 58 + m * 106;
        const iy = clayIronY - 15;
        ctx.fillStyle = '#94a3b8';
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.fillRect(ix, iy, 92, 8);
        ctx.strokeRect(ix, iy, 92, 8);
      }

      // Layer 5: Krishna-Tungabhadra Saturated Riverbed Aquifer
      const aqGrad = ctx.createLinearGradient(0, clayIronY, 0, riverbedY);
      aqGrad.addColorStop(0, '#0c4a6e');
      aqGrad.addColorStop(1, '#082f49');
      ctx.fillStyle = aqGrad;
      ctx.fillRect(0, clayIronY, w, riverbedY - clayIronY);

      // Rising pore-water bubbles during liquefaction
      if (isLiquefying) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.55)';
        for (let b = 0; b < 24; b++) {
          const bx = 60 + ((b * 37) % (w - 120));
          const by = riverbedY - (((t * 45 + b * 19) % (riverbedY - graniteCapY)));
          ctx.beginPath();
          ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Animated River Confluence Flood Waves Lapping the Plinth
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      for (let wx = 0; wx <= w; wx += 12) {
        const wy = currentWaterY + Math.sin(wx * 0.035 + t * 4.5) * 4 + Math.cos(wx * 0.07 - t * 3) * 2;
        ctx.lineTo(wx, wy);
      }
      ctx.lineTo(w, groundY);
      ctx.closePath();
      const waterGrad = ctx.createLinearGradient(0, currentWaterY, 0, groundY);
      waterGrad.addColorStop(0, 'rgba(56, 189, 248, 0.42)');
      waterGrad.addColorStop(1, 'rgba(3, 105, 161, 0.62)');
      ctx.fillStyle = waterGrad;
      ctx.fill();

      // Glowing wave crest line
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.75)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let wx = 0; wx <= w; wx += 12) {
        const wy = currentWaterY + Math.sin(wx * 0.035 + t * 4.5) * 4 + Math.cos(wx * 0.07 - t * 3) * 2;
        if (wx === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.stroke();
      ctx.restore();

      // 4. Detailed Kudavelli Sangameswara Temple Superstructure (Rekha-Nāgara Spire & Maṇḍapa)
      ctx.save();
      ctx.translate(w / 2, groundY + smoothSinkRef.current);
      ctx.rotate(smoothTiltRef.current);

      // Padma-Pīṭha Moulded Base Plinth
      const baseGrad = ctx.createLinearGradient(-140, -24, 140, 0);
      baseGrad.addColorStop(0, '#b45309');
      baseGrad.addColorStop(0.5, '#d97706');
      baseGrad.addColorStop(1, '#92400e');
      ctx.fillStyle = baseGrad;
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.roundRect(-145, -22, 290, 22, 3);
      ctx.fill();
      ctx.stroke();

      // Pillared Mukha-Maṇḍapa Hall (Right side portico)
      ctx.fillStyle = '#92400e';
      ctx.fillRect(10, -64, 110, 42);
      ctx.strokeRect(10, -64, 110, 42);
      // Carved Pillars inside Mandapa
      ctx.fillStyle = '#fde047';
      for (let px = 22; px <= 106; px += 21) {
        ctx.fillRect(px, -60, 6, 36);
      }
      // Stepped Phāṃsanā Roof over Mandapa
      for (let mr = 0; mr < 3; mr++) {
        ctx.fillStyle = '#b45309';
        ctx.fillRect(6 + mr * 8, -72 - mr * 6, 118 - mr * 16, 6);
        ctx.strokeRect(6 + mr * 8, -72 - mr * 6, 118 - mr * 16, 6);
      }

      // Main Garbhagṛha & Curvilinear Rekha-Prāsāda Śikhara (Left-Center)
      const spireCx = -45;
      ctx.fillStyle = '#b45309';
      ctx.fillRect(spireCx - 52, -68, 104, 46);
      ctx.strokeRect(spireCx - 52, -68, 104, 46);

      // 5 Curvilinear Bhūmi Tiers
      for (let step = 0; step < 5; step++) {
        const stepW = 96 - step * 14;
        const stepH = 10;
        const stepY = -68 - (step + 1) * stepH;
        ctx.fillStyle = step % 2 === 0 ? '#d97706' : '#b45309';
        ctx.beginPath();
        ctx.roundRect(spireCx - stepW / 2, stepY, stepW, stepH, 2);
        ctx.fill();
        ctx.stroke();
      }

      // Ribbed Āmalaka Crown & Golden Kalaśa
      const amalakaY = -68 - 5 * 10 - 6;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.ellipse(spireCx, amalakaY, 18, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(spireCx, amalakaY - 8, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(spireCx - 3, amalakaY - 11);
      ctx.lineTo(spireCx, amalakaY - 22);
      ctx.lineTo(spireCx + 3, amalakaY - 11);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // 5. Crisp Stratigraphy Callout Badges
      const drawBadge = (y: number, text: string, color: string) => {
        ctx.fillStyle = 'rgba(9, 14, 23, 0.78)';
        ctx.fillRect(48, y - 11, ctx.measureText(text).width + 12, 15);
        ctx.fillStyle = color;
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(text, 54, y);
      };

      ctx.font = 'bold 10px JetBrains Mono, monospace';
      drawBadge(18, '▼ KUDAVELLI SANGAMESWARA TEMPLE (10,000+ TONS AT RIVER CONFLUENCE)', '#f8fafc');
      drawBadge(graniteCapY - 8, '1. GRANITE PADMA-PĪṬHA INTERLOCKING CAP', '#e2e8f0');
      drawBadge(
        sandBedY - 8,
        foundationType === 'sand-cushion'
          ? '2. COMPACTED RIVER SAND CUSHION (DARCY WEEPING DRAINAGE & SHOCK BUFFER)'
          : '2. RIGID IMPERMEABLE SLAB (HYDROSTATIC UPLIFT & SCOUR FAILURE!)',
        foundationType === 'sand-cushion' ? '#fde047' : '#fca5a5'
      );
      drawBadge(charcoalY - 8, '3. CRUSHED GRANITE DUST & ACTIVATED CHARCOAL FILTRATION', '#cbd5e1');
      drawBadge(clayIronY - 8, '4. COMPACTED CLAY & FORGED IRON TENSION PLATES', '#fdba74');
      drawBadge(clayIronY + 24, '5. KRISHNA-TUNGABHADRA SATURATED AQUIFER', '#38bdf8');

      hydroAnimRef.current = requestAnimationFrame(renderHydro);
    };

    hydroAnimRef.current = requestAnimationFrame(renderHydro);

    return () => {
      running = false;
      if (hydroAnimRef.current) cancelAnimationFrame(hydroAnimRef.current);
    };
  }, [foundationType, floodLevel, isLiquefying]);

  // ---------------------------------------------------------------------------
  // Canvas Loop 3: Vastupurusha Mandala, Fractal Śikhara & Equinox Ray Tracing
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let running = true;
    const canvas = fractalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFractal = () => {
      if (!running) return;
      fractalTimeRef.current += 0.03;
      const t = fractalTimeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Rich Cosmic Background
      const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w * 0.7);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#060a12');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      if (viewMode === 'mandala') {
        const gridDim = mandalaGrid === '8x8' ? 8 : 9;
        const cellSize = Math.min((w - 180) / gridDim, (h - 76) / gridDim);
        const totalSize = gridDim * cellSize;
        const startX = w / 2 - totalSize / 2;
        const startY = h / 2 - totalSize / 2 + 6;
        const centerX = startX + totalSize / 2;
        const centerY = startY + totalSize / 2;

        // Outer Cosmic Prākāra Glow
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
        ctx.lineWidth = 3;
        ctx.strokeRect(startX - 6, startY - 6, totalSize + 12, totalSize + 12);

        // Draw Concentric Padas (Brāhma, Daivika, Mānuṣa, Paiśāca)
        for (let r = 0; r < gridDim; r++) {
          for (let c = 0; c < gridDim; c++) {
            const px = startX + c * cellSize;
            const py = startY + r * cellSize;

            const distFromEdge = Math.min(r, c, gridDim - 1 - r, gridDim - 1 - c);
            const isCenter =
              gridDim === 8
                ? (r === 3 || r === 4) && (c === 3 || c === 4)
                : r >= 3 && r <= 5 && c >= 3 && c <= 5;

            if (isCenter) {
              ctx.fillStyle = 'rgba(245, 158, 11, 0.42)';
              ctx.strokeStyle = '#fbbf24';
              ctx.lineWidth = 2;
            } else if (distFromEdge === 0) {
              // Paiśāca / Dikpāla outer ring
              ctx.fillStyle = 'rgba(56, 189, 248, 0.16)';
              ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
              ctx.lineWidth = 1.2;
            } else if (distFromEdge === 1) {
              // Mānuṣa ring
              ctx.fillStyle = 'rgba(168, 85, 247, 0.18)';
              ctx.strokeStyle = 'rgba(192, 132, 252, 0.45)';
              ctx.lineWidth = 1.2;
            } else {
              // Daivika ring
              ctx.fillStyle = 'rgba(234, 179, 8, 0.22)';
              ctx.strokeStyle = 'rgba(250, 204, 21, 0.5)';
              ctx.lineWidth = 1.4;
            }

            ctx.fillRect(px, py, cellSize, cellSize);
            ctx.strokeRect(px, py, cellSize, cellSize);
          }
        }

        // Sacred Rajju & Vaṃśa Diagonal Energy Cords + Animated Prāṇic Pulses
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.55)';
        ctx.lineWidth = 1.6;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + totalSize, startY + totalSize);
        ctx.moveTo(startX + totalSize, startY);
        ctx.lineTo(startX, startY + totalSize);
        ctx.moveTo(centerX, startY);
        ctx.lineTo(centerX, startY + totalSize);
        ctx.moveTo(startX, centerY);
        ctx.lineTo(startX + totalSize, centerY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated 8-Petaled Golden Padma (Lotus) at Brahmasthāna Center
        ctx.save();
        ctx.translate(centerX, centerY);
        const lotusScale = 1 + Math.sin(t * 2.5) * 0.06;
        ctx.scale(lotusScale, lotusScale);
        for (let p = 0; p < 8; p++) {
          ctx.save();
          ctx.rotate((p * Math.PI) / 4 + t * 0.2);
          ctx.fillStyle = 'rgba(253, 224, 71, 0.45)';
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(10, -18, 0, -34);
          ctx.quadraticCurveTo(-10, -18, 0, 0);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
        ctx.fillStyle = '#fffbeb';
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 10px Noto Sans Devanagari, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ब्रह्म', 0, 0);
        ctx.restore();

        // Animated Prāṇic Light Nodes radiating along 8 Cardinal & Diagonal Axes
        const pulseProg = (t * 0.55) % 1;
        const maxRad = totalSize / 2;
        for (let a = 0; a < 8; a++) {
          const ang = (a * Math.PI) / 4;
          const dist = pulseProg * maxRad;
          const nx = centerX + Math.cos(ang) * dist;
          const ny = centerY + Math.sin(ang) * dist;
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Cardinal & Dikpāla Labels
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(
          `VĀSTUPURUṢA MAṆḌALA (${gridDim}×${gridDim} = ${gridDim * gridDim} PADAS · ${
            gridDim === 8 ? 'MAṆḌŪKA' : 'PARAMAŚĀYIKA'
          })`,
          w / 2,
          20
        );
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('उत्तर · NORTH (KUBERA)', w / 2, startY - 12);
        ctx.fillText('दक्षिण · SOUTH (YAMA)', w / 2, startY + totalSize + 18);
        ctx.fillText('पूर्व · EAST (INDRA)', startX + totalSize + 56, centerY);
        ctx.fillText('पश्चिम · WEST (VARUṆA)', startX - 56, centerY);
      } else if (viewMode === 'fractal-spire') {
        // True Curvilinear Nagara/Dravidian Fractal Vimāna & Uruśṛṅga Generator
        const cx = w / 2 + 24;
        const groundBaseY = h - 54;
        const mainW = 240;
        const mainH = 250;

        // Draw Stepped Adhiṣṭhānam Plinth
        const plinthGrad = ctx.createLinearGradient(cx - 150, groundBaseY, cx + 150, groundBaseY + 24);
        plinthGrad.addColorStop(0, '#78350f');
        plinthGrad.addColorStop(0.5, '#d97706');
        plinthGrad.addColorStop(1, '#78350f');
        ctx.fillStyle = plinthGrad;
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.roundRect(cx - 148, groundBaseY, 296, 22, 4);
        ctx.fill();
        ctx.stroke();

        // Recursive Architectural Śikhara / Uruśṛṅga Renderer
        const drawTempleSpire = (sx: number, sy: number, sw: number, sh: number, depth: number, maxD: number) => {
          if (depth <= 0 || sw < 14) return;

          const isMain = depth === maxD;
          const spireGrad = ctx.createLinearGradient(sx - sw / 2, sy - sh, sx + sw / 2, sy);
          if (isMain) {
            spireGrad.addColorStop(0, 'rgba(245, 158, 11, 0.55)');
            spireGrad.addColorStop(0.5, 'rgba(180, 83, 9, 0.65)');
            spireGrad.addColorStop(1, 'rgba(120, 53, 15, 0.85)');
          } else {
            spireGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
            spireGrad.addColorStop(0.6, 'rgba(14, 116, 144, 0.65)');
            spireGrad.addColorStop(1, 'rgba(15, 23, 42, 0.9)');
          }

          ctx.fillStyle = spireGrad;
          ctx.strokeStyle = isMain ? '#fbbf24' : '#38bdf8';
          ctx.lineWidth = isMain ? 2 : 1.3;

          // Curvilinear Rekha-Śikhara Parabolic Profile
          ctx.beginPath();
          ctx.moveTo(sx - sw / 2, sy);
          ctx.quadraticCurveTo(sx - sw * 0.42, sy - sh * 0.68, sx - sw * 0.14, sy - sh);
          ctx.lineTo(sx + sw * 0.14, sy - sh);
          ctx.quadraticCurveTo(sx + sw * 0.42, sy - sh * 0.68, sx + sw / 2, sy);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Horizontal Bhūmi Stone Courses & Central Latā Spine
          const tiers = Math.max(3, depth * 2);
          ctx.strokeStyle = isMain ? 'rgba(253, 224, 71, 0.35)' : 'rgba(125, 211, 252, 0.3)';
          ctx.lineWidth = 0.9;
          for (let tr = 1; tr < tiers; tr++) {
            const frac = tr / tiers;
            const ty = sy - sh * frac;
            const halfW = (sw / 2) * (1 - Math.pow(frac, 1.35) * 0.72);
            ctx.beginPath();
            ctx.moveTo(sx - halfW, ty);
            ctx.lineTo(sx + halfW, ty);
            ctx.stroke();
          }

          // Ribbed Āmalaka & Golden Kalaśa Crown on every Uruśṛṅga!
          const amW = Math.max(5, sw * 0.18);
          const amH = Math.max(2.5, sh * 0.032);
          ctx.fillStyle = '#f59e0b';
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(sx, sy - sh - amH, amW, amH, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Kalaśa Finial
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.moveTo(sx - amW * 0.35, sy - sh - amH * 2);
          ctx.lineTo(sx, sy - sh - amH * 2 - Math.max(5, sh * 0.07));
          ctx.lineTo(sx + amW * 0.35, sy - sh - amH * 2);
          ctx.closePath();
          ctx.fill();

          // Recursive Subsidiary Uruśṛṅgas clustering along flanks and chest
          if (depth > 1) {
            const subW = sw * 0.46;
            const subH = sh * 0.62;
            // Left & Right flank Uruśṛṅgas
            drawTempleSpire(sx - sw * 0.31, sy, subW, subH, depth - 1, maxD);
            drawTempleSpire(sx + sw * 0.31, sy, subW, subH, depth - 1, maxD);
            // Central emerging chest Uruśṛṅga
            drawTempleSpire(sx, sy - sh * 0.18, subW * 0.86, subH * 0.78, depth - 1, maxD);
          }
        };

        drawTempleSpire(cx, groundBaseY, mainW, mainH, fractalDepth, fractalDepth);

        // Animated Gravity Load Cascade Particles flowing down Fractal Branches
        const numParticles = fractalDepth * 8;
        for (let p = 0; p < numParticles; p++) {
          const prog = ((t * 0.45 + p / numParticles) % 1);
          const py = groundBaseY - mainH + prog * mainH;
          const spread = prog * (mainW * 0.48);
          const branchSide = p % 3 === 0 ? -1 : p % 3 === 1 ? 1 : 0;
          const px = cx + branchSide * spread + Math.sin(prog * Math.PI * fractalDepth + p) * 8;

          ctx.fillStyle = '#4ade80';
          ctx.beginPath();
          ctx.arc(px, py, 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Inset Top-Left: Rotating Stellate Fractal Ground-Plan (2D Blueprint Projection)
        ctx.save();
        const planX = 76;
        const planY = 82;
        ctx.fillStyle = 'rgba(9, 14, 23, 0.86)';
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(14, 14, 124, 132, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 9px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('STELLATE PLAN', planX, 28);

        ctx.translate(planX, planY);
        const squares = Math.pow(2, fractalDepth - 1);
        for (let s = 0; s < squares; s++) {
          ctx.save();
          ctx.rotate((s * Math.PI) / (2 * squares) + t * 0.15);
          const sz = 54 - (s % 2) * 6;
          ctx.strokeStyle = s === 0 ? '#fbbf24' : '#38bdf8';
          ctx.fillStyle = 'rgba(168, 85, 247, 0.12)';
          ctx.lineWidth = 1.2;
          ctx.fillRect(-sz / 2, -sz / 2, sz, sz);
          ctx.strokeRect(-sz / 2, -sz / 2, sz, sz);
          ctx.restore();
        }
        ctx.restore();

        // Bottom Load Distribution Legend
        ctx.fillStyle = '#86efac';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(
          `▼ SELF-SIMILAR URUŚṚṄGA LOAD CASCADE (${Math.pow(4, fractalDepth - 1)} FRACTAL NODES ACTIVE)`,
          cx,
          h - 14
        );
      } else if (viewMode === 'solar-align') {
        // Longitudinal Temple Architectural Cutaway & Equinox Sūrya-Kiraṇa Ray Tracing
        const groundY = h - 68;
        const sanctumX = 132;
        const sanctumY = groundY - 46;
        const mandapaX = 290;
        const gopuramX = 445;

        // Dynamic Sky Gradient based on Sun Hour
        const dawnFactor = Math.max(0, 1 - Math.abs(sunHour - 6.3) / 2.5);
        const skyGrad = ctx.createLinearGradient(0, 0, w, groundY);
        skyGrad.addColorStop(0, '#090d16');
        skyGrad.addColorStop(0.6, dawnFactor > 0.3 ? '#1e1b4b' : '#0f172a');
        skyGrad.addColorStop(1, dawnFactor > 0.3 ? '#7c2d12' : '#1e293b');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, groundY);

        // Bedrock & Stone Courtyard
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, groundY, w, h - groundY);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, groundY);
        ctx.lineTo(w - 40, groundY);
        ctx.stroke();

        // 1. Western Garbhagṛha (Sanctum) & Towering Vimāna Cutaway
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 2;
        ctx.fillRect(sanctumX - 48, groundY - 96, 96, 96);
        ctx.strokeRect(sanctumX - 48, groundY - 96, 96, 96);

        // Stepped Vimana Spire above Garbhagriha
        for (let st = 0; st < 5; st++) {
          const sw = 88 - st * 15;
          const sy = groundY - 96 - (st + 1) * 16;
          ctx.fillStyle = '#78350f';
          ctx.strokeStyle = '#fbbf24';
          ctx.fillRect(sanctumX - sw / 2, sy, sw, 16);
          ctx.strokeRect(sanctumX - sw / 2, sy, sw, 16);
        }
        // Kalasha on Garbhagriha Vimana
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(sanctumX, groundY - 184, 7, 0, Math.PI * 2);
        ctx.fill();

        // 2. Central Mahā-Maṇḍapa (Pillared Assembly Hall Cutaway)
        ctx.fillStyle = 'rgba(30, 41, 59, 0.78)';
        ctx.strokeStyle = '#64748b';
        ctx.fillRect(mandapaX - 52, groundY - 82, 104, 82);
        ctx.strokeRect(mandapaX - 52, groundY - 82, 104, 82);
        for (let p = -36; p <= 36; p += 24) {
          ctx.fillStyle = '#475569';
          ctx.fillRect(mandapaX + p - 4, groundY - 78, 8, 78);
        }

        // 3. Eastern Rāja-Gopuram (Gateway Tower with Aligned Solar Aperture)
        for (let gt = 0; gt < 6; gt++) {
          const gw = 54 - gt * 6;
          const gy = groundY - (gt + 1) * 24;
          ctx.fillStyle = '#334155';
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.4;
          ctx.fillRect(gopuramX - gw / 2, gy, gw, 24);
          ctx.strokeRect(gopuramX - gw / 2, gy, gw, 24);
        }
        // Clear Aligned Portal Window through Gopuram & Mandapa
        ctx.fillStyle = '#090d16';
        ctx.fillRect(gopuramX - 18, sanctumY - 16, 36, 32);
        ctx.strokeStyle = '#fde047';
        ctx.strokeRect(gopuramX - 18, sanctumY - 16, 36, 32);

        // 4. Calculate Sun Position from Hour & Season
        const sunProgress = (sunHour - 6) / 12; // 0 at 6am, 1 at 6pm
        const seasonOffset = solarSeason === 'equinox' ? 0 : solarSeason === 'summer-solstice' ? -44 : 44;
        const sunX = w - 62 - sunProgress * 35;
        const sunY = sanctumY - Math.sin(sunProgress * Math.PI * 0.85) * 145 + seasonOffset;

        const isEquinoxAligned = solarSeason === 'equinox' && sunHour >= 6.0 && sunHour <= 6.8;

        // 5. Volumetric Sunbeam Ray Tracing
        ctx.save();
        if (isEquinoxAligned) {
          const beamGrad = ctx.createLinearGradient(sunX, sunY, sanctumX, sanctumY);
          beamGrad.addColorStop(0, 'rgba(253, 224, 71, 0.85)');
          beamGrad.addColorStop(0.5, 'rgba(251, 191, 36, 0.45)');
          beamGrad.addColorStop(1, 'rgba(253, 224, 71, 0.95)');

          ctx.fillStyle = beamGrad;
          ctx.beginPath();
          ctx.moveTo(sunX, sunY - 8);
          ctx.lineTo(sanctumX, sanctumY - 14);
          ctx.lineTo(sanctumX, sanctumY + 14);
          ctx.lineTo(sunX, sunY + 8);
          ctx.closePath();
          ctx.fill();

          // Floating Golden Dust Motes (Marīci) inside Sunbeam
          ctx.fillStyle = '#fef08a';
          for (let m = 0; m < 18; m++) {
            const mp = ((t * 0.35 + m / 18) % 1);
            const mx = sunX - mp * (sunX - sanctumX);
            const my = sunY + (sanctumY - sunY) * mp + Math.sin(t * 4 + m) * 5;
            ctx.beginPath();
            ctx.arc(mx, my, 2, 0, Math.PI * 2);
            ctx.fill();
          }

          // Radiant Illumination Aura inside Garbhagṛha!
          const auraGrad = ctx.createRadialGradient(sanctumX, sanctumY, 4, sanctumX, sanctumY, 38 + Math.sin(t * 6) * 5);
          auraGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
          auraGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.55)');
          auraGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(sanctumX, sanctumY, 42, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Ray blocked by Gopuram outer wall or angled above roof
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.38)';
          ctx.lineWidth = 3;
          ctx.setLineDash([6, 6]);
          ctx.beginPath();
          ctx.moveTo(sunX, sunY);
          ctx.lineTo(gopuramX + 24, sunY + (sanctumY - sunY) * 0.35);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.restore();

        // Sculpted Śivaliṅga / Sanctum Deity on Pīṭha inside Garbhagṛha
        ctx.fillStyle = isEquinoxAligned ? '#fde047' : '#64748b';
        ctx.strokeStyle = isEquinoxAligned ? '#fffbeb' : '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.fillRect(sanctumX - 16, sanctumY + 8, 32, 8);
        ctx.beginPath();
        ctx.roundRect(sanctumX - 7, sanctumY - 12, 14, 20, [7, 7, 0, 0]);
        ctx.fill();
        ctx.stroke();

        // Draw Radiant Sūrya Orb
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 26);
        sunGrad.addColorStop(0, '#ffffff');
        sunGrad.addColorStop(0.4, '#fde047');
        sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, 26, 0, Math.PI * 2);
        ctx.fill();

        // Architectural Labels
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('GARBHAGṚHA', sanctumX, groundY + 18);
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText('MAHĀ-MAṆḌAPA', mandapaX, groundY + 18);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('RĀJA-GOPURAM (EAST)', gopuramX, groundY + 18);

        ctx.fillStyle = isEquinoxAligned ? '#fef08a' : '#cbd5e1';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.fillText(
          isEquinoxAligned
            ? '✨ SŪRYA-KIRAṆA ALIGNED: EQUINOX DAWN SUNBEAM ILLUMINATES INNER GARBHAGṚHA!'
            : solarSeason === 'equinox'
            ? '☀️ Set Sun Time to 6:00–6:45 AM (Dawn) to align beam through the Gopuram Portal'
            : '☀️ Switch Season to Vernal/Autumnal Equinox to align solar azimuth with the East Axis',
          w / 2,
          24
        );
      }

      fractalAnimRef.current = requestAnimationFrame(renderFractal);
    };

    fractalAnimRef.current = requestAnimationFrame(renderFractal);

    return () => {
      running = false;
      if (fractalAnimRef.current) cancelAnimationFrame(fractalAnimRef.current);
    };
  }, [mandalaGrid, fractalDepth, viewMode, sunHour, solarSeason]);

  // Audio trigger
  const triggerAudio = (text: string) => {
    soundEffects.playStrokeChime();
    playPronunciation(text);
  };

  return (
    <div className="vl-sim vl-temple-sim" data-testid="temple-engineering-root">
      {/* 1. Bodhi Lab Anecdote */}
      <BodhiLabAnecdote
        title="Bhoja, Viśvakarmā & The Self-Healing Architecture of Stone"
        sanskritTitle="राजा भोजस्य समराङ्गण-सूत्रधारः &amp; सन्धि-बन्धन-विज्ञानम्"
        mood="scholar"
        sutra={{
          dev: 'सुसन्धित्वं सुसंहत्यं सुस्थितत्वं सुगाढता । सुप्रमाणं सुसन्धानं वास्तु-कर्म-गुणाः स्मृताः ॥',
          iast: 'susandhitvaṃ susaṃhatyaṃ susthitatvaṃ sugāḍhatā | supramāṇaṃ susandhānaṃ vāstu-karma-guṇāḥ smṛtāḥ ||',
          source: 'Samarāṅgaṇa Sūtradhāra 44.12 (राजा भोजः · ११श-शताब्दी)',
          meaning:
            '“Flawless precision of interlocking joints (susandhitvam), structural cohesion (susaṃhatyam), steadfast equilibrium (susthitatvam), deep-rooted compactness (sugāḍhatā), harmonic proportions (supramāṇam), and unified alignment (susandhānam)—these are the cardinal virtues of sacred architecture.”',
        }}
        anecdote={
          <>
            <p>
              Centuries before seismic isolation bearings and finite element computational modeling were developed in modern engineering,
              ancient Indian master architects (<em>Sthapatis</em>) erected stone skyscrapers that have endured massive earthquakes,
              severe tropical weathering, and riverbank liquefaction for over a millennium.
            </p>
            <p>
              At the <strong>Brihadisvara Temple</strong> in Tanjore (completed in 1010 CE), an 80-ton single granite capstone sits atop
              a 66-meter-tall hollow stone tower without a single drop of chemical mortar or cement binding the ashlar blocks.
              The secret to this structural immortality lies in <strong>Sandhi Bandhana (Dry Masonry)</strong>: precision interlocking
              joints (mortise-and-tenon, dovetails, tongue-and-groove) that yield dynamically to seismic waves, dissipating kinetic energy
              through microscopic surface friction before gravity resets every stone back to absolute plumb.
            </p>
          </>
        }
        epistemologyAndMethod={
          <>
            Ancient temple science synthesizes three rigorous disciplines:
            <strong> 1. Geotechnical Hydro-Mechanics (भू-जल-विज्ञानम्)</strong>: Multi-layer compacted sand cushions that prevent liquefaction
            at floodplains like Kudavelli Sangameswara;
            <strong> 2. Kinetic Dry Masonry (सन्धि-बन्धनम्)</strong>: Rejection of brittle cement mortar in favor of friction-damped interlocking joints; and
            <strong> 3. Fractal Geometry &amp; Archaeoastronomy (वास्तुपुरुष-मण्डलम्)</strong>: Recursive self-similar spires (Uruśṛṅgas)
            distributing massive gravity loads across cardinal solar axes.
          </>
        }
        modernBridge={{
          ancientConcept:
            'Sandhi Bandhana (friction-damped interlocking dry masonry), multi-layered compacted sand buffers, and Vastupurusha Mandala self-similar spires.',
          modernScience:
            'Nonlinear contact mechanics, passive friction dampers for seismic base isolation, geotechnical drainage blankets countering liquefaction, and Mandelbrot fractal dimensionality.',
          relevanceNote:
            'Contemporary earthquake engineers study Tanjore, Hampi, and Kudavelli to build resilient, mortarless, carbon-negative civic structures capable of enduring millennial seismic cycles.',
        }}
        societalValue={
          <p>
            Ancient temples were not merely spiritual centers; they were civilizational life-support engines, astronomical observatories,
            and disaster shelters. Their self-healing architecture ensured that during catastrophic earthquakes and monsoonal deluges,
            communities found refuge in buildings that nature could shake but never shatter.
          </p>
        }
      />

      {/* 2. Interactive Navigation Tabs */}
      <div className="vl-panel" style={{ background: '#0b1220', border: '1.5px solid rgba(245, 158, 11, 0.35)', borderRadius: '16px', padding: '0.85rem 1.15rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
              SECTOR 13 // EXPERIMENTAL BENCHES &amp; ARCHIVAL TREATISE
            </span>
            <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', color: '#f8fafc', fontWeight: 800 }}>
              The Masters of Stone · Architecture &amp; Mechanics Lab
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`vl-btn ${activeTab === 'seismic' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
              onClick={() => setActiveTab('seismic')}
            >
              🏛️ 1. Seismic Dry Masonry
            </button>
            <button
              type="button"
              className={`vl-btn ${activeTab === 'hydro' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
              onClick={() => setActiveTab('hydro')}
            >
              🌊 2. Sand Hydro-Mechanics
            </button>
            <button
              type="button"
              className={`vl-btn ${activeTab === 'fractal' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
              onClick={() => setActiveTab('fractal')}
            >
              📐 3. Mandala &amp; Fractals
            </button>
            <button
              type="button"
              className={`vl-btn ${activeTab === 'treatises' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
              onClick={() => setActiveTab('treatises')}
            >
              📜 4. Read Full Monograph
            </button>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* PROTOCOL 1: SANDHI BANDHANA SEISMIC SIMULATOR */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'seismic' && (
        <section className="vl-panel" style={{ background: 'linear-gradient(135deg, rgba(24,34,60,0.95), rgba(15,23,42,0.95))', border: '1.5px solid rgba(56,189,248,0.3)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                PROTOCOL 01 // DRY MASONRY KINETIC FRICTION BENCH
              </span>
              <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.2rem', color: '#f8fafc', fontWeight: 800 }}>
                Interlocking Sandhi Bandhana vs. Rigid Chemical Mortar
              </h3>
            </div>
            <button
              type="button"
              className="vl-btn vl-btn--compact"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
              onClick={() => triggerAudio('सन्धि-बन्धनम्')}
            >
              🔊 Hear Sanskrit: सन्धि-बन्धनम्
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '1.25rem', alignItems: 'start' }}>
            {/* Canvas Display */}
            <div>
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid rgba(148, 163, 184, 0.25)' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 12,
                    background: 'rgba(15, 23, 42, 0.88)',
                    padding: '0.3rem 0.65rem',
                    borderRadius: 6,
                    border: '1px solid rgba(253, 224, 71, 0.45)',
                    fontSize: '0.72rem',
                    color: '#fef08a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                >
                  <span>👆</span>
                  <span><strong>Drag &amp; Nudge:</strong> Click or touch stone tiers to displace horizontally, then realign!</span>
                </div>
                <canvas
                  ref={seismicCanvasRef}
                  width={640}
                  height={380}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    cursor: isDraggingActive ? 'grabbing' : 'grab',
                    touchAction: 'none',
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  role="img"
                  aria-label="Interactive seismic simulation showing dry masonry interlocking joints dissipating kinetic energy"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber"
                  style={{ flex: 1, minWidth: '150px', padding: '0.6rem 0.9rem', fontSize: '0.82rem' }}
                  onMouseDown={() => setIsQuaking(true)}
                  onMouseUp={() => setIsQuaking(false)}
                  onTouchStart={() => setIsQuaking(true)}
                  onTouchEnd={() => setIsQuaking(false)}
                >
                  ⚡ Press &amp; Hold to Shake Ground
                </button>
                <button
                  type="button"
                  className={`vl-btn ${continuousTremor ? 'vl-btn--danger' : 'vl-btn--cyber-ghost'}`}
                  style={{ padding: '0.6rem 0.85rem', fontSize: '0.82rem' }}
                  onClick={() => setContinuousTremor((p) => !p)}
                >
                  {continuousTremor ? '⏹ Stop Tremor' : '🌊 Tremor'}
                </button>
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber-ghost"
                  style={{
                    padding: '0.6rem 0.85rem',
                    fontSize: '0.82rem',
                    borderColor: 'rgba(245, 158, 11, 0.6)',
                    color: '#fbbf24',
                  }}
                  onClick={handleDislocateStones}
                  title="Manually push stones off-axis to test re-stacking"
                >
                  💥 Dislocate Stones
                </button>
                <button
                  type="button"
                  className={`vl-btn ${stonesResetFlash ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                  style={{
                    padding: '0.6rem 1rem',
                    fontSize: '0.82rem',
                    borderColor: stonesResetFlash ? '#22c55e' : undefined,
                    color: stonesResetFlash ? '#4ade80' : undefined,
                  }}
                  onClick={handleResetStones}
                >
                  {stonesResetFlash ? '✓ Stones Re-Stacked!' : '↺ Reset Stones'}
                </button>
              </div>
            </div>

            {/* Controls & Telemetry Side Panel */}
            <div style={{ background: 'rgba(15, 23, 42, 0.75)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  CONSTRUCTION TECHNOLOGY:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  <button
                    type="button"
                    className={`vl-btn ${masonryMode === 'dry' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.2rem' }}
                    onClick={() => setMasonryMode('dry')}
                  >
                    🏛️ Sandhi Bandhana
                  </button>
                  <button
                    type="button"
                    className={`vl-btn ${masonryMode === 'mortar' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.2rem' }}
                    onClick={() => setMasonryMode('mortar')}
                  >
                    🧱 Rigid Mortar
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  <span>Seismic Magnitude:</span>
                  <strong style={{ color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace' }}>
                    {seismicMag.toFixed(1)} Richter
                  </strong>
                </div>
                <input
                  type="range"
                  min={4.0}
                  max={9.0}
                  step={0.1}
                  value={seismicMag}
                  onChange={(e) => setSeismicMag(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#f59e0b' }}
                />
              </div>

              <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                  REAL-TIME TELEMETRY:
                </span>

                <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Energy Dissipated:</span>
                    <strong style={{ color: '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}>{dissipatedEnergy}%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Peak Shear Stress:</span>
                    <strong style={{ color: shearStress > 40 ? '#ef4444' : '#f59e0b', fontFamily: 'JetBrains Mono, monospace' }}>
                      {shearStress} MPa
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Max Joint Slip:</span>
                    <strong style={{ color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace' }}>{maxDisplacement} mm</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Structural Integrity:</span>
                    <strong style={{ color: seismicIntegrity > 80 ? '#22c55e' : '#ef4444', fontFamily: 'JetBrains Mono, monospace' }}>
                      {seismicIntegrity}%
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '0.9rem', padding: '0.6rem', borderRadius: '8px', background: 'rgba(24, 34, 60, 0.8)', border: '1px solid rgba(56, 189, 248, 0.25)', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <strong style={{ color: '#fde047' }}>Kinetic Principle:</strong> In Sandhi Bandhana, the structure does not resist rigidly;
                it yields dynamically. Friction across tenons absorbs the shock, and gravity acts as a self-healing restoring force!
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* PROTOCOL 2: KUDAVELLI SAND HYDRO-MECHANICS SIMULATOR */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'hydro' && (
        <section className="vl-panel" style={{ background: 'linear-gradient(135deg, rgba(24,34,60,0.95), rgba(15,23,42,0.95))', border: '1.5px solid rgba(245,158,11,0.3)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                PROTOCOL 02 // GEOTECHNICAL LIQUEFACTION &amp; HYDRO-BUFFER
              </span>
              <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.2rem', color: '#f8fafc', fontWeight: 800 }}>
                The 7th-Century Kudavelli Multi-Layered Sand Foundation
              </h3>
            </div>
            <button
              type="button"
              className="vl-btn vl-btn--compact"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
              onClick={() => triggerAudio('अधिष्ठानम्')}
            >
              🔊 Hear Sanskrit: अधिष्ठानम्
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '1.25rem', alignItems: 'start' }}>
            {/* Canvas Stratigraphy */}
            <div>
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid rgba(148, 163, 184, 0.25)' }}>
                <canvas
                  ref={hydroCanvasRef}
                  width={640}
                  height={380}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  role="img"
                  aria-label="Stratigraphic cross-section of Kudavelli temple showing compacted sand buffer preventing riverbank liquefaction"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className={`vl-btn ${isLiquefying ? 'vl-btn--danger' : 'vl-btn--cyber'}`}
                  style={{ flex: 1, minWidth: '160px', padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                  onClick={() => setIsLiquefying((p) => !p)}
                >
                  {isLiquefying ? '⏹ Stop Soil Liquefaction' : '💧 Trigger River Silt Liquefaction'}
                </button>
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber-ghost"
                  style={{ padding: '0.6rem 1rem', fontSize: '0.82rem' }}
                  onClick={() => {
                    setFloodLevel(8.5);
                    setIsLiquefying(false);
                    setFoundationType('sand-cushion');
                    smoothTiltRef.current = 0;
                    smoothSinkRef.current = 0;
                    setFoundationTilt(0);
                    setSettlementDepth(3.2);
                    soundEffects.playStrokeChime();
                  }}
                >
                  ↺ Reset Hydraulic Bench
                </button>
              </div>
            </div>

            {/* Controls & Telemetry Side Panel */}
            <div style={{ background: 'rgba(15, 23, 42, 0.75)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  FOUNDATION ARCHITECTURE:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  <button
                    type="button"
                    className={`vl-btn ${foundationType === 'sand-cushion' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                    style={{ fontSize: '0.72rem', padding: '0.4rem 0.2rem' }}
                    onClick={() => setFoundationType('sand-cushion')}
                  >
                    🏖️ Sand Cushion
                  </button>
                  <button
                    type="button"
                    className={`vl-btn ${foundationType === 'rigid-slab' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                    style={{ fontSize: '0.72rem', padding: '0.4rem 0.2rem' }}
                    onClick={() => setFoundationType('rigid-slab')}
                  >
                    🧱 Rigid Slab
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  <span>Monsoon Flood Level:</span>
                  <strong style={{ color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace' }}>
                    {floodLevel.toFixed(1)} m
                  </strong>
                </div>
                <input
                  type="range"
                  min={0.0}
                  max={15.0}
                  step={0.5}
                  value={floodLevel}
                  onChange={(e) => setFloodLevel(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#38bdf8' }}
                />
              </div>

              <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                  GEOTECHNICAL METRICS:
                </span>

                <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Foundation Tilt (θ):</span>
                    <strong style={{ color: foundationTilt > 2.0 ? '#ef4444' : '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}>
                      {foundationTilt.toFixed(1)}°
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Pore Water Pressure:</span>
                    <strong style={{ color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace' }}>{porePressure} kPa</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Settlement Depth:</span>
                    <strong style={{ color: settlementDepth > 50 ? '#ef4444' : '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}>
                      {settlementDepth} mm
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Hydraulic Drainage:</span>
                    <strong style={{ color: foundationType === 'sand-cushion' ? '#22c55e' : '#ef4444', fontFamily: 'JetBrains Mono, monospace' }}>
                      {foundationType === 'sand-cushion' ? 'OPTIMAL (WEEPING)' : 'BLOCKED (EROSIVE)'}
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '0.9rem', padding: '0.6rem', borderRadius: '8px', background: 'rgba(24, 34, 60, 0.8)', border: '1px solid rgba(245, 158, 11, 0.25)', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <strong style={{ color: '#fde047' }}>Soil Mechanics Genius:</strong> Alternating layers of sand, granite dust, charcoal, and iron plates act as a natural hydraulic cushion. Water weeps through freely without eroding the foundation core!
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* PROTOCOL 3: VASTUPURUSHA MANDALA & FRACTAL SOLAR ALIGNMENT */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'fractal' && (
        <section className="vl-panel" style={{ background: 'linear-gradient(135deg, rgba(24,34,60,0.95), rgba(15,23,42,0.95))', border: '1.5px solid rgba(168,85,247,0.3)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#c084fc', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                PROTOCOL 03 // SACRED FRACTAL GEOMETRY &amp; CELESTIAL MECHANICS
              </span>
              <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.2rem', color: '#f8fafc', fontWeight: 800 }}>
                Vastupurusha Mandala, Recursive Spire Scaling &amp; Equinox Ray Tracing
              </h3>
            </div>
            <button
              type="button"
              className="vl-btn vl-btn--compact"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
              onClick={() => triggerAudio('वास्तुपुरुष-मण्डलम्')}
            >
              🔊 Hear Sanskrit: वास्तुपुरुष-मण्डलम्
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '1.25rem', alignItems: 'start' }}>
            {/* Canvas Display */}
            <div>
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid rgba(148, 163, 184, 0.25)' }}>
                <canvas
                  ref={fractalCanvasRef}
                  width={640}
                  height={380}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  role="img"
                  aria-label="Vastupurusha Mandala grid and recursive fractal temple spire generator"
                />
              </div>

              {/* View Switchers */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className={`vl-btn ${viewMode === 'fractal-spire' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                  style={{ flex: 1, minWidth: '130px', padding: '0.55rem 0.8rem', fontSize: '0.8rem' }}
                  onClick={() => setViewMode('fractal-spire')}
                >
                  🏛️ Fractal Spire (Urushringa)
                </button>
                <button
                  type="button"
                  className={`vl-btn ${viewMode === 'mandala' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                  style={{ flex: 1, minWidth: '130px', padding: '0.55rem 0.8rem', fontSize: '0.8rem' }}
                  onClick={() => setViewMode('mandala')}
                >
                  📐 Mandala Grid (8x8 / 9x9)
                </button>
                <button
                  type="button"
                  className={`vl-btn ${viewMode === 'solar-align' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                  style={{ flex: 1, minWidth: '130px', padding: '0.55rem 0.8rem', fontSize: '0.8rem' }}
                  onClick={() => setViewMode('solar-align')}
                >
                  ☀️ Equinox Ray Tracing
                </button>
              </div>
            </div>

            {/* Controls & Telemetry Side Panel */}
            <div style={{ background: 'rgba(15, 23, 42, 0.75)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              {viewMode === 'mandala' && (
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                    MANDALA ARCHETYPE:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                    <button
                      type="button"
                      className={`vl-btn ${mandalaGrid === '8x8' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                      style={{ fontSize: '0.75rem', padding: '0.4rem 0.2rem' }}
                      onClick={() => setMandalaGrid('8x8')}
                    >
                      Mandūka (8x8 = 64)
                    </button>
                    <button
                      type="button"
                      className={`vl-btn ${mandalaGrid === '9x9' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                      style={{ fontSize: '0.75rem', padding: '0.4rem 0.2rem' }}
                      onClick={() => setMandalaGrid('9x9')}
                    >
                      Paramaśāyika (9x9 = 81)
                    </button>
                  </div>
                </div>
              )}

              {viewMode === 'fractal-spire' && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                    <span>Fractal Recursion Depth:</span>
                    <strong style={{ color: '#c084fc', fontFamily: 'JetBrains Mono, monospace' }}>
                      Tier {fractalDepth}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    step={1}
                    value={fractalDepth}
                    onChange={(e) => setFractalDepth(parseInt(e.target.value, 10))}
                    style={{ width: '100%', accentColor: '#c084fc' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', marginTop: '0.2rem' }}>
                    <span>1: Single Tower</span>
                    <span>4: 64 Micro-Spires</span>
                  </div>
                </div>
              )}

              {viewMode === 'solar-align' && (
                <>
                  <div style={{ marginBottom: '0.9rem' }}>
                    <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                      ASTRONOMICAL SEASON:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.35rem' }}>
                      <button
                        type="button"
                        className={`vl-btn ${solarSeason === 'equinox' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                        style={{ fontSize: '0.72rem', padding: '0.35rem 0.5rem', textAlign: 'left' }}
                        onClick={() => setSolarSeason('equinox')}
                      >
                        ✨ Vernal/Autumnal Equinox (Exact East)
                      </button>
                      <button
                        type="button"
                        className={`vl-btn ${solarSeason === 'summer-solstice' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                        style={{ fontSize: '0.72rem', padding: '0.35rem 0.5rem', textAlign: 'left' }}
                        onClick={() => setSolarSeason('summer-solstice')}
                      >
                        ☀️ Summer Solstice (North of East)
                      </button>
                      <button
                        type="button"
                        className={`vl-btn ${solarSeason === 'winter-solstice' ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
                        style={{ fontSize: '0.72rem', padding: '0.35rem 0.5rem', textAlign: 'left' }}
                        onClick={() => setSolarSeason('winter-solstice')}
                      >
                        ❄️ Winter Solstice (South of East)
                      </button>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                      <span>Sun Time:</span>
                      <strong style={{ color: '#fde047', fontFamily: 'JetBrains Mono, monospace' }}>
                        {sunHour.toFixed(1)}:00 hrs
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={6.0}
                      max={18.0}
                      step={0.1}
                      value={sunHour}
                      onChange={(e) => setSunHour(parseFloat(e.target.value))}
                      style={{ width: '100%', accentColor: '#fde047' }}
                    />
                  </div>
                </>
              )}

              <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', color: '#c084fc', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                  MATHEMATICAL METRICS:
                </span>

                <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Fractal Dimension (D):</span>
                    <strong style={{ color: '#c084fc', fontFamily: 'JetBrains Mono, monospace' }}>1.892 (Mandelbrot)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Repeating Sub-Units:</span>
                    <strong style={{ color: '#fde047', fontFamily: 'JetBrains Mono, monospace' }}>
                      {Math.pow(4, fractalDepth - 1)} Uruśṛṅgas
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Apex Load Concentration:</span>
                    <strong style={{ color: '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}>
                      {Math.round(100 / Math.pow(3, fractalDepth - 1))}% (DIFFUSED)
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Brahma-Bindu Symmetry:</span>
                    <strong style={{ color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace' }}>PERFECT (100%)</strong>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '0.9rem', padding: '0.6rem', borderRadius: '8px', background: 'rgba(24, 34, 60, 0.8)', border: '1px solid rgba(168, 85, 247, 0.25)', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <strong style={{ color: '#c084fc' }}>Fractal Physics:</strong> Repeating miniature spires along the perimeter distributes the vertical load across sub-units, allowing architects to build towering monuments without apex structural collapse.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* SECTION 4: THE COMPLETE CURATED MONOGRAPH / TREATISE */}
      {/* --------------------------------------------------------------------- */}
      <section className="vl-panel" style={{ background: 'linear-gradient(135deg, rgba(24,34,60,0.95), rgba(15,23,42,0.95))', border: '1.5px solid rgba(148,163,184,0.3)', borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ borderBottom: '1.5px solid rgba(148,163,184,0.2)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#f59e0b', fontWeight: 800 }}>
            <span>●</span> ARCHIVAL TREATISE // THE MASTERS OF STONE
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#f8fafc', margin: '0.35rem 0 0.25rem' }}>
            The Masters of Stone: Chronicles of Ancient Temple Engineering
          </h2>
          <div style={{ fontSize: '0.95rem', color: '#38bdf8', fontWeight: 600 }}>
            Curated Tri-Part Research Series on Dry Masonry, Geotechnical Sand Hydrology, and Fractal Vāstu
          </div>
        </div>

        {/* ARTICLE 1 */}
        <article style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', padding: '1.4rem', border: '1.5px solid rgba(56, 189, 248, 0.3)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: 700 }}>
                ARTICLE 1 · SEISMIC ENGINEERING
              </span>
              <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', fontWeight: 800, margin: '0.35rem 0 0.15rem' }}>
                Seismic-Resistant Giants: The Engineering of Dry Masonry and Sandhi Bandhana
              </h3>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic' }}>
                By Ananya Iyer | Architectural Historian &amp; Structural Analyst
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <p>
              Long before the advent of seismic engineering, finite element analysis, or modern reinforced concrete, ancient temple artisans engineered skyscrapers of stone capable of withstanding massive earthquakes and millennia of environmental degradation. The secret to this structural immortality lies in the masterful application of <strong>Dry Masonry</strong>, known in classic architectural treatises as <strong>Sandhi Bandhana Kadhanam</strong>.
            </p>
            <p>
              Unlike modern construction, which relies on rigid, chemical-based binding agents like cement, ancient craftsmen entirely rejected mortar. They recognized that rigidity is the enemy of longevity in zones prone to shifting ground. Instead, they used highly precise interlocking stone joints, using tenon-and-mortise, dovetails, and tongue-and-groove systems meticulously chiseled directly out of granite, sandstone, or basalt.
            </p>
            <p>
              When a seismic wave strikes a temple built using <em>Sandhi Bandhana Kadhanam</em>, the structure does not resist the force rigidly; it yields dynamically. The individual stone blocks displace slightly, absorbing and dissipating the kinetic energy through friction across the vast network of precision joints. Once the tremors subside, gravity pulls the heavy stones back into their original configurations. This self-healing, kinetic blueprint allowed colossal structures like the <strong>Brihadisvara Temple in Tanjore</strong> and the <strong>Virupaksha Temple in Hampi</strong> to endure centuries of tectonic instability unscathed.
            </p>
          </div>
        </article>

        {/* ARTICLE 2 */}
        <article style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', padding: '1.4rem', border: '1.5px solid rgba(245, 158, 11, 0.3)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: 700 }}>
                ARTICLE 2 · GEOTECHNICAL HYDRO-ENGINEERING
              </span>
              <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', fontWeight: 800, margin: '0.35rem 0 0.15rem' }}>
                Foundations of Sand: Ancient Hydro-Engineering and Soil Mechanics
              </h3>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic' }}>
                By Dr. Rajesh Mukhopadhyay | Geo-Archaeological Researcher
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <p>
              The survival of massive monolithic and structural temples built on riverbeds, floodplains, and unstable soils is often attributed to divine intervention. However, a deeper look into the ground beneath these structures reveals a profound understanding of geotechnical engineering and fluid dynamics. To support millions of tons of concentrated stone weight, ancient artisans invented sophisticated multi-layered foundations designed to counter liquefaction and shifting water tables.
            </p>
            <p>
              A premier example of this is found in the 7th-century <strong>Kudavelli Sangameswara Temple</strong>, which historically stood directly at the turbulent confluence of the Krishna and Tungabhadra rivers. The builders deployed a massive, 10-meter-deep interlocking stone foundation. Crucially, these foundations were not laid blindly. Artisans dug deep trenches and packed them with alternating layers of compacted river sand, crushed granite dust, charcoal, clay, and sometimes massive iron plates.
            </p>
            <p>
              The use of sand was a deliberate stroke of genius in soil mechanics. Under high pressure or flooding, sand acts as a natural hydraulic buffer and shock absorber. It permits uniform load distribution, preventing localized sinking, while allowing groundwater to weep through without eroding the foundational core. This marriage of hydrology and geology ensured that despite severe seasonal flooding, the heavy stone masses above remained perfectly level, defying the natural tendency of soft riverine banks to give way.
            </p>
          </div>
        </article>

        {/* ARTICLE 3 */}
        <article style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', padding: '1.4rem', border: '1.5px solid rgba(168, 85, 247, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: 700 }}>
                ARTICLE 3 · FRACTAL MATHEMATICS &amp; ARCHAEOASTRONOMY
              </span>
              <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', fontWeight: 800, margin: '0.35rem 0 0.15rem' }}>
                Sacred Fractals: The Mathematics of the Vastupurusha Mandala
              </h3>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic' }}>
                By Sunita Deshmukh | Scholar of Ancient Mathematics &amp; Vastu Shastra
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <p>
              To the untrained eye, the soaring tower (Vimana) of a traditional Indian temple is an ornamental masterpiece of chaotic complexity. To a mathematician, however, it is a flawless, physically manifested execution of fractal geometry. Long before European mathematicians defined fractals in the 20th century, ancient temple architects (Sthapatis) used them as the foundational law of sacred architecture.
            </p>
            <p>
              Every temple design began with the <strong>Vastupurusha Mandala</strong>, a metaphysical square grid layout (commonly subdivided into an 8x8 or 9x9 matrix). This grid dictated a strict micro-to-macro cosmic scaling model. The primary geometric motif of the temple&apos;s central tower is repeated endlessly in miniature forms along its own exterior skin. Each smaller spire (<strong>Urushringa</strong>) is a precise, mathematically scaled-down replica of the main spire.
            </p>
            <p>
              This mathematical repetition served both aesthetic and structural mandates. By distributing the vertical load across repeating structural sub-units, architects could construct taller spires without risking structural failure due to uneven weight concentration. Furthermore, the grid aligned perfectly with the cardinal axes. Artisans calculated astronomical cycles to ensure that during equinoxes and solstices, solar rays penetrated the deepest recesses of the dark sanctum sanctorum (<strong>Garbhagriha</strong>). This fused advanced structural geometry seamlessly with celestial mechanics.
            </p>
          </div>
        </article>
      </section>

      {/* 5. Mastery Challenge Quiz */}
      <ChallengeList
        title="Temple Engineering Mastery Protocol // 4 Architectural Challenges"
        items={TEMPLE_CHALLENGES}
      />

      {/* 6. Terminology Codices */}
      <TermPanel
        title="Sanskrit Engineering &amp; Architectural Codices // Tap to Pronounce"
        terms={TEMPLE_TERMS}
      />

      {/* 7. Next Lab Action: Complete Curriculum Cycle back to Sector 01 */}
      {onNextLab && (
        <LabNextAction
          nextTitle="Paramāṇu Builder: The Atomic Seeds of Reality"
          nextCode="SEC-01"
          nextDev="परमाणु-निर्माणम्"
          nextIcon="⚛️"
          onNextLab={onNextLab}
          message="13-Sector Vijñāna Curriculum Complete! Cycle back to Sector 01: Paramāṇu Builder."
        />
      )}
    </div>
  );
};

export default TempleEngineeringLab;
