import "./globals.css";
import { Exo_2 } from "next/font/google";
import Providers from "./providers.jsx";

const exo2 = Exo_2({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
    title: "Expenses Control",
    description: "App de gestión de gastos",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full overflow-y-scroll no-scrollbar">
            <body className={`${exo2.className} h-full`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
