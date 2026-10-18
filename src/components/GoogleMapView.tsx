import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Clock, Phone, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    google?: any;
    initGoogleMapCallback?: () => void;
  }
}

interface GoogleMapViewProps {
  apiKey?: string;
  className?: string;
}

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAaLkgzxZfnXghzbELmlX0Bl3W7kARf1o8',
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [selectedMapType, setSelectedMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');
  const mapInstanceRef = useRef<any>(null);

  // Kant, Kyrgyzstan, Lenina Street 131 coordinates
  // Kant city center is around 42.894° N, 74.850° E. Lenina Street runs through Kant.
  const locationCoordinates = {
    lat: 42.8942,
    lng: 74.8508,
  };

  const address = 'ул. Ленина 131, г. Кант, Кыргызстан';
  const hours = '18:00 – 03:00 (6:00 PM – 3:00 AM) ежедневно';

  useEffect(() => {
    let isMounted = true;

    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    // If script is already in the document, wait for load
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (isMounted) initMap();
      });
      return;
    }

    // Load the script
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&v=weekly`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (isMounted) {
        initMap();
      }
    };

    script.onerror = () => {
      if (isMounted) {
        setMapError('Не удалось загрузить интерактивную карту Google Maps. Пожалуйста, проверьте подключение к сети.');
      }
    };

    document.head.appendChild(script);

    function initMap() {
      if (!mapContainerRef.current || !window.google || !window.google.maps) return;

      try {
        const mapOptions = {
          center: locationCoordinates,
          zoom: 16,
          mapTypeId: selectedMapType,
          mapTypeControl: false,
          fullscreenControl: true,
          streetViewControl: true,
          zoomControl: true,
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }],
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#263c3f' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#6b9a76' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#38414e' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#212a37' }],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#9ca5b3' }],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ color: '#746855' }],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#1f2835' }],
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#f3d19c' }],
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#2f3948' }],
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }],
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#515c6d' }],
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#17263c' }],
            },
          ],
        };

        const map = new window.google.maps.Map(mapContainerRef.current, mapOptions);
        mapInstanceRef.current = map;

        // Custom Marker
        const marker = new window.google.maps.Marker({
          position: locationCoordinates,
          map: map,
          title: 'ПИТ-СТОП Караоке Бар - ул. Ленина 131, Кант',
          animation: window.google.maps.Animation.DROP,
        });

        const infoWindowContent = `
          <div style="padding: 10px; color: #111; max-width: 240px; font-family: sans-serif;">
            <div style="font-weight: 800; font-size: 14px; text-transform: uppercase; color: #b45309; margin-bottom: 4px;">
              ПИТ-СТОП Караоке Бар
            </div>
            <div style="font-size: 12px; color: #374151; margin-bottom: 6px;">
              ул. Ленина 131, г. Кант, Кыргызстан
            </div>
            <div style="font-size: 11px; background: #fef3c7; color: #92400e; padding: 4px 6px; border-radius: 6px; font-weight: 600; margin-bottom: 8px;">
              🕒 Часы работы: 18:00 – 03:00 (6 PM - 3 AM)
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${locationCoordinates.lat},${locationCoordinates.lng}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #f59e0b; color: #000; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 6px; text-decoration: none; text-transform: uppercase;">
              Маршрут в Google Maps ➔
            </a>
          </div>
        `;

        const infoWindow = new window.google.maps.InfoWindow({
          content: infoWindowContent,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Open by default
        infoWindow.open(map, marker);

        setMapLoaded(true);
      } catch (err: any) {
        console.error('Error initializing map:', err);
        setMapError('Ошибка при инициализации карты Google Maps.');
      }
    }

    return () => {
      isMounted = false;
    };
  }, [apiKey]);

  const handleMapTypeChange = (type: 'roadmap' | 'satellite' | 'hybrid') => {
    setSelectedMapType(type);
    if (mapInstanceRef.current && window.google) {
      mapInstanceRef.current.setMapTypeId(type);
    }
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current && window.google) {
      mapInstanceRef.current.panTo(locationCoordinates);
      mapInstanceRef.current.setZoom(16);
    }
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=Kant+Kyrgyzstan+Lenina+131`;

  return (
    <div className={`overflow-hidden rounded-3xl border border-[#394a30] bg-[#222e1c]/95 p-4 sm:p-6 shadow-2xl ${className}`}>
      {/* Header Info */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              GOOGLE MAPS & ГЕОЛОКАЦИЯ
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-zinc-400">Мы открыты</span>
          </div>
          <h3 className="font-racing text-xl sm:text-2xl font-black uppercase text-white tracking-wide">
            г. Кант, ул. Ленина 131
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Чуйская область, город Кант, ул. Ленина 131 (Караоке-бар "ПИТ-СТОП")</span>
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRecenter}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-900/90 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 transition-all"
            title="Отцентрировать на ПИТ-СТОП"
          >
            <Compass className="h-3.5 w-3.5 text-amber-400" />
            <span>Центр</span>
          </button>

          {/* Map view type toggles */}
          <div className="inline-flex rounded-xl border border-zinc-800 bg-zinc-900 p-0.5">
            <button
              onClick={() => handleMapTypeChange('roadmap')}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                selectedMapType === 'roadmap'
                  ? 'bg-amber-500 text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Схема
            </button>
            <button
              onClick={() => handleMapTypeChange('satellite')}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                selectedMapType === 'satellite'
                  ? 'bg-amber-500 text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Спутник
            </button>
          </div>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2 text-xs font-bold text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all active:scale-95"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Маршрут</span>
            <ExternalLink className="h-3 w-3 ml-0.5 opacity-75" />
          </a>
        </div>
      </div>

      {/* Interactive Map Container */}
      <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shadow-inner">
        {/* The Google Map Div */}
        <div ref={mapContainerRef} className="h-full w-full" />

        {/* Loading state if map hasn't finished loading yet */}
        {!mapLoaded && !mapError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-sm p-4 text-center">
            <div className="h-9 w-9 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs font-semibold text-amber-400">Загрузка интерактивной карты Google Maps...</p>
            <p className="text-[11px] text-zinc-400 mt-1">г. Кант, ул. Ленина 131, Кыргызстан</p>
          </div>
        )}

        {/* Fallback state in case of network or API error */}
        {mapError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/95 p-6 text-center">
            <AlertCircle className="h-8 w-8 text-amber-400 mb-2" />
            <p className="text-xs font-semibold text-zinc-200">{mapError}</p>
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Открыть адрес в Google Maps
            </a>
          </div>
        )}
      </div>

      {/* Info Pills Below Map */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">График работы</div>
            <div className="text-xs font-black text-white">18:00 – 03:00</div>
            <div className="text-[10px] text-zinc-400">Каждый день (6:00 PM – 3:00 AM)</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#394a30] bg-[#1a2416]/80 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Точный Адрес</div>
            <div className="text-xs font-black text-white">ул. Ленина 131</div>
            <div className="text-[10px] text-zinc-400">г. Кант, Чуйская область, KG</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#394a30] bg-[#1a2416]/80 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <Phone className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Контакты & Бронь</div>
            <div className="text-xs font-black text-white">+996 (555) 748-786</div>
            <div className="text-[10px] text-zinc-400">Администратор / WhatsApp</div>
          </div>
        </div>
      </div>
    </div>
  );
};
