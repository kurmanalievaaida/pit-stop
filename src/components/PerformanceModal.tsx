import React, { useState, useRef } from 'react';
import { Song, PerformanceStats, AudioEffectSettings } from '../types';
import {
  Trophy,
  Play,
  Pause,
  Share2,
  Download,
  UploadCloud,
  RotateCcw,
  CheckCircle,
  Sparkles,
  Flame,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PerformanceModalProps {
  song: Song;
  audioBlob: Blob;
  audioUrl: string;
  stats: PerformanceStats;
  waveformPeaks: number[];
  settings: AudioEffectSettings;
  onPublishToLeaderboard: (performerName: string, badge: any) => void;
  onOpenShareModal: () => void;
  onClose: () => void;
  onSingAgain: () => void;
}

export const PerformanceModal: React.FC<PerformanceModalProps> = ({
  song,
  audioBlob,
  audioUrl,
  stats,
  waveformPeaks,
  settings,
  onPublishToLeaderboard,
  onOpenShareModal,
  onClose,
  onSingAgain,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [performerName, setPerformerName] = useState<string>('ApexRacer_Vocal');
  const [hasPublished, setHasPublished] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Trigger confetti on mount for high scores
  React.useEffect(() => {
    if (stats.score > 70000) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ef4444', '#06b6d4', '#ffffff'],
      });
    }
  }, [stats.score]);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `PitStop-${song.title.replace(/\s+/g, '_')}-Performance.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const determineBadge = () => {
    if (stats.score >= 95000) return 'Pole Position';
    if (stats.score >= 85000) return 'Apex Vocalist';
    if (stats.score >= 70000) return 'Pit Crew Pro';
    return 'Track Champion';
  };

  const badge = determineBadge();

  const handlePublish = () => {
    if (!performerName.trim() || hasPublished) return;
    onPublishToLeaderboard(performerName.trim(), badge);
    setHasPublished(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-500/30 bg-zinc-950 p-6 shadow-2xl shadow-amber-500/10 sm:p-8">
        {/* Top Checkered flag banner */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500" />

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/15 text-amber-400 shadow-lg shadow-amber-500/20">
            <Trophy className="h-7 w-7" />
          </div>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 uppercase tracking-widest">
            {badge} Finisher
          </span>
          <h2 className="mt-2 font-racing text-2xl font-black uppercase text-white sm:text-3xl">
            Performance Complete!
          </h2>
          <p className="text-xs text-zinc-400 sm:text-sm">
            "{song.title}" • Recorded at PIT STOP Lounge
          </p>
        </div>

        {/* Score & Telemetry Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 text-center">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase">Pit Stop Score</span>
            <div className="font-racing text-xl font-bold text-amber-400 sm:text-2xl">
              {Math.round(stats.score).toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-400">Total Points</span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 text-center">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase">Pitch Accuracy</span>
            <div className="font-racing text-xl font-bold text-cyan-400 sm:text-2xl">
              {Math.round(stats.pitchAccuracy)}%
            </div>
            <span className="text-[10px] text-zinc-400">Scale Precision</span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 text-center">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase">Max Combo</span>
            <div className="font-racing text-xl font-bold text-red-400 sm:text-2xl">
              {stats.maxCombo}x
            </div>
            <span className="text-[10px] text-zinc-400">Streak Notes</span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 text-center">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase">Effects Used</span>
            <div className="font-racing text-sm font-bold text-purple-400 line-clamp-1 sm:text-base">
              {settings.pitchCorrectionMode.toUpperCase()}
            </div>
            <span className="text-[10px] text-zinc-400">
              {settings.reverbPreset.toUpperCase()} Reverb
            </span>
          </div>
        </div>

        {/* Audio Player & Waveform */}
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4">
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayback}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 font-bold text-black transition-transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
            </button>

            {/* Interactive Waveform Display */}
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300">Singing Track Playback</span>
                <span>{Math.round(stats.durationSung)} seconds</span>
              </div>

              <div className="flex h-8 items-center gap-0.5 rounded-lg bg-zinc-950 px-2">
                {waveformPeaks.length > 0 ? (
                  waveformPeaks.slice(0, 48).map((peak, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 rounded-full transition-all ${
                        isPlaying ? 'bg-amber-400' : 'bg-zinc-600'
                      }`}
                      style={{ height: `${Math.max(15, peak * 100)}%` }}
                    />
                  ))
                ) : (
                  <div className="text-center w-full text-[11px] text-zinc-400">Audio Ready</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Performer Name & Leaderboard Submission */}
        <div className="mb-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4">
          <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
            Performer Stage Name for PIT STOP Leaderboard:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={performerName}
              onChange={(e) => setPerformerName(e.target.value)}
              disabled={hasPublished}
              placeholder="Enter your name or racing handle"
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none disabled:opacity-60"
            />

            <button
              onClick={handlePublish}
              disabled={hasPublished || !performerName.trim()}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold uppercase transition-all ${
                hasPublished
                  ? 'border border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:opacity-90 active:scale-95'
              }`}
            >
              {hasPublished ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Published!</span>
                </>
              ) : (
                <>
                  <UploadCloud className="h-4 w-4" />
                  <span>Submit to Board</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons: Share, Download, Sing Again */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-4">
          <div className="flex gap-2">
            <button
              onClick={onOpenShareModal}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-all hover:bg-zinc-700 active:scale-95"
            >
              <Share2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>Share Cover</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-all hover:bg-zinc-700 active:scale-95"
            >
              <Download className="h-3.5 w-3.5 text-zinc-400" />
              <span>Download Audio</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onSingAgain}
              className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-400 transition-all hover:bg-amber-500/20 active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Sing Again</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
