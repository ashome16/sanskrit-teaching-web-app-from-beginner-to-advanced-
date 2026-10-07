import React, { useState, useMemo } from 'react';

interface Question {
  q: string;
  qSa: string;
  options: { text: string; dosha: 'vata' | 'pitta' | 'kapha' }[];
}

const PRAKRITI_QUIZ: Question[] = [
  {
    q: 'Body frame and physical build',
    qSa: 'शरीर-प्रकृतिः',
    options: [
      { text: 'Slender, light, prominent joints, tends to stay thin', dosha: 'vata' },
      { text: 'Medium, athletic, moderate musculature, warm hands/feet', dosha: 'pitta' },
      { text: 'Solid, broad, sturdy bone structure, gains weight easily', dosha: 'kapha' },
    ],
  },
  {
    q: 'Mental speed and memory style',
    qSa: 'मनो-वृत्तिः',
    options: [
      { text: 'Quick to grasp, highly creative, but forgets easily', dosha: 'vata' },
      { text: 'Sharp, focused, analytical, intense perfectionist', dosha: 'pitta' },
      { text: 'Methodical, calm, patient, slow to learn but unforgettable memory', dosha: 'kapha' },
    ],
  },
  {
    q: 'Appetite and digestive fire (Agni)',
    qSa: 'जाठराग्निः',
    options: [
      { text: 'Irregular (Viṣamāgni): sometimes ravenous, sometimes skips meals', dosha: 'vata' },
      { text: 'Intense (Tīkṣṇāgni): must eat on time, gets irritable when hungry', dosha: 'pitta' },
      { text: 'Slow & steady (Mandāgni): can skip meals easily, craves light food', dosha: 'kapha' },
    ],
  },
  {
    q: 'Weather and temperature sensitivity',
    qSa: 'ऋतु-सहनशीलता',
    options: [
      { text: 'Dislikes cold, wind, and dryness; loves warmth and oil massage', dosha: 'vata' },
      { text: 'Dislikes hot sun and humidity; craves cool breeze and chilled water', dosha: 'pitta' },
      { text: 'Dislikes damp cold and fog; thrives in warm, dry weather', dosha: 'kapha' },
    ],
  },
];

const DINACHARYA_SLOTS = [
  { start: 6, end: 10, dosha: 'kapha', period: 'Morning (प्रातः)', label: 'Kapha Time (कफ-कालः)', desc: 'Heavy and slow energy. Optimal for exercise (Vyāyāma), brisk walking, oil pulling, and a light breakfast.', tip: 'Avoid sleeping in past 6 AM to prevent sluggishness.' },
  { start: 10, end: 14, dosha: 'pitta', period: 'Midday (मध्याह्न)', label: 'Pitta Time (पित्त-कालः)', desc: 'The internal digestive sun (Jāṭharāgni) is at its zenith. Optimal time for the largest, most nourishing meal of the day.', tip: 'Eat your main meal now; mental sharpness is peak.' },
  { start: 14, end: 18, dosha: 'vata', period: 'Afternoon (अपराह्न)', label: 'Vāta Time (वात-कालः)', desc: 'Light, fast, and agile energy. Ideal for creativity, study, problem solving, meetings, and active work.', tip: 'Stay hydrated; enjoy herbal tea around 4 PM.' },
  { start: 18, end: 22, dosha: 'kapha', period: 'Evening (सायङ्काल)', label: 'Kapha Time (कफ-कालः)', desc: 'Cooling, grounding energy returns. Ideal for light supper, quiet reading, family connection, and early sleep preparation.', tip: 'Finish dinner before 7:30 PM; sleep by 10 PM.' },
  { start: 22, end: 2, dosha: 'pitta', period: 'Night (रात्रि)', label: 'Pitta Time (पित्त-कालः)', desc: 'Metabolic house-cleaning and liver cellular rejuvenation. Body rebuilds tissues while the mind processes memories.', tip: 'Must be asleep before 10 PM to allow liver detox.' },
  { start: 2, end: 6, dosha: 'vata', period: 'Dawn (ब्रह्ममुहूर्त)', label: 'Vāta Time (वात-कालः)', desc: 'Atmospheric ether and stillness. The supreme hour (Brahmamuhūrta) for waking, meditation, deep contemplation, and prayer.', tip: 'Wake up before sunrise for effortless clarity and lightness.' },
];

