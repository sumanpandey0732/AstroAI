/**
 * 📸 useImageUpload Hook
 * Manages image selection, compression, and preview generation.
 * Used in Palm Scan screen.
 */

import { useState, useCallback } from 'react';
import { imageService } from '../services/imageService';
import { useToast } from './useToast';

export const useImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null); // File object
  const [previewUrl, setPreviewUrl] = useState(null);       // Blob URL for <img> tag
  const [base64Image, setBase64Image] = useState(null);     // Base64 string for API
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { showToast } = useToast();

  /**
   * Handle file input change
   * @param {Event} event - File input change event
   */
  const handleImageSelect = useCallback(async (event) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    // 1. Validate Type
    if (!imageService.isValidImage(file)) {
      showToast('Please upload a valid image (JPG/PNG)', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // 2. Generate Preview immediately for better UX
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // 3. Compress Image
      const compressedFile = await imageService.compressImage(file);
      setSelectedImage(compressedFile);

      // 4. Convert to Base64 for AI
      const base64 = await imageService.fileToBase64(compressedFile);
      setBase64Image(base64);

    } catch (error) {
      console.error('Image processing failed:', error);
      showToast('Failed to process image. Try again.', 'error');
      resetImage();
    } finally {
      setIsProcessing(false);
    }
  }, [showToast]);

  /**
   * Clear current selection
   */
  const resetImage = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Memory cleanup
    }
    setSelectedImage(null);
    setPreviewUrl(null);
    setBase64Image(null);
  }, [previewUrl]);

  return {
    selectedImage,
    previewUrl,
    base64Image,
    isProcessing,
    handleImageSelect,
    resetImage
  };
};

export default useImageUpload;
