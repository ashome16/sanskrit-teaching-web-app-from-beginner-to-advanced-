/**
 * Comprehensive Dataset for Sanskrit Match-the-Following & Word Maze Games
 * Covers:
 * 1. How to Address (सम्बोधनम्)
 * 2. Action Words (क्रियापदानि)
 * 3. Relationships (सम्बन्धाः)
 * 4. How to say Time & Date (समयः एवं तिथिः)
 * 5. Exam Words & Sentences (परीक्षा-शब्दाः)
 * 6. Fruits & Vegetables (फलानि एवं शाकानि)
 * 7. Insects (कीटाः)
 * 8. Vāstu (वास्तुशास्त्रम्)
 * 9. Āyurveda (आयुर्वेदः)
 * 10. Household Items (गृह-वस्तूनि)
 * 11. Vehicles (वाहनानि)
 * 12. Occupations (व्यवसायाः)
 * 13. Past, Present, Future (त्रिकाल-क्रियाः)
 * 14. Strīliṅga, Puṁliṅga, Napuṁsakaliṅga (लिङ्ग-भेदः)
 */

export interface MatchPairItem {
  id: string;
  sanskrit: string;
  english: string;
  transliteration?: string;
  hint?: string;
  category?: string;
  subCategory?: string;
  emoji?: string;
}

export interface MatchCategoryMetadata {
  id: string;
  titleDev: string;
  titleEn: string;
  icon: string;
  description: string;
  pairs: MatchPairItem[];
}

