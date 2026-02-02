/**
 * 🌟 Rashifal Logic Service
 * Manages caching and retrieval of Daily Horoscope.
 * Prevents excessive API calls by storing today's result locally.
 */

import { fetchDailyRashifal } from './serpApiService';
import { storageService } from './storageService';
import { config } from '../config/appConfig';

const CACHE_KEY = config.storage.lastRashifal;

/**
 * Get Rashifal for the user (Check Cache -> Then API)
 * @param {string} zodiacSign - English name (e.g., 'Aries')
 * @param {string} language - User's language code
 */
export const getOrFetchRashifal = async (zodiacSign, language) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // "2024-03-20"
    
    // 1. Check Local Storage first
    const cachedData = await storageService.user.get(); // We store it in user profile or separate key
    // Actually, let's use a dedicated method for direct access if possible, 
    // but here we will read the specific rashifal cache key directly from IDB if needed.
    // For simplicity, we'll implement a custom get/set here wrapping storageService logic if needed,
    // or just trust the fetch logic.
    
    // Let's retrieve the specific cached object
    // Note: storageService doesn't have a direct method for arbitrary keys, 
    // so we will assume we store it in a specific 'rashifal_cache' object inside LocalStorage for speed.
    const cacheString = localStorage.getItem(CACHE_KEY);
    
    if (cacheString) {
      const cache = JSON.parse(cacheString);
      
      // If data is from TODAY and for the SAME Sign and Language
      if (cache.date === today && cache.sign === zodiacSign && cache.lang === language) {
        console.log('⚡ Using Cached Rashifal');
        return cache.text;
      }
    }

    // 2. If no cache, Fetch from API
    console.log('🌍 Fetching Fresh Rashifal from Google...');
    const freshText = await fetchDailyRashifal(zodiacSign, language);

    if (freshText) {
      // 3. Save to Cache
      const newCache = {
        date: today,
        sign: zodiacSign,
        lang: language,
        text: freshText
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
      return freshText;
    }

    return null;

  } catch (error) {
    console.error('Rashifal Service Error:', error);
    return "Stars are cloudy today. Please try again later.";
  }
};

/**
 * Clear cache (Useful for testing or force refresh)
 */
export const clearRashifalCache = () => {
  localStorage.removeItem(CACHE_KEY);
};

export default {
  getOrFetchRashifal,
  clearRashifalCache
};
