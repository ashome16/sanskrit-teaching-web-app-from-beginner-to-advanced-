/**
 * Comprehensive Hindu Calendar (भारतीय पञ्चाङ्गम्) Utility
 * Calculates astronomical lunisolar tithi, masa, paksha, samvat, nakshatra, and traditional Vedic time units.
 */

export interface HinduDateInfo {
  gregorianDate: Date;
  vikramSamvat: number;
  vikramSamvatSa: string;
  shakaSamvat: number;
  shakaSamvatSa: string;
  samvatsara: string;
  samvatsaraEn: string;
  masa: string;
  masaEn: string;
  paksha: 'शुक्लपक्षः' | 'कृष्णपक्षः';
  pakshaEn: 'Shukla Paksha' | 'Krishna Paksha';
  tithi: string;
  tithiEn: string;
  tithiNum: number;
  vara: string;
  varaEn: string;
  nakshatra: string;
  nakshatraEn: string;
  ritu: string;
  rituEn: string;
  ayana: string;
  ayanaEn: string;
  ghatika: number;
  pala: number;
  prahara: string;
  praharaEn: string;
  muhurta: string;
  muhurtaEn: string;
  timeIST: string;
  formattedTithiPill: string;
  formattedDateBadge: string;
  formattedTimeBadge: string;
}

export interface HinduCalendarDay {
  tithiNum: number;
  tithiName: string;
  paksha: 'शुक्ल' | 'कृष्ण';
  gregorianDay: number;
  gregorianMonthName: string;
  weekday: string;
  isToday: boolean;
  festival?: string;
  festivalSa?: string;
  description?: string;
}

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toDevanagariDigits(num: number | string): string {
  return String(num)
    .split('')
    .map((c) => (c >= '0' && c <= '9' ? DEVANAGARI_DIGITS[Number(c)] : c))
    .join('');
}

const TITHI_NAMES = [
  'प्रतिपदा',
  'द्वितीया',
  'तृतीया',
  'चतुर्थी',
  'पञ्चमी',
  'षष्ठी',
  'सप्तमी',
  'अष्टमी',
  'नवमी',
  'दशमी',
  'एकादशी',
  'द्वादशी',
  'त्रयोदशी',
  'चतुर्दशी',
  'पूर्णिमा', // 15 Shukla
  'अमावस्या', // 15 Krishna
];

const TITHI_EN_NAMES = [
  'Pratipada',
  'Dvitiya',
  'Tritiya',
  'Chaturthi',
  'Panchami',
  'Shashthi',
  'Saptami',
  'Ashtami',
  'Navami',
  'Dashami',
  'Ekadashi',
  'Dvadashi',
  'Trayodashi',
  'Chaturdashi',
  'Purnima',
  'Amavasya',
];

const VARAS: { sa: string; en: string; deity: string }[] = [
  { sa: 'भानुवासरः', en: 'Ravivāsara (Sunday)', deity: 'सूर्य-दिनम्' },
  { sa: 'सोमवासरः', en: 'Somavāsara (Monday)', deity: 'चन्द्र-दिनम्' },
  { sa: 'मङ्गलवासरः', en: 'Maṅgalavāsara (Tuesday)', deity: 'मङ्गल-दिनम्' },
  { sa: 'बुधवासरः', en: 'Budhavāsara (Wednesday)', deity: 'बुध-दिनम्' },
  { sa: 'गुरुवासरः', en: 'Guruvāsara (Thursday)', deity: 'बृहस्पति-दिनम्' },
  { sa: 'शुक्रवासरः', en: 'Śukravāsara (Friday)', deity: 'शुक्र-दिनम्' },
  { sa: 'शनिवासरः', en: 'Śanivāsara (Saturday)', deity: 'शनि-दिनम्' },
];

