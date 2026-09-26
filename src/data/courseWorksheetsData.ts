/**
 * Official Gurukul Printable Study Worksheets & Comprehensive Answer Keys
 * For All 28 Lessons of "संस्कृत-चिन्तनम् · Sanskrit as a Way of Thinking"
 *
 * Each worksheet contains:
 * - Official Header (Student Name, Date, Marks, Learning Outcomes)
 * - Section A: ध्वनि-वर्ण-अभ्यासः (Phonetic & Acoustic Identification Drill) [5 Marks]
 * - Section B: विधि-विश्लेषणम् (Morphology & Rule Mechanics) [8 Marks]
 * - Section C: वाक्य-रचना एवं प्रयोगः (Applied Syntax & Problem Solving) [7 Marks]
 * - Section D: चिन्तन-सेतुः (Cognitive & Contemplative Journaling Prompt) [5 Marks]
 * - सम्पूर्ण-उत्तर-पत्रिका (Complete Verified Answer Key & Model Answers)
 */

export interface CourseWorksheetQuestion {
  id: string;
  questionNumber: string; // e.g. "1", "2", "3"
  promptDevanagari: string;
  promptEnglish: string;
  marks: number;
  optionsOrHints?: string[];
  answer: string;
  explanation: string;
}

export interface CourseWorksheetSection {
  sectionCode: 'A' | 'B' | 'C' | 'D';
  sectionTitleDevanagari: string;
  sectionTitleEnglish: string;
  instructions: string;
  totalMarks: number;
  questions: CourseWorksheetQuestion[];
}

export interface CourseLessonWorksheet {
  lessonId: string;
  lessonNumber: string;
  worksheetTitleDevanagari: string;
  worksheetTitleEnglish: string;
  subtitle: string;
  maxMarks: number;
  durationMinutes: number;
  learningOutcomes: string[];
  sections: CourseWorksheetSection[];
  contemplativePrompt: {
    promptDevanagari: string;
    promptEnglish: string;
    guidingQuestions: string[];
    modelReflection: string;
  };
}

