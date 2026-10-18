import React from 'react';
import { Song } from '../types';
import { Music, Play, Plus, Clock, Gauge, Flame, Sparkles } from 'lucide-react';

interface SongSelectorProps {
  songs: Song[];
  selectedSong: Song;
  onSelectSong: (song: Song) => void;
  onOpenCustomModal: () => void;
  isRecordingOrPlaying: boolean;
}

export const SongSelector: React.FC<SongSelectorProps> = ({
  songs,
  selectedSong,
  onSelectSong,
  onOpenCustomModal,
  isRecordingOrPlaying,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-amber-400" />
          <h3 className="font-racing text-sm font-bold uppercase tracking-wide text-zinc-100 sm:text-base">
            Karaoke Track Catalog
          </h3>
        </div>

        <button
          type="button"
          onClick={onOpenCustomModal}
          disabled={isRecordingOrPlaying}
          className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400 transition-all hover:bg-amber-500/20 disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Upload Custom Song</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {songs.map((song) => {
          const isSelected = selectedSong.id === song.id;

          return (
            <div
              key={song.id}
              onClick={() => !isRecordingOrPlaying && onSelectSong(song)}
              className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border p-3.5 transition-all ${
                isSelected
                  ? 'border-amber-500 bg-zinc-900 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                  : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700 hover:bg-zinc-900/60'
              } ${isRecordingOrPlaying ? 'pointer-events-none opacity-60' : ''}`}
            >
              {/* Subtle gradient banner */}
              <div
                className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${song.coverGradient}`}
              />

              <div>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <span className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[10px] font-bold text-zinc-400">
                    {song.genre}
                  </span>
                  <span className="text-[10px] font-bold text-amber-400">
                    {song.tag}
                  </span>
                </div>

                <h4 className="font-racing text-sm font-bold text-zinc-100 group-hover:text-amber-300">
                  {song.title}
                </h4>
                <p className="line-clamp-1 text-xs text-zinc-400">{song.artist}</p>
              </div>

              {/* Stats Footer */}
              <div className="mt-3 flex items-center justify-between border-t border-zinc-800/60 pt-2 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-zinc-400" />
                  <span>{song.duration}s</span>
                </span>
                <span className="font-mono text-zinc-400">
                  {song.scaleKey}
                </span>
                <span
                  className={`rounded px-1 text-[9px] font-bold uppercase ${
                    song.difficulty === 'Easy'
                      ? 'bg-emerald-950/60 text-emerald-400'
                      : song.difficulty === 'Medium'
                      ? 'bg-amber-950/60 text-amber-400'
                      : 'bg-red-950/60 text-red-400'
                  }`}
                >
                  {song.difficulty}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
