import { VenueRoom } from '../types';
import { Language } from './i18n';

export interface LocalizedVenueRoom extends VenueRoom {
  nameKy?: string;
  capacityRu?: string;
  capacityKy?: string;
  capacityEn?: string;
  descriptionRu?: string;
  descriptionKy?: string;
  descriptionEn?: string;
  featuresRu?: string[];
  featuresKy?: string[];
  featuresEn?: string[];
}

export const VENUE_ROOMS_DATA: LocalizedVenueRoom[] = [
  {
    id: 'hall',
    name: 'Concert Grand Sound (Main Hall)',
    nameRu: 'Concert Grand Sound (Главный Зал)',
    nameKy: 'Concert Grand Sound (Башкы Зал)',
    type: 'lounge',
    capacity: 'Up to 35 guests (8 booths)',
    capacityRu: 'До 35 гостей (8 столов)',
    capacityKy: '35 кишиге чейин (8 стол)',
    capacityEn: 'Up to 35 guests (8 booths)',
    description:
      'Luxurious concert vocal hall featuring concert-grade Grand Sound acoustics, Shure wireless microphones, genuine black Chesterfield leather booths, vertical acoustic wood slat panels with ambient LED backlighting, stage, and polished marble dance floor.',
    descriptionRu:
      'Главный караоке-зал с профессиональным концертным звуком Concert Grand Sound, радиомикрофонами Shure, черными кожаными диванами Chesterfield, акустическими деревянными рейками, сценой и просторным танцполом.',
    descriptionKy:
      'Concert Grand Sound акустикалык системасы, Shure микрофондору, Chesterfield кара булгаары дивандары, бий аянты жана сахнасы бар чоң концерттик зал.',
    descriptionEn:
      'Luxurious concert vocal hall featuring concert-grade Grand Sound acoustics, Shure wireless microphones, genuine black Chesterfield leather booths, vertical acoustic wood slat panels with ambient LED backlighting, stage, and polished marble dance floor.',
    image: 'hall-acoustic',
    accentColor: 'from-amber-500/20 via-zinc-950 to-black',
    glowClass: 'border-amber-500/50 shadow-amber-500/20',
    features: [
      'Concert Grand Sound System & Shure Wireless Mics',
      'Black Chesterfield Tufted Leather Booths',
      'Vocal Stage & High-Gloss Marble Dance Floor',
      'Warm Vertical Slat LED Acoustic Panels',
      'Dual Ultra-HD Lyrics Screens & Dynamic Lighting',
    ],
    featuresRu: [
      'Концертная акустическая система Grand Sound и радиомикрофоны Shure',
      'Черные кожаные диваны Chesterfield с каретной стяжкой',
      'Вокальная сцена и просторный танцпол с зеркальным мрамором',
      'Теплые деревянные акустические панели со скрытой подсветкой',
      'Большие экраны караоке и концертный сценический свет',
    ],
    featuresKy: [
      'Концерттик Grand Sound үн системасы жана Shure микрофондору',
      'Chesterfield кара булгаары дивандары',
      'Вокалдык сахна жана жылтырак мрамор бий аянты',
      'Акустикалык жыгач панелдер жана LED жарыктандыруу',
      'Чоң караоке экрандары жана концерттик жарык',
    ],
    featuresEn: [
      'Concert Grand Sound System & Shure Wireless Mics',
      'Black Chesterfield Tufted Leather Booths',
      'Vocal Stage & High-Gloss Marble Dance Floor',
      'Warm Vertical Slat LED Acoustic Panels',
      'Dual Ultra-HD Lyrics Screens & Dynamic Lighting',
    ],
  },
  {
    id: 'vip-cabin',
    name: 'VIP Banquet Cabin',
    nameRu: 'VIP Зал (VIP Banquet Cabin)',
    nameKy: 'VIP Кабина (VIP Banquet Cabin)',
    type: 'vip_purple',
    capacity: '15 - 25 guests',
    capacityRu: '15 - 25 гостей (Банкет)',
    capacityKy: '15 - 25 киши (Банкеттик)',
    capacityEn: '15 - 25 guests (Banquet)',
    description:
      'Opulent private banquet cabin with plush deep violet velvet Chesterfield sofas, faceted diamond-cut bevel mirror wall, classic baroque wall moldings, crystal chandelier, and isolated acoustics.',
    descriptionRu:
      'Роскошный закрытый VIP-зал с баклажановыми велюровыми диванами Chesterfield, зеркальной гранёной стеной, большим банкетным столом и автономной караоке-системой.',
    descriptionKy:
      'Кочкул кызыл велюр Chesterfield дивандары, күзгүлүү дубалы жана өзүнчө караоке системасы бар 15–25 кишилик люкс VIP кабина.',
    descriptionEn:
      'Opulent private banquet cabin with plush deep violet velvet Chesterfield sofas, faceted diamond-cut bevel mirror wall, classic baroque wall moldings, crystal chandelier, and isolated acoustics.',
    image: 'vip-real',
    accentColor: 'from-purple-900/30 via-zinc-950 to-black',
    glowClass: 'border-purple-500/50 shadow-purple-500/20',
    features: [
      'Plush Purple Velvet Deep-Tufted Chesterfield Sofa',
      'Faceted Diamond-Cut Mirror Architectural Wall',
      'Banquet Seating for up to 25 Guests',
      'Dedicated Acoustic Soundproofing & Subwoofers',
      'Private Bar & Dedicated Sound System',
    ],
    featuresRu: [
      'Премиальный велюровый диван Chesterfield глубокого баклажанового цвета',
      'Архитектурная стена из фацетных зеркал с подсветкой',
      'Банкетная рассадка до 25 персон',
      'Полная звукоизоляция и мощные сабвуферы',
      'Личная караоке-система и меню',
    ],
    featuresKy: [
      'Кочкул кызыл велюр Chesterfield жумшак дивандары',
      'Күзгүлүү кооз архитектуралык дубал',
      '25 кишиге чейин банкеттик стол',
      'Толук үн изоляциясы жана күчтүү сабвуферлер',
      'Караоке системасы жана жеке тейлөө',
    ],
    featuresEn: [
      'Plush Purple Velvet Deep-Tufted Chesterfield Sofa',
      'Faceted Diamond-Cut Mirror Architectural Wall',
      'Banquet Seating for up to 25 Guests',
      'Dedicated Acoustic Soundproofing & Subwoofers',
      'Private Bar & Dedicated Sound System',
    ],
  },
  {
    id: 'small-cabin',
    name: 'Small VIP Cabin',
    nameRu: 'Малая VIP Кабинка (Small VIP Cabin)',
    nameKy: 'Чакан VIP Кабина (Small VIP Cabin)',
    type: 'retro_cabin',
    capacity: '4 - 10 guests',
    capacityRu: '4 - 10 гостей (Уютная)',
    capacityKy: '4 - 10 киши (Чакан топторго)',
    capacityEn: '4 - 10 guests (Cozy)',
    description:
      'Intimate acoustic sanctuary situated along the corridor, located directly beside the signature Reception & Side Bar counter. Features emerald velvet seating, damask soundproof panels, crystal chandelier, and quick service from the adjacent reception.',
    descriptionRu:
      'Уютная звукоизолированная малая кабинка, расположенная в холле прямо рядом с Ресепшн и Side Bar. Изумрудный велюр, акустические панели дамаск, хрустальная люстра, личный сенсорный пульт и быстрый сервис из соседней зоны ресепшн.',
    descriptionKy:
      'Коридордо, Ресепшн жана Side Bar зонасынын дал жанында жайгашкан чакан VIP кабина. Изумруд баркыт дивандары, үн өткөрбөгөн акустика жана жеке сенсордук пульт.',
    descriptionEn:
      'Intimate acoustic sanctuary situated along the corridor, located directly beside the signature Reception & Side Bar counter. Features emerald velvet seating, damask soundproof panels, crystal chandelier, and quick service from the adjacent reception.',
    image: 'small-cabin-real',
    accentColor: 'from-cyan-900/30 via-zinc-950 to-black',
    glowClass: 'border-cyan-500/50 shadow-cyan-500/20',
    features: [
      'Located directly beside the Reception & Side Bar',
      'Private Soundproof Acoustic Isolation',
      'Emerald Velvet Upholstery & Crystal Chandelier',
      'Touchscreen Karaoke Song Selector System',
      'Individual AC & Climate Controls',
    ],
    featuresRu: [
      'Расположена прямо рядом со стойкой Ресепшн и Side Bar',
      '100% звукоизоляция от других залов',
      'Изумрудный велюр и хрустальная люстра',
      'Сенсорный пульт выбора песен караоке',
      'Индивидуальный кондиционер и климат-контроль',
    ],
    featuresKy: [
      'Түздөн-түз Ресепшн жана Side Bar жанында жайгашкан',
      'Башка залдардан 100% үн изоляциясы',
      'Изумруд баркыт жана хрусталь люстра',
      'Ыр тандоо үчүн сенсордук караоке пульту',
      'Жеке кондиционер жана климат-контроль',
    ],
    featuresEn: [
      'Located directly beside the Reception & Side Bar',
      'Private Soundproof Acoustic Isolation',
      'Emerald Velvet Upholstery & Crystal Chandelier',
      'Touchscreen Karaoke Song Selector System',
      'Individual AC & Climate Controls',
    ],
  },
  {
    id: 'bar-zone',
    name: 'Side Bar & Reception (Right Side)',
    nameRu: 'Side Bar & Ресепшн (Справа)',
    nameKy: 'Side Bar & Ресепшн (Оң тарапта)',
    type: 'bar',
    capacity: 'Reception & Bar Zone',
    capacityRu: 'Зона Ресепшн и Бара',
    capacityKy: 'Ресепшн жана Бар аймагы',
    capacityEn: 'Reception & Bar Zone',
    description:
      'Lively cocktail bar and welcoming reception with the illuminated golden PIT STOP emblem, quilted red velvet finish, marble counter, and full drink service, located directly on the right side beside the Small VIP Cabin.',
    descriptionRu:
      'Атмосферный коктейльный бар и ресепшн со светящимся золотым гербом «ПИТ-СТОП», красной велюровой каретной стяжкой, черным итальянским мрамором, коллекцией напитков и разливного пива, расположенный справа прямо рядом с Малой VIP Кабинкой.',
    descriptionKy:
      'Кара мрамор бар стойкасы, жарыктанган алтын PIT STOP герби, кызыл баркыт жасалгасы, Чакан VIP Кабинанын оң тарабында жайгашкан Ресепшн жана Side Bar.',
    descriptionEn:
      'Lively cocktail bar and welcoming reception with the illuminated golden PIT STOP emblem, quilted red velvet finish, marble counter, and full drink service, located directly on the right side beside the Small VIP Cabin.',
    image: 'bar-real',
    accentColor: 'from-amber-500/20 via-zinc-950 to-black',
    glowClass: 'border-amber-500/50 shadow-amber-500/20',
    features: [
      'Illuminated Golden PIT STOP Crest & LED Glow',
      'Quilted Red Velvet Lounge Finish',
      'Black Italian Marble Cocktail Counter',
      'Located directly on the right side beside Small VIP Cabin',
      'Full Cocktail & Craft Beer Menu',
    ],
    featuresRu: [
      'Светящийся золотой герб «ПИТ-СТОП Караоке Бар»',
      'Красная велюровая каретная стяжка с подсветкой',
      'Барная стойка из черного итальянского мрамора',
      'Расположен справа, прямо рядом с Малой VIP Кабинкой',
      'Широкая коктейльная и барная карта',
    ],
    featuresKy: [
      'Жарыктанган алтын PIT STOP герби',
      'Кызыл баркыт каретка стяжкасы жана неон',
      'Кара италиялык мрамор бар стойкасы',
      'Чакан VIP Кабинанын оң жагында жайгашкан',
      'Коктейлдер жана суусундуктар менюсу',
    ],
    featuresEn: [
      'Illuminated Golden PIT STOP Crest & LED Glow',
      'Quilted Red Velvet Lounge Finish',
      'Black Italian Marble Cocktail Counter',
      'Located directly on the right side beside Small VIP Cabin',
      'Full Cocktail & Craft Beer Menu',
    ],
  },
];

