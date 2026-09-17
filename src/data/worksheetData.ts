export interface WorksheetQuestion {
  num: number;
  question: string;
  questionSanskrit?: string;
  marks: number;
  type: 'mcq' | 'fill' | 'matching' | 'short_ans' | 'grammar';
  options?: string[];
  answer: string;
  explanation?: string;
}

export interface WorksheetSection {
  sectionTitle: string;
  sectionTitleSanskrit: string;
  instructions: string;
  totalMarks: number;
  questions: WorksheetQuestion[];
}

export interface Worksheet {
  id: string;
  title: string;
  titleSanskrit: string;
  category: 'cbse_ch' | 'grammar' | 'vedic_maths' | 'varnamala';
  categoryLabel: string;
  grade: string;
  totalMarks: number;
  timeLimit: string;
  description: string;
  sections: WorksheetSection[];
}

export const WORKSHEET_CATEGORIES = [
  { id: 'all', label: 'All Worksheets (समग्र-कार्यपत्रिकाः)', icon: '📑' },
  { id: 'cbse_ch', label: 'CBSE Deepakam Chapters (पाठ-अभ्यासः)', icon: '📖' },
  { id: 'grammar', label: 'Vyākaraṇa / Grammar (व्याकरण-पत्राणि)', icon: '📐' },
  { id: 'vedic_maths', label: 'Vedic Maths Drills (वैदिक-गणितम्)', icon: '⚡' },
  { id: 'varnamala', label: 'Varṇamālā & Sounds (वर्णमाला)', icon: '🔤' },
] as const;

