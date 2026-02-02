// 🔧 Service Worker Registration for PWA
// This file enables offline support and "Add to Home Screen" functionality

import { registerSW as registerViteSW } from 'virtual:pwa-register';

// ⏱️ Check for updates every hour (in milliseconds)
const UPDATE_INTERVAL = 60 * 60 * 1000;

/**
 * Register Service Worker
 * Handles PWA installation, offline caching, and automatic updates
 */
export function registerSW() {
  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    console.log('⚠️ Service Workers not supported in this browser');
    return;
  }

  // Register the service worker with auto-update
  const updateSW = registerViteSW({
    // ✅ Called when SW is registered successfully
    onRegistered(registration) {
      console.log('✅ Service Worker registered successfully');
      
      // Check for updates periodically
      if (registration) {
        setInterval(() => {
          registration.update();
          console.log('🔄 Checking for app updates...');
        }, UPDATE_INTERVAL);
      }
    },

    // 🔄 Called when new content is available
    onNeedRefresh() {
      console.log('🆕 New content available! Refreshing...');
      
      // Show update notification to user
      if (window.confirm('नया update available है! अभी refresh करें?')) {
        updateSW(true);
      }
    },

    // 📦 Called when content is cached for offline use
    onOfflineReady() {
      console.log('📱 App is ready for offline use!');
      
      // You can show a toast notification here
      showOfflineReadyNotification();
    },

    // ❌ Called when registration fails
    onRegisterError(error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  });
}

/**
 * Show notification when app is ready for offline use
 */
function showOfflineReadyNotification() {
  // Create a simple notification element
  const notification = document.createElement('div');
  notification.id = 'offline-ready-toast';
  notification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #4C1D95, #7C3AED);
      color: white;
      padding: 12px 24px;
      border-radius: 12px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideUp 0.3s ease-out;
    ">
      <span style="font-size: 18px;">✨</span>
      <span>App offline के लिए ready है!</span>
    </div>
  `;

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      to {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
    }
  `;
  document.head.appendChild(style);

  // Add to page
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

/**
 * Check if app is running in standalone mode (installed as PWA)
 */
export function isAppInstalled() {
  // Check for iOS
  const isIOS = window.navigator.standalone === true;
  
  // Check for Android/Desktop
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  
  return isIOS || isStandalone;
}

/**
 * Check if app can be installed
 */
export function canInstallApp() {
  return 'BeforeInstallPromptEvent' in window || 
         (!isAppInstalled() && 'serviceWorker' in navigator);
        }
