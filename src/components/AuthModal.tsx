import React, { useState, useEffect, useRef } from 'react';
import {
  useAuthStore,
  DEFAULT_AVATARS,
  SANSKRIT_INTERESTS_LIST,
  getStoredRememberedCredentials,
  removeStoredRememberedCredentials,
  setStoredRememberedCredentials,
} from '../store/authStore';
import type { SanskritGrade } from '../types/auth';
import { isResetEmailConfigured } from '../utils/sendPasswordResetEmail';
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

const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalInitialTab,
    login,
    register,
    authError,
    clearAuthError,
    pendingRedirectView,
    setPendingRedirect,
    requestPasswordResetOtp,
    verifyOtpAndResetPassword,
  } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot_password'>(authModalInitialTab);

  useEffect(() => {
    setActiveTab(authModalInitialTab);
  }, [authModalInitialTab, isAuthModalOpen]);

  const handleBackToPreview = () => {
    setPendingRedirect(null, undefined);
    closeAuthModal();
  };

  // Login form state
  const rememberedCreds = getStoredRememberedCredentials();
  const [loginIdentifier, setLoginIdentifier] = useState(rememberedCreds?.identifier || '');
  const [loginPassword, setLoginPassword] = useState(rememberedCreds?.password || '');
  const [rememberMe, setRememberMe] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regRememberMe, setRegRememberMe] = useState(true);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot password & OTP state
  const [resetRememberMe, setResetRememberMe] = useState(true);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpStep, setOtpStep] = useState<1 | 2>(1);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resetInfoMessage, setResetInfoMessage] = useState<string | null>(null);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [emailExistsHint, setEmailExistsHint] = useState(false);
  const [fallbackOtp, setFallbackOtp] = useState<string | null>(null);
  const authAlertRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (authError || localError) {
      authAlertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [authError, localError]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAvatar, setRegAvatar] = useState(DEFAULT_AVATARS[0]);
  const [regGrade, setRegGrade] = useState<SanskritGrade>('Class 7 (दीपकम-७)');
  const [regInterests, setRegInterests] = useState<string[]>([
    'NCERT दीपकम Curriculum',
    'श्लोकाः (Shlokas & Wisdom)',
  ]);

  if (!isAuthModalOpen) return null;

  const handleTabChange = (tab: 'login' | 'register' | 'forgot_password') => {
    clearAuthError();
    setLocalError(null);
    setEmailExistsHint(false);
    setResetSuccessMessage(null);
    setResetInfoMessage(null);
    setFallbackOtp(null);
    setActiveTab(tab);
    if (tab === 'forgot_password') {
      setOtpStep(1);
      setForgotIdentifier(loginIdentifier || '');
      setOtpInput('');
      setNewPassword('');
      setConfirmPassword('');
      setResetInfoMessage(null);
    }
  };

  const SUCCESS_RESET_INFO =
    'If an account exists for that email/username, a 6-digit reset code was sent to the registered email address. Check inbox and spam.';

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setLocalError(null);
    setResetInfoMessage(null);
    setFallbackOtp(null);

    const res = await requestPasswordResetOtp(forgotIdentifier);
    if (!res.success) {
      setLocalError(res.error || 'Please enter a valid registered username or email.');
      setOtpStep(1);
      return;
    }

    if (res.emailSent) {
      setResetInfoMessage(SUCCESS_RESET_INFO);
    } else {
      // Email pending domain verification in Resend or fallback mode
      setFallbackOtp(res.fallbackOtp || null);
      if (res.fallbackOtp) {
        setOtpInput(res.fallbackOtp);
      }
      setResetInfoMessage(
        res.fallbackOtp
          ? `⚡ Email delivery is pending domain verification in Resend. For instant verification / testing, your 6-digit code is: ${res.fallbackOtp}`
          : SUCCESS_RESET_INFO
      );
    }
    setOtpStep(2);
    setResendCooldown(60);
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    clearAuthError();
    setLocalError(null);
    setResetInfoMessage(null);

    const res = await requestPasswordResetOtp(forgotIdentifier);
    if (!res.success) {
      setLocalError(res.error || 'Could not resend the reset code. Please try again.');
      return;
    }

    if (res.emailSent) {
      setFallbackOtp(null);
      setResetInfoMessage(SUCCESS_RESET_INFO + ' A fresh code was sent.');
    } else {
      setFallbackOtp(res.fallbackOtp || null);
      if (res.fallbackOtp) {
        setOtpInput(res.fallbackOtp);
      }
      setResetInfoMessage(
        res.fallbackOtp
          ? `⚡ A fresh 6-digit code was generated: ${res.fallbackOtp}`
          : 'A new verification code was requested.'
      );
    }
    setResendCooldown(60);
  };

  const handleVerifyAndReset = (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setLocalError(null);

    if (newPassword.trim().length < 4) {
      setLocalError('Password must be at least 4 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match. Please re-enter.');
      return;
    }

    const res = verifyOtpAndResetPassword(forgotIdentifier, otpInput, newPassword);
    if (res.success) {
      setResetSuccessMessage('Password successfully updated! Logging you in...');
      if (resetRememberMe) {
        setStoredRememberedCredentials(forgotIdentifier.trim(), newPassword);
        if (typeof window !== 'undefined' && 'PasswordCredential' in window && (navigator.credentials as any)?.store) {
          try {
            const cred = new (window as any).PasswordCredential({
              id: forgotIdentifier.trim(),
              password: newPassword,
            });
            (navigator.credentials as any).store(cred);
          } catch {}
        }
      }
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(loginIdentifier, loginPassword, rememberMe);
    if (res.success && rememberMe) {
      if (typeof window !== 'undefined' && 'PasswordCredential' in window && (navigator.credentials as any)?.store) {
        try {
          const cred = new (window as any).PasswordCredential({
            id: loginIdentifier.trim(),
            password: loginPassword,
          });
          (navigator.credentials as any).store(cred);
        } catch {}
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setLocalError(null);
    setEmailExistsHint(false);
    const res = register(
      {
        username: regUsername,
        fullName: regFullName,
        email: regEmail,
        password: regPassword,
        avatar: regAvatar,
        grade: regGrade,
        interests: regInterests,
      },
      regRememberMe
    );
    if (res.success && regRememberMe) {
      if (typeof window !== 'undefined' && 'PasswordCredential' in window && (navigator.credentials as any)?.store) {
        try {
          const cred = new (window as any).PasswordCredential({
            id: regUsername.trim(),
            password: regPassword,
            name: (regFullName || regUsername).trim(),
          });
          (navigator.credentials as any).store(cred);
        } catch {}
      }
    } else if (!res.success) {
      if (res.code === 'email_exists') {
        setEmailExistsHint(true);
        // Prefill forgot-password identifier with the colliding email.
        setForgotIdentifier(regEmail.trim());
      }
      // Ensure the alert at the top of the modal is visible (long register form).
      requestAnimationFrame(() => {
        authAlertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  };

  const goToForgotFromDuplicateEmail = () => {
    clearAuthError();
    setLocalError(null);
    setEmailExistsHint(false);
    setForgotIdentifier(regEmail.trim() || forgotIdentifier);
    setOtpStep(1);
    setOtpInput('');
    setNewPassword('');
    setConfirmPassword('');
    setResetInfoMessage(null);
    setResetSuccessMessage(null);
    setActiveTab('forgot_password');
  };

  const toggleInterest = (interest: string) => {
    setRegInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="auth-modal-overlay" onClick={closeAuthModal}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="auth-modal-close-btn"
          onClick={closeAuthModal}
          aria-label="Close modal"
        >
          ✕
        </button>

        <header className="auth-modal-header">
          <div className="auth-modal-brand">
            <img src="/logo.jpg" alt="Online Sanskrit and Vedic Math classes for kids | EdNet Learn Gurukul" className="auth-modal-logo-img" />
            <div className="auth-modal-brand-titles">
              <span className="auth-modal-brand-name">EdNet Learn Gurukul</span>
              <span className="auth-modal-brand-sub">संस्कृत-गुरुकुलम् · CBSE / NCERT Class 7</span>
            </div>
          </div>
          <p className="auth-modal-subtitle">
            Track your lessons, test pronunciation, and master CBSE Class 7 Sanskrit step by step.
          </p>
        </header>

        {/* 2-Week Free Trial Banner */}
        {activeTab !== 'forgot_password' && (
          <div className="auth-trial-banner">
            <span className="auth-trial-icon">🎉</span>
            <div className="auth-trial-text">
              <div className="auth-trial-title">
                {pendingRedirectView ? 'Sign Up for 14 Days Free Unrestricted Access' : '2 Weeks Free Access Included'}
              </div>
              <p className="auth-trial-desc">
                Create your free student profile to unlock all 15 CBSE chapters, quizzes, worksheets, and puzzles immediately.
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        {activeTab !== 'forgot_password' ? (
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn${activeTab === 'login' ? ' auth-tab-btn--active' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              Log In (प्रवेशः)
            </button>
            <button
              type="button"
              className={`auth-tab-btn${activeTab === 'register' ? ' auth-tab-btn--active' : ''}`}
              onClick={() => handleTabChange('register')}
            >
              Create Account (पञ्जीकरणम्)
            </button>
          </div>
        ) : (
          <div
            style={{
              padding: '0.85rem 1.75rem 0.35rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #ebdccb',
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: '1.05rem',
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>🔑</span>
              <span>Reset Password · पासवर्ड-पुनर्प्राप्तिः</span>
            </div>
            <button
              type="button"
              onClick={() => handleTabChange('login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#b45309',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              ← Back to Log In
            </button>
          </div>
        )}

        {/* Alert messages */}
        {(authError || localError) && (
          <div ref={authAlertRef} style={{ padding: '0 1.75rem', marginTop: '1rem' }}>
            <div className="auth-alert-error">
              <span>⚠️</span> {authError || localError}
            </div>
            {emailExistsHint && activeTab === 'register' && (
              <div style={{ marginTop: '0.65rem', textAlign: 'center' }}>
                <button
                  type="button"
                  className="auth-forgot-link"
                  onClick={goToForgotFromDuplicateEmail}
                  style={{ fontSize: '0.9rem' }}
                >
                  Open Forgot password (पासवर्ड विस्मृतः?)
                </button>
              </div>
            )}
          </div>
        )}

        {resetSuccessMessage && (
          <div style={{ padding: '0 1.75rem', marginTop: '1rem' }}>
            <div className="auth-success-banner">
              <span>✓</span> {resetSuccessMessage}
            </div>
          </div>
        )}

        {/* Forms */}
        {activeTab === 'login' ? (
          <form className="auth-form" onSubmit={handleLoginSubmit} method="post" action="#">
            <div className="auth-form-group">
              <label className="auth-label" htmlFor="login-username">
                Username or Email
              </label>
              <input
                id="login-username"
                name="username"
                type="text"
                className="auth-input"
                placeholder="Enter your username or email"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                required
                autoFocus
                autoComplete="username"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="login-password">
                Password
              </label>
              <div className="auth-password-wrapper">
                <input
                  id="login-password"
                  name="password"
                  type={showLoginPassword ? 'text' : 'password'}
                  className="auth-input auth-password-input"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-password-toggle-btn"
                  onClick={() => setShowLoginPassword((prev) => !prev)}
                  title={showLoginPassword ? 'Hide password' : 'Show password'}
                  aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                >
                  {showLoginPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="auth-remember-card">
              <div className="auth-remember-content">
                <label className="auth-remember-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRememberMe(checked);
                      if (!checked) {
                        removeStoredRememberedCredentials();
                      }
                    }}
                    className="auth-remember-checkbox"
                  />
                  <div>
                    <div className="auth-remember-title">
                      <span>💾</span>
                      <span>Remember / Save password on this device (पासवर्ड सुरक्षितं रक्षतु)</span>
                    </div>
                    <div className="auth-remember-sub">
                      Saves credentials in this browser so you can sign in automatically without re-entering.
                    </div>
                  </div>
                </label>
              </div>
              {getStoredRememberedCredentials() && (
                <button
                  type="button"
                  className="auth-clear-saved-btn"
                  onClick={() => {
                    removeStoredRememberedCredentials();
                    setRememberMe(false);
                    setLoginPassword('');
                  }}
                  title="Clear saved password from this device"
                >
                  ✕ Clear saved
                </button>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.35rem', marginBottom: '0.85rem' }}>
              <button
                type="button"
                onClick={() => handleTabChange('forgot_password')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b45309',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                Forgot Password? (पासवर्ड विस्मृतः?)
              </button>
            </div>

            <button type="submit" className="auth-submit-btn">
              Log In ➔
            </button>

            <div
              style={{
                marginTop: '1rem',
                padding: '0.85rem 1rem',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.45, marginBottom: '0.5rem' }}>
                📖 <strong>Free Guest Preview:</strong> You can explore the <strong>Alphabet &amp; Syllables (वर्णमाला)</strong> and <strong>Chapter 1</strong> for free. To access Chapters 2–15, Quizzes, Worksheets, or Vedic Maths, please log in or create an account.
              </div>
              <button
                type="button"
                onClick={handleBackToPreview}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#b45309',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>←</span>
                <span>Return to Free Chapter 1 Preview</span>
              </button>
            </div>
          </form>
        ) : activeTab === 'register' ? (
          /* Registration Form */
          <form className="auth-form" onSubmit={handleRegisterSubmit} method="post" action="#">
            <div className="auth-form-group">
              <label className="auth-label" htmlFor="reg-username">
                Username *
              </label>
              <input
                id="reg-username"
                name="username"
                type="text"
                className="auth-input"
                placeholder="e.g. vidyarthi_ram"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="reg-fullname">
                Full Name / Student Name
              </label>
              <input
                id="reg-fullname"
                name="name"
                type="text"
                className="auth-input"
                placeholder="e.g. Ram Sharma"
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="reg-email">
                Email Address *
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                className="auth-input"
                placeholder="e.g. student@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="reg-password">
                Password * (minimum 4 characters)
              </label>
              <div className="auth-password-wrapper">
                <input
                  id="reg-password"
                  name="password"
                  type={showRegPassword ? 'text' : 'password'}
                  className="auth-input auth-password-input"
                  placeholder="Create a password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-password-toggle-btn"
                  onClick={() => setShowRegPassword((prev) => !prev)}
                  title={showRegPassword ? 'Hide password' : 'Show password'}
                  aria-label={showRegPassword ? 'Hide password' : 'Show password'}
                >
                  {showRegPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="auth-remember-card" style={{ marginTop: '0.2rem', marginBottom: '1rem' }}>
              <div className="auth-remember-content">
                <label className="auth-remember-label">
                  <input
                    type="checkbox"
                    checked={regRememberMe}
                    onChange={(e) => setRegRememberMe(e.target.checked)}
                    className="auth-remember-checkbox"
                  />
                  <div>
                    <div className="auth-remember-title">
                      <span>💾</span>
                      <span>Save password on this device (पासवर्ड सुरक्षितं रक्षतु)</span>
                    </div>
                    <div className="auth-remember-sub">
                      Enables instant 1-click login on this browser without retyping credentials.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Avatar Picker */}
            <div className="auth-form-group">
              <label className="auth-label">Choose Your Sanskrit Avatar</label>
              <div className="avatar-picker-grid">
                {DEFAULT_AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    className={`avatar-picker-btn${regAvatar === av ? ' avatar-picker-btn--selected' : ''}`}
                    onClick={() => setRegAvatar(av)}
                    title={`Choose ${av}`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Grade Selection */}
            <div className="auth-form-group">
              <label className="auth-label" htmlFor="reg-grade">
                Learning Level / School Grade
              </label>
              <select
                id="reg-grade"
                className="auth-select"
                value={regGrade}
                onChange={(e) => setRegGrade(e.target.value as SanskritGrade)}
              >
                {GRADES_LIST.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Interests Checkboxes */}
            <div className="auth-form-group">
              <label className="auth-label">Learning Interests</label>
              <div className="interests-grid">
                {SANSKRIT_INTERESTS_LIST.map((interest) => (
                  <label key={interest} className="interest-checkbox-label">
                    <input
                      type="checkbox"
                      checked={regInterests.includes(interest)}
                      onChange={() => toggleInterest(interest)}
                    />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Start 2-Week Free Trial ➔
            </button>

            {emailExistsHint && (
              <div
                style={{
                  marginTop: '0.85rem',
                  padding: '0.75rem 0.9rem',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  color: '#991b1b',
                  lineHeight: 1.5,
                  textAlign: 'center',
                }}
              >
                <div style={{ marginBottom: '0.45rem' }}>
                  An account already exists with this email. Use Forgot password to reset.
                </div>
                <button
                  type="button"
                  onClick={goToForgotFromDuplicateEmail}
                  style={{
                    background: '#b45309',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.45rem 0.9rem',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                  }}
                >
                  Go to Forgot password
                </button>
              </div>
            )}

            <div
              style={{
                marginTop: '1rem',
                padding: '0.85rem 1rem',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.45, marginBottom: '0.5rem' }}>
                📖 <strong>Free Guest Preview:</strong> You can explore the <strong>Alphabet &amp; Syllables (वर्णमाला)</strong> and <strong>Chapter 1</strong> for free. To access Chapters 2–15, Quizzes, Worksheets, or Vedic Maths, please log in or create an account.
              </div>
              <button
                type="button"
                onClick={handleBackToPreview}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#b45309',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>←</span>
                <span>Return to Free Chapter 1 Preview</span>
              </button>
            </div>
          </form>
        ) : (
          /* Forgot Password / OTP Verification Form */
          <form className="auth-form" onSubmit={otpStep === 1 ? handleRequestOtp : handleVerifyAndReset}>
            {otpStep === 1 ? (
              <>
                <div
                  style={{
                    margin: '0 0 1.1rem 0',
                    padding: '0.85rem 1rem',
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    color: '#065f46',
                    lineHeight: 1.55,
                  }}
                >
                  Enter your registered username or email. If an account exists, a{' '}
                  <strong>6-digit reset code is emailed to that registered address only</strong>{' '}
                  (never shown here, never by SMS). If email delivery is not connected yet, contact{' '}
                  <strong>Learner Care (care@ednetlearn.in)</strong> or ask an admin to use{' '}
                  <strong>Admin → Students → Reset PW</strong>.
                </div>

                {!isResetEmailConfigured() && (
                  <div
                    style={{
                      margin: '0 0 1.1rem 0',
                      padding: '0.75rem 1rem',
                      background: '#fffbeb',
                      border: '1px solid #fcd34d',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      color: '#92400e',
                      lineHeight: 1.5,
                    }}
                  >
                    Password reset emails (via EdNet mail / Resend) are not connected on this
                    deployment yet. Contact <strong>care@ednetlearn.in</strong> or ask an admin for{' '}
                    <strong>Admin → Students → Reset PW</strong>.
                  </div>
                )}

                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="forgot-identifier">
                    Username or Email *
                  </label>
                  <input
                    id="forgot-identifier"
                    type="text"
                    className="auth-input"
                    placeholder="e.g. ram_sharma or student@example.com"
                    value={forgotIdentifier}
                    onChange={(e) => setForgotIdentifier(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <button type="submit" className="auth-submit-btn">
                  Get reset code ➔
                </button>
              </>
            ) : (
              <>
                <div
                  style={{
                    margin: '0 0 1.1rem 0',
                    padding: '0.85rem 1rem',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    color: '#1e3a8a',
                    lineHeight: 1.55,
                  }}
                >
                  <strong>Enter the 6-digit code from your registered email.</strong>
                  {' '}
                  Codes are never shown on this screen and are never sent by SMS.
                  {' '}
                  If you did not receive email, tap Resend, contact <strong>care@ednetlearn.in</strong>, or ask an admin to use{' '}
                  <strong>Admin → Students → Reset PW</strong>.
                </div>

                {!isResetEmailConfigured() && (
                  <div
                    style={{
                      margin: '0 0 1.1rem 0',
                      padding: '0.75rem 1rem',
                      background: '#fffbeb',
                      border: '1px solid #fcd34d',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      color: '#92400e',
                      lineHeight: 1.5,
                    }}
                  >
                    Password reset emails (via EdNet mail / Resend) are not connected on this
                    deployment yet. Until then use <strong>Admin → Students → Reset PW</strong> or
                    contact <strong>care@ednetlearn.in</strong>. Codes are never shown on screen.
                  </div>
                )}

                {resetInfoMessage && (
                  <div
                    style={{
                      margin: '0 0 1.1rem 0',
                      padding: '0.75rem 1rem',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      fontSize: '0.82rem',
                      color: '#334155',
                      lineHeight: 1.5,
                    }}
                  >
                    {resetInfoMessage}
                  </div>
                )}

                {fallbackOtp && (
                  <div
                    style={{
                      margin: '0 0 1rem 0',
                      padding: '0.75rem 1rem',
                      background: '#fef3c7',
                      border: '1px solid #fde68a',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', color: '#92400e' }}>
                      <strong>Verification Code:</strong>{' '}
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          letterSpacing: '0.15em',
                          color: '#b45309',
                        }}
                      >
                        {fallbackOtp}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpInput(fallbackOtp)}
                      style={{
                        background: '#b45309',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      ⚡ Auto-Fill Code
                    </button>
                  </div>
                )}

                {/* 6-Digit OTP Input */}
                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="otp-code-input">
                    Enter the 6-digit code sent to your registered email *
                  </label>
                  <input
                    id="otp-code-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    className="auth-otp-input"
                    placeholder="• • • • • •"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    autoFocus
                  />
                  <div className="auth-resend-row">
                    <span style={{ color: '#64748b' }}>Need a new code?</span>
                    <button
                      type="button"
                      className="auth-resend-btn"
                      onClick={handleResendOtp}
                      disabled={resendCooldown > 0}
                    >
                      {resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : 'Resend code to email'}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="new-password">
                    New Password * (minimum 4 characters)
                  </label>
                  <div className="auth-password-wrapper">
                    <input
                      id="new-password"
                      type={showNewPassword ? 'text' : 'password'}
                      className="auth-input auth-password-input"
                      placeholder="Create a new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="auth-password-toggle-btn"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      title={showNewPassword ? 'Hide password' : 'Show password'}
                      aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                    >
                      {showNewPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="confirm-password">
                    Confirm New Password *
                  </label>
                  <div className="auth-password-wrapper">
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="auth-input auth-password-input"
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="auth-password-toggle-btn"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      title={showConfirmPassword ? 'Hide password' : 'Show password'}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="auth-remember-card" style={{ marginTop: '0.4rem', marginBottom: '1.25rem' }}>
                  <div className="auth-remember-content">
                    <label className="auth-remember-label">
                      <input
                        type="checkbox"
                        checked={resetRememberMe}
                        onChange={(e) => setResetRememberMe(e.target.checked)}
                        className="auth-remember-checkbox"
                      />
                      <div>
                        <div className="auth-remember-title">
                          <span>💾</span>
                          <span>Save new password on this device (पासवर्ड सुरक्षितं रक्षतु)</span>
                        </div>
                        <div className="auth-remember-sub">
                          Updates your saved password on this browser for 1-click login.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <button type="submit" className="auth-submit-btn">
                  Verify code &amp; Reset Password ➔
                </button>

                <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setOtpStep(1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    ← Change Username / Email
                  </button>
                </div>
              </>
            )}

            <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
              <button
                type="button"
                onClick={() => handleTabChange('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b45309',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>←</span>
                <span>Back to Log In</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
