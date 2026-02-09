import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useClickOutside } from '../../hooks/useClickOutside'; // Assuming you might have this hook, or we implement logic here

/**
 * 🔽 CUSTOM SELECT DROPDOWN
 * A premium dropdown component with glassmorphism, animations, and icon support.
 * Replaces the ugly native <select> element.
 */
const Select = ({
  label,
  options = [], // Array of { value, label, icon }
  value,
  onChange,
  placeholder = 'Select an option',
  error,
  icon: Icon,
  disabled = false,
  className = '',
  searchable = false, // Allows filtering options
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const dropdownRef = useRef(null);

  // 🖱️ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🔍 Find selected option object
  const selectedOption = options.find(opt => opt.value === value);

  // 🔎 Filter options if searchable
  const filteredOptions = searchable 
    ? options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  // 🎯 Handle Selection
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(5);
  };

  // ═══════════════════════════════════════════════════════════
  // 🎨 STYLES
  // ═══════════════════════════════════════════════════════════

  const containerClasses = `
    relative w-full group transition-all duration-300
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  const triggerClasses = `
    w-full bg-white/5 border 
    backdrop-blur-md
    text-white text-left
    rounded-xl px-4 py-3.5
    flex items-center justify-between
    transition-all duration-300 ease-out
    cursor-pointer
    
    ${Icon ? 'pl-11' : ''}
    
    ${error 
      ? 'border-red-500/50 focus:border-red-500' 
      : isOpen 
        ? 'border-cyan-500/50 ring-2 ring-cyan-500/20' 
        : 'border-white/10 hover:border-white/20'
    }
  `;

  const labelClasses = `
    absolute left-4 
    transition-all duration-200 ease-out pointer-events-none
    ${Icon ? 'left-11' : ''}
    
    ${isFocused || isOpen || value 
      ? '-top-2.5 text-xs bg-midnight-900 px-1 text-cyan-400 font-medium' 
      : 'top-3.5 text-base text-gray-400'
    }

    ${error ? 'text-red-400' : ''}
  `;

  return (
    <div className={containerClasses} ref={dropdownRef}>
      
      {/* 🏷️ Label */}
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}

      {/* 🎭 Left Icon */}
      {Icon && (
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors ${isOpen ? 'text-cyan-400' : 'text-gray-500'}`}>
          <Icon />
        </div>
      )}

      {/* 🔘 Trigger Button (The box you click) */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={triggerClasses}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span className={selectedOption ? 'text-white' : 'text-transparent'}>
          {selectedOption ? (
            <span className="flex items-center gap-2">
              {selectedOption.icon && <span className="text-lg">{selectedOption.icon}</span>}
              {selectedOption.label}
            </span>
          ) : (
            placeholder
          )}
        </span>

        {/* 🔽 Arrow Icon */}
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 📂 Dropdown Menu (The list) */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-midnight-900/95 border border-white/10 rounded-xl shadow-cosmic-lg backdrop-blur-xl overflow-hidden animate-scale-in origin-top">
          
          {/* 🔍 Search Input (Optional) */}
          {searchable && (
            <div className="p-2 border-b border-white/5">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* 📋 Options List */}
          <div className="max-h-60 overflow-y-auto scrollbar-thin py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full text-left px-4 py-3 text-sm flex items-center gap-3
                    transition-colors duration-200
                    ${option.value === value 
                      ? 'bg-cyan-500/20 text-cyan-400 font-medium' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  {/* Option Icon (e.g., Zodiac Symbol) */}
                  {option.icon && (
                    <span className="text-lg opacity-80">{option.icon}</span>
                  )}
                  
                  {option.label}

                  {/* Checkmark for selected item */}
                  {option.value === value && (
                    <svg className="w-4 h-4 ml-auto text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options found
              </div>
            )}
          </div>
        </div>
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
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
  })).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.elementType,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  searchable: PropTypes.bool,
};

export default Select;
