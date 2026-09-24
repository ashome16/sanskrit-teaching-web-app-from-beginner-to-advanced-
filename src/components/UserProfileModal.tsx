import React, { useState } from 'react';
import {
  useAuthStore,
  DEFAULT_AVATARS,
  SANSKRIT_INTERESTS_LIST,
  getStoredRememberedCredentials,
  removeStoredRememberedCredentials,
  setStoredRememberedCredentials,
} from '../store/authStore';
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
    accounts,
    isProfileModalOpen,
    closeProfileModal,
    openPaymentModal,
    logout,
    updateProfile,
    changePassword,
    deleteProfile,
    getTrialDaysRemaining,
    isAdminLoggedIn,
    setUserPlanStatus,
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

  // Security & Password state
  const checkIsRemembered = () => {
    const creds = getStoredRememberedCredentials();
    if (!creds || !currentUser) return false;
    return (
      creds.identifier.toLowerCase() === currentUser.username.toLowerCase() ||
      creds.identifier.toLowerCase() === currentUser.email.toLowerCase()
    );
  };

  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [updateSavedOnDevice, setUpdateSavedOnDevice] = useState(true);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isRememberedOnDevice, setIsRememberedOnDevice] = useState(checkIsRemembered);
  const [deviceSaveMessage, setDeviceSaveMessage] = useState<string | null>(null);
  const [quickSavePassword, setQuickSavePassword] = useState('');
  const [isPromptingQuickSave, setIsPromptingQuickSave] = useState(false);

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

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeMessage(null);

    if (newPasswordInput.trim().length < 4) {
      setPasswordChangeMessage({ type: 'error', text: 'New password must be at least 4 characters long.' });
      return;
    }

    if (newPasswordInput !== confirmNewPasswordInput) {
      setPasswordChangeMessage({ type: 'error', text: 'New passwords do not match. Please re-enter.' });
      return;
    }

    const res = changePassword(currentPasswordInput, newPasswordInput);
    if (res.success) {
      if (updateSavedOnDevice) {
        setStoredRememberedCredentials(currentUser.username, newPasswordInput);
        setIsRememberedOnDevice(true);
        if (typeof window !== 'undefined' && 'PasswordCredential' in window && (navigator.credentials as any)?.store) {
          try {
            const cred = new (window as any).PasswordCredential({
              id: currentUser.username,
              password: newPasswordInput,
              name: (currentUser.fullName || currentUser.username).trim(),
            });
            (navigator.credentials as any).store(cred);
          } catch {}
        }
      }
      setPasswordChangeMessage({ type: 'success', text: 'Password successfully changed and updated! 💾' });
      setCurrentPasswordInput('');
      setNewPasswordInput('');
      setConfirmNewPasswordInput('');
      setTimeout(() => {
        setIsPasswordSectionOpen(false);
        setPasswordChangeMessage(null);
      }, 2000);
    } else {
      setPasswordChangeMessage({ type: 'error', text: res.error || 'Failed to update password.' });
    }
  };

  const handleClearSavedPasswordOnDevice = () => {
    removeStoredRememberedCredentials();
    setIsRememberedOnDevice(false);
    setDeviceSaveMessage('Saved login credentials removed from this browser.');
    setTimeout(() => setDeviceSaveMessage(null), 3000);
  };

  const handleSavePasswordOnDevice = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const userAcc = accounts[currentUser.id];
    const passToSave = quickSavePassword || userAcc?.passwordHash;
    if (!passToSave) {
      setIsPromptingQuickSave(true);
      return;
    }
    setStoredRememberedCredentials(currentUser.username, passToSave);
    setIsRememberedOnDevice(true);
    setIsPromptingQuickSave(false);
    setQuickSavePassword('');
    setDeviceSaveMessage('Password saved to this browser for 1-click login! 💾');

    if (typeof window !== 'undefined' && 'PasswordCredential' in window && (navigator.credentials as any)?.store) {
      try {
        const cred = new (window as any).PasswordCredential({
          id: currentUser.username,
          password: passToSave,
          name: (currentUser.fullName || currentUser.username).trim(),
        });
        (navigator.credentials as any).store(cred);
      } catch {}
    }

    setTimeout(() => setDeviceSaveMessage(null), 3500);
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
              <img src="/logo.jpg" alt="EdNet Learn Gurukul student account" style={{ width: '38px', height: '38px', borderRadius: '8px', border: '1.5px solid #d8ceba', objectFit: 'cover' }} />
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
                  ? `Your one-time all-access pass is active until ${
                      currentUser.subscriptionRenewsAt
                        ? new Date(currentUser.subscriptionRenewsAt).toLocaleDateString('en-IN', {
                            dateStyle: 'medium',
                          })
                        : 'the end of your paid period'
                    }. Renew with another one-time ₹200 payment when it expires.`
                  : currentUser.planStatus === 'trial'
                  ? `Your 14-day free access is active. Enjoy unlimited access to all 15 Deepakam chapters, interactive audio exercises, and Jodo puzzles.`
                  : `Your trial has expired. Pay one-time ₹200 to regain full access to all 15 chapters and interactive audio features.`}
              </p>
              <div className="profile-membership-price">
                One-time ₹200 · Pay via <strong>Razorpay / UPI / QR</strong> · No auto-debit
              </div>

              <div style={{ marginTop: '0.9rem', display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
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
                  <span>{currentUser.planStatus === 'trial' ? '🎉' : '💳'}</span>
                  <span>
                    {currentUser.planStatus === 'active'
                      ? 'Renew / Pay with UPI'
                      : currentUser.planStatus === 'trial'
                      ? `Trial active until ${
                          currentUser.trialEndsAt
                            ? new Date(currentUser.trialEndsAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : `${trialDaysLeft} days left`
                        }`
                      : 'Pay ₹200 once (UPI)'}
                  </span>
                </button>
                {isAdminLoggedIn && currentUser.planStatus === 'trial' && (
                  <button
                    type="button"
                    onClick={() => {
                      const ok = setUserPlanStatus(currentUser.id, 'expired');
                      if (ok) {
                        // Stay on profile so she can open Pay next; status refreshes via store.
                      }
                    }}
                    style={{
                      background: '#ffffff',
                      color: '#7c2d12',
                      border: '1.5px solid #ea580c',
                      borderRadius: '8px',
                      padding: '0.5rem 0.9rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    title="Admin test: expire trial so the normal post-trial UPI pay path appears"
                  >
                    End trial now (test)
                  </button>
                )}
              </div>

              {/* Recent Payments hidden for students — avoids fake ✓ PAID / pending receipt UI */}
            </div>

            {/* Password & Device Remember Card */}
            <div className="profile-security-card">
              <div className="profile-security-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>🔒</span>
                  <h3 className="profile-security-title">Password &amp; Security (सुरक्षा एवं पासवर्ड)</h3>
                </div>
                <button
                  type="button"
                  className="profile-security-toggle-btn"
                  onClick={() => setIsPasswordSectionOpen((prev) => !prev)}
                >
                  {isPasswordSectionOpen ? 'Close ▲' : 'Change Password ➔'}
                </button>
              </div>

              {/* Remember on Device status */}
              <div className="profile-remember-status-row">
                <div className="profile-remember-info">
                  <span className="profile-remember-icon">{isRememberedOnDevice ? '🔐' : '📱'}</span>
                  <div>
                    <div className="profile-remember-title">
                      {isRememberedOnDevice
                        ? 'Login saved on this browser'
                        : 'Login not saved on this device'}
                    </div>
                    <div className="profile-remember-sub">
                      {isRememberedOnDevice
                        ? 'Fast 1-click login enabled on this browser.'
                        : 'You will need to enter your password each time you log in.'}
                    </div>
                  </div>
                </div>

                {isRememberedOnDevice ? (
                  <button
                    type="button"
                    className="profile-clear-remember-btn"
                    onClick={handleClearSavedPasswordOnDevice}
                    title="Remove saved login credentials from this browser"
                  >
                    🗑️ Remove Saved Login
                  </button>
                ) : isPromptingQuickSave ? (
                  <form onSubmit={handleSavePasswordOnDevice} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <input
                      type="password"
                      className="auth-input"
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.85rem', width: '130px' }}
                      placeholder="Enter password"
                      value={quickSavePassword}
                      onChange={(e) => setQuickSavePassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button type="submit" className="profile-save-remember-btn">Save</button>
                    <button type="button" className="profile-clear-remember-btn" onClick={() => setIsPromptingQuickSave(false)}>Cancel</button>
                  </form>
                ) : (
                  <button
                    type="button"
                    className="profile-save-remember-btn"
                    onClick={() => handleSavePasswordOnDevice()}
                  >
                    🔐 Save Login on this Device
                  </button>
                )}
              </div>

              {deviceSaveMessage && (
                <div className="auth-alert-success" style={{ marginTop: '0.6rem', fontSize: '0.82rem', padding: '0.45rem 0.75rem' }}>
                  ✓ {deviceSaveMessage}
                </div>
              )}

              {/* Collapsible Change Password Form */}
              {isPasswordSectionOpen && (
                <form className="profile-password-form" onSubmit={handleChangePasswordSubmit}>
                  <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', fontWeight: 800, color: '#1e293b' }}>
                    Change Account Password (पासवर्ड-परिवर्तनम्)
                  </h4>

                  {passwordChangeMessage && (
                    <div className={passwordChangeMessage.type === 'success' ? 'auth-alert-success' : 'auth-alert-error'} style={{ marginBottom: '0.75rem' }}>
                      {passwordChangeMessage.type === 'success' ? '✓' : '⚠️'} {passwordChangeMessage.text}
                    </div>
                  )}

                  <div className="auth-form-group">
                    <label className="auth-label" htmlFor="current-pw-input">Current Password *</label>
                    <div className="auth-password-wrapper">
                      <input
                        id="current-pw-input"
                        type={showCurrentPass ? 'text' : 'password'}
                        className="auth-input auth-password-input"
                        placeholder="Enter current password"
                        value={currentPasswordInput}
                        onChange={(e) => setCurrentPasswordInput(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="auth-password-toggle-btn"
                        onClick={() => setShowCurrentPass((p) => !p)}
                        title={showCurrentPass ? 'Hide' : 'Show'}
                      >
                        {showCurrentPass ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className="auth-form-group">
                    <label className="auth-label" htmlFor="new-pw-input">New Password * (minimum 4 characters)</label>
                    <div className="auth-password-wrapper">
                      <input
                        id="new-pw-input"
                        type={showNewPass ? 'text' : 'password'}
                        className="auth-input auth-password-input"
                        placeholder="Create a new password"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="auth-password-toggle-btn"
                        onClick={() => setShowNewPass((p) => !p)}
                        title={showNewPass ? 'Hide' : 'Show'}
                      >
                        {showNewPass ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className="auth-form-group">
                    <label className="auth-label" htmlFor="confirm-new-pw-input">Confirm New Password *</label>
                    <input
                      id="confirm-new-pw-input"
                      type="password"
                      className="auth-input"
                      placeholder="Re-enter new password"
                      value={confirmNewPasswordInput}
                      onChange={(e) => setConfirmNewPasswordInput(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </div>

                  <div className="auth-remember-row" style={{ marginTop: '0.4rem', marginBottom: '0.85rem' }}>
                    <label className="auth-remember-label">
                      <input
                        type="checkbox"
                        checked={updateSavedOnDevice}
                        onChange={(e) => setUpdateSavedOnDevice(e.target.checked)}
                        className="auth-remember-checkbox"
                      />
                      <span>Save updated password on this device (पासवर्ड सुरक्षितं रक्षतु)</span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.85rem' }}>
                    <button type="submit" className="auth-submit-btn" style={{ flex: 1, padding: '0.55rem 1rem' }}>
                      Update &amp; Save Password
                    </button>
                    <button
                      type="button"
                      className="profile-btn-logout"
                      style={{ padding: '0.55rem 1rem' }}
                      onClick={() => {
                        setIsPasswordSectionOpen(false);
                        setPasswordChangeMessage(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
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
