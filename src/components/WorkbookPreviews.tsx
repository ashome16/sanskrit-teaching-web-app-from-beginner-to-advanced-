import React, { useCallback, useEffect, useState } from 'react';

type Book = { group?: string; id: string; title: string; pdf: string; pages: number; color: string; shots: { n: number; label: string }[] };

const BOOKS: Book[] = [
  {
    id: 'basic',
    title: '📥 Beginner Workbook',
    pdf: '/downloads/sanskrit-basic-workbook.pdf',
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
    pdf: '/downloads/sanskrit-festival-workbook.pdf',
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
    pdf: '/downloads/sanskrit-grammar-workbook-level-1.pdf',
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
    pdf: '/downloads/sanskrit-grammar-workbook-level-2.pdf',
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
    pdf: '/downloads/sanskrit-grammar-workbook-level-3.pdf',
    pages: 22,
    color: '#be185d',
    shots: [
      { n: 1, label: 'Cover' },
      { n: 3, label: 'Samāsa' },
      { n: 10, label: 'Passive' },
      { n: 18, label: 'Subhāṣita' },
    ],
  },
];

const src = (b: Book, n: number, s: 'sm' | 'lg') => `/downloads/previews/${b.id}-p${n}-${s}.webp`;

const WorkbookPreviews: React.FC<{ compact?: boolean }> = () => {
  const [open, setOpen] = useState<{ b: Book; i: number } | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o ? { ...o, i: (o.i + d + o.b.shots.length) % o.b.shots.length } : o)), []);

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
        <div className="wbp-card" style={{ borderColor: `${b.color}55` }} data-testid={`wbp-${b.id}`}>
          <div className="wbp-head">
            <a href={b.pdf} download className="wbp-title" style={{ color: b.color }}>{b.title}</a>
            <span className="wbp-meta">{b.pages} pages · Free · PDF</span>
            {b.group === 'grammar' && <a href={b.pdf} download className="wbp-mini-dl" style={{ background: b.color }}>⬇ Download</a>}
          </div>
          <div className="wbp-row">
            {b.shots.map((s, i) => (
              <button key={s.n} type="button" className="wbp-thumb" onClick={() => setOpen({ b, i })} aria-label={`Preview ${b.title} page ${s.n}: ${s.label}`}>
                <img src={src(b, s.n, 'sm')} alt={`${s.label} page`} loading="lazy" decoding="async" width={300} height={424} />
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
              <b>{open.b.title} · page {open.b.shots[open.i].n} of {open.b.pages} · {open.b.shots[open.i].label}</b>
              <button type="button" className="wbp-x" onClick={close} aria-label="Close">✕</button>
            </div>
            <div className="wbp-lb-stage">
              <button type="button" className="wbp-nav" onClick={() => step(-1)} aria-label="Previous">‹</button>
              <img src={src(open.b, open.b.shots[open.i].n, 'lg')} alt={`${open.b.shots[open.i].label} page`} />
              <button type="button" className="wbp-nav" onClick={() => step(1)} aria-label="Next">›</button>
            </div>
            <div className="wbp-lb-bot">
              <span>{open.i + 1} / {open.b.shots.length}</span>
              <a href={open.b.pdf} download className="wbp-dl" style={{ background: open.b.color }}>⬇ Download free PDF ({open.b.pages} pages)</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkbookPreviews;
