import React, { useEffect } from 'react';
import '../styles/philosophy.css';
import '../styles/cbse-guide.css';

import { playPronunciation } from '../utils/pronunciation';

export interface CbseSanskritGuidePageProps {
  onOpenRegister?: () => void;
  onGoHome?: () => void;
  onOpenPhilosophy?: () => void;
  onOpenGrammar?: () => void;
  onOpenResources?: () => void;
}

const DEFAULT_TITLE =
  'Online Sanskrit & Vedic Math Classes for Kids | EdNet Learn Gurukul';
const DEFAULT_DESC =
  'Unlock your child\'s potential with interactive Sanskrit and Vedic Math for kids. Start a 14-day free trial, then pay ₹200 once — no auto-debit.';

const PAGE_TITLE =
  'CBSE NCERT Sanskrit Exam Guide (Classes 7–10) | EdNet Learn Gurukul';
const PAGE_DESC =
  'Master CBSE NCERT Sanskrit exams for Classes 7–10: section blueprint, standardized instructions (निर्देशाः), core question words (क-कार शब्दाः), and grammatical directives. EdNet Learn Gurukul.';
const PAGE_URL = 'https://ednetlearn.in/cbse-sanskrit-guide';

const BLUEPRINT_ROWS: {
  section: string;
  domain: string;
  weightage: string;
  time: string;
  formats: string;
}[] = [
  {
    section: "खण्ड 'क'",
    domain: 'अपठित-अवबोधनम् (Unseen Comprehension)',
    weightage: '10 Marks',
    time: '20 Minutes',
    formats:
      'One unseen passage (80–100 words in Class 10; shorter for Classes 7–8). Evaluates direct textual decoding, titling, and grammar clues.',
  },
  {
    section: "खण्ड 'ख'",
    domain: 'रचनात्मक-कार्यम् (Creative Writing)',
    weightage: '15 Marks',
    time: '35 Minutes',
    formats:
      'Form-based formal/informal letters, paragraph compositions, and picture descriptions (Chitra Varnanam) using contextual aids.',
  },
  {
    section: "खण्ड 'ग'",
    domain: 'अनुप्रयुक्त-व्याकरणम् (Applied Grammar)',
    weightage: '25 Marks',
    time: '40 Minutes',
    formats:
      'Strictly rule-based language mechanics: Sandhi, Samas, Dhatu/Shabda Roop, Pratyaya, time-writing, and sentence corrections.',
  },
  {
    section: "खण्ड 'घ'",
    domain: 'पठित-अवबोधनम् (Literature / Textual)',
    weightage: '30 Marks',
    time: '55 Minutes',
    formats:
      'Comprehension extracts pulled straight from your assigned NCERT textbooks (Deepakam for 7–8; Shemushi or Manika for 9–10).',
  },
];

const EXAM_INSTRUCTIONS: {
  sanskrit: string;
  meaning: string;
  studentAction: string;
}[] = [
  {
    sanskrit: 'एकपदेन उत्तरत',
    meaning: 'Answer in one word',
    studentAction: 'Write only the single-word factual answer. Do not write a full sentence.',
  },
  {
    sanskrit: 'पूर्णवाक्येन उत्तरत',
    meaning: 'Answer in a full sentence',
    studentAction: 'Write a complete grammatical sentence replacing the question word with the factual answer.',
  },
  {
    sanskrit: 'उचितं विकल्पं चित्वा लिखत',
    meaning: 'Choose and write the correct option',
    studentAction: 'Select the correct answer from the given MCQ options and record both option symbol and text.',
  },
  {
    sanskrit: 'रिक्तस्थानानि पूरयत',
    meaning: 'Fill in the blanks',
    studentAction: 'Fill missing words in the sentences (often using words provided in a helper box/मञ्जूषा).',
  },
  {
    sanskrit: 'मञ्जूषातः पदानि चित्वा...',
    meaning: 'Choosing words from the helper box...',
    studentAction: 'Pick only words provided in the box/bracket. Do not introduce outside words.',
  },
  {
    sanskrit: 'अन्वयं पूरयत',
    meaning: 'Complete the prose order',
    studentAction: 'Fill missing words in a shloka rearranged into logical Sanskrit prose order (कर्ता-कर्म-क्रिया).',
  },
  {
    sanskrit: 'घटनाक्रमानुसारं संयोज्य लिखत',
    meaning: 'Arrange per event sequence',
    studentAction: 'Reorder jumbled narrative sentences based on the chronological sequence of the textbook story.',
  },
  {
    sanskrit: 'अधोलिखितानि वाक्यानि पठित्वा...',
    meaning: 'Having read the sentences written below...',
    studentAction: 'Base answers strictly on the text provided below. Do not guess from outside knowledge.',
  },
  {
    sanskrit: 'यथानिर्देशम् उत्तरत',
    meaning: 'Answer as directed',
    studentAction: 'Follow the specific grammatical sub-rule in brackets (e.g. find कर्तृपदम्, क्रियापदम्, or पर्यायपदम्).',
  },
];

