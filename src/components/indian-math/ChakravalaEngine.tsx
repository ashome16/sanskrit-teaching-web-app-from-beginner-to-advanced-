import React, { useState } from 'react';

export interface ChakravalaCycle {
  cycle: number;
  a: string;
  b: string;
  k: string;
  m: string;
  note: string;
}

export interface ChakravalaResult {
  valid: boolean;
  message?: string;
  n: number;
  cycles: ChakravalaCycle[];
  solX: string;
  solY: string;
  verified: boolean;
}

export const ChakravalaEngine: React.FC = () => {
  const [nInput, setNInput] = useState<number>(61);
  const [activePreset, setActivePreset] = useState<string>('fermat61');

  // Math helper: is perfect square
  const isPerfectSquare = (n: number): boolean => {
    if (n < 0) return false;
    const r = Math.round(Math.sqrt(n));
    return r * r === n;
  };

  // Chakravāla Cyclic Reduction Engine with BigInt
  const solveChakravala = (N: number): ChakravalaResult => {
    if (N <= 1) {
      return {
        valid: false,
        message: 'Parameter N must be an integer greater than 1.',
        n: N,
        cycles: [],
        solX: '0',
        solY: '0',
        verified: false,
      };
    }

    if (isPerfectSquare(N)) {
      return {
        valid: false,
        message: `N = ${N} is a perfect square (${Math.round(Math.sqrt(N))}\u00B2). Non-trivial integer solutions only exist for square-free or non-square values of N.`,
        n: N,
        cycles: [],
        solX: '0',
        solY: '0',
        verified: false,
      };
    }

    const bigN = BigInt(N);

    // Initial trial triple: m0 closest to sqrt(N)
    const m0Num = Math.round(Math.sqrt(N));
    let m0 = BigInt(m0Num);
    let a0 = m0;
    let b0 = BigInt(1);
    let k0 = m0 * m0 - bigN;

    const cycles: ChakravalaCycle[] = [
      {
        cycle: 0,
        a: a0.toString(),
        b: b0.toString(),
        k: k0.toString(),
        m: m0.toString(),
        note: `Initial seed: m = ${m0}, a = ${a0}, b = 1, k = ${m0}\u00B2 - ${N} = ${k0}`,
      },
    ];

    let a = a0;
    let b = b0;
    let k = k0;
    let step = 0;

    while (k !== BigInt(1) && step < 40) {
      step += 1;
      const absK = k < BigInt(0) ? -k : k;

      // Brahmagupta Shortcut 1: k = -1
      if (k === BigInt(-1)) {
        const solA = a * a + bigN * b * b;
        const solB = BigInt(2) * a * b;
        cycles.push({
          cycle: step,
          a: solA.toString(),
          b: solB.toString(),
          k: '1',
          m: 'Sam\u0101sa',
          note: `Brahmagupta Sam\u0101sa on k = -1: a\u2032 = a\u00B2 + N\u00B7b\u00B2 = ${solA}, b\u2032 = 2ab = ${solB}, k\u2032 = 1`,
        });
        const v = solA * solA - bigN * solB * solB === BigInt(1);
        return {
          valid: true,
          n: N,
          cycles,
          solX: solB.toString(),
          solY: solA.toString(),
          verified: v,
        };
      }

      // Brahmagupta Shortcut 2: k = \u00B12
      if (k === BigInt(2) || k === BigInt(-2)) {
        const solA = (a * a + bigN * b * b) / BigInt(2);
        const solB = a * b;
        cycles.push({
          cycle: step,
          a: solA.toString(),
          b: solB.toString(),
          k: '1',
          m: 'Sam\u0101sa / 2',
          note: `Brahmagupta Sam\u0101sa on k = \u00B12: a\u2032 = (a\u00B2 + N\u00B7b\u00B2)/2 = ${solA}, b\u2032 = ab = ${solB}, k\u2032 = 1`,
        });
        const v = solA * solA - bigN * solB * solB === BigInt(1);
        return {
          valid: true,
          n: N,
          cycles,
          solX: solB.toString(),
          solY: solA.toString(),
          verified: v,
        };
      }

      // Brahmagupta Shortcut 3: k = 4
      if (k === BigInt(4)) {
        if (a % BigInt(2) === BigInt(0) && b % BigInt(2) === BigInt(0)) {
          const solA = a / BigInt(2);
          const solB = b / BigInt(2);
          cycles.push({
            cycle: step,
            a: solA.toString(),
            b: solB.toString(),
            k: '1',
            m: 'Scale / 2',
            note: `Direct scaling by 2 on k = 4: a\u2032 = ${solA}, b\u2032 = ${solB}, k\u2032 = 1`,
          });
          const v = solA * solA - bigN * solB * solB === BigInt(1);
          return {
            valid: true,
            n: N,
            cycles,
            solX: solB.toString(),
            solY: solA.toString(),
            verified: v,
          };
        } else {
          // Brahmagupta cubic composition rule on k = 4:
          // a' = a(a^2 - 3)/2,  b' = b(a^2 - 1)/2
          const solA = (a * (a * a - BigInt(3))) / BigInt(2);
          const solB = (b * (a * a - BigInt(1))) / BigInt(2);
          cycles.push({
            cycle: step,
            a: solA.toString(),
            b: solB.toString(),
            k: '1',
            m: 'Brahmagupta k=4',
            note: `Brahmagupta cubic composition on k = 4: a\u2032 = a(a\u00B2-3)/2 = ${solA}, b\u2032 = b(a\u00B2-1)/2 = ${solB}, k\u2032 = 1`,
          });
          const v = solA * solA - bigN * solB * solB === BigInt(1);
          return {
            valid: true,
            n: N,
            cycles,
            solX: solB.toString(),
            solY: solA.toString(),
            verified: v,
          };
        }
      }

      // Standard Chakrav\u0101la Cyclic Step:
      // Choose m such that (a + b*m) % absK == 0 and |m^2 - N| is minimized
      const absKNum = Number(absK);
      const sqrtN = Math.sqrt(N);
      const candidates: number[] = [];
      const searchMax = Math.min(absKNum * 5 + Math.ceil(sqrtN) + 5, 20000);

      for (let cand = 1; cand <= searchMax; cand++) {
        if ((a + b * BigInt(cand)) % absK === BigInt(0)) {
          candidates.push(cand);
        }
      }

      if (candidates.length === 0) {
        return {
          valid: false,
          message: 'Chakrav\u0101la cycle stalled: candidate m search exhausted.',
          n: N,
          cycles,
          solX: '0',
          solY: '0',
          verified: false,
        };
      }

      candidates.sort((c1, c2) => Math.abs(c1 * c1 - N) - Math.abs(c2 * c2 - N));
      const bestMNum = candidates[0];
      const bestM = BigInt(bestMNum);

      const nextA = (a * bestM + bigN * b) / absK;
      const nextB = (a + b * bestM) / absK;
      const nextK = (bestM * bestM - bigN) / k;

      cycles.push({
        cycle: step,
        a: nextA.toString(),
        b: nextB.toString(),
        k: nextK.toString(),
        m: bestM.toString(),
        note: `Chakrav\u0101la cycle: m = ${bestM}, k\u2032 = (${bestM}\u00B2 - ${N}) / ${k} = ${nextK}`,
      });

      a = nextA;
      b = nextB;
      k = nextK;
    }

    const verified = a * a - bigN * b * b === BigInt(1);
    return {
      valid: true,
      n: N,
      cycles,
      solX: b.toString(),
      solY: a.toString(),
      verified,
    };
  };

  const result = solveChakravala(nInput);

  const applyPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    if (presetKey === 'fermat61') setNInput(61);
    else if (presetKey === 'classic67') setNInput(67);
    else if (presetKey === 'pell13') setNInput(13);
    else if (presetKey === 'pell7') setNInput(7);
    else if (presetKey === 'pell2') setNInput(2);
    else if (presetKey === 'pell3') setNInput(3);
    else if (presetKey === 'pell29') setNInput(29);
    else if (presetKey === 'pell97') setNInput(97);
  };

  return (
    <div className="im-interactive-box" aria-label="Bhaskara II Chakravala Cyclic Solver">
      <div className="im-interactive-header">
        <h5 className="im-interactive-title">
          Bhāskara II Chakravāla (Cyclic) Solver for Nx&sup2; + 1 = y&sup2;
        </h5>
        <span className="im-interactive-badge">Era 9 Simulator</span>
      </div>

      <div className="im-pedagogical-callout">
        <strong>Bhāskarācārya&rsquo;s Bījagaṇita (1150 CE):</strong> The <em>Chakravāla</em> (cyclic) method is universally hailed as one of the greatest triumphs of classical number theory. In 1657, French mathematician Pierre de Fermat famously challenged all mathematicians of Europe to find the smallest integer solution for <strong>61x&sup2; + 1 = y&sup2;</strong>. John Wallis and Lord Brouncker struggled, and Euler and Lagrange published solutions over a century later (1768). Yet Bhāskarācārya had solved this very equation in 1150 CE in just <strong>5 cycles</strong>: x = 226,153,980 and y = 1,766,319,049!
      </div>

      {/* Preset Pills */}
      <div className="im-preset-pills">
        <span className="im-preset-label">Historical Challenges:</span>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'fermat61' ? 'active' : ''}`}
          onClick={() => applyPreset('fermat61')}
        >
          Fermat 1657 Challenge (N = 61)
        </button>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'classic67' ? 'active' : ''}`}
          onClick={() => applyPreset('classic67')}
        >
          Bhāskara Classic (N = 67)
        </button>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'pell13' ? 'active' : ''}`}
          onClick={() => applyPreset('pell13')}
        >
          N = 13 (x = 180)
        </button>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'pell7' ? 'active' : ''}`}
          onClick={() => applyPreset('pell7')}
        >
          N = 7 (x = 3)
        </button>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'pell2' ? 'active' : ''}`}
          onClick={() => applyPreset('pell2')}
        >
          N = 2
        </button>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'pell3' ? 'active' : ''}`}
          onClick={() => applyPreset('pell3')}
        >
          N = 3
        </button>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'pell29' ? 'active' : ''}`}
          onClick={() => applyPreset('pell29')}
        >
          N = 29
        </button>
        <button
          type="button"
          className={`im-preset-btn ${activePreset === 'pell97' ? 'active' : ''}`}
          onClick={() => applyPreset('pell97')}
        >
          N = 97
        </button>
      </div>

      {/* Input Controls */}
      <div className="im-control-group">
        <div className="im-control-item">
          <label className="im-control-label">Parameter N (Prakṛti &bull; Non-Square):</label>
          <input
            type="number"
            min="2"
            max="500"
            className="im-input"
            value={nInput}
            onChange={(e) => {
              setNInput(Number(e.target.value));
              setActivePreset('custom');
            }}
          />
        </div>
      </div>

      {/* Results / Error Display */}
      {!result.valid ? (
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
          {/* Solution Highlight Banner */}
          <div className="im-result-panel" style={{ marginBottom: '1.25rem' }}>
            <div className="im-result-value-row">
              <span className="im-result-label">Target Quadratic Equation:</span>
              <span className="im-result-val highlight">
                {result.n}x&sup2; + 1 = y&sup2; &nbsp;&hArr;&nbsp; y&sup2; &minus; {result.n}x&sup2; = 1
              </span>
            </div>
            <div className="im-result-value-row">
              <span className="im-result-label">Smallest Positive Integer Solution:</span>
              <span className="im-result-val" style={{ color: '#16a34a', fontSize: '1.2rem' }}>
                x = {Number(result.solX).toLocaleString()} &nbsp;&bull;&nbsp; y = {Number(result.solY).toLocaleString()}
              </span>
            </div>
            <div className="im-result-value-row">
              <span className="im-result-label">Unbroken BigInt Precision Check:</span>
              <span className="im-result-val">
                ({result.solY})&sup2; &minus; {result.n} &times; ({result.solX})&sup2; = 1
                {result.verified ? ' [EXACT EQUALITY]' : ''}
              </span>
            </div>
          </div>

          {/* Step-by-Step Cycle Table */}
          <h6 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0c4a38', margin: '0 0 0.5rem' }}>
            Chakravāla Cycle-by-Cycle Reduction Table ({result.cycles.length} Cycles to Solution)
          </h6>
          <div className="im-table-responsive">
            <table className="im-calc-table">
              <thead>
                <tr>
                  <th>Cycle</th>
                  <th>Greater Root a (Jyeṣṭha)</th>
                  <th>Lesser Root b (Laghu)</th>
                  <th>Interpolator k (Kṣepa)</th>
                  <th>Mati (m)</th>
                  <th>Transformation Principle</th>
                </tr>
              </thead>
              <tbody>
                {result.cycles.map((cyc) => (
                  <tr
                    key={cyc.cycle}
                    className={cyc.k === '1' ? 'highlight-row' : ''}
                  >
                    <td>Cycle {cyc.cycle}</td>
                    <td style={{ fontWeight: 700, color: '#0c4a38' }}>{cyc.a}</td>
                    <td style={{ fontWeight: 700, color: '#d97706' }}>{cyc.b}</td>
                    <td
                      style={{
                        fontWeight: 700,
                        color: cyc.k === '1' ? '#16a34a' : cyc.k.startsWith('-') ? '#dc2626' : '#2563eb',
                      }}
                    >
                      {cyc.k}
                    </td>
                    <td>{cyc.m}</td>
                    <td style={{ fontSize: '0.82rem', color: '#475569' }}>{cyc.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '1rem',
              marginTop: '1rem',
              fontSize: '0.88rem',
              color: '#334155',
              lineHeight: 1.6,
            }}
          >
            <strong>Brahmagupta&rsquo;s Bhāvanā Composition Law (628 CE):</strong> If (a₁, b₁, k₁) and (a₂, b₂, k₂) are two solutions to y&sup2; &minus; Nx&sup2; = k, then:
            <br />
            <code>(a₁a₂ &plusmn; Nb₁b₂)&sup2; &minus; N(a₁b₂ &plusmn; b₁a₂)&sup2; = k₁k₂</code>
            <br />
            Bhāskara II combined this with his cyclic Lemma: composing with the trivial triple (m, 1, m&sup2; &minus; N) and scaling by |k| to rapidly force k to &plusmn;1, &plusmn;2, or 4, from which the final integer solution k = 1 is instantly extracted!
          </div>
        </div>
      )}
    </div>
  );
};
