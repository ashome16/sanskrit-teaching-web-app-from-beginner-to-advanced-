/** Pointer position inside an SVG / canvas element, in its own coordinate units. */
export const localPoint = (
  el: Element,
  clientX: number,
  clientY: number,
  width: number,
  height: number,
): { x: number; y: number } => {
  const r = el.getBoundingClientRect();
  return {
    x: ((clientX - r.left) / Math.max(1, r.width)) * width,
    y: ((clientY - r.top) / Math.max(1, r.height)) * height,
  };
};
