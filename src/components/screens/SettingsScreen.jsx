import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useUser } from '../../hooks/useUser';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { shareContent } from '../../utils/helpers';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import Header from '../common/Header';
import BottomNav from '../common/BottomNav';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { ProfileIcon, SettingsIcon } from '../../assets/icons';

/**
 * ⚙️ SETTINGS SCREEN
 * Allows user to manage profile, language, data, and app preferences.
 */
const SettingsScreen = () => {
  const { navigate } = useNavigation();
  const { user, deleteUserData } = useUser();
  const { t, language, setLanguage, supportedLanguages } = useLanguage();
  const { showToast } = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // 🗑️ Handle Data Deletion
  const handleDeleteData = () => {
    deleteUserData();
    setIsDeleteModalOpen(false);
    showToast('success', 'All data deleted successfully.');
    // Redirect to splash (restart flow)
    window.location.reload();
  };

  // 🌍 Handle Language Change
  const handleLanguageChange = (code) => {
    setLanguage(code);
    setIsLangModalOpen(false);
    showToast('success', 'Language updated!');
  };

  // 📤 Share App
  const handleShareApp = async () => {
    await shareContent({
      title: 'AstroAI - Mystic Guide',
      text: 'Check out AstroAI! It reads your palm and tarot cards with AI. 🔮✨',
      url: window.location.origin, // Current URL
    });
  };

  return (
    <PageTransition variant="fade" className="bg-midnight-950">
      <Header />

      <Container className="pt-24 pb-28">
        
        {/* 🏷️ Title */}
        <div className="text-center mb-6 animate-fade-in-down">
          <div className="inline-flex p-3 mb-3 rounded-full bg-gray-500/10 border border-gray-500/20 shadow-glow-sm">
            <SettingsIcon className="w-8 h-8 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {t('settings.title')}
          </h1>
        </div>

        {/* 👤 Profile Section */}
        <div className="mb-6 animate-fade-in-up">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
            {t('settings.profile')}
          </h3>
          <GlassCard variant="dark" className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'Guest'}
              </div>
              <div>
                <h4 className="text-white font-bold text-base">
                  {user?.name || 'Stargazer'}
                </h4>
                <p className="text-gray-400 text-xs">
                  {user?.zodiac ? `♈ ${user.zodiac}` : 'No Zodiac Set'}
                </p>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="secondary" 
              onClick={() => navigate('profile_setup')}
            >
              {t('settings.edit_profile')}
            </Button>
          </GlassCard>
        </div>

        {/* 🌍 General Settings */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
            {t('settings.general')}
          </h3>
          <GlassCard variant="dark" className="overflow-hidden">
            
            {/* Language */}
            <button 
              onClick={() => setIsLangModalOpen(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🌐</span>
                <span className="text-gray-200 text-sm font-medium">{t('settings.language')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">
                  {supportedLanguages.find(l => l.code === language)?.nativeName}
                </span>
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Notifications (Mock Toggle) */}
            <div className="w-full p-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-xl">🔔</span>
                <span className="text-gray-200 text-sm font-medium">{t('settings.notifications')}</span>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-cyan-400" defaultChecked />
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-700 cursor-pointer"></label>
              </div>
            </div>

          </GlassCard>
        </div>

        {/* 🛡️ Support & Legal */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
            {t('settings.support')}
          </h3>
          <GlassCard variant="dark" className="overflow-hidden">
            
            {/* Share App */}
            <button 
              onClick={handleShareApp}
              className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📤</span>
                <span className="text-gray-200 text-sm font-medium">{t('common.share')}</span>
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Rate Us (External Link) */}
            <button 
              className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">⭐</span>
                <span className="text-gray-200 text-sm font-medium">{t('settings.rate_us')}</span>
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>

            {/* Privacy Policy */}
            <button 
              onClick={() => navigate('privacy_policy')}
              className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🔒</span>
                <span className="text-gray-200 text-sm font-medium">{t('settings.privacy')}</span>
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </GlassCard>
        </div>

        {/* ⚠️ Danger Zone */}
        <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-full py-3 text-center text-red-400 text-sm font-medium hover:text-red-300 transition-colors border border-red-500/20 rounded-xl hover:bg-red-500/10"
          >
            {t('settings.delete_data')}
          </button>
          <p className="text-center text-[10px] text-gray-600 mt-4">
            AstroAI v1.0.0
          </p>
        </div>

      </Container>

      <BottomNav />

      {/* 🗑️ Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete All Data?"
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <p className="text-gray-300 text-sm mb-6">
            {t('settings.delete_confirm')}
          </p>
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              fullWidth 
              onClick={() => setIsDeleteModalOpen(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button 
              variant="danger" 
              fullWidth 
              onClick={handleDeleteData}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* 🌍 Language Modal */}
      <Modal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        title={t('settings.language')}
        size="md"
      >
        <div className="grid grid-cols-1 gap-2">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                w-full p-3 rounded-xl flex items-center justify-between transition-all
                ${language === lang.code 
                  ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-400' 
                  : 'bg-white/5 border border-white/5 text-gray-300 hover:bg-white/10'}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.nativeName}</span>
              </div>
              {language === lang.code && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </Modal>

    </PageTransition>
  );
};

export default SettingsScreen;
