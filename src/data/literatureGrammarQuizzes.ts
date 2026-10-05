import type { QuizQuestionItem } from './quizData';

/** Stable page anchors for site search and Ask Bodhi. */
export const LITERATURE_GRAMMAR_QUIZ_PAGES = [
  {
    categoryId: 'lit_grammar_basic',
    anchor: 'lit-grammar-basic',
    title: 'Basic: Sandhi, vibhakti, gender, and verb agreement',
    label: 'Basic: Sandhi, vibhakti, gender, and verb agreement (4 Qs)',
    icon: '🧵',
  },
  {
    categoryId: 'lit_grammar_middle',
    anchor: 'lit-grammar-middle',
    title: 'Middle: Kāraka, samāsa, and lakāra',
    label: 'Middle: Kāraka, samāsa, and lakāra (4 Qs)',
    icon: '📐',
  },
  {
    categoryId: 'lit_grammar_higher',
    anchor: 'lit-grammar-higher',
    title: 'Higher: A Pāṇini sūtra in use, a Śikṣā note, and a Līlāvatī line',
    label: 'Higher: A Pāṇini sūtra in use, a Śikṣā note, and a Līlāvatī line (3 Qs)',
    icon: '🪷',
  },
] as const;

export const anchorForLiteratureCategory = (categoryId: string): string | null => {
  const page = LITERATURE_GRAMMAR_QUIZ_PAGES.find((item) => item.categoryId === categoryId);
  return page ? page.anchor : null;
};

