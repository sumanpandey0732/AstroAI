/**
 * 🎬 Animation System
 * Defines reusable animation variants for Framer Motion.
 * Used for page transitions, card reveals, and interactions.
 */

export const animations = {
  // 📄 Page Transitions (Smooth Slide & Fade)
  page: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: "easeOut" }
  },

  // 🆙 Slide Up (For Modals & Bottom Sheets)
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },

  // 🃏 Tarot Card Flip
  cardFlip: {
    hidden: { rotateY: 180, opacity: 0 },
    visible: { 
      rotateY: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "backOut" }
    }
  },

  // 🖐️ Palm Scanning Line
  scanLine: {
    initial: { top: "0%" },
    animate: { 
      top: "100%",
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        repeatType: "reverse", 
        ease: "linear" 
      }
    }
  },

  // ✨ Pulse / Glow Effect
  pulse: {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
      scale: 1.05,
      opacity: 0.4,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  },

  // 📦 Stagger Children (List items appearing one by one)
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
};

export default animations;