const QUESTION_WORDS: {
  word: string;
  transliteration: string;
  meaning: string;
  clue: string;
  caseBadge: string;
}[] = [
  {
    word: 'कः / का / किम्',
    transliteration: 'kaḥ / kā / kim',
    meaning: 'Who / Which / What',
    clue: 'Subject or Object (Who did it? What is it? Look for प्रथमा or द्वितीया विभक्ति)',
    caseBadge: 'प्रथमा / द्वितीया (1st / 2nd Case)',
  },
  {
    word: 'कुत्र',
    transliteration: 'kutra',
    meaning: 'Where',
    clue: 'Look for a place, location, or 7th case (सप्तमी विभक्ति, e.g., गृहे, विद्यालये, वने, नगरे)',
    caseBadge: 'सप्तमी (7th Case Location)',
  },
  {
    word: 'कदा',
    transliteration: 'kadā',
    meaning: 'When',
    clue: 'Look for time, day, or season (e.g., प्रातः, सायं, एकस्मिन् दिने, वसन्ते)',
    caseBadge: 'कालवाचक (Time / Period)',
  },
  {
    word: 'कथम्',
    transliteration: 'katham',
    meaning: 'How',
    clue: 'Look for a manner, condition, or descriptive adverb/adjective (e.g., मन्दम्, सानन्दम्, वेगेन)',
    caseBadge: 'रीतिवाचक (Manner / State)',
  },
  {
    word: 'किमर्थम्',
    transliteration: 'kimartham',
    meaning: 'Why / For what reason',
    clue: 'Look for purpose or 4th case (चतुर्थी विभक्ति, e.g., -आय / ज्ञानाय) or infinitive (-तुम् / पठितुम्)',
    caseBadge: 'चतुर्थी / तुमुन् (4th Case / Purpose)',
  },
  {
    word: 'कुतः',
    transliteration: 'kutaḥ',
    meaning: 'From where / Why',
    clue: 'Look for source, point of origin, or 5th case (पञ्चमी विभक्ति, e.g., वृक्षात्, ग्रामात्, गृहात्)',
    caseBadge: 'पञ्चमी (5th Case Origin)',
  },
  {
    word: 'कति',
    transliteration: 'kati',
    meaning: 'How many',
    clue: 'Look for a numerical figure or count (संख्या, e.g., एकः, त्रयः, पञ्च, दश)',
    caseBadge: 'संख्यावाचक (Numerical Count)',
  },
  {
    word: 'कीदृशः / कीदृशी / कीदृशम्',
    transliteration: 'kīdṛśaḥ / kīdṛśī',
    meaning: 'Of what kind / type',
    clue: 'Look for a qualifying adjective (विशेषणम्) matching the gender of the noun (e.g., चतुरः, निर्मला)',
    caseBadge: 'विशेषणम् (Qualifying Adjective)',
  },
  {
    word: 'कस्य / कस्याः',
    transliteration: 'kasya / kasyāḥ',
    meaning: 'Whose / Of whom',
    clue: 'Look for possession, relationship, or 6th case (षष्ठी विभक्ति, e.g., रामस्य, लतायाः, मित्रस्य)',
    caseBadge: 'षष्ठी (6th Case Possession)',
  },
  {
    word: 'केन / कया',
    transliteration: 'kena / kayā',
    meaning: 'By whom / With what',
    clue: 'Look for instrument, means, or 3rd case (तृतीया विभक्ति, e.g., कलमेन, यानेन, हस्तेन)',
    caseBadge: 'तृतीया (3rd Case Instrument)',
  },
];

const GRAMMATICAL_DIRECTIVES: {
  term: string;
  transliteration: string;
  role: string;
  examPhrase: string;
  examPhraseMeaning: string;
  clue: string;
}[] = [
  {
    term: 'कर्तृपदम्',
    transliteration: 'Kartṛpadam',
    role: 'Subject / Doer of the action',
    examPhrase: 'अत्र किं कर्तृपदं प्रयुक्तम्?',
    examPhraseMeaning: 'What is the subject used here?',
    clue: 'Locate the primary noun or pronoun in the 1st case (प्रथमा विभक्ति, e.g., बालः, सा, छात्राः) that performs the action and dictates the verb number/person.',
  },
  {
    term: 'क्रियापदम्',
    transliteration: 'Kriyāpadam',
    role: 'Verb / Action word',
    examPhrase: 'अस्य वाक्यस्य क्रियापदं किम्?',
    examPhraseMeaning: 'What is the verb of this sentence?',
    clue: 'Look for the conjugated finite verb (तिङन्त पदम् ending in ति/तः/अन्ति or past tense अभवत्/अपठत्) or verbal participle at the end of the sentence.',
  },
  {
    term: 'विशेषणपदम् / विशेष्यपदम्',
    transliteration: 'Viśeṣaṇapadam / Viśeṣyapadam',
    role: 'Adjective / Noun being described',
    examPhrase: 'अत्र "शीतलं जलम्" इत्यनयोः विशेषणपदं किम्?',
    examPhraseMeaning: 'Between these two, which is the adjective?',
    clue: 'The adjective (विशेषणम्, e.g., शीतलम्) qualifies and strictly mirrors the noun (विशेष्यम्, e.g., जलम्) in gender, case, and number (लिङ्ग, विभक्ति, वचन).',
  },
  {
    term: 'समानार्थकपदम् / पर्यायपदम्',
    transliteration: 'Samānārthakapadam / Paryāyapadam',
    role: 'Synonym',
    examPhrase: 'गद्यांशे "वनम्" इत्यस्य किं पर्यायपदम् आगतम्?',
    examPhraseMeaning: 'What synonym is used in the passage for "forest"?',
    clue: 'Search the specified passage for an equivalent noun sharing the same grammatical case and gender (e.g., अरण्यम् / काननम् for वनम्).',
  },
  {
    term: 'विलोमपदम् / विपर्ययपदम्',
    transliteration: 'Vilomapadam / Viparyayapadam',
    role: 'Antonym / Opposite word',
    examPhrase: 'अत्र "सुखम्" इत्यस्य किं विलोमपदं प्रयुक्तम्?',
    examPhraseMeaning: 'What antonym of "sukham" is used here?',
    clue: 'Identify the opposite meaning word in the passage or verse (e.g., सुखम् ↔ दुःखम्, सत्यम् ↔ असत्यम्, मित्रम् ↔ शत्रुः).',
  },
  {
    term: 'सन्धिविच्छेदं कुरुत / सन्धिं कुरुत',
    transliteration: 'Sandhivicchedaṁ kuruta / Sandhiṁ kuruta',
    role: 'Split the joined word / Join the separated words',
    examPhrase: 'अधोलिखितपदानां सन्धिविच्छेदं कुरुत / सन्धिं कृत्वा लिखत।',
    examPhraseMeaning: 'Split or join the following words as directed.',
    clue: 'Identify junction vowels and consonants (e.g., दीर्घ: विद्या + आलयः = विद्यालयः; गुण: सूर्य + उदयः = सूर्योदयः; वृद्धि: तथा + एव = तथैव; यण्: यदि + अपि = यद्यपि).',
  },
];

