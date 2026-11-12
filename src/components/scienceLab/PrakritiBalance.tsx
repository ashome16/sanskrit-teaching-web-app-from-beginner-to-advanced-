import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { ChallengeList, TermPanel, type LabChallenge, type LabTerm, type LabSegmentProps } from './common';
import { GlowSlider } from './controls';
import { soundEffects } from '../../utils/soundEffects';

/* =========================================================================
   PRAKṚTI BIOSPHERE & CELLULAR HOMEOSTASIS
   Combines Macro-Ecology (Food Web, Trophic Cascades, Annād Bhavanti Bhūtāni)
   with Micro-Cellular Tri-Doṣa Homeostasis.
   ========================================================================= */

type LabViewMode = 'biosphere' | 'cellular';

// -------------------------------------------------------------------------
// 1. MACRO-ECOLOGICAL BIOSPHERE TYPES & CONFIG
// -------------------------------------------------------------------------
export type BiosphereScenario = 'free' | 'restore_degraded' | 'prevent_overgrazing' | 'manage_drought' | 'trophic_cascade';

interface BiosphereScenarioConfig {
  id: BiosphereScenario;
  titleDev: string;
  titleEn: string;
  badge: string;
  desc: string;
  initial: {
    rainfall: number;      // 0-100 mm
    temperature: number;   // 10-45 °C
    plantDensity: number;  // 0-100%
    herbivores: number;    // 0-100
    carnivores: number;    // 0-30
    soilNutrients: number; // 0-100%
  };
  goal: string;
  successCondition: (state: BiosphereState) => boolean;
  explanation: string;
}

interface BiosphereState {
  timeStep: number;
  producers: number;     // Plant biomass 0-100
  herbivores: number;    // Herbivore count 0-100
  carnivores: number;    // Carnivore count 0-40
  decomposers: number;   // Soil microbes/fungi 0-100
  soilNutrients: number; // Organic humus 0-100
  oxygen: number;        // Atmospheric O2 percentage (norm ~21%)
  carbonDioxide: number; // Atmospheric CO2 relative index
  biodiversity: number;  // Shannon-Wiener proxy index (0-100)
  resilience: number;    // Resistance to collapse (0-100)
}

interface HistoryPoint {
  step: number;
  producers: number;
  herbivores: number;
  carnivores: number;
  decomposers: number;
}

const SCENARIOS: Record<BiosphereScenario, BiosphereScenarioConfig> = {
  free: {
    id: 'free',
    titleDev: 'मुक्त-अन्वेषणम्',
    titleEn: 'Free Biome Exploration',
    badge: 'Sandbox Mode',
    desc: 'Freely adjust rainfall, temperature, plants, grazers, and apex predators to observe non-linear trophic oscillations.',
    initial: { rainfall: 65, temperature: 26, plantDensity: 65, herbivores: 45, carnivores: 12, soilNutrients: 70 },
    goal: 'Maintain stable multi-trophic cycles without any trophic tier falling to zero.',
    successCondition: (s) => s.producers > 20 && s.herbivores > 10 && s.carnivores > 3 && s.timeStep > 15,
    explanation: 'Natural ecosystems fluctuate continuously around dynamic equilibrium points. Diversity and feedback loops absorb shocks.',
  },
  restore_degraded: {
    id: 'restore_degraded',
    titleDev: 'मरुभूमि-पुनरुद्धारः',
    titleEn: 'Restore Degraded Land',
    badge: 'Mission 1',
    desc: 'The ridge has been turned to arid dust: soil nutrients are stripped and zero plants survive. Rebuild the soil humus, cultivate pioneer vegetation, and bring back life.',
    initial: { rainfall: 30, temperature: 36, plantDensity: 5, herbivores: 0, carnivores: 0, soilNutrients: 15 },
    goal: 'Raise soil nutrients above 55% and plant density above 50% for 10 time steps.',
    successCondition: (s) => s.soilNutrients >= 55 && s.producers >= 50,
    explanation: 'Degraded land requires pioneer vegetation and decomposer microbes to rebuild organic humus before it can support herbivores.',
  },
  prevent_overgrazing: {
    id: 'prevent_overgrazing',
    titleDev: 'अतिचारण-नियन्त्रणम्',
    titleEn: 'Prevent Overgrazing',
    badge: 'Mission 2',
    desc: 'Herbivore population has exploded with zero predators, threatening to devour all root networks and cause irreversible topsoil erosion.',
    initial: { rainfall: 60, temperature: 27, plantDensity: 30, herbivores: 92, carnivores: 0, soilNutrients: 45 },
    goal: 'Rebalance grazing pressure so plant density recovers above 45% while preserving at least 25 herbivores.',
    successCondition: (s) => s.producers >= 45 && s.herbivores >= 25 && s.herbivores <= 60,
    explanation: 'Without apex predators or managed grazing rotations, herbivores experience a boom-and-bust cycle that destroys primary producers.',
  },
  manage_drought: {
    id: 'manage_drought',
    titleDev: 'अनावृष्टि-प्रबन्धनम्',
    titleEn: 'Drought Survival Crisis',
    badge: 'Mission 3',
    desc: 'The monsoon has failed: rainfall drops to 15 mm and heat spikes. Test how high soil organic matter and biodiversity protect the biome from total collapse.',
    initial: { rainfall: 15, temperature: 40, plantDensity: 75, herbivores: 45, carnivores: 10, soilNutrients: 85 },
    goal: 'Survive 15 time steps without plant biomass collapsing below 15%.',
    successCondition: (s) => s.producers >= 15 && s.timeStep >= 15,
    explanation: 'Deep-rooted perennial plants and rich organic soil hold groundwater like a sponge, allowing life to survive severe seasonal drought.',
  },
  trophic_cascade: {
    id: 'trophic_cascade',
    titleDev: 'परभक्षि-पुनरागमनम्',
    titleEn: 'Apex Predator Reintroduction',
    badge: 'Mission 4',
    desc: 'Riverbanks are eroding because unchecked deer herds are trampling saplings. Reintroduce apex predators (tigers / wolves) to trigger a positive trophic cascade.',
    initial: { rainfall: 70, temperature: 25, plantDensity: 20, herbivores: 85, carnivores: 2, soilNutrients: 50 },
    goal: 'Introduce at least 10 predators and let the trophic cascade boost plant density above 60%.',
    successCondition: (s) => s.carnivores >= 8 && s.producers >= 60,
    explanation: 'Apex predators not only reduce grazer numbers but alter grazer behavior, keeping them moving and allowing riverbank vegetation and songbirds to recover.',
  },
};

