import React, { useState } from 'react';
import type { FAQItem } from '../types/auth';
import { useAuthStore } from '../store/authStore';
import { RAZORPAY_CTA_LABEL, RAZORPAY_TRUST_NOTICE } from '../utils/razorpayCheckout';
import '../styles/faq-section.css';

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-trial',
    category: 'trial_pricing',
    question: 'How does the 2-week free access trial work?',
    answer:
      'Every new learner who creates an account receives 14 days (2 weeks) of 100% free access to all platform features: full Sanskrit lessons across all 15 Deepakam chapters, instant word-by-word lookups, native audio pronunciations, all 7 Jodo tile puzzle shelves, and grammar declension tables. No payment is required to start your 2-week trial.',
  },
  {
    id: 'faq-pricing',
    category: 'trial_pricing',
    question: 'What is the one-time ₹200 plan after the 2-week trial?',
    answer:
      'After your 14-day free access period, pay a one-time ₹200 for continued access (30 days). Renew anytime with another one-time payment. This gives you continued unlimited access to all chapters, ongoing curriculum updates, interactive exercises, Vedic Mathematics (वैदिक-गणितम्), and your personalized learning streak and progress tracking.',
  },
  {
    id: 'faq-payment-methods',
    category: 'trial_pricing',
    question: 'What payment methods are supported for the one-time ₹200 plan?',
    answer:
      'Pay ₹200 once via Razorpay Standard Checkout (UPI, cards, netbanking) — no auto-debit. Access lasts 30 days; renew anytime with another one-time payment. As a backup, you can also pay by UPI ID / QR and submit your 12-digit UTR for manual verification.',
  },
  {
    id: 'faq-account',
    category: 'account',
    question: 'Can I edit or delete my profile at any time?',
    answer:
      'Yes! You have full control over your profile. Tap your profile avatar in the top navigation bar to open your Profile Card. Click "Edit Profile" to change your name, avatar icon, grade level, and learning interests. If you wish to delete your account, click "Delete Profile & Account" in the danger zone, confirm your password, and your profile and learning records will be permanently removed.',
  },
  {
    id: 'faq-curriculum',
    category: 'curriculum',
    question: 'How is the platform aligned with the CBSE Board Exam and NCERT curriculum?',
    answer:
      'Our curriculum is 100% aligned with the Central Board of Secondary Education (CBSE) syllabus for Class 7 Sanskrit, based directly on the prescribed NCERT textbook "दीपकम-७". Every chapter covers CBSE board exam requirements: shlokas with line-by-line anvaya (श्लोकान्वयः), word-meanings (शब्दार्थाः), sandhi-vichheda (सन्धि-विच्छेदः), vibhakti-pratyaya identification, short/long answer questions (प्रश्नोत्तराणि), and unseen passage comprehension. In addition, learners have full access to Varṇamālā phonetics, बारहखड़ी, Vyākaraṇa (Shabdarupani & Dhatarupani), and Vedic Mathematics (वैदिक-गणितम्).',
  },
  {
    id: 'faq-audio',
    category: 'features',
    question: 'How does the audio pronunciation and word analyzer work?',
    answer:
      'Tapping any Sanskrit word in a lesson immediately plays its authentic Sanskrit pronunciation and displays a trilingual definition (English, Hindi, and Sanskrit) along with grammatical roots (vibhakti, lakāra, dhātu). You can also play entire sentences or shlokas in sequence.',
  },
];

