import React from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { helpers } from '../../utils/helpers';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import Header from '../common/Header';
import BottomNav from '../common/BottomNav';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';

/**
 * 🕉️ RASHIFAL DETAIL SCREEN
 * Displays the detailed daily prediction for a specific Rashi.
 * Data is passed from RashifalScreen via navigation state.
 */
const RashifalDetailScreen = () => {
  const { currentScreenData, navigate } = useNavigation();
  const { t } = useLanguage();
  const { showToast } = useToast();

  // Get data passed from previous screen
  const rashi = currentScreenData?.rashi;
  const data = currentScreenData?.data;

  // Fallback if data is missing (prevents crash)
  if (!rashi) {
    return (
      <PageTransition variant="fade" className="bg-midnight-950">
        <Container fullHeight center>
          <div className="text-center">
            <p className="text-gray-400 mb-4">No Rashi selected.</p>
            <Button onClick={() => navigate('rashifal')}>Go Back</Button>
          </div>
        </Container>
      </PageTransition>
    );
  }

  // Parse Data (Handle both API string or Object)
  // If API returns plain text, we wrap it. If JSON, we use it.
  const content = typeof data === 'string' 
    ? { overview: data } 
    : (data || { overview: "Aaj ka din shubh rahega. (Prediction unavailable)" });

  // Today's Date in Hindi/Local format
  const today = new Date().toLocaleDateString('hi-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  // Share Handler
  const handleShare = async () => {
    const text = `🕉️ Aaj Ka Rashifal (${t(rashi.nameKey)})\n📅 ${today}\n\n${content.overview}\n\n✨ AstroAI App se dekhein!`;
    const shared = await helpers.shareContent({ title: 'Rashifal', text });
    if (shared) showToast('success', 'Rashifal shared!');
  };

  return (
    <PageTransition variant="slideUp" className="bg-midnight-950">
      <Header />

      <Container className="pt-24 pb-28">
        
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate('rashifal')}
          className="flex items-center gap-2 text-amber-400/80 hover:text-amber-300 transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back to Rashis</span>
        </button>

        {/* 🏷️ Header Card */}
        <GlassCard 
          className="p-6 mb-6 text-center relative overflow-hidden border-amber-500/30"
          style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(0,0,0,0) 100%)' }}
        >
          {/* Om Symbol Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5 pointer-events-none select-none">
            🕉️
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center text-4xl border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)] mb-4 animate-float">
              {rashi.icon}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-1">
              {t(rashi.nameKey)}
            </h1>
            <p className="text-amber-200 text-sm font-medium uppercase tracking-widest opacity-80">
              {today}
            </p>
          </div>
        </GlassCard>

        {/* 📜 Main Prediction */}
        <div className="space-y-4">
          
          {/* Overview */}
          <GlassCard variant="dark" className="p-5 border-l-4 border-l-amber-500 animate-fade-in-up">
            <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>✨</span> Dainik Rashifal
            </h3>
            <p className="text-gray-200 text-base leading-relaxed whitespace-pre-line">
              {content.overview}
            </p>
          </GlassCard>

          {/* Specific Sections (If available from API) */}
          {content.love && (
            <GlassCard variant="dark" className="p-4 border-l-4 border-l-pink-500 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-pink-400 font-bold text-sm mb-1">❤️ Prem (Love)</h3>
              <p className="text-gray-300 text-sm">{content.love}</p>
            </GlassCard>
          )}

          {/* Lucky Info (Mock Data if API doesn't provide) */}
          <div className="grid grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <GlassCard variant="dark" className="p-3 text-center border-amber-500/20">
              <span className="text-xs text-gray-500 block mb-1">Shubh Rang</span>
              <span className="text-sm font-bold text-amber-300">Golden / Yellow</span>
            </GlassCard>
            <GlassCard variant="dark" className="p-3 text-center border-amber-500/20">
              <span className="text-xs text-gray-500 block mb-1">Shubh Ank</span>
              <span className="text-sm font-bold text-amber-300">3, 9</span>
            </GlassCard>
          </div>

        </div>

        {/* 🔘 Share Button */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Button 
            fullWidth 
            onClick={handleShare}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg border-none"
          >
            <span className="flex items-center gap-2">
              📤 Share with Friends
            </span>
          </Button>
        </div>

        {/* ⚠️ Disclaimer */}
        <p className="text-center text-[10px] text-gray-600 mt-6 px-4">
          Rashifal is based on Moon Sign (Chandra Rashi). Results may vary.
        </p>

      </Container>

      <BottomNav />
    </PageTransition>
  );
};

export default RashifalDetailScreen;
