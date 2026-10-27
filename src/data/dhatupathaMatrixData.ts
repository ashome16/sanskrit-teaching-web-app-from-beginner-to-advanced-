/**
 * Dhatupatha Matrix Connector Data
 * Interactive modular puzzle data connecting verbal roots (धातवः)
 * with Singular (-ति), Dual (-तः), and Plural (-न्ति) terminal blocks dynamically.
 */

export interface VerbConjugationBlock {
  affix: string;
  form: string;
  translit: string;
  meaning: string;
  pronoun: string;
}

export interface MatrixRootItem {
  id: string;
  root: string;
  baseTranslit: string;
  meaning: string;
  englishAction: string;
  gana: string;
  ganaNumber: number;
  stem: string;
  vikaran: string; // usually 'अ' (शप्) for Class 1 (भ्वादिगणः)
  padam: 'परस्मैपदम्' | 'आत्मनेपदम्' | 'उभयपदम्';
  prathama: {
    singular: VerbConjugationBlock; // -ति
    dual: VerbConjugationBlock;     // -तः
    plural: VerbConjugationBlock;   // -न्ति
  };
  madhyama: {
    singular: VerbConjugationBlock; // -सि
    dual: VerbConjugationBlock;     // -थः
    plural: VerbConjugationBlock;   // -थ
  };
  uttama: {
    singular: VerbConjugationBlock; // -मि
    dual: VerbConjugationBlock;     // -वः
    plural: VerbConjugationBlock;   // -मः
  };
  exampleSentences: {
    singular: { sanskrit: string; translit: string; english: string };
    dual: { sanskrit: string; translit: string; english: string };
    plural: { sanskrit: string; translit: string; english: string };
  };
  mnemonic: string;
}

export interface MatrixPuzzleChallenge {
  id: string;
  title: string;
  rootId: string;
  targetNumber: 'singular' | 'dual' | 'plural';
  targetPerson: 'prathama' | 'madhyama' | 'uttama';
  targetForm: string;
  prompt: string;
  subjectContext: string;
  hint: string;
  explanation: string;
}

