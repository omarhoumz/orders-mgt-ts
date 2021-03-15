module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        cam: '568px',
      },
      maxHeight: {
        's-12/3': '66.6666vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
