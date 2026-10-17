import React, { useCallback, useEffect, useRef, useState } from 'react';
import { downloadWorkbook, type WorkbookFile } from '../utils/workbookDownload';
import { useAuthStore } from '../store/authStore';
import { hasPaidAccess, hasPremiumAccess } from '../utils/premiumAccess';
import { playPronunciation, stopPronunciation, speakAsBodhi } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';

type Book = { group?: string; id: string; title: string; pdf: WorkbookFile; pages: number; color: string; shots: { n: number; label: string }[] };

const BOOKS: Book[] = [
  {
    id: 'basic',
    title: '📥 Beginner Workbook',
    pdf: 'sanskrit-basic-workbook.pdf',
    pages: 28,
    color: '#15803d',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 3, label: 'Vowels' },
      { n: 9, label: 'First words' },
      { n: 26, label: 'Certificate' },
    ],
  },
  {
    id: 'festival',
    title: '🪔 Festival Workbook',
    pdf: 'sanskrit-festival-workbook.pdf',
    pages: 34,
    color: '#c2410c',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 3, label: 'Dīpāvalī' },
      { n: 25, label: 'Adornment' },
      { n: 28, label: 'Seasons' },
    ],
  },
  {
    group: 'grammar',
    id: 'grammar1',
    title: '📘 Grammar · Level 1 Basics',
    pdf: 'sanskrit-grammar-workbook-level-1.pdf',
    pages: 22,
    color: '#7c3aed',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 4, label: 'Cases' },
      { n: 5, label: 'राम' },
      { n: 15, label: 'Present' },
    ],
  },
  {
    group: 'grammar',
    id: 'grammar2',
    title: '📗 Grammar · Level 2 Intermediate',
    pdf: 'sanskrit-grammar-workbook-level-2.pdf',
    pages: 21,
    color: '#0d9488',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 4, label: 'Past tense' },
      { n: 10, label: 'Sandhi' },
      { n: 14, label: 'Kṛdanta' },
    ],
  },
  {
    group: 'grammar',
    id: 'grammar3',
    title: '📕 Grammar · Level 3 Advanced',
    pdf: 'sanskrit-grammar-workbook-level-3.pdf',
    pages: 22,
    color: '#be185d',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 3, label: 'Samāsa' },
      { n: 10, label: 'Passive' },
      { n: 18, label: 'Subhāṣita' },
    ],
  },
  {
    group: 'nature',
    id: 'animals',
    title: '🦚 Animals · पशवः पक्षिणश्च',
    pdf: 'sanskrit-animals-workbook.pdf',
    pages: 25,
    color: '#15803d',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 16, label: 'Vāhanas' },
      { n: 18, label: 'Pañcatantra' },
      { n: 22, label: 'Colouring' },
    ],
  },
  {
    group: 'nature',
    id: 'plants',
    title: '🌿 Indian Plants · वृक्षाः ओषधयश्च',
    pdf: 'sanskrit-plants-workbook.pdf',
    pages: 24,
    color: '#4d7c0f',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 5, label: 'Sacred trees' },
      { n: 10, label: 'Flowers' },
      { n: 18, label: 'Tulasī log' },
    ],
  },
];

const FREE_PREVIEW_PAGE_LIMIT = 4;

const thumb = (b: Book, n: number) => `/downloads/previews/${b.id}-p${n}-sm.webp`;
/** Screen-resolution page images. */
const pageImg = (b: Book, n: number) => `/workbook-preview/${b.id}/p${n}.webp`;

export interface WorkbookPageAudio {
  title: string;
  recitation: string;
  transliteration: string;
  english: string;
  vocab: { sa: string; iast: string; en: string }[];
}

