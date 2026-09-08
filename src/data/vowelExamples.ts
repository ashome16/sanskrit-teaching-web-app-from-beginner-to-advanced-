import { isBarakhadiAkshara } from '../utils/barakhadiPhonetics';

/** Kid-familiar words that showcase each independent vowel / letter sound. */
export type VowelExample = { word: string; gloss: string };

export const INDEPENDENT_VOWELS = new Set([
  'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः', 'अँ',
]);

export const isIndependentVowel = (value: string): boolean => {
  const clean = value.normalize('NFC').trim();
  return INDEPENDENT_VOWELS.has(clean);
};

export const VOWEL_EXAMPLES: Record<string, VowelExample[]> = {
  'अ': [{ word: 'अग्निः', gloss: 'fire' }, { word: 'अश्वः', gloss: 'horse' }, { word: 'अन्नम्', gloss: 'food/grain' }],
  'आ': [{ word: 'आकाशः', gloss: 'sky' }, { word: 'माता', gloss: 'mother' }, { word: 'बालः', gloss: 'child' }],
  'इ': [{ word: 'गिरिः', gloss: 'mountain' }, { word: 'मित्रम्', gloss: 'friend' }, { word: 'सिंहः', gloss: 'lion' }],
  'ई': [{ word: 'नदी', gloss: 'river' }, { word: 'सीता', gloss: 'Sita' }, { word: 'गीतम्', gloss: 'song' }],
  'उ': [{ word: 'गुरुः', gloss: 'teacher' }, { word: 'पुत्रः', gloss: 'son' }, { word: 'मुखम्', gloss: 'face/mouth' }],
  'ऊ': [{ word: 'ऊनम्', gloss: 'less / short' }, { word: 'कूर्मः', gloss: 'tortoise' }, { word: 'मूलम्', gloss: 'root' }],
  'ऋ': [{ word: 'ऋषिः', gloss: 'sage' }, { word: 'वृक्षः', gloss: 'tree' }, { word: 'कृष्णः', gloss: 'Krishna' }],
  'ॠ': [{ word: 'पितॄणाम्', gloss: 'of the fathers' }, { word: 'नॄणाम्', gloss: 'of men' }],
  'ऌ': [{ word: 'क्लृप्तम्', gloss: 'arranged' }],
  'ए': [{ word: 'देवः', gloss: 'god' }, { word: 'मेघः', gloss: 'cloud' }, { word: 'एकः', gloss: 'one' }],
  'ऐ': [{ word: 'ऐश्वर्यम्', gloss: 'prosperity' }, { word: 'नैतिकः', gloss: 'moral' }, { word: 'कैलासः', gloss: 'Kailasa' }],
  'ओ': [{ word: 'गोः', gloss: 'cow' }, { word: 'तोयम्', gloss: 'water' }, { word: 'लोकः', gloss: 'world' }],
  'औ': [{ word: 'औषधम्', gloss: 'medicine' }, { word: 'गौः', gloss: 'cow' }, { word: 'नौका', gloss: 'boat' }],
  'अं': [{ word: 'अंशः', gloss: 'part' }, { word: 'हंसः', gloss: 'swan' }],
  'अः': [{ word: 'नमः', gloss: 'bow/salutation' }, { word: 'मनः', gloss: 'mind' }],
};

/** Consonant tiles (Varṇamālā) — familiar words that carry the sound. */
export const CONSONANT_EXAMPLES: Record<string, VowelExample[]> = {
  'क': [
    { word: 'कमलम्', gloss: 'lotus' },
    { word: 'काकः', gloss: 'crow' },
    { word: 'करः', gloss: 'hand' },
  ],
  'ख': [
    { word: 'खगः', gloss: 'bird' },
    { word: 'मुखम्', gloss: 'face / mouth' },
    { word: 'दुःखम्', gloss: 'sorrow' },
  ],
  'ग': [
    { word: 'गजः', gloss: 'elephant' },
    { word: 'गुरुः', gloss: 'teacher' },
    { word: 'गङ्गा', gloss: 'Ganga' },
  ],
  'घ': [
    { word: 'घनः', gloss: 'solid/cube' },
    { word: 'घरम्', gloss: 'house' },
    { word: 'घटः', gloss: 'pot' },
    { word: 'मेघः', gloss: 'cloud' },
    { word: 'घृतम्', gloss: 'ghee' },
  ],
  'ङ': [
    { word: 'अङ्गम्', gloss: 'limb / body' },
    { word: 'गङ्गा', gloss: 'Ganga' },
    { word: 'रङ्गः', gloss: 'color / stage' },
    { word: 'शङ्खः', gloss: 'conch' },
    { word: 'अङ्कुरः', gloss: 'sprout' },
    { word: 'पङ्कजम्', gloss: 'lotus (mud-born)' },
    { word: 'सङ्गीतम्', gloss: 'music' },
  ],
  'च': [
    { word: 'चन्द्रः', gloss: 'moon' },
    { word: 'चक्रम्', gloss: 'wheel' },
    { word: 'चित्रम्', gloss: 'picture' },
  ],
  'छ': [
    { word: 'छात्रः', gloss: 'student' },
    { word: 'छत्रम्', gloss: 'umbrella' },
    { word: 'छाया', gloss: 'shadow' },
  ],
  'ज': [
    { word: 'जलम्', gloss: 'water' },
    { word: 'जगत्', gloss: 'world' },
    { word: 'राजः', gloss: 'king' },
  ],
  'झ': [
    { word: 'झण्डा', gloss: 'flag' },
    { word: 'झूला', gloss: 'swing' },
    { word: 'झरी', gloss: 'waterfall' },
  ],
  'ञ': [
    { word: 'पञ्च', gloss: 'five' },
    { word: 'ज्ञानम्', gloss: 'knowledge' },
    { word: 'अञ्जलिः', gloss: 'joined palms' },
    { word: 'अञ्जनम्', gloss: 'collyrium / kajal' },
    { word: 'कुञ्जरः', gloss: 'elephant' },
    { word: 'मञ्जरी', gloss: 'blossom cluster' },
    { word: 'किञ्चित्', gloss: 'a little' },
  ],
  'ट': [
    { word: 'पटः', gloss: 'cloth' },
    { word: 'कटः', gloss: 'mat' },
    { word: 'वाटिका', gloss: 'garden' },
  ],
  'ठ': [
    { word: 'पाठः', gloss: 'lesson' },
    { word: 'कण्ठः', gloss: 'throat' },
    { word: 'कठिनम्', gloss: 'hard / difficult' },
  ],
  'ड': [
    { word: 'अण्डम्', gloss: 'egg' },
    { word: 'डमरुः', gloss: 'small drum' },
    { word: 'नाडी', gloss: 'pulse / channel' },
  ],
  'ढ': [
    { word: 'दृढम्', gloss: 'firm' },
    { word: 'गूढम्', gloss: 'hidden' },
    { word: 'गाढम्', gloss: 'intense / deep' },
  ],
  'ण': [
    { word: 'गणः', gloss: 'group' },
    { word: 'कर्णः', gloss: 'ear' },
    { word: 'वेणुः', gloss: 'flute' },
  ],
  'त': [
    { word: 'तातः', gloss: 'father' },
    { word: 'तरुः', gloss: 'tree' },
    { word: 'तारा', gloss: 'star' },
  ],
  'थ': [
    { word: 'कथा', gloss: 'story' },
    { word: 'पथः', gloss: 'path' },
    { word: 'अथवा', gloss: 'or' },
  ],
  'द': [
    { word: 'देवः', gloss: 'god' },
    { word: 'दधि', gloss: 'yogurt' },
    { word: 'दुग्धम्', gloss: 'milk' },
  ],
  'ध': [
    { word: 'धर्मः', gloss: 'duty / dharma' },
    { word: 'धनुः', gloss: 'bow' },
    { word: 'धनम्', gloss: 'wealth' },
  ],
  'न': [
    { word: 'नदी', gloss: 'river' },
    { word: 'नरः', gloss: 'man' },
    { word: 'नयनम्', gloss: 'eye' },
  ],
  'प': [
    { word: 'पत्रम्', gloss: 'leaf / letter' },
    { word: 'पद्मम्', gloss: 'lotus' },
    { word: 'पुत्रः', gloss: 'son' },
  ],
  'फ': [
    { word: 'फलम्', gloss: 'fruit' },
    { word: 'फणिः', gloss: 'cobra' },
    { word: 'फेनम्', gloss: 'foam' },
  ],
  'ब': [
    { word: 'बालः', gloss: 'child' },
    { word: 'बलम्', gloss: 'strength' },
    { word: 'बकः', gloss: 'crane (bird)' },
  ],
  'भ': [
    { word: 'भूमिः', gloss: 'earth' },
    { word: 'भानुः', gloss: 'sun' },
    { word: 'भक्तः', gloss: 'devotee' },
  ],
  'म': [
    { word: 'माता', gloss: 'mother' },
    { word: 'मित्रम्', gloss: 'friend' },
    { word: 'मुखम्', gloss: 'face / mouth' },
  ],
  'य': [
    { word: 'यज्ञः', gloss: 'ritual' },
    { word: 'यमः', gloss: 'Yama' },
    { word: 'यन्त्रम्', gloss: 'machine' },
  ],
  'र': [
    { word: 'रामः', gloss: 'Rama' },
    { word: 'रविः', gloss: 'sun' },
    { word: 'रथः', gloss: 'chariot' },
  ],
  'ल': [
    { word: 'लता', gloss: 'creeper' },
    { word: 'लोकः', gloss: 'world' },
    { word: 'लालः', gloss: 'dear one' },
  ],
  'व': [
    { word: 'वनम्', gloss: 'forest' },
    { word: 'वायुः', gloss: 'wind' },
    { word: 'वानरः', gloss: 'monkey' },
  ],
  'श': [
    { word: 'शशिः', gloss: 'moon' },
    { word: 'शङ्खः', gloss: 'conch' },
    { word: 'शिष्यः', gloss: 'student' },
  ],
  'ष': [
    { word: 'षट्', gloss: 'six' },
    { word: 'विषम्', gloss: 'poison' },
    { word: 'पुरुषः', gloss: 'person / man' },
  ],
  'स': [
    { word: 'सूर्यः', gloss: 'sun' },
    { word: 'सरः', gloss: 'lake' },
    { word: 'सिंहः', gloss: 'lion' },
  ],
  'ह': [
    { word: 'हस्तः', gloss: 'hand' },
    { word: 'हंसः', gloss: 'swan' },
    { word: 'हरिः', gloss: 'Hari' },
  ],
  'क्ष': [
    { word: 'क्षेत्रम्', gloss: 'field' },
    { word: 'लक्ष्मीः', gloss: 'Lakshmi' },
    { word: 'वृक्षः', gloss: 'tree' },
  ],
  'त्र': [
    { word: 'नेत्रम्', gloss: 'eye' },
    { word: 'मित्रम्', gloss: 'friend' },
    { word: 'सूत्रम्', gloss: 'thread / rule' },
  ],
  'ज्ञ': [
    { word: 'ज्ञानम्', gloss: 'knowledge' },
    { word: 'यज्ञः', gloss: 'ritual' },
    { word: 'विज्ञानम्', gloss: 'science' },
  ],
};

