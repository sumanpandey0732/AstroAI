import React from 'react';
import { useNavigation } from '../../context/NavigationContext'; // Using existing context
import { HomeIcon, PalmIcon, TarotIcon, ChatIcon, ProfileIcon } from '../../assets/icons';

/**
 * 🧭 BOTTOM NAVIGATION BAR
 * The main navigation component for mobile view.
 * Fixed at the bottom with a glassmorphism effect.
 */
const BottomNav = () => {
  const { currentScreen, navigate } = useNavigation();

  // Navigation Items Configuration
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, screen: 'home' },
    { id: 'palm', label: 'Palm', icon: PalmIcon, screen: 'palm_scan' },
    { id: 'tarot', label: 'Tarot', icon: TarotIcon, screen: 'tarot' },
    { id: 'chat', label: 'Chat', icon: ChatIcon, screen: 'chat' },
    { id: 'profile', label: 'Profile', icon: ProfileIcon, screen: 'profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe pt-2 px-4 bg-midnight-950/90 backdrop-blur-xl border-t border-white/10 shadow-cosmic-lg rounded-t-2xl">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                // Haptic feedback
                if (navigator.vibrate) navigator.vibrate(10);
                navigate(item.screen);
              }}
              className={`
                relative flex flex-col items-center justify-center w-14 h-14 
                transition-all duration-300 ease-out group
              `}
            >
              {/* ✨ Active Glow Background */}
              {isActive && (
                <div className="absolute top-1 w-10 h-10 bg-cyan-500/20 rounded-full blur-lg animate-pulse" />
              )}

              {/* 🏠 Icon */}
              <div className={`relative transition-all duration-300 ${isActive ? 'scale-110 text-cyan-400 -translate-y-1' : 'text-gray-400 group-hover:text-gray-200'}`}>
                <item.icon filled={isActive} className="w-6 h-6" />
              </div>

              {/* 📝 Label */}
              <span className={`
                text-[10px] font-medium mt-1 transition-all duration-300
                ${isActive ? 'opacity-100 translate-y-0 text-cyan-400' : 'opacity-60 translate-y-1 scale-90'}
              `}>
                {item.label}
              </span>

              {/* 🔵 Active Indicator Dot */}
              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 bg-cyan-400 rounded-full shadow-glow-cyan" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
