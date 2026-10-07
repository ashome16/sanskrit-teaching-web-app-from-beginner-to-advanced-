import React, { useState, useEffect, useMemo } from 'react';
import BodhiAvatar from '../BodhiAvatar';
import { speakAsBodhi } from '../../utils/pronunciation';
import type { LabSegmentId } from './common';

export interface LabBodhiConsoleProps {
  activeSegment: LabSegmentId;
  onExploreChallenge?: () => void;
}

interface LabQuizQuestion {
  id: string;
  q: string;
  options: string[];
  correct: number;
  explanation: string;
  sanskritContext: string;
}

interface SegmentLore {
  title: string;
  dev: string;
  bodhiIntro: string;
  keyConcepts: { label: string; text: string }[];
  faqs: { q: string; a: string; devAudio?: string }[];
  quizzes: LabQuizQuestion[];
}

const SEGMENT_LORE: Record<LabSegmentId, SegmentLore> = {
  paramanu: {
    title: 'Vaiśeṣika Atomic Foundations',
    dev: 'कणादस्य परमाणुवादः',
    bodhiIntro:
      'Namaste, explorer! Sage Kaṇāda (कणादः) posited that if you keep cutting grain, you eventually reach an indivisible seed-particle: the Paramāṇu. Two paramāṇus bind into a Dvyaṇuka, and three Dvyaṇukas compose a Tryaṇuka — the first speck visible in a sunbeam! Test your grasp below.',
    keyConcepts: [
      { label: 'Paramāṇu (परमाणुः)', text: 'The indivisible, imperceptible sub-microscopic building block.' },
      { label: 'Tryaṇuka / Trasareṇu (त्र्यणुकः)', text: '6-atom composite structure, the threshold of visual perception.' },
      { label: 'Ākāśa Exclusion', text: 'Unlike earth, water, fire and wind, Ākāśa (space) is non-atomic and all-pervading.' },
    ],
    faqs: [
      {
        q: 'Why did Kaṇāda claim paramāṇus must be indivisible?',
        a: 'If matter were infinitely divisible, a mustard seed (sarṣapa) and the mighty Meru mountain would contain an equal infinity of parts, collapsing proportional volume. Hence, an irreducible minimum must exist.',
        devAudio: 'परमाणुः निरवयवः नित्यः',
      },
      {
        q: 'How does Vaiśeṣika differ from modern Daltonian atoms?',
        a: 'Kaṇāda’s paramāṇus possessed qualitative sensory faculties (taste, scent, color) inherited by their substance, whereas modern atoms are subatomic assemblies of quarks and leptons.',
        devAudio: 'पृथिव्यप्तेजोवायवः',
      },
    ],
    quizzes: [
      {
        id: 'paramanu-q1',
        q: 'What is the smallest composite particle visible to the naked human eye in Vaiśeṣika physics?',
        options: ['Paramāṇu (परमाणुः)', 'Dvyaṇuka (द्व्यणुकः)', 'Tryaṇuka / Trasareṇu (त्र्यणुकः)', 'Mahābhūta (महाभूतम्)'],
        correct: 2,
        explanation: 'Three Dvyaṇukas (totalling six paramāṇus) form a Tryaṇuka, described as the minute dust mote floating in a sunbeam.',
        sanskritContext: 'जालसूर्यमरीचिस्थं यत्सूक्ष्मं दृश्यते रजः। तस्य षष्ठतमो भागः परमाणुः स उच्यते॥',
      },
      {
        id: 'paramanu-q2',
        q: 'Which of the five Mahābhūtas is NOT atomic in structure in classical Nyāya-Vaiśeṣika?',
        options: ['Pṛthivī (Earth)', 'Ākāśa (Ether/Space)', 'Tejas (Fire)', 'Vāyu (Air)'],
        correct: 1,
        explanation: 'Ākāśa is vibhu (all-pervasive) and eka (singular), hence it is not composed of particulate paramāṇus.',
        sanskritContext: 'आकाशं तु विभु नित्यं च।',
      },
      {
        id: 'paramanu-q3',
        q: 'What term did ancient Indian scholars use for the unseen causal potency uniting atoms?',
        options: ['Adṛṣṭa (अदृष्टम्)', 'Māyā (माया)', 'Guṇa (गुणः)', 'Pramāṇa (प्रमाणम्)'],
        correct: 0,
        explanation: 'Adṛṣṭa (unseen cosmic force/moral impetus) was cited as the catalytic driver of initial cosmic atomic combination.',
        sanskritContext: 'अदृष्टकारितम् अणूनां संयोगः।',
      },
    ],
  },
  prakriti: {
    title: 'Ayurvedic Biosphere & Tridoṣa Harmony',
    dev: 'प्रकृति-त्रिदोष-स्वास्थ्यम्',
    bodhiIntro:
      'Health in Āyurveda is not mere absence of disease; it is dynamic equilibrium (Samatva). Vāta governs movement, Pitta governs transformation, and Kapha governs stability. Tune into the 24-hour Dinacaryā clock and balance the Ṣaḍ-Rasas!',
    keyConcepts: [
      { label: 'Tridoṣa (त्रिदोषाः)', text: 'Vāta (vāyu+ākāśa), Pitta (tejas+ap), and Kapha (pṛthivī+ap).' },
      { label: 'Dinacaryā (दिनचर्या)', text: 'Circadian rhythm alignment: Kapha morning, Pitta midday, Vāta evening.' },
      { label: 'Ṣaḍ-Rasa (षड्रसाः)', text: 'Six tastes: Madhura, Amla, Lavaṇa, Kaṭu, Tikta, Kaṣāya.' },
    ],
    faqs: [
      {
        q: 'What is the classic definition of Svāsthya (health)?',
        a: 'Suśruta Saṃhitā defines it as balance of doṣas, balanced metabolic fire (samāgni), balanced tissues and excretion, alongside tranquility of soul, senses, and mind.',
        devAudio: 'समदोषः समाग्निश्च समधातुमलक्रियः। प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते॥',
      },
      {
        q: 'Why does digestion peak at midday?',
        a: 'Solar irradiance peaks between 10 AM and 2 PM, amplifying physiological Pitta and Jāṭharāgni (the digestive fire), making it ideal for the day’s main meal.',
        devAudio: 'मध्याह्ने पित्तप्रकोपः जाठराग्निः',
      },
    ],
    quizzes: [
      {
        id: 'prakriti-q1',
        q: 'Which Mahābhūtas compose the biological energy Pitta?',
        options: ['Tejas (Fire) + Ap (Water)', 'Vāyu (Air) + Ākāśa (Space)', 'Pṛthivī (Earth) + Ap (Water)', 'Tejas (Fire) + Vāyu (Air)'],
        correct: 0,
        explanation: 'Pitta embodies metabolic transformation and heat, derived from Fire and Water.',
        sanskritContext: 'पित्तं वह्न्यम्बुसम्भवम्।',
      },
      {
        id: 'prakriti-q2',
        q: 'During which hours of the circadian cycle does the Kapha doṣa naturally dominate in the morning?',
        options: ['2:00 AM – 6:00 AM', '6:00 AM – 10:00 AM', '10:00 AM – 2:00 PM', '2:00 PM – 6:00 PM'],
        correct: 1,
        explanation: 'Kapha governs 6 AM to 10 AM (and 6 PM to 10 PM), characterised by heaviness and grounded calm.',
        sanskritContext: 'पूर्वाह्ने श्लेष्मणः कालः।',
      },
      {
        id: 'prakriti-q3',
        q: 'Which taste (Rasa) pacifies Pitta while strengthening digestion without heating?',
        options: ['Kaṭu (Pungent)', 'Amla (Sour)', 'Tikta (Bitter)', 'Lavaṇa (Salty)'],
        correct: 2,
        explanation: 'Tikta (bitter) is cooling and cleansing, directly pacifying fiery Pitta and heavy Kapha.',
        sanskritContext: 'तिक्तो रसः पित्तशमनः दीपनश्च।',
      },
    ],
  },
  jyotisha: {
    title: 'Celestial Mechanics & Purāṇic Constellations',
    dev: 'ज्योतिष-शिशुमार-मण्डलम्',
    bodhiIntro:
      'Welcome to ancient astronomy! Classical Indian astronomy mapped the 27 Nakṣatras and lunar orbital kinematics with remarkable precision. Meanwhile, Purāṇic texts visualised the revolving cosmos as the divine porpoise Śiśumāra anchored to Dhruva (the Pole Star) by cords of wind!',
    keyConcepts: [
      { label: 'Śiśumāra (शिशुमारः)', text: 'The cosmic dolphin constellation whose tail anchors to Dhruva (Bhāgavata 5.23).' },
      { label: 'Sūrya’s 7 Horses', text: 'Metaphorical representation of the 7 Vedic metres and solar optical spectrum.' },
      { label: 'Rāhu & Ketu (राहु-केतू)', text: 'Lunar orbital ascending and descending nodes producing eclipse alignments.' },
    ],
    faqs: [
      {
        q: 'What did Āryabhaṭa state about the apparent rotation of the stars?',
        a: 'In Āryabhaṭīya (Golapāda 9), Āryabhaṭa famously wrote that just as a person in a forward-moving boat sees stationary banks moving backward, so people on Earth see the stationary starry sphere moving westward.',
        devAudio: 'अनुलोमगतिर्नौस्थः पश्यत्यचलं विलोमगं यद्वत्। अचलानि भानि तद्वत् समपश्चिमगानि लङ्कायाम्॥',
      },
      {
        q: 'How did ancient Indian astronomers calculate trigonometry?',
        a: 'They halved the Greek chord to formulate Ardha-jyā (half-chord), which contracted to Jyā, passed into Arabic as Jīb, and into Latin as Sinus (modern Sine)!',
        devAudio: 'ज्या अर्धज्या कोटिज्या',
      },
    ],
    quizzes: [
      {
        id: 'jyotisha-q1',
        q: 'What is the celestial pivot at the tail of the Śiśumāra porpoise around which planets revolve in Purāṇic cosmography?',
        options: ['Dhruva (Pole Star)', 'Agastya (Canopus)', 'Bṛhaspati (Jupiter)', 'Sūrya (The Sun)'],
        correct: 0,
        explanation: 'Dhruva (Polaris) sits at the tip of the tail, anchoring the revolving celestial vault via Pravaha winds.',
        sanskritContext: 'पुच्छे ध्रुवः प्रतिष्ठितः।',
      },
      {
        id: 'jyotisha-q2',
        q: 'What do the 7 horses pulling Sūrya’s chariot symbolize in Vedic astronomical symbolism?',
        options: ['7 Oceans', '7 Vedic Metres & 7 Spectral Colours', '7 Continents (Dvīpas)', '7 Chakras'],
        correct: 1,
        explanation: 'They are named after the seven Vedic metres (Gāyatrī, Triṣṭubh, etc.), allegorising the 7 solar spectral wavelengths.',
        sanskritContext: 'सप्तच्छन्दांसि हयाः सूर्यस्य।',
      },
      {
        id: 'jyotisha-q3',
        q: 'How many Nakṣatras does the Moon traverse in a single sidereal orbital month (~27.3 days)?',
        options: ['12', '24', '27 (or 28 with Abhijit)', '360'],
        correct: 2,
        explanation: 'The Moon visits roughly one of the 27 Nakṣatras each solar day, completing the celestial circuit.',
        sanskritContext: 'सप्तविंशतिः नक्षत्राणि।',
      },
    ],
  },
  rituparna: {
    title: 'King Rituparna’s Statistical Sampling Lab',
    dev: 'ऋतुपर्णस्य साङ्ख्यान-कौशलम्',
    bodhiIntro:
      'Step into the Mahābhārata’s Nalopākhyāna! King Rituparna demonstrated humanity’s first recorded statistical sampling: estimating the leaves and fruits of a sprawling Vibhītaka tree by sampling a single branch. Test how scaling sample size drops sampling error!',
    keyConcepts: [
      { label: 'Saṅkhyāna (साङ्ख्यानम्)', text: 'The science of quantitative computation, empirical enumeration, and estimation.' },
      { label: 'Sampling Formula', text: 'Total Count ≈ (Sample Branch Count) × (Canopy Volume / Branch Volume).' },
      { label: 'Akṣa-vidyā Connection', text: 'Mastery of dice probability and randomness linked to statistical inference.' },
    ],
    faqs: [
      {
        q: 'How did Prince Nala verify King Rituparna’s bold claim?',
        a: 'Skeptical of the estimate, Nala halted the chariot, felled the massive Vibhītaka tree, and counted every single nut and leaf, discovering Rituparna’s prediction was astonishingly exact.',
        devAudio: 'ऋतुपर्णस्य साङ्ख्यानं विभीतकफलगणना',
      },
      {
        q: 'How did Kautilya’s Arthaśāstra apply quantitative estimation?',
        a: 'Kautilya mandated Gopas (census officers) to compile empirical household surveys, crop yields, and assigned maritime ventures tiered risk interest rates up to 240% to account for default risk.',
        devAudio: 'अर्थशास्त्रे सङ्ख्यान-विधिः',
      },
    ],
    quizzes: [
      {
        id: 'rituparna-q1',
        q: 'Which tree did King Rituparna sample to estimate its total leaves and fruits in the Mahābhārata?',
        options: ['Aśvattha (Peepal)', 'Vibhītaka (Terminalia bellirica)', 'Vaṭa (Banyan)', 'Nimbu (Neem)'],
        correct: 1,
        explanation: 'The tree was the Vibhītaka, whose fruits were also traditionally used as dice in gambling games.',
        sanskritContext: 'विभीतकं महावृक्षं दृष्ट्वा ऋतुपर्णोऽब्रवीत्।',
      },
      {
        id: 'rituparna-q2',
        q: 'What ancient discipline did Rituparna cite as the source of his estimation mastery?',
        options: ['Saṅkhyāna & Akṣa-hṛdaya (Calculation & Dice Science)', 'Dhanurveda (Archery)', 'Ayurveda', 'Vāstu-śāstra'],
        correct: 0,
        explanation: 'Rituparna taught Nala the secret of numbers (Saṅkhyāna) and dice games in exchange for horse management (Aśva-hṛdaya).',
        sanskritContext: 'अहम् अक्षहृदयं जाने सङ्ख्यानं च नराधिप।',
      },
      {
        id: 'rituparna-q3',
        q: 'In combinatorics, Acharya Pingala’s Meruprastāra preceded which modern mathematical structure by over 1,500 years?',
        options: ['Euler’s Totient', 'Pascal’s Triangle / Binomial Coefficients', 'Fourier Transform', 'Markov Chains'],
        correct: 1,
        explanation: 'Meruprastāra systematically computes combinations of short and long poetic syllables, matching Pascal’s triangle.',
        sanskritContext: 'परे पूर्णम् इति मेरुप्रस्तारः।',
      },
    ],
  },
  'srishti-sthiti-laya': {
    title: 'The Loom of Āruṇi: Cosmic Conservation',
    dev: 'सृष्टि-स्थिति-लय-चक्रम्',
    bodhiIntro:
      'In Chāndogya Upaniṣad 6, sage Uddālaka Āruṇi instructs his son Śvetaketu: "Katham asataḥ saj jāyeta?" (How could being arise from non-being?). Nothing is created from nothing; matter cycles through emergence (Sṛṣṭi), sustained order (Sthiti), and dissolution (Laya).',
    keyConcepts: [
      { label: 'Ex Nihilo Nihil Fit', text: 'Being (Sat) cannot arise from non-being (Asat); conservation of substance.' },
      { label: 'Salt in Water Metaphor', text: 'Just as salt dissolved in water is invisible yet pervades every drop, Sat is everywhere.' },
      { label: 'Spandana (स्पन्दनम्)', text: 'The ceaseless micro-vibration pulsing through all manifest reality.' },
    ],
    faqs: [
      {
        q: 'What is the clay metaphor (Mṛttikā-dṛṣṭānta)?',
        a: 'By knowing a single lump of clay, all objects made of clay are known: their varying names are mere linguistic convention (Vācārambhaṇam), while clay alone is the true reality.',
        devAudio: 'वाचारम्भणं विकारो नामधेयं मृत्तिकेत्येव सत्यम्',
      },
      {
        q: 'How does Laya differ from total annihilation?',
        a: 'Laya is involution or dissolution back into the unmanifest causal ground (Prakṛti / Sat). Energy and particles are never lost or destroyed.',
        devAudio: 'न नाशः अपि तु लयः',
      },
    ],
    quizzes: [
      {
        id: 'srishti-q1',
        q: 'Which famous Upanishadic aphorism highlights that all diverse clay pots are fundamentally clay?',
        options: ['Aham Brahmāsmi', 'Vācārambhaṇaṃ vikāro nāmadheyam', 'Tat tvam asi', 'Neti neti'],
        correct: 1,
        explanation: 'Uddālaka explains that names and forms are verbal designations; the underlying substrate remains invariant.',
        sanskritContext: 'यथा सोम्यैकेन मृत्पिण्डेन सर्वं मृन्मयं विज्ञातं स्यात्।',
      },
      {
        id: 'srishti-q2',
        q: 'What substance dissolved in water did Uddālaka ask Śvetaketu to taste from different depths?',
        options: ['Sugar (Śarkarā)', 'Salt (Lavaṇa)', 'Sandalwood (Candana)', 'Milk (Kṣīra)'],
        correct: 1,
        explanation: 'Salt was dissolved in water: though unseen, it proved present in every sip, illustrating omnipresent Sat.',
        sanskritContext: 'लवणमेतदुदकेऽवधायाथ मा प्रातरुपसीदथाः।',
      },
      {
        id: 'srishti-q3',
        q: 'What does the cycle Sṛṣṭi · Sthiti · Laya represent in classical cosmological physics?',
        options: ['Only literal destruction', 'Emergence, Sustenance, and Dissolution / Conservation', 'Planetary eclipses', 'Medical diagnosis'],
        correct: 1,
        explanation: 'It models the continuous cycle of emergence, stable balance, and reintegration where mass-energy is preserved.',
        sanskritContext: 'उत्पत्ति-स्थिति-लयाः।',
      },
    ],
  },
  'nada-brahman': {
    title: 'Nāda Brahman & Harmonic Acoustic Physics',
    dev: 'नादब्रह्म-ध्वनिविज्ञानम्',
    bodhiIntro:
      'Sound in Sanskrit thought is not just an auditory sensation; it is the fundamental seed of manifest space! Explore string resonance, standing harmonics, and the five Tanmātras mapping onto acoustic frequencies.',
    keyConcepts: [
      { label: 'Āhata & Anāhata (आहत-अनाहत)', text: 'Struck audible physical sound vs. unstruck internal contemplative resonance.' },
      { label: 'Harmonic Formula', text: 'f = (n / 2L) × √(T / μ). Harmonic overtone series n = 1, 2, 3, 4, 5.' },
      { label: 'Śabda as Ākāśa Guṇa', text: 'Acoustic vibration is the direct sensory property of the space element.' },
    ],
    faqs: [
      {
        q: 'What is the Saṅgīta-Ratnākara’s praise of Nāda?',
        a: 'Śārṅgadeva states that Brahmā, Viṣṇu, and Śiva themselves are embodied as Sound (Nāda-tanu), and through sound the manifest universe exists.',
        devAudio: 'नादब्रह्म तनोति सर्वम्',
      },
      {
        q: 'Why are harmonics integer multiples?',
        a: 'Boundary constraints at both fixed ends of the sitār string allow only sinusoidal standing waves with wavelengths λ = 2L/n, producing frequencies f_n = n · f_1.',
        devAudio: 'नादस्य तरङ्गभेदाः',
      },
    ],
    quizzes: [
      {
        id: 'nada-q1',
        q: 'In Śārṅgadeva’s Saṅgīta-Ratnākara, what is sound produced by physical striking or friction termed?',
        options: ['Anāhata (अनाहत)', 'Āhata (आहत)', 'Sphoṭa (स्फोट)', 'Mātrā (मात्रा)'],
        correct: 1,
        explanation: 'Āhata nāda is struck/audible sound, while Anāhata is the unstruck primal vibration of consciousness.',
        sanskritContext: 'आहतोऽनाहतश्चेति द्विधा नादो निगद्यते।',
      },
      {
        id: 'nada-q2',
        q: 'Which Tanmātra (subtle sense potential) is linked to sound (Śabda) and Ākāśa in Sāṅkhya philosophy?',
        options: ['Śabda-tanmātra', 'Sparśa-tanmātra', 'Rūpa-tanmātra', 'Rasa-tanmātra'],
        correct: 0,
        explanation: 'Śabda-tanmātra generates space (Ākāśa) and is perceived through the auditory sense (Śrotra).',
        sanskritContext: 'शब्दतन्मात्राद् आकाशम्।',
      },
      {
        id: 'nada-q3',
        q: 'If you double string tension T while keeping length L and mass per unit length μ constant, the fundamental frequency f increases by approximately:',
        options: ['2.0x (Doubles)', '1.414x (Factor of √2)', '4.0x (Quadruples)', 'Remains unchanged'],
        correct: 1,
        explanation: 'Frequency is proportional to the square root of tension: √(2) ≈ 1.414.',
        sanskritContext: 'आवृत्तिः तनावस्य वर्गमूलसमानुपाती।',
      },
    ],
  },
  'asato-ma': {
    title: 'The Veil of Māyā: Sat, Asat & Mass Invariance',
    dev: 'असतो मा सद्गमय · तत्त्वविवेकः',
    bodhiIntro:
      'From the Bṛhadāraṇyaka Upaniṣad 1.3.28: "Asato mā sad gamaya" — lead me from the unreal to the real. In this lab, switch on the Viveka Scanner: while macroscopic forms burn or melt, the underlying atoms remain constant!',
    keyConcepts: [
      { label: 'Sat vs. Asat (सत्-असत्)', text: 'The imperishable fundamental reality vs. transitory, changing appearances.' },
      { label: 'Conservation of Atoms', text: 'In chemical combustion C₆H₁₀O₅ + 6 O₂ → 6 CO₂ + 5 H₂O, every single atom is accounted for.' },
      { label: 'Phonon Lattice Modes', text: 'Acoustic (in-phase) and Optical (out-of-phase) atomic oscillations.' },
    ],
    faqs: [
      {
        q: 'How does the Bṛhadāraṇyaka Upaniṣad gloss "Asato mā sad gamaya"?',
        a: 'The text directly explains: "Mṛtyur vā asat, sad amṛtam" (Death is asat, immortality is sat; lead me from mortality to immortality).',
        devAudio: 'मृत्युर् वा असत् सद् अमृतम्',
      },
      {
        q: 'What is the Viveka Scanner metaphor?',
        a: 'Viveka is discernment — looking past the phenomenal mask (Nāma-Rūpa) to witness the fundamental atomic and energetic truth.',
        devAudio: 'विवेकः नामरूपभेदनम्',
      },
    ],
    quizzes: [
      {
        id: 'asato-q1',
        q: 'Which sacred Upaniṣad contains the ancient prayer "Asato mā sad gamaya"?',
        options: ['Chāndogya Upaniṣad', 'Bṛhadāraṇyaka Upaniṣad (1.3.28)', 'Kaṭha Upaniṣad', 'Māṇḍūkya Upaniṣad'],
        correct: 1,
        explanation: 'It appears in Bṛhadāraṇyaka Upaniṣad 1.3.28 as part of the Pavamāna Abhyāroha chants.',
        sanskritContext: 'असतो मा सद्गमय तमसो मा ज्योतिर्गमय।',
      },
      {
        id: 'asato-q2',
        q: 'When wood combusts into ash, gas and smoke, what happens to the total number of carbon, hydrogen, and oxygen atoms?',
        options: ['Atoms are destroyed by heat', 'Atoms are conserved exactly (Sat remains intact)', 'Half the atoms convert to energy', 'Atoms duplicate'],
        correct: 1,
        explanation: 'Atoms rearrange into carbon dioxide and water vapor without a single particle being lost.',
        sanskritContext: 'परमाणूनां संरक्षणम्।',
      },
      {
        id: 'asato-q3',
        q: 'In solid state physics and lattice vibration, what mode has adjacent atoms oscillating in opposite directions?',
        options: ['Acoustic mode', 'Optical mode', 'Surface Rayleigh wave', 'Gravitational wave'],
        correct: 1,
        explanation: 'Optical phonon modes involve out-of-phase vibrations of adjacent atoms, which interact strongly with electromagnetic radiation.',
        sanskritContext: 'जालककम्पनम् प्रकाशीयरीत्या।',
      },
    ],
  },
  chaturyoni: {
    title: 'Chaturyoni: Ancient Indian Biological Taxonomy',
    dev: 'चतुर्योनि-जीवविज्ञानम्',
    bodhiIntro:
      'Ancient Indian naturalists categorized biological life into four primary origin classifications (Chaturyoni): Womb-born, Egg-born, Moisture-born, and Earth-sprouting. Compare these ancient observations with modern evolutionary phylogeny!',
    keyConcepts: [
      { label: 'Jarāyuja (जरायुज)', text: 'Viviparous / born from a placental womb (humans, mammals, cattle).' },
      { label: 'Aṇḍaja (अण्डज)', text: 'Oviparous / born from an egg (birds, reptiles, fish).' },
      { label: 'Svedaja (स्वेदज)', text: 'Organisms traditionally associated with heat, sweat and damp mist (insects, mites).' },
      { label: 'Udbhijja (उद्भिज्ज)', text: 'Organisms sprouting through the soil / plants (vanaspati, oṣadhi, creepers).' },
    ],
    faqs: [
      {
        q: 'What is the modern scientific clarification regarding Svedaja (heat/sweat born)?',
        a: 'Francesco Redi (1668) and Louis Pasteur (1859) disproved spontaneous generation. Microbes and insects hatch from eggs laid in warm, moist organic matter, not spontaneously from sweat.',
        devAudio: 'स्वेदज-शोधनम् जीवोत्पत्तिः',
      },
      {
        q: 'How did Manusmṛti classify flowering vs non-flowering fruiting plants?',
        a: 'Manusmṛti 1.47 distinguishes Vanaspati (trees bearing fruit without conspicuous external flowers, like the fig) from Vṛkṣa (trees with visible flowers and fruit).',
        devAudio: 'अपुष्पाः फलवन्तो ये ते वनस्पतयः स्मृताः',
      },
    ],
    quizzes: [
      {
        id: 'chaturyoni-q1',
        q: 'Which classification includes mammals and humans in the classical Chaturyoni system?',
        options: ['Aṇḍaja (अण्डज)', 'Jarāyuja (जरायुज)', 'Svedaja (स्वेदज)', 'Udbhijja (उद्भिज्ज)'],
        correct: 1,
        explanation: 'Jarāyuja means womb-born or encased in a placenta during embryonic gestation.',
        sanskritContext: 'जरायुजाः पशवश्च मानुषाश्च।',
      },
      {
        id: 'chaturyoni-q2',
        q: 'What Sanskrit term refers to plants that produce fruit without displaying visible external flowers (e.g. banyan, fig)?',
        options: ['Vanaspati (वनस्पतिः)', 'Vṛkṣa (वृक्षः)', 'Oṣadhi (ओषधिः)', 'Vīrudh (वीरुध्)'],
        correct: 0,
        explanation: 'Manusmṛti 1.47 defines Vanaspati as plants whose tiny flowers are hidden internally inside the fruit syconium.',
        sanskritContext: 'अपुष्पाः फलवन्तो ये ते वनस्पतयः स्मृताः।',
      },
      {
        id: 'chaturyoni-q3',
        q: 'Which Upanishad first introduced the threefold classification of life before the fourfold Chaturyoni was formalized?',
        options: ['Chāndogya Upaniṣad (6.3.1)', 'Kena Upaniṣad', 'Kaṭha Upaniṣad', 'Praśna Upaniṣad'],
        correct: 0,
        explanation: 'Chāndogya Upaniṣad 6.3.1 lists three biological origins: Āṇḍaja, Jīvaja, and Udbhijja.',
        sanskritContext: 'तेषां खल्वेषां भूतानां त्रीण्येव बीजानि भवन्ति।',
      },
    ],
  },
  chandrayaan: {
    title: 'Somayāna Mission-03 & Lunar Exploration',
    dev: 'सोमयानम् · चन्द्रयान-३ विज्ञानम्',
    bodhiIntro:
      'Step aboard ISRO’s historic Chandrayaan-3 mission! Master lunar orbit circularisation, guide Vikram Lander to a soft touchdown at Shiv Shakti Point (≤ 2.0 m/s), and deploy Pragyan rover with its LIBS laser spectrometer to detect elemental Sulphur!',
    keyConcepts: [
      { label: 'Soft Landing Spec', text: 'Vertical descent velocity must not exceed 2.0 m/s with tilt angle within ±12°.' },
      { label: 'LIBS Spectrometer', text: 'Laser-Induced Breakdown Spectroscopy identified Sulphur (गन्धकः) near the South Pole.' },
      { label: 'Shiv Shakti Point', text: 'The landing site coordinate (69.37° S, 32.35° E) honored by India.' },
    ],
    faqs: [
      {
        q: 'Why was Sulphur discovery significant on the Moon?',
        a: 'Detecting unambiguous Sulphur signatures via Pragyan’s LIBS confirmed volcanic mantle origin minerals without contamination from orbital solar reflectance.',
        devAudio: 'गन्धकतत्त्व-दर्शनम् विक्रम-प्रज्ञान',
      },
      {
        q: 'What is the Sanskrit technical term for an artificial space satellite?',
        a: 'Kṛtrimopagrahaḥ (कृत्रिमोपग्रहः), combining kṛtrima (man-made / artificial) and upagraha (satellite/orbiter).',
        devAudio: 'कृत्रिमोपग्रहः सोमयानम्',
      },
    ],
    quizzes: [
      {
        id: 'chandrayaan-q1',
        q: 'What was the touchdown velocity safety threshold for Vikram Lander’s soft touchdown on August 23, 2023?',
        options: ['≤ 2.0 m/s', '≤ 5.0 m/s', '≤ 10.0 m/s', '≤ 0.1 m/s'],
        correct: 0,
        explanation: 'ISRO engineered Vikram’s legs to absorb touchdown velocities up to 3.0 m/s, with the nominal target under 2.0 m/s.',
        sanskritContext: 'मन्दगति-अवतरणम् (Soft Landing).',
      },
      {
        id: 'chandrayaan-q2',
        q: 'Which element did Pragyan rover’s LIBS instrument decisively confirm on the lunar surface on 28 Aug 2023?',
        options: ['Sulphur (Gandhaka / गन्धकः)', 'Liquid Gold (Suvarṇa)', 'Pure Carbon (Heera)', 'Uranium'],
        correct: 0,
        explanation: 'LIBS fired laser pulses onto the soil and spectrally confirmed Sulphur along with Al, Ca, Fe, Cr, and Ti.',
        sanskritContext: 'गन्धकतत्त्वस्य प्रत्यक्षप्रमाणम्।',
      },
      {
        id: 'chandrayaan-q3',
        q: 'What official name was bestowed upon the Chandrayaan-3 landing site at 69.37° S, 32.35° E?',
        options: ['Shiv Shakti Point (शिवशक्ति-स्थानम्)', 'Tiranga Point', 'Vikram Sthal', 'Aryabhata Crater'],
        correct: 0,
        explanation: 'The site near the lunar South Pole was officially designated Shiv Shakti Point.',
        sanskritContext: 'शिवशक्ति-स्थानम् इति नामकरणम्।',
      },
    ],
  },
  agnibana: {
    title: 'Agnibāṇa & Pyrotechnic Alchemy',
    dev: 'अग्निबाण-शुक्रीनीति-रसायनम्',
    bodhiIntro:
      'Explore the ancient and medieval pyrotechnic chemistry of India! From the Śukranīti’s Agnicūrṇa 5:1:1 formula (saltpetre, sulphur, charcoal) to Kautilya’s Agniyoga and the world’s first cast-iron casing military rockets engineered in Mysore.',
    keyConcepts: [
      { label: 'Agnicūrṇa (अग्निचूर्णम्)', text: 'Fire-powder formula detailed in Śukranītisāra (Suvarcilavaṇa + Gandhaka + Aṅgāra).' },
      { label: 'Ulkā-Dāna (उल्का-दानम्)', text: 'The Skanda Purāṇa Deepavali tradition of lifting handheld fire-torches to illuminate ancestral paths.' },
      { label: 'Mysorean Iron Rockets (1780)', text: 'Hammered soft-iron motor tubes capable of high combustion pressure, transforming global ballistics.' },
    ],
    faqs: [
      {
        q: 'What is the recipe for Agnicūrṇa given in the Śukranīti?',
        a: 'The text specifies 5 parts Suvarcilavaṇa (potassium nitrate / saltpetre), 1 part Gandhaka (sulphur), and 1 part Aṅgāra (charcoal made from Calotropis gigantea / Arka wood).',
        devAudio: 'सुवर्चिलवणं गन्धकम् अङ्गारं च पञ्चैकेकभागशः',
      },
      {
        q: 'Why were Mysorean rockets superior to European paper-casing rockets of the era?',
        a: 'Iron casings withstood vastly higher internal chamber detonation pressures before bursting, providing higher thrust velocity and ranges over 1.5–2 kilometers.',
        devAudio: 'लोहनालाग्निबाणः मैसूरुसैन्यम्',
      },
    ],
    quizzes: [
      {
        id: 'agnibana-q1',
        q: 'What Sanskrit term for "fire-powder" appears in the medieval treatise Śukranītisāra?',
        options: ['Agnicūrṇa (अग्निचूर्णम्)', 'Kṣāra (क्षारः)', 'Rasa-sindūra (रससिन्दूरम्)', 'Vidyut (विद्युत्)'],
        correct: 0,
        explanation: 'Agnicūrṇa literally means fire-powder or explosive combustible powder.',
        sanskritContext: 'अग्निचूर्णम् उच्यते।',
      },
      {
        id: 'agnibana-q2',
        q: 'Which ritual recorded in the Skanda Purāṇa describes waving fiery flares on Deepavali night to guide ancestral spirits?',
        options: ['Ulkā-Dāna (उल्का-दानम्)', 'Homa', 'Agnihotra', 'Sandhyāvandanam'],
        correct: 0,
        explanation: 'Skanda Purāṇa prescribes Ulkā-Dāna (the offering of aerial firebrands) during Kārtika Deepavali.',
        sanskritContext: 'उल्काहस्ता नराः कुर्युः पितॄणां मार्गदर्शनम्।',
      },
      {
        id: 'agnibana-q3',
        q: 'What material innovation made 18th-century Mysorean war rockets far more lethal than European paper rockets?',
        options: ['Hammered soft-iron casing cylinders', 'Bamboo tubes', 'Glass containers', 'Earthen terracotta pots'],
        correct: 0,
        explanation: 'Hammered iron motor tubes allowed much higher internal combustion pressures without rupture.',
        sanskritContext: 'लोहनालं दहनबलम्।',
      },
    ],
  },
};

