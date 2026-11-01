/** Shared Varṇamālā grouping + row metadata (TextbookReader studio and homepage POQ). */
export const VARNAMALA_LETTER_GROUPS: string[][] = [
  ['अ','आ','इ','ई','उ','ऊ','ऋ','ॠ','ऌ','ए','ऐ','ओ','औ'],
  ['क','ख','ग','घ','ङ'],
  ['च','छ','ज','झ','ञ'],
  ['ट','ठ','ड','ढ','ण'],
  ['त','थ','द','ध','न'],
  ['प','फ','ब','भ','म'],
  ['य','र','ल','व'],
  ['श','ष','स','ह'],
  ['अं','अः','अँ'],
  ['क्ष','ज्ञ','त्र','श्र'],
];

export const VARGA_COLUMN_GUIDE = [
  { badge: '१st · अघोष', title: 'अल्पप्राण', sub: 'Unvoiced Soft' },
  { badge: '२nd · अघोष', title: 'महाप्राण', sub: 'Unvoiced Aspirate' },
  { badge: '३rd · घोष', title: 'अल्पप्राण', sub: 'Voiced Soft' },
  { badge: '४th · घोष', title: 'महाप्राण', sub: 'Voiced Aspirate' },
  { badge: '५th · नासिक्य', title: 'अनुनासिक', sub: 'Nasal Voiced' },
];

export interface VarnamalaGroupMetadata {
  title: string;
  articulation: string;
  description: string;
  count: string;
  layoutClass: string;
  isVarga?: boolean;
}

export const getVarnamalaGroupMeta = (groupIdx: number): VarnamalaGroupMetadata => {
  switch (groupIdx) {
    case 0:
      return {
        title: 'स्वराः · Vowels (Vocalic Resonance)',
        articulation: 'स्वतन्त्र-ध्वनयः · Independent Vocals',
        description: 'ह्रस्व-दीर्घ-प्लुत-भेदाः · 13 pure vocal sounds uttered freely without oral contact or obstruction.',
        count: '१३ वर्णाः',
        layoutClass: 'varnamala-row-letters--svara',
      };
    case 1:
      return {
        title: 'क-वर्गः · Velars (कण्ठ्य)',
        articulation: 'स्थानम्: कण्ठः · Throat / Guttural',
        description: 'उच्चारण-स्थानम् कण्ठः · Articulated at the soft palate (velum) in the back of the throat.',
        count: '५ वर्णाः',
        layoutClass: 'varnamala-row-letters--varga',
        isVarga: true,
      };
    case 2:
      return {
        title: 'च-वर्गः · Palatals (तालव्य)',
        articulation: 'स्थानम्: तालु · Hard Palate',
        description: 'उच्चारण-स्थानम् तालु · Flat surface of the tongue contacts the hard palate roof.',
        count: '५ वर्णाः',
        layoutClass: 'varnamala-row-letters--varga',
        isVarga: true,
      };
    case 3:
      return {
        title: 'ट-वर्गः · Retroflexes (मूर्धन्य)',
        articulation: 'स्थानम्: मूर्धा · Alveolar Ridge / Cerebral',
        description: 'उच्चारण-स्थानम् मूर्धा · Tongue tip curls back and taps the hard upper alveolar ridge.',
        count: '५ वर्णाः',
        layoutClass: 'varnamala-row-letters--varga',
        isVarga: true,
      };
    case 4:
      return {
        title: 'त-वर्गः · Dentals (दन्त्य)',
        articulation: 'स्थानम्: दन्ताः · Upper Teeth',
        description: 'उच्चारण-स्थानम् दन्ताः · Tip of the tongue touches the back of the upper front teeth.',
        count: '५ वर्णाः',
        layoutClass: 'varnamala-row-letters--varga',
        isVarga: true,
      };
    case 5:
      return {
        title: 'प-वर्गः · Labials (ओष्ठ्य)',
        articulation: 'स्थानम्: ओष्ठौ · Lips',
        description: 'उच्चारण-स्थानम् ओष्ठौ · Bilabial sounds formed by closing and releasing both lips.',
        count: '५ वर्णाः',
        layoutClass: 'varnamala-row-letters--varga',
        isVarga: true,
      };
    case 6:
      return {
        title: 'अन्तःस्थाः · Semivowels (Liquid Transitions)',
        articulation: 'मध्यस्थाः · Semi-Vocalic (In-Between)',
        description: 'ध्वनि-संक्रमणम् · Smooth acoustic bridge between pure vowels and obstructive consonants (य, र, ल, व).',
        count: '४ वर्णाः',
        layoutClass: 'varnamala-row-letters--quad',
      };
    case 7:
      return {
        title: 'ऊष्माणः · Sibilants & Aspirate (Warm Breath)',
        articulation: 'वायु-घर्षणम् · Fricatives & Breath',
        description: 'घर्षण-ध्वनयः · Airflow forced through narrow vocal channels producing warm hissing and aspiration (श, ष, स, ह).',
        count: '४ वर्णाः',
        layoutClass: 'varnamala-row-letters--quad',
      };
    case 8:
      return {
        title: 'अयोगवाहाः · Dependent Modifiers',
        articulation: 'पराश्रिताः · Attached Resonances',
        description: 'अयोगवाहाः ध्वनयः · Pure nasal humming (ं Anusvāra), gentle vowel echo (ः Visarga), and nasalized vowel (ँ Candrabindu).',
        count: '३ वर्णाः',
        layoutClass: 'varnamala-row-letters--tri',
      };
    case 9:
      return {
        title: 'संयुक्ताक्षराणि · Primary Conjuncts',
        articulation: 'विशिष्ट-संयोगाः · Classic Ligatures',
        description: 'अक्षर-संयोगः · Fundamental dual-consonant ligatures essential for authentic Sanskrit reading (क्ष, ज्ञ, त्र, श्र).',
        count: '४ वर्णाः',
        layoutClass: 'varnamala-row-letters--quad',
      };
    default:
      return {
        title: '',
        articulation: '',
        description: '',
        count: '',
        layoutClass: '',
      };
  }
};
