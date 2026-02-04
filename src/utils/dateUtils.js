/**
 * 📅 DATE & TIME UTILITIES
 * Specialized functions for handling dates, time, and astrological calculations.
 */

// ═══════════════════════════════════════════════════════════
// 📆 FORMATTING FUNCTIONS
// ═══════════════════════════════════════════════════════════

/**
 * Formats a date object to a readable string based on locale.
 * Example: "January 15, 1990" or "15 Jan 1990"
 * @param {Date|string} date
 * @param {string} locale - 'en-US', 'hi-IN', etc.
 * @returns {string}
 */
export const formatDate = (date, locale = 'en-US') => {
  if (!date) return '';
  const d = new Date(date);
  
  // Invalid date check
  if (isNaN(d.getTime())) return '';

  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formats time to readable string.
 * Example: "10:30 AM"
 * @param {string} timeStr - "10:30" (24h format)
 * @returns {string}
 */
export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  
  const [hours, minutes] = timeStr.split(':');
  const d = new Date();
  d.setHours(hours);
  d.setMinutes(minutes);
  
  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Returns current date in YYYY-MM-DD format (for input fields).
 * @returns {string}
 */
export const getCurrentDateISO = () => {
  return new Date().toISOString().split('T')[0];
};

// ═══════════════════════════════════════════════════════════
// 🎂 AGE & BIRTHDAY CALCULATIONS
// ═══════════════════════════════════════════════════════════

/**
 * Calculates age from birth date.
 * @param {string|Date} birthDate
 * @returns {number} Age in years
 */
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  
  const today = new Date();
  const birth = new Date(birthDate);
  
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  
  // Adjust if birthday hasn't happened yet this year
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Checks if today is the user's birthday.
 * @param {string|Date} birthDate
 * @returns {boolean}
 */
export const isBirthdayToday = (birthDate) => {
  if (!birthDate) return false;
  
  const today = new Date();
  const birth = new Date(birthDate);
  
  return (
    today.getDate() === birth.getDate() && 
    today.getMonth() === birth.getMonth()
  );
};

// ═══════════════════════════════════════════════════════════
// ♈ ZODIAC SIGN CALCULATION (Western)
// ═══════════════════════════════════════════════════════════

/**
 * Determines the Western Zodiac sign based on birth day and month.
 * @param {string|Date} date - Birth date
 * @returns {Object} { sign: 'aries', symbol: '♈', name: 'Aries' }
 */
export const getZodiacSign = (date) => {
  if (!date) return null;
  
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1; // JS months are 0-indexed

  // Zodiac Sign Logic
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { sign: 'aries', symbol: '♈', name: 'Aries' };
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { sign: 'taurus', symbol: '♉', name: 'Taurus' };
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { sign: 'gemini', symbol: '♊', name: 'Gemini' };
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { sign: 'cancer', symbol: '♋', name: 'Cancer' };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { sign: 'leo', symbol: '♌', name: 'Leo' };
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { sign: 'virgo', symbol: '♍', name: 'Virgo' };
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { sign: 'libra', symbol: '♎', name: 'Libra' };
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { sign: 'scorpio', symbol: '♏', name: 'Scorpio' };
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { sign: 'sagittarius', symbol: '♐', name: 'Sagittarius' };
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { sign: 'capricorn', symbol: '♑', name: 'Capricorn' };
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { sign: 'aquarius', symbol: '♒', name: 'Aquarius' };
  } else {
    return { sign: 'pisces', symbol: '♓', name: 'Pisces' };
  }
};

// ═══════════════════════════════════════════════════════════
// 🕉️ VEDIC RASHI CALCULATION (Simplified)
// ═══════════════════════════════════════════════════════════

/**
 * Returns Vedic moon sign based on user input.
 * Note: Accurate Vedic calculation requires exact time/lat/long.
 * This is a mapping helper for the Rashi Selector UI.
 * @param {string} rashiId
 * @returns {Object} Rashi details
 */
export const getRashiDetails = (rashiId) => {
  const rashis = {
    mesh: { name: 'Mesh', symbol: '♈', western: 'Aries' },
    vrishabh: { name: 'Vrishabh', symbol: '♉', western: 'Taurus' },
    mithun: { name: 'Mithun', symbol: '♊', western: 'Gemini' },
    kark: { name: 'Kark', symbol: '♋', western: 'Cancer' },
    simha: { name: 'Simha', symbol: '♌', western: 'Leo' },
    kanya: { name: 'Kanya', symbol: '♍', western: 'Virgo' },
    tula: { name: 'Tula', symbol: '♎', western: 'Libra' },
    vrishchik: { name: 'Vrishchik', symbol: '♏', western: 'Scorpio' },
    dhanu: { name: 'Dhanu', symbol: '♐', western: 'Sagittarius' },
    makar: { name: 'Makar', symbol: '♑', western: 'Capricorn' },
    kumbh: { name: 'Kumbh', symbol: '♒', western: 'Aquarius' },
    meen: { name: 'Meen', symbol: '♓', western: 'Pisces' },
  };
  return rashis[rashiId] || null;
};

// ═══════════════════════════════════════════════════════════
// 🌙 MOON PHASE & DAY OF WEEK
// ═══════════════════════════════════════════════════════════

/**
 * Gets the day of the week (e.g., "Monday").
 * @returns {string}
 */
export const getDayOfWeek = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

/**
 * Gets a greeting based on current hour (Morning/Afternoon/Evening).
 * @returns {string} key for translation (e.g., 'greeting_morning')
 */
export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) return 'greeting_morning';
  if (hour >= 12 && hour < 17) return 'greeting_afternoon';
  if (hour >= 17 && hour < 21) return 'greeting_evening';
  return 'greeting_night';
};
