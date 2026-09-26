/**
 * मन्त्राः श्लोकाश्च — Mantras & Ślokas used across the course.
 *
 * Every mantra here is recited by the same calm recitation voice as
 * ओं सह नाववतु (ShantiMantraPlayer + reciteShantiMantra): line-by-line,
 * full text, highlight, per-line replay, stop and voice picker.
 *
 * `steps[].say` is what is sent to the speech engine: never contains । ॥,
 * anusvāra before a pause is written as म् so hi-IN voices sound it,
 * and final "शान्तिः" uses the soft visarga echo "शान्तिह".
 */
import {
  OM,
  SHANTI,
  SHANTI_MANTRA_LINES,
  SHANTI_MANTRA_SOURCE,
  SHANTI_MANTRA_TRANSLATION,
  SHANTI_WORD_MEANINGS,
  type ShantiLine,
} from '../utils/shantiMantraSpeech';

export interface MantraText {
  id: string;
  /** Devanagari title shown above the verse. */
  titleDevanagari: string;
  /** English / IAST title. */
  titleEnglish: string;
  source: string;
  lines: ShantiLine[];
  translation: string;
  wordMeanings?: Array<[string, string, string]>;
}

export const SAHA_NAVAVATU: MantraText = {
  id: 'saha-navavatu',
  titleDevanagari: 'ओं सह नाववतु',
  titleEnglish: 'Saha Nāvavatu · The Study-Bond Śānti Mantra',
  source: SHANTI_MANTRA_SOURCE,
  lines: SHANTI_MANTRA_LINES,
  translation: SHANTI_MANTRA_TRANSLATION,
  wordMeanings: SHANTI_WORD_MEANINGS,
};

export const BHUMI_VANDANAM: MantraText = {
  id: 'bhumi-vandanam',
  titleDevanagari: 'भूमि-वन्दनम् · प्रातः-स्मरणम्',
  titleEnglish: 'Bhūmi Vandanam · Asking the Earth’s Forgiveness at Dawn',
  source: 'Traditional morning prayer (prātaḥ-smaraṇa) before the feet touch the ground',
  lines: [
    {
      devanagari: 'समुद्रवसने देवि पर्वतस्तनमण्डले ।',
      iast: 'samudravasane devi parvatastanamaṇḍale |',
      meaning: 'O Goddess, clothed by the oceans, whose bosom is the mountain ranges,',
      steps: [{ say: 'समुद्रवसने देवि', pauseAfterMs: 320 }, { say: 'पर्वतस्तनमण्डले' }],
      pauseAfterMs: 700,
    },
    {
      devanagari: 'विष्णुपत्नि नमस्तुभ्यं पादस्पर्शं क्षमस्व मे ॥',
      iast: 'viṣṇupatni namastubhyaṃ pādasparśaṃ kṣamasva me ||',
      meaning: 'O consort of Viṣṇu, I bow to you — forgive me the touch of my feet.',
      steps: [{ say: 'विष्णुपत्नि नमस्तुभ्यम्', pauseAfterMs: 380 }, { say: 'पादस्पर्शम् क्षमस्व मे' }],
      pauseAfterMs: 0,
    },
  ],
  translation:
    'O Goddess whose garment is the ocean and whose bosom is the mountain ranges, O consort of Viṣṇu — I bow to you. Forgive me for touching you with my feet.',
  wordMeanings: [
    ['समुद्रवसने', 'samudra-vasane', 'O you whose garment (vasana) is the ocean (samudra) — vocative'],
    ['देवि', 'devi', 'O Goddess'],
    ['पर्वतस्तनमण्डले', 'parvata-stana-maṇḍale', 'O you whose bosom (stana-maṇḍala) is the mountains (parvata)'],
    ['विष्णुपत्नि', 'viṣṇu-patni', 'O consort of Viṣṇu'],
    ['नमस्तुभ्यम्', 'namas tubhyam', 'salutation to you'],
    ['पादस्पर्शम्', 'pāda-sparśam', 'the touch (sparśa) of my foot (pāda)'],
    ['क्षमस्व मे', 'kṣamasva me', 'forgive me — √kṣam, imperative 2nd sg. (ātmanepada)'],
  ],
};

