import React, { useState, useEffect, useRef } from 'react';
import { VENUE_ROOMS_DATA, LocalizedVenueRoom } from '../services/venueData';
import { PitStopLogo } from './PitStopLogo';
import { GoogleMapView } from './GoogleMapView';
import { PitStopPhotoView } from './PitStopPhotoView';
import { Language, TRANSLATIONS } from '../services/i18n';
import {
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Clock,
  ChevronRight,
  Layers,
  MapPin,
  Camera,
  Upload,
  RotateCcw,
  Send,
  Volume2,
  Wine,
  Music,
  Star,
  Crown,
  Tv,
} from 'lucide-react';

interface VenueShowcaseProps {
  activeRoomId: string;
  onSelectActiveRoom: (roomId: string) => void;
  language: Language;
  onGoToMenu?: () => void;
}

export const VenueShowcase: React.FC<VenueShowcaseProps> = ({
  activeRoomId,
  onSelectActiveRoom,
  language,
  onGoToMenu,
}) => {
  const t = TRANSLATIONS[language];

  const [uploadToast, setUploadToast] = useState<string | null>(null);

  // Custom uploaded photos state for rooms (e.g. Hall)
  const [customRoomPhotos, setCustomRoomPhotos] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetUploadRoomId, setTargetUploadRoomId] = useState<string>('hall');
  // Small Cabin sub-view toggle: 'cabin' (Small VIP Cabin) or 'reception' (Side Bar & Reception beside cabin)
  const [smallCabinPhotoView, setSmallCabinPhotoView] = useState<'cabin' | 'reception'>('cabin');

  // Load saved room photos from localStorage
  useEffect(() => {
    try {
      const savedHall = localStorage.getItem('pitstop_custom_photo_hall');
      const savedVip = localStorage.getItem('pitstop_custom_photo_vip-cabin');
      const savedSmall = localStorage.getItem('pitstop_custom_photo_small-cabin');
      const savedBar = localStorage.getItem('pitstop_custom_photo_bar-zone');
      const savedCorridor = localStorage.getItem('pitstop_custom_photo_corridor');
      const savedExterior = localStorage.getItem('pitstop_custom_photo_exterior');
      const map: Record<string, string> = {};
      if (savedHall) map['hall'] = savedHall;
      if (savedVip) map['vip-cabin'] = savedVip;
      if (savedSmall) map['small-cabin'] = savedSmall;
      if (savedBar) map['bar-zone'] = savedBar;
      if (savedCorridor) map['corridor'] = savedCorridor;
      if (savedExterior) map['exterior'] = savedExterior;
      setCustomRoomPhotos(map);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, roomId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCustomRoomPhotos((prev) => ({ ...prev, [roomId]: dataUrl }));
        try {
          localStorage.setItem(`pitstop_custom_photo_${roomId}`, dataUrl);
        } catch {
          // Ignore
        }
        setUploadToast(
          language === 'ky'
            ? 'Сүрөт ийгиликтүү алмаштырылды!'
            : language === 'en'
            ? 'Room picture successfully updated!'
            : 'Фото зала успешно обновлено!'
        );
        setTimeout(() => setUploadToast(null), 4000);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input value so same file can be chosen again
    e.target.value = '';
  };

  const handleResetPhoto = (roomId: string) => {
    setCustomRoomPhotos((prev) => {
      const next = { ...prev };
      delete next[roomId];
      return next;
    });
    try {
      localStorage.removeItem(`pitstop_custom_photo_${roomId}`);
    } catch {
      // Ignore
    }
    setUploadToast(
      language === 'ky'
        ? 'Баштапкы сүрөт кайтарылды'
        : language === 'en'
        ? 'Reset to original photo'
        : 'Восстановлено стандартное фото'
    );
    setTimeout(() => setUploadToast(null), 3000);
  };

  const getRoomTitle = (r: LocalizedVenueRoom) => {
    if (language === 'ky' && r.nameKy) return r.nameKy;
    if (language === 'en') return r.name;
    return r.nameRu;
  };

  const getRoomCapacity = (r: LocalizedVenueRoom) => {
    if (language === 'ky' && r.capacityKy) return r.capacityKy;
    if (language === 'en' && r.capacityEn) return r.capacityEn;
    return r.capacityRu || r.capacity;
  };

  const getRoomDescription = (r: LocalizedVenueRoom) => {
    if (language === 'ky' && r.descriptionKy) return r.descriptionKy;
    if (language === 'en' && r.descriptionEn) return r.descriptionEn;
    return r.descriptionRu || r.description;
  };

  const getRoomFeatures = (r: LocalizedVenueRoom) => {
    if (language === 'ky' && r.featuresKy) return r.featuresKy;
    if (language === 'en' && r.featuresEn) return r.featuresEn;
    return r.featuresRu || r.features;
  };

  // State for online table/cabin booking form
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '20:00',
    guests: '4–8',
    room: activeRoomId,
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) return;
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
    }, 6000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {uploadToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-amber-500/50 bg-zinc-950/95 px-4 py-3 text-xs font-bold text-amber-400 shadow-2xl backdrop-blur-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{uploadToast}</span>
        </div>
      )}

      {/* Hidden file input for photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handlePhotoUpload(e, targetUploadRoomId)}
      />

      {/* Hero Header with Authentic Pit Stop Logo */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#1d2719] via-[#24311f] to-[#182215] p-6 shadow-2xl sm:p-8">
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <PitStopLogo size="xl" showSubtitle={false} />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  PIT STOP KARAOKE BAR
                </span>
                <span className="text-xs text-zinc-400">• {t.brandAddress}</span>
              </div>
              <h2 className="font-racing text-2xl font-black uppercase text-white sm:text-4xl">
                {t.roomsTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-xs text-zinc-300 sm:text-sm leading-relaxed">
                {t.roomsDescription}
              </p>
            </div>
          </div>

          {/* Quick stats pills */}
          <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
            <div className="rounded-2xl border border-[#394a30] bg-[#222e1c]/90 p-3 text-center min-w-24">
              <span className="font-racing text-lg font-black text-amber-400">4</span>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase">
                {language === 'ky' ? 'Зоналар' : language === 'en' ? 'Spaces' : 'Зоны'}
              </p>
            </div>
            <div className="rounded-2xl border border-[#394a30] bg-[#222e1c]/90 p-3 text-center min-w-24">
              <span className="font-racing text-lg font-black text-emerald-400">100%</span>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase">Acoustic</p>
            </div>
            <div className="rounded-2xl border border-[#394a30] bg-[#222e1c]/90 p-3 text-center min-w-24">
              <span className="font-racing text-lg font-black text-purple-400">VIP</span>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase">Cabin</p>
            </div>
            <div className="rounded-2xl border border-[#394a30] bg-[#222e1c]/90 p-3 text-center min-w-24">
              <span className="font-racing text-lg font-black text-cyan-400">4K</span>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase">Karaoke</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Venues: Hall, VIP Cabin, Small Cabin, and Reception on the Right Side */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-racing text-xl font-bold uppercase text-white">
              {t.roomsSubtitle}
            </h3>
            <p className="text-xs text-zinc-400">
              {language === 'ky'
                ? 'Concert Grand Sound (Чоң Зал), VIP Кабина, Чакан Кабина жана оң тараптагы Ресепшн & Side Bar'
                : language === 'en'
                ? 'Choose your space: Concert Grand Sound, VIP Banquet Cabin, Small VIP Cabin, or Reception & Side Bar on the right side'
                : 'Выберите пространство: Concert Grand Sound, VIP Кабинка, Малая VIP Кабинка или Ресепшн & Side Bar на правой стороне'}
            </p>
          </div>
        </div>

        {/* Spatial layout locator: Left to Right overview */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#394a30] bg-[#1a2416]/85 px-4 py-2.5 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="font-racing text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              {language === 'en'
                ? 'Venue Layout (Left → Right):'
                : language === 'ky'
                ? 'Имараттын жайгашуусу (Солдон → Оңго):'
                : 'План помещений (Слева → Направо):'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium">
            <button
              type="button"
              onClick={() => onSelectActiveRoom('hall')}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                activeRoomId === 'hall'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'bg-black/50 text-zinc-400 hover:text-white'
              }`}
            >
              1. {language === 'en' ? 'Main Hall (Left)' : language === 'ky' ? 'Чоң Зал (Сол)' : 'Главный Зал (Слева)'}
            </button>
            <span className="text-zinc-600">→</span>
            <button
              type="button"
              onClick={() => onSelectActiveRoom('vip-cabin')}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                activeRoomId === 'vip-cabin'
                  ? 'bg-purple-600 text-white font-bold shadow'
                  : 'bg-black/50 text-zinc-400 hover:text-white'
              }`}
            >
              2. {language === 'en' ? 'VIP Banquet' : language === 'ky' ? 'VIP Банкет' : 'VIP Банкет'}
            </button>
            <span className="text-zinc-600">→</span>
            <button
              type="button"
              onClick={() => onSelectActiveRoom('small-cabin')}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                activeRoomId === 'small-cabin'
                  ? 'bg-emerald-600 text-white font-bold shadow'
                  : 'bg-black/50 text-zinc-400 hover:text-white'
              }`}
            >
              3. {language === 'en' ? 'Small VIP Cabin' : language === 'ky' ? 'Чакан Кабина' : 'Малая Кабинка'}
            </button>
            <span className="text-zinc-600">→</span>
            <button
              type="button"
              onClick={() => onSelectActiveRoom('bar-zone')}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                activeRoomId === 'bar-zone'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
              }`}
            >
              4. 🍸 {language === 'en' ? 'Reception (Right Side)' : language === 'ky' ? 'Ресепшн (Оң тарап)' : 'Ресепшн (Справа)'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {VENUE_ROOMS_DATA.map((room) => {
            const isSelected = activeRoomId === room.id;
            const title = getRoomTitle(room);
            const capacity = getRoomCapacity(room);
            const desc = getRoomDescription(room);
            const features = getRoomFeatures(room);
            const displayImage = customRoomPhotos[room.id] || room.image;
            const hasCustomPhoto = Boolean(customRoomPhotos[room.id]);

            return (
              <div
                key={room.id}
                className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-[#23301e]/95 p-5 transition-all shadow-xl ${
                  isSelected
                    ? `${room.glowClass} ring-2 ring-amber-500/50 border-amber-500/60`
                    : 'border-[#394a30] hover:border-[#4d6342]'
                }`}
              >
                <div>
                  {/* Photo Header */}
                  <div
                    onClick={() => onSelectActiveRoom(room.id)}
                    className="group relative mb-4 h-56 w-full overflow-hidden rounded-2xl bg-[#1a2416] cursor-pointer"
                  >
                    <PitStopPhotoView
                      photoId={
                        room.id === 'hall'
                          ? 'hall-acoustic'
                          : room.id === 'vip-cabin'
                          ? 'vip-real'
                          : room.id === 'small-cabin'
                          ? smallCabinPhotoView === 'reception'
                            ? 'bar-real'
                            : 'small-cabin-real'
                          : room.id === 'bar-zone'
                          ? 'bar-real'
                          : room.id
                      }
                      customSrc={
                        room.id === 'hall'
                          ? customRoomPhotos['hall']
                          : room.id === 'vip-cabin'
                          ? customRoomPhotos['vip-cabin']
                          : room.id === 'small-cabin'
                          ? smallCabinPhotoView === 'reception'
                            ? customRoomPhotos['bar-zone'] || customRoomPhotos['small-cabin']
                            : customRoomPhotos['small-cabin']
                          : room.id === 'bar-zone'
                          ? customRoomPhotos['bar-zone']
                          : customRoomPhotos[room.id]
                      }
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      <span className="rounded-xl border border-white/20 bg-black/75 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                        {title}
                      </span>
                      {room.id === 'bar-zone' && (
                        <span className="rounded-xl border border-amber-500/50 bg-black/85 px-2 py-0.5 text-[10px] font-black uppercase text-amber-400 backdrop-blur-md">
                          🍸 {language === 'en' ? 'Right Side (Beside Cabin)' : language === 'ky' ? 'Оң тарапта (Кабинанын жанында)' : 'Справа (Рядом с кабинкой)'}
                        </span>
                      )}
                      {room.id === 'small-cabin' && (
                        <div className="flex items-center gap-1 rounded-xl bg-black/85 p-1 border border-emerald-500/30 backdrop-blur-md">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSmallCabinPhotoView('cabin');
                            }}
                            className={`rounded-lg px-2 py-0.5 text-[10px] font-bold transition-all ${
                              smallCabinPhotoView === 'cabin'
                                ? 'bg-emerald-600 text-white font-black'
                                : 'text-zinc-300 hover:text-white'
                            }`}
                          >
                            🎙️ {language === 'en' ? 'Cabin' : 'Кабинка'}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSmallCabinPhotoView('reception');
                            }}
                            className={`rounded-lg px-2 py-0.5 text-[10px] font-bold transition-all ${
                              smallCabinPhotoView === 'reception'
                                ? 'bg-amber-500 text-black font-black'
                                : 'text-zinc-300 hover:text-white'
                            }`}
                          >
                            🍸 {language === 'en' ? 'Reception beside' : 'Ресепшн рядом'}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Change / Upload Photo Button on Card */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      {isSelected && (
                        <div className="flex items-center gap-1 rounded-full border border-amber-400 bg-amber-500 px-2.5 py-1 text-[10px] font-black uppercase text-black shadow-lg">
                          <Sparkles className="h-3 w-3" />
                          <span>{t.selectedRoomBtn}</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTargetUploadRoomId(room.id);
                          fileInputRef.current?.click();
                        }}
                        className="flex items-center gap-1 rounded-xl border border-amber-500/40 bg-black/80 px-2.5 py-1 text-[11px] font-bold text-amber-400 shadow-md backdrop-blur-md transition-all hover:bg-amber-500 hover:text-black cursor-pointer"
                        title={
                          language === 'ky'
                            ? 'Өз сүрөтүңүздү жүктөө'
                            : language === 'en'
                            ? 'Upload / change photo'
                            : 'Загрузить / сменить фото'
                        }
                      >
                        <Camera className="h-3 w-3" />
                        <span>
                          {hasCustomPhoto
                            ? language === 'ky'
                              ? 'Алмаштырылды'
                              : language === 'en'
                              ? 'Customized'
                              : 'Заменено'
                            : language === 'ky'
                            ? 'Сүрөт коюу'
                            : language === 'en'
                            ? 'Change Photo'
                            : 'Сменить фото'}
                        </span>
                      </button>

                      {hasCustomPhoto && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResetPhoto(room.id);
                          }}
                          className="flex h-6 w-6 items-center justify-center rounded-lg bg-black/80 text-zinc-400 backdrop-blur-md hover:text-rose-400"
                          title="Сбросить фото"
                        >
                          <RotateCcw className="h-3 w-3" />
                        </button>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/80 px-2.5 py-1 text-xs font-semibold text-zinc-300 backdrop-blur-md">
                      <Users className="h-3.5 w-3.5 text-amber-400" />
                      <span>{capacity}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h4 className="font-racing text-lg font-bold text-white">{title}</h4>
                  <p className="mt-1.5 text-xs text-zinc-300 leading-relaxed">{desc}</p>

                  {/* Key Features Pill list */}
                  <div className="mt-4 space-y-1.5">
                    {features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions: Select Room / Order to this Room / Direct Book */}
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#2a3822] pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectActiveRoom(room.id)}
                    className={`flex-1 rounded-2xl py-2.5 px-3 text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-black shadow-md font-black uppercase'
                        : 'border border-[#344729] bg-[#162013] text-zinc-200 hover:bg-[#1f2b1a]'
                    }`}
                  >
                    {isSelected ? t.selectedRoomBtn : t.selectRoomBtn}
                  </button>

                  <a
                    href={`https://wa.me/996702832515?text=${encodeURIComponent(
                      language === 'en'
                        ? `Hello! I would like to reserve "${title}" at PIT STOP Karaoke Bar (Kant, Lenina 131). Please confirm availability!`
                        : language === 'ky'
                        ? `Саламатсызбы! "ПИТ-СТОП" караокесинен "${title}" залын брондоо үчүн бош убакытты тактагым келет!`
                        : `Здравствуйте! Хочу забронировать зал "${title}" в ПИТ-СТОП Караоке Бар (г. Кант). Уточните, пожалуйста, доступность!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition-all cursor-pointer"
                    title={language === 'en' ? 'Book via WhatsApp' : 'Бронь WhatsApp'}
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>{language === 'en' ? 'Book' : 'Бронь'}</span>
                  </a>

                  {onGoToMenu && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectActiveRoom(room.id);
                        onGoToMenu();
                      }}
                      className="rounded-2xl border border-amber-500/50 bg-amber-500/15 px-3 py-2.5 text-xs font-bold text-amber-400 hover:bg-amber-500/25 cursor-pointer"
                    >
                      {language === 'ky'
                        ? 'Меню'
                        : language === 'en'
                        ? 'Menu'
                        : 'Меню'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Online Table & VIP Cabin Booking Form */}
      <div id="booking-section" className="rounded-3xl border border-[#394a30] bg-gradient-to-b from-[#222e1c] to-[#192215] p-6 sm:p-8 shadow-2xl">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="font-racing text-2xl font-bold uppercase text-white sm:text-3xl">
              {t.bookingTitle}
            </h3>
            <p className="mt-1.5 text-xs text-zinc-300">
              {t.bookingSubtitle}
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="rounded-2xl border border-emerald-500/50 bg-emerald-950/40 p-6 text-center shadow-xl animate-in fade-in">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
              <h4 className="mt-3 font-racing text-lg font-bold text-white">
                {language === 'en' ? 'Request Received!' : language === 'ky' ? 'Буйрутма кабыл алынды!' : 'Заявка принята!'}
              </h4>
              <p className="mt-1.5 text-xs text-emerald-200/90 leading-relaxed max-w-md mx-auto">
                {t.bookingSuccess}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <a
                  href={`https://wa.me/996702832515?text=${encodeURIComponent(
                    language === 'en'
                      ? `Hello! I just submitted a reservation request:\nName: ${bookingForm.name}\nPhone: ${bookingForm.phone}\nGuests: ${bookingForm.guests}\nTime: ${bookingForm.date} ${bookingForm.time}`
                      : `Здравствуйте! Отправил заявку на бронь:\nИмя: ${bookingForm.name}\nТелефон: ${bookingForm.phone}\nГостей: ${bookingForm.guests}\nВремя: ${bookingForm.date} ${bookingForm.time}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold uppercase text-white shadow-md hover:bg-emerald-500"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>{language === 'en' ? 'Open WhatsApp Now' : 'Открыть WhatsApp'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setBookingSubmitted(false)}
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800"
                >
                  {language === 'en' ? 'New Reservation' : 'Новая бронь'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    {t.bookingName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder={language === 'en' ? 'e.g. Alex' : 'Например, Азамат'}
                    className="w-full rounded-xl border border-[#394a30] bg-[#182215] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    {t.bookingPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+996 (___) __-__-__"
                    className="w-full rounded-xl border border-[#394a30] bg-[#182215] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    {t.bookingDateTime}
                  </label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full rounded-xl border border-[#394a30] bg-[#182215] px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    {language === 'en' ? 'Time' : language === 'ky' ? 'Убакыт' : 'Время'}
                  </label>
                  <input
                    type="time"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, time: e.target.value }))}
                    className="w-full rounded-xl border border-[#394a30] bg-[#182215] px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    {t.bookingGuests}
                  </label>
                  <select
                    value={bookingForm.guests}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, guests: e.target.value }))}
                    className="w-full rounded-xl border border-[#394a30] bg-[#182215] px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="1–3">1–3 {language === 'en' ? 'guests' : 'чел.'}</option>
                    <option value="4–8">4–8 {language === 'en' ? 'guests' : 'чел.'}</option>
                    <option value="9–15">9–15 {language === 'en' ? 'guests' : 'чел.'}</option>
                    <option value="16–25+">16–25+ {language === 'en' ? 'guests (VIP Banquet)' : 'чел. (VIP Банкет)'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {t.bookingRoomSelect}
                </label>
                <select
                  value={bookingForm.room}
                  onChange={(e) => setBookingForm((prev) => ({ ...prev, room: e.target.value }))}
                  className="w-full rounded-xl border border-[#394a30] bg-[#182215] px-3.5 py-2.5 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
                >
                  {VENUE_ROOMS_DATA.map((r) => (
                    <option key={r.id} value={r.id}>
                      {getRoomTitle(r)} — {getRoomCapacity(r)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3.5 font-racing text-xs font-black uppercase text-black shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 active:scale-95 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>{t.bookingSubmit}</span>
                </button>

                <a
                  href={`https://wa.me/996702832515?text=${encodeURIComponent(
                    language === 'en'
                      ? `Hello! I want to book a table at PIT STOP Karaoke Bar (Kant, Lenina 131)`
                      : `Здравствуйте! Хочу забронировать столик / кабинку в ПИТ-СТОП Караоке Бар`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 font-racing text-xs font-black uppercase text-white shadow-lg shadow-emerald-950/40 transition-all hover:bg-emerald-500 active:scale-95 cursor-pointer text-center"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>{language === 'en' ? 'Book via WhatsApp' : 'Бронь через WhatsApp'}</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Google Map Section - Kant, Kyrgyzstan, Lenina 131 */}
      <GoogleMapView />
    </div>
  );
};
