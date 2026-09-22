import { create } from 'zustand';
import type {
  UserProfile,
  UserAccount,
  RegisterFormData,
  UpdateProfileFormData,
  PlanStatus,
  PaymentMethod,
  PaymentTransaction,
  AccessControlMode,
  OtpSession,
} from '../types/auth';
import type { UserProgress } from '../types';
import { useAppStore } from './index';
import { sendPasswordResetEmail as sendPasswordResetEmailApi, isResetEmailConfigured } from '../utils/sendPasswordResetEmail';
import { isAdminEmail } from '../utils/adminAllowlist';

export { isAdminEmail, ADMIN_EMAIL_ALLOWLIST } from '../utils/adminAllowlist';

const ACCOUNTS_STORAGE_KEY = 'sanskrit_accounts_v1';
const SESSION_STORAGE_KEY = 'sanskrit_current_session_v1';
const ADMIN_PASSCODE_KEY = 'ednet_admin_passcode_v1';
const DEFAULT_ADMIN_PASSCODE = 'ednetadmin2026';
const ADMIN_SESSION_KEY = 'ednet_admin_session_v1';
const ACCESS_MODE_KEY = 'sanskrit_access_mode_v1';
const UPI_VPA_KEY = 'sanskrit_upi_vpa_v1';
const UPI_PAYEE_KEY = 'sanskrit_upi_payee_v1';
export const DEFAULT_UPI_VPA = '7075296749@upi';
export const DEFAULT_UPI_PAYEE = 'EdNet Learn Gurukul';

const getStoredAccessMode = (): AccessControlMode => {
  try {
    const val = localStorage.getItem(ACCESS_MODE_KEY);
    if (val === 'strict_gate' || val === 'open_access' || val === 'smart_freemium') return val;
    return 'smart_freemium';
  } catch {
    return 'smart_freemium';
  }
};

const getStoredUpiVpa = (): string => {
  try {
    const val = localStorage.getItem(UPI_VPA_KEY);
    if (val && val !== 'ednetlearn@upi' && val !== 'sanskritlearning@upi') return val;
    return DEFAULT_UPI_VPA;
  } catch {
    return DEFAULT_UPI_VPA;
  }
};

const getStoredUpiPayee = (): string => {
  try {
    return localStorage.getItem(UPI_PAYEE_KEY) || DEFAULT_UPI_PAYEE;
  } catch {
    return DEFAULT_UPI_PAYEE;
  }
};

const getStoredAdminPasscode = (): string => {
  try {
    return localStorage.getItem(ADMIN_PASSCODE_KEY) || DEFAULT_ADMIN_PASSCODE;
  } catch {
    return DEFAULT_ADMIN_PASSCODE;
  }
};

