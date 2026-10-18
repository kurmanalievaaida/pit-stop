export type PitchCorrectionMode =
  | 'off'
  | 'mild'        // Natural studio correction
  | 'hard'        // T-Pain / Cher rapid snap
  | 'radio'       // Pit crew intercom walkie-talkie
  | 'deep'        // Heavy octave bass
  | 'robot';      // Fixed vocoder robotic tone

export type ReverbPreset = 'off' | 'lounge' | 'booth' | 'arena' | 'cathedral';

export interface AudioEffectSettings {
  pitchCorrectionMode: PitchCorrectionMode;
  autotuneStrength: number; // 0 to 1
  reverbAmount: number;     // 0 to 1
  reverbPreset: ReverbPreset;
  delayAmount: number;      // 0 to 1
  delayTime: number;        // in seconds e.g. 0.25
  warmth: boolean;          // Studio compressor & saturation
  micVolume: number;        // 0 to 2
  musicVolume: number;      // 0 to 2
  monitorLive: boolean;     // Hear your own voice through headphones
}

export interface LyricWord {
  id: string;
  text: string;
  startTime: number;  // in seconds
  endTime: number;    // in seconds
  targetNote: string; // e.g. "C4", "E4", "G4"
  targetFreq: number; // in Hz
}

export interface LyricLine {
  id: string;
  startTime: number;
  endTime: number;
  words: LyricWord[];
  fullText: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: 'Pop' | 'Rock' | 'R&B' | 'Electronic' | 'Hip-Hop' | 'Classic';
  bpm: number;
  scaleKey: string;     // e.g. "C Major", "A Minor"
  scaleNotes: string[]; // ["C", "D", "E", "F", "G", "A", "B"]
  duration: number;     // in seconds
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Pro Driver';
  coverGradient: string;
  coverImage?: string;
  lyrics: LyricLine[];
  tag: string;
  isCustom?: boolean;
  audioUrl?: string;    // Custom audio track URL if uploaded
}

export interface PitchDetectionResult {
  frequency: number | null;
  noteName: string | null;
  cents: number;
  confidence: number;
  clarity: number;
  isSinging: boolean;
  targetNote?: string;
  targetFreq?: number;
  accuracyScore?: number; // 0-100
  tunedNoteName?: string;
}

export interface PerformanceStats {
  score: number;
  pitchAccuracy: number;
  rhythmAccuracy: number;
  energyLevel: number;
  maxCombo: number;
  totalNotesSung: number;
  perfectHits: number;
  goodHits: number;
  misses: number;
  highestNote: string;
  lowestNote: string;
  durationSung: number;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  songTitle: string;
  originalArtist: string;
  performerName: string;
  performerAvatar: string;
  pitStopBadge: 'Pole Position' | 'Pit Crew Pro' | 'Speed Demon' | 'Apex Vocalist' | 'Track Champion';
  score: number;
  accuracy: number;
  effectPreset: string;
  likes: number;
  hasLiked?: boolean;
  recordedAt: string;
  audioUrl: string;
  waveformPeaks: number[];
  duration: number;
  isUserRecording?: boolean;
}

export type MenuCategory =
  | 'all'
  | 'hot_bites'
  | 'mains_steaks'
  | 'pizza_sushi'
  | 'salads_cold'
  | 'bar_cocktails'
  | 'tea_hookah';

export interface MenuItem {
  id: string;
  name: string;
  nameRu?: string;
  nameKy?: string;
  nameEn?: string;
  category: MenuCategory;
  description: string;
  descriptionKy?: string;
  descriptionEn?: string;
  price: number;
  image: string;
  badge?: 'Chef Choice' | 'Bestseller' | 'Signature' | 'Spicy' | 'Karaoke Hit';
  spicy?: boolean;
  vegetarian?: boolean;
  portion: string;
  prepTime: string;
  calories?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  item?: MenuItem;
}

export interface OrderTracking {
  orderNumber: string;
  roomId: string;
  roomName: string;
  items: CartItem[];
  totalPrice: number;
  status: 'received' | 'cooking' | 'delivering' | 'served';
  timestamp: string;
  estimatedMinutes?: number;
}

export interface PlacedOrder {
  id: string;
  orderNumber: number;
  roomName: string;
  tableNumber: string;
  items: CartItem[];
  totalPrice: number;
  status: 'received' | 'cooking' | 'delivering' | 'served';
  placedAt: string;
}

export interface VenueRoom {
  id: string;
  name: string;
  nameRu: string;
  type: 'lounge' | 'vip_purple' | 'bar' | 'retro_cabin';
  capacity: string;
  description: string;
  image: string;
  accentColor: string;
  glowClass: string;
  features: string[];
}

export interface SocialShareData {
  title: string;
  text: string;
  url: string;
  songTitle: string;
  performerName: string;
  score: number;
  accuracy: number;
}
