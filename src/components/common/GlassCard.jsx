import React from 'react';
import PropTypes from 'prop-types';

/**
 * 🪟 GLASS CARD COMPONENT
 * A premium container component implementing the Glassmorphism design language.
 * Features frosted glass effect, subtle borders, and interactive hover states.
 */
const GlassCard = ({
  children,
  className = '',
  variant = 'default',
  hoverEffect = false,
  interactive = false,
  onClick,
  ...props
}) => {
  // ═══════════════════════════════════════════════════════════
  // 🎨 STYLE CONFIGURATION
  // ═══════════════════════════════════════════════════════════

  // Base styles applied to all cards
  const baseStyles = `
    relative 
    overflow-hidden 
    rounded-2xl 
    backdrop-blur-xl 
    transition-all 
    duration-300 
    ease-out
  `;

  // Variants controlling background opacity and tint
  const variants = {
    // ⚪ Default: Standard frosted glass
    default: `
      bg-white/10 
      border border-white/10 
      shadow-glass
    `,
    
    // ⚫ Dark: Deeper background for better text readability
    dark: `
      bg-black/30 
      border border-white/5 
      shadow-glass-sm
    `,
    
    // 🟣 Cosmic: Purple/Blue tint for primary features
    cosmic: `
      bg-gradient-to-br from-indigo-900/40 to-purple-900/40 
      border border-purple-500/20 
      shadow-cosmic
    `,
    
    // 🔵 Highlight: Cyan/Blue tint for active items
    highlight: `
      bg-cyan-900/20 
      border border-cyan-500/30 
      shadow-glow-cyan-sm
    `,

    // ✨ Gold: For premium/paid features
    gold: `
      bg-amber-900/20
      border border-amber-500/30
      shadow-[0_0_15px_rgba(245,158,11,0.2)]
    `
  };

  // Hover animations (only applied if hoverEffect is true)
  const hoverStyles = hoverEffect || interactive ? `
    hover:scale-[1.02] 
    hover:bg-white/15 
    hover:border-white/20 
    hover:shadow-glow-md
    active:scale-[0.98]
    cursor-pointer
  ` : '';

  // ═══════════════════════════════════════════════════════════
  // ⚙️ RENDER LOGIC
  // ═══════════════════════════════════════════════════════════

  // Combine all classes
  const appliedClasses = `
    ${baseStyles}
    ${variants[variant] || variants.default}
    ${hoverStyles}
    ${className}
  `.trim().replace(/\s+/g, ' '); // Clean up extra spaces

  // Handle click only if an onClick handler is provided
  const handleClick = (e) => {
    if (onClick && !props.disabled) {
      // Trigger subtle vibration on mobile if supported
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(5);
      }
      onClick(e);
    }
  };

  return (
    <div
      className={appliedClasses}
      onClick={interactive || onClick ? handleClick : undefined}
      role={interactive || onClick ? 'button' : 'region'}
      tabIndex={interactive || onClick ? 0 : undefined}
      {...props}
    >
      {/* 
        💡 Optional: Inner Glow Gradient 
        Adds a subtle spotlight effect at the top-left corner
      */}
      <div 
        className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      {/* 📦 Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'dark', 'cosmic', 'highlight', 'gold']),
  hoverEffect: PropTypes.bool,
  interactive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default GlassCard;
