import React, { useCallback, useEffect, useState } from 'react';
import { downloadWorkbook, type WorkbookFile } from '../utils/workbookDownload';

type Book = { group?: string; id: string; title: string; pdf: WorkbookFile; pages: number; color: string; shots: { n: number; label: string }[] };

const BOOKS: Book[] = [
  {
    id: 'basic',
    title: '📥 Beginner Workbook',
    pdf: 'sanskrit-basic-workbook.pdf',
    pages: 28,
    color: '#15803d',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 3, label: 'Vowels' },
      { n: 9, label: 'First words' },
      { n: 26, label: 'Certificate' },
    ],
  },
  {
    id: 'festival',
    title: '🪔 Festival Workbook',
    pdf: 'sanskrit-festival-workbook.pdf',
    pages: 34,
    color: '#c2410c',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 3, label: 'Dīpāvalī' },
      { n: 25, label: 'Adornment' },
      { n: 28, label: 'Seasons' },
    ],
  },
  {
    group: 'grammar',
    id: 'grammar1',
    title: '📘 Grammar · Level 1 Basics',
    pdf: 'sanskrit-grammar-workbook-level-1.pdf',
    pages: 22,
    color: '#7c3aed',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 4, label: 'Cases' },
      { n: 5, label: 'राम' },
      { n: 15, label: 'Present' },
    ],
  },
  {
    group: 'grammar',
    id: 'grammar2',
    title: '📗 Grammar · Level 2 Intermediate',
    pdf: 'sanskrit-grammar-workbook-level-2.pdf',
    pages: 21,
    color: '#0d9488',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 4, label: 'Past tense' },
      { n: 10, label: 'Sandhi' },
      { n: 14, label: 'Kṛdanta' },
    ],
  },
  {
    group: 'grammar',
    id: 'grammar3',
    title: '📕 Grammar · Level 3 Advanced',
    pdf: 'sanskrit-grammar-workbook-level-3.pdf',
    pages: 22,
    color: '#be185d',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 3, label: 'Samāsa' },
      { n: 10, label: 'Passive' },
      { n: 18, label: 'Subhāṣita' },
    ],
  },
  {
    group: 'nature',
    id: 'animals',
    title: '🦚 Animals · पशवः पक्षिणश्च',
    pdf: 'sanskrit-animals-workbook.pdf',
    pages: 25,
    color: '#15803d',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 16, label: 'Vāhanas' },
      { n: 18, label: 'Pañcatantra' },
      { n: 22, label: 'Colouring' },
    ],
  },
  {
    group: 'nature',
    id: 'plants',
    title: '🌿 Indian Plants · वृक्षाः ओषधयश्च',
    pdf: 'sanskrit-plants-workbook.pdf',
    pages: 24,
    color: '#4d7c0f',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 5, label: 'Sacred trees' },
      { n: 10, label: 'Flowers' },
      { n: 18, label: 'Tulasī log' },
    ],
  },
];

const thumb = (b: Book, n: number) => `/downloads/previews/${b.id}-p${n}-sm.webp`;
/** Watermarked, screen-resolution page images (free online preview of every page). */
const pageImg = (b: Book, n: number) => `/workbook-preview/${b.id}/p${n}.webp`;

const WorkbookPreviews: React.FC<{ compact?: boolean }> = () => {
  const [open, setOpen] = useState<{ b: Book; n: number } | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o ? { ...o, n: ((o.n - 1 + d + o.b.pages) % o.b.pages) + 1 } : o)), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  return (
    <div className="wbp-wrap" data-testid="workbook-previews">
      {BOOKS.map((b, bi) => (
        <React.Fragment key={b.id}>
        {b.group === 'grammar' && BOOKS[bi - 1]?.group !== 'grammar' && (
          <h4 className="wbp-group" data-testid="grammar-workbooks-heading">📚 Grammar Workbooks · व्याकरण-अभ्यास-पुस्तिकाः</h4>
        )}
        {b.group === 'nature' && BOOKS[bi - 1]?.group !== 'nature' && (
          <h4 className="wbp-group" data-testid="nature-workbooks-heading">🌳 Nature Workbooks · प्रकृति-अभ्यास-पुस्तिकाः</h4>
        )}
        <div className="wbp-card" style={{ borderColor: `${b.color}55` }} data-testid={`wbp-${b.id}`}>
          <div className="wbp-head">
            <button type="button" className="wbp-title" style={{ color: b.color }} onClick={() => setOpen({ b, n: 1 })}>{b.title}</button>
            <span className="wbp-meta">{b.pages} pages · Free preview · PDF for members</span>
            <button type="button" className="wbp-mini-dl" style={{ background: b.color }} onClick={() => downloadWorkbook(b.pdf)} data-testid={`wbp-dl-${b.id}`}>⬇ PDF</button>
          </div>
          <div className="wbp-row">
            {b.shots.map((s) => (
              <button key={s.n} type="button" className="wbp-thumb" onClick={() => setOpen({ b, n: s.n })} aria-label={`Preview ${b.title} page ${s.n}: ${s.label}`}>
                <img src={thumb(b, s.n)} alt={`${s.label} page`} loading="lazy" decoding="async" width={300} height={424} />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
        </React.Fragment>
      ))}
      {open && (
        <div className="wbp-lb" role="dialog" aria-modal="true" aria-label="Workbook preview" onClick={close}>
          <div className="wbp-lb-inner" onClick={(e) => e.stopPropagation()}>
            <div className="wbp-lb-top">
              <b>{open.b.title} · page {open.n} of {open.b.pages}{open.b.shots.find((x) => x.n === open.n) ? ` · ${open.b.shots.find((x) => x.n === open.n)!.label}` : ''}</b>
              <button type="button" className="wbp-x" onClick={close} aria-label="Close">✕</button>
            </div>
            <div className="wbp-lb-stage">
              <button type="button" className="wbp-nav" onClick={() => step(-1)} aria-label="Previous page">‹</button>
              <img src={pageImg(open.b, open.n)} alt={`${open.b.title} page ${open.n} (preview)`} onContextMenu={(e) => e.preventDefault()} draggable={false} />
              <button type="button" className="wbp-nav" onClick={() => step(1)} aria-label="Next page">›</button>
            </div>
            <div className="wbp-lb-bot">
              <span>Free online preview · {open.n} / {open.b.pages}</span>
              <button type="button" className="wbp-dl" style={{ background: open.b.color }} onClick={() => { if (!downloadWorkbook(open.b.pdf)) close(); }} data-testid="wbp-lb-download">⬇ Download / print PDF (members)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkbookPreviews;
