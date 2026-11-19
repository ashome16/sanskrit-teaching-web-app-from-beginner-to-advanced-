/**
 * Sugrīva's Global Directional Journey & Ramayana Geography
 * Data models and historical geography from Vālmīki Rāmāyaṇa Kiṣkindhā-Kāṇḍa (Sargas 40–43).
 *
 * Strictly NO EMOJIS in content or labels.
 */

export interface VedicDirection {
  id: 'purva' | 'agneya' | 'dakshina' | 'nairrtya' | 'pascima' | 'vayavya' | 'uttara' | 'ishana';
  nameSa: string;
  nameEn: string;
  degree: number;
  dikpala: string;
  element: string;
  expedition: 'east' | 'south' | 'west' | 'north' | 'intermediate';
  summary: string;
}

export interface ExpeditionCheckpoint {
  id: string;
  nameSa: string;
  nameEn: string;
  type: 'river' | 'kingdom' | 'mountain' | 'ocean' | 'terminal';
  desc: string;
  modernLocation: string;
  svgX: number;
  svgY: number;
}

export interface SugrivaExpedition {
  id: 'east' | 'south' | 'west' | 'north';
  directionSa: string;
  directionEn: string;
  commander: string;
  commanderTitle: string;
  sargaCitation: string;
  squadStrength: string;
  themeColor: string;
  brief: string;
  shlokaSa: string;
  shlokaTranslit: string;
  shlokaMeaning: string;
  checkpoints: ExpeditionCheckpoint[];
  modernConcordance: string;
  terminalLandmark: {
    nameSa: string;
    nameEn: string;
    description: string;
  };
}

export interface LandmarkQuest {
  id: string;
  direction: 'east' | 'south' | 'west' | 'north';
  questNumber: number;
  titleSa: string;
  titleEn: string;
  shlokaSa: string;
  shlokaTranslit: string;
  shlokaSource: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  sanskritGrammarNote: string;
  badgeEarned: string;
}

export const VEDIC_DIRECTIONS: VedicDirection[] = [
  {
    id: 'purva',
    nameSa: 'पूर्व (Pūrva)',
    nameEn: 'East',
    degree: 90,
    dikpala: 'Indra (इन्द्रः)',
    element: 'Ākāśa / Solar Dawn',
    expedition: 'east',
    summary: 'The realm of sunrise, sacred rivers flowing to the Bay of Bengal, and archipelagos reaching Mount Udayagiri.',
  },
  {
    id: 'agneya',
    nameSa: 'आग्नेय (Āgneya)',
    nameEn: 'South-East',
    degree: 135,
    dikpala: 'Agni (अग्निः)',
    element: 'Tejas / Fire',
    expedition: 'intermediate',
    summary: 'Guarded by the fire deity; the maritime routes connecting Kalinga and the Bay of Bengal islands.',
  },
  {
    id: 'dakshina',
    nameSa: 'दक्षिण (Dakṣiṇa)',
    nameEn: 'South',
    degree: 180,
    dikpala: 'Yama (यमः)',
    element: 'Pṛthvī / Earth',
    expedition: 'south',
    summary: 'The southern peninsula crossed by the Vindhyas, Dandaka, Kaveri, Mahendragiri, leading to Lanka.',
  },
  {
    id: 'nairrtya',
    nameSa: 'नैऋत्य (Nairṛtya)',
    nameEn: 'South-West',
    degree: 225,
    dikpala: 'Nirṛti (निर्ऋतिः)',
    element: 'Kāla / Dissolution',
    expedition: 'intermediate',
    summary: 'The south-western seas facing the Indian Ocean expanse and coral shoals.',
  },
  {
    id: 'pascima',
    nameSa: 'पश्चिम (Paścima)',
    nameEn: 'West',
    degree: 270,
    dikpala: 'Varuṇa (वरुणः)',
    element: 'Jala / Ocean Waters',
    expedition: 'west',
    summary: 'The domain of lord Varuna, spanning Saurashtra, the Indus delta, deserts, and Mount Astagiri.',
  },
  {
    id: 'vayavya',
    nameSa: 'वायव्य (Vāyavya)',
    nameEn: 'North-West',
    degree: 315,
    dikpala: 'Vāyu (वायुः)',
    element: 'Vāyu / Cosmic Wind',
    expedition: 'intermediate',
    summary: 'The wind corridor connecting Gandhara, the Pamirs, and ancient Central Asian overland caravans.',
  },
  {
    id: 'uttara',
    nameSa: 'उत्तर (Uttara)',
    nameEn: 'North',
    degree: 0,
    dikpala: 'Kubera (कुबेरः)',
    element: 'Hemakūṭa / Cosmic Axis',
    expedition: 'north',
    summary: 'The northern realm of snows, Kurukshetra, the great Himalayas, Mount Kailash, Meru, and Uttarakuru.',
  },
  {
    id: 'ishana',
    nameSa: 'ईशान (Īśāna)',
    nameEn: 'North-East',
    degree: 45,
    dikpala: 'Īśāna / Śiva (ईशानः)',
    element: 'Caitanya / Supreme Consciousness',
    expedition: 'intermediate',
    summary: 'The celestial north-east gateway towards the Eastern Himalayas and Brahmaputra headwaters.',
  },
];

