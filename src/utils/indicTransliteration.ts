/**
 * Indic Transliteration Engine for Sanskrit
 * Fast, accurate transliteration between Devanagari (देवनागरी),
 * Telugu (తెలుగు), Tamil (தமிழ்), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം),
 * Gujarati (ગુજરાતી), and Bengali (বাংলা).
 */

export type IndicScript =
  | 'devanagari'
  | 'tamil'
  | 'malayalam'
  | 'telugu'
  | 'kannada'
  | 'gujarati'
  | 'bengali';

// 1. Devanagari to Malayalam Character Mapping
const DEVA_TO_MALAYALAM: Record<string, string> = {
  // Vowels (स्वर)
  'अ': 'അ', 'आ': 'ആ', 'इ': 'ഇ', 'ई': 'ഈ', 'उ': 'ഉ', 'ऊ': 'ഊ', 'ऋ': 'ഋ', 'ॠ': 'ൠ', 'ऌ': 'ഌ', 'ॡ': 'ൡ',
  'ए': 'ഏ', 'ऐ': 'ഐ', 'ओ': 'ഓ', 'औ': 'ഔ', 'अं': 'അം', 'अः': 'അഃ',
  // Matras (मात्रा)
  'ा': 'ാ', 'ि': 'ി', 'ी': 'ീ', 'ु': 'ു', 'ू': 'ൂ', 'ृ': 'ൃ', 'ॄ': 'ൄ', 'ॢ': 'ൢ', 'ॣ': 'ൣ',
  'े': 'േ', 'ै': 'ൈ', 'ो': 'ോ', 'ौ': 'ൌ', '्': '്', 'ं': 'ം', 'ः': 'ഃ', 'ँ': 'origँ', 'ऽ': 'ഽ', 'ॐ': 'ഓം',
  // Consonants (व्यञ्जनानि)
  'क': 'ക', 'ख': 'ഖ', 'ग': 'ഗ', 'घ': 'ഘ', 'ङ': 'ങ',
  'च': 'ച', 'छ': 'ഛ', 'ज': 'ജ', 'झ': 'ഝ', 'ञ': 'ഞ',
  'ट': 'ട', 'ठ': 'ഠ', 'ड': 'ഡ', 'ढ': 'ഢ', 'ण': 'ണ',
  'त': 'ത', 'थ': 'ഥ', 'द': 'ദ', 'ध': 'ധ', 'न': 'ന',
  'प': 'പ', 'फ': 'ഫ', 'ब': 'ബ', 'भ': 'ഭ', 'म': 'മ',
  'य': 'യ', 'र': 'ര', 'ल': 'ല', 'व': 'വ',
  'श': 'ശ', 'ष': 'ഷ', 'स': 'സ', 'ह': 'ഹ',
  'ळ': 'ള', 'क्ष': 'ക്ഷ', 'ज्ञ': 'ജ്ഞ',
  // Digits
  '०': '൦', '१': '൧', '२': '൨', '३': '൩', '४': '൪',
  '५': '൫', '६': '൬', '७': '൭', '८': '൮', '९': '൯',
  '।': '।', '॥': '॥',
};

// 2. Devanagari to Telugu Character Mapping
const DEVA_TO_TELUGU: Record<string, string> = {
  // Vowels
  'अ': 'అ', 'आ': 'ఆ', 'इ': 'ఇ', 'ई': 'ఈ', 'उ': 'ఉ', 'ऊ': 'ఊ', 'ऋ': 'ఋ', 'ॠ': 'ౠ', 'ऌ': 'ఌ', 'ॡ': 'ౡ',
  'ए': 'ఏ', 'ऐ': 'ఐ', 'ओ': 'ఓ', 'औ': 'ఔ', 'अं': 'అం', 'अः': 'అః',
  // Matras
  'ा': 'ా', 'ि': 'ి', 'ी': 'ీ', 'ु': 'ు', 'ू': 'ూ', 'ृ': 'ృ', 'ॄ': 'ౄ', 'ॢ': 'ౢ', 'ॣ': 'ౣ',
  'े': 'ే', 'ै': 'ై', 'ो': 'ో', 'ौ': 'ౌ', '्': '్', 'ं': 'ం', 'ः': 'ః', 'ऽ': 'ఽ', 'ॐ': 'ఓం',
  // Consonants
  'क': 'క', 'ख': 'ఖ', 'ग': 'గ', 'घ': 'ఘ', 'ङ': 'ఙ',
  'च': 'చ', 'छ': 'ఛ', 'ज': 'జ', 'झ': 'ఝ', 'ञ': 'ఞ',
  'ट': 'ట', 'ठ': 'ఠ', 'ड': 'డ', 'ढ': 'ఢ', 'ण': 'ణ',
  'त': 'త', 'थ': 'థ', 'द': 'ద', 'ध': 'ధ', 'न': 'న',
  'प': 'ప', 'फ': 'ఫ', 'ब': 'బ', 'भ': 'భ', 'म': 'మ',
  'य': 'య', 'र': 'ర', 'ल': 'ల', 'व': 'వ',
  'श': 'శ', 'ष': 'ష', 'स': 'స', 'ह': 'హ',
  'ळ': 'ళ', 'क्ष': 'క్ష', 'ज्ञ': 'జ్ఞ',
  // Digits
  '०': '౦', '१': '౧', '२': '౨', '३': '౩', '४': '౪',
  '५': '౫', '६': '౬', '७': '౭', '८': '౮', '९': '౯',
  '।': '।', '॥': '॥',
};

