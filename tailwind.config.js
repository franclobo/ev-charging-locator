/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#0bc224",
        light: "#3cd955",
        lighter: "#6eeb87",
        dark: "#09901b",
        darker: "#066a14",
        hover: "#0aa320",
        focus: "#08831c",
      },
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      white: "#fff",
      "white-transparent": "#ffffff87"
    },
    fontFamily: {
      outfitBlack: ["Outfit-Black", "sans-serif"],
      outfitBold: ["Outfit-Bold", "sans-serif"],
      outfitExtraBold: ["Outfit-ExtraBold", "sans-serif"],
      outfitExtraLight: ["Outfit-ExtraLight", "sans-serif"],
      outfitLight: ["Outfit-Light", "sans-serif"],
      outfitMedium: ["Outfit-Medium", "sans-serif"],
      outfitRegular: ["Outfit-Regular", "sans-serif"],
      outfitSemiBold: ["Outfit-SemiBold", "sans-serif"],
      outfitThin: ["Outfit-Thin", "sans-serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

