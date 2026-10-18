import React, { useState } from 'react';
import { Song, PerformanceStats } from '../types';
import {
  Share2,
  Copy,
  Check,
  X,
  MessageCircle,
  Twitter,
  Send,
  Sparkles,
  Award,
  ExternalLink,
} from 'lucide-react';

interface SocialShareModalProps {
  song: Song;
  stats: PerformanceStats;
  performerName: string;
  onClose: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  song,
  stats,
  performerName,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const shareUrl = window.location.href;
  const shareText = `🎤 Check out my karaoke cover of "${song.title}" recorded at PIT STOP Karaoke Bar! Scored ${Math.round(
    stats.score
  ).toLocaleString()} pts with live autotune effects 🏎️🏁`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `PIT STOP Karaoke - ${song.title} Cover`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  const shareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareText}\n${shareUrl}`
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}&hashtags=PitStopKaraoke,KaraokeCover,Autotune`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title */}
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
            <Share2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-racing text-lg font-bold uppercase text-white">
              Share Your Performance
            </h3>
            <p className="text-xs text-zinc-400">
              Showcase your vocal cover to friends and social media
            </p>
          </div>
        </div>

        {/* Visual Story Card Preview */}
        <div className="mb-5 overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-zinc-900 via-zinc-950 to-neutral-900 p-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🏁</span>
              <span className="font-racing text-xs font-black tracking-wider text-amber-400 uppercase">
                PIT STOP КАРАОКЕ БАР
              </span>
            </div>
            <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              OFFICIAL COVER
            </span>
          </div>

          <div className="my-3 space-y-1">
            <h4 className="font-racing text-lg font-black text-white">{song.title}</h4>
            <p className="text-xs text-zinc-400">
              Sung by <span className="font-bold text-amber-400">@{performerName || 'Singer'}</span>
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-zinc-900/90 p-2.5">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" />
              <div>
                <span className="text-[10px] text-zinc-400 uppercase">Podium Score</span>
                <div className="font-racing text-sm font-bold text-amber-400">
                  {Math.round(stats.score).toLocaleString()} PTS
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-zinc-400 uppercase">Accuracy</span>
              <div className="font-racing text-sm font-bold text-cyan-400">
                {Math.round(stats.pitchAccuracy)}% IN-KEY
              </div>
            </div>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="mb-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
          <button
            onClick={shareWhatsApp}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3 text-emerald-300 transition-all hover:bg-emerald-900/40"
          >
            <MessageCircle className="h-5 w-5 text-emerald-400" />
            <span className="text-xs font-bold">WhatsApp</span>
          </button>

          <button
            onClick={shareTwitter}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-950/30 p-3 text-sky-300 transition-all hover:bg-sky-900/40"
          >
            <Twitter className="h-5 w-5 text-sky-400" />
            <span className="text-xs font-bold">X (Twitter)</span>
          </button>

          <button
            onClick={shareTelegram}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-950/30 p-3 text-blue-300 transition-all hover:bg-blue-900/40"
          >
            <Send className="h-5 w-5 text-blue-400" />
            <span className="text-xs font-bold">Telegram</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-950/30 p-3 text-purple-300 transition-all hover:bg-purple-900/40"
          >
            <ExternalLink className="h-5 w-5 text-purple-400" />
            <span className="text-xs font-bold">More Apps</span>
          </button>
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-1.5">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent px-2.5 text-xs text-zinc-300 focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-black transition-all hover:bg-amber-400 active:scale-95"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