// -------------------------------------------------------------------------
// 2. CELLULAR HOMEOSTASIS (TRI-DOṢA) TYPES & DATA (Preserved from earlier)
// -------------------------------------------------------------------------
type Ritu = 'grishma' | 'varsha' | 'sisira' | 'vasanta';

const RITU_PRESETS: Record<Ritu, { dev: string; iast: string; name: string; icon: string; desc: string; heat: number; cold: number; dry: number; moist: number; activity: number }> = {
  grishma: {
    dev: 'ग्रीष्म',
    iast: 'grīṣma',
    name: 'Harsh Summer',
    icon: '☀️',
    desc: 'Intense thermal radiation accelerates mitochondrial glycolysis and thins membrane lipids (High Pitta).',
    heat: 9, cold: 1, dry: 7, moist: 3, activity: 8
  },
  varsha: {
    dev: 'वर्षा',
    iast: 'varṣā',
    name: 'Monsoon Flooding',
    icon: '🌧️',
    desc: 'Heavy atmospheric humidity weakens enzymatic digestion, inducing cellular sluggishness (High Kapha/Vāta).',
    heat: 3, cold: 6, dry: 1, moist: 9, activity: 2
  },
  sisira: {
    dev: 'शिशिर',
    iast: 'śiśira',
    name: 'Freezing Winter',
    icon: '❄️',
    desc: 'Severe cryogenic dryness stiffens cytoskeletal filaments and increases electrical shear (High Vāta).',
    heat: 1, cold: 9, dry: 9, moist: 2, activity: 7
  },
  vasanta: {
    dev: 'वसन्त',
    iast: 'vasanta',
    name: 'Spring Thaw',
    icon: '🌸',
    desc: 'Rising ambient warmth liquefies accumulated cytosolic lipids, increasing macromolecular crowding.',
    heat: 6, cold: 4, dry: 4, moist: 7, activity: 5
  },
};

const RITU_KEYS: Ritu[] = ['grishma', 'varsha', 'sisira', 'vasanta'];

interface EnvState {
  ritu: Ritu;
  heat: number;
  cold: number;
  dry: number;
  moist: number;
  activity: number;
}

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

const calculateThermodynamicDoshas = (e: EnvState) => {
  const d = (n: number) => n - 5;
  const rawPitta = 50 + 5.5 * d(e.heat) - 3.5 * d(e.cold) + 0.8 * d(e.activity);
  const rawVata = 50 + 4.0 * d(e.dry) + 2.5 * d(e.cold) + 3.0 * d(e.activity) - 2.8 * d(e.moist);
  const rawKapha = 50 + 4.5 * d(e.moist) + 2.0 * d(e.cold) - 3.2 * d(e.activity) - 2.8 * d(e.heat) - 2.0 * d(e.dry);

  const pDelta = rawPitta - 50;
  const vCross = rawVata + 0.35 * Math.max(0, pDelta);
  const kCross = rawKapha - 0.40 * Math.max(0, pDelta);

  const kDelta = kCross - 50;
  const vCoupled = vCross - 0.28 * Math.max(0, kDelta);
  const pCoupled = rawPitta - 0.22 * Math.max(0, kDelta);

  const vDelta = vCoupled - 50;
  const finalKapha = kCross - 0.25 * Math.max(0, vDelta);

  return {
    vata: clamp(Math.round(vCoupled)),
    pitta: clamp(Math.round(pCoupled)),
    kapha: clamp(Math.round(finalKapha)),
  };
};

type OrganelleKey = 'akasa' | 'vayu' | 'tejas' | 'ap' | 'prithivi';

interface OrganelleInfo {
  key: OrganelleKey;
  element: string;
  dev: string;
  organelle: string;
  icon: string;
  color: string;
  role: string;
  biophysics: string;
}

const ORGANELLES: Record<OrganelleKey, OrganelleInfo> = {
  akasa: {
    key: 'akasa',
    element: 'Ākāśa (Space)',
    dev: 'आकाश',
    organelle: 'Cytosolic Void & Lumens',
    icon: '🌌',
    color: '#38bdf8',
    role: 'The non-crowded intracellular volume that provides open pathways for macromolecular diffusion.',
    biophysics: 'Diffusion Coefficient D ≈ 10⁻⁶ cm²/s'
  },
  vayu: {
    key: 'vayu',
    element: 'Vāyu (Air)',
    dev: 'वायु',
    organelle: 'Na⁺/K⁺ ATPase & Ion Pumps',
    icon: '💨',
    color: '#c084fc',
    role: 'Active transmembrane kinetic movement of ions and respiratory gases across electrochemical gradients.',
    biophysics: 'Resting Potential V_m ≈ -70 mV'
  },
  tejas: {
    key: 'tejas',
    element: 'Tejas (Fire)',
    dev: 'तेजस्',
    organelle: 'Mitochondrial Cristae',
    icon: '🔥',
    color: '#fb923c',
    role: 'Oxidative phosphorylation, ATP synthesis, and enzymatic catabolic transformations generating thermodynamic heat.',
    biophysics: 'Free Energy ΔG° ≈ -30.5 kJ/mol'
  },
  ap: {
    key: 'ap',
    element: 'Ap (Water)',
    dev: 'अप्',
    organelle: 'Cytoplasmic Hydration Shell',
    icon: '💧',
    color: '#34d399',
    role: 'Aqueous solvent matrix supporting protein folding, enzyme mobility, and osmotic turgor pressure.',
    biophysics: 'Osmotic Turgor P ≈ 240 kPa'
  },
  prithivi: {
    key: 'prithivi',
    element: 'Pṛthivī (Earth)',
    dev: 'पृथिवी',
    organelle: 'Cytoskeleton & Microtubules',
    icon: '🏔️',
    color: '#eab308',
    role: 'Dense structural polymers providing cell geometry, mechanical rigidity, and resistance against osmotic lysis.',
    biophysics: 'Elastic Modulus E ≈ 2.4 kPa'
  },
};

