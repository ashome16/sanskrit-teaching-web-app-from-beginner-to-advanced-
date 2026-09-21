import type { UserProgress } from './index';

export type SanskritGrade =
  | 'Beginner (प्रवेशः)'
  | 'Class 6 (दीपकम-६)'
  | 'Class 7 (दीपकम-७)'
  | 'Class 8 (दीपकम-८)'
  | 'Intermediate (परिचयः)'
  | 'Advanced (कोविदः)'
  | 'Enthusiast / Self-Learner';

export type PlanStatus = 'trial' | 'active' | 'expired';

export type PaymentMethod = 'upi' | 'apple_pay' | 'gpay' | 'card' | 'razorpay';

export type AccessControlMode = 'smart_freemium' | 'strict_gate' | 'open_access';

export interface PlatformSettings {
  accessMode: AccessControlMode;
  upiVpa: string;
  upiPayeeName: string;
}

export interface PaymentTransaction {
  id: string;
  amountInr: number;
  paymentMethod: PaymentMethod;
  upiId?: string;
  utrNumber?: string;
  /** Razorpay payment id (pay_…) after Standard Checkout success */
  razorpayPaymentId?: string;
  /** Razorpay order id (order_…) for one-time Checkout */
  razorpayOrderId?: string;
  /** Legacy / unused subscription id (sub_…) — not used for main one-time path */
  razorpaySubscriptionId?: string;
  /** Razorpay HMAC signature returned by checkout */
  razorpaySignature?: string;
  timestamp: number;
  status: 'success' | 'failed' | 'pending';
  planName: string;
  billingPeriod: string;
  notes?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  grade: SanskritGrade;
  interests: string[];
  createdAt: number;
  lastLoginAt: number;
  trialEndsAt: number;
  planStatus: PlanStatus;
  monthlyPriceInr: number;
  /** Paid access ends at this unix-ms (one-time Razorpay → +30 days). Alias of subscription end. */
  planExpiresAt?: number;
  /** Kept in sync with planExpiresAt for older UI that reads renews-at */
  subscriptionRenewsAt?: number;
  activeSubscriptionSince?: number;
  lastPaymentMethod?: PaymentMethod;
  /** Last successful Razorpay order id */
  razorpayOrderId?: string;
  /** Unused for one-time path (subscription scaffolding only) */
  razorpaySubscriptionId?: string;
  transactions?: PaymentTransaction[];
}

export interface UserAccount {
  profile: UserProfile;
  passwordHash: string;
  progress: UserProgress;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  fullName: string;
  avatar?: string;
  grade?: SanskritGrade;
  interests?: string[];
}

export interface UpdateProfileFormData {
  fullName?: string;
  avatar?: string;
  grade?: SanskritGrade;
  interests?: string[];
  email?: string;
}

export interface FAQItem {
  id: string;
  category: 'trial_pricing' | 'account' | 'curriculum' | 'features';
  question: string;
  answer: string;
}

export interface OtpSession {
  code: string;
  identifier: string;
  email: string;
  expiresAt: number;
  purpose: 'forgot_password' | 'registration';
  attempts: number;
}

