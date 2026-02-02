import React from 'react';

// We are importing these Providers before creating them.
// We will create them in the next steps (Files 40, 41, 42, 43).
import { NavigationProvider } from './NavigationContext';
import { UserProvider } from './UserContext';
import { LanguageProvider } from './LanguageContext';
import { ToastProvider } from './ToastContext';

/**
 * 🌳 App Provider Tree
 * Wraps the application in all necessary global state providers.
 * Order matters: Inner providers can use data from Outer providers.
 */
export const AppProvider = ({ children }) => {
  return (
    // 1. Language First (So generic text loads)
    <LanguageProvider>
      {/* 2. Toast (So errors can be shown anywhere) */}
      <ToastProvider>
        {/* 3. User Data (Profile, History) */}
        <UserProvider>
          {/* 4. Navigation (Needs User state to protect routes) */}
          <NavigationProvider>
            {children}
          </NavigationProvider>
        </UserProvider>
      </ToastProvider>
    </LanguageProvider>
  );
};

export default AppProvider;
