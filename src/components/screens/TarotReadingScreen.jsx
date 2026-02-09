import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { shareContent } from '../../utils/helpers';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import BottomNav from '../common/BottomNav';
import { TarotIcon } from '../../assets/icons';

/**
 * 🃏 TAROT READING RESULT SCREEN
 * Displays AI-generated tarot reading with card details.
 * Data comes from TarotScreen via navigation.
 */
const TarotReadingScreen = () => {
  const { currentScreenData, navigate } = useNavigation();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [expandedCard, setExpandedCard] = useState(0);

  // Get data from previous screen
  const cards = currentScreenData?.cards || [];
  const category = currentScreenData?.category || 'personal';
  const reading = currentScreenData?.reading || '';

  // Redirect if no data
  if (cards.length === 0) {
    return (
      <PageTransition variant="fade" className="bg-midnight-950">
        <Container fullHeight center hasBottomNav={false}>
          <div className="text-center space-y-4">
            <p className="text-gray-400">No reading data found.</p>
            <Button onClick={() => navigate('tarot')} variant="primary">
              Draw Cards
            </Button>
          </div>
        </Container>
      </PageTransition>
    );
  }

  // Card position labels
  const positions = [
    { label: 'Past', icon: '⏮️', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    { label: 'Present', icon: '⏺️', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    { label: 'Future', icon: '⏭️', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  ];

  // Get suit emoji
  const getSuitEmoji = (suit) => {
    const suits = { Wands: '🔥', Cups: '💧', Swords: '⚔️', Pentacles: '💰' };
    return suits[suit] || '⭐';
  };

  // Share reading
  const handleShare = async () => {
    const cardNames = cards.map((c) => c.name).join(', ');
    const text = `🃏 My Tarot Reading by AstroAI\n\nCards: ${cardNames}\nCategory: ${category}\n\n${reading?.substring(0, 200)}...\n\nGet your reading at AstroAI!`;
    const shared = await shareContent({ title: 'My Tarot Reading', text });
    if (shared) showToast('success', 'Shared successfully!');
  };

  return (
    <PageTransition variant="slideUp" className="bg-midnight-950">
      <Container className="pt-6 pb-28">

        {/* 🔙 Back */}
        <button
          onClick={() => navigate('tarot')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Back to Deck</span>
        </button>

        {/* 🏷️ Header */}
        <div className="text-center mb-6 animate-fade-in-down">
          <div className="inline-flex p-3 mb-3 rounded-full bg-purple-500/10 border border-purple-500/20 shadow-glow-sm">
            <TarotIcon className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Your Reading
          </h1>
          <div className="inline-block bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-400 capitalize">
            {category} Reading
          </div>
        </div>

        {/* 🃏 Cards Row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {cards.map((card, index) => {
            const pos = positions[index];
            const isExpanded = expandedCard === index;

            return (
              <button
                key={card.id}
                onClick={() => {
                  setExpandedCard(index);
                  if (navigator.vibrate) navigator.vibrate(5);
                }}
                className={`
                  relative aspect-[2/3] rounded-xl overflow-hidden
                  border-2 transition-all duration-300
                  animate-fade-in-up
                  ${isExpanded
                    ? `${pos.border} shadow-lg scale-105`
                    : 'border-white/10 opacity-70 hover:opacity-100'
                  }
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-purple-900/80 ${isExpanded ? pos.bg : ''}`} />

                {/* Card Content */}
                <div className="relative h-full flex flex-col items-center justify-between p-2 z-10">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {pos.label}
                  </span>
                  <span className="text-2xl">
                    {getSuitEmoji(card.suit)}
                  </span>
                  <div className="text-center">
                    <p className="text-white text-[10px] font-bold leading-tight">
                      {card.name}
                    </p>
                  </div>
                </div>

                {/* Selected Indicator */}
                {isExpanded && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${pos.bg.replace('/10', '')}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* 📝 Selected Card Details */}
        <GlassCard
          variant="dark"
          className={`p-5 mb-6 animate-scale-in border ${positions[expandedCard].border}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${positions[expandedCard].bg}`}>
              <span className="text-xl">{positions[expandedCard].icon}</span>
            </div>
            <div>
              <h3 className="text-white font-bold">
                {cards[expandedCard].name}
              </h3>
              <p className={`text-xs ${positions[expandedCard].color}`}>
                {positions[expandedCard].label} Position
              </p>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-3">
            {cards[expandedCard].keywords?.map((kw, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400"
              >
                {kw}
              </span>
            ))}
          </div>

          {/* Meaning */}
          <p className="text-gray-300 text-sm leading-relaxed">
            {cards[expandedCard].meaning?.upright}
          </p>
        </GlassCard>

        {/* 🔮 AI Reading */}
        <GlassCard variant="cosmic" className="p-5 mb-6 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">
              {t('tarot.interpretation')}
            </h3>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
            {reading}
          </p>
        </GlassCard>

        {/* 🔘 Action Buttons */}
        <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <Button variant="secondary" onClick={handleShare} className="flex-1">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {t('common.share')}
            </span>
          </Button>

          <Button variant="primary" onClick={() => navigate('tarot')} className="flex-1">
            <span className="flex items-center justify-center gap-2">
              <TarotIcon className="w-5 h-5" />
              New Reading
            </span>
          </Button>
        </div>

        {/* ⚠️ Disclaimer */}
        <p className="text-center text-[10px] text-gray-600 mt-6 px-4">
          This reading is for spiritual reflection and entertainment only.
        </p>

      </Container>
      <BottomNav />
    </PageTransition>
  );
};

export default TarotReadingScreen;
