import { MenuItem, MenuCategory } from '../types';

export const MENU_CATEGORIES: { id: MenuCategory; name: string; nameRu: string; nameKy: string; icon: string }[] = [
  { id: 'all', name: 'Full Menu', nameRu: 'Все меню', nameKy: 'Бардык меню', icon: '🍽️' },
  { id: 'hot_bites', name: 'Hot Bites & Platters', nameRu: 'Горячие закуски и сеты', nameKy: 'Ысык закускалар & сеттер', icon: '🍗' },
  { id: 'mains_steaks', name: 'Burgers & Steaks', nameRu: 'Бургеры и горячее', nameKy: 'Бургерлер & ысык тамактар', icon: '🥩' },
  { id: 'pizza_sushi', name: 'Pizza & Rolls', nameRu: 'Пицца и роллы', nameKy: 'Пицца & роллдор', icon: '🍕' },
  { id: 'salads_cold', name: 'Salads & Platters', nameRu: 'Салаты и нарезки', nameKy: 'Салаттар & тилимдер', icon: '🥗' },
  { id: 'bar_cocktails', name: 'Bar & Cocktails', nameRu: 'Коктейли и бар', nameKy: 'Коктейлдер & бар', icon: '🍸' },
  { id: 'tea_hookah', name: 'Tea & Hookah', nameRu: 'Чай и кальяны', nameKy: 'Чай & кальяндар', icon: '🫖' },
];

