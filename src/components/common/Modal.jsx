import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Button from './Button'; // Reusing our button component

/**
 * 🪟 REUSABLE MODAL COMPONENT
 * Uses React Portal to render outside the main DOM hierarchy.
 * Features: Glassmorphism, Entry Animations, Backdrop Blur.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md', // sm, md, lg, full
  closeOnBackdropClick = true,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 🔄 Handle Animation States
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to allow render before animating in
      requestAnimationFrame(() => setIsAnimating(true));
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
      }, 300); // Match this with CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ⌨️ Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isVisible) return null;

  // 📏 Size Classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    full: 'max-w-full h-full m-0 rounded-none',
  };

  // 🎨 Portal Content
  const modalContent = (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* 🌑 Backdrop (Blur & Darken) */}
      <div 
        className={`
          absolute inset-0 bg-midnight-950/60 backdrop-blur-md transition-opacity duration-300
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={closeOnBackdropClick ? onClose : undefined}
      />

      {/* 📦 Modal Container */}
      <div 
        className={`
          relative w-full ${sizeClasses[size]}
          bg-midnight-900/80 border border-white/10
          shadow-cosmic-lg backdrop-blur-xl
          rounded-2xl overflow-hidden
          flex flex-col max-h-[90vh]
          transform transition-all duration-300 ease-out-back
          ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
        `}
      >
        {/* 🏷️ Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-xl font-bold text-white tracking-wide text-glow">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close"
          >
            {/* Close Icon (Inline SVG) */}
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 📝 Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {children}
        </div>

        {/* 🦶 Footer (Optional) */}
        {footer && (
          <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Render into React Portal (attached to document.body)
  return createPortal(modalContent, document.body);
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
  closeOnBackdropClick: PropTypes.bool,
};

export default Modal;
