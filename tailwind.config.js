/** @type {import('tailwindcss').Config} */
const themed = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: themed('--t-bg'),
          text: themed('--t-text'),
          accent: themed('--t-accent'),
          secondary: themed('--t-secondary'),
          link: themed('--t-link'),
          error: '#FF5F56',
          warning: '#FFBD2E',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgb(var(--t-accent) / 0.2)',
        'glow-lg': '0 0 60px rgb(var(--t-accent) / 0.15)',
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [],
};
