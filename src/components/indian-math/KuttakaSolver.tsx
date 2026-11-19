import React, { useState } from 'react';

export interface KuttakaStep {
  step: number;
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
}

export interface KuttakaResult {
  solvable: boolean;
  message?: string;
  gcdVal: number;
  reducedA: number;
  reducedB: number;
  reducedC: number;
  steps: KuttakaStep[];
  quotients: number[];
  x: number;
  y: number;
  verified: boolean;
}

export const KuttakaSolver: React.FC = () => {
  const [a, setA] = useState<number>(137);
  const [b, setB] = useState<number>(60);
  const [c, setC] = useState<number>(10);
  const [activePreset, setActivePreset] = useState<string>('classic');

  // Math helper: gcd
  const calcGcd = (xVal: number, yVal: number): number => {
    let px = Math.abs(xVal);
    let py = Math.abs(yVal);
    while (py !== 0) {
      const temp = py;
      py = px % py;
      px = temp;
    }
    return px || 1;
  };

  // Kuttaka calculation engine
  const solveKuttaka = (inA: number, inB: number, inC: number): KuttakaResult => {
    if (inA <= 0 || inB <= 0) {
      return {
        solvable: false,
        message: 'Parameters a and b must be positive integers.',
        gcdVal: 1,
        reducedA: inA,
        reducedB: inB,
        reducedC: inC,
        steps: [],
        quotients: [],
        x: 0,
        y: 0,
        verified: false,
      };
    }

    const g = calcGcd(inA, inB);
    if (inC % g !== 0) {
      return {
        solvable: false,
        message: `No integer solution exists: Constant c (${inC}) is not divisible by gcd(${inA}, ${inB}) = ${g}.`,
        gcdVal: g,
        reducedA: inA,
        reducedB: inB,
        reducedC: inC,
        steps: [],
        quotients: [],
        x: 0,
        y: 0,
        verified: false,
      };
    }

    const redA = inA / g;
    const redB = inB / g;
    const redC = inC / g;

    // Mutual division steps
    const steps: KuttakaStep[] = [];
    const quotients: number[] = [];
    let rPrev = redA;
    let rCurr = redB;

    while (rCurr !== 0) {
      const q = Math.floor(rPrev / rCurr);
      const rNext = rPrev % rCurr;
      steps.push({
        step: steps.length + 1,
        dividend: rPrev,
        divisor: rCurr,
        quotient: q,
        remainder: rNext,
      });
      quotients.push(q);
      rPrev = rCurr;
      rCurr = rNext;
    }

    // Extended Euclidean algorithm to solve by - ax = c
    // We want b*u + a*v = 1
    const extGcd = (p: number, q: number): [number, number, number] => {
      if (q === 0) return [p, 1, 0];
      const [d, s1, t1] = extGcd(q, p % q);
      return [d, t1, s1 - Math.floor(p / q) * t1];
    };

    const [, u, v] = extGcd(redB, redA);
    // b*u + a*v = 1  =>  b*(u*c) - a*(-v*c) = c
    const x0 = -v * redC;
    const y0 = u * redC;

    // Normalize to minimal positive integer x > 0:
    // x = x0 + k * b,  y = y0 + k * a
    const k = -Math.floor(x0 / redB);
    let solX = x0 + k * redB;
    let solY = y0 + k * redA;
    if (solX <= 0) {
      solX += redB;
      solY += redA;
    }

    const verified = inA * solX + inC === inB * solY;

    return {
      solvable: true,
      gcdVal: g,
      reducedA: redA,
      reducedB: redB,
      reducedC: redC,
      steps,
      quotients,
      x: solX,
      y: solY,
      verified,
    };
  };

  const result = solveKuttaka(a, b, c);

  const applyPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    if (presetKey === 'classic') {
      setA(137);
      setB(60);
      setC(10);
    } else if (presetKey === 'synodic') {
      setA(137);
      setB(60);
      setC(1);
    } else if (presetKey === 'brahmagupta') {
      setA(100);
      setB(63);
      setC(90);
    } else if (presetKey === 'ahargana') {
      setA(29);
      setB(30);
      setC(14);
    }
  };

  return (
    <div className="im-interactive-box" aria-label="Aryabhata Kuttaka Pulverizer Engine">
      <div className="im-interactive-header">
        <h5 className="im-interactive-title">
          Āryabhaṭa I Kuṭṭaka (The Pulverizer) Linear Diophantine Solver
        </h5>
        <span className="im-interactive-badge">Era 5 Simulator</span>
      </div>

      <div className="im-pedagogical-callout">
        <strong>Āryabhaṭīya (Gaṇitapāda 32–33):</strong> <em>Kuṭṭaka</em> literally means &ldquo;pulverizer&rdquo; or &ldquo;grinding to fine dust&rdquo;. It is the world&rsquo;s first general constructive algorithm for solving linear Diophantine equations of the form <strong>ax + c = by</strong> (or <em>by &minus; ax = c</em>). Āryabhaṭa used this method to compute the <em>Ahargaṇa</em> (number of civil days elapsed since the start of Kaliyuga) by harmonizing the residual cycles of the Sun, Moon, and planetary revolutions.
      </div>

      {/* Preset Pills */}
      <div className="im-preset-pills">
        <span className="im-preset-label">Historical Treatises:</span>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'classic' ? 'active' : ''}`}
          onClick={() => applyPreset('classic')}
        >
          Āryabhaṭa Classic (137x + 10 = 60y)
        </button>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'synodic' ? 'active' : ''}`}
          onClick={() => applyPreset('synodic')}
        >
          Planetary Synodic (137x + 1 = 60y)
        </button>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'brahmagupta' ? 'active' : ''}`}
          onClick={() => applyPreset('brahmagupta')}
        >
          Brahmagupta (100x + 90 = 63y)
        </button>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'ahargana' ? 'active' : ''}`}
          onClick={() => applyPreset('ahargana')}
        >
          Ahargaṇa Cycle (29x + 14 = 30y)
        </button>
      </div>

      {/* Input Controls */}
      <div className="im-control-group">
        <div className="im-control-item">
          <label className="im-control-label">Dividend (Bhājya &bull; a):</label>
          <input
            type="number"
            min="1"
            className="im-input"
            value={a}
            onChange={(e) => {
              setA(Number(e.target.value));
              setActivePreset('custom');
            }}
          />
        </div>
        <div className="im-control-item">
          <label className="im-control-label">Divisor (Bhāgahāra &bull; b):</label>
          <input
            type="number"
            min="1"
            className="im-input"
            value={b}
            onChange={(e) => {
              setB(Number(e.target.value));
              setActivePreset('custom');
            }}
          />
        </div>
        <div className="im-control-item">
          <label className="im-control-label">Constant Interpolator (Kṣepa &bull; c):</label>
          <input
            type="number"
            className="im-input"
            value={c}
            onChange={(e) => {
              setC(Number(e.target.value));
              setActivePreset('custom');
            }}
          />
        </div>
      </div>

      {/* Results or Solvability Message */}
      {!result.solvable ? (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            padding: '1rem',
            borderRadius: '8px',
            margin: '1rem 0',
            fontWeight: 600,
          }}
        >
          {result.message}
        </div>
      ) : (
        <div>
          {/* Target Equation & Solution Highlight */}
          <div className="im-result-panel" style={{ marginBottom: '1.25rem' }}>
            <div className="im-result-value-row">
              <span className="im-result-label">Target Equation:</span>
              <span className="im-result-val highlight">
                {a}x + {c} = {b}y
              </span>
            </div>
            <div className="im-result-value-row">
              <span className="im-result-label">Minimal Positive Integer Solution:</span>
              <span className="im-result-val" style={{ color: '#16a34a', fontSize: '1.25rem' }}>
                x = {result.x} &nbsp;&bull;&nbsp; y = {result.y}
              </span>
            </div>
            <div className="im-result-value-row">
              <span className="im-result-label">Mathematical Verification:</span>
              <span className="im-result-val">
                {a}({result.x}) + {c} = {a * result.x + c} &nbsp;&equiv;&nbsp; {b}({result.y}) = {b * result.y}
                {result.verified ? ' [VERIFIED]' : ''}
              </span>
            </div>
            {result.gcdVal > 1 && (
              <div className="im-result-value-row">
                <span className="im-result-label">Common Factor Reduced:</span>
                <span className="im-result-val">
                  gcd({a}, {b}) = {result.gcdVal} &rarr; Reduced Equation: {result.reducedA}x + {result.reducedC} = {result.reducedB}y
                </span>
              </div>
            )}
          </div>

          {/* Mutual Division Table (Mitho-bhājana) */}
          <h6 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0c4a38', margin: '0 0 0.5rem' }}>
            Step 1: Mutual Division (Mitho-bhājana &bull; Euclidean Pulverizing Steps)
          </h6>
          <div className="im-table-responsive">
            <table className="im-calc-table">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Dividend (Bhājya)</th>
                  <th>Divisor (Bhāgahāra)</th>
                  <th>Quotient (Labdhi &bull; q)</th>
                  <th>Remainder (Śeṣa &bull; r)</th>
                </tr>
              </thead>
              <tbody>
                {result.steps.map((st) => (
                  <tr key={st.step} className={st.remainder === 0 ? 'highlight-row' : ''}>
                    <td>Step {st.step}</td>
                    <td>{st.dividend}</td>
                    <td>{st.divisor}</td>
                    <td style={{ fontWeight: 700, color: '#d97706' }}>{st.quotient}</td>
                    <td>{st.remainder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vallī (Creeper) Quotients & Upāntyapada */}
          <h6 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0c4a38', margin: '1rem 0 0.5rem' }}>
            Step 2: The Vallī (Creeper Column) &amp; Upāntyapada Upward Reduction
          </h6>
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '1rem',
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Vallī Quotients (Top to Bottom)
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem' }}>
                {result.quotients.map((q, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#ecfdf5',
                      border: '1px solid #86efac',
                      color: '#065f46',
                      fontWeight: 700,
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                    }}
                  >
                    q{idx + 1} = {q}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
              Starting from the bottom of the column, each quotient is multiplied by the penultimate term and added to the term beneath it (<em>Upāntyapada</em>), rapidly collapsing the continued fraction to yield the base multipliers.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
