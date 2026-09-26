import React, { useState } from 'react';

interface PingalaToolsProps {
  onPlayAudio?: (term: string) => void;
}

// ============================================================================
// 1. PRASTĀRA TRUTH TABLE GENERATOR
// ============================================================================
export const PingalaPrastaraTruthTable: React.FC<PingalaToolsProps> = ({ onPlayAudio }) => {
  const [numSyllables, setNumSyllables] = useState<number>(3);
  const [convention, setConvention] = useState<'pingala' | 'standard'>('pingala');
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [filterMatras, setFilterMatras] = useState<number | 'all'>('all');

  const total = Math.pow(2, numSyllables);

  // Vedic Gaṇa names for n=3 (Trika) from the mnemonic: यामाताराजभानसलगाम्
  // 1 = Guru (G), 0 = Laghu (L)
  const ganaMap: Record<string, { name: string; dev: string; meaning: string; element: string }> = {
    '111': { name: 'Ma-gaṇa (मगण)', dev: 'मगणः', meaning: 'सर्वगुरुः (All heavy syllables)', element: 'Earth (भूमि)' },
    '011': { name: 'Ya-gaṇa (यगण)', dev: 'यगणः', meaning: 'आदिलघुः (Initial light syllable)', element: 'Water (जलम्)' },
    '101': { name: 'Ra-gaṇa (रगण)', dev: 'रगणः', meaning: 'मध्यलघुः (Middle light syllable)', element: 'Fire (अग्निः)' },
    '001': { name: 'Sa-gaṇa (सगण)', dev: 'सगणः', meaning: 'अन्तगुरुः (Final heavy syllable)', element: 'Air (वायुः)' },
    '110': { name: 'Ta-gaṇa (तगण)', dev: 'तगणः', meaning: 'अन्तलघुः (Final light syllable)', element: 'Ether (आकाशः)' },
    '010': { name: 'Ja-gaṇa (जगण)', dev: 'जगणः', meaning: 'मध्यगुरुः (Middle heavy syllable)', element: 'Sun (सूर्यः)' },
    '100': { name: 'Bha-gaṇa (भगण)', dev: 'भगणः', meaning: 'आदिगुरुः (Initial heavy syllable)', element: 'Moon (चन्द्रः)' },
    '000': { name: 'Na-gaṇa (नगण)', dev: 'नगणः', meaning: 'सर्वलघुः (All light syllables)', element: 'Life / Prāṇa (प्राणः)' },
  };

  // Generate combinations
  // In classical Piṅgala Prastāra:
  // Row 1 is all Gurus (1, 1, 1...). At row k, syllable at position p alternates every 2^(p-1).
  // Specifically: Row 1 = 111, Row 2 = 011, Row 3 = 101, Row 4 = 001, Row 5 = 110, Row 6 = 010, Row 7 = 100, Row 8 = 000.
  // In standard binary count: Row 1 = 000, Row 2 = 001, ..., Row 8 = 111.
  const rows = [];
  for (let i = 0; i < total; i++) {
    const bits: number[] = [];
    if (convention === 'pingala') {
      // In Piṅgala's Prastāra, position p (1-indexed from left):
      // Bit is 0 (Laghu) if (i >> (p-1)) & 1 == 1, else 1 (Guru)
      for (let p = 0; p < numSyllables; p++) {
        const isLaghu = ((i >> p) & 1) === 1;
        bits.push(isLaghu ? 0 : 1);
      }
    } else {
      // Modern standard binary: high bit to low bit
      for (let p = 0; p < numSyllables; p++) {
        const bit = (i >> (numSyllables - 1 - p)) & 1;
        bits.push(bit);
      }
    }

    const bitString = bits.join('');
    const matras = bits.reduce((acc, b) => acc + (b === 1 ? 2 : 1), 0);
    const gurus = bits.filter((b) => b === 1).length;
    const laghus = bits.filter((b) => b === 0).length;
    const gana = numSyllables === 3 ? ganaMap[bitString] : null;

    rows.push({
      rowIndex: i + 1,
      bits,
      bitString,
      matras,
      gurus,
      laghus,
      gana,
    });
  }

  const filteredRows = filterMatras === 'all' ? rows : rows.filter((r) => r.matras === filterMatras);
  const possibleMatras = Array.from(new Set(rows.map((r) => r.matras))).sort((a, b) => a - b);

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.5rem',
        margin: '2rem 0',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0284c7' }}>
            Interactive Truth Table Tool
          </span>
          <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
            प्रस्तारः (Prastāra) · Algorithmic Binary Permutations
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setNumSyllables(n);
                setSelectedRow(null);
                setFilterMatras('all');
              }}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                border: numSyllables === n ? '2px solid #0284c7' : '1px solid #cbd5e1',
                background: numSyllables === n ? '#e0f2fe' : '#f8fafc',
                color: numSyllables === n ? '#0369a1' : '#475569',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              n = {n} {n === 1 ? 'Syllable' : 'Syllables'} (2<sup>{n}</sup> = {Math.pow(2, n)})
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1rem' }}>
        Piṅgala’s algorithm systematically generates all <strong>2<sup>{numSyllables}</sup> = {total}</strong> metric variations.
        Each syllable is a discrete binary state: <strong>Guru (1, heavy, 2 beats —)</strong> or <strong>Laghu (0, light, 1 beat ∪)</strong>.
      </p>

      {/* Controls & Filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <span style={{ fontWeight: 700, color: '#334155' }}>Ordering:</span>
          <button
            type="button"
            onClick={() => setConvention('pingala')}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '6px',
              border: convention === 'pingala' ? '1.5px solid #0284c7' : '1px solid #cbd5e1',
              background: convention === 'pingala' ? '#0284c7' : '#ffffff',
              color: convention === 'pingala' ? '#ffffff' : '#475569',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Piṅgala Canonical (All Guru First)
          </button>
          <button
            type="button"
            onClick={() => setConvention('standard')}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '6px',
              border: convention === 'standard' ? '1.5px solid #0284c7' : '1px solid #cbd5e1',
              background: convention === 'standard' ? '#0284c7' : '#ffffff',
              color: convention === 'standard' ? '#ffffff' : '#475569',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Standard Modern Binary (000 → 111)
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ fontWeight: 700, color: '#334155' }}>Filter by Mātrā (Beats):</span>
          <button
            type="button"
            onClick={() => setFilterMatras('all')}
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '6px',
              border: filterMatras === 'all' ? '1.5px solid #64748b' : '1px solid #e2e8f0',
              background: filterMatras === 'all' ? '#e2e8f0' : '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            All ({rows.length})
          </button>
          {possibleMatras.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setFilterMatras(m)}
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '6px',
                border: filterMatras === m ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                background: filterMatras === m ? '#e0f2fe' : '#ffffff',
                color: filterMatras === m ? '#0369a1' : '#475569',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {m} Beats
            </button>
          ))}
        </div>
      </div>

      {/* Truth Table */}
      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#0f172a', color: '#f8fafc', fontWeight: 700 }}>
              <th style={{ padding: '0.7rem 0.9rem' }}>Row #</th>
              <th style={{ padding: '0.7rem 0.9rem' }}>Sanskrit Syllables</th>
              <th style={{ padding: '0.7rem 0.9rem' }}>Metric Marks</th>
              <th style={{ padding: '0.7rem 0.9rem' }}>Binary Vector</th>
              <th style={{ padding: '0.7rem 0.9rem' }}>Beats (Mātrās)</th>
              {numSyllables === 3 && <th style={{ padding: '0.7rem 0.9rem' }}>Vedic Gaṇa (Trika)</th>}
              <th style={{ padding: '0.7rem 0.9rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => {
              const isSelected = selectedRow === row.rowIndex;
              return (
                <tr
                  key={row.rowIndex}
                  onClick={() => setSelectedRow(isSelected ? null : row.rowIndex)}
                  style={{
                    background: isSelected ? '#eff6ff' : row.rowIndex % 2 === 0 ? '#f8fafc' : '#ffffff',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <td style={{ padding: '0.65rem 0.9rem', fontWeight: 700, color: '#0284c7' }}>
                    #{row.rowIndex}
                  </td>
                  <td style={{ padding: '0.65rem 0.9rem' }}>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      {row.bits.map((bit, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '0.15rem 0.45rem',
                            borderRadius: '4px',
                            background: bit === 1 ? '#fef3c7' : '#e0f2fe',
                            color: bit === 1 ? '#92400e' : '#0369a1',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                          }}
                        >
                          {bit === 1 ? 'ग (Guru)' : 'ल (Laghu)'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '0.65rem 0.9rem', fontFamily: 'monospace', fontSize: '1.05rem', letterSpacing: '0.2em' }}>
                    {row.bits.map((b) => (b === 1 ? '—' : '∪')).join(' ')}
                  </td>
                  <td style={{ padding: '0.65rem 0.9rem', fontFamily: 'monospace', fontWeight: 700, color: '#334155' }}>
                    [{row.bits.join(', ')}]
                  </td>
                  <td style={{ padding: '0.65rem 0.9rem' }}>
                    <span style={{ fontWeight: 700, color: '#059669' }}>{row.matras} beats</span>{' '}
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      ({row.gurus}G × 2 + {row.laghus}L × 1)
                    </span>
                  </td>
                  {numSyllables === 3 && (
                    <td style={{ padding: '0.65rem 0.9rem' }}>
                      {row.gana && (
                        <div>
                          <strong style={{ color: '#6366f1' }}>{row.gana.dev}</strong>{' '}
                          <span style={{ fontSize: '0.8rem', color: '#475569' }}>· {row.gana.element}</span>
                        </div>
                      )}
                    </td>
                  )}
                  <td style={{ padding: '0.65rem 0.9rem' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayAudio?.(row.bits.map((b) => (b === 1 ? 'गुरु' : 'लघु')).join(' '));
                      }}
                      style={{
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.76rem',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        cursor: 'pointer',
                      }}
                      title="Listen to syllable chant"
                    >
                      🔊 Chant
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Row detail banner */}
      {selectedRow !== null && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '10px', background: '#f0fdf4', border: '1.5px solid #86efac' }}>
          <div style={{ fontWeight: 800, color: '#166534', marginBottom: '0.25rem' }}>
            Row #{selectedRow} Analysis:
          </div>
          {(() => {
            const r = rows.find((x) => x.rowIndex === selectedRow);
            if (!r) return null;
            return (
              <div style={{ fontSize: '0.88rem', color: '#14532d', lineHeight: 1.5 }}>
                Syllable pattern: <strong>{r.bits.map((b) => (b === 1 ? 'Guru (1)' : 'Laghu (0)')).join(' – ')}</strong>{' '}
                with <strong>{r.matras} total mātrās</strong>.
                {r.gana && (
                  <div style={{ marginTop: '0.25rem' }}>
                    Vedic Trika: <strong>{r.gana.name}</strong> ({r.gana.meaning}). In classical Sanskrit poetry, this triplet is assigned the cosmic element <strong>{r.gana.element}</strong>.
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 2. NAṢṬAM & UDDIṢṬAM BI-DIRECTIONAL DIGITAL CODEC
// ============================================================================
export const PingalaNastamUddistamCodec: React.FC<PingalaToolsProps> = ({ onPlayAudio }) => {
  const [activeTab, setActiveTab] = useState<'nastam' | 'uddistam'>('nastam');
  const [numSyllables, setNumSyllables] = useState<number>(4);

  // Naṣṭam state (Decimal to Binary)
  const [nastamRow, setNastamRow] = useState<number>(5);

  // Uddiṣṭam state (Binary to Decimal)
  // Array of 0 or 1, default [1, 0, 1, 0]
  const [uddistamBits, setUddistamBits] = useState<number[]>([1, 0, 1, 0]);

  // Adjust uddistamBits when numSyllables changes
  const handleSyllableChange = (n: number) => {
    setNumSyllables(n);
    if (nastamRow > Math.pow(2, n)) {
      setNastamRow(1);
    }
    setUddistamBits((prev) => {
      const next = [...prev];
      while (next.length < n) next.push(1);
      return next.slice(0, n);
    });
  };

  const maxRows = Math.pow(2, numSyllables);

  // Execute Naṣṭam Algorithm (Piṅgala Sūtras 8.24–25: लौऽर्धे । समे गिति च ॥)
  // "If odd: add 1, divide by 2, write Guru (1). If even: divide by 2, write Laghu (0)."
  const runNastam = (n: number, k: number) => {
    const steps: { pos: number; currentNum: number; isOdd: boolean; nextNum: number; syllable: 'Guru' | 'Laghu'; bit: number }[] = [];
    let curr = k;
    for (let pos = 1; pos <= n; pos++) {
      const isOdd = curr % 2 !== 0;
      if (isOdd) {
        const next = (curr + 1) / 2;
        steps.push({ pos, currentNum: curr, isOdd: true, nextNum: next, syllable: 'Guru', bit: 1 });
        curr = next;
      } else {
        const next = curr / 2;
        steps.push({ pos, currentNum: curr, isOdd: false, nextNum: next, syllable: 'Laghu', bit: 0 });
        curr = next;
      }
    }
    return steps;
  };

  const nastamSteps = runNastam(numSyllables, nastamRow);
  const recoveredBits = nastamSteps.map((s) => s.bit);

  // Execute Uddiṣṭam Algorithm (Piṅgala Sūtras 8.26–27)
  // Row = 1 + sum over pos 1..n of (if Laghu then 2^(pos-1) else 0)
  const runUddistam = (bits: number[]) => {
    let sum = 1;
    const steps: { pos: number; bit: number; isLaghu: boolean; powerVal: number; added: number; runningSum: number }[] = [];
    for (let pos = 1; pos <= bits.length; pos++) {
      const bit = bits[pos - 1];
      const isLaghu = bit === 0;
      const powerVal = Math.pow(2, pos - 1);
      const added = isLaghu ? powerVal : 0;
      sum += added;
      steps.push({ pos, bit, isLaghu, powerVal, added, runningSum: sum });
    }
    return { targetRow: sum, steps };
  };

  const uddistamResult = runUddistam(uddistamBits);

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.5rem',
        margin: '2rem 0',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#059669' }}>
            Interactive Lossless Codec Sandbox
          </span>
          <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
            नष्टम् (Naṣṭam) &amp; उद्दिष्टम् (Uddiṣṭam) · The Bi-Directional Codec
          </h3>
        </div>

        {/* Syllable length selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Length n:</span>
          {[2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handleSyllableChange(n)}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                border: numSyllables === n ? '2px solid #059669' : '1px solid #cbd5e1',
                background: numSyllables === n ? '#d1fae5' : '#f8fafc',
                color: numSyllables === n ? '#065f46' : '#475569',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              n = {n} ({Math.pow(2, n)} rows)
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
        <button
          type="button"
          onClick={() => setActiveTab('nastam')}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'nastam' ? '#059669' : '#f1f5f9',
            color: activeTab === 'nastam' ? '#ffffff' : '#475569',
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>📉 नष्टम् (Naṣṭam)</span>
          <span style={{ fontSize: '0.76rem', opacity: 0.9 }}>Decimal ➔ Binary Decoding</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('uddistam')}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'uddistam' ? '#6366f1' : '#f1f5f9',
            color: activeTab === 'uddistam' ? '#ffffff' : '#475569',
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>📈 उद्दिष्टम् (Uddiṣṭam)</span>
          <span style={{ fontSize: '0.76rem', opacity: 0.9 }}>Binary ➔ Decimal Encoding</span>
        </button>
      </div>

      {/* TAB 1: NAṢṬAM */}
      {activeTab === 'nastam' && (
        <div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: '#14532d', lineHeight: 1.5 }}>
              <strong>The Problem:</strong> A poet knows a meter occupies <strong>Row #{nastamRow}</strong> of an {numSyllables}-syllable master table,
              but the palm-leaf manuscript was damaged. How can they recover the exact syllable sequence without recreating the whole table?
            </p>
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#166534', fontStyle: 'italic' }}>
              Piṅgala’s Sūtra: <em>"लौऽर्धे । समे गिति च ॥"</em> (Halve if even, assign Laghu; if odd, assign Guru and halve after adding 1).
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155' }}>
              Select Row Number K (1 to {maxRows}):
            </label>
            <input
              type="range"
              min={1}
              max={maxRows}
              value={nastamRow}
              onChange={(e) => setNastamRow(Number(e.target.value))}
              style={{ flex: '1 1 200px', cursor: 'pointer' }}
            />
            <input
              type="number"
              min={1}
              max={maxRows}
              value={nastamRow}
              onChange={(e) => {
                const val = Math.max(1, Math.min(maxRows, Number(e.target.value) || 1));
                setNastamRow(val);
              }}
              style={{
                width: '75px',
                padding: '0.4rem',
                borderRadius: '6px',
                border: '1.5px solid #059669',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            />
          </div>

          {/* Trace steps */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`, gap: '0.75rem', marginBottom: '1.25rem' }}>
            {nastamSteps.map((s) => (
              <div
                key={s.pos}
                style={{
                  background: s.bit === 1 ? '#fffbeb' : '#f0f9ff',
                  border: s.bit === 1 ? '1.5px solid #fde68a' : '1.5px solid #bae6fd',
                  borderRadius: '10px',
                  padding: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                    Syllable {s.pos} of {numSyllables}
                  </span>
                  <span
                    style={{
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      background: s.bit === 1 ? '#f59e0b' : '#0284c7',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                    }}
                  >
                    {s.isOdd ? 'Odd Number' : 'Even Number'}
                  </span>
                </div>
                <div style={{ fontSize: '0.86rem', color: '#1e293b', marginBottom: '0.35rem' }}>
                  Current Number: <strong>{s.currentNum}</strong>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4, marginBottom: '0.5rem' }}>
                  {s.isOdd ? (
                    <span>
                      Add 1 ➔ <strong>{s.currentNum + 1}</strong>, divide by 2 ➔ <strong>{s.nextNum}</strong>.
                    </span>
                  ) : (
                    <span>
                      Divide by 2 ➔ <strong>{s.nextNum}</strong>.
                    </span>
                  )}
                </div>
                <div
                  style={{
                    padding: '0.35rem',
                    borderRadius: '6px',
                    textAlign: 'center',
                    background: s.bit === 1 ? '#fef3c7' : '#e0f2fe',
                    color: s.bit === 1 ? '#92400e' : '#0369a1',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                  }}
                >
                  {s.syllable === 'Guru' ? 'ग (Guru / 1 / —)' : 'ल (Laghu / 0 / ∪)'}
                </div>
              </div>
            ))}
          </div>

          {/* Result Reconstructed Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a7f3d0', textTransform: 'uppercase' }}>
                Reconstructed Metric Sequence for Row #{nastamRow}:
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                {recoveredBits.map((b) => (b === 1 ? 'गुरु (G)' : 'लघु (L)')).join('  —  ')}
              </div>
              <div style={{ fontSize: '0.88rem', color: '#d1fae5', marginTop: '0.2rem' }}>
                Binary Bits: [{recoveredBits.join(', ')}] · Prosodic marks:{' '}
                {recoveredBits.map((b) => (b === 1 ? '—' : '∪')).join(' ')}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onPlayAudio?.(recoveredBits.map((b) => (b === 1 ? 'गुरु' : 'लघु')).join(' '))}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: '#34d399',
                color: '#064e3b',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              🔊 Chant Sequence
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: UDDIṢṬAM */}
      {activeTab === 'uddistam' && (
        <div>
          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: '#312e81', lineHeight: 1.5 }}>
              <strong>The Problem:</strong> A poet composed a verse with a specific sequence of short and long syllables.
              Which exact row number does this verse occupy in the master Prastāra table?
            </p>
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#4338ca', fontStyle: 'italic' }}>
              Piṅgala’s Formula: Write powers of 2 (1, 2, 4, 8, 16...) under the syllables. Add powers corresponding to <strong>Laghu (0)</strong>, then add 1 to the total!
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
              Click each syllable to toggle between Laghu (ल / 0) and Guru (ग / 1):
            </span>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              {uddistamBits.map((bit, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const next = [...uddistamBits];
                    next[idx] = next[idx] === 1 ? 0 : 1;
                    setUddistamBits(next);
                  }}
                  style={{
                    padding: '0.75rem 1.1rem',
                    borderRadius: '10px',
                    border: bit === 1 ? '2px solid #f59e0b' : '2px solid #0284c7',
                    background: bit === 1 ? '#fef3c7' : '#e0f2fe',
                    color: bit === 1 ? '#92400e' : '#0369a1',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 800, color: '#64748b' }}>
                    Syllable {idx + 1}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.2rem 0' }}>
                    {bit === 1 ? 'ग (Guru)' : 'ल (Laghu)'}
                  </div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>
                    Weight 2<sup>{idx}</sup> = {Math.pow(2, idx)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mathematical summation breakdown */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
              Algorithmic Uddiṣṭam Evaluation:
            </div>
            <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
              Formula: <strong>Row = 1 + ∑ (Laghu Syllable Weights)</strong>
              <div style={{ fontFamily: 'monospace', fontSize: '1rem', background: '#ffffff', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', margin: '0.5rem 0' }}>
                Row = 1 + [
                {uddistamResult.steps.map((s, i) => (
                  <span key={s.pos} style={{ color: s.isLaghu ? '#0284c7' : '#94a3b8', fontWeight: s.isLaghu ? 800 : 400 }}>
                    {s.isLaghu ? `${s.powerVal}` : `0`}
                    {i < uddistamResult.steps.length - 1 ? ' + ' : ''}
                  </span>
                ))}
                ] = <strong style={{ color: '#6366f1' }}>{uddistamResult.targetRow}</strong>
              </div>
            </div>
          </div>

          {/* Result Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #312e81 0%, #4338ca 100%)',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c7d2fe', textTransform: 'uppercase' }}>
                Master Table Location:
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.2rem' }}>
                This Meter Occupies Row #{uddistamResult.targetRow} of {maxRows}
              </div>
              <div style={{ fontSize: '0.84rem', color: '#e0e7ff', marginTop: '0.2rem' }}>
                Perfect Lossless Symmetry: Feeding Row #{uddistamResult.targetRow} into Naṣṭam outputs this exact sequence!
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveTab('nastam');
                setNastamRow(uddistamResult.targetRow);
              }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: '#818cf8',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Verify in Naṣṭam ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. MERU PRASTĀRA (THE COMBINATORIAL PYRAMID / PASCAL'S TRIANGLE)
// ============================================================================
export const PingalaMeruPyramid: React.FC<PingalaToolsProps> = () => {
  const [selectedCell, setSelectedCell] = useState<{ n: number; k: number } | null>({ n: 4, k: 2 });

  // Binomial coefficient C(n, k)
  const binomial = (n: number, k: number): number => {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let res = 1;
    for (let i = 1; i <= k; i++) {
      res = (res * (n - i + 1)) / i;
    }
    return Math.round(res);
  };

  const rows = [0, 1, 2, 3, 4, 5];

  // Helper to list all binary strings of length n with k ones (or k zeros)
  const getMatchingPermutations = (n: number, kLaghus: number) => {
    const list: string[] = [];
    const total = Math.pow(2, n);
    for (let i = 0; i < total; i++) {
      let laghuCount = 0;
      let pattern = '';
      for (let p = 0; p < n; p++) {
        const isLaghu = ((i >> p) & 1) === 1;
        if (isLaghu) laghuCount++;
        pattern += isLaghu ? 'ल' : 'ग';
      }
      if (laghuCount === kLaghus) {
        list.push(pattern);
      }
    }
    return list;
  };

  const cellData = selectedCell ? {
    n: selectedCell.n,
    k: selectedCell.k,
    val: binomial(selectedCell.n, selectedCell.k),
    leftParent: selectedCell.n > 0 && selectedCell.k > 0 ? { n: selectedCell.n - 1, k: selectedCell.k - 1, val: binomial(selectedCell.n - 1, selectedCell.k - 1) } : null,
    rightParent: selectedCell.n > 0 && selectedCell.k < selectedCell.n ? { n: selectedCell.n - 1, k: selectedCell.k, val: binomial(selectedCell.n - 1, selectedCell.k) } : null,
    permutations: getMatchingPermutations(selectedCell.n, selectedCell.k),
    rowSum: Math.pow(2, selectedCell.n),
  } : null;

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.5rem',
        margin: '2rem 0',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
      }}
    >
      <div style={{ marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#b45309' }}>
          Interactive Combinatorial Pyramid
        </span>
        <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
          मेरु-प्रस्तारः (Meru Prastāra) · The Staircase of Mount Meru
        </h3>
        <p style={{ margin: '0.35rem 0 0', fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
          Drawn by Halāyudha in his 10th-century commentary <em>Mṛtasañjīvanī</em> on Piṅgala’s <em>Chhandas Śāstra</em>.
          Identical to Pascal’s Triangle published 1,900 years later in 1654 CE Europe.
        </p>
      </div>

      {/* Pyramid Graphic */}
      <div
        style={{
          background: 'linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)',
          borderRadius: '12px',
          border: '1px solid #e7e5e4',
          padding: '1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.65rem',
          overflowX: 'auto',
        }}
      >
        {rows.map((n) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#78716c', width: '45px', textAlign: 'right' }}>
              n = {n}
            </span>
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              {Array.from({ length: n + 1 }).map((_, k) => {
                const val = binomial(n, k);
                const isSelected = selectedCell?.n === n && selectedCell?.k === k;
                const isParent =
                  selectedCell &&
                  selectedCell.n === n + 1 &&
                  (selectedCell.k === k || selectedCell.k === k + 1);

                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setSelectedCell({ n, k })}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      border: isSelected
                        ? '2.5px solid #d97706'
                        : isParent
                        ? '2px dashed #0284c7'
                        : '1px solid #d6d3d1',
                      background: isSelected
                        ? '#fef3c7'
                        : isParent
                        ? '#e0f2fe'
                        : '#ffffff',
                      color: isSelected ? '#92400e' : isParent ? '#0369a1' : '#1c1917',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isSelected ? '0 4px 12px rgba(217, 119, 6, 0.25)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                    title={`Row n=${n}, column k=${k}: value ${val}`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <span style={{ fontSize: '0.76rem', color: '#a8a29e', width: '55px' }}>
              ∑ = {Math.pow(2, n)}
            </span>
          </div>
        ))}
      </div>

      {/* Selected Cell Insight */}
      {cellData && (
        <div style={{ marginTop: '1.25rem', padding: '1.2rem', borderRadius: '12px', background: '#fffbeb', border: '1.5px solid #fde68a' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#92400e' }}>
              Meru Node: Row n = {cellData.n} (Verse Syllables), Column k = {cellData.k} (Laghus) ➔ Coefficient: {cellData.val}
            </div>
            <span style={{ fontSize: '0.8rem', background: '#f59e0b', color: '#ffffff', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              Binomial C({cellData.n}, {cellData.k}) = {cellData.val}
            </span>
          </div>

          <div style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: 1.6 }}>
            <p style={{ margin: '0 0 0.5rem' }}>
              <strong>Sanskrit Prosody Interpretation:</strong> In a verse of <strong>{cellData.n} syllables</strong>, there are exactly{' '}
              <strong>{cellData.val} distinct metric combinations</strong> containing <strong>{cellData.k} Laghu (short)</strong> syllables
              and <strong>{cellData.n - cellData.k} Guru (long)</strong> syllables.
            </p>

            {cellData.leftParent && cellData.rightParent && (
              <div style={{ background: '#ffffff', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #fef08a', margin: '0.5rem 0' }}>
                <strong>Halāyudha’s Rule: <em>"परे पूर्णम् । परेऽर्द्धे ॥"</em></strong>
                <div style={{ fontSize: '0.85rem', color: '#92400e', marginTop: '0.2rem' }}>
                  Interior Cell = Upper Left Parent ({cellData.leftParent.val}) + Upper Right Parent ({cellData.rightParent.val}) = <strong>{cellData.val}</strong>.
                </div>
              </div>
            )}

            <div style={{ marginTop: '0.65rem' }}>
              <strong>All {cellData.val} Permutations ({cellData.k} Laghus, {cellData.n - cellData.k} Gurus):</strong>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                {cellData.permutations.map((p, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      background: '#ffffff',
                      border: '1px solid #fde68a',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      color: '#92400e',
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
