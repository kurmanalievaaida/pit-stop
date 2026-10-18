import React, { useState, useMemo } from 'react';
import { MenuItem, MenuCategory, CartItem, OrderTracking } from '../types';
import { MENU_CATEGORIES, MENU_ITEMS } from '../services/menuData';
import { VENUE_ROOMS_DATA } from '../services/venueData';
import { Language, TRANSLATIONS } from '../services/i18n';
import {
  Utensils,
  Search,
  Plus,
  Minus,
  ShoppingCart,
  Bell,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  X,
  Send,
  Coffee,
  Wine,
  Trash2,
  ChefHat,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface FoodMenuProps {
  activeRoomId: string;
  onSelectRoom: (roomId: string) => void;
  language: Language;
}

export const FoodMenu: React.FC<FoodMenuProps> = ({
  activeRoomId,
  onSelectRoom,
  language,
}) => {
  const t = TRANSLATIONS[language];

  // Menu Mode: All / Food Menu / Bar Menu
  const [menuMode, setMenuMode] = useState<'all' | 'food' | 'bar'>('all');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterTag, setFilterTag] = useState<'all' | 'hit' | 'spicy'>('all');

  // Cart and Order state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<OrderTracking | null>(null);

  // Active room data
  const currentRoom = VENUE_ROOMS_DATA.find((r) => r.id === activeRoomId) || VENUE_ROOMS_DATA[0];

  const getRoomName = (room: typeof VENUE_ROOMS_DATA[0]) => {
    if (language === 'ky' && room.nameKy) return room.nameKy;
    if (language === 'ru') return room.nameRu;
    return room.name;
  };

  const getItemName = (item: MenuItem) => {
    if (language === 'ky' && item.nameKy) return item.nameKy;
    if (language === 'en' && item.nameEn) return item.nameEn;
    return item.nameRu || item.name;
  };

  const getItemDescription = (item: MenuItem) => {
    if (language === 'ky' && item.descriptionKy) return item.descriptionKy;
    if (language === 'en' && item.descriptionEn) return item.descriptionEn;
    return item.description;
  };

  // Cart operations
  const addToCart = (menuItem: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { menuItem, quantity: 1 }];
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.menuItem.id === menuItemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.menuItem.id === menuItemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.menuItem.id !== menuItemId);
    });
  };

  const clearCart = () => setCart([]);

  const getItemQuantity = (menuItemId: string): number => {
    return cart.find((i) => i.menuItem.id === menuItemId)?.quantity || 0;
  };

  const totalItemsCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);

  // Submit order to kitchen & bar
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const newOrder: OrderTracking = {
      orderNumber: Math.floor(1000 + Math.random() * 9000).toString(),
      roomId: currentRoom.id,
      roomName: getRoomName(currentRoom),
      items: [...cart],
      totalPrice,
      status: 'received',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: 15,
    };

    setActiveTrackingOrder(newOrder);
    setCart([]);
    setIsCartOpen(false);
    setOrderNotes('');

    // Simulate Kitchen progress
    setTimeout(() => {
      setActiveTrackingOrder((prev: OrderTracking | null) => (prev ? { ...prev, status: 'cooking' } : null));
    }, 4000);

    setTimeout(() => {
      setActiveTrackingOrder((prev: OrderTracking | null) => (prev ? { ...prev, status: 'delivering' } : null));
    }, 9000);
  };

  // Categories visible depending on Food vs Bar vs All
  const availableCategories = useMemo(() => {
    if (menuMode === 'food') {
      return MENU_CATEGORIES.filter((c) =>
        ['all', 'hot_bites', 'mains_steaks', 'pizza_sushi', 'salads_cold'].includes(c.id)
      );
    }
    if (menuMode === 'bar') {
      return MENU_CATEGORIES.filter((c) =>
        ['all', 'bar_cocktails', 'tea_hookah'].includes(c.id)
      );
    }
    return MENU_CATEGORIES;
  }, [menuMode]);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Menu mode filter (Food vs Bar)
      if (menuMode === 'food') {
        const foodCategories = ['hot_bites', 'mains_steaks', 'pizza_sushi', 'salads_cold'];
        if (!foodCategories.includes(item.category)) return false;
      } else if (menuMode === 'bar') {
        const barCategories = ['bar_cocktails', 'tea_hookah'];
        if (!barCategories.includes(item.category)) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (filterTag === 'hit' && item.badge !== 'Karaoke Hit' && item.badge !== 'Bestseller') {
        return false;
      }
      if (filterTag === 'spicy' && !item.spicy) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName =
          item.name.toLowerCase().includes(query) ||
          (item.nameRu && item.nameRu.toLowerCase().includes(query)) ||
          (item.nameKy && item.nameKy.toLowerCase().includes(query)) ||
          (item.nameEn && item.nameEn.toLowerCase().includes(query));
        const matchesDesc =
          item.description.toLowerCase().includes(query) ||
          (item.descriptionKy && item.descriptionKy.toLowerCase().includes(query)) ||
          (item.descriptionEn && item.descriptionEn.toLowerCase().includes(query));
        return matchesName || matchesDesc;
      }

      return true;
    });
  }, [menuMode, selectedCategory, filterTag, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Hero Header & Bar/Food Mode Switcher */}
      <div className="relative overflow-hidden rounded-3xl border border-[#394a30] bg-[#222e1c]/95 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-black uppercase text-amber-400 backdrop-blur-md">
              <Utensils className="h-3.5 w-3.5" />
              <span>{t.menuHeroBadge}</span>
            </div>
            <h2 className="mt-3 font-racing text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
              {t.menuHeroTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {t.menuHeroDesc}
            </p>
          </div>

          {/* Quick Actions: Open Cart */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 rounded-2xl bg-amber-500 px-5 py-3 text-xs font-black uppercase text-black shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 active:scale-95"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{t.cartBtn}</span>
              {totalItemsCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-black text-amber-400">
                  {totalItemsCount}
                </span>
              )}
              {totalPrice > 0 && (
                <span className="ml-1 rounded-lg bg-black/20 px-2 py-0.5 text-[11px] font-bold text-black">
                  {totalPrice.toLocaleString()} {t.currency}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* FOOD MENU vs BAR MENU Big Toggle Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#394a30] pt-6">
          <button
            onClick={() => {
              setMenuMode('all');
              setSelectedCategory('all');
            }}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
              menuMode === 'all'
                ? 'bg-amber-500 text-black shadow-lg font-black'
                : 'bg-[#1a2316] text-zinc-300 hover:bg-[#25321f] hover:text-white border border-[#394a30]'
            }`}
          >
            <span>🍽️</span>
            <span>{t.tabMenu}</span>
          </button>

          <button
            onClick={() => {
              setMenuMode('food');
              setSelectedCategory('all');
            }}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
              menuMode === 'food'
                ? 'bg-amber-500 text-black shadow-lg font-black'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800'
            }`}
          >
            <span>🥩</span>
            <span>{t.tabFoodMenu} (Kitchen Menu)</span>
          </button>

          <button
            onClick={() => {
              setMenuMode('bar');
              setSelectedCategory('all');
            }}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
              menuMode === 'bar'
                ? 'bg-amber-500 text-black shadow-lg font-black'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800'
            }`}
          >
            <span>🍸</span>
            <span>{t.tabBarMenu} (Cocktails & Bar)</span>
          </button>
        </div>
      </div>

      {/* Table Selector & Search Filters */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-xl">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:items-center">
          {/* Room / Booth Selector */}
          <div className="sm:col-span-4 flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 shrink-0">
              {t.tableSelectorLabel}
            </span>
            <select
              value={activeRoomId}
              onChange={(e) => onSelectRoom(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
            >
              {VENUE_ROOMS_DATA.map((r) => (
                <option key={r.id} value={r.id}>
                  {getRoomName(r)}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="sm:col-span-5 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Tags (All / Karaoke Hits / Spicy) */}
          <div className="sm:col-span-3 flex items-center justify-end gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterTag('all')}
              className={`rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all ${
                filterTag === 'all'
                  ? 'bg-zinc-800 text-white'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setFilterTag('hit')}
              className={`flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all ${
                filterTag === 'hit'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>{t.filterHits}</span>
            </button>
            <button
              onClick={() => setFilterTag('spicy')}
              className={`flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all ${
                filterTag === 'spicy'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Flame className="h-3 w-3 text-red-400" />
              <span>{t.filterSpicy}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Order Status Tracker */}
      {activeTrackingOrder && (
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-zinc-950 p-4 shadow-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <ChefHat className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-racing text-sm font-bold text-white uppercase">
                    Заказ #{activeTrackingOrder.orderNumber}
                  </span>
                  <span className="text-xs text-zinc-400">• {activeTrackingOrder.roomName}</span>
                </div>
                <p className="text-xs text-zinc-400">
                  {activeTrackingOrder.items.length} блюд(а) • Сумма: {activeTrackingOrder.totalPrice.toLocaleString()} {t.currency}
                </p>
              </div>
            </div>

            {/* Status Steps */}
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  activeTrackingOrder.status === 'received'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 animate-pulse'
                    : 'bg-zinc-900 text-zinc-500'
                }`}
              >
                <span>{t.orderStatus1}</span>
              </div>

              <ChevronRight className="h-3 w-3 text-zinc-600" />

              <div
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  activeTrackingOrder.status === 'cooking'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                    : activeTrackingOrder.status === 'delivering' || activeTrackingOrder.status === 'served'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-zinc-900 text-zinc-500'
                }`}
              >
                <span>{t.orderStatus2}</span>
              </div>

              <ChevronRight className="h-3 w-3 text-zinc-600" />

              <div
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  activeTrackingOrder.status === 'delivering'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse'
                    : 'bg-zinc-900 text-zinc-500'
                }`}
              >
                <span>{t.orderStatus3}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subcategory Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {availableCategories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const catName =
            language === 'ky' ? cat.nameKy : language === 'en' ? cat.name : cat.nameRu;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                isActive
                  ? 'border border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
                  : 'border border-[#394a30] bg-[#1d2719] text-zinc-300 hover:border-[#4d6342] hover:bg-[#25321f]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{catName}</span>
            </button>
          );
        })}
      </div>

      {/* Menu Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const qty = getItemQuantity(item.id);
          const itemName = getItemName(item);
          const itemDesc = getItemDescription(item);

          return (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#394a30] bg-[#222e1c]/95 p-4 shadow-xl transition-all hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              <div>
                {/* Image and Badges */}
                <div className="relative mb-3 h-48 w-full overflow-hidden rounded-2xl bg-[#182215]">
                  <img
                    src={item.image}
                    alt={itemName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    {item.badge && (
                      <span className="rounded-lg border border-amber-500/50 bg-black/80 px-2 py-0.5 text-[10px] font-black uppercase text-amber-400 backdrop-blur-md">
                        {item.badge}
                      </span>
                    )}
                    {item.spicy && (
                      <span className="flex items-center gap-0.5 rounded-lg border border-red-500/40 bg-red-950/80 px-1.5 py-0.5 text-[10px] font-bold text-red-400">
                        <Flame className="h-3 w-3 fill-current" /> {t.filterSpicy}
                      </span>
                    )}
                  </div>

                  {/* Portion & Prep time pill */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2 rounded-lg bg-black/75 px-2 py-1 text-[10px] font-semibold text-zinc-300 backdrop-blur-md">
                    <span>{item.portion}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5 text-amber-400" />
                      {item.prepTime}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-racing text-base font-bold text-white transition-colors group-hover:text-amber-400">
                  {itemName}
                </h3>
                {item.nameEn && language !== 'en' && (
                  <p className="text-[11px] font-medium text-zinc-400 mb-1">{item.nameEn}</p>
                )}
                <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {itemDesc}
                </p>
              </div>

              {/* Price & Add to Cart button */}
              <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-3">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-zinc-400">
                    {t.priceLabel}
                  </span>
                  <div className="font-racing text-lg font-black text-amber-400">
                    {item.price.toLocaleString()} <span className="text-xs font-normal text-zinc-400">{t.currency}</span>
                  </div>
                </div>

                {/* Cart Action Buttons */}
                {qty === 0 ? (
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-1.5 rounded-2xl bg-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-100 transition-all hover:bg-amber-500 hover:text-black active:scale-95"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{t.addToCartBtn}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 rounded-2xl border border-amber-500/50 bg-amber-500/10 p-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-black text-amber-400">
                      {qty}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500 text-black hover:bg-amber-400"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Simple Order Pill when Cart has items */}
      {totalItemsCount > 0 && !isCartOpen && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-md">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between gap-3 rounded-2xl bg-amber-500 px-5 py-3.5 text-black font-black shadow-2xl shadow-amber-500/40 hover:bg-amber-400 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs uppercase tracking-wide">
                {language === 'ky' ? 'Буйрутма' : language === 'en' ? 'Your Order' : 'Ваш Заказ'} ({totalItemsCount})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-racing text-sm sm:text-base">
                {totalPrice.toLocaleString()} {t.currency}
              </span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </button>
        </div>
      )}

      {/* Simplified Order & Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-3xl border border-[#2b3a24] bg-[#12180e] p-6 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#283521] pb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-amber-400" />
                <h3 className="font-racing text-lg font-bold text-white">
                  {language === 'ky' ? 'Буйрутманы тариздөө' : language === 'en' ? 'Complete Your Order' : 'Оформление Заказа'}
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-xl p-1 text-zinc-400 hover:bg-[#1f2a18] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Room / Cabin Selector */}
            <div className="mt-4 rounded-2xl border border-[#283521] bg-[#172013] p-3">
              <label className="block text-[11px] font-bold text-emerald-200/90 mb-1 uppercase tracking-wider">
                {t.tableSelectorLabel}
              </label>
              <select
                value={activeRoomId}
                onChange={(e) => onSelectRoom(e.target.value)}
                className="w-full rounded-xl border border-[#35482b] bg-[#0f140b] px-3 py-2 text-xs font-bold text-white focus:border-amber-500 focus:outline-none"
              >
                {VENUE_ROOMS_DATA.map((r) => (
                  <option key={r.id} value={r.id}>
                    {getRoomName(r)}
                  </option>
                ))}
              </select>
            </div>

            {/* Cart Items List */}
            <div className="my-4 flex-1 space-y-3 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  <Utensils className="mx-auto h-12 w-12 text-zinc-600" />
                  <p className="mt-3 text-xs text-zinc-400">{t.cartEmpty}</p>
                </div>
              ) : (
                cart.map(({ menuItem, quantity }) => (
                  <div
                    key={menuItem.id}
                    className="flex items-center justify-between rounded-2xl border border-[#283521] bg-[#162013] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={menuItem.image}
                        alt={getItemName(menuItem)}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white">{getItemName(menuItem)}</h4>
                        <span className="text-[11px] text-amber-400 font-semibold">
                          {menuItem.price.toLocaleString()} {t.currency} x {quantity} ={' '}
                          {(menuItem.price * quantity).toLocaleString()} {t.currency}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => removeFromCart(menuItem.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#24331c] text-zinc-300 hover:bg-[#2e4024]"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => addToCart(menuItem)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-black hover:bg-amber-400"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Note */}
            {cart.length > 0 && (
              <div className="mb-4">
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder={t.cartNotesPlaceholder}
                  className="w-full rounded-xl border border-[#283521] bg-[#0f140b] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            )}

            {/* Footer / Total / 1-Click Simple Order */}
            {cart.length > 0 && (
              <div className="border-t border-[#283521] pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-1 text-xs text-zinc-400 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>{t.cartClearBtn}</span>
                  </button>

                  <div className="text-right">
                    <span className="text-xs text-zinc-400">{t.cartTotal}</span>
                    <div className="font-racing text-xl font-black text-amber-400">
                      {totalPrice.toLocaleString()} {t.currency}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handlePlaceOrder}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3.5 font-racing text-xs font-black uppercase text-black shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                    <span>{language === 'ky' ? 'Буйрутма берүү' : language === 'en' ? 'Place Order' : 'Подтвердить заказ'}</span>
                  </button>

                  {/* Direct WhatsApp Ordering */}
                  <a
                    href={`https://wa.me/996702832515?text=${encodeURIComponent(
                      language === 'en'
                        ? `Hello! Order from PIT STOP Karaoke (${getRoomName(currentRoom)}):\n${cart
                            .map((c) => `• ${getItemName(c.menuItem)} x${c.quantity} (${c.menuItem.price * c.quantity} KGS)`)
                            .join('\n')}\n${orderNotes ? `Notes: ${orderNotes}\n` : ''}Total: ${totalPrice.toLocaleString()} KGS`
                        : language === 'ky'
                        ? `Саламатсызбы! "ПИТ-СТОП" караокесинен буйрутма (${getRoomName(currentRoom)}):\n${cart
                            .map((c) => `• ${getItemName(c.menuItem)} x${c.quantity} (${c.menuItem.price * c.quantity} сом)`)
                            .join('\n')}\n${orderNotes ? `Каалоо: ${orderNotes}\n` : ''}Жалпы: ${totalPrice.toLocaleString()} сом`
                        : `Здравствуйте! Заказ из Караоке ПИТ-СТОП (${getRoomName(currentRoom)}):\n${cart
                            .map((c) => `• ${getItemName(c.menuItem)} x${c.quantity} (${c.menuItem.price * c.quantity} сом)`)
                            .join('\n')}\n${orderNotes ? `Пожелания: ${orderNotes}\n` : ''}Итого: ${totalPrice.toLocaleString()} сом`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      handlePlaceOrder();
                    }}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 font-racing text-xs font-black uppercase text-white shadow-lg shadow-emerald-950/40 transition-all hover:bg-emerald-500 active:scale-95 text-center"
                  >
                    <span>{language === 'en' ? 'WhatsApp Order' : language === 'ky' ? 'WhatsApp Буйрутма' : 'WhatsApp Заказ'}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
