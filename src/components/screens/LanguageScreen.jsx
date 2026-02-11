import React, { useState } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useLanguage } from '../../hooks/useLanguage';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import Button from '../common/Button';
import GlassCard from '../common/GlassCard';

/**
 * 🌍 LANGUAGE SELECTION SCREEN
 * Allows user to choose their preferred language before starting onboarding.
 */
const LanguageScreen = () => {
  const { navigate } = useNavigation();
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(language);

  // Handle Language Change
  const handleSelect = (langCode) => {
    setSelectedLang(langCode);
    setLanguage(langCode); // Update globally immediately for live preview
    
    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(10);
  };

  // Continue to Onboarding
  const handleContinue = () => {
    navigate('onboarding');
  };

  return (
    <PageTransition variant="slideUp" className="bg-midnight-950">
      <Container center fullHeight hasBottomNav={false}>
        
        {/* 🌟 Header Section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-block p-4 mb-4 rounded-full bg-white/5 border border-white/10 shadow-glow-sm">
            <span className="text-4xl">🌍</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {t('settings.language')}
          </h1>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            Choose your preferred language to connect with the cosmos.
          </p>
        </div>

        {/* 📦 Language Grid */}
        <div className="w-full grid grid-cols-2 gap-3 mb-8">
          {supportedLanguages.map((lang, index) => {
            const isSelected = selectedLang === lang.code;
            
            return (
              <GlassCard
                key={lang.code}
                variant={isSelected ? 'cosmic' : 'dark'}
                interactive
                onClick={() => handleSelect(lang.code)}
                className={`
                  p-4 flex flex-col items-center justify-center gap-2 text-center
                  transition-all duration-300
                  animate-fade-in-up
                  ${isSelected ? 'ring-2 ring-cyan-500/50 scale-105' : 'opacity-80 hover:opacity-100'}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* 🏳️ Flag */}
                <span className="text-3xl filter drop-shadow-lg">
                  {lang.flag}
                </span>
                
                {/* 📝 Name */}
                <div className="flex flex-col">
                  <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {lang.nativeName}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                    {lang.name}
                  </span>
                </div>

                {/* ✅ Checkmark (if selected) */}
                {isSelected && (
                  <div className="absolute top-2 right-2 text-cyan-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* 🦶 Footer Button */}
        <div className="w-full animate-fade-in-up animation-delay-500">
          <Button 
            fullWidth 
            size="lg" 
            onClick={handleContinue}
            className="shadow-glow-md"
          >
            {t('common.continue')}
          </Button>
        </div>

      </Container>
    </PageTransition>
  );
};

export default LanguageScreen;
