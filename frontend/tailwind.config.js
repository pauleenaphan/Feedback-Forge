/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-blue': '0px 10px 0px #0056B3' // Custom colored shadow
      },
      fontFamily: {
        heading: ['Work Sans', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

