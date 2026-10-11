import React, { useState, useEffect, useMemo } from 'react';
import { soundEffects } from '../utils/soundEffects';
import '../styles/article-games.css';

export interface ArticleGamesHubProps {
  initialGameId?: string;
  onOpenArticle?: (slug: string) => void;
  onGoHome?: () => void;
}

type GameId = 'rituparna' | 'agnicurna' | 'lilavati' | 'kuttaka' | 'pingala' | 'dhanurveda';

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
            Play interactive games based on our published articles: test King Rituparna’s tree sampling, formulate Śukranīti rocket propellant, solve Līlāvatī’s poetic riddles, pulverize Diophantine equations with Kuṭṭaka, and loose arrows with Dhanurveda geometry.
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
      </main>
    </div>
  );
};

export default ArticleGamesHub;