interface FAQSectionProps {
  onOpenRegister?: () => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ onOpenRegister }) => {
  const [openItem, setOpenItem] = useState<string | null>('faq-trial');
  const { currentUser, openPaymentModal, getTrialDaysRemaining } = useAuthStore();
  const trialActive =
    !!currentUser &&
    currentUser.planStatus === 'trial' &&
    typeof currentUser.trialEndsAt === 'number' &&
    currentUser.trialEndsAt > Date.now();
  const trialDaysLeft = getTrialDaysRemaining();
  const trialEndsLabel =
    trialActive && currentUser?.trialEndsAt
      ? new Date(currentUser.trialEndsAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : '';

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq-section">
      <div className="faq-container">
        {/* Section Header */}
        <div className="faq-header">
          <span className="faq-kicker">प्रश्नोत्तरी · FAQ & Support</span>
          <h2 className="faq-title">Frequently Asked Questions & Pricing</h2>
          <p className="faq-subtitle">
            Everything you need to know about our 2-week free trial, one-time ₹200 access, and features.
          </p>
        </div>

        {/* Pricing & Trial Callout Banner */}
        <div className="faq-pricing-callout">
          <div className="faq-pricing-badge">🎉 Special Launch Offer</div>
          <h3 className="faq-pricing-headline">2 Weeks Free Access for All New Learners</h3>
          <p className="faq-pricing-text">
            Explore all 15 Deepakam chapters, interactive audio, and grammar shelves without any upfront commitment.
          </p>
          <div className="faq-pricing-rate-row">
            <span className="faq-pricing-rate">₹200 <small>once</small></span>
            <span className="faq-pricing-rate-sub">after 14-day free access · no auto-debit</span>
          </div>
          <div className="faq-pricing-actions">
            {!currentUser && onOpenRegister && (
              <button type="button" className="faq-pricing-cta" onClick={onOpenRegister}>
                Create Free Account & Start 2-Week Trial ➔
              </button>
            )}
            <button
              type="button"
              className="faq-pricing-pay-cta"
              onClick={openPaymentModal}
            >
              {trialActive
                ? `🎉 Trial active until ${trialEndsLabel} · Subscribe after trial`
                : RAZORPAY_CTA_LABEL}
            </button>
            {!trialActive && (
              <p
                style={{
                  margin: 0,
                  flex: '1 1 16rem',
                  maxWidth: '26rem',
                  fontSize: '0.8rem',
                  color: '#475569',
                  lineHeight: 1.45,
                  fontWeight: 600,
                  textAlign: 'left',
                }}
              >
                {RAZORPAY_TRUST_NOTICE}
              </p>
            )}
            {trialActive && (
              <p style={{ margin: '0.55rem 0 0', fontSize: '0.82rem', color: '#92400e', fontWeight: 600 }}>
                Your free trial is on ({trialDaysLeft} day{trialDaysLeft === 1 ? '' : 's'} left). One-time Razorpay pay opens when the trial ends (admin can preview).
              </p>
            )}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="faq-accordion">
          {FAQ_DATA.map((item) => {
            const isOpen = openItem === item.id;
            return (
              <div
                key={item.id}
                className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-chevron">{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer-panel">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Official Customer Support Card */}
        <div className="faq-contact-card">
          <div className="faq-contact-header">
            <img src="/logo.jpg" alt="EdNet Learn Gurukul support for online Sanskrit and Vedic Math learners" className="faq-contact-logo" />
            <div>
              <h3 className="faq-contact-title">EdNet Learn Gurukul · Customer &amp; Student Support</h3>
              <p className="faq-contact-subtitle">
                Have questions regarding the CBSE Class 7 syllabus, Vedic Mathematics, subscription, or technical assistance? Connect directly with our team.
              </p>
            </div>
          </div>

          <div className="faq-contact-grid">
            <div className="faq-contact-item">
              <span className="faq-contact-item-icon">📧</span>
              <div className="faq-contact-item-content">
                <span className="faq-contact-item-label">Learner Care &amp; Support</span>
                <a href="mailto:care@ednetlearn.in" className="faq-contact-item-link">
                  care@ednetlearn.in
                </a>
                <small className="faq-contact-item-hint">Student assistance, chapter questions, account support</small>
              </div>
            </div>

            <div className="faq-contact-item">
              <span className="faq-contact-item-icon">🏛️</span>
              <div className="faq-contact-item-content">
                <span className="faq-contact-item-label">Administration &amp; Billing</span>
                <a href="mailto:admin@ednetlearn.in" className="faq-contact-item-link">
                  admin@ednetlearn.in
                </a>
                <small className="faq-contact-item-hint">Invoicing, school subscriptions, official inquiries</small>
              </div>
            </div>

            <div className="faq-contact-item">
              <span className="faq-contact-item-icon">💬</span>
              <div className="faq-contact-item-content">
                <span className="faq-contact-item-label">WhatsApp / Phone</span>
                <span className="faq-contact-item-val">+91 98765 43210</span>
                <small className="faq-contact-item-hint">Quick payment &amp; onboarding assistance</small>
              </div>
            </div>

            <div className="faq-contact-item">
              <span className="faq-contact-item-icon">⏰</span>
              <div className="faq-contact-item-content">
                <span className="faq-contact-item-label">Support Hours</span>
                <span className="faq-contact-item-val">Mon – Sat: 9:00 AM – 6:00 PM IST</span>
                <small className="faq-contact-item-hint">Emails monitored daily with prompt resolution</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
