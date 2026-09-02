import type { Lesson, LessonContent } from '../types';

/**
 * Represents a vocabulary item from a lesson with context
 */
export interface LessonVocabularyItem {
  id: string;
  devanagari: string;
  transliteration: string;
  meaning?: string;
  context: string; // Where this word appears in lesson
  frequency: number; // How many times it appears
}

/**
 * Extract all Sanskrit vocabulary from a lesson's entire content
 * Aggregates words from all steps, verses, and examples
 *
 * @param lesson - The lesson to extract vocabulary from
 * @returns Array of unique vocabulary items with frequency and context
 */
export function extractLessonVocabulary(lesson: Lesson): LessonVocabularyItem[] {
  const vocabMap = new Map<string, LessonVocabularyItem>();

  // Extract from verse-based lessons
  if (lesson.verses && lesson.verses.length > 0) {
    lesson.verses.forEach((verse, verseIndex) => {
      // Extract from verse main text
      if (verse.devanagari) {
        const words = extractWordsFromDevanagari(verse.devanagari);
        words.forEach((word) => {
          addVocabularyItem(
            vocabMap,
            word.devanagari,
            word.transliteration,
            `Verse ${verseIndex + 1}: ${verse.title}`,
            verse.meaning || ''
          );
        });
      }

      // Extract from word practice
      if (verse.wordPractice && verse.wordPractice.length > 0) {
        verse.wordPractice.forEach((wordItem) => {
          addVocabularyItem(
            vocabMap,
            wordItem.devanagari,
            wordItem.transliteration,
            `${verse.title} (Word Practice)`,
            `Pronunciation: ${wordItem.pronunciation}`
          );
        });
      }

      // Extract from examples/grammar
      if (verse.examples && verse.examples.length > 0) {
        verse.examples.forEach((example) => {
          const words = extractWordsFromDevanagari(example);
          words.forEach((word) => {
            addVocabularyItem(
              vocabMap,
              word.devanagari,
              word.transliteration,
              `${verse.title} (Grammar Example)`,
              ''
            );
          });
        });
      }
    });
  }

  // Extract from legacy content array
  if (lesson.content && lesson.content.length > 0) {
    lesson.content.forEach((item: LessonContent) => {
      // Extract from devanagari content
      if (item.data.devanagari) {
        const words = extractWordsFromDevanagari(item.data.devanagari);
        words.forEach((word) => {
          addVocabularyItem(
            vocabMap,
            word.devanagari,
            word.transliteration,
            item.title,
            item.data.meaning || ''
          );
        });
      }

      // Extract from pronunciation items
      if (item.type === 'pronunciation' && item.data.devanagari) {
        addVocabularyItem(
          vocabMap,
          item.data.devanagari,
          item.data.transliteration || '',
          `${item.title} (Pronunciation)`,
          item.data.pronunciation || ''
        );
      }

      // Extract from examples
      if (item.data.examples && item.data.examples.length > 0) {
        item.data.examples.forEach((example: string) => {
          const words = extractWordsFromDevanagari(example);
          words.forEach((word) => {
            addVocabularyItem(
              vocabMap,
              word.devanagari,
              word.transliteration,
              `${item.title} (Example)`,
              ''
            );
          });
        });
      }
    });
  }

  // Convert map to sorted array (by frequency, then alphabetically)
  return Array.from(vocabMap.values())
    .sort((a, b) => {
      if (b.frequency !== a.frequency) {
        return b.frequency - a.frequency;
      }
      return a.devanagari.localeCompare(b.devanagari);
    });
}

/**
 * Check if a string contains Devanagari characters
 * Used to filter out English words from vocabulary extraction
 *
 * @param text - Text to check
 * @returns true if text contains Devanagari characters, false otherwise
 */
function containsDevanagari(text: string): boolean {
  // Devanagari Unicode range: U+0900 to U+097F
  const devanagariRegex = /[\u0900-\u097F]/;
  return devanagariRegex.test(text);
}

/**
 * Extract individual words from Devanagari text
 * Splits on whitespace and punctuation
 * Filters out English words and non-Devanagari text
 *
 * @param devanagariText - Text in Devanagari script
 * @returns Array of word objects with devanagari and transliteration (only Devanagari words)
 */
function extractWordsFromDevanagari(
  devanagariText: string
): Array<{ devanagari: string; transliteration: string }> {
  // Split on whitespace and common punctuation
  const words = devanagariText.split(/[\s।॥\.\,\!\?\-\()\[\]]+/).filter((word) => word.length > 0);

  // Filter to only include words with Devanagari characters
  return words
    .filter((word) => containsDevanagari(word))
    .map((word) => ({
      devanagari: word,
      transliteration: word, // In a real app, would use proper transliteration library
    }));
}

/**
 * Add or update a vocabulary item in the map
 * Tracks frequency and context
 * Only adds items with Devanagari characters
 */
function addVocabularyItem(
  map: Map<string, LessonVocabularyItem>,
  devanagari: string,
  transliteration: string,
  context: string,
  meaning: string
): void {
  // Only add if the word contains Devanagari characters
  if (!containsDevanagari(devanagari)) {
    return;
  }

  const key = devanagari;

  if (map.has(key)) {
    const existing = map.get(key)!;
    existing.frequency += 1;
    if (meaning && !existing.meaning) {
      existing.meaning = meaning;
    }
    // Append context if different
    if (!existing.context.includes(context)) {
      existing.context += ` | ${context}`;
    }
  } else {
    map.set(key, {
      id: `vocab-${devanagari}-${Date.now()}`,
      devanagari,
      transliteration,
      meaning: meaning || transliteration,
      context,
      frequency: 1,
    });
  }
}

/**
 * Get all unique Sanskrit words from all lesson steps
 * Useful for creating a vocabulary list for a lesson
 *
 * @param lesson - The lesson to analyze
 * @param currentVerseIndex - Current verse index (for verse-based lessons)
 * @returns Array of vocabulary items
 */
export function getLessonVocabularyFromSteps(
  lesson: Lesson,
  currentVerseIndex?: number
): LessonVocabularyItem[] {
  const vocabulary = extractLessonVocabulary(lesson);

  if (currentVerseIndex === undefined || !lesson.verses || lesson.verses.length === 0) {
    return vocabulary;
  }

  const targetVerseLabel = `Verse ${currentVerseIndex + 1}`;
  return vocabulary.filter((item) => item.context.includes(targetVerseLabel));
}
