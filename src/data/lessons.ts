import type { Lesson, Quiz } from '../types';
import type { Lesson as ChapterLesson } from '../types/chapters';
import { LESSONS as extractedLessons, fetchLatestChapters } from './chapters';

const toLegacyLesson = (lesson: ChapterLesson, lessonIndex: number): Lesson => ({
  id: lesson.id,
  title: lesson.title,
  level: 'beginner',
  order: lessonIndex + 1,
  description: `Extracted from ${lesson.fileName}.`,
  duration: Math.max(5, lesson.sentences.length),
  pdfUrl: `/${lesson.fileName}`,
  verses: lesson.sentences.map((sentence, sentenceIndex) => ({
    id: `${lesson.id}-sentence-${sentenceIndex + 1}`,
    title: `Sentence ${sentenceIndex + 1}`,
    description: sentence.sanskrit,
    devanagari: sentence.sanskrit,
    transliteration: '',
    meaning: sentence.meaning,
    examples: sentence.words,
  })),
});

export const LESSONS: Lesson[] = extractedLessons.map(toLegacyLesson);

export const QUIZZES: Quiz[] = [];

export const getLessonById = (id: string): Lesson | undefined =>
  LESSONS.find((lesson) => lesson.id === id);

// Re-fetches chapters.json (cache-busted) and re-maps the requested lesson,
// so LessonPage always reflects the latest generated content.
export const fetchLatestLessonById = async (id: string): Promise<Lesson | undefined> => {
  const chapterLessons = await fetchLatestChapters();
  const index = chapterLessons.findIndex((lesson) => lesson.id === id);
  if (index === -1) return undefined;
  return toLegacyLesson(chapterLessons[index], index);
};


export const getQuizByLessonId = (lessonId: string): Quiz | undefined =>
  QUIZZES.find((quiz) => quiz.lessonId === lessonId);

export const getLessonsByLevel = (level: Lesson['level']): Lesson[] =>
  LESSONS.filter((lesson) => lesson.level === level);

export const getDeepakamLessons = (): Lesson[] => LESSONS;

export const getLessonSanskritText = (lesson: Lesson): string =>
  lesson.verses?.map((verse) => verse.devanagari).join('\n') || '';
