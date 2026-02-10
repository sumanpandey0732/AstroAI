import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { config } from '../config/appConfig';

// Default to English if nothing is found
const DEFAULT_LANG = 'en';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(DEFAULT_LANG);
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 1. Initial Load: Check Storage -> Browser -> Default
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        // Try to get from storage
        const savedLang = await storageService.settings.getLanguage();
        
        if (savedLang) {
          setLanguage(savedLang);
        } else {
          // Try to detect browser language
          const browserLang = navigator.language.split('-')[0];
          const isSupported = config.languages.some(l => l.code === browserLang);
          setLanguage(isSupported ? browserLang : DEFAULT_LANG);
        }
      } catch (error) {
        console.warn('Language load failed', error);
        setLanguage(DEFAULT_LANG);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedLanguage();
  }, []);

  // 2. Load Translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Dynamic import of locale files (Files 69-74)
        // Note: These files will be created in Phase 4
        let module;
        switch (language) {
          case 'hi': module = await import('../locales/hi.js'); break;
          case 'ne': module = await import('../locales/ne.js'); break; // Nepali
          case 'es': module = await import('../locales/es.js'); break;
          case 'fr': module = await import('../locales/fr.js'); break;
          case 'it': module = await import('../locales/it.js'); break;
          case 'ko': module = await import('../locales/ko.js'); break;
          case 'en': 
          default:   module = await import('../locales/en.js'); break;
        }
        
        setTranslations(module.default || module);
      } catch (error) {
        console.error(`Failed to load language: ${language}`, error);
        // Fallback to English if file missing
        if (language !== 'en') {
          const fallback = await import('../locales/en.js');
          setTranslations(fallback.default);
        }
      }
    };

    if (language) {
      loadTranslations();
    }
  }, [language]);

  // 3. Change Language Function
  const changeLanguage = async (langCode) => {
    setLanguage(langCode);
    await storageService.settings.saveLanguage(langCode);
  };

  // 4. Translate Function (t)
  // Usage: t('home.welcome') -> returns "Welcome" or "स्वागत है"
  const t = (key) => {
    // Splits 'home.welcome' into ['home', 'welcome'] and traverses object
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Return key if translation missing
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isLoading, languages: config.languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook to use Language easily
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
