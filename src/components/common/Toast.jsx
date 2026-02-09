import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useToast } from '../../hooks/useToast'; // Consuming the hook we created earlier

/**
 * 🍞 TOAST NOTIFICATION COMPONENT
 * Displays temporary messages (Success, Error, Info) at the bottom of the screen.
 * Managed globally via Context.
 */
const Toast = () => {
  const { toast, hideToast } = useToast(); // Get current toast state
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  // 🔄 Handle Visibility Animation
  useEffect(() => {
    if (toast) {
      setIsVisible(true);
      setIsLeaving(false);
    } else {
      setIsLeaving(true);
      const timer = setTimeout(() => setIsVisible(false), 300); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!isVisible && !toast) return null;

  // Use current toast data or keep showing old data during exit animation
  const activeToast = toast || { type: 'info', message: '' };

  // 🎨 Style Configuration based on Type
  const styles = {
    success: {
      bg: 'bg-midnight-900/90 border-green-500/30',
      iconBg: 'bg-green-500/20 text-green-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    error: {
      bg: 'bg-midnight-900/90 border-red-500/30',
      iconBg: 'bg-red-500/20 text-red-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    },
    info: {
      bg: 'bg-midnight-900/90 border-cyan-500/30',
      iconBg: 'bg-cyan-500/20 text-cyan-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    warning: {
      bg: 'bg-midnight-900/90 border-amber-500/30',
      iconBg: 'bg-amber-500/20 text-amber-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  };

  const currentStyle = styles[activeToast.type] || styles.info;

  return (
    <div 
      className="fixed bottom-20 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none"
    >
      <div 
        className={`
          relative flex items-center gap-3 px-4 py-3 rounded-xl 
          border backdrop-blur-xl shadow-lg shadow-black/50
          max-w-sm w-full pointer-events-auto cursor-pointer
          transform transition-all duration-300 ease-spring
          ${isLeaving ? 'translate-y-10 opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'}
          ${currentStyle.bg}
        `}
        onClick={hideToast} // Click to dismiss
        role="alert"
      >
        {/* ✨ Glow Effect behind toast */}
        <div className={`absolute inset-0 rounded-xl blur-lg opacity-20 -z-10 ${currentStyle.bg.split(' ')[1].replace('/30', '/50')}`} />

        {/* 🔔 Icon */}
        <div className={`p-1.5 rounded-full shrink-0 ${currentStyle.iconBg}`}>
          {currentStyle.icon}
        </div>

        {/* 📝 Message */}
        <p className="text-sm font-medium text-white/90 grow">
          {activeToast.message}
        </p>

        {/* ❌ Close Button (Optional, visual cue) */}
        <button 
          onClick={(e) => { e.stopPropagation(); hideToast(); }}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ⏳ Progress Bar (Visualizing timeout) */}
        {!isLeaving && (
          <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full ${currentStyle.iconBg.split(' ')[1]} animate-[progress_3s_linear_forwards]`} 
              style={{ animationDuration: '3000ms' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Toast;
