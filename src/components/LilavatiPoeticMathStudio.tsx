import React, { useState } from 'react';

interface LilavatiStudioProps {
  onPlayAudio?: (term: string) => void;
}

export const LilavatiPoeticMathStudio: React.FC<LilavatiStudioProps> = ({ onPlayAudio }) => {
  const [activeTab, setActiveTab] = useState<'bees' | 'necklace' | 'peacock' | 'lotus'>('bees');

  // Interactive state for Peacock & Snake
  const [pillarHeight, setPillarHeight] = useState<number>(9);
  const [snakeDistMultiplier, setSnakeDistMultiplier] = useState<number>(3); // 3x pillar height = 27

  // Interactive state for Lotus in Lake
  const [bloomHeight, setBloomHeight] = useState<number>(0.5); // cubits above surface
  const [horizontalShift, setHorizontalShift] = useState<number>(2.0); // cubits to touch water

  // Interactive state for Pearl Necklace
  const [remainingPearls, setRemainingPearls] = useState<number>(6);

  // Calculations for Peacock:
  // D = snakeDistMultiplier * pillarHeight
  // x = (D^2 - H^2) / (2D)
  const D = snakeDistMultiplier * pillarHeight;
  const interceptDist = (Math.pow(D, 2) - Math.pow(pillarHeight, 2)) / (2 * D);
  const flightDist = Math.sqrt(Math.pow(pillarHeight, 2) + Math.pow(interceptDist, 2));

  // Calculations for Lotus:
  // d = (L^2 - h^2) / (2h)
  const waterDepth = (Math.pow(horizontalShift, 2) - Math.pow(bloomHeight, 2)) / (2 * bloomHeight);
  const stemLength = waterDepth + bloomHeight;

  // Calculations for Necklace:
  // (1/6 + 1/5 + 1/3 + 1/10) = 4/5
  // (1 - 4/5)p = remainingPearls => p/5 = remainingPearls => p = 5 * remainingPearls
  const totalPearls = remainingPearls * 5;

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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0d9488' }}>
            Interactive Mathematical Poetry Studio
          </span>
          <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
            लीलावती (Līlāvatī) · The Four Poetic Puzzles of Bhāskara II
          </h3>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#64748b' }}>
            Quadratic Equations, Fractional Rhythms, and Pythagorean Geometry Cloaked in Nature’s Beauty (1114 CE)
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.35rem', background: '#f1f5f9', padding: '0.35rem', borderRadius: '10px' }}>
          {[
            { id: 'bees', label: '🐝 Swarm of Bees', sub: 'Quadratic' },
            { id: 'necklace', label: '📿 Broken Necklace', sub: 'Fractions' },
            { id: 'peacock', label: '🦚 Peacock & Snake', sub: 'Geometry' },
            { id: 'lotus', label: '🪷 Lotus in Lake', sub: 'Depth' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? '#0d9488' : 'transparent',
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
          TAB 1: THE SWARM OF BEES (QUADRATIC EQUATION)
         ========================================================================= */}
      {activeTab === 'bees' && (
        <div>
          <div style={{ background: '#f0fdfa', border: '1.5px solid #99f6e4', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>
                Classic Sanskrit Verse · भ्रमर-समस्या
              </span>
              <button
                type="button"
                onClick={() => onPlayAudio?.('अलिकुलदलमूलं मालतीं यातम्')}
                style={{
                  padding: '0.2rem 0.5rem',
                  fontSize: '0.76rem',
                  borderRadius: '6px',
                  border: '1px solid #5eead4',
                  background: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                🔊 Chant Verse
              </button>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#134e4a', lineHeight: 1.6, marginBottom: '0.4rem' }}>
              अलिकुलदलमूलं मालतीं यातम्...<br />
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f766e' }}>
                aliguladalaṁ pañcamo malindaḥ, tribhāgo vilīyate mallikāyām |<br />
                tadantaraguṇaṁ triguṇaṁ ca mālatyāṁ, nalinīdale ca avaśiṣṭa ekaḥ ||
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#115e59', lineHeight: 1.5 }}>
              <strong>The Poetic Riddle:</strong> &quot;The square root of half the swarm of bees flew to the fragrant Mālatī blossoms. One fifth landed upon the jasmine bush; one third nestled in the lotus bloom. Three times the difference between those in the jasmine and the lotus flew to the trumpet flower. And exactly one lonely bee remained trapped inside the folded lotus bud at night. Tell me, lovely Līlāvatī, how many bees were there in the swarm?&quot;
            </p>
          </div>

          {/* Visual Breakdown of Bees */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>1. Mālatī Blossoms</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>√(x / 2)</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Square root of half the swarm</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>2. Jasmine Bush</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>x / 5</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>One-fifth of entire swarm</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>3. Lotus Bloom</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>x / 3</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>One-third of entire swarm</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>4. Trumpet Flower</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>2x / 5</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>3 × (x/3 - x/5) = 2x/5</div>
            </div>
            <div style={{ background: '#fef3c7', padding: '0.85rem', borderRadius: '10px', border: '1px solid #fde68a' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase' }}>5. Trapped Bee</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#92400e', margin: '0.2rem 0' }}>1 Bee</div>
              <div style={{ fontSize: '0.78rem', color: '#b45309' }}>Captive in closed bud</div>
            </div>
          </div>

          {/* Mathematical Proof Card */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
            <h4 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>
              Algebraic Resolution: Isolating the Radical &amp; Factoring the Quadratic
            </h4>
            <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.7, fontFamily: 'monospace' }}>
              <div><strong>Step 1:</strong> x = √(x/2) + (x/5 + x/3 + 2x/5) + 1</div>
              <div><strong>Step 2:</strong> Group linear terms: (3x/5 + x/3) = 14x/15</div>
              <div><strong>Step 3:</strong> Isolate radical: x - 14x/15 - 1 = √(x/2) ➔ <strong>x/15 - 1 = √(x/2)</strong></div>
              <div><strong>Step 4:</strong> Square both sides: ((x - 15) / 15)² = x / 2</div>
              <div><strong>Step 5:</strong> (x² - 30x + 225) / 225 = x / 2 ➔ 2x² - 60x + 450 = 225x</div>
              <div><strong>Step 6:</strong> Standard quadratic form: <strong>2x² - 285x + 450 = 0</strong></div>
            </div>

            <div style={{ marginTop: '1rem', padding: '0.85rem', borderRadius: '8px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
              <div style={{ fontWeight: 800, color: '#065f46', fontSize: '0.92rem' }}>
                Bhāskara’s Canonical Sister Problem: x = 72 Bees
              </div>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.86rem', color: '#047857', lineHeight: 1.5 }}>
                In the parallel canonical verse <em>Alikuladalamūlaṁ mālatīṁ yātamaṣṭau...</em>, Bhāskara sets √(x/2) + 8/9 x + 2 = x, which reduces to <strong>(2x - 9)(x - 72) = 0</strong>.
                Disregarding the fractional non-integer root 9/2, the exact answer is <strong>72 bees</strong> (where 6 fly to jasmine, 64 to mālatī, and 2 remain humming)!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: THE BROKEN NECKLACE (FRACTIONS)
         ========================================================================= */}
      {activeTab === 'necklace' && (
        <div>
          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              A Lover’s Quarrel in Fractions · मुक्ताहार-समस्या
            </div>
            <blockquote style={{ margin: '0 0 0.5rem', fontStyle: 'italic', fontSize: '0.96rem', color: '#92400e', lineHeight: 1.5 }}>
              &quot;Whilst making love a necklace broke. A row of pearls mislaid.<br />
              One sixth fell to the floor. One fifth upon the bed.<br />
              The young woman saved one third of them. One tenth were caught by her lover.<br />
              If six pearls remained upon the string, how many pearls were there altogether?&quot;
            </blockquote>
          </div>

          {/* Interactive pearl adjustment slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem', background: '#f8fafc', padding: '0.85rem 1.15rem', borderRadius: '10px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155' }}>
              Pearls remaining on string (default 6):
            </label>
            <input
              type="range"
              min={1}
              max={20}
              value={remainingPearls}
              onChange={(e) => setRemainingPearls(Number(e.target.value))}
              style={{ flex: '1 1 150px', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 800, color: '#0d9488', fontSize: '1.1rem' }}>
              {remainingPearls} pearls
            </span>
          </div>

          {/* Fraction Breakdown Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b' }}>Fell to Floor (1/6)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {Math.round((totalPearls * 1) / 6)} Pearls
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>5/30 of total</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b' }}>Upon the Bed (1/5)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {Math.round((totalPearls * 1) / 5)} Pearls
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>6/30 of total</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b' }}>Saved by Lady (1/3)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {Math.round((totalPearls * 1) / 3)} Pearls
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>10/30 of total</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b' }}>Caught by Lover (1/10)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {Math.round((totalPearls * 1) / 10)} Pearls
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>3/30 of total</div>
            </div>
          </div>

          {/* Visual Pearl String Ribbon */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: '12px',
              padding: '1.25rem',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#cbd5e1' }}>
                TOTAL STRING CAPACITY: {totalPearls} PEARLS
              </span>
              <span style={{ fontSize: '0.84rem', color: '#38bdf8', fontWeight: 700 }}>
                Fractional Sum: (5 + 6 + 10 + 3)/30 = 24/30 = 4/5
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', alignItems: 'center', padding: '0.5rem 0' }}>
              {Array.from({ length: totalPearls }).map((_, idx) => {
                let color = '#38bdf8'; // floor
                if (idx >= totalPearls * (1 / 6) && idx < totalPearls * (1 / 6 + 1 / 5)) color = '#a855f7'; // bed
                else if (idx >= totalPearls * (1 / 6 + 1 / 5) && idx < totalPearls * (1 / 6 + 1 / 5 + 1 / 3)) color = '#ec4899'; // lady
                else if (idx >= totalPearls * (1 / 6 + 1 / 5 + 1 / 3) && idx < totalPearls * (4 / 5)) color = '#eab308'; // lover
                else if (idx >= totalPearls * (4 / 5)) color = '#ffffff'; // string

                return (
                  <span
                    key={idx}
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 30% 30%, #ffffff, ${color})`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                      display: 'inline-block',
                    }}
                    title={`Pearl #${idx + 1}`}
                  />
                );
              })}
            </div>

            <div style={{ marginTop: '0.75rem', fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Since 4/5 of the necklace is accounted for across the room, the remaining <strong>1/5 represents the {remainingPearls} pearls</strong> still on the string:
              <br />
              <code>1/5 p = {remainingPearls} ➔ p = 5 × {remainingPearls} = {totalPearls} pearls!</code>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: THE PEACOCK AND THE SNAKE (PYTHAGOREAN THEOREM)
         ========================================================================= */}
      {activeTab === 'peacock' && (
        <div>
          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Pythagorean Flight Path · मयूर-सर्प-समस्या
            </div>
            <blockquote style={{ margin: '0 0 0.5rem', fontStyle: 'italic', fontSize: '0.96rem', color: '#14532d', lineHeight: 1.5 }}>
              &quot;There is a pillar nine cubits high, and a pet peacock sits on top of it. At its base is the entrance to a snake’s hole. Spotting the snake moving towards its burrow from a distance of three times the pillar’s height, the peacock flies down diagonally to intercept it. If their speeds are exactly equal, tell me, learned mathematician, at what distance from the hole do they collide?&quot;
            </blockquote>
          </div>

          {/* Interactive controls for pillar and snake */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem', background: '#f8fafc', padding: '1rem', borderRadius: '10px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Pillar Height: <strong>{pillarHeight} cubits</strong>
              </label>
              <input
                type="range"
                min={5}
                max={20}
                value={pillarHeight}
                onChange={(e) => setPillarHeight(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Snake Initial Distance: <strong>{D} cubits</strong> ({snakeDistMultiplier}× pillar)
              </label>
              <input
                type="range"
                min={2}
                max={5}
                step={0.5}
                value={snakeDistMultiplier}
                onChange={(e) => setSnakeDistMultiplier(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Visual SVG Diagram */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
            <svg viewBox="0 0 500 220" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}>
              {/* Ground */}
              <line x1="30" y1="180" x2="470" y2="180" stroke="#78716c" strokeWidth="3" />

              {/* Pillar at x=60 */}
              <rect x="52" y="40" width="16" height="140" fill="#a8a29e" stroke="#57534e" strokeWidth="1.5" />
              <text x="60" y="30" textAnchor="middle" fontSize="16">🦚</text>
              <text x="35" y="110" fontSize="12" fill="#44403c" fontWeight="bold">H = {pillarHeight}</text>

              {/* Snake Hole at (60, 180) */}
              <circle cx="60" cy="180" r="5" fill="#1c1917" />
              <text x="60" y="200" textAnchor="middle" fontSize="11" fill="#44403c">Hole (0,0)</text>

              {/* Intercept point */}
              {/* Map x=60 to 0, x=440 to D */}
              {(() => {
                const pxScale = 380 / D;
                const interceptX = 60 + interceptDist * pxScale;
                const snakeStartX = 60 + D * pxScale;

                return (
                  <>
                    {/* Snake at start */}
                    <circle cx={snakeStartX} cy="180" r="6" fill="#15803d" />
                    <text x={snakeStartX} y="170" textAnchor="middle" fontSize="14">🐍</text>
                    <text x={snakeStartX} y="200" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">
                      Start ({D})
                    </text>

                    {/* Flight path hypotenuse */}
                    <line x1="60" y1="40" x2={interceptX} y2="180" stroke="#d97706" strokeWidth="2.5" strokeDasharray="5,4" />

                    {/* Snake path */}
                    <line x1={snakeStartX} y1="180" x2={interceptX} y2="180" stroke="#16a34a" strokeWidth="3" />

                    {/* Intercept collision marker */}
                    <circle cx={interceptX} cy="180" r="7" fill="#dc2626" />
                    <text x={interceptX} y="165" textAnchor="middle" fontSize="11" fill="#b91c1c" fontWeight="bold">
                      Collision! (x = {interceptDist.toFixed(1)} c)
                    </text>
                    <text x={interceptX} y="215" textAnchor="middle" fontSize="11" fill="#b45309">
                      Travel dist: {(D - interceptDist).toFixed(1)} cubits
                    </text>
                  </>
                );
              })()}
            </svg>

            {/* Proof Card */}
            <div style={{ marginTop: '1rem', textAlign: 'left', background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
              <strong>Pythagorean Equivalence:</strong><br />
              Since both speeds are equal, the peacock’s flight distance <em>c</em> equals the snake’s crawl distance <em>(D - x)</em>:<br />
              <code>H² + x² = (D - x)² ➔ H² + x² = D² - 2Dx + x² ➔ 2Dx = D² - H² ➔ x = (D² - H²) / 2D</code><br />
              <code>x = ({Math.pow(D, 2)} - {Math.pow(pillarHeight, 2)}) / {2 * D} = {Math.pow(D, 2) - Math.pow(pillarHeight, 2)} / {2 * D} = <strong>{interceptDist.toFixed(2)} cubits from the hole!</strong> (Peacock flight distance c = {flightDist.toFixed(2)} cubits, matching snake travel distance)</code>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: THE LOTUS IN THE LAKE (WATER DEPTH)
         ========================================================================= */}
      {activeTab === 'lotus' && (
        <div>
          <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Submerged Bloom Geometry · कमल-जल-समस्या
            </div>
            <blockquote style={{ margin: '0 0 0.5rem', fontStyle: 'italic', fontSize: '0.96rem', color: '#0369a1', lineHeight: 1.5 }}>
              &quot;In a certain lake, a pure lotus bud can be seen standing vertically, its bloom rising half a cubit above the surface of the water. Driven by a fierce gust of wind, the lotus is pushed gradually until it is completely submerged, touching the surface of the water exactly two cubits away from its original position. Tell me quickly, O mathematician, what is the total depth of the water?&quot;
            </blockquote>
          </div>

          {/* Interactive sliders for Bloom Height and Shift */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem', background: '#f8fafc', padding: '1rem', borderRadius: '10px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Bloom height above water (h): <strong>{bloomHeight} cubits</strong>
              </label>
              <input
                type="range"
                min={0.2}
                max={2.0}
                step={0.1}
                value={bloomHeight}
                onChange={(e) => setBloomHeight(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Horizontal displacement before submersion (L): <strong>{horizontalShift} cubits</strong>
              </label>
              <input
                type="range"
                min={1.0}
                max={5.0}
                step={0.25}
                value={horizontalShift}
                onChange={(e) => setHorizontalShift(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Visual Lake Diagram */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
            <svg viewBox="0 0 500 240" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}>
              {/* Lake bed */}
              <line x1="40" y1="210" x2="460" y2="210" stroke="#78716c" strokeWidth="3" />
              <text x="250" y="230" textAnchor="middle" fontSize="11" fill="#78716c">Lake Bed (Root Anchor)</text>

              {/* Water surface at y=80 */}
              <rect x="40" y="80" width="420" height="130" fill="#e0f2fe" opacity="0.6" />
              <line x1="40" y1="80" x2="460" y2="80" stroke="#0284c7" strokeWidth="2" strokeDasharray="6,4" />
              <text x="70" y="72" fontSize="11" fill="#0284c7" fontWeight="bold">Water Surface</text>

              {/* Lotus root anchor at (150, 210) */}
              <circle cx="150" cy="210" r="5" fill="#854d0e" />

              {/* Vertical Lotus Stem */}
              <line x1="150" y1="210" x2="150" y2="40" stroke="#16a34a" strokeWidth="3" />
              <text x="150" y="32" textAnchor="middle" fontSize="16">🪷</text>
              <text x="125" y="145" textAnchor="middle" fontSize="11" fill="#0369a1" fontWeight="bold">
                Depth d = {waterDepth.toFixed(2)} c
              </text>
              <text x="125" y="58" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">
                h = {bloomHeight} c
              </text>

              {/* Bent Lotus Stem under wind */}
              {(() => {
                // Horizontal displacement L = 2 cubits
                // Scale: depth maps to 130px, so 1 cubit = 130 / waterDepth px
                const scale = 130 / Math.max(1, waterDepth);
                const bentX = 150 + horizontalShift * scale;
                return (
                  <>
                    <line x1="150" y1="210" x2={bentX} y2="80" stroke="#059669" strokeWidth="3" strokeDasharray="5,4" />
                    <text x={bentX} y="72" textAnchor="middle" fontSize="16">🪷</text>

                    {/* Horizontal distance line */}
                    <line x1="150" y1="80" x2={bentX} y2="80" stroke="#d97706" strokeWidth="2" />
                    <text x={(150 + bentX) / 2} y="98" textAnchor="middle" fontSize="11" fill="#b45309" fontWeight="bold">
                      L = {horizontalShift} cubits
                    </text>

                    {/* Wind arrow */}
                    <text x="210" y="50" fontSize="13" fill="#64748b">💨 Fierce Gust</text>
                  </>
                );
              })()}
            </svg>

            {/* Proof Card */}
            <div style={{ marginTop: '1rem', textAlign: 'left', background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
              <strong>The Right-Angled Submersion Proof:</strong><br />
              Total length of stem = <em>d + h</em>. When submerged, the stem forms the hypotenuse of a right-angled triangle with vertical leg <em>d</em> and horizontal base <em>L</em>:<br />
              <code>d² + L² = (d + h)² ➔ d² + L² = d² + 2dh + h² ➔ 2dh = L² - h² ➔ d = (L² - h²) / (2h)</code><br />
              With L = {horizontalShift} and h = {bloomHeight}:<br />
              <code>d = ({Math.pow(horizontalShift, 2).toFixed(2)} - {Math.pow(bloomHeight, 2).toFixed(2)}) / {2 * bloomHeight} = <strong>{waterDepth.toFixed(2)} cubits!</strong> (Stem Length = {stemLength.toFixed(2)} cubits)</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
