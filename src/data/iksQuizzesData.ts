export interface IksQuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export interface IksLabQuiz {
  labId: string;
  labTitle: string;
  unitTitle: string;
  discipline: string;
  points: number;
  questions: IksQuizQuestion[];
}

export const IKS_LAB_QUIZZES: Record<string, IksLabQuiz> = {
  patina: {
    labId: 'patina',
    labTitle: 'Delhi Iron Pillar Passivation Film',
    unitTitle: 'Unit 1: Metallurgy & Material Sciences (धातुशास्त्रम्)',
    discipline: 'Metallurgy & Surface Chemistry',
    points: 100,
    questions: [
      {
        id: 'patina-q1',
        prompt: 'What catalytic compound forms the protective passivating film preventing corrosion on the 1,600-year-old Delhi Iron Pillar?',
        options: [
          'Ordinary rust: Hydrated Iron(III) Oxide (Fe₂O₃·nH₂O)',
          'Delta ferric oxyhydroxide (δ-FeOOH misawite) with iron hydrogen phosphate',
          'Zinc Carbonate white rust barrier layer',
          'Lead Sulfide patina film',
        ],
        correctIdx: 1,
        explanation: 'High phosphorus (~0.25%) retained from wood-charcoal bloomery smelting acts catalytically to convert initial oxidation into crystalline δ-FeOOH (misawite), creating an airtight 100-micron passive barrier.',
      },
      {
        id: 'patina-q2',
        prompt: 'Which foundational branch of the Indian Knowledge System (IKS) documented metal classification, smelting, and corrosion passivations?',
        options: [
          'Dhātu-Śāstra & Rasaśāstra (e.g. Rasaratna Samuccaya and Rasaratnākara)',
          'Sāṅkhya Cosmology',
          'Nyāya Epistemological Syllogisms',
          'Nāṭyaśāstra Dramaturgy',
        ],
        correctIdx: 0,
        explanation: 'Dhātu-Śāstra (Science of Metals) and Rasaśāstra systematically classified metals into Śuddha (pure), Upadhātu (sub-metals), and Miśra (alloys), and detailed solid-state reduction techniques.',
      },
      {
        id: 'patina-q3',
        prompt: 'Why did traditional Indian solid-state bloomery furnaces resist rust better than modern blast-furnace wrought iron?',
        options: [
          'Bloomery furnaces used no limestone flux, retaining phosphorus in the iron rather than removing it into slag',
          'Indian furnaces were heated with electricity rather than wood',
          'Bloomeries melted 50% gold into every batch of iron',
          'Ancient iron ore contained no iron atoms',
        ],
        correctIdx: 0,
        explanation: 'Modern blast furnaces add limestone flux which extracts phosphorus into slag. Indigenous furnaces left phosphorus in the iron matrix, which is essential to catalytically precipitate protective misawite.',
      },
    ],
  },

  wootz: {
    labId: 'wootz',
    labTitle: 'Wootz Crucible Steel (Ukku)',
    unitTitle: 'Unit 1: Metallurgy & Material Sciences (धातुशास्त्रम्)',
    discipline: 'High-Carbon Metallurgy & Crucible Engineering',
    points: 100,
    questions: [
      {
        id: 'wootz-q1',
        prompt: 'How was ancient Indian Wootz steel (Ukku) manufactured in South Indian centres like Kodumanal and Konasamudram?',
        options: [
          'Smelting wrought iron with carbonaceous plant matter in sealed refractory clay crucibles (Mūṣā) above 1,200°C',
          'Cold-hammering meteorite chunks with bronze hammers at room temperature',
          'Dipping hot iron bars into saltwater tanks',
          'Mixing molten copper directly with river sand',
        ],
        correctIdx: 0,
        explanation: 'Wrought iron was sealed inside refractory clay crucibles (Mūṣā) with wood chips and charred rice husks, achieving 1.0–1.6% hyper-eutectoid carbon diffusion without burning off the carbon.',
      },
      {
        id: 'wootz-q2',
        prompt: 'What caused the distinctive watery Damascus pattern (jauhar) on forged Wootz blades?',
        options: [
          'Surface etching with acid paint after polishing',
          'Microscopic bands of ductile cementite (Fe₃C) spheroids and carbon nanotube alignment formed during thermo-mechanical cycling',
          'Random rust pitting caused by desert humidity',
          'Electroplating gold wire onto the outer blade edge',
        ],
        correctIdx: 1,
        explanation: 'Repeated careful forging at controlled temperatures aligned cementite precipitates and trace micro-alloying elements (vanadium, titanium) into visible macroscopic crystalline wave bands (jauhar).',
      },
      {
        id: 'wootz-q3',
        prompt: 'Which official in Kautilya’s Arthaśāstra (c. 4th century BCE) was responsible for mineral prospecting, smelting, and state resource management?',
        options: [
          'Ākarādhyakṣa (Superintendent of Mines)',
          'Samāhartā (Chief Revenue Collector)',
          'Sannidhātā (Royal Treasurer)',
          'Senāpati (Commander of Army)',
        ],
        correctIdx: 0,
        explanation: 'The Ākarādhyakṣa surveyed mineral veins, directed metallurgical smelting furnaces, evaluated ore quality, and oversaw royal coin minting and metallurgy guilds.',
      },
    ],
  },

  stepwell: {
    labId: 'stepwell',
    labTitle: 'Rani ki Vav Stepwell Hydraulics',
    unitTitle: 'Unit 1: Metallurgy & Material Sciences (धातुशास्त्रम्)',
    discipline: 'Hydrogeological Engineering & Passive Cooling',
    points: 100,
    questions: [
      {
        id: 'stepwell-q1',
        prompt: 'How did the 7-tier subterranean architecture of Rani ki Vav create a natural passive microclimate?',
        options: [
          'Earth contact thermal inertia and water evaporation lowered temperatures from 42°C on the surface to 24°C underground',
          'Air was pumped underground using mechanical water wheels',
          'Underground ice was transported from the Himalayas daily',
          'Reflective mirrors deflected all sunlight into space',
        ],
        correctIdx: 0,
        explanation: 'Descending 7 levels utilizes subterranean ground thermal inertia and evaporative cooling, creating a microclimate 15–18°C cooler than the scorching surface air.',
      },
      {
        id: 'stepwell-q2',
        prompt: 'What was the hydraulic engineering advantage of inverted stepped pavilions during monsoon water table fluctuations?',
        options: [
          'Stepped tiers provided safe, continuous human access across varying seasonal water heights while filtering silt through sand strata',
          'Tiers prevented any water from entering the well',
          'Steps forced all groundwater to evaporate into vapor',
          'Tiers were purely ceremonial with no hydraulic function',
        ],
        correctIdx: 0,
        explanation: 'The stepped architecture accommodated dramatic seasonal water table shifts between monsoon floods and summer droughts while naturally settling suspended sediment.',
      },
      {
        id: 'stepwell-q3',
        prompt: 'What traditional water-impermeable lime mortar compound (Vajralepa) was codified in classical architectural treatises (Śilpa Śāstras)?',
        options: [
          'Hydraulic slaked lime blended with plant mucilages (bilva, jaggery, guggulu, and karanj oil) forming insoluble calcite crystals',
          'Petroleum-based synthetic epoxy resin',
          'Unfired river silt mixed with cow dung',
          'Melted lead poured between stone joints',
        ],
        correctIdx: 0,
        explanation: 'Vajralepa (diamond plaster) combined hydraulic lime with organic polysaccharides from fruits and herbs, crystallizing into insoluble calcium carbonate complexes that withstand centuries of hydrostatic pressure.',
      },
    ],
  },

  konark: {
    labId: 'konark',
    labTitle: 'Konark Sun Temple Chariot Wheel',
    unitTitle: 'Unit 2: Astronomy & Solar Timekeeping (सौर-कालज्ञानम्)',
    discipline: 'Solar Shadow Horology & Coordinate Astronomy',
    points: 100,
    questions: [
      {
        id: 'konark-q1',
        prompt: 'How do the 24 spokes of the Konark Sun Temple chariot wheel reckon time throughout the day?',
        options: [
          '8 Major Spokes divide the day into 8 Praharas (3 hours each); 8 Minor Spokes mark 1.5-hour intervals, with rim beads measuring sub-ghaṭikā time',
          'Each spoke represents 1 second on a mechanical escapement',
          'The 24 spokes represent 24 lunar months in a cycle',
          'The spokes are stationary decorations with no timekeeping purpose',
        ],
        correctIdx: 0,
        explanation: 'A full day is 8 Praharas of 3 hours (7.5 Ghaṭikās) each. Shadows cast by the central hub gnomon across the carved spoke markers indicate time within minutes.',
      },
      {
        id: 'konark-q2',
        prompt: 'In classical Indian horology (Sūrya Siddhānta), what is the basic unit of astronomical time equal to 24 modern minutes?',
        options: [
          '1 Ghaṭikā (or Nāḍikā), 60 of which comprise one full 24-hour solar day',
          '1 Muhūrta (which equals 48 minutes)',
          '1 Pala (which equals 24 seconds)',
          '1 Yuga (an epoch of millennia)',
        ],
        correctIdx: 0,
        explanation: 'A solar day consists of 60 Ghaṭikās (24 hours × 60 ÷ 60 = 24 minutes per Ghaṭikā). Each Ghaṭikā is further divided into 60 Palas (24 seconds).',
      },
      {
        id: 'konark-q3',
        prompt: 'What acts as the shadow-casting gnomon (Śaṅku) on the Konark stone wheel?',
        options: [
          'The central carved axle hub of the wheel',
          'The stone chariot driver figure',
          'A moveable copper needle placed on top',
          'The temple roof shikhara peak',
        ],
        correctIdx: 0,
        explanation: 'The protruding cylindrical stone axle hub acts as an authentic fixed solar gnomon, casting its shadow across the spokes calibrated to the Sun’s seasonal altitude.',
      },
    ],
  },

  'cosmic-alignment': {
    labId: 'cosmic-alignment',
    labTitle: 'Cosmic Alignment & Pañcāṅga Lab',
    unitTitle: 'Unit 2: Astronomy & Solar Timekeeping (सौर-कालज्ञानम्)',
    discipline: 'Celestial Coordinate Mechanics & Ephemerides',
    points: 100,
    questions: [
      {
        id: 'cosmic-q1',
        prompt: 'In the Pañcāṅga celestial coordinate system, how is the 360° sidereal ecliptic divided into the 27 Nakṣatras?',
        options: [
          'Exactly 13° 20′ arc of celestial longitude per Nakṣatra (360° ÷ 27)',
          '30° arc per Nakṣatra (12 divisions)',
          '10° arc per Nakṣatra',
          '45° arc per Nakṣatra',
        ],
        correctIdx: 0,
        explanation: '360° ÷ 27 = 13° 20′ per Nakṣatra. Each Nakṣatra is further divided into 4 Padas of 3° 20′ each, linking the 27 Nakṣatras seamlessly to the 12 Rāśis (30° each).',
      },
      {
        id: 'cosmic-q2',
        prompt: 'What defines a lunar day (Tithi) in Indian mathematical astronomy?',
        options: [
          'A 12° angular longitudinal separation between the Moon and the Sun',
          'Exactly 24 solar clock hours from midnight to midnight',
          'The duration of full darkness during a new moon',
          'The time it takes the Earth to rotate once relative to Mars',
        ],
        correctIdx: 0,
        explanation: 'A Tithi is the time needed for the Moon’s longitude to outpace the Sun’s by 12° (360° ÷ 30 Tithis). Due to variable orbital velocities, Tithis range from 19 to 26 hours.',
      },
      {
        id: 'cosmic-q3',
        prompt: 'What is Ayana-Calana in classical Indian astronomy (Aryabhata and Varāhamihira)?',
        options: [
          'The precession of the equinoxes (~25,772-year cycle of the Earth’s axis)',
          'The diurnal rotation of the Earth on its axis',
          'A total solar eclipse recurrence',
          'The seasonal tidal cycle caused by the Moon',
        ],
        correctIdx: 0,
        explanation: 'Ayana-Calana measures the slow conical precession of the equinoxes, which Indian astronomers calculated to track the difference between Sāyana (tropical) and Nirayana (sidereal) coordinates.',
      },
    ],
  },

  cipher: {
    labId: 'cipher',
    labTitle: 'Kaṭapayādi Alphanumeric Cipher',
    unitTitle: 'Unit 3: Mathematics & Cryptography (गणित-कूटलेखनम्)',
    discipline: 'Mathematical Linguistics, Cryptography & Prosody',
    points: 100,
    questions: [
      {
        id: 'cipher-q1',
        prompt: 'How does the Kaṭapayādi cipher rule "Aṅkānāṁ vāmato gatiḥ" govern numerical decoding from poetic meter?',
        options: [
          'Consonants map to digits 0–9, and the extracted digits must be read from Right-to-Left (reverse order)',
          'Numbers are read strictly left-to-right as written',
          'Vowels represent prime numbers, while consonants are ignored',
          'Every third letter is multiplied by ten',
        ],
        correctIdx: 0,
        explanation: '"Aṅkānāṁ vāmato gatiḥ" means "Numbers proceed to the left". The first syllable provides the units place, the second the tens place, and so forth.',
      },
      {
        id: 'cipher-q2',
        prompt: 'Which mathematical constant did Mādhava of Saṅgamagrāma encode to 31 decimal places in a single Sanskrit shloka?',
        options: [
          'Pi (π) ratio of circumference to diameter',
          'Euler’s number (e)',
          'The Golden Ratio (φ)',
          'Avogadro’s constant',
        ],
        correctIdx: 0,
        explanation: 'Mādhava’s verse "Gopi-bhagya-madhuvrata..." encodes π ÷ 10 to 31 decimal places without a single error, demonstrating advanced series expansions in 14th-century Kerala.',
      },
      {
        id: 'cipher-q3',
        prompt: 'Which Indian mathematician codified the binary number system and Pascal’s Triangle (Meru Prastāra) in his Chandaḥśāstra (c. 300 BCE)?',
        options: [
          'Ācārya Piṅgala',
          'Gottfried Leibniz',
          'Blaise Pascal',
          'Leonardo Fibonacci',
        ],
        correctIdx: 0,
        explanation: 'Piṅgala invented binary representation (Laghu = 0, Guru = 1), combinatorial binomial coefficients (Meru Prastāra), and geometric progression centuries before European rediscovery.',
      },
    ],
  },

  biodome: {
    labId: 'biodome',
    labTitle: 'Prakṛti Closed-Loop Bio-Dome',
    unitTitle: 'Unit 4: Ecology, Soil & Agricultural Meteorology (प्रकृति व कृषि)',
    discipline: 'Trophic Ecology & Closed-Loop Biosphere Systems',
    points: 100,
    questions: [
      {
        id: 'biodome-q1',
        prompt: 'In a sealed closed-loop bio-dome, what balances daytime plant oxygen production with night-time consumption?',
        options: [
          'Plant photosynthesis consumes CO₂ and releases O₂ by day; night-time plant respiration and soil microflora consume O₂ and return CO₂',
          'Oxygen is permanently lost and must be artificially injected weekly',
          'Carbon dioxide dissolves into soil and turns into solid lead',
          'Plants only respire when water is completely removed',
        ],
        correctIdx: 0,
        explanation: 'A balanced closed terrarium achieves chemical equilibrium between photosynthetic O₂ release and microbial/cellular respiration, demonstrating self-sustaining feedback loops.',
      },
      {
        id: 'biodome-q2',
        prompt: 'In Vedic ecological philosophy (Taittirīya Upaniṣad), what dynamic balance maintains the biosphere?',
        options: [
          'Equilibrium across the Pañca Mahābhūtas (Earth, Water, Fire/Energy, Air, Space) recycling matter without waste',
          'Human domination eliminating all predators',
          'Converting all natural forests into concrete',
          'Keeping ecosystems completely isolated from solar energy',
        ],
        correctIdx: 0,
        explanation: 'Vedic ecology views the biosphere as an interconnected cycle of the five elements, where every trophic output serves as an input for another organism.',
      },
      {
        id: 'biodome-q3',
        prompt: 'What Sanskrit term represents the cosmic physical order and ecological balance governing nature’s laws?',
        options: [
          'Ṛta (ऋत)',
          'Māyā',
          'Ahaṅkāra',
          'Tamas',
        ],
        correctIdx: 0,
        explanation: 'Ṛta is the fundamental principle of natural and cosmic harmony that ensures cyclic regularity in seasons, hydrology, and biological life.',
      },
    ],
  },

  govardhan: {
    labId: 'govardhan',
    labTitle: 'Govardhan Soil Ecology Lab',
    unitTitle: 'Unit 4: Ecology, Soil & Agricultural Meteorology (प्रकृति व कृषि)',
    discipline: 'Pedology, Soil Horizons & Rhizosphere Microbiology',
    points: 100,
    questions: [
      {
        id: 'govardhan-q1',
        prompt: 'How do traditional Indian microbial fermentations like Jīvāmṛta and Pañcagavya restore degraded agricultural soil?',
        options: [
          'They introduce billions of indigenous beneficial aerobic microbes, mycorrhizae, and actinomycetes that solubilize nutrients',
          'They sterilize the soil by killing all microscopic organisms',
          'They convert sand into volcanic basalt rock',
          'They replace biological carbon with synthetic petrochemicals',
        ],
        correctIdx: 0,
        explanation: 'Fermented cow-dung and botanical preparations provide inoculants of beneficial microflora that mobilize bound phosphorus and fix atmospheric nitrogen in the root zone.',
      },
      {
        id: 'govardhan-q2',
        prompt: 'What symbiotic role do mycorrhizal fungal hyphae play in the rhizosphere soil horizon?',
        options: [
          'They extend the root absorption surface area by up to 1,000% to transport water and trace minerals in exchange for plant carbon',
          'They rot the root systems of healthy crops',
          'They turn topsoil into acidic stone',
          'They seal the soil surface to block rainfall infiltration',
        ],
        correctIdx: 0,
        explanation: 'Mycorrhizae form an underground mycorrhizal network, exuding glomalin to glue soil crumbs together and channel water during prolonged drought.',
      },
      {
        id: 'govardhan-q3',
        prompt: 'In classical agricultural texts like Kṛṣi-Saṅgraha, what defines fertile soil (Urvarā)?',
        options: [
          'Crumb aggregate texture, rapid percolation, high humus content, and earthworm activity',
          'White bleaching from salt encrustation',
          'Cement-like hardness that prevents root entry',
          'Smelling of sulfur and petroleum',
        ],
        correctIdx: 0,
        explanation: 'Classical texts empirically classified soils by water absorption capacity, color, and biological vitality into Urvarā (fertile), Ūṣara (saline/alkaline), and Maru (desert).',
      },
    ],
  },

  krishi: {
    labId: 'krishi',
    labTitle: 'Kṛṣi-Parāśara Agricultural Science',
    unitTitle: 'Unit 4: Ecology, Soil & Agricultural Meteorology (प्रकृति व कृषि)',
    discipline: 'Indigenous Agro-Meteorology & Rain Hydrology',
    points: 100,
    questions: [
      {
        id: 'krishi-q1',
        prompt: 'What standardized rainfall measurement cylinder did Sage Parāśara specify in Kṛṣi-Parāśara?',
        options: [
          'The Droṇa-Māna (a cylindrical vessel 1 cubit wide and 1 cubit deep)',
          'A mercury barometer with glass column',
          'An open wooden bucket without calibration',
          'A sundial shadow plate',
        ],
        correctIdx: 0,
        explanation: 'The Droṇa-Māna allowed ancient farmers to quantify seasonal precipitation in cubic units (Droṇas) and correlate rainfall volume with optimal crop yields.',
      },
      {
        id: 'krishi-q2',
        prompt: 'Which 4 types of rain-bearing cloud formations are categorized in classical Indian cloud science (Megha-Vijñāna)?',
        options: [
          'Āvarta (whirling), Saṁvarta (heavy deluge), Puṣkara (light drizzle), and Droṇa (crop-nourishing rain)',
          'Cirrus, Stratus, Cumulus, and Nimbus',
          'Agni, Vāyu, Jala, and Pṛthvī',
          'Śveta, Pīta, Nīla, and Rakta',
        ],
        correctIdx: 0,
        explanation: 'Parāśara classified clouds by dynamic thermodynamic characteristics: Droṇa clouds were considered ideal for sustainable agricultural saturation.',
      },
      {
        id: 'krishi-q3',
        prompt: 'How did traditional ethno-meteorology forecast incoming monsoons days before rainfall began?',
        options: [
          'By observing phenological indicators like ant egg-carrying migrations, cattle sniffing upward, and Cassia fistula tree blossoms',
          'By consulting political decrees in the royal court',
          'By ignoring environmental signals completely',
          'By measuring the temperature of deep sea trenches',
        ],
        correctIdx: 0,
        explanation: 'Indigenous farmers tracked sensitive biological barometers—insects moving larvae to higher ground and birds bathing in dust indicate imminent atmospheric pressure drops.',
      },
    ],
  },

  'food-sovereignty': {
    labId: 'food-sovereignty',
    labTitle: 'Anna-Svarāj Heirloom Seed Conservation',
    unitTitle: 'Unit 4: Ecology, Soil & Agricultural Meteorology (प्रकृति व कृषि)',
    discipline: 'Agro-Biodiversity, Germplasm Banks & Seed Ecology',
    points: 100,
    questions: [
      {
        id: 'food-q1',
        prompt: 'How did traditional Indian clay grain storage structures (Koṭhāra) protect seeds from insect damage without chemical pesticides?',
        options: [
          'Breathable terracotta clay walls lined with neem leaf paste, dry wood ash, and turmeric to deter weevils and control moisture below 12%',
          'Plastic bags sealed with synthetic neurotoxin sprays',
          'Dumping grain into stagnant damp pits',
          'Boiling all seeds before storage',
        ],
        correctIdx: 0,
        explanation: 'Neem azadirachtin acts as a natural antifeedant, while dry wood ash desiccant and breathable clay maintain optimal grain moisture below 12% for multi-year seed viability.',
      },
      {
        id: 'food-q2',
        prompt: 'What unique environmental adaptation is preserved in indigenous Indian rice landraces like Pokkali and Navara?',
        options: [
          'High tolerance to coastal seawater inundation and specific therapeutic nutritional profiles',
          'They only grow when sprayed with chemical nitrogen weekly',
          'They produce sterile seeds that cannot be replanted',
          'They cannot survive in soil and require hydroponic tanks',
        ],
        correctIdx: 0,
        explanation: 'Pokkali rice (Kerala) thrives in saline tidal wetlands, while Navara is an ancient medicinal rice landrace rich in antioxidants and iron.',
      },
      {
        id: 'food-q3',
        prompt: 'Why is open-pollinated heirloom seed conservation (Bīja Bhaṇḍāra) vital for climate-resilient agriculture?',
        options: [
          'High genetic diversity enables crops to adapt to evolving droughts, floods, and pests without commercial patent dependency',
          'Heirloom seeds create uniform clones that never vary',
          'Open-pollinated seeds require farmers to buy new seeds every single year',
          'Hybrid seeds have zero risk of disease',
        ],
        correctIdx: 0,
        explanation: 'Heirloom landraces contain broad genetic heterozygosity, ensuring that local crops withstand unpredictable climate shocks and preserve sovereignty.',
      },
    ],
  },

  uddalaka: {
    labId: 'uddalaka',
    labTitle: 'Sage Uddālaka Empirical Mind Lab',
    unitTitle: 'Unit 5: Medicine & Cognitive Epistemology (आयुर्वेद व मन)',
    discipline: 'Cognitive Science, Empirical Epistemology & Neurobiology',
    points: 100,
    questions: [
      {
        id: 'uddalaka-q1',
        prompt: 'What titration experiment did Sage Uddālaka command his son Śvetaketu to perform in the Chāndogya Upaniṣad?',
        options: [
          'Dissolve salt in water overnight and taste from the top, middle, and bottom to prove an invisible substance is uniformly present throughout',
          'Burn copper wire in a flame to observe green light',
          'Measure the speed of sound with an echo off a mountain',
          'Count the seeds in twenty different apples',
        ],
        correctIdx: 0,
        explanation: 'Uddālaka proved that what is invisible to the eyes can be verified empirically through taste—demonstrating atomic distribution and omnipresent subtle reality.',
      },
      {
        id: 'uddalaka-q2',
        prompt: 'How did Uddālaka demonstrate that memory and cognitive functions depend on physical metabolic nutrition?',
        options: [
          'A 15-day water-only fast that caused Śvetaketu to lose his memory of the Vedas until nourishment was restored',
          'Hypnotizing Śvetaketu in front of his classmates',
          'Measuring brainwave frequencies with electrodes',
          'Asking Śvetaketu to meditate without sleeping for 10 days',
        ],
        correctIdx: 0,
        explanation: 'Uddālaka established that "Mind is formed of food; life is formed of water." Fasting caused temporary cognitive amnesia, which reversed upon eating rice porridge.',
      },
      {
        id: 'uddalaka-q3',
        prompt: 'What did the micro-dissection of a tiny banyan fruit demonstrate to Śvetaketu?',
        options: [
          'From an imperceptible micro-seed containing no visible form arises a massive macroscopic banyan tree (Aṇor aṇīyān mahato mahīyān)',
          'That banyan trees contain metallic iron fibers',
          'That fruits do not produce trees',
          'That trees grow entirely from ambient sunlight without seeds',
        ],
        correctIdx: 0,
        explanation: 'Splitting the microscopic seed revealed invisible subtle potential, illustrating how macroscopic reality unfolds from micro-scale foundational laws.',
      },
    ],
  },

  susruta: {
    labId: 'susruta',
    labTitle: 'Suśruta Biomimetic Surgical Tools',
    unitTitle: 'Unit 5: Medicine & Surgery (शल्यशास्त्रम्)',
    discipline: 'Biomimetic Surgical Instrumentation & Reconstructive Surgery',
    points: 100,
    questions: [
      {
        id: 'susruta-q1',
        prompt: 'How did Maharṣi Suśruta (c. 600 BCE) design his 101+ blunt surgical instruments (Yantras)?',
        options: [
          'Biomimicry: modeled after the jaws, beaks, and anatomy of animals (e.g. Siṁhamukha lion forceps, Kaṅkamukha heron forceps)',
          'Copied from stone tools used in the Stone Age',
          'Randomly shaped iron rods without specialization',
          'Using automated robotic forging machines',
        ],
        correctIdx: 0,
        explanation: 'Suśruta observed animal predatory grips in nature to design surgical forceps that grasp foreign bodies, extract splinters, and retract living tissue safely.',
      },
      {
        id: 'susruta-q2',
        prompt: 'Which pioneering surgical procedure is codified in the Suśruta Saṁhitā that laid the historical foundation for modern plastic surgery?',
        options: [
          'Pedicled forehead and cheek skin flap rhinoplasty (nasal reconstruction)',
          'Open heart valve replacement surgery',
          'Cochlear electronic implant placement',
          'Laser corneal surface shaving',
        ],
        correctIdx: 0,
        explanation: 'Suśruta pioneered vascularized pedicled flap transposition to reconstruct amputated noses, which British surgeons in Pune (1793) learned and published in London as the "Indian Method".',
      },
      {
        id: 'susruta-q3',
        prompt: 'On what physical objects did ancient Indian surgical students practice incisions, suturing, and cyst excision (Yogya)?',
        options: [
          'Watermelons and cucumbers for incisions; lotus stalks for vein probing; animal bladders and hides for suturing',
          'Real patients directly without any training',
          'Only reading handwritten texts without ever touching tools',
          'Clay statues that could not bleed',
        ],
        correctIdx: 0,
        explanation: 'Suśruta mandated systematic simulation training (Yogya): students perfected puncturing on lotus stems and deep suturing on taut leather before touching a human patient.',
      },
    ],
  },

  'iks-workbook': {
    labId: 'iks-workbook',
    labTitle: 'Class 7 IKS Experiential Science Workbook',
    unitTitle: 'Unit 6: Capstone Field Journal & Assessment (पुस्तिका व प्रश्नोत्तरी)',
    discipline: 'Hands-On STEM Field Journal & National Curriculum Rubrics',
    points: 100,
    questions: [
      {
        id: 'wbk-q1',
        prompt: 'What is the classical 4-step scientific method rubric (Pramāṇa) used in the IKS Experiential Science Workbook?',
        options: [
          'Observation (Nirīkṣaṇam) → Hypothesis (Parikalpanā) → Empirical Test (Pratyakṣa-Prayoga) → Principle (Siddhānta)',
          'Speculation → Dogma → Repetition → Memorization',
          'Reading → Copying → Submitting → Grading',
          'Accepting conclusions without any physical testing',
        ],
        correctIdx: 0,
        explanation: 'The Indian epistemological framework combines direct sensory observation (Pratyakṣa) and logical inference (Anumāna) with repeatable experimental validation.',
      },
      {
        id: 'wbk-q2',
        prompt: 'Which CBSE Class 7 NCERT Science chapter directly connects with the Delhi Iron Pillar and Wootz Steel labs?',
        options: [
          'Chapter 6: Physical and Chemical Changes (Corrosion, Rusting & Galvanization)',
          'Chapter 1: Nutrition in Plants',
          'Chapter 14: Electric Currents and its Effects',
          'Chapter 18: Wastewater Story',
        ],
        correctIdx: 0,
        explanation: 'The Delhi Iron Pillar and Wootz crucible steel directly illustrate the chemical mechanisms of corrosion, protective passivating films, and high-carbon alloy formation.',
      },
      {
        id: 'wbk-q3',
        prompt: 'How do the workbook’s kitchen science experiments demonstrate scientific inquiry?',
        options: [
          'They transform common household items (turmeric, lemon, salt) into quantitative pH indicators, colloidal states, and titrations safely at home',
          'They are merely food recipes for snacks',
          'They require hazardous industrial centrifuges',
          'They cannot be completed without advanced electronic sensors',
        ],
        correctIdx: 0,
        explanation: 'Using accessible domestic natural materials empowers middle-school learners to hypothesize, test, and graph empirical scientific phenomena independently.',
      },
    ],
  },

  'wonders-quiz': {
    labId: 'wonders-quiz',
    labTitle: 'Wonders of Indian Science Quiz',
    unitTitle: 'Unit 6: Capstone Field Journal & Assessment (पुस्तिका व प्रश्नोत्तरी)',
    discipline: 'Formative Assessment Across 5 Indian Scientific Disciplines',
    points: 100,
    questions: [
      {
        id: 'wonders-q1',
        prompt: 'What landmark metallurgical breakthrough was developed at Zawar, Rajasthan around the 12th century CE?',
        options: [
          'Downward distillation of metallic Zinc in specialized clay retorts (Koṣṭhī) to capture vapor before oxidation',
          'Invention of synthetic plastic polymers',
          'Electrolytic aluminum reduction using steam turbines',
          'Liquid nitrogen cooling of copper wire',
        ],
        correctIdx: 0,
        explanation: 'Zinc boils at 907°C, which is lower than the reduction temperature of zinc oxide. Indian metallurgists condensed zinc downward into cooled chambers, operating the world’s first industrial zinc smelter.',
      },
      {
        id: 'wonders-q2',
        prompt: 'What was the scientific purpose of the Śodhana (purification) and Māraṇa (incineration) processes in Rasaśāstra?',
        options: [
          'Transforming toxic heavy metals into micro-fine, bio-available non-toxic therapeutic nanoparticles (Bhasmas)',
          'Making gold bars heavier for market export',
          'Disposing of waste metal into river beds',
          'Creating poison for hunting weapons',
        ],
        correctIdx: 0,
        explanation: 'Rasaratna Samuccaya codified repeated calcination cycles with organic juices to reduce raw metals into non-toxic, cellularly assimilable nano-scale organo-metallic ash.',
      },
      {
        id: 'wonders-q3',
        prompt: 'How does classical Rasaśāstra systematically classify metals (Dhātus)?',
        options: [
          'Śuddha Dhātu (Pure: Gold, Silver, Copper, Iron), Upadhātu (Sub-metals: Zinc, Tin, Lead), and Miśra Dhātu (Alloys: Brass, Bronze, Vartaloha)',
          'Metals that sink vs metals that float',
          'Hot metals vs cold metals only',
          'By their price in ancient coins only',
        ],
        correctIdx: 0,
        explanation: 'Texts like Rasaratna Samuccaya categorized metals rigorously based on elemental purity, chemical reactivity, and alloying characteristics.',
      },
    ],
  },
};
