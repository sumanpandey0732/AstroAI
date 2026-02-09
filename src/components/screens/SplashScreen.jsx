import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useUser } from '../../hooks/useUser';
import PageTransition from '../common/PageTransition';
import { PalmIcon } from '../../assets/icons'; // Using our custom icon
import { useLanguage } from '../../hooks/useLanguage';

/**
 * 🌊 SPLASH SCREEN
 * The first screen user sees.
 * Handles initial data checks and redirects to Onboarding or Home.
 */
const SplashScreen = () => {
  const { navigate } = useNavigation();
  const { user } = useUser(); // To check if user exists
  const { t } = useLanguage();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // ⏳ 1. Initial Animation Delay
    const timer = setTimeout(() => {
      // Start exit animation
      setIsExiting(true);

      // ⏳ 2. Navigation Delay (Wait for exit animation to finish)
      setTimeout(() => {
        if (user && user.hasCompletedOnboarding) {
          navigate('home'); // Old user -> Home
        } else {
          navigate('language'); // New user -> Language Select first
        }
      }, 500); // 0.5s fade out time

    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, [navigate, user]);

  return (
    <PageTransition variant="fade" className="bg-midnight-950 h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* 🌌 Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/stars.svg')] opacity-20 animate-twinkle" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      {/* 📦 Main Content */}
      <div 
        className={`
          relative z-10 flex flex-col items-center 
          transition-all duration-700 ease-in-out transform
          ${isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
        `}
      >
        {/* ✨ Animated Logo Container */}
        <div className="relative mb-6 group">
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000 animate-pulse-glow" />
          
          {/* Logo Circle */}
          <div className="relative w-28 h-28 bg-midnight-900 rounded-full border border-white/10 flex items-center justify-center shadow-2xl">
            {/* Palm Icon */}
            <PalmIcon className="w-14 h-14 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          </div>
        </div>

        {/* 📝 App Name */}
        <h1 className="text-4xl font-bold text-white tracking-wider mb-2 font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-purple-200 animate-fade-in-up">
          AstroAI
        </h1>

        {/* 🏷️ Tagline */}
        <p className="text-sm text-cyan-300/70 font-medium tracking-widest uppercase animate-fade-in-up animation-delay-300">
          {t('splash.tagline')}
        </p>

        {/* 🌀 Loading Indicator (Subtle) */}
        <div className="mt-12">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>

      {/* 🦶 Footer Version */}
      <div className="absolute bottom-8 text-xs text-white/20">
        v1.0.0
      </div>
    </PageTransition>
  );
};

export default SplashScreen;
