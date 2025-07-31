/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind');
const { addIconSelectors } = require('@iconify/tailwind');

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./index.html",
     "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    addDynamicIconSelectors(),
    addIconSelectors(['mdi', 'mdi-light']),
    require('@iconify/tailwind'),
  ],
}

