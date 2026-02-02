/**
 * 🎨 Color Palette
 * Defines the semantic color system for the Cosmic theme.
 */

export const colors = {
  // 🌌 Backgrounds
  background: {
    deep: '#0B0F19',      // Main App Background (Deep Space)
    card: '#111827',      // Card Background
    cardHover: '#1F2937', // Card Hover State
    modal: '#1F2937',     // Modals/Dialogs
    overlay: 'rgba(11, 15, 25, 0.85)', // Backdrop Blur Overlay
  },

  // 🔮 Primary Brand (Mystic Violet - Spirituality)
  primary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6', // Main Brand Color
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
    glow: 'rgba(139, 92, 246, 0.6)', // Glowing effect
  },

  // 🤖 Secondary Brand (Neon Cyan - AI/Technology)
  secondary: {
    main: '#06B6D4',
    light: '#67E8F9',
    dark: '#0891B2',
    glow: 'rgba(6, 182, 212, 0.6)',
  },

  // ✨ Accents (Gold/Pink)
  accent: {
    gold: '#F59E0B', // For Stars, Luck, Fortune
    goldGlow: 'rgba(245, 158, 11, 0.6)',
    love: '#EC4899', // For Relationship/Love readings
    loveGlow: 'rgba(236, 72, 153, 0.6)',
  },

  // 📝 Typography
  text: {
    primary: '#F3F4F6',   // High Emphasis (White-ish)
    secondary: '#D1D5DB', // Medium Emphasis (Light Gray)
    tertiary: '#9CA3AF',  // Low Emphasis (Gray)
    disabled: '#6B7280',  // Disabled text
  },

  // 🚦 Status Indicators
  status: {
    success: '#10B981', // Green
    error: '#EF4444',   // Red
    warning: '#F59E0B', // Orange
    info: '#3B82F6',    // Blue
  },

  // 🌈 Gradients (CSS Strings)
  gradients: {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #4C1D95 100%)',
    gold: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
    cosmic: 'linear-gradient(to bottom, #0B0F19 0%, #111827 100%)',
    love: 'linear-gradient(135deg, #F472B6 0%, #DB2777 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  }
};

export default colors;
