/**
 * Sealed Analyse glosses from public/analyse.json (English + regional).
 * Grow this file word-by-word; never invent Telugu/Kannada here in code.
 */
export type AnalyseLangGloss = {
  label: string;
  meaning: string;
  sentence_sanskrit?: string;
  sentence_translation?: string;
};

export type AnalyseEntry = {
  word: string;
  base_english: string;
  languages?: Record<string, AnalyseLangGloss>;
  /** Sanskrit paraphrase from शब्दार्थ (e.g. उत्थानं कृत्वा) */
  sanskrit_gloss?: string;
  /** Morph notes from मूल रूप / व्याकरण */
  grammar?: string;
  etymology?: string;
};

export type AnalyseRegistry = Record<string, AnalyseEntry>;

let cached: AnalyseRegistry | null = null;
let inflight: Promise<AnalyseRegistry> | null = null;

export const loadAnalyseGlosses = async (): Promise<AnalyseRegistry> => {
  if (cached) return cached;
  const base = import.meta.env.BASE_URL || '/';
  const url = `${base.endsWith('/') ? base : base + '/'}analyse.json?t=${Date.now()}`;
  inflight = fetch(url)
    .then(async (response) => {
      if (!response.ok) return {};
      const data = (await response.json()) as AnalyseRegistry;
      cached = data && typeof data === 'object' ? data : {};
      return cached;
    })
    .catch(() => {
      cached = {};
      return cached;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
};

const ORDINAL_MAP: Record<number, string> = {
  1: '1st / First',
  2: '2nd / Second',
  3: '3rd / Third',
  4: '4th / Fourth',
  5: '5th / Fifth',
  6: '6th / Sixth',
  7: '7th / Seventh',
  8: '8th / Eighth',
  9: '9th / Ninth',
  10: '10th / Tenth',
};

const CURRICULUM_GLOSS_EXTENSIONS: Record<string, { en: string; hi?: string; grammar?: string }> = {
  'किरातार्जुनीयम्': { en: 'Kiratarjuniyam (epic poem by Bharavi)', hi: 'किरातार्जुनीयम् महाकाव्य' },
  'कुमारसम्भवम्': { en: 'Kumarasambhavam (epic poem by Kalidasa)', hi: 'कुमारसम्भवम् महाकाव्य' },
  'पञ्चतन्त्रम्': { en: 'Panchatantra (fables by Vishnu Sharma)', hi: 'पञ्चतन्त्र नीतिग्रन्थ' },
  'उत्तररामचरितम्': { en: 'Uttararamacharitam (play by Bhavabhuti)', hi: 'उत्तररामचरितम् नाटक' },
  'नीतिशतकम्': { en: 'Nitisatakam (ethical hundred by Bhartrihari)', hi: 'नीतिशतकम् ग्रन्थ' },
  'भारवि': { en: 'Mahakavi Bharavi (classical poet)', hi: 'महाकवि भारवि' },
  'भारविणा': { en: 'By poet Bharavi', hi: 'भारवि द्वारा' },
  'कालिदास': { en: 'Mahakavi Kalidasa (celebrated poet)', hi: 'महाकवि कालिदास' },
  'कालिदासेन': { en: 'By poet Kalidasa', hi: 'कालिदास द्वारा' },
  'भवभूति': { en: 'Bhavabhuti (eminent dramatist)', hi: 'भवभूति' },
  'भवभूतिना': { en: 'By Bhavabhuti', hi: 'भवभूति द्वारा' },
  'विष्णुशर्मा': { en: 'Pandit Vishnu Sharma', hi: 'पण्डित विष्णुशर्मा' },
  'विष्णुशर्मणा': { en: 'By Pandit Vishnu Sharma', hi: 'विष्णुशर्मा द्वारा' },
  'भर्तृहरि': { en: 'King Bhartrihari of Ujjain', hi: 'राजा भर्तृहरि' },
  'भर्तृहरिणा': { en: 'By King Bhartrihari', hi: 'भर्तृहरि द्वारा' },
  'महाकवि': { en: 'Great poet / Mahakavi', hi: 'महान् कवि' },
  'महाकाव्यम्': { en: 'Epic poem / Mahakavya', hi: 'महाकाव्य' },
  'महाकाव्य': { en: 'Epic poem / Mahakavya', hi: 'महाकाव्य' },
  'नाटकम्': { en: 'Drama / famous play', hi: 'नाटक' },
  'नाटक': { en: 'Drama / play', hi: 'नाटक' },
  'श्लोकसंग्रहः': { en: 'Collection of couplets/verses', hi: 'श्लोकों का संग्रह' },
  'श्लोकसंग्रह': { en: 'Collection of couplets/verses', hi: 'श्लोकों का संग्रह' },
  'नीतिग्रन्थः': { en: 'Treatise on ethics / conduct', hi: 'नीति ग्रन्थ' },
  'नीतिग्रन्थ': { en: 'Treatise on ethics / conduct', hi: 'नीति ग्रन्थ' },
  'विरचितं': { en: 'Composed / written', hi: 'रचित' },
  'विरचित': { en: 'Composed / written', hi: 'रचित' },
  'विरचितः': { en: 'Composed / written', hi: 'रचित' },
  'रचितं': { en: 'Written / authored', hi: 'रचित' },
  'प्रणीतः': { en: 'Composed / authored', hi: 'प्रणीत' },
  'वर्णितम्': { en: 'Described / depicted', hi: 'वर्णित' },
  'वर्णित': { en: 'Described / depicted', hi: 'वर्णित' },
  'चित्रितम्': { en: 'Portrayed / depicted', hi: 'चित्रित' },
  'बृहत्त्रयी': { en: 'Brihat-trayi (Great Epic Trio)', hi: 'बृहत्त्रयी' },
  'बृहत्त्रयी-अन्तर्गतं': { en: 'Belonging to the Brihat-trayi', hi: 'बृहत्त्रयी में सम्मिलित' },
  'किरातवेषधारिन्': { en: 'Disguised as Kirata hunter', hi: 'किरात रूपधारी' },
  'किरातवेषधारिणः': { en: 'Of Lord Shiva disguised as hunter', hi: 'किरातवेषधारी शिव का' },
  'किरात': { en: 'Kirata hunter / Lord Shiva', hi: 'किरात शिकारी' },
  'पाशुपतास्त्र': { en: 'Pashupatastra (celestial weapon)', hi: 'पाशुपतास्त्र' },
  'पाशुपतास्त्रप्राप्तये': { en: 'For obtaining the Pashupatastra', hi: 'पाशुपतास्त्र की प्राप्ति हेतु' },
  'प्राप्तये': { en: 'For obtaining / attaining', hi: 'प्राप्ति के लिए' },
  'प्राप्ति': { en: 'Attainment / acquisition', hi: 'प्राप्ति' },
  'युद्धं': { en: 'Duel / celestial battle', hi: 'युद्ध' },
  'युद्ध': { en: 'Duel / battle', hi: 'युद्ध' },
  'मध्यं': { en: 'Between / in the midst', hi: 'के बीच' },
  'मध्य': { en: 'Between / amidst', hi: 'मध्य' },
  'श्रीरामस्य': { en: 'Of Lord Rama', hi: 'श्रीराम का' },
  'शिवस्य': { en: 'Of Lord Shiva', hi: 'भगवान् शिव का' },
  'अर्जुनस्य': { en: 'Of Pandava Arjuna', hi: 'अर्जुन का' },
  'कार्तिकेयस्य': { en: 'Of Lord Kartikeya', hi: 'कार्तिकेय का' },
  'पार्वत्योः': { en: 'Of Parvati', hi: 'पार्वती का' },
  'दिव्यविवाहस्य': { en: 'Of celestial marriage', hi: 'दिव्य विवाह का' },
  'जन्मप्रसङ्गस्य': { en: 'Of the birth episode', hi: 'जन्म के प्रसंग का' },
  'मनोहरं': { en: 'Charming / beautiful', hi: 'सुन्दर' },
  'वर्णनम्': { en: 'Description / account', hi: 'वर्णन' },
  'व्यावहारिकनीतेः': { en: 'Of practical ethics/wisdom', hi: 'व्यावहारिक नीति की' },
  'शिक्षणं': { en: 'Teaching / education', hi: 'शिक्षा' },
  'दीयते': { en: 'Is given / imparted', hi: 'दी जाती है' },
  'राज्याभिषेकानन्तरं': { en: 'After royal coronation', hi: 'राज्याभिषेक के पश्चात्' },
  'करुणरसप्रधानं': { en: 'Dominated by pathos (Karuna Rasa)', hi: 'करुण रस प्रधान' },
  'जीवनस्य': { en: 'Of life', hi: 'जीवन का' },
  'चरितं': { en: 'Conduct / life story', hi: 'चरित्र' },
  'सदाचार': { en: 'Virtuous conduct / ethics', hi: 'उत्तम आचरण' },
  'मानवस्वभाव': { en: 'Human nature / psychology', hi: 'मानव स्वभाव' },
  'सम्बद्धाः': { en: 'Related / connected with', hi: 'सम्बन्धित' },
  'शतं': { en: 'A hundred (100)', hi: 'सौ' },
  'श्लोकाः': { en: 'Couplets / verses', hi: 'श्लोक' },
  'सन्ति': { en: 'Are / exist', hi: 'हैं' },
  'अस्ति': { en: 'Is / exists', hi: 'है' },
  'अस्मिन्': { en: 'In this', hi: 'इसमें' },
  'च': { en: 'And', hi: 'और' },
  'न': { en: 'Not / never', hi: 'नहीं' },
  'अपि': { en: 'Also / even', hi: 'भी' },
  'इति': { en: 'Thus / so', hi: 'ऐसा' },
  'साहित्यस्य': { en: 'Of literature', hi: 'साहित्य का' },
  'साहित्य': { en: 'Literature', hi: 'साहित्य' },
};

const makeEntry = (word: string, en: string, hi?: string, grammar?: string): AnalyseEntry => ({
  word,
  base_english: en,
  languages: {
    en: { label: 'English', meaning: en },
    ...(hi ? { hi: { label: 'हिन्दी', meaning: hi } } : {}),
  },
  ...(grammar ? { grammar } : {}),
});

export const lookupAnalyseGloss = (
  registry: AnalyseRegistry,
  devanagari: string,
): AnalyseEntry | undefined => {
  const raw = (devanagari || '').normalize('NFC').trim();
  if (!raw) return undefined;

  // Clean punctuation while preserving hyphenated compounds for fallback
  const key = raw.replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’—–०-९./\\=+#*~_`]+/g, '').trim();

  // 1. Check ordinal / numeral pattern (e.g. "१.", "६.", "2.", "6")
  const numMatch = raw.match(/^[०-९0-9]+/);
  if (numMatch) {
    const devDigits = '०१२३४५६७८९';
    let ascii = '';
    for (const ch of numMatch[0]) {
      const idx = devDigits.indexOf(ch);
      ascii += idx >= 0 ? idx : ch;
    }
    const val = Number(ascii);
    if (ORDINAL_MAP[val]) {
      return makeEntry(raw, ORDINAL_MAP[val], `${val}.`);
    }
  }

  // 2. Direct registry lookup
  if (key && registry[key]) return registry[key];
  if (raw && registry[raw]) return registry[raw];

  // 3. Curriculum extensions map
  if (key && CURRICULUM_GLOSS_EXTENSIONS[key]) {
    const ext = CURRICULUM_GLOSS_EXTENSIONS[key];
    return makeEntry(key, ext.en, ext.hi, ext.grammar);
  }
  if (raw && CURRICULUM_GLOSS_EXTENSIONS[raw]) {
    const ext = CURRICULUM_GLOSS_EXTENSIONS[raw];
    return makeEntry(raw, ext.en, ext.hi, ext.grammar);
  }

  if (!key) return undefined;

  // 4. Light fallback: strip or add trailing visarga (ः)
  if (key.endsWith('ः')) {
    const bare = key.slice(0, -1);
    if (registry[bare]) return registry[bare];
    if (CURRICULUM_GLOSS_EXTENSIONS[bare]) {
      const ext = CURRICULUM_GLOSS_EXTENSIONS[bare];
      return makeEntry(bare, ext.en, ext.hi, ext.grammar);
    }
  } else {
    const withV = key + 'ः';
    if (registry[withV]) return registry[withV];
    if (CURRICULUM_GLOSS_EXTENSIONS[withV]) {
      const ext = CURRICULUM_GLOSS_EXTENSIONS[withV];
      return makeEntry(withV, ext.en, ext.hi, ext.grammar);
    }
  }

  // 5. Fallback between anusvāra (ं) and halanta-m (म्)
  if (key.endsWith('ं')) {
    const withM = key.slice(0, -1) + 'म्';
    if (registry[withM]) return registry[withM];
    if (CURRICULUM_GLOSS_EXTENSIONS[withM]) {
      const ext = CURRICULUM_GLOSS_EXTENSIONS[withM];
      return makeEntry(withM, ext.en, ext.hi, ext.grammar);
    }
    const bare = key.slice(0, -1);
    if (registry[bare]) return registry[bare];
    if (CURRICULUM_GLOSS_EXTENSIONS[bare]) {
      const ext = CURRICULUM_GLOSS_EXTENSIONS[bare];
      return makeEntry(bare, ext.en, ext.hi, ext.grammar);
    }
  } else if (key.endsWith('म्')) {
    const withAnusvara = key.slice(0, -2) + 'ं';
    if (registry[withAnusvara]) return registry[withAnusvara];
    if (CURRICULUM_GLOSS_EXTENSIONS[withAnusvara]) {
      const ext = CURRICULUM_GLOSS_EXTENSIONS[withAnusvara];
      return makeEntry(withAnusvara, ext.en, ext.hi, ext.grammar);
    }
    const bare = key.slice(0, -2);
    if (registry[bare]) return registry[bare];
    if (CURRICULUM_GLOSS_EXTENSIONS[bare]) {
      const ext = CURRICULUM_GLOSS_EXTENSIONS[bare];
      return makeEntry(bare, ext.en, ext.hi, ext.grammar);
    }
  }

  // 6. Systematic Sanskrit Vibhakti / Stem stripping
  const candidateStems: string[] = [];
  if (key.endsWith('स्य')) candidateStems.push(key.slice(0, -3));
  if (key.endsWith('ेण')) candidateStems.push(key.slice(0, -2), key.slice(0, -2) + 'a');
  if (key.endsWith('िना')) candidateStems.push(key.slice(0, -3) + 'िन्', key.slice(0, -3) + 'ी');
  if (key.endsWith('िणा')) candidateStems.push(key.slice(0, -3) + 'ि', key.slice(0, -3) + 'िन्');
  if (key.endsWith('णा')) candidateStems.push(key.slice(0, -2), key.slice(0, -2) + 'ि', key.slice(0, -2) + 'न्', key.slice(0, -2) + 'ा');
  if (key.endsWith('ना')) candidateStems.push(key.slice(0, -2), key.slice(0, -2) + 'ि');
  if (key.endsWith('ाय')) candidateStems.push(key.slice(0, -2));
  if (key.endsWith('ये')) candidateStems.push(key.slice(0, -2) + 'ि', key.slice(0, -2));
  if (key.endsWith('योः')) candidateStems.push(key.slice(0, -3), key.slice(0, -3) + 'ा', key.slice(0, -3) + 'ी');
  if (key.endsWith('ाः')) candidateStems.push(key.slice(0, -2), key.slice(0, -2) + 'ः');
  if (key.endsWith('े')) candidateStems.push(key.slice(0, -1), key.slice(0, -1) + 'ि');
  if (key.endsWith('तः')) candidateStems.push(key.slice(0, -2));
  if (key.endsWith('िणः')) candidateStems.push(key.slice(0, -3) + 'िन्', key.slice(0, -3) + 'ी', key.slice(0, -3));

  for (const stem of candidateStems) {
    if (!stem) continue;
    if (registry[stem]) return registry[stem];
    if (CURRICULUM_GLOSS_EXTENSIONS[stem]) {
      const ext = CURRICULUM_GLOSS_EXTENSIONS[stem];
      return makeEntry(stem, ext.en, ext.hi, ext.grammar);
    }
  }

  // 7. Compound words separated by hyphens (e.g. महाकवि-भारविणा)
  if (raw.includes('-') || raw.includes('–') || raw.includes('—')) {
    const parts = raw.split(/[-–—]/).map((p) => p.trim()).filter(Boolean);
    // Prefer the head noun or last component, then the first
    for (const part of [...parts].reverse()) {
      const sub = lookupAnalyseGloss(registry, part);
      if (sub) return sub;
    }
  }

  // 8. Substring match for compound roots in CURRICULUM_GLOSS_EXTENSIONS
  for (const [stem, ext] of Object.entries(CURRICULUM_GLOSS_EXTENSIONS)) {
    if (stem.length >= 4 && key.includes(stem)) {
      return makeEntry(key, ext.en, ext.hi, ext.grammar);
    }
  }

  return undefined;
};

export const englishMeaningFromGloss = (entry: AnalyseEntry): string =>
  entry.languages?.en?.meaning?.trim() ||
  entry.base_english?.trim() ||
  (entry as unknown as { english?: string })?.english?.trim() ||
  '';

