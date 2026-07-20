/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        green: {
          50: '#f0f7f1',
          100: '#e6f2e7',
          200: '#cfe6d1',
          300: '#a8d4ac',
          400: '#7bbb80',
          500: '#5a9d60',
          600: '#3d8a47',
          700: '#2d6a35',
          800: '#1a3a1f',
          900: '#224d29',
          950: '#0e2713',
        },
        gold: {
          50: '#fdf8ec',
          100: '#f9edca',
          200: '#f0c96a',
          300: '#e6b94a',
          400: '#d4a52e',
          500: '#c8962a',
          600: '#a87a20',
          700: '#875f1c',
          800: '#6e4d1c',
          900: '#5e3f1f',
        },
        cream: {
          50: '#fdfcfa',
          100: '#f8f6f1',
          200: '#f2eee3',
          300: '#e9e2d0',
          400: '#ddd2b8',
          500: '#ccbfa0',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
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
      },
    },
  },
  plugins: [],
};