const SHAD_RASA = [
  { dev: 'मधुर', iast: 'Madhura', en: 'Sweet', bhuta: 'Pṛthivī + Ap', effect: 'Calms Vāta & Pitta · Increases Kapha', example: 'Ghee, honey, wheat, milk' },
  { dev: 'अम्ल', iast: 'Amla', en: 'Sour', bhuta: 'Pṛthivī + Tejas', effect: 'Calms Vāta · Increases Pitta & Kapha', example: 'Citrus, yogurt, amla, tamarind' },
  { dev: 'लवण', iast: 'Lavaṇa', en: 'Salty', bhuta: 'Ap + Tejas', effect: 'Calms Vāta · Increases Pitta & Kapha', example: 'Rock salt (Saindhava), sea salt' },
  { dev: 'कटु', iast: 'Kaṭu', en: 'Pungent / Spicy', bhuta: 'Vāyu + Tejas', effect: 'Calms Kapha · Increases Vāta & Pitta', example: 'Black pepper, ginger, chili, pippali' },
  { dev: 'तिक्त', iast: 'Tikta', en: 'Bitter', bhuta: 'Vāyu + Ākāśa', effect: 'Calms Pitta & Kapha · Increases Vāta', example: 'Turmeric, neem, bitter gourd, fenugreek' },
  { dev: 'कषाय', iast: 'Kaṣāya', en: 'Astringent', bhuta: 'Pṛthivī + Vāyu', effect: 'Calms Pitta & Kapha · Increases Vāta', example: 'Haritaki, green tea, pomegranate, beans' },
];

