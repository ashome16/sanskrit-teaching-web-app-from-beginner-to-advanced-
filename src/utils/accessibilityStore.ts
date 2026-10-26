import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontSizeScale = 'normal' | 'large' | 'xlarge';

export interface AccessibilitySettings {
  fontSize: FontSizeScale;
  highContrast: boolean;
  englishFirst: boolean;
  reduceMotion: boolean;
  screenReaderOptimized: boolean;
  readingLineHeight: 'normal' | 'relaxed';
}

export interface AccessibilityStore extends AccessibilitySettings {
  setFontSize: (size: FontSizeScale) => void;
  cycleFontSize: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleHighContrast: () => void;
  setHighContrast: (enabled: boolean) => void;
  toggleEnglishFirst: () => void;
  setEnglishFirst: (enabled: boolean) => void;
  toggleReduceMotion: () => void;
  setReduceMotion: (enabled: boolean) => void;
  toggleReadingLineHeight: () => void;
  toggleScreenReaderOptimized: () => void;
  resetAll: () => void;
}

export const applyAccessibilityToDom = (settings: AccessibilitySettings) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // Font size scale
  root.classList.remove('a11y-font-lg', 'a11y-font-xl');
  if (settings.fontSize === 'large') {
    root.classList.add('a11y-font-lg');
    root.style.setProperty('--app-font-scale', '1.15');
    root.setAttribute('data-font-size', 'large');
  } else if (settings.fontSize === 'xlarge') {
    root.classList.add('a11y-font-xl');
    root.style.setProperty('--app-font-scale', '1.30');
    root.setAttribute('data-font-size', 'xlarge');
  } else {
    root.style.setProperty('--app-font-scale', '1');
    root.setAttribute('data-font-size', 'normal');
  }

  // High contrast mode (WCAG AAA compliant)
  if (settings.highContrast) {
    root.classList.add('a11y-high-contrast');
    root.setAttribute('data-contrast', 'high');
  } else {
    root.classList.remove('a11y-high-contrast');
    root.setAttribute('data-contrast', 'normal');
  }

  // English-First mode for parents & beginners
  if (settings.englishFirst) {
    root.classList.add('a11y-english-first');
    root.setAttribute('data-mode', 'english-first');
  } else {
    root.classList.remove('a11y-english-first');
    root.setAttribute('data-mode', 'sanskrit-first');
  }

  // Reduced motion
  if (settings.reduceMotion) {
    root.classList.add('a11y-reduce-motion');
  } else {
    root.classList.remove('a11y-reduce-motion');
  }

  // Relaxed reading line height
  if (settings.readingLineHeight === 'relaxed') {
    root.classList.add('a11y-relaxed-height');
  } else {
    root.classList.remove('a11y-relaxed-height');
  }

  // Screen reader optimized flag
  if (settings.screenReaderOptimized) {
    root.classList.add('a11y-sr-optimized');
  } else {
    root.classList.remove('a11y-sr-optimized');
  }
};

const defaultSettings: AccessibilitySettings = {
  fontSize: 'normal',
  highContrast: false,
  englishFirst: false,
  reduceMotion: false,
  screenReaderOptimized: false,
  readingLineHeight: 'normal',
};

export const useAccessibilityStore = create<AccessibilityStore>()(
  persist(
    (set, get) => ({
      ...defaultSettings,

      setFontSize: (fontSize: FontSizeScale) => {
        set({ fontSize });
        applyAccessibilityToDom({ ...get(), fontSize });
      },

      cycleFontSize: () => {
        const current = get().fontSize;
        const next: FontSizeScale =
          current === 'normal' ? 'large' : current === 'large' ? 'xlarge' : 'normal';
        set({ fontSize: next });
        applyAccessibilityToDom({ ...get(), fontSize: next });
      },

      increaseFontSize: () => {
        const current = get().fontSize;
        const next: FontSizeScale =
          current === 'normal' ? 'large' : current === 'large' ? 'xlarge' : 'xlarge';
        set({ fontSize: next });
        applyAccessibilityToDom({ ...get(), fontSize: next });
      },

      decreaseFontSize: () => {
        const current = get().fontSize;
        const next: FontSizeScale =
          current === 'xlarge' ? 'large' : current === 'large' ? 'normal' : 'normal';
        set({ fontSize: next });
        applyAccessibilityToDom({ ...get(), fontSize: next });
      },

      toggleHighContrast: () => {
        const next = !get().highContrast;
        set({ highContrast: next });
        applyAccessibilityToDom({ ...get(), highContrast: next });
      },

      setHighContrast: (enabled: boolean) => {
        set({ highContrast: enabled });
        applyAccessibilityToDom({ ...get(), highContrast: enabled });
      },

      toggleEnglishFirst: () => {
        const next = !get().englishFirst;
        set({ englishFirst: next });
        applyAccessibilityToDom({ ...get(), englishFirst: next });
      },

      setEnglishFirst: (enabled: boolean) => {
        set({ englishFirst: enabled });
        applyAccessibilityToDom({ ...get(), englishFirst: enabled });
      },

      toggleReduceMotion: () => {
        const next = !get().reduceMotion;
        set({ reduceMotion: next });
        applyAccessibilityToDom({ ...get(), reduceMotion: next });
      },

      setReduceMotion: (enabled: boolean) => {
        set({ reduceMotion: enabled });
        applyAccessibilityToDom({ ...get(), reduceMotion: enabled });
      },

      toggleReadingLineHeight: () => {
        const next = get().readingLineHeight === 'normal' ? 'relaxed' : 'normal';
        set({ readingLineHeight: next });
        applyAccessibilityToDom({ ...get(), readingLineHeight: next });
      },

      toggleScreenReaderOptimized: () => {
        const next = !get().screenReaderOptimized;
        set({ screenReaderOptimized: next });
        applyAccessibilityToDom({ ...get(), screenReaderOptimized: next });
      },

      resetAll: () => {
        set({ ...defaultSettings });
        applyAccessibilityToDom(defaultSettings);
      },
    }),
    {
      name: 'ednet_a11y_prefs_v1',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyAccessibilityToDom(state);
        }
      },
    }
  )
);

// Run initial sync on load in browser environment
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('ednet_a11y_prefs_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state) {
        applyAccessibilityToDom(parsed.state);
      }
    }
  } catch {
    // Local storage unavailable or disabled, use defaults
  }
}
