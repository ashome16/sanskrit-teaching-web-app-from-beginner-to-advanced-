import type { Lesson, LessonVerse } from '../types';

/**
 * Unified, lightweight step types for memory efficiency.
 * - 'introduction': Overview/context blocks, PDFs, and explanatory text
 * - 'sentence': Sanskrit text with pronunciation, word breakdowns, and practice
 * - 'grammar': Grammar rules, vocabulary, and linguistic examples
 * - 'checklist': Final review and completion milestone for current verse
 */
export type LessonStepType = 'introduction' | 'sentence' | 'grammar' | 'checklist';

/**
 * Lightweight Sanskrit line structure - only essential fields stored.
 * - original: Devanagari/original script
 * - transliterated: IAST or phonetic transliteration
 * - breakdown: Pronunciation guide or word analysis
 * - meaning: Semantic content or translation
 */
export interface LessonStepSanskritLine {
  original: string;
  transliterated?: string;
  breakdown?: string;
  meaning: string;
}

/**
 * Unified LessonStep interface optimized for memory efficiency.
 *
 * Memory optimization strategy:
 * - Only ONE step is ever mounted to the DOM at a time (forced via key={step.id})
 * - No duplicate data across steps
 * - Minimal field footprint per step
 * - Garbage collection triggers cleanly on navigation (prev/next)
 * - Checklist triggers verse progression (next verse) after completion
 *
 * Usage: When currentStepIndex changes, React unmounts the old step completely
 * and mounts only the new step's DOM, preventing memory leaks from accumulated DOM nodes.
 */
export interface LessonStep {
  id: string;
  type: LessonStepType;
  title: string;
  subtitle?: string;
  content: {
    heading?: string;
    bodyText?: string;
    /** PDF URL stored inline for introduction-type steps */
    pdfUrl?: string;
    /** Clean array of Sanskrit content - each line is a discrete unit */
    sanskritLines?: LessonStepSanskritLine[];
  };
}

/**
 * Metadata about verses in a lesson.
 * Used to manage progression between verses.
 */
export interface VerseMetadata {
  verseIndex: number;
  totalVerses: number;
  isLastVerse: boolean;
}

/**
 * Builds learning steps for a single verse within a lesson.
 * This enables progressive learning through multiple verses with
 * clean transitions and garbage collection between verses.
 *
 * Flow: [Optional Lesson PDF] -> [Verse Text] -> [Word Practice] -> [Grammar] -> [Checklist for Next Verse]
 *
 * @param lesson - The lesson (for PDF and intro)
 * @param verse - The specific verse to build steps for
 * @param verseIndex - Index of this verse (0-based)
 * @param totalVerses - Total verses in lesson
 * @returns Array of LessonStep objects for this verse
 */
export function buildLessonStepsForVerse(
  lesson: Lesson,
  verse: LessonVerse,
  verseIndex: number,
  totalVerses: number
): LessonStep[] {
  const steps: LessonStep[] = [];

  // Only add lesson PDF and introduction on FIRST verse
  if (verseIndex === 0) {
    // Add PDF if available
    if (lesson.pdfUrl) {
      steps.push({
        id: `${lesson.id}-pdf`,
        type: 'introduction',
        title: 'Lesson PDF',
        subtitle: 'View the full lesson material',
        content: {
          pdfUrl: lesson.pdfUrl,
          bodyText: lesson.introduction || 'View the complete lesson PDF below.',
        },
      });
    }

    // Add lesson introduction text if available
    if (lesson.introduction) {
      steps.push({
        id: `${lesson.id}-intro`,
        type: 'introduction',
        title: 'Lesson Introduction',
        subtitle: 'Overview and context',
        content: {
          heading: lesson.title,
          bodyText: lesson.introduction,
        },
      });
    }
  }

  // Add verse introduction
  steps.push({
    id: `${lesson.id}-verse-${verseIndex}-intro`,
    type: 'introduction',
    title: verse.title,
    subtitle: verse.subtitle || verse.description,
    content: {
      bodyText: verse.description,
    },
  });

  // Add verse text (split multi-line verses into individual steps)
  const sanskritLines = verse.devanagari.split('\n').filter(Boolean);
  const translitLines = (verse.transliteration || '').split('\n').filter(Boolean);

  sanskritLines.forEach((line, lineIdx) => {
    steps.push({
      id: `${lesson.id}-verse-${verseIndex}-line-${lineIdx}`,
      type: 'sentence',
      title:
        sanskritLines.length > 1
          ? `${verse.title} (Line ${lineIdx + 1}/${sanskritLines.length})`
          : verse.title,
      subtitle: 'Practice pronunciation and meaning',
      content: {
        sanskritLines: [
          {
            original: line,
            transliterated: translitLines[lineIdx],
            breakdown: verse.pronunciation,
            meaning: verse.meaning,
          },
        ],
      },
    });
  });

  // Add word-by-word pronunciation practice if available
  if (verse.wordPractice && verse.wordPractice.length > 0) {
    verse.wordPractice.forEach((word, wordIdx) => {
      steps.push({
        id: `${lesson.id}-verse-${verseIndex}-word-${wordIdx}`,
        type: 'sentence',
        title: `Word Practice: ${word.word}`,
        subtitle: 'Practice individual word pronunciation',
        content: {
          sanskritLines: [
            {
              original: word.devanagari,
              transliterated: word.transliteration,
              breakdown: word.pronunciation,
              meaning: word.word,
            },
          ],
        },
      });
    });
  }

  // Add grammar/vocabulary examples if available
  if (verse.examples && verse.examples.length > 0) {
    steps.push({
      id: `${lesson.id}-verse-${verseIndex}-grammar`,
      type: 'grammar',
      title: `${verse.title} - Grammar & Vocabulary`,
      subtitle: 'Understanding the components',
      content: {
        heading: 'Grammar Breakdown',
        sanskritLines: verse.examples.map((example) => ({
          original: example,
          meaning: example,
        })),
      },
    });
  }

  // Add checklist (triggers progression to next verse or lesson completion)
  const isLastVerse = verseIndex === totalVerses - 1;
  steps.push({
    id: `${lesson.id}-verse-${verseIndex}-checklist`,
    type: 'checklist',
    title: isLastVerse ? 'Lesson Complete!' : `Verse ${verseIndex + 1} Complete`,
    subtitle: isLastVerse
      ? 'You have completed all verses in this lesson.'
      : `Ready for Verse ${verseIndex + 2}? Click "Next" to continue.`,
    content: {
      bodyText: isLastVerse ? 'All verses learned!' : 'Next verse coming up!',
    },
  });

  return steps;
}

