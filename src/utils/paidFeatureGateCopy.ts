/**
 * User-facing copy when a learner hits a paid-only action
 * (worksheet download / print / save, answer keys, quiz submit / assessment report).
 * Keep welcome / activation trial messaging separate in PaymentModal.
 *
 * RULE: ₹200 / one-time price copy appears ONLY after the free trial has ended
 * (expired state). Guest and free-trial copy must never mention the price or
 * pitch a subscription.
 */
export const PAID_FEATURE_GATE = {
  badge: 'Free Trial',
  title: 'Available with full access after your trial',
  /** Short banner heading used inline on worksheets / quizzes. */
  bannerTitleTrial: "You're on a free trial",
  bannerTitleExpired: 'Your free trial has ended',
  bannerTitleGuest: 'Sign in to continue',
  bannerBodyTrial:
    "You're on a free trial — keep exploring lessons, audio, and practice. Worksheet downloads, answer keys, and quiz assessment reports unlock with full access once your trial period ends.",
  bannerBodyExpired:
    'Your free trial has ended. Pay ₹200 once via Razorpay to download or save worksheets, get answer keys, and submit online quizzes for an assessment report. No auto-debit.',
  bannerBodyGuest:
    'Create an account or sign in to continue. Worksheet downloads, answer keys, and quiz assessment reports are part of full access.',
  ctaSubscribe: 'Pay ₹200 once',
  ctaGuest: 'Sign In / Register',
} as const;

export function paidFeatureGateBodyWithTrialEnd(trialEndsFormatted: string): string {
  const until = trialEndsFormatted ? ` until ${trialEndsFormatted}` : '';
  return (
    `You're on a free trial${until}. Worksheet downloads, answer keys, and quiz assessment reports unlock with full access once your trial period ends. Keep exploring lessons, audio, and practice in the meantime.`
  );
}
