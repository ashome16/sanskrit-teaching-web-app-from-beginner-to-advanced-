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

  // ---- Bhārata map: unique synthesized sound per spot ----
  private bNoise(ctx: AudioContext, t: number, dur: number, type: BiquadFilterType, f0: number, f1: number, q: number, vol: number, wobble = 0): void {
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const flt = ctx.createBiquadFilter(); flt.type = type; flt.Q.value = q;
    flt.frequency.setValueAtTime(f0, t); flt.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.15, dur / 3));
    if (wobble) { for (let k = 1; k < dur * wobble; k++) g.gain.setValueAtTime(vol * (0.4 + Math.random() * 0.6), t + k / wobble); }
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(flt); flt.connect(g); g.connect(ctx.destination); src.start(t); src.stop(t + dur + 0.05);
  }
  private bTone(ctx: AudioContext, t: number, dur: number, type: OscillatorType, f0: number, f1: number, vol: number, vibrato = 0): void {
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    if (vibrato) { const l = ctx.createOscillator(); const lg = ctx.createGain(); l.frequency.value = vibrato; lg.gain.value = f0 * 0.06; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dur); }
    const flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = 2400;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(flt); flt.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  private bBubbles(ctx: AudioContext, t: number, n: number, base: number, span: number, dur: number): void {
    for (let i = 0; i < n; i++) { const tt = t + Math.random() * dur; const f = base + Math.random() * span; this.bTone(ctx, tt, 0.07, 'sine', f, f * 1.8, 0.05); }
  }
  private bChirp(ctx: AudioContext, t: number, f: number, count: number, gap: number): void {
    for (let i = 0; i < count; i++) this.bTone(ctx, t + i * gap, 0.09, 'sine', f, f * 1.5, 0.07);
  }
  /** Distinct, kid-friendly ambient/animal sound for each India map spot. */
  playBharatSpotSound(id: string): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext(); if (!ctx) return;
      const t = ctx.currentTime + 0.02;
      switch (id) {
        // Mountains: wind / echo
        case 'himalaya': this.bNoise(ctx, t, 1.2, 'bandpass', 500, 1400, 3, 0.25); this.bTone(ctx, t + 0.2, 0.9, 'sine', 880, 880, 0.04); break;
        case 'sahyadri': this.bNoise(ctx, t, 0.9, 'bandpass', 900, 600, 4, 0.2); this.bChirp(ctx, t + 0.3, 2600, 2, 0.15); break;
        case 'vindhya': this.bNoise(ctx, t, 0.8, 'bandpass', 300, 800, 2, 0.22); [0, 0.25, 0.5].forEach((d, i) => this.bTone(ctx, t + d, 0.25, 'triangle', 392, 392, 0.08 / (i + 1))); break;
        case 'pariyatra': this.bNoise(ctx, t, 0.9, 'bandpass', 700, 300, 5, 0.22); this.bTone(ctx, t, 0.8, 'sine', 220, 180, 0.05); break;
        // Rivers: flowing water / waterfall
        case 'ganga': this.bNoise(ctx, t, 1.2, 'lowpass', 1800, 900, 1, 0.22); this.bBubbles(ctx, t, 8, 500, 500, 1.0); break;
        case 'yamuna': this.bNoise(ctx, t, 1.0, 'lowpass', 1200, 700, 1, 0.18); this.bBubbles(ctx, t, 6, 800, 600, 0.9); break;
        case 'brahmaputra': this.bNoise(ctx, t, 1.2, 'lowpass', 700, 400, 1, 0.32); this.bBubbles(ctx, t, 4, 250, 200, 1.0); break;
        case 'narmada': this.bNoise(ctx, t, 1.1, 'highpass', 2500, 1500, 1, 0.15); this.bNoise(ctx, t, 1.1, 'lowpass', 600, 600, 1, 0.2); break; // marble-rock waterfall
        case 'godavari': this.bNoise(ctx, t, 1.0, 'bandpass', 1000, 1000, 1.5, 0.2, 12); this.bBubbles(ctx, t, 5, 600, 400, 0.8); break;
        case 'kaveri': this.bNoise(ctx, t, 1.2, 'lowpass', 3000, 1200, 0.7, 0.25); this.bBubbles(ctx, t, 10, 900, 900, 1.1); break;
        // Animals
        case 'khadgi': this.bNoise(ctx, t, 0.25, 'lowpass', 900, 300, 2, 0.4); this.bNoise(ctx, t + 0.35, 0.3, 'lowpass', 800, 250, 2, 0.4); break; // snort
        case 'vyaghra': this.bTone(ctx, t, 0.9, 'sawtooth', 110, 70, 0.14, 18); this.bNoise(ctx, t, 0.9, 'lowpass', 400, 200, 1, 0.15); break; // growl
        case 'simha': this.bTone(ctx, t, 1.1, 'sawtooth', 160, 70, 0.18, 7); this.bNoise(ctx, t, 1.1, 'lowpass', 700, 200, 1, 0.2); break; // roar
        case 'gaja': this.bTone(ctx, t, 0.8, 'square', 420, 620, 0.09, 9); this.bTone(ctx, t + 0.05, 0.75, 'sawtooth', 840, 1100, 0.04); break; // trumpet
        case 'himacitraka': this.bTone(ctx, t, 0.5, 'triangle', 300, 220, 0.1, 5); this.bNoise(ctx, t + 0.3, 0.7, 'highpass', 3000, 2000, 1, 0.08); break; // soft chuff + snow wind
        case 'ushtra': [0, 0.3].forEach((d) => this.bTone(ctx, t + d, 0.25, 'sawtooth', 140, 100, 0.12, 25)); break; // grunt
        // Deserts: dry wind + sand rattle
        case 'maru': this.bNoise(ctx, t, 1.2, 'bandpass', 1500, 2500, 6, 0.18); this.bNoise(ctx, t + 0.2, 0.8, 'highpass', 5000, 5000, 1, 0.08, 25); break;
        case 'kaccha': this.bNoise(ctx, t, 1.0, 'bandpass', 2500, 1200, 8, 0.15); [0, 0.4].forEach((d) => this.bTone(ctx, t + d, 0.3, 'sine', 1200, 1000, 0.04)); break;
        // Forests: birds + leaves
        case 'sundaravana': this.bNoise(ctx, t, 1.0, 'highpass', 3000, 4000, 1, 0.07, 15); this.bChirp(ctx, t + 0.1, 2200, 3, 0.12); this.bBubbles(ctx, t, 4, 400, 300, 0.9); break;
        case 'giravana': this.bNoise(ctx, t, 0.9, 'highpass', 2500, 2500, 1, 0.08, 20); [0, 0.35].forEach((d) => { this.bTone(ctx, t + d, 0.12, 'sine', 1500, 1100, 0.08); this.bTone(ctx, t + d + 0.14, 0.12, 'sine', 1100, 1500, 0.08); }); break; // peacock-ish
        case 'keralavana': this.bNoise(ctx, t, 1.1, 'highpass', 3500, 3500, 1, 0.08, 18); this.bChirp(ctx, t + 0.1, 3200, 5, 0.08); break;
        case 'himavana': this.bNoise(ctx, t, 1.0, 'highpass', 2000, 3000, 1, 0.07, 12); [0, 0.45].forEach((d) => { this.bTone(ctx, t + d, 0.15, 'sine', 700, 700, 0.09); this.bTone(ctx, t + d + 0.17, 0.2, 'sine', 560, 560, 0.09); }); break; // cuckoo
        default: this.playStrokeChime();
      }
    } catch { /* ignore */ }
  }

  /** Distinct synthesized acoustic call for all 15 Animal Safari creatures (Ages 2-6). */
  playSafariAnimalSound(id: string): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext(); if (!ctx) return;
      const t = ctx.currentTime + 0.02;
      switch (id) {
        case 'cow': // Warm low "Moooo"
          this.bTone(ctx, t, 0.95, 'sawtooth', 148, 124, 0.13, 5);
          this.bTone(ctx, t + 0.04, 0.85, 'triangle', 296, 248, 0.06);
          break;
        case 'lion': // Majestic roar
          this.bTone(ctx, t, 1.05, 'sawtooth', 165, 72, 0.18, 7);
          this.bNoise(ctx, t, 1.0, 'lowpass', 720, 210, 1, 0.18);
          break;
        case 'elephant': // Joyful brassy trumpet
          this.bTone(ctx, t, 0.8, 'square', 410, 640, 0.09, 9);
          this.bTone(ctx, t + 0.05, 0.72, 'sawtooth', 820, 1120, 0.045);
          break;
        case 'mouse': // Cute tiny "cheep-cheep-cheep"
          [0, 0.13, 0.26].forEach((d) => this.bTone(ctx, t + d, 0.08, 'sine', 2350, 3150, 0.08));
          break;
        case 'peacock': // Classic "ke-kaa!" sweep
          [0, 0.36].forEach((d) => {
            this.bTone(ctx, t + d, 0.13, 'sine', 1560, 1080, 0.09);
            this.bTone(ctx, t + d + 0.14, 0.15, 'sine', 1080, 1620, 0.09);
          });
          break;
        case 'frog': // Bouncy pond "ribbit-ribbit"
          [0, 0.28].forEach((d) => {
            this.bTone(ctx, t + d, 0.14, 'sawtooth', 175, 330, 0.12, 22);
          });
          break;
        case 'crow': // Raspy "caw! caw!"
          [0, 0.28].forEach((d) => {
            this.bTone(ctx, t + d, 0.18, 'sawtooth', 540, 380, 0.1, 28);
            this.bNoise(ctx, t + d, 0.16, 'bandpass', 1100, 800, 4, 0.08);
          });
          break;
        case 'dog': // Friendly "bow-wow!"
          [0, 0.24].forEach((d, idx) => {
            this.bTone(ctx, t + d, 0.15, 'triangle', idx === 0 ? 360 : 390, 185, 0.16);
            this.bNoise(ctx, t + d, 0.1, 'bandpass', 900, 450, 3, 0.12);
          });
          break;
        case 'monkey': // Playful "oo-oo-aa-aa!" chatter
          [0, 0.14, 0.28, 0.44].forEach((d, i) => {
            const base = i < 2 ? 480 : 680;
            this.bTone(ctx, t + d, 0.11, 'triangle', base, base * 1.45, 0.12);
          });
          break;
        case 'tiger': // Deep rumbling growl
          this.bTone(ctx, t, 0.9, 'sawtooth', 112, 68, 0.15, 18);
          this.bNoise(ctx, t, 0.85, 'lowpass', 420, 190, 1, 0.15);
          break;
        case 'deer': // Gentle soft bleat + light hop
          this.bTone(ctx, t, 0.35, 'triangle', 640, 520, 0.1, 10);
          this.bTone(ctx, t + 0.42, 0.08, 'sine', 320, 180, 0.08);
          break;
        case 'bear': // Warm low "grrumph"
          this.bTone(ctx, t, 0.65, 'sawtooth', 98, 74, 0.15, 12);
          this.bNoise(ctx, t, 0.55, 'lowpass', 320, 160, 1.5, 0.14);
          break;
        case 'snake': // Crisp sibilant "ssssss"
          this.bNoise(ctx, t, 0.8, 'highpass', 4200, 5800, 1.2, 0.14, 16);
          break;
        case 'crocodile': // River splash + crisp jaw "snap-snap"
          this.bBubbles(ctx, t, 5, 420, 360, 0.45);
          [0.18, 0.36].forEach((d) => this.bNoise(ctx, t + d, 0.07, 'bandpass', 1400, 400, 2, 0.32));
          break;
        case 'fox': // Quick playful "yip-yip!"
          [0, 0.18].forEach((d) => this.bTone(ctx, t + d, 0.11, 'triangle', 760, 1280, 0.11));
          break;
        default:
          this.playStrokeChime();
      }
    } catch { /* ignore */ }
  }

  /** Distinct synthesized sound for Bug Garden, Bird Sky, and Flower Garden items. */
  playNatureCreatureSound(id: string): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext(); if (!ctx) return;
      const t = ctx.currentTime + 0.02;
      switch (id) {
        // Bugs
        case 'bee':
          this.bTone(ctx, t, 0.65, 'sawtooth', 215, 235, 0.08, 28);
          break;
        case 'mosquito':
          this.bTone(ctx, t, 0.55, 'sawtooth', 590, 650, 0.05, 24);
          break;
        case 'fly':
          this.bTone(ctx, t, 0.45, 'sawtooth', 185, 210, 0.07, 30);
          break;
        case 'cricket':
          [0, 0.12, 0.24, 0.48, 0.6].forEach((d) => this.bTone(ctx, t + d, 0.06, 'sine', 3800, 4100, 0.06));
          break;
        case 'firefly':
          [660, 880, 1320].forEach((f, i) => this.bTone(ctx, t + i * 0.1, 0.22, 'sine', f, f * 1.05, 0.07));
          break;
        case 'butterfly':
        case 'ladybug':
        case 'ant':
        case 'spider':
          [523, 659, 784].forEach((f, i) => this.bTone(ctx, t + i * 0.07, 0.16, 'triangle', f, f * 1.1, 0.07));
          break;
        // Birds
        case 'cuckoo': // Sweet spring "kuhu-kuhu!"
          [0, 0.42].forEach((d) => {
            this.bTone(ctx, t + d, 0.14, 'sine', 680, 720, 0.1);
            this.bTone(ctx, t + d + 0.16, 0.2, 'sine', 860, 920, 0.11);
          });
          break;
        case 'owl': // Night "hoo-hoo"
          [0, 0.34].forEach((d, i) => this.bTone(ctx, t + d, i === 0 ? 0.22 : 0.34, 'sine', 390, 340, 0.12, 6));
          break;
        case 'hen': // Rooster "cock-a-doodle-doo!"
          [520, 660, 580, 840, 620].forEach((f, i) => this.bTone(ctx, t + i * 0.11, i === 4 ? 0.32 : 0.1, 'triangle', f, i === 4 ? 460 : f * 1.08, 0.1));
          break;
        case 'parrot':
          [0, 0.2].forEach((d) => this.bTone(ctx, t + d, 0.13, 'sawtooth', 950, 1450, 0.07, 18));
          break;
        case 'pigeon': // Soft "coo-coo"
          [0, 0.28].forEach((d) => this.bTone(ctx, t + d, 0.22, 'sine', 440, 370, 0.1, 14));
          break;
        case 'sparrow':
          this.bChirp(ctx, t, 2700, 4, 0.1);
          break;
        case 'eagle':
          this.bTone(ctx, t, 0.55, 'sine', 1950, 1320, 0.08, 10);
          break;
        case 'swan':
        case 'crane':
          this.bBubbles(ctx, t, 6, 520, 400, 0.55);
          break;
        // Flowers (gentle blooming harp shimmer)
        default:
          [587.3, 739.9, 880, 1174.6].forEach((f, i) => this.bTone(ctx, t + i * 0.07, 0.25, 'sine', f, f, 0.07));
          break;
      }
    } catch { /* ignore */ }
  }

  /** Distinct synthesized culinary acoustic sound for each of the 12 spices. */
  playSpiceSound(id: string): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext(); if (!ctx) return;
      const t = ctx.currentTime + 0.02;
      switch (id) {
        case 'cumin': // Sizzle Seed: delicious hot ghee sizzle & crackle
          this.bNoise(ctx, t, 0.55, 'bandpass', 2800, 3200, 2, 0.18);
          [0.05, 0.14, 0.22].forEach((d) => this.bTone(ctx, t + d, 0.04, 'triangle', 920, 1400, 0.08));
          break;
        case 'mustard': // Pop Seed: rapid crackling pop-pop-pop!
          [0, 0.05, 0.11, 0.18, 0.25].forEach((d) => this.bTone(ctx, t + d, 0.035, 'sine', 1300, 380, 0.18));
          break;
        case 'pepper': // Warm Spice: ratchet pepper mill grind crunch
          [0, 0.07, 0.14, 0.21].forEach((d) => this.bNoise(ctx, t + d, 0.06, 'bandpass', 1900, 650, 4, 0.22));
          break;
        case 'cardamom': // Sweet Pod: sweet dessert bell shimmer
          [659.25, 783.99, 987.77, 1318.5].forEach((f, i) => this.bTone(ctx, t + i * 0.06, 0.35, 'sine', f, f, 0.08));
          break;
        case 'clove': // Flower Bud: deep aromatic woody chime
          this.bTone(ctx, t, 0.42, 'triangle', 440, 440, 0.14);
          this.bTone(ctx, t + 0.04, 0.35, 'sine', 880, 880, 0.08);
          break;
        case 'cinnamon': // Sweet Bark: warm woody snap
          this.bTone(ctx, t, 0.15, 'triangle', 320, 160, 0.2);
          this.bNoise(ctx, t, 0.08, 'bandpass', 1200, 400, 3, 0.15);
          break;
        case 'coriander': // Fresh Herb: crisp leafy rustle & sweet seed chime
          this.bNoise(ctx, t, 0.35, 'highpass', 3500, 3000, 1, 0.09);
          this.bTone(ctx, t + 0.08, 0.1, 'sine', 1200, 1600, 0.08);
          break;
        case 'fenugreek': // Green Leaf: fresh herb garden chime
          [523.25, 659.25, 783.99].forEach((f, i) => this.bTone(ctx, t + i * 0.07, 0.28, 'sine', f, f, 0.08));
          break;
        case 'ginger': // Cozy Root: warm root sizzle & zest snap
          this.bTone(ctx, t, 0.16, 'triangle', 290, 180, 0.16);
          this.bNoise(ctx, t + 0.04, 0.35, 'bandpass', 2400, 1800, 2, 0.14);
          break;
        case 'hing': // Tiny Pinch: magical fairy spice dust twinkle
          [1046.5, 1318.5, 1567.98, 2093].forEach((f, i) => this.bTone(ctx, t + i * 0.05, 0.25, 'sine', f, f * 1.05, 0.07));
          break;
        case 'garlic': // White Bulb: gentle plop & cooking bubble
          this.bTone(ctx, t, 0.12, 'sine', 240, 480, 0.12);
          this.bBubbles(ctx, t + 0.05, 4, 550, 400, 0.35);
          break;
        case 'cover': // Game Cover: cheerful festive fanfare
          [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.bTone(ctx, t + i * 0.07, 0.3, 'sine', f, f, 0.1));
          break;
        default:
          this.playStrokeChime();
      }
    } catch { /* ignore */ }
  }

  /** Bubbling cooking kadai sizzle when dropping a spice into the pot */
  playCookingSizzle(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext(); if (!ctx) return;
      const t = ctx.currentTime + 0.02;
      this.bBubbles(ctx, t, 8, 480, 450, 0.6);
      this.bNoise(ctx, t, 0.65, 'bandpass', 2600, 2100, 2, 0.16);
      [0.08, 0.18, 0.28].forEach((d) => this.bTone(ctx, t + d, 0.05, 'triangle', 880, 1320, 0.07));
    } catch { /* ignore */ }
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

  /**
   * Preschool Delight: Bubbly tactile pop when picking fruits, popping colors or touching stars
   */
  playBubblePop(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(1180, now + 0.07);
      gain.gain.setValueAtTime(0.26, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  /**
   * Preschool Delight: Double bubbly fruit harvest pop
   */
  playFruitHarvestPop(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [420, 840].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.07;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.6, start + 0.06);
        gain.gain.setValueAtTime(0.22, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.09);
      });
    } catch {}
  }

  /**
   * Preschool Instrument: Resonant Sacred Temple Bell (Ghanta / घण्टा)
   */
  playTempleBell(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Fundamental + Inharmonic Bell Partials (1046Hz, 2093Hz, 3135Hz)
      const partials = [
        { freq: 1046.5, gain: 0.35, decay: 1.4 },
        { freq: 2093.0, gain: 0.22, decay: 0.9 },
        { freq: 3135.9, gain: 0.14, decay: 0.5 },
      ];
      partials.forEach((p) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(p.freq, now);
        gain.gain.setValueAtTime(p.gain, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + p.decay);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + p.decay + 0.05);
      });
    } catch {}
  }

  /**
   * Preschool Instrument: Shiva's Sacred Drum (Damaru / डमरू - rapid twin slap)
   */
  playDamaruBeat(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [0, 0.1].forEach((delay, idx) => {
        const t = now + delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const startFreq = idx === 0 ? 380 : 340;
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(90, t + 0.06);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.08);
      });
    } catch {}
  }

  /**
   * Preschool Instrument: Sacred Ocean Conch (Shankha / शङ्खः - deep resonant horn call)
   */
  playShankhaConch(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = 1.2;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      // Low horn swell and bend (approx D3 / 146Hz rising to 164Hz)
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(165, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(146, now + dur);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.linearRampToValueAtTime(900, now + 0.4);
      filter.frequency.exponentialRampToValueAtTime(320, now + dur);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.05);
    } catch {}
  }


  /** Vīṇā: plucked string (Karplus-Strong) with sympathetic drone, a short Sa-Pa-Sa phrase */
  playVeenaPluck(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const pluck = (freq: number, t: number, vol: number, dur = 1.6) => {
        const sr = ctx.sampleRate;
        const len = Math.floor(sr * dur);
        const buf = ctx.createBuffer(1, len, sr);
        const d = buf.getChannelData(0);
        const period = Math.max(2, Math.round(sr / freq));
        const ring = new Float32Array(period);
        for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
        let idx = 0;
        for (let i = 0; i < len; i++) {
          const next = (idx + 1) % period;
          const v = 0.4985 * (ring[idx] + ring[next]);
          d[i] = ring[idx];
          ring[idx] = v;
          idx = next;
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        // slight meend (pitch bend) typical of vīṇā
        src.playbackRate.setValueAtTime(1, t);
        src.playbackRate.linearRampToValueAtTime(1.03, t + 0.25);
        src.playbackRate.linearRampToValueAtTime(1, t + 0.5);
        const bodyF = ctx.createBiquadFilter();
        bodyF.type = 'peaking'; bodyF.frequency.value = 900; bodyF.Q.value = 1.2; bodyF.gain.value = 6;
        const g = ctx.createGain();
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        src.connect(bodyF); bodyF.connect(g); g.connect(ctx.destination);
        src.start(t); src.stop(t + dur);
      };
      pluck(146.8, now, 0.5);        // Sa (D3)
      pluck(220, now + 0.38, 0.45);  // Pa (A3)
      pluck(293.7, now + 0.76, 0.45, 1.8); // Tār Sa (D4)
      pluck(73.4, now, 0.18, 2.4);   // drone string
    } catch {}
  }

  /** Mṛdaṅga: tuned two-headed drum, "dhim – ta – ki – ṭa" */
  playMridangaBeat(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const tone = (t: number, f0: number, f1: number, dur: number, vol: number) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + dur + 0.02);
      };
      const slap = (t: number, freq: number, dur: number, vol: number) => {
        const len = Math.floor(ctx.sampleRate * dur);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
        const src = ctx.createBufferSource(); src.buffer = buf;
        const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 3;
        const g = ctx.createGain(); g.gain.value = vol;
        src.connect(bp); bp.connect(g); g.connect(ctx.destination); src.start(t);
      };
      // dhim: bass head boom + ringing treble
      tone(now, 120, 70, 0.6, 0.6); tone(now, 440, 430, 0.5, 0.18); slap(now, 900, 0.05, 0.3);
      // ta: sharp ringing treble
      tone(now + 0.28, 520, 505, 0.35, 0.3); slap(now + 0.28, 2500, 0.04, 0.35);
      // ki: muted tap
      slap(now + 0.46, 1800, 0.05, 0.4); tone(now + 0.46, 600, 560, 0.08, 0.15);
      // ṭa: muted tap
      slap(now + 0.6, 1400, 0.05, 0.4); tone(now + 0.6, 480, 450, 0.1, 0.15);
      // closing dhim
      tone(now + 0.82, 120, 65, 0.7, 0.55); tone(now + 0.82, 440, 430, 0.6, 0.18);
    } catch {}
  }

  /** Mañjīrā: two small hand cymbals striking — bright inharmonic ring, "chink-chink" */
  playManjiraChink(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const hit = (t: number, vol: number) => {
        [2093, 3140, 4410, 5530, 6980].forEach((f, i) => {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = 'sine'; o.frequency.value = f * (1 + (Math.random() - 0.5) * 0.004);
          g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol / (i + 1.5), t + 0.002);
          g.gain.exponentialRampToValueAtTime(0.0008, t + 1.1 - i * 0.12);
          o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 1.2);
        });
        const len = Math.floor(ctx.sampleRate * 0.06);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
        const src = ctx.createBufferSource(); src.buffer = buf;
        const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 5000;
        const g = ctx.createGain(); g.gain.value = vol * 0.8;
        src.connect(hp); hp.connect(g); g.connect(ctx.destination); src.start(t);
      };
      hit(now, 0.35); hit(now + 0.42, 0.3);
    } catch {}
  }

  /** Śaṅkha: breathy conch horn with swell and vibrato */
  playShankhaHorn(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = 2.2;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.linearRampToValueAtTime(0.22, now + 0.35);
      master.gain.setValueAtTime(0.22, now + dur - 0.6);
      master.gain.exponentialRampToValueAtTime(0.001, now + dur);
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
      lp.frequency.setValueAtTime(400, now); lp.frequency.linearRampToValueAtTime(1400, now + 0.5); lp.frequency.linearRampToValueAtTime(800, now + dur);
      const vib = ctx.createOscillator(); const vibG = ctx.createGain(); vib.frequency.value = 5; vibG.gain.value = 3;
      vib.connect(vibG);
      [[1, 'sawtooth', 0.6], [1.004, 'sawtooth', 0.4], [2, 'triangle', 0.25]].forEach(([m, type, v]) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = type as OscillatorType;
        o.frequency.setValueAtTime(155 * (m as number), now);
        o.frequency.linearRampToValueAtTime(175 * (m as number), now + 0.4);
        o.frequency.linearRampToValueAtTime(170 * (m as number), now + dur);
        vibG.connect(o.frequency);
        g.gain.value = v as number;
        o.connect(g); g.connect(lp); o.start(now); o.stop(now + dur + 0.05);
      });
      // breath noise
      const len = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const n = ctx.createBufferSource(); n.buffer = buf;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1200; bp.Q.value = 0.8;
      const ng = ctx.createGain(); ng.gain.value = 0.05;
      n.connect(bp); bp.connect(ng); ng.connect(master); n.start(now);
      lp.connect(master); master.connect(ctx.destination);
      vib.start(now); vib.stop(now + dur);
    } catch {}
  }

  /**
   * Preschool Delight: Funny cartoon wobble when an animal is tapped
   */
  playAnimalWiggle(): void {
    try {
      this.soundEnabled = true;
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(560, now + 0.06);
      osc.frequency.linearRampToValueAtTime(380, now + 0.12);
      osc.frequency.linearRampToValueAtTime(620, now + 0.18);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } catch {}
  }

  /**
   * RPG Trail: Soft organic stone/moss footstep when stepping between tiles
   */
  playFootstepSoft(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Soft low thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.07);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);

      // Organic rustle transient
      const dur = 0.06;
      const len = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 850;
      filter.Q.value = 1.2;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      src.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      src.start(now);
    } catch {}
  }

  /**
   * RPG Trail: Majestic guttural lion roar for the forest predator goal
   */
  playLionRoar(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = 1.2;

      // Deep oscillating guttural growl
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(130, now + 0.25);
      osc.frequency.linearRampToValueAtTime(65, now + dur);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.linearRampToValueAtTime(750, now + 0.3);
      filter.frequency.linearRampToValueAtTime(200, now + dur);
      filter.Q.value = 4.5;

      oscGain.gain.setValueAtTime(0.01, now);
      oscGain.gain.linearRampToValueAtTime(0.35, now + 0.15);
      oscGain.gain.setValueAtTime(0.32, now + 0.6);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.05);

      // Breathy roar noise texture
      const len = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const nSrc = ctx.createBufferSource();
      nSrc.buffer = buf;
      const nFilt = ctx.createBiquadFilter();
      nFilt.type = 'bandpass';
      nFilt.frequency.setValueAtTime(600, now);
      nFilt.frequency.linearRampToValueAtTime(900, now + 0.3);
      nFilt.frequency.linearRampToValueAtTime(350, now + dur);
      nFilt.Q.value = 1.8;
      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.02, now);
      nGain.gain.linearRampToValueAtTime(0.18, now + 0.2);
      nGain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      nSrc.connect(nFilt);
      nFilt.connect(nGain);
      nGain.connect(ctx.destination);
      nSrc.start(now);
    } catch {}
  }

  /**
   * RPG Trail: High magical sparkle chime for picking up coins, gems, and scrolls
   */
  playLootPickup(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [1046.5, 1318.51, 1567.98, 2093.0]; // C6, E6, G6, C7

      notes.forEach((freq, idx) => {
        const t = now + idx * 0.055;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      });
    } catch {}
  }

  /**
   * RPG Trail: Retro 8-bit descending crunch buzz when losing a heart
   */
  playHeartDamage(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.setValueAtTime(240, now + 0.06);
      osc.frequency.setValueAtTime(160, now + 0.12);
      osc.frequency.setValueAtTime(90, now + 0.18);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.setValueAtTime(0.25, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.34);
    } catch {}
  }

  /**
   * RPG Trail: Retro 8-bit square-wave RPG victory melody
   */
  playRetro8BitVictory(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Classic 8-bit triumphant victory arpeggio: C5, E5, G5, C6, G5, C6, E6
      const seq = [
        { freq: 523.25, t: 0.00, dur: 0.10 },
        { freq: 659.25, t: 0.10, dur: 0.10 },
        { freq: 783.99, t: 0.20, dur: 0.10 },
        { freq: 1046.50, t: 0.30, dur: 0.14 },
        { freq: 783.99, t: 0.44, dur: 0.09 },
        { freq: 1046.50, t: 0.54, dur: 0.40 },
        { freq: 1318.51, t: 0.54, dur: 0.40 }, // Harmonic top note
      ];

      seq.forEach(({ freq, t, dur }) => {
        const start = now + t;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.18, start);
        gain.gain.setValueAtTime(0.15, start + dur * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur + 0.02);
      });
    } catch {}
  }

  /**
   * RPG Trail: Mystical wind & shimmer whoosh when revealing Fog of War
   */
  playFogReveal(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = 0.35;

      const len = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buf;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(350, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.2);
      filter.frequency.exponentialRampToValueAtTime(700, now + dur);
      filter.Q.value = 2.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start(now);
    } catch {}
  }
}

export const soundEffects = new SoundEffectsEngine();
