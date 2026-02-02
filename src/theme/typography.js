/**
 * 📝 Typography System
 * Defines font families, sizes, weights, and line heights.
 * Uses 'Inter' as the primary font (loaded in index.html).
 */

export const typography = {
  fontFamily: {
    primary: "'Inter', system-ui, -apple-system, sans-serif",
  },

  // 📏 Font Sizes (in rem)
  // 1rem = 16px usually
  size: {
    xs: '0.75rem',    // 12px - Captions
    sm: '0.875rem',   // 14px - Secondary text
    base: '1rem',     // 16px - Body text
    lg: '1.125rem',   // 18px - Subtitles
    xl: '1.25rem',    // 20px - Card Titles
    '2xl': '1.5rem',  // 24px - Section Headers
    '3xl': '1.875rem',// 30px - Main Titles
    '4xl': '2.25rem', // 36px - Hero Text
  },

  // 🏋️ Font Weights
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // 📐 Line Heights (Leading)
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // ↔️ Letter Spacing (Tracking)
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em', // Good for uppercase captions
  }
};

export default typography;
