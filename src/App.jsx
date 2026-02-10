import React, { Suspense, lazy } from 'react';
import { AppProvider } from './context/AppProvider';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import LoadingScreen from './components/common/Loading';
import Toast from './components/common/Toast';

// ⏳ Lazy Load Screens (Correct Paths)
const SplashScreen = lazy(() => import('./components/screens/SplashScreen'));
const LanguageScreen = lazy(() => import('./components/screens/LanguageScreen'));
const OnboardingScreen = lazy(() => import('./components/screens/OnboardingScreen'));
const ProfileSetupScreen = lazy(() => import('./components/screens/ProfileSetupScreen'));
const HomeScreen = lazy(() => import('./components/screens/HomeScreen'));
const PalmScanScreen = lazy(() => import('./components/screens/PalmScanScreen'));
const PalmResultScreen = lazy(() => import('./components/screens/PalmResultScreen'));
const TarotScreen = lazy(() => import('./components/screens/TarotScreen'));
const TarotReadingScreen = lazy(() => import('./components/screens/TarotReadingScreen'));
const HoroscopeScreen = lazy(() => import('./components/screens/HoroscopeScreen'));
const HoroscopeDetailScreen = lazy(() => import('./components/screens/HoroscopeDetailScreen'));
const RashifalScreen = lazy(() => import('./components/screens/RashifalScreen'));
const ChatScreen = lazy(() => import('./components/screens/ChatScreen'));
const SettingsScreen = lazy(() => import('./components/screens/SettingsScreen'));
const PrivacyPolicyScreen = lazy(() => import('./components/screens/PrivacyPolicyScreen'));

// Missing screens fallback (Placeholder until created)
const RashifalDetailScreen = lazy(() => import('./components/screens/RashifalScreen')); // Temporary redirect

/**
 * 🧭 NAVIGATION CONTROLLER
 */
const AppContent = () => {
  const { currentScreen } = useNavigation();

  const renderScreen = () => {
    switch (currentScreen) {
      // Auth & Onboarding
      case 'splash': return <SplashScreen />;
      case 'language': return <LanguageScreen />;
      case 'onboarding': return <OnboardingScreen />;
      case 'profile_setup': return <ProfileSetupScreen />;
      
      // Main App
      case 'home': return <HomeScreen />;
      case 'settings': return <SettingsScreen />;
      case 'privacy_policy': return <PrivacyPolicyScreen />;
      
      // 🖐️ Palm Reading
      case 'palm_scan': return <PalmScanScreen />;
      case 'palm_result': return <PalmResultScreen />;
      
      // 🃏 Tarot
      case 'tarot': return <TarotScreen />;
      case 'tarot_reading': return <TarotReadingScreen />;
      
      // ♈ Horoscope
      case 'horoscope': return <HoroscopeScreen />;
      case 'horoscope_detail': return <HoroscopeDetailScreen />;
      
      // 🕉️ Rashifal
      case 'rashifal': return <RashifalScreen />;
      case 'rashifal_detail': return <RashifalDetailScreen />; // Needs to be created next
      
      // 💬 Chat
      case 'chat': return <ChatScreen />;
      
      default: return <SplashScreen />;
    }
  };

  return (
    <Suspense fallback={<LoadingScreen fullScreen message="Aligning stars..." />}>
      {renderScreen()}
    </Suspense>
  );
};

/**
 * 📱 MAIN APP COMPONENT really fuxked bro
 * All Context Providers Wrapped Here
 */
const App = () => {
  return (
    <AppProvider>
      <UserProvider>
        <LanguageProvider>
          <ToastProvider>
            <NavigationProvider>
              <div className="antialiased text-white font-sans selection:bg-purple-500 selection:text-white">
                <AppContent />
                <Toast />
              </div>
            </NavigationProvider>
          </ToastProvider>
        </LanguageProvider>
      </UserProvider>
    </AppProvider>
  );
};

export default App;
