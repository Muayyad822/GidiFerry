/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'waterway-blue': '#0070C0',
        'sky-blue': '#0BD6FF',
        'pure-white': '#FFFFFF',
      }
    },
  },
  plugins: [],
}
