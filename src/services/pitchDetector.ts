/**
 * Real-time pitch detection and musical note quantization for PIT STOP Karaoke
 */

export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function freqToMidi(freq: number): number {
  return 69 + 12 * Math.log2(freq / 440);
}

export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function freqToNote(freq: number): { noteName: string; octave: number; cents: number; midi: number } {
  if (freq < 20 || freq > 4000) {
    return { noteName: '--', octave: 0, cents: 0, midi: 0 };
  }
  const midi = freqToMidi(freq);
  const roundedMidi = Math.round(midi);
  const cents = Math.round((midi - roundedMidi) * 100);
  const noteIndex = ((roundedMidi % 12) + 12) % 12;
  const octave = Math.floor(roundedMidi / 12) - 1;
  const noteName = `${NOTE_NAMES[noteIndex]}${octave}`;
  return { noteName, octave, cents, midi: roundedMidi };
}

export function noteNameToFreq(noteStr: string): number {
  // Parses "C4", "F#4", "Ab4"
  const match = noteStr.match(/^([A-G][#b]?)(-?\d+)$/);
  if (!match) return 440;
  let name = match[1];
  const octave = parseInt(match[2], 10);

  // Normalize flats
  const flatMap: Record<string, string> = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
  };
  if (flatMap[name]) name = flatMap[name];

  const noteIndex = NOTE_NAMES.indexOf(name);
  if (noteIndex === -1) return 440;
  const midi = (octave + 1) * 12 + noteIndex;
  return midiToFreq(midi);
}

/**
 * Snap a detected frequency to the nearest note in a specific musical scale
 */
export function quantizeToScale(
  freq: number,
  scaleNotes: string[],
  strength: number = 1.0
): { tunedFreq: number; tunedNote: string; originalCents: number } {
  if (freq < 50 || freq > 3000) {
    return { tunedFreq: freq, tunedNote: '--', originalCents: 0 };
  }

  const { noteName, midi } = freqToNote(freq);
  const rawMidi = freqToMidi(freq);

  // Filter allowed MIDI notes matching the scale letter names
  // Test +/- 3 semitones around current midi
  let bestMidi = midi;
  let minDiff = 999;

  for (let offset = -4; offset <= 4; offset++) {
    const candidateMidi = midi + offset;
    const candNoteIdx = ((candidateMidi % 12) + 12) % 12;
    const candName = NOTE_NAMES[candNoteIdx];
    if (scaleNotes.includes(candName)) {
      const diff = Math.abs(rawMidi - candidateMidi);
      if (diff < minDiff) {
        minDiff = diff;
        bestMidi = candidateMidi;
      }
    }
  }

  const targetFreq = midiToFreq(bestMidi);
  // Interpolate based on autotune strength
  // strength 1.0 = hard snap, strength 0.5 = mild correction
  const tunedFreq = freq * Math.pow(targetFreq / freq, Math.min(1, Math.max(0, strength)));
  const tunedInfo = freqToNote(targetFreq);

  return {
    tunedFreq,
    tunedNote: tunedInfo.noteName,
    originalCents: Math.round((rawMidi - bestMidi) * 100),
  };
}

/**
 * High-performance autocorrelation pitch detector for live microphone input
 */
export function autoCorrelate(
  buffer: any,
  sampleRate: number
): { frequency: number | null; confidence: number } {
  const SIZE = buffer.length;
  let rms = 0;

  for (let i = 0; i < SIZE; i++) {
    const val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);

  // Noise floor threshold (singer must actually sing)
  if (rms < 0.015) {
    return { frequency: null, confidence: 0 };
  }

  // Trim quiet edges
  let r1 = 0;
  let r2 = SIZE - 1;
  const thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < thres) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < thres) {
      r2 = SIZE - i;
      break;
    }
  }

  const buf = buffer.slice(r1, r2);
  const c = new Float32Array(buf.length);

  for (let i = 0; i < buf.length; i++) {
    for (let j = 0; j < buf.length - i; j++) {
      c[i] += buf[j] * buf[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;
  let maxval = -1;
  let maxpos = -1;

  for (let i = d; i < buf.length; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  if (maxpos === -1 || maxval === 0) {
    return { frequency: null, confidence: 0 };
  }

  // Parabolic interpolation for sub-bin precision
  let T0 = maxpos;
  const x1 = c[T0 - 1] ?? 0;
  const x2 = c[T0];
  const x3 = c[T0 + 1] ?? 0;
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a !== 0) {
    T0 = T0 - b / (2 * a);
  }

  const freq = sampleRate / T0;
  const confidence = Math.min(1, maxval / c[0]);

  // Valid human vocal range filter: 65Hz (C2) to 1200Hz (D6)
  if (freq >= 65 && freq <= 1200 && confidence > 0.4) {
    return { frequency: freq, confidence };
  }

  return { frequency: null, confidence: 0 };
}
