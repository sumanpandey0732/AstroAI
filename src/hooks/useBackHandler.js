/**
 * 🔙 useBackHandler Hook
 * Manages the Android Hardware Back Button behavior.
 * Implements "Double Back to Exit" logic on the Home Screen.
 */

import { useEffect, useRef } from 'react';
import { useNavigation } from './useNavigation';
import { useToast } from './useToast';

export const useBackHandler = (screenName) => {
  const { goBack, currentScreen, historyStack } = useNavigation();
  const { showToast } = useToast();
  
  // Ref to track the last time back was pressed
  const lastBackPressTime = useRef(0);

  useEffect(() => {
    // Function to handle the back event
    const handleBackPress = (event) => {
      // Logic only matters if we are essentially at the "root" of navigation history
      // or specifically on the Home screen.
      
      const isHome = currentScreen === 'HOME';
      const hasHistory = historyStack.length > 0;

      // If we have history (we are deep in the app), let standard navigation handle it.
      // The browser's popstate event usually handles the URL change, 
      // and our NavigationContext listens to that. 
      // So we primarily need to intercept when there is NO history left (App Exit scenario).
      
      if (!hasHistory || isHome) {
        // We are at the root. We want to prevent immediate exit and show toast.
        
        const now = Date.now();
        const timeDifference = now - lastBackPressTime.current;

        if (timeDifference < 2000) {
          // 🚪 User pressed back twice quickly -> Allow Exit
          // We don't prevent default here, letting the browser close the app/tab.
          return; 
        } else {
          // ⚠️ First Press -> Show Toast
          event.preventDefault(); // Stop browser from exiting immediately
          
          // Push a dummy state so the URL doesn't actually change/close yet
          window.history.pushState(null, '', window.location.pathname);
          
          showToast('Press back again to exit', 'info', 2000);
          lastBackPressTime.current = now;
        }
      }
    };

    // We can't directly listen to hardware button in web, 
    // but we can manipulate the History API to trap the back action.
    
    // Listen for the 'popstate' event (triggered when back button is pressed)
    window.addEventListener('popstate', handleBackPress);

    return () => {
      window.removeEventListener('popstate', handleBackPress);
    };
  }, [currentScreen, historyStack, goBack, showToast]);
};

export default useBackHandler;
