/**
 * 🌟 RASHIFAL LOGIC SERVICE
 * Manages caching and retrieval of Daily Rashifal.
 * Prevents excessive API calls by storing today's result locally.
 */

import { fetchDailyRashifal } from './serpApiService';

const CACHE_KEY_PREFIX = 'astroai_rashifal_';

/**
 * Get Rashifal for the user (Check Cache -> Then API)
 * @param {string} rashiId - e.g., 'mesh', 'vrishabh'
 */
export const getOrFetchRashifal = async (rashiId) => {
  if (!rashiId) return null;

  try {
    const today = new Date().toISOString().split('T')[0]; // "2024-03-20"
    const cacheKey = `${CACHE_KEY_PREFIX}${rashiId}`;
    
    // 1. Check Local Storage first
    const cacheString = localStorage.getItem(cacheKey);
    
    if (cacheString) {
      const cache = JSON.parse(cacheString);
      
      // If data is from TODAY
      if (cache.date === today) {
        console.log(`⚡ Using Cached Rashifal for ${rashiId}`);
        return cache.data;
      }
    }

    // 2. If no cache or old data, Fetch from API
    console.log(`🌍 Fetching Fresh Rashifal for ${rashiId}...`);
    const freshData = await fetchDailyRashifal(rashiId);

    if (freshData) {
      // 3. Save to Cache
      const newCache = {
        date: today,
        data: freshData
      };
      localStorage.setItem(cacheKey, JSON.stringify(newCache));
      return freshData;
    }

    return null;

  } catch (error) {
    console.error('Rashifal Service Error:', error);
    return "Aaj ke sitare badalo mein chip gaye hain. Kripya thodi der baad prayas karein.";
  }
};

/**
 * Clear all rashifal caches (Useful for testing or force refresh)
 */
export const clearAllRashifalCache = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(CACHE_KEY_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};

export default {
  getOrFetchRashifal,
  clearAllRashifalCache
};
