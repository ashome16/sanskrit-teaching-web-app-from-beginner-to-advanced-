import type { QuizQuestion, QuizAttempt } from '../types';

export interface QuizResult {
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  feedback: string;
}

export const calculateQuizScore = (
  questions: QuizQuestion[],
  userAnswers: { [questionId: string]: string }
): QuizResult => {
  let totalScore = 0;
  let totalPoints = 0;
  let correctAnswers = 0;

  questions.forEach((question) => {
    totalPoints += question.points;
    const userAnswer = userAnswers[question.id] || '';

    // Check if answer is correct
    let isCorrect = false;

    if (Array.isArray(question.correctAnswer)) {
      isCorrect = question.correctAnswer.some(
        (answer) =>
          answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()
      );
    } else {
      isCorrect =
        question.correctAnswer.toLowerCase().trim() ===
        userAnswer.toLowerCase().trim();
    }

    if (isCorrect) {
      totalScore += question.points;
      correctAnswers += 1;
    }
  });

  const percentage = (totalScore / totalPoints) * 100;
  const passed = percentage >= 70; // 70% is passing

  return {
    score: totalScore,
    totalPoints,
    percentage: Math.round(percentage),
    passed,
    feedback:
      correctAnswers === questions.length
        ? 'Perfect! You got all answers correct!'
        : passed
          ? `Great job! You answered ${correctAnswers} out of ${questions.length} questions correctly.`
          : `You need more practice. You answered ${correctAnswers} out of ${questions.length} questions correctly. Keep learning!`,
  };
};

export const formatQuizAttempt = (
  quizId: string,
  userId: string,
  questions: QuizQuestion[],
  userAnswers: { [questionId: string]: string }
): QuizAttempt => {
  const result = calculateQuizScore(questions, userAnswers);

  const answers = questions.map((question) => {
    const userAnswer = userAnswers[question.id] || '';
    let isCorrect = false;

    if (Array.isArray(question.correctAnswer)) {
      isCorrect = question.correctAnswer.some(
        (answer) =>
          answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()
      );
    } else {
      isCorrect =
        question.correctAnswer.toLowerCase().trim() ===
        userAnswer.toLowerCase().trim();
    }

    return {
      questionId: question.id,
      userAnswer,
      correct: isCorrect,
      points: isCorrect ? question.points : 0,
    };
  });

  return {
    id: `attempt_${Date.now()}`,
    quizId,
    userId,
    timestamp: Date.now(),
    score: result.score,
    totalPoints: result.totalPoints,
    answers,
  };
};

// Local Storage Utilities
const STORAGE_PREFIX = 'sanskrit_app_';

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_PREFIX + key, serialized);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const clearAllLocalStorage = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// IndexedDB Utilities for larger data storage
export interface IndexedDBConfig {
  dbName: string;
  version: number;
  stores: { name: string; keyPath: string; indexes?: string[] }[];
}

export class IndexedDBHandler {
  private db: IDBDatabase | null = null;

  async init(config: IndexedDBConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(config.dbName, config.version);

      request.onerror = () => {
        reject(new Error('IndexedDB open failed'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        config.stores.forEach((store) => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objStore = db.createObjectStore(store.name, {
              keyPath: store.keyPath,
            });

            if (store.indexes) {
              store.indexes.forEach((index) => {
                objStore.createIndex(index, index, { unique: false });
              });
            }
          }
        });
      };
    });
  }

  async save<T>(storeName: string, data: T): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onerror = () => reject(new Error('Save failed'));
      request.onsuccess = () => resolve();
    });
  }

  async get<T>(storeName: string, key: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(new Error('Get failed'));
      request.onsuccess = () => resolve(request.result as T || null);
    });
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(new Error('GetAll failed'));
      request.onsuccess = () => resolve(request.result as T[]);
    });
  }

  async delete(storeName: string, key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(new Error('Delete failed'));
      request.onsuccess = () => resolve();
    });
  }

  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

export const createIndexedDBHandler = (_dbName: string = 'SanskritApp') => {
  return new IndexedDBHandler();
};
