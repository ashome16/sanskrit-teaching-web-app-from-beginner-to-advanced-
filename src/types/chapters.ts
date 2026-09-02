export interface LessonSentence {
  sanskrit: string;
  meaning: string;
  words: string[];
  paragraphTranslation?: string;
  /** Phonetic group label (e.g. "स्वराः") for varṇamālā rows only. */
  category?: string;
}

export interface Lesson {
  id: string;
  fileName: string;
  title: string;
  sentences: LessonSentence[];
}

export interface LessonsRegistry {
  lessons: Lesson[];
}
