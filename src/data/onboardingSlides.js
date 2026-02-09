/**
 * 🚀 ONBOARDING SLIDES DATA
 * Content for the initial tutorial screens.
 * Text keys refer to the translation files (en.js, hi.js, etc.)
 */

import { PalmIcon, TarotIcon, ChatIcon } from '../assets/icons'; // Importing SVGs for slides

export const onboardingSlides = [
  {
    id: 1,
    titleKey: 'onboarding.slide1_title', // "AI Palm Reading"
    descKey: 'onboarding.slide1_desc',   // "Scan your hand..."
    icon: PalmIcon,
    color: 'text-cyan-400',
    bgGlow: 'bg-cyan-500/20',
    image: '/images/onboarding/palm-scan.svg' // Placeholder path
  },
  {
    id: 2,
    titleKey: 'onboarding.slide2_title', // "Cosmic Guidance"
    descKey: 'onboarding.slide2_desc',   // "Get personalized Horoscope..."
    icon: TarotIcon,
    color: 'text-purple-400',
    bgGlow: 'bg-purple-500/20',
    image: '/images/onboarding/tarot-spread.svg'
  },
  {
    id: 3,
    titleKey: 'onboarding.slide3_title', // "Ask the Stars"
    descKey: 'onboarding.slide3_desc',   // "Chat with our spiritual AI..."
    icon: ChatIcon,
    color: 'text-pink-400',
    bgGlow: 'bg-pink-500/20',
    image: '/images/onboarding/astro-chat.svg'
  }
];
