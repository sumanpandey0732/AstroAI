/**
 * 🚩 Feature Flags
 * Toggle specific app functionalities ON/OFF instantly.
 * Useful for staged rollouts, maintenance, or disabling paid features.
 */

import { config } from './appConfig';

export const features = {
  // 🔮 Core Modules
  palmReading: true,       // Enable Palm Analysis
  tarotReading: true,      // Enable Tarot Cards
  horoscope: true,         // Enable Static Horoscope
  
  // 🆕 New Integrations
  dailyRashifal: true,     // Enable SerpAPI Daily Rashifal
  aiChat: true,           // Enable OpenRouter AI Chat
  
  // 🛠️ Utilities
  pwaInstallPrompt: true,  // Show "Install App" banner
  maintenanceMode: false,  // If true, shows Maintenance Screen globally
  
  // 🔒 Privacy & Safety
  saveHistoryLocally: true,// Save readings to IndexedDB
  allowGuestAccess: true,  // Allow use without detailed profile
  
  // 🧪 Beta Features (Not fully ready)
  loveCompatibility: true, // Love Match Feature
  voiceInput: false,       // Voice-to-text (Future update)
};

/**
 * Helper to check if a feature is enabled
 * @param {string} featureName 
 * @returns {boolean}
 */
export const isFeatureEnabled = (featureName) => {
  // If maintenance mode is ON, disable everything except core UI
  if (features.maintenanceMode) {
    console.warn('🚧 App is in Maintenance Mode');
    return false;
  }
  
  return features[featureName] ?? false;
};

export default features;
