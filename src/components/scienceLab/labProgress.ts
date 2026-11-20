/**
 * Last-played Vijñāna Lab game (and optional step) for "Continue where you left off".
 */
export const STORAGE_KEY_LAB_PROGRESS = 'vijnana_lab_progress_v1';

export interface LabProgress {
  labId: string;
  step?: string;
  title?: string;
  updatedAt: number;
}

export function readLabProgress(): LabProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LAB_PROGRESS);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LabProgress;
    if (!parsed || typeof parsed.labId !== 'string' || !parsed.labId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveLabProgress(next: { labId: string; step?: string; title?: string }): void {
  if (typeof window === 'undefined') return;
  try {
    const prev = readLabProgress();
    const merged: LabProgress = {
      labId: next.labId,
      title: next.title ?? (prev && prev.labId === next.labId ? prev.title : undefined),
      step: next.step !== undefined ? next.step : (prev && prev.labId === next.labId ? prev.step : undefined),
      updatedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY_LAB_PROGRESS, JSON.stringify(merged));
  } catch {
    /* ignore quota / private mode */
  }
}

/** Fold IAST / Devanāgarī diacritics so "paramanu" matches paramāṇu. */
export function foldLabSearch(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
