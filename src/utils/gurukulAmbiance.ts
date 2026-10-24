/**
 * Gurukul Bioacoustic Soundscape Engine
 * Pure Web Audio API synthesized forest dawn ambiance:
 * - Natural Indian songbirds (spatial stereo chirps, trills)
 * - Kokila (Indian Cuckoo) iconic two-tone call ('ku-OO')
 * - Mayūra (Tapovana Peacock) soaring brassy cry ('Pee-au!')
 * - Resonant bronze sacred temple bell chime (432 Hz)
 * - Gentle sacred river / forest brook water ripple (Nadi-jaladhvani)
 * Zero external audio dependencies, instant playback, mobile & Safari compatible.
 * SOUND IS ON BY DEFAULT on initial load.
 */

class GurukulAmbianceEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalIds: number[] = [];
  private timeoutIds: number[] = [];
  private masterGain: GainNode | null = null;
  private streamSource: AudioBufferSourceNode | null = null;
  private streamGain: GainNode | null = null;
  private isMuted: boolean = false;
  private hasRegisteredUnlock: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => {});
    }
    this.registerUnlockListeners();
    return this.ctx;
  }

  public isSuspended(): boolean {
    return !!this.ctx && this.ctx.state === 'suspended';
  }

  public async resume(): Promise<void> {
    const ctx = this.getContext();
    if (ctx && ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {}
    }
  }

  /**
   * Ensure mobile and desktop browsers (iOS Safari, Chrome, Edge) unpause audio on first user touch/click/movement
   */
  public registerUnlockListeners(): void {
    if (this.hasRegisteredUnlock || typeof window === 'undefined') return;
    this.hasRegisteredUnlock = true;

    const unlockHandler = () => {
      if (this.ctx && this.ctx.state === 'suspended') {
        void this.ctx.resume().catch(() => {});
      }
    };

    [
      'pointerdown',
      'touchstart',
      'click',
      'keydown',
      'pointermove',
      'mousemove',
      'wheel',
      'scroll',
    ].forEach((eventName) => {
      window.addEventListener(eventName, unlockHandler, { once: true, passive: true });
      document.addEventListener(eventName, unlockHandler, { once: true, passive: true });
    });
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(muted ? 0 : 0.95, now + 0.08);
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
   * Play a natural forest songbird chirp with organic frequency modulation
   */
  public playSongbirdChirp(panX: number = Math.random() * 1.6 - 0.8): void {
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
        osc.frequency.exponentialRampToValueAtTime(
          baseFreq * (1.3 + Math.random() * 0.3),
          chirpStart + chirpDur * 0.4
        );
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, chirpStart + chirpDur);

        gain.gain.setValueAtTime(0.001, chirpStart);
        gain.gain.linearRampToValueAtTime(0.24 + Math.random() * 0.1, chirpStart + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, chirpStart + chirpDur);

        if (pan) {
          pan.pan.setValueAtTime(
            Math.max(-1, Math.min(1, panX + (Math.random() * 0.2 - 0.1))),
            chirpStart
          );
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
  public playKokilaCall(panX: number = 0.35): void {
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
      gain1.gain.linearRampToValueAtTime(0.24, now + 0.02);
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
      gain2.gain.linearRampToValueAtTime(0.32, note2Start + 0.04);
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
   * Play the majestic cry of a Tapovana Peacock (मयूर / Mayūra)
   * Authentic two-tone trumpet/reed cry: quick ascending syllable,
   * followed by an expansive soaring brassy resonance ('Pee-au!').
   */
  public playPeacockCall(panX: number = -0.4): void {
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

      // Note 1: Short preparatory trumpet call
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const filter1 = ctx.createBiquadFilter();
      filter1.type = 'bandpass';
      filter1.frequency.setValueAtTime(1350, now);
      filter1.Q.setValueAtTime(3.2, now);

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(470, now);
      osc1.frequency.exponentialRampToValueAtTime(690, now + 0.16);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.18, now + 0.03);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(outputNode);
      osc1.start(now);
      osc1.stop(now + 0.22);

      // Note 2: Main soaring peacock trumpet cry ('Pee-au!')
      const start2 = now + 0.22;
      const osc2 = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain2 = ctx.createGain();
      const filter2 = ctx.createBiquadFilter();

      filter2.type = 'bandpass';
      filter2.frequency.setValueAtTime(1550, start2);
      filter2.frequency.linearRampToValueAtTime(2050, start2 + 0.24);
      filter2.frequency.linearRampToValueAtTime(1350, start2 + 0.58);
      filter2.Q.setValueAtTime(3.8, start2);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(630, start2);
      osc2.frequency.exponentialRampToValueAtTime(880, start2 + 0.22);
      osc2.frequency.exponentialRampToValueAtTime(700, start2 + 0.58);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(630 * 1.5, start2);
      oscHarmonic.frequency.exponentialRampToValueAtTime(880 * 1.5, start2 + 0.22);
      oscHarmonic.frequency.exponentialRampToValueAtTime(700 * 1.5, start2 + 0.58);

      gain2.gain.setValueAtTime(0.001, start2);
      gain2.gain.linearRampToValueAtTime(0.28, start2 + 0.05);
      gain2.gain.setValueAtTime(0.24, start2 + 0.26);
      gain2.gain.exponentialRampToValueAtTime(0.001, start2 + 0.62);

      osc2.connect(filter2);
      oscHarmonic.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(outputNode);

      osc2.start(start2);
      oscHarmonic.start(start2);
      osc2.stop(start2 + 0.65);
      oscHarmonic.stop(start2 + 0.65);
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
        { mult: 1.0, gain: 0.48, decay: 3.5 },
        { mult: 1.5, gain: 0.25, decay: 3.0 },
        { mult: 2.76, gain: 0.18, decay: 2.2 },
        { mult: 4.07, gain: 0.10, decay: 1.5 },
        { mult: 5.4, gain: 0.05, decay: 0.9 },
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
   * Start gentle sacred river / forest brook water murmur in the background
   */
  private startStreamAmbiance(ctx: AudioContext): void {
    try {
      const bufferSize = ctx.sampleRate * 2.5; // 2.5 second buffer
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pinkish noise with low-frequency ripple
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      this.streamSource = ctx.createBufferSource();
      this.streamSource.buffer = buffer;
      this.streamSource.loop = true;

      // Bandpass filter for water ripple timbre
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(540, ctx.currentTime);
      filter.Q.setValueAtTime(2.2, ctx.currentTime);

      // Gentle LFO modulating water ripple rate (0.18 Hz)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.18, ctx.currentTime);
      lfoGain.gain.setValueAtTime(120, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(ctx.currentTime);

      this.streamGain = ctx.createGain();
      this.streamGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.streamGain.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 1.0);

      this.streamSource.connect(filter);
      filter.connect(this.streamGain);
      this.streamGain.connect(this.masterGain!);

      this.streamSource.start(ctx.currentTime);
    } catch {
      // Stream ambience optional fallback
    }
  }

  /**
   * Start the full Gurukul dawn soundscape:
   * Ambient morning birdsong, Mayūra (peacock), Kokila (cuckoo),
   * resonant bell, and serene forest brook ripple.
   * Sound is explicitly ON.
   */
  public startDawnAmbiance(): void {
    if (this.isPlaying) return;
    try {
      this.isMuted = false;
      const ctx = this.getContext();
      if (!ctx) return;

      this.isPlaying = true;
      const now = ctx.currentTime;

      // Initialize master gain immediately at 0.95 so initial bell strike is crisp and loud
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.95, now);
      this.masterGain.connect(ctx.destination);

      // 1. Initial greeting temple bell chime
      this.playTempleBell(432);

      // 2. Forest brook background murmur
      this.startStreamAmbiance(ctx);

      // 3. Welcoming morning songbird chirp
      const t1 = window.setTimeout(() => {
        if (this.isPlaying) this.playSongbirdChirp(-0.4);
      }, 300);
      this.timeoutIds.push(t1);

      // 4. Iconic Indian Kokila / Cuckoo call (ku-OO)
      const t2 = window.setTimeout(() => {
        if (this.isPlaying) this.playKokilaCall(0.4);
      }, 950);
      this.timeoutIds.push(t2);

      // 5. Authentic Tapovana Peacock (Mayūra) call (Pee-au!)
      const t3 = window.setTimeout(() => {
        if (this.isPlaying) this.playPeacockCall(-0.35);
      }, 1700);
      this.timeoutIds.push(t3);

      // 6. Responsive songbird answering from other side of Tapovana
      const t4 = window.setTimeout(() => {
        if (this.isPlaying) this.playSongbirdChirp(0.5);
      }, 2500);
      this.timeoutIds.push(t4);

      // 7. Second Kokila & Peacock dawn exchange
      const t5 = window.setTimeout(() => {
        if (this.isPlaying) {
          this.playKokilaCall(-0.35);
          setTimeout(() => {
            if (this.isPlaying) this.playPeacockCall(0.35);
          }, 350);
        }
      }, 4200);
      this.timeoutIds.push(t5);

      // 8. Recurring organic birdsong & animal calls loop
      const soundscapeInterval = window.setInterval(() => {
        if (!this.isPlaying) return;
        const roll = Math.random();
        if (roll < 0.45) {
          // Songbird chirp with random stereo placement
          this.playSongbirdChirp();
        } else if (roll < 0.72) {
          // Kokila call
          this.playKokilaCall(Math.random() > 0.5 ? 0.35 : -0.35);
        } else if (roll < 0.90) {
          // Peacock call echoing through the Vedic forest
          this.playPeacockCall(Math.random() > 0.5 ? -0.4 : 0.4);
        } else {
          // Double songbird exchange
          this.playSongbirdChirp(-0.5);
          setTimeout(() => {
            if (this.isPlaying) this.playSongbirdChirp(0.5);
          }, 180);
        }
      }, 1250);

      this.intervalIds.push(soundscapeInterval);
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
    this.timeoutIds.forEach((id) => clearTimeout(id));
    this.timeoutIds = [];

    if (this.masterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.001, now + fadeDuration);

        setTimeout(() => {
          if (!this.isPlaying) {
            if (this.streamSource) {
              try {
                this.streamSource.stop();
                this.streamSource.disconnect();
              } catch {}
              this.streamSource = null;
            }
            if (this.streamGain) {
              try {
                this.streamGain.disconnect();
              } catch {}
              this.streamGain = null;
            }
            if (this.masterGain) {
              try {
                this.masterGain.disconnect();
              } catch {}
              this.masterGain = null;
            }
          }
        }, fadeDuration * 1000 + 100);
      } catch {}
    }
  }
}

export const gurukulAmbiance = new GurukulAmbianceEngine();
