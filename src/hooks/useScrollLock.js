/**
 * 🔒 useScrollLock Hook
 * Prevents the background body from scrolling when a Modal/Overlay is open.
 * Essential for mobile-friendly UI.
 */

import { useCallback, useLayoutEffect } from 'react';

export const useScrollLock = () => {
  
  // Use useLayoutEffect to prevent visual jitter
  const lockScroll = useCallback(() => {
    // 1. Get the current scroll width to prevent layout shift
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    
    // 2. Add styles to body
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.touchAction = 'none'; // Disables touch scroll on mobile
  }, []);

  const unlockScroll = useCallback(() => {
    // 3. Remove styles
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.style.touchAction = '';
  }, []);

  return { lockScroll, unlockScroll };
};

// Specialized Hook that auto-locks when component mounts
export const useAutoScrollLock = (isLocked) => {
  const { lockScroll, unlockScroll } = useScrollLock();

  useLayoutEffect(() => {
    if (isLocked) {
      lockScroll();
    } else {
      unlockScroll();
    }

    // Cleanup: Always unlock when component disappears
    return () => {
      unlockScroll();
    };
  }, [isLocked, lockScroll, unlockScroll]);
};

export default useScrollLock;
