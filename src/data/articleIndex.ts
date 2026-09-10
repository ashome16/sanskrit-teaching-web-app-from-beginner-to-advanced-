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
];