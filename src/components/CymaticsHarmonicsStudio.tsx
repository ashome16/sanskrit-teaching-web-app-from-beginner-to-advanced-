import React, { useState, useEffect, useRef, useCallback } from 'react';

interface CymaticsHarmonicsStudioProps {
  onPlayAudio?: (term: string) => void;
}

interface CakraPreset {
  id: string;
  name: string;
  sanskrit: string;
  lobes: number;
  bija: string;
  bijaTrans: string;
  element: string;
  elementSanskrit: string;
  frequencyHz: number;
  color: string;
  description: string;
  somaticNote: string;
  petalsSyllables: string;
}

const CAKRA_PRESETS: CakraPreset[] = [
  {
    id: 'muladhara-4',
    name: 'Mūlādhāra (Root Foundation)',
    sanskrit: 'मूलाधार चक्रम्',
    lobes: 4,
    bija: 'लँ',
    bijaTrans: 'LAM',
    element: 'Earth (Physical Structure)',
    elementSanskrit: 'पृथिवी-तत्त्वम्',
    frequencyHz: 256,
    color: '#00f2fe',
    description: 'The 4-lobe quadrupole standing wave. Orthogonal acoustic nodes match the 4-petaled Mūlādhāra lotus, the 4-gated Bhūpura of sacred Yantras, and the seat of Gaṇapati identified with Oṃkāra.',
    somaticNote: 'Nodal stillness at the pelvic floor / perineum. Sound energy anchors structural grounding; particles settle into the 4 cardinal petals.',
    petalsSyllables: 'वं (vaṃ) · शं (śaṃ) · षं (ṣaṃ) · सं (saṃ)',
  },
  {
    id: 'svadhisthana-6',
    name: 'Svādhiṣṭhāna (Sacral Center)',
    sanskrit: 'स्वाधिष्ठान चक्रम्',
    lobes: 6,
    bija: 'वँ',
    bijaTrans: 'VAM',
    element: 'Water (Fluid Circulation)',
    elementSanskrit: 'जल-तत्त्वम्',
    frequencyHz: 288,
    color: '#38bdf8',
    description: '6-fold radial symmetry. Acoustic nodal lines create a hexagonal resonance matching the 6-petaled lotus of cellular fluid dynamics.',
    somaticNote: 'Regulates bodily fluids, lymphatic drainage, and reproductive tissue. Frequency stabilizes fluid surface tension.',
    petalsSyllables: 'बं (baṃ) · भं (bhaṃ) · मं (maṃ) · यं (yaṃ) · रं (raṃ) · लं (laṃ)',
  },
  {
    id: 'manipura-10',
    name: 'Maṇipūra (Solar Plexus)',
    sanskrit: 'मणिपूर चक्रम्',
    lobes: 10,
    bija: 'रँ',
    bijaTrans: 'RAM',
    element: 'Fire (Metabolism & Heat)',
    elementSanskrit: 'अग्नि-तत्त्वम्',
    frequencyHz: 320,
    color: '#fbbf24',
    description: '10-fold decagonal standing wave. High-density standing wave nodes mirror the metabolic furnace of Samāna Vāyu and gastric heat.',
    somaticNote: 'Centering at the navel (Nābhi). Paśyantī Vāk emerges here as internal lightning before speech ascends into the lungs.',
    petalsSyllables: 'डं · ढं · णं · तं · थं · दं · धं · नं · पं · फं',
  },
  {
    id: 'anahata-12',
    name: 'Anāhata (Heart Lotus)',
    sanskrit: 'अनाहत चक्रम्',
    lobes: 12,
    bija: 'यँ',
    bijaTrans: 'YAM',
    element: 'Air (Unstruck Vibration)',
    elementSanskrit: 'वायु-तत्त्वम्',
    frequencyHz: 341.3,
    color: '#34d399',
    description: '12-fold dodecagonal standing wave. The unstruck sound (anāhata nāda) resonating in the pericardium and pulmonary cavity.',
    somaticNote: 'Seat of Madhyamā Vāk. Mental rehearsal and inner hearing occur here in the cardiac chamber before breath passes the vocal folds.',
    petalsSyllables: 'कं · खं · गं · घं · ङं · चं · छं · जं · झं · ञं · टं · ठं',
  },
  {
    id: 'visuddha-16',
    name: 'Viśuddha (Throat Articulator)',
    sanskrit: 'विशुद्ध चक्रम्',
    lobes: 16,
    bija: 'हँ',
    bijaTrans: 'HAM',
    element: 'Ether / Space (Pure Acoustic Field)',
    elementSanskrit: 'आकाश-तत्त्वम्',
    frequencyHz: 384,
    color: '#a855f7',
    description: '16-fold hexadecagonal standing wave. Matches the 16 primary Sanskrit vowels (Svaras) formed by 16 modal resonances of the vocal tract.',
    somaticNote: 'Seat of Vaikharī Vāk. Physical acoustic waves fire through larynx, tongue, palate, and lips into external ambient air.',
    petalsSyllables: 'अ · आ · इ · ई · उ · ऊ · ऋ · ॠ · ऌ · ॡ · ए · ऐ · ओ · औ · अं · अः',
  },
  {
    id: 'ajna-2',
    name: 'Ājñā (Third Eye / Command)',
    sanskrit: 'आज्ञा चक्रम्',
    lobes: 2,
    bija: 'ॐ',
    bijaTrans: 'OM',
    element: 'Pure Mind (Buddhi & Manas)',
    elementSanskrit: 'महत्-तत्त्वम्',
    frequencyHz: 480,
    color: '#ec4899',
    description: '2-lobe dipole standing wave. Represents the fundamental polarity of consciousness: Haṃ (solar breath) and Kṣaṃ (lunar breath).',
    somaticNote: 'Stillness behind the eyebrow center. Binaural coherence between left and right cerebral hemispheres.',
    petalsSyllables: 'हं (haṃ) · क्षं (kṣaṃ)',
  },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const CymaticsHarmonicsStudio: React.FC<CymaticsHarmonicsStudioProps> = ({ onPlayAudio }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('muladhara-4');
  const [lobes, setLobes] = useState<number>(4);
  const [frequency, setFrequency] = useState<number>(256);
  const [asymmetry, setAsymmetry] = useState<number>(0.28);
  const [amplitude, setAmplitude] = useState<number>(0.55);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showNodalStillness, setShowNodalStillness] = useState<boolean>(true);
  const [showParticles, setShowParticles] = useState<boolean>(true);
  const [particleDensity, setParticleDensity] = useState<'low' | 'med' | 'high'>('med');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  const currentPreset = CAKRA_PRESETS.find((p) => p.id === selectedPresetId) || CAKRA_PRESETS[0];

  // Initialize particles
  const initParticles = useCallback((count: number, width: number, height: number) => {
    const list: Particle[] = [];
    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.min(width, height) * 0.44;

    for (let i = 0; i < count; i++) {
      const r = Math.sqrt(Math.random()) * maxRadius;
      const theta = Math.random() * Math.PI * 2;
      list.push({
        x: cx + r * Math.cos(theta),
        y: cy + r * Math.sin(theta),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }
    particlesRef.current = list;
  }, []);

  // Update preset
  const handleSelectPreset = (preset: CakraPreset) => {
    setSelectedPresetId(preset.id);
    setLobes(preset.lobes);
    setFrequency(preset.frequencyHz);
    if (preset.id === 'muladhara-4') {
      setAsymmetry(0.28);
    } else {
      setAsymmetry(0.08);
    }

    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setTargetAtTime(preset.frequencyHz, audioCtxRef.current.currentTime, 0.05);
    }
  };

  // Re-scatter sand particles
  const handleScatterParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const count = particleDensity === 'low' ? 300 : particleDensity === 'med' ? 650 : 1200;
    initParticles(count, canvas.width, canvas.height);
  };

  // Web Audio Synthesizer
  const toggleAudio = () => {
    if (isPlayingAudio) {
      // Stop
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.1);
        setTimeout(() => {
          if (oscRef.current) {
            oscRef.current.stop();
            oscRef.current.disconnect();
            oscRef.current = null;
          }
          setIsPlayingAudio(false);
        }, 120);
      } else {
        setIsPlayingAudio(false);
      }
    } else {
      // Start
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioContextClass();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
        setIsPlayingAudio(true);
      } catch (err) {
        console.error('Web Audio error:', err);
      }
    }
  };

  // Frequency change handler
  const handleFrequencyChange = (val: number) => {
    setFrequency(val);
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setTargetAtTime(val, audioCtxRef.current.currentTime, 0.05);
    }
  };

  // Particle count on mount or resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const count = particleDensity === 'low' ? 300 : particleDensity === 'med' ? 650 : 1200;
    initParticles(count, canvas.width, canvas.height);
  }, [particleDensity, initParticles]);

  // Teardown audio on unmount
  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch (_) {}
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch (_) {}
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.02;
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.36;

      // Dark background
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, width, height);

      // Polar coordinate background grid
      ctx.save();
      ctx.translate(cx, cy);

      // 1. Concentric circles (polar rings)
      const numRings = 5;
      for (let i = 1; i <= numRings; i++) {
        const ringR = (baseRadius / numRings) * i;
        ctx.beginPath();
        ctx.arc(0, 0, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = i === numRings ? 'rgba(56, 189, 248, 0.35)' : 'rgba(30, 41, 59, 0.8)';
        ctx.lineWidth = i === numRings ? 1.5 : 1;
        ctx.setLineDash(i === numRings ? [] : [3, 4]);
        ctx.stroke();
      }

      // 2. Radial guideline rays (every 45 degrees)
      ctx.setLineDash([2, 5]);
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.55)';
      ctx.lineWidth = 1;
      const raySteps = 8;
      for (let s = 0; s < raySteps; s++) {
        const ang = (Math.PI * 2 * s) / raySteps;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(ang) * baseRadius * 1.08, Math.sin(ang) * baseRadius * 1.08);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // 3. Mathematical Cymatic Standing Wave Contour Function
      // r(theta) = R0 * [ 0.35 + amp * |cos(n * theta / 2)|^power + asym * sin(n * theta) ]
      const curvePoints: { x: number; y: number; r: number; theta: number }[] = [];
      const numSteps = 720;
      const n = lobes;

      for (let i = 0; i <= numSteps; i++) {
        const theta = (Math.PI * 2 * i) / numSteps;

        // Primary standing wave modal lobe
        // For quadrupole (n=4): cos(2*theta) produces 4-petaled clover
        const harmonicBase = Math.abs(Math.cos((n * theta) / 2));
        const lobeModulation = Math.pow(harmonicBase, 1.8);

        // Acoustic perturbation / asymmetric secondary wing notch (as seen in Hans Jenny & laboratory Chladni plates)
        const notchPerturbation = asymmetry * Math.sin(n * theta + Math.PI / 4) * Math.cos(theta * 2);

        // Micro vibration shimmer
        const shimmer = isPlayingAudio ? Math.sin(time * 8 + theta * n) * 0.015 : 0;

        const r = baseRadius * (0.08 + amplitude * lobeModulation + notchPerturbation + shimmer);
        const x = r * Math.cos(theta - Math.PI / 2); // Rotate so lobe 1 points North
        const y = r * Math.sin(theta - Math.PI / 2);
        curvePoints.push({ x, y, r, theta });
      }

      // Fill contour area with subtle dark glow
      ctx.beginPath();
      curvePoints.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(12, 28, 54, 0.55)';
      ctx.fill();

      // Draw Glowing Cyan Standing Wave Line
      ctx.beginPath();
      curvePoints.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.strokeStyle = currentPreset.color;
      ctx.lineWidth = 2.4;
      ctx.shadowColor = currentPreset.color;
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Draw secondary nodal ring / inner core boundary
      if (showNodalStillness) {
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius * 0.08, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Cardinal nodal markers at center
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Particle Simulation: Sand / Lycopodium particles settling into nodal stillness
      if (showParticles) {
        const particles = particlesRef.current;
        ctx.fillStyle = 'rgba(240, 249, 255, 0.85)';

        for (let pIdx = 0; pIdx < particles.length; pIdx++) {
          const p = particles[pIdx];
          const px = p.x - cx;
          const py = p.y - cy;
          const pr = Math.sqrt(px * px + py * py);
          let pTheta = Math.atan2(py, px) + Math.PI / 2;
          if (pTheta < 0) pTheta += Math.PI * 2;

          // Find expected standing wave nodal radius at this angle
          const stepIdx = Math.round((pTheta / (Math.PI * 2)) * numSteps) % numSteps;
          const targetPt = curvePoints[stepIdx];
          const targetR = targetPt ? targetPt.r : baseRadius * 0.4;

          // Radial displacement delta from the nodal boundary
          const deltaR = targetR - pr;

          // Particles migrate towards the zero-displacement line (where net acoustic force balances)
          const migrationSpeed = isPlayingAudio ? 0.08 : 0.04;
          const randomJitter = (Math.random() - 0.5) * (isPlayingAudio ? 1.2 : 0.4);
          p.x += Math.cos(pTheta - Math.PI / 2) * deltaR * migrationSpeed + randomJitter;
          p.y += Math.sin(pTheta - Math.PI / 2) * deltaR * migrationSpeed + randomJitter;

          // Draw individual sand particle
          ctx.fillRect(p.x - cx, p.y - cy, 1.8, 1.8);
        }
      }

      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [lobes, asymmetry, amplitude, isPlayingAudio, showNodalStillness, showParticles, currentPreset]);

  return (
    <div
      style={{
        background: '#040812',
        border: '1.5px solid #1e293b',
        borderRadius: '20px',
        padding: '1.75rem',
        margin: '2.5rem 0',
        color: '#f8fafc',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56, 189, 248, 0.1)',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Studio Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '0.3rem 0.9rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
          <span>🌊</span>
          <span>Somatic Cymatics Laboratory · नाद-बिन्दु-संस्थानम्</span>
        </div>
        <h3 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#f0f9ff', margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>
          Acoustic Standing Waves &amp; Sacred Geometry
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.5 }}>
          Explore how sound vibration creates visible geometric structure. Select a Cakra harmonic mode, toggle the Web Audio sine oscillator, adjust boundary damping, and watch physical particles crystallize into nodal lines of zero displacement.
        </p>
      </div>

      {/* Preset Selector Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.65rem', marginBottom: '1.5rem' }}>
        {CAKRA_PRESETS.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              style={{
                background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15, 23, 42, 0.7)',
                border: isSelected ? `2px solid ${preset.color}` : '1px solid #1e293b',
                borderRadius: '12px',
                padding: '0.65rem 0.5rem',
                color: isSelected ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? `0 0 15px ${preset.color}33` : 'none',
              }}
            >
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: preset.color, marginBottom: '0.15rem' }}>
                {preset.bija} <span style={{ fontSize: '0.78rem', opacity: 0.85 }}>({preset.bijaTrans})</span>
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {preset.lobes}-Lobe
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                {preset.frequencyHz} Hz
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Studio Interactive Stage */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 340px', gap: '1.75rem', alignItems: 'center' }}>
        {/* Canvas Display */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#02050b', borderRadius: '16px', border: '1px solid #1e293b', padding: '1rem', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '14px', left: '16px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.74rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155', borderRadius: '6px', padding: '0.2rem 0.5rem', color: '#38bdf8', fontWeight: 700 }}>
              Mode: {lobes}-Lobe Quadrupole
            </span>
            <span style={{ fontSize: '0.74rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155', borderRadius: '6px', padding: '0.2rem 0.5rem', color: '#a7f3d0', fontWeight: 700 }}>
              {frequency} Hz
            </span>
          </div>

          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            style={{
              width: '100%',
              maxWidth: '480px',
              aspectRatio: '1 / 1',
              borderRadius: '12px',
              display: 'block',
            }}
          />

          <div style={{ width: '100%', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#64748b' }}>
            <span>Polar Grid: $r(\theta) = R_0 + A \cdot \cos({lobes}\theta)$</span>
            <span>Nodal Stillness: $\nabla \langle p^2 \rangle \to 0$</span>
          </div>
        </div>

        {/* Controls & Metaphysical Insight Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {/* Active Preset Highlight */}
          <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid #334155', borderRadius: '14px', padding: '1.1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: currentPreset.color }}>
                  {currentPreset.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  {currentPreset.sanskrit} · {currentPreset.element}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onPlayAudio && onPlayAudio(currentPreset.bija)}
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                  borderRadius: '8px',
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
                title="Recite Bīja Syllable"
              >
                🔊 Bīja {currentPreset.bija}
              </button>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.45, margin: '0 0 0.65rem' }}>
              {currentPreset.description}
            </p>

            <div style={{ fontSize: '0.76rem', background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '0.5rem 0.75rem', color: '#94a3b8' }}>
              <strong style={{ color: '#38bdf8' }}>Petal Syllables:</strong> {currentPreset.petalsSyllables}
            </div>
          </div>

          {/* Interactive Synthesizer & Sliders */}
          <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid #334155', borderRadius: '14px', padding: '1.1rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              🎛️ Acoustic Wave Parameters
            </div>

            {/* Audio Oscillator Button */}
            <div style={{ marginBottom: '1rem' }}>
              <button
                type="button"
                onClick={toggleAudio}
                style={{
                  width: '100%',
                  background: isPlayingAudio ? '#ef4444' : '#0284c7',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.65rem 1rem',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: isPlayingAudio ? '0 0 15px rgba(239, 68, 68, 0.4)' : '0 4px 12px rgba(2, 132, 199, 0.3)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{isPlayingAudio ? '⏹️ Stop Tone Generator' : '▶️ Play Standing Sine Tone'}</span>
                <span style={{ fontSize: '0.78rem', opacity: 0.9 }}>({frequency} Hz)</span>
              </button>
            </div>

            {/* Slider 1: Frequency */}
            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                <span>Frequency (Hz)</span>
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>{frequency} Hz</span>
              </div>
              <input
                type="range"
                min="64"
                max="512"
                step="4"
                value={frequency}
                onChange={(e) => handleFrequencyChange(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#38bdf8' }}
              />
            </div>

            {/* Slider 2: Lobes (Harmonic Mode) */}
            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                <span>Harmonic Lobes (Petals)</span>
                <span style={{ color: currentPreset.color, fontWeight: 700 }}>{lobes} Lobes</span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                step="2"
                value={lobes}
                onChange={(e) => setLobes(Number(e.target.value))}
                style={{ width: '100%', accentColor: currentPreset.color }}
              />
            </div>

            {/* Slider 3: Asymmetry (Notch Boundary Perturbation) */}
            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                <span>Boundary Notch Perturbation</span>
                <span style={{ color: '#f59e0b', fontWeight: 700 }}>{Math.round(asymmetry * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.02"
                value={asymmetry}
                onChange={(e) => setAsymmetry(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f59e0b' }}
              />
            </div>

            {/* Slider 4: Amplitude */}
            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                <span>Wave Amplitude (Spanda Intensity)</span>
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>{Math.round(amplitude * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="0.85"
                step="0.05"
                value={amplitude}
                onChange={(e) => setAmplitude(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#38bdf8' }}
              />
            </div>

            {/* Toggles */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                type="button"
                onClick={handleScatterParticles}
                style={{
                  flex: 1,
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  padding: '0.45rem',
                  fontSize: '0.75rem',
                  color: '#e2e8f0',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                🔄 Re-scatter
              </button>
              <button
                type="button"
                onClick={() => setShowParticles(!showParticles)}
                style={{
                  flex: 1,
                  background: showParticles ? 'rgba(56, 189, 248, 0.15)' : 'rgba(30, 41, 59, 0.8)',
                  border: showParticles ? '1px solid #38bdf8' : '1px solid #475569',
                  borderRadius: '8px',
                  padding: '0.45rem',
                  fontSize: '0.75rem',
                  color: showParticles ? '#38bdf8' : '#94a3b8',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                {showParticles ? '✓ Sand: ON' : '○ Sand: OFF'}
              </button>
              <button
                type="button"
                onClick={() => setShowNodalStillness(!showNodalStillness)}
                style={{
                  flex: 1,
                  background: showNodalStillness ? 'rgba(168, 85, 247, 0.15)' : 'rgba(30, 41, 59, 0.8)',
                  border: showNodalStillness ? '1px solid #a855f7' : '1px solid #475569',
                  borderRadius: '8px',
                  padding: '0.45rem',
                  fontSize: '0.75rem',
                  color: showNodalStillness ? '#d8b4fe' : '#94a3b8',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                {showNodalStillness ? '✓ Nodal: ON' : '○ Nodal: OFF'}
              </button>
            </div>

            {/* Density Selector */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.74rem', color: '#94a3b8' }}>
              <span>Medium Density:</span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {(['low', 'med', 'high'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setParticleDensity(d)}
                    style={{
                      background: particleDensity === d ? '#0284c7' : 'rgba(30, 41, 59, 0.8)',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#ffffff',
                      padding: '0.15rem 0.5rem',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      fontWeight: particleDensity === d ? 700 : 400,
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Somatic Sādhana Coordinate Box */}
          <div style={{ background: 'rgba(6, 78, 59, 0.2)', border: '1px solid #059669', borderRadius: '12px', padding: '0.85rem 1rem', fontSize: '0.82rem', color: '#a7f3d0', lineHeight: 1.45 }}>
            <strong style={{ color: '#34d399', display: 'block', marginBottom: '0.2rem' }}>
              🧘 Somatic Sādhana Insight:
            </strong>
            {currentPreset.somaticNote}
          </div>
        </div>
      </div>
    </div>
  );
};
