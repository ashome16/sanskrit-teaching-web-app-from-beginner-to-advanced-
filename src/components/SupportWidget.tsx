import React, { useState } from 'react';
import '../styles/support-widget.css';

interface SupportWidgetProps {
  onOpenFAQ?: () => void;
  onOpenWorksheets?: () => void;
}

export const SupportWidget: React.FC<SupportWidgetProps> = ({
  onOpenFAQ,
  onOpenWorksheets,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedText(email);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <aside className="support-widget" aria-label="Student Support Desk">
      {!isOpen ? (
        <button
          type="button"
          className="support-widget-trigger"
          onClick={() => setIsOpen(true)}
          title="Open Learner Care Desk"
          aria-expanded="false"
        >
          <span className="support-trigger-icon">💬</span>
          <span className="support-trigger-text">Learner Care Desk</span>
        </button>
      ) : (
        <div className="support-widget-card" role="dialog" aria-label="Learner Support Desk">
          <div className="support-card-header">
            <div className="support-card-title-row">
              <span className="support-card-icon">🎓</span>
              <div>
                <h4 className="support-card-title">Gurukul Learner Desk</h4>
                <span className="support-card-subtitle">CBSE &amp; NCERT Academic Help</span>
              </div>
            </div>
            <button
              type="button"
              className="support-card-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close support desk"
            >
              ×
            </button>
          </div>

          <div className="support-card-body">
            <p className="support-card-desc">
              Have questions regarding chapter lessons, homework worksheets, or subscription plans? Our academic desk is here to help!
            </p>

            <div className="support-channels">
              <div className="support-channel-item">
                <span className="channel-icon">📧</span>
                <div className="channel-details">
                  <strong>Student &amp; Parent Care</strong>
                  <a href="mailto:care@ednetlearn.in">care@ednetlearn.in</a>
                </div>
                <button
                  type="button"
                  className="channel-action-btn"
                  onClick={() => copyEmail('care@ednetlearn.in')}
                >
                  {copiedText === 'care@ednetlearn.in' ? '✓' : 'Copy'}
                </button>
              </div>

              <div className="support-channel-item">
                <span className="channel-icon">🏛️</span>
                <div className="channel-details">
                  <strong>Academic Administration</strong>
                  <a href="mailto:admin@ednetlearn.in">admin@ednetlearn.in</a>
                </div>
                <button
                  type="button"
                  className="channel-action-btn"
                  onClick={() => copyEmail('admin@ednetlearn.in')}
                >
                  {copiedText === 'admin@ednetlearn.in' ? '✓' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="support-quick-links">
              {onOpenFAQ && (
                <button
                  type="button"
                  className="support-quick-btn"
                  onClick={() => {
                    onOpenFAQ();
                    setIsOpen(false);
                  }}
                >
                  ❓ 14-Day Free Trial &amp; Plans
                </button>
              )}
              {onOpenWorksheets && (
                <button
                  type="button"
                  className="support-quick-btn"
                  onClick={() => {
                    onOpenWorksheets();
                    setIsOpen(false);
                  }}
                >
                  📑 Printable Worksheets
                </button>
              )}
            </div>

            <div className="support-card-footer">
              <span>⏰ Mon–Sat 9am–7pm IST</span>
              <span className="support-secure-badge">🛡️ CBSE Board Aligned</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SupportWidget;
