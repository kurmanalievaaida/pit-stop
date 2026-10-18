import { AudioEffectSettings, PitchCorrectionMode, Song } from '../types';
import { autoCorrelate, quantizeToScale, noteNameToFreq, freqToNote } from './pitchDetector';

class PitStopAudioEngine {
  private ctx: AudioContext | null = null;
  private micStream: MediaStream | null = null;
  private micSource: MediaStreamAudioSourceNode | null = null;

  // Vocal Processing Nodes
  private micGain: GainNode | null = null;
  private highpassFilter: BiquadFilterNode | null = null;
  private clarityFilter: BiquadFilterNode | null = null;
  private autoTuneFilter: BiquadFilterNode | null = null;
  private radioFilter: BiquadFilterNode | null = null;
  private robotModulator: OscillatorNode | null = null;
  private robotGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  // Delay & Reverb
  private delayNode: DelayNode | null = null;
  private delayFeedback: GainNode | null = null;
  private delayMix: GainNode | null = null;
  private reverbConvolver: ConvolverNode | null = null;
  private reverbMix: GainNode | null = null;
  private vocalDryGain: GainNode | null = null;
  private monitorGain: GainNode | null = null;

  // Analyser
  private analyser: AnalyserNode | null = null;
  private analyserBuffer: Float32Array | null = null;

  // Mixed Output for Recording
  private recordDestination: MediaStreamAudioDestinationNode | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  // Music & Playback
  private musicMasterGain: GainNode | null = null;
  private musicOscillators: (AudioScheduledSourceNode | AudioNode)[] = [];
  private isMusicPlaying: boolean = false;
  private musicStartTime: number = 0;
  private musicPauseTime: number = 0;
  private musicTimerId: number | null = null;
  private currentSong: Song | null = null;
  private customAudioElement: HTMLAudioElement | null = null;
  private customAudioSource: MediaElementAudioSourceNode | null = null;

  // Active Settings
  private settings: AudioEffectSettings = {
    pitchCorrectionMode: 'mild',
    autotuneStrength: 0.85,
    reverbAmount: 0.35,
    reverbPreset: 'lounge',
    delayAmount: 0.2,
    delayTime: 0.28,
    warmth: true,
    micVolume: 1.2,
    musicVolume: 1.0,
    monitorLive: false,
  };

