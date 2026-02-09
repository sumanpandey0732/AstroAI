import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../hooks/useLanguage';
import { useUser } from '../../hooks/useUser';
import { onboardingSlides } from '../../data/onboardingSlides'; // Import data we just made
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import Button from '../common/Button';
import GlassCard from '../common/GlassCard';

/**
 * 🚀 ONBOARDING SCREEN
 * A swipeable tutorial interface to introduce app features.
 * Updates user state upon completion so they don't see this again.
 */
const OnboardingScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();
  const { completeOnboarding } = useUser();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Helper to handle slide change with animation delay
  const changeSlide = (newIndex) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 300); // Wait for fade out
  };

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      changeSlide(currentIndex + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    completeOnboarding(); // Mark as seen in local storage
    navigate('profile_setup'); // Go to Profile Setup
  };

  const currentSlide = onboardingSlides[currentIndex];
  const Icon = currentSlide.icon;

  return (
    <PageTransition variant="fade" className="bg-midnight-950">
      <Container fullHeight hasBottomNav={false} className="flex flex-col justify-between pb-8">
        
        {/* 🔝 Top Bar (Skip Button) */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={finishOnboarding}
            className="text-gray-400 text-sm font-medium px-4 py-2 hover:text-white transition-colors"
          >
            {t('onboarding.skip')}
          </button>
        </div>

        {/* 🖼️ Slide Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-10">
          
          {/* ✨ Animated Icon Container */}
          <div className={`
            relative mb-10 transition-all duration-500 transform
            ${isAnimating ? 'opacity-0 scale-90 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}
          `}>
            {/* Background Glow */}
            <div className={`absolute inset-0 rounded-full blur-2xl opacity-60 animate-pulse-slow ${currentSlide.bgGlow.replace('bg-', 'bg-')}`} />
            
            {/* Icon Card */}
            <GlassCard 
              variant="cosmic" 
              className="w-40 h-40 flex items-center justify-center rounded-full border-2 border-white/10 shadow-cosmic-lg"
            >
              <Icon className={`w-20 h-20 ${currentSlide.color} drop-shadow-lg`} />
            </GlassCard>
          </div>

          {/* 📝 Text Content */}
          <div className={`
            text-center space-y-4 max-w-xs transition-all duration-500 delay-100
            ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}>
            <h2 className="text-3xl font-bold text-white tracking-wide text-glow">
              {t(currentSlide.titleKey)}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {t(currentSlide.descKey)}
            </p>
          </div>

        </div>

        {/* 🦶 Footer Area */}
        <div className="space-y-8 w-full">
          
          {/* ⚪ Pagination Dots */}
          <div className="flex justify-center gap-2">
            {onboardingSlides.map((_, index) => (
              <div 
                key={index}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${index === currentIndex ? 'w-8 bg-cyan-400 shadow-glow-cyan-sm' : 'w-2 bg-white/20'}
                `}
              />
            ))}
          </div>

          {/* 🔘 Action Button */}
          <Button 
            fullWidth 
            size="lg" 
            variant="primary"
            onClick={handleNext}
            className="shadow-cosmic"
          >
            {currentIndex === onboardingSlides.length - 1 
              ? t('onboarding.get_started') 
              : t('common.next')
            }
          </Button>
        </div>

      </Container>
    </PageTransition>
  );
};

export default OnboardingScreen;
