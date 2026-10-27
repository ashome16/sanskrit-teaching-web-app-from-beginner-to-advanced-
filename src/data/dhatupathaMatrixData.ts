/**
 * Dhatupatha Matrix Connector Data
 * Interactive modular puzzle data connecting verbal roots (धातवः)
 * with Singular (-ति / -ते), Dual (-तः / -एते), and Plural (-न्ति / -न्ते) terminal blocks dynamically.
 * Features comprehensive Tamil (தமிழ்) and Malayalam (മലയാളം) multilingual explanations.
 */

export interface VerbConjugationBlock {
  affix: string;
  form: string;
  translit: string;
  meaning: string;
  pronoun: string;
  sentence: string;
}

export interface MatrixRootItem {
  id: string;
  root: string;
  baseTranslit: string;
  subjectNoun: string;
  subjectNounTamil: string;
  subjectNounMalayalam: string;
  meaning: string;
  meaningTamil: string;
  meaningMalayalam: string;
  englishAction: string;
  gana: string;
  ganaNumber: number;
  stem: string;
  vikaran: string;
  padam: 'परस्मैपदम्' | 'आत्मनेपदम्' | 'उभयपदम्';
  prathama: {
    singular: VerbConjugationBlock;
    dual: VerbConjugationBlock;
    plural: VerbConjugationBlock;
  };
  madhyama: {
    singular: VerbConjugationBlock;
    dual: VerbConjugationBlock;
    plural: VerbConjugationBlock;
  };
  uttama: {
    singular: VerbConjugationBlock;
    dual: VerbConjugationBlock;
    plural: VerbConjugationBlock;
  };
  targetSentence: {
    number: 'singular' | 'dual' | 'plural';
    person: 'prathama' | 'madhyama' | 'uttama';
    sanskrit: string;
    translit: string;
    english: string;
    tamil: string;
    malayalam: string;
  };
  mnemonic: string;
}

export interface MatrixPuzzleChallenge {
  id: string;
  challengeNumber: number;
  title: string;
  rootId: string;
  subjectNoun: string;
  rootSymbol: string;
  targetNumber: 'singular' | 'dual' | 'plural';
  targetPerson: 'prathama' | 'madhyama' | 'uttama';
  targetForm: string;
  targetSentence: string;
  prompt: string;
  promptTamil: string;
  promptMalayalam: string;
  subjectContext: string;
  meaning: string;
  meaningTamil: string;
  meaningMalayalam: string;
  hint: string;
  hintTamil: string;
  hintMalayalam: string;
  explanation: string;
  explanationTamil: string;
  explanationMalayalam: string;
  options: {
    number: 'singular' | 'dual' | 'plural';
    affix: string;
    sentence: string;
  }[];
}

