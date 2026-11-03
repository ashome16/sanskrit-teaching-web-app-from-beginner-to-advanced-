/**
 * Indic Word Dictionary for Sanskrit Educational App
 * Provides native meanings and glosses across 6 major Indian regional languages:
 * Telugu (తెలుగు), Tamil (தமிழ்), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം),
 * Gujarati (ગુજરાતી), and Bengali (বাংলা), alongside Hindi (हिन्दी) and English.
 */

export interface IndicMeaningEntry {
  en: string;
  hi: string;
  te?: string;
  ta?: string;
  kn?: string;
  ml?: string;
  gu?: string;
  bn?: string;
  grammar?: string;
  [key: string]: string | undefined;
}

export const INDIC_WORD_DICTIONARY: Record<string, IndicMeaningEntry> = {
  // Numerals (संख्याः)
  'एकम्': {
    en: 'One (neuter)',
    hi: 'एक',
    te: 'ఒకటి (okaṭi)',
    ta: 'ஒன்று (oṉṟu)',
    kn: 'ಒಂದು (ondu)',
    ml: 'ഒന്ന് (onn‌)',
    gu: 'એક (ēk)',
    bn: 'এক (ēk)',
    grammar: 'Numeral, n.'
  },
  'एकः': {
    en: 'One (masculine)',
    hi: 'एक (पुंल्लिंग)',
    te: 'ఒకడు (okadu)',
    ta: 'ஒருவன் (oruvaṉ)',
    kn: 'ಒಬ್ಬ (obba)',
    ml: 'ഒരാൾ (orāḷ)',
    gu: 'એક (ēk)',
    bn: 'এক (ēk)',
    grammar: 'Numeral, m.'
  },
  'एका': {
    en: 'One (feminine)',
    hi: 'एक (स्त्रीलिंग)',
    te: 'ఒకతె / ఒక్కరు (okate)',
    ta: 'ஒருத்தி (orutti)',
    kn: 'ಒಬ್ಬಳು (obbaḷu)',
    ml: 'ഒരുത്തി (orutti)',
    gu: 'એક (ēk)',
    bn: 'এক (ēk)',
    grammar: 'Numeral, f.'
  },
  'द्वे': {
    en: 'Two (feminine/neuter)',
    hi: 'दो',
    te: 'రెండు (reṇḍu)',
    ta: 'இரண்டு (iraṇṭu)',
    kn: 'ಎರಡು (eraḍu)',
    ml: 'രണ്ട് (raṇḍ‌)',
    gu: 'બે (bē)',
    bn: 'দুই (dui)',
    grammar: 'Numeral, dual'
  },
  'द्वौ': {
    en: 'Two (masculine)',
    hi: 'दो (पुंल्लिंग)',
    te: 'ఇద్దరు (iddaru)',
    ta: 'இருவர் (iruvar)',
    kn: 'ಇಬ್ಬರು (ibbaru)',
    ml: 'രണ്ടുപേർ (raṇḍupēr)',
    gu: 'બે (bē)',
    bn: 'দুই (dui)',
    grammar: 'Numeral, m. dual'
  },
  'त्रीणि': {
    en: 'Three (neuter)',
    hi: 'तीन',
    te: 'మూడు (mūḍu)',
    ta: 'மூன்று (mūṉṟu)',
    kn: 'ಮೂರು (mūru)',
    ml: 'മൂന്ന് (mūnn‌)',
    gu: 'ત્રણ (traṇ)',
    bn: 'তিন (tin)',
    grammar: 'Numeral, n.'
  },
  'त्रयः': {
    en: 'Three (masculine)',
    hi: 'तीन (पुंल्लिंग)',
    te: 'ముగ్గురు (mugguru)',
    ta: 'மூவர் (mūvar)',
    kn: 'ಮೂವರು (mūvaru)',
    ml: 'മൂന്നുപേർ (mūnnupēr)',
    gu: 'ત્રણ (traṇ)',
    bn: 'তিন (tin)',
    grammar: 'Numeral, m.'
  },
  'तिस्रः': {
    en: 'Three (feminine)',
    hi: 'तीन (स्त्रीलिंग)',
    te: 'ముగ్గురు (స్త్రీలు)',
    ta: 'மூவர் (பெண்கள்)',
    kn: 'ಮೂವರು (ಸ್ತ್ರೀಯರು)',
    ml: 'മൂന്നുപേർ (സ്ത്രീകൾ)',
    gu: 'ત્રણ (સ્ત્રીઓ)',
    bn: 'তিন (স্ত্রী)',
    grammar: 'Numeral, f.'
  },
  'चत्वारि': {
    en: 'Four (neuter)',
    hi: 'चार (नपुंसकलिंग)',
    te: 'నాలుగు (nālugu)',
    ta: 'நான்கு (nāṉku)',
    kn: 'ನಾಲ್ಕು (nālku)',
    ml: 'നാല് (nāl‌)',
    gu: 'ચાર (chār)',
    bn: 'চার (chār)',
    grammar: 'Numeral, n., nom./acc.'
  },
  'चत्वारः': {
    en: 'Four (masculine)',
    hi: 'चार (पुंल्लिंग)',
    te: 'నలుగురు (naluguru)',
    ta: 'நால்வர் (nālvar)',
    kn: 'ನಾಲ್ವರು (nālvaru)',
    ml: 'നാലുപേർ (nālupēr)',
    gu: 'ચાર (પુરુષો)',
    bn: 'চার (পুরুষ)',
    grammar: 'Numeral, m.'
  },
  'चतस्रः': {
    en: 'Four (feminine)',
    hi: 'चार (स्त्रीलिंग)',
    te: 'నలుగురు (స్త్రీలు)',
    ta: 'நால்வர் (பெண்கள்)',
    kn: 'ನಾಲ್ವರು (ಸ್ತ್ರೀಯರು)',
    ml: 'നാലുപേർ (സ്ത്രീകൾ)',
    gu: 'ચાર (સ્ત્રીઓ)',
    bn: 'চার (স্ত্রী)',
    grammar: 'Numeral, f.'
  },
  'पञ्च': {
    en: 'Five',
    hi: 'पाँच',
    te: 'ఐదు (aidu)',
    ta: 'ஐந்து (aintu)',
    kn: 'ಐದು (aidu)',
    ml: 'അഞ്ച് (añc‌)',
    gu: 'પાંચ (pā̃ch)',
    bn: 'পাঁচ (pā̃ch)',
    grammar: 'Numeral'
  },
  'षट्': {
    en: 'Six',
    hi: 'छह',
    te: 'ఆరు (āru)',
    ta: 'ஆறு (āṟu)',
    kn: 'ಆರು (āru)',
    ml: 'ആറ് (āṟ‌)',
    gu: 'છ (chha)',
    bn: 'ছয় (chhay)',
    grammar: 'Numeral'
  },
  'सप्त': {
    en: 'Seven',
    hi: 'सात',
    te: 'ఏడు (ēḍu)',
    ta: 'ஏழு (ēḻu)',
    kn: 'ಏಳು (ēḷu)',
    ml: 'ഏഴ് (ēḻ‌)',
    gu: 'સાત (sāt)',
    bn: 'সাত (sāt)',
    grammar: 'Numeral'
  },
  'अष्ट': {
    en: 'Eight',
    hi: 'आठ',
    te: 'ఎనిమిది (enimidi)',
    ta: 'எட்டு (eṭṭu)',
    kn: 'ಎಂಟು (eṇṭu)',
    ml: 'എട്ട് (eṭṭ‌)',
    gu: 'આઠ (āṭh)',
    bn: 'আট (āṭ)',
    grammar: 'Numeral'
  },
  'नव': {
    en: 'Nine',
    hi: 'नौ',
    te: 'తొమ్మిది (tommidi)',
    ta: 'ஒன்பது (oṉpatu)',
    kn: 'ಒಂಬತ್ತು (ombattu)',
    ml: 'ഒമ്പത് (ompat‌)',
    gu: 'નવ (nav)',
    bn: 'নয় (nay)',
    grammar: 'Numeral'
  },
  'दश': {
    en: 'Ten',
    hi: 'दस',
    te: 'పది (padi)',
    ta: 'பத்து (pattu)',
    kn: 'ಹತ್ತು (hattu)',
    ml: 'പത്ത് (patt‌)',
    gu: 'દસ (das)',
    bn: 'দশ (dash)',
    grammar: 'Numeral'
  },
  'शतम्': {
    en: 'One hundred (100)',
    hi: 'सौ (१००)',
    te: 'నూరు / వంద (vanda)',
    ta: 'நூறு (nūṟu)',
    kn: 'ನೂರು (nūru)',
    ml: 'നൂറ് (nūṟ‌)',
    gu: 'સો (sō)',
    bn: 'একশত (ēk-shat)',
    grammar: 'Numeral, n.'
  },
  'सहस्रम्': {
    en: 'One thousand (1000)',
    hi: 'हज़ार (१०००)',
    te: 'వెయ్యి (veyyi)',
    ta: 'ஆயிரம் (āyiram)',
    kn: 'ಸಾವಿರ (sāvira)',
    ml: 'ആയിരം (āyiram)',
    gu: 'હજાર (hajār)',
    bn: 'এক হাজার (hājār)',
    grammar: 'Numeral, n.'
  },

  // Deepakam Shloka 4 Core Vocabulary
  'विद्या': {
    en: 'Learning / Knowledge / Sacred Science',
    hi: 'विद्या / ज्ञान / शिक्षा',
    te: 'విద్య, చదువు, జ్ఞానము (vidya)',
    ta: 'கல்வி, வித்தை (kalvi)',
    kn: 'ವಿದ್ಯೆ, ಜ್ಞಾನ (vidye)',
    ml: 'വിദ്യ, വിദ്യാഭ്യാസം (vidya)',
    gu: 'વિદ્યા, ભણતર (vidyā)',
    bn: 'বিদ্যা, জ্ঞান (bidyā)',
    grammar: 'Noun, f.'
  },
  'तपः': {
    en: 'Penance / Austerity / Spiritual discipline',
    hi: 'तपस्या / साधना',
    te: 'తపస్సు, సాధన (tapassu)',
    ta: 'தவம், தவமுயற்சி (tavam)',
    kn: 'ತಪಸ್ಸು, ಸಾಧನೆ (tapassu)',
    ml: 'തപസ്സ് (tapass‌)',
    gu: 'તપસ્યા (tapasyā)',
    bn: 'তপস্যা (tapasyā)',
    grammar: 'Noun, n.'
  },
  'दानम्': {
    en: 'Charity / Generosity / Gift of giving',
    hi: 'दान / परोपकार',
    te: 'దానము, ఈవి (dānamu)',
    ta: 'ஈகை, தானம் (dānam)',
    kn: 'ದಾನ, ದಾನಧರ್ಮ (dāna)',
    ml: 'ദാനം (dānam)',
    gu: 'દાન, સખાવત (dān)',
    bn: 'দান, দানশীলতা (dān)',
    grammar: 'Noun, n.'
  },
  'ज्ञानम्': {
    en: 'Wisdom / True perception / Spiritual intellect',
    hi: 'ज्ञान / समझ / बोध',
    te: 'జ్ఞానము, వివేకము (jñānamu)',
    ta: 'ஞானம், பேரறிவு (ñāṉam)',
    kn: 'ಜ್ಞಾನ, ವಿವೇಕ (jñāna)',
    ml: 'ജ്ഞാനം (jñānam)',
    gu: 'જ્ઞાન, સમજણ (jñān)',
    bn: 'জ্ঞান, বোধ (jñān)',
    grammar: 'Noun, n.'
  },
  'शीलम्': {
    en: 'Good character / Moral virtue / Noble conduct',
    hi: 'सदाचार / अच्छा चरित्र / शील',
    te: 'శీలము, సదాచారము, మంచితనము (śīlamu)',
    ta: 'நல்லொழுக்கம், சீலம் (oḻukkam)',
    kn: 'ಶೀಲ, ಸದಾಚಾರ (śīla)',
    ml: 'ശീലം, സദാചാരം (śīlam)',
    gu: 'શીલ, સદાચાર (śīl)',
    bn: 'শীল, চরিত্র (śīl)',
    grammar: 'Noun, n.'
  },
  'गुणः': {
    en: 'Virtue / Meritorious quality / Excellence',
    hi: 'सद्गुण / योग्यता / विशेषता',
    te: 'సద్గుణము, లక్షణము (guṇamu)',
    ta: 'நற்குணம் (kuṇam)',
    kn: 'ಸದ್ಗುಣ, ಒಳ್ಳೆಯ ಗುಣ (guṇa)',
    ml: 'നല്ല ഗുണം (guṇam)',
    gu: 'સદ્ગુણ (guṇ)',
    bn: 'সদ্‌গুণ (guṇ)',
    grammar: 'Noun, m.'
  },
  'धर्मः': {
    en: 'Righteousness / Duty / Moral order / Natural law',
    hi: 'धर्म / कर्तव्य / नीति',
    te: 'ధర్మము, న్యాయము, కర్తవ్యము (dharmamu)',
    ta: 'அறம், தர்மம் (aṟam)',
    kn: 'ಧರ್ಮ, ಕರ್ತವ್ಯ (dharma)',
    ml: 'ധർമ്മം, നീതി (dharmmam)',
    gu: 'ધર્મ, કર્તવ્ય (dharma)',
    bn: 'ধর্ম, কর্তব্য (dharma)',
    grammar: 'Noun, m.'
  },
  'मर्त्यलोके': {
    en: 'In the mortal world / On this earth of mortals',
    hi: 'मृत्युलोक (इस संसार) में',
    te: 'మర్త్యలోకములో (ఈ భూమిపై) (martyalōkamulō)',
    ta: 'பூவுலகில், மானிட உலகத்தில் (māṉiṭa ulakattil)',
    kn: 'ಮರ್ತ್ಯಲೋಕದಲ್ಲಿ (ಈ ಭೂಮಿಯ ಮೇಲೆ) (martyalōkadalli)',
    ml: 'മർത്യലോകത്തിൽ (martyalōkattil)',
    gu: 'મર્ત્યલોકમાં (આ પૃથ્વી પર)',
    bn: 'মর্ত্যলোকে (এই পৃথিবীতে)',
    grammar: 'Noun, m. loc. sg.'
  },
  'भुवि': {
    en: 'Upon the earth',
    hi: 'पृथ्वी पर / इस धरती पर',
    te: 'భూమిపై, ఇలలో (bhūmipai)',
    ta: 'பூமியில் (pūmiyil)',
    kn: 'ಭೂಮಿಯಲ್ಲಿ (bhūmiyalli)',
    ml: 'ഭൂമിയിൽ (bhūmiyil)',
    gu: 'ધરતી પર',
    bn: 'পৃথিবীতে',
    grammar: 'Noun, f. loc. sg.'
  },
  'भारभूताः': {
    en: 'Existing merely as a burden / Dead weight',
    hi: 'बोझ बने हुए / भारस्वरूप',
    te: 'భారమైనవారు, బరువుగా మారినవారు (bhārabhūtālu)',
    ta: 'பாரமாக இருப்பவர்கள் (pāramāka)',
    kn: 'ಭಾರವಾಗಿರುವವರು (bhāravāgiruvavaru)',
    ml: 'ഭാരമായിത്തീർന്നവർ (bhāramāyittīrnavar)',
    gu: 'બોજરૂપ બનેલા',
    bn: 'বোঝাস্বরূপ',
    grammar: 'Adj., m. nom. pl.'
  },
  'मनुष्यरूपेण': {
    en: 'In the disguise/form of a human being',
    hi: 'मनुष्य के रूप में',
    te: 'మనుష్య రూపములో (manuṣya rūpamulō)',
    ta: 'மனித வடிவில் (maṉita vaṭivil)',
    kn: 'ಮನುಷ್ಯ ರೂಪದಲ್ಲಿ (manuṣya rūpadalli)',
    ml: 'മനുഷ്യ രൂപത്തിൽ (manuṣya rūpattil)',
    gu: 'મનુષ્ય રૂપે',
    bn: 'মানুষের রূপে',
    grammar: 'Noun, m. instr. sg.'
  },
  'मृगाः': {
    en: 'Wild beasts / Animals / Deer',
    hi: 'पशु / जानवर',
    te: 'జంతువులు, మృగములు (mṛgamulu)',
    ta: 'விலங்குகள், மிருகங்கள் (mirukaṅkaḷ)',
    kn: 'ಮೃಗಗಳು, ಪ್ರಾಣಿಗಳು (mṛgagaḷu)',
    ml: 'മൃഗങ്ങൾ (mṛgaṅṅaḷ)',
    gu: 'પશુઓ, જાનવરો',
    bn: 'পশুগণ, জন্তু',
    grammar: 'Noun, m. nom. pl.'
  },
  'चरन्ति': {
    en: 'Roam / Graze / Wander about',
    hi: 'घूमते हैं / भटकते हैं / चरते हैं',
    te: 'సంచరిస్తున్నారు, తిరుగుతున్నారు (sancarincunu)',
    ta: 'திரிகிறார்கள், மேய்கிறார்கள் (tirikiṟārkaḷ)',
    kn: 'ಸಂಚರಿಸುತ್ತಾರೆ, ಮೇಯುತ್ತಾರೆ (sancarisuttāre)',
    ml: 'സഞ്ചരിക്കുന്നു (sañcarikkunnu)',
    gu: 'ભટકે છે / ચરે છે',
    bn: 'বিচরণ করে / ঘোরে',
    grammar: 'Verb, pres. 3rd pl. (चरति)'
  },
  'येषाम्': {
    en: 'Those who / Of whom',
    hi: 'जिनका / जिनके पास',
    te: 'ఎవరికైతే (evarikaitē)',
    ta: 'யாருக்கு (yārukku)',
    kn: 'ಯಾರಿಗೆ (yārige)',
    ml: 'ആർക്കാണോ (ārkkāṇō)',
    gu: 'જેમની પાસે',
    bn: 'যাদের',
    grammar: 'Pronoun, gen. pl.'
  },
  'ते': {
    en: 'They / Those people',
    hi: 'वे सब / वे लोग',
    te: 'వారు (vāru)',
    ta: 'அவர்கள் (avarkaḷ)',
    kn: 'ಅವರು (avaru)',
    ml: 'അവർ (avar)',
    gu: 'તેઓ',
    bn: 'তারা',
    grammar: 'Pronoun, nom. pl.'
  },
  'न': {
    en: 'Not / Neither / Nor',
    hi: 'नहीं / न',
    te: 'లేదు, కాదు (lēdu)',
    ta: 'இல்லை (illai)',
    kn: 'ಇಲ್ಲ (illa)',
    ml: 'ഇല്ല (illa)',
    gu: 'નહીં, ન',
    bn: 'না, নেই',
    grammar: 'Particle (Avyaya)'
  },
  'च': {
    en: 'And',
    hi: 'और',
    te: 'మరియు (mariyu)',
    ta: 'மற்றும் (maṟṟum)',
    kn: 'ಮತ್ತು (mattu)',
    ml: 'കൂടാതെ / ഉം (kūṭāte)',
    gu: 'અને',
    bn: 'এবং / ও',
    grammar: 'Conjunction (Avyaya)'
  },
  'अपि': {
    en: 'Also / Even / Too',
    hi: 'भी',
    te: 'కూడా (kūḍā)',
    ta: 'கூட, மேலும் (kūṭa)',
    kn: 'ಕೂಡ (kūḍa)',
    ml: 'കൂടി (kūṭi)',
    gu: 'પણ',
    bn: 'ও / এমনকি',
    grammar: 'Particle (Avyaya)'
  },
  'अस्ति': {
    en: 'Is / Exists',
    hi: 'है',
    te: 'ఉన్నది (unnadi)',
    ta: 'இருக்கிறது (irukkiṟatu)',
    kn: 'ಇದೆ (ide)',
    ml: 'ഉണ്ട് (uṇṭ‌)',
    gu: 'છે',
    bn: 'আছে',
    grammar: 'Verb, pres. 3rd sg. (अस्)'
  },
  'सन्ति': {
    en: 'Are / Exist (plural)',
    hi: 'हैं',
    te: 'ఉన్నారు / ఉన్నాయి (unnāru)',
    ta: 'இருக்கிறார்கள் / உள்ளன (irukkiṟārkaḷ)',
    kn: 'ಇದ್ದಾರೆ / ಇವೆ (iddāre)',
    ml: 'ഉണ്ട് (uṇṭ‌)',
    gu: 'છે (બહુવચન)',
    bn: 'আছেন / আছে',
    grammar: 'Verb, pres. 3rd pl. (अस्)'
  },
  'अहम्': {
    en: 'I (first person singular)',
    hi: 'मैं',
    te: 'నేను (nēnu)',
    ta: 'நான் (nāṉ)',
    kn: 'ನಾನು (nānu)',
    ml: 'ഞാൻ (ñān)',
    gu: 'હું',
    bn: 'আমি',
    grammar: 'Pronoun, 1st sg.'
  },
  'वयम्': {
    en: 'We / We all',
    hi: 'हम सब',
    te: 'మేము / మనము (mēmu / manamu)',
    ta: 'நாம் / நாங்கள் (nām / nāṅkaḷ)',
    kn: 'ನಾವು (nāvu)',
    ml: 'ഞങ്ങൾ / നമ്മൾ (ñaṅṅaḷ)',
    gu: 'અમે બધા',
    bn: 'আমরা',
    grammar: 'Pronoun, 1st pl.'
  },
  'त्वम्': {
    en: 'You (second person singular)',
    hi: 'तुम / आप',
    te: 'నువ్వు (nuvvu)',
    ta: 'நீ (nī)',
    kn: 'ನೀನು (nīnu)',
    ml: 'നീ (nī)',
    gu: 'તું / તમે',
    bn: 'তুমি / আপনি',
    grammar: 'Pronoun, 2nd sg.'
  },
  'सः': {
    en: 'He / That (masculine)',
    hi: 'वह (पुंल्लिंग)',
    te: 'అతడు (ataḍu)',
    ta: 'அவன் (avaṉ)',
    kn: 'ಅವನು (avanu)',
    ml: 'അവൻ (avan)',
    gu: 'તે (પુરુષ)',
    bn: 'সে (পুরুষ)',
    grammar: 'Pronoun, m. 3rd sg.'
  },
  'सा': {
    en: 'She / That (feminine)',
    hi: 'वह (स्त्रीलिंग)',
    te: 'ఆమె (āme)',
    ta: 'அவள் (avaḷ)',
    kn: 'ಅವಳು (avaḷu)',
    ml: 'അവൾ (avaḷ)',
    gu: 'તેણી (સ્ત્રી)',
    bn: 'সে (স্ত্রী)',
    grammar: 'Pronoun, f. 3rd sg.'
  },
  'तत्': {
    en: 'That / It (neuter)',
    hi: 'वह (नपुंसकलिंग)',
    te: 'అది (adi)',
    ta: 'அது (atu)',
    kn: 'ಅದು (adu)',
    ml: 'അത് (at‌)',
    gu: 'તે (નિર્જીવ)',
    bn: 'সেটি / তা',
    grammar: 'Pronoun, n. 3rd sg.'
  },
  'कः': {
    en: 'Who? (masculine)',
    hi: 'कौन? (पुंल्लिंग)',
    te: 'ఎవరు? (evaru)',
    ta: 'யார்? (yār)',
    kn: 'ಯಾರು? (yāru)',
    ml: 'ആര്? (ār‌)',
    gu: 'કોણ?',
    bn: 'কে?',
    grammar: 'Interrogative pronoun, m.'
  },
  'का': {
    en: 'Who? (feminine)',
    hi: 'कौन? (स्त्रीलिंग)',
    te: 'ఎవరు? (స్త్రీలింగం) (evaru)',
    ta: 'யார்? (பெண்) (yār)',
    kn: 'ಯಾರು? (ಸ್ತ್ರೀ) (yāru)',
    ml: 'ആര്? (സ്ത്രീ) (ār‌)',
    gu: 'કોણ? (સ્ત્રી)',
    bn: 'কে? (স্ত্রী)',
    grammar: 'Interrogative pronoun, f.'
  },
  'किम्': {
    en: 'What? / Why?',
    hi: 'क्या? / क्यों?',
    te: 'ఏమిటి? (ēmiṭi)',
    ta: 'என்ன? (eṉṉa)',
    kn: 'ಏನು? (ēnu)',
    ml: 'എന്ത്? (ent‌)',
    gu: 'શું?',
    bn: 'কী?',
    grammar: 'Interrogative pronoun, n.'
  },
  'कुत्र': {
    en: 'Where?',
    hi: 'कहाँ?',
    te: 'ఎక్కడ? (ekkaḍa)',
    ta: 'எங்கே? (eṅkē)',
    kn: 'ಎಲ್ಲಿ? (elli)',
    ml: 'എവിടെ? (eviṭe)',
    gu: 'ક્યાં?',
    bn: 'কোথায়?',
    grammar: 'Interrogative adverb'
  },
  'कदा': {
    en: 'When?',
    hi: 'कब?',
    te: 'ఎప్పుడు? (eppuḍu)',
    ta: 'எப்போது? (eppōtu)',
    kn: 'ಯಾವಾಗ? (yāvāga)',
    ml: 'എപ്പോൾ? (eppōḷ)',
    gu: 'ક્યારે?',
    bn: 'কখন?',
    grammar: 'Interrogative adverb'
  },
  'कथम्': {
    en: 'How?',
    hi: 'कैसे?',
    te: 'ఎలా? (elā)',
    ta: 'எப்படி? (eppaṭi)',
    kn: 'ಹೇಗೆ? (hēge)',
    ml: 'എങ്ങനെ? (eṅṅane)',
    gu: 'કેવી રીતે?',
    bn: 'কেমন করে?',
    grammar: 'Interrogative adverb'
  },
  'पठति': {
    en: 'Reads / Studies',
    hi: 'पढ़ता है',
    te: 'చదువుతున్నాడు (caduvutunnāḍu)',
    ta: 'படிக்கிறான் (paṭikkiṟāṉ)',
    kn: 'ಓದುತ್ತಾನೆ (ōduttāne)',
    ml: 'വായിക്കുന്നു (vāyikkunnu)',
    gu: 'વાંચે છે',
    bn: 'পড়ে',
    grammar: 'Verb, pres. 3rd sg. (पठ्)'
  },
  'लिखति': {
    en: 'Writes',
    hi: 'लिखता है',
    te: 'రాస్తున్నాడు (rāstunnāḍu)',
    ta: 'எழுதுகிறான் (eḻutukiṟāṉ)',
    kn: 'ಬರೆಯುತ್ತಾನೆ (bareyuttāne)',
    ml: 'എഴുതുന്നു (eḻutunnu)',
    gu: 'લખે છે',
    bn: 'লেখে',
    grammar: 'Verb, pres. 3rd sg. (लिख्)'
  },
  'गच्छति': {
    en: 'Goes',
    hi: 'जाता है',
    te: 'వెళ్తున్నాడు (veḷtunnāḍu)',
    ta: 'போகிறான் (pōkiṟāṉ)',
    kn: 'ಹೋಗುತ್ತಾನೆ (hōguttāne)',
    ml: 'പോകുന്നു (pōkunnu)',
    gu: 'જાય છે',
    bn: 'যায়',
    grammar: 'Verb, pres. 3rd sg. (गम्)'
  },
  'क्रीडति': {
    en: 'Plays',
    hi: 'खेलता है',
    te: 'ఆడుకుంటున్నాడు (āḍukuṇṭunnāḍu)',
    ta: 'விளையாடுகிறான் (viḷaiyāṭukiṟāṉ)',
    kn: 'ಆಡುತ್ತಾನೆ (āḍuttāne)',
    ml: 'കളിക്കുന്നു (kaḷikkunnu)',
    gu: 'રમે છે',
    bn: 'খেলে',
    grammar: 'Verb, pres. 3rd sg. (क्रीड्)'
  },
  'जलम्': {
    en: 'Water',
    hi: 'जल / पानी',
    te: 'నీరు, జలము (nīru)',
    ta: 'தண்ணீர், நீர் (taṇṇīr)',
    kn: 'ನೀರು (nīru)',
    ml: 'വെള്ളം (veḷḷam)',
    gu: 'પાણી (pāṇī)',
    bn: 'জল, পানি (jal)',
    grammar: 'Noun, n.'
  },
  'पुस्तकम्': {
    en: 'Book',
    hi: 'पुस्तक / किताब',
    te: 'పుస్తకము (pustakamu)',
    ta: 'புத்தகம் (puttakam)',
    kn: 'ಪುಸ್ತಕ (pustaka)',
    ml: 'പുസ്തകം (pustakam)',
    gu: 'પુસ્તક, ચોપડી (pustak)',
    bn: 'বই, পুস্তক (boi)',
    grammar: 'Noun, n.'
  },
  'मित्रम्': {
    en: 'Friend',
    hi: 'मित्र / दोस्त',
    te: 'స్నేహితుడు, మిత్రుడు (mitruḍu)',
    ta: 'நண்பன் (naṇpaṉ)',
    kn: 'ಸ್ನೇಹಿತ, ಮಿತ್ರ (mitra)',
    ml: 'കൂട്ടുകാരൻ, മിത്രം (mitram)',
    gu: 'મિત્ર, દોસ્ત (mitra)',
    bn: 'বন্ধু, মিত্র (bandhu)',
    grammar: 'Noun, n.'
  },
  'फलम्': {
    en: 'Fruit / Result',
    hi: 'फल',
    te: 'పండు, ఫలము (paṇḍu)',
    ta: 'பழம் (paḻam)',
    kn: 'ಹಣ್ಣು, ಫಲ (haṇṇu)',
    ml: 'പഴം, ഫലം (paḻam)',
    gu: 'ફળ (faḷ)',
    bn: 'ফল (phal)',
    grammar: 'Noun, n.'
  },
  'पुष्पम्': {
    en: 'Flower',
    hi: 'फूल / पुष्प',
    te: 'పువ్వు, పుష్పము (puvvu)',
    ta: 'மலர், பூ (pū)',
    kn: 'ಹೂವು (hūvu)',
    ml: 'പൂവ് (pūv‌)',
    gu: 'ફૂલ (phūl)',
    bn: 'ফুল (phul)',
    grammar: 'Noun, n.'
  },
  'वृक्षः': {
    en: 'Tree',
    hi: 'पेड़ / वृक्ष',
    te: 'చెట్టు, వృక్షము (ceṭṭu)',
    ta: 'மரம் (maram)',
    kn: 'ಮರ, ವೃಕ್ಷ (mara)',
    ml: 'മരം, വൃക്ഷം (maram)',
    gu: 'ઝાડ, વૃક્ષ (jhāḍ)',
    bn: 'গাছ, বৃক্ষ (gāch)',
    grammar: 'Noun, m.'
  },
  'गृहम्': {
    en: 'Home / House',
    hi: 'घर / गृह',
    te: 'ఇల్లు, గృహము (illu)',
    ta: 'வீடு (vīṭu)',
    kn: 'ಮನೆ, ಗೃಹ (mane)',
    ml: 'വീട്, ഗൃഹം (vīṭ‌)',
    gu: 'ઘર (ghar)',
    bn: 'বাড়ি, গৃহ (bāṛi)',
    grammar: 'Noun, n.'
  },
  'सूर्यः': {
    en: 'Sun',
    hi: 'सूर्य / सूरज',
    te: 'సూర్యుడు (sūryuḍu)',
    ta: 'சூரியன் (sūriyaṉ)',
    kn: 'ಸೂರ್ಯ (sūrya)',
    ml: 'സൂര്യൻ (sūryan)',
    gu: 'સૂર્ય, સુરજ (sūrya)',
    bn: 'সূর্য (sūrya)',
    grammar: 'Noun, m.'
  },
  'चन्द्रः': {
    en: 'Moon',
    hi: 'चन्द्रमा / चाँद',
    te: 'చంద్రుడు (candruḍu)',
    ta: 'சந்திரன் (cantiraṉ)',
    kn: 'ಚಂದ್ರ (candra)',
    ml: 'ചന്ദ്രൻ (candran)',
    gu: 'ચંદ્ર (chandra)',
    bn: 'চাঁদ, চন্দ্র (chā̃d)',
    grammar: 'Noun, m.'
  }
};

/** Look up Indic meaning for a clean Devanagari Sanskrit word */
export function lookupIndicWordMeaning(
  cleanWord: string,
  langCode: string
): { meaning: string; grammar?: string } | undefined {
  if (!cleanWord || !langCode) return undefined;
  const entry = INDIC_WORD_DICTIONARY[cleanWord];
  if (!entry) return undefined;

  const text = entry[langCode];
  if (!text) return undefined;
  return { meaning: text, grammar: entry.grammar };
}
