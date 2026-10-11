import React, { useEffect, useRef, useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';

// =========================================================================
// TYPES & DATA STRUCTURES FOR THE 8-STOP TIMELINE JOURNEY
// =========================================================================

export interface JourneyDialogueTurn {
  speaker: 'Bodhi' | 'Kaṇāda';
  dev: string;
  en: string;
  subText?: string;
}

export interface JourneyStop {
  id: number;
  icon: string;
  placeNameDev: string;
  placeNameEn: string;
  eraSetting: string;
  accentColor: string;
  bgGradient: string;
  category: string;
  titleDev: string;
  titleEn: string;
  sanskritSutra: string;
  sanskritSutraRef: string;
  coreInsight: string;
  dialogue: JourneyDialogueTurn[];
  points: {
    labelDev: string;
    labelEn: string;
    desc: string;
    icon: string;
  }[];
  modernScienceBridge: string;
  kanadaQuote: string;
  sceneType:
    | 'rice_fields'
    | 'potters_workshop'
    | 'thermal_kiln'
    | 'parisesha_hall'
    | 'cosmic_sanctuary'
    | 'tanmatra_chamber'
    | 'quantum_bridge'
    | 'compassion_hermitage';
}

export const JOURNEY_STOPS: JourneyStop[] = [
  // -----------------------------------------------------------------------
  // STOP 1: THE DAWN HARVEST FIELDS OF PRABHĀSA
  // -----------------------------------------------------------------------
  {
    id: 1,
    icon: '🌾',
    placeNameDev: 'प्रभात-क्षेत्रम्',
    placeNameEn: 'The Dawn Harvest Fields of Prabhāsa',
    eraSetting: '600 BCE · Prabhās Patān, Saurāṣṭra · Golden Harvest Dawn',
    accentColor: '#f59e0b',
    bgGradient: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
    category: 'Ontology of Causality (कार्य-कारण-सिद्धान्तः)',
    titleDev: 'त्रिविध-कारणानि · The Three Causal Tiers',
    titleEn: 'Samavāyi, Asamavāyi & Nimitta Kāraṇa',
    sanskritSutra: 'कारणाभावात् कार्याभावः',
    sanskritSutraRef: 'Vaiśeṣika Sūtra 1.2.1 · "Without the cause, there can be no effect"',
    coreInsight:
      'In Vaiśeṣika physics, nothing emerges out of a vacuum (Asat-kāryavāda). Every physical artifact in the macro-world requires a tripartite causal foundation: the material clay, relational atomic conjunction, and external instrumental agents.',
    dialogue: [
      {
        speaker: 'Bodhi',
        dev: 'गुरुदेव! प्रभाते एतानि शालिकणानि पतन्ति। यदि कणः विभज्यते, किं अनन्तं विभाजनं स्यात्?',
        en: 'Gurudeva! Look at these single rice grains fallen in the dawn mist. If we divide matter endlessly, does it divide to infinite nothingness?',
        subText: 'Questioning infinite divisibility & the threshold of matter',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'नहि बोधि! अनवस्था-प्रसङ्गः निवारणीयः। यदि अनन्तं स्यात्, सर्षप-मेर्वोः तुल्यत्वम् आपद्येत! अतः परमाणुः निरवयवः नित्यः च।',
        en: 'Never, Bodhi! Infinite regress (Anavasthā) is absurd. If division were infinite, a tiny mustard seed and Mount Meru would contain the same infinite parts! Therefore, there is an indivisible unit—the Paramāṇu.',
        subText: 'The reductio ad absurdum of infinite regress',
      },
      {
        speaker: 'Bodhi',
        dev: 'तर्हि एभ्यः अणुकणेभ्यः कथं स्थूल-घटः वा जगत् उत्पद्यते?',
        en: 'Then how do visible things like this clay pot or the world emerge from these minute grains?',
        subText: 'Inquiring into macro-creation from micro-atoms',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'त्रिविध-कारणैः! समवायि-कारणं मृत्कणाः, असमवायि-कारणं संयोगः, निमित्त-कारणं कुलाल-चक्रम् आकाशश्च। सर्वं कार्यं कारणे प्रतिष्ठितम्।',
        en: 'Through three causal tiers! Samavāyi (clay atoms), Asamavāyi (molecular conjunction), and Nimitta (potter, wheel, fire, and space). Cause and effect are inextricably woven.',
        subText: 'The tripartite architecture of causation',
      },
    ],
    points: [
      {
        labelDev: 'समवायि-कारणम्',
        labelEn: 'Inseparable Material Cause',
        desc: 'The underlying physical substance of which the effect consists. For a clay pot, the earth Aṇu particles (clay) are the material cause. The pot is made directly OF earth.',
        icon: '🪨',
      },
      {
        labelDev: 'असमवायि-कारणम्',
        labelEn: 'Non-Material Relational Cause',
        desc: 'The structural conjunction (Saṁyoga) that binds Dvyaṇukas (dyads) and Tryaṇukas (triads) together into an interconnected molecular matrix.',
        icon: '🔗',
      },
      {
        labelDev: 'निमित्त-कारणम्',
        labelEn: 'Instrumental Causes',
        desc: 'The active external agents that bring the effect into manifestation: the potter (Kulāla), the wheel (Cakra), turning stick (Daṇḍa), water, fire, and space.',
        icon: '⚙️',
      },
    ],
    modernScienceBridge:
      'Directly parallels modern physical systems: Mass / Invariant Matter (Material Cause), Chemical Binding Energy & Covalent Bonds (Relational Cause), and Kinetic Mechanical Forces (Instrumental Cause).',
    kanadaQuote:
      'The cloth is made of threads; the vessel is made of earth atoms. Destroy the conjunction, and the effect dissolves.',
    sceneType: 'rice_fields',
  },

  // -----------------------------------------------------------------------
  // STOP 2: THE VILLAGE POTTER'S WORKSHOP
  // -----------------------------------------------------------------------
  {
    id: 2,
    icon: '🏺',
    placeNameDev: 'कुलाल-शाला',
    placeNameEn: 'The Village Potter’s Workshop',
    eraSetting: 'Artisan Courtyard · Turntables, Clay Mounds & Water Jars',
    accentColor: '#38bdf8',
    bgGradient: 'linear-gradient(180deg, #0c2a4d 0%, #0f172a 100%)',
    category: 'Category of Relations (सम्बन्ध-मीमांसा)',
    titleDev: 'समवाय बनाम संयोग · Inherence vs Conjunction',
    titleEn: 'Inseparable Inherence (Samavāya) vs Separable Contact (Saṁyoga)',
    sanskritSutra: 'अयुतसिद्धयोराधार्याधारभूतयोर्यः सम्बन्ध इहप्रत्ययहेतुः स समवायः',
    sanskritSutraRef: 'Praśastapāda Bhāṣya · "The eternal relation of inseparable entities"',
    coreInsight:
      'Indian naturalism distinguishes sharply between external contingent contact and internal essential identity. Inherence cannot be severed without destroying the entity itself.',
    dialogue: [
      {
        speaker: 'Bodhi',
        dev: 'आचार्य! पश्यतु कुलालः जलं मृत्तिकां च संयोज्य घटं करोति। किं घटे जलं तथा एव वर्तते यथा रक्त-वर्णः?',
        en: 'Acharya! Look at the potter combining water and clay. Is water in the pot in the exact same way as its red terracotta color?',
        subText: 'Distinguishing container contents from intrinsic qualities',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'साधु प्रश्नः! जलस्य सम्बन्धः "संयोगः"—स तु अनित्यः पृथक्कर्तुं शक्यः। परन्तु रक्त-वर्णः "समवायः"—स तु अयुतसिद्धः! घटं विना रक्तत्वं न तिष्ठति।',
        en: 'Excellent question! Water has "Saṁyoga" (temporary conjunction)—separable at any time. But the red color is "Samavāya" (inseparable inherence)! You cannot destroy the inherence without destroying the pot itself.',
        subText: 'The essential distinction between Saṁyoga and Samavāya',
      },
      {
        speaker: 'Bodhi',
        dev: 'अहो! अतः एव पक्षि-वृक्षयोः सम्बन्धः संयोगः, शुक-हरितयोः तु समवायः!',
        en: 'Aha! So a bird perched on a branch is conjunction, but the green color of the parrot is inherence!',
        subText: 'Synthesizing the principle with living examples',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'सत्यम्! समवायस्तु अयुतसिद्धानाम्। संयोगस्तु युतसिद्धानाम्। संयोगः काले घटना, समवायस्तु सत्त्वस्य स्वरूपम्।',
        en: 'Exactly! Inherence belongs to inseparable entities (Ayutasiddha); conjunction belongs to separable ones. Conjunction is an event in time; Inherence is the very fabric of being.',
        subText: 'The ontological nature of being',
      },
    ],
    points: [
      {
        labelDev: 'संयोग (Saṁyoga)',
        labelEn: 'Temporary Conjunction',
        desc: 'A contingent, separable contact between two independent items that existed separately before meeting and can part without destruction (e.g. water poured into the pot, a bird resting on a branch, or the potter’s hand on clay).',
        icon: '🤝',
      },
      {
        labelDev: 'समवाय (Samavāya)',
        labelEn: 'Inseparable Inherence',
        desc: 'An eternal, structural relationship between inseparable entities (Ayutasiddha). Terracotta redness inheres in the pot; heat inheres in fire; motion inheres in the wheel. You cannot extract the redness without destroying the pot!',
        icon: '💎',
      },
      {
        labelDev: 'पञ्च समवाय-स्थलानि',
        labelEn: '5 Canonical Inherence Instances',
        desc: 'Substance & Quality (Dravya-Guṇa), Substance & Action (Dravya-Karma), Whole & Parts (Avayavin-Avayava), Universal & Individual (Jāti-Vyakti), and Particularity & Atom (Viśeṣa-Paramāṇu).',
        icon: '🏛️',
      },
    ],
    modernScienceBridge:
      'Parallels mechanical mixtures (separable solutions like salt in water) versus intrinsic physical properties and intramolecular structures (like atomic charge, color spectra, and crystal lattices).',
    kanadaQuote:
      'Conjunction is an event in time; Inherence is the very fabric of being.',
    sceneType: 'potters_workshop',
  },

  // -----------------------------------------------------------------------
  // STOP 3: THE THERMAL KILN OF PĪLUPĀKA
  // -----------------------------------------------------------------------
  {
    id: 3,
    icon: '🔥',
    placeNameDev: 'पीलुपाक-भ्राष्ट्रम्',
    placeNameEn: 'The Thermal Kiln of Pīlupāka',
    eraSetting: 'The High-Temperature Brick Kiln · Roaring Red-Hot Embers',
    accentColor: '#ea580c',
    bgGradient: 'linear-gradient(180deg, #451a03 0%, #1c1917 100%)',
    category: 'Thermal Atomic Chemistry (तेजः-संयोग-प्रक्रिया)',
    titleDev: 'पीलुपाकवादः · Atomic Chemistry of Kiln Firing',
    titleEn: 'Molecular Dissociation & Thermal Recombination',
    sanskritSutra: 'रूपरसगन्धस्पर्शव्यतिरेकादर्थान्तरमेकत्वम्',
    sanskritSutraRef: 'Vaiśeṣika Sūtra 7.1.6 · "Thermal transformation of atomic qualities"',
    coreInsight:
      'How does dark, water-soluble raw mud (āma-ghaṭa) transform into ringing, watertight red ceramic (pakva-ghaṭa)? Sage Kaṇāda deduced atomic bond breaking and thermal quality substitution.',
    dialogue: [
      {
        speaker: 'Bodhi',
        dev: 'गुरुदेव! आम-घटः कृष्णः मृदुश्च आसीत्। कुलालस्तु तं भ्राष्ट्रे निक्षिपति। कथं स रक्तः दृढः च अभवत्?',
        en: 'Gurudeva! The raw mud pot was dark and soft. The potter placed it into the roaring kiln. How did it permanently turn hard and terracotta red?',
        subText: 'The mystery of irreversible ceramic vitrification',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'अयमेव "पीलुपाकः"! तेजः-कणाः अन्तः प्रविश्य द्व्यणुकानां बन्धान् भिन्दन्ति। प्रति-परमाणुं नवीन-गुणाः उत्पद्यन्ते, ततः पुनर्-संयोगः भवति!',
        en: 'This is Pīlupāka! Heat enters the atomic gaps and breaks dyadic bonds. In each individual atom, new qualities are born, and then they immediately recombine into ceramic hardness!',
        subText: 'Thermal bond dissociation and quality transmutation',
      },
      {
        speaker: 'Bodhi',
        dev: 'किं नैयायिकाः अन्यत् मन्यन्ते?',
        en: 'Do the Nyāya philosophers believe differently?',
        subText: 'The classic philosophical debate between the sister schools',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'ते "पिठरपाकं" मन्यन्ते—समग्रः घटः पच्यते इति। वयन्तु ब्रूमः—परिवर्तनं सूक्ष्मे परमाणौ एव भवति, न तु केवलं बाह्य-पिण्डे!',
        en: 'They claim Pīṭharapāka—that the whole pot bakes without atomic dissociation. We Vaiśeṣikas insist: true chemical transformation occurs fundamentally at the sub-microscopic atomic level!',
        subText: 'Micro-atomic change vs macro-whole transformation',
      },
    ],
    points: [
      {
        labelDev: 'पीलु (Pīlu = Atom)',
        labelEn: 'Fundamental Building Blocks',
        desc: 'Pīlu means indivisible atom; Pāka means thermal cooking. Extreme heat (Tejas) penetrates molecular gaps and breaks dyadic bonds (Vibhāga).',
        icon: '⚛️',
      },
      {
        labelDev: 'पाक (Pāka = Baking)',
        labelEn: 'Quality Transmutation',
        desc: 'Thermal energy destroys the old dark color and softness, instilling durable new qualities: terracotta redness, ceramic hardness, and watertight density.',
        icon: '🏺',
      },
      {
        labelDev: 'पीलुपाक vs पीठरपाक',
        labelEn: 'Vaiśeṣika vs Nyāya Debate',
        desc: 'Nyāya argued the entire pot bakes as a single structural whole (Pīṭharapāka). Kaṇāda insisted that true chemical change happens fundamentally at the microscopic atomic level (Pīlupāka).',
        icon: '⚔️',
      },
    ],
    modernScienceBridge:
      'Anticipates modern ceramic vitrification, chemical thermodynamics, activation energy, and molecular bond breaking/reformation.',
    kanadaQuote:
      'Heat penetrates where no eye can reach, dissolving the old dyads so new qualities may awaken.',
    sceneType: 'thermal_kiln',
  },

  // -----------------------------------------------------------------------
  // STOP 4: THE HALL OF DISJUNCTIVE ELIMINATION
  // -----------------------------------------------------------------------
  {
    id: 4,
    icon: '🔔',
    placeNameDev: 'परिशेष-मण्डपम्',
    placeNameEn: 'The Hall of Disjunctive Elimination',
    eraSetting: 'The Vedic Astronomy Pavilion · Resonance Bell & Sound Waves',
    accentColor: '#a855f7',
    bgGradient: 'linear-gradient(180deg, #2e1065 0%, #0f172a 100%)',
    category: 'Epistemological Proof (प्रमाण-मीमांसा)',
    titleDev: 'परिशेष-अनुमानम् · The Proof of Space by Elimination',
    titleEn: 'Method of Disjunctive Elimination for Ākāśa',
    sanskritSutra: 'परिशेषाल्लिङ्गम् आकाशस्य',
    sanskritSutraRef: 'Vaiśeṣika Sūtra 2.1.27 · "By the method of residue, sound is the mark of Space"',
    coreInsight:
      'You cannot see, touch, or weigh Space. How did Sage Kaṇāda scientifically prove its existence 2,500 years ago? Through rigorous disjunctive elimination (Pariśeṣa-Anumāna)!',
    dialogue: [
      {
        speaker: 'Bodhi',
        dev: 'भगवन्! पृथिव्यादयः चत्वारः स्पर्शन गृह्यन्ते। आकाशस्तु अप्रत्यक्षः! तस्य सद्भावे किं प्रमाणम्?',
        en: 'Gurudeva! Earth, Water, Fire, and Air are known by touch and sight. But Space is invisible! How can we scientifically prove its existence?',
        subText: 'The challenge of proving an imperceptible reality',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'घण्टा-नादं शृणु बोधि! शब्दः गुणः। गुणः द्रव्यम् आश्रयति। शब्दः स्पर्शवतां पृथिव्यादीनां न भवति, यतः भित्तिं भित्त्वा अपि गच्छति।',
        en: 'Listen to this ringing bell, Bodhi! Sound is an observed sensory quality. Every quality requires an underlying substance. Sound cannot belong to the 4 tangible elements, for sound echoes freely through solid barriers without obstruction!',
        subText: 'Sound as a quality requiring a non-obstructive substrate',
      },
      {
        speaker: 'Bodhi',
        dev: 'किं मनसः आत्मनः वा न भवेत्?',
        en: 'Could sound not belong to Mind or Soul?',
        subText: 'Testing internal versus external substances',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'नहि! परिशेषात् एकम् एव द्रव्यम् अवशिष्यते—विभुः सर्वगतः आकाशः! शब्दस्तु आकाशस्य एव असाधारण-गुणः!',
        en: 'No! By disjunctive elimination, only one substance remains: all-pervading, eternal Space! Sound is the unmistakable footprint of Ākāśa!',
        subText: 'The inescapable residue of logical deduction',
      },
    ],
    points: [
      {
        labelDev: 'शब्दः गुणः (Sound is a Quality)',
        labelEn: 'Observed Phenomenon',
        desc: 'Sound (Śabda) is an observed sensory quality. Every quality must inhere in an underlying substance (Dravya).',
        icon: '🔔',
      },
      {
        labelDev: 'भूत-निराकरणम्',
        labelEn: 'Elimination of Tangible Elements',
        desc: 'Sound cannot belong to Earth, Water, Fire, or Air, because these possess tactile obstruction (Sparśa), whereas sound echoes freely through barriers without leaving physical residues.',
        icon: '❌',
      },
      {
        labelDev: 'परिशेषः आकाशः',
        labelEn: 'The Residue: All-Pervading Space',
        desc: 'Sound also cannot belong to Mind or Soul. The only remaining substance capable of serving as the omnipresent acoustic medium is Ākāśa!',
        icon: '🌌',
      },
    ],
    modernScienceBridge:
      'Direct parallel to formal logic elimination proofs and the historical scientific deduction of wave-propagation media and relativistic spatial metrics.',
    kanadaQuote:
      'When all tangible candidates are eliminated, the residue is the unassailable truth: Space is the cradle of sound.',
    sceneType: 'parisesha_hall',
  },

  // -----------------------------------------------------------------------
  // STOP 5: THE COSMIC STARLIT SANCTUARY (GHAṬĀKĀŚA & MAHĀKĀŚA)
  // -----------------------------------------------------------------------
  {
    id: 5,
    icon: '🌌',
    placeNameDev: 'घटाकाश-महाकाश-तीर्थम्',
    placeNameEn: 'The Cosmic Starlit Sanctuary',
    eraSetting: 'Midnight Mountain Terrace · Under the Spiraling Milky Way',
    accentColor: '#6366f1',
    bgGradient: 'linear-gradient(180deg, #1e1b4b 0%, #030712 100%)',
    category: 'Cosmology & Metaphysics (सर्वगत-विभु-सिद्धान्तः)',
    titleDev: 'घटाकाश एवं महाकाश · The Illusion of Partitioned Space',
    titleEn: 'Enclosed Cavity (Ghaṭākāśa) vs Cosmic Continuum (Mahākāśa)',
    sanskritSutra: 'तन्निष्क्रमणात् प्रवेशनम् · विभवान्महांश्चाकाशः',
    sanskritSutraRef: 'Vaiśeṣika Sūtra 2.1.20, 7.1.22 · "Space is one, vast, and all-pervading"',
    coreInsight:
      'Space is singular, eternal (Nitya), and all-pervading (Vibhu). The boundaries of physical objects are merely an illusion of enclosure (Upādhi). Space is never chopped or trapped.',
    dialogue: [
      {
        speaker: 'Bodhi',
        dev: 'गुरुदेव! यदा कुलालः घटं रचयति, किं स घटे नूतनं आकाशं जनयति?',
        en: 'Gurudeva! When the potter molds the clay pot, does he create new space inside it?',
        subText: 'The illusion of creating or capturing space',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'पश्य गगनम्! आकाशस्तु एकः, विभुः, नित्यः च। घटस्य भित्तयः केवलं "उपाधिः" (काल्पनिक-सीमा)। आकाशः न बध्यते, न च चलति!',
        en: 'Look at the starry firmament! Space is one, eternal, and indivisible. The clay walls are merely a temporary boundary (Upādhi). Space was never trapped, nor does it move!',
        subText: 'The unity and immutability of space',
      },
      {
        speaker: 'Bodhi',
        dev: 'यदि घटः भज्यते, तर्हि घटे स्थितः आकाशः कुत्र गच्छति?',
        en: 'When the pot breaks, where does the space inside the pot escape to?',
        subText: 'Investigating the dissolution of boundaries',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'न कुत्रचित्! उपाधि-नाशे महाकाशे एव लीयते। स एव मोक्षस्य दृष्टान्तः! घटो नश्यति, आकाशस्तु सर्वदा अचलः।',
        en: 'Nowhere! Upon the dissolution of the boundary, it simply remains the undivided infinite whole. That is the supreme metaphor for the liberation of the soul! The pot perishes; Space remains unmoved.',
        subText: 'Ghaṭākāśa merging into Mahākāśa as the archetype of Mokṣa',
      },
    ],
    points: [
      {
        labelDev: 'घटाकाश (Pot Space)',
        labelEn: 'Perceived Enclosed Room',
        desc: 'When the potter shapes clay walls, the hollow cavity inside appears to be an independent "pot-space" holding water or grain.',
        icon: '🏺',
      },
      {
        labelDev: 'महाकाश (Cosmic Space)',
        labelEn: 'Infinite Continuum',
        desc: 'In reality, cosmic space was present before the pot was made, is present inside the pot right now, and remains present when the pot breaks.',
        icon: '🌌',
      },
      {
        labelDev: 'उपाधि (Limiting Boundary)',
        labelEn: 'The Metaphor of Liberation',
        desc: 'The clay walls never captured or compressed space. When the pot shatters, no space escapes—the perceived enclosure simply dissolves into the undivided whole.',
        icon: '✨',
      },
    ],
    modernScienceBridge:
      'Parallels General Relativity: matter does not sit "inside" space like objects in a box; physical bodies inhabit and curve an uninterrupted, continuous spacetime fabric.',
    kanadaQuote:
      'The pot is born and the pot dies; Space neither arrives nor departs.',
    sceneType: 'cosmic_sanctuary',
  },

  // -----------------------------------------------------------------------
  // STOP 6: THE CHAMBER OF THE FIVE SENSES & TANMĀTRAS
  // -----------------------------------------------------------------------
  {
    id: 6,
    icon: '🪨',
    placeNameDev: 'तन्मात्र-मण्डपम्',
    placeNameEn: 'The Chamber of the Five Senses',
    eraSetting: 'Inner Sanctum of Elements · Stepped Altar of Tanmātras',
    accentColor: '#10b981',
    bgGradient: 'linear-gradient(180deg, #064e3b 0%, #0f172a 100%)',
    category: 'Sensory Spectrum of Matter (गुण-सञ्चय-क्रमः)',
    titleDev: 'तन्मात्राणि एवं गुणाः · The Sensory Qualities of Matter',
    titleEn: 'Cumulative Sensory Spectrum from Earth to Space',
    sanskritSutra: 'रूपरसगन्धस्पर्शवती पृथिवी',
    sanskritSutraRef: 'Vaiśeṣika Sūtra 2.1.1 · "Cumulative qualities of the Bhūtas"',
    coreInsight:
      'In Vaiśeṣika physics, elements are classified by an elegant cumulative hierarchy of sensory qualities (Guṇas). Ākāśa is the subtle matrix providing room (Avakāśa) for all perceptible matter.',
    dialogue: [
      {
        speaker: 'Bodhi',
        dev: 'आचार्य! पञ्चभूतानां गुणानां च कः क्रमः?',
        en: 'Acharya! What is the scientific order of the 5 elements and their sensory qualities?',
        subText: 'Seeking the structural taxonomy of matter',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'गुण-सञ्चय-क्रमः! आकाशे केवलं शब्दः। वायौ शब्दः स्पर्शश्च। तेजसि रूपम् अपि। जले रसः। पृथिव्यां तु गन्ध-रस-रूप-स्पर्शाः चत्वारः गुणाः!',
        en: 'A cumulative sensory hierarchy! Space has Sound alone. Air adds Touch. Fire adds Form/Color. Water adds Taste. And Earth unites all four with unique Smell!',
        subText: 'The cumulative layering of physical qualities',
      },
      {
        speaker: 'Bodhi',
        dev: 'तर्हि आकाशः सूक्ष्मतमः, पृथिवी च स्थूलतमा?',
        en: 'So Space is the subtlest foundation, and Earth is the densest macroscopic form?',
        subText: 'Grasping the spectrum from subtle to dense',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'एवमेव! आकाशः अवकाशं ददाति, पृथिवी च मूर्तिं ददाति। सर्वेषां भूतानां आधारः आकाशः।',
        en: 'Exactly! Space provides room (Avakāśa) for all, while Earth provides solid physical form. Ākāśa is the subtle matrix of existence!',
        subText: 'The role of Avakāśa as room for reality',
      },
    ],
    points: [
      {
        labelDev: '🪨 पृथिवी (Earth)',
        labelEn: '4 Senses: Smell, Taste, Form, Touch',
        desc: 'Earth is dense, structural, and exhibits all 4 lower sensory qualities, with unique signature Smell (Gandha).',
        icon: '🪨',
      },
      {
        labelDev: '💧 अप् (Water)',
        labelEn: '3 Senses: Taste, Form, Touch + Sneha',
        desc: 'Water carries signature Taste (Rasa) and Cohesion (Sneha), binding loose atoms into form.',
        icon: '💧',
      },
      {
        labelDev: '🔥 तेजस् (Fire) & 💨 वायु (Air)',
        labelEn: 'Light & Touch',
        desc: 'Fire carries Form/Color (Rūpa) and Heat (Uṣṇa). Air carries signature Touch (Sparśa) and kinetic motion (Vega).',
        icon: '🔥',
      },
      {
        labelDev: '🌌 आकाश (Space)',
        labelEn: '1 Sublime Sense: Sound (Śabda)',
        desc: 'Space carries Sound alone—the omni-pervading acoustic continuum that provides room (Avakāśa) for all 4 corporeal elements to exist.',
        icon: '🌌',
      },
    ],
    modernScienceBridge:
      'Mirrors thermodynamic degrees of freedom and state transitions from solid crystal lattices through liquids, gases, plasmas, to quantum vacuum zero-point fields.',
    kanadaQuote:
      'From the subtlety of sound in space down to the solid fragrance of earth, reality unfurls in ordered harmony.',
    sceneType: 'tanmatra_chamber',
  },

  // -----------------------------------------------------------------------
  // STOP 7: THE TIME BRIDGE TO MODERN LABORATORIES
  // -----------------------------------------------------------------------
  {
    id: 7,
    icon: '⚛️',
    placeNameDev: 'काल-सेतुः / अर्वाचीन-विज्ञानम्',
    placeNameEn: 'The Time Bridge to Modern Physics',
    eraSetting: 'Quantum Bridge · 600 BCE Sūtras meet 2026 CE Particle Accelerators',
    accentColor: '#ec4899',
    bgGradient: 'linear-gradient(180deg, #4a044e 0%, #0f172a 100%)',
    category: 'Scientific Synthesis (प्राचीन-अर्वाचीन-संवादः)',
    titleDev: 'अर्वाचीन-विज्ञान-सेतुः · Bridges to Modern Quantum Physics',
    titleEn: 'Dalton’s Atoms, Conservation of Mass & Quantum Vacuum',
    sanskritSutra: 'सदकारणवन्नित्यम्',
    sanskritSutraRef: 'Vaiśeṣika Sūtra 4.1.1 · "The eternal building block exists uncaused"',
    coreInsight:
      'Ancient Vaiśeṣika deduction anticipates modern particle physics and thermodynamics with startling conceptual clarity: discrete atoms, binary molecules, invariant mass, and the active quantum vacuum.',
    dialogue: [
      {
        speaker: 'Bodhi',
        dev: 'गुरुदेव! पश्यतु भविष्ये जॉन-डाल्टन् (John Dalton) तथा क्वाण्टम्-वैज्ञानिकाः अणुकणान् अन्वेषयन्ति!',
        en: 'Gurudeva! Look into the future—John Dalton and quantum physicists are investigating the indivisible atom!',
        subText: 'Observing the historical convergence of atomism',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'सत्यं बोधि! यत् वयं द्विसहस्र-वर्षेभ्यः प्राक् अनुमानेन अज्ञास्म, तत् ते यन्त्रैः पश्यन्ति! परमाणुः अविभाज्यः, द्रव्य-अविनाशिता च सिद्धा।',
        en: 'True, Bodhi! What we deduced through pure rational inference 2,500 years ago, they now verify with massive machines! Discrete atoms, conservation of mass, and molecular dyads!',
        subText: 'Ancient rational deduction validated by experimental technology',
      },
      {
        speaker: 'Bodhi',
        dev: 'आकाशम् अपि ते "क्वाण्टम्-शून्यम्" (Quantum Vacuum) इति वदन्ति!',
        en: 'And they call Space a "Quantum Vacuum" filled with virtual particle fluctuations!',
        subText: 'Connecting Ākāśa to zero-point energy fields',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'आकाशः कदापि रिक्तः नास्ति। स तु शक्ति-गर्भः सर्वगतः आधारः! अणवः न कदापि नश्यन्ति, केवलं संयोगं परिवर्तन्ते।',
        en: 'Space was never empty nothingness. It is the living field of cosmic potentiality! The building blocks never perish; they only change companions in the dance of Saṁyoga.',
        subText: 'The law of invariant conservation across cosmic time',
      },
    ],
    points: [
      {
        labelDev: 'परमाणु एवं डाल्टन',
        labelEn: 'Discrete Fundamental Particles',
        desc: 'John Dalton’s 1808 atomic hypothesis mirrors Kaṇāda’s paramāṇu: discrete fundamental particles that cannot be subdivided or destroyed.',
        icon: '⚛️',
      },
      {
        labelDev: 'द्व्यणुक एवं त्र्यणुक',
        labelEn: 'Molecules & Visible Thresholds',
        desc: 'Dvyaṇuka (binary dyad) parallels diatomic molecules (O₂, N₂); Tryaṇuka parallels colloidal particles and crystal unit cells dancing in a sunbeam.',
        icon: '☀️',
      },
      {
        labelDev: 'द्रव्य-अविनाशिता',
        labelEn: 'Law of Conservation of Mass',
        desc: 'Kaṇāda’s Dravya-Avināśitā: in all chemical baking and pot shaping, the total number of paramāṇus remains strictly invariant.',
        icon: '⚖️',
      },
      {
        labelDev: 'क्वाण्टम-शून्यम् (Quantum Vacuum)',
        labelEn: 'Space as Potentiality',
        desc: 'Modern quantum field theory proves that "empty space" is teeming with vacuum energy and virtual particle flux—identical to Ākāśa as living potentiality.',
        icon: '🌌',
      },
    ],
    modernScienceBridge:
      'Synthesizes John Dalton, Antoine Lavoisier, Helmholtz cavity resonance, and Quantum Field Theory.',
    kanadaQuote:
      'The building blocks never perish; they only change their companions in the dance of Saṁyoga.',
    sceneType: 'quantum_bridge',
  },

  // -----------------------------------------------------------------------
  // STOP 8: THE HERMITAGE OF COMPASSION & LIBERATION
  // -----------------------------------------------------------------------
  {
    id: 8,
    icon: '🌿',
    placeNameDev: 'विज्ञान-आश्रमः',
    placeNameEn: 'Purpose of Science - Vigyana',
    eraSetting: 'Sacred Banyan Hermitage · Sunset Twilight · Ethical Science',
    accentColor: '#eab308',
    bgGradient: 'linear-gradient(180deg, #422006 0%, #0f172a 100%)',
    category: 'Philosophy & Ethics (ऋषि-चरितम् एवं विज्ञानम्)',
    titleDev: 'महर्षिः कणादः · Purpose of Science - Vigyana (विज्ञानम्)',
    titleEn: 'Purpose of Science - Vigyana (विज्ञानम्)',
    sanskritSutra: 'यतोऽभ्युदयनिःश्रेयससिद्धिः स धर्मः',
    sanskritSutraRef: 'Vaiśeṣika Sūtra 1.1.2 · "Dharma leads to material prosperity and spiritual liberation"',
    coreInsight:
      'Why did ancient India research atomic physics? Not for weapons or corporate monopolies, but for ethical medicine (Ayurveda) and the liberation of human consciousness from fear of death.',
    dialogue: [
      {
        speaker: 'Bodhi',
        dev: 'भगवन्! अस्माकं भौतिक-शास्त्रस्य परमं प्रयोजनं किम्?',
        en: 'Gurudeva! What is the supreme purpose of science (Vigyana)?',
        subText: 'The ethical and existential question of science',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'न युद्धानां कृते, न धनाय! "यतोऽभ्युदय-निःश्रेयस-सिद्धिः स धर्मः"। प्रथमं "लोकसंग्रहः"—आयुर्वेदे अणूनां प्रयोगेण रोग-निवारणम्। द्वितीयं "अपवर्गः"—मोक्षः!',
        en: 'Not for warfare, nor for corporate greed! Dharma leads to both human flourishing and spiritual liberation. First, Lokasaṁgraha: transforming minerals into life-saving Ayurvedic medicines. Second, Apavarga: eternal liberation!',
        subText: 'The twin aims of science: compassionate medicine and liberation',
      },
      {
        speaker: 'Bodhi',
        dev: 'कथं भौतिक-विद्यया मोक्षः सिद्ध्यति?',
        en: 'How does atomic physics lead to spiritual liberation?',
        subText: 'Understanding the bridge between physics and transcendence',
      },
      {
        speaker: 'Kaṇāda',
        dev: 'यदा जानासि यत् शरीरं केवलं नश्वरः अणूनां संयोगः, आत्मा तु आकाशवत् नित्यः असङ्गः च, तदा मृत्यु-भयं विनश्यति! आकाशं ज्ञात्वा स्वयं जानीहि।',
        en: 'When you realize that your physical body is merely a temporary conjunction of atoms, while your true consciousness is like Space—eternal, unstained, and immortal—all fear of death dissolves! Understand Space to know what you truly are.',
        subText: 'Transcendence of the fear of death through atomic truth',
      },
    ],
    points: [
      {
        labelDev: 'कणाद एवं उलूकः',
        labelEn: 'The Grain Collector',
        desc: 'Kaṇa means grain or atom; Ada means eater. Sage Kaṇāda collected single discarded grains from harvested fields by day, living in profound simplicity and harmony with nature.',
        icon: '🌾',
      },
      {
        labelDev: 'प्रमाण-निष्ठा',
        labelEn: 'Empirical Rationalism',
        desc: 'Vaiśeṣika rejects superstition, magic, and fatalism in favor of direct perception (Pratyakṣa) and verifiable rational inference (Anumāna).',
        icon: '⚖️',
      },
      {
        labelDev: 'लोकसंग्रहः (Lokasaṁgraha)',
        labelEn: 'Compassionate Medicine',
        desc: 'Atomic knowledge was applied directly in Ayurveda and Rasashastra: transforming minerals into bio-compatible bhasmas to cure diseases and relieve human pain.',
        icon: '🌿',
      },
      {
        labelDev: 'अपवर्गः (Apavarga)',
        labelEn: 'Spiritual Liberation',
        desc: 'By realizing that the physical body is merely a temporary conjunction (Saṁyoga) of atoms in eternal space, human consciousness overcomes fear of death.',
        icon: '🕊️',
      },
    ],
    modernScienceBridge:
      'Embodies sustainable science, ethical research, open access knowledge, and reverence for nature.',
    kanadaQuote:
      'Study matter to know what you are not; understand space to know what you truly are.',
    sceneType: 'compassion_hermitage',
  },
];

// =========================================================================
// AVATARS: BODHI (STUDENT) & SAGE KAṆĀDA (MASTER)
// =========================================================================

export const JourneyBodhiAvatar: React.FC<{ size?: number; isSpeaking?: boolean }> = ({
  size = 56,
  isSpeaking = false,
}) => (
  <div
    className={`akasa-journey-avatar-frame is-bodhi${isSpeaking ? ' is-speaking-pulse' : ''}`}
    style={{ width: size, height: size }}
    title="शिष्यः बोधिः (Bodhi - Inquisitive Student)"
  >
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <defs>
        <linearGradient id="jbSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#fba763" />
        </linearGradient>
        <linearGradient id="jbShawl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <radialGradient id="jbAura" cx="50%" cy="50%" r="50%">
          <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="48" fill="#082f49" stroke="#38bdf8" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="45" fill="url(#jbAura)" />

      {/* Robe */}
      <path d="M 20 94 C 20 72, 33 65, 50 65 C 67 65, 80 72, 80 94 Z" fill="url(#jbShawl)" stroke="#0284c7" strokeWidth="1.2" />
      <path d="M 38 67 Q 52 79 60 94" fill="none" stroke="#fde047" strokeWidth="1.4" strokeDasharray="3 1.5" />

      {/* Neck */}
      <rect x="44" y="52" width="12" height="15" rx="4" fill="url(#jbSkin)" />

      {/* Ears */}
      <circle cx="31" cy="45" r="5" fill="url(#jbSkin)" />
      <circle cx="69" cy="45" r="5" fill="url(#jbSkin)" />

      {/* Face */}
      <ellipse cx="50" cy="44" rx="19" ry="21" fill="url(#jbSkin)" />

      {/* Hair & Shikha Topknot */}
      <path d="M 31 38 C 32 22, 68 22, 69 38 C 65 31, 35 31, 31 38 Z" fill="#1c1917" />
      <ellipse cx="50" cy="18" rx="6" ry="7" fill="#1c1917" />
      <path d="M 50 18 Q 55 12 59 13 Q 54 18 51 21 Z" fill="#1c1917" />
      <rect x="46" y="21" width="8" height="2" fill="#ef4444" rx="1" />

      {/* Tilak */}
      <path d="M 48 30 Q 50 26 52 30 L 51 38 L 49 38 Z" fill="#fef08a" />
      <circle cx="50" cy="36" r="1.2" fill="#dc2626" />

      {/* Inquisitive Eyebrows */}
      <path d="M 37 37 Q 42 34 46 37" fill="none" stroke="#292524" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 54 37 Q 58 34 63 37" fill="none" stroke="#292524" strokeWidth="1.6" strokeLinecap="round" />

      {/* Bright Eyes */}
      <ellipse cx="42" cy="43" rx="3.5" ry="3" fill="#ffffff" />
      <circle cx="42.5" cy="42.5" r="2" fill="#1c1917" />
      <circle cx="43.2" cy="41.8" r="0.7" fill="#ffffff" />

      <ellipse cx="58" cy="43" rx="3.5" ry="3" fill="#ffffff" />
      <circle cx="58.5" cy="42.5" r="2" fill="#1c1917" />
      <circle cx="59.2" cy="41.8" r="0.7" fill="#ffffff" />

      {/* Nose */}
      <path d="M 50 42 L 49 48 L 52 48" fill="none" stroke="#ea580c" strokeWidth="1.2" strokeLinecap="round" />

      {/* Mouth (Talking if speaking) */}
      {isSpeaking ? (
        <ellipse cx="50" cy="55" rx="3.5" ry="2.5" fill="#991b1b" stroke="#7f1d1d" strokeWidth="0.8" />
      ) : (
        <path d="M 46 54 Q 50 57 54 54" fill="none" stroke="#b45309" strokeWidth="1.6" strokeLinecap="round" />
      )}
    </svg>
  </div>
);

export const JourneyKanadaAvatar: React.FC<{ size?: number; isSpeaking?: boolean }> = ({
  size = 56,
  isSpeaking = false,
}) => (
  <div
    className={`akasa-journey-avatar-frame is-kanada${isSpeaking ? ' is-speaking-pulse' : ''}`}
    style={{ width: size, height: size }}
    title="महर्षिः कणादः (Maharshi Kaṇāda - Founder of Vaiśeṣika)"
  >
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <defs>
        <linearGradient id="jkSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="jkRobe" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <radialGradient id="jkHalo" cx="50%" cy="50%" r="50%">
          <stop offset="65%" stopColor="#facc15" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="48" fill="#1e1105" stroke="#facc15" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="45" fill="url(#jkHalo)" />

      {/* Saffron Robe */}
      <path d="M 18 94 C 18 70, 32 63, 50 63 C 68 63, 82 70, 82 94 Z" fill="url(#jkRobe)" stroke="#b45309" strokeWidth="1.2" />

      {/* White Sage Beard */}
      <path d="M 33 50 C 33 76, 42 86, 50 86 C 58 86, 67 76, 67 50 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <path d="M 42 58 Q 50 78 58 58" fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.6" />

      {/* Face */}
      <ellipse cx="50" cy="42" rx="17" ry="18" fill="url(#jkSkin)" />

      {/* Sage Jaṭā (Matted Hair Bun) */}
      <path d="M 33 34 C 34 18, 66 18, 67 34 Z" fill="#451a03" />
      <ellipse cx="50" cy="16" rx="9" ry="8" fill="#451a03" />
      <circle cx="50" cy="16" r="3" fill="#b45309" stroke="#78350f" strokeWidth="0.8" />
      <circle cx="50" cy="16" r="1" fill="#fde047" />

      {/* Sandalwood Tripundra Tilak */}
      <line x1="43" y1="28" x2="57" y2="28" stroke="#f8fafc" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="42" y1="31" x2="58" y2="31" stroke="#f8fafc" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="43" y1="34" x2="57" y2="34" stroke="#f8fafc" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="50" cy="31" r="1.5" fill="#dc2626" />

      {/* Deep Serene Eyes */}
      <ellipse cx="43" cy="41" rx="3.5" ry="2.2" fill="#ffffff" />
      <circle cx="43.5" cy="41" r="1.8" fill="#451a03" />
      <ellipse cx="57" cy="41" rx="3.5" ry="2.2" fill="#ffffff" />
      <circle cx="56.5" cy="41" r="1.8" fill="#451a03" />

      {/* Moustache & Mouth */}
      <path d="M 44 50 Q 50 53 56 50" fill="none" stroke="#e2e8f0" strokeWidth="2.2" strokeLinecap="round" />
      {isSpeaking ? (
        <ellipse cx="50" cy="54" rx="3" ry="2" fill="#78350f" />
      ) : (
        <path d="M 47 54 Q 50 56 53 54" fill="none" stroke="#78350f" strokeWidth="1.4" strokeLinecap="round" />
      )}
    </svg>
  </div>
);

// =========================================================================
// SCENIC GRAPHIC VIEWPORTS (DEDICATED SVG ANIMATION STAGES)
// =========================================================================

export const ScenicStage: React.FC<{ stop: JourneyStop; activeSpeaker: 'Bodhi' | 'Kaṇāda' | null }> = ({
  stop,
  activeSpeaker,
}) => {
  const { sceneType } = stop;

  return (
    <div className="akasa-scene-stage-wrapper" aria-label={`Visual Scene: ${stop.placeNameEn}`}>
      <svg viewBox="0 0 800 360" className="akasa-scene-svg">
        <defs>
          <linearGradient id="skyDawn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="40%" stopColor="#431407" />
            <stop offset="75%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>

          <linearGradient id="skyKiln" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="45%" stopColor="#7c2d12" />
            <stop offset="85%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="atomOrb" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>

          <radialGradient id="cosmicGalaxy" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* -------------------------------------------------------------
            SCENE 1: RICE FIELDS OF PRABHĀSA (DAWN HARVEST & GRAINS)
            ------------------------------------------------------------- */}
        {sceneType === 'rice_fields' && (
          <g className="akasa-scene-rice-fields">
            <rect width="800" height="360" fill="url(#skyDawn)" />

            {/* Rising Sun */}
            <circle cx="400" cy="160" r="75" fill="url(#sunGlow)" />
            <circle cx="400" cy="160" r="28" fill="#fef08a" />

            {/* Distant Saurāṣṭra Hills */}
            <path d="M 0 240 Q 180 180 360 230 Q 580 170 800 240 L 800 360 L 0 360 Z" fill="#78350f" opacity="0.85" />
            <path d="M 0 260 Q 220 220 440 255 Q 640 210 800 260 L 800 360 L 0 360 Z" fill="#451a03" />

            {/* Swaying Golden Paddy Stalks */}
            {Array.from({ length: 32 }, (_, i) => {
              const x = 20 + i * 24.5;
              const h = 50 + ((i * 13) % 25);
              return (
                <g key={i} className="akasa-anim-stalk" style={{ animationDelay: `${(i % 5) * 0.3}s` }}>
                  <path
                    d={`M ${x} 360 Q ${x + 6} ${360 - h / 2} ${x + ((i % 2 === 0) ? 12 : -8)} ${360 - h}`}
                    stroke="#facc15"
                    strokeWidth="2.4"
                    fill="none"
                  />
                  {/* Rice Grains on Stalk */}
                  <ellipse cx={x + ((i % 2 === 0) ? 12 : -8)} cy={360 - h} rx="3.5" ry="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
                  <ellipse cx={x + ((i % 2 === 0) ? 9 : -5)} cy={360 - h + 8} rx="3" ry="5.5" fill="#fde047" />
                </g>
              );
            })}

            {/* Magnified Glowing Paramāṇu Point in Center Sky */}
            <g transform="translate(400, 100)" className="akasa-anim-pulse-atom">
              <circle cx="0" cy="0" r="32" fill="url(#atomOrb)" opacity="0.3" />
              <circle cx="0" cy="0" r="14" fill="#fef08a" stroke="#ffffff" strokeWidth="2" />
              <ellipse cx="0" cy="0" rx="36" ry="12" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="4 2" transform="rotate(30)" />
              <ellipse cx="0" cy="0" rx="36" ry="12" fill="none" stroke="#facc15" strokeWidth="1.2" strokeDasharray="4 2" transform="rotate(-30)" />
              <text x="0" y="-22" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="800">
                परमाणुः · Indivisible Unit
              </text>
            </g>

            {/* Falling Rice Grain Particles */}
            {Array.from({ length: 10 }, (_, gIdx) => {
              const gx = 80 + gIdx * 70;
              const gy = 120 + ((gIdx * 19) % 100);
              return (
                <ellipse
                  key={gIdx}
                  cx={gx}
                  cy={gy}
                  rx="3.5"
                  ry="7"
                  fill="#fef08a"
                  stroke="#d97706"
                  strokeWidth="0.8"
                  className="akasa-anim-float-grain"
                  style={{ animationDelay: `${gIdx * 0.4}s` }}
                />
              );
            })}
          </g>
        )}

        {/* -------------------------------------------------------------
            SCENE 2: VILLAGE POTTER'S WORKSHOP (WHEEL & CLAY EMERGENCE)
            ------------------------------------------------------------- */}
        {sceneType === 'potters_workshop' && (
          <g className="akasa-scene-workshop">
            <rect width="800" height="360" fill="url(#skyDawn)" />

            {/* Workshop Thatched Canopy & Earthen Walls */}
            <path d="M 0 0 L 800 0 L 800 140 L 0 100 Z" fill="#291102" opacity="0.9" />
            <line x1="120" y1="105" x2="120" y2="360" stroke="#78350f" strokeWidth="8" />
            <line x1="680" y1="134" x2="680" y2="360" stroke="#78350f" strokeWidth="8" />
            <rect x="0" y="270" width="800" height="90" fill="#3f1e06" />

            {/* Potter's Wheel Centerpiece */}
            <g transform="translate(400, 270)">
              {/* Outer Rotating Stone Turntable Rim */}
              <ellipse cx="0" cy="0" rx="140" ry="42" fill="#27272a" stroke="#71717a" strokeWidth="3" />
              <ellipse cx="0" cy="0" rx="122" ry="34" fill="#451a03" stroke="#b45309" strokeWidth="2" />

              {/* Turning Spokes Animation */}
              <g className="akasa-anim-spin-wheel" style={{ transformOrigin: '0px 0px' }}>
                {Array.from({ length: 8 }, (_, sp) => {
                  const rad = (sp * 45 * Math.PI) / 180;
                  return (
                    <line
                      key={sp}
                      x1="0"
                      y1="0"
                      x2={110 * Math.cos(rad)}
                      y2={30 * Math.sin(rad)}
                      stroke="#facc15"
                      strokeWidth="2"
                      opacity="0.75"
                    />
                  );
                })}
              </g>

              {/* Clay Pot Emerging on Wheelhead */}
              <ellipse cx="0" cy="-28" rx="36" ry="12" fill="#78350f" />
              <path d="M -36 -28 Q -48 -65 0 -80 Q 48 -65 36 -28 Z" fill="#b45309" stroke="#92400e" strokeWidth="2" />
              <ellipse cx="0" cy="-80" rx="22" ry="7" fill="#d97706" />

              {/* Water Splashes & Slip Droplets */}
              {Array.from({ length: 6 }, (_, w) => {
                const wx = -60 + w * 24;
                const wy = -45 + ((w * 13) % 20);
                return (
                  <circle
                    key={w}
                    cx={wx}
                    cy={wy}
                    r="2.8"
                    fill="#38bdf8"
                    className="akasa-anim-splash"
                    style={{ animationDelay: `${w * 0.25}s` }}
                  />
                );
              })}

              <text x="0" y="26" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="800">
                कुलाल-चक्रम् · Potter’s Wheel (Kinetic Instrument)
              </text>
            </g>
          </g>
        )}

        {/* -------------------------------------------------------------
            SCENE 3: THE THERMAL KILN OF PĪLUPĀKA (FIRE & BOND BREAKING)
            ------------------------------------------------------------- */}
        {sceneType === 'thermal_kiln' && (
          <g className="akasa-scene-kiln">
            <rect width="800" height="360" fill="url(#skyKiln)" />

            {/* Brick Dome Kiln Silhouette */}
            <path d="M 220 360 C 220 160 580 160 580 360 Z" fill="#1c1917" stroke="#7c2d12" strokeWidth="4" />

            {/* Inner Kiln Furnace Arch with Roaring Flames */}
            <path d="M 290 360 C 290 230 510 230 510 360 Z" fill="#431407" />

            {/* Animated Kiln Flames */}
            <g className="akasa-anim-kiln-flames">
              <path
                d="M 320 360 Q 340 270 380 250 Q 400 290 420 240 Q 450 280 480 360 Z"
                fill="#ea580c"
                opacity="0.9"
              />
              <path
                d="M 340 360 Q 370 280 400 260 Q 420 300 440 270 Q 460 310 470 360 Z"
                fill="#facc15"
                opacity="0.85"
              />
              <path
                d="M 370 360 Q 390 300 405 280 Q 420 310 435 360 Z"
                fill="#ffffff"
                opacity="0.75"
              />
            </g>

            {/* Glowing Terracotta Pot Inside Kiln Transforming */}
            <g transform="translate(400, 310)">
              <ellipse cx="0" cy="0" rx="30" ry="10" fill="#991b1b" />
              <path d="M -30 0 Q -42 -35 0 -48 Q 42 -35 30 0 Z" fill="#dc2626" stroke="#fef08a" strokeWidth="1.8" />
              <ellipse cx="0" cy="-48" rx="18" ry="6" fill="#f97316" />
            </g>

            {/* Microscopic Cutout Bubble: Pīlupāka Atomic Dissociation */}
            <g transform="translate(640, 120)">
              <circle cx="0" cy="0" r="54" fill="#0f172a" stroke="#f97316" strokeWidth="3" />
              <text x="0" y="-38" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="800">
                Atomic Bonds Breaking
              </text>
              {/* Splitting Dyad Atoms */}
              <circle cx="-16" cy="6" r="11" fill="#ea580c" stroke="#fef08a" strokeWidth="1.5" className="akasa-anim-vibrate-l" />
              <circle cx="16" cy="6" r="11" fill="#ea580c" stroke="#fef08a" strokeWidth="1.5" className="akasa-anim-vibrate-r" />
              <line x1="-8" y1="6" x2="8" y2="6" stroke="#facc15" strokeWidth="2.5" strokeDasharray="3 3" />
              <text x="0" y="32" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="700">
                Pīlu-Vibhāga (Dissociation)
              </text>
            </g>
          </g>
        )}

        {/* -------------------------------------------------------------
            SCENE 4: HALL OF DISJUNCTIVE ELIMINATION (BELL & ACOUSTICS)
            ------------------------------------------------------------- */}
        {sceneType === 'parisesha_hall' && (
          <g className="akasa-scene-parisesha">
            <rect width="800" height="360" fill="url(#skyNight)" />

            {/* Vedic Observatory Stone Pillars */}
            <line x1="80" y1="0" x2="80" y2="360" stroke="#334155" strokeWidth="16" />
            <line x1="720" y1="0" x2="720" y2="360" stroke="#334155" strokeWidth="16" />
            <path d="M 60 40 L 740 40 L 710 60 L 90 60 Z" fill="#1e293b" />

            {/* Resonating Bronze Temple Bell */}
            <g transform="translate(400, 110)">
              {/* Chain */}
              <line x1="0" y1="-70" x2="0" y2="0" stroke="#d97706" strokeWidth="4" />
              {/* Bell Dome */}
              <path d="M -38 48 C -36 10, -18 0, 0 0 C 18 0, 36 10, 38 48 C 44 58, -44 58, -38 48 Z" fill="#d97706" stroke="#fde047" strokeWidth="2.5" />
              <circle cx="0" cy="56" r="6" fill="#78350f" />

              {/* Concentric Pulsing Sound Waves (Śabda) */}
              <circle cx="0" cy="40" r="52" fill="none" stroke="#a855f7" strokeWidth="2.4" className="akasa-anim-soundwave-1" />
              <circle cx="0" cy="40" r="85" fill="none" stroke="#c084fc" strokeWidth="1.8" className="akasa-anim-soundwave-2" />
              <circle cx="0" cy="40" r="125" fill="none" stroke="#e9d5ff" strokeWidth="1.2" className="akasa-anim-soundwave-3" />
            </g>

            {/* 4 Eliminated Elements vs Residue Ākāśa */}
            <g transform="translate(400, 290)">
              {/* Earth ❌ */}
              <g transform="translate(-190, 0)">
                <circle cx="0" cy="0" r="22" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                <text x="0" y="5" textAnchor="middle" fontSize="16">🪨</text>
                <line x1="-14" y1="-14" x2="14" y2="14" stroke="#ef4444" strokeWidth="3" />
                <line x1="14" y1="-14" x2="-14" y2="14" stroke="#ef4444" strokeWidth="3" />
                <text x="0" y="32" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">Earth ❌</text>
              </g>

              {/* Water ❌ */}
              <g transform="translate(-95, 0)">
                <circle cx="0" cy="0" r="22" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                <text x="0" y="5" textAnchor="middle" fontSize="16">💧</text>
                <line x1="-14" y1="-14" x2="14" y2="14" stroke="#ef4444" strokeWidth="3" />
                <line x1="14" y1="-14" x2="-14" y2="14" stroke="#ef4444" strokeWidth="3" />
                <text x="0" y="32" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">Water ❌</text>
              </g>

              {/* Fire ❌ */}
              <g transform="translate(0, 0)">
                <circle cx="0" cy="0" r="22" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                <text x="0" y="5" textAnchor="middle" fontSize="16">🔥</text>
                <line x1="-14" y1="-14" x2="14" y2="14" stroke="#ef4444" strokeWidth="3" />
                <line x1="14" y1="-14" x2="-14" y2="14" stroke="#ef4444" strokeWidth="3" />
                <text x="0" y="32" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">Fire ❌</text>
              </g>

              {/* Air ❌ */}
              <g transform="translate(95, 0)">
                <circle cx="0" cy="0" r="22" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                <text x="0" y="5" textAnchor="middle" fontSize="16">💨</text>
                <line x1="-14" y1="-14" x2="14" y2="14" stroke="#ef4444" strokeWidth="3" />
                <line x1="14" y1="-14" x2="-14" y2="14" stroke="#ef4444" strokeWidth="3" />
                <text x="0" y="32" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">Air ❌</text>
              </g>

              {/* Residue Space (Ākāśa ✓) */}
              <g transform="translate(195, 0)">
                <circle cx="0" cy="0" r="24" fill="#581c87" stroke="#c084fc" strokeWidth="2.5" />
                <text x="0" y="6" textAnchor="middle" fontSize="18">🌌</text>
                <circle cx="16" cy="-16" r="8" fill="#10b981" />
                <text x="16" y="-13" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">✓</text>
                <text x="0" y="34" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="900">ĀKĀŚA (Residue)</text>
              </g>
            </g>
          </g>
        )}

        {/* -------------------------------------------------------------
            SCENE 5: COSMIC STARLIT SANCTUARY (POT SPACE VS COSMIC SPACE)
            ------------------------------------------------------------- */}
        {sceneType === 'cosmic_sanctuary' && (
          <g className="akasa-scene-cosmic">
            <rect width="800" height="360" fill="url(#skyNight)" />

            {/* Glowing Spiral Galaxy Nebula */}
            <circle cx="400" cy="180" r="180" fill="url(#cosmicGalaxy)" />

            {/* Starfield */}
            {Array.from({ length: 48 }, (_, s) => {
              const sx = 20 + ((s * 97 + 13) % 760);
              const sy = 15 + ((s * 53 + 7) % 320);
              const sr = 0.8 + (s % 3) * 0.7;
              return (
                <circle
                  key={s}
                  cx={sx}
                  cy={sy}
                  r={sr}
                  fill={s % 2 === 0 ? '#ffffff' : '#38bdf8'}
                  opacity={0.4 + ((s * 17) % 60) / 100}
                />
              );
            })}

            {/* Cosmic Terracotta Clay Pot Centerpiece */}
            <g transform="translate(400, 200)">
              {/* Outer Cosmic Ether Aura */}
              <circle cx="0" cy="0" r="95" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

              {/* Pot Belly (Clay Wall) */}
              <path
                d="M -55 45 C -75 0 -60 -50 0 -65 C 60 -50 75 0 55 45 C 35 60 -35 60 -55 45 Z"
                fill="#c2410c"
                stroke="#f97316"
                strokeWidth="3.5"
                opacity="0.88"
              />

              {/* Inner Glowing Pot-Space (Ghaṭākāśa) */}
              <ellipse cx="0" cy="0" rx="38" ry="32" fill="#0284c7" opacity="0.75" />
              <text x="0" y="-4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">
                घटाकाश
              </text>
              <text x="0" y="12" textAnchor="middle" fill="#bae6fd" fontSize="9">
                Enclosed Cavity
              </text>

              {/* Label: Cosmic Mahākāśa Outside */}
              <text x="0" y="-85" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontWeight="800">
                महाकाश · Continuous Cosmic Continuum
              </text>
              <text x="0" y="85" textAnchor="middle" fill="#fef08a" fontSize="10" fontStyle="italic">
                &ldquo;Clay walls are merely Upādhi (temporary boundary). Space was never trapped!&rdquo;
              </text>
            </g>
          </g>
        )}

        {/* -------------------------------------------------------------
            SCENE 6: CHAMBER OF TANMĀTRAS (5 SENSES SPECTRUM)
            ------------------------------------------------------------- */}
        {sceneType === 'tanmatra_chamber' && (
          <g className="akasa-scene-tanmatra">
            <rect width="800" height="360" fill="url(#skyNight)" />

            {/* Stepped Cosmic Pyramid of Elements */}
            {/* Level 1: Earth (4 Senses) */}
            <g transform="translate(400, 310)">
              <rect x="-260" y="-20" width="520" height="40" rx="8" fill="#78350f" stroke="#ca8a04" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#fef08a" fontSize="12" fontWeight="800">
                🪨 पृथिवी Earth · 4 Senses: Smell (गन्ध), Taste, Form, Touch
              </text>
            </g>

            {/* Level 2: Water (3 Senses) */}
            <g transform="translate(400, 250)">
              <rect x="-210" y="-18" width="420" height="36" rx="8" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#e0f2fe" fontSize="12" fontWeight="800">
                💧 अप् Water · 3 Senses: Taste (रस) + Sneha Cohesion, Form, Touch
              </text>
            </g>

            {/* Level 3: Fire (2 Senses) */}
            <g transform="translate(400, 195)">
              <rect x="-160" y="-18" width="320" height="36" rx="8" fill="#c2410c" stroke="#f97316" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#ffedd5" fontSize="12" fontWeight="800">
                🔥 तेजस् Fire · 2 Senses: Form/Light (रूप), Touch
              </text>
            </g>

            {/* Level 4: Air (1 Sense) */}
            <g transform="translate(400, 140)">
              <rect x="-110" y="-18" width="220" height="36" rx="8" fill="#047857" stroke="#10b981" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#d1fae5" fontSize="12" fontWeight="800">
                💨 वायु Air · 1 Sense: Touch (स्पर्श) + Vega Motion
              </text>
            </g>

            {/* Apex Level 5: Space (Sound Alone) */}
            <g transform="translate(400, 75)">
              <rect x="-75" y="-22" width="150" height="44" rx="10" fill="#581c87" stroke="#c084fc" strokeWidth="3" />
              <text x="0" y="-2" textAnchor="middle" fill="#f5d0fe" fontSize="12" fontWeight="900">
                🌌 आकाश Space
              </text>
              <text x="0" y="14" textAnchor="middle" fill="#e9d5ff" fontSize="9" fontWeight="800">
                Sound Alone (शब्द) · Avakāśa
              </text>
            </g>
          </g>
        )}

        {/* -------------------------------------------------------------
            SCENE 7: QUANTUM BRIDGE TO MODERN LABORATORIES
            ------------------------------------------------------------- */}
        {sceneType === 'quantum_bridge' && (
          <g className="akasa-scene-bridge">
            <rect width="800" height="360" fill="url(#skyNight)" />

            {/* Ancient Left Side (600 BCE Vedic Academy) */}
            <g transform="translate(180, 180)">
              <rect x="-140" y="-120" width="280" height="240" fill="#1e1b4b" stroke="#facc15" strokeWidth="2" rx="12" />
              <text x="0" y="-85" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="900">
                600 BCE · महर्षिः कणादः
              </text>
              <text x="0" y="-60" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                Vaiśeṣika Atomic Physics
              </text>
              <circle cx="0" cy="5" r="32" fill="#ca8a04" opacity="0.3" />
              <circle cx="0" cy="5" r="14" fill="#facc15" />
              <text x="0" y="52" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="700">
                Paramāṇu · Dvyaṇuka · Tryaṇuka
              </text>
              <text x="0" y="70" textAnchor="middle" fill="#94a3b8" fontSize="9">
                Dravya-Avināśitā (Conservation)
              </text>
            </g>

            {/* Central Timeline Light Beam */}
            <g transform="translate(400, 180)">
              <line x1="-60" y1="0" x2="60" y2="0" stroke="#ec4899" strokeWidth="6" strokeDasharray="8 4" className="akasa-anim-quantum-beam" />
              <circle cx="0" cy="0" r="18" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">
                2600 Yrs
              </text>
            </g>

            {/* Modern Right Side (2026 CE Particle Physics) */}
            <g transform="translate(620, 180)">
              <rect x="-140" y="-120" width="280" height="240" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" rx="12" />
              <text x="0" y="-85" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="900">
                Modern Physics &amp; QFT
              </text>
              <text x="0" y="-60" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                Dalton (1808) · Quantum Vacuum
              </text>
              {/* Collider Detector Orbitals */}
              <circle cx="0" cy="5" r="36" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="0" cy="5" r="22" fill="none" stroke="#ec4899" strokeWidth="1.5" />
              <circle cx="0" cy="5" r="8" fill="#38bdf8" />
              <text x="0" y="52" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="700">
                Discrete Atoms · Vacuum Fluctuations
              </text>
              <text x="0" y="70" textAnchor="middle" fill="#94a3b8" fontSize="9">
                Invariant Mass &amp; Spacetime Fabric
              </text>
            </g>
          </g>
        )}

        {/* -------------------------------------------------------------
            SCENE 8: HERMITAGE OF COMPASSION & LIBERATION
            ------------------------------------------------------------- */}
        {sceneType === 'compassion_hermitage' && (
          <g className="akasa-scene-hermitage">
            <rect width="800" height="360" fill="url(#skyDawn)" />

            {/* Sacred Banyan Tree Canopy & Aerial Roots */}
            <path d="M 0 0 Q 400 -40 800 0 L 800 120 Q 400 160 0 120 Z" fill="#14532d" opacity="0.95" />
            {/* Aerial Roots */}
            <line x1="160" y1="110" x2="160" y2="360" stroke="#78350f" strokeWidth="6" />
            <line x1="220" y1="120" x2="220" y2="360" stroke="#451a03" strokeWidth="4" />
            <line x1="580" y1="120" x2="580" y2="360" stroke="#78350f" strokeWidth="5" />
            <line x1="640" y1="110" x2="640" y2="360" stroke="#451a03" strokeWidth="6" />

            {/* Golden Sunset Halo */}
            <circle cx="400" cy="180" r="110" fill="url(#sunGlow)" opacity="0.8" />

            {/* Ayurvedic Mortar-Pestle on Stone Altar */}
            <g transform="translate(400, 270)">
              <rect x="-80" y="10" width="160" height="40" rx="8" fill="#334155" />
              {/* Granite Mortar */}
              <ellipse cx="0" cy="0" rx="34" ry="14" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
              <path d="M -34 0 Q -38 24 0 28 Q 38 24 34 0 Z" fill="#0f172a" />
              {/* Pestle */}
              <line x1="-12" y1="-26" x2="12" y2="12" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
              {/* Healing Steam / Bhasma Herbs */}
              <circle cx="-6" cy="-14" r="3" fill="#86efac" opacity="0.75" />
              <circle cx="8" cy="-20" r="4" fill="#fef08a" opacity="0.75" />

              <text x="0" y="42" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="800">
                Purpose of Science - Vigyana (विज्ञानम्)
              </text>
            </g>

            {/* Falling Golden Banyan Leaves */}
            {Array.from({ length: 8 }, (_, lf) => {
              const lx = 100 + lf * 80;
              const ly = 80 + ((lf * 29) % 140);
              return (
                <ellipse
                  key={lf}
                  cx={lx}
                  cy={ly}
                  rx="3"
                  ry="8"
                  fill="#facc15"
                  className="akasa-anim-falling-leaf"
                  style={{ animationDelay: `${lf * 0.5}s` }}
                  transform={`rotate(${lf * 30})`}
                />
              );
            })}
          </g>
        )}

        {/* -------------------------------------------------------------
            OVERLAY: BODHI & SAGE KAṆĀDA ACTIVE AVATARS ON STAGE
            ------------------------------------------------------------- */}
        <g transform="translate(45, 235)">
          <rect
            x="0"
            y="0"
            width="170"
            height="105"
            rx="12"
            fill="rgba(15, 23, 42, 0.88)"
            stroke={activeSpeaker === 'Bodhi' ? '#38bdf8' : 'rgba(56, 189, 248, 0.3)'}
            strokeWidth={activeSpeaker === 'Bodhi' ? 2.5 : 1}
          />
          <foreignObject x="10" y="10" width="150" height="85">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <JourneyBodhiAvatar size={48} isSpeaking={activeSpeaker === 'Bodhi'} />
              <div>
                <strong style={{ color: '#7dd3fc', fontSize: '0.85rem', display: 'block' }}>
                  शिष्यः बोधिः
                </strong>
                <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Inquisitive Seeker</span>
                {activeSpeaker === 'Bodhi' && (
                  <span className="akasa-speaking-tag">🔊 Speaking</span>
                )}
              </div>
            </div>
          </foreignObject>
        </g>

        <g transform="translate(585, 235)">
          <rect
            x="0"
            y="0"
            width="170"
            height="105"
            rx="12"
            fill="rgba(15, 23, 42, 0.88)"
            stroke={activeSpeaker === 'Kaṇāda' ? '#f59e0b' : 'rgba(245, 158, 11, 0.3)'}
            strokeWidth={activeSpeaker === 'Kaṇāda' ? 2.5 : 1}
          />
          <foreignObject x="10" y="10" width="150" height="85">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <JourneyKanadaAvatar size={48} isSpeaking={activeSpeaker === 'Kaṇāda'} />
              <div>
                <strong style={{ color: '#fef08a', fontSize: '0.85rem', display: 'block' }}>
                  महर्षिः कणादः
                </strong>
                <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Founding Master</span>
                {activeSpeaker === 'Kaṇāda' && (
                  <span className="akasa-speaking-tag is-kanada">🔊 Speaking</span>
                )}
              </div>
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// MASTER TIMELINE JOURNEY SLIDESHOW COMPONENT
// =========================================================================

// Phonetic pronunciation sanitizer and soft voice selector for browser speech synthesis
const formatForPleasantSpeech = (text: string): string => {
  return text
    // Strip Sanskrit inside brackets/parentheses e.g. (शब्द-गुणः), [द्रव्य], (विज्ञानम्)
    .replace(/\s*\([^\)]*[\u0900-\u097F][^\)]*\)/g, '')
    .replace(/\s*\[[^\]]*[\u0900-\u097F][^\]]*\]/g, '')
    .replace(/\([^\)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    // Phonetic replacements for Sanskrit terminology to ensure clear, soft English pronunciation
    .replace(/Ākāśa/gi, 'Aakasha')
    .replace(/Ghaṭākāśa/gi, 'Ghata-aakasha')
    .replace(/Mahākāśa/gi, 'Maha-aakasha')
    .replace(/Kaṇāda/gi, 'Kanada')
    .replace(/Tryaṇuka/gi, 'Tryanuka')
    .replace(/Dvyaṇuka/gi, 'Dvyanuka')
    .replace(/Paramāṇu/gi, 'Paramanu')
    .replace(/Pīlukapāka/gi, 'Peeluka-paaka')
    .replace(/Pīṭharapāka/gi, 'Peethara-paaka')
    .replace(/Pṛthivī/gi, 'Prithivi')
    .replace(/Tejas/gi, 'Tejas')
    .replace(/Vāyu/gi, 'Vaayu')
    .replace(/Vijñāna/gi, 'Vigyana')
    .replace(/Lokasaṁgraha/gi, 'Loka-sangraha')
    .replace(/Guṇa/gi, 'Guna')
    .replace(/Dravya/gi, 'Dravya')
    .replace(/Saṁyoga/gi, 'Samyoga')
    .replace(/Vibhāga/gi, 'Vibhaga')
    .replace(/Apavarga/gi, 'Apavarga')
    .replace(/Śabda/gi, 'Shabda')
    .replace(/Sūtra/gi, 'Sutra')
    .replace(/Vaiśeṣika/gi, 'Vaisheshika')
    .replace(/Pratyakṣa/gi, 'Pratyaksha')
    .replace(/Anumāna/gi, 'Anumana')
    .replace(/Upamāna/gi, 'Upamana')
    // Remove raw Devanagari script so TTS engines do not stutter
    .replace(/[\u0900-\u097F]/g, '')
    // Normalize punctuation & whitespace
    .replace(/[^\w\s.,!?'’"—-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const getPleasantVoice = (speaker: 'Bodhi' | 'Kaṇāda'): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const enVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
  const candidatePool = enVoices.length > 0 ? enVoices : voices;

  if (speaker === 'Bodhi') {
    // Gentle, clear, pleasant voice for the youthful student
    const match = candidatePool.find((v) =>
      /Samantha|Victoria|Karen|Moira|Google US English|Zira|Jenny|en-US-Standard|Natural/i.test(v.name)
    );
    return match || candidatePool[0] || null;
  } else {
    // Grounded, warm, serene voice for Sage Kaṇāda
    const match = candidatePool.find((v) =>
      /Daniel|Rishi|Oliver|Google UK English Male|David|Alex|George|Guy|en-GB-Standard|Natural/i.test(v.name)
    );
    return match || candidatePool[1] || candidatePool[0] || null;
  }
};

interface AkasaPhilosophySlideshowProps {
  onTakeQuiz?: () => void;
  onReturnToGame?: () => void;
}

export const AkasaPhilosophySlideshow: React.FC<AkasaPhilosophySlideshowProps> = ({
  onTakeQuiz,
  onReturnToGame,
}) => {
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [isVideoAutoTour, setIsVideoAutoTour] = useState(false);
  const [activeTurnIndex, setActiveTurnIndex] = useState<number | null>(null);
  const [activeSpeaker, setActiveSpeaker] = useState<'Bodhi' | 'Kaṇāda' | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showFullVault, setShowFullVault] = useState(true);

  const activeStop = JOURNEY_STOPS[currentStopIndex];
  const autoTourTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Preload voices for natural, soft speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const onVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = onVoicesChanged;
      return () => {
        if (window.speechSynthesis.onvoiceschanged === onVoicesChanged) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, []);

  // Stop speech when changing stops or unmounting
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveSpeaker(null);
      setActiveTurnIndex(null);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (autoTourTimerRef.current) {
        clearTimeout(autoTourTimerRef.current);
      }
    };
  }, [currentStopIndex]);

  // Handle Video Auto-Tour Flow
  useEffect(() => {
    if (!isVideoAutoTour) {
      if (autoTourTimerRef.current) clearTimeout(autoTourTimerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setActiveSpeaker(null);
      return;
    }

    let turnIdx = 0;
    const totalTurns = activeStop.dialogue.length;

    const playNextTurn = () => {
      if (!isVideoAutoTour) return;

      if (turnIdx < totalTurns) {
        const turn = activeStop.dialogue[turnIdx];
        setActiveTurnIndex(turnIdx);
        setActiveSpeaker(turn.speaker);

        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const cleanText = formatForPleasantSpeech(turn.en);
          const utterance = new SpeechSynthesisUtterance(cleanText);

          // Pleasant soft mode: gentle volume and calm natural cadence
          utterance.volume = 0.72;
          const voice = getPleasantVoice(turn.speaker);
          if (voice) utterance.voice = voice;

          // Bodhi: gentle youthful seeker; Kaṇāda: calm, tranquil sage
          if (turn.speaker === 'Bodhi') {
            utterance.pitch = 1.02;
            utterance.rate = 0.88;
          } else {
            utterance.pitch = 0.94;
            utterance.rate = 0.86;
          }

          utterance.onend = () => {
            turnIdx++;
            autoTourTimerRef.current = setTimeout(playNextTurn, 1800);
          };

          utterance.onerror = () => {
            turnIdx++;
            autoTourTimerRef.current = setTimeout(playNextTurn, 1400);
          };

          setIsSpeaking(true);
          window.speechSynthesis.speak(utterance);
        } else {
          turnIdx++;
          autoTourTimerRef.current = setTimeout(playNextTurn, 3200);
        }
      } else {
        // Dialogue complete for this stop: smoothly proceed to the next stop!
        autoTourTimerRef.current = setTimeout(() => {
          if (currentStopIndex < JOURNEY_STOPS.length - 1) {
            setCurrentStopIndex((prev) => prev + 1);
            soundEffects.playStrokeChime();
          } else {
            // Reached the final stop: stop auto tour
            setIsVideoAutoTour(false);
            soundEffects.playTrasarenuChime();
          }
        }, 2800);
      }
    };

    playNextTurn();

    return () => {
      if (autoTourTimerRef.current) clearTimeout(autoTourTimerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isVideoAutoTour, currentStopIndex]);

  // Keyboard navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentStopIndex((prev) => (prev < JOURNEY_STOPS.length - 1 ? prev + 1 : 0));
        soundEffects.playStrokeChime();
      } else if (e.key === 'ArrowLeft') {
        setCurrentStopIndex((prev) => (prev > 0 ? prev - 1 : JOURNEY_STOPS.length - 1));
        soundEffects.playStrokeChime();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Speak an individual dialogue turn when clicked by the user
  const handleSpeakDialogueTurn = (turnIndex: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking && activeTurnIndex === turnIndex) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveSpeaker(null);
      setActiveTurnIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    soundEffects.playPuzzleSnap();

    const turn = activeStop.dialogue[turnIndex];
    setActiveTurnIndex(turnIndex);
    setActiveSpeaker(turn.speaker);

    const cleanText = formatForPleasantSpeech(turn.en);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.volume = 0.72; // Pleasant soft mode
    const voice = getPleasantVoice(turn.speaker);
    if (voice) utterance.voice = voice;

    if (turn.speaker === 'Bodhi') {
      utterance.pitch = 1.02;
      utterance.rate = 0.88;
    } else {
      utterance.pitch = 0.94;
      utterance.rate = 0.86;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveSpeaker(null);
      setActiveTurnIndex(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveSpeaker(null);
      setActiveTurnIndex(null);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const goToStop = (idx: number) => {
    setCurrentStopIndex(idx);
    soundEffects.playPuzzleSnap();
  };

  const handleNext = () => {
    if (currentStopIndex < JOURNEY_STOPS.length - 1) {
      setCurrentStopIndex((i) => i + 1);
    } else {
      setCurrentStopIndex(0);
    }
    soundEffects.playStrokeChime();
  };

  const handlePrev = () => {
    if (currentStopIndex > 0) {
      setCurrentStopIndex((i) => i - 1);
    } else {
      setCurrentStopIndex(JOURNEY_STOPS.length - 1);
    }
    soundEffects.playStrokeChime();
  };

  return (
    <div className="akasa-journey-wrapper" role="region" aria-label="Bodhi & Sage Kaṇāda Dialogue Journey">
      {/* =====================================================================
          1. TOP CONTROLS: TIMELINE VIDEO TOUR SWITCHER & QUICK ACTIONS
          ===================================================================== */}
      <div className="akasa-journey-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <span className="akasa-slideshow-category-badge">
            🧭 संवाद-यात्रा · The Philosophical Dialogue Journey
          </span>
          <span className="akasa-journey-place-chip" style={{ borderColor: activeStop.accentColor }}>
            Stop {currentStopIndex + 1}/8: {activeStop.placeNameEn}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Simple Play / Pause Button */}
          <button
            type="button"
            className={`akasa-video-tour-btn${isVideoAutoTour ? ' is-active' : ''}`}
            onClick={() => {
              const next = !isVideoAutoTour;
              setIsVideoAutoTour(next);
              if (next) {
                soundEffects.playTrasarenuChime();
              } else {
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                setIsSpeaking(false);
                setActiveSpeaker(null);
                setActiveTurnIndex(null);
              }
            }}
            title={isVideoAutoTour ? 'Pause Timeline Journey' : 'Play Timeline Journey'}
            style={{ fontSize: '0.92rem', padding: '0.45rem 1.4rem', fontWeight: 800 }}
          >
            <span>{isVideoAutoTour ? '⏸️ Pause' : '▶️ Play'}</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          2. INTERACTIVE TIMELINE JOURNEY MAP / TRAIL (8 STATIONS WITH TRAVELER)
          ===================================================================== */}
      <div className="akasa-journey-trail-container" role="tablist" aria-label="8 Journey Stops Waypoints">
        <div className="akasa-journey-trail-track">
          {/* Connector Line Filling Up */}
          <div
            className="akasa-journey-trail-fill"
            style={{ width: `${(currentStopIndex / (JOURNEY_STOPS.length - 1)) * 100}%` }}
          />

          {/* 8 Clickable Station Waypoints */}
          {JOURNEY_STOPS.map((st, idx) => {
            const isActive = idx === currentStopIndex;
            const isPassed = idx < currentStopIndex;
            return (
              <button
                key={st.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`akasa-journey-waypoint${isActive ? ' is-active' : ''}${isPassed ? ' is-passed' : ''}`}
                onClick={() => {
                  setIsVideoAutoTour(false);
                  goToStop(idx);
                }}
                title={`${st.id}. ${st.placeNameEn} — ${st.titleEn}`}
                style={{
                  borderColor: isActive ? st.accentColor : undefined,
                  boxShadow: isActive ? `0 0 14px ${st.accentColor}` : undefined,
                }}
              >
                <span className="akasa-waypoint-icon">{st.icon}</span>
                <span className="akasa-waypoint-num">#{st.id}</span>
                <div className="akasa-waypoint-label">
                  <span className="akasa-wp-dev">{st.placeNameDev.split('·')[0].trim()}</span>
                  <span className="akasa-wp-en">{st.placeNameEn.split('The')[1]?.trim() || st.placeNameEn}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          3. SCENIC ANIMATION STAGE (GRAPHICS VIEWPORT + AVATARS)
          ===================================================================== */}
      <ScenicStage stop={activeStop} activeSpeaker={activeSpeaker} />

      {/* =====================================================================
          4. DIALOGUE EXCHANGE PANEL: BODHI & KAṆĀDA IN CONVERSATION
          ===================================================================== */}
      <div className="akasa-journey-dialogue-section">
        <div className="akasa-dialogue-header-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>💬</span>
            <h3 className="akasa-dialogue-sec-title">
              संवादः · Two Minds in Inquiry at {activeStop.placeNameEn}
            </h3>
          </div>
          <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
            Click any speech bubble to hear dialogue audio
          </span>
        </div>

        <div className="akasa-dialogue-turns-list">
          {activeStop.dialogue.map((turn, tIdx) => {
            const isBodhi = turn.speaker === 'Bodhi';
            const isTurnActive = activeTurnIndex === tIdx;

            return (
              <div
                key={tIdx}
                className={`akasa-dialogue-turn-row ${isBodhi ? 'is-bodhi-row' : 'is-kanada-row'}${isTurnActive ? ' is-turn-playing' : ''}`}
              >
                {/* Speaker Avatar Icon */}
                <div className="akasa-dialogue-turn-avatar-col">
                  {isBodhi ? (
                    <JourneyBodhiAvatar size={42} isSpeaking={isTurnActive} />
                  ) : (
                    <JourneyKanadaAvatar size={42} isSpeaking={isTurnActive} />
                  )}
                  <span className={`akasa-turn-speaker-badge ${isBodhi ? 'is-bodhi' : 'is-kanada'}`}>
                    {isBodhi ? 'Bodhi (शिष्यः)' : 'Kaṇāda (ऋषिः)'}
                  </span>
                </div>

                {/* Speech Bubble */}
                <div
                  className={`akasa-dialogue-bubble ${isBodhi ? 'is-bodhi-bubble' : 'is-kanada-bubble'}`}
                  onClick={() => handleSpeakDialogueTurn(tIdx)}
                  title="Click to listen to this speech turn"
                >
                  <div className="akasa-bubble-top">
                    <span className="akasa-bubble-speaker-name">
                      {isBodhi ? '🧑‍🎓 Bodhi asks:' : '🧘‍♂️ Sage Kaṇāda explains:'}
                    </span>
                    {isTurnActive && isSpeaking && (
                      <span style={{ fontSize: '0.72rem', color: '#fef08a', fontWeight: 600 }}>
                        🔊 Speaking
                      </span>
                    )}
                  </div>

                  {/* Sanskrit Text */}
                  <div className="akasa-bubble-sanskrit">&ldquo;{turn.dev}&rdquo;</div>

                  {/* English Translation */}
                  <div className="akasa-bubble-english">{turn.en}</div>

                  {turn.subText && (
                    <div className="akasa-bubble-annotation">💡 {turn.subText}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          5. EXPANDABLE IN-DEPTH KNOWLEDGE VAULT (PRESERVING 100% RICH CONTENT)
          ===================================================================== */}
      <div className="akasa-vault-container">
        <div
          className="akasa-vault-header-toggle"
          onClick={() => setShowFullVault((v) => !v)}
          title="Toggle comprehensive canonical points & scientific bridge"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>📜</span>
            <strong style={{ color: '#fef08a', fontSize: '0.94rem' }}>
              ज्ञान-कोशः · Deep-Dive Philosophical &amp; Scientific Compendium
            </strong>
          </div>
          <span className="akasa-vault-toggle-badge">
            {showFullVault ? '▲ Collapse Vault' : '▼ Expand Full Knowledge'}
          </span>
        </div>

        {showFullVault && (
          <div className="akasa-vault-content-body">
            {/* 1. Canonical Sūtra Quote Box */}
            <div className="akasa-slide-sutra-box">
              <div className="akasa-slide-sutra-text">&ldquo;{activeStop.sanskritSutra}&rdquo;</div>
              <div className="akasa-slide-sutra-ref">{activeStop.sanskritSutraRef}</div>
            </div>

            {/* 2. Core Philosophical Insight Callout */}
            <div className="akasa-slide-insight-box">
              <strong style={{ color: '#38bdf8' }}>💡 Core Ontological Principle: </strong>
              {activeStop.coreInsight}
            </div>

            {/* 3. Detailed Points Infographic Grid */}
            <div className="akasa-slide-points-grid">
              {activeStop.points.map((pt, pIdx) => (
                <div key={pIdx} className="akasa-slide-point-item">
                  <div className="akasa-slide-point-top">
                    <span style={{ fontSize: '1.25rem' }}>{pt.icon}</span>
                    <span className="akasa-slide-point-title">
                      {pt.labelDev}{' '}
                      <span style={{ opacity: 0.75, fontSize: '0.8em' }}>({pt.labelEn})</span>
                    </span>
                  </div>
                  <p className="akasa-slide-point-desc">{pt.desc}</p>
                </div>
              ))}
            </div>

            {/* 4. Bridge to Modern Science Box */}
            <div className="akasa-slide-modern-bridge">
              <strong style={{ color: '#86efac' }}>🔬 Bridge to Modern Physics: </strong>
              {activeStop.modernScienceBridge}
            </div>

            {/* 5. Sage Kaṇāda's Wisdom Quote Box */}
            <div className="akasa-slide-quote-box">
              &ldquo;{activeStop.kanadaQuote}&rdquo; — महर्षिः कणादः (Sage Kaṇāda)
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          6. SLIDESHOW BOTTOM NAVIGATION BAR
          ===================================================================== */}
      <div className="akasa-slideshow-bottom-nav">
        <button
          type="button"
          className="akasa-step-act-btn"
          style={{ width: 'auto', padding: '0.55rem 1.25rem', background: 'rgba(30, 41, 59, 0.8)' }}
          onClick={() => {
            setIsVideoAutoTour(false);
            handlePrev();
          }}
          title="Previous stop (Left Arrow)"
        >
          ◀ Previous Place
        </button>

        {/* Small Dot Station Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          {JOURNEY_STOPS.map((_, i) => (
            <span
              key={i}
              onClick={() => {
                setIsVideoAutoTour(false);
                goToStop(i);
              }}
              style={{
                display: 'inline-block',
                width: i === currentStopIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '999px',
                background: i === currentStopIndex ? activeStop.accentColor : '#475569',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              title={`Stop ${i + 1}`}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          {onReturnToGame && (
            <button
              type="button"
              className="akasa-step-act-btn is-primary"
              style={{ width: 'auto', padding: '0.55rem 1.15rem' }}
              onClick={onReturnToGame}
            >
              🎮 Potter’s Wheel
            </button>
          )}

          {currentStopIndex < JOURNEY_STOPS.length - 1 ? (
            <button
              type="button"
              className="akasa-step-act-btn is-gold"
              style={{ width: 'auto', padding: '0.55rem 1.35rem' }}
              onClick={() => {
                setIsVideoAutoTour(false);
                handleNext();
              }}
              title="Next stop (Right Arrow)"
            >
              Next Place ▶
            </button>
          ) : (
            onTakeQuiz && (
              <button
                type="button"
                className="akasa-step-act-btn is-gold"
                style={{ width: 'auto', padding: '0.55rem 1.35rem' }}
                onClick={onTakeQuiz}
              >
                🏆 Take Sage’s Quiz ➔
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
