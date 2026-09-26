export interface ArticleMeta {
  id: string;
  file: string;
  emoji: string;
  cardTitle: string;
  cardBlurb: string;
}

// To add a new article: drop a structured .txt file in public/grammar/,
// then add one entry here. Grammar.tsx handles the rest automatically.
export const ARTICLES: ArticleMeta[] = [
  {
    id: 'evolution-of-sound',
    file: 'grammar/article.txt',
    emoji: '📖',
    cardTitle: 'The Evolution of Sound',
    cardBlurb: 'From Vedic mantra to modern linguistics — why Sanskrit grammar matters.',
  },
  {
    id: 'ipa-secret-code',
    file: 'grammar/article-2.txt',
    emoji: '🔤',
    cardTitle: 'The Secret Code of Accents',
    cardBlurb: 'How ancient mouth-science became the blueprint for the IPA.',
  },
  {
    id: 'mouth-gym-shiva-sutras',
    file: 'grammar/article-3.txt',
    emoji: '🧩',
    cardTitle: 'The Mouth Gym',
    cardBlurb: "Pāṇini's Shiva Sutras, Pratyāhāras, and Sandhi as a phonetic programming language.",
  },
  {
    id: 'karakas-and-vibhaktis',
    file: 'grammar/article-4.txt',
    emoji: '🏛️',
    cardTitle: 'The Core Framework',
    cardBlurb: "How Sanskrit's 8 noun cases let words scramble freely and still make sense.",
  },
  {
    id: 'dna-of-sanskrit-dhatus',
    file: 'grammar/article-5.txt',
    emoji: '🧬',
    cardTitle: 'The DNA of Sanskrit',
    cardBlurb: 'Dhātu history, the 10 Gaṇas, English cognates, and Upasargas.',
  },
  {
    id: 'sandhi-how-sounds-join',
    file: 'grammar/article-6.txt',
    emoji: '🔗',
    cardTitle: 'सन्धि · Sandhi',
    cardBlurb: 'How sounds join — Svara Sandhi and the architecture of vowel transitions.',
  },
  {
    id: 'secret-code-upsarg-pratyaya',
    file: 'grammar/article-7.txt',
    emoji: '✨',
    cardTitle: 'The Secret Code of Words',
    cardBlurb: 'Upsarg, Pratyaya, and the legendary 21 Sup-Pratyaya power-up stickers.',
  },
  {
    id: 'sanskrit-symbols-punctuation',
    file: 'grammar/article-8.txt',
    emoji: '🖋️',
    cardTitle: 'चिह्न-परिचयः · Symbols & Punctuation',
    cardBlurb: 'Mātrās (vowel signs), Anusvāra, Visarga, Halanta, Daṇḍa (।), Double Daṇḍa (॥), Avagraha (ऽ), and sacred script marks.',
  },
  {
    id: 'linga-vachana-foundations',
    file: 'grammar/article-9.txt',
    emoji: '⚖️',
    cardTitle: 'लिङ्गं वचनं च · Gender & Number Foundations',
    cardBlurb: 'The 3 Genders, 3 Numbers, and the mathematical beauty of Sanskrit Subject-Verb agreement.',
  },
  {
    id: 'understanding-vibhaktis-balaka',
    file: 'grammar/article-10.txt',
    emoji: '🏛️',
    cardTitle: 'Understanding Vibhaktis (Case Endings)',
    cardBlurb: 'Master the 8 noun cases, kāraka roles, suffixes, and memory trick using Bālaka.',
  },
  {
    id: 'katapayadi-number-words',
    file: 'grammar/article-11.txt',
    emoji: '🔢',
    cardTitle: 'कटपयादि · Kaṭapayādi: Sacred Cipher of Mathematics',
    cardBlurb: 'How ancient India encoded π (32 decimals), the Golden Ratio (ϕ), Kerala astronomy, and 72 Melakarta rāgas into chantable Sanskrit poetry.',
  },
  {
    id: 'sanskrit-in-english',
    file: 'grammar/article-12.txt',
    emoji: '🌍',
    cardTitle: "संस्कृतम् in English · Sanskrit's Quiet Imprint on English",
    cardBlurb: '~100 everyday English words with Sanskrit roots — sugar, jungle, shampoo, karma — how they travelled, and which origins are still debated.',
  },
  {
    id: 'beginners-roadmap',
    file: 'grammar/article-13.txt',
    emoji: '🧭',
    cardTitle: "संस्कृत-मार्गदर्शिका · A Beginner's Roadmap to Learning Sanskrit",
    cardBlurb: 'Where to start, what to learn in what order, and how to practise: sound → grammar → stories → classics, plus an 8-week starter plan and a 20-minute daily routine.',
  },
];
