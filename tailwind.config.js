/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00D4FF',
        'neon-purple': '#7B61FF',
        'neon-green': '#00FF88',
        'dark-900': 'rgb(var(--bg-primary) / <alpha-value>)',
        'dark-800': 'rgb(var(--bg-secondary) / <alpha-value>)',
        'dark-700': 'rgb(var(--bg-tertiary) / <alpha-value>)',
        'dark-600': 'rgb(var(--bg-quaternary) / <alpha-value>)',
        'glass': 'rgb(var(--glass-bg) / <alpha-value>)',
        'glass-border': 'rgb(var(--glass-border) / <alpha-value>)',
        white: 'rgb(var(--text-white) / <alpha-value>)',
        slate: {
          400: 'rgb(var(--text-secondary) / <alpha-value>)',
          500: 'rgb(var(--text-muted) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'typing': 'typing 3.5s steps(30, end)',
        'blink': 'blink 0.75s step-end infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'neural-pulse': 'neural-pulse 2s ease-in-out infinite',
        'float-slow': 'float-slow 10s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '33%': { transform: 'translate(30px, -20px)' },
          '66%': { transform: 'translate(-20px, 15px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(0, 212, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.15), 0 0 40px rgba(0, 212, 255, 0.05)',
          },
          '50%': {
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.5), 0 0 30px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.15)',
          },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00D4FF' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'neural-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
