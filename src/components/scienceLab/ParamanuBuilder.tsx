import React, { useRef, useState } from 'react';
import { BodhiLabAnecdote, ChallengeList, CoreIdea, TermPanel, type LabChallenge, type LabTerm, type LabSegmentProps } from './common';
import { GlowSlider, HudFrame, LedButton } from './controls';
import { localPoint } from './geometry';
import { playPronunciation } from '../../utils/pronunciation';
import { soundEffects } from '../../utils/soundEffects';
import { PadarthasExplorer } from './PadarthasExplorer';
import { AkasaSutraGame } from './AkasaSutraGame';
import { DynamicGunaMatrix } from './DynamicGunaMatrix';
import { BhutaReconstructor } from './BhutaReconstructor';
import { AtomismHistoryVisualizer } from './AtomismHistoryVisualizer';

type Bhuta = 'prthivi' | 'ap' | 'tejas' | 'vayu';
type Kind = 'p' | 'd' | 't';

interface Item {
  id: number;
  kind: Kind;
  bhuta: Bhuta;
  x: number;
  y: number;
  /** For dvyaṇuka groups: how many dvyaṇukas are held together (1 or 2). */
  n: number;
  dodgeOffsetX?: number;
  dodgeOffsetY?: number;
}

interface FusionBurst {
  id: number;
  x: number;
  y: number;
  color: string;
  kind: 'd' | 't';
}

interface ClashBurst {
  id: number;
  x: number;
  y: number;
  title: string;
  subtitle: string;
  color: string;
  type: 'steam' | 'dust' | 'suffocate' | 'humidity';
}

const W = 640;
const H = 420;
const TRAY_W = 112;
const JOIN_DIST = 42;

const BHUTA_INFO: Record<Bhuta, { dev: string; iast: string; en: string; color: string; soft: string; icon: string; guna: string; gunaDev: string; sense: string }> = {
  prthivi: { dev: 'पृथिवी', iast: 'pṛthivī', en: 'earth', color: '#a16207', soft: '#fef3c7', icon: '🪨', guna: 'gandha', gunaDev: 'गन्ध (smell)', sense: '👃 Olfactory / Solid Lattice' },
  ap: { dev: 'अप्', iast: 'ap', en: 'water', color: '#0284c7', soft: '#e0f2fe', icon: '💧', guna: 'rasa', gunaDev: 'रस (taste)', sense: '👅 Gustatory / Fluid Ripple' },
  tejas: { dev: 'तेजस्', iast: 'tejas', en: 'fire / light', color: '#ea580c', soft: '#ffedd5', icon: '🔥', guna: 'rūpa', gunaDev: 'रूप (form / color)', sense: '👁️ Visual / Luminous Radiance' },
  vayu: { dev: 'वायु', iast: 'vāyu', en: 'air', color: '#7c3aed', soft: '#ede9fe', icon: '🌬️', guna: 'sparśa', gunaDev: 'स्पर्श (touch)', sense: '✋ Tactile / Kinetic Streamline' },
};

const BHUTAS: Bhuta[] = ['prthivi', 'ap', 'tejas', 'vayu'];
const trayY = (i: number) => 70 + i * 88;

// Web Audio API Synthesizers for Comedic Rejections
const playSteamHiss = () => {
  soundEffects.playSteamHiss();
};

const playBoingSound = () => {
  soundEffects.playCartoonBoing();
};

// Comedic Quips Database for Incompatible Clashes
const FUNNY_GURU_QUOTES = [
  "Apas is cold, Tejas is hot! You are triggering structural chaos in the lab!",
  "Stop trying to forge that dyad. Even the unseen cosmic power (Adṛṣṭa) is judging this move.",
  "Rejection! Your input particles have filed an official containment order against each other.",
  "You're trying to mix wild Vāyu with stable Pṛthivī. You just made a cosmic dust storm!",
  "You dumped dirt on the flame! You suffocated the Tejas particle. Kaṇāda is not impressed.",
  "Vāyu's dryness is drinking up Ap's moisture layers. That's just invisible humidity!"
];

const TERMS: LabTerm[] = [
  // 1. Fundamental Atomic Units (परमाणु-सिद्धान्तः)
  { dev: 'परमाणु', iast: 'paramāṇu', en: 'the smallest, indivisible, imperceptible particle (0D point)', note: 'parama (utmost) + aṇu (tiny); eternal uncaused seed' },
  { dev: 'द्व्यणुक', iast: 'dvyaṇuka', en: 'binary dyad: two paramāṇus joined by kinetic conjunction (1D line)', note: 'possesses minuteness (aṇutva) and short length (hrasvatva); imperceptible' },
  { dev: 'त्र्यणुक', iast: 'tryaṇuka', en: 'triad: three dvyaṇukas clustered in 3D spatial arrangement (3D volume)', note: 'also called trasareṇu; the fundamental threshold of visual magnitude (mahattva)' },
  { dev: 'त्रसरेणु', iast: 'trasareṇu', en: 'the epistemic bridge: a dust mote dancing in a shaft of sunlight', note: 'smallest macroscopic unit capable of scattering electromagnetic light waves' },
  { dev: 'अदृष्ट', iast: 'adṛṣṭa', en: 'the unseen cosmic moral/physical order', note: 'catalytic driver of initial atomic motion and creation' },
  { dev: 'नित्य-कारण', iast: 'nitya kāraṇa', en: 'eternal uncaused foundation', note: 'paramāṇu has no composite parts and cannot be destroyed' },
  { dev: 'अनित्य-कार्य', iast: 'anitya kārya', en: 'transient emergent effect / compound', note: 'all physical compounds from dvyaṇukas to mountains are created and dissolvable' },

  // 2. The 3-Step Construction Framework (स्थूल-द्रव्य-निर्माणम्)
  { dev: 'संयोग', iast: 'saṁyoga', en: 'binary conjunction / contact', note: 'Step 1: localized conjunction driving dimerization' },
  { dev: 'अणुत्व', iast: 'aṇutva', en: 'atomic minuteness', note: 'the irreducible scalar magnitude of an isolated paramāṇu' },
  { dev: 'ह्रस्वत्व', iast: 'hrasvatva', en: 'short linear measure', note: 'the one-dimensional length property of a dvyaṇuka dyad' },
  { dev: 'प्रचय', iast: 'pracaya', en: 'triadic spatial clustering / non-coplanar aggregation', note: 'Step 2: folding 3 dyads into a 3D unit cell' },
  { dev: 'महत्त्व', iast: 'mahattva', en: 'spatial magnitude / 3D structural volume', note: 'emergent dimensional extension enabling physical visibility' },
  { dev: 'प्रचय-विशेष', iast: 'pracaya-viśeṣa', en: 'macroscopic lattice ordering / space group symmetry', note: 'Step 3: long-range periodic crystal packing dictating macroscopic density' },
  { dev: 'कठिनत्व', iast: 'kaṭhinatva', en: 'structural cohesion and mechanical hardness', note: 'emergent property dictated by the atomic packing factor (APF)' },
  { dev: 'चाक्षुष', iast: 'cākṣuṣa', en: 'perceptible to the visual faculty (ocularly visible)', note: 'property unlocked exclusively at the tryaṇuka / trasareṇu threshold' },
  { dev: 'अतीन्द्रिय', iast: 'atīndriya', en: 'trans-sensory / beyond the threshold of human senses', note: 'solitary paramāṇus and binary dyads are atīndriya (imperceptible)' },

  // 3. The Epistemic Bridge to Perception (कणाद-प्रमाण-सेतुः)
  { dev: 'जालसूर्यमरीचि', iast: 'jālasūryamarīci', en: 'sunbeam through a latticed window', note: 'classical empirical laboratory setting for observing trasareṇu motes' },
  { dev: 'प्रकीर्णन', iast: 'prakīrṇana', en: 'light scattering (Rayleigh & Mie scattering)', note: 'photons interacting with particles comparable to electromagnetic wavelengths' },
  { dev: 'अनुमान', iast: 'anumāna', en: 'rational deduction / logical inference', note: 'method used by Kaṇāda to derive indivisible atoms from observed sunbeam motes' },
  { dev: 'प्रत्यक्ष', iast: 'pratyakṣa', en: 'direct sensory perception / empirical observation', note: 'the sensory threshold crossed when tryaṇukas scatter sunlight' },

  // 4. The Six Padārthas (वैशेषिक षट्-पदार्थाः)
  { dev: 'पदार्थ', iast: 'padārtha', en: 'category of knowable reality (ontological category)', note: '“pada-artha” = that which can be named, known, and conceptualized' },
  { dev: 'द्रव्य', iast: 'dravya', en: 'substance / ontological substrate', note: 'the foundational substrate containing qualities and kinetic actions (9 dravyas)' },
  { dev: 'गुण', iast: 'guṇa', en: 'inherent quality / static energetic property', note: '24 classical qualities (smell, taste, color, touch, number, dimension, etc.)' },
  { dev: 'कर्म', iast: 'karma', en: 'motion / dynamic kinematics', note: '5 motions: utkṣepaṇa (up), avakṣepaṇa (down), ākuñcana (contraction), prasāraṇa (expansion), gamana (locomotion)' },
  { dev: 'सामान्य', iast: 'sāmānya', en: 'generality / universal essence', note: 'the common generic identity shared across multiple individuals (e.g. dravyatva, gotva)' },
  { dev: 'विशेष', iast: 'viśeṣa', en: 'ultimate individuality / quantum differentiation', note: 'the unique metaphysical signature distinguishing two otherwise identical paramāṇus' },
  { dev: 'समवाय', iast: 'samavāya', en: 'inseparable inherence / structural binding', note: 'eternal organic relation binding quality to substance, whole to parts, action to mover' },
  { dev: 'अभाव', iast: 'abhāva', en: 'non-existence / categorical absence', note: 'the 7th ontological category added in later Nyāya-Vaiśeṣika' },

  // 5. Dynamic Guṇa Matrix & Chemical Transformations (गुण-पाक-प्रक्रिया)
  { dev: 'स्नेह', iast: 'sneha', en: 'viscidity / cohesive intermolecular bonding', note: 'exclusive to Ap (water); enables clay particles to cohere into dough' },
  { dev: 'द्रवत्व', iast: 'dravatva', en: 'fluidity / ability to flow', note: 'present in water inherently, and in earth/metals when melted by heat' },
  { dev: 'उष्ण', iast: 'uṣṇa', en: 'heat / thermal energy', note: 'catalyst that disrupts atomic conjunctions and triggers quality transformation' },
  { dev: 'पीलुपाक', iast: 'pīlupāka', en: 'atom-by-atom thermal baking (Vaiśeṣika doctrine)', note: 'pīlu (atom) + pāka (baking); heat dissociates compounds to atomic level before recombining' },
  { dev: 'पिठरपाक', iast: 'piṭharapāka', en: 'holistic vessel baking (Nyāya doctrine)', note: 'piṭhara (pot) + pāka (baking); heat transforms properties through porous channels without atomic disruption' },

  // 6. The Five Elemental Bhūtas (पञ्च-महाभूतानि)
  { dev: 'पृथिवी', iast: 'pṛthivī', en: 'earth element', note: 'special defining quality: gandha (smell); solid state ballast' },
  { dev: 'अप्', iast: 'ap', en: 'water element', note: 'special defining quality: rasa (taste); provides cohesive sneha' },
  { dev: 'तेजस्', iast: 'tejas', en: 'fire / radiant energy', note: 'special defining quality: rūpa (color, form, radiation); drives pāka' },
  { dev: 'वायु', iast: 'vāyu', en: 'air / gaseous kinetic medium', note: 'special defining quality: sparśa (touch, pressure); drives kinetic momentum' },
  { dev: 'आकाश', iast: 'ākāśa', en: 'ether / continuous all-pervading space', note: 'special defining quality: śabda (sound); singular, infinite continuum (vibhu)' },

  // 7. Sage Kaṇāda & Methodology (महर्षि-कणादः)
  { dev: 'कणाद', iast: 'Kaṇāda', en: 'Sage Kaṇāda (Maharishi Kaṇāda / Kāśyapa)', note: 'kaṇa (atom/grain) + ada (gatherer/eater); pioneer of Indian atomism (~6th c. BCE)' },
  { dev: 'शीलोञ्छ-वृत्ति', iast: 'śīloñcha-vṛtti', en: 'austere gleaning vow of field grains', note: 'ascetic practice of collecting fallen grains; mirrored his search for the ultimate particle of matter' },
];

const CHALLENGES: LabChallenge[] = [
  // Challenge 1: Dvyaṇuka Dimerization
  {
    q: 'How many zero-dimensional paramāṇus join in Step 1 (Dimerization) to make one Dvyaṇuka?',
    options: ['1 paramāṇu', '2 paramāṇus', '3 paramāṇus', '6 paramāṇus'],
    answer: 1,
    explain: 'Dvi means two: two 0D indivisible paramāṇus undergo localized conjunction (saṁyoga) driven by kinetic karma to forge an imperceptible 1D dyad (dvyaṇuka).',
  },
  // Challenge 2: Tryaṇuka / Trasareṇu Composition
  {
    q: 'In Sage Kaṇāda’s framework, what constitutes a Tryaṇuka (Trasareṇu)?',
    options: [
      'Three isolated paramāṇus',
      'Three dvyaṇukas (six paramāṇus total) clustered in 3D',
      'Two dvyaṇukas and one fire atom',
      'An infinite cloud of unbonded energy',
    ],
    answer: 1,
    explain: 'Three linear dvyaṇukas cluster in a non-coplanar spatial arrangement (pracaya) to compose a Tryaṇuka (6 paramāṇus in total), breaking through into three-dimensional volume.',
  },
  // Challenge 3: Epistemic Bridge to Perception
  {
    q: 'Why does human visual perception suddenly emerge at the Tryaṇuka / Trasareṇu level, but not at the Dvyaṇuka level?',
    options: [
      'Dvyaṇukas are repelled by human retinas',
      'A Dvyaṇuka has length but zero volume; only triadic clustering introduces 3D spatial magnitude (Mahatva) capable of scattering light waves',
      'Dvyaṇukas only exist in total darkness',
      'Tryaṇukas possess psychic consciousness',
    ],
    answer: 1,
    explain: 'Kaṇāda deduced that zero-dimensional atoms and one-dimensional dyads possess no spatial volume. Only when three dyads fold into 3D does spatial magnitude (Mahatva) emerge, reaching the Rayleigh/Mie threshold where electromagnetic light waves scatter.',
  },
  // Challenge 4: The Sunbeam Window Mote
  {
    q: 'What real-world empirical observation led Sage Kaṇāda to deduce the Trasareṇu as the smallest visible unit of matter?',
    options: [
      'Sparks flying from a blacksmith’s anvil',
      'Microscopic dust motes dancing in a shaft of sunlight streaming through a lattice window (Jāla-sūrya-marīci)',
      'Water droplets condensing on a cold copper pot',
      'Grains of sand rolling down a riverbank',
    ],
    answer: 1,
    explain: 'Vaiśeṣika Sūtra 4.1.6 identifies the dancing dust mote illuminated in a window sunbeam (जालसूर्यमरीचिस्थं त्रसरेणुम्) as the absolute smallest macroscopic entity accessible to the visual sense (cākṣuṣa).',
  },
  // Challenge 5: Step 3 Macroscopic Crystallization
  {
    q: 'In Step 3 of the Bhoota Reconstructor, how does macroscopic bulk matter acquire density and definitive sensory qualities (like Earth’s Gandha)?',
    options: [
      'Individual atoms each have tiny noses and smell',
      'Through Pracaya-Viśeṣa: long-range periodic geometric lattice ordering where collective packing symmetry triggers emergent sensory signatures',
      'By dipping the atoms in chemical liquid',
      'Through spontaneous magical manifestation without cause',
    ],
    answer: 1,
    explain: 'Pracaya-Viśeṣa (macroscopic arrangement and crystal space-group symmetry) dictates material density and triggers the emergent manifestation of definitive sensory signatures (like Earth’s smell and hardness).',
  },
  // Challenge 6: The Six Padārthas - Inseparable Inherence
  {
    q: 'Which of the Six Padārthas (षट्-पदार्थाः) represents the eternal, inseparable bond between a substance and its inherent quality (e.g. terracotta ceramic and its red color)?',
    options: ['Karma (Action)', 'Sāmānya (Universal)', 'Samavāya (Inseparable Inherence)', 'Viśeṣa (Individuality)'],
    answer: 2,
    explain: 'Samavāya is the eternal, structural inherence relation. Unlike temporary contact (saṁyoga), you cannot remove a quality (like redness or scent) from its inhering substrate without destroying the substance itself.',
  },
  // Challenge 7: Kinematics - The 5 Karmas
  {
    q: 'In Vaiśeṣika kinematics, how many fundamental types of physical action (Karma) are recognized?',
    options: [
      '2 (Forward and Backward)',
      '5 (Upward, Downward, Contraction, Expansion, and General Locomotion)',
      '10 (One for each cardinal direction)',
      'Infinite chaotic movements',
    ],
    answer: 1,
    explain: 'Vaiśeṣika classifies all motion into 5 distinct Karmas: Utkṣepaṇa (upward), Avakṣepaṇa (downward), Ākuñcana (contraction), Prasāraṇa (expansion), and Gamana (locomotion/translation).',
  },
  // Challenge 8: Chemical Debate - Pīlupāka vs Piṭharapāka
  {
    q: 'How does Sage Kaṇāda’s Pīlupāka theory of ceramic baking differ from the rival Nyāya school’s Piṭharapāka theory?',
    options: [
      'Kaṇāda claimed pots cannot be baked with fire',
      'Pīlupāka asserts heat dissociates compounds down to individual paramāṇus before changing qualities, whereas Piṭharapāka asserts the entire pot transforms as a whole through porous heat penetration',
      'Piṭharapāka claims atoms are destroyed forever',
      'There is no difference between the two theories',
    ],
    answer: 1,
    explain: 'Pīlu means atom: Vaiśeṣika argues thermal energy breaks all dyadic bonds, alters atomic qualities (dark clay -> red ceramic), and re-crystallizes them. Nyāya argues the pot remains structurally intact while heat permeates its microscopic pores (piṭhara).',
  },
  // Challenge 9: Dynamic Guṇa Matrix & States of Matter
  {
    q: 'Why are solid, liquid, and gas regarded as dynamic fluid states rather than rigid phases in Vaiśeṣika physics?',
    options: [
      'Because ancient India had no thermometers',
      'Because states are an emergent continuum governed by varying proportions of cohesive viscosity (Sneha), fluidity (Dravatva), and thermal energy (Uṣṇa)',
      'Because matter changes state only once every hundred years',
      'Because only water can change shape',
    ],
    answer: 1,
    explain: 'In the Dynamic Guṇa Matrix, solid, liquid, and gas are not rigid modern phase categories, but fluid combinations of underlying qualitative energies (Sneha, Dravatva, Uṣṇa) modulated by thermal input.',
  },
  // Challenge 10: 4-Step Synthesis Sequence
  {
    q: 'In the Dynamic Guṇa Matrix lab, what is the correct operational sequence to resolve the Oil & Water dilemma and synthesize an integrated compound?',
    options: [
      '1. Freeze -> 2. Shatter -> 3. Evaporate -> 4. Dissolve',
      '1. Attempt Merge (Friction) ➔ 2. Inject Tejas (Break Mask) ➔ 3. Sweep Vāyu (Dynamic Soup) ➔ 4. Bind Samavāya in Ākāśa',
      '1. Add Earth ➔ 2. Add Salt ➔ 3. Spin Wheel ➔ 4. Cool Down',
      '1. Bind Samavāya first before adding any heat',
    ],
    answer: 1,
    explain: 'The 4-step sequence models physical phase transitions: first confronting high Sneha friction, injecting Tejas to overcome latent transition barriers, sweeping Vāyu to disperse properties, and finally anchoring the unified compound through Samavāya.',
  },
  // Challenge 11: Quantum Uniqueness (Viśeṣa)
  {
    q: 'What ontological category in Vaiśeṣika explains why two solitary paramāṇus of Earth, identical in every measurable quality, remain distinct individual entities?',
    options: ['Sāmānya (Generality)', 'Viśeṣa (Ultimate Individuality)', 'Abhāva (Absence)', 'Prakṛti (Nature)'],
    answer: 1,
    explain: 'Viśeṣa (from which Vaiśeṣika gets its name) is the ultimate differentiator that gives eternal, partless atoms their unique quantum individuality, preventing them from collapsing into indistinguishable identity.',
  },
  // Challenge 12: Dual Monikers of Sage Kaṇāda
  {
    q: 'What is the profound dual significance behind the name “Kaṇāda” (महर्षि-कणादः)?',
    options: [
      'It means a fierce warrior who fought in the Mahabharata',
      'It honors both his scientific genius (analyzing the cosmos through infinitesimal particles / kaṇa) and his austere ascetic lifestyle (gleaning discarded grain seeds in harvested fields)',
      'It refers to someone who sings melodious Vedic chants',
      'It was a nickname given by Greek philosophers',
    ],
    answer: 1,
    explain: 'Kaṇa means both atom/particle and grain of food. As a natural philosopher, he gathered fundamental atoms; as a yogi practicing Śīloñcha-vṛtti, he ate only single dropped grains gleaned from reaped fields.',
  },
];

interface SortCard {
  label: string;
  answer: Bhuta | 'akasha';
  why: string;
}
const SORT_CARDS: SortCard[] = [
  { label: '🪨 A crystal pebble', answer: 'prthivi', why: 'Solid, cohesive objects are counted as pṛthivī.' },
  { label: '💧 A monsoon raindrop', answer: 'ap', why: 'Cohesive liquids are manifestations of ap.' },
  { label: '🕯️ A lamp flame', answer: 'tejas', why: 'Heat and radiant illumination are tejas.' },
  { label: '🍃 A mountain breeze', answer: 'vayu', why: 'Continuous movement and pressure belong to vāyu.' },
  { label: '👃 Petrichor (smell of wet earth)', answer: 'prthivi', why: 'Smell (gandha) is the unique defining guṇa of pṛthivī.' },
  { label: '🔔 The resonant ringing of a temple bell', answer: 'akasha', why: 'Sound (śabda) propagates exclusively through the continuum of ākāśa.' },
  { label: '☀️ Dancing dust mote in a sunbeam (Trasareṇu)', answer: 'prthivi', why: 'The Tryaṇuka particulate mote dancing in a sunbeam is solid earth matter (pṛthivī) scattering light.' },
  { label: '🍯 Thick viscous molten honey', answer: 'ap', why: 'High viscidity (Sneha) and fluidity (Dravatva) characterize the cohesive fluid state governed by Ap.' },
  { label: '⚡ Lightning bolt across the monsoon storm', answer: 'tejas', why: 'High-energy electrical thermal discharge and radiant illumination are Tejas (Vidyut).' },
  { label: '🌪️ Whistling atmospheric pressure front', answer: 'vayu', why: 'Kinetic gas pressure, movement, and intangible touch are Vāyu.' },
];

const SORT_BINS: { id: Bhuta | 'akasha'; label: string }[] = [
  ...BHUTAS.map((b) => ({ id: b, label: `${BHUTA_INFO[b].icon} ${BHUTA_INFO[b].iast}` })),
  { id: 'akasha', label: '🌌 ākāśa' },
];

type MirrorBhuta = 'prthivi' | 'ap' | 'tejas' | 'vayu' | 'akasha';

interface CosmicMirrorData {
  id: MirrorBhuta;
  name: string;
  dev: string;
  iast: string;
  icon: string;
  color: string;
  // Microcosm: Body
  bodyHotspotName: string;
  bodyOrganTitle: string;
  bodyLocations: string;
  bodyPhysiology: string;
  sanskritBodyTerms: string;
  // Microcosm: Mind (Antaḥkaraṇa)
  mindFacultyTitle: string;
  mindManifestation: string;
  mindPsychology: string;
  sanskritMindTerms: string;
  // Macrocosm: Universe
  cosmosHotspotName: string;
  cosmosRealmTitle: string;
  cosmosLocations: string;
  cosmosAstronomy: string;
  sanskritCosmosTerms: string;
  sutraInsight: string;
}

const COSMIC_MIRROR_DATA: CosmicMirrorData[] = [
  {
    id: 'prthivi',
    name: 'Earth Element',
    dev: 'पृथिवी',
    iast: 'Pṛthivī',
    icon: '🪨',
    color: '#d97706',
    bodyHotspotName: 'Skeletal Framework & Solid Cell Matrix',
    bodyOrganTitle: 'Bones, Teeth, Nails, Muscles & Cell Walls',
    bodyLocations: 'Bones (asthi), teeth (danta), nail keratin, cartilage, muscle fibers, and rigid cellular phospholipid membranes.',
    bodyPhysiology: 'Provides structural integrity, gravitational stability, physical density, and dense mineral shielding.',
    sanskritBodyTerms: 'अस्थि (Bones) · दन्त (Teeth) · मांसपेशी (Muscle) · पार्थिव-धातु',
    mindFacultyTitle: 'Mental Stability, Endurance & Habit Roots (Dhṛti & Saṃskāra)',
    mindManifestation: 'Deeply ingrained habits, core convictions, memory seeds (Saṃskāras), and steady psychological stamina.',
    mindPsychology: 'Keeps the mind grounded, patient, and resolute. If deficient, mind feels unmoored and flighty; if excessive, mind calcifies into stubbornness, mental inertia (tamas), or prejudice.',
    sanskritMindTerms: 'संस्कार (Saṃskāra) · धृति (Dhṛti) · स्थैर्य (Sthairya) · तामसिक-जडत्व',
    cosmosHotspotName: 'Planetary Mantle, Mountains & Crust',
    cosmosRealmTitle: 'Mountain Chains, Tectonic Plates & Crystalline Minerals',
    cosmosLocations: 'Continental crust, Himalayan granite, tectonic collision zones, deep mineral veins, and terrestrial soil.',
    cosmosAstronomy: 'Acts as gravitational ballast, geo-magnetic shielding core, and fertile foundation supporting the biosphere.',
    sanskritCosmosTerms: 'पर्वत (Mountains) · भूतल (Earth Surface) · शिला (Stone Bedrock)',
    sutraInsight: 'The calcium-phosphate mineral lattice in your bones is the microscopic mirror of tectonic granite bedrock.',
  },
  {
    id: 'ap',
    name: 'Water Element',
    dev: 'अप्',
    iast: 'Ap',
    icon: '💧',
    color: '#0284c7',
    bodyHotspotName: 'Circulatory Ocean & Cytoplasm',
    bodyOrganTitle: 'Blood, Plasma, Saliva, Lymph & Cytoplasm (~70% of You!)',
    bodyLocations: 'Blood (rakta), plasma (rasa), cerebrospinal fluid, lymphatics, saliva, synovial joint oil, and cellular cytoplasm.',
    bodyPhysiology: 'Maintains osmotic balance, transports hormones/nutrients, lubricates membranes, and regulates core body temperature.',
    sanskritBodyTerms: 'रस (Plasma) · रक्त (Blood) · लाला (Saliva) · क्लेद (Bodily Moisture)',
    mindFacultyTitle: 'Flow of Emotion, Empathy & Attachment (Bhāva & Sneha)',
    mindManifestation: 'Emotional fluid empathy, compassion, interpersonal bonding, psychological cohesion, and memory adhesiveness.',
    mindPsychology: 'Enables feelings to flow harmoniously and binds discrete ideas into meaningful emotional memories. If dry, mind turns cynical and emotionally detached; if excessive, causes sentimentality, grief, and clinging attachment.',
    sanskritMindTerms: 'भाव (Emotion) · स्नेह (Affection/Oil) · करुणा (Compassion) · आसक्ति (Attachment)',
    cosmosHotspotName: 'Global Oceans, Monsoons & Glaciers',
    cosmosRealmTitle: 'Vast Oceans, Monsoon Currents, Rivers & Polar Ice',
    cosmosLocations: 'Global marine basins, atmospheric monsoon cloud bands, perennial river tributaries, aquifers, and glacial reserves.',
    cosmosAstronomy: 'Drives planetary hydrological circulation, buffers global climate against solar extremes, and circulates vital nutrients.',
    sanskritCosmosTerms: 'समुद्र (Oceans) · सरित् (Rivers) · मेघ (Rain Clouds) · सलिल (Fluid)',
    sutraInsight: 'The electrolyte salinity of your blood plasma directly preserves primordial ocean chemistry.',
  },
  {
    id: 'tejas',
    name: 'Fire & Light',
    dev: 'तेजस्',
    iast: 'Tejas',
    icon: '🔥',
    color: '#ea580c',
    bodyHotspotName: 'Digestive Furnace & Metabolic Hearth',
    bodyOrganTitle: 'Stomach Jaṭharāgni, Mitochondria & Retinal Vision',
    bodyLocations: 'Stomach hydrochloric furnace (Jaṭharāgni), cellular ATP mitochondria, metabolic enzyme cascades, and retinal photoreceptors (ālocaka pitta).',
    bodyPhysiology: 'Combusts gross nutrients into bio-energy (ahara-rasa), regulates body warmth at 37°C, and converts electromagnetic light into visual perception.',
    sanskritBodyTerms: 'जठराग्नि (Digestive Fire) · पित्त (Metabolic Bile) · भ्राजक (Skin Glow)',
    mindFacultyTitle: 'The Discerning Intellect & Logic (Buddhi & Viveka)',
    mindManifestation: 'The luminous discriminating faculty (Buddhi) that cuts through confusion, digests sensory data, and determines truth.',
    mindPsychology: 'Transforms raw information into conceptual clarity and wisdom. If deficient, causes mental confusion and indecision; if excessive, turns the intellect hyper-critical, burning, sarcastic, or angry.',
    sanskritMindTerms: 'बुद्धि (Intellect) · विवेक (Discrimination) · मेधा (Retention) · तेजस्',
    cosmosHotspotName: 'Solar Core, Lightning & Magma',
    cosmosRealmTitle: 'The Sun (Sūrya), Atmospheric Lightning & Volcanic Magma',
    cosmosLocations: 'The Sun (Sūrya), thermonuclear solar flares, lightning discharges (vidyut), volcanic magma, and cosmic starlight.',
    cosmosAstronomy: 'The primary energetic driver of photosynthesis, weather cycles, terrestrial warmth, and planetary illumination.',
    sanskritCosmosTerms: 'सूर्य (The Sun) · विद्युत् (Lightning) · वह्नि (Sacred Flame)',
    sutraInsight: 'The metabolic combustion turning food into ATP is the direct microscopic analogue of the thermonuclear furnace of Sūrya.',
  },
  {
    id: 'vayu',
    name: 'Air & Kinetic Vector',
    dev: 'वायु',
    iast: 'Vāyu',
    icon: '🌬️',
    color: '#8b5cf6',
    bodyHotspotName: 'Respiratory Prāṇa & Bio-Electric Nerves',
    bodyOrganTitle: 'Lungs (Prāṇa), Nerve Impulses & Locomotion',
    bodyLocations: 'Alveolar respiration (Prāṇa/Apāna), bioelectric synapsing (Vyāna), cardiac pacemaker pulses, and muscular joint locomotion.',
    bodyPhysiology: 'The master kinetic governor. Propels all sensory impulses, autonomic peristalsis, pulmonary oxygenation, and voluntary motor action.',
    sanskritBodyTerms: 'प्राण (Vital Breath) · व्यान (Circulatory Impulse) · गति (Locomotion)',
    mindFacultyTitle: 'Velocity of Thoughts & Agility (Cala-Citta & Mano-Vega)',
    mindManifestation: 'The rapid hopping of thoughts, imagination, verbal expression, creative ideation, and mental speed.',
    mindPsychology: 'Gives mental agility and creative inspiration. If balanced, thinking is swift and inventive; if aggravated, blows an internal gale of scattered anxiety, racing worry loops, and attention fragmentation.',
    sanskritMindTerms: 'मनोवेग (Thought Velocity) · चञ्चल-चित्त (Restless Mind) · कल्पना (Imagination)',
    cosmosHotspotName: 'Atmospheric Jet Streams & Hurricanes',
    cosmosRealmTitle: 'Atmospheric Winds, Jet Streams & Atmospheric Pressure Canopy',
    cosmosLocations: 'Atmospheric wind belts, stratospheric jet streams, cyclonic pressure fronts, hurricane vortexes, and the breathable oxygen layer.',
    cosmosAstronomy: 'Distributes atmospheric temperature, transports monsoon moisture across continents, and maintains air pressure gradients.',
    sanskritCosmosTerms: 'मातरिश्वन् (Cosmic Wind) · मरुत् (Wind God) · अनिल (Breeze)',
    sutraInsight: 'Your breathing respiratory cycle is an individualized wave pulse of planetary atmospheric pressure currents.',
  },
  {
    id: 'akasha',
    name: 'Space & Continuum',
    dev: 'आकाश',
    iast: 'Ākāśa',
    icon: '🌌',
    color: '#6366f1',
    bodyHotspotName: 'Acoustic Cavities & Internal Lumina',
    bodyOrganTitle: 'Sinuses, Ear Canals, Heart Chambers & Lumina',
    bodyLocations: 'Cranial sinuses, auditory ear canals (śrotra), pulmonary bronchial tree, cardiac ventricles (hṛdaya-guhā), and intracellular vacuole space.',
    bodyPhysiology: 'Provides frictionless, non-resistant room (avakāśa) for blood to circulate, lungs to expand, and cochlear auditory wave transmission.',
    sanskritBodyTerms: 'श्रोत्र (Auditory Canal) · हृदय-गुहा (Heart Cavity) · अवकाश (Room to Move)',
    mindFacultyTitle: 'The Infinite Mental Canvas & Awareness (Cittākāśa)',
    mindManifestation: 'The boundless inner expanse of consciousness (Cittākāśa) providing capacity to hold thoughts, dreams, and memories.',
    mindPsychology: 'The spacious background of peaceful stillness in which mental vrittis arise and subside. If constricted, mind feels claustrophobic, overwhelmed, and cognitively cluttered; when expanded, reveals profound tranquility and meditative freedom.',
    sanskritMindTerms: 'चित्ताकाश (Mental Space) · चिदाकाश (Consciousness Space) · प्रशान्ति (Serenity)',
    cosmosHotspotName: 'Intergalactic Void & Space Matrix',
    cosmosRealmTitle: 'Boundless Celestial Deep Space & Orbital Matrix',
    cosmosLocations: 'Intergalactic voids, planetary orbital paths, cosmic background continuum, and the cosmic Lego baseplate.',
    cosmosAstronomy: 'The boundless, non-interfering canvas in which stars rotate, galaxies form, light travels, and particles interact.',
    sanskritCosmosTerms: 'अनन्त-आकाश (Infinite Void) · व्योमन् (Sky Matrix) · खम् (Space)',
    sutraInsight: 'Without the hollow chamber inside your heart or lungs, life could not pump or breathe—just as planets cannot orbit without cosmic space.',
  },
];

