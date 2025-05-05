/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        primary: "#3DA7DC",
        secondary: "#68BAE4",
        light: {
          100: "#93CEEB",
          200: "#BEE2F3",
          300: "#E9F5FB",
        },
        dark: {
          300: "#4B809B",
          200: "#538EAC",
          100: "#75A5BD",
        },
        accent: "#E897CD",
        fontcolor: {
          lightmode: "#111C22",
          darkmode: "#E9F5FB",
        },
        background: "#030607",
      },
    },
  },
  plugins: [],
};