const PRACTICE_SENTENCES: {
  sanskrit: string;
  meaning: string;
  clue: string;
  example: string;
}[] = [
  {
    sanskrit: 'रेखाङ्कितपदानि आधृत्य प्रश्ननिर्माणं कुरुत।',
    meaning: 'Frame questions based on the underlined words.',
    clue: 'Identify the gender, number, and case (विभक्ति) of the underlined word, then replace it with the corresponding form of किम् (or an adverb: कुत्र for places, कदा for time, कति for counts, कथम् for manner, किमर्थम् for purpose). Always add a question mark (?) at the end!',
    example: 'Example: "रामः वनम् अगच्छत्।" (Underlined: वनम् — location / neuter singular). Answer: "रामः कुत्र अगच्छत्?"',
  },
  {
    sanskrit: 'अस्य अनुच्छेदस्य समुचितं शीर्षकं संस्कृतेन लिखत।',
    meaning: 'Write an appropriate title for this passage in Sanskrit.',
    clue: 'Find the central subject or moral message of the text. Keep the title short (2–4 words) in the nominative case (प्रथमा विभक्ति).',
    example: 'Common titles: "सदाचारस्य महत्त्वम्" (Importance of Good Conduct), "सत्सङ्गतिः" (Good Company), "परोपकारः" (Benevolence).',
  },
  {
    sanskrit: 'वाक्येषु रेखाङ्कितानां पदानां प्रसङ्गानुकूलम् उचितार्थं चिनुत।',
    meaning: 'Choose the correct contextual meaning of the underlined words in the sentences.',
    clue: 'Many Sanskrit roots possess multiple dictionary meanings; select the exact nuance intended by the narrative context, surrounding words, or speaker.',
    example: 'Example: "हरिः" can mean monkey, lion, or Vishnu; in "वृक्षे हरिः कूर्दति", choose "वानरः" (monkey).',
  },
  {
    sanskrit: 'अशुद्धि-संशोधनं कृत्वा वाक्यं पुनः लिखत।',
    meaning: 'Correct the grammatical error and rewrite the sentence.',
    clue: 'Inspect: 1. Subject-Verb agreement (e.g. त्वं पठति ➔ त्वं पठसि); 2. Case governance / Upapada rules (e.g. ग्रामं परितः ➔ not ग्रामात्); 3. Gender/number alignment. Always rewrite the full sentence, underlining the corrected word.',
    example: 'Incorrect: "सह पुस्तकं पठन्ति।" ➔ Correct: "सः पुस्तकं पठति।" (or "ते पुस्तकं पठन्ति।")',
  },
];

const SECTION_PHRASES_BY_PART: {
  sectionTitle: string;
  sectionCode: string;
  badge: string;
  phrases: {
    sanskrit: string;
    meaning: string;
    tip: string;
  }[];
}[] = [
  {
    sectionTitle: "खण्ड ‘क’ & ‘घ’ : Comprehension Passages",
    sectionCode: "अवबोधनम्",
    badge: "Reading & Textual Extract Analysis",
    phrases: [
      {
        sanskrit: 'अनुच्छेदं पठित्वा प्रश्नानाम् उत्तराणि लिखत।',
        meaning: 'Read the passage and write the answers to the questions.',
        tip: 'Base your responses strictly on the facts stated in the passage. Do not write from external memory.',
      },
      {
        sanskrit: 'अस्य गद्यांशस्य समुचितं शीर्षकं लिखत।',
        meaning: 'Write an appropriate title for this prose passage.',
        tip: 'Keep the title to 2–3 words in the nominative case (प्रथमा विभक्ति), capturing the main character or moral.',
      },
      {
        sanskrit: '‘...’ इति क्रियापदस्य कर्तृपदं किम्?',
        meaning: 'What is the subject (doer) for the verb \'...\'?',
        tip: 'Identify the nominative noun/pronoun in प्रथमा विभक्ति that governs the verb\'s number and person.',
      },
      {
        sanskrit: 'गद्यांशे ‘...’ पदस्य किं विपर्ययपदं/विलोमपदं प्रयुक्तम्?',
        meaning: 'Which antonym / opposite word is used in the passage for \'...\'?',
        tip: 'Locate the exact polar opposite word used within the designated paragraph text.',
      },
      {
        sanskrit: '‘विशालं वनम्’ इत्यत्र विशेषणपदं/विशेष्यपदं किम्?',
        meaning: 'In the phrase \'the vast forest\', which word is the adjective and which is the noun being described?',
        tip: 'विशेषणपदम् = qualifying adjective (विशालम्); विशेष्यपदम् = noun being described (वनम्).',
      },
      {
        sanskrit: '‘...’ इत्यर्थे किं पदं प्रयुक्तम्?',
        meaning: 'Which word has been used to mean \'...\'? (Asking for a contextual synonym).',
        tip: 'Scan the designated passage for an equivalent noun sharing the exact same case and gender.',
      },
    ],
  },
  {
    sectionTitle: "खण्ड ‘ख’ : Creative Writing & Composition",
    sectionCode: "रचनात्मक-कार्यम्",
    badge: "Letter Writing, Picture Description & Translation",
    phrases: [
      {
        sanskrit: 'मञ्जूषायां दत्तशब्दानां साहाय्येन रिक्तस्थानानि पूरयित्वा पत्रं पुनः लिखत।',
        meaning: 'Fill in the blanks with the help of the words given in the helper box and rewrite the complete letter.',
        tip: 'CRUCIAL BOARD RULE: Remind students they MUST rewrite the entire letter on the answer sheet, not just list numbers!',
      },
      {
        sanskrit: 'प्रदत्तं चित्रं दृष्ट्वा मञ्जूषायां प्रदत्तशब्दानां साहाय्येन पञ्च वाक्यानि संस्कृतेन लिखत।',
        meaning: 'Looking at the given picture, write 5 sentences in Sanskrit using the words in the helper box.',
        tip: 'Use simple, grammatically rock-solid sentences using Bodhi\'s 5-step formula (Topic, Subject, Detail, Action, Harmony).',
      },
      {
        sanskrit: 'मञ्जूषाप्रदत्तशब्दानां साहाय्येन निम्नलिखितं विषयम् अधिकृत्य एकम् अनुच्छेदं लिखत।',
        meaning: 'Write a short paragraph based on the following topic with the help of the words provided in the box.',
        tip: 'Structure 5 sequential sentences centered on the given topic using words from the Mañjūṣā.',
      },
      {
        sanskrit: 'अधोलिखितानि वाक्यानि संस्कृतेन अनूद्य लिखत।',
        meaning: 'Translate the following sentences into Sanskrit.',
        tip: 'Identify tense (लट् / लृट् / लङ्), subject concord, and correct case inflections for each noun and verb.',
      },
    ],
  },
  {
    sectionTitle: "खण्ड ‘ग’ : Applied Grammar",
    sectionCode: "अनुप्रयोग-व्याकरणम् (व्याकरणवीथिः)",
    badge: "Formulaic Paninian Rules",
    phrases: [
      {
        sanskrit: 'रेखाङ्कितपदेषु सन्धिं सन्धिविच्छेदं वा कुरुत।',
        meaning: 'Do the joint (सन्धि) or break the joint (सन्धिविच्छेद) for the underlined words.',
        tip: 'Identify vowel junctions (दीर्घ, गुण, वृद्धि, यण्), consonant junctions, or visarga transformations.',
      },
      {
        sanskrit: 'रेखाङ्कितपदानां समासं विग्रहं वा विकल्पेभ्यः चिनुत।',
        meaning: 'Choose the compound phrase (समास) or its split expression (विग्रह) from the choices provided.',
        tip: 'Verify whether it is Tatpurusha, Karmadharaya, Dvigu, Bahuvrihi, Dvandva, or Avyayibhava.',
      },
      {
        sanskrit: 'प्रकृति-प्रत्ययौ संयोज्य/विभज्य कोष्ठकप्रदत्तशब्दानां स्थाने लिखत।',
        meaning: 'Combine or separate the root word (प्रकृति) and suffix (प्रत्यय — like क्त्वा, तुमुन्, ल्यप्, क्तवतु, शतृ).',
        tip: 'Ensure upasargas are factored in (e.g. वि + हस् + ल्यप् = विहस्य; गम् + तुमुन् = गन्तुम्).',
      },
      {
        sanskrit: 'कोष्ठकात् उचितं पदं चित्वा रिक्तस्थानानि पूरयत।',
        meaning: 'Choose the correct grammatically inflected word from the bracket and fill in the blanks.',
        tip: 'Examine Upapada case rules (सह triggers 3rd case; नमः triggers 4th case; परितः triggers 2nd case).',
      },
      {
        sanskrit: 'घटिकां दृष्ट्वा रिक्तस्थानेषु समयं लिखत।',
        meaning: 'Look at the clock and write the time in the blanks (using terms like सपाद, सार्ध, पादोन).',
        tip: 'Master the 4 time anchors: वादनम् (o\'clock), सपाद (+15m), सार्ध (+30m), पादोन (-15m to next hour).',
      },
      {
        sanskrit: 'वाक्येषु अव्ययपदानि चित्वा लिखत।',
        meaning: 'Identify and write the indeclinable words (अव्यय) from the sentences.',
        tip: 'Avyayas never change gender, number, or case (यदा, तदा, सर्वत्र, अपि, एव, च, उच्चैः, शनैः, अद्य, श्वः).',
      },
    ],
  },
  {
    sectionTitle: "पठित-अवबोधनम् : Literature & Shloka Analysis",
    sectionCode: "श्लोक-अन्वय-भावार्थ-घटनाक्रमाः",
    badge: "Textbook Poetry & Stories",
    phrases: [
      {
        sanskrit: 'रेखाङ्कितपदानि आधृत्य प्रश्ननिर्माणं कुरुत।',
        meaning: 'Frame questions targeting the underlined words.',
        tip: 'RULE: Swap the underlined word with a matching किम् pronoun or adverb, and MUST terminate the sentence with a question mark (?).',
      },
      {
        sanskrit: 'श्लोकस्य अन्वयं पूरयत।',
        meaning: 'Complete the prose line-order setup of the poetic verse.',
        tip: 'Reorder poetic metrics into standard prose: Subject (कर्ता) ➔ Object (कर्म) ➔ Verb (क्रिया).',
      },
      {
        sanskrit: 'श्लोकस्य भावार्थं मञ्जूषातः पदैः पूरयत।',
        meaning: 'Complete the underlying meaning/explanation of the verse using words from the box.',
        tip: 'Read the overall moral explanation first before selecting matching synonym tokens from the Mañjūṣā.',
      },
      {
        sanskrit: 'कथांशं/वाक्यानि घटनाक्रमानुसारं लिखत।',
        meaning: 'Rewrite the sentences according to the chronological sequence of the story plot.',
        tip: 'Identify the narrative cause and effect from your textbook chapter (e.g. hunter spreads net ➔ doves eat rice ➔ trapped ➔ mice sever net).',
      },
    ],
  },
];

