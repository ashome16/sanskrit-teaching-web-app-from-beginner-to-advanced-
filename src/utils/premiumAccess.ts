import type { UserProfile } from '../types/auth';
import { computePlanStatus } from '../store/authStore';

/**
 * True when the learner may use premium offline exports (download / print).
 * Active free trial OR paid access; admins always allowed.
 */
export function hasPremiumAccess(
  currentUser: UserProfile | null | undefined,
  isAdminLoggedIn = false
): boolean {
  if (isAdminLoggedIn) return true;
  if (!currentUser) return false;
  return computePlanStatus(currentUser) !== 'expired';
}

export type PremiumGateReason = 'guest' | 'expired' | null;

export function getPremiumGateReason(
  currentUser: UserProfile | null | undefined,
  isAdminLoggedIn = false
): PremiumGateReason {
  if (hasPremiumAccess(currentUser, isAdminLoggedIn)) return null;
  if (!currentUser) return 'guest';
  return 'expired';
}