const getStoredAdminSession = (): boolean => {
  try {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
};

const clearAdminSessionStorage = () => {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {}
};

/** Effective admin = passcode session AND allowlisted email. Clears stale session if not. */
const resolveAdminLoggedIn = (email: string | undefined | null): boolean => {
  if (!getStoredAdminSession()) return false;
  if (!isAdminEmail(email)) {
    clearAdminSessionStorage();
    return false;
  }
  return true;
};

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
const MONTHLY_PRICE_INR = 200;
const PAID_ACCESS_DAYS = 30;

/** Resolve plan status from trial + paid expiry (planExpiresAt / subscriptionRenewsAt). */
export const computePlanStatus = (profile: Pick<UserProfile, 'trialEndsAt' | 'planExpiresAt' | 'subscriptionRenewsAt'>, now = Date.now()): PlanStatus => {
  const paidUntil = profile.planExpiresAt || profile.subscriptionRenewsAt;
  if (paidUntil && paidUntil > now) return 'active';
  if (now <= profile.trialEndsAt) return 'trial';
  return 'expired';
};


export const DEFAULT_AVATARS = [
  '🧘', '🪷', '📜', '🏹', '🐘', '🦚', '🌞', '🕉️', '📚', '🌺', '🕊️', '💎'
];

export const SANSKRIT_INTERESTS_LIST = [
  'श्लोकाः (Shlokas & Wisdom)',
  'व्याकरणम् (Grammar & Vibhaktis)',
  'कथाः (Sanskrit Stories & Fables)',
  'सम्भाषणम् (Spoken Sanskrit)',
  'स्तोत्राणि (Chanting & Prayers)',
  'NCERT दीपकम Curriculum',
];

interface AuthState {
  currentUser: UserProfile | null;
  accounts: Record<string, UserAccount>;
  isAuthModalOpen: boolean;
  isProfileModalOpen: boolean;
  isPaymentModalOpen: boolean;
  authModalInitialTab: 'login' | 'register' | 'forgot_password';
  authError: string | null;

  // Actions
  openAuthModal: (tab?: 'login' | 'register' | 'forgot_password') => void;
  closeAuthModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  openPaymentModal: () => void;
  closePaymentModal: () => void;
  clearAuthError: () => void;

  // OTP & Password Recovery
  activeOtpSession: OtpSession | null;
  requestPasswordResetOtp: (identifier: string) => Promise<{ success: boolean; emailConfigured: boolean; emailSent?: boolean; error?: string }>;
  verifyOtpAndResetPassword: (identifier: string, otp: string, newPassword: string) => { success: boolean; error?: string };
  clearOtpSession: () => void;
  /** Resend via Vercel /api/send-reset-otp. No-ops when reset email is not configured (e.g. local vite without API). */
  sendPasswordResetEmail: (email: string, otp: string, toName?: string) => Promise<{ configured: boolean; error?: string }>;

  register: (data: RegisterFormData) => { success: boolean; error?: string; code?: 'email_exists' | 'username_exists' };
  login: (usernameOrEmail: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: UpdateProfileFormData) => { success: boolean; error?: string };
  deleteProfile: (confirmationPassword: string) => { success: boolean; error?: string };
  getTrialDaysRemaining: () => number;
  processPayment: (method: PaymentMethod, upiId?: string) => Promise<{ success: boolean; transaction?: PaymentTransaction; error?: string }>;

  // Admin Portal & Manual Payments
  isAdminModalOpen: boolean;
  isAdminLoggedIn: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  adminLogin: (passcode: string) => boolean;
  adminLogout: () => void;
  getAdminPasscode: () => string;
  setAdminPasscode: (newPasscode: string) => boolean;
  setUserPlanStatus: (userId: string, status: PlanStatus, durationDays?: number) => boolean;
  adminResetUserPassword: (userId: string, newPassword: string) => { success: boolean; error?: string };
  deleteUserAccountByAdmin: (userId: string) => boolean;
  approveTransaction: (userId: string, transactionId: string) => boolean;
  rejectTransaction: (userId: string, transactionId: string) => boolean;
  exportAllAccounts: () => string;
  importAccounts: (jsonData: string) => { success: boolean; count: number; error?: string };
  getAllAccountsList: () => UserAccount[];
  submitManualUpiPayment: (utrNumber: string, upiId?: string) => Promise<{ success: boolean; transaction?: PaymentTransaction; error?: string }>;
  /** After Razorpay /verify succeeds — store real ids and grant 30 days access. */
  activateRazorpayPayment: (payload: {
    paymentId: string;
    orderId: string;
    signature: string;
  }) => Promise<{ success: boolean; transaction?: PaymentTransaction; error?: string }>;

  /** Banner/modal when paid (or trial) period has ended — shown on login / session restore. */
  showAccessExpiredAlert: boolean;
  accessExpiredOn: number | null;
  dismissAccessExpiredAlert: () => void;
  /** Recompute planStatus from stored dates; may open expiry alert. */
  refreshPlanStatus: () => void;

  // Platform Configuration & Access Control
  accessMode: AccessControlMode;
  upiVpa: string;
  upiPayeeName: string;
  pendingRedirectView: string | null;
  pendingRedirectLessonId?: string;
  setAccessMode: (mode: AccessControlMode) => void;
  setUpiConfig: (vpa: string, payeeName: string) => void;
  setPendingRedirect: (view: string | null, lessonId?: string) => void;
}

const loadStoredAccounts = (): Record<string, UserAccount> => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const loadStoredSession = (accounts: Record<string, UserAccount>): UserProfile | null => {
  try {
    const userId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (userId && accounts[userId]) {
      const account = accounts[userId];
      const now = Date.now();
      const status = computePlanStatus(account.profile, now);
      return {
        ...account.profile,
        planStatus: status,
      };
    }
    return null;
  } catch {
    return null;
  }
};

const saveAccounts = (accounts: Record<string, UserAccount>) => {
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error('Failed to save accounts to localStorage', err);
  }
};

