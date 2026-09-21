import React, { useState } from 'react';
import { useAuthStore, DEFAULT_AVATARS, SANSKRIT_INTERESTS_LIST } from '../store/authStore';
import { useAppStore } from '../store';
import type { SanskritGrade } from '../types/auth';
import '../styles/auth-modal.css';

const GRADES_LIST: SanskritGrade[] = [
  'Beginner (प्रवेशः)',
  'Class 6 (दीपकम-६)',
  'Class 7 (दीपकम-७)',
  'Class 8 (दीपकम-८)',
  'Intermediate (परिचयः)',
  'Advanced (कोविदः)',
  'Enthusiast / Self-Learner',
];

const UserProfileModal: React.FC = () => {
  const {
    currentUser,
    isProfileModalOpen,
    closeProfileModal,
    openPaymentModal,
    logout,
    updateProfile,
    deleteProfile,
    getTrialDaysRemaining,
  } = useAuthStore();

  const { progress } = useAppStore();

  const [mode, setMode] = useState<'view' | 'edit' | 'delete'>('view');

  // Edit form state
  const [editFullName, setEditFullName] = useState(currentUser?.fullName || '');
  const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || DEFAULT_AVATARS[0]);
  const [editGrade, setEditGrade] = useState<SanskritGrade>(currentUser?.grade || 'Class 7 (दीपकम-७)');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [editInterests, setEditInterests] = useState<string[]>(currentUser?.interests || []);
  const [editMessage, setEditMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Delete form state
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  if (!isProfileModalOpen || !currentUser) return null;

  const trialDaysLeft = getTrialDaysRemaining();

  const handleStartEdit = () => {
    setEditFullName(currentUser.fullName);
    setEditAvatar(currentUser.avatar);
    setEditGrade(currentUser.grade);
    setEditEmail(currentUser.email);
    setEditInterests(currentUser.interests || []);
    setEditMessage(null);
    setMode('edit');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMessage(null);
    const result = updateProfile({
      fullName: editFullName,
      avatar: editAvatar,
      grade: editGrade,
      email: editEmail,
      interests: editInterests,
    });

    if (result.success) {
      setEditMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => {
        setMode('view');
        setEditMessage(null);
      }, 900);
    } else {
      setEditMessage({ type: 'error', text: result.error || 'Failed to update profile.' });
    }
  };

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError(null);
    const result = deleteProfile(deletePassword);
    if (!result.success) {
      setDeleteError(result.error || 'Incorrect password.');
    }
  };

  const toggleInterest = (interest: string) => {
    setEditInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="auth-modal-overlay" onClick={closeProfileModal}>
      <div className="auth-modal-card profile-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="auth-modal-close-btn"
          onClick={closeProfileModal}
          aria-label="Close profile modal"
        >
          ✕
        </button>

        {mode === 'view' && (
          <>
            {/* Gurukul Brand Crest */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <img src="/logo.jpg" alt="EdNet Learn Gurukul" style={{ width: '38px', height: '38px', borderRadius: '8px', border: '1.5px solid #d8ceba', objectFit: 'cover' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#7f231c', lineHeight: 1.1 }}>EdNet Learn Gurukul</div>
                <div style={{ fontSize: '0.72rem', color: '#b45309', fontWeight: 600 }}>CBSE Class 7 Sanskrit &amp; Vedic Studies</div>
              </div>
            </div>

            {/* Profile Hero Header */}
            <div className="profile-hero">
              <div className="profile-avatar-large">{currentUser.avatar}</div>
              <h2 className="profile-full-name">{currentUser.fullName}</h2>
              <div className="profile-username">@{currentUser.username}</div>
              <span className="profile-badge">{currentUser.grade}</span>
            </div>

            {/* Learning Stats */}
            <div className="profile-stats-grid">
              <div className="profile-stat-box">
                <div className="profile-stat-val">🔥 {progress.streak}</div>
                <div className="profile-stat-label">Day Streak</div>
              </div>
              <div className="profile-stat-box">
                <div className="profile-stat-val">📚 {progress.lessonsCompleted.length}</div>
                <div className="profile-stat-label">Lessons Done</div>
              </div>
              <div className="profile-stat-box">
                <div className="profile-stat-val">⭐ {progress.totalPoints}</div>
                <div className="profile-stat-label">Total Points</div>
              </div>
            </div>

            {/* Membership & Subscription Card */}
            <div className="profile-membership-card">
              <div className="profile-membership-header">
                <h3 className="profile-membership-title">
                  {currentUser.planStatus === 'active'
                    ? '🌟 Active Subscription'
                    : currentUser.planStatus === 'trial'
                    ? '🎉 2 Weeks Free Access Active'
                    : '⚠️ Subscription Expired'}
                </h3>
                <span
                  className="profile-membership-tag"
                  style={{
                    background:
                      currentUser.planStatus === 'active'
                        ? '#dcfce7'
                        : currentUser.planStatus === 'trial'
                        ? '#fef3c7'
                        : '#fee2e2',
                    color:
                      currentUser.planStatus === 'active'
                        ? '#15803d'
                        : currentUser.planStatus === 'trial'
                        ? '#92400e'
                        : '#b91c1c',
                  }}
                >
                  {currentUser.planStatus === 'active'
                    ? 'Paid Active'
                    : currentUser.planStatus === 'trial'
                    ? `${trialDaysLeft} Days Left`
                    : 'Expired'}
                </span>
              </div>
              <p className="profile-membership-desc">
                {currentUser.planStatus === 'active'
                  ? `Your all-access monthly plan is active. Renews on ${
                      currentUser.subscriptionRenewsAt
                        ? new Date(currentUser.subscriptionRenewsAt).toLocaleDateString('en-IN', {
                            dateStyle: 'medium',
                          })
                        : 'next month'
                    }.`
                  : currentUser.planStatus === 'trial'
                  ? `Your 14-day free access is active. Enjoy unlimited access to all 15 Deepakam chapters, interactive audio exercises, and Jodo puzzles.`
                  : `Your trial has expired. Subscribe to regain full access to all 15 chapters and interactive audio features.`}
              </p>
              <div className="profile-membership-price">
                Plan: ₹200 / month · Pay via <strong>UPI / QR</strong>
              </div>

              <div style={{ marginTop: '0.9rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    closeProfileModal();
                    openPaymentModal();
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.55rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 2px 8px rgba(180, 83, 9, 0.25)',
                  }}
                >
                  <span>💳</span>
                  <span>
                    {currentUser.planStatus === 'active'
                      ? 'Renew / Pay with UPI'
                      : 'Subscribe Now for ₹200 / mo (UPI)'}
                  </span>
                </button>
              </div>

              {/* Past Transactions list if available */}
              {currentUser.transactions && currentUser.transactions.length > 0 && (
                <div style={{ marginTop: '1rem', borderTop: '1px dashed #d97706', paddingTop: '0.75rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#92400e', marginBottom: '0.35rem' }}>
                    Recent Payments:
                  </div>
                  {currentUser.transactions.slice(0, 3).map((txn) => (
                    <div
                      key={txn.id}
                      style={{
                        fontSize: '0.75rem',
                        color: '#4b5563',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.2rem 0',
                      }}
                    >
                      <span>
                        ₹{txn.amountInr} via {txn.paymentMethod.toUpperCase()} ({new Date(txn.timestamp).toLocaleDateString()})
                      </span>
                      <span style={{ color: '#15803d', fontWeight: 700 }}>✓ PAID ({txn.id})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="profile-actions">
              <button
                type="button"
                className="profile-btn-edit"
                onClick={handleStartEdit}
              >
                ✏️ Edit Profile
              </button>

              <button
                type="button"
                className="profile-btn-logout"
                onClick={logout}
              >
                🚪 Log Out
              </button>
            </div>

            {/* Danger Zone */}
            <div className="profile-danger-zone">
              <div className="profile-danger-title">Danger Zone</div>
              <p className="profile-danger-desc">
                Once deleted, your profile, learning streak, and completed lessons will be permanently wiped.
              </p>
              <button
                type="button"
                className="profile-btn-delete"
                onClick={() => {
                  setDeletePassword('');
                  setDeleteError(null);
                  setMode('delete');
                }}
              >
                🗑️ Delete Profile &amp; Account
              </button>
            </div>

              {/* Customer Support Info */}
              <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: '#fdfaf3', borderRadius: '10px', border: '1px solid #ebdcc5', fontSize: '0.76rem', color: '#6b5e50', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#7f231c', marginBottom: '0.2rem' }}>EdNet Learn Gurukul Support</div>
                <div>Learner Care: <a href="mailto:care@ednetlearn.in" style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}>care@ednetlearn.in</a></div>
                <div>Administration: <a href="mailto:admin@ednetlearn.in" style={{ color: '#b3472f', fontWeight: 700, textDecoration: 'none' }}>admin@ednetlearn.in</a></div>
              </div>
          </>
        )}

        {mode === 'edit' && (
          <form className="auth-form" onSubmit={handleSaveEdit}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#1f1a14', fontSize: '1.25rem', fontWeight: 800 }}>
              Edit Profile (विवरण-संशोधनम्)
            </h3>

            {editMessage && (
              <div className={editMessage.type === 'success' ? 'auth-alert-success' : 'auth-alert-error'}>
                {editMessage.type === 'success' ? '✓' : '⚠️'} {editMessage.text}
              </div>
            )}

            {/* Avatar picker */}
            <div className="auth-form-group">
              <label className="auth-label">Change Avatar</label>
              <div className="avatar-picker-grid">
                {DEFAULT_AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    className={`avatar-picker-btn${editAvatar === av ? ' avatar-picker-btn--selected' : ''}`}
                    onClick={() => setEditAvatar(av)}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="edit-fullname">
                Full Name
              </label>
              <input
                id="edit-fullname"
                type="text"
                className="auth-input"
                value={editFullName}
                onChange={(e) => setEditFullName(e.target.value)}
                required
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="edit-email">
                Email Address
              </label>
              <input
                id="edit-email"
                type="email"
                className="auth-input"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="edit-grade">
                Learning Grade / Level
              </label>
              <select
                id="edit-grade"
                className="auth-select"
                value={editGrade}
                onChange={(e) => setEditGrade(e.target.value as SanskritGrade)}
              >
                {GRADES_LIST.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Interests</label>
              <div className="interests-grid">
                {SANSKRIT_INTERESTS_LIST.map((interest) => (
                  <label key={interest} className="interest-checkbox-label">
                    <input
                      type="checkbox"
                      checked={editInterests.includes(interest)}
                      onChange={() => toggleInterest(interest)}
                    />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="submit" className="auth-submit-btn" style={{ flex: 1 }}>
                Save Changes
              </button>
              <button
                type="button"
                className="profile-btn-logout"
                style={{ flex: 1 }}
                onClick={() => setMode('view')}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {mode === 'delete' && (
          <form className="auth-form" onSubmit={handleDeleteAccount}>
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '3rem' }}>⚠️</span>
              <h3 style={{ margin: '0.5rem 0 0.25rem', color: '#dc2626', fontSize: '1.25rem', fontWeight: 800 }}>
                Confirm Account Deletion
              </h3>
              <p style={{ color: '#6b5e50', fontSize: '0.88rem', margin: 0 }}>
                Are you sure you want to permanently delete your account (@{currentUser.username})? This action cannot be undone.
              </p>
            </div>

            {deleteError && (
              <div className="auth-alert-error">
                <span>⚠️</span> {deleteError}
              </div>
            )}

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="delete-password">
                Enter your password to confirm:
              </label>
              <input
                id="delete-password"
                type="password"
                className="auth-input"
                placeholder="Your password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="profile-btn-delete"
              style={{ padding: '0.75rem 1rem', fontSize: '0.98rem' }}
            >
              Permanently Delete Account
            </button>

            <button
              type="button"
              className="profile-btn-logout"
              onClick={() => setMode('view')}
            >
              Cancel & Keep Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfileModal;
