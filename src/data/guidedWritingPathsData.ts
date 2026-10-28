/**
 * Guided Sequential Writing Assignment Paths Data
 * (क्रमिक-लेखन-अभ्यास-मार्गाः · Learn Sanskrit Through Guided Writing)
 *
 * Paths:
 * 1. Basics First (मूल-प्रवेशः · Letters, Matras, Simple Words)
 * 2. Shloka & Spiritual Path (स्तोत्र-श्लोक-मन्त्राः · Sacred Invocations & Gita)
 * 3. CBSE Class 7 Syllabus Path (सप्तमी कक्षा · NCERT Deepakam)
 * 4. CBSE Class 8 Syllabus Path (अष्टमी कक्षा · NCERT Deepakam 2)
 * 5. CBSE Class 9 Syllabus Path (नवमी कक्षा · NCERT Sharada / Shemushi)
 * 6. Spoken & Conversational Path (सम्भाषण-संस्कृतम् · Daily Colloquial Usage)
 */

export interface WritingAssignment {
  id: string;
  order: number;
  title: string;
  titleSanskrit: string;
  badge: string;
  targetSanskrit: string;
  transliteration: string;
  meaningEnglish: string;
  meaningHindi: string;
  handwritingTips: string;
  grammaticalNotes: string[];
  practicePrompt: string;
  expectedKeywords: string[];
  suggestedMaxMarks: number;
}

export interface WritingPath {
  id: string;
  title: string;
  titleSanskrit: string;
  subtitle: string;
  icon: string;
  badge: string;
  levelBadge: string;
  accentColor: string;
  description: string;
  assignments: WritingAssignment[];
}