/**
 * Legacy function to support old lesson format with flat content array.
 * Builds all steps from a lesson's content blocks.
 *
 * @deprecated Use buildLessonStepsForVerse for new lessons with verses
 */
function buildLessonStepsLegacy(lesson: Lesson): LessonStep[] {
  const steps: LessonStep[] = [];

  const content = lesson.content || [];

  content.forEach((item, index) => {
    // PDF blocks: stored as introduction type with pdfUrl
    if (item.type === 'pdf') {
      steps.push({
        id: `${lesson.id}-pdf-${index}`,
        type: 'introduction',
        title: item.title,
        subtitle: item.description,
        content: {
          pdfUrl: item.data.pdfUrl,
          bodyText: item.data.text,
        },
      });
      return;
    }

    // Pronunciation practice: converted to sentence type for unified schema
    if (item.type === 'pronunciation') {
      steps.push({
        id: `${lesson.id}-word-${index}`,
        type: 'sentence',
        title: item.title,
        subtitle: item.description,
        content: {
          sanskritLines: [
            {
              original: item.data.devanagari || '',
              transliterated: item.data.transliteration,
              breakdown: item.data.pronunciation,
              meaning: item.data.text || '',
            },
          ],
        },
      });
      return;
    }

    // Sanskrit text blocks: split multi-line verses into individual steps
    if (item.data.devanagari) {
      const sanskritLines = item.data.devanagari.split('\n').filter(Boolean);
      const translitLines = (item.data.transliteration || '').split('\n').filter(Boolean);

      sanskritLines.forEach((line, lineIdx) => {
        steps.push({
          id: `${lesson.id}-sentence-${index}-${lineIdx}`,
          type: 'sentence',
          title:
            sanskritLines.length > 1
              ? `${item.title} (Line ${lineIdx + 1}/${sanskritLines.length})`
              : item.title,
          subtitle: item.description,
          content: {
            sanskritLines: [
              {
                original: line,
                transliterated: translitLines[lineIdx],
                meaning: item.data.meaning || '',
              },
            ],
          },
        });
      });
      return;
    }

    // Grammar/vocabulary blocks with examples
    if (item.data.examples && item.data.examples.length > 0) {
      steps.push({
        id: `${lesson.id}-grammar-${index}`,
        type: 'grammar',
        title: item.title,
        subtitle: item.description,
        content: {
          heading: item.title,
          bodyText: item.data.text,
          sanskritLines: item.data.examples.map((example) => ({
            original: example,
            meaning: example,
          })),
        },
      });
      return;
    }

    // Plain-text blocks (introductions, overviews) with no Sanskrit content
    steps.push({
      id: `${lesson.id}-intro-${index}`,
      type: 'introduction',
      title: item.title,
      subtitle: item.description,
      content: {
        heading: item.title,
        bodyText: item.data.text,
      },
    });
  });

  // Final checklist step for lesson completion
  steps.push({
    id: `${lesson.id}-checklist`,
    type: 'checklist',
    title: 'Checklist & Completion',
    subtitle: 'Review what you practiced, then finish the lesson.',
    content: {},
  });

  return steps;
}

/**
 * Main entry point to build lesson steps.
 * Automatically routes to verse-based or legacy builder based on lesson structure.
 *
 * @param lesson - The lesson to build steps for
 * @param currentVerseIndex - Current verse index (for verse-based lessons)
 * @returns Array of LessonStep objects
 */
export function buildLessonSteps(lesson: Lesson, currentVerseIndex = 0): LessonStep[] {
  // New verse-based lesson format
  if (lesson.verses && lesson.verses.length > 0) {
    const verse = lesson.verses[currentVerseIndex];
    if (!verse) {
      return [];
    }
    return buildLessonStepsForVerse(lesson, verse, currentVerseIndex, lesson.verses.length);
  }

  // Legacy content array format
  return buildLessonStepsLegacy(lesson);
}