interface MacroMicroScenario {
  id: string;
  title: string;
  sanskrit: string;
  icon: string;
  themeColor: string;
  borderTint: string;
  outerUniverse: {
    event: string;
    bhutaShifts: string;
    details: string;
  };
  innerBody: {
    reaction: string;
    organsImpacted: string;
    physiologicalDetails: string;
  };
  innerMind: {
    reaction: string;
    facultyImpacted: string;
    psychologicalDetails: string;
  };
  sageInsight: string;
  harmonizingAction: string;
}

const MACRO_MICRO_SCENARIOS: MacroMicroScenario[] = [
  {
    id: 'lightning-storm',
    title: 'LIGHTNING & THUNDERSTORM',
    sanskrit: 'विद्युत्-वात-प्रकोप (Vidyut-Vāta)',
    icon: '⚡',
    themeColor: '#38bdf8',
    borderTint: '#0ea5e9',
    outerUniverse: {
      event: 'Atmospheric Wind Shear & Ionized Lightning Plasma',
      bhutaShifts: 'High Vāyu (Wind velocity) + Explosive Tejas (Plasma discharges)',
      details: 'Sudden barometric drops create erratic howling gales, tearing tree limbs while electrical arcs light the dark horizon.',
    },
    innerBody: {
      reaction: 'Cardiac Acceleration & Autonomic Hyper-Arousal',
      organsImpacted: 'Lungs, Adrenal glands, Vasculature & Autonomic Nerves',
      physiologicalDetails: 'Heart rate spikes, respiration turns shallow and rapid, adrenaline surges, and peripheral hair stands on end (romāñca).',
    },
    innerMind: {
      reaction: 'Racing Thought Loops & Hyper-Critical Buddhi',
      facultyImpacted: 'Vāyu (Thought Velocity) + Tejas (Critical Intellect)',
      psychologicalDetails: 'Mind jumps erratically from topic to topic at supersonic speed. Buddhi turns hyper-critical and argumentative, and anxious worry loops ignite.',
    },
    sageInsight: '“See? The storm raging in the atmosphere mirrors the erratic swings of Vāyu raging inside your thoughts! When outer winds accelerate, the Antaḥkaraṇa mirrors the turbulence.”',
    harmonizingAction: 'Slow deep diaphragmatic Nāḍī-Śodhana Prāṇāyāma (alternate nostril breath) to calm mental Vāyu and anchor awareness in spacious Cittākāśa.',
  },
  {
    id: 'arid-desert',
    title: 'ARID PARCHED DESERT',
    sanskrit: 'मरुभूमि-ताप (Marubhūmi)',
    icon: '🏜️',
    themeColor: '#ea580c',
    borderTint: '#f97316',
    outerUniverse: {
      event: 'Blistering Solar Thermonuclear Heat & Zero Humidity',
      bhutaShifts: 'Maximal Tejas (Solar radiation) + Extreme Depletion of Ap',
      details: 'Blinding desert sun bakes the cracked earth, evaporating every trace of moisture into dry, shimmering heat waves.',
    },
    innerBody: {
      reaction: 'Cellular Dehydration & Hyperthermic Strain',
      organsImpacted: 'Mucous membranes, Kidneys, Skin & Stomach Jaṭharāgni',
      physiologicalDetails: 'Intracellular fluids plummet, tongue parches, body temperature rises toward fever, and gastric acid concentrates into sharp irritation.',
    },
    innerMind: {
      reaction: 'Irritability, Impatience & Emotional Drying',
      facultyImpacted: 'Tejas (Burning Pitta) + Depletion of Ap (Empathy/Sneha)',
      psychologicalDetails: 'Empathy (Sneha) evaporates, leaving the mind sharp, cynical, sarcastic, and easily frustrated. The intellect judges harshly without compassionate softness.',
    },
    sageInsight: '“When water dries up in the cosmos, the gentle cohesive nectar of the mind (Sneha) also evaporates, leaving the intellect brittle and scorchingly critical.”',
    harmonizingAction: 'Cultivate Maitrī (loving-kindness meditation) and drink cooling coconut water to replenish psychological and physiological Ap.',
  },
  {
    id: 'monsoon-deluge',
    title: 'TIDAL MONSOON DELUGE',
    sanskrit: 'जल-प्रलय वर्षा (Varṣā-Deluge)',
    icon: '🌊',
    themeColor: '#10b981',
    borderTint: '#059669',
    outerUniverse: {
      event: 'Continuous Torrential Rains & Saturated Riverbanks',
      bhutaShifts: 'Surging Ap (Hydrologic volume) + Heavy Pṛthivī (Waterlogged soil)',
      details: 'Dark overcast clouds drown the sunlight for weeks, overflowing rivers and turning dry terrain into thick, cohesive mud.',
    },
    innerBody: {
      reaction: 'Lymphatic Stagnation & Dampened Digestive Fire',
      organsImpacted: 'Stomach Jaṭharāgni, Spleen, Sinuses & Heavy Musculature',
      physiologicalDetails: 'Metabolic rate slows down (Mandāgni), fluid retention swells the tissues, limbs feel heavy like lead, and sinus congestion accumulates.',
    },
    innerMind: {
      reaction: 'Emotional Clinging, Nostalgia & Mental Fog',
      facultyImpacted: 'Excess Ap (Emotional Attachment) + Pṛthivī (Inertia/Tamas)',
      psychologicalDetails: 'Thoughts become sticky, heavy, and sluggish. The mind clings to past sentimental memories, difficulty letting go of grief, and mental inertia (Tamas) sets in.',
    },
    sageInsight: '“Monsoon waters cause memories to stick and swirl like muddy river sediment. Excessive emotional attachment is the psychological fingerprint of stagnant Ap!”',
    harmonizingAction: 'Engage in stimulating intellectual study (Svādhyāya), brisk physical movement, and warm ginger tea to clear mental heaviness.',
  },
  {
    id: 'arctic-glacier',
    title: 'ARCTIC GLACIAL PEAKS',
    sanskrit: 'हिम-शिखर शैत्य (Hima-Śikhara)',
    icon: '❄️',
    themeColor: '#6366f1',
    borderTint: '#4f46e5',
    outerUniverse: {
      event: 'Sub-Zero Freeze & Crystalline Ice Immobility',
      bhutaShifts: 'Cold Vāyu (Crisp stillness) + Solidified Ap/Pṛthivī (Ice glaciers)',
      details: 'Ancient blue glacial ice locks physical motion into profound sub-zero crystallization under immense high-altitude stillness.',
    },
    innerBody: {
      reaction: 'Peripheral Vasoconstriction & Metabolic Core Lock',
      organsImpacted: 'Circulatory capillaries, Joints, Thyroid & Adipose reserve',
      physiologicalDetails: 'Capillaries constrict tightly to preserve vital core warmth, joint synovial fluid thickens, and shivering thermogenesis activates.',
    },
    innerMind: {
      reaction: 'Mental Crystallization & Introverted Stillness',
      facultyImpacted: 'Vāyu (Cold contraction) + Pṛthivī (Solidified form)',
      psychologicalDetails: 'Emotional turbulence freezes into razor-sharp, crystalline focus. If unheated, however, risk of psychological numbness, apathy, or frozen emotional isolation.',
    },
    sageInsight: '“Glacier stillness freezes emotional volatility into pure crystalline focus, yet without the warmth of inner Tejas, the mind risks freezing into icy apathy.”',
    harmonizingAction: 'Kindle the inner fire of Tapas (disciplined spiritual enthusiasm) and heart-centered warmth (Bhakti) to prevent emotional numbness.',
  },
  {
    id: 'forest-dawn',
    title: 'SERENE FOREST DAWN',
    sanskrit: 'शान्त-वन प्रभात (Śānta-Vana)',
    icon: '🌸',
    themeColor: '#86efac',
    borderTint: '#22c55e',
    outerUniverse: {
      event: 'Golden Sunbeams, Morning Dew & Floral Petrichor',
      bhutaShifts: 'Harmonious Equilibrium of All 5 Pañcabhūtas (Sāmyatā)',
      details: 'Gentle morning breezes rustle leaves, birdsong echoes in clear space, morning dew glistens on moist soil, and soft warm sunlight nourishes all life.',
    },
    innerBody: {
      reaction: 'Optimal Neuro-Endocrine Homeostasis & Vital Ojas',
      organsImpacted: 'Heart, Lungs, Brain hemispheres & Endocrine glands',
      physiologicalDetails: 'Balanced parasympathetic tone, rhythmic coherent heart rate variability, optimal cellular respiration, and radiant skin luster (Bhrājaka).',
    },
    innerMind: {
      reaction: 'Pure Sattva, Spacious Awareness & Compassionate Viveka',
      facultyImpacted: 'Cittākāśa (Spaciousness) + Buddhi (Clarity) + Sneha (Love)',
      psychologicalDetails: 'The mind rests in pure, luminous clarity (Sattva). Thoughts arise without anxiety, intellect discriminates with gentle wisdom, and heart overflows with empathy.',
    },
    sageInsight: '“When the five elements in nature rest in reciprocal harmony, the inner mind instantly awakens to its pristine nature: vast as space, luminous as light!”',
    harmonizingAction: 'Rest in this natural meditative presence (Samatva) through mindful breath and grateful contemplation of cosmic interconnectedness.',
  },
];

interface BalancerRemedy {
  id: string;
  title: string;
  bhutaTag: string;
  desc: string;
  isCorrect: boolean;
  guruCommentary: string;
  healthTrivia: string;
  resolvedLevels: { prthivi: number; ap: number; tejas: number; vayu: number; akasha: number };
}

interface BalancerScenario {
  id: string;
  title: string;
  seasonSanskrit: string;
  seasonEn: string;
  icon: string;
  themeColor: string;
  borderTint: string;
  universeCrisis: string;
  initialLevels: { prthivi: number; ap: number; tejas: number; vayu: number; akasha: number };
  statusWarning: string;
  remedies: BalancerRemedy[];
}

const BALANCER_SCENARIOS: BalancerScenario[] = [
  {
    id: 'summer-heatwave',
    title: 'SCORCHING SUMMER HEATWAVE',
    seasonSanskrit: 'ग्रीष्म-ऋतु (Grīṣma)',
    seasonEn: 'Solar Surge',
    icon: '🔥',
    themeColor: '#ea580c',
    borderTint: '#f97316',
    universeCrisis: 'The solar orb radiates maximum thermonuclear heat down onto the continent. Atmospheric humidity is evaporated into dry parched air.',
    initialLevels: { prthivi: 45, ap: 24, tejas: 88, vayu: 52, akasha: 50 },
    statusWarning: 'Internal Tejas (Fire) is dangerously HIGH (88%)! Bodily cooling fluids (Ap) are depleted to 24%. High risk of heat exhaustion and Pitta flare!',
    remedies: [
      {
        id: 'watermelon',
        title: '🧊 Sweet Juicy Watermelon & Coconut Water',
        bhutaTag: 'COOLING AP & MADHURA',
        desc: 'Electrolyte-rich sweet hydrating fluids to douse excessive solar heat and replenish intracellular plasma.',
        isCorrect: true,
        guruCommentary: '“Aha! Splendid move. Boosting cooling Ap counteracts the solar Tejas surge! Pitta is soothed and cellular hydration is restored.”',
        healthTrivia: 'In Ayurveda, sweet and cooling foods (Śīta-vīrya) naturally pacify summer Pitta and prevent dangerous electrolyte loss.',
        resolvedLevels: { prthivi: 48, ap: 54, tejas: 50, vayu: 48, akasha: 50 },
      },
      {
        id: 'chili',
        title: '🌶️ Extra Spicy Fire Chili & Mustard Curry',
        bhutaTag: 'AGGRESSIVE TEJAS',
        desc: 'Fiery spices that stimulate intense digestive heat and promote sweat.',
        isCorrect: false,
        guruCommentary: '“Aah! You poured gasoline on an active bonfire! Your stomach is erupting in flames. Kaṇāda recommends cooling coconut water immediately!”',
        healthTrivia: 'Pungent spices (Kaṭu) dramatically aggravate Pitta dosha during summer, triggering acid reflux and dehydration.',
        resolvedLevels: { prthivi: 42, ap: 18, tejas: 98, vayu: 55, akasha: 50 },
      },
      {
        id: 'cornpuffs',
        title: '🍿 Dry Roasted Salty Corn Puffs',
        bhutaTag: 'DRYING VĀYU & PṚTHIVĪ',
        desc: 'Crunchy dry snacks with high sodium and zero fluid content.',
        isCorrect: false,
        guruCommentary: '“Too drying! Your body needed hydration, not dry salty crunchies. You just exacerbated the fluid deficit.”',
        healthTrivia: 'Excess salt and dry foods further desiccate tissues when the body is already battling summer dehydration.',
        resolvedLevels: { prthivi: 49, ap: 20, tejas: 82, vayu: 62, akasha: 50 },
      },
    ],
  },
  {
    id: 'winter-blizzard',
    title: 'BONE-CHILLING WINTER BLIZZARD',
    seasonSanskrit: 'शिशिर-ऋतु (Śiśira)',
    seasonEn: 'Deep Cold Wave',
    icon: '❄️',
    themeColor: '#38bdf8',
    borderTint: '#0284c7',
    universeCrisis: 'Arctic polar vortices blast icy dry gales across the landscape. The solar arc is low and weak, freezing lakes and rivers.',
    initialLevels: { prthivi: 40, ap: 32, tejas: 28, vayu: 86, akasha: 50 },
    statusWarning: 'Internal Vāyu (Air/Cold) has spiked to 86% (shivering, joint stiffness, dry skin), while internal digestive warmth (Tejas) is chilled to 28%!',
    remedies: [
      {
        id: 'ginger-tea',
        title: '🍵 Warm Spiced Ginger Tea & Roasted Sesame Stew',
        bhutaTag: 'KINDLING TEJAS & GROUNDING PṚTHIVĪ',
        desc: 'Unctuous warming spices that stoke Jaṭharāgni and anchor turbulent dry cold wind with heavy nourishing earth.',
        isCorrect: true,
        guruCommentary: '“Aha! Wonderful thermal intelligence! Warming ginger ignites your digestive spark while unctuous sesame grounds turbulent Vāyu.”',
        healthTrivia: 'In winter, your internal digestive fire burns stronger to keep you warm, which is why your appetite naturally increases!',
        resolvedLevels: { prthivi: 52, ap: 48, tejas: 54, vayu: 48, akasha: 50 },
      },
      {
        id: 'icecream',
        title: '🍦 Giant Chilled Mint Ice Cream Sundae',
        bhutaTag: 'EXCESS COLD AP & VĀYU',
        desc: 'Sub-zero sugary cream that shocks the gastric mucosa with deep freezing temperatures.',
        isCorrect: false,
        guruCommentary: '“Brrr! You just turned your internal system into a glacier ice cube! Kaṇāda recommends a warm cup of herbal tea instead!”',
        healthTrivia: 'Cold foods in winter freeze the gastric digestive fire (Mandāgni), producing toxic undigested metabolic waste (Āma).',
        resolvedLevels: { prthivi: 38, ap: 25, tejas: 15, vayu: 94, akasha: 50 },
      },
      {
        id: 'salad',
        title: '🥗 Cold Raw Leafy Green Salad',
        bhutaTag: 'ROUGH COLD VĀYU',
        desc: 'Raw, unheated fibrous greens requiring high metabolic energy to break down.',
        isCorrect: false,
        guruCommentary: '“Cold raw leaves in a blizzard? Your shivering joints are crying out for warm cooked broth!”',
        healthTrivia: 'Raw cold vegetables increase the rough (khara) and cold (śīta) qualities of Vāyu dosha during winter months.',
        resolvedLevels: { prthivi: 42, ap: 30, tejas: 22, vayu: 90, akasha: 50 },
      },
    ],
  },
  {
    id: 'monsoon-deluge',
    title: 'HUMID MONSOON DELUGE',
    seasonSanskrit: 'वर्षा-ऋतु (Varṣā)',
    seasonEn: 'Torrential Moisture',
    icon: '⛈️',
    themeColor: '#10b981',
    borderTint: '#059669',
    universeCrisis: 'Dense thunderclouds blanket the sky with unending torrential rains. The soil is waterlogged and ambient humidity is near 100%.',
    initialLevels: { prthivi: 55, ap: 88, tejas: 22, vayu: 45, akasha: 50 },
    statusWarning: 'Bodily Ap (Moisture/Dampness) is overloaded at 88%, choking your digestive furnace (Jaṭharāgni) into sluggish damp stagnation!',
    remedies: [
      {
        id: 'lentil-broth',
        title: '🫚 Warm Light Lentil Broth with Cumin & Black Pepper',
        bhutaTag: 'DĪPANA AGNI & MOISTURE CLEARING',
        desc: 'Pungent, light, warm spiced broth that cleanses stagnant moisture and rekindles digestive power without heaviness.',
        isCorrect: true,
        guruCommentary: '“Masterful precision! Pungent dīpana spices rekindle your digestive furnace without adding heavy damp sludge.”',
        healthTrivia: 'Monsoon humidity dampens the ambient atmosphere and lowers digestive capacity (Agni-māndya), making light, cooked, spiced foods essential.',
        resolvedLevels: { prthivi: 50, ap: 52, tejas: 52, vayu: 48, akasha: 50 },
      },
      {
        id: 'samosa',
        title: '🥟 Deep-Fried Oily Samosas & Heavy Condensed Milk',
        bhutaTag: 'HEAVY SLUGGISH KAPHA',
        desc: 'Greasy, deep-fried carbohydrates with dense heavy dairy sugars.',
        isCorrect: false,
        guruCommentary: '“Soggy mud alert! Heavy oily food in the monsoon drowns the subtle digestive spark!”',
        healthTrivia: 'Deep-fried heavy food combined with monsoon dampness creates sluggish lymphatic circulation and indigestion.',
        resolvedLevels: { prthivi: 68, ap: 95, tejas: 14, vayu: 40, akasha: 50 },
      },
      {
        id: 'iced-soda',
        title: '🧊 Chilled Aerated Soda & Ice Slushie',
        bhutaTag: 'COLD FLUID SHOCK',
        desc: 'Carbonated cold liquid that douses gastric hydrochloric enzymes.',
        isCorrect: false,
        guruCommentary: '“Extinguishing the last embers! You completely quenched your digestive furnace.”',
        healthTrivia: 'Chilled drinks constrict gastric capillaries and immediately arrest enzyme secretion.',
        resolvedLevels: { prthivi: 52, ap: 92, tejas: 16, vayu: 52, akasha: 50 },
      },
    ],
  },
  {
    id: 'autumn-windstorm',
    title: 'TURBULENT AUTUMN DUST STORM',
    seasonSanskrit: 'शरद्-ऋतु (Śarad)',
    seasonEn: 'Erratic Gale',
    icon: '🌪️',
    themeColor: '#a855f7',
    borderTint: '#9333ea',
    universeCrisis: 'Violent dry atmospheric gales whip loose dry leaves and sand across the terrain. Atmospheric pressure fluctuates wildly.',
    initialLevels: { prthivi: 30, ap: 32, tejas: 52, vayu: 92, akasha: 50 },
    statusWarning: 'Internal Vāyu (Air/Nerves) has surged to a turbulent 92%! Symptoms: Nervous hyperactivity, racing thoughts, dry skin, and muscle twitches.',
    remedies: [
      {
        id: 'abhyanga-porridge',
        title: '🫒 Warm Sesame Oil Massage (Abhyaṅga) & Warm Ghee Oatmeal',
        bhutaTag: 'SNIGDHA PṚTHIVĪ & OJAS NOURISHING',
        desc: 'Heavy, unctuous, grounding warm oil and slow-cooked whole grains that instantly anchor turbulent erratic nerve currents.',
        isCorrect: true,
        guruCommentary: '“Ah, profound soothing relief! The unctuous warmth of sesame oil and cooked grain instantly anchors erratic Vāyu.”',
        healthTrivia: 'Vāyu has the qualities of dry (rūkṣa), light (laghu), and mobile (cala). Warm unctuous oil (snigdha) is its classical Ayurvedic antidote!',
        resolvedLevels: { prthivi: 50, ap: 48, tejas: 50, vayu: 50, akasha: 50 },
      },
      {
        id: 'crackers',
        title: '🍿 Dry Raw Rice Crackers & Dry Popcorn',
        bhutaTag: 'EXCESS DRY AIR',
        desc: 'Aerated crispy snacks that have zero moisture and high surface friction.',
        isCorrect: false,
        guruCommentary: '“Rattling dry bones! Dry raw crunchies just supercharged your Vāyu storm into a hurricane!”',
        healthTrivia: 'Dry, light, cold snacks directly increase the kinetic vibration of Vāyu dosha, inducing anxiety and gas.',
        resolvedLevels: { prthivi: 28, ap: 25, tejas: 50, vayu: 98, akasha: 50 },
      },
      {
        id: 'espresso',
        title: '⚡ Double-Shot Iced Espresso & Mega Energy Drink',
        bhutaTag: 'HYPER-NERVOUS VOLTAGE',
        desc: 'Extreme caffeine stimulant that forces sympathetic nervous fight-or-flight overdrive.',
        isCorrect: false,
        guruCommentary: '“Turbulence overload! Your nerve currents just went haywire. Ground yourself with warm milk or herbal tea!”',
        healthTrivia: 'High caffeine triggers erratic autonomic discharge and deepens adrenal depletion during Vāta-aggravated seasons.',
        resolvedLevels: { prthivi: 25, ap: 22, tejas: 65, vayu: 99, akasha: 50 },
      },
    ],
  },
];

// ==========================================
// 🧠 The Three Ākāśas & Neuro-Bhūta Spectrum Data
// ==========================================
interface AkashaDimension {
  id: 'bhuta' | 'chitta' | 'chida';
  dev: string;
  iast: string;
  en: string;
  title: string;
  color: string;
  icon: string;
  plane: string;
  description: string;
  legoAnalogy: string;
  neuroSignificance: string;
}

const AKASHA_DIMENSIONS: AkashaDimension[] = [
  {
    id: 'bhuta',
    dev: 'भौताकाश',
    iast: 'Bhūtākāśa',
    en: 'Physical Space Continuum',
    title: 'The Outer Material Cosmos',
    color: '#38bdf8',
    icon: '🌌',
    plane: 'Macrocosmic Reality',
    description: 'The vast cosmological matrix that holds galaxies, tectonic plates, solar radiation, and atoms. Without this non-obstructive vacuum, no matter could occupy space or move.',
    legoAnalogy: 'The big flat green Lego baseplate on your living room floor providing the empty physical platform for every plastic brick to stand on.',
    neuroSignificance: 'Provides the spatial geometry of the physical skull, brain ventricles, and bodily organs.',
  },
  {
    id: 'chitta',
    dev: 'चित्ताकाश',
    iast: 'Chittākāśa',
    en: 'Mental Canvas / Psychological Space',
    title: 'The Inner Subjective Screen',
    color: '#c084fc',
    icon: '🧠',
    plane: 'Psychological Reality',
    description: 'The invisible expanse of your individual psyche. When you close your eyes and visualize a glowing flame or recall a childhood memory, it floats in Chittākāśa.',
    legoAnalogy: 'The mental blueprint canvas in your imagination where you design the Lego castle in your head before building it.',
    neuroSignificance: 'The synaptic space and neural bandwidth where thoughts, emotions, and memories vibrate without colliding into chaos.',
  },
  {
    id: 'chida',
    dev: 'चिदाकाश',
    iast: 'Chidākāśa',
    en: 'Pure Consciousness Continuum',
    title: 'The Transcendental Witness Screen',
    color: '#facc15',
    icon: '✨',
    plane: 'Transcendental Awareness (Sākṣī)',
    description: 'The ultimate, unmoving, non-dual cosmic awareness that supports both the material universe (Bhūtākāśa) and the individual mind (Chittākāśa).',
    legoAnalogy: 'The child playing with the Lego set—the conscious observer without whom the baseplate and blocks have no meaning.',
    neuroSignificance: 'The silent observer (Sākṣī-Caitanya) that remains awake during deep sleep and witnesses the arising and passing of thoughts.',
  },
];

interface NeuroBhutaItem {
  id: MirrorBhuta;
  dev: string;
  iast: string;
  en: string;
  icon: string;
  color: string;
  tagline: string;
  physical: {
    title: string;
    anatomy: string;
    detail: string;
  };
  physiological: {
    title: string;
    mechanism: string;
    detail: string;
  };
  mental: {
    title: string;
    faculty: string;
    detail: string;
    balanced: string;
    imbalanced: string;
  };
  sutraQuote: string;
  neuroScientificFact: string;
}

