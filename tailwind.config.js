/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════
      // 🎨 COSMIC COLOR PALETTE
      // ═══════════════════════════════════════════════════════════
      colors: {
        // Primary Cosmic Colors
        cosmic: {
          900: '#0a0a1a',
          850: '#0d0d24',
          800: '#10102e',
          750: '#141438',
          700: '#181842',
          650: '#1c1c4c',
          600: '#202056',
          550: '#242460',
          500: '#28286a',
          450: '#2c2c74',
          400: '#30307e',
          350: '#343488',
          300: '#383892',
          250: '#3c3c9c',
          200: '#4040a6',
          150: '#4444b0',
          100: '#4848ba',
          50: '#5252c4',
        },

        // Midnight Blue Shades
        midnight: {
          950: '#020617',
          900: '#0f172a',
          850: '#131c33',
          800: '#1e293b',
          750: '#243044',
          700: '#334155',
          650: '#3d4a5e',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        },

        // Deep Purple Shades
        mystic: {
          950: '#1a0a2e',
          900: '#2d1b4e',
          850: '#362258',
          800: '#3f2a62',
          750: '#48316c',
          700: '#513976',
          650: '#5a4080',
          600: '#63488a',
          500: '#7c5dac',
          400: '#9678c4',
          300: '#b094dc',
          200: '#cab0f4',
          150: '#d9c5f9',
          100: '#e8dbfd',
          50: '#f5f0ff',
        },

        // Accent Glow Colors
        glow: {
          cyan: '#00f5ff',
          blue: '#4d9fff',
          purple: '#a855f7',
          pink: '#ec4899',
          violet: '#8b5cf6',
          indigo: '#6366f1',
          neon: '#00ffff',
          soft: '#7dd3fc',
        },

        // Gradient Stop Colors
        gradient: {
          start: '#1e1b4b',
          middle: '#312e81',
          end: '#4c1d95',
          cosmic1: '#0f0c29',
          cosmic2: '#302b63',
          cosmic3: '#24243e',
        },

        // Zodiac Element Colors
        element: {
          fire: '#ef4444',
          earth: '#84cc16',
          air: '#38bdf8',
          water: '#06b6d4',
        },

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
        slideOutBottom
