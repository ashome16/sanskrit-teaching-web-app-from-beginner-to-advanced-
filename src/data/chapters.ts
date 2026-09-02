import type { Lesson, LessonsRegistry } from '../types/chapters';
import lessonsData from './chapters.json';

// varnamala.txt (the alphabet guide) is first; gsde101.txt (Lesson 1) follows.
export const LESSONS: Lesson[] = (lessonsData as LessonsRegistry).lessons;

export const getLessonById = (id: string): Lesson | undefined =>
  LESSONS.find((lesson) => lesson.id === id);

// Cache-busted runtime fetch of chapters.json so freshly regenerated lesson
// content (e.g. after re-running extract_txt.py) shows up without a hard reload.
export const fetchLatestChapters = async (): Promise<Lesson[]> => {
  const response = await fetch(`./chapters.json?t=${Date.now()}`);
  const data = (await response.json()) as LessonsRegistry;
  return data.lessons;
};