export const MATRIX_ROOTS: MatrixRootItem[] = [
  {
    id: 'path',
    root: 'पठ्',
    baseTranslit: 'paṭh',
    meaning: 'पठनम् (To Read / Study)',
    englishAction: 'Read / Study',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'पठ',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'पठति', translit: 'paṭhati', meaning: 'reads / studies', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'पठतः', translit: 'paṭhataḥ', meaning: 'two read / study', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'पठन्ति', translit: 'paṭhanti', meaning: 'they read / study', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'पठसि', translit: 'paṭhasi', meaning: 'you read', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'पठथः', translit: 'paṭhathaḥ', meaning: 'you two read', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'पठथ', translit: 'paṭhatha', meaning: 'you all read', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'पठामि', translit: 'paṭhāmi', meaning: 'I read', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'पठावः', translit: 'paṭhāvaḥ', meaning: 'we two read', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'पठामः', translit: 'paṭhāmaḥ', meaning: 'we all read', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'बालकः पुस्तकं पठति।', translit: 'Bālakaḥ pustakaṁ paṭhati.', english: 'The boy reads the book.' },
      dual: { sanskrit: 'बालकौ पुस्तकं पठतः।', translit: 'Bālakau pustakaṁ paṭhataḥ.', english: 'The two boys read the book.' },
      plural: { sanskrit: 'बालकाः पुस्तकं पठन्ति।', translit: 'Bālakāḥ pustakaṁ paṭhanti.', english: 'The boys read the book.' },
    },
    mnemonic: 'पठ् + अ + ति = पठति (one reads); पठ् + अ + तः = पठतः (two read); पठ् + अ + न्ति = पठन्ति (many read).',
  },
  {
    id: 'dhav',
    root: 'धाव्',
    baseTranslit: 'dhāv',
    meaning: 'धावनम् (To Run)',
    englishAction: 'Run',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'धाव',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'धावति', translit: 'dhāvati', meaning: 'runs', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'धावतः', translit: 'dhāvataḥ', meaning: 'two run', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'धावन्ति', translit: 'dhāvanti', meaning: 'they run', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'धावसि', translit: 'dhāvasi', meaning: 'you run', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'धावथः', translit: 'dhāvathaḥ', meaning: 'you two run', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'धावथ', translit: 'dhāvatha', meaning: 'you all run', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'धावामि', translit: 'dhāvāmi', meaning: 'I run', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'धावावः', translit: 'dhāvāvaḥ', meaning: 'we two run', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'धावामः', translit: 'dhāvāmaḥ', meaning: 'we all run', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'अश्वः तीव्रेण धावति।', translit: 'Aśvaḥ tīvreṇa dhāvati.', english: 'The horse runs swiftly.' },
      dual: { sanskrit: 'अश्वौ तीव्रेण धावतः।', translit: 'Aśvau tīvreṇa dhāvataḥ.', english: 'The two horses run swiftly.' },
      plural: { sanskrit: 'अश्वाः तीव्रेण धावन्ति।', translit: 'Aśvāḥ tīvreṇa dhāvanti.', english: 'The horses run swiftly.' },
    },
    mnemonic: 'धाव् represents dynamic forward momentum: धावति (one runs), धावतः (pair), धावन्ति (herd).',
  },
  {
    id: 'gam',
    root: 'गम्',
    baseTranslit: 'gam (gacch)',
    meaning: 'गमनम् (To Go)',
    englishAction: 'Go',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'गच्छ',
    vikaran: 'अ (इषिगमिभ्यां च्छः)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'गच्छति', translit: 'gacchati', meaning: 'goes', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'गच्छतः', translit: 'gacchataḥ', meaning: 'two go', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'गच्छन्ति', translit: 'gacchanti', meaning: 'they go', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'गच्छसि', translit: 'gacchasi', meaning: 'you go', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'गच्छथः', translit: 'gacchathaḥ', meaning: 'you two go', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'गच्छथ', translit: 'gacchatha', meaning: 'you all go', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'गच्छामि', translit: 'gacchāmi', meaning: 'I go', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'गच्छावः', translit: 'gacchāvaḥ', meaning: 'we two go', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'गच्छामः', translit: 'gacchāmaḥ', meaning: 'we all go', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'छात्रा विद्यालयं गच्छति।', translit: 'Chātrā vidyālayaṁ gacchati.', english: 'The student goes to school.' },
      dual: { sanskrit: 'छात्रे विद्यालयं गच्छतः।', translit: 'Chātre vidyālayaṁ gacchataḥ.', english: 'The two students go to school.' },
      plural: { sanskrit: 'छात्राः विद्यालयं गच्छन्ति।', translit: 'Chātrāḥ vidyālayaṁ gacchanti.', english: 'The students go to school.' },
    },
    mnemonic: 'Special stem alteration: Root गम् morphs into stem गच्छ before sarvadhatuka affixes: गच्छति, गच्छतः, गच्छन्ति!',
  },
  {
    id: 'likh',
    root: 'लिख्',
    baseTranslit: 'likh',
    meaning: 'लेखनम् (To Write)',
    englishAction: 'Write',
    gana: 'तुदादिगणः',
    ganaNumber: 6,
    stem: 'लिख',
    vikaran: 'अ (श)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'लिखति', translit: 'likhati', meaning: 'writes', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'लिखतः', translit: 'likhataḥ', meaning: 'two write', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'लिखन्ति', translit: 'likhanti', meaning: 'they write', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'लिखसि', translit: 'likhasi', meaning: 'you write', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'लिखथः', translit: 'likhathaḥ', meaning: 'you two write', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'लिखथ', translit: 'likhatha', meaning: 'you all write', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'लिखामि', translit: 'likhāmi', meaning: 'I write', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'लिखावः', translit: 'likhāvaḥ', meaning: 'we two write', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'लिखामः', translit: 'likhāmaḥ', meaning: 'we all write', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'कविः श्लोकं लिखति।', translit: 'Kaviḥ ślokaṁ likhati.', english: 'The poet writes a shloka.' },
      dual: { sanskrit: 'कवी श्लोकं लिखतः।', translit: 'Kavī ślokaṁ likhataḥ.', english: 'The two poets write a shloka.' },
      plural: { sanskrit: 'कवयः श्लोकं लिखन्ति।', translit: 'Kavayaḥ ślokaṁ likhanti.', english: 'The poets write a shloka.' },
    },
    mnemonic: 'लिख् + ति = लिखति; लिख् + तः = लिखतः; लिख् + न्ति = लिखन्ति.',
  },
  {
    id: 'khad',
    root: 'खाद्',
    baseTranslit: 'khād',
    meaning: 'खादनम् (To Eat)',
    englishAction: 'Eat',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'खाद',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'खादति', translit: 'khādati', meaning: 'eats', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'खादतः', translit: 'khādataḥ', meaning: 'two eat', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'खादन्ति', translit: 'khādanti', meaning: 'they eat', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'खादसि', translit: 'khādasi', meaning: 'you eat', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'खादथः', translit: 'khādathaḥ', meaning: 'you two eat', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'खादथ', translit: 'khādatha', meaning: 'you all eat', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'खादामि', translit: 'khādāmi', meaning: 'I eat', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'खादावः', translit: 'khādāvaḥ', meaning: 'we two eat', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'खादामः', translit: 'khādāmaḥ', meaning: 'we all eat', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'वानरः फलं खादति।', translit: 'Vānaraḥ phalaṁ khādati.', english: 'The monkey eats the fruit.' },
      dual: { sanskrit: 'वानरौ फलं खादतः।', translit: 'Vānarau phalaṁ khādataḥ.', english: 'The two monkeys eat the fruit.' },
      plural: { sanskrit: 'वानराः फलं खादन्ति।', translit: 'Vānarāḥ phalaṁ khādanti.', english: 'The monkeys eat the fruit.' },
    },
    mnemonic: 'खाद् (nourishment): खादति (single eater), खादतः (pair enjoying fruit), खादन्ति (group banquet).',
  },
  {
    id: 'pa',
    root: 'पा',
    baseTranslit: 'pā (pib)',
    meaning: 'पानम् (To Drink)',
    englishAction: 'Drink',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'पिब',
    vikaran: 'अ (पाघ्राध्मास्था... पिबादेशः)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'पिबति', translit: 'pibati', meaning: 'drinks', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'पिबतः', translit: 'pibataḥ', meaning: 'two drink', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'पिबन्ति', translit: 'pibanti', meaning: 'they drink', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'पिबसि', translit: 'pibasi', meaning: 'you drink', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'पिबथः', translit: 'pibathaḥ', meaning: 'you two drink', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'पिबथ', translit: 'pibatha', meaning: 'you all drink', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'पिबामि', translit: 'pibāmi', meaning: 'I drink', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'पिबावः', translit: 'pibāvaḥ', meaning: 'we two drink', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'पिबामः', translit: 'pibāmaḥ', meaning: 'we all drink', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'धेनुः जलं पिबति।', translit: 'Dhenuḥ jalaṁ pibati.', english: 'The cow drinks water.' },
      dual: { sanskrit: 'धेनू जलं पिबतः।', translit: 'Dhenū jalaṁ pibataḥ.', english: 'The two cows drink water.' },
      plural: { sanskrit: 'धेनवः जलं पिबन्ति।', translit: 'Dhenavaḥ jalaṁ pibanti.', english: 'The cows drink water.' },
    },
    mnemonic: 'Pāṇinian stem rule: Root पा becomes पिब in present tense: पिबति, पिबतः, पिबन्ति!',
  },
  {
    id: 'has',
    root: 'हस्',
    baseTranslit: 'has',
    meaning: 'हसनम् (To Laugh)',
    englishAction: 'Laugh',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'हस',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'हसति', translit: 'hasati', meaning: 'laughs', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'हसतः', translit: 'hasataḥ', meaning: 'two laugh', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'हसन्ति', translit: 'hasanti', meaning: 'they laugh', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'हससि', translit: 'hasasi', meaning: 'you laugh', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'हसथः', translit: 'hasathaḥ', meaning: 'you two laugh', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'हसथ', translit: 'hasatha', meaning: 'you all laugh', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'हसामि', translit: 'hasāmi', meaning: 'I laugh', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'हसावः', translit: 'hasāvaḥ', meaning: 'we two laugh', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'हसामः', translit: 'hasāmaḥ', meaning: 'we all laugh', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'शिशुः आनन्देन हसति।', translit: 'Śiśuḥ ānandena hasati.', english: 'The infant laughs with joy.' },
      dual: { sanskrit: 'शिशू आनन्देन हसतः।', translit: 'Śiśū ānandena hasataḥ.', english: 'The two infants laugh with joy.' },
      plural: { sanskrit: 'शिशवः आनन्देन हसन्ति।', translit: 'Śiśavaḥ ānandena hasanti.', english: 'The infants laugh with joy.' },
    },
    mnemonic: 'हस्: हसति (one laughs), हसतः (two chuckle together), हसन्ति (burst of laughter all around).',
  },
  {
    id: 'nam',
    root: 'नम्',
    baseTranslit: 'nam',
    meaning: 'नमनम् (To Bow / Revere)',
    englishAction: 'Bow / Revere',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'नम',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'नमति', translit: 'namati', meaning: 'bows / reveres', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'नमतः', translit: 'namataḥ', meaning: 'two bow / revere', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'नमन्ति', translit: 'namanti', meaning: 'they bow / revere', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'नमसि', translit: 'namasi', meaning: 'you bow', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'नमथः', translit: 'namathaḥ', meaning: 'you two bow', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'नमथ', translit: 'namatha', meaning: 'you all bow', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'नमामि', translit: 'namāmi', meaning: 'I bow', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'नमावः', translit: 'namāvaḥ', meaning: 'we two bow', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'नमामः', translit: 'namāmaḥ', meaning: 'we all bow', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'भक्तः ईश्वरं नमति।', translit: 'Bhaktaḥ īśvaraṁ namati.', english: 'The devotee bows to the Divine.' },
      dual: { sanskrit: 'भक्तौ ईश्वरं नमतः।', translit: 'Bhaktau īśvaraṁ namataḥ.', english: 'The two devotees bow to the Divine.' },
      plural: { sanskrit: 'भक्ताः ईश्वरं नमन्ति।', translit: 'Bhaktāḥ īśvaraṁ namanti.', english: 'The devotees bow to the Divine.' },
    },
    mnemonic: 'नम् (Namaste): नमति, नमतः, नमन्ति.',
  },
  {
    id: 'stha',
    root: 'स्था',
    baseTranslit: 'sthā (tiṣṭh)',
    meaning: 'स्थानम् / स्थितिः (To Stand / Stay)',
    englishAction: 'Stand / Stay',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'तिष्ठ',
    vikaran: 'अ (पाघ्राध्मास्था... तिष्ठादेशः)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'तिष्ठति', translit: 'tiṣṭhati', meaning: 'stands / stays', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'तिष्ठतः', translit: 'tiṣṭhataḥ', meaning: 'two stand / stay', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'तिष्ठन्ति', translit: 'tiṣṭhanti', meaning: 'they stand / stay', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'तिष्ठसि', translit: 'tiṣṭhasi', meaning: 'you stand', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'तिष्ठथः', translit: 'tiṣṭhathaḥ', meaning: 'you two stand', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'तिष्ठथ', translit: 'tiṣṭhatha', meaning: 'you all stand', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'तिष्ठामि', translit: 'tiṣṭhāmi', meaning: 'I stand', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'तिष्ठावः', translit: 'tiṣṭhāvaḥ', meaning: 'we two stand', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'तिष्ठामः', translit: 'tiṣṭhāmaḥ', meaning: 'we all stand', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'वृक्षः मार्गे तिष्ठति।', translit: 'Vṛkṣaḥ mārge tiṣṭhati.', english: 'The tree stands by the road.' },
      dual: { sanskrit: 'वृक्षौ मार्गे तिष्ठतः।', translit: 'Vṛkṣau mārge tiṣṭhataḥ.', english: 'The two trees stand by the road.' },
      plural: { sanskrit: 'वृक्षाः मार्गे तिष्ठन्ति।', translit: 'Vṛkṣāḥ mārge tiṣṭhanti.', english: 'The trees stand by the road.' },
    },
    mnemonic: 'स्था root transforms to तिष्ठ in present tense: तिष्ठति, तिष्ठतः, तिष्ठन्ति.',
  },
  {
    id: 'drsh',
    root: 'दृश्',
    baseTranslit: 'dṛś (paśy)',
    meaning: 'दर्शनम् (To See / Look)',
    englishAction: 'See / Look',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'पश्य',
    vikaran: 'अ (पाघ्राध्मादृश्... पश्यादेशः)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'पश्यति', translit: 'paśyati', meaning: 'sees / looks', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'पश्यतः', translit: 'paśyataḥ', meaning: 'two see', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'पश्यन्ति', translit: 'paśyanti', meaning: 'they see', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'पश्यसि', translit: 'paśyasi', meaning: 'you see', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'पश्यथः', translit: 'paśyathaḥ', meaning: 'you two see', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'पश्यथ', translit: 'paśyatha', meaning: 'you all see', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'पश्यामि', translit: 'paśyāmi', meaning: 'I see', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'पश्यावः', translit: 'paśyāvaḥ', meaning: 'we two see', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'पश्यामः', translit: 'paśyāmaḥ', meaning: 'we all see', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'बालकः चन्द्रं पश्यति।', translit: 'Bālakaḥ candraṁ paśyati.', english: 'The boy sees the moon.' },
      dual: { sanskrit: 'बालकौ चन्द्रं पश्यतः।', translit: 'Bālakau candraṁ paśyataḥ.', english: 'The two boys see the moon.' },
      plural: { sanskrit: 'बालकाः चन्द्रं पश्यन्ति।', translit: 'Bālakāḥ candraṁ paśyanti.', english: 'The boys see the moon.' },
    },
    mnemonic: 'दृश् morphs to पश्य: पश्यति (one observes), पश्यतः (two gaze), पश्यन्ति (all behold).',
  },
  {
    id: 'bhu',
    root: 'भू',
    baseTranslit: 'bhū (bhav)',
    meaning: 'सत्ता / भवनम् (To Be / Become)',
    englishAction: 'Be / Become',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'भव',
    vikaran: 'अ (शप्, गुणे अवादेशः)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'भवति', translit: 'bhavati', meaning: 'becomes / is', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'भवतः', translit: 'bhavataḥ', meaning: 'two become / are', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'भवन्ति', translit: 'bhavanti', meaning: 'they become / are', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'भवसि', translit: 'bhavasi', meaning: 'you become', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'भवथः', translit: 'bhavathaḥ', meaning: 'you two become', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'भवथ', translit: 'bhavatha', meaning: 'you all become', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'भवामि', translit: 'bhavāmi', meaning: 'I become', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'भवावः', translit: 'bhavāvaḥ', meaning: 'we two become', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'भवामः', translit: 'bhavāmaḥ', meaning: 'we all become', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'सत्येन मनः शुद्धं भवति।', translit: 'Satyena manaḥ śuddhaṁ bhavati.', english: 'Mind becomes purified through truth.' },
      dual: { sanskrit: 'तौ छात्रौ कुशलौ भवतः।', translit: 'Tau chātrau kuśalau bhavataḥ.', english: 'Those two students become skilled.' },
      plural: { sanskrit: 'सर्वे मानवाः सुखी भवन्ति।', translit: 'Sarve mānavāḥ sukhī bhavanti.', english: 'May all beings be happy.' },
    },
    mnemonic: 'The fountainhead of verbs: भू $\\rightarrow$ भो + अ $\\rightarrow$ भव + ति/तः/न्ति $\\rightarrow$ भवति, भवतः, भवन्ति!',
  },
  {
    id: 'krid',
    root: 'क्रीड्',
    baseTranslit: 'krīḍ',
    meaning: 'क्रीडनम् (To Play)',
    englishAction: 'Play',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'क्रीड',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'क्रीडति', translit: 'krīḍati', meaning: 'plays', pronoun: 'सः / सा / तत्' },
      dual: { affix: '-तः', form: 'क्रीडतः', translit: 'krīḍataḥ', meaning: 'two play', pronoun: 'तौ / ते' },
      plural: { affix: '-न्ति', form: 'क्रीडन्ति', translit: 'krīḍanti', meaning: 'they play', pronoun: 'ते / ताः / तानि' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'क्रीडसि', translit: 'krīḍasi', meaning: 'you play', pronoun: 'त्वम्' },
      dual: { affix: '-थः', form: 'क्रीडथः', translit: 'krīḍathaḥ', meaning: 'you two play', pronoun: 'युवाम्' },
      plural: { affix: '-थ', form: 'क्रीडथ', translit: 'krīḍatha', meaning: 'you all play', pronoun: 'यूयम्' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'क्रीडामि', translit: 'krīḍāmi', meaning: 'I play', pronoun: 'अहम्' },
      dual: { affix: '-वः', form: 'क्रीडावः', translit: 'krīḍāvaḥ', meaning: 'we two play', pronoun: 'आवाम्' },
      plural: { affix: '-मः', form: 'क्रीडामः', translit: 'krīḍāmaḥ', meaning: 'we all play', pronoun: 'वयम्' },
    },
    exampleSentences: {
      singular: { sanskrit: 'बालकः कन्दुकेन क्रीडति।', translit: 'Bālakaḥ kandukena krīḍati.', english: 'The boy plays with the ball.' },
      dual: { sanskrit: 'बालकौ कन्दुकेन क्रीडतः।', translit: 'Bālakau kandukena krīḍataḥ.', english: 'The two boys play with the ball.' },
      plural: { sanskrit: 'बालकाः कन्दुकेन क्रीडन्ति।', translit: 'Bālakāḥ kandukena krīḍanti.', english: 'The boys play with the ball.' },
    },
    mnemonic: 'क्रीड् (sports & games): क्रीडति, क्रीडतः, क्रीडन्ति.',
  },
];

