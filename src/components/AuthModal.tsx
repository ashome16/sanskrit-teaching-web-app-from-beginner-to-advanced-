import React, { useState, useEffect } from 'react';
import { useAuthStore, DEFAULT_AVATARS, SANSKRIT_INTERESTS_LIST } from '../store/authStore';
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
  } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(authModalInitialTab);

  useEffect(() => {
    setActiveTab(authModalInitialTab);
  }, [authModalInitialTab, isAuthModalOpen]);

  const handleBackToPreview = () => {
    setPendingRedirect(null, undefined);
    closeAuthModal();
  };

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

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

  const handleTabChange = (tab: 'login' | 'register') => {
    clearAuthError();
    setActiveTab(tab);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginIdentifier, loginPassword);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      username: regUsername,
      fullName: regFullName,
      email: regEmail,
      password: regPassword,
      avatar: regAvatar,
      grade: regGrade,
      interests: regInterests,
    });
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
            <img src="/logo.jpg" alt="EdNet Learn Gurukul" className="auth-modal-logo-img" />
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

        {/* Tabs */}
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

        {/* Alert message */}
        {authError && (
          <div style={{ padding: '0 1.75rem', marginTop: '1rem' }}>
            <div className="auth-alert-error">
              <span>⚠️</span> {authError}
            </div>
          </div>
        )}

        {/* Login Form */}
        {activeTab === 'login' ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="auth-form-group">
              <label className="auth-label" htmlFor="login-username">
                Username or Email
              </label>
              <input
                id="login-username"
                type="text"
                className="auth-input"
                placeholder="Enter your username or email"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                className="auth-input"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
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
                📖 <strong>Free Guest Preview:</strong> You can explore the <strong>Varṇamālā (Alphabet)</strong> and <strong>Chapter 1</strong> for free. To access Chapters 2–15, Quizzes, Worksheets, or Vedic Maths, please log in or create an account.
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
          /* Registration Form */
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <div className="auth-form-group">
              <label className="auth-label" htmlFor="reg-username">
                Username *
              </label>
              <input
                id="reg-username"
                type="text"
                className="auth-input"
                placeholder="e.g. vidyarthi_ram"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="reg-fullname">
                Full Name / Student Name
              </label>
              <input
                id="reg-fullname"
                type="text"
                className="auth-input"
                placeholder="e.g. Ram Sharma"
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="reg-email">
                Email Address *
              </label>
              <input
                id="reg-email"
                type="email"
                className="auth-input"
                placeholder="e.g. student@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="reg-password">
                Password * (minimum 4 characters)
              </label>
              <input
                id="reg-password"
                type="password"
                className="auth-input"
                placeholder="Create a password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
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
                📖 <strong>Free Guest Preview:</strong> You can explore the <strong>Varṇamālā (Alphabet)</strong> and <strong>Chapter 1</strong> for free. To access Chapters 2–15, Quizzes, Worksheets, or Vedic Maths, please log in or create an account.
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
        )}
      </div>
    </div>
  );
};

export default AuthModal;
