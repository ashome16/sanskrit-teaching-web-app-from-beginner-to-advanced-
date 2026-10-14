import React, { useCallback, useEffect, useState } from 'react';
import { downloadWorkbook, type WorkbookFile } from '../utils/workbookDownload';
import { useAuthStore } from '../store/authStore';
import { hasPaidAccess } from '../utils/premiumAccess';

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
/** Screen-resolution page images. */
const pageImg = (b: Book, n: number) => `/workbook-preview/${b.id}/p${n}.webp`;

const isSamplePage = (b: Book, n: number): boolean => {
  return b.shots.some((s) => s.n === n) || n <= 2;
};

const WorkbookPreviews: React.FC<{ compact?: boolean }> = () => {
  const [open, setOpen] = useState<{ b: Book; n: number } | null>(null);
  const { currentUser, isAdminLoggedIn, openAuthModal, openPaymentModal } = useAuthStore();
  const isPaidMember = hasPaidAccess(currentUser, isAdminLoggedIn);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o ? { ...o, n: ((o.n - 1 + d + o.b.pages) % o.b.pages) + 1 } : o)), []);

  const handleMemberUpgrade = useCallback(() => {
    close();
    if (!currentUser) openAuthModal('register');
    else openPaymentModal('unlock_paid_features');
  }, [close, currentUser, openAuthModal, openPaymentModal]);

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

  const activeShotLabel = open ? open.b.shots.find((x) => x.n === open.n)?.label : null;
  const isCurrentSample = open ? isSamplePage(open.b, open.n) : false;
  const isLockedPage = Boolean(open && !isPaidMember && !isCurrentSample);

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
            <div className="wbp-head-left">
              <button type="button" className="wbp-title" style={{ color: b.color }} onClick={() => setOpen({ b, n: 1 })}>
                {b.title}
              </button>
              <span className="wbp-meta">
                {b.pages} pages · {isPaidMember ? '✓ Unlocked for Members' : 'Free sample preview · 🔒 Full PDF locked'}
              </span>
            </div>
            <div className="wbp-head-right">
              {!isPaidMember ? (
                <span className="wbp-lock-pill" title="Paid membership required to download high-resolution PDF">
                  🔒 Member Exclusive
                </span>
              ) : (
                <span className="wbp-unlocked-pill" title="Active member benefit">
                  ✓ Unlocked
                </span>
              )}
              <button
                type="button"
                className={`wbp-mini-dl${!isPaidMember ? ' is-locked' : ''}`}
                style={{ background: isPaidMember ? b.color : '#475569' }}
                onClick={() => downloadWorkbook(b.pdf)}
                data-testid={`wbp-dl-${b.id}`}
                title={isPaidMember ? `Download full ${b.title} PDF` : 'Paid membership required to download printable PDF'}
              >
                {isPaidMember ? '⬇ PDF' : '🔒 Member PDF'}
              </button>
            </div>
          </div>
          <div className="wbp-row">
            {b.shots.map((s) => (
              <button
                key={s.n}
                type="button"
                className="wbp-thumb"
                onClick={() => setOpen({ b, n: s.n })}
                aria-label={`Preview ${b.title} page ${s.n}: ${s.label}`}
              >
                <div className="wbp-thumb-img-wrap">
                  <img src={thumb(b, s.n)} alt={`${s.label} page`} loading="lazy" decoding="async" width={300} height={424} />
                  {!isPaidMember && <span className="wbp-thumb-watermark-ribbon">PREVIEW</span>}
                </div>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <b>
                  {open.b.title} · page {open.n} of {open.b.pages}
                  {activeShotLabel ? ` · ${activeShotLabel}` : ''}
                </b>
                {!isPaidMember && (
                  <span className="wbp-mode-tag">
                    {isCurrentSample ? '🔒 Watermarked Preview' : '🔒 Member Locked'}
                  </span>
                )}
              </div>
              <button type="button" className="wbp-x" onClick={close} aria-label="Close">✕</button>
            </div>

            <div className="wbp-lb-stage">
              <button type="button" className="wbp-nav" onClick={() => step(-1)} aria-label="Previous page">‹</button>
              <div className="wbp-stage-container">
                <img
                  src={pageImg(open.b, open.n)}
                  alt={`${open.b.title} page ${open.n} (preview)`}
                  className={isLockedPage ? 'is-blurred' : ''}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />

                {/* Watermark overlay on open sample pages for non-members */}
                {!isPaidMember && isCurrentSample && (
                  <div className="wbp-watermark-overlay" aria-hidden="true">
                    <div className="wbp-watermark-pattern">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="wbp-watermark-line">
                          EDNETLEARN · PREVIEW ONLY · MEMBER LOCK · DO NOT COPY
                        </div>
                      ))}
                    </div>
                    <div className="wbp-watermark-center">
                      🔒 EDNET LEARN · WATERMARKED PREVIEW · SUBSCRIBE TO PRINT &amp; DOWNLOAD
                    </div>
                  </div>
                )}

                {/* Inactive / Locked Stage for non-sample pages for non-members */}
                {isLockedPage && (
                  <div className="wbp-locked-overlay">
                    <div className="wbp-locked-card">
                      <div className="wbp-locked-icon">🔒</div>
                      <h4 className="wbp-locked-title">Page {open.n} is Locked</h4>
                      <p className="wbp-locked-desc">
                        You are viewing a free preview of <b>{open.b.title}</b>.
                        To read all <b>{open.b.pages} pages</b> and download the complete high-resolution printable PDF with exercises and answer keys, upgrade to <b>EdNet Learn Membership</b>.
                      </p>
                      <div className="wbp-locked-perks">
                        <span>✓ All 7 Comprehensive Workbooks (176+ pages)</span>
                        <span>✓ Full Teacher Answer Keys &amp; Solutions</span>
                        <span>✓ High-Resolution Vector Printable PDFs</span>
                      </div>
                      <button
                        type="button"
                        className="wbp-locked-cta-btn"
                        onClick={handleMemberUpgrade}
                      >
                        👑 Unlock Full Workbook with Membership
                      </button>
                      <button
                        type="button"
                        className="wbp-locked-back-btn"
                        onClick={() => setOpen({ b: open.b, n: 1 })}
                      >
                        ‹ Back to Cover &amp; Free Sample Pages
                      </button>
                      <div className="wbp-sample-jumps">
                        {open.b.shots.map((s) => (
                          <button
                            key={s.n}
                            type="button"
                            className="wbp-shot-pill"
                            onClick={() => setOpen({ b: open.b, n: s.n })}
                          >
                            Sample: {s.label} (p.{s.n})
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button type="button" className="wbp-nav" onClick={() => step(1)} aria-label="Next page">›</button>
            </div>

            <div className="wbp-lb-bot">
              <span style={{ fontSize: '0.8rem', color: '#475569' }}>
                {isPaidMember
                  ? `Full member access · ${open.n} / ${open.b.pages}`
                  : isCurrentSample
                  ? `Free sample preview · ${open.n} / ${open.b.pages} (Watermarked)`
                  : `🔒 Inactive preview · Page ${open.n} of ${open.b.pages} requires membership`}
              </span>
              <button
                type="button"
                className={`wbp-dl${!isPaidMember ? ' wbp-dl--unlock' : ''}`}
                style={isPaidMember ? { background: open.b.color } : undefined}
                onClick={() => {
                  if (!downloadWorkbook(open.b.pdf)) close();
                }}
                data-testid="wbp-lb-download"
              >
                {isPaidMember ? '⬇ Download / print PDF' : '👑 Unlock Full Printable PDF (Members)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkbookPreviews;