/** बारहखड़ी matra tiles — words that contain THIS akṣara (का ≠ क). */
export const BARAKHADI_EXAMPLES: Record<string, VowelExample[]> = {
  'का': [{ word: 'काकः', gloss: 'crow' }, { word: 'कार्यम्', gloss: 'work' }, { word: 'आकाशः', gloss: 'sky' }],
  'कि': [{ word: 'किरणः', gloss: 'ray of light' }, { word: 'किम्', gloss: 'what' }, { word: 'किसलयम्', gloss: 'tender leaf' }],
  'की': [{ word: 'कीटः', gloss: 'insect' }, { word: 'कीर्तिः', gloss: 'fame' }, { word: 'कीर्तनम्', gloss: 'singing praise' }],
  'कु': [{ word: 'कुसुमम्', gloss: 'flower' }, { word: 'कुम्भः', gloss: 'pot' }, { word: 'कुक्कुरः', gloss: 'dog' }],
  'कू': [{ word: 'कूर्मः', gloss: 'tortoise' }, { word: 'कूपः', gloss: 'well' }, { word: 'कूटः', gloss: 'peak' }],
  'कृ': [{ word: 'कृष्णः', gloss: 'Krishna' }, { word: 'कृषिः', gloss: 'farming' }, { word: 'कृमिः', gloss: 'worm' }],
  'के': [{ word: 'केशः', gloss: 'hair' }, { word: 'केलिः', gloss: 'play' }, { word: 'केन्द्रम्', gloss: 'centre' }],
  'कै': [{ word: 'कैलासः', gloss: 'Kailasa' }, { word: 'कैकेयी', gloss: 'Kaikeyi' }, { word: 'कैवर्तः', gloss: 'fisher' }],
  'को': [{ word: 'कोकिलः', gloss: 'cuckoo' }, { word: 'कोपः', gloss: 'anger' }, { word: 'कोशः', gloss: 'treasury' }],
  'कौ': [{ word: 'कौशलम्', gloss: 'skill' }, { word: 'कौशिकः', gloss: 'owl / Kaushika' }, { word: 'कौस्तुभः', gloss: 'Kaustubha jewel' }],
  'कं': [{ word: 'कंसः', gloss: 'Kamsa' }, { word: 'कंबलः', gloss: 'blanket' }, { word: 'अंकः', gloss: 'number' }],
  'कः': [{ word: 'कः', gloss: 'who' }, { word: 'बालकः', gloss: 'boy' }, { word: 'नायकः', gloss: 'hero' }],
  'ख': [{ word: 'खगः', gloss: 'bird' }, { word: 'खड्गः', gloss: 'sword' }, { word: 'खट्वा', gloss: 'cot / bed' }],
  'खा': [{ word: 'खादति', gloss: 'eats' }, { word: 'शाखा', gloss: 'branch' }, { word: 'खातम्', gloss: 'pit / pond' }],
  'खि': [{ word: 'शिखी', gloss: 'peacock' }, { word: 'लेखिका', gloss: 'writer' }, { word: 'खिन्नः', gloss: 'sad / tired' }],
  'खी': [{ word: 'सखी', gloss: 'friend (girl)' }, { word: 'सुखी', gloss: 'happy' }, { word: 'नखी', gloss: 'clawed' }],
  'खु': [{ word: 'खुरः', gloss: 'hoof' }, { word: 'आखुः', gloss: 'mouse' }],
  'खू': [
    { word: 'खूर्दति', gloss: 'jumps / plays (kid verb)' },
  ],
  // खृ: almost no everyday Sanskrit lexeme — teaching placeholder so Analyse is not blank
  'खृ': [
    { word: 'खृ', gloss: 'rare akṣara — few everyday words · Aryabhata number 20,00,000' },
  ],
  'खे': [{ word: 'खेलति', gloss: 'plays' }, { word: 'लेखः', gloss: 'a writing' }, { word: 'मुखेन', gloss: 'by the mouth' }],
  'खै': [
    { word: 'नखैः', gloss: 'with nails / claws' },
    { word: 'सुखैः', gloss: 'with joys / comforts' },
    { word: 'मुखैः', gloss: 'with faces / mouths' },
  ],
  'खो': [
    { word: 'खोदति', gloss: 'digs (in the ground)' },
    { word: 'शिखोपरि', gloss: 'on the peak / crest' },
    { word: 'मुखो', gloss: 'face (before sandhi vowel)' },
  ],
  'खौ': [
    { word: 'नखौ', gloss: 'two nails (a pair)' },
    { word: 'शिखौ', gloss: 'two crests / peaks' },
  ],
  'खं': [{ word: 'खं', gloss: 'sky / space' }, { word: 'सुखं', gloss: 'happiness' }],
  'खः': [{ word: 'नखः', gloss: 'nail' }, { word: 'शिखः', gloss: 'crest / flame-tip' }],
  // ग-row (bare ग stays in CONSONANT_EXAMPLES)
  'गा': [{ word: 'गानम्', gloss: 'song' }, { word: 'गावः', gloss: 'cows' }, { word: 'गंगा', gloss: 'Ganga' }],
  'गि': [{ word: 'गिरिः', gloss: 'mountain' }, { word: 'गिरिशः', gloss: 'lord of mountains (Shiva)' }],
  'गी': [{ word: 'गीतम्', gloss: 'song' }, { word: 'गीता', gloss: 'Gita' }],
  'गु': [{ word: 'गुरुः', gloss: 'teacher' }, { word: 'गुणः', gloss: 'quality / virtue' }],
  'गू': [{ word: 'गूढम्', gloss: 'hidden' }],
  'गृ': [{ word: 'गृहम्', gloss: 'home' }, { word: 'गृध्रः', gloss: 'vulture' }, { word: 'गृहिणी', gloss: 'lady of the house' }],
  'गे': [{ word: 'गेहम्', gloss: 'house' }, { word: 'गेयम्', gloss: 'to be sung' }],
  'गै': [{ word: 'गैरिकम्', gloss: 'red ochre' }, { word: 'स्वर्गैः', gloss: 'by the heavens' }],
  'गो': [{ word: 'गोपालः', gloss: 'cowherd / Krishna' }, { word: 'गोमयम्', gloss: 'cow-dung' }, { word: 'गोः', gloss: 'cow' }],
  'गौ': [{ word: 'गौः', gloss: 'cow' }, { word: 'गौरवम्', gloss: 'honour / glory' }],
  'गं': [{ word: 'गंगा', gloss: 'Ganga' }, { word: 'गंधः', gloss: 'fragrance' }],
  'गः': [{ word: 'नागः', gloss: 'serpent / naga' }, { word: 'भागः', gloss: 'share / portion' }, { word: 'योगः', gloss: 'yoga / union' }],
  // घ-row (bare घ stays in CONSONANT_EXAMPLES)
  'घा': [{ word: 'घाटः', gloss: 'river bank / landing' }, { word: 'आघातः', gloss: 'blow / impact' }, { word: 'घातः', gloss: 'strike / blow' }],
  'घि': [{ word: 'दीर्घिका', gloss: 'pond / long pool' }, { word: 'परिघिः', gloss: 'rim / circumference (rare)' }],
  'घी': [{ word: 'घी', gloss: 'ghee (clarified butter)' }, { word: 'दीर्घी', gloss: 'long (feminine)' }],
  'घु': [{ word: 'घुणः', gloss: 'wood-insect' }, { word: 'घुसृणम्', gloss: 'saffron' }],
  'घू': [{ word: 'घूकः', gloss: 'owl' }],
  'घृ': [{ word: 'घृतम्', gloss: 'ghee' }, { word: 'घृणा', gloss: 'disgust / aversion' }],
  // घे / घै / घौ: few headwords — case / dual forms (same pattern as खे / खै / खौ)
  'घे': [{ word: 'मेघेन', gloss: 'by the cloud' }, { word: 'संघेन', gloss: 'by the group' }],
  'घै': [{ word: 'मेघैः', gloss: 'with clouds' }, { word: 'संघैः', gloss: 'with groups' }],
  'घो': [{ word: 'घोषः', gloss: 'roar / loud sound' }, { word: 'घोटकः', gloss: 'horse' }],
  'घौ': [{ word: 'मेघौ', gloss: 'two clouds' }, { word: 'संघौ', gloss: 'two groups' }],
  'घं': [{ word: 'घंटा', gloss: 'bell' }, { word: 'संघं', gloss: 'group / union (object form)' }],
  'घः': [{ word: 'मेघः', gloss: 'cloud' }, { word: 'संघः', gloss: 'group / union' }, { word: 'उल्लाघः', gloss: 'recovered / healthy' }],
  // cache-bust 2026-09-08b
  // ङ-row — exact akṣara only here. Everyday Sanskrit almost never has open
  // ङा/ङि/…; family kid-words with ङ् live in BARAKHADI_RELATED (not "exact letter").
  'ङ': [
    { word: 'अङ्गम्', gloss: 'limb / body' },
    { word: 'गङ्गा', gloss: 'Ganga' },
    { word: 'रङ्गः', gloss: 'color / stage' },
    { word: 'शङ्खः', gloss: 'conch' },
    { word: 'अङ्कुरः', gloss: 'sprout' },
    { word: 'पङ्कजम्', gloss: 'lotus (mud-born)' },
    { word: 'सङ्गीतम्', gloss: 'music' },
  ],
  // Self-tile teaching placeholders (exact empty of real lexemes) — card uses RELATED.
  'ङा': [{ word: 'ङा', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' }],
  'ङि': [{ word: 'ङि', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' }],
  'ङी': [{ word: 'ङी', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' }],
  // ङु: Dhātupāṭha root (ṅavate "to sound") — self exact; related list still shown.
  'ङु': [{ word: 'ङु', gloss: 'to sound (verbal root)' }],
  'ङू': [{ word: 'ङू', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' }],
  'ङृ': [{ word: 'ङृ', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' }],
  'ङे': [{ word: 'ङे', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' }],
  'ङै': [{ word: 'ङै', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' }],
  'ङो': [{ word: 'ङो', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' }],
  'ङौ': [{ word: 'ङौ', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' }],
  'ङं': [{ word: 'ङं', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' }],
  // ङः: lexicon headword (Medinī / MW) — self exact; related list still shown.
  'ङः': [{ word: 'ङः', gloss: 'object of sense / Bhairava (lexicon)' }],
  // च-row (bare च stays in CONSONANT_EXAMPLES)
  'चा': [{ word: 'चातकः', gloss: 'cātaka bird' }, { word: 'वाचा', gloss: 'by speech / with words' }, { word: 'आचारः', gloss: 'conduct / good manners' }],
  'चि': [{ word: 'चित्रम्', gloss: 'picture' }, { word: 'चिन्ता', gloss: 'thought / worry' }, { word: 'अचिरम्', gloss: 'soon / not long' }],
  'ची': [{ word: 'चीरम्', gloss: 'bark cloth / rag' }, { word: 'चीवरम्', gloss: "monk's robe" }, { word: 'वाची', gloss: 'speaker / eloquent' }],
  'चु': [{ word: 'चुम्बति', gloss: 'kisses' }, { word: 'चुलुकः', gloss: 'palmful of water' }, { word: 'चुक्रम्', gloss: 'tamarind / sour' }],
  'चू': [{ word: 'चूडः', gloss: 'topknot / crest' }, { word: 'चूतम्', gloss: 'mango' }, { word: 'चूडामणिः', gloss: 'crest-jewel' }],
  // चृ: almost no everyday Sanskrit lexeme — teaching placeholder so Analyse is not blank
  'चृ': [
    { word: 'चृ', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'चे': [{ word: 'चेतना', gloss: 'awareness / consciousness' }, { word: 'चेष्टा', gloss: 'effort / gesture' }, { word: 'चेतः', gloss: 'mind / heart' }],
  'चै': [{ word: 'चैत्रः', gloss: 'month of Chaitra' }, { word: 'चैतन्यम्', gloss: 'consciousness / vitality' }, { word: 'चैत्यम्', gloss: 'shrine / sacred mound' }],
  'चो': [{ word: 'चोरः', gloss: 'thief' }, { word: 'चोदनम्', gloss: 'urging / impulse' }, { word: 'प्रचोदयात्', gloss: 'may (He) inspire (Gāyatrī)' }],
  'चौ': [{ word: 'चौर्यम्', gloss: 'theft' }, { word: 'चौरः', gloss: 'thief' }, { word: 'चौलम्', gloss: 'tonsure ceremony' }],
  'चं': [{ word: 'चंपकः', gloss: 'champaka flower' }, { word: 'चंद्रः', gloss: 'moon' }, { word: 'उच्चं', gloss: 'high / upward' }],
  'चः': [{ word: 'वाचः', gloss: 'of speech / voices' }, { word: 'वचः', gloss: 'speech / word' }, { word: 'ऋचः', gloss: 'of a Vedic verse (ṛc)' }],
  // छ-row (bare छ stays in CONSONANT_EXAMPLES)
  'छा': [{ word: 'छाया', gloss: 'shadow' }, { word: 'छात्रः', gloss: 'student' }, { word: 'छागः', gloss: 'goat' }],
  'छि': [{ word: 'छिद्रम्', gloss: 'hole / opening' }, { word: 'छिनत्ति', gloss: 'cuts' }, { word: 'अच्छिन्नः', gloss: 'unbroken / continuous' }],
  'छी': [{ word: 'छीकः', gloss: 'sneeze' }],
  'छु': [{ word: 'छुरिका', gloss: 'knife' }, { word: 'छुरति', gloss: 'cuts / scrapes' }],
  // छू / छृ: almost no everyday Sanskrit lexeme — teaching placeholder so Analyse is not blank
  'छू': [
    { word: 'छू', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'छृ': [
    { word: 'छृ', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'छे': [{ word: 'छेदः', gloss: 'cut / section' }, { word: 'छेदनम्', gloss: 'cutting' }, { word: 'अच्छेद्यः', gloss: 'uncuttable' }],
  'छै': [{ word: 'कच्छैः', gloss: 'with banks / shores' }, { word: 'अच्छैः', gloss: 'with clear ones' }, { word: 'तुच्छैः', gloss: 'with trifles / empty things' }],
  'छो': [{ word: 'अच्छोदः', gloss: 'clear-water lake (Purāṇa)' }, { word: 'छोलङ्गः', gloss: 'bitter orange / citron' }, { word: 'कच्छो', gloss: 'bank / shore (before sandhi vowel)' }],
  'छौ': [{ word: 'कच्छौ', gloss: 'two banks / shores' }, { word: 'अच्छौ', gloss: 'two clear ones' }, { word: 'तुच्छौ', gloss: 'two trifles' }],
  'छं': [{ word: 'छंदः', gloss: 'metre / verse form' }, { word: 'अच्छं', gloss: 'clear / pure (object form)' }],
  'छः': [{ word: 'कच्छः', gloss: 'bank / shore / marsh' }, { word: 'अच्छः', gloss: 'clear / transparent' }, { word: 'तुच्छः', gloss: 'empty / trifling' }],
  // ज-row (bare ज stays in CONSONANT_EXAMPLES)
  'जा': [{ word: 'जातकम्', gloss: 'Jātaka tale' }, { word: 'राजा', gloss: 'king' }, { word: 'जाम्बवन्', gloss: 'Jāmbavān (bear-king)' }],
  'जि': [{ word: 'जिह्वा', gloss: 'tongue' }, { word: 'जितम्', gloss: 'conquered / won' }, { word: 'अजितः', gloss: 'unconquered' }],
  'जी': [{ word: 'जीवनम्', gloss: 'life' }, { word: 'जीरकम्', gloss: 'cumin' }, { word: 'जीमूतः', gloss: 'cloud' }],
  'जु': [{ word: 'अर्जुनः', gloss: 'Arjuna' }, { word: 'मञ्जुः', gloss: 'sweet / lovely' }, { word: 'जुष्टम्', gloss: 'liked / cherished' }],
  'जू': [{ word: 'जूटः', gloss: 'topknot / hair-knot' }, { word: 'जूका', gloss: 'leech' }],
  'जृ': [{ word: 'जृम्भते', gloss: 'yawns' }, { word: 'जृम्भणम्', gloss: 'yawning' }, { word: 'जृम्भा', gloss: 'a yawn' }],
  'जे': [{ word: 'जेता', gloss: 'victor / winner' }, { word: 'अजेयः', gloss: 'invincible' }, { word: 'विजेता', gloss: 'conqueror' }],
  'जै': [{ word: 'जैत्रः', gloss: 'victorious' }, { word: 'जैमिनिः', gloss: 'sage Jaimini' }, { word: 'जैत्रम्', gloss: 'victory / victorious' }],
  'जो': [{ word: 'जोषम्', gloss: 'pleasure / quietly' }, { word: 'द्विजो', gloss: 'brahmin / bird (before sandhi vowel)' }, { word: 'गजो', gloss: 'elephant (before sandhi vowel)' }],
  'जौ': [{ word: 'अजौ', gloss: 'two goats' }, { word: 'गजौ', gloss: 'two elephants' }, { word: 'द्विजौ', gloss: 'two brahmins / birds' }],
  'जं': [{ word: 'जंबू', gloss: 'rose-apple (jambū)' }, { word: 'जंबुकः', gloss: 'jackal' }, { word: 'गजं', gloss: 'elephant (object form)' }],
  'जः': [{ word: 'राजः', gloss: 'king' }, { word: 'गजः', gloss: 'elephant' }, { word: 'अजः', gloss: 'goat' }],
  // झ-row (bare झ stays in CONSONANT_EXAMPLES)
  'झा': [{ word: 'झाटः', gloss: 'arbour / thicket' }, { word: 'झालि', gloss: 'fried green mango (cookery)' }, { word: 'झावुः', gloss: 'tamarisk tree' }],
  'झि': [{ word: 'उज्झितः', gloss: 'left / abandoned' }, { word: 'झिल्ली', gloss: 'cricket (insect)' }, { word: 'झिरिका', gloss: 'cricket' }],
  'झी': [{ word: 'झीरिका', gloss: 'cricket (rare)' }, { word: 'झीरुका', gloss: 'cricket (rare)' }],
  'झु': [{ word: 'झुण्टः', gloss: 'shrub / bush' }, { word: 'झुम्बरि', gloss: 'a kind of lute' }],
  'झू': [{ word: 'झूला', gloss: 'swing (Hindi-familiar)' }, { word: 'झूणि', gloss: 'betel-nut / omen (rare)' }],
  // झृ: almost no everyday Sanskrit lexeme — teaching placeholder so Analyse is not blank
  'झृ': [
    { word: 'झृ', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  // झे / झै / झौ: few headwords — case / dual forms (same pattern as घे / घै / घौ)
  'झे': [{ word: 'झेन', gloss: 'by झ (instr. — rare teaching form)' }],
  'झै': [{ word: 'झैः', gloss: 'with the झ ones (instr. pl. — rare)' }],
  'झो': [{ word: 'झोडः', gloss: 'betel-nut tree' }, { word: 'झो', gloss: 'झ before sandhi vowel (rare)' }],
  'झौ': [{ word: 'झौ', gloss: 'two झ ones (dual — rare teaching form)' }, { word: 'झौलिकम्', gloss: 'small bag (rare)' }],
  'झं': [{ word: 'झंकारः', gloss: 'jingle / buzz (of bees)' }, { word: 'झंपः', gloss: 'jump / leap' }, { word: 'झंपा', gloss: 'a jump' }],
  'झः': [{ word: 'झः', gloss: 'jingle / Bṛhaspati (lexicon)' }],
  // cache-bust 2026-09-08c
  // ञ-row — exact akṣara only here. Everyday Sanskrit almost never has open
  // ञा/ञि/…; family kid-words with ञ् live in BARAKHADI_RELATED (not "exact letter").
  // Bare ञ mirrored from CONSONANT_EXAMPLES (ज्ञानम् kept; यज्ञः is ज्ञ — skip).
  'ञ': [
    { word: 'पञ्च', gloss: 'five' },
    { word: 'ज्ञानम्', gloss: 'knowledge' },
    { word: 'अञ्जलिः', gloss: 'joined palms' },
    { word: 'अञ्जनम्', gloss: 'collyrium / kajal' },
    { word: 'कुञ्जरः', gloss: 'elephant' },
    { word: 'मञ्जरी', gloss: 'blossom cluster' },
    { word: 'किञ्चित्', gloss: 'a little' },
  ],
  // Self-tile teaching placeholders (exact empty of real lexemes) — card uses RELATED.
  'ञा': [{ word: 'ञा', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  'ञि': [{ word: 'ञि', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  'ञी': [{ word: 'ञी', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  'ञु': [{ word: 'ञु', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  'ञू': [{ word: 'ञू', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  'ञृ': [{ word: 'ञृ', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  'ञे': [{ word: 'ञे', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  'ञै': [{ word: 'ञै', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  'ञो': [{ word: 'ञो', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  'ञौ': [{ word: 'ञौ', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  'ञं': [{ word: 'ञं', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  'ञः': [{ word: 'ञः', gloss: 'rare alone — in words ञ becomes ञ् before a consonant' }],
  // cache-bust 2026-09-08d
  // ट-row (bare ट stays in CONSONANT_EXAMPLES)
  'टा': [{ word: 'घण्टा', gloss: 'bell' }, { word: 'फटा', gloss: "snake's hood" }, { word: 'कटाक्षः', gloss: 'sidelong glance' }],
  'टि': [{ word: 'वाटिका', gloss: 'garden' }, { word: 'घटिका', gloss: 'small pot / water-clock' }, { word: 'टिट्टिभः', gloss: 'partridge' }],
  'टी': [{ word: 'कोटी', gloss: 'crore / tip' }, { word: 'नटी', gloss: 'actress / dancer' }, { word: 'तटी', gloss: 'river-bank' }],
  'टु': [{ word: 'कुटुम्बम्', gloss: 'family / household' }, { word: 'कटु', gloss: 'bitter' }, { word: 'पटु', gloss: 'skilled / clever' }],
  'टू': [{ word: 'कटू', gloss: 'bitter (long ū)' }, { word: 'पटू', gloss: 'skilled / clever (long ū)' }],
  // टृ: almost no everyday Sanskrit lexeme — teaching placeholder so Analyse is not blank
  'टृ': [
    { word: 'टृ', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'टे': [{ word: 'तटे', gloss: 'on the river-bank' }, { word: 'वटे', gloss: 'at the banyan' }, { word: 'नटे', gloss: 'in / at the actor' }],
  // टै: few headwords — instrumental plurals (same pattern as छै / झै)
  'टै': [{ word: 'नटैः', gloss: 'with actors / dancers' }, { word: 'पटैः', gloss: 'with cloths' }, { word: 'कटैः', gloss: 'with mats' }],
  'टो': [{ word: 'नटो', gloss: 'actor (before sandhi vowel)' }, { word: 'पटो', gloss: 'cloth (before sandhi vowel)' }, { word: 'कण्टो', gloss: 'thorn (before sandhi vowel)' }],
  'टौ': [{ word: 'नटौ', gloss: 'two actors / dancers' }, { word: 'पटौ', gloss: 'two cloths' }, { word: 'कटौ', gloss: 'two mats' }],
  'टं': [{ word: 'टंकः', gloss: 'chisel / stamped coin' }, { word: 'पटं', gloss: 'cloth (object form)' }, { word: 'नटं', gloss: 'actor (object form)' }],
  'टः': [{ word: 'पटः', gloss: 'cloth' }, { word: 'कटः', gloss: 'mat' }, { word: 'नटः', gloss: 'actor / dancer' }],
  // cache-bust 2026-09-08e
  // ठ-row (bare ठ stays in CONSONANT_EXAMPLES)
  'ठा': [{ word: 'कण्ठाभरणम्', gloss: 'necklace / throat-ornament' }, { word: 'कोष्ठागारम्', gloss: 'storehouse / granary' }, { word: 'ठाकुर', gloss: 'Thakur (Hindi-familiar name)' }],
  'ठि': [{ word: 'कठिनम्', gloss: 'hard / difficult' }, { word: 'पीठिका', gloss: 'small seat / stool' }, { word: 'कण्ठिका', gloss: 'necklace / throat-band' }],
  'ठी': [{ word: 'कोष्ठी', gloss: 'store-room / granary' }, { word: 'पृष्ठी', gloss: 'back / dorsal side' }, { word: 'पाठी', gloss: 'reciter / Veda student' }],
  'ठु': [{ word: 'निष्ठुरः', gloss: 'harsh / cruel' }, { word: 'निष्ठुरम्', gloss: 'harshness / cruelty' }],
  // ठू / ठृ: almost no everyday Sanskrit lexeme — teaching placeholder so Analyse is not blank
  'ठू': [
    { word: 'ठू', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'ठृ': [
    { word: 'ठृ', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'ठे': [{ word: 'पीठे', gloss: 'on the seat' }, { word: 'पाठे', gloss: 'in the lesson' }, { word: 'मठे', gloss: 'in the monastery' }],
  // ठै: few headwords — instrumental plurals (same pattern as टै / छै)
  'ठै': [{ word: 'पाठैः', gloss: 'with lessons' }, { word: 'पीठैः', gloss: 'with seats' }, { word: 'मठैः', gloss: 'with monasteries' }],
  'ठो': [{ word: 'कठोरः', gloss: 'hard / harsh' }, { word: 'कठोरम्', gloss: 'hard / severe' }, { word: 'पाठो', gloss: 'lesson (before sandhi vowel)' }],
  'ठौ': [{ word: 'ओष्ठौ', gloss: 'two lips' }, { word: 'पीठौ', gloss: 'two seats' }, { word: 'कण्ठौ', gloss: 'two throats' }],
  'ठं': [{ word: 'कण्ठं', gloss: 'throat (object form)' }, { word: 'पीठं', gloss: 'seat (object form)' }, { word: 'पाठं', gloss: 'lesson (object form)' }],
  'ठः': [{ word: 'कण्ठः', gloss: 'throat' }, { word: 'पीठः', gloss: 'seat / pedestal' }, { word: 'पाठः', gloss: 'lesson' }],
  // cache-bust 2026-09-08f
  // ड-row (bare ड stays in CONSONANT_EXAMPLES: अण्डम् डमरुः नाडी)
  'डा': [{ word: 'अण्डाकारः', gloss: 'egg-shaped' }, { word: 'भाण्डागारम्', gloss: 'storehouse / treasury' }, { word: 'डाकिनी', gloss: 'ḍākinī / sky-spirit' }],
  'डि': [{ word: 'डिम्भः', gloss: 'newborn / little child' }, { word: 'पण्डितः', gloss: 'scholar / pandit' }, { word: 'डिण्डिमः', gloss: 'small drum' }],
  'डी': [{ word: 'नाडी', gloss: 'pulse / channel' }, { word: 'चण्डी', gloss: 'fierce goddess / Caṇḍī' }, { word: 'कुण्डी', gloss: 'small pot / basin' }],
  'डु': [{ word: 'डुण्डुभः', gloss: 'water-snake / lizard' }, { word: 'हुडुक्कः', gloss: 'small drum / rattle' }, { word: 'गुडुची', gloss: 'guduchi plant (giloy)' }],
  // डू: few everyday lexemes — prefer exact गुडूची family
  'डू': [{ word: 'गुडूची', gloss: 'guduchi / giloy creeper' }, { word: 'गुडूचिका', gloss: 'guduchi plant' }],
  // डृ: almost no everyday Sanskrit lexeme — teaching placeholder so Analyse is not blank
  'डृ': [
    { word: 'डृ', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'डे': [{ word: 'दण्डे', gloss: 'on the stick / staff' }, { word: 'अण्डे', gloss: 'in the egg' }, { word: 'पिण्डे', gloss: 'in the lump / ball' }],
  // डै: few headwords — instrumental plurals (same pattern as टै / ठै)
  'डै': [{ word: 'दण्डैः', gloss: 'with sticks / staffs' }, { word: 'अण्डैः', gloss: 'with eggs' }, { word: 'पिण्डैः', gloss: 'with lumps / balls' }],
  'डो': [{ word: 'दण्डो', gloss: 'staff (before sandhi vowel)' }, { word: 'पिण्डो', gloss: 'lump (before sandhi vowel)' }, { word: 'भण्डो', gloss: 'jester (before sandhi vowel)' }],
  'डौ': [{ word: 'दण्डौ', gloss: 'two sticks / staffs' }, { word: 'पिण्डौ', gloss: 'two lumps / balls' }, { word: 'भण्डौ', gloss: 'two jesters' }],
  'डं': [{ word: 'दण्डं', gloss: 'staff (object form)' }, { word: 'अण्डं', gloss: 'egg (object form)' }, { word: 'पिण्डं', gloss: 'lump (object form)' }],
  'डः': [{ word: 'दण्डः', gloss: 'stick / staff' }, { word: 'पिण्डः', gloss: 'lump / ball' }, { word: 'भण्डः', gloss: 'jester / buffoon' }],
  // cache-bust 2026-09-08g
  // ढ-row (bare ढ stays in CONSONANT_EXAMPLES: दृढम् गूढम् गाढम्)
  'ढा': [{ word: 'गाढा', gloss: 'deep / intense (f.)' }, { word: 'दृढा', gloss: 'firm (f.)' }, { word: 'ऊढा', gloss: 'married / carried (f.)' }],
  'ढि': [{ word: 'रूढिः', gloss: 'custom / conventional sense' }, { word: 'प्रौढिः', gloss: 'maturity / confidence' }],
  'ढी': [{ word: 'रूढी', gloss: 'custom / usage' }, { word: 'दृढीकरणम्', gloss: 'making firm / strengthening' }, { word: 'दृढीकृत', gloss: 'made firm' }],
  // ढु: few everyday lexemes — Gaṇeśa epithet is the clear exact hit
  'ढु': [{ word: 'ढुण्ढिः', gloss: 'Gaṇeśa (searcher epithet)' }],
  // ढू / ढृ: almost no everyday Sanskrit lexeme — teaching placeholder so Analyse is not blank
  'ढू': [
    { word: 'ढू', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'ढृ': [
    { word: 'ढृ', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'ढे': [{ word: 'दृढे', gloss: 'in / on the firm' }, { word: 'गूढे', gloss: 'in the hidden' }, { word: 'गाढे', gloss: 'in the deep / intense' }],
  // ढै: few headwords — instrumental plurals (same pattern as डै / ठै)
  'ढै': [{ word: 'दृढैः', gloss: 'with the firm ones' }, { word: 'गूढैः', gloss: 'with the hidden ones' }, { word: 'गाढैः', gloss: 'with the deep / intense' }],
  'ढो': [{ word: 'दृढो', gloss: 'firm (before sandhi vowel)' }, { word: 'गूढो', gloss: 'hidden (before sandhi vowel)' }, { word: 'गाढो', gloss: 'deep (before sandhi vowel)' }],
  'ढौ': [{ word: 'दृढौ', gloss: 'two firm ones' }, { word: 'गूढौ', gloss: 'two hidden ones' }, { word: 'गाढौ', gloss: 'two deep / intense ones' }],
  'ढं': [{ word: 'दृढं', gloss: 'firm (object / neuter)' }, { word: 'गूढं', gloss: 'hidden (object / neuter)' }, { word: 'गाढं', gloss: 'deep / intense (object / neuter)' }],
  'ढः': [{ word: 'दृढः', gloss: 'firm' }, { word: 'गूढः', gloss: 'hidden' }, { word: 'गाढः', gloss: 'deep / intense' }],
  // cache-bust 2026-09-08h
  // ण-row (bare ण stays in CONSONANT_EXAMPLES: गणः कर्णः वेणुः)
  'णा': [{ word: 'बाणाः', gloss: 'arrows' }, { word: 'प्राणाः', gloss: 'life-breaths' }, { word: 'कृष्णा', gloss: 'Krishna (f.) / Draupadi' }],
  'णि': [{ word: 'मणिः', gloss: 'jewel / gem' }, { word: 'पाणिः', gloss: 'hand' }, { word: 'कणिका', gloss: 'tiny particle / drop' }],
  'णी': [{ word: 'वाणी', gloss: 'speech / voice' }, { word: 'श्रेणी', gloss: 'row / class' }, { word: 'वेणी', gloss: 'braid / plait' }],
  'णु': [{ word: 'वेणुः', gloss: 'flute' }, { word: 'विष्णुः', gloss: 'Vishnu' }, { word: 'अणुः', gloss: 'atom / tiny bit' }],
  // णू / णृ: almost no everyday Sanskrit lexeme — teaching placeholder so Analyse is not blank
  'णू': [
    { word: 'णू', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'णृ': [
    { word: 'णृ', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'णे': [{ word: 'गुणे', gloss: 'in / on the quality' }, { word: 'बाणे', gloss: 'in / on the arrow' }, { word: 'कर्णे', gloss: 'in / on the ear' }],
  // णै: few headwords — instrumental plurals (same pattern as ढै / डै)
  'णै': [{ word: 'गुणैः', gloss: 'with qualities / virtues' }, { word: 'बाणैः', gloss: 'with arrows' }, { word: 'गणैः', gloss: 'with groups' }],
  'णो': [{ word: 'गुणो', gloss: 'quality (before sandhi vowel)' }, { word: 'बाणो', gloss: 'arrow (before sandhi vowel)' }, { word: 'गणो', gloss: 'group (before sandhi vowel)' }],
  'णौ': [{ word: 'कर्णौ', gloss: 'two ears' }, { word: 'गुणौ', gloss: 'two qualities' }, { word: 'बाणौ', gloss: 'two arrows' }],
  'णं': [{ word: 'गुणं', gloss: 'quality (object form)' }, { word: 'बाणं', gloss: 'arrow (object form)' }, { word: 'कर्णं', gloss: 'ear (object form)' }],
  'णः': [{ word: 'गणः', gloss: 'group' }, { word: 'गुणः', gloss: 'quality / virtue' }, { word: 'कर्णः', gloss: 'ear' }],
// cache-bust 2026-09-08i
  // त-row (bare त stays in CONSONANT_EXAMPLES: तातः तरुः तारा)
  'ता': [{ word: 'तातः', gloss: 'father' }, { word: 'तारा', gloss: 'star' }, { word: 'माता', gloss: 'mother' }],
  'ति': [{ word: 'गतिः', gloss: 'motion / gait' }, { word: 'मतिः', gloss: 'thought / mind' }, { word: 'पतिः', gloss: 'lord / husband' }],
  'ती': [{ word: 'तीरम्', gloss: 'bank / shore' }, { word: 'तीर्थम्', gloss: 'holy place / ford' }, { word: 'सरस्वती', gloss: 'Saraswati' }],
  'तु': [{ word: 'तुला', gloss: 'balance / scales' }, { word: 'धातुः', gloss: 'element / verb-root' }, { word: 'वस्तु', gloss: 'thing / object' }],
  'तू': [{ word: 'तूलम्', gloss: 'cotton' }, { word: 'तूणः', gloss: 'quiver' }, { word: 'ऋतूनाम्', gloss: 'of the seasons' }],
  'तृ': [{ word: 'तृणम्', gloss: 'grass' }, { word: 'तृप्तः', gloss: 'satisfied' }, { word: 'तृष्णा', gloss: 'thirst' }],
  'ते': [{ word: 'तेजः', gloss: 'radiance / energy' }, { word: 'गते', gloss: 'in / at the gone' }, { word: 'हस्ते', gloss: 'in the hand' }],
  'तै': [{ word: 'तैः', gloss: 'by them' }, { word: 'गतैः', gloss: 'by the gone ones' }, { word: 'हस्तैः', gloss: 'by the hands' }],
  'तो': [{ word: 'तोयम्', gloss: 'water' }, { word: 'गतो', gloss: 'gone (before sandhi vowel)' }, { word: 'हस्तो', gloss: 'hand (before sandhi vowel)' }],
  'तौ': [{ word: 'हस्तौ', gloss: 'two hands' }, { word: 'गतौ', gloss: 'two gone ones' }, { word: 'कृतौ', gloss: 'two done ones' }],
  'तं': [{ word: 'तं', gloss: 'him / that (object)' }, { word: 'हस्तं', gloss: 'hand (object form)' }, { word: 'गतं', gloss: 'gone (object / neuter)' }],
  'तः': [{ word: 'हस्तः', gloss: 'hand' }, { word: 'गतः', gloss: 'gone' }, { word: 'कृतः', gloss: 'done / made' }],
  // थ-row (bare थ stays in CONSONANT_EXAMPLES: कथा पथः अथवा)
  'था': [{ word: 'कथा', gloss: 'story' }, { word: 'यथा', gloss: 'as / just as' }, { word: 'तथा', gloss: 'so / thus' }],
  'थि': [{ word: 'स्थितिः', gloss: 'state / position' }, { word: 'पथिकः', gloss: 'traveller' }, { word: 'अतिथिः', gloss: 'guest' }],
  // थी: few everyday lexemes — fenugreek / seeker
  'थी': [{ word: 'मेथी', gloss: 'fenugreek' }, { word: 'अर्थी', gloss: 'seeker / one who wants' }],
  'थु': [{ word: 'मथुरा', gloss: 'Mathura' }, { word: 'मन्थुः', gloss: 'churning / agitation' }],
  // थू / थृ: almost no everyday Sanskrit lexeme — teaching placeholder so Analyse is not blank
  'थू': [
    { word: 'थू', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'थृ': [
    { word: 'थृ', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'थे': [{ word: 'पथे', gloss: 'on the path' }, { word: 'कथे', gloss: 'in the story' }, { word: 'अर्थे', gloss: 'in the meaning / for the sake of' }],
  'थै': [{ word: 'पथैः', gloss: 'by the paths' }, { word: 'अर्थैः', gloss: 'by meanings / purposes' }, { word: 'कथैः', gloss: 'by stories' }],
  'थो': [{ word: 'अथो', gloss: 'and then / moreover' }, { word: 'पथो', gloss: 'path (before sandhi vowel)' }, { word: 'अर्थो', gloss: 'meaning (before sandhi vowel)' }],
  'थौ': [{ word: 'पथौ', gloss: 'two paths' }, { word: 'अर्थौ', gloss: 'two meanings / purposes' }],
  'थं': [{ word: 'पथं', gloss: 'path (object form)' }, { word: 'अर्थं', gloss: 'meaning (object form)' }, { word: 'कथं', gloss: 'how?' }],
  'थः': [{ word: 'पथः', gloss: 'path' }, { word: 'अर्थः', gloss: 'meaning / wealth' }],
  // द-row (bare द stays in CONSONANT_EXAMPLES: देवः दधि दुग्धम्)
  'दा': [{ word: 'दानम्', gloss: 'gift / giving' }, { word: 'दाता', gloss: 'giver' }, { word: 'दासी', gloss: 'maidservant' }],
  'दि': [{ word: 'दिनम्', gloss: 'day' }, { word: 'आदिः', gloss: 'beginning' }, { word: 'मदिरा', gloss: 'wine / liquor' }],
  'दी': [{ word: 'नदी', gloss: 'river' }, { word: 'दीपः', gloss: 'lamp' }, { word: 'दीनः', gloss: 'poor / humble' }],
  'दु': [{ word: 'दुग्धम्', gloss: 'milk' }, { word: 'दुःखम्', gloss: 'sorrow' }, { word: 'दुर्गा', gloss: 'Durga' }],
  'दू': [{ word: 'दूतः', gloss: 'messenger' }, { word: 'दूरम्', gloss: 'far / distance' }, { word: 'दूषितम्', gloss: 'spoiled / polluted' }],
  'दृ': [{ word: 'दृढम्', gloss: 'firm' }, { word: 'दृष्टिः', gloss: 'sight / view' }, { word: 'दृशः', gloss: 'appearance / look' }],
  'दे': [{ word: 'देवः', gloss: 'god' }, { word: 'देशः', gloss: 'country / region' }, { word: 'देहः', gloss: 'body' }],
  'दै': [{ word: 'दैवम्', gloss: 'fate / divine' }, { word: 'दैत्यः', gloss: 'demon / daitya' }],
  'दो': [{ word: 'दोषः', gloss: 'fault / defect' }, { word: 'दोहनम्', gloss: 'milking' }, { word: 'पदो', gloss: 'foot / word (before sandhi vowel)' }],
  'दौ': [{ word: 'दौर्बल्यम्', gloss: 'weakness' }, { word: 'पदौ', gloss: 'two feet' }, { word: 'मदौ', gloss: 'two intoxications / ruts' }],
  'दं': [{ word: 'इदं', gloss: 'this (neuter)' }, { word: 'पदं', gloss: 'foot / word (object form)' }, { word: 'दंतः', gloss: 'tooth' }],
  'दः': [{ word: 'पदः', gloss: 'foot / step (in compounds)' }, { word: 'मदः', gloss: 'pride / intoxication' }, { word: 'हृदः', gloss: 'heart (stem form)' }],
  // ध-row (bare ध stays in CONSONANT_EXAMPLES: धर्मः धनुः धनम्)
  'धा': [{ word: 'धावति', gloss: 'runs' }, { word: 'सुधा', gloss: 'nectar / ambrosia' }, { word: 'धात्री', gloss: 'nurse / earth' }],
  'धि': [{ word: 'बुद्धिः', gloss: 'intellect' }, { word: 'विधिः', gloss: 'rule / method' }, { word: 'निधिः', gloss: 'treasure' }],
  'धी': [{ word: 'धीरः', gloss: 'brave / calm' }, { word: 'सुधी', gloss: 'wise person' }, { word: 'धी', gloss: 'intellect / wisdom' }],
  'धु': [{ word: 'मधु', gloss: 'honey' }, { word: 'सिन्धुः', gloss: 'river / ocean' }, { word: 'अधुना', gloss: 'now' }],
  'धू': [{ word: 'धूमः', gloss: 'smoke' }, { word: 'धूलिः', gloss: 'dust' }, { word: 'वधू', gloss: 'bride' }],
  'धृ': [{ word: 'धृतिः', gloss: 'firmness / courage' }, { word: 'धृतम्', gloss: 'held / worn' }],
  'धे': [{ word: 'धेनुः', gloss: 'milk-cow' }, { word: 'बन्धे', gloss: 'in the bond / dam' }],
  'धै': [{ word: 'धैर्यम्', gloss: 'patience / courage' }, { word: 'बन्धैः', gloss: 'with bonds' }, { word: 'रोधैः', gloss: 'with obstacles / dams' }],
  'धो': [{ word: 'बन्धो', gloss: 'bond (before sandhi vowel)' }, { word: 'रोधो', gloss: 'obstacle (before sandhi vowel)' }, { word: 'अधो', gloss: 'below / downward' }],
  'धौ': [{ word: 'धौतम्', gloss: 'washed' }, { word: 'बन्धौ', gloss: 'two bonds' }, { word: 'रोधौ', gloss: 'two obstacles' }],
  'धं': [{ word: 'बन्धं', gloss: 'bond (object form)' }, { word: 'रोधं', gloss: 'obstacle (object form)' }],
  'धः': [{ word: 'बन्धः', gloss: 'bond / dam' }, { word: 'रोधः', gloss: 'obstacle / stoppage' }, { word: 'अधः', gloss: 'below / down' }],
  // न-row (bare न stays in CONSONANT_EXAMPLES: नदी नरः नयनम्)
  'ना': [{ word: 'नाम', gloss: 'name' }, { word: 'नासिका', gloss: 'nose' }, { word: 'नारी', gloss: 'woman' }],
  'नि': [{ word: 'नियमः', gloss: 'rule / discipline' }, { word: 'अग्निः', gloss: 'fire' }, { word: 'नित्यम्', gloss: 'always / eternal' }],
  'नी': [{ word: 'नीरम्', gloss: 'water' }, { word: 'नीलः', gloss: 'blue' }, { word: 'नीतिः', gloss: 'conduct / policy' }],
  'नु': [{ word: 'धनुः', gloss: 'bow' }, { word: 'मनुः', gloss: 'Manu' }, { word: 'तनुः', gloss: 'body / slender' }],
  'नू': [{ word: 'नूतनम्', gloss: 'new' }, { word: 'नूनम्', gloss: 'indeed / certainly' }],
  'नृ': [{ word: 'नृपः', gloss: 'king' }, { word: 'नृत्यम्', gloss: 'dance' }],
  'ने': [{ word: 'नेत्रम्', gloss: 'eye' }, { word: 'नेता', gloss: 'leader' }, { word: 'वने', gloss: 'in the forest' }],
  'नै': [{ word: 'नैतिकः', gloss: 'moral' }, { word: 'वनैः', gloss: 'by the forests' }],
  'नो': [{ word: 'मनो', gloss: 'mind (before sandhi vowel)' }, { word: 'वनो', gloss: 'forest (before sandhi vowel)' }, { word: 'नो', gloss: 'not / and not' }],
  'नौ': [{ word: 'नौका', gloss: 'boat' }, { word: 'वनौ', gloss: 'two forests' }],
  'नं': [{ word: 'वनं', gloss: 'forest (object form)' }, { word: 'नयनं', gloss: 'eye (object form)' }, { word: 'गगनं', gloss: 'sky (object form)' }],
  'नः': [{ word: 'मनः', gloss: 'mind' }, { word: 'धनः', gloss: 'wealth (in compounds / names)' }, { word: 'जीवनः', gloss: 'living / life (masc.)' }],
  // प-row (bare प stays in CONSONANT_EXAMPLES: पत्रम् पद्मम् पुत्रः)
  'पा': [{ word: 'पातालम्', gloss: 'underworld / Patala' }, { word: 'पानीयम्', gloss: 'drinking water' }, { word: 'पादः', gloss: 'foot' }],
  'पि': [{ word: 'पिता', gloss: 'father' }, { word: 'पिकः', gloss: 'cuckoo' }, { word: 'पिपासा', gloss: 'thirst' }],
  'पी': [{ word: 'पीतम्', gloss: 'yellow / drunk' }, { word: 'पीठः', gloss: 'seat / pedestal' }, { word: 'पीनः', gloss: 'plump / stout' }],
  'पु': [{ word: 'पुत्रः', gloss: 'son' }, { word: 'पुष्पम्', gloss: 'flower' }, { word: 'पुराणम्', gloss: 'Purana / ancient tale' }],
  'पू': [{ word: 'पूजा', gloss: 'worship' }, { word: 'पूर्णम्', gloss: 'full / complete' }, { word: 'पूजकः', gloss: 'worshipper' }],
  'पृ': [{ word: 'पृथ्वी', gloss: 'earth' }, { word: 'पृष्ठम्', gloss: 'back / page' }, { word: 'पृथक्', gloss: 'separate / apart' }],
  'पे': [{ word: 'पेयम्', gloss: 'drink / beverage' }, { word: 'पेचकः', gloss: 'owl' }],
  'पै': [{ word: 'पैतृकः', gloss: 'paternal / ancestral' }, { word: 'नृपैः', gloss: 'by the kings' }, { word: 'गोपैः', gloss: 'by the cowherds' }],
  'पो': [{ word: 'पोतः', gloss: 'boat / young animal' }, { word: 'पोषणम्', gloss: 'nourishment' }],
  'पौ': [{ word: 'पौत्रः', gloss: 'grandson' }, { word: 'पौरः', gloss: 'townsman / citizen' }],
  'पं': [{ word: 'पापं', gloss: 'sin (object form)' }, { word: 'पुष्पं', gloss: 'flower (object form)' }, { word: 'नृपं', gloss: 'king (object form)' }],
  'पः': [{ word: 'नृपः', gloss: 'king' }, { word: 'सर्पः', gloss: 'serpent' }, { word: 'तपः', gloss: 'austerity / heat' }],
  // फ-row (bare फ stays in CONSONANT_EXAMPLES: फलम् फणिः फेनम्)
  'फा': [{ word: 'फाल्गुनः', gloss: 'Phalguna (month)' }, { word: 'फालः', gloss: 'ploughshare' }],
  // फि / फी / फृ / फै / फो / फौ / फं / फः: almost no everyday Sanskrit lexemes — teaching placeholders
  'फि': [
    { word: 'फि', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'फी': [{ word: 'स्फीतः', gloss: 'swollen / abundant' }, { word: 'स्फीतिः', gloss: 'increase / prosperity' }],
  'फु': [{ word: 'फुल्लम्', gloss: 'bloomed / blossomed' }, { word: 'फुल्लः', gloss: 'blooming' }],
  'फू': [{ word: 'फूत्कारः', gloss: 'hissing / blowing sound' }],
  'फृ': [
    { word: 'फृ', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'फे': [{ word: 'फेनम्', gloss: 'foam' }, { word: 'फेनकः', gloss: 'froth / foam' }],
  'फै': [
    { word: 'फै', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'फो': [
    { word: 'फो', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'फौ': [
    { word: 'फौ', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'फं': [
    { word: 'फं', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'फः': [
    { word: 'फः', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  // ब-row (bare ब stays in CONSONANT_EXAMPLES: बालः बलम् बकः)
  'बा': [{ word: 'बालः', gloss: 'child' }, { word: 'बाणः', gloss: 'arrow' }, { word: 'बाला', gloss: 'girl / young woman' }],
  'बि': [{ word: 'बिम्बम्', gloss: 'disk / reflection' }, { word: 'बिन्दुः', gloss: 'dot / drop' }, { word: 'बिलम्', gloss: 'hole / cave' }],
  'बी': [{ word: 'बीजम्', gloss: 'seed' }],
  'बु': [{ word: 'बुद्धिः', gloss: 'intellect' }, { word: 'बुधः', gloss: 'wise one / Mercury' }, { word: 'बुद्धः', gloss: 'awakened / Buddha' }],
  // बू: almost no everyday Sanskrit lexeme — teaching placeholder
  'बू': [
    { word: 'बू', gloss: 'rare akṣara — few everyday Sanskrit words' },
  ],
  'बृ': [{ word: 'बृहत्', gloss: 'great / large' }, { word: 'बृहस्पतिः', gloss: 'Brihaspati' }],
  'बे': [{ word: 'कुबेरः', gloss: 'Kubera (god of wealth)' }],
  'बै': [{ word: 'अम्बैः', gloss: 'by the mothers' }],
  'बो': [{ word: 'बोधः', gloss: 'understanding / awakening' }, { word: 'बोधनम्', gloss: 'teaching / informing' }],
  'बौ': [{ word: 'बौद्धः', gloss: 'Buddhist' }],
  'बं': [{ word: 'बिम्बं', gloss: 'disk (object form)' }, { word: 'जम्बं', gloss: 'rose-apple (object form)' }],
  'बः': [{ word: 'जम्बः', gloss: 'rose-apple / jambu tree' }],
  // भ-row (bare भ stays in CONSONANT_EXAMPLES: भूमिः भानुः भक्तः)
  'भा': [{ word: 'भारतम्', gloss: 'India / Bharata' }, { word: 'भाषा', gloss: 'language' }, { word: 'भागः', gloss: 'share / portion' }],
  'भि': [{ word: 'भिषजः', gloss: 'physician' }, { word: 'भित्तिः', gloss: 'wall' }, { word: 'भिन्नम्', gloss: 'different / broken' }],
  'भी': [{ word: 'भीमः', gloss: 'Bhima / terrible' }, { word: 'भीतिः', gloss: 'fear' }, { word: 'भीरुः', gloss: 'timid / fearful' }],
  'भु': [{ word: 'भुजः', gloss: 'arm' }, { word: 'भुवनम्', gloss: 'world' }, { word: 'भुक्तिः', gloss: 'enjoyment / eating' }],
  'भू': [{ word: 'भूमिः', gloss: 'earth' }, { word: 'भूतम्', gloss: 'being / past / ghost' }, { word: 'भूपः', gloss: 'king' }],
  'भृ': [{ word: 'भृगुः', gloss: 'Bhrigu' }, { word: 'भृत्यः', gloss: 'servant' }, { word: 'भृङ्गः', gloss: 'bee' }],
  'भे': [{ word: 'भेदः', gloss: 'difference / split' }, { word: 'भेकः', gloss: 'frog' }, { word: 'भेरी', gloss: 'kettle-drum' }],
  'भै': [{ word: 'भैषज्यम्', gloss: 'medicine / remedy' }],
  'भो': [{ word: 'भोजनम्', gloss: 'food / meal' }, { word: 'भोगः', gloss: 'enjoyment / pleasure' }],
  'भौ': [{ word: 'भौतिकः', gloss: 'material / physical' }, { word: 'भौमः', gloss: 'earthly / Mars' }],
  'भं': [{ word: 'शुभं', gloss: 'auspicious (neuter / object)' }],
  'भः': [{ word: 'शुभः', gloss: 'auspicious' }, { word: 'लाभः', gloss: 'gain / profit' }],
  // म-row (bare म stays in CONSONANT_EXAMPLES: माता मित्रम् मुखम्)
  'मा': [{ word: 'माता', gloss: 'mother' }, { word: 'मानवः', gloss: 'human being' }, { word: 'माला', gloss: 'garland' }],
  'मि': [{ word: 'मित्रम्', gloss: 'friend' }, { word: 'मिथ्या', gloss: 'false / untrue' }, { word: 'मिलनम्', gloss: 'meeting / union' }],
  'मी': [{ word: 'मीनः', gloss: 'fish' }, { word: 'लक्ष्मी', gloss: 'Lakshmi' }],
  'मु': [{ word: 'मुखम्', gloss: 'face / mouth' }, { word: 'मुनिः', gloss: 'sage' }, { word: 'मुकुटः', gloss: 'crown' }],
  'मू': [{ word: 'मूलम्', gloss: 'root' }, { word: 'मूर्तिः', gloss: 'idol / form' }, { word: 'मूर्खः', gloss: 'fool' }],
  'मृ': [{ word: 'मृगः', gloss: 'deer' }, { word: 'मृत्युः', gloss: 'death' }, { word: 'मृदुः', gloss: 'soft' }],
  'मे': [{ word: 'मेघः', gloss: 'cloud' }, { word: 'मेरुः', gloss: 'Meru (mountain)' }, { word: 'मेधा', gloss: 'intelligence' }],
  'मै': [{ word: 'मैत्री', gloss: 'friendship' }],
  'मो': [{ word: 'मोक्षः', gloss: 'liberation' }, { word: 'मोदकः', gloss: 'sweet dumpling' }, { word: 'मोहः', gloss: 'delusion / attachment' }],
  'मौ': [{ word: 'मौनम्', gloss: 'silence' }, { word: 'मौर्यः', gloss: 'Maurya' }],
  'मं': [{ word: 'रामं', gloss: 'Rama (object form)' }, { word: 'समं', gloss: 'equal / together' }, { word: 'आमं', gloss: 'raw / uncooked (neuter)' }],
  'मः': [{ word: 'रामः', gloss: 'Rama' }, { word: 'समः', gloss: 'equal / same' }, { word: 'नमः', gloss: 'bow / salutation' }],
};









/** Related (not exact-letter) examples — e.g. ङ matras: real words write ङ as ङ्. */
export const BARAKHADI_RELATED: Record<string, VowelExample[]> = {
  'ङा': [
    { word: 'अङ्गम्', gloss: 'related · ङ as ङ् · limb / body' },
    { word: 'गङ्गा', gloss: 'related · ङ as ङ् · Ganga' },
    { word: 'रङ्गः', gloss: 'related · ङ as ङ् · color / stage' },
    { word: 'शङ्खः', gloss: 'related · ङ as ङ् · conch' },
  ],
  'ङि': [
    { word: 'अङ्गम्', gloss: 'related · ङ as ङ् · limb / body' },
    { word: 'गङ्गा', gloss: 'related · ङ as ङ् · Ganga' },
    { word: 'अङ्कुरः', gloss: 'related · ङ as ङ् · sprout' },
    { word: 'सङ्गीतम्', gloss: 'related · ङ as ङ् · music' },
  ],
  'ङी': [
    { word: 'गङ्गा', gloss: 'related · ङ as ङ् · Ganga' },
    { word: 'सङ्गीतम्', gloss: 'related · ङ as ङ् · music' },
    { word: 'पङ्कजम्', gloss: 'related · ङ as ङ् · lotus' },
    { word: 'शङ्खः', gloss: 'related · ङ as ङ् · conch' },
  ],
  'ङु': [
    { word: 'अङ्कुरः', gloss: 'related · ङ as ङ् · sprout' },
    { word: 'रङ्गः', gloss: 'related · ङ as ङ् · color / stage' },
    { word: 'अङ्गम्', gloss: 'related · ङ as ङ् · limb / body' },
    { word: 'पङ्कजम्', gloss: 'related · ङ as ङ् · lotus' },
  ],
  'ङू': [
    { word: 'शङ्खः', gloss: 'related · ङ as ङ् · conch' },
    { word: 'गङ्गा', gloss: 'related · ङ as ङ् · Ganga' },
    { word: 'सङ्गीतम्', gloss: 'related · ङ as ङ् · music' },
    { word: 'रङ्गः', gloss: 'related · ङ as ङ् · color / stage' },
  ],
  'ङृ': [
    { word: 'अङ्गम्', gloss: 'related · ङ as ङ् · limb / body' },
    { word: 'अङ्कुरः', gloss: 'related · ङ as ङ् · sprout' },
    { word: 'पङ्कजम्', gloss: 'related · ङ as ङ् · lotus' },
    { word: 'शङ्खः', gloss: 'related · ङ as ङ् · conch' },
  ],
  'ङे': [
    { word: 'गङ्गा', gloss: 'related · ङ as ङ् · Ganga' },
    { word: 'रङ्गः', gloss: 'related · ङ as ङ् · color / stage' },
    { word: 'सङ्गीतम्', gloss: 'related · ङ as ङ् · music' },
    { word: 'अङ्गम्', gloss: 'related · ङ as ङ् · limb / body' },
  ],
  'ङै': [
    { word: 'पङ्कजम्', gloss: 'related · ङ as ङ् · lotus' },
    { word: 'शङ्खः', gloss: 'related · ङ as ङ् · conch' },
    { word: 'अङ्कुरः', gloss: 'related · ङ as ङ् · sprout' },
    { word: 'गङ्गा', gloss: 'related · ङ as ङ् · Ganga' },
  ],
  'ङो': [
    { word: 'रङ्गः', gloss: 'related · ङ as ङ् · color / stage' },
    { word: 'अङ्गम्', gloss: 'related · ङ as ङ् · limb / body' },
    { word: 'सङ्गीतम्', gloss: 'related · ङ as ङ् · music' },
    { word: 'शङ्खः', gloss: 'related · ङ as ङ् · conch' },
  ],
  'ङौ': [
    { word: 'अङ्कुरः', gloss: 'related · ङ as ङ् · sprout' },
    { word: 'पङ्कजम्', gloss: 'related · ङ as ङ् · lotus' },
    { word: 'गङ्गा', gloss: 'related · ङ as ङ् · Ganga' },
    { word: 'रङ्गः', gloss: 'related · ङ as ङ् · color / stage' },
  ],
  'ङं': [
    { word: 'अङ्गम्', gloss: 'related · ङ as ङ् · limb / body' },
    { word: 'शङ्खः', gloss: 'related · ङ as ङ् · conch' },
    { word: 'सङ्गीतम्', gloss: 'related · ङ as ङ् · music' },
    { word: 'पङ्कजम्', gloss: 'related · ङ as ङ् · lotus' },
  ],
  'ङः': [
    { word: 'रङ्गः', gloss: 'related · ङ as ङ् · color / stage' },
    { word: 'शङ्खः', gloss: 'related · ङ as ङ् · conch' },
    { word: 'अङ्गम्', gloss: 'related · ङ as ङ् · limb / body' },
    { word: 'गङ्गा', gloss: 'related · ङ as ङ् · Ganga' },
  ],
  // ञ-row — family kid-words write ञ as ञ् (not open ञा/ञि/…). Stick to ञ्, not ज्ञ.
  'ञा': [
    { word: 'पञ्च', gloss: 'related · ञ as ञ् · five' },
    { word: 'अञ्जलिः', gloss: 'related · ञ as ञ् · joined palms' },
    { word: 'अञ्जनम्', gloss: 'related · ञ as ञ् · collyrium' },
    { word: 'कुञ्जरः', gloss: 'related · ञ as ञ् · elephant' },
  ],
  'ञि': [
    { word: 'किञ्चित्', gloss: 'related · ञ as ञ् · a little' },
    { word: 'मञ्जरी', gloss: 'related · ञ as ञ् · blossom cluster' },
    { word: 'पञ्च', gloss: 'related · ञ as ञ् · five' },
    { word: 'अञ्जलिः', gloss: 'related · ञ as ञ् · joined palms' },
  ],
  'ञी': [
    { word: 'मञ्जरी', gloss: 'related · ञ as ञ् · blossom cluster' },
    { word: 'कुञ्जरः', gloss: 'related · ञ as ञ् · elephant' },
    { word: 'अञ्जनम्', gloss: 'related · ञ as ञ् · collyrium' },
    { word: 'पञ्जरम्', gloss: 'related · ञ as ञ् · cage' },
  ],
  'ञु': [
    { word: 'कुञ्जरः', gloss: 'related · ञ as ञ् · elephant' },
    { word: 'पञ्जरम्', gloss: 'related · ञ as ञ् · cage' },
    { word: 'मञ्जुः', gloss: 'related · ञ as ञ् · sweet / lovely' },
    { word: 'अञ्जलिः', gloss: 'related · ञ as ञ् · joined palms' },
  ],
  'ञू': [
    { word: 'पञ्च', gloss: 'related · ञ as ञ् · five' },
    { word: 'किञ्चित्', gloss: 'related · ञ as ञ् · a little' },
    { word: 'मञ्जरी', gloss: 'related · ञ as ञ् · blossom cluster' },
    { word: 'कुञ्जरः', gloss: 'related · ञ as ञ् · elephant' },
  ],
  'ञृ': [
    { word: 'अञ्जनम्', gloss: 'related · ञ as ञ् · collyrium' },
    { word: 'पञ्जरम्', gloss: 'related · ञ as ञ् · cage' },
    { word: 'अञ्जलिः', gloss: 'related · ञ as ञ् · joined palms' },
    { word: 'पञ्च', gloss: 'related · ञ as ञ् · five' },
  ],
  'ञे': [
    { word: 'मञ्जरी', gloss: 'related · ञ as ञ् · blossom cluster' },
    { word: 'अञ्जलिः', gloss: 'related · ञ as ञ् · joined palms' },
    { word: 'किञ्चित्', gloss: 'related · ञ as ञ् · a little' },
    { word: 'कुञ्जरः', gloss: 'related · ञ as ञ् · elephant' },
  ],
  'ञै': [
    { word: 'पञ्जरम्', gloss: 'related · ञ as ञ् · cage' },
    { word: 'अञ्जनम्', gloss: 'related · ञ as ञ् · collyrium' },
    { word: 'मञ्जुः', gloss: 'related · ञ as ञ् · sweet / lovely' },
    { word: 'पञ्च', gloss: 'related · ञ as ञ् · five' },
  ],
  'ञो': [
    { word: 'कुञ्जरः', gloss: 'related · ञ as ञ् · elephant' },
    { word: 'पञ्च', gloss: 'related · ञ as ञ् · five' },
    { word: 'मञ्जरी', gloss: 'related · ञ as ञ् · blossom cluster' },
    { word: 'अञ्जलिः', gloss: 'related · ञ as ञ् · joined palms' },
  ],
  'ञौ': [
    { word: 'किञ्चित्', gloss: 'related · ञ as ञ् · a little' },
    { word: 'पञ्जरम्', gloss: 'related · ञ as ञ् · cage' },
    { word: 'अञ्जनम्', gloss: 'related · ञ as ञ् · collyrium' },
    { word: 'मञ्जरी', gloss: 'related · ञ as ञ् · blossom cluster' },
  ],
  'ञं': [
    { word: 'पञ्च', gloss: 'related · ञ as ञ् · five' },
    { word: 'अञ्जनम्', gloss: 'related · ञ as ञ् · collyrium' },
    { word: 'कुञ्जरः', gloss: 'related · ञ as ञ् · elephant' },
    { word: 'किञ्चित्', gloss: 'related · ञ as ञ् · a little' },
  ],
  'ञः': [
    { word: 'अञ्जलिः', gloss: 'related · ञ as ञ् · joined palms' },
    { word: 'कुञ्जरः', gloss: 'related · ञ as ञ् · elephant' },
    { word: 'पञ्जरम्', gloss: 'related · ञ as ञ् · cage' },
    { word: 'मञ्जुः', gloss: 'related · ञ as ञ् · sweet / lovely' },
  ],
};

export const examplesForVowel = (vowel: string): VowelExample[] => {
  const clean = vowel.normalize('NFC').trim();
  return VOWEL_EXAMPLES[clean] || [];
};

/** Keep only Devanagari so roman labels never break example lookup. */
export const devanagariOnly = (value: string): string =>
  value.normalize('NFC').replace(/[^\u0900-\u097F]/g, '').trim();

const MATRA_MARK = /[ािीुूृॄेैोौंःँ]/;

/** True if `word` contains this exact akṣara (का does not count as क). */
export const wordContainsAkshara = (word: string, tile: string): boolean => {
  const w = devanagariOnly(word);
  const t = devanagariOnly(tile);
  if (!w || !t) return false;
  if (t.length >= 2) return w.includes(t);
  const re = new RegExp(t + '(?!' + MATRA_MARK.source + ')');
  return re.test(w);
};

const allKnownExamples = (): VowelExample[] => {
  const out: VowelExample[] = [];
  const seen = new Set<string>();
  const dump = (lists: Record<string, VowelExample[]>) => {
    Object.values(lists).forEach((arr) => {
      arr.forEach((item) => {
        if (!seen.has(item.word)) {
          seen.add(item.word);
          out.push(item);
        }
      });
    });
  };
  dump(VOWEL_EXAMPLES);
  dump(CONSONANT_EXAMPLES);
  dump(BARAKHADI_EXAMPLES);
  dump(BARAKHADI_RELATED);
  return out;
};

const examplesMatchingTile = (tile: string): VowelExample[] => {
  const hits: VowelExample[] = [];
  for (const item of allKnownExamples()) {
    if (wordContainsAkshara(item.word, tile)) {
      hits.push(item);
      if (hits.length >= 3) break;
    }
  }
  return hits;
};

/** Exact tile for example lookup — never collapse का → क. */
export const baseAksharaForExamples = (akshara: string): string => {
  const clean = devanagariOnly(akshara);
  if (!clean) return clean;
  if (
    VOWEL_EXAMPLES[clean] ||
    CONSONANT_EXAMPLES[clean] ||
    BARAKHADI_EXAMPLES[clean] ||
    BARAKHADI_RELATED[clean]
  ) {
    return clean;
  }
  if (INDEPENDENT_VOWELS.has(clean)) return clean;
  if (isBarakhadiAkshara(clean)) return clean;
  return clean;
};

/** Exact-letter examples only (never BARAKHADI_RELATED). */
export const examplesForAkshara = (akshara: string): VowelExample[] => {
  const clean = devanagariOnly(akshara);
  if (VOWEL_EXAMPLES[clean]?.length) return VOWEL_EXAMPLES[clean];
  if (BARAKHADI_EXAMPLES[clean]?.length) return BARAKHADI_EXAMPLES[clean];
  if (CONSONANT_EXAMPLES[clean]?.length) return CONSONANT_EXAMPLES[clean];
  if (isBarakhadiAkshara(clean) && clean.length > 1) return examplesMatchingTile(clean);
  return [];
};

/** Related-family examples (ङ/ञ matras: written as ङ्/ञ् before a consonant). */
export const relatedExamplesForAkshara = (akshara: string): VowelExample[] => {
  const clean = devanagariOnly(akshara);
  return BARAKHADI_RELATED[clean] || [];
};

/** True when every exact example is the tile itself (rare-alone placeholder / lexicon). */
export const isSelfRareExact = (akshara: string, exact: VowelExample[]): boolean => {
  const clean = devanagariOnly(akshara);
  if (!clean || exact.length === 0) return false;
  return exact.every((item) => devanagariOnly(item.word) === clean);
};

/**
 * Prefer exact real words; when exact is empty or self-rare and related exists,
 * use related (honest non-exact caption in the card).
 */
export const displayExamplesForAkshara = (
  akshara: string
): { examples: VowelExample[]; mode: 'exact' | 'related'; rareNote: string | null } => {
  const clean = devanagariOnly(akshara);
  const exact = examplesForAkshara(clean);
  const related = relatedExamplesForAkshara(clean);
  const selfRare = isSelfRareExact(clean, exact);
  if (related.length > 0 && (exact.length === 0 || selfRare)) {
    const rareNote =
      selfRare && exact[0]?.gloss
        ? exact[0].gloss
        : 'rare alone — in real words ङ is written ङ् before a consonant';
    return { examples: related, mode: 'related', rareNote };
  }
  return { examples: exact, mode: 'exact', rareNote: null };
};

export const hasSoundExamples = (akshara: string): boolean => {
  const bundle = displayExamplesForAkshara(akshara);
  return bundle.examples.length > 0;
};
