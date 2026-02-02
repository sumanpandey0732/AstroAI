import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useUser } from './UserContext';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  // Current active screen
  const [currentScreen, setCurrentScreen] = useState('SPLASH');
  
  // Data passed between screens (e.g., passing result to ResultScreen)
  const [screenParams, setScreenParams] = useState(null);
  
  // Internal history stack for "Back" logic
  const [historyStack, setHistoryStack] = useState([]);
  
  const { user, isLoading: isUserLoading } = useUser();

  /**
   * 🚀 Navigate to a new screen
   * @param {string} screenName - Target screen (e.g., 'HOME', 'TAROT')
   * @param {object} params - Optional data to pass
   */
  const navigate = useCallback((screenName, params = null) => {
    // Save current screen to history before moving, unless it's Splash
    if (currentScreen !== 'SPLASH') {
      setHistoryStack(prev => [...prev, currentScreen]);
      
      // Add to browser history so Android Back button works
      window.history.pushState({ screen: screenName }, '', `#${screenName.toLowerCase()}`);
    }

    setScreenParams(params);
    setCurrentScreen(screenName);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [currentScreen]);

  /**
   * 🔙 Go Back to previous screen
   */
  const goBack = useCallback(() => {
    if (historyStack.length > 0) {
      const prevScreen = historyStack[historyStack.length - 1];
      
      // Remove last item from stack
      setHistoryStack(prev => prev.slice(0, -1));
      
      setCurrentScreen(prevScreen);
      setScreenParams(null); // Clear params on back
      
      // Sync browser history
      // window.history.back(); // Optional, depends on desired behavior
    } else {
      // If stack is empty, we are at Home (or root).
      // Let the Exit logic handle this (in useBackHandler hook).
      console.log('Root screen reached');
    }
  }, [historyStack]);

  /**
   * 🧹 Reset Navigation (Go Home and clear history)
   */
  const resetNavigation = useCallback(() => {
    setHistoryStack([]);
    setCurrentScreen('HOME');
    setScreenParams(null);
    window.history.replaceState({ screen: 'HOME' }, '', '#home');
  }, []);

  // 🛡️ Auth Guard / Onboarding Flow
  useEffect(() => {
    // Wait for user data to load first
    if (isUserLoading) return;

    // Logic to decide initial screen
    const timer = setTimeout(() => {
      if (!user.isSetup) {
        // New User -> Language -> Onboarding
        if (currentScreen === 'SPLASH') {
          // We don't navigate yet, Splash screen handles its own timeout usually,
          // but we prepare the state here if needed.
        }
      } else {
        // Returning User -> Home
        if (currentScreen === 'SPLASH') {
           navigate('HOME'); 
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user.isSetup, isUserLoading]);

  // 🎧 Listen to Browser Back Button
  useEffect(() => {
    const handlePopState = (event) => {
      // If user presses browser back button, handle internal state
      if (historyStack.length > 0) {
        // We manually sync state
        const prevScreen = historyStack[historyStack.length - 1];
        setHistoryStack(prev => prev.slice(0, -1));
        setCurrentScreen(prevScreen);
      } else {
        // If nothing in stack, let browser close app or stay
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [historyStack]);

  return (
    <NavigationContext.Provider 
      value={{ 
        currentScreen, 
        navigate, 
        goBack, 
        resetNavigation, 
        screenParams,
        historyStack 
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
