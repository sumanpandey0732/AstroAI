import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { shareContent } from '../../utils/helpers';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import BottomNav from '../common/BottomNav';

/**
 * ♈ HOROSCOPE DETAIL SCREEN
 * Displays full AI-generated daily horoscope for selected zodiac sign.
 */
const HoroscopeDetailScreen = () => {
  const { currentScreenData, navigate } = useNavigation();
  const { t } = useLanguage();
  const { showToast } = useToast();

  // Get data from HoroscopeScreen
  const sign = currentScreenData?.sign;
  const horoscope = currentScreenData?.horoscope;

  // Redirect if no data
  if (!sign || !horoscope) {
    return (
      <PageTransition variant="fade" className="bg-midnight-950">
        <Container fullHeight center hasBottomNav={false}>
          <div className="text-center space-y-4">
            <p className="text-gray-400">No horoscope data found.</p>
            <Button onClick={() => navigate('horoscope')} variant="primary">
              Select Sign
            </Button>
          </div>
        </Container>
      </PageTransition>
    );
  }

  // Today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Horoscope Sections
  const sections = [
    {
      id: 'overall',
      title: 'Overall',
      icon: '🌟',
      content: horoscope.overall,
      color: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
    },
    {
      id: 'love',
      title: t('horoscope.sections.personal') || 'Love & Relationships',
      icon: '❤️',
      content: horoscope.love,
      color: 'border-pink-500/30',
      bg: 'bg-pink-500/10',
    },
    {
      id: 'career',
      title: t('horoscope.sections.profession') || 'Career & Work',
      icon: '💼',
      content: horoscope.career,
      color: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
    },
    {
      id: 'health',
      title: t('horoscope.sections.health') || 'Health & Wellness',
      icon: '💪',
      content: horoscope.health,
      color: 'border-green-500/30',
      bg: 'bg-green-500/10',
    },
  ];

  // Share horoscope
  const handleShare = async () => {
    const text = `${sign.symbol} ${sign.name} - Daily Horoscope\n${today}\n\n${horoscope.overall}\n\n💕 Love: ${horoscope.love}\n💼 Career: ${horoscope.career}\n\n🎨 Lucky Color: ${horoscope.luckyColor}\n🔢 Lucky Number: ${horoscope.luckyNumber}\n\nGet yours at AstroAI! 🔮`;
    const shared = await shareContent({ title: `${sign.name} Horoscope`, text });
    if (shared) showToast('success', 'Shared successfully!');
  };

  return (
    <PageTransition variant="slideUp" className="bg-midnight-950">
      <Container className="pt-6 pb-28">

        {/* 🔙 Back */}
        <button
          onClick={() => navigate('horoscope')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Back</span>
        </button>

        {/* 🏷️ Header Card */}
        <GlassCard
          variant="cosmic"
          className="p-6 mb-6 text-center relative overflow-hidden animate-fade-in-down"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Zodiac Symbol */}
            <div className="inline-flex p-4 mb-3 rounded-full bg-white/5 border border-white/10 shadow-glow-sm">
              <span className="text-5xl filter drop-shadow-lg">
                {sign.symbol}
              </span>
            </div>

            {/* Sign Name */}
            <h1 className="text-3xl font-bold text-white mb-1 text-glow">
              {sign.name}
            </h1>

            {/* Date */}
            <p className="text-gray-400 text-xs mb-4">{today}</p>

            {/* Lucky Items Row */}
            <div className="grid grid-cols-3 gap-2">
              {/* Lucky Color */}
              <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-500 mb-0.5">
                  {t('horoscope.color')}
                </p>
                <p className="text-sm font-bold text-white">
                  {horoscope.luckyColor || sign.color?.split(',')[0]}
                </p>
              </div>

              {/* Lucky Number */}
              <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-500 mb-0.5">
                  {t('horoscope.number')}
                </p>
                <p className="text-sm font-bold text-white">
                  {horoscope.luckyNumber || sign.numbers?.[0]}
                </p>
              </div>

              {/* Lucky Time */}
              <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-500 mb-0.5">
                  {t('horoscope.time')}
                </p>
                <p className="text-sm font-bold text-white">
                  {horoscope.luckyTime || '10 AM'}
                </p>
              </div>
            </div>

            {/* Mood Badge */}
            {horoscope.mood && (
              <div className="mt-3 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5">
                <span className="text-sm">😊</span>
                <span className="text-xs font-medium text-amber-300">
                  {t('horoscope.mood')}: {horoscope.mood}
                </span>
              </div>
            )}
          </div>
        </GlassCard>

        {/* 📝 Horoscope Sections */}
        <div className="space-y-4 mb-8">
          {sections.map((section, index) => (
            <GlassCard
              key={section.id}
              variant="dark"
              className={`p-4 border ${section.color} animate-fade-in-up`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${section.bg}`}>
                  <span className="text-xl">{section.icon}</span>
                </div>
                <h3 className="text-white font-bold text-sm">
                  {section.title}
                </h3>
              </div>

              {/* Section Content */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {section.content || 'The stars have a special message for you today. Stay positive and trust the journey.'}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* 🌟 Daily Advice */}
        {horoscope.advice && (
          <GlassCard
            variant="highlight"
            className="p-5 mb-6 text-center animate-fade-in-up"
            style={{ animationDelay: '500ms' }}
          >
            <div className="mb-2">
              <span className="text-2xl">💫</span>
            </div>
            <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-2">
              Today's Cosmic Advice
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed italic">
              "{horoscope.advice}"
            </p>
          </GlassCard>
        )}

        {/* 🔘 Action Buttons */}
        <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <Button variant="secondary" onClick={handleShare} className="flex-1">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {t('common.share')}
            </span>
          </Button>

          <Button variant="primary" onClick={() => navigate('horoscope')} className="flex-1">
            Other Signs
          </Button>
        </div>

        {/* ⚠️ Disclaimer */}
        <p className="text-center text-[10px] text-gray-600 mt-6 px-4">
          This horoscope is for spiritual reflection and entertainment only.
        </p>

      </Container>
      <BottomNav />
    </PageTransition>
  );
};

export default HoroscopeDetailScreen;
