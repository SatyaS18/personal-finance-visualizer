/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./node_modules/shadcn-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(214, 32%, 91%)", // Default shadcn border color
        background: "hsl(220, 14%, 96%)", // Light background color
        foreground: "hsl(222.2, 84%, 4%)", // Default foreground color
      },
    },
  },
  plugins: [],
};