  public getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public async initMicrophone(): Promise<boolean> {
    try {
      const ctx = this.getAudioContext();
      if (!this.micStream) {
        this.micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: false,
          },
        });
      }

      this.buildAudioGraph(ctx);
      return true;
    } catch (err) {
      console.warn('Microphone access denied or error:', err);
      return false;
    }
  }

  private buildAudioGraph(ctx: AudioContext) {
    if (!this.micStream) return;

    // Disconnect previous if any
    try {
      this.micSource?.disconnect();
    } catch {
      // ignore
    }

    this.micSource = ctx.createMediaStreamSource(this.micStream);

    // 1. Mic Preamp Gain
    this.micGain = ctx.createGain();
    this.micGain.gain.value = this.settings.micVolume;

    // 2. Analyser for pitch detection & VU metering
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyserBuffer = new Float32Array(this.analyser.fftSize);

    // 3. EQ Filters
    this.highpassFilter = ctx.createBiquadFilter();
    this.highpassFilter.type = 'highpass';
    this.highpassFilter.frequency.value = 85; // cut sub rumble

    this.clarityFilter = ctx.createBiquadFilter();
    this.clarityFilter.type = 'peaking';
    this.clarityFilter.frequency.value = 3200;
    this.clarityFilter.gain.value = 3.5;
    this.clarityFilter.Q.value = 1.2;

    // 4. Autotune resonant formant quantizer
    this.autoTuneFilter = ctx.createBiquadFilter();
    this.autoTuneFilter.type = 'bandpass';
    this.autoTuneFilter.frequency.value = 440;
    this.autoTuneFilter.Q.value = 4.0;

    // 5. Compressor for warmth and vocal dynamics
    this.compressor = ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -22;
    this.compressor.knee.value = 12;
    this.compressor.ratio.value = 5.0;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.25;

    // 6. Vocal Dry & Monitor
    this.vocalDryGain = ctx.createGain();
    this.vocalDryGain.gain.value = 1.0;

    this.monitorGain = ctx.createGain();
    this.monitorGain.gain.value = this.settings.monitorLive ? 0.8 : 0.0;

    // 7. Delay Node
    this.delayNode = ctx.createDelay();
    this.delayNode.delayTime.value = this.settings.delayTime;
    this.delayFeedback = ctx.createGain();
    this.delayFeedback.gain.value = 0.35;
    this.delayMix = ctx.createGain();
    this.delayMix.gain.value = this.settings.delayAmount;

    this.delayNode.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delayNode);
    this.delayNode.connect(this.delayMix);

    // 8. Reverb Convolver & Mix
    this.reverbConvolver = ctx.createConvolver();
    this.createSyntheticImpulseResponse(ctx, this.settings.reverbPreset);
    this.reverbMix = ctx.createGain();
    this.reverbMix.gain.value = this.settings.reverbAmount;
    this.reverbConvolver.connect(this.reverbMix);

    // 9. Mix Bus for recording & master
    this.recordDestination = ctx.createMediaStreamDestination();
    this.musicMasterGain = ctx.createGain();
    this.musicMasterGain.gain.value = this.settings.musicVolume;

    // Connect chain:
    // micSource -> micGain -> analyser (for pitch reading) -> highpass -> clarity -> compressor
    this.micSource.connect(this.micGain);
    this.micGain.connect(this.analyser);
    this.micGain.connect(this.highpassFilter);
    this.highpassFilter.connect(this.clarityFilter);
    this.clarityFilter.connect(this.compressor);

    // From compressor to Dry, Delay, Reverb
    this.compressor.connect(this.vocalDryGain);
    this.compressor.connect(this.delayNode);
    this.compressor.connect(this.reverbConvolver);

    // Merge wet + dry vocal
    const vocalPostBus = ctx.createGain();
    vocalPostBus.gain.value = 1.0;
    this.vocalDryGain.connect(vocalPostBus);
    this.delayMix.connect(vocalPostBus);
    this.reverbMix.connect(vocalPostBus);

    // Send vocal to recording destination
    vocalPostBus.connect(this.recordDestination);

    // Send vocal to live monitor (headphones)
    vocalPostBus.connect(this.monitorGain);
    this.monitorGain.connect(ctx.destination);

    // Send music to recording destination AND to speakers
    this.musicMasterGain.connect(this.recordDestination);
    this.musicMasterGain.connect(ctx.destination);

    this.applyEffects(this.settings);
  }

  private createSyntheticImpulseResponse(ctx: AudioContext, preset: string) {
    if (!this.reverbConvolver) return;
    if (preset === 'off') {
      const buffer = ctx.createBuffer(2, 128, ctx.sampleRate);
      this.reverbConvolver.buffer = buffer;
      return;
    }

    let duration = 1.5;
    let decay = 2.0;

    if (preset === 'booth') {
      duration = 0.8;
      decay = 3.5;
    } else if (preset === 'lounge') {
      duration = 1.6;
      decay = 2.2;
    } else if (preset === 'arena') {
      duration = 3.2;
      decay = 1.4;
    } else if (preset === 'cathedral') {
      duration = 4.5;
      decay = 1.1;
    }

    const rate = ctx.sampleRate;
    const length = rate * duration;
    const impulse = ctx.createBuffer(2, length, rate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const n = length - i;
      const envelope = Math.pow(n / length, decay);
      left[i] = (Math.random() * 2 - 1) * envelope;
      right[i] = (Math.random() * 2 - 1) * envelope;
    }

    this.reverbConvolver.buffer = impulse;
  }

  public applyEffects(settings: AudioEffectSettings) {
    this.settings = { ...settings };
    const ctx = this.ctx;
    if (!ctx) return;

    if (this.micGain) {
      this.micGain.gain.setValueAtTime(settings.micVolume, ctx.currentTime);
    }
    if (this.musicMasterGain) {
      this.musicMasterGain.gain.setValueAtTime(settings.musicVolume, ctx.currentTime);
    }
    if (this.monitorGain) {
      this.monitorGain.gain.setValueAtTime(settings.monitorLive ? 0.8 : 0.0, ctx.currentTime);
    }
    if (this.delayMix && this.delayNode) {
      this.delayMix.gain.setValueAtTime(settings.delayAmount, ctx.currentTime);
      this.delayNode.delayTime.setValueAtTime(settings.delayTime, ctx.currentTime);
    }
    if (this.reverbMix) {
      this.reverbMix.gain.setValueAtTime(settings.reverbAmount, ctx.currentTime);
      this.createSyntheticImpulseResponse(ctx, settings.reverbPreset);
    }

    // Adapt vocal EQ based on mode
    if (this.highpassFilter && this.clarityFilter && this.compressor) {
      if (settings.pitchCorrectionMode === 'radio') {
        this.highpassFilter.frequency.setValueAtTime(450, ctx.currentTime);
        this.clarityFilter.frequency.setValueAtTime(2500, ctx.currentTime);
        this.clarityFilter.gain.setValueAtTime(8, ctx.currentTime);
        this.compressor.threshold.setValueAtTime(-30, ctx.currentTime);
        this.compressor.ratio.setValueAtTime(12, ctx.currentTime);
      } else if (settings.pitchCorrectionMode === 'deep') {
        this.highpassFilter.frequency.setValueAtTime(60, ctx.currentTime);
        this.clarityFilter.frequency.setValueAtTime(300, ctx.currentTime);
        this.clarityFilter.gain.setValueAtTime(6, ctx.currentTime);
      } else {
        this.highpassFilter.frequency.setValueAtTime(85, ctx.currentTime);
        this.clarityFilter.frequency.setValueAtTime(3200, ctx.currentTime);
        this.clarityFilter.gain.setValueAtTime(settings.warmth ? 4.0 : 1.5, ctx.currentTime);
        this.compressor.threshold.setValueAtTime(settings.warmth ? -24 : -18, ctx.currentTime);
        this.compressor.ratio.setValueAtTime(settings.warmth ? 5 : 2.5, ctx.currentTime);
      }
    }
  }

  /**
   * Reads current microphone pitch and volume, quantizing to song key
   */
  public getLivePitch(scaleNotes: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']) {
    if (!this.analyser || !this.analyserBuffer || !this.ctx) {
      return {
        frequency: null,
        noteName: '--',
        cents: 0,
        volume: 0,
        isSinging: false,
        tunedNote: '--',
        tunedFreq: null,
      };
    }

    this.analyser.getFloatTimeDomainData(this.analyserBuffer as any);
    const { frequency, confidence } = autoCorrelate(this.analyserBuffer, this.ctx.sampleRate);

    // Calculate volume RMS
    let sum = 0;
    for (let i = 0; i < this.analyserBuffer.length; i++) {
      sum += this.analyserBuffer[i] * this.analyserBuffer[i];
    }
    const rms = Math.sqrt(sum / this.analyserBuffer.length);
    const volume = Math.min(1, rms * 10); // scaled for VU meter

    if (!frequency || confidence < 0.4 || volume < 0.05) {
      return {
        frequency: null,
        noteName: '--',
        cents: 0,
        volume,
        isSinging: false,
        tunedNote: '--',
        tunedFreq: null,
      };
    }

    const { noteName, cents } = freqToNote(frequency);
    const strength = this.settings.pitchCorrectionMode === 'hard' ? 1.0 : this.settings.autotuneStrength;
    const { tunedFreq, tunedNote } = quantizeToScale(frequency, scaleNotes, strength);

    // If autotune filter is active, steer resonant peak in real-time
    if (this.autoTuneFilter && this.settings.pitchCorrectionMode !== 'off' && tunedFreq) {
      try {
        this.autoTuneFilter.frequency.setTargetAtTime(tunedFreq, this.ctx.currentTime, 0.04);
      } catch {
        // ignore
      }
    }

    return {
      frequency,
      noteName,
      cents,
      volume,
      isSinging: true,
      tunedNote,
      tunedFreq,
    };
  }

  /**
   * Plays the synchronized backing track
   */
  public startBackingTrack(song: Song, onEnded?: () => void) {
    const ctx = this.getAudioContext();
    this.stopBackingTrack();
    this.currentSong = song;

    if (song.isCustom && song.audioUrl) {
      // Custom uploaded song
      this.playCustomAudio(song.audioUrl, onEnded);
      return;
    }

    // Synthesized backing track
    this.isMusicPlaying = true;
    this.musicStartTime = ctx.currentTime;
    this.playSynthesizedArrangement(song, onEnded);
  }

  private playCustomAudio(url: string, onEnded?: () => void) {
    const ctx = this.getAudioContext();
    const audio = new Audio(url);
    audio.crossOrigin = 'anonymous';
    this.customAudioElement = audio;

    const source = ctx.createMediaElementSource(audio);
    this.customAudioSource = source;

    if (this.musicMasterGain) {
      source.connect(this.musicMasterGain);
    }

    audio.onended = () => {
      this.isMusicPlaying = false;
      if (onEnded) onEnded();
    };

    audio.play().catch((err) => {
      console.warn('Custom audio playback failed:', err);
    });
    this.isMusicPlaying = true;
    this.musicStartTime = ctx.currentTime;
  }

  /**
   * Synthesizes full multi-instrument backing track matching BPM, key, and song style
   */
  private playSynthesizedArrangement(song: Song, onEnded?: () => void) {
    const ctx = this.getAudioContext();
    if (!this.musicMasterGain) return;

    const beatInterval = 60 / song.bpm;
    const totalDuration = song.duration;
    const totalBeats = Math.floor(totalDuration / beatInterval);

    // Scale root frequencies
    const chordProgressions: Record<string, number[][]> = {
      'turbo-heart': [
        // Am -> F -> C -> G
        [220, 261.6, 329.6], // Am
        [174.6, 220, 261.6], // F
        [130.8, 164.8, 196], // C
        [196, 246.9, 293.7], // G
      ],
      'midnight-highway': [
        // Em -> G -> D -> A
        [164.8, 196, 246.9],
        [196, 246.9, 293.7],
        [146.8, 185, 220],
        [220, 277.2, 329.6],
      ],
      'pit-stop-serenade': [
        // Cmaj7 -> Am7 -> Dm7 -> G7
        [261.6, 329.6, 392, 493.9],
        [220, 261.6, 329.6, 392],
        [146.8, 174.6, 220, 261.6],
        [196, 246.9, 293.7, 349.2],
      ],
      'drift-and-fire': [
        // Dm -> Bb -> Gm -> A
        [146.8, 174.6, 220],
        [116.5, 146.8, 174.6],
        [196, 233.1, 293.7],
        [220, 277.2, 329.6],
      ],
    };

    const chords = chordProgressions[song.id] || chordProgressions['turbo-heart'];
    const startTime = ctx.currentTime + 0.1;

    for (let beat = 0; beat < totalBeats; beat++) {
      const beatTime = startTime + beat * beatInterval;
      if (beatTime > startTime + totalDuration) break;

      const bar = Math.floor(beat / 4);
      const chord = chords[bar % chords.length];
      const isDownbeat = beat % 4 === 0;
      const isBackbeat = beat % 2 === 1;

      // 1. Kick Drum (beats 0, 2 or four-on-the-floor)
      if (beat % 2 === 0 || song.genre === 'Electronic') {
        this.triggerKick(ctx, beatTime);
      }

      // 2. Snare / Clap (beats 1, 3)
      if (isBackbeat) {
        this.triggerSnare(ctx, beatTime);
      }

      // 3. Hi-Hats (every beat & eighth note)
      this.triggerHiHat(ctx, beatTime, isDownbeat ? 0.25 : 0.12);
      this.triggerHiHat(ctx, beatTime + beatInterval / 2, 0.08);

      // 4. Bass synth (on beats)
      const bassFreq = chord[0] / 2;
      this.triggerBass(ctx, beatTime, bassFreq, beatInterval * 0.8);

      // 5. Synth Pad / Keyboard Chord (every bar)
      if (isDownbeat) {
        this.triggerChord(ctx, beatTime, chord, beatInterval * 3.8);
      }

      // 6. Arpeggio / Lead Accent (16th notes on specific beats)
      const noteToArp = chord[(beat % chord.length)];
      this.triggerArp(ctx, beatTime + beatInterval * 0.5, noteToArp * 2, beatInterval * 0.3);
    }

    // Schedule stop / callback
    const timeoutMs = (totalDuration + 0.5) * 1000;
    this.musicTimerId = window.setTimeout(() => {
      this.isMusicPlaying = false;
      if (onEnded) onEnded();
    }, timeoutMs);
  }

  private triggerKick(ctx: AudioContext, time: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.setValueAtTime(130, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + 0.12);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

    osc.connect(gain);
    if (this.musicMasterGain) gain.connect(this.musicMasterGain);

    osc.start(time);
    osc.stop(time + 0.25);
    this.musicOscillators.push(osc);
  }

  private triggerSnare(ctx: AudioContext, time: number) {
    // Noise buffer
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 800;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    if (this.musicMasterGain) gain.connect(this.musicMasterGain);

    noise.start(time);
    noise.stop(time + 0.16);
    this.musicOscillators.push(noise);
  }

  private triggerHiHat(ctx: AudioContext, time: number, vol: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(7000, time);

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 8500;

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    if (this.musicMasterGain) gain.connect(this.musicMasterGain);

    osc.start(time);
    osc.stop(time + 0.05);
    this.musicOscillators.push(osc);
  }

  private triggerBass(ctx: AudioContext, time: number, freq: number, duration: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, time);
    filter.frequency.exponentialRampToValueAtTime(120, time + duration);

    gain.gain.setValueAtTime(0.4, time);
    gain.gain.linearRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    if (this.musicMasterGain) gain.connect(this.musicMasterGain);

    osc.start(time);
    osc.stop(time + duration);
    this.musicOscillators.push(osc);
  }

  private triggerChord(ctx: AudioContext, time: number, notes: number[], duration: number) {
    notes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.09, time + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      if (this.musicMasterGain) gain.connect(this.musicMasterGain);

      osc.start(time);
      osc.stop(time + duration);
      this.musicOscillators.push(osc);
    });
  }

  private triggerArp(ctx: AudioContext, time: number, freq: number, duration: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    if (this.musicMasterGain) gain.connect(this.musicMasterGain);

    osc.start(time);
    osc.stop(time + duration);
    this.musicOscillators.push(osc);
  }

  public stopBackingTrack() {
    this.isMusicPlaying = false;
    if (this.musicTimerId) {
      clearTimeout(this.musicTimerId);
      this.musicTimerId = null;
    }

    this.musicOscillators.forEach((node) => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop();
        }
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.musicOscillators = [];

    if (this.customAudioElement) {
      this.customAudioElement.pause();
      this.customAudioElement.currentTime = 0;
      this.customAudioElement = null;
    }
  }

  public getCurrentPlaybackTime(): number {
    if (!this.isMusicPlaying || !this.ctx) return 0;
    if (this.customAudioElement) {
      return this.customAudioElement.currentTime;
    }
    return Math.max(0, this.ctx.currentTime - this.musicStartTime);
  }

  public startRecording() {
    if (!this.recordDestination) return;
    this.recordedChunks = [];

    const stream = this.recordDestination.stream;
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
      ? 'audio/ogg;codecs=opus'
      : '';

    try {
      this.mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    } catch {
      this.mediaRecorder = new MediaRecorder(stream);
    }

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.start(100); // 100ms timeslices for smooth collection
  }

  public async stopRecording(): Promise<{ blob: Blob; url: string; waveformPeaks: number[] }> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        const emptyBlob = new Blob([], { type: 'audio/webm' });
        resolve({ blob: emptyBlob, url: '', waveformPeaks: [] });
        return;
      }

      this.mediaRecorder.onstop = async () => {
        const mime = this.mediaRecorder?.mimeType || 'audio/webm';
        const blob = new Blob(this.recordedChunks, { type: mime });
        const url = URL.createObjectURL(blob);

        // Generate waveform peaks
        const peaks = await this.extractWaveformPeaks(blob);
        resolve({ blob, url, waveformPeaks: peaks });
      };

      this.mediaRecorder.stop();
    });
  }

  private async extractWaveformPeaks(blob: Blob): Promise<number[]> {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const ctx = this.getAudioContext();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      const rawData = audioBuffer.getChannelData(0);
      const samples = 60; // 60 bars for visualizer
      const blockSize = Math.floor(rawData.length / samples);
      const peaks: number[] = [];

      for (let i = 0; i < samples; i++) {
        const blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(rawData[blockStart + j]);
        }
        peaks.push(Math.min(1, (sum / blockSize) * 2.5));
      }
      return peaks;
    } catch {
      // Fallback synthetic peaks
      return Array.from({ length: 60 }, () => Math.random() * 0.7 + 0.2);
    }
  }

  public cleanup() {
    this.stopBackingTrack();
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach((track) => track.stop());
      this.micStream = null;
    }
  }
}

export const audioEngine = new PitStopAudioEngine();
