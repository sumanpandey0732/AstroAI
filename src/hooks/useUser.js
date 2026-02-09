import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

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

  const { user, setUser } = context;

  // 💾 Update User Profile
  const updateUserProfile = (profileData) => {
    const updatedUser = {
      ...user,
      ...profileData,
      updatedAt: new Date().toISOString(),
    };
    setUser(updatedUser);
    localStorage.setItem('astroai_user', JSON.stringify(updatedUser));
  };

  // ✅ Mark Onboarding Complete
  const completeOnboarding = () => {
    updateUserProfile({ hasCompletedOnboarding: true });
  };

  // 🗑️ Delete User Data
  const deleteUserData = () => {
    setUser(null);
    localStorage.removeItem('astroai_user');
    localStorage.removeItem('astroai_disclaimer_accepted');
    localStorage.removeItem('astroai_chat_history');
  };

  // 🔍 Check if profile is complete
  const isProfileComplete = () => {
    return !!(user?.name && user?.dob && user?.gender);
  };

  return {
    user,
    updateUserProfile,
    completeOnboarding,
    deleteUserData,
    isProfileComplete,
  };
};

export { useUser };
export default useUser;