export const categoryForLiteratureAnchor = (anchor: string): string | null => {
  const clean = anchor.replace(/^#/, '');
  const page = LITERATURE_GRAMMAR_QUIZ_PAGES.find((item) => item.anchor === clean);
  return page ? page.categoryId : null;
};

const basicTitle = LITERATURE_GRAMMAR_QUIZ_PAGES[0].title;
const middleTitle = LITERATURE_GRAMMAR_QUIZ_PAGES[1].title;
const higherTitle = LITERATURE_GRAMMAR_QUIZ_PAGES[2].title;

export const LITERATURE_GRAMMAR_QUESTIONS: QuizQuestionItem[] = [
  {
    id: 'lit-basic-sandhi',
    category: 'lit_grammar_basic',
    categoryLabel: basicTitle,
    chapterRef: 'Baudhāyana Śulbasūtra 1.12 (also numbered 1.48)',
    subCategory: basicTitle,
    question:
      'The Baudhāyana Śulbasūtra prints दीर्घचतुरश्रस्याक्ष्णयारज्जुः. Which sandhi joins दीर्घचतुरश्रस्य and अक्ष्णया?',
    questionSanskrit: 'दीर्घचतुरश्रस्य + अक्ष्णया = दीर्घचतुरश्रस्याक्ष्णया । का सन्धिः?',
    options: [
      '(अ) सवर्णदीर्घसन्धिः — अ + अ = आ',
      '(ब) गुणसन्धिः — अ + अ = ए',
      '(स) यण्सन्धिः — इ + अ = य',
    ],
    correctIndex: 0,
    explanation:
      'Preserved in the Baudhāyana Śulbasūtra, chapter 1, sūtra 12 (the same sentence is numbered 1.48 in the longer count): दीर्घचतुरश्रस्याक्ष्णयारज्जुः पार्श्वमानी तिर्यङ्मानी च यत्पृथग्भूते कुरुतस्तदुभयं करोति. The join दीर्घचतुरश्रस्य + अक्ष्णया keeps the long आ of savarṇa-dīrgha (identical simple vowels अ + अ).',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: 'lit-basic-vibhakti',
    category: 'lit_grammar_basic',
    categoryLabel: basicTitle,
    chapterRef: 'Kauṭilīya Arthaśāstra 1.1.1',
    subCategory: basicTitle,
    question:
      'The Arthaśāstra opens: पृथिव्या लाभे पालने च. What case and number are लाभे and पालने?',
    questionSanskrit: '“पृथिव्या लाभे पालने च” — लाभे पालने च का विभक्तिः, किं वचनम्?',
    options: [
      '(अ) सप्तमी विभक्तिः, एकवचनम्',
      '(ब) प्रथमा विभक्तिः, द्विवचनम्',
      '(स) षष्ठी विभक्तिः, बहुवचनम्',
    ],
    correctIndex: 0,
    explanation:
      'लाभे and पालने are locative singular: “in the gaining and in the protecting.” The sentence is Kauṭilīya Arthaśāstra 1.1.1. The text itself says this one treatise was made after gathering earlier arthaśāstras (प्रायशस्तानि संहृत्य). That is what the line describes; it is not a claim that those earlier works began here.',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: 'lit-basic-gender',
    category: 'lit_grammar_basic',
    categoryLabel: basicTitle,
    chapterRef: 'Baudhāyana Śulbasūtra 1.12 (also numbered 1.48)',
    subCategory: basicTitle,
    question:
      'In पार्श्वमानी तिर्यङ्मानी च, what gender, case, and number does each of those two words show?',
    questionSanskrit: '“पार्श्वमानी तिर्यङ्मानी च” — प्रत्येकं किं लिङ्गम्, का विभक्तिः, किं वचनम्?',
    options: [
      '(अ) स्त्रीलिङ्गम्, प्रथमा, एकवचनम्',
      '(ब) नपुंसकलिङ्गम्, द्वितीया, बहुवचनम्',
      '(स) पुंल्लिङ्गम्, तृतीया, द्विवचनम्',
    ],
    correctIndex: 0,
    explanation:
      'Both words end in -ई and stand as separate nominative singular feminine nouns, joined by च: the flank-measure and the transverse-measure. The sūtra is Baudhāyana Śulbasūtra 1.12.',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: 'lit-basic-agreement',
    category: 'lit_grammar_basic',
    categoryLabel: basicTitle,
    chapterRef: 'Baudhāyana Śulbasūtra 1.12 (also numbered 1.48)',
    subCategory: basicTitle,
    question:
      'The same sūtra says यत्पृथग्भूते कुरुतस्तदुभयं करोति. Why is कुरुतः dual while करोति is singular?',
    questionSanskrit: 'कुरुतः द्विवचनम्, करोति एकवचनम् — कुतः?',
    options: [
      '(अ) कुरुतः agrees with the two measures; करोति agrees with the one cord रज्जुः',
      '(ब) Both verbs are plural; the spelling is only sandhi',
      '(स) करोति is dual and कुरुतः is singular',
    ],
    correctIndex: 0,
    explanation:
      'कुरुतः is laṭ, third person, dual of कृ: the two measures produce their areas separately. करोति is laṭ, third person, singular: the one diagonal cord produces both. The print also joins कुरुतः + तत् as कुरुतस्तत् (visarga before त् becomes स्). Baudhāyana Śulbasūtra 1.12.',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: 'lit-middle-karaka',
    category: 'lit_grammar_middle',
    categoryLabel: middleTitle,
    chapterRef: 'Kauṭilīya Arthaśāstra 1.1.1',
    subCategory: middleTitle,
    question:
      'In पूर्वाचार्यैः प्रस्थापितानि, which kāraka does पूर्वाचार्यैः show?',
    questionSanskrit: '“पूर्वाचार्यैः प्रस्थापितानि” — पूर्वाचार्यैः किं कारकम्?',
    options: [
      '(अ) कर्तृकारकम् in the instrumental (तृतीया)',
      '(ब) कर्मकारकम् in the accusative (द्वितीया)',
      '(स) अधिकरणकारकम् in the locative (सप्तमी)',
    ],
    correctIndex: 0,
    explanation:
      'The participle प्रस्थापितानि means “set forth.” The people who set them forth, the earlier teachers, stand in the instrumental: पूर्वाचार्यैः. That is the agent (kartṛ) with a passive participle. Kauṭilīya Arthaśāstra 1.1.1.',
    difficulty: 'medium',
    points: 10,
  },
  {
    id: 'lit-middle-samasa-rectangle',
    category: 'lit_grammar_middle',
    categoryLabel: middleTitle,
    chapterRef: 'Baudhāyana Śulbasūtra 1.12 (also numbered 1.48)',
    subCategory: middleTitle,
    question: 'What kind of compound is दीर्घचतुरश्र in दीर्घचतुरश्रस्य?',
    questionSanskrit: '“दीर्घचतुरश्रस्य” — दीर्घचतुरश्रः कः समासः?',
    options: [
      '(अ) कर्मधारयः — दीर्घं चतुरश्रम् (“a long quadrilateral”)',
      '(ब) द्वन्द्वः — दीर्घश्च चतुरश्रश्च',
      '(स) अव्ययीभावः',
    ],
    correctIndex: 0,
    explanation:
      'दीर्घ describes चतुरश्र, so the compound is a karmadhāraya, then put in the genitive: दीर्घचतुरश्रस्य, “of a rectangle.” The word is in Baudhāyana Śulbasūtra 1.12. The sūtra uses it for the figure whose diagonal cord is discussed; it does not say who first drew a rectangle.',
    difficulty: 'medium',
    points: 10,
  },
  {
    id: 'lit-middle-samasa-artha',
    category: 'lit_grammar_middle',
    categoryLabel: middleTitle,
    chapterRef: 'Kauṭilīya Arthaśāstra 1.1.1',
    subCategory: middleTitle,
    question:
      'The same opening prints यावन्त्यर्थशास्त्राणि. What compound is अर्थशास्त्र, and which sandhi attaches यावन्ति to it?',
    questionSanskrit: 'यावन्ति + अर्थशास्त्राणि = यावन्त्यर्थशास्त्राणि । कः समासः, का सन्धिः?',
    options: [
      '(अ) षष्ठीतत्पुरुषः (अर्थस्य शास्त्रम्), and यण्सन्धिः (इ + अ = य)',
      '(ब) द्वन्द्वः, and सवर्णदीर्घसन्धिः (अ + अ = आ)',
      '(स) अव्ययीभावः, and विसर्गसन्धिः',
    ],
    correctIndex: 0,
    explanation:
      'अर्थशास्त्रम् is a genitive tatpuruṣa, “a treatise of artha,” here in the neuter plural अर्थशास्त्राणि. यावन्ति ends in इ and अर्थ begins with अ, so इ + अ becomes य्: यावन्त्यर्थशास्त्राणि. Kauṭilīya Arthaśāstra 1.1.1.',
    difficulty: 'medium',
    points: 10,
  },
  {
    id: 'lit-middle-lakara',
    category: 'lit_grammar_middle',
    categoryLabel: middleTitle,
    chapterRef: 'Nāradīya Śikṣā, prapāṭhaka 1, kaṇḍikā 5, verse 3',
    subCategory: middleTitle,
    question:
      'The Nāradīya Śikṣā line is षड्जं वदति मयूरो गावो रम्भन्ति चर्षभम्. What lakāra, person, and number are वदति and रम्भन्ति?',
    questionSanskrit: 'वदति रम्भन्ति च — कः लकारः, कः पुरुषः, किं वचनम्?',
    options: [
      '(अ) Both are लट्, प्रथमपुरुषः; वदति is एकवचनम् and रम्भन्ति is बहुवचनम्',
      '(ब) वदति is लोट् and रम्भन्ति is लङ्',
      '(स) Both are उत्तमपुरुषः, बहुवचनम्',
    ],
    correctIndex: 0,
    explanation:
      'Preserved in the Nāradīya Śikṣā (prapāṭhaka 1, kaṇḍikā 5, verse 3): षड्जं वदति मयूरो गावो रम्भन्ति चर्षभम्. वदति is present, third person, singular, with the peacock (मयूरः, printed मयूरो before गावः). रम्भन्ति is present, third person, plural, with the cows (गावः, printed गावो before रम्भन्ति). The line is about which notes those animals call; it does not say the alphabet came from animals.',
    difficulty: 'medium',
    points: 10,
  },
  {
    id: 'lit-higher-adgunah',
    category: 'lit_grammar_higher',
    categoryLabel: higherTitle,
    chapterRef: 'Nāradīya Śikṣā 1.5.3, showing Aṣṭādhyāyī 6.1.87',
    subCategory: higherTitle,
    question:
      'That same line prints चर्षभम्, not च ऋषभम्. Which Pāṇini sūtra is the joining that the line itself shows?',
    questionSanskrit: 'च + ऋषभम् = चर्षभम् । कस्य सूत्रस्य प्रयोगः?',
    options: [
      '(अ) आद्गुणः (6.1.87): अ + ऋ becomes अर्',
      '(ब) अकः सवर्णे दीर्घः (6.1.101): अ + ऋ becomes आ',
      '(स) इको यणचि (6.1.77): ऋ becomes य्',
    ],
    correctIndex: 0,
    explanation:
      'च ends in अ and ऋषभ begins with ऋ. Aṣṭādhyāyī 6.1.87 आद्गुणः replaces that अ plus the following vowel with guṇa, and the guṇa of ऋ is अर्, so च + ऋषभम् is printed चर्षभम्. The form is in Nāradīya Śikṣā, prapāṭhaka 1, kaṇḍikā 5, verse 3. The sūtra is the rule that accounts for the join the line already prints.',
    difficulty: 'hard',
    points: 10,
  },
  {
    id: 'lit-higher-shiksha',
    category: 'lit_grammar_higher',
    categoryLabel: higherTitle,
    chapterRef: 'Nāradīya Śikṣā, prapāṭhaka 1, kaṇḍikā 5, verse 5',
    subCategory: higherTitle,
    question:
      'Verse 5 of that kaṇḍikā says कण्ठादुत्तिष्ठते षड्जः … उरसो मध्यमः स्वरः. What does the line place where, and what sandhi is उरसो?',
    questionSanskrit: 'कण्ठादुत्तिष्ठते षड्जः । उरसो मध्यमः । का सन्धिः, कोऽर्थः?',
    options: [
      '(अ) षड्ज rises from the throat; मध्यम is of the chest. उरसः + मध्यमः prints उरसो (visarga before म becomes ओ)',
      '(ब) षड्ज rises from the head; मध्यम is nasal. उरसो is the instrumental उरसा',
      '(स) Both notes rise from the forehead. उरसो is a dual verb',
    ],
    correctIndex: 0,
    explanation:
      'The line preserved in the Nāradīya Śikṣā (prapāṭhaka 1, kaṇḍikā 5, verse 5) says कण्ठादुत्तिष्ठते षड्जः and उरसो मध्यमः स्वरः. उरसो is उरसः before the voiced म of मध्यमः: visarga after अ becomes ओ. The note is what this verse says about places of those two notes.',
    difficulty: 'hard',
    points: 10,
  },
  {
    id: 'lit-higher-lilavati',
    category: 'lit_grammar_higher',
    categoryLabel: higherTitle,
    chapterRef: 'Bhāskara, Līlāvatī, zero-operations verse (numbered 21)',
    subCategory: higherTitle,
    question:
      'The Līlāvatī line says खभाजितो राशिः खहरः स्यात्. What form is स्यात्, and what does the line call a quantity divided by zero?',
    questionSanskrit: '“खभाजितो राशिः खहरः स्यात्” — स्यात् कः लकारः, खहरः किम्?',
    options: [
      '(अ) स्यात् is विधिलिङ् of अस्, third person singular. The line calls that quantity खहरः',
      '(ब) स्यात् is लट्, plural. The line calls it खगुणः',
      '(स) स्यात् is लङ्. The line calls it वर्गः',
    ],
    correctIndex: 0,
    explanation:
      'Preserved in Bhāskara’s Līlāvatī, in the rules headed अथ शून्यपरिकर्मसु (verse 21 in the printing that numbers it 21): खभाजितो राशिः खहरः स्यात् — “a quantity divided by zero would be khahara.” स्यात् is the potential (विधिलिङ्), third person singular, of अस्. The verse states that rule. It does not say zero was invented in this line, and it does not say another country learned mathematics from it.',
    difficulty: 'hard',
    points: 10,
  },
];