export const SUGRIVA_EXPEDITIONS: SugrivaExpedition[] = [
  {
    id: 'east',
    directionSa: 'पूर्व-दिग्-यात्रा (Pūrva-Dig-Yātrā)',
    directionEn: 'Eastward Expedition · The Dawn Archipelagos',
    commander: 'Vinata (विनतः)',
    commanderTitle: 'Commander of 100,000 Vanara Scouts',
    sargaCitation: 'Vālmīki Rāmāyaṇa · Kiṣkindhā-Kāṇḍa, Sarga 40',
    squadStrength: '100,000 Warriors',
    themeColor: '#d97706',
    brief: 'King Sugriva commands Vinata to explore the great river basins of the Ganga, Brahmaputra, the eastern janapadas, the gold-bearing archipelagos of Yavadvipa (Java), and the sunrise crest of Mount Udayagiri.',
    shlokaSa: 'यत्नवन्तो यवद्वीपं सप्तराज्यसमाश्रितम्। सुवर्णरूप्यकं चैव सुवर्णकरमण्डितम्॥\nयवद्वीपमतिक्रम्य शिशिरो नाम पर्वतः। दिवं स्पृशति शृङ्गेण देवदानवसेवितः॥',
    shlokaTranslit: 'yatnavanto yavadvīpaṁ saptarājyasamāśritam | suvarṇarūpyakaṁ caiva suvarṇakaramaṇḍitam ||\nyavadvīpamatikramya śiśiro nāma parvataḥ | divaṁ spṛśati śṛṅgeṇa devadānavasevitaḥ ||',
    shlokaMeaning: 'Search diligently the island of Yavadvipa, adorned with seven kingdoms, along with the Golden and Silver Islands. Past Yavadvipa rises Mount Shishira, touching the heavens with its crest, venerated by gods and celestial beings.',
    checkpoints: [
      {
        id: 'cp-e-1',
        nameSa: 'गङ्गा-सरयू-कौशिकी (Gaṅgā, Sarayū & Kauśikī)',
        nameEn: 'Ganga-Brahmaputra Basin',
        type: 'river',
        desc: 'The sacred river systems flowing eastward through Magadha, Anga, and Videha.',
        modernLocation: 'Indo-Gangetic & Bengal River Plains',
        svgX: 530,
        svgY: 280,
      },
      {
        id: 'cp-e-2',
        nameSa: 'मत्स्य-पुण्ड्र-वङ्ग (Pauṇḍra & Vaṅga)',
        nameEn: 'Eastern Janapadas & Delta',
        type: 'kingdom',
        desc: 'Ancient coastal kingdoms and maritime ports bordering the eastern sea.',
        modernLocation: 'Bengal & Odisha Coastal Belt',
        svgX: 590,
        svgY: 305,
      },
      {
        id: 'cp-e-3',
        nameSa: 'यवद्वीप (Yavadvīpa) & सुवर्णद्वीप',
        nameEn: 'Java & Golden Island Archipelagos',
        type: 'kingdom',
        desc: 'Sugriva explicitly cites the island of Java with its 7 constituent kingdoms and gold/silver mines.',
        modernLocation: 'Java, Sumatra & Indonesian Archipelago',
        svgX: 680,
        svgY: 360,
      },
      {
        id: 'cp-e-4',
        nameSa: 'लोहित-सागर (Lohita Sāgara)',
        nameEn: 'The Red-Tinged Ocean',
        type: 'ocean',
        desc: 'The eastern ocean known for distinct reddish algae flora, corals, and tropical currents.',
        modernLocation: 'Andaman & Southern Pacific Margins',
        svgX: 740,
        svgY: 375,
      },
      {
        id: 'cp-e-5',
        nameSa: 'उदयगिरि (Udayagiri Peak)',
        nameEn: 'The Sunrise Terminal Mountain',
        type: 'terminal',
        desc: 'The eastern horizon terminal where the first solar rays strike the golden peak Saumanasa.',
        modernLocation: 'Easternmost Pacific Boundary of Ancient World',
        svgX: 810,
        svgY: 330,
      },
    ],
    modernConcordance: 'Matches ancient Indian maritime trade corridors across Kalinga, the Strait of Malacca, the Indonesian archipelago (Yava-dvipa / Suvarna-bhumi), and the sunrise meridian recognized in ancient astronomical texts.',
    terminalLandmark: {
      nameSa: 'उदयगिरिः (Udayagiri & Saumanasa)',
      nameEn: 'Mount of the Rising Sun',
      description: 'The celestial first meridian of morning light where the sun chariot begins its diurnal arc across Jambudvipa.',
    },
  },
  {
    id: 'south',
    directionSa: 'दक्षिण-दिग्-यात्रा (Dakṣiṇa-Dig-Yātrā)',
    directionEn: 'Southward Expedition · The Ocean Meridian & Lanka',
    commander: 'Aṅgada & Hanumān (अङ्गद-हनुमन्तौ)',
    commanderTitle: 'Crown Prince Angada with Hanuman, Jambavan & Nila',
    sargaCitation: 'Vālmīki Rāmāyaṇa · Kiṣkindhā-Kāṇḍa, Sarga 41',
    squadStrength: 'The Elite Vanguard (Hanuman, Jambavan, Nila, Angada)',
    themeColor: '#059669',
    brief: 'Sugriva assigns the most trusted vanguard to the South, knowing Sita is likely held in the southern ocean domain. They cross the Vindhyas, Narmada, Godavari, Kaveri, and Mahendragiri to reach the southern sea.',
    shlokaSa: 'सहस्रशिरसं विन्ध्यं नानाद्रुमलतायुतम्। नर्मदां च नदीं रम्यां महोरगनिषेविताम्॥\nततो हेममयं दिव्यं मुक्तामणिविभूषितम्। युक्तं कवचनेत्रेण ददृशुस्ते महेन्द्रकम्॥',
    shlokaTranslit: 'sahasraśirasaṁ vindhyaṁ nānādrumalatāyutam | narmadāṁ ca nadīṁ ramyāṁ mahoraganiṣevitām ||\ntato hemamayaṁ divyaṁ muktāmaṇivibhūṣitam | yuktaṁ kavacanetreṇa dadṛśuste mahendrakam ||',
    shlokaMeaning: 'Search the thousand-peaked Vindhyas rich in trees and vines, the charming Narmada river, and proceed to divine Mount Mahendra adorned with pearls and gems, standing majestic by the southern shore.',
    checkpoints: [
      {
        id: 'cp-s-1',
        nameSa: 'विन्ध्य-नर्मदा (Vindhya Range & Narmadā)',
        nameEn: 'Vindhyan Mountain Barrier',
        type: 'mountain',
        desc: 'The dense central Indian mountain range separating Aryavarta from the Deccan plateau.',
        modernLocation: 'Vindhya & Satpura Ranges (Madhya Pradesh)',
        svgX: 470,
        svgY: 340,
      },
      {
        id: 'cp-s-2',
        nameSa: 'गोदावरी-कृष्णा (Godāvarī & Kṛṣṇā)',
        nameEn: 'Deccan River Corridors',
        type: 'river',
        desc: 'Ancient river pathways cutting through Dandakaranya and the Andhra region.',
        modernLocation: 'Godavari & Krishna Basins (Maharashtra, Telangana, AP)',
        svgX: 470,
        svgY: 410,
      },
      {
        id: 'cp-s-3',
        nameSa: 'कावेरी (Kāverī) & चोल-पाण्ड्य-केरळ',
        nameEn: 'Kaveri River & Tamil Kingdoms',
        type: 'river',
        desc: 'The fertile Kaveri river delta and the ancient Dravidian kingdoms of Chola, Pandya, and Kerala.',
        modernLocation: 'Tamil Nadu & Kerala Peninsular Region',
        svgX: 460,
        svgY: 480,
      },
      {
        id: 'cp-s-4',
        nameSa: 'मलय-पर्वत (Malaya Parvata)',
        nameEn: 'Sandalwood Mountains',
        type: 'mountain',
        desc: 'The fragrant sandalwood ranges of the Western/Southern Ghats where sage Agastya meditated.',
        modernLocation: 'Southern Western Ghats / Anaimalai & Cardamom Hills',
        svgX: 430,
        svgY: 530,
      },
      {
        id: 'cp-s-5',
        nameSa: 'महेन्द्रगिरि (Mahendragiri)',
        nameEn: 'Hanuman’s Oceanic Launchpad',
        type: 'terminal',
        desc: 'The towering seaside promontory from which Hanuman surveyed the southern ocean and leaped to Lanka.',
        modernLocation: 'Mahendragiri Peak near Kanyakumari / Southern Eastern Ghats',
        svgX: 465,
        svgY: 565,
      },
    ],
    modernConcordance: 'Incredible geographical alignment with the Indian peninsula: Vindhyas -> Narmada -> Godavari -> Krishna -> Kaveri -> Malaya Hills -> Mahendragiri promontory -> Palk Strait and Sri Lanka (Lanka).',
    terminalLandmark: {
      nameSa: 'महेन्द्रगिरिः (Mount Mahendra)',
      nameEn: 'Gateway to the Southern Ocean',
      description: 'The monumental coastal summit where Hanuman expanded his form to leap over the 100-yojana ocean barrier.',
    },
  },
  {
    id: 'west',
    directionSa: 'पश्चिम-दिग्-यात्रा (Paścima-Dig-Yātrā)',
    directionEn: 'Westward Expedition · The Sunset Seas & Indus Estuary',
    commander: 'Suṣeṇa (सुषेणः)',
    commanderTitle: 'Father of Queen Tara & Master of 200,000 Vanaras',
    sargaCitation: 'Vālmīki Rāmāyaṇa · Kiṣkindhā-Kāṇḍa, Sarga 42',
    squadStrength: '200,000 Warriors',
    themeColor: '#4f46e5',
    brief: 'Sugriva charges Sushena with the vast western realm: the Saurashtra peninsula, the great Indus river delta (Sindhu-sāgara-saṅgama), the arid deserts of Maru, and the ten-thousand-peaked sunset mountain Astagiri.',
    shlokaSa: 'सौराष्ट्रांश्च सहैवेयान् रम्यान् रमणकांस्तथा। ततो गत्वा समुद्रान्तं सिन्धुसागरसङ्गमम्॥\nअस्तं गच्छति यत्रासौ सविता सर्वलोकदृक्। चक्रवातेन सहितो मेघवान् नाम पर्वतः॥',
    shlokaTranslit: 'saurāṣṭrāṁśca sahaiveyān ramyān ramaṇakāṁstathā | tato gatvā samudrāntaṁ sindhusāgarasaṅgamam ||\nastaṁ gacchati yatrāsau savitā sarvalokadṛk | cakravātena sahito meghavān nāma parvataḥ ||',
    shlokaMeaning: 'Search Saurashtra and surrounding lands, proceeding to the ocean edge where the mighty Indus joins the sea. Reach the great mountain Meghavan and the ten-thousand peaks of Astagiri where the all-seeing sun sets.',
    checkpoints: [
      {
        id: 'cp-w-1',
        nameSa: 'अवन्ती-शूरसेन (Avantī & Śūrasena)',
        nameEn: 'Malwa & Avanti Trade Crossroads',
        type: 'kingdom',
        desc: 'The historic zero-meridian city of Ujjayini (Avanti) and the Surasena region.',
        modernLocation: 'Malwa Plateau & Western Madhya Pradesh',
        svgX: 380,
        svgY: 330,
      },
      {
        id: 'cp-w-2',
        nameSa: 'सौराष्ट्र (Saurāṣṭra)',
        nameEn: 'Kathiawar & Gulf of Kutch',
        type: 'kingdom',
        desc: 'The maritime trading peninsula renowned for port cities, pearls, and sea-going merchants.',
        modernLocation: 'Gujarat Peninsula (Saurashtra / Kathiawar)',
        svgX: 300,
        svgY: 350,
      },
      {
        id: 'cp-w-3',
        nameSa: 'सिन्धु-सागर-सङ्गम (Sindhu Delta)',
        nameEn: 'Mouth of the Indus River',
        type: 'river',
        desc: 'Where the historic Sindhu empties through hundreds of channels into the Arabian Sea.',
        modernLocation: 'Indus River Delta & Sindh Coastline',
        svgX: 230,
        svgY: 310,
      },
      {
        id: 'cp-w-4',
        nameSa: 'मरु-भूमि (Maru Deserts)',
        nameEn: 'Thar & Makran Coastal Arid Zones',
        type: 'kingdom',
        desc: 'The formidable desert expanses stretching westward along the Persian Gulf borders.',
        modernLocation: 'Thar Desert & Makran Coastline',
        svgX: 180,
        svgY: 280,
      },
      {
        id: 'cp-w-5',
        nameSa: 'अस्तगिरि (Mount Astagiri)',
        nameEn: 'The Sunset Terminal Mountain',
        type: 'terminal',
        desc: 'The mythical western mountain of 10,000 golden peaks where the setting sun dips into Varuna’s ocean.',
        modernLocation: 'Western Mountain Ridge bordering the Arabian Sea / Zagros',
        svgX: 110,
        svgY: 290,
      },
    ],
    modernConcordance: 'Delineates the ancient maritime and caravan trade corridors heading west from Ujjain across Gujarat, the Indus mouth, the Makran coast, and the sunset horizon of the Arabian Sea.',
    terminalLandmark: {
      nameSa: 'अस्तगिरिः (Astagiri & Meghavān)',
      nameEn: 'Mount of the Setting Sun',
      description: 'The celestial western terminal of 10,000 summits where Surya completes his daily circuit and enters the watery realm of Varuna.',
    },
  },
  {
    id: 'north',
    directionSa: 'उत्तर-दिग्-यात्रा (Uttara-Dig-Yātrā)',
    directionEn: 'Northward Expedition · The Trans-Himalayan Heights & Meru',
    commander: 'Śatabali (शतबलिः)',
    commanderTitle: 'Commander of 100,000 Veteran Mountaineers',
    sargaCitation: 'Vālmīki Rāmāyaṇa · Kiṣkindhā-Kāṇḍa, Sarga 43',
    squadStrength: '100,000 Warriors',
    themeColor: '#0284c7',
    brief: 'Sugriva instructs Shatabali to journey through Kurukshetra, the Himalayan barrier (Himavat), Mount Kailash, the narrow Krauncha pass, Mount Meru, and the sunless paradise of Uttarakuru.',
    shlokaSa: 'ततो म्लेच्छान्पुलिन्दांश्च शूरसेनांस्तथैव च। कुरुंश्च सह मद्रैश्च काम्बोजान् यवनांस्तथा॥\nहिमवन्तमतिक्रम्य क्रौञ्चो नाम महागिरिः। तस्य च्छिद्रं महत्त्वेन क्रौञ्चरन्ध्रमिति श्रुतम्॥',
    shlokaTranslit: 'tato mlecchānpulindāṁśca śūrasenāṁstathaiva ca | kuruṁśca saha madraiśca kāmbojān yavanāṁstathā ||\nhimavantamatikramya krauñco nāma mahāgiriḥ | tasya cchidraṁ mahattvena krauñcarandhramiti śrutam ||',
    shlokaMeaning: 'Search through the lands of Kurus, Madras, Kambojas, and Yavanas. Scaling past the Himalayas stands great Mount Krauncha, renowned for the cavernous defile Krauncha-randhra through which migratory swans take flight.',
    checkpoints: [
      {
        id: 'cp-n-1',
        nameSa: 'कुरु-मद्र-काम्बोज (Kuru, Madra & Kāmboja)',
        nameEn: 'Northern Plains & Trans-Indus Janapadas',
        type: 'kingdom',
        desc: 'The fertile plains of the Saraswati basin and northwestern kingdoms.',
        modernLocation: 'Punjab, Haryana & Khyber / Pamir Gateways',
        svgX: 440,
        svgY: 210,
      },
      {
        id: 'cp-n-2',
        nameSa: 'हिमवान् (Himavat Range)',
        nameEn: 'The Great Himalayan Snows',
        type: 'mountain',
        desc: 'The colossal snow-capped Himalayan ranges harboring sacred glaciers and rivers.',
        modernLocation: 'Greater Himalayan Range (Uttarakhand, Nepal, Tibet)',
        svgX: 450,
        svgY: 155,
      },
      {
        id: 'cp-n-3',
        nameSa: 'कैलास & मानसरोवर (Kailāśa & Mānasa)',
        nameEn: 'Mount Kailash & Holy Lake Manasa',
        type: 'mountain',
        desc: 'The diamond-like summit of Kailash, abode of Shiva and the palace of Kubera (Alakapuri).',
        modernLocation: 'Mount Kailash & Lake Manasarovar (Tibetan Plateau)',
        svgX: 470,
        svgY: 110,
      },
      {
        id: 'cp-n-4',
        nameSa: 'क्रौञ्चरन्ध्र (Krauñca Defile & Pass)',
        nameEn: 'The Krauncha Himalayan Mountain Pass',
        type: 'mountain',
        desc: 'The famous cleft in the mountains through which migratory swans, geese, and sages traveled north.',
        modernLocation: 'High Trans-Himalayan Pass (Mana / Niti / Lipulekh Pass)',
        svgX: 495,
        svgY: 75,
      },
      {
        id: 'cp-n-5',
        nameSa: 'मेरु & उत्तरकुरु (Meru & Uttarakuru)',
        nameEn: 'The Golden Cosmic Axis & Polar Realm',
        type: 'terminal',
        desc: 'The northern pole of the ancient world where the sun remains visible for months, bounded by the Sailoda river.',
        modernLocation: 'Pamir Knot / Northern Arctic Horizons of Eurasia',
        svgX: 460,
        svgY: 30,
      },
    ],
    modernConcordance: 'Remarkable depiction of trans-Himalayan geography: Indo-Gangetic divide -> Himalayas -> Kailash/Manasarovar -> Krauncha Pass -> Central Asian steppes (Uttarakuru) and the northern polar light phenomena.',
    terminalLandmark: {
      nameSa: 'मेरुः & उत्तरकुरुः (Mount Meru & Uttarakuru)',
      nameEn: 'The Golden Axis of the World',
      description: 'The supreme celestial mountain Meru around which the planets rotate, and the tranquil land of Uttarakuru beyond the reach of normal mortality.',
    },
  },
];

