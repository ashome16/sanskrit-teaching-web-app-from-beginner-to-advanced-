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

export const examplesForVowel = (vowel: string): VowelExample[] => {
  const clean = vowel.normalize('NFC').trim();
  return VOWEL_EXAMPLES[clean] || [];
};

/** Base letter for example lookup (टा/ति → ट; vowels stay as-is). */
export const baseAksharaForExamples = (akshara: string): string => {
  const clean = akshara.normalize('NFC').trim();
  if (!clean) return clean;
  if (VOWEL_EXAMPLES[clean] || CONSONANT_EXAMPLES[clean]) return clean;
  // Conjunct keys (क्ष त्र ज्ञ) may be multi-codepoint — try full string already failed above.
  const first = clean[0];
  if (CONSONANT_EXAMPLES[first]) return first;
  return clean;
};

/** Vowel or consonant tile examples for Analyse “Words with this sound”. */
export const examplesForAkshara = (akshara: string): VowelExample[] => {
  const base = baseAksharaForExamples(akshara);
  return VOWEL_EXAMPLES[base] || CONSONANT_EXAMPLES[base] || [];
};

export const hasSoundExamples = (akshara: string): boolean =>
  examplesForAkshara(akshara).length > 0;
