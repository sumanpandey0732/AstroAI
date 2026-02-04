import React, { useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * 🎬 PAGE TRANSITION COMPONENT
 * Wraps every screen to provide smooth entry animations and scroll management.
 * This makes the PWA feel like a native mobile app.
 */
const PageTransition = ({ 
  children, 
  variant = 'fade', // 'fade' | 'slideUp' | 'slideRight' | 'scale'
  className = '' 
}) => {

  // ═══════════════════════════════════════════════════════════
  // 📜 SCROLL MANAGEMENT
  // ═══════════════════════════════════════════════════════════
  // When a new screen mounts, we instantly scroll to the top.
  // We use useLayoutEffect to do this BEFORE the paint, so user doesn't see a jump.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ═══════════════════════════════════════════════════════════
  // 🎨 ANIMATION CONFIGURATION
  // ═══════════════════════════════════════════════════════════
  // These rely on the keyframes defined in your tailwind.config.js
  
  const variants = {
    // 🌫️ Fade In (Default) - Subtle and clean
    fade: 'animate-fade-in',
    
    // ⬆️ Slide Up - Great for details pages or "opening" something
    slideUp: 'animate-slide-in-bottom',
    
    // ➡️ Slide Right - Standard navigation feel
    slideRight: 'animate-fade-in-right',
    
    // 🔍 Scale - Popping effect (like opening an app)
    scale: 'animate-scale-in'
  };

  const selectedAnimation = variants[variant] || variants.fade;

  // ═══════════════════════════════════════════════════════════
  // ⚙️ RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <div 
      className={`
        w-full 
        min-h-screen-safe 
        ${selectedAnimation} 
        will-change-transform 
        backface-hidden
        ${className}
      `}
      // Accessibility: Tells screen readers main content has changed
      role="main"
      aria-live="polite"
    >
      {children}
    </div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['fade', 'slideUp', 'slideRight', 'scale']),
  className: PropTypes.string,
};

export default PageTransition;
