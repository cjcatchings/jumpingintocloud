/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'max-height': 'max-height'
      },
      transitionTimingFunction: {
        'out-no-delay': 'cubic-bezier(0, 1, 0, 1)'
      },
      maxHeight: {
        '2000': '2000px',
        '8000': '8000px'
      }
    },
  },
  plugins: [],
}