export const VENUE_ROOMS = VENUE_ROOMS_DATA;

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  titleEn?: string;
  titleKy?: string;
  roomTag: string;
  roomTagEn?: string;
  roomTagKy?: string;
  category: 'bar' | 'lounge' | 'vip' | 'cabins' | 'exterior' | 'all';
  desc: string;
  descEn?: string;
  descKy?: string;
}

export const VENUE_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    image: 'bar-real',
    title: 'Side Bar & Ресепшн (Рядом с Малой VIP Кабинкой)',
    titleEn: 'Side Bar & Reception (Beside Small VIP Cabin)',
    titleKy: 'Side Bar жана Ресепшн (Чакан VIP Кабина жанында)',
    roomTag: 'Ресепшн',
    roomTagEn: 'Reception Bar',
    roomTagKy: 'Ресепшн',
    category: 'bar',
    desc: 'Фирменная барная стойка из черного мрамора, светящийся золотой герб «ПИТ-СТОП», красная велюровая каретная стяжка и разливные краны, расположенные прямо рядом с Малой VIP Кабинкой',
    descEn: 'Black marble bar counter, illuminated golden PIT STOP emblem, quilted red velvet finish, and craft draft taps, located directly beside the Small VIP Cabin',
    descKy: 'Кара мрамор бар стойкасы, жарыктанган алтын PIT STOP герби, кызыл баркыт жасалгасы, Чакан VIP Кабинанын дал жанында жайгашкан',
  },
  {
    id: 'gal-3',
    image: 'vip-real',
    title: 'VIP Зал (Фиолетовый велюр)',
    titleEn: 'VIP Banquet Cabin (Purple Velvet)',
    titleKy: 'VIP Кабина (Сыя-көк баркыт)',
    roomTag: 'VIP Зал',
    roomTagEn: 'VIP Banquet Cabin',
    roomTagKy: 'VIP Кабина',
    category: 'vip',
    desc: 'Роскошный банкетный зал: длинный стол на 25 персон, сиренево-фиолетовый диван Chesterfield и фацетная зеркальная стена',
    descEn: 'Opulent banquet room: long table for up to 25 guests, plush purple Chesterfield velvet sofas, and diamond-cut mirror wall',
    descKy: '25 кишилик чоң банкеттик стол, кооз сирень түстүү Chesterfield дивандары жана күзгүлүү дубал',
  },
  {
    id: 'gal-4',
    image: 'small-cabin-real',
    title: 'Малая VIP Кабинка (Изумрудный велюр)',
    titleEn: 'Small VIP Cabin (Emerald Velvet)',
    titleKy: 'Чакан VIP Кабина (Изумруд баркыт)',
    roomTag: 'Малая Кабинка',
    roomTagEn: 'Small VIP Suite',
    roomTagKy: 'Чакан Кабина',
    category: 'cabins',
    desc: 'Изумрудно-бирюзовые велюровые диваны, винтажные дамасские обои, хрустальная люстра и бордовые ламбрекены',
    descEn: 'Emerald velvet tufted sofas, vintage damask wallpaper, sparkling crystal chandelier, and acoustic isolation for 4–10 guests',
    descKy: 'Изумруд түстүү жумшак дивандар, хрусталь люстра жана 4–10 кишиге ылайыктуу үн өткөрбөгөн кабина',
  },
  {
    id: 'gal-5',
    image: 'corridor-real',
    title: 'Коридор караоке-бара',
    titleEn: 'Karaoke Hallway Corridor',
    titleKy: 'Караоке-бардын коридору',
    roomTag: 'Коридор',
    roomTagEn: 'Corridor',
    roomTagKy: 'Коридор',
    category: 'cabins',
    desc: 'Глянцевый мраморный пол с зеркальным блеском, фактурная серебристая венецианская штукатурка, каскадные шторы на окнах и двери в залы заведения',
    descEn: 'High-gloss polished marble floor with mirror reflections, textured silver Venetian plaster, cascading drapes along windows, and doors to private rooms',
    descKy: 'Жылтырак мрамор пол, кооз күмүш түстүү венеция шыбагы, терезелердеги каскад пардалар жана караоке залдарынын эшиктери',
  },
  {
    id: 'gal-6',
    image: 'exterior-real',
    title: 'Фасад здания "ПИТ-СТОП" в Канте',
    titleEn: 'PIT STOP Karaoke Venue Exterior (Kant)',
    titleKy: '"ПИТ-СТОП" Имаратынын Фасады (Кант)',
    roomTag: 'Фасад и Парковка',
    roomTagEn: 'Exterior & Parking',
    roomTagKy: 'Имарат жана Парковка',
    category: 'exterior',
    desc: 'г. Кант, ул. Ленина 131: вывеска "PIT STOP", "КАРАОКЕ БАР", удобная парковка для автомобилей и отдельный вход',
    descEn: '131 Lenina St, Kant: prominent "PIT STOP" racing banner, "КАРАОКЕ БАР" entrance, and spacious parking lot',
    descKy: 'Кант шаары, Ленин көчөсү 131: "PIT STOP" жана "КАРАОКЕ БАР" көрүнүктүү жазуулары, ыңгайлуу унаа токтотуучу жай',
  },
];

