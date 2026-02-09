import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * ⌨️ GLASS INPUT COMPONENT
 * A premium text input with floating labels, icons, and validation states.
 * Designed for Profile Setup and Chat interfaces.
 */
const Input = ({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder = '',
  error,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  disabled = false,
  required = false,
  className = '',
  autoComplete = 'off',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;

  // ═══════════════════════════════════════════════════════════
  // 🎨 STYLES
  // ═══════════════════════════════════════════════════════════

  // Container Classes
  const containerClasses = `
    relative w-full group transition-all duration-300
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  // Input Field Classes
  const inputClasses = `
    w-full bg-white/5 border 
    backdrop-blur-md
    text-white placeholder-transparent
    rounded-xl px-4 py-3.5
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-midnight-900
    disabled:bg-white/5 disabled:cursor-not-allowed
    
    ${Icon ? 'pl-11' : ''} 
    ${RightIcon ? 'pr-11' : ''}

    ${error 
      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30' 
      : 'border-white/10 hover:border-white/20 focus:border-cyan-500/50 focus:ring-cyan-500/20'
    }
  `;

  // Label Classes (Floating Animation)
  const labelClasses = `
    absolute left-4 
    transition-all duration-200 ease-out pointer-events-none
    ${Icon ? 'left-11' : ''}
    
    ${isFocused || hasValue 
      ? '-top-2.5 text-xs bg-midnight-900 px-1 text-cyan-400 font-medium' 
      : 'top-3.5 text-base text-gray-400'
    }

    ${error ? 'text-red-400' : ''}
  `;

  // Icon Classes
  const iconClasses = `
    absolute top-1/2 -translate-y-1/2 w-5 h-5 
    transition-colors duration-300
    ${isFocused ? 'text-cyan-400' : 'text-gray-500'}
    ${error ? 'text-red-400' : ''}
  `;

  // ═══════════════════════════════════════════════════════════
  // ⚙️ RENDER
  // ═══════════════════════════════════════════════════════════

  return (
    <div className={containerClasses}>
      
      {/* 🎭 Left Icon */}
      {Icon && (
        <div className={`left-4 ${iconClasses} pointer-events-none`}>
          <Icon />
        </div>
      )}

      {/* 📝 Input Field */}
      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder} // Required for floating label trick
        required={required}
        autoComplete={autoComplete}
        className={inputClasses}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {/* 🏷️ Floating Label */}
      {label && (
        <label htmlFor={id || name} className={labelClasses}>
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {/* 🎭 Right Icon (Actionable) */}
      {RightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          disabled={disabled}
          className={`
            absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
            hover:bg-white/10 active:scale-95 transition-all
            ${iconClasses.replace('left-4', '').replace('absolute', '')} 
            ${onRightIconClick ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'}
          `}
        >
          <RightIcon />
        </button>
      )}

      {/* ⚠️ Error Message */}
      {error && (
        <div className="absolute -bottom-5 left-1 text-xs text-red-400 animate-slide-in-top flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* ✨ Focus Glow Effect (Subtle) */}
      {isFocused && !error && (
        <div className="absolute inset-0 -z-10 bg-cyan-500/5 blur-lg rounded-xl transition-all duration-500" />
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.elementType,
  rightIcon: PropTypes.elementType,
  onRightIconClick: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default Input;
