import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage'; // Using language hook for translations
import GlassCard from './GlassCard';
import Button from './Button';

/**
 * ⚠️ DISCLAIMER COMPONENT
 * Mandatory for Play Store policy compliance.
 * Shows a warning that the app is for entertainment purposes only.
 * Appears once until accepted, or can be embedded in footer.
 */
const Disclaimer = ({ type = 'modal' }) => { // 'modal' (popup) or 'inline' (footer text)
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  // Check if user has already accepted the disclaimer
  useEffect(() => {
    if (type === 'modal') {
      const accepted = localStorage.getItem('astroai_disclaimer_accepted');
      if (!accepted) {
        // Delay slightly to not overwhelm user immediately on load
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [type]);

  // Handle Acceptance
  const handleAccept = () => {
    localStorage.setItem('astroai_disclaimer_accepted', 'true');
    setIsVisible(false);
  };

  // ═══════════════════════════════════════════════════════════
  // 🟢 INLINE MODE (Footer Text)
  // ═══════════════════════════════════════════════════════════
  if (type === 'inline') {
    return (
      <div className="py-6 px-4 text-center border-t border-white/5 mt-8 bg-black/20">
        <p className="text-[10px] text-gray-500 max-w-sm mx-auto leading-relaxed">
          {t('disclaimer.text')}
        </p>
        <p className="text-[10px] text-gray-600 mt-2">
          © {new Date().getFullYear()} AstroAI. All rights reserved.
        </p>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // 🛑 MODAL MODE (Popup)
  // ═══════════════════════════════════════════════════════════
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
      
      {/* Dark Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300" />

      {/* Modal Content */}
      <div className="relative w-full max-w-md animate-slide-in-bottom">
        <GlassCard 
          variant="dark" 
          className="p-6 border-t-4 border-t-amber-500" // Warning color accent
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-500/10 rounded-full text-amber-500 border border-amber-500/20">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-center text-white mb-2">
            Important Notice
          </h3>

          {/* Text */}
          <p className="text-sm text-gray-300 text-center leading-relaxed mb-6">
            {t('disclaimer.text')}
          </p>

          {/* Button */}
          <Button 
            onClick={handleAccept}
            fullWidth
            variant="secondary"
            className="border-amber-500/30 hover:bg-amber-500/10 text-amber-400"
          >
            {t('disclaimer.accept')}
          </Button>
        </GlassCard>
      </div>
    </div>
  );
};

export default Disclaimer;
