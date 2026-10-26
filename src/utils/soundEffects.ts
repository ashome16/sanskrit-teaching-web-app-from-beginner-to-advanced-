/**
 * Lightweight, zero-dependency Web Audio API sound synthesizer
 * Provides crisp, cheerful, puzzle-like audio feedback for handwriting and game actions.
 * Works seamlessly across all modern browsers (Chrome, Safari, Firefox, Edge, iOS, macOS).
 */

class SoundEffectsEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sanskrit_sound_muted');
        if (saved === 'true') {
          this.soundEnabled = false;
        }
      } catch {}
    }
  }

  setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
  }

  isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Crisp, tactile wood/magnetic snap sound when a puzzle piece locks into place
   */
  playPuzzleSnap(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // 1. Woody thud impact
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);

      // 2. High sparkle click ping (G6 / 1567Hz)
      const ping = ctx.createOscillator();
      const pingGain = ctx.createGain();
      ping.type = 'sine';
      ping.frequency.setValueAtTime(1567.98, now + 0.02);
      pingGain.gain.setValueAtTime(0.14, now + 0.02);
      pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      ping.connect(pingGain);
      pingGain.connect(ctx.destination);

      ping.start(now + 0.02);
      ping.stop(now + 0.2);
    } catch {
      // AudioContext failure gracefully caught
    }
  }

  /**
   * Gentle, pleasant bell ding when drawing or completing a stroke (D5 / 587Hz)
   */
  playStrokeChime(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5 sparkle

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // AudioContext failure gracefully caught
    }
  }

  /**
   * Cheerful 2-note ascending chime when an individual stroke or test passes (E5 -> B5)
   */
  playSuccessDing(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [659.25, 987.77]; // E5, B5

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.1;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.18, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.32);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.35);
      });
    } catch {
      // AudioContext failure gracefully caught
    }
  }

  /**
   * Rich puzzle-style celebration arpeggio when handwriting is well-executed (C5 -> E5 -> G5 -> C6)
   */
  playCelebrationChime(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Major arpeggio)

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.2, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.5);
      });
    } catch {
      // AudioContext failure gracefully caught
    }
  }

  /**
   * Grand victory fanfare chord progression for game, quest or quiz mastery
   */
  playVictoryFanfare(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // High triumphant fanfare: G4 -> C5 -> E5 -> G5 -> C6
      const notes = [392.0, 523.25, 659.25, 783.99, 1046.5];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.09;
        const dur = idx === notes.length - 1 ? 0.7 : 0.35;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.22, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + dur + 0.05);
      });
    } catch {}
  }

  /**
   * Gentle, non-punitive two-tone buzz for a mismatch or trap cell
   */
  playErrorBuzzer(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [220, 185]; // Low gentle dissonant descending blips

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.12;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.12, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.2);
      });
    } catch {}
  }

  /**
   * Subtle, encouraging chime for encouraging practice
   */
  playEncouragementDing(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.15); // C#5

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch {
      // AudioContext failure gracefully caught
    }
  }

  /**
   * Loud, comedic steam hiss whoosh with white noise and sweeping filter
   */
  playSteamHiss(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const bufferSize = Math.floor(ctx.sampleRate * 0.45);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3600, now);
      filter.frequency.exponentialRampToValueAtTime(500, now + 0.45);
      filter.Q.setValueAtTime(2.5, now);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.45);
    } catch {}
  }

  /**
   * Comedic cartoon spring recoil / boing sound
   */
  playCartoonBoing(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.09);
      osc.frequency.linearRampToValueAtTime(340, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.4);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {}
  }

  /**
   * Electric repulsive zap sound when incompatible atoms reject
   */
  playElectricZap(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }

  /**
   * Element-specific summon sound (Earth, Water, Fire, Air)
   */
  playElementSummon(bhuta: 'prthivi' | 'ap' | 'tejas' | 'vayu'): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (bhuta === 'prthivi') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(65, now + 0.15);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      } else if (bhuta === 'ap') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      } else if (bhuta === 'tejas') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(740, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.1);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.2);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  /**
   * Resonant sacred temple bell chord when Trasareṇu becomes visible
   */
  playTrasarenuChime(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const freqs = [349.23, 440.0, 523.25, 698.46, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.04;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.25 / (idx + 1), startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.95);
      });
    } catch {}
  }

  /**
   * Pure melodious Indian classical Swara tone with gentle bell envelope
   */
  playSwara(freq: number, duration: number = 0.4): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {}
  }

  /**
   * Realistic laboratory liquid boiling sound with bubbling pops and convection simmer
   */
  playBoilingSound(durationSeconds: number = 2.5): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = Math.max(1, durationSeconds);

      // 1. Water convection rumble / simmer (filtered low noise)
      const bufferSize = Math.floor(ctx.sampleRate * dur);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brownian noise filter for liquid rumble
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, now);
      filter.frequency.linearRampToValueAtTime(750, now + dur * 0.5);
      filter.frequency.linearRampToValueAtTime(380, now + dur);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.3);
      gain.gain.setValueAtTime(0.24, now + dur - 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + dur);

      // 2. Micro bubble pops (rising pitch sine droplets bursting at surface)
      const bubbleCount = Math.floor(dur * 14);
      for (let b = 0; b < bubbleCount; b++) {
        const bubbleTime = now + (b / 14) + (Math.random() * 0.07 - 0.035);
        if (bubbleTime >= now + dur) break;
        const popOsc = ctx.createOscillator();
        const popGain = ctx.createGain();
        const startFreq = 240 + Math.random() * 260;
        const endFreq = startFreq + 190 + Math.random() * 210;

        popOsc.type = 'sine';
        popOsc.frequency.setValueAtTime(startFreq, bubbleTime);
        popOsc.frequency.exponentialRampToValueAtTime(endFreq, bubbleTime + 0.035);

        popGain.gain.setValueAtTime(0.001, bubbleTime);
        popGain.gain.linearRampToValueAtTime(0.12 + Math.random() * 0.08, bubbleTime + 0.008);
        popGain.gain.exponentialRampToValueAtTime(0.001, bubbleTime + 0.04);

        popOsc.connect(popGain);
        popGain.connect(ctx.destination);
        popOsc.start(bubbleTime);
        popOsc.stop(bubbleTime + 0.045);
      }
    } catch {}
  }

  /**
   * Powerful, cinematic rocket launch blastoff sound with ignition crackle and deep acoustic thrust roar
   */
  playRocketLaunchSound(durationSeconds: number = 3.5): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = Math.max(1.5, durationSeconds);

      // 1. Ignition spark / propellant crackle (high-pass noise burst)
      const sparkBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.6), ctx.sampleRate);
      const sparkData = sparkBuffer.getChannelData(0);
      for (let i = 0; i < sparkData.length; i++) {
        sparkData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
      }
      const sparkSource = ctx.createBufferSource();
      sparkSource.buffer = sparkBuffer;
      const sparkFilter = ctx.createBiquadFilter();
      sparkFilter.type = 'bandpass';
      sparkFilter.frequency.setValueAtTime(3200, now);
      sparkFilter.Q.setValueAtTime(3.0, now);
      const sparkGain = ctx.createGain();
      sparkGain.gain.setValueAtTime(0.35, now);
      sparkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      sparkSource.connect(sparkFilter);
      sparkFilter.connect(sparkGain);
      sparkGain.connect(ctx.destination);
      sparkSource.start(now);
      sparkSource.stop(now + 0.55);

      // 2. Heavy rocket engine roar & rumble (deep noise + low frequency sub-bass osc)
      const roarBufferSize = Math.floor(ctx.sampleRate * dur);
      const roarBuffer = ctx.createBuffer(1, roarBufferSize, ctx.sampleRate);
      const roarData = roarBuffer.getChannelData(0);
      let rLast = 0;
      for (let i = 0; i < roarBufferSize; i++) {
        const white = Math.random() * 2 - 1;
        rLast = (rLast + 0.05 * white) / 1.05;
        roarData[i] = rLast * 4.0;
      }
      const roarSource = ctx.createBufferSource();
      roarSource.buffer = roarBuffer;

      const roarFilter = ctx.createBiquadFilter();
      roarFilter.type = 'lowpass';
      roarFilter.frequency.setValueAtTime(80, now);
      roarFilter.frequency.exponentialRampToValueAtTime(450, now + 0.8); // engine spooling up
      roarFilter.frequency.linearRampToValueAtTime(380, now + dur - 0.5);
      roarFilter.frequency.exponentialRampToValueAtTime(90, now + dur);

      const roarGain = ctx.createGain();
      roarGain.gain.setValueAtTime(0.02, now);
      roarGain.gain.exponentialRampToValueAtTime(0.42, now + 0.4);
      roarGain.gain.setValueAtTime(0.42, now + dur - 0.8);
      roarGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      roarSource.connect(roarFilter);
      roarFilter.connect(roarGain);
      roarGain.connect(ctx.destination);
      roarSource.start(now);
      roarSource.stop(now + dur);

      // 3. Sub-bass booster vibration oscillator (45Hz -> 85Hz)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(48, now);
      subOsc.frequency.exponentialRampToValueAtTime(82, now + 0.7);
      subOsc.frequency.linearRampToValueAtTime(65, now + dur);

      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.3, now + 0.5);
      subGain.gain.setValueAtTime(0.3, now + dur - 0.8);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + dur);
    } catch {}
  }

  /**
   * Instant propellant deflagration whoosh for alchemy crucibles and flares
   */
  playCrucibleIgnition(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = 0.85;
      const bufferSize = Math.floor(ctx.sampleRate * dur);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.28));
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(180, now + dur);
      filter.Q.setValueAtTime(1.8, now);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.38, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start(now);
      source.stop(now + dur);
    } catch {}
  }

  /**
   * Crisp LIBS laser spectroscopy pulse
   */
  playLaserPulse(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch {}
  }
}

export const soundEffects = new SoundEffectsEngine();
