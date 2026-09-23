import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-fill": "rgba(157, 49, 51, 0.31)",
      },
      fontFamily: {
        sfPro: ["var(--font-sfPro)", "sans-serif"],
        sfReg: ["var(--font-sfReg)", "sans-serif"],
        monumentExt: ["var(--font-monumentExt)", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        UncialAntiqua: ["var(--font-UncialAntiqua)", "sans-serif"],
        PalanquinDark: ["var(--font-PalanquinDark)", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(135deg, rgba(210, 212, 214, 0.70) 0%, rgba(166, 165, 173, 0.70) 13%, rgba(138, 137, 150, 0.40) 43%, rgba(17, 10, 20, 0.3) 66%, rgba(17, 10, 20, 0.45) 74%, rgba(17, 10, 20, 0.8) 100%)",
      },
      screens: {
        xs: "500px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [tailwindcssAnimate],
};
export default config;
