/**
 * 🗣️ useLanguage Hook
 * Provides translation capabilities and language switching logic.
 * Wraps LanguageContext for cleaner usage in components.
 */

import { useContext } from 'react';
import LanguageContext from '../context/LanguageContext';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return {
    language: context.language,           // Current language code (e.g. 'en')
    changeLanguage: context.changeLanguage, // Function to update language
    t: context.t,                         // Function to translate text
    isLoading: context.isLoading,         // Is language file loading?
    supportedLanguages: context.languages // List of all available languages
  };
};

export default useLanguage;
