/**
 * Pencil-Sketch Relative Clause Matcher Data
 * Visual riddles matching Sanskrit relative clauses (यत्-तत्, यत्र-तत्र, यथा-तथा, यदि-तर्हि, etc.)
 * Strictly excludes "यत्र धूमः तत्र अग्निः" for completely fresh pedagogical variety.
 */

export interface RelativeClauseRiddle {
  id: string;
  sketchId: string;
  riddleNumber: number;
  title: string;
  theme: string;
  relativeBlock: string;       // e.g. "यत्र प्रकाशः भवति"
  relativeTranslit: string;   // e.g. "Yatra prakāśaḥ bhavati"
  relativeMeaning: string;    // e.g. "Where there is light"
  correlativeBlock: string;    // e.g. "तत्र अन्धकारः नश्यति"
  correlativeTranslit: string;// e.g. "Tatra andhakāraḥ naśyati"
  correlativeMeaning: string; // e.g. "there darkness perishes"
  fullSanskrit: string;       // "यत्र प्रकाशः भवति, तत्र अन्धकारः नश्यति।"
  fullTranslit: string;
  englishTranslation: string; // "Where there is light, darkness disappears."
  riddleClue: string;
  philosophicalInsight: string;
  options: string[];
  sceneSketch: {
    title: string;
    description: string;
    focalSubjects: string[];
  };
}

