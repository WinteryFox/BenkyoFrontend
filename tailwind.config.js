module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: "false", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#8e8ec1",
          700: "#7171ad"
        }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
