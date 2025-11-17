/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // 🎨 PALETA PRINCIPAL
                pastelGreen: "#D9F2C2",
                pastelBlue: "#A7D9E7",

                // 🎨 SECUNDARIOS
                pastelMint: "#7CCFB4",
                pastelLilac: "#D9D3F2",

                // 🎨 BASE
                baseBg: "#FAFAF7",
                cardBg: "#FFFFFF",

                // 🎨 TEXTOS
                textPrimary: "#2F2F2F",
                textSecondary: "#6F6F6F",

                // 🎨 BORDES
                borderSoft: "#E5E7EB",
            },
            borderRadius: {
                soft: "8px",
                smooth: "10px",
            },
        },
    },
    plugins: [],
};
