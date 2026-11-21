/**
 * Pure Web-Audio Synthesized Steam Train Sound Engine
 * Produces warm steam whistle ("Choo-Choo"), rhythmic track chug-chug + rail click-clack,
 * and gentle air-brake hiss for the Preschool Sanskrit Akshara Express.
 */

class TrainSoundEngine {
  private ctx: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.noiseBuffer && this.noiseBuffer.sampleRate === ctx.sampleRate) {
      return this.noiseBuffer;
    }
    const len = ctx.sampleRate * 1.5;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buf;
    return buf;
  }

  /** Warm dual-tone steam locomotive whistle ("Choo-Choo!") */
  public playWhistle(): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playBlast = (startOffset: number, duration: number, baseFreq: number) => {
      const t0 = now + startOffset;
      const tEnd = t0 + duration;

      // Dual harmonic steam pipes (perfect fifth)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq * 0.96, t0);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq, t0 + 0.06);
      osc1.frequency.setValueAtTime(baseFreq, tEnd - 0.08);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.94, tEnd);

      osc2.frequency.setValueAtTime(baseFreq * 1.498, t0);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, t0 + 0.06);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, t0);
      gain.gain.linearRampToValueAtTime(0.14, t0 + 0.05);
      gain.gain.setValueAtTime(0.12, tEnd - 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, tEnd);

      // Soft steam breath noise
      const noise = ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(baseFreq * 2.2, t0);
      filter.Q.setValueAtTime(3.2, t0);
      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.001, t0);
      nGain.gain.linearRampToValueAtTime(0.035, t0 + 0.04);
      nGain.gain.exponentialRampToValueAtTime(0.001, tEnd);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      noise.connect(filter);
      filter.connect(nGain);
      nGain.connect(ctx.destination);

      osc1.start(t0);
      osc2.start(t0);
      noise.start(t0);
      osc1.stop(tEnd + 0.02);
      osc2.stop(tEnd + 0.02);
      noise.stop(tEnd + 0.02);
    };

    // Classic friendly "Choo-Choo!" double blast
    playBlast(0, 0.28, 523.25); // C5
    playBlast(0.34, 0.42, 587.33); // D5
  }

  /** Rhythmic steam chug-a-chug + metallic rail click-clack */
  public playChugBeat(): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Two soft steam chugs + rail click-clack
    [0, 0.16, 0.34].forEach((offset, idx) => {
      const t0 = now + offset;
      const noise = ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(ctx);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(idx === 0 ? 480 : 620, t0);
      filter.Q.setValueAtTime(1.6, t0);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, t0);
      gain.gain.linearRampToValueAtTime(idx === 0 ? 0.08 : 0.055, t0 + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(t0);
      noise.stop(t0 + 0.14);
    });

    // Subtle metallic rail click-clack
    [0.08, 0.24].forEach((offset) => {
      const t0 = now + offset;
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, t0);
      osc.frequency.exponentialRampToValueAtTime(85, t0 + 0.045);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.045, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.06);
    });
  }

  /** Gentle steam air-brake release when pausing the train */
  public playBrakeHiss(): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const noise = ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer(ctx);

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1400, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.48);
  }
}

export const trainSoundEngine = new TrainSoundEngine();