// 3. Devanagari to Kannada Character Mapping
const DEVA_TO_KANNADA: Record<string, string> = {
  // Vowels
  'अ': 'ಅ', 'आ': 'ಆ', 'इ': 'ಇ', 'ई': 'ಈ', 'उ': 'ಉ', 'ऊ': 'ಊ', 'ऋ': 'ಋ', 'ॠ': 'ೠ', 'ऌ': 'ಌ', 'ॡ': 'ೡ',
  'ए': 'ಏ', 'ऐ': 'ಐ', 'ओ': 'ಓ', 'औ': 'ಔ', 'अं': 'ಅಂ', 'अः': 'ಅಃ',
  // Matras
  'ा': 'ಾ', 'ि': 'ಿ', 'ी': 'ೀ', 'ु': 'ು', 'ू': 'ೂ', 'ृ': 'ೃ', 'ॄ': 'ೄ', 'ॢ': 'ೢ', 'ॣ': 'ೣ',
  'े': 'ೇ', 'ै': 'ೈ', 'ो': 'ೋ', 'ौ': 'ೌ', '्': '್', 'ं': 'ಂ', 'ः': 'ಃ', 'ऽ': 'ಽ', 'ॐ': 'ಓಂ',
  // Consonants
  'क': 'ಕ', 'ख': 'ಖ', 'ग': 'ಗ', 'घ': 'ಘ', 'ङ': 'ಙ',
  'च': 'ಚ', 'छ': 'ಛ', 'ज': 'ಜ', 'झ': 'ಝ', 'ञ': 'ಞ',
  'ट': 'ಟ', 'ठ': 'ಠ', 'ड': 'ಡ', 'ढ': 'ಢ', 'ण': 'ಣ',
  'त': 'ತ', 'थ': 'ಥ', 'द': 'ದ', 'ध': 'ಧ', 'न': 'ನ',
  'प': 'ಪ', 'फ': 'ಫ', 'ब': 'ಬ', 'भ': 'ಭ', 'म': 'ಮ',
  'य': 'ಯ', 'र': 'ರ', 'ल': 'ಲ', 'व': 'ವ',
  'श': 'ಶ', 'ष': 'ಷ', 'स': 'ಸ', 'ह': 'ಹ',
  'ळ': 'ಳ', 'क्ष': 'ಕ್ಷ', 'ज्ञ': 'ಜ್ಞ',
  // Digits
  '०': '೦', '१': '೧', '२': '೨', '३': '೩', '४': '೪',
  '५': '೫', '६': '೬', '७': '೭', '८': '೮', '९': '೯',
  '।': '।', '॥': '॥',
};

