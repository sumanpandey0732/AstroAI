import React from 'react';

/**
 * 🌌 COSMIC ICON SET
 * Custom designed SVG icons with glow effects and gradient support.
 * Usage: <Icons.Home className="w-6 h-6 text-cyan-400" />
 */

// 🏠 Home Icon (Cosmic Temple)
export const HomeIcon = ({ className = "w-6 h-6", filled = false }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M3 10L12 3L21 10V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10Z" 
      stroke="currentColor" 
      strokeWidth={filled ? "0" : "1.5"} 
      fill={filled ? "currentColor" : "none"}
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {filled && <path d="M9 21V15H15V21" fill="rgba(0,0,0,0.3)" />}
    {!filled && <path d="M12 8V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
  </svg>
);

// 🖐️ Palm Icon (Mystic Hand)
export const PalmIcon = ({ className = "w-6 h-6", filled = false }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 2C10.8954 2 10 2.89543 10 4V11H9C7.89543 11 7 11.8954 7 13V18C7 19.6569 8.34315 21 10 21H14C15.6569 21 17 19.6569 17 18V9C17 7.89543 16.1046 7 15 7C14.8877 7 14.7782 7.00928 14.6725 7.02704C14.4251 5.86737 13.3484 5 12 5V4C12 2.89543 12 2 12 2Z" 
      stroke="currentColor" 
      strokeWidth={filled ? "0" : "1.5"} 
      fill={filled ? "currentColor" : "none"}
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path d="M10 14C10 14 11 15 12 15C13 15 14 14 14 14" stroke={filled ? "rgba(0,0,0,0.5)" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" />
    {!filled && <circle cx="12" cy="18" r="1" fill="currentColor" />}
  </svg>
);

// ✨ Tarot Icon (Magic Cards)
export const TarotIcon = ({ className = "w-6 h-6", filled = false }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect 
      x="7" y="5" width="10" height="14" rx="2" 
      stroke="currentColor" 
      strokeWidth={filled ? "0" : "1.5"} 
      fill={filled ? "currentColor" : "none"}
    />
    <path 
      d="M5 7L7 5M19 5L17 7M7 19L5 17M17 19L19 17" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      className={filled ? "opacity-50" : ""}
    />
    <path d="M12 10L10 12L12 14L14 12L12 10Z" fill={filled ? "rgba(0,0,0,0.3)" : "currentColor"} />
  </svg>
);

// 💬 Chat Icon (Cosmic Message)
export const ChatIcon = ({ className = "w-6 h-6", filled = false }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 14.195 3.78652 16.208 5.09341 17.7979L4 21L7.54589 20.2908C8.88726 20.7495 10.4077 21 12 21Z" 
      stroke="currentColor" 
      strokeWidth={filled ? "0" : "1.5"} 
      fill={filled ? "currentColor" : "none"}
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path d="M8 12H8.01" stroke={filled ? "rgba(0,0,0,0.5)" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 12H12.01" stroke={filled ? "rgba(0,0,0,0.5)" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 12H16.01" stroke={filled ? "rgba(0,0,0,0.5)" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 👤 Profile Icon (User Soul)
export const ProfileIcon = ({ className = "w-6 h-6", filled = false }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="12" cy="7" r="4" 
      stroke="currentColor" 
      strokeWidth={filled ? "0" : "1.5"} 
      fill={filled ? "currentColor" : "none"}
    />
    <path 
      d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={filled ? "opacity-50" : ""}
    />
  </svg>
);

// 🔙 Back Icon
export const BackIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ⚙️ Settings Icon
export const SettingsIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15A1.65 1.65 0 0021 12 1.65 1.65 0 0019.4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
