import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { isAdminEmail } from '../utils/adminAllowlist';
import type { AccessControlMode } from '../types/auth';
import '../styles/admin-modal.css';

const AdminModal: React.FC = () => {
  const {
    currentUser,
    isAdminModalOpen,
    closeAdminModal,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    getAllAccountsList,
    setUserPlanStatus,
    adminResetUserPassword,
    deleteUserAccountByAdmin,
    approveTransaction,
    rejectTransaction,
    exportAllAccounts,
    importAccounts,
    setAdminPasscode,
    accessMode,
    setAccessMode,
    upiVpa,
    upiPayeeName,
    setUpiConfig,
  } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'payments' | 'settings' | 'backup'>('overview');
  const [passcodeInput, setPasscodeInput] = useState('');
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Settings State
  const [upiVpaInput, setUpiVpaInput] = useState(upiVpa);
  const [upiPayeeInput, setUpiPayeeInput] = useState(upiPayeeName);
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Add Student State
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentFullName, setNewStudentFullName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentUsername, setNewStudentUsername] = useState('');
  const [newStudentPassword, setNewStudentPassword] = useState('ednet2026');
  const [newStudentPlan, setNewStudentPlan] = useState<'trial' | 'active'>('trial');
  const [addStudentError, setAddStudentError] = useState<string | null>(null);
  const [addStudentSuccess, setAddStudentSuccess] = useState<string | null>(null);

  // Passcode Change
  const [newPasscode, setNewPasscode] = useState('');
  const [passcodeSuccess, setPasscodeSuccess] = useState<string | null>(null);

  // Import JSON state
  const [importJsonText, setImportJsonText] = useState('');
  const [importResult, setImportResult] = useState<{ success: boolean; count: number; error?: string } | null>(null);

  if (!isAdminModalOpen) return null;

  const handleSaveUpiConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setUpiConfig(upiVpaInput, upiPayeeInput);
    setSettingsSuccessMsg('UPI Configuration successfully saved and live in checkout!');
    setTimeout(() => setSettingsSuccessMsg(null), 3500);
  };

  const handleAccessModeChange = (mode: AccessControlMode) => {
    setAccessMode(mode);
    setSettingsSuccessMsg(
      `Access mode updated to "${mode === 'smart_freemium' ? 'Smart Freemium' : mode === 'strict_gate' ? 'Strict Gate' : 'Open Access'}"!`
    );
    setTimeout(() => setSettingsSuccessMsg(null), 3500);
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const { currentUser } = useAuthStore.getState();
    const emailToUse = isAdminEmail(currentUser?.email)
      ? currentUser?.email
      : adminEmailInput.trim().toLowerCase();

    if (!emailToUse || !isAdminEmail(emailToUse)) {
      setAuthError('Admin only for approved EdNet emails (care@ednetadmin.in, admin@ednetlearn.in).');
      return;
    }
    const success = adminLogin(passcodeInput, emailToUse);
    if (!success) {
      setAuthError('Incorrect administrator passcode. Please try again.');
    } else {
      setPasscodeInput('');
      setAdminEmailInput('');
    }
  };

  const handleCreateStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddStudentError(null);
    setAddStudentSuccess(null);

    const { createStudentAccountByAdmin } = useAuthStore.getState();
    const res = createStudentAccountByAdmin({
      fullName: newStudentFullName,
      email: newStudentEmail,
      username: newStudentUsername || undefined,
      password: newStudentPassword || 'ednet2026',
      planStatus: newStudentPlan,
    });

    if (!res.success) {
      setAddStudentError(res.error || 'Could not create student account.');
      return;
    }

    setAddStudentSuccess(`Student account for ${newStudentFullName} created successfully! (Initial password: ${res.temporaryPassword})`);
    setNewStudentFullName('');
    setNewStudentEmail('');
    setNewStudentUsername('');
    setNewStudentPassword('ednet2026');
    setNewStudentPlan('trial');
    setTimeout(() => {
      setShowAddStudentModal(false);
      setAddStudentSuccess(null);
    }, 2500);
  };

  const accounts = getAllAccountsList();

  // Metrics
  const totalUsers = accounts.length;
  const activeSubscribers = accounts.filter((a) => a.profile.planStatus === 'active').length;
  const trialUsers = accounts.filter((a) => a.profile.planStatus === 'trial').length;
  const expiredUsers = accounts.filter((a) => a.profile.planStatus === 'expired').length;
  const estActivePassValue = activeSubscribers * 200;

  // Flattened Transactions
  const allTransactions = accounts.flatMap((acc) =>
    (acc.profile.transactions || []).map((t) => ({
      ...t,
      userId: acc.profile.id,
      userFullName: acc.profile.fullName,
      userEmail: acc.profile.email,
    }))
  ).sort((a, b) => b.timestamp - a.timestamp);

  // Filtered accounts
  const filteredAccounts = accounts.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      a.profile.fullName.toLowerCase().includes(q) ||
      a.profile.username.toLowerCase().includes(q) ||
      a.profile.email.toLowerCase().includes(q)
    );
  });

  const handleExportData = () => {
    const dataStr = exportAllAccounts();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ednetlearn_accounts_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const res = importAccounts(importJsonText);
    setImportResult(res);
    if (res.success) {
      setImportJsonText('');
    }
  };

  const handleUpdatePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeSuccess(null);
    if (newPasscode.trim().length < 4) {
      setAuthError('Passcode must be at least 4 characters long.');
      return;
    }
    const success = setAdminPasscode(newPasscode.trim());
    if (success) {
      setPasscodeSuccess('Admin passcode updated successfully!');
      setNewPasscode('');
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={closeAdminModal}>
      <div
        className="admin-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="admin-modal-header">
          <div>
            <h2 className="admin-modal-title">
              <span>🛡️</span> EdNet Learn Gurukul — Admin Portal
            </h2>
            <div className="admin-modal-subtitle">
              Platform administration, account management &amp; UTR payment approval
            </div>
          </div>

          <div className="admin-header-actions">
            {isAdminLoggedIn && (
              <button
                type="button"
                className="admin-logout-btn"
                onClick={adminLogout}
                title="Lock Admin Portal"
              >
                🔒 Lock / Logout
              </button>
            )}
            <button
              type="button"
              className="admin-close-btn"
              onClick={closeAdminModal}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Passcode Lock Screen */}
        {!isAdminLoggedIn ? (
          <div className="admin-modal-body">
            <div className="admin-lock-box">
              <div className="admin-lock-icon">🔐</div>
              <h3 className="admin-lock-title">Administrator Authentication</h3>
              <p className="admin-lock-desc">
                {currentUser && isAdminEmail(currentUser.email)
                  ? `Signed in as ${currentUser.email}. Enter your administrator passcode to open the portal.`
                  : 'Enter your approved administrator email (care@ednetadmin.in or admin@ednetlearn.in) and passcode.'}
              </p>

              <form onSubmit={handleAdminAuthSubmit}>
                {(!currentUser || !isAdminEmail(currentUser?.email)) && (
                  <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Administrator Email *
                    </label>
                    <input
                      type="email"
                      className="admin-passcode-input"
                      placeholder="care@ednetadmin.in or admin@ednetlearn.in"
                      value={adminEmailInput}
                      onChange={(e) => setAdminEmailInput(e.target.value)}
                      required
                      style={{ fontSize: '0.92rem', padding: '0.65rem 1rem', width: '100%', marginBottom: '0.35rem', textAlign: 'left' }}
                    />
                  </div>
                )}

                <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Administrator Passcode *
                  </label>
                  <input
                    type="password"
                    className="admin-passcode-input"
                    placeholder="••••••••"
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    required
                    autoFocus
                    style={{ fontSize: '1rem', padding: '0.65rem 1rem', width: '100%' }}
                  />
                </div>

                {authError && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>
                    {authError}
                  </div>
                )}

                <button type="submit" className="admin-login-submit-btn">
                  Authenticate &amp; Enter Portal ➔
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <>
            {/* Nav Tabs */}
            <div className="admin-nav-tabs">
              <button
                type="button"
                className={`admin-nav-tab${activeTab === 'overview' ? ' active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                📊 Overview &amp; Metrics
              </button>
              <button
                type="button"
                className={`admin-nav-tab${activeTab === 'students' ? ' active' : ''}`}
                onClick={() => setActiveTab('students')}
              >
                👥 Students ({accounts.length})
              </button>
              <button
                type="button"
                className={`admin-nav-tab${activeTab === 'payments' ? ' active' : ''}`}
                onClick={() => setActiveTab('payments')}
              >
                💳 Payments &amp; UTRs ({allTransactions.length})
              </button>
              <button
                type="button"
                className={`admin-nav-tab${activeTab === 'settings' ? ' active' : ''}`}
                onClick={() => {
                  setUpiVpaInput(upiVpa);
                  setUpiPayeeInput(upiPayeeName);
                  setActiveTab('settings');
                }}
              >
                ⚙️ Platform &amp; Gate Settings
              </button>
              <button
                type="button"
                className={`admin-nav-tab${activeTab === 'backup' ? ' active' : ''}`}
                onClick={() => setActiveTab('backup')}
              >
                💾 Backup &amp; Passcode
              </button>
            </div>

            {/* Content Body */}
            <div className="admin-modal-body">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div>
                  <div className="admin-metrics-grid">
                    <div className="admin-metric-card">
                      <span className="admin-metric-label">Total Learners</span>
                      <span className="admin-metric-value">{totalUsers}</span>
                      <span className="admin-metric-sub">Registered accounts</span>
                    </div>

                    <div className="admin-metric-card" style={{ borderColor: '#86efac' }}>
                      <span className="admin-metric-label">Active Passports</span>
                      <span className="admin-metric-value" style={{ color: '#15803d' }}>
                        {activeSubscribers}
                      </span>
                      <span className="admin-metric-sub">Full access members</span>
                    </div>

                    <div className="admin-metric-card" style={{ borderColor: '#fde047' }}>
                      <span className="admin-metric-label">Free Trials Active</span>
                      <span className="admin-metric-value" style={{ color: '#ca8a04' }}>
                        {trialUsers}
                      </span>
                      <span className="admin-metric-sub">14-day trial window</span>
                    </div>

                    <div className="admin-metric-card" style={{ borderColor: '#fca5a5' }}>
                      <span className="admin-metric-label">Expired / Inactive</span>
                      <span className="admin-metric-value" style={{ color: '#dc2626' }}>
                        {expiredUsers}
                      </span>
                      <span className="admin-metric-sub">Pending renewal</span>
                    </div>

                    <div className="admin-metric-card">
                      <span className="admin-metric-label">Est. Active Pass Value</span>
                      <span className="admin-metric-value" style={{ color: '#2563eb' }}>
                        ₹{estActivePassValue}
                      </span>
                      <span className="admin-metric-sub">₹200 / active pass</span>
                    </div>
                  </div>

                  {/* Content Inventory Status */}
                  <div className="admin-inventory-card">
                    <div className="admin-inventory-title">
                      📚 Platform Educational Assets &amp; Curriculum Inventory
                    </div>
                    <div className="admin-inventory-grid">
                      <div className="admin-inventory-item">
                        <span>Class 7 Deepakam (Complete)</span>
                        <strong>15 Chapters</strong>
                      </div>
                      <div className="admin-inventory-item">
                        <span>Class 8 Deepakam (Active)</span>
                        <strong>7 Chapters</strong>
                      </div>
                      <div className="admin-inventory-item">
                        <span>Curriculum Worksheets</span>
                        <strong>28 Worksheets</strong>
                      </div>
                      <div className="admin-inventory-item">
                        <span>Interactive Quizzes</span>
                        <strong>39+ Sets (200+ Qs)</strong>
                      </div>
                      <div className="admin-inventory-item">
                        <span>Jodo Tile Studio</span>
                        <strong>2,240+ Puzzles</strong>
                      </div>
                      <div className="admin-inventory-item">
                        <span>Vedic Math Engine</span>
                        <strong>16 Sutras &amp; Drills</strong>
                      </div>
                    </div>
                  </div>

                  {/* Quick Guide */}
                  <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                    <strong>💡 Administrator Tips:</strong>
                    <ul style={{ margin: '0.5rem 0 0 1.25rem', padding: 0, color: '#475569' }}>
                      <li>When students transfer ₹200 via UPI and submit their 12-digit UTR, go to the <strong>Payments &amp; UTRs</strong> tab and click <strong>Approve &amp; Activate</strong>.</li>
                      <li>To grant access without payment (e.g. school demo), switch to <strong>Students</strong> tab and change their plan to Active.</li>
                      <li>Always download a JSON backup from the <strong>Backup &amp; Settings</strong> tab periodically to keep offline records.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 2: STUDENTS */}
              {activeTab === 'students' && (
                <div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      placeholder="Search students by name, email, or username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        flex: '1 1 240px',
                        padding: '0.65rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                      }}
                    />
                    <button
                      type="button"
                      className="admin-btn-primary"
                      onClick={() => {
                        setShowAddStudentModal(!showAddStudentModal);
                        setAddStudentError(null);
                        setAddStudentSuccess(null);
                      }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}
                    >
                      {showAddStudentModal ? '✕ Close Form' : '➕ Create Student'}
                    </button>
                    <span style={{ fontSize: '0.85rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                      Showing {filteredAccounts.length} of {accounts.length}
                    </span>
                  </div>

                  {/* Inline Student Provisioning Form */}
                  {showAddStudentModal && (
                    <form
                      onSubmit={handleCreateStudentSubmit}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        marginBottom: '1.25rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1rem', color: '#0f172a' }}>
                            ➕ Direct Student Account Provisioning
                          </h4>
                          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                            Creates the student account immediately without logging out of your admin session
                          </span>
                        </div>
                      </div>

                      {addStudentError && (
                        <div style={{ padding: '0.6rem 0.85rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#b91c1c', fontSize: '0.85rem', marginBottom: '0.85rem' }}>
                          ⚠️ {addStudentError}
                        </div>
                      )}

                      {addStudentSuccess && (
                        <div style={{ padding: '0.6rem 0.85rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '6px', color: '#047857', fontSize: '0.85rem', marginBottom: '0.85rem' }}>
                          ✅ {addStudentSuccess}
                        </div>
                      )}

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                            Student Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Aarav Sharma"
                            value={newStudentFullName}
                            onChange={(e) => setNewStudentFullName(e.target.value)}
                            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="student@example.com"
                            value={newStudentEmail}
                            onChange={(e) => setNewStudentEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                            Username (optional)
                          </label>
                          <input
                            type="text"
                            placeholder="Auto-generated if blank"
                            value={newStudentUsername}
                            onChange={(e) => setNewStudentUsername(e.target.value)}
                            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                            Initial Password
                          </label>
                          <input
                            type="text"
                            value={newStudentPassword}
                            onChange={(e) => setNewStudentPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                            Initial Access Plan
                          </label>
                          <select
                            value={newStudentPlan}
                            onChange={(e) => setNewStudentPlan(e.target.value as 'trial' | 'active')}
                            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff' }}
                          >
                            <option value="trial">Free Trial (7-Day Access)</option>
                            <option value="active">Active Pass (Full Access)</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="admin-btn-secondary"
                          onClick={() => {
                            setShowAddStudentModal(false);
                            setAddStudentError(null);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="admin-btn-primary"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
                  )}

                  {filteredAccounts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                      No registered learners found matching "{searchQuery}".
                    </div>
                  ) : (
                    <div className="admin-table-container">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Student</th>
                            <th>Email</th>
                            <th>Grade Level</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Change Plan</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAccounts.map((acc) => (
                            <tr key={acc.profile.id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ fontSize: '1.25rem' }}>{acc.profile.avatar || '🧘'}</span>
                                  <div>
                                    <strong>{acc.profile.fullName}</strong>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>@{acc.profile.username}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{acc.profile.email}</td>
                              <td>{acc.profile.grade || 'General'}</td>
                              <td>
                                <span className={`admin-badge admin-badge-${acc.profile.planStatus}`}>
                                  {acc.profile.planStatus}
                                </span>
                              </td>
                              <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                {new Date(acc.profile.createdAt).toLocaleDateString('en-IN', {
                                  dateStyle: 'short',
                                })}
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '0.35rem' }}>
                                  <button
                                    type="button"
                                    className="admin-btn-action"
                                    title="Grant 30 Days Full Access"
                                    onClick={() => setUserPlanStatus(acc.profile.id, 'active', 30)}
                                  >
                                    +30 Days
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-btn-action"
                                    title="Grant 1 Year Full Access"
                                    onClick={() => setUserPlanStatus(acc.profile.id, 'active', 365)}
                                  >
                                    +1 Year
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-btn-action"
                                    title="Reset to 14-day Free Trial"
                                    onClick={() => setUserPlanStatus(acc.profile.id, 'trial', 14)}
                                  >
                                    Trial
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-btn-action"
                                    title="End trial / mark expired"
                                    onClick={() => setUserPlanStatus(acc.profile.id, 'expired')}
                                  >
                                    Expire
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-btn-action"
                                    title="Reset password for this student"
                                    onClick={() => {
                                      const pw = window.prompt(
                                        `Set a new password for ${acc.profile.fullName} (@${acc.profile.username}):`,
                                        ''
                                      );
                                      if (pw == null) return;
                                      const res = adminResetUserPassword(acc.profile.id, pw);
                                      if (res.success) {
                                        window.alert('Password updated for this student.');
                                      } else {
                                        window.alert(res.error || 'Could not reset password.');
                                      }
                                    }}
                                  >
                                    🔑 Reset PW
                                  </button>
                                </div>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="admin-btn-danger"
                                  title="Delete Account"
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete ${acc.profile.fullName}'s account?`)) {
                                      deleteUserAccountByAdmin(acc.profile.id);
                                    }
                                  }}
                                >
                                  🗑️ Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PAYMENTS & UTRs */}
              {activeTab === 'payments' && (
                <div>
                  <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569' }}>
                      List of all transactions recorded by students via Instant Verification or Manual UPI UTR Submission.
                    </p>
                  </div>

                  {allTransactions.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                      No transactions recorded yet. When learners make a payment or submit a UPI UTR, they will appear here.
                    </div>
                  ) : (
                    <div className="admin-table-container">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Date &amp; Time</th>
                            <th>Student</th>
                            <th>Order ID</th>
                            <th>Method</th>
                            <th>UTR / Ref Number</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allTransactions.map((tx) => (
                            <tr key={tx.id}>
                              <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                {new Date(tx.timestamp).toLocaleString('en-IN', {
                                  dateStyle: 'short',
                                  timeStyle: 'short',
                                })}
                              </td>
                              <td>
                                <strong>{tx.userFullName}</strong>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{tx.userEmail}</div>
                              </td>
                              <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{tx.id}</td>
                              <td style={{ textTransform: 'uppercase', fontWeight: 600 }}>{tx.paymentMethod}</td>
                              <td>
                                {tx.utrNumber ? (
                                  <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#1e40af', background: '#dbeafe', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                    {tx.utrNumber}
                                  </span>
                                ) : (
                                  <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Direct/Auto</span>
                                )}
                              </td>
                              <td>
                                <strong>₹{tx.amountInr}.00</strong>
                              </td>
                              <td>
                                <span className={`admin-badge admin-badge-${tx.status}`}>
                                  {tx.status}
                                </span>
                              </td>
                              <td>
                                {tx.status === 'pending' ? (
                                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                                    <button
                                      type="button"
                                      className="admin-btn-approve"
                                      onClick={() => approveTransaction(tx.userId, tx.id)}
                                    >
                                      ✓ Approve &amp; Activate
                                    </button>
                                    <button
                                      type="button"
                                      className="admin-btn-danger"
                                      onClick={() => rejectTransaction(tx.userId, tx.id)}
                                    >
                                      Decline
                                    </button>
                                  </div>
                                ) : (
                                  <span style={{ color: '#15803d', fontSize: '0.8rem', fontWeight: 700 }}>
                                    Approved
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: PLATFORM SETTINGS */}
              {activeTab === 'settings' && (
                <div className="admin-settings-panel">
                  {settingsSuccessMsg && (
                    <div
                      style={{
                        background: '#dcfce7',
                        border: '1px solid #86efac',
                        color: '#15803d',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        marginBottom: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span>✓</span>
                      <span>{settingsSuccessMsg}</span>
                    </div>
                  )}

                  {/* Section 1: Access Control & Freemium Gating */}
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🚪</span> Access Control &amp; Paywall Gating
                      </h3>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.65rem', borderRadius: '999px', background: accessMode === 'smart_freemium' ? '#dcfce7' : accessMode === 'strict_gate' ? '#fef3c7' : '#e0e7ff', color: accessMode === 'smart_freemium' ? '#15803d' : accessMode === 'strict_gate' ? '#92400e' : '#3730a3' }}>
                        Mode: {accessMode.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                      Control how guest visitors experience the Gurukul platform and when they are guided to create an account for their 14-day free trial.
                    </p>

                    <div style={{ display: 'grid', gap: '0.85rem' }}>
                      {/* Option 1: Smart Freemium */}
                      <label
                        onClick={() => handleAccessModeChange('smart_freemium')}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.85rem',
                          padding: '1rem',
                          borderRadius: '10px',
                          border: `2px solid ${accessMode === 'smart_freemium' ? '#15803d' : '#cbd5e1'}`,
                          background: accessMode === 'smart_freemium' ? '#f0fdf4' : '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <input
                          type="radio"
                          name="accessMode"
                          value="smart_freemium"
                          checked={accessMode === 'smart_freemium'}
                          onChange={() => handleAccessModeChange('smart_freemium')}
                          style={{ marginTop: '0.2rem' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>
                              🌟 Smart Freemium Preview (Recommended)
                            </strong>
                            <span style={{ background: '#bbf7d0', color: '#14532d', fontSize: '0.7rem', fontWeight: 800, padding: '0.1rem 0.45rem', borderRadius: '4px' }}>
                              BEST CONVERSION
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.45 }}>
                            <strong>Home</strong>, <strong>Alphabet &amp; Syllables (वर्णमाला)</strong>, and <strong>Chapter 1 (वन्दे भारतमातरम्)</strong> are 100% free with no login barrier. When guests click Chapter 2–15, Jodo Tile Puzzle, Grammar, Vedic Maths, Quizzes, or Worksheets, they are prompted to create a free account to activate their <strong>14-day unrestricted trial</strong>.
                          </p>
                        </div>
                      </label>

                      {/* Option 2: Strict Gate */}
                      <label
                        onClick={() => handleAccessModeChange('strict_gate')}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.85rem',
                          padding: '1rem',
                          borderRadius: '10px',
                          border: `2px solid ${accessMode === 'strict_gate' ? '#b45309' : '#cbd5e1'}`,
                          background: accessMode === 'strict_gate' ? '#fffbeb' : '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <input
                          type="radio"
                          name="accessMode"
                          value="strict_gate"
                          checked={accessMode === 'strict_gate'}
                          onChange={() => handleAccessModeChange('strict_gate')}
                          style={{ marginTop: '0.2rem' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>
                              🔒 Strict Login Gate
                            </strong>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.45 }}>
                            Only the Homepage and FAQs are publicly visible. Clicking any learning module (Alphabet &amp; Syllables, reader, quizzes, worksheets, etc.) immediately opens the registration modal requiring the visitor to start their 14-day free trial.
                          </p>
                        </div>
                      </label>

                      {/* Option 3: Open Access */}
                      <label
                        onClick={() => handleAccessModeChange('open_access')}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.85rem',
                          padding: '1rem',
                          borderRadius: '10px',
                          border: `2px solid ${accessMode === 'open_access' ? '#4338ca' : '#cbd5e1'}`,
                          background: accessMode === 'open_access' ? '#eef2ff' : '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <input
                          type="radio"
                          name="accessMode"
                          value="open_access"
                          checked={accessMode === 'open_access'}
                          onChange={() => handleAccessModeChange('open_access')}
                          style={{ marginTop: '0.2rem' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>
                              🌐 Open Access (No Paywall Gate)
                            </strong>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.45 }}>
                            Entire curriculum and all tools are fully accessible without registration. Visitors can still optionally register to track points and streak.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Section 2: UPI Gateway & Payee Settings */}
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>📱</span> UPI Payment Gateway &amp; Direct Bank Account
                    </h3>
                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                      Configure the receiver UPI ID / VPA and merchant business name displayed on the payment modal and generated in the QR code for one-time ₹200 access passes (no auto-debit).
                    </p>

                    <form onSubmit={handleSaveUpiConfig}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                            Receiver UPI ID / VPA:
                          </label>
                          <input
                            type="text"
                            value={upiVpaInput}
                            onChange={(e) => setUpiVpaInput(e.target.value)}
                            placeholder="e.g. yourbusiness@okhdfcbank or upiid@upi"
                            required
                            style={{
                              width: '100%',
                              padding: '0.65rem 0.8rem',
                              borderRadius: '8px',
                              border: '1px solid #cbd5e1',
                              fontSize: '0.9rem',
                              fontFamily: 'monospace',
                            }}
                          />
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            Current active: <code>{upiVpa}</code>. Replace with your personal or business UPI handle.
                          </span>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                            Payee Business / Trust Name:
                          </label>
                          <input
                            type="text"
                            value={upiPayeeInput}
                            onChange={(e) => setUpiPayeeInput(e.target.value)}
                            placeholder="e.g. EdNet Learn Gurukul"
                            required
                            style={{
                              width: '100%',
                              padding: '0.65rem 0.8rem',
                              borderRadius: '8px',
                              border: '1px solid #cbd5e1',
                              fontSize: '0.9rem',
                            }}
                          />
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            Name shown inside GPay, PhonePe, or Paytm when the student opens the link.
                          </span>
                        </div>
                      </div>

                      {/* Live Intent String Preview */}
                      <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '0.25rem' }}>
                          LIVE UPI INTENT URL (USED FOR MOBILE APP 1-CLICK CHECKOUT &amp; QR CODE):
                        </div>
                        <code style={{ fontSize: '0.75rem', color: '#15803d', wordBreak: 'break-all' }}>
                          upi://pay?pa={upiVpaInput}&amp;pn={encodeURIComponent(upiPayeeInput)}&amp;am=200.00&amp;cu=INR&amp;tn=One-Time%20Access%20Pass
                        </code>
                      </div>

                      <button
                        type="submit"
                        style={{
                          background: '#15803d',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.65rem 1.25rem',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                        }}
                      >
                        <span>💾</span>
                        <span>Save UPI Configuration</span>
                      </button>
                    </form>
                  </div>

                  {/* Section 3: Custom Domain & Routing Tips */}
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>🌐</span> Custom Domain &amp; Hosting Deployment Tips
                    </h3>
                    <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.55 }}>
                      <p style={{ margin: '0 0 0.6rem 0' }}>
                        <strong>Connected your domain name?</strong> Here is what you need to know for smooth production operations:
                      </p>
                      <ul style={{ margin: '0 0 0.75rem 1.25rem', padding: 0 }}>
                        <li style={{ marginBottom: '0.4rem' }}>
                          <strong>Single-Page App (SPA) Rewrites:</strong> Because this is a Vite/React application, make sure your hosting server directs all URLs to <code>/index.html</code> so that browser refreshes do not 404.
                          <br />
                          <em style={{ fontSize: '0.78rem', color: '#64748b' }}>• Netlify: a <code>_redirects</code> file with <code>/*    /index.html   200</code></em>
                          <br />
                          <em style={{ fontSize: '0.78rem', color: '#64748b' }}>• Vercel: <code>"rewrites": [{`{"source": "/(.*)", "destination": "/"}`}]</code></em>
                          <br />
                          <em style={{ fontSize: '0.78rem', color: '#64748b' }}>• Apache/cPanel: <code>.htaccess</code> rewrite to <code>index.html</code></em>
                        </li>
                        <li style={{ marginBottom: '0.4rem' }}>
                          <strong>14-Day Free Trial:</strong> All new students who register get 14 days of unlimited access without paying upfront. When their trial concludes, the system invites them to pay one-time ₹200 via Razorpay (no auto-debit).
                        </li>
                        <li>
                          <strong>Payment Flow:</strong> When students transfer ₹200 via UPI and submit their 12-digit UTR, you will see it in the <strong>Payments &amp; UTRs</strong> tab where you can click <strong>Approve &amp; Activate</strong>.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BACKUP & PASSCODE */}
              {activeTab === 'backup' && (
                <div>
                  {/* Export */}
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>
                      💾 Export All Accounts &amp; Transactions
                    </h3>
                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#64748b' }}>
                      Download a complete, offline JSON snapshot of all student profiles, learning milestones, and payment histories.
                    </p>
                    <button
                      type="button"
                      onClick={handleExportData}
                      style={{
                        background: '#0f172a',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.65rem 1.25rem',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                      }}
                    >
                      📥 Download JSON Backup ({accounts.length} Accounts)
                    </button>
                  </div>

                  {/* Import */}
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>
                      📤 Restore &amp; Merge Accounts
                    </h3>
                    <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#64748b' }}>
                      Paste previously downloaded JSON data to merge or restore student accounts onto this device.
                    </p>
                    <textarea
                      rows={4}
                      value={importJsonText}
                      onChange={(e) => setImportJsonText(e.target.value)}
                      placeholder='Paste JSON accounts export here {"acc_123": { ... }}'
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        marginBottom: '0.75rem',
                      }}
                    />

                    {importResult && (
                      <div
                        style={{
                          marginBottom: '0.75rem',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: importResult.success ? '#15803d' : '#dc2626',
                        }}
                      >
                        {importResult.success
                          ? `✓ Successfully merged ${importResult.count} accounts!`
                          : `✕ Import failed: ${importResult.error}`}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleImportSubmit}
                      disabled={!importJsonText.trim()}
                      style={{
                        background: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.65rem 1.25rem',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: importJsonText.trim() ? 'pointer' : 'not-allowed',
                        opacity: importJsonText.trim() ? 1 : 0.6,
                      }}
                    >
                      Merge Accounts
                    </button>
                  </div>

                  {/* Passcode Changer */}
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>
                      🔑 Update Administrator Passcode
                    </h3>
                    <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#64748b' }}>
                      Change the master passcode used to unlock the Admin Portal.
                    </p>
                    <form onSubmit={handleUpdatePasscode} style={{ display: 'flex', gap: '0.5rem', maxWidth: '380px' }}>
                      <input
                        type="password"
                        placeholder="New passcode (min 4 chars)"
                        value={newPasscode}
                        onChange={(e) => setNewPasscode(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '0.65rem 0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.9rem',
                        }}
                      />
                      <button
                        type="submit"
                        disabled={!newPasscode.trim()}
                        style={{
                          background: '#0f172a',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.65rem 1rem',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: newPasscode.trim() ? 'pointer' : 'not-allowed',
                        }}
                      >
                        Update
                      </button>
                    </form>
                    {passcodeSuccess && (
                      <div style={{ color: '#15803d', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 700 }}>
                        {passcodeSuccess}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminModal;
