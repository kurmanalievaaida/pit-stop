import React from 'react';
import { PitStopBarRealPhoto } from './PitStopBarRealPhoto';
import { PitStopVipCabinRealPhoto } from './PitStopVipCabinRealPhoto';
import { PitStopSmallCabinRealPhoto } from './PitStopSmallCabinRealPhoto';
import { PitStopCorridorRealPhoto } from './PitStopCorridorRealPhoto';
import { PitStopExteriorRealPhoto } from './PitStopExteriorRealPhoto';

interface PitStopPhotoViewProps {
  photoId: string;
  className?: string;
  customSrc?: string;
  alt?: string;
}

export const PitStopPhotoView: React.FC<PitStopPhotoViewProps> = ({
  photoId,
  className = '',
  customSrc,
  alt = 'PIT STOP Photo',
}) => {
  // If user uploaded their custom photo into localStorage, show it
  if (customSrc && customSrc.startsWith('data:image/')) {
    return (
      <img
        src={customSrc}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  // Check photoId or mapped key
  switch (photoId) {
    case 'bar':
    case 'bar-zone':
    case 'gal-1':
    case 'bar-real':
      return <PitStopBarRealPhoto className={className} />;

    case 'vip':
    case 'vip-cabin':
    case 'gal-3':
    case 'vip-real':
      return <PitStopVipCabinRealPhoto className={className} />;

    case 'small-cabin':
    case 'gal-4':
    case 'small-cabin-real':
    case 'retro':
      return <PitStopSmallCabinRealPhoto className={className} />;

    case 'corridor':
    case 'gal-5':
    case 'corridor-real':
      return <PitStopCorridorRealPhoto className={className} />;

    case 'exterior':
    case 'gal-6':
    case 'exterior-real':
      return <PitStopExteriorRealPhoto className={className} />;

    case 'gal-2':
    case 'main-hall':
    case 'hall-vector':
    case 'lounge-vector':
    case 'hall-acoustic':
    case 'hall':
    case 'concert-sound':
      return (
        <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1b2718] via-[#141e12] to-[#0c120a] p-6 text-center select-none ${className}`}>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 mb-2.5 shadow-lg shadow-amber-500/10">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </div>
          <span className="font-racing text-sm font-bold uppercase tracking-wider text-white">
            Concert Grand Sound
          </span>
          <span className="text-[11px] text-zinc-400 mt-1 max-w-[220px] leading-snug">
            35 персон • Shure Wireless • Сцена & Танцпол
          </span>
        </div>
      );

    default:
      if (customSrc) {
        return (
          <img
            src={customSrc}
            alt={alt}
            className={`h-full w-full object-cover ${className}`}
          />
        );
      }
      return (
        <div className={`flex h-full w-full items-center justify-center bg-zinc-900 text-zinc-500 text-xs ${className}`}>
          PIT STOP
        </div>
      );
  }
};
