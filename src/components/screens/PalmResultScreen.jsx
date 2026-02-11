import React, { useState } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import BottomNav from '../common/BottomNav';
import { PalmIcon } from '../../assets/icons';
import { helpers } from '../../utils/helpers';

/**
 * 🖐️ PALM RESULT SCREEN
 * Displays AI-generated palm reading results.
 * Shows each palm line's interpretation in beautiful cards.
 */
const PalmResultScreen = () => {
  const { currentScreenData, navigate } = useNavigation();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [expandedLine, setExpandedLine] = useState(null);

  // Get data passed from PalmScanScreen
  const result = currentScreenData?.result;
  const palmImage = currentScreenData?.image;
  const hand = currentScreenData?.hand || 'right';

  // If no result, redirect back
  if (!result) {
    return (
      <PageTransition variant="fade" className="bg-midnight-950">
        <Container fullHeight center hasBottomNav={false}>
          <div className="text-center space-y-4">
            <p className="text-gray-400">No reading data found.</p>
            <Button onClick={() => navigate('palm_scan')} variant="primary">
              Scan Again
            </Button>
          </div>
        </Container>
      </PageTransition>
    );
  }

  // Palm Line Configuration
  const palmLines = [
    {
      id: 'heartLine',
      title: t('palm.heart_line'),
      icon: '❤️',
      color: 'border-pink-500/30',
      glowColor: 'shadow-glow-pink-sm',
      bgColor: 'bg-pink-500/10',
      textColor: 'text-pink-400',
      data: result.heartLine,
    },
    {
      id: 'headLine',
      title: t('palm.head_line'),
      icon: '🧠',
      color: 'border-cyan-500/30',
      glowColor: 'shadow-glow-cyan-sm',
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-400',
      data: result.headLine,
    },
    {
      id: 'lifeLine',
      title: t('palm.life_line'),
      icon: '🌿',
      color: 'border-green-500/30',
      glowColor: 'shadow-[0_0_15px_rgba(34,197,94,0.2)]',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      data: result.lifeLine,
    },
    {
      id: 'fateLine',
      title: t('palm.fate_line'),
      icon: '✨',
      color: 'border-purple-500/30',
      glowColor: 'shadow-glow-sm',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      data: result.fateLine,
    },
  ];

  // Toggle expanded line
  const toggleLine = (lineId) => {
    setExpandedLine(expandedLine === lineId ? null : lineId);
    if (navigator.vibrate) navigator.vibrate(5);
  };

  // Share Result
  const handleShare = async () => {
    const shareText = `🔮 My Palm Reading by AstroAI\n\n${result.summary}\n\nDownload AstroAI for your own reading!`;
    const shared = await helpers.shareContent({
      title: 'My Palm Reading - AstroAI',
      text: shareText,
    });
    if (shared) {
      showToast('success', 'Shared successfully!');
    }
  };

  return (
    <PageTransition variant="slideUp" className="bg-midnight-950">
      <Container className="pt-6 pb-28">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate('palm_scan')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Back</span>
        </button>

        {/* 🏷️ Header */}
        <div className="text-center mb-6 animate-fade-in-down">
          <div className="inline-flex p-3 mb-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-glow-cyan-sm">
            <PalmIcon className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {t('palm.result_title')}
          </h1>
          <p className="text-gray-400 text-xs">
            {hand === 'left' ? '🤚 Left Hand' : '✋ Right Hand'} Analysis
          </p>
        </div>

        {/* 🖼️ Palm Image Preview */}
        {palmImage && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-cosmic animate-fade-in">
            <img
              src={palmImage}
              alt="Analyzed Palm"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-cyan-300 text-xs font-medium border border-cyan-500/20">
              ✅ Analyzed
            </div>
          </div>
        )}

        {/* 📝 Summary Card */}
        <GlassCard
          variant="cosmic"
          className="p-5 mb-6 animate-fade-in-up"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-purple-300 mb-1 uppercase tracking-wider">
                Overall Reading
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {result.summary || 'Your palm reveals a unique journey ahead.'}
              </p>
            </div>
          </div>
        </GlassCard>

        {/* 🖐️ Palm Lines Cards */}
        <div className="space-y-4 mb-8">
          {palmLines.map((line, index) => (
            <div
              key={line.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <GlassCard
                variant="dark"
                className={`overflow-hidden border ${line.color} ${expandedLine === line.id ? line.glowColor : ''} transition-shadow duration-300`}
              >
                {/* Line Header (Clickable) */}
                <button
                  onClick={() => toggleLine(line.id)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${line.bgColor}`}>
                      <span className="text-xl">{line.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">
                        {line.title}
                      </h4>
                      <p className={`text-xs ${line.textColor} font-medium`}>
                        {line.data?.type || 'Analyzed'}
                      </p>
                    </div>
                  </div>

                  {/* Expand Arrow */}
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedLine === line.id ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded Content */}
                {expandedLine === line.id && (
                  <div className="px-4 pb-4 border-t border-white/5 pt-3 animate-fade-in space-y-3">
                    {/* Meaning */}
                    <div>
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Meaning
                      </h5>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {line.data?.meaning || 'Your line reveals interesting patterns.'}
                      </p>
                    </div>

                    {/* Advice */}
                    <div className={`p-3 rounded-xl ${line.bgColor} border ${line.color}`}>
                      <h5 className={`text-xs font-bold ${line.textColor} uppercase tracking-wider mb-1`}>
                        💡 Guidance
                      </h5>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {line.data?.advice || 'Trust your inner wisdom.'}
                      </p>
                    </div>
                  </div>
                )}
              </GlassCard>
            </div>
          ))}
        </div>

        {/* 🌟 Overall Advice */}
        {result.overallAdvice && (
          <GlassCard variant="highlight" className="p-5 mb-6 animate-fade-in-up text-center">
            <p className="text-cyan-300 text-sm leading-relaxed italic">
              "{result.overallAdvice}"
            </p>
          </GlassCard>
        )}

        {/* 🔘 Action Buttons */}
        <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          {/* Share Button */}
          <Button
            variant="secondary"
            onClick={handleShare}
            className="flex-1"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </span>
          </Button>

          {/* Scan Again Button */}
          <Button
            variant="primary"
            onClick={() => navigate('palm_scan')}
            className="flex-1"
          >
            <span className="flex items-center justify-center gap-2">
              <PalmIcon className="w-5 h-5" />
              Scan Again
            </span>
          </Button>
        </div>

        {/* ⚠️ Disclaimer */}
        <p className="text-center text-[10px] text-gray-600 mt-6 px-4 leading-relaxed">
          {t('palm.disclaimer')}
        </p>

      </Container>
      <BottomNav />
    </PageTransition>
  );
};

export default PalmResultScreen;