export const GUIDED_WRITING_PATHS: WritingPath[] = [
  {
    id: 'basics',
    title: 'Basics First: Foundation Scribe',
    titleSanskrit: 'मूल-प्रवेशः · अक्षर-मात्रा-पद-लेखनम्',
    subtitle: 'Step 1: Start with Devanagari character formation, matras, conjuncts & simple words',
    icon: '🌱',
    badge: 'Foundation · अनिवार्य-प्रारम्भः',
    levelBadge: 'Stage 1 · Beginner',
    accentColor: '#059669',
    description:
      'Master the sacred Devanagari script from the ground up: horizontal roof bar (शिरोरेखा), short and long vowel modifiers (मात्राः), conjunct consonants (संयुक्ताक्षराणि), and core 2-word Sanskrit sentences.',
    assignments: [
      {
        id: 'basics-1-vowels',
        order: 1,
        title: 'Vowels & Matra Strokes',
        titleSanskrit: 'स्वर-मात्रा-परिचयः',
        badge: 'Lesson 1',
        targetSanskrit: 'अ आ इ ई उ ऊ ऋ ए ऐ ओ औ अं अः',
        transliteration: 'a ā i ī u ū ṛ e ai o au aṃ aḥ',
        meaningEnglish: 'The 13 primary vowels of the Sanskrit Varnamala with anusvara and visarga.',
        meaningHindi: 'संस्कृत वर्णमाला के १३ मूल स्वर, अनुस्वार एवं विसर्ग।',
        handwritingTips:
          'Ensure uniform character height. Always complete character curves and stems first, finishing with the continuous top horizontal bar (शिरोरेखा).',
        grammaticalNotes: [
          'ह्रस्व-दीर्घ-भेदः: Vowels are paired as short (ह्रस्व) and long (दीर्घ) lasting 1 and 2 mātrās respectively.',
          'अं represents Anusvāra (nasalization); अः represents Visarga (unvoiced aspiration).',
        ],
        practicePrompt: 'Write all 13 vowels in clean sequence with neat shirorekha alignment.',
        expectedKeywords: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
        suggestedMaxMarks: 10,
      },
      {
        id: 'basics-2-consonants-matras',
        order: 2,
        title: 'Barakhadi: Consonants with Vowel Signs',
        titleSanskrit: 'क-वर्ग मात्रा-संयोगः (बारहखड़ी)',
        badge: 'Lesson 2',
        targetSanskrit: 'क का कि की कु कू कृ के कै को कौ कं कः',
        transliteration: 'ka kā ki kī ku kū kṛ ke kai ko kau kaṃ kaḥ',
        meaningEnglish: 'The full 12-modifier Barakhadi series on the guttural consonant "Ka".',
        meaningHindi: 'कण्ठ्य व्यञ्जन "क" पर १२ मात्राओं का बारहखड़ी क्रम।',
        handwritingTips:
          'In "कि", note how the short-i loop arches backward from the right vertical stem to the left. In "कु", the foot curl loops leftward; in "कू", it points rightward.',
        grammaticalNotes: [
          'मात्रा-नियमः: When a consonant combines with a vowel, the pure consonant loses its virāma (halanta) and assumes the vowel matra sign.',
        ],
        practicePrompt: 'Write the complete 12-form Barakhadi set for "क".',
        expectedKeywords: ['क', 'का', 'कि', 'की', 'कु', 'कू', 'के', 'कै', 'को', 'कौ'],
        suggestedMaxMarks: 10,
      },
      {
        id: 'basics-3-conjuncts',
        order: 3,
        title: 'Conjunct Consonants & Halanta',
        titleSanskrit: 'संयुक्त-वर्णाः एवं हलन्ताभ्यासः',
        badge: 'Lesson 3',
        targetSanskrit: 'क्ष त्र ज्ञ श्र द्ध त्त न्न',
        transliteration: 'kṣa tra jña śra ddha tta nna',
        meaningEnglish: 'Seven essential Sanskrit conjunct consonants formed by fusion of two consonants.',
        meaningHindi: 'दो व्यञ्जनों के मेल से बनने वाले सात प्रमुख संयुक्त वर्ण।',
        handwritingTips:
          'For "क्ष" (क् + ष), ensure the upper knot loops smoothly. For "ज्ञ" (ज् + ञ), begin with a loop then curve like Jña.',
        grammaticalNotes: [
          'पाणिनि-संज्ञा: "हलोऽनन्तराः संयोगः" — Two or more consonants without an intervening vowel form a Saṃyoga (conjunct).',
        ],
        practicePrompt: 'Practice writing each conjunct twice, maintaining equal width.',
        expectedKeywords: ['क्ष', 'त्र', 'ज्ञ', 'श्र', 'द्ध', 'त्त', 'न्न'],
        suggestedMaxMarks: 10,
      },
      {
        id: 'basics-4-everyday-words',
        order: 4,
        title: 'Core Sanskrit Vocabulary',
        titleSanskrit: 'दैनन्दिन-शब्दाः (Core Vocabulary)',
        badge: 'Lesson 4',
        targetSanskrit: 'पुस्तकम् फलम् जलम् वृक्षः बालकः माता पिता गुरुः',
        transliteration: 'pustakam phalam jalam vṛkṣaḥ bālakaḥ mātā pitā guruḥ',
        meaningEnglish: 'Book, fruit, water, tree, boy, mother, father, teacher.',
        meaningHindi: 'पुस्तक, फल, जल, पेड़, बालक, माता, पिता, शिक्षक।',
        handwritingTips:
          'Notice Halanta (्) on neuter endings (पुस्तकम्, फलम्, जलम्) and Visarga (ः) on masculine singular endings (वृक्षः, बालकः, गुरुः).',
        grammaticalNotes: [
          'लिङ्ग-भेदः: पुस्तकम्/फलम्/जलम् are Neuter (नपुंसकलिङ्ग); वृक्षः/बालकः/गुरुः are Masculine (पुंल्लिङ्ग).',
        ],
        practicePrompt: 'Write the 8 everyday Sanskrit nouns with exact halanta and visarga marks.',
        expectedKeywords: ['पुस्तकम्', 'फलम्', 'जलम्', 'वृक्षः', 'बालकः', 'माता', 'पिता', 'गुरुः'],
        suggestedMaxMarks: 10,
      },
      {
        id: 'basics-5-simple-sentences',
        order: 5,
        title: 'Simple 2-Word Sentences',
        titleSanskrit: 'प्राथमिक-वाक्य-रचना',
        badge: 'Lesson 5',
        targetSanskrit: 'सः गच्छति । सा पठति । अहं लिखामि । बालकः क्रीडति ।',
        transliteration: 'saḥ gacchati. sā paṭhati. ahaṃ likhāmi. bālakaḥ krīḍati.',
        meaningEnglish: 'He goes. She reads. I write. The boy plays.',
        meaningHindi: 'वह जाता है। वह पढ़ती है। मैं लिखता हूँ। बालक खेलता है।',
        handwritingTips:
          'Place full danda (। ) with a clear space after each sentence. Do not substitute with modern full stops.',
        grammaticalNotes: [
          'कर्तृ-क्रिया-अन्वयः: Third-person singular subject takes "-ति" ending (गच्छति, पठति, क्रीडति). First-person "अहम्" takes "-मि" (लिखामि).',
        ],
        practicePrompt: 'Write the 4 simple sentences with full stops (।) and correct verb endings.',
        expectedKeywords: ['सः', 'गच्छति', 'सा', 'पठति', 'अहं', 'लिखामि', 'बालकः', 'क्रीडति'],
        suggestedMaxMarks: 15,
      },
    ],
  },
  {
    id: 'spiritual',
    title: 'Shloka & Spiritual Track',
    titleSanskrit: 'स्तोत्र-श्लोक-मन्त्राः · Sacred & Philosophical Path',
    subtitle: 'Write sacred Vedic invocations, Bhagavad Gita verses, peace mantras & timeless wisdom',
    icon: '🕉️',
    badge: 'Spiritual · आध्यात्मिकम्',
    levelBadge: 'Sacred Sanskrit',
    accentColor: '#d97706',
    description:
      'Immerse in the timeless vibration of sacred Sanskrit. Write invocations, the Gayatri Mahamantra, the Bhagavad Gita’s Karma Yoga verse, and Upanishadic peace chants with word-by-word awareness and anvaya.',
    assignments: [
      {
        id: 'spiritual-1-vakratunda',
        order: 1,
        title: 'Ganesha Mangalacharanam',
        titleSanskrit: 'मङ्गलाचरणम् — वक्रतुण्ड महाकाय',
        badge: 'Shloka 1',
        targetSanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
        transliteration: 'vakratuṇḍa mahākāya sūryakoṭi samaprabha |\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā ||',
        meaningEnglish:
          'O Lord of curved trunk and mammoth form, whose radiance equals ten million suns, please make all my endeavors free of obstacles forever.',
        meaningHindi:
          'हे वक्र सूण्ड वाले, विशालकाय, करोड़ों सूर्यों के समान तेजस्वी देव! मेरे समस्त कार्यों को सदा निर्विघ्न सम्पन्न कीजिए।',
        handwritingTips:
          'Notice single danda (। ) at the end of the first hemistich and double danda (॥ ) at the completion of the shloka.',
        grammaticalNotes: [
          'सम्बोधन-रूपाणि: वक्रतुण्ड, महाकाय, समप्रभ, and देव are all in the Vocative Case (सम्बोधन-प्रथमा).',
          'लोट्-लकारः: "कुरु" is Imperative Mood (लोट्-लकार, मध्यमपुरुषैकवचनम्) expressing prayer.',
        ],
        practicePrompt: 'Write the 2 lines of the Ganesha invocation with authentic shirorekha and verse dandas.',
        expectedKeywords: ['वक्रतुण्ड', 'महाकाय', 'सूर्यकोटि', 'समप्रभ', 'निर्विघ्नं', 'कुरु', 'मे', 'देव'],
        suggestedMaxMarks: 20,
      },
      {
        id: 'spiritual-2-asato-ma',
        order: 2,
        title: 'Upanishadic Shanti Mantra',
        titleSanskrit: 'उपनिषत् शान्ति-मन्त्रः — असतो मा सद्गमय',
        badge: 'Shloka 2',
        targetSanskrit: 'ॐ असतो मा सद्गमय ।\nतमसो मा ज्योतिर्गमय ।\nमृत्योर्मा अमृतं गमय ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
        transliteration: 'oṃ asato mā sadgamaya |\ntamaso mā jyotirgamaya |\nmṛtyormā amṛtaṃ gamaya ||\noṃ śāntiḥ śāntiḥ śāntiḥ ||',
        meaningEnglish:
          'Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality. Om Peace, Peace, Peace.',
        meaningHindi:
          'मुझे असत्य से सत्य की ओर ले चलो। मुझे अन्धकार से प्रकाश की ओर ले चलो। मुझे मृत्यु से अमरता की ओर ले चलो। ॐ शान्ति, शान्ति, शान्ति।',
        handwritingTips:
          'For "ज्योतिर्गमय", ensure the repha (र्) rests above the letter "ग". In "मृत्योर्मा", observe the sandhi combination.',
        grammaticalNotes: [
          'पञ्चमी-विभक्तिः: असतः, तमसः, and मृत्योः are Ablative case (पञ्चमी) indicating origin/starting point.',
          'णिजन्त-क्रिया: "गमय" is a causative imperative verb meaning "cause to go / lead".',
        ],
        practicePrompt: 'Write the 4 lines of this Brihadaranyaka Upanishad prayer neatly on ruled lines.',
        expectedKeywords: ['असतो', 'सद्गमय', 'तमसो', 'ज्योतिर्गमय', 'मृत्योर्मा', 'अमृतं', 'शान्तिः'],
        suggestedMaxMarks: 20,
      },
      {
        id: 'spiritual-3-gita-karma',
        order: 3,
        title: 'Bhagavad Gita: Karma Yoga',
        titleSanskrit: 'भगवद्गीता २.४७ — कर्मण्येवाधिकारस्ते',
        badge: 'Shloka 3',
        targetSanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
        transliteration: 'karmaṇyevādhikāraste mā phaleṣu kadācana |\nmā karmaphalaheturbhūrmā te saṅgo\'stvakarmaṇi ||',
        meaningEnglish:
          'You have a right to your prescribed duty alone, never to its fruits. Let not the fruit of action be your motive, nor let your attachment be to inaction.',
        meaningHindi:
          'तुम्हारा अधिकार केवल कर्म करने में ही है, उसके फलों में कभी नहीं। इसलिए तुम कर्मफल के हेतु मत बनो और न ही तुम्हारी अकर्मण्यता में आसक्ति हो।',
        handwritingTips:
          'Observe the Avagraha (ऽ) in "सङ्गोऽस्त्वकर्मणि" representing the elided short vowel "अ" after Visarga Sandhi.',
        grammaticalNotes: [
          'सन्धि-विच्छेदः: कर्मणि + एव + अधिकारः + ते = कर्मण्येवाधिकारस्ते (यण् + वृद्धि + विसर्ग सन्धिः).',
          'सप्तमी विभक्तिः: कर्मणि and फलेषु are Locative (सप्तमी) case.',
        ],
        practicePrompt: 'Transcribe this cardinal shloka of the Gita, carefully separating words with proper sandhi.',
        expectedKeywords: ['कर्मण्येवाधिकारस्ते', 'मा', 'फलेषु', 'कदाचन', 'कर्मफलहेतुः', 'सङ्गोऽस्त्वकर्मणि'],
        suggestedMaxMarks: 20,
      },
      {
        id: 'spiritual-4-vidya-dadati',
        order: 4,
        title: 'Subhashita: True Fruit of Education',
        titleSanskrit: 'सुभाषितम् — विद्या ददाति विनयं',
        badge: 'Shloka 4',
        targetSanskrit: 'विद्या ददाति विनयं विनयाद् याति पात्रताम् ।\nपात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ॥',
        transliteration: 'vidyā dadāti vinayaṃ vinayād yāti pātratām |\npātratvāddhanamāpnoti dhanāddharmaṃ tataḥ sukham ||',
        meaningEnglish:
          'Education gives humility; from humility comes worthiness; from worthiness one attains wealth; from wealth righteous living, and from righteousness true happiness.',
        meaningHindi:
          'विद्या नम्रता देती है, नम्रता से योग्यता आती है, योग्यता से धन मिलता है, धन से धर्म होता है और धर्म से सच्चा सुख प्राप्त होता है।',
        handwritingTips:
          'In "पात्रत्वाद्धनम्", write the conjunct "द्ध" (द् + ध) smoothly without breaking the top shirorekha bar.',
        grammaticalNotes: [
          'पञ्चमी-परम्परा: Note the sequential cause-and-effect chain in Ablative case: विनयात्, पात्रत्वात्, धनात्.',
        ],
        practicePrompt: 'Write both lines of the Subhashita with clean punctuation and consistent character size.',
        expectedKeywords: ['विद्या', 'ददाति', 'विनयं', 'पात्रताम्', 'धनम्', 'धर्मं', 'सुखम्'],
        suggestedMaxMarks: 20,
      },
    ],
  },
  {
    id: 'grade7',
    title: 'CBSE Class 7 Syllabus Path',
    titleSanskrit: 'सप्तमी कक्षा · NCERT Deepakam Curriculum',
    icon: '📘',
    badge: 'Class 7 · सप्तमी',
    levelBadge: 'NCERT Grade 7',
    accentColor: '#2563eb',
    subtitle: 'Directly aligned with NCERT Deepakam Chapter 1–14 syllabus and exam writing questions',
    description:
      'Curated sequential writing exercises for 7th grade CBSE students: master the opening chapter Vande Bharatamataram, Rāma noun declensions across 7 cases, present tense verb paradigms, and Upapada vibhaktis.',
    assignments: [
      {
        id: 'g7-1-vande-bharata',
        order: 1,
        title: 'Ch 1: Vande Bharatamataram',
        titleSanskrit: 'पाठ १ — वन्दे भारतमातरम् (NCERT Deepakam)',
        badge: 'Deepakam 1',
        targetSanskrit: 'वन्दे भारतमातरम् ।\nश्यामल-शस्य-सुशोभिताम् ।\nहिमकिरीट-मण्डिताम् ॥',
        transliteration: 'vande bhāratamātaram |\nśyāmala-śasya-suśobhitām |\nhimakiriṭa-maṇḍitām ||',
        meaningEnglish: 'I bow to Mother India, adorned with lush green fields and crowned with Himalayan snows.',
        meaningHindi: 'मैं भारतमाता को वन्दना करता हूँ, जो हरी-भरी फसलों से सुशोभित और हिम-किरीट से मण्डित हैं।',
        handwritingTips: 'Notice the hyphenation in compound adjectives (श्यामल-शस्य-सुशोभिताम्).',
        grammaticalNotes: [
          'द्वितीया-विभक्तिः: All adjectives (सुशोभिताम्, मण्डिताम्) agree in Gender, Number and Case with the object भारतमातरम् (स्त्रीलिङ्ग, द्वितीया, एकवचनम्).',
        ],
        practicePrompt: 'Write the 3 opening lines of Chapter 1 with proper anusvara on all accusative endings.',
        expectedKeywords: ['वन्दे', 'भारतमातरम्', 'श्यामल', 'सुशोभिताम्', 'हिमकिरीट', 'मण्डिताम्'],
        suggestedMaxMarks: 15,
      },
      {
        id: 'g7-2-rama-shabdroop',
        order: 2,
        title: 'Rāma Shabdroop: 7 Cases',
        titleSanskrit: 'अकारान्त-पुंल्लिङ्ग "राम" शब्दरूपाणि',
        badge: 'Grammar 1',
        targetSanskrit: 'प्रथमा: रामः रामौ रामाः\nद्वितीया: रामं रामौ रामान्\nतृतीया: रामेण रामाभ्याम् रामैः\nसप्तमी: रामे रामयोः रामेषु',
        transliteration: 'prathamā: rāmaḥ rāmau rāmāḥ\ndvitiyā: rāmaṃ rāmau rāmān\ntṛtīyā: rāmeṇa rāmābhyām rāmaiḥ\nsaptamī: rāme rāmayoḥ rāmeṣu',
        meaningEnglish: 'Core declension paradigms of masculine noun Rāma across 1st, 2nd, 3rd, and 7th cases.',
        meaningHindi: 'अकारान्त पुंल्लिङ्ग शब्द "राम" के प्रथमा, द्वितीया, तृतीया एवं सप्तमी विभक्ति रूप।',
        handwritingTips: 'Take care with visarga on "रामः", "रामाः", and "रामेभ्यः", and halanta on "रामान्".',
        grammaticalNotes: [
          'णत्व-विधानम्: In "रामेण", the letter "न" turns into "ण" due to the preceding "र" (पाणिनि सूत्रम्: रषाभ्यां नो णः समानपदे).',
        ],
        practicePrompt: 'Write the 4 selected case rows of the Rāma paradigm with exact case headers.',
        expectedKeywords: ['रामः', 'रामौ', 'रामाः', 'रामं', 'रामान्', 'रामेण', 'रामाभ्याम्', 'रामे', 'रामेषु'],
        suggestedMaxMarks: 20,
      },
      {
        id: 'g7-3-present-tense-verbs',
        order: 3,
        title: 'Present Tense (लट्-लकार) Verbs',
        titleSanskrit: 'लट्-लकार धातु-रूपाणि (पठ् व गम्)',
        badge: 'Grammar 2',
        targetSanskrit: 'प्रथमपुरुषः: पठति पठतः पठन्ति\nमध्यमपुरुषः: पठसि पठथः पठथ\nउत्तमपुरुषः: पठामि पठावः पठामः',
        transliteration: 'prathamapuruṣaḥ: paṭhati paṭhataḥ paṭhanti\nmadhyamapuruṣaḥ: paṭhasi paṭhathaḥ paṭhatha\nuttamapuruṣaḥ: paṭhāmi paṭhāvaḥ paṭhāmaḥ',
        meaningEnglish: 'Conjugation table of the root verb "पठ्" (to read) in the Present Tense (लट्-लकार).',
        meaningHindi: 'पठ् (पढ़ना) धातु के लट्-लकार (वर्तमान काल) के तीनों पुरुषों के रूप।',
        handwritingTips: 'Notice visarga on dual forms (पठतः, पठथः, पठावः, पठामः) but absence on plural पठथ and पठन्ति.',
        grammaticalNotes: [
          'तिङ्-प्रत्ययाः: The nine personal endings are: ति, तः, अन्ति; सि, थः, थ; मि, वः, मः.',
        ],
        practicePrompt: 'Write the complete 9-cell present tense matrix for "पठ्".',
        expectedKeywords: ['पठति', 'पठतः', 'पठन्ति', 'पठसि', 'पठथः', 'पठथ', 'पठामि', 'पठावः', 'पठामः'],
        suggestedMaxMarks: 20,
      },
      {
        id: 'g7-4-story-anvaya',
        order: 4,
        title: 'Ch 4: Amlam Drakshaphalama',
        titleSanskrit: 'पाठ ४ — आम्लं द्राक्षाफलम् (कथा-वाक्य-लेखनम्)',
        badge: 'Deepakam 4',
        targetSanskrit: 'एकः शृगालः वने भ्रमति ।\nसः पिपासितः बुभुक्षितः च अस्ति ।\nसः लतायां पक्वानि द्राक्षाफलानि पश्यति ।',
        transliteration: 'ekaḥ śṛgālaḥ vane bhramati |\nsaḥ pipāsitaḥ bubhukṣitaḥ ca asti |\nsaḥ latāyāṃ pakvāni drākṣāphalāni paśyati |',
        meaningEnglish: 'A fox wanders in the forest. He is thirsty and hungry. He sees ripe grapes on a vine.',
        meaningHindi: 'एक सियार वन में घूमता है। वह प्यासा और भूखा है। वह लता पर पके अंगूर देखता है।',
        handwritingTips: 'In "शृगालः", note the vocalic r-vowel (ऋ-कार) curving at the bottom of "श".',
        grammaticalNotes: [
          'विशेषण-विशेष्य-सम्बन्धः: "पक्वानि द्राक्षाफलानि" — both adjective and noun are Neuter Plural (नपुंसकलिङ्ग-प्रथमा-बहुवचनम्).',
        ],
        practicePrompt: 'Write the 3 story sentences with correct punctuation and gender concordance.',
        expectedKeywords: ['शृगालः', 'वने', 'भ्रमति', 'पिपासितः', 'बुभुक्षितः', 'लतायां', 'द्राक्षाफलानि'],
        suggestedMaxMarks: 20,
      },
    ],
  },
  {
    id: 'grade8',
    title: 'CBSE Class 8 Syllabus Path',
    titleSanskrit: 'अष्टमी कक्षा · NCERT Deepakam 2 Curriculum',
    icon: '📗',
    badge: 'Class 8 · अष्टमी',
    levelBadge: 'NCERT Grade 8',
    accentColor: '#7c3aed',
    subtitle: 'Class 8 syllabus topics: Past & Future lakaras, Ktvā/Lyap suffixes, and short essays',
    description:
      'Structured writing assignments for 8th-grade students preparing for CBSE school exams: master Lang-Lakāra (Past Tense), Lṛṭ-Lakāra (Future Tense), indeclinable participles, and paragraph composition.',
    assignments: [
      {
        id: 'g8-1-subhashita',
        order: 1,
        title: 'Class 8 Subhashitaratnani',
        titleSanskrit: 'सुभाषित-रत्नानि — पृथिव्यां त्रीणि रत्नानि',
        badge: 'Class 8 Ch 1',
        targetSanskrit: 'पृथिव्यां त्रीणि रत्नानि जलमन्नं सुभाषितम् ।\nमूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते ॥',
        transliteration: 'pṛthivyāṃ trīṇi ratnāni jalamannaṃ subhāṣitam |\nmūḍhaiḥ pāṣāṇakhaṇḍeṣu ratnasaṃjñā vidhīyate ||',
        meaningEnglish:
          'On this earth there are three true jewels: water, food, and wise sayings. Fools, however, assign the name of jewel to pieces of stone.',
        meaningHindi:
          'पृथ्वी पर तीन ही वास्तविक रत्न हैं—जल, अन्न और सुभाषित। परन्तु मूर्खों द्वारा पत्थर के टुकड़ों को रत्न की संज्ञा दी जाती है।',
        handwritingTips: 'Notice "पृथिव्यां" in 7th case with anusvara, and the conjunct "त्ना" in "रत्नानि".',
        grammaticalNotes: [
          'सप्तमी-प्रयोगः: पृथिव्याम् (on earth) and पाषाणखण्डेषु (in stone pieces) are Locative.',
          'कर्मवाच्यम्: "विधीयते" is a passive verb (कर्मवाच्य, प्रथमपुरुषैकवचनम्).',
        ],
        practicePrompt: 'Write both lines of this Class 8 Subhashita maintaining symmetrical margins.',
        expectedKeywords: ['पृथिव्यां', 'त्रीणि', 'रत्नानि', 'जलमन्नं', 'सुभाषितम्', 'पाषाणखण्डेषु', 'रत्नसंज्ञा'],
        suggestedMaxMarks: 20,
      },
      {
        id: 'g8-2-tenses',
        order: 2,
        title: 'Past & Future Tense Sentences',
        titleSanskrit: 'लङ्-लकारः (भूतकालः) एवं लृट्-लकारः (भविष्यत्कालः)',
        badge: 'Grammar 1',
        targetSanskrit: 'भूतकालः: छात्रः पाठम् अपठत् । बालकाः गृहम अगच्छन् ।\nभविष्यत्कालः: अहं श्वः विद्यालयं गमिष्यामि । वयम् क्रीडिष्यामः ।',
        transliteration: 'bhūtakālaḥ: chātraḥ pāṭham apaṭhat | bālakāḥ gṛham agacchan |\nbhaviṣyatkālaḥ: ahaṃ śvaḥ vidyālayaṃ gamiṣyāmi | vayam krīḍiṣyāmaḥ |',
        meaningEnglish:
          'Past: The student read the lesson. The boys went home. Future: I will go to school tomorrow. We will play.',
        meaningHindi:
          'भूतकाल: छात्र ने पाठ पढ़ा। बालक घर गए। भविष्यत्काल: मैं कल विद्यालय जाऊँगा। हम खेलेंगे।',
        handwritingTips: 'Pay attention to the augment "अ-" prefixed to all past tense verbs (अपठत्, अगच्छन्).',
        grammaticalNotes: [
          'अडागमः: In लङ्-लकार, roots take the "अट्" augment at the start: अ + पठ् + त् = अपठत्.',
          'स्य-प्रत्ययः: In लृट्-लकार, the future sign "स्य / इष्य" is inserted: गम् -> गमिष्यामि.',
        ],
        practicePrompt: 'Write all 4 sentences illustrating past and future tense conjugations.',
        expectedKeywords: ['अपठत्', 'अगच्छन्', 'गमिष्यामि', 'क्रीडिष्यामः', 'भूतकालः', 'भविष्यत्कालः'],
        suggestedMaxMarks: 20,
      },
      {
        id: 'g8-3-pratyaya',
        order: 3,
        title: 'Suffix Drills: Ktvā, Lyap & Tumun',
        titleSanskrit: 'प्रत्यय-प्रयोगः (क्त्वा, ल्यप्, तुमुन्)',
        badge: 'Grammar 2',
        targetSanskrit: '१. सः पाठं पठित्वा गृहं गच्छति ।\n२. छात्रः गुरुं प्रणम्य उपविशति ।\n३. बालकः दुग्धं पातुम् इच्छति ।',
        transliteration: '1. saḥ pāṭhaṃ paṭhitvā gṛhaṃ gacchati |\n2. chātraḥ guruṃ praṇamya upaviśati |\n3. bālakaḥ dugdhaṃ pātum icchati |',
        meaningEnglish:
          '1. Having read the lesson, he goes home. 2. Having bowed to the teacher, the student sits. 3. The boy wishes to drink milk.',
        meaningHindi:
          '१. वह पाठ पढ़कर घर जाता है। २. छात्र गुरु को प्रणाम करके बैठता है। ३. बालक दूध पीना चाहता है।',
        handwritingTips: 'In "प्रणम्य", ensure the retroflex "ण" is distinct from "न".',
        grammaticalNotes: [
          'क्त्वा vs ल्यप्: Standalone roots take "क्त्वा" (पठित्वा). If a prefix is attached (प्र + नम्), "ल्यप्" is used (प्रणम्य).',
          'तुमुन्: Expresses infinitive purpose (पातुम् = in order to drink).',
        ],
        practicePrompt: 'Write the 3 participle sentences demonstrating correct suffix usage.',
        expectedKeywords: ['पठित्वा', 'प्रणम्य', 'पातुम्', 'गच्छति', 'उपविशति', 'इच्छति'],
        suggestedMaxMarks: 20,
      },
      {
        id: 'g8-4-short-essay',
        order: 4,
        title: 'Anuchhed Lekhan: My School',
        titleSanskrit: 'अनुच्छेद-लेखनम् — "मम विद्यालयः"',
        badge: 'Composition',
        targetSanskrit: 'मम विद्यालयस्य नाम गुरुकुलम् अस्ति ।\nअत्र एकं विशालं पुस्तकालयम् अस्ति ।\nसर्वे शिक्षकाः स्नेहेन पाठयन्ति ।\nवयं प्रतिदिनं समयेन विद्यालयं गच्छामः ।\nमह्यं मम विद्यालयः अतीव रोचते ।',
        transliteration: 'mama vidyālayasya nāma gurukulam asti |\natra ekaṃ viśālaṃ pustakālayam asti |\nsarve śikṣakāḥ snehena pāṭhayanti |\nvayaṃ pratidinaṃ samayena vidyālayaṃ gacchāmaḥ |\nmahyaṃ mama vidyālayaḥ atīva rocate |',
        meaningEnglish:
          'My school name is Gurukul. Here there is a large library. All teachers teach with love. We go to school on time every day. I like my school very much.',
        meaningHindi:
          'मेरे विद्यालय का नाम गुरुकुल है। यहाँ एक विशाल पुस्तकालय है। सभी शिक्षक स्नेह से पढ़ाते हैं। हम प्रतिदिन समय पर विद्यालय जाते हैं। मुझे अपना विद्यालय बहुत प्रिय लगता है।',
        handwritingTips: 'Keep regular paragraph line spacing and indentation.',
        grammaticalNotes: [
          'रुच्-धातु-योगे चतुर्थी: "मह्यं रोचते" — the verb "रोचते" governs the 4th case (चतुर्थी) for the person who likes (मह्यम्).',
        ],
        practicePrompt: 'Write the 5-sentence essay about school in fluent, accurate Sanskrit.',
        expectedKeywords: ['मम', 'विद्यालयस्य', 'पुस्तकालयम्', 'शिक्षकाः', 'पाठयन्ति', 'मह्यं', 'रोचते'],
        suggestedMaxMarks: 25,
      },
    ],
  },
  {
    id: 'grade9',
    title: 'CBSE Class 9 Syllabus Path',
    titleSanskrit: 'नवमी कक्षा · NCERT Sharada / Shemushi',
    icon: '📕',
    badge: 'Class 9 · नवमी',
    levelBadge: 'NCERT Grade 9',
    accentColor: '#dc2626',
    subtitle: 'Formal CBSE Class 9 topics: Sandhi, Letter writing, Picture description, and literature',
    description:
      'Rigorous writing practice for Class 9 CBSE Sanskrit exams: write Saraswati invocations from Bharati-Vasantagiti, master compound Sandhi rules, formal leave applications (पत्र-लेखनम्), and Picture Description (चित्र-वर्णनम्).',
    assignments: [
      {
        id: 'g9-1-bharati-vasanta',
        order: 1,
        title: 'Ch 1: Bharati-Vasantagiti',
        titleSanskrit: 'पाठ १ — भारतीवसन्तगीतिः (सरस्वती-प्रार्थना)',
        badge: 'Class 9 Ch 1',
        targetSanskrit: 'निनादय नवीनामये वाणि वीणाम् ।\nमृदुं गाय गीतिं ललित-नीति-लीनाम् ॥\nमधुर-मञ्जरी-पिञ्जरी-भूत-मालाः ।\nवसन्ते लसन्तीह सरसा रसालाः ॥',
        transliteration: 'ninādaya navīnāmaye vāṇi vīṇām |\nmṛduṃ gāya gītiṃ lalita-nīti-līnām ||\nmadhura-mañjarī-piñjarī-bhūta-mālāḥ |\nvasante lasantīha sarasā rasālāḥ ||',
        meaningEnglish:
          'O Vani (Saraswati), play your fresh new lute! Sing a sweet melody steeped in noble ethics! In this spring season, clusters of mango trees yellowed with sweet blossoms shine forth joyfully.',
        meaningHindi:
          'हे वाणी (सरस्वती)! नवीन वीणा को बजाइए। सुन्दर नीतियों से युक्त मधुर गीत का गान कीजिए। इस वसन्त ऋतु में मधुर मंजरियों से पीली बनी हुई सरस आम्र-वृक्षों की पंक्तियाँ सुशोभित हो रही हैं।',
        handwritingTips: 'Notice the internal alliterations (नवीनामये, वीणाम्; मञ्जरी-पिञ्जरी). Write with poetic rhythm.',
        grammaticalNotes: [
          'सम्बोधनम्: "वाणि" is feminine vocative singular of "वाणी" (इकारान्त-स्त्रीलिङ्ग-सम्बोधनम्).',
          'लोट्-लकारः: "निनादय" and "गाय" are imperative verbs of address.',
        ],
        practicePrompt: 'Write the 4 poetic lines of this celebrated modern Sanskrit lyric by Pandit Janaki Vallabh Shastri.',
        expectedKeywords: ['निनादय', 'वाणि', 'वीणाम्', 'मृदुं', 'गाय', 'वसन्ते', 'रसालाः'],
        suggestedMaxMarks: 25,
      },
      {
        id: 'g9-2-sandhi-rules',
        order: 2,
        title: 'Compound Sandhi Mastery',
        titleSanskrit: 'स्वर, व्यञ्जन एवं विसर्ग-सन्धि-अभ्यासः',
        badge: 'Board Grammar',
        targetSanskrit: '१. देव + आलयः = देवालयः (दीर्घ)\n२. महा + उत्सवः = महोत्सवः (गुण)\n३. सदा + एव = सदैव (वृद्धि)\n४. यदि + अपि = यद्यपि (यण्)\n५. सत् + जनः = सज्जनः (व्यञ्जन)\n६. मनः + रथः = मनोरथः (विसर्ग)',
        transliteration: '1. deva + ālayaḥ = devālayaḥ (dīrgha)\n2. mahā + utsavaḥ = mahotsavaḥ (guṇa)\n3. sadā + eva = sadaiva (vṛddhi)\n4. yadi + api = yadyapi (yaṇ)\n5. sat + janaḥ = sajjanaḥ (vyañjana)\n6. manaḥ + rathaḥ = manorathaḥ (visarga)',
        meaningEnglish: 'Six foundational Sandhi combinations spanning vowel, consonant, and visarga categories.',
        meaningHindi: 'दीर्घ, गुण, वृद्धि, यण्, व्यञ्जन एवं विसर्ग सन्धि के ६ मानक उदाहरण।',
        handwritingTips: 'Align plus signs (+) and equal signs (=) in clean columns.',
        grammaticalNotes: [
          'अकः सवर्णे दीर्घः (६.१.१०१)',
          'आद्गुणः (६.१.८७)',
          'वृद्धिरेचि (६.१.८८)',
          'इको यणचि (६.१.७७)',
          'स्तोः श्चुना श्चुः (८.४.४०)',
          'हशि च (६.१.११४)',
        ],
        practicePrompt: 'Write all 6 Sandhi equations with named rule classifications.',
        expectedKeywords: ['देवालयः', 'महोत्सवः', 'सदैव', 'यद्यपि', 'सज्जनः', 'मनोरथः'],
        suggestedMaxMarks: 20,
      },
      {
        id: 'g9-3-chitra-varnanam',
        order: 3,
        title: 'Chitra Varnanam: Garden Scene',
        titleSanskrit: 'चित्र-वर्णनम् — उद्यान-दृश्यम् (CBSE Format)',
        badge: 'Writing Skills',
        targetSanskrit: '१. इदं चित्रम् एकस्य रम्यस्य उद्यानस्य अस्ति ।\n२. चित्रे अनेके वृक्षाः पादपाः च विकसन्ति ।\n३. बालकाः बालिकाः च कन्दुकेन क्रीडन्ति ।\n४. खगाः आकाशे उत्पतन्ति वृक्षाग्रेषु च कूजन्ति ।\n५. उद्याने वातावरणम् अतीव शान्तम् आह्लादकरं च अस्ति ।',
        transliteration: '1. idaṃ citram ekasya ramyasya udyānasya asti |\n2. citre aneke vṛkṣāḥ pādapāḥ ca vikasanti |\n3. bālakāḥ bālikāḥ ca kandukena krīḍanti |\n4. khagāḥ ākāśe utpatanti vṛkṣāgreṣu ca kūjanti |\n5. udyāne vātāvaraṇam atīva śāntam āhlādakaraṃ ca asti |',
        meaningEnglish:
          '1. This picture is of a beautiful garden. 2. Many trees and plants bloom in the picture. 3. Boys and girls play with a ball. 4. Birds fly in the sky and chirp on treetops. 5. The atmosphere in the garden is very calm and delightful.',
        meaningHindi:
          '१. यह चित्र एक सुन्दर उद्यान का है। २. चित्र में अनेक वृक्ष और पौधे विकसित हो रहे हैं। ३. बालक और बालिकाएँ गेंद से खेल रहे हैं। ४. पक्षी आकाश में उड़ते हैं और वृक्षों की चोटियों पर चहकते हैं। ५. उद्यान में वातावरण बहुत शान्त और आह्लादकारी है।',
        handwritingTips: 'Maintain numbered list discipline. Keep consistent space between words.',
        grammaticalNotes: [
          'चित्रे (सप्तमी विभक्तिः): The standard opening for CBSE picture descriptions begins with "इदं चित्रम् ... अस्ति" followed by "चित्रे ...".',
        ],
        practicePrompt: 'Write the 5 official CBSE model sentences for the Garden picture description.',
        expectedKeywords: ['इदं', 'चित्रम्', 'उद्यानस्य', 'चित्रे', 'वृक्षाः', 'कन्दुकेन', 'क्रीडन्ति', 'वातावरणम्'],
        suggestedMaxMarks: 25,
      },
      {
        id: 'g9-4-letter-writing',
        order: 4,
        title: 'Formal Letter: Leave Application',
        titleSanskrit: 'पत्र-लेखनम् — अवकाशार्थं प्रार्थना-पत्रम्',
        badge: 'Board Format',
        targetSanskrit: 'सेवायां,\nश्रीमन्तः प्रधानाचार्य-महोदयाः,\nकेन्द्रीय-विद्यालयः, देहली ।\n\nविषयः: दिनद्वयस्य अवकाशार्थं प्रार्थना-पत्रम् ।\n\nमहोदयाः,\nसविनयं निवेदनम् अस्ति यत् अहं ज्वरेण पीडितः अस्मि । अतः विद्यालयम् आगन्तुं न शक्नोमि ।\nकृपया मम दिनद्वयस्य अवकाशं स्वीकुर्वन्तु ।\n\nभवतां आज्ञाकारी शिष्यः\nराहुलः (कक्षा - नवमी)',
        transliteration: 'sevāyāṃ,\nśrīmantaḥ pradhānācārya-mahodayāḥ,\nkendrīya-vidyālayaḥ, dehlī |\n\nviṣayaḥ: dinadvayasya avakāśārthaṃ prārthanā-patram |\n\nmahodayāḥ,\nsavinayaṃ nivedanam asti yat ahaṃ jvareṇa pīḍitaḥ asmi | ataḥ vidyālayam āgantuṃ na śaknomi |\nkṛpayā mama dinadvayasya avakāśaṃ svīkurvantu |\n\nbhavatāṃ ājñākārī śiṣyaḥ\nrāhulaḥ (kakṣā - navamī)',
        meaningEnglish:
          'To The Principal, Kendriya Vidyalaya, Delhi. Subject: Application for 2 days leave. Respected Sir, humbly submit that I am suffering from fever, hence unable to attend school. Please grant 2 days leave. Your obedient student, Rahul (Class 9).',
        meaningHindi:
          'सेवा में, श्रीमान् प्रधानाचार्य महोदय, केन्द्रीय विद्यालय, दिल्ली। विषय: दो दिन के अवकाश हेतु प्रार्थना-पत्र। महोदय, सविनय निवेदन है कि मैं ज्वर से पीड़ित हूँ, अतः विद्यालय आने में असमर्थ हूँ। कृपया दो दिन का अवकाश प्रदान करें। आपका आज्ञाकारी शिष्य, राहुल (कक्षा ९)।',
        handwritingTips: 'Preserve formal letter indentation: left-aligned address, centered subject, and right-aligned sign-off.',
        grammaticalNotes: [
          'करण-तृतीया: "ज्वरेण पीडितः" — fever is the cause of suffering, hence 3rd case (तृतीया विभक्तिः).',
          'लोट्-लकार आदरार्थकः: "स्वीकुर्वन्तु" is formal imperative plural.',
        ],
        practicePrompt: 'Write the complete CBSE formal Sanskrit leave application with correct layout and salutations.',
        expectedKeywords: ['सेवायां', 'प्रधानाचार्य', 'अवकाशार्थं', 'निवेदनम्', 'ज्वरेण', 'स्वीकुर्वन्तु', 'आज्ञाकारी', 'शिष्यः'],
        suggestedMaxMarks: 30,
      },
    ],
  },
  {
    id: 'spoken',
    title: 'Spoken & Conversational Track',
    titleSanskrit: 'सम्भाषण-संस्कृतम् · Daily Living Sanskrit',
    icon: '🗣️',
    badge: 'Spoken · व्यावहारिकम्',
    levelBadge: 'Conversational',
    accentColor: '#0284c7',
    subtitle: 'Daily spoken Sanskrit: greetings, self-introductions, telling time, and conversational dialogue',
    description:
      'Bridge ancient Sanskrit with daily 21st-century living! Write polite greetings (शिष्टाचारः), self-introduction phrases, telling the clock in Sanskrit, and friendly conversational questions.',
    assignments: [
      {
        id: 'spoken-1-greetings',
        order: 1,
        title: 'Polite Sanskrit Greetings',
        titleSanskrit: 'शिष्टाचार-वाक्यानि (Polite Etiquette)',
        badge: 'Spoken 1',
        targetSanskrit: 'हरिः ॐ ! सुप्रभातम् ।\nशुभरात्रिः । धन्यवादः ।\nकृपया । क्षम्यताम् । चिन्ता मास्तु ।\nपुनर्मिलामः !',
        transliteration: 'hariḥ oṃ ! suprabhātam |\nśubharātriḥ | dhanyavādaḥ |\nkṛpayā | kṣamyatām | cintā māstu |\npunarmilāmaḥ !',
        meaningEnglish:
          'Hari Om! Good morning. Good night. Thank you. Please. Excuse me. Do not worry. See you again!',
        meaningHindi:
          'हरि ॐ! शुभ प्रभात। शुभ रात्रि। धन्यवाद। कृपया। क्षमा कीजिए। कोई बात नहीं / चिन्ता मत करो। फिर मिलेंगे!',
        handwritingTips: 'Notice exclamation mark (!) and comma (,) usage in modern spoken Sanskrit transcription.',
        grammaticalNotes: [
          'अव्ययानि: "मास्तु" is a sandhi of मा + अस्तु (let it not be / do not worry).',
          'उत्तमपुरुष-बहुवचनम्: "पुनर्मिलामः" is First-person plural (we will meet again).',
        ],
        practicePrompt: 'Write the 7 core spoken Sanskrit etiquette phrases.',
        expectedKeywords: ['हरिः', 'सुप्रभातम्', 'शुभरात्रिः', 'धन्यवादः', 'कृपया', 'क्षम्यताम्', 'पुनर्मिलामः'],
        suggestedMaxMarks: 15,
      },
      {
        id: 'spoken-2-introduction',
        order: 2,
        title: 'Self-Introduction (आत्म-परिचयः)',
        titleSanskrit: 'आत्म-परिचयः — Who I Am',
        badge: 'Spoken 2',
        targetSanskrit: 'मम नाम राहुलः अस्ति ।\nअहं भारतदेशे वसामि ।\nमम मातृभाषा हिन्दी अस्ति ।\nमह्यं संस्कृतम् अतीव रोचते ।\nअहं संस्कृत-सम्भाषणं शिक्षे ।',
        transliteration: 'mama nāma rāhulaḥ asti |\nahaṃ bhāratadeśe vasāmi |\nmama mātṛbhāṣā hindī asti |\nmahyaṃ saṃskṛtam atīva rocate |\nahaṃ saṃskṛta-sambhāṣaṇaṃ śikṣe |',
        meaningEnglish:
          'My name is Rahul. I live in India. My mother tongue is Hindi. I like Sanskrit very much. I am learning spoken Sanskrit.',
        meaningHindi:
          'मेरा नाम राहुल है। मैं भारत देश में रहता हूँ। मेरी मातृभाषा हिन्दी है। मुझे संस्कृत बहुत प्रिय है। मैं संस्कृत सम्भाषण सीख रहा हूँ।',
        handwritingTips: 'Personalize your name by adding visarga to masculine names (e.g., राहुलः) or using pure vowels for feminine names (e.g., प्रिया).',
        grammaticalNotes: [
          'षष्ठी-सम्बन्धः: "मम" is Genitive singular of अस्माद् pronoun (my / of me).',
          'आत्मनेपद-क्रिया: "शिक्षे" is Atmanepada First-person singular of शिक्ष (I learn).',
        ],
        practicePrompt: 'Write your 5-sentence personal introduction in Sanskrit.',
        expectedKeywords: ['मम', 'नाम', 'अहं', 'मातृभाषा', 'संस्कृतम्', 'रोचते', 'शिक्षे'],
        suggestedMaxMarks: 20,
      },
      {
        id: 'spoken-3-time',
        order: 3,
        title: 'Telling Time (समय-ज्ञानम्)',
        titleSanskrit: 'घटिका-समय-ज्ञानम् (Telling Time)',
        badge: 'Spoken 3',
        targetSanskrit: '१. एकवादनम् (1:00)\n२. सपाद-द्विवादनम् (2:15)\n३. सार्ध-त्रिवादनम् (3:30)\n४. पादोन-चतुर्वादनम् (3:45)\n५. अधुना कः समयः ? अधुना पञ्चवादनम् ।',
        transliteration: '1. ekavādanam (1:00)\n2. sapāda-dvivādanam (2:15)\n3. sārdha-trivādanam (3:30)\n4. pādona-caturvādanam (3:45)\n5. adhunā kaḥ samayaḥ ? adhunā pañcavādanam |',
        meaningEnglish:
          '1:00, 2:15 (quarter past 2), 3:30 (half past 3), 3:45 (quarter to 4). What time is it now? Now it is 5:00.',
        meaningHindi:
          '१:००, २:१५ (सवा दो), ३:३० (साढ़े तीन), ३:४५ (पौने चार)। अब क्या समय हुआ है? अब पाँच बजे हैं।',
        handwritingTips: 'Notice the prefixes: सपाद (quarter past), सार्ध (half past), पादोन (quarter to).',
        grammaticalNotes: [
          'अव्यय-प्रश्नः: "अधुना कः समयः" — "अधुना" is an indeclinable meaning "now"; "कः समयः" asks "what time?".',
        ],
        practicePrompt: 'Write the 4 quarter-hour time expressions and the conversational time question & answer.',
        expectedKeywords: ['एकवादनम्', 'सपाद', 'सार्ध', 'पादोन', 'समयः', 'पञ्चवादनम्'],
        suggestedMaxMarks: 20,
      },
    ],
  },
];
