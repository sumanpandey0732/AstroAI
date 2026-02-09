import React from 'react';
import PropTypes from 'prop-types';

/**
 * 📦 CONTAINER COMPONENT
 * Wraps page content to ensure consistent padding and max-width.
 * Handles "Safe Area" for iPhones (Notch/Dynamic Island).
 */
const Container = ({ 
  children, 
  className = '', 
  hasBottomNav = true, // If true, adds extra padding at bottom
  fullHeight = false,  // If true, takes full screen height
  center = false       // If true, centers content (good for splash/login)
}) => {
  
  // Base styles
  const baseClasses = `
    w-full max-w-lg mx-auto px-4 sm:px-6
    relative z-10
  `;

  // Safe Area Padding (Top & Bottom)
  const safeAreaClasses = `
    pt-20 sm:pt-24 
    ${hasBottomNav ? 'pb-24 sm:pb-28' : 'pb-safe'}
  `;

  // Height & Alignment
  const layoutClasses = `
    ${fullHeight ? 'min-h-screen-safe flex flex-col' : ''}
    ${center ? 'justify-center items-center' : ''}
  `;

  return (
    <div className={`${baseClasses} ${safeAreaClasses} ${layoutClasses} ${className}`}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasBottomNav: PropTypes.bool,
  fullHeight: PropTypes.bool,
  center: PropTypes.bool,
};

export default Container;
