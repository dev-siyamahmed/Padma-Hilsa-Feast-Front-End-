/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],

      },
      colors: {
        primary: "#e10101",
        secondary: '#616161'
      },
      textColor: {  // 🛠 Add this block for text-primary
        primary: "#e10101",
      },
       backgroundColor: {
        primary: "#e10101",
      },
    },
  },
  plugins: [],
}