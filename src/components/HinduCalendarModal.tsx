import React, { useState, useEffect } from 'react';
import {
  getHinduDate,
  KARTIKA_CALENDAR_DAYS,
  toDevanagariDigits,
  type HinduDateInfo,
} from '../utils/hinduCalendar';
import '../styles/hindu-calendar.css';

interface HinduCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HinduCalendarModal: React.FC<HinduCalendarModalProps> = ({ isOpen, onClose }) => {
  const [hinduDate, setHinduDate] = useState<HinduDateInfo>(() => getHinduDate());

  // Update live every 30 seconds while modal is open
  useEffect(() => {
    if (!isOpen) return;
    setHinduDate(getHinduDate());
    const interval = setInterval(() => {
      setHinduDate(getHinduDate());
    }, 30000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="hcm-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="hcm-title">
      <div className="hcm-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="hcm-header">
          <div className="hcm-header-title-box">
            <span className="hcm-header-om" aria-hidden="true">🕉️</span>
            <div>
              <h2 id="hcm-title" className="hcm-header-title">
                भारतीय पञ्चाङ्गम् · Vedic Hindu Calendar
              </h2>
              <p className="hcm-header-sub">
                Lunisolar astronomical calendar with Vikram Samvat, Tithi, Nakshatra &amp; Vedic time
              </p>
            </div>
          </div>
          <button
            type="button"
            className="hcm-close-btn"
            onClick={onClose}
            aria-label="Close Hindu Calendar"
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="hcm-body">
          {/* Today's Panchang Box */}
          <div className="hcm-panchang-card">
            <div className="hcm-pc-top">
              <span className="hcm-pc-badge">
                🌟 अद्यतन-पञ्चाङ्गम् · Today’s Authentic Panchang
              </span>
              <span className="hcm-pc-ist">
                🕒 {hinduDate.timeIST} (Indian Standard Time)
              </span>
            </div>

            <div className="hcm-grid-2col">
              {/* Vikram Samvat */}
              <div className="hcm-cell">
                <span className="hcm-cell-label">संवत्सरः (Samvat)</span>
                <span className="hcm-cell-val-sa">
                  विक्रम संवत् {hinduDate.vikramSamvatSa}
                </span>
                <span className="hcm-cell-val-en">
                  Vikram Samvat {hinduDate.vikramSamvat} · {hinduDate.samvatsara}
                </span>
              </div>

              {/* Shaka Samvat */}
              <div className="hcm-cell">
                <span className="hcm-cell-label">शक संवत् (Shaka Era)</span>
                <span className="hcm-cell-val-sa">
                  शक संवत् {hinduDate.shakaSamvatSa}
                </span>
                <span className="hcm-cell-val-en">
                  Shaka Samvat {hinduDate.shakaSamvat} (Indian National Calendar)
                </span>
              </div>

              {/* Masa & Paksha */}
              <div className="hcm-cell">
                <span className="hcm-cell-label">मासः एवं पक्षः (Month &amp; Fortnight)</span>
                <span className="hcm-cell-val-sa">
                  {hinduDate.masa} ({hinduDate.paksha})
                </span>
                <span className="hcm-cell-val-en">
                  {hinduDate.masaEn} · {hinduDate.pakshaEn}
                </span>
              </div>

              {/* Tithi */}
              <div className="hcm-cell">
                <span className="hcm-cell-label">तिथिः (Lunar Day)</span>
                <span className="hcm-cell-val-sa">
                  {hinduDate.tithi} ({toDevanagariDigits(hinduDate.tithiNum)})
                </span>
                <span className="hcm-cell-val-en">
                  {hinduDate.tithiEn} (Day {hinduDate.tithiNum} of Fortnight)
                </span>
              </div>

              {/* Vara */}
              <div className="hcm-cell">
                <span className="hcm-cell-label">वारः (Weekday &amp; Planetary Lord)</span>
                <span className="hcm-cell-val-sa">
                  {hinduDate.vara}
                </span>
                <span className="hcm-cell-val-en">
                  {hinduDate.varaEn} · चन्द्र-दिनम् (Moon)
                </span>
              </div>

              {/* Nakshatra */}
              <div className="hcm-cell">
                <span className="hcm-cell-label">नक्षत्रम् (Lunar Constellation)</span>
                <span className="hcm-cell-val-sa">
                  {hinduDate.nakshatra}
                </span>
                <span className="hcm-cell-val-en">
                  {hinduDate.nakshatraEn} (Agni Devatā)
                </span>
              </div>

              {/* Ritu & Ayana */}
              <div className="hcm-cell">
                <span className="hcm-cell-label">ऋतुः एवं अयनम् (Season &amp; Solstice)</span>
                <span className="hcm-cell-val-sa">
                  {hinduDate.ritu} · {hinduDate.ayana}
                </span>
                <span className="hcm-cell-val-en">
                  {hinduDate.rituEn} · {hinduDate.ayanaEn}
                </span>
              </div>

              {/* Traditional Units (Ghatikas) */}
              <div className="hcm-cell">
                <span className="hcm-cell-label">पारम्परिक-घटिकाः (Vedic Time)</span>
                <span className="hcm-cell-val-sa">
                  {toDevanagariDigits(hinduDate.ghatika)} घटी {toDevanagariDigits(hinduDate.pala)} पल
                </span>
                <span className="hcm-cell-val-en">
                  {hinduDate.ghatika} Ghati {hinduDate.pala} Pala from Sunrise (1 Ghati = 24m)
                </span>
              </div>
            </div>
          </div>

          {/* Traditional Vedic Time Keeping Strip */}
          <div className="hcm-vedic-time-strip">
            <div className="hcm-vt-item">
              <span className="hcm-vt-label">प्रहरः (Prahara)</span>
              <span className="hcm-vt-val">🕒 {hinduDate.prahara}</span>
            </div>
            <div className="hcm-vt-item">
              <span className="hcm-vt-label">मुहूर्तः (Current Muhurta)</span>
              <span className="hcm-vt-val">✨ {hinduDate.muhurta}</span>
            </div>
            <div className="hcm-vt-item">
              <span className="hcm-vt-label">अहोरात्र-मानम् (Day-Night Ratio)</span>
              <span className="hcm-vt-val">६० घटिकाः (२४ होराः)</span>
            </div>
          </div>

          {/* Monthly Calendar View (Kartika Masa / Deepawali Season) */}
          <div className="hcm-calendar-section">
            <div className="hcm-cal-header">
              <div>
                <h3 className="hcm-cal-title">
                  📅 कार्तिक-मास कैलेण्डर · Kārtika Calendar (Vikram Samvat {hinduDate.vikramSamvatSa})
                </h3>
                <span className="hcm-cal-sub">
                  30-Day Lunisolar Grid with Sacred Deepawali Parvas &amp; Tithi Transits
                </span>
              </div>
              <a
                href="https://www.drikpanchang.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hcm-drik-link"
                title="Open full astronomical ephemeris on Drik Panchang"
              >
                <span>🌐 Drik Panchang ➔</span>
              </a>
            </div>

            <div className="hcm-cal-table-wrap">
              <table className="hcm-cal-table">
                <thead>
                  <tr>
                    <th>तिथिः (Tithi)</th>
                    <th>पक्षः (Fortnight)</th>
                    <th>दिनाङ्कः (Gregorian)</th>
                    <th>दिनम् (Day)</th>
                    <th>पर्व एवं उत्सवः (Festival / Sacred Event)</th>
                  </tr>
                </thead>
                <tbody>
                  {KARTIKA_CALENDAR_DAYS.map((day, idx) => (
                    <tr
                      key={idx}
                      className={`hcm-cal-row${day.isToday ? ' is-today' : ''}${day.festival ? ' has-festival' : ''}`}
                    >
                      <td className="hcm-tithi-badge">
                        {day.tithiName}
                        {day.isToday && <span className="hcm-today-indicator">आज · Today</span>}
                      </td>
                      <td>{day.paksha === 'शुक्ल' ? 'शुक्लपक्षः' : 'कृष्णपक्षः'}</td>
                      <td>
                        <strong>{day.gregorianDay} {day.gregorianMonthName}</strong>
                      </td>
                      <td>{day.weekday}</td>
                      <td>
                        {day.festival ? (
                          <span className="hcm-festival-badge">
                            <span>🪔</span>
                            <span>{day.festivalSa || day.festival}</span>
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Actions & Shastric Note */}
          <div className="hcm-footer-actions">
            <div className="hcm-explain-note">
              <strong>📖 वेदान्ग-ज्योतिष काल-चक्रः (Vedāṅga Jyotiṣa):</strong> The Indian lunisolar calendar synchronizes the 365.25-day solar year with the 354-day lunar year via mathematical 5-year Yugas and intercalary leap months (Adhika Māsa), remaining unbroken for millennia.
            </div>
            <a
              href="https://www.drikpanchang.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hcm-drik-link"
            >
              <span>🌐 Open Interactive Drik Panchang ➔</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HinduCalendarModal;
