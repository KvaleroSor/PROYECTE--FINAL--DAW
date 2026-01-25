import "./globals.css";
import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
    title: "Expenses Control",
    description: "App de gestión de gastos",
};

// Layout raíz con html y body requeridos por Next.js
// El locale dinámico se establece en el layout de [locale]
export default function RootLayout({ children }) {
    return (
        <html className="h-full overflow-y-scroll no-scrollbar" suppressHydrationWarning>
            <body className={`${exo2.className} h-full`}>
                {children}
            </body>
        </html>
    );
}
