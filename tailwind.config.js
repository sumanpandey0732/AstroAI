/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
        },
        cosmic: {
          900: '#0a0a1a',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'pulse-slow': 'pulse 3s infinite',
        'scan-line': 'scanLine 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scanLine: {
          '0%': { top: '0%', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(168, 85, 247, 0.4)',
        'glow-md': '0 0 20px rgba(168, 85, 247, 0.6)',
        'glow-cyan-sm': '0 0 10px rgba(34, 211, 238, 0.4)',
        'cosmic': '0 0 30px rgba(139, 92, 246, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
};        },

        // Tarot Colors
        tarot: {
          gold: '#fbbf24',
          silver: '#e2e8f0',
          bronze: '#d97706',
          mystic: '#8b5cf6',
        },

        // Status Colors
        status: {
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },

        // Glass Colors (with opacity support)
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.3)',
          purple: 'rgba(139, 92, 246, 0.15)',
          blue: 'rgba(59, 130, 246, 0.15)',
          cyan: 'rgba(6, 182, 212, 0.15)',
        },
      },

      // ═══════════════════════════════════════════════════════════
      // 🔤 TYPOGRAPHY
      // ═══════════════════════════════════════════════════════════
      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        display: [
          'Playfair Display',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],
        mystic: [
          'Cinzel',
          'Playfair Display',
          'Georgia',
          'serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'SF Mono',
          'Consolas',
          'Liberation Mono',
          'Menlo',
          'Courier',
          'monospace',
        ],
      },

      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.875rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // ═══════════════════════════════════════════════════════════
      // 📐 SPACING & SIZING
      // ═══════════════════════════════════════════════════════════
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem',
        '9.5': '2.375rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '50': '12.5rem',
        '54': '13.5rem',
        '58': '14.5rem',
        '62': '15.5rem',
        '66': '16.5rem',
        '70': '17.5rem',
        '74': '18.5rem',
        '78': '19.5rem',
        '82': '20.5rem',
        '86': '21.5rem',
        '90': '22.5rem',
        '100': '25rem',
        '120': '30rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },

      // ═══════════════════════════════════════════════════════════
      // 🔲 BORDER RADIUS (Large Rounded Corners 24-32px)
      // ═══════════════════════════════════════════════════════════
      borderRadius: {
        'none': '0',
        'sm': '0.375rem',
        'DEFAULT': '0.5rem',
        'md': '0.625rem',
        'lg': '0.875rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        'cosmic': '1.75rem',
        'card': '1.5rem',
        'button': '0.875rem',
        'input': '0.75rem',
        'modal': '2rem',
        'sheet': '2rem 2rem 0 0',
        'full': '9999px',
      },

      // ═══════════════════════════════════════════════════════════
      // 🌫️ BLUR (For Glassmorphism)
      // ═══════════════════════════════════════════════════════════
      blur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
        'glass': '20px',
        'cosmic': '30px',
      },

      // ═══════════════════════════════════════════════════════════
      // 💫 BOX SHADOWS (With Glow Effects)
      // ═══════════════════════════════════════════════════════════
      boxShadow: {
        // Standard Shadows
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

        // Glow Shadows
        'glow-sm': '0 0 10px rgba(139, 92, 246, 0.3)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-md': '0 0 30px rgba(139, 92, 246, 0.5)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.6)',
        'glow-xl': '0 0 60px rgba(139, 92, 246, 0.7)',

        // Cyan Glow
        'glow-cyan-sm': '0 0 10px rgba(0, 245, 255, 0.3)',
        'glow-cyan': '0 0 20px rgba(0, 245, 255, 0.4)',
        'glow-cyan-md': '0 0 30px rgba(0, 245, 255, 0.5)',
        'glow-cyan-lg': '0 0 40px rgba(0, 245, 255, 0.6)',

        // Blue Glow
        'glow-blue-sm': '0 0 10px rgba(59, 130, 246, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-blue-md': '0 0 30px rgba(59, 130, 246, 0.5)',
        'glow-blue-lg': '0 0 40px rgba(59, 130, 246, 0.6)',

        // Pink Glow
        'glow-pink-sm': '0 0 10px rgba(236, 72, 153, 0.3)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.4)',
        'glow-pink-md': '0 0 30px rgba(236, 72, 153, 0.5)',

        // Cosmic Shadows
        'cosmic': '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)',
        'cosmic-lg': '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
        'cosmic-xl': '0 24px 64px rgba(0, 0, 0, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)',

        // Glass Shadows
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.25)',
        'glass-lg': '0 12px 48px 0 rgba(0, 0, 0, 0.45)',

        // Card Shadows
        'card': '0 4px 24px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 255, 255, 0.1)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)',

        // Button Shadows
        'button': '0 4px 14px rgba(139, 92, 246, 0.4)',
        'button-hover': '0 6px 20px rgba(139, 92, 246, 0.5)',

        // Inset Glow
        'inner-glow': 'inset 0 0 20px rgba(139, 92, 246, 0.2)',
        'inner-glow-cyan': 'inset 0 0 20px rgba(0, 245, 255, 0.2)',
      },

      // ═══════════════════════════════════════════════════════════
      // 🎭 DROP SHADOWS
      // ═══════════════════════════════════════════════════════════
      dropShadow: {
        'sm': '0 1px 1px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 3px rgba(0, 0, 0, 0.07)',
        'lg': '0 10px 8px rgba(0, 0, 0, 0.04)',
        'xl': '0 20px 13px rgba(0, 0, 0, 0.03)',
        '2xl': '0 25px 25px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 10px rgba(139, 92, 246, 0.5)',
        'glow-cyan': '0 0 10px rgba(0, 245, 255, 0.5)',
        'glow-blue': '0 0 10px rgba(59, 130, 246, 0.5)',
        'glow-pink': '0 0 10px rgba(236, 72, 153, 0.5)',
        'cosmic': '0 0 20px rgba(139, 92, 246, 0.6)',
        'text': '0 2px 4px rgba(0, 0, 0, 0.5)',
      },

      // ═══════════════════════════════════════════════════════════
      // 🌈 GRADIENTS (Background Images)
      // ═══════════════════════════════════════════════════════════
      backgroundImage: {
        // Cosmic Gradients
        'cosmic-gradient': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        'cosmic-radial': 'radial-gradient(ellipse at center, #302b63 0%, #0f0c29 100%)',
        'cosmic-vertical': 'linear-gradient(180deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)',

        // Purple Gradients
        'purple-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'purple-pink': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
        'purple-blue': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',

        // Blue Gradients
        'blue-gradient': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        'blue-cyan': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        'blue-purple': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',

        // Cyan Gradients
        'cyan-gradient': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        'cyan-blue': 'linear-gradient(135deg, #00f5ff 0%, #3b82f6 100%)',

        // Glass Gradients
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'glass-border': 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',

        // Button Gradients
        'button-primary': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
        'button-secondary': 'linear-gradient(135deg, #475569 0%, #334155 100%)',
        'button-success': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        'button-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',

        // Card Gradients
        'card-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        'card-hover': 'linear-gradient(180deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.02) 100%)',

        // Shimmer
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',

        // Tarot Card
        'tarot-back': 'linear-gradient(135deg, #1a1a3e 0%, #2d1b4e 25%, #1a1a3e 50%, #2d1b4e 75%, #1a1a3e 100%)',

        // Zodiac Elements
        'fire-gradient': 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
        'earth-gradient': 'linear-gradient(135deg, #84cc16 0%, #22c55e 100%)',
        'air-gradient': 'linear-gradient(135deg, #38bdf8 0%, #a5b4fc 100%)',
        'water-gradient': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',

        // Mesh Gradients
        'mesh-1': 'radial-gradient(at 40% 20%, #8b5cf6 0px, transparent 50%), radial-gradient(at 80% 0%, #1d4ed8 0px, transparent 50%), radial-gradient(at 0% 50%, #6366f1 0px, transparent 50%)',
        'mesh-2': 'radial-gradient(at 0% 0%, #8b5cf6 0px, transparent 50%), radial-gradient(at 100% 100%, #06b6d4 0px, transparent 50%)',
      },

      // ═══════════════════════════════════════════════════════════
      // 🔄 ANIMATIONS
      // ═══════════════════════════════════════════════════════════
      animation: {
        // Fade Animations
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-fast': 'fadeIn 0.2s ease-out forwards',
        'fade-in-slow': 'fadeIn 0.8s ease-out forwards',
        'fade-out': 'fadeOut 0.3s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.5s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.5s ease-out forwards',

        // Scale Animations
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'scale-out': 'scaleOut 0.2s ease-out forwards',
        'scale-bounce': 'scaleBounce 0.5s ease-out forwards',

        // Slide Animations
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'slide-left': 'slideLeft 0.4s ease-out forwards',
        'slide-right': 'slideRight 0.4s ease-out forwards',
        'slide-in-bottom': 'slideInBottom 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-out-bottom': 'slideOutBottom 0.3s ease-in forwards',

        // Pulse & Glow
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',

        // Spin Animations
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse': 'spinReverse 6s linear infinite',

        // Float Animations
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',

        // Bounce
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',

        // Shake
        'shake': 'shake 0.5s ease-in-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',

        // Cosmic Animations
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'cosmic-float': 'cosmicFloat 10s ease-in-out infinite',
        'star-pulse': 'starPulse 4s ease-in-out infinite',
        'nebula': 'nebula 15s ease-in-out infinite',

        // Card Animations
        'card-flip': 'cardFlip 0.8s ease-in-out forwards',
        'card-deal': 'cardDeal 0.5s ease-out forwards',
        'card-hover': 'cardHover 0.3s ease-out forwards',

        // Shimmer
        'shimmer': 'shimmer 2s linear infinite',

        // Typing
        'typing': 'typing 0.8s steps(3) infinite',
        'blink': 'blink 1s step-end infinite',

        // Loading
        'loading-dots': 'loadingDots 1.4s ease-in-out infinite',
        'progress': 'progress 2s ease-in-out infinite',

        // Palm Scan
        'scan-line': 'scanLine 2s ease-in-out infinite',
        'palm-glow': 'palmGlow 3s ease-in-out infinite',

        // Ripple
        'ripple': 'ripple 0.6s ease-out forwards',

        // Modal
        'modal-in': 'modalIn 0.3s ease-out forwards',
        'modal-out': 'modalOut 0.2s ease-in forwards',
        'backdrop-in': 'backdropIn 0.3s ease-out forwards',
        'backdrop-out': 'backdropOut 0.2s ease-in forwards',

        // Toast
        'toast-in': 'toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'toast-out': 'toastOut 0.3s ease-in forwards',

        // Heartbeat
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',

        // Gradient Animation
        'gradient-x': 'gradientX 3s ease infinite',
        'gradient-y': 'gradientY 3s ease infinite',
        'gradient-xy': 'gradientXY 5s ease infinite',
      },

      // ═══════════════════════════════════════════════════════════
      // 🎬 KEYFRAMES
      // ═══════════════════════════════════════════════════════════
      keyframes: {
        // Fade Keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },

        // Scale Keyframes
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)' },
        },
        scaleBounce: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },

        // Slide Keyframes
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
                slideOutBottom: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },

        // Glow Keyframes
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.4), 0 0 10px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)' },
        },
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)' 
          },
        },

        // Spin Keyframes
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },

        // Float Keyframes
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },

        // Bounce Keyframes
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },

        // Shake Keyframes
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },

        // Cosmic Keyframes
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        cosmicFloat: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -10px) rotate(2deg)' },
          '50%': { transform: 'translate(0, -20px) rotate(0deg)' },
          '75%': { transform: 'translate(-10px, -10px) rotate(-2deg)' },
        },
        starPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.2)', filter: 'brightness(1.3)' },
        },
        nebula: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },

        // Card Keyframes
        cardFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        cardDeal: {
          '0%': { transform: 'translateY(-50px) rotate(-10deg)', opacity: '0' },
          '100%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
        },
        cardHover: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-10px) scale(1.02)' },
        },

        // Shimmer Keyframes
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },

        // Typing Keyframes
        typing: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },

        // Loading Keyframes
        loadingDots: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },

        // Scan Keyframes
        scanLine: {
          '0%, 100%': { top: '0%', opacity: '1' },
          '50%': { top: '100%', opacity: '0.5' },
        },
        palmGlow: {
          '0%, 100%': { 
            filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' 
          },
          '50%': { 
            filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.8))' 
          },
        },

        // Ripple Keyframes
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },

        // Modal Keyframes
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        modalOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        backdropIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        backdropOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },

        // Toast Keyframes
        toastIn: {
          '0%': { transform: 'translateY(100%) scale(0.9)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        toastOut: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(100%) scale(0.9)', opacity: '0' },
        },

        // Heartbeat Keyframes
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },

        // Gradient Keyframes
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        gradientXY: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
        },
      },

      // ═══════════════════════════════════════════════════════════
      // ⏱️ TRANSITION TIMING FUNCTIONS
      // ═══════════════════════════════════════════════════════════
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      // ═══════════════════════════════════════════════════════════
      // ⏱️ TRANSITION DURATION
      // ═══════════════════════════════════════════════════════════
      transitionDuration: {
        '0': '0ms',
        '50': '50ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
        '1000': '1000ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      // ═══════════════════════════════════════════════════════════
      // 📱 SCREENS (BREAKPOINTS)
      // ═══════════════════════════════════════════════════════════
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'mobile': { 'max': '639px' },
        'tablet': { 'min': '640px', 'max': '1023px' },
        'desktop': { 'min': '1024px' },
        'short': { 'raw': '(max-height: 640px)' },
        'tall': { 'raw': '(min-height: 800px)' },
        'touch': { 'raw': '(hover: none)' },
        'hover-device': { 'raw': '(hover: hover)' },
        'standalone': { 'raw': '(display-mode: standalone)' },
      },

      // ═══════════════════════════════════════════════════════════
      // 🎭 Z-INDEX
      // ═══════════════════════════════════════════════════════════
      zIndex: {
        '0': '0',
        '1': '1',
        '2': '2',
        '5': '5',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
        'max': '9999',
      },

      // ═══════════════════════════════════════════════════════════
      // 📐 ASPECT RATIO
      // ═══════════════════════════════════════════════════════════
      aspectRatio: {
        'auto': 'auto',
        'square': '1 / 1',
        'video': '16 / 9',
        'portrait': '3 / 4',
        'landscape': '4 / 3',
        'card': '2 / 3',
        'tarot': '5 / 8',
        'wide': '21 / 9',
      },

      // ═══════════════════════════════════════════════════════════
      // 🖼️ BACKDROP BLUR
      // ═══════════════════════════════════════════════════════════
      backdropBlur: {
        'none': '0',
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
        'glass': '20px',
        'cosmic': '30px',
      },

      // ═══════════════════════════════════════════════════════════
      // 🌓 OPACITY
      // ═══════════════════════════════════════════════════════════
      opacity: {
        '0': '0',
        '2': '0.02',
        '3': '0.03',
        '4': '0.04',
        '5': '0.05',
        '8': '0.08',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '35': '0.35',
        '40': '0.4',
        '45': '0.45',
        '50': '0.5',
        '55': '0.55',
        '60': '0.6',
        '65': '0.65',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '85': '0.85',
        '90': '0.9',
        '95': '0.95',
        '100': '1',
      },
    },
  },    },
  },

  // ═══════════════════════════════════════════════════════════
  // 🔌 PLUGINS
  // ═══════════════════════════════════════════════════════════
  plugins: [
    // Custom Plugin: Glass Morphism Utilities
    function({ addUtilities }) {
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-purple': {
          background: 'rgba(139, 92, 246, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        },
        '.glass-card': {
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        '.glass-button': {
          background: 'rgba(139, 92, 246, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        },
      });
    },

    // Custom Plugin: Text Glow Utilities
    function({ addUtilities }) {
      addUtilities({
        '.text-glow': {
          textShadow: '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
        },
        '.text-glow-cyan': {
          textShadow: '0 0 10px rgba(0, 245, 255, 0.5), 0 0 20px rgba(0, 245, 255, 0.3)',
        },
        '.text-glow-gold': {
          textShadow: '0 0 10px rgba(251, 191, 36, 0.5), 0 0 20px rgba(251, 191, 36, 0.3)',
        },
      });
    },

    // Custom Plugin: Gradient Text Utilities
    function({ addUtilities }) {
      addUtilities({
        '.gradient-text': {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.gradient-text-gold': {
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      });
    },

    // Custom Plugin: Scrollbar Utilities
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(139, 92, 246, 0.5)',
            borderRadius: '3px',
          },
        },
      });
    },

    // Custom Plugin: Safe Area Utilities
    function({ addUtilities }) {
      addUtilities({
        '.pt-safe': { paddingTop: 'env(safe-area-inset-top)' },
        '.pb-safe': { paddingBottom: 'env(safe-area-inset-bottom)' },
        '.pl-safe': { paddingLeft: 'env(safe-area-inset-left)' },
        '.pr-safe': { paddingRight: 'env(safe-area-inset-right)' },
        '.min-h-screen-safe': {
          minHeight: 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
        },
      });
    },
  ],
};
