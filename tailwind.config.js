module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        hero: 'url(\'/images/college-girl.jfif\')',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
