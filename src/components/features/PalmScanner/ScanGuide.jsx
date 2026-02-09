import React from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import GlassCard from '../../common/GlassCard';

/**
 * 📝 SCAN GUIDE COMPONENT
 * Shows 3 simple steps to help user take a good photo.
 */
const ScanGuide = () => {
  const { t } = useLanguage();

  const steps = [
    { id: 1, icon: '✋', text: t('palm.guide_step1') }, // "Place hand on plain surface"
    { id: 2, icon: '💡', text: t('palm.guide_step2') }, // "Good lighting"
    { id: 3, icon: '✌️', text: t('palm.guide_step3') }, // "Fingers apart"
  ];

  return (
    <div className="mb-6 animate-fade-in-up">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-cyan-400 rounded-full"/>
        {t('palm.guide_title')}
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        {steps.map((step) => (
          <GlassCard 
            key={step.id} 
            variant="dark" 
            className="p-3 flex flex-col items-center text-center gap-2 h-full justify-center"
          >
            <span className="text-2xl filter drop-shadow-md">{step.icon}</span>
            <p className="text-[10px] text-gray-400 leading-tight">
              {step.text}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default ScanGuide;
