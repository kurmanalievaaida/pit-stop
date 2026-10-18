export type Language = 'ru' | 'ky' | 'en';

export interface Translations {
  // Brand & Header
  brandName: string;
  brandKaraokeBar: string;
  brandAddress: string;
  brandHours: string;
  activeRoomLabel: string;

  // Tabs
  tabMenu: string;
  tabFoodMenu: string;
  tabBarMenu: string;
  tabRoomsMap: string;
  tabLeaderboard: string;

  // Rooms / Cabins
  roomsTitle: string;
  roomsSubtitle: string;
  roomsDescription: string;
  roomHallTitle: string;
  roomHallDesc: string;
  roomVipTitle: string;
  roomVipDesc: string;
  roomSmallCabinTitle: string;
  roomSmallCabinDesc: string;
  roomBarTitle: string;
  roomBarDesc: string;

  // Room Badges & Caps
  capacityHall: string;
  capacityVip: string;
  capacitySmallCabin: string;
  capacityBar: string;
  selectRoomBtn: string;
  selectedRoomBtn: string;
  bookRoomBtn: string;

  // Booking Form
  bookingTitle: string;
  bookingSubtitle: string;
  bookingName: string;
  bookingPhone: string;
  bookingDateTime: string;
  bookingGuests: string;
  bookingRoomSelect: string;
  bookingSubmit: string;
  bookingSuccess: string;

  // Food & Bar Menu
  menuHeroTitle: string;
  menuHeroBadge: string;
  menuHeroDesc: string;
  tableSelectorLabel: string;
  callWaiterBtn: string;
  cartBtn: string;
  searchPlaceholder: string;
  filterAll: string;
  filterHits: string;
  filterSpicy: string;
  filterVegetarian: string;
  priceLabel: string;
  currency: string;
  addToCartBtn: string;
  portionLabel: string;
  prepTimeLabel: string;

  // Categories
  catAll: string;
  catHotBites: string;
  catMainsSteaks: string;
  catPizzaSushi: string;
  catSaladsCold: string;
  catBarCocktails: string;
  catTeaHookah: string;

  // Waiter & Cart Modals
  callWaiterModalTitle: string;
  callWaiterModalSubtitle: string;
  waiterReasonMenu: string;
  waiterReasonAsh: string;
  waiterReasonBill: string;
  waiterReasonWater: string;
  waiterReasonOther: string;
  waiterCustomMsg: string;
  sendWaiterCallBtn: string;
  cancelBtn: string;
  waiterSentSuccess: string;

  cartModalTitle: string;
  cartEmpty: string;
  cartTotal: string;
  cartCheckoutBtn: string;
  cartClearBtn: string;
  cartNotesPlaceholder: string;
  orderPlacedSuccess: string;
  orderStatus1: string;
  orderStatus2: string;
  orderStatus3: string;

  // Gallery
  galleryTitle: string;
  gallerySubtitle: string;
  galleryAll: string;
  galleryBar: string;
  galleryHall: string;
  galleryVip: string;
  galleryCabins: string;
  galleryExterior: string;

  // Map
  mapTitle: string;
  mapAddressKant: string;
  mapRouteBtn: string;
  mapCopied: string;

  // Leaderboard
  leaderboardTitle: string;
  leaderboardSubtitle: string;
  leaderboardFilterTrending: string;
  leaderboardFilterPodium: string;
  leaderboardFilterRecent: string;
  searchSingerPlaceholder: string;
  playSample: string;
  pauseSample: string;
  shareBtn: string;
  scoreLabel: string;
  accuracyLabel: string;

