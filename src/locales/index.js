// Import translation files
// Note: We will create these individual files (en.js, hi.js, etc.) in the next steps.
import en from './en';
import hi from './hi';
import ne from './ne';
import es from './es';
import fr from './fr';
import it from './it';
import ko from './ko';

// ═══════════════════════════════════════════════════════════
// 🌍 LANGUAGE RESOURCES
// ═══════════════════════════════════════════════════════════
// This maps the language codes to their translation data
export const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
  ne: {
    translation: ne,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  it: {
    translation: it,
  },
  ko: {
    translation: ko,
  },
};

// ═══════════════════════════════════════════════════════════
// 📋 SUPPORTED LANGUAGES CONFIG
// ═══════════════════════════════════════════════════════════
// Metadata used for the Language Selector UI
export const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    dir: 'ltr',
  },
  {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली',
    flag: '🇳🇵',
    dir: 'ltr', // Nepali uses Devanagari script, primarily LTR
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    dir: 'ltr',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    dir: 'ltr',
  },
];

// ═══════════════════════════════════════════════════════════
// ⚙️ DEFAULT CONFIGURATION
// ═══════════════════════════════════════════════════════════
export const DEFAULT_LANGUAGE = 'en';

export const FALLBACK_LANGUAGE = 'en';

// Helper to check if a language is supported
export const isLanguageSupported = (langCode) => {
  return SUPPORTED_LANGUAGES.some((lang) => lang.code === langCode);
};

// Helper to get language direction (ltr/rtl)
export const getLanguageDir = (langCode) => {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
  return lang ? lang.dir : 'ltr';
};