export const WORKSHEETS: Worksheet[] = [
  // ==========================================
  // WORKSHEET 1: CHAPTER 1
  // ==========================================
  {
    id: 'ws-ch1',
    title: 'Chapter 1: वन्दे भारतमातरम् (Salutations to Mother India)',
    titleSanskrit: 'प्रथमः पाठः · वन्दे भारतमातरम् · अभ्यास-पत्रम्',
    category: 'cbse_ch',
    categoryLabel: 'CBSE Deepakam Class 7',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 25,
    timeLimit: '45 Minutes',
    description: 'Master CBSE board questions, shloka meanings, samas, and vibhakti for Chapter 1.',
    sections: [
      {
        sectionTitle: 'Section A: Multiple Choice Questions (वस्तुनिष्ठ-प्रश्नाः)',
        sectionTitleSanskrit: 'खण्डः "क" · वस्तुनिष्ठ-प्रश्नाः',
        instructions: 'उचितं विकल्पं चित्वा लिखत (Choose the correct option):',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: '"वन्दे भारतमातरम्" अस्मिन् वाक्ये "वन्दे" क्रियापदस्य कः अर्थः?',
            marks: 2,
            type: 'mcq',
            options: ['अहं प्रणमामि (I salute)', 'त्वं गच्छसि (You go)', 'सः पश्यति (He sees)', 'वयम् क्रीडामः (We play)'],
            answer: 'अहं प्रणमामि (I salute)',
            explanation: '"वन्दे" उत्तमपुरुष एकवचनम् of धातु "वन्द्" (आत्मनेपदम्).',
          },
          {
            num: 2,
            question: 'भारतमातुः मुकुटत्वेन कः राजते?',
            marks: 2,
            type: 'mcq',
            options: ['हिमालयः (Snowy Himalaya)', 'विन्ध्याचलः', 'सागरः', 'गङ्गा'],
            answer: 'हिमालयः (Snowy Himalaya)',
            explanation: 'उत्तरे स्थितः हिमाच्छादितः हिमालयः भारतमातुः मुकुटवत् शोभते।',
          },
          {
            num: 3,
            question: 'भारतमातुः चरणौ कः प्रक्षालयति (Who washes the feet)?',
            marks: 2,
            type: 'mcq',
            options: ['हिन्द-महासागरः (Indian Ocean)', 'आकाशः', 'पवनः', 'चन्द्रमाः'],
            answer: 'हिन्द-महासागरः (Indian Ocean)',
            explanation: 'दक्षिणे स्थितः हिन्दमहासागरः भारतमातुः पादप्रक्षालनं करोति।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: Fill in the Blanks & Anvaya (श्लोकान्वय-पूर्तिः)',
        sectionTitleSanskrit: 'खण्डः "ख" · रिक्तस्थान-पूर्तिः अन्वयश्च',
        instructions: 'मञ्जूषातः उचितपदं चित्वा अन्वयं पूरयत (Fill in the blanks from the word box):',
        totalMarks: 6,
        questions: [
          {
            num: 4,
            question: 'अन्वयः: यस्याः मस्तके _______ शोभते, यस्याः चरणौ _______ प्रक्षालयति, तां भारतमातरं वन्दे।',
            marks: 3,
            type: 'fill',
            options: ['हिमालयः / सागरः', 'गङ्गा / पवनः', 'सूर्यः / चन्द्रः'],
            answer: 'हिमालयः / सागरः',
            explanation: 'मस्तके हिमालयः शोभते, चरणौ सागरः प्रक्षालयति।',
          },
          {
            num: 5,
            question: 'शब्दार्थ-मेलनम्: "शुभ्राम्" = _______, "पावनीम्" = _______।',
            marks: 3,
            type: 'fill',
            answer: 'शुभ्राम् = धवलाम् (White/Pure), पावनीम् = पवित्रकारिणीम् (Holy/Purifying)',
            explanation: 'शुभ्रा = श्वेता/पवित्रा; पावनी = पवित्रतादायिनी।',
          },
        ],
      },
      {
        sectionTitle: 'Section C: Grammar & Vibhakti (व्याकरण-अभ्यासः)',
        sectionTitleSanskrit: 'खण्डः "ग" · व्याकरणम्',
        instructions: 'निर्देशानुसारं व्याकरण-प्रश्नान् उत्तरत (Answer grammatical questions as directed):',
        totalMarks: 7,
        questions: [
          {
            num: 6,
            question: '"भारतमातरम्" पदे का विभक्तिः किं च वचनम्?',
            marks: 3,
            type: 'grammar',
            answer: 'द्वितीया विभक्तिः, एकवचनम् (कर्मकारकम्)',
            explanation: 'मातृ (ऋकारान्त स्त्रीलिङ्ग) शब्दस्य द्वितीया-एकवचने "मातरम्" भवति।',
          },
          {
            num: 7,
            question: 'सन्धिं कुरुत: (i) हिम + आलयः = _______ (ii) जगत् + जननी = _______',
            marks: 4,
            type: 'grammar',
            answer: '(i) हिमालयः (दीर्घसन्धिः) (ii) जगज्जननी (व्यञ्जनसन्धिः)',
            explanation: 'हिम + आलयः (अ + आ = आ); जगत् + जननी (त् + ज = ज्ज).',
          },
        ],
      },
      {
        sectionTitle: 'Section D: Short Answer Questions (लघूत्तराणि)',
        sectionTitleSanskrit: 'खण्डः "घ" · प्रश्नानाम् उत्तराणि',
        instructions: 'पूर्णवाक्येन उत्तरं लिखत (Answer in complete Sanskrit sentences):',
        totalMarks: 6,
        questions: [
          {
            num: 8,
            question: 'अस्माकं देशस्य नाम किम् अस्ति?',
            marks: 3,
            type: 'short_ans',
            answer: 'अस्माकं देशस्य नाम "भारतवर्षम्" (भारतदेशः) अस्ति।',
            explanation: 'Complete sentence in Sanskrit answering our nation\'s name.',
          },
          {
            num: 9,
            question: 'वयम् काम् अहर्निशं वन्दामहे?',
            marks: 3,
            type: 'short_ans',
            answer: 'वयम् अहर्निशं भारतमातरं वन्दामहे।',
            explanation: 'We continuously offer salutations to Mother India.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // WORKSHEET 2: CHAPTER 2
  // ==========================================
  {
    id: 'ws-ch2',
    title: 'Chapter 2: नित्यं पिबामः सुभाषितरसम् (Wise Sayings & Morals)',
    titleSanskrit: 'द्वितीयः पाठः · नित्यं पिबामः सुभाषितरसम् · कार्यपत्रिका',
    category: 'cbse_ch',
    categoryLabel: 'CBSE Deepakam Class 7',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 25,
    timeLimit: '45 Minutes',
    description: 'CBSE exam worksheet for Subhashitas: moral comprehension, anvaya, sandhi, and shloka meanings.',
    sections: [
      {
        sectionTitle: 'Section A: Shloka Meaning & MCQs (सुभाषितार्थाः)',
        sectionTitleSanskrit: 'खण्डः "क" · सुभाषित-अवबोधनम्',
        instructions: 'उचितम् उत्तरं चिनुत (Select the correct option):',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: '"अयोग्यः पुरुषो नास्ति योजकस्तत्र दुर्लभः" — अत्र "योजकः" शब्दस्य कः अभिप्रायः?',
            marks: 2,
            type: 'mcq',
            options: [
              'संयोजकः / गुणग्राहको जनः (A discerning coordinator/connector)',
              'धनवान् मनुष्यः (A wealthy man)',
              'बलवान् सैनिकः (A strong soldier)',
              'व्यापारी (A merchant)',
            ],
            answer: 'संयोजकः / गुणग्राहको जनः (A discerning coordinator/connector)',
            explanation: 'योजकः सः भवति यः प्रत्येकस्य जनस्य गुणं ज्ञात्वा तं कार्ये नियोजयति।',
          },
          {
            num: 2,
            question: 'गुणिनो जनाः कथं नमन्ति?',
            marks: 2,
            type: 'mcq',
            options: [
              'फलिनो वृक्षाः इव (Like fruit-laden trees)',
              'शुष्ककाष्ठम् इव (Like dry wood)',
              'पर्वतः इव (Like mountains)',
              'मेघाः इव (Like rainclouds)',
            ],
            answer: 'फलिनो वृक्षाः इव (Like fruit-laden trees)',
            explanation: 'यथा फलभारेण वृक्षाः नमन्ति तथैव सद्गुणसम्पन्नाः जनाः विनम्राः भवन्ति।',
          },
          {
            num: 3,
            question: 'कण्ठस्य वास्तविकं भूषणं किम्?',
            marks: 2,
            type: 'mcq',
            options: ['सत्यभाषणम् (Truthful speech)', 'स्वर्णहारः (Gold necklace)', 'मुक्तामाला (Pearl string)', 'मौनम् (Silence)'],
            answer: 'सत्यभाषणम् (Truthful speech)',
            explanation: '"हस्तस्य भूषणं दानं सत्यं कण्ठस्य भूषणम्"।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: Shloka Completion & Anvaya (श्लोक-पूर्तिः)',
        sectionTitleSanskrit: 'खण्डः "ख" · श्लोक-पूर्तिः अन्वयश्च',
        instructions: 'रिक्तस्थानानि पूरयित्वा श्लोकं लिखत (Complete the shloka):',
        totalMarks: 7,
        questions: [
          {
            num: 4,
            question: 'नमन्ति _______ वृक्षा नमन्ति _______ जनाः। शुष्कवृक्षाश्च मूर्खाश्च न _______ कदाचन॥',
            marks: 3,
            type: 'fill',
            answer: 'फलिनो / गुणिनो / नमन्ति',
            explanation: 'नमन्ति फलिनो वृक्षा नमन्ति गुणिनो जनाः। शुष्कवृक्षाश्च मूर्खाश्च न नमन्ति कदाचन॥',
          },
          {
            num: 5,
            question: 'अन्वयः लिखत: "हस्तस्य भूषणं दानं सत्यं कण्ठस्य भूषणम्। श्रोत्रस्य भूषणं शास्त्रं भूषणैः किं प्रयोजनम्॥"',
            marks: 4,
            type: 'short_ans',
            answer: 'अन्वयः: हस्तस्य भूषणं दानम् (अस्ति), कण्ठस्य भूषणं सत्यम् (अस्ति), श्रोत्रस्य भूषणं शास्त्रम् (अस्ति), (एतेषु सत्सु अन्यैः) भूषणैः किं प्रयोजनम्?',
            explanation: 'When one has charity, truth, and sacred wisdom, physical golden ornaments serve no real purpose.',
          },
        ],
      },
      {
        sectionTitle: 'Section C: Sandhi & Antonyms (सन्धिः विलोमपदानि च)',
        sectionTitleSanskrit: 'खण्डः "ग" · सन्धिः विलोमपदानि च',
        instructions: 'व्याकरणानुसारं समाधानं लिखत (Solve grammatical drills):',
        totalMarks: 6,
        questions: [
          {
            num: 6,
            question: 'सन्धि-विच्छेदं कुरुत: (i) योजकस्तत्र = _______ + _______ (ii) कोऽपि = _______ + _______',
            marks: 3,
            type: 'grammar',
            answer: '(i) योजकः + तत्र (विसर्गसन्धिः) (ii) कः + अपि (उत्व-विसर्गसन्धिः पूर्वत्र)',
            explanation: 'विसर्गस्य सकारः (स); कः + अपि -> कोऽपि।',
          },
          {
            num: 7,
            question: 'विलोमपदानि मेलयत: (i) दुर्लभः ↔ _______ (ii) गुणवान् ↔ _______ (iii) सत्यम् ↔ _______',
            marks: 3,
            type: 'matching',
            answer: '(i) दुर्लभः ↔ सुलभः (ii) गुणवान् ↔ निर्गुणः / मूर्खः (iii) सत्यम् ↔ असत्यम् / मिथ्या',
            explanation: 'Opposite pairs frequently evaluated on CBSE Sanskrit exams.',
          },
        ],
      },
      {
        sectionTitle: 'Section D: Practical Application & Translation (भावार्थ-लेखनम्)',
        sectionTitleSanskrit: 'खण्डः "घ" · भावार्थ-लेखनम्',
        instructions: 'अधोलिखितस्य श्लोकस्य हिन्दी/आङ्ग्लभाषया भावार्थं लिखत (Write shloka meaning):',
        totalMarks: 6,
        questions: [
          {
            num: 8,
            question: '"अमन्त्रमक्षरं नास्ति नास्ति मूलमनौषधम्। अयोग्यः पुरुषो नास्ति योजकस्तत्र दुर्लभः॥" अस्य श्लोकस्य अर्थं स्वशब्देषु लिखत।',
            marks: 6,
            type: 'short_ans',
            answer: 'There is no sound without potency/mantra; no plant root without medicinal value; no person without capability. Only a rare organizer who knows how to harmonize and utilize each one is hard to find.',
            explanation: 'Teaches inclusivity, resourcefulness, and emotional intelligence in leadership.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // WORKSHEET 3: GRAMMAR (SANDHI & VIBHAKTI)
  // ==========================================
  {
    id: 'ws-grammar-1',
    title: 'Vyākaraṇa: Sandhi Rules & Shabdarupani Declensions',
    titleSanskrit: 'व्याकरणम् · सन्धि-नियमाः शब्दरूपाणि च · अभ्यास-पत्रम्',
    category: 'grammar',
    categoryLabel: 'Vyākaraṇa / Grammar',
    grade: 'CBSE Class 7 Sanskrit',
    totalMarks: 25,
    timeLimit: '45 Minutes',
    description: 'Intensive drills on CBSE Class 7 noun declensions (राम, बालक, लता, फल) and Dirgha, Guna, Vriddhi Sandhi.',
    sections: [
      {
        sectionTitle: 'Section A: Sandhi Joining (सन्धिं कुरुत)',
        sectionTitleSanskrit: 'खण्डः "क" · सन्धि-कार्यम्',
        instructions: 'नियमानुसारं सन्धियुक्तपदं लिखत (Join words following Sandhi rules):',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'देव + आलयः = _______ (का सन्धिः?)',
            marks: 2,
            type: 'grammar',
            answer: 'देवालयः (दीर्घ-स्वरसन्धिः)',
            explanation: 'अ + आ = आ (अकः सवर्णे दीर्घः).',
          },
          {
            num: 2,
            question: 'गण + ईशः = _______ (का सन्धिः?)',
            marks: 2,
            type: 'grammar',
            answer: 'गणेशः (गुण-स्वरसन्धिः)',
            explanation: 'अ + ई = ए (आद्गुणः).',
          },
          {
            num: 3,
            question: 'एक + एकम् = _______ (का सन्धिः?)',
            marks: 2,
            type: 'grammar',
            answer: 'एकैकम् (वृद्धि-स्वरसन्धिः)',
            explanation: 'अ + ए = ऐ (वृद्धिरेचि).',
          },
        ],
      },
      {
        sectionTitle: 'Section B: Sandhi Splitting (सन्धि-विच्छेदः)',
        sectionTitleSanskrit: 'खण्डः "ख" · सन्धि-विच्छेदः',
        instructions: 'पदानां सन्धि-विच्छेदं कुरुत (Split the joined compound words):',
        totalMarks: 6,
        questions: [
          {
            num: 4,
            question: 'महर्षिः = _______ + _______',
            marks: 2,
            type: 'grammar',
            answer: 'महा + ऋषिः (गुणसन्धिः: आ + ऋ = अर्)',
            explanation: 'महा + ऋषिः = महर्षिः (आद्गुणः).',
          },
          {
            num: 5,
            question: 'यद्यपि = _______ + _______',
            marks: 2,
            type: 'grammar',
            answer: 'यदि + अपि (यण्-सन्धिः: इ + अ = य्)',
            explanation: 'इको यणचि: यदि + अपि = यद्यपि।',
          },
          {
            num: 6,
            question: 'पवनः = _______ + _______',
            marks: 2,
            type: 'grammar',
            answer: 'पो + अनः (अयादि-सन्धिः: ओ + अ = अव्)',
            explanation: 'एचोऽयवायावः: पो + अनः = पवनः।',
          },
        ],
      },
      {
        sectionTitle: 'Section C: Shabdarupani Declension Grid (शब्दरूप-तालिका)',
        sectionTitleSanskrit: 'खण्डः "ग" · शब्दरूपाणि',
        instructions: '"बालक" (अकारान्त पुंल्लिङ्ग) शब्दस्य रूपैः रिक्तस्थानानि पूरयत (Fill the noun grid):',
        totalMarks: 7,
        questions: [
          {
            num: 7,
            question: 'प्रथमा विभक्तिः: बालकः | _______ | _______',
            marks: 2,
            type: 'fill',
            answer: 'बालकौ | बालकाः',
            explanation: 'बालकः (एकवचनम्), बालकौ (द्विवचनम्), बालकाः (बहुवचनम्).',
          },
          {
            num: 8,
            question: 'तृतीया विभक्तिः: _______ | बालकाभ्याम् | _______',
            marks: 2,
            type: 'fill',
            answer: 'बालकेन | बालकैः',
            explanation: 'बालकेन (एकवचनम्), बालकाभ्याम् (द्विवचनम्), बालकैः (बहुवचनम्).',
          },
          {
            num: 9,
            question: 'सप्तमी विभक्तिः: बालके | _______ | _______',
            marks: 3,
            type: 'fill',
            answer: 'बालकयोः | बालकेषु',
            explanation: 'बालके (एकवचनम्), बालकयोः (द्विवचनम्), बालकेषु (बहुवचनम्).',
          },
        ],
      },
      {
        sectionTitle: 'Section D: Case Ending Identification (विभक्ति-कारक-परिचयः)',
        sectionTitleSanskrit: 'खण्डः "घ" · कारकं विभक्तिश्च',
        instructions: 'अधोलिखित-वाक्येषु रेखाङ्कितपदानां विभक्तिं कारकं च लिखत (Identify case & karaka):',
        totalMarks: 6,
        questions: [
          {
            num: 10,
            question: '"वृक्षात् पर्णानि पतन्ति" वाक्ये "वृक्षात्" पदे का विभक्तिः किं च कारकम्?',
            marks: 3,
            type: 'grammar',
            answer: 'पञ्चमी विभक्तिः, अपादान-कारकम् (Separation from tree)',
            explanation: 'ध्रुवमपायेऽपादानम्: separation uses 5th case (Ablative).',
          },
          {
            num: 11,
            question: '"माता बालकाय दुग्धं यच्छति" वाक्ये "बालकाय" पदे का विभक्तिः?',
            marks: 3,
            type: 'grammar',
            answer: 'चतुर्थी विभक्तिः, सम्प्रदान-कारकम् (Recipient / Giving)',
            explanation: 'कर्मणा यमभिप्रैति स सम्प्रदानम्: Giving takes 4th case.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // WORKSHEET 4: VEDIC MATHEMATICS
  // ==========================================
  {
    id: 'ws-vedic-1',
    title: 'Vedic Mathematics: Ekādhikena & Nikhilam Calculation Drills',
    titleSanskrit: 'वैदिक-गणितम् · एकाधिकेन पूर्वेण निखिलं च · अभ्यास-पत्रम्',
    category: 'vedic_maths',
    categoryLabel: 'Vedic Mathematics',
    grade: 'Speed Math Laboratory',
    totalMarks: 25,
    timeLimit: '30 Minutes',
    description: 'Mental speed calculations: rapid squaring of numbers ending in 5, base-1000 subtractions, and Beejank checks.',
    sections: [
      {
        sectionTitle: 'Section A: Squaring Ending in 5 (एकाधिकेन पूर्वेण)',
        sectionTitleSanskrit: 'खण्डः "क" · एकाधिकेन पूर्वेण वर्ग-गणना',
        instructions: 'Solve in under 5 seconds without scratch calculation:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'Find 35² using Ekādhikena Pūrveṇa (Step: 3 × 4 | 25):',
            marks: 2,
            type: 'short_ans',
            answer: '1,225 (3 × 4 = 12, append 25 -> 1225)',
            explanation: 'Formula: n(n+1) | 25.',
          },
          {
            num: 2,
            question: 'Find 65² using Ekādhikena Pūrveṇa (Step: 6 × 7 | 25):',
            marks: 2,
            type: 'short_ans',
            answer: '4,225 (6 × 7 = 42, append 25 -> 4225)',
            explanation: 'Instant mental answer in 2 seconds.',
          },
          {
            num: 3,
            question: 'Find 95² using Ekādhikena Pūrveṇa (Step: 9 × 10 | 25):',
            marks: 2,
            type: 'short_ans',
            answer: '9,025 (9 × 10 = 90, append 25 -> 9025)',
            explanation: '9 × 10 = 90 | 25 = 9025.',
          },
        ],
      },
      {
        sectionTitle: 'Section B: Nikhilam Base Subtraction (निखिलं नवतश्चरमतं दशतः)',
        sectionTitleSanskrit: 'खण्डः "ख" · निखिलं व्यवकलनम्',
        instructions: 'Subtract left-to-right: All from 9, last from 10:',
        totalMarks: 6,
        questions: [
          {
            num: 4,
            question: 'Calculate mentally: 1,000 - 648 = ?',
            marks: 2,
            type: 'short_ans',
            answer: '352 (From 9: 9-6=3, 9-4=5; From 10: 10-8=2)',
            explanation: 'Zero carries or borrowing needed!',
          },
          {
            num: 5,
            question: 'Calculate mentally: 10,000 - 3,714 = ?',
            marks: 2,
            type: 'short_ans',
            answer: '6,286 (From 9: 9-3=6, 9-7=2, 9-1=8; From 10: 10-4=6)',
            explanation: 'Reading directly from left to right: 6,286.',
          },
          {
            num: 6,
            question: 'Calculate mentally: 100,000 - 54,821 = ?',
            marks: 2,
            type: 'short_ans',
            answer: '45,179 (From 9: 4, 5, 1, 7; From 10: 9)',
            explanation: 'Instant result: 45,179.',
          },
        ],
      },
      {
        sectionTitle: 'Section C: Base-100 Mental Multiplication (आधार-गुणनम्)',
        sectionTitleSanskrit: 'खण्डः "ग" · आधार-१०० गुणनम्',
        instructions: 'Use Nikhilam Base 100 deviations to compute products:',
        totalMarks: 7,
        questions: [
          {
            num: 7,
            question: 'Compute 96 × 94 (Deviations: -04, -06):',
            marks: 3,
            type: 'short_ans',
            answer: '9,024 (Cross subtract: 96 - 6 = 90; Multiply deviations: -4 × -6 = +24)',
            explanation: '90 | 24 = 9,024.',
          },
          {
            num: 8,
            question: 'Compute 103 × 105 (Deviations: +03, +05):',
            marks: 4,
            type: 'short_ans',
            answer: '10,815 (Cross add: 103 + 5 = 108; Multiply deviations: 3 × 5 = 15)',
            explanation: '108 | 15 = 10,815.',
          },
        ],
      },
      {
        sectionTitle: 'Section D: Beejank Digital Root Check (बीजाङ्क-शोधनम्)',
        sectionTitleSanskrit: 'खण्डः "घ" · बीजाङ्क-सत्यापनम्',
        instructions: 'Verify mathematical integrity using Digital Roots:',
        totalMarks: 6,
        questions: [
          {
            num: 9,
            question: 'What is the Beejank (digital root) of 3,847?',
            marks: 3,
            type: 'short_ans',
            answer: '4 (3 + 8 + 4 + 7 = 22 -> 2 + 2 = 4)',
            explanation: 'Sum digits repeatedly until a single digit 1-9 remains.',
          },
          {
            num: 10,
            question: 'Check if 34 × 21 = 714 is correct using Beejank:',
            marks: 3,
            type: 'short_ans',
            answer: 'Correct! Beejank(34) = 7, Beejank(21) = 3; 7 × 3 = 21 -> 3. Beejank(714) = 7+1+4 = 12 -> 3. Matches!',
            explanation: 'LHS Beejank (3) equals RHS Beejank (3).',
          },
        ],
      },
    ],
  },
];