const WORKBOOK_AUDIO_DATA: Record<string, { intro: WorkbookPageAudio; pages: Record<number, WorkbookPageAudio> }> = {
  basic: {
    intro: {
      title: 'Beginner Workbook Introduction',
      recitation: 'संस्कृत-प्रवेश-अभ्यास-पुस्तिका । अत्र स्वराः, व्यञ्जनानि, प्रथम-शब्दाः, सङ्ख्याः च सन्ति ।',
      transliteration: 'saṃskṛta-praveśa-abhyāsa-pustikā | atra svarāḥ, vyañjanāni, prathama-śabdāḥ, saṅkhyāḥ ca santi |',
      english: 'Sanskrit Beginner Workbook. Learn vowels, consonants, foundational vocabulary, and numbers.',
      vocab: [
        { sa: 'संस्कृतम्', iast: 'saṃskṛtam', en: 'Sanskrit' },
        { sa: 'अभ्यासः', iast: 'abhyāsaḥ', en: 'Practice' },
        { sa: 'पुस्तिका', iast: 'pustikā', en: 'Workbook' },
      ],
    },
    pages: {
      1: {
        title: 'Cover & Invocation · मङ्गलाचरणम्',
        recitation: 'ॐ श्री सरस्वत्यै नमः । विद्यां ददातु मे वाणी ।',
        transliteration: 'om śrī sarasvatyai namaḥ | vidyāṃ dadātu me vāṇī |',
        english: 'Salutations to Goddess Sarasvatī. May the divine mother grant auspicious wisdom and speech.',
        vocab: [
          { sa: 'सरस्वती', iast: 'sarasvatī', en: 'Goddess Sarasvatī' },
          { sa: 'विद्या', iast: 'vidyā', en: 'Knowledge' },
          { sa: 'वाणी', iast: 'vāṇī', en: 'Speech' },
        ],
      },
      3: {
        title: 'Vowels · स्वराः',
        recitation: 'अ आ इ ई उ ऊ ऋ ॠ ऌ ए ऐ ओ औ अं अः । वर्णानां मूलम् स्वराः ।',
        transliteration: 'a ā i ī u ū ṛ ṝ ḷ e ai o au aṃ aḥ | varṇānāṃ mūlam svarāḥ |',
        english: 'The primary vowels of the Sanskrit alphabet (Varṇamālā), carrying primal resonance.',
        vocab: [
          { sa: 'अ', iast: 'a', en: 'short a' },
          { sa: 'आ', iast: 'ā', en: 'long ā' },
          { sa: 'इ', iast: 'i', en: 'short i' },
          { sa: 'ई', iast: 'ī', en: 'long ī' },
          { sa: 'उ', iast: 'u', en: 'short u' },
          { sa: 'ऊ', iast: 'ū', en: 'long ū' },
          { sa: 'ऋ', iast: 'ṛ', en: 'vocalic ṛ' },
          { sa: 'ए', iast: 'e', en: 'vowel e' },
          { sa: 'ऐ', iast: 'ai', en: 'vowel ai' },
          { sa: 'ओ', iast: 'o', en: 'vowel o' },
          { sa: 'औ', iast: 'au', en: 'vowel au' },
        ],
      },
      9: {
        title: 'First Words · प्रथम-शब्दाः',
        recitation: 'कमलम्, गजः, अश्वः, फलम्, वृक्षः, पुस्तकम् । एते दैनन्दिन-शब्दाः ।',
        transliteration: 'kamalam, gajaḥ, aśvaḥ, phalam, vṛkṣaḥ, pustakam | ete dainandina-śabdāḥ |',
        english: 'Foundational Sanskrit vocabulary for everyday objects, nature, and living beings.',
        vocab: [
          { sa: 'कमलम्', iast: 'kamalam', en: 'Lotus' },
          { sa: 'गजः', iast: 'gajaḥ', en: 'Elephant' },
          { sa: 'अश्वः', iast: 'aśvaḥ', en: 'Horse' },
          { sa: 'फलम्', iast: 'phalam', en: 'Fruit' },
          { sa: 'वृक्षः', iast: 'vṛkṣaḥ', en: 'Tree' },
          { sa: 'पुस्तकम्', iast: 'pustakam', en: 'Book' },
        ],
      },
      26: {
        title: 'Numbers & Completion · सङ्ख्याः अभिनन्दनं च',
        recitation: 'एकम् द्वे त्रीणि चत्वारि पञ्च षट् सप्त अष्ट नव दश । साधु साधु अभिनन्दनम् !',
        transliteration: 'ekam dve trīṇi catvāri pañca ṣaṭ sapta aṣṭa nava daśa | sādhu sādhu abhinandanam!',
        english: 'Cardinal numerals 1 to 10. Well done! Hearty congratulations on finishing beginner drills.',
        vocab: [
          { sa: 'एकम्', iast: 'ekam', en: '1' },
          { sa: 'द्वे', iast: 'dve', en: '2' },
          { sa: 'त्रीणि', iast: 'trīṇi', en: '3' },
          { sa: 'चत्वारि', iast: 'catvāri', en: '4' },
          { sa: 'पञ्च', iast: 'pañca', en: '5' },
          { sa: 'दश', iast: 'daśa', en: '10' },
        ],
      },
    },
  },
  festival: {
    intro: {
      title: 'Festival Workbook Introduction',
      recitation: 'भारतीय-महोत्सवाः । संस्कृतेन उत्सव-परिचयः आनन्दश्च ।',
      transliteration: 'bhāratīya-mahotsavāḥ | saṃskṛtena utsava-paricayaḥ ānandaśca |',
      english: 'Festivals of India workbook. Explore auspicious celebrations, chants, and seasonal cycles in Sanskrit.',
      vocab: [
        { sa: 'उत्सवः', iast: 'utsavaḥ', en: 'Festival' },
        { sa: 'आनन्दः', iast: 'ānandaḥ', en: 'Joy / Bliss' },
      ],
    },
    pages: {
      1: {
        title: 'Festivals of India · उत्सवाः',
        recitation: 'उत्सवाः भारतस्य प्राणभूताः । सर्वे भवन्तु सुखिनः ।',
        transliteration: 'utsavāḥ bhāratasya prāṇabhūtāḥ | sarve bhavantu sukhinaḥ |',
        english: 'Festivals represent the living spirit of Indian civilization, spreading joy and auspiciousness.',
        vocab: [
          { sa: 'उत्सवः', iast: 'utsavaḥ', en: 'Festival' },
          { sa: 'सुखम्', iast: 'sukham', en: 'Happiness' },
        ],
      },
      3: {
        title: 'Dīpāvalī · दीपावली',
        recitation: 'दीपावली प्रकाशोत्सवः । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥',
        transliteration: 'dīpāvalī prakāśotsavaḥ | tamaso mā jyotirgamaya | mṛtyormā\'mṛtaṃ gamaya ||',
        english: 'Dīpāvalī is the festival of lights. Lead us from darkness to light, and from mortality to immortality.',
        vocab: [
          { sa: 'दीपावली', iast: 'dīpāvalī', en: 'Festival of Lights' },
          { sa: 'दीपः', iast: 'dīpaḥ', en: 'Oil lamp' },
          { sa: 'प्रकाशः', iast: 'prakāśaḥ', en: 'Radiance' },
          { sa: 'ज्योतिः', iast: 'jyotiḥ', en: 'Flame' },
        ],
      },
      25: {
        title: 'Adornment & Rangoli · अलङ्करणम् रङ्गवल्ली च',
        recitation: 'द्वारदेशे मङ्गला रङ्गवल्ली रच्यते । पुष्पमालाभिश्च गृहं शोभते ।',
        transliteration: 'dvāradeśe maṅgalā raṅgavallī racyate | puṣpamālābhiśca gṛhaṃ śobhate |',
        english: 'Sacred symmetrical rangoli patterns at the doorway invite prosperity, harmony, and positivity.',
        vocab: [
          { sa: 'रङ्गवल्ली', iast: 'raṅgavallī', en: 'Rangoli' },
          { sa: 'पुष्पम्', iast: 'puṣpam', en: 'Flower' },
          { sa: 'मङ्गलम्', iast: 'maṅgalam', en: 'Auspiciousness' },
        ],
      },
      28: {
        title: 'The Six Seasons · षड् ऋतवः',
        recitation: 'संवत्सरे षड् ऋतवः — वसन्तः, ग्रीष्मः, वर्षा, शरद्, हेमन्तः, शिशिरश्च ।',
        transliteration: 'saṃvatsare ṣaḍ ṛtavaḥ — vasantaḥ, grīṣmaḥ, varṣā, śarad, hemantaḥ, śiśiraśca |',
        english: 'The six seasons: Spring, Summer, Monsoon, Autumn, Early Winter, and Late Winter.',
        vocab: [
          { sa: 'वसन्तः', iast: 'vasantaḥ', en: 'Spring' },
          { sa: 'ग्रीष्मः', iast: 'grīṣmaḥ', en: 'Summer' },
          { sa: 'वर्षा', iast: 'varṣā', en: 'Monsoon' },
          { sa: 'शरद्', iast: 'śarad', en: 'Autumn' },
        ],
      },
    },
  },
  grammar1: {
    intro: {
      title: 'Grammar Level 1 Introduction',
      recitation: 'पाणिनीय-व्याकरण-प्रारम्भः । कारकाणि, विभक्तयः, लट्-लकारश्च ।',
      transliteration: 'pāṇinīya-vyākaraṇa-prārambhaḥ | kārakāṇi, vibhaktayaḥ, laṭ-lakāraśca |',
      english: 'Level 1 Grammar foundations: cases, nouns, and present tense verb forms.',
      vocab: [
        { sa: 'व्याकरणम्', iast: 'vyākaraṇam', en: 'Grammar' },
        { sa: 'विभक्तिः', iast: 'vibhaktiḥ', en: 'Case inflection' },
      ],
    },
    pages: {
      1: {
        title: 'Grammar Level 1 Cover',
        recitation: 'मुखं व्याकरणं स्मृतम् । शब्दशास्त्रं हि भाषायाः आधारः ।',
        transliteration: 'mukhaṃ vyākaraṇaṃ smṛtam | śabdaśāstraṃ hi bhāṣāyāḥ ādhāraḥ |',
        english: 'Grammar is hailed as the principal limb of linguistic science, revealing precise semantic order.',
        vocab: [
          { sa: 'मुखम्', iast: 'mukham', en: 'Mouth / Face' },
          { sa: 'शास्त्रम्', iast: 'śāstram', en: 'System of knowledge' },
        ],
      },
      4: {
        title: 'Cases & Vibhaktis · कारकाणि',
        recitation: 'प्रथमा कर्ता, द्वितीया कर्म, तृतीया करणम्, चतुर्थी सम्प्रदानम्, पञ्चमी अपादानम्, षष्ठी सम्बन्धः, सप्तमी अधिकरणम् ।',
        transliteration: 'prathamā kartā, dvitīyā karma, tṛtīyā karaṇam, caturthī sampradānam, pañcamī apādānam, ṣaṣṭhī sambandhaḥ, saptamī adhikaraṇam |',
        english: 'The seven grammatical cases and their semantic relations: agent, object, instrument, beneficiary, source, genitive, and locus.',
        vocab: [
          { sa: 'कर्ता', iast: 'kartā', en: 'Nominative / Agent' },
          { sa: 'कर्म', iast: 'karma', en: 'Accusative / Object' },
          { sa: 'करणम्', iast: 'karaṇam', en: 'Instrumental' },
          { sa: 'सम्प्रदानम्', iast: 'sampradānam', en: 'Dative' },
          { sa: 'अपादानम्', iast: 'apādānam', en: 'Ablative' },
          { sa: 'अधिकरणम्', iast: 'adhikaraṇam', en: 'Locative' },
        ],
      },
      5: {
        title: 'Rāma Declension · राम-शब्दः',
        recitation: 'रामः रामौ रामाः । रामम् रामौ रामान् । रामेण रामाभ्याम् रामैः । रामाय रामाभ्याम् रामेभ्यः ।',
        transliteration: 'rāmaḥ rāmau rāmāḥ | rāmam rāmau rāmān | rāmeṇa rāmābhyām rāmaiḥ | rāmāya rāmābhyām rāmebhyaḥ |',
        english: 'Masculine nominal paradigm in short a: singular, dual, and plural case declensions.',
        vocab: [
          { sa: 'रामः', iast: 'rāmaḥ', en: 'Rāma (singular)' },
          { sa: 'रामौ', iast: 'rāmau', en: 'Two Rāmas (dual)' },
          { sa: 'रामाः', iast: 'rāmāḥ', en: 'Many Rāmas (plural)' },
          { sa: 'रामेण', iast: 'rāmeṇa', en: 'By/with Rāma' },
        ],
      },
      15: {
        title: 'Present Tense · लट्-लकारः',
        recitation: 'पठति पठतः पठन्ति । पठसि पठथः पठथ । पठामि पठावः पठामः ।',
        transliteration: 'paṭhati paṭhataḥ paṭhanti | paṭhasi paṭhathaḥ paṭhatha | paṭhāmi paṭhāvaḥ paṭhāmaḥ |',
        english: 'Present active tense conjugations across 3rd, 2nd, and 1st persons.',
        vocab: [
          { sa: 'पठति', iast: 'paṭhati', en: 'He/she reads' },
          { sa: 'पठन्ति', iast: 'paṭhanti', en: 'They read' },
          { sa: 'पठामि', iast: 'paṭhāmi', en: 'I read' },
        ],
      },
    },
  },
  grammar2: {
    intro: {
      title: 'Grammar Level 2 Introduction',
      recitation: 'व्याकरण-द्वितीय-भागः । भूतकालः, सन्धि-नियमाः, कृदन्ताः प्रत्ययाश्च ।',
      transliteration: 'vyākaraṇa-dvitīya-bhāgaḥ | bhūtakālaḥ, sandhi-niyamāḥ, kṛdantāḥ pratyayāśca |',
      english: 'Intermediate grammar: past imperfect tense, vowel Sandhi rules, and indeclinable participles.',
      vocab: [
        { sa: 'सन्धिः', iast: 'sandhiḥ', en: 'Sandhi union' },
        { sa: 'प्रत्ययः', iast: 'pratyayaḥ', en: 'Suffix' },
      ],
    },
    pages: {
      1: {
        title: 'Grammar Level 2 Cover',
        recitation: 'संस्कृत-व्याकरण-मध्यम-स्तरः । सन्धि-सौन्दर्यम् ।',
        transliteration: 'saṃskṛta-vyākaraṇa-madhyama-staraḥ | sandhi-saundaryam |',
        english: 'Master intermediate syntax, past tense narration, and generative phonological combination.',
        vocab: [
          { sa: 'मध्यमः', iast: 'madhyamaḥ', en: 'Intermediate' },
          { sa: 'सौन्दर्यम्', iast: 'saundaryam', en: 'Beauty' },
        ],
      },
      4: {
        title: 'Past Tense · लङ्-लकारः',
        recitation: 'अपठत् अपठताम् अपठन् । अपठः अपठतम् अपठत । अपठम् अपठाव अपठाम ।',
        transliteration: 'apaṭhat apaṭhatām apaṭhan | apaṭhaḥ apaṭhatam apaṭhata | apaṭham apaṭhāva apaṭhāma |',
        english: 'Past imperfect verb conjugations with standard vowel augment prefix a- (अ-).',
        vocab: [
          { sa: 'अपठत्', iast: 'apaṭhat', en: 'He read' },
          { sa: 'अपठन्', iast: 'apaṭhan', en: 'They read' },
          { sa: 'अपठम्', iast: 'apaṭham', en: 'I read' },
        ],
      },
      10: {
        title: 'Sandhi Rules · सन्धि-नियमाः',
        recitation: 'अकः सवर्णे दीर्घः — देव + आलयः = देवालयः । आद्गुणः — नर + ईशः = नरेशः ।',
        transliteration: 'akaḥ savarṇe dīrghaḥ — deva + ālayaḥ = devālayaḥ | ādguṇaḥ — nara + īśaḥ = nareśaḥ |',
        english: 'Pāṇinian vowel rules: homogeneous vowel lengthening (Dīrgha) and vowel quality shift (Guṇa).',
        vocab: [
          { sa: 'दीर्घः', iast: 'dīrghaḥ', en: 'Long vowel Sandhi' },
          { sa: 'गुणः', iast: 'guṇaḥ', en: 'Guṇa vowel shift' },
          { sa: 'वृद्धिः', iast: 'vṛddhiḥ', en: 'Vṛddhi expansion' },
        ],
      },
      14: {
        title: 'Kṛdanta Participles · कृदन्ताः',
        recitation: 'गत्वा (having gone), आगत्य (having arrived), गन्तुम् (in order to go) ।',
        transliteration: 'gatvā (having gone), āgatya (having arrived), gantum (in order to go) |',
        english: 'Participial suffixes: Ktvā for sequential action, Lyap with prefixes, and Tumun for purpose.',
        vocab: [
          { sa: 'गत्वा', iast: 'gatvā', en: 'Having gone' },
          { sa: 'आगत्य', iast: 'āgatya', en: 'Having arrived' },
          { sa: 'गन्तुम्', iast: 'gantum', en: 'In order to go' },
        ],
      },
    },
  },
  grammar3: {
    intro: {
      title: 'Grammar Level 3 Introduction',
      recitation: 'व्याकरण-तृतीय-भागः । समासाः, कर्मणि प्रयोगः, सुभाषित-रत्नानि च ।',
      transliteration: 'vyākaraṇa-tṛtīya-bhāgaḥ | samāsāḥ, karmaṇi prayogaḥ, subhāṣita-ratnāni ca |',
      english: 'Advanced Sanskrit syntax, compound taxonomy, passive syntax, and metric poetic wisdom.',
      vocab: [
        { sa: 'समासः', iast: 'samāsaḥ', en: 'Compound' },
        { sa: 'सुभाषितम्', iast: 'subhāṣitam', en: 'Wisdom verse' },
      ],
    },
    pages: {
      1: {
        title: 'Grammar Level 3 Cover',
        recitation: 'प्रौढ-व्याकरण-चिन्तनम् । समास-वैभवम् ।',
        transliteration: 'prauḍha-vyākaraṇa-cintanam | samāsa-vaibhavam |',
        english: 'Advanced generative grammar and synthesis of classical philosophical verse.',
        vocab: [
          { sa: 'प्रौढम्', iast: 'prauḍham', en: 'Advanced' },
          { sa: 'वैभवम्', iast: 'vaibhavam', en: 'Grandeur' },
        ],
      },
      3: {
        title: 'Samāsa Compounds · समासाः',
        recitation: 'समासः सङ्क्षेपः । तत्पुरुषः, द्वन्द्वः, बहुव्रीहिः, कर्मधारयः, द्विगुः, अव्ययीभावश्च ।',
        transliteration: 'samāsaḥ saṅkṣepaḥ | tatpuruṣaḥ, dvandvaḥ, bahuvrīhiḥ, karmadhārayaḥ, dviguḥ, avyayībhāvaśca |',
        english: 'Compounds condense syntactic relations: determinative, coordinative, exocentric, and adverbial.',
        vocab: [
          { sa: 'तत्पुरुषः', iast: 'tatpuruṣaḥ', en: 'Determinative' },
          { sa: 'द्वन्द्वः', iast: 'dvandvaḥ', en: 'Coordinative' },
          { sa: 'बहुव्रीहिः', iast: 'bahuvrīhiḥ', en: 'Exocentric' },
          { sa: 'अव्ययीभावः', iast: 'avyayībhāvaḥ', en: 'Indeclinable' },
        ],
      },
      10: {
        title: 'Passive Voice · कर्मणि प्रयोगः',
        recitation: 'कर्मणि प्रयोगे तृतीया कर्तरि, प्रथमा कर्मणि । तेन ग्रन्थः पठ्यते ।',
        transliteration: 'karmaṇi prayoge tṛtīyā kartari, prathamā karmaṇi | tena granthaḥ paṭhyate |',
        english: 'Passive construction: agent in instrumental case, object in nominative case with yak-affix.',
        vocab: [
          { sa: 'पठ्यते', iast: 'paṭhyate', en: 'Is read' },
          { sa: 'क्रियते', iast: 'kriyate', en: 'Is done' },
          { sa: 'ज्ञायते', iast: 'jñāyate', en: 'Is known' },
        ],
      },
      18: {
        title: 'Subhāṣita Verses · सुभाषितम्',
        recitation: 'विद्या ददाति विनयं विनयाद् याति पात्रताम् । पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ॥',
        transliteration: 'vidyā dadāti vinayaṃ vinayād yāti pātratām | pātratvāddhanamāpnoti dhanāddharmaṃ tataḥ sukham ||',
        english: 'Knowledge bestows humility; from humility comes worthiness; from worthiness wealth; from wealth righteousness, and thence lasting peace.',
        vocab: [
          { sa: 'विद्या', iast: 'vidyā', en: 'Knowledge' },
          { sa: 'विनयम्', iast: 'vinayam', en: 'Humility' },
          { sa: 'पात्रताम्', iast: 'pātratām', en: 'Integrity' },
          { sa: 'सुखम्', iast: 'sukham', en: 'Peace / Happiness' },
        ],
      },
    },
  },
  animals: {
    intro: {
      title: 'Animals Workbook Introduction',
      recitation: 'पशवः पक्षिणश्च । जीवजन्तु-परिचयः पञ्चतन्त्र-नीतिश्च ।',
      transliteration: 'paśavaḥ pakṣiṇaśca | jīvajantu-paricayaḥ pañcatantra-nītiśca |',
      english: 'Animals and birds workbook: Sanskrit names of fauna, sacred deity mounts, and Pañcatantra wisdom.',
      vocab: [
        { sa: 'पशुः', iast: 'paśuḥ', en: 'Animal' },
        { sa: 'पक्षी', iast: 'pakṣī', en: 'Bird' },
      ],
    },
    pages: {
      1: {
        title: 'Animals & Birds · पशवः पक्षिणश्च',
        recitation: 'सर्वभूतहिते रताः । संसारे जीवाः परस्परं सहायकाः ।',
        transliteration: 'sarvabhūtahite ratāḥ | saṃsāre jīvāḥ parasparaṃ sahāyakāḥ |',
        english: 'Dedicated to universal welfare: all living creatures are interconnected in the web of existence.',
        vocab: [
          { sa: 'जीवः', iast: 'jīvaḥ', en: 'Living being' },
          { sa: 'हितम्', iast: 'hitam', en: 'Welfare' },
        ],
      },
      16: {
        title: 'Vāhanas of Deities · देवानां वाहनानि',
        recitation: 'मूषकः गणेशस्य वाहनम् । मयूरः कार्तिकेयस्य वाहनम् । गरुडः विष्णोः वाहनम् । नन्दी वृषभः शिवस्य वाहनम् ।',
        transliteration: 'mūṣakaḥ gaṇeśasya vāhanam | mayūraḥ kārtikeyasya vāhanam | garuḍaḥ viṣṇoḥ vāhanam | nandī vṛṣabhaḥ śivasya vāhanam |',
        english: 'Sacred animal steeds: mouse of Gaṇeśa, peacock of Kārtikeya, eagle of Viṣṇu, and bull Nandi of Śiva.',
        vocab: [
          { sa: 'मूषकः', iast: 'mūṣakaḥ', en: 'Mouse (Gaṇeśa)' },
          { sa: 'मयूरः', iast: 'mayūraḥ', en: 'Peacock (Kārtikeya)' },
          { sa: 'गरुडः', iast: 'garuḍaḥ', en: 'Eagle (Viṣṇu)' },
          { sa: 'वृषभः', iast: 'vṛṣabhaḥ', en: 'Bull (Śiva)' },
        ],
      },
      18: {
        title: 'Pañcatantra Tales · पञ्चतन्त्रम्',
        recitation: 'मित्रेण सह विश्वासः । काक-कूर्म-मृग-मूषक-कथा ।',
        transliteration: 'mitreṇa saha viśvāsaḥ | kāka-kūrma-mṛga-mūṣaka-kathā |',
        english: 'The power of cooperative friendship: the classic Pañcatantra fable of crow, turtle, deer, and mouse.',
        vocab: [
          { sa: 'काकः', iast: 'kākaḥ', en: 'Crow' },
          { sa: 'कूर्मः', iast: 'kūrmaḥ', en: 'Tortoise' },
          { sa: 'मृगः', iast: 'mṛgaḥ', en: 'Deer' },
          { sa: 'मित्रम्', iast: 'mitram', en: 'Friend' },
        ],
      },
      22: {
        title: 'Forest Animals · वन्यजीवाः',
        recitation: 'व्याघ्रः राष्ट्रिय-पशुः । गजः विशालकायः । शशकः वेगेन धावति ।',
        transliteration: 'vyāghraḥ rāṣṭrīya-paśuḥ | gajaḥ viśālakāyaḥ | śaśakaḥ vegena dhāvati |',
        english: 'The tiger is the national animal; the elephant is magnificent; the rabbit runs with speed.',
        vocab: [
          { sa: 'व्याघ्रः', iast: 'vyāghraḥ', en: 'Tiger' },
          { sa: 'गजः', iast: 'gajaḥ', en: 'Elephant' },
          { sa: 'शशकः', iast: 'śaśakaḥ', en: 'Rabbit' },
        ],
      },
    },
  },
  plants: {
    intro: {
      title: 'Plants Workbook Introduction',
      recitation: 'वृक्षाः ओषधयश्च । भारतस्य पावन-पादपाः वनस्पति-विज्ञानं च ।',
      transliteration: 'vṛkṣāḥ oṣadhayaśca | bhāratasya pavitra-pādapāḥ vanaspati-vijñānaṃ ca |',
      english: 'Indian Plants workbook: sacred trees, healing Ayurvedic herbology, and fragrant blossoms.',
      vocab: [
        { sa: 'वृक्षः', iast: 'vṛkṣaḥ', en: 'Tree' },
        { sa: 'ओषधिः', iast: 'oṣadhiḥ', en: 'Medicinal herb' },
      ],
    },
    pages: {
      1: {
        title: 'Sacred Flora · वृक्षाः ओषधयश्च',
        recitation: 'वनस्पतयः शान्तिः । वृक्षाः पृथिव्याः भूषणम् ।',
        transliteration: 'vanaspatayaḥ śāntiḥ | vṛkṣāḥ pṛthivyāḥ bhūṣaṇam |',
        english: 'Peace unto the botanical realm. Trees are the living adornments of mother earth.',
        vocab: [
          { sa: 'वनस्पतिः', iast: 'vanaspatiḥ', en: 'Plant life' },
          { sa: 'शान्तिः', iast: 'śāntiḥ', en: 'Peace' },
        ],
      },
      5: {
        title: 'Sacred Trees · पवित्र-वृक्षाः',
        recitation: 'अश्वत्थः देवतरुः — पिप्पलो वृक्षः । वटवृक्षः विशाल-न्यग्रोधः । बिल्ववृक्षः शिवपूजने प्रियः ।',
        transliteration: 'aśvatthaḥ devataruḥ — pippalo vṛkṣaḥ | vaṭavṛkṣaḥ viśāla-nyagrodhaḥ | bilvavṛkṣaḥ śivapūjane priyaḥ |',
        english: 'The divine peepal tree, majestic banyan tree, and sacred bael tree revered in Indian tradition.',
        vocab: [
          { sa: 'अश्वत्थः', iast: 'aśvatthaḥ', en: 'Peepal tree' },
          { sa: 'वटवृक्षः', iast: 'vaṭavṛkṣaḥ', en: 'Banyan tree' },
          { sa: 'बिल्वः', iast: 'bilvaḥ', en: 'Bael tree' },
        ],
      },
      10: {
        title: 'Fragrant Flowers · सुरभि-कुसुमानि',
        recitation: 'कमलम् राष्ट्रिय-पुष्पम् । मल्लिका, पारिजातः, जपाकुसुमं च शोभन्ते ।',
        transliteration: 'kamalam rāṣṭrīya-puṣpam | mallikā, pārijātaḥ, japākusumaṃ ca śobhante |',
        english: 'The sacred lotus is the national flower, alongside fragrant jasmine, celestial pārijāta, and hibiscus.',
        vocab: [
          { sa: 'कमलम्', iast: 'kamalam', en: 'Lotus' },
          { sa: 'मल्लिका', iast: 'mallikā', en: 'Jasmine' },
          { sa: 'पारिजातः', iast: 'pārijātaḥ', en: 'Pārijāta' },
          { sa: 'जपा', iast: 'japā', en: 'Hibiscus' },
        ],
      },
      18: {
        title: 'Tulasī & Herbology · तुलसी महिमा',
        recitation: 'तुलसी सर्वकल्याणकरी पवित्रा । निम्बः रोगनिवारकः । हरिद्रा, आमलकी, अश्वगन्धा च ।',
        transliteration: 'tulasī sarvakalyāṇakarī pavitrā | nimbaḥ roganivārakaḥ | haridrā, āmalakī, aśvagandhā ca |',
        english: 'Holy Basil (Tulasī) brings holistic purity; neem eliminates ailments; along with turmeric, amla, and ashwagandha.',
        vocab: [
          { sa: 'तुलसी', iast: 'tulasī', en: 'Holy Basil' },
          { sa: 'निम्बः', iast: 'nimbaḥ', en: 'Neem tree' },
          { sa: 'हरिद्रा', iast: 'haridrā', en: 'Turmeric' },
          { sa: 'आमलकी', iast: 'āmalakī', en: 'Indian Gooseberry' },
        ],
      },
    },
  },
};

