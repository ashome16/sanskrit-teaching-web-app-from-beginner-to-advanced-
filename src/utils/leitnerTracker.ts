/**
 * Leitner System Spaced Repetition Tracker for Jodo Studio (6,000+ words).
 *
 * Implements classical Leitner 5-box intervals with intelligent resurfacing:
 * - Box 1: 4 hours (Immediate reinforcement for new & failed words)
 * - Box 2: 24 hours (1 day)
 * - Box 3: 72 hours (3 days)
 * - Box 4: 168 hours (7 days)
 * - Box 5: 336 hours (14 days — Mastered / Long-term Memory)
 */

export interface LeitnerCard {
  word: string;
  shelfId: string;
  english?: string;
  box: number; // 1 to 5
  nextReviewTime: number; // Epoch timestamp (ms)
  lastReviewedTime: number;
  totalReviews: number;
  consecutiveCorrect: number;
  lapses: number;
}

export interface LeitnerStats {
  totalTracked: number;
  boxCounts: Record<number, number>;
  dueCount: number;
  masteredCount: number;
  accuracyRate: number;
}

const STORAGE_KEY = 'jodo_leitner_system_v1';

// Intervals in milliseconds
export const LEITNER_INTERVALS_MS: Record<number, number> = {
  1: 4 * 60 * 60 * 1000,        // 4 hours
  2: 24 * 60 * 60 * 1000,       // 1 day
  3: 3 * 24 * 60 * 60 * 1000,   // 3 days
  4: 7 * 24 * 60 * 60 * 1000,   // 7 days
  5: 14 * 24 * 60 * 60 * 1000,  // 14 days (Mastered)
};

export const LEITNER_BOX_LABELS: Record<number, { title: string; interval: string; color: string; icon: string }> = {
  1: { title: 'Box 1: Novice', interval: 'Review in 4h', color: '#ef4444', icon: '🌱' },
  2: { title: 'Box 2: Learning', interval: 'Review in 1d', color: '#f59e0b', icon: '🌿' },
  3: { title: 'Box 3: Familiar', interval: 'Review in 3d', color: '#3b82f6', icon: '🌳' },
  4: { title: 'Box 4: Retained', interval: 'Review in 7d', color: '#8b5cf6', icon: '⭐' },
  5: { title: 'Box 5: Mastered', interval: 'Review in 14d', color: '#10b981', icon: '🌟' },
};

class LeitnerTracker {
  private cards: Map<string, LeitnerCard> = new Map();
  private initialized = false;

  constructor() {
    this.load();
  }

  private load(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as LeitnerCard[];
        if (Array.isArray(parsed)) {
          this.cards.clear();
          for (const card of parsed) {
            if (card?.word) {
              this.cards.set(card.word, card);
            }
          }
        }
      }
    } catch {
      // Storage unavailable or invalid JSON
    }
    this.initialized = true;
  }

  private save(): void {
    if (typeof window === 'undefined') return;
    try {
      const arr = Array.from(this.cards.values());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch {
      // Quota exceeded or private browsing
    }
  }

  public getCard(word: string): LeitnerCard | null {
    if (!this.initialized) this.load();
    return this.cards.get(word) || null;
  }

  /**
   * Record a student's attempt on a word.
   * If correct: advances to next box, schedules future review.
   * If wrong: drops to Box 1, schedules immediate / 4-hr resurfacing.
   */
  public recordAttempt(
    word: string,
    isCorrect: boolean,
    metadata?: { shelfId?: string; english?: string }
  ): LeitnerCard {
    if (!this.initialized) this.load();

    const now = Date.now();
    const existing = this.cards.get(word);

    let nextBox = 1;
    let consecutiveCorrect = 0;
    let lapses = 0;
    let totalReviews = 1;

    if (existing) {
      totalReviews = existing.totalReviews + 1;
      lapses = existing.lapses;

      if (isCorrect) {
        nextBox = Math.min(existing.box + 1, 5);
        consecutiveCorrect = existing.consecutiveCorrect + 1;
      } else {
        nextBox = 1; // Demote to Box 1 per Leitner rules
        consecutiveCorrect = 0;
        lapses += 1;
      }
    } else {
      if (isCorrect) {
        nextBox = 2; // Started well, promote to Box 2
        consecutiveCorrect = 1;
      } else {
        nextBox = 1;
        lapses = 1;
      }
    }

    const interval = LEITNER_INTERVALS_MS[nextBox] || LEITNER_INTERVALS_MS[1];
    const nextReviewTime = now + interval;

    const card: LeitnerCard = {
      word,
      shelfId: metadata?.shelfId || existing?.shelfId || 'all',
      english: metadata?.english || existing?.english,
      box: nextBox,
      nextReviewTime,
      lastReviewedTime: now,
      totalReviews,
      consecutiveCorrect,
      lapses,
    };

    this.cards.set(word, card);
    this.save();
    return card;
  }

  /**
   * Returns all cards that are due for review (nextReviewTime <= now).
   * Prioritizes Box 1 and most overdue words first.
   */
  public getDueCards(shelfId?: string): LeitnerCard[] {
    if (!this.initialized) this.load();
    const now = Date.now();
    const list: LeitnerCard[] = [];

    for (const card of this.cards.values()) {
      if (shelfId && shelfId !== 'all' && card.shelfId !== shelfId) {
        continue;
      }
      if (card.nextReviewTime <= now) {
        list.push(card);
      }
    }

    // Sort by box ascending (Box 1 first) then by overdue amount
    return list.sort((a, b) => {
      if (a.box !== b.box) return a.box - b.box;
      return a.nextReviewTime - b.nextReviewTime;
    });
  }

  /**
   * Aggregate statistics across all tracked words.
   */
  public getStats(): LeitnerStats {
    if (!this.initialized) this.load();
    const now = Date.now();

    const boxCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let dueCount = 0;
    let totalCorrectReviews = 0;
    let totalReviews = 0;

    for (const card of this.cards.values()) {
      const box = Math.max(1, Math.min(5, Number(card.box) || 1));
      boxCounts[box] = (boxCounts[box] || 0) + 1;
      const nextTime = Number(card.nextReviewTime) || 0;
      if (nextTime <= now) {
        dueCount++;
      }
      const reviews = Number(card.totalReviews) || 0;
      const lapses = Number(card.lapses) || 0;
      totalReviews += reviews;
      totalCorrectReviews += Math.max(0, reviews - lapses);
    }

    const totalTracked = this.cards.size;
    const accuracyRate = totalReviews > 0 ? Math.round((totalCorrectReviews / totalReviews) * 100) : 100;

    return {
      totalTracked,
      boxCounts,
      dueCount,
      masteredCount: boxCounts[5] || 0,
      accuracyRate,
    };
  }

  /**
   * Clear or reset all Leitner tracking data.
   */
  public resetAll(): void {
    this.cards.clear();
    this.save();
  }
}

export const leitnerTracker = new LeitnerTracker();
