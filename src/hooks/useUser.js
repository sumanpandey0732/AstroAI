import { useContext } from 'react';
import UserContext from '../context/UserContext';

/**
 * 👤 USE USER HOOK
 * Provides easy access to user data and actions.
 * Used in: ProfileSetup, Home, PalmScan, etc.
 */
const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within UserContext Provider');
  }

  const { user, history, updateProfile, addToHistory, resetUser, isLoading } = context;

  // 🔍 Check if profile is complete
  const isProfileComplete = () => {
    return !!(user?.name && user?.dob && user?.gender);
  };

  return {
    user,
    history,
    updateProfile,
    addToHistory,
    resetUser,
    isLoading,
    isProfileComplete,
  };
};

export { useUser };
export default useUser;