export const LANDMARK_QUESTS: LandmarkQuest[] = [
  // EAST EXPEDITION QUESTS (1-4)
  {
    id: 'quest-e-1',
    direction: 'east',
    questNumber: 1,
    titleSa: 'यवद्वीप-अभिज्ञानम् · The Island of Seven Kingdoms',
    titleEn: 'Decoding the Seven Kingdoms of Yavadvipa',
    shlokaSa: 'यत्नवन्तो यवद्वीपं सप्तराज्यसमाश्रितम्। सुवर्णरूप्यकं चैव सुवर्णकरमण्डितम्॥',
    shlokaTranslit: 'yatnavanto yavadvīpaṁ saptarājyasamāśritam | suvarṇarūpyakaṁ caiva suvarṇakaramaṇḍitam ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 40.30',
    questionText: 'Sugriva instructs Vinata’s eastern squad to explore "Yavadvīpa" (यवद्वीप), noted for its seven kingdoms and gold mines. Which modern archipelago and island is this universally identified with?',
    options: [
      'A) Madagascar in the African Ocean',
      'B) The Island of Java (Indonesia) in Southeast Asia',
      'C) Cyprus in the Mediterranean Sea',
      'D) Sri Lanka in the Southern Ocean',
    ],
    correctOptionIndex: 1,
    explanation: 'Yavadvīpa literally translates to the "Island of Barley/Grain" (Java). Ancient Sanskrit inscriptions found in Indonesia (such as the Canggal and Tugu inscriptions) confirm the historical preservation of this name in Southeast Asia.',
    sanskritGrammarNote: 'यवद्वीपम् = यवानां द्वीपः (षष्ठी-तत्पुरुष-समासः). सप्तराज्यसमाश्रितम् = सप्तभिः राज्यैः समाश्रितम् (तृतीया-तत्पुरुषः).',
    badgeEarned: 'Yavadvīpa Navigator',
  },
  {
    id: 'quest-e-2',
    direction: 'east',
    questNumber: 2,
    titleSa: 'लोहित-सागर-रहस्यम् · The Red-Tinged Ocean',
    titleEn: 'The Mystery of Lohita Sāgara',
    shlokaSa: 'ततो रक्तजलं प्राप्य लोहितं नाम सागरम्। बृहद्वृक्षांश्च काकुत्स्थ पश्यध्वं सिद्धसेवितान्॥',
    shlokaTranslit: 'tato raktajalaṁ prāpya lohitaṁ nāma sāgaram | bṛhadvṛkṣāṁśca kākutstha paśyadhvaṁ siddhasevitān ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 40.40',
    questionText: 'Past the eastern kingdoms, the Vanaras encounter the "Lohita Sāgara" (लोहितः सागरः), noted for its reddish water. What natural marine phenomenon creates this reddish tint described by Sugriva?',
    options: [
      'A) Volcanic sulphur discharges from submarine trenches',
      'B) Seasonal algal blooms of red phytoplankton (Trichodesmium erythraeum) and coral reflections',
      'C) Dissolved iron ore dust blowing from the Sahara desert',
      'D) Copper chemical pollution from ancient ships',
    ],
    correctOptionIndex: 1,
    explanation: 'Seasonal blooms of red microalgae (Trichodesmium erythraeum), commonly seen in tropical waters such as the Bay of Bengal, the Red Sea, and Andaman seas, turn the sea surface red-brown. Ancient navigators in India explicitly recorded this as Lohita (Red) Sagara.',
    sanskritGrammarNote: 'रक्तजलम् = रक्तं जलं यस्य सः (बहुव्रीहि-समासः — "that having red waters").',
    badgeEarned: 'Lohita Oceanographer',
  },
  {
    id: 'quest-e-3',
    direction: 'east',
    questNumber: 3,
    titleSa: 'शिशिर-पर्वत-शिखरम् · The Celestial Frost Mountain',
    titleEn: 'The Lofty Summit of Mount Shishira',
    shlokaSa: 'यवद्वीपमतिक्रम्य शिशिरो नाम पर्वतः। दिवं स्पृशति शृङ्गेण देवदानवसेवितः॥',
    shlokaTranslit: 'yavadvīpamatikramya śiśiro nāma parvataḥ | divaṁ spṛśati śṛṅgeṇa devadānavasevitaḥ ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 40.31',
    questionText: 'Immediately past Yavadvipa rises Mount Śiśira (शिशिरः), touching the heavens with its crest. In Sanskrit, what does the root "śiśira" mean, indicating the climate of this towering peak?',
    options: [
      'A) Scalding hot and volcanic',
      'B) Cool, frosty, or snow-covered mountain peak',
      'C) Submerged under ocean waves',
      'D) Formed entirely of red clay',
    ],
    correctOptionIndex: 1,
    explanation: 'Śiśira (शिशिर) in Sanskrit means "cold", "frosty", or "chilly". Despite being in the tropical zone, towering peaks such as Puncak Jaya in the Indonesian/Papuan cordillera retain year-round glaciers and frosts, which astounded ancient tropical voyagers.',
    sanskritGrammarNote: 'शिशिरः = शीतलो हिमवान्। दिवं स्पृशति = आकाशाग्रं गच्छति (अत्युच्चः).',
    badgeEarned: 'Frost Peak Scout',
  },
  {
    id: 'quest-e-4',
    direction: 'east',
    questNumber: 4,
    titleSa: 'उदयगिरि-सौमनस · The First Meridian of Dawn',
    titleEn: 'Udayagiri: The First Meridian of Dawn',
    shlokaSa: 'तत्र पूर्वं पदं कृत्वा पुरा विष्णुरुदक्रमत्। उत्तरां पृथिवीं सर्वां सव्येनाक्रमत प्रभुः॥',
    shlokaTranslit: 'tatra pūrvaṁ padaṁ kṛtvā purā viṣṇurudakramat | uttarāṁ pṛthivīṁ sarvāṁ savyenākramata prabhuḥ ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 40.58',
    questionText: 'Sugriva instructs the scouts that Mount Udayagiri is the absolute eastern terminus beyond which there is no further overland route. What astronomical role did Udayagiri serve in Indian cosmology?',
    options: [
      'A) The prime meridian where time was measured backwards',
      'B) The zero-longitude horizon of sunrise where the solar day begins its traversal across Jambudvipa',
      'C) The eclipse crater where the sun disappears at night',
      'D) A lunar observatory used only during solar eclipses',
    ],
    correctOptionIndex: 1,
    explanation: 'In ancient Indian spherical astronomy (Golādhyāya), Udayagiri was conceptualized as the easternmost horizon 90 degrees east of the Ujjayini Prime Meridian, marking the diurnal dawn of the sun across Jambudvipa.',
    sanskritGrammarNote: 'उदयगिरिः = उदयस्य गिरिः (षष्ठी-तत्पुरुषः — "Mountain of the Rising Sun").',
    badgeEarned: 'Sunrise Custodian',
  },

  // SOUTH EXPEDITION QUESTS (5-8)
  {
    id: 'quest-s-1',
    direction: 'south',
    questNumber: 5,
    titleSa: 'विन्ध्य-पारगमनम् · Crossing the Great Divide',
    titleEn: 'Breaching the Thousand-Peaked Vindhyas',
    shlokaSa: 'सहस्रशिरसं विन्ध्यं नानाद्रुमलतायुतम्। नर्मदां च नदीं रम्यां महोरगनिषेविताम्॥',
    shlokaTranslit: 'sahasraśirasaṁ vindhyaṁ nānādrumalatāyutam | narmadāṁ ca nadīṁ ramyāṁ mahoraganiṣevitām ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 41.8',
    questionText: 'Heading southward from Kishkindha/Prasravana, the vanguard must navigate the "thousand-peaked" Vindhyas and the Narmada river. What makes the Narmada unique among India’s major river systems?',
    options: [
      'A) It is the only Indian river that flows through glaciers',
      'B) It flows east to west through a rift valley between the Vindhya and Satpura ranges into the Arabian Sea',
      'C) It empties into Lake Manasarovar in Tibet',
      'D) It is an underground river with no surface channel',
    ],
    correctOptionIndex: 1,
    explanation: 'Unlike the Ganga, Godavari, and Kaveri which flow eastward into the Bay of Bengal, the Narmada flows westward through a linear tectonic rift valley between the Vindhya and Satpura mountain ranges into the Gulf of Khambhat.',
    sanskritGrammarNote: 'सहस्रशिरसम् = सहस्रं शिरांसि यस्य तम् (बहुव्रीहि-समासः — "having a thousand summits").',
    badgeEarned: 'Vindhyan Trailblazer',
  },
  {
    id: 'quest-s-2',
    direction: 'south',
    questNumber: 6,
    titleSa: 'कावेरी-दर्शनम् · The Sacred River of the South',
    titleEn: 'Kaveri: The Dakshina Ganga',
    shlokaSa: 'ततः कावेरीं नदीं रम्यां महोर्मिजलशोभिताम्। तस्यास्तीरे समासीनं महर्षिमगस्त्यमुत्तमम्॥',
    shlokaTranslit: 'tataḥ kāverīṁ nadīṁ ramyāṁ mahormijalaśobhitām | tasyāstīre samāsīnaṁ maharṣimagastyamuttamam ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 41.13',
    questionText: 'Sugriva instructs the vanaras to search the banks of the sacred river Kaveri and visit sage Agastya. In Indian tradition, why is sage Agastya uniquely revered in the geography of South India?',
    options: [
      'A) He constructed the first sailing boat in the Ganga',
      'B) He humbled the rising Vindhya mountains and pioneered Sanskrit grammar and Tamil Sangam linguistics in the South',
      'C) He was the court astronomer of King Janaka in Mithila',
      'D) He built the stepwells of Gujarat',
    ],
    correctOptionIndex: 1,
    explanation: 'Sage Agastya is celebrated as the cultural bridge between North and South India: he asked the Vindhyas to remain bowed until his return, settled in the Malaya mountains, and is revered as the father of Tamil grammar (Agattiyam) and Siddha medicine.',
    sanskritGrammarNote: 'महोर्मिजलशोभिताम् = महतीनाम् ऊर्मीणां जलेण शोभिताम् (तत्पुरुष-समासः).',
    badgeEarned: 'Agastya Disciple',
  },
  {
    id: 'quest-s-3',
    direction: 'south',
    questNumber: 7,
    titleSa: 'चन्दन-सुरभि-मलय · Sandalwood Slopes of Malaya',
    titleEn: 'The Fragrant Slopes of Mount Malaya',
    shlokaSa: 'चन्दनैश्च महासारैः शोभितं मलयं गिरिम्। ततः समुद्रमासाद्य द्रक्ष्यथ प्लवगोत्तमाः॥',
    shlokaTranslit: 'candanaiśca mahāsāraiḥ śobhitaṁ malayaṁ girim | tataḥ samudramāsādya drakṣyatha plavagottamāḥ ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 41.25',
    questionText: 'Sugriva directs the heroes to Mount Malaya (मलयः), celebrated throughout Sanskrit literature for what world-famous aromatic tree species?',
    options: [
      'A) Himalayan Deodar Cedar (Devadāru)',
      'B) Red Sandalwood & White Sandalwood (Candana)',
      'C) Afghan Pine (Sarala)',
      'D) Sundarban Mangrove (Sundarī)',
    ],
    correctOptionIndex: 1,
    explanation: 'Mount Malaya in the southern Western Ghats is the botanical homeland of Santalum album (Sandalwood). The gentle southern breeze laden with sandalwood fragrance is celebrated in classical Sanskrit poetry as "Malaya-māruta" (मलयमारुतः).',
    sanskritGrammarNote: 'मलयमारुतः = मलयपर्वतात् आगतः मारुतः (मध्यमपदलोपी / पञ्चमी-तत्पुरुषः).',
    badgeEarned: 'Malaya Sandalwood Ranger',
  },
  {
    id: 'quest-s-4',
    direction: 'south',
    questNumber: 8,
    titleSa: 'महेन्द्रगिरि-समुत्पतनम् · Hanuman’s Launchpad Promontory',
    titleEn: 'Mahendragiri: The Oceanic Promontory',
    shlokaSa: 'ततो हेममयं दिव्यं मुक्तामणिविभूषितम्। युक्तं कवचनेत्रेण ददृशुस्ते महेन्द्रकम्॥',
    shlokaTranslit: 'tato hemamayaṁ divyaṁ muktāmaṇivibhūṣitam | yuktaṁ kavacanetreṇa dadṛśuste mahendrakam ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 41.21',
    questionText: 'At the southern coast, the Vanaras assemble upon Mount Mahendra (महेन्द्रगिरिः). What momentous event in the Ramayana takes place from this peak?',
    options: [
      'A) The coronation of King Sugriva',
      'B) Hanuman expands his body to colossal size and launches his 100-yojana flight across the sea to Lanka',
      'C) The building of the Nalasetu bridge by the entire army',
      'D) The final battle between Rama and Ravana',
    ],
    correctOptionIndex: 1,
    explanation: 'As described in Sundara-Kāṇḍa, Mount Mahendra serves as the rock-solid terrestrial launchpad from which Hanuman takes his cosmic leap across the southern ocean, withstanding the immense downward thrust of his takeoff.',
    sanskritGrammarNote: 'हेममयम् = हेम (स्वर्णम्) प्रचुरं यस्मिन् (मयट्-प्रत्ययः — "golden / rich in gold").',
    badgeEarned: 'Ocean Leaper',
  },

  // WEST EXPEDITION QUESTS (9-12)
  {
    id: 'quest-w-1',
    direction: 'west',
    questNumber: 9,
    titleSa: 'अवन्ती-मध्यरेखा-सङ्गम · The Zero Meridian Crossroads',
    titleEn: 'Avanti: The Prime Meridian Crossroads',
    shlokaSa: 'सौराष्ट्रांश्च सहैवेयान् रम्यान् रमणकांस्तथा। अवन्तीं च महाभागां विन्ध्यपादसमाश्रिताम्॥',
    shlokaTranslit: 'saurāṣṭrāṁśca sahaiveyān ramyān ramaṇakāṁstathā | avantīṁ ca mahābhāgāṁ vindhyapādasamāśritām ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 42.6',
    questionText: 'Sushena’s western expedition traverses Avanti (Ujjayini). In ancient Indian geodesy and astronomy (Sūrya Siddhānta), why was Avanti regarded as the spatial center of the world?',
    options: [
      'A) It was the southernmost port of the Indian Ocean',
      'B) The 0° Prime Meridian (Madhya-Rekhā) intersected the Tropic of Cancer (Karka-Rekhā) exactly at Ujjayini',
      'C) It had the only gold repository in western India',
      'D) It was surrounded by four saltwater lakes',
    ],
    correctOptionIndex: 1,
    explanation: 'Centuries before Greenwich, ancient Indian astronomers standardized Ujjain (Avanti) at 0° longitude (Madhya-Rekha) where it intersected the Tropic of Cancer (23.2° N), serving as the universal reference clock for planetary calculations.',
    sanskritGrammarNote: 'विन्ध्यपादसमाश्रिताम् = विन्ध्यस्य पादान् (मूलम्) समाश्रिताम् (द्वितीया-तत्पुरुषः).',
    badgeEarned: 'Meridian Cartographer',
  },
  {
    id: 'quest-w-2',
    direction: 'west',
    questNumber: 10,
    titleSa: 'सौराष्ट्र-सागर-तट · The Maritime Gateway of Saurashtra',
    titleEn: 'Saurashtra and the Arabian Sea Gateway',
    shlokaSa: 'सौराष्ट्रांश्च सहैवेयान् रम्यान् रमणकांस्तथा। ततो गत्वा समुद्रान्तं सिन्धुसागरसङ्गमम्॥',
    shlokaTranslit: 'saurāṣṭrāṁśca sahaiveyān ramyān ramaṇakāṁstathā | tato gatvā samudrāntaṁ sindhusāgarasaṅgamam ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 42.8',
    questionText: 'Sugriva instructs the western party to explore "Saurāṣṭra" (सौराष्ट्र) bordering the western sea. What does the Sanskrit name "Saurāṣṭra" literally mean?',
    options: [
      'A) Land of Dense Fog',
      'B) The Good / Prosperous Kingdom (Su-Rāṣṭra)',
      'C) Realm of Iron Weapons',
      'D) The Southern Marshland',
    ],
    correctOptionIndex: 1,
    explanation: 'Saurāṣṭra is derived from Su-rāṣṭra (सु-राष्ट्र), meaning "the good / fertile / blessed realm", named for its prosperous maritime trade ports (like Lothal, Bharuch, and Dwarka) that conducted global commerce with Mesopotamia and Rome.',
    sanskritGrammarNote: 'सुराष्ट्रम् = शोभनं राष्ट्रम् (कर्मधारय-समासः). सौराष्ट्रः = सुराष्ट्रे भवः (अण्-प्रत्ययः).',
    badgeEarned: 'Saurashtra Voyager',
  },
  {
    id: 'quest-w-3',
    direction: 'west',
    questNumber: 11,
    titleSa: 'सिन्धु-सागर-सङ्गम · Where the Indus Meets the Ocean',
    titleEn: 'The Mighty Confluence of the Indus Delta',
    shlokaSa: 'ततो गत्वा समुद्रान्तं सिन्धुसागरसङ्गमम्। यत्र सिन्धुर्नदी रम्या सागरं प्रविशत्यसौ॥',
    shlokaTranslit: 'tato gatvā samudrāntaṁ sindhusāgarasaṅgamam | yatra sindhurnadī ramyā sāgaraṁ praviśatyasau ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 42.9',
    questionText: 'Sushena’s army marches to "Sindhu-sāgara-saṅgama" (सिन्धुसागरसङ्गमः). What geographic landmark does this represent in ancient cartography?',
    options: [
      'A) The confluence of the Ganga and Yamuna at Prayagraj',
      'B) The expansive river delta where the Indus River empties into the Arabian Sea',
      'C) The waterfall of the Cauvery at Shivanasamudra',
      'D) The mouth of the Brahmaputra at the Sundarbans',
    ],
    correctOptionIndex: 1,
    explanation: 'Sindhu-sāgara-saṅgama is the estuarine delta of the Indus River meeting the Arabian Sea (Sindhu Sāgara). This vast delta was a central node of Harappan and Vedic maritime trade routes.',
    sanskritGrammarNote: 'सिन्धुसागरसङ्गमम् = सिन्धोः सागरस्य च सङ्गमः (द्वन्द्व-गर्भ-तत्पुरुषः).',
    badgeEarned: 'Delta Pathfinder',
  },
  {
    id: 'quest-w-4',
    direction: 'west',
    questNumber: 12,
    titleSa: 'अस्तगिरि-दशसहस्रशिखर · The 10,000 Sunset Peaks',
    titleEn: 'Astagiri: The Sunset Mountain of 10,000 Peaks',
    shlokaSa: 'दशतालशिरो यत्र सौवर्णो गिरिपुङ्गवः। अस्तं गच्छति यत्रासौ सविता सर्वलोकदृक्॥',
    shlokaTranslit: 'daśatālaśiro yatra sauvarṇo giripuṅgavaḥ | astaṁ gacchati yatrāsau savitā sarvalokadṛk ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 42.45',
    questionText: 'At the far western terminus stands Mount Astagiri (अस्तगिरिः). In Sanskrit cosmological geography, which guardian deity (Dikpāla) presides over this western oceanic boundary?',
    options: [
      'A) Kubera (Lord of Northern Wealth)',
      'B) Varuṇa (Lord of Waters, Oceans and Cosmic Order / Ṛta)',
      'C) Agni (Lord of Sacrificial Fire)',
      'D) Indra (Lord of Eastern Thunder)',
    ],
    correctOptionIndex: 1,
    explanation: 'Varuṇa is the Vedic guardian (Dikpāla) of the Western direction (Paścima-Diśā) and sovereign of all oceans and watery realms where the sun sets into the horizon.',
    sanskritGrammarNote: 'अस्तगिरिः = अस्तगमनस्य गिरिः (मध्यमपदलोपी तत्पुरुषः — "mountain of the setting sun").',
    badgeEarned: 'Varuṇa Realm Warden',
  },

  // NORTH EXPEDITION QUESTS (13-16)
  {
    id: 'quest-n-1',
    direction: 'north',
    questNumber: 13,
    titleSa: 'क्रौञ्चरन्ध्र-पारगमनम् · The Mountain Pass of the Swans',
    titleEn: 'The Narrow Defile of Krauncha-Randhra',
    shlokaSa: 'हिमवन्तमतिक्रम्य क्रौञ्चो नाम महागिरिः। तस्य च्छिद्रं महत्त्वेन क्रौञ्चरन्ध्रमिति श्रुतम्॥',
    shlokaTranslit: 'himavantamatikramya krauñco nāma mahāgiriḥ | tasya cchidraṁ mahattvena krauñcarandhramiti śrutam ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 43.25',
    questionText: 'Past the Himalayas, Shatabali’s northern army reaches "Krauñca-randhra" (क्रौञ्चरन्ध्रम्). Celebrated also in Kalidasa’s Meghaduta, what does "randhra" mean in this geomorphological context?',
    options: [
      'A) An artificial gold mine shaft',
      'B) A natural mountain pass, tunnel, or cleft through which birds and travelers pierce the high mountain wall',
      'C) A boiling geyser pool',
      'D) An underwater whirlpool',
    ],
    correctOptionIndex: 1,
    explanation: 'Randhra (रन्ध्र) in Sanskrit signifies an aperture, cavity, or cleft. Krauñca-randhra was a high Himalayan mountain pass (like the Lipulekh or Mana Pass) famed as the flyway used by bar-headed geese (Haṁsa) migrating between India and Tibet.',
    sanskritGrammarNote: 'क्रौञ्चरन्ध्रम् = क्रौञ्चस्य (पर्वतस्य) रन्ध्रम् (षष्ठी-तत्पुरुषः — "the Krauncha Pass").',
    badgeEarned: 'High Pass Explorer',
  },
  {
    id: 'quest-n-2',
    direction: 'north',
    questNumber: 14,
    titleSa: 'कैलास-मानसरोवर-वैभव · The Crystal Abode of Kailash',
    titleEn: 'Kailash and the High Alpine Lake Manasa',
    shlokaSa: 'ततो द्रक्ष्यथ शैलेन्द्रं कैलासं श्वेतसन्निभम्। तत्र पाण्डुरमेघाभं प्रासादं धनदस्य च॥',
    shlokaTranslit: 'tato drakṣyatha śailendraṁ kailāsaṁ śvetasannibham | tatra pāṇḍurameghābhaṁ prāsādaṁ dhanadasya ca ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 43.20',
    questionText: 'Sugriva describes Mount Kailāśa (कैलासः) as glowing like white snow and housing the palace of "Dhanada" (धनदः). Who is "Dhanada" in Sanskrit epics?',
    options: [
      'A) Sage Vashishta',
      'B) Kubera (Lord of Northern Wealth and Yakṣas)',
      'C) Surya (The Sun God)',
      'D) Parashurama',
    ],
    correctOptionIndex: 1,
    explanation: 'Dhanada (धन-द, "the giver of wealth") is an epithet of Kubera, sovereign of the Yakshas and Dikpāla of the North, whose celestial capital Alakāpurī was situated near Mount Kailash.',
    sanskritGrammarNote: 'धनदः = धनं ददाति इति (उपपद-तत्पुरुष-समासः — दा धातु + क प्रत्ययः).',
    badgeEarned: 'Kailash Pilgrim',
  },
  {
    id: 'quest-n-3',
    direction: 'north',
    questNumber: 15,
    titleSa: 'शैलोदा-नदी-रहस्यम् · The River of Petrification',
    titleEn: 'The Mystery of the Sailoda River',
    shlokaSa: 'ततस्तामभितो रम्यां शैलोदां नाम निम्नगाम्। कीचकैर्वैणुभिश्छन्नां सिद्धगन्धर्वसेविताम्॥',
    shlokaTranslit: 'tatastāmabhito ramyāṁ śailodāṁ nāma nimnagām | kīcakairveṇubhiśchannāṁ siddhagandharvasevitām ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 43.37',
    questionText: 'North of Kailash flows the river Śailodā (शैलोदा), flanked by hollow whistling canes (Kīcaka reeds). In classical Indian geography (Mahabharata and Megasthenes), what distinctive quality was attributed to the waters of Sailoda?',
    options: [
      'A) It was hot boiling mineral water that healed all wounds',
      'B) The water was so dense in mineral salts that objects sinking in it gradually petrified (turned stone-hard)',
      'C) The river flowed upward into the sky',
      'D) It froze into solid diamond during full moon nights',
    ],
    correctOptionIndex: 1,
    explanation: 'Śailodā literally translates to "she whose water turns things to stone" (Śilā + Uda). Classical geographers (including Megasthenes and the Mahābhārata) noted that the mineral-dense springs of the Tarim basin had petrifying properties on plant matter.',
    sanskritGrammarNote: 'शैलोदा = शिलामयं जलम् (उदकम्) यस्याः सा (बहुव्रीहिः).',
    badgeEarned: 'Sailoda Scribe',
  },
  {
    id: 'quest-n-4',
    direction: 'north',
    questNumber: 16,
    titleSa: 'उत्तरकुरु-ध्रुव-दर्शनम् · The Sunlit Northern Elysium',
    titleEn: 'Uttarakuru: The Polar Day Phenomenon',
    shlokaSa: 'न तत्र सूर्यस्तपति न शीतो नापि चोष्णता। सर्वकामफला वृक्षास्तस्मिन् देशे मनोरमे॥',
    shlokaTranslit: 'na tatra sūryastapati na śīto nāpi coṣṇatā | sarvakāmaphalā vṛkṣāstasmin deśe manorame ||',
    shlokaSource: 'Kiṣkindhā-Kāṇḍa 43.43',
    questionText: 'Beyond Mount Meru lies the land of "Uttarakuru" (उत्तरकुरुः) where the sun never scorches, time flows differently, and nights are bright. What real high-latitude geophysical phenomenon does this ancient description capture?',
    options: [
      'A) Equatorial rainforest humidity',
      'B) The Midnight Sun and Polar Day in Arctic high latitudes, where the sun remains above the horizon without setting during summer',
      'C) A total solar eclipse lasting seven years',
      'D) Lunar tides in desert sand dunes',
    ],
    correctOptionIndex: 1,
    explanation: 'In the high northern latitudes near and beyond the Arctic circle, the summer solstice brings the "Midnight Sun" (polar day) where the sun circles the horizon without setting. Ancient Indian explorers documented this as the perpetually illuminated, tranquil realm of Uttarakuru.',
    sanskritGrammarNote: 'सर्वकामफलाः = सर्वे कामाः फलरूपेण येभ्यः ते (बहुव्रीहि-समासः — "granting all desires").',
    badgeEarned: 'Polar Axis Chronicler',
  },
];