const NEURO_BHUTA_SPECTRUM: NeuroBhutaItem[] = [
  {
    id: 'akasha',
    dev: 'आकाश',
    iast: 'Ākāśa',
    en: 'Space / The Gap of Potential',
    icon: '🌌',
    color: '#6366f1',
    tagline: 'The frictionless vacuum between neurons that makes meaning possible',
    physical: {
      title: 'Brain Ventricles & Hollow Lumina',
      anatomy: 'Cranial Ventricles & Central Canal',
      detail: 'The hollow chambers inside the brain storing cerebrospinal fluid (CSF), giving buoyant room for brain tissue.',
    },
    physiological: {
      title: 'The Synaptic Cleft (20-40nm Gap)',
      mechanism: 'Microscopic Synaptic Vacuity',
      detail: 'The literal microscopic gaps between neurons. Without this open space, neurotransmitters (dopamine, serotonin) would have no room to travel.',
    },
    mental: {
      title: 'Mental Capacity & Silent Pauses',
      faculty: 'Cittākāśa (Inner Canvas)',
      detail: 'The silent pause between sentences that gives language meaning; the open cognitive bandwidth to hold thoughts without overwhelm.',
      balanced: 'Open, spacious, tranquil, uncluttered contemplation and expansive clarity.',
      imbalanced: 'Mental claustrophobia, sensory overload, and cognitive paralysis when space is constricted.',
    },
    sutraQuote: 'शब्दगुणकमाकाशम् (Śabdaguṇakamākāśam) — Sound and resonance propagate through non-obstructive space.',
    neuroScientificFact: 'Without the 20-40 nanometer synaptic cleft gap, chemical transmission would be impossible and the brain would short-circuit.',
  },
  {
    id: 'vayu',
    dev: 'वायु',
    iast: 'Vāyu',
    en: 'Air / Velocity of Thinking',
    icon: '🌬️',
    color: '#8b5cf6',
    tagline: 'The supersonic electrical kinetic currents firing through your nervous system',
    physical: {
      title: 'Axonal Fiber Pathways & Neural Highways',
      anatomy: 'Axons, Dendritic Trees & Tracts',
      detail: 'The intricate structural pathways of neural axonic networks connecting cerebral hemispheres and peripheral nerves.',
    },
    physiological: {
      title: 'Action Potentials & Nerve Impulses',
      mechanism: 'Bio-electric Voltage Influx (250 mph)',
      detail: 'Lightning-fast kinetic movement of electrical action potentials firing across synapses at speeds up to 250 mph (120 m/s).',
    },
    mental: {
      title: 'Velocity of Thought & Ideation Speed',
      faculty: 'Mano-vega & Cala-Citta',
      detail: 'The literal speed and agility of thoughts hopping from concept to concept, sparking imagination and verbal expression.',
      balanced: 'Agile creativity, quick wit, adaptable problem solving, and intuitive leaps.',
      imbalanced: 'Racing worry loops, runaway anxiety, restlessness, insomnia, and scattered attention fragmentation.',
    },
    sutraQuote: 'स्पर्शगुणो वायुः (Sparśaguṇo Vāyuḥ) — Motion and tactile electrical conduction define Vāyu.',
    neuroScientificFact: 'Action potentials travel along myelinated axons via saltatory conduction at velocities reaching 100-120 meters per second.',
  },
  {
    id: 'tejas',
    dev: 'तेजस्',
    iast: 'Tejas',
    en: 'Fire / Engine of Intellect',
    icon: '🔥',
    color: '#ea580c',
    tagline: 'The metabolic combustion furnace transforming raw data into lucid insight',
    physical: {
      title: 'Mitochondrial Cellular Furnaces',
      anatomy: 'Mitochondria & ATP Synthetase',
      detail: 'The cellular powerhouses inside neurons burning glucose and oxygen to generate adenosine triphosphate (ATP).',
    },
    physiological: {
      title: 'Metabolic Digestion & Brain Combustion',
      mechanism: '20% Glucose & Oxygen Combustion',
      detail: 'Your brain is only 2% of total body mass, yet voraciously burns over 20% of the entire body’s caloric glucose and oxygen to produce heat and electrochemical energy.',
    },
    mental: {
      title: 'Buddhi: Discriminating Intellect & Logic',
      faculty: 'Buddhi & Viveka (Cognitive Digestion)',
      detail: 'Just as fire combusts wood into ash, your mental Tejas digests raw sensory data into structured logic, critical discrimination, and lucid understanding.',
      balanced: 'Laser focus, penetrating discernment, decisive logic, and courage.',
      imbalanced: 'Hyper-critical burning sarcasm, hot-tempered impatience, intellectual arrogance, and mental burnout.',
    },
    sutraQuote: 'रूपस्पर्शवान् तेजः (Rūpasparśavān Tejaḥ) — Luminous illumination and heat define Tejas.',
    neuroScientificFact: 'Though weighing approximately 1.4 kg, the human brain consumes ~20% of resting metabolic energy—pure metabolic fire!',
  },
  {
    id: 'ap',
    dev: 'अप्',
    iast: 'Ap',
    en: 'Water / Fluid Matrix of Emotion',
    icon: '💧',
    color: '#0284c7',
    tagline: 'The hydraulic cushion and emotional adhesive binding memories together',
    physical: {
      title: 'Cerebrospinal Fluid & Cerebral Plasma',
      anatomy: 'CSF Cushion & Vascular Microcirculation',
      detail: 'The clear watery cerebrospinal fluid (150 ml) buffering the brain against concussion, alongside capillary plasma flows.',
    },
    physiological: {
      title: 'Neurotransmitter Dissolution & Saturation',
      mechanism: 'Hydraulic Chemical Bath (Serotonin / Dopamine)',
      detail: 'The aqueous medium regulating chemical saturation, allowing monoamine transmitters, neuropeptides, and hormones to dissolve and bind receptors.',
    },
    mental: {
      title: 'Empathy, Emotional Cohesion & Memory "Glue"',
      faculty: 'Bhāva, Sneha & Saṅkalpa',
      detail: 'Water is cohesive and sticky; in your psyche, Ap is the force that makes thoughts stick together to form lasting emotional memories, bonding, and empathy.',
      balanced: 'Deep compassion, emotional stability, interpersonal bonding, and rich, cohesive memory retention.',
      imbalanced: 'Emotional clinging, weeping sentimentality, grief, possessiveness, and lethargic depression.',
    },
    sutraQuote: 'रूपरसस्पर्शवत्य आपः (Rūparasasparśavatya Āpaḥ) — Fluid cohesion, coldness, and taste define Ap.',
    neuroScientificFact: 'The brain floats in ~150 ml of cerebrospinal fluid, reducing its effective gravitational weight from 1400g to just 50g!',
  },
  {
    id: 'prthivi',
    dev: 'पृथिवी',
    iast: 'Pṛthivī',
    en: 'Earth / Anchor of Sanity',
    icon: '🪨',
    color: '#d97706',
    tagline: 'The dense mineralized structure and habit grooves preventing cognitive collapse',
    physical: {
      title: 'Dense Gray Matter & Myelin Insulation',
      anatomy: 'Gray Matter Density & Myelin Sheaths',
      detail: 'Dense cortical gray matter layers and lipid-rich myelin sheaths insulating neuronal axons to prevent signal dissipation.',
    },
    physiological: {
      title: 'Phospholipid Cell Walls & Structural Blood-Brain Barrier',
      mechanism: 'Rigid Cytoskeleton & Endothelial Tight Junctions',
      detail: 'Structural cellular walls and the blood-brain barrier (BBB) that prevent your brain tissue from collapsing into a fluid pool.',
    },
    mental: {
      title: 'Mental Stability & Habit Patterns (Saṃskāras)',
      faculty: 'Dhṛti, Sthairya & Saṃskāra',
      detail: 'Earth provides the mental mass that anchors your identity, keeps you practical, calm under pressure, and stabilizes foundational habits.',
      balanced: 'Unshakeable patience, steady determination, psychological grounding, and reliable follow-through.',
      imbalanced: 'Mental stagnation, stubborn dogmatism, depression, refusal to change, and intellectual inertia (tamas).',
    },
    sutraQuote: 'रूपरसगन्धस्पर्शवती पृथिवी (Rūparasagandhasparśavatī Pṛthivī) — Solidity, smell, and structure define Pṛthivī.',
    neuroScientificFact: 'Myelin sheaths consist of 70-85% lipids, providing dense physical insulation that increases electrical conduction velocity up to 100-fold.',
  },
];

interface NeuroStateProfile {
  id: string;
  name: string;
  sanskrit: string;
  icon: string;
  themeColor: string;
  summary: string;
  levels: { akasha: number; vayu: number; tejas: number; ap: number; prthivi: number };
  brainWave: string;
  dominantBhuta: string;
  eegPattern: string;
  experience: string;
  vedicRemedy: {
    sadhana: string;
    scienceWhy: string;
    actionablePractice: string;
  };
}

const NEURO_STATE_PROFILES: NeuroStateProfile[] = [
  {
    id: 'anxiety-panic',
    name: 'Racing Anxiety & Panic',
    sanskrit: 'वात-प्रकोप चित्त-दौर्बल्य (Vāta-Prakopa)',
    icon: '🌪️',
    themeColor: '#8b5cf6',
    summary: 'High-frequency Vāyu surge causing erratically firing action potentials and fragmented attention.',
    levels: { akasha: 30, vayu: 94, tejas: 60, ap: 25, prthivi: 20 },
    brainWave: 'High Beta (22–38 Hz) Dysregulated',
    dominantBhuta: '🌬️ Vāyu (94%) — Extreme Kinetic Surge',
    eegPattern: 'Erratic, jagged high-frequency spikes with desynchronized prefrontal activity.',
    experience: 'Heart palpitating, racing worry loops, inability to sit still, catastrophizing, feeling like thoughts are running 250 mph.',
    vedicRemedy: {
      sadhana: 'Nāḍī-Śodhana & Pṛthivī Grounding (अधोमुख श्वास)',
      scienceWhy: 'Lengthened exhalations stimulate the vagus nerve (parasympathetic branch), dampening rapid action potentials and replenishing calming neurotransmitters.',
      actionablePractice: 'Inhale for 4 seconds, exhale slowly for 8 seconds. Touch bare feet to the earth to activate Pṛthivī grounding.',
    },
  },
  {
    id: 'focused-intellect',
    name: 'Laser Logic & Focused Inquiry',
    sanskrit: 'बुद्धि-दीप्ति विवेक (Buddhi-Dīpti)',
    icon: '🎯',
    themeColor: '#ea580c',
    summary: 'Optimally burning Tejas combusting raw information into crystallized insight and logical proofs.',
    levels: { akasha: 65, vayu: 45, tejas: 88, ap: 40, prthivi: 60 },
    brainWave: 'Gamma (40 Hz) Synchronized',
    dominantBhuta: '🔥 Tejas (88%) — Pure Discriminating Combustion',
    eegPattern: 'High-coherence 40 Hz Gamma oscillations binding disparate cortical networks into unified comprehension.',
    experience: 'Crisp analytical clarity, effortlessly cutting through confusion, deep intellectual stamina, and penetrating insight.',
    vedicRemedy: {
      sadhana: 'Trāṭaka (गौघृत-दीप त्राटक) & Svādhyāya',
      scienceWhy: 'Fixed focal gazing (Trāṭaka) trains ocular retinal Pitta and suppresses spontaneous default-mode-network task-unrelated thoughts.',
      actionablePractice: 'Focus steady gaze on a single point or ghee lamp flame for 2 minutes to sharpen Buddhi without burning out into anger.',
    },
  },
  {
    id: 'emotional-grief',
    name: 'Sticky Grief & Emotional Overwhelm',
    sanskrit: 'अतिस्नेह शोक (Ati-Sneha Śoka)',
    icon: '🌊',
    themeColor: '#0284c7',
    summary: 'Ap fluid flood causing excessive emotional stickiness, nostalgic rumination, and heavy attachment.',
    levels: { akasha: 25, vayu: 30, tejas: 20, ap: 92, prthivi: 55 },
    brainWave: 'High Theta (4–7 Hz) Hyper-limbic',
    dominantBhuta: '💧 Ap (92%) — Cohesive Emotional Deluge',
    eegPattern: 'Hyper-active limbic amygdala/hippocampus loop with depressed executive prefrontal control.',
    experience: 'Heavy chest, weeping, inability to let go of old memories, intense longing, and nostalgic rumination.',
    vedicRemedy: {
      sadhana: 'Bhastrikā Prāṇāyāma & Vairāgya (वैराग्य अभ्यास)',
      scienceWhy: 'Vigorous rhythmic respiration increases cellular oxygenation, elevating metabolic Tejas to evaporate sticky emotional stagnation.',
      actionablePractice: 'Do 3 rounds of 20 rapid bellows breaths (Bhastrikā) followed by holding in spacious Cittākāśa to release emotional clinging.',
    },
  },
  {
    id: 'mental-fog-inertia',
    name: 'Brain Fog & Stubborn Inertia',
    sanskrit: 'तामसिक-जडत्व (Tāmasika Jaḍatva)',
    icon: '🗿',
    themeColor: '#d97706',
    summary: 'Heavy Pṛthivī crystallization with depleted Vāyu/Tejas causing mental lethargy and cognitive rigidity.',
    levels: { akasha: 20, vayu: 18, tejas: 22, ap: 65, prthivi: 95 },
    brainWave: 'Excess Low Delta/Theta (1–4 Hz) in Waking State',
    dominantBhuta: '🪨 Pṛthivī (95%) — Dense Calcified Inertia',
    eegPattern: 'Sluggish, slow-wave dominant power distribution reflecting low synaptic plasticity and hypo-metabolism.',
    experience: 'Brain feels like wet concrete; stubborn resistance to new ideas, heavy eyelids, procrastination, and mental stagnation.',
    vedicRemedy: {
      sadhana: 'Sūrya Bhedana (सूर्य-भेदन) & Dynamic Asana',
      scienceWhy: 'Right-nostril breathing activates sympathetic solar circuits and triggers noradrenaline release to dissolve mental calcification.',
      actionablePractice: 'Block the left nostril, inhale solely through the right nostril, and engage in brisk sun salutations (Sūrya Namaskāra).',
    },
  },
  {
    id: 'meditative-spaciousness',
    name: 'Expansive Meditative Flow',
    sanskrit: 'चित्ताकाश-प्रशान्ति (Cittākāśa-Śānti)',
    icon: '✨',
    themeColor: '#6366f1',
    summary: 'Harmonious opening of Ākāśa providing boundless mental bandwidth where thoughts arise and dissolve effortlessly.',
    levels: { akasha: 96, vayu: 48, tejas: 50, ap: 50, prthivi: 52 },
    brainWave: 'Alpha-Theta Coherence (8–10 Hz) & Pure Witness',
    dominantBhuta: '🌌 Ākāśa (96%) — Boundless Mental Space',
    eegPattern: 'Global whole-brain phase synchrony with high amplitude Alpha waves radiating from occipital to frontal lobes.',
    experience: 'Deep inner stillness, ego boundary softening, thoughts seen like passing clouds against an endless blue sky, timeless peace.',
    vedicRemedy: {
      sadhana: 'Cittākāśa Dhāraṇā (चित्ताकाश-धारणा ध्यान)',
      scienceWhy: 'Deactivates the Default Mode Network (DMN), quieting the narrative "self-chatter" and expanding subjective perceptual space.',
      actionablePractice: 'Close eyes, gently turn awareness upward to the dark inner screen behind the forehead (Chittākāśa), and rest as the unmoving Witness.',
    },
  },
];

// Historical Timeline Milestones
interface TimelineNode {
  era: string;
  name: string;
  devanagari: string;
  location: string;
  method: string;
  coreIdea: string;
  insight: string;
  epistemicBridge?: {
    title: string;
    subhead: string;
    lead: string;
    bullets: { title: string; icon: string; text: string }[];
  };
}

const TIMELINE_NODES: TimelineNode[] = [
  {
    era: '~6th Century BCE',
    name: 'Sage Kaṇāda (महर्षि-कणादः)',
    devanagari: 'वैशेषिक-दर्शनम् (भारत)',
    location: 'Prabhasa, Ancient India',
    method: 'Anumāna (Logic) & Pratyakṣa (Observation)',
    coreIdea: 'Paramāṇu: Indivisible, eternal seeds uniting into Dvyaṇuka & Tryaṇuka; Pīlupāka thermal change.',
    insight: 'Kaṇāda derived the atomic threshold mathematically to avoid the infinite regress (anavasthā) fallacy. He observed sunbeam motes (trasareṇu) as the physical bridge to perception.',
    epistemicBridge: {
      title: 'The Trasareṇu: The Epistemic Bridge to Perception',
      subhead: 'Sage Kaṇāda (महर्षि-कणादः) · वैशेषिक-दर्शनम्',
      lead: 'Kaṇāda recognized that human senses cannot perceive a zero-dimensional point (Paramāṇu) or a two-dimensional linear link (Dvyaṇuka). The transition from abstract mathematics to observable physical reality requires a structural threshold:',
      bullets: [
        {
          title: 'The Leap to Magnitude (Mahatva)',
          icon: '📐',
          text: 'A single Paramāṇu has zero dimension. A Dvyaṇuka (dyad) possesses length but zero volume. Only when three dyads cluster into a triad (Tryaṇuka / Trasareṇu) does three-dimensional spatial volume suddenly emerge.',
        },
        {
          title: 'The Light-Scattering Criterion',
          icon: '☀️',
          text: 'Kaṇāda observed the microscopic dust motes dancing in shafts of sunlight passing through a lattice window. He deduced that this mote is the absolute smallest unit of visible matter.',
        },
        {
          title: 'The Modern Parallel (Rayleigh-Mie Scattering)',
          icon: '🔬',
          text: 'This is the exact physical threshold of Rayleigh and Mie Scattering. An object smaller than the wavelength of visible light cannot reflect or scatter photons; it remains invisible. The Trasareṇu represents the exact cluster size where matter finally interacts with electromagnetic waves.',
        },
        {
          title: 'The Pīlupāka Chemical Dissociation Threshold',
          icon: '🔥',
          text: 'In his famous kiln experiment (पीलुपाक-भ्राष्ट्रम्), Kaṇāda deduced that baking earthenware causes Tejas (thermal energy) to penetrate porous structures, breaking dyads into free Paramāṇus (Vibhāga), transmuting their color from unbaked grey to terracotta red, and recombining them into fresh ceramic bonds (Saṁyoga). This established the atomic theory of chemical reactions!',
        },
      ],
    },
  },
  {
    era: '~400 BCE',
    name: 'Democritus & Leucippus',
    devanagari: 'डेमोक्रिटस् (ग्रीस)',
    location: 'Abdera, Ancient Greece',
    method: 'Philosophical Materialism',
    coreIdea: 'Atomos: Mechanistic, unchangeable particles moving through an infinite void (kenon).',
    insight: 'Parallel to Kaṇāda, Democritus posited indivisible building blocks. However, Vaiśeṣika uniquely categorized elements by distinct inherent sensory guṇas (smell, taste, light, touch).',
  },
  {
    era: '~300 BCE',
    name: 'Epicurus & Lucretius',
    devanagari: 'एपिक्युरस् (रोम)',
    location: 'Athens / Rome',
    method: 'Epicurean Epistemology',
    coreIdea: 'Clinamen: Atoms falling through void with an unpredictable microscopic "swerve".',
    insight: 'Introduced atomic swerve to explain free will; Kaṇāda attributed original atomic motion to Adṛṣṭa (unseen cosmic moral-physical order).',
  },
  {
    era: '1803 CE',
    name: 'John Dalton',
    devanagari: 'जॉन डाल्टन (ब्रिटेन)',
    location: 'Manchester, England',
    method: 'Gravimetric Stoichiometry',
    coreIdea: 'Chemical Atomic Theory: Relative atomic weights and law of multiple proportions.',
    insight: 'Bridged classical atomism into experimental stoichiometry, verifying that compound elements combine in fixed whole-number ratios (mirroring Kaṇāda’s 2-atom and 3-pair arithmetic!).',
  },
  {
    era: '1897 CE',
    name: 'J.J. Thomson',
    devanagari: 'जे. जे. थॉमसन',
    location: 'Cambridge, England',
    method: 'Cathode Ray Tube Experiments',
    coreIdea: 'Electron Discovery: Revealed that atoms themselves are divisible into subatomic constituents.',
    insight: 'Proved the physical atom is not the ultimate limit, while Kaṇāda’s philosophical paramāṇu represents the concept of the irreducible fundamental quantum boundary.',
  },
  {
    era: '1911–1913 CE',
    name: 'Rutherford & Niels Bohr',
    devanagari: 'रदरफोर्ड व नील्स बोर',
    location: 'Manchester & Copenhagen',
    method: 'Alpha Particle Scattering & Quantum Spectra',
    coreIdea: 'Planetary Nuclear Atom & Quantized Energy Orbitals.',
    insight: 'Showed the atom is 99.999% empty space (Ākāśa!), with matter condensed in an ultradense central nucleus.',
  },
  {
    era: '20th Century–Present',
    name: 'S.N. Bose & Quantum Field Theory',
    devanagari: 'सत्येन्द्रनाथ बसु (बोसोन)',
    location: 'Calcutta & Modern Physics',
    method: 'Quantum Statistical Mechanics',
    coreIdea: 'Bose-Einstein Statistics & Quantum Vacuum Potential.',
    insight: 'Modern quantum fields reveal that the vacuum is not empty nothingness, but a dynamic ground state teeming with zero-point fluctuations—precisely how ancient Rishis envisioned Ākāśa.',
  },
];

// Interactive Pronounce Button with Pulse Wave Indicator

// Interactive Pronounce Button with Pulse Wave Indicator
const PronounceButton: React.FC<{
  dev: string;
  iast: string;
  activeWord: string | null;
  onPronounce: (w: string) => void;
  small?: boolean;
}> = ({ dev, iast, activeWord, onPronounce, small }) => {
  const isPlaying = activeWord === dev;
  return (
    <button
      type="button"
      className="vl-word-pronounce-btn"
      onClick={(e) => {
        e.stopPropagation();
        onPronounce(dev);
      }}
      title={`Listen to Sanskrit pronunciation of ${iast} (${dev})`}
      style={{ fontSize: small ? '0.78rem' : '0.86rem' }}
    >
      <span lang="sa" style={{ fontWeight: 700 }}>{dev}</span>
      <span style={{ fontStyle: 'italic', opacity: 0.85 }}>({iast})</span>
      {isPlaying ? (
        <span className="vl-audio-wave" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      ) : (
        <span style={{ fontSize: '0.85em', opacity: 0.7 }}>🔊</span>
      )}
    </button>
  );
};

const BhutaSort: React.FC<{ onPronounce: (w: string) => void; activeWord: string | null }> = ({ onPronounce, activeWord }) => {
  const [placed, setPlaced] = useState<Record<number, Bhuta | 'akasha'>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [msg, setMsg] = useState<string>('Tap a card, then tap the bhūta it belongs to.');
  const correct = SORT_CARDS.filter((c, i) => placed[i] === c.answer).length;

  const drop = (bin: Bhuta | 'akasha') => {
    if (selected === null) {
      setMsg('First tap a card above.');
      return;
    }
    const card = SORT_CARDS[selected];
    if (card.answer === bin) {
      setPlaced((p) => ({ ...p, [selected]: bin }));
      setMsg(`✓ ${card.why}`);
      soundEffects.playSuccessDing();
      setSelected(null);
    } else {
      setMsg(`✗ Not that one. Hint: think about the special quality (smell, taste, colour, touch, sound).`);
      playBoingSound();
    }
  };

  return (
    <section className="vl-panel" aria-label="Bhūta sorting challenge">
      <div className="vl-panel-title">
        <span aria-hidden="true">🧺</span> Bhūta Classification Challenge
        <span className="vl-score">{correct} / {SORT_CARDS.length} ✓</span>
      </div>
      <p style={{ margin: '0 0 0.65rem', fontSize: '0.82rem', color: '#94a3b8' }}>
        Identify which of the Pañca Mahābhūtas each sensory experience belongs to based on its cardinal Guṇa:
      </p>
      <div className="vl-sort-cards">
        {SORT_CARDS.map((c, i) => (
          <button
            key={c.label}
            type="button"
            disabled={placed[i] !== undefined}
            className={`vl-sort-card${selected === i ? ' is-selected' : ''}${placed[i] !== undefined ? ' is-done' : ''}`}
            onClick={() => setSelected(i)}
          >
            {c.label}
            {placed[i] !== undefined && <small> → {SORT_BINS.find((b) => b.id === placed[i])?.label}</small>}
          </button>
        ))}
      </div>
      <div className="vl-sort-bins">
        {SORT_BINS.map((b) => (
          <div key={b.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <button type="button" className="vl-sort-bin" onClick={() => drop(b.id)}>
              {b.label}
            </button>
            <PronounceButton
              dev={b.id === 'akasha' ? 'आकाश' : BHUTA_INFO[b.id].dev}
              iast={b.id === 'akasha' ? 'Ākāśa' : BHUTA_INFO[b.id].iast}
              activeWord={activeWord}
              onPronounce={onPronounce}
              small
            />
          </div>
        ))}
      </div>
      <p className="vl-sort-msg" role="status">{correct === SORT_CARDS.length ? '🎉 All sorted! Śobhanam! You master the sensory qualities (guṇas)!' : msg}</p>
    </section>
  );
};

interface CompanionDialogue {
  speaker: 'kanada' | 'bodhi';
  avatar: string;
  name: string;
  badge: string;
  badgeColor: string;
  text: string;
  sanskritQuote?: string;
}

const COMPANION_QUIPS: CompanionDialogue[] = [
  {
    speaker: 'kanada',
    avatar: '🧙‍♂️',
    name: 'महर्षि-कणाद (Sage Kaṇāda)',
    badge: 'PRIMORDIAL ATOMIC ONTOLOGY',
    badgeColor: '#f59e0b',
    text: '“Pranam! I am Kaṇāda. Long before Democritus or Dalton, single rice grains in the fields revealed to me the secret of matter: all of this cosmos—mountains, oceans, and bodies—is built of eternal, indivisible Paramāṇus! Combine identical atoms to forge a Dvyaṇuka, or test what happens when Fire and Water collide!”',
    sanskritQuote: 'नित्यं परिमण्डलं कारणवच्चाणु ॥ (Eternal, spherical, uncaused is the Paramāṇu)',
  },
  {
    speaker: 'bodhi',
    avatar: '🧘‍♀️',
    name: 'बोधि (Bodhi Guide)',
    badge: 'LAB COMPANION',
    badgeColor: '#38bdf8',
    text: '“Notice how the particles gently float in Ākāśa! In Vaiśeṣika, only identical elements can bond permanently. If you force incompatible elements together, their fundamental guṇas will trigger a comical repulsion shield! Try the action buttons below to test it out.”',
    sanskritQuote: 'यत् पिण्डे तत् ब्रह्माण्डे ॥ (As in the microcosm, so in the macrocosm)',
  },
  {
    speaker: 'kanada',
    avatar: '🧙‍♂️',
    name: 'महर्षि-कणाद (Sage Kaṇāda)',
    badge: 'EMPIRICAL DEDUCTION',
    badgeColor: '#ea580c',
    text: '“Why must an indivisible particle exist? If physical division could continue infinitely without end, a tiny mustard seed (sarṣapa) and Mount Meru would mathematically contain the exact same infinite number of parts! This logical absurdity (anavasthā) proves the absolute limit: the Paramāṇu.”',
    sanskritQuote: 'अनवस्था-प्रसङ्गात् ॥ (To avoid infinite regress fallacy)',
  },
  {
    speaker: 'bodhi',
    avatar: '🧘‍♀️',
    name: 'बोधि (Bodhi Guide)',
    badge: 'SOLAR DUST MOTE',
    badgeColor: '#eab308',
    text: '“Ever seen dust motes dancing in a beam of sunlight slicing through a dark room? In Sanskrit, that is a Trasareṇu (Tryaṇuka)—the very first threshold where microscopic atoms unite to become visible to human eyes!”',
    sanskritQuote: 'जालसूर्य-मरीचिस्थं त्रसरेणुः ॥ (Dust mote in a sunbeam)',
  },
];

const Dot: React.FC<{ x: number; y: number; b: Bhuta; r?: number }> = ({ x, y, b, r = 8 }) => {
  const info = BHUTA_INFO[b];
  return (
    <g>
      <circle cx={x} cy={y} r={r + 5} fill={info.color} opacity={0.3} className="vl-atom-pulse-ring" />
      <circle cx={x} cy={y} r={r} fill={info.color} stroke="#ffffff" strokeWidth={1.8} />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.32} fill="#ffffff" opacity={0.7} />
    </g>
  );
};

const Pair: React.FC<{ x: number; y: number; b: Bhuta }> = ({ x, y, b }) => {
  const info = BHUTA_INFO[b];
  return (
    <g>
      <line x1={x - 9} y1={y} x2={x + 9} y2={y} stroke={info.color} strokeWidth={3.5} className="vl-bond-energy" strokeLinecap="round" />
      <Dot x={x - 9} y={y} b={b} r={7} />
      <Dot x={x + 9} y={y} b={b} r={7} />
    </g>
  );
};

const ItemShape: React.FC<{ it: Item; isSunbeamOn: boolean }> = ({ it, isSunbeamOn }) => {
  const info = BHUTA_INFO[it.bhuta];
  if (it.kind === 'p') {
    return (
      <g>
        {/* Soft Quantum Valence Aura */}
        <circle cx={it.x} cy={it.y} r={22} fill={info.soft} opacity={0.4} className="vl-atom-pulse-ring" />
        <circle cx={it.x} cy={it.y} r={15} fill={info.soft} opacity={0.8} />
        <Dot x={it.x} y={it.y} b={it.bhuta} r={8.5} />
        <text x={it.x} y={it.y + 24} textAnchor="middle" className="vl-svg-small" fill={info.color} fontWeight="800">
          {info.icon}
        </text>
      </g>
    );
  }
  if (it.kind === 'd') {
    if (it.n === 1) {
      return (
        <g>
          <ellipse cx={it.x} cy={it.y} rx={32} ry={20} fill={info.soft} opacity={0.85} stroke={info.color} strokeWidth={1.5} />
          <Pair x={it.x} y={it.y} b={it.bhuta} />
          <text x={it.x} y={it.y + 32} textAnchor="middle" className="vl-svg-small" fontWeight="700" fill="#f8fafc">
            द्व्यणुक (dvyaṇuka)
          </text>
        </g>
      );
    }
    return (
      <g>
        <circle cx={it.x} cy={it.y} r={36} fill={info.soft} opacity={0.85} stroke={info.color} strokeWidth={2} strokeDasharray="4 4" />
        <Pair x={it.x} y={it.y - 11} b={it.bhuta} />
        <Pair x={it.x} y={it.y + 11} b={it.bhuta} />
        <text x={it.x} y={it.y + 48} textAnchor="middle" className="vl-svg-small" fontWeight="700" fill="#facc15">
          2 dvyaṇukas (+1 needed)
        </text>
      </g>
    );
  }
  // Tryaṇuka / Trasareṇu
  return (
    <g>
      <circle cx={it.x} cy={it.y} r={58} fill="url(#vl-mote)" opacity={isSunbeamOn ? 0.95 : 0.7} className="vl-atom-pulse-ring" />
      <polygon
        points={`${it.x},${it.y - 28} ${it.x - 24},${it.y + 18} ${it.x + 24},${it.y + 18}`}
        fill="none"
        stroke={info.color}
        strokeWidth={2.5}
        strokeDasharray="4 2"
        opacity={0.8}
      />
      <circle cx={it.x} cy={it.y} r={42} fill={info.soft} stroke={info.color} strokeWidth={isSunbeamOn ? 3.5 : 2} />
      <Pair x={it.x} y={it.y - 16} b={it.bhuta} />
      <Pair x={it.x - 18} y={it.y + 12} b={it.bhuta} />
      <Pair x={it.x + 18} y={it.y + 12} b={it.bhuta} />
      <text x={it.x} y={it.y + 60} textAnchor="middle" className="vl-svg-label" fontWeight="900" fill="#fde047">
        ✨ त्र्यणुक (tryaṇuka)
      </text>
      {isSunbeamOn && (
        <text x={it.x} y={it.y - 48} textAnchor="middle" fill="#fde047" fontSize={11} fontWeight={900}>
          ☀️ त्रसरेणु (glinting in sunbeam!)
        </text>
      )}
    </g>
  );
};