const getWorkbookPageAudio = (b: Book, pageNum: number): WorkbookPageAudio => {
  const bookAudio = WORKBOOK_AUDIO_DATA[b.id];
  if (bookAudio?.pages[pageNum]) {
    return bookAudio.pages[pageNum];
  }
  return {
    title: `${b.title} · Page ${pageNum}`,
    recitation: `${b.title} । पृष्ठम् ${pageNum} । अभ्यासेन विद्या सिध्यति ।`,
    transliteration: `${b.title} | pṛṣṭham ${pageNum} | abhyāsena vidyā sidhyati |`,
    english: `${b.title}, page ${pageNum}. Diligent practice leads to complete mastery.`,
    vocab: [
      { sa: 'पृष्ठम्', iast: 'pṛṣṭham', en: `Page ${pageNum}` },
      { sa: 'अभ्यासः', iast: 'abhyāsaḥ', en: 'Practice' },
      { sa: 'सिद्धिः', iast: 'siddhiḥ', en: 'Mastery' },
    ],
  };
};

const WorkbookPreviews: React.FC<{ compact?: boolean }> = () => {
  const [open, setOpen] = useState<{ b: Book; n: number } | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioMode, setAudioMode] = useState<'sa' | 'bilingual'>('sa');
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const audioStopRef = useRef<(() => void) | null>(null);

  const { currentUser, isAdminLoggedIn, openAuthModal, openPaymentModal } = useAuthStore();
  const isPaidMember = hasPaidAccess(currentUser, isAdminLoggedIn);
  const hasTwoWeekSub = hasPremiumAccess(currentUser, isAdminLoggedIn);

  const stopAudio = useCallback(() => {
    if (audioStopRef.current) {
      audioStopRef.current();
      audioStopRef.current = null;
    }
    stopPronunciation();
    setIsPlayingAudio(false);
    setActiveWord(null);
  }, []);

  const close = useCallback(() => {
    stopAudio();
    setOpen(null);
  }, [stopAudio]);

  const step = useCallback(
    (d: number) => {
      stopAudio();
      setOpen((o) => (o ? { ...o, n: ((o.n - 1 + d + o.b.pages) % o.b.pages) + 1 } : o));
    },
    [stopAudio]
  );

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  const handleRegisterTrial = useCallback(() => {
    close();
    openAuthModal('register');
  }, [close, openAuthModal]);

  const handlePaidUpgrade = useCallback(() => {
    close();
    if (!currentUser) openAuthModal('register');
    else openPaymentModal('unlock_paid_features');
  }, [close, currentUser, openAuthModal, openPaymentModal]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  const currentPageAudio = open ? getWorkbookPageAudio(open.b, open.n) : null;

  const togglePageAudio = useCallback(() => {
    if (!open || !currentPageAudio) return;
    if (isPlayingAudio) {
      stopAudio();
      return;
    }
    stopAudio();
    setIsPlayingAudio(true);
    soundEffects.playStrokeChime();

    const textToRecite =
      audioMode === 'bilingual'
        ? `${currentPageAudio.recitation} — English Meaning: ${currentPageAudio.english}`
        : currentPageAudio.recitation;

    const stopFn = speakAsBodhi(textToRecite, {
      lang: 'sa',
      onEnd: () => {
        setIsPlayingAudio(false);
        audioStopRef.current = null;
      },
    });
    audioStopRef.current = stopFn;
  }, [open, currentPageAudio, isPlayingAudio, stopAudio, audioMode]);

  const handlePlayWord = useCallback((sa: string) => {
    soundEffects.playStrokeChime();
    setActiveWord(sa);
    playPronunciation(sa);
    setTimeout(() => {
      setActiveWord((cur) => (cur === sa ? null : cur));
    }, 1200);
  }, []);

  const handleOpenAudioGuide = useCallback((b: Book, n: number) => {
    soundEffects.playStrokeChime();
    setOpen({ b, n });
    setTimeout(() => {
      stopAudio();
      const audio = getWorkbookPageAudio(b, n);
      setIsPlayingAudio(true);
      const stopFn = speakAsBodhi(audio.recitation, {
        lang: 'sa',
        onEnd: () => {
          setIsPlayingAudio(false);
          audioStopRef.current = null;
        },
      });
      audioStopRef.current = stopFn;
    }, 320);
  }, [stopAudio]);

  const activeShotLabel = open ? open.b.shots.find((x) => x.n === open.n)?.label : null;
  const isCurrentPageFree = open ? open.n <= FREE_PREVIEW_PAGE_LIMIT : false;
  const isOnlineViewAllowed = isCurrentPageFree || hasTwoWeekSub;
  const isWatermarkShown = Boolean(open && !isPaidMember && isOnlineViewAllowed);

  return (
    <div className="wbp-wrap" data-testid="workbook-previews">
      {BOOKS.map((b, bi) => (
        <React.Fragment key={b.id}>
        {b.group === 'grammar' && BOOKS[bi - 1]?.group !== 'grammar' && (
          <h4 className="wbp-group" data-testid="grammar-workbooks-heading">📚 Grammar Workbooks · व्याकरण-अभ्यास-पुस्तिकाः</h4>
        )}
        {b.group === 'nature' && BOOKS[bi - 1]?.group !== 'nature' && (
          <h4 className="wbp-group" data-testid="nature-workbooks-heading">🌳 Nature Workbooks · प्रकृति-अभ्यास-पुस्तिकाः</h4>
        )}
        <div className="wbp-card" style={{ borderColor: `${b.color}55` }} data-testid={`wbp-${b.id}`}>
          <div className="wbp-head">
            <div className="wbp-head-left">
              <button type="button" className="wbp-title" style={{ color: b.color }} onClick={() => setOpen({ b, n: 1 })}>
                {b.title}
              </button>
              <span className="wbp-meta">
                {b.pages} pages · {
                  isPaidMember
                    ? '✓ Full Online View & Printouts Unlocked'
                    : hasTwoWeekSub
                    ? '✓ Full Online View Active (2-Week Sub) · 🔒 Printouts Require Paid Plan'
                    : 'Pages 1–4 Free Preview · 🔒 2-Wk Sub for Pages 5+ · 🔒 Paid for Printouts'
                }
              </span>
            </div>
            <div className="wbp-head-right">
              <button
                type="button"
                className="wbp-mini-audio"
                style={{ color: b.color, borderColor: b.color }}
                onClick={() => handleOpenAudioGuide(b, b.shots[1]?.n || 1)}
                title={`Listen to spoken Sanskrit audio guide for ${b.title}`}
              >
                🎧 Audio Guide
              </button>
              {isPaidMember ? (
                <span className="wbp-unlocked-pill" title="Paid membership: full online view and vector printouts unlocked">
                  ✓ Paid Unlocked
                </span>
              ) : hasTwoWeekSub ? (
                <span className="wbp-trial-pill" title="2-Week Subscription: full online view active; paid membership required for printouts">
                  ✨ 2-Week Sub
                </span>
              ) : (
                <span className="wbp-lock-pill" title="Pages 1–4 free preview; 2-week subscription for full view; paid membership for printouts">
                  🔒 Pages 1–4 Free
                </span>
              )}
              <button
                type="button"
                className={`wbp-mini-dl${!isPaidMember ? ' is-locked' : ''}`}
                style={{ background: isPaidMember ? b.color : '#475569' }}
                onClick={() => downloadWorkbook(b.pdf)}
                data-testid={`wbp-dl-${b.id}`}
                title={isPaidMember ? `Download full printable ${b.title} PDF` : 'Paid membership required to download printable vector PDF'}
              >
                {isPaidMember ? '⬇ PDF' : '🔒 Printout PDF'}
              </button>
            </div>
          </div>
          <div className="wbp-row">
            {b.shots.map((s) => (
              <button
                key={s.n}
                type="button"
                className="wbp-thumb"
                onClick={() => setOpen({ b, n: s.n })}
                aria-label={`Preview ${b.title} page ${s.n}: ${s.label}`}
              >
                <div className="wbp-thumb-img-wrap">
                  <img src={thumb(b, s.n)} alt={`${s.label} page`} loading="lazy" decoding="async" width={300} height={424} />
                  {!isPaidMember && (
                    <span className="wbp-thumb-watermark-ribbon">
                      {s.n <= FREE_PREVIEW_PAGE_LIMIT
                        ? `FREE (p.${s.n})`
                        : hasTwoWeekSub
                        ? `2-WK SUB (p.${s.n})`
                        : `🔒 2-WK SUB (p.${s.n})`}
                    </span>
                  )}
                </div>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
        </React.Fragment>
      ))}
      {open && (
        <div className="wbp-lb" role="dialog" aria-modal="true" aria-label="Workbook preview" onClick={close}>
          <div className="wbp-lb-inner" onClick={(e) => e.stopPropagation()}>
            <div className="wbp-lb-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <b>
                  {open.b.title} · Page {open.n} of {open.b.pages}
                  {activeShotLabel ? ` · ${activeShotLabel}` : ''}
                </b>
                {isPaidMember ? (
                  <span className="wbp-mode-tag" style={{ background: '#dcfce7', color: '#15803d', borderColor: '#bbf7d0' }}>
                    ✓ Paid Member Access (Printouts &amp; Full View)
                  </span>
                ) : hasTwoWeekSub ? (
                  <span className="wbp-mode-tag" style={{ background: '#e0f2fe', color: '#0369a1', borderColor: '#bae6fd' }}>
                    ✨ 2-Week Subscription Active · 🔒 Printouts Require Paid Plan
                  </span>
                ) : isCurrentPageFree ? (
                  <span className="wbp-mode-tag" style={{ background: '#fef3c7', color: '#b45309', borderColor: '#fde68a' }}>
                    📖 Free Sample Preview (Page {open.n} of 4) · 🔒 Pages 5+ Require 2-Week Sub
                  </span>
                ) : (
                  <span className="wbp-mode-tag" style={{ background: '#fee2e2', color: '#b91c1c', borderColor: '#fca5a5' }}>
                    🔒 2-Week Subscription Required
                  </span>
                )}
              </div>
              <button type="button" className="wbp-x" onClick={close} aria-label="Close">✕</button>
            </div>

            {/* Interactive Workbook Audio Player Bar */}
            {currentPageAudio && (
              <div className="wbp-audio-player" style={{ borderColor: `${open.b.color}40` }}>
                <div className="wbp-audio-main">
                  <div className="wbp-audio-ctrls">
                    <button
                      type="button"
                      className={`wbp-audio-play-btn ${isPlayingAudio ? 'is-playing' : ''}`}
                      style={{ background: isPlayingAudio ? '#dc2626' : open.b.color }}
                      onClick={togglePageAudio}
                      aria-label={isPlayingAudio ? 'Stop audio recitation' : 'Listen audio recitation'}
                    >
                      {isPlayingAudio ? (
                        <>
                          <span aria-hidden="true">⏹</span>
                          <span>Stop Audio</span>
                        </>
                      ) : (
                        <>
                          <span aria-hidden="true">🎧</span>
                          <span>Listen Page Audio</span>
                        </>
                      )}
                    </button>

                    {isPlayingAudio && (
                      <div className="wbp-audio-wave" aria-hidden="true" title="Audio playing">
                        <span className="wbp-wave-bar" />
                        <span className="wbp-wave-bar" />
                        <span className="wbp-wave-bar" />
                        <span className="wbp-wave-bar" />
                      </div>
                    )}

                    <div className="wbp-audio-settings" role="group" aria-label="Audio language mode">
                      <button
                        type="button"
                        className={`wbp-audio-opt-btn ${audioMode === 'sa' ? 'is-active' : ''}`}
                        onClick={() => {
                          setAudioMode('sa');
                          if (isPlayingAudio) stopAudio();
                        }}
                        title="Recite Sanskrit verses and words"
                      >
                        Sanskrit
                      </button>
                      <button
                        type="button"
                        className={`wbp-audio-opt-btn ${audioMode === 'bilingual' ? 'is-active' : ''}`}
                        onClick={() => {
                          setAudioMode('bilingual');
                          if (isPlayingAudio) stopAudio();
                        }}
                        title="Recite Sanskrit followed by English explanation"
                      >
                        Bilingual
                      </button>
                    </div>
                  </div>

                  <div className="wbp-audio-text-summary">
                    <span className="wbp-audio-recite-sa">{currentPageAudio.recitation}</span>
                    <span className="wbp-audio-translit">{currentPageAudio.transliteration}</span>
                    <span className="wbp-audio-english">{currentPageAudio.english}</span>
                  </div>
                </div>

                {currentPageAudio.vocab.length > 0 && (
                  <div className="wbp-audio-vocab-row">
                    <span className="wbp-vocab-label">Tap to Hear Vocabulary:</span>
                    <div className="wbp-vocab-chips">
                      {currentPageAudio.vocab.map((v, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`wbp-vocab-chip ${activeWord === v.sa ? 'is-speaking' : ''}`}
                          onClick={() => handlePlayWord(v.sa)}
                          title={`Click to listen to pronunciation of ${v.sa} (${v.iast})`}
                        >
                          <span className="wbp-vocab-sa">{v.sa}</span>
                          <span className="wbp-vocab-iast">[{v.iast}]</span>
                          <span className="wbp-vocab-en">{v.en}</span>
                          <span className="wbp-vocab-speaker" aria-hidden="true">🔊</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="wbp-lb-stage">
              <button type="button" className="wbp-nav" onClick={() => step(-1)} aria-label="Previous page">‹</button>
              <div className="wbp-stage-container">
                <img
                  src={pageImg(open.b, open.n)}
                  alt={`${open.b.title} page ${open.n} (preview)`}
                  className={!isOnlineViewAllowed ? 'is-blurred' : ''}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />

                {/* Watermark overlay on open pages for non-paid users */}
                {isWatermarkShown && (
                  <div className="wbp-watermark-overlay" aria-hidden="true">
                    <div className="wbp-watermark-pattern">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="wbp-watermark-line">
                          {hasTwoWeekSub
                            ? 'EDNETLEARN · 2-WEEK SUBSCRIPTION PREVIEW · PRINTING REQUIRES PAID MEMBERSHIP'
                            : 'EDNETLEARN · FREE PREVIEW (PAGES 1–4) · PRINTING REQUIRES PAID SUBSCRIPTION'}
                        </div>
                      ))}
                    </div>
                    <div className="wbp-watermark-center">
                      {hasTwoWeekSub
                        ? '✨ 2-WEEK SUBSCRIPTION ONLINE VIEW · PRINTING REQUIRES PAID MEMBERSHIP'
                        : '🔒 FREE PREVIEW (PAGES 1–4) · 2-WEEK SUB FOR FULL VIEW · PAID FOR PRINTOUTS'}
                    </div>
                  </div>
                )}

                {/* Inactive / Locked Stage for pages 5+ when user does not have 2-week subscription */}
                {!isOnlineViewAllowed && (
                  <div className="wbp-locked-overlay">
                    <div className="wbp-locked-card">
                      <div className="wbp-locked-icon">🔒</div>
                      <h4 className="wbp-locked-title">Page {open.n} is Locked</h4>
                      <div className="wbp-locked-badge">2-Week Free Subscription Required</div>
                      <p className="wbp-locked-desc">
                        Pages 1 to 4 are open for free preview. To view all <b>{open.b.pages} pages</b> of <b>{open.b.title}</b> online, activate your <b>2-Week Free Subscription (Free Sign-Up)</b>.
                        High-resolution printable vector PDFs require a <b>Paid Membership</b>.
                      </p>
                      <div className="wbp-locked-perks">
                        <span>✓ Full Online Reading Access for All 7 Workbooks ({open.b.pages} pages)</span>
                        <span>✓ 14-Day Free Access to All Lessons, Readers &amp; Interactive Quizzes</span>
                        <span>✓ High-Resolution Vector Printable PDFs with Paid Membership</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                        {!currentUser ? (
                          <>
                            <button
                              type="button"
                              className="wbp-locked-cta-btn"
                              onClick={handleRegisterTrial}
                            >
                              ✨ Start 2-Week Free Subscription (Free Sign-Up)
                            </button>
                            <button
                              type="button"
                              className="wbp-locked-cta-secondary"
                              onClick={handlePaidUpgrade}
                            >
                              👑 Unlock Printouts with Paid Membership
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="wbp-locked-cta-btn"
                            onClick={handlePaidUpgrade}
                          >
                            👑 Upgrade to Paid Subscription (Printouts &amp; Full Access)
                          </button>
                        )}
                        <button
                          type="button"
                          className="wbp-locked-back-btn"
                          onClick={() => setOpen({ b: open.b, n: 1 })}
                        >
                          ‹ Back to Free Preview (Pages 1–4)
                        </button>
                      </div>
                      <div className="wbp-sample-jumps">
                        <span style={{ fontSize: '0.72rem', color: '#64748b', width: '100%', marginBottom: '0.2rem' }}>Free Sample Pages:</span>
                        {[1, 2, 3, 4].filter((p) => p <= open.b.pages).map((p) => (
                          <button
                            key={p}
                            type="button"
                            className={`wbp-shot-pill${open.n === p ? ' is-active' : ''}`}
                            onClick={() => setOpen({ b: open.b, n: p })}
                          >
                            Page {p}{p === 1 ? ' (Cover)' : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button type="button" className="wbp-nav" onClick={() => step(1)} aria-label="Next page">›</button>
            </div>

            <div className="wbp-lb-bot">
              <span style={{ fontSize: '0.8rem', color: '#475569' }}>
                {isPaidMember
                  ? `Full member access · Page ${open.n} of ${open.b.pages} · Printing & downloads unlocked`
                  : hasTwoWeekSub
                  ? `2-Week Subscription active · Page ${open.n} of ${open.b.pages} · Printable PDFs require Paid Plan`
                  : isCurrentPageFree
                  ? `Free sample preview · Page ${open.n} of 4 (Pages 5+ require 2-Week Free Subscription)`
                  : `🔒 Page ${open.n} of ${open.b.pages} · 2-Week Free Subscription required`}
              </span>
              <button
                type="button"
                className={`wbp-dl${!isPaidMember ? ' wbp-dl--unlock' : ''}`}
                style={isPaidMember ? { background: open.b.color } : undefined}
                onClick={() => {
                  if (!downloadWorkbook(open.b.pdf)) close();
                }}
                data-testid="wbp-lb-download"
              >
                {isPaidMember ? '⬇ Download / Print Vector PDF' : '👑 Unlock Printouts (Paid Membership)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkbookPreviews;
