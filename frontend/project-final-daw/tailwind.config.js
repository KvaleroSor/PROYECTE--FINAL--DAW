/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            // colors: {
            //     // 🎨 PALETA PRINCIPAL
            //     pastelGreen: "#D9F2C2",
            //     // pastelGreen: "#EBDACC",
            //     pastelBlue: "#A7D9E7",

            //     // 🎨 SECUNDARIOS
            //     pastelMint: "#7CCFB4",
            //     pastelLilac: "#D9D3F2",

            //     // 🎨 BASE
            //     baseBg: "#FAFAF7",
            //     // baseBg: "#F9F5F1",
            //     cardBg: "#FFFFFF",
            //     verdeAzuladoOscuroBase: "#19625C",
            //     cyanBrillante: "#00C7C7",
            //     tealMedio: "#1A8B84",
            //     limaBg: "#EAF8C8",
            //     limaSoftBg: "#F3FBD9",
            //     baseVerdePastelBg: "#DDF0D9",
            //     // baseVerdePastelBg: "#DCE2EC",

            //     // 🎨 TEXTOS
            //     textPrimary: "#2F2F2F",
            //     textSecondary: "#6F6F6F",
            //     textLeftLandingPage: "#FFFFFF",

            //     // 🎨 BORDES
            //     borderSoft: "#E5E7EB",
            // },
            // borderRadius: {
            //     soft: "8px",
            //     smooth: "10px",
            // },
            // verdeAzulado: {
            //         darkest: "#0F3A38",
            //         dark: "#19625C",
            //         medium: "#1A8B84",
            //         light: "#26AFA7",
            //         bright: "#00C7C7",
            //         pastel: "#8FF2F2",
            //     },
            //     neutros: {
            //         whiteSmoke: "#F5F9F9",
            //         grayLight: "#E1ECEC",
            //         grayMedium: "#A0B8B8",
            //         grayDark: "#1C2B2B",
            //     },

            colors: {
                background: {
                    slate: "#F8FAFC",
                },
                border: {
                    slate: "#E2E8F0",
                },
                cards: {
                    slate: "#FFFFFF",
                },
                text: {
                    slate: "#0F172A",
                },
                main: {
                    indigo: "#6366F1",
                    purple: "#8B5CF6", 
                    pink: "#EC4899",
                    rose: "#F43F5E",
                    emerald: "#10B981",
                    sky: "#0EA5E9"

                },
            },
        },
    },

    plugins: [],
};

/**
 * #19625C - Verde azulado oscuro (el más oscuro)
 * #1A8B84 - Teal medio
 * #00C7C7 - Cyan brillante (el más claro/vibrante)
 */
