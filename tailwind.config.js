/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#298FF1",
          regular: "#00509C",
        },
        secondary: {
          light: "#9CCCFB",
          regular: "#0074E2",
        },
        accent: {
          light: "#C671D5",
          regular: "#882299",
        },
      },
      fontFamily: {
        body: ['"Open Sans"'],
      },
      dropShadow: {
        text: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      screens: {
        xs: "320px", //smallest phone screen
        sm: "640px",
        md: "768px",
        lg: "1024px",
        home: "1060px", // custom screen for Home page
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".instagram-gradient": {
          background:
            "var(--tw-bg-opacity, 1) var(--tw-gradient-from), var(--tw-bg-opacity, 1) var(--tw-gradient-stops)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
      });
    },
  ],
};
