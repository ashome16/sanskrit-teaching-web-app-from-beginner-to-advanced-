// Speech Recognition Utility for pronunciation practice

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface SpeechSynthesisOptions {
  text: string;
  language?: string;
  rate?: number;
  pitch?: number;
}

export class SpeechHandler {
  private recognition: any = null;
  private isListening = false;

  constructor() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'sa-IN'; // Sanskrit language code
    }
  }

  startListening(
    onResult: (result: SpeechRecognitionResult) => void,
    onError: (error: string) => void
  ): void {
    if (!this.recognition) {
      onError('Speech Recognition not supported in this browser');
      return;
    }

    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      let confidence = 0;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          confidence = event.results[i][0].confidence;
        }
      }

      onResult({
        transcript,
        confidence,
        isFinal: event.results[event.results.length - 1].isFinal,
      });
    };

    this.recognition.onerror = (event: any) => {
      const errorCode = event?.error ?? 'unknown error';
      onError(`Speech recognition error: ${errorCode}`);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (error) {
      onError('Error starting speech recognition');
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  isRecognitionSupported(): boolean {
    return this.recognition !== null;
  }
}

export interface AudioRecording {
  blob: Blob;
  url: string;
  duration: number;
  timestamp: number;
}

export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private isRecording = false;

  async startRecording(
    onFrequencyChange?: (frequency: number) => void
  ): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      // Setup audio context for frequency analysis
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      source.connect(this.analyser);

      // Analyze frequencies for visualization
      if (onFrequencyChange) {
        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        const updateFrequency = () => {
          if (this.isRecording && this.analyser) {
            this.analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
            onFrequencyChange(average);
            requestAnimationFrame(updateFrequency);
          }
        };
        updateFrequency();
      }

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.isRecording = true;
      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error starting audio recording:', error);
      throw new Error('Unable to access microphone. Please check browser permissions.');
    }
  }

  async stopRecording(): Promise<AudioRecording | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve(null);
        return;
      }

      this.isRecording = false;

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        const duration = this.audioChunks.length > 0 ? 
          (this.audioChunks[0] as any).size / 16000 : 0; // Approximate duration

        resolve({
          blob: audioBlob,
          url,
          duration,
          timestamp: Date.now(),
        });

        // Stop all tracks
        this.mediaRecorder?.stream.getTracks().forEach(track => track.stop());
      };

      this.mediaRecorder.stop();
    });
  }

  isRecordingSupported(): boolean {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
}

// Devanagari vowel signs (matras) that can carry a visarga's "echo" vowel.
const VOWEL_MATRAS = ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'े', 'ै', 'ो', 'ौ'];
const VOWEL_TO_MATRA: Record<string, string> = {
  'आ': 'ा', 'इ': 'ि', 'ई': 'ी', 'उ': 'ु', 'ऊ': 'ू',
  'ऋ': 'ृ', 'ॠ': 'ॄ', 'ऌ': 'ॢ', 'ॡ': 'ॣ',
  'ए': 'े', 'ऐ': 'ै', 'ओ': 'ो', 'औ': 'ौ',
};

// Some speech engines flatten 'ङ' and 'ढ' into their plain dental look-alikes
// ('na', 'dha' without aspiration); force the correct phonetic sound instead.
const CONSONANT_PHONETIC_HINTS: Record<string, string> = {
  'ङ': 'nga',
  'ढ': 'dha',
};

// Visarga (ः) is a breathy 'h' echo of the preceding vowel, e.g. अर्थः -> अर्थह,
// मातुः -> मातुहु. Voice engines otherwise drop it or mispronounce it silently.
const applyVisargaEcho = (text: string): string => {
  if (!text.endsWith('ः')) return text;
  const base = text.slice(0, -1);
  const lastChar = base[base.length - 1];

  if (VOWEL_MATRAS.includes(lastChar)) {
    return base + 'ह' + lastChar;
  }
  if (VOWEL_TO_MATRA[lastChar]) {
    return base + 'ह' + VOWEL_TO_MATRA[lastChar];
  }
  // Bare consonant (inherent 'a') or the vowel 'अ': 'ह' already carries the 'a' sound.
  return base + 'ह';
};

// Builds the text actually sent to the speech engine for Devanagari input:
// applies the visarga echo, then swaps any ङ/ढ occurrences for their phonetic hint.
const applyPhoneticOverrides = (text: string): string => {
  const withVisargaEcho = applyVisargaEcho(text);
  let result = '';
  for (const ch of withVisargaEcho) {
    result += CONSONANT_PHONETIC_HINTS[ch] ?? ch;
  }
  return result;
};

