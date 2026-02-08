import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useUser } from '../../hooks/useUser';
import { useLanguage } from '../../hooks/useLanguage';
import { SettingsIcon } from '../../assets/icons'; // Using our custom icons
import { getTimeBasedGreeting } from '../../utils/dateUtils'; // Helper we created earlier

/**
 * 🔝 APP HEADER COMPONENT
 * Displays greeting, user profile status, and quick actions.
 * Changes appearance on scroll (transparency -> glass).
 */
const Header = () => {
  const { navigate } = useNavigation();
  const { user } = useUser(); // Access user profile
  const { t } = useLanguage(); // Access translations
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [greetingKey, setGreetingKey] = useState('greeting_morning');

  // 🖱️ Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls down > 10px, activate glass effect
      setIsScrolled(window.scrollY > 10);
    };

    // Set initial greeting based on time
    setGreetingKey(getTimeBasedGreeting());

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Base styles
  const baseStyles = `
    fixed top-0 left-0 right-0 z-40 
    px-4 pt-safe pb-3
    transition-all duration-300 ease-in-out
  `;

  // Dynamic styles based on scroll state
  const scrollStyles = isScrolled
    ? 'bg-midnight-950/80 backdrop-blur-xl border-b border-white/5 shadow-glass-sm py-3'
    : 'bg-transparent py-4';

  return (
    <header className={`${baseStyles} ${scrollStyles}`}>
      <div className="max-w-lg mx-auto flex items-center justify-between">
        
        {/* 👤 User Greeting Section */}
        <div className="flex flex-col">
          {/* Greeting (Good Morning...) */}
          <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider opacity-80 animate-fade-in">
            {t(`common.${greetingKey}`)}
          </span>
          
          {/* User Name or Default App Name */}
          <h1 className="text-xl font-bold text-white leading-tight truncate max-w-[200px] text-glow-white">
            {user?.name ? (
              // If user has a name, show it
              <span className="capitalize">{user.name}</span>
            ) : (
              // Else show 'Guest' or 'Stargazer'
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Stargazer
              </span>
            )}
          </h1>
        </div>

        {/* ⚙️ Action Buttons (Right Side) */}
        <div className="flex items-center gap-2">
          
          {/* Settings Button */}
          <button
            onClick={() => {
              // Haptic feedback
              if (navigator.vibrate) navigator.vibrate(10);
              navigate('settings');
            }}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all duration-200 border border-white/10 shadow-glass-sm group"
            aria-label="Settings"
          >
            <SettingsIcon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
          </button>

          {/* Optional: Add Coin/Credit Balance here later if needed */}
          {/* <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
            💎 PRO
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
