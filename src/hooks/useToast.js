/**
 * 🔔 useToast Hook
 * Provides a simple interface to show notification toasts anywhere in the app.
 * Example: const { showToast } = useToast();
 *          showToast('Saved successfully!', 'success');
 */

import { useContext } from 'react';
import ToastContext from '../context/ToastContext';

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};

export default useToast;
