export interface SanskritBulletPoint {
  sa: string;
  en: string;
}

export interface SanskritExplanation {
  titleSa: string;
  titleEn: string;
  takeawayQuote?: {
    sa: string;
    en: string;
  };
  sanskritText: string;
  englishTranslation: string;
  bulletPoints: SanskritBulletPoint[];
}

export const SANSKRIT_EXPLANATIONS: Record<string, SanskritExplanation> = {
  'evolution-of-sound': {
    titleSa: 'ध्वनेः विकासः — बोधि-व्याख्या',
    titleEn: "Bodhi's Sanskrit Explanation: The Evolution of Sound",
    takeawayQuote: {
      sa: 'नादेन व्यज्यते सर्वम्।',
      en: 'Through cosmic acoustic resonance, everything in creation is manifested.',
    },
    sanskritText:
      'अस्मिन् लेखे बोधिः कथयति यत् कथं मन्त्राणां शुद्धोच्चारणात् मानवकण्ठस्य पञ्च-स्थानानि — कण्ठः, तालु, मूर्धा, दन्ताः, ओष्ठौ च — सम्यक् ज्ञातानि। संस्कृतस्य मातृ-पितृ-भ्रातृ-शब्दाः एव विश्वस्य बह्वीषु भाषासु मातृभाषात्वेन प्रसृताः। पाणिनिना रचितं व्याकरणं केवलं भाषाशास्त्रं न, अपि तु सम्पूर्णं वैज्ञानिकं ध्वनि-विधानम् अस्ति।',
    englishTranslation:
      'In this article, Bodhi explains how the pursuit of pure Vedic mantra vibration mapped the five anatomical vocal points — throat, palate, roof of mouth, teeth, and lips. Ancient Sanskrit root words like Mātṛ, Pitṛ, and Bhrātṛ spread across the world as maternal roots in global languages. Pāṇini’s grammar is not merely linguistic rules, but an exact acoustic science.',
    bulletPoints: [
      {
        sa: 'पञ्च मुख-स्थानानि ध्वनेः उद्गम-मर्माणि सन्ति।',
        en: 'The 5 vocal positions form the anatomical origins of all speech sounds.',
      },
      {
        sa: 'मातृ, पितृ, भ्रातृ — एते शब्दाः विश्वभाषासु सजातीयाः (Cognates) वर्तन्ते।',
        en: 'Mātṛ, Pitṛ, and Bhrātṛ are the universal parents of global language roots.',
      },
      {
        sa: 'पाणिनीय-व्याकरणं ध्वनीनां कम्पनेन सह सम्बद्धम्।',
        en: "Pāṇini's grammar directly harmonizes with acoustic vibrations.",
      },
    ],
  },

  'ipa-secret-code': {
    titleSa: 'स्वर-रहस्यम् अन्ताराष्ट्रिय-वर्णमाला च — बोधि-व्याख्या',
    titleEn: "Bodhi's Sanskrit Explanation: The Secret Code of Accents",
    takeawayQuote: {
      sa: 'उच्चैरुदात्तः, नीचैरनुदात्तः, समाहारः स्वरितः।',
      en: 'High pitch is Udātta, low pitch is Anudātta, and balanced pitch is Svarita.',
    },
    sanskritText:
      'अत्र बोधिः उदात्त-अनुदात्त-स्वरित-भेदान् विवृणोति। यथा आधुनिके भाषाविज्ञाने अन्ताराष्ट्रिय-वर्णमाला (IPA) स्वरान् ध्वनींश्च मापयति, तथैव प्राचीन-प्रातिशाख्येषु कण्ठ-कम्पनं श्वास-प्रयत्नं च सूक्ष्मरूपेण निरूपितम्। संस्कृतस्य अक्षराणि यथा लिख्यन्ते, तथैव यथार्थतया उचार्यन्ते। स्वर-भेदेन अर्थोऽपि परिवर्तते।',
    englishTranslation:
      'Here Bodhi details the three Vedic tones: Udātta (high), Anudātta (low), and Svarita (circumflex). Just as modern linguistics uses the International Phonetic Alphabet (IPA) to map accents and vibrations, ancient Prātiśākhya texts precisely mapped breath velocity and vocal tract resonance millennia ago. Sanskrit sounds are pronounced exactly as written, where accent tone can illuminate deeper meanings.',
    bulletPoints: [
      {
        sa: 'उदात्तः, अनुदात्तः, स्वरितः च — एते त्रयः स्वराः वैदिक-मन्त्राणां प्राणभूताः।',
        en: 'Udātta, Anudātta, and Svarita are the rhythmic lifeblood of Vedic chant.',
      },
      {
        sa: 'प्रातिशाख्य-ग्रन्थाः आधुनिक-ध्वनिविज्ञानस्य मूल-भित्तिः।',
        en: 'Ancient Prātiśākhya texts laid the foundational blueprint for modern acoustic phonetics.',
      },
      {
        sa: 'संस्कृते यत् उच्चार्यते, तदेव यथार्थतया लिख्यते।',
        en: 'In Sanskrit, what is phonetically vocalized is precisely what is written.',
      },
    ],
  },

  'mouth-gym-shiva-sutras': {
    titleSa: 'माहेश्वर-सूत्राणि मुख-व्यायामः च — बोधि-व्याख्या',
    titleEn: "Bodhi's Sanskrit Explanation: Shiva Sutras & Pratyāhāras",
    takeawayQuote: {
      sa: 'नृत्तावसाने नटराजराजो ननाद ढक्कां नवपञ्चवारम्।',
      en: 'At the close of his cosmic dance, Shiva sounded his drum 14 times.',
    },
    sanskritText:
      "बोधेः मते शिवसूत्राणि नाम जिह्वायाः मुखस्य च दिव्यः व्यायामः। महेश्वरस्य डमरू-नादात् चतुर्दश-सूत्राणि प्रादुर्भूतानि। एभिः सूत्रैः पाणिनीयाः 'प्रत्याहाराः' रच्यन्ते — यथा 'अल्' इति शब्देन सम्पूर्ण-वर्णमाला, 'अच्' इति शब्देन सर्वे स्वराः, 'हल्' इति शब्देन च सर्वे व्यञ्जनानि संगृह्यन्ते। एषा एका ध्वनि-सङ्गणक-प्रणाली इव वर्तते।",
    englishTranslation:
      "Bodhi explains that the Shiva Sutras are divine gymnastics for the tongue and mouth. Fourteen sound aphorisms emerged from Lord Shiva’s Damaru. Through them, Pāṇini built 'Pratyāhāras' — algorithmic compression codes where 'Al' signifies the entire alphabet, 'Ac' codes all vowels, and 'Hal' codes all consonants. It functions just like modern computational indexing.",
    bulletPoints: [
      {
        sa: 'चतुर्दश-सूत्राणि ध्वनि-विज्ञानस्य गणितात्मक-सङ्केताः।',
        en: 'The 14 aphorisms serve as mathematical indices for all phonemes.',
      },
      {
        sa: 'प्रत्याहारैः विशालाः वर्ण-समूहाः लघु-रूपेण निर्दिश्यन्ते।',
        en: 'Pratyāhāras compress expansive sound categories into two-letter macros.',
      },
      {
        sa: 'जिह्वायाः कम्पनैः शुद्धोच्चारणस्य शक्तिः वर्धते।',
        en: 'Vocal tract articulation through the sutras sharpens mental clarity and speech rhythm.',
      },
    ],
  },

  'karakas-and-vibhaktis': {
    titleSa: 'कारकाणि विभक्तयः च — बोधि-व्याख्या',
    titleEn: "Bodhi's Sanskrit Explanation: The Kāraka Framework",
    takeawayQuote: {
      sa: 'क्रियान्वयि कारकम्।',
      en: 'That which directly connects with action is a Kāraka.',
    },
    sanskritText:
      'अस्मिन् लेखे बोधिः स्पष्टीकरोति यत् क्रियान्वयि कारकम्। कर्ता, कर्म, करणम्, सम्प्रदानम्, अपादानम्, अधिकरणम् इति षट् कारकाणि सन्ति। विभक्तयः शब्दानां भूमिकां निश्चिन्वन्ति, अतः वाक्ये पदानां स्थानं यत्र कुत्रापि स्यात्, अर्थः कदापि न परिवर्तते। एषा संस्कृतस्य पदक्रम-स्वातन्त्र्यस्य अदभुता शक्तिः।',
    englishTranslation:
      "Bodhi clarifies that a Kāraka is whatever directly connects with the verb's action. There are six fundamental kārakas: Agent, Object, Instrument, Recipient, Source, and Locus. Case suffixes tag each noun’s role, meaning word order can be completely scrambled without ever changing the sentence's meaning. This is Sanskrit's superpower of word-order freedom.",
    bulletPoints: [
      {
        sa: 'षट् कारकाणि साक्षात् क्रियया सह सम्बध्यन्ते।',
        en: 'The 6 kārakas plug directly into the verbal action of the sentence.',
      },
      {
        sa: 'अष्टौ विभक्तयः नामपदानां सम्बन्धं प्रकाशयन्ति।',
        en: 'The 8 case endings make explicit who does what to whom.',
      },
      {
        sa: 'पदक्रम-परिवर्तनेनापि वाक्यस्य अर्थः स्थिरः तिष्ठति।',
        en: 'Even when words scramble order, the semantic meaning stays perfectly intact.',
      },
    ],
  },

  'dna-of-sanskrit-dhatus': {
    titleSa: 'संस्कृतस्य मूलधातवः — बोधि-व्याख्या',
    titleEn: "Bodhi's Sanskrit Explanation: The DNA of Root Dhātus",
    takeawayQuote: {
      sa: 'उपसर्गेण धात्वर्थो बलादन्यत्र नीयते।',
      en: 'By a prefix, the root verb meaning is dynamically steered in fresh directions.',
    },
    sanskritText:
      "बोधिः कथयति यत् धातवः एव संस्कृतभाषायाः मूल-जीवाणवः (DNA)। प्रायशः द्विसहस्रं मूलधातवः दशसु गणेषु विभक्ताः। एकेन एव धातोः उपसर्गाणां संयोगात् विविधाः नूतनाः अर्थाः उत्पद्यन्ते — यथा 'हृ' धातोः प्रहारः, आहारः, संहारः, विहारः, परिहारः च भवन्ति। एकस्मात् धातोरपि शतशः शब्दाः प्ररोहन्ति।",
    englishTranslation:
      "Bodhi describes Dhātus as the genetic DNA of the Sanskrit language. Around 2,000 root verbs are classified into 10 Gaṇas (conjugation families). By attaching prefixes (Upasargas) to a single root, vastly different meanings blossom — from the root 'hṛ' come prahāra (strike), āhāra (food), saṃhāra (dissolution), vihāra (leisure), and parihāra (remedy).",
    bulletPoints: [
      {
        sa: 'द्विसहस्रं धातवः दशसु गणेषु संकलिताः।',
        en: 'About 2,000 verbal roots power every word across 10 conjugation classes.',
      },
      {
        sa: 'उपसर्ग-संयोगेन मूल-धातोः विचित्राः अर्थाः प्रस्फुटन्ति।',
        en: 'Prefixes unlock multifaceted semantic dimensions from single roots.',
      },
      {
        sa: 'भू, गम्, पठ्, दृश् — एते दैनन्दिन-जीवनस्य मुख्याः धातवः।',
        en: 'Roots like Bhū, Gam, Paṭh, and Dṛś form the backbone of daily expression.',
      },
    ],
  },

  'sandhi-how-sounds-join': {
    titleSa: 'सन्धि-विचारः — बोधि-व्याख्या',
    titleEn: "Bodhi's Sanskrit Explanation: How Sounds Join (Sandhi)",
    takeawayQuote: {
      sa: 'परः संनिकर्षः संहिता।',
      en: 'Close acoustic contact between sounds is Saṃhitā (junction).',
    },
    sanskritText:
      "अत्र बोधिः वर्ण-संयोग-विज्ञानं वर्णयति। 'परः संनिकर्षः संहिता' — यदा द्वयोः वर्णयोः अत्यन्तं सामीप्यं भवति, तदा तयोः स्वाभाविकः सन्धिः जायते। दीर्घ-गुण-वृद्धि-यण्-सन्धयः भाषणं सुमधुरं धाराप्रवाहि च कुर्वन्ति। सन्धिः मुखस्य आयासं न्यूनीकरोति, ध्वनिश्रवणं च आनन्दमयं विदधाति।",
    englishTranslation:
      "Here Bodhi details the science of sound coalescence. 'Paraḥ sannikarṣaḥ saṃhitā' — when two sounds meet in immediate temporal proximity, euphonic Sandhi naturally occurs. Rules like Dīrgha, Guṇa, Vṛddhi, and Yaṇ make speech effortless, melodious, and continuous, reducing vocal friction while pleasing the ear.",
    bulletPoints: [
      {
        sa: 'ध्वन्योः घनिष्ठ-सम्बन्धेन सन्धिः प्रवृत्तः भवति।',
        en: 'Sandhi arises when two vocal vibrations collide in seamless speech.',
      },
      {
        sa: 'स्वरसन्धिः, व्यञ्जनसन्धिः, विसर्गसन्धिः च त्रयः प्रमुखाः विभागाः।',
        en: 'Sandhi spans three categories: Vowel, Consonant, and Visarga junctions.',
      },
      {
        sa: 'सन्धिना भाषायाः प्रवाहः सङ्गीतमयः सौम्यश्च भवति।',
        en: 'Sandhi transforms spoken Sanskrit into a harmonious musical stream.',
      },
    ],
  },

  'secret-code-upsarg-pratyaya': {
    titleSa: 'उपसर्गाः प्रत्ययाः च — बोधि-व्याख्या',
    titleEn: "Bodhi's Sanskrit Explanation: Prefixes, Suffixes & Sup Codes",
    takeawayQuote: {
      sa: 'प्रादयः उपसर्गाः, सुप्तिङन्तं पदम्।',
      en: 'The 22 prefixes lead, and words are completed by Sup and Tiṅ markers.',
    },
    sanskritText:
      'बोधेः वचनानुसारम् उपसर्गाः प्रत्ययाः च शब्द-निर्माणस्य मन्त्र-सूत्राणि। द्वाविंशतिः उपसर्गाः धातोः पूर्वं युज्यन्ते, प्रत्ययाः च पश्चात्। कृदन्त-प्रत्ययाः क्रियातः नामपदानि रचयन्ति, तद्धिताः नामपदेभ्यः नूतनभावान् जनयन्ति, एकविंशतिः सुप्-प्रत्ययाः च नामपदानां विभक्तीः रूपयन्ति।',
    englishTranslation:
      'According to Bodhi, Upasargas and Pratyayas are the modular Lego-blocks of word generation. 22 standard prefixes attach in front of root verbs, while suffixes attach at the rear. Kṛdanta suffixes turn verbs into nouns, Taddhita suffixes derive new concepts from nouns, and the 21 Sup endings form the complete case declensions.',
    bulletPoints: [
      {
        sa: '२२ उपसर्गाः (प्र, परा, अप, सम् इत्यादयः) मूलभावं परिवर्तयन्ति।',
        en: 'The 22 prefixes (Pra, Parā, Apa, Sam, etc.) dynamically modify core ideas.',
      },
      {
        sa: 'कृदन्ताः क्रियाभ्यः, तद्धिताः च नामभ्यः उत्पद्यन्ते।',
        en: 'Kṛdanta derives from verbs; Taddhita builds secondary meaning from nouns.',
      },
      {
        sa: '२१ सुप्-प्रत्ययाः नामपदानां विभक्ति-रूपेषु प्रयुज्यन्ते।',
        en: 'The 21 Sup suffixes crystallize the 7 grammatical cases across singular, dual, and plural.',
      },
    ],
  },

  'sanskrit-symbols-punctuation': {
    titleSa: 'चिह्न-परिचयः — बोधि-व्याख्या',
    titleEn: "Bodhi's Sanskrit Explanation: Sacred Symbols & Punctuation",
    takeawayQuote: {
      sa: 'चिह्नं लिपेः भूषणम्।',
      en: 'Punctuation and diacritic marks are the jewels of the written script.',
    },
    sanskritText:
      'अस्मिन् लेखे बोधिः देवनागरी-लिप्याः मङ्गलमयानि चिह्नानि शिक्षयति। व्यञ्जनेषु स्वर-संयोगार्थं मात्राः प्रयुज्यन्ते। नासिका-ध्वनेः कृते अनुस्वारः (ं), श्वास-प्रतिध्वन्यर्थं विसर्गः (ः), शुद्ध-व्यञ्जनार्थं हलन्तः (्), वाक्य-समाप्तौ दण्डः (।), तथा च लुप्ताकारस्य कृते अवग्रहः (ऽ) उपयुज्यते।',
    englishTranslation:
      "In this article, Bodhi teaches the sacred punctuation and markings of the Devanagari script. Mātrās attach vowel sounds to consonants. The Anusvāra (ं) denotes nasal resonance, Visarga (ः) echoes unvoiced breath, Halanta (्) silences inherent vowels, the Daṇḍa (।) marks sentence completion, and Avagraha (ऽ) preserves elided 'a' vowels.",
    bulletPoints: [
      {
        sa: 'मात्राः व्यञ्जनेषु स्वर-शक्तिं योजयन्ति।',
        en: 'Mātrās activate consonants by infusing distinct vowel sounds.',
      },
      {
        sa: 'अनुस्वारः (ं) नासिकाम्, विसर्गः (ः) कण्ठ-प्रतिध्वनिं च ददाति।',
        en: 'Anusvāra directs resonance through the nose; Visarga echoes through the throat.',
      },
      {
        sa: 'दण्डः (।) पूर्णविरामः, अवग्रहः (ऽ) लुप्ताकारस्य स्मरकः।',
        en: 'The Daṇḍa concludes the thought; the Avagraha marks the silent footprint of dropped "a".',
      },
    ],
  },

  'linga-vachana-foundations': {
    titleSa: 'लिङ्गं वचनं च — बोधि-व्याख्या',
    titleEn: "Bodhi's Sanskrit Explanation: Gender & Number Foundations",
    takeawayQuote: {
      sa: 'यल्लिङ्गं यद्वचनं या च विभक्तिर्विशेष्यस्य।',
      en: 'Whatever the gender, number, and case of the noun, the adjective mirrors identically.',
    },
    sanskritText:
      "बोधिः बोधयति यत् संस्कृते त्रीणि लिङ्गानि — पुंल्लिङ्गम्, स्त्रीलिङ्गम्, नपुंसकलिङ्गम् — तथा च त्रीणि वचनानि — एकवचनम्, द्विवचनम्, बहुवचनम् च भवन्ति। द्वयोः वस्तुनोः कृते संस्कृते विशेषतया 'द्विवचनम्' अस्ति, यत् बह्वीषु भाषासु लुप्तम्। कर्तरि यत् लिङ्गं वचनं च भवति, तदेव विशेषणे क्रियापदे च अनुगच्छति।",
    englishTranslation:
      "Bodhi explains that Sanskrit possesses three genders (Masculine, Feminine, Neuter) and three grammatical numbers (Singular, Dual, Plural). For exactly two objects, Sanskrit preserves the elegant 'Dual' (Dvivacana), which has disappeared from most world languages. Adjectives and verbs mathematically mirror the subject's gender and number.",
    bulletPoints: [
      {
        sa: 'संस्कृते द्विवचनम् (Dual) द्वयोः वस्तुनोः कृते निश्चितम् अस्ति।',
        en: 'The Dual (Dvivacana) is an exact mathematical marker reserved for pairs.',
      },
      {
        sa: 'लिङ्गं केवलं प्रकृत्या न, अपि तु शब्दस्य व्याकरण-रूपेण निर्धार्यते।',
        en: 'Gender in Sanskrit is a grammatical property of the word itself, not just biological sex.',
      },
      {
        sa: 'कर्तृ-क्रिया-सम्बन्धः सर्वदा लिङ्गे वचने च समाहितः भवति।',
        en: 'Subject-verb syntactical harmony ensures absolute clarity in every phrase.',
      },
    ],
  },

  'understanding-vibhaktis-balaka': {
    titleSa: 'विभक्ति-बोधः बालक-शब्देन — बोधि-व्याख्या',
    titleEn: "Bodhi's Sanskrit Explanation: The 8 Cases of Bālaka",
    takeawayQuote: {
      sa: 'सुबन्तं पदम् — बालकः बालको बालकाः।',
      en: 'A completed noun declines across all three numbers in harmonious cases.',
    },
    sanskritText:
      "अत्र बोधिः 'बालक' शब्दस्य उदाहरणम् उपस्थाप्य अष्टौ विभक्तीः सरलं कारयति। प्रथमा कर्त्रे (बालकः), द्वितीया कर्मणे (बालकम्), तृतीया साधने (बालकेन), चतुर्थी प्रयोजनाय (बालकाय), पञ्चमी पृथग्भावाय (बालकात्), षष्ठी सम्बन्धे (बालकस्य), सप्तमी स्थानाय (बालके), तथा च सम्बोधने 'हे बालक' इति ज्ञायते।",
    englishTranslation:
      "Here Bodhi makes the 8 Vibhaktis crystal clear through the classic archetype of 'Bālaka'. 1st is the agent (bālakaḥ), 2nd the object (bālakam), 3rd the instrument (bālakena), 4th the purpose (bālakāya), 5th the source of separation (bālakāt), 6th the relation (bālakasya), 7th the location (bālake), and 8th the calling address (he bālaka!).",
    bulletPoints: [
      {
        sa: 'अष्टौ विभक्तयः नामपदस्य सम्पूर्ण-कार्याणि निर्वहन्ति।',
        en: 'The 8 case endings handle every conceivable relational role for nouns.',
      },
      {
        sa: 'बालक-शब्देन अकारान्त-पुंल्लिङ्ग-रूपाणां कण्ठस्थीकरणं सुलभम्।',
        en: 'The Bālaka paradigm unlocks hundreds of similar masculine "a"-ending nouns.',
      },
      {
        sa: 'प्रत्येकं रूपं कारकस्य गभीरम् अर्थं स्पष्टीकरोति।',
        en: 'Each inflection instantly clarifies who performs, who receives, and who benefits.',
      },
    ],
  },

  'katapayadi-number-words': {
    titleSa: 'कटपयादि-संख्या-शास्त्रम् — बोधि-व्याख्या',
    titleEn: "Bodhi's Sanskrit Explanation: Sacred Mathematical Cipher",
    takeawayQuote: {
      sa: 'अङ्कानां वामतो गतिः — कादिर्नव टादिर्नव।',
      en: 'Digits flow from right to left; Ka to Jha and Ṭa to Dha code digits 1 through 9.',
    },
    sanskritText:
      "बोधिः विस्मयकारीं कटपयादि-संख्या-पद्धतिं प्रकाशयति। 'कादिर्नव टादिर्नव पादिपञ्चकम् याद्यष्टकम्' — एतेन सूत्रेण अक्षरेभ्यः १ तः ९ पर्यन्तं शून्यान्ताः अङ्काः निर्दिश्यन्ते। 'अङ्कानां वामतो गतिः' नियमेन 'गोपीभाग्यमधुव्रातः' इति श्लोके पाई (π) संख्यायाः द्वात्रिंशत् दशांश-स्थानानि संगुप्तानि सन्ति!",
    englishTranslation:
      "Bodhi illuminates the astonishing Kaṭapayādi alphanumeric cipher. Through the mnemonic rule 'Kādirnava Ṭādirnava Pādipañcakam Yādyaṣṭakam', consonants encode digits 1 to 9 and zero. Read right-to-left ('Aṅkānāṃ Vāmato Gatiḥ'), the devotional hymn 'Gopībhāgyamadhuvrātaḥ' secretly encrypts the value of Pi (π) to 32 decimal places!",
    bulletPoints: [
      {
        sa: 'कादि, टादि, पादि, यादि — एभिः व्यञ्जनैः अङ्काः निर्मीयन्ते।',
        en: 'The four consonant groupings map systematically to digits 1 to 9 and 0.',
      },
      {
        sa: 'गोपीभाग्य-श्लोकः पाई (π) संख्यायाः ३२ स्थानानि कण्ठस्थानि करोति।',
        en: 'The sacred hymn preserves 32 decimal places of Pi (π) in chantable verse.',
      },
      {
        sa: 'कर्नाटक-सङ्गीतस्य ७२ मेलकर्ता-रागाणाम् नामानि अनेनैव निर्धारितानि।',
        en: 'The names of all 72 Melakarta parent ragas in Carnatic music are encoded with this cipher.',
      },
    ],
  },
};
