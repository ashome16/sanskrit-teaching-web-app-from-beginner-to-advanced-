/**
 * Utility for OS-aware keyboard shortcuts and modifier keys.
 * Displays ⌘K on macOS/iOS and Ctrl+K on Windows/Linux.
 */

export const isMacPlatform = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const platform = (navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform
    || navigator.platform
    || navigator.userAgent
    || '';
  return /Mac|iPhone|iPad|iPod/i.test(platform);
};

export interface PlatformShortcutInfo {
  /** Short key label, e.g. "⌘K" or "Ctrl+K" */
  kbd: string;
  /** Modifier key only, e.g. "⌘" or "Ctrl" */
  modifier: string;
  /** Full search badge text, e.g. "⌘K or /" or "Ctrl+K or /" */
  searchBadge: string;
  /** Tooltip hint, e.g. "Press ⌘K or /" or "Press Ctrl+K or /" */
  searchTitle: string;
}

export const getSearchShortcut = (): PlatformShortcutInfo => {
  const isMac = isMacPlatform();
  return {
    kbd: isMac ? '⌘K' : 'Ctrl+K',
    modifier: isMac ? '⌘' : 'Ctrl',
    searchBadge: isMac ? '⌘K or /' : 'Ctrl+K or /',
    searchTitle: isMac
      ? 'Search articles, lessons, grammar, Vedic maths & tools (Press ⌘K or /)'
      : 'Search articles, lessons, grammar, Vedic maths & tools (Press Ctrl+K or /)',
  };
};
