/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      // Basic colors
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',

      // Mafia Noir Heist Color System
      noir: {
        50:  '#f5f5f5',
        100: '#e5e5e5',
        200: '#c2c2c2',
        300: '#a3a3a3',
        400: '#737373',
        500: '#4a4a4a',
        600: '#2f2f2f',
        700: '#1f1f1f',
        800: '#141414',
        900: '#0a0a0a',
      },
      blood: {
        500: '#8b0000',
        600: '#600000',
        700: '#3b0000',
      },
      gold: {
        300: '#ffd166',
        400: '#e6b422',
        500: '#b8860b',
      },
      emerald: {
        400: '#50c878',
        500: '#046307',
      },
      royal: {
        400: '#9370db',
        500: '#663399',
      },
      rarity: {
        common: '#737373',
        uncommon: '#046307',
        rare: '#9370db',
        epic: '#8b0000',
        legendary: '#e6b422',
      },

      // Fallback colors for compatibility (minimal set)
      gray: {
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      red: {
        500: '#ef4444',
        600: '#dc2626',
      },
      green: {
        500: '#22c55e',
        600: '#16a34a',
      },
      yellow: {
        500: '#eab308',
      },

      // Mafia Noir semantic mappings
      primary: '#8b0000',
      'primary-hover': '#b8860b',
      'primary-active': '#b8860b',
      background: '#0a0a0a',
      surface: '#141414',
      text: '#c2c2c2',
      'text-secondary': '#999999',
      border: '#b8860b',
      'card-border': '#b8860b',
      error: '#8b0000',
      success: '#046307',
      warning: '#e6b422',
      info: '#663399',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Primary UI text
        serif: ['Cinzel Decorative', 'serif'], // Elegant headers for mafia theme
        header: ['Cinzel Decorative', 'serif'], // Corporate titles
        mono: ['JetBrains Mono', 'Consolas', 'monospace'], // Data displays
        base: 'var(--font-family-base)', // Legacy support
      },
      boxShadow: {
        noir: '0 0 10px rgba(139, 0, 0, 0.4)',
        'noir-lg': '0 0 20px rgba(139, 0, 0, 0.6)',
        gold: '0 0 10px rgba(230, 180, 34, 0.4)',
        'gold-lg': '0 0 20px rgba(230, 180, 34, 0.6)',
        emerald: '0 0 10px rgba(4, 99, 7, 0.4)',
        royal: '0 0 10px rgba(147, 112, 219, 0.4)',
        // Legacy support
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        'inset-sm': 'var(--shadow-inset-sm)',
        focus: 'var(--focus-ring)',
      },
      keyframes: {
        pulseNoir: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(139, 0, 0, 0.4)' },
          '50%': { boxShadow: '0 0 16px rgba(139, 0, 0, 0.8)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(230, 180, 34, 0.4)' },
          '50%': { boxShadow: '0 0 16px rgba(230, 180, 34, 0.8)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulseNoir: 'pulseNoir 2s infinite',
        pulseGold: 'pulseGold 2s infinite',
        fadeInUp: 'fadeInUp 0.3s ease-out',
        'pulse-game': 'pulse 0.3s ease-in-out', // Legacy support
      },
      // Legacy support
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
      },
      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      lineHeight: {
        tight: 'var(--line-height-tight)',
        normal: 'var(--line-height-normal)',
      },
      letterSpacing: {
        tight: 'var(--letter-spacing-tight)',
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        4: 'var(--space-4)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        32: 'var(--space-32)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        base: 'var(--radius-base)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
      },
      maxWidth: {
        'container-sm': 'var(--container-sm)',
        'container-md': 'var(--container-md)',
        'container-lg': 'var(--container-lg)',
        'container-xl': 'var(--container-xl)',
      },
    },
  },
  plugins: [],
};