export const MENU_ITEMS: MenuItem[] = [
  // Hot Bites & Platters (Food Menu)
  {
    id: 'pitstop-signature-food',
    name: 'Фирменное Блюдо "PIT STOP" (Signature Food)',
    nameRu: 'Фирменное Блюдо "PIT STOP" (Signature Food)',
    nameKy: 'Фирмалык тамак "PIT STOP" (Signature Food)',
    nameEn: 'Pit Stop Signature Food',
    category: 'hot_bites',
    description:
      'Главный кулинарный шедевр заведения: нежные стейк-медальоны на гриле, сочные ребра BBQ в пикантной глазури, хрустящие куриные кусочки в панировке панко, тигровые креветки, запеченный молодой картофель с розмарином, кукуруза гриль и три фирменных соуса (трюфельный айоли, дымный BBQ и сливочный ранч).',
    descriptionKy:
      'Мекеменин башкы кулинардык шедеври: грилде бышкан ширелүү стейк-медальондор, BBQ кабыргалары, кытырак панко тоок эти, жолборс креветкалары, розмарин кошулган картошка, гриль жүгөрүсү жана 3 фирмалык соус.',
    descriptionEn:
      "The house's signature culinary centerpiece: flame-grilled beef steak medallions, glazed BBQ baby back ribs, crispy panko chicken bites, succulent grilled tiger prawns, rosemary roasted baby potatoes, charred sweet corn, and a trio of artisanal dips (truffle aioli, smokey BBQ & creamy ranch).",
    price: 1650,
    portion: '1100г',
    prepTime: '20-25 мин',
    badge: 'Signature',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    calories: 1450,
  },
  {
    id: 'shashlik-platter',
    name: 'Шашлычное Ассорти "Grand Prix"',
    nameRu: 'Шашлычное Ассорти "Grand Prix"',
    nameKy: 'Шишкебек ассортиси "Grand Prix"',
    nameEn: 'Grand Prix Shish Kebab Platter',
    category: 'hot_bites',
    description:
      'Шашлык на углях: сочный люля-кебаб из баранины, нежное куриное филе, шашлык из вырезки говядины, маринованный лук с сумахом, свежая зелень и лаваш с соусом сацебели.',
    descriptionKy:
      'Чоктун табында бышкан шишкебектер: ширелүү козу этинен люля-кебаб, тоок этинен шишкебек, уйдун сулп эти, маринаддалган пияз, лаваш жана сацебели соусу.',
    descriptionEn:
      'Charcoal-grilled kebabs: juicy minced lamb lula kebab, tender chicken fillet, tender beef cuts, sumac pickled onions, fresh herbs, lavash bread, and Georgian satsebeli sauce.',
    price: 1850,
    portion: '800г / 200г',
    prepTime: '20-25 мин',
    badge: 'Chef Choice',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    calories: 1420,
  },
  {
    id: 'garlic-croutons',
    name: 'Бородинские Гренки с Чесноком и Пармезаном',
    nameRu: 'Бородинские Гренки с Чесноком и Пармезаном',
    nameKy: 'Сарымсак жана пармезан кошулган бородин гренкилери',
    nameEn: 'Garlic Rye Croutons with Parmesan',
    category: 'hot_bites',
    description:
      'Хрустящие брусочки темного бородинского хлеба, обжаренные в чесночном масле с морской солью, тертым сыром пармезан и белым сливочным соусом тар-тар.',
    descriptionKy:
      'Сарымсак майына куурулган кара нан тилимдери, пармезан сыры жана назик тар-тар соусу менен.',
    descriptionEn:
      'Crispy toasted dark Borodinsky rye bread fingers tossed in garlic oil, sea salt, shaved parmesan, and creamy herb tartar sauce.',
    price: 360,
    portion: '220г',
    prepTime: '8-10 мин',
    badge: 'Karaoke Hit',
    image:
      'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
  },
  {
    id: 'crispy-wings-bbq',
    name: 'Хрустящие Крылышки Buffalo & BBQ',
    nameRu: 'Хрустящие Крылышки Buffalo & BBQ',
    nameKy: 'Кытырак тоок канаттары Buffalo & BBQ',
    nameEn: 'Crispy Buffalo & BBQ Wings',
    category: 'hot_bites',
    description:
      'Обжаренные до золотистой корочки куриные крылышки в пикантной глазури BBQ с кунжутом, подаются со свежими стеблями сельдерея и соусом Blue Cheese.',
    descriptionKy:
      'Атайын BBQ глазурунда бышырылган ширелүү тоок канаттары, кунжут себилген, сельдерей жана Blue Cheese соусу менен.',
    descriptionEn:
      'Golden crispy glazed chicken wings tossed in tangy smokey BBQ glaze with sesame seeds, crisp celery sticks, and blue cheese dip.',
    price: 590,
    portion: '350г',
    prepTime: '12-15 мин',
    spicy: true,
    image:
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tempura-shrimp',
    name: 'Тигровые Креветки Темпура',
    nameRu: 'Тигровые Креветки Темпура',
    nameKy: 'Темпурадагы жолборс креветкалары',
    nameEn: 'Crispy Tiger Shrimp Tempura',
    category: 'hot_bites',
    description:
      'Крупные тигровые креветки в легком хрустящем кляре темпура с кисло-сладким соусом сладкий чили и долькой лайма.',
    descriptionKy:
      'Жеңил темпура камырында куурулган чоң креветкалар, таттуу чили соусу жана лайм менен.',
    descriptionEn:
      'Jumbo tiger prawns in delicate crispy Japanese tempura batter served with sweet chili dipping sauce and lime wedge.',
    price: 780,
    portion: '240г',
    prepTime: '10-12 мин',
    badge: 'Signature',
    image:
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
  },

  // Mains & Steaks (Food Menu)
  {
    id: 'pitstop-smash-burger',
    name: 'Фирменный Смаш-Бургер "PIT STOP"',
    nameRu: 'Фирменный Смаш-Бургер "PIT STOP"',
    nameKy: 'Фирмалык "PIT STOP" смаш-бургери',
    nameEn: 'Signature Pit Stop Smash Burger',
    category: 'mains_steaks',
    description:
      'Двойная котлета из мраморной говядины Black Angus, карамелизованный лук, сыр чеддер, хрустящий бекон, трюфельный соус на бриошь-булочке с картошкой фри.',
    descriptionKy:
      'Black Angus уй этинен кош котлета, чеддер сыры, кытырак бекон, трюфель соусу, жумшак бриошь наны жана фри картошкасы.',
    descriptionEn:
      'Double smashed Black Angus beef patties, caramelized onions, melted cheddar cheese, smoked bacon, pickle relish, and black truffle aioli on brioche with fries.',
    price: 690,
    portion: '420г / 150г',
    prepTime: '15-18 мин',
    badge: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    calories: 890,
  },
  {
    id: 'ribeye-steak',
    name: 'Стейк Рибай Прайм на Гриле',
    nameRu: 'Стейк Рибай Прайм на Гриле',
    nameKy: 'Грилде бышырылган Рибай Прайм стейки',
    nameEn: 'Prime Ribeye Steak with Grilled Veggies',
    category: 'mains_steaks',
    description:
      'Премиальный отруб мраморной говядины зернового откорма на гриле с розмарином и чесночным маслом. Подается с овощами гриль и перечным соусом.',
    descriptionKy:
      'Премиум мрамор уй этинен даярдалган ширелүү стейк, розмарин жана гриль жашылчалары (цуккини, калемпир, черри) менен.',
    descriptionEn:
      'Grain-fed prime marbled beef ribeye steak seared over flame with rosemary butter, grilled seasonal vegetables, and Madagascar peppercorn demi-glace.',
    price: 1650,
    portion: '320г / 120г',
    prepTime: '20 мин',
    badge: 'Chef Choice',
    image:
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    calories: 780,
  },
  {
    id: 'pasta-carbonara',
    name: 'Паста Карбонара Классическая',
    nameRu: 'Паста Карбонара Классическая',
    nameKy: 'Классикалык Карбонара пастасы',
    nameEn: 'Classic Carbonara Pasta with Pancetta',
    category: 'mains_steaks',
    description:
      'Итальянские спагетти с хрустящей панчеттой, соусом на основе яичных желтков, выдержанного пармезана и свежемолотого черного перца.',
    descriptionKy:
      'Кытырак панчетта, жумуртканын сарысы, пармезан сыры жана жаңы майдаланган кара калемпир кошулган италиялык паста.',
    descriptionEn:
      'Artisanal spaghetti pasta with crispy cured pancetta, free-range egg yolk emulsion, aged Parmigiano Reggiano, and freshly cracked black pepper.',
    price: 580,
    portion: '320г',
    prepTime: '12-15 мин',
    image:
      'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'grilled-salmon-fillet',
    name: 'Филе Лосося на Гриле со Спаржей',
    nameRu: 'Филе Лосося на Гриле со Спаржей',
    nameKy: 'Грилде бышкан лосось балыгы спаржа менен',
    nameEn: 'Grilled Atlantic Salmon with Asparagus',
    category: 'mains_steaks',
    description:
      'Нежное филе атлантического лосося с хрустящей корочкой, спаржей на пару, томатами конфи и цитрусово-сливочным соусом голландез.',
    descriptionKy:
      'Атлантика лососунун ширелүү филеси, бууда бышкан спаржа, черри томаттары жана назик лимон-каймак соусу.',
    descriptionEn:
      'Pan-seared Atlantic salmon fillet with crispy skin, steamed green asparagus spears, confit cherry tomatoes, and citrus Hollandaise drizzle.',
    price: 1190,
    portion: '280г',
    prepTime: '18-20 мин',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
  },

  // Pizza & Sushi (Food Menu)
  {
    id: 'pizza-pitstop-special',
    name: 'Пицца "Pit Stop Turbo Meat" (32 см)',
    nameRu: 'Пицца "Pit Stop Turbo Meat" (32 см)',
    nameKy: '"Pit Stop Turbo Meat" эт пиццасы (32 см)',
    nameEn: 'Pit Stop Turbo Meat Pizza (32cm)',
    category: 'pizza_sushi',
    description:
      'Тонкое итальянское тесто, томатный соус San Marzano, моцарелла, пепперони, охотничьи колбаски, бекон, вырезка говядины и халапеньо.',
    descriptionKy:
      'Ичке италиялык камыр, моцарелла сыры, пепперони, колбасалар, бекон, уй эти жана ачуу халапеньо.',
    descriptionEn:
      'Hand-stretched stone baked crust, San Marzano tomato sauce, mozzarella, spicy pepperoni, smoked sausages, bacon, beef tenderloin, and sliced jalapeños.',
    price: 790,
    portion: '580г',
    prepTime: '12-15 мин',
    badge: 'Karaoke Hit',
    spicy: true,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pizza-quattro-formaggi',
    name: 'Пицца "Четыре Сыра" (Quattro Formaggi)',
    nameRu: 'Пицца "Четыре Сыра" (Quattro Formaggi)',
    nameKy: '"Төрт Сыр" пиццасы (32 см)',
    nameEn: 'Four Cheese Gourmet Pizza',
    category: 'pizza_sushi',
    description:
      'Сливочная основа, тягучая моцарелла, благородный сыр Дор Блю, нежный сыр Рикотта, стружка выдержанного Пармезана и капли трюфельного меда.',
    descriptionKy:
      'Каймак негизи, моцарелла, Дор Блю, рикотта, пармезан сырлары жана табигый бал тамчылары.',
    descriptionEn:
      'Velvety cream base, fior di latte mozzarella, pungent Gorgonzola blue, creamy ricotta, aged parmesan shavings, and aromatic truffle honey drizzle.',
    price: 720,
    portion: '520г',
    prepTime: '12-15 мин',
    vegetarian: true,
    image:
      'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'roll-philadelphia',
    name: 'Ролл Филадельфия Люкс со Свежим Лососем',
    nameRu: 'Ролл Филадельфия Люкс со Свежим Лососем',
    nameKy: 'Лосось балыгы кошулган Филадельфия Люкс роллу',
    nameEn: 'Philadelphia Lux Fresh Salmon Roll (8 pcs)',
    category: 'pizza_sushi',
    description:
      'Свежий норвежский лосось, сливочный сыр Cremette, спелый авокадо, огурчик, японский рис и водоросли нори.',
    descriptionKy:
      'Жаңы норвегиялык лосось, Cremette каймак сыры, авокадо, бадыраң, жапон күрүчү жана нори.',
    descriptionEn:
      'Fresh Norwegian salmon slice wrapping rich Cremette cream cheese, ripe avocado, crisp cucumber, seasoned sushi rice, and toasted nori seaweed.',
    price: 650,
    portion: '280г',
    prepTime: '10-12 мин',
    image:
      'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
  },

  // Salads & Platters (Food Menu)
  {
    id: 'caesar-shrimp',
    name: 'Салат Цезарь с Тигровыми Креветками',
    nameRu: 'Салат Цезарь с Тигровыми Креветками',
    nameKy: 'Жолборс креветкалары кошулган Цезарь салаты',
    nameEn: 'Caesar Salad with Grilled Tiger Shrimps',
    category: 'salads_cold',
    description:
      'Листья салата Романо, тигровые креветки на гриле, томаты черри, чесночные крутоны, сыр пармезан и аутентичный соус цезарь.',
    descriptionKy:
      'Романо салат жалбырактары, грилдеги жолборс креветкалары, черри помидорлору, пармезан сыры жана цезарь соусу.',
    descriptionEn:
      'Crisp romaine lettuce hearts tossed with garlic herb croutons, shaved parmesan, charred tiger prawns, cherry tomatoes, and house anchovy dressing.',
    price: 640,
    portion: '260г',
    prepTime: '10-12 мин',
    badge: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'meat-platter',
    name: 'Мясное Плато Деликатесов',
    nameRu: 'Мясное Плато Деликатесов',
    nameKy: 'Эт деликатестеринин табагы (Казы, бастурма, суджук)',
    nameEn: 'Artisanal Cured Meat Board',
    category: 'salads_cold',
    description:
      'Традиционные мясные деликатесы: ароматный казы по-домашнему, бастурма из говядины, суджук, сыровяленая вырезка, оливки и дижонская горчица.',
    descriptionKy:
      'Салттуу эт тамактары: үй казысы, уй этинен бастурма, сүрсүгөн эт, зайтун жана горчица.',
    descriptionEn:
      'Premium regional cold cuts: home-cured kazy, spiced beef pastirma, sujuk salami, bresaola slices, kalamata olives, and grain Dijon mustard.',
    price: 1100,
    portion: '380г',
    prepTime: '8 мин',
    badge: 'Signature',
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cheese-platter',
    name: 'Сырная Тарелка с Медом и Орехами',
    nameRu: 'Сырная Тарелка с Медом и Орехами',
    nameKy: 'Бал жана жаңгак кошулган сыр табагы',
    nameEn: 'Artisan Cheese Platter with Honey & Walnuts',
    category: 'salads_cold',
    description:
      'Ассорти благородных сыров: пармезан, сыр Бри с белой плесенью, пикантный Дор Блю, молодой сыр, мед, грецкие орехи и виноград.',
    descriptionKy:
      'Сыр ассортиси: пармезан, Бри сыры, Дор Блю, табигый тоо балы, грек жаңгагы жана жаңы жүзүм.',
    descriptionEn:
      'Curated cheese selection: aged Parmigiano, French Brie, Roquefort blue, mild Gouda, mountain floral honey, toasted walnuts, and fresh grapes.',
    price: 980,
    portion: '320г',
    prepTime: '8 мин',
    vegetarian: true,
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
  },

  // Bar Menu & Cocktails (Bar Menu)
  {
    id: 'cocktail-pitstop-nitro',
    name: 'Авторский Коктейль "PIT STOP NITRO"',
    nameRu: 'Авторский Коктейль "PIT STOP NITRO"',
    nameKy: '"PIT STOP NITRO" фирмалык автордук коктейли',
    nameEn: 'Signature "PIT STOP NITRO" Cocktail',
    category: 'bar_cocktails',
    description:
      'Фирменный коктейль бара: премиальный ром, ликер Blue Curacao, маракуйя, цитрусовый кордиал, Prosecco и эффектная дымная подача сухого льда!',
    descriptionKy:
      'Бардын фирмалык коктейли: премиум ром, Blue Curacao ликери, маракуйя, цитрус, Prosecco жана кургак муз менен кооз коюлган шоу-подача!',
    descriptionEn:
      'The house showstopper: aged gold rum, blue curaçao, passionfruit pulp, citrus botanical cordial, topped with chilled Prosecco and dramatic dry ice mist.',
    price: 590,
    portion: '320мл',
    prepTime: '4 мин',
    badge: 'Signature',
    image:
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cocktail-aperol-spritz',
    name: 'Aperol Spritz Grande (Апероль Спритц)',
    nameRu: 'Aperol Spritz Grande (Апероль Спритц)',
    nameKy: 'Aperol Spritz Grande коктейли',
    nameEn: 'Classic Aperol Spritz Grande',
    category: 'bar_cocktails',
    description:
      'Итальянский аперитив Aperol, сухое игристое вино Prosecco DOC, содовая, долька свежего сочного апельсина и много кускового льда.',
    descriptionKy:
      'Италиялык Aperol аперитивы, Prosecco кургак ак шарабы, сода суусу, апельсин тилими жана муз.',
    descriptionEn:
      'Classic Italian Aperol liqueur, sparkling crisp Prosecco DOC, splash of soda, fresh orange slice, and crystal cube ice.',
    price: 490,
    portion: '300мл',
    prepTime: '3 мин',
    badge: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cocktail-smoked-old-fashioned',
    name: 'Дымный Олд Фэшн "Bourbon Track"',
    nameRu: 'Дымный Олд Фэшн "Bourbon Track"',
    nameKy: 'Түтүндүү "Bourbon Track" Олд Фэшн',
    nameEn: 'Smoked Oak Bourbon Old Fashioned',
    category: 'bar_cocktails',
    description:
      'Американский бурбон Maker’s Mark, биттер Angostura, тростниковый сахар, апельсиновая цедра под стеклянным куполом с дымом от дубовой щепы.',
    descriptionKy:
      'Америкалык Maker’s Mark бурбону, Angostura биттери, тростник канты, апельсин кабыгы жана эмен түтүнү менен берилет.',
    descriptionEn:
      'Aged Maker’s Mark Kentucky bourbon, Angostura aromatic bitters, turbinado cane syrup, expressed orange twist, smoked tableside under a glass cloche.',
    price: 520,
    portion: '150мл',
    prepTime: '6 мин',
    badge: 'Chef Choice',
    image:
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'shot-set-redline',
    name: 'Сет Шотов "Redline 9000" (6 шт)',
    nameRu: 'Сет Шотов "Redline 9000" (6 шт)',
    nameKy: '"Redline 9000" шоттор сети (6 даана)',
    nameEn: 'Redline 9000 Party Shots (6 pcs)',
    category: 'bar_cocktails',
    description:
      'Заряд энергии перед выходом к караоке-микрофону: гренадин, ликер персик, текила и водка с огненным послевкусием!',
    descriptionKy:
      'Караокеде ырдаар алдында мыкты көңүл көтөргүч: гренадин, шабдаалы ликери, текила жана оттуу шоттор!',
    descriptionEn:
      'High-octane party shooters: layered pomegranate grenadine, peach liqueur, silver tequila, and premium vodka.',
    price: 990,
    portion: '6 x 50мл',
    prepTime: '5 мин',
    badge: 'Karaoke Hit',
    image:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'craft-draft-beer',
    name: 'Разливное Пиво Heineken / Stella (0.5л)',
    nameRu: 'Разливное Пиво Heineken / Stella (0.5л)',
    nameKy: 'Куюлма муздак сыра Heineken / Stella (0.5л)',
    nameEn: 'Chilled Draft European Beer (0.5L)',
    category: 'bar_cocktails',
    description:
      'Ледяное свежее разливное пиво прямо из кегов с плотной кремовой пеной.',
    descriptionKy:
      'Кегден куюлган муздак жаңы сыра коюу көбүгү менен.',
    descriptionEn:
      'Crisp, ice-cold European lager poured directly from draft taps with dense creamy white head.',
    price: 320,
    portion: '500мл',
    prepTime: '2 мин',
    image:
      'https://images.unsplash.com/photo-1608270119332-9c3db68ea23f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'lemonade-passion-berry',
    name: 'Домашний Лимонад "Малина-Маракуйя" (1 Литр)',
    nameRu: 'Домашний Лимонад "Малина-Маракуйя" (1 Литр)',
    nameKy: '"Малина-Маракуйя" үй лимонады (1 литр)',
    nameEn: 'Artisan Raspberry Passionfruit Lemonade (1L)',
    category: 'bar_cocktails',
    description:
      'Освежающий натуральный лимонад на пюре дикой малины и маракуйи с мятой, лаймом и колотым льдом. Отлично для голоса!',
    descriptionKy:
      'Табигый малина жана маракуйя пюресинен жасалган сергитүүчү лимонад, жалбыз, лайм жана муз менен.',
    descriptionEn:
      'Handcrafted pitcher of fresh wild raspberry and passionfruit puree, fresh mint sprigs, lime juice, and crushed ice.',
    price: 450,
    portion: '1000мл',
    prepTime: '5 мин',
    badge: 'Bestseller',
    vegetarian: true,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
  },

  // Tea, Coffee & Hookah (Bar & Lounge Menu)
  {
    id: 'tea-seabuckthorn-ginger',
    name: 'Авторский Чай "Облепиха с Имбирем и Медом"',
    nameRu: 'Авторский Чай "Облепиха с Имбирем и Медом"',
    nameKy: '"Чычырканак, имбирь жана бал" автордук чайы',
    nameEn: 'Sea Buckthorn & Ginger Artisanal Tea',
    category: 'tea_hookah',
    description:
      'Свежая облепиха, корень имбиря, апельсин, бадьян, мед в прозрачном чайнике на подогреве со свечой. Лучший напиток для вокала!',
    descriptionKy:
      'Жаңы чычырканак, имбирь тамыры, апельсин, бадьян жана табигый бал шамдын үстүндө ысытылган айнек чайнекте. Ырдоо үчүн эң мыкты суусундук!',
    descriptionEn:
      'Golden wild sea buckthorn berries, fresh ginger root, sliced orange, star anise, and raw mountain honey served in a warm glass teapot over a flame.',
    price: 420,
    portion: '800мл',
    prepTime: '8 мин',
    badge: 'Karaoke Hit',
    vegetarian: true,
    image:
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'hookah-premium',
    name: 'Премиальный Кальян на Фруктовой Чаше',
    nameRu: 'Премиальный Кальян на Фруктовой Чаше',
    nameKy: 'Премиум кальян жемиш чашасында',
    nameEn: 'Signature Fruit Bowl Hookah',
    category: 'tea_hookah',
    description:
      'Дымный премиум кальян на чаше из грейпфрута или ананаса. Топовые табаки: Darkside, Tangiers, MustHave. Мастер подберет микс.',
    descriptionKy:
      'Грейпфрут же ананас чашасындагы түтүндүү премиум кальян. Сапаттуу табактар: Darkside, MustHave, Tangiers. Кальян чебери жеке микс тандайт.',
    descriptionEn:
      'High-grade smoke craft on fresh carved grapefruit or pineapple bowl. Top-tier leaf blends (Darkside, Tangiers, MustHave) crafted by our hookah sommelier.',
    price: 1300,
    portion: '90 мин',
    prepTime: '12-15 мин',
    badge: 'Signature',
    image:
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
  },
];
