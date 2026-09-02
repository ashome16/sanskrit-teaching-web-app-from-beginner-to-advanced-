import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserProgress,
  QuizAttempt,
  PronunciationAttempt,
} from '../types';

interface AppStore {
  userId: string;
  progress: UserProgress;
  setUserId: (id: string) => void;
  markLessonComplete: (lessonId: string) => void;
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  recordPronunciationAttempt: (attempt: PronunciationAttempt) => void;
  updateCurrentLesson: (lessonId: string) => void;
  resetProgress: () => void;
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const calculateStreak = (lastActivityDate: number, previousStreak: number) => {
  const today = Date.now();
  const lastDayBucket = Math.floor(lastActivityDate / DAY_IN_MS);
  const todayBucket = Math.floor(today / DAY_IN_MS);

  if (todayBucket === lastDayBucket) {
    return previousStreak;
  }

  if (todayBucket - lastDayBucket === 1) {
    return previousStreak + 1;
  }

  return 1;
};

const defaultProgress: UserProgress = {
  userId: 'user_' + Math.random().toString(36).substr(2, 9),
  lessonsCompleted: [],
  quizzesCompleted: [],
  totalPoints: 0,
  streak: 0,
  lastActivityDate: Date.now(),
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      userId: defaultProgress.userId,
      progress: defaultProgress,

      setUserId: (id: string) =>
        set((state) => ({
          userId: id,
          progress: { ...state.progress, userId: id },
        })),

      markLessonComplete: (lessonId: string) =>
        set((state) => {
          const timestamp = Date.now();
          const nextStreak = calculateStreak(
            state.progress.lastActivityDate,
            state.progress.streak
          );

          return {
            progress: {
              ...state.progress,
              lessonsCompleted: [
                ...new Set([...state.progress.lessonsCompleted, lessonId]),
              ],
              streak: nextStreak,
              lastActivityDate: timestamp,
            },
          };
        }),

      recordQuizAttempt: (attempt: QuizAttempt) =>
        set((state) => {
          const timestamp = Date.now();
          const nextStreak = calculateStreak(
            state.progress.lastActivityDate,
            state.progress.streak
          );

          return {
            progress: {
              ...state.progress,
              quizzesCompleted: [...state.progress.quizzesCompleted, attempt],
              totalPoints: state.progress.totalPoints + attempt.score,
              streak: nextStreak,
              lastActivityDate: timestamp,
            },
          };
        }),

      recordPronunciationAttempt: (_attempt: PronunciationAttempt) =>
        set((state) => {
          const timestamp = Date.now();
          const nextStreak = calculateStreak(
            state.progress.lastActivityDate,
            state.progress.streak
          );

          return {
            progress: {
              ...state.progress,
              streak: nextStreak,
              lastActivityDate: timestamp,
            },
          };
        }),

      updateCurrentLesson: (lessonId: string) =>
        set((state) => ({
          progress: {
            ...state.progress,
            currentLessonId: lessonId,
            lastActivityDate: Date.now(),
          },
        })),

      resetProgress: () =>
        set(() => ({
          progress: { ...defaultProgress },
        })),
    }),
    {
      name: 'sanskrit-app-store',
    }
  )
);
