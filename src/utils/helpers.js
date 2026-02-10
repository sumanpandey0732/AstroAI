/**
 * 🛠️ GENERAL HELPER UTILITIES
 * Collection of common utility functions used across the application.
 */

/**
 * Calculates the Zodiac sign based on date of birth (MM-DD or YYYY-MM-DD).
 * @param {string} dob - Date of birth
 * @returns {string} Zodiac sign name
 */
const getZodiacSign = (dob) => {
  if (!dob) return '';
  const date = new Date(dob);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 1 && day <= 19) || (month === 12 && day >= 22)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  return '';
};

export const helpers = {
  getZodiacSign,
  wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  getRandomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  getRandomItem: (array) => {
    if (!array || array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
  },
  shuffleArray: (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },
  capitalize: (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },
  truncate: (str, length = 100) => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  },
  generateId: () => Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
  safeJSONParse: (str, fallback = null) => {
    try {
      const data = JSON.parse(str);
      return data || fallback;
    } catch (e) {
      return fallback;
    }
  },
  isEmpty: (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  },
  triggerHaptic: (ms = 50) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(ms);
    }
  },
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  },
  shareContent: async (data) => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(data);
        return true;
      } catch (err) {
        return false;
      }
    } else if (data.url) {
      try {
        await navigator.clipboard.writeText(data.url);
        return true;
      } catch (err) {
        return false;
      }
    }
    return false;
  },
  classNames: (...classes) => classes.filter(Boolean).join(' '),
  scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  getRelativeDateLabel: (date) => {
    const today = new Date();
    const target = new Date(date);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diffTime = today - target;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays === -1) return 'Tomorrow';
    return target.toLocaleDateString();
  }
};
