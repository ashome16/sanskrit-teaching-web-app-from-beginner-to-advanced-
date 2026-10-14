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
  const [continuousTremor, setContinuousTremor] = useState<boolean>(false);
  const [seismicIntegrity, setSeismicIntegrity] = useState<number>(100);
  const [dissipatedEnergy, setDissipatedEnergy] = useState<number>(0);
  const [maxDisplacement, setMaxDisplacement] = useState<number>(0);
  const [shearStress, setShearStress] = useState<number>(0);

  const seismicCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const seismicAnimRef = useRef<number | null>(null);
  const seismicTimeRef = useRef<number>(0);
  const blockOffsetsRef = useRef<{ x: number; y: number; rot: number; cracked: boolean }[]>([]);

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

  // ---------------------------------------------------------------------------
  // EXPERIMENT 3: Vastupurusha Mandala & Fractal Spire State
  // ---------------------------------------------------------------------------
  const [mandalaGrid, setMandalaGrid] = useState<'8x8' | '9x9'>('8x8');
  const [fractalDepth, setFractalDepth] = useState<number>(3); // 1 to 4
  const [viewMode, setViewMode] = useState<'mandala' | 'fractal-spire' | 'solar-align'>('fractal-spire');
  const [sunHour, setSunHour] = useState<number>(6.0); // 6 AM dawn to 18 PM dusk
  const [solarSeason, setSolarSeason] = useState<'equinox' | 'summer-solstice' | 'winter-solstice'>('equinox');

  const fractalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fractalAnimRef = useRef<number | null>(null);
  const fractalTimeRef = useRef<number>(0);

  // ---------------------------------------------------------------------------
  // Canvas Loop 1: Seismic Dry Masonry vs. Rigid Mortar
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // Initialize block positions
    const rows = 6;
    const blocksPerRow = 5;
    const totalBlocks = rows * blocksPerRow;
    if (blockOffsetsRef.current.length !== totalBlocks) {
      blockOffsetsRef.current = Array.from({ length: totalBlocks }, () => ({
        x: 0,
        y: 0,
        rot: 0,
        cracked: false,
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

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#090e17');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Bedrock Ground
      const groundY = h - 55;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, groundY, w, 55);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(w, groundY);
      ctx.stroke();

      // Bedrock geological stripes
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.setLineDash([8, 8]);
      for (let i = groundY + 15; i < h; i += 14) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(w, i);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      const activeQuake = isQuaking || continuousTremor;
      const amplitude = activeQuake ? (seismicMag - 3.5) * 4.5 : 0;
      const groundShift = activeQuake ? Math.sin(t * 12) * amplitude : 0;

      // Ground vibration wave graphics
      if (activeQuake) {
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x < w; x += 10) {
          const y = groundY + Math.sin(x * 0.05 + t * 10) * (amplitude * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw Multi-Tier Temple Tower Blocks
      const bW = 60;
      const bH = 34;
      let currStress = 0;
      let maxDisp = 0;

      for (let r = rows - 1; r >= 0; r--) {
        const rowBlocks = blocksPerRow - (rows - 1 - r); // Stepped pyramidal shape
        const rowStartX = w / 2 - (rowBlocks * bW) / 2 + groundShift;
        const baseY = groundY - (rows - r) * bH;

        for (let c = 0; c < rowBlocks; c++) {
          const idx = r * blocksPerRow + c;
          const bData = blockOffsetsRef.current[idx] || { x: 0, y: 0, rot: 0, cracked: false };

          if (activeQuake) {
            const heightFactor = (rows - r) * 0.35;
            if (masonryMode === 'dry') {
              // Kinetic joint yielding: blocks slide slightly by friction
              const targetOffsetX = Math.sin(t * 10 + r * 0.5) * amplitude * heightFactor * 0.4;
              bData.x += (targetOffsetX - bData.x) * 0.25;
              bData.rot = Math.sin(t * 8 + c) * 0.015 * heightFactor;
              bData.cracked = false;
              maxDisp = Math.max(maxDisp, Math.abs(bData.x));
              currStress = Math.min(32, seismicMag * 3.4);
            } else {
              // Rigid cement mortar: brittle, cracks propagate, stress spikes
              currStress = seismicMag * 11.8;
              if (seismicMag >= 6.0) {
                bData.cracked = true;
                bData.x += (Math.sin(t * 14 + r) * amplitude * 1.3 - bData.x) * 0.15;
                bData.rot += (Math.random() - 0.5) * 0.04;
                if (r <= 2) {
                  // Upper blocks tumble
                  bData.y += 0.8;
                }
              }
            }
          } else {
            // Tremor ceases: Gravity restores Sandhi Bandhana to exact plumb!
            if (masonryMode === 'dry') {
              bData.x *= 0.88;
              bData.y *= 0.88;
              bData.rot *= 0.85;
            }
          }

          const blockX = rowStartX + c * bW + bData.x;
          const blockY = baseY + bData.y;

          ctx.save();
          ctx.translate(blockX + bW / 2, blockY + bH / 2);
          ctx.rotate(bData.rot);

          // Draw Stone Block
          ctx.fillStyle = bData.cracked ? '#7f1d1d' : masonryMode === 'dry' ? '#334155' : '#475569';
          ctx.strokeStyle = bData.cracked ? '#ef4444' : masonryMode === 'dry' ? '#38bdf8' : '#94a3b8';
          ctx.lineWidth = 1.8;

          ctx.beginPath();
          ctx.roundRect(-bW / 2, -bH / 2, bW - 2, bH - 2, 3);
          ctx.fill();
          ctx.stroke();

          // Interlocking Joinery Visuals (Tenon & Mortise / Dovetails)
          if (masonryMode === 'dry') {
            ctx.fillStyle = '#0284c7';
            // Tenon (Key lock in center)
            ctx.fillRect(-6, -bH / 2 - 3, 12, 6);
            // Mortise groove visual indicator
            ctx.strokeStyle = '#38bdf8';
            ctx.strokeRect(-8, bH / 2 - 4, 16, 4);
          } else if (bData.cracked) {
            // Jagged fracture line
            ctx.strokeStyle = '#f87171';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-15, -10);
            ctx.lineTo(0, 5);
            ctx.lineTo(12, -8);
            ctx.stroke();
          }

          // Inner stone texture & Sanskrit mark
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(masonryMode === 'dry' ? 'सन्धि' : 'बन्ध', 0, 0);

          ctx.restore();
        }
      }

      // Draw Top Kumbham / Shikhara Capstone
      const topRowStartX = w / 2 - bW / 2 + groundShift;
      const topY = groundY - (rows + 1) * bH;
      ctx.save();
      ctx.translate(topRowStartX + bW / 2, topY + bH / 2);
      ctx.fillStyle = '#f59e0b';
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Kalasha Finial Spire
      ctx.beginPath();
      ctx.moveTo(-6, -18);
      ctx.lineTo(0, -38);
      ctx.lineTo(6, -18);
      ctx.closePath();
      ctx.fillStyle = '#fef08a';
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Update telemetry
      if (activeQuake) {
        setMaxDisplacement(Number(maxDisp.toFixed(1)));
        setShearStress(Number(currStress.toFixed(1)));
        if (masonryMode === 'dry') {
          setDissipatedEnergy(Math.min(94, Math.round(seismicMag * 11.5)));
          setSeismicIntegrity(98);
        } else {
          setDissipatedEnergy(Math.round(seismicMag * 3.2));
          setSeismicIntegrity(seismicMag >= 6.0 ? Math.max(12, 100 - (seismicMag - 5.5) * 35) : 75);
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

  // ---------------------------------------------------------------------------
  // Canvas Loop 2: Kudavelli Sand Foundation Hydro-Mechanics
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
      const groundY = 110;
      const graniteCapY = 155;
      const sandBedY = 225;
      const charcoalY = 275;
      const clayIronY = 325;
      const riverbedY = h;

      // 1. Water Flood Level Overlay on Riverbank
      const floodHeightPx = (floodLevel / 15) * 80;
      const currentWaterY = groundY - floodHeightPx;

      // Sky
      ctx.fillStyle = '#090e17';
      ctx.fillRect(0, 0, w, groundY);

      // 2. Foundation Layers
      // Layer 1: Granite Padma-Pitha Foundation Cap
      ctx.fillStyle = '#334155';
      ctx.fillRect(40, groundY, w - 80, graniteCapY - groundY);
      ctx.strokeStyle = '#64748b';
      ctx.strokeRect(40, groundY, w - 80, graniteCapY - groundY);

      // Layer 2: Compacted River Sand Bed
      if (foundationType === 'sand-cushion') {
        const sandGrad = ctx.createLinearGradient(0, graniteCapY, 0, sandBedY);
        sandGrad.addColorStop(0, '#d97706');
        sandGrad.addColorStop(1, '#b45309');
        ctx.fillStyle = sandGrad;
        ctx.fillRect(40, graniteCapY, w - 80, sandBedY - graniteCapY);

        // Animated Sand Grains / Hydraulic Drainage Lines
        ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
        for (let i = 0; i < 45; i++) {
          const sx = 45 + ((i * 37 + t * 25) % (w - 90));
          const sy = graniteCapY + ((i * 19 + t * 15) % (sandBedY - graniteCapY));
          ctx.fillRect(sx, sy, 2, 2);
        }

        // Weeping Groundwater Blue Streamlines
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        for (let j = 0; j < 4; j++) {
          const lineY = graniteCapY + 15 + j * 16;
          ctx.beginPath();
          ctx.moveTo(45, lineY);
          ctx.bezierCurveTo(w / 3, lineY + Math.sin(t + j) * 4, (2 * w) / 3, lineY - Math.sin(t + j) * 4, w - 45, lineY);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      } else {
        // Rigid concrete slab directly on soft river silt
        ctx.fillStyle = '#475569';
        ctx.fillRect(40, graniteCapY, w - 80, sandBedY - graniteCapY);
      }

      // Layer 3: Crushed Granite Dust & Charcoal Bed
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(40, sandBedY, w - 80, charcoalY - sandBedY);
      // Charcoal specks
      ctx.fillStyle = '#0f172a';
      for (let k = 0; k < 25; k++) {
        ctx.fillRect(50 + (k * 22) % (w - 100), sandBedY + (k * 7) % 40, 5, 4);
      }

      // Layer 4: Compacted Clay & Interlocking Iron Plates
      ctx.fillStyle = '#78350f';
      ctx.fillRect(40, charcoalY, w - 80, clayIronY - charcoalY);
      // Iron plates
      ctx.fillStyle = '#94a3b8';
      for (let m = 0; m < 5; m++) {
        ctx.fillRect(60 + m * 95, clayIronY - 14, 80, 7);
      }

      // Layer 5: Saturated Riverbed Aquifer
      ctx.fillStyle = '#0c4a6e';
      ctx.fillRect(0, clayIronY, w, riverbedY - clayIronY);

      // Water Table / Flood Inundation
      ctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.fillRect(0, currentWaterY, w, groundY - currentWaterY);

      // Temple Superstructure (Kudavelli Sangameswara Silhouette)
      const templeTilt = foundationType === 'rigid-slab' && (floodLevel > 7 || isLiquefying) ? 0.085 : 0;
      setFoundationTilt(foundationType === 'rigid-slab' ? 8.5 : 0.0);
      setSettlementDepth(foundationType === 'rigid-slab' ? 142 : 3.2);
      setPorePressure(Math.round(80 + floodLevel * 14.5 + (isLiquefying ? 65 : 0)));

      ctx.save();
      ctx.translate(w / 2, groundY);
      ctx.rotate(templeTilt);

      // Temple Base Plinth
      ctx.fillStyle = '#d97706';
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 2;
      ctx.fillRect(-120, -35, 240, 35);
      ctx.strokeRect(-120, -35, 240, 35);

      // Sanctum Wall
      ctx.fillStyle = '#b45309';
      ctx.fillRect(-85, -85, 170, 50);
      ctx.strokeRect(-85, -85, 170, 50);

      // Stepped Tower (Vimana)
      for (let step = 0; step < 4; step++) {
        const stepW = 140 - step * 25;
        const stepH = 16;
        const stepY = -85 - (step + 1) * stepH;
        ctx.fillStyle = '#78350f';
        ctx.fillRect(-stepW / 2, stepY, stepW, stepH);
        ctx.strokeRect(-stepW / 2, stepY, stepW, stepH);
      }

      // Shikhara Dome & Kalasha
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, -165, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      // Stratigraphy Annotation Labels
      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText('▼ TEMPLE SUPERSTRUCTURE (10,000+ TONS)', 50, 40);
      ctx.fillText('1. GRANITE PADMA-PĪṬHA FOUNDATION CAP', 50, graniteCapY - 12);
      ctx.fillStyle = foundationType === 'sand-cushion' ? '#fde047' : '#cbd5e1';
      ctx.fillText(
        foundationType === 'sand-cushion'
          ? '2. COMPACTED RIVER SAND BED (HYDRAULIC BUFFER & WEEPING DRAINAGE)'
          : '2. RIGID SLAB (PRONE TO LIQUEFACTION SCOUR)',
        50,
        sandBedY - 12
      );
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('3. CRUSHED GRANITE DUST & CHARCOAL (PORE FILTRATION)', 50, charcoalY - 12);
      ctx.fillText('4. COMPACTED CLAY & INTERLOCKING IRON PLATES', 50, clayIronY - 12);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('5. KRISHNA-TUNGABHADRA SATURATED RIVERBED AQUIFER', 50, clayIronY + 22);

      hydroAnimRef.current = requestAnimationFrame(renderHydro);
    };

    hydroAnimRef.current = requestAnimationFrame(renderHydro);

    return () => {
      running = false;
      if (hydroAnimRef.current) cancelAnimationFrame(hydroAnimRef.current);
    };
  }, [foundationType, floodLevel, isLiquefying]);

  // ---------------------------------------------------------------------------
  // Canvas Loop 3: Vastupurusha Mandala & Fractal Solar Alignment
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

      // Background
      ctx.fillStyle = '#090e17';
      ctx.fillRect(0, 0, w, h);

      if (viewMode === 'mandala') {
        // Draw 8x8 or 9x9 Vastupurusha Mandala Grid
        const gridDim = mandalaGrid === '8x8' ? 8 : 9;
        const cellSize = Math.min((w - 140) / gridDim, (h - 60) / gridDim);
        const startX = w / 2 - (gridDim * cellSize) / 2;
        const startY = h / 2 - (gridDim * cellSize) / 2;

        for (let r = 0; r < gridDim; r++) {
          for (let c = 0; c < gridDim; c++) {
            const px = startX + c * cellSize;
            const py = startY + r * cellSize;

            // Determine if Brahma-Pada (center)
            const isCenter =
              gridDim === 8
                ? (r === 3 || r === 4) && (c === 3 || c === 4)
                : (r === 3 || r === 4 || r === 5) && (c === 3 || c === 4 || c === 5);

            // Determine corner (Deva-Pada / Dikpālas)
            const isCorner =
              (r === 0 && c === 0) ||
              (r === 0 && c === gridDim - 1) ||
              (r === gridDim - 1 && c === 0) ||
              (r === gridDim - 1 && c === gridDim - 1);

            ctx.fillStyle = isCenter
              ? 'rgba(245, 158, 11, 0.45)'
              : isCorner
              ? 'rgba(6, 182, 212, 0.25)'
              : 'rgba(30, 41, 59, 0.7)';

            ctx.strokeStyle = isCenter ? '#f59e0b' : '#475569';
            ctx.lineWidth = isCenter ? 2.5 : 1;

            ctx.fillRect(px, py, cellSize, cellSize);
            ctx.strokeRect(px, py, cellSize, cellSize);

            if (isCenter) {
              ctx.fillStyle = '#fde047';
              ctx.font = '10px Noto Sans Devanagari, serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('ब्रह्म', px + cellSize / 2, py + cellSize / 2);
            }
          }
        }

        // Cardinal Energy Diagonal Lines
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + gridDim * cellSize, startY + gridDim * cellSize);
        ctx.moveTo(startX + gridDim * cellSize, startY);
        ctx.lineTo(startX, startY + gridDim * cellSize);
        ctx.stroke();
        ctx.setLineDash([]);

        // Labels
        ctx.fillStyle = '#f8fafc';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`VASTUPURUSHA MANDALA (${gridDim}x${gridDim} = ${gridDim * gridDim} PADAS)`, w / 2, 24);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('EAST (PŪRVA · INDRA)', w - 60, h / 2);
        ctx.fillText('WEST (PAŚCIMA · VARUṆA)', 60, h / 2);
        ctx.fillText('NORTH (UTTARA · KUBERA)', w / 2, startY - 10);
        ctx.fillText('SOUTH (DAKṢIṆA · YAMA)', w / 2, startY + gridDim * cellSize + 20);
      } else if (viewMode === 'fractal-spire') {
        // Draw 3D-Style Recursive Fractal Vimana Tower
        const cx = w / 2;
        const cy = h / 2 + 70;
        const baseSize = 220;

        // Recursive Pyramid Spire Drawing Helper
        const drawSpire = (x: number, y: number, size: number, depth: number) => {
          if (depth <= 0 || size < 12) return;

          // Base tier
          ctx.fillStyle = depth === fractalDepth ? 'rgba(245, 158, 11, 0.3)' : 'rgba(56, 189, 248, 0.25)';
          ctx.strokeStyle = depth === fractalDepth ? '#f59e0b' : '#38bdf8';
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          ctx.moveTo(x - size / 2, y);
          ctx.lineTo(x, y - size * 0.9);
          ctx.lineTo(x + size / 2, y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Sub-spires (Urushringas) on flanks
          const subSize = size * 0.48;
          if (depth > 1) {
            // Left subsidiary spire
            drawSpire(x - size * 0.32, y, subSize, depth - 1);
            // Right subsidiary spire
            drawSpire(x + size * 0.32, y, subSize, depth - 1);
            // Center tiered mini spire
            drawSpire(x, y - size * 0.42, subSize * 0.85, depth - 1);
          }
        };

        drawSpire(cx, cy, baseSize, fractalDepth);

        // Kalasha Top Crest
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(cx, cy - baseSize * 0.9 - 10, 8, 0, Math.PI * 2);
        ctx.fill();

        // Structural load vector arrows showing weight dispersion
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        for (let s = -2; s <= 2; s++) {
          const arrowX = cx + s * 45;
          ctx.beginPath();
          ctx.moveTo(arrowX, cy - 35);
          ctx.lineTo(arrowX, cy + 20);
          ctx.stroke();
          // Arrowhead
          ctx.beginPath();
          ctx.moveTo(arrowX - 4, cy + 12);
          ctx.lineTo(arrowX, cy + 20);
          ctx.lineTo(arrowX + 4, cy + 12);
          ctx.stroke();
        }

        ctx.fillStyle = '#86efac';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('▼ UNIFORM GRAVITY LOAD SPREAD (NO CENTRAL APEX CRUSH)', cx, cy + 38);
      } else if (viewMode === 'solar-align') {
        // Solar Equinox Ray Tracing Simulation
        const sanctumX = 140;
        const sanctumY = h / 2;
        const gopuramX = w - 120;

        // Ground & Temple Enclosure
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(80, h / 2 - 70, w - 160, 140);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.strokeRect(80, h / 2 - 70, w - 160, 140);

        // Sanctum Sanctorum (Garbhagriha) Room
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(sanctumX - 35, sanctumY - 35, 70, 70);
        ctx.strokeStyle = '#f59e0b';
        ctx.strokeRect(sanctumX - 35, sanctumY - 35, 70, 70);

        // Shivalinga / Deity in Sanctum
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.arc(sanctumX, sanctumY, 12, 0, Math.PI * 2);
        ctx.fill();

        // Gopuram Door Portals along the axis
        ctx.strokeStyle = '#38bdf8';
        ctx.strokeRect(gopuramX - 15, sanctumY - 24, 30, 48); // Outer Gate
        ctx.strokeRect(w / 2 - 12, sanctumY - 20, 24, 40); // Mandapa Portal

        // Calculate Sun Position based on Hour and Season
        const sunAngle = ((sunHour - 6) / 12) * Math.PI - Math.PI / 2;
        const seasonOffset = solarSeason === 'equinox' ? 0 : solarSeason === 'summer-solstice' ? -35 : 35;
        const sunX = w - 60 + Math.cos(sunAngle) * 45;
        const sunY = h / 2 + Math.sin(sunAngle) * 110 + seasonOffset;

        // Draw Sun
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
        ctx.fill();

        // Sun Corona Rays
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.4)';
        ctx.lineWidth = 3;
        for (let r = 0; r < 8; r++) {
          const a = (r / 8) * Math.PI * 2 + t;
          ctx.beginPath();
          ctx.moveTo(sunX + Math.cos(a) * 22, sunY + Math.sin(a) * 22);
          ctx.lineTo(sunX + Math.cos(a) * 32, sunY + Math.sin(a) * 32);
          ctx.stroke();
        }

        // Trace Solar Ray beam
        const isEquinoxAligned = solarSeason === 'equinox' && sunHour >= 5.8 && sunHour <= 6.8;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);

        if (isEquinoxAligned) {
          // Ray travels unimpeded straight into the Garbhagriha!
          ctx.lineTo(sanctumX, sanctumY);
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.9)';
          ctx.lineWidth = 5;
          ctx.shadowColor = '#fde047';
          ctx.shadowBlur = 20;
          ctx.stroke();

          // Golden illumination inside Sanctum!
          ctx.fillStyle = 'rgba(253, 224, 71, 0.7)';
          ctx.beginPath();
          ctx.arc(sanctumX, sanctumY, 26, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#f8fafc';
          ctx.font = '12px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('✨ EQUINOX SUNBEAM ILLUMINATES INNER GARBHAGṚHA!', w / 2, 40);
        } else {
          // Blocked by gopuram wall or misses axis
          ctx.lineTo(gopuramX + 15, sunY);
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.35)';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#cbd5e1';
          ctx.font = '11px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText(
            solarSeason === 'equinox'
              ? '☀️ Set Sun Hour to 6:00 AM (Dawn) to trigger Sanctum Illumination'
              : '☀️ Switch season to Vernal/Autumnal Equinox to align beam with Cardinal Doorway',
            w / 2,
            40
          );
        }
        ctx.restore();
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
                <canvas
                  ref={seismicCanvasRef}
                  width={640}
                  height={380}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  role="img"
                  aria-label="Interactive seismic simulation showing dry masonry interlocking joints dissipating kinetic energy"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber"
                  style={{ flex: 1, minWidth: '160px', padding: '0.6rem 1rem', fontSize: '0.85rem' }}
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
                  style={{ padding: '0.6rem 1rem', fontSize: '0.82rem' }}
                  onClick={() => setContinuousTremor((p) => !p)}
                >
                  {continuousTremor ? '⏹ Stop Tremor' : '🌊 Continuous Tremor'}
                </button>
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber-ghost"
                  style={{ padding: '0.6rem 1rem', fontSize: '0.82rem' }}
                  onClick={() => {
                    setIsQuaking(false);
                    setContinuousTremor(false);
                    blockOffsetsRef.current.forEach((b) => {
                      b.x = 0;
                      b.y = 0;
                      b.rot = 0;
                      b.cracked = false;
                    });
                    setSeismicIntegrity(100);
                    setMaxDisplacement(0);
                    setShearStress(0);
                  }}
                >
                  ↺ Reset Stones
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
