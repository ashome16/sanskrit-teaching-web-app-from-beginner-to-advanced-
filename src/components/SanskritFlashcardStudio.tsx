import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { playPronunciation } from '../utils/pronunciation';

export interface SanskritFlashcard {
  id: string;
  moduleId: number;
  moduleName: string;
  lessonId: string;
  lessonNumber: string;
  devanagari: string;
  iast: string;
  category: 'phonetics' | 'script' | 'grammar' | 'syntax' | 'science' | 'philosophy';
  definition: string;
  formulaOrDetail: string;
  insight: string;
  exampleSanskrit?: string;
  exampleEnglish?: string;
}

export const SANSKRIT_FLASHCARDS: SanskritFlashcard[] = [
  // Module 1: Sound as Input (ध्वनिः)
  {
    id: 'fc-1',
    moduleId: 1,
    moduleName: 'Module 1: ध्वनिः · Sound as Input',
    lessonId: 'c-1-1',
    lessonNumber: '1.1',
    devanagari: 'ॐ (ओम्)',
    iast: 'Oṁ',
    category: 'phonetics',
    definition: 'The primordial continuous resonant vibration uniting throat, palate, and closed lips.',
    formulaOrDetail: 'A + U + M (अकार + उकार + मकार) + Ardha-mātrā (नाद-बिन्दु)',
    insight: 'Language is treated not as arbitrary data, but as calibrated physical resonance that stabilizes mental fluctuations.',
    exampleSanskrit: 'तस्य वाचकः प्रणवः ॥ (Yoga Sūtra 1.27)',
    exampleEnglish: 'The word signifying the Supreme Consciousness is Praṇava (Oṁ).'
  },
  {
    id: 'fc-2',
    moduleId: 1,
    moduleName: 'Module 1: ध्वनिः · Sound as Input',
    lessonId: 'c-1-2',
    lessonNumber: '1.2',
    devanagari: 'कण्ठ्य-वर्णाः',
    iast: 'Kaṇṭhya-varṇāḥ',
    category: 'phonetics',
    definition: 'Velar / throat phonemes articulated at the base of the throat without tongue-palate contact.',
    formulaOrDetail: 'अकुहविसर्जनीयानां कण्ठः (अ, आ, क, ख, ग, घ, ङ, ह, विसर्गः)',
    insight: 'The deepest acoustic origin point in the human flute, creating grounded, open sound.',
    exampleSanskrit: 'क, ख, ग, घ, ङ, ह, ः',
    exampleEnglish: 'Syllables born directly in the throat.'
  },
  {
    id: 'fc-3',
    moduleId: 1,
    moduleName: 'Module 1: ध्वनिः · Sound as Input',
    lessonId: 'c-1-2',
    lessonNumber: '1.2',
    devanagari: 'तालव्य-वर्णाः',
    iast: 'Tālavya-varṇāḥ',
    category: 'phonetics',
    definition: 'Palatal phonemes produced when the middle of the tongue strikes the hard palate roof.',
    formulaOrDetail: 'इचुयशानां तालु (इ, ई, च, छ, ज, झ, ञ, य, श)',
    insight: 'Produces bright, fluid, forward-flowing acoustic resonance.',
    exampleSanskrit: 'च, छ, ज, झ, ञ, य, श',
    exampleEnglish: 'Palatal consonants and front vowels.'
  },
  {
    id: 'fc-4',
    moduleId: 1,
    moduleName: 'Module 1: ध्वनिः · Sound as Input',
    lessonId: 'c-1-2',
    lessonNumber: '1.2',
    devanagari: 'मूर्धन्य-वर्णाः',
    iast: 'Mūrdhanya-varṇāḥ',
    category: 'phonetics',
    definition: 'Retroflex phonemes where the tongue tip curls upward to tap the roof dome of the palate.',
    formulaOrDetail: 'ऋटुरषाणां मूर्धा (ऋ, ॠ, ट, ठ, ड, ढ, ण, र, ष)',
    insight: 'Unique retroflex resonance that engages upper cranium cranial cavities.',
    exampleSanskrit: 'ट, ठ, ड, ढ, ण, र, ष',
    exampleEnglish: 'Retroflex sounds curling to the roof of the mouth.'
  },
  {
    id: 'fc-5',
    moduleId: 1,
    moduleName: 'Module 1: ध्वनिः · Sound as Input',
    lessonId: 'c-1-2',
    lessonNumber: '1.2',
    devanagari: 'दन्त्य-वर्णाः',
    iast: 'Dantya-varṇāḥ',
    category: 'phonetics',
    definition: 'Dental phonemes articulated by the tongue tip touching the upper front teeth.',
    formulaOrDetail: 'ऌतुलसानां दन्ताः (ऌ, त, थ, द, ध, न, ल, स)',
    insight: 'Sharp, distinct, and precise acoustic boundaries.',
    exampleSanskrit: 'त, थ, द, ध, न, ल, स',
    exampleEnglish: 'Dental consonants.'
  },
  {
    id: 'fc-6',
    moduleId: 1,
    moduleName: 'Module 1: ध्वनिः · Sound as Input',
    lessonId: 'c-1-2',
    lessonNumber: '1.2',
    devanagari: 'ओष्ठ्य-वर्णाः',
    iast: 'Oṣṭhya-varṇāḥ',
    category: 'phonetics',
    definition: 'Labial phonemes articulated purely at the lips by bringing upper and lower lips together.',
    formulaOrDetail: 'उपूपध्मानीयानामोष्ठौ (उ, ऊ, प, फ, ब, भ, म, उपध्मानीयः)',
    insight: 'The final, outermost gate of vocal emergence.',
    exampleSanskrit: 'प, फ, ब, भ, म',
    exampleEnglish: 'Labial consonants terminating at the lips.'
  },
  {
    id: 'fc-7',
    moduleId: 1,
    moduleName: 'Module 1: ध्वनिः · Sound as Input',
    lessonId: 'c-1-3',
    lessonNumber: '1.3',
    devanagari: 'मात्रा (ह्रस्व-दीर्घ-प्लुतः)',
    iast: 'Mātrā',
    category: 'phonetics',
    definition: 'The fundamental temporal quantum unit of vowel duration.',
    formulaOrDetail: '१ मात्रा = ह्रस्वः (Short) · २ मात्राः = दीर्घः (Long) · ३ मात्राः = प्लुतः (Prolated)',
    insight: 'Duration is mathematical and absolute; shortening or lengthening a vowel alters word meaning.',
    exampleSanskrit: 'एकमात्रो भवेद्ध्रस्वो द्विमात्रो दीर्घ उच्यते । त्रिमात्रस्तु प्लुतो ज्ञेयः ॥',
    exampleEnglish: 'One beat is short, two beats long, three beats prolated.'
  },
  {
    id: 'fc-8',
    moduleId: 1,
    moduleName: 'Module 1: ध्वनिः · Sound as Input',
    lessonId: 'c-1-5',
    lessonNumber: '1.5',
    devanagari: 'विसर्गः ( ः )',
    iast: 'Visargaḥ',
    category: 'phonetics',
    definition: 'An unvoiced glottal breath release that acoustically echoes the preceding vowel.',
    formulaOrDetail: 'अः = aha · इः = ihi · उः = uhu (e.g. रामः = Rāmaha, हरिः = Harihi, गुरुः = Gūruhu)',
    insight: 'A release of prāṇa rather than an arbitrary static punctuation mark.',
    exampleSanskrit: 'रामः (Rāmaḥ) · शान्तिः (Śāntiḥ)',
    exampleEnglish: 'The gentle vocalic breath echo.'
  },
  {
    id: 'fc-9',
    moduleId: 1,
    moduleName: 'Module 1: ध्वनिः · Sound as Input',
    lessonId: 'c-1-6',
    lessonNumber: '1.6',
    devanagari: 'माहेश्वर-सूत्राणि',
    iast: 'Māheśvara-Sūtrāṇi',
    category: 'phonetics',
    definition: 'The 14 cosmic sound vectors sounded by Śiva’s Ḍamaru that organize all human speech.',
    formulaOrDetail: 'अइउण् । ऋऌक् । एओङ् । ऐऔच् । हयवरट् । लण् । ञमङणनम् ... हल् ॥',
    insight: 'The world’s first lossless phonological compression algorithm, created 2,500 years ago.',
    exampleSanskrit: 'नृत्तावसाने नटराजराजो ननाद ढक्कां नवपञ्चवारम् ॥',
    exampleEnglish: 'At the close of His cosmic dance, Śiva sounded His drum 14 (9+5) times.'
  },
  {
    id: 'fc-10',
    moduleId: 1,
    moduleName: 'Module 1: ध्वनिः · Sound as Input',
    lessonId: 'c-1-6',
    lessonNumber: '1.6',
    devanagari: 'प्रत्याहारः (अल् / अच् / हल्)',
    iast: 'Pratyāhāraḥ',
    category: 'science',
    definition: 'An algebraic range token enclosing all sounds between an initial sound and an "It" marker.',
    formulaOrDetail: 'अल् = All phonemes (42) · अच् = All vowels (9) · हल् = All consonants (33)',
    insight: 'Anticipates computer array slices: `sounds[start:end]` in 500 BCE.',
    exampleSanskrit: 'अच् (ac) = अ, इ, उ, ऋ, ऌ, ए, ओ, ऐ, औ',
    exampleEnglish: 'The complete set of Sanskrit vowels.'
  },

  // Module 2: Script and Symbols (लिपिः)
  {
    id: 'fc-11',
    moduleId: 2,
    moduleName: 'Module 2: लिपिः · Script and Symbols',
    lessonId: 'c-2-1',
    lessonNumber: '2.1',
    devanagari: 'अक्षरम् (अ-क्षरम्)',
    iast: 'Akṣaram',
    category: 'script',
    definition: 'Literally "that which does not decay" — the indestructible syllabic atom of Devanāgarī.',
    formulaOrDetail: 'Consonant + Vowel nucleus (e.g. क् + आ = का)',
    insight: 'Devanāgarī is an abugida where consonants naturally carry the short vowel "a" unless modified.',
    exampleSanskrit: 'अक्षरं परमं ब्रह्म (Gītā 8.3)',
    exampleEnglish: 'The indestructible sound is the Supreme Reality.'
  },
  {
    id: 'fc-12',
    moduleId: 2,
    moduleName: 'Module 2: लिपिः · Script and Symbols',
    lessonId: 'c-2-2',
    lessonNumber: '2.2',
    devanagari: 'मात्रा-चिह्नम्',
    iast: 'Mātrā-Cihnam',
    category: 'script',
    definition: 'Dependent vowel signs attached above, below, before, or after consonants.',
    formulaOrDetail: 'ा (ā), ि (i), ी (ī), ु (u), ू (ū), ृ (ṛ), े (e), ै (ai), ो (o), ौ (au)',
    insight: 'Visual transparency: vowel markers mirror physical breath modifiers rather than separate isolated letters.',
    exampleSanskrit: 'क् + ि = कि · क् + ी = की',
    exampleEnglish: 'Short vs long vowel modifier glyphs.'
  },
  {
    id: 'fc-13',
    moduleId: 2,
    moduleName: 'Module 2: लिपिः · Script and Symbols',
    lessonId: 'c-2-2',
    lessonNumber: '2.2',
    devanagari: 'हलन्तः / विरामः ( ् )',
    iast: 'Halantaḥ / Virāmaḥ',
    category: 'script',
    definition: 'The consonant stroke that suppresses the inherent short vowel "a".',
    formulaOrDetail: 'क (ka) + ् = क् (pure unvoiced consonant /k/)',
    insight: 'Allows consonants to fuse into high-velocity clusters without intervening breath.',
    exampleSanskrit: 'तत् (tat) · वाक् (vāk)',
    exampleEnglish: 'Words terminating in pure consonants.'
  },
  {
    id: 'fc-14',
    moduleId: 2,
    moduleName: 'Module 2: लिपिः · Script and Symbols',
    lessonId: 'c-2-3',
    lessonNumber: '2.3',
    devanagari: 'संयुक्ताक्षरम्',
    iast: 'Saṁyuktākṣaram',
    category: 'script',
    definition: 'Consonant conjunct cluster interlocking two or more consonants before a vowel.',
    formulaOrDetail: 'क् + ष् + अ = क्ष (kṣa) · त् + र् + अ = त्र (tra) · ज् + ञ् + अ = ज्ञ (jña)',
    insight: 'Typographical ligature that mirrors uninterrupted kinetic vocal flow.',
    exampleSanskrit: 'विद्या (vidyā: द् + य् + आ) · ज्ञानम् (jñānam)',
    exampleEnglish: 'Knowledge and wisdom expressed through conjuncts.'
  },

  // Module 3: Rules as Processing (व्याकरणम्)
  {
    id: 'fc-15',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-1',
    lessonNumber: '3.1',
    devanagari: 'धातुः',
    iast: 'Dhātuḥ',
    category: 'grammar',
    definition: 'The indestructible semantic seed root from which all verbs and nouns are derived.',
    formulaOrDetail: '~2,000 roots categorized into 10 Gaṇas (भ्वादि, अदादि, etc.)',
    insight: 'Sanskrit is generative: language is not a dictionary of static words, but an algorithmic derivation from roots.',
    exampleSanskrit: 'कृ (to do) ➔ करोति, कार्यम्, करणम्, कर्ता, कर्म',
    exampleEnglish: 'One root gives birth to action, doer, tool, and duty.'
  },
  {
    id: 'fc-16',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-2',
    lessonNumber: '3.2',
    devanagari: 'लट्-लकारः',
    iast: 'Laṭ-Lakāraḥ',
    category: 'grammar',
    definition: 'The present indicative tense denoting continuous or immediate action.',
    formulaOrDetail: 'ति तः अन्ति । सि थः थ । मि वः मः ॥',
    insight: 'Dual number (द्विवचनम्) is preserved everywhere: celebrating sacred pairs (pupil-teacher, day-night).',
    exampleSanskrit: 'पठति (he reads) · पठतः (they two read) · पठन्ति (they all read)',
    exampleEnglish: 'Present tense verb conjugation.'
  },
  {
    id: 'fc-17',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-4',
    lessonNumber: '3.4',
    devanagari: 'कारकम्',
    iast: 'Kārakam',
    category: 'grammar',
    definition: 'The deep semantic syntactic relationship linking a noun directly to the action of the verb.',
    formulaOrDetail: '६ कारकाणि: कर्ता, कर्म, करणम्, सम्प्रदानम्, अपादानम्, अधिकरणम्',
    insight: 'Syntax is independent of word order: case endings carry meaning regardless of sentence position.',
    exampleSanskrit: 'क्रियान्वयि कारकम्',
    exampleEnglish: 'That which directly connects with the verb is a Kāraka.'
  },
  {
    id: 'fc-18',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-4',
    lessonNumber: '3.4',
    devanagari: 'प्रथमा विभक्तिः (कर्ता)',
    iast: 'Prathamā Vibhaktiḥ (Kartā)',
    category: 'grammar',
    definition: 'Nominative case denoting the autonomous agent or subject performing the verb.',
    formulaOrDetail: 'स्वतंत्रः कर्ता (Pāṇini 1.4.54) · रामः, बालकाः, ज्ञानम्',
    insight: 'The doer who initiates the causal chain of the action.',
    exampleSanskrit: 'बालकः पुस्तकं पठति ।',
    exampleEnglish: 'The boy reads the book.'
  },
  {
    id: 'fc-19',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-4',
    lessonNumber: '3.4',
    devanagari: 'द्वितीया विभक्तिः (कर्म)',
    iast: 'Dvitīyā Vibhaktiḥ (Karma)',
    category: 'grammar',
    definition: 'Accusative case denoting the direct object or goal most desired by the agent.',
    formulaOrDetail: 'कर्तुरीप्सिततमं कर्म (Pāṇini 1.4.49) · रामम्, नगरम्, विद्याम्',
    insight: 'The recipient of the action or destination of movement.',
    exampleSanskrit: 'शिष्यः गुरुकुलं गच्छति ।',
    exampleEnglish: 'The disciple goes to the Gurukul.'
  },
  {
    id: 'fc-20',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-4',
    lessonNumber: '3.4',
    devanagari: 'तृतीया विभक्तिः (करणम्)',
    iast: 'Tṛtīyā Vibhaktiḥ (Karaṇam)',
    category: 'grammar',
    definition: 'Instrumental case denoting the primary instrument or means used to accomplish the verb.',
    formulaOrDetail: 'साधकतमं करणम् (Pāṇini 1.4.42) · रामेण, हस्तेन, मनसा',
    insight: 'The tool or attitude through which the action is accomplished.',
    exampleSanskrit: 'मनसा चिन्तयति ।',
    exampleEnglish: 'One contemplates with the mind.'
  },
  {
    id: 'fc-21',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-4',
    lessonNumber: '3.4',
    devanagari: 'चतुर्थी विभक्तिः (सम्प्रदानम्)',
    iast: 'Caturthī Vibhaktiḥ (Sampradānam)',
    category: 'grammar',
    definition: 'Dative case denoting the recipient to whom something is dedicated or given.',
    formulaOrDetail: 'कर्मणा यमभिप्रेति स सम्प्रदानम् (Pāṇini 1.4.32) · रामाय, गुरुवे, नमः',
    insight: 'Reverence and offering: always paired with "namaḥ" (salutations).',
    exampleSanskrit: 'श्रीगुरवे नमः ।',
    exampleEnglish: 'Salutations unto the sacred Guru.'
  },
  {
    id: 'fc-22',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-4',
    lessonNumber: '3.4',
    devanagari: 'पञ्चमी विभक्तिः (अपादानम्)',
    iast: 'Pañcamī Vibhaktiḥ (Apādānam)',
    category: 'grammar',
    definition: 'Ablative case denoting the fixed point of departure, separation, or origin.',
    formulaOrDetail: 'ध्रुवमपायेऽपादानम् (Pāṇini 1.4.24) · रामात्, तमसो, मृत्योः',
    insight: 'Departure from ignorance or mortality toward illumination.',
    exampleSanskrit: 'तमसो मा ज्योतिर्गमय ।',
    exampleEnglish: 'From darkness, lead me to light.'
  },
  {
    id: 'fc-23',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-4',
    lessonNumber: '3.4',
    devanagari: 'षष्ठी विभक्तिः (सम्बन्धः)',
    iast: 'Ṣaṣṭhī Vibhaktiḥ (Sambandhaḥ)',
    category: 'grammar',
    definition: 'Genitive case denoting relationship, possession, or lineage (not a direct Kāraka).',
    formulaOrDetail: 'षष्ठी शेषे (Pāṇini 2.3.50) · रामस्य, गुरोः, उपनिषदः',
    insight: 'Binds one noun to another noun rather than to the verb.',
    exampleSanskrit: 'गुरोः कृपा ।',
    exampleEnglish: 'The grace of the Guru.'
  },
  {
    id: 'fc-24',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-4',
    lessonNumber: '3.4',
    devanagari: 'सप्तमी विभक्तिः (अधिकरणम्)',
    iast: 'Saptamī Vibhaktiḥ (Adhikaraṇam)',
    category: 'grammar',
    definition: 'Locative case denoting the container, substrate, physical place, or temporal setting.',
    formulaOrDetail: 'आधारोऽधिकरणम् (Pāṇini 1.4.45) · रामे, हृदये, लोके',
    insight: 'The sacred ground or locus supporting the entire action.',
    exampleSanskrit: 'हृदये वसति ।',
    exampleEnglish: 'He abides in the heart.'
  },
  {
    id: 'fc-25',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-5',
    lessonNumber: '3.5',
    devanagari: 'सन्धिः',
    iast: 'Sandhiḥ',
    category: 'grammar',
    definition: 'Euphonic combination rules that harmonize contiguous sounds at word or morpheme boundaries.',
    formulaOrDetail: 'परः सन्निकर्षः संहिता (Pāṇini 1.4.109)',
    insight: 'Preserves the law of least acoustic resistance: speech flows without jagged vocal effort.',
    exampleSanskrit: 'हिम + आलयः = हिमालयः · जगत् + नाथः = जगन्नाथः',
    exampleEnglish: 'Sound merger at boundary points.'
  },
  {
    id: 'fc-26',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-5',
    lessonNumber: '3.5',
    devanagari: 'यण्-सन्धिः (इको यणचि)',
    iast: 'Yaṇ-Sandhiḥ',
    category: 'grammar',
    definition: 'Transformation of simple vowels into corresponding semivowels before dissimilar vowels.',
    formulaOrDetail: 'इ/ई ➔ य् · उ/ऊ ➔ व् · ऋ/ॠ ➔ र् · ऌ ➔ ल्',
    insight: 'Pure mathematical mapping from high vowels to fluid semivowels.',
    exampleSanskrit: 'यदि + अपि = यद्यपि · सु + आगतम् = स्वागतम्',
    exampleEnglish: 'If i/u precedes another vowel, it transforms to y/v.'
  },
  {
    id: 'fc-27',
    moduleId: 3,
    moduleName: 'Module 3: व्याकरणम् · Rules as Processing',
    lessonId: 'c-3-6',
    lessonNumber: '3.6',
    devanagari: 'समासः (तत्पुरुष / बहुव्रीहि / द्वन्द्व)',
    iast: 'Samāsaḥ',
    category: 'grammar',
    definition: 'Compound noun fusion compacting multiple words into a single semantic token.',
    formulaOrDetail: 'समसनं समासः (Pāṇini 2.1.3)',
    insight: 'Allows complex multidimensional philosophical ideas to be packed into single words.',
    exampleSanskrit: 'रामलक्ष्मणौ (Dvandva) · पीताम्बरः (Bahuvrīhi)',
    exampleEnglish: 'Compound word synthesis.'
  },

  // Module 4: Meaning as Output (वाक्यम्)
  {
    id: 'fc-28',
    moduleId: 4,
    moduleName: 'Module 4: वाक्यम् · Meaning as Output',
    lessonId: 'c-4-1',
    lessonNumber: '4.1',
    devanagari: 'अन्वयः',
    iast: 'Anvayaḥ',
    category: 'syntax',
    definition: 'The logical syntactic reordering of poetic metered verses into prose prose word order.',
    formulaOrDetail: 'Kartā (Subject) ➔ Kāraka modifiers ➔ Karma (Object) ➔ Kriyā (Verb)',
    insight: 'The key that unlocks direct understanding of classical poetry without translations.',
    exampleSanskrit: 'दण्डान्वयः (syntactic questioning) · खण्डान्वयः (thematic grouping)',
    exampleEnglish: 'Syntactic prose reconstruction of poetry.'
  },
  {
    id: 'fc-29',
    moduleId: 4,
    moduleName: 'Module 4: वाक्यम् · Meaning as Output',
    lessonId: 'c-4-4',
    lessonNumber: '4.4',
    devanagari: 'अनुष्टुभ्-छन्दः',
    iast: 'Anuṣṭubh-Chandaḥ',
    category: 'syntax',
    definition: 'The 32-syllable cosmic meter with four quarters (pādas) of 8 syllables each.',
    formulaOrDetail: 'श्लोके षष्ठं गुरु ज्ञेयं सर्वत्र लघु पञ्चमम् । द्विचतुष्पादयोर्ह्रस्वं सप्तमं दीर्घमन्ययोः ॥',
    insight: 'Universal 5-6-7 metric cadence (˘ ¯ ¯ in odd pādas, ˘ ¯ ˘ in even pādas) that cradles memory.',
    exampleSanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । (Gītā 4.7)',
    exampleEnglish: 'The classic meter of the Bhagavad Gītā and Rāmāyaṇa.'
  },

  // Module 5: The Scientific Mind (गणितम्)
  {
    id: 'fc-30',
    moduleId: 5,
    moduleName: 'Module 5: गणितम् · The Scientific Mind',
    lessonId: 'c-5-3',
    lessonNumber: '5.3',
    devanagari: 'कटपयादि-सङ्ख्या',
    iast: 'Kaṭapayādi-Saṅkhyā',
    category: 'science',
    definition: 'An ancient alphanumeric cipher mapping Sanskrit consonants to digits 0–9.',
    formulaOrDetail: 'कादि ९, टादि ९, पादि ५, यादि ८, स्वराः शून्यम् । अङ्कानां वामतो गतिः (Read right to left).',
    insight: 'Turned dry mathematical constants (π, trigonometric tables) into beautiful devotional poetry.',
    exampleSanskrit: 'गोपीभाग्यमधुव्रातः... (encodes π to 31 decimal places!)',
    exampleEnglish: 'Mathematical constants disguised as poetry.'
  },
  {
    id: 'fc-31',
    moduleId: 5,
    moduleName: 'Module 5: गणितम् · The Scientific Mind',
    lessonId: 'c-5-1',
    lessonNumber: '5.1',
    devanagari: 'प्रस्तारः',
    iast: 'Prastāraḥ',
    category: 'science',
    definition: 'Ācārya Piṅgala’s combinatorial algorithm generating all 2ⁿ permutations of meter syllables.',
    formulaOrDetail: 'Laghu (ल = 0) & Guru (ग = 1) ➔ 2ⁿ binary states',
    insight: 'The world’s first formal binary truth table, formalized 2,100 years before George Boole.',
    exampleSanskrit: 'द्विकौ ल् (Chandaḥsūtra 8.23)',
    exampleEnglish: 'Recursive binary truth table generator.'
  },
  {
    id: 'fc-32',
    moduleId: 5,
    moduleName: 'Module 5: गणितम् · The Scientific Mind',
    lessonId: 'c-5-1',
    lessonNumber: '5.1',
    devanagari: 'मेरु-प्रस्तारः',
    iast: 'Meru-Prastāraḥ',
    category: 'science',
    definition: 'The pyramidal binomial distribution grid conceptualized by Piṅgala and Halāyudha.',
    formulaOrDetail: 'Row n: Binomial coefficients C(n, k) = n! / (k!(n-k)!)',
    insight: 'Known in Europe as Pascal’s Triangle (1654), but described by Piṅgala in 300 BCE.',
    exampleSanskrit: 'परे पूर्णम् (Chandaḥsūtra 8.35)',
    exampleEnglish: 'The sacred pyramid of binomial combinations.'
  },
  {
    id: 'fc-33',
    moduleId: 5,
    moduleName: 'Module 5: गणितम् · The Scientific Mind',
    lessonId: 'c-5-2',
    lessonNumber: '5.2',
    devanagari: 'एकाधिकेन पूर्वेण',
    iast: 'Ekādhikena Pūrveṇa',
    category: 'science',
    definition: 'Vedic mathematics sūtra: "By one more than the previous one".',
    formulaOrDetail: 'Squares ending in 5: (N·5)² = [N × (N+1)] | 25 (e.g. 75² = 7×8 | 25 = 5625)',
    insight: 'Mental algebra converting quadratic computations into instant single-line calculations.',
    exampleSanskrit: 'एकाधिकेन पूर्वेण (Vedic Maths Sūtra 1)',
    exampleEnglish: 'Instant mental squaring algorithm.'
  },
  {
    id: 'fc-34',
    moduleId: 5,
    moduleName: 'Module 5: गणितम् · The Scientific Mind',
    lessonId: 'c-5-2',
    lessonNumber: '5.2',
    devanagari: 'ऊर्ध्व-तिर्यग्भ्याम्',
    iast: 'Ūrdhva-Tiryagbhyām',
    category: 'science',
    definition: 'Vedic mathematics sūtra: "Vertically and Crosswise".',
    formulaOrDetail: 'Universal cross-multiplication matrix algorithm for any two n-digit numbers.',
    insight: 'Reduces nested two-dimensional multiplication arrays to a single running mental accumulator.',
    exampleSanskrit: 'ऊर्ध्वतिर्यग्भ्यां सर्वत्र (Universal Multiplication)',
    exampleEnglish: 'Vertically and crosswise multiplication.'
  },

  // Module 6: The Contemplative Mind (दर्शनम्)
  {
    id: 'fc-35',
    moduleId: 6,
    moduleName: 'Module 6: दर्शनम् · The Contemplative Mind',
    lessonId: 'c-6-1',
    lessonNumber: '6.1',
    devanagari: 'शब्दब्रह्म',
    iast: 'Śabda-Brahman',
    category: 'philosophy',
    definition: 'The foundational Vedic insight that the universe is vibrational reality made manifest.',
    formulaOrDetail: 'अनादिनिधनं ब्रह्म शब्दतत्त्वं यदक्षरम् (Vākyapadīya 1.1)',
    insight: 'Language is not an arbitrary human tool; it is the direct acoustic signature of the real.',
    exampleSanskrit: 'नादब्रह्म (Nāda-Brahma) · स्फोटः (Sphoṭa)',
    exampleEnglish: 'Ultimate reality as primordial cosmic sound.'
  },
  {
    id: 'fc-36',
    moduleId: 6,
    moduleName: 'Module 6: दर्शनम् · The Contemplative Mind',
    lessonId: 'c-6-3',
    lessonNumber: '6.3',
    devanagari: 'षड्दर्शनानि',
    iast: 'Ṣaḍ-Darśanāni',
    category: 'philosophy',
    definition: 'The six classical schools of Indian philosophy ("ways of seeing" reality).',
    formulaOrDetail: 'न्याय (Logic), वैशेषिक (Atomism), साङ्ख्य (Evolution), योग (Psychology), मीमांसा (Acoustics), वेदान्त (Non-duality)',
    insight: 'They do not contradict; they complete each other like steps on an ascending spiral of human knowing.',
    exampleSanskrit: 'दृश्यते अनेन इति दर्शनम्',
    exampleEnglish: 'That through which Truth is seen is a Darśana.'
  },
  {
    id: 'fc-37',
    moduleId: 6,
    moduleName: 'Module 6: दर्शनम् · The Contemplative Mind',
    lessonId: 'c-6-1',
    lessonNumber: '6.1',
    devanagari: 'सह नाववतु',
    iast: 'Saha Nāv Avatu',
    category: 'philosophy',
    definition: 'The sacred Upaniṣadic study-covenant refusing the solo user before the first lesson begins.',
    formulaOrDetail: 'Dual verbs: avatu, bhunaktu, karavāvahai, vidviṣāvahai ("us both together")',
    insight: 'Knowledge is food, not cargo; study is valid only when protected by shared duty (adhikāra) and absence of hostility.',
    exampleSanskrit: 'तेजस्वि नावधीतमस्तु मा विद्विषावहै ॥',
    exampleEnglish: 'May our study be brilliant; may we never hold hatred.'
  },
  {
    id: 'fc-38',
    moduleId: 6,
    moduleName: 'Module 6: दर्शनम् · The Contemplative Mind',
    lessonId: 'c-6-1',
    lessonNumber: '6.1',
    devanagari: 'श्लोकः बनाम मन्त्रः',
    iast: 'Śloka vs. Mantra',
    category: 'philosophy',
    definition: 'Form vs. Function: A shloka is a verse form meant to be understood; a mantra is a sacred formula meant to be inhabited.',
    formulaOrDetail: 'श्लोकः = छन्दः / काव्यम् (Anuṣṭubh) · मन्त्रः = मननात् त्रायते (Japa & vibration)',
    insight: 'Shlokas illuminate the intellect with meaning; mantras dissolve the restless ego in sound.',
    exampleSanskrit: 'मननात् त्रायते इति मन्त्रः ॥',
    exampleEnglish: 'That which protects the mind through repetition is a mantra.'
  },
  {
    id: 'fc-39',
    moduleId: 6,
    moduleName: 'Module 6: दर्शनम् · The Contemplative Mind',
    lessonId: 'c-6-1',
    lessonNumber: '6.1',
    devanagari: 'तापत्रयम् (त्रिविध-शान्तिः)',
    iast: 'Tāpatrayam',
    category: 'philosophy',
    definition: 'The triple disturbance of human existence warded off by saying "Śāntiḥ" three times.',
    formulaOrDetail: '१. आध्यात्मिक (Inner self) · २. आधिभौतिक (Other beings) · ३. आधिदैविक (Cosmic/unseen)',
    insight: 'Peace is not a passive mood; it is the active clearing of the field so sacred study can land without distortion.',
    exampleSanskrit: 'ॐ शान्तिः शान्तिः शान्तिः ॥',
    exampleEnglish: 'Peace within, peace around, peace transcendent.'
  },
  {
    id: 'fc-40',
    moduleId: 6,
    moduleName: 'Module 6: दर्शनम् · The Contemplative Mind',
    lessonId: 'c-6-4',
    lessonNumber: '6.4',
    devanagari: 'असतो मा सद्गमय',
    iast: 'Asato Mā Sadgamaya',
    category: 'philosophy',
    definition: 'The immortal peace invocation from the Bṛhadāraṇyaka Upaniṣad synthesizing the entire course.',
    formulaOrDetail: 'असतः (Pañcamī) ➔ सत् (Destination) · तमसः ➔ ज्योतिः · मृत्योः ➔ अमृतम्',
    insight: 'The ultimate trajectory of Sanskrit learning: from physical acoustic syllables to transcendent spiritual realization.',
    exampleSanskrit: 'असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥',
    exampleEnglish: 'From untruth lead me to truth; from darkness lead me to light; from death lead me to immortality.'
  }
];

