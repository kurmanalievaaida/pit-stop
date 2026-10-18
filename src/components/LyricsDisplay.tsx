import React, { useRef, useEffect } from 'react';
import { LyricLine, LyricWord } from '../types';

interface LyricsDisplayProps {
  lyrics: LyricLine[];
  currentTime: number;
}

export const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ lyrics, currentTime }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Determine active line index
  const activeLineIndex = lyrics.findIndex(
    (line) => currentTime >= line.startTime - 0.4 && currentTime <= line.endTime + 0.3
  );

  const currentLine = activeLineIndex !== -1 ? lyrics[activeLineIndex] : null;
  const nextLine =
    activeLineIndex !== -1 && activeLineIndex + 1 < lyrics.length
      ? lyrics[activeLineIndex + 1]
      : activeLineIndex === -1 && lyrics.length > 0 && currentTime < lyrics[0].startTime
      ? lyrics[0]
      : null;

  return (
    <div className="relative flex min-h-[160px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 p-6 text-center shadow-2xl backdrop-blur-md sm:min-h-[190px]">
      {/* Pit Stop Neon Track Accent */}
      <div className="absolute top-0 left-1/2 h-[2px] w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      {/* When waiting for song to start */}
      {!currentLine && currentTime < (lyrics[0]?.startTime || 0) && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            Get Ready on the Starting Line
          </div>
          <p className="font-racing text-2xl font-bold text-zinc-300">
            Singing starts in {Math.max(0, Math.ceil((lyrics[0]?.startTime || 0) - currentTime))}s...
          </p>
          {lyrics[0] && (
            <p className="text-sm font-medium text-zinc-400 italic">
              First line: "{lyrics[0].fullText}"
            </p>
          )}
        </div>
      )}

      {/* Active Line Display with Word-by-Word Glow & Bouncing Progress */}
      {currentLine && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {currentLine.words.map((word) => {
              const isPast = currentTime > word.endTime;
              const isCurrent = currentTime >= word.startTime && currentTime <= word.endTime;

              // Progress percentage through current word (0 to 100%)
              const progress = isCurrent
                ? Math.min(1, Math.max(0, (currentTime - word.startTime) / (word.endTime - word.startTime))) * 100
                : isPast
                ? 100
                : 0;

              return (
                <div key={word.id} className="relative inline-flex flex-col items-center">
                  {/* Target Note Badge above active word */}
                  <span
                    className={`mb-1 text-[10px] font-mono font-bold tracking-tight transition-opacity ${
                      isCurrent
                        ? 'rounded bg-amber-500/25 px-1.5 py-0.5 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                        : isPast
                        ? 'text-zinc-400 opacity-60'
                        : 'text-zinc-400 opacity-40'
                    }`}
                  >
                    {word.targetNote}
                  </span>

                  {/* Word Text with Karaoke Wipe Animation */}
                  <div className="relative font-racing text-2xl font-black tracking-wide sm:text-3xl lg:text-4xl">
                    {/* Base un-sung text */}
                    <span className={isPast ? 'text-amber-400' : 'text-zinc-400/80'}>
                      {word.text}
                    </span>

                    {/* Active highlight wipe layer */}
                    {isCurrent && (
                      <span
                        className="absolute inset-0 overflow-hidden text-amber-300 glow-amber"
                        style={{ width: `${progress}%` }}
                      >
                        {word.text}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Up Next Preview Line */}
          {nextLine && (
            <div className="pt-2 text-xs font-medium text-zinc-400 sm:text-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Next: </span>
              <span className="italic">{nextLine.fullText}</span>
            </div>
          )}
        </div>
      )}

      {/* Song finished / Outro */}
      {!currentLine && lyrics.length > 0 && currentTime > (lyrics[lyrics.length - 1]?.endTime || 0) && (
        <div className="flex flex-col items-center gap-1 text-emerald-400">
          <span className="text-3xl">🏁</span>
          <p className="font-racing text-2xl font-bold">Checkered Flag! Performance Completed!</p>
          <p className="text-xs text-zinc-400">Calculating your Pit Stop podium score...</p>
        </div>
      )}
    </div>
  );
};
