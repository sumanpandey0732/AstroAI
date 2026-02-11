import React, { useState } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useToast } from '../../hooks/useToast';
import { useLanguage } from '../../hooks/useLanguage';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import Header from '../common/Header';
import BottomNav from '../common/BottomNav';
import Button from '../common/Button';
import GlassCard from '../common/GlassCard';
import { LoadingScreen } from '../common/Loading';
import ScanGuide from '../features/PalmScanner/ScanGuide';
import CameraCapture from '../features/PalmScanner/CameraCapture';
import { PalmIcon } from '../../assets/icons';

/**
 * 🖐️ PALM SCAN SCREEN
 * Full page for palm reading feature.
 * Flow: Select Hand → Scan Guide → Camera/Upload → AI Analysis → Result
 */
const PalmScanScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();
  const { showToast } = useToast();

  // State Management
  const [selectedHand, setSelectedHand] = useState('right');
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ═══════════════════════════════════════════════════════════
  // 📸 HANDLE IMAGE CAPTURE (From Camera or Gallery)
  // ═══════════════════════════════════════════════════════════
  const handleImageCapture = (imageDataUrl) => {
    setCapturedImage(imageDataUrl);
    showToast('success', 'Photo captured! Ready to analyze.');
  };

  // ═══════════════════════════════════════════════════════════
  // 🔄 RESET (Retake Photo)
  // ═══════════════════════════════════════════════════════════
  const handleReset = () => {
    setCapturedImage(null);
  };

  // ═══════════════════════════════════════════════════════════
  // 🧠 START AI ANALYSIS
  // ═══════════════════════════════════════════════════════════
  const handleAnalyze = async () => {
    if (!capturedImage) {
      showToast('error', 'Please capture or upload a palm image first.');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Call OpenRouter Vision API
      const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: 'allenai/molmo-7b-d-0924',
          messages: [
            {
              role: 'system',
              content: `You are a professional palmistry reader and spiritual guide. Analyze the palm image provided. 
              
              Give a detailed reading covering these lines:
              1. Heart Line - Love, emotions, relationships
              2. Head Line - Intellect, thinking style, creativity
              3. Life Line - Vitality, health, life changes
              4. Fate Line - Career, destiny, life path
              
              Rules:
              - Be warm, calm, and spiritual in tone
              - Never make absolute predictions
              - Never give medical or legal advice
              - Use symbolic and reflective language
              - Give long, detailed interpretations for each line
              - Include advice for each line
              - This is the user's ${selectedHand} hand
              
              Format your response as JSON:
              {
                "summary": "Brief overall reading",
                "heartLine": { "type": "description", "meaning": "detailed meaning", "advice": "guidance" },
                "headLine": { "type": "description", "meaning": "detailed meaning", "advice": "guidance" },
                "lifeLine": { "type": "description", "meaning": "detailed meaning", "advice": "guidance" },
                "fateLine": { "type": "description", "meaning": "detailed meaning", "advice": "guidance" },
                "overallAdvice": "Final spiritual guidance"
              }`
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Please analyze this ${selectedHand} hand palm image and provide a detailed spiritual reading.`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: capturedImage
                  }
                }
              ]
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('No response from AI');
      }

      // Try to parse JSON from AI response
      let parsedResult;
      try {
        // Extract JSON from response (AI might wrap it in markdown)
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        parsedResult = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      } catch (parseError) {
        // If JSON parsing fails, create structured result from text
        parsedResult = {
          summary: aiResponse,
          heartLine: { type: 'Analyzed', meaning: 'See summary for details', advice: 'Trust your heart' },
          headLine: { type: 'Analyzed', meaning: 'See summary for details', advice: 'Follow your mind' },
          lifeLine: { type: 'Analyzed', meaning: 'See summary for details', advice: 'Live fully' },
          fateLine: { type: 'Analyzed', meaning: 'See summary for details', advice: 'Embrace your path' },
          overallAdvice: 'The stars guide your journey. Trust the process.'
        };
      }

      // Navigate to Result Screen with data
      navigate('palm_result', {
        result: parsedResult,
        image: capturedImage,
        hand: selectedHand
      });

    } catch (error) {
      console.error('Palm Analysis Error:', error);
      showToast('error', 'Analysis failed. Please check your internet and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // 🎨 RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <PageTransition variant="fade" className="bg-midnight-950">
      
      {/* 🌀 Full Screen Loading (During AI Analysis) */}
      {isAnalyzing && (
        <LoadingScreen message={t('palm.analyzing')} />
      )}

      <Header />

      <Container className="pt-20 pb-24">
        
        {/* 🏷️ Title Section */}
        <div className="text-center mb-6 animate-fade-in-down">
          <div className="inline-flex p-3 mb-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-glow-cyan-sm">
            <PalmIcon className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {t('palm.title')}
          </h1>
          <p className="text-gray-400 text-sm">
            Discover the secrets written in your palm
          </p>
        </div>

        {/* ✋ Hand Selector (Left / Right) */}
        <div className="mb-6 animate-fade-in-up">
          <p className="text-sm font-medium text-gray-300 mb-2 pl-1">
            {t('palm.select_hand')}
          </p>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            {/* Left Hand Button */}
            <button
              onClick={() => setSelectedHand('left')}
              className={`
                flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex flex-col items-center gap-1
                ${selectedHand === 'left'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-400 hover:text-white'}
              `}
            >
              <span className="text-lg">🤚</span>
              <span>{t('palm.left_hand')}</span>
              <span className="text-[10px] opacity-60">{t('palm.left_desc')}</span>
            </button>

            {/* Right Hand Button */}
            <button
              onClick={() => setSelectedHand('right')}
              className={`
                flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex flex-col items-center gap-1
                ${selectedHand === 'right'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-400 hover:text-white'}
              `}
            >
              <span className="text-lg">✋</span>
              <span>{t('palm.right_hand')}</span>
              <span className="text-[10px] opacity-60">{t('palm.right_desc')}</span>
            </button>
          </div>
        </div>

        {/* 📸 Camera / Preview Section */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {capturedImage ? (
            /* 🖼️ Image Preview (After Capture) */
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-glow-cyan">
              <img
                src={capturedImage}
                alt="Captured Palm"
                className="w-full h-full object-cover"
              />

              {/* Scanning Line Effect */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-line shadow-glow-cyan" />

              {/* Retake Button */}
              <button
                onClick={handleReset}
                className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-sm flex items-center gap-1 active:scale-95 transition-transform border border-white/10"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retake
              </button>

              {/* Hand Label */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-cyan-300 text-xs font-medium border border-cyan-500/20">
                {selectedHand === 'left' ? '🤚 Left Hand' : '✋ Right Hand'}
              </div>
            </div>
          ) : (
            /* 📹 Camera Component */
            <CameraCapture onCapture={handleImageCapture} />
          )}
        </div>

        {/* 📝 Scan Guide (Only when no image) */}
        {!capturedImage && <ScanGuide />}

        {/* 🔘 Analyze Button (Only when image exists) */}
        {capturedImage && (
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <Button
              fullWidth
              size="lg"
              variant="cosmic"
              onClick={handleAnalyze}
              isLoading={isAnalyzing}
              className="shadow-glow-cyan-md"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Reveal My Destiny ✨
              </span>
            </Button>
          </div>
        )}

        {/* ⚠️ Disclaimer */}
        <p className="text-center text-[10px] text-gray-600 mt-6 px-4 leading-relaxed">
          {t('palm.disclaimer')}
        </p>

      </Container>

      <BottomNav />
    </PageTransition>
  );
};

export default PalmScanScreen;
