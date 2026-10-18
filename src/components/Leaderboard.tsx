import React, { useState, useRef } from 'react';
import { LeaderboardEntry } from '../types';
import { Language, TRANSLATIONS } from '../services/i18n';
import {
  Trophy,
  Heart,
  Play,
  Pause,
  Share2,
  Flame,
  Search,
  Sparkles,
  Crown,
} from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onLikeEntry: (id: string) => void;
  onShareEntry: (entry: LeaderboardEntry) => void;
  language: Language;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  entries,
  onLikeEntry,
  onShareEntry,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [filter, setFilter] = useState<'trending' | 'podium' | 'recent'>('trending');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayCover = (entry: LeaderboardEntry) => {
    if (playingId === entry.id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingId(null);
      return;
    }

    setPlayingId(entry.id);

    if (entry.audioUrl.startsWith('blob:') || entry.audioUrl.startsWith('http')) {
      if (audioRef.current) {
        audioRef.current.src = entry.audioUrl;
        audioRef.current.play().catch(() => {});
      }
    } else {
      playDemoVocalSnippet();
    }
  };

  const playDemoVocalSnippet = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.5);

      setTimeout(() => {
        setPlayingId(null);
      }, 1500);
    } catch {
      setTimeout(() => {
        setPlayingId(null);
      }, 1500);
    }
  };

  const filteredEntries = entries.filter((item) => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesSong = item.songTitle.toLowerCase().includes(query);
      const matchesArtist = item.performerName.toLowerCase().includes(query);
      return matchesSong || matchesArtist;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Hidden audio element for previews */}
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} className="hidden" />

      {/* Top Banner */}
      <div className="rounded-3xl border border-[#394a30] bg-[#222e1c]/95 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <h2 className="font-racing text-2xl font-black uppercase text-white sm:text-3xl">
                {t.leaderboardTitle}
              </h2>
            </div>
            <p className="mt-1 text-xs text-zinc-400 sm:text-sm">{t.leaderboardSubtitle}</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('trending')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                filter === 'trending'
                  ? 'border border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'border border-[#394a30] bg-[#1d2719] text-zinc-300 hover:border-[#4d6342]'
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              <span>{t.leaderboardFilterTrending}</span>
            </button>

            <button
              onClick={() => setFilter('podium')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                filter === 'podium'
                  ? 'border border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'border border-[#394a30] bg-[#1d2719] text-zinc-300 hover:border-[#4d6342]'
              }`}
            >
              <Crown className="h-3.5 w-3.5" />
              <span>{t.leaderboardFilterPodium}</span>
            </button>

            <button
              onClick={() => setFilter('recent')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                filter === 'recent'
                  ? 'border border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'border border-[#394a30] bg-[#1d2719] text-zinc-300 hover:border-[#4d6342]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t.leaderboardFilterRecent}</span>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#394a30] bg-[#182115]/90 px-3 py-2">
          <Search className="h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchSingerPlaceholder}
            className="w-full bg-transparent text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none sm:text-sm"
          />
        </div>
      </div>

      {/* Top 3 Podium Highlights if trending view */}
      {filter === 'trending' && !searchQuery && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {entries.slice(0, 3).map((podiumItem, index) => {
            const isPlayingThis = playingId === podiumItem.id;
            const rankStyles = [
              {
                color: 'text-amber-400',
                border: 'border-amber-500/60',
                bg: 'bg-amber-500/10',
                title: '1st - Gold Vocal',
              },
              {
                color: 'text-zinc-300',
                border: 'border-zinc-400/50',
                bg: 'bg-zinc-400/10',
                title: '2nd - Silver Vocal',
              },
              {
                color: 'text-amber-600',
                border: 'border-amber-700/50',
                bg: 'bg-amber-700/10',
                title: '3rd - Bronze Vocal',
              },
            ][index];

            return (
              <div
                key={podiumItem.id}
                className={`relative overflow-hidden rounded-2xl border ${rankStyles.border} bg-zinc-950/90 p-5 shadow-xl transition-all hover:scale-[1.01]`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`font-racing text-2xl font-black ${rankStyles.color}`}>
                      #{podiumItem.rank}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${rankStyles.bg} ${rankStyles.color}`}
                    >
                      {rankStyles.title}
                    </span>
                  </div>

                  <button
                    onClick={() => onLikeEntry(podiumItem.id)}
                    className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition-all ${
                      podiumItem.hasLiked
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${
                        podiumItem.hasLiked ? 'fill-current text-rose-500' : ''
                      }`}
                    />
                    <span>{podiumItem.likes}</span>
                  </button>
                </div>

                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={podiumItem.performerAvatar}
                    alt={podiumItem.performerName}
                    className="h-12 w-12 rounded-xl object-cover ring-2 ring-zinc-800"
                  />
                  <div>
                    <h4 className="font-racing text-base font-bold text-white line-clamp-1">
                      {podiumItem.songTitle}
                    </h4>
                    <p className="text-xs text-zinc-400">by {podiumItem.performerName}</p>
                    <span className="text-[10px] text-amber-400">{podiumItem.effectPreset}</span>
                  </div>
                </div>

                {/* Score & Play Button */}
                <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
                  <div>
                    <span className="text-[9px] font-semibold text-zinc-400 uppercase">
                      {t.scoreLabel}
                    </span>
                    <div className="font-racing text-lg font-bold text-amber-400">
                      {podiumItem.score.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePlayCover(podiumItem)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 font-bold text-black transition-transform hover:scale-105"
                      title={isPlayingThis ? t.pauseSample : t.playSample}
                    >
                      {isPlayingThis ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => onShareEntry(podiumItem)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white"
                      title={t.shareBtn}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Leaderboard Table */}
      <div className="overflow-hidden rounded-2xl border border-[#394a30] bg-[#222e1c]/95 shadow-xl">
        <div className="divide-y divide-[#394a30]">
          {filteredEntries.map((entry) => {
            const isPlaying = playingId === entry.id;

            return (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 transition-colors hover:bg-[#2a3824]/60 sm:px-6"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    className={`font-racing text-base font-bold sm:text-lg ${
                      entry.rank === 1
                        ? 'text-amber-400'
                        : entry.rank === 2
                        ? 'text-zinc-300'
                        : entry.rank === 3
                        ? 'text-amber-600'
                        : 'text-zinc-500'
                    }`}
                  >
                    #{entry.rank}
                  </span>

                  <img
                    src={entry.performerAvatar}
                    alt={entry.performerName}
                    className="h-10 w-10 rounded-xl object-cover ring-1 ring-zinc-800"
                  />

                  <div>
                    <h4 className="font-racing text-sm font-bold text-white sm:text-base">
                      {entry.songTitle}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {entry.performerName} •{' '}
                      <span className="text-[10px] text-zinc-500">{entry.recordedAt}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-6">
                  {/* Accuracy & Score */}
                  <div className="text-right">
                    <div className="font-racing text-sm font-bold text-amber-400 sm:text-base">
                      {entry.score.toLocaleString()}{' '}
                      <span className="text-[10px] text-zinc-500">{t.scoreLabel}</span>
                    </div>
                    <p className="text-[10px] text-emerald-400 font-semibold">
                      {entry.accuracy}% {t.accuracyLabel}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePlayCover(entry)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                        isPlaying
                          ? 'bg-amber-500 text-black'
                          : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="h-3.5 w-3.5" />
                      ) : (
                        <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => onLikeEntry(entry.id)}
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                        entry.hasLiked
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          entry.hasLiked ? 'fill-current text-rose-500' : ''
                        }`}
                      />
                      <span className="hidden xs:inline">{entry.likes}</span>
                    </button>

                    <button
                      onClick={() => onShareEntry(entry)}
                      className="hidden h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 hover:text-zinc-200 sm:flex"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
