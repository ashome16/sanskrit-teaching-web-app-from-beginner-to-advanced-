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

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
const MONTHLY_PRICE_INR = 200;

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
  requestPasswordResetOtp: (identifier: string) => { success: boolean; otp?: string; email?: string; error?: string };
  verifyOtpAndResetPassword: (identifier: string, otp: string, newPassword: string) => { success: boolean; error?: string };
  clearOtpSession: () => void;

  register: (data: RegisterFormData) => { success: boolean; error?: string };
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
  deleteUserAccountByAdmin: (userId: string) => boolean;
  approveTransaction: (userId: string, transactionId: string) => boolean;
  rejectTransaction: (userId: string, transactionId: string) => boolean;
  exportAllAccounts: () => string;
  importAccounts: (jsonData: string) => { success: boolean; count: number; error?: string };
  getAllAccountsList: () => UserAccount[];
  submitManualUpiPayment: (utrNumber: string, upiId?: string) => Promise<{ success: boolean; transaction?: PaymentTransaction; error?: string }>;

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
      // compute latest plan status
      const now = Date.now();
      let status: PlanStatus = 'expired';
      if (account.profile.subscriptionRenewsAt && account.profile.subscriptionRenewsAt > now) {
        status = 'active';
      } else if (now <= account.profile.trialEndsAt) {
        status = 'trial';
      }
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

  return {
    currentUser: initialUser,
    accounts: initialAccounts,
    isAuthModalOpen: false,
    isProfileModalOpen: false,
    isPaymentModalOpen: false,
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

    requestPasswordResetOtp: (identifier: string) => {
      const { accounts } = get();
      const cleanId = (identifier || '').trim().toLowerCase();

      if (!cleanId) {
        const error = 'Please enter your registered username or email address.';
        set({ authError: error });
        return { success: false, error };
      }

      const account = Object.values(accounts).find(
        (acc) =>
          acc.profile.username.toLowerCase() === cleanId ||
          acc.profile.email.toLowerCase() === cleanId
      );

      if (!account) {
        const error = 'No account found matching that username or email address.';
        set({ authError: error });
        return { success: false, error };
      }

      // Generate a secure 6-digit OTP code
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
      return { success: true, otp, email: account.profile.email };
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
        return { success: false, error };
      }

      const emailExists = Object.values(accounts).some(
        (acc) => acc.profile.email.toLowerCase() === cleanEmail
      );
      if (emailExists) {
        const error = 'Email is already registered. Please log in.';
        set({ authError: error });
        return { success: false, error };
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
      const status: PlanStatus = now <= foundAccount.profile.trialEndsAt ? 'trial' : 'expired';
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

      set({
        accounts: updatedAccounts,
        currentUser: updatedProfile,
        isAuthModalOpen: false,
        authError: null,
      });

      return { success: true };
    },

    logout: () => {
      saveSession(null);
      set({ currentUser: null, isProfileModalOpen: false });
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

      set({
        accounts: nextAccounts,
        currentUser: null,
        isProfileModalOpen: false,
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
    isAdminLoggedIn: getStoredAdminSession(),

    openAdminModal: () => set({ isAdminModalOpen: true }),
    closeAdminModal: () => set({ isAdminModalOpen: false }),

    adminLogin: (passcode: string) => {
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

      if (status === 'active') {
        subscriptionRenewsAt = now + durationDays * 24 * 60 * 60 * 1000;
      } else if (status === 'trial') {
        trialEndsAt = now + durationDays * 24 * 60 * 60 * 1000;
      }

      const updatedProfile: UserProfile = {
        ...account.profile,
        planStatus: status,
        subscriptionRenewsAt,
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

    deleteUserAccountByAdmin: (userId: string) => {
      const { accounts, currentUser } = get();
      if (!accounts[userId]) return false;

      const nextAccounts = { ...accounts };
      delete nextAccounts[userId];
      saveAccounts(nextAccounts);

      let nextCurrent = currentUser;
      if (currentUser && currentUser.id === userId) {
        saveSession(null);
        nextCurrent = null;
      }

      set({ accounts: nextAccounts, currentUser: nextCurrent });
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
        subscriptionRenewsAt: (account.profile.subscriptionRenewsAt && account.profile.subscriptionRenewsAt > now ? account.profile.subscriptionRenewsAt : now) + 30 * 24 * 60 * 60 * 1000,
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
  };
});
