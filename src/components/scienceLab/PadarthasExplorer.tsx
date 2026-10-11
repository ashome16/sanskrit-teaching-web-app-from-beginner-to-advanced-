import React, { useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';

export interface PadarthasExplorerProps {
  onPronounce: (word: string) => void;
  activeAudioWord: string | null;
}

// Sub-modes for Padarthas Explorer
type PadarthaTab = 'tree' | 'gunas' | 'karmas' | 'pilupaka' | 'kanada' | 'categories';

// 1. The Six Padārthas Definitions
interface PadarthaItem {
  dev: string;
  iast: string;
  en: string;
  desc: string;
  badge: string;
  role: string;
  icon: string;
}

const PADARTHAS_DATA: PadarthaItem[] = [
  {
    dev: 'द्रव्य',
    iast: 'Dravya',
    en: 'Substance / Entity',
    desc: 'The fundamental substratum in which qualities and actions reside. There are 9 distinct Dravyas: 4 atomic (Pṛthivī, Ap, Tejas, Vāyu), 1 continuous space (Ākāśa), 2 cosmic coordinates (Kāla - Time, Dik - Space/Direction), and 2 conscious entities (Ātman - Soul, Manas - Mind).',
    badge: 'Category 1 · Substratum',
    role: 'Structure & Substance',
    icon: '🧱',
  },
  {
    dev: 'गुण',
    iast: 'Guṇa',
    en: 'Inherent Quality',
    desc: 'Static, intrinsic characteristics that inhere in Dravyas. Kaṇāda and Praśastapāda cataloged 24 distinct Guṇas, ranging from sensory properties (Smell, Taste, Color) to classical physics forces (Gurutva = Gravity, Vega = Momentum, Sneha = Viscosity).',
    badge: 'Category 2 · Characteristics',
    role: 'Principles of Property',
    icon: '✨',
  },
  {
    dev: 'कर्म',
    iast: 'Karma',
    en: 'Action / Motion',
    desc: 'Dynamic physical motion and vector operations. Classified into 5 kinetic movements: Utkṣepaṇa (upward), Avakṣepaṇa (downward/gravitational fall), Ākuñcana (contraction), Prasāraṇa (expansion), and Gamana (locomotion/translation).',
    badge: 'Category 3 · Kinematics',
    role: 'Structure & Substance',
    icon: '⚡',
  },
  {
    dev: 'सामान्य',
    iast: 'Sāmānya',
    en: 'Generality / Universals',
    desc: 'The universal principle that unites classes of entities (e.g. "Earth-ness" or Pṛthivītva shared identically by every single earth paramāṇu in existence). It explains why macroscopic objects share collective class properties.',
    badge: 'Category 4 · Universals',
    role: 'Principles of Property',
    icon: '🌐',
  },
  {
    dev: 'विशेष',
    iast: 'Viśeṣa',
    en: 'Ultimate Particularity',
    desc: 'The defining namesake of Vaiśeṣika! The irreducible, indivisible structural uniqueness that differentiates one elementary paramāṇu from another identical atom. Without Viśeṣa, atomic physics would collapse into a vague, featureless soup.',
    badge: 'Category 5 · Individuation',
    role: 'Principles of Property',
    icon: '💎',
  },
  {
    dev: 'समवाय',
    iast: 'Samavāya',
    en: 'Inseparable Inherence',
    desc: 'The eternal, inseparable structural bond. Unlike loose conjunction (Saṃyoga) which can be undone, Samavāya is the structural link dictating how atomic arrangements produce emergent macroscopic properties (e.g., redness inhering in terracotta).',
    badge: 'Category 6 · Inherence',
    role: 'Principles of Property',
    icon: '🔗',
  },
];

// 2. The 24 Guṇas (Physical, Sensory, Relational & Cognitive Qualities)
type GunaCategory = 'all' | 'physics' | 'sensory' | 'relational' | 'cognitive';

interface GunaDetail {
  id: number;
  dev: string;
  iast: string;
  en: string;
  cat: 'physics' | 'sensory' | 'relational' | 'cognitive';
  host: string;
  sutraDef: string;
  modernParallel: string;
  explanation: string;
  isCanonOriginal: boolean; // VS original 17 vs Praśastapāda added 7
}

const GUNAS_24: GunaDetail[] = [
  // Sensory & Elemental Specific Qualities
  {
    id: 1,
    dev: 'गन्ध',
    iast: 'Gandha',
    en: 'Odor / Smell',
    cat: 'sensory',
    host: 'Pṛthivī (Earth only)',
    sutraDef: 'रूपरसस्पर्शवती पृथिवी । तत्र गन्धः पृथिव्यामेव ।',
    modernParallel: 'Chemical Volatility & Olfactory Chemoreception',
    explanation: 'The exclusive defining quality of terrestrial matter. Neither water, fire, air, nor space possesses intrinsic scent.',
    isCanonOriginal: true,
  },
  {
    id: 2,
    dev: 'रस',
    iast: 'Rasa',
    en: 'Taste / Sapidity',
    cat: 'sensory',
    host: 'Ap (Water) & Pṛthivī (Earth)',
    sutraDef: 'रूपरसस्पर्शवत्य आपः । रसो जलपृथिव्योः ।',
    modernParallel: 'Aqueous Solute Chemistry & Gustatory Sensation',
    explanation: 'Water provides natural sweet taste; Earth hosts all six tastes (sweet, sour, salty, bitter, pungent, astringent).',
    isCanonOriginal: true,
  },
  {
    id: 3,
    dev: 'रूप',
    iast: 'Rūpa',
    en: 'Color / Visual Form',
    cat: 'sensory',
    host: 'Tejas (Fire), Ap, Pṛthivī',
    sutraDef: 'स्पर्शवान् वायुः । रूपस्पर्शवान् तेजः ।',
    modernParallel: 'Electromagnetic Photons & Light Absorption',
    explanation: 'Fire possesses brilliant white radiance; Earth exhibits multi-chromatic forms; pure Water is translucent white.',
    isCanonOriginal: true,
  },
  {
    id: 4,
    dev: 'स्पर्श',
    iast: 'Sparśa',
    en: 'Touch / Thermal State',
    cat: 'sensory',
    host: 'Vāyu (Air), Tejas, Ap, Pṛthivī',
    sutraDef: 'स्पर्शवान् वायुः । उष्णस्पर्शस्तेजसः, शीतस्पर्शो जलस्य ।',
    modernParallel: 'Thermodynamic Temperature & Kinetic Pressure',
    explanation: 'Air is known purely by touch; Fire carries hot touch; Water carries cool touch; Earth carries temperate touch.',
    isCanonOriginal: true,
  },
  {
    id: 5,
    dev: 'शब्द',
    iast: 'Śabda',
    en: 'Sound / Acoustic Vibration',
    cat: 'sensory',
    host: 'Ākāśa (Space / Ether only)',
    sutraDef: 'परिशेषाल्लिङ्गमाकाशस्य । शब्दगुणकमाकाशम् ।',
    modernParallel: 'Acoustic Wave Propagation & Ambient Field Resonance',
    explanation: 'Sound is the exclusive quality of continuous space (Ākāśa), propagated in expanding spherical wave shells (vīcī-taraṅga-nyāya).',
    isCanonOriginal: false,
  },

  // Physical & Continuum Mechanical Qualities
  {
    id: 6,
    dev: 'गुरुत्व',
    iast: 'Gurutva',
    en: 'Gravity / Heaviness',
    cat: 'physics',
    host: 'Pṛthivī (Earth) & Ap (Water)',
    sutraDef: 'गुरुत्वं पतनकर्मकारणम् (Cause of downward falling motion).',
    modernParallel: 'Newtonian Gravitational Attraction & Downward Freefall',
    explanation: 'Kaṇāda identified Gurutva as the intrinsic physical cause that forces unconstrained bodies to accelerate downwards toward the earth.',
    isCanonOriginal: false,
  },
  {
    id: 7,
    dev: 'द्रवत्व',
    iast: 'Dravatva',
    en: 'Fluidity / Liquidity',
    cat: 'physics',
    host: 'Ap (Water), Tejas (molten), Pṛthivī (molten metals)',
    sutraDef: 'द्रवत्वं स्यन्दनकर्मकारणम् (Cause of flowing motion / laminar flow).',
    modernParallel: 'Fluid Dynamics & Viscous Flow Potential',
    explanation: 'Natural fluidity (Sāṃsiddhika) exists intrinsically in Water; conditional fluidity (Naimittika) is induced in metals and gold via heat.',
    isCanonOriginal: false,
  },
  {
    id: 8,
    dev: 'स्नेह',
    iast: 'Sneha',
    en: 'Viscosity / Cohesion / Surface Tension',
    cat: 'physics',
    host: 'Ap (Water exclusively)',
    sutraDef: 'स्नेहो जले एव । पिण्डीभावादिहेतुः (Cause of particles clumping together).',
    modernParallel: 'Surface Tension, Hydrogen Bonding & Capillary Action',
    explanation: 'The unique cohesive property that enables water droplets to form spheres, moisten dry flour into dough, and cause molecular aggregation.',
    isCanonOriginal: false,
  },
  {
    id: 9,
    dev: 'संस्कार (वेग)',
    iast: 'Saṃskāra (Vega)',
    en: 'Momentum / Kinetic Inertia / Elasticity',
    cat: 'physics',
    host: 'All 4 Atomic Bhūtas + Manas',
    sutraDef: 'वेगो गमनहेतुः प्रतिबन्धकाभावे । स्थितिस्थापकश्च ।',
    modernParallel: 'Linear Momentum (p = mv), Inertia & Hooke’s Elastic Restitution',
    explanation: 'Manifests threefold: Vega (velocity/momentum imparted by initial force), Sthitisthāpaka (elastic recovery of deformed solids), and Bhāvanā (memory retention in mind).',
    isCanonOriginal: false,
  },
  {
    id: 10,
    dev: 'परिमाण',
    iast: 'Parimāṇa',
    en: 'Dimension / Magnitude / Spatial Size',
    cat: 'physics',
    host: 'All 9 Dravyas',
    sutraDef: 'अणुमहद्दीर्घह्रस्वमिति परिमाणम् ।',
    modernParallel: 'Spatial Volume, Atomic Radius & Continuum Metric',
    explanation: 'Ranges from infinitesimal atomic volume (Aṇu/Pārimāṇḍalya in paramāṇus) to infinite ubiquitous expanse (Vibhu/Paramamahat in Ākāśa).',
    isCanonOriginal: true,
  },
  {
    id: 11,
    dev: 'सङ्ख्या',
    iast: 'Saṃkhyā',
    en: 'Number / Discrete Countability',
    cat: 'physics',
    host: 'All 9 Dravyas',
    sutraDef: 'गणनाहेतुः सङ्ख्या । एकादिका ।',
    modernParallel: 'Discrete Particle Quantization & Stoichiometry',
    explanation: 'The fundamental quantitative basis of reality. Dvyaṇuka requires exactly two paramāṇus; Tryaṇuka requires three dvyaṇukas.',
    isCanonOriginal: true,
  },
  {
    id: 12,
    dev: 'पृथक्त्व',
    iast: 'Pṛthaktva',
    en: 'Separateness / Discreteness',
    cat: 'physics',
    host: 'All 9 Dravyas',
    sutraDef: 'इतरो भेदव्यवहारहेतुः पृथक्त्वम् ।',
    modernParallel: 'Pauli Exclusion Principle & Distinct Boundary Individuation',
    explanation: 'The quality responsible for distinguishing one object from another as non-identical entities in physical space.',
    isCanonOriginal: true,
  },

  // Relational & Spatiotemporal Qualities
  {
    id: 13,
    dev: 'संयोग',
    iast: 'Saṃyoga',
    en: 'Conjunction / Contact',
    cat: 'relational',
    host: 'All Dravyas',
    sutraDef: 'संयुक्तव्यवहारहेतुः संयोगः ।',
    modernParallel: 'Intermolecular Contact, Adhesion & Chemical Bonding',
    explanation: 'The reversible physical conjunction between two previously separate entities. Forging a dvyaṇuka occurs via atomic saṃyoga.',
    isCanonOriginal: true,
  },
  {
    id: 14,
    dev: 'विभाग',
    iast: 'Vibhāga',
    en: 'Disjunction / Separation',
    cat: 'relational',
    host: 'All Dravyas',
    sutraDef: 'संयोगनाशको गुणो विभागः ।',
    modernParallel: 'Bond Dissociation, Cleavage & Entropy Increase',
    explanation: 'The physical severing or disruption of conjunction. In Pīlupāka thermal baking, heat causes vibhāga of molecular bonds.',
    isCanonOriginal: true,
  },
  {
    id: 15,
    dev: 'परत्व',
    iast: 'Paratva',
    en: 'Remoteness / Priority (Spatial Distance & Temporal Seniority)',
    cat: 'relational',
    host: 'All 4 Bhūtas & Manas (via Space & Time coordinates)',
    sutraDef: 'दूरत्वज्येष्ठत्वव्यवहारहेतुः परत्वम् ।',
    modernParallel: 'Spatial Distance Vector & Temporal Precedence',
    explanation: 'The relativistic measure of greater spatial distance ("far away") or older chronological age ("senior/prior").',
    isCanonOriginal: true,
  },
  {
    id: 16,
    dev: 'अपरत्व',
    iast: 'Aparatva',
    en: 'Proximity / Posteriority (Spatial Nearness & Temporal Recency)',
    cat: 'relational',
    host: 'All 4 Bhūtas & Manas (via Space & Time coordinates)',
    sutraDef: 'समीपत्वकनिष्ठत्वव्यवहारहेतुरपरत्वम् ।',
    modernParallel: 'Local Coordinate Proximity & Temporal Posteriority',
    explanation: 'The relativistic measure of closer spatial distance ("nearby") or younger chronological age ("recent/junior").',
    isCanonOriginal: true,
  },

  // Conscious & Cognitive Qualities (Inhere in Ātman)
  {
    id: 17,
    dev: 'बुद्धि',
    iast: 'Buddhi',
    en: 'Cognition / Intellect / Knowledge',
    cat: 'cognitive',
    host: 'Ātman (Soul/Consciousness)',
    sutraDef: 'सर्वव्यवहारहेतुर्ज्ञानं बुद्धिः ।',
    modernParallel: 'Cognitive Epistemology, Neural Computation & Self-Awareness',
    explanation: 'The illuminated consciousness through which objects are comprehended, evaluated, and classified into truth or error.',
    isCanonOriginal: true,
  },
  {
    id: 18,
    dev: 'सुख',
    iast: 'Sukha',
    en: 'Pleasure / Harmony',
    cat: 'cognitive',
    host: 'Ātman',
    sutraDef: 'अनुकूलवेदनीयं सुखम् ।',
    modernParallel: 'Homeostatic Equilibrium, Dopaminergic Reward & Well-Being',
    explanation: 'The subjective internal state of harmony, balance, and experiential agreeableness.',
    isCanonOriginal: true,
  },
  {
    id: 19,
    dev: 'दुःख',
    iast: 'Duḥkha',
    en: 'Pain / Disharmony',
    cat: 'cognitive',
    host: 'Ātman',
    sutraDef: 'प्रतिकूलवेदनीयं दुःखम् ।',
    modernParallel: 'Nociceptive Stress Response & Biological Friction',
    explanation: 'The subjective internal state of aversion, suffering, and biological or mental distress.',
    isCanonOriginal: true,
  },
  {
    id: 20,
    dev: 'इच्छा',
    iast: 'Icchā',
    en: 'Desire / Attraction',
    cat: 'cognitive',
    host: 'Ātman',
    sutraDef: 'काम इच्छा ।',
    modernParallel: 'Goal-Directed Motivation, Appetite & Dopaminergic Seeking',
    explanation: 'The mental impulse directed towards acquiring experiences that produce harmony or perceived benefit.',
    isCanonOriginal: true,
  },
  {
    id: 21,
    dev: 'द्वेष',
    iast: 'Dveṣa',
    en: 'Aversion / Repulsion',
    cat: 'cognitive',
    host: 'Ātman',
    sutraDef: 'मन्युर्द्वेषः ।',
    modernParallel: 'Amygdala Threat Avoidance & Defensive Repulsion',
    explanation: 'The reactive impulse to reject, repel, or distance oneself from painful or disruptive stimuli.',
    isCanonOriginal: true,
  },
  {
    id: 22,
    dev: 'प्रयत्न',
    iast: 'Prayatna',
    en: 'Volition / Conative Effort',
    cat: 'cognitive',
    host: 'Ātman',
    sutraDef: 'संरम्भः प्रयत्नः ।',
    modernParallel: 'Motor Cortex Intentional Will & Neuromuscular Action',
    explanation: 'The internal exertion of willpower that initiates physical bodily motion (Jīvana-yoni) or deliberate intentional work.',
    isCanonOriginal: true,
  },
  {
    id: 23,
    dev: 'धर्म',
    iast: 'Dharma',
    en: 'Virtue / Ethical Order / Cosmic Merit',
    cat: 'cognitive',
    host: 'Ātman',
    sutraDef: 'यतोऽभ्युदयनिश्रेयससिद्धिः स धर्मः ।',
    modernParallel: 'Prosocial Cohesion, Altruistic Equilibrium & Karmic Potential',
    explanation: 'The invisible spiritual and psychological order (Adṛṣṭa) that aligns individual conduct with universal harmony and well-being.',
    isCanonOriginal: false,
  },
  {
    id: 24,
    dev: 'अधर्म',
    iast: 'Adharma',
    en: 'Demerit / Disorder / Moral Entropy',
    cat: 'cognitive',
    host: 'Ātman',
    sutraDef: 'धर्मविपरीतः अधर्मः ।',
    modernParallel: 'Antisocial Entropy, Moral Discord & Destructive Tension',
    explanation: 'The disruptive psychological and karmic residue that generates internal conflict and suffering.',
    isCanonOriginal: false,
  },
];

// 3. The 5 Karmas (Kinematics & Dynamic Vectors)
interface KarmaDetail {
  id: string;
  dev: string;
  iast: string;
  en: string;
  vector: string;
  cause: string;
  modernParallel: string;
  desc: string;
  icon: string;
}

const KARMAS_5: KarmaDetail[] = [
  {
    id: 'utksepana',
    dev: 'उत्क्षेपण',
    iast: 'Utkṣepaṇa',
    en: 'Upward Projection',
    vector: 'Vertical Displacement (↑)',
    cause: 'Prayatna (volitional thrust) or Nodanā (continuous upward force) overcoming Gurutva',
    modernParallel: 'Rocket Propulsion, Projectile Launch Against Gravity',
    desc: 'Upward motion causing disjunction with the lower region and conjunction with an upper spatial point.',
    icon: '🚀',
  },
  {
    id: 'avaksepana',
    dev: 'अवक्षेपण',
    iast: 'Avakṣepaṇa',
    en: 'Downward Fall',
    vector: 'Vertical Freefall (↓)',
    cause: 'Gurutva (gravity) operating freely when support/impediment is removed',
    modernParallel: 'Gravitational Acceleration, Free Fall Under Constant g',
    desc: 'Downward acceleration pulling bodies toward the center of mass due to intrinsic atomic heaviness.',
    icon: '🍎',
  },
  {
    id: 'akuncana',
    dev: 'आकुञ्चन',
    iast: 'Ākuñcana',
    en: 'Contraction / Centripetal Compression',
    vector: 'Inward Radial Convergence (→ • ←)',
    cause: 'Elastic force (Sthitisthāpaka) or mechanical compression reducing spatial boundaries',
    modernParallel: 'Muscle Flexion, Spring Compression, Centripetal Consolidation',
    desc: 'Contraction bringing peripheral parts closer to the central core of an entity.',
    icon: '🤏',
  },
  {
    id: 'prasarana',
    dev: 'प्रसारण',
    iast: 'Prasāraṇa',
    en: 'Expansion / Centrifugal Dilation',
    vector: 'Outward Radial Divergence (← • →)',
    cause: 'Thermal agitation, internal kinetic pressure, or mechanical stretching',
    modernParallel: 'Thermal Expansion, Elastic Stretching, Shockwave Dilation',
    desc: 'Dilation widening the spatial perimeter, moving components away from the central origin.',
    icon: '↔️',
  },
  {
    id: 'gamana',
    dev: 'गमन',
    iast: 'Gamana',
    en: 'Locomotion / Generalized Vector Trajectory',
    vector: 'Multidirectional Translation, Curvilinear & Rotational',
    cause: 'Vega (momentum), Abhighāta (impact), or continuous propulsion',
    modernParallel: 'Linear Translation, Orbital Motion, Browninan Diffusion, Wave Propagation',
    desc: 'Every general movement that cannot be reduced strictly to vertical throw or expansion/contraction—including rolling, flowing, and spinning.',
    icon: '🧭',
  },
];

export const PadarthasExplorer: React.FC<PadarthasExplorerProps> = ({
  onPronounce,
  activeAudioWord,
}) => {
  const [activeTab, setActiveTab] = useState<PadarthaTab>('tree');
  const [selectedGunaCat, setSelectedGunaCat] = useState<GunaCategory>('all');
  const [activeGunaModal, setActiveGunaModal] = useState<GunaDetail | null>(null);
  const [activeKarmaAnimation, setActiveKarmaAnimation] = useState<string | null>('gamana');
  const [piluDebateStep, setPiluDebateStep] = useState<number>(0);

  // Filtered Guṇas
  const filteredGunas = GUNAS_24.filter((g) => {
    if (selectedGunaCat === 'all') return true;
    return g.cat === selectedGunaCat;
  });

  return (
    <section className="vl-padarthas-section" aria-label="Vaiśeṣika Six Padārthas Master Explorer">
      {/* Sector Header */}
      <div className="vl-padarthas-header">
        <div className="vl-padarthas-header-text">
          <div className="vl-hud-pill">PHYSICAL ONTOLOGY & NATURAL PHILOSOPHY</div>
          <h2 className="vl-padarthas-title">
            <span>🏛️ THE SIX PADĀRTHAS GATEWAY (वैशेषिक षट्-पदार्थाः)</span>
          </h2>
          <p className="vl-padarthas-subtitle">
            How Sage Kaṇāda mapped the entire physical and metaphysical universe. Discover how{' '}
            <strong style={{ color: '#38bdf8' }}>Viśeṣa (Irreducible Uniqueness)</strong> prevents atomic reality from collapsing into a featureless soup, and how{' '}
            <strong style={{ color: '#a78bfa' }}>Samavāya (Inseparable Inherence)</strong> connects structural configurations to observable properties.
          </p>
        </div>

        {/* Global Quick Pronunciations */}
        <div className="vl-quick-audio-tray">
          <button
            type="button"
            className="vl-word-pronounce-btn"
            onClick={() => onPronounce('वैशेषिक')}
            title="Listen to Sanskrit pronunciation of Vaiśeṣika"
          >
            <span>वैशेषिक</span> <em>(Vaiśeṣika)</em> {activeAudioWord === 'वैशेषिक' ? '🔊' : '🔉'}
          </button>
          <button
            type="button"
            className="vl-word-pronounce-btn"
            onClick={() => onPronounce('विशेष')}
            title="Listen to Sanskrit pronunciation of Viśeṣa"
          >
            <span>विशेष</span> <em>(Viśeṣa)</em> {activeAudioWord === 'विशेष' ? '🔊' : '🔉'}
          </button>
          <button
            type="button"
            className="vl-word-pronounce-btn"
            onClick={() => onPronounce('समवाय')}
            title="Listen to Sanskrit pronunciation of Samavāya"
          >
            <span>समवाय</span> <em>(Samavāya)</em> {activeAudioWord === 'समवाय' ? '🔊' : '🔉'}
          </button>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <nav className="vl-padartha-subnav" aria-label="Padarthas Explorer Sections">
        <button
          type="button"
          className={`vl-padartha-subnav-btn${activeTab === 'tree' ? ' is-active' : ''}`}
          onClick={() => {
            setActiveTab('tree');
            soundEffects.playElementSummon('tejas');
          }}
        >
          <span>🌳 Universe Tree</span>
          <span className="vl-subnav-tag">Ontology</span>
        </button>

        <button
          type="button"
          className={`vl-padartha-subnav-btn${activeTab === 'gunas' ? ' is-active' : ''}`}
          onClick={() => {
            setActiveTab('gunas');
            soundEffects.playElementSummon('ap');
          }}
        >
          <span>🔮 The 24 Guṇas</span>
          <span className="vl-subnav-tag">Physical Qualities</span>
        </button>

        <button
          type="button"
          className={`vl-padartha-subnav-btn${activeTab === 'karmas' ? ' is-active' : ''}`}
          onClick={() => {
            setActiveTab('karmas');
            soundEffects.playElementSummon('vayu');
          }}
        >
          <span>⚡ The 5 Karmas</span>
          <span className="vl-subnav-tag">Kinematics & Motion</span>
        </button>

        <button
          type="button"
          className={`vl-padartha-subnav-btn${activeTab === 'pilupaka' ? ' is-active' : ''}`}
          onClick={() => {
            setActiveTab('pilupaka');
            soundEffects.playElementSummon('prthivi');
          }}
        >
          <span>🏺 Pīlu vs Piṭhara</span>
          <span className="vl-subnav-tag">Chemical Debate</span>
        </button>

        <button
          type="button"
          className={`vl-padartha-subnav-btn${activeTab === 'kanada' ? ' is-active' : ''}`}
          onClick={() => {
            setActiveTab('kanada');
            soundEffects.playCelebrationChime();
          }}
        >
          <span>🌾 Sage Kaṇāda</span>
          <span className="vl-subnav-tag">Twin Monikers</span>
        </button>

        <button
          type="button"
          className={`vl-padartha-subnav-btn${activeTab === 'categories' ? ' is-active' : ''}`}
          onClick={() => {
            setActiveTab('categories');
            soundEffects.playElementSummon('tejas');
          }}
        >
          <span>🏛️ 6 Categories</span>
          <span className="vl-subnav-tag">Full Taxonomy</span>
        </button>
      </nav>

      {/* =========================================================================
          VIEW 1: 🌳 THE PHYSICAL UNIVERSE ONTOLOGICAL TREE
          ========================================================================= */}
      {activeTab === 'tree' && (
        <div className="vl-ontological-tree-view">
          <div className="vl-tree-intro-banner">
            <div className="vl-tree-intro-title">
              <span className="vl-spark-icon">✨</span>
              <span>THE BIFURCATION OF COSMIC REALITY: STRUCTURE VS. PROPERTY</span>
            </div>
            <p className="vl-tree-intro-text">
              Sage Kaṇāda classified reality into an elegant dual-trunk tree. On one side stands{' '}
              <strong>Substance & Dynamic Action</strong>; on the other side stand the{' '}
              <strong>Principles of Property, Universality, and Irreducible Individuality</strong>.
            </p>
          </div>

          {/* ASCII / Interactive Tree Visual Container */}
          <div className="vl-universe-tree-diagram">
            <div className="vl-tree-root-node">
              <div className="vl-root-badge">COSMIC ROOT</div>
              <div className="vl-root-title">
                [ THE PHYSICAL UNIVERSE · भौतिक-विश्वम् ]
              </div>
              <div className="vl-root-desc">
                Everything that can be named, known, and experienced (Astitva, Jñeyatva, Abhidheyatva)
              </div>
            </div>

            <div className="vl-tree-connector-split">
              <div className="vl-connector-stem" />
              <div className="vl-connector-horizontal" />
            </div>

            <div className="vl-tree-branches-grid">
              {/* Branch 1: Structure & Substance */}
              <div className="vl-tree-branch vl-tree-branch--left">
                <div className="vl-branch-header">
                  <span className="vl-branch-icon">🧱</span>
                  <div>
                    <h3 className="vl-branch-title">[ STRUCTURE & SUBSTANCE ]</h3>
                    <div className="vl-branch-subtitle">द्रव्य-कर्म-मूलम् (Physical Hardware of the Cosmos)</div>
                  </div>
                </div>

                <div className="vl-branch-nodes">
                  <div className="vl-leaf-node">
                    <div className="vl-leaf-header">
                      <span className="vl-leaf-dev">द्रव्य (Dravya)</span>
                      <span className="vl-leaf-badge">9 Substances</span>
                    </div>
                    <p className="vl-leaf-desc">
                      The foundational substratum containing all properties and actions.
                    </p>
                    <div className="vl-leaf-subgroup">
                      <div className="vl-leaf-tag">4 Atomic: Pṛthivī, Ap, Tejas, Vāyu</div>
                      <div className="vl-leaf-tag">1 Field: Ākāśa (Continuous Space)</div>
                      <div className="vl-leaf-tag">2 Coordinates: Kāla (Time), Dik (Space)</div>
                      <div className="vl-leaf-tag">2 Conscious: Ātman (Self), Manas (Mind)</div>
                    </div>
                  </div>

                  <div className="vl-leaf-node">
                    <div className="vl-leaf-header">
                      <span className="vl-leaf-dev">कर्म (Karma)</span>
                      <span className="vl-leaf-badge">5 Dynamic Motions</span>
                    </div>
                    <p className="vl-leaf-desc">
                      The dynamic kinetic actions changing the spatial state of substances.
                    </p>
                    <div className="vl-leaf-subgroup">
                      <div className="vl-leaf-tag">Utkṣepaṇa (Upward Throw)</div>
                      <div className="vl-leaf-tag">Avakṣepaṇa (Downward Fall / Gravity)</div>
                      <div className="vl-leaf-tag">Ākuñcana (Contraction)</div>
                      <div className="vl-leaf-tag">Prasāraṇa (Expansion)</div>
                      <div className="vl-leaf-tag">Gamana (Vector Locomotion under Vega)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch 2: Principles of Property & Individuality */}
              <div className="vl-tree-branch vl-tree-branch--right">
                <div className="vl-branch-header">
                  <span className="vl-branch-icon">💎</span>
                  <div>
                    <h3 className="vl-branch-title">[ PRINCIPLES OF PROPERTY & INDIVIDUALITY ]</h3>
                    <div className="vl-branch-subtitle">गुण-सामान्य-विशेष-समवायाः (Laws, Attributes & Identity)</div>
                  </div>
                </div>

                <div className="vl-branch-nodes">
                  <div className="vl-leaf-node">
                    <div className="vl-leaf-header">
                      <span className="vl-leaf-dev">गुण (Guṇa)</span>
                      <span className="vl-leaf-badge">24 Qualities</span>
                    </div>
                    <p className="vl-leaf-desc">
                      Static characteristics inhering in substances: Gurutva (Gravity), Vega (Momentum), Sneha (Viscosity), Dravatva (Fluidity), Sensory traits, and Conscious states.
                    </p>
                  </div>

                  <div className="vl-leaf-node">
                    <div className="vl-leaf-header">
                      <span className="vl-leaf-dev">सामान्य (Sāmānya)</span>
                      <span className="vl-leaf-badge">Class Generality</span>
                    </div>
                    <p className="vl-leaf-desc">
                      The unifying universal principle explaining why two separate objects share identical macro-properties (e.g. &ldquo;Earth-ness&rdquo; across all clay pots).
                    </p>
                  </div>

                  <div className="vl-leaf-node vl-leaf-node--highlight-blue">
                    <div className="vl-leaf-header">
                      <span className="vl-leaf-dev">विशेष (Viśeṣa)</span>
                      <span className="vl-leaf-badge vl-leaf-badge--gold">Core namesake of Vaiśeṣika</span>
                    </div>
                    <p className="vl-leaf-desc">
                      <strong>The Indivisible Structural Distinguisher:</strong> Prevents two identical Paramāṇus from collapsing into a featureless soup. Each simple atom possesses irreducible particularity.
                    </p>
                  </div>

                  <div className="vl-leaf-node vl-leaf-node--highlight-purple">
                    <div className="vl-leaf-header">
                      <span className="vl-leaf-dev">समवाय (Samavāya)</span>
                      <span className="vl-leaf-badge vl-leaf-badge--purple">Inseparable Inherence</span>
                    </div>
                    <p className="vl-leaf-desc">
                      <strong>The Structural Binding Rule:</strong> Dictates that qualities do not float freely or attach like glue; they inhere inseparably within their atomic substratum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Philosophical Callouts */}
          <div className="vl-tree-insights-grid">
            <div className="vl-insight-card">
              <div className="vl-insight-icon">🛡️</div>
              <div className="vl-insight-title">1. Why Viśeṣa Prevents the &ldquo;Featureless Soup&rdquo;</div>
              <p className="vl-insight-body">
                Two macroscopic clay pots can look identical, yet their sub-microscopic building blocks are distinct.
                Kaṇāda posited <em>Antya-viśeṣa</em> (ultimate particularity) residing in eternal non-composite entities (Paramāṇu, Ātman, Manas, Ākāśa).
                Because atoms have no sub-parts, they cannot be differentiated by geometry. <strong>Viśeṣa provides that irreducible ontological fingerprint!</strong>
              </p>
            </div>

            <div className="vl-insight-card">
              <div className="vl-insight-icon">🔗</div>
              <div className="vl-insight-title">2. Samavāya: The Link Between Structure and Property</div>
              <p className="vl-insight-body">
                How does an atomic arrangement produce an observable macroscopic quality? Kaṇāda answered: <strong>Samavāya (समवाय)</strong>.
                Unlike temporary conjunction (<em>Saṃyoga</em>, e.g. a book resting on a table), Samavāya is the structural inherence where quality cannot be stripped away without destroying the substance itself.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: 🔮 THE 24 GUṆAS (PHYSICAL & COGNITIVE QUALITIES)
          ========================================================================= */}
      {activeTab === 'gunas' && (
        <div className="vl-gunas-view">
          <div className="vl-section-subhead">
            <div>
              <h3 className="vl-subhead-title">चतुर्विंशति-गुणाः · THE 24 CANONICAL GUṆAS</h3>
              <p className="vl-subhead-desc">
                17 cataloged in Kaṇāda&rsquo;s <em>Vaiśeṣika Sūtra</em> + 7 formalized by Praśastapāda. Notice the profound inclusion of classical physics laws:
                <strong> Gurutva</strong> (Gravity), <strong>Vega</strong> (Momentum), <strong>Sneha</strong> (Viscosity), and <strong>Dravatva</strong> (Fluidity).
              </p>
            </div>
            <div className="vl-counter-pill">
              {filteredGunas.length} / 24 Qualities
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="vl-guna-filter-row">
            <button
              type="button"
              className={`vl-filter-pill${selectedGunaCat === 'all' ? ' is-active' : ''}`}
              onClick={() => setSelectedGunaCat('all')}
            >
              🌟 All (24)
            </button>
            <button
              type="button"
              className={`vl-filter-pill${selectedGunaCat === 'physics' ? ' is-active' : ''}`}
              onClick={() => setSelectedGunaCat('physics')}
            >
              ⚛️ Physics & Mechanical (7)
            </button>
            <button
              type="button"
              className={`vl-filter-pill${selectedGunaCat === 'sensory' ? ' is-active' : ''}`}
              onClick={() => setSelectedGunaCat('sensory')}
            >
              👁️ Elemental & Sensory (5)
            </button>
            <button
              type="button"
              className={`vl-filter-pill${selectedGunaCat === 'relational' ? ' is-active' : ''}`}
              onClick={() => setSelectedGunaCat('relational')}
            >
              📐 Relational & Spatial (4)
            </button>
            <button
              type="button"
              className={`vl-filter-pill${selectedGunaCat === 'cognitive' ? ' is-active' : ''}`}
              onClick={() => setSelectedGunaCat('cognitive')}
            >
              🧠 Conscious & Cognitive (8)
            </button>
          </div>

          {/* 24 Guṇas Grid */}
          <div className="vl-gunas-grid">
            {filteredGunas.map((g) => (
              <div
                key={g.id}
                className={`vl-guna-card vl-guna-card--${g.cat}`}
                onClick={() => {
                  setActiveGunaModal(g);
                  onPronounce(g.dev);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveGunaModal(g);
                }}
              >
                <div className="vl-guna-card-top">
                  <span className="vl-guna-number">#{g.id}</span>
                  <span className={`vl-guna-cat-tag vl-guna-cat-tag--${g.cat}`}>
                    {g.cat.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    className="vl-guna-audio-trigger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPronounce(g.dev);
                    }}
                    title={`Pronounce ${g.iast}`}
                  >
                    🔊
                  </button>
                </div>

                <div className="vl-guna-name-row">
                  <span className="vl-guna-dev" lang="sa">{g.dev}</span>
                  <span className="vl-guna-iast">({g.iast})</span>
                </div>
                <div className="vl-guna-en">{g.en}</div>

                <div className="vl-guna-host">
                  <span className="vl-host-label">Carrier Substratum:</span>
                  <span className="vl-host-value">{g.host}</span>
                </div>

                <div className="vl-guna-modern-badge">
                  <span className="vl-modern-icon">🔬</span>
                  <span>{g.modernParallel}</span>
                </div>

                <p className="vl-guna-brief-exp">{g.explanation}</p>
              </div>
            ))}
          </div>

          {/* Detailed Guṇa Modal Drawer */}
          {activeGunaModal && (
            <div
              className="vl-victory-modal-backdrop"
              role="dialog"
              aria-modal="true"
              onClick={() => setActiveGunaModal(null)}
            >
              <div
                className="vl-victory-modal-box vl-guna-inspector-box"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="vl-guna-modal-header">
                  <div>
                    <span className="vl-hud-pill">GUṆA INSPECTOR #{activeGunaModal.id}</span>
                    <h3 className="vl-guna-modal-title">
                      <span lang="sa">{activeGunaModal.dev}</span> · {activeGunaModal.iast}
                    </h3>
                    <div className="vl-guna-modal-en">{activeGunaModal.en}</div>
                  </div>
                  <button
                    type="button"
                    className="vl-guna-close-btn"
                    onClick={() => setActiveGunaModal(null)}
                  >
                    ✕
                  </button>
                </div>

                <div className="vl-guna-modal-body">
                  <div className="vl-inspector-row">
                    <strong>Canonical Source:</strong>{' '}
                    <span>{activeGunaModal.isCanonOriginal ? 'Kaṇāda (Vaiśeṣika Sūtra 1.1.6)' : 'Praśastapāda (Padārtha-dharma-saṅgraha)'}</span>
                  </div>
                  <div className="vl-inspector-row">
                    <strong>Host Carrier (Āśraya):</strong>{' '}
                    <span className="vl-code-chip">{activeGunaModal.host}</span>
                  </div>
                  <div className="vl-inspector-row">
                    <strong>Classical Sūtra Definition:</strong>
                    <div className="vl-sutra-quote">{activeGunaModal.sutraDef}</div>
                  </div>
                  <div className="vl-inspector-row">
                    <strong>Modern Physics / Scientific Parallel:</strong>
                    <div className="vl-modern-quote">{activeGunaModal.modernParallel}</div>
                  </div>
                  <div className="vl-inspector-row">
                    <strong>Philosophical Analysis:</strong>
                    <p style={{ margin: '0.35rem 0 0', lineHeight: 1.6, color: '#e2e8f0' }}>
                      {activeGunaModal.explanation}
                    </p>
                  </div>
                </div>

                <div className="vl-guna-modal-footer">
                  <button
                    type="button"
                    className="vl-btn vl-btn--cyber"
                    onClick={() => onPronounce(activeGunaModal.dev)}
                  >
                    🔊 Hear Pronunciation ({activeGunaModal.dev})
                  </button>
                  <button
                    type="button"
                    className="vl-btn vl-btn--cyber-ghost"
                    onClick={() => setActiveGunaModal(null)}
                  >
                    Close Inspector
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          VIEW 3: ⚡ THE 5 KARMAS & VAIŚEṢIKA LAWS OF KINEMATICS
          ========================================================================= */}
      {activeTab === 'karmas' && (
        <div className="vl-karmas-view">
          <div className="vl-section-subhead">
            <div>
              <h3 className="vl-subhead-title">पञ्च-कर्माणि एवं गतिनियमाः · THE 5 MOTIONS & KINEMATICS</h3>
              <p className="vl-subhead-desc">
                <em>&ldquo;उत्क्षेपणमवक्षेपणमाकुञ्चनं प्रसारणं गमनमिति कर्माणि&rdquo;</em> (Vaiśeṣika Sūtra 1.1.7).
                Motion is not random; it requires a primary cause (Nodanā, Abhighāta, Gurutva) and is maintained in flight through <strong>Vega</strong> (Momentum).
              </p>
            </div>
          </div>

          {/* Interactive 5 Motions Showcase */}
          <div className="vl-karmas-showcase-grid">
            {KARMAS_5.map((k) => (
              <div
                key={k.id}
                className={`vl-karma-card${activeKarmaAnimation === k.id ? ' is-active' : ''}`}
                onClick={() => {
                  setActiveKarmaAnimation(k.id);
                  onPronounce(k.dev);
                }}
              >
                <div className="vl-karma-header">
                  <span className="vl-karma-icon">{k.icon}</span>
                  <div>
                    <h4 className="vl-karma-name">
                      <span lang="sa">{k.dev}</span> ({k.iast})
                    </h4>
                    <div className="vl-karma-en">{k.en}</div>
                  </div>
                </div>

                <div className="vl-karma-vector-tag">
                  <span>Vector:</span> <strong>{k.vector}</strong>
                </div>

                {/* Animated Kinematics Demo Box */}
                <div className="vl-karma-demo-box">
                  {k.id === 'utksepana' && (
                    <div className="vl-motion-stage vl-motion-stage--up">
                      <div className="vl-motion-particle vl-motion-particle--rising">⚛️</div>
                      <div className="vl-motion-arrow">▲</div>
                    </div>
                  )}
                  {k.id === 'avaksepana' && (
                    <div className="vl-motion-stage vl-motion-stage--down">
                      <div className="vl-motion-particle vl-motion-particle--falling">🍎</div>
                      <div className="vl-motion-arrow">▼</div>
                    </div>
                  )}
                  {k.id === 'akuncana' && (
                    <div className="vl-motion-stage vl-motion-stage--contract">
                      <div className="vl-motion-particle vl-motion-particle--contracting">🤏</div>
                      <div className="vl-motion-scale-ring" />
                    </div>
                  )}
                  {k.id === 'prasarana' && (
                    <div className="vl-motion-stage vl-motion-stage--expand">
                      <div className="vl-motion-particle vl-motion-particle--expanding">💥</div>
                      <div className="vl-motion-expand-ring" />
                    </div>
                  )}
                  {k.id === 'gamana' && (
                    <div className="vl-motion-stage vl-motion-stage--translate">
                      <div className="vl-motion-particle vl-motion-particle--translating">🚀</div>
                      <div className="vl-motion-trail" />
                    </div>
                  )}
                </div>

                <div className="vl-karma-cause-box">
                  <strong>Triggering Cause:</strong> {k.cause}
                </div>

                <div className="vl-karma-parallel">
                  <strong>Modern Parallel:</strong> {k.modernParallel}
                </div>

                <p className="vl-karma-desc">{k.desc}</p>
              </div>
            ))}
          </div>

          {/* Kaṇāda's 4 Causal Forces of Motion Banner */}
          <div className="vl-causal-forces-banner">
            <h4 className="vl-forces-title">
              <span>🎯 KAṆĀDA&rsquo;S FOUR CAUSAL FORCES OF MOTION (गति-कारणानि)</span>
            </h4>
            <div className="vl-forces-grid">
              <div className="vl-force-card">
                <div className="vl-force-num">१. नोदना (Nodanā)</div>
                <div className="vl-force-term">Continuous Propulsion / Push</div>
                <p className="vl-force-exp">Continuous contact pressure, like an archer drawing a bowstring or hand pushing a chariot.</p>
              </div>
              <div className="vl-force-num-card vl-force-card">
                <div className="vl-force-num">२. अभिघात (Abhighāta)</div>
                <div className="vl-force-term">Sudden Impact / Collision</div>
                <p className="vl-force-exp">Instantaneous elastic strike transferring kinetic energy, like a club hitting a ball or hammer striking an anvil.</p>
              </div>
              <div className="vl-force-num-card vl-force-card">
                <div className="vl-force-num">३. गुरुत्व (Gurutva)</div>
                <div className="vl-force-term">Gravitational Acceleration</div>
                <p className="vl-force-exp">Intrinsic downward pull causing bodies to fall the instant supporting contact is withdrawn.</p>
              </div>
              <div className="vl-force-num-card vl-force-card">
                <div className="vl-force-num">४. वेग (Vega)</div>
                <div className="vl-force-term">Inertial Momentum</div>
                <p className="vl-force-exp">The impressed velocity generated by initial motion that keeps an arrow flying through space even after leaving the bow.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: 🏺 PĪLUPĀKA VS. PIṬHARAPĀKA (CHEMICAL THERMODYNAMICS)
          ========================================================================= */}
      {activeTab === 'pilupaka' && (
        <div className="vl-pilupaka-debate-view">
          <div className="vl-section-subhead">
            <div>
              <h3 className="vl-subhead-title">पीलुपाकः vs. पिठरपाकः · THE CHEMISTRY OF CHANGE</h3>
              <p className="vl-subhead-desc">
                When a raw dark clay pot is fired in a kiln and turns into red terracotta ceramic, how does the transformation happen?
                This sparked the greatest chemical debate in classical Indian science between <strong>Kaṇāda&rsquo;s Vaiśeṣika (Pīlupāka)</strong> and <strong>Gautama&rsquo;s Nyāya (Piṭharapāka)</strong>.
              </p>
            </div>
          </div>

          <div className="vl-debate-comparison-grid">
            {/* Vaiśeṣika Model */}
            <div className={`vl-debate-column vl-debate-column--pilu${piluDebateStep === 1 ? ' is-highlighted' : ''}`}>
              <div className="vl-debate-column-header">
                <span className="vl-debate-badge">VAIŚEṢIKA / KAṆĀDA</span>
                <h4 className="vl-debate-name">पीलुपाक-वादः (Pīlupāka-vāda)</h4>
                <div className="vl-debate-trans">Atomic Decomposition &amp; Recombination</div>
              </div>

              <div className="vl-debate-etymology">
                <strong>Etymology:</strong> <em>Pīlu</em> (Atom / Paramāṇu) + <em>Pāka</em> (Cooking / Heat)
              </div>

              <div className="vl-debate-steps-list">
                <div className="vl-step-row">
                  <span className="vl-step-num">१</span>
                  <div>
                    <strong>Bond Cleavage (Vibhāga):</strong> Intense thermal energy from Tejas breaks the binary bonds (Dvyaṇukas) of the clay pot.
                  </div>
                </div>
                <div className="vl-step-row">
                  <span className="vl-step-num">२</span>
                  <div>
                    <strong>Isolated Paramāṇu State:</strong> The pot momentarily dissolves down to solitary, free-floating atoms in Ākāśa.
                  </div>
                </div>
                <div className="vl-step-row">
                  <span className="vl-step-num">३</span>
                  <div>
                    <strong>Atomic Property Transformation:</strong> Direct contact with Tejas atoms permanently transforms the inherent color quality (Rūpa) of individual atoms from black to ceramic red.
                  </div>
                </div>
                <div className="vl-step-row">
                  <span className="vl-step-num">४</span>
                  <div>
                    <strong>Fresh Re-synthesis:</strong> The modified atoms undergo fresh conjunction (Saṃyoga), reforming dyads and triads into the newly baked pot!
                  </div>
                </div>
              </div>

              <div className="vl-debate-summary-box">
                <strong>🔬 Modern Parallel:</strong> Molecular decomposition, high-energy bond dissociation, and chemical re-crystallization during thermal annealing.
              </div>
            </div>

            {/* Nyāya Model */}
            <div className={`vl-debate-column vl-debate-column--pithara${piluDebateStep === 2 ? ' is-highlighted' : ''}`}>
              <div className="vl-debate-column-header">
                <span className="vl-debate-badge">NYĀYA / GAUTAMA</span>
                <h4 className="vl-debate-name">पिठरपाक-वादः (Piṭharapāka-vāda)</h4>
                <div className="vl-debate-trans">Macroscopic Vessel Porous Penetration</div>
              </div>

              <div className="vl-debate-etymology">
                <strong>Etymology:</strong> <em>Piṭhara</em> (Whole Pot / Vessel) + <em>Pāka</em> (Cooking / Heat)
              </div>

              <div className="vl-debate-steps-list">
                <div className="vl-step-row">
                  <span className="vl-step-num">१</span>
                  <div>
                    <strong>Intact Molecular Matrix:</strong> The pot never disassembles into loose atoms. If it did, the structural vessel would collapse into dust.
                  </div>
                </div>
                <div className="vl-step-row">
                  <span className="vl-step-num">२</span>
                  <div>
                    <strong>Micro-Porous Permeation:</strong> Heat corpuscles (Tejas) enter through the microscopic porous channels (Sūkṣma-chidras) of the clay body.
                  </div>
                </div>
                <div className="vl-step-row">
                  <span className="vl-step-num">३</span>
                  <div>
                    <strong>Continuous Internal Permeation:</strong> The thermal particles saturate the entire body simultaneously.
                  </div>
                </div>
                <div className="vl-step-row">
                  <span className="vl-step-num">४</span>
                  <div>
                    <strong>Holistic Color Transformation:</strong> The color transforms from dark to red across the intact vessel as a unified organic whole!
                  </div>
                </div>
              </div>

              <div className="vl-debate-summary-box">
                <strong>🔬 Modern Parallel:</strong> Solid-state diffusion, thermal conduction, and porous interstitial diffusion without phase dismantling.
              </div>
            </div>
          </div>

          {/* Interactive Toggle for Step Focus */}
          <div className="vl-debate-controls">
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Focus on view:</span>
            <button
              type="button"
              className={`vl-btn vl-btn--sm${piluDebateStep === 0 ? ' vl-btn--cyber' : ' vl-btn--cyber-ghost'}`}
              onClick={() => setPiluDebateStep(0)}
            >
              Side-by-Side Comparison
            </button>
            <button
              type="button"
              className={`vl-btn vl-btn--sm${piluDebateStep === 1 ? ' vl-btn--cyber' : ' vl-btn--cyber-ghost'}`}
              onClick={() => setPiluDebateStep(1)}
            >
              Highlight Pīlupāka (Atom-by-Atom)
            </button>
            <button
              type="button"
              className={`vl-btn vl-btn--sm${piluDebateStep === 2 ? ' vl-btn--cyber' : ' vl-btn--cyber-ghost'}`}
              onClick={() => setPiluDebateStep(2)}
            >
              Highlight Piṭharapāka (Porous Matrix)
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 5: 🌾 SAGE KAṆĀDA: THE TWIN MONIKERS
          ========================================================================= */}
      {activeTab === 'kanada' && (
        <div className="vl-kanada-view">
          <div className="vl-kanada-hero-card">
            <div className="vl-kanada-hero-badge">THE FATHER OF ATOMISM</div>
            <h3 className="vl-kanada-hero-title">
              <span>महर्षि कणाद · MAHARISHI KAṆĀDA</span>
            </h3>
            <p className="vl-kanada-hero-desc">
              Why was the father of Indian atomic theory named <strong>Kaṇāda (कणाद)</strong>?
              Derived from <em>Kaṇa</em> (कण - atom, particle, or grain) and <em>Ada</em> (अद् - to analyze, gather, or eat).
              His name is a double honorific celebrating both his scientific genius and his austere yogic lifestyle.
            </p>
          </div>

          <div className="vl-kanada-monikers-grid">
            {/* Moniker 1 */}
            <div className="vl-moniker-card vl-moniker-card--scientist">
              <div className="vl-moniker-badge">PERSPECTIVE 1 · THE NATURAL SCIENTIST</div>
              <div className="vl-moniker-icon">⚛️</div>
              <h4 className="vl-moniker-title">&ldquo;The Particle-Gatherer&rdquo;</h4>
              <div className="vl-moniker-sub">कणान् अत्ति / गृह्णाति इति कणादः</div>

              <div className="vl-moniker-section">
                <span className="vl-m-label">The Intellectual Mission:</span>
                <p className="vl-m-text">
                  His life&rsquo;s work was dedicated to breaking down the entire manifest universe into its most infinitesimal, indestructible particles—the <strong>Paramāṇu</strong>.
                </p>
              </div>

              <div className="vl-moniker-section">
                <span className="vl-m-label">Scientific Contribution:</span>
                <p className="vl-m-text">
                  He gathered and classified the atomic interactions of Earth, Water, Fire, and Air. By demonstrating how imperceptible binary dyads (Dvyaṇukas) and perceptible triads (Tryaṇukas) form macroscopic reality, he conceptually gathered particles to unveil the architecture of the cosmos.
                </p>
              </div>

              <div className="vl-moniker-quote">
                &ldquo;There walks the thinker who analyzes the cosmos through its smallest particles.&rdquo;
              </div>
            </div>

            {/* Moniker 2 */}
            <div className="vl-moniker-card vl-moniker-card--ascetic">
              <div className="vl-moniker-badge">PERSPECTIVE 2 · THE ASCETIC YOGI</div>
              <div className="vl-moniker-icon">🌾</div>
              <h4 className="vl-moniker-title">&ldquo;The Grain-Eater&rdquo;</h4>
              <div className="vl-moniker-sub">शीलोञ्छ-वृत्ति-परायणः काश्यपः</div>

              <div className="vl-moniker-section">
                <span className="vl-m-label">The Austere Lifestyle:</span>
                <p className="vl-m-text">
                  In classical texts, he is also revered by his clan name <strong>Kāśyapa</strong>. He practiced a severe spiritual vow called <em>Śiloñcha-vṛtti</em> (शीलोञ्छ-वृत्ति).
                </p>
              </div>

              <div className="vl-moniker-section">
                <span className="vl-m-label">The Gleaner in the Fields:</span>
                <p className="vl-m-text">
                  After local farmers reaped their grain harvests, Kaṇāda would walk through the bare agricultural fields, patiently collecting the single, tiny discarded grains of rice or wheat dropped in the soil as his sole daily nourishment.
                </p>
              </div>

              <div className="vl-moniker-quote">
                &ldquo;His lifestyle mirrored his physics: he survived on the smallest particles of food, just as he built his philosophy on the smallest particles of matter.&rdquo;
              </div>
            </div>
          </div>

          <div className="vl-kanada-footer-note">
            <span className="vl-spark-icon">✨</span>
            <span>
              <strong>Yogic & Scientific Symmetry:</strong> When ancient scholars looked at his complete absorption in the infinitesimal—both in the fields he walked and in the laboratory of his mind—they named him <strong>Kaṇāda</strong>: The Man of the Particle.
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 6: 🏛️ THE SIX PADĀRTHAS TAXONOMY (FULL MATRIX)
          ========================================================================= */}
      {activeTab === 'categories' && (
        <div className="vl-categories-view">
          <div className="vl-section-subhead">
            <div>
              <h3 className="vl-subhead-title">षट्-पदार्थाः · THE SIX CATEGORIES OF BEING</h3>
              <p className="vl-subhead-desc">
                Everything that exists can be classified into these six fundamental padārthas. Click on any category to listen to its pronunciation.
              </p>
            </div>
          </div>

          <div className="vl-padarthas-grid">
            {PADARTHAS_DATA.map((p) => (
              <div
                key={p.iast}
                className="vl-padartha-card"
                onClick={() => onPronounce(p.dev)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onPronounce(p.dev);
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="vl-padartha-badge">{p.badge}</span>
                  <span style={{ fontSize: '1.25rem' }}>{p.icon}</span>
                </div>
                <div className="vl-padartha-title">
                  <span lang="sa" style={{ color: '#38bdf8' }}>{p.dev}</span> · {p.iast}{' '}
                  <span style={{ fontSize: '0.8em', color: '#94a3b8', fontWeight: 600 }}>({p.en})</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#818cf8', marginBottom: '0.4rem', fontWeight: 700 }}>
                  TREE BRANCH: {p.role.toUpperCase()}
                </div>
                <p className="vl-padartha-desc">{p.desc}</p>
                <div style={{ marginTop: '0.65rem' }}>
                  <button
                    type="button"
                    className="vl-word-pronounce-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPronounce(p.dev);
                    }}
                    style={{ fontSize: '0.78rem' }}
                  >
                    🔊 Pronounce <strong>{p.dev}</strong>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
