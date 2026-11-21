import React from 'react';
import type { LabSegmentId } from './common';

export interface StemBlueprintMeta {
  domainTag: string;
  formula: string;
  modernLaw: string;
  indianSource: string;
  realWorldApp: string;
  experimentHint: string;
  difficulty: 1 | 2 | 3;
}

export const STEM_BLUEPRINTS: Record<LabSegmentId, StemBlueprintMeta> = {
  'preschool-wonder': {
    domainTag: 'Early STEM · Sensory',
    formula: 'Shape + Color + Sound -> Pattern',
    modernLaw: 'Early Spatial Reasoning & Categorization',
    indianSource: 'Bāla-Saṁskṛta-Prajñā & Ṛtu-Cakra',
    realWorldApp: 'Builds foundational observation, rhythm, and map literacy for ages 3–6.',
    experimentHint: 'Tap any of the 24 sensory games and listen to the gentle Sanskrit pronunciation.',
    difficulty: 1,
  },
  paramanu: {
    domainTag: 'Atomic Physics',
    formula: '2 Paramāṇu -> 1 Dvyaṇuka · 3 Dvyaṇuka -> 1 Tryaṇuka',
    modernLaw: 'Atomic Bonding & Molecular Aggregation',
    indianSource: 'Kaṇāda · Vaiśeṣika Sūtra (c. 600 BCE)',
    realWorldApp: 'Explains how invisible sub-nanometer atoms combine into visible matter and crystals.',
    experimentHint: 'Pair 2 single atoms into a dyad, then fuse 3 dyads to observe the first visible speck.',
    difficulty: 2,
  },
  'asato-ma': {
    domainTag: 'Thermodynamics · Mass',
    formula: 'Σm_initial = Σm_final = 100.000 g',
    modernLaw: 'Law of Conservation of Mass & Phase Transitions',
    indianSource: 'Rasaśāstra Andha-Mūṣā (Sealed Crucible) & Satkāryavāda',
    realWorldApp: 'Closed-system chemical reactors, metallurgy, and atmospheric water cycles.',
    experimentHint: 'Heat ice through melting, boiling, and combustion while watching the sealed mass balance.',
    difficulty: 1,
  },
  prakriti: {
    domainTag: 'Ecology · Homeostasis',
    formula: 'dN/dt = rN(1 - N/K) · Samadoṣa Equilibrium',
    modernLaw: 'Ecosystem Carrying Capacity & Negative Feedback Loops',
    indianSource: 'Āyurveda Tridoṣa & Taittirīya Upaniṣad Food Cycle',
    realWorldApp: 'Climate resilience, sustainable agriculture, and physiological homeostasis.',
    experimentHint: 'Shift rainfall and temperature sliders, then rebalance producers and consumers.',
    difficulty: 1,
  },
  chaturyoni: {
    domainTag: 'Bio-Physics · Taxonomy',
    formula: 'V_m(t) = ΔV · e^(-t/τ) (Action Potential)',
    modernLaw: 'Plant Electrophysiology & Biological Classification',
    indianSource: 'Vṛkṣāyurveda Chaturyoni & Sir J.C. Bose Crescograph',
    realWorldApp: 'Bio-sensors, neuro-signaling, and ecological biodiversity mapping.',
    experimentHint: 'Deliver a gentle tactile or light stimulus and read the microvolt waveform response.',
    difficulty: 2,
  },
  jyotisha: {
    domainTag: 'Orbital Mechanics',
    formula: 'F = G · m₁m₂ / r²  |  T² ∝ a³',
    modernLaw: 'Newtonian Gravitation & Keplerian Elliptical Orbits',
    indianSource: 'Āryabhaṭīya (499 CE) & Sūrya Siddhānta',
    realWorldApp: 'Satellite orbit insertion, gravitational slingshots, and eclipse prediction.',
    experimentHint: 'Adjust tangential velocity until the planet settles into a stable closed ellipse.',
    difficulty: 2,
  },
  chandrayaan: {
    domainTag: 'Aerospace · Telemetry',
    formula: 'Δv = v_e · ln(m₀ / m_f)  |  a_net = T/m - g_moon',
    modernLaw: 'Powered Lunar Descent & LIBS Atomic Emission Spectroscopy',
    indianSource: 'ISRO Chandrayaan-3 · Shiv Shakti Point Telemetry',
    realWorldApp: 'Autonomous spacecraft landing and remote planetary mineral detection.',
    experimentHint: 'Throttle thrusters smoothly to keep vertical touchdown velocity below 2 m/s.',
    difficulty: 2,
  },
  'nada-brahman': {
    domainTag: 'Wave Acoustics',
    formula: 'f_n = (n / 2L) · √(T / μ)',
    modernLaw: 'Standing Waves, Harmonics & 2D Chladni Nodal Plates',
    indianSource: 'Nāṭyaśāstra 22 Śrutis & Nāda Brahman',
    realWorldApp: 'Architectural acoustics, musical instrument design, and ultrasonic imaging.',
    experimentHint: 'Sweep harmonic mode n = 1 to 5 and watch nodal sand patterns lock into symmetry.',
    difficulty: 2,
  },
  'srishti-sthiti-laya': {
    domainTag: 'Field Conservation',
    formula: 'E_total = K + U = Constant',
    modernLaw: 'Conservation of Energy Across System States',
    indianSource: 'Chāndogya Upaniṣad (Uddālaka Āruṇi) & Sāṅkhya',
    realWorldApp: 'Thermodynamic cycles, phase-space dynamics, and renewable energy storage.',
    experimentHint: 'Cycle a particle cloud through Sṛṣṭi, Sthiti, and Laya while tracking total energy.',
    difficulty: 2,
  },
  agnibana: {
    domainTag: 'Ballistics · Chemistry',
    formula: 'R = (v₀² · sin 2θ) / g',
    modernLaw: 'Projectile Kinematics & Solid-Propellant Combustion',
    indianSource: 'Śukranīti Agnicūrṇa (5:1:1) & Mysore Iron-Cased Rockets',
    realWorldApp: 'Launch vehicle staging, aerodynamic fin stabilization, and stoichiometry.',
    experimentHint: 'Tune oxidizer ratio and launch angle θ to land the payload inside the target zone.',
    difficulty: 2,
  },
  'vedic-geometry': {
    domainTag: 'Constructive Geometry',
    formula: 'c² = a² + b²  |  √2 ≈ 577 / 408',
    modernLaw: 'Area-Preserving Geometric Transformations',
    indianSource: 'Baudhāyana & Āpastamba Śulbasūtras (c. 800 BCE)',
    realWorldApp: 'Civil surveying, architectural layout, and CAD computational geometry.',
    experimentHint: 'Stretch diagonal ropes to transform a square altar into an equal-area circle or falcon.',
    difficulty: 3,
  },
  'mantra-acoustics': {
    domainTag: 'Phonetics · DSP',
    formula: 'F₁, F₂, F₃ Vocal Formant Resonance',
    modernLaw: 'Acoustic Formant Synthesis & Spectral Harmonics',
    indianSource: 'Śikṣā & Prātiśākhya 5 Articulation Places (Sthāna)',
    realWorldApp: 'Speech recognition, vocal acoustics, and digital audio signal processing.',
    experimentHint: 'Compare Kaṇṭha, Tālu, Mūrdhā, Danta, and Oṣṭha resonance peaks on the spectrum.',
    difficulty: 3,
  },
  'temple-engineering': {
    domainTag: 'Structural Statics',
    formula: 'ΣF_x = 0, ΣF_y = 0, Στ = 0',
    modernLaw: 'Compressive Load Paths & Interlocking Dry Masonry',
    indianSource: 'Śilpaśāstra & Vāstu Puruṣa Maṇḍala',
    realWorldApp: 'Seismic-resistant masonry, load-bearing domes, and sustainable stone engineering.',
    experimentHint: 'Balance corbelled stone courses and test horizontal seismic shear stability.',
    difficulty: 2,
  },
  kautilya: {
    domainTag: 'Systems · Economics',
    formula: 'Net Surplus = Revenue(Kośa) - Risk(Āpad)',
    modernLaw: 'Multi-Variable Resource Optimization & Actuarial Risk',
    indianSource: 'Kauṭilya Arthaśāstra · Saptāṅga State Model',
    realWorldApp: 'Public finance, supply-chain resilience, and quantitative policy modeling.',
    experimentHint: 'Allocate treasury across agriculture, defense, and trade without depleting reserves.',
    difficulty: 3,
  },
  chandahshastra: {
    domainTag: 'Discrete Math · CS',
    formula: 'N(n) = 2ⁿ  |  C(n, k) = C(n-1, k-1) + C(n-1, k)',
    modernLaw: 'Binary Encoding, Binomial Coefficients & Recursion',
    indianSource: 'Piṅgala Chandaḥśāstra (Prastāra & Meru-Prastāra)',
    realWorldApp: 'Digital binary logic, data compression, and combinatorial algorithms.',
    experimentHint: 'Toggle Laghu (0) and Guru (1) syllables to generate binary rows and Pascal triangles.',
    difficulty: 3,
  },
  'ujjain-geodesy': {
    domainTag: 'Geodesy · Solar Optics',
    formula: 'tan(α) = h_gnomon / L_shadow',
    modernLaw: 'Solar Altitude, Prime Meridian Longitude & Axial Tilt',
    indianSource: 'Ujjayinī Madhyarekhā (0° Meridian) & Śaṅku Yantra',
    realWorldApp: 'Celestial navigation, solar panel tilt optimization, and cartographic projection.',
    experimentHint: 'Sweep solar hour and season to measure the exact noon shadow at Ujjain.',
    difficulty: 3,
  },
  rituparna: {
    domainTag: 'Statistics · Probability',
    formula: 'μ̂ = (1/n) Σ xᵢ  |  SE = σ / √n',
    modernLaw: 'Statistical Sampling & Law of Large Numbers',
    indianSource: 'Mahābhārata · King Ṛtuparṇa’s Akṣahṛdaya (Branch Sampling)',
    realWorldApp: 'Quality control, ecological population surveys, and Monte Carlo estimation.',
    experimentHint: 'Sample a few branches of the Bibhītaka tree and watch your estimate converge.',
    difficulty: 2,
  },
  citrakavya: {
    domainTag: 'Symmetry · Algorithms',
    formula: 'M[i][j] = M[n-1-i][n-1-j] (Palindromic Matrix)',
    modernLaw: '2D Graph Traversal & Group Symmetry Transformations',
    indianSource: 'Kāvyādarśa · Sarvatobhadra & Bandha-Kāvya',
    realWorldApp: 'Error-correcting matrix codes, cryptography, and algorithmic pattern design.',
    experimentHint: 'Trace horizontal, vertical, and diagonal paths across the Sanskrit syllable grid.',
    difficulty: 3,
  },
};

