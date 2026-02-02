import React, { createContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  // State to hold multiple toast messages (though usually we show one)
  const [toasts, setToasts] = useState([]);
  
  // Ref to generate unique IDs
  const toastId = useRef(0);

  /**
   * 🔔 Show a Toast Notification
   * @param {string} message - Text to display
   * @param {string} type - 'success', 'error', 'info', 'warning'
   * @param {number} duration - Time in ms (default 3000ms)
   */
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = toastId.current++;
    
    const newToast = { id, message, type };
    
    // Add to state
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    if (duration) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  /**
   * ❌ Remove a Toast manually
   */
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
