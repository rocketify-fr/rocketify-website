/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rDark: '#222A2B',
        rGreen: '#99E800',
        rGreenHover: '#B1FF1A',
        rPurple: '#C29FFC',
        rPurpleHover: '#E3D2FE',
        rTurquoise: '#2FCCC8',
        rAzure: '#E1FCFF',
        rDeepBlue: '#0B134F',
      },
      fontFamily: {
        bai: ['Bai Jamjuree', 'sans-serif'], // font-bai
        work: ['Work Sans', 'sans-serif'], // font-work
      },
      fontSize: {
        h1: ['83px', {lineHeight: '99.6px', fontFamily: 'bai'}], // text-h1
        h2: ['67px', {lineHeight: '80.4px', fontFamily: 'bai'}],
        h3: ['51px', {lineHeight: '61.2px', fontFamily: 'bai'}],
        h4: ['40px', {lineHeight: '48px', fontFamily: 'bai'}],
        h5: ['28px', {lineHeight: '33.6px', fontFamily: 'bai'}],
        cardTitle: ['28px', {lineHeight: '42px', fontFamily: 'bai'}],
        paragraph: ['18px', {lineHeight: '27px', fontFamily: 'work'}],
        buttonLabelBody: ['18px', {lineHeight: '27px', fontFamily: 'work'}],
        buttonLabelNav: ['16px', {lineHeight: '24px', fontFamily: 'work'}],
        smallText: ['14px', {lineHeight: '18.2px', fontFamily: 'work'}],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
