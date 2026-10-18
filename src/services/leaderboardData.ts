import { LeaderboardEntry } from '../types';

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'cover-1',
    rank: 1,
    songTitle: 'Turbo Heart (Rev It Up)',
    originalArtist: 'The Pit Crew feat. Apex',
    performerName: 'VocalSpeedster',
    performerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    pitStopBadge: 'Pole Position',
    score: 99450,
    accuracy: 98.6,
    effectPreset: 'Hard Autotune',
    likes: 1420,
    hasLiked: false,
    recordedAt: '2 hours ago',
    audioUrl: 'mock-audio-1',
    waveformPeaks: [0.3, 0.5, 0.7, 0.9, 0.8, 0.6, 0.8, 0.95, 0.7, 0.4, 0.6, 0.85, 0.9, 0.75, 0.5, 0.8, 0.9, 0.6, 0.4, 0.7],
    duration: 52,
  },
  {
    id: 'cover-2',
    rank: 2,
    songTitle: 'Midnight Highway',
    originalArtist: 'Silver Stallion',
    performerName: 'ApexVocalist',
    performerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    pitStopBadge: 'Apex Vocalist',
    score: 97800,
    accuracy: 96.4,
    effectPreset: 'Arena Reverb + Warmth',
    likes: 980,
    hasLiked: false,
    recordedAt: '5 hours ago',
    audioUrl: 'mock-audio-2',
    waveformPeaks: [0.2, 0.4, 0.6, 0.8, 0.7, 0.5, 0.75, 0.88, 0.65, 0.5, 0.6, 0.7, 0.8, 0.7, 0.45, 0.6, 0.75, 0.5, 0.3, 0.6],
    duration: 46,
  },
  {
    id: 'cover-3',
    rank: 3,
    songTitle: 'Pit Stop Serenade',
    originalArtist: 'Velvet Horizon',
    performerName: 'KaraokeQueen_KZ',
    performerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    pitStopBadge: 'Pit Crew Pro',
    score: 96120,
    accuracy: 94.8,
    effectPreset: 'Lounge Reverb',
    likes: 850,
    hasLiked: false,
    recordedAt: 'Yesterday',
    audioUrl: 'mock-audio-3',
    waveformPeaks: [0.15, 0.3, 0.5, 0.65, 0.7, 0.6, 0.55, 0.7, 0.8, 0.65, 0.5, 0.6, 0.75, 0.7, 0.6, 0.5, 0.65, 0.4, 0.3, 0.5],
    duration: 44,
  },
  {
    id: 'cover-4',
    rank: 4,
    songTitle: 'Drift & Fire',
    originalArtist: 'Tokyo Apex',
    performerName: 'Redline_Singer',
    performerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    pitStopBadge: 'Speed Demon',
    score: 93400,
    accuracy: 92.1,
    effectPreset: 'Hard Autotune + Delay',
    likes: 640,
    hasLiked: false,
    recordedAt: '2 days ago',
    audioUrl: 'mock-audio-4',
    waveformPeaks: [0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.8, 0.9, 0.6, 0.7, 0.85, 0.9, 0.65, 0.5, 0.7, 0.8, 0.6, 0.4, 0.5, 0.7],
    duration: 48,
  },
  {
    id: 'cover-5',
    rank: 5,
    songTitle: 'Turbo Heart (Rev It Up)',
    originalArtist: 'The Pit Crew feat. Apex',
    performerName: 'NightDriveVocal',
    performerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
    pitStopBadge: 'Track Champion',
    score: 91200,
    accuracy: 89.5,
    effectPreset: 'Mild Studio Autotune',
    likes: 412,
    hasLiked: false,
    recordedAt: '3 days ago',
    audioUrl: 'mock-audio-5',
    waveformPeaks: [0.25, 0.45, 0.65, 0.75, 0.7, 0.6, 0.65, 0.8, 0.7, 0.55, 0.6, 0.7, 0.65, 0.5, 0.6, 0.7, 0.5, 0.35, 0.4, 0.6],
    duration: 52,
  },
];

const LOCAL_STORAGE_KEY = 'pitstop_leaderboard_covers_v1';

export function getStoredLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return INITIAL_LEADERBOARD;
    const parsed = JSON.parse(raw) as LeaderboardEntry[];
    return parsed.length > 0 ? parsed : INITIAL_LEADERBOARD;
  } catch {
    return INITIAL_LEADERBOARD;
  }
}

export function saveLeaderboardEntry(entry: Omit<LeaderboardEntry, 'rank'>): LeaderboardEntry[] {
  const current = getStoredLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    rank: 1, // will recompute ranks
  };

  const combined = [newEntry, ...current];
  combined.sort((a, b) => b.score - a.score);

  // Re-rank
  const ranked = combined.map((item, idx) => ({
    ...item,
    rank: idx + 1,
  }));

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ranked));
  } catch (err) {
    console.warn('Could not persist leaderboard to local storage:', err);
  }
  return ranked;
}

export function toggleLikeEntry(id: string): LeaderboardEntry[] {
  const current = getStoredLeaderboard();
  const updated = current.map((item) => {
    if (item.id === id) {
      const hasLiked = !item.hasLiked;
      return {
        ...item,
        hasLiked,
        likes: hasLiked ? item.likes + 1 : Math.max(0, item.likes - 1),
      };
    }
    return item;
  });

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not persist like:', err);
  }
  return updated;
}