  // Footer
  footerDesc: string;
  footerRights: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ru: {
    brandName: 'ПИТ-СТОП',
    brandKaraokeBar: 'КАРАОКЕ БАР',
    brandAddress: 'Кыргызстан, г. Кант, ул. Ленина 131',
    brandHours: 'Ежедневно: 18:00 – 03:00 (с 6 вечера до 3 утра)',
    activeRoomLabel: 'Выбранный зал',

    tabMenu: 'Меню (Кухня & Бар)',
    tabFoodMenu: 'Кухня',
    tabBarMenu: 'Барная карта',
    tabRoomsMap: 'Залы, Кабинки & Карта',
    tabLeaderboard: 'Рейтинг гостей',

    roomsTitle: 'Залы и VIP Кабинки Караоке "ПИТ-СТОП"',
    roomsSubtitle: 'Премиальный звук, VIP залы и уютные кабинки',
    roomsDescription:
      'Идеальное пространство для отдыха и караоке: главный зал Concert Grand Sound со сценой и танцполом, банкетный VIP Зал для торжеств, уединенная малая VIP Кабинка и стильная зона Ресепшн рядом с ней.',
    roomHallTitle: 'Concert Grand Sound (Главный Зал)',
    roomHallDesc:
      'Главный караоке-зал с профессиональным концертным звуком Concert Grand Sound, радиомикрофонами Shure, черными кожаными диванами Chesterfield, вокальной сценой и зеркальным мраморным танцполом.',
    roomVipTitle: 'VIP Зал (VIP Banquet Cabin)',
    roomVipDesc:
      'Роскошный банкетный зал с фиолетовыми велюровыми диванами, зеркальной гранёной стеной, большим праздничным столом и приватной акустикой на 15–25 человек.',
    roomSmallCabinTitle: 'Малая VIP Кабинка (Small VIP Cabin)',
    roomSmallCabinDesc:
      'Уютная звукоизолированная малая кабинка для компании от 4 до 10 человек, расположенная прямо рядом с зоной Ресепшн и Side Bar. Личный сенсорный пульт, климат-контроль и быстрый сервис.',
    roomBarTitle: 'Side Bar & Ресепшн (Рядом с Малой VIP Кабинкой)',
    roomBarDesc:
      'Атмосферный коктейльный бар и ресепшн со светящимся золотым гербом «ПИТ-СТОП», красной велюровой каретной стяжкой, коллекцией напитков и разливного пива, расположенный рядом с Малой VIP Кабинкой.',

    capacityHall: 'До 35 гостей (8 столов)',
    capacityVip: '15 - 25 гостей (Банкет)',
    capacitySmallCabin: '4 - 10 гостей (Уютная)',
    capacityBar: 'Зона Ресепшн и Бара',
    selectRoomBtn: 'Выбрать этот зал',
    selectedRoomBtn: '✓ Выбран для брони',
    bookRoomBtn: 'Забронировать',

    bookingTitle: 'Онлайн Бронирование Стола / Кабинки',
    bookingSubtitle: 'Менеджер свяжется с вами по телефону или WhatsApp для подтверждения',
    bookingName: 'Ваше Имя',
    bookingPhone: 'Номер Телефона (WhatsApp)',
    bookingDateTime: 'Дата и Время',
    bookingGuests: 'Количество Гостей',
    bookingRoomSelect: 'Желаемый Зал / Кабинка',
    bookingSubmit: 'Отправить Заявку на Бронь',
    bookingSuccess: 'Бронь успешно отправлена! Менеджер Pit Stop свяжется с вами в течение 5-10 минут.',

    menuHeroTitle: 'Меню Кухни и Бара Pit Stop',
    menuHeroBadge: 'ПИТ-СТОП КУХНЯ & БАР',
    menuHeroDesc:
      'Горячие сеты для компаний, сочные шашлыки, стейки, авторская пицца, роллы, фирменные коктейли и дымные кальяны с доставкой к вашему столу.',
    tableSelectorLabel: 'Стол / Кабинка:',
    callWaiterBtn: 'Позвать официанта',
    cartBtn: 'Заказ',
    searchPlaceholder: 'Поиск: шашлык, бургер, пицца, коктейль, чай...',
    filterAll: 'Все блюда',
    filterHits: 'Хиты Караоке',
    filterSpicy: 'Острое',
    filterVegetarian: 'Вегетарианское',
    priceLabel: 'Цена',
    currency: 'сом',
    addToCartBtn: 'В заказ',
    portionLabel: 'Порция',
    prepTimeLabel: 'Время подачи',

    catAll: 'Все меню',
    catHotBites: 'Горячие закуски и сеты',
    catMainsSteaks: 'Бургеры и горячее',
    catPizzaSushi: 'Пицца и роллы',
    catSaladsCold: 'Салаты и нарезки',
    catBarCocktails: 'Коктейли и бар',
    catTeaHookah: 'Чай и кальяны',

    callWaiterModalTitle: 'Вызов Персонала к Столу',
    callWaiterModalSubtitle: 'Выберите причину вызова или напишите пожелание',
    waiterReasonMenu: 'Принести дополнительное меню',
    waiterReasonAsh: 'Заменить пепельницу / угли кальяна',
    waiterReasonBill: 'Принести счет (оплата наличными / картой)',
    waiterReasonWater: 'Подать воду / лед / приборы',
    waiterReasonOther: 'Вопрос по караоке / микрофонам',
    waiterCustomMsg: 'Комментарий к вызову...',
    sendWaiterCallBtn: 'Вызвать официанта',
    cancelBtn: 'Отмена',
    waiterSentSuccess: 'Официант уведомлен и уже направляется к вашему столу!',

    cartModalTitle: 'Ваш Текущий Заказ',
    cartEmpty: 'Ваша корзина пуста. Добавьте любимые блюда или напитки из меню!',
    cartTotal: 'Итого к оплате:',
    cartCheckoutBtn: 'Оформить заказ на кухню',
    cartClearBtn: 'Очистить корзину',
    cartNotesPlaceholder: 'Пожелания к заказу (например: без лука, лед отдельно)...',
    orderPlacedSuccess: 'Заказ успешно отправлен на кухню и в бар!',
    orderStatus1: '1. Принят',
    orderStatus2: '2. Готовится',
    orderStatus3: '3. Официант несет к вам',

    galleryTitle: 'Фотогалерея Караоке "PIT STOP"',
    gallerySubtitle: 'Интерьеры залов, бара, VIP кабинок и атмосфера в Канте',
    galleryAll: 'Все фото',
    galleryBar: 'Барная зона',
    galleryHall: 'Главный Зал (Hall)',
    galleryVip: 'VIP Зал (VIP Cabin)',
    galleryCabins: 'Малые Кабинки (Small)',
    galleryExterior: 'Фасад здания',

    mapTitle: 'Как нас найти: г. Кант, ул. Ленина 131',
    mapAddressKant: 'Кыргызстан, Чуйская обл., г. Кант, ул. Ленина 131 (Караоке-бар "ПИТ-СТОП")',
    mapRouteBtn: 'Открыть в Google Maps / 2GIS',
    mapCopied: 'Адрес скопирован в буфер обмена!',

    leaderboardTitle: 'Рейтинг Гостей и Лучшие Выступления',
    leaderboardSubtitle: 'Топ исполнителей вечеров в караоке-баре PIT STOP',
    leaderboardFilterTrending: 'Популярное',
    leaderboardFilterPodium: 'Пьедестал',
    leaderboardFilterRecent: 'Свежие',
    searchSingerPlaceholder: 'Поиск по песне или имени гостя...',
    playSample: 'Слушать',
    pauseSample: 'Пауза',
    shareBtn: 'Поделиться',
    scoreLabel: 'Баллы',
    accuracyLabel: 'Точность',

    footerDesc: 'Караоке • Европейская & Восточная кухня • VIP залы • Малые кабинки',
    footerRights: 'Все права защищены.',
  },