export const MATCH_CATEGORIES: MatchCategoryMetadata[] = [
  // 1. How to Address (सम्बोधनम् एवं शिष्टाचारः)
  {
    id: 'addressing',
    titleDev: 'सम्बोधनम् एवं शिष्टाचारः',
    titleEn: 'How to Address & Polite Greetings',
    icon: '🙏',
    description: 'Learn respectful address words, everyday greetings, and polite social forms.',
    pairs: [
      { id: 'addr_1', sanskrit: 'नमस्ते', english: 'Salutations / Hello', transliteration: 'namaste', emoji: '🙏' },
      { id: 'addr_2', sanskrit: 'भवान्', english: 'You (Respectful - Masculine)', transliteration: 'bhavān', emoji: '👨' },
      { id: 'addr_3', sanskrit: 'भवती', english: 'You (Respectful - Feminine)', transliteration: 'bhavatī', emoji: '👩' },
      { id: 'addr_4', sanskrit: 'सुप्रभातम्', english: 'Good morning', transliteration: 'suprabhātam', emoji: '🌅' },
      { id: 'addr_5', sanskrit: 'शुभरात्रिः', english: 'Good night', transliteration: 'śubharātriḥ', emoji: '🌙' },
      { id: 'addr_6', sanskrit: 'महोदयः', english: 'Respected Sir / Mister', transliteration: 'mahōdayaḥ', emoji: '👔' },
      { id: 'addr_7', sanskrit: 'महोदया', english: 'Respected Madam', transliteration: 'mahōdayā', emoji: '👗' },
      { id: 'addr_8', sanskrit: 'धन्यवादः', english: 'Thank you / Gratitude', transliteration: 'dhanyavādaḥ', emoji: '💐' },
      { id: 'addr_9', sanskrit: 'क्षम्यताम्', english: 'Please excuse me / Pardon', transliteration: 'kṣamyatām', emoji: '🙇' },
      { id: 'addr_10', sanskrit: 'कृपया', english: 'Please / Kindly', transliteration: 'kṛpayā', emoji: '✨' },
      { id: 'addr_11', sanskrit: 'पुनर्मिलामः', english: 'Until we meet again / Goodbye', transliteration: 'punarmilāmaḥ', emoji: '🤝' },
      { id: 'addr_12', sanskrit: 'स्वागतम्', english: 'Welcome', transliteration: 'svāgatam', emoji: '🚪' },
    ],
  },

  // 2. Action Words (क्रियापदानि / Verbs)
  {
    id: 'actions',
    titleDev: 'क्रियापदानि (धातु-रूपाणि)',
    titleEn: 'Action Words & Essential Verbs',
    icon: '⚡',
    description: 'Common verbs of everyday movement, communication, perception, and life.',
    pairs: [
      { id: 'act_1', sanskrit: 'पठति', english: 'Reads / Studies', transliteration: 'paṭhati', emoji: '📖' },
      { id: 'act_2', sanskrit: 'लिखति', english: 'Writes', transliteration: 'likhati', emoji: '✍️' },
      { id: 'act_3', sanskrit: 'खादति', english: 'Eats', transliteration: 'khādati', emoji: '🍎' },
      { id: 'act_4', sanskrit: 'पिबति', english: 'Drinks', transliteration: 'pibati', emoji: '💧' },
      { id: 'act_5', sanskrit: 'गच्छति', english: 'Goes / Walks', transliteration: 'gacchati', emoji: '🚶' },
      { id: 'act_6', sanskrit: 'आगच्छति', english: 'Comes / Arrives', transliteration: 'āgacchati', emoji: '🏃' },
      { id: 'act_7', sanskrit: 'तिष्ठति', english: 'Stands / Remains', transliteration: 'tiṣṭhati', emoji: '🧍' },
      { id: 'act_8', sanskrit: 'उपविशति', english: 'Sits down', transliteration: 'upaviśati', emoji: '🪑' },
      { id: 'act_9', sanskrit: 'पश्यति', english: 'Sees / Watches', transliteration: 'paśyati', emoji: '👁️' },
      { id: 'act_10', sanskrit: 'शृणोति', english: 'Listens / Hears', transliteration: 'śṛṇōti', emoji: '👂' },
      { id: 'act_11', sanskrit: 'वदति', english: 'Speaks / Says', transliteration: 'vadati', emoji: '🗣️' },
      { id: 'act_12', sanskrit: 'धावति', english: 'Runs', transliteration: 'dhāvati', emoji: '🏃' },
      { id: 'act_13', sanskrit: 'क्रीडति', english: 'Plays', transliteration: 'krīḍati', emoji: '⚽' },
      { id: 'act_14', sanskrit: 'हसति', english: 'Laughs / Smiles', transliteration: 'hasati', emoji: '😄' },
    ],
  },

  // 3. Relationships (सम्बन्धाः / Family & Kinship)
  {
    id: 'relationships',
    titleDev: 'सम्बन्धाः एवं कुटुम्बः',
    titleEn: 'Family & Kinship Relationships',
    icon: '👨‍👩‍👧‍👦',
    description: 'Ancestral and domestic family terms across generations.',
    pairs: [
      { id: 'rel_1', sanskrit: 'माता', english: 'Mother', transliteration: 'mātā', emoji: '👩' },
      { id: 'rel_2', sanskrit: 'पिता', english: 'Father', transliteration: 'pitā', emoji: '👨' },
      { id: 'rel_3', sanskrit: 'भ्राता', english: 'Brother', transliteration: 'bhrātā', emoji: '👦' },
      { id: 'rel_4', sanskrit: 'भगिनी', english: 'Sister', transliteration: 'bhaginī', emoji: '👧' },
      { id: 'rel_5', sanskrit: 'पितामहः', english: 'Paternal Grandfather', transliteration: 'pitāmahaḥ', emoji: '👴' },
      { id: 'rel_6', sanskrit: 'पितामही', english: 'Paternal Grandmother', transliteration: 'pitāmahī', emoji: '👵' },
      { id: 'rel_7', sanskrit: 'मातामहः', english: 'Maternal Grandfather', transliteration: 'mātāmahaḥ', emoji: '👴' },
      { id: 'rel_8', sanskrit: 'मातामही', english: 'Maternal Grandmother', transliteration: 'mātāmahī', emoji: '👵' },
      { id: 'rel_9', sanskrit: 'मातुलः', english: 'Maternal Uncle', transliteration: 'mātulaḥ', emoji: '🧔' },
      { id: 'rel_10', sanskrit: 'मातुली', english: 'Maternal Aunt', transliteration: 'mātulī', emoji: '👩' },
      { id: 'rel_11', sanskrit: 'पुत्रः', english: 'Son', transliteration: 'putraḥ', emoji: '👶' },
      { id: 'rel_12', sanskrit: 'पुत्री', english: 'Daughter', transliteration: 'putrī', emoji: '👧' },
      { id: 'rel_13', sanskrit: 'मित्रम्', english: 'Friend (Neuter)', transliteration: 'mitram', emoji: '🤝' },
    ],
  },

  // 4. How to say Time & Date (समयः एवं तिथिः)
  {
    id: 'time_date',
    titleDev: 'समयः, वासरः एवं तिथिः',
    titleEn: 'Telling Time, Days & Dates',
    icon: '⏰',
    description: 'Vedic and modern clock expressions, weekdays, and temporal adverbs.',
    pairs: [
      { id: 'td_1', sanskrit: 'एकवादनम्', english: "1 o'clock", transliteration: 'ēkavādanam', emoji: '🕐' },
      { id: 'td_2', sanskrit: 'सपाद-द्विवादनम्', english: '2:15 (Quarter past 2)', transliteration: 'sapāda-dvivādanam', emoji: '🕒' },
      { id: 'td_3', sanskrit: 'सार्ध-त्रिवादनम्', english: '3:30 (Half past 3)', transliteration: 'sārdha-trivādanam', emoji: '🕞' },
      { id: 'td_4', sanskrit: 'पादोन-चतुर्वादनम्', english: '3:45 (Quarter to 4)', transliteration: 'pādōna-caturvādanam', emoji: '🕓' },
      { id: 'td_5', sanskrit: 'अद्य', english: 'Today', transliteration: 'adya', emoji: '📅' },
      { id: 'td_6', sanskrit: 'श्वः', english: 'Tomorrow', transliteration: 'śvaḥ', emoji: '➡️' },
      { id: 'td_7', sanskrit: 'ह्यः', english: 'Yesterday', transliteration: 'hyaḥ', emoji: '⬅️' },
      { id: 'td_8', sanskrit: 'परश्वः', english: 'Day after tomorrow', transliteration: 'paraśvaḥ', emoji: '⏭️' },
      { id: 'td_9', sanskrit: 'सोमवासरः', english: 'Monday', transliteration: 'sōmavāsaraḥ', emoji: '🌕' },
      { id: 'td_10', sanskrit: 'रविवासरः', english: 'Sunday', transliteration: 'ravivāsaraḥ', emoji: '☀️' },
      { id: 'td_11', sanskrit: 'प्रातः', english: 'In the morning', transliteration: 'prātaḥ', emoji: '🌅' },
      { id: 'td_12', sanskrit: 'सायम्', english: 'In the evening', transliteration: 'sāyam', emoji: '🌆' },
      { id: 'td_13', sanskrit: 'पूर्णिमा', english: 'Full Moon Day', transliteration: 'pūrṇimā', emoji: '🌕' },
      { id: 'td_14', sanskrit: 'अमावास्या', english: 'New Moon Day', transliteration: 'amāvāsyā', emoji: '🌑' },
    ],
  },

  // 5. Exam Words & Sentences (परीक्षा-शब्दाः)
  {
    id: 'exam_words',
    titleDev: 'परीक्षा-निर्देशाः एवं शब्दाः',
    titleEn: 'CBSE Exam Words & Instructions',
    icon: '📝',
    description: 'Vital question cues, paper headings, and grammar directives for top scores.',
    pairs: [
      { id: 'ex_1', sanskrit: 'रिक्तस्थानं पूरयत', english: 'Fill in the blanks', transliteration: 'riktasthānaṁ pūrayata', emoji: '✏️' },
      { id: 'ex_2', sanskrit: 'उचितं विकल्पं चिनुत', english: 'Choose the correct option', transliteration: 'ucitaṁ vikalpaṁ cinuta', emoji: '☑️' },
      { id: 'ex_3', sanskrit: 'शुद्धं रूपं लिखत', english: 'Write the correct form', transliteration: 'śuddhaṁ rūpaṁ likhata', emoji: '✍️' },
      { id: 'ex_4', sanskrit: 'सत्यम् अथवा असत्यम्', english: 'True or False', transliteration: 'satyam athavā asatyam', emoji: '⚖️' },
      { id: 'ex_5', sanskrit: 'अन्वय-रचनां कुरुत', english: 'Construct the verse prose-order', transliteration: 'anvaya-racanāṁ kuruta', emoji: '📜' },
      { id: 'ex_6', sanskrit: 'सन्धिं कुरुत', english: 'Join the Sandhi', transliteration: 'sandhiṁ kuruta', emoji: '🔗' },
      { id: 'ex_7', sanskrit: 'विच्छेदं कुरुत', english: 'Split the compound / Sandhi', transliteration: 'vicchēdaṁ kuruta', emoji: '✂️' },
      { id: 'ex_8', sanskrit: 'समानार्थकपदम्', english: 'Synonym / Equivalent word', transliteration: 'samānārthakapadam', emoji: '🔄' },
      { id: 'ex_9', sanskrit: 'विलोमपदम्', english: 'Antonym / Opposite word', transliteration: 'vilōmapadam', emoji: '↔️' },
      { id: 'ex_10', sanskrit: 'एकपदेन उत्तरत', english: 'Answer in one word', transliteration: 'ēkapadēna uttarata', emoji: '🎯' },
      { id: 'ex_11', sanskrit: 'पूर्णवाक्येन उत्तरत', english: 'Answer in a full sentence', transliteration: 'pūrṇavākyēna uttarata', emoji: '📋' },
      { id: 'ex_12', sanskrit: 'कुत्र / कदा / कथम', english: 'Where / When / How', transliteration: 'kutra / kadā / katham', emoji: '❓' },
    ],
  },

  // 6. Fruits & Vegetables (फलानि एवं शाकानि)
  {
    id: 'fruits_veg',
    titleDev: 'फलानि एवं शाकानि',
    titleEn: 'Fruits & Vegetables',
    icon: '🍇',
    description: 'Fresh fruits and nutritious vegetables in classical Sanskrit.',
    pairs: [
      { id: 'fv_1', sanskrit: 'आम्रम्', english: 'Mango', transliteration: 'āmram', emoji: '🥭' },
      { id: 'fv_2', sanskrit: 'कदलीफलम्', english: 'Banana', transliteration: 'kadalīphalam', emoji: '🍌' },
      { id: 'fv_3', sanskrit: 'द्राक्षा', english: 'Grapes', transliteration: 'drākṣā', emoji: '🍇' },
      { id: 'fv_4', sanskrit: 'सेवम्', english: 'Apple', transliteration: 'sēvam', emoji: '🍎' },
      { id: 'fv_5', sanskrit: 'जम्बीरम्', english: 'Lemon / Lime', transliteration: 'jambīram', emoji: '🍋' },
      { id: 'fv_6', sanskrit: 'दाडिमम्', english: 'Pomegranate', transliteration: 'dāḍimam', emoji: '🫐' },
      { id: 'fv_7', sanskrit: 'आलुकम्', english: 'Potato', transliteration: 'ālukam', emoji: '🥔' },
      { id: 'fv_8', sanskrit: 'पलाण्डुः', english: 'Onion', transliteration: 'palāṇḍuḥ', emoji: '🧅' },
      { id: 'fv_9', sanskrit: 'वृन्ताकम्', english: 'Eggplant / Brinjal', transliteration: 'vṛntākam', emoji: '🍆' },
      { id: 'fv_10', sanskrit: 'मूलकम्', english: 'Radish', transliteration: 'mūlakam', emoji: '🥕' },
      { id: 'fv_11', sanskrit: 'मरीचिका', english: 'Chilli Pepper', transliteration: 'marīcikā', emoji: '🌶️' },
      { id: 'fv_12', sanskrit: 'कारवेल्लम्', english: 'Bitter Gourd', transliteration: 'kāravēllam', emoji: '🥒' },
    ],
  },

  // 7. Insects (कीटाः)
  {
    id: 'insects',
    titleDev: 'कीटाः एवं लघुप्राणिनः',
    titleEn: 'Insects & Small Creatures',
    icon: '🐜',
    description: 'Wings, pollinators, and creeping wonders from ancient natural texts.',
    pairs: [
      { id: 'ins_1', sanskrit: 'पिपीलिका', english: 'Ant', transliteration: 'pipīlikā', emoji: '🐜' },
      { id: 'ins_2', sanskrit: 'भ्रमरः', english: 'Bumblebee / Black Bee', transliteration: 'bhramaraḥ', emoji: '🐝' },
      { id: 'ins_3', sanskrit: 'मक्षिका', english: 'Housefly', transliteration: 'makṣikā', emoji: '🪰' },
      { id: 'ins_4', sanskrit: 'मशकः', english: 'Mosquito', transliteration: 'maśakaḥ', emoji: '🦟' },
      { id: 'ins_5', sanskrit: 'मधुमक्षिका', english: 'Honeybee', transliteration: 'madhumakṣikā', emoji: '🍯' },
      { id: 'ins_6', sanskrit: 'चित्रपतङ्गः', english: 'Butterfly', transliteration: 'citrapatangaḥ', emoji: '🦋' },
      { id: 'ins_7', sanskrit: 'वृश्चिकः', english: 'Scorpion', transliteration: 'vṛścikaḥ', emoji: '🦂' },
      { id: 'ins_8', sanskrit: 'लूता', english: 'Spider', transliteration: 'lūtā', emoji: '🕷️' },
      { id: 'ins_9', sanskrit: 'तित्तिभः', english: 'Cricket / Grasshopper', transliteration: 'tittibhaḥ', emoji: '🦗' },
      { id: 'ins_10', sanskrit: 'जलूका', english: 'Leech', transliteration: 'jalūkā', emoji: '🐛' },
    ],
  },

  // 8. Vāstu (वास्तुशास्त्रम् · Architecture & Sacred Dwellings)
  {
    id: 'vastu',
    titleDev: 'वास्तुशास्त्रम् एवं भवनम्',
    titleEn: 'Vāstu & Sacred Architecture',
    icon: '🏛️',
    description: 'Sacred architectural directions, sanctuary zones, and structural components.',
    pairs: [
      { id: 'vst_1', sanskrit: 'गृहम्', english: 'Home / Residence', transliteration: 'gṛham', emoji: '🏡' },
      { id: 'vst_2', sanskrit: 'द्वारम्', english: 'Main Doorway / Gate', transliteration: 'dvāram', emoji: '🚪' },
      { id: 'vst_3', sanskrit: 'वातायनम्', english: 'Window / Ventilation', transliteration: 'vātāyanam', emoji: '🪟' },
      { id: 'vst_4', sanskrit: 'प्रासादः', english: 'Mansion / Palace', transliteration: 'prāsādaḥ', emoji: '🏰' },
      { id: 'vst_5', sanskrit: 'मन्दिरम्', english: 'Temple / Sanctum', transliteration: 'mandiram', emoji: '🛕' },
      { id: 'vst_6', sanskrit: 'प्राङ्गणम्', english: 'Courtyard / Open quad', transliteration: 'prāṅgaṇam', emoji: '🌿' },
      { id: 'vst_7', sanskrit: 'ईशान-कोणः', english: 'Northeast (Ishan - Water/Divine)', transliteration: 'īśāna-kōṇaḥ', emoji: '🧭' },
      { id: 'vst_8', sanskrit: 'आग्नेय-कोणः', english: 'Southeast (Agneya - Kitchen/Fire)', transliteration: 'āgnēya-kōṇaḥ', emoji: '🔥' },
      { id: 'vst_9', sanskrit: 'स्तम्भः', english: 'Pillar / Sacred column', transliteration: 'stambhaḥ', emoji: '🏛️' },
      { id: 'vst_10', sanskrit: 'भित्तिः', english: 'Wall', transliteration: 'bhittiḥ', emoji: '🧱' },
      { id: 'vst_11', sanskrit: 'छदिः', english: 'Roof / Ceiling', transliteration: 'chadiḥ', emoji: '🏠' },
      { id: 'vst_12', sanskrit: 'सोपानम्', english: 'Staircase / Steps', transliteration: 'sōpānam', emoji: '🪜' },
    ],
  },

  // 9. Āyurveda (आयुर्वेदः · Herbs, Doshas & Wellness)
  {
    id: 'ayurveda',
    titleDev: 'आयुर्वेदः, ओषधयः एवं त्रिदोषाः',
    titleEn: 'Āyurveda, Herbs & Tridoṣas',
    icon: '🌿',
    description: 'Ancient healing science: Tridosha equilibrium, sacred herbs, and holistic vitality.',
    pairs: [
      { id: 'ayu_1', sanskrit: 'वातः', english: 'Vāta (Air & Space Principle)', transliteration: 'vātaḥ', emoji: '💨' },
      { id: 'ayu_2', sanskrit: 'पित्तम्', english: 'Pitta (Fire & Digestion Principle)', transliteration: 'pittam', emoji: '🔥' },
      { id: 'ayu_3', sanskrit: 'कफः', english: 'Kapha (Water & Stability Principle)', transliteration: 'kaphaḥ', emoji: '🌊' },
      { id: 'ayu_4', sanskrit: 'तुलसी', english: 'Holy Basil (Immunity tonic)', transliteration: 'tulasī', emoji: '🌱' },
      { id: 'ayu_5', sanskrit: 'अश्वगन्धा', english: 'Withania (Strength & Vitality)', transliteration: 'aśvagandhā', emoji: '🌾' },
      { id: 'ayu_6', sanskrit: 'आमलकी', english: 'Amla / Indian Gooseberry', transliteration: 'āmalakī', emoji: '🍈' },
      { id: 'ayu_7', sanskrit: 'हरिद्रा', english: 'Turmeric (Anti-inflammatory)', transliteration: 'haridrā', emoji: '🟡' },
      { id: 'ayu_8', sanskrit: 'आरोग्यम्', english: 'Holistic Health & Vitality', transliteration: 'ārōgyam', emoji: '✨' },
      { id: 'ayu_9', sanskrit: 'रसायनम्', english: 'Rejuvenator / Longevity therapy', transliteration: 'rasāyanam', emoji: '🧪' },
      { id: 'ayu_10', sanskrit: 'पथ्यम्', english: 'Wholesome lifestyle regimen', transliteration: 'pathyam', emoji: '🥗' },
      { id: 'ayu_11', sanskrit: 'प्राणः', english: 'Vital Life Force / Breath', transliteration: 'prāṇaḥ', emoji: '🫁' },
      { id: 'ayu_12', sanskrit: 'औषधम्', english: 'Herbal Medicine / Remedy', transliteration: 'auṣadham', emoji: '💊' },
    ],
  },

  // 10. Household Items (गृह-वस्तूनि)
  {
    id: 'household',
    titleDev: 'गृह-वस्तूनि एवं उपकरणानि',
    titleEn: 'Household & Everyday Domestic Items',
    icon: '🛋️',
    description: 'Everyday furniture, lighting, utensils, and personal belongings.',
    pairs: [
      { id: 'hh_1', sanskrit: 'दीपः', english: 'Oil Lamp / Light', transliteration: 'dīpaḥ', emoji: '🪔' },
      { id: 'hh_2', sanskrit: 'व्यजनम्', english: 'Fan', transliteration: 'vyajanam', emoji: '🪭' },
      { id: 'hh_3', sanskrit: 'आसन्दः', english: 'Chair', transliteration: 'āsandaḥ', emoji: '🪑' },
      { id: 'hh_4', sanskrit: 'उत्पीठिका', english: 'Table / Desk', transliteration: 'utpīṭhikā', emoji: '🪵' },
      { id: 'hh_5', sanskrit: 'घटः', english: 'Earthen Water Pitcher', transliteration: 'ghaṭaḥ', emoji: '🏺' },
      { id: 'hh_6', sanskrit: 'दर्पणः', english: 'Mirror', transliteration: 'darpaṇaḥ', emoji: '🪞' },
      { id: 'hh_7', sanskrit: 'शय्या', english: 'Bed / Couch', transliteration: 'śayyā', emoji: '🛏️' },
      { id: 'hh_8', sanskrit: 'कन्दुकम्', english: 'Ball (Toy)', transliteration: 'kandukam', emoji: '⚽' },
      { id: 'hh_9', sanskrit: 'कङ्कतम्', english: 'Comb', transliteration: 'kaṅkatam', emoji: '🪮' },
      { id: 'hh_10', sanskrit: 'चमसः', english: 'Spoon', transliteration: 'camasaḥ', emoji: '🥄' },
      { id: 'hh_11', sanskrit: 'स्थालिका', english: 'Plate / Dinner dish', transliteration: 'sthālikā', emoji: '🍽️' },
      { id: 'hh_12', sanskrit: 'घटी', english: 'Clock / Watch', transliteration: 'ghaṭī', emoji: '⏰' },
    ],
  },

  // 11. Vehicles (वाहनानि / Transport)
  {
    id: 'vehicles',
    titleDev: 'वाहनानि एवं गमनागमनम्',
    titleEn: 'Vehicles & Modes of Transport',
    icon: '🚗',
    description: 'Ancient chariots, boats, and modern road, rail, and air vehicles.',
    pairs: [
      { id: 'veh_1', sanskrit: 'द्विचक्रिका', english: 'Bicycle', transliteration: 'dvicakrikā', emoji: '🚲' },
      { id: 'veh_2', sanskrit: 'कारयानम्', english: 'Motor Car / Automobile', transliteration: 'kārayānam', emoji: '🚗' },
      { id: 'veh_3', sanskrit: 'बसयानम्', english: 'Public Bus', transliteration: 'basayānam', emoji: '🚌' },
      { id: 'veh_4', sanskrit: 'रेलयानम्', english: 'Train / Locomotive', transliteration: 'rēlayānam', emoji: '🚆' },
      { id: 'veh_5', sanskrit: 'विमानम्', english: 'Aeroplane / Flying vessel', transliteration: 'vimānam', emoji: '✈️' },
      { id: 'veh_6', sanskrit: 'नौका', english: 'Small Boat', transliteration: 'naukā', emoji: '⛵' },
      { id: 'veh_7', sanskrit: 'पोतः', english: 'Ocean Ship / Large vessel', transliteration: 'pōtaḥ', emoji: '🚢' },
      { id: 'veh_8', sanskrit: 'रथः', english: 'Chariot', transliteration: 'rathaḥ', emoji: '🛞' },
      { id: 'veh_9', sanskrit: 'अश्वशकटम्', english: 'Horse Carriage', transliteration: 'aśvaśakaṭam', emoji: '🐎' },
      { id: 'veh_10', sanskrit: 'स्कूटरयानम्', english: 'Scooter / Moped', transliteration: 'skūṭarayānam', emoji: '🛵' },
    ],
  },

  // 12. Occupations (व्यवसायाः / Professions)
  {
    id: 'occupations',
    titleDev: 'व्यवसायाः एवं कर्मकाराः',
    titleEn: 'Occupations, Trades & Professions',
    icon: '👨‍💼',
    description: 'Educators, healers, artisans, cultivators, and protectors of society.',
    pairs: [
      { id: 'occ_1', sanskrit: 'शिक्षकः', english: 'Teacher (Masculine)', transliteration: 'śikṣakaḥ', emoji: '👨‍🏫' },
      { id: 'occ_2', sanskrit: 'शिक्षिका', english: 'Teacher (Feminine)', transliteration: 'śikṣikā', emoji: '👩‍🏫' },
      { id: 'occ_3', sanskrit: 'चिकित्सकः', english: 'Doctor / Physician', transliteration: 'cikitsakaḥ', emoji: '👨‍⚕️' },
      { id: 'occ_4', sanskrit: 'कृषकः', english: 'Farmer / Cultivator', transliteration: 'kṛṣakaḥ', emoji: '👨‍🌾' },
      { id: 'occ_5', sanskrit: 'सैनिकः', english: 'Soldier / Defender', transliteration: 'sainikaḥ', emoji: '💂' },
      { id: 'occ_6', sanskrit: 'चालकः', english: 'Driver / Pilot', transliteration: 'cālakaḥ', emoji: '👨‍✈️' },
      { id: 'occ_7', sanskrit: 'कुम्भकारः', english: 'Potter / Clay artisan', transliteration: 'kumbhakāraḥ', emoji: '🏺' },
      { id: 'occ_8', sanskrit: 'तक्षकः', english: 'Carpenter', transliteration: 'takṣakaḥ', emoji: '🪚' },
      { id: 'occ_9', sanskrit: 'स्वर्णकारः', english: 'Goldsmith / Jeweller', transliteration: 'svarṇakāraḥ', emoji: '💍' },
      { id: 'occ_10', sanskrit: 'गायकः', english: 'Singer / Musician', transliteration: 'gāyakaḥ', emoji: '🎤' },
      { id: 'occ_11', sanskrit: 'न्यायाधीशः', english: 'Judge / Jurist', transliteration: 'nyāyādhīśaḥ', emoji: '⚖️' },
      { id: 'occ_12', sanskrit: 'आरक्षकः', english: 'Police officer / Guard', transliteration: 'ārakṣakaḥ', emoji: '👮' },
    ],
  },

  // 13. Past, Present, Future (त्रिकाल-क्रियाः)
  {
    id: 'tenses',
    titleDev: 'त्रिकाल-क्रियाः (भूत-वर्तमान-भविष्यत्)',
    titleEn: 'Past, Present & Future Tenses (Lakāras)',
    icon: '⏳',
    description: 'Master Sanskrit temporal verb shifts across Laṅ (Past), Laṭ (Present), and Lṛṭ (Future).',
    pairs: [
      { id: 'tns_1', sanskrit: 'अपठत् ➔ पठति ➔ पठिष्यति', english: 'He read ➔ He reads ➔ He will read', transliteration: 'apaṭhat ➔ paṭhati ➔ paṭhiṣyati', emoji: '📖' },
      { id: 'tns_2', sanskrit: 'अलिखत् ➔ लिखति ➔ लिखिष्यति', english: 'He wrote ➔ He writes ➔ He will write', transliteration: 'alikhat ➔ likhati ➔ likhiṣyati', emoji: '✍️' },
      { id: 'tns_3', sanskrit: 'अगच्छत् ➔ गच्छति ➔ गमिष्यति', english: 'He went ➔ He goes ➔ He will go', transliteration: 'agacchat ➔ gacchati ➔ gamiṣyati', emoji: '🚶' },
      { id: 'tns_4', sanskrit: 'अखादत् ➔ खादति ➔ खादिष्यति', english: 'He ate ➔ He eats ➔ He will eat', transliteration: 'akhādat ➔ khādati ➔ khādiṣyati', emoji: '🍎' },
      { id: 'tns_5', sanskrit: 'अपिबत् ➔ पिबति ➔ पास्यति', english: 'He drank ➔ He drinks ➔ He will drink', transliteration: 'apibat ➔ pibati ➔ pāsyati', emoji: '💧' },
      { id: 'tns_6', sanskrit: 'अपश्यत् ➔ पश्यति ➔ द्रक्ष्यति', english: 'He saw ➔ He sees ➔ He will see', transliteration: 'apaśyat ➔ paśyati ➔ drakṣyati', emoji: '👁️' },
      { id: 'tns_7', sanskrit: 'अवदत् ➔ वदति ➔ वदिष्यति', english: 'He spoke ➔ He speaks ➔ He will speak', transliteration: 'avadat ➔ vadati ➔ vadiṣyati', emoji: '🗣️' },
      { id: 'tns_8', sanskrit: 'अभवत् ➔ भवति ➔ भविष्यति', english: 'He became ➔ He is ➔ He will be', transliteration: 'abhavat ➔ bhavati ➔ bhaviṣyati', emoji: '🌟' },
      { id: 'tns_9', sanskrit: 'अनमत् ➔ नमति ➔ नंस्यति', english: 'He bowed ➔ He bows ➔ He will bow', transliteration: 'anamat ➔ namati ➔ naṁsyati', emoji: '🙇' },
      { id: 'tns_10', sanskrit: 'अक्रीडत् ➔ क्रीडति ➔ क्रीडिष्यति', english: 'He played ➔ He plays ➔ He will play', transliteration: 'akrīḍat ➔ krīḍati ➔ krīḍiṣyati', emoji: '⚽' },
    ],
  },

  // 14. Stirling, Pumling, Napumsakaling (लिङ्ग-भेदः)
  {
    id: 'genders',
    titleDev: 'लिङ्ग-भेदः (पुंलिङ्ग, स्त्रीलिङ्ग, नपुंसकलिङ्ग)',
    titleEn: 'Grammatical Genders: Masculine, Feminine & Neuter',
    icon: '🚻',
    description: 'Learn corresponding triplets across all three classical Sanskrit genders.',
    pairs: [
      { id: 'gen_1', sanskrit: 'बालकः (पुं) ➔ बालिका (स्त्री) ➔ फलम् (नपुं)', english: 'Boy (M) ➔ Girl (F) ➔ Fruit (N)', transliteration: 'bālakaḥ ➔ bālikā ➔ phalam', emoji: '🧒' },
      { id: 'gen_2', sanskrit: 'सः (He) ➔ सा (She) ➔ तत् (That N)', english: 'That Boy (M) ➔ That Girl (F) ➔ That Object (N)', transliteration: 'saḥ ➔ sā ➔ tat', emoji: '👉' },
      { id: 'gen_3', sanskrit: 'एषः (This M) ➔ एषा (This F) ➔ एतत् (This N)', english: 'This Person (M) ➔ This Person (F) ➔ This Object (N)', transliteration: 'ēṣaḥ ➔ ēṣā ➔ ētat', emoji: '👇' },
      { id: 'gen_4', sanskrit: 'कः (Who M) ➔ का (Who F) ➔ किम् (What N)', english: 'Who? (M) ➔ Who? (F) ➔ What? (N)', transliteration: 'kaḥ ➔ kā ➔ kim', emoji: '❓' },
      { id: 'gen_5', sanskrit: 'छात्रः (M) ➔ छात्रा (F) ➔ पुस्तकम् (N)', english: 'Male Student ➔ Female Student ➔ Book', transliteration: 'chātraḥ ➔ chātrā ➔ pustakam', emoji: '📚' },
      { id: 'gen_6', sanskrit: 'सिंहः (Lion) ➔ सिंही (Lioness) ➔ वनम् (Forest)', english: 'Lion (M) ➔ Lioness (F) ➔ Forest (N)', transliteration: 'siṁhaḥ ➔ siṁhī ➔ vanam', emoji: '🦁' },
      { id: 'gen_7', sanskrit: 'अश्वः (Horse) ➔ अश्वा (Mare) ➔ तृणम् (Grass)', english: 'Stallion (M) ➔ Mare (F) ➔ Grass (N)', transliteration: 'aśvaḥ ➔ aśvā ➔ tṛṇam', emoji: '🐎' },
      { id: 'gen_8', sanskrit: 'मयूरः (Peacock) ➔ मयूरा (Peahen) ➔ पिच्छम् (Feather)', english: 'Peacock (M) ➔ Peahen (F) ➔ Feather (N)', transliteration: 'mayūraḥ ➔ mayūrā ➔ piccham', emoji: '🦚' },
      { id: 'gen_9', sanskrit: 'शिक्षकः (M) ➔ शिक्षिका (F) ➔ विद्यालयः (School)', english: 'Male Teacher ➔ Female Teacher ➔ School', transliteration: 'śikṣakaḥ ➔ śikṣikā ➔ vidyālayaḥ', emoji: '🏫' },
    ],
  },

  // 15. Directions & Traffic Rescue (दिशः एवं यातायातम्)
  {
    id: 'cat_directions_traffic',
    titleDev: 'दिशः एवं यातायातम्',
    titleEn: 'Directions & Traffic Rescue',
    icon: '🚦',
    description: 'Master spatial directions (वामतः, दक्षिणतः, पुरतः), crossroads, signals, and ambulance rescue terms.',
    pairs: [
      { id: 'dir_1', sanskrit: 'वामतः', english: 'To the Left', transliteration: 'vāmatas', emoji: '⬅️' },
      { id: 'dir_2', sanskrit: 'दक्षिणतः', english: 'To the Right', transliteration: 'dakṣiṇatas', emoji: '➡️' },
      { id: 'dir_3', sanskrit: 'पुरतः / अग्रे', english: 'In Front / Forward Ahead', transliteration: 'puratas / agre', emoji: '⬆️' },
      { id: 'dir_4', sanskrit: 'पृष्ठतः', english: 'Behind / In the Back', transliteration: 'pṛṣṭhatas', emoji: '⬇️' },
      { id: 'dir_5', sanskrit: 'ऋजु-मार्गेण / सीधा', english: 'Straight Ahead', transliteration: 'ṛju-mārgeṇa', emoji: '🧭' },
      { id: 'dir_6', sanskrit: 'उपरि / अधः', english: 'Above / Below', transliteration: 'upari / adhaḥ', emoji: '↕️' },
      { id: 'dir_7', sanskrit: 'समीपे / दूरे', english: 'Near / Far away', transliteration: 'samīpe / dūre', emoji: '📍' },
      { id: 'dir_8', sanskrit: 'चतुष्पथः', english: 'Crossroads / Intersection', transliteration: 'catuṣpathaḥ', emoji: '🚦' },
      { id: 'dir_9', sanskrit: 'रुग्णवाहनम् / आपद्वाहनम्', english: 'Ambulance', transliteration: 'rugṇavāhanam / āpadvāhanam', emoji: '🚑' },
      { id: 'dir_10', sanskrit: 'रक्तदीपः (तिष्ठतु)', english: 'Red Signal (Stop!)', transliteration: 'raktadīpaḥ (tiṣṭhatu)', emoji: '🛑' },
      { id: 'dir_11', sanskrit: 'हरितदीपः (चलतु)', english: 'Green Signal (Go!)', transliteration: 'haritadīpaḥ (calatu)', emoji: '🟢' },
      { id: 'dir_12', sanskrit: 'पदयात्रिक-मार्गः', english: 'Zebra / Pedestrian Crossing', transliteration: 'padayātrika-mārgaḥ', emoji: '🦓' },
      { id: 'dir_13', sanskrit: 'साहाय्यं करोति', english: 'Helps / Assists someone', transliteration: 'sāhāyyaṁ karoti', emoji: '🤝' },
      { id: 'dir_14', sanskrit: 'चिकित्सालयः', english: 'Hospital', transliteration: 'cikitsālayaḥ', emoji: '🏥' },
    ],
  },
];

