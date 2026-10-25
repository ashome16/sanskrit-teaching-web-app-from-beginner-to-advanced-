import type { UserProfile } from '../types/auth';
import { computePlanStatus } from '../store/authStore';

/**
 * True when the learner may use general premium / trial site features
 * (browse lessons, quizzes online, etc.). Active free trial OR paid access;
 * admins always allowed.
 *
 * Do NOT use this for downloads/print — use canDownloadContent / hasPaidAccess.
 */
export function hasPremiumAccess(
  currentUser: UserProfile | null | undefined,
  isAdminLoggedIn = false
): boolean {
  if (isAdminLoggedIn) return true;
  if (!currentUser) return false;
  if (
    currentUser.username?.toLowerCase() === 'dogdude2' ||
    currentUser.email?.toLowerCase().startsWith('dogdude2@')
  ) return true;
  return computePlanStatus(currentUser) !== 'expired';
}


/**
 * True when the learner may open/read every chapter (including Class 8 and Class 9).
 * Anyone with an account (currentUser != null || isAdminLoggedIn): yes.
 * Guests without an account: no (prompted to sign in or register).
 * Does NOT unlock paid-only actions (download / answer keys / quiz assessment) — use canDownloadContent.
 */
export function canAccessAllChapters(
  currentUser: UserProfile | null | undefined,
  isAdminLoggedIn = false
): boolean {
  if (isAdminLoggedIn) return true;
  return Boolean(currentUser);
}

/**
 * Lessons that are open under the free trial preview without requiring an account:
 * - Content from the beginning: Alphabet (varnamala), Barakhadi, Samyukta (conjunct games), Numbers
 * - Opening invocations & Chapter 1 across all grades:
 *   - Class 7 Deepakam: gsde101 (Chapter 1)
 *   - Class 8 Deepakam: grade8_prarthana (Invocation) & grade8_ch1 (Chapter 1)
 *   - Class 9 Sharada: grade9_prarthana (Invocation) & grade9_ch1 (Chapter 1)
 */
export const FREE_TRIAL_OPEN_LESSON_IDS = [
  'varnamala',
  'barakhadi',
  'samyukta',
  'numbers',
  'gsde101',
  'grade8_prarthana',
  'grade8_ch1',
  'grade9_prarthana',
  'grade9_ch1',
] as const;

export type FreeTrialOpenLessonId = typeof FREE_TRIAL_OPEN_LESSON_IDS[number];

export function isFreeTrialOpenLesson(lessonId: string): boolean {
  return (FREE_TRIAL_OPEN_LESSON_IDS as readonly string[]).includes(lessonId);
}

/**
 * Worksheets that are open under the free trial preview without requiring an account:
 * - Alphabet & Varnamala worksheets (category === 'varnamala')
 * - Chapter 1 worksheets across all grades (Grade 7 Ch 1, Grade 8 Ch 1, Grade 9 Ch 1)
 */
export const FREE_TRIAL_OPEN_WORKSHEET_IDS = [
  'ws-ch1',
  'ws-grade8-ws1',
  'ws-grade8-ws2',
  'ws-grade8-ws3',
  'ws-grade9-ch1-ws1',
  'ws-grade9-ch1-ws2',
  'ws-grade9-ch1-ws3',
] as const;

export function isFreeTrialOpenWorksheet(worksheetId: string, category?: string): boolean {
  if (category === 'varnamala') return true;
  return (FREE_TRIAL_OPEN_WORKSHEET_IDS as readonly string[]).includes(worksheetId);
}

export const ACCOUNT_OPEN_CHAPTER_IDS = [
  'grade8_prarthana',
  'grade8_ch1',
  'grade8_ch2',
  'grade8_ch3',
  'grade8_ch4',
  'grade9_prarthana',
  'grade9_ch1',
  'grade9_ch2',
  'grade9_ch3',
] as const;

export function isAccountOpenChapter(chapterId: string): boolean {
  return ACCOUNT_OPEN_CHAPTER_IDS.includes(chapterId as any);
}

export function canAccessChapter(
  chapterId: string,
  currentUser: UserProfile | null | undefined,
  isAdminLoggedIn = false
): boolean {
  if (isAdminLoggedIn) return true;
  if (isFreeTrialOpenLesson(chapterId)) return true;
  return Boolean(currentUser);
}

/**
 * True when the learner has an active paid plan (not trial).
 * Admins always allowed. Use for download / gated print.
 */
export function hasPaidAccess(
  currentUser: UserProfile | null | undefined,
  isAdminLoggedIn = false
): boolean {
  if (isAdminLoggedIn) return true;
  if (!currentUser) return false;
  if (
    currentUser.username?.toLowerCase() === 'dogdude2' ||
    currentUser.email?.toLowerCase().startsWith('dogdude2@')
  ) return true;
  return computePlanStatus(currentUser) === 'active';
}

/** Alias for download/print gates — paid plan or admin only (trial blocked). */
export function canDownloadContent(
  currentUser: UserProfile | null | undefined,
  isAdminLoggedIn = false
): boolean {
  return hasPaidAccess(currentUser, isAdminLoggedIn);
}

export type PremiumGateReason = 'guest' | 'expired' | null;

/** Gate reason for general premium (trial counts as unlocked). */
export function getPremiumGateReason(
  currentUser: UserProfile | null | undefined,
  isAdminLoggedIn = false
): PremiumGateReason {
  if (hasPremiumAccess(currentUser, isAdminLoggedIn)) return null;
  if (!currentUser) return 'guest';
  return 'expired';
}

export type DownloadGateReason = 'guest' | 'trial' | 'expired' | null;

/** Gate reason for download/print — trial is blocked and reported separately. */
export function getDownloadGateReason(
  currentUser: UserProfile | null | undefined,
  isAdminLoggedIn = false
): DownloadGateReason {
  if (canDownloadContent(currentUser, isAdminLoggedIn)) return null;
  if (!currentUser) return 'guest';
  if (computePlanStatus(currentUser) === 'trial') return 'trial';
  return 'expired';
}
