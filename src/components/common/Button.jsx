import React from 'react';
import PropTypes from 'prop-types';

/**
 * 🔘 UNIVERSAL BUTTON COMPONENT
 * A premium, interactive button with support for variants, sizes, loading states, and icons.
 * Uses the cosmic theme defined in tailwind.config.js.
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  ...props
}) => {
  // ═══════════════════════════════════════════════════════════
  // 🎨 STYLE CONFIGURATION
  // ═══════════════════════════════════════════════════════════
  
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cosmic-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
  
  const variants = {
    // 🟣 Primary: Cosmic Gradient with Glow
    primary: `
      bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600
      text-white
      shadow-glow-md hover:shadow-glow-lg
      border border-transparent
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-purple-500
    `,
    
    // 🔵 Secondary: Glass/Outline style
    secondary: `
      bg-glass-white hover:bg-glass-purple
      text-white
      border border-white/20 hover:border-purple-400/50
      backdrop-blur-md
      shadow-glass hover:shadow-glow-sm
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-purple-400
    `,
    
    // 🌟 Cosmic: Darker, mysterious look
    cosmic: `
      bg-midnight-800 hover:bg-midnight-700
      text-cyan-400
      border border-cyan-500/30 hover:border-cyan-400/60
      shadow-glow-cyan-sm hover:shadow-glow-cyan-md
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-cyan-500
    `,
    
    // 👻 Ghost: Minimalist, just text with hover effect
    ghost: `
      bg-transparent hover:bg-white/10
      text-gray-300 hover:text-white
      border border-transparent
      focus:ring-gray-500
    `,

    // 🔴 Danger: For delete actions
    danger: `
      bg-red-600/80 hover:bg-red-600
      text-white
      border border-red-500
      shadow-lg hover:shadow-red-500/30
      focus:ring-red-500
    `
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
    md: "px-6 py-3 text-base rounded-xl gap-2",
    lg: "px-8 py-4 text-lg rounded-2xl gap-3 font-semibold tracking-wide",
    icon: "p-2 rounded-full", // For circular icon buttons
  };

  // ═══════════════════════════════════════════════════════════
  // ⚙️ LOGIC
  // ═══════════════════════════════════════════════════════════

  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;
  const widthStyles = fullWidth ? 'w-full' : '';

  // Haptic feedback trigger (if supported on mobile)
  const handleInteraction = (e) => {
    if (!disabled && !isLoading) {
      if (navigator.vibrate) navigator.vibrate(10); // Subtle click vibration
      if (onClick) onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${className}`}
      onClick={handleInteraction}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* ✨ Shimmer Effect Layer (Visible on Hover for Primary) */}
      {variant === 'primary' && !disabled && !isLoading && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      )}

      {/* 🔄 Loading Spinner */}
      {isLoading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="relative z-10">Processing...</span>
        </>
      ) : (
        /* 📦 Content Layout */
        <span className="relative z-10 flex items-center justify-center gap-2">
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'cosmic', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'icon']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