// ============================================================================
// 2. WORD MAZE QUESTS (शब्द-व्यूहः)
// ============================================================================

export type MazeType = 'identification' | 'sequencing' | 'story';

export interface MazeCell {
  row: number;
  col: number;
  word: string;
  translation: string;
  isPath: boolean;
  stepOrder?: number;
  categoryTag?: string;
}

export interface WordMazeQuest {
  id: string;
  type: MazeType;
  titleDev: string;
  titleEn: string;
  icon: string;
  missionObjective: string;
  gridRows: number;
  gridCols: number;
  cells: MazeCell[];
  fullSentenceOrStoryDev: string;
  fullSentenceOrStoryEn: string;
  moral?: string;
}

export const WORD_MAZE_QUESTS: WordMazeQuest[] = [
  // STORY MAZE 1: पिपासितः काकः (The Thirsty Crow)
  {
    id: 'maze_thirsty_crow',
    type: 'story',
    titleDev: 'पिपासितः काकः (कथा-व्यूहः)',
    titleEn: 'Story Maze: The Thirsty Crow',
    icon: '🪶',
    missionObjective: 'Connect adjacent Sanskrit words from Start to Goal to form the famous Panchatantra story!',
    gridRows: 5,
    gridCols: 5,
    fullSentenceOrStoryDev: 'एकदा एकः काकः पिपासितः आसीत् । सः वने जलम् अन्वेषयति । घटे स्वल्पं जलम् अस्ति । काकः पाषाणखण्डान् घटे क्षिपति । जलम् उपरि आगच्छति । काकः जलं पीत्वा तृप्तः भवति ॥',
    fullSentenceOrStoryEn: 'Once upon a time, a crow was thirsty. He searched for water in the forest. In a pitcher, there was very little water. The crow dropped pebble stones into the pitcher. Water rose to the top. The crow drank water and was happily satisfied.',
    moral: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः (Diligence and wits conquer every obstacle).',
    cells: [
      // Row 0: Once upon a time, a crow was thirsty
      { row: 0, col: 0, word: 'एकदा', translation: 'Once upon a time', isPath: true, stepOrder: 1 },
      { row: 0, col: 1, word: 'एकः', translation: 'One / A', isPath: true, stepOrder: 2 },
      { row: 0, col: 2, word: 'काकः', translation: 'Crow', isPath: true, stepOrder: 3 },
      { row: 0, col: 3, word: 'पिपासितः', translation: 'Thirsty', isPath: true, stepOrder: 4 },
      { row: 0, col: 4, word: 'आसीत्', translation: 'Was', isPath: true, stepOrder: 5 },

      // Row 1: In the forest he searched for water
      { row: 1, col: 0, word: 'वृक्षः', translation: 'Tree (Trap)', isPath: false },
      { row: 1, col: 1, word: 'पर्वतः', translation: 'Mountain (Trap)', isPath: false },
      { row: 1, col: 2, word: 'अन्वेषयति', translation: 'Searches', isPath: true, stepOrder: 8 },
      { row: 1, col: 3, word: 'जलम्', translation: 'Water', isPath: true, stepOrder: 7 },
      { row: 1, col: 4, word: 'वने', translation: 'In the forest', isPath: true, stepOrder: 6 },

      // Row 2: In the pot was very little water
      { row: 2, col: 0, word: 'अस्ति', translation: 'Is', isPath: true, stepOrder: 11 },
      { row: 2, col: 1, word: 'स्वल्पम्', translation: 'Very little', isPath: true, stepOrder: 10 },
      { row: 2, col: 2, word: 'घटे', translation: 'In the pot', isPath: true, stepOrder: 9 },
      { row: 2, col: 3, word: 'नदी', translation: 'River (Trap)', isPath: false },
      { row: 2, col: 4, word: 'कमलम्', translation: 'Lotus (Trap)', isPath: false },

      // Row 3: The crow throws pebbles upward
      { row: 3, col: 0, word: 'काकः', translation: 'The Crow', isPath: true, stepOrder: 12 },
      { row: 3, col: 1, word: 'पाषाणान्', translation: 'Pebbles', isPath: true, stepOrder: 13 },
      { row: 3, col: 2, word: 'क्षिपति', translation: 'Throws in', isPath: true, stepOrder: 14 },
      { row: 3, col: 3, word: 'उपरि', translation: 'Upwards', isPath: true, stepOrder: 15 },
      { row: 3, col: 4, word: 'आगच्छति', translation: 'Rises up', isPath: true, stepOrder: 16 },

      // Row 4: Water rises, drinking it he becomes satisfied
      { row: 4, col: 0, word: 'फलम्', translation: 'Fruit (Trap)', isPath: false },
      { row: 4, col: 1, word: 'भवति', translation: 'Becomes 🏆', isPath: true, stepOrder: 20 },
      { row: 4, col: 2, word: 'तृप्तः', translation: 'Satisfied', isPath: true, stepOrder: 19 },
      { row: 4, col: 3, word: 'पीत्वा', translation: 'Having drunk', isPath: true, stepOrder: 18 },
      { row: 4, col: 4, word: 'जलम्', translation: 'Water', isPath: true, stepOrder: 17 },
    ],
  },

  // STORY MAZE 2: सिंहः मूषकश्च (The Lion and the Mouse)
  {
    id: 'maze_lion_mouse',
    type: 'story',
    titleDev: 'सिंहः मूषकश्च (कथा-व्यूहः)',
    titleEn: 'Story Maze: The Lion and the Mouse',
    icon: '🦁',
    missionObjective: 'Trace the path of words telling the story of kindness and gratitude between the forest king and the tiny mouse.',
    gridRows: 5,
    gridCols: 5,
    fullSentenceOrStoryDev: 'वने एकः सिंहः सुप्तः आसीत् । लघुः मूषकः तस्य शरीरे कूर्दति । सिंहः क्रुद्धः भवति । मूषकः प्रार्थयति । सिंहः तं मुञ्चति । एकदा सिंहः जाले बद्धः भवति । मूषकः जालं दन्तैः कृन्तति । सिंहः मुक्तः भवति ॥',
    fullSentenceOrStoryEn: 'In a forest, a lion was sleeping. A tiny mouse leaped on his body. The lion grew angry. The mouse pleaded for mercy. The lion released him. One day, the lion was trapped in a hunter’s net. The mouse gnawed the net with his sharp teeth. The lion was set free.',
    moral: 'लघुरपि सहायः महते उपकाराय भवति (Even the smallest friend can render supreme help).',
    cells: [
      // Row 0
      { row: 0, col: 0, word: 'वने', translation: 'In the forest', isPath: true, stepOrder: 1 },
      { row: 0, col: 1, word: 'सिंहः', translation: 'Lion', isPath: true, stepOrder: 2 },
      { row: 0, col: 2, word: 'सुप्तः', translation: 'Sleeping', isPath: true, stepOrder: 3 },
      { row: 0, col: 3, word: 'आसीत्', translation: 'Was', isPath: true, stepOrder: 4 },
      { row: 0, col: 4, word: 'व्याघ्रः', translation: 'Tiger (Trap)', isPath: false },

      // Row 1
      { row: 0, col: 0, word: 'गजः', translation: 'Elephant (Trap)', isPath: false },
      { row: 1, col: 1, word: 'कूर्दति', translation: 'Leaps', isPath: true, stepOrder: 7 },
      { row: 1, col: 2, word: 'शरीरे', translation: 'On body', isPath: true, stepOrder: 6 },
      { row: 1, col: 3, word: 'मूषकः', translation: 'Mouse', isPath: true, stepOrder: 5 },
      { row: 1, col: 4, word: 'मृगः', translation: 'Deer (Trap)', isPath: false },

      // Row 2
      { row: 2, col: 0, word: 'क्रुद्धः', translation: 'Furious', isPath: true, stepOrder: 8 },
      { row: 2, col: 1, word: 'सिंहः', translation: 'Lion', isPath: true, stepOrder: 9 },
      { row: 2, col: 2, word: 'प्रार्थयति', translation: 'Pleads', isPath: true, stepOrder: 10 },
      { row: 2, col: 3, word: 'मुञ्चति', translation: 'Releases', isPath: true, stepOrder: 11 },
      { row: 2, col: 4, word: 'पाषाणः', translation: 'Stone (Trap)', isPath: false },

      // Row 3
      { row: 3, col: 0, word: 'जालम्', translation: 'Net (Trap)', isPath: false },
      { row: 3, col: 1, word: 'दन्तैः', translation: 'With teeth', isPath: true, stepOrder: 15 },
      { row: 3, col: 2, word: 'जालम्', translation: 'The Net', isPath: true, stepOrder: 14 },
      { row: 3, col: 3, word: 'बद्धः', translation: 'Trapped', isPath: true, stepOrder: 13 },
      { row: 3, col: 4, word: 'जाले', translation: 'In hunter net', isPath: true, stepOrder: 12 },

      // Row 4
      { row: 4, col: 0, word: 'अरण्यम्', translation: 'Jungle (Trap)', isPath: false },
      { row: 4, col: 1, word: 'कृन्तति', translation: 'Gnaws / Cuts', isPath: true, stepOrder: 16 },
      { row: 4, col: 2, word: 'सिंहः', translation: 'Lion', isPath: true, stepOrder: 17 },
      { row: 4, col: 3, word: 'मुक्तः', translation: 'Free', isPath: true, stepOrder: 18 },
      { row: 4, col: 4, word: 'भवति', translation: 'Becomes', isPath: true, stepOrder: 19 },
    ],
  },

  // SEQUENCING MAZE 1: त्रिकाल-क्रिया-क्रमः (Past -> Present -> Future Tense Sequencing)
  {
    id: 'maze_tenses_seq',
    type: 'sequencing',
    titleDev: 'त्रिकाल-क्रम-व्यूहः (Past ➔ Present ➔ Future)',
    titleEn: 'Sequencing Maze: Three Tenses of Verbs',
    icon: '⏳',
    missionObjective: 'Navigate through the maze stepping strictly in order: भूतकाल (Past) ➔ वर्तमानकाल (Present) ➔ भविष्यत्काल (Future)!',
    gridRows: 4,
    gridCols: 5,
    fullSentenceOrStoryDev: 'अपठत् ➔ पठति ➔ पठिष्यति ➔ अगच्छत् ➔ गच्छति ➔ गमिष्यति ➔ अखादत् ➔ खादति ➔ खादिष्यति ➔ अभवत् ➔ भवति ➔ भविष्यति ॥',
    fullSentenceOrStoryEn: 'He read (Past) ➔ He reads (Pres) ➔ He will read (Fut) ➔ He went ➔ He goes ➔ He will go ➔ He ate ➔ He eats ➔ He will eat ➔ He became ➔ He is ➔ He will be.',
    cells: [
      // Row 0: Read triplet
      { row: 0, col: 0, word: 'अपठत्', translation: 'Read (Past)', isPath: true, stepOrder: 1 },
      { row: 0, col: 1, word: 'पठति', translation: 'Reads (Pres)', isPath: true, stepOrder: 2 },
      { row: 0, col: 2, word: 'पठिष्यति', translation: 'Will read (Fut)', isPath: true, stepOrder: 3 },
      { row: 0, col: 3, word: 'गमिष्यति', translation: 'Trap Fut', isPath: false },
      { row: 0, col: 4, word: 'खादति', translation: 'Trap Pres', isPath: false },

      // Row 1: Go triplet
      { row: 1, col: 0, word: 'लिखति', translation: 'Trap Pres', isPath: false },
      { row: 1, col: 1, word: 'अलिखत्', translation: 'Trap Past', isPath: false },
      { row: 1, col: 2, word: 'अगच्छत्', translation: 'Went (Past)', isPath: true, stepOrder: 4 },
      { row: 1, col: 3, word: 'गच्छति', translation: 'Goes (Pres)', isPath: true, stepOrder: 5 },
      { row: 1, col: 4, word: 'गमिष्यति', translation: 'Will go (Fut)', isPath: true, stepOrder: 6 },

      // Row 2: Eat triplet
      { row: 2, col: 0, word: 'अखादत्', translation: 'Ate (Past)', isPath: true, stepOrder: 9 },
      { row: 2, col: 1, word: 'खादति', translation: 'Eats (Pres)', isPath: true, stepOrder: 8 },
      { row: 2, col: 2, word: 'खादिष्यति', translation: 'Will eat (Fut)', isPath: true, stepOrder: 7 },
      { row: 2, col: 3, word: 'पिबति', translation: 'Trap Pres', isPath: false },
      { row: 2, col: 4, word: 'अपिबत्', translation: 'Trap Past', isPath: false },

      // Row 3: Become triplet
      { row: 3, col: 0, word: 'अभवत्', translation: 'Became (Past)', isPath: true, stepOrder: 10 },
      { row: 3, col: 1, word: 'भवति', translation: 'Is (Pres)', isPath: true, stepOrder: 11 },
      { row: 3, col: 2, word: 'भविष्यति', translation: 'Will be (Fut)', isPath: true, stepOrder: 12 },
      { row: 3, col: 3, word: 'विजेता', translation: 'Winner! 🏆', isPath: true, stepOrder: 13 },
      { row: 3, col: 4, word: 'समाप्तम्', translation: 'Finished! 🎯', isPath: true, stepOrder: 14 },
    ],
  },

  // IDENTIFICATION MAZE 1: क्रियापद-अभिज्ञानम् (Action Words Identification)
  {
    id: 'maze_identify_verbs',
    type: 'identification',
    titleDev: 'क्रियापद-अभिज्ञान-व्यूहः (Action Words Path)',
    titleEn: 'Identification Maze: Action Words',
    icon: '⚡',
    missionObjective: 'Trace the path from Start to Goal by stepping ONLY on Action Words (क्रियापदानि), avoiding nouns and objects!',
    gridRows: 4,
    gridCols: 5,
    fullSentenceOrStoryDev: 'पठति ➔ लिखति ➔ गच्छति ➔ आगच्छति ➔ खादति ➔ पिबति ➔ पश्यति ➔ शृणोति ➔ धावति ➔ जयति ॥',
    fullSentenceOrStoryEn: 'Reads ➔ Writes ➔ Goes ➔ Comes ➔ Eats ➔ Drinks ➔ Sees ➔ Listens ➔ Runs ➔ Triumphs!',
    cells: [
      { row: 0, col: 0, word: 'पठति', translation: 'Reads (Action)', isPath: true, stepOrder: 1 },
      { row: 0, col: 1, word: 'लिखति', translation: 'Writes (Action)', isPath: true, stepOrder: 2 },
      { row: 0, col: 2, word: 'पुस्तकम्', translation: 'Book (Noun Trap)', isPath: false },
      { row: 0, col: 3, word: 'फलम्', translation: 'Fruit (Noun Trap)', isPath: false },
      { row: 0, col: 4, word: 'गृहम्', translation: 'House (Noun Trap)', isPath: false },

      { row: 1, col: 0, word: 'वृक्षः', translation: 'Tree (Noun Trap)', isPath: false },
      { row: 1, col: 1, word: 'गच्छति', translation: 'Goes (Action)', isPath: true, stepOrder: 3 },
      { row: 1, col: 2, word: 'आगच्छति', translation: 'Comes (Action)', isPath: true, stepOrder: 4 },
      { row: 1, col: 3, word: 'खादति', translation: 'Eats (Action)', isPath: true, stepOrder: 5 },
      { row: 1, col: 4, word: 'जलम्', translation: 'Water (Noun Trap)', isPath: false },

      { row: 2, col: 0, word: 'मित्रम्', translation: 'Friend (Noun Trap)', isPath: false },
      { row: 2, col: 1, word: 'सूर्यः', translation: 'Sun (Noun Trap)', isPath: false },
      { row: 2, col: 2, word: 'अन्नम्', translation: 'Grain (Noun Trap)', isPath: false },
      { row: 2, col: 3, word: 'पिबति', translation: 'Drinks (Action)', isPath: true, stepOrder: 6 },
      { row: 2, col: 4, word: 'पश्यति', translation: 'Sees (Action)', isPath: true, stepOrder: 7 },

      { row: 3, col: 0, word: 'आकाशः', translation: 'Sky (Noun Trap)', isPath: false },
      { row: 3, col: 1, word: 'जयति', translation: 'Wins / Triumphs!', isPath: true, stepOrder: 10 },
      { row: 3, col: 2, word: 'धावति', translation: 'Runs (Action)', isPath: true, stepOrder: 9 },
      { row: 3, col: 3, word: 'शृणोति', translation: 'Hears (Action)', isPath: true, stepOrder: 8 },
      { row: 3, col: 4, word: 'दर्पणः', translation: 'Mirror (Noun Trap)', isPath: false },
    ],
  },

  // IDENTIFICATION MAZE 2: फल-शाक-अभिज्ञानम् (Fruits & Veggies Path)
  {
    id: 'maze_identify_fruits_veg',
    type: 'identification',
    titleDev: 'फल-शाक-अभिज्ञान-व्यूहः (Fruits & Vegetables Path)',
    titleEn: 'Identification Maze: Fruits & Vegetables',
    icon: '🍎',
    missionObjective: 'Traverse the garden maze by stepping ONLY on Fruits and Vegetables (फलानि एवं शाकानि), avoiding household items and animals!',
    gridRows: 4,
    gridCols: 5,
    fullSentenceOrStoryDev: 'आम्रम् ➔ कदलीफलम् ➔ सेवम् ➔ द्राक्षा ➔ दाडिमम् ➔ आलुकम् ➔ पलाण्डुः ➔ वृन्ताकम् ➔ मूलकम् ➔ मरीचिका ॥',
    fullSentenceOrStoryEn: 'Mango ➔ Banana ➔ Apple ➔ Grapes ➔ Pomegranate ➔ Potato ➔ Onion ➔ Eggplant ➔ Radish ➔ Chilli!',
    cells: [
      { row: 0, col: 0, word: 'आम्रम्', translation: 'Mango (Fruit)', isPath: true, stepOrder: 1 },
      { row: 0, col: 1, word: 'कदलीफलम्', translation: 'Banana (Fruit)', isPath: true, stepOrder: 2 },
      { row: 0, col: 2, word: 'सेवम्', translation: 'Apple (Fruit)', isPath: true, stepOrder: 3 },
      { row: 0, col: 3, word: 'व्यजनम्', translation: 'Fan (Item Trap)', isPath: false },
      { row: 0, col: 4, word: 'कारयानम्', translation: 'Car (Trap)', isPath: false },

      { row: 1, col: 0, word: 'सिंहः', translation: 'Lion (Animal Trap)', isPath: false },
      { row: 1, col: 1, word: 'आसन्दः', translation: 'Chair (Trap)', isPath: false },
      { row: 1, col: 2, word: 'द्राक्षा', translation: 'Grapes (Fruit)', isPath: true, stepOrder: 4 },
      { row: 1, col: 3, word: 'दाडिमम्', translation: 'Pomegranate (Fruit)', isPath: true, stepOrder: 5 },
      { row: 1, col: 4, word: 'आलुकम्', translation: 'Potato (Vegetable)', isPath: true, stepOrder: 6 },

      { row: 2, col: 0, word: 'घटः', translation: 'Pot (Trap)', isPath: false },
      { row: 2, col: 1, word: 'दीपः', translation: 'Lamp (Trap)', isPath: false },
      { row: 2, col: 2, word: 'द्विचक्रिका', translation: 'Bicycle (Trap)', isPath: false },
      { row: 2, col: 3, word: 'शशकः', translation: 'Hare (Trap)', isPath: false },
      { row: 2, col: 4, word: 'पलाण्डुः', translation: 'Onion (Vegetable)', isPath: true, stepOrder: 7 },

      { row: 3, col: 0, word: 'मरीचिका', translation: 'Chilli (Spice Veg)', isPath: true, stepOrder: 10 },
      { row: 3, col: 1, word: 'मूलकम्', translation: 'Radish (Vegetable)', isPath: true, stepOrder: 9 },
      { row: 3, col: 2, word: 'वृन्ताकम्', translation: 'Eggplant (Vegetable)', isPath: true, stepOrder: 8 },
      { row: 3, col: 3, word: 'पिपीलिका', translation: 'Ant (Insect Trap)', isPath: false },
      { row: 3, col: 4, word: 'शय्या', translation: 'Bed (Trap)', isPath: false },
    ],
  },

  // STORY MAZE 4: चतुष्पथे साहाय्यम् · Traffic & Ambulance Rescue (Directions Quest)
  {
    id: 'maze_traffic_rescue',
    type: 'story',
    titleDev: 'चतुष्पथे साहाय्यम् (Traffic & Directions Rescue)',
    titleEn: 'Story Maze: Ambulance & Directions at the Crossroads',
    icon: '🚑',
    missionObjective: 'Guide the child helping the elder and direct the ambulance to the hospital using directional words (वामतः, दक्षिणतः, अग्रे)!',
    gridRows: 5,
    gridCols: 5,
    fullSentenceOrStoryDev: 'चतुष्पथे रक्तदीपः अस्ति । बालकः वृद्धस्य साहाय्यं करोति । सः वामतः दक्षिणतः च पश्यति । पदयात्रिक-मार्गेण मार्गं तरति । दूरात् रुग्णवाहनम् आगच्छति । वाहनानि वामतः गच्छन्ति । रुग्णवाहनम् ऋजु-मार्गेण अग्रे धावति । शीघ्रं चिकित्सालयं प्राप्नोति ॥',
    fullSentenceOrStoryEn: 'At the crossroads, there is a red signal. A child helps an elderly person. He looks to the left and to the right. He crosses the road safely on the zebra crossing. From afar, an ambulance rushes. Vehicles move to the left. The ambulance speeds straight forward. Quickly, it reaches the hospital.',
    moral: 'परोपकाराय सतां विभूतयः (The noble always step forward to help others in need).',
    cells: [
      // Row 0: At the crossroads with red light, child helps elder
      { row: 0, col: 0, word: 'चतुष्पथे', translation: 'At crossroads 🚦', isPath: true, stepOrder: 1 },
      { row: 0, col: 1, word: 'रक्तदीपः', translation: 'Red signal 🛑', isPath: true, stepOrder: 2 },
      { row: 0, col: 2, word: 'बालकः', translation: 'The Child 👦', isPath: true, stepOrder: 3 },
      { row: 0, col: 3, word: 'वृद्धस्य', translation: 'Of elder 👴', isPath: true, stepOrder: 4 },
      { row: 0, col: 4, word: 'साहाय्यम्', translation: 'Help 🤝', isPath: true, stepOrder: 5 },

      // Row 1: Offers help, looks left and right
      { row: 1, col: 0, word: 'समुद्रः', translation: 'Ocean (Trap)', isPath: false },
      { row: 1, col: 1, word: 'पश्यति', translation: 'Looks both ways 👀', isPath: true, stepOrder: 9 },
      { row: 1, col: 2, word: 'दक्षिणतः', translation: 'To the Right ➡️', isPath: true, stepOrder: 8 },
      { row: 1, col: 3, word: 'वामतः', translation: 'To the Left ⬅️', isPath: true, stepOrder: 7 },
      { row: 1, col: 4, word: 'करोति', translation: 'Offers / Does', isPath: true, stepOrder: 6 },

      // Row 2: Crosses on zebra crossing as ambulance approaches
      { row: 2, col: 0, word: 'जङ्गलम्', translation: 'Jungle (Trap)', isPath: false },
      { row: 2, col: 1, word: 'पदयात्रिक-मार्गेण', translation: 'On zebra crossing 🦓', isPath: true, stepOrder: 10 },
      { row: 2, col: 2, word: 'तरति', translation: 'Crosses safely 🚶', isPath: true, stepOrder: 11 },
      { row: 2, col: 3, word: 'रुग्णवाहनम्', translation: 'Ambulance 🚑', isPath: true, stepOrder: 12 },
      { row: 2, col: 4, word: 'आगच्छति', translation: 'Rushes in 🚨', isPath: true, stepOrder: 13 },

      // Row 3: Vehicles move left, ambulance drives straight ahead
      { row: 3, col: 0, word: 'कन्दुकम्', translation: 'Ball (Trap)', isPath: false },
      { row: 3, col: 1, word: 'अग्रे', translation: 'Forward ⬆️', isPath: true, stepOrder: 17 },
      { row: 3, col: 2, word: 'ऋजु-मार्गेण', translation: 'Straight ahead 🧭', isPath: true, stepOrder: 16 },
      { row: 3, col: 3, word: 'वामतः', translation: 'To the Left ⬅️', isPath: true, stepOrder: 15 },
      { row: 3, col: 4, word: 'वाहनानि', translation: 'Vehicles 🚗', isPath: true, stepOrder: 14 },

      // Row 4: Speeds quickly to reach the hospital
      { row: 4, col: 0, word: 'चन्द्रः', translation: 'Moon (Trap)', isPath: false },
      { row: 4, col: 1, word: 'धावति', translation: 'Speeds on ⚡', isPath: true, stepOrder: 18 },
      { row: 4, col: 2, word: 'शीघ्रम्', translation: 'Quickly ⏱️', isPath: true, stepOrder: 19 },
      { row: 4, col: 3, word: 'चिकित्सालयम्', translation: 'To Hospital 🏥', isPath: true, stepOrder: 20 },
      { row: 4, col: 4, word: 'प्राप्नोति', translation: 'Reaches safely 🏆', isPath: true, stepOrder: 21 },
    ],
  },
];
