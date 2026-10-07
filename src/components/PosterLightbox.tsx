import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/poster-lightbox.css';

export interface PosterLightboxProps {
  open: boolean;
  onClose: () => void;
  /** Image shown on screen (e.g. the .webp). */
  src: string;
  /** Full-resolution file for "Open full size" and Download (e.g. the .png). */
  fullSrc: string;
  alt: string;
  title: string;
  titleSa?: string;
  downloadName?: string;
}

/**
 * Full-screen poster viewer. Rendered into <body> so no page layout can hide it.
 * Fit to screen by default; tap the poster or "Zoom" for full size (scroll / pinch to pan).
 * Esc, the ✕ button, or a click on the dark backdrop closes it.
 */
export const PosterLightbox: React.FC<PosterLightboxProps> = ({
  open,
  onClose,
  src,
  fullSrc,
  alt,
  title,
  titleSa,
  downloadName,
}) => {
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      setZoomed(false);
      previousFocus?.focus?.();
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="poster-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="poster-lightbox-title"
      onClick={onClose}
    >
      <div className="poster-lightbox-bar" onClick={(event) => event.stopPropagation()}>
        <h2 id="poster-lightbox-title" className="poster-lightbox-title">
          {title}
          {titleSa ? <span className="poster-lightbox-title-sa">{titleSa}</span> : null}
        </h2>
        <div className="poster-lightbox-tools">
          <button
            type="button"
            className="poster-lightbox-btn"
            onClick={() => setZoomed((value) => !value)}
            aria-pressed={zoomed}
          >
            {zoomed ? '⤡ Fit to screen' : '🔍 Zoom'}
          </button>
          <a className="poster-lightbox-btn" href={fullSrc} target="_blank" rel="noopener noreferrer">
            ↗ Open full size
          </a>
          <a className="poster-lightbox-btn" href={fullSrc} download={downloadName}>
            📥 Download
          </a>
          <button
            ref={closeRef}
            type="button"
            className="poster-lightbox-close"
            onClick={onClose}
            aria-label="Close poster"
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>
      </div>
      <div className={`poster-lightbox-stage${zoomed ? ' is-zoomed' : ''}`}>
        <img
          src={src}
          alt={alt}
          className="poster-lightbox-img"
          onClick={(event) => {
            event.stopPropagation();
            setZoomed((value) => !value);
          }}
        />
      </div>
    </div>,
    document.body,
  );
};

export default PosterLightbox;
