import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import type { PaymentTransaction } from '../types/auth';
import {
  RAZORPAY_API_URL,
  RAZORPAY_CTA_LABEL,
  RAZORPAY_TRUST_NOTICE,
  createRazorpayOrder,
  openRazorpayOrderCheckout,
  verifyRazorpayOrder,
} from '../utils/razorpayCheckout';
import '../styles/payment-modal.css';

function buildUpiPayUri(vpa: string, payee: string): string {
  return (
    `upi://pay?pa=${encodeURIComponent(vpa)}` +
    `&pn=${encodeURIComponent(payee)}` +
    `&am=200.00&cu=INR&tn=${encodeURIComponent('EdNet Monthly Access')}`
  );
}

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
    activateRazorpayPayment,
    upiVpa: storeUpiVpa,
    upiPayeeName: storeUpiPayee,
    isAdminLoggedIn,
  } = useAuthStore();

  const [utrNumber, setUtrNumber] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [desktopPayTip, setDesktopPayTip] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingTxn, setPendingTxn] = useState<PaymentTransaction | null>(null);
  const [successTxn, setSuccessTxn] = useState<PaymentTransaction | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [adminPreviewPay, setAdminPreviewPay] = useState(false);
  const [manualUpiOpen, setManualUpiOpen] = useState(false);
  const [razorpayBusy, setRazorpayBusy] = useState(false);

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

  const showTrialGate = trialActive && !(isAdminLoggedIn && adminPreviewPay);
  const isAdminPayPreview = trialActive && isAdminLoggedIn && adminPreviewPay;

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
      window.location.href = buildUpiPayUri(storeUpiVpa, storeUpiPayee);
      return;
    }
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

  const handleRazorpayPay = async () => {
    if (!currentUser) {
      closePaymentModal();
      openAuthModal('register');
      return;
    }
    if (!RAZORPAY_API_URL) {
      setErrorMessage(
        'Razorpay API is not configured yet. Deploy the Worker (or run the local script) and set VITE_RAZORPAY_API_URL.'
      );
      return;
    }
    setErrorMessage(null);
    setRazorpayBusy(true);
    try {
      const order = await createRazorpayOrder({
        userId: currentUser.id,
        email: currentUser.email,
      });
      await openRazorpayOrderCheckout({
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: currentUser.fullName || currentUser.username,
        email: currentUser.email,
        onDismiss: () => setRazorpayBusy(false),
        onSuccess: async (response) => {
          try {
            await verifyRazorpayOrder(response);
            const res = await activateRazorpayPayment({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            });
            setRazorpayBusy(false);
            if (res.success && res.transaction) {
              setSuccessTxn(res.transaction);
            } else {
              setErrorMessage(res.error || 'Could not activate access after verify.');
            }
          } catch (err: unknown) {
            setRazorpayBusy(false);
            setErrorMessage(err instanceof Error ? err.message : 'Verification failed.');
          }
        },
      });
    } catch (err: unknown) {
      setRazorpayBusy(false);
      setErrorMessage(err instanceof Error ? err.message : 'Could not start Razorpay checkout.');
    }
  };

  const handleClose = () => {
    setPendingTxn(null);
    setSuccessTxn(null);
    setErrorMessage(null);
    setIsProcessing(false);
    setDesktopPayTip(false);
    setUtrNumber('');
    setAdminPreviewPay(false);
    setManualUpiOpen(false);
    setRazorpayBusy(false);
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
        <div className="payment-modal-header">
          <button type="button" className="payment-close-btn" onClick={handleClose} aria-label="Close Payment Modal">
            ✕
          </button>
          <div className="payment-modal-brand-row">
            <img src="/logo.jpg" alt="Online Sanskrit and Vedic Math classes for kids | EdNet Learn Gurukul" className="payment-modal-brand-logo" />
            <div>
              <div className="payment-modal-brand-title">EdNet Learn Gurukul</div>
              <div className="payment-modal-brand-sub">CBSE Class 7 Sanskrit &amp; Vedic Mathematics</div>
            </div>
          </div>

          {!currentUser ? (
            <>
              <span className="payment-plan-badge">🆓 Start with a free account</span>
              <h2 id="payment-modal-title" className="payment-modal-title">Create an account first</h2>
            </>
          ) : showTrialGate ? (
            <>
              <span className="payment-plan-badge">🎉 Free Trial Active</span>
              <h2 id="payment-modal-title" className="payment-modal-title">Your free trial is activated</h2>
            </>
          ) : (
            <>
              <span className="payment-plan-badge">
                {isAdminPayPreview ? '🛠 Admin Pay Preview' : '🌟 All-Access Monthly Pass'}
              </span>
              <h2 id="payment-modal-title" className="payment-modal-title">
                {isAdminPayPreview ? 'Preview pay form' : 'Unlock Full Sanskrit Platform'}
              </h2>
              <div className="payment-modal-price-row">
                <span className="payment-price-currency">₹200</span>
                <span className="payment-price-period">/ 30 days</span>
              </div>
              <p className="payment-trial-note">
                {isAdminPayPreview
                  ? 'Admin preview — Razorpay test mode (one-time ₹200, no autopay).'
                  : 'Includes all 15 CBSE/NCERT Class 7 Chapters, 5,800+ audio glosses, Jodo Puzzles, and Vedic Mathematics!'}
              </p>
            </>
          )}
        </div>

        {!currentUser ? (
          <div className="payment-modal-body">
            <div className="payment-success-box" style={{ padding: '1.5rem 1.75rem' }}>
              <div className="payment-success-icon" style={{ background: '#fef3c7', color: '#b45309' }}>👤</div>
              <h3 className="payment-success-title">Account required</h3>
              <p className="payment-success-sub" style={{ maxWidth: '28rem', margin: '0 auto' }}>
                Please create a free account first. You get a 14-day free trial. After you sign up,
                you can pay ₹200 once via Razorpay when needed.
              </p>
              <div style={{ marginTop: '1.35rem', display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'center' }}>
                <button type="button" className="receipt-done-btn" onClick={goRegister}
                  style={{ background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.35rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                  Create free account
                </button>
                <button type="button" onClick={goLogin}
                  style={{ background: '#fff', color: '#273b35', border: '2px solid #273b35', borderRadius: '8px', padding: '0.65rem 1.25rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                  Sign in
                </button>
              </div>
            </div>
          </div>
        ) : showTrialGate ? (
          <div className="payment-modal-body">
            <div className="payment-success-box" style={{ padding: '1.5rem 1.75rem' }}>
              <div className="payment-success-icon" style={{ background: '#fef3c7', color: '#b45309' }}>✨</div>
              <h3 className="payment-success-title">Enjoy your free trial</h3>
              <p className="payment-success-sub" style={{ maxWidth: '28rem', margin: '0 auto' }}>
                Your free trial is active until <strong>{trialEndsFormatted}</strong>. Enjoy learning —
                you can pay ₹200 once via Razorpay when the trial ends.
              </p>
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <button type="button" className="receipt-done-btn" onClick={handleClose}
                  style={{ background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.65rem 1.4rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                  Continue Learning
                </button>
              </div>
              {isAdminLoggedIn && (
                <div style={{ marginTop: '1.35rem', paddingTop: '1rem', borderTop: '1px dashed #e2e8f0', textAlign: 'center' }}>
                  <button type="button" onClick={() => setAdminPreviewPay(true)}
                    style={{ background: '#fff', color: '#0f766e', border: '1.5px solid #0f766e', borderRadius: '8px', padding: '0.5rem 0.95rem', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
                    Admin: preview pay form
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : isProcessing || razorpayBusy ? (
          <div className="payment-processing-box">
            <div className="payment-spinner" />
            <h3 className="payment-processing-text">
              {razorpayBusy ? 'Opening Razorpay Checkout…' : 'Submitting your UTR…'}
            </h3>
            <p className="payment-processing-sub">
              {razorpayBusy
                ? 'Complete the one-time ₹200 payment in the Razorpay window. We activate access only after signature verify.'
                : 'Please wait while we record your payment reference for verification.'}
            </p>
          </div>
        ) : successTxn ? (
          <div className="payment-modal-body">
            <div className="payment-success-box" style={{ padding: '1.5rem 1.75rem' }}>
              <div className="payment-success-icon" style={{ background: '#d1fae5', color: '#047857' }}>✓</div>
              <h3 className="payment-success-title">Access activated · 30 days</h3>
              <p className="payment-success-sub" style={{ maxWidth: '28rem', margin: '0 auto' }}>
                Razorpay verified your one-time payment. Your All-Access pass is active for 30 days.
              </p>
              <p style={{ margin: '0.75rem auto 0', maxWidth: '26rem', fontSize: '0.8rem', color: '#64748b', wordBreak: 'break-all' }}>
                Payment: <strong>{successTxn.razorpayPaymentId}</strong>
                <br />
                Order: <strong>{successTxn.razorpayOrderId}</strong>
              </p>
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <button type="button" className="receipt-done-btn" onClick={handleClose}>Continue Learning</button>
              </div>
            </div>
          </div>
        ) : pendingTxn ? (
          <div className="payment-modal-body">
            <div className="payment-success-box" style={{ padding: '1.5rem 1.75rem' }}>
              <div className="payment-success-icon" style={{ background: '#fef3c7', color: '#b45309' }}>⏳</div>
              <h3 className="payment-success-title">UTR recorded</h3>
              <p className="payment-success-sub" style={{ maxWidth: '28rem', margin: '0 auto' }}>
                Thanks — we recorded your UTR and will unlock access after verifying your UPI payment.
              </p>
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <button type="button" className="receipt-done-btn" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {errorMessage && (
              <div style={{ background: '#fee2e2', borderBottom: '1px solid #fca5a5', padding: '0.65rem 1.75rem', fontSize: '0.85rem', color: '#991b1b', fontWeight: 600 }}>
                {errorMessage}
              </div>
            )}
            {isAdminPayPreview && (
              <div style={{ padding: '0.65rem 1.75rem', borderBottom: '1px solid #fcd34d', fontSize: '0.8rem', fontWeight: 700, color: '#92400e', background: '#fffbeb', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span>Admin preview — Razorpay test mode (one-time, no autopay).</span>
                <button type="button" onClick={() => setAdminPreviewPay(false)}
                  style={{ background: 'transparent', border: '1px solid #d97706', color: '#92400e', borderRadius: '6px', padding: '0.25rem 0.6rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                  Hide preview
                </button>
              </div>
            )}

            <div className="payment-modal-body">
              <div style={{ padding: '0.25rem 0 1rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
                  <button type="button" onClick={handleRazorpayPay} disabled={razorpayBusy}
                    style={{ background: 'linear-gradient(135deg, #273b35 0%, #1a2924 100%)', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.85rem 1.4rem', fontWeight: 700, fontSize: '0.95rem', cursor: razorpayBusy ? 'wait' : 'pointer', boxShadow: '0 4px 14px rgba(39, 59, 53, 0.28)', opacity: razorpayBusy ? 0.75 : 1 }}>
                    {RAZORPAY_CTA_LABEL}
                  </button>
                  <p style={{ margin: 0, flex: '1 1 14rem', maxWidth: '22rem', fontSize: '0.78rem', color: '#475569', lineHeight: 1.45, fontWeight: 600 }}>
                    {RAZORPAY_TRUST_NOTICE}
                  </p>
                </div>
                <p style={{ margin: '0.75rem 0 0', textAlign: 'center', fontSize: '0.72rem', color: '#94a3b8' }}>
                  UPI · Cards · Netbanking via Razorpay (mobile opens UPI apps automatically). No auto-debit.
                </p>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
                <button type="button" onClick={() => setManualUpiOpen((v) => !v)} aria-expanded={manualUpiOpen}
                  style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem 0.9rem', fontWeight: 700, fontSize: '0.82rem', color: '#334155', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Pay by UPI ID / QR (manual verify)</span>
                  <span aria-hidden>{manualUpiOpen ? '▲' : '▼'}</span>
                </button>

                {manualUpiOpen && (
                  <div className="upi-box" style={{ marginTop: '0.85rem' }}>
                    <div className="upi-qr-card">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(buildUpiPayUri(storeUpiVpa, storeUpiPayee))}`}
                        alt={`Scan to pay ₹200 via UPI to ${storeUpiVpa}`}
                        style={{ width: '160px', height: '160px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', padding: '6px', display: 'block', margin: '0 auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                      />
                      <span className="upi-qr-caption">Scan this QR with your phone&apos;s UPI app</span>
                    </div>
                    <div className="upi-id-pill">
                      <span className="upi-id-text">{storeUpiVpa}</span>
                      <button type="button" className="upi-copy-btn" onClick={handleCopyUpi}>{isCopied ? '✓ Copied' : 'Copy VPA'}</button>
                    </div>
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                      <button type="button" onClick={handleSmartPay}
                        style={{ width: '100%', maxWidth: '22rem', background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.75rem 1.1rem', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer' }}>
                        Pay ₹200 with UPI app
                      </button>
                      {desktopPayTip && (
                        <p role="status" style={{ margin: '0.75rem auto 0', maxWidth: '24rem', padding: '0.65rem 0.85rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', fontSize: '0.82rem', color: '#065f46', lineHeight: 1.45, textAlign: 'left' }}>
                          UPI ID copied. Open GPay / PhonePe / any UPI app → Pay ₹200 to <strong>{storeUpiVpa}</strong>. Then paste the UTR below.
                        </p>
                      )}
                    </div>
                    <div className="upi-input-wrap" style={{ marginTop: '1.1rem' }}>
                      <label htmlFor="upi-utr-input" className="upi-input-label">Enter your 12-digit UPI UTR / Ref Number:</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input id="upi-utr-input" type="text" inputMode="numeric" maxLength={12} className="upi-input-field" placeholder="e.g. 425619874521"
                          value={utrNumber} onChange={(e) => setUtrNumber(e.target.value.replace(/[^\d]/g, '').slice(0, 12))} />
                        <button type="button" onClick={handleSubmitUtr} disabled={utrNumber.trim().length !== 12 || isProcessing}
                          style={{ background: '#273b35', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontWeight: 700, fontSize: '0.82rem', cursor: utrNumber.trim().length === 12 && !isProcessing ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap', opacity: utrNumber.trim().length === 12 && !isProcessing ? 1 : 0.6 }}>
                          Submit UTR
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ padding: '0.85rem 0 0', marginTop: '1rem', borderTop: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#64748b', textAlign: 'center' }}>
                Questions?{' '}
                <a href="mailto:care@ednetlearn.in" style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}>care@ednetlearn.in</a>
                {' · '}
                <a href="mailto:admin@ednetlearn.in" style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}>admin@ednetlearn.in</a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