export const MATRIX_ROOTS: MatrixRootItem[] = [
  // 1. सिंह + गर्ज् (1P)
  {
    id: 'garj',
    root: 'गर्ज्',
    baseTranslit: 'garj',
    subjectNoun: 'सिंह (Lion)',
    subjectNounTamil: 'சிங்கம் (Lion)',
    subjectNounMalayalam: 'സിംഹം (Lion)',
    meaning: 'गर्जनम् (To Roar)',
    meaningTamil: 'கர்ஜித்தல் (Roar)',
    meaningMalayalam: 'ഗർജ്ജനം (Roar)',
    englishAction: 'Roar',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'गर्ज',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'गर्जति', translit: 'garjati', meaning: 'roars', pronoun: 'सिंहः', sentence: 'सिंहः गर्जति' },
      dual: { affix: '-तः', form: 'गर्जतः', translit: 'garjataḥ', meaning: 'two roar', pronoun: 'सिंहौ', sentence: 'सिंहौ गर्जतः' },
      plural: { affix: '-न्ति', form: 'गर्जन्ति', translit: 'garjanti', meaning: 'they roar', pronoun: 'सिंहाः', sentence: 'सिंहाः गर्जन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'गर्जसि', translit: 'garjasi', meaning: 'you roar', pronoun: 'त्वम्', sentence: 'त्वं गर्जसि' },
      dual: { affix: '-थः', form: 'गर्जथः', translit: 'garjathaḥ', meaning: 'you two roar', pronoun: 'युवाम्', sentence: 'युवां गर्जथः' },
      plural: { affix: '-थ', form: 'गर्जथ', translit: 'garjatha', meaning: 'you all roar', pronoun: 'यूयम्', sentence: 'यूयं गर्जथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'गर्जामि', translit: 'garjāmi', meaning: 'I roar', pronoun: 'अहम्', sentence: 'अहं गर्जामि' },
      dual: { affix: '-वः', form: 'गर्जावः', translit: 'garjāvaḥ', meaning: 'we two roar', pronoun: 'आवाम्', sentence: 'आवां गर्जावः' },
      plural: { affix: '-मः', form: 'गर्जheadामः', translit: 'garjāmaḥ', meaning: 'we all roar', pronoun: 'वयम्', sentence: 'वयं गर्जामः' },
    },
    targetSentence: {
      number: 'singular',
      person: 'prathama',
      sanskrit: 'सिंहः गर्जति',
      translit: 'Siṁhaḥ garjati',
      english: 'The lion roars.',
      tamil: 'சிங்கம் கர்ஜிக்கிறது.',
      malayalam: 'സിംഹം ഗർജ്ജിക്കുന്നു.',
    },
    mnemonic: 'सिंहः गर्जति (ஒரு சிங்கம் / ഒരു സിംഹം); सिंहौ गर्जतः (இரு சிங்கங்கள் / രണ്ട് സിംഹങ്ങൾ); सिंहाः गर्जन्ति (பல சிங்கங்கள் / സിംഹങ്ങൾ).',
  },

  // 2. सूर्य + तप् (1P)
  {
    id: 'tap',
    root: 'तप्',
    baseTranslit: 'tap',
    subjectNoun: 'सूर्य (Sun)',
    subjectNounTamil: 'சூரியன் (Sun)',
    subjectNounMalayalam: 'സൂര്യൻ (Sun)',
    meaning: 'तापनम् (To Shine / Burn / Heat)',
    meaningTamil: 'தபித்தல் / ஒளிர்ந்தல் (Shine / Heat)',
    meaningMalayalam: 'പ്രകാശിക്കുക / തപിക്കുക (Shine / Heat)',
    englishAction: 'Shine / Burn',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'तप',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'तपति', translit: 'tapati', meaning: 'shines / heats', pronoun: 'सूर्यः', sentence: 'सूर्यः तपति' },
      dual: { affix: '-तः', form: 'तपतः', translit: 'tapataḥ', meaning: 'two shine / heat', pronoun: 'सूर्यौ', sentence: 'सूर्यौ तपतः' },
      plural: { affix: '-न्ति', form: 'तपन्ति', translit: 'tapanti', meaning: 'they shine / heat', pronoun: 'सूर्याः', sentence: 'सूर्याः तपन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'तपसि', translit: 'tapasi', meaning: 'you burn', pronoun: 'त्वम्', sentence: 'त्वं तपसि' },
      dual: { affix: '-थः', form: 'तपथः', translit: 'tapathaḥ', meaning: 'you two burn', pronoun: 'युवाम्', sentence: 'युवां तपथः' },
      plural: { affix: '-थ', form: 'तपथ', translit: 'tapatha', meaning: 'you all burn', pronoun: 'यूयम्', sentence: 'यूयं तपथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'तपामि', translit: 'tapāmi', meaning: 'I burn / shine', pronoun: 'अहम्', sentence: 'अहं तपामि' },
      dual: { affix: '-वः', form: 'तपावः', translit: 'tapāvaḥ', meaning: 'we two shine', pronoun: 'आवाम्', sentence: 'आवां तपावः' },
      plural: { affix: '-मः', form: 'तपामः', translit: 'tapāmaḥ', meaning: 'we all shine', pronoun: 'वयम्', sentence: 'वयं तपामः' },
    },
    targetSentence: {
      number: 'dual',
      person: 'prathama',
      sanskrit: 'सूर्यौ तपतः',
      translit: 'Sūryau tapataḥ',
      english: 'Two suns shine/burn.',
      tamil: 'இரு சூரியர்கள் தபிக்கிறார்கள் / ஒளிர்கிறார்கள்.',
      malayalam: 'രണ്ട് സൂര്യന്മാർ പ്രകാശിക്കുന്നു / തപിക്കുന്നു.',
    },
    mnemonic: 'தப் (சூரிய வெப்பம்): சூரியர்கள் இருவர் = सूर्यौ तपतः.',
  },

  // 3. मेघ + वर्ष् (1P)
  {
    id: 'varsh',
    root: 'वर्ष्',
    baseTranslit: 'varṣ',
    subjectNoun: 'मेघ (Cloud)',
    subjectNounTamil: 'மேகம் (Cloud)',
    subjectNounMalayalam: 'മേഘം (Cloud)',
    meaning: 'वर्षणम् (To Rain)',
    meaningTamil: 'மழை பொழிதல் (Rain)',
    meaningMalayalam: 'വർഷിക്കുക / പെയ്യുക (Rain)',
    englishAction: 'Rain',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'वर्ष',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'वर्षति', translit: 'varṣati', meaning: 'rains', pronoun: 'मेघः', sentence: 'वर्षति मेघः' },
      dual: { affix: '-तः', form: 'वर्षतः', translit: 'varṣataḥ', meaning: 'two rain', pronoun: 'मेघौ', sentence: 'वर्षतः मेघौ' },
      plural: { affix: '-न्ति', form: 'वर्षन्ति', translit: 'varṣanti', meaning: 'they rain', pronoun: 'मेघाः', sentence: 'वर्षन्ति मेघाः' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'वर्षसि', translit: 'varṣasi', meaning: 'you rain', pronoun: 'त्वम्', sentence: 'त्वं वर्षसि' },
      dual: { affix: '-थः', form: 'वर्षथः', translit: 'varṣathaḥ', meaning: 'you two rain', pronoun: 'युवाम्', sentence: 'युवां वर्षथः' },
      plural: { affix: '-थ', form: 'वर्षथ', translit: 'varṣatha', meaning: 'you all rain', pronoun: 'यूयम्', sentence: 'यूयं वर्षथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'वर्षामि', translit: 'varṣāmi', meaning: 'I rain', pronoun: 'अहम्', sentence: 'अहं वर्षामि' },
      dual: { affix: '-वः', form: 'वर्षावः', translit: 'varṣāvaḥ', meaning: 'we two rain', pronoun: 'आवाम्', sentence: 'आवां वर्षावः' },
      plural: { affix: '-मः', form: 'वर्षामः', translit: 'varṣāmaḥ', meaning: 'we all rain', pronoun: 'वयम्', sentence: 'वयं वर्षामः' },
    },
    targetSentence: {
      number: 'plural',
      person: 'prathama',
      sanskrit: 'वर्षन्ति मेघाः',
      translit: 'Varṣanti meghāḥ',
      english: 'The clouds rain.',
      tamil: 'மேகங்கள் மழை பொழிகின்றன.',
      malayalam: 'മേഘങ്ങൾ വർഷിക്കുന്നു / പെയ്യുന്നു.',
    },
    mnemonic: 'வர்ஷ் (மழை): மேகங்கள் பல = वर्षन्ति मेघाः.',
  },

  // 4. चोर + मुष् (9P)
  {
    id: 'mush',
    root: 'मुष्',
    baseTranslit: 'muṣ',
    subjectNoun: 'चोर (Thief)',
    subjectNounTamil: 'திருடன் (Thief)',
    subjectNounMalayalam: 'കള്ളൻ (Thief)',
    meaning: 'स्तेयनम् (To Steal / Rob)',
    meaningTamil: 'திருடுதல் (Steal)',
    meaningMalayalam: 'മോഷണം (Steal)',
    englishAction: 'Steal / Rob',
    gana: 'क्र्यादिगणः',
    ganaNumber: 9,
    stem: 'मुष्',
    vikaran: 'ना (श्ना)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-नाति', form: 'मुष्णाति', translit: 'muṣṇāti', meaning: 'steals', pronoun: 'चोरः', sentence: 'चोरः मुष्णाति' },
      dual: { affix: '-नीतः', form: 'मुष्णीतः', translit: 'muṣṇītaḥ', meaning: 'two steal', pronoun: 'चोरौ', sentence: 'चोरौ मुष्णीतः' },
      plural: { affix: '-नन्ति', form: 'मुष्णन्ति', translit: 'muṣṇanti', meaning: 'they steal', pronoun: 'चोराः', sentence: 'चोराः मुष्णन्ति' },
    },
    madhyama: {
      singular: { affix: '-नासि', form: 'मुष्णासि', translit: 'muṣṇāsi', meaning: 'you steal', pronoun: 'त्वम्', sentence: 'त्वं मुष्णासि' },
      dual: { affix: '-नीथः', form: 'मुष्णीथः', translit: 'muṣṇīthaḥ', meaning: 'you two steal', pronoun: 'युवाम्', sentence: 'युवां मुष्णीथः' },
      plural: { affix: '-नीथ', form: 'मुष्णीथ', translit: 'muṣṇītha', meaning: 'you all steal', pronoun: 'यूयम्', sentence: 'यूयं मुष्णीथ' },
    },
    uttama: {
      singular: { affix: '-नामि', form: 'मुष्णामि', translit: 'muṣṇāmi', meaning: 'I steal', pronoun: 'अहम्', sentence: 'अहं मुष्णामि' },
      dual: { affix: '-नीवः', form: 'मुष्णीवः', translit: 'muṣṇīvaḥ', meaning: 'we two steal', pronoun: 'आवाम्', sentence: 'आवां मुष्णीवः' },
      plural: { affix: '-नीमः', form: 'मुष्णीमः', translit: 'muṣṇīmaḥ', meaning: 'we all steal', pronoun: 'वयम्', sentence: 'वयं मुष्णीमः' },
    },
    targetSentence: {
      number: 'plural',
      person: 'prathama',
      sanskrit: 'चोराः मुष्णन्ति',
      translit: 'Chorāḥ muṣṇanti',
      english: 'The thieves steal.',
      tamil: 'திருடர்கள் திருடுகிறார்கள்.',
      malayalam: 'കള്ളന്മാർ മോഷ്ടിക്കുന്നു.',
    },
    mnemonic: 'मुष् (9th class): திருடர்கள் பல = चोराः मुष्णन्ति.',
  },

  // 5. सुत + जृ (1P / 4P)
  {
    id: 'jri',
    root: 'जृ',
    baseTranslit: 'jṝ',
    subjectNoun: 'सुत (Son)',
    subjectNounTamil: 'மகன் (Son)',
    subjectNounMalayalam: 'മകൻ (Son)',
    meaning: 'वयोहानिः (To Grow Old / Age)',
    meaningTamil: 'முதிர்ச்சி அடைதல் (Grow old)',
    meaningMalayalam: 'വാർദ്ധക്യം പ്രാപിക്കുക (Grow old)',
    englishAction: 'Grow Old / Age',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'जर',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'जरति', translit: 'jarati', meaning: 'grows old', pronoun: 'सुतः', sentence: 'सुतः जरति' },
      dual: { affix: '-तः', form: 'जरतः', translit: 'jarataḥ', meaning: 'two grow old', pronoun: 'सुतौ', sentence: 'सुतौ जरतः' },
      plural: { affix: '-न्ति', form: 'जरन्ति', translit: 'jaranti', meaning: 'they grow old', pronoun: 'सुताः', sentence: 'सुताः जरन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'जरसि', translit: 'jarasi', meaning: 'you age', pronoun: 'त्वम्', sentence: 'त्वं जरसि' },
      dual: { affix: '-थः', form: 'जरथः', translit: 'jarathaḥ', meaning: 'you two age', pronoun: 'युवाम्', sentence: 'युवां जरथः' },
      plural: { affix: '-थ', form: 'जरथ', translit: 'jaratha', meaning: 'you all age', pronoun: 'यूयम्', sentence: 'यूयं जरथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'जरामि', translit: 'jarāmi', meaning: 'I age', pronoun: 'अहम्', sentence: 'अहं जरामि' },
      dual: { affix: '-वः', form: 'जरावः', translit: 'jarāvaḥ', meaning: 'we two age', pronoun: 'आवाम्', sentence: 'आवां जरावः' },
      plural: { affix: '-मः', form: 'जरामः', translit: 'jarāmaḥ', meaning: 'we all age', pronoun: 'वयम्', sentence: 'वयं जरामः' },
    },
    targetSentence: {
      number: 'singular',
      person: 'prathama',
      sanskrit: 'सुतः जरति',
      translit: 'Sutaḥ jarati',
      english: 'The son grows old.',
      tamil: 'மகன் முதிர்ச்சி அடைகிறான்.',
      malayalam: 'മകൻ പ്രായമാകുന്നു / വാർദ്ധക്യം പ്രാപിക്കുന്നു.',
    },
    mnemonic: 'ஜரா (முதுமை): மகன் ஒருவன் = सुतः जरति.',
  },

  // 6. सैनिक + रक्ष् (1P)
  {
    id: 'raksh',
    root: 'रक्ष्',
    baseTranslit: 'rakṣ',
    subjectNoun: 'सैनिक (Soldier)',
    subjectNounTamil: 'வீரன் (Soldier)',
    subjectNounMalayalam: 'സൈനികൻ (Soldier)',
    meaning: 'पालनम् / रक्षणम् (To Protect / Guard)',
    meaningTamil: 'காத்தல் / ரக்ஷித்தல் (Protect)',
    meaningMalayalam: 'രക്ഷിക്കുക (Protect)',
    englishAction: 'Protect / Guard',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'रक्ष',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'रक्षति', translit: 'rakṣati', meaning: 'protects', pronoun: 'सैनिकः', sentence: 'सैनिकः रक्षति' },
      dual: { affix: '-तः', form: 'रक्षतः', translit: 'rakṣataḥ', meaning: 'two protect', pronoun: 'सैनिकौ', sentence: 'सैनिकौ रक्षतः' },
      plural: { affix: '-न्ति', form: 'रक्षन्ति', translit: 'rakṣanti', meaning: 'they protect', pronoun: 'सैनिकाः', sentence: 'सैनिकाः रक्षन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'रक्षसि', translit: 'rakṣasi', meaning: 'you protect', pronoun: 'त्वम्', sentence: 'त्वं रक्षसि' },
      dual: { affix: '-थः', form: 'रक्षथः', translit: 'rakṣathaḥ', meaning: 'you two protect', pronoun: 'युवाम्', sentence: 'युवां रक्षथः' },
      plural: { affix: '-थ', form: 'रक्षथ', translit: 'rakṣatha', meaning: 'you all protect', pronoun: 'यूयम्', sentence: 'यूयं रक्षथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'रक्षामि', translit: 'rakṣāmi', meaning: 'I protect', pronoun: 'अहम्', sentence: 'अहं रक्षामि' },
      dual: { affix: '-वः', form: 'रक्षावः', translit: 'rakṣāvaḥ', meaning: 'we two protect', pronoun: 'आवाम्', sentence: 'आवां रक्षावः' },
      plural: { affix: '-मः', form: 'रक्षामः', translit: 'rakṣāmaḥ', meaning: 'we all protect', pronoun: 'वयम्', sentence: 'वयं रक्षामः' },
    },
    targetSentence: {
      number: 'dual',
      person: 'prathama',
      sanskrit: 'सैनिकौ रक्षतः',
      translit: 'Sainikau rakṣataḥ',
      english: 'Two soldiers protect.',
      tamil: 'இரு வீரர்கள் காக்கிறார்கள்.',
      malayalam: 'രണ്ട് സൈനികർ രക്ഷിക്കുന്നു / കാക്കുന്നു.',
    },
    mnemonic: 'ரக்ஷ் (ரக்ஷிப்பது): வீரர்கள் இருவர் = सैनिकौ रक्षतः.',
  },

  // 7. वृक्ष + रुह् (1P)
  {
    id: 'ruh',
    root: 'रुह्',
    baseTranslit: 'ruh',
    subjectNoun: 'वृक्ष (Tree)',
    subjectNounTamil: 'மரம் (Tree)',
    subjectNounMalayalam: 'വൃക്ഷം (Tree)',
    meaning: 'प्रादुर्भावः / प्ररोहणम् (To Grow / Sprout)',
    meaningTamil: 'வளர்தல் / துளிர்த்தல் (Grow)',
    meaningMalayalam: 'വളരുക (Grow)',
    englishAction: 'Grow / Sprout',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'रोह',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'रोहति', translit: 'rohati', meaning: 'grows', pronoun: 'वृक्षः', sentence: 'वृक्षः रोहति' },
      dual: { affix: '-तः', form: 'रोहतः', translit: 'rohataḥ', meaning: 'two grow', pronoun: 'वृक्षौ', sentence: 'वृक्षौ रोहतः' },
      plural: { affix: '-न्ति', form: 'रोहन्ति', translit: 'rohanti', meaning: 'they grow', pronoun: 'वृक्षाः', sentence: 'वृक्षाः रोहन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'रोहसि', translit: 'rohasi', meaning: 'you grow', pronoun: 'त्वम्', sentence: 'त्वं रोहसि' },
      dual: { affix: '-थः', form: 'रोहथः', translit: 'rohathaḥ', meaning: 'you two grow', pronoun: 'युवाम्', sentence: 'युवां रोहथः' },
      plural: { affix: '-थ', form: 'रोहथ', translit: 'rohatha', meaning: 'you all grow', pronoun: 'यूयम्', sentence: 'यूयं रोहथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'रोहामि', translit: 'rohāmi', meaning: 'I grow', pronoun: 'अहम्', sentence: 'अहं रोहामि' },
      dual: { affix: '-वः', form: 'रोहावः', translit: 'rohāvaḥ', meaning: 'we two grow', pronoun: 'आवाम्', sentence: 'आवां रोहावः' },
      plural: { affix: '-मः', form: 'रोहामः', translit: 'rohāmaḥ', meaning: 'we all grow', pronoun: 'वयम्', sentence: 'वयं रोहामः' },
    },
    targetSentence: {
      number: 'plural',
      person: 'prathama',
      sanskrit: 'वृक्षाः रोहन्ति',
      translit: 'Vṛkṣāḥ rohanti',
      english: 'The trees grow.',
      tamil: 'மரங்கள் வளர்கின்றன.',
      malayalam: 'മരങ്ങൾ വളരുന്നു.',
    },
    mnemonic: 'ரோஹணம் (வளர்ச்சி): மரங்கள் பல = वृक्षाः रोहन्ति.',
  },

  // 8. जन + वद् (1P)
  {
    id: 'vad',
    root: 'वद्',
    baseTranslit: 'vad',
    subjectNoun: 'जन (Person)',
    subjectNounTamil: 'மனிதன் (Person)',
    subjectNounMalayalam: 'വ്യക്തി (Person)',
    meaning: 'भाषणम् (To Speak / Say)',
    meaningTamil: 'பேசுதல் (Speak)',
    meaningMalayalam: 'സംസാരിക്കുക (Speak)',
    englishAction: 'Speak / Say',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'वद',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'वदति', translit: 'vadati', meaning: 'speaks', pronoun: 'जनः', sentence: 'जनः वदति' },
      dual: { affix: '-तः', form: 'वदतः', translit: 'vadataḥ', meaning: 'two speak', pronoun: 'जनौ', sentence: 'जनौ वदतः' },
      plural: { affix: '-न्ति', form: 'वदन्ति', translit: 'vadanti', meaning: 'they speak', pronoun: 'जनाः', sentence: 'जनाः वदन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'वदसि', translit: 'vadasi', meaning: 'you speak', pronoun: 'त्वम्', sentence: 'त्वं वदसि' },
      dual: { affix: '-थः', form: 'वदथः', translit: 'vadathaḥ', meaning: 'you two speak', pronoun: 'युवाम्', sentence: 'युवां वदथः' },
      plural: { affix: '-थ', form: 'वदथ', translit: 'vadatha', meaning: 'you all speak', pronoun: 'यूयम्', sentence: 'यूयं वदथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'वदामि', translit: 'vadāmi', meaning: 'I speak', pronoun: 'अहम्', sentence: 'अहं वदामि' },
      dual: { affix: '-वः', form: 'वदावः', translit: 'vadāvaḥ', meaning: 'we two speak', pronoun: 'आवाम्', sentence: 'आवां वदावः' },
      plural: { affix: '-मः', form: 'वदामः', translit: 'vadāmaḥ', meaning: 'we all speak', pronoun: 'वयम्', sentence: 'वयं वदामः' },
    },
    targetSentence: {
      number: 'singular',
      person: 'prathama',
      sanskrit: 'जनः वदति',
      translit: 'Janaḥ vadati',
      english: 'The person speaks.',
      tamil: 'மனிதன் பேசுகிறான்.',
      malayalam: 'വ്യക്തി സംസാരിക്കുന്നു.',
    },
    mnemonic: 'வதனம் (பேசுதல்): மனிதன் ஒருவன் = जनः वदति.',
  },

  // 9. मीन + तॄ (1P)
  {
    id: 'tri',
    root: 'तॄ',
    baseTranslit: 'tṝ',
    subjectNoun: 'मीन (Fish)',
    subjectNounTamil: 'மீன் (Fish)',
    subjectNounMalayalam: 'മത്സ്യം (Fish)',
    meaning: 'तरणम् / प्लावः (To Swim / Cross)',
    meaningTamil: 'நீந்துதல் (Swim)',
    meaningMalayalam: 'നീന്തുക (Swim)',
    englishAction: 'Swim / Cross',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'तर',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'तरति', translit: 'tarati', meaning: 'swims', pronoun: 'मीनः', sentence: 'मीनः तरति' },
      dual: { affix: '-तः', form: 'तरतः', translit: 'tarataḥ', meaning: 'two swim', pronoun: 'मीनौ', sentence: 'मीनौ तरतः' },
      plural: { affix: '-न्ति', form: 'तरन्ति', translit: 'taranti', meaning: 'they swim', pronoun: 'मीनाः', sentence: 'मीनाः तरन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'तरसि', translit: 'tarasi', meaning: 'you swim', pronoun: 'त्वम्', sentence: 'त्वं तरसि' },
      dual: { affix: '-थः', form: 'तरथः', translit: 'tarathaḥ', meaning: 'you two swim', pronoun: 'युवाम्', sentence: 'युवां तरथः' },
      plural: { affix: '-थ', form: 'तरथ', translit: 'taratha', meaning: 'you all swim', pronoun: 'यूयम्', sentence: 'यूयं तरथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'तरामि', translit: 'tarāmi', meaning: 'I swim', pronoun: 'अहम्', sentence: 'अहं तरामि' },
      dual: { affix: '-वः', form: 'तरावः', translit: 'tarāvaḥ', meaning: 'we two swim', pronoun: 'आवाम्', sentence: 'आवां तरावः' },
      plural: { affix: '-मः', form: 'तरामः', translit: 'tarāmaḥ', meaning: 'we all swim', pronoun: 'वयम्', sentence: 'वयं तरामः' },
    },
    targetSentence: {
      number: 'plural',
      person: 'prathama',
      sanskrit: 'मीनाः तरन्ति',
      translit: 'Mīnāḥ taranti',
      english: 'The fish swim.',
      tamil: 'மீன்கள் நீந்துகின்றன.',
      malayalam: 'മത്സ്യങ്ങൾ നീന്തുന്നു.',
    },
    mnemonic: 'தரண (நீந்துதல்): மீன்கள் பல = मीनाः तरन्ति.',
  },

  // 10. सा + कुप् (4P)
  {
    id: 'kup',
    root: 'कुप्',
    baseTranslit: 'kup',
    subjectNoun: 'सा (She)',
    subjectNounTamil: 'அவள் (She)',
    subjectNounMalayalam: 'അവൾ (She)',
    meaning: 'क्रोधः (To Get Angry)',
    meaningTamil: 'கோபப்படுதல் (Get angry)',
    meaningMalayalam: 'കോപിക്കുക (Get angry)',
    englishAction: 'Get Angry',
    gana: 'दिवादिगणः',
    ganaNumber: 4,
    stem: 'कुप्य',
    vikaran: 'य (श्यन्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'कुप्यति', translit: 'kupyati', meaning: 'gets angry', pronoun: 'सा', sentence: 'सा कुप्यति' },
      dual: { affix: '-तः', form: 'कुप्यतः', translit: 'kupyataḥ', meaning: 'two get angry', pronoun: 'ते', sentence: 'ते कुप्यतः' },
      plural: { affix: '-न्ति', form: 'कुप्यन्ति', translit: 'kupyanti', meaning: 'they get angry', pronoun: 'ताः', sentence: 'ताः कुप्यन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'कुप्यसि', translit: 'kupyasi', meaning: 'you get angry', pronoun: 'त्वम्', sentence: 'त्वं कुप्यसि' },
      dual: { affix: '-थः', form: 'कुप्यथः', translit: 'kupyathaḥ', meaning: 'you two get angry', pronoun: 'युवाम्', sentence: 'युवां कुप्यथः' },
      plural: { affix: '-थ', form: 'कुप्यथ', translit: 'kupyatha', meaning: 'you all get angry', pronoun: 'यूयम्', sentence: 'यूयं कुप्यथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'कुप्यामि', translit: 'kupyāmi', meaning: 'I get angry', pronoun: 'अहम्', sentence: 'अहं कुप्यामि' },
      dual: { affix: '-वः', form: 'कुप्यावः', translit: 'kupyāvaḥ', meaning: 'we two get angry', pronoun: 'आवाम्', sentence: 'आवां कुप्यावः' },
      plural: { affix: '-मः', form: 'कुप्यामः', translit: 'kupyāmaḥ', meaning: 'we all get angry', pronoun: 'वयम्', sentence: 'वयं कुप्यामः' },
    },
    targetSentence: {
      number: 'singular',
      person: 'prathama',
      sanskrit: 'सा कुप्यति',
      translit: 'Sā kupyati',
      english: 'She gets angry.',
      tamil: 'அவள் கோபமடைகிறாள்.',
      malayalam: 'അവൾ കോപിക്കുന്നു.',
    },
    mnemonic: 'கோபம் (குப்): அவள் ஒருத்தி = सा कुप्यति.',
  },

  // 11. कुक्कुर + भष् (1P)
  {
    id: 'bhash_bark',
    root: 'भष्',
    baseTranslit: 'bhaṣ',
    subjectNoun: 'कुक्कुर (Dog)',
    subjectNounTamil: 'நாய் (Dog)',
    subjectNounMalayalam: 'നായ (Dog)',
    meaning: 'भषणम् (To Bark)',
    meaningTamil: 'குரைத்தல் (Bark)',
    meaningMalayalam: 'കുരയ്ക്കുക (Bark)',
    englishAction: 'Bark',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'भष',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'भषति', translit: 'bhaṣati', meaning: 'barks', pronoun: 'कुक्कुरः', sentence: 'भषति कुक्कुरः' },
      dual: { affix: '-तः', form: 'भषतः', translit: 'bhaṣataḥ', meaning: 'two bark', pronoun: 'कुक्कुरौ', sentence: 'भषतः कुक्कुरौ' },
      plural: { affix: '-न्ति', form: 'भषन्ति', translit: 'bhaṣanti', meaning: 'they bark', pronoun: 'कुक्कुराः', sentence: 'भषन्ति कुक्कुराः' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'भषसि', translit: 'bhaṣasi', meaning: 'you bark', pronoun: 'त्वम्', sentence: 'त्वं भषसि' },
      dual: { affix: '-थः', form: 'भषथः', translit: 'bhaṣathaḥ', meaning: 'you two bark', pronoun: 'युवाम्', sentence: 'युवां भषथः' },
      plural: { affix: '-थ', form: 'भषथ', translit: 'bhaṣatha', meaning: 'you all bark', pronoun: 'यूयम्', sentence: 'यूयं भषथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'भषामि', translit: 'bhaṣāmi', meaning: 'I bark', pronoun: 'अहम्', sentence: 'अहं भषामि' },
      dual: { affix: '-वः', form: 'भषावः', translit: 'bhaṣāvaḥ', meaning: 'we two bark', pronoun: 'आवाम्', sentence: 'आवां भषावः' },
      plural: { affix: '-मः', form: 'भषामः', translit: 'bhaṣāmaḥ', meaning: 'we all bark', pronoun: 'वयम्', sentence: 'वयं भषामः' },
    },
    targetSentence: {
      number: 'plural',
      person: 'prathama',
      sanskrit: 'भषन्ति कुक्कुराः',
      translit: 'Bhaṣanti kukkurāḥ',
      english: 'The dogs bark.',
      tamil: 'நாய்கள் குரைக்கின்றன.',
      malayalam: 'നായ്ക്കൾ കുരയ്ക്കുന്നു.',
    },
    mnemonic: 'குரைப்பது (பஷ்): நாய்கள் பல = भषन्ति कुक्कुराः.',
  },

  // 12. मृग + त्रस् (4P / 1P)
  {
    id: 'tras',
    root: 'त्रस्',
    baseTranslit: 'tras',
    subjectNoun: 'मृग (Deer)',
    subjectNounTamil: 'மான் (Deer)',
    subjectNounMalayalam: 'മാൻ (Deer)',
    meaning: 'भीतिः / कम्पनम् (To Tremble / Flee in Fear)',
    meaningTamil: 'அஞ்சி நடுங்குதல் (Tremble in fear)',
    meaningMalayalam: 'ഭയന്ന് വിറയ്ക്കുക (Tremble in fear)',
    englishAction: 'Tremble / Fear',
    gana: 'दिवादिगणः',
    ganaNumber: 4,
    stem: 'त्रस्य',
    vikaran: 'य (श्यन्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'त्रस्यति', translit: 'trasyati', meaning: 'trembles', pronoun: 'मृगः', sentence: 'त्रस्यति मृगः' },
      dual: { affix: '-तः', form: 'त्रस्यतः', translit: 'trasyataḥ', meaning: 'two tremble', pronoun: 'मृगौ', sentence: 'त्रस्यतः मृगौ' },
      plural: { affix: '-न्ति', form: 'त्रस्यन्ति', translit: 'trasyanti', meaning: 'they tremble', pronoun: 'मृगाः', sentence: 'त्रस्यन्ति मृगाः' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'त्रस्यसि', translit: 'trasyasi', meaning: 'you tremble', pronoun: 'त्वम्', sentence: 'त्वं त्रस्यसि' },
      dual: { affix: '-थः', form: 'त्रस्यथः', translit: 'trasyathaḥ', meaning: 'you two tremble', pronoun: 'युवाम्', sentence: 'युवां त्रस्यथः' },
      plural: { affix: '-थ', form: 'त्रस्यथ', translit: 'trasyatha', meaning: 'you all tremble', pronoun: 'यूयम्', sentence: 'यूयं त्रस्यथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'त्रस्यामि', translit: 'trasyāmi', meaning: 'I tremble', pronoun: 'अहम्', sentence: 'अहं त्रस्यामि' },
      dual: { affix: '-वः', form: 'त्रस्यावः', translit: 'trasyāvaḥ', meaning: 'we two tremble', pronoun: 'आवाम्', sentence: 'आवां त्रस्यावः' },
      plural: { affix: '-मः', form: 'त्रस्यामः', translit: 'trasyāmaḥ', meaning: 'we all tremble', pronoun: 'वयम्', sentence: 'वयं त्रस्यामः' },
    },
    targetSentence: {
      number: 'dual',
      person: 'prathama',
      sanskrit: 'त्रस्यतः मृगौ',
      translit: 'Trasyataḥ mṛgau',
      english: 'Two deer tremble in fear.',
      tamil: 'இரு மான்கள் அஞ்சி நடுங்குகின்றன.',
      malayalam: 'രണ്ട് മാനുകൾ ഭയന്ന് വിറയ്ക്കുന്നു.',
    },
    mnemonic: 'த்ராஸம் (பயப்படுதல்): மான்கள் இருவர் = त्रस्यतः मृगौ.',
  },

  // 13. हस्त + क्षल् (10U)
  {
    id: 'kshal',
    root: 'क्षल्',
    baseTranslit: 'kṣal',
    subjectNoun: 'हस्त (Hand)',
    subjectNounTamil: 'கை (Hand)',
    subjectNounMalayalam: 'കൈ (Hand)',
    meaning: 'प्रक्षालनम् (To Wash / Cleanse)',
    meaningTamil: 'கழுவுதல் / தூய்மைப்படுத்துதல் (Wash)',
    meaningMalayalam: 'കഴുകുക (Wash)',
    englishAction: 'Wash / Cleanse',
    gana: 'चुरादिगणः',
    ganaNumber: 10,
    stem: 'क्षालय',
    vikaran: 'अय (णिच् + शप्)',
    padam: 'उभयपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'क्षालयति', translit: 'kṣālayati', meaning: 'washes', pronoun: 'हस्तः', sentence: 'क्षालयति हस्ते' },
      dual: { affix: '-तः', form: 'क्षालयतः', translit: 'kṣālayataḥ', meaning: 'two wash', pronoun: 'हस्तौ', sentence: 'क्षालयतः हस्तौ' },
      plural: { affix: '-न्ति', form: 'क्षालयन्ति', translit: 'kṣālayanti', meaning: 'they wash', pronoun: 'हस्ताः', sentence: 'क्षालयन्ति हस्ताः' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'क्षालयसि', translit: 'kṣālayasi', meaning: 'you wash', pronoun: 'त्वम्', sentence: 'त्वं क्षालयसि' },
      dual: { affix: '-थः', form: 'क्षालयथः', translit: 'kṣālayathaḥ', meaning: 'you two wash', pronoun: 'युवाम्', sentence: 'युवां क्षालयथः' },
      plural: { affix: '-थ', form: 'क्षालयथ', translit: 'kṣālayatha', meaning: 'you all wash', pronoun: 'यूयम्', sentence: 'यूयं क्षालयथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'क्षालयामि', translit: 'kṣālayāmi', meaning: 'I wash', pronoun: 'अहम्', sentence: 'अहं क्षालयामि' },
      dual: { affix: '-वः', form: 'क्षालयावः', translit: 'kṣālayāvaḥ', meaning: 'we two wash', pronoun: 'आवाम्', sentence: 'आवां क्षालयावः' },
      plural: { affix: '-मः', form: 'क्षालयामः', translit: 'kṣālayāmaḥ', meaning: 'we all wash', pronoun: 'वयम्', sentence: 'वयं क्षालयामः' },
    },
    targetSentence: {
      number: 'dual',
      person: 'prathama',
      sanskrit: 'क्षालयतः हस्तौ',
      translit: 'Kṣālayataḥ hastau',
      english: 'Two hands wash.',
      tamil: 'இரு கைகள் கழுவுகின்றன.',
      malayalam: 'രണ്ട് കൈകൾ കഴുകുന്നു.',
    },
    mnemonic: 'க்ஷாளனம் (கழுவுதல்): கைகள் இருவர் = क्षालयतः हस्तौ.',
  },

  // 14. वानर + खाद् (1P)
  {
    id: 'khad_monkey',
    root: 'खाद्',
    baseTranslit: 'khād',
    subjectNoun: 'वानर (Monkey)',
    subjectNounTamil: 'குரங்கு (Monkey)',
    subjectNounMalayalam: 'കുരങ്ങ് (Monkey)',
    meaning: 'भक्षणम् (To Eat)',
    meaningTamil: 'உண்ணுதல் (Eat)',
    meaningMalayalam: 'ഭക്ഷിക്കുക / തിന്നുക (Eat)',
    englishAction: 'Eat',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'खाद',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'खादति', translit: 'khādati', meaning: 'eats', pronoun: 'वानरः', sentence: 'वानरः खादति' },
      dual: { affix: '-तः', form: 'खादतः', translit: 'khādataḥ', meaning: 'two eat', pronoun: 'वानरौ', sentence: 'वानरौ खादतः' },
      plural: { affix: '-न्ति', form: 'खादन्ति', translit: 'khādanti', meaning: 'they eat', pronoun: 'वानराः', sentence: 'वानराः खादन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'खादसि', translit: 'khādasi', meaning: 'you eat', pronoun: 'त्वम्', sentence: 'त्वं खादसि' },
      dual: { affix: '-थः', form: 'खादथः', translit: 'khādathaḥ', meaning: 'you two eat', pronoun: 'युवाम्', sentence: 'युवां खादथः' },
      plural: { affix: '-थ', form: 'खादथ', translit: 'khādatha', meaning: 'you all eat', pronoun: 'यूयम्', sentence: 'यूयं खादथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'खादामि', translit: 'khādāmi', meaning: 'I eat', pronoun: 'अहम्', sentence: 'अहं खादामि' },
      dual: { affix: '-वः', form: 'खादावः', translit: 'khādāvaḥ', meaning: 'we two eat', pronoun: 'आवाम्', sentence: 'आवां खादावः' },
      plural: { affix: '-मः', form: 'खादामः', translit: 'khādāmaḥ', meaning: 'we all eat', pronoun: 'वयम्', sentence: 'वयं खादामः' },
    },
    targetSentence: {
      number: 'plural',
      person: 'prathama',
      sanskrit: 'वानराः खादन्ति',
      translit: 'Vānarāḥ khādanti',
      english: 'The monkeys eat.',
      tamil: 'குரங்குகள் உண்கின்றன.',
      malayalam: 'കുരങ്ങുകൾ തിന്നുന്നു.',
    },
    mnemonic: 'காதுதல் / உண்ணுதல்: குரங்குகள் பல = वानराः खादन्ति.',
  },

  // 15. दीप + ज्वल् (1P)
  {
    id: 'jval',
    root: 'ज्वल्',
    baseTranslit: 'jval',
    subjectNoun: 'दीप (Lamp)',
    subjectNounTamil: 'விளக்கு (Lamp)',
    subjectNounMalayalam: 'വിളക്ക് (Lamp)',
    meaning: 'प्रदीपनम् (To Shine / Burn / Blaze)',
    meaningTamil: 'பிரகாசித்தல் / எரிதல் (Shine / Blaze)',
    meaningMalayalam: 'ജ്വലിക്കുക (Shine / Blaze)',
    englishAction: 'Shine / Blaze',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'ज्वल',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'ज्वलति', translit: 'jvalati', meaning: 'shines', pronoun: 'दीपः', sentence: 'दीपः ज्वलति' },
      dual: { affix: '-तः', form: 'ज्वलतः', translit: 'jvalataḥ', meaning: 'two shine', pronoun: 'दीपौ', sentence: 'दीपौ ज्वलतः' },
      plural: { affix: '-न्ति', form: 'ज्वलन्ति', translit: 'jvalanti', meaning: 'they shine', pronoun: 'दीपाः', sentence: 'दीपाः ज्वलन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'ज्वलसि', translit: 'jvalasi', meaning: 'you shine', pronoun: 'त्वम्', sentence: 'त्वं ज्वलसि' },
      dual: { affix: '-थः', form: 'ज्वलथः', translit: 'jvalathaḥ', meaning: 'you two shine', pronoun: 'युवाम्', sentence: 'युवां ज्वलथः' },
      plural: { affix: '-थ', form: 'ज्वलथ', translit: 'jvalatha', meaning: 'you all shine', pronoun: 'यूयम्', sentence: 'यूयं ज्वलथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'ज्वलामि', translit: 'jvalāmi', meaning: 'I shine', pronoun: 'अहम्', sentence: 'अहं ज्वलामि' },
      dual: { affix: '-वः', form: 'ज्वलावः', translit: 'jvalāvaḥ', meaning: 'we two shine', pronoun: 'आवाम्', sentence: 'आवां ज्वलावः' },
      plural: { affix: '-मः', form: 'ज्वलामः', translit: 'jvalāmaḥ', meaning: 'we all shine', pronoun: 'वयम्', sentence: 'वयं ज्वलामः' },
    },
    targetSentence: {
      number: 'singular',
      person: 'prathama',
      sanskrit: 'दीपः ज्वलति',
      translit: 'Dīpaḥ jvalati',
      english: 'The lamp shines.',
      tamil: 'விளக்கு பிரகாசிக்கிறது.',
      malayalam: 'വിളക്ക് ജ്വലിക്കുന്നു.',
    },
    mnemonic: 'ஜ்வாலை (ஒளி): விளக்கு ஒன்று = दीपः ज्वलति.',
  },

  // 16. भार्या + यज् (1U)
  {
    id: 'yaj',
    root: 'यज्',
    baseTranslit: 'yaj',
    subjectNoun: 'भार्या (Wife)',
    subjectNounTamil: 'மனைவி (Wife)',
    subjectNounMalayalam: 'ഭാര്യ (Wife)',
    meaning: 'देवपूजा / यज्ञः (To Worship / Sacrifice)',
    meaningTamil: 'யாகம் / பூஜை செய்தல் (Perform ritual)',
    meaningMalayalam: 'യജ്ഞം / പൂജ ചെയ്യുക (Perform ritual)',
    englishAction: 'Perform Ritual / Sacrifice',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'यज',
    vikaran: 'अ (शप्)',
    padam: 'उभयपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'यजति', translit: 'yajati', meaning: 'performs ritual', pronoun: 'भार्या', sentence: 'भार्या यजति' },
      dual: { affix: '-तः', form: 'यजतः', translit: 'yajataḥ', meaning: 'two perform ritual', pronoun: 'भार्ये', sentence: 'भार्ये यजतः' },
      plural: { affix: '-न्ति', form: 'यजन्ति', translit: 'yajanti', meaning: 'they perform ritual', pronoun: 'भार्याः', sentence: 'भार्याः यजन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'यजसि', translit: 'yajasi', meaning: 'you perform ritual', pronoun: 'त्वम्', sentence: 'त्वं यजसि' },
      dual: { affix: '-थः', form: 'यजथः', translit: 'yajathaḥ', meaning: 'you two perform ritual', pronoun: 'युवाम्', sentence: 'युवां यजथः' },
      plural: { affix: '-थ', form: 'यजथ', translit: 'yajatha', meaning: 'you all perform ritual', pronoun: 'यूयम्', sentence: 'यूयं यजथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'यजामि', translit: 'yajāmi', meaning: 'I perform ritual', pronoun: 'अहम्', sentence: 'अहं यजामि' },
      dual: { affix: '-वः', form: 'यजावः', translit: 'yajāvaḥ', meaning: 'we two perform ritual', pronoun: 'आवाम्', sentence: 'आवां यजावः' },
      plural: { affix: '-मः', form: 'यजामः', translit: 'yajāmaḥ', meaning: 'we all perform ritual', pronoun: 'वयम्', sentence: 'वयं यजामः' },
    },
    targetSentence: {
      number: 'singular',
      person: 'prathama',
      sanskrit: 'भार्या यजति',
      translit: 'Bhāryā yajati',
      english: 'The wife performs a ritual.',
      tamil: 'மனைவி யாகம் / பூஜை செய்கிறாள்.',
      malayalam: 'ഭാര്യ യജ്ഞം / പൂജ ചെയ്യുന്നു.',
    },
    mnemonic: 'யஜ் (யாகம்): மனைவி ஒருத்தி = भार्या यजति.',
  },

  // 17. भिक्षुक + याच् (1A - आत्मनेपदम्)
  {
    id: 'yach',
    root: 'याच्',
    baseTranslit: 'yāc',
    subjectNoun: 'भिक्षुक (Beggar)',
    subjectNounTamil: 'யாசகன் (Beggar)',
    subjectNounMalayalam: 'യാചകൻ (Beggar)',
    meaning: 'याचना (To Beg / Request)',
    meaningTamil: 'யாசித்தல் / வேண்டுதல் (Beg)',
    meaningMalayalam: 'യാചിക്കുക (Beg)',
    englishAction: 'Beg / Request',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'याच',
    vikaran: 'अ (शप्)',
    padam: 'आत्मनेपदम्',
    prathama: {
      singular: { affix: '-ते', form: 'याचते', translit: 'yācate', meaning: 'begs', pronoun: 'भिक्षुकः', sentence: 'भिक्षुकः याचते' },
      dual: { affix: '-एते', form: 'याचेते', translit: 'yācete', meaning: 'two beg', pronoun: 'भिक्षुकौ', sentence: 'भिक्षुकौ याचेते' },
      plural: { affix: '-न्ते', form: 'याचन्ते', translit: 'yācante', meaning: 'they beg', pronoun: 'भिक्षुकाः', sentence: 'भिक्षुकाः याचन्ते' },
    },
    madhyama: {
      singular: { affix: '-से', form: 'याचसे', translit: 'yācase', meaning: 'you beg', pronoun: 'त्वम्', sentence: 'त्वं याचसे' },
      dual: { affix: '-एथे', form: 'याचेथे', translit: 'yācethe', meaning: 'you two beg', pronoun: 'युवाम्', sentence: 'युवां याचेथे' },
      plural: { affix: '-ध्वे', form: 'याचध्वे', translit: 'yācadhve', meaning: 'you all beg', pronoun: 'यूयम्', sentence: 'यूयं याचध्वे' },
    },
    uttama: {
      singular: { affix: '-ए', form: 'याचे', translit: 'yāce', meaning: 'I beg', pronoun: 'अहम्', sentence: 'अहं याचे' },
      dual: { affix: '-वहे', form: 'याचावहे', translit: 'yācāvahe', meaning: 'we two beg', pronoun: 'आवाम्', sentence: 'आवां याचावहे' },
      plural: { affix: '-महे', form: 'याचामहे', translit: 'yācāmahe', meaning: 'we all beg', pronoun: 'वयम्', sentence: 'वयं याचामहे' },
    },
    targetSentence: {
      number: 'plural',
      person: 'prathama',
      sanskrit: 'भिक्षुकाः याचन्ते',
      translit: 'Bhikṣukāḥ yācante',
      english: 'The beggars beg.',
      tamil: 'யாசகர்கள் வேண்டுகிறார்கள் / யாசிக்கிறார்கள்.',
      malayalam: 'യാചകർ യാചിക്കുന്നു.',
    },
    mnemonic: 'ஆத்மனேபதம்: -தே, -ஏதே, -ந்தே! யாசகர்கள் பலர் = भिक्षुकाः याचन्ते.',
  },

  // 18. युवाम् + त्यज् (1P - मध्यमपुरुषः द्विवचनम्)
  {
    id: 'tyaj',
    root: 'त्यज्',
    baseTranslit: 'tyaj',
    subjectNoun: 'युवाम् (You two)',
    subjectNounTamil: 'நீங்கள் இருவரும் (You two)',
    subjectNounMalayalam: 'നിങ്ങൾ രണ്ടുപേരും (You two)',
    meaning: 'त्यागः (To Abandon / Leave)',
    meaningTamil: 'துறத்தல் / கைவிடுதல் (Abandon)',
    meaningMalayalam: 'ഉപേക്ഷിക്കുക / ത്യജിക്കുക (Abandon)',
    englishAction: 'Abandon / Leave',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'त्यज',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'त्यजति', translit: 'tyajati', meaning: 'abandons', pronoun: 'सः', sentence: 'सः त्यजति' },
      dual: { affix: '-तः', form: 'त्यजतः', translit: 'tyajataḥ', meaning: 'two abandon', pronoun: 'तौ', sentence: 'तौ त्यजतः' },
      plural: { affix: '-न्ति', form: 'त्यजन्ति', translit: 'tyajanti', meaning: 'they abandon', pronoun: 'ते', sentence: 'ते त्यजन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'त्यजसि', translit: 'tyajasi', meaning: 'you abandon', pronoun: 'त्वम्', sentence: 'त्वम् त्यजसि' },
      dual: { affix: '-थः', form: 'त्यजथः', translit: 'tyajathaḥ', meaning: 'you two abandon', pronoun: 'युवाम्', sentence: 'युवाम् त्यजथः' },
      plural: { affix: '-थ', form: 'त्यजथ', translit: 'tyajatha', meaning: 'you all abandon', pronoun: 'यूयम्', sentence: 'यूयम् त्यजथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'त्यजामि', translit: 'tyajāmi', meaning: 'I abandon', pronoun: 'अहम्', sentence: 'अहं त्यजामि' },
      dual: { affix: '-वः', form: 'त्यजावः', translit: 'tyajāvaḥ', meaning: 'we two abandon', pronoun: 'आवाम्', sentence: 'आवां त्यजावः' },
      plural: { affix: '-मः', form: 'त्यजामः', translit: 'tyajāmaḥ', meaning: 'we all abandon', pronoun: 'वयम्', sentence: 'वयं त्यजामः' },
    },
    targetSentence: {
      number: 'dual',
      person: 'madhyama',
      sanskrit: 'युवाम् त्यजथः',
      translit: 'Yuvām tyajathaḥ',
      english: 'You two abandon/leave.',
      tamil: 'நீங்கள் இருவரும் விடுகிறீர்கள் / துறக்கிறீர்கள்.',
      malayalam: 'നിങ്ങൾ രണ്ടുപേരും ഉപേക്ഷിക്കുന്നു.',
    },
    mnemonic: 'மத்யமபுருஷன் இருவர்: நீங்கள் இருவரும் = युवाम् त्यजथः.',
  },

  // 19. वयम् + अर्च् (1P - उत्तमपुरुषः बहुवचनम्)
  {
    id: 'arch',
    root: 'अर्च्',
    baseTranslit: 'arc',
    subjectNoun: 'वयम् (We all)',
    subjectNounTamil: 'நாம் அனைவரும் (We all)',
    subjectNounMalayalam: 'ഞങ്ങൾ എല്ലാവരും (We all)',
    meaning: 'अर्चनम् / पूजा (To Worship)',
    meaningTamil: 'அர்ச்சித்தல் / வழிபடுதல் (Worship)',
    meaningMalayalam: 'അർച്ചിക്കുക / പൂജിക്കുക (Worship)',
    englishAction: 'Worship / Adore',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'अर्च',
    vikaran: 'अ (शप्)',
    padam: 'परस्मैपदम्',
    prathama: {
      singular: { affix: '-ति', form: 'अर्चति', translit: 'arcati', meaning: 'worships', pronoun: 'भक्तः', sentence: 'भक्तः अर्चति' },
      dual: { affix: '-तः', form: 'अर्चतः', translit: 'arcataḥ', meaning: 'two worship', pronoun: 'भक्तौ', sentence: 'भक्तौ अर्चतः' },
      plural: { affix: '-न्ति', form: 'अर्चन्ति', translit: 'arcanti', meaning: 'they worship', pronoun: 'भक्ताः', sentence: 'भक्ताः अर्चन्ति' },
    },
    madhyama: {
      singular: { affix: '-सि', form: 'अर्चसि', translit: 'arcasi', meaning: 'you worship', pronoun: 'त्वम्', sentence: 'त्वम् अर्चसि' },
      dual: { affix: '-थः', form: 'अर्चथः', translit: 'arcathaḥ', meaning: 'you two worship', pronoun: 'युवाम्', sentence: 'युवाम् अर्चथः' },
      plural: { affix: '-थ', form: 'अर्चथ', translit: 'arcatha', meaning: 'you all worship', pronoun: 'यूयम्', sentence: 'यूयम् अर्चथ' },
    },
    uttama: {
      singular: { affix: '-मि', form: 'अर्चामि', translit: 'arcāmi', meaning: 'I worship', pronoun: 'अहम्', sentence: 'अहम् अर्चामि' },
      dual: { affix: '-वः', form: 'अर्चावः', translit: 'arcāvaḥ', meaning: 'we two worship', pronoun: 'आवाम्', sentence: 'आवाम् अर्चावः' },
      plural: { affix: '-मः', form: 'अर्चामः', translit: 'arcāmaḥ', meaning: 'we all worship', pronoun: 'वयम्', sentence: 'वयम् अर्चामः' },
    },
    targetSentence: {
      number: 'plural',
      person: 'uttama',
      sanskrit: 'वयम् अर्चामः',
      translit: 'Vayam arcāmaḥ',
      english: 'We all worship.',
      tamil: 'நாம் அனைவரும் அர்ச்சிக்கிறோம் / வழிபடுகிறோம்.',
      malayalam: 'ഞങ്ങൾ എല്ലാവരും ആരാധിക്കുന്നു / അർച്ചിക്കുന്നു.',
    },
    mnemonic: 'உத்தமபுருஷன் பன்மை: நாம் அனைவரும் = वयम् अर्चामः.',
  },

  // 20. आवाम् + लभ् (1A - आत्मनेपदम् उत्तमपुरुषः द्विवचनम्)
  {
    id: 'labh',
    root: 'लभ्',
    baseTranslit: 'labh',
    subjectNoun: 'आवाम् (We two)',
    subjectNounTamil: 'நாங்கள் இருவரும் (We two)',
    subjectNounMalayalam: 'ഞങ്ങൾ രണ്ടുപേരും (We two)',
    meaning: 'प्राप्तिः (To Obtain / Gain)',
    meaningTamil: 'பெறுதல் / அடைதல் (Obtain)',
    meaningMalayalam: 'നേടുക / ലഭിക്കുക (Obtain)',
    englishAction: 'Obtain / Gain',
    gana: 'भ्वादिगणः',
    ganaNumber: 1,
    stem: 'लभ',
    vikaran: 'अ (शप्)',
    padam: 'आत्मनेपदम्',
    prathama: {
      singular: { affix: '-ते', form: 'लभते', translit: 'labhate', meaning: 'obtains', pronoun: 'सः', sentence: 'सः लभते' },
      dual: { affix: '-एते', form: 'लभेते', translit: 'labhete', meaning: 'two obtain', pronoun: 'तौ', sentence: 'तौ लभेते' },
      plural: { affix: '-न्ते', form: 'लभन्ते', translit: 'labhante', meaning: 'they obtain', pronoun: 'ते', sentence: 'ते लभन्ते' },
    },
    madhyama: {
      singular: { affix: '-से', form: 'लभसे', translit: 'labhase', meaning: 'you obtain', pronoun: 'त्वम्', sentence: 'त्वं लभसे' },
      dual: { affix: '-एथे', form: 'लभेथे', translit: 'labhethe', meaning: 'you two obtain', pronoun: 'युवाम्', sentence: 'युवां लभेथे' },
      plural: { affix: '-ध्वे', form: 'लभध्वे', translit: 'labhadhve', meaning: 'you all obtain', pronoun: 'यूयम्', sentence: 'यूयं लभध्वे' },
    },
    uttama: {
      singular: { affix: '-ए', form: 'लभे', translit: 'labhe', meaning: 'I obtain', pronoun: 'अहम्', sentence: 'अहम् लभे' },
      dual: { affix: '-वहे', form: 'लभावहे', translit: 'labhāvahe', meaning: 'we two obtain', pronoun: 'आवाम्', sentence: 'आवाम् लभावहे' },
      plural: { affix: '-महे', form: 'लभामहे', translit: 'labhāmahe', meaning: 'we all obtain', pronoun: 'वयम्', sentence: 'वयम् लभामहे' },
    },
    targetSentence: {
      number: 'dual',
      person: 'uttama',
      sanskrit: 'आवाम् लभावहे',
      translit: 'Āvām labhāvahe',
      english: 'We two obtain.',
      tamil: 'நாங்கள் இருவரும் பெறுகிறோம்.',
      malayalam: 'ഞങ്ങൾ രണ്ടുപേരും നേടുന്നു / ലഭിക്കുന്നു.',
    },
    mnemonic: 'ஆத்மனேபதம் உத்தமபுருஷன் இருவர்: நாங்கள் இருவர் = आवाम् लभावहे.',
  },
];

