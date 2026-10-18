import React, { useState } from 'react';
import {
  AudioEffectSettings,
  PitchCorrectionMode,
  ReverbPreset,
} from '../types';
import {
  Sliders,
  Sparkles,
  Volume2,
  Mic,
  Headphones,
  Waves,
  Zap,
  Radio,
  Flame,
  Gauge,
} from 'lucide-react';

interface AudioEffectsConsoleProps {
  settings: AudioEffectSettings;
  onUpdateSettings: (newSettings: AudioEffectSettings) => void;
  liveVolume: number; // 0 to 1
  livePitchNote: string;
  isAutotuning: boolean;
  scaleKey: string;
}

export const AudioEffectsConsole: React.FC<AudioEffectsConsoleProps> = ({
  settings,
  onUpdateSettings,
  liveVolume,
  livePitchNote,
  isAutotuning,
  scaleKey,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [showHeadphoneTip, setShowHeadphoneTip] = useState<boolean>(false);

  const pitchModes: { id: PitchCorrectionMode; label: string; icon: string; desc: string }[] = [
    { id: 'mild', label: 'Studio Autotune', icon: '✨', desc: 'Smooth melodic scale correction' },
    { id: 'hard', label: 'Hard Snap (T-Pain)', icon: '⚡', desc: 'Aggressive instant pitch lock' },
    { id: 'radio', label: 'Pit Crew Radio', icon: '📻', desc: 'Walkie-talkie lo-fi overdrive' },
    { id: 'deep', label: 'Octave Bass', icon: '🏎️', desc: 'Heavy growl & sub harmonic' },
    { id: 'robot', label: 'Robot Synth', icon: '🤖', desc: 'Futuristic electronic vocoder' },
    { id: 'off', label: 'Natural Raw', icon: '🎙️', desc: 'No pitch correction applied' },
  ];

  const reverbPresets: { id: ReverbPreset; label: string }[] = [
    { id: 'off', label: 'Dry' },
    { id: 'booth', label: 'Booth' },
    { id: 'lounge', label: 'Lounge' },
    { id: 'arena', label: 'Arena' },
    { id: 'cathedral', label: 'Cathedral' },
  ];

  const update = (partial: Partial<AudioEffectSettings>) => {
    onUpdateSettings({ ...settings, ...partial });
  };

  const handleToggleMonitor = () => {
    if (!settings.monitorLive) {
      setShowHeadphoneTip(true);
      setTimeout(() => setShowHeadphoneTip(false), 5000);
    }
    update({ monitorLive: !settings.monitorLive });
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl backdrop-blur-md">
      {/* Header with VU Meter */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
            <Sliders className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-racing text-sm font-bold tracking-wide text-zinc-100 uppercase sm:text-base">
              Pit Crew Audio Console
            </h3>
            <p className="text-[11px] text-zinc-400">
              Active Key: <span className="font-semibold text-amber-400">{scaleKey}</span> • Real-time DSP
            </p>
          </div>
        </div>

        {/* Live RPM / Audio VU Meter */}
        <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5">
          <Gauge className="h-4 w-4 text-amber-400" />
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-[10px] text-zinc-400">
              <span>VOCAL RPM</span>
              <span className="font-mono text-amber-400">{Math.round(liveVolume * 8000)}</span>
            </div>
            {/* LED VU Bar */}
            <div className="flex h-2 w-28 items-center gap-0.5 rounded-full bg-zinc-900 p-0.5 sm:w-36">
              {Array.from({ length: 12 }).map((_, i) => {
                const threshold = (i + 1) / 12;
                const active = liveVolume >= threshold;
                const isRed = i >= 9;
                const isYellow = i >= 6 && i < 9;

                return (
                  <div
                    key={i}
                    className={`h-full flex-1 rounded-xs transition-all duration-75 ${
                      active
                        ? isRed
                          ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]'
                          : isYellow
                          ? 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]'
                          : 'bg-emerald-400'
                        : 'bg-zinc-800'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Autotuning Badge */}
          {isAutotuning && settings.pitchCorrectionMode !== 'off' && (
            <div className="flex items-center gap-1 rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300 animate-pulse">
              <Zap className="h-3 w-3" />
              <span>TUNED</span>
            </div>
          )}
        </div>
      </div>

      {/* Headphone Monitor Tip */}
      {showHeadphoneTip && (
        <div className="mb-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-300">
          🎧 <strong>Headphone Recommendation:</strong> Using headphones while live vocal monitoring is enabled prevents microphone feedback echo!
        </div>
      )}

      {/* Pitch Correction Mode Selector */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Vocal Pitch Correction (Autotune)</span>
          </label>
          <span className="text-[11px] font-mono text-zinc-400">
            {settings.pitchCorrectionMode.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {pitchModes.map((mode) => {
            const isSelected = settings.pitchCorrectionMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => update({ pitchCorrectionMode: mode.id })}
                className={`flex flex-col items-center justify-center rounded-xl border p-2 text-center transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/15 text-amber-300 shadow-md shadow-amber-500/10'
                    : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <span className="mb-1 text-base">{mode.icon}</span>
                <span className="text-xs font-bold">{mode.label}</span>
                <span className="mt-0.5 line-clamp-1 text-[9px] text-zinc-400">{mode.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sliders Grid: Autotune Strength, Reverb, Echo, Volumes */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Autotune Strength */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-zinc-300">
            <span>Correction Strength</span>
            <span className="font-mono text-amber-400">{Math.round(settings.autotuneStrength * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            disabled={settings.pitchCorrectionMode === 'off'}
            value={settings.autotuneStrength}
            onChange={(e) => update({ autotuneStrength: parseFloat(e.target.value) })}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-amber-500 disabled:opacity-30"
          />
          <div className="mt-1 flex justify-between text-[10px] text-zinc-400">
            <span>Subtle</span>
            <span>Hard Snap</span>
          </div>
        </div>

        {/* Reverb Space & Mix */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-zinc-300">
            <span className="flex items-center gap-1">
              <Waves className="h-3 w-3 text-cyan-400" />
              <span>Reverb Acoustic</span>
            </span>
            <span className="font-mono text-cyan-400">{Math.round(settings.reverbAmount * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.85"
            step="0.05"
            value={settings.reverbAmount}
            onChange={(e) => update({ reverbAmount: parseFloat(e.target.value) })}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-cyan-500"
          />
          {/* Reverb Presets */}
          <div className="mt-2 flex gap-1">
            {reverbPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => update({ reverbPreset: preset.id })}
                className={`flex-1 rounded py-0.5 text-[9px] font-bold uppercase transition-all ${
                  settings.reverbPreset === preset.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stereo Delay / Echo */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-zinc-300">
            <span className="flex items-center gap-1">
              <Radio className="h-3 w-3 text-purple-400" />
              <span>Vocal Echo / Delay</span>
            </span>
            <span className="font-mono text-purple-400">{Math.round(settings.delayAmount * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.75"
            step="0.05"
            value={settings.delayAmount}
            onChange={(e) => update({ delayAmount: parseFloat(e.target.value) })}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-purple-500"
          />
          <div className="mt-1 flex justify-between text-[10px] text-zinc-400">
            <span>Dry</span>
            <span>280ms Slapback</span>
          </div>
        </div>

        {/* Mixer Volumes & Monitor */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-zinc-300">
                <Mic className="h-3 w-3 text-emerald-400" />
                <span>Mic Gain</span>
              </span>
              <span className="font-mono text-emerald-400">{Math.round(settings.micVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={settings.micVolume}
              onChange={(e) => update({ micVolume: parseFloat(e.target.value) })}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-emerald-500"
            />
          </div>

          <div className="mt-2 flex items-center justify-between gap-2 border-t border-zinc-800/60 pt-2">
            {/* Warmth switch */}
            <button
              type="button"
              onClick={() => update({ warmth: !settings.warmth })}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold transition-all ${
                settings.warmth
                  ? 'border border-amber-500/40 bg-amber-500/15 text-amber-300'
                  : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Flame className="h-3 w-3" />
              <span>Warmth</span>
            </button>

            {/* Monitor switch */}
            <button
              type="button"
              onClick={handleToggleMonitor}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold transition-all ${
                settings.monitorLive
                  ? 'border border-cyan-500/40 bg-cyan-500/20 text-cyan-300'
                  : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Headphones className="h-3 w-3" />
              <span>{settings.monitorLive ? 'Monitor ON' : 'Monitor'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
