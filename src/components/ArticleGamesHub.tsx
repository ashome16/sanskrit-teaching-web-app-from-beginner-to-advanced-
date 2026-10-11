import React, { useState, useEffect, useMemo } from 'react';
import { soundEffects } from '../utils/soundEffects';
import '../styles/article-games.css';

export interface ArticleGamesHubProps {
  initialGameId?: string;
  onOpenArticle?: (slug: string) => void;
  onGoHome?: () => void;
}

type GameId =
  | 'rituparna'
  | 'agnicurna'
  | 'lilavati'
  | 'kuttaka'
  | 'pingala'
  | 'dhanurveda'
  | 'metrology'
  | 'madhavapi'
  | 'colossal'
  | 'swara';

interface GameMetadata {
  id: GameId;
  icon: string;
  devTitle: string;
  title: string;
  articleSlug: string;
  articleTitle: string;
  badge: string;
  color: string;
}

const GAMES: GameMetadata[] = [
  {
    id: 'rituparna',
    icon: '🌳',
    devTitle: 'ऋतुपर्ण-प्रतिदर्श-गणनम्',
    title: 'Rituparna’s Canopy Estimator',
    articleSlug: 'analytical-mind-of-ancient-india',
    articleTitle: 'The Analytical Mind of Ancient India: Statistical Sampling',
    badge: 'Statistics & Sampling',
    color: '#047857',
  },
  {
    id: 'agnicurna',
    icon: '🚀',
    devTitle: 'अग्निचूर्ण-क्षेपणास्त्र-क्रीडा',
    title: 'Śukranīti Agnicūrṇa & Siege Artillery',
    articleSlug: 'agnichurna-pyrotechnics-rocketry',
    articleTitle: 'Agnicūrṇa to Aerospace: War Rocketry & Pyrotechnics',
    badge: 'Chemistry & Ballistics',
    color: '#b91c1c',
  },
  {
    id: 'lilavati',
    icon: '🪷',
    devTitle: 'लीलावती-गणित-पहेलिका',
    title: 'Līlāvatī’s Poetic Math Quest',
    articleSlug: 'bhaskaracharya-dob-algebra-and-cosmic-consciousness',
    articleTitle: 'Bhāskarācārya: Līlāvatī Mathematical Poetry & Algebra',
    badge: 'Poetic Algebra',
    color: '#7c3aed',
  },
  {
    id: 'kuttaka',
    icon: '🔨',
    devTitle: 'कुट्टक-यन्त्रम्',
    title: 'The Kuṭṭaka Pulverizer Engine',
    articleSlug: 'universal-engine-of-algebra',
    articleTitle: 'The Universal Engine of Algebra: Solving Indeterminate Equations',
    badge: 'Number Theory',
    color: '#c2410c',
  },
  {
    id: 'pingala',
    icon: '🔺',
    devTitle: 'पिङ्गल-मेरुप्रस्तार-सोपानम्',
    title: 'Pingala’s Meruprastāra Staircase',
    articleSlug: 'analytical-mind-of-ancient-india',
    articleTitle: 'Pingala’s Chandaḥśāstra: Binary Systems & Pascal’s Triangle',
    badge: 'Binary Combinatorics',
    color: '#0284c7',
  },
  {
    id: 'dhanurveda',
    icon: '🎯',
    devTitle: 'धनुर्वेद-लक्ष्यवेध-क्रीडा',
    title: 'Dhanurveda Stance & Ballistics',
    articleSlug: 'dhanurveda-geometry-phonetics',
    articleTitle: 'Dhanurveda: Sacred Science of the Bow, Ballistics & 5 Stances',
    badge: 'Geometry & Physics',
    color: '#d97706',
  },
  {
    id: 'metrology',
    icon: '⚖️',
    devTitle: 'गुञ्जा-तुला-सन्तुलनम्',
    title: 'The Ancient Metrology Scale',
    articleSlug: 'before-the-carat',
    articleTitle: 'Before the Carat — Seeds, Slate, and the Metrology of Ancient India',
    badge: 'Metrology & Weights',
    color: '#059669',
  },
  {
    id: 'madhavapi',
    icon: '♾️',
    devTitle: 'माधव-अनन्त-श्रेणी-त्वरकः',
    title: 'Madhava’s Infinite Pi Accelerator',
    articleSlug: 'kerala-school-calculus-and-infinite-series',
    articleTitle: 'The Kerala School: Madhava, Yuktibhāṣā & The Invention of Calculus',
    badge: 'Calculus & Infinite Series',
    color: '#2563eb',
  },
  {
    id: 'colossal',
    icon: '🌌',
    devTitle: 'सङ्ख्या-विस्तार-भाण्डागारः',
    title: 'The Colossal Powers Vault',
    articleSlug: 'naming-the-colossal',
    articleTitle: 'Naming the Colossal — How Indian Texts Counted Past a Million',
    badge: 'Cosmic Numeration',
    color: '#9333ea',
  },
  {
    id: 'swara',
    icon: '🎵',
    devTitle: 'सप्तस्वर-नाद-चक्रम्',
    title: 'Animal Swara Melodic Weaver',
    articleSlug: 'animal-names-yoga-sounds',
    articleTitle: 'Animal Names: Yoga Shapes and Singing Notes',
    badge: 'Musicology & Acoustics',
    color: '#e11d48',
  },
];

