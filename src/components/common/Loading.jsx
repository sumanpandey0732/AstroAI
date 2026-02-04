import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * 🌀 SPINNER COMPONENT (Small)
 * Use this inside buttons or cards.
 */
export const Spinner = ({ size = 'md', color = 'text-cyan-400', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <svg 
      className={`animate-spin ${sizeClasses[size]} ${color} ${className}`} 
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
  );
};

/**
 * 🌌 LOADING OVERLAY (Full Screen)
 * Use this for API calls (Palm Scan, AI Chat) to keep user engaged.
 * It cycles through cosmic messages.
 */
export const LoadingScreen = ({ 
  message = "Loading...", 
  fullScreen = true,
  transparent = false 
}) => {
  
  // Dynamic messages to keep user entertained
  const loadingMessages = [
    "Consulting the stars...",
    "Aligning cosmic energy...",
    "Reading the patterns...",
    "Connecting with the universe...",
    "Deciphering your destiny...",
    "Gazing into the void...",
  ];

  const [currentMessage, setCurrentMessage] = useState(message);

  // Cycle through messages every 2 seconds
  useEffect(() => {
    if (message !== "Loading...") return; // Use custom message if provided

    const interval = setInterval(() => {
      const randomMsg = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
      setCurrentMessage(randomMsg);
    }, 2500);

    return () => clearInterval(interval);
  }, [message]);

  const wrapperClasses = fullScreen 
    ? 'fixed inset-0 z-[100] h-screen w-screen' 
    : 'absolute inset-0 z-50 h-full w-full rounded-2xl';

  const bgClasses = transparent
    ? 'bg-midnight-950/50 backdrop-blur-sm'
    : 'bg-midnight-950/90 backdrop-blur-md';

  return (
    <div className={`${wrapperClasses} ${bgClasses} flex flex-col items-center justify-center`}>
      {/* 🌀 Animation Container */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Glow Ring */}
        <div className="absolute w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
        
        {/* Rotating Rings */}
        <div className="w-24 h-24 border-4 border-transparent border-t-cyan-400 border-b-purple-500 rounded-full animate-spin" />
        <div className="absolute w-16 h-16 border-4 border-transparent border-l-pink-400 border-r-indigo-400 rounded-full animate-spin-reverse" />
        
        {/* Center Orb */}
        <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
      </div>

      {/* 📝 Text */}
      <div className="text-center space-y-2 px-4">
        <h3 className="text-xl font-bold text-white tracking-wide animate-pulse">
          {currentMessage}
        </h3>
        <p className="text-sm text-cyan-300/80">
          Please wait a moment
        </p>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.string,
  className: PropTypes.string,
};

LoadingScreen.propTypes = {
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
  transparent: PropTypes.bool,
};

export default LoadingScreen;
