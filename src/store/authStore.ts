import { create } from 'zustand';
import type {
  UserProfile,
  UserAccount,
  RegisterFormData,
  UpdateProfileFormData,
  PlanStatus,
} from '../types/auth';
import type { UserProgress } from '../types';
import { useAppStore } from './index';

const ACCOUNTS_STORAGE_KEY = 'sanskrit_accounts_v1';
const SESSION_STORAGE_KEY = 'sanskrit_current_session_v1';

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
  authModalInitialTab: 'login' | 'register';
  authError: string | null;

  // Actions
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  clearAuthError: () => void;

  register: (data: RegisterFormData) => { success: boolean; error?: string };
  login: (usernameOrEmail: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: UpdateProfileFormData) => { success: boolean; error?: string };
  deleteProfile: (confirmationPassword: string) => { success: boolean; error?: string };
  getTrialDaysRemaining: () => number;
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
      const status: PlanStatus = now <= account.profile.trialEndsAt ? 'trial' : 'expired';
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
    authModalInitialTab: 'login',
    authError: null,

    openAuthModal: (tab = 'login') =>
      set({ isAuthModalOpen: true, authModalInitialTab: tab, authError: null }),

    closeAuthModal: () => set({ isAuthModalOpen: false, authError: null }),

    openProfileModal: () => set({ isProfileModalOpen: true }),
    closeProfileModal: () => set({ isProfileModalOpen: false }),

    clearAuthError: () => set({ authError: null }),

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
  };
});
