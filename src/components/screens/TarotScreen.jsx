import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { tarotCards, drawCards } from '../../data/tarotCards';
import { shuffleArray } from '../../utils/helpers';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import Header from '../common/Header';
import BottomNav from '../common/BottomNav';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import { LoadingScreen } from '../common/Loading';
import { TarotIcon } from '../../assets/icons';
import { TAROT_READING_PROMPT } from '../../utils/systemPrompts';

/**
 * 🃏 TAROT SCREEN
 * Main tarot reading interface.
 * Flow: Select Category → Shuffle → Pick Cards → AI Reading → Result
 */
const TarotScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();
  const { showToast } = useToast();

  // States
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [drawnCards, setDrawnCards] = useState([]);
  const [isReading, setIsReading] = useState(false);
  const [revealedCards, setRevealedCards] = useState([]);

  // 🃏 Category Options
  const categories = [
    {
      id: 'love',
      titleKey: 'tarot.spread_love',
      icon: '💕',
      color: 'border-pink-500/30',
      bg: 'bg-pink-500/10',
      glow: 'shadow-glow-pink-sm',
    },
    {
      id: 'career',
      titleKey: 'tarot.spread_career',
      icon: '💼',
      color: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
      glow: 'shadow-glow-cyan-sm',
    },
    {
      id: 'money',
      titleKey: 'tarot.spread_money',
      icon: '💰',
      color: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    },
    {
      id: 'personal',
      titleKey: 'tarot.spread_daily',
      icon: '🌟',
      color: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
      glow: 'shadow-glow-sm',
    },
  ];

  // ═══════════════════════════════════════════════════════════
  // 🔀 SHUFFLE & DRAW CARDS
  // ═══════════════════════════════════════════════════════════
  const handleShuffle = async () => {
    if (!selectedCategory) {
      showToast('warning', 'Please select a category first.');
      return;
    }

    setIsShuffling(true);
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]);

    // Simulate shuffle animation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Draw 3 random cards
    const cards = drawCards(3);
    setDrawnCards(cards);
    setIsShuffling(false);
  };

  // ═══════════════════════════════════════════════════════════
  // 🔮 REVEAL A CARD (Flip Animation)
  // ═══════════════════════════════════════════════════════════
  const revealCard = (index) => {
    if (revealedCards.includes(index)) return;
    
    if (navigator.vibrate) navigator.vibrate(30);
    setRevealedCards((prev) => [...prev, index]);
  };

  // ═══════════════════════════════════════════════════════════
  // 🧠 GET AI READING
  // ═══════════════════════════════════════════════════════════
  const getAIReading = async () => {
    if (revealedCards.length !== 3) {
      showToast('info', 'Please reveal all 3 cards first.');
      return;
    }

    setIsReading(true);

    try {
      const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

      const cardNames = drawnCards.map((c) => c.name).join(', ');
      const cardMeanings = drawnCards
        .map((c) => `${c.name}: ${c.meaning.upright}`)
        .join('\n');

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
                content: TAROT_READING_PROMPT,
              },
              {
                role: 'user',
                content: `I drew these 3 tarot cards for a "${selectedCategory}" reading:

Card 1 (Past): ${drawnCards[0].name} - ${drawnCards[0].meaning.upright}
Card 2 (Present): ${drawnCards[1].name} - ${drawnCards[1].meaning.upright}
Card 3 (Future): ${drawnCards[2].name} - ${drawnCards[2].meaning.upright}

Please provide a detailed, spiritual, and encouraging reading connecting all three cards for my ${selectedCategory} question. Include an affirmation.`,
              },
            ],
            max_tokens: 1500,
            temperature: 0.8,
          }),
        }
      );

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
      const aiReading = data.choices?.[0]?.message?.content;

      // Navigate to Reading Result
      navigate('tarot_reading', {
        cards: drawnCards,
        category: selectedCategory,
        reading: aiReading,
      });
    } catch (error) {
      console.error('Tarot Reading Error:', error);
      showToast('error', 'Failed to get reading. Please try again.');
    } finally {
      setIsReading(false);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // 🔄 RESET
  // ═══════════════════════════════════════════════════════════
  const resetReading = () => {
    setSelectedCategory(null);
    setDrawnCards([]);
    setRevealedCards([]);
  };

  // ═══════════════════════════════════════════════════════════
  // 🎨 RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <PageTransition variant="fade" className="bg-midnight-950">
      {isReading && <LoadingScreen message="Reading the cards..." />}

      <Header />

      <Container className="pt-20 pb-28">
        {/* 🏷️ Title */}
        <div className="text-center mb-6 animate-fade-in-down">
          <div className="inline-flex p-3 mb-3 rounded-full bg-purple-500/10 border border-purple-500/20 shadow-glow-sm">
            <TarotIcon className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {t('tarot.title')}
          </h1>
          <p className="text-gray-400 text-sm">
            {t('tarot.focus_thought')}
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* STEP 1: CATEGORY SELECTION */}
        {/* ═══════════════════════════════════════════════════ */}
        {drawnCards.length === 0 && (
          <>
            <div className="mb-4 pl-1">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                Choose your question area
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {categories.map((cat, index) => (
                <GlassCard
                  key={cat.id}
                  interactive
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (navigator.vibrate) navigator.vibrate(10);
                  }}
                  variant={selectedCategory === cat.id ? 'cosmic' : 'dark'}
                  className={`
                    p-4 flex flex-col items-center gap-2 text-center
                    animate-fade-in-up transition-all duration-300
                    ${selectedCategory === cat.id
                      ? `ring-2 ring-purple-500/50 ${cat.glow} scale-105`
                      : 'opacity-80 hover:opacity-100'
                    }
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <span className={`text-sm font-medium ${selectedCategory === cat.id ? 'text-white' : 'text-gray-300'}`}>
                    {t(cat.titleKey)}
                  </span>
                  {selectedCategory === cat.id && (
                    <div className="absolute top-2 right-2 text-purple-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>

            {/* Shuffle Button */}
            <Button
              fullWidth
              size="lg"
              variant="primary"
              onClick={handleShuffle}
              isLoading={isShuffling}
              disabled={!selectedCategory}
              className="shadow-glow-md"
            >
              {isShuffling ? 'Shuffling the Deck...' : '🔮 Shuffle & Draw Cards'}
            </Button>
          </>
        )}

        {/* ═══════════════════════════════════════════════════ */}
        {/* STEP 2: CARD REVEAL */}
        {/* ═══════════════════════════════════════════════════ */}
        {drawnCards.length === 3 && (
          <>
            {/* Position Labels */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {['Past', 'Present', 'Future'].map((pos) => (
                <div key={pos} className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {pos}
                </div>
              ))}
            </div>

            {/* 🃏 Cards */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {drawnCards.map((card, index) => {
                const isRevealed = revealedCards.includes(index);

                return (
                  <div
                    key={card.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <button
                      onClick={() => revealCard(index)}
                      disabled={isRevealed}
                      className={`
                        w-full aspect-[2/3] rounded-xl overflow-hidden
                        transition-all duration-700 transform-gpu
                        ${isRevealed ? '' : 'hover:scale-105 active:scale-95 cursor-pointer'}
                      `}
                      style={{
                        perspective: '1000px',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {isRevealed ? (
                        /* 🎴 FRONT (Revealed) */
                        <div className="w-full h-full bg-gradient-to-br from-indigo-900/80 to-purple-900/80 border border-purple-500/30 rounded-xl p-3 flex flex-col items-center justify-between shadow-glow-sm animate-card-flip">
                          <span className="text-2xl mt-2">
                            {card.suit === 'Wands' ? '🔥' :
                             card.suit === 'Cups' ? '💧' :
                             card.suit === 'Swords' ? '⚔️' :
                             card.suit === 'Pentacles' ? '💰' : '⭐'}
                          </span>
                          <div className="text-center">
                            <p className="text-white text-xs font-bold leading-tight">
                              {card.name}
                            </p>
                            <p className="text-purple-300 text-[8px] mt-1">
                              {card.keywords?.[0]}
                            </p>
                          </div>
                        </div>
                      ) : (
                        /* 🎴 BACK (Hidden) */
                        <div className="w-full h-full bg-gradient-to-br from-indigo-800 to-purple-900 border-2 border-purple-500/20 rounded-xl flex items-center justify-center shadow-cosmic animate-pulse-slow">
                          <div className="w-12 h-12 border-2 border-purple-400/30 rounded-full flex items-center justify-center">
                            <span className="text-xl">✨</span>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Tap Instruction or Get Reading Button */}
            {revealedCards.length < 3 ? (
              <p className="text-center text-gray-400 text-sm animate-pulse">
                Tap each card to reveal ({revealedCards.length}/3 revealed)
              </p>
            ) : (
              <div className="space-y-3 animate-fade-in-up">
                <Button
                  fullWidth
                  size="lg"
                  variant="cosmic"
                  onClick={getAIReading}
                  isLoading={isReading}
                  className="shadow-glow-cyan-md"
                >
                  ✨ Get My Reading
                </Button>
                <Button
                  fullWidth
                  size="md"
                  variant="ghost"
                  onClick={resetReading}
                >
                  Draw New Cards
                </Button>
              </div>
            )}
          </>
        )}
      </Container>

      <BottomNav />
    </PageTransition>
  );
};

export default TarotScreen;
