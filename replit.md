# AI Palm Reader – Tarot & Astrology Guidance PWA

## Overview

AI Palm Reader is a mobile-first Progressive Web App (PWA) that provides AI-powered spiritual guidance through palm reading, tarot card interpretation, daily horoscopes, and an AI chat assistant. The app uses OpenRouter API for AI inference (both vision and text models) and SerpAPI for fetching daily horoscope (Rashifal) data. It's built as a purely client-side React application with no backend server — all data persistence happens locally via IndexedDB and localStorage.

The app supports 7 languages (English, Hindi, Nepali, Spanish, French, Italian, Korean) and is designed to be installable on mobile devices as a PWA with offline support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (Client-Side Only)

- **Framework:** React 18 with Vite 5 as the build tool
- **Styling:** Tailwind CSS for utility-first styling with a custom dark cosmic theme (midnight blues, purples, cyans). Custom glassmorphism utilities are defined in `src/theme/glassmorphism.js`
- **Animations:** Framer Motion for page transitions, card flips, scan effects, and UI interactions. Reusable animation variants are centralized in `src/theme/animations.js`
- **State Management:** Zustand for global state. React Context API is also used for Navigation, Language, Toast notifications, and User data
- **Routing:** Custom context-based navigation (`NavigationContext`) rather than React Router. Screens are managed through a navigation context with a history stack and back button handling

### Key Directories

- `src/config/` — App configuration (`appConfig.js`), API endpoints, and feature flags for toggling functionality
- `src/data/` — Static data: tarot card definitions (78 cards), zodiac sign info, palm line meanings, onboarding slides
- `src/hooks/` — Custom React hooks: `useNavigation`, `useLanguage`, `useToast`, `usePWA`, `useImageUpload`, `useVibration`, `useOnlineStatus`, `useBackHandler`, `useScrollLock`, `useLocalStorage`, `useUser`
- `src/services/` — Business logic services: `aiService.js` (OpenRouter calls), `imageService.js` (compression), `serpApiService.js` (Rashifal), `storageService.js` (IndexedDB via idb-keyval), `shareService.js` (Web Share API), `rashifalService.js` (caching layer)
- `src/locales/` — i18n translation files for all 7 languages. Custom translation system (not using i18next library)
- `src/theme/` — Design system: colors, typography, animations, glassmorphism utilities
- `src/utils/` — Helpers for dates, zodiac calculation, array shuffling, and AI system prompts
- `public/` — PWA manifest, icons, robots.txt

### Data Storage

- **IndexedDB** (via `idb-keyval` library) — Stores user profile, reading history (palm, tarot, chat), and settings. Limited to 50 items per history type
- **localStorage** — Stores user profile backup, rashifal cache (date-keyed), disclaimer acceptance, and chat history
- **No server-side database** — This is entirely a client-side application

### AI Integration Pattern

- All AI calls go through `src/services/aiService.js` which wraps the OpenRouter API
- A strict system prompt (`src/utils/systemPrompts.js`) enforces safe, positive, non-predictive spiritual guidance
- **Vision Model** (default: `allenai/molmo-7b-d-0924`) — Used for palm image analysis. Images are compressed to ~800KB and converted to base64 before sending
- **Text Model** (default: `liquid/lfm-7b`) — Used for tarot readings, horoscope, and chat
- Image compression happens client-side via `browser-image-compression`

### PWA Configuration

- `vite-plugin-pwa` with Workbox for service worker generation and auto-update
- Configured for standalone display, portrait orientation
- Offline caching of all static assets (JS, CSS, HTML, images, fonts)
- Custom install prompt handling via `usePWA` hook
- iOS-specific meta tags for web app capability

### Feature Flags

`src/config/featureFlags.js` provides a toggle system to enable/disable features (palm reading, tarot, horoscope, rashifal, AI chat, PWA install prompt, love compatibility, maintenance mode) without code changes.

### Environment Variables

All prefixed with `VITE_`:
- `VITE_OPENROUTER_API_KEY` — Required for AI features
- `VITE_API_BASE_URL` — OpenRouter base URL (defaults to `https://openrouter.ai/api/v1`)
- `VITE_OPENROUTER_VISION_MODEL` — Vision model identifier
- `VITE_OPENROUTER_TEXT_MODEL` — Text model identifier
- `VITE_SERPAPI_KEY` — Optional, for daily rashifal feature (has fallback data)
- `VITE_SERPAPI_BASE_URL` — SerpAPI base URL

### Design Decisions

- **No backend server:** Chosen for simplicity and privacy — all user data stays on-device. API keys are exposed client-side (acceptable for this use case with OpenRouter's referrer-based billing)
- **Custom navigation instead of React Router:** Enables native-app-like screen transitions with Framer Motion and supports Android hardware back button with "double-press to exit" logic
- **Strict AI safety prompts:** The system prompts explicitly prohibit fear-based, medical, legal, or financial predictions. AI responses are constrained to empowering, symbolic language
- **Image compression before upload:** Palm images are compressed to 800KB max with 1500px max dimension to reduce API costs and latency

## External Dependencies

### APIs
- **OpenRouter API** (`https://openrouter.ai/api/v1`) — Primary AI provider for both vision (palm analysis) and text (tarot, chat, horoscope) generation. Requires API key via `VITE_OPENROUTER_API_KEY`
- **SerpAPI** (`https://serpapi.com/search.json`) — Google Search scraping for daily Hindi horoscope (Rashifal). Optional — falls back to static data if unavailable. Note: direct browser calls may be blocked by CORS in production

### Key NPM Packages
- `react` / `react-dom` (18.x) — UI framework
- `framer-motion` (11.x) — Animation library
- `zustand` (4.x) — State management
- `idb-keyval` (6.x) — Simple IndexedDB wrapper
- `browser-image-compression` (2.x) — Client-side image compression
- `react-swipeable` (7.x) — Touch swipe gestures
- `date-fns` (3.x) — Date utilities
- `clsx` (2.x) — Conditional CSS class joining
- `react-intersection-observer` (9.x) — Lazy loading / visibility detection
- `vite-plugin-pwa` (0.19.x) — PWA service worker generation
- `tailwindcss` (3.x) — Utility CSS framework

### External Fonts
- **Inter** — Loaded from Google Fonts CDN, used as the primary sans-serif font