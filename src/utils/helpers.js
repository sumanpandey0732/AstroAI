/**
 * 🛠️ GENERAL HELPER UTILITIES
 * Collection of common utility functions used across the application.
 */

// ═══════════════════════════════════════════════════════════
// ⏱️ TIME & DELAY HELPERS
// ═══════════════════════════════════════════════════════════

/**
 * Pauses execution for a specified amount of time.
 * Useful for simulating API delays or waiting for animations.
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise}
 */
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ═══════════════════════════════════════════════════════════
// 🎲 RANDOMIZATION HELPERS
// ═══════════════════════════════════════════════════════════

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Returns a random item from an array.
 * @param {Array} array
 * @returns {*} Random item
 */
export const getRandomItem = (array) => {
  if (!array || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * Important for Tarot shuffling.
 * @param {Array} array
 * @returns {Array} New shuffled array
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// ═══════════════════════════════════════════════════════════
// 📝 STRING MANIPULATION
// ═══════════════════════════════════════════════════════════

/**
 * Capitalizes the first letter of a string.
 * @param {string} string
 * @returns {string}
 */
export const capitalize = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

/**
 * Truncates a string to a specific length and adds '...'.
 * @param {string} str
 * @param {number} length
 * @returns {string}
 */
export const truncate = (str, length = 100) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

/**
 * Generates a unique ID (simple implementation).
 * @returns {string}
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// ═══════════════════════════════════════════════════════════
// 💾 DATA & VALIDATION
// ═══════════════════════════════════════════════════════════

/**
 * Safely parses JSON string.
 * @param {string} str - JSON string
 * @param {*} fallback - Fallback value if parsing fails
 * @returns {*}
 */
export const safeJSONParse = (str, fallback = null) => {
  try {
    const data = JSON.parse(str);
    return data || fallback;
  } catch (e) {
    return fallback;
  }
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object).
 * @param {*} value
 * @returns {boolean}
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

// ═══════════════════════════════════════════════════════════
// 📳 MOBILE INTERACTION
// ═══════════════════════════════════════════════════════════

/**
 * Triggers haptic feedback (vibration) on supported devices.
 * @param {number} ms - Vibration duration in ms (default 50)
 */
export const triggerHaptic = (ms = 50) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(ms);
  }
};

/**
 * Copies text to clipboard.
 * @param {string} text
 * @returns {Promise<boolean>} success
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Uses the Web Share API to share content.
 * @param {Object} data - { title, text, url }
 * @returns {Promise<boolean>} success
 */
export const shareContent = async (data) => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (err) {
      // User cancelled or error
      return false;
    }
  } else {
    // Fallback: Copy to clipboard
    if (data.url) {
      return copyToClipboard(data.url);
    }
    return false;
  }
};

// ═══════════════════════════════════════════════════════════
// 🎨 UI HELPERS
// ═══════════════════════════════════════════════════════════

/**
 * Combines class names conditionally (tiny alternative to 'clsx' or 'classnames').
 * Usage: classNames('btn', isActive && 'active', 'p-4')
 * @param  {...any} classes
 * @returns {string}
 */
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Scrolls the window to the top smoothly.
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

/**
 * Gets relative time string (e.g., "Today", "Yesterday").
 * Simple version for common use cases.
 * @param {Date} date
 * @returns {string}
 */
export const getRelativeDateLabel = (date) => {
  const today = new Date();
  const target = new Date(date);
  
  // Reset hours for comparison
  today.setHours(0,0,0,0);
  target.setHours(0,0,0,0);
  
  const diffTime = today - target;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays === -1) return 'Tomorrow';
  
  return target.toLocaleDateString();
};
