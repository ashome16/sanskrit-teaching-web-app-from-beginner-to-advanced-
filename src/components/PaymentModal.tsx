import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import type { PaymentMethod, PaymentTransaction } from '../types/auth';
import '../styles/payment-modal.css';

const PaymentModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    closePaymentModal,
    currentUser,
    openAuthModal,
    processPayment,
    submitManualUpiPayment,
    upiVpa: storeUpiVpa,
    upiPayeeName: storeUpiPayee,
  } = useAuthStore();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [upiVpa, setUpiVpa] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTxn, setCompletedTxn] = useState<PaymentTransaction | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isPaymentModalOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(storeUpiVpa);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePay = async (method: PaymentMethod, vpa?: string) => {
    if (!currentUser) {
      closePaymentModal();
      openAuthModal('login');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await processPayment(method, vpa || upiVpa);
      setIsProcessing(false);
      if (res.success && res.transaction) {
        setCompletedTxn(res.transaction);
      } else {
        setErrorMessage(res.error || 'Payment could not be completed. Please try again.');
      }
    } catch {
      setIsProcessing(false);
      setErrorMessage('Network error while processing payment. Please try again.');
    }
  };

  const handleSubmitUtr = async () => {
    if (!utrNumber.trim()) return;
    if (!currentUser) {
      closePaymentModal();
      openAuthModal('login');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await submitManualUpiPayment(utrNumber.trim(), upiVpa || storeUpiVpa);
      setIsProcessing(false);
      if (res.success && res.transaction) {
        setCompletedTxn(res.transaction);
      } else {
        setErrorMessage(res.error || 'Could not record UTR. Please try again.');
      }
    } catch {
      setIsProcessing(false);
      setErrorMessage('Network error while saving UTR. Please try again.');
    }
  };

  const handleClose = () => {
    setCompletedTxn(null);
    setErrorMessage(null);
    setIsProcessing(false);
    closePaymentModal();
  };

  const handlePrint = () => {
    window.print();
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
        </div>

        {/* Processing State */}
        {isProcessing ? (
          <div className="payment-processing-box">
            <div className="payment-spinner" />
            <h3 className="payment-processing-text">
              {selectedMethod === 'upi' && 'Verifying UPI Transaction...'}
              {selectedMethod === 'apple_pay' && 'Authorizing with Apple Pay...'}
              {selectedMethod === 'gpay' && 'Connecting to Google Pay...'}
              {selectedMethod === 'card' && 'Securing Card Transaction...'}
            </h3>
            <p className="payment-processing-sub">
              Please do not close this window. Confirming with payment gateway...
            </p>
          </div>
        ) : completedTxn ? (
          /* Receipt & Success State */
          <div className="payment-modal-body">
            <div className="payment-success-box">
              <div className="payment-success-icon" style={completedTxn.status === 'pending' ? { background: '#fef3c7', color: '#b45309' } : undefined}>
                {completedTxn.status === 'pending' ? '⏳' : '✓'}
              </div>
              <h3 className="payment-success-title">
                {completedTxn.status === 'pending' ? 'UTR Submitted for Verification!' : 'Payment Successful!'}
              </h3>
              <p className="payment-success-sub">
                {completedTxn.status === 'pending'
                  ? 'Your transaction has been submitted to the administration desk. You will receive active access once verified.'
                  : 'Your monthly subscription is now active. Thank you for learning Sanskrit!'}
              </p>

              <div className="payment-receipt-card">
                <div className="receipt-row">
                  <span className="receipt-label">Receipt / Order ID</span>
                  <span className="receipt-val">{completedTxn.id}</span>
                </div>
                {completedTxn.utrNumber && (
                  <div className="receipt-row">
                    <span className="receipt-label">UPI UTR / Ref Number</span>
                    <span className="receipt-val" style={{ fontWeight: 700, color: '#1f2937' }}>
                      {completedTxn.utrNumber}
                    </span>
                  </div>
                )}
                <div className="receipt-row">
                  <span className="receipt-label">Amount Paid</span>
                  <span className="receipt-val">₹{completedTxn.amountInr}.00</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Payment Method</span>
                  <span className="receipt-val" style={{ textTransform: 'uppercase' }}>
                    {completedTxn.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
                {completedTxn.upiId && (
                  <div className="receipt-row">
                    <span className="receipt-label">UPI VPA</span>
                    <span className="receipt-val">{completedTxn.upiId}</span>
                  </div>
                )}
                <div className="receipt-row">
                  <span className="receipt-label">Date &amp; Time</span>
                  <span className="receipt-val">
                    {new Date(completedTxn.timestamp).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Access Validity</span>
                  <span className="receipt-val" style={{ color: '#15803d' }}>
                    Active for 30 Days (Until{' '}
                    {new Date(completedTxn.timestamp + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(
                      'en-IN',
                      { dateStyle: 'medium' }
                    )}
                    )
                  </span>
                </div>
              </div>

              <div className="payment-receipt-actions">
                <button
                  type="button"
                  className="receipt-print-btn"
                  onClick={handlePrint}
                >
                  🖨️ Print Receipt
                </button>
                <button
                  type="button"
                  className="receipt-done-btn"
                  onClick={handleClose}
                >
                  Continue Learning ➔
                </button>
              </div>

              <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.78rem', color: '#6b7280', borderTop: '1px solid #f3f4f6', paddingTop: '0.75rem' }}>
                Need invoice or payment assistance? Email <a href="mailto:care@ednetlearn.in" style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}>care@ednetlearn.in</a> or <a href="mailto:admin@ednetlearn.in" style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}>admin@ednetlearn.in</a>
              </div>
            </div>
          </div>
        ) : (
          /* Payment Methods & Flow */
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

            {/* Payment Method Selector Tabs */}
            <div className="payment-methods-grid">
              <button
                type="button"
                className={`payment-method-tab${selectedMethod === 'upi' ? ' active' : ''}`}
                onClick={() => setSelectedMethod('upi')}
              >
                <span className="pm-tab-icon">📱</span>
                <span className="pm-tab-label">UPI / QR</span>
              </button>

              <button
                type="button"
                className={`payment-method-tab${selectedMethod === 'apple_pay' ? ' active' : ''}`}
                onClick={() => setSelectedMethod('apple_pay')}
              >
                <span className="pm-tab-icon">🍏</span>
                <span className="pm-tab-label">Apple Pay</span>
              </button>

              <button
                type="button"
                className={`payment-method-tab${selectedMethod === 'gpay' ? ' active' : ''}`}
                onClick={() => setSelectedMethod('gpay')}
              >
                <span className="pm-tab-icon">🌐</span>
                <span className="pm-tab-label">Google Pay</span>
              </button>
            </div>

            {/* Payment Body Content */}
            <div className="payment-modal-body">
              {/* UPI Tab */}
              {selectedMethod === 'upi' && (
                <div className="upi-box">
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
                    <span className="upi-qr-caption">Scan with Any UPI App (GPay, PhonePe, Paytm, BHIM)</span>
                  </div>

                  <div className="upi-id-pill">
                    <span className="upi-id-text">{storeUpiVpa}</span>
                    <button
                      type="button"
                      className="upi-copy-btn"
                      onClick={handleCopyUpi}
                    >
                      {isCopied ? '✓ Copied' : 'Copy VPA'}
                    </button>
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '0.4rem' }}>
                    <a
                      href={`upi://pay?pa=${encodeURIComponent(storeUpiVpa)}&pn=${encodeURIComponent(storeUpiPayee)}&am=200.00&cu=INR&tn=Monthly%20Access%20Pass`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
                        color: '#ffffff',
                        padding: '0.45rem 0.95rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 2px 6px rgba(21, 128, 61, 0.25)',
                      }}
                    >
                      <span>⚡</span>
                      <span>Open in GPay / PhonePe / Paytm</span>
                    </a>
                  </div>

                  <div className="upi-apps-row">
                    <span className="upi-app-badge">GPay</span>
                    <span className="upi-app-badge">PhonePe</span>
                    <span className="upi-app-badge">Paytm</span>
                    <span className="upi-app-badge">BHIM</span>
                    <span className="upi-app-badge">Cred</span>
                  </div>

                  <div className="upi-input-wrap">
                    <label htmlFor="upi-vpa-input" className="upi-input-label">
                      Or enter your personal UPI ID / VPA:
                    </label>
                    <input
                      id="upi-vpa-input"
                      type="text"
                      className="upi-input-field"
                      placeholder="e.g. yourname@okhdfcbank"
                      value={upiVpa}
                      onChange={(e) => setUpiVpa(e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    className="payment-primary-btn"
                    onClick={() => handlePay('upi', upiVpa || storeUpiVpa)}
                  >
                    <span>⚡</span>
                    <span>Verify &amp; Pay ₹200 via UPI</span>
                  </button>

                  <div style={{ margin: '1.25rem 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em' }}>
                      OR MANUAL UTR CONFIRMATION
                    </span>
                    <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                  </div>

                  <div className="upi-input-wrap">
                    <label htmlFor="upi-utr-input" className="upi-input-label">
                      Paid already? Enter 12-digit UPI UTR / Ref Number:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        id="upi-utr-input"
                        type="text"
                        className="upi-input-field"
                        placeholder="e.g. 425619874521"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={handleSubmitUtr}
                        disabled={!utrNumber.trim() || isProcessing}
                        style={{
                          background: '#273b35',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.5rem 1rem',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: utrNumber.trim() && !isProcessing ? 'pointer' : 'not-allowed',
                          whiteSpace: 'nowrap',
                          opacity: utrNumber.trim() && !isProcessing ? 1 : 0.6,
                        }}
                      >
                        Submit UTR
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Apple Pay Tab */}
              {selectedMethod === 'apple_pay' && (
                <div className="apple-pay-container">
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '3rem' }}>🍏</span>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: '0.5rem 0 0.25rem 0' }}>
                      Apple Pay Direct Checkout
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                      Enjoy seamless, private, and secure 1-click subscription with Touch ID, Face ID, or your Apple Watch.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="apple-pay-btn"
                    onClick={() => handlePay('apple_pay')}
                  >
                    <span> Pay</span>
                    <span>₹200.00</span>
                  </button>

                  <div className="apple-pay-features">
                    🔒 Protected by Secure Enclave · No card numbers shared
                  </div>
                </div>
              )}

              {/* Google Pay Tab */}
              {selectedMethod === 'gpay' && (
                <div className="gpay-container">
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '3rem' }}>🌐</span>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: '0.5rem 0 0.25rem 0' }}>
                      Google Pay Instant Checkout
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                      Fast, simple checkout using the payment cards and UPI handles saved in your Google Account.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="gpay-btn"
                    onClick={() => handlePay('gpay')}
                  >
                    <span style={{ color: '#4285f4', fontWeight: 900 }}>G</span>
                    <span style={{ color: '#ea4335', fontWeight: 900 }}>o</span>
                    <span style={{ color: '#fbbc05', fontWeight: 900 }}>o</span>
                    <span style={{ color: '#4285f4', fontWeight: 900 }}>g</span>
                    <span style={{ color: '#34a853', fontWeight: 900 }}>l</span>
                    <span style={{ color: '#ea4335', fontWeight: 900 }}>e</span>
                    <span style={{ color: '#5f6368', marginLeft: '3px' }}>Pay · ₹200</span>
                  </button>

                  <div style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#6b7280' }}>
                    🛡️ Multi-layer security with tokenized device verification
                  </div>
                </div>
              )}

              {/* Customer Support Notice */}
              <div style={{ padding: '0.85rem 1.75rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#64748b', textAlign: 'center' }}>
                Questions or support? Email <a href="mailto:care@ednetlearn.in" style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}>care@ednetlearn.in</a> · <a href="mailto:admin@ednetlearn.in" style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}>admin@ednetlearn.in</a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
