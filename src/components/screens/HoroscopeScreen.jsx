import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { useUser } from '../../hooks/useUser';
import { zodiacSigns } from '../../data/zodiacSigns';
import { getZodiacSign } from '../../utils/dateUtils';
import { HOROSCOPE_PROMPT } from '../../utils/systemPrompts';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import Header from '../common/Header';
import BottomNav from '../common/BottomNav';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import { LoadingScreen } from '../common/Loading';

/**
 * ♈ HOROSCOPE SCREEN
 * Displays zodiac sign grid and fetches AI daily horoscope.
 */
const HoroscopeScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { user } = useUser();

  const [selectedSign, setSelectedSign] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userZodiac, setUserZodiac] = useState(null);

  // Auto-detect user zodiac from DOB
  useEffect(() => {
    if (user?.dob) {
      const z = getZodiacSign(user.dob);
      if (z) {
        setUserZodiac(z.sign);
        setSelectedSign(z.sign);
      }
    }
  }, [user]);

  // Element colors
  const getElementStyle = (element) => {
    const styles = {
      Fire: {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        glow: 'shadow-[0_0_10px_rgba(239,68,68,0.2)]',
      },
      Earth: {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-400',
        glow: 'shadow-[0_0_10px_rgba(34,197,94,0.2)]',
      },
      Air: {
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/30',
        text: 'text-blue-400',
        glow: 'shadow-[0_0_10px_rgba(96,165,250,0.2)]',
      },
      Water: {
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        glow: 'shadow-glow-cyan-sm',
      },
    };
    return styles[element] || styles.Fire;
  };

  // ═══════════════════════════════════════════════════════════
  // 🧠 GET AI HOROSCOPE
  // ═══════════════════════════════════════════════════════════
  const getHoroscope = async (signId) => {
    if (!signId) {
      showToast('warning', t('horoscope.select_sign'));
      return;
    }

    const sign = zodiacSigns.find((z) => z.id === signId);
    if (!sign) return;

    setIsLoading(true);

    try {
      const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
      const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
          },
          body: JSON.stringify({
            model: 'liquid/lfm-7b-chat:free',
            messages: [
              {
                role: 'system',
                content: HOROSCOPE_PROMPT,
              },
              {
                role: 'user',
                content: `Give me a detailed daily horoscope for ${sign.name} (${sign.symbol}) for today ${today}. 

Sign details:
- Element: ${sign.element}
- Ruler: ${sign.ruler}
- Quality: ${sign.quality}

${user?.name ? `The reader's name is ${user.name}.` : ''}

Please provide the response in JSON format as specified.`,
              },
            ],
            max_tokens: 1200,
            temperature: 0.8,
          }),
        }
      );

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content;

      // Parse JSON response
      let parsedResult;
      try {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        parsedResult = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      } catch (e) {
        parsedResult = {
          sign: sign.name,
          date: today,
          mood: 'Positive',
          luckyColor: sign.color,
          luckyNumber: sign.numbers?.[0] || 7,
          luckyTime: '10:00 AM - 2:00 PM',
          overall: aiResponse,
          love: 'Trust your heart today.',
          career: 'New opportunities await.',
          health: 'Take care of your energy.',
          advice: 'Follow your intuition.',
        };
      }

      // Navigate to detail page
      navigate('horoscope_detail', {
        sign: sign,
        horoscope: parsedResult,
      });
    } catch (error) {
      console.error('Horoscope Error:', error);
      showToast('error', 'Failed to get horoscope. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // 🎨 RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <PageTransition variant="fade" className="bg-midnight-950">
      {isLoading && <LoadingScreen message="Reading the stars..." />}

      <Header />

      <Container className="pt-20 pb-28">
        {/* 🏷️ Title */}
        <div className="text-center mb-6 animate-fade-in-down">
          <h1 className="text-2xl font-bold text-white mb-1">
            {t('horoscope.title')}
          </h1>
          <p className="text-gray-400 text-sm">
            {t('horoscope.select_sign')}
          </p>
        </div>

        {/* ♈ Zodiac Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {zodiacSigns.map((sign, index) => {
            const isSelected = selectedSign === sign.id;
            const isUserSign = userZodiac === sign.id;
            const elementStyle = getElementStyle(sign.element);

            return (
              <GlassCard
                key={sign.id}
                interactive
                onClick={() => {
                  setSelectedSign(sign.id);
                  if (navigator.vibrate) navigator.vibrate(10);
                }}
                variant={isSelected ? 'cosmic' : 'dark'}
                className={`
                  p-3 flex flex-col items-center gap-1.5 text-center
                  relative overflow-hidden
                  animate-fade-in-up transition-all duration-300
                  ${isSelected
                    ? `ring-2 ring-purple-500/50 ${elementStyle.glow} scale-105`
                    : 'opacity-80 hover:opacity-100'
                  }
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* User Badge */}
                {isUserSign && (
                  <div className="absolute top-1 right-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full px-1.5 py-0.5 text-[8px] text-cyan-400 font-bold">
                    YOU
                  </div>
                )}

                {/* Symbol */}
                <span className="text-2xl filter drop-shadow-lg">
                  {sign.symbol}
                </span>

                {/* Name */}
                <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {sign.name}
                </span>

                {/* Date Range */}
                <span className="text-[9px] text-gray-500">
                  {sign.dateRange}
                </span>

                {/* Element Dot */}
                <div className={`w-4 h-1 rounded-full ${elementStyle.bg} ${elementStyle.border} border`} />
              </GlassCard>
            );
          })}
        </div>

        {/* Selected Sign Details */}
        {selectedSign && (
          <div className="animate-scale-in">
            {(() => {
              const sign = zodiacSigns.find((z) => z.id === selectedSign);
              if (!sign) return null;
              const es = getElementStyle(sign.element);

              return (
                <GlassCard variant="dark" className={`p-5 mb-6 border ${es.border}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${es.bg} border ${es.border}`}>
                      <span className="text-3xl">{sign.symbol}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{sign.name}</h3>
                      <p className="text-gray-400 text-xs">{sign.dateRange}</p>
                      <div className="flex gap-2 mt-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${es.bg} ${es.text} border ${es.border}`}>
                          {sign.element}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                          {sign.ruler}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <p className="text-[10px] text-gray-500">Color</p>
                      <p className="text-xs text-white font-medium">{sign.color?.split(',')[0]}</p>
                    </div>
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <p className="text-[10px] text-gray-500">Day</p>
                      <p className="text-xs text-white font-medium">{sign.day}</p>
                    </div>
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <p className="text-[10px] text-gray-500">Stone</p>
                      <p className="text-xs text-white font-medium">{sign.stone}</p>
                    </div>
                  </div>

                  {/* Get Horoscope Button */}
                  <Button
                    fullWidth
                    variant="primary"
                    onClick={() => getHoroscope(selectedSign)}
                    isLoading={isLoading}
                    className="shadow-glow-md"
                  >
                    🔮 Get Today's Horoscope
                  </Button>
                </GlassCard>
              );
            })()}
          </div>
        )}
      </Container>

      <BottomNav />
    </PageTransition>
  );
};

export default HoroscopeScreen;
