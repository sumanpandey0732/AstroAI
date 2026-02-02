/**
 * 🖼️ Image Service
 * Handles image compression and format conversion for Palm Scanning.
 * Uses 'browser-image-compression' to reduce file size before AI upload.
 */

import imageCompression from 'browser-image-compression';

export const imageService = {
  /**
   * Compresses an image file to be suitable for AI analysis
   * Target: Max 1MB, Max 1920px width/height
   * @param {File} imageFile 
   * @returns {Promise<File>} Compressed file
   */
  compressImage: async (imageFile) => {
    // Configuration options
    const options = {
      maxSizeMB: 0.8,          // Target size ~800KB
      maxWidthOrHeight: 1500,  // Good resolution for palm lines
      useWebWorker: true,      // Run in background thread
      fileType: 'image/jpeg',  // Ensure JPEG format
      initialQuality: 0.8,
    };

    try {
      console.log(`Original size: ${(imageFile.size / 1024 / 1024).toFixed(2)} MB`);
      const compressedFile = await imageCompression(imageFile, options);
      console.log(`Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
      return compressedFile;
    } catch (error) {
      console.error('Image compression failed:', error);
      throw error; // Let the UI handle the error
    }
  },

  /**
   * Converts a File object to Base64 string (required for OpenRouter API)
   * @param {File} file 
   * @returns {Promise<string>} Base64 data URL
   */
  fileToBase64: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  },

  /**
   * Validates if the file is a valid image
   * @param {File} file 
   * @returns {boolean}
   */
  isValidImage: (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    return file && validTypes.includes(file.type);
  }
};

export default imageService;
