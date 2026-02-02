/**
 * 🔍 SerpAPI Service
 * Fetches real-time horoscope data from Google Search results.
 */

import { config } from '../config/appConfig';
import { endpoints } from '../config/apiEndpoints';

/**
 * Fetch Daily Rashifal for a specific Zodiac sign
 * @param {string} zodiacSign - English name (e.g., "Aries")
 * @param {string} language - Language code (e.g., 'hi', 'en')
 * @returns {Promise<string>} - The horoscope text
 */
export const fetchDailyRashifal = async (zodiacSign, language = 'en') => {
  try {
    // 1. Construct the search query based on language
    // Example: "Aries horoscope today" or "Mesh rashi aaj ka rashifal"
    let query = `${zodiacSign} horoscope today`;
    
    if (language === 'hi') {
      // Mapping English Zodiac to Hindi for better search results
      const hindiZodiac = getHindiZodiacName(zodiacSign);
      query = `${hindiZodiac} आज का राशिफल`;
    } else if (language === 'ne') {
       const nepaliZodiac = getHindiZodiacName(zodiacSign); // Nepali names are same as Hindi usually
       query = `${nepaliZodiac} आजको राशिफल`;
    }

    // 2. Build URL with parameters
    const params = new URLSearchParams({
      api_key: config.api.serpApi.key,
      q: query,
      engine: 'google',
      gl: language === 'hi' ? 'in' : 'us', // Geography: India for Hindi, US for others
      hl: language, // Host Language
    });

    const url = `${config.api.serpApi.baseUrl}/${endpoints.serp.search}?${params.toString()}`;

    // 3. Call SerpAPI
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`SerpAPI Error: ${response.statusText}`);
    }

    const data = await response.json();

    // 4. Extract the best answer
    // Priority: Knowledge Graph > Answer Box > Organic Result Snippet
    let resultText = '';

    if (data.knowledge_graph?.description) {
      resultText = data.knowledge_graph.description;
    } else if (data.answer_box?.snippet) {
      resultText = data.answer_box.snippet;
    } else if (data.organic_results?.[0]?.snippet) {
      resultText = data.organic_results[0].snippet;
    } else {
      resultText = "Unable to fetch live updates. Please check back later.";
    }

    return resultText;

  } catch (error) {
    console.error('❌ Rashifal Fetch Error:', error);
    // Return a safe fallback message so app doesn't crash
    return null; 
  }
};

/**
 * Helper: Convert English Zodiac to Hindi/Sanskrit Name
 */
function getHindiZodiacName(englishName) {
  const map = {
    'Aries': 'मेष',
    'Taurus': 'वृषभ',
    'Gemini': 'मिथुन',
    'Cancer': 'कर्क',
    'Leo': 'सिंह',
    'Virgo': 'कन्या',
    'Libra': 'तुला',
    'Scorpio': 'वृश्चिक',
    'Sagittarius': 'धनु',
    'Capricorn': 'मकर',
    'Aquarius': 'कुंभ',
    'Pisces': 'मीन'
  };
  return map[englishName] || englishName;
}

export default {
  fetchDailyRashifal
};