export const COURSE_LESSON_WORKSHEETS: Record<string, CourseLessonWorksheet> = {
  // =========================================================================
  // MODULE 1: Sound as Input (ध्वनिः)
  // =========================================================================
  'c-1-1': {
    lessonId: 'c-1-1',
    lessonNumber: '1.1',
    worksheetTitleDevanagari: 'ध्वनि-विज्ञानम् एवं शान्ति-मन्त्र-अनुशीलनम्',
    worksheetTitleEnglish: 'Sound as Input & Śānti-Mantra Acoustic Practice',
    subtitle: 'Sensory grounding in physical acoustic resonance and vocal mechanics',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Identify vocal tract landmarks: Kaṇṭha (throat), Tālu (palate), Mūrdhan (roof), Danta (teeth), Oṣṭha (lips).',
      'Distinguish internal sound consciousness (Vāk) from arbitrary alphabet notation.',
      'Recite the Taittirīya Śānti Mantra with accurate mātrā timing and lead-follow pauses.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · उच्चारण-स्थान-निर्धारणम्',
        sectionTitleEnglish: 'Section A · Place of Articulation Identification',
        instructions: 'Match each sound with its primary physiological place of articulation in the vocal tract.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-1-q1',
            questionNumber: '1',
            promptDevanagari: 'कण्ठतः (Throat) उद्भवन्तः वर्णाः के सन्ति?',
            promptEnglish: 'Which of the following sounds originates primarily in the Kaṇṭha (throat / velar area)?',
            marks: 2,
            optionsOrHints: ['अ, क, ख, ग, घ, ङ, ह', 'इ, च, छ, ज, झ, ञ, य, श', 'उ, प, फ, ब, भ, म', 'ऋ, ट, ठ, ड, ढ, ण, र, ष'],
            answer: 'अ, क, ख, ग, घ, ङ, ह (अकुहविसर्जनीयानां कण्ठः)',
            explanation: 'Under Pāṇinian phonetics, the vowel "a", the five ka-varga gutturals, the aspirate "ha", and the visarga all resonate in the Kaṇṭha.'
          },
          {
            id: 'ws1-1-q2',
            questionNumber: '2',
            promptDevanagari: 'ओष्ठयोः संयोजनेन कस्य वर्णस्य उच्चारणं भवति?',
            promptEnglish: 'Which sound family requires complete closure or circular rounding of the lips (Oṣṭha)?',
            marks: 3,
            optionsOrHints: ['त-वर्गः (ta-varga)', 'प-वर्गः (pa-varga: प, फ, ब, भ, म)', 'च-वर्गः (ca-varga)', 'ट-वर्गः (ṭa-varga)'],
            answer: 'प-वर्गः (प, फ, ब, भ, म) एवं उ/ऊ (उपूपध्मानीयानामोष्ठौ)',
            explanation: 'The labial class (प, फ, ब, भ, म) and the rounded vowels उ and ऊ depend entirely on the upper and lower lips.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · मन्त्र-पदच्छेदः एवं संरचना',
        sectionTitleEnglish: 'Section B · Mantra Word-Splitting & Structural Parsing',
        instructions: 'Analyze the words of the Saha Nāwavatu invocation and parse their grammatical role.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws1-1-q3',
            questionNumber: '3',
            promptDevanagari: 'पदच्छेदं कुरुत: "सहनाववतु"',
            promptEnglish: 'Split the sandhi compound "स॒ह ना॑ववतु" into its individual constituent words.',
            marks: 4,
            optionsOrHints: ['सह + नौ + अवतु', 'सहन + आववतु', 'सह + नाव + वतु', 'सहन + अवतु'],
            answer: 'सह + नौ + अवतु (saha + nau + avatu)',
            explanation: '"सह" means together; "नौ" is the dual accusative pronoun (us two: teacher and student); "अवतु" is the imperative verb (may He protect).'
          },
          {
            id: 'ws1-1-q4',
            questionNumber: '4',
            promptDevanagari: 'मन्त्रे "नौ" (nau) इति पदस्य कः अर्थः?',
            promptEnglish: 'In the phrase "सह नौ भुनक्तु", what grammatical number (वचनम्) and entity does "नौ" represent?',
            marks: 4,
            optionsOrHints: ['Singular (only the student)', 'Dual (both teacher and disciple together: आवाम्)', 'Plural (the whole nation)', 'Boat (water vessel)'],
            answer: 'द्विवचनम् (Dual) — "Us two together" (गुरु-शिष्यौ)',
            explanation: '"नौ" is the enclitic dual accusative/dative/genitive form of "अस्मद्", designating the sacred bilateral bond between preceptor and disciple.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · प्रयोगः एवं वाक्य-बोधः',
        sectionTitleEnglish: 'Section C · Applied Semantic Analysis',
        instructions: 'Answer the question based on the philosophical purpose of studying sound as an input.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws1-1-q5',
            questionNumber: '5',
            promptDevanagari: 'किमर्थं मन्त्रस्य अन्ते त्रिवारं "शान्तिः" इति उच्यते?',
            promptEnglish: 'Why is the word "Śāntiḥ" chanted exactly three times at the conclusion of an Upaniṣadic study session?',
            marks: 7,
            optionsOrHints: ['To appease 3 gods', 'To pacify the 3 categories of distress (आधिदैविक, आधिभौतिक, आध्यात्मिक)', 'For musical rhyme', 'Because three is a lucky number'],
            answer: 'त्रिताप-प्रशमनार्थम् (आधिदैविक = cosmic forces, आधिभौतिक = worldly environment, आध्यात्मिक = inner physical/mental obstacles)',
            explanation: 'The three chants pacify the threefold sources of mental distraction (Tāpatraya) so that pure learning can proceed without agitation.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Write a concise, 3-sentence analytical reflection in your study notebook.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-1-q6',
            questionNumber: '6',
            promptDevanagari: 'ध्वनिः सङ्गणक-प्रणाल्याः "Input" इव कथं कार्यं करोति?',
            promptEnglish: 'How does Sanskrit treat sound as a structured biometric input system compared to conventional modern alphabets?',
            marks: 5,
            answer: 'Sanskrit organizes sound not by historical accident but by vocal tract anatomy from throat to lips. This makes phonemes behave like calibrated hardware sensor inputs, giving speech complete predictability and zero spelling discrepancies.',
            explanation: 'Reflect on how vocal tract positioning transforms breathing into deterministic information encoding.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'सह नाववतु इति प्रार्थनायां शिक्षक-छात्रयोः सम्बन्धस्य का विशिष्टिः?',
      promptEnglish: 'In the Sahana Vavatu invocation, how does the prayer protect both teacher and student from intellectual jealousy and fatigue?',
      guidingQuestions: [
        'Notice the phrase "मा विद्विषावहै" (May there never be hostility or friction between us).',
        'Why does genuine learning require emotional safety and mutual respect?',
        'How does reciting together synchronize the breathing of two human beings?'
      ],
      modelReflection: 'The prayer recognizes that intellectual vanity and envy are the greatest poisons to cognition. By placing both teacher and disciple under the same divine umbrella ("सह नौ"), hierarchy dissolves into a shared pilgrimage toward truth.'
    }
  },

  // =========================================================================
  // MODULE 2: Script and Symbols (लिपिः)
  // =========================================================================
  'c-2-1': {
    lessonId: 'c-2-1',
    lessonNumber: '2.1',
    worksheetTitleDevanagari: 'देवनागरी वर्णमाला एवं ऐ.ए.एस.टी. रूपान्तरणम्',
    worksheetTitleEnglish: 'Devanāgarī Script & IAST Diacritic Transliteration Matrix',
    subtitle: 'Zero-ambiguity bijective mapping between acoustic phonemes and visual glyphs',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the inherent short vowel "a" principle and Halanta ( ् ) removal mechanic.',
      'Transliterate accurately between Devanāgarī and IAST diacritics (ā, ī, ū, ṛ, ṭ, ḍ, ṇ, ś, ṣ).',
      'Explain the bijective 1:1 mathematical relationship between Sanskrit writing and speech.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · वर्ण-परिज्ञानम् एवं हलन्त-विधिः',
        sectionTitleEnglish: 'Section A · Glyph Identification & Halanta Mechanics',
        instructions: 'Determine the exact acoustic value of the glyphs with and without Halanta.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws2-1-q1',
            questionNumber: '1',
            promptDevanagari: 'देवनागरी-व्यञ्जने हलन्त-चिह्नस्य ( ् ) कः प्रभावः भवति?',
            promptEnglish: 'What is the precise structural effect of adding a Halanta stroke under a consonant (e.g. क् vs क)?',
            marks: 2,
            optionsOrHints: ['It doubles the sound', 'It removes the inherent short vowel "a" (अकार-लोपः), leaving pure silent consonant', 'It turns the letter into a vowel', 'It marks stress'],
            answer: 'अकार-लोपः (Removes the inherent "a" vowel, leaving a pure consonant of 0.5 mātrā duration)',
            explanation: 'Bare "क" contains inherent "a" (क् + अ). The Halanta "क्" strips this away, silencing the breath.'
          },
          {
            id: 'ws2-1-q2',
            questionNumber: '2',
            promptDevanagari: 'शिरोरेखायाः (Top hanging line) किं प्रयोजनम्?',
            promptEnglish: 'What is the phonetic and visual function of the Śirorekhā (horizontal top bar) in Devanāgarī?',
            marks: 3,
            optionsOrHints: ['Purely decorative', 'Visually binds consonants and vowels into a single breath-syllable (Akṣara)', 'Separates paragraphs', 'Marks musical pitch'],
            answer: 'अक्षर-संयोजनम् (Visually groups phonemes into a unified breath-packet / Akṣara)',
            explanation: 'The top line demarcates single respiratory syllable boundaries, facilitating uninterrupted oral reading.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · ऐ.ए.एस.टी. रूपान्तरण-पट्टिका',
        sectionTitleEnglish: 'Section B · IAST Diacritic Transliteration Drill',
        instructions: 'Transliterate between Devanāgarī and IAST with strict diacritical accuracy.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws2-1-q3',
            questionNumber: '3',
            promptDevanagari: 'एतेषां पदानाम् ऐ.ए.एस.टी. रूपं लिखत: (१) ज्ञानम् (२) ऋषिः (३) शान्तिः',
            promptEnglish: 'Provide the exact IAST transliteration with macrons and dots for: (1) ज्ञानम् (2) ऋषिः (3) शान्तिः',
            marks: 4,
            answer: '(1) jñānam (2) ṛṣiḥ (3) śāntiḥ',
            explanation: 'Note the diacritics: ñ for palatal nasal, ā for long vowel, ṛ for vocalic r, ṣ for retroflex sibilant, ḥ for visarga, ś for palatal sibilant.'
          },
          {
            id: 'ws2-1-q4',
            questionNumber: '4',
            promptDevanagari: 'ऐ.ए.एस.टी. पदस्य देवनागरी-रूपं लिखत: "kṛṣṇaḥ" एवं "dharmaḥ"',
            promptEnglish: 'Convert the IAST words "kṛṣṇaḥ" and "dharmaḥ" back into authentic Devanāgarī script.',
            marks: 4,
            answer: 'कृष्णः (kṛṣṇaḥ) एवं धर्मः (dharmaḥ)',
            explanation: 'k + ṛ (कृ) + ṣ + ṇ + a + ḥ (ष्णः) = कृष्णः; dh + a + r + m + a + ḥ (र्मः) = धर्मः.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · वर्ण-विच्छेद-अभ्यासः',
        sectionTitleEnglish: 'Section C · Syllabic Decomposition (Varṇa-Viccheda)',
        instructions: 'Break down the word into its atomic consonants and vowels.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws2-1-q5',
            questionNumber: '5',
            promptDevanagari: '"संस्कृतम्" इति पदस्य वर्ण-विच्छेदं कुरुत ।',
            promptEnglish: 'Perform complete letter-by-letter Varṇa-Viccheda for the word "संस्कृतम्".',
            marks: 7,
            answer: 'स् + अ + म् (अनुस्वारः/ं) + स् + क् + ऋ + त् + अ + म्',
            explanation: 'Breaking into atomic units reveals 9 phonemes: s + a + ṁ + s + k + ṛ + t + a + m.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: द्वि-दिश-सम्बन्धः',
        sectionTitleEnglish: 'Section D · Thinking Connection: Bijective Mapping',
        instructions: 'Answer in 2 to 3 sentences in your study journal.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws2-1-q6',
            questionNumber: '6',
            promptDevanagari: 'सङ्गणक-विज्ञाने "Bijective 1:1 Mapping" इति सङ्कल्पना देवनागरी-लिपौ कथं चरितार्था भवति?',
            promptEnglish: 'Why is a 1:1 bijective mapping between spelling and sound essential for digital speech synthesis and OCR?',
            marks: 5,
            answer: 'Because every Devanāgarī symbol has exactly one unambiguous acoustic frequency and vice-versa, computer algorithms do not need complex exception dictionaries or probabilistic guessing as required in English (e.g. tough vs through).',
            explanation: 'Contrast Devanāgarī determinism with irregular orthographies.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'अक्षरम् इत्यस्य अर्थः "यन्न क्षरति तत्" (नष्टं न भवति)। अस्य दार्शनिकं महत्त्वं किम्?',
      promptEnglish: 'The Sanskrit word for syllable is "Akṣara" — literally "that which cannot decay or be destroyed". What is the philosophical depth of this definition?',
      guidingQuestions: [
        'Physical objects decay, but does the primordial vibration of a vowel ever perish?',
        'How does speaking imperishable sounds connect our transient awareness to eternity?'
      ],
      modelReflection: 'Matter changes form and dissolves, but an acoustic vibration once unleashed into the field of space reverberates perpetually. To chant an Akṣara is to participate in an eternal mathematical constant.'
    }
  },

  // =========================================================================
  // MODULE 2, Lesson 2.2: Mātrās and Dependent Symbols
  // =========================================================================
  'c-2-2': {
    lessonId: 'c-2-2',
    lessonNumber: '2.2',
    worksheetTitleDevanagari: 'मात्रा-संयोगाः एवं बारहखड़ी-पद्धतिः',
    worksheetTitleEnglish: 'Mātrā Vowel Modifiers & Complete Bārahkhaḍī Matrix',
    subtitle: 'Consonants as instruments; vowel mātrās as the animating breath (prāṇa)',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the 12+ vowel mātrā attachments across the consonant spectrum.',
      'Handle special glyph attachments: ru (रु), rū (रू), and hṛ (हृ).',
      'Understand the acoustic duration ratio: Hrasva (1 mātrā) vs Dīrgha (2 mātrās).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · मात्रा-चिह्न-मेलकम्',
        sectionTitleEnglish: 'Section A · Mātrā Sign Matching',
        instructions: 'Match each vowel with its dependent mātrā glyph and timing duration.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws2-2-q1',
            questionNumber: '1',
            promptDevanagari: 'ह्रस्व-मात्राणां दीर्घ-मात्राणां च काल-मानं किम्?',
            promptEnglish: 'What is the exact durational value of short (ह्रस्व) and long (दीर्घ) mātrās?',
            marks: 2,
            optionsOrHints: ['Short = 1 Mātrā (निमेष/eye-blink), Long = 2 Mātrās', 'Short = 2, Long = 4', 'Both are equal', 'Variable'],
            answer: 'ह्रस्वः = १ मात्रा (1 beat), दीर्घः = २ मात्रा (2 beats)',
            explanation: 'Pāṇini defines 1 mātrā as the chirp of the blue jay or single eye-blink; 2 mātrās as the crow’s call.'
          },
          {
            id: 'ws2-2-q2',
            questionNumber: '2',
            promptDevanagari: 'र-कारस्य उ/ऊ मात्रा-संयोगे किं वैशिष्ट्यम्?',
            promptEnglish: 'What is unique about attaching short "u" and long "ū" to the consonant "ra" (र)?',
            marks: 3,
            optionsOrHints: ['Attaches underneath like other letters', 'Attaches to the middle-right vertical curve (रु, रू)', 'Attaches on top', 'Cannot attach'],
            answer: 'मध्य-भागे योजनम् (Attaches to the middle stem: रु as in गुरु, रू as in रूपम्)',
            explanation: 'Letter Ra does not accept foot-hooks; it sprouts from its central belly (रु vs रू).'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · बारहखड़ी-पूरणम्',
        sectionTitleEnglish: 'Section B · Complete Bārahkhaḍī Scale Completion',
        instructions: 'Complete the full vowel conjugation row for the consonant "स" (sa).',
        totalMarks: 8,
        questions: [
          {
            id: 'ws2-2-q3',
            questionNumber: '3',
            promptDevanagari: '"स" वर्णस्य बारहखड़ी-मालां लिखत ।',
            promptEnglish: 'Write out the complete 12-sound scale for consonant "स": sa, sā, si, sī, su, sū, sṛ, se, sai, so, sau, saṁ, saḥ.',
            marks: 8,
            answer: 'स, सा, सि, सी, सु, सू, सृ, से, सै, सो, सौ, सं, सः',
            explanation: 'Notice the progression of short and long vowels followed by guṇa (से), vṛddhi (सै, सौ), and breath releases (सं, सः).'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · दोष-संशोधनम् (Error Correction)',
        sectionTitleEnglish: 'Section C · Orthographic Error Correction',
        instructions: 'Identify and correct the mātrā spelling errors in the given words.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws2-2-q4',
            questionNumber: '4',
            promptDevanagari: 'अशुद्धं पदं संशोध्य लिखत: (१) गूरुः (२) कवी (३) नदीम्',
            promptEnglish: 'Correct the incorrect vowel lengths in: (1) गूरुः (should be guruḥ) (2) कवी (as nominative singular poet) (3) क्रिष्णः',
            marks: 7,
            answer: '(1) गुरुः (both u vowels are short) (2) कविः (short i) (3) कृष्णः (vocalic ṛ, not ri)',
            explanation: 'Confusing short "u" with long "ū" changes meaning and distorts meter.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: शरीरं प्राणश्च',
        sectionTitleEnglish: 'Section D · Thinking Connection: Body & Breath',
        instructions: 'Reflect on the Sāṅkhya philosophical metaphor of Consonant vs Vowel.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws2-2-q5',
            questionNumber: '5',
            promptDevanagari: 'कथं व्यञ्जनं शरीरम् इव, स्वरश्च प्राणः इव वर्तते?',
            promptEnglish: 'Why did ancient grammarians compare consonants to the physical body (Prakṛti) and vowels to consciousness / breath (Puruṣa)?',
            marks: 5,
            answer: 'A pure consonant is inert, unpronounceable, and motionless on its own. Only when the vowel (prāṇa/breath) enters does the consonant awaken into living speech, symbolizing how matter remains dead without spirit.',
            explanation: 'Explore the organic unity between phonetics and ontology.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'मात्रा-काले एकाग्रता कथं मनसः चञ्चलतां शमयति?',
      promptEnglish: 'How does paying rigorous attention to the 1-beat vs 2-beat duration of vowels calm the wandering mind?',
      guidingQuestions: [
        'When you rush speech, what happens to your inner mental state?',
        'How does holding a long vowel (दीर्घ) for its full 2 beats cultivate emotional patience?'
      ],
      modelReflection: 'Rushing through vowels reflects inner anxiety and greed for future moments. Honoring the full 2 beats of a long vowel roots consciousness in the spacious present.'
    }
  },

  // =========================================================================
  // MODULE 3: Rules as Processing (व्याकरणम्)
  // =========================================================================
  'c-3-1': {
    lessonId: 'c-3-1',
    lessonNumber: '3.1',
    worksheetTitleDevanagari: 'धातवः एवं शब्द-निष्पत्ति-विज्ञानम्',
    worksheetTitleEnglish: 'Roots (Dhātavaḥ): Word Generation & Morphology',
    subtitle: 'From an algorithmic seed action grows a forest of living vocabulary',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Understand how 2,000 algorithmic roots (Dhātus) generate thousands of nouns, verbs, and participles.',
      'Deconstruct words into Prefix (उपसर्ग) + Root (धातु) + Suffix (प्रत्यय).',
      'Trace the prolific family tree of the root √कृ (to do / create).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · धातु-अभिज्ञानम्',
        sectionTitleEnglish: 'Section A · Verbal Root Identification',
        instructions: 'Extract the parent verbal root from the derived Sanskrit terms.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-1-q1',
            questionNumber: '1',
            promptDevanagari: 'एतेषां पदानां मूल-धातुः कः? (क) दर्शनम् (ख) विज्ञानम् (ग) मन्त्रः',
            promptEnglish: 'Identify the common parent root for: (a) दर्शनम् (b) विज्ञानम् (c) मन्त्रः',
            marks: 3,
            optionsOrHints: ['(a) √दृश् (b) √ज्ञा (c) √मन्', '(a) √गम् (b) √पठ् (c) √भू', '(a) √कृ (b) √लिख् (c) √हस्'],
            answer: '(a) √दृश् (to see) (b) √ज्ञा (to know) (c) √मन् (to think/compute)',
            explanation: 'Each word preserves the core semantic action of its ancestral root.'
          },
          {
            id: 'ws3-1-q2',
            questionNumber: '2',
            promptDevanagari: 'पाणिनिना कति धातवः धातुपाठे परिगणिताः?',
            promptEnglish: 'Approximately how many verbal roots did Maharṣi Pāṇini organize into the 10 Gaṇas of the Dhātupāṭha?',
            marks: 2,
            optionsOrHints: ['~500', '~2,000 (1,938 to 2,014 roots)', '~10,000', '~100,000'],
            answer: '~2,000 धातवः (in 10 Gaṇa classes)',
            explanation: 'This compact set of ~2,000 algorithmic verbs is sufficient to generate all literature.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · √कृ धातोः परिवार-वृक्षः',
        sectionTitleEnglish: 'Section B · The Prolific Family Tree of Root √कृ',
        instructions: 'Derive 4 distinct nouns and verbs from the single root √कृ using prefixes and suffixes.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws3-1-q3',
            questionNumber: '3',
            promptDevanagari: '√कृ धातोः निष्पन्नानि चत्वारि पदानि अर्थ-सहितं लिखत ।',
            promptEnglish: 'List 4 derived terms from √कृ (to do/make) with their specific meanings.',
            marks: 8,
            answer: '१. कर्म (action/causality) २. कर्ता (agent/doer) ३. कार्यम् (duty/task) ४. संस्कारः (refinement/impression via सं + कृ)',
            explanation: 'Showcases how a single verb expands into epistemology, ethics, and psychology.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · उपसर्ग-परिवर्तन-विधिः',
        sectionTitleEnglish: 'Section C · Prefix Transformation Mechanics',
        instructions: 'Observe how prefixes dramatically steer the direction of a verbal root.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws3-1-q4',
            questionNumber: '4',
            promptDevanagari: '√गम् (गच्छति = goes) धातोः उपसर्गेण सह अर्थ-परिवर्तनं दर्शयत: (१) आ + गच्छति (२) अनु + गच्छति (३) अधि + गच्छति',
            promptEnglish: 'How do prefixes alter √gam: (1) ā + gacchati (2) anu + gacchati (3) adhi + gacchati?',
            marks: 7,
            answer: '(1) आगच्छति = comes (reverses direction) (2) अनुगच्छति = follows along (3) अधिगच्छति = attains / masters knowledge',
            explanation: 'उपसर्गेण धात्वर्थो बलादन्यत्र नीयते: Prefixes forcefully propel the root meaning into new domains.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: OOP & Base Classes',
        sectionTitleEnglish: 'Section D · Thinking Connection: Object-Oriented Inheritance',
        instructions: 'Bridge Sanskrit morphology with computer science concepts.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-1-q5',
            questionNumber: '5',
            promptDevanagari: 'कथं धातुः सङ्गणक-प्रोग्रामिङ्ग-भाषायाः "Abstract Base Class" इव वर्तते?',
            promptEnglish: 'Explain why a Pāṇinian Dhātu is equivalent to an Abstract Base Class in Object-Oriented Programming (OOP).',
            marks: 5,
            answer: 'An Abstract Base Class defines core behavioral blueprints that cannot be run directly until specialized into concrete subclass instances. Similarly, a raw Dhātu (like √kṛ) is an unuttered abstraction until instantiated by pratyayas into callable verbs (karoti) or data nouns (kāryam).',
            explanation: 'Highlights the modular, object-oriented nature of Pāṇinian grammar.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: '"सर्वं कर्म धातुजम्" — अस्माकं जीवने क्रियायाः (Action) किं स्थानम्?',
      promptEnglish: 'If all words in Sanskrit stem from roots of action (Dhātus), what does this reveal about reality being dynamic rather than static?',
      guidingQuestions: [
        'Are things permanent monuments or ongoing unfolding actions?',
        'A "tree" is called "Vṛkṣa" (that which is cut or grows). How does seeing objects as verbs change how we live?'
      ],
      modelReflection: 'In Sanskrit, reality is not an inventory of dead nouns; it is a symphony of verbs. Even a mountain or ocean is named after what it does. This shifts the mind from clinging to static identities to participating in living flow.'
    }
  },

  // =========================================================================
  // MODULE 3, Lesson 3.4: The Vibhaktis as Sentence Roles (Kārakas)
  // =========================================================================
  'c-3-4': {
    lessonId: 'c-3-4',
    lessonNumber: '3.4',
    worksheetTitleDevanagari: 'कारकाणि एवं सप्त-विभक्तयः',
    worksheetTitleEnglish: 'The 6 Kārakas & 7 Vibhaktis: Decentralized Semantic Graphs',
    subtitle: 'Syntax baked into suffixes: liberating word order for pure poetic freedom',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the 7 nominal cases (Vibhaktis) and their direct relation to the verbal action (Kārakas).',
      'Understand why Sanskrit sentences can scramble word order with zero semantic loss.',
      'Deconstruct complex verses into their functional case tags.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · कारक-विभक्ति-मेलकम्',
        sectionTitleEnglish: 'Section A · Case & Role Assignment Matching',
        instructions: 'Match the Vibhakti number with its corresponding Kāraka name and core semantic question.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-4-q1',
            questionNumber: '1',
            promptDevanagari: 'तृतीया-विभक्तेः पञ्चमी-विभक्तेः च कारके के स्तः?',
            promptEnglish: 'What are the Kāraka roles and questions for Tṛtīyā (3rd) and Pañcamī (5th) cases?',
            marks: 3,
            optionsOrHints: ['तृतीया = करणम् (With/by what instrument); पञ्चमी = अपादानम् (Source of separation / from where)', 'तृतीया = कर्ता; पञ्चमी = कर्म', 'तृतीया = अधिकरणम्; पञ्चमी = सम्प्रदानम्'],
            answer: 'तृतीया = करणम् (Instrument: साधकतमं करणम्); पञ्चमी = अपादानम् (Source: ध्रुवमपायेऽपादानम्)',
            explanation: 'Case 3 denotes the primary tool; Case 5 denotes the departure point or origin.'
          },
          {
            id: 'ws3-4-q2',
            questionNumber: '2',
            promptDevanagari: 'किमर्थं षष्ठी-विभक्तिः (Genitive) कारकेषु न गण्यते?',
            promptEnglish: 'Why is the 6th case (Ṣaṣṭhī: of/possession) strictly NOT counted as one of the 6 Kārakas in Pāṇinian grammar?',
            marks: 2,
            optionsOrHints: ['Because it relates a noun to another noun, NOT directly to the verbal action (क्रियान्वयि कारकाम्)', 'Because it was forgotten', 'Because it has no endings', 'It is counted'],
            answer: 'क्रिया-सम्बन्धाभावात् (It connects noun-to-noun, e.g. "रामस्य पुस्तकम्", without a direct link to the verb)',
            explanation: 'By definition, a Kāraka must directly connect to the verb (क्रियान्वयित्वं कारकत्वम्).'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · वाक्येषु कारक-विश्लेषणम्',
        sectionTitleEnglish: 'Section B · Sentence Parsing & Role Identification',
        instructions: 'Parse every noun in the grand multi-case sentence below.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws3-4-q3',
            questionNumber: '3',
            promptDevanagari: 'वाक्ये पदानि विभक्त्या सह योजयत: "रामः अयोध्यायाः वने बाणेन रावणं हन्ति।"',
            promptEnglish: 'Identify the case (विभक्तिः) and role (कारकम्) of each noun in: "रामः अयोध्यायाः वने बाणेन रावणं हन्ति।"',
            marks: 8,
            answer: '१. रामः = प्रथमा (कर्ता / Agent) २. अयोध्यायाः = पञ्चमी (अपादानम् / Point of departure) ३. वने = सप्तमी (अधिकरणम् / Location) ४. बाणेन = तृतीया (करणम् / Instrument) ५. रावणम् = द्वितीया (कर्म / Direct Object) ६. हन्ति = क्रिया (Action)',
            explanation: 'Demonstrates a complete sentence spanning 5 distinct case roles unified by the verb.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · मुक्त-क्रम-प्रमाणम् (Free Word Order)',
        sectionTitleEnglish: 'Section C · Free Word Order Verification',
        instructions: 'Scramble the sentence words and explain why the meaning does not change.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws3-4-q4',
            questionNumber: '4',
            promptDevanagari: 'एतेषां त्रयाणां वाक्यानाम् अर्थः समानः अस्ति वा? (१) बालकः पुस्तकं पठति (२) पुस्तकं बालकः पठति (३) पठति बालकः पुस्तकम्',
            promptEnglish: 'Are these 3 sentences semantically identical? Why does English change meaning when words move, while Sanskrit stays fixed?',
            marks: 7,
            answer: 'Yes, 100% identical in meaning. Because "बालकः" carries the nominative suffix "-ḥ" (subject) and "पुस्तकम्" carries the accusative suffix "-m" (object), their relationship is hardcoded inside the word, independent of word order.',
            explanation: 'English lacks inflectional case markers, relying rigidly on Subject-Verb-Object word position.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: Graph Networks',
        sectionTitleEnglish: 'Section D · Thinking Connection: Semantic Graphs',
        instructions: 'Bridge Kāraka theory with modern computational linguistics.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-4-q5',
            questionNumber: '5',
            promptDevanagari: 'कथं संस्कृत-वाक्यं "Graph Database" इव कार्यं करोति?',
            promptEnglish: 'Why do modern natural language processing (NLP) researchers compare Kāraka theory to labeled property graph networks?',
            marks: 5,
            answer: 'In a graph database, nodes (entities) connect to the central event node via typed edges (kartā, karma, karaṇa). Sanskrit sentences behave identically: the verb sits at the graph center, and each noun declares its labeled edge via its Vibhakti suffix.',
            explanation: 'Dependency parsing in modern AI mirrors Pāṇinian Kāraka trees.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'जीवने वयं सर्वे "कर्ता" (Doer) भवितुम् इच्छामः, किन्तु वस्तुतः वयं "करणम्" (Instrument) स्मः वा?',
      promptEnglish: 'In life, human ego demands to be the sole "Kartā" (autonomous doer). What happens when we realize we are also "Karaṇa" (instruments of a higher cosmic order)?',
      guidingQuestions: [
        'Read Gītā 11.33: "निमित्तमात्रं भव सव्यसाचिन्" (Be merely an instrument, O Arjuna).',
        'How does shifting identity from proud doer to skilled instrument dissolve performance anxiety?'
      ],
      modelReflection: 'When you believe you are the solitary doer, every outcome carries the crushing weight of personal pride or failure. Seeing yourself as a noble instrument (Karaṇa) in the hands of the universe unlocks humility and peak effortless performance.'
    }
  },

  // =========================================================================
  // MODULE 5: The Scientific Mind (गणितम्, तर्कः)
  // =========================================================================
  'c-5-1': {
    lessonId: 'c-5-1',
    lessonNumber: '5.1',
    worksheetTitleDevanagari: 'अष्टाध्यायी · जगत्-प्रथम-सङ्गणक-सूत्रम्',
    worksheetTitleEnglish: "Pāṇini's Grammar as an Algorithm & Generative Rewrite Rules",
    subtitle: 'The world’s first formal language compiler, engineered 2,400 years before computers',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Understand Pāṇini’s four rule types: Saṁjñā, Paribhāṣā, Vidhi, and Adhikāra.',
      'Trace the execution of sūtra 6.1.77 (इको यणचि) as a production rewrite rule.',
      'Explain Donald Knuth’s connection between Pāṇinian sūtras and Backus-Naur Form (BNF).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · सूत्र-वर्गीकरणम्',
        sectionTitleEnglish: 'Section A · Sūtra Classification Matrix',
        instructions: 'Classify the 6 traditional types of sūtras with their computational equivalents.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws5-1-q1',
            questionNumber: '1',
            promptDevanagari: 'षड्विध-सूत्राणां नामानि लिखत ।',
            promptEnglish: 'Name the 6 traditional categories of sūtras: "संज्ञा च परिभाषा च..."',
            marks: 3,
            optionsOrHints: ['संज्ञा, परिभाषा, विधि, नियम, अतिदेश, अधिकार', 'प्रथमा, द्वितीया, तृतीया', 'कण्ठ, तालु, मूर्धा'],
            answer: '१. संज्ञा (Definitions) २. परिभाषा (Meta-rules) ३. विधिः (Operational rewrite) ४. नियमः (Restriction) ५. अतिदेशः (Inheritance/Analogy) ६. अधिकारः (Scope heading)',
            explanation: 'The famous verse: संज्ञा च परिभाषा च विधिर्नियम एव च । अतिदेशोऽधिकारश्च षड्विधं सूत्रलक्षणम् ॥'
          },
          {
            id: 'ws5-1-q2',
            questionNumber: '2',
            promptDevanagari: 'अष्टाध्याय्यां कति सूत्राणि सन्ति?',
            promptEnglish: 'How many total algebraic sūtras comprise the Aṣṭādhyāyī of Pāṇini?',
            marks: 2,
            optionsOrHints: ['~1,000', '3,959 (or ~4,000)', '~10,000', '100'],
            answer: '३,९५९ सूत्राणि (Divided across 8 Adhyāyas of 4 Pādas each = 32 quarters)',
            explanation: 'Generates the entire infinite Sanskrit language in fewer than 4,000 concise formulas.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · "इको यणचि" सूत्र-प्रयोगः',
        sectionTitleEnglish: 'Section B · Algorithmic Tracing of Sūtra 6.1.77 (इको यणचि)',
        instructions: 'Deconstruct the production rule: इक् (i, u, ṛ, ḷ) + अच् (vowel) → यण् (y, v, r, l).',
        totalMarks: 8,
        questions: [
          {
            id: 'ws5-1-q3',
            questionNumber: '3',
            promptDevanagari: '"इको यणचि" सूत्रेण "इति + आदि" इत्यस्य संधानं दर्शयत ।',
            promptEnglish: 'Trace the step-by-step compilation of "iti + ādi" using sūtra 6.1.77.',
            marks: 8,
            answer: 'Step 1: Input "इति + आदि". End sound of word 1 is "इ" (a member of Pratyāhāra इक्). Step 2: Next sound is "आ" (a member of Pratyāhāra अच् = any vowel). Step 3: By 6.1.77, "इ" mutates into "य्" (the palatal member of यण्). Result: इत् + य् + आदि = इत्यादि (ityādi).',
            explanation: 'A pure algorithmic state-machine transformation without human guesswork.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · विप्रतिषेधे परं कार्यम् (Conflict Resolution)',
        sectionTitleEnglish: 'Section C · Conflict Resolution & Operator Precedence',
        instructions: 'Analyze Pāṇini’s deterministic meta-rule for resolving rule conflicts.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws5-1-q4',
            questionNumber: '4',
            promptDevanagari: 'यदा द्वयोः सूत्रयोः युगपत् प्राप्तिः भवति, तदा किं भवति?',
            promptEnglish: 'When two mutually conflicting rules apply simultaneously to the same input string, how does Pāṇini resolve the ambiguity?',
            marks: 7,
            answer: 'By sūtra 1.4.2 "विप्रतिषेधे परं कार्यम्": In an equal conflict, the rule that appears later (or is more specifically scoped / apavāda) takes precedence.',
            explanation: 'Anticipated compiler conflict-resolution and operator precedence hierarchies.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: Backus-Naur Form',
        sectionTitleEnglish: 'Section D · Thinking Connection: Formal Grammars',
        instructions: 'Reflect on Donald Knuth’s discovery regarding Pāṇini and modern programming.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws5-1-q5',
            questionNumber: '5',
            promptDevanagari: 'डोनाल्ड-क्नुथ् महोदयेन पाणिनि-सूत्राणां विषये किं प्रतिपादितम्?',
            promptEnglish: 'Why did computer science legend Donald Knuth state that BNF (Backus-Naur Form) should rightly be named "Pāṇini-Backus Form"?',
            marks: 5,
            answer: 'Because Pāṇini invented the entire formalism of context-free generative grammars, auxiliary marker tags (it-saṁjñā), shorthand tokens, and recursion over 2,400 years before modern computer scientists developed programming language compilers.',
            explanation: 'Recognizes Sanskrit grammar as the historical fountainhead of computer science theory.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'संक्षिप्तता (Brevity) एवं पूर्णता (Completeness) — अनयोः समन्वयः कथं सम्भवः?',
      promptEnglish: 'Grammarians said: "Saving even half a syllable is celebrated like the birth of a child." How did ancient masters balance extreme brevity with zero ambiguity?',
      guidingQuestions: [
        'Notice how rambling, verbose instructions create confusion and bugs.',
        'How does training in concise formulas clarify everyday human communication?'
      ],
      modelReflection: 'To compress an idea without losing precision forces the thinker to discard all vanity, fluff, and superficial ornamentation. The mind learns to operate like diamond: transparent, unyielding, and reflecting pure light.'
    }
  },

  // =========================================================================
  // MODULE 5, Lesson 5.3: Kaṭapayādi Alphanumeric Encryption
  // =========================================================================
  'c-5-3': {
    lessonId: 'c-5-3',
    lessonNumber: '5.3',
    worksheetTitleDevanagari: 'कटपयादि-संख्या-पद्धतिः एवं गूढ-सङ्ख्या-विज्ञानम्',
    worksheetTitleEnglish: 'Kaṭapayādi Alphanumeric Hashing & Astronomical Ciphers',
    subtitle: 'Hiding trigonometric constants and Pi to 32 decimals inside sacred poetry',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the Kaṭapayādi cipher key: कादिर्नव टादिर्नव पादिपञ्चक यद्यष्टकः.',
      'Apply the fundamental reversal rule: अङ्कानां वामतो गतिः (Numbers proceed leftwards).',
      'Decode mathematical data hidden within devotional Sanskrit stanzas.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · कटपयादि-कुञ्चिका (Master Cipher Key)',
        sectionTitleEnglish: 'Section A · Master Decoding Cipher Key',
        instructions: 'Match consonants to their exact decimal digits (0 to 9).',
        totalMarks: 5,
        questions: [
          {
            id: 'ws5-3-q1',
            questionNumber: '1',
            promptDevanagari: 'एते वर्णाः कान् अङ्कान् सूचयन्ति? (क) क, ट, प, य (ख) घ, ढ, भ, व',
            promptEnglish: 'What numerical digits do these consonants represent? (a) ka, ṭa, pa, ya (b) gha, ḍha, bha, va',
            marks: 3,
            optionsOrHints: ['(a) 1, 1, 1, 1 (b) 4, 4, 4, 4', '(a) 1, 2, 3, 4 (b) 5, 6, 7, 8'],
            answer: '(a) All represent digit 1 (कादिर्नव, टादिर्नव, पादिपञ्चक, यद्यष्टकः) (b) All represent digit 4',
            explanation: 'The 4 parallel series: Ka=1, Ṭa=1, Pa=1, Ya=1; Gha=4, Ḍha=4, Bha=4, Va=4.'
          },
          {
            id: 'ws5-3-q2',
            questionNumber: '2',
            promptDevanagari: '"अङ्कानां वामतो गतिः" इत्यस्य कः नियमः?',
            promptEnglish: 'What is the golden rule of number extraction under "Aṅkānāṁ vāmato gatiḥ"?',
            marks: 2,
            optionsOrHints: ['Numbers are read from right to left (first syllable = units digit)', 'Numbers are read from top to bottom', 'Numbers are inverted', 'Multiplied by 10'],
            answer: 'The first spoken syllable encodes the units place (1s), second encodes tens (10s), moving backwards towards higher powers.',
            explanation: 'Crucial for decoding dates and mathematical series in astronomical texts.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · शब्दस्य सङ्ख्या-रूपान्तरणम्',
        sectionTitleEnglish: 'Section B · Word-to-Number Decoding Drill',
        instructions: 'Extract the numerical value from the given classical tokens.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws5-3-q3',
            questionNumber: '3',
            promptDevanagari: '"भवानी" इति शब्दस्य कटपयादि-संख्या का?',
            promptEnglish: 'What decimal number is encoded in the sacred name "भवानी" (Bhavānī)?',
            marks: 4,
            answer: 'भ = 4, व = 4, न = 0 (or 5 under n-a series). In reverse order (वामतो गतिः): 440 or astronomical year.',
            explanation: 'Shows how names of deities served as memorable hashes for dates.'
          },
          {
            id: 'ws5-3-q4',
            questionNumber: '4',
            promptDevanagari: '"गोपीभाग्यमधुव्रात..." इति श्लोके कस्य गणितीय-मानस्य सङ्केतः अस्ति?',
            promptEnglish: 'Which universal mathematical constant is encoded to 32 decimal places in the verse "Gopībhāgyamadhuvrāta..."?',
            marks: 4,
            optionsOrHints: ['Pi (π = 3.14159265...)', 'Euler’s number (e)', 'Golden Ratio (φ)', 'Speed of light'],
            answer: 'पाई-मानम् (Value of Pi = 3.1415926535897932384626433832792...)',
            explanation: 'Composed by Kerala mathematicians to transmit the ratio of circumference to diameter through oral chanting.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · गूढ-सङ्ख्या-रचना (Encoding Exercise)',
        sectionTitleEnglish: 'Section C · Cipher Encoding Exercise',
        instructions: 'Encode the year 2026 into a meaningful Sanskrit word using Kaṭapayādi.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws5-3-q5',
            questionNumber: '5',
            promptDevanagari: '"२०२६" (2026) इति संवत्सरं कटपयादि-नियमेन शब्दे परिवर्त्य लिखत ।',
            promptEnglish: 'Construct a Sanskrit phrase or word that encodes the digits 2-0-2-6 (remembering vāmato gatiḥ: units 6, tens 2, hundreds 0, thousands 2).',
            marks: 7,
            answer: 'Units 6 (c/cha/th/d/śa), Tens 2 (kh/ṭh/r), Hundreds 0 (ñ/n/vowels), Thousands 2 (kh/ṭh/r). Example: "शारदान" or similar phoneme set where consonants match: 6-2-0-2 → 2026.',
            explanation: 'Hands-on practice constructing an authentic mnemonic hash.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: Steganography',
        sectionTitleEnglish: 'Section D · Thinking Connection: Data Hiding',
        instructions: 'Connect ancient mnemonic systems to modern cybersecurity.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws5-3-q6',
            questionNumber: '6',
            promptDevanagari: 'कथं कटपयादि-पद्धतिः आधुनिक-स्टेगानोग्राफी (Steganography) इव कार्यं करोति?',
            promptEnglish: 'How does Kaṭapayādi anticipate modern steganography (hiding secret data payload inside an aesthetic carrier)?',
            marks: 5,
            answer: 'Steganography hides sensitive payload bits inside an innocuous carrier (like audio or image pixels). In Kaṭapayādi, the aesthetic carrier is a devotional prayer recited in temples, while the hidden payload is trigonometric sine tables and planetary orbits, preserving science through turbulent centuries.',
            explanation: 'Highlights the cultural resilience engineered into oral Sanskrit traditions.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'गणितस्य सौन्दर्यस्य च मेलनम् — अत्र कः सन्देशः अस्ति?',
      promptEnglish: 'What does it say about a culture when its most advanced astronomical equations are written as love poems to the divine?',
      guidingQuestions: [
        'Why does modern education artificially separate art/poetry from science/math?',
        'How does integrating beauty with logic make learning joyful rather than dry?'
      ],
      modelReflection: 'When calculation is divorced from wonder, math becomes a mechanical chore. In the Indian scientific tradition, numbers were seen as the luminous thoughts of the cosmos, deserving of poetry, melody, and spiritual reverence.'
    }
  },

  // =========================================================================
  // MODULE 6: The Contemplative Mind (दर्शनम्)
  // =========================================================================
  'c-6-2': {
    lessonId: 'c-6-2',
    lessonNumber: '6.2',
    worksheetTitleDevanagari: 'श्रीमद्भगवद्गीता २.४७ व्याकरण-पदच्छेद-पत्रम्',
    worksheetTitleEnglish: 'Bhagavad Gītā 2.47 & 2.48 Word-by-Word Grammatical Parsing',
    subtitle: 'Direct unmediated encounter with the psychological masterpiece of Karma Yoga',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Dissect Gītā 2.47 into its 12 constituent grammatical tokens.',
      'Understand the precise legal/psychological meaning of "Adhikāra" (jurisdiction vs entitlement).',
      'Distinguish action from anxiety by decoupling effort from the fruit (Phala).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · पदच्छेदः एवं सन्धि-विच्छेदः',
        sectionTitleEnglish: 'Section A · Word Splitting & Sandhi Breakdown',
        instructions: 'Split the sandhi compounds of the famous verse into independent words.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws6-2-q1',
            questionNumber: '1',
            promptDevanagari: 'पदच्छेदं कुरुत: "कर्मण्येवाधिकारस्ते"',
            promptEnglish: 'Split the sandhi of the first quarter: "कर्मण्येवाधिकारस्ते"',
            marks: 3,
            optionsOrHints: ['कर्मणि + एव + अधिकारः + ते', 'कर्मण्य + एव + अधिकार + स्ते', 'कर्मण + अधिकारस्ते'],
            answer: 'कर्मणि + एव + अधिकारः + ते (karmaṇi + eva + adhikāraḥ + te)',
            explanation: 'कर्मणि (Locative singular in action) + एव (alone) + अधिकारः (standing/jurisdiction) + ते (to you / your).'
          },
          {
            id: 'ws6-2-q2',
            questionNumber: '2',
            promptDevanagari: 'पदच्छेदं कुरुत: "सङ्गोऽस्त्वकर्मणि"',
            promptEnglish: 'Split the sandhi of the final quarter: "मा ते सङ्गोऽस्त्वकर्मणि"',
            marks: 2,
            optionsOrHints: ['मा + ते + सङ्गः + अस्तु + अकर्मणि', 'माते + सङ्गोस्तु + अकर्मणि', 'मा + ते + सङ्गम् + अस्तु + कर्मणि'],
            answer: 'मा + ते + सङ्गः + अस्तु + अकर्मणि (mā + te + saṅgaḥ + astu + akarmaṇi)',
            explanation: 'सङ्गः (attachment) + अस्तु (let there be) + अकर्मणि (in lethargy / inaction).'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · विभक्ति-विश्लेषणम्',
        sectionTitleEnglish: 'Section B · Case & Verb Form Analysis',
        instructions: 'Analyze the grammatical case and number of key words in Gītā 2.47.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws6-2-q3',
            questionNumber: '3',
            promptDevanagari: '"कर्मणि" एवं "फलेषु" अनयोः पदयोः का विभक्तिः किं च वचनम्?',
            promptEnglish: 'State the exact case (विभक्तिः) and number (वचनम्) of "कर्मणि" and "फलेषु".',
            marks: 4,
            answer: 'कर्मणि = सप्तमी विभक्तिः, एकवचनम् (7th Locative Singular: in action); फलेषु = सप्तमी विभक्तिः, बहुवचनम् (7th Locative Plural: in fruits / results)',
            explanation: 'Both denote location/sphere of operation: your standing is inside action, never inside the fruits.'
          },
          {
            id: 'ws6-2-q4',
            questionNumber: '4',
            promptDevanagari: '"अधिकारः" इत्यस्य कः वास्तविकः अर्थः?',
            promptEnglish: 'What does "अधिकारः" mean here? Why is translating it as "right" or "entitlement" misleading?',
            marks: 4,
            answer: 'It means "Jurisdiction / Operational Sphere / Duty". You have operational standing over what you do, but zero jurisdiction over how the outer universe responds.',
            explanation: 'A judge has jurisdiction in their courtroom; you have jurisdiction over your effort alone.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · अन्वय-रचना एवं अनुवादः',
        sectionTitleEnglish: 'Section C · Prose Word-Order (Anvaya) & Translation',
        instructions: 'Arrange the poetic verse into straightforward prose order.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws6-2-q5',
            questionNumber: '5',
            promptDevanagari: 'गीता २.४७ श्लोकस्य अन्वयं लिखत ।',
            promptEnglish: 'Provide the complete prose Anvaya of Gītā 2.47.',
            marks: 7,
            answer: 'ते (Your) अधिकारः (jurisdiction is) कर्मणि एव (in action alone), फलेषु कदाचन मा (never in the fruits); कर्मफलहेतुः मा भूः (do not become motivated by the fruits); ते सङ्गः अकर्मणि मा अस्तु (nor let your attachment be to inaction).',
            explanation: 'The clean four-part logical formulation of optimal cognitive focus.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: Locus of Control',
        sectionTitleEnglish: 'Section D · Thinking Connection: Cognitive Freedom',
        instructions: 'Bridge ancient wisdom with modern psychological health.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws6-2-q6',
            questionNumber: '6',
            promptDevanagari: 'कथं गीता २.४७ श्लोकः आधुनिक-मनोविज्ञानस्य "Internal Locus of Control" सिद्धान्तं पुष्टयति?',
            promptEnglish: 'How does Krishna’s teaching in 2.47 anticipate modern CBT (Cognitive Behavioral Therapy) and the Stoic Dichotomy of Control?',
            marks: 5,
            answer: 'Psychological anxiety stems from trying to control things outside your direct agency (the fruits). By ruthlessly confining your focus exclusively to the input effort (कर्मणि एव) while surrendering external outcomes, performance anxiety disappears and peak flow is unlocked.',
            explanation: 'The ultimate antidote to burnout, perfectionism, and paralysis.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'मा ते सङ्गोऽस्त्वकर्मणि — अकर्मण्यतायाः (Inaction) भयं किमर्थम्?',
      promptEnglish: 'Why does Krishna add the fourth condition: "Nor let your attachment be to inaction (Akarmaṇi)"?',
      guidingQuestions: [
        'When people hear "don’t expect results", they often say "then why should I work at all?"',
        'How is cynical apathy just another hidden form of outcome-obsession?'
      ],
      modelReflection: 'Refusing to act out of cynicism or fear of failure is not detachment; it is bruised ego in disguise. True mastery means acting with 100% passion and precision while keeping the mind free as space.'
    }
  },

  // =========================================================================
  // MODULE 6, Lesson 6.4: Capstone End-to-End Verse Analysis
  // =========================================================================
  'c-6-4': {
    lessonId: 'c-6-4',
    lessonNumber: '6.4',
    worksheetTitleDevanagari: 'महा-समन्वयः · पूर्ण-श्लोक-मीमांसा एवं प्रमाण-पत्रम्',
    worksheetTitleEnglish: 'Course Capstone: 5-Dimensional End-to-End Verse Analysis',
    subtitle: 'Dissecting the immortal Bṛhadāraṇyaka Upaniṣad invocation across sound, script, grammar, syntax, and realization',
    maxMarks: 25,
    durationMinutes: 40,
    learningOutcomes: [
      'Execute a complete 5-pillar analysis: ध्वनिः (Sound), लिपिः (Script), व्याकरणम् (Morphology), वाक्यम् (Syntax), चिन्तनम् (Realization).',
      'Parse the Ablative case progression: असतः → तमसः → मृत्योः.',
      'Attain the Gurukul Master Certificate of Completion for Sanskrit as a Way of Thinking.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · ध्वनेः लिपेः च विश्लेषणम्',
        sectionTitleEnglish: 'Section A · Acoustic & Orthographic Analysis',
        instructions: 'Analyze the sound landmarks and script ligatures of the invocation.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws6-4-q1',
            questionNumber: '1',
            promptDevanagari: '"मृत्योर्माऽमृतं गमय" इत्यत्र अवग्रह-चिह्नस्य ( ऽ ) कः सन्धि-नियमः?',
            promptEnglish: 'What Sandhi rule causes the Avagraha ( ऽ ) mark in "मृत्योर्माऽमृतं गमय"?',
            marks: 3,
            optionsOrHints: ['पूर्वरूप-सन्धिः (एङ् पदान्तादति: 6.1.109)', 'दीर्घ-सन्धिः', 'वृद्धि-सन्धिः'],
            answer: 'पूर्वरूप-सन्धिः (Pūrvarūpa Sandhi via Pāṇini 6.1.109: mā + amṛtam → mā’mṛtam)',
            explanation: 'The vowel "a" is absorbed into the preceding vowel, leaving an apostrophe-like trace (Avagraha ऽ).'
          },
          {
            id: 'ws6-4-q2',
            questionNumber: '2',
            promptDevanagari: 'अस्मिन् मन्त्रे कति संयुक्ताक्षराणि सन्ति?',
            promptEnglish: 'Identify the prominent conjunct ligatures in: अस॑तो॒ मा सद्ग॑मय॒ । तम॑सो॒ मा ज्योति॒र्गम॑य॒ । मृ॒त्योर्माऽमृ॑तं॒ गम॑य॒ ॥',
            marks: 2,
            answer: 'द्ग (द्+ग in सद्गमय), र्ग (र्+ग in ज्योतिर्गमय), त्य (त्+य in मृत्योः), र्म (र्+म in मृत्योर्मा)',
            explanation: 'Highlights how consonant collisions are visually resolved through dynamic conjunct rendering.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · व्याकरण-पदानि (Ablative Progression)',
        sectionTitleEnglish: 'Section B · Grammatical Morphology & The Ablative Triad',
        instructions: 'Analyze the grammatical case progression from untruth to darkness to death.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws6-4-q3',
            questionNumber: '3',
            promptDevanagari: '"असतः", "तमसः", "मृत्योः" — एतेषां त्रयाणां पदानां का विभक्तिः किं च कारकम्?',
            promptEnglish: 'What grammatical case and Kāraka role unite the three departure points: असतः, तमसः, and मृत्योः?',
            marks: 4,
            answer: 'पञ्चमी विभक्तिः, एकवचनम् (अपादान-कारकम् = Source / Point of departure: from untruth, from darkness, from mortality)',
            explanation: 'All three nouns use Case 5 (Ablative), indicating the baseline from which conscious evolution departs.'
          },
          {
            id: 'ws6-4-q4',
            questionNumber: '4',
            promptDevanagari: '"गमय" इति क्रिया-पदस्य कः लकारः कश्च धातुः?',
            promptEnglish: 'Analyze the repeated verb "गमय": what is its root, causative affix, and Lakāra mood?',
            marks: 4,
            answer: '√गम् धातुः + णिच् प्रत्ययः (Causative: cause to go / lead) + लोट्-लकारः, मध्यम-पुरुषः, एकवचनम् (Imperative prayer: "Lead Thou me!")',
            explanation: 'A poignant second-person imperative prayer directed to the indwelling divine light.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · पदच्छेदः एवं पूर्ण-अन्वयः',
        sectionTitleEnglish: 'Section C · Complete Anvaya & Syntactic Synthesis',
        instructions: 'Write the complete word-by-word prose syntax for all three lines of the invocation.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws6-4-q5',
            questionNumber: '5',
            promptDevanagari: 'बृहदारण्यकोपनिषदः अस्य मन्त्रस्य पूर्णम् अन्वयं लिखत ।',
            promptEnglish: 'Provide the complete prose Anvaya of the Bṛhadāraṇyaka Upaniṣad invocation.',
            marks: 7,
            answer: 'हे प्रभो! मां (Me) असतः (from the unreal/untruth) सत् (to the real/truth) गमय (lead); तमसः (from darkness/ignorance) ज्योतिः (to luminous wisdom) गमय (lead); मृत्योः (from mortality/limitation) अमृतं (to eternal deathless being) गमय (lead). ॐ शान्तिः शान्तिः शान्तिः ॥',
            explanation: 'The three progressive ascending octaves of human spiritual yearning.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · महा-समन्वयः: विज्ञानं वेदान्तश्च',
        sectionTitleEnglish: 'Section D · Capstone Thinking Connection: Synthesis of Science and Spirit',
        instructions: 'Synthesize your journey through this course in a culminating reflection.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws6-4-q6',
            questionNumber: '6',
            promptDevanagari: 'कथं संस्कृतं "वैज्ञानिक-चिन्तनस्य" तथा "आत्म-चिन्तनस्य" च समन्वितं सेतुभूतं माध्यमं वर्तते?',
            promptEnglish: 'Synthesize: How does Sanskrit prove that mathematical precision does not kill poetry, and algorithms do not destroy the sacred?',
            marks: 5,
            answer: 'Sanskrit shows that true science and true spirituality share the identical core: ruthless fidelity to truth without bias. The same mental apparatus trained to execute Pāṇini’s rewrite compiler and compute Vedic mathematics is the calibrated instrument that sits in silent witness meditation observing consciousness itself.',
            explanation: 'The grand synthesis of the 6 modules of Sanskrit as a Way of Thinking.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'असतो मा सद्गमय — अस्मिन् मन्त्रे "मा" (मां प्रति) कः अस्ति?',
      promptEnglish: 'In the prayer "Lead ME from darkness to light", who is this "Me" (मा)?',
      guidingQuestions: [
        'Is it the transient ego, the physical body, or the witnessing awareness?',
        'If the Self is already immortal (अमृत), what is being transformed?'
      ],
      modelReflection: 'The prayer is not asking an external deity to transport a body from place A to place B. It is the recognition that our attention is currently entangled in transient illusions (असत्). To be led to Amṛta is to awaken to the light that was never born and can never die.'
    }
  }
};

