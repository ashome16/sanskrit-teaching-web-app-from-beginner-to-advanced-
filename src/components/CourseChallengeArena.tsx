import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { playPronunciation, speakAsBodhi } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';

export type ChallengeTrackId = 'all' | 'panini' | 'pingala' | 'lilavati' | 'darshanas';
export type ChallengeGameMode = 'blitz' | 'zen';

export interface ChallengeQuestion {
  id: string;
  track: 'panini' | 'pingala' | 'lilavati' | 'darshanas';
  trackTitleDevanagari: string;
  trackTitleEnglish: string;
  badgeColor: string;
  badgeBg: string;
  title: string;
  sutra: string;
  sutraIast: string;
  prompt: string;
  hint?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  computationalInsight: string;
}

export const CHALLENGE_QUESTIONS: ChallengeQuestion[] = [
  // ===================== PĀṆINI GENERATIVE ENGINE =====================
  {
    id: 'panini-1',
    track: 'panini',
    trackTitleDevanagari: 'माहेश्वर-सूत्र-कलनम्',
    trackTitleEnglish: 'Pāṇinian Generative Engine',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
    title: 'Pratyāhāra Boundary Parsing (प्रत्याहार-ग्रहम्)',
    sutra: 'अइउण् । ऋऌक् । एओङ् । ऐऔच् ॥',
    sutraIast: 'a-i-u-ṇ | ṛ-ḷ-k | e-o-ṅ | ai-au-c ||',
    prompt: 'According to the algorithmic rule आदिरन्त्येन सहेता (1.1.71), which vowel set is encoded by the Pratyāhāra ‘अक्’ (AK)?',
    hint: 'Starts at ‘अ’ and stops before marker ‘क्’ without including the markers ‘ण्’ and ‘क्’.',
    options: [
      'अ, इ, उ (3 simple vowels)',
      'अ, इ, उ, ऋ, ऌ (5 fundamental simple vowels)',
      'अ, इ, उ, ऋ, ऌ, ए, ओ (all non-diphthong vowels)',
      'All vowels and consonants from A to K',
    ],
    correctIndex: 1,
    explanation: 'The marker ‘ण्’ in formula 1 is an It-marker (it-saṃjñā), which is skipped during compilation. ‘अक्’ traverses from ‘अ’ up to marker ‘क्’ in formula 2, selecting the 5 primary vowels: अ, इ, उ, ऋ, ऌ.',
    computationalInsight: 'Pratyāhāras act as constant-time (O(1)) compressed token representations of phonological sets, equivalent to bitmask regex character classes [a-i-u-ṛ-ḷ].',
  },
  {
    id: 'panini-2',
    track: 'panini',
    trackTitleDevanagari: 'माहेश्वर-सूत्र-कलनम्',
    trackTitleEnglish: 'Pāṇinian Generative Engine',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
    title: 'Vowel Sandhi Rewrite Rule (दीर्घ-सन्धि-नियमः)',
    sutra: 'अकः सवर्णे दीर्घः ॥ ६.१.१०१ ॥',
    sutraIast: 'akaḥ savarṇe dīrghaḥ || 6.1.101 ||',
    prompt: 'What is the single substitute (एकः पूर्वपरयोः) produced when ‘विद्या’ (vidyā) joins with ‘आलयः’ (ālayaḥ)?',
    hint: 'Homogeneous vowels (सवर्ण) merge into their long form.',
    options: [
      'विद्योदयः (vidyodayaḥ)',
      'विद्यालयः (vidyālayaḥ)',
      'विद्यैक्यः (vidyaikyaḥ)',
      'विद्यालयम् (vidyālayam - accusative only)',
    ],
    correctIndex: 1,
    explanation: 'Sūtra 6.1.101 states that when an Ak vowel is followed by a homogeneous vowel (सवर्ण), both are replaced by a single lengthened vowel (दीर्घ). Here, आ + आ = आ, producing ‘विद्यालयः’ (abode of knowledge).',
    computationalInsight: 'Pāṇinian Sandhi behaves as deterministic rewrite grammar rules: A + B → C conditioned on phonetic features and articulatory place (स्थान) and effort (प्रयत्न).',
  },
  {
    id: 'panini-3',
    track: 'panini',
    trackTitleDevanagari: 'माहेश्वर-सूत्र-कलनम्',
    trackTitleEnglish: 'Pāṇinian Generative Engine',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
    title: 'The Semivowel Morphism (यण्-सन्धिः)',
    sutra: 'इको यणचि ॥ ६.१.७७ ॥',
    sutraIast: 'iko yaṇaci || 6.1.77 ||',
    prompt: 'When applying sūtra ‘इको यणचि’ to ‘इति + आह’ (iti + āha), which semivowel replaces ‘इ’?',
    hint: 'इक् = {इ, उ, ऋ, ऌ} maps 1-to-1 to यण् = {य्, व्, र्, ल्}.',
    options: [
      'व् (v) → इत्वाऽऽह',
      'र् (r) → इत्राह',
      'य् (y) → इत्याह (ityāha)',
      'ल् (l) → इल्याह',
    ],
    correctIndex: 2,
    explanation: 'Under rule 6.1.77, the vowel ‘इ’ from the Pratyāhāra ‘इक्’ is replaced by ‘य्’ from the Pratyāhāra ‘यण्’ when followed by any dissimilar vowel (अच्). Thus, iti + āha → ity-āha.',
    computationalInsight: 'The principle यथासंख्यमनुदेशः समानाम् (1.3.10) enforces index-aligned parallel array mapping: index 0 of Ik (इ) maps strictly to index 0 of Yaṇ (य्).',
  },
  {
    id: 'panini-4',
    track: 'panini',
    trackTitleDevanagari: 'माहेश्वर-सूत्र-कलनम्',
    trackTitleEnglish: 'Pāṇinian Generative Engine',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
    title: 'Karaka Semantic Network (करण-कारकम्)',
    sutra: 'साधकतमं करणम् ॥ १.४.४२ ॥',
    sutraIast: 'sādhakatamaṃ karaṇam || 1.4.42 ||',
    prompt: 'In the sentence ‘रामेण बाणेन हतो वाली’ (Rāma struck Vālī with an arrow), which item is the ‘करणम्’ (instrument)?',
    hint: '‘साधकतमम्’ signifies the most effective instrument directly producing the accomplishment.',
    options: [
      'रामः (Rāma - the conscious agent)',
      'बाणः (bāṇaḥ - the arrow)',
      'वाली (Vālī - the patient / target)',
      'हननम् (hananam - the striking action)',
    ],
    correctIndex: 1,
    explanation: 'Sūtra 1.4.42 defines ‘करणम्’ as that which is superlatively instrumental (साधकतमम्) in achieving the action. The arrow (बाण) directly effects the striking, hence takes the 3rd case inflection (बाणेन).',
    computationalInsight: 'Pāṇinian Kāraka theory separates deep semantic case roles (Kārakas) from surface syntactic cases (Vibhaktis), anticipating modern Dependency Grammar and Frame Semantics.',
  },
  {
    id: 'panini-5',
    track: 'panini',
    trackTitleDevanagari: 'माहेश्वर-सूत्र-कलनम्',
    trackTitleEnglish: 'Pāṇinian Generative Engine',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
    title: 'It-Marker Garbage Collection (तस्य लोपः)',
    sutra: 'हलन्त्यम् ॥ १.३.३ ॥ तस्य लोपः ॥ १.३.९ ॥',
    sutraIast: 'halantyam || 1.3.3 || tasya lopaḥ || 1.3.9 ||',
    prompt: 'What happens to the terminal consonant markers (like ‘प्’ in ‘तिप्’ or ‘ण्’ in ‘अइउण्’) in Pāṇini’s rule compiler?',
    hint: 'They serve as metadata triggers during derivation, then undergo ‘लोपः’ (null-replacement / deletion).',
    options: [
      'They remain in the final spoken surface word forever.',
      'They trigger syntactic/morphological behaviors and are then cleanly deleted (lopa / garbage-collected).',
      'They convert into visargas (ः) in every noun.',
      'They force the word to be an indeclinable (avyaya).',
    ],
    correctIndex: 1,
    explanation: 'It-markers (इत्-संज्ञा) are non-phonetic control flags. Sūtra 1.3.9 ‘तस्य लोपः’ specifies that once they trigger accent, vowel grade, or scope rules, they vanish from the output surface string.',
    computationalInsight: 'It-markers are compile-time directives and macro tokens that vanish before the binary executable (the surface utterance) is emitted.',
  },

  // ===================== PIṄGALA BINARY METRICS =====================
  {
    id: 'pingala-1',
    track: 'pingala',
    trackTitleDevanagari: 'पिङ्गल-द्विआधारी-प्रस्तारः',
    trackTitleEnglish: 'Piṅgala Binary Combinatorics',
    badgeColor: '#c2410c',
    badgeBg: '#ffedd5',
    title: 'Laghu & Guru Binary Bits (लघु-गुरु-द्विआधारी)',
    sutra: 'धी श्री स्त्री ॥ १ ॥ मि ॥ २ ॥',
    sutraIast: 'dhī śrī strī || 1 || mi || 2 ||',
    prompt: 'In Ācārya Piṅgala’s Chandaḥśāstra, if Laghu (light syllable ।) represents 0 and Guru (heavy syllable ऽ) represents 1, what is the binary value of the 3-syllable sequence ‘। ऽ ।’?',
    hint: 'Laghu = 0, Guru = 1, Laghu = 0.',
    options: [
      '1 0 1',
      '0 1 0',
      '1 1 0',
      '0 0 1',
    ],
    correctIndex: 1,
    explanation: 'Laghu (short vowel with single consonant) has weight 1 mātrā, mapped to 0 (or low bit). Guru (long vowel or followed by conjunct) has weight 2 mātrās, mapped to 1 (high bit). Thus ‘। ऽ ।’ is strictly 0 1 0.',
    computationalInsight: 'Piṅgala (3rd century BCE) established the world’s first systematic binary code, ordering syllables into boolean tuples 2^n.',
  },
  {
    id: 'pingala-2',
    track: 'pingala',
    trackTitleDevanagari: 'पिङ्गल-द्विआधारी-प्रस्तारः',
    trackTitleEnglish: 'Piṅgala Binary Combinatorics',
    badgeColor: '#c2410c',
    badgeBg: '#ffedd5',
    title: 'Total Meter Variations (प्रस्तार-सङ्ख्या)',
    sutra: 'द्विरर्धे ॥ रूपे शून्यम् ॥',
    sutraIast: 'dvirardhe || rūpe śūnyam ||',
    prompt: 'In a 4-syllable meter (Anuṣṭubh pada has 8 syllables; consider a 4-syllable quarter), how many total distinct metric combinations (प्रस्तार) exist?',
    hint: 'Each of the 4 positions can independently be either Laghu or Guru (2 choices).',
    options: [
      '8 combinations (2 × 4)',
      '12 combinations (4 × 3)',
      '16 combinations (2⁴ = 16)',
      '24 combinations (4!)',
    ],
    correctIndex: 2,
    explanation: 'By the combinatorial rule 2ⁿ (where n is syllable count), a 4-syllable line yields 2⁴ = 16 unique binary configurations, from 0000 (।।।।) to 1111 (ऽऽऽऽ).',
    computationalInsight: 'Piṅgala’s Prastāra enumeration systematically generates the truth table of 2ⁿ boolean vectors in lexicographical order centuries before Leibniz.',
  },
  {
    id: 'pingala-3',
    track: 'pingala',
    trackTitleDevanagari: 'पिङ्गल-द्विआधारी-प्रस्तारः',
    trackTitleEnglish: 'Piṅgala Binary Combinatorics',
    badgeColor: '#c2410c',
    badgeBg: '#ffedd5',
    title: 'Meru Prastāra Binomial Pyramid (मेरु-प्रस्तारः)',
    sutra: 'परे पूर्णम् ॥ मेरुप्रस्तारः ॥',
    sutraIast: 'pare pūrṇam || meruprastāraḥ ||',
    prompt: 'In Piṅgala’s Meru Prastāra (later known in the West as Pascal’s Triangle), row 4 has values 1, 4, 6, 4, 1. What does the middle number ‘6’ signify?',
    hint: 'Combinations of choosing k Guru syllables out of 4 total syllables: C(4, 2).',
    options: [
      'The total number of meters with exactly 2 Guru (heavy) and 2 Laghu (light) syllables.',
      'The number of verses in the chapter.',
      'The total weight of 6 mātrās only.',
      'The number of vowels in the Sanskrit alphabet.',
    ],
    correctIndex: 0,
    explanation: 'Meru Prastāra row 4 corresponds to binomial coefficients (1+x)⁴ = 1x⁰ + 4x¹ + 6x² + 4x³ + 1x⁴. The middle number 6 represents C(4, 2): exactly 6 unique meters with two Gurus and two Laghus.',
    computationalInsight: 'Halāyudha’s 10th-century commentary on Piṅgala explicitly draws the stepped pyramidal array, proving the binomial expansion was formalized in India centuries before 1654.',
  },
  {
    id: 'pingala-4',
    track: 'pingala',
    trackTitleDevanagari: 'पिङ्गल-द्विआधारी-प्रस्तारः',
    trackTitleEnglish: 'Piṅgala Binary Combinatorics',
    badgeColor: '#c2410c',
    badgeBg: '#ffedd5',
    title: 'The Naṣṭam Algorithm (नष्टम् - Index to Pattern)',
    sutra: 'लघेऽर्धे ॥ अधिके रूपम् ॥',
    sutraIast: 'laghe\'rdhe || adhike rūpam ||',
    prompt: 'Piṅgala’s algorithm ‘Naṣṭam’ reconstructs a lost meter pattern from its numerical index. If dividing by 2 leaves no remainder (even), the syllable is Laghu; if odd, add 1 and divide, giving Guru. What is this algorithmic procedure identical to?',
    hint: 'Repeated division by 2 to extract binary digits from least to most significant bit.',
    options: [
      'Decimal-to-Binary integer conversion (mod 2 & div 2)',
      'Matrix multiplication',
      'Bubble sort',
      'Square root extraction',
    ],
    correctIndex: 0,
    explanation: 'Naṣṭam is the exact algorithm for converting a decimal rank into its binary representation: parity testing (odd/even) determines the bit (0 or 1), followed by division by 2 for the next position.',
    computationalInsight: 'This is the earliest recorded binary decoding algorithm in human intellectual history.',
  },

  // ===================== LĪLĀVATĪ POETIC MATHEMATICS =====================
  {
    id: 'lilavati-1',
    track: 'lilavati',
    trackTitleDevanagari: 'लीलावती-काव्य-गणितम्',
    trackTitleEnglish: 'Līlāvatī Poetic Mathematics',
    badgeColor: '#7c3aed',
    badgeBg: '#f3e8ff',
    title: 'Ekādhikena Pūrveṇa Squaring (एकाधिकेन पूर्वेण)',
    sutra: 'एकाधिकेन पूर्वेण ॥ रूपं तदुत्तमम् ॥',
    sutraIast: 'ekādhikena pūrveṇa || rūpaṃ taduttamam ||',
    prompt: 'Using the Vedic sutra ‘एकाधिकेन पूर्वेण’ (By one more than the previous), what is the square of 75 (75²)?',
    hint: 'Previous digit is 7. Multiply 7 by (7 + 1 = 8), then append 5² = 25.',
    options: [
      '5,425',
      '5,625',
      '5,825',
      '6,025',
    ],
    correctIndex: 1,
    explanation: 'For any number ending in 5: Left part = 7 × (7 + 1) = 7 × 8 = 56. Right part = 5² = 25. Combining yields 5,625 in 2 seconds of mental math.',
    computationalInsight: 'Algebraic proof: (10n + 5)² = 100n² + 100n + 25 = 100n(n+1) + 25. The sutra computes the quadratic polynomial with zero overhead.',
  },
  {
    id: 'lilavati-2',
    track: 'lilavati',
    trackTitleDevanagari: 'लीलावती-काव्य-गणितम्',
    trackTitleEnglish: 'Līlāvatī Poetic Mathematics',
    badgeColor: '#7c3aed',
    badgeBg: '#f3e8ff',
    title: 'Bhāskarācārya’s Lotus Problem (कमल-समस्या)',
    sutra: 'सरोवरे यत्कमलं प्रफुल्लम् ॥ लीलावती श्लोकः ॥',
    sutraIast: 'sarovare yatkamalaṃ praphullam || līlāvatī ślokaḥ ||',
    prompt: 'Bhāskara II poses: A lotus tip was 1/2 cubit above the lake water. Blown by a breeze, it touched the water 2 cubits away from its base. What is the lake’s water depth (d)?',
    hint: 'Apply Baudhāyana-Pythagoras theorem: d² + 2² = (d + 0.5)². Solve for d.',
    options: [
      '3.75 cubits (१५/४ हस्त)',
      '4.25 cubits',
      '5.00 cubits',
      '2.50 cubits',
    ],
    correctIndex: 0,
    explanation: 'Let depth be d. Hypotenuse = d + 0.5. By right triangle: d² + 2² = (d + 0.5)² → d² + 4 = d² + d + 0.25 → d = 4 - 0.25 = 3.75 cubits (15/4 cubits).',
    computationalInsight: 'Bhāskara frames algebraic quadratics as captivating nature poetry to embed deep geometric intuition in students.',
  },
  {
    id: 'lilavati-3',
    track: 'lilavati',
    trackTitleDevanagari: 'लीलावती-काव्य-गणितम्',
    trackTitleEnglish: 'Līlāvatī Poetic Mathematics',
    badgeColor: '#7c3aed',
    badgeBg: '#f3e8ff',
    title: 'Zero and Infinity (शून्य-भाजित-खहरम्)',
    sutra: 'योगे खं क्षेपसमं वर्गादौ खं खभाजितो राशिः खहरः स्यात् ॥',
    sutraIast: 'yoge khaṃ kṣepasamaṃ vargādau khaṃ khabhājito rāśiḥ khaharaḥ syāt ||',
    prompt: 'In Bījagaṇita and Līlāvatī, what term does Bhāskarācārya define for a finite quantity divided by zero (a / 0)?',
    hint: '‘ख’ means space/zero, ‘हर’ means divisor: divisor by zero.',
    options: [
      'शून्यम् (zero)',
      'खहरः (khahara - infinite, inexhaustible entity)',
      'अनिर्धार्यम् (undefined error)',
      'ऋणम् (negative debt)',
    ],
    correctIndex: 1,
    explanation: 'Bhāskara explicitly coined ‘खहरः’ (Khahara = that which has zero as its divisor). He stated that just as infinite God undergoes no change though multitudes enter or leave, Khahara remains unaffected by finite additions or subtractions.',
    computationalInsight: 'Pre-calculus limit concept: lim_{x→0} a/x = ∞, recognized in 1150 CE.',
  },
  {
    id: 'lilavati-4',
    track: 'lilavati',
    trackTitleDevanagari: 'लीलावती-काव्य-गणितम्',
    trackTitleEnglish: 'Līlāvatī Poetic Mathematics',
    badgeColor: '#7c3aed',
    badgeBg: '#f3e8ff',
    title: 'Multiplication by Base Complement (निखिलं नवतश्चरमं दशतः)',
    sutra: 'निखिलं नवतश्चरमं दशतः ॥',
    sutraIast: 'nikhilaṃ navataścaramaṃ daśataḥ ||',
    prompt: 'Using ‘All from 9 and the last from 10’, calculate 96 × 97 instantly. Deficiencies from base 100 are -4 and -3. What is the result?',
    hint: 'Cross-subtract (96 - 3 = 93). Right part = (-4) × (-3) = 12.',
    options: [
      '9,312',
      '9,212',
      '9,412',
      '9,308',
    ],
    correctIndex: 0,
    explanation: 'Deficiencies from 100: 96 is -4, 97 is -3. Left side = 96 - 3 = 93. Right side = (-4) × (-3) = 12. Appending gives 9,312.',
    computationalInsight: 'Algebraic basis: (100 - a)(100 - b) = 100(100 - a - b) + ab. Reduces double-digit multiplications to single additions and single-digit products.',
  },

  // ===================== DARŚANA COGNITIVE LOGIC =====================
  {
    id: 'darshanas-1',
    track: 'darshanas',
    trackTitleDevanagari: 'दर्शन-तर्क-व्यूहः',
    trackTitleEnglish: 'Darśana Cognitive Logic Matrix',
    badgeColor: '#0d9488',
    badgeBg: '#ccfbf1',
    title: 'The Eternal Uncaused Atom (सदकारणवन्नित्यम्)',
    sutra: 'सदकारणवन्नित्यम् ॥ वैशेषिक-सूत्रम् ४.१.१ ॥',
    sutraIast: 'sad-akāraṇavan-nityam || vaiśeṣika-sūtram 4.1.1 ||',
    prompt: 'In Sage Kaṇāda’s atomic philosophy (Vaiśeṣika), why is a Paramaṇu (fundamental indivisible atom) classified as eternal (नित्यम्)?',
    hint: 'Breakdown: सत् (it exists) + अकारणवत् (it is uncaused / has no prior component cause).',
    options: [
      'Because it is blessed by celestial deities.',
      'Because it exists (सत्) and has no prior component cause (अकारणवत्), so it can never disintegrate.',
      'Because it is visible to the naked human eye.',
      'Because it transforms continuously into liquid fire.',
    ],
    correctIndex: 1,
    explanation: 'Objects made of parts (like a clay pot) are temporary because they can be dissolved back into their causes. But fundamental atoms (Paramaṇus) were not manufactured from any preceding parts (akāraṇavat), making them indivisible, indestructible, and eternal (nityam).',
    computationalInsight: 'Anticipates the conservation of mass-energy and irreducible atomic primitives in physical computation.',
  },
  {
    id: 'darshanas-2',
    track: 'darshanas',
    trackTitleDevanagari: 'दर्शन-तर्क-व्यूहः',
    trackTitleEnglish: 'Darśana Cognitive Logic Matrix',
    badgeColor: '#0d9488',
    badgeBg: '#ccfbf1',
    title: 'Inferring Invisible Primitives (तस्य कार्यं लिङ्गम्)',
    sutra: 'तस्य कार्यं लिङ्गम् ॥ वैशेषिक-सूत्रम् ४.१.२ ॥',
    sutraIast: 'tasya kāryaṃ liṅgam || vaiśeṣika-sūtram 4.1.2 ||',
    prompt: 'Since a single Paramaṇu is microscopic and invisible to human eyes, how do Kaṇāda and the Naiyāyikas logically prove its existence?',
    hint: '‘कार्यम्’ = effect (macro world), ‘लिङ्गम्’ = logical token / mark / evidence.',
    options: [
      'By pure blind scriptural dogma without reasoning.',
      'Through optical lenses and microscopes.',
      'The observable macroscopic effect (कार्यम्) serves as irrefutable logical evidence (लिङ्गम्) of fundamental building blocks.',
      'Through mathematical zero division.',
    ],
    correctIndex: 2,
    explanation: 'Sūtra 4.1.2 explains that the macroscopic universe (कार्यम्)—cloth, pots, mountains—cannot arise out of pure nothingness. The manifest effect is the definitive evidence (लिङ्गम्) proving that fundamental indestructible material causes exist.',
    computationalInsight: 'Epistemological abduction (inference to the best explanation), foundational to modern particle physics (e.g. inferring quarks from collision effects).',
  },
  {
    id: 'darshanas-3',
    track: 'darshanas',
    trackTitleDevanagari: 'दर्शन-तर्क-व्यूहः',
    trackTitleEnglish: 'Darśana Cognitive Logic Matrix',
    badgeColor: '#0d9488',
    badgeBg: '#ccfbf1',
    title: 'Nyāya 5-Step Deductive Syllogism (पञ्चावयव-वाक्यम्)',
    sutra: 'प्रतिज्ञा-हेतु-उदाहरणेपनय-निगमनानि अवयवाः ॥ १.१.३२ ॥',
    sutraIast: 'pratijñā-hetu-udāharaṇopanaya-nigamanāni avayavāḥ || 1.1.32 ||',
    prompt: 'In the classic Nyāya inference ‘पर्वतो वह्निमान्, धूमात्...’ (The hill has fire, because it has smoke), which step is ‘यत्र यत्र धूमः तत्र तत्र वह्निः यथा महानसम्’ (Wherever there is smoke, there is fire, as in a kitchen)?',
    hint: 'It couples the universal invariant relation (व्याप्ति) with an empirical example.',
    options: [
      'प्रतिज्ञा (Pratijñā - Initial Thesis)',
      'हेतुः (Hetu - Ground / Reason)',
      'उदाहरणम् (Udāharaṇa - Universal Invariable Concomitance with Empirical Instance)',
      'निगमनम् (Nigamana - Final Conclusion)',
    ],
    correctIndex: 2,
    explanation: 'Udāharaṇa (उदाहरणम्) provides the inductive universal rule (व्याप्ति: where smoke exists, fire exists) paired with an empirical reference ground (यथा महानसम् / kitchen hearth), bridging abstract logic and physical reality.',
    computationalInsight: 'The Nyāya 5-step syllogism is superior to Aristotelian deductive logic because it explicitly requires empirical verification (Udāharaṇa), avoiding vacuous logical fallacies.',
  },
  {
    id: 'darshanas-4',
    track: 'darshanas',
    trackTitleDevanagari: 'दर्शन-तर्क-व्यूहः',
    trackTitleEnglish: 'Darśana Cognitive Logic Matrix',
    badgeColor: '#0d9488',
    badgeBg: '#ccfbf1',
    title: 'Coiled Information & Superimposition (अध्यासः रज्जु-सर्प-न्यायः)',
    sutra: 'अध्यासो नाम अतस्मिंस्तद्बुद्धिः ॥',
    sutraIast: 'adhyāso nāma atasmiṃstadbuddhiḥ ||',
    prompt: 'In Ādi Śaṅkarācārya’s rope-and-snake analogy, why is it NOT merely a random visual trick, but a profound informational superposition?',
    hint: 'Coiled, compressed sensory cues match snake features in low light, until unraveled into uniform repetitive rope units.',
    options: [
      'A real live serpent magically transmutes into hemp fiber at sunrise.',
      'Compressed, coiled visual data is misinterpreted by the cognitive prior until unraveled into uniform, repetitive fiber strands.',
      'The observer intentionally hallucinates without sensory input.',
      'The rope is an illusion, but the snake is physical.',
    ],
    correctIndex: 1,
    explanation: 'Adhyāsa (अध्यास) occurs when covered-up, coiled information with curved contours triggers the snake prior in dim light. Upon closer inspection, the coiled complexity unravels into simple, uniform, repetitive woven strands (rope), revealing the substrate (अधिष्ठान).',
    computationalInsight: 'Anticipates predictive coding in computational neuroscience: the brain generates top-down perceptual priors until bottom-up sensory precision resolves the error.',
  },
];