export const VASUNDHARA_MRTTIKA: MantraText = {
  id: 'vasundhara-mrttika',
  titleDevanagari: 'वसुन्धरा-मृत्तिका-मन्त्रः',
  titleEnglish: 'Vasundharā & Mṛttikā · Walking On and Taking Up the Earth',
  source: 'Taittirīya Āraṇyaka 10.1 (Mahānārāyaṇa Upaniṣad)',
  lines: [
    {
      devanagari: 'अश्वक्रान्ते रथक्रान्ते विष्णुक्रान्ते वसुन्धरे ।',
      iast: 'aśvakrānte rathakrānte viṣṇukrānte vasundhare |',
      meaning: 'O Vasundharā, trodden by horses, by chariots, and by the strides of Viṣṇu,',
      steps: [{ say: 'अश्वक्रान्ते रथक्रान्ते', pauseAfterMs: 320 }, { say: 'विष्णुक्रान्ते वसुन्धरे' }],
      pauseAfterMs: 700,
    },
    {
      devanagari: 'शिरसा धारयिष्यामि रक्षस्व मां पदे पदे ॥',
      iast: 'śirasā dhārayiṣyāmi rakṣasva māṃ pade pade ||',
      meaning: 'I shall bear you upon my head — protect me at every step.',
      steps: [{ say: 'शिरसा धारयिष्यामि', pauseAfterMs: 320 }, { say: 'रक्षस्व माम् पदे पदे' }],
      pauseAfterMs: 1200,
    },
    {
      devanagari: 'मृत्तिके हन मे पापं यन्मया दुष्कृतं कृतम् ।',
      iast: 'mṛttike hana me pāpaṃ yanmayā duṣkṛtaṃ kṛtam |',
      meaning: 'O Earth, strike away the wrong that I have done.',
      steps: [{ say: 'मृत्तिके हन मे पापम्', pauseAfterMs: 320 }, { say: 'यन्मया दुष्कृतम् कृतम्' }],
      pauseAfterMs: 700,
    },
    {
      devanagari: 'मृत्तिके ब्रह्मदत्तासि काश्यपेनाभिमन्त्रिता ।',
      iast: 'mṛttike brahmadattāsi kāśyapenābhimantritā |',
      meaning: 'O Earth, you are Brahmā’s gift, consecrated by Kāśyapa.',
      steps: [{ say: 'मृत्तिके ब्रह्मदत्तासि', pauseAfterMs: 320 }, { say: 'काश्यपेनाभिमन्त्रिता' }],
      pauseAfterMs: 700,
    },
    {
      devanagari: 'मृत्तिके देहि मे पुष्टिं त्वयि सर्वं प्रतिष्ठितम् ॥',
      iast: 'mṛttike dehi me puṣṭiṃ tvayi sarvaṃ pratiṣṭhitam ||',
      meaning: 'O Earth, grant me nourishment — in you everything is established.',
      steps: [{ say: 'मृत्तिके देहि मे पुष्टिम्', pauseAfterMs: 320 }, { say: 'त्वयि सर्वम् प्रतिष्ठितम्' }],
      pauseAfterMs: 0,
    },
  ],
  translation:
    'O Vasundharā, trodden by horses, chariots and the strides of Viṣṇu — I shall bear you upon my head; protect me at every step. O Earth, strike away the wrong I have done. You are Brahmā’s gift, consecrated by Kāśyapa. Grant me nourishment; in you everything is established.',
};

export const ISHAVASYA_1: MantraText = {
  id: 'ishavasya',
  titleDevanagari: 'ईशावास्योपनिषत् · प्रथमो मन्त्रः',
  titleEnglish: 'Īśāvāsya 1 · Tena Tyaktena Bhuñjīthāḥ — Use Without Seizing',
  source: 'Īśāvāsya Upaniṣad 1 (Śukla Yajurveda 40.1)',
  lines: [
    {
      devanagari: 'ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।',
      iast: 'īśā vāsyam idaṃ sarvaṃ yat kiñca jagatyāṃ jagat |',
      meaning: 'All this — whatever moves in this moving world — is to be pervaded by the Lord.',
      steps: [{ say: 'ईशा वास्यमिदम् सर्वम्', pauseAfterMs: 320 }, { say: 'यत्किञ्च जगत्याम् जगत्' }],
      pauseAfterMs: 700,
    },
    {
      devanagari: 'तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥',
      iast: 'tena tyaktena bhuñjīthā mā gṛdhaḥ kasyasvid dhanam ||',
      meaning: 'Enjoy through that letting-go; do not covet — whose, after all, is wealth?',
      steps: [{ say: 'तेन त्यक्तेन भुञ्जीथा', pauseAfterMs: 380 }, { say: 'मा गृधः कस्यस्विद्धनम्' }],
      pauseAfterMs: 0,
    },
  ],
  translation:
    'All this, whatever moves in the moving world, is pervaded by the Lord. Enjoy by letting go; do not seize — whose, indeed, is wealth?',
};

