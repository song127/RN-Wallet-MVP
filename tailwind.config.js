/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#111111",
        primary: "#111111",
        primaryLight: "#333333",
        primaryDark: "#000000",
        accent: "#10B981",
        error: "#EF4444",
        text: "#111111",
        textSecondary: "#6B7280",
        textOnDark: "#FFFFFF",
        border: "#E5E7EB",
        borderDark: "#222222",
        disabled: "#D1D5DB",
        tabInactive: "#9CA3AF",
        tabActive: "#111111",
      },
      fontSize: {
        h1: [
          28,
          { lineHeight: "36px", letterSpacing: "0.2px", fontWeight: "700" },
        ],
        h2: [
          22,
          { lineHeight: "28px", letterSpacing: "0.1px", fontWeight: "600" },
        ],
        h3: [18, { lineHeight: "24px", fontWeight: "600" }],
        body: [16, { lineHeight: "22px", fontWeight: "400" }],
        bodyBold: [16, { lineHeight: "22px", fontWeight: "600" }],
        caption: [
          13,
          { lineHeight: "18px", fontWeight: "400", color: "#6B7280" },
        ],
      },
    },
  },
  plugins: [],
};