const FUNCTIONAL_VERBS_CHECKLIST: {
  verb: string;
  meaning: string;
  action: string;
}[] = [
  {
    verb: 'चिनुत / चित्वा',
    meaning: 'Choose / Having chosen',
    action: 'Select the correct answer from the given MCQ options or bracket choices.',
  },
  {
    verb: 'लिखत',
    meaning: 'Write',
    action: 'Write the complete answer, word, or full sentence on your answer paper.',
  },
  {
    verb: 'पूरयत',
    meaning: 'Fill up',
    action: 'Fill in the blanks with the correct form or appropriate token from the helper box.',
  },
  {
    verb: 'संशोधयत',
    meaning: 'Correct (errors)',
    action: 'Spot grammatical mismatches (subject-verb agreement, case) and rewrite the corrected sentence.',
  },
  {
    verb: 'संयोज्य / विभज्य',
    meaning: 'Joining together / Separating apart',
    action: 'Combine root + suffix or sandhi components, or split joined compounds into base stems.',
  },
  {
    verb: 'अनूद्य लिखत',
    meaning: 'Translate & write',
    action: 'Translate the Hindi/English sentences into grammatical Sanskrit with proper case endings.',
  },
  {
    verb: 'दृष्ट्वा',
    meaning: 'Having seen / Looking at',
    action: 'Base your answer directly on visual observation of the provided clock or picture illustration.',
  },
  {
    verb: 'पठित्वा',
    meaning: 'Having read',
    action: 'Base your answers strictly on reading the provided prose excerpt or poetic verse.',
  },
];

