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

export type PaymentMethod = 'upi' | 'apple_pay' | 'gpay' | 'card';

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
  subscriptionRenewsAt?: number;
  activeSubscriptionSince?: number;
  lastPaymentMethod?: PaymentMethod;
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
