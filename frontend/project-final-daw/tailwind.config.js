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
