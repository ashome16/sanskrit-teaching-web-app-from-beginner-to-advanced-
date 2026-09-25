/**
 * Stroke-Specific Sanskrit Syllable Vocabulary Database
 *
 * For every letter in the Sanskrit Varṇamālā, provides distinct, kid-friendly
 * vocabulary words that feature that exact syllable/letter.
 * When learning stroke-by-stroke or playing the stroke puzzle, each stroke
 * connects to a unique Sanskrit word with pronunciation, transliteration,
 * and English gloss.
 */

export interface StrokeWord {
  word: string;
  transliteration: string;
  gloss: string;
  emoji: string;
}

export const STROKE_VOCABULARY: Record<string, StrokeWord[]> = {
  // ==========================================
  // SWARAS (Vowels / स्वराः)
  // ==========================================
  अ: [
    { word: 'अश्वः', transliteration: 'aśvaḥ', gloss: 'Horse', emoji: '🐴' },
    { word: 'अग्निः', transliteration: 'agniḥ', gloss: 'Fire', emoji: '🔥' },
    { word: 'अन्नम्', transliteration: 'annam', gloss: 'Food / Grain', emoji: '🌾' },
    { word: 'अमृतम्', transliteration: 'amṛtam', gloss: 'Nectar of immortality', emoji: '🍯' },
    { word: 'अरण्यम्', transliteration: 'araṇyam', gloss: 'Forest', emoji: '🌲' },
  ],
  आ: [
    { word: 'आम्रम्', transliteration: 'āmram', gloss: 'Mango', emoji: '🥭' },
    { word: 'आकाशः', transliteration: 'ākāśaḥ', gloss: 'Sky / Space', emoji: '🌌' },
    { word: 'आनन्दः', transliteration: 'ānandaḥ', gloss: 'Joy / Bliss', emoji: '😊' },
    { word: 'आश्रमः', transliteration: 'āśramaḥ', gloss: 'Hermitage', emoji: '🏡' },
  ],
  इ: [
    { word: 'इक्षुः', transliteration: 'ikṣuḥ', gloss: 'Sugarcane', emoji: '🎋' },
    { word: 'इन्द्रः', transliteration: 'indraḥ', gloss: 'King of devas', emoji: '⚡' },
    { word: 'इति', transliteration: 'iti', gloss: 'Thus / So', emoji: '📜' },
    { word: 'इन्दुः', transliteration: 'induḥ', gloss: 'Moon', emoji: '🌙' },
  ],
  ई: [
    { word: 'ईशः', transliteration: 'īśaḥ', gloss: 'Lord / Master', emoji: '🕉️' },
    { word: 'ईश्वरः', transliteration: 'īśvaraḥ', gloss: 'Supreme Being', emoji: '✨' },
    { word: 'ईहा', transliteration: 'īhā', gloss: 'Aspiration / Effort', emoji: '🎯' },
    { word: 'ईक्षणम्', transliteration: 'īkṣaṇam', gloss: 'Vision / Glancing', emoji: '👁️' },
  ],
  उ: [
    { word: 'उष्ट्रः', transliteration: 'uṣṭraḥ', gloss: 'Camel', emoji: '🐪' },
    { word: 'उद्यानम्', transliteration: 'udyānam', gloss: 'Garden', emoji: '🌺' },
    { word: 'उदयः', transliteration: 'udayaḥ', gloss: 'Sunrise / Rising', emoji: '🌅' },
    { word: 'उत्सवः', transliteration: 'utsavaḥ', gloss: 'Festival / Celebration', emoji: '🎉' },
  ],
  ऊ: [
    { word: 'ऊर्णा', transliteration: 'ūrṇā', gloss: 'Wool', emoji: '🧶' },
    { word: 'ऊर्जः', transliteration: 'ūrjaḥ', gloss: 'Vital Energy', emoji: '⚡' },
    { word: 'ऊर्मिः', transliteration: 'ūrmiḥ', gloss: 'Wave', emoji: '🌊' },
    { word: 'ऊर्ध्वम्', transliteration: 'ūrdhvam', gloss: 'Upwards', emoji: '⬆️' },
  ],
  ऋ: [
    { word: 'ऋषिः', transliteration: 'ṛṣiḥ', gloss: 'Sage / Seer', emoji: '🧘' },
    { word: 'ऋतुः', transliteration: 'ṛtuḥ', gloss: 'Season', emoji: '🌸' },
    { word: 'ऋक्षः', transliteration: 'ṛkṣaḥ', gloss: 'Bear / Celestial star', emoji: '🐻' },
    { word: 'ऋणम्', transliteration: 'ṛṇam', gloss: 'Duty / Obligation', emoji: '📜' },
  ],
  ॠ: [
    { word: 'पितॄणाम्', transliteration: 'pitṝṇām', gloss: 'Of the ancestors / fathers', emoji: '🏛️' },
    { word: 'नॄणाम्', transliteration: 'nṝṇām', gloss: 'Of men / humankind', emoji: '👥' },
    { word: 'भ्रातॄणाम्', transliteration: 'bhrātṝṇām', gloss: 'Of brothers', emoji: '🤝' },
    { word: 'मातॄणाम्', transliteration: 'mātṝṇām', gloss: 'Of mothers', emoji: '🌸' },
    { word: 'धातॄणाम्', transliteration: 'dhātṝṇām', gloss: 'Of creators / nourishers', emoji: '✨' },
  ],
  ऌ: [
    { word: 'क्लृप्तम्', transliteration: 'kḷptam', gloss: 'Formed / Arranged', emoji: '📐' },
    { word: 'ऌकारः', transliteration: 'ḷkāraḥ', gloss: 'The ऌ vowel sound', emoji: '🎶' },
    { word: 'कल्पः', transliteration: 'kalpaḥ', gloss: 'Sacred Cosmic Order', emoji: '📜' },
  ],
  ए: [
    { word: 'एणः', transliteration: 'eṇaḥ', gloss: 'Black Antelope', emoji: '🦌' },
    { word: 'एकम्', transliteration: 'ekam', gloss: 'Number One', emoji: '1️⃣' },
    { word: 'एकता', transliteration: 'ekatā', gloss: 'Unity / Togetherness', emoji: '🤝' },
    { word: 'एव', transliteration: 'eva', gloss: 'Indeed / Truly', emoji: '✨' },
  ],
  ऐ: [
    { word: 'ऐरावतः', transliteration: 'airāvataḥ', gloss: 'Celestial White Elephant', emoji: '🐘' },
    { word: 'ऐश्वर्यम्', transliteration: 'aiśvaryam', gloss: 'Divine Prosperity', emoji: '👑' },
    { word: 'ऐक्यम्', transliteration: 'aikyam', gloss: 'Harmony / Oneness', emoji: '🌟' },
  ],
  ओ: [
    { word: 'ओष्ठः', transliteration: 'oṣṭhaḥ', gloss: 'Lip', emoji: '👄' },
    { word: 'ओदनम्', transliteration: 'odanam', gloss: 'Cooked Rice', emoji: '🍚' },
    { word: 'ओजः', transliteration: 'ojaḥ', gloss: 'Vital Radiance / Vigor', emoji: '💡' },
  ],
  औ: [
    { word: 'औषधम्', transliteration: 'auṣadham', gloss: 'Healing Medicine', emoji: '🌿' },
    { word: 'औदार्यम्', transliteration: 'audāryam', gloss: 'Generosity / Nobility', emoji: '💖' },
    { word: 'औत्सुक्यम्', transliteration: 'autsukyam', gloss: 'Eager Curiosity', emoji: '🔍' },
  ],
  अं: [
    { word: 'अंशः', transliteration: 'aṃśaḥ', gloss: 'Portion / Part', emoji: '🍰' },
    { word: 'अंकुरः', transliteration: 'aṅkuraḥ', gloss: 'Sprout / Seedling', emoji: '🌱' },
    { word: 'अंगुलिः', transliteration: 'aṅguliḥ', gloss: 'Finger', emoji: '☝️' },
    { word: 'हंसः', transliteration: 'haṃsaḥ', gloss: 'Swan', emoji: '🦢' },
  ],
  अः: [
    { word: 'नमः', transliteration: 'namaḥ', gloss: 'Reverent Salutations', emoji: '🙏' },
    { word: 'मनः', transliteration: 'manaḥ', gloss: 'Mind / Consciousness', emoji: '🧠' },
    { word: 'दुःखम्', transliteration: 'duḥkham', gloss: 'Sorrow / Hardship', emoji: '🌧️' },
  ],

  // ==========================================
  // SPARSHA VARNAS (Consonants / व्यञ्जनानि)
  // ==========================================
  क: [
    { word: 'कमलम्', transliteration: 'kamalam', gloss: 'Lotus flower', emoji: '🪷' },
    { word: 'काकः', transliteration: 'kākaḥ', gloss: 'Crow', emoji: '🦅' },
    { word: 'करः', transliteration: 'karaḥ', gloss: 'Hand / Sunray', emoji: '✋' },
    { word: 'कलशः', transliteration: 'kalaśaḥ', gloss: 'Sacred water pitcher', emoji: '🏺' },
  ],
  ख: [
    { word: 'खगः', transliteration: 'khagaḥ', gloss: 'Bird / Sky-soarer', emoji: '🐦' },
    { word: 'खड्गः', transliteration: 'khaḍgaḥ', gloss: 'Sword', emoji: '⚔️' },
    { word: 'खट्वा', transliteration: 'khaṭvā', gloss: 'Bed / Cot', emoji: '🛏️' },
  ],
  ग: [
    { word: 'गजः', transliteration: 'gajaḥ', gloss: 'Elephant', emoji: '🐘' },
    { word: 'गुरुः', transliteration: 'guruḥ', gloss: 'Teacher / Guide', emoji: '🧑‍🏫' },
    { word: 'गङ्गा', transliteration: 'gaṅgā', gloss: 'River Ganga', emoji: '🌊' },
    { word: 'गौः', transliteration: 'gauḥ', gloss: 'Sacred Cow', emoji: '🐄' },
  ],
  घ: [
    { word: 'घटः', transliteration: 'ghaṭaḥ', gloss: 'Earthen pot', emoji: '🏺' },
    { word: 'घण्टा', transliteration: 'ghaṇṭā', gloss: 'Temple bell', emoji: '🔔' },
    { word: 'घृतम्', transliteration: 'ghṛtam', gloss: 'Clarified butter (ghee)', emoji: '🧈' },
    { word: 'घनः', transliteration: 'ghanaḥ', gloss: 'Raincloud', emoji: '☁️' },
  ],
  ङ: [
    { word: 'अङ्गम्', transliteration: 'aṅgam', gloss: 'Limb / Body', emoji: '🧍' },
    { word: 'शङ्खः', transliteration: 'śaṅkhaḥ', gloss: 'Sacred conch', emoji: '🐚' },
    { word: 'गङ्गा', transliteration: 'gaṅgā', gloss: 'Ganga', emoji: '🌊' },
    { word: 'पङ्कजम्', transliteration: 'paṅkajam', gloss: 'Lotus born of mud', emoji: '🪷' },
  ],
  च: [
    { word: 'चक्रम्', transliteration: 'cakram', gloss: 'Wheel / Discus', emoji: '☸️' },
    { word: 'चन्द्रः', transliteration: 'candraḥ', gloss: 'Moon', emoji: '🌙' },
    { word: 'चित्रम्', transliteration: 'citram', gloss: 'Picture / Art', emoji: '🖼️' },
    { word: 'चषकः', transliteration: 'caṣakaḥ', gloss: 'Cup / Goblet', emoji: '🍵' },
  ],
  छ: [
    { word: 'छत्रम्', transliteration: 'chatram', gloss: 'Umbrella / Parasol', emoji: '☂️' },
    { word: 'छात्रः', transliteration: 'chātraḥ', gloss: 'Student / Learner', emoji: '🎒' },
    { word: 'छाया', transliteration: 'chāyā', gloss: 'Shadow / Shade', emoji: '🌳' },
  ],
  ज: [
    { word: 'जलम्', transliteration: 'jalam', gloss: 'Water', emoji: '💧' },
    { word: 'जगत्', transliteration: 'jagat', gloss: 'World / Universe', emoji: '🌍' },
    { word: 'जम्बूः', transliteration: 'jambūḥ', gloss: 'Rose-apple', emoji: '🫐' },
    { word: 'जीवः', transliteration: 'jīvaḥ', gloss: 'Living soul', emoji: '🕊️' },
  ],
  झ: [
    { word: 'झषः', transliteration: 'jhaṣaḥ', gloss: 'Fish', emoji: '🐟' },
    { word: 'झरी', transliteration: 'jharī', gloss: 'Mountain waterfall', emoji: '🏞️' },
    { word: 'झम्पा', transliteration: 'jhampā', gloss: 'Joyful leap', emoji: '🤾' },
  ],
  ञ: [
    { word: 'पञ्च', transliteration: 'pañca', gloss: 'Number Five', emoji: '5️⃣' },
    { word: 'ज्ञानम्', transliteration: 'jñānam', gloss: 'Spiritual knowledge', emoji: '📖' },
    { word: 'कुञ्जरः', transliteration: 'kuñjaraḥ', gloss: 'Royal elephant', emoji: '🐘' },
    { word: 'अञ्जलिः', transliteration: 'añjaliḥ', gloss: 'Folded hands offering', emoji: '🙏' },
  ],
  ट: [
    { word: 'टङ्कः', transliteration: 'ṭaṅkaḥ', gloss: 'Stone chisel / Axe', emoji: '🪓' },
    { word: 'पटः', transliteration: 'paṭaḥ', gloss: 'Woven cloth', emoji: '📜' },
    { word: 'कटः', transliteration: 'kaṭaḥ', gloss: 'Grass mat', emoji: '🛖' },
  ],
  ठ: [
    { word: 'ठक्कुरः', transliteration: 'ṭhakkuraḥ', gloss: 'Deity / Elder', emoji: '🛕' },
    { word: 'कण्ठः', transliteration: 'kaṇṭhaḥ', gloss: 'Throat / Voice', emoji: '🗣️' },
    { word: 'पाठः', transliteration: 'pāṭhaḥ', gloss: 'Reading lesson', emoji: '📚' },
  ],
  ड: [
    { word: 'डमरुः', transliteration: 'ḍamaruḥ', gloss: 'Shiva’s hour-glass drum', emoji: '🥁' },
    { word: 'दण्डः', transliteration: 'daṇḍaḥ', gloss: 'Walking staff', emoji: '🦯' },
    { word: 'खण्डः', transliteration: 'khaṇḍaḥ', gloss: 'Segment / Piece', emoji: '🧩' },
  ],
  ढ: [
    { word: 'ढक्का', transliteration: 'ḍhakkā', gloss: 'Ceremonial kettle drum', emoji: '🪘' },
    { word: 'गूढः', transliteration: 'gūḍhaḥ', gloss: 'Hidden mystery', emoji: '🗝️' },
    { word: 'दृढम्', transliteration: 'dṛḍham', gloss: 'Steadfast / Resolute', emoji: '🗿' },
  ],
  ण: [
    { word: 'बाणः', transliteration: 'bāṇaḥ', gloss: 'Archer’s arrow', emoji: '🏹' },
    { word: 'वीणा', transliteration: 'vīṇā', gloss: 'Saraswati’s lute', emoji: '🪕' },
    { word: 'ज्ञानम्', transliteration: 'jñānam', gloss: 'Wisdom', emoji: '📜' },
    { word: 'किरणः', transliteration: 'kiraṇaḥ', gloss: 'Sunbeam / Ray', emoji: '☀️' },
  ],
  त: [
    { word: 'तरुः', transliteration: 'taruḥ', gloss: 'Living Tree', emoji: '🌳' },
    { word: 'तोयम्', transliteration: 'toyam', gloss: 'Pure water', emoji: '💧' },
    { word: 'तालः', transliteration: 'tālaḥ', gloss: 'Musical rhythm', emoji: '🎵' },
  ],
  थ: [
    { word: 'थकारः', transliteration: 'thakāraḥ', gloss: 'The letter sound "tha"', emoji: '🗣️' },
    { word: 'रथः', transliteration: 'rathaḥ', gloss: 'Chariot', emoji: '🏎️' },
    { word: 'पथः', transliteration: 'pathaḥ', gloss: 'Sacred pathway', emoji: '🛤️' },
  ],
  द: [
    { word: 'दन्तः', transliteration: 'dantaḥ', gloss: 'Tooth / Elephant tusk', emoji: '🦷' },
    { word: 'दीपः', transliteration: 'dīpaḥ', gloss: 'Golden lamp', emoji: '🪔' },
    { word: 'दानम्', transliteration: 'dānam', gloss: 'Virtuous giving', emoji: '🎁' },
  ],
  ध: [
    { word: 'धनुः', transliteration: 'dhanuḥ', gloss: 'Mighty bow', emoji: '🏹' },
    { word: 'धर्मः', transliteration: 'dharmaḥ', gloss: 'Righteous conduct', emoji: '⚖️' },
    { word: 'धनम्', transliteration: 'dhanam', gloss: 'Wealth / Value', emoji: '💰' },
  ],
  न: [
    { word: 'नदी', transliteration: 'nadī', gloss: 'Flowing river', emoji: '🏞️' },
    { word: 'नेत्रम्', transliteration: 'netram', gloss: 'Eye', emoji: '👁️' },
    { word: 'नौका', transliteration: 'naukā', gloss: 'Boat', emoji: '⛵' },
    { word: 'नक्षत्रम्', transliteration: 'nakṣatram', gloss: 'Star in night sky', emoji: '⭐' },
  ],
  प: [
    { word: 'पत्रम्', transliteration: 'patram', gloss: 'Green leaf', emoji: '🍃' },
    { word: 'पुष्पम्', transliteration: 'puṣpam', gloss: 'Blossoming flower', emoji: '🌸' },
    { word: 'पादः', transliteration: 'pādaḥ', gloss: 'Footstep', emoji: '👣' },
  ],
  फ: [
    { word: 'फलम्', transliteration: 'phalam', gloss: 'Sweet fruit', emoji: '🍎' },
    { word: 'फेनः', transliteration: 'phenaḥ', gloss: 'River foam', emoji: '🧼' },
    { word: 'फणी', transliteration: 'phaṇī', gloss: 'Hooded serpent', emoji: '🐍' },
  ],
  ब: [
    { word: 'बकः', transliteration: 'bakaḥ', gloss: 'White crane', emoji: '🦩' },
    { word: 'बालः', transliteration: 'bālaḥ', gloss: 'Child / Young boy', emoji: '👦' },
    { word: 'बलम्', transliteration: 'balam', gloss: 'Inner strength', emoji: '💪' },
  ],
  भ: [
    { word: 'भल्लूकः', transliteration: 'bhallūkaḥ', gloss: 'Forest bear', emoji: '🐻' },
    { word: 'भवनम्', transliteration: 'bhavanam', gloss: 'Home / Mansion', emoji: '🏛️' },
    { word: 'भानुः', transliteration: 'bhānuḥ', gloss: 'Shining sun', emoji: '☀️' },
  ],
  म: [
    { word: 'मयूरः', transliteration: 'mayūraḥ', gloss: 'Dancing peacock', emoji: '🦚' },
    { word: 'माता', transliteration: 'mātā', gloss: 'Mother', emoji: '👩‍👧' },
    { word: 'मित्रम्', transliteration: 'mitram', gloss: 'Loving friend', emoji: '🤝' },
    { word: 'माला', transliteration: 'mālā', gloss: 'Garland of blossoms', emoji: '📿' },
  ],
  य: [
    { word: 'यज्ञः', transliteration: 'yajñaḥ', gloss: 'Sacred fire ritual', emoji: '🔥' },
    { word: 'योगः', transliteration: 'yogaḥ', gloss: 'Mindfulness & Union', emoji: '🧘' },
    { word: 'यानम्', transliteration: 'yānam', gloss: 'Vehicle / Journey', emoji: '🛸' },
  ],
  र: [
    { word: 'रथः', transliteration: 'rathaḥ', gloss: 'Royal chariot', emoji: '🛞' },
    { word: 'रविः', transliteration: 'raviḥ', gloss: 'Sun God', emoji: '☀️' },
    { word: 'रजतः', transliteration: 'rajataḥ', gloss: 'Bright silver', emoji: '🪙' },
  ],
  ल: [
    { word: 'लता', transliteration: 'latā', gloss: 'Flowering vine', emoji: '🌿' },
    { word: 'लोकः', transliteration: 'lokaḥ', gloss: 'World / Universe', emoji: '🌐' },
    { word: 'लेखनी', transliteration: 'lekhanī', gloss: 'Writing pen', emoji: '✒️' },
  ],
  व: [
    { word: 'वृक्षः', transliteration: 'vṛkṣaḥ', gloss: 'Banyan tree', emoji: '🌳' },
    { word: 'वाणी', transliteration: 'vāṇī', gloss: 'Sweet voice / Speech', emoji: '💬' },
    { word: 'वरम्', transliteration: 'varam', gloss: 'Divine boon / Blessing', emoji: '✨' },
  ],
  श: [
    { word: 'शुकः', transliteration: 'śukaḥ', gloss: 'Bright green parrot', emoji: '🦜' },
    { word: 'शङ्खः', transliteration: 'śaṅkhaḥ', gloss: 'Spiritual conch', emoji: '🐚' },
    { word: 'शान्तिः', transliteration: 'śāntiḥ', gloss: 'Inner peace', emoji: '🕊️' },
  ],
  ष: [
    { word: 'षण्मुखः', transliteration: 'ṣaṇmukhaḥ', gloss: 'Six-faced leader Kartikeya', emoji: '🦚' },
    { word: 'षट्', transliteration: 'ṣaṭ', gloss: 'Number Six', emoji: '6️⃣' },
    { word: 'ऋषिः', transliteration: 'ṛṣiḥ', gloss: 'Sage', emoji: '🧘' },
  ],
  स: [
    { word: 'सर्पः', transliteration: 'sarpaḥ', gloss: 'Serpent', emoji: '🐍' },
    { word: 'सूर्यः', transliteration: 'sūryaḥ', gloss: 'Golden Sun', emoji: '☀️' },
    { word: 'समुद्रः', transliteration: 'samudraḥ', gloss: 'Deep Ocean', emoji: '🌊' },
  ],
  ह: [
    { word: 'हंसः', transliteration: 'haṃsaḥ', gloss: 'Graceful swan', emoji: '🦢' },
    { word: 'हस्तः', transliteration: 'hastaḥ', gloss: 'Helping hand', emoji: '✋' },
    { word: 'हरिः', transliteration: 'hariḥ', gloss: 'Ray of light / Lord', emoji: '🌟' },
  ],
  क्ष: [
    { word: 'क्षत्रियः', transliteration: 'kṣatriyaḥ', gloss: 'Protector / Warrior', emoji: '🛡️' },
    { word: 'क्षेत्रम्', transliteration: 'kṣetram', gloss: 'Sacred field / Place', emoji: '🌾' },
    { word: 'क्षमा', transliteration: 'kṣamā', gloss: 'Patience & Forgiveness', emoji: '🕊️' },
  ],
  त्र: [
    { word: 'त्रिशूलम्', transliteration: 'triśūlam', gloss: 'Three-pointed trident', emoji: '🔱' },
    { word: 'त्रिभुवनम्', transliteration: 'tribhuvanam', gloss: 'Three cosmic realms', emoji: '🌌' },
    { word: 'मित्रम्', transliteration: 'mitram', gloss: 'Faithful companion', emoji: '🤝' },
  ],
  ज्ञ: [
    { word: 'ज्ञानम्', transliteration: 'jñānam', gloss: 'Spiritual wisdom', emoji: '📖' },
    { word: 'ज्ञानी', transliteration: 'jñānī', gloss: 'Enlightened seeker', emoji: '🧘' },
    { word: 'जिज्ञासा', transliteration: 'jijñāsā', gloss: 'Curiosity to learn', emoji: '🔍' },
  ],
  श्र: [
    { word: 'श्रीफलम्', transliteration: 'śrīphalam', gloss: 'Auspicious coconut', emoji: '🥥' },
    { word: 'श्रमः', transliteration: 'śramaḥ', gloss: 'Diligent effort', emoji: '🛠️' },
    { word: 'श्रद्धा', transliteration: 'śraddhā', gloss: 'Sincere faith & dedication', emoji: '💖' },
  ],
};

/**
 * Returns the list of vocabulary words featuring this letter / syllable.
 */
export function getStrokeWordsForLetter(letter: string): StrokeWord[] {
  const clean = letter.trim();
  if (STROKE_VOCABULARY[clean]?.length) {
    return STROKE_VOCABULARY[clean];
  }
  // Fallback to a single generic representation if missing
  return [
    {
      word: clean,
      transliteration: clean,
      gloss: `Syllable "${clean}"`,
      emoji: '🔤',
    },
  ];
}

/**
 * Returns a specific vocabulary word for stroke at index (0-based).
 * Automatically wraps if stroke index exceeds vocabulary count.
 */
export function getStrokeWord(letter: string, strokeIndex: number): StrokeWord {
  const words = getStrokeWordsForLetter(letter);
  if (!words.length) {
    return {
      word: letter,
      transliteration: letter,
      gloss: `Syllable ${letter}`,
      emoji: '🔤',
    };
  }
  const safeIdx = Math.max(0, strokeIndex) % words.length;
  return words[safeIdx];
}
