import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import '../styles/admin-modal.css';

const AdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    closeAdminModal,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    getAllAccountsList,
    setUserPlanStatus,
    deleteUserAccountByAdmin,
    approveTransaction,
    rejectTransaction,
    exportAllAccounts,
    importAccounts,
    setAdminPasscode,
  } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'payments' | 'backup'>('overview');
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Passcode Change
  const [newPasscode, setNewPasscode] = useState('');
  const [passcodeSuccess, setPasscodeSuccess] = useState<string | null>(null);

  // Import JSON state
  const [importJsonText, setImportJsonText] = useState('');
  const [importResult, setImportResult] = useState<{ success: boolean; count: number; error?: string } | null>(null);

  if (!isAdminModalOpen) return null;

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const success = adminLogin(passcodeInput);
    if (!success) {
      setAuthError('Incorrect administrator passcode. Please try again.');
    } else {
      setPasscodeInput('');
    }
  };

  const accounts = getAllAccountsList();

  // Metrics
  const totalUsers = accounts.length;
  const activeSubscribers = accounts.filter((a) => a.profile.planStatus === 'active').length;
  const trialUsers = accounts.filter((a) => a.profile.planStatus === 'trial').length;
  const expiredUsers = accounts.filter((a) => a.profile.planStatus === 'expired').length;
  const estMonthlyRevenue = activeSubscribers * 200;

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
                Please enter the administrator passcode to unlock learner management, payment verification, and data export tools.
              </p>

              <form onSubmit={handleAdminAuthSubmit}>
                <input
                  type="password"
                  className="admin-passcode-input"
                  placeholder="••••••••"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  autoFocus
                />

                {authError && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>
                    {authError}
                  </div>
                )}

                <button type="submit" className="admin-login-submit-btn">
                  Authenticate &amp; Enter Portal ➔
                </button>
              </form>

              <div style={{ marginTop: '1.5rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                Default key: <code>ednetadmin2026</code> (changeable in portal settings)
              </div>
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
                className={`admin-nav-tab${activeTab === 'backup' ? ' active' : ''}`}
                onClick={() => setActiveTab('backup')}
              >
                💾 Backup &amp; Settings
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
                      <span className="admin-metric-label">Est. Monthly MRR</span>
                      <span className="admin-metric-value" style={{ color: '#2563eb' }}>
                        ₹{estMonthlyRevenue}
                      </span>
                      <span className="admin-metric-sub">₹200 / student pass</span>
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
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Search students by name, email, or username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.65rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                      }}
                    />
                    <span style={{ fontSize: '0.85rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                      Showing {filteredAccounts.length} of {accounts.length}
                    </span>
                  </div>

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

              {/* TAB 4: BACKUP & SETTINGS */}
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