export interface CourseChallengeArenaProps {
  isAdmin?: boolean;
  onGoToCurriculum?: () => void;
  onGoToExam?: () => void;
}

export const CourseChallengeArena: React.FC<CourseChallengeArenaProps> = ({
  onGoToCurriculum,
  onGoToExam,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<ChallengeTrackId>('all');
  const [gameMode, setGameMode] = useState<ChallengeGameMode>('blitz');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [activePronouncingSutra, setActivePronouncingSutra] = useState<string | null>(null);
  const [bodhiCommentary, setBodhiCommentary] = useState<string>('');

  const timerRef = useRef<number | null>(null);

  // Persistent high-scores
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('stc_challenge_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [bestStreak, setBestStreak] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('stc_challenge_best_streak') || '0', 10);
    } catch {
      return 0;
    }
  });

  // Filter questions by track
  const activeQuestions = useMemo(() => {
    if (selectedTrack === 'all') return CHALLENGE_QUESTIONS;
    return CHALLENGE_QUESTIONS.filter((q) => q.track === selectedTrack);
  }, [selectedTrack]);

  const currentQuestion = activeQuestions[currentQIndex] || activeQuestions[0];

  // Multiplier calculation
  const streakMultiplier = useMemo(() => {
    if (streak >= 8) return 3.0;
    if (streak >= 5) return 2.0;
    if (streak >= 3) return 1.5;
    return 1.0;
  }, [streak]);

  // Start a new challenge run
  const startChallenge = useCallback(
    (track: ChallengeTrackId = selectedTrack, mode: ChallengeGameMode = gameMode) => {
      soundEffects.playStrokeChime();
      setSelectedTrack(track);
      setGameMode(mode);
      setCurrentQIndex(0);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setLives(mode === 'blitz' ? 3 : 999);
      setScore(0);
      setStreak(0);
      setMaxStreak(0);
      setCorrectCount(0);
      setTimeLeft(30);
      setIsGameOver(false);
      setIsPlaying(true);
      setBodhiCommentary('⚡ The Sanskrit Thinking Challenge begins! Decode with precision.');
    },
    [selectedTrack, gameMode]
  );

  // Timer loop for blitz mode
  useEffect(() => {
    if (!isPlaying || isGameOver || isAnswerRevealed || gameMode === 'zen') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired for this question!
          handleTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isGameOver, isAnswerRevealed, gameMode]);

  const handleTimeExpire = () => {
    soundEffects.playPuzzleSnap();
    setIsAnswerRevealed(true);
    setStreak(0);
    setBodhiCommentary('⏳ Time expired! Examine the sūtra mechanics below.');
    if (gameMode === 'blitz') {
      setLives((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          endChallenge();
        }
        return next;
      });
    }
  };

  // Submit answer
  const handleSelectOption = (idx: number) => {
    if (isAnswerRevealed || isGameOver) return;
    setSelectedOption(idx);
    setIsAnswerRevealed(true);

    const isCorrect = idx === currentQuestion.correctIndex;
    if (isCorrect) {
      soundEffects.playSuccessDing();
      const pointsGained = Math.round(100 * streakMultiplier + (gameMode === 'blitz' ? timeLeft * 3 : 0));
      setScore((s) => {
        const newScore = s + pointsGained;
        if (newScore > highScore) {
          setHighScore(newScore);
          try {
            localStorage.setItem('stc_challenge_highscore', newScore.toString());
          } catch {}
        }
        return newScore;
      });

      setStreak((st) => {
        const next = st + 1;
        if (next > maxStreak) setMaxStreak(next);
        if (next > bestStreak) {
          setBestStreak(next);
          try {
            localStorage.setItem('stc_challenge_best_streak', next.toString());
          } catch {}
        }
        if (next === 3) {
          soundEffects.playCelebrationChime();
          setBodhiCommentary('🔥 3-Streak! Multiplier raised to 1.5x!');
        } else if (next === 5) {
          soundEffects.playCelebrationChime();
          setBodhiCommentary('⚡ 5-Streak! Double Intellect (2.0x) engaged!');
        } else if (next >= 8) {
          soundEffects.playCelebrationChime();
          setBodhiCommentary('🌟 8+ Super Streak! 3.0x Divine Vidya Active!');
        } else {
          setBodhiCommentary('✓ साधु साधु ! Correct inference.');
        }
        return next;
      });

      setCorrectCount((c) => c + 1);
    } else {
      soundEffects.playPuzzleSnap();
      setStreak(0);
      setBodhiCommentary('❌ Incorrect option. Review the computational sūtra breakdown.');
      if (gameMode === 'blitz') {
        setLives((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            endChallenge();
          }
          return next;
        });
      }
    }
  };

  // End of run
  const endChallenge = () => {
    setIsGameOver(true);
    soundEffects.playCelebrationChime();
  };

  // Move to next question
  const handleNextQuestion = () => {
    soundEffects.playStrokeChime();
    if (currentQIndex + 1 < activeQuestions.length) {
      setCurrentQIndex((idx) => idx + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setTimeLeft(30);
      setBodhiCommentary('');
    } else {
      endChallenge();
    }
  };

  // Pronounce sutra
  const handlePronounceSutra = (sutraText: string) => {
    soundEffects.playStrokeChime();
    setActivePronouncingSutra(sutraText);
    playPronunciation(sutraText);
    setTimeout(() => {
      setActivePronouncingSutra((cur) => (cur === sutraText ? null : cur));
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', paddingBottom: '3.5rem' }}>
      {/* Challenge Arena Header Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
          borderRadius: '20px',
          padding: '2.25rem 2rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.35)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fef08a',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
              }}
            >
              ⚡ SPEED &amp; LOGIC ARENA
            </span>
            <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              High-Speed Pāṇinian Parsing · Piṅgala Binary Code · Līlāvatī Math · Darśana Epistemology
            </span>
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
            Sanskrit Thinking Course Challenge (चिन्तन-प्रतिस्पर्धा)
          </h2>
          <p style={{ margin: 0, fontSize: '0.96rem', color: '#e2e8f0', maxWidth: '750px', lineHeight: 1.5 }}>
            Put your Sanskrit cognitive computational mastery to the test. Race against the countdown timer, build streak
            multipliers, and unlock the <b>Sūtra Master Challenge Badge</b> across all four foundational pillars.
          </p>

          {/* Telemetry Bar */}
          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              marginTop: '1.5rem',
              flexWrap: 'wrap',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '0.85rem 1.25rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                High Score
              </span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fef08a' }}>{highScore} pts</div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Best Streak
              </span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#67e8f9' }}>{bestStreak} 🔥</div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Questions
              </span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>{CHALLENGE_QUESTIONS.length}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pillars Covered
              </span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a7f3d0' }}>4 Pillars</div>
            </div>
          </div>
        </div>
      </div>

      {!isPlaying ? (
        /* ================== ARENA LOBBY / TRACK SELECTOR ================== */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Mode Selector */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
            }}
          >
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.15rem', color: '#0f172a' }}>
              1. Choose Game Mode (रीति-चयनम्)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setGameMode('blitz')}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  padding: '1.1rem',
                  borderRadius: '12px',
                  border: `2px solid ${gameMode === 'blitz' ? '#d97706' : '#e2e8f0'}`,
                  background: gameMode === 'blitz' ? '#fffbeb' : '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>⚡</span>
                <div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem' }}>Blitz Survival (काल-वेगः)</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                    30 seconds per question, 3 lives ❤️❤️❤️, speed points bonus, streak multipliers up to 3.0x.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setGameMode('zen')}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  padding: '1.1rem',
                  borderRadius: '12px',
                  border: `2px solid ${gameMode === 'zen' ? '#0d9488' : '#e2e8f0'}`,
                  background: gameMode === 'zen' ? '#f0fdfa' : '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>🧘</span>
                <div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem' }}>Zen Contemplative (ध्यान-रीतिः)</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                    No countdown pressure, infinite lives, focus on in-depth sūtra parsing and computational insight.
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Track Selection */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
            }}
          >
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.15rem', color: '#0f172a' }}>
              2. Select Challenge Track (वर्ग-चयनम्)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div
                onClick={() => setSelectedTrack('all')}
                style={{
                  border: `2px solid ${selectedTrack === 'all' ? '#2563eb' : '#e2e8f0'}`,
                  background: selectedTrack === 'all' ? '#eff6ff' : '#ffffff',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 800, color: '#1e3a8a' }}>🌟 All 4 Pillars Gauntlet</span>
                  <span style={{ fontSize: '0.72rem', background: '#dbeafe', color: '#1d4ed8', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    {CHALLENGE_QUESTIONS.length} Questions
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                  Full grand survival round testing all domains of computational Sanskrit.
                </div>
              </div>

              <div
                onClick={() => setSelectedTrack('panini')}
                style={{
                  border: `2px solid ${selectedTrack === 'panini' ? '#15803d' : '#e2e8f0'}`,
                  background: selectedTrack === 'panini' ? '#f0fdf4' : '#ffffff',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 800, color: '#166534' }}>⚙️ Pāṇinian Rule Rush</span>
                  <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    5 Sūtras
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                  Pratyāhāra boundaries, Sandhi transformations, and Kāraka dependency graphs.
                </div>
              </div>

              <div
                onClick={() => setSelectedTrack('pingala')}
                style={{
                  border: `2px solid ${selectedTrack === 'pingala' ? '#c2410c' : '#e2e8f0'}`,
                  background: selectedTrack === 'pingala' ? '#fff7ed' : '#ffffff',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 800, color: '#9a3412' }}>💾 Piṅgala Binary Code</span>
                  <span style={{ fontSize: '0.72rem', background: '#ffedd5', color: '#c2410c', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    4 Problems
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                  Laghu/Guru bits (0/1), Prastāra combinatorial tables, Meru binomial triangle.
                </div>
              </div>

              <div
                onClick={() => setSelectedTrack('lilavati')}
                style={{
                  border: `2px solid ${selectedTrack === 'lilavati' ? '#7c3aed' : '#e2e8f0'}`,
                  background: selectedTrack === 'lilavati' ? '#faf5ff' : '#ffffff',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 800, color: '#5b21b6' }}>📐 Līlāvatī Poetic Math</span>
                  <span style={{ fontSize: '0.72rem', background: '#f3e8ff', color: '#7c3aed', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    4 Riddles
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                  Bhāskara’s poetic puzzles, Vedic mental arithmetic shortcuts, zero and infinity.
                </div>
              </div>

              <div
                onClick={() => setSelectedTrack('darshanas')}
                style={{
                  border: `2px solid ${selectedTrack === 'darshanas' ? '#0d9488' : '#e2e8f0'}`,
                  background: selectedTrack === 'darshanas' ? '#f0fdfa' : '#ffffff',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 800, color: '#115e59' }}>🏛️ Darśana Logic Matrix</span>
                  <span style={{ fontSize: '0.72rem', background: '#ccfbf1', color: '#0f766e', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    4 Sūtras
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                  Kaṇāda’s eternal uncaused atom, Nyāya 5-step syllogism, and coiled information unravelling.
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => startChallenge(selectedTrack, gameMode)}
                style={{
                  background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  padding: '0.85rem 2.5rem',
                  borderRadius: '999px',
                  border: 0,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(217, 119, 6, 0.35)',
                  transition: 'all 0.2s ease',
                }}
              >
                🚀 Launch Challenge Arena Now
              </button>
            </div>
          </div>
        </div>
      ) : isGameOver ? (
        /* ================== GAME OVER / SCORECARD MODAL ================== */
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            border: '2px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
            {score >= 800 ? '🏆' : score >= 400 ? '🥈' : '🎖️'}
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem' }}>
            Challenge Completed! (चुनौती समाप्ता)
          </h3>
          <p style={{ color: '#475569', fontSize: '0.95rem', margin: '0 0 1.5rem' }}>
            {score >= 800
              ? 'Outstanding mastery of Sanskrit computational logic! You have earned the title of Sūtra Śiromaṇi.'
              : 'Commendable performance! Review the sūtra logic and challenge yourself again.'}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              maxWidth: '650px',
              margin: '0 auto 2rem',
              background: '#f8fafc',
              padding: '1.25rem',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Final Score</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#d97706' }}>{score}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Questions</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a' }}>
                {correctCount} / {activeQuestions.length}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Accuracy</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#16a34a' }}>
                {Math.round((correctCount / activeQuestions.length) * 100)}%
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Max Streak</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb' }}>{maxStreak} 🔥</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => startChallenge(selectedTrack, gameMode)}
              style={{
                background: '#d97706',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.95rem',
                padding: '0.7rem 1.6rem',
                borderRadius: '999px',
                border: 0,
                cursor: 'pointer',
              }}
            >
              🔄 Play Again
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              style={{
                background: '#f1f5f9',
                color: '#334155',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '0.7rem 1.6rem',
                borderRadius: '999px',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
              }}
            >
              ⚙️ Switch Track / Mode
            </button>
            {onGoToExam && (
              <button
                type="button"
                onClick={onGoToExam}
                style={{
                  background: '#1e1b4b',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  padding: '0.7rem 1.6rem',
                  borderRadius: '999px',
                  border: 0,
                  cursor: 'pointer',
                }}
              >
                🏆 Grand Assessment Exam
              </button>
            )}
            {onGoToCurriculum && (
              <button
                type="button"
                onClick={onGoToCurriculum}
                style={{
                  background: 'none',
                  color: '#64748b',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  padding: '0.7rem 1rem',
                  border: 0,
                  cursor: 'pointer',
                }}
              >
                ← Back to 28 Lessons
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ================== ACTIVE CHALLENGE QUESTION ARENA ================== */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Top Live Status HUD */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              background: '#ffffff',
              padding: '0.85rem 1.25rem',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            {/* Left: Track & Progress */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  background: currentQuestion.badgeBg,
                  color: currentQuestion.badgeColor,
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                }}
              >
                {currentQuestion.trackTitleEnglish}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
                Question {currentQIndex + 1} of {activeQuestions.length}
              </span>
            </div>

            {/* Center: Timer & Lives */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              {gameMode === 'blitz' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>⏱️</span>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      color: timeLeft <= 5 ? '#dc2626' : '#0f172a',
                    }}
                  >
                    {timeLeft}s
                  </span>
                </div>
              )}

              {gameMode === 'blitz' && (
                <div style={{ display: 'flex', gap: '0.2rem' }} title={`${lives} lives remaining`}>
                  {[1, 2, 3].map((l) => (
                    <span key={l} style={{ fontSize: '1.1rem', opacity: l <= lives ? 1 : 0.25 }}>
                      ❤️
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Score & Multiplier */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {streak >= 2 && (
                <span
                  style={{
                    background: '#fef3c7',
                    color: '#b45309',
                    border: '1px solid #fde68a',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                  }}
                >
                  {streak} Streak · {streakMultiplier}x! 🔥
                </span>
              )}
              <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a' }}>
                {score} <span style={{ fontSize: '0.75rem', color: '#64748b' }}>pts</span>
              </span>
            </div>
          </div>

          {/* Bodhi Commentary Pill */}
          {bodhiCommentary && (
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                fontSize: '0.82rem',
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🤖</span>
                <span>
                  <b>Bodhi Commentary:</b> {bodhiCommentary}
                </span>
              </div>
              <button
                type="button"
                onClick={() => speakAsBodhi(bodhiCommentary.replace(/[⚡⏳🔥🌟✓❌]/g, '').trim(), { lang: 'en' })}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '999px',
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#2563eb',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
                title="Listen to Bodhi voice guidance"
              >
                <span>🔊</span>
                <span>Listen</span>
              </button>
            </div>
          )}

          {/* Main Question Card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2rem 1.75rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
            }}
          >
            {/* Title & Sutra Box */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', marginBottom: '0.25rem' }}>
                {currentQuestion.title}
              </div>
              <div
                style={{
                  background: '#fdfbf7',
                  border: '1.5px solid #fed7aa',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#7c2d12', fontFamily: 'inherit' }}>
                    {currentQuestion.sutra}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#9a3412', fontStyle: 'italic', marginTop: '0.2rem' }}>
                    {currentQuestion.sutraIast}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handlePronounceSutra(currentQuestion.sutra)}
                  style={{
                    background: activePronouncingSutra === currentQuestion.sutra ? '#ea580c' : '#ffffff',
                    color: activePronouncingSutra === currentQuestion.sutra ? '#ffffff' : '#9a3412',
                    border: '1px solid #ea580c',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                  }}
                  title="Listen to Sanskrit sūtra pronunciation"
                >
                  <span>🔊</span>
                  <span>Listen Sūtra</span>
                </button>
              </div>
            </div>

            {/* Question Prompt */}
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1.25rem', lineHeight: 1.45 }}>
              {currentQuestion.prompt}
            </h4>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrectOption = oIdx === currentQuestion.correctIndex;

                let btnBg = '#ffffff';
                let btnBorder = '#e2e8f0';
                let btnColor = '#1e293b';

                if (isAnswerRevealed) {
                  if (isCorrectOption) {
                    btnBg = '#ecfdf5';
                    btnBorder = '#10b981';
                    btnColor = '#065f46';
                  } else if (isSelected) {
                    btnBg = '#fef2f2';
                    btnBorder = '#ef4444';
                    btnColor = '#991b1b';
                  }
                } else if (isSelected) {
                  btnBg = '#eff6ff';
                  btnBorder = '#3b82f6';
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    disabled={isAnswerRevealed}
                    onClick={() => handleSelectOption(oIdx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '1rem 1.15rem',
                      borderRadius: '12px',
                      border: `2px solid ${btnBorder}`,
                      background: btnBg,
                      color: btnColor,
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: isAnswerRevealed ? 'default' : 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span
                      style={{
                        width: '1.75rem',
                        height: '1.75rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        background: isAnswerRevealed && isCorrectOption ? '#10b981' : '#f1f5f9',
                        color: isAnswerRevealed && isCorrectOption ? '#ffffff' : '#475569',
                        flexShrink: 0,
                      }}
                    >
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                    {isAnswerRevealed && isCorrectOption && <span>✅</span>}
                    {isAnswerRevealed && isSelected && !isCorrectOption && <span>❌</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Computational Insight Box */}
            {isAnswerRevealed && (
              <div
                style={{
                  marginTop: '1.75rem',
                  padding: '1.25rem',
                  background: '#f8fafc',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>💡</span>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                    Sūtra Mechanics &amp; Computational Logic
                  </span>
                </div>
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.88rem', color: '#334155', lineHeight: 1.55 }}>
                  {currentQuestion.explanation}
                </p>
                <div
                  style={{
                    background: '#ffffff',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    borderLeft: '4px solid #2563eb',
                    fontSize: '0.82rem',
                    color: '#1e3a8a',
                  }}
                >
                  <b>Computational Core:</b> {currentQuestion.computationalInsight}
                </div>

                <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    style={{
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      padding: '0.65rem 1.6rem',
                      borderRadius: '999px',
                      border: 0,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    }}
                  >
                    {currentQIndex + 1 < activeQuestions.length ? 'Next Challenge →' : 'View Results 🏆'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseChallengeArena;