// 4. Devanagari to Gujarati Character Mapping
const DEVA_TO_GUJARATI: Record<string, string> = {
  // Vowels
  'अ': 'અ', 'आ': 'આ', 'इ': 'ઇ', 'ई': 'ઈ', 'उ': 'ઉ', 'ऊ': 'ઊ', 'ऋ': 'ઋ', 'ॠ': 'ૠ', 'ऌ': 'ઌ', 'ॡ': 'ૡ',
  'ए': 'એ', 'ऐ': 'ઐ', 'ओ': 'ઓ', 'औ': 'ઔ', 'अं': 'અં', 'अः': 'અઃ',
  // Matras
  'ा': 'ા', 'ि': 'િ', 'ी': 'ી', 'ु': 'ુ', 'ू': 'ૂ', 'ृ': 'ૃ', 'ॄ': 'ૄ', 'ॢ': 'ૢ', 'ॣ': 'ૣ',
  'े': 'ે', 'ै': 'ૈ', 'ो': 'ો', 'ौ': 'ૌ', '्': '્', 'ं': 'ં', 'ः': 'ઃ', 'ऽ': 'ઽ', 'ॐ': 'ૐ',
  // Consonants
  'क': 'ક', 'ख': 'ખ', 'ग': 'ગ', 'घ': 'ઘ', 'ङ': 'ઙ',
  'च': 'ચ', 'छ': 'છ', 'ज': 'જ', 'झ': 'ઝ', 'ञ': 'ઞ',
  'ट': 'ટ', 'ठ': 'ઠ', 'ड': 'ડ', 'ढ': 'ઢ', 'ण': 'ણ',
  'त': 'ત', 'थ': 'થ', 'द': 'દ', 'ध': 'ધ', 'न': 'ન',
  'प': 'પ', 'फ': 'ફ', 'ब': 'બ', 'भ': 'ભ', 'म': 'મ',
  'य': 'ય', 'र': 'ર', 'ल': 'લ', 'व': 'વ',
  'श': 'શ', 'ष': 'ષ', 'स': 'સ', 'ह': 'હ',
  'ळ': 'ળ', 'क्ष': 'ક્ષ', 'ज्ञ': 'જ્ઞ',
  // Digits
  '०': '૦', '१': '૧', '२': '૨', '३': '૩', '४': '૪',
  '५': '૫', '६': '૬', '७': '૭', '८': '૮', '९': '૯',
  '।': '।', '॥': '॥',
};

// 5. Devanagari to Bengali Character Mapping
const DEVA_TO_BENGALI: Record<string, string> = {
  // Vowels
  'अ': 'অ', 'आ': 'আ', 'इ': 'ই', 'ई': 'ঈ', 'उ': 'উ', 'ऊ': 'ঊ', 'ऋ': 'ঋ', 'ॠ': 'ৠ', 'ऌ': 'ঌ', 'ॡ': 'ৡ',
  'ए': 'এ', 'ऐ': 'ঐ', 'ओ': 'ও', 'औ': 'ঔ', 'अं': 'অং', 'अः': 'অঃ',
  // Matras
  'ा': 'া', 'ि': 'ি', 'ी': 'ী', 'ु': 'ু', 'ू': 'ূ', 'ृ': 'ৃ', 'ॄ': 'ৄ', 'ॢ': 'ৢ', 'ॣ': 'ৣ',
  'े': 'ে', 'ै': 'ৈ', 'ो': 'ো', 'ौ': 'ৌ', '्': '্', 'ं': 'ং', 'ः': 'ঃ', 'ऽ': 'ঽ', 'ॐ': 'ওঁ',
  // Consonants
  'क': 'ক', 'ख': 'খ', 'ग': 'গ', 'घ': 'ঘ', 'ङ': 'ঙ',
  'च': 'চ', 'छ': 'ছ', 'ज': 'জ', 'झ': 'ঝ', 'ञ': 'ঞ',
  'ट': 'ট', 'ठ': 'ঠ', 'ड': 'ড', 'ढ': 'ঢ', 'ण': 'ণ',
  'त': 'ত', 'थ': 'থ', 'द': 'দ', 'ध': 'ধ', 'न': 'ন',
  'प': 'প', 'फ': 'ফ', 'ब': 'ব', 'भ': 'ভ', 'म': 'ম',
  'य': 'য', 'र': 'র', 'ल': 'ল', 'व': 'ব',
  'श': 'শ', 'ष': 'ষ', 'स': 'স', 'ह': 'হ',
  'ळ': 'ল়', 'क्ष': 'ক্ষ', 'ज्ञ': 'জ্ঞ',
  // Digits
  '०': '০', '१': '১', '२': '২', '३': '৩', '४': '৪',
  '५': '৫', '६': '৬', '७': '৭', '८': '৮', '९': '৯',
  '।': '।', '॥': '॥',
};