const CHITRA_VARNANAM_STEPS: {
  step: string;
  title: string;
  formula: string;
  example: string;
  audioText: string;
}[] = [
  {
    step: 'Step 1: Setting the Scene',
    title: 'Topic & Context (स्थान-परिचयः)',
    formula: 'इदं चित्रं [स्थानं षष्ठ्याम्] अस्ति।',
    example: 'इदं चित्रं वाटिकायाः / विद्यालयस्य / क्रीडाङ्गणस्य अस्ति। (This picture is of a garden / school / playground.)',
    audioText: 'इदं चित्रं वाटिकायाः अस्ति',
  },
  {
    step: 'Step 2: What is Visible',
    title: 'Primary Subjects (चित्रे के सन्ति)',
    formula: 'चित्रे [प्रथमा बहुवचनम्] [क्रियापदम्]।',
    example: 'चित्रे बालकाः कन्दुकेन क्रीडन्ति। (In the picture, boys are playing with a ball.)',
    audioText: 'चित्रे बालकाः कन्दुकेन क्रीडन्ति',
  },
  {
    step: 'Step 3: Environment Details',
    title: 'Nature & Objects (वस्तु-विवरणम्)',
    formula: 'अत्र [सप्तमी स्थानम्] [विशेषणम्] [विशेष्यम्] सन्ति।',
    example: 'अत्र वृक्षे सुन्दराणि पुष्पाणि विकसन्ति। (Here on the trees, beautiful flowers are blossoming.)',
    audioText: 'अत्र वृक्षे सुन्दराणि पुष्पाणि विकसन्ति',
  },
  {
    step: 'Step 4: Ongoing Actions',
    title: 'Activity & Movement (क्रिया-वर्णनम्)',
    formula: '[कर्तृपदम्] [कर्म] कुर्वन्ति / दृश्यन्ते।',
    example: 'खगाः आकाशे उत्पतन्ति, जनाः प्रसन्नाः दृश्यन्ते। (Birds fly in the sky, and people appear joyful.)',
    audioText: 'खगाः आकाशे उत्पतन्ति जनाः प्रसन्नाः दृश्यन्ते',
  },
  {
    step: 'Step 5: Concluding Harmony',
    title: 'Aesthetic Conclusion (उपसंहारः)',
    formula: 'इदं चित्रं अतीव रमणीयं / सुन्दरम् अस्ति।',
    example: 'इदं चित्रं अतीव मनोहरं वर्तते। (This picture is exceedingly pleasant and charming.)',
    audioText: 'इदं चित्रं अतीव मनोहरं वर्तते',
  },
];