  ky: {
    brandName: 'ПИТ-СТОП',
    brandKaraokeBar: 'КАРАОКЕ БАР',
    brandAddress: 'Кыргызстан, Кант ш., Ленин көч. 131',
    brandHours: 'Күн сайын: 18:00 – 03:00 (кечки 6дан түнкү 3кө чейин)',
    activeRoomLabel: 'Тандалган зал',

    tabMenu: 'Тамак-аш жана Бар Менюсу',
    tabFoodMenu: 'Ашкана',
    tabBarMenu: 'Бар картасы',
    tabRoomsMap: 'Залдар, Кабиналар & Карта',
    tabLeaderboard: 'Коноктордун рейтинги',

    roomsTitle: '"ПИТ-СТОП" Караоке Залдары жана VIP Кабиналары',
    roomsSubtitle: 'Жогорку деңгээлдеги үн, VIP залдар жана ыңгайлуу кабиналар',
    roomsDescription:
      'Эс алуу жана ырдоо үчүн негизги зоналар: сахнасы бар Concert Grand Sound чоң залы, майрамдар үчүн VIP Зал, чакан уютулган VIP Кабина жана анын жанындагы Ресепшн зонасы.',
    roomHallTitle: 'Concert Grand Sound (Башкы Зал)',
    roomHallDesc:
      'Concert Grand Sound акустикалык системасы, Shure микрофондору, Chesterfield кара булгаары дивандары, сахна жана жылтырак мрамор бий аянты.',
    roomVipTitle: 'VIP Зал (VIP Banquet Cabin)',
    roomVipDesc:
      'Кооз кочкул кызыл велюр дивандары, күзгүлүү дубалы жана 15–25 кишиге чейинки чоң майрамдык столу бар люкс VIP зал.',
    roomSmallCabinTitle: 'Чакан VIP Кабина (Small VIP Cabin)',
    roomSmallCabinDesc:
      'Ресепшн жана Side Bar зонасынын дал жанында жайгашкан чакан VIP кабина. Жеке караоке пульту, климат-контроль жана тез тейлөө.',
    roomBarTitle: 'Side Bar & Ресепшн (Чакан VIP Кабина жанында)',
    roomBarDesc:
      'PIT STOP алтын белгиси, кызыл баркыт жасалгасы жана суусундуктардын кеңири түрү бар Ресепшн зонасы, Чакан VIP Кабинанын жанында жайгашкан.',

    capacityHall: '35 кишиге чейин (8 стол)',
    capacityVip: '15 - 25 киши (Банкет)',
    capacitySmallCabin: '4 - 10 киши (Чакан кабина)',
    capacityBar: 'Ресепшн жана Бар зонасы',
    selectRoomBtn: 'Бул залды тандоо',
    selectedRoomBtn: '✓ Брондоо үчүн тандалды',
    bookRoomBtn: 'Брондоо',

    bookingTitle: 'Столду / Кабинаны Онлайн Брондоо',
    bookingSubtitle: 'Менеджер тастыктоо үчүн сиз менен телефон же WhatsApp аркылуу байланышат',
    bookingName: 'Сиздин Атыңыз',
    bookingPhone: 'Телефон Номериңиз (WhatsApp)',
    bookingDateTime: 'Күнү жана Убактысы',
    bookingGuests: 'Коноктордун Саны',
    bookingRoomSelect: 'Керектүү Зал же Кабина',
    bookingSubmit: 'Брондоону Жөнөтүү',
    bookingSuccess: 'Брондоо ийгиликтүү кабыл алынды! Pit Stop менеджери 5-10 мүнөттүн ичинде байланышат.',

    menuHeroTitle: 'Pit Stop Ашкана жана Бар Менюсу',
    menuHeroBadge: 'ПИТ-СТОП АШКАНА & БАР',
    menuHeroDesc:
      'Даамдуу шишкебектер, стейктер, ысык сеттер, пицца, роллдор, коктейлдер жана кальяндар түз эле столуңузга жеткирилет.',
    tableSelectorLabel: 'Стол / Кабина:',
    callWaiterBtn: 'Официантты чакыруу',
    cartBtn: 'Буйрутма',
    searchPlaceholder: 'Издөө: шишкебек, бургер, пицца, коктейль, чай...',
    filterAll: 'Баары',
    filterHits: 'Караоке Хиттери',
    filterSpicy: 'Ачуу',
    filterVegetarian: 'Вегетариандык',
    priceLabel: 'Баасы',
    currency: 'сом',
    addToCartBtn: 'Буйрутмага кошуу',
    portionLabel: 'Порция',
    prepTimeLabel: 'Даярдоо убактысы',

    catAll: 'Бардык меню',
    catHotBites: 'Ысык закускалар & сеттер',
    catMainsSteaks: 'Бургерлер & ысык тамактар',
    catPizzaSushi: 'Пицца & роллдор',
    catSaladsCold: 'Салаттар & тилимдер',
    catBarCocktails: 'Коктейлдер & бар',
    catTeaHookah: 'Чай & кальяндар',

    callWaiterModalTitle: 'Официантты Чакыруу',
    callWaiterModalSubtitle: 'Чакыруу себебин тандаңыз же каалооңузду жазыңыз',
    waiterReasonMenu: 'Кошумча меню алып келүү',
    waiterReasonAsh: 'Күлсалгычты же кальян көмүрүн алмаштыруу',
    waiterReasonBill: 'Эсепти алып келүү (накталай же карта менен)',
    waiterReasonWater: 'Суу / муз / шаймандарды алып келүү',
    waiterReasonOther: 'Караоке же микрофон боюнча суроо',
    waiterCustomMsg: 'Кошумча билдирүү...',
    sendWaiterCallBtn: 'Чакырууну жөнөтүү',
    cancelBtn: 'Жокко чыгаруу',
    waiterSentSuccess: 'Официант кабарланды жана столуңузга келе жатат!',

    cartModalTitle: 'Сиздин Буйрутмаңыз',
    cartEmpty: 'Корзинаңыз бош. Менюдан жакшы көргөн тамак же суусундукту тандаңыз!',
    cartTotal: 'Жалпы суммасы:',
    cartCheckoutBtn: 'Ашканага буйрутма жөнөтүү',
    cartClearBtn: 'Корзинаны тазалоо',
    cartNotesPlaceholder: 'Тамакка карата каалоолор (пиязсыз, музу өзүнчө ж.б.)...',
    orderPlacedSuccess: 'Буйрутма ашканага жана барга ийгиликтүү жөнөтүлдү!',
    orderStatus1: '1. Кабыл алынды',
    orderStatus2: '2. Даярдалууда',
    orderStatus3: '3. Официант алып келе жатат',

    galleryTitle: '"PIT STOP" Караоке Фотогалереясы',
    gallerySubtitle: 'Кант шаарындагы залдардын, VIP кабиналардын жана бардын көрүнүшү',
    galleryAll: 'Бардык сүрөттөр',
    galleryBar: 'Бар зонасы',
    galleryHall: 'Чоң Зал (Hall)',
    galleryVip: 'VIP Зал (VIP Cabin)',
    galleryCabins: 'Чакан Кабиналар (Small)',
    galleryExterior: 'Имараттын сырты',

    mapTitle: 'Биздин дарек: Кант ш., Ленин көч. 131',
    mapAddressKant: 'Кыргызстан, Чүй обл., Кант шаары, Ленин көчөсү 131 ("ПИТ-СТОП" караоке-бары)',
    mapRouteBtn: 'Google Maps же 2GIS картасынан ачуу',
    mapCopied: 'Дарек көчүрүлдү!',

    leaderboardTitle: 'Коноктордун Рейтинги жана Мыкты Ырлары',
    leaderboardSubtitle: 'PIT STOP караоке кечинин мыкты ырчылары',
    leaderboardFilterTrending: 'Популярдуу',
    leaderboardFilterPodium: 'Мыктылар',
    leaderboardFilterRecent: 'Жаңылар',
    searchSingerPlaceholder: 'Ыр же ырчы боюнча издөө...',
    playSample: 'Угуу',
    pauseSample: 'Тыныгуу',
    shareBtn: 'Бөлүшүү',
    scoreLabel: 'Упай',
    accuracyLabel: 'Тактык',

    footerDesc: 'Караоке • Европалык жана Чыгыш ашканасы • VIP залдар • Чакан кабиналар',
    footerRights: 'Бардык укуктар корголгон.',
  },