// 6. Devanagari to Tamil (with Grantha support for aspirated / voiced Sanskrit sounds)
const DEVA_TO_TAMIL: Record<string, string> = {
  // Vowels (உயிரெழுத்துக்கள்)
  'अ': 'அ', 'आ': 'ஆ', 'इ': 'இ', 'ई': 'ஈ', 'उ': 'உ', 'ऊ': 'ஊ', 'ऋ': 'ரி', 'ॠ': 'ரீ', 'ऌ': 'லி', 'ॡ': 'லீ',
  'ए': 'ஏ', 'ऐ': 'ஐ', 'ओ': 'ஓ', 'औ': 'ஔ', 'अं': 'அம்', 'अः': 'அ:',
  // Matras
  'ा': 'ா', 'ि': 'ி', 'ी': 'ீ', 'ु': 'ு', 'ू': 'ூ', 'ृ': '்ரி', 'ॄ': '்ரீ',
  'े': 'ே', 'ै': 'ை', 'ो': 'ோ', 'ौ': 'ௌ', '्': '்', 'ं': 'ம்', 'ः': ':', 'ऽ': '\'', 'ॐ': 'ஓம்',
  // Consonants (with Grantha letters: ஜ, ஷ, ஸ, ஹ, க்ஷ, ஸ்ரீ)
  'क': 'க', 'ख': 'க²', 'ग': 'க³', 'घ': 'க⁴', 'ङ': 'ங',
  'च': 'ச', 'छ': 'ச²', 'ज': 'ஜ', 'झ': 'ஜ²', 'ञ': 'ஞ',
  'ट': 'ட', 'ठ': 'ட²', 'ड': 'ட³', 'ढ': 'ட⁴', 'ण': 'ண',
  'त': 'த', 'थ': 'த²', 'द': 'த³', 'ध': 'த⁴', 'न': 'ந',
  'प': 'ப', 'फ': 'ப²', 'ब': 'ப³', 'भ': 'ப⁴', 'म': 'ம',
  'य': 'ய', 'र': 'ர', 'ल': 'ல', 'व': 'வ',
  'श': 'ஶ', 'ष': 'ஷ', 'स': 'ஸ', 'ह': 'ஹ',
  'ळ': 'ள', 'क्ष': 'க்ஷ', 'ज्ञ': 'ஜ்ஞ',
  // Digits
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
  '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
  '।': '।', '॥': '॥',
};

function transliterateWithMap(text: string, map: Record<string, string>): string {
  if (!text) return '';
  let result = '';
  let i = 0;
  while (i < text.length) {
    const twoChar = text.slice(i, i + 2);
    if (map[twoChar]) {
      result += map[twoChar];
      i += 2;
      continue;
    }
    const char = text[i];
    result += map[char] ?? char;
    i++;
  }
  return result;
}

/**
 * Transliterates Devanagari text to Malayalam script (മലയാളം)
 */
export function devanagariToMalayalam(text: string): string {
  return transliterateWithMap(text, DEVA_TO_MALAYALAM);
}

/**
 * Transliterates Devanagari text to Telugu script (తెలుగు)
 */
export function devanagariToTelugu(text: string): string {
  return transliterateWithMap(text, DEVA_TO_TELUGU);
}

/**
 * Transliterates Devanagari text to Kannada script (ಕನ್ನಡ)
 */
export function devanagariToKannada(text: string): string {
  return transliterateWithMap(text, DEVA_TO_KANNADA);
}

/**
 * Transliterates Devanagari text to Gujarati script (ગુજરાતી)
 */
export function devanagariToGujarati(text: string): string {
  return transliterateWithMap(text, DEVA_TO_GUJARATI);
}

/**
 * Transliterates Devanagari text to Bengali script (বাংলা)
 */
export function devanagariToBengali(text: string): string {
  return transliterateWithMap(text, DEVA_TO_BENGALI);
}

/**
 * Transliterates Devanagari text to Tamil script (தமிழ் / கிரந்தம்)
 */
export function devanagariToTamil(text: string, cleanSuperscripts: boolean = true): string {
  const result = transliterateWithMap(text, DEVA_TO_TAMIL);
  if (cleanSuperscripts) {
    return result.replace(/[²³⁴]/g, '');
  }
  return result;
}

/**
 * Universal Sanskrit Script Transliteration Dispatcher
 */
export function transliterateSanskrit(text: string, targetScript: IndicScript | string): string {
  if (!text || targetScript === 'devanagari' || targetScript === 'en' || targetScript === 'hi' || targetScript === 'both') {
    return text;
  }

  switch (targetScript) {
    case 'te':
    case 'telugu':
      return devanagariToTelugu(text);
    case 'ta':
    case 'tamil':
      return devanagariToTamil(text);
    case 'kn':
    case 'kannada':
      return devanagariToKannada(text);
    case 'ml':
    case 'malayalam':
      return devanagariToMalayalam(text);
    case 'gu':
    case 'gujarati':
      return devanagariToGujarati(text);
    case 'bn':
    case 'bengali':
      return devanagariToBengali(text);
    default:
      return text;
  }
}

