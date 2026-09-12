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
    id: 'karakas-vibhaktis',
    file: 'grammar/article-4.txt',
    emoji: '🏷️',
    cardTitle: 'Kārakas and Vibhaktis',
    cardBlurb: 'The 8 noun cases that let Sanskrit words scramble freely and still make sense.',
  },
];