// Zero-dependency Web Audio Synthesizer for Guna Matrix & Introductory Story
export class GunaAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sanskrit_sound_muted');
        if (saved === 'true') {
          this.enabled = false;
        }
      } catch {}
    }
  }

  setSoundEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isSoundEnabled(): boolean {
    return this.enabled;
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playTone(
    freq: number,
    duration: number = 0.4,
    type: OscillatorType = 'sine',
    gainVal: number = 0.25
  ): void {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }

  playRepulsionFriction(): void {
    if (!this.enabled) return;
    this.playTone(180, 0.45, 'sawtooth', 0.2);
    setTimeout(() => this.playTone(160, 0.35, 'sawtooth', 0.2), 60);
  }

  playHeatCrackle(): void {
    if (!this.enabled) return;
    this.playTone(420, 0.2, 'triangle', 0.15);
    setTimeout(() => this.playTone(550, 0.2, 'sine', 0.15), 50);
  }

  playWindWhoosh(): void {
    if (!this.enabled) return;
    this.playTone(320, 0.5, 'sine', 0.2);
    setTimeout(() => this.playTone(380, 0.5, 'sine', 0.18), 100);
  }

  playSynergyLock(): void {
    if (!this.enabled) return;
    this.playTone(392, 0.6, 'sine', 0.2); // G4
    setTimeout(() => this.playTone(523.25, 0.8, 'sine', 0.25), 120); // C5
  }

  playSamavayaImplosion(): void {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Downward frequency sweep implosion
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.6);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);

      // Succeeded by celestial harmonic burst
      setTimeout(() => {
        this.playTone(528, 2.5, 'sine', 0.35); // 528Hz Transformation
        this.playTone(264, 2.5, 'sine', 0.25);
        this.playTone(792, 2.0, 'sine', 0.2);
      }, 620);
    } catch {}
  }
}

export const gunaAudio = new GunaAudioEngine();
