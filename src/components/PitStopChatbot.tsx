import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronDown,
  PhoneCall,
  Utensils,
  MapPin,
  Clock,
} from 'lucide-react';
import { PitStopLogo } from './PitStopLogo';
import { Language, TRANSLATIONS } from '../services/i18n';
import { AppTab } from './Navbar';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    type: 'tab' | 'whatsapp' | 'call';
    value: string;
  };
}

interface PitStopChatbotProps {
  language: Language;
  onNavigateTab: (tab: AppTab) => void;
}

export const PitStopChatbot: React.FC<PitStopChatbotProps> = ({
  language,
  onNavigateTab,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const t = TRANSLATIONS[language];

  const getInitialMessage = (): ChatMessage => {
    if (language === 'ky') {
      return {
        id: 'msg-init',
        sender: 'bot',
        text: 'Саламатсызбы! Мен "ПИТ-СТОП" караоке-барынын виртуалдык жардамчысымын. Залдар, VIP кабиналар, меню же буйрутма боюнча суроолоруңузга жооп берүүгө даярмын!',
        timestamp: 'азыр',
      };
    }
    if (language === 'en') {
      return {
        id: 'msg-init',
        sender: 'bot',
        text: 'Hello! I am your PIT STOP Karaoke & Lounge virtual assistant. How can I assist you with rooms, food & bar menu, or ordering today?',
        timestamp: 'just now',
      };
    }
    return {
      id: 'msg-init',
      sender: 'bot',
      text: 'Здравствуйте! Я виртуальный ассистент караоке-бара "ПИТ-СТОП" в г. Кант. Подскажу по залам, меню кухни и бара, а также помогу оформить заказ!',
      timestamp: 'сейчас',
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage()]);

  // Update initial message when language changes if no user conversation has taken place
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'bot') {
      setMessages([getInitialMessage()]);
    }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    {
      ru: '🍽️ Что посоветуете из меню?',
      ky: '🍽️ Менюдан эмне сунуштайсыз?',
      en: '🍽️ What food do you recommend?',
      query: 'menu',
    },
    {
      ru: '🎤 Какие есть залы и кабинки?',
      ky: '🎤 Кандай залдар жана кабиналар бар?',
      en: '🎤 What rooms & cabins are available?',
      query: 'rooms',
    },
    {
      ru: '📝 Как сделать заказ?',
      ky: '📝 Кантип буйрутма берсем болот?',
      en: '📝 How do I place an order?',
      query: 'order',
    },
    {
      ru: '📍 Где вы находитесь и часы работы?',
      ky: '📍 Дарегиңиз жана иштөө убактысы?',
      en: '📍 Where are you located and hours?',
      query: 'location',
    },
  ];

  const generateBotReply = (userText: string): { text: string; action?: ChatMessage['action'] } => {
    const q = userText.toLowerCase();

    // 1. Menu recommendations
    if (
      q.includes('меню') ||
      q.includes('тамак') ||
      q.includes('поесть') ||
      q.includes('кухн') ||
      q.includes('блюд') ||
      q.includes('бар') ||
      q.includes('коктейл') ||
      q.includes('menu') ||
      q.includes('food') ||
      q.includes('drink')
    ) {
      if (language === 'ky') {
        return {
          text: 'Биздин эң популярдуу тамактарыбыз:\n• Фирмалык тамак "PIT STOP Signature" (1,650 сом)\n• Шашлык топтому "Grand Prix" (1,850 сом)\n• Стейк Рибай (1,650 сом)\n• "Pit Stop Turbo Meat" пиццасы (790 сом)\n• Автордук коктейлдер жана чайлар.\nКаалаган тамакты Меню барагынан тандап, буйрутма бере аласыз!',
          action: { label: 'Менюну ачуу', type: 'tab', value: 'menu' },
        };
      }
      if (language === 'en') {
        return {
          text: 'Our top customer favorites:\n• Pit Stop Signature Food (1,650 KGS)\n• Grand Prix Charcoal Kebab Platter (1,850 KGS)\n• Prime Ribeye Steak (1,650 KGS)\n• Pit Stop Turbo Meat Pizza (790 KGS)\n• Signature cocktails and artisan hookahs.\nYou can browse and order directly in our Menu tab!',
          action: { label: 'Open Menu', type: 'tab', value: 'menu' },
        };
      }
      return {
        text: 'Наши главные хиты караоке:\n• Фирменное блюдо "PIT STOP Signature" (1 650 сом)\n• Шашлычное ассорти "Grand Prix" (1 850 сом)\n• Сочный стейк Рибай Прайм (1 650 сом)\n• Пицца "Pit Stop Turbo Meat" (790 сом) и роллы Филадельфия (650 сом)\n• Фирменный коктейль "PIT STOP NITRO" (590 сом).\nВы можете выбрать любое блюдо и добавить в заказ в разделе "Меню"!',
        action: { label: 'Открыть Меню', type: 'tab', value: 'menu' },
      };
    }

    // 2. Rooms and Cabins
    if (
      q.includes('зал') ||
      q.includes('кабин') ||
      q.includes('комнат') ||
      q.includes('vip') ||
      q.includes('бөлмө') ||
      q.includes('room') ||
      q.includes('cabin') ||
      q.includes('hall')
    ) {
      if (language === 'ky') {
        return {
          text: 'ПИТ-СТОПто 3 негизги караоке зонасы бар:\n1. Чоң Зал (Hall) — 35 кишиге чейин, кара Chesterfield дивандары, вокалдык сахна жана Concert Grand Sound үнү.\n2. VIP Кабина (VIP Cabin) — 15–25 кишилик банкеттик люкс кабина.\n3. Чакан VIP Кабина — 4–10 кишилик бөлмө, Side Bar & Ресепшн стойкасынын дал жанында жайгашкан.',
          action: { label: 'Залдарды көрүү', type: 'tab', value: 'venue' },
        };
      }
      if (language === 'en') {
        return {
          text: 'PIT STOP offers 3 distinct karaoke spaces:\n1. Main Lounge (Hall) — up to 35 guests, genuine black Chesterfield couches, vocal stage, and Concert Grand Sound acoustics.\n2. VIP Banquet Cabin — private party lounge for 15–25 guests with velvet couches & mirror wall.\n3. Small VIP Cabin — cozy acoustic soundproof pod for 4–10 guests, situated directly beside the Reception & Side Bar.',
          action: { label: 'View Rooms & Map', type: 'tab', value: 'venue' },
        };
      }
      return {
        text: 'В "ПИТ-СТОП" для вас доступны 3 караоке-зала:\n1. Главный Зал (Hall) — до 35 гостей, диваны Chesterfield, сцена и концертный звук Grand Sound.\n2. VIP Зал (VIP Cabin) — роскошная банкетная кабинка на 15–25 персон с фиолетовым велюром и гранёной стеной.\n3. Малая VIP Кабинка (Small Cabin) — уютная изолированная кабинка для компании 4–10 человек, расположенная прямо рядом с Ресепшн и Side Bar.',
        action: { label: 'Посмотреть Залы и Карту', type: 'tab', value: 'venue' },
      };
    }

    // 3. How to order
    if (
      q.includes('заказ') ||
      q.includes('буйрутма') ||
      q.includes('купить') ||
      q.includes('order') ||
      q.includes('как заказать')
    ) {
      if (language === 'ky') {
        return {
          text: 'Буйрутма берүү өтө жөнөкөй:\n1. "Меню" барагына өтүңүз.\n2. Каалаган тамактын жанындагы "+" баскычын басыңыз.\n3. Төмөндөгү "Буйрутма" баскычын басып, залыңызды тандаңыз жана "Буйрутма берүү" же "WhatsApp Заказ" аркылуу жөнөтүңүз!',
          action: { label: 'Менюга өтүү', type: 'tab', value: 'menu' },
        };
      }
      if (language === 'en') {
        return {
          text: 'Ordering is fast and simple:\n1. Go to the "Menu" tab.\n2. Tap "+" on any dish or drink.\n3. Click the bottom Order button, select your room, and tap "Place Order" or send directly via WhatsApp!',
          action: { label: 'Go to Menu', type: 'tab', value: 'menu' },
        };
      }
      return {
        text: 'Сделать заказ очень просто:\n1. Перейдите во вкладку "Меню".\n2. Нажмите "+" на понравившихся блюдах или напитках.\n3. Нажмите кнопку "Ваш Заказ" внизу экрана, выберите ваш зал или кабинку и подтвердите заказ (или отправьте в WhatsApp бармену)!',
        action: { label: 'Перейти в Меню', type: 'tab', value: 'menu' },
      };
    }

    // 4. Location and Hours
    if (
      q.includes('адрес') ||
      q.includes('дарек') ||
      q.includes('где') ||
      q.includes('кайда') ||
      q.includes('время') ||
      q.includes('убакыт') ||
      q.includes('часы') ||
      q.includes('hours') ||
      q.includes('location') ||
      q.includes('address')
    ) {
      if (language === 'ky') {
        return {
          text: '📍 Биздин дарек: Кыргызстан, Кант шаары, Ленин көчөсү 131 (Ленин 68 жанында).\n⏰ Иштөө убактысы: Күн сайын 18:00дөн 03:00гө чейин (дем алыш күндөрү 06:00гө чейин).\n📞 WhatsApp: +996 (702) 832-515',
          action: { label: 'Картаны ачуу', type: 'tab', value: 'venue' },
        };
      }
      if (language === 'en') {
        return {
          text: '📍 Location: Lenina St 131, Kant, Kyrgyzstan (near Lenin 68).\n⏰ Hours: Daily from 18:00 to 03:00 (Fri-Sat until 06:00).\n📞 WhatsApp: +996 (702) 832-515',
          action: { label: 'View on Map', type: 'tab', value: 'venue' },
        };
      }
      return {
        text: '📍 Адрес: Кыргызстан, г. Кант, ул. Ленина 131 (рядом с ул. Ленина 68).\n⏰ Время работы: Ежедневно с 18:00 до 03:00 (по выходным до 06:00 утра).\n📞 Телефон / WhatsApp: +996 (702) 832-515',
        action: { label: 'Посмотреть на Карте', type: 'tab', value: 'venue' },
      };
    }

    // 5. Contacts / WhatsApp
    if (
      q.includes('whatsapp') ||
      q.includes('телефон') ||
      q.includes('ватсап') ||
      q.includes('номер') ||
      q.includes('связ') ||
      q.includes('байланыш') ||
      q.includes('contact') ||
      q.includes('phone')
    ) {
      return {
        text:
          language === 'ky'
            ? 'Биз менен байланышуу үчүн түз WhatsAppка жазсаңыз болот: +996 (702) 832-515'
            : language === 'en'
            ? 'You can reach us directly on WhatsApp: +996 (702) 832-515'
            : 'Вы можете связаться с нами напрямую в WhatsApp: +996 (702) 832-515',
        action: { label: 'Написать в WhatsApp', type: 'whatsapp', value: '996702832515' },
      };
    }

    // Default polite response
    if (language === 'ky') {
      return {
        text: 'Рахмат сурооңуз үчүн! Мен сизге Меню тандоодо, Канттагы залдарды көрүүдө же буйрутма берүүдө жардам бере алам. Сурооңузду тактап жазсаңыз же төмөндөгү баскычтарды колдонуңуз.',
      };
    }
    if (language === 'en') {
      return {
        text: "Thanks for reaching out! I'm here to help you explore our rooms in Kant, recommend food & cocktails, or assist with ordering. Feel free to ask anything or use the buttons below.",
      };
    }
    return {
      text: 'Спасибо за вопрос! Я с удовольствием расскажу вам о залах караоке ПИТ-СТОП в Канте, помогу выбрать блюда из кухни и бара или оформить заказ. Чем еще могу помочь?',
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateBotReply(text);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: reply.action,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Chatbot Launch Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-5 z-40 flex items-center gap-2.5 rounded-full border-2 border-amber-500/70 bg-[#141b10] px-4 py-3 text-white shadow-[0_4px_25px_rgba(245,158,11,0.35)] transition-all hover:scale-105 hover:bg-[#1a2315] active:scale-95 group"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-black">
            <Bot className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-black uppercase text-amber-400">
              {language === 'ky' ? 'Пит-Стоп Бот' : language === 'en' ? 'Pit Stop AI' : 'Пит-Стоп Бот'}
            </p>
            <p className="text-[10px] text-emerald-300/80 font-medium">Онлайн • Помощник</p>
          </div>
        </button>
      )}

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-4 z-50 flex h-[540px] max-h-[85vh] w-[360px] sm:w-[400px] flex-col overflow-hidden rounded-3xl border border-[#394a30] bg-[#1d2719] shadow-2xl shadow-black/80 animate-scale-up">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#394a30] bg-[#23301e] px-4 py-3.5">
            <div className="flex items-center gap-3">
              <PitStopLogo size="sm" showSubtitle={false} />
              <div>
                <h4 className="font-racing text-xs font-black uppercase tracking-wider text-white sm:text-sm">
                  PIT STOP ASSISTANT
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{language === 'ky' ? 'Онлайн' : language === 'en' ? 'Online' : 'В сети • Кант'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-1.5 text-zinc-400 hover:bg-[#2b3a25] hover:text-white transition-colors"
                title="Закрыть / Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#23301e]/60 via-[#1d2719] to-[#182115]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-black font-semibold rounded-tr-none shadow-md'
                      : 'border border-[#394a30] bg-[#222e1c] text-zinc-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Action Link Button if available */}
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-[#394a30]">
                      {msg.action.type === 'tab' && (
                        <button
                          onClick={() => {
                            if (msg.action?.value === 'venue' || msg.action?.value === 'menu') {
                              onNavigateTab(msg.action.value as AppTab);
                              setIsOpen(false);
                            }
                          }}
                          className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-[11px] font-black uppercase text-black shadow hover:bg-amber-400 transition-all"
                        >
                          <span>{msg.action.label}</span>
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      )}

                      {msg.action.type === 'whatsapp' && (
                        <a
                          href={`https://wa.me/${msg.action.value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-black uppercase text-white shadow hover:bg-emerald-500 transition-all"
                        >
                          <PhoneCall className="h-3 w-3" />
                          <span>{msg.action.label}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <span className="mt-1 px-1 text-[9px] text-zinc-500">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 rounded-2xl border border-[#394a30] bg-[#222e1c] p-3 w-fit text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="border-t border-[#394a30] bg-[#1a2316] px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, idx) => {
              const label = language === 'ky' ? p.ky : language === 'en' ? p.en : p.ru;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(label)}
                  className="whitespace-nowrap rounded-xl border border-[#394a30] bg-[#222e1c] px-2.5 py-1 text-[11px] font-medium text-emerald-100 hover:border-amber-500/50 hover:bg-[#2b3a25] hover:text-amber-400 transition-all shrink-0"
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 border-t border-[#394a30] bg-[#23301e] p-3"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                language === 'ky'
                  ? 'Сурооңузду жазыңыз...'
                  : language === 'en'
                  ? 'Type your message...'
                  : 'Задайте вопрос...'
              }
              className="flex-1 rounded-xl border border-[#394a30] bg-[#182115] px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-black shadow-md transition-all hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
