import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../hooks/useLanguage';
import { useUser } from '../../hooks/useUser';
import { useToast } from '../../hooks/useToast';
import { getZodiacSign, isBirthdayToday } from '../../utils/dateUtils';
import PageTransition from '../common/PageTransition';
import Container from '../common/Container';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { ProfileIcon } from '../../assets/icons'; // Import icons

/**
 * 👤 PROFILE SETUP SCREEN
 * Collects user details (Name, DOB, Gender) to personalize the experience.
 * Automatically calculates Zodiac sign based on birth date.
 */
const ProfileSetupScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();
  const { updateUserProfile, user } = useUser();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    dob: user?.dob || '',
    time: user?.time || '',
    gender: user?.gender || '',
    zodiac: user?.zodiac || '',
  });

  const [errors, setErrors] = useState({});

  // 🔄 Auto-Calculate Zodiac when DOB changes
  useEffect(() => {
    if (formData.dob) {
      const zodiacData = getZodiacSign(formData.dob);
      if (zodiacData) {
        setFormData(prev => ({ ...prev, zodiac: zodiacData.sign }));
      }
    }
  }, [formData.dob]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  // Handle Select Change
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  // 📝 Validate Form
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 💾 Save Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      showToast('error', t('common.error'));
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API delay for UX
      await new Promise(resolve => setTimeout(resolve, 800));

      updateUserProfile(formData);
      
      // Check for birthday surprise
      if (isBirthdayToday(formData.dob)) {
        showToast('success', "🎉 Happy Birthday! The stars shine for you today!");
      } else {
        showToast('success', "Profile saved successfully!");
      }

      navigate('home');
    } catch (error) {
      showToast('error', "Failed to save profile.");
    } finally {
      setIsLoading(false);
    }
  };

  // Gender Options
  const genderOptions = [
    { value: 'male', label: t('profile.gender_male'), icon: '👨' },
    { value: 'female', label: t('profile.gender_female'), icon: '👩' },
    { value: 'other', label: t('profile.gender_other'), icon: '🌈' },
  ];

  return (
    <PageTransition variant="fade" className="bg-midnight-950">
      <Container hasBottomNav={false} className="py-8">
        
        {/* 🌟 Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-block p-4 mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-glow-cyan-sm">
            <ProfileIcon className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {t('profile.title')}
          </h1>
          <p className="text-gray-400 text-sm">
            {t('profile.subtitle')}
          </p>
        </div>

        {/* 📝 Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
          
          {/* Name Input */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <Input
              name="name"
              label={t('profile.name_label')}
              placeholder={t('profile.name_placeholder')}
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
          </div>

          {/* Date of Birth Input */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Input
              name="dob"
              type="date"
              label={t('profile.dob_label')}
              value={formData.dob}
              onChange={handleChange}
              error={errors.dob}
              required
            />
          </div>

          {/* Time of Birth Input (Optional) */}
          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Input
              name="time"
              type="time"
              label={t('profile.time_label')}
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          {/* Gender Select */}
          <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <Select
              label={t('profile.gender_label')}
              options={genderOptions}
              value={formData.gender}
              onChange={(val) => handleSelectChange('gender', val)}
              error={errors.gender}
              placeholder="Select Gender"
            />
          </div>

          {/* Calculated Zodiac (Read Only Display) */}
          {formData.zodiac && (
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-between animate-scale-in">
              <span className="text-sm text-purple-300">Your Zodiac Sign:</span>
              <span className="text-lg font-bold text-purple-200 uppercase tracking-wide">
                {formData.zodiac}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <Button 
              type="submit" 
              fullWidth 
              size="lg" 
              variant="primary"
              isLoading={isLoading}
              className="shadow-glow-md"
            >
              {t('profile.save_profile')}
            </Button>
          </div>

        </form>
      </Container>
    </PageTransition>
  );
};

export default ProfileSetupScreen;