let nextId = 1;

const randomSpot = () => ({
  x: TRAY_W + 50 + Math.random() * (W - TRAY_W - 100),
  y: 60 + Math.random() * (H - 120),
});

export type ParamanuSector = 'game' | 'biocosmic' | 'pilupaka' | 'padarthas' | 'history' | 'quiz';

export type ParamanuModuleId =
  | 'akasa_sutra'
  | 'guna_matrix'
  | 'sandbox'
  | 'pilupaka'
  | 'padarthas'
  | 'biocosmic'
  | 'history'
  | 'quiz';

export type ModuleCategory = 'all' | 'labs' | 'philosophy' | 'mastery';

export interface ModuleItem {
  id: ParamanuModuleId;
  order: number;
  category: 'labs' | 'philosophy' | 'mastery';
  categoryTitle: string;
  categoryIcon: string;
  icon: string;
  title: string;
  sanskrit: string;
  badge: string;
  subtitle: string;
  description: string;
}

export const PARAMANU_MODULES: ModuleItem[] = [
  {
    id: 'akasa_sutra',
    order: 1,
    category: 'labs',
    categoryTitle: 'Interactive Labs',
    categoryIcon: '🎮',
    icon: '🏺',
    title: 'Potter’s Wheel Quest',
    sanskrit: 'कुलाल-चक्रम्',
    badge: 'Main Quest',
    subtitle: 'Atomic Genesis ➔ Potter’s Wheel',
    description: 'Stage 1–4 atomic genesis of 4 corporeal Tryaṇukas ➔ Sage Kaṇāda’s Potter’s Wheel ➔ All-pervading Space revelation.',
  },
  {
    id: 'guna_matrix',
    order: 2,
    category: 'labs',
    categoryTitle: 'Interactive Labs',
    categoryIcon: '🎮',
    icon: '🧪',
    title: 'Dynamic Guṇa Matrix',
    sanskrit: 'द्रव्य-गुण-सङ्ग्रहः',
    badge: 'Quality Dynamics',
    subtitle: 'States Are an Illusion',
    description: 'Explore why solid, liquid, and gas are not rigid modern phases, but fluid combinations of Sneha, Dravatva, and Uṣṇa qualities.',
  },
  {
    id: 'pilupaka',
    order: 3,
    category: 'philosophy',
    categoryTitle: 'Science & Philosophy',
    categoryIcon: '🏛️',
    icon: '🔥',
    title: 'Pīlupāka Oven',
    sanskrit: 'पीलुपाक-भ्राष्ट्रम्',
    badge: 'Chemical Heat',
    subtitle: 'Atomic Kiln Transformation',
    description: 'Kaṇāda’s theory of chemical transformation: how thermal energy dissociates bonds to bake clay into ringing ceramic.',
  },
  {
    id: 'history',
    order: 4,
    category: 'philosophy',
    categoryTitle: 'Science & Philosophy',
    categoryIcon: '🏛️',
    icon: '📜',
    title: 'History of Atomism',
    sanskrit: 'परमाणु-इतिहासः',
    badge: 'Timeline',
    subtitle: 'Kaṇāda to Quantum Theory',
    description: 'Trace 2,600 years of atomic thought comparing Sage Kaṇāda (6th c. BCE) with Greek atomism, Dalton, Rutherford, and quantum field theory.',
  },
  {
    id: 'padarthas',
    order: 5,
    category: 'philosophy',
    categoryTitle: 'Science & Philosophy',
    categoryIcon: '🏛️',
    icon: '🏛️',
    title: 'Six Padārthas',
    sanskrit: 'षट्-पदार्थाः',
    badge: 'Ontology',
    subtitle: 'Categories of Reality',
    description: 'The 6 fundamental categories of Indian naturalism: Dravya (Substance), Guṇa (Quality), Karma (Action), Sāmānya, Viśeṣa, and Samavāya.',
  },
  {
    id: 'biocosmic',
    order: 6,
    category: 'philosophy',
    categoryTitle: 'Science & Philosophy',
    categoryIcon: '🏛️',
    icon: '🪞',
    title: 'Bio-Cosmic Mirror',
    sanskrit: 'पिण्ड-ब्रह्माण्ड-सम्बन्धः',
    badge: 'Body & Mind',
    subtitle: 'Microcosm & Macrocosm',
    description: '“यत् पिण्डे तद् ब्रह्माण्डे” — connecting the 5 laboratory elements to human sense organs (Indriyas), body tissues, and Ayurvedic Tridoṣas.',
  },
  {
    id: 'quiz',
    order: 7,
    category: 'mastery',
    categoryTitle: 'History & Mastery',
    categoryIcon: '📜',
    icon: '🎯',
    title: 'Quizzes & Terms',
    sanskrit: 'ज्ञान-परीक्षा',
    badge: 'Challenges',
    subtitle: 'Glossary & Mastery Tests',
    description: 'Interactive vocabulary flashcards, elemental sorting challenges, and formula mastery quizzes to solidify your knowledge.',
  },
];

