/** @type {import('tailwindcss').Config} */
import { colors } from './app/utils/colors'

const gaps = [0, 4, 8, 12, 16]

const safelist = gaps
  .flatMap((size) => [`gap-${size}`, `gap-y-${size}`, `gap-x-${size}`])
  .concat(
    Object.keys(colors).flatMap((color) => [`bg-${color}`, `fill-${color}`])
  )

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  safelist,
  darkMode: 'class',
  theme: {
    extend: {
      colors,
      fontFamily: {
        bai: ['Bai Jamjuree', 'sans-serif'], // font-bai
        work: ['Work Sans', 'sans-serif'], // font-work
      },
      fontSize: {
        '7xl': ['83px', { lineHeight: '120%', fontFamily: 'bai' }], // text-h1
        '6xl': ['72px', { lineHeight: '120%', fontFamily: 'bai' }], // text-h1
        '5xl': ['67px', { lineHeight: '120%', fontFamily: 'bai' }],
        '4xl': ['51px', { lineHeight: '120%', fontFamily: 'bai' }],
        '3xl': ['40px', { lineHeight: '120%', fontFamily: 'bai' }],
        '2xl': ['32px', { lineHeight: '120%', fontFamily: 'bai' }],
        xl: ['28px', { lineHeight: '120%', fontFamily: 'bai' }],
        cartTitle: ['28px', { lineHeight: '150%', fontFamily: 'bai' }],
        blockHeader: ['56px', { lineHeight: '68px' }],
        lg: ['22px', { lineHeight: '150%', fontFamily: 'bai' }],
        paragraph: ['18px', { lineHeight: '150%', fontFamily: 'work' }],
        md: ['18px', { lineHeight: '150%', fontFamily: 'work' }],
        sm: ['16px', { lineHeight: '150%', fontFamily: 'work' }],
        xs: ['14px', { lineHeight: '130%', fontFamily: 'work' }],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
