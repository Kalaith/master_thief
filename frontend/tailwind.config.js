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

      // High-Tech Heist Noir Color System (Payday-inspired)
      // Core background colors
      heist: {
        darkest: '#0B0F17',   // Main background
        darker: '#0D121C',    // Background gradient end
        dark: '#111827',      // Elevated surfaces
        panel: '#161B22',     // HUD panels
        border: '#1F2937',    // Panel borders
      },

      // Tailwind standard colors needed for components
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
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
      },
      green: {
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
      },
      blue: {
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      },
      yellow: {
        400: '#facc15',
        500: '#eab308',
      },
      purple: {
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
      },
      cyan: {
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
      },
      amber: {
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
      },
      emerald: {
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
      },
      slate: {
        400: '#94a3b8',
        600: '#475569',
        700: '#334155',
      },

      // Rarity system with subtle high-tech aesthetic
      rarity: {
        common: '#94a3b8',      // Slate
        uncommon: '#34d399',    // Emerald
        rare: '#60a5fa',        // Blue
        epic: '#c084fc',        // Purple
        legendary: '#fbbf24',   // Amber
      },

      // Semantic color mappings for high-tech heist theme
      primary: '#22d3ee',          // Cyan-400 (neon accent)
      'primary-hover': '#06b6d4',  // Cyan-500
      'primary-active': '#0891b2', // Cyan-600
      background: '#0B0F17',       // Darkest heist
      surface: '#161B22',          // Panel
      text: '#e5e7eb',             // Gray-200
      'text-secondary': '#9ca3af', // Gray-400
      border: '#1F2937',           // Heist border
      'card-border': '#1F2937',    // Heist border
      error: '#ef4444',            // Red-500
      success: '#22c55e',          // Green-500
      warning: '#fbbf24',          // Amber-400
      info: '#c084fc',             // Purple-400
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Primary UI text
        mono: ['JetBrains Mono', 'Consolas', 'monospace'], // HUD data displays
        display: ['Rajdhani', 'system-ui', 'sans-serif'], // High-tech headers
        base: 'var(--font-family-base)', // Legacy support
      },
      boxShadow: {
        // High-tech heist glow effects
        'cyan-glow': '0 0 10px rgba(34, 211, 238, 0.3)',
        'cyan-glow-lg': '0 0 20px rgba(34, 211, 238, 0.5)',
        'purple-glow': '0 0 10px rgba(192, 132, 252, 0.3)',
        'purple-glow-lg': '0 0 20px rgba(192, 132, 252, 0.5)',
        'amber-glow': '0 0 10px rgba(251, 191, 36, 0.3)',
        'amber-glow-lg': '0 0 20px rgba(251, 191, 36, 0.5)',
        'hud-panel': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        // Legacy support
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        'inset-sm': 'var(--shadow-inset-sm)',
        focus: 'var(--focus-ring)',
      },
      keyframes: {
        pulseCyan: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(34, 211, 238, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)' },
        },
        pulseAmber: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(251, 191, 36, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        hudBoot: {
          '0%': { opacity: '0', transform: 'scaleY(0)' },
          '50%': { opacity: '0.5', transform: 'scaleY(1.02)' },
          '100%': { opacity: '1', transform: 'scaleY(1)' },
        },
      },
      animation: {
        'pulse-cyan': 'pulseCyan 2s ease-in-out infinite',
        'pulse-amber': 'pulseAmber 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'hud-boot': 'hudBoot 0.5s ease-out',
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
