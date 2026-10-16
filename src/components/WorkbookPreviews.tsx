import React, { useCallback, useEffect, useState } from 'react';
import { downloadWorkbook, type WorkbookFile } from '../utils/workbookDownload';
import { useAuthStore } from '../store/authStore';
import { hasPaidAccess, hasPremiumAccess } from '../utils/premiumAccess';

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

const FREE_PREVIEW_PAGE_LIMIT = 4;

const thumb = (b: Book, n: number) => `/downloads/previews/${b.id}-p${n}-sm.webp`;
/** Screen-resolution page images. */
const pageImg = (b: Book, n: number) => `/workbook-preview/${b.id}/p${n}.webp`;

const WorkbookPreviews: React.FC<{ compact?: boolean }> = () => {
  const [open, setOpen] = useState<{ b: Book; n: number } | null>(null);
  const { currentUser, isAdminLoggedIn, openAuthModal, openPaymentModal } = useAuthStore();
  const isPaidMember = hasPaidAccess(currentUser, isAdminLoggedIn);
  const hasTwoWeekSub = hasPremiumAccess(currentUser, isAdminLoggedIn);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o ? { ...o, n: ((o.n - 1 + d + o.b.pages) % o.b.pages) + 1 } : o)), []);

  const handleRegisterTrial = useCallback(() => {
    close();
    openAuthModal('register');
  }, [close, openAuthModal]);

  const handlePaidUpgrade = useCallback(() => {
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
  const isCurrentPageFree = open ? open.n <= FREE_PREVIEW_PAGE_LIMIT : false;
  const isOnlineViewAllowed = isCurrentPageFree || hasTwoWeekSub;
  const isWatermarkShown = Boolean(open && !isPaidMember && isOnlineViewAllowed);

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
                {b.pages} pages · {
                  isPaidMember
                    ? '✓ Full Online View & Printouts Unlocked'
                    : hasTwoWeekSub
                    ? '✓ Full Online View Active (2-Week Sub) · 🔒 Printouts Require Paid Plan'
                    : 'Pages 1–4 Free Preview · 🔒 2-Wk Sub for Pages 5+ · 🔒 Paid for Printouts'
                }
              </span>
            </div>
            <div className="wbp-head-right">
              {isPaidMember ? (
                <span className="wbp-unlocked-pill" title="Paid membership: full online view and vector printouts unlocked">
                  ✓ Paid Unlocked
                </span>
              ) : hasTwoWeekSub ? (
                <span className="wbp-trial-pill" title="2-Week Subscription: full online view active; paid membership required for printouts">
                  ✨ 2-Week Sub
                </span>
              ) : (
                <span className="wbp-lock-pill" title="Pages 1–4 free preview; 2-week subscription for full view; paid membership for printouts">
                  🔒 Pages 1–4 Free
                </span>
              )}
              <button
                type="button"
                className={`wbp-mini-dl${!isPaidMember ? ' is-locked' : ''}`}
                style={{ background: isPaidMember ? b.color : '#475569' }}
                onClick={() => downloadWorkbook(b.pdf)}
                data-testid={`wbp-dl-${b.id}`}
                title={isPaidMember ? `Download full printable ${b.title} PDF` : 'Paid membership required to download printable vector PDF'}
              >
                {isPaidMember ? '⬇ PDF' : '🔒 Printout PDF'}
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
                  {!isPaidMember && (
                    <span className="wbp-thumb-watermark-ribbon">
                      {s.n <= FREE_PREVIEW_PAGE_LIMIT
                        ? `FREE (p.${s.n})`
                        : hasTwoWeekSub
                        ? `2-WK SUB (p.${s.n})`
                        : `🔒 2-WK SUB (p.${s.n})`}
                    </span>
                  )}
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
                  {open.b.title} · Page {open.n} of {open.b.pages}
                  {activeShotLabel ? ` · ${activeShotLabel}` : ''}
                </b>
                {isPaidMember ? (
                  <span className="wbp-mode-tag" style={{ background: '#dcfce7', color: '#15803d', borderColor: '#bbf7d0' }}>
                    ✓ Paid Member Access (Printouts &amp; Full View)
                  </span>
                ) : hasTwoWeekSub ? (
                  <span className="wbp-mode-tag" style={{ background: '#e0f2fe', color: '#0369a1', borderColor: '#bae6fd' }}>
                    ✨ 2-Week Subscription Active · 🔒 Printouts Require Paid Plan
                  </span>
                ) : isCurrentPageFree ? (
                  <span className="wbp-mode-tag" style={{ background: '#fef3c7', color: '#b45309', borderColor: '#fde68a' }}>
                    📖 Free Sample Preview (Page {open.n} of 4) · 🔒 Pages 5+ Require 2-Week Sub
                  </span>
                ) : (
                  <span className="wbp-mode-tag" style={{ background: '#fee2e2', color: '#b91c1c', borderColor: '#fca5a5' }}>
                    🔒 2-Week Subscription Required
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
                  className={!isOnlineViewAllowed ? 'is-blurred' : ''}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />

                {/* Watermark overlay on open pages for non-paid users */}
                {isWatermarkShown && (
                  <div className="wbp-watermark-overlay" aria-hidden="true">
                    <div className="wbp-watermark-pattern">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="wbp-watermark-line">
                          {hasTwoWeekSub
                            ? 'EDNETLEARN · 2-WEEK SUBSCRIPTION PREVIEW · PRINTING REQUIRES PAID MEMBERSHIP'
                            : 'EDNETLEARN · FREE PREVIEW (PAGES 1–4) · PRINTING REQUIRES PAID SUBSCRIPTION'}
                        </div>
                      ))}
                    </div>
                    <div className="wbp-watermark-center">
                      {hasTwoWeekSub
                        ? '✨ 2-WEEK SUBSCRIPTION ONLINE VIEW · PRINTING REQUIRES PAID MEMBERSHIP'
                        : '🔒 FREE PREVIEW (PAGES 1–4) · 2-WEEK SUB FOR FULL VIEW · PAID FOR PRINTOUTS'}
                    </div>
                  </div>
                )}

                {/* Inactive / Locked Stage for pages 5+ when user does not have 2-week subscription */}
                {!isOnlineViewAllowed && (
                  <div className="wbp-locked-overlay">
                    <div className="wbp-locked-card">
                      <div className="wbp-locked-icon">🔒</div>
                      <h4 className="wbp-locked-title">Page {open.n} is Locked</h4>
                      <div className="wbp-locked-badge">2-Week Free Subscription Required</div>
                      <p className="wbp-locked-desc">
                        Pages 1 to 4 are open for free preview. To view all <b>{open.b.pages} pages</b> of <b>{open.b.title}</b> online, activate your <b>2-Week Free Subscription (Free Sign-Up)</b>.
                        High-resolution printable vector PDFs require a <b>Paid Membership</b>.
                      </p>
                      <div className="wbp-locked-perks">
                        <span>✓ Full Online Reading Access for All 7 Workbooks ({open.b.pages} pages)</span>
                        <span>✓ 14-Day Free Access to All Lessons, Readers &amp; Interactive Quizzes</span>
                        <span>✓ High-Resolution Vector Printable PDFs with Paid Membership</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                        {!currentUser ? (
                          <>
                            <button
                              type="button"
                              className="wbp-locked-cta-btn"
                              onClick={handleRegisterTrial}
                            >
                              ✨ Start 2-Week Free Subscription (Free Sign-Up)
                            </button>
                            <button
                              type="button"
                              className="wbp-locked-cta-secondary"
                              onClick={handlePaidUpgrade}
                            >
                              👑 Unlock Printouts with Paid Membership
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="wbp-locked-cta-btn"
                            onClick={handlePaidUpgrade}
                          >
                            👑 Upgrade to Paid Subscription (Printouts &amp; Full Access)
                          </button>
                        )}
                        <button
                          type="button"
                          className="wbp-locked-back-btn"
                          onClick={() => setOpen({ b: open.b, n: 1 })}
                        >
                          ‹ Back to Free Preview (Pages 1–4)
                        </button>
                      </div>
                      <div className="wbp-sample-jumps">
                        <span style={{ fontSize: '0.72rem', color: '#64748b', width: '100%', marginBottom: '0.2rem' }}>Free Sample Pages:</span>
                        {[1, 2, 3, 4].filter((p) => p <= open.b.pages).map((p) => (
                          <button
                            key={p}
                            type="button"
                            className={`wbp-shot-pill${open.n === p ? ' is-active' : ''}`}
                            onClick={() => setOpen({ b: open.b, n: p })}
                          >
                            Page {p}{p === 1 ? ' (Cover)' : ''}
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
                  ? `Full member access · Page ${open.n} of ${open.b.pages} · Printing & downloads unlocked`
                  : hasTwoWeekSub
                  ? `2-Week Subscription active · Page ${open.n} of ${open.b.pages} · Printable PDFs require Paid Plan`
                  : isCurrentPageFree
                  ? `Free sample preview · Page ${open.n} of 4 (Pages 5+ require 2-Week Free Subscription)`
                  : `🔒 Page ${open.n} of ${open.b.pages} · 2-Week Free Subscription required`}
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
                {isPaidMember ? '⬇ Download / Print Vector PDF' : '👑 Unlock Printouts (Paid Membership)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkbookPreviews;
