/**
 * ⚙️ Application Configuration
 * Centralizes all environment variables and app-wide constants.
 */

// Helper to get env variable with fallback
const getEnv = (key, defaultValue = '') => {
  return import.meta.env[key] || defaultValue;
};

export const config = {
  // 📱 App Details
  app: {
    name: getEnv('VITE_APP_NAME', 'AI Palm Reader'),
    version: getEnv('VITE_APP_VERSION', '1.0.0'),
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  },

  // 🔑 API Keys & Endpoints
  api: {
    // OpenRouter (AI Models)
    openRouter: {
      key: getEnv('VITE_OPENROUTER_API_KEY'),
      baseUrl: getEnv('VITE_API_BASE_URL', 'https://openrouter.ai/api/v1'),
      visionModel: getEnv('VITE_OPENROUTER_VISION_MODEL', 'allenai/molmo-7b-d-0924'),
      textModel: getEnv('VITE_OPENROUTER_TEXT_MODEL', 'liquid/lfm-7b'),
    },
    
    // SerpAPI (Daily Rashifal)
    serpApi: {
      key: getEnv('VITE_SERPAPI_KEY'),
      baseUrl: getEnv('VITE_SERPAPI_BASE_URL', 'https://serpapi.com/search'),
    },
  },

  // 🌍 Supported Languages
  languages: [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ne', name: 'Nepali', native: 'नेपाली' }, // ✅ Added Nepali
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'it', name: 'Italian', native: 'Italiano' },
    { code: 'ko', name: 'Korean', native: '한국어' },
  ],

  // 🔗 External Links
  links: {
    privacyPolicy: '/privacy-policy',
    termsOfService: '/terms',
    supportEmail: 'support@aipalmreader.com',
  },

  // 💾 Storage Keys (LocalStorage/IndexedDB)
  storage: {
    userProfile: 'apr_user_profile',
    palmScan: 'apr_palm_scan_result',
    tarotHistory: 'apr_tarot_history',
    chatHistory: 'apr_chat_history',
    language: 'apr_language',
    theme: 'apr_theme',
    lastRashifal: 'apr_last_rashifal',
  },
};

/**
 * ⚠️ Validation Check
 * Warns developer if critical keys are missing in development
 */
if (config.app.isDev) {
  if (!config.api.openRouter.key) {
    console.warn('⚠️ VITE_OPENROUTER_API_KEY is missing in .env file');
  }
  if (!config.api.serpApi.key) {
    console.warn('⚠️ VITE_SERPAPI_KEY is missing in .env file');
  }
}

export default config;