/* ==========================================================================
   COLLECTIBLE TRAVEL CARDS GAMEPLAY DATA (12 CARDS ACROSS 4 SUITS)
   ========================================================================== */

export type CardSuit = 'dakshina' | 'purva' | 'paschima' | 'uttara';

export interface CollectibleCard {
  id: string;
  cardNumber: string;
  name: string;
  nameSa: string;
  suit: CardSuit;
  suitName: string;
  suitColor: string;
  staminaCost: number;
  terrainType: 'forest' | 'river' | 'mountain' | 'ocean' | 'desert' | 'polar';
  hint: string;
  graphicDesc: string;
  frontImage?: string;
  backImage?: string;
  modernMatch: string;
  whyItChanged: string;
  satelliteTag: string;
  mapNode: {
    x: number;
    y: number;
    label: string;
  };
  challenge: {
    question: string;
    options: string[];
    correctIndex: number;
    successFact: string;
  };
}

export interface DirectionRelic {
  suit: CardSuit;
  name: string;
  nameSa: string;
  themeColor: string;
  description: string;
  fastTravelPerk: string;
  shlokaSnippet: string;
}

export const DIRECTION_RELICS: Record<CardSuit, DirectionRelic> = {
  dakshina: {
    suit: 'dakshina',
    name: 'Agastya Emerald Conch',
    nameSa: 'दक्षिणाम्नाय-शङ्खः (Dakṣiṇāmnāya-Śaṅkhaḥ)',
    themeColor: '#059669',
    description: 'Forged in the hermitage of Sage Agastya where the Vindhyas bowed down. Calms treacherous coastal waves and jungle thickets.',
    fastTravelPerk: 'Southern Fast-Travel: Teleport instantly anywhere along the Southern Trail with zero stamina depletion.',
    shlokaSnippet: 'अगस्त्यस्याश्रमो रम्यो ददृशुस्ते महाबलाः (Kiṣkindhā 41.15)',
  },
  purva: {
    suit: 'purva',
    name: 'Saumanasa Solar Chariot',
    nameSa: 'सौमनस-स्वर्णरथः (Saumanasa-Svarṇarathaḥ)',
    themeColor: '#d97706',
    description: 'Crafted from the golden crest of Mount Udayagiri. Catches the morning solar winds of dawn to glide across eastern archipelagos.',
    fastTravelPerk: 'Eastern Fast-Travel: Leap across river basins and island waterways without boat delays.',
    shlokaSnippet: 'तत्र पूर्वं पदं कृत्वा पुरा विष्णुरुदक्रमत् (Kiṣkindhā 40.58)',
  },
  paschima: {
    suit: 'paschima',
    name: 'Varuna Desert Pearl',
    nameSa: 'वारुण-सागरमौक्तिकम् (Vāruṇa-Sāgaramauktikam)',
    themeColor: '#ea580c',
    description: 'Blest by Lord Varuna in the 10,000 sunset summits of Astagiri. Prevents thirst in dry desert corridors.',
    fastTravelPerk: 'Western Fast-Travel: March through arid salt marshes and estuaries at full speed.',
    shlokaSnippet: 'अस्तं गच्छति यत्रासौ सविता सर्वलोकदृक् (Kiṣkindhā 42.45)',
  },
  uttara: {
    suit: 'uttara',
    name: 'Meru Sapphire Crest',
    nameSa: 'मेरु-नीलमणि-चूडा (Meru-Nīlamaṇi-Cūḍā)',
    themeColor: '#0284c7',
    description: 'Radiating the azure glow of the celestial polar axis. Protects against blizzard frost and guides through Himalayan cloud passes.',
    fastTravelPerk: 'Northern Fast-Travel: Traverse frozen summits and high passes without mountain sickness or cold penalties.',
    shlokaSnippet: 'उत्तरं तु दिशं रम्यां हिमवन्तं महागिरिम् (Kiṣkindhā 43.12)',
  },
};

