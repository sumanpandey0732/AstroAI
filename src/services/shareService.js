/**
 * 📤 Share Service
 * Uses the native Web Share API to share content to other apps (WhatsApp, Insta, etc.)
 */

export const shareService = {
  /**
   * Share text or url
   * @param {Object} data - { title, text, url }
   */
  share: async ({ title, text, url = window.location.href }) => {
    // 1. Check if browser supports sharing
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'AI Palm Reader',
          text: text,
          url: url,
        });
        return true; // Success
      } catch (error) {
        // User cancelled the share sheet
        if (error.name !== 'AbortError') {
          console.error('Share failed:', error);
        }
        return false;
      }
    } else {
      // 2. Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${title}\n\n${text}\n\n${url}`);
        return 'copied'; // Return specific status for UI to show "Copied!" toast
      } catch (err) {
        console.error('Clipboard failed:', err);
        return false;
      }
    }
  },

  /**
   * Generates a formatted message for results
   */
  formatResult: (type, userName, resultText) => {
    return `✨ ${userName}'s ${type} Reading ✨\n\n${resultText}\n\n🔮 Discover your destiny: https://aipalmreader.app`;
  }
};

export default shareService;
