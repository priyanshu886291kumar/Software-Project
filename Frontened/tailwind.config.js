// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // This tells Tailwind to scan your source files for class names
  ],
  theme: {
    extend: {
      colors: {
        background: "#1B1B1B",       // Custom background color
        primary: "#FFFFFF",          // Custom primary text color
        accent: "#F97316",           // Custom accent color
        'accent-hover': "#EA580C",   // Accent color for hover state
        secondary: "#9CA3AF",        // Custom secondary text color
      },
      // You can add custom fonts, spacing, etc. here as well.
    },
  },
  plugins: [],
}