export const MATRIX_PUZZLE_CHALLENGES: MatrixPuzzleChallenge[] = MATRIX_ROOTS.map((rootItem, idx) => {
  const target = rootItem.targetSentence;
  const personKey = target.person;
  const targetConj = rootItem[personKey][target.number];

  return {
    id: `matrix-ch-${idx + 1}`,
    challengeNumber: idx + 1,
    title: `${idx + 1}. ${rootItem.subjectNoun} + ${rootItem.root}`,
    rootId: rootItem.id,
    subjectNoun: rootItem.subjectNoun,
    rootSymbol: rootItem.root,
    targetNumber: target.number,
    targetPerson: target.person,
    targetForm: targetConj.form,
    targetSentence: target.sanskrit,
    prompt: `Connect the base root ${rootItem.root} with the correct terminal block to forge the target expression "${target.english}".`,
    promptTamil: `அடிப்படை வேர்ச்சொல் "${rootItem.root}" உடன் சரியான முடிவுத் துண்டை இணைத்து "${target.tamil}" என்ற வாக்கியத்தை உருவாக்குங்கள்.`,
    promptMalayalam: `അടിസ്ഥാന ധാതുവായ "${rootItem.root}" എന്നതിനോട് ശരിയായ പ്രത്യയ-ഖണ്ഡം ചേർത്ത് "${target.malayalam}" എന്ന രൂപം ഉണ്ടാക്കുക.`,
    subjectContext: `${targetConj.pronoun} ______।`,
    meaning: target.english,
    meaningTamil: target.tamil,
    meaningMalayalam: target.malayalam,
    hint: `Subject is "${targetConj.pronoun}" (${target.number.toUpperCase()} ${target.person.toUpperCase()}). Termination is ${targetConj.affix}.`,
    hintTamil: `எழுவாய்: "${targetConj.pronoun}" (${target.number === 'singular' ? 'ஒருமை' : target.number === 'dual' ? 'இருமை' : 'பன்மை'}). விகுதி: ${targetConj.affix}.`,
    hintMalayalam: `കർത്താവ്: "${targetConj.pronoun}" (${target.number === 'singular' ? 'ഏകവചനം' : target.number === 'dual' ? 'ദ്വിവചനം' : 'ബഹുവചനം'}). പ്രത്യയം: ${targetConj.affix}.`,
    explanation: `${rootItem.root} (${rootItem.meaning}) + ${targetConj.affix} = ${target.sanskrit} ("${target.english}")`,
    explanationTamil: `${rootItem.root} (${rootItem.meaningTamil}) + ${targetConj.affix} = ${target.sanskrit} ("${target.tamil}")`,
    explanationMalayalam: `${rootItem.root} (${rootItem.meaningMalayalam}) + ${targetConj.affix} = ${target.sanskrit} ("${target.malayalam}")`,
    options: [
      {
        number: 'singular',
        affix: rootItem[personKey].singular.affix,
        sentence: rootItem[personKey].singular.sentence,
      },
      {
        number: 'dual',
        affix: rootItem[personKey].dual.affix,
        sentence: rootItem[personKey].dual.sentence,
      },
      {
        number: 'plural',
        affix: rootItem[personKey].plural.affix,
        sentence: rootItem[personKey].plural.sentence,
      },
    ],
  };
});
