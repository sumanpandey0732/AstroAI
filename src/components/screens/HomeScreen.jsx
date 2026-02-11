import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useUser } from '../../hooks/useUser';
import { useLanguage } from '../../hooks/useLanguage';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import Header from '../common/Header';
import BottomNav from '../common/BottomNav';
import GlassCard from '../common/GlassCard';
import { PalmIcon, TarotIcon, ChatIcon, HomeIcon } from '../../assets/icons'; // Using custom icons
import { getZodiacSign } from '../../utils/dateUtils';

/**
 * 🏠 HOME SCREEN (DASHBOARD)
 * The central hub of the application.
 * Displays daily insights and quick access to all major features.
 */
const HomeScreen = () => {
  const { navigate } = useNavigation();
  const { user } = useUser();
  const { t } = useLanguage();
  
  const [currentDate, setCurrentDate] = useState('');
  const [userZodiac, setUserZodiac] = useState(null);

  // 🗓️ Setup Date & Zodiac
  useEffect(() => {
    // Format Date: "Monday, 12 Oct"
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    setCurrentDate(new Date().toLocaleDateString('en-US', dateOptions));

    // Get Zodiac if DOB exists
    if (user?.dob) {
      const z = getZodiacSign(user.dob);
      setUserZodiac(z);
    }
  }, [user]);

  // 🔮 Feature Configuration
  const features = [
    {
      id: 'palm',
      titleKey: 'home.palm_reading_title',
      descKey: 'home.palm_reading_desc',
      icon: PalmIcon,
      color: 'text-cyan-400',
      glow: 'shadow-glow-cyan-sm',
      route: 'palm_scan',
      delay: '100ms'
    },
    {
      id: 'tarot',
      titleKey: 'home.tarot_title',
      descKey: 'home.tarot_desc',
      icon: TarotIcon,
      color: 'text-purple-400',
      glow: 'shadow-glow-sm',
      route: 'tarot',
      delay: '200ms'
    },
    {
      id: 'horoscope',
      titleKey: 'home.horoscope_title',
      descKey: 'home.horoscope_desc',
      icon: HomeIcon, // Placeholder for Zodiac Icon
      color: 'text-amber-400',
      glow: 'shadow-[0_0_15px_rgba(251,191,36,0.3)]',
      route: 'horoscope',
      delay: '300ms'
    },
    {
      id: 'chat',
      titleKey: 'home.chat_title',
      descKey: 'home.chat_desc',
      icon: ChatIcon,
      color: 'text-pink-400',
      glow: 'shadow-glow-pink-sm',
      route: 'chat',
      delay: '400ms'
    }
  ];

  return (
    <PageTransition variant="fade" className="bg-midnight-950 pb-20">
      
      {/* 🌌 Top Background Decoration */}
      <div className="fixed top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none z-0" />
      <div className="fixed top-20 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none z-0" />

      <Header />

      <Container className="pt-24 z-10 relative">
        
        {/* 📅 Date Display */}
        <div className="mb-6 animate-fade-in pl-1">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
            {currentDate}
          </p>
          <h2 className="text-2xl font-bold text-white mt-1">
            {t('home.daily_insight')}
          </h2>
        </div>

        {/* ✨ Daily Insight Card (Hero) */}
        <GlassCard 
          variant="cosmic" 
          className="p-6 mb-8 relative overflow-hidden group animate-scale-in"
        >
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-3">
              <span className="bg-white/10 border border-white/10 rounded-lg px-3 py-1 text-[10px] font-bold text-cyan-300 uppercase tracking-wide">
                Today's Energy
              </span>
              {userZodiac && (
                <span className="text-2xl filter drop-shadow-md animate-pulse-slow">
                  {userZodiac.symbol}
                </span>
              )}
            </div>
            
            <p className="text-lg text-white font-medium leading-relaxed italic text-glow-white">
              "The stars align to bring clarity to your thoughts. Trust your intuition today, for it whispers the truth."
            </p>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Cosmic alignment is strong</span>
            </div>
          </div>
        </GlassCard>

        {/* 🔮 Feature Grid */}
        <div className="mb-4 pl-1">
          <h3 className="text-lg font-bold text-white tracking-wide">
            {t('home.featured')}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-24">
          {features.map((feature) => (
            <GlassCard
              key={feature.id}
              interactive
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(10);
                navigate(feature.route);
              }}
              className={`p-5 flex flex-col justify-between h-40 animate-fade-in-up hover:-translate-y-1 transition-transform duration-300 ${feature.glow}`}
              style={{ animationDelay: feature.delay }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 ${feature.color}`}>
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Text */}
              <div>
                <h4 className="text-white font-bold text-base mb-1">
                  {t(feature.titleKey)}
                </h4>
                <p className="text-gray-400 text-xs leading-tight">
                  {t(feature.descKey)}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

      </Container>

      <BottomNav />
    </PageTransition>
  );
};

export default HomeScreen;
