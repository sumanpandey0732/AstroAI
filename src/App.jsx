import React, { Suspense } from 'react';
import { AppProvider } from './context/AppProvider';
import { useNavigation } from './hooks/useNavigation';
import CosmicBackground from './components/common/CosmicBackground';
import Toast from './components/common/Toast';
import InstallPWA from './components/common/InstallPWA';
import OfflineBanner from './components/common/OfflineBanner';
import Loader from './components/common/Loader';

// 🔄 Lazy Load Screens (Performance Optimization)
const SplashScreen = React.lazy(() => import('./screens/SplashScreen'));
const LanguageScreen = React.lazy(() => import('./screens/LanguageScreen'));
const OnboardingScreen = React.lazy(() => import('./screens/OnboardingScreen'));
const ProfileSetupScreen = React.lazy(() => import('./screens/ProfileSetupScreen'));
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const PalmScanScreen = React.lazy(() => import('./screens/PalmScanScreen'));
const PalmResultScreen = React.lazy(() => import('./screens/PalmResultScreen'));
const AIChatScreen = React.lazy(() => import('./screens/AIChatScreen'));
const TarotScreen = React.lazy(() => import('./screens/TarotScreen'));
const TarotResultScreen = React.lazy(() => import('./screens/TarotResultScreen'));
const DailyGuidanceScreen = React.lazy(() => import('./screens/DailyGuidanceScreen'));
const HoroscopeScreen = React.lazy(() => import('./screens/HoroscopeScreen'));
const LoveReadingScreen = React.lazy(() => import('./screens/LoveReadingScreen'));
const HistoryScreen = React.lazy(() => import('./screens/HistoryScreen'));
const SettingsScreen = React.lazy(() => import('./screens/SettingsScreen'));
const PrivacyPolicyScreen = React.lazy(() => import('./screens/PrivacyPolicyScreen'));
const AboutScreen = React.lazy(() => import('./screens/AboutScreen'));
const TermsScreen = React.lazy(() => import('./screens/TermsScreen'));

function AppContent() {
  const { currentScreen } = useNavigation();

  // 🧭 Navigation Logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'SPLASH': return <SplashScreen />;
      case 'LANGUAGE': return <LanguageScreen />;
      case 'ONBOARDING': return <OnboardingScreen />;
      case 'PROFILE_SETUP': return <ProfileSetupScreen />;
      case 'HOME': return <HomeScreen />;
      case 'PALM_SCAN': return <PalmScanScreen />;
      case 'PALM_RESULT': return <PalmResultScreen />;
      case 'AI_CHAT': return <AIChatScreen />;
      case 'TAROT': return <TarotScreen />;
      case 'TAROT_RESULT': return <TarotResultScreen />;
      case 'DAILY_GUIDANCE': return <DailyGuidanceScreen />;
      case 'HOROSCOPE': return <HoroscopeScreen />;
      case 'LOVE_READING': return <LoveReadingScreen />;
      case 'HISTORY': return <HistoryScreen />;
      case 'SETTINGS': return <SettingsScreen />;
      case 'PRIVACY': return <PrivacyPolicyScreen />;
      case 'ABOUT': return <AboutScreen />;
      case 'TERMS': return <TermsScreen />;
      default: return <SplashScreen />;
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden text-white font-sans select-none">
      {/* 🌌 Global Background */}
      <CosmicBackground />

      {/* 📡 Offline Status */}
      <OfflineBanner />

      {/* 📱 Main Screen Content */}
      <Suspense fallback={<Loader fullScreen text="Loading Cosmic Energy..." />}>
        <div className="relative z-10 w-full h-full">
          {renderScreen()}
        </div>
      </Suspense>

      {/* 🔔 Global Notifications */}
      <Toast />

      {/* ⬇️ Install Prompt */}
      <InstallPWA />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
