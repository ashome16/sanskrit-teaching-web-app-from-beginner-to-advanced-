// Verse/Section structure - represents a complete learning unit for one verse
export interface LessonVerse {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  devanagari: string;
  transliteration: string;
  meaning: string;
  pronunciation?: string; // Guide for pronunciation
  examples?: string[]; // Grammar/vocabulary examples
  wordPractice?: Array<{
    word: string;
    devanagari: string;
    pronunciation: string;
    transliteration: string;
  }>;
}

// Lesson Types
export interface Lesson {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  description: string;
  duration: number; // in minutes
  pdfUrl?: string; // Optional PDF for the lesson
  introduction?: string; // Introduction text
  verses?: LessonVerse[]; // Progressive verses/sentences to learn (optional for legacy lessons)
  content?: LessonContent[]; // Legacy support
}

export interface LessonContent {
  type: 'text' | 'audio' | 'video' | 'interactive' | 'pronunciation' | 'pdf';
  title: string;
  description: string;
  data: {
    text?: string;
    audioUrl?: string;
    videoUrl?: string;
    pdfUrl?: string;
    devanagari?: string;
    transliteration?: string;
    pronunciation?: string;
    meaning?: string;
    examples?: string[];
  };
}

// Quiz Types
export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'pronunciation';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  timestamp: number;
  score: number;
  totalPoints: number;
  answers: {
    questionId: string;
    userAnswer: string;
    correct: boolean;
    points: number;
  }[];
}

// User Progress Types
export interface UserProgress {
  userId: string;
  lessonsCompleted: string[];
  quizzesCompleted: QuizAttempt[];
  currentLessonId?: string;
  totalPoints: number;
  streak: number;
  lastActivityDate: number;
}

export interface PronunciationAttempt {
  id: string;
  word: string;
  devanagari: string;
  recordedAudio?: Blob;
  accuracy?: number;
  timestamp: number;
  correct: boolean;
}