/**
 * Fallback generator for lessons that don't have a specialized custom worksheet yet.
 * Synthesizes a structured 4-section worksheet using the lesson's rich metadata.
 */
export function getCourseLessonWorksheet(
  lessonId: string,
  lessonNumber: string,
  titleDevanagari: string,
  titleEnglish: string,
  ideaHeading: string,
  ruleTitle: string,
  quickQuizPrompt: string,
  quickQuizOptions: string[],
  quickQuizCorrectIndex: number,
  quickQuizExplanation: string,
  bridgeExplanation: string
): CourseLessonWorksheet {
  if (COURSE_LESSON_WORKSHEETS[lessonId]) {
    return COURSE_LESSON_WORKSHEETS[lessonId];
  }

  // Generative fallback with full 4 sections
  return {
    lessonId,
    lessonNumber,
    worksheetTitleDevanagari: `${titleDevanagari} · अध्ययन-अभ्यास-पत्रम्`,
    worksheetTitleEnglish: `Lesson ${lessonNumber} Official Study Worksheet & Answer Key`,
    subtitle: `${titleEnglish} — Complete Phonetic, Grammatical and Contemplative Practice`,
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      `Master the core mental model: ${ideaHeading}`,
      `Apply the structural rule mechanics of ${ruleTitle}`,
      `Synthesize the conceptual bridge between Sanskrit thinking and modern cognitive science`
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · ध्वनि-वर्ण-अभ्यासः',
        sectionTitleEnglish: 'Section A · Acoustic & Phonetic Identification Drill',
        instructions: 'Pronounce the audio terms aloud and identify their phonetic articulators and duration.',
        totalMarks: 5,
        questions: [
          {
            id: `${lessonId}-q1`,
            questionNumber: '1',
            promptDevanagari: 'अस्मिन् पाठे निर्दिष्टानां ध्वनीनाम् उच्चारण-स्थानं काल-मानं च लिखत ।',
            promptEnglish: `Identify the vocal tract place of articulation and mātrā length for the key terms in Lesson ${lessonNumber}.`,
            marks: 3,
            answer: 'Refer to Lesson Sound Section: verify Kaṇṭha/Tālu/Mūrdhan placement and ensure Dīrgha vowels receive full 2 beats.',
            explanation: 'Acoustic attention grounds abstract conceptual learning into physical vocal resonance.'
          },
          {
            id: `${lessonId}-q2`,
            questionNumber: '2',
            promptDevanagari: 'वर्ण-विच्छेदं कुरुत ।',
            promptEnglish: `Break down the primary Sanskrit term of this lesson (${titleDevanagari}) into atomic consonants and vowels.`,
            marks: 2,
            answer: 'Perform letter-by-letter separation identifying pure consonants (halanta) and vowel attachments.',
            explanation: 'Syllabic parsing reveals the exact physical construction of the word.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · विधि-विश्लेषणम् एवं सूत्र-प्रयोगः',
        sectionTitleEnglish: 'Section B · Rule Mechanics & Formula Analysis',
        instructions: `Apply the morphological rules of ${ruleTitle} to solve the following parsing question.`,
        totalMarks: 8,
        questions: [
          {
            id: `${lessonId}-q3`,
            questionNumber: '3',
            promptDevanagari: quickQuizPrompt,
            promptEnglish: quickQuizPrompt,
            marks: 8,
            optionsOrHints: quickQuizOptions,
            answer: quickQuizOptions[quickQuizCorrectIndex],
            explanation: quickQuizExplanation
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · वाक्य-रचना एवं व्यावहारिक-प्रयोगः',
        sectionTitleEnglish: 'Section C · Applied Syntax & Problem Solving',
        instructions: 'Apply the lesson concept to analyze or construct a valid communicative statement.',
        totalMarks: 7,
        questions: [
          {
            id: `${lessonId}-q4`,
            questionNumber: '4',
            promptDevanagari: 'अस्य नियमस्य आधारेण एकं मौलिकं वाक्यं रचयत ।',
            promptEnglish: `Using the rules learned in Lesson ${lessonNumber} (${ruleTitle}), construct a clean, unambiguous Sanskrit example or parse its grammatical components.`,
            marks: 7,
            answer: 'Sample verified solution applying proper subject-verb agreement or rule transformation as defined in lesson tables.',
            explanation: 'Practical application cements theoretical grammar into living reflex.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Write a 3-sentence synthesis connecting ancient methodology with modern insight.',
        totalMarks: 5,
        questions: [
          {
            id: `${lessonId}-q5`,
            questionNumber: '5',
            promptDevanagari: 'कथम् अयं पाठः अस्माकं चिन्तन-प्रणालीं परिष्करोति?',
            promptEnglish: `In your study journal, answer: "${bridgeExplanation}"`,
            marks: 5,
            answer: bridgeExplanation,
            explanation: 'Reflective synthesis bridges linguistic structure to metacognition.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: `${titleDevanagari} — अस्य पाठस्य आध्यात्मिकं महत्त्वं किम्?`,
      promptEnglish: `How does mastering "${titleEnglish}" cultivate inner clarity and discernment (Viveka)?`,
      guidingQuestions: [
        'How does precision in speech reflect precision in conscious thinking?',
        'In what way does this rule eliminate mental clutter and distraction?'
      ],
      modelReflection: 'Every rule of Sanskrit grammar is an exercise in mental hygiene. When you refuse lazy, ambiguous speech, your inner thoughts naturally become sharp, truthful, and serene.'
    }
  };
}
