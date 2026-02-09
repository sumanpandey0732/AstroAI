import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button';
import GlassCard from '../../common/GlassCard';
import { useToast } from '../../../hooks/useToast';
import { useLanguage } from '../../../hooks/useLanguage';

/**
 * 📸 CAMERA CAPTURE COMPONENT
 * Opens phone camera (Back Camera) to take palm photo.
 * Also supports uploading from gallery.
 * Returns captured image as base64 URL.
 */
const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();
  const { t } = useLanguage();
  
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);

  // ═══════════════════════════════════════════════════════════
  // 📹 START CAMERA (Back Camera)
  // ═══════════════════════════════════════════════════════════
  const startCamera = async () => {
    setIsCameraLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Back Camera
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreamActive(true);
      }
    } catch (err) {
      console.error('Camera Error:', err);
      showToast('error', t('palm.camera_permission'));
    } finally {
      setIsCameraLoading(false);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // 🛑 STOP CAMERA
  // ═══════════════════════════════════════════════════════════
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsStreamActive(false);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // 📸 CAPTURE PHOTO FROM CAMERA
  // ═══════════════════════════════════════════════════════════
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64 JPEG image
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.85);

    // Haptic feedback on capture
    if (navigator.vibrate) navigator.vibrate(50);

    // Stop camera stream
    stopCamera();

    // Send image to parent component
    onCapture(imageDataUrl);
  };

  // ═══════════════════════════════════════════════════════════
  // 🖼️ UPLOAD FROM GALLERY
  // ═══════════════════════════════════════════════════════════
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('error', 'Please select an image file.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast('error', 'Image too large. Max 10MB.');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      if (navigator.vibrate) navigator.vibrate(30);
      onCapture(e.target.result);
    };
    reader.onerror = () => {
      showToast('error', 'Failed to read image.');
    };
    reader.readAsDataURL(file);
  };

  // ═══════════════════════════════════════════════════════════
  // 🎨 RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="w-full">
      
      {/* 📹 Camera View Area */}
      <div className="relative w-full aspect-[3/4] bg-black/40 rounded-2xl overflow-hidden border-2 border-white/10 shadow-inner mb-4">
        
        {isStreamActive ? (
          <>
            {/* Live Video Feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* 🎯 Hand Guide Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <svg
                viewBox="0 0 200 300"
                className="w-2/3 h-2/3 opacity-30"
              >
                <path
                  d="M100,280 C60,280 40,200 40,150 L40,80 C40,60 55,60 55,80 L55,140 M65,140 L65,50 C65,30 80,30 80,50 L80,140 M90,140 L90,30 C90,10 105,10 105,30 L105,140 M115,140 L115,50 C115,30 130,30 130,50 L130,150 C130,200 140,280 100,280"
                  stroke="rgba(0,245,255,0.6)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>

            {/* Scanning Line Animation */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-line shadow-glow-cyan" />

            {/* 📸 Capture Button (Big Circle) */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <button
                onClick={capturePhoto}
                className="w-18 h-18 rounded-full border-4 border-white bg-white/20 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform shadow-2xl group"
              >
                <div className="w-14 h-14 bg-white rounded-full shadow-lg group-active:bg-gray-200 transition-colors" />
              </button>
            </div>

            {/* Cancel Camera Button */}
            <button
              onClick={stopCamera}
              className="absolute top-3 right-3 bg-black/60 p-2 rounded-full text-white backdrop-blur-md text-sm"
            >
              ✕
            </button>
          </>
        ) : (
          /* 💤 Idle State - No Camera Active */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-4">
            
            {/* Big Camera Icon */}
            <div className="p-5 bg-white/5 rounded-full border border-white/10 shadow-inner-glow mb-2">
              <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>

            <p className="text-gray-400 text-sm">
              Position your palm in good lighting
            </p>
          </div>
        )}

        {/* Hidden Canvas (For photo processing) */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* 🔘 Action Buttons (Camera + Gallery) */}
      {!isStreamActive && (
        <div className="flex gap-3">
          {/* Take Photo Button */}
          <Button
            fullWidth
            variant="primary"
            onClick={startCamera}
            isLoading={isCameraLoading}
            className="flex-1"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t('palm.take_photo')}
            </span>
          </Button>

          {/* Upload from Gallery Button */}
          <Button
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t('palm.upload_image')}
            </span>
          </Button>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

CameraCapture.propTypes = {
  onCapture: PropTypes.func.isRequired,
};

export default CameraCapture;
