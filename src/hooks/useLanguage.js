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
  
  return context;
};

export default useLanguage;