  en: {
    brandName: 'PIT STOP',
    brandKaraokeBar: 'KARAOKE BAR',
    brandAddress: '131 Lenina St, Kant, Kyrgyzstan',
    brandHours: 'Daily: 18:00 – 03:00 (6:00 PM – 3:00 AM)',
    activeRoomLabel: 'Selected Room',

    tabMenu: 'Food & Bar Menu',
    tabFoodMenu: 'Kitchen Menu',
    tabBarMenu: 'Bar & Cocktails',
    tabRoomsMap: 'Rooms, Cabins & Map',
    tabLeaderboard: 'Guest Leaderboard',

    roomsTitle: 'PIT STOP Karaoke Rooms, Cabins & Hall',
    roomsSubtitle: 'Concert-grade sound, luxury VIP rooms and private cabins',
    roomsDescription:
      'The premier vocal lounge in Kant, Kyrgyzstan with 3 distinct spaces: Concert Grand Sound main hall with vocal stage and dance floor, opulent VIP Banquet Cabin, intimate soundproof Small VIP Cabin, and our signature Reception & Side Bar beside it.',
    roomHallTitle: 'Concert Grand Sound (Main Hall)',
    roomHallDesc:
      'Luxurious concert vocal hall featuring concert-grade Grand Sound acoustics, Shure wireless microphones, black Chesterfield leather booths, vocal stage, and high-gloss marble dance floor.',
    roomVipTitle: 'VIP Banquet Cabin',
    roomVipDesc:
      'Opulent private banquet cabin with plush purple velvet Chesterfield couches, beveled diamond-cut mirror wall, grand banquet table, and dedicated audio for 15–25 guests.',
    roomSmallCabinTitle: 'Small VIP Cabin',
    roomSmallCabinDesc:
      'Cozy, soundproof private acoustic cabin ideal for 4 to 10 guests, situated directly beside the Reception & Side Bar. Private touchscreen karaoke, air conditioning, and prompt service.',
    roomBarTitle: 'Side Bar & Reception (Beside Small VIP Cabin)',
    roomBarDesc:
      'Lively cocktail bar and greeting reception with the illuminated golden PIT STOP emblem, quilted red velvet finish, top-shelf spirits, and craft draft beers, located directly beside the Small VIP Cabin.',

    capacityHall: 'Up to 35 guests (8 booths)',
    capacityVip: '15 - 25 guests (Banquet)',
    capacitySmallCabin: '4 - 10 guests (Cozy)',
    capacityBar: 'Reception & Bar Zone',
    selectRoomBtn: 'Select this room',
    selectedRoomBtn: '✓ Selected for booking',
    bookRoomBtn: 'Book Now',

    bookingTitle: 'Book a Table or VIP Cabin Online',
    bookingSubtitle: 'Our manager will contact you via phone or WhatsApp to confirm your reservation',
    bookingName: 'Your Name',
    bookingPhone: 'Phone Number (WhatsApp)',
    bookingDateTime: 'Date & Time',
    bookingGuests: 'Number of Guests',
    bookingRoomSelect: 'Preferred Room or Cabin',
    bookingSubmit: 'Submit Reservation Request',
    bookingSuccess: 'Reservation request sent! Our Pit Stop manager will contact you within 5–10 minutes.',

    menuHeroTitle: 'Pit Stop Kitchen & Bar Menu',
    menuHeroBadge: 'PIT STOP KITCHEN & BAR',
    menuHeroDesc:
      'Hot party platters, juicy charcoal kebabs, gourmet burgers, artisan pizzas, fresh rolls, craft cocktails, and premium hookahs served right to your booth.',
    tableSelectorLabel: 'Table / Cabin:',
    callWaiterBtn: 'Call Waiter',
    cartBtn: 'Order',
    searchPlaceholder: 'Search: kebabs, burgers, pizza, cocktails, tea...',
    filterAll: 'All Items',
    filterHits: 'Karaoke Hits',
    filterSpicy: 'Spicy',
    filterVegetarian: 'Vegetarian',
    priceLabel: 'Price',
    currency: 'KGS',
    addToCartBtn: 'Add to Order',
    portionLabel: 'Portion',
    prepTimeLabel: 'Prep Time',

    catAll: 'Full Menu',
    catHotBites: 'Hot Bites & Platters',
    catMainsSteaks: 'Burgers & Steaks',
    catPizzaSushi: 'Pizza & Rolls',
    catSaladsCold: 'Salads & Platters',
    catBarCocktails: 'Cocktails & Bar',
    catTeaHookah: 'Tea & Hookah',

    callWaiterModalTitle: 'Call Server to Your Table',
    callWaiterModalSubtitle: 'Select your request reason or add a personal note',
    waiterReasonMenu: 'Bring additional food or bar menu',
    waiterReasonAsh: 'Change ashtray or refresh hookah coals',
    waiterReasonBill: 'Bring the bill (Cash or Card)',
    waiterReasonWater: 'Bring water, ice, or extra glasses',
    waiterReasonOther: 'Assistance with karaoke microphones',
    waiterCustomMsg: 'Custom note for server...',
    sendWaiterCallBtn: 'Send Server Request',
    cancelBtn: 'Cancel',
    waiterSentSuccess: 'Server has been notified and is heading to your table!',

    cartModalTitle: 'Your Current Order',
    cartEmpty: 'Your order cart is empty. Add delicious food or drinks from the menu!',
    cartTotal: 'Total:',
    cartCheckoutBtn: 'Send Order to Kitchen & Bar',
    cartClearBtn: 'Clear Cart',
    cartNotesPlaceholder: 'Special instructions (e.g., no onions, ice on the side)...',
    orderPlacedSuccess: 'Order successfully sent to kitchen and bar!',
    orderStatus1: '1. Received',
    orderStatus2: '2. Preparing in Kitchen/Bar',
    orderStatus3: '3. Server delivering to table',

    galleryTitle: 'PIT STOP Karaoke Photo Gallery',
    gallerySubtitle: 'Authentic photos of our bar, main hall, VIP banquet cabin, and small suites in Kant',
    galleryAll: 'All Photos',
    galleryBar: 'Bar Area',
    galleryHall: 'Main Hall (Hall)',
    galleryVip: 'VIP Cabin',
    galleryCabins: 'Small Cabins',
    galleryExterior: 'Exterior & Entrance',

    mapTitle: 'Find Us: 131 Lenina St, Kant, Kyrgyzstan',
    mapAddressKant: '131 Lenina Street, Kant, Chuy Region, Kyrgyzstan (PIT STOP Karaoke Bar)',
    mapRouteBtn: 'Open in Google Maps / 2GIS',
    mapCopied: 'Address copied to clipboard!',

    leaderboardTitle: 'Guest Leaderboard & Best Performances',
    leaderboardSubtitle: 'Top trending vocalists and covers at PIT STOP Karaoke Bar',
    leaderboardFilterTrending: 'Trending',
    leaderboardFilterPodium: 'Podium',
    leaderboardFilterRecent: 'Recent',
    searchSingerPlaceholder: 'Search by song title or singer name...',
    playSample: 'Listen',
    pauseSample: 'Pause',
    shareBtn: 'Share',
    scoreLabel: 'Points',
    accuracyLabel: 'Accuracy',

    footerDesc: 'Karaoke • European & Central Asian Cuisine • VIP Cabins • Small Cabins • Cocktail Bar',
    footerRights: 'All rights reserved.',
  },
};
