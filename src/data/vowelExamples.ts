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
  // ङ-row — ङ almost always ङ् before a consonant; exact matra tiles are rare
  // Standing rule: exact akṣara (का ≠ क). गङ्गा has ङ्ग, not ङा — so rare matra
  // tiles teach the ङ-family link with honest glosses instead of pretending.
  'ङ': [{ word: 'अङ्गम्', gloss: 'limb / body' }, { word: 'गङ्गा', gloss: 'Ganga' }, { word: 'रङ्गः', gloss: 'color / stage' }],
  'ङा': [
    { word: 'ङा', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
  ],
  'ङि': [
    { word: 'ङि', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
  ],
  'ङी': [
    { word: 'ङी', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
  ],
  // ङु: real Dhātupāṭha root (ṅavate “to sound”) — plus ङ-family kid words
  'ङु': [
    { word: 'ङु', gloss: 'to sound (verbal root)' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
  ],
  'ङू': [
    { word: 'ङू', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
  ],
  'ङृ': [
    { word: 'ङृ', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
  ],
  'ङे': [
    { word: 'ङे', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
  ],
  'ङै': [
    { word: 'ङै', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
  ],
  'ङो': [
    { word: 'ङो', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
  ],
  'ङौ': [
    { word: 'ङौ', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
  ],
  'ङं': [
    { word: 'ङं', gloss: 'rare alone — in words ङ becomes ङ् before a consonant' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
  ],
  // ङः: lexicon headword (Medinī / MW) — plus ङ-family kid words
  'ङः': [
    { word: 'ङः', gloss: 'object of sense / Bhairava (lexicon)' },
    { word: 'अङ्गम्', gloss: 'limb · ङ-family (written ङ्ग)' },
    { word: 'गङ्गा', gloss: 'Ganga · ङ-family (written ङ्ग)' },
    { word: 'रङ्गः', gloss: 'colour · ङ-family (written ङ्ग)' },
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
  if (VOWEL_EXAMPLES[clean] || CONSONANT_EXAMPLES[clean] || BARAKHADI_EXAMPLES[clean]) return clean;
  if (INDEPENDENT_VOWELS.has(clean)) return clean;
  if (isBarakhadiAkshara(clean)) return clean;
  return clean;
};

/** Vowel / Varṇamālā letter / बारहखड़ी akṣara examples. */
export const examplesForAkshara = (akshara: string): VowelExample[] => {
  const clean = devanagariOnly(akshara);
  if (VOWEL_EXAMPLES[clean]?.length) return VOWEL_EXAMPLES[clean];
  if (BARAKHADI_EXAMPLES[clean]?.length) return BARAKHADI_EXAMPLES[clean];
  if (CONSONANT_EXAMPLES[clean]?.length) return CONSONANT_EXAMPLES[clean];
  if (isBarakhadiAkshara(clean) && clean.length > 1) return examplesMatchingTile(clean);
  return [];
};

export const hasSoundExamples = (akshara: string): boolean =>
  examplesForAkshara(akshara).length > 0;
