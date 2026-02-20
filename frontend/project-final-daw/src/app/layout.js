import "./globals.css";
import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
    title: "Expenses Control",
    description: "App de gestión de gastos, ahorros e inversiones",
    // PWA desactivado temporalmente
    // manifest: "/manifest.json",
    // appleWebApp: {
    //     capable: true,
    //     statusBarStyle: "default",
    //     title: "ExpControl",
    // },
    formatDetection: {
        telephone: false,
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#1e293b" },
    ],
};

// Layout raíz con html y body requeridos por Next.js
// El locale dinámico se establece en el layout de [locale]
export default function RootLayout({ children }) {
    return (
        <html
            className="no-scrollbar h-full overflow-x-hidden overflow-y-scroll"
            suppressHydrationWarning
        >
            <head>
                {/* PWA metas desactivados temporalmente */}
                {/* <meta name="mobile-web-app-capable" content="yes" /> */}
                {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
                {/* <meta name="apple-mobile-web-app-status-bar-style" content="default" /> */}
            </head>
            <body className={`${exo2.className} h-full max-w-full overflow-x-hidden`}>
                {children}
            </body>
        </html>
    );
}
