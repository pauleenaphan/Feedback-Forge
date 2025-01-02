/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-gray': '0 10px 0px rgba(126, 126, 126, 0.5)' // Custom colored shadow
      }
    },
  },
  plugins: [],
}