export class TextToSpeechHandler {
  private synthesis = window.speechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (this.synthesis) {
      this.loadVoices();
      // Voice list loads asynchronously in most browsers
      this.synthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  private loadVoices(): void {
    this.voices = this.synthesis.getVoices();
  }

  // Prefer an Indian-accented voice (Hindi or Indian English) for Sanskrit/Hindi content
  private pickIndianVoice(language: string): SpeechSynthesisVoice | undefined {
    if (this.voices.length === 0) {
      this.loadVoices();
    }

    const baseLang = language.toLowerCase();
    // Sanskrit voices are rarely available; Hindi is the closest phonetic match
    const isSanskritOrHindi = baseLang.startsWith('sa') || baseLang.startsWith('hi');

    const isIndianVoice = (voice: SpeechSynthesisVoice) =>
      voice.lang.toLowerCase().endsWith('-in') ||
      /india|hindi|ravi|lekha|veena|priya/i.test(voice.name);

    if (isSanskritOrHindi) {
      // Exact Hindi voice first
      const hindiVoice = this.voices.find((v) => v.lang.toLowerCase() === 'hi-in');
      if (hindiVoice) return hindiVoice;

      // Any voice explicitly tagged as Indian
      const anyIndianVoice = this.voices.find(isIndianVoice);
      if (anyIndianVoice) return anyIndianVoice;
    } else {
      // For other languages, prefer an Indian-accented voice matching the requested language
      const matchingIndianVoice = this.voices.find(
        (v) => v.lang.toLowerCase().startsWith(baseLang.split('-')[0]) && isIndianVoice(v)
      );
      if (matchingIndianVoice) return matchingIndianVoice;

      // Fall back to any Indian voice at all
      const anyIndianVoice = this.voices.find(isIndianVoice);
      if (anyIndianVoice) return anyIndianVoice;
    }

    return undefined;
  }

  speak(options: SpeechSynthesisOptions): void {
    if (!this.synthesis) {
      console.error('Text-to-Speech not supported');
      alert('Text-to-Speech is not supported in your browser. Please use Chrome, Firefox, or Safari.');
      return;
    }

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const isDevanagariText = /[\u0900-\u097F]/.test(options.text);
    const speechText = isDevanagariText ? applyPhoneticOverrides(options.text) : options.text;
    const utterance = new SpeechSynthesisUtterance(speechText);

    const requestedLanguage = options.language || 'en-US';
    // Sanskrit text is best rendered by a Hindi voice; try Indian voices for all languages
    const effectiveLanguage = requestedLanguage.toLowerCase().startsWith('sa')
      ? 'hi-IN'
      : requestedLanguage;

    const indianVoice = this.pickIndianVoice(effectiveLanguage);
    if (indianVoice) {
      utterance.voice = indianVoice;
      utterance.lang = indianVoice.lang;
    } else {
      utterance.lang = effectiveLanguage;
    }

    utterance.rate = options.rate || 0.8;
    utterance.pitch = options.pitch || 1;
    utterance.volume = 1;

    // Log for debugging
    console.log('Speaking with language:', utterance.lang, 'voice:', utterance.voice?.name, 'Text:', options.text);

    this.synthesis.speak(utterance);
  }

  stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  isSpeechSynthesisSupported(): boolean {
    return this.synthesis !== null;
  }
}

// Helper function to calculate pronunciation accuracy
export const calculatePronunciationAccuracy = (
  userTranscript: string,
  expectedText: string
): number => {
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .trim();

  const user = normalize(userTranscript);
  const expected = normalize(expectedText);

  if (!user || !expected) return 0;

  // Check for exact match
  if (user === expected) {
    return 100;
  }

  // Check if user said any significant words from the expected text
  const expectedWords = expected.split(/\s+/);
  const userWords = user.split(/\s+/);

  // Count how many words from expected are in user's transcript
  let matchingScore = 0;
  for (const expWord of expectedWords) {
    for (const userWord of userWords) {
      // Allow partial matches (e.g., "saraswati" matches "saraswati" or contains it)
      if (expWord.includes(userWord) || userWord.includes(expWord)) {
        // Bonus points for longer matches
        const matchLength = Math.max(expWord.length, userWord.length);
        matchingScore += Math.min(1, matchLength / 10);
        break;
      }
    }
  }

  // Calculate accuracy based on matching words
  const wordMatchAccuracy = (matchingScore / expectedWords.length) * 100;

  // Also calculate Levenshtein distance as fallback
  const maxLength = Math.max(user.length, expected.length);
  if (maxLength === 0) return 0;

  const distance = levenshteinDistance(user, expected);
  const distanceAccuracy = ((maxLength - distance) / maxLength) * 100;

  // Return the higher of the two metrics (favor word match which is more phonetically relevant)
  return Math.max(
    Math.min(100, wordMatchAccuracy * 1.2), // Boost word match
    Math.min(100, Math.max(0, distanceAccuracy))
  );
};

// Levenshtein distance algorithm for string similarity
const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
};
