import React, { useState } from 'react';
import { soundEffects } from '../utils/soundEffects';

interface UjjainStudioProps {
  onPlayAudio?: (term: string) => void;
  onNextLab?: () => void;
}

export const UjjainGeodesyStudio: React.FC<UjjainStudioProps> = ({ onPlayAudio, onNextLab }) => {
  const [activeTab, setActiveTab] = useState<'temple' | 'shanku' | 'deshantara' | 'dongla' | 'trig'>('temple');
  const [selectedTemple, setSelectedTemple] = useState<'mahakal' | 'mangalnath' | 'vedhashala' | 'dongla'>('mahakal');
  const [istTimeHours, setIstTimeHours] = useState<number>(12);
  const [istTimeMinutes, setIstTimeMinutes] = useState<number>(0);

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
  const [driftVisualMode, setDriftVisualMode] = useState<'dongla' | 'jantar_mantar'>('dongla');
  const [sankrantiYear, setSankrantiYear] = useState<number>(2026);
  const [samratHour, setSamratHour] = useState<number>(10);
  const [samratMinute, setSamratMinute] = useState<number>(30);

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

  // --- Calculations for Makar Sankranti & Precession Drift ---
  // In 285 CE (Chitrapaksha Lahiri epoch), Ayanamsha was 0° and Makar Sankranti fell on Dec 22 (Winter Solstice).
  // Precession rate = 50.29 arcseconds per year = 1° every 71.6 ≈ 72 years.
  const ayanamshaDeg = Math.max(0, ((sankrantiYear - 285) * 50.29) / 3600);
  const driftDays = Math.round((ayanamshaDeg / 360) * 365.256);
  const shiftedDate = new Date(sankrantiYear, 11, 22 + driftDays);
  const sankrantiDateStr = shiftedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // --- Calculations for Samrat Yantra Shadow Speed ---
  // On Ujjain's Samrat Yantra (radius R ≈ 9.1 meters on quadrant arc):
  // v_shadow = (2 * PI * 9100 mm) / (24 * 3600 sec) ≈ 0.66 mm / sec = 1.32 mm / 2 sec
  const totalSamratSeconds = samratHour * 3600 + samratMinute * 60;
  const hourAngleDeg = ((totalSamratSeconds - 12 * 3600) / 3600) * 15;

  // --- Calculations for Temple Astronomy & 29-minute Panchang Delta ---
  // Ujjain Longitude = 75° 46' E (75.768° E). IST Meridian = 82° 30' E (82.5° E).
  // Difference = 82.5° - 75.768° = 6.732°
  // Time Delta = 6.732° × 4 minutes/degree = 26.93 minutes ≈ 29 minutes behind IST
  const totalIstMinutes = istTimeHours * 60 + istTimeMinutes;
  const ujjainTotalMinutes = (totalIstMinutes - 29 + 1440) % 1440;
  const ujjainHours = Math.floor(ujjainTotalMinutes / 60);
  const ujjainMinutes = Math.floor(ujjainTotalMinutes % 60);
  const formatTime = (h: number, m: number) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m.toString().padStart(2, '0');
    return `${displayH}:${displayM} ${ampm}`;
  };

  const TEMPLE_DETAILS = {
    mahakal: {
      name: 'Mahakaleshwar Jyotirlinga (श्री महाकालेश्वर)',
      deity: 'Lord of Time (महाकालः)',
      lat: "23° 10' 58\" N (23.1827° N)",
      lon: "75° 46' 06\" E (75.7682° E)",
      role: 'Tropic of Cancer Solar Solstice Alignment & Lord of Time',
      description: 'The name Mahakal translates to the "Lord of Time" or "Great Time". The temple spire was mathematically aligned so that the Tropic of Cancer crossed directly through it during antiquity. It functioned as both the sacred spiritual epicenter and a physical astronomical marker to track the Sun’s summer solstice zenith.',
      icon: '🔱',
      color: '#b45309',
    },
    mangalnath: {
      name: 'Mangalnath Temple (श्री मङ्गलनाथ मन्दिरम्)',
      deity: 'Birthplace of Mars (भौम / मङ्गलः)',
      lat: "23° 12' 50\" N (23.2140° N)",
      lon: "75° 46' 00\" E (75.7667° E)",
      role: 'Planetary Mars Tracking & Perihelic Observation Node',
      description: 'According to Hindu cosmogony, this temple is revered as the birthplace of the planet Mars (Mangala). Ancient Indian astronomers calculated this specific latitudinal coordinate as the location on Earth where Mars and Earth were closest in their celestial orbits, establishing it as an indispensable observatory node for tracking planetary retrogrades (Vakra-gati).',
      icon: '🔴',
      color: '#dc2626',
    },
    vedhashala: {
      name: 'Vedha Shala / Jantar Mantar (वेधशाला)',
      deity: '1725 CE Observatory of Sawai Jai Singh II (सवाई जयसिंह वेधशाला)',
      lat: "23° 10' 20\" N (23.1722° N)",
      lon: "75° 46' 03\" E (75.7675° E)",
      role: 'Massive Stone Gnomons to Recalibrate Planetary & Solar Drift',
      description: 'When Maharaja Sawai Jai Singh II built this observatory in 1725, he was fully aware of planetary drift and obliquity oscillations. He constructed massive non-moving stone instruments—such as the Samrat Yantra (equinoctial sundial) and Dakshinottara Bhitti Yantra (Transit Wall Instrument)—specifically to calculate the exact real-time local declination of the Sun and stars regardless of how much the planet had wobbled since antiquity, allowing 18th-century scientists to recalibrate mathematical ephemerides.',
      icon: '🔭',
      color: '#0284c7',
    },
    dongla: {
      name: 'Dongla Varahamihira Observatory (दोङ्गला वेधशाला)',
      deity: 'Modern Tropic of Cancer Station (वराहमिहिर वेधशाला)',
      lat: "23° 26' 34\" N (23.4428° N)",
      lon: "75° 46' 00\" E (75.7667° E)",
      role: 'Modern Tropic of Cancer Precession Node & Zero Shadow Day',
      description: 'Located 30 km north of Ujjain along the exact same ancient 0° meridian. Due to the 41,000-year obliquity cycle of the Earth (14.5 m/year southward drift), the modern Tropic of Cancer now cuts through Dongla Village, where scientists observe Zero Shadow Day on June 21.',
      icon: '☀️',
      color: '#059669',
    },
  };

  const handlePlay = (term: string) => {
    soundEffects.playStrokeChime();
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
            { id: 'temple', label: '🏛️ मन्दिर-रेखागणितम् (Temples & 0° Meridian)', sub: '0° Longitude & Temples' },
            { id: 'shanku', label: '📐 शङ्कु (Śaṅku Gnomon)', sub: 'Latitude (अक्षांश)' },
            { id: 'deshantara', label: '🌖 देशान्तर (Deśāntara)', sub: 'Longitude (रेखांश)' },
            { id: 'dongla', label: '☀️ दोङ्गला व वेधशाला (Drift & Jantar Mantar)', sub: 'Cosmic Wobble & Recalibration' },
            { id: 'trig', label: '⭕ ज्या (Jyā vs Chord)', sub: 'Sine Trigonometry' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundEffects.playStrokeChime();
                setActiveTab(tab.id as any);
              }}
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
          TAB 0: TEMPLE GEOMETRY & ANCIENT PRIME MERIDIAN (0° LONGITUDE)
         ========================================================================= */}
      {activeTab === 'temple' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#f8fafc',
              padding: '1.25rem 1.5rem',
              borderRadius: '14px',
              border: '1px solid #334155',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#38bdf8',
                  background: 'rgba(56, 189, 248, 0.12)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                }}
              >
                0° Longitude Prime Meridian · Nābhideśa (नाभिदेशः)
              </span>
              <button
                type="button"
                onClick={() => handlePlay('राक्षसालयदेवौकःशैलमध्यगता हि या । रोहितकमवन्ती च तथा सन्निहितं सरः ॥')}
                style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                🔊 Chant Sūrya Siddhānta Meridian Verse
              </button>
            </div>
            <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
              The Axis of Time &amp; Space: Ujjain&apos;s Ancient Prime Meridian &amp; Temple Geodesy
            </h4>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Millennia before Greenwich was adopted in 1884, classical Indian astronomers established Ujjain (Avantī) as the <strong>Madhya-Rekhā (0° Longitude)</strong>. Because it sat precisely where the 0° meridian crossed the <strong>Tropic of Cancer (~23.5° N)</strong>, it was revered as the <em>Nābhideśa</em> (&quot;Navel of the Earth&quot;), where solar noon on the summer solstice produced an absolute zero shadow.
            </p>
          </div>

          {/* 2-Column: Temple Coordinates & Prime Meridian Vertical Axis */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Left: Temple Selection & Detailed Dossier */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Select an Ancient Geodetic &amp; Astronomical Sanctuary:
              </div>

              {/* Temple Selector Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {(Object.keys(TEMPLE_DETAILS) as Array<keyof typeof TEMPLE_DETAILS>).map((key) => {
                  const t = TEMPLE_DETAILS[key];
                  const isSel = selectedTemple === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        soundEffects.playStrokeChime();
                        setSelectedTemple(key);
                      }}
                      style={{
                        padding: '0.65rem 0.75rem',
                        borderRadius: '10px',
                        border: isSel ? `2px solid ${t.color}` : '1.5px solid #e2e8f0',
                        background: isSel ? '#f8fafc' : '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.2rem',
                        boxShadow: isSel ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{t.icon}</span>
                      <span style={{ fontSize: '0.84rem', fontWeight: 800, color: isSel ? t.color : '#1e293b' }}>
                        {t.name.split('(')[0].trim()}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{t.deity.split('(')[0].trim()}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Temple Details Card */}
              {(() => {
                const current = TEMPLE_DETAILS[selectedTemple];
                return (
                  <div
                    style={{
                      background: '#ffffff',
                      border: `2px solid ${current.color}`,
                      borderRadius: '12px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{current.icon}</span>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: current.color }}>
                            {current.name}
                          </h4>
                          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{current.deity}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePlay(current.name)}
                        style={{
                          background: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          padding: '0.2rem 0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          color: '#334155',
                        }}
                      >
                        🔊 Pronounce
                      </button>
                    </div>

                    {/* Coordinates Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.6rem',
                        background: '#f8fafc',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                          Latitude (अक्षांश)
                        </div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace' }}>
                          {current.lat}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                          Longitude (रेखांश)
                        </div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace' }}>
                          {current.lon}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                        Geodetic &amp; Astronomical Function
                      </div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0284c7' }}>
                        {current.role}
                      </div>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.84rem', color: '#334155', lineHeight: 1.55 }}>
                      {current.description}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Right: Prime Meridian Axis Diagram */}
            <div
              style={{
                background: '#090d16',
                color: '#e2e8f0',
                padding: '1.25rem',
                borderRadius: '14px',
                border: '1px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  THE SŪRYA SIDDHĀNTA MERIDIAN AXIS
                </span>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                  0° Madhya-Rekhā (75° 46&apos; E)
                </span>
              </div>

              {/* Meridian Nodes Flow */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                  position: 'relative',
                  paddingLeft: '1.5rem',
                }}
              >
                {/* Connecting Vertical Line */}
                <div
                  style={{
                    position: 'absolute',
                    left: '0.55rem',
                    top: '8px',
                    bottom: '8px',
                    width: '3px',
                    background: 'linear-gradient(180deg, #38bdf8 0%, #f59e0b 50%, #38bdf8 100%)',
                    borderRadius: '2px',
                  }}
                />

                {[
                  { name: 'SUMERU / NORTH POLE (सुमेरुः)', lat: '+90° 00\' 00"', note: 'Cosmic celestial north anchor', highlight: false },
                  { name: 'KURUKṢETRA (कुरुक्षेत्रम्)', lat: "29° 58' 00\" N", note: 'Sacred lake astronomical calibration node', highlight: false },
                  { name: 'ROHĪTAKA / ROHTAK (रोहितकम्)', lat: "28° 53' 00\" N", note: 'Ancient Sūrya Siddhānta meridian marker city', highlight: false },
                  { name: 'DOṄGLĀ OBSERVATORY (दोङ्गला)', lat: "23° 26' 34\" N", note: 'Modern Tropic of Cancer node (Precession drift)', highlight: false },
                  {
                    name: 'UJJAIN / AVANTĪ (उज्जयिनी)',
                    lat: "23° 10' 58\" N",
                    note: 'THE PRIME MERIDIAN INTERSECTION (0° Long × Tropic of Cancer in antiquity)',
                    highlight: true,
                  },
                  { name: 'MĀHIṢMATĪ (माहिष्मती)', lat: "22° 11' 00\" N", note: 'Narmada river valley crossing', highlight: false },
                  { name: 'LAṄKĀ / EQUATOR (लाङ्का)', lat: "00° 00' 00\" N", note: 'Equatorial node (0° Latitude × 0° Longitude)', highlight: true },
                  { name: 'BAḌAVĀMUKHA / SOUTH POLE (वडवामुखम्)', lat: "-90° 00' 00\"", note: 'Terrestrial south pole anchor', highlight: false },
                ].map((node, i) => (
                  <div
                    key={i}
                    style={{
                      background: node.highlight ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: node.highlight ? '1.5px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: node.highlight ? '#fef08a' : '#f1f5f9' }}>
                        {node.name}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: node.highlight ? '#fbbf24' : '#94a3b8' }}>
                        {node.lat}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: node.highlight ? '#fde68a' : '#94a3b8' }}>
                      {node.note}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.76rem',
                  color: '#bae6fd',
                  lineHeight: 1.45,
                }}
              >
                💡 <em>Sūrya Siddhānta (1.62):</em> The line between Laṅkā on the equator and Meru at the pole constitutes the zero reference for calculating <strong>Ahargaṇa</strong> (elapsed civil days) and planetary positions across Bharatavarsha.
              </div>
            </div>
          </div>

          {/* Bottom Section: The 29-Minute Panchang Time Converter */}
          <div
            style={{
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  PANCHANG GAṆITA &amp; ASTROLOGY ANCHOR
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  The 29-Minute Offset: Why Every Indian Panchang Uses Ujjain Mean Solar Time
                </h4>
              </div>
              <div
                style={{
                  background: '#fef3c7',
                  border: '1px solid #fde68a',
                  color: '#92400e',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                }}
              >
                Time Delta: Δt ≈ -29 Minutes
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
              Modern Indian Standard Time (IST) is anchored at the <strong>82° 30&apos; E</strong> meridian (near Mirzapur). However, Ujjain is situated at <strong>75° 46&apos; E</strong>.
              The longitudinal difference is <strong>82.5° − 75.768° = 6.732°</strong>. Since Earth rotates 1° every 4 minutes, Ujjain local solar time is:
              <br />
              <strong style={{ color: '#0f172a' }}>6.732° × 4 min/deg = 26.93 minutes ≈ 29 minutes behind IST.</strong>
              <br />
              Every traditional Hindu calendar (<em>Pañcāṅga</em>) calculates planetary longitudes (<em>Graha Sphuṭa</em>), Tithis, and the ascendant (<em>Lagna</em>) for sunrise at Ujjain, then translates it to the local birth city.
            </p>

            {/* Interactive Time Slider */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label htmlFor="ist-hour-slider" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                    Adjust IST Civil Time (Hours):
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0284c7', fontFamily: 'monospace' }}>
                    {istTimeHours.toString().padStart(2, '0')}:00
                  </span>
                </div>
                <input
                  id="ist-hour-slider"
                  type="range"
                  min="0"
                  max="23"
                  value={istTimeHours}
                  onChange={(e) => setIstTimeHours(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#0284c7' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label htmlFor="ist-min-slider" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                    Adjust IST Civil Time (Minutes):
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0284c7', fontFamily: 'monospace' }}>
                    :{istTimeMinutes.toString().padStart(2, '0')}
                  </span>
                </div>
                <input
                  id="ist-min-slider"
                  type="range"
                  min="0"
                  max="59"
                  value={istTimeMinutes}
                  onChange={(e) => setIstTimeMinutes(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#0284c7' }}
                />
              </div>

              {/* Live Clocks Comparison */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div
                  style={{
                    background: '#f0f9ff',
                    border: '1.5px solid #bae6fd',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#0369a1', fontWeight: 800, textTransform: 'uppercase' }}>
                    Civil Clock (IST)
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0c4a6e', margin: '0.25rem 0', fontFamily: 'monospace' }}>
                    {formatTime(istTimeHours, istTimeMinutes)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#0284c7' }}>Meridian: 82° 30&apos; E</div>
                </div>

                <div
                  style={{
                    background: '#fef3c7',
                    border: '1.5px solid #fde68a',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#92400e', fontWeight: 800, textTransform: 'uppercase' }}>
                    Ujjain Solar Time (Panchang)
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#78350f', margin: '0.25rem 0', fontFamily: 'monospace' }}>
                    {formatTime(ujjainHours, ujjainMinutes)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#b45309' }}>Meridian: 75° 46&apos; E (-29m)</div>
                </div>
              </div>
            </div>

            {onNextLab && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={onNextLab}
                  style={{
                    padding: '0.6rem 1.25rem',
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  Proceed to Next Science Sector ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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
          TAB 3: DONGLA ZERO SHADOW, AXIAL PRECESSION & JANTAR MANTAR (1725 CE)
         ========================================================================= */}
      {activeTab === 'dongla' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header Card */}
          <div
            style={{
              background: '#fdf2f8',
              border: '1.5px solid #fbcfe8',
              borderRadius: '14px',
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9d174d', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                COSMIC WOBBLES, SOUTHWARD DRIFT &amp; JANTAR MANTAR
              </span>
              <button
                type="button"
                onClick={() => handlePlay('वेधशाला')}
                style={{
                  background: '#ffffff',
                  border: '1px solid #fbcfe8',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.6rem',
                  color: '#9d174d',
                  fontWeight: 700,
                }}
                title="Pronounce Vedha-śālā"
              >
                🔊 वेधशाला
              </button>
            </div>
            <h4 style={{ margin: '0.35rem 0 0.4rem', color: '#831843', fontSize: '1.2rem', fontWeight: 800 }}>
              The Curious Case of the Tropic of Cancer: Why Modern GPS Shows a 30 km Discrepancy
            </h4>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#831843', lineHeight: 1.55 }}>
              While ancient astronomers brilliantly calculated Ujjain as the intersection of the <strong>Prime Meridian (0° Longitude)</strong> and the <strong>Tropic of Cancer</strong>, pulling up a modern GPS device at the Mahākāleśvara Temple today reveals a discrepancy: the Tropic of Cancer is currently located roughly <strong>30 kilometres away</strong>. This is not an ancient miscalculation, but the physical consequence of celestial mechanics: <strong>axial precession</strong> and <strong>axial tilt (obliquity) oscillations</strong> acting as a cosmic wobble shifting our geographic boundaries over centuries.
            </p>
          </div>

          {/* 4 Core Pillars Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {/* 1. Precession Wobble */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🌀</span>
                <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  1. The Precession Wobble (A Cosmic Top)
                </h5>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                Earth does not spin perfectly upright; it behaves exactly like a spinning toy top that has started to slow down, tracing a slow circle in space over roughly <strong>25,772 years</strong>. While precession primarily changes which star serves as our &quot;North Star&quot; (shifting from Polaris to Vega and back), it also subtly alters the alignment of Earth&apos;s coordinate grid relative to the celestial sphere (<em>Ayanāṃśa</em>).
              </p>
            </div>

            {/* 2. Milankovitch Obliquity */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '1.25rem' }}>📐</span>
                <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  2. The Real Culprit: Milankovitch Obliquity
                </h5>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                While precession changes the axis direction, <strong>axial obliquity (tilt angle)</strong> is what physically moves the Tropic of Cancer. Earth&apos;s tilt is not fixed at 23.5°; it fluctuates continuously between <strong>22.1° and 24.5° over a 41,000-year cycle</strong>. Currently, Earth&apos;s tilt is in a decreasing phase, becoming slightly more upright with each passing century.
              </p>
            </div>

            {/* 3. Southward Drift */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '1.25rem' }}>⬇️</span>
                <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  3. The 15 m/Year Southward Drift
                </h5>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                Because the Tropic of Cancer is defined purely by the maximum northern angle of Earth&apos;s tilt, as the Earth stands more upright, the Tropic drifts closer to the Equator (southward) at roughly <strong>15 metres (49 feet) per year</strong>. Over the 1,600+ years since the <em>Sūrya Siddhānta</em> was compiled, this constant southward drift has caused the line to slide down from Ujjain.
              </p>
            </div>

            {/* 4. Genius of Jantar Mantar */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🔭</span>
                <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  4. The Genius of Jantar Mantar (1725 CE)
                </h5>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                When Maharaja Sawai Jai Singh II built the Ujjain Observatory in 1725, he was fully aware of these cosmic shifts. He constructed massive non-moving stone instruments—the <strong>Samrat Yantra</strong> and <strong>Transit Wall Instrument (Bhitti Yantra)</strong>—to calculate the exact real-time local declination of the Sun regardless of planetary wobble, recalibrating the tables and bridging ancient texts with empirical reality.
              </p>
            </div>
          </div>

          {/* Interactive Simulation & Visualizer Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Left: Historical Timeline & Metric Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Timeline Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label htmlFor="drift-year-slider" style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1e293b' }}>
                    Historical Epoch &amp; Drift Tracker:
                  </label>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#db2777' }}>
                    {selectedYear < 0 ? `${Math.abs(selectedYear)} BCE` : `${selectedYear} CE`}
                  </span>
                </div>
                <input
                  id="drift-year-slider"
                  type="range"
                  min="-300"
                  max="2026"
                  step="50"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#db2777' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                  <span>300 BCE (Ancient Sūrya Siddhānta)</span>
                  <span>1725 CE (Jai Singh II)</span>
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
                  { label: '1725 CE (Jai Singh Jantar Mantar)', yr: 1725 },
                  { label: 'Today (Modern Doṅglā)', yr: 2026 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      soundEffects.playStrokeChime();
                      setSelectedYear(item.yr);
                    }}
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
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Cumulative Drift:</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#9d174d' }}>
                    {driftKm} km
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Rate: ~15 m / year</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Tropic Latitude:</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                    {currentTropicLat}° N
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Tilt: 22.1° ↔ 24.5°</span>
                </div>
              </div>

              {/* Informative Callout */}
              <div
                style={{
                  background: '#fdf4ff',
                  border: '1px solid #f0abfc',
                  padding: '0.75rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  color: '#701a75',
                  lineHeight: 1.45,
                }}
              >
                💡 <strong>Scientific Convergence:</strong> In 1725, Maharaja Sawai Jai Singh recognized that brass astrolabes were unreliable over centuries due to mechanical warping. By using immovable stone masonry, the Jantar Mantar enabled direct measurement of actual solar meridian transits, keeping Indian astronomy dynamically aligned with cosmic shifts.
              </div>
            </div>

            {/* Right: Dual Visualizer (Zero Shadow Day vs Jantar Mantar Transit Wall) */}
            <div
              style={{
                background: '#18181b',
                borderRadius: '14px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                color: '#ffffff',
                gap: '0.75rem',
              }}
            >
              {/* Visualizer Toggle Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', background: '#27272a', padding: '0.25rem', borderRadius: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playStrokeChime();
                    setDriftVisualMode('dongla');
                  }}
                  style={{
                    flex: 1,
                    padding: '0.35rem 0.5rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: driftVisualMode === 'dongla' ? '#db2777' : 'transparent',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.76rem',
                    cursor: 'pointer',
                  }}
                >
                  ☀️ Doṅglā Zero Shadow Day
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playStrokeChime();
                    setDriftVisualMode('jantar_mantar');
                  }}
                  style={{
                    flex: 1,
                    padding: '0.35rem 0.5rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: driftVisualMode === 'jantar_mantar' ? '#0284c7' : 'transparent',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.76rem',
                    cursor: 'pointer',
                  }}
                >
                  🔭 Jantar Mantar Transit Wall (1725)
                </button>
              </div>

              {driftVisualMode === 'dongla' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f472b6', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                    DOṄGLĀ OBSERVATORY (23° 26&apos; 34&quot; N) · JUNE 21 ZENITH
                  </span>
                  <svg viewBox="0 0 300 180" style={{ width: '100%', maxWidth: '280px', height: 'auto' }}>
                    {/* Sun directly overhead at 90 degrees */}
                    <circle cx="150" cy="25" r="16" fill="#facc15" />
                    <line x1="150" y1="45" x2="150" y2="120" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="3,3" />

                    {/* Ground level */}
                    <line x1="30" y1="140" x2="270" y2="140" stroke="#52525b" strokeWidth="3" />

                    {/* Vertical Gnomon Pillar */}
                    <rect x="146" y="85" width="8" height="55" fill="#f43f5e" rx="2" />

                    {/* Zero shadow indicator at base (collapsed circle) */}
                    <ellipse cx="150" cy="140" rx="4" ry="2" fill="#71717a" />

                    {/* Labels */}
                    <text x="150" y="14" fill="#facc15" fontSize="10" fontWeight="800" textAnchor="middle">
                      Solar Zenith = 90° (Absolute Noon)
                    </text>
                    <text x="150" y="160" fill="#f472b6" fontSize="11" fontWeight="700" textAnchor="middle">
                      Shadow Length = 0.00 Aṅgulas
                    </text>
                    <text x="150" y="174" fill="#a1a1aa" fontSize="9" textAnchor="middle">
                      Modern Tropic of Cancer Node (30 km North)
                    </text>
                  </svg>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.76rem', color: '#d4d4d8', textAlign: 'center' }}>
                    Every summer solstice at 12:28 PM local time at Doṅglā, vertical rods, sundials, and visitors cast <strong>no shadow whatsoever</strong>.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                    DAKṢIṆOTTARA BHITTI YANTRA (TRANSIT WALL INSTRUMENT)
                  </span>
                  <svg viewBox="0 0 300 180" style={{ width: '100%', maxWidth: '280px', height: 'auto' }}>
                    {/* Meridian Wall representation */}
                    <rect x="50" y="30" width="200" height="110" fill="#27272a" stroke="#38bdf8" strokeWidth="1.5" rx="4" />

                    {/* Graduated Quadrant Arc */}
                    <path d="M 80 135 A 85 85 0 0 0 165 50" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                    <line x1="80" y1="135" x2="80" y2="50" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="80" y1="50" x2="165" y2="50" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />

                    {/* Sun pin at center */}
                    <circle cx="80" cy="50" r="4" fill="#ef4444" />
                    <text x="80" y="42" fill="#ef4444" fontSize="8" fontWeight="700" textAnchor="middle">
                      Aperture Pin
                    </text>

                    {/* Incident Solar Ray */}
                    <line x1="30" y1="15" x2="80" y2="50" stroke="#fde047" strokeWidth="2" strokeDasharray="3,3" />
                    <line x1="80" y1="50" x2="140" y2="105" stroke="#fde047" strokeWidth="2" />
                    <circle cx="140" cy="105" r="3" fill="#fde047" />

                    {/* Graduations */}
                    <line x1="135" y1="102" x2="145" y2="108" stroke="#38bdf8" strokeWidth="2" />
                    <text x="152" y="108" fill="#38bdf8" fontSize="8" fontWeight="700">
                      Z = 23.2°
                    </text>

                    {/* Formula at bottom */}
                    <text x="150" y="160" fill="#38bdf8" fontSize="10" fontWeight="800" textAnchor="middle">
                      Solar Declination: δ = φ - Z
                    </text>
                    <text x="150" y="174" fill="#94a3b8" fontSize="8" textAnchor="middle">
                      Immune to Table Drift · Real-Time Celestial Recalibration
                    </text>
                  </svg>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.76rem', color: '#d4d4d8', textAlign: 'center' }}>
                    Jai Singh’s massive North-South meridian wall casts the Sun’s noon shadow across graduated marble arcs, directly measuring true solar declination <strong>δ</strong> and bypassing outdated tables.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Deep Dive Sub-Module: Makar Sankranti Drift & Samrat Yantra 2-Second Precision */}
          <div
            style={{
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  ASTRONOMICAL APPLICATIONS IN PRACTICE
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  The Makar Sankranti Calendar Drift &amp; Samrat Yantra 2-Second Precision
                </h4>
              </div>
              <span
                style={{
                  background: '#e0f2fe',
                  color: '#0369a1',
                  border: '1px solid #bae6fd',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                }}
              >
                Rate: 1 Day Shift Every 72 Years
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {/* Card 1: Makar Sankranti Precession */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #fed7aa',
                  borderRadius: '12px',
                  padding: '1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>🪁</span>
                    <h5 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: '#9a3412' }}>
                      Why Makar Sankranti Shifts 1 Day Every 72 Years
                    </h5>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePlay('मकरसंक्रान्तिः')}
                    style={{
                      background: '#fff7ed',
                      border: '1px solid #fed7aa',
                      borderRadius: '6px',
                      padding: '0.15rem 0.45rem',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      color: '#c2410c',
                    }}
                  >
                    🔊 मकरसंक्रान्तिः
                  </button>
                </div>

                <p style={{ margin: 0, fontSize: '0.82rem', color: '#431407', lineHeight: 1.5 }}>
                  <strong>Sāyana (Tropical) vs Nirāyana (Sidereal):</strong> Sāyana calendars anchor to the solstices, where the Sun enters Capricorn (Winter Solstice) on <strong>Dec 21/22</strong>. Nirāyana calendars anchor to the physical stars (*Nakṣatras*). In <strong>285 CE</strong> (Chitrā-pakṣa epoch), both zodiacs aligned perfectly. Since Earth precesses at <strong>50.29&quot; / year</strong> (~1° every 71.6 years), the sidereal entrance has drifted forward:
                </p>

                {/* Sankranti Year Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <label htmlFor="sankranti-year-slider" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                      Historical Year / Epoch:
                    </label>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ea580c', fontFamily: 'monospace' }}>
                      {sankrantiYear} CE
                    </span>
                  </div>
                  <input
                    id="sankranti-year-slider"
                    type="range"
                    min="-300"
                    max="3000"
                    step="25"
                    value={sankrantiYear}
                    onChange={(e) => setSankrantiYear(parseInt(e.target.value, 10))}
                    style={{ width: '100%', accentColor: '#ea580c' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#9a3412' }}>
                    <span>272 BCE (Dec 21)</span>
                    <span>285 CE (Dec 22)</span>
                    <span>2026 CE (Jan 14)</span>
                    <span>2090 CE (Jan 16)</span>
                    <span>2700 CE (Feb 1)</span>
                  </div>
                </div>

                {/* Quick Epoch Buttons */}
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { label: '272 BCE (Dec 21)', yr: -272 },
                    { label: '285 CE (Dec 22 Solstice)', yr: 285 },
                    { label: '1000 CE (Dec 31)', yr: 1000 },
                    { label: '1500 CE (Jan 7)', yr: 1500 },
                    { label: '1900 CE (Jan 13)', yr: 1900 },
                    { label: '2026 CE (Jan 14/15)', yr: 2026 },
                    { label: '2090 CE (Jan 16 Next Shift)', yr: 2090 },
                    { label: '2700 CE (Feb 1)', yr: 2700 },
                  ].map((p) => (
                    <button
                      key={p.yr}
                      type="button"
                      onClick={() => {
                        soundEffects.playStrokeChime();
                        setSankrantiYear(p.yr);
                      }}
                      style={{
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        borderRadius: '6px',
                        border: '1px solid #fed7aa',
                        background: sankrantiYear === p.yr ? '#ea580c' : '#fff7ed',
                        color: sankrantiYear === p.yr ? '#ffffff' : '#9a3412',
                        cursor: 'pointer',
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Calculation Output Cards */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    background: '#fff7ed',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: '1px solid #ffedd5',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#9a3412', fontWeight: 700, textTransform: 'uppercase' }}>
                      Nirāyana Makar Sankranti:
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#c2410c', fontFamily: 'monospace' }}>
                      {sankrantiDateStr}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#9a3412', fontWeight: 700, textTransform: 'uppercase' }}>
                      Ayanāṃśa / Offset:
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#7c2d12', fontFamily: 'monospace' }}>
                      {ayanamshaDeg.toFixed(2)}° (+{driftDays}d)
                    </div>
                  </div>
                </div>

                {/* The Ongoing Debate & Sister Festivals Callout */}
                <div
                  style={{
                    background: '#fffaf5',
                    border: '1px solid #fed7aa',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                    color: '#7c2d12',
                    lineHeight: 1.45,
                  }}
                >
                  <strong>⚖️ The Ongoing Sāyana vs Nirāyana Debate:</strong> Should India reform the Pañcāṅga to match the seasonal Winter Solstice on Dec 21 (as urged by Dr. Meghnad Saha&apos;s 1952 Calendar Reform Committee), or preserve the sidereal star continuum? Meanwhile, sister festivals like <strong>Baisakhi, Puthandu, and Vishu</strong> have experienced the exact same 24-day drift from the Vernal Equinox (March 21) to <strong>April 14/15</strong>!
                </div>
              </div>

              {/* Card 2: Samrat Yantra 2-Second Timekeeping */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #bae6fd',
                  borderRadius: '12px',
                  padding: '1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>⏱️</span>
                    <h5 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: '#0369a1' }}>
                      Samrat Yantra: Calculating Time to 2 Seconds
                    </h5>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePlay('सम्राट-यन्त्रम्')}
                    style={{
                      background: '#f0f9ff',
                      border: '1px solid #bae6fd',
                      borderRadius: '6px',
                      padding: '0.15rem 0.45rem',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      color: '#0369a1',
                    }}
                  >
                    🔊 सम्राट्-यन्त्रम्
                  </button>
                </div>

                <p style={{ margin: 0, fontSize: '0.82rem', color: '#0c4a6e', lineHeight: 1.5 }}>
                  The <strong>Samrat Yantra</strong> is a supreme equinoctial sundial. Its gnomon rises at local latitude (23.18°), parallel to Earth&apos;s axis, while its marble quadrant arcs lie in the plane of the celestial equator. Because Earth rotates <strong>15° every hour (1° per 4 min)</strong>, a giant scale causes shadows to sweep with visible speed:
                </p>

                {/* Interactive Time of Day */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <label htmlFor="samrat-hour-slider" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                        Local Solar Hour:
                      </label>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0284c7', fontFamily: 'monospace' }}>
                        {samratHour}:{samratMinute.toString().padStart(2, '0')} Local
                      </span>
                    </div>
                    <input
                      id="samrat-hour-slider"
                      type="range"
                      min="6"
                      max="18"
                      value={samratHour}
                      onChange={(e) => setSamratHour(parseInt(e.target.value, 10))}
                      style={{ width: '100%', accentColor: '#0284c7' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <label htmlFor="samrat-min-slider" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                        Fine Minute Calibration (0 - 59m):
                      </label>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0284c7', fontFamily: 'monospace' }}>
                        :{samratMinute.toString().padStart(2, '0')} m
                      </span>
                    </div>
                    <input
                      id="samrat-min-slider"
                      type="range"
                      min="0"
                      max="59"
                      value={samratMinute}
                      onChange={(e) => setSamratMinute(parseInt(e.target.value, 10))}
                      style={{ width: '100%', accentColor: '#0284c7' }}
                    />
                  </div>
                </div>

                {/* Shadow Velocity Mechanics */}
                <div
                  style={{
                    background: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    fontSize: '0.78rem',
                    color: '#0369a1',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span><strong>Quadrant Radius:</strong> R ≈ 9.1 metres</span>
                    <span><strong>Hour Angle:</strong> {hourAngleDeg > 0 ? `+${hourAngleDeg.toFixed(1)}° (PM)` : `${hourAngleDeg.toFixed(1)}° (AM)`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span><strong>Shadow Speed:</strong> 0.66 mm / second</span>
                    <span style={{ color: '#0284c7', fontWeight: 800 }}><strong>1 mm Shift = ~1.5 to 2 Seconds</strong></span>
                  </div>
                </div>

                <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', lineHeight: 1.45 }}>
                  <strong>The Penumbra Problem Solved:</strong> Because the Sun has a 0.5° angular width, shadows cast a fuzzy penumbra edge. Jai Singh&apos;s observers used fine optical threads suspended along the edge of the gnomon to pinpoint the central umbral transition, achieving unambiguous <strong>2-second precision</strong>.
                </p>
              </div>
            </div>
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
