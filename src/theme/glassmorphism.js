/**
 * 💎 Glassmorphism Utilities
 * Helper functions to generate glass-effect styles dynamically.
 */

import { colors } from './colors';

export const glassmorphism = {
  /**
   * Generates a standard glass card style
   * @param {string} opacity - Background opacity (0.1 to 1)
   * @param {string} blur - Blur amount in px
   */
  card: (opacity = 0.7, blur = 12) => ({
    background: `rgba(17, 24, 39, ${opacity})`, // Based on 'cosmic.800'
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
  }),

  /**
   * Generates a lighter glass style for overlays/modals
   */
  overlay: {
    background: 'rgba(11, 15, 25, 0.6)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
  },

  /**
   * Input field glass style
   */
  input: {
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
  },

  /**
   * Active/Selected state glass style
   */
  active: {
    background: 'rgba(139, 92, 246, 0.2)', // Purple tint
    border: '1px solid rgba(139, 92, 246, 0.4)',
    boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)',
  }
};

export default glassmorphism;
