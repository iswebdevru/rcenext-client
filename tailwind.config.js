/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        accent: colors.violet,
        readable: colors.zinc,
        secondary: colors.indigo,
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({
      nocompatible: true,
    }),
  ],
  darkMode: 'class',
};
