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
  category: 'cbse_ch' | 'grammar' | 'vedic_maths' | 'varnamala' | 'deep_ch1' | 'deep_ch2' | 'deep_ch3' | 'deep_ch4' | 'deep_ch5' | 'deep_ch6' | 'deep_ch7' | 'deep_ch8' | 'deep_ch9' | 'deep_ch10' | 'deep_ch11' | 'deep_ch12' | 'deep_ch13' | 'deep_ch14' | 'grade8';
  categoryLabel: string;
  grade: string;
  totalMarks: number;
  timeLimit: string;
  description: string;
  sections: WorksheetSection[];
}

export const WORKSHEET_CATEGORIES = [
  { id: 'all', label: 'All Worksheets (समग्र-कार्यपत्रिकाः)', icon: '📑' },
  { id: 'deep_ch1', label: 'Lesson 1: वन्दे भारतमातरम् (7 Sheets)', icon: '🇮🇳' },
  { id: 'deep_ch2', label: 'Lesson 2: नित्यं पिबामः सुभाषितरसम् (7 Sheets)', icon: '📖' },
  { id: 'deep_ch3', label: 'Lesson 3: मित्राय नमः (7 Sheets)', icon: '☀️' },
  { id: 'deep_ch4', label: 'Lesson 4: न लभ्यते चेत् आम्लं द्राक्षाफलम् (7 Sheets)', icon: '🍇' },
  { id: 'deep_ch5', label: 'Lesson 5: सेवा हि परमो धर्मः (7 Sheets)', icon: '🩺' },
  { id: 'deep_ch6', label: 'Lesson 6: क्रीडाम वयं श्लोकान्त्याक्षरीम् (7 Sheets)', icon: '📜' },
  { id: 'deep_ch7', label: 'Lesson 7: ईशावास्यम् इदं सर्वम् (8 Sheets)', icon: '🕉️' },
  { id: 'deep_ch8', label: 'Lesson 8: हितं मनोहारि च दुर्लभं वचः (7 Sheets)', icon: '📜' },
  { id: 'deep_ch9', label: 'Lesson 9: अन्नाद् भवन्ति भूतानि (7 Sheets)', icon: '🌱' },
  { id: 'deep_ch10', label: 'Lesson 10: दशमः कः? (7 Sheets)', icon: '🔟' },
  { id: 'deep_ch11', label: 'Lesson 11: द्वीपेषु रम्यः द्वीपोऽण्डमानः (7 Sheets)', icon: '🏝️' },
  { id: 'deep_ch12', label: 'Lesson 12: वीराङ्गना पन्नाधाया (7 Sheets)', icon: '⚔️' },
  { id: 'deep_ch13', label: 'Supplementary: वर्णमात्रा-परिचयः (7 Sheets)', icon: '🔤' },
  { id: 'deep_ch14', label: 'Appendix 1: शब्दरूपाणि (7 Sheets)', icon: '📊' },
  { id: 'cbse_ch', label: 'CBSE Deepakam Chapters (पाठ-अभ्यासः)', icon: '📚' },
  { id: 'grammar', label: 'Vyākaraṇa / Grammar (10 Worksheets · व्याकरण-पत्राणि)', icon: '📐' },
  { id: 'vedic_maths', label: 'Vedic Maths Drills (वैदिक-गणितम्)', icon: '⚡' },
  { id: 'varnamala', label: 'Varṇamālā & Sounds (वर्णमाला)', icon: '🔤' },
  { id: 'grade8', label: 'Grade 8 Sanskrit (अष्टमकक्षा · 43 Worksheets)', icon: '🪕' },
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
  // LESSON 1: WORKSHEET 1 (एकपदेन उत्तरत मेलनं च कुरुत)
  // ==========================================
  {
    id: 'ws-ch1-1',
    title: 'Lesson 1 · Worksheet 1: एकपदेन उत्तरत मेलनं च कुरुत',
    titleSanskrit: 'प्रथमः पाठः · अभ्यासपत्रम् १ · एकपदेन उत्तरत मेलनं च कुरुत',
    category: 'cbse_ch',
    categoryLabel: 'CBSE Deepakam Class 7',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 8,
    timeLimit: '20 Minutes',
    description: 'Answer questions in one word and match historic ancient Indian cities with their modern names.',
    sections: [
      {
        sectionTitle: 'Part A: Answer in One Word (एकपदेन उत्तरत)',
        sectionTitleSanskrit: 'भागः (क) · एकपदेन उत्तरत',
        instructions: 'निम्नलिखितप्रश्नानाम् उत्तराणि एकपदेन लिखत (Answer in one word):',
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: 'पर्वतराजः कः अस्ति?',
            marks: 1,
            type: 'short_ans',
            answer: 'हिमालयः',
            explanation: 'भारतमातुः मुकुटरूपेण स्थितः हिमालयः पर्वतराजः कथ्यते।',
          },
          {
            num: 2,
            question: 'समुद्रः कस्याः चरणौ प्रक्षालयति?',
            marks: 1,
            type: 'short_ans',
            answer: 'भारतमातुः',
            explanation: 'दक्षिणे स्थितः समुद्रः भारतमातुः चरणप्रक्षालनं करोति।',
          },
          {
            num: 3,
            question: "'आनन्दमठः' कस्य रचना अस्ति?",
            marks: 1,
            type: 'short_ans',
            answer: 'बङ्किमचन्द्रः (बङ्किमचन्द्र चट्टोपाध्यायः)',
            explanation: "बङ्किमचन्द्र चट्टोपाध्यायेन 'आनन्दमठः' इति प्रसिद्धः उपन्यासः रचितः।",
          },
          {
            num: 4,
            question: 'राष्ट्रध्वजस्य मध्ये कस्य वर्णस्य चक्रमस्ति?',
            marks: 1,
            type: 'short_ans',
            answer: 'नीलवर्णस्य (घननीलवर्णस्य)',
            explanation: 'ध्वजस्य मध्यस्थे श्वेतपट्टे घननीलवर्णस्य धर्मचक्रम् अस्ति।',
          },
        ],
      },
      {
        sectionTitle: 'Part B: Match the Following (उचितं मेलनं कुरुत)',
        sectionTitleSanskrit: 'भागः (ख) · उचितं मेलनं कुरुत',
        instructions: 'प्राचीननाम्नां सह आधुनिकनाम्नां समुचितं मेलनं कुरुत (Match ancient names with modern names):',
        totalMarks: 4,
        questions: [
          {
            num: 5,
            question: 'प्राचीननाम: पाटलीपुत्रम् ➔ आधुनिकनाम किम्?',
            marks: 1,
            type: 'matching',
            options: ['(अ) उज्जैनः', '(ब) वाराणसी', '(स) पटना', '(द) दिल्ली'],
            answer: '(स) पटना',
            explanation: 'प्राचीनं पाटलीपुत्रम् अद्यतनकाले बिहारस्य राजधानी पटना इति ज्ञायते।',
          },
          {
            num: 6,
            question: 'प्राचीननाम: अवन्तिका ➔ आधुनिकनाम किम्?',
            marks: 1,
            type: 'matching',
            options: ['(अ) उज्जैनः', '(ब) वाराणसी', '(स) पटना', '(द) दिल्ली'],
            answer: '(अ) उज्जैनः',
            explanation: 'महाकालस्य नगरी अवन्तिका अद्यतनकाले उज्जैनः इति प्रसिद्धा।',
          },
          {
            num: 7,
            question: 'प्राचीननाम: काशी ➔ आधुनिकनाम किम्?',
            marks: 1,
            type: 'matching',
            options: ['(अ) उज्जैनः', '(ब) वाराणसी', '(स) पटना', '(द) दिल्ली'],
            answer: '(ब) वाराणसी',
            explanation: 'पावनी काशी नगरी वर्तमाने वाराणसी इति कथ्यते।',
          },
          {
            num: 8,
            question: 'प्राचीननाम: इन्द्रप्रस्थम् ➔ आधुनिकनाम किम्?',
            marks: 1,
            type: 'matching',
            options: ['(अ) उज्जैनः', '(ब) वाराणसी', '(स) पटना', '(द) दिल्ली'],
            answer: '(द) दिल्ली (देहली)',
            explanation: 'महाभारतकालीनं नगरम् इन्द्रप्रस्थम् अद्यतनकाले देहली (दिल्ली) इति प्रसिद्धम्।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 1: WORKSHEET 2 (रिक्तस्थानपूर्तिः)
  // ==========================================
  {
    id: 'ws-ch1-2',
    title: 'Lesson 1 · Worksheet 2: रिक्तस्थानपूर्तिः (Fill in the Blanks)',
    titleSanskrit: 'प्रथमः पाठः · अभ्यासपत्रम् २ · रिक्तस्थानपूर्तिः',
    category: 'cbse_ch',
    categoryLabel: 'CBSE Deepakam Class 7',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 10,
    timeLimit: '20 Minutes',
    description: 'Fill in the blanks from the help box (मञ्जूषा) based on Chapter 1 text.',
    sections: [
      {
        sectionTitle: 'Fill in the Blanks (मञ्जूषातः रिक्तस्थानपूर्तिः)',
        sectionTitleSanskrit: 'मञ्जूषातः उचितानि पदानि चित्वा रिक्तस्थानानि पूरयन्तु',
        instructions: 'मञ्जूषा: [ केशरवर्णः, धर्मचक्रम्, रत्नाकरः, कृषकः, चतुर्विंशतिः ]',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'भारतमातुः चरणौ स्वयं ____________________ समुद्रः प्रक्षालयति।',
            marks: 2,
            type: 'fill',
            answer: 'रत्नाकरः',
            explanation: 'रत्नाकरः समुद्रः भारतमातुः चरणौ प्रक्षालयति।',
          },
          {
            num: 2,
            question: "'जयतु ____________________' इति वक्तुम् हरितवर्णः प्रेरयति।",
            marks: 2,
            type: 'fill',
            answer: 'कृषकः',
            explanation: 'हरितवर्णः कृषकबान्धवानां परिश्रमं संस्मार्य "जयतु कृषकः" इति प्रेरयति।',
          },
          {
            num: 3,
            question: 'राष्ट्रध्वजस्य ऊर्ध्वभागे ____________________ अस्ति।',
            marks: 2,
            type: 'fill',
            answer: 'केशरवर्णः',
            explanation: 'राष्ट्रध्वजस्य शीर्षभागे केशरवर्णः विराजते।',
          },
          {
            num: 4,
            question: 'ध्वजे विराजमानस्य चक्रस्य नाम ____________________ इति।',
            marks: 2,
            type: 'fill',
            answer: 'धर्मचक्रम्',
            explanation: 'ध्वजस्य मध्यस्थस्य चक्रस्य नाम "धर्मचक्रम्" अस्ति।',
          },
          {
            num: 5,
            question: 'अस्मिन् चक्रे ____________________ अराः सन्ति।',
            marks: 2,
            type: 'fill',
            answer: 'चतुर्विंशतिः',
            explanation: 'धर्मचक्रे २४ (चतुर्विंशतिः) अराः (तीर/Spokes) सन्ति।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 1: WORKSHEET 3 (प्रश्ननिर्माणं कुरुत)
  // ==========================================
  {
    id: 'ws-ch1-3',
    title: 'Lesson 1 · Worksheet 3: प्रश्ननिर्माणं कुरुत (Question Formation)',
    titleSanskrit: 'प्रथमः पाठः · अभ्यासपत्रम् ३ · प्रश्ननिर्माणं कुरुत',
    category: 'cbse_ch',
    categoryLabel: 'CBSE Deepakam Class 7',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 10,
    timeLimit: '25 Minutes',
    description: 'Frame Sanskrit questions based on underlined words using suitable interrogatives.',
    sections: [
      {
        sectionTitle: 'Question Formation (प्रश्ननिर्माणम्)',
        sectionTitleSanskrit: 'रेखाङ्कितपदानि आश्रित्य प्रश्ननिर्माणं कुर्वन्तु',
        instructions: 'उचितं प्रश्नवाचकपदं प्रयुज्य प्रश्नान् रचयत (का, कः, के, किमर्थम्, कस्याः, कुतः):',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'अस्माकं वत्सला [भारतमाता]। प्रश्नवाक्यं रचयत।',
            marks: 2,
            type: 'short_ans',
            answer: 'अस्माकं वत्सला का?',
            explanation: 'भारतमाता (स्त्रीलिङ्ग एकवचनम्) ➔ का?',
          },
          {
            num: 2,
            question: 'समुद्रः [भारतमातुः] चरणौ प्रक्षालयति। प्रश्नवाक्यं रचयत।',
            marks: 2,
            type: 'short_ans',
            answer: 'समुद्रः कस्याः चरणौ प्रक्षालयति?',
            explanation: 'भारतमातुः (षष्ठी विभक्तिः, एकवचनम्) ➔ कस्याः?',
          },
          {
            num: 3,
            question: '[वैज्ञानिकाः] विज्ञानस्य क्षेत्रेषु यशः प्राप्तवन्तः। प्रश्नवाक्यं रचयत।',
            marks: 2,
            type: 'short_ans',
            answer: 'के विज्ञानस्य क्षेत्रेषु यशः प्राप्तवन्तः?',
            explanation: 'वैज्ञानिकाः (पुंल्लिङ्ग प्रथमा बहुवचनम्) ➔ के?',
          },
          {
            num: 4,
            question: 'जनाः तीर्थक्षेत्राणां धुलिं ललाटे स्थापयितुम् [विविधेभ्यः प्रदेशेभ्यः] आगच्छन्ति। प्रश्नवाक्यं रचयत।',
            marks: 2,
            type: 'short_ans',
            answer: 'जनाः तीर्थक्षेत्राणां धुलिं ललाटे स्थापयितुम् कुतः / कस्मात् आगच्छन्ति? (अथवा किमर्थम् आगच्छन्ति?)',
            explanation: 'विविधेभ्यः प्रदेशेभ्यः (पञ्चमी बहुवचनम् - स्थानबोधकम्) ➔ कुतः / कस्मात्?',
          },
          {
            num: 5,
            question: 'राष्ट्रध्वजे [त्रयः वर्णाः / त्रिवर्णः] शोभन्ते। प्रश्नवाक्यं रचयत।',
            marks: 2,
            type: 'short_ans',
            answer: 'राष्ट्रध्वजे के शोभन्ते? (अथवा: राष्ट्रध्वजे कति वर्णाः शोभन्ते?)',
            explanation: 'त्रयः वर्णाः ➔ के? अथवा संख्याबोधे ➔ कति वर्णाः?',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 1: WORKSHEET 4 (शब्दरूप-विभक्ति-ज्ञानम्)
  // ==========================================
  {
    id: 'ws-ch1-4',
    title: 'Lesson 1 · Worksheet 4: शब्दरूप-विभक्ति-ज्ञानम्',
    titleSanskrit: 'प्रथमः पाठः · अभ्यासपत्रम् ४ · शब्दरूप-विभक्ति-ज्ञानम्',
    category: 'cbse_ch',
    categoryLabel: 'CBSE Deepakam Class 7',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 10,
    timeLimit: '20 Minutes',
    description: 'Determine the grammatical case (विभक्तिः) and number (वचनम्) for Lesson 1 words.',
    sections: [
      {
        sectionTitle: 'Noun Declensions (शब्दरूप-तपस्या)',
        sectionTitleSanskrit: 'उदाहरणानुसारं रिक्तस्थानानि पूरयत',
        instructions: 'यथा: भारतमाता ➔ विभक्तिः: प्रथमा | वचनम्: एकवचनम्',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'शब्दः: नद्यः ➔ विभक्तिः: ____________________ | वचनम्: ____________________',
            marks: 2,
            type: 'grammar',
            answer: 'प्रथमा विभक्तिः, बहुवचनम्',
            explanation: 'नदी (स्त्रीलिङ्ग) प्रथमा विभक्ति रूपाणि: नदी, नद्यौ, नद्यः।',
          },
          {
            num: 2,
            question: 'शब्दः: ललाटे ➔ विभक्तिः: ____________________ | वचनम्: ____________________',
            marks: 2,
            type: 'grammar',
            answer: 'सप्तमी विभक्तिः, एकवचनम्',
            explanation: 'ललाट (नपुंसकलिङ्ग) सप्तमी विभक्तिः एकवचने "ललाटे" भवति।',
          },
          {
            num: 3,
            question: 'शब्दः: देशस्य ➔ विभक्तिः: ____________________ | वचनम्: ____________________',
            marks: 2,
            type: 'grammar',
            answer: 'षष्ठी विभक्तिः, एकवचनम्',
            explanation: 'देश (पुंल्लिङ्ग) षष्ठी विभक्तिः एकवचने "देशस्य" भवति।',
          },
          {
            num: 4,
            question: 'शब्दः: क्षेत्रेषु ➔ विभक्तिः: ____________________ | वचनम्: ____________________',
            marks: 2,
            type: 'grammar',
            answer: 'सप्तमी विभक्तिः, बहुवचनम्',
            explanation: 'क्षेत्र (नपुंसकलिङ्ग) सप्तमी विभक्तिः बहुवचने "क्षेत्रेषु" भवति।',
          },
          {
            num: 5,
            question: 'शब्दः: चक्रम् ➔ विभक्तिः: ____________________ | वचनम्: ____________________',
            marks: 2,
            type: 'grammar',
            answer: 'प्रथमा विभक्तिः / द्वितीया विभक्तिः, एकवचनम्',
            explanation: 'चक्र (नपुंसकलिङ्ग) प्रथमा तथा द्वितीया विभक्ति एकवचने "चक्रम्" भवति।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 1: WORKSHEET 5 (धातुरूप-परिवर्तनम्)
  // ==========================================
  {
    id: 'ws-ch1-5',
    title: 'Lesson 1 · Worksheet 5: धातुरूप-परिवर्तनम् (क्रियापद-अभ्यासः)',
    titleSanskrit: 'प्रथमः पाठः · अभ्यासपत्रम् ५ · धातुरूप-परिवर्तनम्',
    category: 'cbse_ch',
    categoryLabel: 'CBSE Deepakam Class 7',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 10,
    timeLimit: '25 Minutes',
    description: 'Complete the Present Tense (लट्-लकार) verb tables from the given word box.',
    sections: [
      {
        sectionTitle: 'Present Tense Verb Matrix (लट्-लकार चक्रम्)',
        sectionTitleSanskrit: "मञ्जूषायाः साहाय्येन 'लट्-लकार' चक्रं पूरयत",
        instructions: 'मञ्जूषा: [ अस्ति, भवन्ति, इच्छामः, आगच्छन्ति, भवसि, स्मरामि ]',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: "'भू' (भव्) धातुः — प्रथमपुरुषः (एकवचनम्): भवति | (बहुवचनम्): ____________________",
            marks: 2,
            type: 'fill',
            answer: 'भवन्ति',
            explanation: 'भू धातोः प्रथमपुरुष रूपाणि: भवति, भवतः, भवन्ति।',
          },
          {
            num: 2,
            question: "'भू' (भव्) धातुः — मध्यमपुरुषः (एकवचनम्): ____________________",
            marks: 2,
            type: 'fill',
            answer: 'भवसि',
            explanation: 'भू धातोः मध्यमपुरुष रूपाणि: भवसि, भवथः, भवथ।',
          },
          {
            num: 3,
            question: "'अस्' धातुः — प्रथमपुरुषः (एकवचनम्): ____________________ | (बहुवचनम्): सन्ति",
            marks: 2,
            type: 'fill',
            answer: 'अस्ति',
            explanation: 'अस् धातोः प्रथमपुरुष रूपाणि: अस्ति, स्तः, सन्ति।',
          },
          {
            num: 4,
            question: "'गम्' (आ + गच्छ) धातुः — प्रथमपुरुषः (बहुवचनम्): ____________________",
            marks: 2,
            type: 'fill',
            answer: 'आगच्छन्ति',
            explanation: 'आ-उपसर्गयुक्त गम् धातुः: आगच्छति, आगच्छतः, आगच्छन्ति।',
          },
          {
            num: 5,
            question: "'इष्' (इच्छ) धातुः — उत्तमपुरुषः (बहुवचनम्): ____________________",
            marks: 2,
            type: 'fill',
            answer: 'इच्छामः',
            explanation: 'इष् धातोः उत्तमपुरुष रूपाणि: इच्छामि, इच्छावः, इच्छामः।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 1: GRAMMAR WORKSHEET 1 (प्रश्ननिर्माणम् विभक्ति-परिवर्तनम् च)
  // ==========================================
  {
    id: 'ws-ch1-g1',
    title: 'Lesson 1 · Grammar Worksheet 1: प्रश्ननिर्माणम् विभक्ति-परिवर्तनम् च',
    titleSanskrit: 'प्रथमः पाठः · व्याकरण-अभ्यासपत्रम् १ · प्रश्ननिर्माणम् विभक्ति-परिवर्तनम् च',
    category: 'grammar',
    categoryLabel: 'Vyākaraṇa / Grammar',
    grade: 'CBSE Class 7 (व्याकरणम्)',
    totalMarks: 16,
    timeLimit: '30 Minutes',
    description: 'Frame questions using interrogatives and transform noun stems into specified case declensions.',
    sections: [
      {
        sectionTitle: 'Part A: Question Framing (प्रश्ननिर्माणम्)',
        sectionTitleSanskrit: 'भागः (क) · रेखाङ्कितपदानि आश्रित्य प्रश्ननिर्माणं कुर्वन्तु',
        instructions: 'यथा: अस्माकं वत्सला भारतमाता। → केषां वत्सला का?',
        totalMarks: 8,
        questions: [
          {
            num: 1,
            question: 'समुद्रः भारतमातुः [चरणौ] प्रक्षालयति। → ____________________________________________________?',
            marks: 2,
            type: 'short_ans',
            answer: 'समुद्रः भारतमातुः कौ प्रक्षालयति? (कौ? / कानि?)',
            explanation: 'चरणौ (पुंल्लिङ्ग द्वितीया द्विवचनम्) ➔ कौ?',
          },
          {
            num: 2,
            question: '[वीराः] भारतमातुः सर्वदा सेवां कृतवन्तः। → ____________________________________________________?',
            marks: 2,
            type: 'short_ans',
            answer: 'के भारतमातुः सर्वदा सेवां कृतवन्तः? (के?)',
            explanation: 'वीराः (प्रथमा बहुवचनम्) ➔ के?',
          },
          {
            num: 3,
            question: 'नदी [कष्टानि] सहमाना प्रवहति। → ____________________________________________________?',
            marks: 2,
            type: 'short_ans',
            answer: 'नदी कानि सहमाना प्रवहति? (कानि?)',
            explanation: 'कष्टानि (नपुंसकलिङ्ग द्वितीया बहुवचनम्) ➔ कानि?',
          },
          {
            num: 4,
            question: 'वयं [गौरववर्धनार्थम्] प्रयत्नं कुर्मः। → ____________________________________________________?',
            marks: 2,
            type: 'short_ans',
            answer: 'वयं किमर्थम् प्रयत्नं कुर्मः? (किमर्थम्?)',
            explanation: 'गौरववर्धनार्थम् (प्रयोजनवाचकम्) ➔ किमर्थम्?',
          },
        ],
      },
      {
        sectionTitle: 'Part B: Case Transformation (शब्दरूप-परिवर्तनम्)',
        sectionTitleSanskrit: 'भागः (ख) · निर्देशानुसारं शब्दरूपाणि परिवर्तयन्तु',
        instructions: 'कोष्ठके दत्तनिर्देशानुसारं शब्दरूपाणि परिवर्तयत (Decline nouns as directed):',
        totalMarks: 8,
        questions: [
          {
            num: 5,
            question: 'चक्रम् (प्रथमा विभक्तिः, बहुवचनम्) : _______________________',
            marks: 2,
            type: 'grammar',
            answer: 'चक्राणि',
            explanation: 'चक्र (नपुंसकलिङ्ग) प्रथमा बहुवचने "चक्राणि" भवति।',
          },
          {
            num: 6,
            question: 'देश (चतुर्थी विभक्तिः, एकवचनम्) : _______________________',
            marks: 2,
            type: 'grammar',
            answer: 'देशाय',
            explanation: 'देश (अकारान्त पुंल्लिङ्ग) चतुर्थी एकवचने "देशाय" भवति।',
          },
          {
            num: 7,
            question: 'ललाट (सप्तमी विभक्तिः, द्विवचनम्) : _______________________',
            marks: 2,
            type: 'grammar',
            answer: 'ललाटयोः',
            explanation: 'ललाट (नपुंसकलिङ्ग) सप्तमी द्विवचने "ललाटयोः" भवति।',
          },
          {
            num: 8,
            question: 'अहम् (प्रथमा विभक्तिः, बहुवचनम्) : _______________________',
            marks: 2,
            type: 'grammar',
            answer: 'वयम्',
            explanation: 'अस्मद् सर्वनाम प्रथमा रूपाणि: अहम् (एकवचनम्), आवाम् (द्विवचनम्), वयम् (बहुवचनम्)।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 1: GRAMMAR WORKSHEET 2 (धातु-लकार-कोशः अव्यय-प्रयोगः च)
  // ==========================================
  {
    id: 'ws-ch1-g2',
    title: 'Lesson 1 · Grammar Worksheet 2: धातु-लकार-कोशः अव्यय-प्रयोगः च',
    titleSanskrit: 'प्रथमः पाठः · व्याकरण-अभ्यासपत्रम् २ · धातु-लकार-कोशः अव्यय-प्रयोगः च',
    category: 'grammar',
    categoryLabel: 'Vyākaraṇa / Grammar',
    grade: 'CBSE Class 7 (व्याकरणम्)',
    totalMarks: 18,
    timeLimit: '35 Minutes',
    description: 'Master present tense verb conjugations (लट्-लकार) and apply appropriate indeclinables (अव्ययाः).',
    sections: [
      {
        sectionTitle: 'Part A: Verb Conjugation Table (धातु-लकार-कोशः)',
        sectionTitleSanskrit: 'भागः (क) · रिक्तस्थानेषु उचितं लट्-लकारस्य रूपं लिखन्तु',
        instructions: 'धातुरूपाणि लट्-लकारे (Present Tense) पूर्णं कुरुत:',
        totalMarks: 8,
        questions: [
          {
            num: 1,
            question: '१. भू (भव्) धातुः (प्रथमपुरुषः) ➔ एकवचनम्: भवति | द्विवचनम्: ________ | बहुवचनम्: ________',
            marks: 2,
            type: 'grammar',
            answer: 'भवतः, भवन्ति',
            explanation: 'भू धातुः लट्-लकार प्रथमपुरुषे: भवति, भवतः, भवन्ति।',
          },
          {
            num: 2,
            question: '२. अस् धातुः (मध्यमपुरुषः) ➔ एकवचनम्: ________ | द्विवचनम्: स्थः | बहुवचनम्: स्थ',
            marks: 2,
            type: 'grammar',
            answer: 'असि',
            explanation: 'अस् धातुः लट्-लकार मध्यमपुरुषे: असि, स्थः, स्थ।',
          },
          {
            num: 3,
            question: '३. इष् (इच्छ) धातुः (उत्तमपुरुषः) ➔ एकवचनम्: इच्छामि | द्विवचनम्: ________ | बहुवचनम्: इच्छामः',
            marks: 2,
            type: 'grammar',
            answer: 'इच्छावः',
            explanation: 'इष् धातुः लट्-लकार उत्तमपुरुषे: इच्छामि, इच्छावः, इच्छामः।',
          },
          {
            num: 4,
            question: '४. आ + गम् धातुः (प्रथमपुरुषः) ➔ एकवचनम्: आगच्छति | द्विवचनम्: आगच्छतः | बहुवचनम्: ________',
            marks: 2,
            type: 'grammar',
            answer: 'आगच्छन्ति',
            explanation: 'आ + गम् धातुः लट्-लकार प्रथमपुरुषे: आगच्छति, आगच्छतः, आगच्छन्ति।',
          },
        ],
      },
      {
        sectionTitle: 'Part B: Indeclinables Usage (अव्यय-प्रयोगः)',
        sectionTitleSanskrit: 'भागः (ख) · मञ्जूषातः उचितान् अव्ययान् चित्वा रिक्तस्थानानि पूरयन्तु',
        instructions: 'मञ्जूषा: [ च, इव, न, अपि, एव ]',
        totalMarks: 10,
        questions: [
          {
            num: 5,
            question: "'वन्दे मातरम्' इति गीतं तस्मिन् _________________ उपन्यासे वर्तते।",
            marks: 2,
            type: 'fill',
            answer: 'एव',
            explanation: "'तस्मिन् एव उपन्यासे' (उसी उपन्यास में)।",
          },
          {
            num: 6,
            question: 'नद्यः _________________ अस्माकं मातरः इव सन्ति।',
            marks: 2,
            type: 'fill',
            answer: 'अपि',
            explanation: "'नद्यः अपि' (नदियाँ भी हमारी माताओं के समान हैं)।",
          },
          {
            num: 7,
            question: 'अस्मिन राष्ट्रध्वजे केशरः, श्वेतः, हरितः _________________ वर्णाः विराजन्ते।',
            marks: 2,
            type: 'fill',
            answer: 'च',
            explanation: "'हरितः च वर्णाः' (और हरा रंग)।",
          },
          {
            num: 8,
            question: "इदं चक्रं 'जीवने श्रान्तेः आलस्यस्य च स्थानं _________________ भवतु' इति बोधयति।",
            marks: 2,
            type: 'fill',
            answer: 'न',
            explanation: "'स्थानं न भवतु' (आलस्य का कोई स्थान न हो)।",
          },
          {
            num: 9,
            question: 'सम्प्रति _________________ इदं गीतं श्रुत्वा वयं प्रेरिताः भवामः।',
            marks: 2,
            type: 'fill',
            answer: 'अपि',
            explanation: "'सम्प्रति अपि' (आज भी यह गीत सुनकर हम प्रेरित होते हैं)।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 2: WORKSHEET 1 (एकपदेन उत्तरत श्लोकांशमेलनं च)
  // ==========================================
  {
    id: 'ws-ch2-1',
    title: 'Lesson 2 · Worksheet 1: एकपदेन उत्तरत श्लोकांशमेलनं च',
    titleSanskrit: 'द्वितीयः पाठः · अभ्यासपत्रम् १ · एकपदेन उत्तरत श्लोकांशमेलनं च',
    category: 'deep_ch2',
    categoryLabel: 'Lesson 2: नित्यं पिबामः सुभाषितरसम्',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 16,
    timeLimit: '30 Minutes',
    description: 'Single-word answers for Subhashitas and matching halves of famous verses.',
    sections: [
      {
        sectionTitle: 'Part A: One Word Answers (एकपदेन उत्तरत)',
        sectionTitleSanskrit: 'भागः (क) · एकपदेन उत्तरत',
        instructions: 'प्रश्नानाम् उत्तराणि एकपदेन लिखन्तु (Answer in one word):',
        totalMarks: 8,
        questions: [
          {
            num: 1,
            question: 'कः मनुष्याणां शरीरस्थो महान् रिपुः?',
            marks: 2,
            type: 'short_ans',
            answer: 'आलस्यम्',
            explanation: "'आलस्यं हि मनुष्याणां शरीरस्थो महान् रिपुः' — आलस्यम् एव परमशत्रुः।",
          },
          {
            num: 2,
            question: 'कति पुराणानि सन्ति?',
            marks: 2,
            type: 'short_ans',
            answer: 'अष्टादश (18)',
            explanation: "'अष्टादशपुराणेषु व्यासस्य वचनद्वयम्' — अष्टादश (१८) पुराणानि सन्ति।",
          },
          {
            num: 3,
            question: 'व्यासस्य मते पुण्याय किम् अस्ति?',
            marks: 2,
            type: 'short_ans',
            answer: 'परोपकारः',
            explanation: "'परोपकारः पुण्याय' — परोपकारेण पुण्यं भवति।",
          },
          {
            num: 4,
            question: 'बुद्धिः केन शुध्यति?',
            marks: 2,
            type: 'short_ans',
            answer: 'ज्ञानेन',
            explanation: "'बुद्धिज्ज्ञानेन शुध्यति' — सत्यज्ञानेन बुद्धेः शुद्धिः भवति।",
          },
        ],
      },
      {
        sectionTitle: 'Part B: Match the Verse Halves (श्लोकांश-मेलनम्)',
        sectionTitleSanskrit: 'भागः (ख) · श्लोकांशान् यथोचितं योजयन्तु',
        instructions: "स्तम्भ 'क' इत्येतं स्तम्भ 'ख' इत्यनेन सह योजयत:\n१. वस्त्रेण वपुषा वाचा ➔ [ ? ]\n२. अद्भिर्गात्राणि शुध्यन्ति ➔ [ ? ]\n३. प्रियवाक्यप्रदानेन ➔ [ ? ]\n४. नास्त्युद्यमसमो बन्धुः ➔ [ ? ]",
        totalMarks: 8,
        questions: [
          {
            num: 5,
            question: '१. वस्त्रेण वपुषा वाचा ➔ मेलनं कुरुत',
            marks: 2,
            type: 'mcq',
            options: ['(स) विनयेन च।', '(अ) मनः सत्येन शुध्यति।', '(ब) वचने का दरिद्रता।', '(द) कृत्वा यं नावसीदति।'],
            answer: '(स) विनयेन च।',
            explanation: 'वस्त्रेण वपुषा वाचा विद्यया विनयेन च (पञ्च वकाराः)।',
          },
          {
            num: 6,
            question: '२. अद्भिर्गात्राणि शुध्यन्ति ➔ मेलनं कुरुत',
            marks: 2,
            type: 'mcq',
            options: ['(अ) मनः सत्येन शुध्यति।', '(स) विनयेन च।', '(ब) वचने का दरिद्रता।', '(द) कृत्वा यं नावसीदति।'],
            answer: '(अ) मनः सत्येन शुध्यति।',
            explanation: 'अद्भिर्गात्राणि शुध्यन्ति मनः सत्येन शुध्यति।',
          },
          {
            num: 7,
            question: '३. प्रियवाक्यप्रदानेन ➔ मेलनं कुरुत',
            marks: 2,
            type: 'mcq',
            options: ['(ब) वचने का दरिद्रता।', '(अ) मनः सत्येन शुध्यति।', '(स) विनयेन च।', '(द) कृत्वा यं नावसीदति।'],
            answer: '(ब) वचने का दरिद्रता।',
            explanation: 'तस्मात् तदेव वक्तव्यं वचने का दरिद्रता।',
          },
          {
            num: 8,
            question: '४. नास्त्युद्यमसमो बन्धुः ➔ मेलनं कुरुत',
            marks: 2,
            type: 'mcq',
            options: ['(द) कृत्वा यं नावसीदति।', '(अ) मनः सत्येन शुध्यति।', '(ब) वचने का दरिद्रता।', '(स) विनयेन च।'],
            answer: '(द) कृत्वा यं नावसीदति।',
            explanation: 'नास्त्युद्यमसमो बन्धुः कृत्वा यं नावसीदति।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 2: WORKSHEET 2 (रिक्तस्थानपूर्तिः)
  // ==========================================
  {
    id: 'ws-ch2-2',
    title: 'Lesson 2 · Worksheet 2: रिक्तस्थानपूर्तिः (Fill in the Blanks)',
    titleSanskrit: 'द्वितीयः पाठः · अभ्यासपत्रम् २ · रिक्तस्थानपूर्तिः',
    category: 'deep_ch2',
    categoryLabel: 'Lesson 2: नित्यं पिबामः सुभाषितरसम्',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 10,
    timeLimit: '20 Minutes',
    description: 'Fill in blanks from subhashita lines using words from the help box.',
    sections: [
      {
        sectionTitle: 'Fill in the Blanks (रिक्तस्थानपूर्तिः)',
        sectionTitleSanskrit: 'कोष्ठकात् उचितानि पदानि चित्वा रिक्तस्थानानि पूरयन्तु',
        instructions: 'पदानि: [ परोपकारः, जलबिन्दुनिपातेन, पञ्चभिः, रिपुः, सत्येन ]',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'वकारैः ____________________ युक्तो नरो भवति पूजितः।',
            marks: 2,
            type: 'fill',
            answer: 'पञ्चभिः',
            explanation: "'वकारैः पञ्चभिः युक्तो नरो भवति पूजितः' — पञ्चभिः वकारैः।",
          },
          {
            num: 2,
            question: 'मनः ____________________ शुध्यति।',
            marks: 2,
            type: 'fill',
            answer: 'सत्येन',
            explanation: "'मनः सत्येन शुध्यति' — सत्येन मनः पवित्रं भवति।",
          },
          {
            num: 3,
            question: '____________________ क्रमशः पूर्यते घटः।',
            marks: 2,
            type: 'fill',
            answer: 'जलबिन्दुनिपातेन',
            explanation: "'जलबिन्दुनिपातेन क्रमशः पूर्यते घटः'।",
          },
          {
            num: 4,
            question: 'आलस्यं हि मनुष्याणां शरीरस्थो महान् ____________________।',
            marks: 2,
            type: 'fill',
            answer: 'रिपुः',
            explanation: "'शरीरस्थो महान् रिपुः' — रिपुः (शत्रुः)।",
          },
          {
            num: 5,
            question: '____________________ पुण्याय पापाय परपीडनम्।',
            marks: 2,
            type: 'fill',
            answer: 'परोपकारः',
            explanation: "'परोपकारः पुण्याय पापाय परपीडनम्'।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 2: WORKSHEET 3 (आम / न - True or False)
  // ==========================================
  {
    id: 'ws-ch2-3',
    title: 'Lesson 2 · Worksheet 3: आम / न (True or False)',
    titleSanskrit: 'द्वितीयः पाठः · अभ्यासपत्रम् ३ · शुद्ध-अशुद्ध-कथनम् (आम/न)',
    category: 'deep_ch2',
    categoryLabel: 'Lesson 2: नित्यं पिबामः सुभाषितरसम्',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 10,
    timeLimit: '20 Minutes',
    description: 'Determine truth value (आम/न) based on the moral principles in Chapter 2.',
    sections: [
      {
        sectionTitle: 'True or False (आम अथवा न)',
        sectionTitleSanskrit: 'शुद्धानां वाक्यानां समक्षम् "आम" अशुद्धानां च समक्षम् "न" लिखन्तु',
        instructions: 'वाक्यं पठित्वा शुद्धं (आम) वा अशुद्धं (न) इति चिह्नीकुरुत:',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'लोके विनम्रः जनः सम्मानं न प्राप्नोति। [ आम / न ]',
            marks: 2,
            type: 'mcq',
            options: ['आम (Yes)', 'न (No)'],
            answer: 'न',
            explanation: "अशुद्धम् (न)। विनयेन युक्तः जनः सर्वत्र पूजितः सम्मानितः च भवति।",
          },
          {
            num: 2,
            question: 'निद्रा, तन्द्रा, क्रोधः च ऐश्वर्यस्य अवरोधकाः सन्ति। [ आम / न ]',
            marks: 2,
            type: 'mcq',
            options: ['आम (Yes)', 'न (No)'],
            answer: 'आम',
            explanation: "शुद्धम् (आम)। षड् दोषाः (निद्रा, तन्द्रा, भयं, क्रोधः, आलस्यं, दीर्घसूत्रता) भूतिमिच्छता पुरुषेण हातव्याः।",
          },
          {
            num: 3,
            question: 'प्रतिदिनं स्नानेन मनः पवित्रं भवति। [ आम / न ]',
            marks: 2,
            type: 'mcq',
            options: ['आम (Yes)', 'न (No)'],
            answer: 'न',
            explanation: "अशुद्धम् (न)। अद्भिः (जलैः) केवलं गात्राणि (शरीरावयवाः) शुध्यन्ति, मनः तु 'सत्येन' शुध्यति।",
          },
          {
            num: 4,
            question: 'परिश्रमः एव अस्माकं वास्तविकं मित्रं वर्तते। [ आम / न ]',
            marks: 2,
            type: 'mcq',
            options: ['आम (Yes)', 'न (No)'],
            answer: 'आम',
            explanation: "शुद्धम् (आम)। 'नास्त्युद्यमसमो बन्धुः' — उद्यमः (परिश्रमः) एव वास्तविकं मित्रम्।",
          },
          {
            num: 5,
            question: 'अन्यान् पीडनेन पुण्यं भवति। [ आम / न ]',
            marks: 2,
            type: 'mcq',
            options: ['आम (Yes)', 'न (No)'],
            answer: 'न',
            explanation: "अशुद्धम् (न)। 'पापाय परपीडनम्' — अन्येषां पीडनेन पापं भवति, परोपकारेण तु पुण्यं भवति।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 2: WORKSHEET 4 (पर्यायपदावलिः - Synonyms)
  // ==========================================
  {
    id: 'ws-ch2-4',
    title: 'Lesson 2 · Worksheet 4: पर्यायपदावलिः (Synonyms)',
    titleSanskrit: 'द्वितीयः पाठः · अभ्यासपत्रम् ४ · पर्यायपदावलिः',
    category: 'deep_ch2',
    categoryLabel: 'Lesson 2: नित्यं पिबामः सुभाषितरसम्',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 10,
    timeLimit: '20 Minutes',
    description: 'Identify and match Sanskrit synonyms for key terms in the Subhashitas.',
    sections: [
      {
        sectionTitle: 'Synonyms (समानार्थक-पदानि)',
        sectionTitleSanskrit: 'मञ्जूषातः उचितानि पर्यायपदानि चित्वा लिखन्तु',
        instructions: 'मञ्जूषा: [ शरीरम्, शत्रुः, जलैः, सूर्यः, वित्तम् ]',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'वपुः = ____________________',
            marks: 2,
            type: 'fill',
            answer: 'शरीरम्',
            explanation: "'वपुः' इत्यस्य समानार्थकं पदं 'शरीरम्' (देहावयवाः) अस्ति।",
          },
          {
            num: 2,
            question: 'अद्भिः = ____________________',
            marks: 2,
            type: 'fill',
            answer: 'जलैः',
            explanation: "'अद्भिः' (अप्) इत्यस्य पर्यायपदं 'जलैः' (तोयैः) अस्ति।",
          },
          {
            num: 3,
            question: 'धनम् = ____________________',
            marks: 2,
            type: 'fill',
            answer: 'वित्तम्',
            explanation: "'धनम्' इत्यस्य समानार्थकं पदं 'वित्तम्' (सम्पत्तिः) अस्ति।",
          },
          {
            num: 4,
            question: 'दिवाकरः = ____________________',
            marks: 2,
            type: 'fill',
            answer: 'सूर्यः',
            explanation: "'दिवाकरः' इत्यस्य पर्यायपदं 'सूर्यः' (भास्करः) अस्ति।",
          },
          {
            num: 5,
            question: 'रिपुः = ____________________',
            marks: 2,
            type: 'fill',
            answer: 'शत्रुः',
            explanation: "'रिपुः' इत्यस्य समानार्थकं पदं 'शत्रुः' (अरिः) अस्ति।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 2: WORKSHEET 5 (पूर्णवाक्येन उत्तरत)
  // ==========================================
  {
    id: 'ws-ch2-5',
    title: 'Lesson 2 · Worksheet 5: पूर्णवाक्येन उत्तरत (Full Sentence Answers)',
    titleSanskrit: 'द्वितीयः पाठः · अभ्यासपत्रम् ५ · पूर्णवाक्येन उत्तरत',
    category: 'deep_ch2',
    categoryLabel: 'Lesson 2: नित्यं पिबामः सुभाषितरसम्',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 15,
    timeLimit: '30 Minutes',
    description: 'Synthesize complete Sanskrit answers for philosophical and moral questions from Chapter 2.',
    sections: [
      {
        sectionTitle: 'Full Sentence Answers (पूर्णवाक्येन उत्तराणि)',
        sectionTitleSanskrit: 'अधोलिखितानां प्रश्नानां उत्तराणि पूर्णवाक्येन लिखन्तु',
        instructions: 'प्रश्नान् सम्यक् अवबुध्य संस्कृतभाषायां पूर्णवाक्येन उत्तराणि लिखत:',
        totalMarks: 15,
        questions: [
          {
            num: 1,
            question: 'कस्य बुद्धिः नलिनीदलमिव विस्तारिता भवति?',
            marks: 5,
            type: 'short_ans',
            answer: 'यः पठति लिखति पश्यति परिपृच्छति पण्डितान् उपाश्रयति च तस्य बुद्धिः विस्तारिता भवति।',
            explanation: "सुभाषिते उक्तम्: 'पठन् नरो लिखन् पश्यन् परिपृच्छंश्च पण्डितान्। उपाश्रयन्... तस्य धीर्नलिनीदलमिव विस्तारं याति।'",
          },
          {
            num: 2,
            question: 'व्यासस्य वचनद्वयं किम् अस्ति?',
            marks: 5,
            type: 'short_ans',
            answer: "'परोपकारः पुण्याय पापाय परपीडनम्' इति व्यासस्य वचनद्वयम् अस्ति।",
            explanation: "अष्टादशपुराणेषु महर्षि-व्यासस्य वचनद्वयं प्रसिद्धम्: 'परोपकारः पुण्याय पापाय परपीडनम्'।",
          },
          {
            num: 3,
            question: 'भूतिम् इच्छता पुरुषेण के षड् दोषाः हातव्याः?',
            marks: 5,
            type: 'short_ans',
            answer: 'निद्रा, तन्द्रा, भयं, क्रोधः, आलस्यं, दीर्घसूत्रता च एते षड् दोषाः हातव्याः।',
            explanation: "ऐश्वर्यम् इच्छता पुरुषेण षड् दोषाः हातव्याः — 'निद्रा तन्द्रा भयं क्रोध आलस्यं दीर्घसूत्रता'।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 2: GRAMMAR WORKSHEET 1 (तृतीयाविभक्ति-सारणी)
  // ==========================================
  {
    id: 'ws-ch2-g1',
    title: 'Lesson 2 · Grammar Worksheet 1: तृतीयाविभक्ति-सारणी (Declension Table)',
    titleSanskrit: 'द्वितीयः पाठः · व्याकरण-अभ्यासपत्रम् १ · तृतीयाविभक्ति-सारणी',
    category: 'deep_ch2',
    categoryLabel: 'Lesson 2 व्याकरणम्: तृतीयाविभक्तिः',
    grade: 'CBSE Class 7 (व्याकरणम्)',
    totalMarks: 15,
    timeLimit: '30 Minutes',
    description: 'Master the instrumental case (तृतीया विभक्तिः) across masculine, feminine, and neuter noun stems.',
    sections: [
      {
        sectionTitle: 'Instrumental Case Paradigm (तृतीयाविभक्ति-रूपाणि)',
        sectionTitleSanskrit: 'पाठाधारम् अनुसृत्य रिक्तस्थानानि तृतीयाविभक्तेः उचितरूपैः पूरयन्तु',
        instructions: 'यथा: छात्र ➔ छात्रेण | छात्राभ्याम् | छात्रैः',
        totalMarks: 15,
        questions: [
          {
            num: 1,
            question: '१. वृक्ष (पुंल्लिङ्ग) ➔ वृक्षेण | _______________________ | _______________________',
            marks: 3,
            type: 'grammar',
            answer: 'वृक्षाभ्याम्, वृक्षैः',
            explanation: 'अकारान्त-पुंल्लिङ्ग तृतीया रूपाणि: वृक्षेण, वृक्षाभ्याम्, वृक्षैः।',
          },
          {
            num: 2,
            question: '२. लता (स्त्रीलिङ्ग) ➔ _______________________ | लताभ्याम् | _______________________',
            marks: 3,
            type: 'grammar',
            answer: 'लतया, लताभिः',
            explanation: 'आकारान्त-स्त्रीलिङ्ग तृतीया रूपाणि: लतया, लताभ्याम्, लताभिः।',
          },
          {
            num: 3,
            question: '३. देश (पुंल्लिङ्ग) ➔ _______________________ | देशाभ्याम् | _______________________',
            marks: 3,
            type: 'grammar',
            answer: 'देशेन, देशैः',
            explanation: 'अकारान्त-पुंल्लिङ्ग तृतीया रूपाणि: देशेन, देशाभ्याम्, देशैः।',
          },
          {
            num: 4,
            question: '४. सत्य (नपुंसकलिङ्ग) ➔ सत्येन | _______________________ | _______________________',
            marks: 3,
            type: 'grammar',
            answer: 'सत्याभ्याम्, सत्यैः',
            explanation: 'अकारान्त-नपुंसकलिङ्ग तृतीया रूपाणि: सत्येन, सत्याभ्याम्, सत्यैः।',
          },
          {
            num: 5,
            question: '५. विनय (पुंल्लिङ्ग) ➔ _______________________ | विनयाभ्याम् | विनयैः',
            marks: 3,
            type: 'grammar',
            answer: 'विनयेन',
            explanation: 'अकारान्त-पुंल्लिङ्ग तृतीया रूपाणि: विनयेन, विनयाभ्याम्, विनयैः।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 2: GRAMMAR WORKSHEET 2 (पदच्छेदः प्रकृति-प्रत्यय-बोधः च)
  // ==========================================
  {
    id: 'ws-ch2-g2',
    title: 'Lesson 2 · Grammar Worksheet 2: पदच्छेदः प्रकृति-प्रत्यय-बोधः च',
    titleSanskrit: 'द्वितीयः पाठः · व्याकरण-अभ्यासपत्रम् २ · पदच्छेदः प्रकृति-प्रत्यय-बोधः च',
    category: 'deep_ch2',
    categoryLabel: 'Lesson 2 व्याकरणम्: पदच्छेदः',
    grade: 'CBSE Class 7 (व्याकरणम्)',
    totalMarks: 14,
    timeLimit: '30 Minutes',
    description: 'Deconstruct sandhi compounds from the verses and identify case and number for noun forms.',
    sections: [
      {
        sectionTitle: 'Part A: Sandhi & Word Splitting (पदच्छेदः सन्धि-विच्छेदः च)',
        sectionTitleSanskrit: 'भागः (क) · सन्धिं/पदच्छेदं कुरुत',
        instructions: 'सन्धिं विभज्य रिक्तस्थानं पूरयत (Split the combined words):',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'पुरुषेणेह = पुरुषेण + ____________________',
            marks: 2,
            type: 'fill',
            answer: 'इह',
            explanation: 'पुरुषेण + इह = पुरुषेणेह (गुण-सन्धिः: अ + इ = ए)।',
          },
          {
            num: 2,
            question: 'नास्त्युद्यमसमो = न + ____________________ + उद्यमसमः',
            marks: 2,
            type: 'fill',
            answer: 'अस्ति',
            explanation: 'न + अस्ति + उद्यमसमः = नास्त्युद्यमसमो (दीर्घ-सन्धिः + यण्-सन्धिः)।',
          },
          {
            num: 3,
            question: 'हिमाद्रेश्चैव = हिमाद्रेः + ____________________ + ____________________',
            marks: 2,
            type: 'fill',
            answer: 'च + एव',
            explanation: 'हिमाद्रेः + च + एव = हिमाद्रेश्चैव (विसर्ग-सन्धिः + वृद्धि-सन्धिः)।',
          },
        ],
      },
      {
        sectionTitle: 'Part B: Case and Number Identification (विभक्ति-वचन-बोधः)',
        sectionTitleSanskrit: 'भागः (ख) · प्रदत्तपदानां विभक्तिं वचनं च लिखन्तु',
        instructions: 'पदानां कृते का विभक्तिः किं च वचनम् इति स्पष्टं लिखत:',
        totalMarks: 8,
        questions: [
          {
            num: 4,
            question: 'वाचा = ____________________ विभक्तिः, ____________________ वचनम्',
            marks: 2,
            type: 'grammar',
            answer: 'तृतीया विभक्तिः, एकवचनम्',
            explanation: "'वाच्' हलन्त-स्त्रीलिङ्ग शब्दस्य तृतीया-एकवचने 'वाचा' भवति।",
          },
          {
            num: 5,
            question: 'पुराणेषु = ____________________ विभक्तिः, ____________________ वचनम्',
            marks: 2,
            type: 'grammar',
            answer: 'सप्तमी विभक्तिः, बहुवचनम्',
            explanation: "'पुराण' अकारान्त-नपुंसकलिङ्ग शब्दस्य सप्तमी-बहुवचने 'पुराणेषु' भवति।",
          },
          {
            num: 6,
            question: 'मनः = ____________________ विभक्तिः, ____________________ वचनम्',
            marks: 2,
            type: 'grammar',
            answer: 'प्रथमा/द्वितीया विभक्तिः, एकवचनम्',
            explanation: "'मनस्' सकारान्त-नपुंसकलिङ्ग शब्दस्य प्रथमा/द्वितीया-एकवचने 'मनः' भवति।",
          },
          {
            num: 7,
            question: 'पुण्याय = ____________________ विभक्तिः, ____________________ वचनम्',
            marks: 2,
            type: 'grammar',
            answer: 'चतुर्थी विभक्तिः, एकवचनम्',
            explanation: "'पुण्य' अकारान्त-नपुंसकलिङ्ग शब्दस्य चतुर्थी-एकवचने 'पुण्याय' (तादर्थ्ये चतुर्थी) भवति।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 3: WORKSHEET 1 (एकपदेन उत्तरत)
  // ==========================================
  {
    id: 'ws-ch3-1',
    title: 'Lesson 3 · Worksheet 1: एकपदेन उत्तरत (Short Answers)',
    titleSanskrit: 'तृतीयः पाठः · अभ्यासपत्रम् १ · एकपदेन उत्तरत',
    category: 'deep_ch3',
    categoryLabel: 'Lesson 3: मित्राय नमः',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 10,
    timeLimit: '20 Minutes',
    description: 'Provide single-word answers regarding Yogita, park visit, and Surya Namaskara.',
    sections: [
      {
        sectionTitle: 'One Word Answers (एकपदेन उत्तरत)',
        sectionTitleSanskrit: 'अधोलिखितानां प्रश्नानाम् उत्तराणि एकपदेन लिखन्तु',
        instructions: 'प्रश्नान् सम्यक् पठित्वा एकपदेन उत्तरं लिखत:',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'योगिता प्रतिदिनं प्रातः कुत्र गच्छति?',
            marks: 2,
            type: 'short_ans',
            answer: 'उद्यानम्',
            explanation: "योगिता प्रतिदिनं प्रातः पित्रा सह 'उद्यानं' गच्छति।",
          },
          {
            num: 2,
            question: 'सूर्यनमस्कारः कतीनाम् आसनानां समाहारः अस्ति?',
            marks: 2,
            type: 'short_ans',
            answer: 'द्वादशानाम्',
            explanation: 'सूर्यनमस्कारः द्वादशानाम् (12) आसनानां समाहारः अस्ति।',
          },
          {
            num: 3,
            question: 'प्रत्येकस्मात् सूर्यनमस्कारात् पूर्वं किं भवति?',
            marks: 2,
            type: 'short_ans',
            answer: 'एकः मन्त्रः',
            explanation: 'प्रत्येकस्मात् सूर्यनमस्कारात् पूर्वम् एकः मन्त्रः भवति।',
          },
          {
            num: 4,
            question: 'कस्य नमस्कारान् ये कुर्वन्ति दिने दिने तेषां वीर्यं वर्धते?',
            marks: 2,
            type: 'short_ans',
            answer: 'आदित्यस्य (सूर्यस्य)',
            explanation: "'आदित्यस्य नमस्कारान् ये कुर्वन्ति दिने दिने... वीर्यं तेजस्तेषां च जायते।' — आदित्यस्य।",
          },
          {
            num: 5,
            question: 'स्वस्थं शरीरं चेत् कीदृशं मनः भवति?',
            marks: 2,
            type: 'short_ans',
            answer: 'स्वस्थं मनः',
            explanation: "'स्वस्थं शरीरं स्वस्थं मनः च प्राप्नवाम।' — स्वस्थं मनः भवति।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 3: WORKSHEET 2 (रिक्तस्थानपूर्तिः)
  // ==========================================
  {
    id: 'ws-ch3-2',
    title: 'Lesson 3 · Worksheet 2: रिक्तस्थानपूर्तिः (Fill in the Blanks)',
    titleSanskrit: 'तृतीयः पाठः · अभ्यासपत्रम् २ · रिक्तस्थानपूर्तिः',
    category: 'deep_ch3',
    categoryLabel: 'Lesson 3: मित्राय नमः',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 10,
    timeLimit: '20 Minutes',
    description: 'Fill in blanks from lesson dialogues using appropriate words from the help box.',
    sections: [
      {
        sectionTitle: 'Fill in the Blanks (रिक्तस्थानपूर्तिः)',
        sectionTitleSanskrit: 'मञ्जूषातः समुचितं पदं चित्वा रिक्तस्थानानि पूरयन्तु',
        instructions: 'मञ्जूषा: [ मन्त्रः, सूर्यनमस्कारं, मनः, प्रयोजनानि, दिने दिने ]',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'प्रत्येकस्मात् सूर्यनमस्कारात् पूर्वम् एकः _______________ भवति।',
            marks: 2,
            type: 'fill',
            answer: 'मन्त्रः',
            explanation: 'प्रत्येकस्मात् आसनात् पूर्वम् एकः मन्त्रः उच्चार्यते।',
          },
          {
            num: 2,
            question: 'वयं प्रतिदिनं _______________ करवाम।',
            marks: 2,
            type: 'fill',
            answer: 'सूर्यनमस्कारं',
            explanation: 'वयं प्रतिदिनं प्रातः सूर्यनमस्कारं करवाम।',
          },
          {
            num: 3,
            question: 'स्वस्थं शरीरं स्वस्थं _______________ च प्राप्नवाम।',
            marks: 2,
            type: 'fill',
            answer: 'मनः',
            explanation: 'शरीरेण सह स्वस्थं मनः अपि प्राप्यते।',
          },
          {
            num: 4,
            question: 'एकेन श्लोकेन सूर्यनमस्कारस्य बहूनि _______________ वदामि।',
            marks: 2,
            type: 'fill',
            answer: 'प्रयोजनानि',
            explanation: 'आचार्या सूर्यनमस्कारस्य विविधानि प्रयोजनानि (लाभाः) श्लोकेन वर्णयति।',
          },
          {
            num: 5,
            question: 'आदित्यस्य नमस्कारान् ये कुर्वन्ति _______________।',
            marks: 2,
            type: 'fill',
            answer: 'दिने दिने',
            explanation: "'आदित्यस्य नमस्कारान् ये कुर्वन्ति दिने दिने' (प्रतिदिनम्)।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 3: WORKSHEET 3 (मन्त्रक्रम-योजनम्)
  // ==========================================
  {
    id: 'ws-ch3-3',
    title: 'Lesson 3 · Worksheet 3: मन्त्रक्रम-योजनम् (Match Solar Mantras)',
    titleSanskrit: 'तृतीयः पाठः · अभ्यासपत्रम् ३ · मन्त्रक्रम-योजनम्',
    category: 'deep_ch3',
    categoryLabel: 'Lesson 3: मित्राय नमः',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 8,
    timeLimit: '20 Minutes',
    description: 'Match the sequence numbers of the 12 Surya Namaskara mantras correctly.',
    sections: [
      {
        sectionTitle: 'Match Solar Mantras by Order (मन्त्रक्रम-मेलनम्)',
        sectionTitleSanskrit: 'क्रमसङ्ख्यानुसारं सूर्यनमस्कारस्य मन्त्रैः सह उचितं मेलनं कुरुत',
        instructions: '१. प्रथमः मन्त्रः, २. द्वितीयः मन्त्रः, ३. तृतीयः मन्त्रः, ४. चतुर्थः मन्त्रः',
        totalMarks: 8,
        questions: [
          {
            num: 1,
            question: '१. प्रथमः मन्त्रः ➔ उचितं मन्त्रं चिनुत',
            marks: 2,
            type: 'mcq',
            options: ['(ब) ॐ मित्राय नमः', '(द) ॐ रवये नमः', '(स) ॐ सूर्याय नमः', '(अ) ॐ भानवे नमः'],
            answer: '(ब) ॐ मित्राय नमः',
            explanation: 'प्रथमः मन्त्रः: ॐ मित्राय नमः।',
          },
          {
            num: 2,
            question: '२. द्वितीयः मन्त्रः ➔ उचितं मन्त्रं चिनुत',
            marks: 2,
            type: 'mcq',
            options: ['(द) ॐ रवये नमः', '(ब) ॐ मित्राय नमः', '(स) ॐ सूर्याय नमः', '(अ) ॐ भानवे नमः'],
            answer: '(द) ॐ रवये नमः',
            explanation: 'द्वितीयः मन्त्रः: ॐ रवये नमः।',
          },
          {
            num: 3,
            question: '३. तृतीयः मन्त्रः ➔ उचितं मन्त्रं चिनुत',
            marks: 2,
            type: 'mcq',
            options: ['(स) ॐ सूर्याय नमः', '(ब) ॐ मित्राय नमः', '(द) ॐ रवये नमः', '(अ) ॐ भानवे नमः'],
            answer: '(स) ॐ सूर्याय नमः',
            explanation: 'तृतीयः मन्त्रः: ॐ सूर्याय नमः।',
          },
          {
            num: 4,
            question: '४. चतुर्थः मन्त्रः ➔ उचितं मन्त्रं चिनुत',
            marks: 2,
            type: 'mcq',
            options: ['(अ) ॐ भानवे नमः', '(ब) ॐ मित्राय नमः', '(द) ॐ रवये नमः', '(स) ॐ सूर्याय नमः'],
            answer: '(अ) ॐ भानवे नमः',
            explanation: 'चतुर्थः मन्त्रः: ॐ भानवे नमः।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 3: WORKSHEET 4 (श्लोकान्वयः शब्दार्थमेलनं च)
  // ==========================================
  {
    id: 'ws-ch3-4',
    title: 'Lesson 3 · Worksheet 4: श्लोकान्वयः शब्दार्थमेलनं च',
    titleSanskrit: 'तृतीयः पाठः · अभ्यासपत्रम् ४ · श्लोकान्वयः शब्दार्थमेलनं च',
    category: 'deep_ch3',
    categoryLabel: 'Lesson 3: मित्राय नमः',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 10,
    timeLimit: '20 Minutes',
    description: 'Complete the Surya Namaskara shloka and match vocabulary with meanings.',
    sections: [
      {
        sectionTitle: 'Part A: Complete the Verse (श्लोकांशं पूरयत)',
        sectionTitleSanskrit: 'भागः (क) · श्लोकांशं पूरयत',
        instructions: 'आदित्यस्य [_______] ये कुर्वन्ति दिने दिने। आयुः प्रज्ञा बलं वीर्यं [_______] च जायते ॥',
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: 'आदित्यस्य _______________ ये कुर्वन्ति दिने दिने। (रिक्तस्थानं पूरयत)',
            marks: 2,
            type: 'fill',
            answer: 'नमस्कारान्',
            explanation: "'आदित्यस्य नमस्कारान् ये कुर्वन्ति दिने दिने।'",
          },
          {
            num: 2,
            question: 'आयुः प्रज्ञा बलं वीर्यं _______________ च जायते ॥ (रिक्तस्थानं पूरयत)',
            marks: 2,
            type: 'fill',
            answer: 'तेजस्तेषां',
            explanation: "'आयुः प्रज्ञा बलं वीर्यं तेजस्तेषां च जायते ॥'",
          },
        ],
      },
      {
        sectionTitle: 'Part B: Match Words with Meanings (शब्दार्थ-मेलनम्)',
        sectionTitleSanskrit: 'भागः (ख) · उचितं शब्दार्थं मेलयत',
        instructions: 'प्रदत्तशब्दानां शुद्धम् अर्थं चिनुत:',
        totalMarks: 6,
        questions: [
          {
            num: 3,
            question: 'तेजः ➔ उचितम् अर्थं चिनुत',
            marks: 2,
            type: 'mcq',
            options: ['दीप्तिः (काङ्क्ष/Glow)', 'बुद्धिः'],
            answer: 'दीप्तिः',
            explanation: "'तेजः' इत्यस्य अर्थः कान्तिः, दीप्तिः, प्रतापः वा भवति।",
          },
          {
            num: 4,
            question: 'स्वस्थम् ➔ उचितम् अर्थं चिनुत',
            marks: 2,
            type: 'mcq',
            options: ['नीरोगम् (Healthy)', 'अस्वस्थम्'],
            answer: 'नीरोगम्',
            explanation: "'स्वस्थम्' इत्यस्य अर्थः नीरोगं, रोगमुक्तं शरीरम्।",
          },
          {
            num: 5,
            question: 'खगः ➔ उचितम् अर्थं चिनुत',
            marks: 2,
            type: 'mcq',
            options: ['सूर्यः (Sky-mover)', 'वायुः'],
            answer: 'सूर्यः',
            explanation: "'खे (आकाशे) गच्छति इति खगः' — सूर्यस्य पक्षिकस्य वा नाम। मन्त्रे: ॐ खगाय नमः (सूर्यः)।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 3: WORKSHEET 5 (पूर्णवाक्येन उत्तरत)
  // ==========================================
  {
    id: 'ws-ch3-5',
    title: 'Lesson 3 · Worksheet 5: पूर्णवाक्येन उत्तरत (Long Answers)',
    titleSanskrit: 'तृतीयः पाठः · अभ्यासपत्रम् ५ · पूर्णवाक्येन उत्तरत',
    category: 'deep_ch3',
    categoryLabel: 'Lesson 3: मित्राय नमः',
    grade: 'CBSE Class 7 (दीपकम)',
    totalMarks: 15,
    timeLimit: '30 Minutes',
    description: 'Write complete sentences explaining benefits of Surya Namaskara, Yoga Sutras, and qualities of virtuous people.',
    sections: [
      {
        sectionTitle: 'Long Answers (पूर्णवाक्येन उत्तराणि)',
        sectionTitleSanskrit: 'अधोलिखितानां प्रश्नानाम् उत्तराणि पूर्णवाक्येन लिखन्तु',
        instructions: 'संस्कृतभाषायां पूर्णवाक्येन उत्तराणि लिखत:',
        totalMarks: 15,
        questions: [
          {
            num: 1,
            question: 'सूर्यनमस्कारेण कीदृशं बलं वर्धते?',
            marks: 5,
            type: 'short_ans',
            answer: 'सूर्यनमस्कारेण शारीरिकं, मानसिकम्, आध्यात्मिकं च बलं वर्धते।',
            explanation: 'सूर्यनमस्कारः समग्रशरीरस्य मनसः च विकासं कृत्वा त्रिविधं बलं ददाति।',
          },
          {
            num: 2,
            question: "'योगसूत्रम्' कस्य रचना अस्ति तथा च तत्र कति सूत्राणि सन्ति?",
            marks: 5,
            type: 'short_ans',
            answer: "'योगसूत्रम्' महर्षेः पतञ्जलेः रचना अस्ति, अस्मिन् च १९६ सूत्राणि सन्ति।",
            explanation: 'महर्षिणा पतञ्जलिना योगसूत्रम् विरचितम् यत्र आहत्य १९६ सूत्राणि सन्ति।',
          },
          {
            num: 3,
            question: 'साधोः विद्या, धनं, शक्तिः च किमर्थं भवति?',
            marks: 5,
            type: 'short_ans',
            answer: 'साधोः विद्या ज्ञानाय, धनं दानाय, शक्तिः च रक्षणाय भवति।',
            explanation: "'विद्या विवादाय धनं मदाय... ज्ञानाय दानाय च रक्षणाय' — साधोः विद्या ज्ञानाय, धनं दानाय, शक्तिः रक्षणाय।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 3: GRAMMAR WORKSHEET 1 (चतुर्थीविभक्ति-सारणी शब्दरूपाणि च)
  // ==========================================
  {
    id: 'ws-ch3-g1',
    title: 'Lesson 3 · Grammar Worksheet 1: चतुर्थीविभक्ति-सारणी शब्दरूपाणि च',
    titleSanskrit: 'तृतीयः पाठः · व्याकरण-अभ्यासपत्रम् १ · चतुर्थीविभक्ति-सारणी शब्दरूपाणि च',
    category: 'deep_ch3',
    categoryLabel: 'Lesson 3 व्याकरणम्: चतुर्थी विभक्तिः',
    grade: 'CBSE Class 7 (व्याकरणम्)',
    totalMarks: 15,
    timeLimit: '30 Minutes',
    description: 'Master Dative case declension paradigms across masculine, feminine, and neuter noun stems.',
    sections: [
      {
        sectionTitle: 'Dative Case Table (चतुर्थीविभक्ति-रूपाणि)',
        sectionTitleSanskrit: 'कोष्ठकानुसारं रिक्तस्थानानि चतुर्थी-विभक्तेः रूपैः पूरयन्तु',
        instructions: 'एकवचनम्, द्विवचनम्, बहुवचनम् च पूरयत:',
        totalMarks: 15,
        questions: [
          {
            num: 1,
            question: '१. अकारान्त-पुंलिङ्गम् (भक्त) ➔ भक्ताय | ___________________ | भक्तेभ्यः',
            marks: 3,
            type: 'grammar',
            answer: 'भक्ताभ्याम्',
            explanation: 'भक्त शब्दस्य चतुर्थी रूपाणि: भक्ताय, भक्ताभ्याम्, भक्तेभ्यः।',
          },
          {
            num: 2,
            question: '२. आकारान्त-स्त्रीलिङ्गम् (सेविका) ➔ ___________________ | सेविकाभ्याम् | ___________________',
            marks: 3,
            type: 'grammar',
            answer: 'सेविकायै, सेविकाभ्यः',
            explanation: 'सेविका शब्दस्य चतुर्थी रूपाणि: सेविकायै, सेविकाभ्याम्, सेविकाभ्यः।',
          },
          {
            num: 3,
            question: '३. अकारान्त-नपुंसकलिङ्गम् (आसन) ➔ आसनाय | आसनाभ्याम् | ___________________',
            marks: 3,
            type: 'grammar',
            answer: 'आसनेभ्यः',
            explanation: 'आसन शब्दस्य चतुर्थी रूपाणि: आसनाय, आसनाभ्याम्, आसनेभ्यः।',
          },
          {
            num: 4,
            question: '४. ईकारान्त-स्त्रीलिङ्गम् (कुमारी) ➔ कुमार्यै | ___________________ | कुमारीभ्यः',
            marks: 3,
            type: 'grammar',
            answer: 'कुमारीभ्याम्',
            explanation: 'कुमारी शब्दस्य चतुर्थी रूपाणि: कुमार्यै, कुमारीभ्याम्, कुमारीभ्यः।',
          },
          {
            num: 5,
            question: '५. अकारान्त-पुंलिङ्गम् (मित्र) ➔ ___________________ | मित्राभ्याम् | मित्रेभ्यः',
            marks: 3,
            type: 'grammar',
            answer: 'मित्राय',
            explanation: 'मित्र शब्दस्य चतुर्थी रूपाणि: मित्राय, मित्राभ्याम्, मित्रेभ्यः।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 3: GRAMMAR WORKSHEET 2 ('नमः' वाक्यरचना दानक्रिया च)
  // ==========================================
  {
    id: 'ws-ch3-g2',
    title: "Lesson 3 · Grammar Worksheet 2: 'नमः' वाक्यरचना दानक्रिया च",
    titleSanskrit: "तृतीयः पाठः · व्याकरण-अभ्यासपत्रम् २ · 'नमः' वाक्यरचना दानक्रिया च",
    category: 'deep_ch3',
    categoryLabel: 'Lesson 3 व्याकरणम्: उपपद-चतुर्थी',
    grade: 'CBSE Class 7 (व्याकरणम्)',
    totalMarks: 12,
    timeLimit: '25 Minutes',
    description: "Construct sentences using 'Namaḥ' (चतुर्थी विभक्तिः) and apply dative cases with verbs of giving (दा/यच्छ्).",
    sections: [
      {
        sectionTitle: "Part A: Sentence Framing with 'Namaḥ' ('नमः' प्रयुज्य वाक्यरचना)",
        sectionTitleSanskrit: "भागः (क) · 'नमः' प्रयुज्य वाक्यानि रचयत",
        instructions: "यथा: अग्नि ➔ अग्नये नमः।",
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'आचार्या ➔ __________________________________________________',
            marks: 2,
            type: 'grammar',
            answer: 'आचार्यायै नमः।',
            explanation: "आचार्या (आकारान्त-स्त्रीलिङ्ग) चतुर्थी एकवचने 'आचार्यायै' भवति (आचार्यायै नमः)।",
          },
          {
            num: 2,
            question: 'जनकः ➔ __________________________________________________',
            marks: 2,
            type: 'grammar',
            answer: 'जनकाय नमः।',
            explanation: "जनक (अकारान्त-पुंल्लिङ्ग) चतुर्थी एकवचने 'जनकाय' भवति (जनकाय नमः)।",
          },
          {
            num: 3,
            question: 'जननी ➔ __________________________________________________',
            marks: 2,
            type: 'grammar',
            answer: 'जनन्यै नमः।',
            explanation: "जननी (ईकारान्त-स्त्रीलिङ्ग) चतुर्थी एकवचने 'जनन्यै' भवति (जनन्यै नमः)।",
          },
        ],
      },
      {
        sectionTitle: 'Part B: Dative Case in Giving Verbs (दानक्रियायां चतुर्थीप्रयोगः)',
        sectionTitleSanskrit: 'भागः (ख) · कोष्ठकस्थानां शब्दान् चतुर्थीविभक्तौ परिवर्तयत',
        instructions: 'कोष्ठके दत्तेभ्यः शब्देभ्यः चतुर्थीविभक्तेः उचितरूपेण रिक्तस्थानं पूरयत:',
        totalMarks: 6,
        questions: [
          {
            num: 4,
            question: 'सैनिकः (देश) _______________ जीवनं प्रयच्छति।',
            marks: 2,
            type: 'fill',
            answer: 'देशाय',
            explanation: "देश (अकारान्त पुंल्लिङ्ग) चतुर्थी एकवचने 'देशाय' भवति।",
          },
          {
            num: 5,
            question: 'अहं (भगिनी) _______________ उपायनं ददामि।',
            marks: 2,
            type: 'fill',
            answer: 'भगिन्यै',
            explanation: "भगिनी (ईकारान्त स्त्रीलिङ्ग) चतुर्थी एकवचने 'भगिन्यै' भवति।",
          },
          {
            num: 6,
            question: 'त्वं (मित्र) _______________ पुष्पं ददासि।',
            marks: 2,
            type: 'fill',
            answer: 'मित्राय',
            explanation: "मित्र (अकारान्त पुंल्लिङ्ग/नपुंसकलिङ्ग) चतुर्थी एकवचने 'मित्राय' भवति।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 4: न लभ्यते चेत् आम्लं द्राक्षाफलम् (7 WORKSHEETS)
  // ==========================================

// --- Worksheet 1: एकपदेन उत्तरत श्लोकांशमेलनं च ---
  {
    id: 'ws-ch8-1',
    title: 'Worksheet 1: एकपदेन उत्तरत श्लोकांशमेलनं च (One Word & Matching)',
    titleSanskrit: 'कार्यपत्रकम् १: एकपदेन उत्तरत श्लोकांशमेलनं च',
    category: 'deep_ch8',
    categoryLabel: 'Lesson 8: हितं मनोहारि च दुर्लभं वचः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 9,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् १ — पाठस्य आधारेण एकपदेन उत्तरत तथा सूक्तीनां श्लोकांशमेलनं कुर्वन्तु।',
    sections: [
      {
        sectionTitle: 'भागः (क) – अधोलिखितानां प्रश्नानाम् एकपदेन उत्तरं लिखन्तु (Answer in one word) [92]',
        sectionTitleSanskrit: 'भागः (क) · अधोलिखितानां प्रश्नानाम् एकपदेन उत्तरं लिखन्तु',
        instructions: 'अधोलिखितानां प्रश्नानाम् उत्तराणि एकपदेन लिखन्तु:',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: 'सर्वेषां मनुष्याणां माता का अस्ति? [92]',
            marks: 1,
            type: 'short_ans',
            answer: 'भूमिः (पृथिवी)',
            explanation: "'माता भूमिः पुत्रोऽहं पृथिव्याः' — अस्याः पृथिव्याः वयं सर्वे सन्तानाः स्मः।",
          },
          {
            num: 2,
            question: 'आद्यं धर्मसाधनं किम् अस्ति? [87, 92]',
            marks: 1,
            type: 'short_ans',
            answer: 'शरीरम्',
            explanation: "'शरीरमाद्यं खलु धर्मसाधनम्' — धर्मस्य प्रथमं प्रधानं साधनं शरीरमेव अस्ति।",
          },
          {
            num: 3,
            question: 'मनुष्यस्य परं (श्रेष्ठम्) भूषणं किम्? [90, 92]',
            marks: 1,
            type: 'short_ans',
            answer: 'शीलम् (सदाचारः)',
            explanation: "'शीलं परं भूषणम्' — उत्तमः सदाचारः चरित्रं च परम् आभूषणम् अस्ति।",
          },
          {
            num: 4,
            question: 'रत्नानाम् अन्वेषणं के कुर्वन्ति? [86, 92]',
            marks: 1,
            type: 'short_ans',
            answer: 'ग्राहकाः / गुणज्ञाः',
            explanation: "'न रत्नमन्विष्यति, मृग्यते हि तत्' — ग्राहकाः गुणज्ञाः च रत्नानाम् अन्वेषणं कुर्वन्ति।",
          },
          {
            num: 5,
            question: 'कीदृशं वचः संसारे दुर्लभं भवति? [90]',
            marks: 1,
            type: 'short_ans',
            answer: 'हितं मनोहारि च',
            explanation: "'हितं मनोहारि च दुर्लभं वचः' — यत् वचनं कल्याणकरं श्रवणमधुरं च युगपत् स्यात् तादृशं वचनं दुर्लभम्।",
          },
        ],
      },
      {
        sectionTitle: 'भागः (ख) – पाठाधारेण सूक्तीनां यथोचितं मेलनं कुर्वन्तु (Match the maxims correctly) [93]',
        sectionTitleSanskrit: 'भागः (ख) · पाठाधारेण सूक्तीनां यथोचितं मेलनं कुर्वन्तु',
        instructions: 'स्तम्भयोः यथोचितं मेलनं कुर्वन्तु:\nस्तम्भः \'क\' | स्तम्भः \'ख\'\n१. शरीरमाद्यं खलु | (अ) दुर्लभं वचः।\n२. सुखार्थिनः कुतो | (ब) पुत्रोऽहं पृथिव्याः।\n३. माता भूमिः | (स) धर्मसाधनम्।\n४. हितं मनोहारि च | (द) विद्या।',
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: '१. शरीरमाद्यं खलु ➔ ?',
            marks: 1,
            type: 'matching',
            answer: '(स) धर्मसाधनम्।',
            explanation: "'शरीरमाद्यं खलु धर्मसाधनम्' (कुमारसम्भवम् ५.३३)",
          },
          {
            num: 2,
            question: '२. सुखार्थिनः कुतो ➔ ?',
            marks: 1,
            type: 'matching',
            answer: '(द) विद्या।',
            explanation: "'सुखार्थिनः कुतो विद्या कुतो विद्यार्थिनः सुखम्' (महाभारतम्)",
          },
          {
            num: 3,
            question: '३. माता भूमिः ➔ ?',
            marks: 1,
            type: 'matching',
            answer: '(ब) पुत्रोऽहं पृथिव्याः।',
            explanation: "'माता भूमिः पुत्रोऽहं पृथिव्याः' (अथर्ववेदः १२.१.१२)",
          },
          {
            num: 4,
            question: '४. हितं मनोहारि च ➔ ?',
            marks: 1,
            type: 'matching',
            answer: '(अ) दुर्लभं वचः।',
            explanation: "'हितं मनोहारि च दुर्लभं वचः' (किरातार्जुनीयम् १.४)",
          },
        ],
      },
    ],
  },

  // --- Worksheet 2: रिक्तस्थानपूर्तिः ---
  {
    id: 'ws-ch8-2',
    title: 'Worksheet 2: रिक्तस्थानपूर्तिः (Fill in the Blanks)',
    titleSanskrit: 'कार्यपत्रकम् २: रिक्तस्थानपूर्तिः',
    category: 'deep_ch8',
    categoryLabel: 'Lesson 8: हितं मनोहारि च दुर्लभं वचः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् २ — पाठस्य आधारेण मञ्जूषातः उचितानि पदानि चित्वा रिक्तस्थानानि पूरयन्तु।',
    sections: [
      {
        sectionTitle: 'रिक्तस्थानपूर्तिः (Fill in the blanks)',
        sectionTitleSanskrit: 'मञ्जूषातः पदानि चित्वा रिक्तस्थानानि पूरयन्तु',
        instructions: 'पाठस्य आधारेण मञ्जूषातः उचितानि पदानि चित्वा रिक्तस्थानानि पूरयन्तु: [मञ्जूषा: पूजास्थानं, क्रियावान्, शीलम्, क्षणशः, मृग्यते]',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: 'रत्नं न अन्विष्यति, तत् ____________________ हि। [86]',
            marks: 1,
            type: 'fill',
            answer: 'मृग्यते',
            explanation: "'न रत्नमन्विष्यति, मृग्यते हि तत्' — रत्नं ग्राहकं न अन्विष्यति, अपितु तत् मृग्यते (ढूँढ़ा जाता है)।",
          },
          {
            num: 2,
            question: '____________________ कन्था च, विद्याम् अर्थं च साधयेत्। [88]',
            marks: 1,
            type: 'fill',
            answer: 'क्षणशः',
            explanation: "'क्षणशः कणशश्चैव विद्यामर्थं च साधयेत्' — प्रत्येकं क्षणं विद्यायाः कृते साधयेत्।",
          },
          {
            num: 3,
            question: 'गुणिषु गुणाः एव ____________________ भवन्ति। [88]',
            marks: 1,
            type: 'fill',
            answer: 'पूजास्थानं',
            explanation: "'गुणाः पूजास्थानं गुणिषु न च लिङ्गं न च वयः' — गुणिजनेषु गुणाः एव आदरस्य कारणम्।",
          },
          {
            num: 4,
            question: 'यस्तु ____________________ पुरुषः स विद्वान्। [89]',
            marks: 1,
            type: 'fill',
            answer: 'क्रियावान्',
            explanation: "'यस्तु क्रियावान् पुरुषः स विद्वान्' — ज्ञानस्य व्यवहारे आचरणकर्ता एव विद्वान्।",
          },
          {
            num: 5,
            question: '____________________ परं भूषणम्। [90]',
            marks: 1,
            type: 'fill',
            answer: 'शीलम्',
            explanation: "'शीलं परं भूषणम्' — उत्तमं शीलम् (चरित्रम्) एव मनुष्यस्य श्रेष्ठम् आभूषणम्।",
          },
        ],
      },
    ],
  },

  // --- Worksheet 3: सूक्ति-स्रोत-परिचयः ---
  {
    id: 'ws-ch8-3',
    title: 'Worksheet 3: सूक्ति-स्रोत-परिचयः (Source Matching Study)',
    titleSanskrit: 'कार्यपत्रकम् ३: सूक्ति-स्रोत-परिचयः',
    category: 'deep_ch8',
    categoryLabel: 'Lesson 8: हितं मनोहारि च दुर्लभं वचः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 4,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् ३ — योग्यताविस्तरस्य आधारेण सूक्तीनां ग्रन्थेन/लेखकेन सह उचितं मेलनं कुर्वन्तु।',
    sections: [
      {
        sectionTitle: 'सूक्ति-स्रोत-परिचयः (Source Matching Study)',
        sectionTitleSanskrit: 'योग्यताविस्ताराधारेण ग्रन्थेन/लेखकेन सह मेलनं कुर्वन्तु',
        instructions: "'योग्यताविस्तरः' [95] भागस्य आधारेण सूक्तीनां ग्रन्थेन/लेखकेन सह उचितं मेलनं कुरुत:\nसूक्तिः / ग्रन्थविशेषः | रचयिता / ग्रन्थः\n१. 'हितं मनोहारि च दुर्लभं वचः' | (अ) उत्तररामचरितम् (भवभूतिः)\n२. नीतिशतकम् ग्रन्थस्य लेखकः | (ब) किरातार्जुनीयम् (महाकविः भारविः)\n३. शिवपार्वत्योः विवाहस्य कथा | (स) उज्जयिन्याः नृपः भर्तृहरिः\n४. श्रीरामस्य राज्याभिषेकोत्तरं चरितम् | (द) कुमारसम्भवम् (कालिदासः)",
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: "१. 'हितं मनोहारि च दुर्लभं वचः' ➔ ?",
            marks: 1,
            type: 'matching',
            answer: '(ब) किरातार्जुनीयम् (महाकविः भारविः)',
            explanation: 'भारविप्रणीते किरातार्जुनीये महाकाव्ये एषा सूक्तिः प्राप्यते।',
          },
          {
            num: 2,
            question: '२. नीतिशतकम् ग्रन्थस्य लेखकः ➔ ?',
            marks: 1,
            type: 'matching',
            answer: '(स) उज्जयिन्याः नृपः भर्तृहरिः',
            explanation: 'नीतिशतकस्य रचयिता उज्जयिन्याः राजा भर्तृहरिः अस्ति।',
          },
          {
            num: 3,
            question: '३. शिवपार्वत्योः विवाहस्य कथा ➔ ?',
            marks: 1,
            type: 'matching',
            answer: '(द) कुमारसम्भवम् (कालिदासः)',
            explanation: 'महाकविना कालिदासेन विरचिते कुमारसम्भवे महाकाव्ये शिवपार्वत्योः विवाहस्य वर्णनम् अस्ति।',
          },
          {
            num: 4,
            question: '४. श्रीरामस्य राज्याभिषेकोत्तरं चरितम् ➔ ?',
            marks: 1,
            type: 'matching',
            answer: '(अ) उत्तररामचरितम् (भवभूतिः)',
            explanation: 'भवभूतिप्रणीते उत्तररामचरितम् नाटके श्रीरामस्य राज्याभिषेकोत्तरं सीतापरित्यागादिरूपं चरितं वर्णिम्।',
          },
        ],
      },
    ],
  },

  // --- Worksheet 4: आम / न ---
  {
    id: 'ws-ch8-4',
    title: "Worksheet 4: 'आम्' अथवा 'न' लिखत (True or False)",
    titleSanskrit: "कार्यपत्रकम् ४: 'आम्' अथवा 'न' लिखत",
    category: 'deep_ch8',
    categoryLabel: 'Lesson 8: हितं मनोहारि च दुर्लभं वचः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '15 mins',
    description: "अभ्यासपत्रकम् ४ — शुद्धवाक्यानां समक्षम् 'आम्' (Yes) अशुद्धवाक्यानां समक्षम् 'न' (No) लिखन्तु।",
    sections: [
      {
        sectionTitle: "सत्यासत्य-निर्णयः ('आम्' / 'न')",
        sectionTitleSanskrit: "सत्यतानुसारं 'आम्' अथवा 'न' लिखन्तु",
        instructions: "शुद्धवाक्यानां समक्षम् 'आम्' (Yes) अशुद्धवाक्यानां समक्षम् 'न' (No) लिखन्तु [92]:",
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'वयं सर्वे पृथिव्याः पुत्राः पुत्र्यः च स्मः। [_______]',
            marks: 1,
            type: 'short_ans',
            answer: 'आम्',
            explanation: "'माता भूमिः पुत्रोऽहं पृथिव्याः' — भूमिः अस्माकं माता, वयं सर्वे अस्याः पुत्राः पुत्र्यः च स्मः।",
          },
          {
            num: 2,
            question: 'हीरकादीनि रत्नानि ग्राहकस्य अन्वेषणं कुर्वन्ति। [_______]',
            marks: 1,
            type: 'short_ans',
            answer: 'न',
            explanation: "'न रत्नमन्विष्यति, मृग्यते हि तत्' — रत्नं ग्राहकं न अन्विष्यति, अपितु ग्राहकः एव रत्नम् अन्विष्यति।",
          },
          {
            num: 3,
            question: 'स्वस्थं शरीरं विना वयं स्वकर्तव्यस्य पालनं कर्तुं शक्नुमः। [_______]',
            marks: 1,
            type: 'short_ans',
            answer: 'न',
            explanation: "'शरीरमाद्यं खलु धर्मसाधनम्' — स्वस्थशरीरेण विना कर्तव्यपालनं न सम्भवति।",
          },
          {
            num: 4,
            question: 'ज्ञानं प्राप्तुं समयस्य एकस्यापि क्षणस्य नाशः न करणीयः। [_______]',
            marks: 1,
            type: 'short_ans',
            answer: 'आम्',
            explanation: "'क्षणशः कणशश्चैव विद्यामर्थं च साधयेत्' — प्रत्येकं क्षणं विद्यार्जनार्थम् उपयोक्तव्यम्।",
          },
          {
            num: 5,
            question: 'आदरस्य कृते मनुष्याणाम् आयुः लिङ्गं वा महत्त्वपूर्णं भवति। [_______]',
            marks: 1,
            type: 'short_ans',
            answer: 'न',
            explanation: "'गुणाः पूजास्थानं गुणिषु न च लिङ्गं न च वयः' — गुणिजनेषु केवलं गुणानाम् आदरः भवति, वयसः लिङ्गस्य वा न।",
          },
          {
            num: 6,
            question: 'अर्जितस्य ज्ञानस्य जीवने आचरणं विना विद्या व्यर्था भवति। [_______]',
            marks: 1,
            type: 'short_ans',
            answer: 'आम्',
            explanation: "'यस्तु क्रियावान् पुरुषः स विद्वान्' — आचरणं विना ज्ञानं भाररूपं व्यर्थं च भवति।",
          },
        ],
      },
    ],
  },

  // --- Worksheet 5: पूर्णवाक्येन उत्तरत ---
  {
    id: 'ws-ch8-5',
    title: 'Worksheet 5: पूर्णवाक्येन उत्तरत (Answer in full sentences)',
    titleSanskrit: 'कार्यपत्रकम् ५: पूर्णवाक्येन उत्तरत',
    category: 'deep_ch8',
    categoryLabel: 'Lesson 8: हितं मनोहारि च दुर्लभं वचः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् ५ — अधोलिखितानां प्रश्नानाम् उत्तराणि पूर्णवाक्येन लिखन्तु।',
    sections: [
      {
        sectionTitle: 'पूर्णवाक्येन उत्तरत (Answer in full sentences)',
        sectionTitleSanskrit: 'अधोलिखितानां प्रश्नानाम् उत्तराणि पूर्णवाक्येन लिखन्तु',
        instructions: 'अधोलिखितानां प्रश्नानाम् उत्तराणि पूर्णवाक्येन लिखन्तु [92, 93]:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'वास्तविकः विद्वान् कः कथ्यते?',
            marks: 2,
            type: 'short_ans',
            answer: 'यः पुरुषः क्रियावान् (अर्थात् शास्त्रोक्तं ज्ञानं व्यवहारे आचरति), सः एव वास्तविकः विद्वान् कथ्यते।',
            explanation: "'यस्तु क्रियावान् पुरुषः स विद्वान्' — केवलं पठनेन न, अपितु ज्ञानानुसारम् आचरणवान् जनः एव वास्तविकः विद्वान्।",
          },
          {
            num: 2,
            question: 'कः मनुष्यः विद्यां प्राप्तुं न शक्नोति?',
            marks: 2,
            type: 'short_ans',
            answer: 'यः मनुष्यः सुखम् इच्छति (सुखार्थी भवति), सः विद्यां प्राप्तुं न शक्नोति।',
            explanation: "'सुखार्थिनः कुतो विद्या' — सुखम् इच्छन् जनः विद्याम् अर्जयितुं न शक्नोति।",
          },
          {
            num: 3,
            question: '"हितं मनोहारि च दुर्लभं वचः" इत्यस्य सूक्तेः कः भावार्थः अस्ति?',
            marks: 2,
            type: 'short_ans',
            answer: 'अस्याः सूक्तेः भावार्थः अस्ति यत् संसारे तादृशाः जनाः विरलाः सन्ति ये कल्याणकारि (हितकरं) तथा च श्रवणमधुरं (मनोहारि) वचनं युगपत् वदन्ति।',
            explanation: "'हितं मनोहारि च दुर्लभं वचः' — हितैषि वचनं प्रायः श्रोतुं कटु भवति, मधुरं च वचनं प्रायः अहितकरं भवति, अतः उभयगुणयुक्तं वचनं संसारे अत्यन्तं दुर्लभम् अस्ति।",
          },
        ],
      },
    ],
  },

  // --- Grammar Worksheet 1: समानार्थकपदानि एवं विलोमपदानि ---
  {
    id: 'ws-ch8-g1',
    title: 'Grammar Worksheet 1: समानार्थकपदानि एवं विलोमपदानि (Synonyms & Antonyms)',
    titleSanskrit: 'व्याकरण-कार्यपत्रिका १: समानार्थकपदानि एवं विलोमपदानि',
    category: 'deep_ch8',
    categoryLabel: 'Lesson 8 व्याकरणम्: समानार्थक-विलोमपदानि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 11,
    timeLimit: '20 mins',
    description: 'व्याकरण-अभ्यासपत्रकम् १ — पाठात् चित्वा समानार्थकपदानि तथा मञ्जूषातः उचितं विलोमपदं लिखन्तु।',
    sections: [
      {
        sectionTitle: 'प्रश्न १: पाठात् चित्वा अधोलिखितानां पदानां समानार्थकपदानि लिखत (Synonyms)',
        sectionTitleSanskrit: 'प्रश्न १ · पाठात् चित्वा समानार्थकपदानि लिखन्तु',
        instructions: 'पाठात् चित्वा अधोलिखितानां पदानां समानार्थकपदानि लिखन्तु:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: '(क) सुतः = ____________________',
            marks: 1,
            type: 'short_ans',
            answer: 'पुत्रः',
            explanation: 'सुतः = पुत्रः / आत्मजः।',
          },
          {
            num: 2,
            question: '(ख) प्रथमम् = ____________________',
            marks: 1,
            type: 'short_ans',
            answer: 'आद्यम्',
            explanation: 'प्रथमम् = आद्यम्।',
          },
          {
            num: 3,
            question: '(ग) धनम् = ____________________',
            marks: 1,
            type: 'short_ans',
            answer: 'अर्थम् (वित्तम्)',
            explanation: 'धनम् = अर्थम् / वित्तम्।',
          },
          {
            num: 4,
            question: '(घ) अवस्था = ____________________',
            marks: 1,
            type: 'short_ans',
            answer: 'वयः',
            explanation: 'अवस्था = वयः / आयुः।',
          },
          {
            num: 5,
            question: '(ङ) वचनम् = ____________________',
            marks: 1,
            type: 'short_ans',
            answer: 'वचः (वचनम्)',
            explanation: 'वचनम् = वचः।',
          },
          {
            num: 6,
            question: '(च) आचरणम् = ____________________',
            marks: 1,
            type: 'short_ans',
            answer: 'शीलम् (चरित्रम्)',
            explanation: 'आचरणम् = शीलम् / चरित्रम्।',
          },
        ],
      },
      {
        sectionTitle: 'प्रश्न २: पाठाधारेण उचितं विलोमपदं मञ्जूषायाः चित्वा लिखत (Antonyms)',
        sectionTitleSanskrit: 'प्रश्न २ · मञ्जूषातः उचितं विलोमपदं चित्वा लिखन्तु',
        instructions: 'पाठाधारेण उचितं विलोमपदं मञ्जूषायाः चित्वा लिखन्तु: [मञ्जूषा: सुखम्, सुलभम्, अविद्याम्, विद्वान्, वृद्धः]',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: '(क) दुर्लभम्  ×  ____________________',
            marks: 1,
            type: 'fill',
            answer: 'सुलभम्',
            explanation: 'दुर्लभम् (कठिनता से प्राप्त) × सुलभम् (सरलता से प्राप्त)।',
          },
          {
            num: 2,
            question: '(ख) बालः  ×  ____________________',
            marks: 1,
            type: 'fill',
            answer: 'वृद्धः',
            explanation: 'बालः (बालकः) × वृद्धः।',
          },
          {
            num: 3,
            question: '(ग) विद्याम्  ×  ____________________',
            marks: 1,
            type: 'fill',
            answer: 'अविद्याम्',
            explanation: 'विद्याम् × अविद्याम्।',
          },
          {
            num: 4,
            question: '(घ) दुःखम्  ×  ____________________',
            marks: 1,
            type: 'fill',
            answer: 'सुखम्',
            explanation: 'दुःखम् × सुखम्।',
          },
          {
            num: 5,
            question: '(ङ) मूर्खः  ×  ____________________',
            marks: 1,
            type: 'fill',
            answer: 'विद्वान्',
            explanation: 'मूर्खः × विद्वान्।',
          },
        ],
      },
    ],
  },

  // --- Grammar Worksheet 2: मकारलेखनम् एवं प्रश्ननिर्माणम् ---
  {
    id: 'ws-ch8-g2',
    title: 'Grammar Worksheet 2: मकारलेखनम् एवं प्रश्ननिर्माणम् (Anusvara Rules & Question Framing)',
    titleSanskrit: 'व्याकरण-कार्यपत्रिका २: मकारलेखनम् एवं प्रश्ननिर्माणम्',
    category: 'deep_ch8',
    categoryLabel: 'Lesson 8 व्याकरणम्: मकारलेखनम् एवं प्रश्ननिर्माणम्',
    grade: 'Class 7 (CBSE)',
    totalMarks: 9,
    timeLimit: '20 mins',
    description: 'व्याकरण-अभ्यासपत्रकम् २ — स्वर-व्यञ्जन-नियमानुसारेण मकारलेखनम् तथा रेखाङ्कितपदानि आधृत्य प्रश्ननिर्माणम्।',
    sections: [
      {
        sectionTitle: 'प्रश्न १: कोष्ठकात् शुद्धं पदं चित्वा रिक्तस्थानानि पूरयत (Ma-kar rules)',
        sectionTitleSanskrit: 'प्रश्न १ · कोष्ठकात् शुद्धं पदं चित्वा रिक्तस्थानानि पूरयन्तु',
        instructions: 'कोष्ठकात् शुद्धं पदं चित्वा रिक्तस्थानानि पूरयन्तु (स्वर-व्यञ्जन-नियमानुसारेण):',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: '(क) गुणं ____________________ अधिकं प्रयत्नं करोतु। [ अर्जयितुं / अर्जयितुम् ]',
            marks: 1,
            type: 'fill',
            answer: 'अर्जयितुम्',
            explanation: "उत्तरम्: 'अर्जयितुम्'। अग्रे 'अधिकम्' इति स्वरवर्णः (अ) अस्ति, अतः मकारः (म्) भवति।",
          },
          {
            num: 2,
            question: '(ख) वयं अद्यतनं ____________________ पठामः। [ पाठं / पाठम् ]',
            marks: 1,
            type: 'fill',
            answer: 'पाठं',
            explanation: "उत्तरम्: 'पाठं'। अग्रे 'पठामः' इति व्यञ्जनवर्णः (प) अस्ति, अतः अनुस्वारः भवति।",
          },
          {
            num: 3,
            question: '(ग) त्वं ____________________ गृहं आगच्छ। [ अस्माकं / अस्माकम् ]',
            marks: 1,
            type: 'fill',
            answer: 'अस्माकं',
            explanation: "उत्तरम्: 'अस्माकं'। अग्रे 'गृहम्' इति व्यञ्जनवर्णः (ग) अस्ति, अतः अनुस्वारः भवति।",
          },
          {
            num: 4,
            question: '(घ) शरीरम् आद्यं ____________________ धर्मसाधनम्। [ खलु / खलुम् ]',
            marks: 1,
            type: 'fill',
            answer: 'खलु',
            explanation: "उत्तरम्: 'खलु'। 'खलु' इति अव्ययपदम् अस्ति।",
          },
          {
            num: 5,
            question: '(ङ) न ____________________ अन्विष्यति। [ रत्नं / रत्नम् ]',
            marks: 1,
            type: 'fill',
            answer: 'रत्नम्',
            explanation: "उत्तरम्: 'रत्नम्'। अग्रे 'अन्विष्यति' इति स्वरवर्णः (अ) अस्ति, अतः मकारः (म्) भवति।",
          },
        ],
      },
      {
        sectionTitle: 'प्रश्न २: रेखाङ्कितपदानि आधृत्य प्रश्ननिर्माणं कुरुत (Frame questions)',
        sectionTitleSanskrit: 'प्रश्न २ · रेखाङ्कितपदानि आधृत्य प्रश्ननिर्माणं कुर्वन्तु',
        instructions: 'रेखाङ्कितपदानि आधृत्य प्रश्ननिर्माणं कुर्वन्तु:',
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: '(क) शीलं परं भूषणम्। (रेखाङ्कितपदम्: शीलं)',
            marks: 1,
            type: 'short_ans',
            answer: 'किम् परं भूषणम्?',
            explanation: "'शीलं' नपुंसकलिङ्ग-प्रथमा-एकवचनस्य स्थाने 'किम्' इति प्रश्नपदं प्रयुज्यते।",
          },
          {
            num: 2,
            question: '(ख) मनुष्यः पृथिव्याः सन्तानः अस्ति। (रेखाङ्कितपदम्: पृथिव्याः)',
            marks: 1,
            type: 'short_ans',
            answer: 'मनुष्यः कस्याः सन्तानः अस्ति?',
            explanation: "'पृथिव्याः' स्त्रीलिङ्ग-षष्ठी-एकवचनस्य स्थाने 'कस्याः' इति प्रश्नपदं प्रयुज्यते।",
          },
          {
            num: 3,
            question: '(ग) गुणिषु लिङ्गं वयः च न महत्त्वपूर्णम्। (रेखाङ्कितपदम्: लिङ्गं वयः च)',
            marks: 1,
            type: 'short_ans',
            answer: 'गुणिषु कौ/किम् न महत्त्वपूर्णम्? (अथवा: कानि न महत्त्वपूर्णानि?)',
            explanation: "'लिङ्गं वयः च' इत्यस्य स्थाने 'कौ' (अथवा 'किम्' / 'कानि') इति प्रश्नपदं प्रयुज्यते।",
          },
          {
            num: 4,
            question: '(घ) हितकारकं मनोहारि च वचः दुर्लभं भवति। (रेखाङ्कितपदम्: हितकारकं मनोहारि च)',
            marks: 1,
            type: 'short_ans',
            answer: 'हितकारकं मनोहारि च कीदृशं वचः / किम् दुर्लभं भवति? (अथवा: कीदृशं वचः दुर्लभं भवति?)',
            explanation: "विशेषणस्य स्थाने 'कीदृशम्' इति प्रश्नपदं प्रयुज्यते।",
          },
        ],
      },
    ],
  },

// ==========================================
  // LESSON 9: अन्नाद् भवन्ति भूतानि (7 WORKSHEETS)
  // ==========================================

  // --- Worksheet 1: रिक्तस्थानपूर्तिः ---
  {
    id: 'ws-ch9-1',
    title: 'Worksheet 1: रिक्तस्थानपूर्तिः (Fill in the Blanks)',
    titleSanskrit: 'कार्यपत्रकम् १: रिक्तस्थानपूर्तिः',
    category: 'deep_ch9',
    categoryLabel: 'Lesson 9: अन्नाद् भवन्ति भूतानि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् १ — पाठस्य आधारेण रिक्तस्थानानि पूरयन्तु।',
    sections: [
      {
        sectionTitle: 'रिक्तस्थानपूर्तिः (Complete the Sentences)',
        sectionTitleSanskrit: 'उचितपदैः रिक्तस्थानानि पूरयन्तु',
        instructions: 'पाठस्य आधारेण उचितपदैः रिक्तस्थानानि पूरयन्तु:',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: 'भारतस्य प्रतिष्ठे द्वे __________ संस्कृतिः च।',
            marks: 1,
            type: 'fill',
            answer: 'संस्कृतं',
            explanation: "'भारतस्य प्रतिष्ठे द्वे संस्कृतं संस्कृतिस्तथा' — संस्कृतं संस्कृतिश्चेति भारतस्य प्रतिष्ठे स्तः।",
          },
          {
            num: 2,
            question: 'ब्रह्म इत्युक्ते __________ , ऊर्जा वा या सर्वत्र व्याप्ता अस्ति।',
            marks: 1,
            type: 'fill',
            answer: 'चेतना-शक्तिः',
            explanation: 'ब्रह्म इत्युक्ते चेतना-शक्तिः ऊर्जा वा या सर्वत्र चराचरे व्याप्ता अस्ति।',
          },
          {
            num: 3,
            question: 'अग्नेः __________ उत्पत्तिः अभवत्।',
            marks: 1,
            type: 'fill',
            answer: 'जलस्य (अपां)',
            explanation: "'अग्नेरापः' — अग्नेः सकाशात् जलस्य (अपां) उत्पत्तिः अभवत्।",
          },
          {
            num: 4,
            question: 'आहारात् कीटाः, प्राणिनः, __________ उत्पन्नाः खलु अम्ब?',
            marks: 1,
            type: 'fill',
            answer: 'मनुष्याः',
            explanation: "'अन्नात् पुरुषः' — आहारात् (अन्नात्) कीटाः, प्राणिनः, मनुष्याः च उत्पन्नाः।",
          },
          {
            num: 5,
            question: 'अवश्यम् __________ पठनीयाः, यतः अस्माकं भारतस्य मौलिकं ज्ञानं तेषु निहितम् अस्ति।',
            marks: 1,
            type: 'fill',
            answer: 'उपनिषदः (उपनिषद्-ग्रन्थाः)',
            explanation: 'उपनिषत्सु अस्माकं भारतस्य मौलिकं दार्शनिकं वैज्ञानिकं च ज्ञानं निहितम् अस्ति।',
          },
        ],
      },
    ],
  },

  // --- Worksheet 2: उत्पत्तिक्रम-प्रवाहचित्रम् ---
  {
    id: 'ws-ch9-2',
    title: 'Worksheet 2: उत्पत्तिक्रम-प्रवाहचित्रम् (Creation Sequence Flowchart)',
    titleSanskrit: 'कार्यपत्रकम् २: उत्पत्तिक्रम-प्रवाहचित्रम्',
    category: 'deep_ch9',
    categoryLabel: 'Lesson 9: अन्नाद् भवन्ति भूतानि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 8,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् २ — तैत्तिरीयोपनिषदः आधारेण सृष्टेः उत्पत्तिक्रमं प्रवाहचित्रे शुद्धक्रमेण लिखन्तु।',
    sections: [
      {
        sectionTitle: 'सृष्टेः उत्पत्तिक्रम-प्रवाहचित्रम् (Creation Order Sequence)',
        sectionTitleSanskrit: 'तैत्तिरीयोपनिषदः आधारेण उत्पत्तिक्रमं पूरयन्तु',
        instructions: 'दत्ततत्वेभ्यः शुद्धक्रमेण उत्पत्तिक्रमं प्रवाहचित्रे पूरयन्तु: [तत्वानि: पृथिवी, वायुः, अन्नम्, आकाशः, ओषधयः, अग्निः, आपः (जलम्), पुरुषः (मनुष्यः)]',
        totalMarks: 8,
        questions: [
          {
            num: 1,
            question: '[ आत्मनः / ब्रह्म ] ➔ प्रथमं किम् उत्पन्नम्?',
            marks: 1,
            type: 'fill',
            answer: 'आकाशः',
            explanation: "'तस्माद्वा एतस्मादात्मन आकाशः संभूतः'",
          },
          {
            num: 2,
            question: 'आकाशात् ➔ ?',
            marks: 1,
            type: 'fill',
            answer: 'वायुः',
            explanation: "'आकाशाद्वायुः'",
          },
          {
            num: 3,
            question: 'वायोः ➔ ?',
            marks: 1,
            type: 'fill',
            answer: 'अग्निः',
            explanation: "'वायोरग्निः'",
          },
          {
            num: 4,
            question: 'अग्नेः ➔ ?',
            marks: 1,
            type: 'fill',
            answer: 'आपः (जलम्)',
            explanation: "'अग्नेरापः'",
          },
          {
            num: 5,
            question: 'अद्भ्यः (जलात्) ➔ ?',
            marks: 1,
            type: 'fill',
            answer: 'पृथिवी',
            explanation: "'अद्भ्यः पृथिवी'",
          },
          {
            num: 6,
            question: 'पृथिव्याः ➔ ?',
            marks: 1,
            type: 'fill',
            answer: 'ओषधयः',
            explanation: "'पृथिव्या ओषधयः'",
          },
          {
            num: 7,
            question: 'ओषधीभ्यः ➔ ?',
            marks: 1,
            type: 'fill',
            answer: 'अन्नम् (आहारः)',
            explanation: "'ओषधीभ्योऽन्नम्'",
          },
          {
            num: 8,
            question: 'अन्नात् ➔ ?',
            marks: 1,
            type: 'fill',
            answer: 'पुरुषः (मनुष्याः प्राणिनः च)',
            explanation: "'अन्नात् पुरुषः'",
          },
        ],
      },
    ],
  },

  // --- Worksheet 3: संवाद-अवबोधनम् अनुमानाधारितप्रश्नाः च ---
  {
    id: 'ws-ch9-3',
    title: 'Worksheet 3: संवाद-अवबोधनम् अनुमानाधारितप्रश्नाः च (Dialogue Comprehension & Inferences)',
    titleSanskrit: 'कार्यपत्रकम् ३: संवाद-अवबोधनम् अनुमानाधारितप्रश्नाः च',
    category: 'deep_ch9',
    categoryLabel: 'Lesson 9: अन्नाद् भवन्ति भूतानि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् ३ — माता-पुत्री-संवादं पठित्वा विश्लेषणात्मकप्रश्नानाम् उत्तराणि लिखन्तु।',
    sections: [
      {
        sectionTitle: 'संवाद-विश्लेषणम् (Dialogue Comprehension & Inferences)',
        sectionTitleSanskrit: 'संवादम् आधृत्य प्रश्नानाम् उत्तराणि लिखन्तु',
        instructions: 'अधोलिखित-संवादम् अनुसृत्य प्रश्नानाम् उत्तराणि लिखन्तु:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'Why does the daughter think having water, food, and air is enough? (पुत्री किमर्थं चिन्तयति यत् जलम् आहारः वायुः च पर्याप्तम्?)',
            marks: 2,
            type: 'short_ans',
            answer: 'पुत्री तात्कालिक-जीवनरक्षणदृष्ट्या चिन्तयति यतः जलम् आहारः वायुः च साक्षात् अस्माकं जीवनं पोषयन्ति रक्षन्ति च। (The daughter thinks from an immediate survival perspective, seeing that water, food, and air directly sustain daily human life.)',
            explanation: 'सा प्रत्यक्षं जीवननिर्वाहसाधनं पश्यति, अतः तेषां ज्ञानमेव पर्याप्तं मन्यते।',
          },
          {
            num: 2,
            question: 'How does the mother gently correct her view to emphasize learning the whole systemic order of nature? (माता प्रकृतेः सम्पूर्णं क्रमं ज्ञातुं कथं प्रेरयति?)',
            marks: 2,
            type: 'short_ans',
            answer: 'माता विवृणोति यत् जलम् आहारः वायुः च पृथक् न सन्ति, अपितु सम्पूर्ण-प्रकृतेः क्रमबद्ध-सृष्टेः (ब्रह्म ➔ आकाश ➔ वायु ➔ अग्नि ➔ जल ➔ पृथिवी ➔ ओषधि ➔ अन्न ➔ पुरुष) अङ्गाः सन्ति। (The mother clarifies that these elements are interconnected steps in a cosmic ecological cycle originating from Brahman.)',
            explanation: 'मूलकारणात् आरभ्य सम्पूर्णसृष्टिक्रमस्य ज्ञानेनैव वास्तविकं वैज्ञानिकं च ज्ञानं पूर्णं भवति।',
          },
          {
            num: 3,
            question: 'Based on the lesson, what fields of ancient Indian science are mentioned that still serve as grounds for modern research? (पाठे प्राचीनानां केषां शास्त्राणां उल्लेखः अस्ति?)',
            marks: 2,
            type: 'short_ans',
            answer: 'खगोलविज्ञानम् (Astronomy), भूगर्भशास्त्रम् (Geology), गणितशास्त्रम् (Mathematics), आयुर्वेदादिवैद्यशास्त्रम् (Medicine/Ayurveda), तथा च वास्तु-स्थापत्यकला (Architecture/Urban Planning)।',
            explanation: 'एतेषु सर्वेषु शास्त्रेषु भारतस्य प्राचीनैः ऋषिभिः वैज्ञानिकैः च महती प्रगतिः कृता।',
          },
        ],
      },
    ],
  },

  // --- Worksheet 4: शब्दार्थ-मेलनम् अनुवाद-कार्यम् च ---
  {
    id: 'ws-ch9-4',
    title: 'Worksheet 4: शब्दार्थ-मेलनम् अनुवाद-कार्यम् च (Word-Meaning Mapping & Dialogue Translation)',
    titleSanskrit: 'कार्यपत्रकम् ४: शब्दार्थ-मेलनम् अनुवाद-कार्यम् च',
    category: 'deep_ch9',
    categoryLabel: 'Lesson 9: अन्नाद् भवन्ति भूतानि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् ४ — पाठस्य संवादानाम् मातृभाषायाम् (हिन्दी/आङ्ग्लभाषायाम्) अनुवादं कुर्वन्तु।',
    sections: [
      {
        sectionTitle: 'संवाद-अनुवाद-कार्यम् (Translation of Dialogues)',
        sectionTitleSanskrit: 'संवादवाक्यानाम् अनुवादं लिखन्तु',
        instructions: 'अधोलिखितानां वाक्यानां मातृभाषायाम् (हिन्दी/English) अनुवादं लिखन्तु:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: '"अम्ब! मम काचिद् जिज्ञासा अस्ति। वयं मनुष्याः प्राणिनः कीटाः च कथं भूलोके आगताः?"',
            marks: 2,
            type: 'short_ans',
            answer: 'हिन्दी अनुवाद: "माँ! मेरी एक जिज्ञासा है। हम मनुष्य, प्राणी और कीट-पतंगे इस भूलोक (पृथ्वी) पर कैसे आए?" / English: "Mother! I have a question born of curiosity. How did we human beings, animals, and insects come to this earth?"',
            explanation: "'जिज्ञासा' = जानने की इच्छा (Curiosity); 'भूलोके' = पृथ्वी पर।",
          },
          {
            num: 2,
            question: '"अहो! सत्यम्, अहं विस्मृतवती एव। पृथिव्याः तु प्राणिनः मनुष्याः च उत्पन्नाः।"',
            marks: 2,
            type: 'short_ans',
            answer: 'हिन्दी अनुवाद: "अरे! सचमुच, मैं तो भूल ही गई थी। पृथ्वी से ही तो प्राणी और मनुष्य उत्पन्न हुए हैं।" / English: "Oh! True, I had completely forgotten. From the earth indeed, creatures and humans originated."',
            explanation: "'विस्मृतवती' = भूल गई थी (Had forgotten)।",
          },
          {
            num: 3,
            question: '"तेन अस्माकं जीवनस्य अपि उत्कर्षः भवति।"',
            marks: 2,
            type: 'short_ans',
            answer: 'हिन्दी अनुवाद: "उससे (उपनिषदों और मौलिक ज्ञान के अध्ययन से) हमारे जीवन का भी उत्कर्ष (उन्नति/कल्याण) होता है।" / English: "By that (studying the Upanishads and foundational knowledge), our life also attains elevation and excellence."',
            explanation: "'उत्कर्षः' = उन्नति, श्रेष्ठता (Elevation, progress)।",
          },
        ],
      },
    ],
  },

  // --- Worksheet 5: सामूहिक-परियोजना: प्राचीन-भारतीय-विज्ञानानि ---
  {
    id: 'ws-ch9-5',
    title: 'Worksheet 5: सामूहिक-परियोजना: प्राचीन-भारतीय-विज्ञानानि (Ancient Indian Sciences)',
    titleSanskrit: 'कार्यपत्रकम् ५: सामूहिक-परियोजना: प्राचीन-भारतीय-विज्ञानानि',
    category: 'deep_ch9',
    categoryLabel: 'Lesson 9: अन्नाद् भवन्ति भूतानि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '25 mins',
    description: 'अभ्यासपत्रकम् ५ — पाठस्य परिचयाधारेण प्राचीन-भारतीय-विज्ञानक्षेत्राणां विदुषां च कार्यक्षेत्रं लिखन्तु।',
    sections: [
      {
        sectionTitle: 'प्राचीन-भारतीय-विज्ञानानां विवरणम् (Fields of Ancient Indian Sciences)',
        sectionTitleSanskrit: 'विशेषाणां शास्त्राणां विवरणं लिखन्तु',
        instructions: 'अधोलिखितानां विज्ञानक्षेत्राणां कार्यक्षेत्रं स्पष्टीकुर्वन्तु:',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: 'खगोलविज्ञानिनः (Astronomers) — एतेषां कार्यक्षेत्रं किम्?',
            marks: 1,
            type: 'short_ans',
            answer: 'आकाशीयपिण्डानां, ग्रहाणां, नक्षत्राणां, सूर्य-चन्द्र-गतेः काल-गणनायाः च अध्ययनकर्तारः (यथा आर्यभटः, वराहमिहिरः)।',
            explanation: 'खगोलशास्त्रे ग्रहाणां गतिः, ग्रहणानि, ऋतुपरिवर्तनं च परिशील्यते।',
          },
          {
            num: 2,
            question: 'भूगर्भशास्त्रज्ञाः (Geologists / Earth Scientists) — एतेषां कार्यक्षेत्रं किम्?',
            marks: 1,
            type: 'short_ans',
            answer: 'पृथिव्याः आन्तरिक-रचनायाः, भूकम्पस्य, खनिजानाम्, जलस्रोतानां च वैज्ञानिकम् अध्ययनं कुर्वन्तः।',
            explanation: 'भूगर्भशास्त्रे पृथिव्याः स्तरस्य धातूनां च विश्लेषणं भवति।',
          },
          {
            num: 3,
            question: 'गणितज्ञाः (Mathematicians) — एतेषां कार्यक्षेत्रं किम्?',
            marks: 1,
            type: 'short_ans',
            answer: 'शून्यस्य आविष्कारकाः, दशमलव-पद्धतेः, अङ्कगणितस्य, बीजगणितस्य, रेखागणितस्य च प्रवर्तकाः (यथा ब्रह्मगुप्तः, भास्कराचार्यः)।',
            explanation: 'भारतीय-गणितज्ञाः सम्पूर्ण-विश्वे गणितस्य मूलभूतान् सिद्धान्तान् प्रतिपादितवन्तः।',
          },
          {
            num: 4,
            question: 'आयुर्वेदादिवैद्यशास्त्रधुरन्धराः (Ayurveda & Medical Pioneers) — एतेषां कार्यक्षेत्रं किम्?',
            marks: 1,
            type: 'short_ans',
            answer: 'शरीरविज्ञानं, स्वास्थ्यरक्षणं, शल्यचिकित्सां, त्रिदोषसिद्धान्तं, जडीबूटीचिकित्सां च प्रतिपादितवन्तः (यथा चरकः, सुश्रुतः)।',
            explanation: 'आयुर्वेदः जीवनस्य सम्पूर्णं स्वास्थ्यविज्ञानम् अस्ति।',
          },
          {
            num: 5,
            question: 'वास्तु-स्थापत्यकलाप्रवराः (Architecture & Town Planners) — एतेषां कार्यक्षेत्रं किम्?',
            marks: 1,
            type: 'short_ans',
            answer: 'नगराणां, मन्दिराणां, भवनानां, जलाशयानां च सम्यक् निर्माणशिल्पकाराः (यथा मय-विश्वकर्म-परम्परा)।',
            explanation: 'प्राचीन-वास्तुशास्त्रे पर्यावरणानुकूलं भवननिर्माणम् उपदिष्टम्।',
          },
        ],
      },
    ],
  },

  // --- Grammar Worksheet 1: वचनपरिवर्तनम् (पञ्चमी विभक्तिः) ---
  {
    id: 'ws-ch9-g1',
    title: 'Grammar Worksheet 1: वचनपरिवर्तनम् (पञ्चमी विभक्तिः) (Ablative Case Matrix)',
    titleSanskrit: 'व्याकरण-कार्यपत्रिका १: वचनपरिवर्तनम् (पञ्चमी विभक्तिः)',
    category: 'deep_ch9',
    categoryLabel: 'Lesson 9 व्याकरणम्: वचनपरिवर्तनम् (पञ्चमी)',
    grade: 'Class 7 (CBSE)',
    totalMarks: 7,
    timeLimit: '20 mins',
    description: 'व्याकरण-अभ्यासपत्रकम् १ — पञ्चमी-विभक्तेः एकवचन-द्विवचन-बहुवचनेषु रूपाणि पूरयन्तु।',
    sections: [
      {
        sectionTitle: 'पञ्चमीविभक्ति-तालिकापूरणम् (Ablative Case Matrix Table)',
        sectionTitleSanskrit: 'पञ्चमी-विभक्तेः रूपाणि लिखन्तु',
        instructions: 'यथा: आहार ➔ आहारात्, आहाराभ्याम्, आहारेभ्यः। अनेनैव नियमेन अधोलिखितानां शब्दानां पञ्चमी-रूपाणि पूरयन्तु:',
        totalMarks: 7,
        questions: [
          {
            num: 1,
            question: 'मनुष्य ➔ [एकवचनम्: _______, द्विवचनम्: _______, बहुवचनम्: _______]',
            marks: 1,
            type: 'fill',
            answer: 'मनुष्यात्, मनुष्याभ्याम्, मनुष्येभ्यः',
            explanation: 'अकारान्त-पुंल्लिङ्गम्: मनुष्यात्, मनुष्याभ्याम्, मनुष्येभ्यः।',
          },
          {
            num: 2,
            question: 'वृक्ष ➔ [एकवचनम्: _______, द्विवचनम्: _______, बहुवचनम्: _______]',
            marks: 1,
            type: 'fill',
            answer: 'वृक्षात्, वृक्षाभ्याम्, वृक्षेभ्यः',
            explanation: 'अकारान्त-पुंल्लिङ्गम्: वृक्षात्, वृक्षाभ्याम्, वृक्षेभ्यः।',
          },
          {
            num: 3,
            question: 'मुनि ➔ [एकवचनम्: _______, द्विवचनम्: _______, बहुवचनम्: _______]',
            marks: 1,
            type: 'fill',
            answer: 'मुनेः, मुनिभ्याम्, मुनिभ्यः',
            explanation: 'इकारान्त-पुंल्लिङ्गम् (यथा अग्नि ➔ अग्नेः): मुनेः, मुनिभ्याम्, मुनिभ्यः।',
          },
          {
            num: 4,
            question: 'वाटिका ➔ [एकवचनम्: _______, द्विवचनम्: _______, बहुवचनम्: _______]',
            marks: 1,
            type: 'fill',
            answer: 'वाटिकायाः, वाटिकाभ्याम्, वाटिकाभ्यः',
            explanation: 'आकारान्त-स्त्रीलिङ्गम् (यथा पेटिका ➔ पेटिकायाः): वाटिकायाः, वाटिकाभ्याम्, वाटिकाभ्यः।',
          },
          {
            num: 5,
            question: 'माला ➔ [एकवचनम्: _______, द्विवचनम्: _______, बहुवचनम्: _______]',
            marks: 1,
            type: 'fill',
            answer: 'मालायाः, मालाभ्याम्, मालाभ्यः',
            explanation: 'आकारान्त-स्त्रीलिङ्गम्: मालायाः, मालाभ्याम्, मालाभ्यः।',
          },
          {
            num: 6,
            question: 'नदी ➔ [एकवचनम्: _______, द्विवचनम्: _______, बहुवचनम्: _______]',
            marks: 1,
            type: 'fill',
            answer: 'नद्याः, नदीभ्याम्, नदीभ्यः',
            explanation: 'ईकारान्त-स्त्रीलिङ्गम् (यथा कूपी ➔ कूप्याः): नद्याः, नदीभ्याम्, नदीभ्यः।',
          },
          {
            num: 7,
            question: 'नगरी ➔ [एकवचनम्: _______, द्विवचनम्: _______, बहुवचनम्: _______]',
            marks: 1,
            type: 'fill',
            answer: 'नगर्याः, नगरीभ्याम्, नगरीभ्यः',
            explanation: 'ईकारान्त-स्त्रीलिङ्गम्: नगर्याः, नगरीभ्याम्, नगरीभ्यः।',
          },
        ],
      },
    ],
  },

  // --- Grammar Worksheet 2: कारकानुप्रयोगः (कः कस्मात् विद्यां प्राप्तवान्) ---
  {
    id: 'ws-ch9-g2',
    title: 'Grammar Worksheet 2: कारकानुप्रयोगः (कः कस्मात् विद्यां प्राप्तवान्) (Ablative Sentences)',
    titleSanskrit: 'व्याकरण-कार्यपत्रिका २: कारकानुप्रयोगः (कः कस्मात् विद्यां प्राप्तवान्)',
    category: 'deep_ch9',
    categoryLabel: 'Lesson 9 व्याकरणम्: कारकानुप्रयोगः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '20 mins',
    description: 'व्याकरण-अभ्यासपत्रकम् २ — [शिष्यः] [आचार्यात् / पञ्चमी विभक्ति] विद्यां प्राप्तवान् इति नियमानुसारेण वाक्यानि रचयन्तु।',
    sections: [
      {
        sectionTitle: 'पञ्चमीविभक्तौ वाक्यरचना (Sentence Construction in Ablative Case)',
        sectionTitleSanskrit: 'आचार्यपदे पञ्चमीविभक्तिं प्रयुज्य वाक्यानि रचयन्तु',
        instructions: 'यथा: शुक्राचार्यः / महादेवः ➔ शुक्राचार्यः महादेवात् विद्यां प्राप्तवान्। अधोदत्त-युग्मानां वाक्यानि रचयन्तु:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'पद्मपादः / शङ्कराचार्यः ➔ वाक्यं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'पद्मपादः शङ्कराचार्यात् विद्यां प्राप्तवान्।',
            explanation: "'शङ्कराचार्य' शब्दस्य पञ्चमी-एकवचने 'शङ्कराचार्यात्' भवति।",
          },
          {
            num: 2,
            question: 'विवेकानन्दः / रामकृष्णः ➔ वाक्यं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'विवेकानन्दः रामकृष्णात् विद्यां प्राप्तवान्।',
            explanation: "'रामकृष्ण' शब्दस्य पञ्चमी-एकवचने 'रामकृष्णात्' भवति।",
          },
          {
            num: 3,
            question: 'रामः / वसिष्ठः ➔ वाक्यं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'रामः वसिष्ठात् विद्यां प्राप्तवान्।',
            explanation: "'वसिष्ठ' शब्दस्य पञ्चमी-एकवचने 'वसिष्ठात्' भवति।",
          },
          {
            num: 4,
            question: 'भीष्मः / परशुरामः ➔ वाक्यं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'भीष्मः परशुरामात् विद्यां प्राप्तवान्।',
            explanation: "'परशुराम' शब्दस्य पञ्चमी-एकवचने 'परशुरामात्' भवति।",
          },
          {
            num: 5,
            question: 'चन्द्रगुप्तः / चाणक्यः ➔ वाक्यं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'चन्द्रगुप्तः चाणक्यात् विद्यां प्राप्तवान्।',
            explanation: "'चाणक्य' शब्दस्य पञ्चमी-एकवचने 'चाणक्यात्' भवति।",
          },
          {
            num: 6,
            question: 'अर्जुनः / द्रोणाचार्यः ➔ वाक्यं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'अर्जुनः द्रोणाचार्यात् विद्यां प्राप्तवान्।',
            explanation: "'द्रोणाचार्य' शब्दस्य पञ्चमी-एकवचने 'द्रोणाचार्यात्' भवति।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 10: दशमः कः? (CHAPTER ASSESSMENTS)
  // ==========================================
  // --- Worksheet 1: कथाक्रम-संयोजनम् ---
  {
    id: 'ws-ch10-1',
    title: 'Worksheet 1: कथाक्रम-संयोजनम् (Chronological Story Sequencing)',
    titleSanskrit: 'कार्यपत्रकम् १: कथाक्रम-संयोजनम् (घटनाक्रमः)',
    category: 'deep_ch10',
    categoryLabel: 'Lesson 10: दशमः कः?',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् १ — कथायाः घटनानां क्रमानुसारेण पुनः संयोजनं कुर्वन्तु।',
    sections: [
      {
        sectionTitle: 'घटनाक्रम-संयोजनम् (Story Event Sequencing)',
        sectionTitleSanskrit: 'कथायाः घटनानां समुचितक्रमेण योजनम्',
        instructions: 'अधोलिखितानां वाक्यानां कथायाः क्रमानुसारेण समुचितं क्रमं लिखन्तु (Arrange in chronological order 1 to 6):',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'प्रथमघटना: कथायाः प्रारम्भे किं घटितम्? (First Event)',
            marks: 1,
            type: 'short_ans',
            answer: 'दश बालकाः स्नानाय नदीम् अगच्छन्।',
            explanation: 'कथायाः प्रारम्भे दश बालकाः स्नानार्थं नदीं गच्छन्ति।',
          },
          {
            num: 2,
            question: 'द्वितीयघटना: नदीं प्राप्य तैः किं कृतम्? (Second Event)',
            marks: 1,
            type: 'short_ans',
            answer: 'ते नदीजले चिरं स्नानम् अकुर्वन्।',
            explanation: 'बालकाः नद्याः जले दीर्घकालं यावत् स्नानम् अकुर्वन्।',
          },
          {
            num: 3,
            question: 'तृतीयघटना: स्नानानन्तरं नदीं तीर्त्वा ते किं परस्परम् अपृच्छन्? (Third Event)',
            marks: 1,
            type: 'short_ans',
            answer: 'तीर्त्वा ते परस्परं अवदन् / नायकः अपृच्छत् - "अपि सर्वे बालकाः नदीम् उत्तीर्णाः?"',
            explanation: 'पारं गत्वा नायकः सर्वान् बालकान् प्रति संशयं निवारयितुं पृच्छति।',
          },
          {
            num: 4,
            question: 'चतुर्थघटना: बालकेन गणनायां का त्रुटिः कृता? (Fourth Event)',
            marks: 1,
            type: 'short_ans',
            answer: 'नायकः/बालकः नव बालकान् एव अगणयत्, आत्मानं न अगणयत्।',
            explanation: 'गणनावसरे सः अन्यान् सर्वान् अगणयत् किन्तु स्वम् आत्मानं विस्मृतवान्।',
          },
          {
            num: 5,
            question: 'पञ्चमघटना: नव एव दृष्ट्वा बालकानां का दशा अभवत्? (Fifth Event)',
            marks: 1,
            type: 'short_ans',
            answer: '"दशमः नद्यां मग्नः" इति मत्वा बालकाः दुःखिताः तूष्णीम् अतिष्ठन्।',
            explanation: 'दशमः मृतः इति मत्वा सर्वे शोकमग्नाः अभवन्।',
          },
          {
            num: 6,
            question: 'षष्ठघटना: पथिकः आगत्य कथं तेषां दुःखं निवारितवान्? (Sixth Event)',
            marks: 1,
            type: 'short_ans',
            answer: 'पथिकः आगत्य "दशमः त्वम् असि" इति बोधयित्वा तान् प्रहृष्टान् अकरोत्।',
            explanation: 'पथिकेन सत्यस्य प्रकाशः कृतः, सर्वे आनन्देन गृहम् अगच्छन्।',
          },
        ],
      },
    ],
  },

  // --- Worksheet 2: संवाद-वक्तृ-परिचयः ---
  {
    id: 'ws-ch10-2',
    title: 'Worksheet 2: संवाद-वक्तृ-परिचयः (Dialogue & Character Identification)',
    titleSanskrit: 'कार्यपत्रकम् २: संवाद-वक्तृ-परिचयः (कः कम् अवदत्)',
    category: 'deep_ch10',
    categoryLabel: 'Lesson 10: दशमः कः?',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् २ — अधोलिखित-कथनानि केन कम् प्रति उक्तानि इति लिखत।',
    sections: [
      {
        sectionTitle: 'कः कम् अवदत् (Who Said to Whom)',
        sectionTitleSanskrit: 'वक्तृ-श्रोतृ-निर्देशः',
        instructions: 'अधोदत्तानां संवादानां वक्ता कः श्रोता च कः इति स्पष्टीकुरुत:',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: '"अपि सर्वे बालकाः नदीम् उत्तीर्णाः?" — कः कम् अवदत्?',
            marks: 1,
            type: 'short_ans',
            answer: 'नायकः बालकान् प्रति अवदत्।',
            explanation: 'पारं गत्वा नायकः सर्वान् बालकान् उद्दिश्य एतत् वाक्यम् अवदत्।',
          },
          {
            num: 2,
            question: '"नव एव सन्ति, दशमः न अस्ति।" — कः कम् अवदत्?',
            marks: 1,
            type: 'short_ans',
            answer: 'गणकः बालकः (नायकः) अन्यान् बालकान् प्रति अवदत्।',
            explanation: 'स्वं विहाय नव गणयित्वा सः स्वमित्राणि अवदत्।',
          },
          {
            num: 3,
            question: '"दशमः नद्यां मग्नः।" — के निश्चयं अकुर्वन्?',
            marks: 1,
            type: 'short_ans',
            answer: 'बालकाः सर्वे परस्परम् अवदन् / दृढं निश्चयं अकुर्वन्।',
            explanation: 'सर्वे बालकाः भ्रान्त्या एतं दुःखदं निर्णयं चक्रुः।',
          },
          {
            num: 4,
            question: '"भो बालकाः! युष्माकं दुःखस्य कारणं किम्?" — कः कान् अवदत्?',
            marks: 1,
            type: 'short_ans',
            answer: 'पथिकः बालकान् प्रति अवदत्।',
            explanation: 'मार्गे गच्छन् पथिकः दुःखितान् बालकान् दृष्ट्वा दयालुभावेन अपृच्छत्।',
          },
          {
            num: 5,
            question: '"दशमः त्वम् असि।" — कः कम् अवदत्?',
            marks: 1,
            type: 'short_ans',
            answer: 'पथिकः नायकं (गणकं बालकं) प्रति अवदत्।',
            explanation: 'पथिकः स्वयम् अन्यान् नव गणयित्वा गणकस्य अज्ञानं दूरीकर्तुम् अवदत्।',
          },
        ],
      },
    ],
  },

  // --- Worksheet 3: गद्यांशावबोधनम् ---
  {
    id: 'ws-ch10-3',
    title: 'Worksheet 3: गद्यांशावबोधनम् (Passage Reading & Contextual Comprehension)',
    titleSanskrit: 'कार्यपत्रकम् ३: गद्यांशावबोधनम्',
    category: 'deep_ch10',
    categoryLabel: 'Lesson 10: दशमः कः?',
    grade: 'Class 7 (CBSE)',
    totalMarks: 4,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् ३ — गद्यांशं सम्यक् पठित्वा तदाधारितानां प्रश्नानाम् उत्तराणि संस्कृतेन लिखन्तु।',
    sections: [
      {
        sectionTitle: 'गद्यांशावबोधनम् (Reading Comprehension)',
        sectionTitleSanskrit: 'अनुच्छेदं पठित्वा प्रश्नानाम् उत्तराणि',
        instructions: `गद्यांशः: "एकदा दश बालकाः स्नानाय नदीम् अगच्छन्। ते तीर्थजले चिरं स्नानम् अकुर्वन्। ततः ते तीर्त्वा पारं गताः। तदा तेषां नायकः अपृच्छत् - 'अपि सर्वे बालकाः नदीम् उत्तीर्णाः?' कश्चित् बालकः अगणयत् - 'एकः, द्वौ, त्रयः, चत्वारः, पञ्च, षट्, सप्त, अष्टौ, नव इति।' सः स्वं न अगणयत्। अतः सः अवदत् - 'नव एव सन्ति। दशमः न अस्ति।' अपरोऽपि बालकः पुनः अन्यान् बालकान् अगणयत्। तदा अपि नव एव आसन्।"`,
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: 'बालकाः किमर्थं नदीम् अगच्छन्? (एकपदेन/पूर्णवाक्येन उत्तरत)',
            marks: 1,
            type: 'short_ans',
            answer: 'बालकाः स्नानाय नदीम् अगच्छन्।',
            explanation: 'गद्यांशे स्पष्टम् उक्तम् - "एकदा दश बालकाः स्नानाय नदीम् अगच्छन्।"',
          },
          {
            num: 2,
            question: 'बालकाः कुत्र चिरं स्नानम् अकुर्वन्?',
            marks: 1,
            type: 'short_ans',
            answer: 'बालकाः तीर्थजले (नदीजले) चिरं स्नानम् अकुर्वन्।',
            explanation: '"ते तीर्थजले चिरं स्नानम् अकुर्वन्" इति गद्यांशपङ्क्तिः।',
          },
          {
            num: 3,
            question: 'गणनावसरे बालकः कं न अगणयत्?',
            marks: 1,
            type: 'short_ans',
            answer: 'गणनावसरे बालकः स्वम् (आत्मानम्) न अगणयत्।',
            explanation: 'सः सर्वान् अन्यान् अगणयत् किन्तु स्वस्य गणनां विस्मृतवान्।',
          },
          {
            num: 4,
            question: "'अन्यान्' इति पदे का विभक्तिः किं वचनं च अस्ति?",
            marks: 1,
            type: 'short_ans',
            answer: 'द्वितीया विभक्तिः, बहुवचनम् (पुंल्लिङ्गम्)।',
            explanation: "'अन्य' सर्वनामशब्दस्य पुंल्लिङ्गे द्वितीया-बहुवचने 'अन्यान्' रूपं भवति।",
          },
        ],
      },
    ],
  },

  // --- Worksheet 4: पद-अनुवाद-अभ्यासः ---
  {
    id: 'ws-ch10-4',
    title: 'Worksheet 4: पद-अनुवाद-अभ्यासः (Key Sanskrit Phrases Translation)',
    titleSanskrit: 'कार्यपत्रकम् ४: पद-अनुवाद-अभ्यासः',
    category: 'deep_ch10',
    categoryLabel: 'Lesson 10: दशमः कः?',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् ४ — पाठगतानां प्रमुखाणां संस्कृतपदानां वाक्यांशानां च आङ्ग्लभाषायाम् (English) अनुवादं कुरुत।',
    sections: [
      {
        sectionTitle: 'वाक्यांश-अनुवादः (Phrase Translation)',
        sectionTitleSanskrit: 'संस्कृत-वाक्यांशानाम् आङ्गलानुवादः',
        instructions: 'अधोलिखितानां संस्कृत-वाक्यांशानां समुचितम् आङ्गलार्थं लिखन्तु (Write English translation):',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: "'तीर्त्वा पारं गताः' ➔ Translate into English:",
            marks: 1,
            type: 'short_ans',
            answer: 'Having swum across, they reached the bank / shore.',
            explanation: "'तीर्त्वा' (तरणम् कृत्वा - ktva pratyaya) = Having crossed/swum; 'पारं गताः' = reached the other side.",
          },
          {
            num: 2,
            question: "'आत्मानं न अगणयत्' ➔ Translate into English:",
            marks: 1,
            type: 'short_ans',
            answer: 'Did not count himself.',
            explanation: "'आत्मानम्' = oneself/himself; 'न अगणयत्' = did not count (Lang lakara).",
          },
          {
            num: 3,
            question: "'तूष्णीम् अतिष्ठन्' ➔ Translate into English:",
            marks: 1,
            type: 'short_ans',
            answer: 'Stood silently / remained mute.',
            explanation: "'तूष्णीम्' = silently/quietly; 'अतिष्ठन्' = remained/stood.",
          },
          {
            num: 4,
            question: "'दशमः त्वम् असि' ➔ Translate into English:",
            marks: 1,
            type: 'short_ans',
            answer: 'You are the tenth one.',
            explanation: "'दशमः' = tenth (masculine ordinal); 'त्वम्' = you; 'असि' = are.",
          },
          {
            num: 5,
            question: "'प्रहृष्टाः भूत्वा' ➔ Translate into English:",
            marks: 1,
            type: 'short_ans',
            answer: 'Having become delighted / overjoyed.',
            explanation: "'प्रहृष्टाः' = delighted/happy; 'भूत्वा' = having become (bhu + ktva).",
          },
        ],
      },
    ],
  },

  // --- Worksheet 5: विश्लेषणात्मक-सारांशलेखनम् ---
  {
    id: 'ws-ch10-5',
    title: 'Worksheet 5: विश्लेषणात्मक-सारांशलेखनम् (Analytical Reflection & Life Lessons)',
    titleSanskrit: 'कार्यपत्रकम् ५: विश्लेषणात्मक-सारांशलेखनम्',
    category: 'deep_ch10',
    categoryLabel: 'Lesson 10: दशमः कः?',
    grade: 'Class 7 (CBSE)',
    totalMarks: 4,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् ५ — कथायाः दार्शनिकं सन्देशं जीवनमूल्यानि च विश्लेष्य लिखन्तु।',
    sections: [
      {
        sectionTitle: 'दार्शनिकं चिन्तनम् (Philosophical Analysis & Moral)',
        sectionTitleSanskrit: 'कथायाः तात्त्विकं चिन्तनम्',
        instructions: 'अधोदत्तयोः प्रश्नयोः सविस्तरम् उत्तरं लिखन्तु (Answer in detail):',
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: 'कथायाः मूलशिक्षा का? (What is the core moral / philosophical teaching of this story?)',
            marks: 2,
            type: 'short_ans',
            answer: 'अज्ञानेन मनुष्यः बहिर्मुखः सन् बाह्यजगति एव सर्वं पश्यति तथा च आत्मानं विस्मृत्य व्यर्थमेव दुःखमनुभवति। यदा आत्मज्ञानं जायते तदा सर्वं भ्रमं दुःखं च विनश्यति, परमानन्दः च प्राप्यते। (The fundamental teaching is that due to outward ignorance, man forgets his own divine true Self and grieves. When self-awareness is awakened, all illusion dissolves into joy.)',
            explanation: 'वेदान्ते "दशमस्त्वमसि" इति दृष्टान्तः प्रसिद्धः अस्ति, यः आत्मसाक्षात्कारस्य महत्त्वं बोधयति।',
          },
          {
            num: 2,
            question: 'पथिकस्य भूमिका का आसीत्? सः कथं बालकानां भ्रमं निवारितवान्? (What was the role of the traveller, and how did he dispel their delusion?)',
            marks: 2,
            type: 'short_ans',
            answer: 'पथिकः अत्र एकस्य ज्ञानी-सद्गुरोः भूमिकां निर्वहति। सः बाह्यदृष्ट्या अज्ञानान्धकारे निमग्नान् बालकान् धैर्यपूर्वकं एकैकं गणयित्वा, नायकं प्रति "दशमः त्वम् असि" इति बोधयित्वा तेषां भ्रमं निवारयति तथा च तेभ्यः परमं सन्तोषम् आनन्दं च प्रयच्छति। (The traveller plays the role of a wise Guru. By patient guidance, he reveals the tenth person who was never lost, freeing them from sorrow.)',
            explanation: 'गुरोः उपदेशेन विना आत्मज्ञानं दुर्बोधं भवति इति अनेन ज्ञायते।',
          },
        ],
      },
    ],
  },

  // --- Grammar Worksheet 1: संख्या-पूरणशब्द-रूपाणि ---
  {
    id: 'ws-ch10-g1',
    title: 'Grammar Worksheet 1: संख्या-पूरणशब्द-रूपाणि (Cardinal to Ordinal Matrix in Three Genders)',
    titleSanskrit: 'व्याकरण-कार्यपत्रिका १: संख्या-पूरणशब्द-रूपाणि (त्रिषु लिङ्गेषु)',
    category: 'deep_ch10',
    categoryLabel: 'Lesson 10 व्याकरणम्: पूरणशब्दाः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 7,
    timeLimit: '20 mins',
    description: 'व्याकरण-अभ्यासपत्रकम् १ — प्रदत्त-सङ्ख्याशब्दानां पुंल्लिङ्गे, स्त्रीलिङ्गे, नपुंसकलिङ्गे च पूरणवाचक-रूपाणि लिखन्तु।',
    sections: [
      {
        sectionTitle: 'संख्यातः पूरणशब्दानां रचना (Cardinals to Ordinals Matrix)',
        sectionTitleSanskrit: 'त्रिषु लिङ्गेषु पूरणरूपाणि',
        instructions: 'अधोनिर्दिष्टानां संख्यानां पुंल्लिङ्गे (M), स्त्रीलिङ्गे (F), नपुंसकलिङ्गे (N) च पूरणरूपाणि लिखन्तु:',
        totalMarks: 7,
        questions: [
          {
            num: 1,
            question: 'संख्या: २ (द्वे) ➔ त्रिषु लिङ्गेषु पूरणरूपाणि लिखन्तु (M / F / N):',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: द्वितीयः | स्त्रीलिङ्गम्: द्वितीया | नपुंसकलिङ्गम्: द्वितीयम्',
            explanation: 'द्वि ➔ द्वितीयः, द्वितीया, द्वितीयम्।',
          },
          {
            num: 2,
            question: 'संख्या: ३ (त्रीणि) ➔ त्रिषु लिङ्गेषु पूरणरूपाणि लिखन्तु (M / F / N):',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: तृतीयः | स्त्रीलिङ्गम्: तृतीया | नपुंसकलिङ्गम्: तृतीयम्',
            explanation: 'त्रि ➔ तृतीयः, तृतीया, तृतीयम्।',
          },
          {
            num: 3,
            question: 'संख्या: ४ (चत्वारि) ➔ त्रिषु लिङ्गेषु पूरणरूपाणि लिखन्तु (M / F / N):',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: चतुर्थः | स्त्रीलिङ्गम्: चतुर्थी | नपुंसकलिङ्गम्: चतुर्थम्',
            explanation: 'चतुर् ➔ चतुर्थः, चतुर्थी, चतुर्थम्।',
          },
          {
            num: 4,
            question: 'संख्या: ५ (पञ्च) ➔ त्रिषु लिङ्गेषु पूरणरूपाणि लिखन्तु (M / F / N):',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: पञ्चमः | स्त्रीलिङ्गम्: पञ्चमी | नपुंसकलिङ्गम्: पञ्चमम्',
            explanation: 'पञ्चन् ➔ पञ्चमः, पञ्चमी, पञ्चमम्।',
          },
          {
            num: 5,
            question: 'संख्या: ६ (षट्) ➔ त्रिषु लिङ्गेषु पूरणरूपाणि लिखन्तु (M / F / N):',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: षष्ठः | स्त्रीलिङ्गम्: षष्ठी | नपुंसकलिङ्गम्: षष्ठम्',
            explanation: 'षष् ➔ षष्ठः, षष्ठी, षष्ठम्।',
          },
          {
            num: 6,
            question: 'संख्या: ९ (नव) ➔ त्रिषु लिङ्गेषु पूरणरूपाणि लिखन्तु (M / F / N):',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: नवमः | स्त्रीलिङ्गम्: नवमी | नपुंसकलिङ्गम्: नवमम्',
            explanation: 'नवन् ➔ नवमः, नवमी, नवमम्।',
          },
          {
            num: 7,
            question: 'संख्या: १० (दश) ➔ त्रिषु लिङ्गेषु पूरणरूपाणि लिखन्तु (M / F / N):',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: दशमः | स्त्रीलिङ्गम्: दशमी | नपुंसकलिङ्गम्: दशमम्',
            explanation: 'दशन् ➔ दशमः, दशमी, दशमम्।',
          },
        ],
      },
    ],
  },

  // --- Grammar Worksheet 2: व्यवहारानुप्रयोगः ---
  {
    id: 'ws-ch10-g2',
    title: 'Grammar Worksheet 2: व्यवहारानुप्रयोगः (Days of the Week & Fingers of the Hand)',
    titleSanskrit: 'व्याकरण-कार्यपत्रिका २: व्यवहारानुप्रयोगः (वासराः अङ्गुल्यः च)',
    category: 'deep_ch10',
    categoryLabel: 'Lesson 10 व्याकरणम्: व्यवहारानुप्रयोगः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 10,
    timeLimit: '20 mins',
    description: 'व्याकरण-अभ्यासपत्रकम् २ — पूरणशब्दानां व्यावहारिक-प्रयोगेण सप्ताहानां वासराणां हस्तस्य अङ्गुलीनां च नामानि लिखन्तु।',
    sections: [
      {
        sectionTitle: 'सप्ताहे वासराणां क्रमः (Days of the Week)',
        sectionTitleSanskrit: 'सप्ताहस्य वासराणाम् आवलिः',
        instructions: 'पूरणशब्दान् प्रयुज्य वासराणां नामानि लिखन्तु (Name the days of the week using ordinals):',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: 'सप्ताहस्य प्रथमः वासरः कः? (1st Day of Week)',
            marks: 1,
            type: 'short_ans',
            answer: 'भानुवासरः (रविवासरः / Sunday)',
            explanation: "'प्रथमः वासरः' भानुवासरः / रविवासरः भवति।",
          },
          {
            num: 2,
            question: 'सप्ताहस्य द्वितीयः वासरः कः? (2nd Day of Week)',
            marks: 1,
            type: 'short_ans',
            answer: 'सोमवासरः (Monday)',
            explanation: "'द्वितीयः वासरः' सोमवासरः भवति।",
          },
          {
            num: 3,
            question: 'सप्ताहस्य तृतीयः वासरः कः? (3rd Day of Week)',
            marks: 1,
            type: 'short_ans',
            answer: 'मङ्गलवासरः (Tuesday)',
            explanation: "'तृतीयः वासरः' मङ्गलवासरः भवति।",
          },
          {
            num: 4,
            question: 'सप्ताहस्य चतुर्थः वासरः कः? (4th Day of Week)',
            marks: 1,
            type: 'short_ans',
            answer: 'बुधवासरः (Wednesday)',
            explanation: "'चतुर्थः वासरः' बुधवासरः भवति।",
          },
          {
            num: 5,
            question: 'सप्ताहस्य पञ्चमः वासरः कः? (5th Day of Week)',
            marks: 1,
            type: 'short_ans',
            answer: 'गुरुवासरः (बृहस्पतिवासरः / Thursday)',
            explanation: "'पञ्चमः वासरः' गुरुवासरः भवति।",
          },
        ],
      },
      {
        sectionTitle: 'हस्तस्य पञ्च अङ्गुल्यः (Five Fingers of Hand)',
        sectionTitleSanskrit: 'हस्तस्य अङ्गुलीनां नामानि',
        instructions: 'स्त्रीलिङ्ग-पूरणशब्दान् प्रयुज्य हस्तस्य अङ्गुलीनां नामानि लिखन्तु (Name the fingers using feminine ordinals):',
        totalMarks: 5,
        questions: [
          {
            num: 6,
            question: 'हस्तस्य प्रथमा अङ्गुली का कथ्यते? (Thumb)',
            marks: 1,
            type: 'short_ans',
            answer: 'अङ्गुष्ठः (Thumb)',
            explanation: 'हस्ते प्रथमा अङ्गुली अङ्गुष्ठः अस्ति।',
          },
          {
            num: 7,
            question: 'हस्तस्य द्वितीया अङ्गुली का कथ्यते? (Index Finger)',
            marks: 1,
            type: 'short_ans',
            answer: 'तर्जनी (Index Finger)',
            explanation: 'अङ्गुष्ठस्य समीपे वर्तमाना द्वितीया अङ्गुली तर्जनी भवति।',
          },
          {
            num: 8,
            question: 'हस्तस्य तृतीया अङ्गुली का कथ्यते? (Middle Finger)',
            marks: 1,
            type: 'short_ans',
            answer: 'मध्यमा (Middle Finger)',
            explanation: 'हस्तस्य मध्ये वर्तमाना तृतीया दीर्घा अङ्गुली मध्यमा भवति।',
          },
          {
            num: 9,
            question: 'हस्तस्य चतुर्थी अङ्गुली का कथ्यते? (Ring Finger)',
            marks: 1,
            type: 'short_ans',
            answer: 'अनामिका (Ring Finger)',
            explanation: 'कनिष्ठिकायाः मध्यमायाः च मध्ये चतुर्थी अङ्गुली अनामिका भवति।',
          },
          {
            num: 10,
            question: 'हस्तस्य पञ्चमी अङ्गुली का कथ्यते? (Little Finger)',
            marks: 1,
            type: 'short_ans',
            answer: 'कनिष्ठिका (Little Finger)',
            explanation: 'हस्तस्य अन्तिमा लघ्वी पञ्चमी अङ्गुली कनिष्ठिका भवति।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 11: द्वीपेषु रम्यः द्वीपोऽण्डमानः (CHAPTER ASSESSMENTS)
  // ==========================================
  // --- Worksheet 1: रिक्तस्थानपूर्तिः ---
  {
    id: 'ws-ch11-1',
    title: 'Worksheet 1: रिक्तस्थानपूर्तिः (Fill in the Blanks)',
    titleSanskrit: 'कार्यपत्रकम् १: पाठानुसारं रिक्तस्थानपूर्तिः',
    category: 'deep_ch11',
    categoryLabel: 'Lesson 11: द्वीपेषु रम्यः द्वीपोऽण्डमानः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् १ — पाठाधारितानि वाक्यानि पठित्वा समुचितैः पदैः रिक्तस्थानानि पूरयन्तु।',
    sections: [
      {
        sectionTitle: 'रिक्तस्थानपूर्तिः (Fill in the Blanks)',
        sectionTitleSanskrit: 'उचितपदैः वाक्यानि पूरयत',
        instructions: 'पाठाधारेण अधोलिखितानां वाक्यानां रिक्तस्थानानि पूरयन्तु:',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: 'एषः भारतस्य अष्टसु __________ प्रदेशेषु अन्यतमः अण्डमान-द्वीपसमूहः अस्ति।',
            marks: 1,
            type: 'short_ans',
            answer: 'केन्द्रशासित',
            explanation: 'अण्डमान-निकोबार-द्वीपसमूहः भारतस्य अष्टसु केन्द्रशासितप्रदेशेषु अन्यतमः अस्ति।',
          },
          {
            num: 2,
            question: 'सर्वकारः अण्डमानी-ओङ्गी-जारवा-जनजातीनाम् आजीविकायै __________ उद्यानानां निर्माणम् अकरोत्।',
            marks: 1,
            type: 'short_ans',
            answer: 'नारिकेलस्य',
            explanation: 'पाठानुसारं सर्वकारेण जनजातीनां सहायतार्थं नारिकेलस्य उद्यानानां निर्माणं कृतम्।',
          },
          {
            num: 3,
            question: 'वयं तत्र सर्वत्र प्रकृतेः हारित्यं __________ समुद्रं च दृष्टवन्तः।',
            marks: 1,
            type: 'short_ans',
            answer: 'नीलं / नील',
            explanation: 'राजर्षिः स्वभ्रमणवर्णने कथयति - "वयं तत्र सर्वत्र प्रकृतेः हारित्यं नीलसमुद्रं च दृष्टवन्तः।"',
          },
          {
            num: 4,
            question: 'समुद्रस्य अन्तर्भागः विविधवर्णैः मत्स्यैः कच्छपैः अन्यैः जलचरैः __________ च अलङ्कृतः दृश्यते।',
            marks: 1,
            type: 'short_ans',
            answer: 'प्रवालशृङ्खलाभिः / प्रवालभित्तिभिः',
            explanation: 'समुद्रस्य अधः प्रवालशृङ्खलाभिः (Coral reefs) मनोहरं दृश्यं भवति।',
          },
          {
            num: 5,
            question: 'केचन कृषिकार्येण __________ च जीविकां निर्वहन्ति।',
            marks: 1,
            type: 'short_ans',
            answer: 'मत्स्यव्यापारेण',
            explanation: 'पाठे उक्तम् - "केचन कृषिकार्येण मत्स्यव्यापारेण च जीविकां निर्वहन्ति।"',
          },
        ],
      },
    ],
  },

  // --- Worksheet 2: जनजातयः आजीविका-साधनानि च ---
  {
    id: 'ws-ch11-2',
    title: 'Worksheet 2: जनजातयः आजीविका-साधनानि च (Tribes & Livelihoods Matrix)',
    titleSanskrit: 'कार्यपत्रकम् २: जनजातयः आजीविका-साधनानि च',
    category: 'deep_ch11',
    categoryLabel: 'Lesson 11: द्वीपेषु रम्यः द्वीपोऽण्डमानः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 9,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् २ — अण्डमान-द्वीपस्य जनजातीनां स्थानीय-व्यापार-उत्पादानां च आवलिं रचयन्तु।',
    sections: [
      {
        sectionTitle: 'अण्डमानस्य विशिष्टाः जनजातयः (Tribes of Andaman)',
        sectionTitleSanskrit: 'चतस्रः विशिष्टाः जनजातयः',
        instructions: 'पाठे उल्लिखितानां चतसृणां जनजातीनां नामानि लिखन्तु (List 4 native tribes):',
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: 'अण्डमानद्वीपे निवसती प्रथमा जनजातिः:',
            marks: 1,
            type: 'short_ans',
            answer: 'अण्डमानी (Andamanese)',
            explanation: 'अण्डमान-द्वीपसमूहस्य प्राचीना जनजातिः।',
          },
          {
            num: 2,
            question: 'अण्डमानद्वीपे निवसती द्वितीया जनजातिः:',
            marks: 1,
            type: 'short_ans',
            answer: 'ओङ्गी (Onge)',
            explanation: 'अण्डमानस्य विशिष्टा वनवासी जनजातिः।',
          },
          {
            num: 3,
            question: 'अण्डमानद्वीपे निवसती तृतीया जनजातिः:',
            marks: 1,
            type: 'short_ans',
            answer: 'जारवा (Jarawa)',
            explanation: 'अण्डमानस्य प्रसिद्धा जनजातिः।',
          },
          {
            num: 4,
            question: 'आधुनिक-समाजात् दूरे स्थिता अतिस्वल्प-जनसंख्यायुक्ता जनजातिः:',
            marks: 1,
            type: 'short_ans',
            answer: 'सेण्टिनली (Sentinelese)',
            explanation: 'सेण्टिनली-जनाः बाह्यसमाजात् दूरे तिष्ठन्ति।',
          },
        ],
      },
      {
        sectionTitle: 'स्थानीय-उत्पादाः व्यापाराः च (Livelihood Products & Trade)',
        sectionTitleSanskrit: 'आजीविकायाः पञ्च प्रमुखाः साधनानि',
        instructions: 'अण्डमानवासिनां जीविकायै प्रयुक्तानां पञ्च उत्पाद-व्यापाराणां नामानि लिखन्तु (List 5 items / activities):',
        totalMarks: 5,
        questions: [
          {
            num: 5,
            question: 'स्थानीय-उत्पादः १ (मोतियों की माला):',
            marks: 1,
            type: 'short_ans',
            answer: 'मुक्तामालाः (Pearl necklaces)',
            explanation: 'समुद्रीय-मुक्ताभिः मालानां निर्माणं क्रियते।',
          },
          {
            num: 6,
            question: 'स्थानीय-उत्पादः २ (सीप-शिल्प):',
            marks: 1,
            type: 'short_ans',
            answer: 'शुक्तिशिल्पानि (Seashell handicrafts)',
            explanation: 'शुक्तिभिः सुन्दराणि हस्तशिल्पानि निर्मान्ति।',
          },
          {
            num: 7,
            question: 'स्थानीय-उत्पादः ३ (नारियल-शिल्प):',
            marks: 1,
            type: 'short_ans',
            answer: 'नारिकेलशिल्पानि (Coconut crafts)',
            explanation: 'नारिकेलस्य आवरणैः विविधाः कलाकृतयः रच्यन्ते।',
          },
          {
            num: 8,
            question: 'स्थानीय-उत्पादः ४ (काष्ठोपकरणानि/फर्नीचर):',
            marks: 1,
            type: 'short_ans',
            answer: 'काष्ठोपस्कराः (Wooden furniture / accessories)',
            explanation: 'काष्ठेन विविधाः उपस्कराः सज्जीक्रियन्ते।',
          },
          {
            num: 9,
            question: 'स्थानीय-व्यापारः ५ (मत्स्य-व्यापारः कृषिकार्यं च):',
            marks: 1,
            type: 'short_ans',
            answer: 'मत्स्यव्यापारः कृषिकार्यं च (Fish trade & Agriculture)',
            explanation: 'समुद्रतटे मत्स्यपालनं कृषिः च मुख्यं साधनम्।',
          },
        ],
      },
    ],
  },

  // --- Worksheet 3: भूगोलः पर्यटन-स्थानानि च ---
  {
    id: 'ws-ch11-3',
    title: 'Worksheet 3: भूगोलः पर्यटन-स्थानानि च (Geography & Tourism Tracker)',
    titleSanskrit: 'कार्यपत्रकम् ३: भूगोलः पर्यटन-स्थानानि च',
    category: 'deep_ch11',
    categoryLabel: 'Lesson 11: द्वीपेषु रम्यः द्वीपोऽण्डमानः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् ३ — पाठाधारेण अण्डमानद्वीपस्य विशिष्ट-भौगोलिक-पर्यटनस्थानानां नामानि लिखन्तु।',
    sections: [
      {
        sectionTitle: 'पर्यटन-भूगोलः (Tourist Locations)',
        sectionTitleSanskrit: 'भौगोलिक-स्थानानाम् अभिज्ञानम्',
        instructions: 'विवरणम् आधृत्य समीचीनं स्थाननाम लिखन्तु:',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: "The beach highly distinguished among India's coastlines for its white sand (श्वेतरेणुः):",
            marks: 1,
            type: 'short_ans',
            answer: 'राधानगर-तटः (Radhanagar Beach)',
            explanation: 'राधानगर-तटः श्वेतरेणुना, नीलेन निर्मलेन जलेन च विश्वप्रसिद्धः अस्ति।',
          },
          {
            num: 2,
            question: 'The alternative modern name given to Havelock Island (हैवलॉक्-द्वीपः):',
            marks: 1,
            type: 'short_ans',
            answer: 'स्वराजद्वीपः (Swaraj Dweep)',
            explanation: "हैवलॉक्-द्वीपस्य नूतनं नाम 'स्वराजद्वीपः' इति कृतम्।",
          },
          {
            num: 3,
            question: 'Two specific coastal zones where underwater activities like Scuba Diving occur (तटद्वयस्य नामनी):',
            marks: 1,
            type: 'short_ans',
            answer: 'एलीफेण्टा-तटः (Elephanta Beach) तथा नॉर्थ-बे-अन्तरीपः (North Bay Reef)',
            explanation: 'एतयोः स्थानयोः सिन्धुतलविहारः, स्कूबाडाइविङ्ग, स्नॉर्कलिङ्ग् च भवन्ति।',
          },
          {
            num: 4,
            question: 'The national marine park named after a prominent Indian leader:',
            marks: 1,
            type: 'short_ans',
            answer: 'महात्मा गान्धि मरीन राष्ट्रियम् उद्यानम् (Mahatma Gandhi Marine National Park)',
            explanation: 'अयं राष्ट्रिय-उद्यानः समुद्रीय-जीवानां प्रवालानां च रक्षणाय प्रसिद्धः।',
          },
          {
            num: 5,
            question: 'The famous naval and marine museum in Port Blair / Sri Vijay Puram:',
            marks: 1,
            type: 'short_ans',
            answer: 'समुद्रिका-नौसेना-समुद्रीय-सङ्ग्रहालयः (Samudrika Naval Marine Museum)',
            explanation: 'नौसेनायाः समुद्रीय-जीव-इतिहास-प्रदर्शकः सङ्ग्रहालयः।',
          },
        ],
      },
    ],
  },

  // --- Worksheet 4: श्लोकावबोधनम् सौन्दर्यदर्शनं च ---
  {
    id: 'ws-ch11-4',
    title: 'Worksheet 4: श्लोकावबोधनम् सौन्दर्यदर्शनं च (Shloka Analysis & Appreciation)',
    titleSanskrit: 'कार्यपत्रकम् ४: श्लोकावबोधनम् सौन्दर्यदर्शनं च',
    category: 'deep_ch11',
    categoryLabel: 'Lesson 11: द्वीपेषु रम्यः द्वीपोऽण्डमानः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् ४ — पाठस्य अन्तिमं राष्ट्रभक्तिपूर्णं श्लोकं पठित्वा प्रश्नानाम् उत्तराणि लिखन्तु।',
    sections: [
      {
        sectionTitle: 'श्लोकावबोधनम् (Shloka Comprehension)',
        sectionTitleSanskrit: 'श्लोकार्थ-चिन्तनम्',
        instructions: 'श्लोकः: "हुतात्मनां पूततपः स्थलीयं विनायकादिस्तुतिभाजनानाम् । स्वराष्ट्रधर्मं ननु शिक्षयन्ती सुदर्शनीया भुवि तीर्थकल्पा ॥"',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: 'Why is this island referred to as a पूततपः स्थली (pure land of penance)? Which historical struggles give it this status?',
            marks: 2,
            type: 'short_ans',
            answer: "भारतस्य स्वातन्त्र्यार्थं प्राणान् समर्पयतां क्रान्तिकारिणां देशभक्तानां च (विशेषतः स्वातन्त्र्यवीर-विनायकदामोदर-सावरकरस्य) घोर-तपस्यायाः यातनानां च स्थली यतः अस्ति, अतः इयं पूततपः स्थली कथ्यते। (It is called a sacred land of penance because here countless patriots and revolutionaries, notably Veer Vinayak Damodar Savarkar, endured extreme torment, cellular confinement, and penance for India's liberation.)",
            explanation: 'वीर-क्रान्तिकारिणां बलिदानेन एषा भूमिः पवित्रा तपःस्थली जाता।',
          },
          {
            num: 2,
            question: 'What does this island teach (शिक्षयन्ती) to the people visiting it?',
            marks: 2,
            type: 'short_ans',
            answer: "इदं स्थानं सर्वेभ्यः दर्शकेभ्यः \"स्वराष्ट्रधर्मम्\" (देशभक्तिं, राष्ट्ररक्षणकर्तव्यं, मातृभूमिसेवां च) शिक्षयति। (It inspires and teaches every visitor devotion towards one's motherland, patriotism, and the sacred duty of national service.)",
            explanation: 'श्लोके स्पष्टम् अस्ति - "स्वराष्ट्रधर्मं ननु शिक्षयन्ती"।',
          },
          {
            num: 3,
            question: 'Write the term used in the shloka that means "comparable to a place of pilgrimage":',
            marks: 1,
            type: 'short_ans',
            answer: "'तीर्थकल्पा' (तीर्थसदृशी - comparable to a sacred place of pilgrimage).",
            explanation: "'तीर्थकल्पा' इत्यस्य अर्थः तीर्थस्य कल्पः / तीर्थसमाना इति भवति।",
          },
        ],
      },
    ],
  },

  // --- Worksheet 5: संवाद-वक्तृ-परिचयः ---
  {
    id: 'ws-ch11-5',
    title: 'Worksheet 5: संवाद-वक्तृ-परिचयः (Dialogue Speaker Identification)',
    titleSanskrit: 'कार्यपत्रकम् ५: संवाद-वक्तृ-परिचयः',
    category: 'deep_ch11',
    categoryLabel: 'Lesson 11: द्वीपेषु रम्यः द्वीपोऽण्डमानः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 4,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् ५ — पाठस्य संवादे कः एतानि वाक्यानि अवदत् इति स्पष्टीकुर्वन्तु।',
    sections: [
      {
        sectionTitle: 'वक्तृ-परिचयः (Speaker Identification)',
        sectionTitleSanskrit: 'संवादस्य वक्ता कः?',
        instructions: 'अधोलिखितानां वाक्यानां वक्ता कः इति लिखत (Identify the speaker):',
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: '"महोदये ! वयम् एतस्य विषये किञ्चित् अधिकं ज्ञातुम् इच्छामः।" — Spoken by:',
            marks: 1,
            type: 'short_ans',
            answer: 'सर्वे बालाः / छात्राः',
            explanation: 'अध्यापिकायाः प्रारम्भिक-परिचयानन्तरं सर्वे बालाः मिलित्वा एतत् अवदन्।',
          },
          {
            num: 2,
            question: `"रामायणकाले अस्य द्वीपस्य नाम 'हण्डुकमान्' आसीत्।" — Spoken by:`,
            marks: 1,
            type: 'short_ans',
            answer: 'सूर्यांशः',
            explanation: 'सूर्यांशः पूर्वदिने जालपुटे अन्वेषणं कृत्वा एतत् तथ्यम् उपस्थापितवान्।',
          },
          {
            num: 3,
            question: '"अहो ! धन्याः ते स्वातन्त्र्यवीराः । तेषां बलिदानेन एव वयं सुखेन जीवामः।" — Spoken by:',
            marks: 1,
            type: 'short_ans',
            answer: 'मुकुन्दः',
            explanation: 'सावरकरस्य यातनानां श्रवणानन्तरं मुकुन्दः कृतज्ञतापूर्वकम् एतत् अवदत्।',
          },
          {
            num: 4,
            question: '"अहम् एकदा पित्रा सह भ्रमणाय तत्र अगच्छम्।" — Spoken by:',
            marks: 1,
            type: 'short_ans',
            answer: 'राजर्षिः',
            explanation: 'राजर्षिः स्वस्य पूर्वभ्रमणस्य प्रत्यक्षानुभवं कक्ष्यायां न्यवेदयत्।',
          },
        ],
      },
    ],
  },

  // --- Grammar Worksheet 1: षष्ठी-तत्पुरुष-समासः ---
  {
    id: 'ws-ch11-g1',
    title: 'Grammar Worksheet 1: षष्ठी-तत्पुरुष-समासः (Compound Words Construction)',
    titleSanskrit: 'व्याकरण-कार्यपत्रिका १: षष्ठी-तत्पुरुष-समासः',
    category: 'deep_ch11',
    categoryLabel: 'Lesson 11 व्याकरणम्: षष्ठी-तत्पुरुषः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '15 mins',
    description: 'व्याकरण-अभ्यासपत्रकम् १ — पूर्वपदस्य विभक्तिं विलोप्य समस्तपदं रचयन्तु (यथा: समुद्रस्य मध्ये ➔ समुद्रमध्ये)।',
    sections: [
      {
        sectionTitle: 'षष्ठी-तत्पुरुष-समास-रचना (Compound Words)',
        sectionTitleSanskrit: 'विग्रहपदेभ्यः समस्तपदनिर्माणम्',
        instructions: 'अधोदत्तानां विग्रहपदानां षष्ठी-तत्पुरुष-नियमानुसारेण समस्तपदानि लिखन्तु:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'द्वीपानां समूहः ➔ समस्तपदं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'द्वीपसमूहः',
            explanation: "'द्वीपानाम्' इत्यस्य षष्ठी-विभक्तेः लोपे 'द्वीप' + 'समूहः' = द्वीपसमूहः।",
          },
          {
            num: 2,
            question: 'रामायणस्य काले ➔ समस्तपदं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'रामायणकाले',
            explanation: "'रामायणस्य' षष्ठी-लोपे 'रामायण' + 'काले' = रामायणकाले।",
          },
          {
            num: 3,
            question: 'भारतस्य भूमिः ➔ समस्तपदं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'भारतभूमिः',
            explanation: "'भारतस्य' षष्ठी-लोपे 'भारत' + 'भूमिः' = भारतभूमिः।",
          },
          {
            num: 4,
            question: 'उद्योगस्य विषयः ➔ समस्तपदं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'उद्योगविषयः',
            explanation: "'उद्योगस्य' षष्ठी-लोपे 'उद्योग' + 'विषयः' = उद्योगविषयः।",
          },
          {
            num: 5,
            question: 'देशस्य भक्तः ➔ समस्तपदं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'देशभक्तः',
            explanation: "'देशस्य' षष्ठी-लोपे 'देश' + 'भक्तः' = देशभक्तः।",
          },
          {
            num: 6,
            question: 'समुद्रस्य तलम् ➔ समस्तपदं रचयन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'समुद्रतलम्',
            explanation: "'समुद्रस्य' षष्ठी-लोपे 'समुद्र' + 'तलम्' = समुद्रतलम्।",
          },
        ],
      },
    ],
  },

  // --- Grammar Worksheet 2: पदविभागः ---
  {
    id: 'ws-ch11-g2',
    title: 'Grammar Worksheet 2: पदविभागः (Indeclinables & Verb Forms Classification)',
    titleSanskrit: 'व्याकरण-कार्यपत्रिका २: पदविभागः (अव्ययानि क्रियापदानि च)',
    category: 'deep_ch11',
    categoryLabel: 'Lesson 11 व्याकरणम्: पदविभागः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 10,
    timeLimit: '20 mins',
    description: 'व्याकरण-अभ्यासपत्रकम् २ — पाठस्य संवादेभ्यः पञ्च अव्ययानि पञ्च क्रियापदानि च चित्वा तेषाम् अर्थं लिखन्तु।',
    sections: [
      {
        sectionTitle: 'अव्ययपदानि (Indeclinables Classification)',
        sectionTitleSanskrit: 'पाठात् पञ्च अव्ययानि',
        instructions: 'पाठगतानां पञ्चानाम् अव्ययपदानां नामानि लिखन्तु (यथा: कुत्र):',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: "अव्ययपदम् १ ('कुत्र' इव स्थानसूचकम् अव्ययम्):",
            marks: 1,
            type: 'short_ans',
            answer: 'अत्र (Here)',
            explanation: "'अत्र' सर्वदा अपरिवर्तनीयं स्थानबोधकम् अव्ययम् अस्ति।",
          },
          {
            num: 2,
            question: 'अव्ययपदम् २ (स्थानसूचकम्):',
            marks: 1,
            type: 'short_ans',
            answer: 'तत्र (There)',
            explanation: "'तत्र' सर्वदा अपरिवर्तनीयं स्थानबोधकम् अव्ययम्।",
          },
          {
            num: 3,
            question: 'अव्ययपदम् ३ (निश्चयार्थकम्):',
            marks: 1,
            type: 'short_ans',
            answer: 'एव (Only / Indeed)',
            explanation: "'एव' अवधारणार्थकं निश्चयार्थकम् अव्ययम्।",
          },
          {
            num: 4,
            question: 'अव्ययपदम् ४ (समुच्चयबोधकम्):',
            marks: 1,
            type: 'short_ans',
            answer: 'च (And)',
            explanation: "'च' द्वयोः बहूनां वा पदानां संयोजकम् अव्ययम्।",
          },
          {
            num: 5,
            question: 'अव्ययपदम् ५ (सहार्थे):',
            marks: 1,
            type: 'short_ans',
            answer: 'सह (With)',
            explanation: "'सह' योगे तृतीया विभक्तिः प्रयुज्यते।",
          },
        ],
      },
      {
        sectionTitle: 'क्रियापदानि (Verb Forms Classification)',
        sectionTitleSanskrit: 'पाठात् पञ्च क्रियापदानि',
        instructions: 'पाठगतानां पञ्चानां क्रियापदानां नामानि लिखन्तु (यथा: स्मरामि):',
        totalMarks: 5,
        questions: [
          {
            num: 6,
            question: "क्रियापदम् १ ('अस्ति' धातुपरिचयः):",
            marks: 1,
            type: 'short_ans',
            answer: 'अस्ति (अस् धातु, लट् लकार, प्रथमपुरुष, एकवचनम्)',
            explanation: "'अस्ति' सत्तायाम् अस् धातोः रूपम्।",
          },
          {
            num: 7,
            question: "क्रियापदम् २ ('इच्छामः' धातुपरिचयः):",
            marks: 1,
            type: 'short_ans',
            answer: 'इच्छामः (इष् धातु, लट् लकार, उत्तमपुरुष, बहुवचनम्)',
            explanation: "'इच्छामः' वयम् इच्छामः इत्यर्थे।",
          },
          {
            num: 8,
            question: "क्रियापदम् ३ ('पश्यन्तु' आज्ञार्थकम्):",
            marks: 1,
            type: 'short_ans',
            answer: 'पश्यन्तु (दृश्/पश् धातु, लोट् लकार, प्रथमपुरुष, बहुवचनम्)',
            explanation: "'पश्यन्तु' छात्राः पश्यन्तु इत्याज्ञायां।",
          },
          {
            num: 9,
            question: "क्रियापदम् ४ ('जीवामः' धातुपरिचयः):",
            marks: 1,
            type: 'short_ans',
            answer: 'जीवामः (जीव् धातु, लट् लकार, उत्तमपुरुष, बहुवचनम्)',
            explanation: "'जीवामः' वयं सुखेन जीवामः।",
          },
          {
            num: 10,
            question: "क्रियापदम् ५ ('सोढवान्' भूतकालिक-कृदन्तः/क्रियारूपम्):",
            marks: 1,
            type: 'short_ans',
            answer: 'सोढवान् (सह् धातु, क्तवतु प्रत्ययः, पुंल्लिङ्गम्)',
            explanation: "'सोढवान्' कष्टं सोढवान् (सहन किया)।",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LESSON 12: वीराङ्गना पन्नाधाया (CHAPTER ASSESSMENTS)
  // ==========================================
  // --- Worksheet 1: रिक्तस्थानपूर्तिः ---
  {
    id: 'ws-ch12-1',
    title: 'Worksheet 1: रिक्तस्थानपूर्तिः (Fill in the Blanks)',
    titleSanskrit: 'कार्यपत्रकम् १: रिक्तस्थानपूर्तिः',
    category: 'deep_ch12',
    categoryLabel: 'Lesson 12: वीराङ्गना पन्नाधाया',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् १ — पाठाधारेण अधोलिखितानां वाक्यानां रिक्तस्थानानि पूरयन्तु।',
    sections: [
      {
        sectionTitle: 'रिक्तस्थानपूर्तिः (Fill in the Blanks)',
        sectionTitleSanskrit: 'उचितपदैः वाक्यानि पूरयत',
        instructions: 'पाठाधारेण अधोलिखितानां वाक्यानां रिक्तस्थानानि पूरयन्तु:',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: 'त्यागे वीरतायां च महिलानां __________ योगदानम् अस्ति।',
            marks: 1,
            type: 'short_ans',
            answer: 'महत् / अद्वितीयम्',
            explanation: 'पाठानुसारं मातृभूमेः रक्षणाय महिलानाम् अपि महद् योगदानम् अस्ति।',
          },
          {
            num: 2,
            question: 'बनवीरः विक्रमादित्यं __________ मारयित्वा मेवाडस्य शासनम् अकरोत्।',
            marks: 1,
            type: 'short_ans',
            answer: 'छलेन',
            explanation: "बनवीरः छलपूर्वकं ज्येष्ठपुत्रं विक्रमादित्यं हत्वा शासनम् अकरोत्।",
          },
          {
            num: 3,
            question: "'व्यक्तिहितं न, __________ एव श्रेष्ठम्' इति पन्नाधाया जानाति स्म।",
            marks: 1,
            type: 'short_ans',
            answer: 'राष्ट्रहितम्',
            explanation: "पन्नाधाया व्यक्तिगत-स्वार्थं त्यक्त्वा राष्ट्रहितं सर्वोपरि अमन्यत।",
          },
          {
            num: 4,
            question: 'पन्नाधाया उदयसिंहस्य शयनस्थाने स्वपुत्रं __________ शायितवती।',
            marks: 1,
            type: 'short_ans',
            answer: 'चन्दनम्',
            explanation: 'राजपुत्रस्य रक्षणार्थं पन्नाधाया स्वपुत्रं चन्दनं शयने शायितवती।',
          },
          {
            num: 5,
            question: 'यदि पन्नाधाया स्वपुत्रस्य बलिदानं न अकरिष्यत् तर्हि __________ न अभविष्यत्।',
            marks: 1,
            type: 'short_ans',
            answer: 'महाराणाप्रतापः / उदयसिंहः',
            explanation: 'उदयसिंहस्य रक्षणेन एव कालान्तरे महाराणाप्रतापस्य जन्म सम्भवम् अभवत्।',
          },
        ],
      },
    ],
  },

  // --- Worksheet 2: घटनाक्रम-संयोजनम् ---
  {
    id: 'ws-ch12-2',
    title: 'Worksheet 2: घटनाक्रम-संयोजनम् (Event Sequencing Activity)',
    titleSanskrit: 'कार्यपत्रकम् २: घटनाक्रम-संयोजनम्',
    category: 'deep_ch12',
    categoryLabel: 'Lesson 12: वीराङ्गना पन्नाधाया',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् २ — पन्नाधायायाः बलिदानकथायाः घटनानां समुचितं कालगणनाक्रमं (१ तः ५) लिखन्तु।',
    sections: [
      {
        sectionTitle: 'घटनाक्रम-योजनम् (Chronological Sequencing)',
        sectionTitleSanskrit: 'ऐतिहासिक-घटनाक्रमः',
        instructions: 'कथायाः घटनानां समुचितं क्रमं संयोजयत (१ तः ५):',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: 'प्रथमघटना: सङ्ग्रामसिंहस्य मृत्योः अनन्तरं बनवीरः किम् अचिन्तयत्?',
            marks: 1,
            type: 'short_ans',
            answer: 'महाराणा-सङ्ग्रामसिंहस्य मृत्योः परं बनवीरः मेवाडस्य राजा भवितुम् अचिन्तयत्।',
            explanation: 'सङ्ग्रामसिंहस्य मृत्योः अनन्तरं बनवीरस्य मनसि निष्कण्टकराज्ञः भवितुम् दुष्टबुद्धिः आगता।',
          },
          {
            num: 2,
            question: 'द्वितीयघटना: बनवीरः रात्रौ कं मारयितुं षड्यन्त्रम् अरचयत्?',
            marks: 1,
            type: 'short_ans',
            answer: 'बनवीरः रात्रौ उदयसिंहं मारयितुं कुतन्त्रम् अरचयत्।',
            explanation: 'उदयसिंहः उत्तराधिकारी आसीत्, अतः तं मारयितुं कुतन्त्रं रचितम्।',
          },
          {
            num: 3,
            question: 'तृतीयघटना: कुतन्त्रं ज्ञात्वा पन्नाधाया किं कृतवती?',
            marks: 1,
            type: 'short_ans',
            answer: 'पन्नाधाया उदयसिंहस्य शयने स्वपुत्रं चन्दनं शायितवती।',
            explanation: 'पन्नाधाया उदयसिंहं सुरक्षितं प्रेषयित्वा स्वपुत्रं तस्य शयने शायितवती।',
          },
          {
            num: 4,
            question: 'चतुर्थघटना: बनवीरः शयनकक्षे आगत्य कं हतवान्?',
            marks: 1,
            type: 'short_ans',
            answer: 'बनवीरः चन्दनम् उदयसिंहं मत्वा अमारयत्।',
            explanation: 'बनवीरः भ्रान्त्या चन्दनम् एव उदयसिंहं मत्वा खड्गेन अमारयत्।',
          },
          {
            num: 5,
            question: 'पञ्चमघटना: कालान्तरे मेवाडराज्ये किं घटितम्?',
            marks: 1,
            type: 'short_ans',
            answer: 'उदयसिंहः कालान्तरे युद्धे बनवीरं हत्वा राजा अभवत्।',
            explanation: 'यौवने उदयसिंहः बनवीरं पराजित्य हत्वा मेवाडस्य न्याय्यः राजा अभवत्।',
          },
        ],
      },
    ],
  },

  // --- Worksheet 3: गद्यांशावबोधनम् ---
  {
    id: 'ws-ch12-3',
    title: 'Worksheet 3: गद्यांशावबोधनम् (Comprehension Paragraph Analysis)',
    titleSanskrit: 'कार्यपत्रकम् ३: गद्यांशावबोधनम्',
    category: 'deep_ch12',
    categoryLabel: 'Lesson 12: वीराङ्गना पन्नाधाया',
    grade: 'Class 7 (CBSE)',
    totalMarks: 4,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् ३ — गद्यांशं पठित्वा प्रश्नानाम् उत्तराणि संस्कृतेन लिखन्तु।',
    sections: [
      {
        sectionTitle: 'गद्यांश-अवबोधनम् (Passage Reading)',
        sectionTitleSanskrit: 'अनुच्छेदं पठित्वा उत्तराणि',
        instructions: `गद्यांशः: "पन्नाधायायाः निर्णयः अकल्पनीयः आसीत्। 'व्यक्तिहितं न, राष्ट्रहितम् एव श्रेष्ठम्' इति सा जानाति स्म। तस्याः पुत्रस्तु दिवङ्गतः, परं सा मेवाडराज्यं बनवीरस्य कुतन्त्रात् अरक्षत्। कालान्तरे सः एव उदयसिंहः युद्धे बनवीरं हत्वा मेवाडराज्यस्य राजा अभवत्। तस्य पुत्रः एव पराक्रमी योद्धा महाराणाप्रतापः।"`,
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: 'पन्नाधायायाः कः निर्णयः अकल्पनीयः आसीत्?',
            marks: 1,
            type: 'short_ans',
            answer: 'स्वपुत्रस्य चन्दनस्य बलिदानं कृत्वा राजपुत्रस्य उदयसिंहस्य रक्षणं पन्नाधायायाः अकल्पनीयः निर्णयः आसीत्।',
            explanation: 'स्वपुत्रस्य प्राणान् समर्प्य राष्ट्रस्य भावि-नृपं रक्षितवती।',
          },
          {
            num: 2,
            question: 'पन्नाधाया कस्य कुतन्त्रात् मेवाडराज्यम् अरक्षत्?',
            marks: 1,
            type: 'short_ans',
            answer: 'पन्नाधाया दुराचारिणः बनवीरस्य कुतन्त्रात् मेवाडराज्यम् अरक्षत्।',
            explanation: 'बनवीरस्य दुष्टषड्यन्त्रात् सा मेवाडस्य राजकुलम् अरक्षत्।',
          },
          {
            num: 3,
            question: 'राष्ट्रहितस्य विषये पन्नाधायायाः कः विचारः आसीत्?',
            marks: 1,
            type: 'short_ans',
            answer: "'व्यक्तिहितं न, राष्ट्रहितम् एव श्रेष्ठम् (सर्वोपरि)' इति पन्नाधायायाः विचारः आसीत्।",
            explanation: 'राष्ट्रस्य हिताय व्यक्तिगत-सुखस्य पुत्रस्य च त्यागः कृतः।',
          },
          {
            num: 4,
            question: 'पन्नाधायायाः त्यागेन मेवाडराज्यस्य भविष्ये कः महान् योद्धा उद्भूतः?',
            marks: 1,
            type: 'short_ans',
            answer: 'पन्नाधायायाः त्यागेन मेवाडराज्यस्य भविष्ये पराक्रमी योद्धा महाराणाप्रतापः उद्भूतः।',
            explanation: 'उदयसिंहस्य रक्षणात् एव महाराणाप्रतापस्य आविर्भावः अभवत्।',
          },
        ],
      },
    ],
  },

  // --- Worksheet 4: वाक्यानाम् अनुवाद-अभ्यासः ---
  {
    id: 'ws-ch12-4',
    title: 'Worksheet 4: वाक्यानाम् अनुवाद-अभ्यासः (Sentence Translation Practice)',
    titleSanskrit: 'कार्यपत्रकम् ४: वाक्यानाम् अनुवाद-अभ्यासः',
    category: 'deep_ch12',
    categoryLabel: 'Lesson 12: वीराङ्गना पन्नाधाया',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् ४ — पाठगतानां प्रमुखाणां वाक्यानां मातृभाषायाम् (हिन्दी/English) अनुवादं लिखन्तु।',
    sections: [
      {
        sectionTitle: 'वाक्य-अनुवादः (Translation of Sentences)',
        sectionTitleSanskrit: 'हिन्दी-आङ्गल-भाषानुवादः',
        instructions: 'अधोलिखितानां वाक्यानां हिन्दी-आङ्गल-भाषयोः अनुवादं कुरुत:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: '"एषा भारतभूमिः वीराणां त्यागधनानां भूमिः अस्ति।" ➔ Translate into Hindi or English:',
            marks: 2,
            type: 'short_ans',
            answer: 'हिन्दी: यह भारतभूमि वीरों और सर्वस्व त्यागने वाले बलिदानियों की भूमि है। / English: This land of India is the land of brave heroes and self-sacrificing souls.',
            explanation: "'त्यागधनानाम्' = जिनके लिए त्याग ही सबसे बड़ा धन है।",
          },
          {
            num: 2,
            question: '"न कोऽपि मम प्रतिस्पर्धी स्यात् इति बनवीरः अचिन्तयत्।" ➔ Translate into Hindi or English:',
            marks: 2,
            type: 'short_ans',
            answer: 'हिन्दी: "मेरा कोई भी प्रतिद्वंद्वी (प्रतिस्पर्धी) न रहे"—ऐसा बनवीर ने सोचा। / English: Banveer thought, "Let there be no rival or competitor against me."',
            explanation: "'प्रतिस्पर्धी' = प्रतिद्वंद्वी / rival; 'स्यात्' = रहे / should be.",
          },
          {
            num: 3,
            question: '"पन्नाधायायाः त्यागः शौर्यं च जगति आचन्द्रार्कं तिष्ठति।" ➔ Translate into Hindi or English:',
            marks: 2,
            type: 'short_ans',
            answer: 'हिन्दी: पन्नाधाय का त्याग और पराक्रम इस संसार में सूर्य और चंद्रमा के रहने तक अमर रहेगा। / English: The supreme sacrifice and valour of Panna Dhai shall endure in this world as long as the sun and moon exist.',
            explanation: "'आचन्द्रार्कम्' = जब तक सूर्य और चन्द्रमा हैं।",
          },
        ],
      },
    ],
  },

  // --- Worksheet 5: ऐतिहासिक-शासन-व्यूह-चार्टः ---
  {
    id: 'ws-ch12-5',
    title: 'Worksheet 5: ऐतिहासिक-शासन-व्यूह-चार्टः (Fact Mapping & Ancient Warfare Formations)',
    titleSanskrit: 'कार्यपत्रकम् ५: ऐतिहासिक-शासन-व्यूह-चार्टः',
    category: 'deep_ch12',
    categoryLabel: 'Lesson 12: वीराङ्गना पन्नाधाया',
    grade: 'Class 7 (CBSE)',
    totalMarks: 10,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् ५ — कौटिल्यस्य राज्यस्य सप्ताङ्गानि युद्धे रचितानां त्रयाणां व्यूहानां च नामानि लिखन्तु।',
    sections: [
      {
        sectionTitle: 'राज्यस्य सप्त अङ्गानि (Seven Limbs of State - Saptanga)',
        sectionTitleSanskrit: 'कौटिल्यानुसारं राज्यस्य सप्ताङ्गानि',
        instructions: 'राज्य-प्रशासनस्य सप्ताङ्गानां नामानि लिखन्तु (List the 7 limbs):',
        totalMarks: 7,
        questions: [
          {
            num: 1,
            question: 'राज्यस्य प्रथमम् अङ्गम् (राजा):',
            marks: 1,
            type: 'short_ans',
            answer: 'स्वामिन् (राजा / Sovereign Ruler)',
            explanation: 'राज्यस्य प्रमुखः स्वामी राजा भवति।',
          },
          {
            num: 2,
            question: 'राज्यस्य द्वितीयम् अङ्गम् (मन्त्री):',
            marks: 1,
            type: 'short_ans',
            answer: 'अमात्यः (मन्त्री / Prime Minister & Council)',
            explanation: 'शासनसञ्चालकः मन्त्री अमात्यः कथ्यते।',
          },
          {
            num: 3,
            question: 'राज्यस्य तृतीयम् अङ्गम् (प्रजा/भूमि):',
            marks: 1,
            type: 'short_ans',
            answer: 'जनपदम् (प्रजा भूमिः च / Territory and People)',
            explanation: 'राज्यस्य प्रदेशः प्रजायुक्तः जनपदः भवति।',
          },
          {
            num: 4,
            question: 'राज्यस्य चतुर्थम् अङ्गम् (किला):',
            marks: 1,
            type: 'short_ans',
            answer: 'दुर्गः (किला / Fortified Capital)',
            explanation: 'सुरक्षायै सुदृढः दुर्गः आवश्यकः।',
          },
          {
            num: 5,
            question: 'राज्यस्य पञ्चमम् अङ्गम् (खजाना):',
            marks: 1,
            type: 'short_ans',
            answer: 'कोशः (राजकोशः / Treasury)',
            explanation: 'अर्थव्यवस्थायाः मूलं कोशः भवति।',
          },
          {
            num: 6,
            question: 'राज्यस्य षष्ठम् अङ्गम् (सेना/बलम्):',
            marks: 1,
            type: 'short_ans',
            answer: 'दण्डः (सेना / Military Force)',
            explanation: 'शान्तिरक्षणाय सेना दण्डः कथ्यते।',
          },
          {
            num: 7,
            question: 'राज्यस्य सप्तमम् अङ्गम् (मित्र):',
            marks: 1,
            type: 'short_ans',
            answer: 'मित्रम् (सुहृद् / Trusted Ally)',
            explanation: 'सङ्कटकाले सहाय्यकम् मित्रम् भवति।',
          },
        ],
      },
      {
        sectionTitle: 'युद्धेषु रचिताः त्रयः व्यूहाः (Three Battle Formations)',
        sectionTitleSanskrit: 'प्राचीन-भारतीय-युद्धव्यूहाः',
        instructions: 'प्राचीन-युद्धेषु प्रयुक्तानां त्रयाणां व्यूहानां नामानि लिखन्तु:',
        totalMarks: 3,
        questions: [
          {
            num: 8,
            question: 'युद्धव्यूहः १ (प्रसिद्धः वर्तुलव्यूहः):',
            marks: 1,
            type: 'short_ans',
            answer: 'चक्रव्यूहः (Circular Wheel Formation)',
            explanation: 'महाभारते प्रसिद्धः अभेद्यः चक्रव्यूहः।',
          },
          {
            num: 9,
            question: 'युद्धव्यूहः २ (पक्षिराजसदृशः व्यूहः):',
            marks: 1,
            type: 'short_ans',
            answer: 'गरुडव्यूहः (Eagle Formation)',
            explanation: 'गरुडस्य आकारे सैन्यानां विन्यासः।',
          },
          {
            num: 10,
            question: 'युद्धव्यूहः ३ (जलचर/सूची-सदृशः व्यूहः):',
            marks: 1,
            type: 'short_ans',
            answer: 'मकरव्यूहः / सूचीव्यूहः / अर्धचन्द्रव्यूहः (Crocodile / Needle / Crescent Formation)',
            explanation: 'शत्रून् भेदितुं मकरव्यूहः अथवा सूचीव्यूहः रचितः।',
          },
        ],
      },
    ],
  },

  // --- Grammar Worksheet 1: लङ्-लकारात् लट्-लकारे परिवर्तनम् ---
  {
    id: 'ws-ch12-g1',
    title: 'Grammar Worksheet 1: लङ्-लकारात् लट्-लकारे परिवर्तनम् (Past to Present Tense Transformation)',
    titleSanskrit: 'व्याकरण-कार्यपत्रिका १: लङ्-लकारात् लट्-लकारे परिवर्तनम्',
    category: 'deep_ch12',
    categoryLabel: 'Lesson 12 व्याकरणम्: लकार-परिवर्तनम्',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '15 mins',
    description: 'व्याकरण-अभ्यासपत्रकम् १ — भूतकालिक-वाक्यानि वर्तमानकाले (लट्-लकारे) परिवर्तयन्तु।',
    sections: [
      {
        sectionTitle: 'लट्-लकारे परिवर्तनम् (Change into Present Tense)',
        sectionTitleSanskrit: 'वाक्यानां वर्तमानकालरूपाणि',
        instructions: 'यथा: पन्नाधाया राज्यम् अरक्षत् ➔ पन्नाधाया राज्यं रक्षति। अधोदत्तानां वाक्यानां लट्-लकार-रूपाणि लिखन्तु:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'उदयसिंहः वीरः आसीत्। ➔ वर्तमानकाले लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'उदयसिंहः वीरः अस्ति (भवति)।',
            explanation: "'आसीत्' (लङ् लकार) ➔ 'अस्ति / भवति' (लट् लकार)।",
          },
          {
            num: 2,
            question: 'अहं तत् सर्वम् अपश्यम्। ➔ वर्तमानकाले लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'अहं तत् सर्वं पश्यामि।',
            explanation: "'अपश्यम्' उत्तमपुरुष-एकवचने ➔ 'पश्यामि'।",
          },
          {
            num: 3,
            question: 'बनवीरः कुतन्त्रम् अकरोत्। ➔ वर्तमानकाले लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'बनवीरः कुतन्त्रं करोति।',
            explanation: "'अकरोत्' प्रथमपुरुष-एकवचने ➔ 'करोति'।",
          },
          {
            num: 4,
            question: 'त्वं शयनस्थानम् अगच्छः। ➔ वर्तमानकाले लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'त्वं शयनस्थानं गच्छसि।',
            explanation: "'अगच्छः' मध्यमपुरुष-एकवचने ➔ 'गच्छसि'।",
          },
          {
            num: 5,
            question: 'ते कथाम् अपठन्। ➔ वर्तमानकाले लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'ते कथां पठन्ति।',
            explanation: "'अपठन्' प्रथमपुरुष-बहुवचने ➔ 'पठन्ति'।",
          },
          {
            num: 6,
            question: 'धात्री उदयसिंहम् अपृच्छत्। ➔ वर्तमानकाले लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'धात्री उदयसिंहं पृच्छति।',
            explanation: "'अपृच्छत्' प्रथमपुरुष-एकवचने ➔ 'पृच्छति'।",
          },
        ],
      },
    ],
  },

  // --- Grammar Worksheet 2: क्तवतु-प्रत्ययान्त-रूपाणि ---
  {
    id: 'ws-ch12-g2',
    title: 'Grammar Worksheet 2: क्तवतु-प्रत्ययान्त-रूपाणि (Ktvatu Suffix Conjugation Matrix)',
    titleSanskrit: 'व्याकरण-कार्यपत्रिका २: क्तवतु-प्रत्ययान्त-रूपाणि',
    category: 'deep_ch12',
    categoryLabel: 'Lesson 12 व्याकरणम्: क्तवतु-प्रत्ययः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '15 mins',
    description: 'व्याकरण-अभ्यासपत्रकम् २ — धातूनां लङ्-लकार-रूपाणि क्तवतु-प्रत्ययान्त-पुंल्लिङ्ग-स्त्रीलिङ्ग-रूपाणि च लिखन्तु।',
    sections: [
      {
        sectionTitle: 'क्तवतु-प्रत्यय-सारणी (Ktvatu Participle Matrix)',
        sectionTitleSanskrit: 'पुंल्लिङ्ग-स्त्रीलिङ्ग-रूपाणि',
        instructions: 'यथा: पठ् ➔ अपठत् ➔ पठितवान् / पठितवती। अधोदत्तानां धातूनां क्तवतु-रूपाणि लिखन्तु:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'धातुः: लिख् (अलिखत्) ➔ पुंल्लिङ्गे स्त्रीलिङ्गे च क्तवतु-रूपे लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: लिखितवान् | स्त्रीलिङ्गम्: लिखितवती',
            explanation: 'लिख् + क्तवतु ➔ लिखितवान् (M), लिखितवती (F)।',
          },
          {
            num: 2,
            question: 'धातुः: खाद् (अखादत्) ➔ पुंल्लिङ्गे स्त्रीलिङ्गे च क्तवतु-रूपे लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: खादितवान् | स्त्रीलिङ्गम्: खादितवती',
            explanation: 'खाद् + क्तवतु ➔ खादितवान् (M), खादितवती (F)।',
          },
          {
            num: 3,
            question: 'धातुः: पा/पिब् (अपिबत्) ➔ पुंल्लिङ्गे स्त्रीलिङ्गे च क्तवतु-रूपे लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: पीतवान् | स्त्रीलिङ्गम्: पीतवती',
            explanation: 'पा + क्तवतु ➔ पीतवान् (M), पीतवती (F)।',
          },
          {
            num: 4,
            question: 'धातुः: कृ (अकरोत्) ➔ पुंल्लिङ्गे स्त्रीलिङ्गे च क्तवतु-रूपे लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: कृतवान् | स्त्रीलिङ्गम्: कृतवती',
            explanation: 'कृ + क्तवतु ➔ कृतवान् (M), कृतवती (F)।',
          },
          {
            num: 5,
            question: 'धातुः: गम् (अगच्छत्) ➔ पुंल्लिङ्गे स्त्रीलिङ्गे च क्तवतु-रूपे लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: गतवान् | स्त्रीलिङ्गम्: गतवती',
            explanation: 'गम् + क्तवतु ➔ गतवान् (M), गतवती (F)।',
          },
          {
            num: 6,
            question: 'धातुः: दृश्/पश्य् (अपश्यत्) ➔ पुंल्लिङ्गे स्त्रीलिङ्गे च क्तवतु-रूपे लिखन्तु:',
            marks: 1,
            type: 'short_ans',
            answer: 'पुंल्लिङ्गम्: दृष्टवान् | स्त्रीलिङ्गम्: दृष्टवती',
            explanation: 'दृश् + क्तवतु ➔ दृष्टवान् (M), दृष्टवती (F)।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // SUPPLEMENTARY LESSON: वर्णमात्रा-परिचयः (7 WORKSHEETS)
  // ==========================================
  {
    id: 'ws-ch13-1',
    title: 'Supplementary: Vowel Categorization Grid (स्वर-वर्गीकरण-सारणी)',
    titleSanskrit: 'अतिरिक्तम् अध्ययनम् · अभ्यासपत्रकम् १ — स्वर-वर्गीकरणम्',
    category: 'deep_ch13',
    categoryLabel: 'Supplementary Lesson: वर्णमात्रा-परिचयः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 9,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् १ — समानाक्षराणां सन्ध्यक्षराणां च ह्रस्व-दीर्घ-प्लुत-रूपाणां वर्गीकरणम्।',
    sections: [
      {
        sectionTitle: 'भागः १: समानाक्षराणि (Simple Vowels: Hrasva & Dirgha sets)',
        sectionTitleSanskrit: 'समानाक्षराणां ह्रस्व-दीर्घ-रूपाणि',
        instructions: 'अधोलिखितानां समानाक्षराणां रिक्तस्थानेषु उचितं ह्रस्वं वा दीर्घं रूपं लिखन्तु:',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: 'अ / _________ (ह्रस्वः / दीर्घः)',
            marks: 1,
            type: 'fill',
            answer: 'आ',
            explanation: "'अ' ह्रस्वः, 'आ' दीर्घः (द्विमात्रिकः)।",
          },
          {
            num: 2,
            question: 'इ / _________ (ह्रस्वः / दीर्घः)',
            marks: 1,
            type: 'fill',
            answer: 'ई',
            explanation: "'इ' ह्रस्वः, 'ई' दीर्घः (द्विमात्रिकः)।",
          },
          {
            num: 3,
            question: 'उ / _________ (ह्रस्वः / दीर्घः)',
            marks: 1,
            type: 'fill',
            answer: 'ऊ',
            explanation: "'उ' ह्रस्वः, 'ऊ' दीर्घः (द्विमात्रिकः)।",
          },
          {
            num: 4,
            question: 'ऋ / _________ (ह्रस्वः / दीर्घः)',
            marks: 1,
            type: 'fill',
            answer: 'ॠ',
            explanation: "'ऋ' ह्रस्वः, 'ॠ' दीर्घः (द्विमात्रिकः)।",
          },
          {
            num: 5,
            question: 'लृ / _________ (दीर्घ-रूपस्य अभावः)',
            marks: 1,
            type: 'fill',
            answer: 'दीर्घाभावः (No long variant)',
            explanation: "संस्कृतव्याकरणे 'ऌ' वर्णस्य ह्रस्वः प्लुतः च भवतः, परं दीर्घः न भवति।",
          },
        ],
      },
      {
        sectionTitle: 'भागः २: सन्ध्यक्षराणि (Diphthongs: Dirgha & Pluta states only)',
        sectionTitleSanskrit: 'सन्ध्यक्षराणां दीर्घ-प्लुत-रूपाणि',
        instructions: 'सन्ध्यक्षराणां (ए, ऐ, ओ, औ) ह्रस्व-रूपं न भवति, केवलं दीर्घः प्लुतः च। रिक्तस्थानानि पूरयन्तु:',
        totalMarks: 4,
        questions: [
          {
            num: 6,
            question: '_________ / ए३ (दीर्घः / प्लुतः)',
            marks: 1,
            type: 'fill',
            answer: 'ए',
            explanation: "'ए' दीर्घः (द्विमात्रः), 'ए३' प्लुतः (त्रिमात्रः)।",
          },
          {
            num: 7,
            question: 'ऐ / _________ (दीर्घः / प्लुतः)',
            marks: 1,
            type: 'fill',
            answer: 'ऐ३',
            explanation: "'ऐ' दीर्घः (द्विमात्रः), 'ऐ३' प्लुतः (त्रिमात्रः)।",
          },
          {
            num: 8,
            question: 'ओ / _________ (दीर्घः / प्लुतः)',
            marks: 1,
            type: 'fill',
            answer: 'ओ३',
            explanation: "'ओ' दीर्घः (द्विमात्रः), 'ओ३' प्लुतः (त्रिमात्रः)।",
          },
          {
            num: 9,
            question: '_________ / औ३ (दीर्घः / प्लुतः)',
            marks: 1,
            type: 'fill',
            answer: 'औ',
            explanation: "'औ' दीर्घः (द्विमात्रः), 'औ३' प्लुतः (त्रिमात्रः)।",
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch13-2',
    title: 'Supplementary: Sentence-Level Context Fillers (संवाद-रिक्तस्थान-पूर्तिः)',
    titleSanskrit: 'अतिरिक्तम् अध्ययनम् · अभ्यासपत्रकम् २ — संवाद-वाक्य-पूरणम्',
    category: 'deep_ch13',
    categoryLabel: 'Supplementary Lesson: वर्णमात्रा-परिचयः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् २ — पाठ्यपुस्तकीय-संवादात् उचितानि पदानि चित्वा वाक्यानि पूरयन्तु।',
    sections: [
      {
        sectionTitle: 'संवाद-आधारित-वाक्यपूर्तिः',
        sectionTitleSanskrit: 'उचितपदैः रिक्तस्थान-पूरणम्',
        instructions: 'मञ्जूषातः उचितानि पदानि चित्वा वाक्यानां रिक्तस्थानानि पूरयन्तु: [ स्वरेषु, द्वे, अर्ध-मात्रा, अकारः, वैविध्यम् ]',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: 'वर्णमालायाः प्रारम्भे वयं पूर्वं स्वराणां ____________________ मात्रे दृष्टवन्तः।',
            marks: 1,
            type: 'fill',
            answer: 'द्वे',
            explanation: 'प्रारम्भे ह्रस्वः दीर्घः च इति द्वे मात्रे एव दृष्टे।',
          },
          {
            num: 2,
            question: 'एताः तिस्रः मात्राः केवलं ____________________ भवन्ति, व्यञ्जनेषु न भवन्ति।',
            marks: 1,
            type: 'fill',
            answer: 'स्वरेषु',
            explanation: 'ह्रस्व-दीर्घ-प्लुताः मात्राभेदाः केवलं स्वराणाम् एव सम्भवन्ति।',
          },
          {
            num: 3,
            question: 'व्यञ्जनं तु ____________________ एव भवति।',
            marks: 1,
            type: 'fill',
            answer: 'अर्ध-मात्रा',
            explanation: 'सर्वेषां शुद्धव्यञ्जनानां नित्यम् अर्धमात्रा भवति।',
          },
          {
            num: 4,
            question: 'विश्वस्य अन्यासु कासु अपि भाषासु एतत् ____________________ द्रष्टुं न शक्नुमः।',
            marks: 1,
            type: 'fill',
            answer: 'वैविध्यम्',
            explanation: 'त्रिमात्रिक-प्लुतस्वरस्य उच्चारणवैशिष्ट्यं संस्कृतस्य अनुपमं वैविध्यम् अस्ति।',
          },
          {
            num: 5,
            question: 'प्रायः सन्धि-नियमानुसारं यदा ____________________ अदृश्यः भवति, तदा अवग्रहस्य उपयोगः भवति।',
            marks: 1,
            type: 'fill',
            answer: 'अकारः',
            explanation: "पूर्वरूपसन्धौ यदा 'अ'कारः लुप्यते, तदा तस्य स्थाने 'ऽ' अवग्रहः लिख्यते।",
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch13-3',
    title: 'Supplementary: Comprehensive Reading & Analysis (गद्यांश-अवबोधनम्)',
    titleSanskrit: 'अतिरिक्तम् अध्ययनम् · अभ्यासपत्रकम् ३ — गद्यांश-अवबोधनम्',
    category: 'deep_ch13',
    categoryLabel: 'Supplementary Lesson: वर्णमात्रा-परिचयः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 4,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् ३ — गद्यांशं पठित्वा प्रश्नानाम् उत्तराणि संस्कृतेन लिखन्तु।',
    sections: [
      {
        sectionTitle: 'गद्यांश-अवबोधनम् (Passage Reading)',
        sectionTitleSanskrit: 'अनुच्छेदं पठित्वा उत्तराणि',
        instructions: `गद्यांशः: "इदम् अत्र ध्यातव्यं यत् – एताः तिस्रः मात्राः केवलं स्वरेषु भवन्ति, व्यञ्जनेषु न भवन्ति। सर्वेषां व्यञ्जनानां तु नित्यम् 'अर्ध-मात्रा' एव भवति। एकमात्रो भवेद् ह्रस्वः द्विमात्रो दीर्घ उच्यते। त्रिमात्रश्च प्लुतो ज्ञेयः व्यञ्जनं चार्धमात्रिकम् ॥"`,
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: 'स्वरेषु कति मात्राः सम्भवन्ति?',
            marks: 1,
            type: 'short_ans',
            answer: 'स्वरेषु तिस्रः मात्राः (ह्रस्वः, दीर्घः, प्लुतः च) सम्भवन्ति।',
            explanation: 'स्वराः एकमात्रिकाः, द्विमात्रिकाः, त्रिमात्रिकाः च भवितुम् अर्हन्ति।',
          },
          {
            num: 2,
            question: 'व्यञ्जनेषु कति मात्राः नित्यं स्थिराः भवन्ति?',
            marks: 1,
            type: 'short_ans',
            answer: "व्यञ्जनेषु नित्यम् 'अर्ध-मात्रा' (१/२) स्थिरा भवति।",
            explanation: 'शुद्धव्यञ्जनस्य उच्चारणकालः सर्वदा अर्धमात्रिकः एव।',
          },
          {
            num: 3,
            question: "'द्विमात्रो दीर्घ उच्यते' अस्य वाक्यांशस्य कः सरलः अर्थः?",
            marks: 1,
            type: 'short_ans',
            answer: 'यस्य स्वरस्य उच्चारणे द्वयोः मात्रयोः समयः अपेक्ष्यते, सः दीर्घस्वरः कथ्यते।',
            explanation: 'द्विमात्रिकः स्वरः दीर्घः भवति (यथा आ, ई, ऊ, ॠ, ए, ऐ, ओ, औ)।',
          },
          {
            num: 4,
            question: 'श्लोकानुसारं व्यञ्जनस्य कीदृशं स्वरूपं ज्ञेयम्?',
            marks: 1,
            type: 'short_ans',
            answer: 'श्लोकानुसारं व्यञ्जनम् अर्धमात्रिकं ज्ञेयम्।',
            explanation: "'व्यञ्जनं चार्धमात्रिकम्' इति श्लोकस्य चतुर्थः पादः कथयति।",
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch13-4',
    title: 'Supplementary: Practical Audio Transcription Activity (ध्वनि-प्लुत-चिह्नाङ्कनम्)',
    titleSanskrit: 'अतिरिक्तम् अध्ययनम् · अभ्यासपत्रकम् ४ — प्लुत-स्वर-चिह्नाङ्कनम्',
    category: 'deep_ch13',
    categoryLabel: 'Supplementary Lesson: वर्णमात्रा-परिचयः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 3,
    timeLimit: '10 mins',
    description: 'अभ्यासपत्रकम् ४ — अधोलिखितेषु वाक्येषु प्रयुक्तान् प्लुत-स्वरान् (त्रिमात्र-स्वरान्) चिह्नितान् कुरुत।',
    sections: [
      {
        sectionTitle: 'प्लुत-स्वराणां चिह्नाङ्कनम् (Identifying Pluta Vowels)',
        sectionTitleSanskrit: 'त्रिमात्र-स्वर-अन्वेषणम्',
        instructions: 'अधोलिखितानि वाक्यानि पठित्वा येषु वर्णेषु त्रिमात्रः (प्लुतस्वरः ३) प्रयुक्तः अस्ति, तान् पृथक् कुरुत:',
        totalMarks: 3,
        questions: [
          {
            num: 1,
            question: 'वाक्यम् १: "हे३ राम ! अत्र आगच्छ कुमार३ !" — अत्र प्लुत-स्वराः कौ?',
            marks: 1,
            type: 'short_ans',
            answer: "'हे३' तथा 'कुमार३' (आ३)",
            explanation: "दूरस्थस्य आह्वाने एकारस्य (हे३) तथा आकारस्य (कुमार३) प्लुतः अभवत्।",
          },
          {
            num: 2,
            question: 'वाक्यम् २: "ओ३म् - भूर्भुवः स्वः ।" — अत्र प्लुत-स्वरः कः?',
            marks: 1,
            type: 'short_ans',
            answer: "'ओ३म्' (ओ३)",
            explanation: "प्रणवोच्चारणे ओकारः त्रिमात्रिकः प्लुतः भवति।",
          },
          {
            num: 3,
            question: 'वाक्यम् ३: "सङ्गच्छध्वं संवदध्वं सं वो मनांसि जानताम् .... ओ३म् ।" — अत्र प्लुत-वर्णः कः?',
            marks: 1,
            type: 'short_ans',
            answer: "'ओ३म्' (ओ३)",
            explanation: "मन्त्रान्ते मन्त्रप्रारम्भे च ॐकारस्य उच्चारणं प्लुतरूपेण (ओ३) क्रियते।",
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch13-5',
    title: 'Supplementary: Structural Summary & Block Tree Diagram (मात्रा-व्यवस्था-सारांशः)',
    titleSanskrit: 'अतिरिक्तम् अध्ययनम् · अभ्यासपत्रकम् ५ — कालस्य भेदः वृक्षरूपकं च',
    category: 'deep_ch13',
    categoryLabel: 'Supplementary Lesson: वर्णमात्रा-परिचयः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् ५ — संस्कृतध्वनि-विज्ञानस्य गणितीय-कालव्यवस्थायाः सारांशः वृक्षरूपकस्य च अध्ययनम्।',
    sections: [
      {
        sectionTitle: 'भागः १: कालस्य भेदः (Mathematical Framework of Phonetics)',
        sectionTitleSanskrit: 'संस्कृतध्वनेः कालव्यवस्था-सारांशः',
        instructions: 'संस्कृत-भाषायां ध्वनेः काल-परिमाणं गणितीयम् अस्ति इति वाक्यद्वयेन सङ्क्षेपतः लिखन्तु:',
        totalMarks: 2,
        questions: [
          {
            num: 1,
            question: 'संस्कृत-भाषायां ध्वनेः काल-परिमाणस्य (उच्चारण-समयस्य) किं वैशिष्ट्यम् अस्ति?',
            marks: 2,
            type: 'short_ans',
            answer: 'संस्कृत-भाषायां प्रत्येकस्य वर्णस्य उच्चारणकालः (मात्रा) गणितीय-नियमैः निश्चितः अस्ति; स्वराः एकमात्रिकाः (ह्रस्व), द्विमात्रिकाः (दीर्घ), त्रिमात्रिकाः (प्लुत) च भवन्ति, व्यञ्जनानि तु नित्यम् अर्धमात्रिकाणि भवन्ति। कालस्य अनया सूक्ष्मतया एव अर्थभेदः, छन्दो-नियमः, वेदोच्चारण-शुद्धता च संरक्ष्यते।',
            explanation: 'निमेष-मात्रया ध्वनेः कालगणना संस्कृतस्य अद्वितीयं ध्वनिवैज्ञानिकं वैशिष्ट्यम् अस्ति।',
          },
        ],
      },
      {
        sectionTitle: 'भागः २: वृक्षरूपकम् (Phonetic Hierarchy Tree Diagram)',
        sectionTitleSanskrit: 'वर्ण-मात्रा-वृक्षरूपकम्',
        instructions: 'अधोदत्तं वृक्षरूपकं दृष्ट्वा तदन्तर्गतानां मात्रा-मूल्यानां सत्यताम् अवगच्छन्तु:',
        totalMarks: 3,
        questions: [
          {
            num: 2,
            question: 'वृक्षरूपकम्: वर्णमाला ➔ (स्वरः vs व्यञ्जनम्)। स्वरस्य त्रयः भेदाः के, व्यञ्जनस्य च मात्रा का?',
            marks: 3,
            type: 'short_ans',
            answer: `[वर्णमाला]
 ├── स्वरः (Vowel)
 │    ├── ह्रस्वः (Short)  ➔ १ मात्रा  (अ, इ, उ, ऋ, ऌ)
 │    ├── दीर्घः (Long)   ➔ २ मात्राः (आ, ई, ऊ, ॠ, ए, ऐ, ओ, औ)
 │    └── प्लुतः (Pluta)  ➔ ३ मात्राः (अ३, आ३, ओ३म्)
 └── व्यञ्जनम् (Consonant)
      └── शुद्धव्यञ्जनम्   ➔ १/२ मात्रा (क्, ख्, ग्, घ्... - Locked state)`,
            explanation: 'स्वरेषु मात्रा-त्रयं सम्भवति, किन्तु व्यञ्जनेषु नित्यम् एका एव स्थितिः (अर्ध-मात्रा) भवति।',
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch13-g1',
    title: 'Supplementary Grammar: Mathematical Phoneme Breakdown (मात्रा-मूल्य-विभाजनम्)',
    titleSanskrit: 'अतिरिक्तम् अध्ययनम् · व्याकरण-कार्यपत्रिका १ — मात्रा-मूल्य-विभाजनम्',
    category: 'deep_ch13',
    categoryLabel: 'Supplementary Lesson: वर्णमात्रा-परिचयः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 8,
    timeLimit: '20 mins',
    description: 'व्याकरण-कार्यपत्रिका १ — शब्दानां व्यञ्जन-स्वरच्छेदं कृत्वा प्रत्येकस्य वर्णस्य मात्रामूल्यं संयोज्य कुलमात्राः गणयन्तु।',
    sections: [
      {
        sectionTitle: 'मात्रा-गणना-अभ्यासः (Deconstruction and Summation)',
        sectionTitleSanskrit: 'व्यञ्जन-स्वरच्छेदः मात्रा-योगः च',
        instructions: 'यथा: दोला = द् (१/२) + ओ (२) + ल् (१/२) + आ (२) = ५ मात्राः। एवं कृत्वा अधोलिखितानां पदानां मात्रा-गणनां कुरुत:',
        totalMarks: 8,
        questions: [
          {
            num: 1,
            question: 'पदम्: बालः (Boy) ➔ वर्णच्छेदः, मात्रा-मूल्यम्, कुलयोगः च लिखन्तु:',
            marks: 2,
            type: 'short_ans',
            answer: 'वर्णच्छेदः: ब् + आ + ल् + अ + : | मात्रा-मूल्यम्: १/२ + २ + १/२ + १ + १/२ | कुलयोगः: ४ १/२ मात्राः',
            explanation: 'ब्(०.५) + आ(२) + ल्(०.५) + अ(१) + :(०.५) = ४.५ मात्राः।',
          },
          {
            num: 2,
            question: 'पदम्: चटका (Sparrow) ➔ वर्णच्छेदः, मात्रा-मूल्यम्, कुलयोगः च लिखन्तु:',
            marks: 2,
            type: 'short_ans',
            answer: 'वर्णच्छेदः: च् + अ + ट् + अ + क् + आ | मात्रा-मूल्यम्: १/२ + १ + १/२ + १ + १/२ + २ | कुलयोगः: ५ १/२ मात्राः',
            explanation: 'च्(०.५) + अ(१) + ट्(०.५) + अ(१) + क्(०.५) + आ(२) = ५.५ मात्राः।',
          },
          {
            num: 3,
            question: 'पदम्: घटिका (Clock) ➔ वर्णच्छेदः, मात्रा-मूल्यम्, कुलयोगः च लिखन्तु:',
            marks: 2,
            type: 'short_ans',
            answer: 'वर्णच्छेदः: घ् + अ + ट् + इ + क् + आ | मात्रा-मूल्यम्: १/२ + १ + १/२ + १ + १/२ + २ | कुलयोगः: ५ १/२ मात्राः',
            explanation: 'घ्(०.५) + अ(१) + ट्(०.५) + इ(१) + क्(०.५) + आ(२) = ५.५ मात्राः।',
          },
          {
            num: 4,
            question: 'पदम्: कपोतः (Pigeon) ➔ वर्णच्छेदः, मात्रा-मूल्यम्, कुलयोगः च लिखन्तु:',
            marks: 2,
            type: 'short_ans',
            answer: 'वर्णच्छेदः: क् + अ + प् + ओ + त् + अ + : | मात्रा-मूल्यम्: १/२ + १ + १/२ + २ + १/२ + १ + १/२ | कुलयोगः: ६ मात्राः',
            explanation: 'क्(०.५) + अ(१) + प्(०.५) + ओ(२) + त्(०.५) + अ(१) + :(०.५) = ६ मात्राः।',
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch13-g2',
    title: 'Supplementary Grammar: Advanced Conjunct Phoneme Summation (संयुक्त-व्यञ्जन-मात्रा-गणना)',
    titleSanskrit: 'अतिरिक्तम् अध्ययनम् · व्याकरण-कार्यपत्रिका २ — संयुक्त-व्यञ्जन-मात्रा-योगः',
    category: 'deep_ch13',
    categoryLabel: 'Supplementary Lesson: वर्णमात्रा-परिचयः',
    grade: 'Class 7 (CBSE)',
    totalMarks: 8,
    timeLimit: '20 mins',
    description: 'व्याकरण-कार्यपत्रिका २ — संयुक्तव्यञ्जन-युक्तानां पदानां सूक्ष्म-वर्णच्छेदं कृत्वा मात्राणां गणितीय-योगं कुरुत।',
    sections: [
      {
        sectionTitle: 'संयुक्त-वर्णानां मात्रा-गणना',
        sectionTitleSanskrit: 'संयुक्त-व्यञ्जनेषु अर्धमात्रा-संयोजनम्',
        instructions: 'नियमः: प्रत्येकं शुद्धव्यञ्जनम् = १/२ मात्रा, ह्रस्वस्वरः = १ मात्रा, दीर्घस्वरः = २ मात्राः।',
        totalMarks: 8,
        questions: [
          {
            num: 1,
            question: 'लक्ष्मणः: ल् + अ + क् + ष् + म् + अ + ण् + अ + : ➔ मात्रा-मूल्यानि संयोज्य योगं लिखन्तु:',
            marks: 2,
            type: 'short_ans',
            answer: '१/२ + १ + १/२ + १/२ + १/२ + १ + १/२ + १ + १/२ = ६ मात्राः',
            explanation: 'ल्(०.५)+अ(१)+क्(०.५)+ष्(०.५)+म्(०.५)+अ(१)+ण्(०.५)+अ(१)+:(०.५) = ६ मात्राः।',
          },
          {
            num: 2,
            question: 'शत्रुघ्नः: श् + अ + त् + र् + उ + घ् + न् + अ + : ➔ मात्रा-मूल्यानि संयोज्य योगं लिखन्तु:',
            marks: 2,
            type: 'short_ans',
            answer: '१/२ + १ + १/२ + १/२ + १ + १/२ + १/२ + १ + १/२ = ६ मात्राः',
            explanation: 'श्(०.५)+अ(१)+त्(०.५)+र्(०.५)+उ(१)+घ्(०.५)+न्(०.५)+अ(१)+:(०.५) = ६ मात्राः।',
          },
          {
            num: 3,
            question: 'विद्यार्थी: व् + इ + द् + य् + आ + र् + थ् + ई ➔ मात्रा-मूल्यानि संयोज्य योगं लिखन्तु:',
            marks: 2,
            type: 'short_ans',
            answer: '१/२ + १ + १/२ + १/२ + २ + १/२ + १/२ + २ = ७ १/२ मात्राः',
            explanation: 'व्(०.५)+इ(१)+द्(०.५)+य्(०.५)+आ(२)+र्(०.५)+थ्(०.५)+ई(२) = ७.५ मात्राः।',
          },
          {
            num: 4,
            question: 'खनित्रम्: ख् + अ + न् + इ + त् + र् + अ + म् ➔ मात्रा-मूल्यानि संयोज्य योगं लिखन्तु:',
            marks: 2,
            type: 'short_ans',
            answer: '१/२ + १ + १/२ + १ + १/२ + १/२ + १ + १/२ = ५ १/२ मात्राः',
            explanation: 'ख्(०.५)+अ(१)+न्(०.५)+इ(१)+त्(०.५)+र्(०.५)+अ(१)+म्(०.५) = ५.५ मात्राः।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // APPENDIX 1: शब्दरूपाणि (7 WORKSHEETS)
  // ==========================================
  {
    id: 'ws-ch14-1',
    title: 'Appendix 1: Paradigmatic Form Identification Matrix (राम-मति-शब्दरूपाणि)',
    titleSanskrit: 'परिशिष्टम् १ · अभ्यासपत्रकम् १ — शब्दरूप-पूरण-सारणी',
    category: 'deep_ch14',
    categoryLabel: 'Appendix 1: शब्दरूपाणि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् १ — राम (अकारान्त-पुंलिङ्ग) तथा मति (इकारान्त-स्त्रीलिङ्ग) शब्दयोः रिक्तस्थान-पूरणम्।',
    sections: [
      {
        sectionTitle: "भागः १: 'राम' शब्दः (पुंलिङ्गम् - 'अ'कारान्तः)",
        sectionTitleSanskrit: 'राम-शब्दस्य रूपाणि',
        instructions: "रिक्तस्थानेषु उचितानि 'राम' शब्दस्य रूपाणि लिखन्तु:",
        totalMarks: 3,
        questions: [
          {
            num: 1,
            question: 'प्रथमा विभक्तिः: रामः / _______________ / रामाः',
            marks: 1,
            type: 'fill',
            answer: 'रामौ',
            explanation: 'राम-शब्दस्य प्रथमा-द्विवचने रामौ भवति (रामः, रामौ, रामाः)।',
          },
          {
            num: 2,
            question: 'तृतीया विभक्तिः: _______________ / रामाभ्याम् / रामैः',
            marks: 1,
            type: 'fill',
            answer: 'रामेण',
            explanation: "तृतीया-एकवचने 'रामेण' भवति (रेफात् परं णत्वम्)।",
          },
          {
            num: 3,
            question: 'सप्तमी विभक्तिः: रामे / रामयोः / _______________',
            marks: 1,
            type: 'fill',
            answer: 'रामेषु',
            explanation: 'सप्तमी-बहुवचने रामेषु रूपं भवति।',
          },
        ],
      },
      {
        sectionTitle: "भागः २: 'मति' शब्दः (स्त्रीलिङ्गम् - 'इ'कारान्तः)",
        sectionTitleSanskrit: 'मति-शब्दस्य रूपाणि',
        instructions: "रिक्तस्थानेषु उचितानि 'मति' शब्दस्य रूपाणि लिखन्तु:",
        totalMarks: 3,
        questions: [
          {
            num: 4,
            question: 'प्रथमा विभक्तिः: मतिः / मती / _______________',
            marks: 1,
            type: 'fill',
            answer: 'मतयः',
            explanation: 'मति-शब्दस्य प्रथमा-बहुवचने मतयः भवति (मतिः, मती, मतयः)।',
          },
          {
            num: 5,
            question: 'द्वितीया विभक्तिः: मतिम् / _______________ / मतीः',
            marks: 1,
            type: 'fill',
            answer: 'मती',
            explanation: 'द्वितीया-द्विवचने मती (दीर्घ-ईकारान्तम्) भवति।',
          },
          {
            num: 6,
            question: 'षष्ठी विभक्तिः: _______________ / मत्योः / मतीनाम्',
            marks: 1,
            type: 'fill',
            answer: 'मत्याः / मतेः',
            explanation: 'इकारान्त-स्त्रीलिङ्गे षष्ठी-एकवचने विकल्पेन रूपद्वयं (मत्याः / मतेः) सिद्ध्यति।',
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch14-2',
    title: 'Appendix 1: Fill in the Missing Case Triggers (विभक्ति-कारक-रिक्तस्थान-पूर्तिः)',
    titleSanskrit: 'परिशिष्टम् १ · अभ्यासपत्रकम् २ — विभक्ति-पद-पूरणम्',
    category: 'deep_ch14',
    categoryLabel: 'Appendix 1: शब्दरूपाणि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् २ — परिशिष्टे प्रदत्त-तालिकानाम् आधारेण रिक्तस्थानेषु शुद्धं शब्दरूपं लिखन्तु।',
    sections: [
      {
        sectionTitle: 'विभक्ति-रूपाणां पूर्तिः',
        sectionTitleSanskrit: 'शुद्ध-शब्दरूप-पूरणम्',
        instructions: 'अधोलिखितानि वाक्यानि पठित्वा शुद्धैः पदैः रिक्तस्थानानि पूरयन्तु:',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: "'देव' शब्दस्य सम्बोधन-एकवचने रूपं ____________________ भवति।",
            marks: 1,
            type: 'fill',
            answer: 'हे देव',
            explanation: "'देव' शब्दस्य सम्बोधन-एकवचने 'हे देव' (हे देव, हे देवौ, हे देवाः) भवति।",
          },
          {
            num: 2,
            question: "'हरि' शब्दस्य प्रथमा-बहुवचनस्य रूपं ____________________ अस्ति।",
            marks: 1,
            type: 'fill',
            answer: 'हरयः',
            explanation: "'हरि' प्रथमा: हरिः (एक०), हरी (द्वि०), हरयः (बहु०)।",
          },
          {
            num: 3,
            question: "'गुरु' शब्दस्य चतुर्थी-एकवचने ____________________ इति पदं सिद्ध्यति।",
            marks: 1,
            type: 'fill',
            answer: 'गुरवे',
            explanation: "'गुरु' चतुर्थी-एकवचने 'गुरवे' (गुरवे, गुरुभ्याम्, गुरुभ्यः) भवति।",
          },
          {
            num: 4,
            question: "'नदी' शब्दस्य षष्ठी-बहुवचनस्य रूपं ____________________ भवति।",
            marks: 1,
            type: 'fill',
            answer: 'नदीनाम्',
            explanation: "'नदी' षष्ठी-बहुवचने 'नदीनाम्' (नद्याः, नद्योः, नदीनाम्) भवति।",
          },
          {
            num: 5,
            question: "'मातृ' शब्दस्य पञ्चमी-षष्ठ्योः एकवचने समानाकारं रूपं ____________________ अस्ति।",
            marks: 1,
            type: 'fill',
            answer: 'मातुः',
            explanation: "'मातृ' शब्दस्य पञ्चमी-षष्ठ्योः एकवचने 'मातुः' इति रूपं भवति।",
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch14-3',
    title: 'Appendix 1: Neuter Nominal Paradigms Comparison (फल-मित्र-शब्दरूप-तुलना)',
    titleSanskrit: 'परिशिष्टम् १ · अभ्यासपत्रकम् ३ — नपुंसकलिङ्ग-रूप-तुलना',
    category: 'deep_ch14',
    categoryLabel: 'Appendix 1: शब्दरूपाणि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 4,
    timeLimit: '15 mins',
    description: 'अभ्यासपत्रकम् ३ — फल तथा मित्र शब्दयोः समानान्तर-रूपाणि पूरयत।',
    sections: [
      {
        sectionTitle: 'फल-मित्र-शब्दरूप-तुलना (Comparative Parallel Setups)',
        sectionTitleSanskrit: 'नपुंसकलिङ्ग-विभक्ति-तुलना',
        instructions: 'अधोनिर्दिष्टायां तालिकायां रिक्तस्थानानि पूरयित्वा रूपसाम्यम् अवगच्छन्तु:',
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: "प्रथमा विभक्तिः: 'फल' = फलम् / फले / फलानि ➔ 'मित्र' = ________________________________________",
            marks: 1,
            type: 'short_ans',
            answer: 'मित्रम् / मित्रे / मित्राणि',
            explanation: 'अकारान्त-नपुंसकलिङ्गे प्रथमा-द्वितीया समाने भवतः (मित्रम्, मित्रे, मित्राणि)।',
          },
          {
            num: 2,
            question: "तृतीया विभक्तिः: 'मित्र' = मित्रेण / मित्राभ्याम् / मित्रैः ➔ 'फल' = ________________________________________",
            marks: 1,
            type: 'short_ans',
            answer: 'फलेन / फलाभ्याम् / फलैः',
            explanation: "तृतीयायाम् अकारान्त-पुंलिङ्गवत् (फलेन, फलाभ्याम्, फलैः) रूपाणि भवन्ति।",
          },
          {
            num: 3,
            question: "षष्ठी विभक्तिः: 'फल' = फलस्य / फलयोः / फलानाम् ➔ 'मित्र' = ________________________________________",
            marks: 1,
            type: 'short_ans',
            answer: 'मित्रस्य / मित्रयोः / मित्राणाम्',
            explanation: "'मित्र' शब्दे रेफसद्भावात् षष्ठी-बहुवचने 'मित्राणाम्' (णत्वयुक्तम्) भवति।",
          },
          {
            num: 4,
            question: "सप्तमी विभक्तिः: 'मित्र' = मित्रे / मित्रयोः / मित्रेषु ➔ 'फल' = ________________________________________",
            marks: 1,
            type: 'short_ans',
            answer: 'फले / फलयोः / फलेषु',
            explanation: 'सप्तमी विभक्तिः: फले, फलयोः, फलेषु।',
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch14-4',
    title: 'Appendix 1: Real-Text Parsing Activity (प्रातिपदिक-विभक्ति-वचन-विश्लेषणम्)',
    titleSanskrit: 'परिशिष्टम् १ · अभ्यासपत्रकम् ४ — पद-परिचय-विश्लेषणम्',
    category: 'deep_ch14',
    categoryLabel: 'Appendix 1: शब्दरूपाणि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 3,
    timeLimit: '12 mins',
    description: 'अभ्यासपत्रकम् ४ — वाक्येषु प्रयुक्तानां पदानां मूल-प्रातिपदिकं, विभक्तिं, वचनं च विश्लेषयत।',
    sections: [
      {
        sectionTitle: 'पद-विश्लेषण-अभ्यासः (Parsing Activity)',
        sectionTitleSanskrit: 'व्याकरण-पद-परिचयः',
        instructions: 'अधोलिखितानां वाक्यानां रेखाङ्कित-पदानां प्रातिपदिकं, विभक्तिं, वचनं च लिखन्तु:',
        totalMarks: 3,
        questions: [
          {
            num: 1,
            question: 'वाक्यम् १: "देवेन सह गच्छति।" — \'देवेन\' पदस्य विश्लेषणं कुरुत:',
            marks: 1,
            type: 'short_ans',
            answer: 'प्रातिपदिकम्: देव | विभक्तिः: तृतीया | वचनम्: एकवचनम्',
            explanation: "'देव' (अकारान्त-पुंलिङ्ग) तृतीया-एकवचने 'देवेन' भवति।",
          },
          {
            num: 2,
            question: 'वाक्यम् २: "कव्योः विचारः अत्र अस्ति।" — \'कव्योः\' पदस्य विश्लेषणं कुरुत:',
            marks: 1,
            type: 'short_ans',
            answer: 'प्रातिपदिकम्: कवि | विभक्तिः: षष्ठी (वा सप्तमी) | वचनम्: द्विवचनम्',
            explanation: "'कवि' (इकारान्त-पुंलिङ्ग) षष्ठी/सप्तमी-द्विवचने 'कव्योः' भवति।",
          },
          {
            num: 3,
            question: 'वाक्यम् ३: "मातरि मम परमश्रद्धा।" — \'मातरि\' पदस्य विश्लेषणं कुरुत:',
            marks: 1,
            type: 'short_ans',
            answer: 'प्रातिपदिकम्: मातृ | विभक्तिः: सप्तमी | वचनम्: एकवचनम्',
            explanation: "'मातृ' (ऋकारान्त-स्त्रीलिङ्ग) सप्तमी-एकवचने 'मातरि' भवति।",
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch14-5',
    title: 'Appendix 1: Classification Tree for Ajanta Stems (अजन्त-शब्द-वर्गीकरण-सारणी)',
    titleSanskrit: 'परिशिष्टम् १ · अभ्यासपत्रकम् ५ — अजन्त-शब्द-वर्गीकरणम्',
    category: 'deep_ch14',
    categoryLabel: 'Appendix 1: शब्दरूपाणि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '20 mins',
    description: 'अभ्यासपत्रकम् ५ — लिङ्गानुसारम् अजन्त-शब्दानाम् अन्तिम-स्वर-विभाजनस्य समग्र-वृक्षरूपकम्।',
    sections: [
      {
        sectionTitle: 'अजन्त-शब्दानां त्रिषु लिङ्गेषु वर्गीकरणम्',
        sectionTitleSanskrit: 'लिङ्ग-कारान्त-वृक्षरूपकम्',
        instructions: 'अधोदत्तं वर्गीकरणं पठित्वा त्रिषु लिङ्गेषु कारान्त-भेदान् अवगच्छन्तु:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'पुंलिङ्गे, स्त्रीलिङ्गे, नपुंसकलिङ्गे च के प्रमुख-कारान्ताः भवन्ति? उदाहरणैः सह स्पष्टीकुरुत।',
            marks: 6,
            type: 'short_ans',
            answer: `[अजन्ताः शब्दाः (Vowel-ending Nouns)]
 ├── पुंलिङ्गम् (Masculine):
 │    ├── अकारान्तः ➔ देव, राम, बाल
 │    ├── इकारान्तः ➔ कवि, हरि, मुनि
 │    ├── उकारान्तः ➔ गुरु, भानु, शम्भु
 │    └── ऋकारान्तः ➔ पितृ, भ्रातृ, नेतृ
 ├── स्त्रीलिङ्गम् (Feminine):
 │    ├── आकारान्तः ➔ लता, रमा, माला, सीता
 │    ├── इकारान्तः ➔ मति, बुद्धि, कीर्ति
 │    ├── ईकारान्तः ➔ नदी, गौरी, जननी
 │    ├── उकारान्तः ➔ धेनु, तनु
 │    └── ऋकारान्तः ➔ मातृ, दुहितृ, स्वसृ
 └── नपुंसकलिङ्गम् (Neuter):
      ├── अकारान्तः ➔ फल, मित्र, वन, पुस्तक
      ├── इकारान्तः ➔ वारि
      └── उकारान्तः ➔ मधु`,
            explanation: 'अजन्ताः शब्दाः अन्तिम-स्वरवर्णैः (अ, आ, इ, ई, उ, ऋ) तथा लिङ्गेन (पुं, स्त्री, नपुं) विभज्यन्ते।',
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch14-g1',
    title: 'Appendix 1 Grammar: Pronoun Gender Identification Matrix (सर्वनाम-लिङ्ग-मेलन-सारणी)',
    titleSanskrit: 'परिशिष्टम् १ · व्याकरण-कार्यपत्रिका १ — सर्वनाम-लिङ्ग-सारणी',
    category: 'deep_ch14',
    categoryLabel: 'Appendix 1: शब्दरूपाणि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 5,
    timeLimit: '15 mins',
    description: 'व्याकरण-कार्यपत्रिका १ — किम् तथा तद् सर्वनामशब्दानां पुंलिङ्ग-स्त्रीलिङ्ग-नपुंसकलिङ्ग-रूपाणां सन्तुलनम्।',
    sections: [
      {
        sectionTitle: 'सर्वनाम-रूप-पूरणम् (Pronoun Gender Matching)',
        sectionTitleSanskrit: 'सर्वनाम-विभक्ति-पूर्तिः',
        instructions: 'रिक्तस्थानेषु उचितानि सर्वनाम-रूपाणि लिखन्तु:',
        totalMarks: 5,
        questions: [
          {
            num: 1,
            question: "'किम्' प्रथमा एकवचनम्: (पुं०) कः / (स्त्री०) _______________ / (नपुं०) किम्",
            marks: 1,
            type: 'fill',
            answer: 'का',
            explanation: "'किम्' स्त्रीलिङ्ग-प्रथमा-एकवचने 'का' भवति।",
          },
          {
            num: 2,
            question: "'किम्' षष्ठी बहुवचनम्: (पुं०) केषाम् / (स्त्री०) _______________ / (नपुं०) केषाम्",
            marks: 1,
            type: 'fill',
            answer: 'कासाम्',
            explanation: "'किम्' स्त्रीलिङ्ग-षष्ठी-बहुवचने 'कासाम्' भवति।",
          },
          {
            num: 3,
            question: "'किम्' तृतीया एकवचनम्: (पुं०) केन / (स्त्री०) तया / (नपुं०) _______________",
            marks: 1,
            type: 'fill',
            answer: 'केन',
            explanation: "नपुंसकलिङ्गे तृतीयायाः प्रभृति पुंलिङ्गवदेव 'केन' भवति।",
          },
          {
            num: 4,
            question: "'तद्' प्रथमा एकवचनम्: (पुं०) सः / (स्त्री०) सा / (नपुं०) _______________",
            marks: 1,
            type: 'fill',
            answer: 'तत्',
            explanation: "'तद्' नपुंसकलिङ्ग-प्रथमा-एकवचने 'तत्' भवति।",
          },
          {
            num: 5,
            question: "'तद्' द्वितीया बहुवचनम्: (पुं०) तान् / (स्त्री०) _______________ / (नपुं०) तानि",
            marks: 1,
            type: 'fill',
            answer: 'ताः',
            explanation: "'तद्' स्त्रीलिङ्ग-द्वितीया-बहुवचने 'ताः' भवति।",
          },
        ],
      },
    ],
  },
  {
    id: 'ws-ch14-g2',
    title: 'Appendix 1 Grammar: Base Core Personal Pronoun Fill-Ins (अस्मद्-युष्मद् रूप-पूर्तिः)',
    titleSanskrit: 'परिशिष्टम् १ · व्याकरण-कार्यपत्रिका २ — अस्मद्-युष्मद्-रूपाणि',
    category: 'deep_ch14',
    categoryLabel: 'Appendix 1: शब्दरूपाणि',
    grade: 'Class 7 (CBSE)',
    totalMarks: 6,
    timeLimit: '15 mins',
    description: 'व्याकरण-कार्यपत्रिका २ — अस्मद् (First Person) तथा युष्मद् (Second Person) सर्वनामपदानां विभक्तीनां पूर्तिः।',
    sections: [
      {
        sectionTitle: "भागः १: 'अस्मद्' (First Person Pronoun)",
        sectionTitleSanskrit: 'अस्मद्-शब्द-रूपाणि',
        instructions: "रिक्तस्थानेषु उचितानि 'अस्मद्' सर्वनाम-रूपाणि लिखन्तु:",
        totalMarks: 3,
        questions: [
          {
            num: 1,
            question: 'प्रथमा विभक्तिः: अहम् / _______________ / वयम्',
            marks: 1,
            type: 'fill',
            answer: 'आवाम्',
            explanation: 'अस्मद् प्रथमा: अहम् (एक०), आवाम् (द्वि०), वयम् (बहु०)।',
          },
          {
            num: 2,
            question: 'चतुर्थी विभक्तिः: मह्यम् / आवाभ्याम् / _______________',
            marks: 1,
            type: 'fill',
            answer: 'अस्मभ्यम्',
            explanation: 'अस्मद् चतुर्थी-बहुवचने अस्मभ्यम् (वा नः) भवति।',
          },
          {
            num: 3,
            question: 'षष्ठी विभक्तिः: _______________ / आवयोः / अस्माकम्',
            marks: 1,
            type: 'fill',
            answer: 'मम',
            explanation: 'अस्मद् षष्ठी-एकवचने मम (वा मे) भवति।',
          },
        ],
      },
      {
        sectionTitle: "भागः २: 'युष्मद्' (Second Person Pronoun)",
        sectionTitleSanskrit: 'युष्मद्-शब्द-रूपाणि',
        instructions: "रिक्तस्थानेषु उचितानि 'युष्मद्' सर्वनाम-रूपाणि लिखन्तु:",
        totalMarks: 3,
        questions: [
          {
            num: 4,
            question: 'प्रथमा विभक्तिः: त्वम् / युवाम् / _______________',
            marks: 1,
            type: 'fill',
            answer: 'यूयम्',
            explanation: 'युष्मद् प्रथमा: त्वम् (एक०), युवाम् (द्वि०), यूयम् (बहु०)।',
          },
          {
            num: 5,
            question: 'द्वितीया विभक्तिः: त्वाम् / _______________ / युष्मान्',
            marks: 1,
            type: 'fill',
            answer: 'युवाम्',
            explanation: 'युष्मद् द्वितीया-द्विवचने युवाम् (वा वाम्) भवति।',
          },
          {
            num: 6,
            question: 'सप्तमी विभक्तिः: त्वयि / युवयोः / _______________',
            marks: 1,
            type: 'fill',
            answer: 'युष्मासु',
            explanation: 'युष्मद् सप्तमी विभक्तिः: त्वयि, युवयोः, युष्मासु।',
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

  // ==========================================
  // GRAMMAR WORKSHEET 1: वचन-परिचयः (NUMBERS & 3RD PERSON VERBS)
  // ==========================================
  {
    id: 'ws-gram-vachana-1',
    title: 'Grammar Worksheet 1: वचन-परिचयः (Numbers & 3rd Person Verbs)',
    titleSanskrit: 'संस्कृत-व्याकरण-कार्यपत्रिका १ · वचन-परिचयः (एक-द्वि-बहुवचनानि)',
    category: 'grammar',
    categoryLabel: 'Vyākaraṇa / Grammar',
    grade: 'Beginner to CBSE Class 7',
    totalMarks: 25,
    timeLimit: '35 Minutes',
    description: 'Understanding Singular, Dual, and Plural (वचन-परिचयः), core pronouns (सः, ते, अहम्, वयम्, यूयम्), and 3rd person verb variations.',
    sections: [
      {
        sectionTitle: 'Part 1: वचन-परिचयः (Understanding Numbers)',
        sectionTitleSanskrit: 'भागः १ · वचन-परिचयः (एकवचनम्, द्विवचनम्, बहुवचनम्)',
        instructions: 'Unlike English, which only has Singular and Plural, Sanskrit has three numbers: Singular (एकवचन - 1), Dual (द्विवचन - 2), and Plural (बहुवचन - 3+). Complete the masculine grid below (बालकः ➡️ बालकौ ➡️ बालकाः):',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'अश्वः (One horse) ➡️ अश्वौ (Two horses) ➡️ _________________ (Many horses)',
            marks: 2,
            type: 'fill',
            answer: 'अश्वाः (Many horses)',
            explanation: 'Masculine plural ending is -आः (अश्वः ➡️ अश्वौ ➡️ अश्वाः).',
          },
          {
            num: 2,
            question: 'गजः (One elephant) ➡️ _________________ (Two elephants) ➡️ गजाः (Many elephants)',
            marks: 2,
            type: 'fill',
            answer: 'गजौ (Two elephants)',
            explanation: 'Masculine dual ending is -औ (गजः ➡️ गजौ ➡️ गजाः).',
          },
          {
            num: 3,
            question: '_________________ (One monkey) ➡️ वानरौ (Two monkeys) ➡️ वानराः (Many monkeys)',
            marks: 2,
            type: 'fill',
            answer: 'वानरः (One monkey)',
            explanation: 'Masculine singular nominative ending is -अः (वानरः ➡️ वानरौ ➡️ वानराः).',
          },
        ],
      },
      {
        sectionTitle: 'Part 2: सर्वनाम-पदानि (Pronouns - Singular vs. Plural)',
        sectionTitleSanskrit: 'भागः २ · सर्वनाम-पदानि (उचित-मेलनम्)',
        instructions: 'Match the correct Sanskrit pronoun with its English meaning:',
        totalMarks: 5,
        questions: [
          {
            num: 4,
            question: 'सः (Saha) ➔ English Meaning?',
            marks: 1,
            type: 'matching',
            options: ['A. They all (Masculine)', 'B. We all', 'C. He', 'D. You all', 'E. I'],
            answer: 'C. He',
            explanation: 'सः is Third Person Masculine Singular pronoun ("He").',
          },
          {
            num: 5,
            question: 'ते (Te - Masculine) ➔ English Meaning?',
            marks: 1,
            type: 'matching',
            options: ['A. They all (Masculine)', 'B. We all', 'C. He', 'D. You all', 'E. I'],
            answer: 'A. They all (Masculine)',
            explanation: 'ते is Third Person Masculine Plural pronoun ("They all").',
          },
          {
            num: 6,
            question: 'अहम् (Aham) ➔ English Meaning?',
            marks: 1,
            type: 'matching',
            options: ['A. They all (Masculine)', 'B. We all', 'C. He', 'D. You all', 'E. I'],
            answer: 'E. I',
            explanation: 'अहम् is First Person Singular pronoun ("I").',
          },
          {
            num: 7,
            question: 'वयम् (Vayam) ➔ English Meaning?',
            marks: 1,
            type: 'matching',
            options: ['A. They all (Masculine)', 'B. We all', 'C. He', 'D. You all', 'E. I'],
            answer: 'B. We all',
            explanation: 'वयम् is First Person Plural pronoun ("We all").',
          },
          {
            num: 8,
            question: 'यूयम् (Yūyam) ➔ English Meaning?',
            marks: 1,
            type: 'matching',
            options: ['A. They all (Masculine)', 'B. We all', 'C. He', 'D. You all', 'E. I'],
            answer: 'D. You all',
            explanation: 'यूयम् is Second Person Plural pronoun ("You all").',
          },
        ],
      },
      {
        sectionTitle: 'Part 3: क्रियापदानि (Verb Conjugation - 3rd Person Variations)',
        sectionTitleSanskrit: 'भागः ३ · प्रथमपुरुष-क्रियापदानि (-ति, -तः, -न्ति)',
        instructions: 'Sanskrit third person suffixes change by number: Singular (1) ends in -ति (-ti) ➡️ चलति; Dual (2) ends in -तः (-taḥ) ➡️ चलतः; Plural (3+) ends in -न्ति (-nti) ➡️ चलन्ति. Complete the table below:',
        totalMarks: 6,
        questions: [
          {
            num: 9,
            question: 'पठ् (to read): पठति (reads) ➡️ _________________ (two read) ➡️ पठन्ति (all read)',
            marks: 3,
            type: 'fill',
            answer: 'पठतः (two read)',
            explanation: 'Dual suffix is -तः (पठतः = two read).',
          },
          {
            num: 10,
            question: 'खाद् (to eat): _________________ (eats) ➡️ खादतः (two eat) ➡️ _________________ (all eat)',
            marks: 3,
            type: 'fill',
            answer: 'खादति (eats), खादन्ति (all eat)',
            explanation: 'Singular: खादति; Plural: खादन्ति.',
          },
        ],
      },
      {
        sectionTitle: 'Part 4: वाक्य-रचना (Simple Sentence Translation)',
        sectionTitleSanskrit: 'भागः ४ · सरल-वाक्य-रचना',
        instructions: 'Translate these simple sentences into Sanskrit using the noun and verb rules learned above:',
        totalMarks: 8,
        questions: [
          {
            num: 11,
            question: 'Many boys read. (Many boys = बालकाः / All read = पठन्ति) 👉 ____________________________________',
            marks: 3,
            type: 'short_ans',
            answer: 'बालकाः पठन्ति। (Bālakaḥ paṭhanti.)',
            explanation: 'Plural subject बालकाः takes plural verb पठन्ति।',
          },
          {
            num: 12,
            question: 'Two elephants walk. (Two elephants = गजौ / Two walk = चलतः) 👉 ____________________________________',
            marks: 3,
            type: 'short_ans',
            answer: 'गजौ चलतः। (Gajau chalataḥ.)',
            explanation: 'Dual subject गजौ takes dual verb चलतः।',
          },
          {
            num: 13,
            question: 'He eats. (He = सः / Eats = खादति) 👉 ____________________________________',
            marks: 2,
            type: 'short_ans',
            answer: 'सः खादति। (Saha khādati.)',
            explanation: 'Singular subject सः takes singular verb खादति।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRAMMAR WORKSHEET 2: स्त्रीलिङ्ग-वचन-परिचयः (FEMININE NOUNS & 1ST PERSON VERBS)
  // ==========================================
  {
    id: 'ws-gram-stri-2',
    title: 'Grammar Worksheet 2: स्त्रीलिङ्ग-वचन-परिचयः (Feminine Nouns & 1st Person Verbs)',
    titleSanskrit: 'संस्कृत-व्याकरण-कार्यपत्रिका २ · स्त्रीलिङ्ग-वचन-परिचयः उत्तमपुरुषश्च',
    category: 'grammar',
    categoryLabel: 'Vyākaraṇa / Grammar',
    grade: 'Beginner to CBSE Class 7',
    totalMarks: 20,
    timeLimit: '30 Minutes',
    description: 'Feminine noun number forms ending in -आ (लता, छात्रा, मक्षिका) and First Person verb endings (-आमि, -ामः).',
    sections: [
      {
        sectionTitle: 'Part 1: स्त्रीलिङ्ग-वचन-परिचयः (Feminine Noun Numbers)',
        sectionTitleSanskrit: 'भागः १ · स्त्रीलिङ्ग-वचन-परिचयः (बालिका ➡️ बालिके ➡️ बालिकाः)',
        instructions: 'Feminine nouns ending in -आ follow the pattern: बालिका (1) ➡️ बालिके (2) ➡️ बालिकाः (3+). Fill in the blanks:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'लता (One creeper) ➡️ लते (Two creepers) ➡️ _________________ (Many creepers)',
            marks: 2,
            type: 'fill',
            answer: 'लताः (Many creepers)',
            explanation: 'Feminine plural nominative adds visarga: लताः।',
          },
          {
            num: 2,
            question: '_________________ (One female student) ➡️ छात्रे (Two female students) ➡️ छात्राः (Many female students)',
            marks: 2,
            type: 'fill',
            answer: 'छात्रा (One female student)',
            explanation: 'Feminine singular nominative ends in -आ without visarga: छात्रा।',
          },
          {
            num: 3,
            question: 'मक्षिका (One housefly) ➡️ _________________ (Two houseflies) ➡️ मक्षिकाः (Many houseflies)',
            marks: 2,
            type: 'fill',
            answer: 'मक्षिके (Two houseflies)',
            explanation: 'Feminine dual nominative ends in -ए: मक्षिके।',
          },
        ],
      },
      {
        sectionTitle: 'Part 2: उत्तमपुरुष-क्रियापदानि (Verb Conjugation - First Person "I / We")',
        sectionTitleSanskrit: 'भागः २ · उत्तमपुरुष-क्रियापदानि (-आमि, -ामः)',
        instructions: 'In First Person ("I / We"), singular ends in -आमि (-āmi) ➡️ पठामि (I read); plural ends in -ामः (-āmaḥ) ➡️ पठामः (We all read). Complete the table:',
        totalMarks: 6,
        questions: [
          {
            num: 4,
            question: 'लिख् (to write): लिखामि (I write) ➡️ _________________ (We all write)',
            marks: 3,
            type: 'fill',
            answer: 'लिखामः (We all write)',
            explanation: 'First person plural of लिख् is लिखामः।',
          },
          {
            num: 5,
            question: 'खाद् (to eat): _________________ (I eat) ➡️ खादामः (We all eat)',
            marks: 3,
            type: 'fill',
            answer: 'खादामि (I eat)',
            explanation: 'First person singular of खाद् is खादामि।',
          },
        ],
      },
      {
        sectionTitle: 'Part 3: वाक्य-रचना (Simple Sentence Production)',
        sectionTitleSanskrit: 'भागः ३ · वाक्य-रचना',
        instructions: 'Translate these introductory phrases by identifying the correct pronoun/noun form and combining it with the matching verb:',
        totalMarks: 8,
        questions: [
          {
            num: 6,
            question: 'I write. (I = अहम् / write = लिखामि) 👉 ____________________________________',
            marks: 3,
            type: 'short_ans',
            answer: 'अहम् लिखामि। (Aham likhāmi.)',
            explanation: 'अहम् takes first person singular verb लिखामि।',
          },
          {
            num: 7,
            question: 'We all eat. (We all = वयम् / eat = खादामः) 👉 ____________________________________',
            marks: 3,
            type: 'short_ans',
            answer: 'वयम् खादामः। (Vayam khādāmaḥ.)',
            explanation: 'वयम् takes first person plural verb खादामः।',
          },
          {
            num: 8,
            question: 'Two girls read. (Two girls = बालिके / Two read = पठतः) 👉 ____________________________________',
            marks: 2,
            type: 'short_ans',
            answer: 'बालिके पठतः। (Bālike paṭhataḥ.)',
            explanation: 'Dual feminine subject बालिके takes dual 3rd person verb पठतः।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRAMMAR WORKSHEET 3: नपुंसकलिङ्ग-वचन-परिचयः (NEUTER NOUNS & 2ND PERSON VERBS)
  // ==========================================
  {
    id: 'ws-gram-napunsak-3',
    title: 'Grammar Worksheet 3: नपुंसकलिङ्ग-वचन-परिचयः (Neuter Nouns & 2nd Person Verbs)',
    titleSanskrit: 'संस्कृत-व्याकरण-कार्यपत्रिका ३ · नपुंसकलिङ्ग-वचन-परिचयः मध्यमपुरुषश्च',
    category: 'grammar',
    categoryLabel: 'Vyākaraṇa / Grammar',
    grade: 'Beginner to CBSE Class 7',
    totalMarks: 20,
    timeLimit: '30 Minutes',
    description: 'Neuter noun forms ending in -अम्, -ए, -आनि (फलम्, पुष्पम्, मित्रम्) and Second Person verb endings (-सि, -थ).',
    sections: [
      {
        sectionTitle: 'Part 1: नपुंसकलिङ्ग-वचन-परिचयः (Neuter Noun Numbers)',
        sectionTitleSanskrit: 'भागः १ · नपुंसकलिङ्ग-वचन-परिचयः (पुस्तकम् ➡️ पुस्तके ➡️ पुस्तकानि)',
        instructions: 'Neuter nouns follow the pattern: -अम् (1) ➡️ -ए (2) ➡️ -आनि (3+). Complete the grid below:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'फलम् (One fruit) ➡️ फले (Two fruits) ➡️ _________________ (Many fruits)',
            marks: 2,
            type: 'fill',
            answer: 'फलानि (Many fruits)',
            explanation: 'Neuter plural nominative adds -आनि: फलानि।',
          },
          {
            num: 2,
            question: '_________________ (One flower) ➡️ पुष्पे (Two flowers) ➡️ पुष्पाणि (Many flowers)',
            marks: 2,
            type: 'fill',
            answer: 'पुष्पम् (One flower)',
            explanation: 'Neuter singular nominative ends in -अम्: पुष्पम्।',
          },
          {
            num: 3,
            question: 'मित्रम् (One friend) ➡️ मित्रे (Two friends) ➡️ _________________ (Many friends)',
            marks: 2,
            type: 'fill',
            answer: 'मित्राणि (Many friends)',
            explanation: 'Neuter plural nominative adds -आणि: मित्राणि।',
          },
        ],
      },
      {
        sectionTitle: 'Part 2: मध्यमपुरुष-क्रियापदानि (Verb Conjugation - Second Person "You")',
        sectionTitleSanskrit: 'भागः २ · मध्यमपुरुष-क्रियापदानि (-सि, -थ)',
        instructions: 'When addressing someone directly ("You"), singular ends in -सि (-si) ➡️ पठसि; plural ends in -थ (-tha) ➡️ पठथ. Complete the table:',
        totalMarks: 6,
        questions: [
          {
            num: 4,
            question: 'धाव् (to run): धावसि (You run) ➡️ _________________ (You all run)',
            marks: 3,
            type: 'fill',
            answer: 'धावथ (You all run)',
            explanation: 'Second person plural of धाव् is धावथ।',
          },
          {
            num: 5,
            question: 'खाद् (to eat): _________________ (You eat) ➡️ खादथ (You all eat)',
            marks: 3,
            type: 'fill',
            answer: 'खादसि (You eat)',
            explanation: 'Second person singular of खाद् is खादसि।',
          },
        ],
      },
      {
        sectionTitle: 'Part 3: वाक्य-रचना (Simple Sentence Production)',
        sectionTitleSanskrit: 'भागः ३ · वाक्य-रचना',
        instructions: 'Translate these short phrases into Sanskrit by matching the pronoun or noun number with its correct verb form:',
        totalMarks: 8,
        questions: [
          {
            num: 6,
            question: 'You run. (You = त्वम् / run = धावसि) 👉 ____________________________________',
            marks: 3,
            type: 'short_ans',
            answer: 'त्वम् धावसि। (Tvam dhāvasi.)',
            explanation: 'त्वम् takes second person singular verb धावसि।',
          },
          {
            num: 7,
            question: 'You all eat. (You all = यूयम् / eat = खादथ) 👉 ____________________________________',
            marks: 3,
            type: 'short_ans',
            answer: 'यूयम् खादथ। (Yūyam khādatha.)',
            explanation: 'यूयम् takes second person plural verb खादथ।',
          },
          {
            num: 8,
            question: 'Two fruits fall. (Two fruits = फले / Two fall = पततः) 👉 ____________________________________',
            marks: 2,
            type: 'short_ans',
            answer: 'फले पततः। (Phale patataḥ.)',
            explanation: 'Dual neuter subject फले takes dual verb पततः।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRAMMAR WORKSHEET 4: प्रश्नवाचक-शब्दाः (QUESTION WORDS & FORMATION)
  // ==========================================
  {
    id: 'ws-gram-prashna-4',
    title: 'Grammar Worksheet 4: प्रश्नवाचक-शब्दाः (Question Words & Question Formation)',
    titleSanskrit: 'संस्कृत-व्याकरण-कार्यपत्रिका ४ · प्रश्नवाचक-शब्दाः प्रश्ननिर्माणं च',
    category: 'grammar',
    categoryLabel: 'Vyākaraṇa / Grammar',
    grade: 'Beginner to CBSE Class 7',
    totalMarks: 20,
    timeLimit: '30 Minutes',
    description: 'Master interrogatives: किम् (What), कुत्र (Where), कदा (When), कथम् (How), and question framing.',
    sections: [
      {
        sectionTitle: 'Part 1: प्रश्नवाचक-शब्दाः (Question Words Matching)',
        sectionTitleSanskrit: 'भागः १ · प्रश्नवाचक-शब्दानाम् उचित-मेलनम्',
        instructions: 'Match the Sanskrit question word with its English meaning:',
        totalMarks: 4,
        questions: [
          {
            num: 1,
            question: '१. किम् (Kim) ➔ English Meaning?',
            marks: 1,
            type: 'matching',
            options: ['A. How', 'B. When', 'C. What / Who (Neuter)', 'D. Where'],
            answer: 'C. What / Who (Neuter)',
            explanation: 'किम् = What or Which (Neuter interrogative pronoun).',
          },
          {
            num: 2,
            question: '२. कुत्र (Kutra) ➔ English Meaning?',
            marks: 1,
            type: 'matching',
            options: ['A. How', 'B. When', 'C. What / Who (Neuter)', 'D. Where'],
            answer: 'D. Where',
            explanation: 'कुत्र = Where (Locational interrogative avyaya).',
          },
          {
            num: 3,
            question: '३. कदा (Kadā) ➔ English Meaning?',
            marks: 1,
            type: 'matching',
            options: ['A. How', 'B. When', 'C. What / Who (Neuter)', 'D. Where'],
            answer: 'B. When',
            explanation: 'कदा = When (Temporal interrogative avyaya).',
          },
          {
            num: 4,
            question: '४. कथम् (Katham) ➔ English Meaning?',
            marks: 1,
            type: 'matching',
            options: ['A. How', 'B. When', 'C. What / Who (Neuter)', 'D. Where'],
            answer: 'A. How',
            explanation: 'कथम् = How (Manner interrogative avyaya).',
          },
        ],
      },
      {
        sectionTitle: 'Part 2: प्रश्न-निर्माणम् (Fill in the Questions)',
        sectionTitleSanskrit: 'भागः २ · प्रश्न-निर्माणम् (कोष्ठकात् उचितं पदं चिनुत)',
        instructions: 'Look at the statement on the left and complete the question on the right by choosing the correct word from the options:',
        totalMarks: 6,
        questions: [
          {
            num: 5,
            question: 'Statement: बालकः पठति। (The boy reads.) ➔ Question: बालकः ________________ करोति? (What does the boy do?)',
            marks: 2,
            type: 'mcq',
            options: ['कुत्र', 'किम्'],
            answer: 'किम्',
            explanation: 'किम् asks "what" action the boy is performing.',
          },
          {
            num: 6,
            question: 'Statement: अश्वः तत्र धावति। (The horse runs there.) ➔ Question: अश्वः ________________ धावति? (Where does the horse run?)',
            marks: 2,
            type: 'mcq',
            options: ['कुत्र', 'कथम्'],
            answer: 'कुत्र',
            explanation: 'कुत्र asks "where" the horse runs.',
          },
          {
            num: 7,
            question: 'Statement: सः मन्दं चलति। (He walks slowly.) ➔ Question: सः ________________ चलति? (How does he walk?)',
            marks: 2,
            type: 'mcq',
            options: ['कदा', 'कथम्'],
            answer: 'कथम्',
            explanation: 'कथम् asks "how" (in what manner) he walks.',
          },
        ],
      },
      {
        sectionTitle: 'Part 3: वाक्य-अनुवादः (Translating Questions)',
        sectionTitleSanskrit: 'भागः ३ · प्रश्नवाक्य-अनुवादः',
        instructions: 'Combine your knowledge of pronouns, nouns, verbs, and question words to translate these questions into Sanskrit:',
        totalMarks: 10,
        questions: [
          {
            num: 8,
            question: 'Where do you go? (You = त्वम् / Where = कुत्र / go = गच्छसि) 👉 ____________________________________________',
            marks: 3,
            type: 'short_ans',
            answer: 'त्वम् कुत्र गच्छसि? (Tvam kutra gacchasi?)',
            explanation: 'Subject त्वम् + Question word कुत्र + Verb गच्छसि।',
          },
          {
            num: 9,
            question: 'What is that? (That = तत् / What = किम्) 👉 ____________________________________________',
            marks: 3,
            type: 'short_ans',
            answer: 'तत् किम्? (Tat kim?)',
            explanation: 'Neuter demonstrative pronoun तत् + Question word किम्।',
          },
          {
            num: 10,
            question: 'When do they all eat? (They all = ते / When = कदा / eat = खादन्ति) 👉 ____________________________________________',
            marks: 4,
            type: 'short_ans',
            answer: 'ते कदा खादन्ति? (Te kadā khādanti?)',
            explanation: 'Plural subject ते + Question word कदा + Plural verb खादन्ति।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRAMMAR WORKSHEET 5: लिङ्ग-वचन-कोष्ठकम् (GENDER-NUMBER MATRIX & AGREEMENT)
  // ==========================================
  {
    id: 'ws-gram-matrix-5',
    title: 'Grammar Worksheet 5: लिङ्ग-वचन-कोष्ठकम् (Gender-Number Matrix & Agreement)',
    titleSanskrit: 'संस्कृत-व्याकरण-कार्यपत्रिका ५ · लिङ्ग-वचन-कोष्ठकम् अन्वय-दोषनिवारणं च',
    category: 'grammar',
    categoryLabel: 'Vyākaraṇa / Grammar',
    grade: 'Beginner to CBSE Class 7',
    totalMarks: 25,
    timeLimit: '40 Minutes',
    description: 'Complete the three-gender matrix (देव, मयूर, मक्षिका, महिला, गृह, चक्र) and solve Concord / Error Spotting tasks.',
    sections: [
      {
        sectionTitle: 'Part 1: लिङ्ग-वचन-कोष्ठकम् (The Gender-Number Matrix)',
        sectionTitleSanskrit: 'भागः १ · लिङ्ग-वचन-कोष्ठक-पूर्तिः',
        instructions: 'Key pattern: Masc: -अः ➡️ -औ ➡️ -आः; Fem: -आ ➡️ -ए ➡️ -आः; Neut: -अम् ➡️ -ए ➡️ -आनि. Fill in the missing boxes:',
        totalMarks: 12,
        questions: [
          {
            num: 1,
            question: '१. देव (God) / पुंलिङ्ग: देवः | देवौ | _________________',
            marks: 2,
            type: 'fill',
            answer: 'देवाः (Many gods)',
            explanation: 'Masculine plural of देव is देवाः।',
          },
          {
            num: 2,
            question: '२. मयूर (Peacock) / पुंलिङ्ग: _________________ | मयूरौ | मयूराः',
            marks: 2,
            type: 'fill',
            answer: 'मयूरः (One peacock)',
            explanation: 'Masculine singular of मयूर is मयूरः।',
          },
          {
            num: 3,
            question: '३. मक्षिका (Fly) / स्त्रीलिङ्ग: मक्षिका | _________________ | मक्षिकाः',
            marks: 2,
            type: 'fill',
            answer: 'मक्षिके (Two flies)',
            explanation: 'Feminine dual of मक्षिका is मक्षिके।',
          },
          {
            num: 4,
            question: '४. महिला (Woman) / स्त्रीलिङ्ग: महिला | महिले | _________________',
            marks: 2,
            type: 'fill',
            answer: 'महिलाः (Many women)',
            explanation: 'Feminine plural of महिला is महिलाः।',
          },
          {
            num: 5,
            question: '५. गृह (House) / नपुंसकलिङ्ग: गृहम् | _________________ | गृहाणि',
            marks: 2,
            type: 'fill',
            answer: 'गृहे (Two houses)',
            explanation: 'Neuter dual of गृह is गृहे।',
          },
          {
            num: 6,
            question: '६. चक्र (Wheel) / नपुंसकलिङ्ग: _________________ | चक्रे | चक्राणि',
            marks: 2,
            type: 'fill',
            answer: 'चक्रम् (One wheel)',
            explanation: 'Neuter singular of चक्र is चक्रम्।',
          },
        ],
      },
      {
        sectionTitle: 'Part 2: उचितपदैः रिक्तस्थानानि पूरयत (Fill in with Correct Verb Endings)',
        sectionTitleSanskrit: 'भागः २ · उचितपदैः रिक्तस्थानानि पूरयत',
        instructions: 'Match the subject noun gender/number with the appropriate third-person action verbs (Singular -ति, Dual -तः, Plural -न्ति):',
        totalMarks: 6,
        questions: [
          {
            num: 7,
            question: 'पत्राणि (Many leaves) _________________। (Options: पतति / पतन्ति) [Leaves fall]',
            marks: 2,
            type: 'mcq',
            options: ['पतति', 'पतन्ति'],
            answer: 'पतन्ति',
            explanation: 'पत्राणि is plural (बहुवचनम्), so it takes plural verb ending -न्ति (पतन्ति).',
          },
          {
            num: 8,
            question: 'बालिके (Two girls) _________________। (Options: हसतः / हसन्ति) [Two girls laugh]',
            marks: 2,
            type: 'mcq',
            options: ['हसतः', 'हसन्ति'],
            answer: 'हसतः',
            explanation: 'बालिके is dual (द्विवचनम्), so it takes dual verb ending -तः (हसतः).',
          },
          {
            num: 9,
            question: 'सिंहः (One lion) _________________। (Options: गर्जति / गर्जतः) [The lion roars]',
            marks: 2,
            type: 'mcq',
            options: ['गर्जति', 'गर्जतः'],
            answer: 'गर्जति',
            explanation: 'सिंहः is singular (एकवचनम्), so it takes singular verb ending -ति (गर्जति).',
          },
        ],
      },
      {
        sectionTitle: 'Part 3: दोष-निवारणम् (Spot the Grammar Error)',
        sectionTitleSanskrit: 'भागः ३ · दोष-निवारणम् (अन्वय-शुद्धिः)',
        instructions: 'Each sentence below has one deliberate mismatch between the subject noun and the action verb. Rewrite the sentence correctly:',
        totalMarks: 7,
        questions: [
          {
            num: 10,
            question: 'चक्राणि भ्रमति। (The wheels rotate.) 👉 Correction: __________________________________________',
            marks: 3,
            type: 'short_ans',
            answer: 'चक्राणि भ्रमन्ति। (Plural subject requires plural verb ending -न्ति)',
            explanation: 'Subject चक्राणि is plural, so verb must be भ्रमन्ति।',
          },
          {
            num: 11,
            question: 'अश्वौ धावन्ति। (Two horses run.) 👉 Correction: __________________________________________',
            marks: 4,
            type: 'short_ans',
            answer: 'अश्वौ धावतः। (Dual subject requires dual verb ending -तः)',
            explanation: 'Subject अश्वौ is dual, so verb must be धावतः।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRAMMAR WORKSHEET 6: सामान्य-समीक्षा (COMPREHENSIVE BEGINNER REVIEW)
  // ==========================================
  {
    id: 'ws-gram-review-6',
    title: 'Grammar Worksheet 6: सामान्य-समीक्षा (Comprehensive Beginner Review)',
    titleSanskrit: 'संस्कृत-व्याकरण-कार्यपत्रिका ६ · सामान्य-समीक्षा (वस्तुनिष्ठ-मेलन-दोषशुद्धिः)',
    category: 'grammar',
    categoryLabel: 'Vyākaraṇa / Grammar',
    grade: 'Beginner to CBSE Class 7',
    totalMarks: 25,
    timeLimit: '40 Minutes',
    description: 'Multiple Choice Questions, matching subjects to verbs, gender identification, and sentence correction.',
    sections: [
      {
        sectionTitle: 'Part 1: बहुविकल्पीय-प्रश्नाः (Multiple Choice Questions)',
        sectionTitleSanskrit: 'भागः १ · वस्तुनिष्ठ-प्रश्नाः (उचितं विकल्पं चिनुत)',
        instructions: 'Choose the correct option for each question based on the grammar rules you have practiced:',
        totalMarks: 8,
        questions: [
          {
            num: 1,
            question: 'What is the plural form of the masculine noun गजः (Elephant)?',
            marks: 2,
            type: 'mcq',
            options: ['(A) गजौ', '(B) गजाः', '(C) गजम्'],
            answer: '(B) गजाः',
            explanation: 'Masculine plural pattern finishes with -आः (गजाः).',
          },
          {
            num: 2,
            question: 'Which pronoun means "We all" (First Person Plural) in Sanskrit?',
            marks: 2,
            type: 'mcq',
            options: ['(A) अहम्', '(B) त्वम्', '(C) वयम्'],
            answer: '(C) वयम्',
            explanation: 'अहम् = I, त्वम् = You, वयम् = We all.',
          },
          {
            num: 3,
            question: 'Complete the sentence: बालिका ________________। (The girl reads.)',
            marks: 2,
            type: 'mcq',
            options: ['(A) पठति', '(B) पठतः', '(C) पठन्ति'],
            answer: '(A) पठति',
            explanation: 'Singular female subject बालिका matches singular 3rd person verb ending -ति (पठति).',
          },
          {
            num: 4,
            question: 'What does the question word कुत्र (Kutra) mean?',
            marks: 2,
            type: 'mcq',
            options: ['(A) What', '(B) Where', '(C) When'],
            answer: '(B) Where',
            explanation: 'कुत्र signifies locational inquiry ("Where").',
          },
        ],
      },
      {
        sectionTitle: 'Part 2: उचित-मेलनम् कुरुत (Match the Columns)',
        sectionTitleSanskrit: 'भागः २ · कर्तृ-क्रियापद-मेलनम्',
        instructions: 'Match the noun or pronoun with its corresponding correct present tense verb form:',
        totalMarks: 8,
        questions: [
          {
            num: 5,
            question: 'Subject: त्वम् (You singular) ➔ Matching Verb?',
            marks: 2,
            type: 'matching',
            options: ['A. खादामि (I eat)', 'B. चलतः (Two walk)', 'C. गच्छसि (You go)', 'D. पतन्ति (Many fall)'],
            answer: 'C. गच्छसि (You go)',
            explanation: 'Second person singular pronoun त्वम् matches -सि suffix (गच्छसि).',
          },
          {
            num: 6,
            question: 'Subject: अहम् (I singular) ➔ Matching Verb?',
            marks: 2,
            type: 'matching',
            options: ['A. खादामि (I eat)', 'B. चलतः (Two walk)', 'C. गच्छसि (You go)', 'D. पतन्ति (Many fall)'],
            answer: 'A. खादामि (I eat)',
            explanation: 'First person singular pronoun अहम् matches -आमि suffix (खादामि).',
          },
          {
            num: 7,
            question: 'Subject: बालकौ (Two boys) ➔ Matching Verb?',
            marks: 2,
            type: 'matching',
            options: ['A. खादामि (I eat)', 'B. चलतः (Two walk)', 'C. गच्छसि (You go)', 'D. पतन्ति (Many fall)'],
            answer: 'B. चलतः (Two walk)',
            explanation: 'Dual subject बालकौ matches dual 3rd person ending -तः (चलतः).',
          },
          {
            num: 8,
            question: 'Subject: पत्राणि (Many leaves) ➔ Matching Verb?',
            marks: 2,
            type: 'matching',
            options: ['A. खादामि (I eat)', 'B. चलतः (Two walk)', 'C. गच्छसि (You go)', 'D. पतन्ति (Many fall)'],
            answer: 'D. पतन्ति (Many fall)',
            explanation: 'Plural subject पत्राणि matches plural 3rd person ending -न्ति (पतन्ति).',
          },
        ],
      },
      {
        sectionTitle: 'Part 3: लिङ्ग-निश्चयः (Identify the Gender)',
        sectionTitleSanskrit: 'भागः ३ · लिङ्ग-निश्चयः (पुंलिङ्गम् / स्त्रीलिङ्गम् / नपुंसकलिङ्गम्)',
        instructions: 'Look at the word endings and choose whether the word is पुंलिङ्ग, स्त्रीलिङ्ग, or नपुंसकलिङ्ग:',
        totalMarks: 3,
        questions: [
          {
            num: 9,
            question: 'फलम् (Fruit) ➡️ ___________________________',
            marks: 1,
            type: 'mcq',
            options: ['पुंलिङ्गम् (Masculine)', 'स्त्रीलिङ्गम् (Feminine)', 'नपुंसकलिङ्गम् (Neuter)'],
            answer: 'नपुंसकलिङ्गम् (Neuter)',
            explanation: 'Ends in -अम् ➔ नपुंसकलिङ्गम् (Neuter).',
          },
          {
            num: 10,
            question: 'वानरः (Monkey) ➡️ ___________________________',
            marks: 1,
            type: 'mcq',
            options: ['पुंलिङ्गम् (Masculine)', 'स्त्रीलिङ्गम् (Feminine)', 'नपुंसकलिङ्गम् (Neuter)'],
            answer: 'पुंलिङ्गम् (Masculine)',
            explanation: 'Ends in -अः ➔ पुंलिङ्गम् (Masculine).',
          },
          {
            num: 11,
            question: 'लता (Creeper) ➡️ ___________________________',
            marks: 1,
            type: 'mcq',
            options: ['पुंलिङ्गम् (Masculine)', 'स्त्रीलिङ्गम् (Feminine)', 'नपुंसकलिङ्गम् (Neuter)'],
            answer: 'स्त्रीलिङ्गम् (Feminine)',
            explanation: 'Ends in -आ ➔ स्त्रीलिङ्गम् (Feminine).',
          },
        ],
      },
      {
        sectionTitle: 'Part 4: वाक्य-शुद्धिः (Correct the Sentence)',
        sectionTitleSanskrit: 'भागः ४ · वाक्य-शुद्धिः (वचन-दोष-निवारणम्)',
        instructions: 'Identify and fix the mismatched number (Vachana) between the subject and the verb:',
        totalMarks: 6,
        questions: [
          {
            num: 12,
            question: 'वयम् लिखामि। (We all write.) 👉 Correction: ____________________________________',
            marks: 3,
            type: 'short_ans',
            answer: 'वयम् लिखामः। (The pronoun वयम् requires the plural first-person suffix -ामः)',
            explanation: 'वयम् is plural and requires लिखामः, not singular लिखामि।',
          },
          {
            num: 13,
            question: 'अश्वाः धावति। (Many horses run.) 👉 Correction: ____________________________________',
            marks: 3,
            type: 'short_ans',
            answer: 'अश्वाः धावन्ति। (The plural subject अश्वाः requires the plural third-person suffix -न्ति)',
            explanation: 'अश्वाः is plural and requires धावन्ति, not singular धावति।',
          },
        ],
      },
    ],
  },


  // =======================================
  // ==========================================
  // GRAMMAR WORKSHEET 7: विभक्ति-मूलम् (PART 1: FOUNDATIONAL CASES · 10 QS)
  // ==========================================
  {
    "id": "ws-gram-vibhakti-1",
    "title": "Grammar Worksheet 7: विभक्ति-मूलम् (Part 1: Foundational Cases · बालक & राम)",
    "titleSanskrit": "संस्कृत-व्याकरण-कार्यपत्रिका ७ · विभक्ति-मूलम् (प्रथमातः सम्बोधनपर्यन्तम्)",
    "category": "grammar",
    "categoryLabel": "Vyākaraṇa / Grammar",
    "grade": "Beginner to CBSE Class 7",
    "totalMarks": 30,
    "timeLimit": "25 Minutes",
    "description": "Master foundational Sanskrit noun endings (Cases 1 to 8) for standard masculine 'a'-stem nouns बालक and राम.",
    "sections": [
      {
        "sectionTitle": "Section A: प्रथमा, द्वितीया, तृतीया विभक्तयः (Cases 1 to 3)",
        "sectionTitleSanskrit": "खण्डः \"क\" · प्रथमा, द्वितीया, तृतीया विभक्तयः",
        "instructions": "Choose the correct form representing Nominative, Accusative, and Instrumental cases:",
        "totalMarks": 9,
        "questions": [
          {
            "num": 1,
            "question": "Which of the following forms represents the masculine singular Prathama Vibhakti (Nominative Case) for the noun 'बालक' (boy)?",
            "questionSanskrit": "बालक-शब्दस्य प्रथमा-विभक्तौ एकवचने किं रूपम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) बालकम् [Dvitiya Vibhakti / Accusative]",
              "(B) बालकः [Prathama Vibhakti / Nominative Case]",
              "(C) बालकेण [Tritiya Vibhakti / Instrumental]",
              "(D) बालकाय [Chaturthi Vibhakti / Dative]"
            ],
            "answer": "(B) बालकः [Prathama Vibhakti / Nominative Case]",
            "explanation": "Correct! 'बालकः' represents the nominative subject form in the singular."
          },
          {
            "num": 2,
            "question": "Which singular form of the noun 'राम' (Rama) indicates the object receiving the action (Dvitiya Vibhakti / Accusative Case)?",
            "questionSanskrit": "राम-शब्दस्य द्वितीया-विभक्तौ कर्म-कारक-रूपं किम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) रामः [Prathama Vibhakti / Nominative]",
              "(B) रामेण [Tritiya Vibhakti / Instrumental]",
              "(C) रामम् [Dvitiya Vibhakti / Accusative Case]",
              "(D) रामाय [Chaturthi Vibhakti / Dative]"
            ],
            "answer": "(C) रामम् [Dvitiya Vibhakti / Accusative Case]",
            "explanation": "Correct! 'रामम्' is the singular object form (Dvitiya Vibhakti)."
          },
          {
            "num": 3,
            "question": "If you want to say an action is done \"by Rama\" or \"with Rama\" using the Tritiya Vibhakti (Instrumental Case), which singular form should you choose?",
            "questionSanskrit": "\"रामेण\" इति तृतीया-विभक्ति-पदस्य कः अर्थः?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) रामेण [Tritiya Vibhakti / Instrumental Case]",
              "(B) रामात् [Panchami Vibhakti / Ablative]",
              "(C) रामस्य [Shashti Vibhakti / Genitive]",
              "(D) रामे [Saptami Vibhakti / Locative]"
            ],
            "answer": "(A) रामेण [Tritiya Vibhakti / Instrumental Case]",
            "explanation": "Correct! 'रामेण' is the correct instrumental singular form showing agency or accompaniment."
          }
        ]
      },
      {
        "sectionTitle": "Section B: चतुर्थी, पञ्चमी, षष्ठी विभक्तयः (Cases 4 to 6)",
        "sectionTitleSanskrit": "खण्डः \"ख\" · चतुर्थी, पञ्चमी, षष्ठी विभक्तयः",
        "instructions": "Select the correct case form for Dative, Ablative, and Genitive roles:",
        "totalMarks": 9,
        "questions": [
          {
            "num": 4,
            "question": "Which singular form represents the Chaturthi Vibhakti (Dative Case) used for the recipient or purpose of giving, using the noun 'बालक' (boy)?",
            "questionSanskrit": "\"बालक\" शब्दस्य चतुर्थी-विभक्तौ सम्प्रदान-रूपं किम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) बालकस्य [Shashti Vibhakti / Genitive]",
              "(B) बालकात [Panchami Vibhakti / Ablative]",
              "(C) बालके [Saptami Vibhakti / Locative]",
              "(D) बालकाय [Chaturthi Vibhakti / Dative Case]"
            ],
            "answer": "(D) बालकाय [Chaturthi Vibhakti / Dative Case]",
            "explanation": "Correct! 'बालकाय' is the dative case form indicating a recipient or purpose."
          },
          {
            "num": 5,
            "question": "Which form of 'राम' (Rama) denotes separation or origin (meaning \"from Rama\") corresponding to the Panchami Vibhakti (Ablative Case)?",
            "questionSanskrit": "\"राम\" शब्दस्य पञ्चमी-विभक्तौ अपादान-रूपं किम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) रामात् [Panchami Vibhakti / Ablative Case]",
              "(B) रामे [Saptami Vibhakti / Locative]",
              "(C) रामस्य [Shashti Vibhakti / Genitive]",
              "(D) रामाय [Chaturthi Vibhakti / Dative]"
            ],
            "answer": "(A) रामात् [Panchami Vibhakti / Ablative Case]",
            "explanation": "Correct! 'रामात्' represents the ablative singular case signifying separation or source."
          },
          {
            "num": 6,
            "question": "To indicate possession or relationship, such as \"of Rama\" or \"Rama's\", which Shashti Vibhakti (Genitive Case) singular form is correct?",
            "questionSanskrit": "\"राम\" शब्दस्य षष्ठी-विभक्तौ सम्बन्ध-रूपं किम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) रामम् [Dvitiya Vibhakti / Accusative]",
              "(B) रामस्य [Shashti Vibhakti / Genitive Case]",
              "(C) रामेण [Tritiya Vibhakti / Instrumental]",
              "(D) रामात् [Panchami Vibhakti / Ablative]"
            ],
            "answer": "(B) रामस्य [Shashti Vibhakti / Genitive Case]",
            "explanation": "Correct! 'रामस्य' indicates possession or association (\"of Rama\")."
          }
        ]
      },
      {
        "sectionTitle": "Section C: सप्तमी, सम्बोधनम् (Cases 7 & 8)",
        "sectionTitleSanskrit": "खण्डः \"ग\" · सप्तमी, सम्बोधन-विभक्तयः",
        "instructions": "Identify the locative and vocative forms:",
        "totalMarks": 6,
        "questions": [
          {
            "num": 7,
            "question": "Which singular word form represents the Saptami Vibhakti (Locative Case) meaning \"in/on the boy\" for 'बालक'?",
            "questionSanskrit": "\"बालक\" शब्दस्य सप्तमी-विभक्तौ अधिकरण-रूपं किम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) बालके [Saptami Vibhakti / Locative Case]",
              "(B) बालकाय [Chaturthi Vibhakti / Dative]",
              "(C) बालकः [Prathama Vibhakti / Nominative]",
              "(D) बालकम् [Dvitiya Vibhakti / Accusative]"
            ],
            "answer": "(A) बालके [Saptami Vibhakti / Locative Case]",
            "explanation": "Correct! 'बालके' is the locative singular form designating place or time."
          },
          {
            "num": 8,
            "question": "Which of the following forms is used in Sambodhana (Vocative Case) to directly address or call out to Rama?",
            "questionSanskrit": "आह्वानार्थे सम्बोधन-विभक्तौ किं रूपं प्रयुज्यते?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) रामस्य [Shashti Vibhakti / Genitive]",
              "(B) रामेण [Tritiya Vibhakti / Instrumental]",
              "(C) हे राम [Sambodhana / Vocative Case]",
              "(D) रामात् [Panchami Vibhakti / Ablative]"
            ],
            "answer": "(C) हे राम [Sambodhana / Vocative Case]",
            "explanation": "Correct! 'हे राम' represents direct address (Sambodhana)."
          }
        ]
      },
      {
        "sectionTitle": "Section D: विभक्ति-प्रत्यय-समीक्षा (Suffix & Companionship Identification)",
        "sectionTitleSanskrit": "खण्डः \"घ\" · विभक्ति-प्रत्यय-समीक्षा",
        "instructions": "Determine the grammatical case and functional usage in context:",
        "totalMarks": 6,
        "questions": [
          {
            "num": 9,
            "question": "In the phrase 'रामेण सह' (with Rama), what is the specific case and grammatical name of the word 'रामेण'?",
            "questionSanskrit": "\"रामेण सह\" इति प्रयोगे \"रामेण\" पदे का विभक्तिः?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) Prathama Vibhakti [Nominative Case]",
              "(B) Chaturthi Vibhakti [Dative Case]",
              "(C) Panchami Vibhakti [Ablative Case]",
              "(D) Tritiya Vibhakti [Instrumental Case]"
            ],
            "answer": "(D) Tritiya Vibhakti [Instrumental Case]",
            "explanation": "Correct! 'रामेण' is in the Tritiya Vibhakti (Instrumental Case) used here to express companionship with 'सह'."
          },
          {
            "num": 10,
            "question": "Which vibhakti and case combination is represented by 'बालकात्' (Balakat)?",
            "questionSanskrit": "\"बालकात्\" पदे का विभक्तिः कश्च भावः?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) Panchami Vibhakti [Ablative Case]",
              "(B) Saptami Vibhakti [Locative Case]",
              "(C) Shashti Vibhakti [Genitive Case]",
              "(D) Tritiya Vibhakti [Instrumental Case]"
            ],
            "answer": "(A) Panchami Vibhakti [Ablative Case]",
            "explanation": "Correct! 'बालकात्' is the singular form for the Panchami Vibhakti (Ablative Case)."
          }
        ]
      }
    ]
  },

  // ==========================================
  // GRAMMAR WORKSHEET 8: विभक्ति-प्रयोगः (PART 2: SENTENCES & KĀRAKA ROLES · 10 QS)
  // ==========================================
  {
    "id": "ws-gram-vibhakti-2",
    "title": "Grammar Worksheet 8: विभक्ति-प्रयोगः (Part 2: Sentences & Kāraka Roles)",
    "titleSanskrit": "संस्कृत-व्याकरण-कार्यपत्रिका ८ · वाक्येषु विभक्ति-कारक-प्रयोगः",
    "category": "grammar",
    "categoryLabel": "Vyākaraṇa / Grammar",
    "grade": "Intermediate · CBSE Class 7-8",
    "totalMarks": 30,
    "timeLimit": "25 Minutes",
    "description": "Analyze sentence roles, identifying Kāraka relations (Subject, Object, Instrument, Recipient, Origin, Location, and Address) in simple Sanskrit sentences.",
    "sections": [
      {
        "sectionTitle": "Section A: कर्ता, कर्म, करण-कारकाणि (Cases 1 to 3 in Sentences)",
        "sectionTitleSanskrit": "खण्डः \"क\" · कर्ता, कर्म, करण-कारकाणि",
        "instructions": "Identify the Subject, Object, or Instrument word in given sentences:",
        "totalMarks": 9,
        "questions": [
          {
            "num": 1,
            "question": "In the sentence \"रामः गच्छति\" (Ramah gacchati - Rama goes), which word represents the Karta (the doer or subject performing the action) in Prathama Vibhakti?",
            "questionSanskrit": "\"रामः गच्छति\" वाक्ये कः शब्दः कर्ता (प्रथमा विभक्तिः) अस्ति?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) गच्छति",
              "(B) रामः",
              "(C) रामम्",
              "(D) रामेण"
            ],
            "answer": "(B) रामः",
            "explanation": "Correct! 'रामः' is the subject (Karta) performing the action of going, taking the nominative singular case."
          },
          {
            "num": 2,
            "question": "Which singular form of the masculine a-ending noun 'बालक' (boy) represents the Karman (direct object receiving the action) in Dvitiya Vibhakti?",
            "questionSanskrit": "अकारान्त-पुंलिङ्ग-\"बालक\"-शब्दस्य द्वितीया-विभक्तौ कर्मपदं किम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) बालकः",
              "(B) बालकेन",
              "(C) बालकम्",
              "(D) बालकाय"
            ],
            "answer": "(C) बालकम्",
            "explanation": "Correct! 'बालकम्' is the singular object form (Dvitiya Vibhakti) indicating the target of an action."
          },
          {
            "num": 3,
            "question": "To express the instrument or means by which an action is done (Karanam) using the masculine noun 'राम', which singular form of the Tritiya Vibhakti should be used?",
            "questionSanskrit": "\"रामेण कृतम्\" - करणे का विभक्तिः प्रयुक्ता?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) रामात्",
              "(B) रामेण",
              "(C) रामस्य",
              "(D) रामे"
            ],
            "answer": "(B) रामेण",
            "explanation": "Correct! 'रामेण' is the correct instrumental singular form showing agency or means, ending with '-ena' (-एण)."
          }
        ]
      },
      {
        "sectionTitle": "Section B: सम्प्रदान, अपादान, सम्बन्ध-रूपाणि (Cases 4 to 6 in Context)",
        "sectionTitleSanskrit": "खण्डः \"ख\" · सम्प्रदान, अपादान, सम्बन्ध-रूपाणि",
        "instructions": "Identify the Dative, Ablative, and Genitive roles in sentences:",
        "totalMarks": 9,
        "questions": [
          {
            "num": 4,
            "question": "Which Chaturthi Vibhakti singular form of the masculine noun 'राम' indicates the recipient or purpose of giving (Sampradana), meaning \"for Rama\" or \"to Rama\"?",
            "questionSanskrit": "\"रामाय नमः / रामाय देहि\" - चतुर्थी-विभक्तौ किं रूपम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) रामात्",
              "(B) रामस्य",
              "(C) रामाय",
              "(D) रामे"
            ],
            "answer": "(C) रामाय",
            "explanation": "Correct! 'रामाय' is the dative case form (Chaturthi Vibhakti) used for recipients, ending in '-aya'."
          },
          {
            "num": 5,
            "question": "When describing separation or movement away from a source (Apadana) using the noun 'राम', which Panchami Vibhakti singular form indicates \"from Rama\"?",
            "questionSanskrit": "अपादाने (पृथग्भावे) \"राम\" शब्दस्य किं रूपम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) रामात्",
              "(B) रामे",
              "(C) रामस्य",
              "(D) रामाय"
            ],
            "answer": "(A) रामात्",
            "explanation": "Correct! 'रामात्' ends with a crisp '-त्' sound, signifying the ablative case denoting origin or separation (\"from\")."
          },
          {
            "num": 6,
            "question": "What does the Shashti Vibhakti (Genitive Case) singular form 'बालकस्य' (Balakasya) signify in a sentence?",
            "questionSanskrit": "\"बालकस्य\" इति षष्ठी-विभक्तौ कः अर्थः?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) Direct address to the boy",
              "(B) Possession or relationship (of the boy / boy's)",
              "(C) Location where the boy is",
              "(D) The recipient given to the boy"
            ],
            "answer": "(B) Possession or relationship (of the boy / boy's)",
            "explanation": "Correct! The genitive case ('बालकस्य') indicates ownership, association, or a relationship like \"of\" or \"'s\"."
          }
        ]
      },
      {
        "sectionTitle": "Section C: अधिकरण, सम्बोधन-रूपाणि (Cases 7 & 8 in Sentences)",
        "sectionTitleSanskrit": "खण्डः \"ग\" · अधिकरण, सम्बोधन-रूपाणि",
        "instructions": "Identify location and direct address forms:",
        "totalMarks": 6,
        "questions": [
          {
            "num": 7,
            "question": "Where an action takes place (in, on, or at) uses the Saptami Vibhakti (Adhikarana). What is the singular Saptami form for the masculine noun 'राम' (Rama)?",
            "questionSanskrit": "अधिकरणे (आधारे) \"राम\" शब्दस्य सप्तमी-रूपं किम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) रामे",
              "(B) रामम्",
              "(C) रामस्य",
              "(D) रामात्"
            ],
            "answer": "(A) रामे",
            "explanation": "Correct! 'रामे' is the locative singular form indicating location (\"in or on Rama\")."
          },
          {
            "num": 8,
            "question": "Which of the following forms represents the Sambodhana (Vocative Case) singular for 'राम', used to call or address him directly?",
            "questionSanskrit": "सम्बोधने (आह्वाने) \"राम\" शब्दस्य किं रूपम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) रामाय",
              "(B) रामस्य",
              "(C) हे राम",
              "(D) रामेण"
            ],
            "answer": "(C) हे राम",
            "explanation": "Correct! 'हे राम' represents direct address (Sambodhana), which is used to call out to someone."
          }
        ]
      },
      {
        "sectionTitle": "Section D: वाक्य-विश्लेषणम् (Sentence Role Pairs & Companionship)",
        "sectionTitleSanskrit": "खण्डः \"घ\" · वाक्य-विश्लेषणम्",
        "instructions": "Analyze dual case roles and companionship expressions:",
        "totalMarks": 6,
        "questions": [
          {
            "num": 9,
            "question": "In the sentence \"बालकः पुस्तकं पठति\" (The boy reads a book), what are the respective grammatical roles and cases of 'बालकः' (Balakah) and 'पुस्तकं' (pustakam)?",
            "questionSanskrit": "\"बालकः पुस्तकं पठति\" वाक्ये कारक-युग्मं किम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) बालकः is Karman (Dvitiya) and पुस्तकं is Karta (Prathama)",
              "(B) बालकः is Karta in Prathama and पुस्तकं is Karman in Dvitiya",
              "(C) Both words are in the Saptami Vibhakti",
              "(D) Both words are in the Panchami Vibhakti"
            ],
            "answer": "(B) बालकः is Karta in Prathama and पुस्तकं is Karman in Dvitiya",
            "explanation": "Correct! 'बालकः' is the subject doer (Karta / Prathama) and 'पुस्तकं' is the object (Karman / Dvitiya)."
          },
          {
            "num": 10,
            "question": "If you want to say \"with the boy\" (expressing companionship/instrumentation using Tritiya Vibhakti) for the masculine noun 'बालक', which form is correct?",
            "questionSanskrit": "\"सह बालक...\" - सहावबोधक-तृतीयायां किं रूपम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) बालकस्य",
              "(B) बालकेन",
              "(C) बालकाय",
              "(D) बालके"
            ],
            "answer": "(B) बालकेन",
            "explanation": "Correct! 'बालकेन' is the correct instrumental singular form (Tritiya Vibhakti) meaning \"by or with the boy\"."
          }
        ]
      }
    ]
  },

  // ==========================================
  // GRAMMAR WORKSHEET 9: विभक्ति-विस्तारः (PART 3: APPLIED NOUNS - गज, वृक्ष, शिष्य · 10 QS)
  // ==========================================
  {
    "id": "ws-gram-vibhakti-3",
    "title": "Grammar Worksheet 9: विभक्ति-विस्तारः (Part 3: Applied Nouns - गज, वृक्ष, शिष्य)",
    "titleSanskrit": "संस्कृत-व्याकरण-कार्यपत्रिका ९ · व्यावहारिक-शब्दाः (गज, वृक्ष, शिष्य)",
    "category": "grammar",
    "categoryLabel": "Vyākaraṇa / Grammar",
    "grade": "Intermediate · CBSE Class 7-8",
    "totalMarks": 30,
    "timeLimit": "25 Minutes",
    "description": "Apply Sanskrit Vibhakti endings to diverse masculine 'a'-stem vocabulary words: गज (elephant), वृक्ष (tree), and शिष्य (student).",
    "sections": [
      {
        "sectionTitle": "Section A: गज, वृक्ष-शब्दयोः कर्ता कर्म च (Subject & Object Forms)",
        "sectionTitleSanskrit": "खण्डः \"क\" · गज, वृक्ष-शब्दयोः कर्ता कर्म च",
        "instructions": "Identify Prathama and Dvitiya forms for गज and वृक्ष:",
        "totalMarks": 6,
        "questions": [
          {
            "num": 1,
            "question": "In the simple sentence \"गजः चलति\" (The elephant walks), which form acts as the subject (Karta) performing the action?",
            "questionSanskrit": "\"गजः चलति\" वाक्ये कर्ता कः?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) गजम् [द्वितीया विभक्ति / Accusative Case]",
              "(B) गजः [प्रथमा विभक्ति / Nominative Case]",
              "(C) गजेण [तृतीया विभक्ति / Instrumental Case]",
              "(D) गजाय [चतुर्थी विभक्ति / Dative Case]"
            ],
            "answer": "(B) गजः [प्रथमा विभक्ति / Nominative Case]",
            "explanation": "Correct! 'गजः' is the nominative singular subject doing the action of walking."
          },
          {
            "num": 2,
            "question": "In the sentence \"बालकः वृक्षम् पश्यति\" (The boy sees the tree), which word represents the direct object receiving the action of seeing?",
            "questionSanskrit": "\"बालकः वृक्षम् पश्यति\" वाक्ये कर्म किं पदम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) वृक्षः [प्रथमा विभक्ति / Nominative Case]",
              "(B) वृक्षे [सप्तमी विभक्ति / Locative Case]",
              "(C) वृक्षम् [द्वितीया विभक्ति / Accusative Case]",
              "(D) वृक्षात् [पञ्चमी विभक्ति / Ablative Case]"
            ],
            "answer": "(C) वृक्षम् [द्वितीया विभक्ति / Accusative Case]",
            "explanation": "Correct! 'वृक्षम्' is the objective case form (Dvitiya Vibhakti) ending with '-m' (म्)."
          }
        ]
      },
      {
        "sectionTitle": "Section B: शिष्य, गज-शब्दयोः तृतीया चतुर्थी च (Instrument & Dative Forms)",
        "sectionTitleSanskrit": "खण्डः \"ख\" · शिष्य, गज-शब्दयोः तृतीया चतुर्थी च",
        "instructions": "Identify Tritiya and Chaturthi forms for शिष्य and गज:",
        "totalMarks": 6,
        "questions": [
          {
            "num": 3,
            "question": "When expressing an action performed by or with a student, which singular form of 'शिष्य' belongs to the [तृतीया विभक्ति / Instrumental Case]?",
            "questionSanskrit": "छात्रेण / शिष्येण सह करणे का विभक्तिः?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) शिष्येन [तृतीया विभक्ति / Instrumental Case]",
              "(B) शिष्यस्य [षष्ठी विभक्ति / Genitive Case]",
              "(C) शिष्ये [सप्तमी विभक्ति / Locative Case]",
              "(D) शिष्यम् [द्वितीया विभक्ति / Accusative Case]"
            ],
            "answer": "(A) शिष्येन [तृतीया विभक्ति / Instrumental Case]",
            "explanation": "Correct! 'शिष्येन' is the instrumental singular form indicating the agent or instrument (\"by the student\")."
          },
          {
            "num": 4,
            "question": "If you are giving grass to an elephant, which form of 'गज' correctly indicates the recipient (Sampradana) in the [चतुर्थी विभक्ति / Dative Case]?",
            "questionSanskrit": "गजाय तृणं ददाति - सम्प्रदाने किं रूपम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) गजात् [पञ्चमी विभक्ति / Ablative Case]",
              "(B) गजस्य [षष्ठी विभक्ति / Genitive Case]",
              "(C) गजे [सप्तमी विभक्ति / Locative Case]",
              "(D) गजाय [चतुर्थी विभक्ति / Dative Case]"
            ],
            "answer": "(D) गजाय [चतुर्थी विभक्ति / Dative Case]",
            "explanation": "Correct! 'गजाय' is the dative case form ending in '-aya' (-आय), used when giving or offering to someone."
          }
        ]
      },
      {
        "sectionTitle": "Section C: वृक्ष, शिष्य-शब्दयोः पञ्चमी षष्ठी सप्तमी च (Ablative, Genitive, Locative)",
        "sectionTitleSanskrit": "खण्डः \"ग\" · वृक्ष, शिष्य-शब्दयोः पञ्चमी, षष्ठी, सप्तमी च",
        "instructions": "Determine Panchami, Shashti, and Saptami cases for वृक्ष and शिष्य:",
        "totalMarks": 9,
        "questions": [
          {
            "num": 5,
            "question": "In the context of a leaf falling from a tree (\"वृक्षात् पर्णम् पतति\"), which form expresses separation using the [पञ्चमी विभक्ति / Ablative Case]?",
            "questionSanskrit": "\"वृक्षात् पर्णं पतति\" वाक्ये अपादानं किम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) वृक्षे [सप्तमी विभक्ति / Locative Case]",
              "(B) वृक्षात् [पञ्चमी विभक्ति / Ablative Case]",
              "(C) वृक्षस्य [षष्ठी विभक्ति / Genitive Case]",
              "(D) वृक्षम् [द्वितीया विभक्ति / Accusative Case]"
            ],
            "answer": "(B) वृक्षात् [पञ्चमी विभक्ति / Ablative Case]",
            "explanation": "Correct! 'वृक्षात्' is the ablative singular form denoting a starting point of separation (\"from the tree\")."
          },
          {
            "num": 6,
            "question": "To express the student's book (\"the book of the student\"), which singular form of 'शिष्य' correctly shows possession in the [षष्ठी विभक्ति / Genitive Case]?",
            "questionSanskrit": "शिष्यस्य पुस्तकम् - सम्बन्धे का विभक्तिः?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) शिष्येण [तृतीया विभक्ति / Instrumental Case]",
              "(B) शिष्याय [चतुर्थी विभक्ति / Dative Case]",
              "(C) शिष्यस्य [षष्ठी विभक्ति / Genitive Case]",
              "(D) शिष्यः [प्रथमा विभक्ति / Nominative Case]"
            ],
            "answer": "(C) शिष्यस्य [षष्ठी विभक्ति / Genitive Case]",
            "explanation": "Correct! 'शिष्यस्य' is the genitive form indicating ownership or relationship (\"of the student\")."
          },
          {
            "num": 7,
            "question": "If a bird is sitting on a tree (\"वृक्षे खगः तिष्ठति\"), which word form denotes the location or base of the action in the [सप्तमी विभक्ति / Locative Case]?",
            "questionSanskrit": "\"वृक्षे खगः तिष्ठति\" वाक्ये अधिकरणं किम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) वृक्षे [सप्तमी विभक्ति / Locative Case]",
              "(B) वृक्षात् [पञ्चमी विभक्ति / Ablative Case]",
              "(C) वृक्षस्य [षष्ठी विभक्ति / Genitive Case]",
              "(D) वृक्षम् [द्वितीया विभक्ति / Accusative Case]"
            ],
            "answer": "(A) वृक्षे [सप्तमी विभक्ति / Locative Case]",
            "explanation": "Correct! 'वृक्षे' is the locative singular form designating place or location (\"on/in the tree\")."
          }
        ]
      },
      {
        "sectionTitle": "Section D: सम्बोधनम् सह-प्रयोगः च (Vocative, Companionship & Applied Roles)",
        "sectionTitleSanskrit": "खण्डः \"घ\" · सम्बोधनम्, सह-प्रयोगः, कर्म च",
        "instructions": "Select the correct form for direct address, companionship, and observation:",
        "totalMarks": 9,
        "questions": [
          {
            "num": 8,
            "question": "When you want to call out or address a student directly (\"O student!\"), which form represents the [संबोधनम् / Vocative Case]?",
            "questionSanskrit": "शिष्यम् आह्वातुं सम्बोधने किं पदम्?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) शिष्यः [प्रथमा विभक्ति / Nominative Case]",
              "(B) शिष्यम् [द्वितीया विभक्ति / Accusative Case]",
              "(C) शिष्याय [चतुर्थी विभक्ति / Dative Case]",
              "(D) हे शिष्य [संबोधनम् / Vocative Case]"
            ],
            "answer": "(D) हे शिष्य [संबोधनम् / Vocative Case]",
            "explanation": "Correct! 'हे शिष्य' is used for addressing or calling someone directly (Sambodhana)."
          },
          {
            "num": 9,
            "question": "In the phrase \"शिष्येन सह गच्छति\" (goes along with the student), the word 'शिष्येन' is used for companionship requiring the [तृतीया विभक्ति / Instrumental Case]. Which option is it?",
            "questionSanskrit": "\"शिष्येन सह गच्छति\" वाक्ये \"शिष्येन\" पदे का विभक्तिः?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) शिष्यात् [पञ्चमी विभक्ति / Ablative Case]",
              "(B) शिष्येन [तृतीया विभक्ति / Instrumental Case]",
              "(C) शिष्ये [सप्तमी विभक्ति / Locative Case]",
              "(D) शिष्यस्य [षष्ठी विभक्ति / Genitive Case]"
            ],
            "answer": "(B) शिष्येन [तृतीया विभक्ति / Instrumental Case]",
            "explanation": "Correct! 'शिष्येन' is the instrumental form used alongside words like 'सह' (with)."
          },
          {
            "num": 10,
            "question": "In the context of looking at or observing an elephant (\"गजम् पश्यति\"), which word form represents the object in the [द्वितीया विभक्ति / Accusative Case]?",
            "questionSanskrit": "\"गजम् पश्यति\" वाक्ये कर्मपदे का विभक्तिः?",
            "marks": 3,
            "type": "mcq",
            "options": [
              "(A) गजः [प्रथमा विभक्ति / Nominative Case]",
              "(B) गजाय [चतुर्थी विभक्ति / Dative Case]",
              "(C) गजम् [द्वितीया विभक्ति / Accusative Case]",
              "(D) गजे [सप्तमी विभक्ति / Locative Case]"
            ],
            "answer": "(C) गजम् [द्वितीया विभक्ति / Accusative Case]",
            "explanation": "Correct! 'गजम्' functions as the direct object of the verb 'pashyati' (sees), taking the accusative singular case."
          }
        ]
      }
    ]
  },

  // ==========================================
  // GRADE 8: सरस्वतीप्रार्थना (FIRST PRAYER · PAGE 16)
  // ==========================================
  {
    id: 'ws-grade8-prarthana',
    title: 'Grade 8 Worksheet 1: सरस्वतीप्रार्थना (First Prayer · Page 16)',
    titleSanskrit: 'अष्टमकक्षा-कार्यपत्रिका १ · सरस्वतीप्रार्थना (मङ्गलाचरणम्)',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit (कक्षा-८)',
    grade: 'CBSE Class 8 (रुचिरा-३)',
    totalMarks: 25,
    timeLimit: '30 Minutes',
    description: 'Comprehensive assignment worksheet for Grade 8 introductory prayer: Shloka comprehension, word-by-word meanings, fill in the blanks, opposite words, and matching attributes.',
    sections: [
      {
        sectionTitle: 'Section A: रिक्तस्थानानि पूरयत (Fill in the Blanks based on Text)',
        sectionTitleSanskrit: 'खण्डः "क" · रिक्तस्थानपूर्तिः',
        instructions: 'Complete the shloka lines with the precise word from the sacred text:',
        totalMarks: 6,
        questions: [
          {
            num: 1,
            question: 'नादब्रह्ममयि जय वागीश्वरि ____________ ते गच्छामः ।',
            questionSanskrit: 'नादब्रह्ममयि जय वागीश्वरि ____________ ते गच्छामः ।',
            marks: 2,
            type: 'fill',
            options: ['(A) शरणं', '(B) चरणं', '(C) नमनं', '(D) सदनं'],
            answer: 'शरणं (Śaraṇam)',
            explanation: 'The full line is "नादब्रह्ममयि जय वागीश्वरि शरणं ते गच्छामः ॥" meaning we go to your shelter/refuge.',
          },
          {
            num: 2,
            question: 'आसीना भव ____________ कुन्दतुहिनशशिधवले ।',
            questionSanskrit: 'आसीना भव ____________ कुन्दतुहिनशशिधवले ।',
            marks: 2,
            type: 'fill',
            options: ['(A) मानसहंसे', '(B) पद्मासने', '(C) श्वेतहंसे', '(D) गगने'],
            answer: 'मानसहंसे (Mānasahaṁse)',
            explanation: 'The line is "आसीना भव मानसहंसे कुन्दतुहिनशशिधवले ॥" meaning be seated on the swan of the mind.',
          },
          {
            num: 3,
            question: 'मतिरास्तां नो तव पदकमले अयि ____________ ॥',
            questionSanskrit: 'मतिरास्तां नो तव पदकमले अयि ____________ ॥',
            marks: 2,
            type: 'fill',
            options: ['(A) कुण्ठाविषहारिणि', '(B) वीणापुस्तकधारिणि', '(C) सुरभारति', '(D) वागीश्वरि'],
            answer: 'कुण्ठाविषहारिणि (Kuṇṭhāviṣahāriṇi)',
            explanation: 'The line is "मतिरास्तां नो तव पदकमले अयि कुण्ठाविषहारिणि ॥" meaning O remover of the poison of dullness.',
          },
        ],
      },
      {
        sectionTitle: 'Section B: विपरीतार्थकपदानि लिखत (Contextual Antonyms / Opposite Words)',
        sectionTitleSanskrit: 'खण्डः "ख" · विपरीतार्थकपदानि',
        instructions: 'Write the exact contextual opposite words as per the textbook assignment:',
        totalMarks: 6,
        questions: [
          {
            num: 4,
            question: 'Write the opposite word for: जडता (Dullness / Ignorance)',
            questionSanskrit: '"जडता" इत्यस्य विपरीतार्थकं पदं किम्?',
            marks: 2,
            type: 'short_ans',
            answer: 'बुद्धिः / ज्ञानम् (Intellect / Knowledge)',
            explanation: 'जडता (mental inertia / dullness) is countered by बुद्धिः (intellect) and ज्ञानम् (illumined knowledge).',
          },
          {
            num: 5,
            question: 'Write the opposite word for: हर (Remove / Destroy)',
            questionSanskrit: '"हर" इत्यस्य विपरीतार्थकं पदं किम्?',
            marks: 2,
            type: 'short_ans',
            answer: 'कुरु (Create / Bring about / Do)',
            explanation: 'हर means to destroy or take away; कुरु means to perform, cultivate, or bring about.',
          },
          {
            num: 6,
            question: 'Write the opposite word for: विमल (Pure / Spotless)',
            questionSanskrit: '"विमल" इत्यस्य विपरीतार्थकं पदं किम्?',
            marks: 2,
            type: 'short_ans',
            answer: 'मलिन (Impure / Stained)',
            explanation: 'विमल (विगतः मलः यस्मात् सः) is pure; its direct opposite is मलिन (impure or tarnished).',
          },
        ],
      },
      {
        sectionTitle: 'Section C: उचितं मेलनम् कुरुत (Match Text Elements to Descriptive Qualities)',
        sectionTitleSanskrit: 'खण्डः "ग" · उचित-मेलनम्',
        instructions: 'Match the epithets of Goddess Saraswati in Column A with their descriptive attributes in Column B:',
        totalMarks: 6,
        questions: [
          {
            num: 7,
            question: '१. सुरभारति (Goddess of Speech)',
            questionSanskrit: '१. सुरभारति',
            marks: 2,
            type: 'matching',
            options: ['(क) वीणापुस्तकधारिणि', '(ख) भगवति', '(ग) कुन्दतुहिनशशि'],
            answer: '(ख) भगवति (Divine Mother / Goddess)',
            explanation: 'In the hymn, सुरभारति is hailed directly with हे भगवति ("जय जय हे भगवति सुरभारति").',
          },
          {
            num: 8,
            question: '२. धवला (Radiant Pure White)',
            questionSanskrit: '२. धवला',
            marks: 2,
            type: 'matching',
            options: ['(क) वीणापुस्तकधारिणि', '(ख) भगवति', '(ग) कुन्दतुहिनशशि'],
            answer: '(ग) कुन्दतुहिनशशि (White as jasmine, snow, and moon)',
            explanation: 'धवला matches with कुन्दतुहिनशशि as in "कुन्दतुहिनशशिधवले".',
          },
          {
            num: 9,
            question: '३. ललितकलामयि (Embodiment of Fine Arts)',
            questionSanskrit: '३. ललितकलामयि',
            marks: 2,
            type: 'matching',
            options: ['(क) वीणापुस्तकधारिणि', '(ख) भगवति', '(ग) कुन्दतुहिनशशि'],
            answer: '(क) वीणापुस्तकधारिणि (Holding the musical lute and book)',
            explanation: 'The embodiment of fine arts (ललितकलामयि) is celebrated as the holder of the veena and book (वीणापुस्तकधारिणि).',
          },
        ],
      },
      {
        sectionTitle: 'Section D: श्लोकार्थः भावानुवादः च (Verse Comprehension & Word Analysis)',
        sectionTitleSanskrit: 'खण्डः "घ" · श्लोकार्थ-बोधः',
        instructions: 'Explain the deeper spiritual and linguistic significance of the prayer:',
        totalMarks: 7,
        questions: [
          {
            num: 10,
            question: 'Explain the meaning of "नवरसमधुरा कवितामुखरा स्मितरुचिरुचिराभरणा" in your own words.',
            questionSanskrit: '"नवरसमधुरा कवितामुखरा" इत्यस्य भावं स्पष्टीकुरुत।',
            marks: 4,
            type: 'short_ans',
            answer: 'Goddess Saraswati is melodious with the nine classical poetic sentiments (Śṛṅgāra, Vīra, Karuṇa, Adbhuta, Hāsya, Bhayānaka, Bībhatsa, Raudra, Śānta). She is eloquently expressed through beautiful poetry, and Her divine smile is Her greatest glowing ornament.',
            explanation: 'This verse highlights Goddess Saraswati as the patroness of literature, aesthetics, and poetic expression.',
          },
          {
            num: 11,
            question: 'Which sacred symbols does Goddess Saraswati hold in Her hands as described in Verse 4 ("वीणापुस्तकधारिणि")?',
            questionSanskrit: 'सरस्वती स्वहस्ते किं धारयति?',
            marks: 3,
            type: 'short_ans',
            answer: 'वीणा (the musical lute representing fine arts, melody, and harmony) and पुस्तकम् (the sacred book / scripture representing intellect, sciences, and literature).',
            explanation: "'वीणापुस्तकधारिणि' indicates that She presides over both the auditory/fine arts (Veena) and intellectual sciences (Pustaka).",
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 WORKSHEET 1: Chapter 1 Verse Comprehension & Textual Mastery
  // ==========================================
  {
    id: 'ws-grade8-ws1',
    title: 'Worksheet 1: Chapter 1 Verse Comprehension & Textual Mastery',
    titleSanskrit: 'कार्यपत्रिका १: श्लोकावबोधनम् मन्त्राभ्यासः च — संगच्छध्वं संवदध्वम्',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '45 Mins',
    description: 'Mastery over Rigvedic unity mantras (10.191.2–4): extract-based questions, word-by-word grammatical identification, mantra slot fillers, and contextual synonyms matching.',
    sections: [
      {
        sectionTitle: 'Section A: Extract-Based Questions (पठित-अवबोधनम्)',
        sectionTitleSanskrit: 'खण्डः "क" · पठित-अवबोधनम्',
        instructions: 'Read the Rigvedic mantra carefully and answer the questions that follow:\n\n"संगच्छध्वं संवदध्वं सं वो मनांसि जानताम् ।\nदेवा भागं यथा पूर्वे संजानाना उपासते ॥ १ ॥"',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'देवाः कस्मिन् भावेन यज्ञीयं भागं स्वीकृतवन्तः? (In what spirit did the ancient gods accept their sacrificial share?)',
            questionSanskrit: 'देवाः कस्मिन् भावेन यज्ञीयं भागं स्वीकृतवन्तः?',
            marks: 1,
            type: 'short_ans',
            answer: 'संजानानाः (ऐक्यभावेन / सौहार्देन)',
            explanation: 'यथा मन्त्रे उक्तम् — "देवा भागं यथा पूर्वे संजानाना उपासते", अर्थात् देवाः परस्परं समानज्ञानयुक्ताः ऐक्यभावेन यज्ञभागं स्वीकृतवन्तः।',
          },
          {
            num: 2,
            question: 'केषां मनांसि परस्परं समानं भवन्तु? (Whose minds should be united in harmony?)',
            questionSanskrit: 'केषां मनांसि परस्परं समानं भवन्तु?',
            marks: 1,
            type: 'short_ans',
            answer: 'वः (मानवानाम् / युष्माकम्)',
            explanation: "मन्त्रे 'सं वो मनांसि जानताम्' इति उक्तम्। 'वः' (युष्माकम्) मानवानां मनांसि परस्परं सामञ्जस्ययुक्तानि भवन्तु।",
          },
          {
            num: 3,
            question: "'संवदध्वम्' इति पदस्य पाठानुसारं कः अभिप्रायः अस्ति? (What is the textbook meaning of 'Samvadadhvam'?)",
            questionSanskrit: "'संवदध्वम्' इति पदस्य पाठानुसारं कः अभिप्रायः अस्ति?",
            marks: 2,
            type: 'short_ans',
            answer: "'संवदध्वम्' इति पदस्य अभिप्रायः अस्ति यत् सर्वे मानवाः परस्परं सम्यक् विचारविनिमयं कुर्वन्तः एकस्वरेण वदेयुः।",
            explanation: 'संवदध्वम् = परस्परं वैमनस्यं विहाय ऐक्यभावेन सम्भाषणं विचारविनिमयं च कुरुत।',
          },
          {
            num: 4,
            question: 'प्राचीनकाले देवाः किं कुर्वन्ति स्म? (What did the gods do in ancient times?)',
            questionSanskrit: 'प्राचीनकाले देवाः किं कुर्वन्ति स्म?',
            marks: 2,
            type: 'short_ans',
            answer: 'प्राचीनकाले देवाः परस्परं संजानानाः (समानज्ञानेन ऐक्यभावेन च) यज्ञीयं भागम् उपासते (स्वीकुर्वन्ति) स्म।',
            explanation: 'यथा पूर्वे देवाः विरोधं विहाय संजानानाः स्वभागं स्वीकृतवन्तः, तथैव मानवाः अपि समाजाय ऐक्यभावेन कुर्युः।',
          },
          {
            num: 5,
            question: "'मनांसि' इति पदस्य किं विशेषणपदं मन्त्रे प्रयुक्तम्? (Which modifying/adverbial word is used for 'manamsi' in the mantra?)",
            questionSanskrit: "'मनांसि' इति पदस्य किं विशेषणपदं मन्त्रे प्रयुक्तम्?",
            marks: 1,
            type: 'mcq',
            options: ['(क) वो', '(ख) सम्', '(ग) जानताम्', '(घ) भागम्'],
            answer: '(ख) सम्',
            explanation: "मन्त्रे 'सं वो मनांसि जानताम्' इत्यत्र 'सम्' (सम्यक् / समानरूपेण) पदं मनसां सामञ्जस्यं विशेषयति।",
          },
          {
            num: 6,
            question: "'उपासते' इति क्रियापदस्य कः कर्तृपदः (Subject) अस्ति? (What is the grammatical subject of 'upasate'?)",
            questionSanskrit: "'उपासते' इति क्रियापदस्य कः कर्तृपदः अस्ति?",
            marks: 1,
            type: 'mcq',
            options: ['(क) पूर्वे', '(ख) देवाः', '(ग) भागं', '(घ) यथा'],
            answer: '(ख) देवाः',
            explanation: "'देवा भागं यथा पूर्वे संजानाना उपासते' — अस्मिन् वाक्ये 'देवाः' (प्रथमा बहुवचनम्) कर्तृपदं तथा 'उपासते' क्रियापदम्।",
          },
          {
            num: 7,
            question: "मन्त्रे 'युष्माकम्' इत्यर्थे किं वैकल्पिकं पदं प्रयुक्तम्? (Which alternative pronoun represents 'yushmakam'?)",
            questionSanskrit: "मन्त्रे 'युष्माकम्' इत्यर्थे किं वैकल्पिकं पदं प्रयुक्तम्?",
            marks: 1,
            type: 'mcq',
            options: ['(क) वो (वः)', '(ख) सं', '(ग) जानताम्', '(घ) पूर्वे'],
            answer: '(क) वो (वः)',
            explanation: "युष्मद्-शब्दस्य षष्ठी-बहुवचने 'युष्माकम्' इत्यस्य स्थाने वैकल्पिकं संक्षिप्तं रूपं 'वः' (सन्धावपि 'वो') प्रयुज्यते।",
          },
          {
            num: 8,
            question: "'गच्छत' इति पदस्य समानार्थकं पदं मन्त्रात् चित्वा लिखत: (Synonym of 'gacchata' from the mantra)",
            questionSanskrit: "'गच्छत' इति पदस्य समानार्थकं पदं मन्त्रात् चित्वा लिखत:",
            marks: 1,
            type: 'mcq',
            options: ['(क) संवदध्वम्', '(ख) संगच्छध्वम्', '(ग) जानताम्', '(घ) उपासते'],
            answer: '(ख) संगच्छध्वम्',
            explanation: "'संगच्छध्वम्' (सम् + गम् + लोट्) इत्यस्य अर्थः 'मिलित्वा अग्रे गच्छत / चलत' इति भवति।",
          },
        ],
      },
      {
        sectionTitle: 'Section B: Textual Application & Fillers (पाठाधारित-प्रयोगः)',
        sectionTitleSanskrit: 'खण्डः "ख" · पाठाधारित-प्रयोगः',
        instructions: 'Complete the missing mantra slots and match terms with contextual meanings:',
        totalMarks: 10,
        questions: [
          {
            num: 9,
            question: 'श्लोक-पूरणम् (Complete the missing mantra slots using the option-box [ समितिः / हविषा / मनः / जुहोमि / समानं ]):\n\n"समानो मन्त्रः (१) ______________ समानी समानं (२) ______________ सह चित्तमेषाम् ।\nसमानं मन्त्रमभिमन्त्रये वः समानेन वो (३) ______________ (४) ______________ ॥"',
            questionSanskrit: 'श्लोक-पूरणम् (उचितपदैः रिक्तस्थानानि पूरयत):',
            marks: 5,
            type: 'fill',
            options: ['(१) समितिः', '(२) मनः', '(३) हविषा', '(४) जुहोमि'],
            answer: '(१) समितिः, (२) मनः, (३) हविषा, (४) जुहोमि',
            explanation: 'ऋग्वेदस्य द्वितीयः मन्त्रः: "समानो मन्त्रः समितिः समानी समानं मनः सह चित्तमेषाम् । समानं मन्त्रमभिमन्त्रये वः समानेन वो हविषा जुहोमि ॥"',
          },
          {
            num: 10,
            question: 'परस्परं मेलनम् (Match the text units with their internal contextual synonyms):\n(क) आकूतिः ➔ ?\n(ख) वसूनि ➔ ?\n(ग) मनः ➔ ?\n(घ) उपासते ➔ ?\n(ङ) विश्वानि ➔ ?',
            questionSanskrit: 'परस्परं मेलनम् (समानार्थक-पदानि योजयत):',
            marks: 5,
            type: 'matching',
            options: ['(क) आकूतिः ➔ (३) सङ्कल्पः', '(ख) वसूनि ➔ (५) धनानि', '(ग) मनः ➔ (२) चित्तम्', '(घ) उपासते ➔ (१) सेवन्ते', '(ङ) विश्वानि ➔ (४) समस्तानि'],
            answer: '(क)-(३) सङ्कल्पः, (ख)-(५) धनानि, (ग)-(२) चित्तम्, (घ)-(१) सेवन्ते, (ङ)-(४) समस्तानि',
            explanation: 'आकूतिः = सङ्कल्पः (Resolve), वसूनि = धनानि (Wealth), मनः = चित्तम् (Mind), उपासते = सेवन्ते (Worship/Serve), विश्वानि = समस्तानि (All/Entire).',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 WORKSHEET 2: Loṭ-Lakāra (Imperative Mood) Syntax Transformations
  // ==========================================
  {
    id: 'ws-grade8-ws2',
    title: 'Worksheet 2: Loṭ-Lakāra (Imperative Mood) Syntax Transformations',
    titleSanskrit: 'कार्यपत्रिका २: लोट्-लकारः आज्ञार्थे वाक्य-परिवर्तनम् च',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '40 Mins',
    description: 'Chapter 1 Grammatical Foundations (Ājñārthe / Āśīrvāde): Single-choice sentence upgrades from Laṭ to Loṭ Lakāra, structural subject-verb agreement blanks, and Atmanepada prefix conversions.',
    sections: [
      {
        sectionTitle: 'Section A: Single-Choice Sentence Upgrades (वस्तुनिष्ठ-वाक्य-परिवर्तनम्)',
        sectionTitleSanskrit: 'खण्डः "क" · वस्तुनिष्ठ-वाक्य-परिवर्तनम्',
        instructions: 'Choose the correct transformed sentence matching the Imperative Mood (Loṭ-Lakāra):',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'परिवर्तयत – "बालकाः क्रीडाङ्गणे धावन्ति।" (Change to Loṭ-Lakāra)',
            questionSanskrit: 'परिवर्तयत – "बालकाः क्रीडाङ्गणे धावन्ति।"',
            marks: 2,
            type: 'mcq',
            options: ['(क) बालकाः क्रीडाङ्गणे धावतु।', '(ख) बालकाः क्रीडाङ्गणे धावन्तु।', '(ग) बालकाः क्रीडाङ्गणे अधावन्।', '(घ) बालकाः क्रीडाङ्गणे धाविष्यन्ति।'],
            answer: '(ख) बालकाः क्रीडाङ्गणे धावन्तु।',
            explanation: "'बालकाः' प्रथमा बहुवचनम् अस्ति, अतः लोट्-लकारे प्रथमपुरुष-बहुवचने 'धावन्तु' (तु, ताम्, अन्तु) भवति।",
          },
          {
            num: 2,
            question: 'परिवर्तयत – "युवां सदा सत्यं वदथः।" (Change to Loṭ-Lakāra)',
            questionSanskrit: 'परिवर्तयत – "युवां सदा सत्यं वदथः।"',
            marks: 2,
            type: 'mcq',
            options: ['(क) युवां सदा सत्यं वदतम्।', '(ख) युवां सदा सत्यं वदतु।', '(ग) युवां सदा सत्यं वदत।', '(घ) युवां सदा सत्यं वदाम।'],
            answer: '(क) युवां सदा सत्यं वदतम्।',
            explanation: "'युवाम्' मध्यमपुरुष-द्विवचनम् अस्ति, अतः लोट्-लकारे मध्यमपुरुष-द्विवचने प्रत्ययः '-तम्' (अ, तम्, त) भवति ➔ 'वदतम्'।",
          },
          {
            num: 3,
            question: 'परिवर्तयत – "यूयं वर्गं प्रविशथ।" (Change to Loṭ-Lakāra)',
            questionSanskrit: 'परिवर्तयत – "यूयं वर्गं प्रविशथ।"',
            marks: 2,
            type: 'mcq',
            options: ['(क) यूयं वर्गं प्रविशन्तु।', '(ख) यूयं वर्गं प्रविशत।', '(ग) यूयं वर्गं प्रविशताम्।', '(घ) यूयं वर्गं प्रविश।'],
            answer: '(ख) यूयं वर्गं प्रविशत।',
            explanation: "'यूयम्' मध्यमपुरुष-बहुवचनम् अस्ति, अतः लोट्-लकारे मध्यमपुरुष-बहुवचने 'प्रविशत' (अ, तम्, त) भवति।",
          },
          {
            num: 4,
            question: 'परिवर्तयत – "वयं वेदमन्त्राणाम् उच्चारणं कुर्मः।" (Change to Loṭ-Lakāra)',
            questionSanskrit: 'परिवर्तयत – "वयं वेदमन्त्राणाम् उच्चारणं कुर्मः।"',
            marks: 2,
            type: 'mcq',
            options: ['(क) वयं वेदमन्त्राणाम् उच्चारणं करवावहै।', '(ख) वयं वेदमन्त्राणाम् उच्चारणं कुर्वन्तु।', '(ग) वयं वेदमन्त्राणाम् उच्चारणं करवाम।', '(घ) वयं वेदमन्त्राणाम् उच्चारणं कुरूत।'],
            answer: '(ग) वयं वेदमन्त्राणाम् उच्चारणं करवाम।',
            explanation: "'वयम्' उत्तमपुरुष-बहुवचनम् अस्ति, अतः कृ धातोः लोट्-लकारे उत्तमपुरुष-बहुवचने 'करवाम' (करवाणि, करवाव, करवाम) भवति।",
          },
          {
            num: 5,
            question: 'परिवर्तयत – "आवां पत्रं लिखावः।" (Change to Loṭ-Lakāra)',
            questionSanskrit: 'परिवर्तयत – "आवां पत्रं लिखावः।"',
            marks: 2,
            type: 'mcq',
            options: ['(क) आवां पत्रं लिखतम्।', '(ख) आवां पत्रं लिखानी।', '(ग) आवां पत्रं लिखाव।', '(घ) आवां पत्रं लिखाम।'],
            answer: '(ग) आवां पत्रं लिखाव।',
            explanation: "'आवाम्' उत्तमपुरुष-द्विवचनम् अस्ति, अतः लोट्-लकारे प्रत्ययः '-आव' (आनि, आव, आम) भवति ➔ 'लिखाव'।",
          },
        ],
      },
      {
        sectionTitle: 'Section B: Structural Conjugation Blanks & Morphology',
        sectionTitleSanskrit: 'खण्डः "ख" · रिक्तस्थान-पूर्तिः प्रकृति-प्रत्यय-विभागः च',
        instructions: 'Fill in the blanks with the correct form of Loṭ-Lakāra and convert to Atmanepada equivalents:',
        totalMarks: 10,
        questions: [
          {
            num: 6,
            question: 'कोष्ठकात् उचितं लोट्-लकारपदं चित्वा रिक्तस्थानानि पूरयत (Fill in the blanks):\n१. हे छात्राः! यूयम् आसने ______________। (उपविशत / उपविशन्तु)\n२. सः गृहं ______________। (गच्छतु / गच्छत)\n३. त्वं सदा मातापितरौ ______________। (नम / नमतु)\n४. वयं मिलित्वा राष्ट्रं ______________। (रक्षाम / रक्षतु)\n५. तौ क्रीडोपकरणानि ______________। (आनयताम् / आनयन्तु)',
            questionSanskrit: 'उचितं लोट्-लकारपदं चित्वा रिक्तस्थानानि पूरयत:',
            marks: 5,
            type: 'fill',
            options: ['१. उपविशत', '२. गच्छतु', '३. नम', '४. रक्षाम', '५. आनयताम्'],
            answer: '१. उपविशत, २. गच्छतु, ३. नम, ४. रक्षाम, ५. आनयताम्',
            explanation: 'Subject agreement: यूयम् ➔ उपविशत; सः ➔ गच्छतु; त्वम् ➔ नम; वयम् ➔ रक्षाम; तौ ➔ आनयताम्।',
          },
          {
            num: 7,
            question: 'प्रकृति-प्रत्यय विभागं कुरुत (Convert standard Parasmaipada Present verbs to correct Atmanepada prefix equivalents from Chapter 1, Page 6):\n१. सम् + गच्छति (लट्-लकारः) ➔ ________________________\n२. सम् + गच्छध्वम् (लोट्-लकारः, मध्यमपुरुष-बहुवचनम्) ➔ ________________________\n३. सम् + गच्छताम् (लोट्-लकारः, प्रथमपुरुष-एकवचनम्) ➔ ________________________',
            questionSanskrit: 'प्रकृति-प्रत्यय-विभागं कुरुत (आत्मनेपद-परिवर्तनम्):',
            marks: 5,
            type: 'grammar',
            answer: '१. सङ्गच्छते (लट्-लकारः, प्रथमपुरुष-एकवचनम्); २. सम् + गम् + लोट् (आत्मनेपदम्, मध्यमपुरुष-बहुवचनम्); ३. सम् + गम् + लोट् (आत्मनेपदम्, प्रथमपुरुष-एकवचनम्)',
            explanation: 'सम् उपसर्गपूर्वात् गम् धातुः आत्मनेपदी भवति: सङ्गच्छते, सङ्गच्छेते, सङ्गच्छन्ते (लट्); सङ्गच्छताम् (लोट् प्रथमपुरुष एकवचन), सङ्गच्छध्वम् (लोट् मध्यमपुरुष बहुवचन)।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 WORKSHEET 3: Lyap-Pratyaya (Gerund Construction) Framework
  // ==========================================
  {
    id: 'ws-grade8-ws3',
    title: 'Worksheet 3: Lyap-Pratyaya (Gerund Construction) Framework',
    titleSanskrit: 'कार्यपत्रिका ३: ल्यप्-प्रत्ययः पूर्वकालिक-क्रिया वाक्य-संयोजनम् च',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '45 Mins',
    description: 'Chapter 2 Grammar Core (Pūrvakālika Kriyā with Prefixes): Merging separate sentences into single fluent continuous clauses using the Lyap suffix, root isolation, and morphological analysis.',
    sections: [
      {
        sectionTitle: 'Section A: Structural Sentence Synthesis (वाक्य-संयोजनम्)',
        sectionTitleSanskrit: 'खण्डः "क" · ल्यप्-प्रत्ययेन वाक्य-संयोजनम्',
        instructions: 'Merge the following multi-verb sentences into a single continuous clause by updating the primary active verb using the ल्यप् suffix rule (Taught on Page 18-19):',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'भक्तः मन्दिरम् आगच्छति। पूजां करोति। ➔ __________________________________________________________________',
            questionSanskrit: 'भक्तः मन्दिरम् आगच्छति। पूजां करोति।',
            marks: 2,
            type: 'grammar',
            answer: 'भक्तः मन्दिरम् आगत्य पूजां करोति।',
            explanation: 'आ + गम् + ल्यप् = आगत्य (Having arrived at the temple, the devotee performs worship).',
          },
          {
            num: 2,
            question: 'माता भोजनं निर्माति। पुत्राय ददाति। ➔ __________________________________________________________________',
            questionSanskrit: 'माता भोजनं निर्माति। पुत्राय ददाति।',
            marks: 2,
            type: 'grammar',
            answer: 'माता भोजनं निर्माय (निर्मृत्य) पुत्राय ददाति।',
            explanation: 'निर् + मा + ल्यप् = निर्माय (Having prepared the food, mother gives it to her son).',
          },
          {
            num: 3,
            question: 'सुरेशः प्रातः उत्तिष्ठति। देवान् नमति। ➔ __________________________________________________________________',
            questionSanskrit: 'सुरेशः प्रातः उत्तिष्ठति। देवान् नमति।',
            marks: 2,
            type: 'grammar',
            answer: 'सुरेशः प्रातः उत्थाय देवान् नमति।',
            explanation: 'उद् (उत्) + स्था + ल्यप् = उत्थाय (Having woken up in the morning, Suresh bows to deities).',
          },
          {
            num: 4,
            question: 'रमा पुस्तकालयात् पुस्तकं स्वीकरोति। गृहं गच्छति। ➔ __________________________________________________________________',
            questionSanskrit: 'रमा पुस्तकालयात् पुस्तकं स्वीकरोति। गृहं गच्छति।',
            marks: 2,
            type: 'grammar',
            answer: 'रमा पुस्तकालयात् पुस्तकं स्वीकृत्य गृहं गच्छति।',
            explanation: 'स्वी + कृ + ल्यप् = स्वीकृत्य (Having borrowed the book from library, Rama goes home).',
          },
          {
            num: 5,
            question: 'व्याधः वनमध्ये जालं विस्तीर्णं करोति। प्रच्छन्नः भवति। ➔ __________________________________________________________________',
            questionSanskrit: 'व्याधः वनमध्ये जालं विस्तीर्णं करोति। प्रच्छन्नः भवति।',
            marks: 2,
            type: 'grammar',
            answer: 'व्याधः वनमध्ये जालं विस्तीर्य प्रच्छन्नः भवति।',
            explanation: 'वि + स्तॄ + ल्यप् = विस्तीर्य (Having spread the net in the middle of the woods, the hunter conceals himself).',
          },
        ],
      },
      {
        sectionTitle: 'Section B: Root Morphological Extraction (प्रकृति-प्रत्यय-अवबोधनम्)',
        sectionTitleSanskrit: 'खण्डः "ख" · अवयव-विभागः विकल्प-चयनं च',
        instructions: 'Split or combine prefix, root, and suffix elements, and select the correct grammatical option:',
        totalMarks: 10,
        questions: [
          {
            num: 6,
            question: 'अवयव-विभागं कुरुत (Split or combine the structural Prefix + Root + Suffix elements):\n१. आ + नी + ल्यप् ➔ ___________________________\n२. प्र + नम् + ल्यप् ➔ ___________________________\n३. वि + स्मृ + ल्यप् ➔ ___________________________\n४. अव + लोक् + ल्यप् ➔ ___________________________\n५. उत्थाय ➔ ___________ + ___________ + ___________',
            questionSanskrit: 'अवयव-विभागं कुरुत (ल्यप्-रूपाणि):',
            marks: 5,
            type: 'grammar',
            answer: '१. आनीय; २. प्रणम्य; ३. विस्मृत्य; ४. अवलोक्य; ५. उद् + स्था + ल्यप्',
            explanation: 'Prefix + Verb + Lyap: आ + नी + ल्यप् = आनीय; प्र + नम् + ल्यप् = प्रणम्य; वि + स्मृ + ल्यप् = विस्मृत्य; अव + लोक् + ल्यप् = अवलोक्य; उत्थाय = उद् + स्था + ल्यप्।',
          },
          {
            num: 7,
            question: "'विकीर्य' अस्य पदस्य प्रकृति-प्रत्ययः कः अस्ति?",
            questionSanskrit: "'विकीर्य' अस्य पदस्य प्रकृति-प्रत्ययः कः अस्ति?",
            marks: 1.6,
            type: 'mcq',
            options: ['(क) वि + कृ + क्त्वा', '(ख) वि + कॄ + ल्यप्', '(ग) वि + कीर् + ल्यप्'],
            answer: '(ख) वि + कॄ + ल्यप्',
            explanation: "वि उपसर्ग + कॄ (विक्षेपे) धातु + ल्यप् प्रत्यय = विकीर्य (Having scattered).",
          },
          {
            num: 8,
            question: "'निश्चित्य' पदस्य कः अर्थः अस्ति?",
            questionSanskrit: "'निश्चित्य' पदस्य कः अर्थः अस्ति?",
            marks: 1.7,
            type: 'mcq',
            options: ['(क) नियमं कृत्वा', '(ख) निश्चयं कृत्वा', '(ग) चिन्तनं कृत्वा'],
            answer: '(ख) निश्चयं कृत्वा',
            explanation: "निस् + चि + ल्यप् = निश्चित्य, यस्य अर्थः 'निश्चयं कृत्वा / दृढसंकल्पं कृत्वा' (having resolved/decided) भवति।",
          },
          {
            num: 9,
            question: "'विस्मृत्य' इत्यस्य विरुद्धार्थकं रूपं किम?",
            questionSanskrit: "'विस्मृत्य' इत्यस्य विरुद्धार्थकं रूपं किम?",
            marks: 1.7,
            type: 'mcq',
            options: ['(क) स्मृत्वा', '(ख) विस्मरणं कृत्वा', '(ग) आनीय'],
            answer: '(क) स्मृत्वा',
            explanation: "'विस्मृत्य' (having forgotten) इत्यस्य विलोमपदम् अस्ति 'स्मृत्वा' (having remembered).",
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 WORKSHEET 4: Visarga Sandhi Transformation Rules
  // ==========================================
  {
    id: 'ws-grade8-ws4',
    title: 'Worksheet 4: Visarga Sandhi Transformation Rules',
    titleSanskrit: 'कार्यपत्रिका ४: विसर्ग-सन्धिः नियमाः संयोजनानि विच्छेदाः च',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '40 Mins',
    description: 'Phonetics & Sandhi Transition Rules from Chapter 2 (Page 17 Guidelines): Visarga to Shattva (श/ष/स), Utva (ओ), and Avagraha (ऽ) rules for accurate join and split operations.',
    sections: [
      {
        sectionTitle: 'Section A: Joining Sandhi Tasks (सन्धिं कुरुत)',
        sectionTitleSanskrit: 'खण्डः "क" · सन्धिं कुरुत',
        instructions: 'Apply structural phonetic transition rules (e.g., Visarga to Ś/S/O shifts) to join the components cleanly:',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'सन्धिं कुरुत (Join the words using Visarga Sandhi rules):\n१. कः + चित् ➔ ___________________________\n२. प्रतीकारः + चिन्त्यताम् ➔ ___________________________\n३. चकितः + तूष्णीम् ➔ ___________________________\n४. हिरण्यकः + नाम ➔ ___________________________\n५. ततः + हिरण्यकः ➔ ___________________________\n६. व्याधः + निवृत्तः ➔ ___________________________\n७. कुतः + अत्र ➔ ___________________________\n८. हितः + अपि ➔ ___________________________\n९. बालकः + अत्र ➔ ___________________________\n१०. नमः + ते ➔ ___________________________',
            questionSanskrit: 'सन्धिं कुरुत (विसर्गसन्धि-नियमाः):',
            marks: 10,
            type: 'grammar',
            answer: '१. कश्चित्, २. प्रतीकारश्चिन्त्यताम्, ३. चकितस्तूष्णीम्, ४. हिरण्यको नाम, ५. ततो हिरण्यकः, ६. व्याधो निवृत्तः, ७. कुतोऽत्र, ८. हितोऽपि, ९. बालकोऽत्र, १०. नमस्ते',
            explanation: 'Rules: विसर्ग + च/छ ➔ श् (कश्चित्, प्रतीकारश्चिन्त्यताम्); विसर्ग + त/थ ➔ स् (चकितस्तूष्णीम्, नमस्ते); अः + घोषव्यञ्जन (हश्) ➔ ओ (हिरण्यको नाम, ततो हिरण्यकः, व्याधो निवृत्तः); अः + अ ➔ ओऽ (कुतोऽत्र, हितोऽपि, बालकोऽत्र)।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: Disjoining Sandhi Tasks (सन्धि-विच्छेदं कुरुत)',
        sectionTitleSanskrit: 'खण्डः "ख" · सन्धि-विच्छेदम्',
        instructions: 'Deconstruct the compound sandhi statements safely into distinct lexical base parameters:',
        totalMarks: 10,
        questions: [
          {
            num: 2,
            question: 'सन्धिविच्छेदं कुरुत (Deconstruct into original words):\n१. उपायश्चिन्तनीयः ➔ ____________________ + ____________________\n२. व्याधस्तत्र ➔ ____________________ + ____________________\n३. चित्रग्रीवोऽवदत् ➔ ____________________ + ____________________\n४. सोऽस्माकम् ➔ ____________________ + ____________________\n५. नीतिस्तावत् ➔ ____________________ + ____________________\n६. देवदत्तश्छलेन ➔ ____________________ + ____________________',
            questionSanskrit: 'सन्धिविच्छेदं कुरुत:',
            marks: 10,
            type: 'grammar',
            answer: '१. उपायः + चिन्तनीयः; २. व्याधः + तत्र; ३. चित्रग्रीवः + अवदत्; ४. सः + अस्माकम्; ५. नीतिः + तावत्; ६. देवदत्तः + छलेन',
            explanation: 'शकारस्य विसर्गः: उपायश्चिन्तनीयः = उपायः + चिन्तनीयः; सकारस्य विसर्गः: व्याधस्तत्र = व्याधः + तत्र, नीतिस्तावत् = नीतिः + तावत्; ओऽकारस्य विसर्गः: चित्रग्रीवोऽवदत् = चित्रग्रीवः + अवदत्, सोऽस्माकम् = सः + अस्माकम्; श्छलेन = देवदत्तः + छलेन।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 WORKSHEET 5: Question Formulation Matrix (प्रश्न-निर्माणम्)
  // ==========================================
  {
    id: 'ws-grade8-ws5',
    title: 'Worksheet 5: Question Formulation Matrix (प्रश्न-निर्माणम्)',
    titleSanskrit: 'कार्यपत्रिका ५: प्रश्न-निर्माणम् — किम-शब्दस्य रूपप्रयोगाः',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '40 Mins',
    description: 'Chapter 1 Alignment and Kīm-Śabda Structural Substitutions: Formulating grammatically precise interrogative sentences based on case, gender, number, and question particles (कस्मात्, केषु, कीदृशम्).',
    sections: [
      {
        sectionTitle: 'Section A: Structural Replacements (रेखाङ्कित-पद-परिवर्तनम्)',
        sectionTitleSanskrit: 'खण्डः "क" · रेखाङ्कित-पदानि आधृत्य प्रश्न-निर्माणम्',
        instructions: 'Transform the target statement profiles into questions by replacing the underlined terms using matching gender, case, and number forms of the standard Interrogative Pronoun matrix:',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'परमेश्वरः सर्वत्र व्याप्तः अस्ति। ➔ __________________________________________________________________?',
            questionSanskrit: 'परमेश्वरः सर्वत्र व्याप्तः अस्ति।',
            marks: 2,
            type: 'short_ans',
            answer: 'कः सर्वत्र व्याप्तः अस्ति?',
            explanation: "'परमेश्वरः' पुँल्लिङ्ग प्रथमा एकवचनम् अस्ति, अतः 'कः' प्रयुज्यते।",
          },
          {
            num: 2,
            question: 'वयम् ईश्वरं नमामः। ➔ __________________________________________________________________?',
            questionSanskrit: 'वयम् ईश्वरं नमामः।',
            marks: 2,
            type: 'short_ans',
            answer: 'वयम् कम् नमामः?',
            explanation: "'ईश्वरम्' पुँल्लिङ्ग द्वितीया एकवचनम् अस्ति, अतः 'कम्' प्रयुज्यते।",
          },
          {
            num: 3,
            question: 'वयम् ऐक्यभावेन सदा जीवामः। ➔ __________________________________________________________________?',
            questionSanskrit: 'वयम् ऐक्यभावेन सदा जीवामः।',
            marks: 2,
            type: 'short_ans',
            answer: 'वयम् केन भावेन (अथवा कथम्) सदा जीवामः?',
            explanation: "'ऐक्यभावेन' तृतीया विभक्तिः एकवचनम् (रीतिवाचकं वा), अतः 'केन भावेन' अथवा 'कथम्' प्रयुज्यते।",
          },
          {
            num: 4,
            question: 'ईश्वरस्य प्रार्थनया मानवेभ्यः शान्तिः प्राप्यते। ➔ __________________________________________________________________?',
            questionSanskrit: 'ईश्वरस्य प्रार्थनया मानवेभ्यः शान्तिः प्राप्यते।',
            marks: 2,
            type: 'short_ans',
            answer: 'ईश्वरस्य कया मानवेभ्यः शान्तिः प्राप्यते? (अथवा: ईश्वरस्य प्रार्थनया मानवेभ्यः किम् / का प्राप्यते?)',
            explanation: "'प्रार्थनया' स्त्रीलिङ्ग तृतीया एकवचनम् ➔ 'कया'। यदि 'शान्तिः' रेखाङ्किता तर्हि 'का' / 'किम्'।",
          },
          {
            num: 5,
            question: 'अहं समाजाय प्रतिदिनं श्रमं करोमि। ➔ __________________________________________________________________?',
            questionSanskrit: 'अहं समाजाय प्रतिदिनं श्रमं करोमि।',
            marks: 2,
            type: 'short_ans',
            answer: 'अहं कस्मै प्रतिदिनं श्रमं करोमि?',
            explanation: "'समाजाय' पुँल्लिङ्ग चतुर्थी एकवचनम् अस्ति, अतः 'कस्मै' प्रयुज्यते।",
          },
        ],
      },
      {
        sectionTitle: 'Section B: Text Origin Identification (वैदिक-ज्ञान-प्रश्ननिर्माणम्)',
        sectionTitleSanskrit: 'खण्डः "ख" · पाठ्य-तथ्याधारित-प्रश्ननिर्माणम्',
        instructions: 'Formulate questions targeting specific sourced elements from Chapter 1:',
        totalMarks: 10,
        questions: [
          {
            num: 6,
            question: 'अयं पाठः ऋग्वेदात् सङ्कलितः अस्ति। ➔ __________________________________________________________________?',
            questionSanskrit: 'अयं पाठः ऋग्वेदात् सङ्कलितः अस्ति।',
            marks: 2.5,
            type: 'short_ans',
            answer: 'अयं पाठः कस्मात् (अथवा कुतः) सङ्कलितः अस्ति?',
            explanation: "'ऋग्वेदात्' पञ्चमी विभक्तिः एकवचनम् अस्ति, अतः 'कस्मात्' अथवा 'कुतः' प्रयुज्यते।",
          },
          {
            num: 7,
            question: 'वेदस्य अपरं नाम श्रुतिः इति कथ्यते। ➔ __________________________________________________________________?',
            questionSanskrit: 'वेदस्य अपरं नाम श्रुतिः इति कथ्यते।',
            marks: 2.5,
            type: 'short_ans',
            answer: 'वेदस्य अपरं नाम किम् इति कथ्यते?',
            explanation: "'श्रुतिः' संज्ञापदस्य स्थाने सामान्यजिज्ञासायां 'किम्' प्रयुज्यते।",
          },
          {
            num: 8,
            question: 'पवित्राः मन्त्राः वेदेषु प्राप्यन्ते। ➔ __________________________________________________________________?',
            questionSanskrit: 'पवित्राः मन्त्राः वेदेषु प्राप्यन्ते।',
            marks: 2.5,
            type: 'short_ans',
            answer: 'पवित्राः मन्त्राः केषु (अथवा कुत्र) प्राप्यन्ते?',
            explanation: "'वेदेषु' पुँल्लिङ्ग सप्तमी बहुवचनम् अस्ति, अतः 'केषु' अथवा स्थानवाचकम् अव्ययं 'कुत्र' प्रयुज्यते।",
          },
          {
            num: 9,
            question: 'चित्तं सौमनस्यपूर्णम् अस्तु। ➔ __________________________________________________________________?',
            questionSanskrit: 'चित्तं सौमनस्यपूर्णम् अस्तु।',
            marks: 2.5,
            type: 'short_ans',
            answer: 'चित्तं कीदृशम् अस्तु? (अथवा: किम् सौमनस्यपूर्णम् अस्तु?)',
            explanation: "'सौमनस्यपूर्णम्' विशेषणम् अस्ति, अतः 'कीदृशम्' प्रयुज्यते। यदि 'चित्तम्' रेखाङ्कितं तर्हि 'किम्' प्रयुज्यते।",
          },
        ],
      },
    ],
  },


  // ==========================================
  // GRADE 8 CH 2 WORKSHEET 1: Prose Comprehension & Context
  // ==========================================
  {
    id: 'ws-grade8-ch2-ws1',
    title: 'Chapter 2 Worksheet 1: Prose Comprehension & Context (पठित-अवबोधनम्)',
    titleSanskrit: 'द्वितीयः पाठः कार्यपत्रिका १: गद्यांशावबोधनम् — अल्पानामपि वस्तूनां संहतिः',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '45 Mins',
    description: 'Extract-based analysis from Page 12: Godavari tree, Chitragriva, the hunter, chronological sequencing (घटनाक्रमः), and vocabulary fill-in-the-blanks.',
    sections: [
      {
        sectionTitle: 'Section A: Extract-Based Questions (पठित-अवबोधनम्)',
        sectionTitleSanskrit: 'खण्डः "क" · पठित-अवबोधनम्',
        instructions: 'Read the passage below from page 12 carefully and answer the questions:\n\n"अस्ति गोदावरीतीरे एको विशालः शाल्मलीतरुः। तत्र प्रतिदिनं दूरदेशात् पक्षिणः आगत्य निवसन्ति स्म। अथ कदाचित् तत्र कश्चिद् व्याधस्तण्डुलकणान्विकीर्य जालं विस्तीर्य च प्रच्छन्नो भूत्वा स्थितः। तस्मिन्नेव काले चित्रग्रीवनामा कपोतराजः सपरिवारः आकाशमार्गे गच्छति स्म। केचन कपोताः वनमध्ये तण्डुलकणान् अवलोक्य लोभाकृष्टाः अभवन्।"',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'गोदावरीतीरे कः वृक्षः आसीत्? (Which tree was located on the banks of Godavari?)',
            questionSanskrit: 'गोदावरीतीरे कः वृक्षः आसीत्?',
            marks: 1,
            type: 'short_ans',
            answer: 'शाल्मलीतरुः (शाल्मलीवृक्षः)',
            explanation: 'गद्यांशे स्पष्टम् उक्तम् — "अस्ति गोदावरीतीरे एको विशालः शाल्मलीतरुः।"',
          },
          {
            num: 2,
            question: 'कपोतराजस्य नाम किम् आसीत्? (What was the name of the king of doves?)',
            questionSanskrit: 'कपोतराजस्य नाम किम् आसीत्?',
            marks: 1,
            type: 'short_ans',
            answer: 'चित्रग्रीवः',
            explanation: 'कपोतानां राजा चित्रग्रीवः आसीत्।',
          },
          {
            num: 3,
            question: 'व्याधः (शिकारी) वने किं कृतवान्? (What did the hunter do in the forest?)',
            questionSanskrit: 'व्याधः वने किं कृतवान्?',
            marks: 2,
            type: 'short_ans',
            answer: 'व्याधः वने तण्डुलकणान् विकीर्य जालं विस्तीर्य च प्रच्छन्नो भूत्वा अतिष्ठत्।',
            explanation: 'व्याधेन कपोतानां बन्धनार्थं तण्डुलकणाः विकीर्णाः जालं च विस्तीर्णम्।',
          },
          {
            num: 4,
            question: 'कपोताः किमर्थं लोभाकृष्टाः अभवन्? (Why were the doves attracted by greed?)',
            questionSanskrit: 'कपोताः किमर्थं लोभाकृष्टाः अभवन्?',
            marks: 2,
            type: 'short_ans',
            answer: 'कपोताः वनमध्ये भूमौ पतितान् तण्डुलकणान् अवलोक्य लोभाकृष्टाः अभवन्।',
            explanation: 'निर्जने वने तण्डुलकणान् दृष्ट्वा कपोताः खादन-लोभेन आकृष्टाः अभवन्।',
          },
          {
            num: 5,
            question: "'विशालः शाल्मलीतरुः' – अत्र विशेषणपदं किम्?",
            questionSanskrit: "'विशालः शाल्मलीतरुः' – विशेषणपदं किम्?",
            marks: 1,
            type: 'mcq',
            options: ['(क) विशालः', '(ख) शाल्मलीतरुः', '(ग) तरुः', '(घ) गोदावरीतीरे'],
            answer: '(क) विशालः',
            explanation: "'शाल्मलीतरुः' विशेष्यपदम् अस्ति, तस्य गुणं वर्णयन् 'विशालः' विशेषणपदम् अस्ति।",
          },
          {
            num: 6,
            question: "गद्यांशे 'वृक्षः' इत्यर्थे किं पदं प्रयुक्तम्?",
            questionSanskrit: "गद्यांशे 'वृक्षः' इत्यर्थे किं पदं प्रयुक्तम्?",
            marks: 1,
            type: 'mcq',
            options: ['(क) व्याधः', '(ख) तरुः', '(ग) जालम्', '(घ) विस्तीर्य'],
            answer: '(ख) तरुः',
            explanation: "'तरुः' वृक्षस्य पर्यायवाचकं पदम् अस्ति।",
          },
          {
            num: 7,
            question: "'पक्षिणः' इति कर्तृपदस्य क्रियापदं किम्?",
            questionSanskrit: "'पक्षिणः' इति कर्तृपदस्य क्रियापदं किम्?",
            marks: 1,
            type: 'mcq',
            options: ['(क) निवसन्ति स्म', '(ख) आगत्य', '(ग) गच्छति स्म', '(घ) अभवन्'],
            answer: '(क) निवसन्ति स्म',
            explanation: "'पक्षिणः आगत्य निवसन्ति स्म' — अत्र 'पक्षिणः' कर्तुः मुख्यं क्रियापदं 'निवसन्ति स्म' अस्ति।",
          },
          {
            num: 8,
            question: "'समीपदेशात्' इति पदस्य विलोमपदं गद्यांशात् चित्वा लिखत:",
            questionSanskrit: "'समीपदेशात्' इति पदस्य विलोमपदं गद्यांशात् चित्वा लिखत:",
            marks: 1,
            type: 'mcq',
            options: ['(क) निर्जने', '(ख) दूरदेशात्', '(ग) वनमध्ये', '(घ) आकाशमार्गे'],
            answer: '(ख) दूरदेशात्',
            explanation: "'समीपदेशात्' (पास के देश से) इत्यस्य विलोमपदं 'दूरदेशात्' (दूर देश से) भवति।",
          },
        ],
      },
      {
        sectionTitle: 'Section B: Textual Sequencing & Vocabulary (घटनाक्रमः रिक्तस्थानपूर्तिः च)',
        sectionTitleSanskrit: 'खण्डः "ख" · घटनाक्रमः रिक्तस्थानपूर्तिः च',
        instructions: 'Rearrange sentences chronologically and fill in blanks from textbook terms:',
        totalMarks: 10,
        questions: [
          {
            num: 9,
            question: 'घटनाक्रमानुसारं लिखत (Rearrange in chronological story order):\n(क) सर्वे कपोताः भूमौ अवतीर्य जालेन बद्धाः अभवन्।\n(ख) हिरण्यकः स्वदन्तबलेन सर्वेषां कपोतानां बन्धनानि च्छिन्नवान्।\n(ग) चित्रग्रीवः कपोतान् अवदत् यत् अविचारितं कर्म न कर्तव्यम्।\n(घ) सर्वे पक्षिणः एकचित्तीभूय जालमादाय उत्पतिताः।\n(ङ) वने कश्चिद् व्याधः तण्डुलकणान् विकीर्य जालं विस्तीर्य स्थितः।',
            questionSanskrit: 'घटनाक्रमानुसारं वाक्यानि पुनर्लिखत:',
            marks: 5,
            type: 'short_ans',
            answer: '१. वने कश्चिद् व्याधः तण्डुलकणान् विकीर्य जालं विस्तीर्य स्थितः।\n२. चित्रग्रीवः कपोतान् अवदत् यत् अविचारितं कर्म न कर्तव्यम्।\n३. सर्वे कपोताः भूमौ अवतीर्य जालेन बद्धाः अभवन्।\n४. सर्वे पक्षिणः एकचित्तीभूय जालमादाय उत्पतिताः।\n५. हिरण्यकः स्वदन्तबलेन सर्वेषां कपोतानां बन्धनानि च्छिन्नवान्।',
            explanation: 'कथायाः क्रमः: व्याधस्य जालग्रसारणम् ➔ चित्रग्रीवस्य निषेधः ➔ कपोतानां बन्धनम् ➔ जालमादाय उड्डयनम् ➔ हिरण्यकेन पाशकर्तनम्।',
          },
          {
            num: 10,
            question: 'रिक्तस्थानानि पूरयत (Fill in the blanks using terms from page 21 [ विस्मयः / हिरण्यको / अवपातभयात् / जालमादाय / पश्चात् ]):\n१. सर्वैः एकचित्तीभूय ______________ उड्डीयताम्।\n२. जालापहारकान् तान् अवलोक्य व्याधः ______________ अधावत्।\n३. गण्डकीतीरे ______________ नाम मूषकराजः निवसति।\n४. हिरण्यकः कपोतानाम् ______________ चकितस्तूष्णीं स्थितः।\n५. यतोहि विपत्काले ______________ एव कापुरुषलक्षणम्।',
            questionSanskrit: 'कोष्ठकात् उचितं पदं चित्वा रिक्तस्थानानि पूरयत:',
            marks: 5,
            type: 'fill',
            options: ['१. जालमादाय', '२. पश्चात्', '३. हिरण्यको', '४. अवपातभयात्', '५. विस्मयः'],
            answer: '१. जालमादाय, २. पश्चात्, ३. हिरण्यको, ४. अवपातभयात्, ५. विस्मयः',
            explanation: 'पाठान्तर्गतवाक्यानि: जालमादाय उड्डीयताम्; पश्चाद् अधावत्; हिरण्यको नाम मूषकराजः; अवपातभयात् चकितस्तूष्णीं स्थितः; विपत्काले विस्मयः एव कापुरुषलक्षणम्।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 CH 2 WORKSHEET 2: Verse Analysis & Application
  // ==========================================
  {
    id: 'ws-grade8-ch2-ws2',
    title: 'Chapter 2 Worksheet 2: Verse Analysis & Application (श्लोकार्थः अन्वयः च)',
    titleSanskrit: 'द्वितीयः पाठः कार्यपत्रिका २: श्लोकावबोधनम् — विपदि धैर्यम्',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '40 Mins',
    description: 'Hitopadesha classic verse analysis: विपदि धैर्यमथाभ्युदये क्षमा, word breakdown, anvaya completion, matching terms, and Hitopadesha literary history.',
    sections: [
      {
        sectionTitle: 'Section A: Shloka Textual Analysis (श्लोक-विश्लेषणम्)',
        sectionTitleSanskrit: 'खण्डः "क" · श्लोक-विश्लेषणम्',
        instructions: 'Analyze the structural verse from page 12 and resolve the queries:\n\n"विपदि धैर्यमथाभ्युदये क्षमा, सदसि वाक्पटुता युधि विक्रमः।\nयशसि चाभिरुचिर्व्यसनं श्रुतौ, प्रकृतिसिद्धमिदं हि महात्मनाम्॥ २ ॥"',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'महात्मनां कुत्र विक्रमः भवति? (Where do noble souls exhibit valor?)',
            questionSanskrit: 'महात्मनां कुत्र विक्रमः भवति?',
            marks: 1,
            type: 'short_ans',
            answer: 'युधि (युद्धे)',
            explanation: 'श्लोके उक्तम् — "युधि विक्रमः" अर्थात् युद्धे महात्मनां पराक्रमः भवति।',
          },
          {
            num: 2,
            question: 'महात्मनां कस्मिन् विषये अभिरुचिः भवति? (In what do noble souls cultivate keen interest?)',
            questionSanskrit: 'महात्मनां कस्मिन् विषये अभिरुचिः भवति?',
            marks: 1,
            type: 'short_ans',
            answer: 'यशसि (कीर्तौ)',
            explanation: '"यशसि चाभिरुचिः" — महात्मनाम् अभिरुचिः सत्कीर्तौ भवति।',
          },
          {
            num: 3,
            question: 'महात्मनां स्वभावे (प्रकृतौ) कानि लक्षणानि सिद्धानि भवन्ति? (Which virtues are naturally inherent in great souls?)',
            questionSanskrit: 'महात्मनां स्वभावे कानि लक्षणानि सिद्धानि भवन्ति?',
            marks: 2,
            type: 'short_ans',
            answer: 'विपत्तौ धैर्यम्, उन्नतौ क्षमा, सभायां वाक्पटुता, युद्धे पराक्रमः, यशसि प्रीतिः, शास्त्रेषु च अनुरागः महात्मनां स्वभावे सिद्धानि भवन्ति।',
            explanation: 'एतानि षड् लक्षणानि महात्मनां प्रकृतिसिद्धानि (स्वाभाविकाः गुणाः) सन्ति।',
          },
          {
            num: 4,
            question: "'विपदि' तथा 'अभ्युदये' महात्मनः किं कुर्वन्ति? (What do great souls practice in adversity and prosperity?)",
            questionSanskrit: "'विपदि' तथा 'अभ्युदये' महात्मनः किं कुर्वन्ति?",
            marks: 2,
            type: 'short_ans',
            answer: 'महात्मनः विपदि (संकटे) धैर्यम् अवलम्बन्ते तथा अभ्युदये (समृद्धौ) क्षमाभावं प्रदर्शयन्ति।',
            explanation: 'आपत्काले धैर्यं तथा समृद्धिकाले क्षमाशीलता महात्मनां मुख्यं भूषणम् अस्ति।',
          },
          {
            num: 5,
            question: 'अन्वय-पूर्तिः (Complete the structural verse alignment using [ क्षमा / धैर्यम् / श्रुतौ / महात्मनाम् ]):\n"अथ विपदि (१) ______________ , अभ्युदये (२) ______________ , सदसि वाक्पटुता, युधि विक्रमः, यशसि अभिरुचिः, (३) ______________ व्यसनं च, इदं हि (४) ______________ प्रकृतिसिद्धं भवति।"',
            questionSanskrit: 'उचितपदैः अन्वय-पूर्तिं कुरुत:',
            marks: 4,
            type: 'fill',
            options: ['(१) धैर्यम्', '(२) क्षमा', '(३) श्रुतौ', '(४) महात्मनाम्'],
            answer: '(१) धैर्यम्, (२) क्षमा, (३) श्रुतौ, (४) महात्मनाम्',
            explanation: 'श्लोकस्यान्वयः: विपदि धैर्यम्, अभ्युदये क्षमा, सदसि वाक्पटुता, युधि विक्रमः, यशसि अभिरुचिः, श्रुतौ व्यसनं च, इदं हि महात्मनां प्रकृतिसिद्धम्।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: Practical Vocabulary & Literary Context (शब्दार्यः ग्रन्थपरिचयः च)',
        sectionTitleSanskrit: 'खण्डः "ख" · शब्दार्थाः ग्रन्थपरिचयः च',
        instructions: 'Match the poetic terms with contextual meanings and answer literary background questions:',
        totalMarks: 10,
        questions: [
          {
            num: 6,
            question: 'परस्परं मेलनम् (Match text terms with their meanings):\n(क) विपदि ➔ ?\n(ख) अभ्युदये ➔ ?\n(ग) सदसि ➔ ?\n(घ) युधि ➔ ?\n(ङ) श्रुतौ ➔ ?',
            questionSanskrit: 'पदानि अर्थैः सह योजयत:',
            marks: 5,
            type: 'matching',
            options: ['(क) विपदि ➔ (४) संकटे', '(ख) अभ्युदये ➔ (५) उन्नतौ / समृद्धौ', '(ग) सदसि ➔ (२) सभायाम्', '(घ) युधि ➔ (१) युद्धे', '(ङ) श्रुतौ ➔ (३) शास्त्रेषु'],
            answer: '(क)-(४) संकटे, (ख)-(५) उन्नतौ/समृद्धौ, (ग)-(२) सभायाम्, (घ)-(१) युद्धे, (ङ)-(३) शास्त्रेषु',
            explanation: 'विपदि = संकटे (in adversity); अभ्युदये = समृद्धौ (in prosperity); सदसि = सभायाम् (in assembly); युधि = युद्धे (in battle); श्रुतौ = वेदेषु/शास्त्रेषु (in sacred scriptures).',
          },
          {
            num: 7,
            question: 'लघुपाठ्यविवरणम् (Hitopadesha literary history):\n१. हितोपदेशग्रन्थस्य लेखकः कः अस्ति? ➔ ________________________\n२. हितोपदेशे कति प्रकरणानि सन्ति? ➔ ________________________\n३. अयं पाठः हितोपदेशस्य कस्मात् प्रकरणात् स्वीकृतः? ➔ ________________________',
            questionSanskrit: 'ग्रन्थपरिचयाधारित-प्रश्नानाम् उत्तराणि लिखत:',
            marks: 5,
            type: 'short_ans',
            answer: '१. नारायणपण्डितः (Pandit Narayana); २. चत्वारि (४) प्रकरणानि (मित्रलाभः, सुहृद्भेदः, विग्रहः, सन्धिः); ३. मित्रलाभ-प्रकरणात् (From Mitralabha)',
            explanation: 'हितोपदेशस्य रचयिता नारायणपण्डितः अस्ति, यस्मिन् चत्वारि प्रकरणानि सन्ति। एषा कथा मित्रलाभ-प्रकरणे आगच्छति।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 CH 2 WORKSHEET 3: Lyap-Pratyaya Structural Mechanics
  // ==========================================
  {
    id: 'ws-grade8-ch2-ws3',
    title: 'Chapter 2 Worksheet 3: Lyap-Pratyaya Structural Mechanics (ल्यप्-प्रत्ययः)',
    titleSanskrit: 'द्वितीयः पाठः कार्यपत्रिका ३: ल्यप्-प्रत्ययः संयोगः विभागः च',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '45 Mins',
    description: 'Deep dive into Page 18-19 grammar tables: combining Prefix + Dhatu + Lyap, isolating root components, and mastering gerund rules.',
    sections: [
      {
        sectionTitle: 'Section A: Direct Grammatical Math Synthesis (ल्यप्-प्रत्यय-संयोजनम्)',
        sectionTitleSanskrit: 'खण्डः "क" · प्रत्यय-संयोगः',
        instructions: 'Combine the core structural blocks into a unified Lyap-Pratyaya output word:',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'प्रत्ययसंयोगं कुरुत (Combine Prefix + Root + Lyap):\n१. आ + गम् + ल्यप् ➔ ___________________________\n२. उत् + स्था + ल्यप् ➔ ___________________________\n३. प्र + नम् + ल्यप् ➔ ___________________________\n४. वि + स्मृ + ल्यप् ➔ ___________________________\n५. अव + लोक् + ल्यप् ➔ ___________________________\n६. वि + कॄ + ल्यप् ➔ ___________________________\n७. अव + तृ + ल्यप् ➔ ___________________________\n८. वि + स्तॄ + ल्यप् ➔ ___________________________\n९. अव + लम्ब् + ल्यप् ➔ ___________________________\n१०. निर् + मा + ल्यप् ➔ ___________________________',
            questionSanskrit: 'ल्यप्-प्रत्यय-संयोगेन पदानि रचयत:',
            marks: 10,
            type: 'grammar',
            answer: '१. आगत्य, २. उत्थाय, ३. प्रणम्य (प्रणत्य), ४. विस्मृत्य, ५. अवलोक्य, ६. विकीर्य, ७. अवतीर्य, ८. विस्तीर्य, ९. अवलम्ब्य, १०. निर्माय',
            explanation: 'ल्यप्-प्रत्ययस्य "य" अवशिष्यते। धातुपूर्वे उपसर्गसद्भावे क्त्वा-स्थाने ल्यप् भवति।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: Morphological Component Isolation (प्रकृति-प्रत्यय-विभागः)',
        sectionTitleSanskrit: 'खण्डः "ख" · प्रकृति-प्रत्यय-विभागः',
        instructions: 'Deconstruct action words into clean Prefix + Dhatu + Pratyaya parameters:',
        totalMarks: 10,
        questions: [
          {
            num: 2,
            question: 'अवयव-विभागं कुरुत (Isolate Prefix + Verb + Suffix):\n१. आनीय ➔ ___________ + ___________ + ___________\n२. उपकृत्य ➔ ___________ + ___________ + ___________\n३. निश्चित्य ➔ ___________ + ___________ + ___________\n४. प्रक्षाल्य ➔ ___________ + ___________ + ___________\n५. विस्तीर्य ➔ ___________ + ___________ + ___________',
            questionSanskrit: 'पदानां प्रकृति-प्रत्यय-विभागं कुरुत:',
            marks: 10,
            type: 'grammar',
            answer: '१. आ + नी + ल्यप्; २. उप + कृ + ल्यप्; ३. निस् (निर्) + चि + ल्यप्; ४. प्र + क्षल् + ल्यप्; ५. वि + स्तॄ + ल्यप्',
            explanation: 'आनीय = आ + नी + ल्यप्; उपकृत्य = उप + कृ + ल्यप्; निश्चित्य = निस् + चि + ल्यप्; प्रक्षाल्य = प्र + क्षल् + ल्यप्; विस्तीर्य = वि + स्तॄ + ल्यप्।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 CH 2 WORKSHEET 4: Visarga Sandhi Transformation Patterns
  // ==========================================
  {
    id: 'ws-grade8-ch2-ws4',
    title: 'Chapter 2 Worksheet 4: Visarga Sandhi Transformation Patterns (विसर्गसन्धिः)',
    titleSanskrit: 'द्वितीयः पाठः कार्यपत्रिका ४: विसर्गसन्धिः नियमाः संयोगाः विच्छेदाः च',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '40 Mins',
    description: 'Phonetics & Visarga rules from Page 17: sibilants (श्/स्), Utva (ओ), and Avagraha (ऽ) join and split operations.',
    sections: [
      {
        sectionTitle: 'Section A: Joining Operations (सन्धिं कुरुत)',
        sectionTitleSanskrit: 'खण्डः "क" · सन्धिं कुरुत',
        instructions: 'Perform character transitions according to explicit textbook mechanics rules:',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'सन्धिं कुरुत (Apply Visarga Sandhi rules):\n१. कः + चित् ➔ ___________________________\n२. प्रतीकारः + चिन्त्यताम् ➔ ___________________________\n३. देवदत्तः + छलेन ➔ ___________________________\n४. चकितः + तूष्णीम् ➔ ___________________________\n५. नीतिः + तावत् ➔ ___________________________\n६. हिरण्यकः + नाम ➔ ___________________________\n७. व्याधः + निवृत्तः ➔ ___________________________\n८. कुतः + अत्र ➔ ___________________________\n९. हितः + अपि ➔ ___________________________\n१०. सः + अस्माकम् ➔ ___________________________',
            questionSanskrit: 'सन्धिं कुरुत:',
            marks: 10,
            type: 'grammar',
            answer: '१. कश्चित्, २. प्रतीकारश्चिन्त्यताम्, ३. देवदत्तश्छलेन, ४. चकितस्तूष्णीम्, ५. नीतिस्तावत्, ६. हिरण्यको नाम, ७. व्याधो निवृत्तः, ८. कुतोऽत्र, ९. हितोऽपि, १०. सोऽस्माकम्',
            explanation: 'च/छ परे विसर्गस्य श्; त/थ परे विसर्गस्य स्; घोषव्यञ्जने परे विसर्गस्य ओ; अकारे परे विसर्गस्य ओ तथा अकारस्य अवग्रहः (ऽ)।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: Disjoining Operations (सन्धि-विच्छेदं कुरुत)',
        sectionTitleSanskrit: 'खण्डः "ख" · सन्धि-विच्छेदम्',
        instructions: 'Isolate compound variables back into their base lexical formats:',
        totalMarks: 10,
        questions: [
          {
            num: 2,
            question: 'सन्धिविच्छेदं कुरुत:\n१. चित्रग्रीवोऽवदत् ➔ ____________________ + ____________________\n२. बालकोऽत्र ➔ ____________________ + ____________________\n३. उपायश्चिन्तनीयः ➔ ____________________ + ____________________\n४. व्याधस्तत्र ➔ ____________________ + ____________________\n५. हिरण्यकोऽप्याह ➔ ____________________ + ____________________ + ____________________\n६. मूषकराजोगण्डकीतीरे ➔ ____________________ + ____________________',
            questionSanskrit: 'पदानां सन्धिविच्छेदं कुरुत:',
            marks: 10,
            type: 'grammar',
            answer: '१. चित्रग्रीवः + अवदत्; २. बालकः + अत्र; ३. उपायः + चिन्तनीयः; ४. व्याधः + तत्र; ५. हिरण्यकः + अपि + आह; ६. मूषकराजः + गण्डकीतीरे',
            explanation: 'ओऽ ➔ ः + अ; श् ➔ ः; स् ➔ ः; ओ + घोषवर्ण ➔ ः + घोषवर्ण; हिरण्यकोऽप्याह = हिरण्यकः + अपि + आह।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 CH 2 WORKSHEET 5: Case Matching & Compound Parsing
  // ==========================================
  {
    id: 'ws-grade8-ch2-ws5',
    title: 'Chapter 2 Worksheet 5: Case Matching & Compound Parsing (समास-विग्रहः)',
    titleSanskrit: 'द्वितीयः पाठः कार्यपत्रिका ५: समस्तपदानि वाक्य-संयोजनम् च',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '40 Mins',
    description: 'Sourced directly from Page 21 Exercise 7: Samasa formation, target case inflections, and sentence merging using the Lyap-Pratyaya structure.',
    sections: [
      {
        sectionTitle: 'Section A: Complex Target Samasa Conversions (समस्तपद-रचना)',
        sectionTitleSanskrit: 'खण्डः "क" · समस्तपद-विभक्ति-रूपाणि',
        instructions: 'Provide the correct combined compound term and its specific contextual case inflection form:',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'समस्तपदानि विभक्ति-रूपाणि च लिखत (Form compound and declined form):\n१. गण्डक्याः तीरम् ➔ समस्तपदम्: ______________ ➔ (सप्तमी विभक्तिः): गण्डकीतीरे\n२. तण्डुलानां कणाः ➔ समस्तपदम्: ______________ ➔ (द्वितीया बहुवचनम्): ______________\n३. जालस्य अपहारकाः ➔ समस्तपदम्: ______________ ➔ (द्वितीया बहुवचनम्): ______________\n४. अवपातात् भयम् ➔ समस्तपदम्: ______________ ➔ (पञ्चमी विभक्तिः): ______________\n५. कापुरुषाणां लक्षणम् ➔ समस्तपदम्: ______________ ➔ (सप्तमी विभक्तिः): ______________',
            questionSanskrit: 'समस्तपदानि विभक्त्यनुसारं लिखत:',
            marks: 10,
            type: 'grammar',
            answer: '१. गण्डकीतीरम् (गण्डकीतीरे); २. तण्डुलकणाः ➔ तण्डुलकणान्; ३. जालापहारकाः ➔ जालापहारकान्; ४. अवपातभयम् ➔ अवपातभयात्; ५. कापुरुषलक्षणम् ➔ कापुरुषलक्षणे (वा कापुरुषलक्षणम्)',
            explanation: 'षष्ठी/पञ्चमी तत्पुरुष-समासः: तण्डुलानां कणाः = तण्डुलकणाः (द्वितीया-बहुवचने तण्डुलकणान्); जालस्य अपहारकाः = जालापहारकाः (जालापहारकान्); अवपातात् भयम् = अवपातभयम् (अवपातभयात्); कापुरुषाणां लक्षणम् = कापुरुषलक्षणम्।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: Multi-Sentence Active Verb Conversions (ल्यप्-प्रत्ययेन वाक्य-संयोजनम्)',
        sectionTitleSanskrit: 'खण्डः "ख" · वाक्य-संयोजनम्',
        instructions: 'Re-factor multi-action clauses using the unified Lyap-Pratyaya structure (Page 20, Exercise 3):',
        totalMarks: 10,
        questions: [
          {
            num: 2,
            question: 'ल्यप्-प्रत्ययं प्रयुज्य वाक्यद्वयं योजयत:\n१. भक्तः मन्दिरम् आगच्छति। पूजां करोति। ➔ __________________________________________________________________\n२. माता भोजनं निर्माति। पुत्राय ददाति। ➔ __________________________________________________________________\n३. रमा पुस्तकं स्वीकरोति। विद्यालयं गच्छति। ➔ __________________________________________________________________\n४. अहं गृहम् आगच्छामि। भोजनं करोमि। ➔ __________________________________________________________________',
            questionSanskrit: 'वाक्यानि योजयत:',
            marks: 10,
            type: 'grammar',
            answer: '१. भक्तः मन्दिरम् आगत्य पूजां करोति।\n२. माता भोजनं निर्माय पुत्राय ददाति।\n३. रमा पुस्तकं स्वीकृत्य विद्यालयं गच्छति।\n४. अहं गृहम् आगत्य भोजनं करोमि।',
            explanation: 'आ + गम् + ल्यप् = आगत्य; निर् + मा + ल्यप् = निर्माय; स्वी + कृ + ल्यप् = स्वीकृत्य; आ + गम् + ल्यप् = आगत्य।',
          },
        ],
      },
    ],
  },


  // ==========================================
  // GRADE 8 CH 3 WORKSHEET 1: Subhashita Comprehension
  // ==========================================
  {
    id: 'ws-grade8-ch3-ws1',
    title: 'Chapter 3 Worksheet 1: Subhashita Comprehension & Verse Analysis (पठित-श्लोकावबोधनम्)',
    titleSanskrit: 'तृतीयः पाठः कार्यपत्रिका १: श्लोकार्थ-अवबोधनम् अन्वयः च',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '45 Mins',
    description: 'Sourced from Pages 25–26: Shloka comprehension of verses 2 and 3, word-to-word evaluation, and complete Anvaya fill-ins.',
    sections: [
      {
        sectionTitle: 'Section A: Extract-Based Questions (पठित-अवबोधनम्)',
        sectionTitleSanskrit: 'खण्डः "क" · पठित-अवबोधनम्',
        instructions: 'Read the two shlokas below carefully and answer the following questions: \nगुणी गुणं वेत्ति न वेत्ति निर्गुणः बली बलं वेत्ति न वेत्ति निर्बलः।\nपिको वसन्तस्य गुणं न वायसः करी च सिंहस्य बलं न मूषकः॥\nभवन्ति नम्रास्तरवः फलोद्गमैः नवाम्बुभिर्दूरविलम्बिनो घनाः।\nअनुद्धताः सत्पुरुषाः समृद्धिभिः स्वभाव एवैष परोपकारिणाम्॥',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'एकपदेन उत्तरत (Answer in one word):\n१. कः वसन्तस्य गुणं वेत्ति?\n२. फलोद्गमैः के नम्राः भवन्ति?\n३. कः सिंहस्य बलं वेत्ति?\n४. समृद्धिकाले के अनुद्धताः भवन्ति?',
            questionSanskrit: 'एकपदेन उत्तरत:',
            marks: 4,
            type: 'short_ans',
            answer: '१. पिकः (कोयल); २. तरवः (वृक्षाः); ३. करी (गजः); ४. सत्पुरुषाः (सज्जनाः)',
            explanation: 'पिकः वसन्तस्य गुणं वेत्ति; तरवः फलोद्गमैः नम्राः भवन्ति; करी सिंहस्य बलं वेत्ति; सत्पुरुषाः समृद्धिभिः अनुद्धताः भवन्ति।',
          },
          {
            num: 2,
            question: 'पूर्णवाक्येन उत्तरत (Answer in complete sentence):\n१. परोपकारिणां स्वभावः कीदृशः भवति?\n२. कः गुणं बलं च न जानाति?',
            questionSanskrit: 'पूर्णवाक्येन उत्तरत:',
            marks: 4,
            type: 'short_ans',
            answer: '१. परोपकारिणां स्वभावः समृद्धिभिः अपि नम्राः अनुद्धताः च भवितुम् एव अस्ति।\n२. निर्गुणः गुणं न वेत्ति, निर्बलः च बलं न वेत्ति।',
            explanation: 'सज्जनाः प्रचुरसम्पत्तौ अपि अहङ्कारशून्याः भवन्ति; अयोग्यः जनः अन्यस्य योग्यतां ज्ञातुं न शक्नोति।',
          },
          {
            num: 3,
            question: 'निर्देशानुसारम् उत्तरत (Answer as directed):\n१. "वृक्षाः" इत्यस्य पर्यायपदं श्लोके किम् प्रयुक्तम्?\n२. "उद्धताः" (अहङ्कारिणः) इत्यस्य विलोमपदं किम्?',
            questionSanskrit: 'निर्देशानुसारम् उत्तरत:',
            marks: 2,
            type: 'short_ans',
            answer: '१. तरवः; २. अनुद्धताः',
            explanation: 'तरवः = वृक्षाः / पादपाः; अनुद्धताः = नम्राः (उद्धताः इत्यस्य विलोमपदम्)।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: Anvaya Fill-in-the-Blanks (अन्वय-रिक्तस्थान-पूर्तिः)',
        sectionTitleSanskrit: 'खण्डः "ख" · अन्वय-पूर्तिः',
        instructions: 'Complete the Anvaya for Shloka 1 and Shloka 8 using the appropriate words:',
        totalMarks: 10,
        questions: [
          {
            num: 4,
            question: 'मञ्जूषातः पदानि चित्वा अन्वयं पूरयत:\n[ देवाः, पुरुषाः, सुरत्वात्, गीतकानि ]\nअन्वयः १: भारतभूमिभागे ये भवन्ति ते धन्याः इति ______ (१) ______ (२) गायन्ति किल। स्वर्गापवर्गास्पदमार्गभूते तु ______ (३) भूयः ______ (४) भवन्ति।',
            questionSanskrit: 'अन्वयं पूरयत (मन्त्र १):',
            marks: 5,
            type: 'fill',
            answer: '१. देवाः, २. गीतकानि, ३. सुरत्वात्, ४. पुरुषाः',
            explanation: 'देवाः गीतकानि गायन्ति किल; सुरत्वात् भूयः पुरुषाः भवन्ति।',
          },
          {
            num: 5,
            question: 'मञ्जूषातः पदानि चित्वा अन्वयं पूरयत:\n[ गतिः, सिध्यति, एकेन, पुरुषकारेण ]\nअन्वयः २: यथा हि ______ (१) चक्रेण रथस्य ______ (२) न भवेत्, एवं ______ (३) विना दैवं न ______ (४)।',
            questionSanskrit: 'अन्वयं पूरयत (मन्त्र ८):',
            marks: 5,
            type: 'fill',
            answer: '१. एकेन, २. गतिः, ३. पुरुषकारेण, ४. सिध्यति',
            explanation: 'यथा हि एकेन चक्रेण रथस्य गतिः न भवेत्, एवं पुरुषकारेण विना दैवं न सिध्यति।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 CH 3 WORKSHEET 2: Virtues & Character Testing
  // ==========================================
  {
    id: 'ws-grade8-ch3-ws2',
    title: 'Chapter 3 Worksheet 2: Virtues & Character Testing (सद्गुणाः कनकपरीक्षा च)',
    titleSanskrit: 'तृतीयः पाठः कार्यपत्रिका २: अष्टौ गुणाः कनकपरीक्षा च',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '40 Mins',
    description: 'Sourced from Pages 27–28: Analysis of the fourfold test of gold/humans and the eight illuminating virtues.',
    sections: [
      {
        sectionTitle: 'Section A: The Fourfold Testing Criteria (कनक-परीक्षा पुरुष-परीक्षा च)',
        sectionTitleSanskrit: 'खण्डः "क" · चतुर्विधा परीक्षा',
        instructions: 'Compare the testing of gold with the testing of human character (Shloka 4):',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'कनकस्य पुरुषस्य च परीक्षायाः चतुर्विधान् उपायान् लिखत:\n(क) कनकं कैः चतुर्भिः परीक्ष्यते? ➔ १. ____________ २. ____________ ३. ____________ ४. ____________\n(ख) पुरुषः कैः चतुर्भिः परीक्ष्यते? ➔ १. ____________ २. ____________ ३. ____________ ४. ____________',
            questionSanskrit: 'परीक्षा-उपायान् लिखत:',
            marks: 6,
            type: 'short_ans',
            answer: '(क) कनकस्य परीक्षा: १. निघर्षणेन (घिसकर), २. छेदनेन (काटकर), ३. तापेन (तपाकर), ४. ताडनेन (पीटकर)।\n(ख) पुरुषस्य परीक्षा: १. कुलेन (वंश/परिवार), २. शीलेन (सदाचार/स्वभाव), ३. गुणेन (सद्गुण), ४. कर्मणा (सत्कर्म)।',
            explanation: 'यथा निघर्षण-च्छेदन-ताप-ताडनैः कनकं परीक्ष्यते, तथा कुलेन शीलेन गुणेन कर्मणा पुरुषः परीक्ष्यते।',
          },
          {
            num: 2,
            question: 'कनक-परीक्षायाः पुरुष-परीक्षायाः च मध्ये का समानता अस्ति? संक्षेपेण लिखत।',
            questionSanskrit: 'समानतां वर्णयत:',
            marks: 4,
            type: 'short_ans',
            answer: 'यथा बाह्यचमकं दृष्ट्वा सुवर्णस्य शुद्धता न ज्ञायते, अपितु कठोरपरीक्षणेन एव ज्ञायते; तथैव केवलं बाह्यरूपं दृष्ट्वा मनुष्यस्य श्रेष्ठता न ज्ञायते, अपितु तस्य कुलेन, शीलेन, सद्गुणैः, सत्कर्मभिः च तस्य वास्तविकं मूल्यं निर्धार्यते।',
            explanation: 'आंतरिक गुणों और कर्मों की कसौटी पर ही वास्तविक श्रेष्ठता प्रमाणित होती है।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: The Eight Illuminating Virtues (अष्टौ गुणाः)',
        sectionTitleSanskrit: 'खण्डः "ख" · अष्टगुणानां परिचयः',
        instructions: 'Analyze the eight virtues from Shloka 5 that bring renown and honor to an individual:',
        totalMarks: 10,
        questions: [
          {
            num: 3,
            question: 'श्लोकोक्तान् अष्टौ गुणान् लिखत तेषां च अर्थं स्पष्टीकुरुत:\n१. प्रज्ञा = ______________\n२. कौल्यम् = ______________\n३. दमः = ______________\n४. श्रुतम् = ______________\n५. पराक्रमः = ______________\n६. अबहुभाषिता = ______________\n७. दानं यथाशक्ति = ______________\n८. कृतज्ञता = ______________',
            questionSanskrit: 'अष्टौ गुणान् तेषामर्थं च लिखत:',
            marks: 8,
            type: 'short_ans',
            answer: '१. प्रज्ञा = तीव्र बुद्धि/विवेक (Wisdom); २. कौल्यम् = कुलीनता/उत्तम कुल के संस्कार (Noble lineage); ३. दमः = इन्द्रियसंयम (Sense control); ४. श्रुतम् = शास्त्रज्ञान/विद्या (Scriptural learning); ५. पराक्रमः = वीरता/साहस (Valor); ६. अबहुभाषिता = मितभाषिता/सार्थक बोलना (Reticence/measured speech); ७. दानं यथाशक्ति = सामर्थ्यानुसार दान (Charity per capacity); ८. कृतज्ञता = उपकार मानना (Gratitude)।',
            explanation: 'अष्टौ गुणाः पुरुषं दीपयन्ति प्रज्ञा च कौल्यं च दमः श्रुतं च पराक्रमश्चाबहुभाषिता च दानं यथाशक्ति कृतज्ञता च।',
          },
          {
            num: 4,
            question: '"अबहुभाषिता" इति गुणस्य समाजे किं महत्त्वम् अस्ति?',
            questionSanskrit: 'अबहुभाषितायाः महत्त्वं किम्?',
            marks: 2,
            type: 'short_ans',
            answer: 'व्यर्थं बहुभाषणेन समयस्य शक्तिनाशः भवति तथा च वचनस्य प्रभावः नश्यति। मितभाषी जनः यद् वदति तत् सारगर्भितं सत्यं च भवति, अतः समाजे सर्वत्र आदरं प्राप्नोति।',
            explanation: 'कम और नापा-तुला सार्थक बोलना ही वाणी की श्रेष्ठ शोभा है।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 CH 3 WORKSHEET 3: Vocabulary & Synonyms
  // ==========================================
  {
    id: 'ws-grade8-ch3-ws3',
    title: 'Chapter 3 Worksheet 3: Complete Vocabulary & Synonyms (शब्दार्थाः पर्यायाः विलोमाः च)',
    titleSanskrit: 'तृतीयः पाठः कार्यपत्रिका ३: शब्दार्थाः भाषाभ्यासः च',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '40 Mins',
    description: 'Sourced from Pages 30–31: Vocabulary drill, synonyms, antonyms, and word usage from the 46 key terms.',
    sections: [
      {
        sectionTitle: 'Section A: पर्यायाणां मेलनम् (Matching Synonyms)',
        sectionTitleSanskrit: 'खण्डः "क" · समानार्थक-पदानि',
        instructions: 'Match the Sanskrit words in Column A with their authentic synonyms in Column B:',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'स्तम्भयोः मेलनं कुरुत:\n(क) अपवर्गः ➔ ____________\n(ख) करी ➔ ____________\n(ग) घनाः ➔ ____________\n(घ) कनकम् ➔ ____________\n(ङ) प्रज्ञा ➔ ____________\n(च) अङ्गारः ➔ ____________\n(छ) दैवम् ➔ ____________\n(ज) अनुद्धताः ➔ ____________\n(मञ्जूषा: मेघाः, सुवर्णम्, निर्वाणम्/मोक्षः, गजः, विशेषज्ञानम्/बुद्धिः, दग्धकाष्ठः, भाग्यम्, गर्वशून्याः)',
            questionSanskrit: 'पर्यायपदानि मेलयत:',
            marks: 8,
            type: 'short_ans',
            answer: '(क) अपवर्गः ➔ निर्वाणम् / मोक्षः; (ख) करी ➔ गजः; (ग) घनाः ➔ मेघाः; (घ) कनकम् ➔ सुवर्णम्; (ङ) प्रज्ञा ➔ विशेषज्ञानम् / बुद्धिः; (च) अङ्गारः ➔ दग्धकाष्ठः; (छ) दैवम् ➔ भाग्यम्; (ज) अनुद्धताः ➔ गर्वशून्याः।',
            explanation: 'पाठ्यपुस्तकस्य पृष्ठ ३०–३१ आधारेण पर्यायपदानि।',
          },
          {
            num: 2,
            question: 'अधोलिखितानां पदानां हिन्द्यर्थं लिखत:\n१. दूरविलम्बिनः = ______________\n२. अबहुभाषिता = ______________',
            questionSanskrit: 'हिन्द्यर्थं लिखत:',
            marks: 2,
            type: 'short_ans',
            answer: '१. दूरविलम्बिनः = दूर से नीचे झुके हुए (बादल); २. अबहुभाषिता = कम और नापा-तुला बोलना (मितभाषिता)।',
            explanation: 'दूरविलम्बिनः = दूरात् अधः अवनताः; अबहुभाषिता = मितभाषिता।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: विलोम-पदानि (Antonyms Matching)',
        sectionTitleSanskrit: 'खण्डः "ख" · विपरीतार्थक-पदानि',
        instructions: 'Provide the exact antonyms for the following words found in the chapter:',
        totalMarks: 10,
        questions: [
          {
            num: 3,
            question: 'विलोमपदानि लिखत:\n१. गुणी ➔ ______________\n२. बली ➔ ______________\n३. नम्राः ➔ ______________\n४. सत्पुरुषः ➔ ______________\n५. उष्णः ➔ ______________\n६. सत्यम् ➔ ______________\n७. सख्यम् ➔ ______________\n८. कृतज्ञता ➔ ______________',
            questionSanskrit: 'विलोमपदानि लिखत:',
            marks: 8,
            type: 'short_ans',
            answer: '१. गुणी ➔ निर्गुणः; २. बली ➔ निर्बलः; ३. नम्राः ➔ उद्धताः (कठोराः); ४. सत्पुरुषः ➔ दुर्जनः; ५. उष्णः ➔ शीतः; ६. सत्यम् ➔ असत्यम् (छलम्); ७. सख्यम् ➔ शत्रुता; ८. कृतज्ञता ➔ कृतघ्नता।',
            explanation: 'गुणी x निर्गुणः; बली x निर्बलः; सत्पुरुषः x दुर्जनः; उष्णः x शीतः; कृतज्ञता x कृतघ्नता।',
          },
          {
            num: 4,
            question: '"कृतज्ञता" तथा "कृतघ्नता" अनयोः पदयोः कः भेदः?',
            questionSanskrit: 'भेदं स्पष्टीकुरुत:',
            marks: 2,
            type: 'short_ans',
            answer: 'कृतज्ञता नाम कृतानाम् उपकाराणां स्मरणम् आदरपूर्वकं स्वीकारः च। कृतघ्नता नाम उपकारं विस्मृत्य उपकारिणः एव अहितचिन्तनम्। कृतज्ञता देवगुणः अस्ति, कृतघ्नता तु महापातकम्।',
            explanation: 'उपकार मानने का भाव कृतज्ञता है, उपकार भूलना कृतघ्नता है।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 CH 3 WORKSHEET 4: Sandhi Rules & Word Splits
  // ==========================================
  {
    id: 'ws-grade8-ch3-ws4',
    title: 'Chapter 3 Worksheet 4: Sandhi Rules & Word Splits (सन्धिविच्छेदः नियमाः च)',
    titleSanskrit: 'तृतीयः पाठः कार्यपत्रिका ४: विसर्ग-यण्-सन्धयः पदच्छेदः च',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '40 Mins',
    description: 'Sourced from Pages 32–33: Sandhi transformations (Visarga Sandhi, Yan Sandhi) and Padaccheda mastery.',
    sections: [
      {
        sectionTitle: 'Section A: विसर्गसन्धि-अभ्यासः (Visarga Sandhi Transitions)',
        sectionTitleSanskrit: 'खण्डः "क" · विसर्गसन्धिः',
        instructions: 'Split or join the following terms following the Visarga rules from Page 32:',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'सन्धिविच्छेदं कुरुत (Split the Sandhi):\n१. नम्रास्तरवः = ____________ + ____________\n२. धन्यास्तु = ____________ + ____________\n३. उष्णो दहति = ____________ + ____________\n४. पराक्रमश्चाबहुभाषिता = पराक्रमः + ____________ + अबहुभाषिता',
            questionSanskrit: 'सन्धिविच्छेदं कुरुत:',
            marks: 5,
            type: 'grammar',
            answer: '१. नम्राः + तरवः; २. धन्याः + तु; ३. उष्णः + दहति; ४. च (पराक्रमः + च + अबहुभाषिता)',
            explanation: 'विसर्ग के बाद त्/थ् आने पर विसर्ग का स् होता है (नम्रास्तरवः, धन्यास्तु)। अ के बाद विसर्ग और घोषवर्ण आने पर ओ होता है (उष्णो दहति)।',
          },
          {
            num: 2,
            question: 'सन्धिं कुरुत (Join the Sandhi):\n१. सत्पुरुषाः + समृद्धिभिः = __________________\n२. शीतः + च = __________________\n३. गतिः + भवेत् = __________________\n४. स्वभावः + एव = __________________',
            questionSanskrit: 'सन्धिं कुरुत:',
            marks: 5,
            type: 'grammar',
            answer: '१. सत्पुरुषाः समृद्धिभिः (अथवा सत्पुरुषा समृद्धिभिः); २. शीतश्च; ३. गतिर्भवेत्; ४. स्वभाव एव (विसर्गलोपः)',
            explanation: 'शीतः + च = शीतश्च (विसर्गस्य श्); गतिः + भवेत् = गतिर्भवेत् (विसर्गस्य र्); स्वभावः + एव = स्वभाव एव (अः + असमान स्वर ➔ विसर्गलोपः)।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: यण् एवं स्वर-सन्धयः (Yan & Vowel Sandhi)',
        sectionTitleSanskrit: 'खण्डः "ख" · यण्-स्वर-सन्धयः',
        instructions: 'Analyze the internal vowel junctions according to the textbook grammar box:',
        totalMarks: 10,
        questions: [
          {
            num: 3,
            question: 'सन्धिविच्छेदं कुरुत:\n१. अभ्युपैति = ____________ + ____________ + ____________\n२. ह्येकेन = ____________ + ____________\n३. स्वभाव एवैषः = स्वभावः + एव + ____________\n४. तद्यच्छलम् = तत् + ____________ + छलम्',
            questionSanskrit: 'सन्धिविच्छेदं कुरुत:',
            marks: 6,
            type: 'grammar',
            answer: '१. अभि + उप + एति; २. हि + एकेन; ३. एषः; ४. यत्',
            explanation: 'अभि + उप + एति = अभ्युपैति (यण् + वृद्धि); हि + एकेन = ह्येकेन (यण् सन्धि: इ -> य्); एव + एषः = एवैषः (वृद्धि सन्धि); तत् + यत् + छलम् = तद्यच्छलम्।',
          },
          {
            num: 4,
            question: '"अभ्युपैति" इति पदे घटितयोः द्वयोः सन्ध्योः नामनी लिखत।',
            questionSanskrit: 'सन्धिद्वयं निर्दिशत:',
            marks: 4,
            type: 'grammar',
            answer: '१. यण्-सन्धिः: अभि + उप ➔ अभ्युप (इकारस्य स्थाने यकारः)\n२. वृद्धि-सन्धिः: उप + एति ➔ उपैति (अ + ए ➔ ऐ)\nसंयुक्तं रूपम्: अभ्युपैति।',
            explanation: 'अभ्युपैति पदे प्रथमं यण् सन्धिः ततः वृद्धि सन्धिः भवति।',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 8 CH 3 WORKSHEET 5: Exercises & Life Wisdom
  // ==========================================
  {
    id: 'ws-grade8-ch3-ws5',
    title: 'Chapter 3 Worksheet 5: Exercises & Life Wisdom Application (अभ्यासकार्यम् जीवनमूल्यानि च)',
    titleSanskrit: 'तृतीयः पाठः कार्यपत्रिका ५: पाठ्यपुस्तक-अभ्यासकार्यम् नैतिकशिक्षा च',
    category: 'grade8',
    categoryLabel: 'Grade 8 Sanskrit · CBSE Deepakam',
    grade: 'CBSE Grade 8 (Deepakam Framework)',
    totalMarks: 20,
    timeLimit: '45 Mins',
    description: 'Sourced from Pages 32–35: Solved textbook questions, metaphorical analysis of charcoal and chariot, and ethical application.',
    sections: [
      {
        sectionTitle: 'Section A: पाठ्यपुस्तक-अभ्यास-प्रश्नोत्तराणि (Textbook Solved Questions)',
        sectionTitleSanskrit: 'खण्डः "क" · अभ्यास-प्रश्नाः',
        instructions: 'Answer the following textbook questions in complete sentences with proper grammar:',
        totalMarks: 10,
        questions: [
          {
            num: 1,
            question: 'पूर्णवाक्येन उत्तरत:\n(क) सत्यम् कदा सत्यम् न भवति?\n(ख) दैवं कदा न सिध्यति?\n(ग) केन सह सख्यं प्रीतिं च न कुर्यात्?',
            questionSanskrit: 'पूर्णवाक्येन उत्तरत:',
            marks: 6,
            type: 'short_ans',
            answer: '(क) यद् सत्यम् छलम् अभ्युपैति (कपटयुक्तं भवति) तत् कदापि सत्यम् न भवति।\n(ख) पुरुषकारेण (कठिनपरिश्रमेण) विना दैवं न सिध्यति।\n(ग) दुर्जनेन (दुष्टमनुष्येण) सह सख्यं प्रीतिं च कदापि न कुर्यात्।',
            explanation: 'पृष्ठ ३२–३३ अभ्यासकार्यम् प्रश्न २ आधारेण।',
          },
          {
            num: 2,
            question: 'रिक्तस्थानानि पूरयत (मञ्जूषा: फलोद्गमैः, श्रुतम्, गुणं, शीलेन):\n१. गुणी ____________ वेत्ति न वेत्ति निर्गुणः।\n२. भवन्ति नम्राः तरवः ____________।\n३. पुरुषः परीक्ष्यते कुलेन ____________ गुणेन कर्मणा।\n४. गुणाः पुरुषं दीपयन्ति – प्रज्ञा, कौल्यं, दमः ____________।',
            questionSanskrit: 'रिक्तस्थानानि पूरयत:',
            marks: 4,
            type: 'fill',
            answer: '१. गुणं; २. फलोद्गमैः; ३. शीलेन; ४. श्रुतम्',
            explanation: 'पृष्ठ ३३ प्रश्न ४ अभ्यासकार्यम्।',
          },
        ],
      },
      {
        sectionTitle: 'Section B: उपमा-सौन्दर्यम् नैतिकशिक्षा च (Metaphor & Ethical Wisdom)',
        sectionTitleSanskrit: 'खण्डः "ख" · उपमा-सौन्दर्यम् जीवनमूल्यानि च',
        instructions: 'Explain the profound allegorical lessons taught in the subhashitas:',
        totalMarks: 10,
        questions: [
          {
            num: 3,
            question: '"उष्णो दहति चाङ्गारः शीतः कृष्णायते करम्" — अत्र दुर्जनस्य तुलना अङ्गारेण सह किमर्थं कृता? अस्याः उपमायाः भावार्थं स्पष्टीकुरुत।',
            questionSanskrit: 'अङ्गार-उपमां स्पष्टीकुरुत:',
            marks: 5,
            type: 'short_ans',
            answer: 'अङ्गारः (कोयला) यदा प्रज्वलितः उष्णः च भवति तदा स्पर्शमात्रेण हस्तं दग्धं करोति। यदा सः शीतः भवति तदा अपि हस्तं मलिनेन कालिमेन कृष्णायते। तथैव दुष्टजनः यदि क्रुद्धः भवेत् तर्हि प्रत्यक्षं विनाशं करोति, यदि च मित्ररूपेण तिष्ठेत् तर्हि अपकीर्तिं कलङ्कं च ददाति। अतः दुर्जनेन सह न मैत्री न च विरोधः करणीयः, अपितु दूरात् एव त्याज्यः।',
            explanation: 'दुष्ट व्यक्ति हर हाल में नुकसानदेह होता है—क्रोधी होकर जलाता है और मित्र बनकर चरित्र कलंकित करता है।',
          },
          {
            num: 4,
            question: '"यथा ह्येकेन चक्रेण न रथस्य गतिर्भवेत् । एवं पुरुषकारेण विना दैवं न सिध्यति ॥" — अस्य श्लोकस्य नैतिकः सन्देशः कः? अस्माकं जीवने अस्य किं महत्त्वम्?',
            questionSanskrit: 'नैतिकसन्देशं लिखत:',
            marks: 5,
            type: 'short_ans',
            answer: 'अस्य श्लोकस्य मुख्यः सन्देशः अस्ति यत् मनुष्येण केवलं भाग्याश्रितेन भूत्वा न स्थातव्यम्। यथा रथः एकस्मिन् चक्रे स्थातुं चलितुं च न शक्नोति, तथैव मानवजीवनस्य रथः केवलं भाग्येन न सिध्यति। पुरुषार्थः (परिश्रमः) एव मुख्यं चक्रम् अस्ति। यदा वयं कर्म कुर्मः तदैव भाग्यम् अपि सहाय्यं करोति। अतः सर्वदा उद्योगी प्रयत्नशीलः च भवितव्यम्।',
            explanation: 'परिश्रम ही जीवन-रथ का मुख्य पहिया है, बिना कर्म के भाग्य कभी फलित नहीं होता।',
          },
        ],
      },
    ],
  },
  // ==========================================
  // GRADE 8 CH 4 WORKSHEETS (Exact Comprehensive Set)
  // ==========================================
  {
    "id": "ws-grade8-ch4-ws1",
    "title": "Worksheet 1: Prose Comprehension & Historical Context (पठित-अवबोधनम्)",
    "titleSanskrit": "चतुर्थः पाठः कार्यपत्रिका १: गद्यांश-अवबोधनम् ऐतिहासिक-पृष्ठभूमिः च",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "45 Mins",
    "description": "Extract from teachers feast at Satyavadi Vana Vidyalaya, Gopabandhu feeding the hungry beggar, fact verification, and vocabulary antonyms.",
    "sections": [
      {
        "sectionTitle": "Section A: Extract-Based Questions (पठित-अवबोधनम्)",
        "sectionTitleSanskrit": "खण्डः \"क\" · पठित-अवबोधनम्",
        "instructions": "Read the passage below carefully and answer the questions that follow:\n\n\"एकदा आचार्यहरिहरदासः 'सत्यवादि-वनविद्यालयस्य' सर्वान् अध्यापकान् भोजनाय आमन्त्रितवान्। आमन्त्रित-अतिथयः हस्तपादं क्षालयित्वा आसनेषु उपविष्टवन्तः। बहूनि सुस्वादूनि व्यञ्जनानि कदलीपत्रेषु परिवेषितानि। भोजनकाले कश्चित् भिक्षुकः द्वारम् आगत्य अवदत्– \\\"भोः! बुभुक्षितोऽहम्, मह्यं किमपि भोजनं ददत।\\\" एतत् श्रुत्वा गोपबन्धुः उत्थाय स्वथालीतः (स्वपत्रात्) सर्वं सुस्वादु भोजनं तस्मै भिक्षुकाय दत्तवान्।\"",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "I. एकपदेन उत्तरत (Answer in a single word):\n(क) कः सर्वान् अध्यापकान् भोजनाय आमन्त्रितवान्?\n(ख) गोपबन्धुः कस्मै स्वभोजनं दत्तवान्?",
            "questionSanskrit": "एकपदेन उत्तरत:",
            "marks": 2,
            "type": "short_ans",
            "answer": "(क) आचार्यहरिहरदासः\n(ख) भिक्षुकाय (बुभुक्षिताय भिक्षुकाय)",
            "explanation": "गद्यांशे स्पष्टम् उल्लिखितम् — आचार्यहरिहरदासः अध्यापकान् आमन्त्रितवान् तथा गोपबन्धुः भिक्षुकाय स्वभोजनं दत्तवान्।"
          },
          {
            "num": 2,
            "question": "II. पूर्णवाक्येन उत्तरत (Answer in a complete sentence):\n(क) अतिथयः भोजनार्थं कथम् उपविष्टवन्तः?\n(ख) भिक्षुकः द्वारम् आगत्य किम् अकथयत्?",
            "questionSanskrit": "पूर्णवाक्येन उत्तरत:",
            "marks": 4,
            "type": "short_ans",
            "answer": "(क) आमन्त्रित-अतिथयः हस्तपादं क्षालयित्वा आसनेषु उपविष्टवन्तः।\n(ख) भिक्षुकः द्वारम् आगत्य अवदत् — \"भोः! बुभुक्षितोऽहम्, मह्यं किमपि भोजनं ददत।\"",
            "explanation": "गद्यांशानुसारं पूर्णवाक्येन उत्तरम्।"
          },
          {
            "num": 3,
            "question": "III. निर्देशानुसारं विकल्पं चिनुत (Grammar options based on text):\n१. 'सुस्वादूनि व्यञ्जनानि' – अत्र विशेषणपदं किम् अस्ति?\n(क) सुस्वादूनि (ख) व्यञ्जनानि (ग) भोजनाय (घ) कदलीपत्रेषु\n\n२. गद्यांशे 'बुभुक्षितोऽहम्' इत्यस्य कः सन्धि-विच्छेदः अस्ति?\n(क) बुभुक्षितः + अहम् (ख) बुभुक्षित + अहम् (ग) बुभुक्षितो + हम्\n\n३. 'दत्तवान्' इति पदे कः प्रत्ययः प्रयुक्तः?\n(क) क्त्वा (ख) ल्यप् (ग) क्तवतु (घ) तुमुन्\n\n४. 'अतिथयः' इति कर्तृपदस्य क्रियापदं किम् अस्ति?\n(क) उपविष्टवन्तः (ख) क्षालयित्वा (ग) आगत्य (घ) दत्तवान्",
            "questionSanskrit": "निर्देशानुसारं विकल्पं चिनुत:",
            "marks": 4,
            "type": "mcq",
            "answer": "१. (क) सुस्वादूनि (विशेष्यपदम्: व्यञ्जनानि)\n२. (क) बुभुक्षितः + अहम् (विसर्गस्य उत्वं पूर्वरूपं च)\n३. (ग) क्तवतु (दा + क्तवतु = दत्तवान्)\n४. (क) उपविष्टवन्तः (कर्तृपदम्: अतिथयः, क्रियापदम्: उपविष्टवन्तः)",
            "explanation": "व्याकरणनियमानुसारं शुद्ध-विकल्पाः।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: Textual Fact Verification & Fillers",
        "sectionTitleSanskrit": "खण्डः \"ख\" · तथ्य-परीक्षणं विलोमपदानि च",
        "instructions": "Verify chapter facts through cloze items and match antonym pairs:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 4,
            "question": "IV. रिक्तस्थानानि पूरयत (मञ्जूषा: समाज-दिनपत्रिकायाः, सुआण्डो-ग्रामे, प्रफुल्लचन्द्ररायेन, उत्कलमणिः, वर्षद्वयम्):\n१. गोपबन्धु महोदयस्य जन्म ओड़िशा-राज्यस्य ______________ अभवत्।\n२. गोपबन्धुः लोकसेवायै ______________ नामिकां पत्रिकाम् आरब्धवान्।\n३. सः देशसेवार्थं कारावासे ______________ कालम् अयापयत्।\n४. प्रसिद्धविद्वद्भिः आचार्य-______________ महोदयेन तस्मै विशिष्टा उपाधिः दत्ता।\n५. गोपबन्धुः समाजे ______________ इति नाम्ना सुविख्यातः अस्ति।",
            "questionSanskrit": "मञ्जूषातः पदानि चित्वा रिक्तस्थानानि पूरयत:",
            "marks": 5,
            "type": "fill",
            "answer": "१. सुआण्डो-ग्रामे; २. समाज-दिनपत्रिकायाः; ३. वर्षद्वयम्; ४. प्रफुल्लचन्द्ररायेन; ५. उत्कलमणिः",
            "explanation": "पाठगत-ऐतिहासिक-तथ्यानाम् आधारेण रिक्तस्थानपूर्तिः।"
          },
          {
            "num": 5,
            "question": "V. विलोमपदानि मेलयत (Match the vocabulary antonyms based on the chapter):\nस्तम्भ \"अ\" (Word) : (क) पराजितः, (ख) सुस्वादु, (ग) विषादः, (घ) कृतज्ञता, (ङ) विपद्\nस्तम्भ \"ब\" (Antonym) : (१) अकृतज्ञता, (२) अभ्युदयः, (३) विजयी, (४) दुःस्वादु / नीरसम्, (५) प्रसन्नता / हर्षः",
            "questionSanskrit": "विलोमपदानि परस्परं मेलयत:",
            "marks": 5,
            "type": "matching",
            "answer": "(क) पराजितः -> (३) विजयी\n(ख) सुस्वादु -> (४) दुःस्वादु / नीरसम्\n(ग) विषादः -> (५) प्रसन्नता / हर्षः\n(घ) कृतज्ञता -> (१) अकृतज्ञता\n(ङ) विपद् -> (२) अभ्युदयः",
            "explanation": "विलोम-शब्दानां यथायोग्यं मेलनम्।"
          }
        ]
      }
    ]
  },
  {
    "id": "ws-grade8-ch4-ws2",
    "title": "Worksheet 2: Verse Analysis & Core Character Evaluation (श्लोक-विश्लेषणम् चरित्र-मूल्याङ्कनं च)",
    "titleSanskrit": "चतुर्थः पाठः कार्यपत्रिका २: श्लोक-विश्लेषणम् चरित्र-मूल्याङ्कनं च",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "40 Mins",
    "description": "The chapters climax dedication sloka, sandhi breakdown, padaccheda, anvaya completion, and short biographical inquiries.",
    "sections": [
      {
        "sectionTitle": "Section A: Structural Shloka Processing",
        "sectionTitleSanskrit": "खण्डः \"क\" · श्लोक-अवबोधनम् अन्वय-पूर्तिः च",
        "instructions": "Study the classical dedication verse of Gopabandhu Das and answer the questions:\n\n\"उत्कलमणिरित्याख्यः प्रसिद्धो लोकसेवकः ।\nप्रणम्यो देशभक्तोऽयं गोपबन्धुर्महामनाः ॥\"",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "I. एकपदेन उत्तरत (Answer in a single word):\n(क) अयं महान् देशभक्तः केन नाम्ना आख्यातः (प्रसिद्धः) अस्ति?\n(ख) गोपबन्धुः कीदृशः सेवकः आसीत्?",
            "questionSanskrit": "एकपदेन उत्तरत:",
            "marks": 2,
            "type": "short_ans",
            "answer": "(क) उत्कलमणिः (उत्कलमणिरित्याख्यः)\n(ख) लोकसेवकः (प्रसिद्धः लोकसेवकः)",
            "explanation": "श्लोके स्पष्टं वर्तते यत् सः उत्कलमणि-नाम्ना आख्यातः प्रसिद्धः लोकसेवकः च आसीत्।"
          },
          {
            "num": 2,
            "question": "II. पूर्णवाक्येन उत्तरत (Answer in a complete sentence):\n(क) अस्य श्लोकस्य अनुसारं गोपबन्धुः किमर्थं 'प्रणम्यः' अस्ति?\n(ख) 'गोपबन्धुर्महामनाः' इति पदस्य कः सन्धि-विच्छेदः भवति?",
            "questionSanskrit": "पूर्णवाक्येन उत्तरत:",
            "marks": 4,
            "type": "short_ans",
            "answer": "(क) अस्य श्लोकस्य अनुसारं गोपबन्धुः प्रसिद्धः लोकसेवकः, उदारहृदयः महामनाः, अनन्यः देशभक्तः च अस्ति, अतः सः सर्वैः प्रणम्यः (प्रणामयोग्यः) अस्ति।\n(ख) 'गोपबन्धुर्महामनाः' इत्यस्य सन्धि-विच्छेदः भवति — गोपबन्धुः + महामनाः (विसर्गस्य रेफः — रुत्वसन्धिः)।",
            "explanation": "श्लोकार्थस्य सन्धि-नियमस्य च विश्लेषणम्।"
          },
          {
            "num": 3,
            "question": "III. अन्वय-पूर्तिः (मञ्जूषा: प्रसिद्धः, गोपबन्धुः, लोकसेवकः, अयम्):\n\"उत्कलमणिः इति आख्याः (१) ______________ (२) ______________ , (३) ______________ महामनाः (४) ______________ देशभक्तः प्रणम्यः अस्ति।\"",
            "questionSanskrit": "मञ्जूषातः पदानि चित्वा अन्वयं पूरयत:",
            "marks": 4,
            "type": "fill",
            "answer": "(१) प्रसिद्धः; (२) लोकसेवकः; (३) अयम्; (४) गोपबन्धुः",
            "explanation": "श्लोकस्य व्यवस्थितः संस्कृत-अन्वयः।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: Conceptual Short Insight Verification",
        "sectionTitleSanskrit": "खण्डः \"ख\" · लघु-प्रश्नोत्तरी",
        "instructions": "Answer short conceptual questions based on Gopabandhu Das life and historical deeds:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 4,
            "question": "IV. लघु-प्रश्नोत्तरी (Short Biographical Check):\n१. ओड़िशा-राज्यस्य कस्य जनपदे महानद्यां भयङ्करः जलप्लावः (बाढ़) सम्भूतः?\n२. जलप्लावपीडितानां साहाय्यार्थं के सभागारे चर्चां कुर्वन्ति?\n३. गोपबन्धुः कस्य उपयोगं कर्तुं देशवासिनः प्रेरितवान्?\n४. यदा पुत्रः मरणासन्नः आसीत्, तदा गोपबन्धुः किं परित्यज्य जलप्लावपीडितानां सेवायै गतवान्?\n५. गोपबन्धुः कं विद्यालयं स्थापितवान् यत्र वृक्षाणाम् अधः पाठनं भवति स्म?",
            "questionSanskrit": "लघु-प्रश्नानाम् उत्तराणि लिखत:",
            "marks": 10,
            "type": "short_ans",
            "answer": "१. ओड़िशा-राज्यस्य केन्द्रापडा-जनपदे महानद्यां भयङ्करः जलप्लावः सम्भूतः।\n२. शिक्षकाः छात्राः च सभागारे जलप्लावपीडितानां साहाय्यार्थं चर्चां कुर्वन्ति।\n३. गोपबन्धुः स्वदेशीयानां वस्तूनां (स्वदेशवस्तूनाम्) उपयोगं कर्तुं देशवासिनः प्रेरितवान्।\n४. यदा पुत्रः मरणासन्नः आसीत्, तदा गोपबन्धुः पुत्रस्नेहं (पुत्रं) परित्यज्य सहस्राणां देशवासिनां जलप्लावपीडितानां च सेवायै अगच्छत्।\n५. गोपबन्धुः \"सत्यवादी-वनविद्यालयम्\" स्थापितवान्, यत्र वृक्षाणाम् अधः (छायायाम्) पाठनं भवति स्म।",
            "explanation": "पाठगत-महत्त्वपूर्ण-प्रश्नोत्तराणि।"
          }
        ]
      }
    ]
  },
  {
    "id": "ws-grade8-ch4-ws3",
    "title": "Worksheet 3: Past Active Participles (क्तवतु-प्रत्ययः)",
    "titleSanskrit": "चतुर्थः पाठः कार्यपत्रिका ३: भूतकालिक-कृदन्तः क्तवतु-प्रत्ययः",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "45 Mins",
    "description": "Mastering verb suffix mechanics with Ktavatu-Pratyaya, converting Lat-Lakara to Ktavatu, root deconstruction, and grammatical variants.",
    "sections": [
      {
        "sectionTitle": "Section A: Participle Sentence Upgrades (वाक्य-परिवर्तनम्)",
        "sectionTitleSanskrit": "खण्डः \"क\" · लट्-लकारात् क्तवतु-प्रत्यये परिवर्तनम्",
        "instructions": "Transform the following Present Tense (लट्-लकार) sentences into Past Active Participle (क्तवतु-प्रत्यय) forms based on Chapter 4 syntax.\n\nयथा: शिक्षकाः चर्चां कुर्वन्ति। ➔ शिक्षकाः चर्चां कृतवन्तः।",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "लट्-लकारस्य वाक्यानि क्तवतु-प्रत्ययेन परिवर्तयत:\n(क) छात्राः जलप्लाववार्तां शृण्वन्ति।\n(ख) सुधीरः स्वदेशवस्तूनां प्रयोगं करोति।\n(ग) अतिथयः आसनेषु उपविशन्ति।\n(घ) देशभक्ताः कारावासदुःखं सहन्ते।\n(ङ) अहं गोपबन्धोः जीवनीं पठामि।",
            "questionSanskrit": "क्तवतु-प्रत्ययेन वाक्यानि परिवर्तयत:",
            "marks": 10,
            "type": "short_ans",
            "answer": "(क) छात्राः जलप्लाववार्तां श्रुतवन्तः।\n(ख) सुधीरः स्वदेशवस्तूनां प्रयोगं कृतवान्।\n(ग) अतिथयः आसनेषु उपविष्टवन्तः।\n(घ) देशभक्ताः कारावासदुःखं सोढवन्तः (सहितवन्तः)।\n(ङ) अहं गोपबन्धोः जीवनीं पठितवान् (स्त्रीलिङ्गे: पठितवती)।",
            "explanation": "पुल्लिङ्गे एकवचने -वान् तथा बहुवचने -वन्तः इति क्तवतु-प्रत्ययरूपाणि भवन्ति।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: Morphological Component Slicing",
        "sectionTitleSanskrit": "खण्डः \"ख\" · धातु-प्रत्यय-विभागः शुद्ध-रूप-चयनं च",
        "instructions": "Split or combine root and participle suffixes, and select the correct grammatical variants:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 2,
            "question": "II. धातु-प्रत्यय विभागं कुरुत (Split or combine the Root + Ktavatu components):\n१. श्रु + क्तवतु (पुल्लिङ्ग-बहुवचनम्) ➔ _______________\n२. गम् + क्तवतु (पुल्लिङ्ग-एकवचनम्) ➔ _______________\n३. कृ + क्तवतु (पुल्लिङ्ग-बहुवचनम्) ➔ _______________\n४. उपदिष्टवान् ➔ ___________ + ___________ + ___________\n५. प्रफुल्लितवन्तः ➔ ___________ + ___________ + ___________",
            "questionSanskrit": "धातु-प्रत्ययौ पृथक् कुरुत योजयत वा:",
            "marks": 5,
            "type": "grammar",
            "answer": "१. श्रुतवन्तः\n२. गतवान्\n३. कृतवन्तः\n४. उप + दिश् + क्तवतु (पुल्लिङ्ग-एकवचनम्)\n५. प्र + फुल्ल (फुल्लित) + क्तवतु (पुल्लिङ्ग-बहुवचनम्)",
            "explanation": "धातोः क्तवतु-प्रत्यययोगेन भूतकालिक-रूपाणि निष्पद्यन्ते।"
          },
          {
            "num": 3,
            "question": "III. शुद्धं पदं चिनुत (Identify the grammatically correct Ktavatu variant):\n१. 'त्यज् + क्तवतु' इति योगे पुल्लिङ्गे किं पदं सिध्यति?\n(क) त्यक्तवान् (ख) त्यजितवान् (ग) त्याजवान्\n\n२. 'स्थापितवन्तः' इति पदे कः मूलधातुः अस्ति?\n(क) स्था (ख) स्थापि (ग) स्थित\n\n३. 'सहन्ते' इत्यस्य भूतकालवाचकं क्तवन्तरूपं किम्?\n(क) सोढवान् (ख) सहितवान् (ग) सहवान्",
            "questionSanskrit": "शुद्धं विकल्पं चिनुत:",
            "marks": 5,
            "type": "mcq",
            "answer": "१. (क) त्यक्तवान् (त्यज् + क्तवतु)\n२. (क) स्था (णिच्-प्रत्ययान्तः आधारः स्थापि + क्तवतु)\n३. (क) सोढवान् (बहुवचने सोढवन्तः / सहितवन्तः)",
            "explanation": "संस्कृतव्याकरणस्य धातुसाधित-क्तवतु-नियमाः।"
          }
        ]
      }
    ]
  },
  {
    "id": "ws-grade8-ch4-ws4",
    "title": "Worksheet 4: Advanced Compound Parsing & Splitting (विसर्गसन्धिः अवग्रह-नियमाः च)",
    "titleSanskrit": "चतुर्थः पाठः कार्यपत्रिका ४: विसर्गसन्धिः अवग्रह-नियमाः पदच्छेदः च",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "40 Mins",
    "description": "Phonetic junction mathematics with Visarga Utva (ओ), Purvarupa Avagraha (ऽ), and deconstruction of authentic Chapter 4 compounds.",
    "sections": [
      {
        "sectionTitle": "Section A: Structural Junction Math (सन्धिं कुरुत)",
        "sectionTitleSanskrit": "खण्डः \"क\" · सन्धिकार्यम्",
        "instructions": "Apply phonetic joining laws (Visarga to 'O' transformations and Avagraha placeholders) as tracked in Chapter 4:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "सन्धिं कुरुत:\n१. प्रणम्यः + अयम् ➔ ___________________________\n२. देशभक्तः + अयम् ➔ ___________________________\n३. बुभुक्षितः + अहम् ➔ ___________________________\n४. प्रसिद्धः + लोकसेवकः ➔ ___________________________\n५. गोपबन्धुः + अवदत् ➔ ___________________________\n६. कः + अपि ➔ ___________________________\n७. कोकिलः + अत्र ➔ ___________________________\n८. देवः + अयम् ➔ ___________________________\n९. कृतः + अहम् ➔ ___________________________\n१०. मनः + अभिलाषः ➔ ___________________________",
            "questionSanskrit": "सन्धिं कुरुत:",
            "marks": 10,
            "type": "grammar",
            "answer": "१. प्रणम्योऽयम्\n२. देशभक्तोऽयम्\n३. बुभुक्षितोऽहम्\n४. प्रसिद्धो लोकसेवकः\n५. गोपबन्धुरवदत् (वा गोपबन्धुः अवदत्)\n६. कोऽपि\n७. कोकिलोऽत्र\n८. देवोऽयम्\n९. कृतोऽहम्\n१०. मनोऽभिलाषः",
            "explanation": "अतो रोरप्लुतादप्लुते — विसर्गस्य उत्वं (ओ) तथा उत्तरपदस्थस्य 'अ'कारस्य अवग्रहः (ऽ)। हशि च इति सूत्रेण व्यञ्जने परे विसर्गस्य केवलम् उत्वं (ओ)।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: Deconstruction Operations (सन्धि-विच्छेदं कुरुत)",
        "sectionTitleSanskrit": "खण्डः \"ख\" · सन्धिविच्छेदः",
        "instructions": "Isolate the compound terms securely into their original, baseline components:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 2,
            "question": "सन्धि-विच्छेदं कुरुत:\n१. प्रणम्यो देशभक्तोऽयम् ➔ _________________ + _________________ + _________________\n२. भोजनस्यातिदौर्लभ्यम् ➔ _________________ + _________________\n३. कोऽरुक् ➔ _________________ + _________________\n४. उत्कलमणिरित्याख्यः ➔ _________________ + _________________ + _________________\n५. सोऽस्माकम् ➔ _________________ + _________________\n६. कोऽपि ➔ _________________ + _________________",
            "questionSanskrit": "सन्धि-विच्छेदं कुरुत:",
            "marks": 10,
            "type": "grammar",
            "answer": "१. प्रणम्यः + देशभक्तः + अयम्\n२. भोजनस्य + अतिदौर्लभ्यम् (दीर्घ-सन्धिः)\n३. कः + अरुक्\n४. उत्कलमणिः + इति + आख्यः (रुत्वसन्धिः यण्सन्धिः च)\n५. सः + अस्माकम्\n६. कः + अपि",
            "explanation": "संधियुक्तपदानां मूलपदेषु शुद्ध-विच्छेदः।"
          }
        ]
      }
    ]
  },
  {
    "id": "ws-grade8-ch4-ws5",
    "title": "Worksheet 5: Interrogative Question Engineering (प्रश्न-निर्माणम्)",
    "titleSanskrit": "चतुर्थः पाठः कार्यपत्रिका ५: किम्-शब्दरूपैः प्रश्न-निर्माणम्",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "40 Mins",
    "description": "Interrogative engineering via Kim-shabda case filters, pronoun substitution, and targeted query mapping on Chapter 4 statements.",
    "sections": [
      {
        "sectionTitle": "Section A: Pronoun Substitution Toggles",
        "sectionTitleSanskrit": "खण्डः \"क\" · रेखाङ्कितपदानि आधृत्य प्रश्ननिर्माणम्",
        "instructions": "Replace the underlined nouns with correct interrogative forms to transform statement sentences into questions:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "रेखाङ्कितपदानि आधृत्य प्रश्नवाक्यानि रचयत:\n१. <u>आचार्यहरिहरदासः</u> सर्वान् भोजनाय आमन्त्रितवान्।\n२. व्यञ्जनानि <u>कदलीपत्रेषु</u> परिवेषितानि सन्ति।\n३. गोपबन्धुः <u>भिक्षुकस्य कृते</u> सर्वं भोजनं दत्तवान्।\n४. ओड़िशा-राज्यस्य <u>केन्द्रापडा-जनपदे</u> जलप्लावः सम्भूतः।\n५. देशभक्ताः <u>स्वदेशवस्तूनाम्</u> उपयोगं कुर्वन्ति।",
            "questionSanskrit": "प्रश्नवाक्यानि रचयत:",
            "marks": 10,
            "type": "grammar",
            "answer": "१. कः सर्वान् भोजनाय आमन्त्रितवान्?\n२. व्यञ्जनानि केषु (कुत्र) परिवेषितानि सन्ति?\n३. गोपबन्धुः कस्य कृते (कस्मै) सर्वं भोजनं दत्तवान्?\n४. ओड़िशा-राज्यस्य कस्मिन् जनपदे (कुत्र) जलप्लावः सम्भूतः?\n५. देशभक्ताः केषाम् उपयोगं कुर्वन्ति?",
            "explanation": "आचार्यहरिहरदासः (पुं० प्रथमा एक० -> कः), कदलीपत्रेषु (नपुं० सप्तमी बहु० -> केषु), भिक्षुकस्य कृते (षष्ठी -> कस्य कृते), केन्द्रापडा-जनपदे (सप्तमी एक० -> कस्मिन् जनपदे / कुत्र), स्वदेशवस्तूनाम् (षष्ठी बहु० -> केषाम्)।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: Complex Target Query Mapping",
        "sectionTitleSanskrit": "खण्डः \"ख\" · विशिष्ट-प्रश्नानां रचना",
        "instructions": "Formulate targeted interrogative patterns using structural question values:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 2,
            "question": "वाक्येषु रेखाङ्कितपदानि आधृत्य प्रश्ननिर्माणं कुरुत:\n१. गोपबन्धोः जन्म <u>सुआण्डो-ग्रामे</u> अभवत्।\n२. सः <u>लोकसेवायै</u> स्वजीवनं समर्पितवान्।\n३. जलप्लावेन <u>वासगृहाणि</u> नष्टानि सञ्जातानि।\n४. सः <u>वर्षद्वयं</u> कारावासं व्यतीतवान्।",
            "questionSanskrit": "प्रश्ननिर्माणं कुरुत:",
            "marks": 10,
            "type": "grammar",
            "answer": "१. गोपबन्धोः जन्म कस्मिन् ग्रामे (कुत्र) अभवत्?\n२. सः कस्यै (किमर्थम्) स्वजीवनं समर्पितवान्?\n३. जलप्लावेन कानि नष्टानि सञ्जातानि?\n४. सः कियन्तं कालम् (कति वर्षाणि / किम्) कारावासं व्यतीतवान्?",
            "explanation": "सुआण्डो-ग्रामे (कुत्र / कस्मिन् ग्रामे), लोकसेवायै (चतुर्थी स्त्री० -> कस्यै / किमर्थम्), वासगृहाणि (प्रथमा बहु० नपुं० -> कानि), वर्षद्वयम् (कालवाचक -> कियन्तं कालम् / कति वर्षाणि)।"
          }
        ]
      }
    ]
  },

  // ==========================================
  // GRADE 8 CHAPTER 5 & 6 WORKSHEETS
  // ==========================================
  {
    "id": "ws-grade8-ch5-ws1",
    "title": "Worksheet 1: The Gita's Origin & Kurukshetra Dialogue (गीतायाः अवतारः कुरुक्षेत्र-संवादः च)",
    "titleSanskrit": "पञ्चमः पाठः कार्यपत्रिका १: गीतायाः अवतारः कुरुक्षेत्र-संवादः च",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "45 Mins",
    "description": "Extract-based textual comprehension on the Sri Gita Jayanti festival dialogue at Kurukshetra, the historic context of the battle, Lord Krishna instructing Arjuna, and textual verification.",
    "sections": [
      {
        "sectionTitle": "Section A: Extract-Based Questions (पठित-अवबोधनम्)",
        "sectionTitleSanskrit": "खण्डः \"क\" · पठित-अवबोधनम्",
        "instructions": "Read the dialogue extract below and answer the questions that follow:\n\n\"कुरुक्षेत्रे श्रीगीता-जयन्ती-महोत्सवः आचरितः। तत्र बहवः जनाः अगच्छन्। रमेशः अपि स्वजनकेन सह तत्र गतवान्। कथावाचकः गीतायाः विषये वर्णयति स्म – 'गीता सुगीता कर्तव्या किमन्यैः शास्त्रविस्तरैः। या स्वयं पद्मनाभस्य मुखपद्माद्विनिःसृता॥' इदं श्रुत्वा रमेशः पितरम् अपृच्छत् – 'पितः! गीता का? कथं सुगीता कर्तव्या?' पिता अवदत् – 'पुत्र! बहुभ्यः वर्षेभ्यः पूर्वं कुरुक्षेत्रे कौरवाणां पाण्डवानां च मध्ये सङ्ग्रामः अभवत्। तस्मिन् युद्धे स्वबान्धवान् दृष्ट्वा अर्जुनः युद्धं कर्तुं न इच्छति स्म। तदा भगवान् श्रीकृष्णः अर्जुनं कुरुक्षेत्रस्य युद्धभूमौ यत् उपदिष्टवान्, सा एव श्रीमद्भगवद्गीता अस्ति।'\"",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "I. एकपदेन उत्तरत (Answer in a single word):\n(क) कुरुक्षेत्रे कः उत्सवः आचरितः?\n(ख) गीता कस्य मुखपद्मात् विनिःसृता अस्ति?",
            "questionSanskrit": "एकपदेन उत्तरत:",
            "marks": 2,
            "type": "short_ans",
            "answer": "(क) श्रीगीता-जयन्ती-महोत्सवः\n(ख) पद्मनाभस्य (श्रीकृष्णस्य / विष्णोः)",
            "explanation": "गद्यांशानुसारं कुरुक्षेत्रे गीताजयन्तीमहोत्सवः आचरितः तथा सा स्वयं पद्मनाभस्य मुखात् निःसृता।"
          },
          {
            "num": 2,
            "question": "II. पूर्णवाक्येन उत्तरत (Answer in a complete sentence):\n(क) युद्धभूमौ अर्जुनः किमर्थं युद्धं कर्तुं न इच्छति स्म?\n(ख) श्रीमद्भगवद्गीता का अस्ति?",
            "questionSanskrit": "पूर्णवाक्येन उत्तरत:",
            "marks": 4,
            "type": "short_ans",
            "answer": "(क) युद्धभूमौ स्वबान्धवान् दृष्ट्वा अर्जुनः युद्धं कर्तुं न इच्छति स्म।\n(ख) कुरुक्षेत्रस्य युद्धभूमौ भगवान् श्रीकृष्णः अर्जुनं यत् उपदिष्टवान्, सा एव श्रीमद्भगवद्गीता अस्ति।",
            "explanation": "गद्यांशे पिता रमेशं प्रति अर्जुनस्य मोहं श्रीकृष्णस्य उपदेशं च वर्णयति।"
          },
          {
            "num": 3,
            "question": "III. भाषिककार्यम् (Grammar & Language items based on text):\n१. 'अगच्छन्' इति क्रियापदस्य कर्तृपदं किम्?\n(क) रमेशः (ख) जनाः (ग) पिता (घ) उत्सवः\n\n२. 'शास्त्रविस्तरैः' इति पदे का विभक्तिः किं वचनम्?\n(क) तृतीया बहुवचनम् (ख) पञ्चमी एकवचनम् (ग) द्वितीया बहुवचनम्\n\n३. 'दृष्ट्वा' इति पदे कः धातुः कश्च प्रत्ययः?\n(क) दृश् + क्त्वा (ख) दृश् + ल्यप् (ग) दृश् + तुमुन्\n\n४. 'विनिःसृता' इति पदस्य कः अर्थः?\n(क) प्रविष्टा (ख) समाप्ता (ग) निर्गता (बाहर निकली हुई)",
            "questionSanskrit": "निर्देशानुसारम् उत्तरत:",
            "marks": 4,
            "type": "mcq",
            "answer": "१. (ख) जनाः\n२. (क) तृतीया बहुवचनम्\n३. (क) दृश् + क्त्वा\n४. (ग) निर्गता (बाहर निकली हुई)",
            "explanation": "बहवः जनाः अगच्छन् (कर्तृपदं जनाः); शास्त्रविस्तरैः (रामेण रामैः - तृतीया बहु०); दृश् + क्त्वा = दृष्ट्वा; विनिःसृता = निर्गता / प्रकटीभूता।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: Fact Verification & Textual Sentence Formations",
        "sectionTitleSanskrit": "खण्डः \"ख\" · तथ्य-परीक्षणं रिक्तस्थानपूर्तिः च",
        "instructions": "Verify chapter facts and complete statements using contextual terms:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 4,
            "question": "IV. मञ्जूषातः पदानि चित्वा रिक्तस्थानानि पूरयत:\nमञ्जूषा: [पद्मनाभस्य, कुरुक्षेत्रे, श्रीकृष्णः, सुगीता, अनुपालनीयाः]\n१. बहुभ्यः वर्षेभ्यः पूर्वं ______________ कौरव-पाण्डवानां सङ्ग्रामः अभवत्।\n२. गीता स्वयं ______________ मुखपद्मात् विनिःसृता अस्ति।\n३. रणभूमौ मोहग्रस्तम् अर्जुनं भगवान् ______________ उपदिष्टवान्।\n४. गीता सम्यक् रूपेण ______________ कर्तव्या।\n५. जीवनक्षेत्रे कार्यक्षेत्रे च गीतायाः उपदेशाः ______________।",
            "questionSanskrit": "रिक्तस्थानानि पूरयत:",
            "marks": 5,
            "type": "fill",
            "answer": "१. कुरुक्षेत्रे; २. पद्मनाभस्य; ३. श्रीकृष्णः; ४. सुगीता; ५. अनुपालनीयाः",
            "explanation": "पाठस्य परिचयात्मक-संवादस्य आधारेण रिक्तस्थानपूर्तिः।"
          },
          {
            "num": 5,
            "question": "V. शुद्धम् अशुद्धं वा लिखत (Write True or False):\n१. रमेशः स्वमित्रैः सह गीताजयन्ती-महोत्सवं गतवान्।\n२. गीता साक्षात् भगवतः विष्णोः मुखकमलात् निर्गता अस्ति।\n३. अर्जुनेन सह युद्धं कर्तुं श्रीकृष्णः शस्त्रं गृहीतवान्।\n४. 'सुगीता कर्तव्या' इत्यस्य आशयः यत् गीतायाः उपदेशाः जीवने अनुपालनीयाः।\n५. गीतायाः पाठेन सर्वशास्त्राणां सारः लभ्यते।",
            "questionSanskrit": "कथनानां समक्षं शुद्धम् / अशुद्धम् इति लिखत:",
            "marks": 5,
            "type": "short_ans",
            "answer": "१. अशुद्धम् (रमेशः स्वजनकेन सह गतवान्)\n२. शुद्धम्\n३. अशुद्धम् (श्रीकृष्णः उपदेशं दत्तवान्, युद्धं न अकरोत्)\n४. शुद्धम्\n५. शुद्धम्",
            "explanation": "संवादानुसारं रमेशः जनकेन सह अगच्छत् तथा श्रीकृष्णः केवलम् अर्जुनम् उपदिष्टवान्।"
          }
        ]
      }
    ]
  },
  {
    "id": "ws-grade8-ch5-ws2",
    "title": "Worksheet 2: Shloka Analysis, Anvaya & Word Order (श्लोकार्थावबोधनम् अन्वय-रचना च)",
    "titleSanskrit": "पञ्चमः पाठः कार्यपत्रिका २: श्लोकार्थावबोधनम् अन्वय-रचना च",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "45 Mins",
    "description": "Comprehensive prose-order (Anvaya) reconstruction, Shloka comprehension, and matching of couplet halves from core Gita verses.",
    "sections": [
      {
        "sectionTitle": "Section A: Anvaya Reconstruction (अन्वय-पूर्तिः)",
        "sectionTitleSanskrit": "खण्डः \"क\" · अन्वय-पूर्तिः",
        "instructions": "Fill in the blanks of the Anvaya using the provided word-banks:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "I. श्लोकस्य अन्वयपूर्तिं मञ्जूषातः पदानि चित्वा कुरुत:\nश्लोकः: 'श्रद्धावांल्लभते ज्ञानं तत्परः संयतेन्द्रियः । ज्ञानं लब्ध्वा परां शान्तिमचिरेणाधिगच्छति ॥'\n\nअन्वयः: तत्परः (१) ______________ (च) (२) ______________ ज्ञानं लभते। ज्ञानं (३) ______________ (सः) (४) ______________ परां (५) ______________ अधिगच्छति।\n\nमञ्जूषा: [लब्ध्वा, शान्तिम्, संयतेन्द्रियः, श्रद्धावान्, अचिरेण]",
            "questionSanskrit": "अन्वयपूर्तिं कुरुत:",
            "marks": 5,
            "type": "fill",
            "answer": "(१) संयतेन्द्रियः, (२) श्रद्धावान्, (३) लब्ध्वा, (४) अचिरेण, (५) शान्तिम्",
            "explanation": "तत्परः संयतेन्द्रियः श्रद्धावान् ज्ञानं लभते, ज्ञानं लब्ध्वा अचिरेण परां शान्तिमधिगच्छति।"
          },
          {
            "num": 2,
            "question": "II. श्लोकस्य अन्वयपूर्तिं मञ्जूषातः पदानि चित्वा कुरुत:\nश्लोकः: 'तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया । उपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ॥'\n\nअन्वयः: (१) ______________, परिप्रश्नेन, (२) ______________ (च) तत् (३) ______________। (४) ______________ ज्ञानिनः ते ज्ञानम् (५) ______________।\n\nमञ्जूषा: [विद्धि, प्रणिपातेन, उपदेक्ष्यन्ति, सेवया, तत्त्वदर्शिनः]",
            "questionSanskrit": "अन्वयपूर्तिं कुरुत:",
            "marks": 5,
            "type": "fill",
            "answer": "(१) प्रणिपातेन, (२) सेवया, (३) विद्धि, (४) तत्त्वदर्शिनः, (५) उपदेक्ष्यन्ति",
            "explanation": "प्रणिपातेन परिप्रश्नेन सेवया तत् विद्धि, तत्त्वदर्शिनः ज्ञानिनः ते ज्ञानम् उपदेक्ष्यन्ति।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: Shloka Matching & Conceptual Questions",
        "sectionTitleSanskrit": "खण्डः \"ख\" · श्लोकांश-मेलनं भावार्थ-प्रश्नाः च",
        "instructions": "Match the verses and articulate the inner wisdom of the Bhagavad Gita:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 3,
            "question": "III. श्लोकांशान् परस्परं योजयत (Match the Shloka halves):\nस्तम्भः 'क'                                    स्तम्भः 'ख'\n१. गीता सुगीता कर्तव्या                      (क) तत्परः संयतेन्द्रियः\n२. या स्वयं पद्मनाभस्य                       (ख) किमन्यैः शास्त्रविस्तरैः\n३. श्रद्धावांल्लभते ज्ञानं                     (ग) ज्ञानिनस्तत्त्वदर्शिनः\n४. ज्ञानं लब्ध्वा परां                          (घ) मुखपद्माद्विनिःसृता\n५. उपदेक्ष्यन्ति ते ज्ञानं                       (ङ) शान्तिमचिरेणाधिगच्छति",
            "questionSanskrit": "स्तम्भ-मेलनं कुरुत:",
            "marks": 5,
            "type": "matching",
            "answer": "१ ➔ (ख) किमन्यैः शास्त्रविस्तरैः\n२ ➔ (घ) मुखपद्माद्विनिःसृता\n३ ➔ (क) तत्परः संयतेन्द्रियः\n४ ➔ (ङ) शान्तिमचिरेणाधिगच्छति\n५ ➔ (ग) ज्ञानिनस्तत्त्वदर्शिनः",
            "explanation": "मूलश्लोकानुसारेण चरणानां सम्यक् योजनम्।"
          },
          {
            "num": 4,
            "question": "IV. लघूत्तराणि लिखत (Answer briefly in Sanskrit or Hindi):\n(क) तत्त्वदर्शिभ्यः गुरुभ्यः ज्ञानप्राप्तये त्रयः उपायाः के सन्ति?\n(ख) ज्ञानं प्राप्य मनुष्यः कीदृशीं शान्तिं कस्मिन् काले अधिगच्छति?",
            "questionSanskrit": "प्रश्नानाम् उत्तराणि लिखत:",
            "marks": 5,
            "type": "short_ans",
            "answer": "(क) ज्ञानप्राप्तये त्रयः उपायाः सन्ति — प्रणिपातः (दण्डवत् प्रणामः), परिप्रश्नः (विनम्र जिज्ञासा), सेवा (निष्कपट गुरुसेवा) च।\n(ख) ज्ञानं प्राप्य मनुष्यः 'अचिरेण' (शीघ्रमेव) 'परां शान्तिम्' (मोक्षाख्यां परमशान्तिम्) अधिगच्छति।",
            "explanation": "श्लोक ३ एवं श्लोक २ आधारेण तात्त्विकोत्तराणि।"
          }
        ]
      }
    ]
  },
  {
    "id": "ws-grade8-ch5-ws3",
    "title": "Worksheet 3: Sthitadhi & The Ladder of Downfall (स्थितधी-लक्षणानि पतन-शृङ्खला च)",
    "titleSanskrit": "पञ्चमः पाठः कार्यपत्रिका ३: स्थितधी-लक्षणानि पतन-शृङ्खला च",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "45 Mins",
    "description": "In-depth study of the Sthitaprajna (sage of steady wisdom), the psychology of sensory restraint, and the step-by-step causal chain from anger to destruction.",
    "sections": [
      {
        "sectionTitle": "Section A: Hallmarks of Sthitadhi (स्थितप्रज्ञस्य गुणाः)",
        "sectionTitleSanskrit": "खण्डः \"क\" · स्थितप्रज्ञस्य गुणाः",
        "instructions": "Analyze Shlokas 4 and 6 to answer the following questions on steady intellect:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "I. श्लोकम् आधृत्य उत्तराणि लिखत:\n'दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः ।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते ॥'\n\n(क) एकपदेन उत्तरत: दुःखेषु मुनेः मनः कीदृशं भवति?\n(ख) एकपदेन उत्तरत: सुखेषु मुनिः कीदृशः भवति?\n(ग) पूर्णवाक्येन उत्तरत: स्थितधीः मुनिः कः उच्यते?\n(घ) विलोमपदं चिनुत: 'सुखेषु' इति पदस्य विलोमपदं श्लोकात् किम्?\n(ङ) सन्धिविच्छेदं कुरुत: 'स्थितधीर्मुनिरुच्यते' = स्थितधीः + ______________ + ______________।",
            "questionSanskrit": "श्लोकाधारित-प्रश्नोत्तरी:",
            "marks": 5,
            "type": "short_ans",
            "answer": "(क) अनुद्विग्नमनाः (उद्वेगरहितम्)\n(ख) विगतस्पृहः (निस्पृहः / कामनारहितः)\n(ग) यः दुःखेषु अनुद्विग्नमनाः, सुखेषु विगतस्पृहः, राग-भय-क्रोधेभ्यः च मुक्तः वर्तते, सः मुनिः 'स्थितधीः' उच्यते।\n(घ) दुःखेषु\n(ङ) मुनिः + उच्यते (विसर्गस्य रेफः)",
            "explanation": "श्लोक ४ आधारेण स्थितप्रज्ञस्य त्रयः मूलगुणाः निरूपिताः सन्ति।"
          },
          {
            "num": 2,
            "question": "II. श्लोकम् आधृत्य उत्तराणि लिखत:\n'यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः ।\nहर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः ॥'\n\n(क) भगवतः प्रियः भक्तः कः भवति?\n(ख) 'नोद्विजते' इत्यत्र कः सन्धिः अस्ति?\n(ग) 'अमर्षः' इति पदस्य कः अर्थः?",
            "questionSanskrit": "श्लोक-अवबोधनम्:",
            "marks": 5,
            "type": "short_ans",
            "answer": "(क) यस्मात् लोकः न उद्विजते, यः च लोकात् न उद्विजते, यः च हर्ष-ईर्ष्या-भय-उद्वेगैः मुक्तः अस्ति, सः भगवतः प्रियः भवति।\n(ख) न + उद्विजते = नोद्विजते (आद्गुणः — गुणसन्धिः)।\n(ग) अमर्षः = ईर्ष्या / असहनशीलता (Envy / Intolerance)।",
            "explanation": "श्लोक ६ आधारेण प्रियभक्तस्य आन्तरिक-बाह्य-संतुलनं प्रतिपादितम्।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: The Downfall Sequence & Mental Health",
        "sectionTitleSanskrit": "खण्डः \"ख\" · पतन-शृङ्खलायाः विश्लेषणम्",
        "instructions": "Master the causal chain of mental destruction detailed in Gita 2.63:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 3,
            "question": "III. क्रमिक-विनाश-शृङ्खलां पूरयत (Complete the Downfall Sequence):\n'क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः ।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥'\n\n१. क्रोधात् जायते ➔ ______________\n२. सम्मोहात् उत्पद्यते ➔ ______________\n३. स्मृतिविभ्रमात् भवति ➔ ______________\n४. बुद्धिनाशात् मनुष्यः ➔ ______________",
            "questionSanskrit": "शृङ्खला-पूर्तिः:",
            "marks": 4,
            "type": "fill",
            "answer": "१. सम्मोहः (अविवेकः / मूढ़ता); २. स्मृतिविभ्रमः (याददाश्त का भ्रम); ३. बुद्धिनाशः (विवेकस्य हननम्); ४. प्रणश्यति (सर्वनाशं प्राप्नोति)।",
            "explanation": "क्रोध ➔ सम्मोह ➔ स्मृतिभ्रंश ➔ बुद्धिनाश ➔ पूर्ण विनाश।"
          },
          {
            "num": 4,
            "question": "IV. विमर्शात्मक-प्रश्नाः (Analytical Short Answer):\n'बुद्धिनाशात् प्रणश्यति' — अस्य सन्देशस्य आधुनिक-जीवने छात्रेभ्यः किं महत्त्वम् अस्ति? (What is the practical lesson of this causal destruction chain for students in modern life? Explain in 3-4 lines).",
            "questionSanskrit": "सन्देशस्य महत्त्वं लिखत:",
            "marks": 6,
            "type": "short_ans",
            "answer": "क्रोधेन विवेकः नश्यति। यदा कोपवशात् मनुष्यस्य बुद्धिः निर्णयं कर्तुम् असमर्था भवति, तदा सः अनुचितं कार्यं कृत्वा स्वस्य जीवनं लक्ष्यं च नाशयति। अतः छात्रैः क्रोधः त्यक्तव्यः, शान्तमनसा विवेकपूर्वकं च निर्णयः करणीयः। (Controlling anger preserves memory and intellectual clarity, preventing impulsive failure).",
            "explanation": "गीतायाः शिक्षायाः व्यावहारिक-जीवन-प्रयोगः।"
          }
        ]
      }
    ]
  },
  {
    "id": "ws-grade8-ch5-ws4",
    "title": "Worksheet 4: Vangmaya Tapa & Speech Ethics (वाङ्मयं तपः वाणी-संयमः च)",
    "titleSanskrit": "पञ्चमः पाठः कार्यपत्रिका ४: वाङ्मयं तपः वाणी-संयमः च",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "40 Mins",
    "description": "Exploration of right speech (Satyam, Priyam, Hitam, Anudvegakaram), scripture recitation as verbal austerity, vocabulary mastery, and antonym pairings.",
    "sections": [
      {
        "sectionTitle": "Section A: The Four Pillars of Right Speech (वाचः चत्वारि लक्षणानि)",
        "sectionTitleSanskrit": "खण्डः \"क\" · वाङ्मयं तपः",
        "instructions": "Examine Shloka 7 on vocal austerity and answer the related questions:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "I. श्लोकम् आधृत्य प्रश्नान् उत्तरत:\n'अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत् ।\nस्वाध्यायाभ्यसनं चैव वाङ्मयं तप उच्यते ॥'\n\n(क) एकपदेन उत्तरत: वाणी-तपसः अनुसारं वाक्यं कीदृशं भवेत्? (यत् कष्टं न जनयति)\n(ख) एकपदेन उत्तरत: प्रतिदिनं कस्य अभ्यासेन वाङ्मयं तपः सिध्यति?\n(ग) पूर्णवाक्येन उत्तरत: वाङ्मयस्य तपसः चत्वारि प्रमुख-लक्षणानि कानि?\n(घ) सन्धिविच्छेदं कुरुत: 'स्वाध्यायाभ्यसनम्' = ______________ + ______________।\n(ङ) 'वाङ्मयम्' इत्यस्य कः सन्धिविच्छेदः? (वाक् + मयम् / वाग् + मयम्)",
            "questionSanskrit": "श्लोकाधारित-प्रश्नाः:",
            "marks": 5,
            "type": "short_ans",
            "answer": "(क) अनुद्वेगकरम्\n(ख) स्वाध्यायस्य (स्वाध्यायाभ्यसनम्)\n(ग) वाङ्मय-तपसः चत्वारि लक्षणानि सन्ति — १. अनुद्वेगकरत्वम्, २. सत्यत्वम्, ३. प्रियत्वम्, ४. हितकारित्वम् (तथा स्वाध्यायाभ्यासः)।\n(घ) स्वाध्याय + अभ्यसनम् (सवर्णदीर्घसन्धिः)\n(ङ) वाक् + मयम् (अनुनासिकसन्धिः / यरोऽनुनासिकेऽनुनासिको वा)",
            "explanation": "गीता १७.१५ आधारेण सत्य-प्रिय-हित-अनुद्वेगकर-वचनानां व्याख्या।"
          },
          {
            "num": 2,
            "question": "II. सत्य-भाषणस्य प्रिय-भाषणस्य च सामञ्जस्यम् (Ethical Synthesis):\nयत् सत्यम् अस्ति किन्तु कटु (अप्रियम्) अस्ति, अथवा यत् प्रियम् अस्ति किन्तु असत्यम् अस्ति — किं तत् वक्तव्यम्? गीतानुसारं वाणी कीदृशी भवेत्?\n(Explain how speech must balance truth and pleasantness according to Indian ethics and Shloka 7).",
            "questionSanskrit": "नैतिक-सामञ्जस्यं लिखत:",
            "marks": 5,
            "type": "short_ans",
            "answer": "गीतायाम् उक्तम् यत् वाक्यं 'सत्यं प्रियहितं च' भवेत्। केवलं कटुसत्यं यत् परेषां चित्ते उद्वेगं जनयति, अथवा केवलं प्रियं यत् असत्यम् अस्ति (चाटुकारिता), तत् वाणी-तपः न भवति। सत्यं प्रियं हितकरम् अनुद्वेगकरं च वचनमेव वास्तविकं वाङ्मयं तपः अस्ति।",
            "explanation": "सत्यं ब्रूयात् प्रियं ब्रूयात् न ब्रूयात् सत्यमप्रियम् इति नीतिवचनस्य गीतायाः च समन्वयः।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: Antonyms & Word-Pair Formations",
        "sectionTitleSanskrit": "खण्डः \"ख\" · विलोमपदानि शब्दरूपाणि च",
        "instructions": "Match textbook antonym pairs and formulate sentences:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 3,
            "question": "III. विलोमपदानां परस्परं मेलनं कुरुत (Match Antonyms from Page 58):\nस्तम्भः 'क'                           स्तम्भः 'ख'\n१. अचिरेण                          (क) असत्यम्\n२. शान्तिम्                         (ख) दुःखेषु\n३. ज्ञानम्                          (ग) चिरेण\n४. प्रियः                           (घ) अशान्तिम्\n५. सत्यम्                          (ङ) अप्रियः\n६. सुखेषु                          (च) अज्ञानम्",
            "questionSanskrit": "विलोमपदानि योजयत:",
            "marks": 6,
            "type": "matching",
            "answer": "१ ➔ (ग) चिरेण\n२ ➔ (घ) अशान्तिम्\n३ ➔ (च) अज्ञानम्\n४ ➔ (ङ) अप्रियः\n५ ➔ (क) असत्यम्\n६ ➔ (ख) दुःखेषु",
            "explanation": "पाठ्यपुस्तकस्य पृष्ठ ५८ आधारेण शुद्ध-विलोमपद-मेलनम्।"
          },
          {
            "num": 4,
            "question": "IV. वाक्येषु प्रयोगं कुरुत (Make meaningful Sanskrit sentences):\n(क) श्रद्धावान्\n(ख) स्वाध्यायः",
            "questionSanskrit": "पदानां वाक्यप्रयोगं कुरुत:",
            "marks": 4,
            "type": "short_ans",
            "answer": "(क) श्रद्धावान् — श्रद्धावान् छात्रः गुरोः सकाशे विद्यां लभते।\n(ख) स्वाध्यायः — छात्रैः प्रतिदिनं सद्ग्रन्थानां स्वाध्यायः करणीयः।",
            "explanation": "सार्थक-संस्कृतवाक्यरचना।"
          }
        ]
      }
    ]
  },
  {
    "id": "ws-grade8-ch5-ws5",
    "title": "Worksheet 5: Comprehensive Grammar & Question Construction (व्याकरण-कौशलम् सन्धिः प्रत्ययाः प्रश्ननिर्माणं च)",
    "titleSanskrit": "पञ्चमः पाठः कार्यपत्रिका ५: व्याकरण-कौशलम् सन्धिः प्रत्ययाः प्रश्ननिर्माणं च",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "45 Mins",
    "description": "Rigorous drill on Sandhi formulas (Visarga Utva, Jashtva, Savarna Dirgha), participle isolation (Tavyat, Ktva, Kta), and question formation (प्रश्ननिर्माणम्).",
    "sections": [
      {
        "sectionTitle": "Section A: Sandhi & Participle Dissection",
        "sectionTitleSanskrit": "खण्डः \"क\" · सन्धिः प्रत्ययाः च",
        "instructions": "Execute accurate phonetic sandhi operations and isolate suffixes:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "I. सन्धिं सन्धिविच्छेदं वा कुरुत (Execute Sandhi or Disjunction):\n१. बुभुक्षितः + अहम् = ______________\n२. मुखपद्मात् + विनिःसृता = ______________\n३. स्वाध्याय + अभ्यसनम् = ______________\n४. न + उद्विजते = ______________\n५. मुनिः + उच्यते = ______________",
            "questionSanskrit": "सन्धिकार्यं कुरुत:",
            "marks": 5,
            "type": "fill",
            "answer": "१. बुभुक्षितोऽहम् (उत्वं पूर्वरूपं च)\n२. मुखपद्माद्विनिःसृता (जश्त्वसन्धिः)\n३. स्वाध्यायाभ्यसनम् (सवर्णदीर्घसन्धिः)\n४. नोद्विजते (गुणसन्धिः)\n५. मुनिरुच्यते (रुत्वसन्धिः)",
            "explanation": "पाठ्यपुस्तकस्य पृष्ठ ५८ व्याकरण-नियमानाम् अभ्यासः।"
          },
          {
            "num": 2,
            "question": "II. प्रकृति-प्रत्यय-विभागं कुरुत (Isolate Root & Affix):\n१. 'कर्तव्या' = ______________ + ______________ + ______________\n२. 'लब्ध्वा' = ______________ + ______________\n३. 'विनिःसृता' = वि + निः + ______________ + ______________ + टाप्\n४. 'पठितव्या' = ______________ + ______________ + टाप्\n५. 'अनुपालनीयाः' = अनु + पाल् + ______________ + जस्",
            "questionSanskrit": "प्रकृति-प्रत्ययौ पृथक् कुरुत:",
            "marks": 5,
            "type": "fill",
            "answer": "१. कृ + तव्यत् + टाप्\n२. लभ् + क्त्वा\n३. सृ + क्त + टाप्\n४. पठ् + तव्यत् + टाप्\n५. अनीयर्",
            "explanation": "कृदन्तप्रत्ययानां शुद्धं पृथक्करणम्।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: Interrogative Engineering (प्रश्ननिर्माणम्)",
        "sectionTitleSanskrit": "खण्डः \"ख\" · प्रश्ननिर्माणम्",
        "instructions": "Replace the underlined nouns with grammatically matching Kim-shabda forms:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 3,
            "question": "III. रेखाङ्कितपदानि आधृत्य प्रश्नवाक्यानि रचयत:\n१. <u>श्रद्धावान्</u> ज्ञानं लभते।\n२. गीता <u>पद्मनाभस्य</u> मुखपद्मात् विनिःसृता।\n३. तत्त्वदर्शिनः <u>ज्ञानं</u> उपदेक्ष्यन्ति।\n४. मुनिः <u>दुःखेषु</u> अनुद्विग्नमनाः भवति।\n५. <u>क्रोधात्</u> सम्मोहः जायते।",
            "questionSanskrit": "प्रश्नवाक्यानि रचयत:",
            "marks": 10,
            "type": "grammar",
            "answer": "१. कः ज्ञानं लभते?\n२. गीता कस्य मुखपद्मात् विनिःसृता?\n३. तत्त्वदर्शिनः किम् उपदेक्ष्यन्ति?\n४. मुनिः केषु (कदा / कुत्र) अनुद्विग्नमनाः भवति?\n५. कस्मात् सम्मोहः जायते?",
            "explanation": "श्रद्धावान् (प्रथमा एक० -> कः); पद्मनाभस्य (षष्ठी एक० -> कस्य); ज्ञानम् (द्वितीया एक० -> किम्); दुःखेषु (सप्तमी बहु० -> केषु); क्रोधात् (पञ्चमी एक० -> कस्मात्)।"
          }
        ]
      }
    ]
  },
  {
    "id": "ws-grade8-ch6-ws1",
    "title": "Worksheet 1: Evolution from Palm Leaves to Digital India (तालपत्रात् डिजिभारतं यावत् विकासयात्रा)",
    "titleSanskrit": "षष्ठः पाठः कार्यपत्रिका १: तालपत्रात् डिजिभारतं यावत् विकासयात्रा",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "45 Mins",
    "description": "Comprehensive reading of the technological leap: oral tradition, palm leaves, paper, typewriter, computer revolution, and modern technical terminology.",
    "sections": [
      {
        "sectionTitle": "Section A: Prose Comprehension (पठित-अवबोधनम्)",
        "sectionTitleSanskrit": "खण्डः \"क\" · पठित-अवबोधनम्",
        "instructions": "Read the passage below carefully and answer the questions that follow:\n\n\"अद्य सम्पूर्णविश्वे 'डिजिभारतम्' (Digital India) इत्यस्य चर्चा श्रूयते। अस्य पदस्य कः भावः इति मनसि जिज्ञासा उत्पद्यते। कालपरिवर्तनेन सह मानवस्य आवश्यकता अपि परिवर्तते। प्राचीनकाले ज्ञानस्य आदान-प्रदानं मौखिकम् आसीत्, विद्या च श्रुतिपरम्परया गृह्यते स्म। अनन्तरं तालपत्रोपरि भोजपत्रोपरि च लेखनकार्यम् आरब्धम्। परिवर्तिनि काले कर्गदस्य लेखन्याः च आविष्कारेण सर्वेषामेव मनोगतानां भावानां कर्गदोपरि लेखनं प्रारब्धम्। टङ्कणयन्त्रस्य आविष्कारेण तु लिखिता सामग्री टङ्किता सती बहुकालाय सुरक्षिता अतिष्ठत्। वैज्ञानिकप्रविधेः प्रगतियात्रा पुनः अग्रे गता। अद्य सर्वाणि कार्याणि सङ्गणकनामकेन यन्त्रेण साधितानि भवन्ति।\"",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "I. एकपदेन उत्तरत (Answer in a single word):\n(क) सम्पूर्णविश्वे कस्य चर्चा श्रूयते?\n(ख) अद्य सर्वाणि कार्याणि केन यन्त्रेण साधितानि भवन्ति?",
            "questionSanskrit": "एकपदेन उत्तरत:",
            "marks": 2,
            "type": "short_ans",
            "answer": "(क) 'डिजिभारतम्' (Digital India) इत्यस्य\n(ख) सङ्गणकनामकेन (कम्प्यूटर यन्त्रेण)",
            "explanation": "गद्यांशे स्पष्टम् उल्लिखितम् यत् डिजिभारतस्य चर्चा श्रूयते तथा कार्याणि सङ्गणकेन साधितानि भवन्ति।"
          },
          {
            "num": 2,
            "question": "II. पूर्णवाक्येन उत्तरत (Answer in a complete sentence):\n(क) प्राचीनकाले विद्या कथं गृह्यते स्म?\n(ख) टङ्कणयन्त्रस्य आविष्कारेण कः लाभः जातः?",
            "questionSanskrit": "पूर्णवाक्येन उत्तरत:",
            "marks": 4,
            "type": "short_ans",
            "answer": "(क) प्राचीनकाले ज्ञानस्य आदान-प्रदानं मौखिकम् आसीत्, विद्या च श्रुतिपरम्परया गृह्यते स्म।\n(ख) टङ्कणयन्त्रस्य आविष्कारेण लिखिता सामग्री टङ्किता सती बहुकालाय सुरक्षिता अतिष्ठत्।",
            "explanation": "गद्यांशानुसारं श्रुतिपरम्परायाः टङ्कणयन्त्रस्य च ऐतिहासिकं विवरणम्।"
          },
          {
            "num": 3,
            "question": "III. भाषिककार्यम् (Language & Grammar Items):\n१. 'श्रूयते' इति क्रियापदं कस्मिन् वाच्ये अस्ति?\n(क) कर्मवाच्ये (ख) कर्तृवाच्ये (ग) भाववाच्ये\n\n२. 'सर्वाणि कार्याणि' इत्यत्र विशेषणपदं किम्?\n(क) कार्याणि (ख) सर्वाणि (ग) सङ्गणकनामकेन\n\n३. 'आरब्धम्' इति पदे कः प्रत्ययः?\n(क) क्तवतु (ख) क्त (ग) क्त्वा (घ) तुमुन्\n\n४. 'प्राचीनकाले' इति पदस्य विलोमपदं गद्यांशात् चिनुत:\n(क) सम्पूर्णविश्वे (ख) परिवर्तिनि काले (आधुनिककाले) (ग) अनन्तरम्",
            "questionSanskrit": "निर्देशानुसारं विकल्पं चिनुत:",
            "marks": 4,
            "type": "mcq",
            "answer": "१. (क) कर्मवाच्ये (श्रु + यक् + ते)\n२. (ख) सर्वाणि\n३. (ख) क्त (आ + रभ् + क्त)\n४. (ख) परिवर्तिनि काले (आधुनिककाले)",
            "explanation": "शुद्ध-व्याकरण-नियमाः।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: Modern Technical Lexicon & Cloze Exercise",
        "sectionTitleSanskrit": "खण्डः \"ख\" · आधुनिक-प्रविधि-शब्दावली रिक्तस्थानपूर्तिः च",
        "instructions": "Master technical Sanskrit terms and complete contextual gaps:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 4,
            "question": "IV. मञ्जूषातः पदानि चित्वा रिक्तस्थानानि पूरयत:\nमञ्जूषा: [चलदूरभाषयन्त्रे, मुद्राहीनाय, कर्गदोद्योगे, सङ्गणकस्य, श्रुतिपरम्परया]\n१. प्राचीनकाले विद्या ______________ गृह्यते स्म।\n२. ______________ वृक्षाणाम् उपयोगेन वृक्षाः कृत्यन्ते स्म।\n३. विविधाः अनुप्रयोगाः (Apps) ______________ विनिमयाय सहायकाः सन्ति।\n४. सर्वाणि यात्रापत्राणि अस्माकं ______________ सुरक्षितानि भवन्ति।\n५. ______________ अधिकाधिकप्रयोगेण वृक्षाणां कर्तने न्यूनता भविष्यति।",
            "questionSanskrit": "रिक्तस्थानानि पूरयत:",
            "marks": 5,
            "type": "fill",
            "answer": "१. श्रुतिपरम्परया; २. कर्गदोद्योगे; ३. मुद्राहीनाय; ४. चलदूरभाषयन्त्रे; ५. सङ्गणकस्य",
            "explanation": "पाठस्य तथ्यानुसारेण समुचित-पद-योजनम्।"
          },
          {
            "num": 5,
            "question": "V. संस्कृत-पारिभाषिकपदानाम् आङ्ग्ल-समानार्थकैः सह मेलनं कुरुत:\nस्तम्भः 'क'                              स्तम्भः 'ख'\n१. सङ्गणकम्                              (क) Typewriter\n२. चलदूरभाषयन्त्रम्                        (ख) Cashless Transaction\n३. टङ्कणयन्त्रम्                           (ग) Computer\n४. मुद्राहीन-विनिमयः                      (घ) In the pocket\n५. वस्त्रपुटके                            (ङ) Mobile phone",
            "questionSanskrit": "पारिभाषिक-पदानि मेलयत:",
            "marks": 5,
            "type": "matching",
            "answer": "१ ➔ (ग) Computer\n२ ➔ (ङ) Mobile phone\n३ ➔ (क) Typewriter\n४ ➔ (ख) Cashless Transaction\n५ ➔ (घ) In the pocket",
            "explanation": "आधुनिक-तकनीकी-पदानां संस्कृत-आङ्ग्ल-समानार्थकता।"
          }
        ]
      }
    ]
  },
  {
    "id": "ws-grade8-ch6-ws2",
    "title": "Worksheet 2: Voice Transformation & Digital Ecology (कर्मवाच्य-प्रयोगः पर्यावरणसंरक्षणं च)",
    "titleSanskrit": "षष्ठः पाठः कार्यपत्रिका २: कर्मवाच्य-प्रयोगः पर्यावरणसंरक्षणं च",
    "category": "grade8",
    "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
    "grade": "CBSE Grade 8 (Deepakam Framework)",
    "totalMarks": 20,
    "timeLimit": "45 Mins",
    "description": "Active-to-passive voice transitions (पठ्यते, लिख्यते, दृश्यते, क्रियते), interrogative sentence construction (प्रश्ननिर्माणम्), and reflections on paperless green ecology.",
    "sections": [
      {
        "sectionTitle": "Section A: Present Passive Voice Transitions (कर्मवाच्य-रूपाणि)",
        "sectionTitleSanskrit": "खण्डः \"क\" · वाच्यपरिवर्तनम्",
        "instructions": "Transform active verbs to passive paradigms and reconstruct sentences:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 1,
            "question": "I. कर्मवाच्यस्य लट्लकार-रूपाणि मञ्जूषातः चित्वा पूरयत:\nमञ्जूषा: [पठ्यन्ते, लिख्यते, दृश्यते, क्रियन्ते, गृह्यते]\n१. लिख् धातुः ➔ एकवचने: ______________\n२. दृश् धातुः ➔ एकवचने: ______________\n३. ग्रह् धातुः ➔ एकवचने: ______________\n४. पठ् धातुः ➔ बहुवचने: ______________\n५. कृ धातुः ➔ बहुवचने: ______________",
            "questionSanskrit": "कर्मवाच्य-क्रियारूपाणि पूरयत:",
            "marks": 5,
            "type": "fill",
            "answer": "१. लिख्यते; २. दृश्यते; ३. गृह्यते; ४. पठ्यन्ते; ५. क्रियन्ते",
            "explanation": "धातु + यक् + आत्मनेपद-प्रत्ययाः (ते, एते, अन्ते)।"
          },
          {
            "num": 2,
            "question": "II. वाक्यानि कर्तृवाच्यात् कर्मवाच्ये परिवर्तयत (Convert from Active to Passive Voice):\n१. जनाः सङ्गणकेन पत्राणि लिखन्ति। ➔ ____________________________\n२. वयम् ई-मेल पश्यामः। ➔ ____________________________\n३. छात्राः पुस्तकानि पठन्ति। ➔ ____________________________\n४. सः शुल्कं ददाति। ➔ ____________________________\n५. बालकाः विद्यां गृह्णन्ति। ➔ ____________________________",
            "questionSanskrit": "कर्मवाच्ये वाक्यपरिवर्तनं कुरुत:",
            "marks": 5,
            "type": "grammar",
            "answer": "१. जनैः सङ्गणकेन पत्राणि लिख्यन्ते।\n२. अस्माभिः ई-मेल दृश्यते।\n३. छात्रैः पुस्तकानि पठ्यन्ते।\n४. तेन शुल्कं दीयते।\n५. बालकैः विद्या गृह्यते।",
            "explanation": "कर्मवाच्ये कर्तरि तृतीया विभक्तिः, कर्मणि प्रथमा विभक्तिः, क्रिया च कर्मानुसारिणी भवति।"
          }
        ]
      },
      {
        "sectionTitle": "Section B: Question Construction & Paperless Ecology",
        "sectionTitleSanskrit": "खण्डः \"ख\" · प्रश्ननिर्माणं पर्यावरणसंरक्षणं च",
        "instructions": "Construct questions for underlined words and articulate ecological benefits:",
        "totalMarks": 10,
        "questions": [
          {
            "num": 3,
            "question": "III. रेखाङ्कितपदानि आधृत्य प्रश्नवाक्यानि रचयत (Page 66 Q3):\n१. <u>भोजपत्रोपरि</u> लेखनम् आरब्धम्।\n२. लेखनार्थं <u>करगदस्य</u> आवश्यकतायाः अनुभूतिः न भविष्यति।\n३. विश्रामगृहेषु <u>कक्षाकक्षम्</u> सुनिश्चितं कर्तुं चलदूरभाषयन्त्रम् अलम्।\n४. सर्वाणि पत्राणि <u>चलदूरभाषयन्त्रे</u> सुरक्षितानि भवन्ति।\n५. वयम् <u>उपचारार्थम्</u> चिकित्सालयं गच्छामः।",
            "questionSanskrit": "प्रश्नवाक्यानि रचयत:",
            "marks": 5,
            "type": "grammar",
            "answer": "१. कुत्र (कस्य उपरि) लेखनम् आरब्धम्?\n२. लेखनार्थं कस्य आवश्यकतायाः अनुभूतिः न भविष्यति?\n३. विश्रामगृहेषु किम् सुनिश्चितं कर्तुं चलदूरभाषयन्त्रम् अलम्?\n४. सर्वाणि पत्राणि कस्मिन् (कुत्र) सुरक्षितानि भवन्ति?\n५. वयं किमर्थम् चिकित्सालयं गच्छामः?",
            "explanation": "भोजपत्रोपरि (कुत्र); करगदस्य (कस्य); कक्षाकक्षम् (किम्); चलदूरभाषयन्त्रे (कस्मिन् / कुत्र); उपचारार्थम् (किमर्थम्)।"
          },
          {
            "num": 4,
            "question": "IV. संक्षेपेण उत्तरत (Short Essay / Value Reflection):\n'सङ्गणकस्य अधिकाधिकप्रयोगेण पर्यावरणसंरक्षणे कथं साहाय्यं भविष्यति?'\n(How does the maximizing of digital devices and computer usage conserve the environment? Explain in 3-4 Sanskrit/Hindi/English lines).",
            "questionSanskrit": "पर्यावरणसंरक्षणे सङ्गणकस्य योगदानं लिखत:",
            "marks": 5,
            "type": "short_ans",
            "answer": "करगदस्य (कागजस्य) निर्माणाय प्रतिवर्षं लक्षशः वृक्षाः कृत्यन्ते स्म। परं सङ्गणकस्य चलदूरभाषस्य च प्रयोगेण कर्गदस्य आवश्यकता प्रायः समाप्ता भविष्यति। यदा कर्गदरहितः डिजिटल-व्यवहारः प्रवर्धिष्यते, तदा वृक्षाणां कर्तनं न्यूनं भविष्यति, येन पर्यावरणस्य महत् संरक्षणं भविष्यति। (Maximizing computer and digital document usage curtails the necessity of paper, directly halting deforestation and protecting the environment).",
            "explanation": "पाठस्य पर्यावरण-संरक्षण-सन्देशः।"
          }
        ]
      }
    ]
  },
{
  "id": "ws-grade8-ch7-ws1",
  "title": "Worksheet 1: Dialogue Comprehension (श्रावणी-पूर्णिमा & संस्कृतदिवसः)",
  "titleSanskrit": "सप्तमः पाठः कार्यपत्रिका १: श्रावणी-पूर्णिमा & संस्कृतदिवसः",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Extract-based reading from Omita and her sister's conversation regarding Sanskrit Day celebration, school programs, and song competition.",
  "sections": [
    {
      "sectionTitle": "Section A: Dialogue Extraction & Short Answers",
      "sectionTitleSanskrit": "खण्डः 'क' · संवाद-अवबोधनम्",
      "instructions": "Read the conversation extract and answer:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "I. एकपदेन उत्तरत (Answer in one word):\n(क) श्रावणी-पूर्णिमायाम् कः उत्सवः भवति?\n(ख) भगिनी कस्यां प्रतियोगितायां भागं ग्रहीष्यति?\n(ग) कस्य आमंत्रणपत्रं भगिनी ददाति?",
          "questionSanskrit": "एकपदेन उत्तरत:",
          "marks": 6,
          "type": "short_ans",
          "answer": "(क) संस्कृतदिवसः (संस्कृतसप्ताहः)\n(ख) गीतगायनप्रतियोगितायाम्\n(ग) निमन्त्रणपत्रम्",
          "explanation": "पाठान्तर्गत-संवादे स्पष्टं यत् श्रावणीपूर्णिमायाम् संस्कृतदिवसः भवति, भगिनी च गीतप्रतियोगितायां भागं गृह्णाति।"
        },
        {
          "num": 2,
          "question": "II. पूर्णवाक्येन उत्तरत:\nसंस्कृतसप्ताहः कथम् आचर्यते? विद्यालये का योजना कृता?",
          "questionSanskrit": "पूर्णवाक्येन उत्तरत:",
          "marks": 4,
          "type": "short_ans",
          "answer": "संस्कृतदिवसम् अधिकृत्य आसप्ताहं विविधकार्यक्रमाणां योजना विद्यालये रचिता अस्ति।",
          "explanation": "संस्कृतदिवसस्य महत्ता पाठे वर्णिता।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Vocabulary and Grammar in Context",
      "sectionTitleSanskrit": "खण्डः 'ख' · भाषिककार्यम्",
      "instructions": "Choose the correct grammatical form:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 3,
          "question": "१. 'गास्यति' इति पदे कः लकारः?\n(A) लट् (B) लृट् (C) लोट् (D) लङ्\n\n२. 'अहम् अपि आगन्तुम् इच्छामि' इत्यत्र 'आगन्तुम्' पदे कः प्रत्ययः?\n(A) क्त्वा (B) तुमुन् (C) ल्यप् (D) शतृ",
          "questionSanskrit": "व्याकरण-विकल्पं चिनुत:",
          "marks": 5,
          "type": "mcq",
          "options": [
            "१. (B) लृट् लकारः, २. (B) तुमुन्",
            "१. (A) लट्, २. (A) क्त्वा",
            "१. (C) लोट्, २. (C) ल्यप्"
          ],
          "answer": "१. (B) लृट् लकारः (भविष्यत्कालः)\n२. (B) तुमुन् प्रत्ययः (आ + गम् + तुमुन् = आगन्तुम्)",
          "explanation": "गास्यति = लृट्लकारः; आगन्तुम् = तुमुन्-प्रत्ययः।"
        },
        {
          "num": 4,
          "question": "Fill in the blanks from the dialogue:\n(क) वयम् एतम् ______________ आचरामः। (आसप्ताहम् / प्रतिदिनम्)\n(ख) भवती ______________। (अनुगायतु / पठतु)",
          "questionSanskrit": "रिक्तस्थानं पूरयत:",
          "marks": 5,
          "type": "fill",
          "answer": "(क) आसप्ताहम्; (ख) अनुगायतु",
          "explanation": "पाठानुरूप-रिक्तस्थानपूर्तिः।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch7-ws2",
  "title": "Worksheet 2: Verse Analysis & Blanks (श्लोक-विश्लेषणं रिक्तस्थानपूर्तिः च)",
  "titleSanskrit": "सप्तमः पाठः कार्यपत्रिका २: श्लोक-विश्लेषणं रिक्तस्थानपूर्तिः च",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Fill missing poetic terms from Shlokas 1–4, explore Anvaya, and understand aesthetic and philosophical dimensions of Sanskrit.",
  "sections": [
    {
      "sectionTitle": "Section A: Shloka Text Fill-in-the-Blanks",
      "sectionTitleSanskrit": "खण्डः 'क' · श्लोकांश-पूरणम्",
      "instructions": "Complete the shloka phrases with the exact textbook terms:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Fill in the missing words from the shlokas:\n१. वेदव्यास-वाल्मीकि-___________ कालिदास-बाणादिकवीनाम्।\n२. वैद्य-___________-शास्त्रादि-विहारा विजयते धरायां सुन्दरसुरभाषा।\n३. अयि मातस्तव ___________ मम वचनातीता।\n४. नवरस-रुचिरा ___________ वेदविषय-वेदान्त-विचारा।",
          "questionSanskrit": "श्लोकेषु रिक्तस्थानानि पूरयत:",
          "marks": 6,
          "type": "fill",
          "answer": "१. मुनीनां; २. व्योम; ३. पोषणक्षमता; ४. अलङ्कृति-धारा",
          "explanation": "पाठे श्लोक १, २, ४ इत्येतेभ्यः पदानि सन्ति।"
        },
        {
          "num": 2,
          "question": "Explain the meaning of 'नवरस-रुचिरा' and list any four rasas in Sanskrit.",
          "questionSanskrit": "'नवरस-रुचिरा' इत्यस्य भावार्थं चतुरः रसान् च लिखत:",
          "marks": 4,
          "type": "short_ans",
          "answer": "'नवरस-रुचिरा' अर्थात् नौ रसों से मनोहर। चत्वारः रसाः: शृङ्गारः, हास्यः, वीरः, शान्तः च।",
          "explanation": "साहित्ये नवरसाः भवन्ति येन काव्यं रुचिरा भवति।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Anvaya & Verse Translation",
      "sectionTitleSanskrit": "खण्डः 'ख' · अन्वयः अनुवादः च",
      "instructions": "Rearrange the anvaya and translate:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 3,
          "question": "Translate Verse 1 into English or Hindi:\n'मुनिवरविकसितकविवरविलसित-मञ्जुलमञ्जूषा सुन्दरसुरभाषा। अयि मातस्तव पोषणक्षमता मम वचनातीता सुन्दरसुरभाषा॥'",
          "questionSanskrit": "श्लोकस्य अनुवादं कुरुत:",
          "marks": 5,
          "type": "short_ans",
          "answer": "हे श्रेष्ठ मुनियों द्वारा विकसित और कवियों द्वारा सुशोभित देववाणी संस्कृत! तुम सुंदर ज्ञान की मंजूषा (पेटी) हो। हे माता! तुम्हारी सबको पोषण देने की क्षमता मेरी वाणी से सर्वथा परे है। (O beautiful divine language Sanskrit, expanded by noble sages and adorned by poets! You are a lovely jewel-box of wisdom. Your nurturing power is beyond words).",
          "explanation": "श्लोक १ इत्यस्य सरलार्थः।"
        },
        {
          "num": 4,
          "question": "Which great authors and poets are mentioned in Verse 2 as finding hope of life in Sanskrit?",
          "questionSanskrit": "द्वितीये श्लोके केषां मुनीनां कवीनां च नामानि सन्ति?",
          "marks": 5,
          "type": "short_ans",
          "answer": "मुनयः: वेदव्यासः, वाल्मीकिः च। कवयः: कालिदासः, बाणभट्टः च।",
          "explanation": "श्लोक २: वेदव्यास-वाल्मीकि-मुनीनां कालिदास-बाणादिकवीनाम्।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch7-ws3",
  "title": "Worksheet 3: Compound Identification (समास-बोधः)",
  "titleSanskrit": "सप्तमः पाठः कार्यपत्रिका ३: समास-बोधः",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Analyze Samasa formations, compound splitting (विग्रह), and identify Tatpurusha, Karmadharaya, and Dvigu paradigms from Chapter 7.",
  "sections": [
    {
      "sectionTitle": "Section A: Compound Splitting (समास-विग्रहः)",
      "sectionTitleSanskrit": "खण्डः 'क' · समास-विग्रहः",
      "instructions": "Break the following compound words into their separate components:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Break or combine the compounds:\n१. सुरभाषा = _________________\n२. पोषणक्षमता = _________________\n३. वचनातीता = _________________\n४. मञ्जुलमञ्जूषा = _________________",
          "questionSanskrit": "समास-विग्रहं कुरुत:",
          "marks": 8,
          "type": "grammar",
          "answer": "१. सुराणां भाषा (षष्ठी तत्पुरुषः)\n२. पोषणस्य क्षमता (षष्ठी तत्पुरुषः)\n३. वचनम् अतीता (द्वितीया तत्पुरुषः)\n४. मञ्जुला मञ्जूषा (कर्मधारयः)",
          "explanation": "पाठे पृष्ठ ८०-८२ अनुसारं समासविग्रहः।"
        },
        {
          "num": 2,
          "question": "In the compound 'नवरसरुचिरा', what does 'नवरस' signify?\n(A) One Rasa (B) Nine Rasas (C) New Rasa",
          "questionSanskrit": "'नवरस' पदे कः भावः?",
          "marks": 2,
          "type": "mcq",
          "options": [
            "(A) One Rasa",
            "(B) Nine Rasas (नवानां रसानां समाहारः)",
            "(C) New Rasa"
          ],
          "answer": "(B) Nine Rasas (नवानां रसानां समाहारः)",
          "explanation": "अत्र 'नव' इति संख्यावाचकम् अस्ति (९ रसाः)।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Samasa Principles & Applied Usage",
      "sectionTitleSanskrit": "खण्डः 'ख' · समास-सिद्धान्त-प्रयोगः",
      "instructions": "Identify the Samasa category for each word:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 3,
          "question": "Identify the type of Samasa for each:\n(क) सुरभाषा ➔ ______________ (तत्पुरुषः / द्वन्द्वः)\n(ख) सुन्दरसुरभाषा ➔ ______________ (कर्मधारयः / द्विगुः)\n(ग) पञ्चवटी ➔ ______________ (द्विगुः / बहुव्रीहिः)\n(घ) पीताम्बरः ➔ ______________ (बहुव्रीहिः / अव्ययीभावः)",
          "questionSanskrit": "समास-नाम लिखत:",
          "marks": 6,
          "type": "grammar",
          "answer": "(क) षष्ठी तत्पुरुषः; (ख) कर्मधारयः; (ग) द्विगुः; (घ) बहुव्रीहिः",
          "explanation": "शुद्ध-समास-वर्गीकरणम्।"
        },
        {
          "num": 4,
          "question": "Define Samasa (समास) in simple Sanskrit or English and give one example.",
          "questionSanskrit": "समासस्य लक्षणम् एकम् उदाहरणं च लिखत:",
          "marks": 4,
          "type": "short_ans",
          "answer": "'समसनं समासः'—अनेकेषां पदानां मिलित्वा एकपदीभवनं समासः कथ्यते। यथा—देवस्य आलयः = देवालयः। (Samasa is the compounding or contraction of multiple related words into a single compound word).",
          "explanation": "समासस्य शास्त्रीयं लक्षणम्।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch7-ws4",
  "title": "Worksheet 4: Case & Grammatical Matching (विभक्ति-वचन-मेलनम्)",
  "titleSanskrit": "सप्तमः पाठः कार्यपत्रिका ४: विभक्ति-वचन-मेलनम्",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Declensions, case endings (Vibhakti), number (Vachana), and grammatical identification of nouns from Chapter 7.",
  "sections": [
    {
      "sectionTitle": "Section A: Grammatical Matching",
      "sectionTitleSanskrit": "खण्डः 'क' · विभक्ति-मेलनम्",
      "instructions": "Match the words with their correct Vibhakti and Vachana:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Match the word with its grammatical description:\n१. शास्त्रेषु ➔ (a) Genitive Singular (षष्ठी, एकवचन)\n२. जनानाम् ➔ (b) Locative Plural (सप्तमी, बहुवचन)\n३. जीवनस्य ➔ (c) Genitive Plural (षष्ठी, बहुवचन)\n४. धरायाम् ➔ (d) Locative Singular (सप्तमी, एकवचन)",
          "questionSanskrit": "विभक्ति-वचनानां मेलनं कुरुत:",
          "marks": 6,
          "type": "matching",
          "answer": "१-(b), २-(c), ३-(a), ४-(d)",
          "explanation": "शास्त्रेषु = सप्तमी बहुवचन; जनानाम् = षष्ठी बहुवचन; जीवनस्य = षष्ठी एकवचन; धरायाम् = सप्तमी एकवचन।"
        },
        {
          "num": 2,
          "question": "Identify the Vibhakti and Vachana of:\n(क) मातः ➔ ______________________\n(ख) तव ➔ ______________________\n(ग) मञ्जूषा ➔ ______________________\n(घ) संस्कृतिः ➔ ______________________",
          "questionSanskrit": "विभक्तिं वचनं च लिखत:",
          "marks": 4,
          "type": "grammar",
          "answer": "(क) मातः: सम्बोधनम्, एकवचनम्\n(ख) तव: षष्ठी, एकवचनम्\n(ग) मञ्जूषा: प्रथमा, एकवचनम्\n(घ) संस्कृतिः: प्रथमा, एकवचनम्",
          "explanation": "पाठान्तर्गत-पदानां व्याकरण-रूपम्।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Interrogative Sentence Construction (प्रश्ननिर्माणम्)",
      "sectionTitleSanskrit": "खण्डः 'ख' · प्रश्ननिर्माणम्",
      "instructions": "Frame questions for the underlined terms:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 3,
          "question": "Frame interrogative sentences (Page 82 Q3):\n१. मुनिगणाः <u>संस्कृतभाषायाः</u> विकासं कृतवन्तः।\n२. <u>सामान्यजनानां</u> जीवनं काव्यैः प्रभावितम् अस्ति।\n३. <u>कवयः</u> अपि उपादेयानि काव्यानि रचितवन्तः।\n४. संस्कृतभाषा <u>धरायाम्</u> विहरति।\n५. संस्कृतभाषा <u>विविधभाषाः</u> परिपोषयति।",
          "questionSanskrit": "प्रश्ननिर्माणं कुरुत:",
          "marks": 10,
          "type": "grammar",
          "answer": "१. मुनिगणाः कस्याः विकासं कृतवन्तः?\n२. केषाम् जीवनं काव्यैः प्रभावितम् अस्ति?\n३. के अपि उपादेयानि काव्यानि रचितवन्तः?\n४. संस्कृतभाषा कुत्र (कस्याम्) विहरति?\n५. संस्कृतभाषा काः परिपोषयति?",
          "explanation": "संस्कृतभाषायाः (स्त्रीलिङ्ग षष्ठी एक० -> कस्याः); सामान्यजनानाम् (पुल्लिङ्ग षष्ठी बहु० -> केषाम्); कवयः (प्रथमा बहु० -> के); धरायाम् (सप्तमी -> कुत्र/कस्याम्); विविधभाषाः (स्त्रीलिङ्ग द्वितीया बहु० -> काः)।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch7-ws5",
  "title": "Worksheet 5: Sanskrit Prose Writing (सुन्दरसुरभाषा-रचना)",
  "titleSanskrit": "सप्तमः पाठः कार्यपत्रिका ५: सुन्दरसुरभाषा-रचना",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Compose short descriptive sentences on the glory of Sanskrit using textual vocabulary and articulate its cultural and scientific value.",
  "sections": [
    {
      "sectionTitle": "Section A: Sentence Construction with Prompt Words",
      "sectionTitleSanskrit": "खण्डः 'क' · पदैः वाक्यरचना",
      "instructions": "Write 3 simple and grammatically correct Sanskrit sentences using the given words:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Write 3 Sanskrit sentences using: 'सुन्दरसुरभाषा', 'धरायाम्', and 'ज्ञानपेटिका (मञ्जूषा)':\n१. सुन्दरसुरभाषा: ____________________________________\n२. धरायाम्: ____________________________________\n३. ज्ञानपेटिका / मञ्जूषा: ____________________________________",
          "questionSanskrit": "पदैः वाक्यनिर्माणं कुरुत:",
          "marks": 6,
          "type": "grammar",
          "answer": "१. संस्कृतभाषा संसारस्य सुन्दरसुरभाषा अस्ति।\n२. देववाणी संस्कृतं धरायां सर्वत्र विजयते।\n३. संस्कृतभाषा समस्तज्ञानानाम् एका श्रेष्ठा ज्ञानपेटिका (मञ्जूषा) वर्तते।",
          "explanation": "सरल-संस्कृत-वाक्यरचना।"
        },
        {
          "num": 2,
          "question": "Name any two sciences (शास्त्राणि) mentioned in Verse 4 that Sanskrit encompasses.",
          "questionSanskrit": "चतुर्थे श्लोके उल्लिखितयोः द्वयोः शास्त्रयोः नामनी लिखत:",
          "marks": 4,
          "type": "short_ans",
          "answer": "१. वैद्यशास्त्रम् (चिकित्सा-विज्ञानम् / आयुर्वेदः)\n२. व्योमशास्त्रम् (खगोल-विज्ञानम् / अन्तरिक्षशास्त्रम्)",
          "explanation": "श्लोक ४: 'वैद्य-व्योम-शास्त्रादि-विहारा विजयते धरायां सुन्दरसुरभाषा'।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Reading & Value Reflection",
      "sectionTitleSanskrit": "खण्डः 'ख' · संस्कृतस्य वैश्विकं महत्त्वम्",
      "instructions": "Explain Sanskrit's role as a unifying cultural treasure:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 3,
          "question": "Explain why the poet calls Sanskrit 'मुनिवरविकसित-कविवरविलसित-मञ्जुलमञ्जूषा' in 3-4 lines.",
          "questionSanskrit": "'मञ्जुलमञ्जूषा' इत्यस्य वैशिष्ट्यं लिखत:",
          "marks": 5,
          "type": "short_ans",
          "answer": "ऋषिभिः मुनिभिश्च वेदानाम् उपनिषदां च गहनज्ञानं संस्कृते निबद्धम्, कालिदासादिभिः कविवरैः च अनुपमैः काव्यैः इयं भाषा सुशोभिता। अतः इयं सर्वज्ञानानां सुरभिता पेटिका (मञ्जूषा) अस्ति। (Sages developed philosophical wisdom in Sanskrit, while master poets embellished it with sublime aesthetic literature, making it a radiant casket of universal knowledge).",
          "explanation": "पाठस्य मूल-भावार्थः।"
        },
        {
          "num": 4,
          "question": "Multiple Choice Questions (Page 83 Q8):\n(क) 'मञ्जुलमञ्जूषा' इत्यस्य अर्थः कः?\n(i) पेटी (ii) मनोहररूपेण संकलिता (iii) भोजनम्\n(ख) सुन्दरसुरभाषा कुत्र विजयते?\n(i) नभसि (ii) धरायाम् (iii) वने",
          "questionSanskrit": "उचितं विकल्पं चिनुत:",
          "marks": 5,
          "type": "mcq",
          "options": [
            "(क) (ii) मनोहररूपेण संकलिता, (ख) (ii) धरायाम्",
            "(क) (i) पेटी, (ख) (i) नभसि"
          ],
          "answer": "(क) मनोहररूपेण संकलिता\n(ख) धरायाम् (पृथिव्याम्)",
          "explanation": "पाठान्तर्गत-विकल्पाः।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch8-ws1",
  "title": "Worksheet 1: Comprehension & Text-Based Questions (भगिनीसप्तकम्)",
  "titleSanskrit": "अष्टमः पाठः कार्यपत्रिका १: भगिनीसप्तकम् पूर्वोत्तरपरिचयः च",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Mnemonic shloka reading, state identification of the Seven Sisters and Brother Sikkim, and geographic-cultural understanding of Northeast India.",
  "sections": [
    {
      "sectionTitle": "Section A: Mnemonic Shloka Extraction",
      "sectionTitleSanskrit": "खण्डः 'क' · श्लोक-अवबोधनम्",
      "instructions": "Read the mnemonic verse and answer the questions below:\n\n'अद्वयं मत्रयं चैव न-त्रि-युक्तं तथाद्वयम्।\nसप्तराज्यसमूहोऽयं भगिनीसप्तकं मतम्॥\nतेन युक्तो लघुः भ्राता सिक्किमः इति विश्रुतः।\nपश्यत कोणमैशान्यं भारतस्य मनोहरम्॥'",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "I. प्रश्नानाम् उत्तराणि लिखत:\n१. 'मत्रयम्' इति पदेन कति राज्यानां बोधः भवति?\n२. 'भगिनीसप्तकम्' इति समूहे कति राज्यानि सन्ति?\n३. 'अद्वयम्' इति पदस्य कानि राज्यानि नामानि पाठे आगतानि?",
          "questionSanskrit": "श्लोकाधारित-प्रश्नोत्तराणि:",
          "marks": 6,
          "type": "short_ans",
          "answer": "१. त्रयाणाम् (३) राज्यानाम् (मणिपुरम्, मिजोरमः, मेघालयः च)।\n२. सप्त (७) राज्यानि।\n३. अरुणाचलप्रदेशः च असमः।",
          "explanation": "अद्वयम् = अरुणाचल, असम; मत्रयम् = मणिपुर, मिजोरम, मेघालय; न-त्रि = नागालैंड, त्रिपुरा।"
        },
        {
          "num": 2,
          "question": "II. Translate the following lines into English or Hindi:\n\"भगिनीसप्तके इमानि राज्यानि क्षेत्रपरिमाणैः लघूनि वर्तन्ते तथापि गुणगौरवदृष्ट्या बृहत्तराणि प्रतीयन्ते।\"",
          "questionSanskrit": "सरलार्थं लिखत:",
          "marks": 4,
          "type": "short_ans",
          "answer": "भगिनीसप्तक के ये राज्य क्षेत्रफल की दृष्टि से छोटे हैं, फिर भी गुण और गौरव की दृष्टि से बहुत बड़े प्रतीत होते हैं। (In the Seven Sisters, these states are small in terms of surface area, yet they appear very significant and grand in terms of their virtues and glory).",
          "explanation": "पाठे अष्टमपाठस्य मुख्यवाक्यम्।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Geography & Rivers of Northeast India",
      "sectionTitleSanskrit": "खण्डः 'ख' · भूगोलः नद्यः च",
      "instructions": "Answer based on Page 85 textbook facts:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 3,
          "question": "Which two prominent rivers flow through these northeastern states?\n(A) Ganga and Yamuna (B) Barak and Brahmaputra (C) Narmada and Godavari",
          "questionSanskrit": "एतेषु राज्येषु के प्रमुखे नद्यौ प्रवहति?",
          "marks": 5,
          "type": "mcq",
          "options": [
            "(A) Ganga and Yamuna",
            "(B) Barak and Brahmaputra (बराक-ब्रह्मपुत्रादि-नद्यः)",
            "(C) Narmada and Godavari"
          ],
          "answer": "(B) Barak and Brahmaputra (बराक-ब्रह्मपुत्रादि-नद्यः)",
          "explanation": "पाठे उक्तम्: 'एतेषु बराक-ब्रह्मपुत्रादि-नद्यः प्रवहन्ति'।"
        },
        {
          "num": 4,
          "question": "How many total states and union territories are there in India as stated by Swara?\n(क) राज्यानि: ______________\n(ख) केन्द्रशासितप्रदेशाः: ______________",
          "questionSanskrit": "भारते कति राज्यानि केन्द्रशासितप्रदेशाः च सन्ति?",
          "marks": 5,
          "type": "fill",
          "answer": "(क) अष्टाविंशतिः (२८); (ख) अष्ट (८)",
          "explanation": "अस्माकं देशे अष्टाविंशतिः राज्यानि तथा अष्ट केन्द्रशासितप्रदेशाः सन्ति।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch8-ws2",
  "title": "Worksheet 2: Vocabulary & Word Meanings (पूर्वोत्तर-शब्दावली)",
  "titleSanskrit": "अष्टमः पाठः कार्यपत्रिका २: पूर्वोत्तर-शब्दावली",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Vocabulary mastery: matching synonyms, contextual blanks, and antonym recognition for 26 Chapter 8 terms.",
  "sections": [
    {
      "sectionTitle": "Section A: Sanskrit-English Matching",
      "sectionTitleSanskrit": "खण्डः 'क' · शब्दार्थ-मेलनम्",
      "instructions": "Match the Sanskrit word with its correct English meaning:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Match the following:\n१. वैचित्र्यम् ➔ (a) Abundance\n२. प्राचुर्यम् ➔ (b) Uniqueness\n३. स्वाधीनाः ➔ (c) Independent\n४. निष्णाताः ➔ (d) Experts / Masters",
          "questionSanskrit": "उचित-अर्थैः सह मेलयत:",
          "marks": 6,
          "type": "matching",
          "answer": "१-(b) Uniqueness, २-(a) Abundance, ३-(c) Independent, ४-(d) Experts / Masters",
          "explanation": "वैचित्र्यम् = विशेषता; प्राचुर्यम् = आधिक्यम्; स्वाधीनाः = स्वतन्त्राः; निष्णाताः = निपुणाः।"
        },
        {
          "num": 2,
          "question": "Fill in the blanks with the correct option:\n(क) अस्मिन् प्रदेशे ______________ वृक्षाणां प्राचुर्यं विद्यते। (आम्र / वंश)\n(ख) इमानि राज्यानि भ्रमणार्थं ______________ सन्ति। (नरकसदृशानि / स्वर्गसदृशानि)",
          "questionSanskrit": "उचितपदैः रिक्तस्थानं पूरयत:",
          "marks": 4,
          "type": "fill",
          "answer": "(क) वंश; (ख) स्वर्गसदृशानि",
          "explanation": "पूर्वोत्तरराज्येषु बाँस (वंश) वृक्षाणां प्राचुर्यम् अस्ति, भ्रमणाय च स्वर्गसदृशानि सन्ति।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Antonyms & Odd-One-Out",
      "sectionTitleSanskrit": "खण्डः 'ख' · विलोमपदानि भिन्नप्रकृतिकपदानि च",
      "instructions": "Choose antonyms and pick the odd word out:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 3,
          "question": "Find the antonym based on the chapter:\n१. 'लघूनि' इति पदस्य विलोमपदम्: __________________\n२. 'अल्पता' इति पदस्य विलोमपदम्: __________________\n३. 'पराधीनाः' इति पदस्य विलोमपदम्: __________________",
          "questionSanskrit": "विलोमपदानि लिखत:",
          "marks": 6,
          "type": "grammar",
          "answer": "१. बृहत्तराणि; २. प्राचुर्यम्; ३. स्वाधीनाः",
          "explanation": "पाठान्तर्गत-विलोमशब्दाः।"
        },
        {
          "num": 4,
          "question": "Pick the odd word out (भिन्नप्रकृतिकं पदं चिनुत - Page 90 Q8):\n(क) गच्छति, पठति, धावति, अहसत्, क्रीडति ➔ ______________\n(ख) छात्रः, सेवकः, शिक्षकः, लेखिका, क्रीडकः ➔ ______________",
          "questionSanskrit": "भिन्नप्रकृतिकं पदं चिनुत:",
          "marks": 4,
          "type": "grammar",
          "answer": "(क) अहसत् (लङ्लकारः / भूतकालः, अन्ये लट्लकारे सन्ति)\n(ख) लेखिका (स्त्रीलिङ्गम्, अन्ये पुल्लिङ्गे सन्ति)",
          "explanation": "अभ्यासप्रश्न ८ इत्यस्य शुद्ध-समाधानम्।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch8-ws3",
  "title": "Worksheet 3: Question Formation (प्रश्ननिर्माणम्)",
  "titleSanskrit": "अष्टमः पाठः कार्यपत्रिका ३: प्रश्ननिर्माणम्",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Transform declarative sentences into grammatically accurate Sanskrit questions using appropriate Kim pronoun paradigms (Page 89 Q4).",
  "sections": [
    {
      "sectionTitle": "Section A: Question Construction Practice",
      "sectionTitleSanskrit": "खण्डः 'क' · प्रश्ननिर्माण-अभ्यासः",
      "instructions": "Transform the underlined words into appropriate interrogative pronouns:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Frame interrogative questions:\n१. एतानि राज्यानि भ्रमणार्थं <u>स्वर्गसदृशानि</u> सन्ति।\n२. <u>गारो-खासी-नागा-मिजो</u> जनजातीयाः अत्र निवसन्ति।\n३. अत्र <u>वंशोद्योगः</u> अन्तर्राष्ट्रीयख्यातिम् अवाप्तोऽस्ति।\n४. मम <u>भगिनी</u> कथयति यत् भारते २८ राज्यानि सन्ति।\n५. <u>सिक्किमः</u> लघुः भ्राता इति विश्रुतः।",
          "questionSanskrit": "रेखाङ्कितपदानि आधृत्य प्रश्ननिर्माणं कुरुत:",
          "marks": 10,
          "type": "grammar",
          "answer": "१. एतानि राज्यानि भ्रमणार्थं कीदृशानि सन्ति?\n२. काः (के) जनजातीयाः अत्र निवसन्ति?\n३. अत्र कः अन्तर्राष्ट्रीयख्यातिम् अवाप्तोऽस्ति?\n४. मम का कथयति यत् भारते २८ राज्यानि सन्ति?\n५. कः लघुः भ्राता इति विश्रुतः?",
          "explanation": "स्वर्गसदृशानि (कीदृशानि); जनजातीयाः (काः/के); वंशोद्योगः (कः); भगिनी (का); सिक्किमः (कः)।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Full Sentence Answers (पूर्णवाक्येन उत्तरत)",
      "sectionTitleSanskrit": "खण्डः 'ख' · पूर्णवाक्येन उत्तरत",
      "instructions": "Answer in complete Sanskrit sentences:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 2,
          "question": "इमानि राज्यानि सप्तभगिन्यः इति किमर्थं कथ्यन्ते?",
          "questionSanskrit": "इमानि राज्यानि सप्तभगिन्यः इति किमर्थं कथ्यन्ते?",
          "marks": 5,
          "type": "short_ans",
          "answer": "सामाजिक-सांस्कृतिक-परिदृश्यानां साम्याद् भौगोलिकवैशिष्ट्यात् च इमानि राज्यानि सप्तभगिन्यः इति कथ्यन्ते।",
          "explanation": "पाठे अध्यापिकायाः वचनम्।"
        },
        {
          "num": 3,
          "question": "वंशवृक्षवस्तूनां उपयोगः कुत्र कुत्र क्रियते?",
          "questionSanskrit": "वंशवृक्षवस्तूनां उपयोगः कुत्र कुत्र क्रियते?",
          "marks": 5,
          "type": "short_ans",
          "answer": "आवस्त्राभूषणेभ्यः गृहनिर्माणपर्यन्तं प्रायः वंशवृक्षनिर्मितानां वस्तूनां उपयोगः क्रियते।",
          "explanation": "बाँस उद्योगस्य बहुआयामी उपयोगः।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch8-ws4",
  "title": "Worksheet 4: Nature and Suffix (प्रकृति-प्रत्यय-सम्बन्धः)",
  "titleSanskrit": "अष्टमः पाठः कार्यपत्रिका ४: प्रकृति-प्रत्यय-सम्बन्धः",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Break and synthesize verbal roots and suffixes: Tumun, Aniyar, Lyap, and Kta from Chapter 8.",
  "sections": [
    {
      "sectionTitle": "Section A: Root and Suffix Analysis",
      "sectionTitleSanskrit": "खण्डः 'क' · प्रकृति-प्रत्यय-विभागः",
      "instructions": "Break or combine root and suffix (Page 89 Q3):",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Complete the formulas:\n१. पठ् + अनीयर् = ______________\n२. गन्तुम् = ______________ + ______________\n३. वि + श्रु + क्त = ______________\n४. अति + रिच् + ल्यप् = ______________\n५. ज्ञा + तुमुन् = ______________",
          "questionSanskrit": "प्रकृति-प्रत्ययविभागं कुरुत:",
          "marks": 10,
          "type": "grammar",
          "answer": "१. पठनीयम्\n२. गम् + तुमुन्\n३. विश्रुतः\n४. अतिरिच्य\n५. ज्ञातुम्",
          "explanation": "तुमुन् (निमित्तार्थे), अनीयर् (योग्यार्थे), ल्यप् (उपसर्गयुक्ते क्त्वा स्थाने), क्त (भूतकाले)।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Applied Suffix Exercises",
      "sectionTitleSanskrit": "खण्डः 'ख' · प्रत्यय-प्रयोगः",
      "instructions": "Select the sentence with correct suffix usage:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 2,
          "question": "Which word means 'in order to know'?\n(A) ज्ञातुम् (B) पठनीयम् (C) विश्रुतः (D) गन्तुम्",
          "questionSanskrit": "'जानने के लिए' इत्यर्थे किं पदम्?",
          "marks": 5,
          "type": "mcq",
          "options": [
            "(A) ज्ञातुम् (ज्ञा + तुमुन्)",
            "(B) पठनीयम्",
            "(C) विश्रुतः",
            "(D) गन्तुम्"
          ],
          "answer": "(A) ज्ञातुम् (ज्ञा + तुमुन्)",
          "explanation": "ज्ञा धातोः तुमुन् प्रत्यये 'ज्ञातुम्' भवति।"
        },
        {
          "num": 3,
          "question": "Fill in: 'वयं भ्रमणाय तत्रैव ______________ इच्छामः।' (गन्तुम् / पठितुम्)",
          "questionSanskrit": "उचितं पदं चिनुत:",
          "marks": 5,
          "type": "fill",
          "answer": "गन्तुम्",
          "explanation": "भ्रमणाय गमनम् एव उचितम् (गम् + तुमुन् = गन्तुम्)।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch8-ws5",
  "title": "Worksheet 5: Textual True/False & Cultural Reflection (आम् / न)",
  "titleSanskrit": "अष्टमः पाठः कार्यपत्रिका ५: सत्यासत्य-निर्णयः सांस्कृतिक-वैशिष्ट्यं च",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Evaluate historical and geographic statements as 'आम्' (True) or 'न' (False) and synthesize tribal cultural heritage.",
  "sections": [
    {
      "sectionTitle": "Section A: True / False Evaluation",
      "sectionTitleSanskrit": "खण्डः 'क' · सत्यासत्य-विवेकः",
      "instructions": "Write 'आम्' for True and 'न' for False statements:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Write 'आम्' or 'न':\n१. अरुणाचलप्रदेशे सूर्यस्य अरुणोदयः सर्वप्रथमं भवति। [ ]\n२. पूर्वोत्तरराज्येषु किमपि खनिजद्रव्यं न प्राप्यते। [ ]\n३. प्राचीनकाले सप्तभगिन्यः कस्यापि शासकस्य अधीनाः आसन्। [ ]\n४. हस्तशिल्पानां बाहुल्यं पूर्वोत्तरभारते अस्ति। [ ]\n५. अस्माकं देशे नव केन्द्रशासितप्रदेशाः सन्ति। [ ]",
          "questionSanskrit": "आम् अथवा न लिखत:",
          "marks": 10,
          "type": "grammar",
          "answer": "१. आम् (True - First sunrise in Arunachal)\n२. न (False - Rich in natural minerals and coal in Meghalaya)\n३. न (False - They were historically independent/स्वाधीनाः)\n४. आम् (True - Abundance of bamboo handicrafts)\n५. न (False - India has 8 Union Territories)",
          "explanation": "पाठान्तर्गत-तथ्यानाम् आधारः।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Tribal Heritage & Cultural Reflection",
      "sectionTitleSanskrit": "खण्डः 'ख' · जनजाति-संस्कृतिः",
      "instructions": "Summarize the tribal arts and lifestyle:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 2,
          "question": "Name any four tribes residing in Northeast India mentioned in the text.",
          "questionSanskrit": "पाठे आगतानां चतसृणां जनजातीनां नामानि लिखत:",
          "marks": 5,
          "type": "short_ans",
          "answer": "१. गारो; २. खासी; ३. नागा; ४. मिजो (लेप्चा अपि)।",
          "explanation": "पाठे उक्तम्: 'गारो-खासी-नागा-मिजो-लेप्चा-प्रभृतयः बहवः जनजातीयाः अत्र निवसन्ति'।"
        },
        {
          "num": 3,
          "question": "Why has the bamboo craft of Northeast India attained international fame?",
          "questionSanskrit": "पूर्वोत्तरस्य वंशोद्योगः कथम् अन्तर्राष्ट्रीयख्यातिम् अवाप्तः?",
          "marks": 5,
          "type": "short_ans",
          "answer": "अत्र वंशवृक्षाणां प्राचुर्यात् उत्तमानि वस्त्राणि, आभूषणानि, कलाकृतयः, गृहनिर्माणवस्तूनि च निपुणहस्तशिल्पिभिः रच्यन्ते, अतः अयम् उद्योगः अन्तर्राष्ट्रीयख्यातिम् अवाप्तः।",
          "explanation": "बाँस शिल्पस्य कौशलं वैश्विकं स्थानं प्राप्तवान्।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch9-ws1",
  "title": "Worksheet 1: Comprehensive Reading (गरिष्ठद्रव्याणि सुपाच्यानि च)",
  "titleSanskrit": "नवमः पाठः कार्यपत्रिका १: गरिष्ठद्रव्याणि सुपाच्यानि च",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Extract-based reading from Vagbhata's explanation of food mass, digestibility, and moderation in dietary substances.",
  "sections": [
    {
      "sectionTitle": "Section A: Prose Comprehension",
      "sectionTitleSanskrit": "खण्डः 'क' · गद्यांश-अवबोधनम्",
      "instructions": "Read the line and answer the questions below:\n\n\"गरिष्ठद्रव्याणि अपि अल्पमात्रं सेवनेन सुपाच्यानि भवन्ति, लघुद्रव्याणि चापि अतिमात्रं सेवनेन हानिकराणि जायन्ते।\"",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "I. Answer based on the line:\n(क) कीदृशानि द्रव्याणि अल्पमात्रं सेवनेन सुपाच्यानि भवन्ति?\n(ख) लघुद्रव्याणि कति सेवनेन हानिकराणि जायन्ते?\n(ग) 'सुपाच्यानि' इति पदस्य कः विलोमशब्दः अत्र अस्ति?",
          "questionSanskrit": "प्रश्नानाम् उत्तराणि लिखत:",
          "marks": 6,
          "type": "short_ans",
          "answer": "(क) गरिष्ठद्रव्याणि\n(ख) अतिमात्रं सेवनेन\n(ग) हानिकराणि (अथवा गरिष्ठम् / अपाच्यानि)",
          "explanation": "पङ्क्तौ स्पष्टम् उक्तम् यत् गरिष्ठद्रव्याणि अल्पमात्रेण सुपाच्यानि भवन्ति, लघुद्रव्याणि च अतिमात्रेण हानिकराणि जायन्ते।"
        },
        {
          "num": 2,
          "question": "II. What is the main factor determining whether food is light or heavy to digest according to Verse 2?\n(A) Taste (B) Quantity (मात्रा) (C) Price",
          "questionSanskrit": "द्रव्याणां गुरुलाघवे किं कारणम् उद्दिष्टम्?",
          "marks": 4,
          "type": "mcq",
          "options": [
            "(A) Taste (रसः)",
            "(B) Quantity (मात्राकारणम्)",
            "(C) Price (मूल्यम्)"
          ],
          "answer": "(B) Quantity (मात्राकारणम्)",
          "explanation": "श्लोक २: 'मात्राकारणमुद्दिष्टं द्रव्याणां गुरुलाघवे'।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Word Meanings & Food Quality",
      "sectionTitleSanskrit": "खण्डः 'ख' · शब्दार्थाः आहारगुणाः च",
      "instructions": "Identify Ayurvedic food attributes:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 3,
          "question": "Match the term with its meaning:\n१. गरिष्ठम् ➔ (a) Easily digestible\n२. सुपाच्यम् ➔ (b) Heavy / hard to digest\n३. अतिमात्रम् ➔ (c) In excessive quantity\n४. अल्पमात्रम् ➔ (d) In small measure",
          "questionSanskrit": "मेलनं कुरुत:",
          "marks": 6,
          "type": "matching",
          "answer": "१-(b), २-(a), ३-(c), ४-(d)",
          "explanation": "गरिष्ठम् = भारी; सुपाच्यम् = आसानी से पचने वाला; अतिमात्रम् = बहुत अधिक; अल्पमात्रम् = कम।"
        },
        {
          "num": 4,
          "question": "According to Ayurveda, why is eating excessively hot food harmful?",
          "questionSanskrit": "अत्युष्णं भोजनं किमर्थं हितकरं न भवति?",
          "marks": 4,
          "type": "short_ans",
          "answer": "अत्युष्णभोजनेन मुखे दाहः भवेत्, पाचनशक्तिश्च नश्यति, अतः अत्युष्णं भोजनं हितकरं न भवति।",
          "explanation": "पाठे माता वदति—'मुखे दाहः भवेत्, अपि च अत्युष्णं भोजनं हितकरं न भवति'।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch9-ws2",
  "title": "Worksheet 2: Grammar - Adjective Agreement (विशेषण-प्रयोगः)",
  "titleSanskrit": "नवमः पाठः कार्यपत्रिका २: विशेषण-प्रयोगः",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Master Sanskrit adjective-noun agreement in gender, number, and case across sentences (Page 103 grammar rule).",
  "sections": [
    {
      "sectionTitle": "Section A: Fill in with Correct Adjective",
      "sectionTitleSanskrit": "खण्डः 'क' · विशेषण-पूरणम्",
      "instructions": "Fill in the blanks with the correct form of the adjective in brackets:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Fill in the blank with the correct form:\n१. ______________ बालकः पठति। (उत्तम / उत्तमा / उत्तमम्)\n२. वाग्भटः ______________ वाणीम् अशृणोत्। (मधुरः / मधुरा / मधुराम्)\n३. अहम् ______________ पुस्तकं क्रीणामि। (एकः / एका / एकम्)\n४. ______________ वैद्याः रोगं शमयन्ति। (उत्तमाः / उत्तमम् / उत्तमा)",
          "questionSanskrit": "कोष्ठकात् उचितं विशेषणपदं चित्वा लिखत:",
          "marks": 8,
          "type": "grammar",
          "answer": "१. उत्तमः बालकः\n२. मधुराम् वाणीम्\n३. एकम् पुस्तकम्\n४. उत्तमाः वैद्याः",
          "explanation": "विशेष्यस्य लिङ्ग-वचन-विभक्त्यनुसारं विशेषणस्य रूपं भवति।"
        },
        {
          "num": 2,
          "question": "In 'मनोहरा वाटिका', which word is the noun (विशेष्य)?\n(A) मनोहरा (B) वाटिका",
          "questionSanskrit": "'मनोहरा वाटिका' इत्यत्र विशेष्यपदं किम्?",
          "marks": 2,
          "type": "mcq",
          "options": [
            "(A) मनोहरा",
            "(B) वाटिका"
          ],
          "answer": "(B) वाटिका",
          "explanation": "वाटिका संज्ञापदम् (विशेष्यम्), मनोहरा तस्य विशेषणम्।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Textual Adjective-Noun Matching",
      "sectionTitleSanskrit": "खण्डः 'ख' · विशेषण-विशेष्य-मेलनम्",
      "instructions": "Match the pairs from Pages 104–105 of Chapter 9:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 3,
          "question": "Match the adjective with its noun from the text:\n१. विभिन्नानाम् ➔ (a) फलानि\n२. विशाले ➔ (b) व्याधीनाम्\n३. मधुराणि ➔ (c) प्राङ्गणे\n४. उत्कृष्टेन ➔ (d) आयुर्वेदज्ञानेन",
          "questionSanskrit": "पाठान्तर्गत-पदानां मेलनं कुरुत:",
          "marks": 6,
          "type": "matching",
          "answer": "१-(b) व्याधीनाम्, २-(c) प्राङ्गणे, ३-(a) फलानि, ४-(d) आयुर्वेदज्ञानेन",
          "explanation": "पाठे प्रयुक्तानि विशेषण-विशेष्य-युगलानि।"
        },
        {
          "num": 4,
          "question": "Identify the gender, number, and case of 'सात्त्विकं भोजनम्'.",
          "questionSanskrit": "'सात्त्विकं भोजनम्' पदस्य लिङ्गं, वचनं, विभक्तिं च लिखत:",
          "marks": 4,
          "type": "short_ans",
          "answer": "लिङ्गम्: नपुंसकलिङ्गम्; वचनम्: एकवचनम्; विभक्तिः: प्रथमा / द्वितीया विभक्तिः।",
          "explanation": "भोजनम् नपुंसकलिङ्गैकवचने, तदनुरूपं सात्त्विकम्।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch9-ws3",
  "title": "Worksheet 3: Dietary Category Identification (हितभुक्, मितभुक्, ऋतुभुक्)",
  "titleSanskrit": "नवमः पाठः कार्यपत्रिका ३: आहारवर्ग-परिचयः",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Classify modern lifestyle habits into Hitabhuk, Mitabhuk, or Ritubhuk, and apply Ayurvedic dietary wisdom.",
  "sections": [
    {
      "sectionTitle": "Section A: Categorization of Habits",
      "sectionTitleSanskrit": "खण्डः 'क' · आहार-वर्गीकरणम्",
      "instructions": "Classify the following food habits into हितभुक्, मितभुक्, or ऋतुभुक्:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Classify into हितभुक्, मितभुक्, or ऋतुभुक्:\n१. Eating fresh mangoes only during the summer season. ➔ ______________\n२. Avoiding oily fast food to prevent future illnesses. ➔ ______________\n३. Eating only half a bowl of heavy sweets instead of overeating. ➔ ______________\n४. Having warm soup in winter and cool water in summer. ➔ ______________",
          "questionSanskrit": "उचितं वर्गं लिखत:",
          "marks": 8,
          "type": "grammar",
          "answer": "१. ऋतुभुक्\n२. हितभुक्\n३. मितभुक्\n४. ऋतुभुक्",
          "explanation": "ऋतु-अनुकूलम् = ऋतुभुक्; स्वास्थ्यरक्षकम् = हितभुक्; परिमित-मात्रम् = मितभुक्।"
        },
        {
          "num": 2,
          "question": "What does Sage Charaka teach about 'हितभुक्' in Verse 1?",
          "questionSanskrit": "महर्षिः चरकः 'हितभुक्' विषये किं कथयति?",
          "marks": 2,
          "type": "short_ans",
          "answer": "मनुष्य को नित्य ऐसा भोजन करना चाहिए जो वर्तमान स्वास्थ्य की रक्षा करे और भावी रोगों को उत्पन्न न होने दे।",
          "explanation": "श्लोक १: 'स्वास्थ्यं येनानुवर्तते, अजातानां विकाराणामनुत्पत्तिकरं च यत्'।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: The Six Indian Seasons (षट् ऋतवः)",
      "sectionTitleSanskrit": "खण्डः 'ख' · षड्-ऋतवः स्वास्थ्यं च",
      "instructions": "Explore the seasonal health doctrine:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 3,
          "question": "Name the six seasons (षट् ऋतवः) mentioned in the chapter.",
          "questionSanskrit": "पाठे वर्णितानां षण्णाम् ऋतूनां नामानि लिखत:",
          "marks": 6,
          "type": "short_ans",
          "answer": "१. ग्रीष्मः; २. वर्षा; ३. शरद्; ४. हेमन्तः; ५. शिशिरः; ६. वसन्तः।",
          "explanation": "पाठे उक्तम्: 'ग्रीष्मः, वर्षा, शरद्, शिशिरः, हेमन्तः, वसन्तः चेति षट् ऋतवः भवन्ति'।"
        },
        {
          "num": 4,
          "question": "According to Verse 3, what two things increase when one eats according to seasonal suitability?\n(A) Anger and sleep (B) Strength and complexion (बलं वर्णश्च) (C) Wealth and fame",
          "questionSanskrit": "ऋत्वनुकूल-भोजनेन किं वर्धते?",
          "marks": 4,
          "type": "mcq",
          "options": [
            "(A) Anger and sleep",
            "(B) Strength and complexion (बलं वर्णश्च)",
            "(C) Wealth and fame"
          ],
          "answer": "(B) Strength and complexion (बलं वर्णश्च)",
          "explanation": "श्लोक ३: 'तस्याशिताद्यादाहारात् बलं वर्णश्च वर्धते'।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch9-ws4",
  "title": "Worksheet 4: Textual True / False (आम् / न)",
  "titleSanskrit": "नवमः पाठः कार्यपत्रिका ४: सत्यासत्य-निर्णयः",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Determine textual veracity with 'आम्' or 'न' and explore the story of Lord Dhanvantari and physician Vagbhata.",
  "sections": [
    {
      "sectionTitle": "Section A: True / False Evaluation",
      "sectionTitleSanskrit": "खण्डः 'क' · सत्यासत्य-परीक्षा",
      "instructions": "Write 'आम्' for True and 'न' for False statements:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Write 'आम्' or 'न':\n१. भगवान् धन्वन्तरिः काकरूपं धृत्वा भ्रमति स्म। [ ]\n२. वाग्भट्टः चरकसंहितायाः रचनां कृतवान्। [ ]\n३. ग्रीष्म-वर्षा-शरद-शिशिर-हेमन्त-वसन्ताः षट् ऋतवः सन्ति। [ ]\n४. अत्यधिकं भोजनं स्वास्थ्यप्रदं भवति। [ ]\n५. वाग्भटः शुकस्य प्रश्ने त्रीणि उत्तराणि प्राददात्। [ ]",
          "questionSanskrit": "आम् अथवा न लिखत:",
          "marks": 10,
          "type": "grammar",
          "answer": "१. न (False - He assumed शुकरूपम् / parrot form)\n२. न (False - Vagbhata wrote Ashtanga Hridayam; Charaka wrote Charaka Samhita)\n३. आम् (True - Six Indian seasons)\n४. न (False - Overeating is harmful)\n५. आम् (True - Hitabhuk, Mitabhuk, Ritubhuk)",
          "explanation": "पाठान्तर्गत-तथ्यानां समीक्षा।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Story Comprehension (कथा-अवबोधनम्)",
      "sectionTitleSanskrit": "खण्डः 'ख' · कथा-अवबोधनम्",
      "instructions": "Answer based on the Dhanvantari-Vagbhata story:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 2,
          "question": "Why did Lord Dhanvantari travel across India disguised as a parrot?",
          "questionSanskrit": "भगवान् धन्वन्तरिः किमर्थं शुकरूपं धृत्वा अभ्रमत्?",
          "marks": 5,
          "type": "short_ans",
          "answer": "'भारतवर्षे वैद्याः विभिन्नानां व्याधीनां शमनं कतरं कुर्वन्ति' इति ज्ञातुम् उत्तमस्य वैद्यस्य अन्वेषणाय च भगवान् धन्वन्तरिः अभ्रमत्।",
          "explanation": "पाठे स्पष्टम् उल्लिखितम्।"
        },
        {
          "num": 3,
          "question": "What instruction did Lord Dhanvantari give to Vagbhata before disappearing?",
          "questionSanskrit": "धन्वन्तरिः अन्तर्हितः पूर्वं वाग्भटं किम् उक्तवान्?",
          "marks": 5,
          "type": "short_ans",
          "answer": "'त्वम् अवश्यमेव आयुर्वेद-अष्टाङ्गविचार-सारभूतं तन्त्रं विरचयेः' इति धन्वन्तरिः वाग्भटम् उक्तवान्।",
          "explanation": "अष्टाङ्गहृदयस्य रचनायाः आदेशः।"
        }
      ]
    }
  ]
},
{
  "id": "ws-grade8-ch9-ws5",
  "title": "Worksheet 5: Daily Health Routine Plan & Universal Wellbeing (दिनचर्या शान्तिमन्त्रः च)",
  "titleSanskrit": "नवमः पाठः कार्यपत्रिका ५: दिनचर्या शान्तिमन्त्रः च",
  "category": "grade8",
  "categoryLabel": "Grade 8 Sanskrit · CBSE Deepakam",
  "grade": "CBSE Grade 8 (Deepakam Framework)",
  "totalMarks": 20,
  "timeLimit": "45 Mins",
  "description": "Four golden rules of morning regimen from Verse 4, universal health prayer from Verse 5, and holistic lifestyle planning.",
  "sections": [
    {
      "sectionTitle": "Section A: Daily Health Regimen Matching (Verse 4)",
      "sectionTitleSanskrit": "खण्डः 'क' · दिनचर्या-सूत्राणि",
      "instructions": "Match the daily healthy activity with its Sanskrit term from Verse 4:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 1,
          "question": "Match the activity with the Sanskrit phrase:\n१. Waking early and exercising ➔ (a) बुभुक्षायाञ्च भोजनम्\n२. Cleaning your teeth daily ➔ (b) व्यायामः प्रातरुत्थाय\n३. Bathing with pure clean water ➔ (c) नित्यं दन्तविशोधनम्\n४. Eating only when genuinely hungry ➔ (d) स्वच्छजलेन सुस्नानम्",
          "questionSanskrit": "श्लोक ४ अनुसारं मेलयत:",
          "marks": 6,
          "type": "matching",
          "answer": "१-(b), २-(c), ३-(d), ४-(a)",
          "explanation": "श्लोक ४: 'व्यायामः प्रातरुत्थाय, नित्यं दन्तविशोधनम्। स्वच्छजलेन सुस्नानं, बुभुक्षायाञ्च भोजनम्॥'"
        },
        {
          "num": 2,
          "question": "Fill in the blank from Verse 4:\n'स्वच्छजलेन सुस्नानं, ______________ भोजनम्।'\n(A) बुभुक्षायाञ्च (B) रात्रौ (C) प्रातः",
          "questionSanskrit": "श्लोकांशं पूरयत:",
          "marks": 4,
          "type": "fill",
          "answer": "बुभुक्षायाञ्च",
          "explanation": "भूख लगने पर ही भोजन करना चाहिए (बुभुक्षायाञ्च भोजनम्)।"
        }
      ]
    },
    {
      "sectionTitle": "Section B: Universal Peace Prayer (Verse 5)",
      "sectionTitleSanskrit": "खण्डः 'ख' · सर्वे भवन्तु सुखिनः",
      "instructions": "Explain and recite the universal health prayer:",
      "totalMarks": 10,
      "questions": [
        {
          "num": 3,
          "question": "Complete the timeless prayer:\n'सर्वे भवन्तु सुखिनः, सर्वे सन्तु ______________।\nसर्वे भद्राणि पश्यन्तु, मा कश्चिद् ______________॥'",
          "questionSanskrit": "प्रार्थनां पूरयत:",
          "marks": 5,
          "type": "fill",
          "answer": "निरामयाः; दुःखभाग्भवेत्",
          "explanation": "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत्॥"
        },
        {
          "num": 4,
          "question": "What is the universal message of this prayer for human health and society?",
          "questionSanskrit": "अस्याः प्रार्थनायाः कः सन्देशः?",
          "marks": 5,
          "type": "short_ans",
          "answer": "यह प्रार्थना केवल अपने लिए नहीं, अपितु सम्पूर्ण संसार के सभी प्राणियों के सुख, नीरोगिता (स्वास्थ्य), मंगल और दुःखमुक्ति की कामना करती है। यह भारतीय संस्कृति की 'वसुधैव कुटुम्बकम्' और 'सर्वे सन्तु निरामयाः' की उदात्त भावना को प्रकट करती है।",
          "explanation": "भारतीय-संस्कृतेः सर्वकल्याणकारिणी भावना।"
        }
      ]
    }
  ]
},
];
