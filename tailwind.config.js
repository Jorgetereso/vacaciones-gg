/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        jorge: {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
        },
        german: {
          DEFAULT: '#f97316',
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
        },
        both: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
        },
        holiday: {
          DEFAULT: '#f43f5e',
          50: '#fff1f2',
          100: '#ffe4e6',
        },
      },
    },
  },
  plugins: [],
};
