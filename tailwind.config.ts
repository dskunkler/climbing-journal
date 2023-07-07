import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "climber-purple": "#2e026d",
      },
    },
  },
  plugins: [],
} satisfies Config;
