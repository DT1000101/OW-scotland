import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tweed Valley Senduro brand palette (from logo)
        olive: {
          DEFAULT: "#3a4a2f",
          dark: "#1e2a1f",
          darker: "#151d15",
          light: "#5a6b47",
        },
        sand: {
          DEFAULT: "#efe6d3",
          muted: "#d8ccb0",
        },
        send: {
          // vibrant orange from "SENDURO"
          DEFAULT: "#e8722a",
          dark: "#c85c1a",
          light: "#f2954f",
        },
        // Third accent — khaki from "TWEED VALLEY" logo text; pairs with orange send.
        valley: {
          DEFAULT: "#c4b891",
          dark: "#8d8468",
          light: "#d2c9ac",
        },
        thistle: "#6b4c8a",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
