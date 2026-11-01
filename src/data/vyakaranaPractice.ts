import type { LessonQuizQuestion } from '../components/Grammar';

/** Extra sequential quiz questions per lesson (appended after the core 3). */
export const EXTRA_LESSON_QUESTIONS: Record<string, LessonQuizQuestion[]> = {
  'lesson-1': [
    { q: 'What does व्याकरणम् (Vyākaraṇa) literally mean?', options: ['Poetry', 'Analysis / unfolding (वि + आ + √कृ)', 'Ritual', 'Astronomy'], answer: 1, explain: 'वि-आ-करण = taking apart, analysing language.' },
    { q: '“मुखं व्याकरणं स्मृतम्” — which limb of the Veda is grammar?', options: ['पादौ (feet)', 'हस्तौ (hands)', 'मुखम् (mouth)', 'नेत्रे (eyes)'], answer: 2, explain: 'Among the six Vedāṅgas, Vyākaraṇa is the mouth (initiation) of the Veda.' },
    { q: 'A स्वरः (Svara, vowel) is a sound that…', options: ['needs another sound to be spoken', 'can be uttered on its own', 'is always nasal', 'is written only at word end'], answer: 1, explain: 'स्वयं राजन्ते इति स्वराः — vowels shine by themselves.' },
    { q: 'How many mātrās does a ह्रस्व (short) vowel like अ last?', options: ['१ (one)', '२ (two)', '३ (three)', '½'], answer: 0, explain: 'ह्रस्व = 1 mātrā, दीर्घ = 2, प्लुत = 3.' },
  ],
  'lesson-2': [
    { q: 'A व्यञ्जनम् (consonant) needs what to be fully pronounced?', options: ['A visarga', 'A vowel (स्वर)', 'A daṇḍa', 'Nothing'], answer: 1, explain: 'क् + अ = क — consonants lean on vowels.' },
    { q: 'च, छ, ज, झ, ञ are produced at which स्थानम्?', options: ['कण्ठ (throat)', 'तालु (palate)', 'मूर्धा (roof)', 'ओष्ठ (lips)'], answer: 1, explain: 'Ca-varga is तालव्य (palatal).' },
    { q: 'Which वर्ग is मूर्धन्य (retroflex)?', options: ['ट-वर्गः', 'त-वर्गः', 'प-वर्गः', 'क-वर्गः'], answer: 0, explain: 'ट ठ ड ढ ण — tongue curls to the मूर्धा.' },
    { q: 'Order of the five vargas from back of the mouth to the lips:', options: ['प → त → ट → च → क', 'क → च → ट → त → प', 'क → ट → च → प → त', 'च → क → त → ट → प'], answer: 1, explain: 'कण्ठ → तालु → मूर्धा → दन्त → ओष्ठ.' },
    { q: 'The visarga in नमः is…', options: ['a nasal hum', 'a voiceless breath echo (ः)', 'a long vowel', 'a semivowel'], answer: 1, explain: 'Visarga is an अयोगवाह breath sound that changes in sandhi.' },
  ],
  'lesson-3': [
    { q: 'In प्रकृति + प्रत्यय, what is the प्रकृति?', options: ['The suffix', 'The raw root / stem', 'The finished word', 'The sentence'], answer: 1, explain: 'प्रकृति = base (dhātu or prātipadika); प्रत्यय = suffix.' },
    { q: 'कर्म, क्रिया, संस्कृतम् all come from which root?', options: ['√गम्', '√कृ (to do)', '√पठ्', '√भू'], answer: 1, explain: '√कृ + pratyayas → कर्म, क्रिया, सम्-कृ → संस्कृतम्.' },
    { q: 'Which text is the master catalogue of ~2000 verb roots?', options: ['अष्टाध्यायी', 'धातुपाठः', 'निरुक्तम्', 'अमरकोशः'], answer: 1, explain: 'The धातुपाठ lists roots; the अष्टाध्यायी gives the rules.' },
    { q: 'A प्रातिपदिकम् becomes a usable पदम् after adding…', options: ['तिङ् endings', 'सुप् (case) endings', 'an upasarga only', 'nothing'], answer: 1, explain: 'Noun stems take सुप् endings (सुबन्त); roots take तिङ् (तिङन्त).' },
  ],
  'lesson-4': [
    { q: 'Which विभक्ति marks the subject (कर्ता) in an active sentence?', options: ['प्रथमा', 'द्वितीया', 'षष्ठी', 'सप्तमी'], answer: 0, explain: 'रामः पठति — रामः is प्रथमा.' },
    { q: 'षष्ठी विभक्ति usually shows…', options: ['location', 'relation / possession (“of”)', 'instrument', 'address'], answer: 1, explain: 'रामस्य पुस्तकम् — Rāma’s book.' },
    { q: 'वृक्षे खगः अस्ति — वृक्षे is in which case?', options: ['तृतीया', 'चतुर्थी', 'सप्तमी (अधिकरण)', 'पञ्चमी'], answer: 2, explain: 'सप्तमी = location, “in/on the tree”.' },
    { q: 'Why is Sanskrit word order flexible?', options: ['It has no rules', 'Case endings show each word’s role', 'Verbs come first always', 'Only poetry is flexible'], answer: 1, explain: 'Roles are carried by vibhakti endings, not position.' },
  ],
  'lesson-5': [
    { q: 'द्वितीया एकवचन of बालक is…', options: ['बालकः', 'बालकम्', 'बालकेन', 'बालकात्'], answer: 1, explain: 'बालकम् — the boy (as object).' },
    { q: 'तृतीया एकवचन (by the boy):', options: ['बालकेन', 'बालकाय', 'बालकस्य', 'बालके'], answer: 0, explain: 'बालकेन — with/by the boy.' },
    { q: 'षष्ठी बहुवचन (of the boys):', options: ['बालकेषु', 'बालकानाम्', 'बालकैः', 'बालकेभ्यः'], answer: 1, explain: 'बालकानाम्.' },
    { q: 'सम्बोधन (address) singular:', options: ['हे बालक', 'हे बालकः', 'हे बालकम्', 'हे बालकाः'], answer: 0, explain: 'हे बालक! — the visarga drops in address.' },
  ],
  'lesson-6': [
    { q: 'तृतीया एकवचन of लता:', options: ['लतया', 'लतेन', 'लतायाः', 'लतायाम्'], answer: 0, explain: 'लतया — by the creeper.' },
    { q: 'सप्तमी एकवचन of नदी (in the river):', options: ['नद्याम्', 'नद्याः', 'नदीषु', 'नद्या'], answer: 0, explain: 'नद्याम्.' },
    { q: 'What is the लिङ्गम् of लता and नदी?', options: ['पुंलिङ्गम्', 'स्त्रीलिङ्गम्', 'नपुंसकलिङ्गम्', 'none'], answer: 1, explain: 'Both are feminine (आकारान्त / ईकारान्त स्त्रीलिङ्ग).' },
    { q: 'षष्ठी बहुवचन of लता:', options: ['लतानाम्', 'लतासु', 'लताभिः', 'लतायै'], answer: 0, explain: 'लतानाम् — of the creepers.' },
  ],
  'lesson-7': [
    { q: 'Which लकार is the simple future?', options: ['लट्', 'लृट्', 'लङ्', 'लोट्'], answer: 1, explain: 'लृट् — पठिष्यति (will read).' },
    { q: 'लोट् लकार expresses…', options: ['past', 'command / request', 'present', 'possibility'], answer: 1, explain: 'पठतु / पठ — let him read / read!' },
    { q: 'अपठत् (he read) is in which लकार?', options: ['लङ् (past)', 'लट्', 'विधिलिङ्', 'लृट्'], answer: 0, explain: 'लङ् takes the augment अ-: अ + पठत्.' },
    { q: 'Laṭ forms of √पठ्, प्रथमपुरुष: एक / द्वि / बहु', options: ['पठति, पठतः, पठन्ति', 'पठसि, पठथः, पठथ', 'पठामि, पठावः, पठामः', 'पठति, पठन्ति, पठतः'], answer: 0, explain: 'पठति · पठतः · पठन्ति.' },
  ],
  'lesson-8': [
    { q: 'In Sanskrit grammar, उत्तमपुरुषः refers to…', options: ['he/she (distant)', 'you (listener)', 'I/we (speaker)', 'they'], answer: 2, explain: 'उत्तम = speaker; मध्यम = listener; प्रथम = third person.' },
    { q: 'द्विवचनम् is used for…', options: ['one', 'exactly two', 'three or more', 'none'], answer: 1, explain: 'Sanskrit has a dedicated dual.' },
    { q: 'युवाम् (you two) takes which verb?', options: ['पठथः', 'पठतः', 'पठावः', 'पठथ'], answer: 0, explain: 'मध्यमपुरुष द्विवचन = पठथः.' },
    { q: 'वयं ___ (we read):', options: ['पठामि', 'पठामः', 'पठन्ति', 'पठावः'], answer: 1, explain: 'उत्तमपुरुष बहुवचन = पठामः.' },
  ],
  'lesson-9': [
    { q: 'Correct sentence:', options: ['बालकाः पठति', 'बालकाः पठन्ति', 'बालकः पठन्ति', 'बालकौ पठति'], answer: 1, explain: 'Plural subject → plural verb.' },
    { q: 'रामः फलं खादति — the कर्म is…', options: ['रामः', 'फलम्', 'खादति', 'none'], answer: 1, explain: 'फलम् (द्वितीया) is the object.' },
    { q: 'त्वं गृहं ___ (you go home):', options: ['गच्छति', 'गच्छसि', 'गच्छामि', 'गच्छन्ति'], answer: 1, explain: 'त्वम् → मध्यमपुरुष एकवचन गच्छसि.' },
    { q: 'बालिका पठति and बालकः पठति use the same verb because…', options: ['typo', 'finite verbs agree in puruṣa & vacana, not gender', 'girls read less', 'पठति is neuter'], answer: 1, explain: 'तिङन्त verbs ignore liṅga.' },
  ],
  'lesson-10': [
    { q: 'अव्ययम् means a word that…', options: ['declines in 8 cases', 'never changes form', 'is always a verb', 'is feminine'], answer: 1, explain: 'अ-व्यय = unchanging in all cases, numbers, genders.' },
    { q: 'Which is an अव्ययम्?', options: ['अत्र (here)', 'बालकः', 'पठति', 'लता'], answer: 0, explain: 'अत्र, तत्र, कुत्र, अद्य, श्वः are avyayas.' },
    { q: '“कुत्र गच्छसि?” asks…', options: ['when', 'where', 'why', 'who'], answer: 1, explain: 'कुत्र = where.' },
    { q: 'Review: वृक्षात् पत्रं पतति — वृक्षात् is…', options: ['पञ्चमी (from the tree)', 'षष्ठी', 'सप्तमी', 'तृतीया'], answer: 0, explain: 'पञ्चमी = separation (अपादान).' },
    { q: 'Review: correct sequence of the course', options: ['Verbs → sounds → nouns', 'Sounds → roots → cases → declensions → verbs → syntax', 'Syntax → script → roots', 'Avyayas first'], answer: 1, explain: 'वर्ण → धातु/प्रातिपदिक → विभक्ति → शब्दरूप → धातुरूप → वाक्य.' },
  ],
};

