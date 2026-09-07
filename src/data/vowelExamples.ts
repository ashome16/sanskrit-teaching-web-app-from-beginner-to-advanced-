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
  'ऊ': [{ word: 'सूर्यः', gloss: 'sun' }, { word: 'भूमिः', gloss: 'earth' }, { word: 'पूर्णम्', gloss: 'full/complete' }],
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
  'ग': [
    { word: 'गजः', gloss: 'elephant' },
    { word: 'गुरुः', gloss: 'teacher' },
    { word: 'गङ्गा', gloss: 'Ganga' },
  ],
  'घ': [
    { word: 'घरम्', gloss: 'house' },
    { word: 'घटः', gloss: 'pot' },
    { word: 'मेघः', gloss: 'cloud' },
    { word: 'घृतम्', gloss: 'ghee' },
  ],
};

export const examplesForVowel = (vowel: string): VowelExample[] => {
  const clean = vowel.normalize('NFC').trim();
  return VOWEL_EXAMPLES[clean] || [];
};

/** Vowel or consonant tile examples for Analyse “Words with this sound”. */
export const examplesForAkshara = (akshara: string): VowelExample[] => {
  const clean = akshara.normalize('NFC').trim();
  return VOWEL_EXAMPLES[clean] || CONSONANT_EXAMPLES[clean] || [];
};

export const hasSoundExamples = (akshara: string): boolean =>
  examplesForAkshara(akshara).length > 0;
