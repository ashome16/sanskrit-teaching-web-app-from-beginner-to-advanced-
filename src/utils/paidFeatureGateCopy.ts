/**
 * User-facing copy when a free-trial learner hits a paid-only action
 * (worksheet download / print / save, answer keys, quiz submit / assessment report).
 * Keep welcome / activation trial messaging separate in PaymentModal.
 */
export const PAID_FEATURE_GATE = {
  badge: 'Free Trial · Subscription needed',
  title: 'Subscribe to unlock these features',
  /** Short banner heading used inline on worksheets / quizzes. */
  bannerTitleTrial: "You're on a free trial",
  bannerTitleExpired: 'Subscription required',
  bannerTitleGuest: 'Sign in to continue',
  bannerBodyTrial:
    "You're on a free trial. To download or save worksheets, get answer keys, or submit online quizzes and get an assessment report, please subscribe — one-time ₹200 via Razorpay (no auto-debit).",
  bannerBodyExpired:
    'Pay ₹200 once via Razorpay to download or save worksheets, get answer keys, and submit online quizzes for an assessment report. No auto-debit.',
  bannerBodyGuest:
    'Create an account or sign in. Downloads, answer keys, and quiz assessment reports need a one-time ₹200 subscription (the free trial does not include these).',
  ctaSubscribe: 'Subscribe · Pay ₹200 once',
  ctaGuest: 'Sign In / Register',
} as const;

export function paidFeatureGateBodyWithTrialEnd(trialEndsFormatted: string): string {
  const until = trialEndsFormatted ? ` until ${trialEndsFormatted}` : '';
  return (
    `You're on a free trial${until}. To download or save worksheets, get answer keys, or submit online quizzes and get an assessment report, please subscribe — one-time ₹200 via Razorpay (no auto-debit).`
  );
}