const TERMS: LabTerm[] = [
  { dev: 'जैवमण्डलम्', iast: 'jaivamaṇḍalam', en: 'Biosphere — the global ecological system integrating all living beings and their relationships' },
  { dev: 'पर्जन्यः', iast: 'parjanyaḥ', en: 'Rain-cloud & atmospheric precipitation matrix sustaining terrestrial vegetation' },
  { dev: 'अन्नम्', iast: 'annam', en: 'Biomass & nourishment — primary producer carbohydrates sustaining the food web' },
  { dev: 'उत्पादकाः', iast: 'utpādakāḥ', en: 'Primary Producers (autotrophs): plants and photosynthetic vegetation' },
  { dev: 'शाकाहारिणः', iast: 'śākāhāriṇaḥ', en: 'Herbivores (primary consumers): grazers directly consuming plant biomass' },
  { dev: 'मांसाहारिणः', iast: 'māṁsāhāriṇaḥ', en: 'Carnivores (apex predators): regulators of herbivore populations and grazing pressure' },
  { dev: 'अपघटकाः', iast: 'apaghaṭakāḥ', en: 'Decomposers (mycorrhizae & bacteria): recycling organic detritus into bioavailable soil humus' },
];

const CHALLENGES: LabChallenge[] = [
  {
    q: 'According to the ecological principle “Annād bhavanti bhūtāni parjanyād anna-sambhavaḥ”, where does all life’s energy originate, and how does rain drive it?',
    options: [
      'Rainfall (Parjanya) dissolves soil minerals and powers photosynthesis, yielding plant food (Anna) that sustains all living beings (Bhūtāni).',
      'Rainfall directly turns into carbon dioxide inside animal lungs.',
      'Animals create their own food without plants or moisture.',
      'Plants eat herbivores to make rain in the sky.',
    ],
    answer: 0,
    explain: 'Taittirīya Upaniṣad and Bhagavad Gītā 3.14 establish the solar-meteorological food chain: solar radiation cycles precipitation (Parjanya), which enables vegetative photosynthesis (Anna), nourishing all organisms (Bhūtāni).',
  },
  {
    q: 'Why is an ecosystem with high biodiversity more resilient to severe drought than a monoculture crop field?',
    options: [
      'Different species have varied root depths, water-use strategies, and mycorrhizal networks that buffer the entire soil sponge from drying out.',
      'Monocultures produce too much rain, causing flooding.',
      'Biodiverse ecosystems have no herbivores, so plants never get eaten.',
      'All plants in a biodiverse forest are identical clones.',
    ],
    answer: 0,
    explain: 'Ecological resilience relies on functional redundancy and structural diversity: deep taproots draw deep groundwater, canopy layers reduce surface evaporation, and diverse fungi maintain nutrient flux even when surface rainfall drops.',
  },
  {
    q: 'What ecological disaster occurs when all apex predators (Carnivores) are completely removed from a grassland?',
    options: [
      'Herbivores multiply unchecked, consume plants faster than regeneration rates, cause topsoil erosion, and eventually starve.',
      'Plants grow exponentially without stopping, covering the entire planet.',
      'Rainfall permanently stops across the continent.',
      'Herbivores transform into carnivores within two days.',
    ],
    answer: 0,
    explain: 'This classic trophic cascade (observed in Yellowstone and Indian protected forests) shows that without top-down predator regulation, overgrazing destroys the root matrix, leading to desertification and collapse of the grazer population itself.',
  },
];

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT: PRAKRITI BIOSPHERE
// -------------------------------------------------------------------------
export const PrakritiBalance: React.FC<LabSegmentProps> = ({ onNextLab }) => {
  const [viewMode, setViewMode] = useState<LabViewMode>('biosphere');

  // --- Biosphere State ---
  const [activeScenario, setActiveScenario] = useState<BiosphereScenario>('free');
  const [rainfall, setRainfall] = useState<number>(65);
  const [temperature, setTemperature] = useState<number>(26);


  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [missionComplete, setMissionComplete] = useState<boolean>(false);

  // Live state tracking
  const [bioState, setBioState] = useState<BiosphereState>({
    timeStep: 0,
    producers: 65,
    herbivores: 45,
    carnivores: 12,
    decomposers: 60,
    soilNutrients: 70,
    oxygen: 21.0,
    carbonDioxide: 410,
    biodiversity: 78,
    resilience: 82,
  });

  const [history, setHistory] = useState<HistoryPoint[]>([
    { step: 0, producers: 65, herbivores: 45, carnivores: 12, decomposers: 60 },
  ]);

  // Load Scenario Presets
  const handleSelectScenario = (sc: BiosphereScenario) => {
    setActiveScenario(sc);
    const cfg = SCENARIOS[sc];
    setRainfall(cfg.initial.rainfall);
    setTemperature(cfg.initial.temperature);
    setMissionComplete(false);

    setBioState({
      timeStep: 0,
      producers: cfg.initial.plantDensity,
      herbivores: cfg.initial.herbivores,
      carnivores: cfg.initial.carnivores,
      decomposers: Math.round((cfg.initial.soilNutrients + cfg.initial.plantDensity) / 2),
      soilNutrients: cfg.initial.soilNutrients,
      oxygen: 20.9,
      carbonDioxide: 415,
      biodiversity: Math.round((cfg.initial.plantDensity + cfg.initial.herbivores + cfg.initial.carnivores * 2) / 3),
      resilience: 75,
    });

    setHistory([
      {
        step: 0,
        producers: cfg.initial.plantDensity,
        herbivores: cfg.initial.herbivores,
        carnivores: cfg.initial.carnivores,
        decomposers: Math.round((cfg.initial.soilNutrients + cfg.initial.plantDensity) / 2),
      },
    ]);
    soundEffects.playStrokeChime();
  };

  // --- Dynamic Simulation Tick Engine (Lotka-Volterra with Nutrients & Climate) ---
  const stepSimulation = useCallback(() => {
    setBioState((prev) => {
      // 1. Photosynthetic growth driver (optimal temp: 22-28°C, needs rainfall + nutrients)
      const tempFactor = Math.max(0.05, 1 - Math.pow(Math.abs(temperature - 25) / 22, 2));
      const rainFactor = rainfall / 60;
      const nutrientFactor = prev.soilNutrients / 60;
      const intrinsicPlantGrowth = 4.2 * tempFactor * Math.min(1.8, rainFactor) * Math.min(1.6, nutrientFactor);

      // 2. Herbivore consumption & predation
      const herbivoreConsumption = 0.045 * prev.herbivores;
      const nextProducers = clamp(
        prev.producers + intrinsicPlantGrowth * (1 - prev.producers / 120) - herbivoreConsumption * prev.producers * 0.06,
        1,
        100
      );

      // 3. Herbivore dynamics
      const herbivoreBirth = 0.05 * prev.producers * (prev.herbivores / 50);
      const carnivorePredation = 0.065 * prev.carnivores * (prev.herbivores / 45);
      const herbivoreStarvation = prev.producers < 25 ? (25 - prev.producers) * 0.12 : 0;
      const nextHerbivores = clamp(
        prev.herbivores + herbivoreBirth - carnivorePredation - herbivoreStarvation,
        0,
        120
      );

      // 4. Carnivore dynamics
      const carnivoreBirth = 0.04 * (prev.herbivores / 40) * prev.carnivores;
      const carnivoreMortality = 0.05 * prev.carnivores + (prev.herbivores < 15 ? 0.08 * prev.carnivores : 0);
      const nextCarnivores = clamp(
        prev.carnivores + carnivoreBirth - carnivoreMortality,
        0,
        40
      );

      // 5. Decomposers & Soil Humus recycling
      const organicWaste = (100 - nextProducers) * 0.08 + (prev.herbivores * 0.05) + (prev.carnivores * 0.04);
      const nextDecomposers = clamp(prev.decomposers * 0.95 + organicWaste * 0.7, 5, 100);
      const nextSoilNutrients = clamp(
        prev.soilNutrients - (intrinsicPlantGrowth * 0.25) + (nextDecomposers * 0.32),
        5,
        100
      );

      // 6. Atmospheric gases
      const netPhotosynthesis = (nextProducers - 50) * 0.015;
      const nextOxygen = Number(clamp(20.9 + netPhotosynthesis, 16.5, 24.5).toFixed(2));
      const nextCO2 = Math.round(clamp(415 - netPhotosynthesis * 650 + (nextHerbivores * 0.4), 280, 750));

      // 7. Biodiversity & Resilience
      const richness = (nextProducers > 10 ? 1 : 0) + (nextHerbivores > 5 ? 1 : 0) + (nextCarnivores > 2 ? 1 : 0) + (nextDecomposers > 15 ? 1 : 0);
      const nextBiodiversity = clamp(Math.round((richness / 4) * 60 + (nextProducers * 0.2) + (nextHerbivores * 0.2)));
      const nextResilience = clamp(Math.round((nextSoilNutrients * 0.4) + (nextBiodiversity * 0.4) + (tempFactor * 20)));

      const nextState: BiosphereState = {
        timeStep: prev.timeStep + 1,
        producers: Math.round(nextProducers),
        herbivores: Math.round(nextHerbivores),
        carnivores: Math.round(nextCarnivores),
        decomposers: Math.round(nextDecomposers),
        soilNutrients: Math.round(nextSoilNutrients),
        oxygen: nextOxygen,
        carbonDioxide: nextCO2,
        biodiversity: nextBiodiversity,
        resilience: nextResilience,
      };

      // Check scenario win condition
      const cfg = SCENARIOS[activeScenario];
      if (activeScenario !== 'free' && cfg.successCondition(nextState) && !missionComplete) {
        setMissionComplete(true);
        soundEffects.playSuccessDing();
      }

      setHistory((h) => {
        const nextH = [...h, {
          step: nextState.timeStep,
          producers: nextState.producers,
          herbivores: nextState.herbivores,
          carnivores: nextState.carnivores,
          decomposers: nextState.decomposers,
        }];
        return nextH.slice(-32); // Keep last 32 steps for sparkline
      });

      return nextState;
    });
  }, [rainfall, temperature, activeScenario, missionComplete]);

  // Simulation timer
  useEffect(() => {
    if (!isRunning || viewMode !== 'biosphere') return;
    const interval = 1200 / simSpeed;
    const timer = setInterval(() => {
      stepSimulation();
    }, interval);
    return () => clearInterval(timer);
  }, [isRunning, simSpeed, stepSimulation, viewMode]);

  // --- Cellular Homeostasis State (Preserved) ---
  const [env, setEnv] = useState<EnvState>({
    ritu: 'vasanta',
    heat: 6,
    cold: 4,
    dry: 4,
    moist: 7,
    activity: 5,
  });

  const doshas = useMemo(() => calculateThermodynamicDoshas(env), [env]);

  const selectRitu = (r: Ritu) => {
    const p = RITU_PRESETS[r];
    setEnv({
      ritu: r,
      heat: p.heat,
      cold: p.cold,
      dry: p.dry,
      moist: p.moist,
      activity: p.activity,
    });
    soundEffects.playStrokeChime();
  };

  return (
    <div className="vl-segment-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* =========================================================================
          TOP LAB BANNER & MODE SELECTOR
          ========================================================================= */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 78, 59, 0.25) 100%)',
          border: '1.5px solid rgba(52, 211, 153, 0.35)',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🌿</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#34d399', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              SEC-03 · LIFE SCIENCES &amp; DYNAMIC EQUILIBRIUM
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#f8fafc', margin: '0.3rem 0 0.2rem' }}>
            Prakṛti Biosphere <span lang="sa" style={{ color: '#86efac', fontWeight: 700 }}>प्रकृति-जैवमण्डलम्</span>
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1', maxWidth: '720px', lineHeight: 1.5 }}>
            <strong>Observe. Question. Discover.</strong> Explore how nature achieves dynamic balance across plants, grazers, predators, and soil nutrients. Discover that resilience stems from diversity and feedback loops.
          </p>
        </div>

        {/* Dual Mode Switcher */}
        <div style={{ display: 'inline-flex', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
          <button
            type="button"
            onClick={() => { setViewMode('biosphere'); soundEffects.playStrokeChime(); }}
            style={{
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              border: 'none',
              background: viewMode === 'biosphere' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
              color: viewMode === 'biosphere' ? '#ffffff' : '#94a3b8',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s',
            }}
          >
            <span>🌍</span>
            <span>Biosphere Ecology</span>
          </button>
          <button
            type="button"
            onClick={() => { setViewMode('cellular'); soundEffects.playStrokeChime(); }}
            style={{
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              border: 'none',
              background: viewMode === 'cellular' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
              color: viewMode === 'cellular' ? '#ffffff' : '#94a3b8',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s',
            }}
          >
            <span>🧬</span>
            <span>Cellular Tri-Doṣa</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MODE 1: BIOSPHERE ECOLOGY SIMULATOR (PRIMARY REQUEST)
          ========================================================================= */}
      {viewMode === 'biosphere' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Scenario Mission Selector */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(52, 211, 153, 0.25)',
              borderRadius: '16px',
              padding: '1.1rem 1.35rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.85rem' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  🎯 GUIDED ECOLOGICAL SCENARIOS
                </span>
                <h3 style={{ margin: '0.15rem 0 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 800 }}>
                  Select an Ecosystem Mission:
                </h3>
              </div>
              {missionComplete && (
                <div style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1.5px solid #22c55e', color: '#86efac', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>🏆</span> Mission Objective Accomplished!
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
              {(Object.keys(SCENARIOS) as BiosphereScenario[]).map((scKey) => {
                const sc = SCENARIOS[scKey];
                const isSelected = activeScenario === scKey;
                return (
                  <button
                    key={scKey}
                    type="button"
                    onClick={() => handleSelectScenario(scKey)}
                    style={{
                      padding: '0.7rem 0.85rem',
                      borderRadius: '12px',
                      border: isSelected ? '1.5px solid #10b981' : '1px solid rgba(148, 163, 184, 0.2)',
                      background: isSelected ? 'rgba(16, 185, 129, 0.18)' : 'rgba(30, 41, 59, 0.5)',
                      color: isSelected ? '#ffffff' : '#cbd5e1',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: isSelected ? '#34d399' : '#94a3b8' }}>
                        {sc.badge}
                      </span>
                      <span lang="sa" style={{ fontSize: '0.75rem', color: '#86efac' }}>
                        {sc.titleDev}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc' }}>{sc.titleEn}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Scenario Briefing */}
            <div style={{ marginTop: '0.85rem', padding: '0.75rem 1rem', background: 'rgba(6, 78, 59, 0.25)', borderLeft: '3px solid #10b981', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.84rem', color: '#f1f5f9', fontWeight: 600 }}>
                <strong>Scenario Brief:</strong> {SCENARIOS[activeScenario].desc}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#86efac', marginTop: '0.25rem' }}>
                <strong>Goal:</strong> {SCENARIOS[activeScenario].goal}
              </div>
            </div>
          </div>

          {/* Biome Living Visualization & Simulation Dashboard */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(280px, 1fr)', gap: '1.25rem' }}>
            {/* Visual Living Biome Canvas */}
            <div
              style={{
                background: 'linear-gradient(180deg, #09131d 0%, #0d221c 60%, #1a150e 100%)',
                border: '1.5px solid rgba(52, 211, 153, 0.3)',
                borderRadius: '16px',
                padding: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '380px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
              }}
            >
              {/* Sky Atmosphere Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>{temperature > 32 ? '☀️' : rainfall > 60 ? '🌧️' : '⛅'}</span>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800 }}>Atmosphere</span>
                    <div style={{ fontSize: '0.85rem', color: '#f8fafc', fontWeight: 700 }}>
                      {temperature}°C · {rainfall} mm Rain
                    </div>
                  </div>
                </div>

                {/* Gas Metrics Pill */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.3rem 0.65rem', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.3)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 800 }}>O₂ (Oxygen)</span>
                    <div style={{ fontSize: '0.85rem', color: '#f8fafc', fontWeight: 900 }}>{bioState.oxygen}%</div>
                  </div>
                  <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.3rem 0.65rem', borderRadius: '8px', border: '1px solid rgba(251, 146, 60, 0.3)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#fb923c', fontWeight: 800 }}>CO₂ Level</span>
                    <div style={{ fontSize: '0.85rem', color: '#f8fafc', fontWeight: 900 }}>{bioState.carbonDioxide} ppm</div>
                  </div>
                </div>
              </div>

              {/* Rain Particle Visualization if rainfall high */}
              {rainfall > 40 && (
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: rainfall / 100, overflow: 'hidden' }}>
                  <svg width="100%" height="100%">
                    {Array.from({ length: Math.min(25, Math.round(rainfall / 4)) }).map((_, i) => (
                      <line
                        key={i}
                        x1={`${(i * 19) % 100}%`}
                        y1="0%"
                        x2={`${(i * 19 + 5) % 100}%`}
                        y2="100%"
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                        strokeDasharray="4 12"
                        opacity="0.45"
                      />
                    ))}
                  </svg>
                </div>
              )}

              {/* Central Living Organisms Arena */}
              <div style={{ position: 'relative', margin: '2rem 0', minHeight: '140px', zIndex: 2 }}>
                {/* Roaming Herbivores (Deer & Rabbits) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: 800, textTransform: 'uppercase', width: '100%' }}>
                    Herbivores ({bioState.herbivores}) · शाकाहारिणः
                  </span>
                  {Array.from({ length: Math.min(18, Math.max(1, Math.round(bioState.herbivores / 5))) }).map((_, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '1.35rem',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                        animation: `vlGamerBlink ${2 + (idx % 3)}s infinite ease-in-out`,
                      }}
                      title="Grazer: consuming vegetation"
                    >
                      {idx % 3 === 0 ? '🦌' : '🐇'}
                    </span>
                  ))}
                  {bioState.herbivores === 0 && (
                    <span style={{ fontSize: '0.8rem', color: '#f87171', fontStyle: 'italic' }}>
                      ⚠️ Zero herbivores remaining (Local Extinction)
                    </span>
                  )}
                </div>

                {/* Patrolling Carnivores (Apex Predators) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: '#f87171', fontWeight: 800, textTransform: 'uppercase', width: '100%' }}>
                    Carnivores ({bioState.carnivores}) · मांसाहारिणः
                  </span>
                  {Array.from({ length: Math.min(8, Math.max(0, Math.round(bioState.carnivores / 4))) }).map((_, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '1.45rem',
                        filter: 'drop-shadow(0 2px 6px rgba(239, 68, 68, 0.6))',
                        animation: `vlGamerBlink ${1.8 + (idx % 2)}s infinite ease-in-out`,
                      }}
                      title="Apex Predator: regulating grazer density"
                    >
                      {idx % 2 === 0 ? '🐅' : '🦅'}
                    </span>
                  ))}
                  {bioState.carnivores === 0 && (
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                      No apex predators present (Unchecked grazer growth risk)
                    </span>
                  )}
                </div>
              </div>

              {/* Soil & Flora Strata (Producers & Decomposers) */}
              <div
                style={{
                  background: `linear-gradient(180deg, ${bioState.producers > 40 ? 'rgba(34,197,94,0.45)' : 'rgba(180,83,9,0.45)'} 0%, rgba(20, 14, 8, 0.95) 100%)`,
                  borderTop: `3px solid ${bioState.producers > 40 ? '#22c55e' : '#d97706'}`,
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  zIndex: 2,
                }}
              >
                {/* Plants / Producers Layer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#86efac', fontWeight: 800, textTransform: 'uppercase' }}>
                    Producers: Plants &amp; Crops ({bioState.producers}%) · उत्पादकाः
                  </span>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    {Array.from({ length: Math.min(14, Math.max(1, Math.round(bioState.producers / 7))) }).map((_, i) => (
                      <span key={i} style={{ fontSize: '1.15rem' }}>{i % 2 === 0 ? '🌱' : '🌳'}</span>
                    ))}
                  </div>
                </div>

                {/* Subterranean Decomposers & Humus Layer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.4rem', borderTop: '1px dashed rgba(148, 163, 184, 0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1rem' }}>🍄</span>
                    <span style={{ fontSize: '0.7rem', color: '#fde047', fontWeight: 700 }}>
                      Soil Humus: {bioState.soilNutrients}% · Decomposers: {bioState.decomposers}%
                    </span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>
                    Resilience: <strong>{bioState.resilience}%</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Time-Series Population Dynamics Chart & Simulation Controls */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(52, 211, 153, 0.25)',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase' }}>
                      Real-Time Population Oscillations
                    </span>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#f8fafc', fontWeight: 800 }}>
                      Multi-Trophic History Chart
                    </h4>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Tick: <strong>#{bioState.timeStep}</strong>
                  </div>
                </div>

                {/* SVG Multi-Line Chart */}
                <div style={{ background: '#0b1118', borderRadius: '10px', padding: '0.5rem', border: '1px solid rgba(148, 163, 184, 0.15)', height: '160px', position: 'relative' }}>
                  <svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="300" y2="30" stroke="#1e293b" strokeDasharray="2 4" />
                    <line x1="0" y1="60" x2="300" y2="60" stroke="#1e293b" strokeDasharray="2 4" />
                    <line x1="0" y1="90" x2="300" y2="90" stroke="#1e293b" strokeDasharray="2 4" />

                    {/* Producers Line (Green) */}
                    <polyline
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2.5"
                      points={history.map((pt, idx) => `${(idx / (history.length - 1 || 1)) * 300},${120 - (pt.producers / 100) * 110}`).join(' ')}
                    />

                    {/* Herbivores Line (Blue) */}
                    <polyline
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      points={history.map((pt, idx) => `${(idx / (history.length - 1 || 1)) * 300},${120 - (pt.herbivores / 100) * 110}`).join(' ')}
                    />

                    {/* Carnivores Line (Red) */}
                    <polyline
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      points={history.map((pt, idx) => `${(idx / (history.length - 1 || 1)) * 300},${120 - (pt.carnivores / 40) * 110}`).join(' ')}
                    />
                  </svg>

                  {/* Chart Legend */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginTop: '0.35rem', color: '#94a3b8' }}>
                    <span style={{ color: '#22c55e' }}>● Plants ({bioState.producers})</span>
                    <span style={{ color: '#38bdf8' }}>● Herbivores ({bioState.herbivores})</span>
                    <span style={{ color: '#ef4444' }}>● Carnivores ({bioState.carnivores})</span>
                  </div>
                </div>

                {/* Core Ecological Insight: Nature Fluctuates */}
                <div style={{ marginTop: '0.85rem', padding: '0.65rem 0.85rem', background: 'rgba(51, 65, 85, 0.4)', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  <strong style={{ color: '#86efac' }}>💡 Dynamic Nature Insight:</strong> Ecosystems are never frozen in static balance. As plant biomass swells, grazers follow with a delayed peak, which then pulls predator numbers upward, creating natural self-correcting waves.
                </div>
              </div>

              {/* Simulation Controls: Play / Pause / Step / Speed */}
              <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(148, 163, 184, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem' }}>
                <div style={{ display: 'flex', gap: '0.45rem' }}>
                  <button
                    type="button"
                    onClick={() => { setIsRunning(!isRunning); soundEffects.playStrokeChime(); }}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: isRunning ? '#f59e0b' : '#10b981',
                      color: '#0f172a',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    {isRunning ? '⏸ Pause' : '▶ Run'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { stepSimulation(); soundEffects.playStrokeChime(); }}
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
                    ⏭ Step
                  </button>
                  <button
                    type="button"
                    onClick={() => { handleSelectScenario(activeScenario); }}
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
                    🔄 Reset
                  </button>
                </div>

                {/* Speed Toggles */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.74rem', color: '#94a3b8' }}>
                  <span>Speed:</span>
                  {[1, 2, 5].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setSimSpeed(spd)}
                      style={{
                        padding: '0.2rem 0.45rem',
                        borderRadius: '4px',
                        border: simSpeed === spd ? '1px solid #10b981' : '1px solid rgba(148,163,184,0.2)',
                        background: simSpeed === spd ? 'rgba(16,185,129,0.3)' : 'transparent',
                        color: simSpeed === spd ? '#86efac' : '#94a3b8',
                        fontWeight: 700,
                        fontSize: '0.74rem',
                        cursor: 'pointer',
                      }}
                    >
                      {spd}×
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Variable Control Deck (Sliders) */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(52, 211, 153, 0.25)',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.74rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                CLIMATE &amp; TROPHIC VARIABLE ADJUSTMENT
              </span>
              <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', color: '#f8fafc', fontWeight: 800 }}>
                Tune Abiotic Conditions &amp; Population Densities
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem 1.75rem' }}>
              <GlowSlider
                label="🌧️ Rainfall Rate (पर्जन्यः)"
                value={rainfall}
                min={0}
                max={100}
                step={5}
                color="#38bdf8"
                onChange={(v) => { setRainfall(v); soundEffects.playStrokeChime(); }}
              />

              <GlowSlider
                label="☀️ Ambient Temperature (तापमानम्)"
                value={temperature}
                min={10}
                max={45}
                step={1}
                color="#fbbf24"
                onChange={(v) => { setTemperature(v); soundEffects.playStrokeChime(); }}
              />

              <GlowSlider
                label="🌱 Plant / Producer Target (उत्पादकाः)"
                value={bioState.producers}
                min={0}
                max={100}
                step={5}
                color="#22c55e"
                onChange={(v) => { setBioState((s) => ({ ...s, producers: v })); soundEffects.playStrokeChime(); }}
              />

              <GlowSlider
                label="🦌 Herbivore Grazing Load (शाकाहारिणः)"
                value={bioState.herbivores}
                min={0}
                max={100}
                step={5}
                color="#60a5fa"
                onChange={(v) => { setBioState((s) => ({ ...s, herbivores: v })); soundEffects.playStrokeChime(); }}
              />

              <GlowSlider
                label="🐅 Apex Predator Count (मांसाहारिणः)"
                value={bioState.carnivores}
                min={0}
                max={30}
                step={1}
                color="#f87171"
                onChange={(v) => { setBioState((s) => ({ ...s, carnivores: v })); soundEffects.playStrokeChime(); }}
              />

              <GlowSlider
                label="🍂 Soil Organic Nutrients (मृत्तिका-सारः)"
                value={bioState.soilNutrients}
                min={0}
                max={100}
                step={5}
                color="#eab308"
                onChange={(v) => { setBioState((s) => ({ ...s, soilNutrients: v })); soundEffects.playStrokeChime(); }}
              />
            </div>
          </div>

          {/* =========================================================================
              VEDIC ECOLOGICAL CYCLE: ANNĀD BHAVANTI BHŪTĀNI
              ========================================================================= */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(20, 83, 45, 0.25) 0%, rgba(15, 23, 42, 0.8) 100%)',
              border: '1.5px solid rgba(52, 211, 153, 0.4)',
              borderRadius: '16px',
              padding: '1.35rem 1.6rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.6rem' }}>🌾</span>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#86efac', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  CURRICULAR HERITAGE INTEGRATION // NCERT CLASS 7 CH 9 &amp; BG 3.14
                </span>
                <h3 style={{ margin: '0.15rem 0 0', fontSize: '1.25rem', color: '#f8fafc', fontWeight: 900 }}>
                  The Living Ecological Cycle: Annād Bhavanti Bhūtāni
                </h3>
              </div>
            </div>

            {/* Shloka Card */}
            <div
              style={{
                background: 'rgba(6, 78, 59, 0.3)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                marginBottom: '1.25rem',
                textAlign: 'center',
              }}
            >
              <div lang="sa" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fef08a', lineHeight: 1.6 }}>
                अन्नाद् भवन्ति भूतानि पर्जन्यादन्नसम्भवः।<br />
                यज्ञाद् भवति पर्जन्यो यज्ञः कर्मसमुद्भवः॥
              </div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.5rem', fontStyle: 'italic' }}>
                &ldquo;From food (Anna) all living beings arise; from rain (Parjanya) food is produced; from ecological balance &amp; sacrifice (Yajña) rain is sustained; and Yajña is born of right action (Karma).&rdquo;
              </div>
            </div>

            {/* 5-Step Visual Circular Loop */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.85rem', borderRadius: '10px', borderTop: '3px solid #38bdf8' }}>
                <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 800 }}>STEP 1 · पर्जन्यः</span>
                <h4 style={{ margin: '0.2rem 0', color: '#f8fafc', fontSize: '0.92rem' }}>1. Rainfall &amp; Moisture</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  Atmospheric precipitation replenishes rivers and ground aquifers.
                </p>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.85rem', borderRadius: '10px', borderTop: '3px solid #22c55e' }}>
                <span style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 800 }}>STEP 2 · अन्नम्</span>
                <h4 style={{ margin: '0.2rem 0', color: '#f8fafc', fontSize: '0.92rem' }}>2. Vegetative Food</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  Sunlight and rain drive plant photosynthesis, producing primary biomass.
                </p>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.85rem', borderRadius: '10px', borderTop: '3px solid #60a5fa' }}>
                <span style={{ fontSize: '0.7rem', color: '#60a5fa', fontWeight: 800 }}>STEP 3 · भूतानि</span>
                <h4 style={{ margin: '0.2rem 0', color: '#f8fafc', fontSize: '0.92rem' }}>3. Living Beings</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  Herbivores, carnivores, and humans derive life energy from food networks.
                </p>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.85rem', borderRadius: '10px', borderTop: '3px solid #f59e0b' }}>
                <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 800 }}>STEP 4 · अपघटकाः</span>
                <h4 style={{ margin: '0.2rem 0', color: '#f8fafc', fontSize: '0.92rem' }}>4. Decomposition</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  Decomposers recycle dead organic matter back into bioavailable soil humus.
                </p>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.85rem', borderRadius: '10px', borderTop: '3px solid #a855f7' }}>
                <span style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: 800 }}>STEP 5 · यज्ञ / कर्म</span>
                <h4 style={{ margin: '0.2rem 0', color: '#f8fafc', fontSize: '0.92rem' }}>5. Stewardship</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  Human ecological responsibility maintains the canopy, preventing drought.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 2: CELLULAR HOMEOSTASIS (TRI-DOṢA VECTOR MODEL)
          ========================================================================= */}
      {viewMode === 'cellular' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Season Selector */}
          <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(52, 211, 153, 0.25)' }}>
            <span style={{ fontSize: '0.74rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              ṚTUCARYĀ CELLULAR ADAPTATION
            </span>
            <h3 style={{ margin: '0.2rem 0 0.85rem', fontSize: '1.15rem', color: '#f8fafc', fontWeight: 800 }}>
              Select a Seasonal Environmental Shock:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {RITU_KEYS.map((r) => {
                const p = RITU_PRESETS[r];
                const active = env.ritu === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => selectRitu(r)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: active ? '1.5px solid #10b981' : '1px solid rgba(148, 163, 184, 0.2)',
                      background: active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                      color: active ? '#ffffff' : '#cbd5e1',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
                      <span lang="sa" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#86efac' }}>{p.dev}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.25rem' }}>{p.name}</div>
                    <p style={{ margin: '0.35rem 0 0', fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.35 }}>{p.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tri-Dosa Meters & Micro-Macro Resonance */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <h4 style={{ margin: '0 0 0.85rem', color: '#f8fafc', fontSize: '1rem', fontWeight: 800 }}>
                Intracellular Tri-Doṣa Resonance
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                    <span style={{ color: '#c084fc', fontWeight: 800 }}>💨 Vāta (Kinetic Diffusion)</span>
                    <strong style={{ color: '#f8fafc' }}>{doshas.vata}%</strong>
                  </div>
                  <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${doshas.vata}%`, height: '100%', background: '#c084fc', transition: 'width 0.3s' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                    <span style={{ color: '#fb923c', fontWeight: 800 }}>🔥 Pitta (Metabolic Heat)</span>
                    <strong style={{ color: '#f8fafc' }}>{doshas.pitta}%</strong>
                  </div>
                  <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${doshas.pitta}%`, height: '100%', background: '#fb923c', transition: 'width 0.3s' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                    <span style={{ color: '#34d399', fontWeight: 800 }}>💧 Kapha (Membrane Stability)</span>
                    <strong style={{ color: '#f8fafc' }}>{doshas.kapha}%</strong>
                  </div>
                  <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${doshas.kapha}%`, height: '100%', background: '#34d399', transition: 'width 0.3s' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Organelle Five Bhūtas Table */}
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <h4 style={{ margin: '0 0 0.85rem', color: '#f8fafc', fontSize: '1rem', fontWeight: 800 }}>
                Five Bhūtas ➔ Cellular Organelle Mapping
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {(Object.keys(ORGANELLES) as OrganelleKey[]).map((k) => {
                  const org = ORGANELLES[k];
                  return (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', padding: '0.35rem 0.5rem', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span>{org.icon}</span>
                        <strong style={{ color: org.color }}>{org.element}:</strong>
                        <span style={{ color: '#e2e8f0' }}>{org.organelle}</span>
                      </div>
                      <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{org.biophysics}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          CROSS-CUTTING EDUCATIONAL TERMS & CHALLENGES
          ========================================================================= */}
      <TermPanel terms={TERMS} />
      <ChallengeList items={CHALLENGES} />

      {/* Direct Next Biology Lab (Chaturyoni) Gateway */}
      {onNextLab && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(249,115,22,0.15))',
            border: '1.5px solid rgba(249,115,22,0.4)',
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
            <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>🦢</span>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#fb923c', fontWeight: 800, textTransform: 'uppercase' }}>
                NEXT BIOLOGY LAB // SEC-04
              </span>
              <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', color: '#f8fafc', fontWeight: 900 }}>
                Chaturyoni Spawn Map · Botanical Galvanometry
              </h4>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: '#cbd5e1' }}>
                Advance from ecological food webs to 4-fold taxonomy &amp; Sir J.C. Bose&rsquo;s plant action potentials!
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
              background: 'linear-gradient(135deg, #f97316, #10b981)',
              color: '#090e17',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <span>ENTER CHATURYONI LAB ➔</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PrakritiBalance;