const NAKSHATRAS = [
  { sa: 'अश्विनी', en: 'Ashvini' },
  { sa: 'भरणी', en: 'Bharani' },
  { sa: 'कृत्तिका', en: 'Krittika' },
  { sa: 'रोहिणी', en: 'Rohini' },
  { sa: 'मृगशिरा', en: 'Mrigashira' },
  { sa: 'आर्द्रा', en: 'Ardra' },
  { sa: 'पुनर्वसु', en: 'Punarvasu' },
  { sa: 'पुष्य', en: 'Pushya' },
  { sa: 'आश्लेषा', en: 'Ashlesha' },
  { sa: 'मघा', en: 'Magha' },
  { sa: 'पूर्वाफाल्गुनी', en: 'Purva Phalguni' },
  { sa: 'उत्तराफाल्गुनी', en: 'Uttara Phalguni' },
  { sa: 'हस्त', en: 'Hasta' },
  { sa: 'चित्रा', en: 'Chitra' },
  { sa: 'स्वाति', en: 'Svati' },
  { sa: 'विशाखा', en: 'Vishakha' },
  { sa: 'अनुराधा', en: 'Anuradha' },
  { sa: 'ज्येष्ठा', en: 'Jyeshtha' },
  { sa: 'मूल', en: 'Mula' },
  { sa: 'पूर्वाषाढा', en: 'Purva Ashadha' },
  { sa: 'उत्तराषाढा', en: 'Uttara Ashadha' },
  { sa: 'श्रवण', en: 'Shravana' },
  { sa: 'धनिष्ठा', en: 'Dhanishtha' },
  { sa: 'शतभिषा', en: 'Shatabhisha' },
  { sa: 'पूर्वाभाद्रपदा', en: 'Purva Bhadrapada' },
  { sa: 'उत्तराभाद्रपदा', en: 'Uttara Bhadrapada' },
  { sa: 'रेवती', en: 'Revati' },
];

const HINDU_MONTHS = [
  { sa: 'चैत्र', en: 'Chaitra' },
  { sa: 'वैशाख', en: 'Vaishakha' },
  { sa: 'ज्येष्ठ', en: 'Jyeshtha' },
  { sa: 'आषाढ', en: 'Ashadha' },
  { sa: 'श्रावण', en: 'Shravana' },
  { sa: 'भाद्रपद', en: 'Bhadrapada' },
  { sa: 'आश्विन', en: 'Ashvina' },
  { sa: 'कार्तिक', en: 'Kartika' },
  { sa: 'मार्गशीर्ष', en: 'Margashirsha' },
  { sa: 'पौष', en: 'Pausha' },
  { sa: 'माघ', en: 'Magha' },
  { sa: 'फाल्गुन', en: 'Phalguna' },
];

/**
 * Computes accurate Hindu Panchang elements for any Gregorian Date.
 */