export const DYAUH_SHANTI: MantraText = {
  id: 'dyauh-shanti',
  titleDevanagari: 'ॐ द्यौः शान्तिः',
  titleEnglish: 'Dyauḥ Śāntiḥ · The Universal Cosmic Peace',
  source: 'Śukla Yajurveda (Vājasaneyi Saṃhitā) 36.17',
  lines: [
    {
      devanagari: 'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः',
      iast: 'oṃ dyauḥ śāntir antarikṣaṃ śāntiḥ',
      meaning: 'Oṃ. Peace in the sky; peace in the mid-space;',
      steps: [OM, { say: 'द्यौः शान्तिः', pauseAfterMs: 300 }, { say: 'अन्तरिक्षम् शान्तिह' }],
      pauseAfterMs: 500,
    },
    {
      devanagari: 'पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः ।',
      iast: 'pṛthivī śāntir āpaḥ śāntir oṣadhayaḥ śāntiḥ |',
      meaning: 'peace on the earth; peace in the waters; peace in the healing herbs;',
      steps: [{ say: 'पृथिवी शान्तिः', pauseAfterMs: 300 }, { say: 'आपः शान्तिः', pauseAfterMs: 300 }, { say: 'ओषधयः शान्तिह' }],
      pauseAfterMs: 700,
    },
    {
      devanagari: 'वनस्पतयः शान्तिर्विश्वे देवाः शान्तिर्ब्रह्म शान्तिः',
      iast: 'vanaspatayaḥ śāntir viśve devāḥ śāntir brahma śāntiḥ',
      meaning: 'peace in the trees; peace in all the divine powers; peace in Brahman;',
      steps: [{ say: 'वनस्पतयः शान्तिः', pauseAfterMs: 300 }, { say: 'विश्वे देवाः शान्तिः', pauseAfterMs: 300 }, { say: 'ब्रह्म शान्तिह' }],
      pauseAfterMs: 500,
    },
    {
      devanagari: 'सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥',
      iast: 'sarvaṃ śāntiḥ śāntir eva śāntiḥ sā mā śāntir edhi ||',
      meaning: 'peace in everything; peace itself, peace — may that peace come to me.',
      steps: [{ say: 'सर्वम् शान्तिः', pauseAfterMs: 300 }, { say: 'शान्तिरेव शान्तिः', pauseAfterMs: 380 }, { say: 'सा मा शान्तिरेधि' }],
      pauseAfterMs: 1200,
    },
    {
      devanagari: 'ॐ शान्तिः शान्तिः शान्तिः ॥',
      iast: 'oṃ śāntiḥ śāntiḥ śāntiḥ ||',
      meaning: 'Oṃ. Peace, peace, peace.',
      steps: [OM, SHANTI, SHANTI, { ...SHANTI, rateFactor: 0.9, pauseAfterMs: 0 }],
      pauseAfterMs: 0,
    },
  ],
  translation:
    'Peace in the sky, in the mid-space, on the earth, in the waters, in the herbs, in the trees, in all the divine powers, in Brahman — peace in everything, peace itself. May that peace be mine. Oṃ, peace, peace, peace.',
  wordMeanings: [
    ['द्यौः', 'dyauḥ', 'the sky, the heavens'],
    ['अन्तरिक्षम्', 'antarikṣam', 'the mid-space, the atmosphere between earth and sky'],
    ['पृथिवी', 'pṛthivī', 'the earth'],
    ['आपः', 'āpaḥ', 'the waters'],
    ['ओषधयः', 'oṣadhayaḥ', 'healing herbs, plants'],
    ['वनस्पतयः', 'vanaspatayaḥ', 'forest trees'],
    ['विश्वे देवाः', 'viśve devāḥ', 'all the divine powers'],
    ['ब्रह्म', 'brahma', 'Brahman, the ground of all'],
    ['सर्वम्', 'sarvam', 'everything'],
    ['एव', 'eva', 'itself, indeed'],
    ['सा', 'sā', 'that (peace)'],
    ['मा', 'mā', 'to me (accusative of asmad — not the prohibitive mā)'],
    ['एधि', 'edhi', 'may (it) be / come — √as, imperative 2nd sg.'],
  ],
};

/** Mantras rendered by the course “Mantras & Ślokas” unit (सह नाववतु lives in the Prologue). */
export const MANTRAS_BY_ID: Record<string, MantraText> = {
  [SAHA_NAVAVATU.id]: SAHA_NAVAVATU,
  [BHUMI_VANDANAM.id]: BHUMI_VANDANAM,
  [VASUNDHARA_MRTTIKA.id]: VASUNDHARA_MRTTIKA,
  [ISHAVASYA_1.id]: ISHAVASYA_1,
  [DYAUH_SHANTI.id]: DYAUH_SHANTI,
};

/** Course deep link to the Mantras & Ślokas unit. */
export const MANTRAS_ADDENDUM_ID = 'addendum-mantras-shlokas';
export const MANTRAS_COURSE_HASH = 'mantras';
