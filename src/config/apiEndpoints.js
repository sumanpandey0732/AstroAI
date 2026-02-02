/**
 * 🔗 API Endpoints
 * Defines specific paths for external API services.
 */

export const endpoints = {
  // 🤖 OpenRouter (AI Generation)
  ai: {
    // Standard OpenAI-compatible chat completion endpoint
    chat: '/chat/completions',
    
    // Some models might require specific paths, defined here if needed
    models: '/models',
  },

  // 🔍 SerpAPI (Google Search / Rashifal)
  serp: {
    // Standard search endpoint
    search: '.json', // SerpAPI appends .json to the base URL
    
    // Specific parameters for Google Search engine
    engine: 'google',
  },

  // 🌐 Internal App Routes (for navigation references)
  routes: {
    home: '/',
    palm: '/palm-reading',
    tarot: '/tarot',
    horoscope: '/horoscope',
    rashifal: '/daily-rashifal',
    chat: '/ai-chat',
    settings: '/settings',
  }
};

export default endpoints;
