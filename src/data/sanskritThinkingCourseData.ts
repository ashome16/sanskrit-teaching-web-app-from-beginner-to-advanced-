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
  targetView: 'reader' | 'varnamala' | 'grammar' | 'dhatupatha' | 'vedic-maths' | 'philosophy' | 'worksheets' | 'quiz' | 'board' | 'home' | 'cbse-guide';
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
      'Learn how Devanāgarī functions not as an alphabet, but as an abugida where pure consonants, vowel modifiers (mātrās), and interlocking conjuncts visually represent vocal tract dynamics.',
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
            'Devanāgarī is written under a top horizontal hanging line called the Śirorekhā (शिरोरेखा).',
            'We use IAST (International Alphabet of Sanskrit Transliteration) as training wheels with macrons (ā) and underdots (ṭ, ḍ, ṣ) so your tongue stays accurate while reading Latin letters.'
          ],
          keyTakeaway: 'Devanāgarī is a visual spectrogram of sound. You never have to ask "how do you spell this word?"'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'ज्ञानम्', iast: 'jñānam', meaning: 'Knowledge / Cognition' },
            { devanagari: 'सत्यम्', iast: 'satyam', meaning: 'Truth / Unbroken reality' },
            { devanagari: 'धर्मः', iast: 'dharmaḥ', meaning: 'Righteous cosmic order' }
          ],
          phoneticInstructions: 'Pronounce each letter while observing the IAST diacritic: a dot under ṭ or ḍ means curl the tongue up; a bar above ā or ī means double the duration.',
          recitationTips: 'Never skip the top line (Śirorekhā) when handwriting Devanāgarī — it unifies the syllable.'
        },
        ruleMechanics: {
          title: 'The Inherent Vowel Principle',
          explanation: [
            'Every bare consonant glyph in Devanāgarī contains an inherent "a" vowel.',
            'To strip away the vowel and leave only pure consonant silence, add a diagonal slash underneath called a Halanta (ह्लन्त / ्).'
          ],
          formula: 'क् (Pure silent K) + अ (Inherent breath) = क (Audible Ka)'
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
            'Barakhadi (बारहखड़ी) is the complete 12+ vowel scale practiced for every single consonant from क to ह.'
          ],
          keyTakeaway: 'Mastering the 13 Mātrā attachments unlocks instant reading fluency for thousands of words.'
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
          title: 'The Mātrā Modifier Inventory',
          explanation: [
            'का (ा) = +ā, कि (ि) = +i, की (ी) = +ī, कु (ु) = +u, कू (ू) = +ū',
            'कृ (ृ) = +ṛ, के (े) = +e, कै (ै) = +ai, को (ो) = +o, कौ (ौ) = +au',
            'कं (ं) = +ṁ (Anusvāra), कः (ः) = +ḥ (Visarga)'
          ],
          tableData: {
            headers: ['Consonant', 'Vowel', 'Mātrā Sign', 'Result', 'Example Word'],
            rows: [
              ['क्', 'आ', 'ा', 'का', 'कालः (Time)'],
              ['क्', 'इ', 'ि', 'कि', 'किम् (What)'],
              ['क्', 'ई', 'ी', 'की', 'कीर्तिः (Glory)'],
              ['क्', 'उ', 'ु', 'कु', 'कुशलः (Skilled)'],
              ['क्', 'ऋ', 'ृ', 'कृ', 'कृष्णः (Krishna)']
            ]
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
            'Major irregular ligatures: क् + ष = क्ष (kṣa), त् + र = त्र (tra), ज् + ञ = ज्ञ (jña), श् + र = श्र (śra).'
          ],
          keyTakeaway: 'Conjuncts are not confusing puzzles; they are visual representations of physical acoustic speed.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'विद्या', iast: 'vidyā', meaning: 'द् + य = द्य (Wisdom)' },
            { devanagari: 'ज्ञानम्', iast: 'jñānam', meaning: 'ज् + ञ = ज्ञ (Gnosis / Knowledge)' },
            { devanagari: 'ईश्वरः', iast: 'īśvaraḥ', meaning: 'श् + व = श्व (Supreme Ruler)' },
            { devanagari: 'मित्रम्', iast: 'mitram', meaning: 'त् + र = त्र (Friend)' }
          ],
          phoneticInstructions: 'Pronounce "द्" and "य" without inserting a tiny "uh" sound between them. Let your tongue immediately touch the palate for "y" before releasing "d"!',
          recitationTips: 'Keep conjunct consonants crisp and percussive.'
        },
        ruleMechanics: {
          title: 'The Rules of Conjunct Formation',
          explanation: [
            'Rule 1 (Stem Drop): Consonants with vertical stems (like त, प, स) drop their stem: त् + व = त्व.',
            'Rule 2 (Repha र्): When र् comes first, it flies above the next letter like a sickle (सूर्य = सू + र् + य).',
            'Rule 3 (Rā-Kāra): When र comes second, it sits as a slash under the first letter (प्रकाश = प् + र + का + श).'
          ]
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
            'Listen to Bodhi speak the word, then pause and repeat aloud with your full chest voice.'
          ],
          keyTakeaway: 'Meeting speech with the mouth is how sound transforms from digital data into living realization.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'नमस्ते', iast: 'Namaste', meaning: 'Salutations to the divine in you' },
            { devanagari: 'सुप्रभातम्', iast: 'Suprabhātam', meaning: 'Good morning / Auspicious dawn' },
            { devanagari: 'शान्तिः', iast: 'Śāntiḥ', meaning: 'Unshakeable peace' },
            { devanagari: 'आनन्दः', iast: 'Ānandaḥ', meaning: 'Boundless spiritual joy' }
          ],
          phoneticInstructions: 'Pronounce each word in clear syllables: Na-ma-ste; Su-pra-bhā-tam; Śān-tiḥ; Ā-nan-daḥ.',
          recitationTips: 'Hold your spine upright and relax your jaw so the sound resonates without strain.'
        },
        ruleMechanics: {
          title: 'Syllabic Parsing (Varṇa-Viccheda)',
          explanation: [
            'To read any long Sanskrit word effortlessly, break it down into its constituent phonemes (वर्ण-विच्छेद):',
            'नमस्ते = न् + अ + म् + अ + स् + त् + ए'
          ]
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
            'Maharṣi Pāṇini cataloged approximately 2,000 verbal roots (धातवः).',
            'By attaching prefixes (उपसर्ग) and suffixes (प्रत्यय), a single root spawns hundreds of nouns, verbs, adjectives, and adverbs.',
            'Example: From √कृ (to do) grows karma, kartā, karaṇa, kārya, and saṁskāra!'
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
            headers: ['Puruṣa (Person)', 'Ekavacanam (1)', 'Dvivacanam (2)', 'Bahuvacanam (3+)'],
            rows: [
              ['प्रथमः (Third)', 'पठति', 'पठतः', 'पठन्ति'],
              ['मध्यमः (Second)', 'पठसि', 'पठथः', 'पठथ'],
              ['उत्तमः (First)', 'पठामि', 'पठावः', 'पठामः']
            ]
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
            'Nature is full of pairs: two eyes, two hands, day and night, sun and moon, teacher and student (गुरु-शिष्यौ).'
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
          title: 'Adjective-Noun Agreement (Viśeṣaṇa-Viśeṣya)',
          explanation: [
            'An adjective must match its noun in Gender, Number, and Case:',
            'सुन्दरः बालकः (Handsome boy - M)',
            'सुन्दरा बालिका (Beautiful girl - F)',
            'सुन्दरम् पुस्तकम् (Beautiful book - N)'
          ]
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
        titleEnglish: 'The Vibhaktis as a Sentence\'s "Roles" (Kārakas)',
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
            'Vyañjana Sandhi (Consonants): सत् + चित् = सच्चित्.',
            'Visarga Sandhi: रामः + अवदत् = रामोऽवदत्.'
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
          title: 'The Core Vowel Sandhi Formulas',
          explanation: [
            '1. Dīrgha (अकः सवर्णे दीर्घः): Similar vowels merge into long: a+a=ā, i+i=ī, u+u=ū',
            '2. Guṇa (आद्गुणः): a + i/ī = e; a + u/ū = o; a + ṛ = ar',
            '3. Vṛddhi (वृद्धिरेचि): a + e/ai = ai; a + o/au = au',
            '4. Yaṇ (इको यणचि): i + vowel = y; u + vowel = v; ṛ + vowel = r'
          ]
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
          worksheetSummary: 'Worksheet 3.5: Sandhi Joining & Splitting (Padaccheda) Master Drills.',
          worksheetDownloadId: 'ws-c3-5'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 Advaita & Interconnection',
          heading: 'Dissolving the Illusion of Separation',
          bridgeExplanation: 'In Advaita philosophy, boundaries between the individual (jīva) and the universal (brahman) dissolve upon closer examination. Sandhi embodies this acoustically: two seemingly distinct words lose their separate boundaries and flow as one seamless stream of unbroken breath.',
          modernInsight: 'Contemplating Sandhi trains the student to perceive continuity and interbeing rather than isolated, disconnected fragments.'
        },
        linkedResources: [
          { label: 'Sandhi Rules Shelf in Grammar', targetView: 'grammar', param: 'topic:sandhi', badge: 'Formulas' },
          { label: 'Deepakam Chapter Word-by-Word Sandhi Split', targetView: 'reader', badge: 'Tool' }
        ]
      },
      {
        id: 'c-3-6',
        lessonNumber: '3.6',
        titleDevanagari: 'समासाः · अर्थ-संक्षेपः',
        titleEnglish: 'Compounds (Samāsas): Packing Meaning Tightly',
        shortDescription: 'Merging multiple words into a single high-density concept without losing grammatical precision.',
        ideaConcept: {
          heading: 'Semantic Compression through Compounding',
          summary: 'In English, you say "The minister who serves the prime president of the republic". In Sanskrit, you can fold this entire phrase into a single modular compound (समासः).',
          body: [
            'Tatpuruṣa: Dependent compound (राजपुरुषः = The King’s man).',
            'Dvandva: Pair compound joined by "and" (रामलक्ष्मणौ = Rama and Lakshmana).',
            'Bahuvrīhi: External reference compound (पीताम्बरः = He who wears yellow robes, i.e. Krishna!).'
          ],
          keyTakeaway: 'Compounds turn phrases into compact concepts, packing high bandwidth into tiny space.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'राजपुरुषः', iast: 'Rājapuruṣaḥ', meaning: 'राज्ञः पुरुषः (King’s officer - Tatpuruṣa)' },
            { devanagari: 'रामलक्ष्मणौ', iast: 'Rāma-Lakṣmaṇau', meaning: 'रामश्च लक्ष्मणश्च (Rama and Lakshmana - Dvandva)' },
            { devanagari: 'पीताम्बरः', iast: 'Pītāmbaraḥ', meaning: 'पीतं अम्बरं यस्य सः (Wearing yellow robes - Bahuvrīhi)' }
          ],
          phoneticInstructions: 'Pronounce the compound as a single breath unit with one unified accent (स्वर).',
          recitationTips: 'Notice how all intermediate case endings drop out (सुपो धातुप्रातिपदिकयोः) until the final word!'
        },
        ruleMechanics: {
          title: 'The 4 Major Samāsa Families',
          explanation: [
            '1. Avyayībhāva (अव्ययीभावः): First word dominant, becomes an indeclinable adverb (यथाशक्ति).',
            '2. Tatpuruṣa (तत्पुरुषः): Second word dominant; includes Karmadhāraya & Dvigu.',
            '3. Bahuvrīhi (बहुव्रीहिः): Neither word dominant; refers to an outside third entity.',
            '4. Dvandva (द्वन्द्वः): Both words equally dominant, linked by "and" (च).'
          ]
        },
        practice: {
          quickQuiz: {
            id: 'q-3-6',
            prompt: 'In the compound "रामलक्ष्मणौ", why does the ending have the dual "-au"?',
            options: [
              'Because it is feminine',
              'Because it is a Dvandva compound joining two persons (Rama AND Lakshmana)',
              'Because it is an accident',
              'Because it is past tense'
            ],
            correctIndex: 1,
            explanation: 'Dvandva compounds combine multiple entities: two entities take the Dual ending (द्विवचन: -au).'
          },
          worksheetSummary: 'Worksheet 3.6: Samāsa Deconstruction (विग्रह-वाक्यम्) & Classification Practice.',
          worksheetDownloadId: 'ws-c3-6'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Functional Composition & Data Packing',
          heading: 'High-Density Conceptual Chunking',
          bridgeExplanation: 'Cognitive science shows that working memory holds roughly 4 to 7 "chunks" of information. By compounding complex relations into a single linguistic token, Sanskrit allows philosophers and scientists to hold vastly more complex abstractions simultaneously in active memory.',
          modernInsight: 'This parallels object composition and function chaining in modern programming languages.'
        },
        linkedResources: [
          { label: 'Grammar Samāsa Guide', targetView: 'grammar', param: 'topic:samasa', badge: 'Articles' },
          { label: 'Neologism Technology Riddles', targetView: 'home', badge: 'Interactive' }
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
          title: 'The Kartā-Kriyā Agreement Rule',
          explanation: [
            'Singular Subject takes Singular Verb: बालकः गच्छति',
            'Dual Subject takes Dual Verb: बालकौ गच्छतः',
            'Plural Subject takes Plural Verb: बालकाः गच्छन्ति'
          ]
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
          title: 'The Ktva (क्त्वा) & Lyap (ल्यप्) Gerund Participles',
          explanation: [
            'Expresses "having done" an action before the main verb:',
            'गम् + क्त्वा = गत्वा (having gone: गृहं गत्वा भोजनं करोति)',
            'दृश् + क्त्वा = दृष्ट्वा (having seen)',
            'With prefix, use Lyap: आ + गम् + ल्यप् = आगत्य (having arrived)'
          ]
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
            { devanagari: 'विद्या ददाति विनयं विनयाद्याति पात्रताम् ।', iast: 'vidyā dadāti vinayaṁ vinayādyāti pātratām |', meaning: 'Knowledge bestows humility; from humility comes worthiness.' },
            { devanagari: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः ।', iast: 'udyamena hi sidhyanti kāryāṇi na manorathaiḥ |', meaning: 'Tasks are accomplished by diligent effort, not mere daydreaming.' }
          ],
          phoneticInstructions: 'Chant with the classic 8-beat rhythm: Vid-yā da-dā-ti vi-na-yaṁ (pause) vi-na-yād yā-ti pā-tra-tām.',
          recitationTips: 'Breathe in at the hemistich pause (midline).'
        },
        ruleMechanics: {
          title: 'The Anatomy of a Subhāṣita',
          explanation: [
            'Line 1 presents the universal premise or natural law.',
            'Line 2 delivers the striking metaphor or life-changing conclusion.'
          ]
        },
        practice: {
          quickQuiz: {
            id: 'q-4-3',
            prompt: 'According to the famous Subhāṣita, what is the very first gift that true knowledge (विद्या) bestows upon a student?',
            options: [
              'Arrogance (गर्वः)',
              'Humility (विनयम्)',
              'Money (धनम्)',
              'Fame (कीर्तिः)'
            ],
            correctIndex: 1,
            explanation: '"विद्या ददाति विनयं" — True learning bestows humility, not pride.'
          },
          worksheetSummary: 'Worksheet 4.3: 10 Essential Subhāṣitas Recitation, Meaning & Grammar Breakdown.',
          worksheetDownloadId: 'ws-c4-3'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 Contemplative Reflection',
          heading: 'Sustained Contemplation on Universal Truth',
          bridgeExplanation: 'Subhāṣitas are designed for Manana (deep intellectual chewing). Repeating a verse mentally during a quiet walk uncovers deeper layers of meaning that a fast, superficial reading completely misses.',
          modernInsight: 'This mirrors stoic journaling and cognitive reframing techniques used in modern psychological resilience training.'
        },
        linkedResources: [
          { label: 'Bodhi Mascot Subhāṣitas Library', targetView: 'home', badge: 'Audio Recitations' },
          { label: 'Deepakam Chapter 3 Subhāṣitas', targetView: 'reader', param: 'gsde103', badge: 'Reader' }
        ]
      },
      {
        id: 'c-4-4',
        lessonNumber: '4.4',
        titleDevanagari: 'अनुष्टुप्-छन्दः एवं पाठ-पद्धतिः',
        titleEnglish: 'Reading and Reciting an Anuṣṭubh Verse',
        shortDescription: 'The universal 32-syllable meter of the Rāmāyaṇa, Mahābhārata, and Bhagavad Gītā.',
        ideaConcept: {
          heading: 'The River-Flow of 32 Beats',
          summary: 'The Anuṣṭubh meter (अनुष्टुप्-छन्दः) is the most famous poetic vehicle in Indian civilization. When Maharṣi Vālmīki witnessed the mourning bird, grief (Śoka) spontaneously overflowed as the world’s first Śloka in Anuṣṭubh meter!',
          body: [
            'Structure: 4 quarters (पादाः) of exactly 8 syllables each (8 × 4 = 32 syllables).',
            'Golden Rule: 5th syllable is short (ह्रस्व) everywhere; 6th syllable is long (दीर्घ) everywhere!'
          ],
          keyTakeaway: 'Mastering the 8-syllable quarter lets you chant thousands of verses from the Gītā effortlessly.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'श्लोके षष्ठं गुरु ज्ञेयं सर्वत्र लघु पञ्चमम् ।', iast: 'śloke ṣaṣṭhaṁ guru jñeyaṁ sarvatra laghu pañcamam |', meaning: 'In an anuṣṭubh verse, the 6th syllable is heavy (long), and the 5th is light (short).' },
            { devanagari: 'द्विचतुष्पादयोर्ह्रस्वं सप्तमं द्वितयोः परम् ॥', iast: 'dvicatuṣpādayorhrasvaṁ saptamaṁ dvitayoḥ param ||', meaning: 'The 7th syllable is short in quarters 2 and 4, and long elsewhere.' }
          ],
          phoneticInstructions: 'Tap your fingers in two sets of 4 beats: 1-2-3-4 / 5-6-7-8. Notice how natural and hypnotic the 8-beat rhythm feels to your nervous system.',
          recitationTips: 'Keep the 5th syllable short and the 6th syllable long to create the classic poetic lilt.'
        },
        ruleMechanics: {
          title: 'The Mathematical Formula of Anuṣṭubh',
          explanation: [
            '4 Pādas (Quarters) × 8 Akṣaras (Syllables) = 32 Total Syllables',
            'Position 5 = Always Laghu (Light / Short)',
            'Position 6 = Always Guru (Heavy / Long)',
            'Position 7 = Laghu in Quarters 2 & 4'
          ]
        },
        practice: {
          quickQuiz: {
            id: 'q-4-4',
            prompt: 'How many syllables (अक्षराणि) are in one complete Anuṣṭubh (अनुष्टुप्) śloka?',
            options: [
              '16 syllables',
              '32 syllables (4 quarters of 8 syllables each)',
              '100 syllables',
              '64 syllables'
            ],
            correctIndex: 1,
            explanation: 'The Anuṣṭubh meter contains 32 syllables arranged in four 8-syllable quarters (8 × 4 = 32).'
          },
          worksheetSummary: 'Worksheet 4.4: Anuṣṭubh Syllable Scanning (Laghu-Guru Marking) & Recitation Drill.',
          worksheetDownloadId: 'ws-c4-4'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Binary Math & Combinatorics',
          heading: 'Piṅgala’s Chandaḥśāstra and Binary Arithmetic',
          bridgeExplanation: 'To catalog poetic meters, the ancient mathematician Piṅgala (3rd century BCE) used two binary symbols: Laghu (0) and Guru (1). In doing so, he discovered the binary number system, binomial coefficients, Pascal’s Triangle (मेरु-प्रस्तार), and the Fibonacci numbers centuries before Europe.',
          modernInsight: 'Sanskrit poetry is literally written in binary code.'
        },
        linkedResources: [
          { label: 'Vedic Mathematics Studio', targetView: 'vedic-maths', badge: 'Math' },
          { label: 'Philosophy Essay: Sound Bound to Breath', targetView: 'philosophy', badge: 'Essay' }
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
    tagline: 'Algorithmic grammar, mental math sutras, and alphanumeric cryptography',
    themeColor: '#7c3aed',
    icon: '🔬',
    overview:
      'Uncover the scientific genius of Sanskrit: Pāṇini’s 4,000 algorithmic sūtras as the world’s first virtual machine, 16 Vedic Mathematics mental arithmetic sutras, the Kaṭapayādi cryptographic number cipher, and Sanskrit’s enduring presence in modern science.',
    lessons: [
      {
        id: 'c-5-1',
        lessonNumber: '5.1',
        titleDevanagari: 'अष्टाध्यायी · जगत्-प्रथम-सङ्गणक-सूत्रम्',
        titleEnglish: 'Pāṇini\'s Grammar as an Algorithm',
        shortDescription: '4,000 sūtras functioning as an axiomatic, generative virtual machine 2,500 years before Turing.',
        ideaConcept: {
          heading: 'The World’s First Generative Virtual Machine',
          summary: 'In the 5th century BCE, Maharṣi Pāṇini created the Aṣṭādhyāyī — 4,000 short sūtras that can generate every grammatically correct Sanskrit sentence that has ever been or will ever be spoken.',
          body: [
            'It contains an auxiliary metalanguage, conditional branching (if-then statements), scope inheritance, and an execution stack.',
            'Eminent linguist Leonard Bloomfield called it "one of the greatest monuments of human intelligence."'
          ],
          keyTakeaway: 'Pāṇini did not describe a language; he programmed a generative compiler for human speech.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'वृद्धिरादैच्', iast: 'vṛddhirādaic (1.1.1)', meaning: 'The first sūtra: definition of Vṛddhi vowels (ā, ai, au)' },
            { devanagari: 'इको यणचि', iast: 'iko yaṇaci (6.1.77)', meaning: 'The famous Sandhi rule of semivowel substitution' },
            { devanagari: 'विप्रतिषेधे परं कार्यम्', iast: 'vipratiṣedhe paraṁ kāryam (1.4.2)', meaning: 'Conflict resolution rule: the later rule overrides the former' }
          ],
          phoneticInstructions: 'Chant "vṛd-dhir-ā-daic" — notice how terse and compressed it is. A single word holds a comprehensive mathematical definition!',
          recitationTips: 'Ancient grammarians rejoiced over saving even half a mora (duration) in a sūtra as if celebrating the birth of a son!'
        },
        ruleMechanics: {
          title: 'The Pāṇinian Rule Hierarchy',
          explanation: [
            '1. Saṁjñā (संज्ञा): Definitions and variable declarations.',
            '2. Paribhāṣā (परिभाषा): Meta-rules for interpreting conflicting operations.',
            '3. Vidhi (विधि): Operational algorithms (transformation rules).',
            '4. Adhikāra (अधिकार): Scope blocks that stay active across subsequent sūtras.'
          ]
        },
        practice: {
          quickQuiz: {
            id: 'q-5-1',
            prompt: 'In Pāṇini’s Aṣṭādhyāyī, when two rules of equal strength conflict, which rule takes precedence under Sūtra 1.4.2?',
            options: [
              'The shorter rule',
              'The later rule in sūtra order (विप्रतिषेधे परं कार्यम्)',
              'Neither rule applies',
              'The rule with more consonants'
            ],
            correctIndex: 1,
            explanation: 'Under Pāṇini 1.4.2 (विप्रतिषेधे परं कार्यम्), the later rule in sequential order wins in cases of mutual conflict.'
          },
          worksheetSummary: 'Worksheet 5.1: Algorithmic Word Derivation Step-by-Step with Pāṇinian Sūtras.',
          worksheetDownloadId: 'ws-c5-1'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Theoretical Computer Science',
          heading: 'Turing Completeness and Context-Free Grammars',
          bridgeExplanation: 'When computer scientists in the 1950s (Noam Chomsky, John Backus) sought a formal grammar to specify programming languages, they realized Pāṇini had solved the problem 2,500 years earlier. Pāṇini’s grammar is recognized as a formal generative grammar capable of Turing-complete derivation.',
          modernInsight: 'Studying Pāṇini trains your brain in recursive algorithmic thinking better than almost any modern computer science textbook.'
        },
        linkedResources: [
          { label: 'Pāṇinian Dhātupāṭha Studio', targetView: 'dhatupatha', badge: 'Interactive Engine' },
          { label: 'Philosophy Essay: Why Learn Sanskrit in AI Age', targetView: 'philosophy', badge: 'Essay' }
        ]
      },
      {
        id: 'c-5-2',
        lessonNumber: '5.2',
        titleDevanagari: 'वैदिक-गणित-सूत्राणि · मानसिक-गणना',
        titleEnglish: 'Vedic Maths Sutras: Fast Mental Computing',
        shortDescription: '16 mental aphorisms turning tedious arithmetic into visual, pattern-based mental joy.',
        ideaConcept: {
          heading: 'Mental Arithmetic Through Spatial Patterns',
          summary: 'In modern school math, you carry numbers mechanically from right to left. Vedic Mathematics uses 16 concise Sanskrit sūtras that calculate visually, symmetrically, and instantly in your head.',
          body: [
            'Sūtra 1: "एकाधिकेन पूर्वेण" (By one more than the previous) — square numbers ending in 5 in 2 seconds!',
            'Sūtra 2: "निखिलं नवतश्चरमं दशतः" (All from 9 and the last from 10) — lightning multiplication near powers of 10.'
          ],
          keyTakeaway: 'Math in ancient India was not cold drudgery; it was playful mental gymnastics that balanced both brain hemispheres.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'एकाधिकेन पूर्वेण', iast: 'Ekādhikena Pūrveṇa', meaning: 'By one more than the previous' },
            { devanagari: 'निखिलं नवतश्चरमं दशतः', iast: 'Nikhilam Navataścaramam Daśataḥ', meaning: 'All from 9 and last from 10' },
            { devanagari: 'ऊर्ध्वतिर्यग्भ्याम्', iast: 'Ūrdhva-Tiryagbhyām', meaning: 'Vertically and crosswise (general multiplication)' }
          ],
          phoneticInstructions: 'Recite "E-kā-dhi-ke-na Pūr-ve-ṇa" with steady rhythmic cadence.',
          recitationTips: 'Say the sūtra mentally before calculating — the formula immediately triggers the mental pattern.'
        },
        ruleMechanics: {
          title: 'The Ekādhikena Pūrveṇa Squaring Formula',
          formula: '(Tens Digit) × (Tens Digit + 1)  |  Append 25',
          explanation: [
            'Example: Calculate 75²',
            'Step 1: Tens digit is 7. One more than 7 is 8.',
            'Step 2: 7 × 8 = 56.',
            'Step 3: Append 25 → 5625! Done in 2 seconds.'
          ]
        },
        practice: {
          quickQuiz: {
            id: 'q-5-2',
            prompt: 'Using the Vedic Math sūtra "एकाधिकेन पूर्वेण", what is 95²?',
            options: [
              '8525',
              '9025 (9 × 10 = 90, append 25)',
              '9525',
              '9925'
            ],
            correctIndex: 1,
            explanation: '9 × (9 + 1) = 9 × 10 = 90, append 25 = 9025.'
          },
          worksheetSummary: 'Worksheet 5.2: 16 Vedic Mathematics Speed Sutras & Calculation Drill Sheet.',
          worksheetDownloadId: 'ws-c5-2'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Algorithmic Efficiency & Heuristics',
          heading: 'Heuristic Optimization and Algorithmic Complexity',
          bridgeExplanation: 'Standard multiplication requires O(N²) operations. Vedic Math sūtras like Ūrdhva-Tiryagbhyām (vertically and crosswise) parallelize multiplications into independent systolic arrays, reducing step complexity.',
          modernInsight: 'Vedic Math algorithms are widely used today by electrical engineers designing high-speed DSP (Digital Signal Processing) chips and VLSI multipliers.'
        },
        linkedResources: [
          { label: 'Vedic Maths Studio (Interactive Calculators)', targetView: 'vedic-maths', badge: 'Interactive' },
          { label: '16 Sutras Verified Poster v3', targetView: 'vedic-maths', badge: 'Poster' }
        ]
      },
      {
        id: 'c-5-3',
        lessonNumber: '5.3',
        titleDevanagari: 'कटपयादि-संख्या-पद्धतिः · गूढ-सङ्ख्या',
        titleEnglish: 'Kaṭapayādi: Numbers Encoded as Words',
        shortDescription: 'The world’s first alphanumeric cryptographic hash — encrypting numbers into poetic verses.',
        ideaConcept: {
          heading: 'Hiding Numbers in Sacred Verses',
          summary: 'How did ancient astronomers and mathematicians remember numbers with 30 decimal digits without writing on paper? They created Kaṭapayādi: a code where every consonant represents a digit from 0 to 9.',
          body: [
            'A mathematician could write a beautiful devotional hymn to Krishna that was simultaneously an exact mathematical table of astronomical sines or Pi (π)!',
            'Rule: "अङ्कानां वामतो गतिः" (Numbers are read in reverse: from right to left).'
          ],
          keyTakeaway: 'Kaṭapayādi bridges the creative right brain and analytical left brain in a single stroke.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'कादि नव', iast: 'kādi nava', meaning: 'k to jh = digits 1 to 9' },
            { devanagari: 'टादि नव', iast: 'ṭādi nava', meaning: 'ṭ to dh = digits 1 to 9' },
            { devanagari: 'पादि पञ्च', iast: 'pādi pañca', meaning: 'p to m = digits 1 to 5' },
            { devanagari: 'याद्यष्टौ', iast: 'yādyaṣṭau', meaning: 'y to h = digits 1 to 8' },
            { devanagari: 'क्षः शून्यम्', iast: 'kṣaḥ śūnyam', meaning: 'kṣ = zero (0)' }
          ],
          phoneticInstructions: 'Chant the cryptographic key: "kādi nava, ṭādi nava, pādi pañca, yādyaṣṭau, kṣaḥ śūnyam".',
          recitationTips: 'Remember that standalone vowels have zero numerical value; only consonants count!'
        },
        ruleMechanics: {
          title: 'The Kaṭapayādi Decryption Grid',
          tableData: {
            headers: ['Digit', 'Group 1 (कादि)', 'Group 2 (टादि)', 'Group 3 (पादि)', 'Group 4 (यादि)'],
            rows: [
              ['1', 'क', 'ट', 'प', 'य'],
              ['2', 'ख', 'ठ', 'फ', 'र'],
              ['3', 'ग', 'ड', 'ब', 'ल'],
              ['4', 'घ', 'ढ', 'भ', 'व'],
              ['5', 'ङ', 'ण', 'म', 'श'],
              ['6', 'च', 'त', '—', 'ष'],
              ['7', 'छ', 'थ', '—', 'स'],
              ['8', 'ज', 'द', '—', 'ह'],
              ['9', 'झ', 'ध', '—', '—'],
              ['0', 'ञ', 'न', '—', 'क्ष']
            ]
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-5-3',
            prompt: 'In the Kaṭapayādi cryptographic system, which rule dictates how the decoded digits are arranged?',
            options: [
              'Top to bottom',
              'अङ्कानां वामतो गतिः (Numbers proceed from right to left / in reverse)',
              'Randomly',
              'Only forwards'
            ],
            correctIndex: 1,
            explanation: 'The fundamental rule "अङ्कानां वामतो गतिः" states that numbers are read from right to left (the first consonant decoded is the units digit).'
          },
          worksheetSummary: 'Worksheet 5.3: Kaṭapayādi Cryptographic Decryption & Pi (π) Verse Decoding Sheet.',
          worksheetDownloadId: 'ws-c5-3'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Cryptography & Steganography',
          heading: 'Alphanumeric Hashing and Information Steganography',
          bridgeExplanation: 'Steganography is the art of hiding secret data inside an innocuous medium (like hiding a watermark in an image). Kaṭapayādi is the earliest known linguistic steganography: high-precision mathematical data hidden inside elegant devotional poetry.',
          modernInsight: 'This allowed ancient Indian scientific tables to survive unbroken through oral memory across wars and book-burnings.'
        },
        linkedResources: [
          { label: 'Philosophy Essay: Śūnyāt Anantam', targetView: 'philosophy', badge: 'History of Math' },
          { label: 'Vedic Maths Studio', targetView: 'vedic-maths', badge: 'Calculators' }
        ]
      },
      {
        id: 'c-5-4',
        lessonNumber: '5.4',
        titleDevanagari: 'विज्ञान-तन्त्रज्ञाने संस्कृत-पदानि',
        titleEnglish: 'Sanskrit Words in Science, Technology & English',
        shortDescription: 'Cognates across languages and Pāṇinian neologisms for modern space and AI technologies.',
        ideaConcept: {
          heading: 'The Global Echo of Sanskrit',
          summary: 'Did you know that English words like Mother (माता), Brother (भ्राता), Name (नाम), Ignite (अग्नि), and Geometry (ज्यामिति) share direct genetic roots with Sanskrit? More importantly, Sanskrit can engineer precise words for modern technologies without borrowing.',
          body: [
            'Ancient Sanskrit gave humanity zero (शून्य) which became Cipher and Zero in Europe via Arabic sifr.',
            'Today, Pāṇinian grammar allows scientists to engineer pure modern terms: Artificial Intelligence = कृत्रिमन्त्रम्, Internet = अन्तर्जालम्, Blockchain = खण्डशृङ्खला.'
          ],
          keyTakeaway: 'Sanskrit is not a dead language of the past; it is a living forge for future concepts.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'कृत्रिमन्त्रम्', iast: 'Kṛtrimantram', meaning: 'Artificial Intelligence (Engineered tool of thought)' },
            { devanagari: 'अन्तर्जालम्', iast: 'Antarjālam', meaning: 'The Internet (Interconnected inner web)' },
            { devanagari: 'खण्डशृङ्खला', iast: 'Khaṇḍaśṛṅkhalā', meaning: 'Blockchain (Interlocked chain of ledger blocks)' },
            { devanagari: 'सङ्गणकम्', iast: 'Saṅgaṇakam', meaning: 'Computer (Machine that computes harmoniously)' }
          ],
          phoneticInstructions: 'Recite each neologism and trace its roots: कृत्रिम (man-made) + मन्त्रम् (tool of thinking).',
          recitationTips: 'Notice how much more natural and concise "कृत्रिमन्त्रम्" is compared to clumsy multi-word translations!'
        },
        ruleMechanics: {
          title: 'The Neologism Engineering Blueprint',
          explanation: [
            '1. Identify the essential action or function (e.g. to compute = √गण्).',
            '2. Add appropriate noun suffix: ल्युट् (-ana) → गणनम् (computing).',
            '3. Add prefix for excellence/harmony: सम् + गणनम् → सङ्गणकम् (Computer)!'
          ]
        },
        practice: {
          quickQuiz: {
            id: 'q-5-4',
            prompt: 'What modern technological concept is engineered in Sanskrit by the word "खण्डशृङ्खला" (Khaṇḍaśṛṅkhalā)?',
            options: [
              'Satellite Television',
              'Blockchain / Distributed Ledger (Chain of discrete data blocks)',
              'Electric Car',
              'Optical Fiber'
            ],
            correctIndex: 1,
            explanation: '"खण्ड" (discrete block) + "शृङ्खला" (interlocked unbroken chain) = Blockchain!'
          },
          worksheetSummary: 'Worksheet 5.4: Indo-European Cognates & Neologism Word Forge Exercise.',
          worksheetDownloadId: 'ws-c5-4'
        },
        thinkingConnection: {
          type: 'scientific',
          badgeLabel: '🔬 Comparative Linguistics & Terminology',
          heading: 'Morphological Self-Sufficiency',
          bridgeExplanation: 'Unlike languages that borrow foreign loanwords when new inventions appear (e.g., Hindi borrowing "computer" or "mobile"), Sanskrit derives new words strictly from its internal root system (Dhātus). This ensures that modern terminology remains fully transparent to anyone who knows the roots.',
          modernInsight: 'This architectural self-sufficiency makes Sanskrit a uniquely resilient linguistic operating system.'
        },
        linkedResources: [
          { label: 'Bodhi Neologism Riddles Game', targetView: 'home', badge: 'Game' },
          { label: 'Grammar Article 12: Sanskrit in English', targetView: 'grammar', param: 'article:sanskrit-in-english', badge: 'Article' }
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
    tagline: 'Recitation, reading original scriptures, and holistic capstone analysis',
    themeColor: '#d97706',
    icon: '🪔',
    overview:
      'The crown of the course: transforming linguistic mastery into contemplative depth. Learn pitch-accented Vedic recitation, read the Bhagavad Gītā in the original Sanskrit without translations, explore the 6 Darśanas, and complete the end-to-end Capstone Verse Analysis.',
    lessons: [
      {
        id: 'c-6-1',
        lessonNumber: '6.1',
        titleDevanagari: 'स्वरः, लयः एवं एकाग्रता',
        titleEnglish: 'Recitation and Focus: Svara, Rhythm and Attention',
        shortDescription: 'Voice as the bridge between body, breath, and inner silence. Chanting as neuro-acoustic regulation.',
        ideaConcept: {
          heading: 'Speech as an Auditory Meditation',
          summary: 'In the Gurukul tradition, chanting was never rote performance. It was a precise method of holding the nervous system perfectly still while speech flowed.',
          body: [
            'The three Vedic pitches: Udātta (उदात्तः - raised pitch), Anudātta (अनुदात्तः - lowered pitch), and Svarita (स्वरितः - circumflex glide).',
            'Reciting with accurate pitch prevents the mind from projecting thoughts into the past or future.'
          ],
          keyTakeaway: 'When pitch, duration, and breath align, chanting quiets internal chatter and brings lucid mental stillness.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'ओं सह नाववतु ।', iast: 'oṃ saha nāvavatu |', meaning: 'Oṃ. May the Supreme protect teacher and student together.' },
            { devanagari: 'सह नौ भुनक्तु ।', iast: 'saha nau bhunaktu |', meaning: 'May it nourish us both together.' },
            { devanagari: 'सह वीर्यं करवावहै ।', iast: 'saha vīryaṃ karavāvahai |', meaning: 'May we both work together with vigour.' },
            { devanagari: 'तेजस्वि नावधीतमस्तु मा विद्विषावहै ॥', iast: 'tejasvi nāvadhītamastu mā vidviṣāvahai ||', meaning: 'May our study be radiant; may we never hate one another.' },
            { devanagari: 'ओं शान्तिः शान्तिः शान्तिः ॥', iast: 'oṃ śāntiḥ śāntiḥ śāntiḥ ||', meaning: 'Oṃ. Peace, peace, peace.' }
          ],
          phoneticInstructions: 'Chant the Śānti Mantra slowly. Feel the vibration rise from your belly through the chest into the crown of your head.',
          recitationTips: 'Pause after "ओं शान्तिः शान्तिः शान्तिः" and sit in pure silence for 30 seconds.'
        },
        ruleMechanics: {
          title: 'The Three Vedic Pitch Accents (Svara)',
          explanation: [
            '1. Udātta (उदात्तः): Pitch produced in the upper vocal region (high tone).',
            '2. Anudātta (अनुदात्तः): Pitch produced in the lower vocal region (marked with a horizontal bar under the letter in Vedic texts: अ॒).',
            '3. Svarita (स्वरितः): Harmonious combination / falling glide (marked with a vertical stroke above: अ॑).'
          ]
        },
        practice: {
          quickQuiz: {
            id: 'q-6-1',
            prompt: 'In Vedic recitation, what are the three foundational pitch accents called?',
            options: [
              'Do, Re, Mi',
              'Udātta (उच्चैः), Anudātta (नीचैः), and Svarita (समाहारः)',
              'Hrasva, Dīrgha, Pluta',
              'Past, Present, Future'
            ],
            correctIndex: 1,
            explanation: 'The three Vedic accents are Udātta (raised), Anudātta (lowered), and Svarita (circumflex transition).'
          },
          worksheetSummary: 'Worksheet 6.1: Vedic Svara Markings & Respiratory Recitation Practice Sheet.',
          worksheetDownloadId: 'ws-c6-1'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 Neuro-Acoustics & Vagal Tone',
          heading: 'Vagus Nerve Stimulation Through Metered Resonance',
          bridgeExplanation: 'The long vagus nerve passes directly alongside the vocal cords and larynx before innervating the heart, lungs, and viscera. Low-frequency resonant chanting with prolonged exhalation directly stimulates the parasympathetic nervous system, lowering heart rate variability (HRV) and calming stress.',
          modernInsight: 'Ancient chant masters discovered physiological biofeedback thousands of years before electronic monitors existed.'
        },
        linkedResources: [
          { label: 'Deepakam Prārthanā Audio Recitation', targetView: 'reader', badge: 'Prayer Audio' },
          { label: 'Philosophy: Evolution of the Speaking Body', targetView: 'philosophy', badge: 'Essay' }
        ]
      },
      {
        id: 'c-6-2',
        lessonNumber: '6.2',
        titleDevanagari: 'श्रीमद्भगवद्गीता-पठनम्',
        titleEnglish: 'Reading the Gītā Directly',
        shortDescription: 'Moving beyond secondhand translations into direct contact with the original dialogue.',
        ideaConcept: {
          heading: 'Direct Encounter with the Original Text',
          summary: 'When you read the Gītā in translation, you are reading someone else’s interpretation. When you read the Sanskrit words directly, you encounter the raw psychological dialogue between Krishna and Arjuna.',
          body: [
            'We will take the most famous verse in human literature: Chapter 2, Verse 47 ("कर्मण्येवाधिकारस्ते...").',
            'Using the Sandhi and Vibhakti rules you learned in Module 3, you will disassemble and translate it yourself!'
          ],
          keyTakeaway: 'Reading sacred literature in its original language removes all secondhand filters.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।', iast: 'karmaṇyevādhikāraste mā phaleṣu kadācana |', meaning: 'Your jurisdiction is in action alone, never in its fruits.' },
            { devanagari: 'मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥', iast: 'mā karmaphalaheturbhūrmā te saṅgo\'stvakarmaṇi ||', meaning: 'Do not let fruits of action be your motive; do not be attached to inaction.' }
          ],
          phoneticInstructions: 'Split the Sandhi as you chant: Karmaṇi + eva + adhikāraḥ + te | mā + phaleṣu + kadācana.',
          recitationTips: 'Notice how the rhythm gives weight and dignity to the profound philosophical declaration.'
        },
        ruleMechanics: {
          title: 'Anvaya Breakdown of Gītā 2.47',
          explanation: [
            'कर्मणि (In action - Saptamī locative) + एव (alone) + अधिकारः (right/jurisdiction) + ते (your).',
            'फलेषु (In the fruits - Saptamī plural) + कदाचन (ever) + मा (not).',
            'कर्मफलहेतुः (Motivated by fruits) + मा भूः (do not become).',
            'अकर्मणि (In inaction) + ते (your) + सङ्गः (attachment) + मा अस्तु (may not be).'
          ]
        },
        practice: {
          quickQuiz: {
            id: 'q-6-2',
            prompt: 'In Gītā 2.47, what grammatical case is "कर्मणि" (in action) and "फलेषु" (in fruits)?',
            options: [
              'Prathamā (Subject nominative)',
              'Saptamī (Locative / in, on, at)',
              'Tṛtīyā (Instrumental)',
              'Dvitīyā (Accusative)'
            ],
            correctIndex: 1,
            explanation: 'Both "कर्मणि" (singular) and "फलेषु" (plural) are in Saptamī Vibhakti (Locative case), expressing "in action" and "in the fruits".'
          },
          worksheetSummary: 'Worksheet 6.2: Bhagavad Gītā Chapter 2 Verse Parsing & Anvaya Translation Worksheet.',
          worksheetDownloadId: 'ws-c6-2'
        },
        thinkingConnection: {
          type: 'contemplative',
          badgeLabel: '🪔 Karma Yoga & Psychological Freedom',
          heading: 'Action Free from Anxiety Over Outcome',
          bridgeExplanation: 'Gītā 2.47 is the ultimate psychological blueprint for peak performance. When a surgeon or coder is hyper-fixated on fear of failure or craving praise (phala), working memory is drained. Directing 100% of attention into the action itself (karmaṇi eva) produces effortless flow state.',
          modernInsight: 'This directly parallels Mihaly Csikszentmihalyi’s modern concept of Flow and Carol Dweck’s Growth Mindset.'
        },
        linkedResources: [
          { label: 'Grammar Declension Shelf', targetView: 'grammar', badge: 'Declensions' },
          { label: 'NCERT Deepakam Verse Reader', targetView: 'reader', badge: 'Reader' }
        ]
      },
      {
        id: 'c-6-3',
        lessonNumber: '6.3',
        titleDevanagari: 'षड्-दर्शनानि · दृष्टयः',
        titleEnglish: 'The Darśanas as Ways of Seeing',
        shortDescription: 'The six classical epistemological systems as lenses for investigating reality and consciousness.',
        ideaConcept: {
          heading: 'Philosophy as Direct Seeing (Darśana)',
          summary: 'In the West, philosophy means "love of wisdom". In Sanskrit, it is called Darśana (दर्शनम्, from √दृश् = to see) — a direct experiential perception of reality.',
          body: [
            'The 6 Orthodox Systems (षड्-दर्शनानि):',
            '1. Nyāya (Logic & Epistemology)',
            '2. Vaiśeṣika (Atomic Physics & Categorization)',
            '3. Sāṅkhya (Cosmology & Consciousness vs Matter)',
            '4. Yoga (Psychology & Meditative Stillness)',
            '5. Mīmāṁsā (Linguistic Hermeneutics & Action)',
            '6. Vedānta (Non-duality & Ultimate Reality)'
          ],
          keyTakeaway: 'The Darśanas are not dogmatic beliefs; they are complementary lenses through which the mind investigates existence.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'प्रत्यक्षम्', iast: 'Pratyakṣam', meaning: 'Direct sensory perception' },
            { devanagari: 'अनुमानम्', iast: 'Anumānam', meaning: 'Logical inference (where there is smoke, there is fire)' },
            { devanagari: 'उपमानम्', iast: 'Upamānam', meaning: 'Comparison and analogy' },
            { devanagari: 'शब्दः', iast: 'Śabdaḥ', meaning: 'Valid testimony of reliable seers' }
          ],
          phoneticInstructions: 'Chant the 4 primary Pramāṇas (valid means of knowledge).',
          recitationTips: 'Reflect on how your mind gathers evidence for every belief it holds.'
        },
        ruleMechanics: {
          title: 'The Six Darśana Pairs',
          tableData: {
            headers: ['System (दर्शनम्)', 'Founder (ऋषिः)', 'Core Investigation', 'Scientific / Philosophical Focus'],
            rows: [
              ['न्याय (Nyāya)', 'गौतम (Gautama)', 'प्रमाणानि (Means of knowledge)', 'Formal logic, syllogisms, fallacy detection'],
              ['वैशेषिक (Vaiśeṣika)', 'कणाद (Kaṇāda)', 'पदार्थाः (Atomic elements)', 'Atomic theory, physics, material categories'],
              ['सांख्य (Sāṅkhya)', 'कपिल (Kapila)', 'प्रकृति-पुरुषौ (Matter & Soul)', 'Cosmology, 24 elements, conscious awareness'],
              ['योग (Yoga)', 'पतञ्जलि (Patañjali)', 'चित्तवृत्तिनिरोधः (Stillness)', 'Meditation, psychology, breath control'],
              ['मीमांसा (Mīmāṁsā)', 'जैमिनि (Jaimini)', 'धर्म-विचारः (Hermeneutics)', 'Philosophy of language, ritual semantics'],
              ['वेदान्त (Vedānta)', 'बादरायण (Bādarāyaṇa)', 'ब्रह्म-साक्षात्कारः (Non-duality)', 'Nature of the Self, Advaita, ultimate truth']
            ]
          }
        },
        practice: {
          quickQuiz: {
            id: 'q-6-3',
            prompt: 'What does the Sanskrit word "दर्शनम्" (Darśana) literally mean?',
            options: [
              'A collection of dogmas to be memorized',
              'A direct "seeing" or experiential realization of reality (from root √दृश्)',
              'A debating contest',
              'A calendar'
            ],
            correctIndex: 1,
            explanation: '"Darśana" comes from the root √दृश् (to see) — it denotes an experiential perception of truth rather than mere academic speculation.'
          },
          worksheetSummary: 'Worksheet 6.3: The 6 Darśanas Epistemological Frameworks & Pramāṇa Chart.',
          worksheetDownloadId: 'ws-c6-3'
        },
        thinkingConnection: {
          type: 'integrated',
          badgeLabel: '🧠 Epistemology & Scientific Method',
          heading: 'Rigorous Epistemology Before Scientific Claims',
          bridgeExplanation: 'Before modern science formulated the empirical method, Nyāya and Vaiśeṣika laid out strict criteria for what constitutes valid proof (Pramāṇa) versus logical fallacies (Hetvābhāsa). You were never allowed to say "it is written in a book, so it must be true". You had to prove it through perception, inference, or rigorous logic.',
          modernInsight: 'This intellectual fearlessness prevented dogmatic stagnation and encouraged rigorous debate across millennia.'
        },
        linkedResources: [
          { label: 'Philosophy Essay: Darśana & AI', targetView: 'philosophy', badge: 'Essay' },
          { label: 'Vedic Maths & Śūnyāt Anantam', targetView: 'vedic-maths', badge: 'Philosophy of Math' }
        ]
      },
      {
        id: 'c-6-4',
        lessonNumber: '6.4',
        titleDevanagari: 'महा-समन्वयः · पूर्ण-श्लोक-मीमांसा',
        titleEnglish: 'Capstone: Analyzing One Verse End-to-End',
        shortDescription: 'The grand synthesis: analyzing one verse from Sound to Script to Rules to Meaning to Contemplation.',
        ideaConcept: {
          heading: 'The Master Synthesis: From Sound to Silence',
          summary: 'You have walked the complete path: from the physiological points of articulation to Pāṇini’s code, from noun cases to narrative wisdom, from algorithms to contemplative stillness. In this Capstone, you analyze one immortal verse across all five dimensions.',
          body: [
            'The Capstone Verse (Bṛhadāraṇyaka Upaniṣad 1.3.28):',
            'असतो मा सद्गमय ।',
            'तमसो मा ज्योतिर्गमय ।',
            'मृत्योर्माऽमृतं गमय ॥',
            'ॐ शान्तिः शान्तिः शान्तिः ॥'
          ],
          keyTakeaway: 'You are no longer an outsider looking at translations. You can now inhabit the Sanskrit sound-architecture directly.'
        },
        soundPractice: {
          audioTerms: [
            { devanagari: 'असतो मा सद्गमय ।', iast: 'asato mā sadgamaya |', meaning: 'From untruth / unreal, lead me to truth / reality.' },
            { devanagari: 'तमसो मा ज्योतिर्गमय ।', iast: 'tamaso mā jyotirgamaya |', meaning: 'From darkness / ignorance, lead me to luminous light.' },
            { devanagari: 'मृत्योर्माऽमृतं गमय ।', iast: 'mṛtyormā\'mṛtaṁ gamaya |', meaning: 'From mortality / limitation, lead me to immortality.' },
            { devanagari: 'ॐ शान्तिः शान्तिः शान्तिः ॥', iast: 'oṁ śāntiḥ śāntiḥ śāntiḥ ||', meaning: 'Peace within, peace around, peace transcendent.' }
          ],
          phoneticInstructions: 'Recite the full three-line invocation with absolute presence. Notice the visceral shift as your tongue transitions from "asataḥ" to "jyotiḥ" to "amṛtam".',
          recitationTips: 'Hold 1 minute of silent reflection after the final peace mantra.'
        },
        ruleMechanics: {
          title: 'The 5-Dimensional Capstone Decomposition',
          explanation: [
            '1. SOUND (ध्वनिः): Notice the balance of vowels and nasals. Visargas soften into "o" before voiced consonants (असतस् + मा = असतो मा).',
            '2. SCRIPT (लिपिः): Observe conjuncts: त्य (त्+य in मृत्योः), म्भो (म्+भ), र्ग (र्+ग in गमय).',
            '3. GRAMMAR (व्याकरणम्): "असतः", "तमसः", "मृत्योः" are all in Pañcamī Vibhakti (Ablative = source of departure!). The verb "गमय" is an imperative prayer (Loṭ-Lakāra causal: "cause to reach / lead").',
            '4. MEANING (अर्थः): The universal human yearning to transcend darkness, limitation, and falsehood.',
            '5. CONTEMPLATION (चिन्तनम्): The journey from outer noise to the unshakeable witness within.'
          ]
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
