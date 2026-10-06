import React, { useCallback, useEffect, useId, useRef } from 'react';

/* Tactile "sandbox console" controls shared by every Vijñāna Lab sim. */

type Scale = 'linear' | 'log';

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const toPos = (v: number, min: number, max: number, scale: Scale) =>
  scale === 'log' ? Math.log(v / min) / Math.log(max / min) : (v - min) / (max - min);
const fromPos = (p: number, min: number, max: number, scale: Scale) =>
  scale === 'log' ? min * (max / min) ** p : min + p * (max - min);

export interface DialKnobProps {
  label: React.ReactNode;
  ariaLabel: string;
  value: number;
  min: number;
  max: number;
  /** Value step for linear dials. Log dials move 1% of their travel per arrow press. */
  step?: number;
  scale?: Scale;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  color?: string;
  size?: number;
  disabled?: boolean;
  testId?: string;
}

/** A rotary knob: drag (up/right = more), scroll wheel, arrow keys, PageUp/PageDown, Home/End, touch. */
export const DialKnob: React.FC<DialKnobProps> = ({
  label,
  ariaLabel,
  value,
  min,
  max,
  step = 1,
  scale = 'linear',
  onChange,
  format = (v) => String(Math.round(v)),
  color = '#22d3ee',
  size = 84,
  disabled = false,
  testId,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const gid = `vl-metal-${useId().replace(/:/g, '')}`;
  const drag = useRef<{ x: number; y: number; p: number } | null>(null);
  const p = clamp(toPos(value, min, max, scale), 0, 1);
  const live = useRef({ p, min, max, step, scale, onChange, disabled });
  useEffect(() => {
    live.current = { p, min, max, step, scale, onChange, disabled };
  });

  const emitPos = useCallback((np: number) => {
    const s = live.current;
    const q = clamp(np, 0, 1);
    let v = fromPos(q, s.min, s.max, s.scale);
    if (s.scale === 'linear') v = Math.round(v / s.step) * s.step;
    v = clamp(Number(v.toFixed(6)), s.min, s.max);
    s.onChange(v);
  }, []);

  const nudge = useCallback(
    (dir: number, big = false) => {
      const s = live.current;
      if (s.scale === 'log') {
        emitPos(s.p + dir * (big ? 0.1 : 0.01));
      } else {
        const cur = fromPos(s.p, s.min, s.max, 'linear');
        const range = s.max - s.min;
        const inc = big ? Math.max(s.step, Math.round(range / 10 / s.step) * s.step) : s.step;
        emitPos(toPos(cur + dir * inc, s.min, s.max, 'linear'));
      }
    },
    [emitPos],
  );

  // Wheel needs a non-passive listener so the page does not scroll while turning the knob.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const onWheel = (e: WheelEvent) => {
      if (live.current.disabled) return;
      e.preventDefault();
      nudge(e.deltaY < 0 ? 1 : -1, e.shiftKey);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [nudge]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    const k = e.key;
    if (k === 'ArrowUp' || k === 'ArrowRight') nudge(1, e.shiftKey);
    else if (k === 'ArrowDown' || k === 'ArrowLeft') nudge(-1, e.shiftKey);
    else if (k === 'PageUp') nudge(1, true);
    else if (k === 'PageDown') nudge(-1, true);
    else if (k === 'Home') emitPos(0);
    else if (k === 'End') emitPos(1);
    else return;
    e.preventDefault();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();
    ref.current?.focus();
    ref.current?.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, p: live.current.p };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const delta = (d.y - e.clientY + (e.clientX - d.x)) / 240;
    emitPos(d.p + delta);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    drag.current = null;
    try {
      ref.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const ang = -135 + 270 * p;
  const r = size / 2;
  const arcR = r - 5;
  const polar = (a: number, rr: number) => {
    const t = ((a - 90) * Math.PI) / 180;
    return [r + rr * Math.cos(t), r + rr * Math.sin(t)];
  };
  const arc = (a0: number, a1: number) => {
    const [x0, y0] = polar(a0, arcR);
    const [x1, y1] = polar(a1, arcR);
    return `M ${x0} ${y0} A ${arcR} ${arcR} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
  };
  const text = format(value);

  return (
    <div className={`vl-dial${disabled ? ' is-disabled' : ''}`} style={{ '--c': color } as React.CSSProperties}>
      <div
        ref={ref}
        className="vl-dial-knob"
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Number(value.toFixed(3))}
        aria-valuetext={text}
        aria-disabled={disabled || undefined}
        data-testid={testId}
        style={{ width: size, height: size }}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <defs>
            <radialGradient id={gid} cx="35%" cy="30%" r="75%">
              <stop offset="0" stopColor="#e5e7eb" />
              <stop offset="0.45" stopColor="#6b7280" />
              <stop offset="1" stopColor="#1f2937" />
            </radialGradient>
          </defs>
          <path d={arc(-135, 135)} className="vl-dial-track" />
          {p > 0.002 && <path d={arc(-135, ang)} className="vl-dial-value" />}
          {Array.from({ length: 11 }, (_, i) => {
            const a = -135 + 27 * i;
            const [x0, y0] = polar(a, r - 1);
            const [x1, y1] = polar(a, r - (i % 5 === 0 ? 4 : 2.5));
            return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} className="vl-dial-tick" />;
          })}
          <circle cx={r} cy={r} r={r - 12} className="vl-dial-body" />
          <circle cx={r} cy={r} r={r - 17} className="vl-dial-cap" fill={`url(#${gid})`} />
          <line x1={polar(ang, r * 0.18)[0]} y1={polar(ang, r * 0.18)[1]} x2={polar(ang, r - 15)[0]} y2={polar(ang, r - 15)[1]} className="vl-dial-pointer" />
        </svg>
      </div>
      <div className="vl-dial-label">{label}</div>
      <div className="vl-dial-value-text vl-mono" aria-hidden="true">{text}</div>
    </div>
  );
};

export interface GlowSliderProps {
  label: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  valueText?: string;
  color?: string;
  disabled?: boolean;
  testId?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

/** A native range input dressed as a glowing fader: keyboard and touch come for free. */
export const GlowSlider: React.FC<GlowSliderProps> = ({ label, value, min, max, step = 1, onChange, valueText, color = '#22d3ee', disabled, testId, ariaLabel, children }) => {
  const pct = clamp(((value - min) / (max - min)) * 100, 0, 100);
  return (
    <label className={`vl-gslider${disabled ? ' is-disabled' : ''}`} style={{ '--c': color, '--pct': `${pct}%` } as React.CSSProperties}>
      <span className="vl-gslider-head">
        <span className="vl-gslider-label">{label}</span>
        {valueText !== undefined && <b className="vl-mono">{valueText}</b>}
      </span>
      <input type="range" min={min} max={max} step={step} value={value} disabled={disabled} aria-label={ariaLabel} aria-valuetext={valueText} onChange={(e) => onChange(Number(e.target.value))} data-testid={testId} />
      {children}
    </label>
  );
};

export interface LedProps {
  on?: boolean;
  onClick: () => void;
  color?: string;
  /** radio: one of a group; toggle: on/off switch; action: momentary button. */
  kind?: 'radio' | 'toggle' | 'action';
  testId?: string;
  title?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const LedButton: React.FC<LedProps> = ({ on = false, onClick, color = '#22d3ee', kind = 'toggle', testId, title, disabled, className, children }) => {
  const aria =
    kind === 'radio' ? { role: 'radio', 'aria-checked': on } : kind === 'toggle' ? { 'aria-pressed': on } : {};
  return (
    <button
      type="button"
      className={`vl-led${on ? ' is-on' : ''}${kind === 'action' ? ' vl-led--action' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--c': color } as React.CSSProperties}
      onClick={onClick}
      data-testid={testId}
      title={title}
      disabled={disabled}
      {...aria}
    >
      <span className="vl-led-dot" aria-hidden="true" />
      <span className="vl-led-text">{children}</span>
    </button>
  );
};

export interface HudFrameProps {
  accent?: string;
  className?: string;
  tl?: React.ReactNode;
  tr?: React.ReactNode;
  bl?: React.ReactNode;
  br?: React.ReactNode;
  children: React.ReactNode;
}

/** Neon / brushed-metal viewport frame with corner brackets, grid + scanline overlay and HUD readouts. */
export const HudFrame: React.FC<HudFrameProps> = ({ accent = '#22d3ee', className, tl, tr, bl, br, children }) => (
  <div className={`vl-hud${className ? ` ${className}` : ''}`} style={{ '--accent': accent } as React.CSSProperties}>
    <div className="vl-hud-screen">
      {children}
      <div className="vl-hud-overlay" aria-hidden="true" />
      {tl && <div className="vl-hud-read vl-hud-tl vl-mono" aria-hidden="true">{tl}</div>}
      {tr && <div className="vl-hud-read vl-hud-tr vl-mono" aria-hidden="true">{tr}</div>}
      {bl && <div className="vl-hud-read vl-hud-bl vl-mono" aria-hidden="true">{bl}</div>}
      {br && <div className="vl-hud-read vl-hud-br vl-mono" aria-hidden="true">{br}</div>}
    </div>
    <span className="vl-hud-corner vl-hud-c1" aria-hidden="true" />
    <span className="vl-hud-corner vl-hud-c2" aria-hidden="true" />
    <span className="vl-hud-corner vl-hud-c3" aria-hidden="true" />
    <span className="vl-hud-corner vl-hud-c4" aria-hidden="true" />
  </div>
);
