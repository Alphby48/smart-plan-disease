/** @type {import('tailwindcss').Config} */
module.exports = {
  // Masukkan semua file tempat kamu menulis komponen
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Jaga-jaga jika ada file di luar src
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
