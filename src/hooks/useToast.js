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
  
  return {
    toasts: context.toasts,       // Array of active toasts
    showToast: context.showToast, // Function to trigger a toast
    removeToast: context.removeToast // Function to dismiss specific toast
  };
};

export default useToast;