const RANKS = [
  { minPoints: 0, title: 'जिज्ञासुः', iast: 'Jijñāsu', en: 'Curious Seeker', icon: '🥉', badge: 'Level 1' },
  { minPoints: 100, title: 'अन्वेषकः', iast: 'Anveṣaka', en: 'Empirical Explorer', icon: '🥈', badge: 'Level 2' },
  { minPoints: 300, title: 'विद्वान्', iast: 'Vidvān', en: 'Vijñāna Scholar', icon: '🥇', badge: 'Level 3' },
  { minPoints: 600, title: 'ऋषि-वैज्ञानिकः', iast: 'Ṛṣi-Vijñānī', en: 'Cosmic Sage Scientist', icon: '👑', badge: 'Level 4' },
];

export const LabBodhiConsole: React.FC<LabBodhiConsoleProps> = ({ activeSegment }) => {
  const [vidyaPoints, setVidyaPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('vigyan_lab_vidya_points');
      return saved ? parseInt(saved, 10) || 50 : 50;
    } catch {
      return 50;
    }
  });

  const [activeTab, setActiveTab] = useState<'bodhi' | 'quiz' | 'lore'>('bodhi');
  const [userQuery, setUserQuery] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pointsToast, setPointsToast] = useState<{ amount: number; reason: string } | null>(null);

  // Quiz state for this segment
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  const lore = SEGMENT_LORE[activeSegment] || SEGMENT_LORE.paramanu;

  // Persist points
  useEffect(() => {
    try {
      localStorage.setItem('vigyan_lab_vidya_points', String(vidyaPoints));
    } catch {
      /* ignore */
    }
  }, [vidyaPoints]);

  const addPoints = (amount: number, reason: string) => {
    setVidyaPoints((prev) => prev + amount);
    setPointsToast({ amount, reason });
    setTimeout(() => {
      setPointsToast(null);
    }, 3800);
  };

  // Rank computation
  const currentRank = useMemo(() => {
    let r = RANKS[0];
    for (const rank of RANKS) {
      if (vidyaPoints >= rank.minPoints) r = rank;
    }
    return r;
  }, [vidyaPoints]);

  const nextRank = useMemo(() => {
    const idx = RANKS.findIndex((r) => r === currentRank);
    return idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
  }, [currentRank]);

  const progressPercent = useMemo(() => {
    if (!nextRank) return 100;
    const span = nextRank.minPoints - currentRank.minPoints;
    const curr = vidyaPoints - currentRank.minPoints;
    return Math.min(100, Math.max(0, Math.round((curr / span) * 100)));
  }, [currentRank, nextRank, vidyaPoints]);

  // Handle custom query to Bodhi
  const handleAskBodhi = (queryText: string) => {
    const qLower = queryText.toLowerCase();
    let reply = '';

    // Search segment FAQs
    const matchedFaq = lore.faqs.find(
      (f) => f.q.toLowerCase().includes(qLower) || qLower.includes(f.q.toLowerCase().slice(0, 15)),
    );

    if (matchedFaq) {
      reply = matchedFaq.a;
    } else if (qLower.includes('rituparna') || qLower.includes('sampling') || qLower.includes('tree')) {
      reply =
        'In the Nalopākhyāna (Mahābhārata), King Rituparna demonstrated sample-based estimation by isolating one Vibhītaka branch and scaling by canopy volume. Nala counted every fruit and confirmed the estimate!';
    } else if (qLower.includes('puranic') || qLower.includes('shishumara') || qLower.includes('porpoise')) {
      reply =
        'The Bhāgavata Purāṇa (5.23) allegorises the rotating stellar dome as the cosmic porpoise Śiśumāra, with Dhruva (the Pole Star) holding the celestial wheel through Pravaha winds.';
    } else if (qLower.includes('ayurveda') || qLower.includes('dosha') || qLower.includes('rasa')) {
      reply =
        'Āyurveda balances Vāta, Pitta, and Kapha through daily circadian routines (Dinacaryā) and the six dietary tastes (Madhura, Amla, Lavaṇa, Kaṭu, Tikta, Kaṣāya).';
    } else if (qLower.includes('paramanu') || qLower.includes('atom')) {
      reply =
        'In Kaṇāda’s Vaiśeṣika system, Paramāṇus are the imperceptible foundational building blocks of earth, water, fire, and air, joining into Dvyaṇukas and Tryaṇukas.';
    } else {
      reply = `${lore.bodhiIntro} You can also test your knowledge in the Lab Quiz tab below to earn Vidyā-Aṅka points!`;
    }

    setChatResponse(reply);
    addPoints(10, 'Asked Bodhi a Vijñāna inquiry');
  };

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    const stop = speakAsBodhi(text, {
      onEnd: () => setIsSpeaking(false),
    });
    setTimeout(() => {
      setIsSpeaking(false);
      stop();
    }, 12000);
  };

  const handleAnswerSelect = (qId: string, optIdx: number) => {
    if (quizSubmitted[qId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleQuizSubmit = (q: LabQuizQuestion) => {
    const sel = selectedAnswers[q.id];
    if (sel === undefined) return;
    setQuizSubmitted((prev) => ({ ...prev, [q.id]: true }));
    if (sel === q.correct) {
      addPoints(25, `Mastered ${q.id} in ${lore.title}!`);
    }
  };

  return (
    <aside className="vl-bodhi-console" aria-label="Ask Bodhi & Vidyā-Aṅka Console" data-testid="lab-bodhi-console">
      {/* Toast Alert for Vidyā Points */}
      {pointsToast && (
        <div className="vl-points-toast" role="alert">
          <span className="vl-points-plus">+{pointsToast.amount} विद्या-अङ्काः!</span>
          <span className="vl-points-reason">{pointsToast.reason}</span>
        </div>
      )}

      {/* Header with Rank & Points */}
      <div className="vl-bodhi-header">
        <div className="vl-bodhi-lead">
          <BodhiAvatar mood="scholar" size="sm" isSpeaking={isSpeaking} showHalo interactive />
          <div className="vl-bodhi-title-wrap">
            <div className="vl-bodhi-heading">
              <span className="vl-bodhi-name">बोधि-मार्गदर्शकः</span> · Ask Bodhi Vijñāna
            </div>
            <div className="vl-bodhi-sub">
              Your ancient science mentor for <b>{lore.title}</b> (<span lang="sa">{lore.dev}</span>)
            </div>
          </div>
        </div>

        {/* Vidyā Points Badge & Progress */}
        <div className="vl-vidya-badge">
          <div className="vl-vidya-top">
            <span className="vl-rank-icon">{currentRank.icon}</span>
            <span className="vl-rank-badge">{currentRank.badge}</span>
            <span className="vl-rank-name" lang="sa">
              {currentRank.title}
            </span>
            <span className="vl-vidya-total">{vidyaPoints} pts</span>
          </div>
          <div className="vl-vidya-progress-bar" title={`${progressPercent}% towards next rank`}>
            <div className="vl-vidya-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          {nextRank && (
            <div className="vl-vidya-next">
              Next: <span lang="sa">{nextRank.title}</span> at {nextRank.minPoints} pts ({nextRank.minPoints - vidyaPoints} to go)
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="vl-bodhi-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'bodhi'}
          className={`vl-tab-btn ${activeTab === 'bodhi' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('bodhi')}
        >
          💬 Ask Bodhi
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'quiz'}
          className={`vl-tab-btn ${activeTab === 'quiz' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          🎯 Lab Quiz & Points ({lore.quizzes.length} Questions)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'lore'}
          className={`vl-tab-btn ${activeTab === 'lore' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('lore')}
        >
          📜 Vijñāna Lore & Terms
        </button>
      </div>

      {/* TAB 1: ASK BODHI */}
      {activeTab === 'bodhi' && (
        <div className="vl-bodhi-body">
          <div className="vl-bodhi-speech">
            <p className="vl-bodhi-intro-text">
              {chatResponse ? chatResponse : lore.bodhiIntro}
            </p>
            <div className="vl-speech-actions">
              <button
                type="button"
                className="vl-voice-btn"
                onClick={() => handleSpeak(chatResponse ? chatResponse : lore.bodhiIntro)}
                title="Hear Bodhi speak"
              >
                🔊 {isSpeaking ? 'Speaking…' : 'Listen with Bodhi'}
              </button>
              {chatResponse && (
                <button
                  type="button"
                  className="vl-voice-btn vl-voice-btn--ghost"
                  onClick={() => setChatResponse(null)}
                >
                  ↺ Reset Prompt
                </button>
              )}
            </div>
          </div>

          <div className="vl-bodhi-faq-prompts">
            <span className="vl-faq-label">💡 Suggested Questions for {lore.title}:</span>
            <div className="vl-faq-chips">
              {lore.faqs.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  className="vl-faq-chip"
                  onClick={() => handleAskBodhi(f.q)}
                >
                  {f.q}
                </button>
              ))}
            </div>
          </div>

          <form
            className="vl-bodhi-ask-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (userQuery.trim()) {
                handleAskBodhi(userQuery.trim());
                setUserQuery('');
              }
            }}
          >
            <input
              type="text"
              className="vl-ask-input"
              placeholder={`Ask Bodhi about ${lore.title}, Sanskrit terms, or ancient science…`}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
            />
            <button type="submit" className="vl-ask-submit-btn">
              Ask Bodhi →
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: LAB QUIZ & REWARD POINTS */}
      {activeTab === 'quiz' && (
        <div className="vl-bodhi-quiz-wrap">
          <div className="vl-quiz-instructions">
            <b>Earn Vidyā-Aṅka Points!</b> Answer each question below to earn <b>+25 pts</b> and climb towards the rank of <b>ऋषि-वैज्ञानिकः</b>.
          </div>

          <div className="vl-quiz-grid">
            {lore.quizzes.map((q, idx) => {
              const sel = selectedAnswers[q.id];
              const submitted = quizSubmitted[q.id];
              const isCorrect = submitted && sel === q.correct;

              return (
                <div key={q.id} className={`vl-quiz-card ${submitted ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}`}>
                  <div className="vl-quiz-card-head">
                    <span className="vl-quiz-num">Q{idx + 1}</span>
                    <span className="vl-quiz-text">{q.q}</span>
                  </div>

                  <div className="vl-quiz-options">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = sel === oIdx;
                      let optClass = 'vl-quiz-opt';
                      if (submitted) {
                        if (oIdx === q.correct) optClass += ' is-ans-correct';
                        else if (isChosen && !isCorrect) optClass += ' is-ans-wrong';
                      } else if (isChosen) {
                        optClass += ' is-chosen';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          className={optClass}
                          disabled={submitted}
                          onClick={() => handleAnswerSelect(q.id, oIdx)}
                        >
                          <span className="vl-opt-bullet">{String.fromCharCode(65 + oIdx)}</span>
                          <span className="vl-opt-label">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="vl-quiz-card-foot">
                    {!submitted ? (
                      <button
                        type="button"
                        className="vl-quiz-check-btn"
                        disabled={sel === undefined}
                        onClick={() => handleQuizSubmit(q)}
                      >
                        Verify Answer (+25 pts)
                      </button>
                    ) : (
                      <div className="vl-quiz-feedback">
                        <div className={`vl-feedback-tag ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
                          {isCorrect ? '✅ समीचीनम् · Correct! (+25 विद्या-अङ्काः)' : '❌ न समीचीनम् · Keep Exploring!'}
                        </div>
                        <p className="vl-feedback-exp">{q.explanation}</p>
                        <div className="vl-feedback-sanskrit" lang="sa">
                          📜 {q.sanskritContext}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: LORE & TERMS */}
      {activeTab === 'lore' && (
        <div className="vl-bodhi-lore-wrap">
          <div className="vl-lore-concepts">
            <h4 className="vl-lore-heading">🏛️ Core Scientific Concepts in Classical Sanskrit:</h4>
            <div className="vl-concepts-grid">
              {lore.keyConcepts.map((c, i) => (
                <div key={i} className="vl-concept-card">
                  <div className="vl-concept-label">{c.label}</div>
                  <div className="vl-concept-text">{c.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="vl-lore-callout">
            <b>🔬 The Methodological Harmony:</b> Ancient treatises such as Kaṇāda’s <i>Vaiśeṣika Sūtras</i>, Caraka’s <i>Caraka Saṃhitā</i>, and the <i>Mahābhārata</i>’s Nalopākhyāna relied on rigorous empirical observation (Pratyakṣa), inferential logic (Anumāna), and reproducible testing. Explore the interactive dials and sliders in this laboratory to test these ancient theories yourself!
          </div>
        </div>
      )}
    </aside>
  );
};

export default LabBodhiConsole;
