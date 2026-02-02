/**
 * 🧭 useNavigation Hook
 * A simple wrapper around NavigationContext.
 * Makes navigating between screens easier.
 */

import { useContext } from 'react';
import NavigationContext from '../context/NavigationContext';

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  
  return context;
};

// Also export the default for flexibility
export default useNavigation;
