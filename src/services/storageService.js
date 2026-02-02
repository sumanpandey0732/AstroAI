/**
 * 💾 Storage Service
 * Manages local data persistence using IndexedDB (via idb-keyval).
 * Stores User Profile, Reading History, and Settings.
 */

import { set, get, del, clear, keys } from 'idb-keyval';
import { config } from '../config/appConfig';

// Keys used for storage
const KEYS = config.storage;

export const storageService = {
  // 👤 User Profile Management
  user: {
    save: async (profileData) => {
      try {
        await set(KEYS.userProfile, profileData);
        return true;
      } catch (e) {
        console.error('Error saving profile:', e);
        return false;
      }
    },
    get: async () => {
      return await get(KEYS.userProfile);
    },
    clear: async () => {
      await del(KEYS.userProfile);
    }
  },

  // 📜 History Management (Tarot, Palm, Chat)
  history: {
    // Add a new record to a specific history list
    add: async (type, record) => {
      // type: 'tarot' | 'palm' | 'chat'
      const key = type === 'tarot' ? KEYS.tarotHistory : 
                  type === 'chat' ? KEYS.chatHistory : KEYS.palmScan;
      
      try {
        const currentHistory = (await get(key)) || [];
        const newHistory = [record, ...currentHistory]; // Add to top
        
        // Limit history to last 50 items to save space
        if (newHistory.length > 50) newHistory.length = 50;
        
        await set(key, newHistory);
        return true;
      } catch (e) {
        console.error(`Error saving ${type} history:`, e);
        return false;
      }
    },

    get: async (type) => {
      const key = type === 'tarot' ? KEYS.tarotHistory : 
                  type === 'chat' ? KEYS.chatHistory : KEYS.palmScan;
      return (await get(key)) || [];
    },

    clearAll: async () => {
      await del(KEYS.tarotHistory);
      await del(KEYS.chatHistory);
      await del(KEYS.palmScan);
    }
  },

  // ⚙️ App Settings (Language, Theme)
  settings: {
    saveLanguage: async (langCode) => {
      await set(KEYS.language, langCode);
    },
    getLanguage: async () => {
      return await get(KEYS.language);
    },
    saveTheme: async (isDark) => {
      await set(KEYS.theme, isDark);
    }
  },

  // 🗑️ Danger Zone
  resetApp: async () => {
    await clear(); // Wipes everything
  }
};

export default storageService;