export function getExplorerRank(totalStars: number): { rankEn: string; rankSa: string; nextAt: number } {
  if (totalStars >= 36) return { rankEn: 'Master Polymath', rankSa: 'आचार्यः', nextAt: 51 };
  if (totalStars >= 21) return { rankEn: 'STEM Investigator', rankSa: 'विज्ञानी', nextAt: 36 };
  if (totalStars >= 9) return { rankEn: 'Lab Explorer', rankSa: 'अन्वेषकः', nextAt: 21 };
  return { rankEn: 'Curious Apprentice', rankSa: 'शिष्यः', nextAt: 9 };
}

/** Crisp dark-blueprint SVG engineering schematic per STEM simulation (zero emojis). */
export const LabSchematicGraphic: React.FC<{ labId: LabSegmentId; className?: string }> = ({
  labId,
  className = '',
}) => {
  const meta = STEM_BLUEPRINTS[labId];
  return (
    <svg
      className={`vl-schematic-svg ${className}`}
      viewBox="0 0 180 86"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${meta.domainTag} schematic blueprint`}
    >
      <defs>
        <pattern id={`grid-${labId}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(148,163,184,0.14)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="180" height="86" rx="8" fill="#0f172a" />
      <rect width="180" height="86" rx="8" fill={`url(#grid-${labId})`} />

      {labId === 'paramanu' && (
        <g strokeLinecap="round">
          <line x1="58" y1="44" x2="90" y2="24" stroke="#f59e0b" strokeWidth="1.6" strokeDasharray="3 2" />
          <line x1="90" y1="24" x2="122" y2="44" stroke="#f59e0b" strokeWidth="1.6" strokeDasharray="3 2" />
          <line x1="58" y1="44" x2="122" y2="44" stroke="#34d399" strokeWidth="1.6" />
          <circle cx="58" cy="44" r="9" fill="rgba(245,158,11,0.22)" stroke="#fbbf24" strokeWidth="1.8" />
          <circle cx="90" cy="24" r="9" fill="rgba(16,185,129,0.22)" stroke="#34d399" strokeWidth="1.8" />
          <circle cx="122" cy="44" r="9" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth="1.8" />
          <circle cx="90" cy="44" r="24" fill="none" stroke="rgba(251,191,36,0.3)" strokeDasharray="2 3" />
          <text x="90" y="76" fill="#fde68a" fontSize="8" fontWeight="700" textAnchor="middle">2 PARAMAṆU &rarr; DVYAṆUKA &rarr; TRYAṆUKA</text>
        </g>
      )}

      {labId === 'asato-ma' && (
        <g>
          <line x1="36" y1="54" x2="144" y2="54" stroke="#fbbf24" strokeWidth="2" />
          <polygon points="90,54 83,66 97,66" fill="#0f766e" stroke="#34d399" strokeWidth="1.2" />
          <rect x="42" y="24" width="26" height="26" rx="4" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 114 48 Q 126 22 138 48 Z" fill="rgba(245,158,11,0.28)" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="55" y="40" fill="#bae6fd" fontSize="8" fontWeight="800" textAnchor="middle">SOLID</text>
          <text x="126" y="42" fill="#fde68a" fontSize="8" fontWeight="800" textAnchor="middle">VAPOR</text>
          <text x="90" y="78" fill="#6ee7b7" fontSize="8.5" fontWeight="800" textAnchor="middle">MASS INVARIANT: 100.000 g</text>
        </g>
      )}

      {labId === 'jyotisha' && (
        <g>
          <ellipse cx="90" cy="42" rx="58" ry="26" fill="none" stroke="#818cf8" strokeWidth="1.6" strokeDasharray="4 2" />
          <circle cx="68" cy="42" r="10" fill="#f59e0b" stroke="#fef3c7" strokeWidth="1.5" />
          <circle cx="144" cy="34" r="5.5" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="1.2" />
          <line x1="144" y1="34" x2="124" y2="38" stroke="#34d399" strokeWidth="1.4" />
          <line x1="144" y1="34" x2="140" y2="14" stroke="#f472b6" strokeWidth="1.4" />
          <text x="90" y="78" fill="#c7d2fe" fontSize="8" fontWeight="700" textAnchor="middle">ELLIPTICAL ORBIT · F = G m₁m₂ / r²</text>
        </g>
      )}

      {labId === 'chandrayaan' && (
        <g>
          <path d="M 24 18 Q 86 20 112 58" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="4 2" />
          <path d="M 16 66 Q 90 56 164 66" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <rect x="105" y="46" width="14" height="10" rx="2" fill="#fbbf24" stroke="#fef3c7" strokeWidth="1.2" />
          <line x1="112" y1="56" x2="112" y2="63" stroke="#f97316" strokeWidth="2.5" />
          <line x1="119" y1="52" x2="146" y2="62" stroke="#34d399" strokeWidth="1.4" strokeDasharray="2 2" />
          <text x="90" y="78" fill="#7dd3fc" fontSize="8" fontWeight="700" textAnchor="middle">SHIV SHAKTI SOFT DESCENT &amp; LIBS</text>
        </g>
      )}

      {labId === 'nada-brahman' && (
        <g>
          <path d="M 18 42 Q 42 12 66 42 T 114 42 T 162 42" fill="none" stroke="#c084fc" strokeWidth="2" />
          <path d="M 18 42 Q 42 72 66 42 T 114 42 T 162 42" fill="none" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="3 2" />
          <circle cx="66" cy="42" r="3" fill="#fbbf24" />
          <circle cx="114" cy="42" r="3" fill="#fbbf24" />
          <text x="90" y="78" fill="#e9d5ff" fontSize="8" fontWeight="700" textAnchor="middle">STANDING HARMONICS · f_n = n·v / 2L</text>
        </g>
      )}

      {labId === 'vedic-geometry' && (
        <g>
          <rect x="44" y="20" width="44" height="44" fill="rgba(245,158,11,0.16)" stroke="#fbbf24" strokeWidth="1.6" />
          <line x1="44" y1="64" x2="88" y2="20" stroke="#34d399" strokeWidth="1.8" strokeDasharray="3 2" />
          <circle cx="126" cy="42" r="24" fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth="1.6" />
          <text x="90" y="78" fill="#fde68a" fontSize="8" fontWeight="700" textAnchor="middle">ŚULBA INVARIANT · c² = a² + b²</text>
        </g>
      )}

      {labId === 'agnibana' && (
        <g>
          <path d="M 26 60 Q 92 8 156 60" fill="none" stroke="#fb923c" strokeWidth="1.8" strokeDasharray="4 2" />
          <line x1="26" y1="60" x2="62" y2="34" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="156" cy="60" r="4" fill="#34d399" />
          <line x1="20" y1="60" x2="164" y2="60" stroke="#64748b" strokeWidth="1.2" />
          <text x="90" y="78" fill="#fed7aa" fontSize="8" fontWeight="700" textAnchor="middle">BALLISTIC TRAJECTORY · R = v₀² sin(2θ)/g</text>
        </g>
      )}

      {labId === 'prakriti' && (
        <g>
          <rect x="20" y="30" width="140" height="22" rx="4" fill="rgba(16,185,129,0.15)" stroke="rgba(52,211,153,0.4)" />
          <path d="M 20 42 C 45 20, 75 60, 100 40 C 125 22, 145 50, 160 40" fill="none" stroke="#34d399" strokeWidth="2" />
          <text x="90" y="78" fill="#a7f3d0" fontSize="8" fontWeight="700" textAnchor="middle">SAMADOṢA EQUILIBRIUM ZONE</text>
        </g>
      )}

      {labId === 'temple-engineering' && (
        <g>
          <polygon points="90,14 58,62 122,62" fill="rgba(245,158,11,0.16)" stroke="#fbbf24" strokeWidth="1.6" />
          <line x1="68" y1="46" x2="112" y2="46" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="78" y1="30" x2="102" y2="30" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="90" y1="18" x2="90" y2="60" stroke="#34d399" strokeWidth="1.6" strokeDasharray="3 2" />
          <text x="90" y="78" fill="#fde68a" fontSize="8" fontWeight="700" textAnchor="middle">CORBELLED LOAD PATH · ΣF = 0</text>
        </g>
      )}

      {labId === 'ujjain-geodesy' && (
        <g>
          <line x1="24" y1="60" x2="156" y2="60" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="64" y1="60" x2="64" y2="24" stroke="#fbbf24" strokeWidth="2.5" />
          <line x1="64" y1="24" x2="132" y2="60" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="42" cy="18" r="6" fill="#f59e0b" />
          <text x="90" y="78" fill="#bae6fd" fontSize="8" fontWeight="700" textAnchor="middle">ŚAṄKU GNOMON · tan(α) = h / L</text>
        </g>
      )}

      {labId === 'chandahshastra' && (
        <g>
          <line x1="90" y1="18" x2="58" y2="40" stroke="#38bdf8" strokeWidth="1.4" />
          <line x1="90" y1="18" x2="122" y2="40" stroke="#fbbf24" strokeWidth="1.4" />
          <line x1="58" y1="40" x2="42" y2="58" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="58" y1="40" x2="74" y2="58" stroke="#fbbf24" strokeWidth="1.2" />
          <line x1="122" y1="40" x2="106" y2="58" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="122" y1="40" x2="138" y2="58" stroke="#fbbf24" strokeWidth="1.2" />
          <circle cx="90" cy="18" r="4" fill="#e2e8f0" />
          <circle cx="58" cy="40" r="3.5" fill="#38bdf8" />
          <circle cx="122" cy="40" r="3.5" fill="#fbbf24" />
          <text x="90" y="78" fill="#fde68a" fontSize="8" fontWeight="700" textAnchor="middle">PIṄGALA BINARY TREE · 2ⁿ STATES</text>
        </g>
      )}

      {!['paramanu', 'asato-ma', 'jyotisha', 'chandrayaan', 'nada-brahman', 'vedic-geometry', 'agnibana', 'prakriti', 'temple-engineering', 'ujjain-geodesy', 'chandahshastra'].includes(labId) && (
        <g>
          <circle cx="54" cy="40" r="16" fill="rgba(16,185,129,0.16)" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="90" cy="40" r="16" fill="rgba(245,158,11,0.16)" stroke="#fbbf24" strokeWidth="1.5" />
          <circle cx="126" cy="40" r="16" fill="rgba(56,189,248,0.16)" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="38" y1="40" x2="142" y2="40" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="90" y="78" fill="#e2e8f0" fontSize="8" fontWeight="700" textAnchor="middle">{meta.domainTag.toUpperCase()}</text>
        </g>
      )}
    </svg>
  );
};

