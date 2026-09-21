import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import type { PaymentTransaction } from '../types/auth';
import '../styles/payment-modal.css';

const PaymentModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    closePaymentModal,
    currentUser,
    openAuthModal,
    submitManualUpiPayment,
    upiVpa: storeUpiVpa,
    upiPayeeName: storeUpiPayee,
  } = useAuthStore();

  const [utrNumber, setUtrNumber] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingTxn, setPendingTxn] = useState<PaymentTransaction | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(storeUpiVpa);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
    closePaymentModal();
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

          {trialActive ? (
            <>
              <span className="payment-plan-badge">🎉 Free Trial Active</span>
              <h2 id="payment-modal-title" className="payment-modal-title">
                Your free trial is activated
              </h2>
            </>
          ) : (
            <>
              <span className="payment-plan-badge">🌟 All-Access Monthly Pass</span>
              <h2 id="payment-modal-title" className="payment-modal-title">
                Unlock Full Sanskrit Platform
              </h2>

              <div className="payment-modal-price-row">
                <span className="payment-price-currency">₹200</span>
                <span className="payment-price-period">/ month</span>
              </div>
              <p className="payment-trial-note">
                Includes all 15 CBSE/NCERT Class 7 Chapters, 5,800+ audio glosses, Jodo Puzzles, and Vedic Mathematics!
              </p>
            </>
          )}
        </div>

        {trialActive ? (
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
          /* Short acknowledgment only — no receipt card / Reference ID / PAID UI */
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
          <>
            {!currentUser && (
              <div
                style={{
                  background: '#fef3c7',
                  borderBottom: '1px solid #fde68a',
                  padding: '0.75rem 1.75rem',
                  fontSize: '0.85rem',
                  color: '#92400e',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>ℹ️ Sign in or register to link this subscription to your account.</span>
                <button
                  type="button"
                  onClick={() => {
                    closePaymentModal();
                    openAuthModal('login');
                  }}
                  style={{
                    background: '#92400e',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.2rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Sign In
                </button>
              </div>
            )}

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
                    Pay <strong>₹200</strong> to the UPI ID shown below — on phone: open any UPI
                    app and pay to this UPI ID (or scan the QR); on computer: scan the QR with
                    your phone.
                  </li>
                  <li>
                    Then enter the <strong>12-digit UTR / Ref</strong> from your UPI app.
                  </li>
                  <li>
                    Tap <strong>Submit UTR</strong> — Premium unlocks only after we verify the payment.
                  </li>
                </ol>

                <div className="upi-qr-card">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(
                      `upi://pay?pa=${storeUpiVpa}&pn=${encodeURIComponent(storeUpiPayee)}&am=200.00&cu=INR&tn=Monthly%20Access%20Pass`
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
                    On phone: open any UPI app → Pay to this UPI ID (or scan the QR). On
                    computer: scan the QR with your phone. Premium unlocks after we verify
                    your payment (usually within a few hours).
                  </p>
                </div>

                <div className="upi-id-pill">
                  <span className="upi-id-text">{storeUpiVpa}</span>
                  <button type="button" className="upi-copy-btn" onClick={handleCopyUpi}>
                    {isCopied ? '✓ Copied' : 'Copy VPA'}
                  </button>
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
                      onChange={(e) => setUtrNumber(e.target.value.replace(/[^\d]/g, '').slice(0, 12))}
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
                          utrNumber.trim().length === 12 && !isProcessing ? 'pointer' : 'not-allowed',
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
