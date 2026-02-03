/**
 * 📳 useVibration Hook
 * Provides haptic feedback patterns for better UX.
 * Safe to use on devices that don't support vibration.
 */

import { useCallback } from 'react';

export const useVibration = () => {
  
  /**
   * Check if device supports vibration
   */
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  /**
   * Trigger a vibration pattern
   * @param {string|number|number[]} pattern - 'light', 'medium', 'heavy', 'success', 'error' or ms array
   */
  const vibrate = useCallback((pattern = 'light') => {
    if (!isSupported) return;

    try {
      switch (pattern) {
        case 'light':
        case 'click':
          // Short, sharp tick (good for buttons)
          navigator.vibrate(10); 
          break;
          
        case 'medium':
        case 'select':
          // Noticeable bump (good for selecting cards)
          navigator.vibrate(20);
          break;
          
        case 'heavy':
        case 'confirm':
          // Strong thud (good for main actions)
          navigator.vibrate(50);
          break;

        case 'success':
          // Double buzz (Da-dum!)
          navigator.vibrate([30, 50, 30]);
          break;

        case 'error':
        case 'warning':
          // Long shake (Bzzzzzz)
          navigator.vibrate([50, 50, 50, 50, 100]);
          break;

        default:
          // Custom pattern handling
          if (typeof pattern === 'number' || Array.isArray(pattern)) {
            navigator.vibrate(pattern);
          }
      }
    } catch (e) {
      // Some browsers (like iOS Safari) block vibration without user interaction
      // We silently fail to avoid crashing
      console.warn('Vibration failed', e);
    }
  }, [isSupported]);

  return { vibrate, isSupported };
};

export default useVibration;
