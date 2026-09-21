import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import type { PaymentTransaction } from '../types/auth';
import '../styles/payment-modal.css';

function buildUpiPayUri(vpa: string, payee: string): string {
  // Manual encode — URLSearchParams uses "+" for spaces, which breaks UPI apps.
  return (
    `upi://pay?pa=${encodeURIComponent(vpa)}` +
    `&pn=${encodeURIComponent(payee)}` +
    `&am=200.00&cu=INR&tn=${encodeURIComponent('EdNet Monthly Access')}`
  );
}

/** Detect phones/tablets where a UPI app can handle upi:// — never use on desktop (WhatsApp hijack). */
function isMobileUpiCapable(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const mobileUa =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua);
  const coarsePointer =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: coarse)').matches;
  return mobileUa || (coarsePointer && /Android|iPhone|iPad|iPod/i.test(ua));
}

const PaymentModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    closePaymentModal,
    currentUser,
    openAuthModal,
    submitManualUpiPayment,
    upiVpa: storeUpiVpa,
    upiPayeeName: storeUpiPayee,
    isAdminLoggedIn,
  } = useAuthStore();

  const [utrNumber, setUtrNumber] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [desktopPayTip, setDesktopPayTip] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingTxn, setPendingTxn] = useState<PaymentTransaction | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [adminPreviewUpi, setAdminPreviewUpi] = useState(false);

  if (!isPaymentModalOpen) return null;

  const trialActive =
    !!currentUser &&
    currentUser.planStatus === 'trial' &&
    typeof currentUser.trialEndsAt === 'number' &&
    currentUser.trialEndsAt > Date.now();

  const trialEndsFormatted =
    trialActive && currentUser?.trialEndsAt
      ? new Date(currentUser.trialEndsAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '';

  /** Admin can preview the real UPI form during trial without activating Premium. */
  const showTrialGate = trialActive && !(isAdminLoggedIn && adminPreviewUpi);
  const isAdminUpiPreview = trialActive && isAdminLoggedIn && adminPreviewUpi;

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(storeUpiVpa);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  const handleSmartPay = async () => {
    setErrorMessage(null);
    if (isMobileUpiCapable()) {
      // Mobile: open official UPI collect intent (PhonePe / GPay / BHIM). No fake success.
      window.location.href = buildUpiPayUri(storeUpiVpa, storeUpiPayee);
      return;
    }
    // Desktop: never fire upi:// (WhatsApp hijacks). Copy VPA + tip only.
    try {
      await navigator.clipboard.writeText(storeUpiVpa);
      setIsCopied(true);
      setDesktopPayTip(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setDesktopPayTip(true);
      setErrorMessage(`Could not copy automatically. Please copy this UPI ID: ${storeUpiVpa}`);
    }
  };

  const handleSubmitUtr = async () => {
    if (!utrNumber.trim()) return;
    if (!currentUser) {
      closePaymentModal();
      openAuthModal('login');
      return;
    }

    const digits = utrNumber.trim().replace(/\s+/g, '');
    if (!/^\d{12}$/.test(digits)) {
      setErrorMessage('Please enter the 12-digit UTR / Ref number from your UPI app.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await submitManualUpiPayment(digits, storeUpiVpa);
      setIsProcessing(false);
      if (res.success && res.transaction) {
        setPendingTxn(res.transaction);
        setUtrNumber('');
      } else {
        setErrorMessage(res.error || 'Could not record UTR. Please try again.');
      }
    } catch {
      setIsProcessing(false);
      setErrorMessage('Network error while saving UTR. Please try again.');
    }
  };

  const handleClose = () => {
    setPendingTxn(null);
    setErrorMessage(null);
    setIsProcessing(false);
    setDesktopPayTip(false);
    setUtrNumber('');
    setAdminPreviewUpi(false);
    closePaymentModal();
  };

  const goRegister = () => {
    handleClose();
    openAuthModal('register');
  };

  const goLogin = () => {
    handleClose();
    openAuthModal('login');
  };

  return (
    <div className="payment-modal-backdrop" onClick={handleClose}>
      <div
        className="payment-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
      >
        {/* Header */}
        <div className="payment-modal-header">
          <button
            type="button"
            className="payment-close-btn"
            onClick={handleClose}
            aria-label="Close Payment Modal"
          >
            ✕
          </button>

          <div className="payment-modal-brand-row">
            <img src="/logo.jpg" alt="EdNet Learn Gurukul" className="payment-modal-brand-logo" />
            <div>
              <div className="payment-modal-brand-title">EdNet Learn Gurukul</div>
              <div className="payment-modal-brand-sub">CBSE Class 7 Sanskrit &amp; Vedic Mathematics</div>
            </div>
          </div>

          {!currentUser ? (
            <>
              <span className="payment-plan-badge">🆓 Start with a free account</span>
              <h2 id="payment-modal-title" className="payment-modal-title">
                Create an account first
              </h2>
            </>
          ) : showTrialGate ? (
            <>
              <span className="payment-plan-badge">🎉 Free Trial Active</span>
              <h2 id="payment-modal-title" className="payment-modal-title">
                Your free trial is activated
              </h2>
            </>
          ) : (
            <>
              <span className="payment-plan-badge">
                {isAdminUpiPreview ? '🛠 Admin UPI Preview' : '🌟 All-Access Monthly Pass'}
              </span>
              <h2 id="payment-modal-title" className="payment-modal-title">
                {isAdminUpiPreview ? 'Preview UPI pay form' : 'Unlock Full Sanskrit Platform'}
              </h2>

              <div className="payment-modal-price-row">
                <span className="payment-price-currency">₹200</span>
                <span className="payment-price-period">/ month</span>
              </div>
              <p className="payment-trial-note">
                {isAdminUpiPreview
                  ? 'Admin preview only — does not charge; Premium still needs real UTR + approve (or Razorpay later).'
                  : 'Includes all 15 CBSE/NCERT Class 7 Chapters, 5,800+ audio glosses, Jodo Puzzles, and Vedic Mathematics!'}
              </p>
            </>
          )}
        </div>

        {/* 1) Guest: account-first gate only — no QR / Copy VPA / UTR */}
        {!currentUser ? (
          <div className="payment-modal-body">
            <div className="payment-success-box" style={{ padding: '1.5rem 1.75rem' }}>
              <div
                className="payment-success-icon"
                style={{ background: '#fef3c7', color: '#b45309' }}
              >
                👤
              </div>
              <h3 className="payment-success-title">Account required</h3>
              <p className="payment-success-sub" style={{ maxWidth: '28rem', margin: '0 auto' }}>
                Please create a free account first. You get a 14-day free trial. After you sign up,
                you can subscribe and pay via UPI when needed.
              </p>
              <div
                style={{
                  marginTop: '1.35rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.65rem',
                  justifyContent: 'center',
                }}
              >
                <button
                  type="button"
                  className="receipt-done-btn"
                  onClick={goRegister}
                  style={{
                    background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.7rem 1.35rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  Create free account
                </button>
                <button
                  type="button"
                  onClick={goLogin}
                  style={{
                    background: '#ffffff',
                    color: '#273b35',
                    border: '2px solid #273b35',
                    borderRadius: '8px',
                    padding: '0.65rem 1.25rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        ) : showTrialGate ? (
          /* 2) Logged in + active trial: no UPI form (admin can opt into preview) */
          <div className="payment-modal-body">
            <div className="payment-success-box" style={{ padding: '1.5rem 1.75rem' }}>
              <div
                className="payment-success-icon"
                style={{ background: '#fef3c7', color: '#b45309' }}
              >
                ✨
              </div>
              <h3 className="payment-success-title">Enjoy your free trial</h3>
              <p className="payment-success-sub" style={{ maxWidth: '28rem', margin: '0 auto' }}>
                Your free trial is active until <strong>{trialEndsFormatted}</strong>. Enjoy
                learning — you can subscribe and pay via UPI when the trial ends.
              </p>
              <p
                style={{
                  margin: '0.85rem auto 0',
                  maxWidth: '26rem',
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  lineHeight: 1.5,
                  textAlign: 'center',
                }}
              >
                No payment is needed right now. Keep exploring chapters, audio, and puzzles until
                your trial ends.
              </p>
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <button
                  type="button"
                  className="receipt-done-btn"
                  onClick={handleClose}
                  style={{
                    background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.65rem 1.4rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  Continue Learning
                </button>
              </div>
              {isAdminLoggedIn && (
                <div
                  style={{
                    marginTop: '1.35rem',
                    paddingTop: '1rem',
                    borderTop: '1px dashed #e2e8f0',
                    textAlign: 'center',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setAdminPreviewUpi(true)}
                    style={{
                      background: '#ffffff',
                      color: '#0f766e',
                      border: '1.5px solid #0f766e',
                      borderRadius: '8px',
                      padding: '0.5rem 0.95rem',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    Admin: preview UPI pay form
                  </button>
                  <p
                    style={{
                      margin: '0.55rem auto 0',
                      maxWidth: '26rem',
                      fontSize: '0.72rem',
                      color: '#64748b',
                      lineHeight: 1.4,
                    }}
                  >
                    Admin preview only — does not charge; Premium still needs real UTR + approve
                    (or Razorpay later).
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : isProcessing ? (
          <div className="payment-processing-box">
            <div className="payment-spinner" />
            <h3 className="payment-processing-text">Submitting your UTR…</h3>
            <p className="payment-processing-sub">
              Please wait while we record your payment reference for verification.
            </p>
          </div>
        ) : pendingTxn ? (
          /* Short acknowledgment only — no fake receipt / PAID UI */
          <div className="payment-modal-body">
            <div className="payment-success-box" style={{ padding: '1.5rem 1.75rem' }}>
              <div
                className="payment-success-icon"
                style={{ background: '#fef3c7', color: '#b45309' }}
              >
                ⏳
              </div>
              <h3 className="payment-success-title">UTR recorded</h3>
              <p className="payment-success-sub" style={{ maxWidth: '28rem', margin: '0 auto' }}>
                Thanks — we recorded your UTR and will unlock access after verifying your UPI
                payment.
              </p>
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <button type="button" className="receipt-done-btn" onClick={handleClose}>
                  Close
                </button>
              </div>
              <div
                style={{
                  marginTop: '1rem',
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  color: '#6b7280',
                  borderTop: '1px solid #f3f4f6',
                  paddingTop: '0.75rem',
                }}
              >
                Questions? Email{' '}
                <a
                  href="mailto:care@ednetlearn.in"
                  style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}
                >
                  care@ednetlearn.in
                </a>{' '}
                or{' '}
                <a
                  href="mailto:admin@ednetlearn.in"
                  style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}
                >
                  admin@ednetlearn.in
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* 3) Logged in + trial ended / needs pay: QR + smart Pay + Copy VPA + UTR */
          <>
            {errorMessage && (
              <div
                style={{
                  background: '#fee2e2',
                  borderBottom: '1px solid #fca5a5',
                  padding: '0.65rem 1.75rem',
                  fontSize: '0.85rem',
                  color: '#991b1b',
                  fontWeight: 600,
                }}
              >
                {errorMessage}
              </div>
            )}

            {isAdminUpiPreview && (
              <div
                style={{
                  padding: '0.65rem 1.75rem',
                  borderBottom: '1px solid #fcd34d',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#92400e',
                  background: '#fffbeb',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}
              >
                <span>
                  Admin preview only — does not charge; Premium still needs real UTR + approve (or
                  Razorpay later).
                </span>
                <button
                  type="button"
                  onClick={() => setAdminPreviewUpi(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #d97706',
                    color: '#92400e',
                    borderRadius: '6px',
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Hide preview
                </button>
              </div>
            )}

            <div
              style={{
                padding: '0.65rem 1.75rem',
                borderBottom: '1px solid #e2e8f0',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#273b35',
                background: '#f8fafc',
              }}
            >
              📱 Pay via UPI / QR only
            </div>

            <div className="payment-modal-body">
              <div className="upi-box">
                <ol
                  style={{
                    margin: '0 0 1rem 0',
                    padding: '0.75rem 0.75rem 0.75rem 1.75rem',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    color: '#334155',
                    lineHeight: 1.55,
                  }}
                >
                  <li>
                    Pay <strong>₹200</strong> to the UPI ID shown below — on phone: tap{' '}
                    <strong>Pay ₹200 with UPI app</strong> or scan the QR; on computer: scan the
                    QR or use the Pay button to copy the UPI ID.
                  </li>
                  <li>
                    Then enter the <strong>12-digit UTR / Ref</strong> from your UPI app.
                  </li>
                  <li>
                    Tap <strong>Submit UTR</strong> — Premium unlocks only after we verify the
                    payment.
                  </li>
                </ol>

                <div className="upi-qr-card">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(
                      buildUpiPayUri(storeUpiVpa, storeUpiPayee)
                    )}`}
                    alt={`Scan to pay ₹200 via UPI to ${storeUpiVpa}`}
                    style={{
                      width: '160px',
                      height: '160px',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      background: '#ffffff',
                      padding: '6px',
                      display: 'block',
                      margin: '0 auto',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    }}
                  />
                  <span className="upi-qr-caption">Scan this QR with your phone&apos;s UPI app</span>
                  <p
                    style={{
                      margin: '0.55rem 0 0 0',
                      fontSize: '0.75rem',
                      color: '#64748b',
                      textAlign: 'center',
                      lineHeight: 1.4,
                    }}
                  >
                    On phone: open any UPI app → Pay to this UPI ID (or scan the QR). On computer:
                    scan the QR with your phone. Premium unlocks after we verify your payment
                    (usually within a few hours).
                  </p>
                </div>

                <div className="upi-id-pill">
                  <span className="upi-id-text">{storeUpiVpa}</span>
                  <button type="button" className="upi-copy-btn" onClick={handleCopyUpi}>
                    {isCopied && !desktopPayTip ? '✓ Copied' : isCopied ? '✓ Copied' : 'Copy VPA'}
                  </button>
                </div>

                {/* Smart Pay: mobile → upi:// intent; desktop → copy VPA (never raw upi:// link) */}
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={handleSmartPay}
                    style={{
                      width: '100%',
                      maxWidth: '22rem',
                      background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '0.75rem 1.1rem',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 10px rgba(13, 148, 136, 0.28)',
                    }}
                  >
                    Pay ₹200 with UPI app
                  </button>
                  <p
                    style={{
                      margin: '0.45rem auto 0',
                      maxWidth: '22rem',
                      fontSize: '0.72rem',
                      color: '#64748b',
                      lineHeight: 1.4,
                    }}
                  >
                    Official UPI collect — we unlock access after we see your payment.
                  </p>
                  {desktopPayTip && (
                    <p
                      role="status"
                      style={{
                        margin: '0.75rem auto 0',
                        maxWidth: '24rem',
                        padding: '0.65rem 0.85rem',
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        color: '#065f46',
                        lineHeight: 1.45,
                        textAlign: 'left',
                      }}
                    >
                      UPI ID copied. Open GPay / PhonePe / any UPI app on your phone → Pay ₹200 to{' '}
                      <strong>{storeUpiVpa}</strong>. Then paste the UTR below.
                    </p>
                  )}
                </div>

                <div className="upi-input-wrap" style={{ marginTop: '1.1rem' }}>
                  <label htmlFor="upi-utr-input" className="upi-input-label">
                    Enter your 12-digit UPI UTR / Ref Number, then tap Submit UTR:
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      id="upi-utr-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={12}
                      className="upi-input-field"
                      placeholder="e.g. 425619874521"
                      value={utrNumber}
                      onChange={(e) =>
                        setUtrNumber(e.target.value.replace(/[^\d]/g, '').slice(0, 12))
                      }
                    />
                    <button
                      type="button"
                      onClick={handleSubmitUtr}
                      disabled={utrNumber.trim().length !== 12 || isProcessing}
                      style={{
                        background: '#273b35',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor:
                          utrNumber.trim().length === 12 && !isProcessing
                            ? 'pointer'
                            : 'not-allowed',
                        whiteSpace: 'nowrap',
                        opacity: utrNumber.trim().length === 12 && !isProcessing ? 1 : 0.6,
                      }}
                    >
                      Submit UTR
                    </button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '0.85rem 1.75rem',
                  background: '#f8fafc',
                  borderTop: '1px solid #e2e8f0',
                  fontSize: '0.78rem',
                  color: '#64748b',
                  textAlign: 'center',
                }}
              >
                Questions or support? Email{' '}
                <a
                  href="mailto:care@ednetlearn.in"
                  style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}
                >
                  care@ednetlearn.in
                </a>{' '}
                ·{' '}
                <a
                  href="mailto:admin@ednetlearn.in"
                  style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}
                >
                  admin@ednetlearn.in
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