/** In-Workbench STEM Blueprint & Gaming Schematic HUD */
export const LabStemBlueprintCard: React.FC<{
  labId: LabSegmentId;
  isCompleted: boolean;
  starsForLab: number;
  totalStars: number;
}> = ({ labId, isCompleted, starsForLab, totalStars }) => {
  const meta = STEM_BLUEPRINTS[labId];
  const rank = getExplorerRank(totalStars);

  return (
    <div className="vl-stem-hud" aria-label="STEM Blueprint and Mission Schematic">
      {/* 4-Step Gaming Schematic Flow Bar */}
      <div className="vl-schematic-flow">
        <div className="vl-flow-steps-mini" aria-label="Mission play loop">
          <span className="vl-flow-node is-done">01. Observe</span>
          <span className="vl-flow-arrow" aria-hidden="true">&rarr;</span>
          <span className={`vl-flow-node ${isCompleted ? 'is-done' : 'is-active'}`}>02. Experiment</span>
          <span className="vl-flow-arrow" aria-hidden="true">&rarr;</span>
          <span className={`vl-flow-node ${isCompleted ? 'is-done' : ''}`}>03. Verify Law</span>
          <span className="vl-flow-arrow" aria-hidden="true">&rarr;</span>
          <span className={`vl-flow-node ${isCompleted ? 'is-done' : ''}`}>
            04. {isCompleted ? `Mastered (${starsForLab || 3} Stars)` : 'Unlock +3 Stars'}
          </span>
        </div>
        <div className="vl-rank-pill" title={`Total Vidyā Stars: ${totalStars}`}>
          <span className="vl-rank-sa" lang="sa">{rank.rankSa}</span>
          <span className="vl-rank-en">{rank.rankEn}</span>
          <span className="vl-rank-stars">{totalStars} Stars</span>
        </div>
      </div>

      {/* Collapsible STEM Engineering Blueprint & Indian Tradition Card */}
      <details className="vl-blueprint-details">
        <summary className="vl-blueprint-summary">
          <div className="vl-blueprint-summary-left">
            <span className="vl-blueprint-domain">{meta.domainTag}</span>
            <span className="vl-blueprint-formula">{meta.formula}</span>
          </div>
          <span className="vl-blueprint-toggle">STEM Blueprint &amp; Experiment Hint &#9662;</span>
        </summary>
        <div className="vl-blueprint-body">
          <div className="vl-blueprint-visual">
            <LabSchematicGraphic labId={labId} />
          </div>
          <div className="vl-blueprint-grid">
            <div className="vl-bp-cell">
              <span className="vl-bp-label">Modern STEM Principle</span>
              <strong>{meta.modernLaw}</strong>
              <code className="vl-bp-code">{meta.formula}</code>
            </div>
            <div className="vl-bp-cell">
              <span className="vl-bp-label">Indian Knowledge Tradition</span>
              <strong>{meta.indianSource}</strong>
              <p>{meta.realWorldApp}</p>
            </div>
            <div className="vl-bp-cell vl-bp-cell--hint">
              <span className="vl-bp-label">First Experiment to Try</span>
              <p>{meta.experimentHint}</p>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};
