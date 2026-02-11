import React, { useState } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { fetchDailyRashifal } from '../../services/serpApiService'; // We'll verify this service later
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import Header from '../common/Header';
import BottomNav from '../common/BottomNav';
import GlassCard from '../common/GlassCard';
import { LoadingScreen } from '../common/Loading';

/**
 * 🕉️ RASHIFAL SCREEN
 * Displays Vedic Moon Signs (Rashi) grid.
 * Fetches daily predictions from SerpAPI (Google Search).
 */
const RashifalScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();
  const { showToast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);

  // Vedic Rashis Data
  const rashis = [
    { id: 'mesh', nameKey: 'rashifal.mesh', icon: '🐏', symbol: '♈' },
    { id: 'vrishabh', nameKey: 'rashifal.vrishabh', icon: '🐂', symbol: '♉' },
    { id: 'mithun', nameKey: 'rashifal.mithun', icon: '👫', symbol: '♊' },
    { id: 'kark', nameKey: 'rashifal.kark', icon: '🦀', symbol: '♋' },
    { id: 'simha', nameKey: 'rashifal.simha', icon: '🦁', symbol: '♌' },
    { id: 'kanya', nameKey: 'rashifal.kanya', icon: '👩', symbol: '♍' },
    { id: 'tula', nameKey: 'rashifal.tula', icon: '⚖️', symbol: '♎' },
    { id: 'vrishchik', nameKey: 'rashifal.vrishchik', icon: '🦂', symbol: '♏' },
    { id: 'dhanu', nameKey: 'rashifal.dhanu', icon: '🏹', symbol: '♐' },
    { id: 'makar', nameKey: 'rashifal.makar', icon: '🐊', symbol: '♑' },
    { id: 'kumbh', nameKey: 'rashifal.kumbh', icon: '🏺', symbol: '♒' },
    { id: 'meen', nameKey: 'rashifal.meen', icon: '🐟', symbol: '♓' },
  ];

  // 🌍 Handle Rashi Selection
  const handleSelectRashi = async (rashi) => {
    setIsLoading(true);
    
    try {
      // Fetch Real-time data from SerpAPI
      const data = await fetchDailyRashifal(rashi.id);
      
      if (data) {
        navigate('rashifal_detail', { rashi, data });
      } else {
        throw new Error('No data found');
      }
    } catch (error) {
      console.error('Rashifal Error:', error);
      showToast('error', 'Failed to load Rashifal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition variant="fade" className="bg-midnight-950">
      
      {isLoading && <LoadingScreen message="Fetching planetary positions..." />}

      <Header />

      <Container className="pt-24 pb-28">
        
        {/* 🏷️ Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-flex p-3 mb-3 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-glow-sm">
            <span className="text-3xl">🕉️</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {t('rashifal.title')}
          </h1>
          <p className="text-gray-400 text-sm">
            Select your Vedic Moon Sign
          </p>
        </div>

        {/* 📦 Rashi Grid */}
        <div className="grid grid-cols-3 gap-3">
          {rashis.map((rashi, index) => (
            <GlassCard
              key={rashi.id}
              interactive
              onClick={() => handleSelectRashi(rashi)}
              variant="dark"
              className="p-3 flex flex-col items-center gap-2 text-center animate-fade-in-up hover:border-amber-500/30"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl shadow-inner">
                {rashi.icon}
              </div>
              
              <div>
                <h3 className="text-xs font-bold text-gray-200">
                  {t(rashi.nameKey).split(' ')[0]}
                </h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
                  {rashi.symbol}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* ℹ️ Info Note */}
        <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3 animate-fade-in">
          <span className="text-xl">💡</span>
          <p className="text-xs text-blue-200 leading-relaxed">
            Rashifal is based on your <strong>Moon Sign</strong> (Rashi), not Sun Sign. If you don't know your Rashi, check your Kundli.
          </p>
        </div>

      </Container>

      <BottomNav />
    </PageTransition>
  );
};

export default RashifalScreen;
