import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LeaderboardEntry } from './types';
import {
  getStoredLeaderboard,
  toggleLikeEntry,
} from './services/leaderboardData';
import { VENUE_ROOMS_DATA } from './services/venueData';
import { Navbar, AppTab } from './components/Navbar';
import { SocialShareModal } from './components/SocialShareModal';
import { Leaderboard } from './components/Leaderboard';
import { FoodMenu } from './components/FoodMenu';
import { VenueShowcase } from './components/VenueShowcase';
import { PitStopLogo } from './components/PitStopLogo';
import { PitStopChatbot } from './components/PitStopChatbot';
import { Language, TRANSLATIONS } from './services/i18n';

export default function App() {
  // 3 Languages: Kyrgyz (ky - default), Russian (ru), English (en) with localStorage persistence
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const userSelected = localStorage.getItem('pitstop_language_selected');
      if (userSelected === 'en' || userSelected === 'ky' || userSelected === 'ru') {
        return userSelected as Language;
      }
    } catch {
      // Ignore
    }
    return 'ky';
  });

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('pitstop_language_selected', newLang);
      localStorage.setItem('pitstop_language', newLang);
    } catch {
      // Ignore
    }
  };

  // Navigation: 1st Rooms, Cabins & Map (venue), 2nd Food & Bar Menu (menu), leaderboard
  const [currentTab, setCurrentTab] = useState<AppTab>('venue');

  // Active Venue Room / Selection (Hall, VIP Cabin, Small Cabin, Bar)
  const [activeRoomId, setActiveRoomId] = useState<string>('hall');

  // Modals
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [shareEntryTarget, setShareEntryTarget] = useState<LeaderboardEntry | null>(null);

  // Leaderboard Data
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);

  // Initialize Leaderboard
  useEffect(() => {
    setLeaderboardEntries(getStoredLeaderboard());
  }, []);

  const handleLikeEntry = (id: string) => {
    const updated = toggleLikeEntry(id);
    setLeaderboardEntries(updated);
  };

  const currentRoom =
    VENUE_ROOMS_DATA.find((r) => r.id === activeRoomId) || VENUE_ROOMS_DATA[0];

  const t = TRANSLATIONS[language];

  const getActiveRoomDisplayName = () => {
    if (language === 'ky' && currentRoom.nameKy) return currentRoom.nameKy;
    if (language === 'en') return currentRoom.name;
    return currentRoom.nameRu;
  };

  return (
    <div className="min-h-screen bg-[#1e281a] text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-black font-sans antialiased">
      {/* Top Navbar with 3 Languages (RU / KY / EN) and Venue context */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeRoomName={getActiveRoomDisplayName()}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Container with Framer Motion Page Transitions */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full space-y-6"
          >
            {/* TAB 1: VENUE SHOWCASE (Bar, VIP Cabin, Hall, Small Cabin) & GOOGLE MAP */}
            {currentTab === 'venue' && (
              <VenueShowcase
                activeRoomId={activeRoomId}
                onSelectActiveRoom={(id) => setActiveRoomId(id)}
                language={language}
                onGoToMenu={() => setCurrentTab('menu')}
              />
            )}

            {/* TAB 2: FOOD MENU & BAR MENU */}
            {currentTab === 'menu' && (
              <FoodMenu
                activeRoomId={activeRoomId}
                onSelectRoom={(id) => setActiveRoomId(id)}
                language={language}
              />
            )}

            {/* TAB 3: LEADERBOARD & POPULAR PERFORMANCES */}
            {currentTab === 'leaderboard' && (
              <Leaderboard
                entries={leaderboardEntries}
                onLikeEntry={handleLikeEntry}
                onShareEntry={(entry) => {
                  setShareEntryTarget(entry);
                  setShowShareModal(true);
                }}
                language={language}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Interactive AI Chatbot for Pit Stop */}
      <PitStopChatbot
        language={language}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />

      {/* Social Media Sharing Modal */}
      {showShareModal && (
        <SocialShareModal
          song={
            shareEntryTarget
              ? {
                  id: shareEntryTarget.id,
                  title: shareEntryTarget.songTitle,
                  artist: shareEntryTarget.originalArtist,
                  genre: 'Pop',
                  bpm: 120,
                  scaleKey: 'C Major',
                  scaleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
                  duration: 50,
                  difficulty: 'Medium',
                  coverGradient: 'from-amber-500 to-red-600',
                  lyrics: [],
                  tag: '',
                }
              : {
                  id: 'highlight-track',
                  title: 'Pit Stop Night',
                  artist: 'Pit Stop Performer',
                  genre: 'Pop',
                  bpm: 120,
                  scaleKey: 'C Major',
                  scaleNotes: [],
                  duration: 60,
                  difficulty: 'Easy',
                  coverGradient: 'from-amber-500 to-zinc-900',
                  lyrics: [],
                  tag: '',
                }
          }
          stats={{
            score: shareEntryTarget?.score || 95000,
            pitchAccuracy: shareEntryTarget?.accuracy || 95,
            rhythmAccuracy: 92,
            energyLevel: 90,
            maxCombo: 12,
            totalNotesSung: 40,
            perfectHits: 35,
            goodHits: 4,
            misses: 1,
            highestNote: 'A4',
            lowestNote: 'C4',
            durationSung: 50,
          }}
          performerName={shareEntryTarget?.performerName || 'PitStopGuest'}
          onClose={() => {
            setShowShareModal(false);
            setShareEntryTarget(null);
          }}
        />
      )}

      {/* Modern Pit Stop Footer */}
      <footer className="border-t border-[#22301c] bg-[#10170d] py-8 text-center text-xs text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PitStopLogo size="sm" showSubtitle={false} />
            <div className="text-left">
              <span className="font-racing font-black text-amber-500 text-sm uppercase">
                {language === 'en' ? 'PIT STOP KARAOKE BAR' : 'ПИТ-СТОП КАРАОКЕ БАР'}
              </span>
              <p className="text-[11px] text-zinc-400">
                {t.footerDesc}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-400 text-xs">
            <button
              onClick={() => setCurrentTab('menu')}
              className="hover:text-amber-400 transition-colors"
            >
              {t.tabMenu}
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('venue')}
              className="hover:text-amber-400 transition-colors"
            >
              {t.tabRoomsMap}
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('leaderboard')}
              className="hover:text-amber-400 transition-colors"
            >
              {t.tabLeaderboard}
            </button>
          </div>

          <div className="text-right text-[11px] text-zinc-400">
            <div className="text-amber-400 font-semibold">{t.brandHours}</div>
            <div className="text-zinc-300">{t.brandAddress}</div>
            <div className="text-amber-400/80">WhatsApp: +996 (702) 832-515</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
