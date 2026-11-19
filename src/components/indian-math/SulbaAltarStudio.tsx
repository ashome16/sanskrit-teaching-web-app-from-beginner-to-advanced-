import React, { useState } from 'react';

export const SulbaAltarStudio: React.FC = () => {
  const [selectedAltar, setSelectedAltar] = useState<'mahavedi' | 'syenaciti' | 'kurmaciti'>('mahavedi');
  const [syenacitiLayer, setSyenacitiLayer] = useState<1 | 2>(1);

  // Mahavedi parameters (canonical: 24, 30, 36 prakramas)
  const [eastFace, setEastFace] = useState<number>(24);
  const [westFace, setWestFace] = useState<number>(30);
  const [altitude, setAltitude] = useState<number>(36);

  // Custom triangle parameters for Baudhayana Theorem
  const [baseA, setBaseA] = useState<number>(3);
  const [heightB, setHeightB] = useState<number>(4);

  // Mahavedi computations
  const mahavediArea = ((eastFace + westFace) / 2) * altitude;
  const halfBaseDiff = Math.abs(westFace - eastFace) / 2;
  const slantSide = Math.sqrt(altitude * altitude + halfBaseDiff * halfBaseDiff);
  const halfBaseSum = (eastFace + westFace) / 2;
  const cornerDiagonal = Math.sqrt(altitude * altitude + halfBaseSum * halfBaseSum);

  // Baudhayana sqrt(2) approximation
  const sqrt2Approx = 1 + 1 / 3 + 1 / 12 - 1 / 408;
  const sqrt2True = Math.SQRT2;
  const sqrt2ErrorPct = (Math.abs(sqrt2Approx - sqrt2True) / sqrt2True) * 100;

  return (
    <div className="im-interactive-box" aria-label="Baudhayana Altar Geometry and Sqrt 2 Simulator">
      <div className="im-interactive-header">
        <h5 className="im-interactive-title">
          Baudhāyana Sacred Altar Geometry &amp; Śulba Invariants Simulator
        </h5>
        <span className="im-interactive-badge">Era 1 Simulator</span>
      </div>

      {/* Altar Selection Bar */}
      <div className="im-altar-selector-bar" role="tablist" aria-label="Vedic Altar Types">
        <button
          type="button"
          className={`im-altar-btn ${selectedAltar === 'mahavedi' ? 'active' : ''}`}
          onClick={() => setSelectedAltar('mahavedi')}
          role="tab"
          aria-selected={selectedAltar === 'mahavedi'}
        >
          1. Mahāvedi (Trapezoidal Soma Altar)
        </button>
        <button
          type="button"
          className={`im-altar-btn ${selectedAltar === 'syenaciti' ? 'active' : ''}`}
          onClick={() => setSelectedAltar('syenaciti')}
          role="tab"
          aria-selected={selectedAltar === 'syenaciti'}
        >
          2. Śyenaciti (Falcon Altar &bull; 1000 Bricks)
        </button>
        <button
          type="button"
          className={`im-altar-btn ${selectedAltar === 'kurmaciti' ? 'active' : ''}`}
          onClick={() => setSelectedAltar('kurmaciti')}
          role="tab"
          aria-selected={selectedAltar === 'kurmaciti'}
        >
          3. Kūrmaciti (Tortoise Altar &bull; Circling Square)
        </button>
      </div>

      {/* VIEW 1: MAHAVEDI (Trapezoid) */}
      {selectedAltar === 'mahavedi' && (
        <div>
          <div className="im-pedagogical-callout">
            <strong>Baudhāyana Śulbasūtra (1.48):</strong> The <em>Mahāvedi</em> is the grand sacred trapezoidal enclosure erected for the Soma sacrifice. The cardinal axis (<em>Prācī</em>) runs 36 prakramas East-to-West. The Eastern face (<em>Mukhya</em>) measures 24 prakramas and the Western face (<em>Paścimā</em>) measures 30 prakramas. The corner-to-corner rope (<em>Akṣṇayā rajjuḥ</em>) measures exactly 45 prakramas, demonstrating the fundamental integral triple (27, 36, 45) = 9 &times; (3, 4, 5).
          </div>

          <div className="im-control-group">
            <div className="im-control-item">
              <label className="im-control-label">East Face (Prakramas):</label>
              <input
                type="number"
                min="10"
                max="60"
                className="im-input"
                value={eastFace}
                onChange={(e) => setEastFace(Number(e.target.value))}
              />
            </div>
            <div className="im-control-item">
              <label className="im-control-label">West Face (Prakramas):</label>
              <input
                type="number"
                min="10"
                max="80"
                className="im-input"
                value={westFace}
                onChange={(e) => setWestFace(Number(e.target.value))}
              />
            </div>
            <div className="im-control-item">
              <label className="im-control-label">Altitude Prācī (Prakramas):</label>
              <input
                type="number"
                min="10"
                max="80"
                className="im-input"
                value={altitude}
                onChange={(e) => setAltitude(Number(e.target.value))}
              />
            </div>
            <button
              type="button"
              className="im-calc-btn"
              onClick={() => {
                setEastFace(24);
                setWestFace(30);
                setAltitude(36);
              }}
            >
              Reset to Canonical (24, 30, 36)
            </button>
          </div>

          {/* Interactive Blueprint SVG */}
          <div className="im-altar-svg-wrap">
            <svg
              className="im-altar-svg"
              viewBox="0 0 640 380"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Mahavedi Sacred Geometry Blueprint"
            >
              <defs>
                <linearGradient id="trapezoidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e5c4a" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0c4a38" stopOpacity="0.8" />
                </linearGradient>
                <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                </marker>
              </defs>

              {/* Background grid */}
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
              </pattern>
              <rect width="640" height="380" fill="url(#grid)" />

              {/* Coordinates: West at x=140, East at x=500. Center y=190 */}
              {/* West edge: height = westFace * 6. East edge: height = eastFace * 6 */}
              {(() => {
                const scale = 5.2;
                const midY = 190;
                const xWest = 130;
                const xEast = 130 + altitude * scale;
                const yWestTop = midY - (westFace * scale) / 2;
                const yWestBottom = midY + (westFace * scale) / 2;
                const yEastTop = midY - (eastFace * scale) / 2;
                const yEastBottom = midY + (eastFace * scale) / 2;

                return (
                  <g>
                    {/* Sacred Trapezoid Fill & Stroke */}
                    <polygon
                      points={`${xWest},${yWestTop} ${xEast},${yEastTop} ${xEast},${yEastBottom} ${xWest},${yWestBottom}`}
                      fill="url(#trapezoidGrad)"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                    />

                    {/* Central East-West Cardinal Axis (Prācī) */}
                    <line
                      x1={xWest - 30}
                      y1={midY}
                      x2={xEast + 40}
                      y2={midY}
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <text x={xEast + 45} y={midY + 4} fill="#38bdf8" fontSize="11" fontWeight="700">
                      East (Prācī)
                    </text>
                    <text x={xWest - 65} y={midY + 4} fill="#38bdf8" fontSize="11" fontWeight="700">
                      West
                    </text>

                    {/* Corner Diagonal Akṣṇayā Rajjuḥ */}
                    <line
                      x1={xWest}
                      y1={yWestBottom}
                      x2={xEast}
                      y2={yEastTop}
                      stroke="#ec4899"
                      strokeWidth="2"
                      strokeDasharray="5 3"
                    />
                    <text
                      x={(xWest + xEast) / 2 + 10}
                      y={midY - 20}
                      fill="#f472b6"
                      fontSize="11"
                      fontWeight="700"
                    >
                      Akṣṇayā (Diagonal = {cornerDiagonal.toFixed(2)})
                    </text>

                    {/* West Face Dimension Marker */}
                    <line
                      x1={xWest - 15}
                      y1={yWestTop}
                      x2={xWest - 15}
                      y2={yWestBottom}
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      markerStart="url(#arrowHead)"
                      markerEnd="url(#arrowHead)"
                    />
                    <text x={xWest - 25} y={midY} fill="#fef3c7" fontSize="11" fontWeight="700" textAnchor="end">
                      {westFace}
                    </text>

                    {/* East Face Dimension Marker */}
                    <line
                      x1={xEast + 15}
                      y1={yEastTop}
                      x2={xEast + 15}
                      y2={yEastBottom}
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      markerStart="url(#arrowHead)"
                      markerEnd="url(#arrowHead)"
                    />
                    <text x={xEast + 25} y={midY} fill="#fef3c7" fontSize="11" fontWeight="700">
                      {eastFace}
                    </text>

                    {/* Altitude Dimension Marker */}
                    <line
                      x1={xWest}
                      y1={yWestBottom + 25}
                      x2={xEast}
                      y2={yWestBottom + 25}
                      stroke="#10b981"
                      strokeWidth="1.5"
                      markerStart="url(#arrowHead)"
                      markerEnd="url(#arrowHead)"
                    />
                    <text x={(xWest + xEast) / 2} y={yWestBottom + 42} fill="#6ee7b7" fontSize="11" fontWeight="700" textAnchor="middle">
                      Altitude = {altitude} prakramas
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Numerical Results Grid */}
          <div className="im-result-panel">
            <div className="im-result-value-row">
              <span className="im-result-label">Total Altar Area: (East + West)/2 &times; Altitude:</span>
              <span className="im-result-val highlight">
                ({eastFace} + {westFace})/2 &times; {altitude} = {mahavediArea.toFixed(2)} sq prakramas
              </span>
            </div>
            <div className="im-result-value-row">
              <span className="im-result-label">Corner Diagonal Rope (Akṣṇayā rajjuḥ):</span>
              <span className="im-result-val">
                &radic;({altitude}&sup2; + {halfBaseSum.toFixed(1)}&sup2;) = {cornerDiagonal.toFixed(4)} prakramas
              </span>
            </div>
            <div className="im-result-value-row">
              <span className="im-result-label">Slant Side Rope (Pārśvamānī):</span>
              <span className="im-result-val">
                &radic;({altitude}&sup2; + {halfBaseDiff.toFixed(1)}&sup2;) = {slantSide.toFixed(4)} prakramas
              </span>
            </div>
            <div className="im-result-value-row">
              <span className="im-result-label">Canonical Baudhāyana Triple:</span>
              <span className="im-result-val" style={{ color: '#16a34a' }}>
                At (24, 30, 36) &rarr; (27, 36, 45) is exactly 9 &times; (3, 4, 5) integer triple!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SYENACITI (Falcon Altar) */}
      {selectedAltar === 'syenaciti' && (
        <div>
          <div className="im-pedagogical-callout">
            <strong>Śyenaciti (The Falcon Fire Altar):</strong> Mentioned in the <em>Taittirīya Saṃhitā</em> and formulated geometrically by Baudhāyana and Āpastamba. The altar symbolizes flight to celestial immortality. It consists of exactly <strong>5 layers</strong> of <strong>200 consecrated bricks each = 1,000 bricks</strong>. The total area is strictly conserved to <strong>7.5 puruṣas</strong> (7&frac12; man-lengths squared). Crucially, bricks in Layer 2 are shifted so that no vertical joint coincides with Layer 1, creating an earthquake-resilient masonry bond.
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', margin: '0.75rem 0' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155' }}>Select Brick Layer:</span>
            <button
              type="button"
              className={`im-preset-btn ${syenacitiLayer === 1 ? 'active' : ''}`}
              onClick={() => setSyenacitiLayer(1)}
            >
              Layer 1 (Prathama-Prastāra &bull; 200 Bricks)
            </button>
            <button
              type="button"
              className={`im-preset-btn ${syenacitiLayer === 2 ? 'active' : ''}`}
              onClick={() => setSyenacitiLayer(2)}
            >
              Layer 2 (Dvitīya-Prastāra &bull; Staggered Joints)
            </button>
          </div>

          {/* Interactive Falcon Blueprint SVG */}
          <div className="im-altar-svg-wrap">
            <svg
              className="im-altar-svg"
              viewBox="0 0 640 400"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Syenaciti Falcon Altar Layer Blueprint"
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e5c4a" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0c4a38" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Background grid */}
              <rect width="640" height="400" fill="#0f172a" />

              {/* Falcon Head (Śiras) */}
              <polygon points="320,30 290,90 350,90" fill="#f59e0b" stroke="#fef3c7" strokeWidth="1.5" />
              <text x="320" y="70" fill="#0f172a" fontSize="10" fontWeight="800" textAnchor="middle">
                Śiras (0.5P)
              </text>

              {/* Falcon Body (Ātman: 2x2 = 4 puruṣas) */}
              <rect
                x="240"
                y="90"
                width="160"
                height="160"
                fill="url(#bodyGrad)"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <text x="320" y="175" fill="#fef3c7" fontSize="12" fontWeight="800" textAnchor="middle">
                Ātman / Body (4.0 sq puruṣas)
              </text>

              {/* Brick Subdivision grid on Body for active layer */}
              {Array.from({ length: 4 }).map((_, r) =>
                Array.from({ length: 4 }).map((_, c) => {
                  const shift = syenacitiLayer === 2 ? (r % 2 === 0 ? 10 : -10) : 0;
                  return (
                    <rect
                      key={`${r}-${c}`}
                      x={240 + c * 40 + shift}
                      y={90 + r * 40}
                      width="38"
                      height="38"
                      fill="none"
                      stroke="#fcd34d"
                      strokeWidth="0.75"
                      strokeDasharray={syenacitiLayer === 2 ? '2 2' : 'none'}
                      opacity="0.65"
                    />
                  );
                })
              )}

              {/* Left Wing (Dakṣiṇa Pakṣa: 1.2 sq puruṣa) */}
              <polygon
                points="240,110 60,150 100,230 240,210"
                fill="url(#wingGrad)"
                stroke="#34d399"
                strokeWidth="2"
              />
              <text x="150" y="175" fill="#a7f3d0" fontSize="11" fontWeight="700" textAnchor="middle">
                Left Wing (1.2P)
              </text>

              {/* Right Wing (Uttara Pakṣa: 1.2 sq puruṣa) */}
              <polygon
                points="400,110 580,150 540,230 400,210"
                fill="url(#wingGrad)"
                stroke="#34d399"
                strokeWidth="2"
              />
              <text x="490" y="175" fill="#a7f3d0" fontSize="11" fontWeight="700" textAnchor="middle">
                Right Wing (1.2P)
              </text>

              {/* Tail (Puccha: 0.6 sq puruṣa) */}
              <polygon
                points="270,250 370,250 390,360 250,360"
                fill="url(#bodyGrad)"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <text x="320" y="310" fill="#fef3c7" fontSize="11" fontWeight="700" textAnchor="middle">
                Puccha / Tail (0.6P)
              </text>

              {/* Layer label */}
              <rect x="20" y="20" width="230" height="32" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="30" y="41" fill="#38bdf8" fontSize="11" fontWeight="700">
                Active: Layer {syenacitiLayer} of 5 ({syenacitiLayer === 1 ? 'Longitudinal' : 'Staggered Cross'})
              </text>
            </svg>
          </div>

          <div className="im-result-panel">
            <div className="im-result-value-row">
              <span className="im-result-label">Total Consecrated Bricks:</span>
              <span className="im-result-val highlight">1,000 bricks across 5 layers (200 per layer)</span>
            </div>
            <div className="im-result-value-row">
              <span className="im-result-label">Sacred Total Area Invariant:</span>
              <span className="im-result-val">
                Head (0.5) + Body (4.0) + 2 Wings (2.4) + Tail (0.6) = 7.5 puruṣas
              </span>
            </div>
            <div className="im-result-value-row">
              <span className="im-result-label">Masonry Bonding Principle:</span>
              <span className="im-result-val" style={{ color: '#16a34a' }}>
                Layer {syenacitiLayer}: Alternating orthogonal joints guarantee zero continuous fault planes.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: KURMACITI (Tortoise Altar & Circling the Square) */}
      {selectedAltar === 'kurmaciti' && (
        <div>
          <div className="im-pedagogical-callout">
            <strong>Kūrmaciti &amp; Squaring the Circle (Catur-aśra-maṇḍala):</strong> The tortoise altar represents the foundation of the cosmos. Baudhāyana gave an algorithmic method to convert a square fire altar into a circular altar of precisely equivalent area:
            <br />
            <em>Radius R = (s / 2) + ((&radic;2 - 1) / 3) &times; s &approx; 0.63807 s</em>
            <br />
            This allowed Vedic priests to construct circular Gārhapatya altars having identical heat/area capacity to square Āhavanīya altars.
          </div>

          <div className="im-altar-svg-wrap">
            <svg
              className="im-altar-svg"
              viewBox="0 0 640 360"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Kurmaciti Circle and Square Area Equivalence"
            >
              <rect width="640" height="360" fill="#0f172a" />

              {/* Center point at x=320, y=180 */}
              {/* Reference Square of side s = 180 */}
              <rect
                x="230"
                y="90"
                width="180"
                height="180"
                fill="rgba(56, 189, 248, 0.15)"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text x="235" y="110" fill="#7dd3fc" fontSize="11" fontWeight="700">
                Square Altar (Side s = 100, Area = 10,000)
              </text>

              {/* Baudhayana Equivalent Circle: R = 180 * 0.63807 / 1.128 &approx; 101.5 */}
              <circle
                cx="320"
                cy="180"
                r="101.5"
                fill="rgba(245, 158, 11, 0.2)"
                stroke="#f59e0b"
                strokeWidth="2.5"
              />
              <text x="320" y="185" fill="#fef3c7" fontSize="12" fontWeight="800" textAnchor="middle">
                Circling Circle (Radius R = 0.638s)
              </text>

              {/* Radius Line */}
              <line x1="320" y1="180" x2="421.5" y2="180" stroke="#fcd34d" strokeWidth="2" />
              <text x="370" y="172" fill="#fde68a" fontSize="10" fontWeight="700">
                R &approx; 0.638s
              </text>

              {/* Tortoise Limbs and Head Glyphs */}
              <circle cx="320" cy="65" r="14" fill="#1e5c4a" stroke="#34d399" strokeWidth="1.5" />
              <circle cx="215" cy="115" r="10" fill="#1e5c4a" stroke="#34d399" strokeWidth="1.5" />
              <circle cx="425" cy="115" r="10" fill="#1e5c4a" stroke="#34d399" strokeWidth="1.5" />
              <circle cx="225" cy="245" r="10" fill="#1e5c4a" stroke="#34d399" strokeWidth="1.5" />
              <circle cx="415" cy="245" r="10" fill="#1e5c4a" stroke="#34d399" strokeWidth="1.5" />
              <line x1="320" y1="281.5" x2="320" y2="305" stroke="#34d399" strokeWidth="3" />
            </svg>
          </div>

          <div className="im-result-panel">
            <div className="im-result-value-row">
              <span className="im-result-label">Baudhāyana Circling Formula:</span>
              <span className="im-result-val highlight">R = s/2 + ((&radic;2 - 1)/3)s &approx; 0.63807 &times; s</span>
            </div>
            <div className="im-result-value-row">
              <span className="im-result-label">Area Equivalence Accuracy:</span>
              <span className="im-result-val">
                &pi;R&sup2; = &pi;(0.63807s)&sup2; &approx; 1.017 s&sup2; (Accurate within 1.7% in 800 BCE!)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Sqrt(2) & Triple Calculator Section */}
      <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
        <h6 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0c4a38', margin: '0 0 0.75rem' }}>
          Interactive Baudhāyana Right Triangle &amp; &radic;2 Fraction Engine
        </h6>
        <div className="im-control-group">
          <div className="im-control-item">
            <label className="im-control-label">Length Pārśvamānī (a):</label>
            <input
              type="number"
              min="1"
              max="100"
              className="im-input"
              value={baseA}
              onChange={(e) => setBaseA(Number(e.target.value))}
            />
          </div>
          <div className="im-control-item">
            <label className="im-control-label">Breadth Tiryaṅmānī (b):</label>
            <input
              type="number"
              min="1"
              max="100"
              className="im-input"
              value={heightB}
              onChange={(e) => setHeightB(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="im-result-panel">
          <div className="im-result-value-row">
            <span className="im-result-label">Diagonal Akṣṇayā Rajjuḥ c = &radic;(a&sup2; + b&sup2;):</span>
            <span className="im-result-val">
              &radic;({baseA}&sup2; + {heightB}&sup2;) = {Math.sqrt(baseA * baseA + heightB * heightB).toFixed(4)}
            </span>
          </div>
          <div className="im-result-value-row">
            <span className="im-result-label">Baudhāyana &radic;2 Formula (1 + 1/3 + 1/12 - 1/408):</span>
            <span className="im-result-val highlight">
              577 / 408 = {sqrt2Approx.toFixed(7)} (Error: {sqrt2ErrorPct.toFixed(6)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