export const AyurvedaAttractions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'clock' | 'rasa'>('quiz');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, 'vata' | 'pitta' | 'kapha'>>({});
  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [selectedRasa, setSelectedRasa] = useState<string>('Madhura');

  // Diagnostic Quiz Calculation
  const scores = useMemo(() => {
    let v = 0;
    let p = 0;
    let k = 0;
    Object.values(quizAnswers).forEach((ans) => {
      if (ans === 'vata') v++;
      if (ans === 'pitta') p++;
      if (ans === 'kapha') k++;
    });
    const total = Object.keys(quizAnswers).length || 1;
    return {
      v: Math.round((v / total) * 100),
      p: Math.round((p / total) * 100),
      k: Math.round((k / total) * 100),
      answered: Object.keys(quizAnswers).length,
    };
  }, [quizAnswers]);

  // Active Dinacharya slot
  const currentSlot = useMemo(() => {
    const h = selectedHour;
    if (h >= 6 && h < 10) return DINACHARYA_SLOTS[0];
    if (h >= 10 && h < 14) return DINACHARYA_SLOTS[1];
    if (h >= 14 && h < 18) return DINACHARYA_SLOTS[2];
    if (h >= 18 && h < 22) return DINACHARYA_SLOTS[3];
    if (h >= 22 || h < 2) return DINACHARYA_SLOTS[4];
    return DINACHARYA_SLOTS[5];
  }, [selectedHour]);

  return (
    <section className="vl-panel" style={{ marginTop: '1.5rem', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '1.4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f766e', fontWeight: 800 }}>
            🌿 Āyurveda Interactive Attractions (आयुर्वेद-विशेषाः)
          </h3>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.86rem', color: '#64748b' }}>
            Discover your constitutional Prakṛti, master the 24-hour biological clock, and balance the 6 tastes.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.35rem', background: '#e2e8f0', padding: '0.25rem', borderRadius: '10px' }}>
          <button
            type="button"
            className={`vl-btn${activeTab === 'quiz' ? '' : ' vl-btn--ghost'}`}
            style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', background: activeTab === 'quiz' ? '#0f766e' : 'transparent', color: activeTab === 'quiz' ? '#ffffff' : '#475569' }}
            onClick={() => setActiveTab('quiz')}
          >
            📋 Prakṛti Diagnostic Quiz
          </button>
          <button
            type="button"
            className={`vl-btn${activeTab === 'clock' ? '' : ' vl-btn--ghost'}`}
            style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', background: activeTab === 'clock' ? '#0f766e' : 'transparent', color: activeTab === 'clock' ? '#ffffff' : '#475569' }}
            onClick={() => setActiveTab('clock')}
          >
            ⏰ Dinacaryā 24h Clock
          </button>
          <button
            type="button"
            className={`vl-btn${activeTab === 'rasa' ? '' : ' vl-btn--ghost'}`}
            style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', background: activeTab === 'rasa' ? '#0f766e' : 'transparent', color: activeTab === 'rasa' ? '#ffffff' : '#475569' }}
            onClick={() => setActiveTab('rasa')}
          >
            🍽️ Ṣaḍ-Rasa 6 Tastes
          </button>
        </div>
      </div>

      {/* Attraction 1: Prakriti Diagnostic Quiz */}
      {activeTab === 'quiz' && (
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '1rem', color: '#0f766e', fontWeight: 800 }}>
                Answer the 4 constitutional questions:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {PRAKRITI_QUIZ.map((item, qIdx) => (
                  <div key={qIdx} style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.45rem' }}>
                      {qIdx + 1}. {item.q} <span style={{ color: '#0f766e', fontWeight: 600 }}>({item.qSa})</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {item.options.map((opt, oIdx) => {
                        const isPicked = quizAnswers[qIdx] === opt.dosha;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => setQuizAnswers((prev) => ({ ...prev, [qIdx]: opt.dosha }))}
                            style={{
                              textAlign: 'left',
                              padding: '0.45rem 0.75rem',
                              fontSize: '0.82rem',
                              borderRadius: '6px',
                              border: isPicked ? '1.5px solid #0f766e' : '1px solid #cbd5e1',
                              background: isPicked ? '#ecfdf5' : '#ffffff',
                              color: isPicked ? '#065f46' : '#334155',
                              cursor: 'pointer',
                              fontWeight: isPicked ? 700 : 500,
                            }}
                          >
                            {opt.text}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Meter Result */}
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: '#0f766e', fontWeight: 800 }}>
                  📊 Your Constitutional Prakṛti Breakdown
                </h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
                  {scores.answered < 4
                    ? `Answer all 4 questions above (completed: ${scores.answered}/4)`
                    : 'Diagnosis complete based on classical Caraka Saṃhitā indicators!'}
                </p>

                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {/* Vata Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                      <span style={{ color: '#7c3aed' }}>वात (Vāta - Air &amp; Space):</span>
                      <span>{scores.v}%</span>
                    </div>
                    <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${scores.v}%`, background: '#7c3aed', transition: 'width 0.3s ease' }} />
                    </div>
                  </div>

                  {/* Pitta Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                      <span style={{ color: '#ea580c' }}>पित्त (Pitta - Fire &amp; Water):</span>
                      <span>{scores.p}%</span>
                    </div>
                    <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${scores.p}%`, background: '#ea580c', transition: 'width 0.3s ease' }} />
                    </div>
                  </div>

                  {/* Kapha Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                      <span style={{ color: '#0f766e' }}>कफ (Kapha - Earth &amp; Water):</span>
                      <span>{scores.k}%</span>
                    </div>
                    <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${scores.k}%`, background: '#0f766e', transition: 'width 0.3s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#065f46' }}>
                  💡 Ayurvedic Lifestyle Recommendation:
                </div>
                <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '0.25rem', lineHeight: 1.45 }}>
                  {scores.v >= scores.p && scores.v >= scores.k
                    ? 'Dominant Vāta: Prioritize warm, cooked, nourishing meals with ghee; establish a grounding routine and stay warm.'
                    : scores.p >= scores.v && scores.p >= scores.k
                    ? 'Dominant Pitta: Prioritize cooling foods, sweet and bitter herbs, avoid excessive chili and midday sun exposure.'
                    : 'Dominant Kapha: Prioritize vigorous daily exercise, warm spices (ginger, pepper), light meals, and avoid daytime napping.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attraction 2: Dinacharya 24h Clock */}
      {activeTab === 'clock' && (
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h4 style={{ margin: 0, fontSize: '1rem', color: '#0f766e', fontWeight: 800 }}>
              दिनचर्या-चक्रम् · 24-Hour Circadian Biological Clock
            </h4>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f766e' }}>
              Selected Time: {selectedHour.toString().padStart(2, '0')}:00 ({selectedHour >= 12 ? (selectedHour === 12 ? '12 PM' : `${selectedHour - 12} PM`) : selectedHour === 0 ? '12 AM' : `${selectedHour} AM`})
            </span>
          </div>

          {/* Scrub Slider */}
          <div style={{ marginBottom: '1.25rem' }}>
            <input
              type="range"
              min="0"
              max="23"
              step="1"
              value={selectedHour}
              onChange={(e) => setSelectedHour(Number(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              <span>12 AM (Pitta)</span>
              <span>6 AM (Kapha)</span>
              <span>12 PM (Pitta Peak)</span>
              <span>6 PM (Kapha)</span>
              <span>11 PM</span>
            </div>
          </div>

          {/* Active Period Card */}
          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '1.1rem', border: `1.5px solid ${currentSlot.dosha === 'vata' ? '#c4b5fd' : currentSlot.dosha === 'pitta' ? '#fed7aa' : '#99f6e4'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: '1.4rem' }}>
                {currentSlot.dosha === 'vata' ? '💨' : currentSlot.dosha === 'pitta' ? '🔥' : '💧'}
              </span>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: currentSlot.dosha === 'vata' ? '#6d28d9' : currentSlot.dosha === 'pitta' ? '#c2410c' : '#0f766e' }}>
                  {currentSlot.label} · {currentSlot.period}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Hours: {currentSlot.start}:00 to {currentSlot.end}:00
                </div>
              </div>
            </div>

            <p style={{ margin: '0.45rem 0 0.65rem 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
              {currentSlot.desc}
            </p>

            <div style={{ background: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.82rem', color: '#047857', fontWeight: 600 }}>
              💡 Classical Dinacaryā Principle: {currentSlot.tip}
            </div>
          </div>
        </div>
      )}

      {/* Attraction 3: Shad-Rasa 6-Taste Balancer */}
      {activeTab === 'rasa' && (
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', color: '#0f766e', fontWeight: 800 }}>
            षड्रसाः · The 6 Elemental Tastes &amp; Doṣa Modulation
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {SHAD_RASA.map((r) => {
              const isSelected = selectedRasa === r.iast;
              return (
                <button
                  key={r.iast}
                  type="button"
                  onClick={() => setSelectedRasa(r.iast)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: isSelected ? '2px solid #0f766e' : '1px solid #cbd5e1',
                    background: isSelected ? '#ecfdf5' : '#f8fafc',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f766e' }}>{r.dev}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>{r.en} ({r.iast})</div>
                </button>
              );
            })}
          </div>

          {/* Selected Rasa Detail */}
          {(() => {
            const item = SHAD_RASA.find((r) => r.iast === selectedRasa)!;
            return (
              <div style={{ background: '#f8fafc', padding: '1.1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <h5 style={{ margin: 0, fontSize: '1.1rem', color: '#0f766e', fontWeight: 800 }}>
                    {item.dev} रसः ({item.iast} - {item.en})
                  </h5>
                  <span style={{ fontSize: '0.82rem', background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 700 }}>
                    Elemental Composition: {item.bhuta}
                  </span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#1e293b', marginBottom: '0.4rem' }}>
                  <strong>Doṣa Effect:</strong> {item.effect}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  <strong>Common Dietary Examples:</strong> {item.example}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </section>
  );
};

export default AyurvedaAttractions;
