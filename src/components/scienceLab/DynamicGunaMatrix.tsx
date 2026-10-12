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

  // 4-Stage Progressive Missions (Strict 1 -> 2 -> 3 -> 4 Sequence)
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4>(1);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState<1 | 2 | 3 | 4>(1);
  const [stage1Done, setStage1Done] = useState(false);
  const [stage2Done, setStage2Done] = useState(false);
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

  // Helper to initialize stratified particles (28 Oil on top, 28 Water on bottom = 56 total)
  const initParticles = () => {
    const list: MatrixParticle[] = [];
    // Upper Layer: Oil / Taila (golden amber)
    for (let i = 0; i < 28; i++) {
      list.push({
        x: 210 + Math.random() * 180,
        y: 105 + Math.random() * 58,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: 4.5 + Math.random() * 1.8,
        cluster: 'earth', // Taila / Non-Polar
        color: '#f59e0b',
      });
    }
    // Lower Layer: Water / Ap (cyan)
    for (let i = 0; i < 28; i++) {
      list.push({
        x: 220 + Math.random() * 160,
        y: 190 + Math.random() * 65,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: 4.5 + Math.random() * 1.8,
        cluster: 'water', // Ap / Polar Viscidity
        color: '#38bdf8',
      });
    }
    particlesRef.current = list;
  };

  useEffect(() => {
    initParticles();
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

      const time = Date.now() * 0.003;

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

        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⚛️ SAMAVĀYA (समवाय) INHERENCE ESTABLISHED', cx, 42);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '9.5px JetBrains Mono, monospace';
        ctx.fillText('Cyan (Ap) & Amber (Taila) inseparably bound at 45%–65% Guṇa Equilibrium!', cx, 58);
        ctx.textAlign = 'start';

        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // =====================================================================
      // STAGES 1 & 2: CLEAR LABORATORY CRUCIBLE / BOWL WITH TWO LAYERS
      // =====================================================================
      if (currentStage === 1 || currentStage === 2) {
        // 1. Bowl Background Liquid Washes (Stratified Phases)
        // Upper Oil Layer Wash (amber)
        ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
        ctx.beginPath();
        ctx.moveTo(165, 75);
        ctx.quadraticCurveTo(175, 125, 190, 175);
        ctx.lineTo(410, 175);
        ctx.quadraticCurveTo(425, 125, 435, 75);
        ctx.closePath();
        ctx.fill();

        // Lower Water Layer Wash (cyan)
        ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.beginPath();
        ctx.moveTo(190, 175);
        ctx.quadraticCurveTo(200, 225, 215, 275);
        ctx.quadraticCurveTo(300, 283, 385, 275);
        ctx.quadraticCurveTo(400, 225, 410, 175);
        ctx.closePath();
        ctx.fill();

        // 2. Clear Glass Bowl Outline & Specular Glare
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(165, 75);
        ctx.quadraticCurveTo(175, 175, 215, 275);
        ctx.quadraticCurveTo(300, 283, 385, 275);
        ctx.quadraticCurveTo(425, 175, 435, 75);
        ctx.stroke();

        // Glass Rim Top Ellipse
        ctx.beginPath();
        ctx.ellipse(300, 75, 135, 12, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(203, 213, 225, 0.5)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Specular highlight on left curved wall
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(175, 95);
        ctx.quadraticCurveTo(182, 175, 222, 265);
        ctx.stroke();

        // Tripod Stand underneath the bowl
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.6)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(300, 280, 90, 10, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(71, 85, 105, 0.65)';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(212, 282);
        ctx.lineTo(192, 345);
        ctx.moveTo(388, 282);
        ctx.lineTo(408, 345);
        ctx.moveTo(300, 288);
        ctx.lineTo(300, 345);
        ctx.stroke();

        // Phase Labels on Left Edge
        ctx.fillStyle = '#f59e0b';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText('🛢️ तैल (Taila / Oil Phase)', 35, 130);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.font = '8.5px JetBrains Mono, monospace';
        ctx.fillText('Non-Polar · Low Density', 35, 144);

        ctx.fillStyle = '#38bdf8';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText('💧 अप् (Ap / Water Phase)', 35, 225);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.font = '8.5px JetBrains Mono, monospace';
        ctx.fillText('Polar Viscidity · High Sneha', 35, 239);

        // ===================================================================
        // STAGE 1: IMMISCIBLE MENISCUS & REPULSION GRAPHIC (NO RED RING)
        // ===================================================================
        if (currentStage === 1) {
          if (!repulsionTriggered) {
            // Calm, crisp meniscus line
            ctx.beginPath();
            ctx.moveTo(190, 175);
            ctx.quadraticCurveTo(300, 178, 410, 175);
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([5, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = 'rgba(148, 163, 184, 0.75)';
            ctx.font = '9px JetBrains Mono, monospace';
            ctx.fillText('Meniscus Barrier (अन्तरपृष्ठ)', 422, 178);
          } else {
            // Repulsion Triggered: Dynamic Interfacial Tension Wave
            ctx.beginPath();
            for (let x = 190; x <= 410; x += 4) {
              const waveY = 175 + Math.sin((x - 190) * 0.12 + time * 10) * 3.5;
              x === 190 ? ctx.moveTo(x, waveY) : ctx.lineTo(x, waveY);
            }
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2.5;
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 8;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Opposing Kinetic Deflection Vectors (Arrow indicators showing mutual deflection)
            const arrowXCoords = [235, 280, 320, 365];
            arrowXCoords.forEach((ax) => {
              // Amber Upward Arrow (Oil deflected upward)
              ctx.strokeStyle = '#fbbf24';
              ctx.fillStyle = '#fbbf24';
              ctx.lineWidth = 1.8;
              ctx.beginPath();
              ctx.moveTo(ax, 167);
              ctx.lineTo(ax, 153);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(ax - 3.5, 160);
              ctx.lineTo(ax, 151);
              ctx.lineTo(ax + 3.5, 160);
              ctx.stroke();

              // Cyan Downward Arrow (Water deflected downward)
              ctx.strokeStyle = '#38bdf8';
              ctx.fillStyle = '#38bdf8';
              ctx.lineWidth = 1.8;
              ctx.beginPath();
              ctx.moveTo(ax, 183);
              ctx.lineTo(ax, 197);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(ax - 3.5, 190);
              ctx.lineTo(ax, 199);
              ctx.lineTo(ax + 3.5, 190);
              ctx.stroke();

              // Deflection contact sparks
              ctx.fillStyle = '#fef08a';
              ctx.beginPath();
              ctx.arc(ax, 175, 1.8, 0, Math.PI * 2);
              ctx.fill();
            });

            // Diagnostic HUD Banner on Interface
            ctx.fillStyle = '#fca5a5';
            ctx.font = '9.5px JetBrains Mono, monospace';
            ctx.fillText('⚡ INTERFACIAL REPULSION: SNEHA POLARITY BARRIER', 170, 52);
          }
        }

        // ===================================================================
        // STAGE 2: VEDIC AGNI / THERMAL FIRE UNDER BOWL (BREAK THE STATE MASK)
        // ===================================================================
        if (currentStage === 2) {
          // 1. Burner Base Plate
          ctx.fillStyle = '#334155';
          ctx.fillRect(235, 334, 130, 6);

          // 2. Animated Flame Tongues Licking Bottom of Vessel
          for (let f = 0; f < 11; f++) {
            const fx = 245 + f * 11;
            const flameH = 26 + Math.sin(time * 6 + f * 1.5) * 8 + Math.cos(time * 9 + f * 0.7) * 4;
            const tipY = 334 - flameH;
            const grad = ctx.createLinearGradient(fx, 334, fx, tipY);
            grad.addColorStop(0, '#dc2626');
            grad.addColorStop(0.35, '#ea580c');
            grad.addColorStop(0.7, '#f97316');
            grad.addColorStop(1, '#fef08a');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(fx - 6, 334);
            ctx.quadraticCurveTo(fx - 4, (334 + tipY) / 2, fx, tipY);
            ctx.quadraticCurveTo(fx + 4, (334 + tipY) / 2, fx + 6, 334);
            ctx.closePath();
            ctx.fill();
          }

          // 3. Thermal Glow Bathing Vessel Base
          const fireGlow = ctx.createRadialGradient(300, 290, 8, 300, 290, 75);
          fireGlow.addColorStop(0, 'rgba(234, 88, 12, 0.4)');
          fireGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = fireGlow;
          ctx.beginPath();
          ctx.arc(300, 290, 75, 0, Math.PI * 2);
          ctx.fill();

          // 4. Rising Thermal Embers around Bowl
          for (let e = 0; e < 8; e++) {
            const ey = 325 - ((time * 38 + e * 32) % 170);
            const ex = 300 + Math.sin(ey * 0.05 + e * 2) * (50 + e * 8);
            ctx.fillStyle = e % 2 === 0 ? '#facc15' : '#f97316';
            ctx.beginPath();
            ctx.arc(ex, ey, 2, 0, Math.PI * 2);
            ctx.fill();
          }

          // 5. Softened, Wavering Meniscus Boundary (Pīlupāka Disruption)
          ctx.beginPath();
          for (let x = 190; x <= 410; x += 5) {
            const waveY = 175 + Math.sin((x - 190) * 0.06 + time * 3) * 5;
            x === 190 ? ctx.moveTo(x, waveY) : ctx.lineTo(x, waveY);
          }
          ctx.strokeStyle = '#fb923c';
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Informative Fire & Pīlupāka Labels
          ctx.fillStyle = '#fdba74';
          ctx.font = '9.5px JetBrains Mono, monospace';
          ctx.fillText('🔥 तेजस् (TEJAS AGNI) · PĪLUPĀKA THERMAL DISSOCIATION', 160, 364);

          ctx.fillStyle = '#fb923c';
          ctx.font = '8.5px JetBrains Mono, monospace';
          ctx.fillText('〰️ Boundary Softened (State Mask Breaking)', 422, 178);
        }
      }

      // =====================================================================
      // STAGE 3: COSMIC VĀYU WIND STREAMLINES (DYNAMIC PROPERTY SOUP)
      // =====================================================================
      if (currentStage === 3) {
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.22)';
        ctx.lineWidth = 1.5;
        for (let w = 0; w < 4; w++) {
          const wy = 80 + w * 70;
          ctx.beginPath();
          for (let x = 0; x <= canvas.width; x += 20) {
            const y = wy + Math.sin(x * 0.03 + time * 4 + w) * 12;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        ctx.fillStyle = '#6ee7b7';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText('💨 वायोः संप्लवः (VĀYU WIND SWEEP) · DYNAMIC PROPERTY SOUP', 140, 36);

        // Live In-Canvas Guṇa-Sāmya Target HUD Box (45%–65% Window)
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = isSynergyLocked ? '#10b981' : 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(canvas.width - 245, 12, 230, 96, 8);
        } else {
          ctx.rect(canvas.width - 245, 12, 230, 96);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isSynergyLocked ? '#34d399' : '#38bdf8';
        ctx.font = 'bold 9.5px JetBrains Mono, monospace';
        ctx.fillText('🎯 GUṆA-SĀMYAM (45%–65% TARGET)', canvas.width - 235, 28);

        const sOk = sneha >= 45 && sneha <= 65;
        const dOk = dravatva >= 45 && dravatva <= 65;
        const uOk = usna >= 45 && usna <= 65;

        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillStyle = sOk ? '#4ade80' : '#f87171';
        ctx.fillText(`Sneha: ${sneha}% ${sOk ? '✅ [Balanced]' : sneha < 45 ? '▲ Need ≥45%' : '▼ Need ≤65%'}`, canvas.width - 235, 46);

        ctx.fillStyle = dOk ? '#4ade80' : '#f87171';
        ctx.fillText(`Dravatva: ${dravatva}% ${dOk ? '✅ [Balanced]' : dravatva < 45 ? '▲ Need ≥45%' : '▼ Need ≤65%'}`, canvas.width - 235, 64);

        ctx.fillStyle = uOk ? '#4ade80' : '#f87171';
        ctx.fillText(`Uṣṇa: ${usna}% ${uOk ? '✅ [Balanced]' : usna < 45 ? '▲ Need ≥45%' : '▼ Need ≤65%'}`, canvas.width - 235, 82);

        ctx.fillStyle = isSynergyLocked ? '#facc15' : '#94a3b8';
        ctx.font = 'bold 9px JetBrains Mono, monospace';
        ctx.fillText(isSynergyLocked ? '✨ 3/3 Sāmyam! Click Step 4' : 'Balance all 3 into 45%–65% to bind', canvas.width - 235, 98);
      }

      // =====================================================================
      // PARTICLE PHYSICS & SIMULATION
      // =====================================================================
      const particles = particlesRef.current;
      const speedMultiplier = 0.3 + (dravatva / 100) * 2.2 + (usna / 100) * 1.5;
      const cohesionForce = (sneha / 100) * 0.05;

      const oilTargetY = 130;
      const waterTargetY = 225;

      particles.forEach((p) => {
        if (currentStage === 1) {
          // STAGE 1: Contained in stratified layers within the clear bowl
          if (repulsionTriggered) {
            // Attempting merge: pushed toward the meniscus (y = 175)
            if (p.cluster === 'earth') {
              p.vy += 0.45;
              p.vx += (300 - p.x) * 0.01 + (Math.random() - 0.5) * 0.35;
              // Repulsive deflection at meniscus
              if (p.y >= 168) {
                p.y = 166;
                p.vy = -Math.abs(p.vy) * 1.5 - 1.0;
                p.vx += (Math.random() - 0.5) * 1.8;
              }
            } else {
              p.vy -= 0.45;
              p.vx += (300 - p.x) * 0.01 + (Math.random() - 0.5) * 0.35;
              // Repulsive deflection at meniscus
              if (p.y <= 182) {
                p.y = 184;
                p.vy = Math.abs(p.vy) * 1.5 + 1.0;
                p.vx += (Math.random() - 0.5) * 1.8;
              }
            }
          } else {
            // Calm circulation within respective layers
            const targetY = p.cluster === 'earth' ? oilTargetY : waterTargetY;
            p.vx += (300 - p.x) * (cohesionForce * 0.3) + (Math.random() - 0.5) * 0.3;
            p.vy += (targetY - p.y) * (cohesionForce * 0.5) + (Math.random() - 0.5) * 0.3;

            // Strict boundary containment at meniscus
            if (p.cluster === 'earth' && p.y > 170) {
              p.y = 170;
              p.vy = -Math.abs(p.vy);
            }
            if (p.cluster === 'water' && p.y < 180) {
              p.y = 180;
              p.vy = Math.abs(p.vy);
            }
          }

          // Bowl wall boundaries
          if (p.cluster === 'earth') {
            if (p.y < 85) { p.y = 85; p.vy = Math.abs(p.vy); }
            if (p.x < 185) { p.x = 185; p.vx = Math.abs(p.vx); }
            if (p.x > 415) { p.x = 415; p.vx = -Math.abs(p.vx); }
          } else {
            if (p.y > 268) { p.y = 268; p.vy = -Math.abs(p.vy); }
            if (p.x < 205) { p.x = 205; p.vx = Math.abs(p.vx); }
            if (p.x > 395) { p.x = 395; p.vx = -Math.abs(p.vx); }
          }
        } else if (currentStage === 2) {
          // STAGE 2: Tejas Heating / Bowl on Fire
          // High kinetic energy - boundary softens and becomes permeable!
          p.vx += (300 - p.x) * 0.008 + (Math.random() - 0.5) * 1.4;
          p.vy += (Math.random() - 0.5) * 1.4;

          // Atoms freely circulate throughout the whole bowl across the softened boundary
          if (p.y > 270) { p.y = 270; p.vy = -Math.abs(p.vy) * 1.2; }
          if (p.y < 82) { p.y = 82; p.vy = Math.abs(p.vy) * 1.2; }
          if (p.x < 180) { p.x = 180; p.vx = Math.abs(p.vx); }
          if (p.x > 420) { p.x = 420; p.vx = -Math.abs(p.vx); }
        } else {
          // STAGES 3 & 4: Vāyu wind and universal property soup
          p.vx += 0.25 + (Math.random() - 0.5) * 0.7;
          p.vy += (Math.random() - 0.5) * 0.7;

          if (currentStage === 4) {
            p.vx += (300 - p.x) * 0.04;
            p.vy += (190 - p.y) * 0.04;
          }

          // Full canvas bounds
          if (p.x < 20) { p.x = 20; p.vx = Math.abs(p.vx); }
          if (p.x > canvas.width - 20) { p.x = canvas.width - 20; p.vx = -Math.abs(p.vx); }
          if (p.y < 20) { p.y = 20; p.vy = Math.abs(p.vy); }
          if (p.y > canvas.height - 20) { p.y = canvas.height - 20; p.vy = -Math.abs(p.vy); }
        }

        // Apply velocity with damping
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;
        p.vx *= 0.93;
        p.vy *= 0.93;

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = usna > 40 ? 8 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Connecting molecular threads if cohesion is active in fluid soup
      if ((currentStage >= 3 || currentStage === 2) && sneha > 35) {
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.22)';
        for (let i = 0; i < particles.length; i += 3) {
          for (let j = i + 1; j < particles.length; j += 4) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 42) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
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
    setCurrentStage(1);
    setRepulsionTriggered(true);
    setStage1Done(true);
    setMaxUnlockedStage((prev) => Math.max(prev, 2) as 1 | 2 | 3 | 4);
    gunaAudio.playRepulsionFriction();

    // Reset baseline properties if returning from later stage
    setSneha(85);
    setDravatva(20);
    setUsna(15);
    setIsSynergyLocked(false);
    initParticles();

    setGuruSpeaker('System');
    setGuruDialogue(
      '⚠️ Incompatible Guṇa Rejection — Structural Friction High (Polarity & Sneha Mismatch). Particles sliding apart like oil and water!'
    );

    setTimeout(() => {
      setGuruSpeaker('Kaṇāda');
      setGuruDialogue(
        "“Notice the violent deflection at the meniscus boundary! Water and oil stubbornly repel due to incompatible Sneha (cohesive viscidity). Step 1 complete. Now click '2. Inject Tejas' to heat the crucible and soften the interfacial mask!”"
      );
    }, 1200);
  };

  // =========================================================================
  // STAGE 2: INJECT TEJAS CATALYST (BREAKING THE STATE MASK)
  // =========================================================================
  const handleInjectTejas = () => {
    setStage1Done(true);
    setCurrentStage(2);
    setRepulsionTriggered(false);
    setStage2Done(true);
    setMaxUnlockedStage((prev) => Math.max(prev, 3) as 1 | 2 | 3 | 4);

    gunaAudio.playHeatCrackle();

    // Heat softens the boundary, but matter is not yet in equilibrium
    setUsna(50);
    setSneha(70);
    setDravatva(25);
    setIsSynergyLocked(false);
    initParticles();

    setGuruSpeaker('Kaṇāda');
    setGuruDialogue(
      '“Active Vedic Agni ignites under the crucible! Heat (Tejas) disrupts existing conjunctions (Pīlupāka) and wavers the boundary. Step 2 complete. Now click \'3. Sweep Vāyu\' to dissolve matter into free Paramāṇus and tune the Guṇa Triad!”'
    );
  };

  // =========================================================================
  // STAGE 3: INTRODUCE VĀYU WINDS (DYNAMIC PROPERTY SOUP)
  // =========================================================================
  const handleSweepVayu = () => {
    setStage1Done(true);
    setStage2Done(true);
    setCurrentStage(3);
    setRepulsionTriggered(false);
    setMaxUnlockedStage((prev) => Math.max(prev, 3) as 1 | 2 | 3 | 4);
    gunaAudio.playWindWhoosh();

    // Initialize the soup outside the 45%-65% target so the user actively tunes!
    setSneha(75); // High cohesion: clumping
    setDravatva(30); // Low fluidity: stiff resistance
    setUsna(35); // Low heat: cold lock
    setIsSynergyLocked(false);

    setGuruSpeaker('Kaṇāda');
    setGuruDialogue(
      '“Vāyu sweeps matter into 56 free Paramāṇus! But they are in disequilibrium. 🎯 MISSION: Tune all 3 sliders into the 45%–65% Synergy Window (गुण-साम्यम्) or click \'⚡ Auto-Tune Guṇa-Sāmya\'. Once balanced, Samavāya can bind!”'
    );
  };

  // Auto-tune all 3 Guṇas to 50% (Guṇa-Sāmya equilibrium)
  const handleAutoTuneSamya = () => {
    setStage1Done(true);
    setStage2Done(true);
    setCurrentStage(3);
    setRepulsionTriggered(false);
    setMaxUnlockedStage(4);
    setSneha(50);
    setDravatva(50);
    setUsna(50);
    setIsSynergyLocked(true);
    gunaAudio.playTone(523.25, 0.25);
    gunaAudio.playSynergyLock();
    setGuruSpeaker('Kaṇāda');
    setGuruDialogue(
      '“✨ Guṇa-Sāmyam (गुण-साम्यम्) Achieved! All 3 qualities are perfectly harmonized at 50% Equilibrium. The structural barrier is dissolved—click \'4. BIND SAMAVĀYA\' to forge the Tryaṇuka compound!”'
    );
  };

  // Manual Slider Adjustments with real-time synergy evaluation
  const handleSliderChange = (type: 'sneha' | 'dravatva' | 'usna', val: number) => {
    if (currentStage < 3) {
      setCurrentStage(3);
      setStage1Done(true);
      setStage2Done(true);
      setMaxUnlockedStage(3);
    }

    let s = type === 'sneha' ? val : sneha;
    let d = type === 'dravatva' ? val : dravatva;
    let u = type === 'usna' ? val : usna;

    if (type === 'sneha') setSneha(val);
    if (type === 'dravatva') setDravatva(val);
    if (type === 'usna') setUsna(val);

    const locked = checkSynergy(s, d, u);
    setIsSynergyLocked(locked);

    if (locked) {
      setMaxUnlockedStage(4);
      gunaAudio.playTone(523.25, 0.25);
      gunaAudio.playSynergyLock();
      setGuruSpeaker('Kaṇāda');
      setGuruDialogue(
        '“✨ Guṇa-Sāmyam (गुण-साम्यम्) Achieved! All 3 qualities are locked in the 45%–65% Equilibrium Window. The structural barrier is gone—click \'4. BIND SAMAVĀYA\' to forge the Tryaṇuka compound!”'
      );
    } else if (u > 85) {
      setGuruSpeaker('System');
      setGuruDialogue('⚠️ Overheated (>85%)! Thermal agitation too high — atoms scattering uncontrollably!');
    } else if (u < 25) {
      setGuruSpeaker('System');
      setGuruDialogue('⚠️ Too cold (<25%)! Cohesion rigidified into unmixable phase separation.');
    }
  };

  // =========================================================================
  // STAGE 4: THE SAMAVĀYA BINDING (STATE TRANSCENDED)
  // =========================================================================
  const handleSamavayaBinding = () => {
    setStage1Done(true);
    setStage2Done(true);
    if (!isSynergyLocked) {
      setSneha(50);
      setDravatva(50);
      setUsna(50);
      setIsSynergyLocked(true);
    }
    setMaxUnlockedStage(4);
    gunaAudio.playSamavayaImplosion();
    setCurrentStage(4);

    setGuruSpeaker('Kaṇāda');
    setGuruDialogue(
      '“Superficial forms have faded! By tuning the invisible threads of reality into the 45%–65% equilibrium, you have forged true Inherence (Samavāya). The Tryaṇukas dance in eternal space!”'
    );

    setTimeout(() => {
      setShowVictoryModal(true);
    }, 1200);
  };

  // Reset to Stage 1
  const handleResetMatrix = () => {
    setCurrentStage(1);
    setMaxUnlockedStage(1);
    setStage1Done(false);
    setStage2Done(false);
    setSneha(85);
    setDravatva(20);
    setUsna(15);
    setRepulsionTriggered(false);
    setIsSynergyLocked(false);
    setShowVictoryModal(false);
    initParticles();
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
              <span className="vl-step-indicator">STAGE {currentStage}/4 · PROGRESS: {maxUnlockedStage}/4</span>{' '}
              <strong>
                {currentStage === 1 && 'The Illusion of Separation (Oil & Water)'}
                {currentStage === 2 && 'Break the State Mask (Injecting Thermal Tejas)'}
                {currentStage === 3 && 'Dynamic Property Soup (Sweeping Vāyu)'}
                {currentStage === 4 && 'Samavāya Inherence Achieved (Trasareṇu Created)'}
              </strong>
            </div>
          </div>

          {/* Visual 4-Step Interactive Pipeline Header */}
          <div className="vl-matrix-stepper-track" role="navigation" aria-label="4-Step Progression Towards Samavāya">
            <button
              type="button"
              className={`vl-stepper-step ${currentStage === 1 ? 'is-current' : stage1Done ? 'is-passed' : 'is-ready'}`}
              onClick={handleAttemptMerge}
              title="Click to activate Step 1: The Oil & Water Dilemma"
            >
              <span className="vl-stepper-num">{stage1Done ? '✓' : '1'}</span>
              <span className="vl-stepper-label">1. Oil &amp; Water Dilemma</span>
            </button>
            <span className="vl-stepper-arrow" aria-hidden="true">➔</span>
            <button
              type="button"
              className={`vl-stepper-step ${
                currentStage === 2
                  ? 'is-current'
                  : stage2Done
                  ? 'is-passed'
                  : 'is-ready'
              }`}
              onClick={handleInjectTejas}
              title="Click to activate Step 2: Inject Tejas (Break State Mask)"
            >
              <span className="vl-stepper-num">{stage2Done ? '✓' : '2'}</span>
              <span className="vl-stepper-label">2. Inject Tejas</span>
            </button>
            <span className="vl-stepper-arrow" aria-hidden="true">➔</span>
            <button
              type="button"
              className={`vl-stepper-step ${
                currentStage === 3
                  ? 'is-current'
                  : isSynergyLocked
                  ? 'is-passed'
                  : 'is-ready'
              }`}
              onClick={handleSweepVayu}
              title="Click to activate Step 3: Sweep Vāyu (Dynamic Property Soup)"
            >
              <span className="vl-stepper-num">{isSynergyLocked ? '✓' : '3'}</span>
              <span className="vl-stepper-label">3. Sweep Vāyu</span>
            </button>
            <span className="vl-stepper-arrow" aria-hidden="true">➔</span>
            <button
              type="button"
              className={`vl-stepper-step ${
                currentStage === 4
                  ? 'is-current'
                  : isSynergyLocked
                  ? 'is-ready'
                  : 'is-ready'
              }`}
              onClick={handleSamavayaBinding}
              title="Click to activate Step 4: Bind Samavāya in Ākāśa"
            >
              <span className="vl-stepper-num">{currentStage === 4 ? '✨' : '4'}</span>
              <span className="vl-stepper-label">4. Bind Samavāya</span>
            </button>
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
                ⚡ IMMISCIBLE INTERFACE: SNEHA POLARITY REPULSION (OIL &amp; WATER DEFLECT)
              </div>
            )}
            {currentStage === 2 && (
              <div className="vl-stage-clash-toast" style={{ borderColor: '#f97316', color: '#fdba74' }}>
                🔥 THERMAL PĪLUPĀKA ACTIVE: TEJAS SOFTENS BOUNDARY · ATOMS AGITATING
              </div>
            )}
          </div>

          {/* Sequential Next-Step Guidance Banner */}
          <div className="vl-matrix-next-banner" style={{
            margin: '0.65rem 0',
            padding: '0.6rem 0.95rem',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.6rem',
            fontSize: '0.84rem'
          }}>
            <div>
              {currentStage === 1 && (
                <span>
                  📍 <strong>Step 1 Active:</strong> Meniscus friction causes deflection. Click next to ignite Agni:
                </span>
              )}
              {currentStage === 2 && (
                <span>
                  📍 <strong>Step 2 Active:</strong> Agni softened interfacial tension (Pīlupāka). Click next to sweep Vāyu:
                </span>
              )}
              {currentStage === 3 && (
                <span>
                  📍 <strong>Step 3 Active:</strong> 56 Paramāṇus liberated into soup. {isSynergyLocked ? '✨ Guṇa-Sāmyam locked! Ready to bind:' : 'Tune sliders to 45%–65% (or 1-click auto-balance):'}
                </span>
              )}
              {currentStage === 4 && (
                <span>
                  🎉 <strong>Step 4 Complete:</strong> Samavāya Inherence established! Tryaṇuka compounds forged.
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {currentStage === 1 && (
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber is-pulsing"
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                  onClick={handleInjectTejas}
                >
                  Proceed to Step 2: Inject Tejas ➔
                </button>
              )}
              {currentStage === 2 && (
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber is-pulsing"
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                  onClick={handleSweepVayu}
                >
                  Proceed to Step 3: Sweep Vāyu ➔
                </button>
              )}
              {currentStage === 3 && !isSynergyLocked && (
                <>
                  <button
                    type="button"
                    className="vl-btn vl-btn--secondary"
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', borderColor: '#10b981', color: '#86efac' }}
                    onClick={handleAutoTuneSamya}
                  >
                    ⚡ Auto-Tune (50%)
                  </button>
                  <button
                    type="button"
                    className="vl-btn vl-btn--gold is-pulsing"
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                    onClick={handleSamavayaBinding}
                  >
                    ✨ Balance &amp; Bind Samavāya ➔
                  </button>
                </>
              )}
              {currentStage === 3 && isSynergyLocked && (
                <button
                  type="button"
                  className="vl-btn vl-btn--gold is-pulsing"
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                  onClick={handleSamavayaBinding}
                >
                  ✨ Proceed to Step 4: Bind Samavāya ➔
                </button>
              )}
              {currentStage === 4 && (
                <button
                  type="button"
                  className="vl-btn vl-btn--secondary"
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                  onClick={handleResetMatrix}
                >
                  🔄 Reset Crucible
                </button>
              )}
            </div>
          </div>

          {/* Action Toolbar to Drive the 4-Stage Sequence */}
          <div className="vl-matrix-action-toolbar">
            {/* Step 1 */}
            <button
              type="button"
              className={`vl-btn vl-btn--cyber ${
                currentStage === 1
                  ? !stage1Done
                    ? 'is-active is-pulsing'
                    : 'is-active is-completed'
                  : 'is-completed'
              }`}
              onClick={handleAttemptMerge}
              title="Step 1: Attempt to mix the two unmixable clusters in the bowl"
            >
              {currentStage === 1
                ? !stage1Done
                  ? '👉 1. Attempt Merge (The Oil & Water Dilemma)'
                  : '✓ 1. Merge Attempted (Friction Observed)'
                : '✓ 1. Attempt Merge (Oil & Water)'}
            </button>

            {/* Step 2 */}
            <button
              type="button"
              className={`vl-btn vl-btn--cyber ${
                currentStage === 2
                  ? 'is-active is-pulsing'
                  : stage2Done
                  ? 'is-completed'
                  : 'is-pulsing'
              }`}
              onClick={handleInjectTejas}
              title="Step 2: Inject heat to break rigid boundaries with Vedic Agni"
            >
              {currentStage === 2
                ? '🔥 2. Tejas Active (Boundary Softened)'
                : stage2Done
                ? '✓ 2. Tejas Injected (Boundary Softened)'
                : '👉 2. Inject Tejas (Break the State Mask)'}
            </button>

            {/* Step 3 */}
            <button
              type="button"
              className={`vl-btn vl-btn--cyber ${
                currentStage === 3
                  ? isSynergyLocked
                    ? 'is-active is-completed'
                    : 'is-active is-pulsing'
                  : currentStage > 3
                  ? 'is-completed'
                  : 'is-ready'
              }`}
              onClick={handleSweepVayu}
              title="Step 3: Sweep Vāyu to create property soup and tune sliders"
            >
              {currentStage === 3
                ? isSynergyLocked
                  ? '✓ 3. Guṇa-Sāmya Achieved (45%–65%)'
                  : '🌀 3. Tuning Sliders (Target: 45%–65%)'
                : isSynergyLocked
                ? '✓ 3. Guṇa-Sāmya Achieved (45%–65%)'
                : '👉 3. Sweep Vāyu (Dynamic Property Soup)'}
            </button>

            {/* Step 4 */}
            <button
              type="button"
              className={`vl-btn vl-btn--gold ${
                currentStage === 4
                  ? 'is-active is-completed'
                  : isSynergyLocked
                  ? 'is-unlocked-glow is-pulsing'
                  : 'is-ready'
              }`}
              onClick={handleSamavayaBinding}
              title="Step 4: Click to bind into Trasareṇu in eternal Ākāśa! (Auto-balances if needed)"
            >
              {currentStage === 4
                ? '⚛️ 4. Samavāya Bound in Ākāśa'
                : isSynergyLocked
                ? '✨ 4. ⚛️ BIND SAMAVĀYA IN ĀKĀŚA'
                : '⚛️ 4. BIND SAMAVĀYA (Balance & Bind)'}
            </button>

            {/* Quick Auto-Tune Action */}
            <button
              type="button"
              className="vl-btn vl-btn--secondary"
              onClick={handleAutoTuneSamya}
              title="Instantly set Sneha, Dravatva & Uṣṇa to 50% equilibrium"
              style={{
                fontSize: '0.8rem',
                padding: '0.45rem 0.8rem',
                borderColor: '#10b981',
                color: '#86efac',
                background: 'rgba(16, 185, 129, 0.12)',
              }}
            >
              ⚡ Auto-Tune Guṇa-Sāmya (50%)
            </button>
          </div>
        </div>

        {/* 2. Real-Time Guṇa Triad Sliders (त्रिगुणात्मक-पर्यावरणम्) */}
        <div
          className="vl-guna-triad-card"
          role="region"
          aria-label="The Guna Triad Sliders"
          style={{
            borderColor: currentStage >= 3 ? (isSynergyLocked ? '#10b981' : '#facc15') : 'rgba(148, 163, 184, 0.25)',
            boxShadow: currentStage >= 3 ? '0 0 20px rgba(250, 204, 21, 0.15)' : 'none',
          }}
        >
          {/* Header */}
          <div className="vl-triad-header">
            <div>
              <h3 className="vl-triad-title">
                <span>
                  {currentStage === 3
                    ? (isSynergyLocked ? '✨ 3/3 GUṆA-SĀMYA ACHIEVED (Ready for Step 4!)' : '📊 STEP 3 ACTIVE: TUNE INTO 45% – 65% SYNERGY WINDOW')
                    : currentStage === 4
                    ? '📊 THE GUṆA TRIAD · SAMAVĀYA EQUILIBRIUM ACHIEVED'
                    : '📊 THE GUṆA TRIAD (त्रिगुणात्मक-पर्यावरणम्)'}
                </span>
              </h3>
              <div className="vl-triad-sub">
                {currentStage === 3
                  ? '🎯 Target Rule: Balance all 3 sliders into the 45% – 65% window to eliminate friction and enable binding!'
                  : currentStage === 4
                  ? '✨ Guṇa-Sāmyam Complete: Thermodynamic equilibrium maintained within the Tryaṇuka bonds.'
                  : `Baseline state: Sneha (${sneha}%), Dravatva (${dravatva}%), Uṣṇa (${usna}%). Complete Steps 1 & 2 above to unlock manual tuning.`}
              </div>
            </div>
            <div className={`vl-synergy-badge${isSynergyLocked ? ' is-locked' : ''}`}>
              {isSynergyLocked
                ? '✨ SYNERGY LOCKED · CLICK STEP 4 ABOVE!'
                : '⚡ TUNE SLIDERS TO 45%–65%'}
            </div>
          </div>

          {/* Dedicated 45%-65% Equilibrium Explainer Card */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '10px',
              padding: '0.85rem 1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.75rem',
            }}
          >
            <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.6rem 0.75rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
              <div style={{ color: '#93c5fd', fontSize: '0.82rem', fontWeight: 800 }}>❄️ Below 45%: Cold Lock</div>
              <div style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '0.2rem' }}>
                Too rigid or clumpy. High interfacial friction repels substances apart like unheated oil and water.
              </div>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.12)', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1.5px solid #10b981', boxShadow: '0 0 12px rgba(16, 185, 129, 0.2)' }}>
              <div style={{ color: '#86efac', fontSize: '0.84rem', fontWeight: 900 }}>✨ 45% – 65%: Guṇa-Sāmya</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.74rem', marginTop: '0.2rem' }}>
                <strong>PERFECT BINDING ZONE!</strong> Cohesive rejection drops to 0, fluidity allows mobility, and thermal energy reaches Tryaṇuka binding threshold.
              </div>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.6rem 0.75rem', borderRadius: '8px', borderLeft: '3px solid #f97316' }}>
              <div style={{ color: '#fdba74', fontSize: '0.82rem', fontWeight: 800 }}>💥 Above 65%: Kinetic Chaos</div>
              <div style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '0.2rem' }}>
                Overheated or hyper-fluid. Excessive agitation scatters atoms before permanent bonds can form.
              </div>
            </div>
          </div>

          {/* Live 3-Guṇa Equilibrium Checklist */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(2, 6, 23, 0.6)',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid rgba(148, 163, 184, 0.2)',
            }}
          >
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e2e8f0' }}>LIVE EQUILIBRIUM CHECKLIST:</span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.76rem', padding: '0.2rem 0.55rem', borderRadius: '6px', background: sneha >= 45 && sneha <= 65 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${sneha >= 45 && sneha <= 65 ? '#10b981' : '#ef4444'}`, color: sneha >= 45 && sneha <= 65 ? '#86efac' : '#fca5a5', fontWeight: 700 }}>
                Sneha: {sneha}% {sneha >= 45 && sneha <= 65 ? '✅ (45–65%)' : sneha < 45 ? '▲ Need ≥45%' : '▼ Need ≤65%'}
              </span>
              <span style={{ fontSize: '0.76rem', padding: '0.2rem 0.55rem', borderRadius: '6px', background: dravatva >= 45 && dravatva <= 65 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${dravatva >= 45 && dravatva <= 65 ? '#10b981' : '#ef4444'}`, color: dravatva >= 45 && dravatva <= 65 ? '#86efac' : '#fca5a5', fontWeight: 700 }}>
                Dravatva: {dravatva}% {dravatva >= 45 && dravatva <= 65 ? '✅ (45–65%)' : dravatva < 45 ? '▲ Need ≥45%' : '▼ Need ≤65%'}
              </span>
              <span style={{ fontSize: '0.76rem', padding: '0.2rem 0.55rem', borderRadius: '6px', background: usna >= 45 && usna <= 65 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${usna >= 45 && usna <= 65 ? '#10b981' : '#ef4444'}`, color: usna >= 45 && usna <= 65 ? '#86efac' : '#fca5a5', fontWeight: 700 }}>
                Uṣṇa: {usna}% {usna >= 45 && usna <= 65 ? '✅ (45–65%)' : usna < 45 ? '▲ Need ≥45%' : '▼ Need ≤65%'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: isSynergyLocked ? '#86efac' : '#facc15' }}>
                {isSynergyLocked ? '✨ 3/3 BALANCED · UNLOCKED!' : `${(sneha >= 45 && sneha <= 65 ? 1 : 0) + (dravatva >= 45 && dravatva <= 65 ? 1 : 0) + (usna >= 45 && usna <= 65 ? 1 : 0)}/3 Balanced`}
              </div>
              <button
                type="button"
                className="vl-btn vl-btn--secondary"
                onClick={handleAutoTuneSamya}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.55rem',
                  borderColor: '#10b981',
                  color: '#86efac',
                  background: 'rgba(16, 185, 129, 0.15)',
                }}
              >
                ⚡ Auto-Tune 50%
              </button>
            </div>
          </div>

          <div className="vl-triad-sliders-grid">
            {/* Slider 1: Sneha (Cohesion / Polarity) */}
            <div
              className="vl-triad-slider-row"
              style={{
                borderRadius: '10px',
                padding: '0.85rem',
                border: sneha >= 45 && sneha <= 65 ? '1px solid #10b981' : '1px solid rgba(148, 163, 184, 0.2)',
                background: sneha >= 45 && sneha <= 65 ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                boxShadow: sneha >= 45 && sneha <= 65 ? '0 0 10px rgba(16, 185, 129, 0.15)' : 'none',
              }}
            >
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
              <div className="vl-slider-track-wrap" style={{ position: 'relative' }}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sneha}
                  onChange={(e) => handleSliderChange('sneha', Number(e.target.value))}
                  className="vl-guna-range vl-guna-range--sneha"
                  style={{ cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', marginTop: '0.2rem' }}>
                  <span>0%</span>
                  <span style={{ color: sneha >= 45 && sneha <= 65 ? '#86efac' : '#94a3b8', fontWeight: 800 }}>
                    [ 45% ── GOLDEN EQUILIBRIUM ZONE ── 65% ]
                  </span>
                  <span>100%</span>
                </div>
              </div>
              <div className="vl-ts-val-wrap">
                <span className="vl-ts-val" style={{ color: sneha >= 45 && sneha <= 65 ? '#86efac' : '#f1f5f9' }}>
                  {sneha}%
                </span>
                <span className="vl-ts-note" style={{ color: sneha >= 45 && sneha <= 65 ? '#86efac' : '#94a3b8' }}>
                  {sneha >= 45 && sneha <= 65
                    ? '🟢 Balanced (45%–65% Equilibrium)'
                    : sneha > 65
                    ? '🔴 High Rigidity / Clumping (Need ≤65%)'
                    : '🔴 Low Cohesion (Need ≥45%)'}
                </span>
              </div>
            </div>

            {/* Slider 2: Dravatva (Fluidity / Mobility) */}
            <div
              className="vl-triad-slider-row"
              style={{
                borderRadius: '10px',
                padding: '0.85rem',
                border: dravatva >= 45 && dravatva <= 65 ? '1px solid #10b981' : '1px solid rgba(148, 163, 184, 0.2)',
                background: dravatva >= 45 && dravatva <= 65 ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                boxShadow: dravatva >= 45 && dravatva <= 65 ? '0 0 10px rgba(16, 185, 129, 0.15)' : 'none',
              }}
            >
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
              <div className="vl-slider-track-wrap" style={{ position: 'relative' }}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={dravatva}
                  onChange={(e) => handleSliderChange('dravatva', Number(e.target.value))}
                  className="vl-guna-range vl-guna-range--dravatva"
                  style={{ cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', marginTop: '0.2rem' }}>
                  <span>0%</span>
                  <span style={{ color: dravatva >= 45 && dravatva <= 65 ? '#86efac' : '#94a3b8', fontWeight: 800 }}>
                    [ 45% ── GOLDEN EQUILIBRIUM ZONE ── 65% ]
                  </span>
                  <span>100%</span>
                </div>
              </div>
              <div className="vl-ts-val-wrap">
                <span className="vl-ts-val" style={{ color: dravatva >= 45 && dravatva <= 65 ? '#86efac' : '#f1f5f9' }}>
                  {dravatva}%
                </span>
                <span className="vl-ts-note" style={{ color: dravatva >= 45 && dravatva <= 65 ? '#86efac' : '#94a3b8' }}>
                  {dravatva >= 45 && dravatva <= 65
                    ? '🟢 Balanced (Equilibrium Glide)'
                    : dravatva < 45
                    ? '🔴 Static Resistance (Need ≥45%)'
                    : '🔴 Hyper-Flow Chaos (Need ≤65%)'}
                </span>
              </div>
            </div>

            {/* Slider 3: Uṣṇa (Kinetic Heat / Transformation) */}
            <div
              className="vl-triad-slider-row"
              style={{
                borderRadius: '10px',
                padding: '0.85rem',
                border: usna >= 45 && usna <= 65 ? '1px solid #10b981' : '1px solid rgba(148, 163, 184, 0.2)',
                background: usna >= 45 && usna <= 65 ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                boxShadow: usna >= 45 && usna <= 65 ? '0 0 10px rgba(16, 185, 129, 0.15)' : 'none',
              }}
            >
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
              <div className="vl-slider-track-wrap" style={{ position: 'relative' }}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={usna}
                  onChange={(e) => handleSliderChange('usna', Number(e.target.value))}
                  className="vl-guna-range vl-guna-range--usna"
                  style={{ cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', marginTop: '0.2rem' }}>
                  <span>0%</span>
                  <span style={{ color: usna >= 45 && usna <= 65 ? '#86efac' : '#94a3b8', fontWeight: 800 }}>
                    [ 45% ── GOLDEN EQUILIBRIUM ZONE ── 65% ]
                  </span>
                  <span>100%</span>
                </div>
              </div>
              <div className="vl-ts-val-wrap">
                <span className="vl-ts-val" style={{ color: usna >= 45 && usna <= 65 ? '#86efac' : '#f1f5f9' }}>
                  {usna}%
                </span>
                <span className="vl-ts-note" style={{ color: usna >= 45 && usna <= 65 ? '#86efac' : '#94a3b8' }}>
                  {usna >= 45 && usna <= 65
                    ? '🟢 Balanced (Catalytic Equilibrium)'
                    : usna < 45
                    ? '🔴 Cold Lock (Need ≥45%)'
                    : '🔴 Kinetic Chaos (Need ≤65%)'}
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
