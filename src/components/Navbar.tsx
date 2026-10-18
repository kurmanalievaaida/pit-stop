import React from 'react';
import { Trophy, UtensilsCrossed, Sparkles, Globe } from 'lucide-react';
import { PitStopLogo } from './PitStopLogo';
import { Language, TRANSLATIONS } from '../services/i18n';

export type AppTab = 'venue' | 'menu' | 'leaderboard';

interface NavbarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  cartCount?: number;
  activeRoomName?: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSubFilterChange?: (filter: 'all' | 'food' | 'bar') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  cartCount = 0,
  activeRoomName,
  language,
  onLanguageChange,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#394a30]/90 bg-[#1a2316]/95 backdrop-blur-md shadow-md shadow-black/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6">
        {/* Authentic Brand Emblem & Name */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => onSelectTab('venue')}
        >
          <PitStopLogo size="sm" showSubtitle={false} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-racing text-lg font-black tracking-wider text-white uppercase sm:text-xl">
                {language === 'en' ? 'PIT-' : 'ПИТ-'}
                <span className="text-amber-500">{language === 'en' ? 'STOP' : 'СТОП'}</span>
              </h1>
              <span className="rounded border border-amber-500/40 bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-amber-400 uppercase">
                {t.brandKaraokeBar}
              </span>
            </div>
            {activeRoomName ? (
              <p className="hidden text-[10px] font-semibold text-amber-400/80 sm:block">
                {t.activeRoomLabel}: {activeRoomName} • {t.brandAddress}
              </p>
            ) : (
              <p className="hidden text-[10px] font-medium text-emerald-100/60 sm:block">
                {t.brandAddress} • {t.brandHours}
              </p>
            )}
          </div>
        </div>

        {/* Right Section: Navigation Tabs + Language Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Navigation Tabs (1st Rooms Cabins & Map, 2nd Food & Bar Menu) */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
            {/* 1st Tab: Venue, Rooms & Map */}
            <button
              id="tab-btn-venue"
              type="button"
              onClick={() => onSelectTab('venue')}
              className={`flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-xs font-bold transition-all sm:px-3 sm:py-2 sm:text-sm ${
                currentTab === 'venue'
                  ? 'border border-amber-500/60 bg-amber-500/20 text-amber-400 shadow-sm shadow-amber-500/20'
                  : 'text-zinc-300 hover:bg-[#1f2a18] hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 shrink-0" />
              <span className="hidden md:inline">{t.tabRoomsMap}</span>
              <span className="md:hidden">
                {language === 'en' ? 'Rooms' : language === 'ky' ? 'Залдар' : 'Залы'}
              </span>
            </button>

            {/* 2nd Tab: Food & Bar Menu */}
            <button
              id="tab-btn-menu"
              type="button"
              onClick={() => onSelectTab('menu')}
              className={`relative flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-xs font-bold transition-all sm:px-3 sm:py-2 sm:text-sm ${
                currentTab === 'menu'
                  ? 'border border-amber-500/60 bg-amber-500/20 text-amber-400 shadow-sm shadow-amber-500/20'
                  : 'text-zinc-300 hover:bg-[#1f2a18] hover:text-white'
              }`}
            >
              <UtensilsCrossed className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 shrink-0" />
              <span className="hidden md:inline">{t.tabMenu}</span>
              <span className="md:hidden">
                {language === 'en' ? 'Menu' : 'Меню'}
              </span>
              {cartCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-black text-black animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* 3 Languages Switcher (KY / RU / EN) with robust touch targets */}
          <div
            id="language-switcher-group"
            className="shrink-0 flex items-center rounded-xl border border-[#2c3d25] bg-[#171f13] p-0.5 shadow-inner"
          >
            <button
              id="btn-lang-ky"
              type="button"
              onClick={() => onLanguageChange('ky')}
              title="Кыргыз тили"
              aria-label="Switch to Kyrgyz"
              className={`min-w-[32px] sm:min-w-[36px] rounded-lg px-2 py-1.5 text-xs font-black uppercase transition-all cursor-pointer select-none text-center ${
                language === 'ky'
                  ? 'bg-amber-500 text-black shadow-md ring-1 ring-amber-400 font-black'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              КЫР
            </button>
            <button
              id="btn-lang-ru"
              type="button"
              onClick={() => onLanguageChange('ru')}
              title="Русский язык"
              aria-label="Switch to Russian"
              className={`min-w-[32px] sm:min-w-[36px] rounded-lg px-2 py-1.5 text-xs font-black uppercase transition-all cursor-pointer select-none text-center ${
                language === 'ru'
                  ? 'bg-amber-500 text-black shadow-md ring-1 ring-amber-400 font-black'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              RU
            </button>
            <button
              id="btn-lang-en"
              type="button"
              onClick={() => onLanguageChange('en')}
              title="English language"
              aria-label="Switch to English"
              className={`min-w-[32px] sm:min-w-[36px] rounded-lg px-2 py-1.5 text-xs font-black uppercase transition-all cursor-pointer select-none text-center ${
                language === 'en'
                  ? 'bg-amber-500 text-black shadow-md ring-1 ring-amber-400 font-black'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
