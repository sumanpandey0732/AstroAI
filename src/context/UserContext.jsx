import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { getZodiacSign } from '../utils/zodiacUtils'; // Will be created in File 62

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // 👤 User Profile State
  const [user, setUser] = useState({
    name: '',
    gender: '',
    dob: '',         // YYYY-MM-DD
    tob: '',         // HH:mm
    zodiacSign: '',  // Calculated automatically
    isSetup: false,  // True if profile is complete
  });

  // 📜 History State
  const [history, setHistory] = useState({
    palm: [],
    tarot: [],
    chat: []
  });

  const [isLoading, setIsLoading] = useState(true);

  // 1. Load Data on Startup
  useEffect(() => {
    const initUser = async () => {
      try {
        // Load Profile
        const savedProfile = await storageService.user.get();
        if (savedProfile) {
          setUser(savedProfile);
        }

        // Load Histories
        const palmHistory = await storageService.history.get('palm');
        const tarotHistory = await storageService.history.get('tarot');
        const chatHistory = await storageService.history.get('chat');

        setHistory({
          palm: palmHistory || [],
          tarot: tarotHistory || [],
          chat: chatHistory || []
        });

      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initUser();
  }, []);

  // 2. Update Profile Function
  const updateProfile = async (data) => {
    try {
      // Calculate Zodiac if DOB is present
      let zodiac = user.zodiacSign;
      if (data.dob) {
        // Note: getZodiacSign will be available in utils later. 
        // If file 62 isn't made yet, this might error, but flow is correct.
        zodiac = getZodiacSign(data.dob); 
      }

      const updatedUser = {
        ...user,
        ...data,
        zodiacSign: zodiac,
        isSetup: true // Mark as setup complete
      };

      setUser(updatedUser);
      await storageService.user.save(updatedUser);
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  // 3. Add to History Function
  const addToHistory = async (type, record) => {
    // type: 'palm', 'tarot', 'chat'
    const newRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...record
    };

    // Update Local State
    setHistory(prev => ({
      ...prev,
      [type]: [newRecord, ...prev[type]]
    }));

    // Update Storage
    await storageService.history.add(type, newRecord);
  };

  // 4. Reset User (Logout/Clear Data)
  const resetUser = async () => {
    await storageService.resetApp();
    setUser({
      name: '',
      gender: '',
      dob: '',
      tob: '',
      zodiacSign: '',
      isSetup: false,
    });
    setHistory({ palm: [], tarot: [], chat: [] });
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        history, 
        updateProfile, 
        addToHistory, 
        resetUser, 
        isLoading 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
