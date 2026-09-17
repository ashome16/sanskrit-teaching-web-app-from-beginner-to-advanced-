import React, { useState } from 'react';
import type { FAQItem } from '../types/auth';
import { useAuthStore } from '../store/authStore';
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
    question: 'What is the subscription plan after the 2-week trial?',
    answer:
      'After your 14-day free access period, our plan is just ₹200 / month. This gives you continued unlimited access to all chapters, ongoing curriculum updates, interactive exercises, Vedic Mathematics (वैदिक-गणितम्), and your personalized learning streak and progress tracking.',
  },
  {
    id: 'faq-payment-methods',
    category: 'trial_pricing',
    question: 'What payment methods are supported for the ₹200/month plan?',
    answer:
      'We accept all major convenient payment methods: UPI (instant QR scan or VPA payment with Google Pay, PhonePe, Paytm, BHIM, Cred, and any bank UPI app), Apple Pay ( Pay on iOS and macOS Safari), and Google Pay (GPay). Payments are activated immediately upon confirmation with instant digital invoice receipts.',
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
    question: 'What curriculum and grades are covered?',
    answer:
      'We currently feature the complete NCERT Class 7 Sanskrit curriculum (दीपकम-७) across 15 chapters and appendices, along with fundamental Varṇamālā phonetics, बारहखड़ी audio matrix, comprehensive Vyākaraṇa (Shabdarupani noun declensions & Dhatarupani verb conjugations), and Vedic Mathematics (वैदिक-गणितम्). Class 6 and Class 8 materials are actively in development.',
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
  const { currentUser, openPaymentModal } = useAuthStore();

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
            Everything you need to know about our 2-week free trial, ₹200/month plan, and features.
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
            <span className="faq-pricing-rate">₹200 <small>/ month</small></span>
            <span className="faq-pricing-rate-sub">billed monthly after 14-day free access</span>
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
              💳 Subscribe / Pay ₹200 via UPI · Apple Pay · GPay
            </button>
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

        {/* Dummy Contact Info Card */}
        <div className="faq-contact-card">
          <div className="faq-contact-header">
            <span className="faq-contact-icon">📞</span>
            <div>
              <h3 className="faq-contact-title">Need Assistance or Have Questions?</h3>
              <p className="faq-contact-subtitle">
                Contact our Sanskrit learning support team. <em>(Dummy contact info — will be edited later)</em>
              </p>
            </div>
          </div>

          <div className="faq-contact-grid">
            <div className="faq-contact-item">
              <span className="faq-contact-item-icon">📧</span>
              <div className="faq-contact-item-content">
                <span className="faq-contact-item-label">Email Support</span>
                <span className="faq-contact-item-val">support@sanskrit-learning.org</span>
              </div>
            </div>

            <div className="faq-contact-item">
              <span className="faq-contact-item-icon">💬</span>
              <div className="faq-contact-item-content">
                <span className="faq-contact-item-label">WhatsApp / Phone</span>
                <span className="faq-contact-item-val">+91 98765 43210</span>
              </div>
            </div>

            <div className="faq-contact-item">
              <span className="faq-contact-item-icon">📍</span>
              <div className="faq-contact-item-content">
                <span className="faq-contact-item-label">Office Address</span>
                <span className="faq-contact-item-val">
                  Sanskrit Shiksha Kendra, 108 Shanti Marg, New Delhi, India 110001
                </span>
              </div>
            </div>

            <div className="faq-contact-item">
              <span className="faq-contact-item-icon">⏰</span>
              <div className="faq-contact-item-content">
                <span className="faq-contact-item-label">Support Hours</span>
                <span className="faq-contact-item-val">Mon – Sat: 9:00 AM – 6:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