const saveSession = (userId: string | null) => {
  try {
    if (userId) {
      localStorage.setItem(SESSION_STORAGE_KEY, userId);
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to save session to localStorage', err);
  }
};

export const useAuthStore = create<AuthState>((set, get) => {
  const initialAccounts = loadStoredAccounts();
  const initialUser = loadStoredSession(initialAccounts);
  const _now = Date.now();
  const _paidUntil = initialUser
    ? initialUser.planExpiresAt || initialUser.subscriptionRenewsAt
    : undefined;
  const _endedOn =
    initialUser && typeof _paidUntil === 'number' && _paidUntil <= _now
      ? _paidUntil
      : initialUser && initialUser.planStatus === 'expired'
        ? initialUser.trialEndsAt
        : null;
  const _showExpired = !!initialUser && initialUser.planStatus === 'expired' && typeof _endedOn === 'number';

  return {
    currentUser: initialUser,
    accounts: initialAccounts,
    isAuthModalOpen: false,
    isProfileModalOpen: false,
    isPaymentModalOpen: false,
    showAccessExpiredAlert: _showExpired,
    accessExpiredOn: _showExpired ? (_endedOn as number) : null,
    authModalInitialTab: 'login',
    authError: null,

    openAuthModal: (tab = 'login') =>
      set({ isAuthModalOpen: true, authModalInitialTab: tab, authError: null }),

    closeAuthModal: () => set({ isAuthModalOpen: false, authError: null }),

    openProfileModal: () => set({ isProfileModalOpen: true }),
    closeProfileModal: () => set({ isProfileModalOpen: false }),

    openPaymentModal: () => set({ isPaymentModalOpen: true }),
    closePaymentModal: () => set({ isPaymentModalOpen: false }),
    clearAuthError: () => set({ authError: null }),

    // OTP & Password Recovery
    activeOtpSession: null,

    clearOtpSession: () => set({ activeOtpSession: null }),

    // Resend via Vercel serverless (/api/send-reset-otp). Client holds OTP; API only sends mail.
    sendPasswordResetEmail: async (email: string, otp: string, toName?: string) => {
      return sendPasswordResetEmailApi(email, otp, toName);
    },

    requestPasswordResetOtp: async (identifier: string) => {
      const { accounts } = get();
      const cleanId = (identifier || '').trim().toLowerCase();
      const emailConfigured = isResetEmailConfigured();

      if (!cleanId) {
        const error = 'Please enter your registered username or email address.';
        set({ authError: error });
        return { success: false, emailConfigured, emailSent: false, error };
      }

      // Without Resend API path, never create an OTP session or pretend email was sent.
      if (!emailConfigured) {
        set({ authError: null, activeOtpSession: null });
        const error =
          'Email delivery is not connected yet. Contact Learner Care at care@ednetlearn.in, or ask an admin to reset your password (Admin → Students → Reset PW).';
        return { success: false, emailConfigured: false, emailSent: false, error };
      }

      const account = Object.values(accounts).find(
        (acc) =>
          acc.profile.username.toLowerCase() === cleanId ||
          acc.profile.email.toLowerCase() === cleanId
      );

      // Do not reveal whether the account exists. Only create a real OTP session when found.
      if (!account) {
        set({ authError: null });
        // Same success shape as a real send so the UI does not leak account existence.
        return { success: true, emailConfigured: true, emailSent: false };
      }

      // Generate a secure 6-digit OTP — store in activeOtpSession only; never return to UI / never SMS.
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes validity

      const session: OtpSession = {
        code: otp,
        identifier: cleanId,
        email: account.profile.email,
        expiresAt,
        purpose: 'forgot_password',
        attempts: 0,
      };

      set({ activeOtpSession: session, authError: null });

      const sendResult = await get().sendPasswordResetEmail(
        account.profile.email,
        otp,
        account.profile.fullName || account.profile.username
      );

      if (sendResult.error || !sendResult.configured) {
        // Drop unused OTP so a failed send cannot be guessed without email delivery.
        set({ activeOtpSession: null });
        const error =
          sendResult.error ||
          'Could not send the reset email. Please try again, or contact care@ednetlearn.in.';
        set({ authError: error });
        return { success: false, emailConfigured: true, emailSent: false, error };
      }

      // Never return otp to the caller (must not appear on screen).
      return { success: true, emailConfigured: true, emailSent: true };
    },

    verifyOtpAndResetPassword: (identifier: string, otp: string, newPassword: string) => {
      const { accounts, activeOtpSession } = get();
      const cleanId = (identifier || '').trim().toLowerCase();
      const cleanOtp = (otp || '').trim();
      const cleanPass = (newPassword || '').trim();

      if (!activeOtpSession) {
        const error = 'No active OTP session. Please request a new verification code.';
        set({ authError: error });
        return { success: false, error };
      }

      if (Date.now() > activeOtpSession.expiresAt) {
        const error = 'This OTP has expired. Please tap "Resend Code" to get a fresh one.';
        set({ authError: error });
        return { success: false, error };
      }

      if (activeOtpSession.attempts >= 5) {
        const error = 'Too many failed attempts. Please request a new verification code.';
        set({ authError: error });
        return { success: false, error };
      }

      if (cleanOtp !== activeOtpSession.code) {
        const updatedSession = { ...activeOtpSession, attempts: activeOtpSession.attempts + 1 };
        const error = `Incorrect 6-digit OTP code (${5 - updatedSession.attempts} attempts remaining).`;
        set({ activeOtpSession: updatedSession, authError: error });
        return { success: false, error };
      }

      if (!cleanPass || cleanPass.length < 4) {
        const error = 'Your new password must be at least 4 characters long.';
        set({ authError: error });
        return { success: false, error };
      }

      const account = Object.values(accounts).find(
        (acc) =>
          acc.profile.username.toLowerCase() === cleanId ||
          acc.profile.email.toLowerCase() === cleanId ||
          acc.profile.email.toLowerCase() === activeOtpSession.email.toLowerCase()
      );

      if (!account) {
        const error = 'Account could not be found to update password.';
        set({ authError: error });
        return { success: false, error };
      }

      const updatedAccount: UserAccount = {
        ...account,
        passwordHash: cleanPass,
      };

      const updatedAccounts = {
        ...accounts,
        [account.profile.id]: updatedAccount,
      };

      saveAccounts(updatedAccounts);
      saveSession(account.profile.id);
      useAppStore.getState().setUserId(account.profile.id);

      set({
        accounts: updatedAccounts,
        currentUser: account.profile,
        activeOtpSession: null,
        isAuthModalOpen: false,
        authError: null,
        isAdminLoggedIn: resolveAdminLoggedIn(account.profile.email),
      });

      return { success: true };
    },

    // Platform Configuration & Access Control
    accessMode: getStoredAccessMode(),
    upiVpa: getStoredUpiVpa(),
    upiPayeeName: getStoredUpiPayee(),
    pendingRedirectView: null,
    pendingRedirectLessonId: undefined,

    setAccessMode: (mode: AccessControlMode) => {
      try {
        localStorage.setItem(ACCESS_MODE_KEY, mode);
      } catch {}
      set({ accessMode: mode });
    },

    setUpiConfig: (vpa: string, payeeName: string) => {
      const cleanVpa = (vpa || DEFAULT_UPI_VPA).trim();
      const cleanPayee = (payeeName || DEFAULT_UPI_PAYEE).trim();
      try {
        localStorage.setItem(UPI_VPA_KEY, cleanVpa);
        localStorage.setItem(UPI_PAYEE_KEY, cleanPayee);
      } catch {}
      set({ upiVpa: cleanVpa, upiPayeeName: cleanPayee });
    },

    setPendingRedirect: (view: string | null, lessonId?: string) => {
      set({ pendingRedirectView: view, pendingRedirectLessonId: lessonId });
    },

    register: (data: RegisterFormData) => {
      const { accounts } = get();
      const cleanUsername = data.username.trim();
      const cleanEmail = data.email.trim().toLowerCase();

      if (!cleanUsername || cleanUsername.length < 3) {
        const error = 'Username must be at least 3 characters long.';
        set({ authError: error });
        return { success: false, error };
      }

      if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
        const error = 'Please enter a valid email address.';
        set({ authError: error });
        return { success: false, error };
      }

      if (!data.password || data.password.length < 4) {
        const error = 'Password must be at least 4 characters long.';
        set({ authError: error });
        return { success: false, error };
      }

      // Check uniqueness
      const usernameExists = Object.values(accounts).some(
        (acc) => acc.profile.username.toLowerCase() === cleanUsername.toLowerCase()
      );
      if (usernameExists) {
        const error = 'Username is already registered. Please choose another or log in.';
        set({ authError: error });
        return { success: false, error, code: 'username_exists' as const };
      }

      const emailExists = Object.values(accounts).some(
        (acc) => acc.profile.email.toLowerCase() === cleanEmail
      );
      if (emailExists) {
        const error =
          'An account already exists with this email. Use Forgot password to reset, or log in with your existing username.';
        set({ authError: error });
        return { success: false, error, code: 'email_exists' as const };
      }

      const userId = 'user_' + Math.random().toString(36).substr(2, 9);
      const now = Date.now();
      const trialEndsAt = now + TWO_WEEKS_MS;

      const profile: UserProfile = {
        id: userId,
        username: cleanUsername,
        email: cleanEmail,
        fullName: (data.fullName || cleanUsername).trim(),
        avatar: data.avatar || DEFAULT_AVATARS[0],
        grade: data.grade || 'Class 7 (दीपकम-७)',
        interests: data.interests && data.interests.length > 0 ? data.interests : ['NCERT दीपकम Curriculum'],
        createdAt: now,
        lastLoginAt: now,
        trialEndsAt,
        planStatus: 'trial',
        monthlyPriceInr: MONTHLY_PRICE_INR,
      };

      const initialProgress: UserProgress = {
        userId,
        lessonsCompleted: [],
        quizzesCompleted: [],
        totalPoints: 50, // Welcome bonus points!
        streak: 1,
        lastActivityDate: now,
      };

      const newAccounts = {
        ...accounts,
        [userId]: {
          profile,
          passwordHash: data.password, // Client-side simulation
          progress: initialProgress,
        },
      };

      saveAccounts(newAccounts);
      saveSession(userId);

      // Sync user progress into app store
      useAppStore.getState().setUserId(userId);

      set({
        accounts: newAccounts,
        currentUser: profile,
        isAuthModalOpen: false,
        authError: null,
        isAdminLoggedIn: resolveAdminLoggedIn(profile.email),
      });

      return { success: true };
    },

    login: (usernameOrEmail: string, password: string) => {
      const { accounts } = get();
      const identifier = usernameOrEmail.trim().toLowerCase();

      if (!identifier || !password) {
        const error = 'Please provide both username/email and password.';
        set({ authError: error });
        return { success: false, error };
      }

      const foundAccount = Object.values(accounts).find(
        (acc) =>
          acc.profile.username.toLowerCase() === identifier ||
          acc.profile.email.toLowerCase() === identifier
      );

      if (!foundAccount || foundAccount.passwordHash !== password) {
        const error = 'Invalid username/email or password. Please try again.';
        set({ authError: error });
        return { success: false, error };
      }

      const now = Date.now();
      const status = computePlanStatus(foundAccount.profile, now);
      const updatedProfile: UserProfile = {
        ...foundAccount.profile,
        lastLoginAt: now,
        planStatus: status,
      };

      const updatedAccounts = {
        ...accounts,
        [updatedProfile.id]: {
          ...foundAccount,
          profile: updatedProfile,
        },
      };

      saveAccounts(updatedAccounts);
      saveSession(updatedProfile.id);

      useAppStore.getState().setUserId(updatedProfile.id);

      const paidUntil = updatedProfile.planExpiresAt || updatedProfile.subscriptionRenewsAt;
      const endedOn =
        typeof paidUntil === 'number' && paidUntil <= now
          ? paidUntil
          : status === 'expired'
            ? updatedProfile.trialEndsAt
            : null;
      const showExpired = status === 'expired' && typeof endedOn === 'number';

      set({
        accounts: updatedAccounts,
        currentUser: updatedProfile,
        isAuthModalOpen: false,
        authError: null,
        showAccessExpiredAlert: showExpired,
        accessExpiredOn: showExpired ? endedOn : null,
        isAdminLoggedIn: resolveAdminLoggedIn(updatedProfile.email),
      });

      return { success: true };
    },

    logout: () => {
      saveSession(null);
      clearAdminSessionStorage();
      set({
        currentUser: null,
        isProfileModalOpen: false,
        showAccessExpiredAlert: false,
        accessExpiredOn: null,
        isAdminLoggedIn: false,
      });
    },

    updateProfile: (data: UpdateProfileFormData) => {
      const { currentUser, accounts } = get();
      if (!currentUser) return { success: false, error: 'Not logged in.' };

      const currentAccount = accounts[currentUser.id];
      if (!currentAccount) return { success: false, error: 'Account not found.' };

      // Check email uniqueness if email updated
      if (data.email) {
        const cleanEmail = data.email.trim().toLowerCase();
        const emailTaken = Object.values(accounts).some(
          (acc) => acc.profile.id !== currentUser.id && acc.profile.email.toLowerCase() === cleanEmail
        );
        if (emailTaken) {
          return { success: false, error: 'That email is already in use by another account.' };
        }
      }

      const updatedProfile: UserProfile = {
        ...currentUser,
        fullName: data.fullName !== undefined ? data.fullName.trim() : currentUser.fullName,
        avatar: data.avatar || currentUser.avatar,
        grade: data.grade || currentUser.grade,
        interests: data.interests || currentUser.interests,
        email: data.email ? data.email.trim().toLowerCase() : currentUser.email,
      };

      const updatedAccounts = {
        ...accounts,
        [currentUser.id]: {
          ...currentAccount,
          profile: updatedProfile,
        },
      };

      saveAccounts(updatedAccounts);

      set({
        currentUser: updatedProfile,
        accounts: updatedAccounts,
        isAdminLoggedIn: resolveAdminLoggedIn(updatedProfile.email),
      });

      return { success: true };
    },

    deleteProfile: (confirmationPassword: string) => {
      const { currentUser, accounts } = get();
      if (!currentUser) return { success: false, error: 'Not logged in.' };

      const currentAccount = accounts[currentUser.id];
      if (!currentAccount) return { success: false, error: 'Account not found.' };

      if (currentAccount.passwordHash !== confirmationPassword) {
        return { success: false, error: 'Incorrect password. Account deletion cancelled.' };
      }

      const nextAccounts = { ...accounts };
      delete nextAccounts[currentUser.id];

      saveAccounts(nextAccounts);
      saveSession(null);

      // Reset progress to guest
      useAppStore.getState().resetProgress();

      clearAdminSessionStorage();
      set({
        accounts: nextAccounts,
        currentUser: null,
        isProfileModalOpen: false,
        isAdminLoggedIn: false,
      });

      return { success: true };
    },

    getTrialDaysRemaining: () => {
      const { currentUser } = get();
      if (!currentUser) return 0;
      const msLeft = currentUser.trialEndsAt - Date.now();
      if (msLeft <= 0) return 0;
      return Math.ceil(msLeft / (24 * 60 * 60 * 1000));
    },

    // Client-side auto-activation disabled: Premium unlocks only after admin verifies UPI.
    processPayment: async (_method: PaymentMethod, _upiId?: string) => {
      return {
        success: false,
        error:
          'Please pay via UPI QR and submit your UTR. Access unlocks after verification.',
      };
    },

    // Admin State & Methods
    isAdminModalOpen: false,
    isAdminLoggedIn: resolveAdminLoggedIn(initialUser?.email),

    openAdminModal: () => set({ isAdminModalOpen: true }),
    closeAdminModal: () => set({ isAdminModalOpen: false }),

    adminLogin: (passcode: string) => {
      const { currentUser } = get();
      // Passcode alone is not enough — must be signed in as an allowlisted EdNet email.
      if (!currentUser || !isAdminEmail(currentUser.email)) {
        return false;
      }
      const correct = getStoredAdminPasscode();
      if (passcode.trim() === correct.trim()) {
        try {
          localStorage.setItem(ADMIN_SESSION_KEY, 'true');
        } catch {}
        set({ isAdminLoggedIn: true });
        return true;
      }
      return false;
    },

    adminLogout: () => {
      try {
        localStorage.removeItem(ADMIN_SESSION_KEY);
      } catch {}
      set({ isAdminLoggedIn: false });
    },

    getAdminPasscode: () => getStoredAdminPasscode(),

    setAdminPasscode: (newPasscode: string) => {
      if (!newPasscode || newPasscode.trim().length < 4) return false;
      try {
        localStorage.setItem(ADMIN_PASSCODE_KEY, newPasscode.trim());
        return true;
      } catch {
        return false;
      }
    },

    getAllAccountsList: () => {
      const { accounts } = get();
      return Object.values(accounts);
    },

    setUserPlanStatus: (userId: string, status: PlanStatus, durationDays = 30) => {
      const { accounts, currentUser } = get();
      const account = accounts[userId];
      if (!account) return false;

      const now = Date.now();
      let subscriptionRenewsAt: number | undefined = undefined;
      let trialEndsAt = account.profile.trialEndsAt;

      let planExpiresAt: number | undefined = account.profile.planExpiresAt;
      if (status === 'active') {
        subscriptionRenewsAt = now + durationDays * 24 * 60 * 60 * 1000;
        planExpiresAt = subscriptionRenewsAt;
      } else if (status === 'trial') {
        trialEndsAt = now + durationDays * 24 * 60 * 60 * 1000;
      } else if (status === 'expired') {
        // Force past trial/sub so reload does not resurrect "trial" from trialEndsAt.
        trialEndsAt = now - 60_000;
        subscriptionRenewsAt = undefined;
        planExpiresAt = undefined;
      }

      const updatedProfile: UserProfile = {
        ...account.profile,
        planStatus: status,
        subscriptionRenewsAt,
        planExpiresAt,
        trialEndsAt,
        activeSubscriptionSince: status === 'active' ? (account.profile.activeSubscriptionSince || now) : account.profile.activeSubscriptionSince,
      };

      const updatedAccounts = {
        ...accounts,
        [userId]: {
          ...account,
          profile: updatedProfile,
        },
      };

      saveAccounts(updatedAccounts);

      const nextCurrent = currentUser && currentUser.id === userId ? updatedProfile : currentUser;
      set({ accounts: updatedAccounts, currentUser: nextCurrent });
      return true;
    },

    adminResetUserPassword: (userId: string, newPassword: string) => {
      const { accounts } = get();
      const account = accounts[userId];
      if (!account) return { success: false, error: 'Account not found.' };
      const cleanPass = (newPassword || '').trim();
      if (cleanPass.length < 4) {
        return { success: false, error: 'Password must be at least 4 characters.' };
      }
      const updatedAccounts = {
        ...accounts,
        [userId]: {
          ...account,
          passwordHash: cleanPass,
        },
      };
      saveAccounts(updatedAccounts);
      set({ accounts: updatedAccounts });
      return { success: true };
    },

    deleteUserAccountByAdmin: (userId: string) => {
      const { accounts, currentUser } = get();
      if (!accounts[userId]) return false;

      const nextAccounts = { ...accounts };
      delete nextAccounts[userId];
      saveAccounts(nextAccounts);

      let nextCurrent = currentUser;
      let nextAdmin = get().isAdminLoggedIn;
      if (currentUser && currentUser.id === userId) {
        saveSession(null);
        nextCurrent = null;
        clearAdminSessionStorage();
        nextAdmin = false;
      } else {
        nextAdmin = resolveAdminLoggedIn(nextCurrent?.email);
      }

      set({ accounts: nextAccounts, currentUser: nextCurrent, isAdminLoggedIn: nextAdmin });
      return true;
    },

    approveTransaction: (userId: string, transactionId: string) => {
      const { accounts, currentUser } = get();
      const account = accounts[userId];
      if (!account || !account.profile.transactions) return false;

      const now = Date.now();
      const txns = account.profile.transactions.map((t) =>
        t.id === transactionId ? { ...t, status: 'success' as const, notes: 'Approved by Administrator' } : t
      );

      const updatedProfile: UserProfile = {
        ...account.profile,
        planStatus: 'active',
        activeSubscriptionSince: account.profile.activeSubscriptionSince || now,
        planExpiresAt: (account.profile.planExpiresAt && account.profile.planExpiresAt > now
          ? account.profile.planExpiresAt
          : (account.profile.subscriptionRenewsAt && account.profile.subscriptionRenewsAt > now
            ? account.profile.subscriptionRenewsAt
            : now)) + 30 * 24 * 60 * 60 * 1000,
        subscriptionRenewsAt: (account.profile.planExpiresAt && account.profile.planExpiresAt > now
          ? account.profile.planExpiresAt
          : (account.profile.subscriptionRenewsAt && account.profile.subscriptionRenewsAt > now
            ? account.profile.subscriptionRenewsAt
            : now)) + 30 * 24 * 60 * 60 * 1000,
        transactions: txns,
      };

      const updatedAccounts = {
        ...accounts,
        [userId]: {
          ...account,
          profile: updatedProfile,
        },
      };

      saveAccounts(updatedAccounts);
      const nextCurrent = currentUser && currentUser.id === userId ? updatedProfile : currentUser;
      set({ accounts: updatedAccounts, currentUser: nextCurrent });
      return true;
    },

    rejectTransaction: (userId: string, transactionId: string) => {
      const { accounts, currentUser } = get();
      const account = accounts[userId];
      if (!account || !account.profile.transactions) return false;

      const txns = account.profile.transactions.map((t) =>
        t.id === transactionId ? { ...t, status: 'failed' as const, notes: 'Declined by Administrator' } : t
      );

      const updatedProfile: UserProfile = {
        ...account.profile,
        transactions: txns,
      };

      const updatedAccounts = {
        ...accounts,
        [userId]: {
          ...account,
          profile: updatedProfile,
        },
      };

      saveAccounts(updatedAccounts);
      const nextCurrent = currentUser && currentUser.id === userId ? updatedProfile : currentUser;
      set({ accounts: updatedAccounts, currentUser: nextCurrent });
      return true;
    },

    exportAllAccounts: () => {
      const { accounts } = get();
      return JSON.stringify(accounts, null, 2);
    },

    importAccounts: (jsonData: string) => {
      try {
        const parsed = JSON.parse(jsonData);
        if (!parsed || typeof parsed !== 'object') {
          return { success: false, count: 0, error: 'Invalid JSON data format.' };
        }
        const { accounts } = get();
        const merged = { ...accounts, ...parsed };
        saveAccounts(merged);
        set({ accounts: merged });
        return { success: true, count: Object.keys(parsed).length };
      } catch (err: any) {
        return { success: false, count: 0, error: err?.message || 'JSON parsing failed.' };
      }
    },

    submitManualUpiPayment: async (utrNumber: string, upiId?: string) => {
      const { currentUser, accounts } = get();
      if (!currentUser) {
        return { success: false, error: 'Please sign in or register to submit payment.' };
      }
      const currentAccount = accounts[currentUser.id];
      if (!currentAccount) {
        return { success: false, error: 'User account not found.' };
      }

      const now = Date.now();
      const txnId = 'UPI_' + now.toString().slice(-7) + '_' + Math.random().toString(36).substring(2, 6).toUpperCase();
      const newTransaction: PaymentTransaction = {
        id: txnId,
        amountInr: MONTHLY_PRICE_INR,
        paymentMethod: 'upi',
        upiId: upiId || get().upiVpa,
        utrNumber: utrNumber.trim(),
        timestamp: now,
        status: 'pending',
        planName: 'Monthly Unlimited Access Pass',
        billingPeriod: '30 Days',
        notes: 'Submitted via UTR verification. Awaiting Admin Approval.',
      };

      const updatedProfile: UserProfile = {
        ...currentUser,
        lastPaymentMethod: 'upi',
        transactions: [newTransaction, ...(currentUser.transactions || [])],
      };

      const updatedAccounts = {
        ...accounts,
        [currentUser.id]: {
          ...currentAccount,
          profile: updatedProfile,
        },
      };

      saveAccounts(updatedAccounts);
      set({
        currentUser: updatedProfile,
        accounts: updatedAccounts,
      });

      return { success: true, transaction: newTransaction };
    },

    activateRazorpayPayment: async ({ paymentId, orderId, signature }) => {
      const { currentUser, accounts } = get();
      if (!currentUser) {
        return { success: false, error: 'Please sign in or register to activate access.' };
      }
      const currentAccount = accounts[currentUser.id];
      if (!currentAccount) {
        return { success: false, error: 'User account not found.' };
      }
      if (!paymentId || !orderId || !signature) {
        return { success: false, error: 'Missing Razorpay payment / order / signature.' };
      }

      const now = Date.now();
      const expiresAt = now + PAID_ACCESS_DAYS * 24 * 60 * 60 * 1000;

      const newTransaction: PaymentTransaction = {
        id: paymentId,
        amountInr: MONTHLY_PRICE_INR,
        paymentMethod: 'razorpay',
        razorpayPaymentId: paymentId,
        razorpayOrderId: orderId,
        razorpaySignature: signature,
        timestamp: now,
        status: 'success',
        planName: 'All-Access Monthly Pass',
        billingPeriod: `${PAID_ACCESS_DAYS} Days`,
        notes: 'Verified via Razorpay one-time Checkout signature.',
      };

      const updatedProfile: UserProfile = {
        ...currentUser,
        planStatus: 'active',
        lastPaymentMethod: 'razorpay',
        razorpayOrderId: orderId,
        activeSubscriptionSince: currentUser.activeSubscriptionSince || now,
        planExpiresAt: expiresAt,
        subscriptionRenewsAt: expiresAt,
        transactions: [newTransaction, ...(currentUser.transactions || [])],
      };

      const updatedAccounts = {
        ...accounts,
        [currentUser.id]: {
          ...currentAccount,
          profile: updatedProfile,
        },
      };

      saveAccounts(updatedAccounts);
      set({
        currentUser: updatedProfile,
        accounts: updatedAccounts,
        showAccessExpiredAlert: false,
        accessExpiredOn: null,
      });

      return { success: true, transaction: newTransaction };
    },

    dismissAccessExpiredAlert: () => {
      set({ showAccessExpiredAlert: false });
    },

    refreshPlanStatus: () => {
      const { currentUser, accounts } = get();
      if (!currentUser) {
        set({ showAccessExpiredAlert: false, accessExpiredOn: null });
        return;
      }
      const account = accounts[currentUser.id];
      if (!account) return;
      const now = Date.now();
      const status = computePlanStatus(account.profile, now);
      const paidUntil = account.profile.planExpiresAt || account.profile.subscriptionRenewsAt;
      // Prefer paid end date; fall back to trial end when trial lapsed with no pay.
      const endedOn =
        typeof paidUntil === 'number' && paidUntil <= now
          ? paidUntil
          : status === 'expired'
            ? account.profile.trialEndsAt
            : null;
      const updatedProfile: UserProfile = { ...account.profile, planStatus: status };
      const updatedAccounts = {
        ...accounts,
        [currentUser.id]: { ...account, profile: updatedProfile },
      };
      saveAccounts(updatedAccounts);

      const showExpired = status === 'expired' && typeof endedOn === 'number';

      set({
        accounts: updatedAccounts,
        currentUser: updatedProfile,
        showAccessExpiredAlert: showExpired ? true : false,
        accessExpiredOn: showExpired ? endedOn : null,
      });
    },
  };
});
