export interface LessonSentence {
  sanskrit: string;
  meaning: string;
  words: string[];
  paragraphTranslation?: string;
  /** Phonetic group label (e.g. "स्वराः") for varṇamālā rows only. */
  category?: string;
  /** glossary-header | glossary — शब्दार्थ exercise rows */
  kind?: string;
  sanskrit_gloss?: string;
  hindi_gloss?: string;
  answer_sanskrit?: string;
  answer_label?: string;
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