export interface LessonWorksheet {
  titleSa: string;
  title: string;
  tasks: { instruction: string; items: string[] }[];
  answerKey: string[];
}

export const LESSON_WORKSHEETS: Record<string, LessonWorksheet> = {
  'lesson-1': { titleSa: 'स्वर-अभ्यासः', title: 'Vowels & Script', tasks: [
    { instruction: 'Write the long (दीर्घ) partner of each vowel.', items: ['अ → ___', 'इ → ___', 'उ → ___', 'ऋ → ___'] },
    { instruction: 'Label each: ह्रस्व / दीर्घ.', items: ['ए', 'उ', 'ई', 'ओ'] },
    { instruction: 'Copy with the शिरोरेखा: नमः, कमलम्, गणेशः', items: [] }],
    answerKey: ['आ, ई, ऊ, ॠ', 'दीर्घ, ह्रस्व, दीर्घ, दीर्घ'] },
  'lesson-2': { titleSa: 'व्यञ्जन-स्थान-अभ्यासः', title: 'Consonants & Sthānas', tasks: [
    { instruction: 'Write the स्थानम् of each varga.', items: ['क-वर्गः', 'च-वर्गः', 'ट-वर्गः', 'त-वर्गः', 'प-वर्गः'] },
    { instruction: 'Circle the महाप्राण letters: क ख ग घ त थ द ध', items: [] },
    { instruction: 'Name the class of य र ल व and श ष स ह.', items: [] }],
    answerKey: ['कण्ठ, तालु, मूर्धा, दन्त, ओष्ठ', 'ख घ थ ध', 'अन्तःस्थ; ऊष्मन्'] },
  'lesson-3': { titleSa: 'धातु-प्रातिपदिक-अभ्यासः', title: 'Roots & Stems', tasks: [
    { instruction: 'Split into प्रकृति + प्रत्यय.', items: ['पठति', 'गच्छति', 'बालकः'] },
    { instruction: 'Write two words from √कृ.', items: ['___', '___'] },
    { instruction: 'Dhātu or prātipadika? √भू, राम, √गम्, फल', items: [] }],
    answerKey: ['√पठ्+ति, √गम्+ति, बालक+सु', 'कर्म, क्रिया, कार्यम्…', 'धातु, प्रातिपदिक, धातु, प्रातिपदिक'] },
  'lesson-4': { titleSa: 'विभक्ति-अभ्यासः', title: 'The 8 Cases', tasks: [
    { instruction: 'Match vibhakti → role (कर्ता, कर्म, करण, सम्प्रदान, अपादान, सम्बन्ध, अधिकरण, सम्बोधन).', items: ['प्रथमा','द्वितीया','तृतीया','चतुर्थी','पञ्चमी','षष्ठी','सप्तमी','सम्बोधनम्'] },
    { instruction: 'Name the case of the underlined word: रामः वनं गच्छति (वनम्)', items: [] }],
    answerKey: ['कर्ता, कर्म, करण, सम्प्रदान, अपादान, सम्बन्ध, अधिकरण, सम्बोधन (in order)', 'द्वितीया'] },
  'lesson-5': { titleSa: 'बालक-शब्दरूप-अभ्यासः', title: 'Bālaka Declension', tasks: [
    { instruction: 'Fill the एकवचन column of बालक for all 8 cases.', items: ['१ ___','२ ___','३ ___','४ ___','५ ___','६ ___','७ ___','सं ___'] },
    { instruction: 'Decline देव (god) in प्रथमा: एक / द्वि / बहु.', items: [] }],
    answerKey: ['बालकः, बालकम्, बालकेन, बालकाय, बालकात्, बालकस्य, बालके, हे बालक', 'देवः, देवौ, देवाः'] },
  'lesson-6': { titleSa: 'लता-नदी-अभ्यासः', title: 'Latā & Nadī', tasks: [
    { instruction: 'Write प्रथमा एक/द्वि/बहु of लता and नदी.', items: ['लता: ___', 'नदी: ___'] },
    { instruction: 'Translate: in the river / by the creeper', items: [] }],
    answerKey: ['लता, लते, लताः; नदी, नद्यौ, नद्यः', 'नद्याम्; लतया'] },
  'lesson-7': { titleSa: 'लट्-लकार-अभ्यासः', title: 'Present Tense', tasks: [
    { instruction: 'Conjugate √गम् (गच्छ्) in लट् — 9 forms.', items: ['प्रथम: ___ ___ ___', 'मध्यम: ___ ___ ___', 'उत्तम: ___ ___ ___'] },
    { instruction: 'Name the लकार: पठिष्यति, अपठत्, पठतु', items: [] }],
    answerKey: ['गच्छति गच्छतः गच्छन्ति / गच्छसि गच्छथः गच्छथ / गच्छामि गच्छावः गच्छामः', 'लृट्, लङ्, लोट्'] },
  'lesson-8': { titleSa: 'पुरुष-वचन-अभ्यासः', title: 'Person & Number', tasks: [
    { instruction: 'Write the pronoun for each slot (सः/तौ/ते, त्वम्/युवाम्/यूयम्, अहम्/आवाम्/वयम्).', items: ['प्रथम ___', 'मध्यम ___', 'उत्तम ___'] },
    { instruction: 'Fill: युवां ___ (पठ्), वयं ___ (लिख्)', items: [] }],
    answerKey: ['सः तौ ते · त्वम् युवाम् यूयम् · अहम् आवाम् वयम्', 'पठथः; लिखामः'] },
  'lesson-9': { titleSa: 'वाक्य-रचना-अभ्यासः', title: 'Subject–Verb Agreement', tasks: [
    { instruction: 'Correct the errors.', items: ['बालकाः खेलति', 'अहं गच्छति', 'त्वं पठामि'] },
    { instruction: 'Make 3 sentences with कर्ता + कर्म + क्रिया.', items: [] }],
    answerKey: ['बालकाः खेलन्ति; अहं गच्छामि; त्वं पठसि', 'e.g. रामः फलं खादति'] },
  'lesson-10': { titleSa: 'अव्यय-संवाद-अभ्यासः', title: 'Avyayas & Dialogue', tasks: [
    { instruction: 'Meaning of: अत्र, तत्र, कुत्र, अद्य, श्वः, अपि', items: [] },
    { instruction: 'Write a 4-line dialogue: नाम, निवास, अद्य किं करोषि?', items: [] }],
    answerKey: ['here, there, where, today, tomorrow, also', 'e.g. भवतः नाम किम्? मम नाम …'] },
};