export const ParamanuBuilder: React.FC<LabSegmentProps> = ({ onNextLab }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [items, setItemsState] = useState<Item[]>([]);
  const itemsRef = useRef<Item[]>([]);
  const commit = (list: Item[]) => {
    itemsRef.current = list;
    setItemsState(list);
  };
  const setItems = (fn: (list: Item[]) => Item[]) => commit(fn(itemsRef.current));

  // Sector Tab Navigation & Mobile Touch States
  const [activeSector, setActiveSector] = useState<ParamanuSector>('game');
  const [historySubView, setHistorySubView] = useState<'timeline' | 'pilupaka_lab' | 'comparative'>('timeline');
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [hasClaimedVictory, setHasClaimedVictory] = useState<boolean>(false);
  const [selectedForFusion, setSelectedForFusion] = useState<number | null>(null);
  const [gameSubMode, setGameSubMode] = useState<'akasa_sutra' | 'guna_matrix' | 'sandbox'>('akasa_sutra');
  const [selectedCategory, setSelectedCategory] = useState<ModuleCategory>('all');

  const activeModuleId: ParamanuModuleId =
    activeSector === 'game'
      ? gameSubMode
      : activeSector;

  const activeModule = PARAMANU_MODULES.find((m) => m.id === activeModuleId) || PARAMANU_MODULES[0];

  const handleSelectModule = (modId: ParamanuModuleId) => {
    if (modId === 'akasa_sutra' || modId === 'guna_matrix') {
      setActiveSector('game');
      setGameSubMode(modId);
    } else if (modId === 'sandbox') {
      setActiveSector('game');
      setGameSubMode('akasa_sutra');
    } else {
      setActiveSector(modId);
    }
    setTimeout(() => {
      const target = document.getElementById('akasa-start-game-anchor') || document.querySelector('.vl-lab-hub');
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleTourNav = (direction: 'prev' | 'next') => {
    const currentIdx = PARAMANU_MODULES.findIndex((m) => m.id === activeModuleId);
    if (direction === 'prev' && currentIdx > 0) {
      handleSelectModule(PARAMANU_MODULES[currentIdx - 1].id);
    } else if (direction === 'next' && currentIdx < PARAMANU_MODULES.length - 1) {
      handleSelectModule(PARAMANU_MODULES[currentIdx + 1].id);
    }
  };

  const displayedModules =
    selectedCategory === 'all'
      ? PARAMANU_MODULES
      : PARAMANU_MODULES.filter((m) => m.category === selectedCategory);

  const [msg, setMsg] = useState('Drag or tap a paramāṇu. Pair it with another of the same bhūta to forge a dvyaṇuka!');
  const [activeAudioWord, setActiveAudioWord] = useState<string | null>(null);
  const [isSunbeamOn, setIsSunbeamOn] = useState<boolean>(true);
  const [isEtherAlive, setIsEtherAlive] = useState<boolean>(true);

  // Fusion & Collision Visual FX
  const [fusions, setFusions] = useState<FusionBurst[]>([]);
  const [clashes, setClashes] = useState<ClashBurst[]>([]);

  // Live Companion Dialogue State
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [dialogue, setDialogue] = useState<CompanionDialogue>(COMPANION_QUIPS[0]);
  const [soundOn, setSoundOn] = useState<boolean>(true);

  // Comedic Guru Quip Balloon (Unified In-Frame)
  const [guruQuip, setGuruQuip] = useState<{ quote: string; attempt: number; mood: 'wry' | 'shocked' | 'philosophical' } | null>(null);
  const clashAttemptCounts = useRef<Record<string, number>>({});

  // Macro Bhoota Reconstructor State
  const [selectedMacroTarget, setSelectedMacroTarget] = useState<Bhuta>('prthivi');
  const [macroTryanukaStock, setMacroTryanukaStock] = useState<Record<Bhuta, number>>({
    prthivi: 0,
    ap: 0,
    tejas: 0,
    vayu: 0,
  });
  const [macroUnlocked, setMacroUnlocked] = useState<Record<Bhuta, boolean>>({
    prthivi: false,
    ap: false,
    tejas: false,
    vayu: false,
  });

  // Timeline Slider State
  const [activeTimelineIndex, setActiveTimelineIndex] = useState<number>(0);

  // Cosmic Mirror Link State
  const [selectedMirrorBhuta, setSelectedMirrorBhuta] = useState<MirrorBhuta>('prthivi');

  // Bio-Cosmic Balancer Game State
  const [balancerScenarioIndex, setBalancerScenarioIndex] = useState<number>(0);
  const [currentBioLevels, setCurrentBioLevels] = useState<{ prthivi: number; ap: number; tejas: number; vayu: number; akasha: number }>(
    BALANCER_SCENARIOS[0].initialLevels,
  );
  const [balancerScore, setBalancerScore] = useState<number>(0);
  const [balancerStreak, setBalancerStreak] = useState<number>(0);
  const [balancerFeedback, setBalancerFeedback] = useState<{
    status: 'success' | 'fail';
    msg: string;
    trivia?: string;
  } | null>(null);

  // Macro-Micro Bridge State
  const [selectedBridgeEnv, setSelectedBridgeEnv] = useState<string>('lightning-storm');

  // Neuro-Bhūta Matrix & Three Ākāśas State
  const [activeAkashaDim, setActiveAkashaDim] = useState<'bhuta' | 'chitta' | 'chida'>('chitta');
  const [selectedNeuroBhuta, setSelectedNeuroBhuta] = useState<MirrorBhuta>('vayu');
  const [selectedNeuroState, setSelectedNeuroState] = useState<string>('anxiety-panic');

  const handleApplyRemedy = (remedy: BalancerRemedy) => {
    if (remedy.isCorrect) {
      soundEffects.playCelebrationChime();
      setCurrentBioLevels(remedy.resolvedLevels);
      setBalancerScore((s) => s + 10);
      setBalancerStreak((st) => st + 1);
      setBalancerFeedback({
        status: 'success',
        msg: remedy.guruCommentary,
        trivia: remedy.healthTrivia,
      });
    } else {
      playBoingSound();
      setBalancerStreak(0);
      setBalancerFeedback({
        status: 'fail',
        msg: remedy.guruCommentary,
      });
    }
  };

  const advanceToNextScenario = () => {
    const nextIdx = (balancerScenarioIndex + 1) % BALANCER_SCENARIOS.length;
    setBalancerScenarioIndex(nextIdx);
    setCurrentBioLevels(BALANCER_SCENARIOS[nextIdx].initialLevels);
    setBalancerFeedback(null);
  };

  // Pīlupāka Chemical Transformation State
  const [agniHeat, setAgniHeat] = useState<number>(35);
  const [isBaking, setIsBaking] = useState<boolean>(false);

  const drag = useRef<{ id: number; dx: number; dy: number; fromTray: boolean; moved: boolean } | null>(null);

  const pt = (e: React.PointerEvent) => localPoint(svgRef.current!, e.clientX, e.clientY, W, H);

  // Audio Pronunciation Trigger
  const handlePronounce = (word: string) => {
    setActiveAudioWord(word);
    playPronunciation(word);
    setTimeout(() => {
      setActiveAudioWord((cur) => (cur === word ? null : cur));
    }, 1800);
  };

  const startTray = (b: Bhuta, e: React.PointerEvent) => {
    e.preventDefault();
    soundEffects.playElementSummon(b);
    const p = pt(e);
    const id = nextId++;
    setItems((list) => [...list, { id, kind: 'p', bhuta: b, x: p.x, y: p.y, n: 1 }]);
    drag.current = { id, dx: 0, dy: 0, fromTray: true, moved: false };
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  const startItem = (it: Item, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const p = pt(e);
    drag.current = { id: it.id, dx: it.x - p.x, dy: it.y - p.y, fromTray: false, moved: false };
    svgRef.current?.setPointerCapture(e.pointerId);
    // Bring dragged item to front
    setItems((list) => [...list.filter((i) => i.id !== it.id), it]);
  };

  // Dodging / Side-Stepping logic during drag: incompatible particles tremble or dodge away
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const p = pt(e);
    d.moved = true;
    const newX = Math.max(14, Math.min(W - 14, p.x + d.dx));
    const newY = Math.max(14, Math.min(H - 14, p.y + d.dy));

    setItems((list) => {
      const draggedItem = list.find((i) => i.id === d.id);
      return list.map((i) => {
        if (i.id === d.id) {
          return { ...i, x: newX, y: newY, dodgeOffsetX: 0, dodgeOffsetY: 0 };
        }
        // If an incompatible particle is nearby, apply a subtle nervous dodge offset
        if (draggedItem && i.bhuta !== draggedItem.bhuta) {
          const dist = Math.hypot(i.x - newX, i.y - newY);
          if (dist < 64) {
            const angle = Math.atan2(i.y - newY, i.x - newX);
            const dodgeMag = Math.max(0, 20 * (1 - dist / 64));
            return {
              ...i,
              dodgeOffsetX: Math.cos(angle) * dodgeMag,
              dodgeOffsetY: Math.sin(angle) * dodgeMag,
            };
          }
        }
        return { ...i, dodgeOffsetX: 0, dodgeOffsetY: 0 };
      });
    });
  };

  // Spawn Fusion Collision Particle Burst
  const triggerFusionFX = (x: number, y: number, color: string, kind: 'd' | 't') => {
    const fid = Date.now() + Math.random();
    setFusions((f) => [...f, { id: fid, x, y, color, kind }]);
    soundEffects.playPuzzleSnap();
    if (kind === 't') {
      soundEffects.playSuccessDing();
    }
    setTimeout(() => {
      setFusions((f) => f.filter((item) => item.id !== fid));
    }, 750);
  };

  // Trigger Incompatible Clash Rejection
  const triggerClashFX = (a: Item, b: Item) => {
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    const pairKey = [a.bhuta, b.bhuta].sort().join('+');
    const prevAttempts = clashAttemptCounts.current[pairKey] || 0;
    const currentAttempt = prevAttempts + 1;
    clashAttemptCounts.current[pairKey] = currentAttempt;

    let clashType: 'steam' | 'dust' | 'suffocate' | 'humidity' = 'steam';
    let bannerTitle = '♨️ STEAM BARRIER POPPED!';
    let bannerSubtitle = 'Psssshhhh! Hot and cold cancel out!';
    let quote = FUNNY_GURU_QUOTES[0];

    if ((a.bhuta === 'tejas' && b.bhuta === 'ap') || (a.bhuta === 'ap' && b.bhuta === 'tejas')) {
      clashType = 'steam';
      bannerTitle = '♨️ PSSSHHH! STEAM SHIELD DETONATED!';
      bannerSubtitle = 'Tejas (Hot) and Ap (Cold) violently counteract each other!';
      if (currentAttempt === 1) {
        quote = '“Apas is cold, Tejas is hot! You are triggering existential chaos in the lab!”';
      } else if (currentAttempt === 2) {
        quote = '“Stop trying to forge that dyad. Even the unseen cosmic power (Adṛṣṭa) is judging this move.”';
      } else {
        quote = '“Rejection! Your input particles have filed an official containment order against each other!”';
      }
      playSteamHiss();
      playBoingSound();
    } else if ((a.bhuta === 'vayu' && b.bhuta === 'prthivi') || (a.bhuta === 'prthivi' && b.bhuta === 'vayu')) {
      clashType = 'dust';
      bannerTitle = '🌪️ DUST STORM FORCEFIELD!';
      bannerSubtitle = 'Supersonic wind meets immovable mountain rock!';
      quote = currentAttempt % 2 === 1
        ? '“You’re trying to mix active wind velocity with heavy mountain rock. You just made a minor cosmic dust storm. Try again!”'
        : '“Vāyu wants to travel at supersonic speeds, but Pṛthivī just wants to take a nap. They are ignoring each other.”';
      playBoingSound();
    } else if ((a.bhuta === 'tejas' && b.bhuta === 'prthivi') || (a.bhuta === 'prthivi' && b.bhuta === 'tejas')) {
      clashType = 'suffocate';
      bannerTitle = '🪨 FLAME SMOTHERED!';
      bannerSubtitle = 'Dirt dumped directly on active flame!';
      quote = '“You just dumped a pile of dirt directly onto an active flame. Congratulations, you suffocated the fire. Kaṇāda is not impressed.”';
      playBoingSound();
    } else if ((a.bhuta === 'vayu' && b.bhuta === 'ap') || (a.bhuta === 'ap' && b.bhuta === 'vayu')) {
      clashType = 'humidity';
      bannerTitle = '💨 INVISIBLE HUMIDITY CLOUD!';
      bannerSubtitle = 'Dry air evaporates liquid layers!';
      quote = '“Vāyu’s dryness is aggressively drinking up Ap’s moisture layers. You’re making invisible humidity, not a stable molecule!”';
      playSteamHiss();
      playBoingSound();
    } else {
      // Water + Earth
      bannerTitle = '🥣 MUD PUDDLE COLLAPSE!';
      bannerSubtitle = 'Unbalanced liquid dissolves solid structural integrity!';
      quote = '“Careful! Too much Ap and your stable Pṛthivī layer turns into a soggy mud puddle. The Rishis did not authorize mud pies today.”';
      playBoingSound();
    }

    const cid = Date.now() + Math.random();
    setClashes((c) => [
      ...c,
      {
        id: cid,
        x: midX,
        y: midY,
        title: bannerTitle,
        subtitle: bannerSubtitle,
        color: BHUTA_INFO[a.bhuta].color,
        type: clashType,
      },
    ]);

    setTimeout(() => {
      setClashes((c) => c.filter((item) => item.id !== cid));
    }, 1400);

    setGuruQuip({
      quote,
      attempt: currentAttempt,
      mood: currentAttempt > 2 ? 'shocked' : 'wry',
    });

    setDialogue({
      speaker: 'kanada',
      avatar: currentAttempt > 2 ? '😲' : '🧙‍♂️',
      name: 'महर्षि-कणाद (Sage Kaṇāda)',
      badge: '⚡ INCOMPATIBLE GUṆA REJECTION',
      badgeColor: '#f43f5e',
      text: quote,
      sanskritQuote: 'अदृष्ट-विरोधात् ॥ (Repelled by inherent natural law)',
    });
  };

  const tryJoin = (list: Item[], a: Item): { list: Item[]; msg: string } => {
    let best: Item | null = null;
    let bestD = Infinity;
    for (const b of list) {
      if (b.id === a.id) continue;
      const dist = Math.hypot(b.x - a.x, b.y - a.y);
      const reach = JOIN_DIST + 12 + (b.kind === 'p' ? 0 : b.kind === 'd' ? 10 : 20);
      if (dist < reach && dist < bestD) {
        best = b;
        bestD = dist;
      }
    }
    if (!best) return { list, msg: '' };
    const b = best;

    // Incompatible Elements: Trampoline bounce recoil + steam/dust clash!
    if (a.bhuta !== b.bhuta) {
      triggerClashFX(a, b);
      // Aggressively bounce both particles away to opposite sides (110px push)
      const angle = Math.atan2(a.y - b.y, a.x - b.x);
      const push = 110;
      return {
        list: list.map((i) => {
          if (i.id === a.id) {
            return {
              ...i,
              x: Math.max(TRAY_W + 20, Math.min(W - 20, a.x + Math.cos(angle) * push)),
              y: Math.max(20, Math.min(H - 20, a.y + Math.sin(angle) * push)),
            };
          }
          if (i.id === b.id) {
            return {
              ...i,
              x: Math.max(TRAY_W + 20, Math.min(W - 20, b.x - Math.cos(angle) * push)),
              y: Math.max(20, Math.min(H - 20, b.y - Math.sin(angle) * push)),
            };
          }
          return i;
        }),
        msg: `⚡ Element Clash: ${BHUTA_INFO[a.bhuta].iast} and ${BHUTA_INFO[b.bhuta].iast} have irreconcilable fundamental guṇas and violently repelled!`,
      };
    }

    const nudge = (m: string) => ({
      list: list.map((i) => (i.id === a.id ? { ...i, x: Math.min(W - 20, a.x + 46), y: Math.min(H - 20, a.y + 20) } : i)),
      msg: m,
    });

    if (a.kind === 't' || b.kind === 't') {
      return nudge('A tryaṇuka is already the first visible threshold! It can now be channeled into the Bhoota Reconstructor below.');
    }
    if (a.kind !== b.kind) {
      return nudge('Paramāṇus pair with paramāṇus into dvyaṇukas. Dvyaṇukas bind with dvyaṇukas into tryaṇukas.');
    }

    const rest = list.filter((i) => i.id !== a.id && i.id !== b.id);
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;

    if (a.kind === 'p') {
      triggerFusionFX(mx, my, BHUTA_INFO[a.bhuta].color, 'd');
      setDialogue({
        speaker: 'bodhi',
        avatar: '🧘‍♀️',
        name: 'बोधि (Bodhi Guide)',
        badge: 'द्व्यणुक (DVYAṆUKA) FORGED',
        badgeColor: '#10b981',
        text: `“Aha! Two ${BHUTA_INFO[a.bhuta].iast} Paramāṇus locked into a Dvyaṇuka (द्व्यणुकम्). Notice that it is still completely imperceptible to human eyes—you need 3 Dvyaṇukas (6 Aṇu units [अणवः]) to make a visible Tryaṇuka!”`,
        sanskritQuote: 'द्वाभ्याम् अणुभ्याम् द्व्यणुकम् ॥ (Two Paramāṇus form a Dvyaṇuka)',
      });
      return {
        list: [...rest, { id: nextId++, kind: 'd', bhuta: a.bhuta, x: mx, y: my, n: 1 }],
        msg: `✨ Snap! Two ${BHUTA_INFO[a.bhuta].iast} Paramāṇus fused into a Dvyaṇuka (द्व्यणुकम्). Still imperceptible to human eyes!`,
      };
    }

    const total = a.n + b.n;
    if (total === 2) {
      triggerFusionFX(mx, my, BHUTA_INFO[a.bhuta].color, 'd');
      setDialogue({
        speaker: 'bodhi',
        avatar: '🧘‍♀️',
        name: 'बोधि (Bodhi Guide)',
        badge: '2 DVYAṆUKAS BOUND',
        badgeColor: '#38bdf8',
        text: '“Two Dvyaṇukas [द्व्यणुके] are bound together! Bring just 1 more Dvyaṇuka (2 more Paramāṇus) to reach the visible Tryaṇuka / Trasareṇu threshold!”',
        sanskritQuote: 'त्र्यणुकस्य निर्माणे द्व्यणुक-त्रयम् ॥',
      });
      return {
        list: [...rest, { id: nextId++, kind: 'd', bhuta: a.bhuta, x: mx, y: my, n: 2 }],
        msg: 'Two Dvyaṇukas are bound together. Bring 1 more Dvyaṇuka to reach the visible Tryaṇuka threshold.',
      };
    }
    if (total === 3) {
      triggerFusionFX(mx, my, BHUTA_INFO[a.bhuta].color, 't');
      soundEffects.playTrasarenuChime();
      // Also credit stock to the Bhoota Reconstructor
      setMacroTryanukaStock((prev) => ({
        ...prev,
        [a.bhuta]: Math.min(3, prev[a.bhuta] + 1),
      }));
      setDialogue({
        speaker: 'kanada',
        avatar: '✨',
        name: 'महर्षि-कणाद (Sage Kaṇāda)',
        badge: '☀️ TRASAREṆU VISIBLE THRESHOLD',
        badgeColor: '#facc15',
        text: `“Śobhanam! Three Dvyaṇukas (6 Aṇu units [अणवः]) united into a Tryaṇuka / Trasareṇu (त्रसरेणु)! Like a sunbeam dust mote, this crosses the threshold of physical visibility!”`,
        sanskritQuote: 'जालसूर्य-मरीचिस्थं त्रसरेणुः ॥ (Visible threshold in the sunbeam)',
      });
      return {
        list: [...rest, { id: nextId++, kind: 't', bhuta: a.bhuta, x: mx, y: my, n: 3 }],
        msg: `🎉 Splendid! Three Dvyaṇukas united into a Tryaṇuka / Trasareṇu (त्रसरेणु)! Like a sunbeam dust mote, this reaches physical visibility!`,
      };
    }
    return nudge('Three Dvyaṇukas make a Tryaṇuka. Bring an individual Dvyaṇuka.');
  };

  const handleTapItem = (target: Item) => {
    if (selectedForFusion === null) {
      setSelectedForFusion(target.id);
      soundEffects.playStrokeChime();
      setMsg(`⚡ Selected ${BHUTA_INFO[target.bhuta].iast} atom! Tap another identical atom to fuse into a Dvyaṇuka, or an incompatible atom to test clash!`);
      return;
    }
    if (selectedForFusion === target.id) {
      setSelectedForFusion(null);
      setMsg('Deselected atom.');
      return;
    }
    const first = itemsRef.current.find((i) => i.id === selectedForFusion);
    setSelectedForFusion(null);
    if (!first) return;

    // Join / Clash first with target
    const res = tryJoin(itemsRef.current, { ...first, x: target.x, y: target.y });
    if (res.msg) setMsg(res.msg);
    commit(res.list);
  };

  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const list = itemsRef.current;
    const cur = list.find((i) => i.id === d.id);
    if (!cur) return;

    // Detect single tap/touch without dragging (for effortless mobile touch play)
    if (!d.moved && !d.fromTray) {
      handleTapItem(cur);
      return;
    }

    if (cur.x < TRAY_W) {
      const placed = { ...cur, ...randomSpot(), dodgeOffsetX: 0, dodgeOffsetY: 0 };
      commit(list.map((i) => (i.id === d.id ? placed : i)));
      setMsg(`A ${BHUTA_INFO[cur.bhuta].iast} paramāṇu is now in the sky. Combine it with another identical atom.`);
      return;
    }
    const res = tryJoin(list, cur);
    if (res.msg) setMsg(res.msg);
    commit(res.list);
  };

  const addOne = (b: Bhuta) => {
    soundEffects.playElementSummon(b);
    let spot = randomSpot();
    for (let k = 0; k < 30; k += 1) {
      const c = randomSpot();
      if (itemsRef.current.every((i) => Math.hypot(i.x - c.x, i.y - c.y) > 70)) {
        spot = c;
        break;
      }
    }
    commit([...itemsRef.current, { id: nextId++, kind: 'p', bhuta: b, ...spot, n: 1 }]);
    setDialogue({
      speaker: 'kanada',
      avatar: '🧙‍♂️',
      name: 'महर्षि-कणाद (Sage Kaṇāda)',
      badge: `${BHUTA_INFO[b].dev} SUMMONED`,
      badgeColor: BHUTA_INFO[b].color,
      text: `“You summoned a primordial ${BHUTA_INFO[b].iast.toUpperCase()} atom into Ākāśa! Its sensory quality (guṇa) is ${BHUTA_INFO[b].gunaDev}. Pair it with another identical atom to forge a Dvyaṇuka.”`,
      sanskritQuote: `${BHUTA_INFO[b].dev} : ${BHUTA_INFO[b].gunaDev}`,
    });
    setMsg(`A magnified ${BHUTA_INFO[b].iast} paramāṇu placed in Ākāśa. Drag it onto another to bind.`);
  };

  const demoJoin = () => {
    let spot = randomSpot();
    for (let k = 0; k < 30; k += 1) {
      const c = randomSpot();
      if (itemsRef.current.every((i) => Math.hypot(i.x - c.x, i.y - c.y) > 90)) {
        spot = c;
        break;
      }
    }
    const a: Item = { id: nextId++, kind: 'p', bhuta: 'prthivi', x: spot.x - 8, y: spot.y, n: 1 };
    const b: Item = { id: nextId++, kind: 'p', bhuta: 'prthivi', x: spot.x + 8, y: spot.y + 2, n: 1 };
    const res = tryJoin([...itemsRef.current, a, b], b);
    commit(res.list);
  };

  const cycleNextDialogue = () => {
    const nextIdx = (dialogueIndex + 1) % COMPANION_QUIPS.length;
    setDialogueIndex(nextIdx);
    setDialogue(COMPANION_QUIPS[nextIdx]);
    soundEffects.playStrokeChime();
  };

  const triggerDemoClash = () => {
    const cx = TRAY_W + (W - TRAY_W) / 2;
    const cy = H / 2;
    const itemFire: Item = { id: nextId++, kind: 'p', bhuta: 'tejas', x: cx - 20, y: cy, n: 1 };
    const itemWater: Item = { id: nextId++, kind: 'p', bhuta: 'ap', x: cx + 20, y: cy, n: 1 };
    const listWithBoth = [...itemsRef.current, itemFire, itemWater];
    const res = tryJoin(listWithBoth, itemWater);
    commit(res.list);
    if (res.msg) setMsg(res.msg);
  };

  const quickJoinDvyanuka = (b: Bhuta = 'prthivi') => {
    soundEffects.playElementSummon(b);
    const cx = TRAY_W + 60 + Math.random() * (W - TRAY_W - 140);
    const cy = 80 + Math.random() * (H - 160);
    const a: Item = { id: nextId++, kind: 'p', bhuta: b, x: cx - 12, y: cy, n: 1 };
    const bItem: Item = { id: nextId++, kind: 'p', bhuta: b, x: cx + 12, y: cy, n: 1 };
    const res = tryJoin([...itemsRef.current, a, bItem], bItem);
    commit(res.list);
    if (res.msg) setMsg(res.msg);
  };

  const forgeTryanukaInSunbeam = (b: Bhuta = 'tejas') => {
    const sx = Math.min(W - 80, Math.max(TRAY_W + 100, W - 160 + (Math.random() * 60 - 30)));
    const sy = 120 + Math.random() * 100;
    const tryanukaItem: Item = { id: nextId++, kind: 't', bhuta: b, x: sx, y: sy, n: 3 };
    commit([...itemsRef.current, tryanukaItem]);
    triggerFusionFX(sx, sy, BHUTA_INFO[b].color, 't');
    soundEffects.playTrasarenuChime();
    setMacroTryanukaStock((prev) => ({
      ...prev,
      [b]: Math.min(3, prev[b] + 1),
    }));
    setDialogue({
      speaker: 'kanada',
      avatar: '✨',
      name: 'महर्षि-कणाद (Sage Kaṇāda)',
      badge: '☀️ TRASAREṆU IN SUNBEAM',
      badgeColor: '#facc15',
      text: `“Marvelous! Look at the ${BHUTA_INFO[b].iast.toUpperCase()} Trasareṇu (त्रसरेणु) dancing in the sunbeam! Six atoms (3 dyads) united, crossing from imperceptible to visible matter!”`,
      sanskritQuote: 'जालसूर्य-मरीचिस्थं त्रसरेणुः ॥ (Dust mote in a sunbeam)',
    });
    setMsg(`☀️ Splendid! A ${BHUTA_INFO[b].iast} Tryaṇuka / Trasareṇu (त्रसरेणु) is dancing in the sunbeam!`);
  };

  const testFunnySounds = () => {
    soundEffects.playCartoonBoing();
    setTimeout(() => soundEffects.playSteamHiss(), 450);
    setTimeout(() => soundEffects.playElectricZap(), 950);
    setTimeout(() => soundEffects.playElementSummon('tejas'), 1350);
    setTimeout(() => soundEffects.playTrasarenuChime(), 1800);
    setMsg('🪕 Playing sound sequence: Boing Spring → Steam Hiss → Electric Zap → Tejas Tone → Sacred Gong Chime!');
  };

  const totalParamanus = items.reduce(
    (acc, it) => acc + (it.kind === 'p' ? 1 : it.kind === 'd' ? it.n * 2 : 6),
    0,
  );

  // Sensory Gunas Unlocked Calculator
  const gunasUnlocked = {
    prthivi: items.some((i) => i.bhuta === 'prthivi' && (i.kind === 'd' || i.kind === 't')) || macroTryanukaStock.prthivi > 0,
    ap: items.some((i) => i.bhuta === 'ap' && (i.kind === 'd' || i.kind === 't')) || macroTryanukaStock.ap > 0,
    tejas: items.some((i) => i.bhuta === 'tejas' && (i.kind === 'd' || i.kind === 't')) || macroTryanukaStock.tejas > 0,
    vayu: items.some((i) => i.bhuta === 'vayu' && (i.kind === 'd' || i.kind === 't')) || macroTryanukaStock.vayu > 0,
    akasha: true, // Akasha is the ambient canvas
  };

  // Pīlupāka Chemical Heat Transformation
  const triggerPilupaka = () => {
    setIsBaking(true);
    const list = itemsRef.current;
    if (list.length === 0) {
      const p1 = randomSpot();
      const demoItem: Item = { id: nextId++, kind: 't', bhuta: 'prthivi', x: p1.x, y: p1.y, n: 3 };
      commit([demoItem]);
      setMsg('🔥 Loaded raw clay Tryaṇuka (त्र्यणुक). Increase Agni heat to trigger Pīlupāka dissociation!');
      setIsBaking(false);
      return;
    }

    setTimeout(() => {
      const transformed: Item[] = [];
      list.forEach((it) => {
        if (it.kind === 't') {
          for (let k = 0; k < 3; k++) {
            transformed.push({
              id: nextId++,
              kind: 'd',
              bhuta: it.bhuta,
              x: Math.max(TRAY_W + 40, Math.min(W - 40, it.x + (k - 1) * 38)),
              y: Math.max(40, Math.min(H - 40, it.y + (k % 2 === 0 ? 26 : -26))),
              n: 1,
            });
          }
        } else if (it.kind === 'd' && it.n === 2) {
          transformed.push({ id: nextId++, kind: 'd', bhuta: it.bhuta, x: it.x - 20, y: it.y, n: 1 });
          transformed.push({ id: nextId++, kind: 'd', bhuta: it.bhuta, x: it.x + 20, y: it.y, n: 1 });
        } else {
          transformed.push(it);
        }
      });
      commit(transformed);
      setIsBaking(false);
      soundEffects.playCelebrationChime();
      setMsg(
        `🔥 Pīlupāka Reaction Successful! Tejas broke molecular bonds (vibhāga). Exact quantum mass strictly conserved: ${totalParamanus} total paramāṇus remain invariant!`,
      );
    }, 450);
  };

  // Bhoota Reconstructor Channeler
  const forgeTryanukaForReconstructor = (bhuta: Bhuta) => {
    setMacroTryanukaStock((prev) => {
      const nextVal = Math.min(3, prev[bhuta] + 1);
      if (nextVal === 3) {
        soundEffects.playCelebrationChime();
        setMacroUnlocked((u) => ({ ...u, [bhuta]: true }));
      } else {
        soundEffects.playPuzzleSnap();
      }
      return { ...prev, [bhuta]: nextVal };
    });
  };

  const counts = {
    p: items.filter((i) => i.kind === 'p').length,
    d: items.filter((i) => i.kind === 'd').reduce((s, i) => s + i.n, 0),
    t: items.filter((i) => i.kind === 't').length,
  };

  const totalTryanukasCreated = counts.t + Object.values(macroTryanukaStock).reduce((s, v) => s + v, 0);
  const allFourCorporealTryanukasReady =
    counts.t >= 4 ||
    (totalTryanukasCreated >= 4 &&
      BHUTAS.every((b) => items.some((i) => i.kind === 't' && i.bhuta === b) || macroTryanukaStock[b] >= 1));

  const questSteps = [
    {
      step: 1,
      title: 'Summon Primordial Seeds',
      sanskrit: 'नित्य-कारणम्',
      desc: 'Summon at least 2 Paramāṇus [परमाणू] of the same bhūta from the tray into Ākāśa.',
      isDone: counts.p >= 2 || counts.d >= 1 || counts.t >= 1,
      hint: 'Click "+ Pṛthivī" or any element button below the canvas.',
    },
    {
      step: 2,
      title: 'Forge a Dvyaṇuka',
      sanskrit: 'द्व्यणुक-उत्पत्ति',
      desc: 'Combine 2 identical Paramāṇus [परमाणू] to forge an imperceptible Dvyaṇuka [द्व्यणुकम्].',
      isDone: counts.d >= 1 || counts.t >= 1,
      hint: 'Tap one atom, then tap another to fuse (or drag one onto another).',
    },
    {
      step: 3,
      title: 'Threshold of Perception',
      sanskrit: 'त्रसरेणु-दृश्यता',
      desc: 'Fuse 3 Dvyaṇukas (6 Aṇu units [अणवः]) to create a visible Tryaṇuka / Trasareṇu in the sunbeam!',
      isDone: counts.t >= 1,
      hint: 'Bind three Dvyaṇukas together or click "☀️ Forge Tryaṇuka in Sunbeam".',
    },
    {
      step: 4,
      title: 'Awaken Sensory Guṇas',
      sanskrit: 'गुण-प्रकाशनम्',
      desc: 'Synthesize elements to unlock macroscopic sensory qualities (Gandha, Rasa, Rūpa, Sparśa).',
      isDone: counts.t >= 1 && (gunasUnlocked.prthivi || gunasUnlocked.ap || gunasUnlocked.tejas || gunasUnlocked.vayu),
      hint: 'Your created Tryaṇukas activate their respective elemental sensory capacities.',
    },
    {
      step: 5,
      title: 'Atomic Genesis Victory',
      sanskrit: 'परमाणु-प्रवीण',
      desc: allFourCorporealTryanukasReady
        ? 'All 5 stages achieved! Vaiśeṣika atomic ontology mastered.'
        : 'Forge all 4 corporeal Tryaṇukas (Earth, Water, Fire, Air) to complete mastery!',
      isDone: allFourCorporealTryanukasReady,
      hint: allFourCorporealTryanukasReady
        ? 'Click "🏆 View Honors" to celebrate your Rishi of Creation achievement!'
        : 'Synthesize Tryaṇukas for all four physical elements (Pṛthivī, Ap, Tejas, Vāyu).',
    },
  ];

  const currentQuestIdx = questSteps.findIndex((s) => !s.isDone);
  const currentQuest = currentQuestIdx === -1 ? questSteps[4] : questSteps[currentQuestIdx];

  return (
    <div className="vl-sim">
      <BodhiLabAnecdote
        title="Kaṇāda & The Atomic Seeds of Matter"
        sanskritTitle="कणादस्य परमाणु-दर्शनम्"
        mood="scholar"
        sutra={{
          dev: 'सदकारणवन्नित्यम् ॥ तस्य कार्यं लिङ्गम् ॥',
          iast: 'sad akāraṇavan nityam || tasya kāryaṃ liṅgam ||',
          source: 'Vaiśeṣika Sūtra 4.1.1–2 (महर्षि-कणादः)',
          meaning: 'The ultimate particle (paramāṇu) is real, uncaused, and eternal. Its existence is proved through its manifest effects in the observable universe.',
        }}
        anecdote={
          <>
            <p>
              Centuries before Democritus or John Dalton, the sage <strong>Kaṇāda</strong> (Ulūka) walked the harvested fields of
              Prabhasa. While others rushed by, Kaṇāda knelt in the dust, carefully gathering single, discarded grains of rice.
              When astonished villagers asked why a great philosopher spent his days picking up stray grains, Kaṇāda replied:
            </p>
            <blockquote style={{ borderLeft: '3px solid #f59e0b', margin: '0.65rem 0', paddingLeft: '0.85rem', fontStyle: 'italic', color: '#92400e' }}>
              “A solitary grain may appear worthless, yet a full granary is nothing other than these solitary grains brought together.
              In truth, this entire cosmos—mountains, oceans, and living bodies—is built of ultimate, indivisible seeds.
              Nothing macroscopic exists without its atomic foundation.”
            </blockquote>
            <p>
              Observing dust motes (<em>trasareṇu</em>) dancing in a ray of sunlight streaming through a lattice window,
              Kaṇāda formulated the <em>Vaiśeṣika</em> philosophy: matter is composed of imperceptible atoms that join in pairs
              (<em>dvyaṇuka</em>) and triplets (<em>tryaṇuka</em>) to give rise to the tangible world.
            </p>
          </>
        }
        epistemologyAndMethod={
          <>
            Kaṇāda rejected dogma in favor of <strong>Pratyakṣa</strong> (acute observation) and <strong>Anumāna</strong> (rigorous logical inference).
            He reasoned that physical division cannot continue infinitely: if any object could be divided without end, a tiny mustard seed
            (<em>sarṣapa</em>) and Mount Meru would mathematically contain the exact same infinite number of constituent parts—a logical absurdity
            (<em>anavasthā</em>). Therefore, an absolute, indivisible physical limit must exist: the <strong>Paramāṇu</strong>.
          </>
        }
        modernBridge={{
          ancientConcept: 'Four elemental atomic types (Pṛthivī, Ap, Tejas, Vāyu) forming dyads (dvyaṇuka) and triads (tryaṇuka), undergoing thermal bond reorganization (Pīlupāka).',
          modernScience: 'Dalton’s atomic theory (1808), diatomic molecules (O₂, N₂), crystal lattices, and activation-energy bond breaking in chemical thermodynamics.',
          relevanceNote: 'Kaṇāda’s atomic ontology laid the empirical foundation for ancient Indian metallurgy (such as rust-resistant Wootz steel) and the precise mineral preparation of Rasashastra and Ayurvedic medicine.',
        }}
        societalValue={
          <p>
            In the ancient Indian ethos, atomic physics was never researched to craft weapons of mass destruction or claim proprietary patent monopolies.
            Instead, understanding the building blocks of matter served two noble ends: liberating human consciousness from superstition and fatalism,
            and advancing compassionate medicine (transforming minerals into bio-compatible <em>bhasmas</em> to relieve illness).
            Matter was understood as a sacred, interconnected fabric to be studied for the welfare of all living beings (<em>Lokasaṃgraha</em>).
          </p>
        }
      />

      <CoreIdea
        note={
          <>
            🌱 <strong>Historical Note:</strong> Kaṇāda’s paramāṇu represents an ancient empirical and rational deduction,
            pioneering the concept of discrete building blocks thousands of years before modern particle colliders.
          </>
        }
      >
        The <em>Vaiśeṣika Sūtra</em> describes material reality as emerging from{' '}
        <strong lang="sa">परमाणु paramāṇu</strong> (indivisible units). In the classical system, two paramāṇus bind into a{' '}
        <strong>dvyaṇuka</strong>, and three dvyaṇukas bind into a <strong>tryaṇuka</strong> (the first visible threshold,
        comparable to a dust mote in a sunbeam).
      </CoreIdea>

      {/* 🚀 [ UNIFIED 8-STATION LABORATORY HUB ] Clear, Categorized, Streamlined */}
      <div className="vl-lab-hub" role="region" aria-label="Vaiśeṣika Laboratory Navigation Hub">
        {/* Category Switcher Bar */}
        <div className="vl-lab-category-bar">
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', marginRight: '0.25rem' }}>
            विभागः · Filter by Domain:
          </span>
          <button
            type="button"
            className={`vl-lab-category-btn${selectedCategory === 'all' ? ' is-active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <span>🌟 All 8 Stations</span>
            <span className="vl-lab-category-badge">8</span>
          </button>
          <button
            type="button"
            className={`vl-lab-category-btn${selectedCategory === 'labs' ? ' is-active' : ''}`}
            onClick={() => setSelectedCategory('labs')}
          >
            <span>🎮 1. Interactive Labs</span>
            <span className="vl-lab-category-badge">3</span>
          </button>
          <button
            type="button"
            className={`vl-lab-category-btn${selectedCategory === 'philosophy' ? ' is-active' : ''}`}
            onClick={() => setSelectedCategory('philosophy')}
          >
            <span>🏛️ 2. Science &amp; Philosophy</span>
            <span className="vl-lab-category-badge">3</span>
          </button>
          <button
            type="button"
            className={`vl-lab-category-btn${selectedCategory === 'mastery' ? ' is-active' : ''}`}
            onClick={() => setSelectedCategory('mastery')}
          >
            <span>📜 3. History &amp; Quizzes</span>
            <span className="vl-lab-category-badge">2</span>
          </button>
        </div>

        {/* 8 Stations Cards Grid */}
        <div className="vl-lab-stations-grid" role="tablist" aria-label="Laboratory Stations">
          {displayedModules.map((mod) => {
            const isCurrentActive = mod.id === activeModuleId;
            return (
              <button
                key={mod.id}
                type="button"
                role="tab"
                aria-selected={isCurrentActive}
                className={`vl-lab-station-card${isCurrentActive ? ' is-active' : ''}`}
                onClick={() => handleSelectModule(mod.id)}
              >
                <div className="vl-lab-station-card-top">
                  <div className="vl-lab-station-tag-left">
                    <span className="vl-lab-station-num">#{mod.order}</span>
                    <span className="vl-lab-station-icon">{mod.icon}</span>
                  </div>
                  <span className="vl-lab-station-badge">{mod.badge}</span>
                </div>
                <div className="vl-lab-station-title-row">
                  <span className="vl-lab-station-title">{mod.title}</span>
                  <span className="vl-lab-station-sanskrit">{mod.sanskrit}</span>
                </div>
                <div className="vl-lab-station-sub">{mod.subtitle}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SECTOR 1: 🎮 ATOMIC CRUCIBLE GAMEPLAY (QUEST + SANDBOX + DOCKED HUD)
          ========================================================================= */}
      {activeSector === 'game' && (
        <>
          {gameSubMode === 'akasa_sutra' && (
            <AkasaSutraGame onNextStation={() => handleTourNav('next')} />
          )}
          {gameSubMode === 'guna_matrix' && <DynamicGunaMatrix />}
          {gameSubMode === 'sandbox' && (
            <>
              {/* 🎯 QUEST PROGRESSION HUD: Directed Sequence Towards End Goal */}
              <div className="vl-quest-hud" role="region" aria-label="Vaiśeṣika Atomic Quest">
            <div className="vl-quest-top-bar">
              <div className="vl-quest-title">
                <span>🎯 LEVEL {currentQuestIdx === -1 ? '5/5 (COMPLETE)' : `${currentQuestIdx + 1}/5`}: {currentQuest.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="vl-hud-pill" style={{ color: '#fef08a' }}>
                  SŪTRA: {currentQuest.sanskrit}
                </span>
                {currentQuestIdx === -1 && (
                  <button
                    type="button"
                    className="vl-btn vl-btn--cyber"
                    onClick={() => setShowVictoryModal(true)}
                    style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}
                  >
                    {hasClaimedVictory ? '🏆 View Honors' : '🏆 Claim Honors!'}
                  </button>
                )}
              </div>
            </div>

            <div className="vl-quest-sequence-track" role="list">
              {questSteps.map((s, idx) => {
                const isCurrent = idx === currentQuestIdx;
                return (
                  <div
                    key={s.step}
                    className={`vl-quest-step${s.isDone ? ' is-done' : ''}${isCurrent ? ' is-current' : ''}`}
                    role="listitem"
                  >
                    <div className="vl-quest-step-header">
                      <span>STEP {s.step}</span>
                      <span>{s.isDone ? '✓' : isCurrent ? '⚡' : '○'}</span>
                    </div>
                    <div className="vl-quest-step-label">{s.title}</div>
                  </div>
                );
              })}
            </div>

            <div className="vl-quest-active-card">
              <div className="vl-quest-active-desc">
                <strong>Start the Game / Goal: </strong> {currentQuest.desc}
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  💡 <em>Hint: {currentQuest.hint}</em>
                </div>
              </div>
            </div>
          </div>

          {/* Sanskrit Audio Pronunciation Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', margin: '0.75rem 0', padding: '0.65rem 0.85rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: '#38bdf8' }}>
              🔊 SANSKRIT AUDIO PRONUNCIATION:
            </span>
            <PronounceButton dev="पृथिवी" iast="Pṛthivī" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="अप्" iast="Ap" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="तेजस्" iast="Tejas" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="वायु" iast="Vāyu" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="आकाश" iast="Ākāśa" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="परमाणु" iast="Paramāṇu" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="द्व्यणुक" iast="Dvyaṇuka" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="त्र्यणुक" iast="Tryaṇuka" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="त्रसरेणु" iast="Trasareṇu" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="अदृष्ट" iast="Adṛṣṭa" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="कणाद" iast="Kaṇāda" activeWord={activeAudioWord} onPronounce={handlePronounce} />
          </div>

      {/* Main Sandbox Stage */}
      <div className="vl-sandbox" data-testid="paramanu-sandbox">
        <div className="vl-stage-wrap">
          <HudFrame
            accent="#facc15"
            tr={
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  className={`vl-chip${soundOn ? ' is-on' : ''}`}
                  onClick={() => {
                    const next = !soundOn;
                    setSoundOn(next);
                    soundEffects.setSoundEnabled(next);
                    if (next) soundEffects.playStrokeChime();
                  }}
                  style={{ height: '26px', fontSize: '0.74rem', padding: '0 0.5rem' }}
                  title="Toggle lab sound effects"
                >
                  {soundOn ? '🔊 Audio ON' : '🔇 Audio OFF'}
                </button>
                <button
                  type="button"
                  className={`vl-chip${isEtherAlive ? ' is-on' : ''}`}
                  onClick={() => setIsEtherAlive((v) => !v)}
                  style={{ height: '26px', fontSize: '0.74rem', padding: '0 0.5rem' }}
                  title="Toggle dynamic living cosmic ether in Ākāśa"
                >
                  🌌 Ether {isEtherAlive ? 'ON' : 'OFF'}
                </button>
                <button
                  type="button"
                  className={`vl-chip${isSunbeamOn ? ' is-on' : ''}`}
                  onClick={() => setIsSunbeamOn((v) => !v)}
                  style={{ height: '26px', fontSize: '0.74rem', padding: '0 0.5rem' }}
                  title="Toggle visible sunbeam light slice across the chamber"
                >
                  ☀️ Sunbeam Mote {isSunbeamOn ? 'ON' : 'OFF'}
                </button>
                <span>P {counts.p} · D {counts.d} · T {counts.t}</span>
              </div>
            }
            br={<>ĀKĀŚA · cosmic potential space</>}
          >
            <svg
              ref={svgRef}
              className="vl-stage vl-stage--paramanu"
              viewBox={`0 0 ${W} ${H}`}
              role="application"
              aria-label="Paramāṇu builder sandbox"
              data-testid="paramanu-stage"
              onPointerDown={(e) => {
                if (e.target === svgRef.current) setSelectedForFusion(null);
              }}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <defs>
                <linearGradient id="vl-akasha" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#080e22" />
                  <stop offset="50" stopColor="#100e28" />
                  <stop offset="100" stopColor="#1c0f38" />
                </linearGradient>
                <linearGradient id="vl-beam" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fef08a" stopOpacity="0.32" />
                  <stop offset="60" stopColor="#fde047" stopOpacity="0.14" />
                  <stop offset="100" stopColor="#fde68a" stopOpacity="0.02" />
                </linearGradient>
                <radialGradient id="vl-mote">
                  <stop offset="0" stopColor="#fde047" stopOpacity="0.9" />
                  <stop offset="50" stopColor="#facc15" stopOpacity="0.4" />
                  <stop offset="100" stopColor="#eab308" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="vl-nebula-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.16" />
                  <stop offset="50%" stopColor="#818cf8" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#030712" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ākāśa: The Universal Space Canvas */}
              <rect x={0} y={0} width={W} height={H} rx={16} fill="url(#vl-akasha)" />

              {/* Dynamic Living Ether Nebula Glow */}
              {isEtherAlive && (
                <ellipse cx={W * 0.6} cy={H * 0.5} rx={220} ry={160} fill="url(#vl-nebula-glow)" className="vl-akasha-nebula" />
              )}

              {/* Subtle Cosmic Starfield / Ether Dust (40 shimmering particles) */}
              {Array.from({ length: 42 }, (_, i) => {
                const sx = TRAY_W + 15 + ((i * 127 + 23) % (W - TRAY_W - 30));
                const sy = 15 + ((i * 83 + 17) % (H - 30));
                const sr = 0.8 + ((i * 7) % 10) * 0.12;
                return (
                  <circle
                    key={`star-${i}`}
                    cx={sx}
                    cy={sy}
                    r={sr}
                    fill={i % 3 === 0 ? '#38bdf8' : i % 5 === 0 ? '#fde047' : '#e9d5ff'}
                    opacity={0.35 + ((i * 13) % 40) / 100}
                    style={{
                      animation: isEtherAlive ? `akashaDrift ${4 + (i % 5)}s infinite ease-in-out` : undefined,
                    }}
                  />
                );
              })}

              {/* Visualizing the Sunbeam Mote (Jālasūryamarīcistha / Trasareṇu) */}
              {isSunbeamOn && (
                <g className="vl-sunbeam-beam">
                  <polygon
                    points={`${W - 70},0 ${W},0 ${TRAY_W + 140},${H} ${TRAY_W + 20},${H}`}
                    fill="url(#vl-beam)"
                  />
                  {/* Dancing Sunbeam Dust Motes */}
                  {Array.from({ length: 14 }, (_, m) => {
                    const mx = TRAY_W + 60 + ((m * 37) % 360);
                    const my = 40 + ((m * 49) % 320);
                    return (
                      <circle
                        key={`mote-${m}`}
                        cx={mx}
                        cy={my}
                        r={1.8}
                        fill="#fef08a"
                        className="vl-sunbeam-mote"
                        style={{ animationDelay: `${(m * 0.4).toFixed(1)}s` }}
                      />
                    );
                  })}
                </g>
              )}

              {/* Ākāśa Inscriptions */}
              <text x={W - 14} y={32} textAnchor="end" className="vl-svg-label">आकाश · ākāśa: cosmic potentiality</text>
              <text x={W - 14} y={48} textAnchor="end" className="vl-svg-small">one, all-pervading, not composed of paramāṇus</text>
              {isSunbeamOn && (
                <text x={W - 14} y={H - 22} textAnchor="end" className="vl-svg-small" fill="#fde047">
                  ☀️ जालसूर्य-मरीचिस्थं त्रसरेणुः · Sunbeam Mote Field
                </text>
              )}

              {/* Element Tray */}
              <rect x={6} y={6} width={TRAY_W - 12} height={H - 12} rx={14} fill="#090f1d" stroke="#334155" />
              <text x={TRAY_W / 2} y={28} textAnchor="middle" className="vl-svg-label">Tray</text>
              <text x={TRAY_W / 2} y={42} textAnchor="middle" className="vl-svg-small">drag or tap</text>
              {BHUTAS.map((b, i) => (
                <g
                  key={b}
                  className="vl-tray-well"
                  data-testid={`tray-${b}`}
                  onPointerDown={(e) => startTray(b, e)}
                  style={{ cursor: 'grab' }}
                >
                  <rect
                    x={14}
                    y={trayY(i) - 6}
                    width={TRAY_W - 28}
                    height={76}
                    rx={12}
                    fill={BHUTA_INFO[b].color}
                    fillOpacity={0.24}
                    stroke={BHUTA_INFO[b].soft}
                    strokeOpacity={0.6}
                  />
                  <circle cx={TRAY_W / 2 - 12} cy={trayY(i) + 16} r={7} fill={BHUTA_INFO[b].soft} />
                  <circle cx={TRAY_W / 2 + 4} cy={trayY(i) + 12} r={7} fill={BHUTA_INFO[b].soft} opacity={0.75} />
                  <circle cx={TRAY_W / 2 + 14} cy={trayY(i) + 22} r={7} fill={BHUTA_INFO[b].soft} opacity={0.55} />
                  <text x={TRAY_W / 2} y={trayY(i) + 46} textAnchor="middle" className="vl-svg-dev">{BHUTA_INFO[b].dev}</text>
                  <text x={TRAY_W / 2} y={trayY(i) + 62} textAnchor="middle" className="vl-svg-small">{BHUTA_INFO[b].iast}</text>
                </g>
              ))}

              {/* Render Sandbox Items (with side-stepping dodge offset & tap-to-fuse indicator) */}
              {items.map((it) => {
                const posX = it.x + (it.dodgeOffsetX || 0);
                const posY = it.y + (it.dodgeOffsetY || 0);
                const isSelected = selectedForFusion === it.id;
                return (
                  <g
                    key={it.id}
                    data-kind={it.kind}
                    data-bhuta={it.bhuta}
                    className={`vl-item${it.dodgeOffsetX ? ' vl-particle-dodge' : ''}`}
                    onPointerDown={(e) => startItem(it, e)}
                    style={{ cursor: 'pointer' }}
                  >
                    <ItemShape it={{ ...it, x: posX, y: posY }} isSunbeamOn={isSunbeamOn} />
                    {isSelected && (
                      <circle
                        cx={posX}
                        cy={posY}
                        r={it.kind === 'p' ? 24 : it.kind === 'd' ? 36 : 48}
                        fill="none"
                        stroke="#facc15"
                        strokeWidth={3}
                        strokeDasharray="6 3"
                        className="vl-selected-fusion-ring"
                      />
                    )}
                  </g>
                );
              })}

              {/* Fusion Collision Animations (Satisfying Snap FX) */}
              {fusions.map((f) => (
                <g key={`fx-${f.id}`} className="vl-fusion-burst">
                  <circle cx={f.x} cy={f.y} className="vl-fusion-ring" stroke={f.color} fill="none" />
                  <circle cx={f.x} cy={f.y} r={18} fill={f.color} opacity={0.35} />
                  <text x={f.x} y={f.y - 12} textAnchor="middle" className="vl-fusion-sparkle" fill="#fff" fontSize={18}>
                    ✦
                  </text>
                  <text x={f.x + 14} y={f.y + 12} textAnchor="middle" className="vl-fusion-sparkle" fill={f.color} fontSize={14}>
                    ✨
                  </text>
                  <text x={f.x - 14} y={f.y + 12} textAnchor="middle" className="vl-fusion-sparkle" fill="#fde047" fontSize={14}>
                    ✧
                  </text>
                </g>
              ))}

              {/* Incompatible Element Clash: Enhanced Shockwave + Steam Cloud Barrier */}
              {clashes.map((c) => (
                <g key={`clash-${c.id}`} className="vl-clash-shield" transform={`translate(${c.x}, ${c.y})`}>
                  {/* Expanding Repulsion Shockwave Rings */}
                  <circle cx={0} cy={0} r={18} fill="none" stroke="#f43f5e" strokeWidth={4} className="vl-clash-shockwave" />
                  <circle cx={0} cy={0} r={28} fill="none" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="6 3" className="vl-clash-shockwave" style={{ animationDelay: '0.1s' }} />

                  {/* Rising cartoon steam / dust cloud */}
                  <g className="vl-clash-steam-cloud">
                    <circle cx={-18} cy={-6} r={18} fill="rgba(255, 255, 255, 0.7)" />
                    <circle cx={16} cy={-10} r={20} fill="rgba(255, 255, 255, 0.75)" />
                    <circle cx={0} cy={8} r={16} fill="rgba(255, 255, 255, 0.6)" />
                    <circle cx={-8} cy={-22} r={15} fill="rgba(254, 240, 138, 0.65)" />
                    <circle cx={10} cy={-24} r={16} fill="rgba(254, 240, 138, 0.65)" />
                  </g>

                  {/* High-visibility clash banner */}
                  <rect x={-110} y={-40} width={220} height={28} rx={14} fill="rgba(15, 23, 42, 0.95)" stroke="#f43f5e" strokeWidth={1.8} />
                  <text x={0} y={-22} textAnchor="middle" fill="#fecdd3" fontSize={11} fontWeight={900} fontFamily="JetBrains Mono, monospace">
                    {c.title}
                  </text>
                  <text x={0} y={26} textAnchor="middle" fill="#fde047" fontSize={11} fontWeight={800} filter="drop-shadow(0 1px 3px rgba(0,0,0,0.9))">
                    {c.subtitle}
                  </text>
                </g>
              ))}
            </svg>
          </HudFrame>
        </div>

        {/* 🌟 UNIFIED IN-FRAME DIALOGUE CONSOLE HUD (Zero-scroll, docked directly under stage) */}
        <aside
          className={`vl-docked-dialogue-hud${guruQuip ? ' is-clash' : ''}`}
          role="region"
          aria-label="Kaṇāda & Bodhi In-Frame Console"
        >
          <div className="vl-dialogue-avatar-wrap">
            <div
              className="vl-dialogue-avatar is-speaking"
              aria-hidden="true"
              style={{ borderColor: guruQuip ? '#f43f5e' : dialogue.badgeColor }}
            >
              {guruQuip
                ? (guruQuip.mood === 'shocked' ? '😲' : guruQuip.mood === 'philosophical' ? '🧘‍♂️' : '🧙‍♂️')
                : dialogue.avatar}
            </div>
          </div>
          <div className="vl-dialogue-content">
            <div className="vl-dialogue-header">
              <div className="vl-dialogue-speaker">
                <span>
                  {guruQuip
                    ? `महर्षि-कणाद उवाच · SAGE KAṆĀDA (ATTEMPT #${guruQuip.attempt})`
                    : dialogue.name}
                </span>
                <span className="vl-audio-wave" title="Audio synthesized wave">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span
                  className="vl-dialogue-badge"
                  style={{
                    borderColor: guruQuip ? '#f43f5e' : dialogue.badgeColor,
                    color: guruQuip ? '#fecdd3' : dialogue.badgeColor,
                    background: guruQuip ? 'rgba(244, 63, 94, 0.15)' : undefined,
                  }}
                >
                  {guruQuip ? '⚡ INCOMPATIBLE GUṆA REJECTION' : dialogue.badge}
                </span>
                {guruQuip && (
                  <button
                    type="button"
                    className="vl-guru-quip-close"
                    onClick={() => setGuruQuip(null)}
                    title="Dismiss clash alert and return to companion dialogue"
                    style={{ padding: '0.1rem 0.4rem', fontSize: '0.9rem', color: '#fda4af' }}
                  >
                    ✕ Dismiss
                  </button>
                )}
              </div>
            </div>
            <p className="vl-dialogue-text">
              {guruQuip ? guruQuip.quote : dialogue.text}
            </p>
            {dialogue.sanskritQuote && !guruQuip && (
              <div className="vl-dialogue-sutra">
                📜 {dialogue.sanskritQuote}
              </div>
            )}
            {guruQuip && (
              <div className="vl-dialogue-sutra" style={{ borderColor: '#f43f5e', color: '#fecdd3' }}>
                📜 अदृष्ट-विरोधात् ॥ (Repelled by inherent elemental guṇa divergence)
              </div>
            )}
            <div className="vl-dialogue-actions">
              <button
                type="button"
                className="vl-chip is-on"
                style={{ fontSize: '0.74rem', height: '26px', cursor: 'pointer' }}
                onClick={() => {
                  if (guruQuip) setGuruQuip(null);
                  cycleNextDialogue();
                }}
                title="Hear next wisdom from Sage Kaṇāda & Bodhi"
              >
                💬 Next Wisdom ({dialogueIndex + 1}/{COMPANION_QUIPS.length})
              </button>
              <button
                type="button"
                className="vl-chip"
                style={{ fontSize: '0.74rem', height: '26px', cursor: 'pointer' }}
                onClick={() => {
                  soundEffects.playStrokeChime();
                  playPronunciation(guruQuip ? 'कणाद' : (dialogue.speaker === 'kanada' ? 'कणाद' : 'बोधि'));
                }}
                title="Pronounce Sage's name"
              >
                🔊 Pronounce Speaker
              </button>
              {guruQuip && (
                <button
                  type="button"
                  className="vl-chip"
                  style={{ fontSize: '0.74rem', height: '26px', cursor: 'pointer', borderColor: '#f43f5e', color: '#fecdd3' }}
                  onClick={() => setGuruQuip(null)}
                  title="Resume companion dialogue"
                >
                  ↩ Return to Dialogue
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Elemental Add Buttons */}
        <div className="vl-leds" role="group" aria-label="Add a paramāṇu">
          {BHUTAS.map((b) => (
            <LedButton key={b} kind="action" color={BHUTA_INFO[b].soft} onClick={() => addOne(b)} testId={`paramanu-add-${b}`}>
              {BHUTA_INFO[b].icon} + <span lang="sa">{BHUTA_INFO[b].dev}</span> {BHUTA_INFO[b].iast}
            </LedButton>
          ))}
        </div>

        {/* Readouts & Actions */}
        <div className="vl-readouts">
          <span className="vl-readout"><b>{counts.p}</b> paramāṇu</span>
          <span className="vl-readout"><b>{counts.d}</b> dvyaṇuka</span>
          <span className="vl-readout"><b>{counts.t}</b> tryaṇuka</span>
          <span className="vl-readout" style={{ borderColor: '#ea580c', background: '#fff7ed', color: '#9a3412', fontWeight: 800 }}>
            ⚛️ Total Invariant Atoms: <b>{totalParamanus}</b> (द्रव्य-अविनाशिता)
          </span>
          <LedButton kind="action" color="#facc15" onClick={demoJoin} testId="paramanu-demo">Show me a join</LedButton>
          <LedButton
            kind="action"
            onClick={() => {
              nextId = 1;
              setSelectedForFusion(null);
              commit([]);
              setMsg('Fresh sky! Drag a paramāṇu from the tray.');
              setGuruQuip(null);
            }}
            testId="paramanu-reset"
          >
            Reset
          </LedButton>
        </div>

        {/* Instant Playground Action Buttons for Dialogues, Sounds & FX */}
        <div
          className="vl-playground-action-bar"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.65rem',
            margin: '0.85rem 0',
            padding: '0.75rem 1rem',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1.5px solid rgba(245, 158, 11, 0.45)',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
          }}
        >
          <span style={{ fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            🕹️ ONE-CLICK ACTION LAB:
          </span>
          <button
            type="button"
            className="vl-action-btn"
            style={{
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              color: '#ffffff',
              border: '1px solid #f43f5e',
              borderRadius: '8px',
              padding: '0.42rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 2px 8px rgba(225, 29, 72, 0.35)',
            }}
            onClick={triggerDemoClash}
            title="Collide Fire and Water to watch the comedic repulsion, expanding shockwaves, and hear the steam sizzle!"
          >
            💥 Force Element Clash (Steam FX)
          </button>
          <button
            type="button"
            className="vl-action-btn"
            style={{
              background: 'linear-gradient(135deg, #0284c7, #0369a1)',
              color: '#ffffff',
              border: '1px solid #38bdf8',
              borderRadius: '8px',
              padding: '0.42rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.35)',
            }}
            onClick={() => quickJoinDvyanuka('prthivi')}
            title="Automatically fuse two atoms into a Dvyaṇuka dyad and hear the puzzle snap"
          >
            ⚡ Auto-Join Dvyaṇuka
          </button>
          <button
            type="button"
            className="vl-action-btn"
            style={{
              background: 'linear-gradient(135deg, #d97706, #b45309)',
              color: '#ffffff',
              border: '1px solid #facc15',
              borderRadius: '8px',
              padding: '0.42rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 2px 8px rgba(217, 119, 6, 0.35)',
            }}
            onClick={() => forgeTryanukaInSunbeam('tejas')}
            title="Spawn a Tryaṇuka / Trasareṇu right in the dancing sunbeam and ring the sacred temple gong"
          >
            ☀️ Forge Tryaṇuka in Sunbeam
          </button>
          <button
            type="button"
            className="vl-action-btn"
            style={{
              background: 'rgba(51, 65, 85, 0.85)',
              color: '#f8fafc',
              border: '1px solid #94a3b8',
              borderRadius: '8px',
              padding: '0.42rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
            onClick={testFunnySounds}
            title="Play sound sequence: Boing Spring → Steam Hiss → Electric Zap → Tejas Tone → Sacred Gong"
          >
            🪕 Funny Sound Test
          </button>
        </div>

        {/* Cause and Effect Sandbox Banner: Nitya Kāraṇa & Anitya Kārya */}
        <div className="vl-karana-karya-banner" role="region" aria-label="Cause and Effect Principle">
          <div className="vl-karana-box">
            <div className="vl-box-title">
              <span>⚛️ नित्य-कारणम् (Nitya Kāraṇa)</span>
              <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace' }}>ETERNAL CAUSE</span>
            </div>
            <p className="vl-box-desc">
              The fundamental <strong>Paramāṇu</strong> has no parts and no cause (<em>akāraṇavat</em>). It is indivisible,
              imperishable, and eternal. It cannot be destroyed by fire, water, or weapon.
            </p>
          </div>
          <div className="vl-karya-box">
            <div className="vl-box-title">
              <span>✨ अनित्य-कार्यम् (Anitya Kārya)</span>
              <span style={{ fontSize: '0.75rem', color: '#ea580c', fontFamily: 'JetBrains Mono, monospace' }}>TRANSIENT EFFECT</span>
            </div>
            <p className="vl-box-desc">
              The combined <strong>Dvyaṇuka</strong> and <strong>Tryaṇuka</strong> are transient effects (<em>kārya</em>).
              They form via conjunction (<em>saṃyoga</em>) and dissolve via disjunction (<em>vibhāga</em>). Total invariant atoms: <strong>{totalParamanus}</strong>.
            </p>
          </div>
        </div>

        <p className="vl-msg" role="status" data-testid="paramanu-msg">{msg}</p>
      </div>

      {/* 🧱 Pedagogical Card: The Cosmic Lego Baseplate (Ākāśa) */}
      <section className="vl-lego-card" aria-label="Understanding Akasha through Lego Metaphor">
        <div className="vl-lego-card-header">
          <div className="vl-lego-card-title">
            <span>🧱 🌌 The Cosmic Lego Baseplate (Ākāśa - आकाश)</span>
          </div>
          <span className="vl-lego-badge">INTUITIVE PEDAGOGY</span>
        </div>
        <div className="vl-lego-card-body">
          <p style={{ margin: 0 }}>
            Imagine you want to build a massive Lego castle. Before you can snap a single brick together, what do you need first?
            You need that big, flat plastic baseplate to snap the pieces onto!
          </p>
          <div className="vl-lego-card-highlight">
            The ancient Rishis envisioned <strong>Ākāśa</strong> exactly like that. It looks like a whole lot of nothing—just empty space.
            Yet without it, the other elemental blocks (Earth, Water, Fire, Air) would have nowhere to stand, no room to move, and no way to connect.
            It is empty space teeming with the <em>absolute potentiality</em> for everything else to exist.
          </div>
        </div>
      </section>

      {/* 🌟 The Tanmātra / Guṇa Sensory Connection HUD */}
      <section className="vl-panel" aria-label="Unlocked Sensory Gunas">
        <div className="vl-panel-title">
          <span>👃 👅 👁️ ✋ 🔔 The Tanmātra & Guṇa Sensory Connection</span>
          <span className="vl-score">Sensory Qualities of Matter</span>
        </div>
        <p style={{ margin: '0 0 0.85rem', fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
          In Vaiśeṣika physics, elements are distinguished not by abstract mass alone, but by inherent, unchanging sensory qualities (<em>guṇas</em>).
          As you synthesize particles from paramāṇu to tryaṇuka, watch their cardinal sensory capacities unlock:
        </p>
        <div className="vl-guna-hud">
          {BHUTAS.map((b) => {
            const isUnlocked = gunasUnlocked[b];
            const info = BHUTA_INFO[b];
            return (
              <div key={b} className={`vl-guna-card${isUnlocked ? ' is-unlocked' : ''}`}>
                <div className="vl-guna-card-header">
                  <div className="vl-guna-name">
                    <span>{info.icon}</span>
                    <span lang="sa">{info.dev}</span>
                    <span style={{ fontSize: '0.8em', opacity: 0.8 }}>({info.iast})</span>
                  </div>
                  <span className="vl-guna-status">{isUnlocked ? '✓ UNLOCKED' : 'LOCKED'}</span>
                </div>
                <div className="vl-guna-quality">{info.gunaDev}</div>
                <p className="vl-guna-desc">{info.sense}</p>
                <div style={{ marginTop: 'auto', paddingTop: '0.3rem', fontSize: '0.74rem', color: isUnlocked ? '#86efac' : '#64748b' }}>
                  {isUnlocked ? 'Active in perceptible compounds' : 'Requires Dvyaṇuka / Tryaṇuka assembly'}
                </div>
              </div>
            );
          })}
          <div className="vl-guna-card is-unlocked" style={{ borderColor: '#818cf8' }}>
            <div className="vl-guna-card-header">
              <div className="vl-guna-name">
                <span>🌌</span>
                <span lang="sa">आकाश</span>
                <span style={{ fontSize: '0.8em', opacity: 0.8 }}>(Ākāśa)</span>
              </div>
              <span className="vl-guna-status">ALWAYS ACTIVE</span>
            </div>
            <div className="vl-guna-quality" style={{ color: '#818cf8' }}>शब्द (Sound / Śabda)</div>
            <p className="vl-guna-desc">🔔 Sonic Acoustic Continuum / Omni-Pervading</p>
            <div style={{ marginTop: 'auto', paddingTop: '0.3rem', fontSize: '0.74rem', color: '#a5b4fc' }}>
              Carrier wave of cosmic vibration
            </div>
          </div>
        </div>
      </section>
            </>
          )}
        </>
      )}

      {/* =========================================================================
          SECTOR 2: 🏺 PĪLUPĀKA THERMAL REACTOR & BHOOTA RECONSTRUCTOR
          ========================================================================= */}
      {activeSector === 'pilupaka' && (
        <>
          {/* Pīlupāka Chemical Heat Transformation Crucible */}
          <div
            className="vl-pilupaka-crucible"
            style={{
              background: 'linear-gradient(180deg, #fffbeb 0%, #fff7ed 100%)',
              border: '1.5px solid #fed7aa',
              borderRadius: '16px',
              padding: '1.15rem 1.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              marginBottom: '1.25rem',
              boxShadow: '0 8px 24px rgba(234, 88, 12, 0.12)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem' }}>
              <div>
                <strong style={{ color: '#c2410c', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🔥 Pīlupāka Thermal Reactor (वैशेषिक पीलुपाक-प्रक्रिया)</span>
                </strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.86rem', color: '#78350f', lineHeight: 1.55 }}>
                  Kaṇāda’s pioneering theory of chemical transformation: heat (Tejas) penetrates molecular bonds, dissociates dyads (vibhāga), and recombines atoms into baked terracotta pottery or ripened fruits.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <LedButton
                  kind="action"
                  color="#f97316"
                  disabled={isBaking}
                  onClick={triggerPilupaka}
                  testId="paramanu-pilupaka-btn"
                >
                  {isBaking ? '⏳ Dissociating Bonds…' : '🔥 Trigger Pīlupāka Thermal Bake'}
                </LedButton>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '0.75rem' }}>
              <GlowSlider
                label="तेजस् · Agni Heat Level"
                value={agniHeat}
                min={10}
                max={100}
                step={5}
                onChange={setAgniHeat}
                color="#ea580c"
                valueText={`${Math.round(agniHeat)}% Heat (Tejas)`}
              />
              <span style={{ fontSize: '0.82rem', color: agniHeat > 60 ? '#c2410c' : '#b45309', fontWeight: 800 }}>
                {agniHeat > 60 ? '⚡ High Agni: Sufficient for bond dissociation (Vibhāga)' : '🌡️ Warm Agni: Atoms remain bound'}
              </span>
            </div>
          </div>

      {/* 🔬 [ THE RIGOROUS 3-STEP BHOOTA RECONSTRUCTOR ] */}
      <BhutaReconstructor
        initialBhuta={selectedMacroTarget}
        onSelectBhuta={setSelectedMacroTarget}
        unlockedBhutas={macroUnlocked}
        macroStock={macroTryanukaStock}
        onTryanukaForged={(bhuta) => forgeTryanukaForReconstructor(bhuta)}
        onBhutaMaterialized={(bhuta) => {
          setMacroUnlocked((u) => ({ ...u, [bhuta]: true }));
          setMacroTryanukaStock((prev) => ({ ...prev, [bhuta]: 3 }));
          soundEffects.playCelebrationChime();
        }}
      />

      {/* 📜 [ SEQUENTIAL BRIDGE: PĪLUPĀKA TO ATOMISM HISTORY ] */}
      <div className="vl-station-bridge-card">
        <div className="vl-station-bridge-glow" />
        <div className="vl-station-bridge-content">
          <div className="vl-station-bridge-badge">
            <span>🚀 NEXT IN LAB SEQUENCE</span>
            <span>स्थानम् ३ ➔ स्थानम् ४</span>
          </div>
          <h4 className="vl-station-bridge-title">
            📜 Pīlupāka to Atomic History: Kaṇāda’s Chemical Kiln in the 2,600-Year Timeline
          </h4>
          <p className="vl-station-bridge-desc">
            You have observed how thermal Tejas breaks molecular bonds (<strong>Vibhāga</strong>) down to individual atoms before recombining them into new ceramic qualities (<strong>Saṁyoga</strong>). In Vaiśeṣika epistemology, this kiln experiment was Sage Kaṇāda&apos;s physical proof that fundamental matter is atomic and transformable! Continue into Station 4 to compare Kaṇāda&apos;s atomic theory directly against Democritus&apos;s Greek void, John Dalton&apos;s chemical mass laws, and modern quantum fields.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.85rem' }}>
            <button
              type="button"
              className="vl-btn vl-btn--gold is-pulsing"
              onClick={() => {
                handleSelectModule('history');
                setHistorySubView('timeline');
                soundEffects.playCelebrationChime();
              }}
              style={{ fontSize: '0.92rem', padding: '0.55rem 1.25rem' }}
            >
              📜 Continue to Station 4: History of Atomism ➔
            </button>
            <button
              type="button"
              className="vl-btn vl-btn--cyber"
              onClick={() => {
                handleSelectModule('history');
                setHistorySubView('pilupaka_lab');
                soundEffects.playElementSummon('tejas');
              }}
              style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
            >
              🔥 Open Combined Pīlupāka-History Suite
            </button>
          </div>
        </div>
      </div>
        </>
      )}

      {/* =========================================================================
          SECTOR 3: 🪞 BIO-COSMIC MIRROR: MICROCOSM & MACROCOSM (BODY & MIND)
          ========================================================================= */}
      {activeSector === 'biocosmic' && (
        <>
          {/* 🌟 [ NEW: COSMIC MIRROR LINK: THE BHŪTAS WITHIN YOU ] */}
          <section className="vl-cosmic-mirror-section" aria-label="Cosmic Mirror Link: Microcosm and Macrocosm">
        <div className="vl-cosmic-mirror-header">
          <div>
            <h3 className="vl-cosmic-mirror-title">
              <span>🫁 🌌 COSMIC MIRROR LINK: THE BHŪTAS WITHIN YOU</span>
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#cbd5e1' }}>
              Bridge the laboratory elements to your living physiology. As the ancient axiom teaches:
              <em> “यत् पिण्डे तद् ब्रह्माण्डे, यद् ब्रह्माण्डे तत् पिण्डे”</em> — <strong>As is the microcosm (Piṇḍa), so is the macrocosm (Brahmāṇḍa).</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
            <PronounceButton dev="पिण्ड" iast="Piṇḍa" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="ब्रह्माण्ड" iast="Brahmāṇḍa" activeWord={activeAudioWord} onPronounce={handlePronounce} />
          </div>
        </div>

        {/* Axiom Banner */}
        <div className="vl-mirror-sutra-banner">
          <div>
            <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fef08a' }} lang="sa">
              यत् पिण्डे तद् ब्रह्माण्डे ॥ (Yat Piṇḍe Tat Brahmāṇḍe)
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', fontStyle: 'italic', marginTop: '0.15rem' }}>
              The five great elements are not distant abstractions—your skeleton is mountain rock, your blood is planetary ocean, and your digestive fire is the Sun.
            </div>
          </div>
          <span className="vl-hud-pill">AYURVEDA & VAIŚEṢIKA ONTO-ECOLOGY</span>
        </div>

        {/* Element Selector Tabs */}
        <div className="vl-mirror-selector-tabs">
          {COSMIC_MIRROR_DATA.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`vl-mirror-tab${selectedMirrorBhuta === item.id ? ' is-active' : ''}`}
              onClick={() => {
                setSelectedMirrorBhuta(item.id);
                soundEffects.playPuzzleSnap();
              }}
            >
              <span>{item.icon}</span>
              <span lang="sa">{item.dev}</span>
              <span>{item.iast}</span>
            </button>
          ))}
        </div>

        {/* Dual-Mirror Stage: Microcosm (Body) vs Macrocosm (Cosmos) */}
        {(() => {
          const cur = COSMIC_MIRROR_DATA.find((m) => m.id === selectedMirrorBhuta)!;
          return (
            <div>
              <div className="vl-mirror-stage-grid">
                {/* 1. Microcosm Pane (The Human Body Within) */}
                <div className="vl-mirror-pane">
                  <div className="vl-mirror-pane-title">
                    <span>🫁 सूक्ष्म-पिण्ड (MICROCOSM: YOUR BODY)</span>
                    <span className="vl-mirror-pane-badge" style={{ color: cur.color, borderColor: `${cur.color}66` }}>
                      {cur.icon} {cur.name}
                    </span>
                  </div>

                  <div className="vl-mirror-svg-box">
                    <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%', display: 'block' }}>
                      <defs>
                        <radialGradient id="bodyGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor={cur.color} stopOpacity="0.35" />
                          <stop offset="70%" stopColor={cur.color} stopOpacity="0.08" />
                          <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                      </defs>

                      {/* Anatomical Silhouette Grid */}
                      <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(129, 140, 248, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="150" cy="150" r="105" fill="url(#bodyGlow)" />

                      {/* Stylized Human Figure Vector Outline */}
                      {/* Head */}
                      <circle cx="150" cy="52" r="24" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                      {/* Torso & Pelvis */}
                      <path d="M136,78 L164,78 L174,152 L126,152 Z" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                      {/* Arms */}
                      <path d="M134,82 L102,132 L92,185" fill="none" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
                      <path d="M166,82 L198,132 L208,185" fill="none" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
                      {/* Legs */}
                      <path d="M136,152 L130,225 L124,282" fill="none" stroke="#64748b" strokeWidth="4.5" strokeLinecap="round" />
                      <path d="M164,152 L170,225 L176,282" fill="none" stroke="#64748b" strokeWidth="4.5" strokeLinecap="round" />

                      {/* ELEMENTAL ANATOMICAL BEACONS */}
                      {cur.id === 'prthivi' && (
                        // Earth: Bones / Spine / Cellular Framework
                        <g>
                          <line x1="150" y1="80" x2="150" y2="150" stroke={cur.color} strokeWidth="4" strokeDasharray="4 2" />
                          <circle cx="150" cy="98" r="8" fill={cur.color} />
                          <circle cx="150" cy="120" r="8" fill={cur.color} />
                          <circle cx="150" cy="142" r="8" fill={cur.color} />
                          <line x1="130" y1="225" x2="170" y2="225" stroke={cur.color} strokeWidth="3" />
                          <circle cx="150" cy="120" r="16" fill="none" stroke={cur.color} strokeWidth="2" className="vl-hotspot-pulse" />
                          <text x="150" y="200" textAnchor="middle" fill="#fef3c7" fontSize="12" fontWeight="800">
                            🦴 Asthi (Bones & Teeth)
                          </text>
                        </g>
                      )}

                      {cur.id === 'ap' && (
                        // Water: Vascular circulatory channels & cytoplasm
                        <g>
                          <path d="M150,92 Q175,120 168,160 Q160,200 166,260" fill="none" stroke={cur.color} strokeWidth="3" strokeDasharray="5 3" />
                          <path d="M150,92 Q125,120 132,160 Q140,200 134,260" fill="none" stroke={cur.color} strokeWidth="3" strokeDasharray="5 3" />
                          <circle cx="150" cy="108" r="12" fill={cur.color} opacity="0.6" />
                          <circle cx="150" cy="108" r="18" fill="none" stroke={cur.color} strokeWidth="2" className="vl-hotspot-pulse" />
                          <text x="150" y="200" textAnchor="middle" fill="#e0f2fe" fontSize="12" fontWeight="800">
                            💧 Rakta & Rasa (70% Fluids)
                          </text>
                        </g>
                      )}

                      {cur.id === 'tejas' && (
                        // Fire: Stomach Jaṭharāgni & Retinal light
                        <g>
                          {/* Solar Plexus Fire Flame */}
                          <path d="M150,105 Q164,124 160,138 Q150,148 150,150 Q150,148 140,138 Q136,124 150,105 Z" fill={cur.color} />
                          <circle cx="150" cy="132" r="6" fill="#fef08a" />
                          <circle cx="150" cy="132" r="20" fill="none" stroke={cur.color} strokeWidth="2" className="vl-hotspot-pulse" />
                          {/* Eyes */}
                          <circle cx="143" cy="50" r="3" fill="#fde047" />
                          <circle cx="157" cy="50" r="3" fill="#fde047" />
                          <text x="150" y="196" textAnchor="middle" fill="#fed7aa" fontSize="12" fontWeight="800">
                            🔥 Jaṭharāgni (Metabolic Fire)
                          </text>
                        </g>
                      )}

                      {cur.id === 'vayu' && (
                        // Air: Respiratory lungs & nerve electrical impulses
                        <g>
                          {/* Lungs */}
                          <ellipse cx="140" cy="104" rx="10" ry="16" fill={cur.color} opacity="0.65" />
                          <ellipse cx="160" cy="104" rx="10" ry="16" fill={cur.color} opacity="0.65" />
                          {/* Kinetic wind vectors */}
                          <path d="M150,68 L150,90 M142,94 L132,106 M158,94 L168,106" stroke="#ede9fe" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="150" cy="104" r="22" fill="none" stroke={cur.color} strokeWidth="2" className="vl-hotspot-pulse" />
                          <text x="150" y="196" textAnchor="middle" fill="#ede9fe" fontSize="12" fontWeight="800">
                            🌬️ Prāṇa & Nerves (Inhaled Breath)
                          </text>
                        </g>
                      )}

                      {cur.id === 'akasha' && (
                        // Space: Sinuses, ear canals, heart chamber, empty cell lumina
                        <g>
                          <circle cx="150" cy="46" r="6" fill={cur.color} opacity="0.75" />
                          <circle cx="126" cy="52" r="4" fill={cur.color} />
                          <circle cx="174" cy="52" r="4" fill={cur.color} />
                          <circle cx="150" cy="115" r="12" fill="none" stroke={cur.color} strokeWidth="2" strokeDasharray="3 3" />
                          <circle cx="150" cy="115" r="24" fill="none" stroke={cur.color} strokeWidth="1.5" className="vl-hotspot-pulse" />
                          <text x="150" y="196" textAnchor="middle" fill="#e0e7ff" fontSize="12" fontWeight="800">
                            🌌 Hṛdaya-Guhā (Internal Cavities)
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: '0.5rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: cur.color, fontWeight: 700 }}>
                      📍 {cur.bodyHotspotName}
                    </span>
                  </div>
                </div>

                {/* 2. Macrocosm Pane (The Universe Without) */}
                <div className="vl-mirror-pane">
                  <div className="vl-mirror-pane-title">
                    <span>🌌 विराट्-ब्रह्माण्ड (MACROCOSM: THE UNIVERSE)</span>
                    <span className="vl-mirror-pane-badge" style={{ color: cur.color, borderColor: `${cur.color}66` }}>
                      {cur.icon} Cosmic Realm
                    </span>
                  </div>

                  <div className="vl-mirror-svg-box">
                    <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%', display: 'block' }}>
                      <defs>
                        <radialGradient id="cosmosGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor={cur.color} stopOpacity="0.4" />
                          <stop offset="60%" stopColor={cur.color} stopOpacity="0.1" />
                          <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                      </defs>

                      <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(129, 140, 248, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="150" cy="150" r="115" fill="url(#cosmosGlow)" />

                      {/* COSMIC REALM VISUALIZATIONS */}
                      {cur.id === 'prthivi' && (
                        // Earth: Mountain Peaks & Planetary Tectonic Crust
                        <g>
                          <polygon points="150,60 215,185 85,185" fill="#78350f" stroke={cur.color} strokeWidth="2.5" />
                          <polygon points="150,60 170,185 85,185" fill="rgba(255,255,255,0.12)" />
                          <polygon points="190,110 245,195 135,195" fill="#451a03" stroke={cur.color} strokeWidth="2" opacity="0.8" />
                          <rect x="50" y="185" width="200" height="45" fill="#291305" stroke={cur.color} strokeWidth="1.5" />
                          <circle cx="150" cy="120" r="22" fill="none" stroke={cur.color} strokeWidth="2" className="vl-hotspot-pulse" />
                          <text x="150" y="255" textAnchor="middle" fill="#fef3c7" fontSize="12" fontWeight="800">
                            🏔️ Parvata & Tectonic Crust
                          </text>
                        </g>
                      )}

                      {cur.id === 'ap' && (
                        // Water: Ocean Waves & Monsoon Cloud Systems
                        <g>
                          <path d="M40,110 Q95,75 150,110 T260,110" fill="none" stroke="#93c5fd" strokeWidth="3" opacity="0.75" />
                          <path d="M30,140 Q95,105 150,140 T270,140" fill="none" stroke={cur.color} strokeWidth="3.5" />
                          <path d="M40,175 Q95,145 150,175 T260,175" fill="none" stroke={cur.color} strokeWidth="4" />
                          <circle cx="150" cy="140" r="32" fill="none" stroke={cur.color} strokeWidth="2" className="vl-hotspot-pulse" />
                          <text x="150" y="255" textAnchor="middle" fill="#e0f2fe" fontSize="12" fontWeight="800">
                            🌊 Samudra & Monsoon Rain
                          </text>
                        </g>
                      )}

                      {cur.id === 'tejas' && (
                        // Fire: The Sun (Sūrya) & Cosmic Radiation
                        <g>
                          <circle cx="150" cy="140" r="42" fill="url(#macroFire)" stroke="#fbbf24" strokeWidth="3" />
                          {/* Solar Corona Rays */}
                          {Array.from({ length: 8 }, (_, rIdx) => {
                            const angle = (rIdx * Math.PI) / 4;
                            const x1 = 150 + Math.cos(angle) * 48;
                            const y1 = 140 + Math.sin(angle) * 48;
                            const x2 = 150 + Math.cos(angle) * 68;
                            const y2 = 140 + Math.sin(angle) * 68;
                            return <line key={rIdx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />;
                          })}
                          <circle cx="150" cy="140" r="54" fill="none" stroke="#f97316" strokeWidth="2" className="vl-hotspot-pulse" />
                          <text x="150" y="255" textAnchor="middle" fill="#fed7aa" fontSize="12" fontWeight="800">
                            ☀️ Sūrya & Cosmic Plasma
                          </text>
                        </g>
                      )}

                      {cur.id === 'vayu' && (
                        // Air: Atmospheric Jet Streams & Hurricanes
                        <g>
                          <circle cx="150" cy="140" r="75" fill="none" stroke={cur.color} strokeWidth="2" strokeDasharray="12 6" />
                          <path d="M90,140 Q150,85 210,140 T150,195 T90,140" fill="none" stroke="#ddd6fe" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="8 4" />
                          <circle cx="150" cy="140" r="26" fill="none" stroke={cur.color} strokeWidth="2" className="vl-hotspot-pulse" />
                          <text x="150" y="255" textAnchor="middle" fill="#ede9fe" fontSize="12" fontWeight="800">
                            🌀 Jet Streams & Atmospheric Wind
                          </text>
                        </g>
                      )}

                      {cur.id === 'akasha' && (
                        // Space: Deep-Space Intergalactic Void & Baseplate
                        <g>
                          {/* Intergalactic Void Coordinates Grid */}
                          <line x1="50" y1="140" x2="250" y2="140" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="150" y1="40" x2="150" y2="240" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                          {Array.from({ length: 12 }, (_, sIdx) => (
                            <circle key={sIdx} cx={70 + ((sIdx * 41) % 160)} cy={60 + ((sIdx * 37) % 160)} r="2" fill="#fff" opacity="0.8" />
                          ))}
                          <ellipse cx="150" cy="140" rx="65" ry="32" fill="none" stroke={cur.color} strokeWidth="2" strokeDasharray="6 4" />
                          <circle cx="150" cy="140" r="32" fill="none" stroke={cur.color} strokeWidth="2" className="vl-hotspot-pulse" />
                          <text x="150" y="255" textAnchor="middle" fill="#e0e7ff" fontSize="12" fontWeight="800">
                            🌌 Ananta-Ākāśa (Cosmic Void)
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: '0.5rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: cur.color, fontWeight: 700 }}>
                      📍 {cur.cosmosHotspotName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Physiological & Cosmic Mapping Card */}
              {/* Triple Mirror Mapping: Body (Microcosm), Mind (Antaḥkaraṇa), and Cosmos (Macrocosm) */}
              <div style={{ margin: '0.85rem 0 0.35rem', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, background: 'rgba(30,27,75,0.4)', padding: '0.65rem 0.95rem', borderRadius: '10px', borderLeft: `3px solid ${cur.color}` }}>
                💡 <strong>The Vedic Ontological Law: </strong>Your physical body is fashioned from the gross, heavy ingredients of the elements (solids, fluids, heat).
                Meanwhile, your inner mind (<em>Antaḥkaraṇa</em>) is composed of the <strong>subtlest, invisible whisper (sūkṣma-bhūta)</strong> of those exact same five elements!
              </div>

              <div className="vl-mirror-detail-card" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                {/* 1. Body */}
                <div className="vl-mirror-detail-block" style={{ borderLeftColor: '#f97316' }}>
                  <div className="vl-mirror-detail-label" style={{ color: '#fb923c' }}>🫁 GROSS BODY (STHŪLA-PIṆḌA)</div>
                  <div className="vl-mirror-detail-title">{cur.bodyOrganTitle}</div>
                  <p className="vl-mirror-detail-text">{cur.bodyLocations}</p>
                  <p className="vl-mirror-detail-text" style={{ marginTop: '0.35rem', color: '#94a3b8' }}>
                    <strong>Biological role: </strong>{cur.bodyPhysiology}
                  </p>
                  <div style={{ marginTop: '0.45rem', fontSize: '0.78rem', color: '#fb923c', fontFamily: 'Noto Sans Devanagari, serif' }}>
                    {cur.sanskritBodyTerms}
                  </div>
                </div>

                {/* 2. Mind */}
                <div className="vl-mirror-detail-block" style={{ borderLeftColor: '#c084fc' }}>
                  <div className="vl-mirror-detail-label" style={{ color: '#c084fc' }}>🧠 INNER MIND (ANTAḤKARAṆA)</div>
                  <div className="vl-mirror-detail-title">{cur.mindFacultyTitle}</div>
                  <p className="vl-mirror-detail-text">{cur.mindManifestation}</p>
                  <p className="vl-mirror-detail-text" style={{ marginTop: '0.35rem', color: '#94a3b8' }}>
                    <strong>Psychological role: </strong>{cur.mindPsychology}
                  </p>
                  <div style={{ marginTop: '0.45rem', fontSize: '0.78rem', color: '#c084fc', fontFamily: 'Noto Sans Devanagari, serif' }}>
                    {cur.sanskritMindTerms}
                  </div>
                </div>

                {/* 3. Cosmos */}
                <div className="vl-mirror-detail-block" style={{ borderLeftColor: cur.color }}>
                  <div className="vl-mirror-detail-label" style={{ color: cur.color }}>🌌 COSMIC REALM (BRAHMĀṆḌA)</div>
                  <div className="vl-mirror-detail-title">{cur.cosmosRealmTitle}</div>
                  <p className="vl-mirror-detail-text">{cur.cosmosLocations}</p>
                  <p className="vl-mirror-detail-text" style={{ marginTop: '0.35rem', color: '#94a3b8' }}>
                    <strong>Ecological role: </strong>{cur.cosmosAstronomy}
                  </p>
                  <div style={{ marginTop: '0.45rem', fontSize: '0.78rem', color: cur.color, fontFamily: 'Noto Sans Devanagari, serif' }}>
                    {cur.sanskritCosmosTerms}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 🕹️ [ FEATURE: THE MACRO-MICRO BRIDGE (UNIVERSE <-> BODY <-> MIND) ] */}
      <section className="vl-macro-micro-bridge-panel" aria-label="The Macro-Micro Bridge">
        <div className="vl-bridge-header">
          <div>
            <h3 className="vl-bridge-title">
              <span>🌉 THE MACRO-MICRO BRIDGE (ब्रह्माण्ड-पिण्ड-मनस् समन्वयः)</span>
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#cbd5e1' }}>
              Observe how an environmental shift in outer nature simultaneously reverberates across your physical body and psychological mental state.
            </p>
          </div>
          <span className="vl-hud-pill">THE TRIPLE REALITY MATRIX</span>
        </div>

        {/* Environmental State Selector Tabs */}
        <div className="vl-bridge-env-tabs">
          {MACRO_MICRO_SCENARIOS.map((scn) => (
            <button
              key={scn.id}
              type="button"
              className={`vl-bridge-env-tab${selectedBridgeEnv === scn.id ? ' is-active' : ''}`}
              onClick={() => {
                setSelectedBridgeEnv(scn.id);
                soundEffects.playPuzzleSnap();
              }}
            >
              <span>{scn.icon}</span>
              <span>{scn.title}</span>
            </button>
          ))}
        </div>

        {/* Synchronized 3-Column Triad Display */}
        {(() => {
          const activeScn = MACRO_MICRO_SCENARIOS.find((s) => s.id === selectedBridgeEnv)!;
          return (
            <div>
              <div className="vl-bridge-triad-grid">
                {/* 1. Outer Physical Reality */}
                <div className="vl-bridge-column vl-bridge-column--nature">
                  <div className="vl-bridge-col-header">
                    <span className="vl-bridge-col-title">
                      <span>🔬</span> OUTER PHYSICAL REALITY
                    </span>
                    <span className="vl-bridge-col-badge">BRAHMĀṆḌA</span>
                  </div>
                  <div className="vl-bridge-card-headline" style={{ color: '#38bdf8' }}>
                    {activeScn.outerUniverse.event}
                  </div>
                  <p className="vl-bridge-card-desc">
                    {activeScn.outerUniverse.details}
                  </p>
                  <div className="vl-bridge-tag-pill">
                    SHIFT: {activeScn.outerUniverse.bhutaShifts}
                  </div>
                </div>

                {/* 2. Physical Body System */}
                <div className="vl-bridge-column vl-bridge-column--body">
                  <div className="vl-bridge-col-header">
                    <span className="vl-bridge-col-title">
                      <span>🫁</span> PHYSICAL BODY SYSTEM
                    </span>
                    <span className="vl-bridge-col-badge">STHŪLA-PIṆḌA</span>
                  </div>
                  <div className="vl-bridge-card-headline" style={{ color: '#fb923c' }}>
                    {activeScn.innerBody.reaction}
                  </div>
                  <p className="vl-bridge-card-desc">
                    {activeScn.innerBody.physiologicalDetails}
                  </p>
                  <div className="vl-bridge-tag-pill" style={{ color: '#fb923c', background: 'rgba(249, 115, 22, 0.1)' }}>
                    TARGET: {activeScn.innerBody.organsImpacted}
                  </div>
                </div>

                {/* 3. Inner Mental Reality */}
                <div className="vl-bridge-column vl-bridge-column--mind">
                  <div className="vl-bridge-col-header">
                    <span className="vl-bridge-col-title">
                      <span>🧠</span> INNER MENTAL REALITY
                    </span>
                    <span className="vl-bridge-col-badge">ANTAḤKARAṆA</span>
                  </div>
                  <div className="vl-bridge-card-headline" style={{ color: '#c084fc' }}>
                    {activeScn.innerMind.reaction}
                  </div>
                  <p className="vl-bridge-card-desc">
                    {activeScn.innerMind.psychologicalDetails}
                  </p>
                  <div className="vl-bridge-tag-pill" style={{ color: '#c084fc', background: 'rgba(192, 132, 252, 0.1)' }}>
                    FACULTY: {activeScn.innerMind.facultyImpacted}
                  </div>
                </div>
              </div>

              {/* Sage Kaṇāda & Bodhi Real-Time Insight Banner */}
              <div className="vl-bridge-sage-banner">
                <div className="vl-bridge-sage-avatar" aria-hidden="true">
                  🧙‍♂️
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: '#e9d5ff', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    महर्षि-कणाद उवाच · SAGE KAṆĀDA'S SYNTHESIS
                  </div>
                  <p className="vl-bridge-sage-quote">{activeScn.sageInsight}</p>
                  <p className="vl-bridge-sage-remedy">
                    <strong>🧘 Harmonizing Sadhana: </strong>{activeScn.harmonizingAction}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 🧠 ⚡ [ THE NEURO-BHŪTA MATRIX: HOW THE FIVE ELEMENTS SHAPE YOUR BRAIN & MIND ] */}
      <section className="vl-neuro-matrix-panel" aria-label="The Neuro-Bhūta Matrix">
        <div className="vl-neuro-header">
          <div>
            <div className="vl-kicker" style={{ color: '#c084fc', marginBottom: '0.25rem' }}>
              <span>🧠 VEDIC PSYCHOPHYSIOLOGY · PSYCHE & SOMA CONTINUUM</span>
            </div>
            <h3 className="vl-neuro-title">
              <span>THE NEURO-BHŪTA MATRIX: HOW THE 5 ELEMENTS SHAPE YOUR BRAIN & MIND</span>
            </h3>
            <p className="vl-neuro-subtitle">
              Beyond Cartesian dualism: Vaiśeṣika physics and Sāṅkhya philosophy revealed thousands of years before the EEG that your mind is not an isolated ghost.
              The Pañcabhūtas construct your brain ventricles, fire action potentials at 250 mph, combust glucose, and format your conscious thoughts.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <PronounceButton dev="चित्ताकाश" iast="Chittākāśa" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="बुद्धि" iast="Buddhi" activeWord={activeAudioWord} onPronounce={handlePronounce} />
            <PronounceButton dev="संस्कार" iast="Saṃskāra" activeWord={activeAudioWord} onPronounce={handlePronounce} />
          </div>
        </div>

        {/* 1. Paradigm Contrast: Cartesian Dualism vs Vedic Continuous Psychophysiology Loop */}
        <div className="vl-neuro-paradigm-grid">
          <div className="vl-paradigm-card vl-paradigm-card--cartesian">
            <div className="vl-paradigm-badge" style={{ color: '#ef4444' }}>
              ❌ CARTESIAN DUALISM (17th CENTURY)
            </div>
            <h4 style={{ color: '#f87171', margin: '0.35rem 0 0.45rem', fontSize: '0.98rem' }}>
              The "Ghost in the Mechanical Machine"
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
              For centuries, Western science treated body and mind as two completely alien entities: the body is a mechanical clockwork machine, and the mind is an abstract ghost trapped inside skull bone.
            </p>
          </div>
          <div className="vl-paradigm-card vl-paradigm-card--vedic">
            <div className="vl-paradigm-badge" style={{ color: '#4ade80' }}>
              ✓ VAIŚEṢIKA & SĀṄKHYA PSYCHOPHYSIOLOGY
            </div>
            <h4 style={{ color: '#86efac', margin: '0.35rem 0 0.45rem', fontSize: '0.98rem' }}>
              The Continuous Reality Loop (Prakṛti & Antaḥkaraṇa)
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
              The Rishis mapped a single continuous continuum: your gross body is made from the heavy mineral aspect of the elements; your inner mind (<em>Antaḥkaraṇa</em>) is made of their subtlest, invisible vibrations.
            </p>
          </div>
        </div>

        {/* 2. The Universal Architecture: The Cosmic Lego Baseplate & The 3 Ākāśas */}
        <div className="vl-akasha-portal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🧩 1. The Cosmic Lego Baseplate & The Three Ākāśas</span>
              </h4>
              <p style={{ margin: '0.3rem 0 0', fontSize: '0.84rem', color: '#cbd5e1', maxWidth: '48rem', lineHeight: 1.5 }}>
                Before a child can snap a single plastic brick together to build a castle, they first need that big, flat, green <strong>Lego Baseplate</strong>.
                Without it, the blocks have nowhere to stand, no room to move, and no way to connect. In Vedic science, <strong>Ākāśa (Space)</strong> is that cosmic baseplate:
                pure silent potentiality allowing all other blocks to snap into reality!
              </p>
            </div>
            <span className="vl-hud-pill" style={{ color: '#facc15', borderColor: '#facc1566' }}>TRIPLE SPATIAL MATRIX</span>
          </div>

          {/* Lego Blocks Tray */}
          <div className="vl-lego-blocks-row">
            <span style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>Structural Blocks:</span>
            <span className="vl-lego-block-chip" style={{ background: 'rgba(124, 58, 237, 0.2)', color: '#c084fc', border: '1px solid #7c3aed66' }}>
              🌬️ Vāyu (Air): Kinetic Force & Movement
            </span>
            <span className="vl-lego-block-chip" style={{ background: 'rgba(234, 88, 12, 0.2)', color: '#fb923c', border: '1px solid #ea580c66' }}>
              🔥 Tejas (Fire): Transformation & Heat
            </span>
            <span className="vl-lego-block-chip" style={{ background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', border: '1px solid #0284c766' }}>
              💧 Ap (Water): Fluid Cohesive Binder
            </span>
            <span className="vl-lego-block-chip" style={{ background: 'rgba(217, 119, 6, 0.2)', color: '#fcd34d', border: '1px solid #d9770666' }}>
              🪨 Pṛthivī (Earth): Solid Structural Mass
            </span>
          </div>

          {/* 3 Akasha Tabs */}
          <div className="vl-akasha-tabs">
            {AKASHA_DIMENSIONS.map((dim) => (
              <button
                key={dim.id}
                type="button"
                className={`vl-akasha-tab${activeAkashaDim === dim.id ? ' is-active' : ''}`}
                onClick={() => {
                  setActiveAkashaDim(dim.id);
                  soundEffects.playPuzzleSnap();
                }}
                style={{ borderColor: activeAkashaDim === dim.id ? dim.color : undefined }}
              >
                <span>{dim.icon}</span>
                <span lang="sa" style={{ fontWeight: 800 }}>{dim.dev}</span>
                <span>({dim.iast})</span>
              </button>
            ))}
          </div>

          {/* Active Akasha Dimensional Card */}
          {(() => {
            const curDim = AKASHA_DIMENSIONS.find((d) => d.id === activeAkashaDim)!;
            return (
              <div className="vl-akasha-content-card" style={{ borderLeftColor: curDim.color }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                    <h5 style={{ margin: 0, fontSize: '1.05rem', color: curDim.color, fontWeight: 800 }}>
                      {curDim.icon} {curDim.title} ({curDim.en})
                    </h5>
                    <span className="vl-hud-pill" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                      {curDim.plane}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 0.65rem', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                    {curDim.description}
                  </p>
                  <div style={{ background: 'rgba(30, 27, 75, 0.5)', padding: '0.55rem 0.85rem', borderRadius: '8px', borderLeft: `3px solid ${curDim.color}`, marginBottom: '0.55rem' }}>
                    <div style={{ fontSize: '0.76rem', color: curDim.color, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
                      🧩 THE LEGO BASEPLATE ANALOGY:
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#f1f5f9', fontStyle: 'italic', marginTop: '0.2rem' }}>
                      {curDim.legoAnalogy}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    <strong>🧠 Neurobiological Significance: </strong>{curDim.neuroSignificance}
                  </div>
                </div>

                {/* Concentric 3-Akasha Graphic */}
                <div style={{ width: '130px', height: '130px', flexShrink: 0, margin: 'auto' }}>
                  <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%' }}>
                    {/* Outer: Bhūtākāśa */}
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#38bdf8" strokeWidth={curDim.id === 'bhuta' ? '3' : '1.5'} strokeDasharray={curDim.id === 'bhuta' ? 'none' : '3 2'} opacity={curDim.id === 'bhuta' ? 1 : 0.4} />
                    {/* Middle: Chittākāśa */}
                    <circle cx="60" cy="60" r="36" fill="none" stroke="#c084fc" strokeWidth={curDim.id === 'chitta' ? '3' : '1.5'} strokeDasharray={curDim.id === 'chitta' ? 'none' : '3 2'} opacity={curDim.id === 'chitta' ? 1 : 0.4} />
                    {/* Core: Chidākāśa */}
                    <circle cx="60" cy="60" r="18" fill={curDim.id === 'chida' ? '#facc15' : 'rgba(250, 204, 21, 0.3)'} stroke="#eab308" strokeWidth="2" />
                    <text x="60" y="64" textAnchor="middle" fill="#000" fontSize="10" fontWeight="900">ॐ</text>
                  </svg>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 3. The Neuro-Bhūta Spectrum: The Anatomy of a Thought */}
        <div className="vl-neuro-spectrum-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🔬 2. The Anatomy of a Thought: The Brain as an Element Matrix</span>
              </h4>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                Inside your skull, the elements operate on three levels simultaneously: Structural (Physical), Functional (Physiological), and Experiential (Mental).
              </p>
            </div>
            <span className="vl-hud-pill" style={{ color: '#38bdf8', borderColor: '#38bdf866' }}>
              3-TIER PSYCHOPHYSIOLOGY
            </span>
          </div>

          {/* Element Selector Tabs */}
          <div className="vl-neuro-element-tabs">
            {NEURO_BHUTA_SPECTRUM.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`vl-neuro-el-tab${selectedNeuroBhuta === item.id ? ' is-active' : ''}`}
                onClick={() => {
                  setSelectedNeuroBhuta(item.id);
                  soundEffects.playPuzzleSnap();
                }}
                style={{
                  borderColor: selectedNeuroBhuta === item.id ? item.color : undefined,
                  background: selectedNeuroBhuta === item.id ? `${item.color}25` : undefined,
                }}
              >
                <span>{item.icon}</span>
                <span lang="sa" style={{ fontWeight: 800 }}>{item.dev}</span>
                <span>({item.iast})</span>
              </button>
            ))}
          </div>

          {/* Active Neuro Element 3-Tier Grid */}
          {(() => {
            const curEl = NEURO_BHUTA_SPECTRUM.find((e) => e.id === selectedNeuroBhuta)!;
            return (
              <div>
                <div style={{ marginBottom: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.94rem', color: curEl.color, fontWeight: 700 }}>
                    {curEl.icon} {curEl.dev} ({curEl.iast}) — {curEl.tagline}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic', fontFamily: 'Noto Sans Devanagari, serif' }}>
                    {curEl.sutraQuote}
                  </span>
                </div>

                <div className="vl-neuro-triad-grid">
                  {/* Tier 1: Physical / Gross Matter */}
                  <div className="vl-neuro-tier-card vl-neuro-tier-card--physical">
                    <div className="vl-neuro-tier-header">
                      <span className="vl-neuro-tier-title" style={{ color: '#38bdf8' }}>
                        🧬 PHYSICAL LAYER
                      </span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: '#94a3b8' }}>
                        GROSS MATTER
                      </span>
                    </div>
                    {/* Mini Anatomical SVG Beacon */}
                    <div className="vl-brain-locus-box">
                      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                        {/* Stylized Brain Hemisphere Outline */}
                        <path d="M20,55 C15,40 25,20 50,18 C75,16 85,35 80,55 C78,70 65,80 50,82 C35,80 22,70 20,55 Z" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                        {/* Inner sulci curves */}
                        <path d="M30,45 Q45,35 55,48 T70,40" fill="none" stroke="#475569" strokeWidth="1.5" />
                        <path d="M35,60 Q50,68 65,58" fill="none" stroke="#475569" strokeWidth="1.5" />
                        {/* Highlighted Locus */}
                        {curEl.id === 'akasha' && (
                          <g>
                            <ellipse cx="50" cy="50" rx="10" ry="16" fill={curEl.color} opacity="0.8" />
                            <circle cx="50" cy="50" r="14" fill="none" stroke="#fff" strokeWidth="1.5" className="vl-hotspot-pulse" />
                          </g>
                        )}
                        {curEl.id === 'vayu' && (
                          <g>
                            <path d="M28,50 L48,32 L68,48 L52,70 Z" fill="none" stroke={curEl.color} strokeWidth="3" strokeDasharray="3 2" />
                            <circle cx="48" cy="32" r="5" fill="#facc15" />
                            <circle cx="68" cy="48" r="5" fill="#facc15" />
                          </g>
                        )}
                        {curEl.id === 'tejas' && (
                          <g>
                            <circle cx="50" cy="48" r="12" fill={curEl.color} />
                            <path d="M50,30 L55,42 L45,42 Z" fill="#fef08a" />
                            <circle cx="50" cy="48" r="18" fill="none" stroke="#f97316" strokeWidth="2" className="vl-hotspot-pulse" />
                          </g>
                        )}
                        {curEl.id === 'ap' && (
                          <g>
                            <path d="M20,55 C15,40 25,20 50,18 C75,16 85,35 80,55" fill="none" stroke={curEl.color} strokeWidth="4" />
                            <ellipse cx="50" cy="72" rx="18" ry="6" fill={curEl.color} opacity="0.6" />
                          </g>
                        )}
                        {curEl.id === 'prthivi' && (
                          <g>
                            <rect x="36" y="38" width="28" height="28" rx="4" fill={curEl.color} stroke="#fbbf24" strokeWidth="2" />
                            <circle cx="50" cy="52" r="8" fill="#78350f" />
                          </g>
                        )}
                      </svg>
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.25rem' }}>
                      {curEl.physical.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Anatomy: {curEl.physical.anatomy}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                      {curEl.physical.detail}
                    </p>
                  </div>

                  {/* Tier 2: Physiological / Dynamic Electricity & Fluid */}
                  <div className="vl-neuro-tier-card vl-neuro-tier-card--physiological">
                    <div className="vl-neuro-tier-header">
                      <span className="vl-neuro-tier-title" style={{ color: '#f59e0b' }}>
                        ⚡ PHYSIOLOGICAL LAYER
                      </span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: '#94a3b8' }}>
                        DYNAMIC ACTION
                      </span>
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.25rem' }}>
                      {curEl.physiological.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#fbbf24', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Mechanism: {curEl.physiological.mechanism}
                    </div>
                    <p style={{ margin: '0 0 0.65rem', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                      {curEl.physiological.detail}
                    </p>
                    <div style={{ marginTop: 'auto', background: 'rgba(245, 158, 11, 0.1)', padding: '0.45rem 0.65rem', borderRadius: '6px', borderLeft: '3px solid #f59e0b' }}>
                      <span style={{ fontSize: '0.74rem', color: '#fef3c7' }}>
                        🔬 <strong>Neuro-Fact: </strong>{curEl.neuroScientificFact}
                      </span>
                    </div>
                  </div>

                  {/* Tier 3: Experiential / Subtle Mental Faculty (Antaḥkaraṇa) */}
                  <div className="vl-neuro-tier-card vl-neuro-tier-card--mental">
                    <div className="vl-neuro-tier-header">
                      <span className="vl-neuro-tier-title" style={{ color: '#c084fc' }}>
                        🧘 EXPERIENTIAL LAYER
                      </span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: '#94a3b8' }}>
                        ANTAḤKARAṆA
                      </span>
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.25rem' }}>
                      {curEl.mental.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#c084fc', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Faculty: {curEl.mental.faculty}
                    </div>
                    <p style={{ margin: '0 0 0.55rem', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                      {curEl.mental.detail}
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <div style={{ fontSize: '0.76rem', color: '#86efac', background: 'rgba(34, 197, 94, 0.1)', padding: '0.3rem 0.55rem', borderRadius: '4px' }}>
                        <strong>Balanced: </strong>{curEl.mental.balanced}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#fca5a5', background: 'rgba(239, 68, 68, 0.1)', padding: '0.3rem 0.55rem', borderRadius: '4px' }}>
                        <strong>Imbalanced: </strong>{curEl.mental.imbalanced}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 4. Interactive "Neuro-State Scanner & Balancer" */}
        <div className="vl-neuro-state-scanner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🕹️ 3. Neuro-State Scanner: Diagnose Your Brain-Wave Bhūta Fluctuation</span>
              </h4>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#cbd5e1' }}>
                Select an internal mental state to examine its neurochemical element spectrum and receive an authentic Vedic psychophysiological harmonizer.
              </p>
            </div>
            <span className="vl-hud-pill" style={{ color: '#a855f7', borderColor: '#a855f766' }}>
              REAL-TIME NEURO-FEEDBACK
            </span>
          </div>

          {/* Neuro-State Selector Tabs */}
          <div className="vl-neuro-state-tabs">
            {NEURO_STATE_PROFILES.map((st) => (
              <button
                key={st.id}
                type="button"
                className={`vl-neuro-state-tab${selectedNeuroState === st.id ? ' is-active' : ''}`}
                onClick={() => {
                  setSelectedNeuroState(st.id);
                  soundEffects.playPuzzleSnap();
                }}
              >
                <span>{st.icon}</span>
                <span>{st.name}</span>
              </button>
            ))}
          </div>

          {/* Scanner Dashboard */}
          {(() => {
            const curState = NEURO_STATE_PROFILES.find((s) => s.id === selectedNeuroState)!;
            return (
              <div className="vl-scanner-dashboard">
                {/* Left: Elemental Meters & EEG Waveform */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: curState.themeColor }}>
                      {curState.icon} {curState.name}
                    </div>
                    <span style={{ fontSize: '0.74rem', fontFamily: 'JetBrains Mono, monospace', color: '#94a3b8' }}>
                      {curState.sanskrit}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 0.65rem', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    {curState.summary}
                  </p>

                  <div className="vl-meter-group">
                    <div className="vl-meter-row">
                      <span className="vl-meter-label" style={{ color: '#6366f1' }}>🌌 Ākāśa</span>
                      <div className="vl-meter-bar-track">
                        <div className="vl-meter-bar-fill" style={{ width: `${curState.levels.akasha}%`, background: '#6366f1' }} />
                      </div>
                      <span className="vl-meter-val">{curState.levels.akasha}%</span>
                    </div>

                    <div className="vl-meter-row">
                      <span className="vl-meter-label" style={{ color: '#8b5cf6' }}>🌬️ Vāyu</span>
                      <div className="vl-meter-bar-track">
                        <div className="vl-meter-bar-fill" style={{ width: `${curState.levels.vayu}%`, background: '#8b5cf6' }} />
                      </div>
                      <span className="vl-meter-val">{curState.levels.vayu}%</span>
                    </div>

                    <div className="vl-meter-row">
                      <span className="vl-meter-label" style={{ color: '#ea580c' }}>🔥 Tejas</span>
                      <div className="vl-meter-bar-track">
                        <div className="vl-meter-bar-fill" style={{ width: `${curState.levels.tejas}%`, background: '#ea580c' }} />
                      </div>
                      <span className="vl-meter-val">{curState.levels.tejas}%</span>
                    </div>

                    <div className="vl-meter-row">
                      <span className="vl-meter-label" style={{ color: '#0284c7' }}>💧 Ap</span>
                      <div className="vl-meter-bar-track">
                        <div className="vl-meter-bar-fill" style={{ width: `${curState.levels.ap}%`, background: '#0284c7' }} />
                      </div>
                      <span className="vl-meter-val">{curState.levels.ap}%</span>
                    </div>

                    <div className="vl-meter-row">
                      <span className="vl-meter-label" style={{ color: '#d97706' }}>🪨 Pṛthivī</span>
                      <div className="vl-meter-bar-track">
                        <div className="vl-meter-bar-fill" style={{ width: `${curState.levels.prthivi}%`, background: '#d97706' }} />
                      </div>
                      <span className="vl-meter-val">{curState.levels.prthivi}%</span>
                    </div>
                  </div>

                  {/* EEG Monitor Simulation */}
                  <div className="vl-eeg-monitor-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', color: '#38bdf8', fontWeight: 800 }}>
                        EEG OSCILLOSCOPE: {curState.brainWave}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                        DOMINANT: {curState.dominantBhuta}
                      </span>
                    </div>
                    <svg viewBox="0 0 300 45" style={{ width: '100%', height: '40px', display: 'block' }}>
                      <line x1="0" y1="22" x2="300" y2="22" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
                      {curState.id === 'anxiety-panic' && (
                        <path
                          d="M0,22 Q15,4 30,22 T60,38 T90,6 T120,38 T150,4 T180,38 T210,6 T240,38 T270,4 T300,22"
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="2.5"
                          className="vl-eeg-path"
                        />
                      )}
                      {curState.id === 'focused-intellect' && (
                        <path
                          d="M0,22 Q8,10 16,22 T32,32 T48,12 T64,32 T80,12 T96,32 T112,12 T128,32 T144,12 T160,32 T176,12 T192,32 T208,12 T224,32 T240,12 T256,32 T272,12 T288,32 T300,22"
                          fill="none"
                          stroke="#ea580c"
                          strokeWidth="2"
                          className="vl-eeg-path"
                        />
                      )}
                      {curState.id === 'emotional-grief' && (
                        <path
                          d="M0,22 Q35,8 70,22 T140,36 T210,8 T280,36 T300,22"
                          fill="none"
                          stroke="#0284c7"
                          strokeWidth="3"
                          className="vl-eeg-path"
                        />
                      )}
                      {curState.id === 'mental-fog-inertia' && (
                        <path
                          d="M0,22 Q60,18 120,22 T240,26 T300,22"
                          fill="none"
                          stroke="#d97706"
                          strokeWidth="3.5"
                          className="vl-eeg-path"
                        />
                      )}
                      {curState.id === 'meditative-spaciousness' && (
                        <path
                          d="M0,22 Q25,12 50,22 T100,32 T150,12 T200,32 T250,12 T300,22"
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="2.5"
                          className="vl-eeg-path"
                        />
                      )}
                    </svg>
                  </div>
                </div>

                {/* Right: Cognitive Experience & Vedic Neuro-Sādhana */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.75rem 0.95rem', borderRadius: '10px', border: '1px solid rgba(148, 163, 184, 0.15)' }}>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      COGNITIVE EXPERIENCE
                    </div>
                    <p style={{ margin: 0, fontSize: '0.83rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                      {curState.experience}
                    </p>
                    <div style={{ marginTop: '0.35rem', fontSize: '0.74rem', color: '#94a3b8' }}>
                      <strong>EEG Firing Signature: </strong>{curState.eegPattern}
                    </div>
                  </div>

                  {/* Vedic Neuro-Sādhana Card */}
                  <div className="vl-neuro-sadhana-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>🧘</span>
                      <strong style={{ fontSize: '0.9rem', color: '#e9d5ff' }}>
                        VEDIC NEURO-SĀDHANA: {curState.vedicRemedy.sadhana}
                      </strong>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '0.45rem' }}>
                      <strong>Scientific Mechanism: </strong>{curState.vedicRemedy.scienceWhy}
                    </div>
                    <div style={{ background: 'rgba(168, 85, 247, 0.18)', padding: '0.45rem 0.75rem', borderRadius: '6px', borderLeft: '3px solid #c084fc' }}>
                      <div style={{ fontSize: '0.74rem', color: '#e9d5ff', fontWeight: 800 }}>
                        ACTIONABLE PRACTICE:
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#f3e8ff', marginTop: '0.15rem' }}>
                        {curState.vedicRemedy.actionablePractice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 5. Axiom Finale: "Yat Piṇḍe Tat Brahmāṇḍe" */}
        <div className="vl-neuro-axiom-footer">
          <div className="vl-axiom-symbol" aria-hidden="true">
            🌌
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fef08a' }} lang="sa">
              यत् पिण्डे तत् ब्रह्माण्डे · Yat Piṇḍe Tat Brahmāṇḍe
            </div>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.6 }}>
              The lightning storm flashing in the summer sky is identical to the rapid firing of electrical Vāyu impulses during a panic attack.
              The volcanic magma bubbling under the Earth's crust is the exact same chemical Tejas driving the stomach acid of your digestive fire.
              By building tools like the <strong>Paramāṇu Builder</strong>, we are stepping inside the interactive control room of our own consciousness.
              <strong> When you learn to balance the elements in your environment, you are directly balancing the elements formatting your thoughts.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 🕹️ [ NEW: THE BIO-COSMIC BALANCER MINI-GAME ] */}
      <section className="vl-balancer-panel" aria-label="Bio-Cosmic Balancer Game">
        <div className="vl-balancer-header">
          <div>
            <h3 className="vl-balancer-title">
              <span>⚖️ BIO-COSMIC BALANCER (ऋतु-चर्या शरीर-सन्तुलनम्)</span>
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.84rem', color: '#cbd5e1' }}>
              When cosmic environmental forces surge in nature, your internal body system shifts. Can you restore dynamic equilibrium?
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="vl-hud-pill">SCORE: {balancerScore}</span>
            <span className="vl-hud-pill" style={{ color: '#fbbf24', borderColor: '#f59e0b' }}>
              🔥 STREAK: {balancerStreak}
            </span>
          </div>
        </div>

        {/* Current Universe Crisis Banner */}
        {(() => {
          const scn = BALANCER_SCENARIOS[balancerScenarioIndex];
          return (
            <div>
              <div
                className="vl-balancer-scenario-banner"
                style={{ borderColor: scn.borderTint, background: `linear-gradient(135deg, ${scn.borderTint}22 0%, #0b1220 100%)` }}
              >
                <div className="vl-balancer-scenario-title" style={{ color: scn.themeColor }}>
                  <span>{scn.icon}</span>
                  <span>CURRENT UNIVERSE STATE: [{scn.title}]</span>
                  <span style={{ fontSize: '0.8em', color: '#94a3b8', marginLeft: 'auto' }}>
                    {scn.seasonSanskrit} · {scn.seasonEn}
                  </span>
                </div>
                <p className="vl-balancer-scenario-desc">
                  {scn.universeCrisis}
                </p>
                <div style={{ marginTop: '0.45rem', fontSize: '0.85rem', color: '#fca5a5', fontWeight: 700 }}>
                  ⚠️ {scn.statusWarning}
                </div>
              </div>

              {/* Internal Elemental Telemetry Gauges */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: '#38bdf8' }}>
                  🧘 INTERNAL BIO-SYSTEM STATUS (HOMEOSTASIS BAND: 40%–60%):
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Green = Equilibrium · Red = Pathology</span>
              </div>

              <div className="vl-balancer-gauges-grid">
                {(['prthivi', 'ap', 'tejas', 'vayu', 'akasha'] as MirrorBhuta[]).map((b) => {
                  const val = currentBioLevels[b];
                  const isSafe = val >= 38 && val <= 62;
                  const info = BHUTA_INFO[b === 'akasha' ? 'prthivi' : b];
                  const col = b === 'akasha' ? '#818cf8' : info.color;
                  return (
                    <div key={b} className="vl-balancer-gauge-card" style={{ borderColor: isSafe ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.4)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 800 }}>
                        <span style={{ color: col }}>
                          {b === 'akasha' ? '🌌 Ākāśa' : `${BHUTA_INFO[b].icon} ${BHUTA_INFO[b].iast}`}
                        </span>
                        <span style={{ color: isSafe ? '#86efac' : '#fca5a5', fontFamily: 'JetBrains Mono, monospace' }}>
                          {val}%
                        </span>
                      </div>
                      <div className="vl-balancer-gauge-bar-track">
                        <div
                          className="vl-balancer-gauge-bar-fill"
                          style={{
                            width: `${Math.min(100, Math.max(10, val))}%`,
                            background: isSafe
                              ? 'linear-gradient(90deg, #10b981 0%, #22c55e 100%)'
                              : 'linear-gradient(90deg, #f43f5e 0%, #ef4444 100%)',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: isSafe ? '#86efac' : '#fca5a5' }}>
                        {isSafe ? 'BALANCED' : val > 62 ? 'CRITICAL HIGH' : 'DEPLETED'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Task Header */}
              <div style={{ margin: '0.85rem 0 0.5rem', fontSize: '0.86rem', color: '#f8fafc', fontWeight: 800 }}>
                🛠️ TASK: Counteract the environmental surge! Select the appropriate Ayurvedic / elemental remedy:
              </div>

              {/* Remedy Choice Cards */}
              <div className="vl-balancer-remedies-grid">
                {scn.remedies.map((rem) => (
                  <button
                    key={rem.id}
                    type="button"
                    className="vl-balancer-remedy-btn"
                    disabled={balancerFeedback?.status === 'success'}
                    onClick={() => handleApplyRemedy(rem)}
                  >
                    <div className="vl-balancer-remedy-title">
                      <span>{rem.title}</span>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                      TAG: {rem.bhutaTag}
                    </span>
                    <p className="vl-balancer-remedy-desc">{rem.desc}</p>
                  </button>
                ))}
              </div>

              {/* Guru Result Feedback Banner */}
              {balancerFeedback && (
                <div className={`vl-balancer-feedback-banner ${balancerFeedback.status === 'success' ? 'is-success' : 'is-fail'}`}>
                  <div style={{ fontSize: '2rem', flexShrink: 0 }}>
                    {balancerFeedback.status === 'success' ? '🎉' : '💨'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.96rem', marginBottom: '0.25rem' }}>
                      {balancerFeedback.status === 'success' ? '✓ EXCELLENT RECOVERY!' : '⚡ ELEMENTAL IMBALANCE!'}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.5 }}>
                      {balancerFeedback.msg}
                    </p>
                    {balancerFeedback.trivia && (
                      <div style={{ marginTop: '0.45rem', fontSize: '0.82rem', opacity: 0.9, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.4rem' }}>
                        💡 <strong>Health Wisdom: </strong>{balancerFeedback.trivia}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="vl-btn vl-btn--cyber"
                    onClick={advanceToNextScenario}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', alignSelf: 'center' }}
                  >
                    {balancerFeedback.status === 'success' ? 'Next Cosmic Event ➔' : 'Try Again 🔄'}
                  </button>
                </div>
              )}
            </div>
          );
        })()}
      </section>
        </>
      )}

      {/* =========================================================================
          SECTOR 4: 📜 TIMELINE & HISTORY OF ATOMIC THEORY (COMBINED SUITE)
          ========================================================================= */}
      {activeSector === 'history' && (
        <>
          {/* Integrated History Suite Sub-Navigation */}
          <div className="vl-history-suite-nav" role="tablist" aria-label="History of Atomism Views">
            <button
              type="button"
              role="tab"
              aria-selected={historySubView === 'timeline'}
              className={`vl-history-sub-tab${historySubView === 'timeline' ? ' is-active' : ''}`}
              onClick={() => {
                setHistorySubView('timeline');
                soundEffects.playPuzzleSnap();
              }}
            >
              📜 2,600-Year Atomic Timeline & Simulator
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={historySubView === 'pilupaka_lab'}
              className={`vl-history-sub-tab${historySubView === 'pilupaka_lab' ? ' is-active' : ''}`}
              onClick={() => {
                setHistorySubView('pilupaka_lab');
                soundEffects.playElementSummon('tejas');
              }}
            >
              🔥 Kaṇāda&apos;s Pīlupāka Oven (Integrated Kiln Lab)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={historySubView === 'comparative'}
              className={`vl-history-sub-tab${historySubView === 'comparative' ? ' is-active' : ''}`}
              onClick={() => {
                setHistorySubView('comparative');
                soundEffects.playCelebrationChime();
              }}
            >
              ⚖️ Comparative Dialectic (Vedic vs Greek vs Dalton)
            </button>
          </div>

          {/* Sub-view 1: 📜 2,600-Year Timeline */}
          {historySubView === 'timeline' && (
            <section className="vl-timeline-section" aria-label="Timeline of Atomic Theory">
              <h3 className="vl-timeline-title">
                <span>⏳ KAṆĀDA’S OBSERVED TIMELINE (परमाणु-सिद्धान्तस्य विकासः)</span>
              </h3>
              <p style={{ margin: '0 0 0.85rem', fontSize: '0.86rem', color: '#fed7aa', lineHeight: 1.5 }}>
                Trace how Sage Kaṇāda’s conceptual foundations in 6th-century BCE India connect to Greek atomism,
                Dalton’s stoichiometry, and quantum field theory. Kaṇāda derived his system from philosophical logic (<em>Anumāna</em>)
                and acute observation (<em>Pratyakṣa</em>) rather than modern particle colliders.
              </p>

              {/* Timeline Horizontal Stepper */}
              <div className="vl-timeline-slider-track">
                {TIMELINE_NODES.map((node, idx) => (
                  <div
                    key={node.name}
                    className={`vl-timeline-node${activeTimelineIndex === idx ? ' is-active' : ''}`}
                    onClick={() => setActiveTimelineIndex(idx)}
                  >
                    <div className="vl-timeline-node-era">{node.era}</div>
                    <div className="vl-timeline-node-name">{node.name}</div>
                    <div className="vl-timeline-node-core">{node.devanagari}</div>
                  </div>
                ))}
              </div>

              {/* Selected Milestone Deep-Dive Card */}
              {(() => {
                const sel = TIMELINE_NODES[activeTimelineIndex];
                return (
                  <div className="vl-timeline-detail-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#fef08a', fontWeight: 800 }}>
                          {sel.name} · <span lang="sa">{sel.devanagari}</span>
                        </h4>
                        <span style={{ fontSize: '0.82rem', color: '#fbbf24', fontFamily: 'JetBrains Mono, monospace' }}>
                          📍 {sel.location} · {sel.era}
                        </span>
                      </div>
                      <span className="vl-hud-pill">METHOD: {sel.method}</span>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem 0.95rem', borderRadius: '10px', marginBottom: '0.65rem', borderLeft: '3px solid #f59e0b' }}>
                      <strong style={{ color: '#f8fafc', fontSize: '0.92rem' }}>Core Discovery: </strong>
                      <span style={{ color: '#fed7aa', fontSize: '0.9rem' }}>{sel.coreIdea}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                      💡 <strong>Historical Context & Epistemic Value: </strong> {sel.insight}
                    </p>

                    {/* Epistemic Bridge Deep-Dive Callout */}
                    {sel.epistemicBridge && (
                      <div className="vl-epistemic-bridge-box">
                        <div className="vl-epistemic-bridge-header">
                          <span className="vl-epistemic-badge">EPISTEMOLOGICAL THRESHOLD</span>
                          <h4 className="vl-epistemic-title">
                            ✨ {sel.epistemicBridge.title}
                          </h4>
                          <div className="vl-epistemic-subhead">
                            {sel.epistemicBridge.subhead}
                          </div>
                        </div>
                        <p className="vl-epistemic-lead">
                          {sel.epistemicBridge.lead}
                        </p>
                        <div className="vl-epistemic-bullets-grid">
                          {sel.epistemicBridge.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="vl-epistemic-bullet-card">
                              <div className="vl-epistemic-bullet-title">
                                <span>{b.icon}</span>
                                <strong>{b.title}</strong>
                              </div>
                              <p className="vl-epistemic-bullet-desc">{b.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* 🎨 [ INTERACTIVE ATOMIC MODEL EVOLUTION SIMULATOR & GRAPHICS ] */}
              <AtomismHistoryVisualizer
                activeIndex={activeTimelineIndex}
                onSelectIndex={(idx) => setActiveTimelineIndex(idx)}
                onPronounce={handlePronounce}
              />
            </section>
          )}

          {/* Sub-view 2: 🔥 Kaṇāda's Pīlupāka Oven (Integrated Kiln Lab) */}
          {historySubView === 'pilupaka_lab' && (
            <section className="vl-timeline-section" aria-label="Integrated Pīlupāka Kiln Lab">
              <div className="vl-history-pilupaka-bridge-intro">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.45rem' }}>
                  <span className="vl-hud-pill">HISTORICAL CHEMICAL APPARATUS · 6TH C. BCE</span>
                  <strong style={{ color: '#fef08a', fontSize: '1.05rem' }}>
                    Sage Kaṇāda’s Pīlupāka Crucible: The Empirical Birth of Atomic Chemistry
                  </strong>
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#fed7aa', lineHeight: 1.6 }}>
                  Unlike Greek philosophers who posited atomism purely through abstract thought experiments, Sage Kaṇāda cited the physical earthenware kiln (भ्राष्ट्रम्) to demonstrate that macroscopic changes in color, smell, and ring occur because thermal Agni energy breaks dyadic bonds (<em>Vibhāga</em>) into individual atoms (<em>Paramāṇus</em>) before recombining them into new bonds (<em>Saṁyoga</em>). Operate Kaṇāda’s kiln and reconstruct macro-matter directly below:
                </p>
              </div>

              {/* Pīlupāka Chemical Heat Transformation Crucible */}
              <div
                className="vl-pilupaka-crucible"
                style={{
                  background: 'linear-gradient(180deg, #fffbeb 0%, #fff7ed 100%)',
                  border: '1.5px solid #fed7aa',
                  borderRadius: '16px',
                  padding: '1.15rem 1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  marginBottom: '1.25rem',
                  boxShadow: '0 8px 24px rgba(234, 88, 12, 0.12)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem' }}>
                  <div>
                    <strong style={{ color: '#c2410c', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>🔥 Pīlupāka Thermal Reactor (वैशेषिक पीलुपाक-प्रक्रिया)</span>
                    </strong>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.86rem', color: '#78350f', lineHeight: 1.55 }}>
                      Kaṇāda’s pioneering theory of chemical transformation: heat (Tejas) penetrates molecular bonds, dissociates dyads (vibhāga), and recombines atoms into baked terracotta pottery or ripened fruits.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <LedButton
                      kind="action"
                      color="#f97316"
                      disabled={isBaking}
                      onClick={triggerPilupaka}
                      testId="paramanu-pilupaka-btn"
                    >
                      {isBaking ? '⏳ Dissociating Bonds…' : '🔥 Trigger Pīlupāka Thermal Bake'}
                    </LedButton>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '0.75rem' }}>
                  <GlowSlider
                    label="तेजस् · Agni Heat Level"
                    value={agniHeat}
                    min={10}
                    max={100}
                    step={5}
                    onChange={setAgniHeat}
                    color="#ea580c"
                    valueText={`${Math.round(agniHeat)}% Heat (Tejas)`}
                  />
                  <span style={{ fontSize: '0.82rem', color: agniHeat > 60 ? '#c2410c' : '#b45309', fontWeight: 800 }}>
                    {agniHeat > 60 ? '⚡ High Agni: Sufficient for bond dissociation (Vibhāga)' : '🌡️ Warm Agni: Atoms remain bound'}
                  </span>
                </div>
              </div>

              {/* 🔬 [ THE RIGOROUS 3-STEP BHOOTA RECONSTRUCTOR ] */}
              <BhutaReconstructor
                initialBhuta={selectedMacroTarget}
                onSelectBhuta={setSelectedMacroTarget}
                unlockedBhutas={macroUnlocked}
                macroStock={macroTryanukaStock}
                onTryanukaForged={(bhuta) => forgeTryanukaForReconstructor(bhuta)}
                onBhutaMaterialized={(bhuta) => {
                  setMacroUnlocked((u) => ({ ...u, [bhuta]: true }));
                  setMacroTryanukaStock((prev) => ({ ...prev, [bhuta]: 3 }));
                  soundEffects.playCelebrationChime();
                }}
              />

              <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
                <button
                  type="button"
                  className="vl-btn vl-btn--gold"
                  onClick={() => {
                    setHistorySubView('timeline');
                    soundEffects.playPuzzleSnap();
                  }}
                  style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}
                >
                  📜 Return to 2,600-Year Timeline ➔
                </button>
              </div>
            </section>
          )}

          {/* Sub-view 3: ⚖️ Comparative Dialectic */}
          {historySubView === 'comparative' && (
            <section className="vl-timeline-section" aria-label="Comparative Dialectic">
              <div className="vl-comparative-dialectic-header">
                <span className="vl-hud-pill">CROSS-CIVILIZATION PHILOSOPHY</span>
                <h3 className="vl-timeline-title" style={{ marginTop: '0.4rem' }}>
                  <span>⚖️ THE THREE FOUNDATIONAL PILLARS OF CLASSICAL ATOMISM</span>
                </h3>
                <p style={{ margin: '0 0 1rem', fontSize: '0.88rem', color: '#fed7aa', lineHeight: 1.6 }}>
                  Compare how ancient India, classical Greece, and 19th-century Britain independently deduced the fundamental particulate nature of matter:
                </p>
              </div>

              <div className="vl-grid-3" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="vl-comparative-card" style={{ borderColor: '#f59e0b', background: 'rgba(245, 158, 11, 0.06)' }}>
                  <div className="vl-comparative-badge" style={{ background: '#f59e0b', color: '#1e293b' }}>
                    🇮🇳 VAIŚEṢIKA (~600 BCE)
                  </div>
                  <h4 style={{ color: '#fef08a', margin: '0.5rem 0 0.35rem' }}>महर्षि-कणाद (Sage Kaṇāda)</h4>
                  <ul className="vl-comparative-list">
                    <li><strong>Particle:</strong> Paramāṇu (indivisible point-seed endowed with intrinsic Guṇas).</li>
                    <li><strong>Bonding:</strong> 2 atoms = Dvyaṇuka; 3 dyads = Tryaṇuka (spatial volume emerges).</li>
                    <li><strong>Chemical Change:</strong> <em>Pīlupāka-vāda</em> (heat dissociates bonds down to individual atoms before recombining).</li>
                    <li><strong>Space:</strong> <em>Ākāśa</em> is not void; it is a continuous physical substrate carrying sound vibration.</li>
                  </ul>
                </div>

                <div className="vl-comparative-card" style={{ borderColor: '#06b6d4', background: 'rgba(6, 182, 212, 0.06)' }}>
                  <div className="vl-comparative-badge" style={{ background: '#06b6d4', color: '#0f172a' }}>
                    🇬🇷 GREEK ATOMISM (~400 BCE)
                  </div>
                  <h4 style={{ color: '#a5f3fc', margin: '0.5rem 0 0.35rem' }}>Democritus & Leucippus</h4>
                  <ul className="vl-comparative-list">
                    <li><strong>Particle:</strong> Atomos (hard, unalterable geometric shape with interlocking hooks).</li>
                    <li><strong>Bonding:</strong> Purely mechanical entanglement of hooks and ball-joints.</li>
                    <li><strong>Chemical Change:</strong> No internal bond breaking; only mechanical rearrangement.</li>
                    <li><strong>Space:</strong> <em>Kenon</em> (absolute empty void / non-being through which atoms fall).</li>
                  </ul>
                </div>

                <div className="vl-comparative-card" style={{ borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.06)' }}>
                  <div className="vl-comparative-badge" style={{ background: '#10b981', color: '#064e3b' }}>
                    🇬🇧 MODERN STOICHIOMETRY (1803 CE)
                  </div>
                  <h4 style={{ color: '#a7f3d0', margin: '0.5rem 0 0.35rem' }}>John Dalton</h4>
                  <ul className="vl-comparative-list">
                    <li><strong>Particle:</strong> Spherical billiard-ball atoms of fixed characteristic mass weights.</li>
                    <li><strong>Bonding:</strong> Definite whole-number proportion compounds (e.g., 2:1 in H₂O).</li>
                    <li><strong>Chemical Change:</strong> Recombination of indestructible mass units into compound molecules.</li>
                    <li><strong>Space:</strong> Classical Newtonian absolute space.</li>
                  </ul>
                </div>
              </div>

              {/* Comparative Matrix Table */}
              <div className="vl-paradigm-matrix-wrap" style={{ marginTop: '0' }}>
                <h4 style={{ color: '#fef08a', margin: '0 0 0.65rem', fontSize: '0.98rem' }}>
                  📊 Epistemic Side-by-Side Synthesis
                </h4>
                <div className="vl-matrix-table-scroll">
                  <table className="vl-matrix-table">
                    <thead>
                      <tr>
                        <th>Concept Dimension</th>
                        <th>Sage Kaṇāda (Vaiśeṣika)</th>
                        <th>Democritus (Greece)</th>
                        <th>John Dalton (Modern Chemistry)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 800, color: '#f59e0b' }}>Indivisible Atom</td>
                        <td>Paramāṇu (Eternal, spherical, carries cardinal sensory guṇa)</td>
                        <td>Atomos (Eternal, rigid geometric polyhedra with hooks)</td>
                        <td>Mass-specific spherical chemical atom (Indivisible until 1897)</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 800, color: '#f59e0b' }}>Chemical Transformation</td>
                        <td><strong>Pīlupāka-vāda:</strong> Heat penetrates pores, dissociates bonds (vibhāga), transforms atomic qualities, and recombines (saṁyoga)</td>
                        <td>Mechanical entanglement and disentanglement in the void; atoms themselves never dissociate or alter</td>
                        <td>Separation and combination of mass spheres in fixed stoichiometric proportions</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 800, color: '#f59e0b' }}>Nature of Space / Void</td>
                        <td><strong>Ākāśa:</strong> Continuous ubiquitous substance; medium of sound waves (Śabda)</td>
                        <td><strong>Kenon:</strong> Total empty void / non-existence</td>
                        <td>Empty 3D Euclidean container space</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 800, color: '#f59e0b' }}>Perceptual Threshold</td>
                        <td><strong>Trasareṇu (Tryaṇuka):</strong> 6 atoms; minimum structural unit scattering visible light in sunbeams</td>
                        <td>Atoms imperceptible; clusters form bulk matter by aggregate density</td>
                        <td>Macroscopic volume ratios and balance weight measurements</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber"
                  onClick={() => {
                    setHistorySubView('pilupaka_lab');
                    soundEffects.playElementSummon('tejas');
                  }}
                  style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}
                >
                  🔥 Test Kaṇāda&apos;s Pīlupāka Oven in Action ➔
                </button>
              </div>
            </section>
          )}
        </>
      )}

      {/* =========================================================================
          SECTOR 5: 🏛️ THE SIX PADĀRTHAS (ONTOLOGICAL TAXONOMY)
          ========================================================================= */}
      {activeSector === 'padarthas' && (
        <PadarthasExplorer
          onPronounce={handlePronounce}
          activeAudioWord={activeAudioWord}
        />
      )}

      {/* =========================================================================
          SECTOR 6: 🎯 QUIZZES & GLOSSARY (TERMS & CHALLENGES)
          ========================================================================= */}
      {activeSector === 'quiz' && (
        <>
          {/* Terms and Challenges */}
          <div className="vl-grid-2">
            <TermPanel terms={TERMS} />
            <div>
              <BhutaSort onPronounce={handlePronounce} activeWord={activeAudioWord} />
              <ChallengeList items={CHALLENGES} />
            </div>
          </div>
        </>
      )}

      {/* 🧭 BOTTOM STATION NAVIGATION BAR (Where games/stations conclude) */}
      <div className="vl-station-bottom-nav" role="navigation" aria-label="Station Navigation">
        <div className="vl-station-bottom-info">
          <span className="vl-tour-step-badge">
            स्थानम् #{activeModule.order} / ८ · Station {activeModule.order} of 8
          </span>
          <span className="vl-station-bottom-title">
            {activeModule.icon} {activeModule.title} <span style={{ opacity: 0.8, fontSize: '0.88rem' }}>({activeModule.sanskrit})</span>
          </span>
          <span className="vl-tour-cat-badge">
            {activeModule.categoryIcon} {activeModule.categoryTitle}
          </span>
        </div>

        <div className="vl-tour-nav-btns">
          <button
            type="button"
            className="vl-tour-btn"
            onClick={() => handleTourNav('prev')}
            disabled={activeModule.order === 1}
            title={activeModule.order > 1 ? `Previous: ${PARAMANU_MODULES[activeModule.order - 2].title}` : 'First station'}
          >
            ⬅ Prev Station
          </button>
          {activeModule.order < PARAMANU_MODULES.length ? (
            <button
              type="button"
              className="vl-tour-btn is-next"
              onClick={() => handleTourNav('next')}
              title={`Next: ${PARAMANU_MODULES[activeModule.order].title}`}
            >
              Next Station ({PARAMANU_MODULES[activeModule.order].title}) ➔
            </button>
          ) : (
            <button
              type="button"
              className="vl-tour-btn is-next"
              onClick={() => onNextLab?.()}
              title="Proceed to Next Lab: SEC-02 The Veil of Māyā"
              style={{ background: 'linear-gradient(135deg, #eab308, #f59e0b)', color: '#090e17', fontWeight: 800 }}
            >
              🚀 Proceed to Next Lab (The Veil of Māyā) ➔
            </button>
          )}
        </div>
      </div>


      {/* 🏆 [ COSMIC GENESIS VICTORY CELEBRATION MODAL ] */}
      {showVictoryModal && (
        <div className="vl-victory-modal-backdrop" role="dialog" aria-modal="true" aria-label="Victory Modal">
          <div className="vl-victory-modal-box">
            <div className="vl-victory-badge-icon">⚛️</div>
            <h3 className="vl-victory-title">परमाणु-प्रवीण · ATOMIC CRUCIBLE MASTER</h3>
            <div className="vl-victory-subtitle">Vaiśeṣika Sṛṣṭi-Krama Mastery Achieved</div>
            <div className="vl-victory-desc">
              <p style={{ margin: '0 0 0.5rem' }}>
                <strong>Śobhanam!</strong> You have successfully recreated Sage Kaṇāda’s ancient causal chain of physical creation:
              </p>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.86rem', color: '#fef08a' }}>
                १. <strong>Paramāṇu (परमाणु):</strong> Indivisible, eternal uncaused points in Ākāśa.<br />
                २. <strong>Dvyaṇuka (द्व्यणुक):</strong> Imperceptible binary dyads forged via saṃyoga.<br />
                ३. <strong>Tryaṇuka (त्रसरेणु):</strong> The threshold of physical perception dancing in the sunbeam.<br />
                ४. <strong>Guṇa-Prakāśana (गुण-प्रकाशनम्):</strong> Unlocking sensory qualities (Smell, Taste, Color, Touch).
              </p>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8' }}>
                Matter is an interconnected, conserved fabric. All {totalParamanus} paramāṇus remain invariant throughout all conjunctions and disjunctions.
              </p>
            </div>
            <div className="vl-victory-stats-grid">
              <div className="vl-victory-stat-cell">
                <div className="vl-victory-stat-val">{totalParamanus}</div>
                <div className="vl-victory-stat-lbl">Invariant Atoms</div>
              </div>
              <div className="vl-victory-stat-cell">
                <div className="vl-victory-stat-val">{counts.d}</div>
                <div className="vl-victory-stat-lbl">Dvyaṇukas Forged</div>
              </div>
              <div className="vl-victory-stat-cell">
                <div className="vl-victory-stat-val">{counts.t}</div>
                <div className="vl-victory-stat-lbl">Tryaṇukas Visible</div>
              </div>
            </div>
            <div className="vl-victory-btn-group">
              {onNextLab && (
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber"
                  onClick={() => {
                    setShowVictoryModal(false);
                    setHasClaimedVictory(true);
                    onNextLab();
                  }}
                  style={{ background: 'linear-gradient(135deg, #eab308, #f59e0b)', color: '#090e17', fontWeight: 800 }}
                >
                  🚀 Proceed to Next Lab: SEC-02 The Veil of Māyā ➔
                </button>
              )}
              <button
                type="button"
                className="vl-btn vl-btn--cyber-ghost"
                onClick={() => {
                  setShowVictoryModal(false);
                  setHasClaimedVictory(true);
                }}
              >
                🎮 Keep Playing Sandbox
              </button>
              <button
                type="button"
                className="vl-btn vl-btn--cyber-ghost"
                onClick={() => {
                  setShowVictoryModal(false);
                  setHasClaimedVictory(true);
                  setActiveSector('biocosmic');
                }}
              >
                🪞 Explore Bio-Cosmic Mirror (Body & Mind) →
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ParamanuBuilder;
