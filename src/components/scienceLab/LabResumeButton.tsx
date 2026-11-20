import { useEffect, useState } from 'react';
import { readLabProgress, type LabProgress } from './labProgress';

export default function LabResumeButton({
  className = '',
  variant = 'catalog',
}: {
  className?: string;
  variant?: 'catalog' | 'home';
}) {
  const [progress, setProgress] = useState<LabProgress | null>(null);

  useEffect(() => {
    setProgress(readLabProgress());
  }, []);

  if (!progress) return null;

  const href = `/vignana-lab/#${progress.labId}`;
  const STEP_LABEL: Record<string, string> = {
    biosphere: 'Biosphere (plants, grazers, predators)',
    cellular: 'Tri-Doṣa (Vāta, Pitta, Kapha)',
  };
  const stepPretty = progress.step ? (STEP_LABEL[progress.step] || progress.step) : '';
  const stepBit = stepPretty ? ` · ${stepPretty}` : '';
  const label = progress.title ? `${progress.title}${stepBit}` : progress.labId;

  return (
    <a className={`vl-resume-btn vl-resume-btn--${variant} ${className}`.trim()} href={href}>
      <span className="vl-resume-kicker">Continue where you left off</span>
      <span className="vl-resume-game">{label}</span>
    </a>
  );
}