export interface SanskritFlashcardStudioProps {
  isAdmin?: boolean;
  onPlayAudio?: (term: string) => void;
  onOpenLesson?: (lessonId: string) => void;
}

export const SanskritFlashcardStudio: React.FC<SanskritFlashcardStudioProps> = ({
  isAdmin = false,
  onPlayAudio,
  onOpenLesson
}) => {

  const [selectedModuleFilter, setSelectedModuleFilter] = useState<number | 'all'>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Mastered flashcard ids persisted in localStorage
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('stc_mastered_flashcards');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Filtered cards based on module selection
  const filteredCards = useMemo(() => {
    if (selectedModuleFilter === 'all') return SANSKRIT_FLASHCARDS;
    return SANSKRIT_FLASHCARDS.filter((c) => c.moduleId === selectedModuleFilter);
  }, [selectedModuleFilter]);

  // Ensure current card index stays valid
  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [selectedModuleFilter]);

  const currentCard = filteredCards[currentCardIndex] || filteredCards[0];

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  }, [filteredCards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  }, [filteredCards.length]);

  const handleShuffle = () => {
    setIsFlipped(false);
    const rand = Math.floor(Math.random() * filteredCards.length);
    setCurrentCardIndex(rand);
  };

  const toggleMastery = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('stc_mastered_flashcards', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const handleAudio = (term: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onPlayAudio) {
      onPlayAudio(term);
    } else {
      playPronunciation(term);
    }
  };

  const handleAdminMasterAll = () => {
    const allIds = new Set(SANSKRIT_FLASHCARDS.map((c) => c.id));
    setMasteredIds(allIds);
    try {
      localStorage.setItem('stc_mastered_flashcards', JSON.stringify(Array.from(allIds)));
    } catch {}
  };

  const handleAdminResetMastery = () => {
    setMasteredIds(new Set());
    try {
      localStorage.removeItem('stc_mastered_flashcards');
    } catch {}
  };


  // Keyboard navigation: Space flips, Left/Right navigates
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const totalMasteredCount = SANSKRIT_FLASHCARDS.filter((c) => masteredIds.has(c.id)).length;
  const isCurrentMastered = currentCard ? masteredIds.has(currentCard.id) : false;

  return (
    <div style={{ margin: '1.5rem 0' }}>
      {/* Studio Header & Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#b45309' }}>
            चिन्तन-मञ्जूषा · Cognitive Recall Deck
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#451a03', margin: '0.2rem 0' }}>
            Sanskrit Thinking Interactive Flashcards
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
            Master core acoustic placements, Pāṇinian rules, and philosophical concepts. Tap card or press <kbd style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.1rem 0.35rem', borderRadius: 4 }}>Space</kbd> to flip!
          </p>
        </div>

        {/* Global Mastery Counter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
          <div style={{ background: '#fef3c7', border: '1.5px solid #f59e0b', borderRadius: '12px', padding: '0.5rem 1rem', textAlign: 'right' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase' }}>
              Overall Deck Mastery
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#78350f' }}>
              {totalMasteredCount} / {SANSKRIT_FLASHCARDS.length} Cards
              <span style={{ fontSize: '0.85rem', fontWeight: 700, marginLeft: '0.4rem', color: '#b45309' }}>
                ({Math.round((totalMasteredCount / SANSKRIT_FLASHCARDS.length) * 100)}%)
              </span>
            </div>
          </div>
          {isAdmin && (
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                type="button"
                onClick={handleAdminMasterAll}
                style={{
                  background: '#dcfce7',
                  border: '1px solid #86efac',
                  color: '#166534',
                  padding: '0.25rem 0.55rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
                title="Admin Quick-Pass: Mark all 40 cards as mastered"
              >
                ⚡ Master All 40
              </button>
              <button
                type="button"
                onClick={handleAdminResetMastery}
                style={{
                  background: '#fee2e2',
                  border: '1px solid #fca5a5',
                  color: '#991b1b',
                  padding: '0.25rem 0.55rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
                title="Admin: Reset flashcards mastery"
              >
                🔄 Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Module Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => setSelectedModuleFilter('all')}
          style={{
            padding: '0.4rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: 'pointer',
            border: selectedModuleFilter === 'all' ? '1.5px solid #b45309' : '1px solid #e2e8f0',
            background: selectedModuleFilter === 'all' ? '#fef3c7' : '#ffffff',
            color: selectedModuleFilter === 'all' ? '#78350f' : '#64748b',
            transition: 'all 0.15s ease'
          }}
        >
          All Modules ({SANSKRIT_FLASHCARDS.length})
        </button>
        {[1, 2, 3, 4, 5, 6].map((modNum) => {
          const count = SANSKRIT_FLASHCARDS.filter((c) => c.moduleId === modNum).length;
          const isSelected = selectedModuleFilter === modNum;
          const labels = ['1. ध्वनिः (Sound)', '2. लिपिः (Script)', '3. व्याकरणम् (Rules)', '4. वाक्यम् (Syntax)', '5. गणितम् (Science)', '6. दर्शनम् (Vision)'];

          return (
            <button
              key={modNum}
              type="button"
              onClick={() => setSelectedModuleFilter(modNum)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                border: isSelected ? '1.5px solid #0f766e' : '1px solid #e2e8f0',
                background: isSelected ? '#ccfbf1' : '#ffffff',
                color: isSelected ? '#115e59' : '#64748b',
                transition: 'all 0.15s ease'
              }}
            >
              Mod {labels[modNum - 1]} ({count})
            </button>
          );
        })}
      </div>

      {/* THE 3D FLIP FLASHCARD CONTAINER */}
      {currentCard && (
        <div style={{ maxWidth: '680px', margin: '0 auto 1.5rem' }}>
          <div
            onClick={() => setIsFlipped((prev) => !prev)}
            style={{
              perspective: '1000px',
              cursor: 'pointer',
              minHeight: '380px',
              position: 'relative'
            }}
            role="button"
            tabIndex={0}
            aria-label="Click to flip flashcard"
          >
            <div
              style={{
                width: '100%',
                minHeight: '380px',
                borderRadius: '20px',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.12), 0 0 0 1.5px #f1ece1',
                background: '#ffffff',
                position: 'relative'
              }}
            >
              {/* FRONT SIDE */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fffdfa 100%)'
                }}
              >
                {/* Card Top Meta */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      background: '#fef3c7',
                      color: '#92400e',
                      border: '1px solid #fde68a'
                    }}
                  >
                    {currentCard.moduleName} · Lesson {currentCard.lessonNumber}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => toggleMastery(currentCard.id, e)}
                    style={{
                      background: isCurrentMastered ? '#dcfce7' : '#f8fafc',
                      border: isCurrentMastered ? '1.5px solid #22c55e' : '1px solid #cbd5e1',
                      color: isCurrentMastered ? '#15803d' : '#64748b',
                      borderRadius: '9999px',
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <span>{isCurrentMastered ? '✓ Mastered' : '○ Mark Mastered'}</span>
                  </button>
                </div>

                {/* Center Content: Term & Phonetics */}
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#1e1b4b', marginBottom: '0.5rem', fontFamily: 'serif' }}>
                    {currentCard.devanagari}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#6d28d9', fontStyle: 'italic', marginBottom: '1rem' }}>
                    {currentCard.iast}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleAudio(currentCard.devanagari, e)}
                    style={{
                      background: '#ede9fe',
                      border: '1px solid #c4b5fd',
                      borderRadius: '9999px',
                      padding: '0.45rem 1rem',
                      color: '#5b21b6',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      boxShadow: '0 2px 8px rgba(109, 40, 217, 0.15)'
                    }}
                  >
                    🔊 Listen Recitation
                  </button>
                </div>

                {/* Bottom hint */}
                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.82rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                  Tap card to reveal definition, morphological formula &amp; thinking insight ➔
                </div>
              </div>

              {/* BACK SIDE */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #fdfbf7 0%, #fffefc 100%)',
                  overflowY: 'auto'
                }}
              >
                {/* Back Top */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#78350f' }}>
                      {currentCard.devanagari}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#92400e', fontStyle: 'italic' }}>
                      ({currentCard.iast})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleAudio(currentCard.devanagari, e)}
                    style={{
                      background: '#ede9fe',
                      border: '1px solid #c4b5fd',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem'
                    }}
                  >
                    🔊
                  </button>
                </div>

                {/* Back Content */}
                <div style={{ margin: '0.85rem 0', textAlign: 'left' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem', lineHeight: 1.45 }}>
                    {currentCard.definition}
                  </div>

                  <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: '#3730a3', fontWeight: 700, margin: '0.5rem 0' }}>
                    📐 Formula / Rule: {currentCard.formulaOrDetail}
                  </div>

                  <div style={{ background: '#fef3c7', border: '1px solid #fde68a', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.84rem', color: '#92400e', margin: '0.5rem 0', lineHeight: 1.45 }}>
                    🧠 <strong>Thinking Bridge:</strong> {currentCard.insight}
                  </div>

                  {currentCard.exampleSanskrit && (
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '0.5rem', fontStyle: 'italic' }}>
                      📖 <em>Classical Canonical Example:</em> {currentCard.exampleSanskrit} — &quot;{currentCard.exampleEnglish}&quot;
                    </div>
                  )}
                </div>

                {/* Back Bottom Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                  {onOpenLesson ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenLesson(currentCard.lessonId);
                      }}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#0f766e',
                        cursor: 'pointer'
                      }}
                    >
                      📖 Open Lesson {currentCard.lessonNumber}
                    </button>
                  ) : <span />}

                  <button
                    type="button"
                    onClick={(e) => toggleMastery(currentCard.id, e)}
                    style={{
                      background: isCurrentMastered ? '#dcfce7' : '#f8fafc',
                      border: isCurrentMastered ? '1.5px solid #22c55e' : '1px solid #cbd5e1',
                      color: isCurrentMastered ? '#15803d' : '#64748b',
                      borderRadius: '9999px',
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {isCurrentMastered ? '✓ Mastered' : '○ Mark as Mastered'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
            <button
              type="button"
              onClick={handlePrev}
              style={{
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                padding: '0.6rem 1.25rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 800,
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              ← Previous
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#475569' }}>
                Card {currentCardIndex + 1} of {filteredCards.length}
              </span>
              <button
                type="button"
                onClick={handleShuffle}
                title="Shuffle cards"
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: '#475569'
                }}
              >
                🔀 Shuffle
              </button>
            </div>

            <button
              type="button"
              onClick={handleNext}
              style={{
                background: '#b45309',
                border: '1.5px solid #92400e',
                padding: '0.6rem 1.4rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 800,
                color: '#ffffff',
                cursor: 'pointer'
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SanskritFlashcardStudio;
