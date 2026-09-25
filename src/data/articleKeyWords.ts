export interface SanskritKeyWord {
  word: string;
  translit: string;
  meaning: string;
}

export const ARTICLE_KEY_WORDS: Record<string, SanskritKeyWord[]> = {
  'evolution-of-sound': [
    { word: 'शब्दब्रह्म', translit: 'Śabda-brahma', meaning: 'Sound as cosmic consciousness' },
    { word: 'उच्चारणम्', translit: 'Uccāraṇam', meaning: 'Phonetic pronunciation' },
    { word: 'कण्ठ्यम्', translit: 'Kaṇṭhya', meaning: 'Throat / Velar articulation' },
    { word: 'तालव्यम्', translit: 'Tālavya', meaning: 'Palatal articulation' },
    { word: 'मूर्धन्यम्', translit: 'Mūrdhanya', meaning: 'Roof of mouth / Retroflex' },
    { word: 'दन्त्यम्', translit: 'Dantya', meaning: 'Dental articulation' },
    { word: 'ओष्ठ्यम्', translit: 'Oṣṭhya', meaning: 'Lips / Labial articulation' },
    { word: 'मातृ', translit: 'Mātṛ', meaning: 'Mother (Latin: Mater)' },
    { word: 'पितृ', translit: 'Pitṛ', meaning: 'Father (Latin: Pater)' },
    { word: 'भ्रातृ', translit: 'Bhrātṛ', meaning: 'Brother (Latin: Frater)' },
    { word: 'नामन्', translit: 'Nāman', meaning: 'Name (Latin: Nomen)' },
    { word: 'जनि', translit: 'Jani', meaning: 'Birth / Generation (Greek: Genos)' },
    { word: 'अष्टाध्यायी', translit: 'Aṣṭādhyāyī', meaning: 'Pāṇini’s 8-chapter grammar code' },
    { word: 'व्याकरणम्', translit: 'Vyākaraṇam', meaning: 'Grammatical science' },
  ],

  'ipa-secret-code': [
    { word: 'उदात्तः', translit: 'Udāttaḥ', meaning: 'High-pitch acute Vedic accent' },
    { word: 'अनुदात्तः', translit: 'Anudāttaḥ', meaning: 'Low-pitch grave accent' },
    { word: 'स्वरितः', translit: 'Svaritaḥ', meaning: 'Combined circumflex tone' },
    { word: 'अच्', translit: 'Ac', meaning: 'Pratyāhāra for all vowels' },
    { word: 'हल्', translit: 'Hal', meaning: 'Pratyāhāra for all consonants' },
    { word: 'प्रातिशाख्यम्', translit: 'Prātiśākhyam', meaning: 'Ancient treatises on phonetics' },
    { word: 'अल्पप्राणः', translit: 'Alpaprāṇaḥ', meaning: 'Unaspirated breath' },
    { word: 'महाप्राणः', translit: 'Mahāprāṇaḥ', meaning: 'Aspirated strong breath' },
  ],

  'mouth-gym-shiva-sutras': [
    { word: 'माहेश्वर-सूत्राणि', translit: 'Māheśvara-sūtrāṇi', meaning: '14 Shiva sound aphorisms' },
    { word: 'अइउण्', translit: 'A-i-uṇ', meaning: '1st Shiva Sutra (root vowels)' },
    { word: 'ऋऌक्', translit: 'Ṛ-ḷk', meaning: '2nd Shiva Sutra (vocalic liquids)' },
    { word: 'प्रत्याहारः', translit: 'Pratyāhāraḥ', meaning: 'Compressed phonetic group code' },
    { word: 'अण्', translit: 'Aṇ', meaning: 'Vowels a, i, u' },
    { word: 'अल्', translit: 'Al', meaning: 'Universal alphabet (all sounds)' },
    { word: 'इत्', translit: 'It', meaning: 'Marker / Dummy end marker tag' },
  ],

  'karakas-and-vibhaktis': [
    { word: 'कारकम्', translit: 'Kārakam', meaning: 'Noun-verb relation / Case role' },
    { word: 'कर्ता', translit: 'Kartā', meaning: 'Nominative agent / Subject' },
    { word: 'कर्म', translit: 'Karma', meaning: 'Accusative target / Direct object' },
    { word: 'करणम्', translit: 'Karaṇam', meaning: 'Instrumental means / Tool' },
    { word: 'सम्प्रदानम्', translit: 'Sampradānam', meaning: 'Dative recipient / Beneficiary' },
    { word: 'अपादानम्', translit: 'Apādānam', meaning: 'Ablative source / Separation point' },
    { word: 'अधिकरणम्', translit: 'Adhikaraṇam', meaning: 'Locative locus / Time & Place base' },
    { word: 'विभक्तिः', translit: 'Vibhaktiḥ', meaning: 'Case inflection suffix' },
  ],

  'dna-of-sanskrit-dhatus': [
    { word: 'धातुः', translit: 'Dhātuḥ', meaning: 'Verbal root / Seed of action' },
    { word: 'धातुपाठः', translit: 'Dhātupāṭhaḥ', meaning: 'Pāṇini’s lexicon of ~2,000 verbal roots' },
    { word: 'गणः', translit: 'Gaṇaḥ', meaning: 'One of 10 verb conjugation classes' },
    { word: 'उपसर्गः', translit: 'Upasargaḥ', meaning: 'Verbal prefix modifying root meaning' },
    { word: 'प्रहारः', translit: 'Prahāraḥ', meaning: 'Assault / Blow (pra + hṛ)' },
    { word: 'आहारः', translit: 'Āhāraḥ', meaning: 'Food / Nutrition (ā + hṛ)' },
    { word: 'संहारः', translit: 'Saṃhāraḥ', meaning: 'Destruction / Dissolution (sam + hṛ)' },
    { word: 'विहारः', translit: 'Vihāraḥ', meaning: 'Leisure stroll (vi + hṛ)' },
    { word: 'परिहारः', translit: 'Parihāraḥ', meaning: 'Remedy / Avoidance (pari + hṛ)' },
  ],

  'sandhi-how-sounds-join': [
    { word: 'सन्धिः', translit: 'Sandhiḥ', meaning: 'Euphonic sound junction' },
    { word: 'संहिता', translit: 'Saṃhitā', meaning: 'Continuous close phonetic flow' },
    { word: 'दीर्घसन्धिः', translit: 'Dīrgha-sandhiḥ', meaning: 'Similar vowel lengthening' },
    { word: 'गुणसन्धिः', translit: 'Guṇa-sandhiḥ', meaning: 'Vowel grade shift (a+i→e, a+u→o)' },
    { word: 'वृद्धिसन्धिः', translit: 'Vṛddhi-sandhiḥ', meaning: 'Vowel expansion (a+e→ai, a+o→au)' },
    { word: 'यण्सन्धिः', translit: 'Yaṇ-sandhiḥ', meaning: 'Vowel-to-semivowel shift (i→y, u→v)' },
    { word: 'अयादिसन्धिः', translit: 'Ayādi-sandhiḥ', meaning: 'Diphthong transition (e→ay, o→av)' },
  ],

  'secret-code-upsarg-pratyaya': [
    { word: 'उपसर्गः', translit: 'Upasargaḥ', meaning: 'Prefix (22 standard prefixes)' },
    { word: 'प्रत्ययः', translit: 'Pratyayaḥ', meaning: 'Affix / Suffix attached to roots' },
    { word: 'कृदन्तः', translit: 'Kṛdantaḥ', meaning: 'Primary verbal participle suffix' },
    { word: 'तद्धितः', translit: 'Taddhitaḥ', meaning: 'Secondary nominal affix' },
    { word: 'सुप्', translit: 'Sup', meaning: '21 noun case declension markers' },
    { word: 'तिङ्', translit: 'Tiṅ', meaning: '18 verb tense & person endings' },
    { word: 'क्त्वा', translit: 'Ktvā', meaning: 'Gerund ("having done")' },
    { word: 'तुमुन्', translit: 'Tumun', meaning: 'Infinitive suffix ("in order to")' },
    { word: 'ल्यप्', translit: 'Lyap', meaning: 'Prefixed gerund ("having well read")' },
  ],

  'sanskrit-symbols-punctuation': [
    { word: 'मात्रा', translit: 'Mātrā', meaning: 'Vowel measure sign on consonants' },
    { word: 'अनुस्वारः', translit: 'Anusvāraḥ', meaning: 'Nasal resonance marker (ं)' },
    { word: 'विसर्गः', translit: 'Visargaḥ', meaning: 'Unvoiced breath echo (ः)' },
    { word: 'हलन्तः', translit: 'Halantaḥ', meaning: 'Virama / Pure vowel-less consonant (्)' },
    { word: 'दण्डः', translit: 'Daṇḍaḥ', meaning: 'Single stick full stop (।)' },
    { word: 'द्विदण्डः', translit: 'Dvidaṇḍaḥ', meaning: 'Double stick verse completion (॥)' },
    { word: 'अवग्रहः', translit: 'Avagrahaḥ', meaning: 'S-shaped dropped "a" marker (ऽ)' },
  ],

  'linga-vachana-foundations': [
    { word: 'पुंल्लिङ्गम्', translit: 'Puṃlliṅgam', meaning: 'Masculine grammatical gender' },
    { word: 'स्त्रीलिङ्गम्', translit: 'Strīliṅgam', meaning: 'Feminine grammatical gender' },
    { word: 'नपुंसकलिङ्गम्', translit: 'Napuṃsakaliṅgam', meaning: 'Neuter grammatical gender' },
    { word: 'एकवचनम्', translit: 'Ekavacanam', meaning: 'Singular number (one object)' },
    { word: 'द्विवचनम्', translit: 'Dvivacanam', meaning: 'Dual number (exactly two objects)' },
    { word: 'बहुवचनम्', translit: 'Bahuvacanam', meaning: 'Plural number (three or more)' },
    { word: 'अन्वयः', translit: 'Anvayaḥ', meaning: 'Logical agreement in syntax' },
  ],

  'understanding-vibhaktis-balaka': [
    { word: 'बालकः', translit: 'Bālakaḥ', meaning: 'A boy (1st / Nominative)' },
    { word: 'बालकम्', translit: 'Bālakam', meaning: 'To the boy (2nd / Accusative)' },
    { word: 'बालकेन', translit: 'Bālakena', meaning: 'By/with the boy (3rd / Instrumental)' },
    { word: 'बालकाय', translit: 'Bālakāya', meaning: 'For the boy (4th / Dative)' },
    { word: 'बालकात्', translit: 'Bālakāt', meaning: 'From the boy (5th / Ablative)' },
    { word: 'बालकस्य', translit: 'Bālakasya', meaning: 'Of the boy (6th / Genitive)' },
    { word: 'बालके', translit: 'Bālake', meaning: 'In/on the boy (7th / Locative)' },
    { word: 'हे बालक!', translit: 'He bālaka!', meaning: 'O boy! (8th / Vocative)' },
  ],

  'katapayadi-number-words': [
    { word: 'कटपयादि', translit: 'Kaṭapayādi', meaning: 'Ancient alphanumeric numeral cipher' },
    { word: 'कादिर्नव', translit: 'Kādirnava', meaning: 'Ka to Jha represent digits 1–9' },
    { word: 'टादिर्नव', translit: 'Ṭādirnava', meaning: 'Ṭa to Dha represent digits 1–9' },
    { word: 'पादिपञ्चकम्', translit: 'Pādipañcakam', meaning: 'Pa to Ma represent digits 1–5' },
    { word: 'याद्यष्टकम्', translit: 'Yādyaṣṭakam', meaning: 'Ya to Ha represent digits 1–8' },
    { word: 'अङ्कानां वामतो गतिः', translit: 'Aṅkānāṃ Vāmato Gatiḥ', meaning: 'Digits flow from right to left' },
    { word: 'गोपीभाग्यमधुव्रातः', translit: 'Gopībhāgyamadhuvrātaḥ', meaning: 'Pi (π) encrypted to 32 decimals' },
    { word: 'मेलकर्ता', translit: 'Melakartā', meaning: '72 foundational scales in music' },
  ],
};
