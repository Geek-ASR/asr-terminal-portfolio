/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0B0F0C',
          text: '#C9FFD5',
          accent: '#00FF88',
          secondary: '#6EE7B7',
          error: '#FF5F56',
          warning: '#FFBD2E',
          link: '#4FD1C5',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(0, 255, 136, 0.2)',
      },
    },
  },
  plugins: [],
};
