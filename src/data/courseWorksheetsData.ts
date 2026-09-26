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

  'c-1-2': {
    lessonId: 'c-1-2',
    lessonNumber: '1.2',
    worksheetTitleDevanagari: 'पञ्च उच्चारण-स्थानानि एवं वर्ण-विभाजनम्',
    worksheetTitleEnglish: 'The Five Places of Articulation (Śikṣā) & Acoustic Zones',
    subtitle: 'Mapping the vocal tract as a five-stage geometric acoustic wave resonator',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Map the 5 anatomical contact points: Kaṇṭha, Tālu, Mūrdhan, Danta, and Oṣṭha.',
      'Apply the classical phonetics sutra: "अकुहविसर्जनीयानां कण्ठः" and "इचुयशानां तालु".',
      'Categorize complex hybrid vowels (कण्ठतालव्य: ए, ऐ and कण्ठौष्ठ्य: ओ, औ).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · स्थान-प्रत्यभिज्ञानम्',
        sectionTitleEnglish: 'Section A · Primary Articulation Zone Identification',
        instructions: 'Match each given sound with its primary physiological place of articulation.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-2-q1',
            questionNumber: '1',
            promptDevanagari: 'वर्णानां तेषां स्थानेन सह मेलनं कुरुत: (क) क्, (ख) च्, (ग) ट्, (घ) त्, (ङ) प्',
            promptEnglish: 'Identify the exact Sthāna (place) for the lead plosives: (a) k, (b) c, (c) ṭ, (d) t, (e) p.',
            marks: 2,
            optionsOrHints: ['कण्ठ, तालु, मूर्धा, दन्त, ओष्ठ', 'तालु, कण्ठ, दन्त, ओष्ठ, मूर्धा', 'ओष्ठ, दन्त, कण्ठ, तालु, मूर्धा'],
            answer: 'क = कण्ठ (Throat), च = तालु (Palate), ट = मूर्धा (Hard Roof), त = दन्त (Teeth), प = ओष्ठ (Lips)',
            explanation: 'The order reflects the outward linear progression of breath from larynx to lips.'
          },
          {
            id: 'ws1-2-q2',
            questionNumber: '2',
            promptDevanagari: 'द्विस्थानजाः वर्णाः के सन्ति?',
            promptEnglish: 'Which vowels are produced through compound articulation involving two distinct zones simultaneously?',
            marks: 3,
            optionsOrHints: ['अ, इ, उ', 'ए, ऐ (कण्ठतालु) एवं ओ, औ (कण्ठौष्ठम्)', 'ऋ, ऌ', 'अं, अः'],
            answer: 'ए, ऐ (कण्ठ-तालव्य) एवं ओ, औ (कण्ठ-ओष्ठ्य)',
            explanation: 'Since "e" is born of a (throat) + i (palate), it resonates in both Kaṇṭha and Tālu. Similarly, "o" (a + u) combines throat and lips.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · शिक्षा-सूत्र-विश्लेषणम्',
        sectionTitleEnglish: 'Section B · Phonetic Sūtra Parsing & Mechanics',
        instructions: 'Explain the scope and sound inventory governed by classical Pāṇinian phonetic sūtras.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws1-2-q3',
            questionNumber: '3',
            promptDevanagari: 'सूत्रार्थं लिखत: "ऋटुरषाणां मूर्धा"',
            promptEnglish: 'Parse and explain the rule "ṛṭuraṣāṇāṁ mūrdhā". Which exact sounds belong to the Mūrdhanya class?',
            marks: 4,
            answer: 'ऋ, ॠ, ट-वर्ग (ट्, ठ्, ड्, ढ्, ण्), र्, and ष् (मूर्धन्य-षकारः)',
            explanation: 'All these sounds require the tip of the tongue to curl back and touch the domed ceiling of the palate.'
          },
          {
            id: 'ws1-2-q4',
            questionNumber: '4',
            promptDevanagari: '"वकारस्य दन्तोष्ठम्" — अस्य वर्णस्य उच्चारण-विधिः का?',
            promptEnglish: 'Explain the unique articulation of the semivowel "va" as codified in "vakarāsya dantauṣṭham".',
            marks: 4,
            optionsOrHints: ['Upper teeth lightly touch the lower lip', 'Both lips close firmly', 'Tongue touches front teeth only', 'Breath flows purely through the throat'],
            answer: 'ऊर्ध्वदन्तैः सह अधरोष्ठस्य संस्पर्शः (Upper teeth gently touch the lower lip)',
            explanation: 'Unlike "ba" (pure bilabial), "va" is a labiodental glide where breath escapes between the upper teeth and lower lip.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · वर्ण-वर्गीकरण-तालिका',
        sectionTitleEnglish: 'Section C · Applied Classification & Matrix Drill',
        instructions: 'Sort the following sounds into their correct physiological categories: ग, छ, ढ, द, भ, ह, श, ष्',
        totalMarks: 7,
        questions: [
          {
            id: 'ws1-2-q5',
            questionNumber: '5',
            promptDevanagari: 'प्रदत्त-वर्णानां स्थानानुसारं वर्गीकरणं कुरुत ।',
            promptEnglish: 'Assign each of the 8 letters (ग, छ, ढ, द, भ, ह, श, ष्) to its exact anatomical zone.',
            marks: 7,
            answer: 'कण्ठ्य: ग, ह | तालव्य: छ, श | मूर्धन्य: ढ, ष | दन्त्य: द | ओष्ठ्य: भ',
            explanation: 'ग (throat velar), छ (palatal stop), ढ (retroflex aspirate), द (dental soft), भ (labial aspirate), ह (glottal fricative), श (palatal sibilant), ष (retroflex sibilant).'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Write a concise reflection linking phonetic positioning to mental clarity.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-2-q6',
            questionNumber: '6',
            promptDevanagari: 'उच्चारण-स्थानानां ज्ञानेन चित्तस्य एकाग्रता कथं वर्धते?',
            promptEnglish: 'How does paying conscious attention to the exact physical contact point of the tongue eliminate mental distraction during study?',
            marks: 5,
            answer: 'Directing awareness to micro-sensations in the oral cavity acts as somatic neurofeedback. It anchors attention in the present moment, converting mechanical speech into a mindful contemplation of sound.',
            explanation: 'Acoustic mindfulness forces the mind to coordinate proprioceptive muscle control with intentional breath.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'नादस्य हृदयात् ओष्ठपर्यन्तं यात्रा — अस्याः किं तात्पर्यम्?',
      promptEnglish: 'What does the outward march of sound from the deep throat to the lips symbolize in our conscious living?',
      guidingQuestions: [
        'Notice how sound begins in unmanifest darkness (throat) and emerges into clear daylight (lips).',
        'How should an idea be refined internally before it is voiced into the world?'
      ],
      modelReflection: 'Sound travels in a straight line from the deep interior of our being out into society. The five places of articulation remind us to purify thought at its origin before releasing it through our lips.'
    }
  },

  'c-1-3': {
    lessonId: 'c-1-3',
    lessonNumber: '1.3',
    worksheetTitleDevanagari: 'ह्रस्व-दीर्घ-प्लुताः स्वराः एवं मात्रा-गणना',
    worksheetTitleEnglish: 'Vowel Timing: Short (Hrasva), Long (Dīrgha) & Prolated (Pluta)',
    subtitle: 'The physics of biological time measurement through acoustic mātrās',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Define the mātrā as a natural temporal unit (1 blink / heart cycle / rooster call).',
      'Distinguish Hrasva (१ मात्रा), Dīrgha (२ मात्रा), and Pluta (३ मात्रा) vowels.',
      'Identify Sandhyakṣaras (composite diphthongs: ए, ऐ, ओ, औ) and their permanent long status.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · मात्रा-परिमाण-बोधः',
        sectionTitleEnglish: 'Section A · Temporal Duration & Mātrā Units',
        instructions: 'State the exact mathematical time duration (mātrā) assigned to each vowel class.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-3-q1',
            questionNumber: '1',
            promptDevanagari: 'ह्रस्व-दीर्घ-प्लुतानां मात्रा-संख्या का?',
            promptEnglish: 'What are the exact mātrā values for Hrasva, Dīrgha, and Pluta vowels?',
            marks: 2,
            optionsOrHints: ['ह्रस्व = १, दीर्घ = २, प्लुत = ३', 'ह्रस्व = २, दीर्घ = ४, प्लुत = ६', 'ह्रस्व = ०.५, दीर्घ = १, प्लुत = २'],
            answer: 'ह्रस्वः एकमात्रः, दीर्घः द्विमात्रः, प्लुतः त्रिमात्रः (१, २, ३)',
            explanation: 'Pāṇini defines 1 mātrā as the duration of a natural eye-blink (निमेष) or lightning flash.'
          },
          {
            id: 'ws1-3-q2',
            questionNumber: '2',
            promptDevanagari: 'केषां स्वराणां ह्रस्व-रूपं न विद्यते?',
            promptEnglish: 'Which Sanskrit vowels are fundamentally composite and therefore never exist in a short (Hrasva) form?',
            marks: 3,
            optionsOrHints: ['अ, इ, उ', 'ए, ऐ, ओ, औ (सन्ध्यक्षराणि)', 'ऋ, ॠ, ऌ'],
            answer: 'ए, ऐ, ओ, औ (एतेषां ह्रस्वाभावात् सदा द्विमात्राः)',
            explanation: 'The diphthongs (ए = अ+इ, ओ = अ+उ, ऐ = आ+इ, औ = आ+उ) require at least two sound units, making a 1-mātrā short form acoustically impossible.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · सूत्र-व्याख्या एवं काल-विज्ञानम्',
        sectionTitleEnglish: 'Section B · Sūtra Analysis & Natural Time Metaphor',
        instructions: 'Analyze the canonical Pāṇinian definitions of vowel timing.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws1-3-q3',
            questionNumber: '3',
            promptDevanagari: 'सूत्रं विवृणुत: "उकालोऽझ्रस्वदीर्घप्लुतः" (१.२.२७)',
            promptEnglish: 'Explain the Pāṇinian sūtra "ukālo\'jjhrasvadīrghaplutaḥ". Why did the sage use the letter "u" (उ) to model time?',
            marks: 4,
            answer: 'उ, ऊ, उ३ (u, ū, u3) — modeled on the morning call of the rooster (कुक्कुट-रुतम्). The rooster cries short "ku", extends into "kū", and trails into "kū3".',
            explanation: 'Pāṇini anchored acoustic metrics to biological nature rather than artificial clocks.'
          },
          {
            id: 'ws1-3-q4',
            questionNumber: '4',
            promptDevanagari: 'व्यञ्जनस्य मात्रा-परिमाणं किम्?',
            promptEnglish: 'What is the mātrā weight of a pure consonant without a vowel (व्यञ्जनम्)?',
            marks: 4,
            optionsOrHints: ['१ मात्रा', '२ मात्रा', 'अर्ध-मात्रा (०.५)', 'शून्यम् (०)'],
            answer: 'व्यञ्जनं च अर्धमात्रिकम् (Half a mātrā · ०.५)',
            explanation: 'A consonant is pure contact; it cannot sustain an acoustic standing wave independently and holds half a beat.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · व्यावहारिक-मात्रा-गणना',
        sectionTitleEnglish: 'Section C · Applied Mātrā Calculation Drill',
        instructions: 'Calculate the total mātrā weight for the given phrase.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws1-3-q5',
            questionNumber: '5',
            promptDevanagari: '"शान्तिः" एवं "आनन्दः" — अनयोः पदयोः कुल-मात्राः गणयत ।',
            promptEnglish: 'Calculate the total metric mātrā value for the words "शान्तिः" (Śāntiḥ) and "आनन्दः" (Ānandaḥ).',
            marks: 7,
            answer: 'शान्तिः = शा (२) + न्तिः (२ - short "i" before conjunct/visarga becomes guru) = ४ मात्राः | आनन्दः = आ (२) + नन् (२ - before conjunct) + दः (२ - with visarga) = ६ मात्राः',
            explanation: 'Syllables with long vowels, anusvāra, or visarga become heavy (Guru = २ mātrās).'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Write a reflective response on how rhythm calms the human nervous system.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-3-q6',
            questionNumber: '6',
            promptDevanagari: 'लय-पालनेन मानसिक-तनावस्य प्रशमनं कथं भवति?',
            promptEnglish: 'How does adhering strictly to vowel duration (mātrā) transform chaotic breathing into steady meditative stillness?',
            marks: 5,
            answer: 'When the mind must track exact 1-beat and 2-beat intervals, speech cadence locks to natural cardiopulmonary sinus rhythms (0.1 Hz baroreflex), soothing vagal tone and shutting down mental anxiety.',
            explanation: 'Predictable acoustic rhythm grounds the nervous system in organic equilibrium.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'कालस्य सदुपयोगः — मात्रा-परिमित-जीवने कः सन्देशः?',
      promptEnglish: 'What does the discipline of Mātrā teach us about the value of time in our daily actions?',
      guidingQuestions: [
        'Notice how extending a short sound by a fraction of a second changes word meaning entirely.',
        'How does casual carelessness with time erode the clarity of our goals?'
      ],
      modelReflection: 'A single mātrā is the smallest indivisible atom of acoustic time. He who honors the duration of a single syllable learns to honor every second of mortal human life.'
    }
  },

  'c-1-4': {
    lessonId: 'c-1-4',
    lessonNumber: '1.4',
    worksheetTitleDevanagari: 'स्पर्श-वर्णाः एवं ५×५ ध्वन्यात्मक-चक्रम्',
    worksheetTitleEnglish: 'The 5×5 Sparśa Consonant Matrix (क to म)',
    subtitle: 'The periodic table of acoustic stops: voicing, aspiration, and nasal resonance',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Navigate the 25 Sparśa consonants across 5 rows (Vargas) and 5 functional columns.',
      'Differentiate Aghoṣa (unvoiced) vs Ghoṣa (voiced) and Alpaprāṇa vs Mahāprāṇa.',
      'Locate the 5th nasal column (Anunāsika) and explain dual mouth-nose resonance.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · स्तम्भ-व्यवस्था-परिज्ञानम्',
        sectionTitleEnglish: 'Section A · Matrix Column Mechanics & Breath Control',
        instructions: 'Identify the functional column traits in the 5x5 Sparśa consonant grid.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-4-q1',
            questionNumber: '1',
            promptDevanagari: '५×५ चक्रे के स्तम्भाः "अल्पप्राणाः" के च "महाप्राणाः"?',
            promptEnglish: 'In the 5x5 grid, which columns represent Alpaprāṇa (low breath) and which represent Mahāprāṇa (high aspirated breath)?',
            marks: 2,
            optionsOrHints: ['Columns 1, 3, 5 = अल्पप्राण; Columns 2, 4 = महाप्राण', 'Columns 1, 2 = अल्पप्राण; Columns 3, 4, 5 = महाप्राण', 'All columns are identical'],
            answer: 'प्रथमाः, तृतीयाः, पञ्चमाः = अल्पप्राणाः (1, 3, 5) | द्वितीयाः, चतुर्थाः = महाप्राणाः (2, 4)',
            explanation: 'Columns 1 (क, च, ट, त, प) and 3 (ग, ज, ड, द, ब) use minimal breath. Columns 2 (ख, छ, ठ, थ, फ) and 4 (घ, झ, ढ, ध, भ) release an explosive burst of breath.'
          },
          {
            id: 'ws1-4-q2',
            questionNumber: '2',
            promptDevanagari: 'पञ्चम-स्तम्भस्य वर्णाः किं कथ्यन्ते?',
            promptEnglish: 'What is the technical name and acoustic characteristic of the 5th column (ङ्, ञ्, ण्, न्, म्)?',
            marks: 3,
            optionsOrHints: ['अन्तस्थाः', 'अनुनासिकाः (Nasal stops resonating through nose and mouth)', 'ऊष्माणः', 'विसर्जनीयाः'],
            answer: 'अनुनासिकाः (Anunāsika — मुखनासिकावचनोऽनुनासिकः)',
            explanation: 'The soft palate lowers, allowing the vocal acoustic wave to split simultaneously through the oral cavity and nasal passages.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · प्रयत्न-भेद-विश्लेषणम्',
        sectionTitleEnglish: 'Section B · Internal & External Articulatory Effort (Prayatna)',
        instructions: 'Analyze the mechanics separating unvoiced and voiced stops.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws1-4-q3',
            questionNumber: '3',
            promptDevanagari: 'अघोष-घोषयोः कः भेदः? चक्रे के अघोषाः?',
            promptEnglish: 'What is the acoustic difference between Aghoṣa (unvoiced) and Ghoṣa (voiced)? Which columns in the matrix are Aghoṣa?',
            marks: 4,
            answer: 'Aghoṣa uses open vocal folds without cord vibration (columns 1 and 2: क, ख, च, छ...). Ghoṣa engages true vocal fold resonance (columns 3, 4, and 5: ग, घ, ङ...).',
            explanation: 'Touching your larynx while pronouncing "ka" reveals zero vibration; pronouncing "ga" reveals immediate vocal cord buzz.'
          },
          {
            id: 'ws1-4-q4',
            questionNumber: '4',
            promptDevanagari: '"कादयो मावसानाः स्पर्शाः" — अस्य लक्षणस्य कः अर्थः?',
            promptEnglish: 'Explain the classical definition: "kādayo māvasānāḥ sparśāḥ".',
            marks: 4,
            optionsOrHints: ['Sounds starting from Ka and ending at Ma are Sparśa (contact stops)', 'All letters must touch the teeth', 'Sparśa means vowels only', 'It refers to musical instruments'],
            answer: 'क-कारादारभ्य म-कारपर्यन्ताः पञ्चविंशति-वर्णाः स्पर्शाः भवन्ति ।',
            explanation: 'In these 25 consonants, active speech articulators make complete contact (स्पर्श) with the passive wall of the vocal tract, stopping airflow momentarily.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · ५×५ चक्र-पूरणम्',
        sectionTitleEnglish: 'Section C · Complete Matrix Grid Reconstruction',
        instructions: 'Identify the missing consonants and assign their exact phonological coordinates.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws1-4-q5',
            questionNumber: '5',
            promptDevanagari: 'रिक्तस्थानानि पूरयत: (क) ट्, __, ड्, __, ण् | (ख) त्, थ्, __, __, न्',
            promptEnglish: 'Fill in the missing consonants in the Ṭa-varga and Ta-varga sequences.',
            marks: 7,
            answer: 'ट-वर्गः: ट्, [ठ्], ड्, [ढ्], ण् | त-वर्गः: त्, थ्, [द्], [ध्], न्',
            explanation: 'Each row progresses strictly: Unvoiced Unaspirated -> Unvoiced Aspirated -> Voiced Unaspirated -> Voiced Aspirated -> Nasal.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Compare the Sanskrit consonant matrix with modern scientific taxonomy.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-4-q6',
            questionNumber: '6',
            promptDevanagari: '५×५ चक्रस्य मेण्डलीव-आवर्त-सारण्या (Periodic Table) सह का समानता?',
            promptEnglish: 'How does the 5x5 consonant matrix anticipate Dmitri Mendeleev’s 2-dimensional Periodic Table of Chemical Elements?',
            marks: 5,
            answer: 'Both systems map physical reality along two orthogonal axes: the X-axis represents physical placement (place of articulation / electron shells), while the Y-axis represents energy state (voicing and aspiration / valence reactivity).',
            explanation: 'Pāṇini categorized human acoustic matter with the same predictive mathematical precision that chemistry uses for atoms.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'शम-दम-युक्तः प्राणः — स्पर्श-वर्णेषु श्वास-नियन्त्रणस्य कः उपदेशः?',
      promptEnglish: 'What does the exact regulation of breath across the 5x5 grid teach us about self-restraint and discipline?',
      guidingQuestions: [
        'Notice how Alpaprāṇa requires conserving energy, while Mahāprāṇa requires conscious release.',
        'How can conscious control of physical speech prevent hasty, harmful words?'
      ],
      modelReflection: 'The vocal apparatus is a gatekeeper. By mastering when to hold breath and when to release it, speech ceases to be an unbridled emotional reflex and becomes a vessel of deliberate truth.'
    }
  },

  'c-1-5': {
    lessonId: 'c-1-5',
    lessonNumber: '1.5',
    worksheetTitleDevanagari: 'अन्तस्थाः, ऊष्माणः एवं अयोगवाहाः',
    worksheetTitleEnglish: 'Semivowels (Antastha), Sibilants (Ūṣman) & Ayogavāhas',
    subtitle: 'The intermediate glides, friction sounds, and contextual resonant carriers',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Identify the 4 Antastha semivowels (य्, र्, ल्, व्) and explain their bridge role.',
      'Differentiate the 3 sibilants: Śa (तालव्य), Ṣa (मूर्धन्य), and Sa (दन्त्य).',
      'Understand the function of the two Ayogavāhas: Anusvāra ( ं ) and Visarga ( ः ).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · वर्ण-भेद-प्रत्यभिज्ञा',
        sectionTitleEnglish: 'Section A · Sibilant & Semivowel Discrimination',
        instructions: 'Distinguish between the three Sanskrit sibilants and four semivowels.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-5-q1',
            questionNumber: '1',
            promptDevanagari: 'त्रिषु शकारेषु कः भेदः? (श, ष, स)',
            promptEnglish: 'What are the anatomical places of articulation for the three distinct sibilants (श, ष, स)?',
            marks: 3,
            optionsOrHints: ['श = तालव्य, ष = मूर्धन्य, स = दन्त्य', 'श = कण्ठ्य, ष = ओष्ठ्य, स = दन्त्य', 'All three are pronounced identically'],
            answer: 'श = तालव्य (Palatal), ष = मूर्धन्य (Retroflex dome), स = दन्त्य (Dental teeth)',
            explanation: 'Confusing them alters word meaning completely: "शकल" (piece) vs "सकल" (all).'
          },
          {
            id: 'ws1-5-q2',
            questionNumber: '2',
            promptDevanagari: '"अन्तस्थाः" इति नाम किमर्थं दत्तम्?',
            promptEnglish: 'Why are the letters य्, र्, ल्, व् termed "Antastha" (intermediate / standing between)?',
            marks: 2,
            answer: 'स्वराणां व्यञ्जनानां च मध्ये स्थिताः (They stand halfway between vowels and complete stop consonants).',
            explanation: 'Semivowels are produced with light partial contact (ईषत्स्पृष्ट), behaving as liquid glides derived from vowels (i->y, ṛ->r, l->l, u->v).'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · अयोगवाह-विधिः',
        sectionTitleEnglish: 'Section B · Ayogavāha Mechanics & Phonetic Adaptability',
        instructions: 'Analyze the behavior of Anusvāra and Visarga.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws1-5-q3',
            questionNumber: '3',
            promptDevanagari: '"अयोगवाह" इति शब्दस्य कः व्युत्पत्ति-लब्धः अर्थः?',
            promptEnglish: 'What does "Ayogavāha" (अयोगवाह) mean etymologically in Pāṇinian phonetics?',
            marks: 4,
            optionsOrHints: ['Not joined in the basic alphabet, but carried along in usage', 'Forbidden sounds', 'Silent letters', 'Foreign loanwords'],
            answer: 'अ-युक्ताः वहन्ति इति अयोगवाहाः (Not listed as independent letters in the 14 Śiva Sūtras, yet carried into speech by preceding vowels)',
            explanation: 'Anusvāra ( ं ) and Visarga ( ः ) cannot stand alone; they must ride on top of an antecedent vowel.'
          },
          {
            id: 'ws1-5-q4',
            questionNumber: '4',
            promptDevanagari: 'विसर्गस्य उच्चारण-रहस्यं किम्? "हरिः" एवं "गुरुः" कथम् उच्चार्येते?',
            promptEnglish: 'How does Visarga ( ः ) echo the vowel preceding it in recitation? Contrast "Hariḥ" and "Guruḥ".',
            marks: 4,
            answer: 'Visarga is an unvoiced glottal release echoing the previous vowel: "हरिः" = Hari-hi | "गुरुः" = Guru-hu | "रामः" = Rāma-ha.',
            explanation: 'The vocal tract maintains the exact vowel resonance chamber as breath is expelled.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · वाक्य-शोधनम् एवं रूपान्तरणम्',
        sectionTitleEnglish: 'Section C · Phonetic Parsing & Analysis Drill',
        instructions: 'Identify and classify all Antastha, Ūṣman, and Ayogavāha elements in the mantra snippet.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws1-5-q5',
            questionNumber: '5',
            promptDevanagari: '"ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः" — अत्र अन्तस्थाः, ऊष्माणः, अयोगवाहाश्च के?',
            promptEnglish: 'Parse the line "Oṁ dyauḥ śāntir antarikṣaṁ śāntiḥ" and extract all Semivowels, Sibilants, and Ayogavāhas.',
            marks: 7,
            answer: 'अन्तस्थाः: य् (द्यौः), र् (शान्तिरन्तरिक्षम्) | ऊष्माणः: श् (शान्तिः) | अयोगवाहाः: विसर्गः (द्यौः, शान्तिः), अनुस्वारः (अन्तरिक्षम्)',
            explanation: 'Systematic phonetic breakdown proves every single sound belongs to a calibrated category.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Reflect on how subtle distinction prevents catastrophic errors in communication.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-5-q6',
            questionNumber: '6',
            promptDevanagari: 'उच्चारण-दोषेण अर्थ-परिवर्तनं कथं भवति? (यथा "सकल" vs "शकल")',
            promptEnglish: 'How does the popular warning "यद्यपि बहु नाधीषे तथापि पठ पुत्र व्याकरणम्... स्वजनो श्वजनो मा भूत् सकलं शकलं सकृच्छकृत्" illustrate the ethical duty of clear speech?',
            marks: 5,
            answer: 'Confusing "स्वजन" (kin) with "श्वजन" (dog), or "सकल" (entire) with "शकल" (broken shard) transforms blessing into insult. Exact pronunciation is an ethical safeguard against harming others through lazy ambiguity.',
            explanation: 'Clarity in speech is the first virtue of respectful human coexistence.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'ऊष्मा (अग्निः) एवं अन्तस्था (मध्य-मार्गः) — आध्यात्मिक-जीवनस्य कः बोधः?',
      promptEnglish: 'How do the warm fricatives (Ūṣman / fire) and balancing semivowels (Antastha / middle path) reflect internal spiritual equilibrium?',
      guidingQuestions: [
        'Ūṣman represents the purifying heat of Tapas (friction generating energy).',
        'Antastha represents balance — neither clinging to the solid consonant nor floating untethered like an open vowel.'
      ],
      modelReflection: 'To live well is to practice Antastha: remaining centered in the middle path between extremes. And it is to possess Ūṣman: the focused inner flame of enthusiasm that burns away sloth.'
    }
  },

  'c-1-6': {
    lessonId: 'c-1-6',
    lessonNumber: '1.6',
    worksheetTitleDevanagari: 'माहेश्वर-सूत्राणि एवं प्रत्याहार-निर्माणम्',
    worksheetTitleEnglish: 'The Māheśvara Sūtras & Pratyāhāra Compression Algorithm',
    subtitle: 'The world’s earliest formal data compression code and set-theoretic parser',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Recite and memorize the structure of the 14 Śiva Sūtras (अइउण्, ऋऌक्...).',
      'Explain the "It" (इत्) terminal marker mechanism under "आदिरन्त्येन सहेता".',
      'Generate and decode essential Pratyāhāras: अच् (all vowels), हल् (all consonants), यण् (semivowels).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · सूत्र-क्रम-परिज्ञानम्',
        sectionTitleEnglish: 'Section A · Sūtra Sequence & Terminal Marker (It) Mechanics',
        instructions: 'Determine the operational mechanics of the 14 Māheśvara sūtras.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-6-q1',
            questionNumber: '1',
            promptDevanagari: 'माहेश्वर-सूत्राणां प्रथमं तथा अन्तिमं सूत्रं किम्?',
            promptEnglish: 'What are the first and final sūtras of the 14 Māheśvara Sūtra sequence?',
            marks: 2,
            optionsOrHints: ['प्रथमम्: अइउण् | अन्तिमम्: हल्', 'प्रथमम्: अक | अन्तिमम्: ज्ञ', 'प्रथमम्: ॐ | अन्तिमम्: शान्तिः'],
            answer: 'प्रथमम्: १. अइउण् | अन्तिमम्: १४. हल्',
            explanation: 'The 14 sūtras begin with primary vowels (अइउण्) and terminate with the aspirate consonant (हल्).'
          },
          {
            id: 'ws1-6-q2',
            questionNumber: '2',
            promptDevanagari: 'सूत्राणां अन्ते विद्यमानानां "इत्" वर्णानां ( यथा अइउण् मध्ये "ण्") किं प्रयोजनम्?',
            promptEnglish: 'What is the exact algorithmic function of the terminal "It" marker (such as "ṇ" in a-i-u-ṇ)?',
            marks: 3,
            optionsOrHints: ['They act as delimiters/closing tags for Pratyāhāra formation and drop out during actual counting', 'They are silent letters for musical melody', 'They are vowels', 'They represent punctuation'],
            answer: 'प्रत्याहार-निर्माणार्थं सीमा-चिह्नम् (तस्य लोपः — drops out after serving as range boundary)',
            explanation: 'Like a closing XML tag or semicolon delimiter, an "It" letter marks the boundary of a subset without forming part of the phonetic data payload.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · प्रत्याहार-साधन-विधिः',
        sectionTitleEnglish: 'Section B · Pratyāhāra Generation Rule (आदिरन्त्येन सहेता)',
        instructions: 'Decode and explain how two-letter codes expand into exact sound arrays.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws1-6-q3',
            questionNumber: '3',
            promptDevanagari: '"आदिरन्त्येन सहेता" (१.१.७१) — अस्य सूत्रस्य अर्थं सोदाहरणं लिखत ।',
            promptEnglish: 'Explain the generative algorithm of sūtra 1.1.71 "ādir antyena sahetā". How does "अण्" expand?',
            marks: 4,
            answer: 'An initial sound (आदि) combined with a final terminal marker (अन्त्य इत्) denotes itself and all intermediate sounds: "अण्" = अ, इ, उ (excluding the terminal ण्).',
            explanation: 'This single rule allows Pāṇini to define 42 concise variable names representing complex phonetic sets.'
          },
          {
            id: 'ws1-6-q4',
            questionNumber: '4',
            promptDevanagari: '"अच्" एवं "हल्" इति प्रत्याहारयोः के वर्णाः समाविष्टाः?',
            promptEnglish: 'Which comprehensive sets of sounds are designated by the Pratyāhāras "AC" (अच्) and "HAL" (हल्)?',
            marks: 4,
            optionsOrHints: ['अच् = सर्वे स्वराः (All vowels); हल् = सर्वे व्यञ्जनानि (All consonants)', 'अच् = केवलं क-वर्गः; हल् = केवलं त-वर्गः', 'अच् = महाप्राणाः; हल् = अल्पप्राणाः'],
            answer: 'अच् = सर्वे स्वराः (Sūtras 1-4: अ, इ, उ, ऋ, ऌ, ए, ओ, ऐ, औ) | हल् = सर्वे व्यञ्जनानि (Sūtras 5-14: all consonants)',
            explanation: 'Hence in Sanskrit grammar, vowels are universally called "Ac" and consonants are called "Hal".'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · प्रत्याहार-डिकोडिंग-अभ्यासः',
        sectionTitleEnglish: 'Section C · Pratyāhāra Decoding & Expansion Drill',
        instructions: 'Expand the following three standard Pāṇinian Pratyāhāras into their exact constituent sounds.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws1-6-q5',
            questionNumber: '5',
            promptDevanagari: 'प्रसारयत: (क) यण्, (ख) इक्, (ग) झश्',
            promptEnglish: 'Expand the Pratyāhāras: (a) Yaṇ, (b) Ik, (c) Jhaś.',
            marks: 7,
            answer: '(क) यण् = य्, व्, र्, ल् | (ख) इक् = इ, उ, ऋ, ऌ | (ग) झश् = झ्, भ्, घ्, ढ्, ध्, ज्, ब्, ग्, ड्, द् (all voiced non-nasal stops)',
            explanation: 'Mastering these three allows instant comprehension of the core Sandhi rules (e.g. इको यणचि: ik -> yaṇ before ac).'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Compare Pratyāhāras to computer regex ranges and memory efficiency.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws1-6-q6',
            questionNumber: '6',
            promptDevanagari: 'प्रत्याहार-प्रणाली आधुनिक-सङ्गणक-शास्त्रस्य "Data Compression" इव कथं वर्तते?',
            promptEnglish: 'How does Pāṇini’s Pratyāhāra method anticipate regular expression ranges [a-z] and lossless compression algorithms?',
            marks: 5,
            answer: 'Instead of repeating lengthy lists of 14 vowels or 33 consonants across thousands of rules, Pāṇini compresses sets into 2-letter tokens (अच्, हल्). This minimized oral memory overhead 2,500 years before modern computer science invented Huffman coding and regex tokenization.',
            explanation: 'Pāṇini invented formal grammar and tokenization centuries before Backus-Naur Form (BNF).'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'नृत्तावसाने नटराजराजो ननाद ढक्कां नवपञ्चवारम् — अस्य श्लोकस्य आध्यात्मिकं मर्म किम्?',
      promptEnglish: 'According to tradition, the 14 Sūtras resonated from the cosmic dance drum (Damaru) of Śiva. What does this reveal about the cosmic origin of order?',
      guidingQuestions: [
        'Notice how cosmic dance (art/ecstasy) generates mathematics (rule/structure).',
        'Can true discipline and joyful creativity coexist in harmony?'
      ],
      modelReflection: 'The Māheśvara Sūtras prove that ultimate structure is not born of cold pedantry, but of ecstatic cosmic order. When the mind rests in the rhythm of the universe, grammar itself becomes a path of liberation.'
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

  'c-2-3': {
    lessonId: 'c-2-3',
    lessonNumber: '2.3',
    worksheetTitleDevanagari: 'संयुक्ताक्षराणि एवं संयोग-विधिः',
    worksheetTitleEnglish: 'Consonant Conjuncts (Saṁyuktākṣarāṇi) & Ligature Architecture',
    subtitle: 'The art and structural geometry of vowel-less consonant binding',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Define Saṁyoga under Pāṇini’s sūtra "हलोऽनन्तराः संयोगः" (1.1.7).',
      'Decode irregular ligatures: k + ṣ = kṣ (क्ष), j + ñ = jñ (ज्ञ), ś + r = śr (श्र), d + y = dy (द्य).',
      'Master the 3 distinct positional forms of the letter "r" (Repha: र्क, प्र, ट्र).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · संयोग-घटक-परिज्ञानम्',
        sectionTitleEnglish: 'Section A · Constituent Consonant Deconstruction',
        instructions: 'Break down each composite ligature into its pure atomic consonant components.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws2-3-q1',
            questionNumber: '1',
            promptDevanagari: 'एतेषां संयुक्ताक्षराणां घटकाः के? (क) क्ष (ख) ज्ञ (ग) त्र (घ) श्र',
            promptEnglish: 'Identify the exact constituent consonants forming: (a) kṣ (b) jñ (c) tr (d) śr.',
            marks: 3,
            optionsOrHints: ['(a) क्+ष् (b) ज्+ञ् (c) त्+र् (d) श्+र्', '(a) क+छ (b) ग+य (c) त+ल (d) स+र'],
            answer: '(a) क् + ष् = क्ष | (b) ज् + ञ् = ज्ञ | (c) त् + र् = त्र | (d) श् + र् = श्र',
            explanation: 'These four are classical integrated glyphs whose visual forms merge completely.'
          },
          {
            id: 'ws2-3-q2',
            questionNumber: '2',
            promptDevanagari: 'रेफस्य (र) त्रिविध-प्रयोगाः के सन्ति?',
            promptEnglish: 'What are the three distinct graphical rendering styles of the consonant "r" (Repha)?',
            marks: 2,
            answer: '१. शिरसि रेफः (Superscript sickle before consonant: धर्म = र् + म) | २. पदेन रकारः (Subscript diagonal slash after consonant: प्रकाश = प् + र) | ३. काकपदम् (Inverted caret with dome letters: राष्ट्र = ट् + र)',
            explanation: 'When "r" precedes, it rides above; when "r" follows, it attaches below.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · सूत्र-सिद्धान्त-विश्लेषणम्',
        sectionTitleEnglish: 'Section B · Sūtra Analysis & Syllabic Weight (Guru)',
        instructions: 'Analyze the rule defining consonant conjuncts and their effect on meter.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws2-3-q3',
            questionNumber: '3',
            promptDevanagari: '"हलोऽनन्तराः संयोगः" (१.१.७) — अस्य सूत्रस्य कः अर्थः?',
            promptEnglish: 'Explain the Pāṇinian definition of Saṁyoga: "halo\'nantarāḥ saṁyogaḥ".',
            marks: 4,
            optionsOrHints: ['Consonants uninterrupted by any vowel form a conjunct', 'Vowels joined together', 'Words ending in halanta', 'Musical rhythm'],
            answer: 'स्वर-व्यवधान-रहिताः बहवः हलः (व्यञ्जनानि) संयोग-संज्ञकाः भवन्ति ।',
            explanation: 'When two or more consonants touch each other without an intervening vowel, they form a unified acoustic cluster called Saṁyoga.'
          },
          {
            id: 'ws2-3-q4',
            questionNumber: '4',
            promptDevanagari: '"संयोगे गुरु" (१.४.११) — संयोगस्य पूर्वतन-स्वरे कः प्रभावः?',
            promptEnglish: 'How does a consonant conjunct affect the metric weight of the vowel that immediately precedes it?',
            marks: 4,
            answer: 'Even if the preceding vowel is naturally short (ह्रस्व), a following conjunct makes that vowel heavy (गुरु = २ mātrās). Example: in "भक्तः", "भ" carries 2 beats.',
            explanation: 'The vocal tract must hold acoustic pressure to articulate the cluster, extending syllable duration.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · संयुक्त-पद-विच्छेद-अभ्यासः',
        sectionTitleEnglish: 'Section C · Complex Word Parsing & Spelling Reconstruction',
        instructions: 'Dissect the following four sacred terms into their atomic sounds: कृष्णः, विद्या, धर्मः, ईश्वरः',
        totalMarks: 7,
        questions: [
          {
            id: 'ws2-3-q5',
            questionNumber: '5',
            promptDevanagari: 'एतेषां पदानां पूर्ण-वर्ण-विच्छेदं कुरुत: कृष्णः, विद्या, धर्मः, ईश्वरः',
            promptEnglish: 'Provide the exact letter-by-letter sound breakdown of: kṛṣṇaḥ, vidyā, dharmaḥ, īśvaraḥ.',
            marks: 7,
            answer: 'कृष्णः = क् + ऋ + ष् + ण् + अ + ः | विद्या = व् + इ + द् + य् + आ | धर्मः = ध् + अ + र् + म् + अ + ः | ईश्वरः = ई + श् + व् + अ + र् + अ + ः',
            explanation: 'Deconstructing words down to individual halantas guarantees flawless orthography and pronunciation.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Reflect on the visual architecture of Devanāgarī ligatures.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws2-3-q6',
            questionNumber: '6',
            promptDevanagari: 'संयुक्ताक्षराणि पृथक् न लिख्यन्ते अपि तु संयुज्यन्ते — अस्य कः वैज्ञानिको हेतुः?',
            promptEnglish: 'Why did Indian scribes visually weld consonants into composite ligatures instead of simply writing them side-by-side with spaces?',
            marks: 5,
            answer: 'In speech, consonant clusters share a single pulse of breath with the following vowel. Visual ligatures mirror acoustic co-articulation: because there is no breath-pause between the consonants, there is no spatial break between the glyphs.',
            explanation: 'Devanāgarī typography is an isomorphic visual printout of acoustic coarticulation.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'संयोगे शक्तिः — एकाधिक-वर्णानां मेलने कः सामाजिकः आध्यात्मिकश्च सन्देशः?',
      promptEnglish: 'What does the harmonious binding of distinct consonants in Saṁyoga teach us about human collaboration and unity?',
      guidingQuestions: [
        'Notice how each letter yields a part of its individual glyph to merge into a stronger composite shape.',
        'How does surrendering narrow personal ego create enduring collective beauty?'
      ],
      modelReflection: 'In a conjunct, neither letter destroys the other; rather, both surrender their separate isolation to form an invincible unit of meaning. True unity is not uniformity, but the willing harmony of distinct strengths.'
    }
  },

  'c-2-4': {
    lessonId: 'c-2-4',
    lessonNumber: '2.4',
    worksheetTitleDevanagari: 'प्रथम-पद-पठनम् एवं पद-विज्ञानम्',
    worksheetTitleEnglish: 'Reading Your First Words Aloud & The Anatomy of a Pada',
    subtitle: 'From visual symbols to living audible speech: understanding the birth of a word',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Read authentic multi-syllabic Sanskrit words aloud in fluent Vaikharī speech.',
      'Differentiate between an uninflected stem (Prātipadika / Dhātu) and a finished word (Pada).',
      'Apply Pāṇini’s supreme operational law: "सुप्तिङन्तं पदम्" (1.4.14).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · पद-वाचन-प्रत्यभिज्ञा',
        sectionTitleEnglish: 'Section A · Oral Word Reading & Translation',
        instructions: 'Read aloud each sacred word and identify its meaning.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws2-4-q1',
            questionNumber: '1',
            promptDevanagari: 'एतेषां पदानां शुद्धावाचनेन सह अर्थं लिखत: (क) देवः (ख) गुरुः (ग) पुस्तकम् (घ) ज्ञानम्',
            promptEnglish: 'Pronounce and translate the foundational words: (a) devaḥ (b) guruḥ (c) pustakam (d) jñānam.',
            marks: 3,
            answer: '(क) देवः = Divine radiant being | (ख) गुरुः = Dispeller of darkness, preceptor | (ग) पुस्तकम् = Book / scripture | (घ) ज्ञानम् = Illuminating wisdom',
            explanation: 'Notice how every single letter matches its exact spoken sound.'
          },
          {
            id: 'ws2-4-q2',
            questionNumber: '2',
            promptDevanagari: 'संस्कृत-पठने शिरोरेखायाः (Top Horizontal Line) कः उपयोगः?',
            promptEnglish: 'What is the phonetic and cognitive purpose of the unbroken top bar (Śirorekhā) in Devanāgarī?',
            marks: 2,
            answer: 'It unifies all constituent sounds of a single continuous word (Pada) under one horizontal line, signalling to the reader: "Do not pause; articulate this unit in one unbroken flow of breath."',
            explanation: 'The top bar defines word boundaries and breath coherence.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · पद-लक्षण-विश्लेषणम्',
        sectionTitleEnglish: 'Section B · What Constitutes a Valid Word (Pada)?',
        instructions: 'Explain the fundamental Pāṇinian definition of a legitimate word.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws2-4-q3',
            questionNumber: '3',
            promptDevanagari: '"सुप्तिङन्तं पदम्" (१.४.१४) — अस्य सूत्रस्य अर्थं सोदाहरणं विवृणुत ।',
            promptEnglish: 'Explain the rule "suptiṅantaṁ padam". Why is a bare stem like "rām" or "paṭh" forbidden from appearing in a sentence?',
            marks: 4,
            optionsOrHints: ['A word must end in either a noun suffix (Sup) or a verb suffix (Tiṅ)', 'Any combination of letters is a word', 'Only words found in dictionaries are Padas'],
            answer: 'Only stems terminated with a Sup (21 nominal case suffixes) or a Tiṅ (18 verbal tense suffixes) earn the title of "Pada". "अपदं न प्रयुञ्जीत" — bare uninflected stems are strictly forbidden in speech.',
            explanation: 'Until a noun or verb receives an inflection declaring its role, it is merely uncompiled raw code.'
          },
          {
            id: 'ws2-4-q4',
            questionNumber: '4',
            promptDevanagari: '"सुप्" एवं "तिङ्" प्रत्यययोः कः भेदः?',
            promptEnglish: 'What is the core functional difference between "Sup" and "Tiṅ" terminations?',
            marks: 4,
            answer: 'सुप् (Sup) inflects nominal nouns, pronouns, and adjectives across 7 cases and 3 numbers (२१ रूपाणि). तिङ् (Tiṅ) inflects verbal roots across persons, numbers, and tenses/moods (१८ रूपाणि).',
            explanation: 'Sup assigns static relational roles; Tiṅ executes dynamic temporal actions.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · वर्ण-विच्छेद-संयोजन-अभ्यासः',
        sectionTitleEnglish: 'Section C · Applied Word Synthesis Drill',
        instructions: 'Assemble the atomic sounds into complete, legitimate Sanskrit words.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws2-4-q5',
            questionNumber: '5',
            promptDevanagari: 'वर्णानां संयोजनेन पदं रचयत: (क) न् + अ + म् + अ + स् + त् + ए | (ख) श् + आ + न् + त् + इ + ः',
            promptEnglish: 'Synthesize the decomposed phonemes into finished words: (a) n+a+m+a+s+t+e, (b) ś+ā+n+t+i+ḥ.',
            marks: 7,
            answer: '(क) नमस्ते (Namaste — salutations to thee) | (ख) शान्तिः (Śāntiḥ — profound peace)',
            explanation: 'Demonstrates how individual acoustic frequencies combine into sacred, complete Padas.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Connect vocal reading to the four levels of human consciousness.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws2-4-q6',
            questionNumber: '6',
            promptDevanagari: 'वैखरी-वाण्याः (उद्घोष-पठनस्य) अभ्यासेन मनसः शुद्धिः कथं भवति?',
            promptEnglish: 'According to Bhartṛhari’s Vākyapadīya, how does reciting aloud in physical Vaikharī speech lead consciousness back inward through Madhyamā and Paśyantī to Parā?',
            marks: 5,
            answer: 'Reading aloud anchors fluctuating thought in physical breath and acoustic vibration. When outer auditory speech (Vaikharī) becomes flawless, internal mental syntax (Madhyamā) falls quiet, allowing the intuitive flash of unitive wisdom (Paśyantī) to dawn from pure consciousness (Parā).',
            explanation: 'Speech is a two-way cosmic bridge: moving outward to communicate, and inward to meditate.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'अपदं न प्रयुञ्जीत — अस्य व्याकरण-नियमस्य जीवने कः उपयोगः?',
      promptEnglish: 'The grammatical decree states: "Never utter an unfinished, uninflected stem (Apada)". What does this teach us about our words and deeds?',
      guidingQuestions: [
        'A word is not allowed into the sentence until its purpose and relation are clearly established.',
        'Should we express half-baked opinions or unmeasured actions in public life?'
      ],
      modelReflection: 'Just as Sanskrit refuses to let an uninflected word into a sentence, a noble person never releases hasty, purposeless, or reckless words into the world. Every word must know its duty (Kāraka) before it takes flight.'
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

  'c-3-2': {
    lessonId: 'c-3-2',
    lessonNumber: '3.2',
    worksheetTitleDevanagari: 'लट्-लकारः एवं क्रिया-पद-संयोजनम्',
    worksheetTitleEnglish: 'Present Tense (Laṭ-Lakāra) & The 3×3 Conjugation Engine',
    subtitle: 'Temporal action anchoring in the living present across person and number',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the 3x3 present tense matrix (प्रथम, मध्यम, उत्तम × एक, द्वि, बहु).',
      'Memorize the 9 Parasmaipada terminations: ति, तः, अन्ति | सि, थः, थ | मि, वः, मः.',
      'Conjugate core verbal roots (√पठ्, √गम्, √भू, √लिख्) with flawless subject agreement.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · पुरुष-वचन-प्रत्यभिज्ञा',
        sectionTitleEnglish: 'Section A · Person & Number Identification',
        instructions: 'Identify the exact grammatical person (Puruṣa) and number (Vacana) for each inflected verb.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-2-q1',
            questionNumber: '1',
            promptDevanagari: 'क्रियापदानां पुरुषं वचनं च लिखत: (क) पठामि (ख) गच्छथः (ग) भवन्ति',
            promptEnglish: 'Determine the Puruṣa and Vacana for: (a) paṭhāmi (b) gacchathaḥ (c) bhavanti.',
            marks: 3,
            optionsOrHints: ['(a) उत्तम-एकवचन (b) मध्यम-द्विवचन (c) प्रथम-बहुवचन', '(a) प्रथम-एकवचन (b) उत्तम-द्विवचन (c) मध्यम-बहुवचन'],
            answer: '(क) पठामि = उत्तमपुरुषः, एकवचनम् (I read) | (ख) गच्छथः = मध्यमपुरुषः, द्विवचनम् (You two go) | (ग) भवन्ति = प्रथमपुरुषः, बहुवचनम् (They become/are)',
            explanation: 'The terminal suffix explicitly dictates subject identity without needing separate pronouns.'
          },
          {
            id: 'ws3-2-q2',
            questionNumber: '2',
            promptDevanagari: 'संस्कृत-व्याकरणे "प्रथमपुरुषः" कः? आङ्ग्ल-व्याकरणेन सह कः व्यत्यासः?',
            promptEnglish: 'Who is "Prathama Puruṣa" in Sanskrit? How does it differ from "First Person" in English grammar?',
            marks: 2,
            answer: 'Sanskrit’s "Prathama" is English "Third Person" (he, she, it, they). English "First Person" (I/we) is called "Uttama Puruṣa" (the highest/innermost) in Sanskrit.',
            explanation: 'Western grammar prioritizes the ego first (1st = I); Sanskrit puts the external world first (Prathama) and the transcendent witnessing Self as highest (Uttama).'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · लकार-सूत्र-विश्लेषणम्',
        sectionTitleEnglish: 'Section B · Pāṇinian Sūtra Mechanics & Tense Morphology',
        instructions: 'Analyze the rule governing present tense inflection.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws3-2-q3',
            questionNumber: '3',
            promptDevanagari: '"वर्तमाने लट्" (३.२.१२३) — अस्य सूत्रस्य कः अर्थः?',
            promptEnglish: 'Explain the rule "vartamāne laṭ". What does the technical code "Laṭ" (लट्) denote?',
            marks: 4,
            optionsOrHints: ['Laṭ denotes the present tense (वर्तमान-काल)', 'Laṭ means past tense', 'Laṭ means future order', 'Laṭ means passive voice'],
            answer: 'वर्तमाने काले धातोः लट्-प्रत्ययो भवति । "लट्" is the code for the present tense indicator.',
            explanation: 'Pāṇini uses 10 "Lakāras" (all beginning with letter L) to model all tenses and moods.'
          },
          {
            id: 'ws3-2-q4',
            questionNumber: '4',
            promptDevanagari: 'परस्मैपदस्य नव प्रत्ययाः के?',
            promptEnglish: 'List the 9 canonical Parasmaipada suffixes in order from Prathama to Uttama.',
            marks: 4,
            answer: 'प्रथमपुरुषः: तिप् (ति), तस् (तः), झि (अन्ति) | मध्यमपुरुषः: सिप् (सि), थस् (थः), थ (थ) | उत्तमपुरुषः: मिप् (मि), वस् (वः), मस् (मः)',
            explanation: 'These 9 suffixes attach to any verbal base to generate all present-tense active verbs.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · क्रिया-सारणी-पूरणम् एवं वाक्य-शोधनम्',
        sectionTitleEnglish: 'Section C · 3×3 Grid Completion & Syntax Correction',
        instructions: 'Complete the conjugation table for √लिख् (to write) and correct the mismatched sentence.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws3-2-q5',
            questionNumber: '5',
            promptDevanagari: '√लिख् धातोः लट्-लकारस्य रूपाणि लिखत तथा अशुद्धं शोधयत: "वयम् ग्रन्थं पठति"।',
            promptEnglish: 'Provide the 3x3 conjugation of √likh and correct the grammatical error in: "vayam granthaṁ paṭhati".',
            marks: 7,
            answer: 'रूपाणि: लिखति, लिखतः, लिखन्ति | लिखसि, लिखथः, लिखथ | लिखामि, लिखावः, लिखामः । शोधनम्: "वयम् ग्रन्थं पठामः" (पठति -> पठामः, because वयम् is उत्तमपुरुष बहुवचन).',
            explanation: 'The subject pronoun and the verb ending must strictly agree in person and number.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Reflect on the philosophical meaning of "Vartamāna" (the present moment).',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-2-q6',
            questionNumber: '6',
            promptDevanagari: '"वर्तमान" इति शब्दस्य धात्वर्थः कः? अस्य ध्यान-जीवने कः सम्बन्धः?',
            promptEnglish: 'The word "Vartamāna" derives from √वृत् (vṛt — to turn, to exist, to roll). How does living in the grammatical present foster psychological freedom?',
            marks: 5,
            answer: 'Past is dead memory (भूत); future is imagined anticipation (भविष्यत्). Only the present (वर्तमान) is rolling actively in conscious existence. Laṭ-lakāra trains attention to anchor in the only time where life and action actually exist.',
            explanation: 'Grammar mirrors mindfulness: action is only possible in the eternal Now.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'अहं करोमि इति उत्तमपुरुषः — कर्त्तृत्व-भावस्य कः रहस्यः?',
      promptEnglish: 'Why does Sanskrit reserve "Uttama" (highest) for the first-person singular "I am", yet demand that it humble itself in divine surrender?',
      guidingQuestions: [
        'Notice that Uttama means "highest" because consciousness (the subjective witness) is prior to all objective things.',
        'How can knowing that you are the conscious witness free you from petty arrogance?'
      ],
      modelReflection: 'Sanskrit calls the innermost self "Uttama" not to inflate the worldly ego, but to remind us that the conscious witness within is identical to the divine light illuminating the cosmos.'
    }
  },

  'c-3-3': {
    lessonId: 'c-3-3',
    lessonNumber: '3.3',
    worksheetTitleDevanagari: 'लिङ्ग-वचन-व्यवस्था एवं प्रकार-सुरक्षा',
    worksheetTitleEnglish: 'Gender, Number & The Sacred Dual: Linguistic Type-Safety',
    subtitle: 'Natural symmetry through the Dual number and strict tripartite agreement',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the tripartite gender system (पुंलिङ्ग, स्त्रीलिङ्ग, नपुंसकलिङ्ग).',
      'Explain the biological and relational genius of the Dual number (द्विवचनम्).',
      'Enforce strict adjective-noun agreement in gender, number, and case.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · लिङ्ग-वचन-वर्गीकरणम्',
        sectionTitleEnglish: 'Section A · Gender & Number Classification Drill',
        instructions: 'Identify the gender and number of the given Sanskrit nouns.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-3-q1',
            questionNumber: '1',
            promptDevanagari: 'एतेषां शब्दानां लिङ्गं वचनं च निर्धारयत: (क) बालकाः (ख) लते (ग) फलानि (घ) हस्तौ',
            promptEnglish: 'Identify the Gender and Number for: (a) bālakāḥ (b) late (c) phalāni (d) hastau.',
            marks: 3,
            answer: '(क) बालकाः = पुंलिङ्गम्, बहुवचनम् | (ख) लते = स्त्रीलिङ्गम्, द्विवचनम् | (ग) फलानि = नपुंसकलिङ्गम्, बहुवचनम् | (घ) हस्तौ = पुंलिङ्गम्, द्विवचनम्',
            explanation: 'Demonstrates standard ending recognition: -āḥ (masc plural), -e (fem dual / neut dual), -āni (neut plural), -au (masc dual).'
          },
          {
            id: 'ws3-3-q2',
            questionNumber: '2',
            promptDevanagari: 'किमर्थं संस्कृते "द्विवचनम्" (Dual Number) विशेषतया रक्षितम्?',
            promptEnglish: 'Why does Sanskrit rigorously preserve the Dual number (द्विवचनम्) when almost all modern languages discarded it?',
            marks: 2,
            answer: 'Because nature is fundamentally organized in bilateral pairs: two eyes, two hands, two wings, day and night, sun and moon, teacher and disciple. Conflating a pair into an undifferentiated "plural" erases bilateral symmetry.',
            explanation: 'The dual honors the natural polarity and partnership underlying reality.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · सूत्र-नियम-विश्लेषणम्',
        sectionTitleEnglish: 'Section B · Pāṇinian Sūtras for Number & Concord',
        instructions: 'Analyze the canonical rules defining grammatical number and adjective concordance.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws3-3-q3',
            questionNumber: '3',
            promptDevanagari: '"द्व्येकयोर्द्विवचनैकवचने" (१.४.२२) एवं "बहुषु बहुवचनम्" (१.४.२१) — सूत्रद्वयस्य अर्थं लिखत ।',
            promptEnglish: 'Explain sūtras 1.4.21 and 1.4.22 defining the strict arithmetic binding of number in Sanskrit.',
            marks: 4,
            answer: 'When denoting a single entity, the singular (एकवचन) is used; when denoting a pair, the dual (द्विवचन) is mandatory; when denoting three or more, the plural (बहुवचन) applies.',
            explanation: 'Number in Sanskrit is an exact mathematical predicate, not a vague collective gesture.'
          },
          {
            id: 'ws3-3-q4',
            questionNumber: '4',
            promptDevanagari: 'विशेषण-विशेष्य-नियमः कः? "यल्लिङ्गं यद्वचनं या च विभक्तिः..." श्लोकं विवृणुत ।',
            promptEnglish: 'Explain the golden rule of adjective agreement: "yadliṅgaṁ yadvacanaṁ yā ca vibhaktiḥ...".',
            marks: 4,
            optionsOrHints: ['An adjective must match its noun in Gender, Number, and Case', 'Adjectives are always masculine', 'Adjectives do not change', 'Adjectives come after verbs'],
            answer: 'यल्लिङ्गं यद्वचनं या च विभक्तिर्विशेष्यस्य । तल्लिङ्गं तद्वचनं सैव च विभक्तिर्विशेषणस्यापि ॥ (Whatever gender, number, and case the qualified noun takes, the adjective must identically adopt).',
            explanation: 'Example: सुन्दरः बालकः (masc), सुन्दरी बालिका (fem), सुन्दरं वनम् (neut).'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · वाक्य-रूपान्तरण-अभ्यासः',
        sectionTitleEnglish: 'Section C · Dual & Plural Transformation Drill',
        instructions: 'Transform the singular statement into its corresponding Dual and Plural forms.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws3-3-q5',
            questionNumber: '5',
            promptDevanagari: 'वाक्यमिदं द्विवचने बहुवचने च परिवर्तयत: "विद्वान् सर्वत्र पूज्यते" अथवा "बालकः पुस्तकं पठति"।',
            promptEnglish: 'Transform "बालकः पुस्तकं पठति" (The boy reads a book) into Dual and Plural.',
            marks: 7,
            answer: 'द्विवचनम्: बालकौ पुस्तके पठतः (Two boys read two books) | बहुवचनम्: बालकाः पुस्तकानि पठन्ति (Many boys read many books).',
            explanation: 'Notice how noun, object, and verb all transform harmoniously in Lockstep.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Compare Sanskrit grammatical agreement to compiler type-safety.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-3-q6',
            questionNumber: '6',
            promptDevanagari: 'संस्कृत-विशेषण-नियमः आधुनिक-प्रोग्रामिङ्ग-भाषाणां "Type Safety" इव कथं कार्यं करोति?',
            promptEnglish: 'How does Sanskrit’s strict adjective-noun agreement mirror the "Type System" in robust programming languages like TypeScript or Rust?',
            marks: 5,
            answer: 'In typed programming, a compiler rejects code where an integer is assigned to a string. Similarly, the Sanskrit grammatical engine throws an immediate parse error if an adjective does not match its noun’s type-tuple (Gender, Number, Case). This eliminates ambiguity even when words are scattered across a page.',
            explanation: 'Type safety at the lexical level guarantees zero-error semantic parsing.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'द्वन्द्व-समाहारः — द्विवचने सम्बन्धानां का शुचिता?',
      promptEnglish: 'What does the sanctity of the Dual number reveal about sacred partnerships (guru-disciple, husband-wife, human-nature)?',
      guidingQuestions: [
        'In a true partnership, two do not collapse into a blurred one, nor do they scatter into an anonymous crowd.',
        'How does holding a dual relationship in conscious balance foster mutual reverence?'
      ],
      modelReflection: 'The dual number reminds us that sacred relationships require mutual holding. Two souls face each other, each honoring the other’s divine sovereignty without dominance or dilution.'
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

  'c-3-5': {
    lessonId: 'c-3-5',
    lessonNumber: '3.5',
    worksheetTitleDevanagari: 'संधि-विज्ञानम् एवं ध्वनेः सहज-प्रवाहः',
    worksheetTitleEnglish: 'Sandhi Rules & Euphonic Acoustic Coarticulation',
    subtitle: 'Cross-fading sound boundaries: how natural speech physics smooths friction',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Define Saṁhitā under Pāṇini’s rule "परः संनिकर्षः संहिता" (1.4.109).',
      'Distinguish the 3 branches: Svara-sandhi (vowels), Hal-sandhi (consonants), and Visarga-sandhi.',
      'Execute core vowel sandhi transforms: Savarṇa Dīrgha, Guṇa, Vṛddhi, and Yaṇ (इको यणचि).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · संधि-प्रकार-प्रत्यभिज्ञा',
        sectionTitleEnglish: 'Section A · Sandhi Classification & Identification',
        instructions: 'Identify which major sandhi rule governs each phonetic merger.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-5-q1',
            questionNumber: '1',
            promptDevanagari: 'एतेषु के सन्धयः प्रयुक्ताः? (क) महा + उत्सवः = महोत्सवः (ख) यदि + अपि = यद्यपि (ग) देव + आलयः = देवालयः',
            promptEnglish: 'Identify the specific vowel sandhi rule in: (a) mahotsavaḥ, (b) yadyapi, (c) devālayaḥ.',
            marks: 3,
            optionsOrHints: ['(a) गुण (b) यण् (c) सवर्ण-दीर्घ', '(a) वृद्धि (b) अयादि (c) पूर्वरूप'],
            answer: '(क) महोत्सवः = गुण-संधिः (आद्गुणः) | (ख) यद्यपि = यण्-संधिः (इको यणचि) | (ग) देवालयः = सवर्ण-दीर्घ-संधिः (अकः सवर्णे दीर्घः)',
            explanation: 'a+u becomes o (Guṇa); i+a becomes y (Yaṇ); a+ā becomes long ā (Savarṇa Dīrgha).'
          },
          {
            id: 'ws3-5-q2',
            questionNumber: '2',
            promptDevanagari: 'किमर्थं वयं "रामः + गच्छति" स्थाने "रामो गच्छति" इति वदामः?',
            promptEnglish: 'Why does "rāmaḥ + gacchati" naturally merge into "rāmo gacchati"? Which Sandhi applies?',
            marks: 2,
            answer: 'विसर्ग-सन्धिः (अतो रोरप्लुतादप्लुते & हशि च). The unvoiced puff of visarga smoothly harmonizes with the voiced plosive "ga", avoiding an abrupt vocal stop.',
            explanation: 'Visarga transitions smoothly to "u", which joins the short "a" into the sonorous vowel "o".'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · सूत्र-सञ्चालन-विधिः',
        sectionTitleEnglish: 'Section B · Pāṇinian Sūtra Execution (इको यणचि)',
        instructions: 'Trace the algebraic step-by-step rewrite of Pāṇini’s famous Yaṇ sandhi sūtra.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws3-5-q3',
            questionNumber: '3',
            promptDevanagari: '"इको यणचि" (६.१.७७) — अस्य सूत्रस्य पदानि विवृणुत तथा "इति + आह" साधयत ।',
            promptEnglish: 'Break down the three terms in "iko yaṇ aci" (6.1.77) and show the step-by-step derivation of "iti + āha".',
            marks: 4,
            answer: 'इकः (genitive: in place of i, u, ṛ, l) + यण् (nominative: comes y, v, r, l) + अचि (locative: when followed by an unlike vowel). Step: इति [इ] + आह -> इत् + [य्] + आह = इत्याह ।',
            explanation: 'Demonstrates Pāṇini’s concise 3-word rule acting as a universal conditional rewrite compiler directive.'
          },
          {
            id: 'ws3-5-q4',
            questionNumber: '4',
            promptDevanagari: '"परः संनिकर्षः संहिता" (१.४.१०९) — "संहिता" इति कस्य नाम?',
            promptEnglish: 'What is the definition of "Saṁhitā" (euphonic proximity) under sūtra 1.4.109?',
            marks: 4,
            optionsOrHints: ['Extreme temporal proximity of sounds without breath-pause', 'Writing in neat lines', 'Reciting very loudly', 'Using long vowels only'],
            answer: 'वर्णानामतिशयितः संनिधिः संहिता-संज्ञः स्यात् (When two sounds occur within half a mātrā interval without a breath pause, sandhi becomes mandatory).',
            explanation: 'Sandhi is not an arbitrary decorative hack; it is the physical consequence of continuous breath.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · संधि-संयोजन-विच्छेद-अभ्यासः',
        sectionTitleEnglish: 'Section C · Applied Sandhi Splitting & Joining Drill',
        instructions: 'Join or split the following classical phrases: (1) विद्या + अर्थी, (2) नमः + ते, (3) सूर्यास्तः, (4) गुरूपदेशः',
        totalMarks: 7,
        questions: [
          {
            id: 'ws3-5-q5',
            questionNumber: '5',
            promptDevanagari: 'सन्धत्त विच्छिन्दत च: (क) विद्या + अर्थी (ख) नमः + ते (ग) सूर्यास्तः (घ) गुरूपदेशः',
            promptEnglish: 'Perform the sandhi joins and splits: (a) vidyā + arthī (b) namaḥ + te (c) sūryāstaḥ (d) gurūpadeśaḥ.',
            marks: 7,
            answer: '(क) विद्यार्थी (सवर्णदीर्घः) | (ख) नमस्ते (विसर्गस्य सत्वम्) | (ग) सूर्य + अस्तः | (घ) गुरु + उपदेशः',
            explanation: 'Regular practice makes euphonic joins an intuitive, automatic linguistic reflex.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Compare Sandhi to modern digital audio signal processing and cross-fading.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-5-q6',
            questionNumber: '6',
            promptDevanagari: 'सङ्गणकीय-ध्वनि-संश्लेषणे (Audio Processing) "Sandhi" इव का प्रक्रिया अस्ति?',
            promptEnglish: 'In digital audio engineering, abrupt cuts between waveforms create harsh acoustic clicks. How is Sandhi the world’s earliest "cross-fading" and "coarticulation smoothing algorithm"?',
            marks: 5,
            answer: 'When two phonemes meet, the human tongue cannot teleport instantaneously. Sandhi computes the optimal intermediate trajectory (e.g. turning dental "t" into palatal "c" before "c"), removing phonetic turbulence and producing effortless acoustic flow.',
            explanation: 'Sandhi is bio-mechanical acoustic optimization codifying minimal energy expenditure.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'घर्षण-निवारणं मेलनञ्च — संधौ मानव-सम्बन्धानां कः पाठः?',
      promptEnglish: 'Sandhi proves that when two sounds touch, both adapt slightly so there is no friction. What does this teach us about human relationships?',
      guidingQuestions: [
        'Notice how refusing to adapt creates harsh dissonance in speech and in communities.',
        'How can yielding a little self-will create profound harmony with others?'
      ],
      modelReflection: 'Rigid, unyielding ego causes violent friction wherever it meets another. Sandhi teaches us the sacred art of accommodation: adapting gracefully to the presence of another soul so life becomes an uninterrupted flow of peace.'
    }
  },

  'c-3-6': {
    lessonId: 'c-3-6',
    lessonNumber: '3.6',
    worksheetTitleDevanagari: 'समासाः एवं अर्थ-संक्षेप-विज्ञानम्',
    worksheetTitleEnglish: 'Compounds (Samāsas): Information Compression & Semantic Compounding',
    subtitle: 'Packaging multi-word relational graphs into unified high-density memory tokens',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Define Samāsa ("समसनं समासः" — contraction and unified meaning).',
      'Classify the 4 primary heads of dominance (Pradhānatā): Avyayībhāva, Tatpuruṣa, Dvandva, Bahuvrīhi.',
      'Construct and dissolve compound words through Vigraha Vākya (analytical expansion).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · समास-प्रधानता-निर्धारणम्',
        sectionTitleEnglish: 'Section A · Dominance (Pradhānatā) Classification Drill',
        instructions: 'Identify which element holds primary semantic dominance in each compound.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-6-q1',
            questionNumber: '1',
            promptDevanagari: 'एतेषां समासानां प्रकारं लिखत: (क) राजपुरुषः (ख) रामलक्ष्मणौ (ग) पीताम्बरः (घ) यथाशक्ति',
            promptEnglish: 'Identify the compound type for: (a) rājapuruṣaḥ, (b) rāmalakṣmaṇau, (c) pītāmbaraḥ, (d) yathāśakti.',
            marks: 3,
            optionsOrHints: ['(a) तत्पुरुष (b) द्वन्द्व (c) बहुव्रीहि (d) अव्ययीभाव', '(a) कर्मधारय (b) द्विगु (c) नञ् (d) अलुक्'],
            answer: '(क) राजपुरुषः = तत्पुरुषः (उत्तरपद-प्रधानः) | (ख) रामलक्ष्मणौ = द्वन्द्वः (उभयपद-प्रधानः) | (ग) पीताम्बरः = बहुव्रीहिः (अन्यपद-प्रधानः = श्रीकृष्णः) | (घ) यथाशक्ति = अव्ययीभावः (पूर्वपद-प्रधानः)',
            explanation: 'The 4-fold taxonomy depends on whether meaning rests in the 1st word, 2nd word, both, or an external referent.'
          },
          {
            id: 'ws3-6-q2',
            questionNumber: '2',
            promptDevanagari: '"पीताम्बरम्" एवं "पीताम्बरः" — अनयोः कः महान् भेदः?',
            promptEnglish: 'Contrast the neuter "pītāmbaram" with the masculine "pītāmbaraḥ". How does gender change compound category completely?',
            marks: 2,
            answer: '"पीताम्बरम्" (neuter) is Karmadhāraya = yellow cloth. "पीताम्बरः" (masculine) is Bahuvrīhi = He who wears yellow cloth (Śrī Kṛṣṇa).',
            explanation: 'A change in grammatical gender signals that semantic focus has shifted from the object itself to an outside person.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · विग्रह-वाक्य-विश्लेषणम्',
        sectionTitleEnglish: 'Section B · Analytical Expansion (Vigraha Vākya) Mechanics',
        instructions: 'Explain the grammatical dissolution of compounds and Pāṇinian case dropping.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws3-6-q3',
            questionNumber: '3',
            promptDevanagari: '"सुपो धातुप्रातिपदिकयोः" (२.४.७१) — समासे विभक्ति-लोपः कथं भवति?',
            promptEnglish: 'Explain sūtra 2.4.71 "supo dhātu-prātipadikayoḥ". What happens to the case endings of internal words when they merge?',
            marks: 4,
            answer: 'When words unite into a Samāsa, all internal case endings (Sup) vanish completely: "राज्ञः पुरुषः" -> "राज् + पुरुषः" = राजपुरुषः. Only the final word carries the active outer case marker.',
            explanation: 'Internal inflectional clutter is stripped away, saving memory and speech effort.'
          },
          {
            id: 'ws3-6-q4',
            questionNumber: '4',
            promptDevanagari: '"समर्थः पदविधिः" (२.१.१) — अस्य परिभाषा-सूत्रस्य कः अर्थः?',
            promptEnglish: 'What does the overarching rule "samarthaḥ padavidhiḥ" (2.1.1) mandate before two words can compound?',
            marks: 4,
            optionsOrHints: ['Words must have mutual semantic relevance and coherence (सामर्थ्यम्)', 'Words must rhyme', 'Words must have the same number of syllables'],
            answer: 'Only words that possess organic semantic connectedness (परस्पराकाङ्क्षा / सामर्थ्य) can compound. Random unrelated words cannot form a Samāsa.',
            explanation: 'Pāṇini strictly forbids compounding words that do not share direct syntactical relation.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · विग्रह-रचना-अभ्यासः',
        sectionTitleEnglish: 'Section C · Vigraha Vākya Synthesis Drill',
        instructions: 'Provide the analytical expansion (Vigraha) for each compound.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws3-6-q5',
            questionNumber: '5',
            promptDevanagari: 'विग्रह-वाक्यं लिखत: (क) देशभक्तिः (ख) दशाननः (ग) मातापितरौ (घ) प्रतिदिनम्',
            promptEnglish: 'Write the full analytical expansion for: (a) deśabhaktiḥ, (b) daśānanaḥ, (c) mātāpitarau, (d) pratidinam.',
            marks: 7,
            answer: '(क) देशाय भक्तिः / देशस्य भक्तिः (तत्पुरुषः) | (ख) दश आननानि यस्य सः (बहुव्रीहिः = रावणः) | (ग) माता च पिता च (द्वन्द्वः) | (घ) दिने दिने इति (अव्ययीभावः)',
            explanation: 'Vigraha Vākya reveals the hidden prepositional and case relationships packed inside the compound.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः एवं स्वाध्यायः',
        sectionTitleEnglish: 'Section D · Thinking Connection Journal Prompt',
        instructions: 'Compare Sanskrit compounding to software object-oriented struct packing.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws3-6-q6',
            questionNumber: '6',
            promptDevanagari: 'समास-पद्धतिः आधुनिक-सङ्गणक-शास्त्रस्य "Data Structures" इव कथं कार्यं करोति?',
            promptEnglish: 'How does Sanskrit compounding mirror Struct Packing and Object Encapsulation in modern software engineering?',
            marks: 5,
            answer: 'Instead of passing multiple scattered variables across function calls, a programmer bundles them into a single coherent composite struct. Similarly, Samāsa bundles multiple nouns and case relationships into a single high-bandwidth lexical token, maximizing cognitive cache efficiency.',
            explanation: 'Compounding minimizes syntactic overhead while increasing semantic throughput.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'अनेकेषां पदानां एकपदीभावः — समासे एकात्मतायाः कः सन्देशः?',
      promptEnglish: 'What does the merger of multiple words into one single breath teach us about human unity and higher purpose?',
      guidingQuestions: [
        'Notice how individual words surrender their separate suffixes to achieve a unified, powerful identity.',
        'How does working toward a transcendent goal naturally dissolve petty ego boundaries?'
      ],
      modelReflection: 'When diverse minds align under a common noble mission, individual pretensions fall away. Just as a Samāsa drops internal inflections to express a monumental truth, true brotherhood drops petty divisions to build an enduring civilization.'
    }
  },

  // =========================================================================
  // MODULE 4: Meaning as Output (वाक्यम्)
  // =========================================================================
  'c-4-1': {
    lessonId: 'c-4-1',
    lessonNumber: '4.1',
    worksheetTitleDevanagari: 'सरल-वाक्य-रचना एवं कर्तृ-कर्म-क्रिया-समन्वयः',
    worksheetTitleEnglish: 'Building Simple Sentences: Kartā-Karma-Kriyā Concord & Non-Configurational Syntax',
    subtitle: 'Assembling subject, object, and verb into living communicative flow and decentralized semantic networks',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the fundamental sentence triad: कर्ता (Subject), कर्म (Object), and क्रिया (Verb).',
      'Apply the rules of grammatical agreement (वचन-पुरुष-समन्वयः) between Subject and Verb.',
      'Demonstrate how case inflection enables free word order (non-configurational syntax) without semantic loss.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · वाक्य-घटक-अभिज्ञानम्',
        sectionTitleEnglish: 'Section A · Sentence Component & Kāraka Identification',
        instructions: 'Identify the Kartā (Subject), Karma (Object), and Kriyā (Verb) in the given classical sentences.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws4-1-q1',
            questionNumber: '1',
            promptDevanagari: 'अधोलिखिते वाक्ये कर्ता, कर्म, क्रियापदं च पृथक् कुरुत: "बालकः विद्यालये ग्रन्थं पठति ।"',
            promptEnglish: 'Dissect the sentence into its primary grammatical constituents: "bālakaḥ vidyālaye granthaṁ paṭhati."',
            marks: 3,
            optionsOrHints: ['कर्ता (Subject)', 'कर्म (Direct Object)', 'अधिकरण (Location)', 'क्रिया (Action)'],
            answer: 'कर्ता (Kartā / Subject) = बालकः (Prathamā ekavacanam); कर्म (Karma / Direct Object) = ग्रन्थम् (Dvitīyā ekavacanam); अधिकरण (Adhikaraṇa / Location) = विद्यालये (Saptamī ekavacanam); क्रिया (Kriyā / Action) = पठति (Laṭ-lakāra, Prathama-puruṣa, ekavacanam).',
            explanation: 'Sanskrit assigns grammatical roles via inflectional case endings rather than rigid linear position.'
          },
          {
            id: 'ws4-1-q2',
            questionNumber: '2',
            promptDevanagari: 'पाणिनीय-सूत्रस्य अर्थं लिखत: "स्वतन्त्रः कर्ता" (१.४.५४) ।',
            promptEnglish: 'Explain the definition and significance of Pāṇini sūtra 1.4.54: "svatantraḥ kartā".',
            marks: 2,
            optionsOrHints: ['The agent who acts autonomously without subordination', 'The object that receives action', 'The location of action', 'The instrument used'],
            answer: 'The entity who acts autonomously and exercises principal agency in the performance of an action is defined as the Kartā (Subject/Agent).',
            explanation: 'The Kartā is the sovereign focal point of the sentence to which all other participants (Kārakas) relate.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · वचन-पुरुष-समन्वय-नियमः',
        sectionTitleEnglish: 'Section B · Concord & Subject-Verb Agreement Mechanics',
        instructions: 'Apply the strict rules of grammatical agreement in Person (पुरुष) and Number (वचन).',
        totalMarks: 8,
        questions: [
          {
            id: 'ws4-1-q3',
            questionNumber: '3',
            promptDevanagari: 'उचित-क्रियापदेन रिक्तस्थानं पूरयत: (क) छात्राः विद्यालयं _________ (गम् धातुः) । (ख) युवां किं _________ (पठ् धातुः)?',
            promptEnglish: 'Fill in the blanks with the correct verb forms matching subject Person and Number: (a) chātrāḥ vidyālayaṁ _________ (√gam) (b) yuvāṁ kiṁ _________ (√paṭh)?',
            marks: 4,
            optionsOrHints: ['(a) गच्छति / गच्छतः / गच्छन्ति', '(b) पठसि / पठथः / पठथ'],
            answer: '(a) छात्राः (Third Person Plural) → गच्छन्ति (gacchanti); (b) युवां (Second Person Dual) → पठथः (paṭhathaḥ).',
            explanation: 'Concord rule: The finite verb must always match the Kartā in both Puruṣa (Person) and Vacana (Number).'
          },
          {
            id: 'ws4-1-q4',
            questionNumber: '4',
            promptDevanagari: 'कथं "बालकः पुस्तकं पठति", "पुस्तकं बालकः पठति", "पठति बालकः पुस्तकम्" — एते त्रयः प्रयोगाः समानाः सन्ति?',
            promptEnglish: 'Explain why these three permutations of the same words all convey the exact same grammatical meaning in Sanskrit.',
            marks: 4,
            answer: 'Because Sanskrit is a synthetic, non-configurational language where semantic relations are carried by case affixes (सुप्-प्रत्ययाः) rather than word order. In all three sentences, "बालकः" carries the Nominative ending (-ः) identifying it as the agent, "पुस्तकम्" carries the Accusative ending (-म्) identifying it as the object, and "पठति" carries the singular third-person verbal suffix (-ति). The compiler resolves the dependency graph identically regardless of linear order.',
            explanation: 'English relies on rigid Word Order (S-V-O: "Boy reads book" ≠ "Book reads boy"), whereas Sanskrit utilizes decentralized type markers on each token.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · व्यावहारिक-वाक्य-रचना-अभ्यासः',
        sectionTitleEnglish: 'Section C · Applied Syntax Construction & Translation Drill',
        instructions: 'Translate and construct complete Sanskrit sentences across Singular, Dual, and Plural forms.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws4-1-q5',
            questionNumber: '5',
            promptDevanagari: 'संस्कृते अनुवादं कुरुत: (१) Two boys read two books in the Gurukul. (२) All the students speak Sanskrit with joy.',
            promptEnglish: 'Translate into grammatically precise Sanskrit: (1) Two boys read two books in the Gurukul. (2) All the students speak Sanskrit with joy.',
            marks: 7,
            answer: '(१) बालकौ गुरुकुले ग्रन्थौ (पुस्तके) पठतः । (bālakau gurukule granthau paṭhataḥ) [बालकौ = Dual Subject; गुरुकुले = Locative; ग्रन्थौ = Dual Object; पठतः = Dual Verb]. (२) सर्वे छात्राः आनन्देन संस्कृतं वदन्ति । (sarve chātrāḥ ānandena saṁskṛtaṁ vadanti) [सर्वे छात्राः = Plural Subject; आनन्देन = Instrumental of manner; संस्कृतम् = Accusative Object; वदन्ति = Plural Verb].',
            explanation: 'Demonstrates dual and plural noun-verb concord alongside oblique cases (Locative and Instrumental).'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: सङ्गणकीय-वाक्य-संरचना (AST)',
        sectionTitleEnglish: 'Section D · Thinking Connection: Abstract Syntax Trees & Linguistic Compilers',
        instructions: 'Reflect on how Sanskrit syntax functions like an Abstract Syntax Tree in computer science.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws4-1-q6',
            questionNumber: '6',
            promptDevanagari: 'कथं संस्कृत-वाक्य-रचना सङ्गणक-शास्त्रस्य "Abstract Syntax Tree" इत्यनेन समाना वर्तते?',
            promptEnglish: 'How does Sanskrit’s inflection-driven sentence structure parallel an Abstract Syntax Tree (AST) in modern compiler design?',
            marks: 5,
            answer: 'In compiler architecture, source code is parsed into an AST where nodes represent operators and operands whose relationship is determined by explicit data types rather than linear layout. Sanskrit functions as a living natural AST: every word carries typed headers (Vibhakti and Tiṅ affixes). The listener’s brain compiles the sentence into a relational dependency graph (Kāraka network) without being constrained by sequential buffer ordering.',
            explanation: 'Sanskrit sentences are decentralized graphs rather than linear queues.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'वाक्ये कर्तुः क्रियायाश्च समन्वयः — अस्माकं विचारे कर्मणि च कः सम्बन्धः?',
      promptEnglish: 'What does the mandatory concord between Subject and Action teach us about conscious living?',
      guidingQuestions: [
        'Notice how a singular subject with a plural verb creates immediate cognitive discord.',
        'How does misalignment between what you intend (कर्ता) and what you actually do (क्रिया) create inner suffering?'
      ],
      modelReflection: 'When speech lacks concord, meaning collapses into chaos. In human life, when our conscious self (Kartā) promises one thing but our habits (Kriyā) execute another, inner peace is shattered. Sanskrit grammar demands total harmony between the doer and the deed.'
    }
  },

  // =========================================================================
  // MODULE 4, Lesson 4.2: Pañcatantra & Hitopadeśa Stories
  // =========================================================================
  'c-4-2': {
    lessonId: 'c-4-2',
    lessonNumber: '4.2',
    worksheetTitleDevanagari: 'पञ्चतन्त्र-कथाः · नीति-कथा एवं क्त्वा-ल्यप्-प्रत्ययाः',
    worksheetTitleEnglish: 'Pañcatantra & Hitopadeśa Stories: Narrative Syntax & Gerund Participles',
    subtitle: 'Mastering prior-action participles (Ktvā & Lyap) through timeless animal fables of statecraft',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the indeclinable past gerund suffixes: -क्त्वा (-tvā) and -ल्यप् (-ya).',
      'Apply Pāṇini sūtra 3.4.21 (समानकर्तृकयोः पूर्वकाले) to chain sequential actions in narrative prose.',
      'Analyze the famous fable of the lion and the rabbit to extract moral discernment (Viveka).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · क्त्वा-ल्यप्-प्रत्यय-अभिज्ञानम्',
        sectionTitleEnglish: 'Section A · Gerund Suffix Identification & Usage Rule',
        instructions: 'Identify whether the following verbal forms use Ktvā or Lyap, and state the governing rule.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws4-2-q1',
            questionNumber: '1',
            promptDevanagari: 'एतेषां रूपाणां प्रत्ययं लिखत: (क) गत्वा (ख) आगत्य (ग) दृष्ट्वा (घ) विचिन्त्य ।',
            promptEnglish: 'Identify the gerund suffix (Ktvā or Lyap) for each form: (a) gatvā (b) āgatya (c) dṛṣṭvā (d) vicintya.',
            marks: 3,
            optionsOrHints: ['(a) क्त्वा (b) ल्यप् (c) क्त्वा (d) ल्यप्', 'सर्वेषु क्त्वा', 'सर्वेषु ल्यप्'],
            answer: '(क) गत्वा = √गम् + क्त्वा (tvā); (ख) आगत्य = आ + √गम् + ल्यप् (ya); (ग) दृष्ट्वा = √दृश् + क्त्वा (tvā); (घ) विचिन्त्य = वि + √चिन्त् + ल्यप् (ya).',
            explanation: 'Fundamental rule: An un-prefixed root takes -क्त्वा (-tvā). A root preceded by an Upasarga (prefix) takes -ल्यप् (-ya).'
          },
          {
            id: 'ws4-2-q2',
            questionNumber: '2',
            promptDevanagari: 'पाणिनीय-सूत्रस्य अर्थं लिखत: "समानकर्तृकयोः पूर्वकाले" (३.४.२१) ।',
            promptEnglish: 'State the rule of Pāṇini sūtra 3.4.21: "samānakartṛkayoḥ pūrvakāle".',
            marks: 2,
            optionsOrHints: ['When the same agent performs two actions, the earlier action takes Ktvā/Lyap', 'When two different agents act', 'Used only for future tense', 'Used for passive voice only'],
            answer: 'When one and the same subject (समानकर्तृक) performs two sequential actions, the verbal root representing the prior action (पूर्वकाल) receives the suffix Ktvā (or Lyap).',
            explanation: 'Example: सः गृहं गत्वा भोजनं करोति (Having gone home, he eats food. The subject "he" does both).'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · धातु-रूपान्तरण-अभ्यासः',
        sectionTitleEnglish: 'Section B · Root Morphological Transformations',
        instructions: 'Derive the correct gerund forms by attaching Ktvā or Lyap to the given roots.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws4-2-q3',
            questionNumber: '3',
            promptDevanagari: 'प्रत्ययं योजयित्वा रूपं रचयत: (१) पा + क्त्वा (२) कृ + क्त्वा (३) प्र + णम् + ल्यप् (४) उत् + स्था + ल्यप् ।',
            promptEnglish: 'Derive the correct participle form: (1) √pā + ktvā (2) √kṛ + ktvā (3) pra + √nam + lyap (4) ut + √sthā + lyap.',
            marks: 4,
            answer: '(१) पीत्वा (pītvā - having drunk); (२) कृत्वा (kṛtvā - having done); (३) प्रणम्य (praṇamya - having bowed); (४) उत्थाय (utthāya - having stood up).',
            explanation: 'Note the internal vowel changes: pā → pītvā; sthā with prefix ut → utthāya.'
          },
          {
            id: 'ws4-2-q4',
            questionNumber: '4',
            promptDevanagari: 'पञ्चतन्त्र-वाक्ये क्रिया-क्रमं दर्शयत: "शशकः सिंहं कूप-समीपं नीत्वा तस्य प्रतिबिम्बं दर्शयति ।"',
            promptEnglish: 'Trace the sequential chain of actions in this Pañcatantra excerpt: "śaśakaḥ siṁhaṁ kūpa-samīpaṁ nītvā tasya pratibimbaṁ darśayati."',
            marks: 4,
            answer: 'Action 1 (Prior action with Ktvā): नीत्वा (nītvā = having led/taken the lion near the well); Action 2 (Principal finite verb): दर्शयति (darśayati = shows him his reflection). The single agent (शशकः = the hare) executes both actions sequentially.',
            explanation: 'Demonstrates how Ktvā compresses complex compound sentences into a single flowing narrative clause.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · पञ्चतन्त्र-नीति-श्लोक-विश्लेषणम्',
        sectionTitleEnglish: 'Section C · Fable Śloka Parsing & Strategic Wisdom',
        instructions: 'Analyze the core moral śloka of the fable across Sandhi, grammar, and ethical strategy.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws4-2-q5',
            questionNumber: '5',
            promptDevanagari: 'अस्य श्लोकस्य पदच्छेदं कृत्वा भावार्थं लिखत: "उपायेन हि यच्छक्यं न तच्छक्यं पराक्रमैः । शृगालेन हतो व्याघ्रो गतेन पङ्कसङ्कटे ॥"',
            promptEnglish: 'Perform Padaccheda and explain the strategic meaning of this Hitopadeśa verse: "upāyena hi yacchakyaṁ na tacchakyaṁ parākramaiḥ..."',
            marks: 7,
            answer: 'पदच्छेदः: उपायेन + हि + यत् + शक्यम् + न + तत् + शक्यम् + पराक्रमैः । शृगालेन + हतः + व्याघ्रः + गतेन + पङ्कसङ्कटे ॥\nअन्वयः एवं भावार्थः: यत् कार्यम् उपायेन शक्यम् (हि), तत् कार्यं पराक्रमैः न शक्यम् । पङ्कसङ्कटे गतेन शृगालेन व्याघ्रः हतः ।\nMeaning: What can be accomplished through clever strategy and discernment cannot be achieved by sheer brute force alone; just as a jackal trapped in a quagmire was able to vanquish a ferocious tiger through intelligence.',
            explanation: 'The cardinal doctrine of Nīti-Śāstra: Intellect (बुद्धिः) and strategic foresight (उपायः) always prevail over blind physical mass.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: विवेकः एवं भावात्मक-प्रज्ञा (EQ)',
        sectionTitleEnglish: 'Section D · Thinking Connection: Viveka & Emotional Intelligence',
        instructions: 'Synthesize the psychological depth of Sanskrit narrative pedagogy.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws4-2-q6',
            questionNumber: '6',
            promptDevanagari: 'कथं पञ्चतन्त्र-कथाः केवलं मनोरञ्जनं न भूत्वा "भावात्मक-प्रज्ञायाः" (Emotional Intelligence) शिक्षण-माध्यमं भवन्ति?',
            promptEnglish: 'How do the animal fables of Pañcatantra serve as the world’s earliest curriculum for emotional intelligence (EQ) and decision-making?',
            marks: 5,
            answer: 'Paṇḍita Viṣṇuśarman engineered the Pañcatantra to train immature princes in statecraft within six months by using allegorical animal avatars to mirror archetypes of human psychology: flattery, arrogance, greed, and true friendship. By observing the consequences of impulsive reactions versus reflective discernment (Viveka) in a story, the learner acquires high-stakes decision-making models without suffering real-world casualties.',
            explanation: 'Narrative pedagogy embeds ethical heuristics into long-term intuitive memory.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'उपायेन हि यच्छक्यं न तच्छक्यं पराक्रमैः — बलं बुद्धिश्च, कयोः श्रेष्ठता?',
      promptEnglish: 'When does raw force become a liability, and why is quiet discernment the supreme shield?',
      guidingQuestions: [
        'Notice how the arrogant lion in the fable destroyed himself by attacking his own reflection in the water.',
        'How often do our own aggressive reactions arise from fighting illusions generated by our own ego?'
      ],
      modelReflection: 'The lion was defeated not by the hare’s strength, but by his own pride and lack of self-awareness. When we lack Viveka, our own formidable power becomes the trap that destroys us. True strength resides in the calm, unagitated mind that sees reality as it is.'
    }
  },

  // =========================================================================
  // MODULE 4, Lesson 4.3: Subhāṣitas: Wisdom in One Verse
  // =========================================================================
  'c-4-3': {
    lessonId: 'c-4-3',
    lessonNumber: '4.3',
    worksheetTitleDevanagari: 'सुभाषितानि · एकाक्षरी विवेकः एवं पदच्छेद-अन्वय-पद्धतिः',
    worksheetTitleEnglish: 'Subhāṣitas: Wisdom in One Verse, Padaccheda & Anvaya Translation Grid',
    subtitle: 'Decoupling metered poetry into prose syntax: the unbroken progression from Vidyā to Sukham',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the two-stage poetic decoding algorithm: पदच्छेदः (Word Splitting) and अन्वयः (Prose Reordering).',
      'Trace the causal progression of human flourishing: विद्या → विनयः → पात्रता → धनम् → धर्मः → सुखम्.',
      'Explain the literary and psychological definition of poetry: "वाक्यं रसात्मकं काव्यम्" (Sāhitya-Darpaṇa 1.3).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · सुभाषित-परिभाषा एवं पदच्छेदः',
        sectionTitleEnglish: 'Section A · Subhāṣita Anatomy & Padaccheda Drill',
        instructions: 'Split the sandhi compounds of the classical Subhāṣita to expose the isolated grammatical tokens.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws4-3-q1',
            questionNumber: '1',
            promptDevanagari: '"सुभाषितम्" इत्यस्य शब्दस्य व्युत्पत्तिं लिखत ।',
            promptEnglish: 'What is the etymological meaning of the word "Subhāṣita" (सु + भाषितम्)?',
            marks: 2,
            optionsOrHints: ['सु (noble/well) + भाषितम् (spoken statement)', 'Difficult poetry', 'Vedic ritual formula', 'Long story'],
            answer: 'सु (noble, auspicious, well) + भाषितम् (spoken utterance) = A beautifully crafted, eloquent aphorism of enduring ethical wisdom.',
            explanation: 'Subhāṣitas are condensed psychological and philosophical gems preserved in two-line metered verses.'
          },
          {
            id: 'ws4-3-q2',
            questionNumber: '2',
            promptDevanagari: 'अस्य श्लोकार्धस्य पदच्छेदं कुरुत: "विद्या ददाति विनयं विनयाद्याति पात्रताम् ।"',
            promptEnglish: 'Split the sandhi of the first half-verse: "vidyā dadāti vinayaṁ vinayād yāti pātratām |"',
            marks: 3,
            optionsOrHints: ['विद्या + ददाति + विनयम् + विनयात् + याति + पात्रताम्', 'विद्याददाति + विनयं + विनयाद्याति', 'विद्या + ददाति + विनयात्'],
            answer: 'विद्या (Subject) + ददाति (Verb) + विनयम् (Object) । विनयात् (Ablative Source) + याति (Verb) + पात्रताम् (Object) ।',
            explanation: 'Note the Jashtva Sandhi: विनयात् + याति → विनयाद्याति (t shifts to voiced d before semi-vowel y).'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · पञ्चपदीय-क्रम-विश्लेषणम्',
        sectionTitleEnglish: 'Section B · Grammatical Morphology & The 5-Step Causal Chain',
        instructions: 'Analyze the Ablative case progression across the full stanza.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws4-3-q3',
            questionNumber: '3',
            promptDevanagari: 'अस्मिन् श्लोके पञ्चमी-विभक्तेः कानि कानि पदानि सन्ति? तेषां कः क्रमः?',
            promptEnglish: 'Identify the sequence of Ablative (5th Case) nouns that form the golden ladder of human development in this verse.',
            marks: 4,
            optionsOrHints: ['विनयात्, पात्रत्वात्, धनात्', 'विद्या, विनय, पात्र', 'पात्रताम्, सुखम्'],
            answer: '१. विनयात् (from humility) → २. पात्रत्वात् (from capability/worthiness) → ३. धनात् (from righteous wealth).',
            explanation: 'The Ablative case (पञ्चमी) denotes the foundational source from which the next stage of maturity inevitably emerges.'
          },
          {
            id: 'ws4-3-q4',
            questionNumber: '4',
            promptDevanagari: 'साहित्यदर्पणस्य सूत्रस्य कः अर्थः: "वाक्यं रसात्मकं काव्यम्" (१.३)?',
            promptEnglish: 'Explain the famous aesthetic definition by Viśvanātha: "vākyaṁ rasātmakaṁ kāvyam".',
            marks: 4,
            answer: 'A sentence or composition whose animating soul is "Rasa" (aesthetic taste, deep emotional and intellectual resonance) is defined as true poetry (Kāvya). Words without Rasa are dry encyclopedic data; words suffused with Rasa awaken living insight in the heart of the listener.',
            explanation: 'Subhāṣitas succeed because they fuse grammatical precision with aesthetic delight.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · पूर्ण-अन्वयः एवं भावार्थ-संयोजनम्',
        sectionTitleEnglish: 'Section C · Complete Anvaya Reordering & Diligence Analysis',
        instructions: 'Perform the complete Anvaya prose reordering of the famous perseverance verse.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws4-3-q5',
            questionNumber: '5',
            promptDevanagari: 'अस्य श्लोकस्य अन्वयं भावार्थं च लिखत: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः । न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः ॥"',
            promptEnglish: 'Provide the complete prose Anvaya and philosophical synthesis of this stanza: "udyamena hi sidhyanti kāryāṇi na manorathaiḥ..."',
            marks: 7,
            answer: 'पदच्छेदः: उद्यमेन + हि + सिध्यन्ति + कार्याणि + न + मनोरथैः । न + हि + सुप्तस्य + सिंहस्य + प्रविशन्ति + मुखे + मृगाः ॥\nअन्वयः: कार्याणि उद्यमेन हि सिध्यन्ति, मनोरथैः न (सिध्यन्ति) । सुप्तस्य सिंहस्य मुखे मृगाः न हि प्रविशन्ति ॥\nGrammatical Analysis: उद्यमेन (Instrumental singular: by effort); कार्याणि (Nominative plural neuter subject); सिध्यन्ति (Verb: are accomplished); मनोरथैः (Instrumental plural: by daydreams); सुप्तस्य सिंहस्य (Genitive singular: of a sleeping lion); मृगाः (Subject: deer); मुखे (Locative: into the mouth); प्रविशन्ति (Verb: do enter).\nSynthesis: Works are accomplished through disciplined exertion alone, never through idle wishful thinking. Even the king of the forest (the lion) must actively hunt; deer do not casually walk into the mouth of a slumbering predator.',
            explanation: 'Anvaya restores poetic inversion back into logical Subject → Object → Verb order.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: स्मृति-सूत्राणि (Mnemonic Cognitive Scripts)',
        sectionTitleEnglish: 'Section D · Thinking Connection: Mnemonics as Compressed Cognitive Scripts',
        instructions: 'Reflect on the cognitive psychology of memorizing metered Subhāṣitas.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws4-3-q6',
            questionNumber: '6',
            promptDevanagari: 'कथं कण्ठस्थीकृतानि सुभाषितानि सङ्कट-काले "मानसिक-दिशानिर्देशकरूपेण" (Cognitive Navigators) कार्यं कुर्वन्ति?',
            promptEnglish: 'How do memorized Subhāṣitas function as high-bandwidth cognitive scripts during ethical ambiguity or stress?',
            marks: 5,
            answer: 'Cognitive psychology demonstrates that human working memory collapses under acute crisis or decision fatigue. A metered, rhymed Subhāṣita acts as a pre-compiled cognitive script stored in episodic memory. When faced with lethargy or ethical compromise, reciting a two-line verse like "उद्यमेन हि सिध्यन्ति" instantly overrides emotional hesitation, reorienting the executive prefrontal cortex toward constructive action without exhausting willpower.',
            explanation: 'Subhāṣitas are ancient mental algorithms for emotional self-regulation.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'विद्या ददाति विनयं — कथं वास्तविकं ज्ञानम् अहङ्कारं नाशयति?',
      promptEnglish: 'Why does genuine wisdom invariably produce humility (विनयः) rather than arrogance?',
      guidingQuestions: [
        'Notice how half-knowledge inflates self-importance and argumentative pedantry.',
        'Why does gazing into the vast ocean of truth make the true scholar feel delightfully small and humble?'
      ],
      modelReflection: 'The shallow pond makes a loud splash when a pebble drops, but the fathomless ocean absorbs giant rivers in tranquil silence. True learning (Vidyā) reveals the infinite expanse of the unknown, instantly dissolving the foolish illusion of individual pride. In that humility alone, real nobility is born.'
    }
  },

  // =========================================================================
  // MODULE 4, Lesson 4.4: Reading and Reciting an Anuṣṭubh Verse
  // =========================================================================
  'c-4-4': {
    lessonId: 'c-4-4',
    lessonNumber: '4.4',
    worksheetTitleDevanagari: 'अनुष्टुप्-छन्दः एवं पठन-पद्धतिः (३२-अक्षर-मात्रा)',
    worksheetTitleEnglish: 'Reading and Reciting the 32-Syllable Anuṣṭubh Meter & Pingala Chandas Scanning',
    subtitle: 'The universal rhythmic heartbeat of the Gītā and Epics: mastering the 5th short and 6th long syllable rule',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the structural anatomy of the Anuṣṭubh meter: 4 Pādas × 8 syllables = 32 Akṣaras.',
      'Scan syllables into Laghu (लघु ˘) and Guru (गुरु ¯) weights under Pingala’s Chandas-Śāstra rules.',
      'Apply the universal rule: "श्लोके षष्ठं गुरु ज्ञेयं सर्वत्र लघु पञ्चमम्" and recite with physiological coherence.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · अनुष्टुप्-छन्दसः आधार-नियमाः',
        sectionTitleEnglish: 'Section A · Structural Metrics & The Universal Syllable Rule',
        instructions: 'State the numerical parameters and governing rule of the classical Anuṣṭubh meter.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws4-4-q1',
            questionNumber: '1',
            promptDevanagari: 'अनुष्टुप्-छन्दसि कति पादाः कति च कुल-अक्षराणि भवन्ति?',
            promptEnglish: 'How many quarters (Pādas) and total syllables (Akṣaras) compose a standard Anuṣṭubh śloka?',
            marks: 2,
            optionsOrHints: ['४ पादाः, ३२ अक्षराणि (4 quarters of 8 syllables each)', '२ पादाः, १६ अक्षराणि', '४ पादाः, ४४ अक्षराणि'],
            answer: '४ पादाः (Four quarters of 8 syllables each) = ३२ कुल-अक्षराणि (32 total syllables).',
            explanation: 'The Anuṣṭubh is the most prolific meter in Sanskrit civilization, framing the Rāmāyaṇa, Mahābhārata, Purāṇas, and Gītā.'
          },
          {
            id: 'ws4-4-q2',
            questionNumber: '2',
            promptDevanagari: 'छन्दःशास्त्रस्य प्रसिद्धं सूत्रं लिखत: "श्लोके षष्ठं गुरु ज्ञेयं..."',
            promptEnglish: 'Complete the foundational Pingala metric verse that defines syllable weights in every quarter of an Anuṣṭubh.',
            marks: 3,
            optionsOrHints: ['श्लोके षष्ठं गुरु ज्ञेयं सर्वत्र लघु पञ्चमम् । द्विचतुष्पादयोर्ह्रस्वं सप्तमं दीर्घमन्ययोः ॥', 'उपायेन हि यच्छक्यं...', 'कर्मण्येवाधिकारस्ते...'],
            answer: 'श्लोके षष्ठं गुरु ज्ञेयं सर्वत्र लघु पञ्चमम् । द्विचतुष्पादयोर्ह्रस्वं सप्तमं दीर्घमन्ययोः ॥\nMeaning: In an Anuṣṭubh verse, the 6th syllable is always long (Guru), the 5th syllable is universally short (Laghu); the 7th syllable is short (Hrasva) in the 2nd & 4th quarters, and long (Dīrgha) in the 1st & 3rd quarters.',
            explanation: 'This alternating weight creates the hypnotic, balanced cadence unique to the epic śloka.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · लघु-गुरु-प्रस्तार-अभ्यासः (Metrical Scanning)',
        sectionTitleEnglish: 'Section B · Syllable Weight Scanning (Laghu & Guru)',
        instructions: 'Scan the syllables of the famous Bhagavad Gītā stanza into short and long weights.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws4-4-q3',
            questionNumber: '3',
            promptDevanagari: 'कदा ह्रस्व-स्वरः गुरुः (दीर्घः) भवति? त्रीन् नियमान् लिखत ।',
            promptEnglish: 'When does an inherently short vowel (Hrasva) become heavy/long (Guru) in Chandas metrics? State the 3 conditions.',
            marks: 4,
            optionsOrHints: ['संयोगे परे, अनुस्वारे परे, विसर्गे परे, पादान्ते वा'],
            answer: 'A short vowel becomes Guru (heavy ¯) when: (१) Followed by a conjunct consonant (संयोगे परे: e.g. "ध" in धर्मस्य); (२) Followed by an Anusvāra (अनुस्वारे परे: e.g. "सं"); (३) Followed by a Visarga (विसर्गे परे: e.g. "तः"); (४) Optionally at the end of a Pāda (पादान्ते वा).',
            explanation: 'The classic rule: सानुस्वारश्च दीर्घश्च विसर्गी च गुरुर्भवेत् । वर्णः संयोगपूर्वश्च तथा पादान्तगोऽपि वा ॥'
          },
          {
            id: 'ws4-4-q4',
            questionNumber: '4',
            promptDevanagari: 'अस्य पादस्य अक्षराणि गणयित्वा ५, ६, ७ तम-अक्षराणां मानं लिखत: "य॒दा य॒दा हि ध॒र्मस्य॑"',
            promptEnglish: 'Scan the first Pāda of Gītā 4.7: "yadā yadā hi dharmasya" — count all 8 syllables and verify positions 5, 6, and 7.',
            marks: 4,
            answer: 'Syllables 1-8: य(1) दा(2) य(3) दा(4) हि(5) धर्(6) म(7) स्य(8) ।\nPosition 5: "हि" = लघु (Laghu ˘ - Short vowel);\nPosition 6: "धर्" = गुरु (Guru ¯ - "ध" is short but followed by conjunct "र्म");\nPosition 7: "म" = In Pāda 1 it should be long (दीर्घमन्ययोः); here "स" follows making the cluster heavy.\nCadence: Matches the universal 5-6-7 metric blueprint (˘ ¯ ¯).',
            explanation: 'Verifies the empirical exactness of Vyāsa’s metered poetry.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · पाठ-पद्धतिः एवं विराम-विधानम्',
        sectionTitleEnglish: 'Section C · Recitation Technique, Cadence & Breath Phrasing',
        instructions: 'Explain the proper acoustic breathing and cadence rules for chanting an Anuṣṭubh śloka.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws4-4-q5',
            questionNumber: '5',
            promptDevanagari: 'अनुष्टुप्-श्लोक-पाठ-समये विरामस्य (Danda । एवं ॥) कः नियमः? कथं श्वास-सन्तुलनं भवति?',
            promptEnglish: 'What are the breathing and pause rules for the single danda (।) and double danda (॥) during Anuṣṭubh recitation?',
            marks: 7,
            answer: 'Recitation Architecture:\n१. First line (Pādas 1 & 2): Chanted in a single steady exhalation of 16 syllables (8 + 8). At the single danda (।), take a calm, silent pause of 1 beat without gasping.\n२. Second line (Pādas 3 & 4): Chanted in the second exhalation of 16 syllables. At the double danda (॥), take a full 2-beat deep abdominal inhale.\n३. The cadence forms a natural 6-breaths-per-minute respiratory rhythm (approximately 10 seconds per complete 32-syllable stanza).',
            explanation: 'Converts reading into effortless Prāṇāyāma (breath regulation).'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: ०.१ हर्ट्ज़-हृद्-लय-समन्वयः (Cardiac Coherence)',
        sectionTitleEnglish: 'Section D · Thinking Connection: 0.1 Hz Heart-Rate Variability & Vagal Entrainment',
        instructions: 'Synthesize the cardiovascular and neurological discoveries of metered recitation.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws4-4-q6',
            questionNumber: '6',
            promptDevanagari: 'ब्रिटिश-मेडिकल-जर्नल (BMJ) इत्यस्य अनुसन्धानेन कथं सिद्धं यत् अनुष्टुप्-पाठः हृद्-स्पन्दनं नाडी-तन्त्रं च सन्तुलयति?',
            promptEnglish: 'How did landmark cardiovascular research in the British Medical Journal (BMJ) prove that metered recitation induces 0.1 Hz cardiac coherence?',
            marks: 5,
            answer: 'A celebrated BMJ cardiology study (Bernardi et al., 2001) measured cerebral blood flow, baroreflex sensitivity, and respiratory sinus arrhythmia during metered recitation. The study proved that chanting stanzas structured in 6-breaths-per-minute cycles (identical to the 32-syllable Anuṣṭubh meter) naturally entrains human respiration to the 0.1 Hz inherent blood-pressure oscillation rhythm (Mayer waves), maximizing heart-rate variability (HRV), oxygenating tissues, and calming the autonomic nervous system.',
            explanation: 'The Anuṣṭubh meter is a biological biofeedback instrument disguised as spiritual verse.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'छन्दः पादौ तु वेदस्य — कथं लयः (Rhythm) अशान्तं मनः शान्तं करोति?',
      promptEnglish: 'Why is meter (Chandas) called the very feet of knowledge, and how does rhythm quiet a turbulent mind?',
      guidingQuestions: [
        'Notice how chaotic thinking is always accompanied by irregular, shallow breathing.',
        'When speech submits to the disciplined rhythm of 8-8-8-8 syllables, where does anxiety go?'
      ],
      modelReflection: 'Anxiety cannot survive inside a steady rhythm. When your breath and voice step into the 32-syllable temple of the Anuṣṭubh, your chaotic thoughts are swept into the cosmic pulse that has carried the words of Krishna, Vālmīki, and Vyāsa for thousands of years. The mind dissolves into spacious peace.'
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
  // MODULE 5, Lesson 5.2: Vedic Maths Sutras: Fast Mental Computing
  // =========================================================================
  'c-5-2': {
    lessonId: 'c-5-2',
    lessonNumber: '5.2',
    worksheetTitleDevanagari: 'वैदिक-गणित-सूत्राणि · द्रुत-मानसिक-गणना एवं प्रमाणानि',
    worksheetTitleEnglish: 'Vedic Mathematics: 16 Mental Algorithms, Fast Computing & Algebraic Proofs',
    subtitle: 'Arithmetic as spatial pattern recognition: Ekādhikena Pūrveṇa, Nikhilam & Ūrdhva-Tiryagbhyām',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the 3 foundational Vedic calculation sūtras: Ekādhikena Pūrveṇa, Nikhilam Navataścaramaṁ Daśataḥ, and Ūrdhva-Tiryagbhyām.',
      'Square any number ending in 5 mentally within 2 seconds using algebraic prefix multiplication.',
      'Execute multi-digit crosswise multiplication and base-100 arithmetic without scratchpad carrying.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · सूत्र-परिचयः एवं गणितीय-उद्देश्यम्',
        sectionTitleEnglish: 'Section A · Sūtra Identification & Mathematical Mapping',
        instructions: 'Match the ancient Sanskrit mathematical formulas to their operational algorithms.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws5-2-q1',
            questionNumber: '1',
            promptDevanagari: 'एतेषां सूत्राणां शब्दार्थं गणितीय-प्रयोगं च योजयत: (क) एकाधिकेन पूर्वेण (ख) निखिलं नवतश्चरमं दशतः (ग) ऊर्ध्वतिर्यग्भ्याम् ।',
            promptEnglish: 'Provide the literal meaning and primary mathematical operation of these 3 foundational sūtras: (a) ekādhikena pūrveṇa (b) nikhilaṁ navataścaramaṁ daśataḥ (c) ūrdhva-tiryagbhyām.',
            marks: 3,
            optionsOrHints: [
              '(a) By one more than the previous; squaring ending in 5 (b) All from 9 and last from 10; base-10ⁿ multiplication (c) Vertically and crosswise; universal multi-digit multiplication',
              'All three do addition only',
              'Used only for geometry'
            ],
            answer: '(क) एकाधिकेन पूर्वेण = "By one more than the previous one" → Instant squaring of numbers ending in 5; (ख) निखिलं नवतश्चरमं दशतः = "All from 9 and the last from 10" → Rapid subtraction from powers of 10 and multiplication of numbers near base 10ⁿ; (ग) ऊर्ध्वतिर्यग्भ्याम् = "Vertically and crosswise" → Universal multi-digit multiplication and polynomial products.',
            explanation: 'These sūtras convert sequential carrying algorithms into parallel spatial visual matrices.'
          },
          {
            id: 'ws5-2-q2',
            questionNumber: '2',
            promptDevanagari: 'वैदिक-गणित-सूत्राणां पुनरुद्धारः केन कृतः कदा च?',
            promptEnglish: 'Who rediscovered the 16 Vedic mathematical sūtras and during what historical window?',
            marks: 2,
            optionsOrHints: ['Swami Bharati Krishna Tirtha (1911–1918)', 'Aryabhata (499 CE)', 'Bhaskaracharya (1150 CE)', 'Ramanujan (1920)'],
            answer: 'Swami Bharati Krishna Tirtha (Śaṅkarācārya of Govardhana Maṭha, Puri) reconstructed and verified the 16 mathematical sūtras between 1911 and 1918 from appendices of the Atharvaveda Parishishta.',
            explanation: 'His pioneering work proved that ancient Vedic scholars treated calculation as intuitive mental geometry rather than mechanical paper drudgery.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · द्रुत-मानसिक-वर्ग-अभ्यासः (Mental Squaring Drill)',
        sectionTitleEnglish: 'Section B · Ekādhikena Pūrveṇa Mental Squaring Drill',
        instructions: 'Compute the squares mentally in 2 seconds each and write the 2-step algebraic proof.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws5-2-q3',
            questionNumber: '3',
            promptDevanagari: '"एकाधिकेन पूर्वेण" सूत्रेण एतेषां वर्गाणां मूल्यं लिखत: (१) ३५² (२) ७५² (३) ८५² (४) १०५² ।',
            promptEnglish: 'Calculate the squares mentally using "Ekādhikena Pūrveṇa": (1) 35² (2) 75² (3) 85² (4) 105².',
            marks: 4,
            answer: '(१) ३५²: Prefix 3 × (3+1) = 12; Suffix 5² = 25 → 1225\n(२) ७५²: Prefix 7 × (7+1) = 56; Suffix 5² = 25 → 5625\n(३) ८५²: Prefix 8 × (8+1) = 72; Suffix 5² = 25 → 7225\n(४) १०५²: Prefix 10 × (10+1) = 110; Suffix 5² = 25 → 11025.',
            explanation: 'Algebraic proof: (10a + 5)² = 100a² + 100a + 25 = 100a(a + 1) + 25. The prefix is always a × (a + 1).'
          },
          {
            id: 'ws5-2-q4',
            questionNumber: '4',
            promptDevanagari: '"निखिलं नवतश्चरमं दशतः" सूत्रेण आधार-१०० सङ्ख्यानां गुणनं कुरुत: (क) ९८ × ९७ (ख) ९६ × ९४ ।',
            promptEnglish: 'Multiply using Nikhilam Base-100 mental algorithm: (a) 98 × 97 (b) 96 × 94.',
            marks: 4,
            answer: '(क) ९८ × ९७ (Base 100):\nDeficits from 100: 98 is (-02), 97 is (-03).\nLeft-hand part: 98 - 03 = 95 (or 97 - 02 = 95).\nRight-hand part: (-02) × (-03) = 06.\nResult = 9506!\n(ख) ९६ × ९४ (Base 100):\nDeficits: 96 is (-04), 94 is (-06).\nLeft part: 96 - 06 = 90.\nRight part: (-04) × (-06) = 24.\nResult = 9024!',
            explanation: 'Formula: (B - a)(B - b) = B(B - a - b) + ab. Turns tedious double-digit multiplication into mental subtraction and single-digit products.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · ऊर्ध्वतिर्यग्भ्यां सार्वत्रिक-गुणनम् (Universal Matrix)',
        sectionTitleEnglish: 'Section C · Ūrdhva-Tiryagbhyām (Vertically & Crosswise) Execution',
        instructions: 'Execute the 3-step vertical and crosswise multiplication and demonstrate the algebraic isomorphism.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws5-2-q5',
            questionNumber: '5',
            promptDevanagari: '"ऊर्ध्वतिर्यग्भ्याम्" सूत्रेण २३ × १२ इत्यस्य गुणन-क्रमं पदशः प्रदर्शयत बीजगणितेन च साधयत ।',
            promptEnglish: 'Demonstrate step-by-step Ūrdhva-Tiryagbhyām cross-multiplication for 23 × 12 and prove its algebraic isomorphism.',
            marks: 7,
            answer: 'Execution Steps for 23 × 12:\nStep 1 (Right Vertical Units): 3 × 2 = 6 [Units digit = 6]\nStep 2 (Crosswise Products & Sum): (2 × 2) + (3 × 1) = 4 + 3 = 7 [Tens digit = 7]\nStep 3 (Left Vertical Tens): 2 × 1 = 2 [Hundreds digit = 2]\nCombined Result = 276!\n\nAlgebraic Proof:\nLet number 1 = (2x + 3) and number 2 = (1x + 2) where base x = 10.\n(2x + 3)(1x + 2) = (2 × 1)x² + [(2 × 2) + (3 × 1)]x + (3 × 2)\n= 2x² + 7x + 6 = 2(100) + 7(10) + 6 = 276.\nThe 3 spatial strokes of Ūrdhva-Tiryagbhyām correspond exactly to the coefficients of the polynomial product!',
            explanation: 'Proves that Vedic arithmetic is applied polynomial algebra evaluated at radix 10.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: सङ्गणकीय-जटिलता एवं मानसिक-क्षमता',
        sectionTitleEnglish: 'Section D · Thinking Connection: Algorithmic Complexity & O(n^1.58) Heuristics',
        instructions: 'Analyze the parallels between Vedic mental algorithms and modern computational optimization.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws5-2-q6',
            questionNumber: '6',
            promptDevanagari: 'कथं वैदिक-गणित-पद्धतिः करात्सुबा-गुणन-अल्गोरिद्म (Karatsuba Algorithm) इत्यनेन समाना वर्तते?',
            promptEnglish: 'How does the Vedic mental approach mirror advanced computer science algorithms like Karatsuba fast multiplication?',
            marks: 5,
            answer: 'Standard grade-school multiplication requires O(n²) primitive operations. In 1960, Anatoly Karatsuba discovered an algorithm that reduces multi-digit multiplication complexity to O(n^1.58) by cleverly replacing expensive multiplication steps with additions and subtractions. Vedic Maths achieves the identical breakthrough biological optimization: formulas like Nikhilam and Ūrdhva-Tiryagbhyām minimize high-overhead mental carrying operations, shifting the cognitive load to spatial symmetry and bilateral cross-addition.',
            explanation: 'Vedic Maths optimizes human brain cache and register storage.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'गणनायां सौन्दर्यम् — यान्त्रिक-परिश्रमात् मुक्ता बुद्धिः कुत्र गच्छति?',
      promptEnglish: 'When mental computation is freed from mechanical drudgery, where does the liberated intellect soar?',
      guidingQuestions: [
        'Why does conventional education train children like slow mechanical calculators rather than creative pattern recognizers?',
        'How does experiencing instant mathematical elegance awaken awe for cosmic symmetry?'
      ],
      modelReflection: 'When you calculate with Vedic sūtras, numbers cease to be dry burdens to haul. They become dance partners in symmetrical harmony. By offloading mechanical carrying to visual patterns, the mind discovers that mathematics is not an artificial human invention, but the native language of cosmic intelligence.'
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
  // MODULE 5, Lesson 5.4: Sanskrit Words in Science, Technology & English
  // =========================================================================
  'c-5-4': {
    lessonId: 'c-5-4',
    lessonNumber: '5.4',
    worksheetTitleDevanagari: 'विज्ञान-तन्त्रज्ञाने संस्कृत-पदानि एवं भारोपीय-भाषा-विज्ञानम्',
    worksheetTitleEnglish: 'Sanskrit Roots in Modern Science, Technology & Indo-European Cognates',
    subtitle: 'From Mātṛ to Matrix, Jyāmiti to Geometry: tracing ancient Sanskrit foundations in modern global science',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Trace common Indo-European cognates linking Sanskrit, Latin, Greek, and English vocabulary.',
      'Explain how Dmitri Mendeleev organized the Periodic Table using Sanskrit prefixes (Eka-Boron, Eka-Silicon) inspired by Pāṇini’s 2D matrices.',
      'Analyze scientific and mathematical terms derived from Sanskrit roots (ज्यामितिः, त्रिकोणमितिः, शून्यम्, पदम्).'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · भारोपीय-सजातीय-पद-अभिज्ञानम्',
        sectionTitleEnglish: 'Section A · Indo-European Cognate Identification Drill',
        instructions: 'Match the ancient Sanskrit terms with their English/European cognates and scientific domains.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws5-4-q1',
            questionNumber: '1',
            promptDevanagari: 'एतेषां संस्कृत-शब्दानां आङ्ग्ल-सजातीय-शब्दान् (Cognates) लिखत: (क) मातृ (ख) भ्रातृ (ग) नामन् (घ) पद (ङ) ज्ञान ।',
            promptEnglish: 'Provide the primary English cognates and scientific derivations for: (a) mātṛ (b) bhrātṛ (c) nāman (d) pada (e) jñāna.',
            marks: 3,
            optionsOrHints: [
              '(a) Mother, Matrix, Metric (b) Brother, Fraternal (c) Name, Nominal (d) Foot, Pedal, Podiatry (e) Know, Gnosis, Cognition',
              'All derived from Latin only',
              'No connection exists'
            ],
            answer: '(क) मातृ (Mātṛ) → Mother, Matrix, Metric, Matter (Root √मा = to measure/nourish);\n(ख) भ्रातृ (Bhrātṛ) → Brother, Fraternal (Root √भृ = to support);\n(ग) नामन् (Nāman) → Name, Nominal, Nomenclature;\n(घ) पद (Pada) → Foot, Pedal, Pedestrian, Podiatry;\n(ङ) ज्ञान (Jñāna) → Know, Gnosis, Cognition, Diagnosis.',
            explanation: 'Demonstrates the genetic linguistic kinship uniting Sanskrit with European languages through Proto-Indo-European roots.'
          },
          {
            id: 'ws5-4-q2',
            questionNumber: '2',
            promptDevanagari: 'ग्रिम्-नियमः (Grimm’s Law) कथं संस्कृतस्य महाप्राण-ध्वनीनां परिवर्तनं व्याख्याति?',
            promptEnglish: 'How does Grimm’s Law explain the phonetic transition of Sanskrit aspirated stops (bh, dh, gh) into Germanic and English voiced stops (b, d, g)?',
            marks: 2,
            optionsOrHints: ['bh → b (bhrātṛ → brother), dh → d (dhā → do), gh → g', 'All sounds become vowels', 'Aspirates disappear entirely', 'No pattern exists'],
            answer: 'Grimm’s Law demonstrates systematic consonant shifts: Sanskrit voiced aspirates (भ, ध, घ) shifted into Germanic plain voiced stops (b, d, g). Thus Sanskrit भ्रातृ (bhrātṛ) became English "brother", द्वार (dvāra) became "door", and हंस (ghaṁsa/haṁsa) became "goose".',
            explanation: 'Historical linguistics confirms that sound changes across thousands of miles follow predictable phonetic laws.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · मेण्डेलीव्-आवर्त-सारणी एवं पाणिनीय-प्रेरणा',
        sectionTitleEnglish: 'Section B · Mendeleev’s Periodic Table & Pāṇinian Matrix Architecture',
        instructions: 'Analyze how Sanskrit linguistics inspired the foundation of modern chemistry.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws5-4-q3',
            questionNumber: '3',
            promptDevanagari: '१८६९ तमे वर्षे दिमित्री मेण्डेलीव-महोदयेन अज्ञात-तत्त्वानां नामकरणे "एक-बोरोन्", "एक-एल्युमिनियम", "एक-सिलिकान्" इति संस्कृत-उपसर्गाः किमर्थं प्रयुक्ताः?',
            promptEnglish: 'Why did Dmitri Mendeleev use the Sanskrit prefix "Eka" (एक) to designate his predicted missing elements in the Periodic Table?',
            marks: 4,
            answer: 'Mendeleev was a close colleague of the eminent Sanskritist Otto von Böhtlingk at the Russian Academy of Sciences in Saint Petersburg. Böhtlingk was publishing the critical edition of Pāṇini’s Aṣṭādhyāyī. Mendeleev realized that Pāṇini’s 2-dimensional matrix of sounds (the Śiva Sūtras), which classifies phonemes simultaneously along the horizontal axis (manner of articulation) and vertical axis (place of articulation), was the exact structural paradigm needed for the Periodic Table. In tribute to Pāṇinian generative matrices, he named his predicted elements with Sanskrit prefixes: "Eka" (one place below): Eka-boron (Scandium), Eka-aluminium (Gallium), and Eka-silicon (Germanium).',
            explanation: 'One of the most consequential interdisciplinary inspirations in the history of physical science.'
          },
          {
            id: 'ws5-4-q4',
            questionNumber: '4',
            promptDevanagari: 'एतेषां पारिभाषिक-पदानां व्युत्पत्तिं लिखत: (क) ज्यामितिः (ख) त्रिकोणमितिः (ग) शून्यम् ।',
            promptEnglish: 'Explain the etymological morphology of these mathematical terms: (a) jyāmitiḥ (Geometry) (b) trikoṇamitiḥ (Trigonometry) (c) śūnyam (Cipher/Zero).',
            marks: 4,
            answer: '(क) ज्यामितिः = ज्या (Earth / Chord) + मितिः (Measurement) = The science of measuring spatial earth boundaries (exact cognate of Greek Geo-metria);\n(ख) त्रिकोणमितिः = त्रि (Three) + कोण (Angles) + मितिः (Measurement) = Trigonometry, measuring triangles and trigonometric sine tables;\n(ग) शून्यम् = Derived from root √श्वि (to swell / open into emptiness), representing cosmic void and the mathematical cipher/zero, which Arabic scholars translated directly as "sifr" (whence English "cipher" and Italian "zero").',
            explanation: 'Proves the organic, transparent linguistic foundations of Sanskrit scientific nomenclature.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · ऋग्वेद-मन्त्रस्य वैज्ञानिक-दृष्ट्या विश्लेषणम्',
        sectionTitleEnglish: 'Section C · Rigvedic Epistemological Verse Analysis',
        instructions: 'Perform grammatical parsing and epistemological synthesis of the famous Rigvedic declaration.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws5-4-q5',
            questionNumber: '5',
            promptDevanagari: 'अस्य मन्त्रस्य पदच्छेदं कृत्वा वैज्ञानिक-एकीकृत-सिद्धान्तेन (Unified Field Theory) सह तुलनां कुरुत: "एकं सद्विप्रा बहुधा वदन्ति" (ऋग्वेदः १.१६४.४६) ।',
            promptEnglish: 'Perform Padaccheda and compare the epistemological declaration "ekaṁ sad viprā bahudhā vadanti" with the modern scientific quest for Unified Field Theory.',
            marks: 7,
            answer: 'पदच्छेदः: एकम् (Neuter Singular Accusative: The One Ultimate Reality) + सत् (Neuter Singular Nominative/Accusative Participle: True Being / Existence) + विप्राः (Masculine Plural Nominative: Sages / Enlightened Seers) + बहुधा (Adverb of manner: In manifold diverse ways) + वदन्ति (Present tense plural verb: speak / designate).\n\nEpistemological & Scientific Synthesis:\nIn modern physics, the grand quest has been the Unified Field Theory—the recognition that gravity, electromagnetism, and nuclear forces are diverse manifest expressions of a single underlying quantum symmetry. 3,500 years ago, the Ṛgveda formulated this foundational scientific postulate: Truth (सत्) is inherently singular and undivided; however, observers using different coordinate systems, sensory apertures, and linguistic models naturally articulate it through varied terminology (अग्निं यमं मातरिश्वानमाहुः). It establishes empirical humility and epistemological pluralism as the core of Indian inquiry.',
            explanation: 'Sanskrit unites ontological singularity with methodological plurality.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: अन्तर-विषयक-प्रतिभा एवं प्रतिरूप-अभिज्ञानम्',
        sectionTitleEnglish: 'Section D · Thinking Connection: Cross-Disciplinary Pattern Recognition',
        instructions: 'Synthesize how Sanskrit linguistic training enhances creative breakthrough capability in science and AI.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws5-4-q6',
            questionNumber: '6',
            promptDevanagari: 'कथं संस्कृत-भाषायाः अध्ययनं वैज्ञानिकानाम् "अन्तर-विषयक-प्रतिरूप-अभिज्ञानम्" (Cross-Disciplinary Pattern Recognition) संवर्धयति?',
            promptEnglish: 'How does mastering the structural architecture of Sanskrit cultivate cross-disciplinary breakthrough thinking in science and artificial intelligence?',
            marks: 5,
            answer: 'Scientific breakthroughs rarely come from incremental tinkering within a siloed specialty; they occur when a thinker recognizes an isomorphic pattern linking two seemingly unrelated universes (as Mendeleev linked chemistry to Pāṇinian phonetics, and Rick Briggs linked knowledge representation in AI to Sanskrit grammar). Because Sanskrit morphology operates like an algebraic type system, learning it exercises the brain’s highest-order metacognitive faculties, enabling researchers to see deep structural symmetries between language, mathematics, genetics, and computer architecture.',
            explanation: 'Sanskrit is an epistemic catalyst for lateral and systemic thinking.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'मातृ, भ्रातृ, ज्ञानम् — यदा वयं वदामः, कस्य प्राचीन-परिवारस्य स्मरणं भवति?',
      promptEnglish: 'When we speak words like Mother, Brother, and Gnosis, what ancient family of human consciousness awakens?',
      guidingQuestions: [
        'Notice how superficial differences of geography and nationality vanish when looking at etymological roots.',
        'How does understanding the common linguistic origin of humanity foster deep compassion and kinship?'
      ],
      modelReflection: 'Whenever an English speaker says "Mother", an Italian says "Madre", a Russian says "Mat", or an Indian says "Mātṛ", they are uttering the identical sacred sound breathed by their ancestors thousands of years ago. Beneath our political borders and ephemeral disagreements lies an unbroken tapestry of shared human consciousness, forever preserved in the living architecture of speech.'
    }
  },

  // =========================================================================
  // MODULE 6: The Contemplative Mind (दर्शनम्)
  // =========================================================================
  'c-6-1': {
    lessonId: 'c-6-1',
    lessonNumber: '6.1',
    worksheetTitleDevanagari: 'स्वरः, लयः एवं एकाग्रता (उदात्त-अनुदात्त-स्वरित-साधना)',
    worksheetTitleEnglish: 'Recitation and Focus: Vedic Svara Accent Triad, Rhythm & Neuro-Vocal Attention',
    subtitle: 'Transforming speech into laser presence: Pāṇini sūtras 1.2.29-31 and vagal parasympathetic activation',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the Vedic pitch accent triad: Udātta (उच्चैरुदात्तः), Anudātta (नीचैरनुदात्तः), and Svarita (समाहारः स्वरितः).',
      'Identify and execute Vedic accent markings: horizontal underbar, vertical top stroke, and bare syllable.',
      'Explain the neurophysiological mechanisms of vagus nerve stimulation and cardiac resonance induced by Vedic recitation.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · वैदिक-स्वर-त्रयी-अभिज्ञानम्',
        sectionTitleEnglish: 'Section A · Vedic Svara Accent Triad & Script Markings',
        instructions: 'State the three Pāṇinian pitch definitions and their typographic text notations.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws6-1-q1',
            questionNumber: '1',
            promptDevanagari: 'पाणिनेः त्रीणि स्वर-सूत्राणि लिखत: "उच्चैः...", "नीचैः...", "समाहारः..." ।',
            promptEnglish: 'Write Pāṇini’s three foundational sūtras defining the pitch accents (Udātta, Anudātta, Svarita).',
            marks: 3,
            optionsOrHints: [
              'उच्चैरुदात्तः (१.२.२९), नीचैरनुदात्तः (१.२.३०), समाहारः स्वरितः (१.२.३१)',
              'प्रथमा, द्वितीया, तृतीया',
              'ह्रस्व, दीर्घ, प्लुत'
            ],
            answer: '१. उच्चैरुदात्तः (Pāṇini 1.2.29: Raised/high pitch articulated in the upper vocal register);\n२. नीचैरनुदात्तः (Pāṇini 1.2.30: Low/grave pitch articulated in the lower vocal register);\n३. समाहारः स्वरितः (Pāṇini 1.2.31: Circumflex pitch combining high and low in falling cadence).',
            explanation: 'Svara is not musical ornamentation; it is the intrinsic pitch contour of the Vedic oral transmission.'
          },
          {
            id: 'ws6-1-q2',
            questionNumber: '2',
            promptDevanagari: 'मुद्रित-ग्रन्थेषु एतेषां त्रयाणां स्वराणां कानि चिह्नानि भवन्ति?',
            promptEnglish: 'How are Udātta, Anudātta, and Svarita typographically marked in printed Vedic Devanāgarī texts?',
            marks: 2,
            optionsOrHints: [
              'उदात्तः = Unmarked; अनुदात्तः = Horizontal underbar ( _ ); स्वरितः = Vertical top stroke ( | )',
              'All use vertical strokes',
              'Marked with colors',
              'No marks exist'
            ],
            answer: '१. उदात्तः (Udātta) = Unmarked (bare syllable, e.g. अ);\n२. अनुदात्तः (Anudātta) = Horizontal line underneath the syllable (e.g. अ॒);\n३. स्वरितः (Svarita) = Vertical stroke above the syllable (e.g. अ॑).',
            explanation: 'Recognizing these 3 notation marks allows students to chant Vedic sūktas with acoustic accuracy.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · मन्त्र-स्वर-अङ्कन-अभ्यासः (Chanting Notation)',
        sectionTitleEnglish: 'Section B · Pitch Accent Annotation & Vocal Execution',
        instructions: 'Annotate and analyze the pitch transitions in sacred Vedic mantras.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws6-1-q3',
            questionNumber: '3',
            promptDevanagari: 'अस्मिन् मन्त्रे स्वराणां स्थानानि दर्शयत: "ॐ भूर्भुवः॒ स्वः॑" तथा "स॒त्यं व॑द । ध॒र्मं च॑र ।"',
            promptEnglish: 'Analyze the pitch transitions in: "oṁ bhūr bhuvaḥ॒ svaḥ॑" and "sa॒tyaṁ va॑da | dha॒rmaṁ ca॑ra |".',
            marks: 4,
            answer: '१. "ॐ भूर्भुवः॒ स्वः॑":\n- "ॐ भूः" = उदात्तः (Natural high/bare)\n- "भुवः॒" = अनुदात्तः (Low pitch, indicated by horizontal underline)\n- "स्वः॑" = स्वरितः (Falling inflection, indicated by vertical superscript bar).\n\n२. "स॒त्यं व॑द । ध॒र्मं च॑र ।":\n- "स॒" = अनुदात्तः (Chest drop)\n- "त्यं" = स्वरितः (Vertical top stroke, falling pitch)\n- "वद" = उदात्तः (Unmarked)\n- "ध॒" = अनुदात्तः; "र्मं" = स्वरितः; "चर" = उदात्तः.',
            explanation: 'The alternating acoustic waves create an oscillating sonic rhythm that anchors vocal concentration.'
          },
          {
            id: 'ws6-1-q4',
            questionNumber: '4',
            promptDevanagari: 'किमर्थं वैदिक-स्वर-पाठः "प्रत्यक्ष-एकाग्रता-परीक्षकः" (Real-Time Attention Monitor) कथ्यते?',
            promptEnglish: 'Why is Vedic Svara chanting termed a real-time biofeedback monitor for human presence and attention?',
            marks: 4,
            answer: 'Unlike silent reading where the mind can wander unnoticed while eyes scan words, reciting with Vedic pitch accents requires three simultaneous channels of real-time cognitive monitoring: phonemic duration (Mātrā), muscular place of articulation (Sthāna), and pitch register (Svara). If the mind drifts into daydreaming for even half a second, the vocal cords immediately drop pitch or mistime an accent, creating an instantaneous audible feedback cue that calls awareness back to the present moment.',
            explanation: 'Recitation functions as an unshakeable acoustic mindfulness bell.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · वाक्-तन्त्रम् एवं वेगस-नाडी-उत्तेजनम् (Neuro-Acoustics)',
        sectionTitleEnglish: 'Section C · Neuro-Acoustic Resonance & Vagus Nerve Stimulation',
        instructions: 'Explain the physiological and neurological mechanisms induced by prolonged vocalic recitation.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws6-1-q5',
            questionNumber: '5',
            promptDevanagari: 'कथं वैदिक-स्वर-पाठः वेगस्-नाडीं (Vagus Nerve) उत्तेज्य अनुकम्पी-तन्त्रं (Sympathetic Stress) शान्तं करोति?',
            promptEnglish: 'How does prolonged vocalic recitation stimulate the vagus nerve and shift the autonomic nervous system into parasympathetic relaxation?',
            marks: 7,
            answer: 'Neurophysiological Mechanisms:\n१. Auricular and Pharyngeal Branch Activation: The motor and sensory branches of the 10th cranial nerve (Vagus) innervate the larynx, pharynx, and soft palate. Sustained resonant vocalization physically vibrates these branches.\n२. Prolonged Exhalation Ratio: Vedic chanting extends the exhalatory phase of respiration to 3-4 times the duration of inhalation. Prolonged exhalation triggers the baroreflex mechanism, slowing heart rate.\n३. Amygdala Calming & Alpha Waves: Functional MRI (fMRI) studies show that Sanskrit mantra chanting deactivates the amygdala (fear and stress center) and generates high-amplitude synchronized Alpha brain waves (8-12 Hz), shifting the body from sympathetic "fight-or-flight" into deep restorative parasympathetic vagal tone.',
            explanation: 'Vedic recitation is a clinical-grade acoustic somatic therapy developed millennia ago.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: सजग-वाणी एवं मनः-संयमः',
        sectionTitleEnglish: 'Section D · Thinking Connection: Svara as Mindfulness & Mindful Speech',
        instructions: 'Reflect on how acoustic discipline purifies communication and relationships.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws6-1-q6',
            questionNumber: '6',
            promptDevanagari: 'कथं स्वर-साधना अस्माकं दैनिक-व्यवहारे "अविचारित-कर्कश-भाषणं" निवारयति?',
            promptEnglish: 'How does training the voice in Svara eliminate unconscious, impulsive, and harsh speech in everyday human communication?',
            marks: 5,
            answer: 'Most hurtful human speech is reactive—it bursts from unconscious emotional triggers before the prefrontal cortex can intervene. One who practices Svara develops an exquisite, reflexive sensory awareness of the vocal tract, throat, and pitch. This somatic pause creates a fraction-of-a-second space of choice (Vimarśa) between an emotion arising and words leaving the mouth, naturally transforming speech into truthful, pleasant, and beneficial dialogue (अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत्).',
            explanation: 'Vocal discipline is the practical foundation of ethical self-mastery.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'वागेव धेनुः — कण्ठस्य ध्वनेः च पवित्रता अस्माकं जीवनं कथं परिष्करोति?',
      promptEnglish: 'Speech is celebrated as the wish-fulfilling cow (Dhenu). How does purifying vocal resonance transform inner awareness?',
      guidingQuestions: [
        'Notice how your bodily tension shifts when you speak in harsh, hurried, agitated tones versus calm resonance.',
        'If every spoken word leaves a permanent neurological impression on your own nervous system, what will you speak today?'
      ],
      modelReflection: 'The voice is not a loudspeaker for neurotic ego demands; it is the bridge where the formless silence of consciousness takes physical form as acoustic energy. When speech is tuned with reverence, rhythm, and truth, every word becomes a blessing, healing both the speaker and all who listen.'
    }
  },

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
  // MODULE 6, Lesson 6.3: The Darśanas as Ways of Seeing
  // =========================================================================
  'c-6-3': {
    lessonId: 'c-6-3',
    lessonNumber: '6.3',
    worksheetTitleDevanagari: 'षड्-दर्शनानि · दृष्टयः एवं समन्वित-ज्ञान-प्रणाली',
    worksheetTitleEnglish: 'The Six Orthodox Darśanas: Progressive Staircase of Indian Epistemology & Cosmology',
    subtitle: 'Nyāya, Vaiśeṣika, Sāṅkhya, Yoga, Mīmāṁsā, Vedānta: empirical instruments investigating consciousness and cosmos',
    maxMarks: 25,
    durationMinutes: 30,
    learningOutcomes: [
      'Master the 6 classical orthodox Darśanas (षड्-दर्शनानि), their founding Ṛṣis, and their foundational sūtra texts.',
      'Analyze the epistemological hierarchy: from Nyāya formal logic and Vaiśeṣika atomic physics to Sāṅkhya cosmology, Yoga psychology, and Advaita Vedānta.',
      'Explain the concept of Darśana as direct empirical perception ("दृष्टिः") rather than speculative dogma.'
    ],
    sections: [
      {
        sectionCode: 'A',
        sectionTitleDevanagari: 'विभागः क · षड्-दर्शन-आचार्य-मेलनम्',
        sectionTitleEnglish: 'Section A · Six Darśanas & Founding Sages Matching Drill',
        instructions: 'Match the 6 orthodox schools with their founding Ṛṣis, foundational texts, and domains.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws6-3-q1',
            questionNumber: '1',
            promptDevanagari: 'षड्-दर्शनानां प्रणेतृ-मुनीनां नामानि लिखत: (१) न्याय (२) वैशेषिक (३) साङ्ख्य (४) योग (५) मीमांसा (६) वेदान्त ।',
            promptEnglish: 'Name the founding sage (Ṛṣi) and primary foundational sūtra text for all 6 orthodox Darśanas.',
            marks: 3,
            optionsOrHints: [
              'गौतम, कणाद, कपिल, पतञ्जलि, जैमिनि, बादरायण',
              'पाणिनि, कात्यायन, पतञ्जलि',
              'शङ्कर, रामानुज, मध्व'
            ],
            answer: '१. न्याय (Nyāya) → ऋषि गौतम (Nyāya Sūtras - Formal Logic & Epistemology)\n२. वैशेषिक (Vaiśeṣika) → ऋषि कणाद (Vaiśeṣika Sūtras - Atomic Physics & Categories)\n३. साङ्ख्य (Sāṅkhya) → ऋषि कपिल (Sāṅkhya Sūtras/Kārikā - Dualistic Cosmology & 25 Tattvas)\n४. योग (Yoga) → ऋषि पतञ्जलि (Yoga Sūtras - 8 Limbs & Mental Stillness)\n५. मीमांसा (Mīmāṁsā) → ऋषि जैमिनि (Mīmāṁsā Sūtras - Hermeneutics & Acoustic Duty)\n६. वेदान्त (Vedānta) → ऋषि बादरायण / व्यास (Brahma Sūtras - Non-Dual Ultimate Reality).',
            explanation: 'The six schools operate as three complementary pairs: Nyāya-Vaiśeṣika, Sāṅkhya-Yoga, and Mīmāṁsā-Vedānta.'
          },
          {
            id: 'ws6-3-q2',
            questionNumber: '2',
            promptDevanagari: '"दर्शनम्" इति शब्दस्य व्युत्पत्तिः का? कथम् अयं पाश्चात्य-"Philosophy" शब्दात् भिन्नः?',
            promptEnglish: 'What is the etymological meaning of "Darśana" (root √dṛś), and how does it fundamentally differ from Western "philosophy"?',
            marks: 2,
            optionsOrHints: [
              'दृश् + ल्युट् = प्रत्यक्ष-अनुभूतिः (Direct perception/vision of truth), not speculative opinion',
              'Mere intellectual debate',
              'Blind faith',
              'Ritual worship'
            ],
            answer: 'Derived from root √दृश् (to see) + ल्युट् = "दृश्यते अनेन इति दर्शनम्" (The calibrated instrument through which ultimate reality is directly perceived). While Western philosophy (philo-sophia = love of wisdom) remained primarily a theoretical, speculative armchair dialectic, Indian Darśana was an experimental laboratory science: a direct experiential perception verified in the laboratory of conscious awareness.',
            explanation: 'A Darśana is an ocular lens for beholding reality without cognitive distortion.'
          }
        ]
      },
      {
        sectionCode: 'B',
        sectionTitleDevanagari: 'विभागः ख · न्याय-प्रमाणानि एवं वैशेषिक-परमाणु-वादः',
        sectionTitleEnglish: 'Section B · Nyāya Epistemology & Vaiśeṣika Atomic Physics',
        instructions: 'Analyze formal logical proofs and early atomic physical taxonomy.',
        totalMarks: 8,
        questions: [
          {
            id: 'ws6-3-q3',
            questionNumber: '3',
            promptDevanagari: 'न्याय-दर्शने स्वीकृतानि चत्वारि प्रमाणानि कानि? तेषां स्वरूपं लिखत ।',
            promptEnglish: 'Explain the 4 valid means of true knowledge (Pramāṇas) established by Gautama’s Nyāya Sūtras.',
            marks: 4,
            optionsOrHints: ['प्रत्यक्ष, अनुमान, उपमान, शब्द', 'सत्त्व, रजस्, तमस्', 'धर्म, अर्थ, काम, मोक्ष'],
            answer: '१. प्रत्यक्षम् (Pratyakṣa - Direct unmediated sensory and intuitive perception);\n२. अनुमानम् (Anumāna - Rigorous logical inference, codified through the 5-step syllogism: Pratijñā, Hetu, Udāharaṇa, Upanaya, Nigamana);\n३. उपमानम् (Upamāna - Knowledge derived from structural analogy and relational similarity);\n४. शब्दः (Śabda - Epistemic testimony of trustworthy experts and seers / Āptavākya).',
            explanation: 'Nyāya established the rigorous epistemological rules of debate and verification that governed all scientific inquiry in India.'
          },
          {
            id: 'ws6-3-q4',
            questionNumber: '4',
            promptDevanagari: 'वैशेषिक-दर्शने कणाद-मुनेः परमाणु-सिद्धान्तः (Atomic Theory) कः आसीत्?',
            promptEnglish: 'Describe Sage Kaṇāda’s pioneering atomic theory in the Vaiśeṣika Darśana (circa 600 BCE).',
            marks: 4,
            answer: 'Sage Kaṇāda postulated that physical matter cannot be infinitely divided without reducing reality to a logical void. At the fundamental base lies the indivisible, indestructible particle: the "Paramāṇu" (परमाणु = Ultimate Atom). Paramāṇus exist in four elemental substance classes (Earth, Water, Fire, Air). Driven by unseen cosmic force (अदृष्ट), two atoms combine to form a Dyad (द्व्यणुक), and three dyads combine to form a Triad (त्र्यणुक - visible as a dust mote dancing in a beam of sunlight), generating all material compounds.',
            explanation: 'Predated Democritus and Dalton by centuries with a comprehensive atomic ontology.'
          }
        ]
      },
      {
        sectionCode: 'C',
        sectionTitleDevanagari: 'विभागः ग · साङ्ख्य-योग-वेदान्त-क्रम-विकासः',
        sectionTitleEnglish: 'Section C · The Sāṅkhya-Yoga-Vedānta Continuum',
        instructions: 'Trace the progressive cognitive evolution from the 25 Tattvas to Patanjali’s Nirodha and Non-Dual Realization.',
        totalMarks: 7,
        questions: [
          {
            id: 'ws6-3-q5',
            questionNumber: '5',
            promptDevanagari: 'कथं साङ्ख्य-योग-वेदान्त-दर्शनानि सोपानवत् (Staircase) परस्परं पूरयन्ति?',
            promptEnglish: 'Analyze how Sāṅkhya, Yoga, and Vedānta form an integrated, non-contradictory 3-stage staircase of conscious realization.',
            marks: 7,
            answer: 'The Progressive Epistemological Staircase:\n१. Stage 1 — Sāṅkhya (Theoretical Taxonomy): Kapila dissects reality into 25 Tattvas, fundamentally distinguishing the conscious witnessing subject (Puruṣa) from changing physical and mental nature (Prakṛti). This provides the intellectual roadmap.\n२. Stage 2 — Yoga (Empirical Methodology): Patañjali takes Sāṅkhya’s map and provides the clinical laboratory technology: "योगश्चित्तवृत्तिनिरोधः" (Yoga is the intentional stilling of the oscillations of the mind). Through the 8 limbs, mental turbulence ceases, allowing the witness to abide in its true identity ("तदा द्रष्टुः स्वरूपेऽवस्थानम्").\n३. Stage 3 — Vedānta (Non-Dual Realization): Bādarāyaṇa and Śaṅkara complete the ascent. They show that Sāṅkhya’s dualism was only a provisional pedagogical step. Once the mind is stilled, the observer discovers that Puruṣa and Prakṛti are not two alienated realities, but waves in the infinite, undivided ocean of Non-Dual Brahman ("सर्वं खल्विदं ब्रह्म").',
            explanation: 'Transforms apparent philosophical conflicts into sequential stages of human cognitive maturation.'
          }
        ]
      },
      {
        sectionCode: 'D',
        sectionTitleDevanagari: 'विभागः घ · चिन्तन-सेतुः: समन्वित-ज्ञान-प्रणाली (Integrative Epistemology)',
        sectionTitleEnglish: 'Section D · Thinking Connection: Overcoming Reductionist Fragmentation',
        instructions: 'Synthesize how the 6 Darśanas solve modern academic over-specialization and intellectual tribalism.',
        totalMarks: 5,
        questions: [
          {
            id: 'ws6-3-q6',
            questionNumber: '6',
            promptDevanagari: 'कथं षड्-दर्शनानां समन्वयः आधुनिक-युगस्य "एकाङ्गी-ज्ञान-विभाजनम्" (Hyper-Specialization) दूरीकरोति?',
            promptEnglish: 'How does the integrative architecture of the Six Darśanas resolve modern intellectual tribalism and narrow reductionism?',
            marks: 5,
            answer: 'Modern academia often suffers from aggressive reductionism: material physicists dismiss psychologists, logicians ignore contemplative mystics, and neuroscientists reduce consciousness to neurotransmitters. In contrast, the Indian tradition treated the 6 Darśanas as complementary scientific apertures on a single reality: Nyāya trains your logical rigor; Vaiśeṣika models the physical atom; Sāṅkhya maps the cognitive faculties; Yoga stills emotional bias; Mīmāṁsā integrates civic and acoustic duty; and Vedānta awakens direct cosmic oneness. By climbing this staircase, the human mind achieves maximum technical competence without losing its spiritual soul.',
            explanation: 'The ultimate blueprint for holistic, multidimensional intelligence.'
          }
        ]
      }
    ],
    contemplativePrompt: {
      promptDevanagari: 'अथातो ब्रह्मजिज्ञासा — जिज्ञासोः मनसि संशयः कथं ज्ञानस्य द्वारं भवति?',
      promptEnglish: 'Why does every Darśana begin with an explicit inquiry (Jijñāsā), and how does honest doubt open the gateway to truth?',
      guidingQuestions: [
        'Notice how dogmatic religions demand immediate blind belief and punish doubt.',
        'Why does classical Indian thought celebrate the sincere, burning question (जिज्ञासा) as the highest spiritual virtue?'
      ],
      modelReflection: 'Belief is cheap; anyone can adopt a slogan. But inquiry (Jijñāsā) demands courage, humility, and ruthless honesty. When Sage Bādarāyaṇa opens the Brahma Sūtras with "अथातो ब्रह्मजिज्ञासा", he is declaring that truth does not fear your questions. Bring your sharpest doubts, calibrate your instrument of perception, and see reality face to face.'
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
