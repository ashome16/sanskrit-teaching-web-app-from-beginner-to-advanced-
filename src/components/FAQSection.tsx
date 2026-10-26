import React, { useState } from 'react';
import type { FAQItem } from '../types/auth';
import { useAuthStore } from '../store/authStore';
import { RAZORPAY_CTA_LABEL } from '../utils/razorpayCheckout';
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
      'Our curriculum is 100% aligned with the Central Board of Secondary Education (CBSE) syllabus for Class 7 Sanskrit, based directly on the prescribed NCERT textbook "दीपकम-७". Every chapter covers CBSE board exam requirements: shlokas with line-by-line anvaya (श्लोकान्वयः), word-meanings (शब्दार्थाः), sandhi-vichheda (सन्धि-विच्छेदः), vibhakti-pratyaya identification, short/long answer questions (प्रश्नोत्तराणि), and unseen passage comprehension. In addition, learners have full access to Sanskrit Alphabet (वर्णमाला) phonetics, Syllables (बारहखड़ी), Vyākaraṇa (Shabdarupani & Dhatarupani), and Vedic Mathematics (वैदिक-गणितम्).',
  },
  {
    id: 'faq-audio',
    category: 'features',
    question: 'How does the audio pronunciation and word analyzer work?',
    answer:
      'Tapping any Sanskrit word in a lesson immediately plays its authentic Sanskrit pronunciation and displays a trilingual definition (English, Hindi, and Sanskrit) along with grammatical roots (vibhakti, lakāra, dhātu). You can also play entire sentences or shlokas in sequence.',
  },
  {
    id: 'faq-bodhi-mentor',
    category: 'features',
    question: 'What is Bodhi? Is it AI-generated guidance, a human-supported service, or a guided lesson flow?',
    answer:
      'Bodhi (बोधिः) is a transparent 3-tier Gurukul mentor combining: (1) Guided Lesson Flow: An in-curriculum interactive guide providing slow, authentic native pronunciation, syllable chunk highlighting, and NCERT textbook assistance on every page; (2) Grounded AI Retrieval: Natural language question-answering across 150+ verified Pāṇinian grammar rules, Dhātupāṭha verb conjugations, and 16 Vedic Mathematics sutras with a strict Zero-Hallucination Policy (never invents non-shastric sutras); and (3) Human Acharya Mentorship: Direct human teacher support via WhatsApp at +91 9000335468 (Only WhatsApp) and email (care@ednetlearn.in) for line-by-line handwritten essay grading, CBSE board directives, and subjective doubt resolution.',
  },
  {
    id: 'faq-bodhi-scope-safeguards',
    category: 'features',
    question: 'What are Bodhi’s scope, limitations, and safety safeguards for young learners?',
    answer:
      'Scope: Bodhi accurately explains 7 Vibhaktis, 5 Lakāras, word-by-word NCERT anvaya, and step-by-step Vedic mental arithmetic. Limitations: Bodhi does not automatically grade subjective handwritten essays (these are escalated to human Acharyas on WhatsApp at +91 9000335468), does not replace school teachers, and does not engage in unconstrained open-ended conversation. Safeguards: 100% ad-free, COPPA/GDPR-K child-privacy compliant (zero personal data logging or behavioral ad profiling), strict Pāṇinian cross-verification, and one-tap escalation to certified human educators.',
  },
  {
    id: 'faq-samskrit-sanskrit',
    category: 'curriculum',
    question: 'Is Samskrit the same as Sanskrit? What does Samskritam mean?',
    answer:
      'Yes! "Samskrit" (संस्कृत / Saṃskṛtam) is the authentic phonetic transliteration of the language’s original name, meaning "refined, perfected, well-formed, and consecrated". While English historically anglicized the word as "Sanskrit", both spellings refer to the exact same classical Indian language. Our platform teaches classical and contemporary Samskrit (Sanskrit), covering Devanagari script, Pāṇinian vyākaraṇa grammar, spoken Samskritam (संभाषणम्), and NCERT school curricula.',
  },
];

interface FAQSectionProps {
  /** Unused: FAQ sits at the bottom of home, which carries no sign-up / trial pitch. */
  onOpenRegister?: () => void;
}

const FAQSection: React.FC<FAQSectionProps> = () => {
  const [openItem, setOpenItem] = useState<string | null>('faq-trial');
  const { currentUser, openPaymentModal, getTrialDaysRemaining } = useAuthStore();
  const trialActive =
    !!currentUser &&
    currentUser.planStatus === 'trial' &&
    typeof currentUser.trialEndsAt === 'number' &&
    currentUser.trialEndsAt > Date.now();
  const trialDaysLeft = getTrialDaysRemaining();
  // Pay CTA only once the trial has ended (no subscribe pitch for guests or mid-trial learners on home).
  const trialExpired = !!currentUser && currentUser.planStatus === 'expired';
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
          <div className="faq-pricing-badge">💡 Plans &amp; Access</div>
          <h3 className="faq-pricing-headline">2 Weeks Free Access for All New Learners</h3>
          <p className="faq-pricing-text">
            Explore all 15 Deepakam chapters, interactive audio, and grammar shelves without any upfront commitment.
          </p>
          <div className="faq-pricing-rate-row">
            <span className="faq-pricing-rate">₹200 <small>once</small></span>
            <span className="faq-pricing-rate-sub">after 14-day free access · no auto-debit</span>
          </div>
          <div className="faq-pricing-actions">
            {trialActive && (
              <button
                type="button"
                className="faq-pricing-pay-cta"
                onClick={() => openPaymentModal()}
              >
                {`🎉 Trial active until ${trialEndsLabel}`}
              </button>
            )}
            {trialExpired && (
              <button
                type="button"
                className="faq-pricing-pay-cta"
                onClick={() => openPaymentModal()}
              >
                {RAZORPAY_CTA_LABEL}
              </button>
            )}
            {trialExpired && (
              <p
                style={{
                  margin: 0,
                  flex: '1 1 16rem',
                  maxWidth: '22rem',
                  fontSize: '0.8rem',
                  color: '#475569',
                  lineHeight: 1.45,
                  fontWeight: 600,
                  textAlign: 'left',
                }}
              >
                UPI · Cards · Netbanking · Secured by Razorpay
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
                <span className="faq-contact-item-label">WhatsApp (Only WhatsApp)</span>
                <a
                  href="https://wa.me/919000335468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faq-contact-item-link"
                  style={{ color: '#15803d', fontWeight: 800 }}
                  title="Message Gurukul Support on WhatsApp (+91 9000335468)"
                >
                  +91 9000335468
                </a>
                <small className="faq-contact-item-hint">Only WhatsApp · Quick onboarding, payment &amp; academic help</small>
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
