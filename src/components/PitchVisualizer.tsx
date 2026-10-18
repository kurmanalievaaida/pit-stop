import React, { useRef, useEffect } from 'react';
import { LyricWord, Song } from '../types';
import { freqToMidi, midiToFreq, NOTE_NAMES } from '../services/pitchDetector';
import { Zap, Activity, Award } from 'lucide-react';

interface PitchVisualizerProps {
  currentTime: number;
  currentSong: Song;
  liveFreq: number | null;
  liveNote: string;
  liveCents: number;
  isSinging: boolean;
  tunedNote: string;
  autotuneActive: boolean;
  accuracyScore: number;
  combo: number;
  lastHitGrade: 'PERFECT' | 'GREAT' | 'GOOD' | 'OFF' | null;
}

export const PitchVisualizer: React.FC<PitchVisualizerProps> = ({
  currentTime,
  currentSong,
  liveFreq,
  liveNote,
  liveCents,
  isSinging,
  tunedNote,
  autotuneActive,
  accuracyScore,
  combo,
  lastHitGrade,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pitch trail history for drawing the ribbon
  const pitchHistoryRef = useRef<{ time: number; midi: number; matched: boolean }[]>([]);

  // Collect all words across the song
  const allWords: LyricWord[] = React.useMemo(() => {
    return currentSong.lyrics.flatMap((line) => line.words);
  }, [currentSong]);

  // Record live singing points to ribbon
  useEffect(() => {
    if (isSinging && liveFreq && liveFreq > 60) {
      const midi = freqToMidi(liveFreq);
      pitchHistoryRef.current.push({
        time: currentTime,
        midi,
        matched: lastHitGrade === 'PERFECT' || lastHitGrade === 'GREAT',
      });
      // Keep only last 4 seconds
      if (pitchHistoryRef.current.length > 200) {
        pitchHistoryRef.current.shift();
      }
    }
  }, [currentTime, isSinging, liveFreq, lastHitGrade]);

  // Render Pitch Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    // Visible musical range: MIDI 45 (A2) to MIDI 76 (E5)
    const minMidi = 48; // C3
    const maxMidi = 76; // E5
    const midiRange = maxMidi - minMidi;

    const midiToY = (m: number) => {
      const normalized = (m - minMidi) / midiRange;
      return height - normalized * (height - 30) - 15;
    };

    // Draw horizontal note staff lines
    for (let m = minMidi; m <= maxMidi; m++) {
      const y = midiToY(m);
      const noteIdx = ((m % 12) + 12) % 12;
      const noteLetter = NOTE_NAMES[noteIdx];
      const isC = noteLetter === 'C';
      const inScale = currentSong.scaleNotes.includes(noteLetter);

      ctx.beginPath();
      ctx.strokeStyle = isC
        ? 'rgba(245, 158, 11, 0.25)'
        : inScale
        ? 'rgba(255, 255, 255, 0.07)'
        : 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = isC ? 1.5 : 1;
      ctx.moveTo(35, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      // Note labels on left
      if (inScale || isC) {
        ctx.fillStyle = isC ? '#f59e0b' : '#71717a';
        ctx.font = '10px Space Grotesk, monospace';
        ctx.fillText(`${noteLetter}${Math.floor(m / 12) - 1}`, 6, y + 3);
      }
    }

    // Time window to show: from currentTime - 1.5s to currentTime + 4.5s
    const windowStart = currentTime - 1.2;
    const windowEnd = currentTime + 4.5;
    const windowDuration = windowEnd - windowStart;

    const timeToX = (t: number) => {
      const frac = (t - windowStart) / windowDuration;
      return 35 + frac * (width - 35);
    };

    const currentX = timeToX(currentTime);

    // Draw Now playhead line
    ctx.beginPath();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.moveTo(currentX, 0);
    ctx.lineTo(currentX, height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Target Lyric Note Bars
    allWords.forEach((word) => {
      if (word.endTime < windowStart || word.startTime > windowEnd) return;

      const startX = Math.max(35, timeToX(word.startTime));
      const endX = Math.min(width, timeToX(word.endTime));
      const barWidth = Math.max(8, endX - startX);

      const targetMidi = freqToMidi(word.targetFreq);
      const barY = midiToY(targetMidi) - 7;
      const barHeight = 14;

      const isCurrent = currentTime >= word.startTime && currentTime <= word.endTime;

      // Draw Target bar pill
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(startX, barY, barWidth, barHeight, 5);

      if (isCurrent) {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.45)';
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 10;
      } else {
        ctx.fillStyle = 'rgba(63, 63, 70, 0.6)';
        ctx.strokeStyle = 'rgba(161, 161, 170, 0.4)';
        ctx.lineWidth = 1;
      }
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Word text inside bar if wide enough
      if (barWidth > 24) {
        ctx.fillStyle = isCurrent ? '#fef08a' : '#d4d4d8';
        ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
        ctx.fillText(word.text, startX + 4, barY + 10);
      }
    });

    // Draw Singer's Live Pitch Ribbon Trail
    const trail = pitchHistoryRef.current.filter((p) => p.time >= windowStart && p.time <= currentTime);
    if (trail.length > 1) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < trail.length; i++) {
        const point = trail[i];
        const px = timeToX(point.time);
        const py = midiToY(point.midi);

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }

      ctx.strokeStyle = '#06b6d4'; // Cyan neon vocal trail
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw Singer's Current Live Head Ball
    if (isSinging && liveFreq && liveFreq > 60) {
      const liveMidi = freqToMidi(liveFreq);
      const headY = midiToY(liveMidi);

      ctx.save();
      ctx.beginPath();
      ctx.arc(currentX, headY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 15;
      ctx.fill();

      // Target lock circle
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      ctx.restore();
    }
  }, [currentTime, allWords, currentSong, isSinging, liveFreq, lastHitGrade]);

  return (
    <div className="relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950/90 p-4 shadow-2xl backdrop-blur-md">
      {/* Top telemetry bar */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
        {/* Live Pitch Note Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5">
            <Activity className="h-4 w-4 text-cyan-400" />
            <div className="flex flex-col">
              <span className="text-[9px] font-semibold text-zinc-400">DETECTED PITCH</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-racing text-lg font-bold text-cyan-300">
                  {liveNote !== '--' ? liveNote : 'Listening...'}
                </span>
                {liveNote !== '--' && (
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      Math.abs(liveCents) <= 15
                        ? 'text-emerald-400'
                        : Math.abs(liveCents) <= 30
                        ? 'text-amber-400'
                        : 'text-red-400'
                    }`}
                  >
                    {liveCents >= 0 ? `+${liveCents}` : liveCents}¢
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Autotune Quantizer Notice */}
          {autotuneActive && tunedNote && tunedNote !== '--' && (
            <div className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-300">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-[9px] font-semibold text-amber-400/80">AUTOTUNED TARGET</span>
                <span className="font-racing text-xs font-bold text-amber-300">
                  {liveNote} ➜ <span className="text-amber-400 underline">{tunedNote}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Accuracy & Combo Telemetry */}
        <div className="flex items-center gap-3">
          {/* Hit Grade Badge */}
          {lastHitGrade && (
            <div
              className={`rounded-lg px-2.5 py-1 text-xs font-black tracking-wider uppercase transition-transform animate-bounce ${
                lastHitGrade === 'PERFECT'
                  ? 'border border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                  : lastHitGrade === 'GREAT'
                  ? 'border border-emerald-400 bg-emerald-400/20 text-emerald-300'
                  : lastHitGrade === 'GOOD'
                  ? 'border border-cyan-400 bg-cyan-400/20 text-cyan-300'
                  : 'border border-zinc-700 bg-zinc-800 text-zinc-400'
              }`}
            >
              {lastHitGrade === 'PERFECT' ? '🌟 PERFECT!' : lastHitGrade}
            </div>
          )}

          {/* Combo Multiplier */}
          {combo > 2 && (
            <div className="flex items-center gap-1 rounded-lg border border-red-500/40 bg-red-950/40 px-2 py-1 text-xs font-black text-red-400 shadow-sm">
              <span>🔥</span>
              <span>{combo}x COMBO</span>
            </div>
          )}

          {/* Score Counter */}
          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5">
            <Award className="h-4 w-4 text-amber-400" />
            <div className="flex flex-col text-right">
              <span className="text-[9px] font-semibold text-zinc-400">PIT STOP SCORE</span>
              <span className="font-racing text-base font-bold text-amber-400">
                {Math.round(accuracyScore).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pitch Canvas Container */}
      <div className="relative h-44 w-full overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950 sm:h-52">
        <canvas ref={canvasRef} className="h-full w-full" />

        {/* Pitch Cent Deviation Needle in bottom corner */}
        {isSinging && liveNote !== '--' && (
          <div className="absolute bottom-2 right-2 rounded-lg border border-zinc-800/90 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm">
            <div className="flex items-center gap-1 text-[9px] text-zinc-400">
              <span>FLAT</span>
              <div className="relative h-1.5 w-16 rounded-full bg-zinc-800">
                <div
                  className="absolute top-0 h-1.5 w-2 -translate-x-1/2 rounded-full bg-cyan-400 transition-all duration-75"
                  style={{
                    left: `${Math.max(5, Math.min(95, 50 + (liveCents / 50) * 50))}%`,
                  }}
                />
              </div>
              <span>SHARP</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
