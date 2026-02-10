/**
 * 🕉️ SERP API SERVICE (RASHIFAL)
 * Fetches daily horoscope (Rashifal) from Google Search Results via SerpAPI.
 * 
 * NOTE: You need a valid SerpAPI Key in .env file (VITE_SERP_API_KEY).
 * If API fails, it returns a fallback prediction to keep the app running.
 */

const API_KEY = import.meta.env.VITE_SERP_API_KEY;
const BASE_URL = 'https://serpapi.com/search.json'; // Note: Direct calls might be blocked by CORS in prod. Usually requires a backend proxy.

// Helper to get Hindi Rashi Name
const getHindiName = (rashiId) => {
  const names = {
    mesh: 'मेष', vrishabh: 'वृषभ', mithun: 'मिथुन', kark: 'कर्क',
    simha: 'सिंह', kanya: 'कन्या', tula: 'तुला', vrishchik: 'वृश्चिक',
    dhanu: 'धनु', makar: 'मकर', kumbh: 'कुंभ', meen: 'मीन'
  };
  return names[rashiId] || rashiId;
};

// ═══════════════════════════════════════════════════════════
// 🔍 FETCH DAILY RASHIFAL
// ═══════════════════════════════════════════════════════════
export const fetchDailyRashifal = async (rashiId) => {
  const rashiName = getHindiName(rashiId);
  const query = `aaj ka rashifal ${rashiName} in hindi`;

  try {
    // ⚠️ IMPORTANT: SerpAPI usually blocks direct browser calls due to CORS.
    // In a real production app, you should call this via a Netlify Function or Proxy.
    // For this PWA, we will try direct call, but fallback immediately if it fails.
    
    // Check if API Key exists
    if (!API_KEY) {
      console.warn('SerpAPI Key missing. Using fallback data.');
      return getFallbackData(rashiName);
    }

    const url = `${BASE_URL}?engine=google&q=${encodeURIComponent(query)}&api_key=${API_KEY}&gl=in&hl=hi`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`SerpAPI Error: ${response.status}`);
    }

    const data = await response.json();

    // Parse the "Answer Box" or "Organic Results" snippet
    let prediction = "";

    // 1. Try Answer Box (Direct Answer)
    if (data.answer_box && data.answer_box.snippet) {
      prediction = data.answer_box.snippet;
    } 
    // 2. Try First Organic Result Snippet
    else if (data.organic_results && data.organic_results[0]) {
      prediction = data.organic_results[0].snippet;
    }

    if (!prediction) {
      throw new Error('No prediction found in search results');
    }

    // Clean up text
    return cleanPredictionText(prediction);

  } catch (error) {
    console.error('Rashifal Fetch Error:', error);
    // Graceful degradation: Return offline/mock data
    return getFallbackData(rashiName);
  }
};

// ═══════════════════════════════════════════════════════════
// 🧹 TEXT CLEANER
// ═══════════════════════════════════════════════════════════
const cleanPredictionText = (text) => {
  // Remove dates or extra metadata often found in search snippets
  let clean = text.replace(/(\d{1,2} \w+ \d{4})|(\.\.\.)/g, '').trim();
  // Ensure it ends with a punctuation
  if (!clean.endsWith('.') && !clean.endsWith('।')) clean += '।';
  return clean;
};

// ═══════════════════════════════════════════════════════════
// 🛡️ FALLBACK DATA (Offline Support)
// ═══════════════════════════════════════════════════════════
const getFallbackData = (rashiName) => {
  // Returns a generic positive prediction so the user always sees something.
  const messages = [
    `${rashiName} राशि वाले जातकों के लिए आज का दिन शुभ रहेगा। कार्यक्षेत्र में सफलता मिलेगी और मन प्रसन्न रहेगा।`,
    `आज ${rashiName} राशि वालों को धन लाभ होने के योग हैं। सेहत का ध्यान रखें और विवादों से दूर रहें।`,
    `${rashiName} राशि के लिए आज का दिन मिला-जुला रहेगा। परिवार के साथ समय बिताने से खुशी मिलेगी।`,
    `आज आपको अपनी मेहनत का फल मिलेगा। ${rashiName} राशि वाले विद्यार्थी आज पढ़ाई में अच्छा प्रदर्शन करेंगे।`
  ];
  
  // Pick random message based on day to keep it consistent for the day
  const dayIndex = new Date().getDate() % messages.length;
  return messages[dayIndex];
};