export const COLLECTIBLE_CARDS_DECK: CollectibleCard[] = [
  /* -------------------------------------------------------------------------
     SUIT I: DAKSHINA (The Southern Trail — Emerald Border)
     ------------------------------------------------------------------------- */
  {
    id: 'card-01',
    cardNumber: '01',
    name: 'Vindhya Wall',
    nameSa: 'विन्ध्य-प्राकारः (Vindhya-Prākāraḥ)',
    suit: 'dakshina',
    suitName: 'Suit I: Dakshina (The Southern Trail)',
    suitColor: '#059669',
    staminaCost: 25,
    terrainType: 'mountain',
    hint: 'A green stone wall splits the land in two; only those who find the hidden forest passes may march south.',
    graphicDesc: 'Misty emerald cliffs with a narrow winding trail.',
    frontImage: '/images/sugriva-cards/card-01-vindhya-wall-front.jpg',
    backImage: '/images/sugriva-cards/card-01-vindhya-wall-back.jpg',
    modernMatch: 'Central Indian Highlands',
    whyItChanged: 'Ancient travelers walked dense jungle trails; modern highways and tunnels now cut straight through.',
    satelliteTag: 'Central Indian Highlands · Satpura & Narmada Valley',
    mapNode: { x: 430, y: 340, label: 'Vindhya Wall' },
    challenge: {
      question: 'Which geographical barrier traditionally divided ancient India into Aryavarta (North) and Dakshinapatha (South)?',
      options: [
        'A) The Thar Desert sand dunes',
        'B) The Vindhya and Satpura mountain ranges',
        'C) The Aravalli hills',
        'D) The Sundarbans mangrove swamp',
      ],
      correctIndex: 1,
      successFact: 'The Vindhya-Satpura horst ranges formed a formidable geological divide that required ancient travelers like Agastya and Rama to navigate deep river valleys like the Narmada.',
    },
  },
  {
    id: 'card-02',
    cardNumber: '02',
    name: 'Dandaka Canopy',
    nameSa: 'दण्डकारण्य-वितानम् (Daṇḍaka-Vitānam)',
    suit: 'dakshina',
    suitName: 'Suit I: Dakshina (The Southern Trail)',
    suitColor: '#059669',
    staminaCost: 15,
    terrainType: 'forest',
    hint: 'Beneath a roof of endless trees, three sacred rivers twist like silver serpents.',
    graphicDesc: 'Dense canopy with glowing blue river ribbons.',
    frontImage: '/images/sugriva-cards/card-02-dandaka-canopy-front.jpg',
    backImage: '/images/sugriva-cards/card-02-dandaka-canopy-back.jpg',
    modernMatch: 'Deccan Plateau & Godavari Basin',
    whyItChanged: 'Continuous ancient riverine forests were cleared over centuries for cities and farmland.',
    satelliteTag: 'Deccan Plateau · Godavari Basin River Corridors',
    mapNode: { x: 440, y: 440, label: 'Dandaka Canopy' },
    challenge: {
      question: 'The vast ancient forest of Dandakaranya covered parts of which modern Indian river basins?',
      options: [
        'A) Godavari, Krishna, and Mahanadi basins across the Deccan',
        'B) Indus and Jhelum basins in the northwest',
        'C) Brahmaputra valley in Assam',
        'D) Sabarmati basin in Gujarat',
      ],
      correctIndex: 0,
      successFact: 'Dandakaranya was an immense contiguous forest belt spanning modern Maharashtra, Chhattisgarh, Odisha, and Andhra Pradesh, watered by the Godavari and Indravati.',
    },
  },
  {
    id: 'card-03',
    cardNumber: '03',
    name: 'Nala Setu Shoals',
    nameSa: 'नलसेतु-पुलिनम् (Nalasetu-Pulinam)',
    suit: 'dakshina',
    suitName: 'Suit I: Dakshina (The Southern Trail)',
    suitColor: '#059669',
    staminaCost: 20,
    terrainType: 'ocean',
    hint: 'Where the southern shore ends, white limestone stepping-stones peek through turquoise waves.',
    graphicDesc: 'Shallow coral sandbars linking land to an island.',
    frontImage: '/images/sugriva-cards/card-03-nala-setu-front.jpg',
    backImage: '/images/sugriva-cards/card-03-nala-setu-back.jpg',
    modernMatch: 'Palk Strait & Adam’s Bridge',
    whyItChanged: 'Post-Ice Age sea-level rise submerged the shallow land bridge beneath deeper ocean water.',
    satelliteTag: 'Palk Strait · Adam’s Bridge Coral Shoal Chain',
    mapNode: { x: 450, y: 550, label: 'Nala Setu Shoals' },
    challenge: {
      question: 'Geologically, the chain of shoals between Rameswaram and Mannar Island represents what feature?',
      options: [
        'A) An active volcanic island arc',
        'B) A natural chain of limestone shoals and coral reefs formerly walkable before sea levels rose',
        'C) An iceberg deposit left by glaciers',
        'D) A modern concrete breakwater',
      ],
      correctIndex: 1,
      successFact: 'Historical records (including temple accounts at Rameswaram) indicate that the shoal was above sea level and walkable on foot until major cyclone breaches in 1480 CE.',
    },
  },

  /* -------------------------------------------------------------------------
     SUIT II: PURVA (The Eastern Trail — Gold Border)
     ------------------------------------------------------------------------- */
  {
    id: 'card-04',
    cardNumber: '04',
    name: 'Magadha Plains',
    nameSa: 'मागध-सस्यक्षेत्रम् (Māgadha-Sasyakṣetram)',
    suit: 'purva',
    suitName: 'Suit II: Purva (The Eastern Trail)',
    suitColor: '#d97706',
    staminaCost: 10,
    terrainType: 'river',
    hint: 'Follow the broad, slow river where fertile fields feed great eastern kingdoms.',
    graphicDesc: 'Golden riverbanks with ancient wooden riverboats.',
    modernMatch: 'Middle Gangetic Plain (Bihar)',
    whyItChanged: 'River courses shifted naturally across flat floodplains while embankments fixed modern towns.',
    satelliteTag: 'Middle Gangetic Plain · Bihar Alluvial Belt',
    mapNode: { x: 570, y: 260, label: 'Magadha Plains' },
    challenge: {
      question: 'Why did the Gangetic plains of Magadha become the economic and political center of early Indian empires?',
      options: [
        'A) Vast gold deposits found directly in surface soil',
        'B) Deep alluvial soil, monsoon agriculture, navigable rivers, and nearby iron ore in Chota Nagpur',
        'C) Extreme desert climate that prevented invading armies',
        'D) Perpetual freezing weather that preserved harvest',
      ],
      correctIndex: 1,
      successFact: 'Annual Himalayan silt deposition made Magadha one of the most productive agricultural belts on Earth, supporting large populations and riverine trade.',
    },
  },
  {
    id: 'card-05',
    cardNumber: '05',
    name: 'Ganga-Sagara Maze',
    nameSa: 'गङ्गासागर-सङ्गमव्यूहः (Gaṅgāsāgara-Saṅgama-Vyūhaḥ)',
    suit: 'purva',
    suitName: 'Suit II: Purva (The Eastern Trail)',
    suitColor: '#d97706',
    staminaCost: 15,
    terrainType: 'river',
    hint: 'The river shatters into a hundred watery fingers where tigers guard the mangrove islands.',
    graphicDesc: 'Braided delta channels meeting a golden sunrise.',
    frontImage: '/images/sugriva-cards/card-05-ganga-sagara-front.jpg',
    backImage: '/images/sugriva-cards/card-05-ganga-sagara-back.jpg',
    modernMatch: 'Sundarbans & Bengal Delta',
    whyItChanged: 'Himalayan silt continuously builds new delta islands while reshaping tidal waterways.',
    satelliteTag: 'Sundarbans Mangrove Delta · Bay of Bengal Estuary',
    mapNode: { x: 670, y: 310, label: 'Ganga-Sagara Maze' },
    challenge: {
      question: 'What is the ecological and geographical significance of the Sundarbans where the Ganga meets the sea?',
      options: [
        'A) The world\'s largest contiguous mangrove delta ecosystem, acting as a natural storm surge buffer',
        'B) A freshwater lake surrounded by alpine pine forests',
        'C) An inland desert salt basin',
        'D) A geothermal geyser field',
      ],
      correctIndex: 0,
      successFact: 'The Bengal delta formed by the confluence of the Ganga, Brahmaputra, and Meghna rivers carries over a billion tons of sediment annually into the Bay of Bengal.',
    },
  },
  {
    id: 'card-06',
    cardNumber: '06',
    name: 'Yavadvipa Isle',
    nameSa: 'यवद्वीपम् (Yavadvīpam)',
    suit: 'purva',
    suitName: 'Suit II: Purva (The Eastern Trail)',
    suitColor: '#d97706',
    staminaCost: 25,
    terrainType: 'ocean',
    hint: 'Sail across the eastern sea to a volcanic island rich in golden grain and seven realms.',
    graphicDesc: 'Twin smoking volcanoes rising from a sapphire sea.',
    frontImage: '/images/sugriva-cards/card-06-yavadvipa-front.jpg',
    backImage: '/images/sugriva-cards/card-06-yavadvipa-back.jpg',
    modernMatch: 'Java & Sumatra (Indonesia)',
    whyItChanged: 'Rising seas flooded the ancient Sundaland shelf, widening the ocean gap between islands.',
    satelliteTag: 'Indonesian Archipelago · Sunda Shelf & Volcanic Arc',
    mapNode: { x: 790, y: 380, label: 'Yavadvipa Isle' },
    challenge: {
      question: 'Sugriva describes Yavadvipa as "saptarājyasamāśritam" (possessing seven kingdoms). What modern geographical term describes this landmass?',
      options: [
        'A) The Arabian Peninsula',
        'B) The Greater Sunda Islands of Indonesia (Java and Sumatra)',
        'C) The Japanese archipelago',
        'D) The Mediterranean island of Crete',
      ],
      correctIndex: 1,
      successFact: 'Ancient Indian mariners used seasonal southwest monsoon trade winds to sail directly to Java and Sumatra, trading cotton and spices along Suvarnadvipa.',
    },
  },

  /* -------------------------------------------------------------------------
     SUIT III: PASCHIMA (The Western Trail — Amber Border)
     ------------------------------------------------------------------------- */
  {
    id: 'card-07',
    cardNumber: '07',
    name: 'Saurashtra Harbor',
    nameSa: 'सौराष्ट्र-पत्तनम् (Saurāṣṭra-Pattanam)',
    suit: 'paschima',
    suitName: 'Suit III: Paschima (The Western Trail)',
    suitColor: '#ea580c',
    staminaCost: 15,
    terrainType: 'ocean',
    hint: 'Coastal fortresses watch over shallow tidal bays where river water meets salt spray.',
    graphicDesc: 'Stone seawalls beside shimmering white flats.',
    frontImage: '/images/sugriva-cards/card-07-saurashtra-front.jpg',
    backImage: '/images/sugriva-cards/card-07-saurashtra-back.jpg',
    modernMatch: 'Gujarat Coast & Rann of Kutch',
    whyItChanged: 'Tectonic uplift and siltation turned ancient navigable sea bays into seasonal salt deserts.',
    satelliteTag: 'Gujarat Coast · Gulf of Kutch & Tidal Salt Marshes',
    mapNode: { x: 310, y: 320, label: 'Saurashtra Harbor' },
    challenge: {
      question: 'How did tectonic activity and silting change the ancient coastline of the Rann of Kutch in Gujarat?',
      options: [
        'A) It transformed an ancient navigable arm of the sea into an expansive seasonal salt marsh',
        'B) It created a permanent deep-water glacier fjord',
        'C) It sank the entire peninsula under 100 meters of water',
        'D) It caused volcanic lava to cover the entire coast',
      ],
      correctIndex: 0,
      successFact: 'During the Harappan and Vedic eras, the Rann was an open, navigable marine gulf where trading ships sailed to ports like Dholavira and Lothal before earthquakes uplifted the sea bed.',
    },
  },
  {
    id: 'card-08',
    cardNumber: '08',
    name: 'Sindhu Delta',
    nameSa: 'सिन्धु-मुख-सङ्गमः (Sindhu-Mukha-Saṅgamaḥ)',
    suit: 'paschima',
    suitName: 'Suit III: Paschima (The Western Trail)',
    suitColor: '#ea580c',
    staminaCost: 15,
    terrainType: 'river',
    hint: 'A mighty northern river fans out into the western ocean, guiding merchant sails.',
    graphicDesc: 'Wide turquoise estuary framed by desert dunes.',
    frontImage: '/images/sugriva-cards/card-08-sindhu-delta-front.jpg',
    backImage: '/images/sugriva-cards/card-08-sindhu-delta-back.jpg',
    modernMatch: 'Indus River Delta',
    whyItChanged: 'Shifting river channels and coastal sediment pushed the shoreline kilometers seaward.',
    satelliteTag: 'Indus River Delta · Arabian Sea Estuary',
    mapNode: { x: 220, y: 270, label: 'Sindhu Delta' },
    challenge: {
      question: 'Why did the mouths of the Indus River (Sindhu-sāgara-saṅgama) continually migrate over historical centuries?',
      options: [
        'A) Frequent tectonic quakes and massive alluvial sediment buildup continuously formed new delta branches',
        'B) The river froze every winter and carved new trenches',
        'C) Artificial dams built in prehistoric times redirected the flow',
        'D) Ocean currents pushed the river backward toward Tibet',
      ],
      correctIndex: 0,
      successFact: 'The Indus carries immense sediment loads from the Karakoram and Himalayas, causing its 17+ delta branches (creeks) to shift continually across centuries.',
    },
  },
  {
    id: 'card-09',
    cardNumber: '09',
    name: 'Astachala Ridge',
    nameSa: 'अस्ताचल-शैलः (Astācala-Śailaḥ)',
    suit: 'paschima',
    suitName: 'Suit III: Paschima (The Western Trail)',
    suitColor: '#ea580c',
    staminaCost: 25,
    terrainType: 'mountain',
    hint: 'At the edge of the western sea, jagged desert peaks swallow the setting sun.',
    graphicDesc: 'Crimson sun sinking behind dark coastal cliffs.',
    frontImage: '/images/sugriva-cards/card-09-astachala-front.jpg',
    backImage: '/images/sugriva-cards/card-09-astachala-back.jpg',
    modernMatch: 'Makran & Oman Coastal Ranges',
    whyItChanged: 'Ancient mariners named western peaks after the visual horizon where the sun appeared to set.',
    satelliteTag: 'Makran Coastal Range · Western Arabian Sea Horizon',
    mapNode: { x: 110, y: 260, label: 'Astachala Ridge' },
    challenge: {
      question: 'In ancient Indian spherical geodesy, what did "Astagiri / Astācala" signify astronomically?',
      options: [
        'A) The exact western horizon 90 degrees west of the Ujjayini Prime Meridian where the sun sets',
        'B) A crater formed by a fallen meteor',
        'C) An underground kingdom beneath the Earth',
        'D) A lunar observatory tower',
      ],
      correctIndex: 0,
      successFact: 'Ancient Indian astronomers paired Udayagiri in the far east with Astagiri in the far west to define the 180° diurnal horizon of solar traverse across Jambudvipa.',
    },
  },

  /* -------------------------------------------------------------------------
     SUIT IV: UTTARA (The Northern Trail — Sapphire Border)
     ------------------------------------------------------------------------- */
  {
    id: 'card-10',
    cardNumber: '10',
    name: 'Himavat Fortress',
    nameSa: 'हिमवत्-महादुर्गम् (Himavat-Mahādurgam)',
    suit: 'uttara',
    suitName: 'Suit IV: Uttara (The Northern Trail)',
    suitColor: '#0284c7',
    staminaCost: 25,
    terrainType: 'mountain',
    hint: 'White crystal spears pierce the clouds, guarding the birthplaces of sacred rivers.',
    graphicDesc: 'Towering snow peaks above glacial blue lakes.',
    frontImage: '/images/sugriva-cards/card-10-himavat-fortress-front.jpg',
    backImage: '/images/sugriva-cards/card-10-himavat-fortress-back.jpg',
    modernMatch: 'The Himalayas',
    whyItChanged: 'Tectonic collision continues lifting the range slowly while modern passes connect high valleys.',
    satelliteTag: 'Greater Himalayan Range · Continental Collision Zone',
    mapNode: { x: 450, y: 160, label: 'Himavat Fortress' },
    challenge: {
      question: 'What ongoing geological process created and continues to elevate the towering Himavat (Himalayan) mountain wall?',
      options: [
        'A) The ongoing northward collision of the Indian tectonic plate with the Eurasian plate',
        'B) Massive volcanic eruptions in the Indian Ocean',
        'C) Erosion caused by polar winds',
        'D) Coral reef accretion along an ancient coastline',
      ],
      correctIndex: 0,
      successFact: 'The Indian tectonic plate continues to push into Eurasia at roughly 5 cm per year, driving the steady uplift of Everest and the Himalayan massif.',
    },
  },
  {
    id: 'card-11',
    cardNumber: '11',
    name: 'Uttarakuru Steppe',
    nameSa: 'उत्तरकुरु-तृणभूमिः (Uttarakuru-Tṛṇabhūmiḥ)',
    suit: 'uttara',
    suitName: 'Suit IV: Uttara (The Northern Trail)',
    suitColor: '#0284c7',
    staminaCost: 20,
    terrainType: 'forest',
    hint: 'Beyond the snow wall stretch endless cold grasslands where nomads ride under wide skies.',
    graphicDesc: 'Wind-swept golden tundra with distant mountains.',
    frontImage: '/images/sugriva-cards/card-11-uttarakuru-steppe-front.jpg',
    backImage: '/images/sugriva-cards/card-11-uttarakuru-steppe-back.jpg',
    modernMatch: 'Tibetan Plateau & Siberian Steppe',
    whyItChanged: 'Ancient accounts relied on overland caravan stories; satellites now map every plateau basin.',
    satelliteTag: 'Tibetan High Plateau & Eurasian Steppe Corridors',
    mapNode: { x: 460, y: 95, label: 'Uttarakuru Steppe' },
    challenge: {
      question: 'Why was the realm of Uttarakuru described in ancient Indian epics as having vast grasslands and river Sailoda?',
      options: [
        'A) It was the high-altitude trans-Himalayan steppe and Tarim Basin traversed by ancient Silk Road merchants',
        'B) It was a tropical swamp on the equator',
        'C) It was an island in the Pacific Ocean',
        'D) It was a desert inside Australia',
      ],
      correctIndex: 0,
      successFact: 'Beyond the Himalayan rainshadow lies the high Tibetan plateau and the expansive Eurasian steppe, where ancient pastoral nomads grazed horses across open grasslands.',
    },
  },
  {
    id: 'card-12',
    cardNumber: '12',
    name: 'Somagiri Crown',
    nameSa: 'सोमगिरि-ध्रुवकिरीटम् (Somagiri-Dhruvakirīṭam)',
    suit: 'uttara',
    suitName: 'Suit IV: Uttara (The Northern Trail)',
    suitColor: '#0284c7',
    staminaCost: 30,
    terrainType: 'polar',
    hint: 'In a sunless frozen realm, a mountain glows with dancing green and violet sky-fire.',
    graphicDesc: 'Dark snowy ridge lit by glowing aurora ribbons.',
    frontImage: '/images/sugriva-cards/card-12-somagiri-crown-front.jpg',
    backImage: '/images/sugriva-cards/card-12-somagiri-crown-back.jpg',
    modernMatch: 'Arctic Circle (Aurora Borealis)',
    whyItChanged: 'Travelers saw polar nights and magnetic auroras firsthand without knowing Earth’s axial tilt.',
    satelliteTag: 'Arctic High Latitude · Geomagnetic Aurora Zone',
    mapNode: { x: 470, y: 35, label: 'Somagiri Crown' },
    challenge: {
      question: 'The dancing "sky-fire" (green and violet atmospheric light) described around Somagiri corresponds to what geophysical phenomenon?',
      options: [
        'A) Aurora Borealis (Northern Lights) caused by solar wind particles colliding with Earth’s upper magnetic atmosphere',
        'B) Lightning from undersea volcanoes',
        'C) Forest fires reflected in low clouds',
        'D) City spotlights from modern stadiums',
      ],
      correctIndex: 0,
      successFact: 'Earth\'s magnetic field channels charged solar particles into polar atmospheres, exciting oxygen and nitrogen atoms to produce glowing green and violet auroral curtains.',
    },
  },
];
