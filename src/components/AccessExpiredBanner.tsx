import React from 'react';
import { useAuthStore } from '../store/authStore';

/**
 * Clear alert when paid access (or post-trial) has ended.
 * Shown on login / session restore / dashboard open via authStore flags.
 */
const AccessExpiredBanner: React.FC = () => {
  const {
    showAccessExpiredAlert,
    accessExpiredOn,
    dismissAccessExpiredAlert,
    openPaymentModal,
    currentUser,
  } = useAuthStore();

  if (!showAccessExpiredAlert || !currentUser || currentUser.planStatus !== 'expired') {
    return null;
  }

  const dateLabel =
    typeof accessExpiredOn === 'number'
      ? new Date(accessExpiredOn).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : 'recently';

  return (
    <div
      role="alertdialog"
      aria-labelledby="access-expired-title"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
        color: '#fff',
        padding: '0.85rem 1rem',
        boxShadow: '0 4px 16px rgba(127, 29, 29, 0.35)',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.75rem 1rem',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: '1 1 16rem' }}>
          <div id="access-expired-title" style={{ fontWeight: 800, fontSize: '0.95rem' }}>
            Your access ended on {dateLabel}
          </div>
          <div style={{ fontSize: '0.82rem', opacity: 0.95, marginTop: '0.2rem', fontWeight: 600 }}>
            Pay ₹200 once to continue. No auto-debit.
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => {
              dismissAccessExpiredAlert();
              openPaymentModal();
            }}
            style={{
              background: '#fff',
              color: '#7f1d1d',
              border: 'none',
              borderRadius: '8px',
              padding: '0.55rem 1rem',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            🔒 Pay ₹200 with Razorpay
          </button>
          <button
            type="button"
            onClick={dismissAccessExpiredAlert}
            aria-label="Dismiss"
            style={{
              background: 'transparent',
              color: '#fecaca',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              padding: '0.45rem 0.75rem',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessExpiredBanner;
