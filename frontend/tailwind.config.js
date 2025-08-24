/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('././assets/images/herobackground.png')",
      },
      colors: {
        design1: '#1e646e',
        design2: '#002c2f',
        design3: '#F1F1F1',
        design4: '#E7E7E7',
        design5: '#43474E',
        design6: '#ECFDFF',
        logo: '#F25B2A',
        white: '#ffffff',
        black: '#000000',
        profile:'#212529',
      }
    },
  },
  plugins: [],
}
