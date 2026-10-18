import React, { useState } from 'react';
import { Song, LyricLine } from '../types';
import { Music, Upload, X, Check, FileAudio, Sparkles } from 'lucide-react';

interface CustomSongModalProps {
  onAddSong: (song: Song) => void;
  onClose: () => void;
}

export const CustomSongModal: React.FC<CustomSongModalProps> = ({ onAddSong, onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [genre, setGenre] = useState<Song['genre']>('Pop');
  const [scaleKey, setScaleKey] = useState<string>('C Major');
  const [bpm, setBpm] = useState<number>(120);
  const [rawLyrics, setRawLyrics] = useState<string>(
    'Cruising fast under neon lights\nPIT STOP keeps my soul alive\nSing it loud and take the wheel\nFeel the fire that we can feel'
  );
  const [audioFileName, setAudioFileName] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFileName(file.name);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };

  const handleCreate = () => {
    if (!title.trim() || !rawLyrics.trim()) return;

    // Parse lyrics lines and calculate auto-timestamps
    const lines = rawLyrics
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const parsedLyrics: LyricLine[] = lines.map((lineText, idx) => {
      const lineStart = 2.0 + idx * 5.0;
      const lineEnd = lineStart + 4.5;
      const wordsArr = lineText.split(/\s+/);
      const wordDuration = (lineEnd - lineStart) / Math.max(1, wordsArr.length);

      const defaultNotes = ['C4', 'D4', 'E4', 'G4', 'A4'];

      return {
        id: `custom-l-${idx}`,
        startTime: lineStart,
        endTime: lineEnd,
        fullText: lineText,
        words: wordsArr.map((w, wIdx) => {
          const wStart = lineStart + wIdx * wordDuration;
          const wEnd = wStart + wordDuration * 0.9;
          const note = defaultNotes[(idx + wIdx) % defaultNotes.length];
          return {
            id: `custom-w-${idx}-${wIdx}`,
            text: w,
            startTime: wStart,
            endTime: wEnd,
            targetNote: note,
            targetFreq: 440,
          };
        }),
      };
    });

    const totalDuration = Math.max(30, 2.0 + lines.length * 5.0 + 3);

    const newSong: Song = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      artist: artist.trim() || 'Custom Artist',
      genre,
      bpm,
      scaleKey,
      scaleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      duration: Math.round(totalDuration),
      difficulty: 'Medium',
      coverGradient: 'from-amber-500 via-rose-600 to-zinc-950',
      tag: 'Custom Track',
      isCustom: true,
      audioUrl: audioUrl || undefined,
      lyrics: parsedLyrics,
    };

    onAddSong(newSong);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
            <Music className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-racing text-lg font-bold uppercase text-white">
              Add Custom Song to PIT STOP
            </h3>
            <p className="text-xs text-zinc-400">
              Upload your own backing instrumental or use our synthesizer engine
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-300">
                Song Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Redline Highway"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-300">
                Artist Name
              </label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="e.g., Apex Band"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-300">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-2.5 py-2 text-xs text-zinc-100 focus:border-amber-500 focus:outline-none"
              >
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="R&B">R&B</option>
                <option value="Electronic">Electronic</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Classic">Classic</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-300">Musical Key</label>
              <select
                value={scaleKey}
                onChange={(e) => setScaleKey(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-2.5 py-2 text-xs text-zinc-100 focus:border-amber-500 focus:outline-none"
              >
                <option value="C Major">C Major</option>
                <option value="A Minor">A Minor</option>
                <option value="G Major">G Major</option>
                <option value="E Minor">E Minor</option>
                <option value="D Minor">D Minor</option>
                <option value="F Major">F Major</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-300">BPM</label>
              <input
                type="number"
                min="60"
                max="180"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value, 10) || 120)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Optional Audio File Upload */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-300">
              Optional: Upload Backing Track (.mp3, .wav)
            </label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/60 p-3 text-center transition-colors hover:border-amber-500">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <FileAudio className="h-4 w-4 text-amber-400" />
              <span className="text-xs text-zinc-300">
                {audioFileName ? audioFileName : 'Click to select backing audio or leave blank for synth'}
              </span>
            </label>
          </div>

          {/* Lyrics Input */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-300">
              Karaoke Lyrics (One line per verse)
            </label>
            <textarea
              rows={4}
              value={rawLyrics}
              onChange={(e) => setRawLyrics(e.target.value)}
              placeholder="Enter lyrics here..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-xs text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2 border-t border-zinc-800/80 pt-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!title.trim() || !rawLyrics.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 disabled:opacity-40"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Add Track to Catalog</span>
          </button>
        </div>
      </div>
    </div>
  );
};