export const RELATIVE_CLAUSE_RIDDLES: RelativeClauseRiddle[] = [
  // 1. प्रकाशः & अन्धकारः
  {
    id: 'riddle-1',
    sketchId: 'light_darkness',
    riddleNumber: 1,
    title: '१. ज्योतिर्मयः दीपः · The Dispeller of Night',
    theme: 'विद्याप्रकाशः (Light of Knowledge)',
    relativeBlock: 'यत्र प्रकाशः भवति',
    relativeTranslit: 'Yatra prakāśaḥ bhavati',
    relativeMeaning: 'Where light is',
    correlativeBlock: 'तत्र अन्धकारः नश्यति',
    correlativeTranslit: 'Tatra andhakāraḥ naśyati',
    correlativeMeaning: 'there darkness perishes',
    fullSanskrit: 'यत्र प्रकाशः भवति, तत्र अन्धकारः नश्यति।',
    fullTranslit: 'Yatra prakāśaḥ bhavati, tatra andhakāraḥ naśyati.',
    englishTranslation: 'Where there is light, darkness disappears.',
    riddleClue: 'A radiant sacred lamp is carried into a pitch-black cavern. What inevitable departure occurs the moment illumination touches the stone walls?',
    philosophicalInsight: 'Tamaso mā jyotir gamaya: Darkness has no independent existence; it is simply the absence of light. When knowledge arises, ignorance perishes instantly.',
    options: ['तत्र अन्धकारः नश्यति', 'तदा वसन्तः आयाति', 'तर्हि सस्यं रोहति', 'तथा भाषणं जायते'],
    sceneSketch: {
      title: 'Radiant Diya in Deep Cavern',
      description: 'Charcoal hatch cavern with graphite rays pushing back dark shadows.',
      focalSubjects: ['Golden Diya (दीपः)', 'Fading Shadows (अन्धकारः)', 'Cavern Wall (गुहा)'],
    },
  },

  // 2. कोकिलः & वसन्तः
  {
    id: 'riddle-2',
    sketchId: 'cuckoo_spring',
    riddleNumber: 2,
    title: '२. कोकिलकूजनम् · The Song of Spring',
    theme: 'ऋतुराजः (Seasonal Awakening)',
    relativeBlock: 'यदा कोकिलः कूजति',
    relativeTranslit: 'Yadā kokilaḥ kūjati',
    relativeMeaning: 'When the cuckoo sings',
    correlativeBlock: 'तदा वसन्तः आयाति',
    correlativeTranslit: 'Tadā vasantaḥ āyāti',
    correlativeMeaning: 'then spring arrives',
    fullSanskrit: 'यदा कोकिलः कूजति, तदा वसन्तः आयाति।',
    fullTranslit: 'Yadā kokilaḥ kūjati, tadā vasantaḥ āyāti.',
    englishTranslation: 'When the cuckoo sings, then spring has arrived.',
    riddleClue: 'High in the mango groves, a dark-feathered bird pours forth a melodious note across the forest. What season of blossoms follows its voice?',
    philosophicalInsight: 'Temporal relative clause (यदा...तदा). In classical Sanskrit poetry (Kāvya), the song of the Kokila is the universal herald of Ṛturāja Vasanta.',
    options: ['तदा वसन्तः आयाति', 'तत्र अन्धकारः नश्यति', 'सा सर्वत्र श्लाघ्यते', 'तदा पूजा आरभते'],
    sceneSketch: {
      title: 'Singing Kokila on Mango Blossom Bough',
      description: 'Pencil-sketched cuckoo bird perched with open beak on blossoming mango branches.',
      focalSubjects: ['Cuckoo Bird (कोकिलः)', 'Mango Blossoms (आम्रमञ्जरी)', 'Spring Breeze (वसन्तवातः)'],
    },
  },

  // 3. जलप्रवाहः & सस्यम्
  {
    id: 'riddle-3',
    sketchId: 'water_crops',
    riddleNumber: 3,
    title: '३. जीवनदायिनी सरित् · The Flowing Canal & Emerald Harvest',
    theme: 'कृषिसमृद्धिः (Nature’s Sustenance)',
    relativeBlock: 'यदि जलं प्रवहति',
    relativeTranslit: 'Yadi jalaṁ pravahati',
    relativeMeaning: 'If water flows',
    correlativeBlock: 'तर्हि सस्यं रोहति',
    correlativeTranslit: 'Tarhi sasyaṁ rohati',
    correlativeMeaning: 'then the crop grows',
    fullSanskrit: 'यदि जलं प्रवहति, तर्हि सस्यं रोहति।',
    fullTranslit: 'Yadi jalaṁ pravahati, tarhi sasyaṁ rohati.',
    englishTranslation: 'If water flows, then the crop grows.',
    riddleClue: 'A stone sluice gate is raised, letting fresh river currents surge through agricultural irrigation channels. What miracle of grain sprouts across the fields?',
    philosophicalInsight: 'Conditional clause (यदि...तर्हि). Illustrates the essential dependency of agricultural abundance on continuous flowing irrigation.',
    options: ['तर्हि सस्यं रोहति', 'तथा भाषणं जायते', 'सः धर्मेण रक्षितः', 'तत्र सुखं शाश्वतम्'],
    sceneSketch: {
      title: 'Flowing Sluice Channel & Lush Rice Shoots',
      description: 'Pencil sketch of rippling water channels feeding rows of verdant sprouting grain.',
      focalSubjects: ['Flowing Water (जलप्रवाहः)', 'Furrows (सीताः)', 'Sprouting Crop (सस्यम्)'],
    },
  },

  // 4. धर्मरक्षणम्
  {
    id: 'riddle-4',
    sketchId: 'dharmo_rakshati',
    riddleNumber: 4,
    title: '४. धर्मो रक्षति रक्षितः · The Cosmic Shield of Righteousness',
    theme: 'सदाचारः (Ethical Integrity)',
    relativeBlock: 'यः धर्मं रक्षति',
    relativeTranslit: 'Yaḥ dharmaṁ rakṣati',
    relativeMeaning: 'He who protects righteousness',
    correlativeBlock: 'सः धर्मेण रक्षितः',
    correlativeTranslit: 'Saḥ dharmeṇa rakṣitaḥ',
    correlativeMeaning: 'he is protected by righteousness',
    fullSanskrit: 'यः धर्मं रक्षति, सः धर्मेण रक्षितः।',
    fullTranslit: 'Yaḥ dharmaṁ rakṣati, saḥ dharmeṇa rakṣitaḥ.',
    englishTranslation: 'He who protects Dharma is protected by Dharma.',
    riddleClue: 'A brave warrior upholds truth and justice even in solitude against great adversity. What unseen spiritual armour guards his destiny?',
    philosophicalInsight: 'Immortal motto of the Supreme Court of India from Manu Smṛti (8.15): "धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः". One who protects righteousness is guarded by righteousness itself.',
    options: ['सः धर्मेण रक्षितः', 'तत्र सुखं शाश्वतम्', 'तर्हि सस्यं रोहति', 'तावत् सन्तोषं लभते'],
    sceneSketch: {
      title: 'Warrior with Sword of Truth Sheltered by Dharma Wheel',
      description: 'Noble warrior holding justice scales, surrounded by a luminous radiating Dharma chakra.',
      focalSubjects: ['Righteous Seeker (धर्मात्मा)', 'Shield of Virtue (धर्मकवचम्)', 'Dharma Wheel (धर्मचक्रम्)'],
    },
  },

  // 5. विनयशीला
  {
    id: 'riddle-5',
    sketchId: 'humble_maiden',
    riddleNumber: 5,
    title: '५. विद्या ददाति विनयं · The Grace of Humility',
    theme: 'विनयगुणः (Virtue & Modesty)',
    relativeBlock: 'या विनयशीला अस्ति',
    relativeTranslit: 'Yā vinayaśīlā asti',
    relativeMeaning: 'She who is humble and gentle',
    correlativeBlock: 'सा सर्वत्र श्लाघ्यते',
    correlativeTranslit: 'Sā sarvatra ślāghyate',
    correlativeMeaning: 'she is praised everywhere',
    fullSanskrit: 'या विनयशीला अस्ति, सा सर्वत्र श्लाघ्यते।',
    fullTranslit: 'Yā vinayaśīlā asti, sā sarvatra ślāghyate.',
    englishTranslation: 'The girl who is humble is praised and respected everywhere.',
    riddleClue: 'A brilliant student enters the assembly, carrying her learning not with pride, but with gentle courtesy and respect. How do elders and peers receive her?',
    philosophicalInsight: 'Feminine relative clause (या...सा). True scholarship is crowned by humility: "विद्या ददाति विनयं विनयाद् याति पात्रताम्".',
    options: ['सा सर्वत्र श्लाघ्यते', 'तथा भाषणं जायते', 'तत् अमृतं भवितुं अर्हति', 'तत्र अन्धकारः नश्यति'],
    sceneSketch: {
      title: 'Humble Maiden with Anjali Mudra Honored by Sages',
      description: 'Pencil drawing of a graceful Gurukul scholar bowing with folded palms, receiving flower garland blessings.',
      focalSubjects: ['Humble Scholar (विनयशीला)', 'Folded Palms (अञ्जलिः)', 'Assembly of Elders (विद्वत्सभा)'],
    },
  },

  // 6. चिन्तनं & भाषणम्
  {
    id: 'riddle-6',
    sketchId: 'thought_speech',
    riddleNumber: 6,
    title: '६. मनसा वाचा कर्मणा · Mind, Word & Deed',
    theme: 'चित्तशुद्धिः (Purity of Mind)',
    relativeBlock: 'यथा चिन्तनं भवति',
    relativeTranslit: 'Yathā cintanaṁ bhavati',
    relativeMeaning: 'As the mindset / thought is',
    correlativeBlock: 'तथा भाषणं जायते',
    correlativeTranslit: 'Tathā bhāṣaṇaṁ jāyate',
    correlativeMeaning: 'so the speech becomes',
    fullSanskrit: 'यथा चिन्तनं भवति, तथा भाषणं जायते।',
    fullTranslit: 'Yathā cintanaṁ bhavati, tathā bhāṣaṇaṁ jāyate.',
    englishTranslation: 'As the thoughts are, so the speech becomes.',
    riddleClue: 'Speech is but the outward fragrance of the mind’s inner garden. When noble meditation fills the thoughts, how will spoken words sound?',
    philosophicalInsight: 'Mānasika harmony: Speech is the verbal projection of internal Saṁskāras. "यन्मनसा ध्यायति तद्वाचा वदति" (What one contemplates in mind, that one speaks in voice).',
    options: ['तथा भाषणं जायते', 'सः धर्मेण रक्षितः', 'तत्र विवेकः नश्यति', 'तदा वसन्तः आयाति'],
    sceneSketch: {
      title: 'Sage Meditating with Golden Words Floating Forth',
      description: 'Pencil portrait of serene contemplation with Devanagari sacred syllables flowing from gentle lips.',
      focalSubjects: ['Contemplative Mind (चिन्तनम्)', 'Gentle Expression (सौम्यभावः)', 'Sacred Speech (सरस्वती)'],
    },
  },

  // 7. दानं & सन्तोषः
  {
    id: 'riddle-7',
    sketchId: 'giving_joy',
    riddleNumber: 7,
    title: '७. दानेन प्राप्यते सुखम् · The Bliss of Generosity',
    theme: 'दानधर्मः (The Joy of Giving)',
    relativeBlock: 'यावत् धनं यच्छति',
    relativeTranslit: 'Yāvat dhanaṁ yacchati',
    relativeMeaning: 'As much wealth as he gives away',
    correlativeBlock: 'तावत् सन्तोषं लभते',
    correlativeTranslit: 'Tāvat santoṣaṁ labhate',
    correlativeMeaning: 'that much joy he obtains',
    fullSanskrit: 'यावत् धनं यच्छति, तावत् सन्तोषं लभते।',
    fullTranslit: 'Yāvat dhanaṁ yacchati, tāvat santoṣaṁ labhate.',
    englishTranslation: 'As much wealth as he gives away, that much joy he receives.',
    riddleClue: 'A compassionate householder distributes grain and coins to needy travelers. Instead of feeling impoverished, what deep inner treasure fills his heart?',
    philosophicalInsight: 'Proportional clause (यावत्...तावत्). Giving (Dāna) purifies accumulated wealth and yields lasting inner contentment (Santoṣa).',
    options: ['तावत् सन्तोषं लभते', 'तत्र अन्धकारः नश्यति', 'तर्हि भयं न भवति', 'तथा नदी पूर्यते'],
    sceneSketch: {
      title: 'Open Palms Pouring Grain into Hungry Hands',
      description: 'Pencil sketch of generous cupped hands pouring grains with radiant smiles of mutual gratitude.',
      focalSubjects: ['Giving Hands (दानहस्तः)', 'Offered Grain (धान्यम्)', 'Joyous Countenance (सन्तोषः)'],
    },
  },

  // 8. सन्तोषः & सुखम्
  {
    id: 'riddle-8',
    sketchId: 'contentment_bliss',
    riddleNumber: 8,
    title: '८. सन्तोषः परमो लाभः · Supreme Contentment',
    theme: 'योगदर्शनम् (The Highest Wealth)',
    relativeBlock: 'यत्र सन्तोषः वर्तते',
    relativeTranslit: 'Yatra santoṣaḥ vartate',
    relativeMeaning: 'Where contentment is',
    correlativeBlock: 'तत्र सुखं शाश्वतम्',
    correlativeTranslit: 'Tatra sukhaṁ śāśvatam',
    correlativeMeaning: 'there happiness is eternal',
    fullSanskrit: 'यत्र सन्तोषः वर्तते, तत्र सुखं शाश्वतम्।',
    fullTranslit: 'Yatra santoṣaḥ vartate, tatra sukhaṁ śāśvatam.',
    englishTranslation: 'Where there is contentment, happiness is everlasting.',
    riddleClue: 'In a modest clay hermitage free from excessive thirst and competition, what divine peace dwells perpetually?',
    philosophicalInsight: 'Patañjali Yoga Sūtra 2.42: "सन्तोषादनुत्तमः सुखलाभः" (From contentment, unsurpassed bliss is attained). External luxuries fade, but contentment remains eternal.',
    options: ['तत्र सुखं शाश्वतम्', 'तदा पूजा आरभते', 'सा सर्वत्र श्लाघ्यते', 'तत् अमृतं भवितुं अर्हति'],
    sceneSketch: {
      title: 'Tranquil Hermitage Under Shaded Grove',
      description: 'Pencil drawing of a peaceful tapovana cottage with deer drinking water and an ascetic in bliss.',
      focalSubjects: ['Hermitage Hut (पर्णशाला)', 'Gentle Deer (मृगः)', 'Eternal Peace (शाश्वतसुखम्)'],
    },
  },

  // 9. घण्टानादः & पूजा
  {
    id: 'riddle-9',
    sketchId: 'temple_bell',
    riddleNumber: 9,
    title: '९. घण्टानादः पूजारम्भश्च · The Resonating Temple Bell',
    theme: 'देवाराधनम् (Auspicious Beginnings)',
    relativeBlock: 'यदा घण्टा नादति',
    relativeTranslit: 'Yadā ghaṇṭā nādati',
    relativeMeaning: 'When the temple bell rings',
    correlativeBlock: 'तदा पूजा आरभते',
    correlativeTranslit: 'Tadā pūjā ārabhate',
    correlativeMeaning: 'then the prayer ritual begins',
    fullSanskrit: 'यदा घण्टा नादति, तदा पूजा आरभते।',
    fullTranslit: 'Yadā ghaṇṭā nādati, tadā pūjā ārabhate.',
    englishTranslation: 'When the bell rings, then the worship ritual begins.',
    riddleClue: 'The bronze bell suspended in the temple threshold is struck with a resonant chime. What sacred ceremony commences at this vibration?',
    philosophicalInsight: '"आगमार्थं तु देवानां गमनार्थं तु रक्षसाम् । कुर्वन् घण्टारवं तत्र देवताह्वानलक्षणम्" The bell invites auspicious divine energies and signals the commencement of worship.',
    options: ['तदा पूजा आरभते', 'तत्र विवेकः नश्यति', 'तथा भाषणं जायते', 'सः शान्तिं प्राप्नोति'],
    sceneSketch: {
      title: 'Carved Temple Bell with Incense Smoke Drifting',
      description: 'Pencil sketch of ornate hanging bronze bell vibrating with sound wave arcs and drifting dhoopa smoke.',
      focalSubjects: ['Ornate Bronze Bell (घण्टा)', 'Sound Waves (नादः)', 'Incense Burner (धूपपात्रम्)'],
    },
  },

  // 10. विषम् & अमृतम्
  {
    id: 'riddle-10',
    sketchId: 'neelakantha_nectar',
    riddleNumber: 10,
    title: '१०. हालाहलं पीयूषम् · From Poison to Nectar',
    theme: 'विवेकपरिवर्तनम् (Alchemical Transformation)',
    relativeBlock: 'यत् विषं मन्यते',
    relativeTranslit: 'Yat viṣaṁ manyate',
    relativeMeaning: 'What is considered poison / hardship',
    correlativeBlock: 'तत् अमृतं भवितुं अर्हति',
    correlativeTranslit: 'Tat amṛtaṁ bhavituṁ arhati',
    correlativeMeaning: 'that can become nectar / medicine',
    fullSanskrit: 'यत् विषं मन्यते, तत् अमृतं भवितुं अर्हति।',
    fullTranslit: 'Yat viṣaṁ manyate, tat amṛtaṁ bhavituṁ arhati.',
    englishTranslation: 'What is thought to be poison can turn into nectar.',
    riddleClue: 'A bitter medicinal herb or painful life obstacle looks deadly at first glance. Under wise handling, into what life-saving nectar can it transform?',
    philosophicalInsight: 'Bhagavad Gītā 18.37: "यत्तदग्रे विषमिव परिणामेऽमृतोपमम्" (Sāttvika joy appears like poison in the beginning but turns to nectar in the end).',
    options: ['तत् अमृतं भवितुं अर्हति', 'तत्र सुखं शाश्वतम्', 'तथा नदी पूर्यते', 'तत्र तमः दूरीभवति'],
    sceneSketch: {
      title: 'Ayurvedic Mortar & Pestle Brewing Healing Elixir',
      description: 'Pencil sketch of stone kharal mortar with herbal plants transforming into glowing droplets.',
      focalSubjects: ['Stone Mortar (खरलः)', 'Forest Herbs (ओषधयः)', 'Amrita Drops (अमृतबिन्दवः)'],
    },
  },

  // 11. क्रोधः & विवेकः
  {
    id: 'riddle-11',
    sketchId: 'anger_wisdom',
    riddleNumber: 11,
    title: '११. क्रोधाद्भवति संमोहः · The Eclipse of Wisdom',
    theme: 'चित्तसङ्घर्षः (Conquering Anger)',
    relativeBlock: 'यत्र क्रोधः प्रविशति',
    relativeTranslit: 'Yatra krodhaḥ praviśati',
    relativeMeaning: 'Where anger enters the heart',
    correlativeBlock: 'तत्र विवेकः नश्यति',
    correlativeTranslit: 'Tatra vivekaḥ naśyati',
    correlativeMeaning: 'there discrimination / wisdom dies',
    fullSanskrit: 'यत्र क्रोधः प्रविशति, तत्र विवेकः नश्यति।',
    fullTranslit: 'Yatra krodhaḥ praviśati, tatra vivekaḥ naśyati.',
    englishTranslation: 'Where anger enters, wisdom and discrimination depart.',
    riddleClue: 'A turbulent red storm enters a calm scholar’s mind, clouding judgment. What clear-sighted faculty of intellect is extinguished?',
    philosophicalInsight: 'Bhagavad Gītā 2.63: "क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः । स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति". Anger blinds the discriminating intellect (Viveka).',
    options: ['तत्र विवेकः नश्यति', 'तदा सूर्यः दृश्यते', 'तर्हि भयं न भवति', 'तत् क्षालनेन शुध्यति'],
    sceneSketch: {
      title: 'Turbulent Flame Clouding the Mirror of Wisdom',
      description: 'Pencil sketch of a cracked polished mirror reflecting jagged angry lightning bolts.',
      focalSubjects: ['Mirror of Intellect (विवेकदर्पणः)', 'Flames of Anger (क्रोधाग्निः)', 'Distorted Reflection (संमोहः)'],
    },
  },

  // 12. प्रभातः & सूर्यः
  {
    id: 'riddle-12',
    sketchId: 'dawn_sun',
    riddleNumber: 12,
    title: '१२. उषःकालः रविदर्शनम् · The Golden Dawn',
    theme: 'दैनिकप्रकृतिः (The Awakening Sun)',
    relativeBlock: 'यदा प्रभातः जायते',
    relativeTranslit: 'Yadā prabhātaḥ jāyate',
    relativeMeaning: 'When dawn occurs',
    correlativeBlock: 'तदा सूर्यः दृश्यते',
    correlativeTranslit: 'Tadā sūryaḥ dṛśyate',
    correlativeMeaning: 'then the sun is seen',
    fullSanskrit: 'यदा प्रभातः जायते, तदा सूर्यः दृश्यते।',
    fullTranslit: 'Yadā prabhātaḥ jāyate, tadā sūryaḥ dṛśyate.',
    englishTranslation: 'When dawn breaks, then the sun becomes visible.',
    riddleClue: 'The night stars fade into soft crimson and saffron hues on the eastern horizon. What radiant celestial orb reveals its face?',
    philosophicalInsight: 'Uṣas in Ṛgveda: The goddess of dawn dispels the cosmic shroud, preparing the way for Sūrya Deva to illuminate creation.',
    options: ['तदा सूर्यः दृश्यते', 'तत्र भूमिः पवित्रा', 'तत्र कीरः आगच्छति', 'तत्र अन्धकारः नश्यति'],
    sceneSketch: {
      title: 'Sun Rising Over Mist-Shrouded Hills',
      description: 'Pencil sketch of soft hill contours with the sun cresting the horizon and birds taking flight.',
      focalSubjects: ['Rising Sun (सूर्यः)', 'Misty Hills (गिरयः)', 'Dawn Flight (खगाः)'],
    },
  },

  // 13. सत्यम् & भयम्
  {
    id: 'riddle-13',
    sketchId: 'truth_fearless',
    riddleNumber: 13,
    title: '१३. सत्यमेव जयते · The Fearless Path of Truth',
    theme: 'अभयम् (Fearlessness in Truth)',
    relativeBlock: 'यदि सत्यं वदसि',
    relativeTranslit: 'Yadi satyaṁ vadasi',
    relativeMeaning: 'If you speak the truth',
    correlativeBlock: 'तर्हि भयं न भवति',
    correlativeTranslit: 'Tarhi bhayaṁ na bhavati',
    correlativeMeaning: 'then fear does not exist',
    fullSanskrit: 'यदि सत्यं वदसि, तर्हि भयं न भवति।',
    fullTranslit: 'Yadi satyaṁ vadasi, tarhi bhayaṁ na bhavati.',
    englishTranslation: 'If you speak the truth, then you will have no fear.',
    riddleClue: 'A child stands before the village elders with a clean conscience, refusing to utter a deceitful lie. What shadow is banished from the heart?',
    philosophicalInsight: 'Taittirīya Upaniṣad: "सत्यं वद धर्मं चर". Truth grants natural inner fearlessness (Abhayam), because there is no falsehood to remember or conceal.',
    options: ['तर्हि भयं न भवति', 'तथा नदी पूर्यते', 'सः शान्तिं प्राप्नोति', 'तत्र विवेकः नश्यति'],
    sceneSketch: {
      title: 'Child Standing Upright with Clean Heart Before Elders',
      description: 'Pencil drawing of upright young student speaking openly with calm unwavering eyes.',
      focalSubjects: ['Fearless Speaker (सत्यवादी)', 'Calm Countenance (शान्तमुखम्)', 'Circle of Elders (सभा)'],
    },
  },

  // 14. मधुरफलं & कीरः
  {
    id: 'riddle-14',
    sketchId: 'parrot_fruit',
    riddleNumber: 14,
    title: '१४. शुकमुखभ्रष्टं फलम् · The Parrot & Sweet Fruit',
    theme: 'प्रकृतेः आकर्षणम् (Nature’s Sweet Attraction)',
    relativeBlock: 'यत्र मधुरं फलम्',
    relativeTranslit: 'Yatra madhuraṁ phalam',
    relativeMeaning: 'Where the sweet fruit is',
    correlativeBlock: 'तत्र कीरः आगच्छति',
    correlativeTranslit: 'Tatra kīraḥ āgacchati',
    correlativeMeaning: 'there the parrot comes',
    fullSanskrit: 'यत्र मधुरं फलम्, तत्र कीरः आगच्छति।',
    fullTranslit: 'Yatra madhuraṁ phalam, tatra kīraḥ āgacchati.',
    englishTranslation: 'Where the sweet fruit is, there the parrot flies.',
    riddleClue: 'A ripe red pomegranate bursts open with ruby seeds atop a shaded branch. What emerald green bird with curved red beak swoops in?',
    philosophicalInsight: 'Śuka (parrot) seeks sweet fruit (Phala) just as discerning souls naturally flock toward the nectar of wisdom.',
    options: ['तत्र कीरः आगच्छति', 'तदा गजः कम्पते', 'तत्र भूमिः पवित्रा', 'तर्हि भयं न भवति'],
    sceneSketch: {
      title: 'Green Parrot Alighting on Ripe Pomegranate Bough',
      description: 'Pencil sketch of a graceful parrot with spread wings landing beside sweet ripe fruit.',
      focalSubjects: ['Parrot (कीरः/शुकः)', 'Sweet Fruit (मधुरफलम्)', 'Leafy Bough (वृक्षशाखा)'],
    },
  },

  // 15. वृष्टिः & नदी
  {
    id: 'riddle-15',
    sketchId: 'rain_river',
    riddleNumber: 15,
    title: '१५. जलधारेण सरित्पूरणम् · The River Swells with Rain',
    theme: 'जलचक्रम् (The Hydrological Harmony)',
    relativeBlock: 'यथा वृष्टिः जायते',
    relativeTranslit: 'Yathā vṛṣṭiḥ jāyate',
    relativeMeaning: 'As the rain falls',
    correlativeBlock: 'तथा नदी पूर्यते',
    correlativeTranslit: 'Tathā nadī pūryate',
    correlativeMeaning: 'so the river fills up',
    fullSanskrit: 'यथा वृष्टिः जायते, तथा नदी पूर्यते।',
    fullTranslit: 'Yathā vṛṣṭiḥ jāyate, tathā nadī pūryate.',
    englishTranslation: 'As it rains, so the river fills.',
    riddleClue: 'Torrents of water descend from dark clouds over the mountain watersheds. What winding valley waterway rises up to its banks?',
    philosophicalInsight: 'Natural proportional correlative (यथा...तथा). Inexhaustible rains replenish the lifelines of the land.',
    options: ['तथा नदी पूर्यते', 'सः शान्तिं प्राप्नोति', 'तदा गजः कम्पते', 'तत्र कीरः आगच्छति'],
    sceneSketch: {
      title: 'Surging River Swelling Between Rocky Banks',
      description: 'Pencil drawing of heavy rain showers merging into rushing river rapids filling the banks.',
      focalSubjects: ['Rain Showers (वृष्टिधाराः)', 'Swelling River (पूर्यमाणा नदी)', 'Riverbank Rocks (तीरशिलाः)'],
    },
  },

  // 16. सत्यदर्शनम् & शान्तिः
  {
    id: 'riddle-16',
    sketchId: 'truth_peace',
    riddleNumber: 16,
    title: '१६. सत्ये सर्वं प्रतिष्ठितम् · The Seer of Absolute Truth',
    theme: 'आत्मशान्तिः (The Peace of Realization)',
    relativeBlock: 'यः सत्यं पश्यति',
    relativeTranslit: 'Yaḥ satyaṁ paśyati',
    relativeMeaning: 'He who sees the truth',
    correlativeBlock: 'सः शान्तिं प्राप्नोति',
    correlativeTranslit: 'Saḥ śāntiṁ prāpnoti',
    correlativeMeaning: 'he achieves absolute peace',
    fullSanskrit: 'यः सत्यं पश्यति, सः शान्तिं प्राप्नोति।',
    fullTranslit: 'Yaḥ satyaṁ paśyati, saḥ śāntiṁ prāpnoti.',
    englishTranslation: 'He who perceives the truth achieves absolute peace.',
    riddleClue: 'Beyond illusions and worldly agitation, the yogi perceives the unchanging eternal reality. What unshakeable calm fills his presence?',
    philosophicalInsight: 'Bṛhadāraṇyaka: When Brahman is realized as the ultimate truth, all dualistic anxiety vanishes into profound peace (Śānti).',
    options: ['सः शान्तिं प्राप्नोति', 'तदा गजः कम्पते', 'तत्र भूमिः पवित्रा', 'तत् क्षालनेन शुध्यति'],
    sceneSketch: {
      title: 'Meditating Yogi in Dhyana Mudra with Flowing Aura',
      description: 'Pencil sketch of seated yogi with eyes half-closed in meditative serenity beside a lotus pool.',
      focalSubjects: ['Seer of Truth (सत्यदर्शी)', 'Dhyana Mudra (ध्यानमुद्रा)', 'Peaceful Halo (शान्तिमण्डलम्)'],
    },
  },

  // 17. सिंहगर्जनम् & गजः
  {
    id: 'riddle-17',
    sketchId: 'lion_elephant',
    riddleNumber: 17,
    title: '१७. मृगेन्द्रनादः · The Lion\'s Roar & the Elephant',
    theme: 'अरण्यशक्तिः (Majesty of the Jungle)',
    relativeBlock: 'यदा सिंहः गर्जति',
    relativeTranslit: 'Yadā siṁhaḥ garjati',
    relativeMeaning: 'When the lion roars',
    correlativeBlock: 'तदा गजः कम्पते',
    correlativeTranslit: 'Tadā gajaḥ kampate',
    correlativeMeaning: 'then the elephant trembles',
    fullSanskrit: 'यदा सिंहः गर्जति, तदा गजः कम्पते।',
    fullTranslit: 'Yadā siṁhaḥ garjati, tadā gajaḥ kampate.',
    englishTranslation: 'When the lion roars, the elephant trembles.',
    riddleClue: 'The king of beasts leaps upon the rocky outcropping and lets out a thunderous roar. Even the mighty tusker in the jungle below reacts with what tremor?',
    philosophicalInsight: '"नाभिषेको न संस्कारः सिंहस्य क्रियते वने । विक्रमार्जितसत्त्वस्य स्वयमेव मृगेन्द्रता". The lion rules through innate power, striking awe across the forest.',
    options: ['तदा गजः कम्पते', 'तत्र भूमिः पवित्रा', 'तत् क्षालनेन शुध्यति', 'तत्र तमः दूरीभवति'],
    sceneSketch: {
      title: 'Roaring Lion on Cliff & Tusker Looking Back',
      description: 'Pencil sketch of majestic maned lion roaring on rock, while a large elephant pauses in the trees.',
      focalSubjects: ['Roaring Lion (सिंहः)', 'Rocky Ledge (शिलातलम्)', 'Trembling Tusker (गजः)'],
    },
  },

  // 18. गङ्गाप्रवाहः & पवित्रा भूमिः
  {
    id: 'riddle-18',
    sketchId: 'ganga_sacred',
    riddleNumber: 18,
    title: '१८. सुरसरित् गङ्गा · The Sacred River of the Gods',
    theme: 'पुण्यतीर्थम् (The Sanctity of Sacred Waters)',
    relativeBlock: 'यत्र गङ्गा वहति',
    relativeTranslit: 'Yatra gaṅgā vahati',
    relativeMeaning: 'Where the Ganges flows',
    correlativeBlock: 'तत्र भूमिः पवित्रा',
    correlativeTranslit: 'Tatra bhūmiḥ pavitrā',
    correlativeMeaning: 'there the earth is sacred',
    fullSanskrit: 'यत्र गङ्गा वहति, तत्र भूमिः पवित्रा।',
    fullTranslit: 'Yatra gaṅgā vahati, tatra bhūmiḥ pavitrā.',
    englishTranslation: 'Where the Ganges flows, the land is pure and sacred.',
    riddleClue: 'Descending from Himalayan glaciers, the holy stream meanders through ghats and forests. What sacred purity blesses the riverbanks?',
    philosophicalInsight: 'Gaṅgā Stotram: "गाङ्गं वारि मनोहारि मुरारिचरणच्युतम्". Wherever the waters of Mother Ganga flow, the surrounding land is revered as holy tirtha.',
    options: ['तत्र भूमिः पवित्रा', 'तत् क्षालनेन शुध्यति', 'तत्र तमः दूरीभवति', 'तदा गजः कम्पते'],
    sceneSketch: {
      title: 'Ganga Meandering Past Ghats & Banyan Trees',
      description: 'Pencil sketch of sweeping holy river with stone ghat steps, floating earthen lamps, and pilgrims.',
      focalSubjects: ['Sacred Ganga (सुरसरित्)', 'Stone Ghats (घट्टः)', 'Sacred Soil (पवित्रभूमिः)'],
    },
  },

  // 19. मलिनवस्त्रम् & क्षालनम्
  {
    id: 'riddle-19',
    sketchId: 'washing_cloth',
    riddleNumber: 19,
    title: '१९. क्षालनेन शुद्धिः · Cleanliness & Purification',
    theme: 'शौचम् (Physical & Mental Cleanliness)',
    relativeBlock: 'यत् वस्त्रं मलिनम्',
    relativeTranslit: 'Yat vastraṁ malinam',
    relativeMeaning: 'Whatever cloth is dirty',
    correlativeBlock: 'तत् क्षालनेन शुध्यति',
    correlativeTranslit: 'Tat kṣālanena śudhyati',
    correlativeMeaning: 'that cleanses by washing',
    fullSanskrit: 'यत् वस्त्रं मलिनम्, तत् क्षालनेन शुध्यति।',
    fullTranslit: 'Yat vastraṁ malinam, tat kṣālanena śudhyati.',
    englishTranslation: 'Whichever cloth is dirty becomes clean upon washing.',
    riddleClue: 'A dust-stained white dhoti is brought down to the clean stream bank. With gentle soap and rinsing water, how is its pristine purity restored?',
    philosophicalInsight: 'Analogy of mental purification (Citta-śuddhi): Just as soiled clothes are made stainless by thorough washing, the mind is cleansed by spiritual practice (Abhyāsa).',
    options: ['तत् क्षालनेन शुध्यति', 'तत्र तमः दूरीभवति', 'तत्र भूमिः पवित्रा', 'तदा गजः कम्पते'],
    sceneSketch: {
      title: 'Washerman Washing Cloth by River Stone',
      description: 'Pencil sketch of clean white cloth rinsed on a smooth river stone with water droplets flying.',
      focalSubjects: ['Washed Cloth (शुद्धवस्त्रम्)', 'River Stone (धौतशिला)', 'Water Splashes (जलबिन्दवः)'],
    },
  },

  // 20. दीपः & तमः
  {
    id: 'riddle-20',
    sketchId: 'lamp_darkness',
    riddleNumber: 20,
    title: '२०. दीपेन तमोनाशः · The Solitary Flame',
    theme: 'ज्ञानदीपकः (Light Banishes the Dark)',
    relativeBlock: 'यत्र दीपः तिष्ठति',
    relativeTranslit: 'Yatra dīpaḥ tiṣṭhati',
    relativeMeaning: 'Where the lamp stands',
    correlativeBlock: 'तत्र तमः दूरीभवति',
    correlativeTranslit: 'Tatra tamaḥ dūrībhavati',
    correlativeMeaning: 'there darkness moves away',
    fullSanskrit: 'यत्र दीपः तिष्ठति, तत्र तमः दूरीभवति।',
    fullTranslit: 'Yatra dīpaḥ tiṣṭhati, tatra tamaḥ dūrībhavati.',
    englishTranslation: 'Where the lamp stands, darkness is driven away.',
    riddleClue: 'A slender brass lamp burns quietly in the corner of a great hall. How does darkness respond to its golden flame?',
    philosophicalInsight: '"दीपो ज्योतिः परंब्रह्म दीपो ज्योतिर्जनार्दनः । दीपो हरतु मे पापं दीपज्योतिर्नमोऽस्तु ते" A solitary flame has the power to banish miles of shadow.',
    options: ['तत्र तमः दूरीभवति', 'तत्र भूमिः पवित्रा', 'तत् क्षालनेन शुध्यति', 'सः शान्तिं प्राप्नोति'],
    sceneSketch: {
      title: 'Brass Pillar Diya Casting Circle of Golden Light',
      description: 'Pencil sketch of ornate standing deepastambha lamp surrounded by receding darkness.',
      focalSubjects: ['Standing Lamp (दीपस्तम्भः)', 'Warm Flame (शिखा)', 'Receding Darkness (तमोनिवृत्तिः)'],
    },
  },
];
