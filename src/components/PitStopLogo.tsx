import React from 'react';

interface PitStopLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const PitStopLogo: React.FC<PitStopLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { container: 'h-9 w-9', text: 'text-xs', sub: 'text-[8px]', icon: 'h-3.5 w-3.5' },
    md: { container: 'h-12 w-12', text: 'text-sm', sub: 'text-[9px]', icon: 'h-4 w-4' },
    lg: { container: 'h-20 w-20', text: 'text-lg', sub: 'text-[11px]', icon: 'h-6 w-6' },
    xl: { container: 'h-28 w-28', text: 'text-2xl', sub: 'text-xs', icon: 'h-8 w-8' },
  };

  const current = sizeMap[size];

  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      {/* Illuminated Circular Emblem (From the Real Bar Photo) */}
      <div
        className={`relative flex ${current.container} shrink-0 items-center justify-center rounded-full border-2 border-amber-500/80 bg-zinc-950 p-1 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-transform hover:scale-105`}
      >
        {/* Amber Inner Glow Ring */}
        <div className="absolute inset-0.5 rounded-full border border-amber-400/40 bg-gradient-to-b from-amber-500/20 via-black to-red-950/40" />

        {/* Center SVG with Martini Glass + Stage Microphone */}
        <div className="relative z-10 flex flex-col items-center justify-center text-amber-400">
          <svg
            viewBox="0 0 64 64"
            className="w-full h-full p-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Martini Cocktail Glass */}
            <path
              d="M16 18 L32 34 L48 18 Z"
              fill="rgba(245,158,11,0.15)"
              stroke="#fbbf24"
              strokeWidth="2"
            />
            <path d="M32 34 L32 46" stroke="#fbbf24" strokeWidth="2.5" />
            <path d="M22 46 L42 46" stroke="#fbbf24" strokeWidth="2.5" />
            {/* Olive on cocktail pick */}
            <circle cx="28" cy="22" r="3" fill="#10b981" stroke="#fbbf24" strokeWidth="1" />
            <line x1="20" y1="14" x2="33" y2="27" stroke="#fbbf24" strokeWidth="1.5" />

            {/* Vintage Karaoke Stage Mic */}
            <rect
              x="36"
              y="14"
              width="10"
              height="16"
              rx="5"
              fill="rgba(245,158,11,0.3)"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <path d="M32 23 C32 30, 50 30, 50 23" stroke="#f59e0b" strokeWidth="2" />
            <line x1="41" y1="30" x2="41" y2="38" stroke="#f59e0b" strokeWidth="2" />
            <line x1="36" y1="38" x2="46" y2="38" stroke="#f59e0b" strokeWidth="2" />
          </svg>
        </div>

        {/* Outer Ring Ambient Pulse */}
        <div className="absolute -inset-1 rounded-full border border-amber-500/20 blur-[1px] pointer-events-none" />
      </div>

      {/* Brand Text */}
      {showSubtitle && (
        <div className="leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="font-racing font-black tracking-wider text-white text-base sm:text-lg uppercase">
              ПИТ-СТОП
            </span>
            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-400 border border-amber-500/30">
              KARAOKE
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-400/90 font-medium">
            <span>Караоке Бар</span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-400 font-normal">Lounge & Dining</span>
          </div>
        </div>
      )}
    </div>
  );
};