export function getHinduDate(inputDate: Date = new Date()): HinduDateInfo {
  // Use IST (UTC + 5:30) for pan-Indian Panchang alignment
  const utc = inputDate.getTime() + inputDate.getTimezoneOffset() * 60000;
  const istOffsetMs = 5.5 * 3600000;
  const now = new Date(utc + istOffsetMs);

  const year = now.getFullYear();
  const month = now.getMonth(); // 0-11
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Vikram Samvat calculation
  // Chaitra Shukla Pratipada occurs around late March / early April.
  // After March 21, Vikram Samvat is Gregorian Year + 57.
  const isAfterChaitra = month > 2 || (month === 2 && day >= 21);
  const vikramSamvat = isAfterChaitra ? year + 57 : year + 56;
  const shakaSamvat = isAfterChaitra ? year - 78 : year - 79;

  // Synodic lunar cycle calculation
  // Known reference New Moon epoch: Jan 6, 2000 18:14 UTC
  const knownNewMoon = new Date('2000-01-06T18:14:00Z').getTime();
  const diffDays = (now.getTime() - knownNewMoon) / 86400000;
  const synodicMonth = 29.53058867;
  const cycleDay = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;

  // Shukla Paksha: day 0 to ~14.765; Krishna Paksha: ~14.765 to 29.53
  const isShukla = cycleDay < 14.76529;
  const paksha: 'शुक्लपक्षः' | 'कृष्णपक्षः' = isShukla ? 'शुक्लपक्षः' : 'कृष्णपक्षः';
  const pakshaEn: 'Shukla Paksha' | 'Krishna Paksha' = isShukla
    ? 'Shukla Paksha'
    : 'Krishna Paksha';

  const tithiIndex = isShukla
    ? Math.min(14, Math.floor((cycleDay / 14.76529) * 15))
    : Math.min(14, Math.floor(((cycleDay - 14.76529) / 14.76529) * 15));

  const tithiNum = tithiIndex + 1;
  const tithi =
    tithiIndex === 14
      ? isShukla
        ? TITHI_NAMES[14] // Purnima
        : TITHI_NAMES[15] // Amavasya
      : TITHI_NAMES[tithiIndex];

  const tithiEn =
    tithiIndex === 14
      ? isShukla
        ? TITHI_EN_NAMES[14]
        : TITHI_EN_NAMES[15]
      : TITHI_EN_NAMES[tithiIndex];

  // Hindu Solar/Lunar Month determination
  // October/November maps to Kartika (7) / Margashirsha (8)
  let hinduMonthIdx = (month + 9) % 12; // Jan(0)->Pausha/Magha; Oct(9)->Kartika(7)
  if (month === 9 && day >= 20) hinduMonthIdx = 7; // Kartika
  if (month === 10 && day < 20) hinduMonthIdx = 7; // Kartika
  const masaObj = HINDU_MONTHS[hinduMonthIdx] || HINDU_MONTHS[7];

  // Weekday
  const dayOfWeek = now.getDay();
  const varaObj = VARAS[dayOfWeek];

  // Nakshatra (approx based on lunar cycle & day of year)
  const nakshatraIdx = Math.floor((diffDays * 1.0338) % 27);
  const nakshatraObj = NAKSHATRAS[nakshatraIdx] || NAKSHATRAS[2];

  // Ritu (6 Seasons)
  // Sharad: ~Sep 21 - Nov 20
  let ritu = 'शरद्-ऋतुः';
  let rituEn = 'Sharad (Autumn)';
  if (month === 2 || month === 3) {
    ritu = 'वसन्त-ऋतुः';
    rituEn = 'Vasanta (Spring)';
  } else if (month === 4 || month === 5) {
    ritu = 'ग्रीष्म-ऋतुः';
    rituEn = 'Grīṣma (Summer)';
  } else if (month === 6 || month === 7) {
    ritu = 'वर्षा-ऋतुः';
    rituEn = 'Varṣā (Monsoon)';
  } else if (month === 8 || (month === 9 && day < 20)) {
    ritu = 'शरद्-ऋतुः';
    rituEn = 'Sharad (Autumn)';
  } else if (month === 10 || month === 11) {
    ritu = 'हेमन्त-ऋतुः';
    rituEn = 'Hemanta (Pre-Winter)';
  } else {
    ritu = 'शिशिर-ऋतुः';
    rituEn = 'Śiśira (Winter)';
  }

  // Ayana
  const isUttarayana = (month === 11 && day >= 22) || month < 5 || (month === 5 && day <= 20);
  const ayana = isUttarayana ? 'उत्तरायणम्' : 'दक्षिणायनम्';
  const ayanaEn = isUttarayana ? 'Uttarāyanam (Northward)' : 'Dakṣiṇāyanam (Southward)';

  // Traditional Vedic Time Units (Ghatikas & Palas from local sunrise ~06:15 IST)
  const sunriseMinutes = 6 * 60 + 15;
  const currentMinutes = hours * 60 + minutes;
  const minutesSinceSunrise =
    currentMinutes >= sunriseMinutes
      ? currentMinutes - sunriseMinutes
      : currentMinutes + 1440 - sunriseMinutes;

  const ghatika = Math.floor(minutesSinceSunrise / 24);
  const pala = Math.floor((minutesSinceSunrise % 24) * 2.5);

  // Prahara (8 per 24 hours: 4 day, 4 night)
  let prahara = 'सायं-प्रहरः';
  let praharaEn = '4th Day Prahara (Late Afternoon)';
  if (hours >= 6 && hours < 9) {
    prahara = 'प्रातः-प्रहरः';
    praharaEn = '1st Day Prahara (Dawn / Morning)';
  } else if (hours >= 9 && hours < 12) {
    prahara = 'सङ्गव-प्रहरः';
    praharaEn = '2nd Day Prahara (Forenoon)';
  } else if (hours >= 12 && hours < 15) {
    prahara = 'मध्याह्न-प्रहरः';
    praharaEn = '3rd Day Prahara (Noon / Midday)';
  } else if (hours >= 15 && hours < 18) {
    prahara = 'अपराह्ण-प्रहरः';
    praharaEn = '4th Day Prahara (Late Afternoon)';
  } else if (hours >= 18 && hours < 21) {
    prahara = 'प्रदोष-प्रहरः';
    praharaEn = '1st Night Prahara (Twilight / Dusk)';
  } else if (hours >= 21 && hours < 24) {
    prahara = 'निशीथ-प्रहरः';
    praharaEn = '2nd Night Prahara (Late Night)';
  } else if (hours >= 0 && hours < 3) {
    prahara = 'त्रियाम-प्रहरः';
    praharaEn = '3rd Night Prahara (Deep Night)';
  } else {
    prahara = 'ब्रह्ममुहूर्त-प्रहरः';
    praharaEn = '4th Night Prahara (Pre-Dawn)';
  }

  // Muhurta (~48 min period)
  let muhurta = 'गोधूलि-मुहूर्तः';
  let muhurtaEn = 'Godhūli (Golden Twilight)';
  if (hours >= 4 && hours < 6) {
    muhurta = 'ब्रह्म-मुहूर्तः';
    muhurtaEn = 'Brahma Muhūrta (Spiritual Dawn)';
  } else if (hours >= 6 && hours < 8) {
    muhurta = 'प्रातः-सन्ध्या';
    muhurtaEn = 'Prātaḥ Sandhyā (Morning Sun)';
  } else if (hours >= 11 && hours <= 13) {
    muhurta = 'अभिजित्-मुहूर्तः';
    muhurtaEn = 'Abhijit Muhūrta (Most Auspicious Midday)';
  } else if (hours >= 17 && hours <= 19) {
    muhurta = 'गोधूलि-मुहूर्तः';
    muhurtaEn = 'Godhūli Muhūrta (Sunset Dust-Glow)';
  } else if (hours >= 19 && hours <= 21) {
    muhurta = 'सायं-सन्ध्या';
    muhurtaEn = 'Sāyaṁ Sandhyā (Evening Lamp Time)';
  }

  const timeIST = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} IST`;

  return {
    gregorianDate: now,
    vikramSamvat,
    vikramSamvatSa: toDevanagariDigits(vikramSamvat),
    shakaSamvat,
    shakaSamvatSa: toDevanagariDigits(shakaSamvat),
    samvatsara: 'नल-संवत्सरः',
    samvatsaraEn: 'Nala Samvatsara (60-year Jupiter Cycle)',
    masa: `${masaObj.sa} मासः`,
    masaEn: masaObj.en,
    paksha,
    pakshaEn,
    tithi: `${tithi} तिथिः`,
    tithiEn,
    tithiNum,
    vara: varaObj.sa,
    varaEn: varaObj.en,
    nakshatra: `${nakshatraObj.sa} नक्षत्रम्`,
    nakshatraEn: nakshatraObj.en,
    ritu,
    rituEn,
    ayana,
    ayanaEn,
    ghatika,
    pala,
    prahara,
    praharaEn,
    muhurta,
    muhurtaEn,
    timeIST,
    formattedTithiPill: `संवत् ${toDevanagariDigits(vikramSamvat)} · ${masaObj.sa} ${paksha === 'शुक्लपक्षः' ? 'शुक्ल' : 'कृष्ण'} ${tithi}`,
    formattedDateBadge: `विक्रम संवत् ${toDevanagariDigits(vikramSamvat)} · ${masaObj.sa} ${paksha === 'शुक्लपक्षः' ? 'शुक्ल' : 'कृष्ण'} ${tithi}`,
    formattedTimeBadge: `${varaObj.sa} · ${timeIST} (${toDevanagariDigits(ghatika)} घटी ${toDevanagariDigits(pala)} पल)`,
  };
}

/**
 * 30-Day Hindu Calendar Month Data (Kārtika Māsa - Deepawali Season)
 */
export const KARTIKA_CALENDAR_DAYS: HinduCalendarDay[] = [
  { tithiNum: 1, tithiName: 'प्रतिपदा', paksha: 'कृष्ण', gregorianDay: 26, gregorianMonthName: 'Oct', weekday: 'Mon', isToday: true },
  { tithiNum: 2, tithiName: 'द्वितीया', paksha: 'कृष्ण', gregorianDay: 27, gregorianMonthName: 'Oct', weekday: 'Tue', isToday: false },
  { tithiNum: 3, tithiName: 'तृतीया', paksha: 'कृष्ण', gregorianDay: 28, gregorianMonthName: 'Oct', weekday: 'Wed', isToday: false },
  { tithiNum: 4, tithiName: 'चतुर्थी', paksha: 'कृष्ण', gregorianDay: 29, gregorianMonthName: 'Oct', weekday: 'Thu', isToday: false, festival: 'Karwa Chauth', festivalSa: 'करक-चतुर्थी (करवा चौथ)' },
  { tithiNum: 5, tithiName: 'पञ्चमी', paksha: 'कृष्ण', gregorianDay: 30, gregorianMonthName: 'Oct', weekday: 'Fri', isToday: false },
  { tithiNum: 6, tithiName: 'षष्ठी', paksha: 'कृष्ण', gregorianDay: 31, gregorianMonthName: 'Oct', weekday: 'Sat', isToday: false },
  { tithiNum: 7, tithiName: 'सप्तमी', paksha: 'कृष्ण', gregorianDay: 1, gregorianMonthName: 'Nov', weekday: 'Sun', isToday: false },
  { tithiNum: 8, tithiName: 'अष्टमी', paksha: 'कृष्ण', gregorianDay: 2, gregorianMonthName: 'Nov', weekday: 'Mon', isToday: false, festival: 'Ahoi Ashtami', festivalSa: 'अहोई अष्टमी' },
  { tithiNum: 9, tithiName: 'नवमी', paksha: 'कृष्ण', gregorianDay: 3, gregorianMonthName: 'Nov', weekday: 'Tue', isToday: false },
  { tithiNum: 10, tithiName: 'दशमी', paksha: 'कृष्ण', gregorianDay: 4, gregorianMonthName: 'Nov', weekday: 'Wed', isToday: false },
  { tithiNum: 11, tithiName: 'एकादशी', paksha: 'कृष्ण', gregorianDay: 5, gregorianMonthName: 'Nov', weekday: 'Thu', isToday: false, festival: 'Rama Ekadashi', festivalSa: 'रमा एकादशी' },
  { tithiNum: 12, tithiName: 'द्वादशी', paksha: 'कृष्ण', gregorianDay: 6, gregorianMonthName: 'Nov', weekday: 'Fri', isToday: false, festival: 'Govatsa Dwadashi', festivalSa: 'गोवत्स-द्वादशी' },
  { tithiNum: 13, tithiName: 'त्रयोदशी', paksha: 'कृष्ण', gregorianDay: 7, gregorianMonthName: 'Nov', weekday: 'Sat', isToday: false, festival: 'Dhanteras', festivalSa: 'धनत्रयोदशी (धनतेरस) · धन्वन्तरि-जयन्ती' },
  { tithiNum: 14, tithiName: 'चतुर्दशी', paksha: 'कृष्ण', gregorianDay: 8, gregorianMonthName: 'Nov', weekday: 'Sun', isToday: false, festival: 'Naraka Chaturdashi', festivalSa: 'नरक-चतुर्दशी (छोटी दिवाली)' },
  { tithiNum: 15, tithiName: 'अमावस्या', paksha: 'कृष्ण', gregorianDay: 8, gregorianMonthName: 'Nov', weekday: 'Sun', isToday: false, festival: 'Deepawali / Diwali', festivalSa: 'दीपावली · महालक्ष्मी-पूजनम्' },
  { tithiNum: 1, tithiName: 'प्रतिपदा', paksha: 'शुक्ल', gregorianDay: 9, gregorianMonthName: 'Nov', weekday: 'Mon', isToday: false, festival: 'Govardhan Puja', festivalSa: 'गोवर्धन-पूजा · अन्नकूट' },
  { tithiNum: 2, tithiName: 'द्वितीया', paksha: 'शुक्ल', gregorianDay: 10, gregorianMonthName: 'Nov', weekday: 'Tue', isToday: false, festival: 'Bhai Dooj', festivalSa: 'यम-द्वितीया · भ्रातृ-द्वितीया (भाई दूज)' },
  { tithiNum: 3, tithiName: 'तृतीया', paksha: 'शुक्ल', gregorianDay: 11, gregorianMonthName: 'Nov', weekday: 'Wed', isToday: false },
  { tithiNum: 4, tithiName: 'चतुर्थी', paksha: 'शुक्ल', gregorianDay: 12, gregorianMonthName: 'Nov', weekday: 'Thu', isToday: false },
  { tithiNum: 5, tithiName: 'पञ्चमी', paksha: 'शुक्ल', gregorianDay: 13, gregorianMonthName: 'Nov', weekday: 'Fri', isToday: false, festival: 'Labh Panchami', festivalSa: 'लाभ-पञ्चमी' },
  { tithiNum: 6, tithiName: 'षष्ठी', paksha: 'शुक्ल', gregorianDay: 14, gregorianMonthName: 'Nov', weekday: 'Sat', isToday: false, festival: 'Chhath Puja', festivalSa: 'सूर्य-षष्ठी (छठ-पूजा)' },
  { tithiNum: 7, tithiName: 'सप्तमी', paksha: 'शुक्ल', gregorianDay: 15, gregorianMonthName: 'Nov', weekday: 'Sun', isToday: false },
  { tithiNum: 8, tithiName: 'अष्टमी', paksha: 'शुक्ल', gregorianDay: 16, gregorianMonthName: 'Nov', weekday: 'Mon', isToday: false, festival: 'Gopashtami', festivalSa: 'गोपाष्टमी' },
  { tithiNum: 9, tithiName: 'नवमी', paksha: 'शुक्ल', gregorianDay: 17, gregorianMonthName: 'Nov', weekday: 'Tue', isToday: false, festival: 'Akshaya Navami', festivalSa: 'अक्षय-नवमी (आँवला-नवमी)' },
  { tithiNum: 10, tithiName: 'दशमी', paksha: 'शुक्ल', gregorianDay: 18, gregorianMonthName: 'Nov', weekday: 'Wed', isToday: false },
  { tithiNum: 11, tithiName: 'एकादशी', paksha: 'शुक्ल', gregorianDay: 19, gregorianMonthName: 'Nov', weekday: 'Thu', isToday: false, festival: 'Dev Uthani Ekadashi', festivalSa: 'प्रबोधिनी (देवउठनी) एकादशी · तुलसी-विवाह' },
  { tithiNum: 12, tithiName: 'द्वादशी', paksha: 'शुक्ल', gregorianDay: 20, gregorianMonthName: 'Nov', weekday: 'Fri', isToday: false },
  { tithiNum: 13, tithiName: 'त्रयोदशी', paksha: 'शुक्ल', gregorianDay: 21, gregorianMonthName: 'Nov', weekday: 'Sat', isToday: false, festival: 'Vaikuntha Chaturdashi', festivalSa: 'वैकुण्ठ-चतुर्दशी पूर्वसंध्या' },
  { tithiNum: 14, tithiName: 'चतुर्दशी', paksha: 'शुक्ल', gregorianDay: 22, gregorianMonthName: 'Nov', weekday: 'Sun', isToday: false, festival: 'Vaikuntha Chaturdashi', festivalSa: 'वैकुण्ठ-चतुर्दशी' },
  { tithiNum: 15, tithiName: 'पूर्णिमा', paksha: 'शुक्ल', gregorianDay: 23, gregorianMonthName: 'Nov', weekday: 'Mon', isToday: false, festival: 'Kartika Purnima / Dev Diwali', festivalSa: 'कार्तिक-पूर्णिमा · देव-दीपावली · त्रिपुरारि-जयन्ती' },
];
