import type { Lesson, LessonsRegistry } from '../types/chapters';
import { LESSON_STUBS } from './lessonStubs';

// Lightweight stubs for initial fast render without bundling 2.7MB chapters.json into the entry chunk
export const LESSONS: Lesson[] = LESSON_STUBS;

export const getLessonById = (id: string): Lesson | undefined =>
  LESSONS.find((lesson) => lesson.id === id);

let cachedChapters: Lesson[] | null = null;

// Loads complete chapters data: prefers Vite content-hashed chunk (gzipped ~449KB & browser-cached),
// with fallback to public/chapters.json and LESSON_STUBS.
export const fetchLatestChapters = async (): Promise<Lesson[]> => {
  if (cachedChapters && cachedChapters.length > 0) {
    return cachedChapters;
  }
  try {
    const mod = await import('./chapters.json');
    const data = mod.default as LessonsRegistry;
    if (data?.lessons?.length) {
      cachedChapters = data.lessons;
      return data.lessons;
    }
  } catch {
    /* fallback to fetch from public/ */
  }
  try {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const chaptersUrl = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}chapters.json`;
    const response = await fetch(chaptersUrl);
    if (response.ok) {
      const data = (await response.json()) as LessonsRegistry;
      if (data?.lessons?.length) {
        cachedChapters = data.lessons;
        return data.lessons;
      }
    }
  } catch {
    /* fallback to stubs */
  }
  return LESSON_STUBS;
};
