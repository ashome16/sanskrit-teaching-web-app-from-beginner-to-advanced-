/**
 * Sanskrit Linguistic Types
 * Comprehensive types for Sanskrit word analysis and morphology
 */

// Syllable/Akṣara component
export interface Aksara {
  devanagari: string;
  transliteration: string;
  iotype: 'vowel' | 'consonant' | 'conjunct' | 'vowel-sign';
  description?: string;
  audioUrl?: string;
}

// Conjunct consonant (Samyuktākṣara)
export interface SamyuktAksara {
  devanagari: string;
  transliteration: string;
  components: string[]; // Individual consonants that make up the conjunct
  description?: string;
  audioUrl?: string;
}

// Prefix (Upasarga)
export interface Upasarga {
  devanagari: string;
  transliteration: string;
  meaning: string;
  examples?: string[];
}

// Suffix (Pratyaya)
export interface Pratyaya {
  devanagari: string;
  transliteration: string;
  type: 'nominal' | 'verbal' | 'adjectival'; // Type of suffix
  meaning?: string;
  examples?: string[];
}

// Noun case (Vibhakti)
export interface Vibhakti {
  name: string; // First, Second, Third, etc.
  devanagari: string;
  transliteration: string;
  meaning: string;
  example?: string;
}

// Root word (Dhātu)
export interface Dhatu {
  devanagari: string;
  transliteration: string;
  meaning: string;
  class?: number; // Verb class (1-10)
  description?: string;
  examples?: string[];
  audioUrl?: string;
}

// Noun inflection details
export interface NounInflection {
  gender: 'masculine' | 'feminine' | 'neuter';
  number: 'singular' | 'dual' | 'plural';
  case: number | string; // 1-8 corresponding to vibhakti; e.g. "1/2" for ambiguous neuter forms
  meaning?: string;
  example?: string;
}

// Verb inflection details
export interface VerbInflection {
  tense: 'present' | 'past' | 'future' | 'conditional' | 'imperative';
  person: '1st' | '2nd' | '3rd';
  number: 'singular' | 'dual' | 'plural';
  mood?: 'indicative' | 'subjunctive' | 'optative';
  meaning?: string;
  example?: string;
}

// Complete word breakdown
export interface SanskritWordBreakdown {
  id?: string;
  devanagari: string;
  transliteration: string;
  meaning: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'particle';
  
  // Phonetic breakdown
  syllables: Aksara[];
  conjunctConsonants: SamyuktAksara[]; // List of conjuncts found
  
  // Morphological breakdown
  dhatu?: Dhatu; // Root word
  upasargas?: Upasarga[]; // Prefixes
  pratyayas?: Pratyaya[]; // Suffixes
  
  // Grammatical details
  nounInflection?: NounInflection;
  verbInflection?: VerbInflection;
  vibhakti?: Vibhakti; // For noun cases
  
  // Additional info
  etymology?: string;
  synonyms?: string[];
  antonyms?: string[];
  relatedWords?: string[];
  examples?: string[];
  audioUrl?: string;
  notes?: string;
}

// Word lookup/search result
export interface SanskritWordLookup {
  results: SanskritWordBreakdown[];
  searchTerm: string;
  totalResults: number;
}

// Linguistic analysis configuration
export interface LinguisticConfig {
  showSyllables: boolean;
  showConjuncts: boolean;
  showRootWord: boolean;
  showGrammar: boolean;
  showEtymology: boolean;
  language: 'en' | 'sa'; // Display language
}
