/**
 * संस्कृत-चिन्तनम् · Sanskrit as a Way of Thinking
 * Complete Subscription-Based Course Knowledge Base
 * 
 * 6 Modules · 28 Lessons · 5-Part Pedagogical Architecture:
 * 1. The Idea (धारणा) — The mental model & intuition
 * 2. The Sound (ध्वनिः) — Acoustic attention & listen/repeat audio
 * 3. The Rule (विधिः) — Structural formula, morphology, and mechanics
 * 4. Practice (अभ्यासः) — Interactive drill & gated worksheet/answer key
 * 5. Thinking Connection (चिन्तन-सेतुः) — Scientific vs Contemplative link
 */

export type ThinkingConnectionType = 'scientific' | 'contemplative' | 'integrated';

export interface CourseQuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseLinkedResource {
  label: string;
  targetView: 'reader' | 'varnamala' | 'grammar' | 'dhatupatha' | 'vedic-maths' | 'philosophy' | 'worksheets' | 'quiz' | 'board' | 'home' | 'cbse-guide' | 'course-addendum';
  param?: string; // e.g. chapterId 'gsde101' or grammar articleId 'shiksha-sound-anatomy'
  badge: string;
}

export interface CourseLesson {
  id: string;
  lessonNumber: string; // e.g. "1.1"
  titleDevanagari: string;
  titleEnglish: string;
  shortDescription: string;
  
  // 1. The Idea
  ideaConcept: {
    heading: string;
    summary: string;
    body: string[];
    keyTakeaway: string;
  };
  
  // 2. The Sound
  soundPractice: {
    audioTerms: { devanagari: string; iast: string; meaning: string }[];
    phoneticInstructions: string;
    recitationTips: string;
  };
  
  // 3. The Rule
  ruleMechanics: {
    title: string;
    formula?: string;
    explanation?: string[];
    tableData?: { headers: string[]; rows: string[][] };
    sutraReference?: { devanagari: string; iast: string; meaning: string };
  };
  
  // 4. Practice
  practice: {
    quickQuiz: CourseQuizQuestion;
    worksheetSummary: string;
    worksheetDownloadId: string;
  };
  
  // 5. Thinking Connection
  thinkingConnection: {
    type: ThinkingConnectionType;
    badgeLabel: string;
    heading: string;
    bridgeExplanation: string;
    modernInsight: string;
  };
  
  // Linked Gurukul platform assets
  linkedResources: CourseLinkedResource[];
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  titleDevanagari: string;
  titleEnglish: string;
  tagline: string;
  themeColor: string;
  icon: string;
  overview: string;
  lessons: CourseLesson[];
}

export const SANSKRIT_THINKING_COURSE_METADATA = {
  id: 'sanskrit-thinking-course',
  titleDevanagari: 'संस्कृत-चिन्तनम्',
  titleEnglish: 'Sanskrit as a Way of Thinking',
  subtitle: 'An integrated system for taking sound in, processing rules, and producing meaning.',
  tagline: 'Precision for science · Depth for contemplation',
  duration: '6 Modules · 28 Lessons · Self-paced',
  pricingModel: 'Free Trial: Full Lesson Access · One-time ₹200 unlocks Printable Worksheets, Answer Keys & Progress Certificate',
  introduction: 
    "Sanskrit isn't only a language. It's an integrated system for taking something in, processing it, and producing an output. Sound comes in and is analysed by where it's made. Rules turn roots into words. Words combine into meaning. The same training in precise, rule-based thinking serves science (logic, grammar as an algorithm, Vedic maths, Kaṭapayādi) and spiritual practice (focused recitation, reading the texts directly).",
  fiveStepFormula: [
    { step: '1. The Idea', sanskrit: 'धारणा', desc: 'The big picture mental model and algorithmic intuition.' },
    { step: '2. The Sound', sanskrit: 'ध्वनिः', desc: 'Acoustic attention, listen-and-repeat audio, and vocal resonance.' },
    { step: '3. The Rule', sanskrit: 'विधिः', desc: 'Mathematical precision, morphological formulas, and Pāṇinian mechanics.' },
    { step: '4. Practice', sanskrit: 'अभ्यासः', desc: 'Interactive self-checking drill + downloadable worksheet and answer key.' },
    { step: '5. Thinking Connection', sanskrit: 'चिन्तन-सेतुः', desc: 'Deep bridge linking the lesson to the Scientific Mind or Contemplative Mind.' },
  ],
};

