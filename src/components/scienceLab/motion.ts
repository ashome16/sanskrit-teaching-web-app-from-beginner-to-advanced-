/** True when the visitor asked the OS for less motion. */
export const prefersReducedMotion = () => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
};

/** Small screens get a lighter particle load. */
export const isSmallScreen = () => {
  try {
    return window.matchMedia('(max-width: 700px)').matches;
  } catch {
    return false;
  }
};