const CbseSanskritGuidePage: React.FC<CbseSanskritGuidePageProps> = ({
  onOpenRegister,
  onGoHome,
  onOpenPhilosophy,
  onOpenGrammar,
  onOpenResources,
}) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    metaDesc?.setAttribute('content', PAGE_DESC);

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute('href') || '';
    canonical?.setAttribute('href', PAGE_URL);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const prevOgTitle = ogTitle?.getAttribute('content') || '';
    const prevOgDesc = ogDesc?.getAttribute('content') || '';
    const prevOgUrl = ogUrl?.getAttribute('href') || ogUrl?.getAttribute('content') || '';
    ogTitle?.setAttribute('content', PAGE_TITLE);
    ogDesc?.setAttribute('content', PAGE_DESC);
    ogUrl?.setAttribute('content', PAGE_URL);

    return () => {
      document.title = prevTitle || DEFAULT_TITLE;
      metaDesc?.setAttribute('content', prevDesc || DEFAULT_DESC);
      if (prevCanonical) canonical?.setAttribute('href', prevCanonical);
      if (prevOgTitle) ogTitle?.setAttribute('content', prevOgTitle);
      if (prevOgDesc) ogDesc?.setAttribute('content', prevOgDesc);
      if (prevOgUrl) ogUrl?.setAttribute('content', prevOgUrl);
    };
  }, []);

  return (
    <article className="philosophy-page" id="cbse-sanskrit-guide-page" lang="en">
      <div className="philosophy-container">
        <header className="philosophy-hero">
          <div className="philosophy-hero-top">
            {onGoHome && (
              <button type="button" className="philosophy-crumb-btn" onClick={onGoHome}>
                ← Home
              </button>
            )}
            {onOpenGrammar && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenGrammar}>
                व्याकरणम्
              </button>
            )}
            {onOpenPhilosophy && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenPhilosophy}>
                Darśana
              </button>
            )}
            {onOpenResources && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenResources}>
                Free Resources
              </button>
            )}
          </div>

          <span className="philosophy-kicker">CBSE · NCERT · Classes 7–10</span>
          <h1 className="philosophy-title">
            The Definitive Guide to CBSE NCERT Sanskrit Exams: Pattern, Strategy, and Terminology
            (Classes 7–10)
          </h1>
          <p className="philosophy-secondary">
            Exam blueprint, question terminology, Kim-family keywords, and exam-day strategy
          </p>
        </header>

        <nav className="cbse-guide-quicknav" aria-label="Exam guide quick jump">
          <a href="#blueprint" className="cbse-quicknav-btn">📋 Exam Blueprint</a>
          <a href="#instructions" className="cbse-quicknav-btn">✍️ Instructions (निर्देशाः)</a>
          <a href="#question-words" className="cbse-quicknav-btn">❓ Question Words (क-कार)</a>
          <a href="#grammatical-directives" className="cbse-quicknav-btn">📐 Grammatical Directives</a>
          <a href="#section-by-section" className="cbse-quicknav-btn">📚 Sections (खण्ड क–घ)</a>
          <a href="#functional-verbs" className="cbse-quicknav-btn">⚡ Verb Endings Checklist</a>
          <a href="#chitra-varnanam" className="cbse-quicknav-btn">🖼️ Picture Description (चित्रवर्णनम्)</a>
          <a href="#practice-sentences" className="cbse-quicknav-btn">🔍 Practice Decoding</a>
          <a href="#strategy" className="cbse-quicknav-btn">🎯 Exam Day Strategy</a>
        </nav>

        <section className="philosophy-section" aria-labelledby="guide-intro">
          <h2 id="guide-intro" className="visually-hidden" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
            Introduction
          </h2>
          <p>
            Sanskrit is widely regarded as one of the most structured, logical, and high-scoring
            subjects in the school curriculum. Because it operates on predictable, mathematical
            rules, achieving a perfect score is entirely realistic.
          </p>
          <div className="cbse-guide-note" style={{ background: '#fffbeb', borderColor: '#f59e0b', color: '#78350f', margin: '1rem 0' }}>
            <strong>💡 Master the Predictable Exam Pattern:</strong> NCERT and CBSE Sanskrit exam questions follow standardized,
            formulaic patterns. The question papers use repetitive instruction phrases (निर्देशाः),
            interrogative root words (क-कार शब्दाः), and grammatical directives to frame tasks clearly across every class.
          </div>
          <p>
            This master guide consolidates everything you need to know about the exam pattern,
            question terminology, core keywords, and actionable preparation strategies as you
            progress from middle school through the Class 10 Board Examinations.
          </p>
        </section>

        <section className="philosophy-section" aria-labelledby="blueprint">
          <h2 id="blueprint">Section-by-Section Exam Blueprint</h2>
          <p>
            Whether you are in Class 7 or sitting for your Class 10 Board Exam (Subject Code 122),
            the Sanskrit question paper is uniformly organized into four distinct sections (
            <span lang="sa">खण्ड</span>).
          </p>
          <p>
            While middle school papers (Classes 7–8) may occasionally be scaled down by individual
            schools (e.g., to 60 marks over 2.5 hours), the official CBSE structure for High School
            (Classes 9–10) consists of an 80-mark theory paper spanning a 3-hour (180 minutes)
            duration, alongside a 20-mark internal assessment.
          </p>

          <div className="cbse-guide-table-wrap" role="region" aria-label="Section-by-section exam blueprint">
            <table className="cbse-guide-table">
              <thead>
                <tr>
                  <th scope="col">Section</th>
                  <th scope="col">Domain</th>
                  <th scope="col">Weightage (Class 10)</th>
                  <th scope="col">Target Time</th>
                  <th scope="col">Core Target &amp; Question Formats</th>
                </tr>
              </thead>
              <tbody>
                {BLUEPRINT_ROWS.map((row) => (
                  <tr key={row.section}>
                    <td lang="sa">{row.section}</td>
                    <td>
                      <span lang="sa">{row.domain.split(' (')[0]}</span>
                      {row.domain.includes(' (') ? ` (${row.domain.split(' (')[1]}` : ''}
                    </td>
                    <td>{row.weightage}</td>
                    <td>{row.time}</td>
                    <td>{row.formats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="cbse-guide-note">
            <strong>Note:</strong> Always reserve the remaining 30 minutes of your exam slot
            exclusively for reviewing accent marks, formatting, and proofreading.
          </p>
        </section>

        {/* ------------------------------------------------------------------
            1. Common Exam Instruction Types (निर्देशाः)
            ------------------------------------------------------------------ */}
        <section className="philosophy-section" aria-labelledby="instructions">
          <h2 id="instructions">1. Common Exam Instruction Types (निर्देशाः)</h2>
          <p>
            These standard instruction headings appear across almost every section of the paper.
            Understanding the exact directive eliminates translation confusion and ensures you do not lose marks by writing full sentences when only single words are required:
          </p>

          <div className="cbse-guide-table-wrap" role="region" aria-label="Common Exam Instruction Types">
            <table className="cbse-guide-table">
              <thead>
                <tr>
                  <th scope="col">Sanskrit Instruction (निर्देशाः)</th>
                  <th scope="col">Meaning</th>
                  <th scope="col">What the Student Must Do</th>
                </tr>
              </thead>
              <tbody>
                {EXAM_INSTRUCTIONS.map((item) => (
                  <tr key={item.sanskrit}>
                    <td lang="sa">
                      <strong>{item.sanskrit}</strong>
                      <button
                        type="button"
                        className="cbse-audio-btn"
                        onClick={() => playPronunciation(item.sanskrit)}
                        title={`Listen to '${item.sanskrit}' in Sanskrit`}
                        aria-label={`Listen to ${item.sanskrit}`}
                      >
                        🔊
                      </button>
                    </td>
                    <td>{item.meaning}</td>
                    <td>{item.studentAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            2. Core Question Words (क-कार शब्दाः)
            ------------------------------------------------------------------ */}
        <section className="philosophy-section" aria-labelledby="question-words">
          <h2 id="question-words">2. Core Question Words (क-कार शब्दाः)</h2>
          <p>
            Questions identify what fact is being asked through these interrogative pronouns and adverbs.
            Each &quot;Ka-kāra&quot; word points directly to a specific grammatical case (विभक्ति), time, location, count, or manner in the text:
          </p>

          <div className="cbse-guide-table-wrap" role="region" aria-label="Core Question Words">
            <table className="cbse-guide-table">
              <thead>
                <tr>
                  <th scope="col">Question Word</th>
                  <th scope="col">Transliteration</th>
                  <th scope="col">Meaning</th>
                  <th scope="col">Exam Clue / Target Context</th>
                </tr>
              </thead>
              <tbody>
                {QUESTION_WORDS.map((item) => (
                  <tr key={item.word}>
                    <td lang="sa">
                      <strong>{item.word}</strong>
                      <button
                        type="button"
                        className="cbse-audio-btn"
                        onClick={() => playPronunciation(item.word.split(' / ')[0])}
                        title={`Listen to '${item.word}'`}
                        aria-label={`Listen to ${item.word}`}
                      >
                        🔊
                      </button>
                    </td>
                    <td><em>{item.transliteration}</em></td>
                    <td><strong>{item.meaning}</strong></td>
                    <td>
                      <div>{item.clue}</div>
                      <span className="cbse-clue-badge">{item.caseBadge}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            3. Key Grammatical Directives (व्याकरण-शब्दावली)
            ------------------------------------------------------------------ */}
        <section className="philosophy-section" aria-labelledby="grammatical-directives">
          <h2 id="grammatical-directives">3. Key Grammatical Directives (व्याकरण-शब्दावली)</h2>
          <p>
            In Section C (Applied Grammar) and Section D (Textual comprehension exercises), questions frequently ask students
            to isolate and identify grammatical sentence components. Master these essential directives:
          </p>

          <div className="cbse-directives-grid">
            {GRAMMATICAL_DIRECTIVES.map((item) => (
              <div key={item.term} className="cbse-directive-card">
                <div className="cbse-directive-header">
                  <h3 className="cbse-directive-title" lang="sa">
                    {item.term}
                    <button
                      type="button"
                      className="cbse-audio-btn"
                      onClick={() => playPronunciation(item.term)}
                      title={`Listen to '${item.term}'`}
                      aria-label={`Listen to ${item.term}`}
                    >
                      🔊
                    </button>
                  </h3>
                  <span className="cbse-directive-role">{item.role}</span>
                </div>

                <div className="cbse-directive-phrase-box">
                  <div className="cbse-directive-phrase-label">
                    <span>Typical Exam Phrase</span>
                    <button
                      type="button"
                      className="cbse-audio-btn"
                      onClick={() => playPronunciation(item.examPhrase)}
                      title="Listen to this exam question phrase"
                      aria-label="Listen to exam phrase"
                    >
                      🔊
                    </button>
                  </div>
                  <p className="cbse-directive-phrase-text" lang="sa">
                    &apos;{item.examPhrase}&apos;
                  </p>
                  <p className="cbse-directive-phrase-meaning">
                    ({item.examPhraseMeaning})
                  </p>
                </div>

                <p className="cbse-directive-clue">
                  <strong>💡 Solving Strategy:</strong> {item.clue}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------
            4. Practice Sentences for Students to Decode
            ------------------------------------------------------------------ */}
        <section className="philosophy-section" aria-labelledby="practice-sentences">
          <h2 id="practice-sentences">4. Practice Sentences for Students to Decode (अभ्यास-वाक्यानि)</h2>
          <p>
            Here are the four most frequent formulaic directives tested in CBSE Sanskrit exams.
            Learn the exact decoding strategy for each task:
          </p>

          <div className="cbse-practice-list">
            {PRACTICE_SENTENCES.map((item, idx) => (
              <div key={item.sanskrit} className="cbse-practice-card">
                <div className="cbse-practice-top">
                  <h3 className="cbse-practice-sentence" lang="sa">
                    {idx + 1}. {item.sanskrit}
                    <button
                      type="button"
                      className="cbse-audio-btn"
                      onClick={() => playPronunciation(item.sanskrit)}
                      title={`Listen to directive ${idx + 1}`}
                      aria-label={`Listen to ${item.sanskrit}`}
                    >
                      🔊
                    </button>
                  </h3>
                </div>
                <p className="cbse-practice-meaning">
                  <strong>Meaning:</strong> {item.meaning}
                </p>
                <div className="cbse-practice-clue-box">
                  <strong>🎯 Exam Clue &amp; Action:</strong> {item.clue}
                </div>
                <div className="cbse-practice-example">
                  {item.example}
                </div>
              </div>
            ))}
          </div>

          <div className="cbse-guide-note" style={{ marginTop: '1.25rem' }}>
            <strong>📚 Academic Citations &amp; Blueprint Standards:</strong> Structured according to the official
            CBSE Class 10 Sanskrit Sample Question Papers (Code 122), NCERT Middle School Sanskrit Curricula (Classes 7–8 दीपकम),
            and standard Paninian question-framing conventions.
          </div>
        </section>

        {/* ------------------------------------------------------------------
            5. Section-by-Section Phrasing & Terminology (Classes 7–10)
            ------------------------------------------------------------------ */}
        <section className="philosophy-section" id="section-by-section" aria-labelledby="section-breakdown-heading">
          <h2 id="section-breakdown-heading">5. Section-by-Section Advanced Exam Directives (Classes 7–10)</h2>
          <p>
            For students progressing through Classes 7 to 10, the NCERT and CBSE Sanskrit exam structure transitions from
            foundational recall to advanced language synthesis across the four official sections (खण्डाः). Master the precise
            phrasing used by CBSE paper setters:
          </p>

          {SECTION_PHRASES_BY_PART.map((group) => (
            <div key={group.sectionTitle} style={{ margin: '1.5rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#9a3423', fontFamily: "'Noto Sans Devanagari', Georgia, serif" }}>
                  {group.sectionTitle}
                </h3>
                <span className="cbse-clue-badge" style={{ background: '#fef3c7', color: '#92400e', borderColor: '#fcd34d' }}>
                  {group.badge}
                </span>
              </div>

              <div className="cbse-section-cards-grid">
                {group.phrases.map((phrase) => (
                  <div key={phrase.sanskrit} className="cbse-section-phrase-card">
                    <h4 className="cbse-section-phrase-title" lang="sa">
                      <span>{phrase.sanskrit}</span>
                      <button
                        type="button"
                        className="cbse-audio-btn"
                        onClick={() => playPronunciation(phrase.sanskrit)}
                        title="Listen to this instruction"
                        aria-label={`Listen to ${phrase.sanskrit}`}
                      >
                        🔊
                      </button>
                    </h4>
                    <p className="cbse-section-phrase-meaning">
                      <strong>Meaning:</strong> {phrase.meaning}
                    </p>
                    <div className="cbse-section-phrase-tip">
                      <strong>💡 Exam Tip / Rule:</strong> {phrase.tip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ------------------------------------------------------------------
            6. Summary Checklist: Functional Verb Endings (क्रियापद-निर्देशाः)
            ------------------------------------------------------------------ */}
        <section className="philosophy-section" id="functional-verbs" aria-labelledby="functional-verbs-heading">
          <h2 id="functional-verbs-heading">6. Student Summary Checklist: Functional Verb Endings (क्रियापद-निर्देशाः)</h2>
          <p>
            When reading any question line during the exam, train yourself to instantly spot the functional imperative verb ending.
            These command verbs dictate exactly what task you must perform:
          </p>

          <div className="cbse-verb-grid">
            {FUNCTIONAL_VERBS_CHECKLIST.map((item) => (
              <div key={item.verb} className="cbse-verb-card">
                <div className="cbse-verb-sanskrit" lang="sa">
                  <span>{item.verb}</span>
                  <button
                    type="button"
                    className="cbse-audio-btn"
                    onClick={() => playPronunciation(item.verb.split(' / ')[0])}
                    title={`Listen to '${item.verb}'`}
                    aria-label={`Listen to ${item.verb}`}
                  >
                    🔊
                  </button>
                </div>
                <div className="cbse-verb-meaning">{item.meaning}</div>
                <div className="cbse-verb-action">{item.action}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------
            7. Picture Description Sheet (चित्रवर्णनम् — 5-Sentence Formula)
            ------------------------------------------------------------------ */}
        <section className="philosophy-section" id="chitra-varnanam" aria-labelledby="chitra-varnanam-heading">
          <h2 id="chitra-varnanam-heading">7. Picture Description Sheet (चित्रवर्णनम् — 5-Sentence Formula Sheet)</h2>
          <p>
            Picture description (चित्रवर्णनम्) in Section B awards an easy 5 out of 5 marks when approached systematically.
            Never write complicated prose; instead, follow Bodhi&apos;s formulaic 5-sentence architecture using tokens directly from the helper box (मञ्जूषा):
          </p>

          <div className="cbse-chitra-sheet">
            <div className="cbse-chitra-header">
              <h3 className="cbse-chitra-title" lang="sa">
                चित्रवर्णन-पञ्चवाक्य-सूत्रम् · 5-Sentence Scoring Formula
              </h3>
              <span className="cbse-chitra-badge">Section B · 5 Marks</span>
            </div>

            <div className="cbse-chitra-steps-grid">
              {CHITRA_VARNANAM_STEPS.map((step) => (
                <div key={step.step} className="cbse-chitra-step-card">
                  <span className="cbse-chitra-step-num">{step.step}</span>
                  <strong style={{ fontSize: '0.9rem', color: '#1f2937' }}>{step.title}</strong>
                  <p className="cbse-chitra-step-formula" lang="sa">
                    {step.formula}
                    <button
                      type="button"
                      className="cbse-audio-btn"
                      onClick={() => playPronunciation(step.audioText)}
                      title="Listen to example sentence"
                      aria-label={`Listen to ${step.title}`}
                    >
                      🔊
                    </button>
                  </p>
                  <p className="cbse-chitra-step-example">
                    {step.example}
                  </p>
                </div>
              ))}
            </div>

            <div className="cbse-chitra-manjusha-box">
              <div className="cbse-manjusha-title">
                📋 Typical Mañjūṣā (Helper Box) Word Bank
              </div>
              <div className="cbse-manjusha-tags">
                <span className="cbse-manjusha-tag">वाटिका (Garden)</span>
                <span className="cbse-manjusha-tag">वृक्षाः (Trees)</span>
                <span className="cbse-manjusha-tag">बालकाः (Boys)</span>
                <span className="cbse-manjusha-tag">क्रीडन्ति (Are playing)</span>
                <span className="cbse-manjusha-tag">पुष्पाणि (Flowers)</span>
                <span className="cbse-manjusha-tag">विकसन्ति (Blossom)</span>
                <span className="cbse-manjusha-tag">खगाः (Birds)</span>
                <span className="cbse-manjusha-tag">रमणीयम् (Pleasing)</span>
                <span className="cbse-manjusha-tag">प्रसन्नाः (Joyful)</span>
              </div>
            </div>

            <div className="cbse-chitra-rules-box">
              <strong>⚠️ Essential Board Exam Scoring Rules for चित्रवर्णनम्:</strong>
              <ul style={{ margin: '0.4rem 0 0', paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                <li><strong>Always rewrite complete sentences:</strong> Never write bare words or fragmented phrases on the answer booklet.</li>
                <li><strong>Singular vs Plural Concord:</strong> Double-check that your verb matches whether the subject is singular (<span lang="sa">अस्ति / क्रीडति</span>) or plural (<span lang="sa">सन्ति / क्रीडन्ति</span>).</li>
                <li><strong>Stick to the Mañjūṣā:</strong> Do not invent unfamiliar vocabulary. Selecting 1–2 words per sentence from the provided box guarantees full spelling and grammatical marks.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="philosophy-section" aria-labelledby="growth-path">
          <h2 id="growth-path">The Growth Path: How the Exam Evolves from Class 7 to 10</h2>
          <p>
            While the foundational blueprint (Sections A through D) remains entirely identical
            across all levels, the test formatting evolves as you progress:
          </p>

          <div className="philosophy-card">
            <h3>1. Paper Origin &amp; Scope</h3>
            <ul className="philosophy-steps">
              <li>
                <strong>Classes 7 &amp; 8:</strong> The assessment is school-managed. Papers are
                curated internally based on localized NCERT benchmarks. The syllabus is split into
                distinct terms (Half-Yearly and Annual components).
              </li>
              <li>
                <strong>Classes 9 &amp; 10:</strong> The assessment shifts to a Centralized CBSE Board
                framework. The Class 10 final exam is a cumulative review testing the entire academic
                year&apos;s text syllabus.
              </li>
            </ul>
          </div>

          <div className="philosophy-card">
            <h3>2. Conceptual Complexity</h3>
            <ul className="philosophy-steps">
              <li>
                <strong>Grammar Progression:</strong> Middle school focuses on basic verb tables
                (Dhatu Roop), standard noun declensions (Shabda Roop), and foundational vowel
                combinations. High school transitions heavily to advanced compound structures
                (Samas), complex prefixes and suffixes (Avyaya &amp; Pratyaya), and strict syntax
                corrections.
              </li>
              <li>
                <strong>Reading Tiers:</strong> Text patterns advance from basic 4–5 sentence
                narrative fables in Class 7 to complex, nuance-rich 100-word prose excerpts by Class
                10.
              </li>
            </ul>
          </div>
        </section>

        <section className="philosophy-section" aria-labelledby="strategy">
          <h2 id="strategy">High-Yield Strategic Pointers for Exam Day</h2>
          <ul className="philosophy-steps">
            <li>
              <strong>Invert the Order for Comprehension:</strong> Read the questions before reading
              the unseen passage. This anchors your attention to isolate the targeted sentences
              instantly upon your first scan of the text.
            </li>
            <li>
              <strong>Decode Before You Fill:</strong> For the Section B Letter Writing task, do not
              rush to plug words into blanks sequentially. Read the letter header and body
              completely first to determine the sender, recipient, and core context before pulling
              tokens from the Manjusha.
            </li>
            <li>
              <strong>Keep Picture Descriptions Crisp:</strong> When executing Chitra Varnanam,
              prioritize simplicity. Use predictable, grammatically clean phrases like{' '}
              <span lang="sa">“इदं चित्रं [Topic in Shasthi Vibhakti] अस्ति”</span> (This picture is
              of...) to bypass complex spelling or syntax risks.
            </li>
            <li>
              <strong>Master the Four Time-Anchors:</strong> For Samay-Lekhanam, secure an easy 4–5
              marks by verifying <span lang="sa">वादनम्</span> (o&apos;clock),{' '}
              <span lang="sa">सपाद</span> (quarter past), <span lang="sa">सार्ध</span> (half past),
              and <span lang="sa">पादोन</span> (quarter to). Always remember that a quarter-to
              configuration points forward (e.g., 4:45 must be written as{' '}
              <span lang="sa">पादोन-पञ्चवादनम्</span>, quarter to five).
            </li>
            <li>
              <strong>Audit for Visual Anchors:</strong> During your final 30-minute revision window,
              carefully review your script for missing Halant (<span lang="sa">्</span>) strokes and
              Visarga (<span lang="sa">ः</span>) dots. In a precise language like Sanskrit, omitting
              a single visual stroke can alter the grammatical case of a word completely.
            </li>
          </ul>
        </section>

        <section className="philosophy-cta" aria-labelledby="cbse-guide-cta-heading">
          <h2 id="cbse-guide-cta-heading">Begin Your 14-Day Free Trial</h2>
          <p>
            Build exam-ready Sanskrit skills with guided lessons, grammar tables, and practice —
            from middle school through Class 10 Board prep.
          </p>
          <p className="philosophy-cta-note">
            14-day free trial, then one-time ₹200. No auto-debit. Renew anytime.
          </p>
          <div className="philosophy-cta-actions">
            {onOpenRegister && (
              <button type="button" className="philosophy-cta-primary" onClick={onOpenRegister}>
                Start Free Trial ➔
              </button>
            )}
            {onOpenGrammar && (
              <button type="button" className="philosophy-cta-secondary" onClick={onOpenGrammar}>
                Explore व्याकरणम्
              </button>
            )}
          </div>
        </section>
      </div>
    </article>
  );
};

export default CbseSanskritGuidePage;