// ============================================================================
// GAME 1: RITUPARNA CANOPY ESTIMATOR
// ============================================================================
const RituparnaGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [sectors, setSectors] = useState<number[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<number[]>([0, 1]);
  const [userEstimate, setUserEstimate] = useState<number>(1500);
  const [revealed, setRevealed] = useState(false);

  // Generate new random tree population between 1200 and 3200 fruits
  const resetTree = () => {
    soundEffects.playStrokeChime();
    const secCounts: number[] = [];
    const base = Math.floor(120 + Math.random() * 180);
    for (let i = 0; i < 10; i++) {
      // Natural variation per sector
      const variance = Math.floor((Math.random() - 0.5) * 80);
      secCounts.push(Math.max(40, base + variance));
    }
    setSectors(secCounts);
    setSelectedSectors([Math.floor(Math.random() * 10)]);
    setRevealed(false);
  };

  useEffect(() => {
    resetTree();
  }, []);

  const totalFruits = useMemo(() => sectors.reduce((a, b) => a + b, 0), [sectors]);
  const sampledCount = useMemo(
    () => selectedSectors.reduce((sum, idx) => sum + (sectors[idx] || 0), 0),
    [selectedSectors, sectors],
  );

  const suggestedEstimate = useMemo(() => {
    if (selectedSectors.length === 0) return 0;
    return Math.round((sampledCount / selectedSectors.length) * 10);
  }, [sampledCount, selectedSectors]);

  useEffect(() => {
    if (suggestedEstimate > 0 && !revealed) {
      setUserEstimate(suggestedEstimate);
    }
  }, [suggestedEstimate, revealed]);

  const toggleSector = (idx: number) => {
    if (revealed) return;
    soundEffects.playPuzzleSnap();
    if (selectedSectors.includes(idx)) {
      if (selectedSectors.length > 1) {
        setSelectedSectors(selectedSectors.filter((s) => s !== idx));
      }
    } else if (selectedSectors.length < 5) {
      setSelectedSectors([...selectedSectors, idx]);
    }
  };

  const handleVerify = () => {
    soundEffects.playPuzzleSnap();
    setRevealed(true);
    const errPercent = Math.abs(userEstimate - totalFruits) / totalFruits;
    if (errPercent <= 0.06) {
      soundEffects.playCelebrationChime();
      onScore(50);
    } else if (errPercent <= 0.15) {
      soundEffects.playSuccessDing();
      onScore(25);
    } else {
      onScore(10);
    }
  };

  const errorPct = revealed ? ((Math.abs(userEstimate - totalFruits) / totalFruits) * 100).toFixed(1) : null;

  return (
    <div className="ag-game-box">
      <div className="ag-game-head">
        <div>
          <h3 className="ag-game-title">🌳 King Rituparna’s Canopy Estimator</h3>
          <p className="ag-game-sub">
            In the <i>Mahābhārata</i> Nalopākhyāna, King Rituparna deduced all leaves and nuts on a sprawling Vibhītaka tree by sampling a single branch. Test your sampling estimation before Prince Nala fells the tree to verify!
          </p>
        </div>
        <button type="button" className="ag-btn ag-btn--ghost" onClick={resetTree}>
          ↺ New Canopy
        </button>
      </div>

      <div className="ag-rituparna-layout">
        {/* Tree Canopy Visualization */}
        <div className="ag-tree-visual">
          <div className="ag-tree-crown">
            {sectors.map((cnt, idx) => {
              const isSelected = selectedSectors.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  className={`ag-sector-pill ${isSelected ? 'is-sampled' : ''}`}
                  onClick={() => toggleSector(idx)}
                  disabled={revealed}
                >
                  <span className="ag-sec-label">Sector {idx + 1}</span>
                  <span className="ag-sec-val">
                    {isSelected ? `🍃 ${cnt} nuts` : '❓ Hidden Branch'}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="ag-tree-trunk">🟫 Vibhītaka Trunk (विभीतक-काण्डम्)</div>
        </div>

        {/* Estimation Controls */}
        <div className="ag-estimate-controls">
          <div className="ag-stat-row">
            <span className="ag-stat-label">Sampled Sectors:</span>
            <span className="ag-stat-value">{selectedSectors.length} of 10 ({selectedSectors.length * 10}% coverage)</span>
          </div>
          <div className="ag-stat-row">
            <span className="ag-stat-label">Count in Sample:</span>
            <span className="ag-stat-value"><b>{sampledCount}</b> leaves &amp; fruits</span>
          </div>
          <div className="ag-stat-row">
            <span className="ag-stat-label">Rituparna Ratio Multiplier:</span>
            <span className="ag-stat-value">× {selectedSectors.length ? (10 / selectedSectors.length).toFixed(1) : 0}</span>
          </div>

          <div className="ag-slider-wrap">
            <label className="ag-slider-label" htmlFor="userEstimateRange">
              <span>Your Estimated Total Population (संपूर्ण-अनुमानम्):</span>
              <b>{userEstimate} fruits</b>
            </label>
            <input
              id="userEstimateRange"
              type="range"
              min="500"
              max="4000"
              step="10"
              value={userEstimate}
              disabled={revealed}
              onChange={(e) => setUserEstimate(parseInt(e.target.value, 10))}
              className="ag-slider"
            />
          </div>

          {!revealed ? (
            <button type="button" className="ag-btn ag-btn--primary" onClick={handleVerify}>
              Verify with Prince Nala! (नलस्य परीक्षा) →
            </button>
          ) : (
            <div className={`ag-result-card ${Number(errorPct) <= 6 ? 'is-gold' : Number(errorPct) <= 15 ? 'is-silver' : 'is-bronze'}`}>
              <div className="ag-result-badge">
                {Number(errorPct) <= 6 ? '👑 ऋतुपर्ण-साङ्ख्यान-प्रवीणः (Master Estimator! +50 pts)' : Number(errorPct) <= 15 ? '🥈 कुशल-अन्वेषकः (Skilled Sampler! +25 pts)' : '🥉 अभ्यासी (Keep Practicing! +10 pts)'}
              </div>
              <div className="ag-result-stats">
                <div>True Population: <b>{totalFruits}</b></div>
                <div>Your Estimate: <b>{userEstimate}</b></div>
                <div>Error Margin: <b>{errorPct}%</b></div>
              </div>
              <p className="ag-result-note">
                {Number(errorPct) <= 6
                  ? '✨ Outstanding! As Rituparna explained to Nala, Akṣa-vidyā and empirical sampling allow one to see the whole through the proportional part.'
                  : 'Notice how adding more sample sectors quickly drops the error variance! Click "New Canopy" to try again.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// GAME 2: ŚUKRANĪTI AGNICŪRṆA & SIEGE ARTILLERY
// ============================================================================
const AgnicurnaGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [saltpetre, setSaltpetre] = useState(5);
  const [sulphur, setSulphur] = useState(1);
  const [charcoal, setCharcoal] = useState(1);
  const [casing, setCasing] = useState<'bamboo' | 'iron'>('iron');
  const [angle, setAngle] = useState(45);
  const [chargeWeight, setChargeWeight] = useState(80);
  const [targetDist, setTargetDist] = useState(850);
  const [launchOutcome, setLaunchOutcome] = useState<{
    fired: boolean;
    distance: number;
    hit: boolean;
    ruptured: boolean;
    pressureAtm: number;
  } | null>(null);

  const resetTarget = () => {
    soundEffects.playStrokeChime();
    setTargetDist(Math.floor(400 + Math.random() * 900));
    setLaunchOutcome(null);
  };

  const isOptimalRatio = saltpetre === 5 && sulphur === 1 && charcoal === 1;

  const handleFire = () => {
    soundEffects.playPuzzleSnap();
    // Pressure formula: proportional to propellant potency and charge weight
    const ratioPenalty = Math.abs(saltpetre - 5) * 4 + Math.abs(sulphur - 1) * 8 + Math.abs(charcoal - 1) * 6;
    const efficiency = Math.max(0.2, 1.0 - ratioPenalty * 0.05);

    const pressure = Math.round((chargeWeight * 0.45) * efficiency);
    const maxSafePressure = casing === 'iron' ? 50 : 16;
    const ruptured = pressure > maxSafePressure;

    if (ruptured) {
      setLaunchOutcome({
        fired: true,
        distance: 40,
        hit: false,
        ruptured: true,
        pressureAtm: pressure,
      });
      return;
    }

    // Ballistic distance: Range = (v^2 * sin(2 * theta)) / g
    const velocity = Math.sqrt(pressure * 220);
    const rad = (angle * Math.PI) / 180;
    const distance = Math.round((velocity * velocity * Math.sin(2 * rad)) / 9.8);
    const hit = Math.abs(distance - targetDist) <= 45;

    setLaunchOutcome({
      fired: true,
      distance,
      hit,
      ruptured: false,
      pressureAtm: pressure,
    });

    if (hit) {
      soundEffects.playCelebrationChime();
      onScore(50);
    } else {
      soundEffects.playSuccessDing();
      onScore(15);
    }
  };

  return (
    <div className="ag-game-box">
      <div className="ag-game-head">
        <div>
          <h3 className="ag-game-title">🚀 Śukranīti Agnicūrṇa &amp; Siege Artillery</h3>
          <p className="ag-game-sub">
            Balance the ancient 5:1:1 Agnicūrṇa ratio (Saltpetre : Sulphur : Charcoal), choose between bamboo and Mysorean hammered soft-iron casing, and dial your ballistic launch angle to strike the battlefield outpost!
          </p>
        </div>
        <button type="button" className="ag-btn ag-btn--ghost" onClick={resetTarget}>
          ↺ New Target Distance
        </button>
      </div>

      <div className="ag-agnicurna-grid">
        {/* Step 1: Propellant Alchemy */}
        <div className="ag-card-step">
          <h4 className="ag-step-title">🧪 1. Agnicūrṇa Chemical Ratio (शुक्रीनीति 5:1:1)</h4>
          <div className="ag-ratio-sliders">
            <div className="ag-chem-row">
              <label htmlFor="saltpetreInput">Suvarcilavaṇa (Saltpetre / KNO₃): <b>{saltpetre} parts</b></label>
              <input
                id="saltpetreInput"
                type="range"
                min="1"
                max="8"
                value={saltpetre}
                onChange={(e) => setSaltpetre(parseInt(e.target.value, 10))}
                className="ag-slider"
              />
            </div>
            <div className="ag-chem-row">
              <label htmlFor="sulphurInput">Gandhaka (Sulphur / S): <b>{sulphur} parts</b></label>
              <input
                id="sulphurInput"
                type="range"
                min="1"
                max="4"
                value={sulphur}
                onChange={(e) => setSulphur(parseInt(e.target.value, 10))}
                className="ag-slider"
              />
            </div>
            <div className="ag-chem-row">
              <label htmlFor="charcoalInput">Aṅgāra (Arka Charcoal / C): <b>{charcoal} parts</b></label>
              <input
                id="charcoalInput"
                type="range"
                min="1"
                max="4"
                value={charcoal}
                onChange={(e) => setCharcoal(parseInt(e.target.value, 10))}
                className="ag-slider"
              />
            </div>
          </div>
          <div className={`ag-formula-status ${isOptimalRatio ? 'is-optimal' : 'is-suboptimal'}`}>
            {isOptimalRatio ? '✨ Perfect Śukranīti 5:1:1 Ratio (Max Thrust & Stability)' : '⚠️ Imperfect Ratio: Lower Burn Efficiency'}
          </div>
        </div>

        {/* Step 2: Casing & Ballistics */}
        <div className="ag-card-step">
          <h4 className="ag-step-title">🛡️ 2. Motor Casing Metallurgy (लोहनालम्)</h4>
          <div className="ag-casing-toggle">
            <button
              type="button"
              className={`ag-casing-btn ${casing === 'bamboo' ? 'is-selected' : ''}`}
              onClick={() => setCasing('bamboo')}
            >
              🎋 Bamboo / Cardboard Casing
              <small>Max Safe Pressure: 16 atm (Bursts if exceeded)</small>
            </button>
            <button
              type="button"
              className={`ag-casing-btn ${casing === 'iron' ? 'is-selected' : ''}`}
              onClick={() => setCasing('iron')}
            >
              ⚔️ Mysorean Hammered Soft-Iron Cylinder
              <small>Max Safe Pressure: 50 atm (Pollilur 1780 spec)</small>
            </button>
          </div>

          <div className="ag-ballistic-inputs">
            <div className="ag-chem-row">
              <label htmlFor="chargeWeightInput">Propellant Charge Weight: <b>{chargeWeight} g</b></label>
              <input
                id="chargeWeightInput"
                type="range"
                min="20"
                max="120"
                step="5"
                value={chargeWeight}
                onChange={(e) => setChargeWeight(parseInt(e.target.value, 10))}
                className="ag-slider"
              />
            </div>
            <div className="ag-chem-row">
              <label htmlFor="launchAngleInput">Launch Elevation Angle (कोणः): <b>{angle}°</b></label>
              <input
                id="launchAngleInput"
                type="range"
                min="15"
                max="75"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value, 10))}
                className="ag-slider"
              />
            </div>
          </div>

          <div className="ag-target-box">
            🎯 Target Outpost Distance: <b>{targetDist} meters</b>
          </div>

          <button type="button" className="ag-btn ag-btn--primary ag-btn--fire" onClick={handleFire}>
            🔥 Fire Agnibāṇa Artillery! (अग्निबाण-प्रक्षेपः)
          </button>
        </div>
      </div>

      {launchOutcome && (
        <div className={`ag-launch-result ${launchOutcome.ruptured ? 'is-burst' : launchOutcome.hit ? 'is-hit' : 'is-miss'}`}>
          {launchOutcome.ruptured ? (
            <div>
              💥 <b>Casing Ruptured on Launch Pad!</b> Internal chamber combustion reached {launchOutcome.pressureAtm} atm, exceeding the bamboo limit of 16 atm. Switch to hammered soft-iron casing to contain high thrust!
            </div>
          ) : launchOutcome.hit ? (
            <div>
              🎯 <b>DIRECT HIT AT {launchOutcome.distance} METERS! (+50 pts)</b> The iron cylinder sustained {launchOutcome.pressureAtm} atm without rupture, sending the rocket directly into the target coordinates!
            </div>
          ) : (
            <div>
              🚀 Rocket Traveled <b>{launchOutcome.distance} meters</b> (Target was {targetDist}m — diff: {launchOutcome.distance - targetDist}m). Adjust your angle θ or propellant charge to zero in!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// GAME 3: LĪLĀVATĪ’S POETIC MATH QUEST
// ============================================================================
const LilavatiGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [activeRiddle, setActiveRiddle] = useState<'bees' | 'peacock' | 'necklace'>('bees');
  const [beeSlider, setBeeSlider] = useState(10);
  const [peacockSlider, setPeacockSlider] = useState(10);
  const [necklaceSlider, setNecklaceSlider] = useState(20);
  const [solvedState, setSolvedState] = useState<Record<string, boolean>>({});

  const checkBees = () => {
    if (beeSlider === 15) {
      soundEffects.playCelebrationChime();
      setSolvedState((p) => ({ ...p, bees: true }));
      onScore(40);
    } else {
      soundEffects.playPuzzleSnap();
    }
  };

  const checkPeacock = () => {
    if (peacockSlider === 15) {
      soundEffects.playCelebrationChime();
      setSolvedState((p) => ({ ...p, peacock: true }));
      onScore(40);
    } else {
      soundEffects.playPuzzleSnap();
    }
  };

  const checkNecklace = () => {
    if (necklaceSlider === 30) {
      soundEffects.playCelebrationChime();
      setSolvedState((p) => ({ ...p, necklace: true }));
      onScore(40);
    } else {
      soundEffects.playPuzzleSnap();
    }
  };

  return (
    <div className="ag-game-box">
      <div className="ag-game-head">
        <div>
          <h3 className="ag-game-title">🪷 Līlāvatī’s Poetic Math Quest</h3>
          <p className="ag-game-sub">
            Bhāskarācārya composed mathematics as love-letters of poetic inquiry to his brilliant daughter Līlāvatī. Solve these famous classical verse riddles!
          </p>
        </div>
        <div className="ag-riddle-selector">
          <button
            type="button"
            className={`ag-riddle-tab ${activeRiddle === 'bees' ? 'is-active' : ''}`}
            onClick={() => setActiveRiddle('bees')}
          >
            🐝 The Swarm of Bees {solvedState.bees && '✅'}
          </button>
          <button
            type="button"
            className={`ag-riddle-tab ${activeRiddle === 'peacock' ? 'is-active' : ''}`}
            onClick={() => setActiveRiddle('peacock')}
          >
            🦚 The Peacock &amp; Snake {solvedState.peacock && '✅'}
          </button>
          <button
            type="button"
            className={`ag-riddle-tab ${activeRiddle === 'necklace' ? 'is-active' : ''}`}
            onClick={() => setActiveRiddle('necklace')}
          >
            📿 The Broken Pearl Necklace {solvedState.necklace && '✅'}
          </button>
        </div>
      </div>

      {activeRiddle === 'bees' && (
        <div className="ag-riddle-panel">
          <div className="ag-verse-box" lang="sa">
            📜 <b>पञ्चांशोऽलिकुलात् जगाम कदलीमूलं त्र्यंशः पुनः...</b>
            <div className="ag-verse-trans">
              "A fifth of a swarm of bees settled on a Kadamba blossom, a third on a Śilīndhra flower; three times the difference of these two flew to a Kutaja arbor; one solitary bee remained hovering in the air attracted by a lotus... tell me, charming maiden, the total number of bees!"
            </div>
          </div>
          <div className="ag-math-breakdown">
            {'Equation: x - x/5 - x/3 - 3(x/3 - x/5) = 1'}
          </div>

          <div className="ag-interactive-slider">
            <label htmlFor="beeSliderInput">Test Swarm Size (x): <b>{beeSlider} bees</b></label>
            <input
              id="beeSliderInput"
              type="range"
              min="5"
              max="45"
              step="5"
              value={beeSlider}
              onChange={(e) => setBeeSlider(parseInt(e.target.value, 10))}
              className="ag-slider"
            />
          </div>

          <div className="ag-swarm-inspection">
            <div>Kadamba (1/5): <b>{(beeSlider / 5).toFixed(1)}</b></div>
            <div>Śilīndhra (1/3): <b>{(beeSlider / 3).toFixed(1)}</b></div>
            <div>Kutaja (3 × diff): <b>{(3 * (beeSlider / 3 - beeSlider / 5)).toFixed(1)}</b></div>
            <div>Remaining in air: <b>{(beeSlider - (beeSlider / 5 + beeSlider / 3 + 3 * (beeSlider / 3 - beeSlider / 5))).toFixed(1)}</b> (Target: 1)</div>
          </div>

          <button type="button" className="ag-btn ag-btn--primary" onClick={checkBees}>
            {solvedState.bees ? '✅ Solved! Swarm = 15 Bees' : 'Verify Swarm Count'}
          </button>
        </div>
      )}

      {activeRiddle === 'peacock' && (
        <div className="ag-riddle-panel">
          <div className="ag-verse-box" lang="sa">
            📜 <b>अस्ति स्तम्भतले बिलं तदुपरि क्रीडन् मयूरः स्थितः...</b>
            <div className="ag-verse-trans">
              "A pillar stands 9 cubits high; at its base is a snake's hole. A peacock sits at the top. Seeing a serpent slithering towards the hole from a distance of 27 cubits, the peacock swoops down along the hypotenuse at equal speed. At what distance from the hole do they collide?"
            </div>
          </div>
          <div className="ag-math-breakdown">
            {'Theorem of the Diagonal: 9² + (27 - x)² = x² ⟹ 81 + 729 - 54x + x² = x² ⟹ 54x = 810'}
          </div>

          <div className="ag-interactive-slider">
            <label htmlFor="peacockSliderInput">Collision Distance from Hole (x): <b>{peacockSlider} cubits</b></label>
            <input
              id="peacockSliderInput"
              type="range"
              min="5"
              max="25"
              value={peacockSlider}
              onChange={(e) => setPeacockSlider(parseInt(e.target.value, 10))}
              className="ag-slider"
            />
          </div>

          <div className="ag-swarm-inspection">
            <div>Distance from Pillar Base: <b>{27 - peacockSlider} cubits</b></div>
            <div>Pillar Height Squared + Ground Distance Squared: <b>{81 + (27 - peacockSlider) ** 2}</b></div>
            <div>Hypotenuse Flight Distance Squared: <b>{peacockSlider ** 2}</b></div>
          </div>

          <button type="button" className="ag-btn ag-btn--primary" onClick={checkPeacock}>
            {solvedState.peacock ? '✅ Solved! Distance x = 15 Cubits' : 'Verify Collision Distance'}
          </button>
        </div>
      )}

      {activeRiddle === 'necklace' && (
        <div className="ag-riddle-panel">
          <div className="ag-verse-box" lang="sa">
            📜 <b>हारात् तारतरङ्गात् मुक्ताप्रकरः...</b>
            <div className="ag-verse-trans">
              "A pearl necklace broke in play: a third of the pearls fell to the floor, a fifth onto the couch, a sixth was found by the young maiden, a tenth gathered by her beloved, and 6 remained unbroken on the string. How many pearls were in the garland?"
            </div>
          </div>
          <div className="ag-math-breakdown">
            {'Equation: x - (x/3 + x/5 + x/6 + x/10) = 6 ⟹ x(1 - 4/5) = 6 ⟹ x/5 = 6'}
          </div>

          <div className="ag-interactive-slider">
            <label htmlFor="necklaceSliderInput">Total Pearls in Garland (x): <b>{necklaceSlider} pearls</b></label>
            <input
              id="necklaceSliderInput"
              type="range"
              min="10"
              max="60"
              step="5"
              value={necklaceSlider}
              onChange={(e) => setNecklaceSlider(parseInt(e.target.value, 10))}
              className="ag-slider"
            />
          </div>

          <div className="ag-swarm-inspection">
            <div>Floor (1/3): <b>{(necklaceSlider / 3).toFixed(1)}</b></div>
            <div>Couch (1/5): <b>{(necklaceSlider / 5).toFixed(1)}</b></div>
            <div>Maiden (1/6): <b>{(necklaceSlider / 6).toFixed(1)}</b></div>
            <div>Beloved (1/10): <b>{(necklaceSlider / 10).toFixed(1)}</b></div>
            <div>Remaining Unbroken: <b>{(necklaceSlider * 0.2).toFixed(1)}</b> (Target: 6)</div>
          </div>

          <button type="button" className="ag-btn ag-btn--primary" onClick={checkNecklace}>
            {solvedState.necklace ? '✅ Solved! Total Garland = 30 Pearls' : 'Verify Pearl Garland'}
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// GAME 4: THE KUṬṬAKA PULVERIZER ENGINE
// ============================================================================
const KuttakaGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  // Solve: 137x - 60y = 1
  const [step1Quot, setStep1Quot] = useState('');
  const [step2Quot, setStep2Quot] = useState('');
  const [step3Quot, setStep3Quot] = useState('');
  const [completed, setCompleted] = useState(false);

  const checkLadder = () => {
    // 137 / 60 = 2 rem 17
    // 60 / 17 = 3 rem 9
    // 17 / 9 = 1 rem 8
    // 9 / 8 = 1 rem 1
    if (step1Quot.trim() === '2' && step2Quot.trim() === '3' && step3Quot.trim() === '1') {
      soundEffects.playCelebrationChime();
      setCompleted(true);
      onScore(45);
    } else {
      soundEffects.playPuzzleSnap();
    }
  };

  return (
    <div className="ag-game-box">
      <div className="ag-game-head">
        <div>
          <h3 className="ag-game-title">🔨 The Kuṭṭaka Pulverizer Engine</h3>
          <p className="ag-game-sub">
            The word <i>Kuṭṭaka</i> (कुट्टक) means "pulverizer" — smashing large planetary periods into irreducible remainders to solve indeterminate equations \(ax - by = c\).
          </p>
        </div>
      </div>

      <div className="ag-kuttaka-problem">
        <div className="ag-problem-equation">
          Equation: <b>137x - 60y = 1</b> (Aryabhata’s Classic Synod Problem)
        </div>
        <p className="ag-problem-desc">
          Fill in the division quotient column (Vallī) as large numbers are pulverized step-by-step into remainders:
        </p>

        <div className="ag-ladder-grid">
          <div className="ag-ladder-step">
            <span>Step 1: 137 ÷ 60 = Quotient:</span>
            <input
              type="text"
              value={step1Quot}
              placeholder="?"
              onChange={(e) => setStep1Quot(e.target.value)}
              className="ag-kuttaka-input"
            />
            <span>(Remainder: 17)</span>
          </div>

          <div className="ag-ladder-step">
            <span>Step 2: 60 ÷ 17 = Quotient:</span>
            <input
              type="text"
              value={step2Quot}
              placeholder="?"
              onChange={(e) => setStep2Quot(e.target.value)}
              className="ag-kuttaka-input"
            />
            <span>(Remainder: 9)</span>
          </div>

          <div className="ag-ladder-step">
            <span>Step 3: 17 ÷ 9 = Quotient:</span>
            <input
              type="text"
              value={step3Quot}
              placeholder="?"
              onChange={(e) => setStep3Quot(e.target.value)}
              className="ag-kuttaka-input"
            />
            <span>(Remainder: 8)</span>
          </div>
        </div>

        <button type="button" className="ag-btn ag-btn--primary" onClick={checkLadder}>
          {completed ? '✅ Vallī Pulverizer Verified! (+45 pts)' : 'Pulverize & Reconstruct'}
        </button>

        {completed && (
          <div className="ag-kuttaka-solution">
            ✨ <b>Minimal Integer Solution Found:</b> x = 11 days, y = 25 revolutions!
            <p>137(11) - 60(25) = 1507 - 1500 = 1. The planetary bodies align precisely on day 11!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// GAME 5: PINGALA’S BINARY MERUPRASTĀRA STAIRCASE
// ============================================================================
const PingalaGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [syllables, setSyllables] = useState<('L' | 'G')[]>(['G', 'L', 'L', 'G']);
  const [discoveredMeters, setDiscoveredMeters] = useState<string[]>([]);

  const addSyllable = (type: 'L' | 'G') => {
    if (syllables.length < 5) {
      soundEffects.playStrokeChime();
      setSyllables([...syllables, type]);
    }
  };

  const clearMeter = () => {
    soundEffects.playStrokeChime();
    setSyllables([]);
  };

  const recordMeter = () => {
    if (syllables.length < 2) return;
    const seq = syllables.join('');
    if (!discoveredMeters.includes(seq)) {
      soundEffects.playCelebrationChime();
      setDiscoveredMeters((prev) => [...prev, seq]);
      onScore(20);
    } else {
      soundEffects.playSuccessDing();
    }
  };

  const n = syllables.length;
  const kGuru = syllables.filter((s) => s === 'G').length;
  const binaryVal = syllables.map((s) => (s === 'G' ? '1' : '0')).join('');
  const decimalVal = parseInt(binaryVal || '0', 2);

  // Generate Pascal / Meruprastāra triangle up to n
  const pascalTriangle = useMemo(() => {
    const tri: number[][] = [];
    for (let r = 0; r <= 5; r++) {
      const row: number[] = [];
      for (let c = 0; c <= r; c++) {
        if (c === 0 || c === r) row.push(1);
        else row.push(tri[r - 1][c - 1] + tri[r - 1][c]);
      }
      tri.push(row);
    }
    return tri;
  }, []);

  return (
    <div className="ag-game-box">
      <div className="ag-game-head">
        <div>
          <h3 className="ag-game-title">🔺 Pingala’s Meruprastāra Staircase</h3>
          <p className="ag-game-sub">
            Tap Laghu (˘ = 0) and Guru (– = 1) rhythm syllables. Watch the binomial coefficients highlight on the Meruprastāra pyramid (Pascal’s triangle) invented over a millennium earlier by Acharya Pingala!
          </p>
        </div>
      </div>

      <div className="ag-pingala-layout">
        <div className="ag-meter-builder">
          <div className="ag-meter-display">
            {syllables.length === 0 ? (
              <span className="ag-empty-text">Tap Laghu or Guru to build a poetic meter...</span>
            ) : (
              syllables.map((s, idx) => (
                <span key={idx} className={`ag-syl-token ${s === 'G' ? 'is-guru' : 'is-laghu'}`}>
                  {s === 'G' ? '– Guru (1)' : '˘ Laghu (0)'}
                </span>
              ))
            )}
          </div>

          <div className="ag-pad-buttons">
            <button type="button" className="ag-pad-btn ag-pad--laghu" onClick={() => addSyllable('L')}>
              ˘ Laghu (Short · 0)
            </button>
            <button type="button" className="ag-pad-btn ag-pad--guru" onClick={() => addSyllable('G')}>
              – Guru (Long · 1)
            </button>
            <button
              type="button"
              className="ag-btn ag-btn--primary"
              onClick={recordMeter}
              disabled={syllables.length < 2}
            >
              ⭐ Record Meter (+20 pts)
            </button>
            <button type="button" className="ag-btn ag-btn--ghost" onClick={clearMeter}>
              ↺ Clear
            </button>
          </div>

          <div className="ag-pingala-stats">
            <div>Meter Length (n): <b>{n}</b></div>
            <div>Total Permutations (2ⁿ): <b>{2 ** n}</b></div>
            <div>Guru Count (k): <b>{kGuru}</b></div>
            <div>Binary Sequence: <b>{binaryVal || '0'}₂</b> (Dec: {decimalVal})</div>
            <div>Discovered Meters: <b>{discoveredMeters.length}</b></div>
          </div>
        </div>

        {/* Meruprastāra Pyramid Visualization */}
        <div className="ag-meru-pyramid">
          <h4 className="ag-pyramid-title">Mount Meru Staircase (मेरुप्रस्तारः)</h4>
          <div className="ag-pyramid-rows">
            {pascalTriangle.map((row, rIdx) => (
              <div key={rIdx} className="ag-pyramid-row">
                {row.map((val, cIdx) => {
                  const isCurrent = rIdx === n && cIdx === kGuru;
                  return (
                    <span
                      key={cIdx}
                      className={`ag-pyramid-cell ${isCurrent ? 'is-active-cell' : ''}`}
                    >
                      {val}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="ag-pyramid-legend">
            Row n = {n}, Column k = {kGuru} ➔ Combinations with {kGuru} Guru syllables = <b>{n >= 0 ? pascalTriangle[n]?.[kGuru] : 1}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// GAME 6: DHANURVEDA STANCE & BALLISTICS
// ============================================================================
const DhanurvedaGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [stance, setStance] = useState<'alidha' | 'pratyalidha' | 'samapada'>('alidha');
  const [angle, setAngle] = useState(35);
  const [drawPull, setDrawPull] = useState(70);
  const [targetMeters, setTargetMeters] = useState(140);
  const [shotResult, setShotResult] = useState<{ dist: number; hit: boolean } | null>(null);

  const newRound = () => {
    soundEffects.playStrokeChime();
    setTargetMeters(Math.floor(80 + Math.random() * 120));
    setShotResult(null);
  };

  const handleShoot = () => {
    soundEffects.playPuzzleSnap();
    // Stance multipliers
    const stanceFactor = stance === 'alidha' ? 1.15 : stance === 'pratyalidha' ? 1.3 : 1.0;
    const v = drawPull * 0.75 * stanceFactor;
    const rad = (angle * Math.PI) / 180;
    const dist = Math.round((v * v * Math.sin(2 * rad)) / 9.8);
    const hit = Math.abs(dist - targetMeters) <= 8;

    setShotResult({ dist, hit });
    if (hit) {
      soundEffects.playCelebrationChime();
      onScore(40);
    } else {
      soundEffects.playSuccessDing();
      onScore(10);
    }
  };

  return (
    <div className="ag-game-box">
      <div className="ag-game-head">
        <div>
          <h3 className="ag-game-title">🎯 Dhanurveda Stance &amp; Ballistics Arena</h3>
          <p className="ag-game-sub">
            The ancient ballistics manual describes geometric combat postures. Choose your stance, tension draw, and flight elevation to hit the bullseye!
          </p>
        </div>
        <button type="button" className="ag-btn ag-btn--ghost" onClick={newRound}>
          ↺ New Target
        </button>
      </div>

      <div className="ag-dhanur-layout">
        <div className="ag-stance-select">
          <label className="ag-slider-label">Select Geometric Stance (स्थान-भेदः):</label>
          <div className="ag-stance-cards">
            <button
              type="button"
              className={`ag-stance-card ${stance === 'alidha' ? 'is-active' : ''}`}
              onClick={() => setStance('alidha')}
            >
              <b>📐 Ālīḍha (Right-Angle Wedge)</b>
              <span>70% Front weight · High Piercing Velocity</span>
            </button>
            <button
              type="button"
              className={`ag-stance-card ${stance === 'pratyalidha' ? 'is-active' : ''}`}
              onClick={() => setStance('pratyalidha')}
            >
              <b>🏹 Pratyālīḍha (Rear Anchor Wedge)</b>
              <span>70% Rear weight · Maximum Long Range Arc</span>
            </button>
            <button
              type="button"
              className={`ag-stance-card ${stance === 'samapada' ? 'is-active' : ''}`}
              onClick={() => setStance('samapada')}
            >
              <b>⚖️ Samapāda (Balanced Square)</b>
              <span>50/50 Balance · Stable Precision Fire</span>
            </button>
          </div>
        </div>

        <div className="ag-flight-controls">
          <div className="ag-chem-row">
            <label htmlFor="bowTensionInput">Bowstring Tension Draw: <b>{drawPull} lbs</b></label>
            <input
              id="bowTensionInput"
              type="range"
              min="40"
              max="100"
              value={drawPull}
              onChange={(e) => setDrawPull(parseInt(e.target.value, 10))}
              className="ag-slider"
            />
          </div>

          <div className="ag-chem-row">
            <label htmlFor="elevationAngleInput">Release Angle (उन्नति-कोणः): <b>{angle}°</b></label>
            <input
              id="elevationAngleInput"
              type="range"
              min="15"
              max="65"
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value, 10))}
              className="ag-slider"
            />
          </div>

          <div className="ag-target-box">
            🎯 Target Distance: <b>{targetMeters} meters</b>
          </div>

          <button type="button" className="ag-btn ag-btn--primary" onClick={handleShoot}>
            🏹 Loose Arrow! (बाण-मोक्षः)
          </button>
        </div>
      </div>

      {shotResult && (
        <div className={`ag-launch-result ${shotResult.hit ? 'is-hit' : 'is-miss'}`}>
          {shotResult.hit ? (
            <div>
              🎯 <b>BULLSEYE! LAKṢYA PENETRATED (+40 pts)</b> Arrow struck target at {shotResult.dist} meters using the {stance.toUpperCase()} stance geometry!
            </div>
          ) : (
            <div>
              🏹 Arrow landed at <b>{shotResult.dist} meters</b> (Target was {targetMeters}m — difference: {shotResult.dist - targetMeters}m). Adjust draw weight or release angle!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// GAME 7: THE ANCIENT METROLOGY SCALE (गुञ्जा-तुला)
// ============================================================================
interface ArtifactItem {
  id: string;
  name: string;
  devName: string;
  sourceText: string;
  weightGunja: number;
  desc: string;
}

const METROLOGY_ARTIFACTS: ArtifactItem[] = [
  {
    id: 'karsapana',
    name: 'Mauryan Silver Kārṣāpaṇa Coin',
    devName: 'मौर्य-कार्षापणम्',
    sourceText: 'Arthaśāstra (Book 2, Ch 19): 1 Kārṣāpaṇa = 32 Raktikās',
    weightGunja: 32,
    desc: 'Punch-marked silver coin of the Maurya Empire (~3.87 grams). Counterweight must equal exactly 32 seeds.',
  },
  {
    id: 'suvarna',
    name: 'Gupta Imperial Suvarṇa Gold Dinar',
    devName: 'गुप्त-सुवर्ण-दीनारः',
    sourceText: 'Caraka Saṃhitā & Manu Smṛti: 1 Suvarṇa = 1 Karṣa = 80 Guñjās',
    weightGunja: 80,
    desc: 'Heavy pure gold coin minted by Samudragupta (~9.68 grams). Equaled 80 natural botanical Guñjā seeds.',
  },
  {
    id: 'vaidurya',
    name: 'Royal Vaidūrya (Cat’s Eye Chrysoberyl)',
    devName: 'राज-वैदूर्य-रत्नम्',
    sourceText: 'Ratnaparīkṣā: Gemologist balance standard',
    weightGunja: 16,
    desc: 'Precious royal gemstone (~1.94 grams) tested on jeweller’s sensitive balances.',
  },
  {
    id: 'bhasma',
    name: 'Ayurvedic Rasāyana Gold Bhasma Dose',
    devName: 'रस-चिकित्सा-स्वर्णभस्म',
    sourceText: 'Śārṅgadhara Saṃhitā: Medicinal micro-weight',
    weightGunja: 4,
    desc: 'Incinerated medicinal gold elixir measured in microscopic 4-seed precision units (~0.48 grams).',
  },
];

const MetrologyGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [rightUnits, setRightUnits] = useState<number>(0);
  const [balancedSuccess, setBalancedSuccess] = useState<boolean>(false);

  const currentArtifact = METROLOGY_ARTIFACTS[selectedIdx];
  const diff = rightUnits - currentArtifact.weightGunja;
  const tiltDeg = Math.max(-22, Math.min(22, diff * 1.4));

  const addWeight = (units: number) => {
    soundEffects.playPuzzleSnap();
    const next = rightUnits + units;
    setRightUnits(next);
    if (next === currentArtifact.weightGunja) {
      soundEffects.playCelebrationChime();
      setBalancedSuccess(true);
      onScore(35);
    } else {
      setBalancedSuccess(false);
    }
  };

  const resetPan = () => {
    soundEffects.playStrokeChime();
    setRightUnits(0);
    setBalancedSuccess(false);
  };

  const selectArtifact = (idx: number) => {
    soundEffects.playPuzzleSnap();
    setSelectedIdx(idx);
    setRightUnits(0);
    setBalancedSuccess(false);
  };

  return (
    <div className="ag-game-box">
      <div className="ag-game-head">
        <div>
          <h3 className="ag-game-title">⚖️ The Ancient Metrology Scale (गुञ्जा-तुला)</h3>
          <p className="ag-game-sub">
            Before standard metallic gram weights, ancient India used nature’s cryptographically uniform seed — the scarlet <b>Raktikā / Guñjā</b> (Abrus precatorius, ~0.121g). Balance the antique artifact on the dual-pan beam balance!
          </p>
        </div>
        <button type="button" className="ag-btn ag-btn--ghost" onClick={resetPan}>
          ↺ Empty Pan
        </button>
      </div>

      <div className="ag-metrology-layout">
        {/* Artifact Picker */}
        <div className="ag-artifact-selector">
          <label className="ag-slider-label">Select Antiquity to Weigh:</label>
          <div className="ag-artifact-cards">
            {METROLOGY_ARTIFACTS.map((art, idx) => (
              <button
                key={art.id}
                type="button"
                className={`ag-artifact-card ${idx === selectedIdx ? 'is-active' : ''}`}
                onClick={() => selectArtifact(idx)}
              >
                <div className="ag-art-title">{art.name}</div>
                <div className="ag-art-dev" lang="sa">{art.devName}</div>
                <div className="ag-art-src">{art.sourceText}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Balance Scale */}
        <div className="ag-scale-display">
          <div className="ag-beam-stage">
            <div className="ag-fulcrum-pivot">
              <div
                className="ag-beam-arm"
                style={{ transform: `rotate(${tiltDeg}deg)` }}
              >
                {/* Left Pan */}
                <div className="ag-pan-container ag-pan--left">
                  <div className="ag-pan-ropes" />
                  <div className="ag-pan-plate">
                    <span className="ag-pan-label">Artifact</span>
                    <span className="ag-pan-weight">{currentArtifact.weightGunja} Guñjās</span>
                  </div>
                </div>

                {/* Central Needle */}
                <div className="ag-beam-needle" />

                {/* Right Pan */}
                <div className="ag-pan-container ag-pan--right">
                  <div className="ag-pan-ropes" />
                  <div className="ag-pan-plate">
                    <span className="ag-pan-label">Counterweights</span>
                    <span className="ag-pan-weight">{rightUnits} Guñjās</span>
                  </div>
                </div>
              </div>
              <div className="ag-fulcrum-base" />
            </div>
          </div>

          <div className="ag-scale-status">
            {diff === 0 ? (
              <span className="ag-status-badge is-balanced">
                ✅ सम-तुला (Equilibrium Achieved)!
              </span>
            ) : diff < 0 ? (
              <span className="ag-status-badge is-left-heavy">
                ⬅️ Left Heavy: Need {Math.abs(diff)} more Guñjās
              </span>
            ) : (
              <span className="ag-status-badge is-right-heavy">
                ➡️ Right Heavy: Excess by {diff} Guñjās!
              </span>
            )}
          </div>

          {/* Botanical & Traditional Weights Rack */}
          <div className="ag-weights-dock">
            <div className="ag-dock-title">Add Counterweights (तुला-मानम्):</div>
            <div className="ag-dock-buttons">
              <button
                type="button"
                className="ag-weight-btn"
                onClick={() => addWeight(1)}
              >
                🔴 1 Guñjā (रक्तिका · 1 seed)
              </button>
              <button
                type="button"
                className="ag-weight-btn"
                onClick={() => addWeight(5)}
              >
                🌾 1 Māṣa (माषः · 5 seeds)
              </button>
              <button
                type="button"
                className="ag-weight-btn"
                onClick={() => addWeight(16)}
              >
                🪙 1 Dharaṇa (धरणम् · 16 seeds)
              </button>
              <button
                type="button"
                className="ag-weight-btn"
                onClick={() => addWeight(40)}
              >
                ⚖️ 1/2 Karṣa (अर्धकर्षः · 40 seeds)
              </button>
            </div>
          </div>
        </div>
      </div>

      {balancedSuccess && (
        <div className="ag-launch-result is-hit">
          ✨ <b>EXACT WEIGHING CONFIRMED! (+35 pts)</b>
          <p>
            {currentArtifact.name} weighs exactly <b>{currentArtifact.weightGunja} Guñjā seeds</b> (\(\approx {(currentArtifact.weightGunja * 0.121).toFixed(2)}\) grams). {currentArtifact.desc}
          </p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// GAME 8: MADHAVA’S INFINITE PI ACCELERATOR (माधव-परिधि-त्वरकः)
// ============================================================================
const MadhavaPiGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [numTerms, setNumTerms] = useState<number>(6);
  const [correctionMode, setCorrectionMode] = useState<'none' | 'f1' | 'f2' | 'f3'>('none');
  const [rewarded, setRewarded] = useState<boolean>(false);

  const TRUE_PI = '3.141592653589793';

  const approxPi = useMemo(() => {
    let sum = 0;
    for (let k = 1; k <= numTerms; k++) {
      const sign = k % 2 === 1 ? 1 : -1;
      sum += sign / (2 * k - 1);
    }
    const n = numTerms;
    const signCorrection = n % 2 === 1 ? -1 : 1;
    let rn = 0;
    if (correctionMode === 'f1') {
      rn = 1 / (4 * n);
    } else if (correctionMode === 'f2') {
      rn = n / (4 * n * n + 1);
    } else if (correctionMode === 'f3') {
      rn = (n * n + 1) / (4 * Math.pow(n, 3) + 5 * n);
    }

    return 4 * (sum + signCorrection * rn);
  }, [numTerms, correctionMode]);

  const approxStr = approxPi.toFixed(15);

  const matchedDigitsCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < TRUE_PI.length; i++) {
      if (approxStr[i] === TRUE_PI[i]) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }, [approxStr]);

  const testConvergence = () => {
    if (matchedDigitsCount >= 8 && !rewarded) {
      soundEffects.playCelebrationChime();
      setRewarded(true);
      onScore(45);
    } else {
      soundEffects.playStrokeChime();
    }
  };

  return (
    <div className="ag-game-box">
      <div className="ag-game-head">
        <div>
          <h3 className="ag-game-title">♾️ Madhava’s Infinite Pi Accelerator</h3>
          <p className="ag-game-sub">
            Madhava of Sangamagrama (1340–1425 CE) formulated the infinite series for \(\pi\) centuries ahead of Newton and Leibniz, inventing fast-converging rational remainder corrections (*Antya-saṃskāra*).
          </p>
        </div>
      </div>

      <div className="ag-madhava-layout">
        {/* Controls */}
        <div className="ag-madhava-controls">
          <div className="ag-chem-row">
            <label htmlFor="piTermsInput">Number of Series Terms (N): <b>{numTerms}</b></label>
            <input
              id="piTermsInput"
              type="range"
              min="1"
              max="35"
              value={numTerms}
              onChange={(e) => {
                setNumTerms(parseInt(e.target.value, 10));
                testConvergence();
              }}
              className="ag-slider"
            />
          </div>

          <div className="ag-correction-selector">
            <label className="ag-slider-label">Engage Kerala Remainder Correction (*Antya-saṃskāra*):</label>
            <div className="ag-correction-options">
              <button
                type="button"
                className={`ag-corr-btn ${correctionMode === 'none' ? 'is-active' : ''}`}
                onClick={() => {
                  setCorrectionMode('none');
                  testConvergence();
                }}
              >
                <b>Uncorrected Leibniz Series</b>
                <span>R_N = 0 · Ultra slow! Needs 500,000 terms for 5 digits</span>
              </button>
              <button
                type="button"
                className={`ag-corr-btn ${correctionMode === 'f1' ? 'is-active' : ''}`}
                onClick={() => {
                  setCorrectionMode('f1');
                  testConvergence();
                }}
              >
                <b>1st Correction: R_N = 1 / (4N)</b>
                <span>Rapid acceleration · Cancels first-order oscillation</span>
              </button>
              <button
                type="button"
                className={`ag-corr-btn ${correctionMode === 'f2' ? 'is-active' : ''}`}
                onClick={() => {
                  setCorrectionMode('f2');
                  testConvergence();
                }}
              >
                <b>2nd Correction: R_N = N / (4N² + 1)</b>
                <span>Madhava’s refinement · High precision in few terms</span>
              </button>
              <button
                type="button"
                className={`ag-corr-btn ${correctionMode === 'f3' ? 'is-active' : ''}`}
                onClick={() => {
                  setCorrectionMode('f3');
                  testConvergence();
                }}
              >
                <b>Yuktibhāṣā 3rd: R_N = (N² + 1) / (4N³ + 5N)</b>
                <span>🚀 Rocket convergence! 9+ digits in under 12 terms!</span>
              </button>
            </div>
          </div>
        </div>

        {/* Readout and comparison */}
        <div className="ag-pi-readout-card">
          <div className="ag-readout-head">
            <span>Accuracy: <b>{matchedDigitsCount} exact digits</b></span>
            <span>True \(\pi\): <code>{TRUE_PI}</code></span>
          </div>

          <div className="ag-digits-box">
            {approxStr.split('').map((ch, idx) => {
              const isMatch = idx < matchedDigitsCount;
              return (
                <span
                  key={idx}
                  className={`ag-digit-cell ${isMatch ? 'is-correct' : 'is-mismatch'}`}
                >
                  {ch}
                </span>
              );
            })}
          </div>

          <div className="ag-series-formula-box">
            <code>
              {`\\pi / 4 = 1 - 1/3 + 1/5 - ... ± 1/${2 * numTerms - 1}${correctionMode !== 'none' ? ` ± R_{${numTerms}}` : ''}`}
            </code>
          </div>

          {matchedDigitsCount >= 8 && (
            <div className="ag-convergence-toast">
              🎉 <b>Sublime Kerala Convergence!</b> With just {numTerms} terms and Yuktibhāṣā rational corrections, you calculated \(\pi\) past 8 decimal places!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// GAME 9: THE COLOSSAL POWERS VAULT (सङ्ख्या-विस्तार-भाण्डागारः)
// ============================================================================
interface VaultRiddle {
  id: string;
  riddle: string;
  context: string;
  exponent: number;
  correctName: string;
  sanskrit: string;
  options: string[];
}

const VAULT_RIDDLES: VaultRiddle[] = [
  {
    id: 'ayuta',
    riddle: 'A monarch pledges 100 Crore coins to a university. In Vedic decimal nomenclature, what is 100 Crore (1 Billion = 10⁹)?',
    context: 'From the Yajurveda Saṃhitā decimal series (daśa, śata, sahasra, ayuta, niyuta...)',
    exponent: 9,
    correctName: 'Ayuta (अयुतम्)',
    sanskrit: 'अयुतं दशकोटयः',
    options: ['Ayuta (अयुतम्)', 'Prayuta (प्रयुतम्)', 'Arbuda (अर्बुदम्)', 'Kharva (खर्वम्)'],
  },
  {
    id: 'kankara',
    riddle: 'How many seconds elapse in an entire Mahāyuga of 4,320,000 solar years (~1.36 × 10¹⁴ seconds)? Which ancient class covers 10¹³?',
    context: 'Lalitavistara Sutra decimal hierarchy',
    exponent: 13,
    correctName: 'Kaṅkara (कङ्करम्)',
    sanskrit: 'शतसहस्रकोट्यः कङ्करम्',
    options: ['Kaṅkara (कङ्करम्)', 'Padma (पद्मम्)', 'Vivara (विवरम्)', 'Kṣobhya (क्षोभ्यः)'],
  },
  {
    id: 'vivara',
    riddle: 'The classic Buddhist metaphor compares immense numbers to the sands of the River Gaṅgā (~10¹⁵ grains). What is 10¹⁵?',
    context: 'Lalitavistara counting dialogue with the arithmetician Arjuna',
    exponent: 15,
    correctName: 'Vivara (विवरम्)',
    sanskrit: 'दशकङ्करं विवरम्',
    options: ['Vivara (विवरम्)', 'Kṣema (क्षेमम्)', 'Tallakṣaṇa (तल्लक्षणम्)', 'Śaṅku (शङ्कुः)'],
  },
  {
    id: 'tallaksana',
    riddle: 'In the supreme decimal counting tournament, Prince Siddhartha finishes the hundredth scale at 10⁵³. What is this pinnacle power?',
    context: 'The ultimate named exponent in Buddhist canonical mathematics',
    exponent: 53,
    correctName: 'Tallakṣaṇa (तल्लक्षणम्)',
    sanskrit: 'परम-गणित-सीमा तल्लक्षणम्',
    options: ['Tallakṣaṇa (तल्लक्षणम्)', 'Mahākṣobhya (महाक्षोभ्यः)', 'Ananta (अनन्तम्)', 'Dhvajāgra (ध्वजाग्रम्)'],
  },
];

const ColossalVaultGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [unlockedCount, setUnlockedCount] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const riddle = VAULT_RIDDLES[currentIdx];

  const handleSelectOption = (opt: string) => {
    if (opt === riddle.correctName) {
      soundEffects.playCelebrationChime();
      const nextCount = unlockedCount + 1;
      setUnlockedCount(nextCount);
      setFeedback(`✨ Correct! 10^${riddle.exponent} is ${riddle.correctName} (${riddle.sanskrit})`);
      onScore(35);
      if (currentIdx < VAULT_RIDDLES.length - 1) {
        setTimeout(() => {
          setCurrentIdx(currentIdx + 1);
          setFeedback(null);
        }, 1200);
      }
    } else {
      soundEffects.playPuzzleSnap();
      setFeedback(`❌ Incorrect. Try again! Think of the power 10^${riddle.exponent}.`);
    }
  };

  const resetVault = () => {
    soundEffects.playStrokeChime();
    setCurrentIdx(0);
    setUnlockedCount(0);
    setFeedback(null);
  };

  return (
    <div className="ag-game-box">
      <div className="ag-game-head">
        <div>
          <h3 className="ag-game-title">🌌 The Colossal Powers Vault (सङ्ख्या-विस्तार-भाण्डागारः)</h3>
          <p className="ag-game-sub">
            In the <i>Lalitavistara</i>, Prince Siddhartha astonishes the court mathematicians by reciting named powers of 10 from <i>Koṭi</i> (\(10^7\)) up to <i>Tallakṣaṇa</i> (\(10^{53}\)). Match cosmic quantities to unlock the vault!
          </p>
        </div>
        <button type="button" className="ag-btn ag-btn--ghost" onClick={resetVault}>
          ↺ Reset Vault
        </button>
      </div>

      <div className="ag-vault-layout">
        <div className="ag-vault-door">
          <div className="ag-vault-lock-status">
            <span className="ag-vault-icon">🔐</span>
            <div className="ag-vault-progress">
              <b>Vault Bolts Disengaged: {unlockedCount} / {VAULT_RIDDLES.length}</b>
              <div className="ag-vault-bolts">
                {VAULT_RIDDLES.map((r, i) => (
                  <span
                    key={r.id}
                    className={`ag-bolt-indicator ${i < unlockedCount ? 'is-open' : ''}`}
                  >
                    10^{r.exponent}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="ag-riddle-card">
            <div className="ag-riddle-header">
              <span className="ag-riddle-tag">Challenge {currentIdx + 1} of {VAULT_RIDDLES.length}</span>
              <span className="ag-riddle-exp">Scale: 10^{riddle.exponent}</span>
            </div>
            <p className="ag-riddle-question">{riddle.riddle}</p>
            <div className="ag-riddle-context">📜 Context: {riddle.context}</div>

            <div className="ag-riddle-options">
              {riddle.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className="ag-opt-btn"
                  onClick={() => handleSelectOption(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {feedback && (
              <div className={`ag-riddle-feedback ${feedback.startsWith('✨') ? 'is-success' : 'is-error'}`}>
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// GAME 10: ANIMAL SWARA MELODIC WEAVER (सप्तस्वर-नाद-चक्रम्)
// ============================================================================
interface SwaraAnimal {
  swara: string;
  name: string;
  animal: string;
  animalSkt: string;
  freq: number;
  icon: string;
  desc: string;
}

const SWARAS: SwaraAnimal[] = [
  { swara: 'Sa', name: 'Ṣaḍja (षड्जः)', animal: 'Peacock', animalSkt: 'मयूरः', freq: 261.63, icon: '🦚', desc: 'The fundamental root of the 6 organs, sounding like a calling peacock.' },
  { swara: 'Re', name: 'Ṛṣabha (ऋषभः)', animal: 'Bull', animalSkt: 'वृषभः', freq: 293.66, icon: '🐂', desc: 'Low resonant bellow of the sovereign bull in pasture.' },
  { swara: 'Ga', name: 'Gāndhāra (गान्धारः)', animal: 'Goat', animalSkt: 'अजः', freq: 329.63, icon: '🐐', desc: 'Gentle, melodic mid-register cry of the mountain goat.' },
  { swara: 'Ma', name: 'Madhyama (मध्यमः)', animal: 'Heron', animalSkt: 'क्रौञ्चः', freq: 349.23, icon: '🦩', desc: 'The pure central pivot note, sounding like a wading wetland heron.' },
  { swara: 'Pa', name: 'Pañcama (पञ्चमः)', animal: 'Cuckoo', animalSkt: 'कोकिलः', freq: 392.00, icon: '🐦', desc: 'Sweet, resonant spring melody of the Indian black cuckoo.' },
  { swara: 'Dha', name: 'Dhaivata (धैवतः)', animal: 'Horse', animalSkt: 'अश्वः', freq: 440.00, icon: '🐎', desc: 'Bright, galloping neigh of the proud Vedic courser.' },
  { swara: 'Ni', name: 'Niṣāda (निषादः)', animal: 'Elephant', animalSkt: 'गजः', freq: 493.88, icon: '🐘', desc: 'Deep, trumpeting high note of the noble royal tusker.' },
];

const SaptaswaraWeaverGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [playedNotes, setPlayedNotes] = useState<string[]>([]);
  const targetMelody = useMemo(() => ['Sa', 'Re', 'Ga', 'Pa', 'Dha'], []); // Rāga Bhūpālī motif
  const [questSolved, setQuestSolved] = useState<boolean>(false);

  const playNote = (item: SwaraAnimal) => {
    soundEffects.playSwara(item.freq, 0.45);
    const updated = [...playedNotes, item.swara].slice(-7);
    setPlayedNotes(updated);

    const endsWithTarget = targetMelody.every((m, idx) => updated[updated.length - targetMelody.length + idx] === m);
    if (endsWithTarget && !questSolved) {
      soundEffects.playCelebrationChime();
      setQuestSolved(true);
      onScore(35);
    }
  };

  const clearMelody = () => {
    soundEffects.playStrokeChime();
    setPlayedNotes([]);
    setQuestSolved(false);
  };

  return (
    <div className="ag-game-box">
      <div className="ag-game-head">
        <div>
          <h3 className="ag-game-title">🎵 Animal Swara Melodic Weaver (सप्तस्वर-नाद-चक्रम्)</h3>
          <p className="ag-game-sub">
            The <i>Nāradīya Śikṣā</i> and classical Indian musicology reveal that the 7 sacred musical notes (*Saptasvara*) were learned by ancient sages directly from the animal sounds of pristine nature. Tap each animal to hear its synthesized acoustic tone!
          </p>
        </div>
        <button type="button" className="ag-btn ag-btn--ghost" onClick={clearMelody}>
          ↺ Reset Notes
        </button>
      </div>

      <div className="ag-swara-layout">
        {/* Swara Keyboard */}
        <div className="ag-swara-keys-grid">
          {SWARAS.map((item) => (
            <button
              key={item.swara}
              type="button"
              className="ag-swara-card"
              onClick={() => playNote(item)}
            >
              <span className="ag-swara-icon">{item.icon}</span>
              <span className="ag-swara-note">{item.swara}</span>
              <span className="ag-swara-name">{item.name}</span>
              <span className="ag-swara-animal">{item.animalSkt} · {item.animal}</span>
              <span className="ag-swara-freq">{item.freq.toFixed(1)} Hz</span>
            </button>
          ))}
        </div>

        {/* Melodic Ribbon */}
        <div className="ag-melody-ribbon">
          <div className="ag-ribbon-title">Melody Ribbon:</div>
          <div className="ag-ribbon-notes">
            {playedNotes.length === 0 ? (
              <span className="ag-empty-notes">Tap animals above to weave your melody...</span>
            ) : (
              playedNotes.map((n, i) => (
                <span key={i} className="ag-note-chip">{n}</span>
              ))
            )}
          </div>
        </div>

        {/* Raga Challenge Card */}
        <div className="ag-raga-quest-card">
          <div className="ag-quest-head">
            🎼 <b>Ancient Rāga Challenge: Play the Pentatonic Motif of Rāga Bhūpālī</b>
          </div>
          <p className="ag-quest-desc">
            Play the 5 ancient notes in sequence: <b>Sa ➔ Re ➔ Ga ➔ Pa ➔ Dha</b> (Peacock ➔ Bull ➔ Goat ➔ Cuckoo ➔ Horse).
          </p>
          {questSolved && (
            <div className="ag-quest-success">
              ✨ <b>RĀGA BHŪPĀLĪ HARMONIZED! (+35 pts)</b> You have woven the dawn scale celebrated across three millennia of Indian musicology!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN ARTICLE GAMES HUB CONTAINER
// ============================================================================
export const ArticleGamesHub: React.FC<ArticleGamesHubProps> = ({
  initialGameId,
  onOpenArticle,
  onGoHome,
}) => {
  const [activeGameId, setActiveGameId] = useState<GameId>(() => {
    if (initialGameId && GAMES.some((g) => g.id === initialGameId)) {
      return initialGameId as GameId;
    }
    return 'rituparna';
  });

  useEffect(() => {
    if (initialGameId && GAMES.some((g) => g.id === initialGameId)) {
      setActiveGameId(initialGameId as GameId);
    }
  }, [initialGameId]);

  const [vidyaPoints, setVidyaPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('article_games_vidya_points');
      return saved ? parseInt(saved, 10) || 120 : 120;
    } catch {
      return 120;
    }
  });

  const [toast, setToast] = useState<{ pts: number } | null>(null);

  const addScore = (pts: number) => {
    setVidyaPoints((prev) => {
      const next = prev + pts;
      try {
        localStorage.setItem('article_games_vidya_points', String(next));
      } catch {}
      return next;
    });
    setToast({ pts });
    setTimeout(() => setToast(null), 3000);
  };

  const currentGame = GAMES.find((g) => g.id === activeGameId) || GAMES[0];

  return (
    <div className="ag-hub-container" aria-label="Ancient Science & Article Games Hub">
      {toast && (
        <div className="ag-toast-pts" role="alert">
          +{toast.pts} विद्या-अङ्काः (Vidyā Points)!
        </div>
      )}

      {/* Header Banner */}
      <header className="ag-header-card">
        <div className="ag-header-text">
          <div className="ag-kicker">Interactive Arena · क्रीडा-शाला</div>
          <h2 className="ag-title">
            Games of Ancient India · <span lang="sa">प्राचीन-विज्ञान-क्रीडाः</span>
          </h2>
          <p className="ag-lead">
            Play interactive games based on our published articles: test King Rituparna’s tree sampling, formulate Śukranīti rocket propellant, solve Līlāvatī’s poetic riddles, pulverize Diophantine equations with Kuṭṭaka, master Dhanurveda ballistics, balance antique coins with botanical Guñjā seeds, accelerate Madhava’s infinite Pi series, unlock cosmic powers in the Colossal Vault, and weave classical rāgas with animal Saptasvara tones.
          </p>
          <div className="ag-header-actions">
            {onGoHome && (
              <button type="button" className="ag-btn ag-btn--ghost" onClick={onGoHome}>
                ← Home
              </button>
            )}
            {onOpenArticle && (
              <button
                type="button"
                className="ag-btn ag-btn--ghost"
                onClick={() => onOpenArticle(currentGame.articleSlug)}
              >
                📖 Read Related Article: {currentGame.articleTitle} →
              </button>
            )}
          </div>
        </div>

        <div className="ag-vidya-scorecard">
          <div className="ag-score-tag">Vidyā-Aṅka Score</div>
          <div className="ag-score-num">{vidyaPoints} <span className="ag-score-pts">pts</span></div>
          <div className="ag-score-rank">
            {vidyaPoints >= 500 ? '👑 ऋषि-वैज्ञानिकः (Sage)' : vidyaPoints >= 250 ? '🥇 विद्वान् (Scholar)' : '🥈 अन्वेषकः (Explorer)'}
          </div>
        </div>
      </header>

      {/* Game Selector Tabs */}
      <nav className="ag-game-tabs" aria-label="Article games navigation">
        {GAMES.map((g) => (
          <button
            key={g.id}
            type="button"
            className={`ag-tab-pill ${g.id === activeGameId ? 'is-active' : ''}`}
            onClick={() => {
              soundEffects.playPuzzleSnap();
              setActiveGameId(g.id);
            }}
          >
            <span className="ag-pill-icon">{g.icon}</span>
            <span className="ag-pill-names">
              <span className="ag-pill-title">{g.title}</span>
              <span className="ag-pill-dev" lang="sa">{g.devTitle}</span>
            </span>
          </button>
        ))}
      </nav>

      {/* Active Game Area */}
      <main className="ag-active-arena">
        {activeGameId === 'rituparna' && <RituparnaGame onScore={addScore} />}
        {activeGameId === 'agnicurna' && <AgnicurnaGame onScore={addScore} />}
        {activeGameId === 'lilavati' && <LilavatiGame onScore={addScore} />}
        {activeGameId === 'kuttaka' && <KuttakaGame onScore={addScore} />}
        {activeGameId === 'pingala' && <PingalaGame onScore={addScore} />}
        {activeGameId === 'dhanurveda' && <DhanurvedaGame onScore={addScore} />}
        {activeGameId === 'metrology' && <MetrologyGame onScore={addScore} />}
        {activeGameId === 'madhavapi' && <MadhavaPiGame onScore={addScore} />}
        {activeGameId === 'colossal' && <ColossalVaultGame onScore={addScore} />}
        {activeGameId === 'swara' && <SaptaswaraWeaverGame onScore={addScore} />}
      </main>
    </div>
  );
};

export default ArticleGamesHub;