export const COURSE_MODULES: CourseModule[] = [
  // =========================================================================
  // MODULE 1: Sound as Input (ध्वनिः)
  // =========================================================================
  {
    id: 'mod-1',
    moduleNumber: 1,
    titleDevanagari: 'ध्वनिः · Sound as Input',
    titleEnglish: 'Sound as Input (ध्वनिः)',
    tagline: 'Acoustic input calibrated by places of articulation',
    themeColor: '#0f766e',
    icon: '🔊',
    overview:
      'Explore how Sanskrit treats speech not as arbitrary text labels, but as calibrated physical resonance. Sound is traced from its physical contact points in the mouth to Pāṇini’s legendary sound-compression vectors.',
    lessons: [
      {
        id: 'c-1-1',
        lessonNumber: '1.1',
        titleDevanagari: 'संस्कृतं मनसः साधनम्',
        titleEnglish: 'Why Sanskrit Trains the Mind',
        shortDescription: 'Language as an instrument of attention and cognitive calibration, not just arbitrary communication tokens.',
        ideaConcept: {
          heading: 'Language as an Instrument of Thought',
          summary: 'In most modern languages, sounds are arbitrary tags borrowed and changed by chance. In Sanskrit, sound is an exact instrument designed to hold the mind steady.',
          body: [
            'Most people meet language as casual chatter or written symbols. But for ancient thinkers, speech was an exact instrument for observing how the brain and breath collaborate.',
            'When you must pronounce each syllable with exact duration (mātrā) and exact tongue position, you cannot daydream. The vocal apparatus becomes a cognitive calibration tool.',
            'This is why Sanskrit forms the bedrock of both computational linguistics and meditative mindfulness.'
          ],
          keyTakeaway: 'Sanskrit trains the mind because you cannot speak it correctly without total physical and mental attention.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'ॐ', iast: 'Oṁ', meaning: 'The primordial continuous resonant sound' },
            { devanagari: 'वाक्', iast: 'Vāk', meaning: 'Sacred Speech / Acoustic expression' },
            { devanagari: 'चित्तम्', iast: 'Cittam', meaning: 'Consciousness / Mind-field' }
          ],
          phoneticInstructions: 'Inhale deeply. As you recite "ॐ", feel the sound start deep in the throat, roll across the palate, and terminate cleanly at closed lips.',
          recitationTips: 'Do not rush. Listen to the resonance lingering in your sinuses after the lips close.'
        },
        ruleMechanics: {
          title: 'The Law of Acoustic Integrity',
          explanation: [
            'Every Sanskrit sound corresponds to a specific geometric shape of the oral cavity.',
            'Unlike English (where "c" sounds like "k" in cat and "s" in city), Sanskrit has 100% phonetic consistency: every letter has exactly one sound, and every sound has exactly one letter.'
          ],
          sutraReference: {
            devanagari: 'वर्णो वर्णान्तरेण न संकीर्यते',
            iast: 'varṇo varṇāntareṇa na saṅkīryate',
            meaning: 'No sound is ever confused with or corrupted by another sound.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-1-1',
            prompt: 'Why is Sanskrit called an "engineered instrument" rather than a casual vernacular?',
            options: [
              'Because it was invented recently in a computer lab',
              'Because its sounds map 1-to-1 with vocal contact points without arbitrary spelling anomalies',
              'Because it has no vowels',
              'Because it can only be written and never spoken'
            ],
            correctIndex: 1,
            explanation: 'Sanskrit phonetics is engineered with 100% phonetic fidelity: every acoustic symbol maps to an exact physiological organ of production.'
          },
          worksheetSummary: 'Worksheet 1.1: Cognitive Attention & Acoustic Sound Mapping (Includes vowel duration drills and vocal tract tracing exercises).',
          worksheetDownloadId: 'ws-c1-1'
        },
        thinkingConnection: {
          type: 'integrated',
          badgeLabel: '🧠 Cognitive Science & Contemplation',
          heading: 'Neuro-Linguistic Feedback Loops',
          bridgeExplanation: 'Modern neuroimaging demonstrates that reciting metered, phonetically strict languages activates bilateral motor cortices and vagal tone, synchronizing respiration with cardiac rhythms.',
          modernInsight: 'Just as a software engineer requires type safety to avoid runtime errors, Sanskrit uses phonetic safety to avoid cognitive drift.'
        },
        linkedResources: [
          { label: 'Alphabet & Syllables Masterclass', targetView: 'varnamala', badge: 'Audio Studio' },
          { label: 'Philosophy: Why Learn Sanskrit in AI Age', targetView: 'philosophy', badge: 'Essay' }
        ]
      },
      {
        id: 'c-1-2',
        lessonNumber: '1.2',
        titleDevanagari: 'पञ्च उच्चारण-स्थानानि',
        titleEnglish: 'The Five Places of Articulation (Śikṣā)',
        shortDescription: 'The vocal tract as an orderly geometric acoustic pipe from throat to lips.',
        ideaConcept: {
          heading: 'The Oral Cavity as a Resonant Flute',
          summary: 'The human vocal tract is divided into 5 distinct zones: Kaṇṭha (throat), Tālu (palate), Mūrdhan (dome roof), Danta (teeth), and Oṣṭha (lips).',
          body: [
            'Notice the physical progression: sound originates deep in the throat and travels forward in a perfect straight line until it reaches the outermost lips.',
            'Every consonant and vowel belongs to one of these five acoustic stations.'
          ],
          keyTakeaway: 'The five places of articulation (स्थान) organize human speech from deepest origin to outermost release.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'कण्ठ्य', iast: 'Kaṇṭhya', meaning: 'Throat / Velar (क, ख, ग, घ, ङ)' },
            { devanagari: 'तालव्य', iast: 'Tālavya', meaning: 'Palatal (च, छ, ज, झ, ञ)' },
            { devanagari: 'मूर्धन्य', iast: 'Mūrdhanya', meaning: 'Retroflex / Hard Palate (ट, ठ, ड, ढ, ण)' },
            { devanagari: 'दन्त्य', iast: 'Dantya', meaning: 'Dental (त, थ, द, ध, न)' },
            { devanagari: 'ओष्ठ्य', iast: 'Oṣṭhya', meaning: 'Labial / Lips (प, फ, ब, भ, म)' }
          ],
          phoneticInstructions: 'Pronounce क (throat), then च (middle tongue to palate), then ट (tongue curls to roof), then त (tongue hits teeth), then प (lips close). Notice the step-by-step outward march!',
          recitationTips: 'Feel how your tongue travels like a scanner across the roof of your mouth.'
        },
        ruleMechanics: {
          title: 'The Pāṇinian Sthāna-Kāraṇa Grid',
          explanation: [
            'Place of articulation (स्थान / Sthāna) is where the organ touches.',
            'Effort (प्रयत्न / Prayatna) is whether breath is held, aspirated, or resonated through the nasal chamber.'
          ],
          tableData: {
            headers: ['Zone (स्थानम्)', 'Vowels (स्वराः)', 'Consonants (व्यञ्जनानि)', 'Associated Sounds'],
            rows: [
              ['कण्ठ (Throat)', 'अ, आ', 'क्, ख्, ग्, घ्, ङ्', 'ह्, विसर्ग (ः)'],
              ['तालु (Palate)', 'इ, ई', 'च्, छ्, ज्, झ्, ञ्', 'य्, श्'],
              ['मूर्धा (Roof Dome)', 'ऋ, ॠ', 'ट्, ठ्, ड्, ढ्, ण्', 'र्, ष्'],
              ['दन्त (Teeth)', 'ऌ', 'त्, थ्, द्, ध्, न्', 'ल्, स्'],
              ['ओष्ठ (Lips)', 'उ, ऊ', 'प्, फ्, ब्, भ्, म्', 'उपध्मानीय']
            ]
          },
          sutraReference: {
            devanagari: 'अकुहविसर्जनीयानां कण्ठः',
            iast: 'akuha-visarjanīyānāṁ kaṇṭhaḥ',
            meaning: 'Sound "a", "ku" group, "ha", and Visarga are born from the Kaṇṭha (throat).'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-1-2',
            prompt: 'Which part of the mouth produces the letters ट, ठ, ड, ढ, ण?',
            options: [
              'The lips (ओष्ठ्य)',
              'The hard roof/dome with tongue curled back (मूर्धन्य)',
              'The back of the teeth (दन्त्य)',
              'The deep throat (कण्ठ्य)'
            ],
            correctIndex: 1,
            explanation: 'The "Ṭa" class (ट-वर्ग) requires the tip of the tongue to curl upwards and strike the domed hard palate (मूर्धा).'
          },
          worksheetSummary: 'Worksheet 1.2: The 5 Acoustic Contact Zones & Cross-Phonetic Identification Chart.',
          worksheetDownloadId: 'ws-c1-2'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Acoustic Physics & Wave Guides',
          heading: 'The Vocal Tract as a Cylindrical Acoustic Resonator',
          bridgeExplanation: 'In acoustics, the vocal tract acts as a series of concatenated acoustic tubes. By systematically varying the constriction location from larynx to lips, Sanskrit produces distinct formant frequencies (F1, F2, F3) with zero ambiguity.',
          modernInsight: 'Modern speech synthesizers (like Text-to-Speech deep neural nets) model the vocal tract using the exact 5 acoustic filter zones codified in Śikṣā 3,000 years ago.'
        },
        linkedResources: [
          { label: 'Voice Anatomy & Śikṣā Guide', targetView: 'grammar', param: 'article:shiksha-sound-anatomy', badge: 'Grammar Article' },
          { label: 'Alphabet Audio Studio', targetView: 'varnamala', badge: 'Interactive' }
        ]
      },
      {
        id: 'c-1-3',
        lessonNumber: '1.3',
        titleDevanagari: 'ह्रस्व-दीर्घ-प्लुताः स्वराः',
        titleEnglish: 'Vowels: Short, Long and Prolated',
        shortDescription: 'Time and duration (mātrā) as strict mathematical rhythm, like musical beats.',
        ideaConcept: {
          heading: 'Syllabic Duration as Mathematical Measure (Mātrā)',
          summary: 'In Sanskrit, a vowel is not simply a sound; it is an exact unit of time. One beat (Hrasva) vs two beats (Dīrgha) completely alters the meaning of a word.',
          body: [
            '1 Mātrā (ह्रस्व / Short): Quick, like the snap of a finger (अ, इ, उ, ऋ, ऌ).',
            '2 Mātrās (दीर्घ / Long): Double duration (आ, ई, ऊ, ॠ, ए, ऐ, ओ, औ).',
            '3 Mātrās (प्लुत / Prolated): Held for calling or chanting across distance (३).'
          ],
          keyTakeaway: 'Timing is semantic in Sanskrit. Rushing or dragging a vowel changes the word entirely.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'शिव', iast: 'Śiva', meaning: 'Short "i": Auspicious, Lord Shiva' },
            { devanagari: 'शीत', iast: 'Śīta', meaning: 'Long "ī": Cold, cool' },
            { devanagari: 'सुतः', iast: 'Sutaḥ', meaning: 'Short "u": Son' },
            { devanagari: 'सूता', iast: 'Sūtā', meaning: 'Long "ū": Charioteer / Daughter' }
          ],
          phoneticInstructions: 'Tap your desk rhythmically. Tap once for "अ" (1 beat), tap twice for "आ" (2 beats). Do not alter the sound quality, only double the duration.',
          recitationTips: 'Ancient texts compare 1 mātrā to the blue jay call, 2 mātrās to the crow of a rooster, and 3 mātrās to the cry of a peacock.'
        },
        ruleMechanics: {
          title: 'The Time-Scale of Syllables (Mātrā-Kāla)',
          explanation: [
            'Hrasva (ह्रस्व) = 1 beat (अ, इ, उ, ऋ, ऌ)',
            'Dīrgha (दीर्घ) = 2 beats (आ, ई, ऊ, ॠ, ए, ऐ, ओ, औ)',
            'Pluta (प्लुत) = 3 beats (marked with the numeral ३ in Devanagari)'
          ],
          sutraReference: {
            devanagari: 'ऊकालोऽज्झ्रस्वदीर्घप्लुतः',
            iast: 'ūkālo\'j-jhrasva-dīrgha-plutaḥ (Pāṇini 1.2.27)',
            meaning: 'A vowel with duration like the call of a rooster (u, ū, u3) is called short, long, or prolated.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-1-3',
            prompt: 'What happens if you pronounce "शिव" (Śiva) with a long vowel "शी"?',
            options: [
              'It has no effect',
              'It changes from "auspicious" to a word meaning "cold" (शीत/शी)',
              'It becomes past tense',
              'It turns into a consonant'
            ],
            correctIndex: 1,
            explanation: 'Vowel duration in Sanskrit is phonemic and semantic — altering the duration completely alters the root and definition.'
          },
          worksheetSummary: 'Worksheet 1.3: Mātrā Counting & Audio Duration Discernment Drills.',
          worksheetDownloadId: 'ws-c1-3'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 Breath & Prāṇāyāma in Speech',
          heading: 'Mātrā as Metronomic Breath Regulation',
          bridgeExplanation: 'Just as prāṇāyāma measures breath in counts of 1:2:4, Sanskrit verse reciting trains the autonomic nervous system to measure vocal output in strict mathematical beats. Mind and breath stabilize simultaneously.',
          modernInsight: 'Modern cognitive psychology recognizes rhythmic metered recitation as a proven method to induce high-alpha and theta brainwaves, reducing cortisol and anxiety.'
        },
        linkedResources: [
          { label: 'Deepakam Chapter 1 Living Reader', targetView: 'reader', param: 'gsde101', badge: 'Textbook' },
          { label: 'Varṇamālā Vowel Length Chart', targetView: 'varnamala', badge: 'Pronunciation' }
        ]
      },
      {
        id: 'c-1-4',
        lessonNumber: '1.4',
        titleDevanagari: 'स्पर्श-वर्णाः · ५×५ चक्रम्',
        titleEnglish: 'Consonant Groups and the Grid of क to म',
        shortDescription: 'A 5×5 two-dimensional matrix combining place of contact with degree of breath and voicing.',
        ideaConcept: {
          heading: 'The 25 Sparśa Consonants as a 5×5 Matrix',
          summary: 'Sanskrit organizes its 25 primary consonants into a beautiful 5×5 grid. Horizontal axis is effort/voicing; vertical axis is location in the mouth.',
          body: [
            'Row 1: Throat (क-वर्ग)',
            'Row 2: Palate (च-वर्ग)',
            'Row 3: Roof Dome (ट-वर्ग)',
            'Row 4: Teeth (त-वर्ग)',
            'Row 5: Lips (प-वर्ग)',
            'Column 1 & 3: Unaspirated (अल्पप्राण). Column 2 & 4: Aspirated with breath puff (महाप्राण). Column 5: Pure Nasal (अनुनासिक).'
          ],
          keyTakeaway: 'You do not memorize random lists of letters. You navigate a 2D Cartesian matrix of acoustic coordinates.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'क ख ग घ ङ', iast: 'ka kha ga gha ṅa', meaning: 'Velar row (throat)' },
            { devanagari: 'त थ द ध न', iast: 'ta tha da dha na', meaning: 'Dental row (teeth)' },
            { devanagari: 'प फ ब भ म', iast: 'pa pha ba bha ma', meaning: 'Labial row (lips)' }
          ],
          phoneticInstructions: 'Hold your palm 2 inches in front of your mouth. Say "क" (no breath puff hits your hand). Say "ख" (a distinct puff of warm air hits your palm!). That is the exact difference between अल्पप्राण and महाप्राण.',
          recitationTips: 'Keep your vocal cords vibrating continuously through columns 3, 4, and 5 (घोष).'
        },
        ruleMechanics: {
          title: 'The 5×5 Sparśa Table',
          explanation: [
            'Column 1: Unvoiced Unaspirated (क, च, ट, त, प)',
            'Column 2: Unvoiced Aspirated (ख, छ, ठ, थ, फ)',
            'Column 3: Voiced Unaspirated (ग, ज, ड, द, ब)',
            'Column 4: Voiced Aspirated (घ, झ, ढ, ध, भ)',
            'Column 5: Voiced Nasal (ङ, ञ, ण, न, म)'
          ],
          tableData: {
            headers: ['Gaṇa (वर्गः)', 'Col 1 (अल्प)', 'Col 2 (महा)', 'Col 3 (घोष-अल्प)', 'Col 4 (घोष-महा)', 'Col 5 (नासिक्य)'],
            rows: [
              ['क-वर्ग (Velar)', 'क', 'ख', 'ग', 'घ', 'ङ'],
              ['च-वर्ग (Palatal)', 'च', 'छ', 'ज', 'झ', 'ञ'],
              ['ट-वर्ग (Retroflex)', 'ट', 'ठ', 'ड', 'ढ', 'ण'],
              ['त-वर्ग (Dental)', 'त', 'थ', 'द', 'ध', 'न'],
              ['प-वर्ग (Labial)', 'प', 'फ', 'ब', 'भ', 'म']
            ]
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-1-4',
            prompt: 'In the 5×5 consonant grid, what do all Column 5 letters (ङ, ञ, ण, न, म) have in common?',
            options: [
              'They are all pronounced only with the teeth',
              'They are all Anunāsika (nasal) sounds vibrating through the nose',
              'They are completely silent',
              'They are foreign borrowings'
            ],
            correctIndex: 1,
            explanation: 'Column 5 contains the Anunāsika sounds of each of the 5 articulation zones, where breath resonates through both mouth and nose simultaneously.'
          },
          worksheetSummary: 'Worksheet 1.4: 5×5 Coordinate Matrix Navigation & Articulation Drills.',
          worksheetDownloadId: 'ws-c1-4'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Linear Algebra & Arrays',
          heading: '2D Arrays and Coordinate Addressing in Ancient India',
          bridgeExplanation: 'Every letter in the 5×5 grid can be addressed like an array cell: `Cell[row, column]`. Pāṇini uses these coordinates algorithmically in Sandhi rules: e.g., "replace any Col 1 letter with its Col 3 equivalent before a voiced vowel".',
          modernInsight: 'This is identical to matrix lookup tables in GPU shader programming and data transformation pipelines.'
        },
        linkedResources: [
          { label: 'Jodo Tile Puzzle Studio', targetView: 'board', badge: 'Word Game' },
          { label: 'Alphabet Studio', targetView: 'varnamala', badge: 'Sound Chart' }
        ]
      },
      {
        id: 'c-1-5',
        lessonNumber: '1.5',
        titleDevanagari: 'अन्तस्थाः, ऊष्माणः, अयोगवाहाः',
        titleEnglish: 'Semivowels, Sibilants, Anusvāra and Visarga',
        shortDescription: 'Transition sounds, resonant friction, and breath echoes that frame speech.',
        ideaConcept: {
          heading: 'The Non-Grid Sounds: Bridge and Breath',
          summary: 'Beyond the 25 Sparśa consonants sit the semivowels (य, र, ल, व), the sibilants (श, ष, स, ह), and the breath markers (ं, ः).',
          body: [
            'Semivowels (अन्तस्थाः): Floating halfway between vowels and consonants. इ becomes य; उ becomes व; ऋ becomes र; ऌ becomes ल.',
            'Sibilants (ऊष्माणः): Sounds of hot rushing friction breath.',
            'Ayogavāhas (अयोगवाहाः): Sounds that cannot stand alone and must latch onto a preceding vowel (Anusvāra ं and Visarga ः).'
          ],
          keyTakeaway: 'Visarga and Anusvāra are not separate letters; they are breath qualifiers that echo the preceding life-force.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'रामः', iast: 'Rāmaḥ', meaning: 'Visarga after "a" sounds like gentle "aha"' },
            { devanagari: 'हरिः', iast: 'Hariḥ', meaning: 'Visarga after "i" sounds like gentle "ihi"' },
            { devanagari: 'गुरुः', iast: 'Guruḥ', meaning: 'Visarga after "u" sounds like gentle "uhu"' },
            { devanagari: 'संसारः', iast: 'Saṁsāraḥ', meaning: 'Anusvāra nasal ring before sibilant' }
          ],
          phoneticInstructions: 'Notice the Visarga (ः): It mirrors the preceding vowel like a gentle unvoiced exhale. After "a", it is "ha". After "i", it is "hi". After "u", it is "hu".',
          recitationTips: 'Never pronounce Visarga as a harsh standalone syllable. It is a breath shadow.'
        },
        ruleMechanics: {
          title: 'The Semivowel Formula (Yaṇ Sandhi Preview)',
          explanation: [
            'Vowel इ/ई + Dissimilar Vowel → य् (ya)',
            'Vowel उ/ऊ + Dissimilar Vowel → व् (va)',
            'Vowel ऋ/ॠ + Dissimilar Vowel → र् (ra)',
            'Vowel ऌ + Dissimilar Vowel → ल् (la)'
          ],
          sutraReference: {
            devanagari: 'इको यणचि',
            iast: 'iko yaṇaci (Pāṇini 6.1.77)',
            meaning: 'Replace the vowels "ik" with semivowels "yaṇ" when followed by any dissimilar vowel "ac".'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-1-5',
            prompt: 'How is the Visarga (ः) pronounced in the sacred word "गुरुः" (Guruḥ)?',
            options: [
              'Like a hard "guruh-ga"',
              'Like a soft breathy echo mirroring the "u": "guruhu"',
              'Like a dental "t"',
              'It is always silent'
            ],
            correctIndex: 1,
            explanation: 'The Visarga mirrors the preceding vowel: after "u" in गुरुः, it produces a gentle unvoiced breath echo "guruhu".'
          },
          worksheetSummary: 'Worksheet 1.5: Visarga & Anusvāra Phonetic Transmutation Drills.',
          worksheetDownloadId: 'ws-c1-5'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 The Witness of the Exhale',
          heading: 'The Visarga as the Boundary of Prāṇa',
          bridgeExplanation: 'In Tantric and Vedic phonetics, the Visarga (वि + √सृज् = to emit/release) represents the outward creation (sṛṣṭi) returning to silent repose. It trains the speaker to become conscious of the natural pause between outgoing breath and stillness.',
          modernInsight: 'Mindful breath observation in modern respiratory therapy mirrors the ancient practice of pausing consciously at the Visarga punctuation.'
        },
        linkedResources: [
          { label: 'Bodhi Visarga Pronunciation Guide', targetView: 'reader', badge: 'Q&A' },
          { label: 'Grammar Pronunciation Rules', targetView: 'grammar', param: 'article:pronunciation-rules', badge: 'Article' }
        ]
      },
      {
        id: 'c-1-6',
        lessonNumber: '1.6',
        titleDevanagari: 'माहेश्वर-सूत्राणि एवं प्रत्याहाराः',
        titleEnglish: 'The Māheśvara Sūtras — The First "Compression Code"',
        shortDescription: 'Pāṇini’s 14 acoustic sound vectors: the world’s first formal hashing and range indexing system.',
        ideaConcept: {
          heading: '14 Beats from Lord Śiva’s Damaru',
          summary: 'How do you refer to "all vowels" or "all voiced consonants" in two letters? Pāṇini created 14 sound lists that allow instant range indexing.',
          body: [
            '1. अ इ उ ण्',
            '2. ऋ ऌ क्',
            '3. ए ओ ङ्',
            '4. ऐ औ च्',
            '5. ह य व र ट् ... through to 14. ह ल्.',
            'Notice the final capital marker (इत्-संज्ञा) at the end of each sūtra. It is a stop-flag that doesn\'t count as a sound!'
          ],
          keyTakeaway: 'Pratyāhāra is the world\'s oldest compression algorithm: `StartChar + StopMarker = Entire Sound Range`.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'अच्', iast: 'Ac', meaning: 'All Vowels (from "a" to marker "c")' },
            { devanagari: 'हल्', iast: 'Hal', meaning: 'All Consonants (from "ha" to marker "l")' },
            { devanagari: 'अल्', iast: 'Al', meaning: 'Every sound in existence (All sounds)' },
            { devanagari: 'यण्', iast: 'Yaṇ', meaning: 'All Semivowels (y, v, r, l)' }
          ],
          phoneticInstructions: 'Chant the first 4 sūtras in rhythm: "a-i-uṇ / ṛ-ḷk / e-oṅ / ai-auc". Notice how the mouth moves from pure simple vowels to complex diphthongs.',
          recitationTips: 'Let the rhythm snap on each marker consonant (ण्, क्, ङ्, च्).'
        },
        ruleMechanics: {
          title: 'The Pratyāhāra Indexing Mechanism',
          explanation: [
            'Rule: Start with any sound in the 14 sūtras and pair it with any subsequent marker (इत्).',
            'Example: "अ" + marker "च्" = "अच्" (includes a, i, u, ṛ, ḷ, e, o, ai, au = All Vowels!).',
            'Example: "ह" + marker "ल्" = "हल्" (includes all 33 consonants!).'
          ],
          sutraReference: {
            devanagari: 'आदिरन्त्येन सहेता',
            iast: 'ādir antyena sahetā (Pāṇini 1.1.71)',
            meaning: 'An initial sound combined with a final marker denotes itself and all intermediate sounds.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-1-6',
            prompt: 'In Pāṇini\'s Māheśvara code, what does the shorthand "अच्" (Ac) stand for?',
            options: [
              'Only the letter A',
              'All consonants',
              'All vowels in the Sanskrit language',
              'Numbers 1 to 10'
            ],
            correctIndex: 2,
            explanation: '"Ac" (अच्) starts at "अ" in Sūtra 1 and stops at marker "च्" at the end of Sūtra 4, encompassing all vowels.'
          },
          worksheetSummary: 'Worksheet 1.6: Decoding Pāṇini’s 14 Sūtras & Building 42 Pratyāhāras.',
          worksheetDownloadId: 'ws-c1-6'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Compiler Theory & Hash Tables',
          heading: 'Array Slicing and RegEx Ranges 2,500 Years Early',
          bridgeExplanation: 'In modern Python, you write `alphabet[0:9]` to slice a sub-array. In regex, you write `[a-z]`. Pāṇini invented this exact string-slicing and range-compression convention in the 5th century BCE to keep his 4,000 grammatical rules ultra-compact.',
          modernInsight: 'Computer pioneer Frits Staal demonstrated that Backus-Naur Form (BNF) used to define programming languages like C, Java, and Python is mathematically isomorphic to Pāṇinian sūtra notation.'
        },
        linkedResources: [
          { label: 'Pāṇinian Dhātupāṭha Studio', targetView: 'dhatupatha', badge: 'Grammar Engine' },
          { label: 'Philosophy Essay on Pāṇinian Code', targetView: 'philosophy', badge: 'Reading' }
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 2: Script and Symbols (लिपिः)
  // =========================================================================
  {
    id: 'mod-2',
    moduleNumber: 2,
    titleDevanagari: 'लिपिः · Script and Symbols',
    titleEnglish: 'Script and Symbols (लिपिः)',
    tagline: 'Visualizing acoustic architecture through Devanāgarī glyphs',
    themeColor: '#b45309',
    icon: '✍️',
    overview:
      'Learn how Devanāgarī functions not as an arbitrary alphabet, but as an abugida where pure consonants, vowel modifiers (mātrās), and interlocking conjuncts visually represent vocal tract dynamics with 100% phonetic fidelity.',
    lessons: [
      {
        id: 'c-2-1',
        lessonNumber: '2.1',
        titleDevanagari: 'देवनागरी वर्णमाला एवं ऐ.ए.एस.टी.',
        titleEnglish: 'Devanāgarī Letters with IAST as Training Wheels',
        shortDescription: 'A phonetic script where what you see is exactly what you pronounce — no silent letters or deceptive spelling.',
        ideaConcept: {
          heading: '100% Phonetic Transparency',
          summary: 'In English, "gh" can sound like "f" (enough) or be silent (through). In Devanāgarī, ambiguity is impossible. Every visual glyph produces exactly one acoustic vibration.',
          body: [
            'Devanāgarī (literally "the script of the city of the gods") evolved through the ancient Brāhmī script as a direct visual spectrogram of human acoustic resonance.',
            'Each glyph is suspended under a continuous top horizontal hanging line called the Śirorekhā (शिरोरेखा), which visually groups letters into single breath-syllables (akṣaras).',
            'We use IAST (International Alphabet of Sanskrit Transliteration) as training wheels with macrons (ā, ī, ū) and underdots (ṭ, ḍ, ṇ, ṣ) so your tongue stays anatomically precise while reading Latin letters.'
          ],
          keyTakeaway: 'Devanāgarī is a visual spectrogram of sound. You never have to ask "how do you spell this word?" — the sound dictating the script is absolute.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'ज्ञानम्', iast: 'jñānam', meaning: 'Knowledge / Cognition / Direct insight' },
            { devanagari: 'सत्यम्', iast: 'satyam', meaning: 'Truth / Unbroken ontological reality' },
            { devanagari: 'धर्मः', iast: 'dharmaḥ', meaning: 'Righteous cosmic order and duty' },
            { devanagari: 'अक्षरम्', iast: 'akṣaram', meaning: 'Imperishable sound / Syllable' }
          ],
          phoneticInstructions: 'Pronounce each letter while observing the IAST diacritic: a dot under ṭ or ḍ means curl the tongue up to strike the dome; a bar above ā or ī means double the duration.',
          recitationTips: 'Never skip the top line (Śirorekhā) when handwriting Devanāgarī — it unifies the syllable into a single acoustic packet.'
        },
        ruleMechanics: {
          title: 'The Inherent Vowel Principle & Diacritic Map',
          explanation: [
            'Every bare consonant glyph in Devanāgarī contains an inherent short "a" vowel (अ).',
            'To strip away the vowel and leave only pure consonant silence, add a diagonal slash underneath called a Halanta (ह्लन्त / ्).',
            'IAST diacritics maintain a 1:1 bijective correspondence with Devanāgarī phonemes.'
          ],
          formula: 'क् (Pure silent stop K) + अ (Inherent breath a) = क (Audible Ka)',
          tableData: {
            headers: ['Devanāgarī Glyph', 'IAST Diacritic', 'Articulation Landmark', 'Acoustic / Durational Value', 'Example Word'],
            rows: [
              ['अ / आ', 'a / ā', 'Kaṇṭha (Throat velar)', 'Short (1 mātrā) vs Long (2 mātrās)', 'अमृतम् (Amṛtam) / आकाशः (Ākāśaḥ)'],
              ['इ / ई', 'i / ī', 'Tālu (Palate)', 'Short front close vs Long front close', 'इच्छा (Icchā) / ईश्वरः (Īśvaraḥ)'],
              ['उ / ऊ', 'u / ū', 'Oṣṭha (Lips rounded)', 'Short labial vs Long labial', 'उपनिषद् (Upaniṣad) / ऊर्जा (Ūrjā)'],
              ['ऋ / ॠ', 'ṛ / ṝ', 'Mūrdhan (Dome roof)', 'Vocalic retroflex consonant-vowel', 'ऋषिः (Ṛṣiḥ) / पितॄणाम् (Pitṝṇām)'],
              ['ट / त', 'ṭa / ta', 'Mūrdhan vs Danta', 'Retroflex (underdot) vs Dental (plain)', 'टीका (Ṭīkā) / तर्कः (Tarkaḥ)'],
              ['श / ष / स', 'śa / ṣa / sa', 'Tālu / Mūrdhan / Danta', 'Palatal (ś) vs Retroflex (ṣ) vs Dental (s)', 'शान्तिः (Śāntiḥ) / भाषा (Bhāṣā) / सत्यम् (Satyam)']
            ]
          },
          sutraReference: {
            devanagari: 'नाम्नां धातुजत्वं शाकटायनश्च',
            iast: 'nāmnāṁ dhātujatvaṁ śākaṭāyanaś ca',
            meaning: 'All nominal forms originate from roots of action; every glyph reflects precise phonetic reality.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-2-1',
            prompt: 'What does a small diagonal stroke under a Devanāgarī consonant (like क्) signify?',
            options: [
              'It makes the letter plural',
              'It is a Halanta, removing the inherent "a" vowel to leave a pure silent consonant',
              'It marks a musical note',
              'It turns the letter into a question mark'
            ],
            correctIndex: 1,
            explanation: 'The Halanta ( ् ) silences the inherent short "a" vowel, indicating a pure consonant.'
          },
          worksheetSummary: 'Worksheet 2.1: Devanāgarī Stroke Order & IAST Diacritic Transliteration Matrix.',
          worksheetDownloadId: 'ws-c2-1'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Information Theory & Encodings',
          heading: 'Bijective 1-to-1 Mapping in Symbol Systems',
          bridgeExplanation: 'In mathematics and computer science, a bijective mapping means every input maps to exactly one output with zero collisions. Devanāgarī is one of the few natural language writing systems that achieves near-perfect bijectivity between phonemes and graphemes.',
          modernInsight: 'This makes Sanskrit optical character recognition (OCR) and speech-to-text algorithms mathematically cleaner than irregularly spelled languages like English or French.'
        },
        linkedResources: [
          { label: 'Alphabet & Syllables Interactive Studio', targetView: 'varnamala', badge: 'Alphabet' },
          { label: 'NCERT Deepakam Reader Transliteration', targetView: 'reader', badge: 'Tool' }
        ]
      },
      {
        id: 'c-2-2',
        lessonNumber: '2.2',
        titleDevanagari: 'मात्रा-संयोगाः एवं विशेष-नियमाः',
        titleEnglish: 'Mātrās and Dependent Symbols',
        shortDescription: 'Consonants as silent instruments; vowel mātrās as the breath modifiers attached to them.',
        ideaConcept: {
          heading: 'Consonants Clothed in Breath',
          summary: 'When a vowel attaches to a consonant, it sheds its standalone shape and turns into an elegant modifier flag called a Mātrā.',
          body: [
            'A pure consonant is motionless like a parked car. The vowel Mātrā is the engine ignition.',
            'Barakhadi (बारहखड़ी) is the complete 12+ vowel scale practiced for every single consonant from क to ह.',
            'Mastering the 13 Mātrā attachments unlocks instant reading fluency for thousands of words.'
          ],
          keyTakeaway: 'Consonants provide the structural skeleton; vowel mātrās are the prāṇa (breath) that brings speech alive.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'कि - की', iast: 'ki - kī', meaning: 'Short i vs Long ī' },
            { devanagari: 'कु - कू', iast: 'ku - kū', meaning: 'Short u vs Long ū' },
            { devanagari: 'कृ - के', iast: 'kṛ - ke', meaning: 'Vocalic ṛ vs Guna e' },
            { devanagari: 'रु - रू', iast: 'ru - rū', meaning: 'Special attachment side-stem for Ra' }
          ],
          phoneticInstructions: 'Look closely at "रु" (curved hook on side) versus "रू" (looped stem on side). Notice also "हृ" (hṛ), where the ṛ curl sits inside the stomach of "ह"!',
          recitationTips: 'Keep short vowels snappy and long vowels smooth and melodic.'
        },
        ruleMechanics: {
          title: 'The Mātrā Modifier Inventory & Rules of Duration',
          explanation: [
            'का (ा) = +ā, कि (ि) = +i, की (ी) = +ī, कु (ु) = +u, कू (ू) = +ū',
            'कृ (ृ) = +ṛ, के (े) = +e, कै (ै) = +ai, को (ो) = +o, कौ (ौ) = +au',
            'कं (ं) = +ṁ (Anusvāra nasalization), कः (ः) = +ḥ (Visarga aspirate release)'
          ],
          tableData: {
            headers: ['Consonant', 'Vowel', 'Mātrā Sign', 'Resulting Akṣara', 'Example Word', 'Mātrā Duration'],
            rows: [
              ['क्', 'आ', 'ा', 'का', 'कालः (Time)', '2 Mātrās (Dīrgha)'],
              ['क्', 'इ', 'ि', 'कि', 'किम् (What)', '1 Mātrā (Hrasva)'],
              ['क्', 'ई', 'ी', 'की', 'कीर्तिः (Glory)', '2 Mātrās (Dīrgha)'],
              ['क्', 'उ', 'ु', 'कु', 'कुशलः (Skilled)', '1 Mātrā (Hrasva)'],
              ['क्', 'ऊ', 'ू', 'कू', 'कूपः (Well)', '2 Mātrās (Dīrgha)'],
              ['क्', 'ऋ', 'ृ', 'कृ', 'कृष्णः (Krishna)', '1 Mātrā (Vocalic)'],
              ['क्', 'ए', 'े', 'के', 'केवलम् (Alone / Pure)', '2 Mātrās (Guṇa)'],
              ['क्', 'ऐ', 'ै', 'कै', 'कैलासः (Kailash)', '2 Mātrās (Vṛddhi)']
            ]
          },
          sutraReference: {
            devanagari: 'ऊकालोऽज्झ्रस्वदीर्घप्लुतः',
            iast: "ūkālo'j-jhrasva-dīrgha-plutaḥ (Pāṇini 1.2.27)",
            meaning: 'A vowel having the duration of short u, long ū, or prolated u3 is designated as Hrasva, Dīrgha, or Pluta respectively.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-2-2',
            prompt: 'Where do vowels उ (u) and ऊ (ū) attach when combined with the letter र (ra)?',
            options: [
              'Underneath the letter like all other consonants',
              'On top of the horizontal line',
              'Directly to the middle-right side of the letter (रु, रू)',
              'They cannot be combined'
            ],
            correctIndex: 2,
            explanation: 'Letter Ra is unique: rather than attaching underneath, "u" and "ū" attach to its middle-right stem (रु as in गुरुः, रू as in रूपम्).'
          },
          worksheetSummary: 'Worksheet 2.2: Complete Barakhadi Grid & Special Script Exceptions (रु, रू, हृ).',
          worksheetDownloadId: 'ws-c2-2'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 Form (Prakṛti) & Consciousness (Puruṣa)',
          heading: 'The Consonant as Body, the Vowel as Soul',
          bridgeExplanation: 'In Sāṅkhya philosophy, matter (Prakṛti) is inert without the illuminating presence of spirit (Puruṣa). Ancient grammarians noted this exact parallel: a consonant (Vyañjana) is physically inert and silent until the vowel (Svara) breathes sound and animation into it.',
          modernInsight: 'This profound metaphor turned early literacy in Gurukuls into a daily spiritual contemplation on the relationship between physical form and inner consciousness.'
        },
        linkedResources: [
          { label: 'Barakhadi Master Chart', targetView: 'reader', badge: 'High-Res Chart' },
          { label: 'Jodo Word Puzzle Studio', targetView: 'board', badge: 'Practice' }
        ]
      },
      {
        id: 'c-2-3',
        lessonNumber: '2.3',
        titleDevanagari: 'संयुक्ताक्षराणि · बन्ध-कला',
        titleEnglish: 'Conjuncts (Saṁyuktākṣarāṇi)',
        shortDescription: 'When syllables touch without an intervening vowel, consonants physically interlock into ligature glyphs.',
        ideaConcept: {
          heading: 'Ligatures: The Geometry of Syllable Fusion',
          summary: 'In English, "str" is written as three separate letters side-by-side. In Sanskrit, when consonants collide without a vowel between them, they merge into a single sculpted conjunct (संयुक्ताक्षर).',
          body: [
            'Standard conjuncts remove the vertical stem (अर्ध-वर्ण): e.g. न् + य = न्य (as in धन्य).',
            'Major irregular ligatures: क् + ष = क्ष (kṣa), त् + र = त्र (tra), ज् + ञ = ज्ञ (jña), श् + र = श्र (śra).',
            'Conjuncts are not confusing puzzles; they are visual representations of physical acoustic speed and vocal fluidity.'
          ],
          keyTakeaway: 'A conjunct is pure physical cohesion: two or more articulators striking in immediate succession before the vowel arrives.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'विद्या', iast: 'vidyā', meaning: 'द् + य = द्य (Wisdom / Gnosis)' },
            { devanagari: 'ज्ञानम्', iast: 'jñānam', meaning: 'ज् + ञ = ज्ञ (Knowledge / Direct cognition)' },
            { devanagari: 'ईश्वरः', iast: 'īśvaraḥ', meaning: 'श् + व = श्व (Supreme Ruler / Divinity)' },
            { devanagari: 'मित्रम्', iast: 'mitram', meaning: 'त् + र = त्र (Friend / Ally)' }
          ],
          phoneticInstructions: 'Pronounce "द्" and "य" without inserting a tiny "uh" sound between them. Let your tongue immediately touch the palate for "y" before releasing "d"!',
          recitationTips: 'Keep conjunct consonants crisp and percussive.'
        },
        ruleMechanics: {
          title: 'The Rules of Conjunct Formation & Ligature Typologies',
          explanation: [
            'Rule 1 (Stem Drop): Consonants with vertical stems (like त, प, स) drop their stem: त् + व = त्व.',
            'Rule 2 (Repha र्): When र् comes first, it flies above the next letter like a sickle (सूर्य = सू + र् + य).',
            'Rule 3 (Rā-Kāra): When र comes second, it sits as a slash under the first letter (प्रकाश = प् + र + का + श).'
          ],
          formula: 'C₁ (Halanta) + C₂ = C₁C₂ (Ligature Glyph)',
          tableData: {
            headers: ['Conjunct Type', 'Constituent Phonemes', 'Ligature Glyph', 'Iconic Word', 'Phonetic Secret'],
            rows: [
              ['Stem Drop (अर्ध-वर्ण)', 'न् + य', 'न्य', 'धन्यः (Dhanyaḥ)', 'Vertical stem disappears; second letter carries vowel'],
              ['Preceding Ra (Repha)', 'र् + य', 'र्य', 'सूर्यः (Sūryaḥ)', 'Ra floats to the top right of next consonant roof'],
              ['Following Ra (Rā-kāra)', 'प् + र', 'प्र', 'प्रकाशः (Prakāśaḥ)', 'Ra anchors as a diagonal slash under the vertical stem'],
              ['Compound Ligature 1', 'क् + ष', 'क्ष', 'मोक्षः (Mokṣaḥ)', 'Throat velar merges directly into dome retroflex'],
              ['Compound Ligature 2', 'त् + र', 'त्र', 'मित्रम् (Mitram)', 'Dental stop meets retroflex liquid glide'],
              ['Compound Ligature 3', 'ज् + ञ', 'ज्ञ', 'ज्ञानम् (Jñānam)', 'Palatal stop fuses into palatal nasal'],
              ['Compound Ligature 4', 'श् + र', 'श्र', 'श्रीः (Śrīḥ)', 'Palatal sibilant blends into liquid roll'],
              ['Vertical Stack', 'द् + ध', 'द्ध', 'बुद्धः (Buddhaḥ)', 'First consonant sits directly atop the second']
            ]
          },
          sutraReference: {
            devanagari: 'हलोऽनन्तराः संयोगः',
            iast: "halo'nantarāḥ saṁyogaḥ (Pāṇini 1.1.7)",
            meaning: 'Consonants occurring in uninterrupted sequence without intervening vowels constitute a Saṁyoga (conjunct ligature).'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-2-3',
            prompt: 'In the word "सूर्यः" (Sūryaḥ), what is the little sickle stroke (र्) sitting on top of "य"?',
            options: [
              'It is a decorative dot',
              'It is Repha (रेफः), indicating a silent preceding "r" sound before the "ya"',
              'It marks a vowel length',
              'It is a punctuation mark'
            ],
            correctIndex: 1,
            explanation: 'When "r" is the first consonant of a conjunct, it floats to the top of the subsequent letter as a hook/sickle called Repha (रेफः).'
          },
          worksheetSummary: 'Worksheet 2.3: 50 Common Conjuncts & Ligature Decomposition Worksheet.',
          worksheetDownloadId: 'ws-c2-3'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Typography & Graph Theory',
          heading: 'Dynamic Glyph Composition in Digital Typography',
          bridgeExplanation: 'In modern digital font engines (like OpenType, HarfBuzz, and FreeType), Devanāgarī conjunct rendering requires complex Directed Acyclic Graphs (DAGs) and GSUB (glyph substitution) tables. Sanskrit proved to be the ultimate stress test for modern computing typography.',
          modernInsight: 'The modular ligature rules of Sanskrit anticipated the component-based UI rendering models used in modern web frontend frameworks.'
        },
        linkedResources: [
          { label: 'Jodo Tile Studio (6,000+ Conjunct Puzzles)', targetView: 'board', badge: 'Interactive' },
          { label: 'Deepakam Chapter 1 Reading', targetView: 'reader', badge: 'Text' }
        ]
      },
      {
        id: 'c-2-4',
        lessonNumber: '2.4',
        titleDevanagari: 'प्रथम-पद-पठनम्',
        titleEnglish: 'Reading Your First Words Aloud',
        shortDescription: 'Bringing eye, ear, tongue, and chest resonance into single-pointed flow.',
        ideaConcept: {
          heading: 'From Silent Decryption to Vocal Resonance',
          summary: 'Reading Sanskrit with the eyes alone is like looking at sheet music without playing the instrument. The magic happens only when vocal cords vibrate.',
          body: [
            'In this lesson, we synthesize the places of articulation, vowel mātrās, and conjuncts to read foundational Gurukul words.',
            'Listen to Bodhi speak the word, then pause and repeat aloud with your full chest voice.',
            'Meeting speech with the mouth is how sound transforms from digital data into living realization.'
          ],
          keyTakeaway: 'Reading aloud in Sanskrit bridges perception and action, calming the autonomic nervous system through calibrated breath.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'नमस्ते', iast: 'Namaste', meaning: 'Salutations to the divine spark in you' },
            { devanagari: 'सुप्रभातम्', iast: 'Suprabhātam', meaning: 'Good morning / Auspicious dawn' },
            { devanagari: 'शान्तिः', iast: 'Śāntiḥ', meaning: 'Unshakeable threefold peace' },
            { devanagari: 'आनन्दः', iast: 'Ānandaḥ', meaning: 'Boundless spiritual joy / Bliss' }
          ],
          phoneticInstructions: 'Pronounce each word in clear syllables: Na-ma-ste; Su-pra-bhā-tam; Śān-tiḥ; Ā-nan-daḥ.',
          recitationTips: 'Hold your spine upright and relax your jaw so the sound resonates without strain.'
        },
        ruleMechanics: {
          title: 'Syllabic Parsing (Varṇa-Viccheda) & Word Constitution',
          explanation: [
            'To read any long Sanskrit word effortlessly, break it down into its constituent phonemes (वर्ण-विच्छेद):',
            'नमस्ते = न् + अ + म् + अ + स् + त् + ए (4 syllables, 4 mātrās)'
          ],
          tableData: {
            headers: ['Sanskrit Word', 'Varṇa-Viccheda (वर्ण-विच्छेद)', 'Mātrā Breakdown', 'IAST', 'Semantic Realization'],
            rows: [
              ['नमस्ते', 'न् + अ + म् + अ + स् + त् + ए', '1 + 1 + 2 = 4 mātrās', 'namaste', 'Reverence to the divine spark within you'],
              ['शान्तिः', 'श् + आ + न् + त् + इ + ः', '2 + 1 + 1 = 4 mātrās', 'śāntiḥ', 'Settling of all three disturbances (tāpatraya)'],
              ['विद्या', 'व् + इ + द् + य् + आ', '1 + 2 = 3 mātrās', 'vidyā', 'Luminescent realization from root √विद् (to know)'],
              ['गुरुः', 'ग् + उ + र् + उ + ः', '1 + 1 = 2 mātrās', 'guruḥ', 'Dispeller of darkness; heavy with wisdom'],
              ['आनन्दः', 'आ + न् + अ + न् + द् + अ + ः', '2 + 1 + 1 = 4 mātrās', 'ānandaḥ', 'Unconditional inner delight / bliss']
            ]
          },
          sutraReference: {
            devanagari: 'सुप्तिङन्तं पदम्',
            iast: 'suptiṅantaṁ padam (Pāṇini 1.4.14)',
            meaning: 'That which ends in nominal declension suffixes (sup) or verbal conjugation suffixes (tiṅ) is a Pada (a valid complete word).'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-2-4',
            prompt: 'What is the correct letter-by-letter breakdown of the sacred word "शान्तिः" (Śāntiḥ)?',
            options: [
              'श् + आ + न् + त् + इ + ः',
              'ष् + अ + न् + त् + ई + ः',
              'स् + आ + म् + त् + उ',
              'श् + इ + न् + त् + आ'
            ],
            correctIndex: 0,
            explanation: 'शान्तिः breaks down as: श् + आ (Śā) + न् + त् + इ (nti) + ः (ḥ).'
          },
          worksheetSummary: 'Worksheet 2.4: Varṇa-Viccheda Word Decomposition & Read-Aloud Mastery Sheet.',
          worksheetDownloadId: 'ws-c2-4'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 Vāk & Consciousness',
          heading: 'The Four Levels of Speech (Catvāro Vācaḥ)',
          bridgeExplanation: 'The Ṛgveda proclaims that speech has four stations: Vaikharī (spoken aloud), Madhyamā (whispered in mind), Paśyantī (intuitive visual flash), and Parā (the transcendent unmanifest source). Reading aloud in Vaikharī is the launchpad that trains your attention to travel inward to Parā.',
          modernInsight: 'Mindful vocalization anchors attention in the present moment, interrupting rumination and recursive anxiety loops.'
        },
        linkedResources: [
          { label: 'NCERT Deepakam Chapter 1 Living Reader', targetView: 'reader', param: 'gsde101', badge: 'Interactive Reader' },
          { label: 'Bodhi Mascot Q&A on 4 Levels of Vāk', targetView: 'home', badge: 'Bodhi Guide' }
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 3: Rules as Processing (व्याकरणम्)
  // =========================================================================
  {
    id: 'mod-3',
    moduleNumber: 3,
    titleDevanagari: 'व्याकरणम् · Rules as Processing',
    titleEnglish: 'Rules as Processing (व्याकरणम्)',
    tagline: 'Morphological algorithms: turning roots into sentences',
    themeColor: '#4f46e5',
    icon: '⚙️',
    overview:
      'Master the algorithmic engine of Sanskrit. See how ~2,000 algorithmic roots (Dhātus) morph through present-tense verb conjugations, 7 noun case roles (Vibhaktis), sound junctions (Sandhi), and compact compounds (Samāsas).',
    lessons: [
      {
        id: 'c-3-1',
        lessonNumber: '3.1',
        titleDevanagari: 'धातवः · बीज-शब्दाः',
        titleEnglish: 'Roots (Dhātavaḥ): One Root, Many Words',
        shortDescription: 'Every noun and verb seeds from an algorithmic root action — no foreign borrowing needed.',
        ideaConcept: {
          heading: 'The Root as a Generative Genetic Seed',
          summary: 'In English, you use unrelated words: "to see", "vision", "spectacle", "ocular". In Sanskrit, every one of these ideas grows organically from the single root √दृश् (to see).',
          body: [
            'Maharṣi Pāṇini cataloged approximately 2,000 verbal roots (धातवः) divided into 10 conjugation classes (Gaṇas).',
            'By attaching prefixes (उपसर्ग) and suffixes (प्रत्यय), a single root spawns hundreds of nouns, verbs, adjectives, and adverbs.',
            'Example: From √कृ (to do) grows karma, kartā, karaṇa, kārya, and saṁskāra! The root is a generative DNA seed.'
          ],
          keyTakeaway: 'Sanskrit is an organic fractal tree grown from roots, not a dead dictionary of arbitrary tags.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: '√कृ', iast: '√kṛ', meaning: 'To do, create, make (करोति)' },
            { devanagari: '√गम्', iast: '√gam', meaning: 'To go, move, progress (गच्छति)' },
            { devanagari: '√पठ्', iast: '√paṭh', meaning: 'To read, study aloud (पठति)' },
            { devanagari: '√मन्', iast: '√man', meaning: 'To think, reason, compute (मन्यते)' }
          ],
          phoneticInstructions: 'Recite the root √कृ, then its family: करोति (acts), कर्ता (agent), कर्म (deed), कार्यम् (duty). Notice the unbroken acoustic thread running through them all.',
          recitationTips: 'Feel the root verb as an active energy waiting to materialize into speech.'
        },
        ruleMechanics: {
          title: 'The Morphology of Word Generation',
          explanation: [
            'Formula: Prefix (उपसर्ग) + Root (धातु) + Suffix (प्रत्यय) = Word (पदम्)',
            'Example: अनु (along) + √गम् (to go) + ति = अनुगच्छति (he follows)'
          ],
          tableData: {
            headers: ['Verbal Root (धातुः)', 'Core Meaning', 'Prefix (उपसर्ग)', 'Suffix (प्रत्यय)', 'Derived Sanskrit Term', 'English Concept'],
            rows: [
              ['√कृ (डूकृञ्)', 'To do, make, perform', 'सं (together/well)', '+ कार (घञ्)', 'संस्कारः (Saṁskāraḥ)', 'Psychological impression / refinement'],
              ['√कृ (डूकृञ्)', 'To do, make, perform', 'None', '+ मन् (मनिन्)', 'कर्म (Karma)', 'Action, causality, and duty'],
              ['√दृश् (दृशिँर्)', 'To see, perceive', 'None', '+ अन (ल्युट्)', 'दर्शनम् (Darśanam)', 'A way of seeing / philosophy'],
              ['√ज्ञा (ज्ञा)', 'To know, realize', 'वि (distinct/deep)', '+ अन (ल्युट्)', 'विज्ञानम् (Vijñānam)', 'Empirical science / experiential wisdom'],
              ['√मन् (मनँ)', 'To think, contemplate', 'None', '+ त्र (ष्ट्रन्)', 'मन्त्रः (Mantraḥ)', 'Instrument of focused thought / formula'],
              ['√गम् (गम्ॢ)', 'To move, progress', 'अधि (toward)', '+ ति (लट्)', 'अधिगच्छति (Adhigacchati)', 'Attains mastery / acquires knowledge']
            ]
          },
          sutraReference: {
            devanagari: 'भूवादयो धातवः',
            iast: 'bhūvādayo dhātavaḥ (Pāṇini 1.3.1)',
            meaning: 'Roots beginning with "bhū" (to be) are designated as Dhātus.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-3-1',
            prompt: 'Which single Sanskrit root is the common parent of "कर्म" (action), "कर्ता" (doer), and "संस्कारः" (refinement)?',
            options: [
              '√गम् (to go)',
              '√कृ (to do/make)',
              '√भू (to be)',
              '√ज्ञा (to know)'
            ],
            correctIndex: 1,
            explanation: 'All these words originate directly from the prolific Tanādi root √कृ (to do / create / perform).'
          },
          worksheetSummary: 'Worksheet 3.1: Dhātu Family Tree & Reverse Word Deconstruction Drill.',
          worksheetDownloadId: 'ws-c3-1'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Object-Oriented Programming & Inheritance',
          heading: 'The Root as an Abstract Base Class',
          bridgeExplanation: 'In object-oriented programming (OOP), an Abstract Base Class defines core properties that derived subclasses inherit and specialize. A Pāṇinian Dhātu is literally an abstract base class: it defines the pure action, while suffixes instantiate it into concrete runtime objects (verbs, participles, nouns).',
          modernInsight: 'Sanskrit morphology anticipated polymorphism and component inheritance centuries before computer science formalized them.'
        },
        linkedResources: [
          { label: 'Pāṇinian Dhātupāṭha Studio (100 Roots)', targetView: 'dhatupatha', badge: 'Verb Engine' },
          { label: 'Neologism Technology Riddles', targetView: 'home', badge: 'Riddle Game' }
        ]
      },
      {
        id: 'c-3-2',
        lessonNumber: '3.2',
        titleDevanagari: 'लट्-लकारः · वर्तमान-कालः',
        titleEnglish: 'Verb Forms in the Present Tense (Laṭ-Lakāra)',
        shortDescription: 'Action conjugated across 3 persons and 3 numbers in a clean 3×3 matrix.',
        ideaConcept: {
          heading: 'The 3×3 Matrix of Present Action',
          summary: 'In Sanskrit, verb endings tell you who is doing the action and whether they are alone, a pair, or a multitude. Subject pronouns are optional because the verb ending contains all the information!',
          body: [
            '3 Persons: Third person (प्रथम पुरुषः), Second person (मध्यम पुरुषः), First person (उत्तम पुरुषः).',
            '3 Numbers: Singular (एकवचन), Dual (द्विवचन), Plural (बहुवचन).',
            'Singular/Dual/Plural rhythm: ति-तः-अन्ति / सि-थः-थ / मि-वः-मः.'
          ],
          keyTakeaway: 'The verb is completely self-describing. "पठामि" means "I read" without needing the pronoun "अहम्".'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'पठति - पठतः - पठन्ति', iast: 'paṭhati - paṭhataḥ - paṭhanti', meaning: 'He/she reads, they two read, they all read' },
            { devanagari: 'पठसि - पठथः - पठथ', iast: 'paṭhasi - paṭhathaḥ - paṭhatha', meaning: 'You read, you two read, you all read' },
            { devanagari: 'पठामि - पठावः - पठामः', iast: 'paṭhāmi - paṭhāvaḥ - paṭhāmaḥ', meaning: 'I read, we two read, we all read' }
          ],
          phoneticInstructions: 'Chant the 9 endings as a rhythm: "ti-taḥ-anti / si-thaḥ-tha / mi-vaḥ-maḥ". Notice how the dual endings (-तः, -थः, -वः) all end in a Visarga!',
          recitationTips: 'Maintain an even tempo as you progress through third, second, and first person.'
        },
        ruleMechanics: {
          title: 'The Laṭ 3×3 Conjugation Table',
          explanation: [
            'Prathama (3rd person) = पठति (he/she), पठतः (two), पठन्ति (all)',
            'Madhyama (2nd person) = पठसि (you), पठथः (you two), पठथ (you all)',
            'Uttama (1st person) = पठामि (I), पठावः (we two), पठामः (we all)'
          ],
          tableData: {
            headers: ['Puruṣa (Person)', 'Ekavacanam (Singular: 1)', 'Dvivacanam (Dual: 2)', 'Bahuvacanam (Plural: 3+)'],
            rows: [
              ['प्रथमः (Third Person)', 'पठति (paṭhati)', 'पठतः (paṭhataḥ)', 'पठन्ति (paṭhanti)'],
              ['मध्यमः (Second Person)', 'पठसि (paṭhasi)', 'पठथः (paṭhathaḥ)', 'पठथ (paṭhatha)'],
              ['उत्तमः (First Person)', 'पठामि (paṭhāmi)', 'पठावः (paṭhāvaḥ)', 'पठामः (paṭhāmaḥ)']
            ]
          },
          sutraReference: {
            devanagari: 'वर्तमाने लट्',
            iast: 'vartamāne laṭ (Pāṇini 3.2.123)',
            meaning: 'The affix Laṭ (present tense) is introduced after a verbal root when signifying an action existing in the present time.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-3-2',
            prompt: 'How do you say "We two are going" in Sanskrit using the root √गम्?',
            options: [
              'गच्छामि',
              'गच्छावः',
              'गच्छन्ति',
              'गच्छथः'
            ],
            correctIndex: 1,
            explanation: '"गच्छावः" is the Uttama Puruṣa Dvivacana (First person dual) form: "we two go".'
          },
          worksheetSummary: 'Worksheet 3.2: Laṭ-Lakāra 3×3 Verb Conjugation Practice across 10 Verbs.',
          worksheetDownloadId: 'ws-c3-2'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 Philosophy of the Self',
          heading: 'Why First Person is Called "Uttama" (Highest)',
          bridgeExplanation: 'In Western grammar, "First Person" is I, "Third Person" is he/she. In Sanskrit, "Third person" is called Prathama (first to be observed outside), while "First person" (I/Self) is called Uttama (the highest, innermost reality). Grammar mirrors Vedanta: the external world is observed first, but the witnessing Self within is supreme.',
          modernInsight: 'This psychological orientation shifts the learner from egoic self-absorption to objective contemplation of reality.'
        },
        linkedResources: [
          { label: 'Grammar Verb Conjugation Charts', targetView: 'grammar', param: 'topic:verbs', badge: 'Grammar' },
          { label: 'Deepakam Chapter 1 Reading', targetView: 'reader', badge: 'Reader' }
        ]
      },
      {
        id: 'c-3-3',
        lessonNumber: '3.3',
        titleDevanagari: 'लिङ्ग-वचन-व्यवस्था',
        titleEnglish: 'Nouns, Gender and Number (Liṅga and Vacana)',
        shortDescription: 'Three genders and three numbers, featuring the unique dual number (द्विवचन).',
        ideaConcept: {
          heading: 'The Threefold Order of Gender and Number',
          summary: 'Sanskrit has three grammatical genders (Masculine पुंलिङ्ग, Feminine स्त्रीलिङ्ग, Neuter नपुंसकलिङ्ग) and three numbers: Singular, Dual, and Plural.',
          body: [
            'The Dual (द्विवचनम्): Most modern languages only have 1 or "more than 1". Sanskrit has a dedicated grammatical form for exactly TWO entities.',
            'Nature is full of pairs: two eyes, two hands, day and night, sun and moon, teacher and student (गुरु-शिष्यौ).',
            'Adjectives must strictly agree with nouns in Gender, Number, and Case, establishing unbreakable syntactic coherence.'
          ],
          keyTakeaway: 'The dual number trains your mind to notice natural partnerships and complementary polarities.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'बालकः - बालकौ - बालकाः', iast: 'bālakaḥ - bālakau - bālakāḥ', meaning: 'One boy - Two boys - Many boys (M)' },
            { devanagari: 'लता - लते - लताः', iast: 'latā - late - latāḥ', meaning: 'One vine - Two vines - Many vines (F)' },
            { devanagari: 'फलम् - फले - फलानि', iast: 'phalam - phale - phalāni', meaning: 'One fruit - Two fruits - Many fruits (N)' }
          ],
          phoneticInstructions: 'Notice how the dual endings for Feminine and Neuter look identical: "लते" (two vines) and "फले" (two fruits).',
          recitationTips: 'Emphasize the diphthong "au" in the masculine dual "बालकौ".'
        },
        ruleMechanics: {
          title: 'Gender-Number Declension Paradigms & Agreement',
          explanation: [
            'An adjective must match its noun in Gender, Number, and Case:',
            'सुन्दरः बालकः (Handsome boy - M)',
            'सुन्दरा बालिका (Beautiful girl - F)',
            'सुन्दरम् पुस्तकम् (Beautiful book - N)'
          ],
          tableData: {
            headers: ['Gender (लिङ्गम्)', 'Noun Stem (प्रातिपदिकम्)', 'Singular (एकवचनम्)', 'Dual (द्विवचनम्)', 'Plural (बहुवचनम्)', 'Meaning'],
            rows: [
              ['पुंलिङ्गम् (Masculine)', 'राम (a-kārānta)', 'रामः (Rāmaḥ)', 'रामौ (Rāmau)', 'रामाः (Rāmāḥ)', 'One Rama / Two Ramas / Many Ramas'],
              ['स्त्रीलिङ्गम् (Feminine)', 'लता (ā-kārānta)', 'लता (Latā)', 'लते (Late)', 'लताः (Latāḥ)', 'One creeper / Two creepers / Many creepers'],
              ['नपुंसकलिङ्गम् (Neuter)', 'फल (a-kārānta)', 'फलम् (Phalam)', 'फले (Phale)', 'फलानि (Phalāni)', 'One fruit / Two fruits / Many fruits'],
              ['पुंलिङ्गम् (Consonant)', 'राजन् (n-anta)', 'राजा (Rājā)', 'राजानौ (Rājānau)', 'राजानः (Rājānaḥ)', 'One king / Two kings / Many kings']
            ]
          },
          sutraReference: {
            devanagari: 'प्रातिपदिकार्थलिङ्गपरिमाणवचनमात्रे प्रथमा',
            iast: 'prātipadikārtha-liṅga-parimāṇa-vacana-mātre prathamā (Pāṇini 2.3.46)',
            meaning: 'The nominative first case (Prathamā) is employed to designate the mere nominal stem sense, gender, measure, or number.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-3-3',
            prompt: 'In Sanskrit, how many numbers (वचनानि) exist?',
            options: [
              'Only two: Singular and Plural',
              'Three: Singular (एकवचन), Dual (द्विवचन), and Plural (बहुवचन)',
              'Four: Singular, Dual, Triple, and Plural',
              'Numbers do not exist in Sanskrit'
            ],
            correctIndex: 1,
            explanation: 'Sanskrit is famous for preserving the ancient Indo-European Dual number (द्विवचनम्) for pairs.'
          },
          worksheetSummary: 'Worksheet 3.3: Gender Classification & Dual Number Matching Exercise.',
          worksheetDownloadId: 'ws-c3-3'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Type Safety in Software Engineering',
          heading: 'Strict Type Checking and Adjective-Noun Agreement',
          bridgeExplanation: 'In typed languages like TypeScript, Rust, or Haskell, the compiler throws an error if an integer is assigned to a string variable. Sanskrit enforces strict "Type Safety" at the grammatical level: an adjective cannot compile into the sentence unless its Gender, Number, and Case match the noun.',
          modernInsight: 'This built-in error detection prevents ambiguity even when words are scattered across a complex stanza.'
        },
        linkedResources: [
          { label: 'Shabdroop Declension Explorer', targetView: 'grammar', param: 'topic:nouns', badge: 'Declensions' },
          { label: 'Worksheets on Shabdroop', targetView: 'worksheets', badge: 'Worksheets' }
        ]
      },
      {
        id: 'c-3-4',
        lessonNumber: '3.4',
        titleDevanagari: 'कारकाणि एवं सप्त-विभक्तयः',
        titleEnglish: "The Vibhaktis as a Sentence's \"Roles\" (Kārakas)",
        shortDescription: 'Case endings declare role, giving Sanskrit freedom from rigid English word order.',
        ideaConcept: {
          heading: 'The 7 Vibhaktis: Syntax Held in Suffixes',
          summary: 'In English, "The dog bites the man" means something very different from "The man bites the dog" because English relies on word order. In Sanskrit, you can scramble the words in any order, and the meaning stays 100% identical!',
          body: [
            'How? Because the relationship (Kāraka) is permanently baked into the ending (Vibhakti) of the noun.',
            '1. Prathamā: The Actor (रामः)',
            '2. Dvitīyā: The Object of Action (रामम्)',
            '3. Tṛtīyā: The Instrument/Tool (रामेण)',
            '4. Caturthī: The Beneficiary/Recipient (रामाय)',
            '5. Pañcamī: The Source/Point of Separation (रामात्)',
            '6. Ṣaṣṭhī: Possession/Relationship (रामस्य)',
            '7. Saptamī: The Location/Container (रामे)'
          ],
          keyTakeaway: 'Vibhaktis are semantic tags. They allow poetry to flow freely while maintaining mathematical precision.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'रामः रामं रामेण रामाय', iast: 'rāmaḥ rāmaṁ rāmeṇa rāmāya', meaning: 'Cases 1 to 4: Subject, Object, Instrument, Dative' },
            { devanagari: 'रामात् रामस्य रामे हे राम', iast: 'rāmāt rāmasya rāme he rāma', meaning: 'Cases 5 to 8: From, Of, In, O Rama' }
          ],
          phoneticInstructions: 'Recite the 8 cases of Rama in order. Notice how the rhythm mirrors a musical cadence.',
          recitationTips: 'Associate each case ending with its question: Who? Whom? With what? For whom? From where? Whose? In what?'
        },
        ruleMechanics: {
          title: 'The 6 Kārakas & 7 Vibhaktis Map',
          tableData: {
            headers: ['Case (विभक्तिः)', 'Kāraka (कारकम्)', 'Meaning / Question', 'Example (राम)'],
            rows: [
              ['१ प्रथमा', 'कर्ता (Agent)', 'Who does it?', 'रामः गच्छति (Rama goes)'],
              ['२ द्वितीया', 'कर्म (Object)', 'Whom / What?', 'रामं पश्यति (Sees Rama)'],
              ['३ तृतीया', 'करण (Instrument)', 'With / By what?', 'रामेण कृतम् (Done by Rama)'],
              ['४ चतुर्थी', 'सम्प्रदान (Recipient)', 'For / To whom?', 'रामाय ददाति (Gives to Rama)'],
              ['५ पञ्चमी', 'अपादान (Source)', 'From where?', 'रामात् आगच्छति (Comes from Rama)'],
              ['६ षष्ठी', 'सम्बन्ध (Relation)', 'Whose?', 'रामस्य पुस्तकम् (Rama’s book)'],
              ['७ सप्तमी', 'अधिकरण (Location)', 'Where / In what?', 'रामे प्रीतिः (Love in Rama)'],
              ['सम्बोधनम्', 'आह्वान (Address)', 'Calling someone', 'हे राम! (O Rama!)']
            ]
          },
          sutraReference: {
            devanagari: 'कारके',
            iast: 'kārake (Pāṇini 1.4.23)',
            meaning: 'The following terms are governed under the sphere of Kāraka (direct relation between noun and action).'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-3-4',
            prompt: 'In the sentence "वृक्षात् फलं पतति" (A fruit falls from the tree), what case is "वृक्षात्"?',
            options: [
              'Prathamā (Subject)',
              'Pañcamī (Ablative / Source of separation)',
              'Dvitīyā (Direct Object)',
              'Saptamī (Location)'
            ],
            correctIndex: 1,
            explanation: 'The suffix "-āt" (वृक्षात्) marks Pañcamī Vibhakti (Ablative), indicating the source from which separation occurs.'
          },
          worksheetSummary: 'Worksheet 3.4: Complete 7-Case Vibhakti Grid & Sentence Role Assignment Practice.',
          worksheetDownloadId: 'ws-c3-4'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Relational Databases & Graph Networks',
          heading: 'Entity-Relationship Models in Ancient Syntax',
          bridgeExplanation: 'In computer science, relational databases connect entities through foreign keys and role relationships. Sanskrit sentences function as decentralized semantic graphs where nouns broadcast their relational role through case suffixes, removing dependence on linear spatial order.',
          modernInsight: 'This makes Sanskrit an ideal subject for dependency parsing and graph-based natural language processing.'
        },
        linkedResources: [
          { label: 'Interactive Vibhakti Explorer', targetView: 'grammar', param: 'topic:nouns', badge: 'Charts' },
          { label: 'CBSE Sanskrit Exam Guide', targetView: 'cbse-guide', badge: 'Study Guide' }
        ]
      },
      {
        id: 'c-3-5',
        lessonNumber: '3.5',
        titleDevanagari: 'संधिः · ध्वनेः सहज-प्रवाहः',
        titleEnglish: 'Sandhi, the Rules for Joining Sounds',
        shortDescription: 'Sandhi is not an arbitrary rule; it is the natural law of phonetic economy.',
        ideaConcept: {
          heading: 'Phonetic Harmony at Syllable Junctions',
          summary: 'When the end of one word touches the beginning of the next, your tongue naturally merges them so you don’t pause awkwardly. Sandhi is the scientific study of this natural glide.',
          body: [
            'Svara Sandhi (Vowels): विद्या + आलयः = विद्यालयः; सूर्य + उदयः = सूर्योदयः; इति + आदि = इत्यादि.',
            'Vyañjana Sandhi (Consonants): सत् + चित् = सच्चित्; तत् + च = तच्च.',
            'Visarga Sandhi: रामः + अवदत् = रामोऽवदत्; शिवः + अहम् = शिवोऽहम्.'
          ],
          keyTakeaway: 'Sandhi is acoustic thermodynamics: the tongue always takes the path of minimum resistance.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'विद्या + आलयः = विद्यालयः', iast: 'vidyā + ālayaḥ = vidyālayaḥ', meaning: 'Dīrgha Sandhi (Long vowel merger)' },
            { devanagari: 'इति + आदि = इत्यादि', iast: 'iti + ādi = ityādi', meaning: 'Yaṇ Sandhi (i becomes y)' },
            { devanagari: 'महा + ईशः = महेशः', iast: 'mahā + īśaḥ = maheśaḥ', meaning: 'Guṇa Sandhi (a + i becomes e)' }
          ],
          phoneticInstructions: 'Say "iti ādi" quickly ten times: notice how your tongue naturally slurs it into "ityādi" on its own!',
          recitationTips: 'Sandhi is like a zipper. Splitting Sandhi (पदच्छेद) allows you to inspect the individual words.'
        },
        ruleMechanics: {
          title: 'The Core Vowel, Consonant & Visarga Sandhi Laws',
          explanation: [
            '1. Dīrgha (अकः सवर्णे दीर्घः): Similar vowels merge into long: a+a=ā, i+i=ī, u+u=ū',
            '2. Guṇa (आद्गुणः): a + i/ī = e; a + u/ū = o; a + ṛ = ar',
            '3. Vṛddhi (वृद्धिरेचि): a + e/ai = ai; a + o/au = au',
            '4. Yaṇ (इको यणचि): i + vowel = y; u + vowel = v; ṛ + vowel = r'
          ],
          tableData: {
            headers: ['Sandhi Class', 'Pāṇinian Formula', 'Input Sounds', 'Fused Result', 'Living Example'],
            rows: [
              ['Dīrgha (दीर्घः)', 'अकः सवर्णे दीर्घः (6.1.101)', 'a/ā + a/ā, i/ī + i/ī', 'Long vowel (ā, ī, ū, ṝ)', 'विद्या + आलयः = विद्यालयः'],
              ['Guṇa (गुणः)', 'आद्गुणः (6.1.87)', 'a/ā + i/ī, u/ū, ṛ/ṝ', 'e, o, ar', 'नर + ईशः = नरेशः; सूर्य + उदयः = सूर्योदयः'],
              ['Vṛddhi (वृद्धिः)', 'वृद्धिरेचि (6.1.88)', 'a/ā + e/ai, o/au', 'ai, au', 'एक + एकम् = एकैकम्; महा + औषधिः = महौषधिः'],
              ['Yaṇ (यण्)', 'इको यणचि (6.1.77)', 'i, u, ṛ + dissimilar vowel', 'y, v, r', 'यदि + अपि = यद्यपि; अनु + अयः = अन्वयः'],
              ['Vyañjana (व्यञ्जनम्)', 'स्तोः श्चुना श्चुः (8.4.40)', 't-group + c-group / ś', 'Palatalized c-group', 'सत् + चित् = सच्चित्; तत् + च = तच्च'],
              ['Visarga (विसर्गः)', 'ससजुषो रुः (8.2.66)', 'aḥ + voiced consonant / a', 'o (with Avagraha ऽ)', 'शिवः + अहम् = शिवोऽहम्; रामः + गच्छति = रामो गच्छति']
            ]
          },
          sutraReference: {
            devanagari: 'परः संनिकर्षः संहिता',
            iast: 'paraḥ saṁnikarṣaḥ saṁhitā (Pāṇini 1.4.109)',
            meaning: 'Extreme acoustic proximity between phonemes is termed Saṁhitā (the domain of Sandhi).'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-3-5',
            prompt: 'When "विद्या" (knowledge) joins with "आलयः" (abode), what does it become by Dīrgha Sandhi?',
            options: [
              'विद्यलयः',
              'विद्यालयः',
              'विद्यौलयः',
              'विद्येच्छः'
            ],
            correctIndex: 1,
            explanation: 'Under Dīrgha Sandhi (अकः सवर्णे दीर्घः), long "ā" + long "ā" merge smoothly into single long "ā": विद्यालयः.'
          },
          worksheetSummary: 'Worksheet 3.5: Vowel & Consonant Sandhi Joining and Splitting (विच्छेद) Practice Sheet.',
          worksheetDownloadId: 'ws-c3-5'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Audio DSP & Signal Processing',
          heading: 'Coarticulation and Cross-Fade in Digital Sound',
          bridgeExplanation: 'In digital speech synthesis and audio signal processing, abrupt cuts between phonemes cause harsh transient pops. Engineers apply "cross-fading" and "coarticulation smoothing". Sandhi is literally Sanskrit’s built-in acoustic smoothing filter, designed over 3,000 years ago.',
          modernInsight: 'Studying Sandhi trains your ear to recognize how phonemes influence each other dynamically in real time.'
        },
        linkedResources: [
          { label: 'Sandhi Engine & Rule Generator', targetView: 'grammar', param: 'topic:sandhi', badge: 'Interactive Tool' },
          { label: 'Deepakam Chapter 2 Sandhi Drill', targetView: 'reader', badge: 'Reader' }
        ]
      },
      {
        id: 'c-3-6',
        lessonNumber: '3.6',
        titleDevanagari: 'समासाः · अर्थ-संक्षेपः',
        titleEnglish: 'Compounds (Samāsas): Packing Meaning Tightly',
        shortDescription: 'Fusing multiple words into single conceptual compounds for immense information density.',
        ideaConcept: {
          heading: 'Compression: Stacking Ideas into One Word',
          summary: 'In English, you can say "the flower of the forest" or "forest flower". Sanskrit takes compounding to high mathematical art, fusing multiple words into a single compound (समास) while dropping internal case endings.',
          body: [
            'There are 4 principal types of Samāsa:',
            '1. Avyayībhāva (अव्ययीभावः): First word dominant (यथाशक्ति = as per capability)',
            "2. Tatpuruṣa (तत्पुरुषः): Second word dominant (राजपुरुषः = king's officer)",
            '3. Dvandva (द्वन्द्वः): Both words equal (मातापितरौ = mother and father)',
            '4. Bahuvrīhi (बहुव्रीहिः): Points to a third outside entity (पीताम्बरः = yellow-robed one, Viṣṇu)'
          ],
          keyTakeaway: 'Compounds are lossless compression algorithms. They compress lengthy syntactic clauses into dense conceptual nuggets.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'मातापितरौ', iast: 'mātāpitarau', meaning: 'Dvandva: Mother and Father' },
            { devanagari: 'यथाशक्ति', iast: 'yathāśakti', meaning: 'Avyayībhāva: To the limit of one’s capability' },
            { devanagari: 'नीलोत्पलम्', iast: 'nīlotpalam', meaning: 'Karmadhāraya: Blue lotus' }
          ],
          phoneticInstructions: 'Pronounce long compounds as single rhythmic sweeps, pausing only after the compound concludes.',
          recitationTips: 'To analyze a compound, dissolve it into its analytical sentence (विग्रह-वाक्य).'
        },
        ruleMechanics: {
          title: 'The 4-Fold Head-Dominance (Pradhānatā) Taxonomy',
          explanation: [
            'Every compound is classified by which of its constituent members (पदम्) holds the primary semantic weight (प्राधान्यम्).'
          ],
          tableData: {
            headers: ['Compound Class (समासः)', 'Dominant Head (प्रधान-पदम्)', 'Structural Formula', 'Example Compound', 'Dissolved Meaning (विग्रह-वाक्यम्)'],
            rows: [
              ['अव्ययीभावः (Avyayībhāva)', 'पूर्वपद-प्रधान (First word dominant)', 'Indeclinable prefix + Noun', 'यथाशक्ति (Yathāśakti)', 'शक्तिम् अनतिक्रम्य (According to one’s capability)'],
              ['तत्पुरुषः (Tatpuruṣa)', 'उत्तरपद-प्रधान (Second word dominant)', 'Noun in case 2-7 + Noun', 'राजपुरुषः (Rājapuruṣaḥ)', 'राज्ञः पुरुषः (King’s officer)'],
              ['कर्मधारयः (Karmadhāraya)', 'समानाधिकरण (Appositional Tatpuruṣa)', 'Adjective + Noun', 'नीलोत्पलम् (Nīlotpalam)', 'नीलं च तत् उत्पलं च (A blue lotus)'],
              ['द्विगुः (Dvigu)', 'संख्या-पूर्व (Number first)', 'Numeral + Collection', 'त्रिलोकम् (Trilokam)', 'त्रयाणां लोकानां समाहारः (Collection of three worlds)'],
              ['द्वन्द्वः (Dvandva)', 'उभयपद-प्रधान (Both words equal)', 'Noun + Noun + Noun', 'रामलक्ष्मणौ (Rāma-Lakṣmaṇau)', 'रामश्च लक्ष्मणश्च (Rama and Lakshmana)'],
              ['बहुव्रीहिः (Bahuvrīhi)', 'अन्यपद-प्रधान (External referent dominant)', 'Compound describing third entity', 'पीताम्बरः (Pītāmbaraḥ)', 'पीतं वस्त्रं यस्य सः (He whose garments are yellow: Viṣṇu)']
            ]
          },
          sutraReference: {
            devanagari: 'समर्थः पदविधिः',
            iast: 'samarthaḥ padavidhiḥ (Pāṇini 2.1.1)',
            meaning: 'A grammatical operation involving words applies only when the words are semantically and syntactically connected (Samartha).'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-3-6',
            prompt: 'In the compound "रामलक्ष्मणौ" (Rama and Lakshmana), which type of Samāsa is used?',
            options: [
              'Avyayībhāva (First word dominant)',
              'Tatpuruṣa (Second word dominant)',
              'Dvandva (Both words hold equal weight: "and")',
              'Bahuvrīhi (Points to someone else)'
            ],
            correctIndex: 2,
            explanation: 'Dvandva (द्वन्द्वः) unites two or more equal coordinates connected by "and" (रामश्च लक्ष्मणश्च).'
          },
          worksheetSummary: 'Worksheet 3.6: Samāsa Classification, Vigraha Dissolution & Identification Matrix.',
          worksheetDownloadId: 'ws-c3-6'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Information Density & Compilers',
          heading: 'High-Density Tokenization and Semantic Binding',
          bridgeExplanation: 'In computer programming, combining multiple variables into a single composite struct or object reduces pointer overhead and increases cache locality. Sanskrit compounds function identically: they eliminate repetitive case inflections and package complex semantic relationships into a single memory token.',
          modernInsight: 'This is why philosophical and scientific treatises in Sanskrit could store vast libraries of conceptual wisdom in easily memorized, dense compound verses.'
        },
        linkedResources: [
          { label: 'Samāsa Interactive Master Chart', targetView: 'grammar', param: 'topic:samasa', badge: 'Grammar' },
          { label: 'Pañcatantra Compound Reader', targetView: 'reader', badge: 'Stories' }
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 4: Meaning as Output (वाक्यम्)
  // =========================================================================
  {
    id: 'mod-4',
    moduleNumber: 4,
    titleDevanagari: 'वाक्यम् · Meaning as Output',
    titleEnglish: 'Meaning as Output (वाक्यम्)',
    tagline: 'Assembling words into living poetry, fables, and timeless wisdom',
    themeColor: '#16a34a',
    icon: '📜',
    overview:
      'Witness the output phase: combining sounds and grammatical rules into living literature — simple communicative sentences, Pañcatantra fables, luminous Subhāṣitas, and metered Anuṣṭubh verse recitation.',
    lessons: [
      {
        id: 'c-4-1',
        lessonNumber: '4.1',
        titleDevanagari: 'सरल-वाक्य-रचना',
        titleEnglish: 'Building Simple Sentences',
        shortDescription: 'Assembling subject, object, and verb into living communicative flow.',
        ideaConcept: {
          heading: 'Synthesizing the Sentence',
          summary: 'A complete sentence needs an agent (Kartā) and an action (Kriyā), often with an object (Karma). Learn how to construct clean, unambiguous statements.',
          body: [
            'Example 1: बालकः पठति (The boy reads).',
            'Example 2: बालकः पुस्तकं पठति (The boy reads a book).',
            'Example 3: बालकाः विद्यालये पुस्तकं पठन्ति (The boys read a book in the school).'
          ],
          keyTakeaway: 'Subject and verb must always agree in Person and Number.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'बालकः पुस्तकं पठति ।', iast: 'bālakaḥ pustakaṁ paṭhati.', meaning: 'The boy reads a book.' },
            { devanagari: 'छात्राः संस्कृतं वदन्ति ।', iast: 'chātrāḥ saṁskṛtaṁ vadanti.', meaning: 'The students speak Sanskrit.' },
            { devanagari: 'वयं गुरुकुलं गच्छामः ।', iast: 'vayaṁ gurukulaṁ gacchāmaḥ.', meaning: 'We all go to the Gurukul.' }
          ],
          phoneticInstructions: 'Recite each sentence with confidence. Let the final verb close with a clean Visarga or vowel.',
          recitationTips: 'Notice the Anvaya: Subject (बालकः) → Object (पुस्तकम्) → Verb (पठति).'
        },
        ruleMechanics: {
          title: 'The Kartā-Kriyā Agreement & Syntax Synthesis',
          explanation: [
            'Singular Subject takes Singular Verb: बालकः गच्छति',
            'Dual Subject takes Dual Verb: बालकौ गच्छतः',
            'Plural Subject takes Plural Verb: बालकाः गच्छन्ति'
          ],
          tableData: {
            headers: ['Sentence Component', 'Grammatical Role', 'Singular Example', 'Dual Example', 'Plural Example'],
            rows: [
              ['कर्ता (Subject / Agent)', 'Prathamā Vibhakti', 'बालकः (Boy)', 'बालकौ (Two boys)', 'बालकाः (Boys)'],
              ['कर्म (Object of Action)', 'Dvitīyā Vibhakti', 'ग्रन्थम् (Book/Scripture)', 'ग्रन्थौ (Two scriptures)', 'ग्रन्थान् (Scriptures)'],
              ['अधिकरण (Location)', 'Saptamī Vibhakti', 'विद्यालये (In school)', 'विद्यालययोः (In two schools)', 'विद्यालयेषु (In schools)'],
              ['क्रिया (Verbal Action)', 'Laṭ Lakāra (matches Subject)', 'पठति (Reads)', 'पठतः (Two read)', 'पठन्ति (Many read)'],
              ['पूर्ण-वाक्यम् (Full Sentence)', 'Free-order compilation', 'बालकः विद्यालये ग्रन्थं पठति ।', 'बालकौ विद्यालये ग्रन्थौ पठतः ।', 'बालकाः विद्यालयेषु ग्रन्थान् पठन्ति ।']
            ]
          },
          sutraReference: {
            devanagari: 'स्वतन्त्रः कर्ता',
            iast: 'svatantraḥ kartā (Pāṇini 1.4.54)',
            meaning: 'The entity who acts autonomously in an action is designated as the Kartā (Agent/Subject).'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-4-1',
            prompt: 'Complete the sentence: "छात्राः विद्यालयं _________।" (The students go to school)',
            options: [
              'गच्छति (Singular)',
              'गच्छतः (Dual)',
              'गच्छन्ति (Plural)',
              'गच्छामि (First person)'
            ],
            correctIndex: 2,
            explanation: '"छात्राः" is third-person plural (बहुवचन), so the verb must match in plural: "गच्छन्ति".'
          },
          worksheetSummary: 'Worksheet 4.1: Simple Sentence Construction & Translation Drills.',
          worksheetDownloadId: 'ws-c4-1'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Abstract Syntax Trees (AST)',
          heading: 'Compiling Thoughts into Syntax',
          bridgeExplanation: 'In compiler design, high-level code is parsed into an Abstract Syntax Tree where operator precedence and node types determine semantic validity. Sanskrit sentence building mirrors this exact tree derivation process.',
          modernInsight: 'Learning to build Sanskrit sentences develops structural rigor that directly transfers to software coding and logical argumentation.'
        },
        linkedResources: [
          { label: 'Deepakam Chapter Sentences', targetView: 'reader', badge: 'Lessons' },
          { label: 'CBSE Sanskrit Question Guide', targetView: 'cbse-guide', badge: 'Exam Guide' }
        ]
      },
      {
        id: 'c-4-2',
        lessonNumber: '4.2',
        titleDevanagari: 'पञ्चतन्त्र-कथाः · नीति-कथा',
        titleEnglish: 'Short Stories from Pañcatantra & Hitopadeśa',
        shortDescription: 'Narrative pedagogy: timeless fables engineered with moral psychology and political wisdom.',
        ideaConcept: {
          heading: 'Story as Cognitive Training',
          summary: 'Ancient teachers did not lecture in dry abstractions. They told brilliant animal fables that taught psychology, strategy, and virtue all at once.',
          body: [
            'The Pañcatantra was composed by Paṇḍita Viṣṇuśarman to educate young princes in statecraft and ethics within six months.',
            'You will read original dialogue using gerunds (having done = गत्वा, दृष्ट्वा) and past participles.'
          ],
          keyTakeaway: 'Stories make grammar memorable. When you follow the lion and the rabbit, grammar stops feeling like rules.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'अस्ति कस्मिंश्चित् वने सिंहः...', iast: 'asti kasmiṁścit vane siṁhaḥ...', meaning: 'In a certain forest there lived a lion...' },
            { devanagari: 'उपायेन हि यच्छक्यं न तच्छक्यं पराक्रमैः ।', iast: 'upāyena hi yacchakyaṁ na tacchakyaṁ parākramaiḥ |', meaning: 'What can be achieved by clever strategy cannot be won by sheer brute force alone.' }
          ],
          phoneticInstructions: 'Read with expressive narrative rhythm. Pause at the comma (,) and danda (।).',
          recitationTips: 'Notice the Anvaya flow in classical prose.'
        },
        ruleMechanics: {
          title: 'The Ktva (क्त्वा) & Lyap (ल्यप्) Gerund Participles & Narrative Syntax',
          explanation: [
            'Expresses "having done" an action before the main verb:',
            'गम् + क्त्वा = गत्वा (having gone: गृहं गत्वा भोजनं करोति)',
            'दृश् + क्त्वा = दृष्ट्वा (having seen)',
            'With prefix, use Lyap: आ + गम् + ल्यप् = आगत्य (having arrived)'
          ],
          tableData: {
            headers: ['Story Phrase / Śloka', 'Grammatical Mechanism', 'Sandhi Breakdown', 'Literal Meaning', 'Strategic Moral Principle'],
            rows: [
              ['अस्ति कस्मिंश्चित् वने सिंहः ।', 'Locative singular of place', 'कस्मिन् + चित् (Indefinite pronoun)', 'In a certain forest there lived a lion', 'Setting the cosmic baseline stage'],
              ['सः सर्वान् जन्तून् व्यापादयति ।', 'Accusative plural object', 'व्या + पादयति (Causative verb)', 'He indiscriminately destroyed all creatures', 'Power unconstrained by dharma leads to systemic ruin'],
              ['ततः शशकेन उपायः चिन्तितः ।', 'Passive past participle (Kta)', 'शशकेन (Instrumental agent)', 'Then by the hare a clever strategy was conceived', 'Intellect and discernment conquer raw physical mass'],
              ['उपायेन हि यच्छक्यं न तच्छक्यं पराक्रमैः ।', 'Instrumental + Relative pronoun', 'यत् + शक्यम् ; तत् + शक्यम्', 'What can be accomplished by strategy cannot be achieved by force', 'Viveka (discernment) is the ultimate protective shield']
            ]
          },
          sutraReference: {
            devanagari: 'समानकर्तृकयोः पूर्वकाले',
            iast: 'samānakartṛkayoḥ pūrvakāle (Pāṇini 3.4.21)',
            meaning: 'The suffix Ktvā (त्वा) is introduced after a root to denote an action performed earlier by the same agent.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-4-2',
            prompt: 'What does the participle "गत्वा" (gatvā) mean in a story sentence like "विद्यालयं गत्वा पठति"?',
            options: [
              'Will go',
              'Having gone / After going (to school, he studies)',
              'Did not go',
              'Go immediately'
            ],
            correctIndex: 1,
            explanation: 'The suffix -क्त्वा (ktvā) forms an indeclinable past participle meaning "having done" the prior action.'
          },
          worksheetSummary: 'Worksheet 4.2: Pañcatantra Fable Reading & Gerund Participle Analysis Sheet.',
          worksheetDownloadId: 'ws-c4-2'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 Discernment & Ethics',
          heading: 'Viveka: Distinguishing Essence from Appearance',
          bridgeExplanation: 'Pañcatantra fables train the intellect in Viveka (discernment) — seeing through flattering speech, recognizing danger early, and acting from stillness rather than impulsive reactivity.',
          modernInsight: 'Ancient Indian fables were the world’s first emotional intelligence (EQ) curriculum for decision-makers.'
        },
        linkedResources: [
          { label: 'Deepakam Chapter 2 Hitopadeśa Story', targetView: 'reader', param: 'gsde102', badge: 'Story' },
          { label: 'Class 7 & 8 CBSE Worksheets', targetView: 'worksheets', badge: 'Worksheets' }
        ]
      },
      {
        id: 'c-4-3',
        lessonNumber: '4.3',
        titleDevanagari: 'सुभाषितानि · एकाक्षरी विवेकः',
        titleEnglish: 'Subhāṣitas: Wisdom in One Verse',
        shortDescription: 'Distilling life experience into two balanced lines of lyrical meter that stick in memory forever.',
        ideaConcept: {
          heading: 'Luminous Gems of Condensed Wisdom',
          summary: 'A Subhāṣita (सु + भाषितम् = well-spoken saying) is an ancient tweet: a complete philosophical reflection packed into two lines of metered verse.',
          body: [
            'They cover humility, friendship, perseverance, micro-habits, and the beauty of speech.',
            'Memorizing even five Subhāṣitas gives you an internal moral compass that stays with you for life.'
          ],
          keyTakeaway: 'A single Subhāṣita holds more psychological wisdom than a shelf of modern self-help books.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'विद्या ददाति विनयं विनयाद्याति पात्रताम् ।', iast: 'vidyā dadāti vinayaṁ vinayād yāti pātratām |', meaning: 'True knowledge gives humility; from humility comes worthiness.' },
            { devanagari: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः ।', iast: 'udyamena hi sidhyanti kāryāṇi na manorathaiḥ |', meaning: 'Tasks succeed through focused effort, never through mere wishful daydreaming.' }
          ],
          phoneticInstructions: 'Chant each half-verse (अर्ध-श्लोक) on a single steady exhalation. Match the rhythmic cadence of the 8 syllables.',
          recitationTips: 'Notice the internal rhyming and rhythmic alliteration.'
        },
        ruleMechanics: {
          title: 'Subhāṣita Anatomy: Padaccheda, Anvaya & Rasa',
          explanation: [
            '1. Padaccheda (पदच्छेद): Split the sandhi to expose raw words.',
            '2. Anvaya (अन्वय): Rearrange poetic words into normal grammatical prose order (Subject → Object → Verb).'
          ],
          tableData: {
            headers: ['Subhāṣita Line', 'Padaccheda (Word Split)', 'Grammatical Anatomy', 'Translation', 'Cognitive Reflection'],
            rows: [
              ['विद्या ददाति विनयं', 'विद्या ददाति विनयम्', 'Subject (Vidya) + Verb (gives) + Object (humility)', 'Knowledge bestows true humility', 'Real learning dissolves arrogance; pedantry inflates it'],
              ['विनयाद्याति पात्रताम् ।', 'विनयात् याति पात्रताम्', 'Ablative source (from humility) + attains + worthiness', 'From humility arises true capability/fitness', 'Vessel must be clean and emptied before wisdom can fill it'],
              ['पात्रत्वाद्धनमाप्नोति', 'पात्रत्वात् धनम् आप्नोति', 'Ablative (from capability) + wealth + gains', 'From capability comes legitimate abundance', 'Wealth is a byproduct of excellence, never the primary aim'],
              ['धनाद्धर्मं ततः सुखम् ॥', 'धनात् धर्मम् ततः सुखम्', 'Ablative (from wealth) + virtue + thence bliss', 'From righteous wealth comes Dharma, and thence lasting joy', 'The unbroken fourfold chain: Vidya → Vinaya → Patrata → Sukham']
            ]
          },
          sutraReference: {
            devanagari: 'वाक्यं रसात्मकं काव्यम्',
            iast: 'vākyaṁ rasātmakaṁ kāvyam (Sāhitya-Darpaṇa 1.3)',
            meaning: 'Poetry is that statement whose very soul is Rasa (living aesthetic consciousness and emotional resonance).'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-4-3',
            prompt: 'According to the famous Subhāṣita "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः", how do tasks actually reach completion?',
            options: [
              'Through wishing and dreaming (मनोरथैः)',
              'Through focused, diligent effort (उद्यमेन)',
              'By pure chance',
              'By talking about them'
            ],
            correctIndex: 1,
            explanation: '"उद्यमेन" is the Instrumental case (तृतीया) of उद्यम (diligence/effort): works are accomplished through exertion, not daydreams.'
          },
          worksheetSummary: 'Worksheet 4.3: 10 Essential Subhāṣitas with Sandhi Splitting & Anvaya Translation Grid.',
          worksheetDownloadId: 'ws-c4-3'
        },
        thinkingConnection: {
          type: 'integrated',
          badgeLabel: '🧠 Cognitive Retention & Metacognition',
          heading: 'Mnemonics as Compressed Cognitive Scripts',
          bridgeExplanation: 'Cognitive psychology shows that rhymed, metered stanzas encode information into episodic long-term memory far more efficiently than prose. Subhāṣitas functioned as high-bandwidth cultural cognitive scripts.',
          modernInsight: 'When facing ethical dilemmas, recalling a two-line Subhāṣita delivers instant clarity without mental fatigue.'
        },
        linkedResources: [
          { label: 'Subhāṣita Audio Treasury (50 Verses)', targetView: 'reader', badge: 'Audio Library' },
          { label: 'Vedic Maths Shlokas', targetView: 'vedic-maths', badge: 'Maths Verses' }
        ]
      },
      {
        id: 'c-4-4',
        lessonNumber: '4.4',
        titleDevanagari: 'अनुष्टुप्-छन्दः एवं पाठ-पद्धतिः',
        titleEnglish: 'Reading and Reciting an Anuṣṭubh Verse',
        shortDescription: 'The 32-syllable heartbeat of the Rāmāyaṇa, Mahābhārata, and Bhagavad Gītā.',
        ideaConcept: {
          heading: 'The 32-Syllable Rhythmic Heartbeat',
          summary: 'Almost the entire Bhagavad Gītā and the major epics are written in a single poetic meter: the Anuṣṭubh (अनुष्टुप्). Once you master its 8-8-8-8 rhythm, you can chant thousands of verses effortlessly.',
          body: [
            'Total syllables: 32 syllables divided into four quarters (पाद) of 8 syllables each.',
            'Universal rule: In every quarter, the 5th syllable is short (लघु), and the 6th syllable is long (गुरु)!'
          ],
          keyTakeaway: 'The Anuṣṭubh meter synchronizes respiration with speech, turning recitation into effortless breath-control (Prāṇāyāma).'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।', iast: 'yadā yadā hi dharmasya glānir bhavati bhārata |', meaning: 'Whenever there is a decline of righteousness, O Bharata...' },
            { devanagari: 'अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥', iast: 'abhyutthānam adharmasya tadātmānaṁ sṛjāmyaham ||', meaning: '...and an uprising of unrighteousness, then I manifest Myself.' }
          ],
          phoneticInstructions: 'Tap your finger in an 8-beat count for each Pāda: 1-2-3-4 / 5(short)-6(long)-7-8. Notice how naturally the breath settles.',
          recitationTips: 'Pause for one calm beat at the end of the first line (।), and two beats at the double-danda (॥).'
        },
        ruleMechanics: {
          title: 'The Pingala Chandas-Śāstra Rule of Anuṣṭubh',
          explanation: [
            'Formula: 4 Pādas × 8 Akṣaras = 32 Akṣaras.',
            'Universal constraint: Syllable 5 is always Laghu (˘); Syllable 6 is always Guru (¯).'
          ],
          tableData: {
            headers: ['Quarter (पादः)', 'Syllable Range', '5th Syllable Rule', '6th Syllable Rule', '7th Syllable Rule', 'Cadence Rhythm'],
            rows: [
              ['प्रथमः पादः (Pāda 1)', 'Syllables 1 to 8', 'लघु (Laghu / Short: ˘)', 'गुरु (Guru / Long: ¯)', 'गुरु (Guru / Long: ¯)', '˘ ¯ ¯ (Laghu-Guru-Guru)'],
              ['द्वितीयः पादः (Pāda 2)', 'Syllables 9 to 16', 'लघु (Laghu / Short: ˘)', 'गुरु (Guru / Long: ¯)', 'लघु (Laghu / Short: ˘)', '˘ ¯ ˘ (Laghu-Guru-Laghu)'],
              ['तृतीयः पादः (Pāda 3)', 'Syllables 17 to 24', 'लघु (Laghu / Short: ˘)', 'गुरु (Guru / Long: ¯)', 'गुरु (Guru / Long: ¯)', '˘ ¯ ¯ (Laghu-Guru-Guru)'],
              ['चतुर्थः पादः (Pāda 4)', 'Syllables 25 to 32', 'लघु (Laghu / Short: ˘)', 'गुरु (Guru / Long: ¯)', 'लघु (Laghu / Short: ˘)', '˘ ¯ ˘ (Laghu-Guru-Laghu)']
            ]
          },
          sutraReference: {
            devanagari: 'श्लोके षष्ठं गुरु ज्ञेयं सर्वत्र लघु पञ्चमम् । द्विचतुष्पादयोर्ह्रस्वं सप्तमं दीर्घमन्ययोः ॥',
            iast: 'śloke ṣaṣṭhaṁ guru jñeyaṁ sarvatra laghu pañcamam | dvi-catuṣ-pādayor hrasvaṁ saptamaṁ dīrgham anyayoḥ ||',
            meaning: 'In an Anuṣṭubh śloka, the 5th syllable is short in all 4 pādas; the 6th is always long; the 7th is short in pādas 2 & 4, and long in pādas 1 & 3.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-4-4',
            prompt: 'In an Anuṣṭubh meter (the standard 32-syllable verse), what must the 5th and 6th syllables of every 8-beat quarter always be?',
            options: [
              '5th is always Long, 6th is always Short',
              '5th is always Short (Laghu), 6th is always Long (Guru)',
              'Both must be silent',
              'There is no rule'
            ],
            correctIndex: 1,
            explanation: 'Under Chandas-śāstra rules, "सर्वत्र लघु पञ्चमम्" (5th is always short) and "षष्ठं गुरु ज्ञेयम्" (6th is always long).'
          },
          worksheetSummary: 'Worksheet 4.4: Anuṣṭubh Meter Metrical Scanning (लघु-गुरु) & Gītā Chanting Guide.',
          worksheetDownloadId: 'ws-c4-4'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Cardiology & Respiratory Entrainment',
          heading: '0.1 Hz Resonance Frequency in Human Heart Rhythms',
          bridgeExplanation: 'Cardiovascular studies in the British Medical Journal (BMJ) revealed that reciting poetic verse in metered 6-breaths-per-minute cycles (such as the Anuṣṭubh or the Ave Maria) induces powerful respiratory sinus arrhythmia synchronization, matching the 0.1 Hz intrinsic baroreflex rhythm.',
          modernInsight: 'Anuṣṭubh chanting is literally biometric biofeedback designed to optimize oxygenation and heart-rate variability.'
        },
        linkedResources: [
          { label: 'Gītā Chapter 2 Living Reciter', targetView: 'reader', badge: 'Gītā Audio' },
          { label: 'Course Capstone Verse Breakdown', targetView: 'course-addendum', badge: 'Capstone' }
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 5: The Scientific Mind (गणितम्, तर्कः)
  // =========================================================================
  {
    id: 'mod-5',
    moduleNumber: 5,
    titleDevanagari: 'गणितम्, तर्कः · The Scientific Mind',
    titleEnglish: 'The Scientific Mind (गणितम्, तर्कः)',
    tagline: 'Algorithmic grammar, fast mental computing, and cipher encoding',
    themeColor: '#0284c7',
    icon: '🔬',
    overview:
      'Explore how the rigorous logic of Sanskrit directly powers scientific computation: Pāṇini’s rewrite grammar as the world’s first generative compiler, Vedic mental mathematics, Kaṭapayādi alphanumeric encryption, and Sanskrit roots in modern computing terminology.',
    lessons: [
      {
        id: 'c-5-1',
        lessonNumber: '5.1',
        titleDevanagari: 'अष्टाध्यायी · जगत्-प्रथम-सङ्गणक-सूत्रम्',
        titleEnglish: "Pāṇini's Grammar as an Algorithm",
        shortDescription: "The world's first formal language compiler, written in 3,959 algebraic sūtras circa 500 BCE.",
        ideaConcept: {
          heading: 'The World’s First Generative Machine',
          summary: 'Around 500 BCE, Maharṣi Pāṇini built a complete machine for generating every valid word in the Sanskrit language using 3,959 concise formulas. Computer scientists today recognize it as the world’s first formal generative compiler.',
          body: [
            'In 1960, John Backus and Peter Naur invented the BNF (Backus-Naur Form) to define computer programming languages. Renowned computer scientist Donald Knuth pointed out that Pāṇini had invented this 2,400 years earlier.',
            'Pāṇini uses: variable names, auxiliary markers (it-saṁjñā), conditional if-then rules, operator precedence, and recursion.'
          ],
          keyTakeaway: 'The Aṣṭādhyāyī is not a grammar book; it is a formal algebraic program that compiles raw phonetic roots into runtime sentences.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'वृद्धिरादैच्', iast: 'vṛddhir ādaic (1.1.1)', meaning: 'The first sūtra: ā, ai, au are designated as Vṛddhi' },
            { devanagari: 'अदेङ् गुणः', iast: 'adeṅ guṇaḥ (1.1.2)', meaning: 'The second sūtra: a, e, o are designated as Guṇa' },
            { devanagari: 'इको यणचि', iast: 'iko yaṇaci (6.1.77)', meaning: 'Rule: i, u, ṛ, ḷ become y, v, r, l before a vowel' }
          ],
          phoneticInstructions: 'Recite sūtra 1.1.1 "Vṛddhir ādaic" with crisp mathematical separation. Notice how Pāṇini begins his entire masterpiece with the auspicious word "वृद्धि" (growth, prosperity, expansion)!',
          recitationTips: 'Sūtras are compressed code; every syllable was weighted with extreme economy.'
        },
        ruleMechanics: {
          title: 'The Pāṇinian Computational Engine vs Modern Compilers',
          explanation: [
            'Pāṇini uses 4 main rule categories:',
            '1. Saṁjñā (Definition/Types), 2. Paribhāṣā (Meta-rules of interpretation),',
            '3. Vidhi (Operational transformation), 4. Adhikāra (Scope/Context inheritance).'
          ],
          tableData: {
            headers: ['Pāṇinian Structural Engine', 'Modern Computer Science Equivalent', 'Operational Mechanism', 'Living Example'],
            rows: [
              ['शिवसूत्राणि (Śiva Sūtras)', 'Phonemic Alphabet & Bitmask Vectors', 'Arranges 42 sounds to define sub-ranges via 2-letter tokens', 'अण् = {a, i, u}; अल् = all phonemes'],
              ['प्रत्याहारः (Pratyāhāra)', 'Subarray slicing & regular expressions', 'Defines token intervals [Start, End Marker)', 'अच् = all vowels; हल् = all consonants'],
              ['संज्ञा (Saṁjñā) & परिभाषा (Paribhāṣā)', 'Meta-types and Scope Resolution Rules', 'Defines types, default parameters, and operator precedence', 'वृद्धिर्यस्याचामादिस्तद् वृद्धम् (1.1.73)'],
              ['विधि-सूत्राणि (Vidhi Sūtras)', 'Production Rules / Rewrite Grammar', 'Transforms input strings based on pattern matching', 'इको यणचि (6.1.77): i/u/ṛ/ḷ → y/v/r/l / _ [Vowel]'],
              ['विप्रतिषेध-नियमः (Conflict Resolution)', 'Compiler Conflict / Operator Precedence', 'When two rules apply simultaneously, the later/more specific rule wins', 'विप्रतिषेधे परं कार्यम् (1.4.2)']
            ]
          },
          sutraReference: {
            devanagari: 'विप्रतिषेधे परं कार्यम्',
            iast: 'vipratiṣedhe paraṁ kāryam (Pāṇini 1.4.2)',
            meaning: 'In case of an equal conflict between two mutually applicable rules, the subsequent rule in the order of the Aṣṭādhyāyī takes precedence.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-5-1',
            prompt: 'Why do computer scientists (including Donald Knuth) compare Pāṇini’s Aṣṭādhyāyī to Backus-Naur Form (BNF)?',
            options: [
              'Because both were written on computers',
              'Because Pāṇini used context-free generative rewrite rules and meta-linguistic variables 2,400 years before computing',
              'Because both are musical scales',
              'Because neither has rules'
            ],
            correctIndex: 1,
            explanation: 'Pāṇini invented formal grammar and algebraic metalanguage (auxiliary tags, shorthand notation, rule hierarchy) thousands of years before modern computing.'
          },
          worksheetSummary: 'Worksheet 5.1: The Pāṇinian Algorithm & Rewrite Rule Tracing Exercise.',
          worksheetDownloadId: 'ws-c5-1'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Theoretical Computer Science & Compilers',
          heading: 'Context-Free Grammars and Universal Turing Machines',
          bridgeExplanation: 'Pāṇini’s grammar is an algorithmic engine capable of generating the infinite expressions of human thought from finite axiomatic sūtras. It is the world’s earliest functioning generative system.',
          modernInsight: 'Studying Pāṇini trains the mind to think in recursive algorithms, type inheritance, and clean architectural separation of concerns.'
        },
        linkedResources: [
          { label: 'Pāṇinian Studio & Sūtra Engine', targetView: 'grammar', badge: 'Interactive Tool' },
          { label: 'Sanskrit & Modern Computing Research Guide', targetView: 'vedic-maths', badge: 'Research' }
        ]
      },
      {
        id: 'c-5-2',
        lessonNumber: '5.2',
        titleDevanagari: 'वैदिक-गणित-सूत्राणि · मानसिक-गणना',
        titleEnglish: 'Vedic Maths Sutras: Fast Mental Computing',
        shortDescription: '16 mental math algorithms that turn complex arithmetic and algebra into lightning-fast visual patterns.',
        ideaConcept: {
          heading: 'Arithmetic as Spatial Pattern Recognition',
          summary: 'Conventional math forces you to calculate rigidly from right to left with cumbersome carrying and paper clutter. Vedic Maths uses 16 visual sūtras that allow you to calculate from left to right directly in your head.',
          body: [
            'Rediscovered by Swami Bharati Krishna Tirtha between 1911 and 1918 from appendices of the Atharvaveda.',
            'Examples: Ekādhikena Pūrveṇa (squaring numbers ending in 5 in 2 seconds!), Nikhilam Navataścaramaṁ Daśataḥ (multiplying numbers near 100, 1000 in your head).'
          ],
          keyTakeaway: 'Vedic Maths transforms calculation from mechanical drudgery into joyful visual pattern play.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'एकाधिकेन पूर्वेण', iast: 'ekādhikena pūrveṇa', meaning: 'By one more than the previous one (Squaring ending in 5)' },
            { devanagari: 'निखिलं नवतश्चरमं दशतः', iast: 'nikhilaṁ navataścaramaṁ daśataḥ', meaning: 'All from 9 and the last from 10 (Fast multiplication)' },
            { devanagari: 'ऊर्ध्वतिर्यग्भ्याम्', iast: 'ūrdhva-tiryagbhyām', meaning: 'Vertically and Crosswise (Universal multiplication)' }
          ],
          phoneticInstructions: 'Chant "Ekādhikena Pūrveṇa". Notice the rhythmic balance: E-kā-dhi-ke-na Pūr-ve-ṇa.',
          recitationTips: 'Say the sūtra mentally as you execute the mental calculation.'
        },
        ruleMechanics: {
          title: 'Vedic Mental Math Sūtras & Worked Proofs',
          explanation: [
            'Squaring 75: Ekādhikena Pūrveṇa → Previous digit is 7. One more is 8.',
            'Step 1: 7 × 8 = 56. Step 2: 5² = 25. Result = 5625 in 2 seconds!'
          ],
          tableData: {
            headers: ['Sūtra Name (सूत्रम्)', 'Literal Meaning', 'Mathematical Operation', 'Worked Example'],
            rows: [
              ['एकाधिकेन पूर्वेण', 'By one more than the previous one', 'Squaring numbers ending in 5; special multiplication', '65²: First part 6 × (6+1) = 42; second part 5² = 25 → 4225'],
              ['निखिलं नवतश्चरमं दशतः', 'All from 9 and the last from 10', 'Multiplication near base 10ⁿ; subtraction from powers of 10', '98 × 97 (Base 100): Deficits (-2, -3) → (98-3) | (2×3) = 9506'],
              ['ऊर्ध्वतिर्यग्भ्याम्', 'Vertically and Crosswise', 'General multiplication of any n-digit numbers; polynomial products', '23 × 12: Vert 2×1=2; Cross (2×2)+(3×1)=7; Vert 3×2=6 → 276'],
              ['परावर्त्य योजयेत्', 'Transpose and Apply', 'Algebraic division; linear equation solving; synthetic division', 'Solve 3x + 4 = 19: x = (19 - 4) ÷ 3 = 5 (Transposing sign and divisor)'],
              ['शून्यं साम्यसमुच्चये', 'When the collection is the same, it is zero', 'Factorization and roots where symmetrical terms equate', 'If (x+1) + (x+2) = (x+3) + x, then collection matches → x = 0']
            ]
          },
          sutraReference: {
            devanagari: 'एकाधिकेन पूर्वेण । निखिलं नवतश्चरमं दशतः । ऊर्ध्वतिर्यग्भ्याम् ।',
            iast: 'ekādhikena pūrveṇa | nikhilaṁ navataścaramaṁ daśataḥ | ūrdhva-tiryagbhyām |',
            meaning: 'The foundational triad of Vedic mathematical sūtras: by one more than the before; all from nine and last from ten; vertically and crosswise.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-5-2',
            prompt: 'Using the sūtra "एकाधिकेन पूर्वेण", what is 85² calculated mentally?',
            options: [
              '7225 (8 × 9 = 72, then append 25)',
              '6425',
              '8125',
              '7025'
            ],
            correctIndex: 0,
            explanation: 'By Ekādhikena Pūrveṇa: take the prefix 8, multiply by one more (8 × 9 = 72), and append 5² (25) = 7225.'
          },
          worksheetSummary: 'Worksheet 5.2: Vedic Maths 16 Sūtras Quick-Calculation Drills & Answer Key.',
          worksheetDownloadId: 'ws-c5-2'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Computational Complexity & Mental Agility',
          heading: 'Algorithmic Optimization in Brain-Based Computing',
          bridgeExplanation: 'In computer algorithms (like Karatsuba multiplication and Fast Fourier Transforms), reducing the number of primitive multiplication operations drops computational complexity from O(n²) to O(n^1.58). Vedic Maths does this biologically: it offloads mechanical carrying into spatial geometric heuristics.',
          modernInsight: 'Practicing Vedic Maths increases working memory, mathematical confidence, and lateral thinking.'
        },
        linkedResources: [
          { label: 'Interactive Vedic Maths Studio (All 16 Sūtras)', targetView: 'vedic-maths', badge: 'Maths Studio' },
          { label: 'Darśana Addendum: Evolution of Vedic Mathematics', targetView: 'course-addendum', badge: 'Addendum' }
        ]
      },
      {
        id: 'c-5-3',
        lessonNumber: '5.3',
        titleDevanagari: 'कटपयादि-संख्या-पद्धतिः · गूढ-सङ्ख्या',
        titleEnglish: 'Kaṭapayādi: Numbers Encoded as Words',
        shortDescription: 'The ancient alphanumeric hashing system that hides mathematical constants inside poetic prayers.',
        ideaConcept: {
          heading: 'Alphanumeric Encryption in Classical Astronomy',
          summary: 'Imagine memorizing Pi (π) to 32 decimal places by chanting a melodious praise of Krishna! That was standard practice in ancient Kerala through the Kaṭapayādi cipher.',
          body: [
            'Each consonant group corresponds to numbers 1 to 9, and vowels are zero (कादिर्नव टादिर्नव पादिपञ्चक यद्यष्टकः).',
            'Numbers are read backwards (अङ्कानां वामतो गतिः), allowing astronomical constants and trigonometric sine tables to be disguised as poetic prayers.'
          ],
          keyTakeaway: 'Kaṭapayādi bridges left-brain mathematical computation with right-brain poetic melody.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'गोपीभाग्यमधुव्रात...', iast: 'gopībhāgyamadhuvrāta...', meaning: 'Pi to 32 decimal places encoded in a prayer to Krishna' },
            { devanagari: 'कादिर्नव', iast: 'kādir nava', meaning: 'Consonants starting with Ka represent digits 1 to 9' },
            { devanagari: 'टादिर्नव', iast: 'ṭādir nava', meaning: 'Consonants starting with Ṭa represent digits 1 to 9' },
            { devanagari: 'पादिपञ्चक', iast: 'pādi pañcaka', meaning: 'Consonants starting with Pa represent digits 1 to 5' },
            { devanagari: 'यद्यष्टक', iast: 'yady-aṣṭaka', meaning: 'Consonants starting with Ya represent digits 1 to 8' }
          ],
          phoneticInstructions: 'Chant "गोपीभाग्यमधुव्रातशृङ्गिशोदधिसन्धिग". Every single syllable represents an exact digit of Pi: 3.1415926535897932384626433832792!',
          recitationTips: 'Notice how the vowels add emotional beauty while consonants hold the mathematical data payload.'
        },
        ruleMechanics: {
          title: 'The Kaṭapayādi Master Decoding Matrix',
          explanation: [
            'Formula: अङ्कानां वामतो गतिः (Numbers proceed from right to left)',
            'Ka to Jha = 1-9; Ṭa to Dha = 1-9; Pa to Ma = 1-5; Ya to Ha = 1-8. Consonants and standalone vowels = 0.'
          ],
          tableData: {
            headers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            rows: [
              ['क (ka)', 'ख (kha)', 'ग (ga)', 'घ (gha)', 'ङ (ṅa)', 'च (ca)', 'छ (cha)', 'ज (ja)', 'झ (jha)', 'ञ (ña)'],
              ['ट (ṭa)', 'ठ (ṭha)', 'ड (ḍa)', 'ढ (ḍha)', 'ण (ṇa)', 'त (ta)', 'थ (tha)', 'द (da)', 'ध (dha)', 'न (na)'],
              ['प (pa)', 'फ (pha)', 'ब (ba)', 'भ (bha)', 'म (ma)', '—', '—', '—', '—', '—'],
              ['य (ya)', 'र (ra)', 'ल (la)', 'व (va)', 'श (śa)', 'ष (ṣa)', 'स (sa)', 'ह (ha)', '—', '—']
            ]
          },
          sutraReference: {
            devanagari: 'कादिर्नव टादिर्नव पादिपञ्चक यद्यष्टकः । क्षः शून्यम् ॥',
            iast: 'kādir nava ṭādir nava pādi-pañcaka yady-aṣṭakaḥ | kṣaḥ śūnyam ||',
            meaning: 'Letters starting with Ka are 1-9; starting with Ṭa are 1-9; starting with Pa are 1-5; starting with Ya are 1-8. Consonants and standalone vowels are zero.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-5-3',
            prompt: 'In the Kaṭapayādi alphanumeric system, what direction are encoded numbers deciphered?',
            options: [
              'Top to bottom',
              'From right to left (अङ्कानां वामतो गतिः)',
              'From left to right only',
              'Randomly'
            ],
            correctIndex: 1,
            explanation: 'The fundamental rule is "अङ्कानां वामतो गतिः" (Numbers move towards the left): the first spoken syllable represents the units digit, the second the tens digit, and so on.'
          },
          worksheetSummary: 'Worksheet 5.3: Kaṭapayādi Alphanumeric Encryption & Astronomical Verse Decryption.',
          worksheetDownloadId: 'ws-c5-3'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Cryptography & Steganography',
          heading: 'Steganography: Hiding Data Inside Aesthetic Carrier Signals',
          bridgeExplanation: 'In modern cybersecurity, steganography is the practice of concealing secret data within an ordinary file (like hiding text inside an image’s least significant bits). Kaṭapayādi was literal steganography: high-precision mathematical data was imperceptibly hidden inside sacred liturgical hymns.',
          modernInsight: 'This ensured that scientific discoveries survived centuries of foreign invasions and manuscript destruction by living in oral memory.'
        },
        linkedResources: [
          { label: 'Kaṭapayādi Interactive Cipher Tool', targetView: 'vedic-maths', badge: 'Cipher Tool' },
          { label: 'Numbers Guide & Sanskrit Numerals', targetView: 'home', badge: 'Numerals' }
        ]
      },
      {
        id: 'c-5-4',
        lessonNumber: '5.4',
        titleDevanagari: 'विज्ञान-तन्त्रज्ञाने संस्कृत-पदानि',
        titleEnglish: 'Sanskrit Words in Science, Technology & English',
        shortDescription: 'From Mother to Matrix, Geometry to Gaṇita: tracing ancient Sanskrit roots in modern global science.',
        ideaConcept: {
          heading: 'The Global Etymological Thread',
          summary: 'Did you know that "Geometry" comes from Gyamiti (ज्यामिति), "Trigonometry" from Trikonamiti (त्रिकोणमिति), and "Mother" from Mātṛ (मातृ)? Sanskrit is the elder sister of the Indo-European linguistic family.',
          body: [
            'In 1869, Russian chemist Dmitri Mendeleev organized the Periodic Table of Elements. To name his predicted undiscovered elements, he used Sanskrit prefixes: Eka-boron, Eka-aluminium, and Eka-silicon!',
            'Why? Because Mendeleev was inspired by the two-dimensional matrix organization of Pāṇini’s Śiva Sūtras.'
          ],
          keyTakeaway: 'Sanskrit vocabulary is already in your mouth when you speak English, mathematics, and science.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'मातृ → Mother', iast: 'mātṛ → Mother', meaning: 'Root √मा (to measure / nourish)' },
            { devanagari: 'भ्रातृ → Brother', iast: 'bhrātṛ → Brother', meaning: 'Root √भृ (to bear / support)' },
            { devanagari: 'ज्यामितिः → Geometry', iast: 'jyāmitiḥ → Geometry', meaning: 'Earth measurement (ज्या + मिति)' },
            { devanagari: 'त्रिकोणमितिः → Trigonometry', iast: 'trikoṇamitiḥ → Trigonometry', meaning: 'Measurement of three-angled shapes' }
          ],
          phoneticInstructions: 'Pronounce the pairs: Mātṛ / Mother, Bhrātṛ / Brother, Nāman / Name, Pada / Pedestrian. Feel the ancient family connection vibrating across centuries.',
          recitationTips: 'Notice how the Sanskrit root is almost always more descriptive and mathematically transparent.'
        },
        ruleMechanics: {
          title: 'Indo-European Cognate Matrix & Scientific Nomenclature',
          explanation: [
            'Grimm’s Law and Verner’s Law explain how Sanskrit consonants shifted into Germanic and Latin over 3,000 years:',
            'Sanskrit aspirated stops (bh, dh, gh) softened into voiced stops (b, d, g) in English.'
          ],
          tableData: {
            headers: ['Sanskrit Root / Word', 'Core Meaning', 'Cognate / Descendant in English', 'Scientific / Technical Field', 'Shared Indo-European Concept'],
            rows: [
              ['मातृ (Mātṛ)', 'Mother / Measurer', 'Mother, Matrix, Metric, Matter', 'Mathematics / Physics', 'The matrix from which all manifestation is measured'],
              ['भ्रातृ (Bhrātṛ)', 'Brother / Supporter', 'Brother, Fraternal', 'Anthropology / Biology', 'Kinship bonds sharing sustenance'],
              ['नामन् (Nāman)', 'Name / Identity', 'Name, Nominal, Nomenclature', 'Computer Science / Linguistics', 'Identifier token pointing to an object'],
              ['पद (Pada)', 'Step / Place / Foot', 'Foot, Pedal, Pedestrian, Podiatry', 'Anatomy / Geometry', 'Unit of measurement and locational standing'],
              ['ज्ञान (Jñāna)', 'Direct knowing / Gnosis', 'Know, Gnosis, Cognition, Diagnosis', 'Epistemology / Cognitive Science', 'Active awareness grasping reality without distortion'],
              ['अष्ट (Aṣṭa)', 'Eight (8)', 'Eight, Octagon, Octopus, Octave', 'Arithmetic / Musicology', 'The structural octave in acoustic and numerical scales']
            ]
          },
          sutraReference: {
            devanagari: 'एकं सद्विप्रा बहुधा वदन्ति',
            iast: 'ekaṁ sad viprā bahudhā vadanti (Ṛgveda 1.164.46)',
            meaning: 'Truth is one; the wise articulate it through multiple linguistic expressions and varied names.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-5-4',
            prompt: 'Why did the creator of the Periodic Table, Dmitri Mendeleev, name his predicted missing elements "Eka-Aluminium" and "Eka-Silicon" using the Sanskrit word "Eka" (एक)?',
            options: [
              'It was a complete coincidence',
              'He was paying homage to Pāṇini’s two-dimensional matrix of sounds (Śiva Sūtras), which inspired his periodic table layout',
              'Because Sanskrit was the language of Russia',
              'He liked the sound of the word'
            ],
            correctIndex: 1,
            explanation: 'Historical linguistics confirms that Mendeleev was a friend of Sanskrit scholar Böhtlingk and deliberately utilized Sanskrit’s "Eka" (one beyond) in homage to Pāṇinian structural matrices.'
          },
          worksheetSummary: 'Worksheet 5.4: Sanskrit Etymology in Modern Science & 100 Indo-European Cognates Chart.',
          worksheetDownloadId: 'ws-c5-4'
        },
        thinkingConnection: {
          type: 'integrated',
          badgeLabel: '🧠 Cognitive History of Science',
          heading: 'Mendeleev, Pāṇini, and the Architecture of Discovery',
          bridgeExplanation: 'Scientific breakthroughs often occur when a thinker imports an elegant structural model from an unrelated discipline. Mendeleev’s recognition of periodic atomic properties mirrored Pāṇini’s grouping of phonemes by place of articulation and acoustic effort.',
          modernInsight: 'Studying ancient linguistic systems expands your capacity for cross-disciplinary pattern recognition.'
        },
        linkedResources: [
          { label: 'Philosophy: Why Sanskrit Matters in the AI Age', targetView: 'philosophy', badge: 'Essay' },
          { label: 'Full Course Certificate Desk', targetView: 'worksheets', badge: 'Certificate' }
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 6: The Contemplative Mind (दर्शनम्)
  // =========================================================================
  {
    id: 'mod-6',
    moduleNumber: 6,
    titleDevanagari: 'दर्शनम् · The Contemplative Mind',
    titleEnglish: 'The Contemplative Mind (दर्शनम्)',
    tagline: 'Sound as meditation: from recitation to direct realization',
    themeColor: '#7c3aed',
    icon: '🪔',
    overview:
      'The ultimate culmination: turning speech back into its transcendent source. Experience how focused recitation calms the autonomic nervous system, read the Bhagavad Gītā directly without translation, explore the 6 Darśanas as integrated lenses on reality, and execute an end-to-end linguistic and philosophical analysis of a sacred verse.',
    lessons: [
      {
        id: 'c-6-1',
        lessonNumber: '6.1',
        titleDevanagari: 'स्वरः, लयः एवं एकाग्रता',
        titleEnglish: 'Recitation and Focus: Svara, Rhythm and Attention',
        shortDescription: 'How pitch accents (Udātta, Anudātta, Svarita) transform speech into a laser of cognitive presence.',
        ideaConcept: {
          heading: 'Chanting as Vocal Meditation',
          summary: 'In the Vedic tradition, recitation is not singing for performance. It is an exacting discipline of attention where pitch, duration, and breath are locked into alignment.',
          body: [
            'The three Vedic accents: Udātta (उदान्त = elevated pitch), Anudātta (अनुदात्त = grave/low pitch), and Svarita (स्वरित = circumflex/falling pitch).',
            'Reciting with Svara requires total presence: if your mind wanders for a quarter of a second, your pitch drops and you notice immediately!'
          ],
          keyTakeaway: 'Svara is a real-time biofeedback monitor for human awareness.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'उदात्तः', iast: 'udāttaḥ', meaning: 'Raised / High tone (No mark in text)' },
            { devanagari: 'अनुदात्तः', iast: 'anudāttaḥ', meaning: 'Grave / Low tone (Underline mark)' },
            { devanagari: 'स्वरितः', iast: 'svaritaḥ', meaning: 'Falling / Combined tone (Vertical stroke above)' },
            { devanagari: 'ॐ भूर्भुवः स्वः', iast: 'oṁ bhūr bhuvaḥ svaḥ', meaning: 'The sacred Vyāhṛtis with Vedic accents' },
            { devanagari: 'सत्यं वद । धर्मं चर ।', iast: 'satyaṁ vada | dharmaṁ cara |', meaning: 'Speak truth; walk in righteousness (Taittirīya)' }
          ],
          phoneticInstructions: 'Listen closely to the pitch rise on Svarita (vertical mark) and the grounding chest drop on Anudātta (horizontal underbar).',
          recitationTips: 'Never force the throat. Let the breath rise from the diaphragm like a fountain.'
        },
        ruleMechanics: {
          title: 'The Vedic Svara Accent Triad & Physiological Effect',
          explanation: [
            '1. Udātta (उच्चैरुदात्तः 1.2.29): Pitch produced in the upper vocal tract registers.',
            '2. Anudātta (नीचैरनुदात्तः 1.2.30): Pitch produced in the lower vocal registers.',
            '3. Svarita (समाहारः स्वरितः 1.2.31): Falling inflection connecting Udātta and Anudātta.'
          ],
          tableData: {
            headers: ['Svara Accent (स्वरः)', 'Vocal Pitch & Intonation', 'Devanāgarī Notation', 'Physiological Effect', 'Vedic Sūtra Landmark'],
            rows: [
              ['उदात्तः (Udātta)', 'High / elevated pitch; vocal cords tighten slightly', 'Unmarked (bare syllable)', 'Alert, upward movement of attention', 'उच्चैरुदात्तः (Pāṇini 1.2.29)'],
              ['अनुदात्तः (Anudātta)', 'Low / grave pitch; chest resonance opens', 'Horizontal line underneath ( _ )', 'Grounding, parasympathetic calming', 'नीचैरनुदात्तः (Pāṇini 1.2.30)'],
              ['स्वरितः (Svarita)', 'Circumflex / falling pitch from high to low', 'Vertical stroke on top ( | )', 'Harmonic balancing; cerebral integration', 'समाहारः स्वरितः (Pāṇini 1.2.31)']
            ]
          },
          sutraReference: {
            devanagari: 'उच्चैरुदात्तः । नीचैरनुदात्तः । समाहारः स्वरितः ।',
            iast: 'uccair udāttaḥ | nīcair anudāttaḥ | samāhāraḥ svaritaḥ (Pāṇini 1.2.29-31)',
            meaning: 'High-pitched is Udātta; low-pitched is Anudātta; the synthesis/combination of both is Svarita.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-6-1',
            prompt: 'In Vedic text notation, what does a horizontal line under a syllable (like अ॒) signify?',
            options: [
              'It means the letter is silent',
              'It is Anudātta (low/grave pitch accent)',
              'It means pronounce it twice',
              'It is a printing error'
            ],
            correctIndex: 1,
            explanation: 'The horizontal underbar signifies Anudātta (the low or grave pitch accent in Vedic recitation).'
          },
          worksheetSummary: 'Worksheet 6.1: Vedic Svara Accent Notation & Focused Recitation Breath Guide.',
          worksheetDownloadId: 'ws-c6-1'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 Vagal Nerve Stimulation & Chanting',
          heading: 'Vocal Resonance and Parasympathetic Activation',
          bridgeExplanation: 'Neuroscientific studies on mantra chanting confirm that prolonged vocalic exhalations stimulate the auricular branch of the vagus nerve, reducing amygdala hyperactivity and inducing deep parasympathetic tranquility.',
          modernInsight: 'Ancient recitation was a sophisticated psycho-acoustic technology designed to quiet mental chatter before deep meditation.'
        },
        linkedResources: [
          { label: 'Deepakam Chapter 1 Reciter', targetView: 'reader', badge: 'Audio Reader' },
          { label: 'Philosophy: Living Transmission vs Models', targetView: 'philosophy', badge: 'Essay' }
        ]
      },
      {
        id: 'c-6-2',
        lessonNumber: '6.2',
        titleDevanagari: 'श्रीमद्भगवद्गीता-पठनम्',
        titleEnglish: 'Reading the Gītā Directly',
        shortDescription: 'Entering the battlefield dialogue of Krishna and Arjuna without translation intermediaries.',
        ideaConcept: {
          heading: 'Meeting the Song of the Divine',
          summary: 'Translations are like looking at a sunrise through someone else’s tinted sunglasses. In this lesson, you will read the most famous stanza of the Bhagavad Gītā (2.47) directly in original Sanskrit.',
          body: [
            '"कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"',
            'You will dissect each word grammatically: Karmāṇi (Locative: in action) + eva (alone) + adhikāraḥ (right/jurisdiction) + te (to you).'
          ],
          keyTakeaway: 'Reading the original words gives you direct, unfiltered intimacy with timeless spiritual psychology.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'कर्मण्येवाधिकारस्ते', iast: 'karmaṇy-evādhikāras-te', meaning: 'You have jurisdiction over action alone...' },
            { devanagari: 'मा फलेषु कदाचन ।', iast: 'mā phaleṣu kadācana |', meaning: '...never over the fruits / results.' },
            { devanagari: 'समत्वं योग उच्यते ।', iast: 'samatvaṁ yoga ucyate |', meaning: 'Equanimity of mind is termed Yoga.' }
          ],
          phoneticInstructions: 'Chant verse 2.47 in the traditional Anuṣṭubh lilt: Kar-man-yev-ādhi-kā-ras-te / mā pha-le-ṣu ka-dā-ca-na.',
          recitationTips: 'Pause and let the meaning wash through your mind before moving to the second line.'
        },
        ruleMechanics: {
          title: 'Grammatical Breakdown of Gītā 2.47',
          explanation: [
            'कर्मणि (In action - 7th Locative) + एव (alone) + अधिकारः (right - 1st Nominative) + ते (to you - 6th Genitive)',
            'मा (not) + फलेषु (in fruits - 7th Locative Plural) + कदाचन (ever)'
          ],
          tableData: {
            headers: ['Gītā 2.47 Quarter', 'Padaccheda (Word Split)', 'Grammatical Case / Verb Form', 'Meaning', 'Spiritual Contemplation'],
            rows: [
              ['कर्मण्येवाधिकारस्ते', 'कर्मणि एव अधिकारः ते', 'Saptamī (in action) + Avyaya + Prathamā + Genitive pronoun', 'In action alone is your jurisdiction / right', 'Direct your energy toward your duty, never into obsessive worry'],
              ['मा फलेषु कदाचन ।', 'मा फलेषु कदाचन', 'Particle of prohibition + Saptamī plural (in fruits) + Adverb', 'Never in the fruits or outcomes of action', 'Severing anxiety: you control the input effort, not the external result'],
              ['मा कर्मफलहेतुर्भूर्', 'मा कर्म-फल-हेतुः भूः', 'Negative particle + Bahuvrīhi compound + Aorist verb', 'Do not let the motive for action be the reward', 'Act from duty and excellence, not mercenary calculation'],
              ['मा ते सङ्गोऽस्त्वकर्मणि ॥', 'मा ते सङ्गः अस्तु अकर्मणि', 'Negative + Genitive + Nominative + Imperative + Locative', 'Nor let there be any attachment to inaction', 'Refuse paralysis and lethargy; engage the world with complete presence']
            ]
          },
          sutraReference: {
            devanagari: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय । सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥',
            iast: 'yogasthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya | siddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate (Gītā 2.48)',
            meaning: 'Established in yoga, perform your actions having abandoned selfish attachment; remaining equanimous in success and failure—equanimity is called Yoga.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-6-2',
            prompt: 'In Bhagavad Gītā 2.47, what does the phrase "कर्मणि एव अधिकारः ते" (Karmaṇyevādhikāraste) mean?',
            options: [
              'You have no right to do any work',
              'You have jurisdiction/standing over your action alone, not over its results',
              'You should only work if you get paid immediately',
              'Action is an illusion'
            ],
            correctIndex: 1,
            explanation: '"कर्मणि एव अधिकारः ते": Your jurisdiction (अधिकारः) is strictly within action (कर्मणि), never in the fruits (मा फलेषु).'
          },
          worksheetSummary: 'Worksheet 6.2: Bhagavad Gītā Verse 2.47 & 2.48 Word-by-Word Grammatical Parsing Sheet.',
          worksheetDownloadId: 'ws-c6-2'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 Karma Yoga & Psychological Freedom',
          heading: 'Decoupling Effort from Anxiety',
          bridgeExplanation: 'Modern cognitive behavioral therapy (CBT) and stoic philosophy emphasize focusing solely on the "Locus of Control". Krishna’s teaching in 2.47 is the ultimate formulation of this principle: total commitment to the quality of action, accompanied by complete surrender of obsessive attachment to the outcome.',
          modernInsight: 'Direct engagement with this Sanskrit verse dissolves burnout and performance anxiety at their root.'
        },
        linkedResources: [
          { label: 'Bhagavad Gītā Interactive Reciter', targetView: 'reader', badge: 'Audio Reader' },
          { label: 'Philosophy: The Well & The Bank', targetView: 'philosophy', badge: 'Article' }
        ]
      },
      {
        id: 'c-6-3',
        lessonNumber: '6.3',
        titleDevanagari: 'षड्-दर्शनानि · दृष्टयः',
        titleEnglish: 'The Darśanas as Ways of Seeing',
        shortDescription: 'The six classical schools of Indian philosophy as complementary scientific lenses on reality.',
        ideaConcept: {
          heading: 'The Six Luminescent Lenses on Reality',
          summary: 'In the West, philosophical schools argued to destroy each other. In classical India, the six orthodox Darśanas (from dṛś = to see) operate as a progressive staircase of human cognition.',
          body: [
            '1. Nyāya: Formal logic and epistemology (How do we know what is real?)',
            '2. Vaiśeṣika: Atomic physics and taxonomy of substances',
            '3. Sāṅkhya: The 25 cosmic principles from consciousness (Puruṣa) to matter (Prakṛti)',
            '4. Yoga: The psychophysical science of stilling mental fluctuations',
            '5. Mīmāṁsā: Linguistic duty, acoustic physics, and living ritual',
            '6. Vedānta: The non-dual climax: individual consciousness is identical with universal reality'
          ],
          keyTakeaway: 'The Darśanas are not dogmatic beliefs; they are rigorous empirical instruments for investigating the self and the cosmos.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'दर्शनम्', iast: 'darśanam', meaning: 'A way of seeing / Direct perception' },
            { devanagari: 'योगश्चित्तवृत्तिनिरोधः', iast: 'yogaś-citta-vṛtti-nirodhaḥ', meaning: 'Yoga is the cessation of mind-fluctuations (Yoga Sūtra 1.2)' },
            { devanagari: 'अथातो ब्रह्मजिज्ञासा', iast: 'athāto brahma-jijñāsā', meaning: 'Now, therefore, the inquiry into ultimate reality (Brahma Sūtra 1.1.1)' }
          ],
          phoneticInstructions: 'Recite "Yogaś citta-vṛtti-nirodhaḥ" with calm, unwavering clarity. Notice the rhythmic pauses between words.',
          recitationTips: 'Observe how each philosophical tradition begins with an explicit declaration of inquiry (Jijñāsā).'
        },
        ruleMechanics: {
          title: 'The Six Orthodox Darśanas: Complete Comparative Matrix',
          tableData: {
            headers: ['Darśana (दर्शनम्)', 'Founding Sage', 'Core Focus & Method', 'Key Text', 'Modern Parallel'],
            rows: [
              ['न्याय (Nyāya)', 'ऋषि गौतम (Gautama)', 'Formal Logic & Epistemology (16 Pramāṇas)', 'Nyāya Sūtras', 'Mathematical Logic & Scientific Method'],
              ['वैशेषिक (Vaiśeṣika)', 'ऋषि कणाद (Kaṇāda)', 'Atomic Physics & 9 Primary Substances', 'Vaiśeṣika Sūtras', 'Particle Physics & Material Chemistry'],
              ['साङ्ख्य (Sāṅkhya)', 'ऋषि कपिल (Kapila)', '25 Tattvas (Puruṣa & Prakṛti Taxonomy)', 'Sāṅkhya Kārikā', 'Evolutionary Cosmology & Dual-Aspect Theory'],
              ['योग (Yoga)', 'ऋषि पतञ्जलि (Patañjali)', '8 Limbs of Psychophysical Stillness', 'Yoga Sūtras', 'Neuroscience, Mindfulness & Somatics'],
              ['मीमांसा (Mīmāṁsā)', 'ऋषि जैमिनि (Jaimini)', 'Linguistic Duty, Sound Vibrations & Dharma', 'Mīmāṁsā Sūtras', 'Hermeneutics, Semiotics & Acoustic Duty'],
              ['वेदान्त (Vedānta)', 'ऋषि बादरायण (Bādarāyaṇa)', 'Non-Dual Realization (Atman = Brahman)', 'Brahma Sūtras', 'Quantum Unified Field & Non-Dual Philosophy']
            ]
          },
          sutraReference: {
            devanagari: 'प्रमाण-प्रमेय-संशय-प्रयोजन-दृष्टान्त-सिद्धान्तावयव-तर्क-निर्णय-वाद-जल्प-वितण्डा-हेत्वाभास-च्छल-जाति-निग्रहस्थानानां तत्त्वज्ञानान्निःश्रेयसाधिगमः',
            iast: 'pramāṇa-prameya-saṁśaya-prayojana-dṛṣṭānta-siddhāntāvayava-tarka-nirṇaya-vāda-jalpa-vitaṇḍā-hetvābhāsa-cchala-jāti-nigrahasthānānāṁ tattvajñānān niḥśreyasādhigamaḥ (Nyāya Sūtra 1.1.1)',
            meaning: 'By direct knowledge of the 16 epistemological categories (means of valid knowledge, objects of inquiry, doubt, purpose, logic, and resolution), the supreme good (liberation) is attained.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-6-3',
            prompt: 'Which Darśana is famous for proposing that the universe is made of indivisible atoms (Paramāṇu) moving through empty space?',
            options: [
              'Yoga',
              'Vaiśeṣika (Sage Kaṇāda)',
              'Vedānta',
              'Mīmāṁsā'
            ],
            correctIndex: 1,
            explanation: 'Sage Kaṇāda’s Vaiśeṣika Darśana was the world’s earliest atomic theory of matter, detailing how atoms combine into dyads and triads.'
          },
          worksheetSummary: 'Worksheet 6.3: The 6 Darśanas Comparative Philosophy Matrix & Epistemology Guide.',
          worksheetDownloadId: 'ws-c6-3'
        },
        thinkingConnection: {
          type: 'integrated',
          badgeLabel: '🧠 Unified Cognitive Architecture',
          heading: 'The Progressive Staircase of Human Knowing',
          bridgeExplanation: 'The six Darśanas do not contradict; they complete each other. Nyāya sharpens your logic; Vaiśeṣika examines physical matter; Sāṅkhya maps the mind; Yoga quietens mental chatter; Mīmāṁsā aligns acoustic duty; and Vedānta reveals non-dual oneness.',
          modernInsight: 'This integrative epistemology prevents the narrow reductionism of modern hyper-specialization.'
        },
        linkedResources: [
          { label: '4-Part Comprehensive Darśana Course Addendum', targetView: 'course-addendum', badge: 'Addendum' },
          { label: 'Philosophy: From Śūnya to Ananta', targetView: 'philosophy', badge: 'Darśana' }
        ]
      },
      {
        id: 'c-6-4',
        lessonNumber: '6.4',
        titleDevanagari: 'महा-समन्वयः · पूर्ण-श्लोक-मीमांसा',
        titleEnglish: 'Capstone: Analyzing One Verse End-to-End',
        shortDescription: 'The grand synthesis: dissecting a sacred verse across sound, script, grammar, meaning, and meditation.',
        ideaConcept: {
          heading: 'The Grand Synthesis of Learning',
          summary: 'In this capstone lesson, you bring every single tool you have mastered together: acoustics (Śikṣā), script (Devanāgarī), morphology (Pāṇini), syntax (Anvaya), and contemplation (Darśana).',
          body: [
            'We analyze the immortal peace invocation from the Bṛhadāraṇyaka Upaniṣad:',
            'असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥ ॐ शान्तिः शान्तिः शान्तिः ॥'
          ],
          keyTakeaway: 'You are no longer an outsider looking at translations. You can now inhabit the Sanskrit sound-architecture directly.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'असतो मा सद्गमय ।', iast: 'asato mā sadgamaya |', meaning: 'From untruth / unreal, lead me to truth / reality.' },
            { devanagari: 'तमसो मा ज्योतिर्गमय ।', iast: 'tamaso mā jyotirgamaya |', meaning: 'From darkness / ignorance, lead me to luminous light.' },
            { devanagari: 'मृत्योर्माऽमृतं गमय ।', iast: "mṛtyormā'mṛtaṁ gamaya |", meaning: 'From mortality / limitation, lead me to immortality.' },
            { devanagari: 'ॐ शान्तिः शान्तिः शान्तिः ॥', iast: 'oṁ śāntiḥ śāntiḥ śāntiḥ ||', meaning: 'Peace within, peace around, peace transcendent.' }
          ],
          phoneticInstructions: 'Recite the full three-line invocation with absolute presence. Notice the visceral shift as your tongue transitions from "asataḥ" to "jyotiḥ" to "amṛtam".',
          recitationTips: 'Hold 1 minute of silent reflection after the final peace mantra.'
        },
        ruleMechanics: {
          title: 'The 5-Dimensional Capstone Decomposition Matrix',
          explanation: [
            '1. SOUND (ध्वनिः): Notice the balance of vowels and nasals. Visargas soften into "o" before voiced consonants (असतस् + मा = असतो मा).',
            '2. SCRIPT (लिपिः): Observe conjuncts: त्य (त्+य in मृत्योः), म्भो (म्+भ), र्ग (र्+ग in गमय).',
            '3. GRAMMAR (व्याकरणम्): "असतः", "तमसः", "मृत्योः" are all in Pañcamī Vibhakti (Ablative = source of departure!). The verb "गमय" is an imperative prayer (Loṭ-Lakāra causal: "cause to reach / lead").',
            '4. MEANING (अर्थः): The universal human yearning to transcend darkness, limitation, and falsehood.',
            '5. CONTEMPLATION (चिन्तनम्): The journey from outer noise to the unshakeable witness within.'
          ],
          tableData: {
            headers: ['Analytical Phase', 'Pedagogical Pillar', 'Investigation Question', 'Practical Execution on Capstone Verse'],
            rows: [
              ['Phase 1: ध्वनिः (Sound)', 'Acoustic / Śikṣā', 'Where are the sounds born?', 'Tracing Kaṇṭha, Tālu, and Oṣṭha phonemes; ensuring accurate mātrā timing.'],
              ['Phase 2: लिपिः (Script)', 'Orthography / Chhandas', 'How is the meter constructed?', 'Counting syllables per quarter; verifying metrical weights and conjunct ligatures.'],
              ['Phase 3: व्याकरणम् (Grammar)', 'Pāṇinian Morphology', 'What are the roots and cases?', 'Dissolving Sandhi (पदच्छेद), identifying roots (धातु), and extracting Kārakas (विभक्ति).'],
              ['Phase 4: वाक्यम् (Syntax)', 'Anvaya & Meaning', 'How do the words assemble?', 'Reordering the words into prose syntax (अन्वय) to reveal unambiguous meaning.'],
              ['Phase 5: चिन्तनम् (Contemplation)', 'Darśana & Integration', 'What duty does this demand?', 'Living participation: transforming information into personal adhikāra and peace.']
            ]
          },
          sutraReference: {
            devanagari: 'ऋतं च स्वाध्यायप्रवचने च । सत्यं च स्वाध्यायप्रवचने च । शमश्च स्वाध्यायप्रवचने च ॥',
            iast: 'ṛtaṁ ca svādhyāya-pravacane ca | satyaṁ ca svādhyāya-pravacane ca | śamaś ca svādhyāya-pravacane ca (Taittirīya Upaniṣad 1.9.1)',
            meaning: 'Order and study-teaching; truth and study-teaching; tranquility and study-teaching: all virtues must be coupled with dedicated study and transmission.'
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-6-4',
            prompt: 'In the Capstone verse "तमसो मा ज्योतिर्गमय", what is the grammatical function of "तमसः" (which becomes तमसो via Visarga Sandhi)?',
            options: [
              'Subject (The darkness is walking)',
              'Pañcamī Vibhakti (Ablative / source of separation: "from darkness")',
              'Dvitīyā Object (I see darkness)',
              'Instrument (Done with darkness)'
            ],
            correctIndex: 1,
            explanation: '"तमसः" is the Pañcamī (Ablative) singular form of the neuter noun तमस् (darkness), expressing movement away from darkness toward light.'
          },
          worksheetSummary: 'Worksheet 6.4 (Capstone Master Sheet): Complete End-to-End Syntactic, Acoustic & Philosophical Analysis Template + Certificate of Completion.',
          worksheetDownloadId: 'ws-c6-4'
        },
        thinkingConnection: {
          type: 'integrated',
          badgeLabel: '🧠 The Integrated Mind',
          heading: 'The Living Synthesis of Science and Spirit',
          bridgeExplanation: 'Sanskrit proves that precision does not kill poetry, and algorithms do not destroy the sacred. The same mental apparatus that calculates Vedic mathematics and parses Pāṇinian sūtras is the instrument that sits in silent witness contemplation.',
          modernInsight: 'In an age dominated by artificial intelligence and automated generation, Sanskrit remains the timeless human instrument for binding breath, intention, and conscious realization.'
        },
        linkedResources: [
          { label: 'Full Course Certificate & Answer Key Desk', targetView: 'worksheets', badge: 'Certificate' },
          { label: 'Philosophy: Guru-Paramparā & Living Lineage', targetView: 'philosophy', badge: 'Paramparā' }
        ]
      }
    ]
  }
];
