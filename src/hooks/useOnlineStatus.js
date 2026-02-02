/**
 * 📡 useOnlineStatus Hook
 * Monitors network connectivity.
 * Returns true if online, false if offline.
 */

import { useState, useEffect } from 'react';

export const useOnlineStatus = () => {
  // Check initial status
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Handlers
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
