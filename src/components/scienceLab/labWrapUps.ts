/**
 * End-of-game wrap-ups for non-preschool Vijñāna Lab games.
 * Summaries, terms, and check questions are taken only from each game's
 * existing quest, vocabulary, and on-screen copy. No new sources or quotes.
 */
import type { LabSegmentId } from './common';

export interface LabWrapTerm {
  dev: string;
  iast: string;
  en: string;
}

export interface LabWrapQuestion {
  q: string;
  choices: [string, string, string];
  answer: 0 | 1 | 2;
}

export interface LabWrapUpData {
  learned: string;
  terms: LabWrapTerm[];
  /** Omitted when the game already has its own end quiz or riddle set. */
  check?: LabWrapQuestion[];
}

export const LAB_WRAP_UPS: Partial<Record<LabSegmentId, LabWrapUpData>> = {
  'asato-ma': {
    learned: 'Shapes change when you melt, boil or burn, but the stuff itself does not disappear — that is seeing sat (what is real) behind asat (what only looks different).',
    terms: [
      { dev: 'सत्', iast: 'sat', en: 'being, the real' },
      { dev: 'असत्', iast: 'asat', en: 'non-being, the unreal' },
    ],
    check: [
      { q: 'When ice becomes water and then steam, what does this lab ask you to watch on the scale?', choices: ['Whether the weight is still the same', 'Whether the colour becomes gold', 'Whether the steam disappears into nothing'], answer: 0 },
      { q: 'In this game, sat means:', choices: ['being, the real', 'a kind of rocket fuel', 'a monsoon wind'], answer: 0 },
      { q: 'The Viveka Scanner is a playful way to:', choices: ['Move from the everyday look of a thing to what stays the same underneath', 'Count tree leaves from one branch', 'Launch a lander at the lunar south pole'], answer: 0 },
    ],
  },
  prakriti: {
    learned: 'A forest stays healthy when producers, grazers and predators are kept in balance through changing rain and temperature — and no group falls to zero.',
    terms: [
      { dev: 'अन्नम्', iast: 'annam', en: 'Biomass and nourishment — what plants make and the food web shares' },
      { dev: 'उत्पादकाः', iast: 'utpādakāḥ', en: 'Primary producers: plants and photosynthetic vegetation' },
      { dev: 'शाकाहारिणः', iast: 'śākāhāriṇaḥ', en: 'Herbivores: grazers that eat plant biomass' },
    ],
    check: [
      { q: 'What is the goal of the biosphere sandbox?', choices: ['Keep stable food-web cycles so no group falls to zero', 'Melt a sample until the scale reads zero', 'Draw a perfect square with only a rope'], answer: 0 },
      { q: 'उत्पादकाः (utpādakāḥ) in this lab are:', choices: ['Primary producers (plants)', 'Apex predators', 'Rock layers in a temple tower'], answer: 0 },
      { q: 'If herbivores fall to zero, the lab treats that as:', choices: ['Local extinction of that group', 'A successful harvest year', 'Escape velocity'], answer: 0 },
    ],
  },
  chaturyoni: {
    learned: 'The texts sort living beings by how they are born: jarāyuja (womb), aṇḍaja (egg), svedaja (moisture and heat, in the text), and udbhijja (sprouting from the earth). The lab also notes where modern biology disagrees with “moisture-born” insects.',
    terms: [
      { dev: 'जरायुज', iast: 'jarāyuja', en: 'womb-born; jarāyu is the membrane around an unborn young' },
      { dev: 'अण्डज', iast: 'aṇḍaja', en: 'egg-born' },
      { dev: 'उद्भिज्ज', iast: 'udbhijja', en: 'sprouting, breaking through the earth' },
    ],
    check: [
      { q: 'Jarāyuja means a being is:', choices: ['Born from a womb, enclosed in a jarāyu', 'Born from an egg', 'Born as a temple spire'], answer: 0 },
      { q: 'Aṇḍaja means:', choices: ['Egg-born', 'Womb-born', 'A kind of metre in Piṅgala'], answer: 0 },
      { q: 'What does this lab’s modern note say about beings the text calls svedaja (moisture-born)?', choices: ['Insects hatch from eggs; there is no spontaneous generation', 'They are the same as womb-born mammals', 'They are a kind of orbit'], answer: 0 },
    ],
  },
  jyotisha: {
    learned: 'An orbit is a path where forward speed balances the Sun’s pull: too slow falls in, too fast flies off. The lab uses normalised sizes so you can see the motion — real space is far larger.',
    terms: [
      { dev: 'कक्षा', iast: 'kakṣā', en: 'Orbit — a continuous freefall path around a central body' },
      { dev: 'गुरुत्वाकर्षणम्', iast: 'gurutvākarṣaṇam', en: 'Gravitational attraction between masses' },
      { dev: 'पलायन-वेगः', iast: 'palāyana-vegaḥ', en: 'Escape velocity — the speed needed to break free of gravity' },
    ],
    check: [
      { q: 'If the launched body moves too slowly, what happens?', choices: ['It falls in toward the Sun', 'It forms a Chladni sand pattern', 'The scale reading changes'], answer: 0 },
      { q: 'If it moves too fast, what happens?', choices: ['It flies off (escapes)', 'It becomes womb-born', 'The temple joints lock'], answer: 0 },
      { q: 'Why are sizes in this sandbox not true-to-scale?', choices: ['At true scale, planets would be sub-pixel specks', 'The Śulba-sūtras forbid true scale', 'Ujjain is not on the Tropic of Cancer'], answer: 0 },
    ],
  },
  'nada-brahman': {
    learned: 'A real string’s pitch comes from its length, tension and density. Standing waves and Chladni patterns make those vibrations visible, and the five harmonics are labelled with the tanmātras as playful names — not a claim that the texts are modern acoustics.',
    terms: [
      { dev: 'नाद', iast: 'nāda', en: 'sound, resonance' },
      { dev: 'नादब्रह्म', iast: 'nāda-brahman', en: 'ultimate reality as sound' },
      { dev: 'आहत', iast: 'āhata', en: 'struck sound' },
    ],
    check: [
      { q: 'In this lab, frequency of the string comes from:', choices: ['The physics of the string (length, tension, density)', 'The colour of the sandbox background', 'The number of villages in a census'], answer: 0 },
      { q: 'Nāda means:', choices: ['Sound, resonance', 'A dry-masonry joint', 'Escape velocity'], answer: 0 },
      { q: 'The five harmonic buttons carry the five tanmātras:', choices: ['As playful labels, not as a physics proof from the texts', 'As rocket casing types', 'As the four ways life is born'], answer: 0 },
    ],
  },
  paramanu: {
    learned: 'In the Vaiśeṣika picture used here, two paramāṇus join as a dvyaṇuka, and three dvyaṇukas make a tryaṇuka — the first visible speck. The anu is existent and uncaused, so this school calls it eternal; everyday things you build are caused, so they are temporary.',
    terms: [
      { dev: 'परमाणु', iast: 'paramāṇu', en: 'the smallest, indivisible, imperceptible particle in this system' },
      { dev: 'द्व्यणुक', iast: 'dvyaṇuka', en: 'a pair: two paramāṇus joined' },
      { dev: 'त्र्यणुक', iast: 'tryaṇuka', en: 'a triad: three dvyaṇukas clustered, the first visible speck' },
    ],
    check: [
      { q: 'A dvyaṇuka is made by joining:', choices: ['Two paramāṇus', 'Three moons', 'Four laghu beats'], answer: 0 },
      { q: 'A tryaṇuka is:', choices: ['Three dvyaṇukas clustered — the first visible speck in this model', 'A village census officer', 'A type of dry-masonry joint'], answer: 0 },
      { q: 'Why does this lab call the anu eternal in the Vaiśeṣika view?', choices: ['It is existent and uncaused; what you build is caused, so temporary', 'It is a modern electron', 'It is the Ujjain meridian'], answer: 0 },
    ],
  },
  chandrayaan: {
    learned: 'A soft landing needs low leftover downward speed and a level craft. This sandbox uses Sanskrit HUD words beside modern flight quantities as a teaching parallel — not a claim that Jyotiṣa already contained rocket equations. Chandrayaan-3’s Vikram soft-landed near the lunar south pole on 23 August 2023, at the site named Shiv Shakti Point.',
    terms: [
      { dev: 'कक्षा', iast: 'kakṣyā', en: 'orbit, enclosure' },
      { dev: 'वेग', iast: 'vega', en: 'speed, velocity' },
      { dev: 'उच्चता', iast: 'uccatā', en: 'height' },
    ],
    check: [
      { q: 'What is the landing goal in this mission?', choices: ['Touch down gently at the Moon’s south pole', 'Keep herbivores above zero', 'Count all 2ⁿ metres'], answer: 0 },
      { q: 'Vega in the HUD means:', choices: ['Speed, velocity', 'A kind of womb-birth', 'A dry-stone joint'], answer: 0 },
      { q: 'The Sanskrit HUD labels in this lab are:', choices: ['A teaching parallel, not a claim that Jyotiṣa proves orbital mechanics', 'Proof that the Sūrya Siddhānta launched Chandrayaan-3', 'The same as Agnicūrṇa propellant ratios'], answer: 0 },
    ],
  },
  'srishti-sthiti-laya': {
    learned: 'Sṛṣṭi, sthiti and laya are a cycle you can feel: a pattern is gathered, held, then allowed to dissolve — like nature’s cycles — and the underlying “stuff” is not treated as created from nothing.',
    terms: [
      { dev: 'सत्', iast: 'sat', en: 'Being, fundamental existence' },
      { dev: 'तत् त्वम् असि', iast: 'tat tvam asi', en: '“That Thou Art” — the mahāvākya used in Uddālaka’s teaching of oneness' },
    ],
    // Empirical Mastery Quiz (8 Qs) already lives in this game.
  },
  agnibana: {
    learned: 'Flight path depends on casing, fuel and launch angle. The playground lets you compare traditional bamboo casings with hammered iron, and to hear the Sanskrit names for the fire-arrow and its powder.',
    terms: [
      { dev: 'अग्निबाणः', iast: 'agnibāṇaḥ', en: 'Fire arrow / rocket' },
      { dev: 'अग्निचूर्णम्', iast: 'agnicūrṇam', en: 'Gunpowder mixture' },
    ],
    check: [
      { q: 'What three things does this quest ask you to set before you measure the distance?', choices: ['Casing and fuel, the angle, then launch', 'Only the lunar day', 'Only a laghu or guru beat'], answer: 0 },
      { q: 'Agnibāṇaḥ means:', choices: ['Fire arrow / rocket', 'Womb-born', 'Prime meridian'], answer: 0 },
      { q: 'Agnicūrṇam means:', choices: ['Gunpowder mixture', 'A 3×3 poetry grid', 'Orbital escape speed'], answer: 0 },
    ],
  },
  'vedic-geometry': {
    learned: 'Rekhā-gaṇita is the mathematics of traced lines: a rekhā is the path a moving point leaves behind. With rope and pegs you can form squares and altar shapes the way the Śulba tradition describes.',
    terms: [
      { dev: 'रेखागणितम्', iast: 'rekhā-gaṇitam', en: 'Geometry / calculation of traced lines' },
      { dev: 'वृत्तम् · वर्तुलम्', iast: 'vṛttam · vartulam', en: 'Circle / rotational trajectory' },
    ],
    check: [
      { q: 'In this lab, a rekhā is described as:', choices: ['The path traced by a moving point', 'A moisture-born insect', 'A census officer'], answer: 0 },
      { q: 'The quest asks you to draw shapes using:', choices: ['Only a rope and pegs', 'A rocket casing and saltpetre', 'A 3×3 syllable grid'], answer: 0 },
      { q: 'Rekhā-gaṇitam is given here as:', choices: ['Geometry / calculation of traced lines', 'Escape velocity', 'The seven-limb state'], answer: 0 },
    ],
  },
  'mantra-acoustics': {
    learned: 'On a sonometer, frequency is inversely proportional to length (f ∝ 1/L): slide the bridge, pluck, and the note changes as the law predicts. Other benches in the same lab take up chandas timing and the Chamakam number pattern.',
    terms: [
      { dev: 'स्वर-प्रमाणम्', iast: 'svara-pramāṇam', en: 'Sonometer string law: frequency is inversely proportional to length (f ∝ 1/L)' },
      { dev: 'छन्दस्-परिमाणम्', iast: 'chandas-parimāṇam', en: 'Mātrā time quantisation of short and long beats' },
    ],
    check: [
      { q: 'If you shorten the sounding length of the string, the frequency:', choices: ['Rises (f ∝ 1/L)', 'Always falls to zero', 'Becomes a womb-born mammal'], answer: 0 },
      { q: 'The first experiment asks you to:', choices: ['Slide the mechanical bridge and pluck the wire', 'Land Vikram at Shiv Shakti Point', 'Audit four villages'], answer: 0 },
      { q: 'Svara-pramāṇam in this lab names:', choices: ['The sonometer length–frequency law', 'The Ujjain prime meridian', 'Dry-masonry joints'], answer: 0 },
    ],
  },
  'temple-engineering': {
    learned: 'Stones can stand without cement when joints interlock and the weight is balanced. In this bench, Sandhi Bandhana (interlocking dry masonry) is compared with rigid mortar, and you can drag tiers and test them against shaking.',
    terms: [
      { dev: 'सन्धि-बन्धनम्', iast: 'sandhi-bandhanam', en: 'Interlocking dry masonry / kinetic joint engineering' },
      { dev: 'वास्तुपुरुष-मण्डलम्', iast: 'vāstupuruṣa-maṇḍalam', en: 'The ground-plan matrix used for the temple layout' },
    ],
    check: [
      { q: 'What does “Drag & Nudge” ask you to do?', choices: ['Click or touch stone tiers to shift them, then realign', 'Pluck a sonometer wire', 'Sort a deer into aṇḍaja'], answer: 0 },
      { q: 'Sandhi-bandhanam means:', choices: ['Interlocking dry masonry joints', 'A binary metre decoder', 'Lunar height'], answer: 0 },
      { q: 'The quest’s last step is to:', choices: ['Test the tower against shaking', 'Count 2ⁿ rhythm patterns', 'Set tax rates for a kingdom'], answer: 0 },
    ],
  },
  rituparna: {
    learned: 'A careful sample can estimate the whole: count leaves and fruits on some branches, then scale by how much of the canopy you sampled — the method this lab attributes to King Ṛtuparṇa’s saṅkhyāna.',
    terms: [
      { dev: 'साङ्ख्यानम्', iast: 'saṅkhyānam', en: 'Quantitative estimation / empirical statistical sampling' },
      { dev: 'अक्षहृदयम्', iast: 'akṣahṛdayam', en: 'The secret science of dice, permutations, and probability' },
      { dev: 'समष्टि-मानम्', iast: 'samaṣṭi-mānam', en: 'Total population parameter (the whole canopy)' },
    ],
    check: [
      { q: 'How does this quest tell you to estimate the whole tree?', choices: ['Count one branch, count the branches, then estimate the whole', 'Melt the sample and read the scale', 'Launch at 80 atm'], answer: 0 },
      { q: 'Saṅkhyānam in this lab means:', choices: ['Quantitative estimation / sampling', 'A temple spire', 'Struck sound'], answer: 0 },
      { q: 'Samaṣṭi-mānam is:', choices: ['The total population parameter (the whole canopy)', 'Escape velocity', 'A laghu beat'], answer: 0 },
    ],
  },
  kautilya: {
    learned: 'Kauṭilya models the state as seven living limbs (saptāṅga). In this lab you adjust those allocations, audit villages with the gopa’s census, and try to keep the kingdom stable.',
    terms: [
      { dev: 'अर्थशास्त्रम्', iast: 'arthaśāstra', en: 'Science of wealth, quantitative administration, and governance' },
      { dev: 'सप्ताङ्ग-राज्यम्', iast: 'saptāṅga-rājyam', en: 'The seven organic limbs of the state' },
      { dev: 'गोपः', iast: 'gopa', en: 'Village census and statistical survey officer' },
    ],
    // Level-Up Quiz Arena already lives in this game.
  },
  chandahshastra: {
    learned: 'Piṅgala builds metres from laghu (short, one beat) and guru (long, two beats). Prastāra lists every pattern; naṣṭa and uddiṣṭa move between a pattern and its rank number; the Meruprastāra arranges the counts in a triangle.',
    terms: [
      { dev: 'छन्दःशास्त्रम्', iast: 'chandaḥśāstra', en: 'The science of poetic metres, rhythm, and combinatorics' },
      { dev: 'प्रस्तारः', iast: 'prastāra', en: 'Systematic listing of all 2ⁿ short–long patterns' },
      { dev: 'नष्टम्', iast: 'naṣṭa', en: 'Finding the metre form from its rank number' },
    ],
    // Chandas Challenge Arena already lives in this game.
  },
  'ujjain-geodesy': {
    learned: 'A śaṅku (gnomon) turns the Sun’s shadow into a clock and a compass. This lab presents Ujjain (Avantī) as the Madhya-Rekhā — the traditional 0° meridian — and as Nābhideśa, where solar noon on the summer solstice was said to give a zero shadow because the meridian met the Tropic of Cancer.',
    terms: [
      { dev: 'मध्यरेखा', iast: 'madhya-rekhā', en: 'The traditional prime meridian, here identified with Ujjain' },
      { dev: 'शङ्कुः', iast: 'śaṅkuḥ', en: 'Gnomon — the upright rod whose shadow is measured' },
      { dev: 'नाभिदेशः', iast: 'nābhideśaḥ', en: '“Navel of the Earth” — the meeting of that meridian with the Tropic of Cancer, as this lab presents it' },
    ],
    check: [
      { q: 'A śaṅku in this lab is:', choices: ['A gnomon — the upright rod that casts the shadow', 'A rocket casing', 'A womb-born animal'], answer: 0 },
      { q: 'Madhya-Rekhā is presented here as:', choices: ['The traditional 0° meridian, identified with Ujjain', 'The frequency law f ∝ 1/L', 'The four kinds of birth'], answer: 0 },
      { q: 'Nābhideśa is explained as the place where:', choices: ['The meridian meets the Tropic of Cancer, giving a zero noon shadow at the summer solstice', 'Tipu’s rockets were forged', 'Piṅgala listed 2ⁿ metres'], answer: 0 },
    ],
  },
  citrakavya: {
    learned: 'Citrakāvya hides words in a grid: you trace rows, columns and other paths across a 3×3 syllable square, and in the bandha benches the same idea becomes a lotus, a wheel, or a drum lattice. The studio already has Dharmadāsa’s 19 riddles as its check.',
    terms: [
      { dev: 'चित्रकाव्य', iast: 'citrakāvya', en: 'Picture-poetry: words arranged in a visible geometric pattern' },
      { dev: 'पद्म-बन्ध', iast: 'padma-bandha', en: 'The 8-petal lotus bloom grid' },
      { dev: 'चक्र-बन्ध', iast: 'cakra-bandha', en: 'The 8-spoke rotary wheel grid' },
    ],
    // 19 riddles are the game itself.
  },
};
