import React, { useEffect, useRef, useState } from 'react';
import { playPronunciation } from '../../utils/pronunciation';
import { gunaAudio } from './gunaAudioEngine';
import { GunaMatrixIntroMovie } from './GunaMatrixIntroMovie';

// Particle Definition for Dynamic Canvas
interface MatrixParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  cluster: 'earth' | 'water';
  color: string;
}

export const DynamicGunaMatrix: React.FC = () => {
  // Intro Movie & Interactive Workbench Ref
  const [showIntroMovie, setShowIntroMovie] = useState<boolean>(true);
  const interactiveBenchRef = useRef<HTMLDivElement>(null);

  // 4-Stage Progressive Missions
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // The Guṇa Triad (Sliders 0 - 100)
  // Stage 1 initial: High Sneha (85), Low Dravatva (20), Low Uṣṇa (15)
  const [sneha, setSneha] = useState<number>(85); // Cohesion / Polarity
  const [dravatva, setDravatva] = useState<number>(20); // Fluidity / Mobility
  const [usna, setUsna] = useState<number>(15); // Kinetic Heat / Temperature

  // Interactive Feedback States
  const [repulsionTriggered, setRepulsionTriggered] = useState(false);
  const [guruDialogue, setGuruDialogue] = useState<string>(
    "Look closer, Learner. You speak of 'liquids' and 'solids' as if they are permanent iron cages. They are not. The states you see are merely an illusion—a passing mask worn by matter."
  );
  const [guruSpeaker, setGuruSpeaker] = useState<'Kaṇāda' | 'System'>('Kaṇāda');
  const [isSynergyLocked, setIsSynergyLocked] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  // Canvas Refs & Simulation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<MatrixParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Synergy Window target bounds
  const SYNERGY_MIN = 45;
  const SYNERGY_MAX = 65;

  const checkSynergy = (s: number, d: number, u: number) => {
    return (
      s >= SYNERGY_MIN &&
      s <= SYNERGY_MAX &&
      d >= SYNERGY_MIN &&
      d <= SYNERGY_MAX &&
      u >= SYNERGY_MIN &&
      u <= SYNERGY_MAX
    );
  };

  // Initialize Particles (28 Earth particles on left, 28 Water particles on right = 56 total)
  useEffect(() => {
    const list: MatrixParticle[] = [];
    // Cluster 1: Earth (dense, gold)
    for (let i = 0; i < 28; i++) {
      list.push({
        x: 140 + (Math.random() * 90 - 45),
        y: 190 + (Math.random() * 90 - 45),
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 5 + Math.random() * 2,
        cluster: 'earth',
        color: '#eab308',
      });
    }
    // Cluster 2: Water (slick, cyan)
    for (let i = 0; i < 28; i++) {
      list.push({
        x: 460 + (Math.random() * 90 - 45),
        y: 190 + (Math.random() * 90 - 45),
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 4.5 + Math.random() * 2,
        cluster: 'water',
        color: '#38bdf8',
      });
    }
    particlesRef.current = list;
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Heat haze background tint based on Uṣṇa
      if (usna > 20) {
        ctx.fillStyle = `rgba(234, 88, 12, ${(usna / 100) * 0.12})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // If Stage 4 victory has occurred: draw glowing Sunbeam Mote Field (Trasareṇu)
      if (currentStage === 4 && isSynergyLocked) {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Radiant golden sunbeam beam
        const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 160);
        grad.addColorStop(0, 'rgba(254, 240, 138, 0.6)');
        grad.addColorStop(0.5, 'rgba(234, 179, 8, 0.2)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, 160, 0, Math.PI * 2);
        ctx.fill();

        // Trasareṇu triad core
        ctx.fillStyle = '#fef08a';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 20;

        const time = Date.now() * 0.003;
        for (let t = 0; t < 6; t++) {
          const angle = time + (t * Math.PI) / 3;
          const r = 24 + Math.sin(time * 2 + t) * 6;
          const px = cx + Math.cos(angle) * r;
          const py = cy + Math.sin(angle) * r;
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Particle physics influenced by Guṇa Triad
      const particles = particlesRef.current;
      const speedMultiplier = 0.3 + (dravatva / 100) * 2.2 + (usna / 100) * 1.5;
      const cohesionForce = (sneha / 100) * 0.06;

      // Centroids of the two clusters
      let earthCx = 160;
      let earthCy = 190;
      let waterCx = 440;
      let waterCy = 190;

      // If repulsion triggered in Stage 1, push clusters apart
      if (repulsionTriggered) {
        earthCx = 110;
        waterCx = 490;
      }

      // If in Stage 3 or 4: clusters blend toward center
      if (currentStage >= 3) {
        earthCx = 300;
        waterCx = 300;
      }

      particles.forEach((p) => {
        // Cohesion pulls particle toward its target cluster center
        const targetX = p.cluster === 'earth' ? earthCx : waterCx;
        const targetY = p.cluster === 'earth' ? earthCy : waterCy;

        if (currentStage < 3) {
          p.vx += (targetX - p.x) * cohesionForce;
          p.vy += (targetY - p.y) * cohesionForce;
        } else {
          // In Stage 3, fluidity spreads particles freely across the entire box
          p.vx += (Math.random() - 0.5) * 0.6;
          p.vy += (Math.random() - 0.5) * 0.6;
        }

        // Apply velocity with damping
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Boundary bounce
        if (p.x < 20) {
          p.x = 20;
          p.vx *= -1;
        }
        if (p.x > canvas.width - 20) {
          p.x = canvas.width - 20;
          p.vx *= -1;
        }
        if (p.y < 20) {
          p.y = 20;
          p.vy *= -1;
        }
        if (p.y > canvas.height - 20) {
          p.y = canvas.height - 20;
          p.vy *= -1;
        }

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = usna > 40 ? 8 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connecting molecular threads if cohesion is active
      if (currentStage >= 3 && sneha > 40) {
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.2)';
        for (let i = 0; i < particles.length; i += 3) {
          for (let j = i + 1; j < particles.length; j += 4) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 45) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw cluster boundary halos in Stage 1 & 2
      if (currentStage === 1 || currentStage === 2) {
        // Earth cluster halo
        ctx.beginPath();
        ctx.arc(earthCx, earthCy, 85, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(234, 179, 8, 0.8)';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.fillText('Pṛthivī Cluster (Solid Mask)', earthCx - 75, earthCy - 92);

        // Water cluster halo
        ctx.beginPath();
        ctx.arc(waterCx, waterCy, 85, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.fillText('Ap Cluster (Liquid Mask)', waterCx - 65, waterCy - 92);

        // Repulsion shockwave rings if triggered
        if (repulsionTriggered) {
          const midX = (earthCx + waterCx) / 2;
          ctx.beginPath();
          ctx.arc(midX, 190, 42, 0, Math.PI * 2);
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [sneha, dravatva, usna, currentStage, repulsionTriggered, isSynergyLocked]);

  // Audio Toggle
  const toggleAudio = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    gunaAudio.setSoundEnabled(next);
    if (next) gunaAudio.playTone(392, 0.3);
  };

  // =========================================================================
  // STAGE 1: ATTEMPT MERGE (STRUCTURAL FRICTION & THE OIL-WATER DILEMMA)
  // =========================================================================
  const handleAttemptMerge = () => {
    setRepulsionTriggered(true);
    gunaAudio.playRepulsionFriction();

    setGuruSpeaker('System');
    setGuruDialogue(
      '⚠️ Incompatible Guṇa Rejection — Structural Friction High (Polarity & Sneha Mismatch). Particles sliding apart like oil and water!'
    );

    setTimeout(() => {
      setGuruSpeaker('Kaṇāda');
      setGuruDialogue(
        "“Why do oil and water drift apart? It is not because they belong to different boxes called 'liquids.' It is because their inherent Cohesion (Sneha) and Fluidity (Dravatva) possess distinct cosmic signatures that refuse to intertwine. Alter the medium, not the particle!”"
      );
    }, 1600);
  };

  // =========================================================================
  // STAGE 2: INJECT TEJAS CATALYST (BREAKING THE STATE MASK)
  // =========================================================================
  const handleInjectTejas = () => {
    gunaAudio.playHeatCrackle();
    setRepulsionTriggered(false);

    // Increase heat, decrease cohesion
    const nextUsna = 58;
    const nextSneha = 54;
    setUsna(nextUsna);
    setSneha(nextSneha);

    setCurrentStage(2);
    setGuruSpeaker('Kaṇāda');
    setGuruDialogue(
      '“Heat (Tejas) disrupts the boundary bonds. As Uṣṇa rises, the rigid localized Cohesion (Sneha) drops. The states soften into an amorphous, receptive field! Now introduce Vāyu to calibrate the fluid dance.”'
    );
  };

  // =========================================================================
  // STAGE 3: INTRODUCE VĀYU WINDS (DYNAMIC PROPERTY SOUP)
  // =========================================================================
  const handleSweepVayu = () => {
    gunaAudio.playWindWhoosh();
    const nextDravatva = 56;
    setDravatva(nextDravatva);

    setCurrentStage(3);
    setGuruSpeaker('Kaṇāda');
    setGuruDialogue(
      '“Dravatva (Fluidity) spikes! The clusters break apart entirely into an undulating property soup. They are neither rigid solids nor isolated liquids—keep all three Gunas within the Synergy Window (45%–65%)!”'
    );

    // Check if synergy window is met
    if (checkSynergy(sneha, nextDravatva, usna)) {
      setIsSynergyLocked(true);
      gunaAudio.playSynergyLock();
    }
  };

  // Manual Slider Adjustments with real-time synergy evaluation
  const handleSliderChange = (type: 'sneha' | 'dravatva' | 'usna', val: number) => {
    let s = sneha;
    let d = dravatva;
    let u = usna;

    if (type === 'sneha') {
      s = val;
      setSneha(val);
    }
    if (type === 'dravatva') {
      d = val;
      setDravatva(val);
    }
    if (type === 'usna') {
      u = val;
      setUsna(val);
      // Thermal heating naturally reduces cohesion
      s = Math.max(10, Math.min(95, 95 - val * 0.7));
      setSneha(Math.round(s));
    }

    const locked = checkSynergy(s, d, u);
    setIsSynergyLocked(locked);

    if (locked) {
      gunaAudio.playTone(523.25, 0.25);
      setGuruSpeaker('Kaṇāda');
      setGuruDialogue(
        '“Synergy Locked! Molecular polarities and thermal energies harmonized across space. The Guna Triad is ready for Samavāya binding!”'
      );
    } else if (u > 85) {
      setGuruSpeaker('System');
      setGuruDialogue('⚠️ Overheated! Thermal agitation too high — atoms scattering uncontrollably!');
    } else if (u < 25) {
      setGuruSpeaker('System');
      setGuruDialogue('⚠️ Too cold! Cohesion rigidified into unmixable phase separation.');
    }
  };

  // =========================================================================
  // STAGE 4: THE SAMAVĀYA BINDING (STATE TRANSCENDED)
  // =========================================================================
  const handleSamavayaBinding = () => {
    if (!isSynergyLocked) return;
    gunaAudio.playSamavayaImplosion();
    setCurrentStage(4);

    setGuruSpeaker('Kaṇāda');
    setGuruDialogue(
      '“Superficial forms have faded. By manipulating the invisible threads of reality (Gunas), you have forged true Harmony (Samavaya). The illusion of division is shattered.”'
    );

    setTimeout(() => {
      setShowVictoryModal(true);
    }, 1200);
  };

  // Reset to Stage 1
  const handleResetMatrix = () => {
    setCurrentStage(1);
    setSneha(85);
    setDravatva(20);
    setUsna(15);
    setRepulsionTriggered(false);
    setIsSynergyLocked(false);
    setShowVictoryModal(false);
    setGuruSpeaker('Kaṇāda');
    setGuruDialogue(
      "Look closer, Learner. You speak of 'liquids' and 'solids' as if they are permanent iron cages. They are not. The states you see are merely an illusion—a passing mask worn by matter."
    );
  };

  return (
    <section className="vl-guna-matrix-section" aria-label="Dynamic Guna Matrix: States Are an Illusion">
      {/* 1. Header & Paradigm Shift Banner */}
      <div className="vl-matrix-header">
        <div className="vl-matrix-header-text">
          <div className="vl-hud-pill">THE DYNAMIC GUṆA MATRIX · STATES ARE AN ILLUSION</div>
          <h2 className="vl-matrix-title">
            <span>🧪 The Illusion of State: Dynamic Guṇa Combinations</span>
          </h2>
          <p className="vl-matrix-subtitle">
            Modern physics and Vaiśeṣika agree: &ldquo;solid, liquid, gas&rdquo; are not fixed permanent cages.
            Why don&rsquo;t polar water and non-polar oil mix? Because their underlying <strong>Cohesion (Sneha)</strong>,{' '}
            <strong>Fluidity (Dravatva)</strong>, and <strong>Heat (Uṣṇa)</strong> diverge. Master the Guṇa Triad to dissolve phase boundaries!
          </p>
        </div>

        <div className="vl-matrix-controls-tray">
          <button
            type="button"
            className={`vl-chip${showIntroMovie ? ' is-active' : ''}`}
            onClick={() => setShowIntroMovie(!showIntroMovie)}
            title="Toggle 4-stage introductory story walkthrough video"
            style={{ fontWeight: 800 }}
          >
            {showIntroMovie ? '🎬 Hide Intro Video ▲' : '🎬 Watch Intro Video ▼'}
          </button>
          <button
            type="button"
            className="vl-chip"
            onClick={toggleAudio}
            title="Toggle matrix synthesis sounds"
          >
            {soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF'}
          </button>
          <button
            type="button"
            className="vl-chip"
            onClick={handleResetMatrix}
            title="Reset matrix to Stage 1"
          >
            🔄 Reset Matrix
          </button>
        </div>
      </div>

      {/* 🎬 INTRODUCTORY CINEMATIC STORY (4 ACTS) */}
      {showIntroMovie && (
        <GunaMatrixIntroMovie
          onSwitchToInteractive={() => {
            interactiveBenchRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* 🎮 INTERACTIVE LABORATORY BENCH (CLEAR STREAMLINED SEQUENCE) */}
      <div
        ref={interactiveBenchRef}
        className="vl-guna-interactive-bench"
        role="region"
        aria-label="Interactive Guna Workbench"
        style={{ scrollMarginTop: '1.5rem' }}
      >
        {/* 1. Interactive Simulation Stage (Canvas) */}
        <div className="vl-matrix-canvas-card">
          <div className="vl-matrix-stage-toolbar">
            <div className="vl-stage-mission-indicator">
              <span className="vl-step-indicator">STAGE {currentStage}/4:</span>{' '}
              <strong>
                {currentStage === 1 && 'The Illusion of Separation (Oil & Water)'}
                {currentStage === 2 && 'Break the State Mask (Injecting Thermal Tejas)'}
                {currentStage === 3 && 'Dynamic Property Soup (Sweeping Vāyu)'}
                {currentStage === 4 && 'Samavāya Inherence Achieved (Trasareṇu Created)'}
              </strong>
            </div>
            <div className="vl-stage-status-chips">
              <span className="vl-status-chip">
                {currentStage < 4 ? 'Atoms: 56 Paramāṇus' : 'Atoms: Dancing Trasareṇu Motes'}
              </span>
              <span className="vl-status-chip">
                {currentStage === 1 && 'Phase: Immiscible (High Sneha Friction)'}
                {currentStage === 2 && 'Phase: Thermal Agitation (Pīlupāka Heat Active)'}
                {currentStage === 3 && (isSynergyLocked ? '✨ 45%–65% Synergy Locked' : 'Phase: Free Atom Soup (Tune Sliders)')}
                {currentStage === 4 && 'State: Intramolecular Samavāya Inherence'}
              </span>
            </div>
          </div>

          <div className="vl-canvas-wrapper" style={{ position: 'relative', width: '100%', height: '380px' }}>
            <canvas
              ref={canvasRef}
              width={600}
              height={380}
              className="vl-matrix-canvas"
              style={{ width: '100%', height: '100%', display: 'block', borderRadius: '12px', background: '#050914' }}
            />

            {/* Interactive In-Stage Overlays */}
            {repulsionTriggered && currentStage === 1 && (
              <div className="vl-stage-clash-toast">
                ⚡ STRUCTURAL FRICTION: SNEHA POLARITY DIVERGENCE (OIL &amp; WATER SLIDE OFF)
              </div>
            )}
          </div>

          {/* Action Toolbar to Drive the Sequence */}
          <div className="vl-matrix-action-toolbar">
            <button
              type="button"
              className={`vl-btn vl-btn--cyber${currentStage === 1 ? ' is-pulsing' : ''}`}
              onClick={handleAttemptMerge}
              title="Step 1: Attempt to mix the two unmixable clusters"
            >
              1. Attempt Merge (The Oil &amp; Water Dilemma)
            </button>

            <button
              type="button"
              className={`vl-btn vl-btn--cyber${currentStage === 2 ? ' is-pulsing' : ''}`}
              onClick={handleInjectTejas}
              title="Step 2: Inject heat to break the rigid boundaries"
            >
              2. Inject Tejas (Break the State Mask)
            </button>

            <button
              type="button"
              className={`vl-btn vl-btn--cyber${currentStage === 3 ? ' is-pulsing' : ''}`}
              onClick={handleSweepVayu}
              title="Step 3: Sweep Vayu to create dynamic property soup"
            >
              3. Sweep Vāyu (Dynamic Property Soup)
            </button>

            <button
              type="button"
              disabled={!isSynergyLocked}
              className={`vl-btn vl-btn--gold${isSynergyLocked ? ' is-unlocked-glow is-pulsing' : ''}`}
              onClick={handleSamavayaBinding}
              title={isSynergyLocked ? 'Step 4: Bind into Trasarenu in eternal Akasa!' : 'Step 4: Complete Step 3 slider tuning first'}
            >
              4. ⚛️ BIND SAMAVĀYA IN ĀKĀŚA
            </button>
          </div>
        </div>

        {/* 2. Real-Time Guṇa Triad Sliders (त्रिगुणात्मक-पर्यावरणम्) */}
        <div
          className="vl-guna-triad-card"
          role="region"
          aria-label="The Guna Triad Sliders"
          style={{
            borderColor: currentStage === 3 ? (isSynergyLocked ? '#10b981' : '#facc15') : 'rgba(148, 163, 184, 0.25)',
            boxShadow: currentStage === 3 ? '0 0 20px rgba(250, 204, 21, 0.15)' : 'none',
          }}
        >
          <div className="vl-triad-header">
            <div>
              <h3 className="vl-triad-title">
                <span>
                  {currentStage === 3
                    ? '📊 THE GUṆA TRIAD · STEP 3 ACTIVE TUNING'
                    : currentStage === 4
                    ? '📊 THE GUṆA TRIAD · EQUILIBRIUM ACHIEVED'
                    : '📊 THE GUṆA TRIAD (त्रिगुणात्मक-पर्यावरणम्)'}
                </span>
              </h3>
              <div className="vl-triad-sub">
                {currentStage === 3
                  ? '🎯 Step 3 Active: Tune all 3 sliders into the illuminated Synergy Window (45% – 65%) to unlock Step 4!'
                  : currentStage === 4
                  ? '✨ Guṇa-Sāmyam Complete: Thermodynamic equilibrium maintained within the Tryaṇuka bonds.'
                  : `Current baseline properties: High Sneha (${sneha}%), Low Dravatva (${dravatva}%), Low Uṣṇa (${usna}%). Complete Steps 1 & 2 above before manual tuning.`}
              </div>
            </div>
            <div className={`vl-synergy-badge${isSynergyLocked ? ' is-locked' : ''}`}>
              {currentStage === 3
                ? isSynergyLocked
                  ? '✨ SYNERGY LOCKED (Click Step 4 Above!)'
                  : '⚡ TUNE SLIDERS INTO 45%–65%'
                : currentStage === 4
                ? '✨ EQUILIBRIUM ACHIEVED'
                : '🔒 ACTIVE IN STEP 3'}
            </div>
          </div>

          <div className="vl-triad-sliders-grid">
            {/* Slider 1: Sneha (Cohesion / Polarity) */}
            <div className="vl-triad-slider-row">
              <div className="vl-ts-label-wrap">
                <span className="vl-ts-dev" lang="sa">स्नेह</span>
                <span className="vl-ts-iast">Sneha</span>
                <span className="vl-ts-en">(Cohesion / Viscidity)</span>
                <button
                  type="button"
                  className="vl-word-pronounce-btn"
                  onClick={() => playPronunciation('स्नेह')}
                  style={{ fontSize: '0.72rem', padding: '0.1rem 0.4rem', marginLeft: 'auto' }}
                >
                  🔊
                </button>
              </div>
              <div className="vl-slider-track-wrap">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sneha}
                  onChange={(e) => handleSliderChange('sneha', Number(e.target.value))}
                  className="vl-guna-range vl-guna-range--sneha"
                />
                <div className="vl-synergy-target-zone" style={{ left: '45%', width: '20%' }} />
              </div>
              <div className="vl-ts-val-wrap">
                <span className="vl-ts-val">{sneha}%</span>
                <span className="vl-ts-note">
                  {sneha > 70 ? 'High Rigidity / Clumping' : sneha < 30 ? 'Low Cohesion' : 'Receptive Cohesion'}
                </span>
              </div>
            </div>

            {/* Slider 2: Dravatva (Fluidity / Mobility) */}
            <div className="vl-triad-slider-row">
              <div className="vl-ts-label-wrap">
                <span className="vl-ts-dev" lang="sa">द्रवत्व</span>
                <span className="vl-ts-iast">Dravatva</span>
                <span className="vl-ts-en">(Fluidity / Mobility)</span>
                <button
                  type="button"
                  className="vl-word-pronounce-btn"
                  onClick={() => playPronunciation('द्रवत्व')}
                  style={{ fontSize: '0.72rem', padding: '0.1rem 0.4rem', marginLeft: 'auto' }}
                >
                  🔊
                </button>
              </div>
              <div className="vl-slider-track-wrap">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={dravatva}
                  onChange={(e) => handleSliderChange('dravatva', Number(e.target.value))}
                  className="vl-guna-range vl-guna-range--dravatva"
                />
                <div className="vl-synergy-target-zone" style={{ left: '45%', width: '20%' }} />
              </div>
              <div className="vl-ts-val-wrap">
                <span className="vl-ts-val">{dravatva}%</span>
                <span className="vl-ts-note">
                  {dravatva < 30 ? 'Static Resistance' : dravatva > 75 ? 'Hyper-Flow' : 'Equilibrium Glide'}
                </span>
              </div>
            </div>

            {/* Slider 3: Uṣṇa (Kinetic Heat / Transformation) */}
            <div className="vl-triad-slider-row">
              <div className="vl-ts-label-wrap">
                <span className="vl-ts-dev" lang="sa">उष्ण</span>
                <span className="vl-ts-iast">Uṣṇa (Tejas)</span>
                <span className="vl-ts-en">(Kinetic Heat)</span>
                <button
                  type="button"
                  className="vl-word-pronounce-btn"
                  onClick={() => playPronunciation('उष्ण')}
                  style={{ fontSize: '0.72rem', padding: '0.1rem 0.4rem', marginLeft: 'auto' }}
                >
                  🔊
                </button>
              </div>
              <div className="vl-slider-track-wrap">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={usna}
                  onChange={(e) => handleSliderChange('usna', Number(e.target.value))}
                  className="vl-guna-range vl-guna-range--usna"
                />
                <div className="vl-synergy-target-zone" style={{ left: '45%', width: '20%' }} />
              </div>
              <div className="vl-ts-val-wrap">
                <span className="vl-ts-val">{usna}%</span>
                <span className="vl-ts-note">
                  {usna < 25 ? 'Cold Lock' : usna > 80 ? 'Kinetic Chaos' : 'Catalytic Thermal Balance'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Sage Kaṇāda Companion Commentary HUD */}
        <aside className="vl-matrix-guru-hud" role="region" aria-label="Kaṇāda's Real-time Commentary">
          <div className="vl-dialogue-avatar-wrap">
            <div className="vl-dialogue-avatar is-speaking">
              {guruSpeaker === 'Kaṇāda' ? '🧘‍♂️' : '⚠️'}
            </div>
          </div>
          <div className="vl-dialogue-content">
            <div className="vl-dialogue-header">
              <div className="vl-dialogue-speaker">
                <span>{guruSpeaker === 'Kaṇāda' ? 'महर्षि-कणाद उवाच · SAGE KAṆĀDA' : 'ENGINE DIAGNOSTIC'}</span>
              </div>
              <span className="vl-hud-pill">REALITY CALIBRATION</span>
            </div>
            <p className="vl-dialogue-text" style={{ fontStyle: guruSpeaker === 'Kaṇāda' ? 'italic' : 'normal' }}>
              {guruDialogue}
            </p>
          </div>
        </aside>
      </div>

      {/* 5. Victory Modal: State Transcended */}
      {showVictoryModal && (
        <div className="vl-victory-modal-backdrop" role="dialog" aria-modal="true">
          <div className="vl-victory-modal-box" style={{ maxWidth: '560px' }}>
            <div className="vl-victory-badge-icon">✨</div>
            <h3 className="vl-victory-title">STATE TRANSCENDED · अवस्था-भ्रम-मुक्तिः</h3>
            <div className="vl-victory-subtitle">Matter is Not a Rigid State, but Dynamic Guṇa Combinations</div>

            <div className="vl-victory-desc">
              <p style={{ margin: '0 0 0.65rem', lineHeight: 1.6 }}>
                <strong>&ldquo;Superficial forms have faded. What we call Samavāya—the inseparable relationship between a whole and its parts—modern science observes as the transition from a mere physical mixture to an intrinsic chemical compound.&rdquo;</strong>
              </p>
              <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '0.75rem 1rem', borderRadius: '10px', borderLeft: '3px solid #facc15', fontSize: '0.84rem', color: '#cbd5e1' }}>
                <p style={{ margin: '0 0 0.5rem', color: '#fde047', fontWeight: 800 }}>
                  🔬 Kaṇāda&rsquo;s Vaiśeṣika Framework ⇄ Modern Chemical Observations:
                </p>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                  <li><strong>संयोग (Saṁyoga) ⇄ Mechanical Mixtures:</strong> Distinct phases (oil &amp; water) held by temporary interfacial tension.</li>
                  <li><strong>पाकज-परमाणु (Pākaja-Paramāṇu) ⇄ Activation Energy:</strong> Thermal kinetic energy breaking intermolecular bonds into reactive states.</li>
                  <li><strong>गुण-साम्य (Guṇa-Sāmya) ⇄ Thermodynamic Equilibrium:</strong> Balancing entropy, temperature, and fluidity until phases can transition.</li>
                  <li><strong>समवाय (Samavāya) ⇄ Chemical Bonding:</strong> Strong, localized bonds forming an entirely new unified substance.</li>
                </ul>
              </div>
            </div>

            <div className="vl-victory-btn-group">
              <button
                type="button"
                className="vl-btn vl-btn--cyber"
                onClick={() => setShowVictoryModal(false)}
              >
                🎮 Continue Free Guṇa Experimentation
              </button>
              <button
                type="button"
                className="vl-btn vl-btn--cyber-ghost"
                onClick={handleResetMatrix}
              >
                🔄 Replay 4-Stage Challenge
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
