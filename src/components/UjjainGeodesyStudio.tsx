import React, { useState } from 'react';

interface UjjainStudioProps {
  onPlayAudio?: (term: string) => void;
}

export const UjjainGeodesyStudio: React.FC<UjjainStudioProps> = ({ onPlayAudio }) => {
  const [activeTab, setActiveTab] = useState<'shanku' | 'deshantara' | 'dongla' | 'trig'>('shanku');

  // 1. Shanku Latitude State
  // Default: Ujjain equinoctial noon shadow ~ 5.14 Angulas for ~ 23.18° N
  const [shadowLength, setShadowLength] = useState<number>(5.14);

  // 2. Deshantara Longitude State
  // Time difference in minutes from Ujjain (+ = East, - = West)
  // Default: Pataliputra (Patna) ~ +37.3 minutes (~ 9.3° East of Ujjain)
  const [timeDiffMin, setTimeDiffMin] = useState<number>(37.3);
  const [observerLatDeg, setObserverLatDeg] = useState<number>(25.6);

  // 3. Dongla Precession State
  // Year slider: -300 BCE to 2026 CE
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  // 4. Trigonometry State
  const [angleDeg, setAngleDeg] = useState<number>(30);

  // --- Calculations for Shanku Latitude ---
  // Gnomon height h = 12 Angulas
  const gnomonHeight = 12;
  const hypotenuse = Math.sqrt(Math.pow(gnomonHeight, 2) + Math.pow(shadowLength, 2));
  const calculatedLatRad = Math.atan(shadowLength / gnomonHeight);
  const calculatedLatDeg = (calculatedLatRad * 180) / Math.PI;
  // Classical Indian R = 3438' arcminutes
  const R_SIN = 3438;
  const akshaJya = Math.round((R_SIN * shadowLength) / hypotenuse);
  const lambaJya = Math.round((R_SIN * gnomonHeight) / hypotenuse);

  // --- Calculations for Deshantara Longitude ---
  // 1 day = 60 Ghatikas = 1440 minutes = 360 degrees
  // 1 Ghatika = 24 minutes = 6 degrees
  // 1 minute = 0.25 degrees = 15 arcminutes
  const ghatikas = timeDiffMin / 24;
  const deltaLongDeg = timeDiffMin / 4;
  // Earth's radius / circumference (Surya Siddhanta values)
  // Equatorial circumference C0 ≈ 5,026.5 Yojanas (approx 40,075 km)
  const C0_YOJANAS = 5026.5;
  const C0_KM = 40075;
  const cosLat = Math.cos((observerLatDeg * Math.PI) / 180);
  const localCircYojanas = C0_YOJANAS * cosLat;
  const localCircKm = C0_KM * cosLat;
  const deshantaraYojanas = (Math.abs(ghatikas) / 60) * localCircYojanas;
  const deshantaraKm = (Math.abs(ghatikas) / 60) * localCircKm;

  // --- Calculations for Precession & Dongla Drift ---
  // Rate: ~14.5 meters southward drift per year of the Tropic of Cancer
  // In 300 BCE, Tropic of Cancer was at ~23° 43' N (passing through Ujjain / Mahakaleshwar at 23° 10' N)
  // Distance from Mahakaleshwar (23.18° N) to Dongla (23.44° N) is ~29-30 km.
  const yearsFromAntiquity = selectedYear - (-300);
  const driftKm = (yearsFromAntiquity * 0.0145).toFixed(1);
  const currentTropicLat = (23.72 - (yearsFromAntiquity * 0.0145) / 111).toFixed(3);

  // --- Calculations for Trig (Jya vs Chord) ---
  const angleRad = (angleDeg * Math.PI) / 180;
  const indianJya = Math.sin(angleRad); // normalized to 1
  const indianKotijya = Math.cos(angleRad);
  const greekChord = 2 * Math.sin(angleRad); // crd(2θ) for comparison

  const handlePlay = (term: string) => {
    if (onPlayAudio) onPlayAudio(term);
  };

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.5rem',
        margin: '2rem 0',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
      }}
    >
      {/* Studio Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#0284c7',
            }}
          >
            Interactive Ancient Geodesy &amp; Astronomy Studio
          </span>
          <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
            मध्यरेखा (Madhya-Rekhā) · The Ujjain Prime Meridian &amp; Coordinate Engine
          </h3>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#64748b' }}>
            Explore 12-Aṅgula Śaṅku Latitude, Eclipse-Based Deśāntara Longitude, Doṅglā Zero Shadow &amp; Jyā Trigonometry
          </p>
        </div>

        {/* Tab Controls */}
        <div
          style={{
            display: 'flex',
            gap: '0.35rem',
            background: '#f1f5f9',
            padding: '0.35rem',
            borderRadius: '10px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'shanku', label: '📐 शङ्कु (Śaṅku Gnomon)', sub: 'Latitude (अक्षांश)' },
            { id: 'deshantara', label: '🌖 देशान्तर (Deśāntara)', sub: 'Longitude (रेखांश)' },
            { id: 'dongla', label: '☀️ दोङ्गला (Doṅglā)', sub: 'Zero Shadow & Drift' },
            { id: 'trig', label: '⭕ ज्या (Jyā vs Chord)', sub: 'Sine Trigonometry' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? '#0284c7' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          TAB 1: ŚAṄKU LATITUDE CALCULATOR (अक्षांश / पलभा)
         ========================================================================= */}
      {activeTab === 'shanku' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Controls & Classical Theory */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '12px',
                padding: '1rem',
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem', color: '#0369a1', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>द्वादशाङ्गुल-शङ्कुः (The 12-Finger Gnomon)</span>
                <button
                  type="button"
                  onClick={() => handlePlay('शङ्कुः')}
                  style={{ background: '#ffffff', border: '1px solid #bae6fd', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', padding: '0.15rem 0.4rem', color: '#0369a1' }}
                  title="Pronounce Śaṅku"
                >
                  🔊 शङ्कुः
                </button>
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#334155', lineHeight: 1.5 }}>
                At solar noon on the equinox (<em>Viṣuvat</em>), the Sun crosses the celestial equator. The shadow length (
                <strong>Palabhā / Akṣabhā</strong>, <em>s₀</em>) of a standardized 12-Aṅgula vertical rod directly determines the observer’s terrestrial latitude:
              </p>
              <div
                style={{
                  margin: '0.75rem 0 0',
                  padding: '0.5rem 0.75rem',
                  background: '#ffffff',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '0.92rem',
                  color: '#0f172a',
                  border: '1px solid #e0f2fe',
                }}
              >
                tan(φ) = s₀ / 12 &nbsp;|&nbsp; Akṣa-jyā = (3438 × s₀) / √(144 + s₀²)
              </div>
            </div>

            {/* Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1e293b' }}>
                  Equinoctial Noon Shadow (Palabhā, <em>s₀</em>):
                </label>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0284c7' }}>
                  {shadowLength.toFixed(2)} Aṅgulas
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="18"
                step="0.05"
                value={shadowLength}
                onChange={(e) => setShadowLength(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#0284c7' }}
              />
            </div>

            {/* Ancient Station Presets */}
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Ancient Meridian &amp; Regional Benchmarks:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                {[
                  { name: 'लङ्का (Equator / Lanka)', shadow: 0.0, lat: '0.0°' },
                  { name: 'काञ्ची (Kanchipuram)', shadow: 2.76, lat: '12.98° N' },
                  { name: 'उज्जयिनी (Ujjain Prime)', shadow: 5.14, lat: '23.18° N' },
                  { name: 'पाटलिपुत्र (Patna)', shadow: 5.75, lat: '25.60° N' },
                  { name: 'वाराणसी (Varanasi)', shadow: 5.67, lat: '25.32° N' },
                  { name: 'कुरुक्षेत्र (Kurukṣetra)', shadow: 6.89, lat: '29.96° N' },
                ].map((station) => (
                  <button
                    key={station.name}
                    type="button"
                    onClick={() => setShadowLength(station.shadow)}
                    style={{
                      padding: '0.3rem 0.6rem',
                      background: Math.abs(shadowLength - station.shadow) < 0.1 ? '#0284c7' : '#f8fafc',
                      color: Math.abs(shadowLength - station.shadow) < 0.1 ? '#ffffff' : '#334155',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {station.name} ({station.lat})
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Values Card */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Latitude (Akṣāṃśa):</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  {calculatedLatDeg.toFixed(2)}° N
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Shadow Hypotenuse (Karṇa):</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0369a1' }}>
                  {hypotenuse.toFixed(2)} Aṅgulas
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Akṣa-jyā (R sin φ):</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#059669' }}>
                  {akshaJya}&apos; <span style={{ fontSize: '0.75rem' }}>(arcmin)</span>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Lamba-jyā (R cos φ):</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#059669' }}>
                  {lambaJya}&apos; <span style={{ fontSize: '0.75rem' }}>(arcmin)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic SVG Visual Representation */}
          <div
            style={{
              background: '#0f172a',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              PHYSICAL SOLAR GNOMON GEOMETRY (विषुवद्-छाया)
            </span>
            <svg
              viewBox="0 0 340 240"
              style={{ width: '100%', maxWidth: '320px', height: 'auto', overflow: 'visible' }}
            >
              {/* Ground level */}
              <line x1="20" y1="200" x2="320" y2="200" stroke="#475569" strokeWidth="3" />
              <rect x="20" y="200" width="300" height="20" fill="#1e293b" opacity="0.6" />

              {/* Gnomon base at x=140, y=200 */}
              {/* Gnomon height: 12 units -> 90 px on screen */}
              <line x1="140" y1="200" x2="140" y2="110" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
              {/* Gnomon tip marker */}
              <circle cx="140" cy="110" r="4" fill="#fbbf24" />

              {/* Shadow length: mapped to pixels (1 Angula ≈ 7.5 px) */}
              {/* Shadow extends to the right: from 140 to 140 + shadowLength*7.5 */}
              {shadowLength > 0 && (
                <line
                  x1="140"
                  y1="200"
                  x2={140 + Math.min(shadowLength * 8, 160)}
                  y2="200"
                  stroke="#38bdf8"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              )}

              {/* Sunlight ray from sun through gnomon tip to shadow tip */}
              {/* Sun position */}
              <circle cx="70" cy="40" r="14" fill="#fbbf24" opacity="0.9" />
              <circle cx="70" cy="40" r="22" fill="#f59e0b" opacity="0.25" />
              {/* Solar Ray */}
              <line
                x1="70"
                y1="40"
                x2={140 + Math.min(shadowLength * 8, 160)}
                y2="200"
                stroke="#fef08a"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />

              {/* Hypotenuse (Chāyā-karṇa) from Gnomon Tip to Shadow Tip */}
              <line
                x1="140"
                y1="110"
                x2={140 + Math.min(shadowLength * 8, 160)}
                y2="200"
                stroke="#10b981"
                strokeWidth="2"
              />

              {/* Text labels */}
              <text x="110" y="155" fill="#f59e0b" fontSize="11" fontWeight="700">
                12 Aṅgulas
              </text>
              <text
                x={140 + Math.min(shadowLength * 4, 80)}
                y="218"
                fill="#38bdf8"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                s₀ = {shadowLength.toFixed(1)}
              </text>
              <text x="70" y="24" fill="#fef08a" fontSize="10" textAnchor="middle">
                Equinox Sun (सूर्य)
              </text>

              {/* Angle arc at shadow tip */}
              <text
                x={140 + Math.min(shadowLength * 8, 160) - 20}
                y="190"
                fill="#10b981"
                fontSize="10"
                fontWeight="700"
              >
                φ = {calculatedLatDeg.toFixed(1)}°
              </text>
            </svg>
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center' }}>
              At Ujjain (23.18° N), the equinoctial shadow measures exactly <strong>5.14 Aṅgulas</strong>. On the Tropic of Cancer at the summer solstice, the noon shadow collapses to <strong>0</strong>.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: DEŚĀNTARA LONGITUDE & ECLIPSE SYNCHRONIZER
         ========================================================================= */}
      {activeTab === 'deshantara' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                background: '#fef3c7',
                border: '1px solid #fde68a',
                borderRadius: '12px',
                padding: '1rem',
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem', color: '#92400e', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>चन्द्रग्रहण-समकालिकता (Eclipse Synchronization)</span>
                <button
                  type="button"
                  onClick={() => handlePlay('देशान्तरम्')}
                  style={{ background: '#ffffff', border: '1px solid #fde68a', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', padding: '0.15rem 0.4rem', color: '#92400e' }}
                  title="Pronounce Deśāntara"
                >
                  🔊 देशान्तरम्
                </button>
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#451a03', lineHeight: 1.5 }}>
                A lunar eclipse begins at the exact same physical instant worldwide. By comparing local water-clock (
                <em>Ghaṭī-yantra</em>) time with Ujjain&apos;s Prime Meridian time, ancient astronomers solved longitude (
                <em>Deśāntara</em>) a millennium before mechanical clocks:
              </p>
              <div
                style={{
                  margin: '0.75rem 0 0',
                  padding: '0.5rem 0.75rem',
                  background: '#ffffff',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '0.88rem',
                  color: '#78350f',
                  border: '1px solid #fcd34d',
                }}
              >
                Δλ (deg) = Δt (min) / 4 &nbsp;|&nbsp; Deśāntara = (Δt / 60 Ghatis) × C₀ cos(φ)
              </div>
            </div>

            {/* Slider for Time Difference */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1e293b' }}>
                  Time Delta from Ujjain (Δt in minutes):
                </label>
                <span
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    color: timeDiffMin >= 0 ? '#059669' : '#dc2626',
                  }}
                >
                  {timeDiffMin >= 0 ? `+${timeDiffMin.toFixed(1)} min (East)` : `${timeDiffMin.toFixed(1)} min (West)`}
                </span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                value={timeDiffMin}
                onChange={(e) => setTimeDiffMin(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#059669' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                <span>-180m (West: Alexandria / Rome)</span>
                <span>0m (Ujjain 75.77° E)</span>
                <span>+180m (East: Malacca / Siam)</span>
              </div>
            </div>

            {/* Historical Station Quick-Picks */}
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Historical Stations in Siddhantic Literature:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                {[
                  { name: 'सिकन्दरिया (Alexandria)', dt: -183.5, lat: 31.2 },
                  { name: 'बगदाद (Baghdad)', dt: -125.6, lat: 33.3 },
                  { name: 'उज्जयिनी (Ujjain Baseline)', dt: 0.0, lat: 23.2 },
                  { name: 'काञ्ची (Kāñcī / Chennai)', dt: 17.5, lat: 13.0 },
                  { name: 'वाराणसी (Vārāṇasī)', dt: 28.8, lat: 25.3 },
                  { name: 'पाटलिपुत्र (Pāṭaliputra)', dt: 37.3, lat: 25.6 },
                  { name: 'पुरी (Puri Jagannātha)', dt: 40.2, lat: 19.8 },
                ].map((station) => (
                  <button
                    key={station.name}
                    type="button"
                    onClick={() => {
                      setTimeDiffMin(station.dt);
                      setObserverLatDeg(station.lat);
                    }}
                    style={{
                      padding: '0.3rem 0.6rem',
                      background: Math.abs(timeDiffMin - station.dt) < 1.0 ? '#d97706' : '#f8fafc',
                      color: Math.abs(timeDiffMin - station.dt) < 1.0 ? '#ffffff' : '#334155',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {station.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric Results */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Time in Ghaṭikās:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  {Math.abs(ghatikas).toFixed(2)} Nāḍīs
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Longitude Offset (Δλ):</span>
                <div
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: deltaLongDeg >= 0 ? '#059669' : '#dc2626',
                  }}
                >
                  {Math.abs(deltaLongDeg).toFixed(2)}° {deltaLongDeg >= 0 ? 'E' : 'W'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Distance in Yojanas:</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#d97706' }}>
                  {deshantaraYojanas.toFixed(1)} Yojanas
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Modern Metric Distance:</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0284c7' }}>
                  {deshantaraKm.toFixed(0)} km
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Meridian Globe Visual */}
          <div
            style={{
              background: '#042f2e',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2dd4bf', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              LONGITUDE OFFSET RELATIVE TO UJJAIN PRIME MERIDIAN
            </span>
            <svg viewBox="0 0 320 220" style={{ width: '100%', maxWidth: '300px', height: 'auto' }}>
              {/* Globe Outline */}
              <circle cx="160" cy="110" r="85" fill="#0f766e" opacity="0.3" stroke="#2dd4bf" strokeWidth="2" />
              {/* Latitude Lines */}
              <ellipse cx="160" cy="110" rx="85" ry="30" fill="none" stroke="#14b8a6" strokeWidth="1" strokeDasharray="3,3" />
              {/* Equator */}
              <line x1="75" y1="110" x2="245" y2="110" stroke="#fef08a" strokeWidth="1.5" />
              <text x="250" y="114" fill="#fef08a" fontSize="9">Equator</text>

              {/* Ujjain Prime Meridian (Central vertical arc) */}
              <line x1="160" y1="25" x2="160" y2="195" stroke="#f59e0b" strokeWidth="3" />
              <circle cx="160" cy="110 - (observerLatDeg * 0.7)" r="5" fill="#f59e0b" />
              <text x="165" y="40" fill="#f59e0b" fontSize="10" fontWeight="700">Ujjain (0°)</text>

              {/* Target Location Meridian arc */}
              {/* Map deltaLongDeg (-45° to +45°) to horizontal shift (-60px to +60px) */}
              {(() => {
                const xOffset = Math.max(-65, Math.min(65, deltaLongDeg * 1.8));
                return (
                  <>
                    <ellipse
                      cx="160"
                      cy="110"
                      rx={Math.abs(xOffset)}
                      ry="85"
                      fill="none"
                      stroke={deltaLongDeg >= 0 ? '#38bdf8' : '#f87171'}
                      strokeWidth="2"
                    />
                    <circle
                      cx={160 + xOffset}
                      cy={110 - observerLatDeg * 0.7}
                      r="5"
                      fill={deltaLongDeg >= 0 ? '#38bdf8' : '#f87171'}
                    />
                    <text
                      x={160 + xOffset + (deltaLongDeg >= 0 ? 8 : -45)}
                      y={105 - observerLatDeg * 0.7}
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="700"
                    >
                      Station
                    </text>
                  </>
                );
              })()}
            </svg>
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: '#99f6e4', textAlign: 'center' }}>
              Absolute Longitude of Ujjain: <strong>75° 46&apos; E</strong>. All Indian astronomical ephemerides (<em>Pañcāṅgas</em>) historically computed tithi and graha transitions for this central axis.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: DONGLA ZERO SHADOW & AXIAL PRECESSION
         ========================================================================= */}
      {activeTab === 'dongla' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                background: '#fdf2f8',
                border: '1px solid #fbcfe8',
                borderRadius: '12px',
                padding: '1rem',
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem', color: '#9d174d', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>कर्क-संक्रान्ति-प्रयाणम् (Precession &amp; Southward Migration)</span>
                <button
                  type="button"
                  onClick={() => handlePlay('दोङ्गला')}
                  style={{ background: '#ffffff', border: '1px solid #fbcfe8', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', padding: '0.15rem 0.4rem', color: '#9d174d' }}
                  title="Pronounce Doṅglā"
                >
                  🔊 दोङ्गला
                </button>
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#831843', lineHeight: 1.5 }}>
                Due to Earth&apos;s axial obliquity cycle (41,000 years) and equinoctial precession (<em>Ayanāṃśa</em>), the Tropic of Cancer drifts southward at roughly <strong>14.5 meters per year</strong>. In antiquity, it cut directly across the Mahākāleśvara Temple in Ujjain; today, it passes cleanly through <strong>Doṅglā Village</strong>, 30 km to the north.
              </p>
            </div>

            {/* Timeline Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1e293b' }}>
                  Epoch / Year in History:
                </label>
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#db2777' }}>
                  {selectedYear < 0 ? `${Math.abs(selectedYear)} BCE` : `${selectedYear} CE`}
                </span>
              </div>
              <input
                type="range"
                min="-300"
                max="2026"
                step="50"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: '#db2777' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                <span>300 BCE (Ujjain Center)</span>
                <span>628 CE (Brahmagupta)</span>
                <span>2026 CE (Doṅglā Node)</span>
              </div>
            </div>

            {/* Quick Era Buttons */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { label: '300 BCE (Surya Siddhanta)', yr: -300 },
                { label: '505 CE (Varāhamihira)', yr: 505 },
                { label: '628 CE (Brahmagupta)', yr: 628 },
                { label: '1150 CE (Bhāskara II)', yr: 1150 },
                { label: '1719 CE (Jai Singh II)', yr: 1719 },
                { label: 'Today (Modern Doṅglā)', yr: 2026 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSelectedYear(item.yr)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    background: selectedYear === item.yr ? '#db2777' : '#f8fafc',
                    color: selectedYear === item.yr ? '#ffffff' : '#334155',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Metric Shift Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Cumulative Drift:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#9d174d' }}>
                  {driftKm} km
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Tropic Latitude:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  {currentTropicLat}° N
                </div>
              </div>
            </div>
          </div>

          {/* Dongla Zero Shadow Infographic Visual */}
          <div
            style={{
              background: '#18181b',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f472b6', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              ZERO SHADOW DAY (निर्छाया-दिवस · JUNE 21)
            </span>
            <svg viewBox="0 0 300 200" style={{ width: '100%', maxWidth: '280px', height: 'auto' }}>
              {/* Sun directly overhead at 90 degrees */}
              <circle cx="150" cy="30" r="18" fill="#facc15" />
              <line x1="150" y1="52" x2="150" y2="140" stroke="#fef08a" strokeWidth="3" strokeDasharray="3,3" />

              {/* Ground level */}
              <line x1="30" y1="160" x2="270" y2="160" stroke="#52525b" strokeWidth="3" />

              {/* Vertical Gnomon Pillar */}
              <rect x="146" y="100" width="8" height="60" fill="#f43f5e" rx="2" />

              {/* Zero shadow indicator at base (collapsed circle) */}
              <ellipse cx="150" cy="160" rx="4" ry="2" fill="#71717a" />

              {/* Labels */}
              <text x="150" y="16" fill="#facc15" fontSize="10" fontWeight="800" textAnchor="middle">
                Solar Zenith = 90° (Absolute Noon)
              </text>
              <text x="150" y="180" fill="#f472b6" fontSize="11" fontWeight="700" textAnchor="middle">
                Shadow Length = 0.00 Aṅgulas
              </text>
              <text x="150" y="194" fill="#a1a1aa" fontSize="9" textAnchor="middle">
                Doṅglā Observatory (23° 26&apos; N)
              </text>
            </svg>
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: '#d4d4d8', textAlign: 'center' }}>
              Every summer solstice at 12:28 PM local time at Doṅglā, vertical rods, sundials, and visitors cast <strong>no shadow whatsoever</strong>.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: INDIAN JYĀ VS. GREEK CHORD COMPARATOR
         ========================================================================= */}
      {activeTab === 'trig' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '12px',
                padding: '1rem',
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem', color: '#166534', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>अर्धज्या (Half-Chord) → The Birth of Modern Sine</span>
                <button
                  type="button"
                  onClick={() => handlePlay('अर्धज्या')}
                  style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', padding: '0.15rem 0.4rem', color: '#166534' }}
                  title="Pronounce Ardha-jyā"
                >
                  🔊 अर्धज्या
                </button>
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#14532d', lineHeight: 1.5 }}>
                Greek astronomy (Ptolemy / Hipparchus) used full chords of double arcs (<em>crd 2θ</em>), which made right-triangle trigonometry cumbersome. The Ujjain school cut the chord in half (<strong>Ardha-jyā</strong>, later <em>Jyā</em>), creating an embedded right triangle within the unit circle:
              </p>
              <div
                style={{
                  margin: '0.75rem 0 0',
                  padding: '0.5rem 0.75rem',
                  background: '#ffffff',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '0.88rem',
                  color: '#15803d',
                  border: '1px solid #86efac',
                }}
              >
                Jyā(θ) = R sin(θ) &nbsp;|&nbsp; Koṭijyā(θ) = R cos(θ) &nbsp;|&nbsp; Jyā² + Koṭi² = R²
              </div>
            </div>

            {/* Slider for Angle */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1e293b' }}>
                  Angle (Dhanu / Arc, θ):
                </label>
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#16a34a' }}>
                  {angleDeg}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="1"
                value={angleDeg}
                onChange={(e) => setAngleDeg(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: '#16a34a' }}
              />
            </div>

            {/* Angle Presets */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[15, 30, 45, 60, 75, 90].map((deg) => (
                <button
                  key={deg}
                  type="button"
                  onClick={() => setAngleDeg(deg)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    background: angleDeg === deg ? '#16a34a' : '#f8fafc',
                    color: angleDeg === deg ? '#ffffff' : '#334155',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {deg}°
                </button>
              ))}
            </div>

            {/* Metric Comparison Table */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Indian Jyā (Half-Chord, sin θ):</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a' }}>
                  {indianJya.toFixed(4)}
                </div>
                <span style={{ fontSize: '0.72rem', color: '#15803d' }}>
                  R=3438&apos;: {Math.round(R_SIN * indianJya)}&apos;
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Greek Chord (crd 2θ = 2 sin θ):</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#b45309' }}>
                  {greekChord.toFixed(4)}
                </div>
                <span style={{ fontSize: '0.72rem', color: '#92400e' }}>
                  Requires full chord reduction
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Koṭijyā (Cosine, cos θ):</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0369a1' }}>
                  {indianKotijya.toFixed(4)}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Utkrama-jyā (Versine, 1 - cos θ):</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#9333ea' }}>
                  {(1 - indianKotijya).toFixed(4)}
                </div>
              </div>
            </div>
          </div>

          {/* Circle Visualization */}
          <div
            style={{
              background: '#052e16',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#86efac', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              UNIT CIRCLE: ARDHA-JYĀ RIGHT TRIANGLE
            </span>
            <svg viewBox="0 0 260 220" style={{ width: '100%', maxWidth: '260px', height: 'auto' }}>
              {/* Circle Quadrant */}
              <path d="M 40 180 A 130 130 0 0 1 170 50" fill="none" stroke="#22c55e" strokeWidth="2" />
              {/* Coordinate Axes */}
              <line x1="30" y1="180" x2="190" y2="180" stroke="#4ade80" strokeWidth="1.5" />
              <line x1="40" y1="190" x2="40" y2="30" stroke="#4ade80" strokeWidth="1.5" />

              {/* Point on arc at angleDeg */}
              {(() => {
                const radius = 130;
                const px = 40 + radius * Math.cos(angleRad);
                const py = 180 - radius * Math.sin(angleRad);
                return (
                  <>
                    {/* Radius line from origin to point */}
                    <line x1="40" y1="180" x2={px} y2={py} stroke="#fef08a" strokeWidth="2" />
                    {/* Jyā (vertical perpendicular line) */}
                    <line x1={px} y1="180" x2={px} y2={py} stroke="#38bdf8" strokeWidth="3" />
                    {/* Koṭijyā (horizontal baseline) */}
                    <line x1="40" y1="180" x2={px} y2="180" stroke="#fbbf24" strokeWidth="3" />
                    {/* Marker at point */}
                    <circle cx={px} cy={py} r="5" fill="#f87171" />

                    {/* Labels */}
                    <text x={px + 6} y={180 - (180 - py) / 2} fill="#38bdf8" fontSize="10" fontWeight="700">
                      Jyā
                    </text>
                    <text x={40 + (px - 40) / 2} y="196" fill="#fbbf24" fontSize="10" fontWeight="700" textAnchor="middle">
                      Koṭi
                    </text>
                  </>
                );
              })()}
            </svg>
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: '#bbf7d0', textAlign: 'center' }}>
              By embedding the right-angled triangle directly inside the arc, the Ujjain astronomers paved the way for modern trigonometry, differential quotients, and spherical astronomy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UjjainGeodesyStudio;