export const MATRIX_PUZZLE_CHALLENGES: MatrixPuzzleChallenge[] = [
  {
    id: 'ch-1',
    title: 'Dual Runner (द्विवचनम् धावनम्)',
    rootId: 'dhav',
    targetNumber: 'dual',
    targetPerson: 'prathama',
    targetForm: 'धावतः',
    prompt: 'Two energetic horses dash across the meadow. Connect the root धाव् with the correct terminal block to forge the Dual (द्विवचनम्) verb form.',
    subjectContext: 'अश्वौ तीव्रेण ______।',
    hint: 'Dual termination in Third Person is always -तः (Aśvau dhāvataḥ).',
    explanation: 'धाव् (root) + अ (stem) + तः (dual termination) = धावतः (Two run).',
  },
  {
    id: 'ch-2',
    title: 'Plural Scholars (बहुवचनम् पठनम्)',
    rootId: 'path',
    targetNumber: 'plural',
    targetPerson: 'prathama',
    targetForm: 'पठन्ति',
    prompt: 'All students are reciting Vedas together in Gurukul. Connect पठ् with the terminal block for Plural (बहुवचनम्).',
    subjectContext: 'छात्राः वेदान् ______।',
    hint: 'Plural termination in Third Person is -न्ति (Chātrāḥ paṭhanti).',
    explanation: 'पठ् + अ + न्ति = पठन्ति (They all read / study).',
  },
  {
    id: 'ch-3',
    title: 'Singular Scribe (एकवचनम् लेखनम्)',
    rootId: 'likh',
    targetNumber: 'singular',
    targetPerson: 'prathama',
    targetForm: 'लिखति',
    prompt: 'The sage sits in contemplation writing a palm-leaf letter. Connect लिख् with the Singular (एकवचनम्) terminal block.',
    subjectContext: 'ऋषिः पत्रं ______।',
    hint: 'Singular termination in Third Person is -ति (Ṛṣiḥ likhati).',
    explanation: 'लिख् + अ + ति = लिखति (He writes).',
  },
  {
    id: 'ch-4',
    title: 'Dual Travelers (द्विवचनम् गमनम्)',
    rootId: 'gam',
    targetNumber: 'dual',
    targetPerson: 'prathama',
    targetForm: 'गच्छतः',
    prompt: 'Two travelers are walking peacefully toward the holy river. Connect the root गम् (गच्छ्) with the Dual (द्विवचनम्) terminal block.',
    subjectContext: 'पथिकौ नदीं ______।',
    hint: 'Root गम् becomes गच्छ; dual termination is -तः (Pathikau gacchataḥ).',
    explanation: 'गम् (गच्छ्) + अ + तः = गच्छतः (Those two go).',
  },
  {
    id: 'ch-5',
    title: 'Plural Feast (बहुवचनम् खादनम्)',
    rootId: 'khad',
    targetNumber: 'plural',
    targetPerson: 'prathama',
    targetForm: 'खादन्ति',
    prompt: 'A cheerful troop of monkeys feast on ripe sweet mangoes. Connect खाद् with the Plural (बहुवचनम्) terminal block.',
    subjectContext: 'वानराः फलानि ______।',
    hint: 'Plural termination in Third Person is -न्ति (Vānarāḥ khādanti).',
    explanation: 'खाद् + अ + न्ति = खादन्ति (They eat).',
  },
  {
    id: 'ch-6',
    title: 'Singular Quench (एकवचनम् पानम्)',
    rootId: 'pa',
    targetNumber: 'singular',
    targetPerson: 'prathama',
    targetForm: 'पिबति',
    prompt: 'The thirsty deer drinks clear crystal water from the mountain spring. Connect पा (पिब्) with the Singular terminal block.',
    subjectContext: 'मृगः जलं ______।',
    hint: 'Root पा transforms to पिब in present tense: पिब + ति = पिबति.',
    explanation: 'पा (पिब्) + अ + ति = पिबति (The deer drinks).',
  },
  {
    id: 'ch-7',
    title: 'Dual Gazers (द्विवचनम् दर्शनम्)',
    rootId: 'drsh',
    targetNumber: 'dual',
    targetPerson: 'prathama',
    targetForm: 'पश्यतः',
    prompt: 'Two curious children look up at the full moon in wonder. Connect दृश् (पश्य्) with the Dual (द्विवचनम्) terminal block.',
    subjectContext: 'बालकौ चन्द्रं ______।',
    hint: 'Root दृश् becomes stem पश्य; dual termination is -तः (Paśyataḥ).',
    explanation: 'दृश् (पश्य्) + अ + तः = पश्यतः (Those two look / see).',
  },
  {
    id: 'ch-8',
    title: 'Plural Players (बहुवचनम् क्रीडनम्)',
    rootId: 'krid',
    targetNumber: 'plural',
    targetPerson: 'prathama',
    targetForm: 'क्रीडन्ति',
    prompt: 'Children run laughing across the courtyard playing with the ball. Connect क्रीड् with the Plural terminal block.',
    subjectContext: 'बालकाः प्राङ्गणे ______।',
    hint: 'Plural termination is -न्ति (Bālakāḥ krīḍanti).',
    explanation: 'क्रीड् + अ + न्ति = क्रीडन्ति (Children play).',
  },
  {
    id: 'ch-9',
    title: 'Dual Reverence (द्विवचनम् नमनम्)',
    rootId: 'nam',
    targetNumber: 'dual',
    targetPerson: 'prathama',
    targetForm: 'नमतः',
    prompt: 'Two sincere disciples bow with folded palms before the Guru. Connect नम् with the Dual (द्विवचनम्) terminal block.',
    subjectContext: 'शिष्यौ गुरुं ______।',
    hint: 'Dual termination is -तः (Śiṣyau namataḥ).',
    explanation: 'नम् + अ + तः = नमतः (Those two bow).',
  },
  {
    id: 'ch-10',
    title: 'Universal Well-being (बहुवचनम् भवनम्)',
    rootId: 'bhu',
    targetNumber: 'plural',
    targetPerson: 'prathama',
    targetForm: 'भवन्ति',
    prompt: 'In the great Vedic benediction "सर्वे भवन्तु सुखिनः", forge the plural indicative form of root भू (भव्).',
    subjectContext: 'सर्वे मानवाः प्रसन्नाः ______।',
    hint: 'Root भू becomes भव; plural termination is -न्ति (Bhavanti).',
    explanation: 'भू (भव्) + अ + न्ति = भवन्ति (They become / are).',
  },
];
