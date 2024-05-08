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
        '5xl': ['83px', {lineHeight: '120%', fontFamily: 'bai'}], // text-h1
        '4xl': ['67px', {lineHeight: '120%', fontFamily: 'bai'}],
        '3xl': ['51px', {lineHeight: '120%', fontFamily: 'bai'}],
        '2xl': ['40px', {lineHeight: '120%', fontFamily: 'bai'}],
        xl: ['28px', {lineHeight: '120%', fontFamily: 'bai'}],
        baseline: ['22px', {lineHeight: '150%', fontFamily: 'bai'}],
        cardTitle: ['28px', {lineHeight: '150%', fontFamily: 'bai'}],
        paragraph: ['18px', {lineHeight: '150%', fontFamily: 'work'}],
        buttonLabelBody: ['18px', {lineHeight: '150%', fontFamily: 'work'}],
        buttonLabelNav: ['16px', {lineHeight: '150%', fontFamily: 'work'}],
        smallText: ['14px', {lineHeight: '130%', fontFamily: 'work'}],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
