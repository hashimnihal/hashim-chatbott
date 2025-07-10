/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
 theme: {
 extend: {
  boxShadow: {
    glow: "0 0 20px #22d3ee",
  },
  animation: {
    "fade-in": "fadeIn 1s ease-out",
    "slide-up": "slideUp 0.4s ease-out",
  },
  keyframes: {
    fadeIn: {
      from: { opacity: "0" },
      to: { opacity: "1" },
    },
    slideUp: {
      from: { transform: "translateY(20px)", opacity: "0" },
      to: { transform: "translateY(0)", opacity: "1" },
    },
  },
},

},

  plugins: [],
}


