import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import Header from '../common/Header';
import GlassCard from '../common/GlassCard';

/**
 * 🔒 PRIVACY POLICY SCREEN
 * Mandatory for Google Play Store compliance.
 * Explains how user data is handled (Local Storage only).
 */
const PrivacyPolicyScreen = () => {
  const { navigate } = useNavigation();

  return (
    <PageTransition variant="slideRight" className="bg-midnight-950">
      <Header />

      <Container className="pt-24 pb-10">
        
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate('settings')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back to Settings</span>
        </button>

        {/* 📄 Policy Content */}
        <GlassCard variant="dark" className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
            
            <section>
              <h2 className="text-white font-bold text-base mb-2">1. Introduction</h2>
              <p>
                Welcome to AstroAI. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our application and tell you about your privacy rights.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-base mb-2">2. Data We Collect</h2>
              <p>
                We collect minimal data to provide you with personalized astrological readings:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
                <li>Name (for personalization)</li>
                <li>Date of Birth (for Zodiac & Horoscope calculation)</li>
                <li>Gender (for energetic interpretation)</li>
                <li>Palm Images (processed temporarily for analysis)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-base mb-2">3. How We Use Your Data</h2>
              <p>
                Your data is processed <strong>locally on your device</strong> whenever possible.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
                <li>Palm images are sent to our AI provider (OpenRouter) solely for analysis and are not stored permanently on our servers.</li>
                <li>Profile data is stored in your device's Local Storage.</li>
                <li>We do not sell or share your personal data with third-party advertisers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-base mb-2">4. AI Processing</h2>
              <p>
                Our app uses Artificial Intelligence (AI) to generate readings. While we strive for accuracy, AI responses are for entertainment and spiritual reflection purposes only and should not be considered as professional advice.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-base mb-2">5. Data Deletion</h2>
              <p>
                You have full control over your data. You can delete all your stored data at any time by going to <strong>Settings &gt; Delete My Data</strong>. This will wipe all information from your device immediately.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-base mb-2">6. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy, please contact us at: <br/>
                <span className="text-cyan-400">support@astroai.app</span>
              </p>
            </section>

            <div className="pt-6 text-xs text-gray-500 border-t border-white/5">
              Last Updated: October 2023
            </div>

          </div>
        </GlassCard>

      </Container>
    </PageTransition>
  );
};

export default PrivacyPolicyScreen;
