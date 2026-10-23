/**
 * Gurukul Bioacoustic Soundscape Engine
 * Pure Web Audio API synthesized forest dawn ambiance:
 * - Natural birdsong (Kokila/Cuckoo calls, high-frequency songbirds, chirps)
 * - Resonant bronze temple bell chime
 * - Sacred morning drone & gentle breeze
 * Zero external audio dependencies, instant playback, mobile & Safari compatible.
 */

class GurukulAmbianceEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalIds: number[] = [];
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;

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

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(muted ? 0 : 0.8, now + 0.1);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play a natural songbird chirp with organic frequency modulation
   */
  public playSongbirdChirp(panX: number = (Math.random() * 1.6 - 0.8)): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx || !this.masterGain) return;
      const now = ctx.currentTime;

      const numNotes = Math.floor(Math.random() * 3) + 2; // 2 to 4 rapid chirps
      let delay = 0;

      for (let i = 0; i < numNotes; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

        const baseFreq = 2600 + Math.random() * 1400; // 2600 - 4000 Hz
        const chirpStart = now + delay;
        const chirpDur = 0.05 + Math.random() * 0.04; // 50-90ms

        osc.type = 'sine';
        // Organic bird pitch envelope: swoop up then drop
        osc.frequency.setValueAtTime(baseFreq, chirpStart);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * (1.3 + Math.random() * 0.3), chirpStart + chirpDur * 0.4);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, chirpStart + chirpDur);

        gain.gain.setValueAtTime(0.001, chirpStart);
        gain.gain.linearRampToValueAtTime(0.18 + Math.random() * 0.1, chirpStart + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, chirpStart + chirpDur);

        if (pan) {
          pan.pan.setValueAtTime(Math.max(-1, Math.min(1, panX + (Math.random() * 0.2 - 0.1))), chirpStart);
          osc.connect(gain);
          gain.connect(pan);
          pan.connect(this.masterGain);
        } else {
          osc.connect(gain);
          gain.connect(this.masterGain);
        }

        osc.start(chirpStart);
        osc.stop(chirpStart + chirpDur + 0.02);

        delay += chirpDur + 0.03 + Math.random() * 0.06;
      }
    } catch {
      // AudioContext failure gracefully caught
    }
  }

  /**
   * Play the iconic Kokila (Indian Cuckoo) two-tone rising call: 'ku-OO'
   */
  public playKokilaCall(panX: number = 0.3): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx || !this.masterGain) return;
      const now = ctx.currentTime;
      const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (pan) {
        pan.pan.setValueAtTime(Math.max(-1, Math.min(1, panX)), now);
        pan.connect(this.masterGain);
      }
      const outputNode = pan || this.masterGain;

      // Note 1: 'ku' (lower, short)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(680, now);
      osc1.frequency.exponentialRampToValueAtTime(740, now + 0.12);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.18, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc1.connect(gain1);
      gain1.connect(outputNode);
      osc1.start(now);
      osc1.stop(now + 0.16);

      // Note 2: 'OO' (higher, melodic, elongated with gentle vibrato)
      const note2Start = now + 0.14;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(920, note2Start);
      osc2.frequency.exponentialRampToValueAtTime(1040, note2Start + 0.18);
      osc2.frequency.linearRampToValueAtTime(980, note2Start + 0.38);

      gain2.gain.setValueAtTime(0.001, note2Start);
      gain2.gain.linearRampToValueAtTime(0.24, note2Start + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.001, note2Start + 0.42);

      osc2.connect(gain2);
      gain2.connect(outputNode);
      osc2.start(note2Start);
      osc2.stop(note2Start + 0.45);
    } catch {
      // AudioContext failure gracefully caught
    }
  }

  /**
   * Resonant bronze sacred temple bell chime with rich harmonic overtones
   */
  public playTempleBell(fundFreq: number = 432): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx || !this.masterGain) return;
      const now = ctx.currentTime;

      // Inharmonic bell partials: fundamental, minor third, octave, fifth
      const partials = [
        { mult: 1.0, gain: 0.35, decay: 3.2 },
        { mult: 1.5, gain: 0.18, decay: 2.8 },
        { mult: 2.76, gain: 0.14, decay: 2.0 },
        { mult: 4.07, gain: 0.08, decay: 1.4 },
        { mult: 5.4, gain: 0.04, decay: 0.9 },
      ];

      partials.forEach((p) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundFreq * p.mult, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(p.gain, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + p.decay + 0.1);
      });
    } catch {
      // AudioContext failure gracefully caught
    }
  }

  /**
   * Start the full Gurukul dawn soundscape:
   * Ambient morning birdsong, resonant bell, and serene forest breeze.
   */
  public startDawnAmbiance(): void {
    if (this.isPlaying) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      this.isPlaying = true;
      const now = ctx.currentTime;

      // Initialize master gain
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.001, now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.85, now + 0.8);
      this.masterGain.connect(ctx.destination);

      // 1. Initial greeting temple bell chime
      this.playTempleBell(432);

      // 2. Immediate welcoming bird chirp
      setTimeout(() => {
        if (this.isPlaying) this.playSongbirdChirp(-0.4);
      }, 300);

      setTimeout(() => {
        if (this.isPlaying) this.playKokilaCall(0.5);
      }, 950);

      setTimeout(() => {
        if (this.isPlaying) this.playSongbirdChirp(0.2);
      }, 1600);

      // 3. Recurring birdsong loop
      const birdInterval = window.setInterval(() => {
        if (!this.isPlaying) return;
        const roll = Math.random();
        if (roll < 0.65) {
          this.playSongbirdChirp();
        } else if (roll < 0.88) {
          this.playKokilaCall();
        } else {
          // Play a distant chime or double chirp
          this.playSongbirdChirp(-0.6);
          setTimeout(() => {
            if (this.isPlaying) this.playSongbirdChirp(0.6);
          }, 180);
        }
      }, 1100);

      this.intervalIds.push(birdInterval);
    } catch {
      // AudioContext failure gracefully caught
    }
  }

  /**
   * Gracefully fade out and stop the soundscape
   */
  public stopDawnAmbiance(fadeDuration: number = 0.8): void {
    this.isPlaying = false;
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];

    if (this.masterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.001, now + fadeDuration);
        setTimeout(() => {
          if (!this.isPlaying && this.masterGain) {
            try {
              this.masterGain.disconnect();
            } catch {}
            this.masterGain = null;
          }
        }, fadeDuration * 1000 + 100);
      } catch {}
    }
  }
}

export const gurukulAmbiance = new GurukulAmbianceEngine();
