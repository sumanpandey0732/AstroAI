/**
 * 📱 usePWA Hook
 * Manages the "Add to Home Screen" (A2HS) installation flow.
 * Allows creating a custom Install button inside the app.
 */

import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Check if already installed
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOS = window.navigator.standalone === true;
      setIsInstalled(isStandalone || isIOS);
    };

    checkIfInstalled();

    // 2. Listen for 'beforeinstallprompt' event
    // This fires on Android/Desktop Chrome when app meets PWA criteria
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      console.log('📲 App is installable');
    };

    // 3. Listen for successful installation
    const handleAppInstalled = () => {
      console.log('✅ App installed successfully');
      setIsInstallable(false);
      setDeferredPrompt(null);
      setIsInstalled(true);
      
      // Optionally save to analytics or storage
      storageService.settings.saveTheme(true); // Example usage
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  /**
   * 🚀 Trigger the installation prompt
   */
  const installApp = useCallback(async () => {
    if (!deferredPrompt) {
      console.log('❌ Installation prompt not available');
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsInstallable(false);
  }, [deferredPrompt]);

  return {
    isInstallable, // Show "Install" button if true
    isInstalled,   // True if running as PWA
    installApp     // Function to call on button click
  };
};

export default usePWA;
