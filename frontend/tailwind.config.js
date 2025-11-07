import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        'brand-purple': '#2a0d45',
        'brand-light-purple': '#4f2a6f',
        'brand-pink': '#9d4edd',
      },
      animation: {
        'subtle-shine': 'subtle-shine 10s infinite ease-in-out',
      },
      keyframes: {
        'subtle-shine': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
