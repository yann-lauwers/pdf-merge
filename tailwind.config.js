module.exports = {
  mode: "jit",
  purge: ['./public/**/*.html',
     './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        embie: ["embie"]
      },
      backgroundColor: {
        "blue-embie": "rgba(22,22,68)",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
