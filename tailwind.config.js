/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        olive: {
          50: '#f7f8f1',
          100: '#ecefe0',
          200: '#d8dec4',
          300: '#bcc797',
          400: '#9eac6a',
          500: '#828f4c',
          600: '#647038',
          700: '#4d582f',
          800: '#3f4829',
          900: '#363e26',
          950: '#1b2110',
        },
        clay: {
          50: '#faf6f1',
          100: '#f2e8da',
          200: '#e4cbb0',
          300: '#d2a87e',
          400: '#c28756',
          500: '#b66e3f',
          600: '#a55a34',
          700: '#8a472d',
          800: '#713a29',
          900: '#5e3125',
          950: '#341812',
        },
        forest: {
          50: '#f2f7f2',
          100: '#dfecdf',
          200: '#c0d8c1',
          300: '#95bb98',
          400: '#67986c',
          500: '#487b4d',
          600: '#36623c',
          700: '#2c4e32',
          800: '#263f2b',
          900: '#203525',
          950: '#0d1c10',
        },
        cream: {
          50: '#fdfcfa',
          100: '#faf6ee',
          200: '#f4ebd8',
          300: '#ecdcb8',
          400: '#e1c590',
          500: '#d4ab67',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
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
