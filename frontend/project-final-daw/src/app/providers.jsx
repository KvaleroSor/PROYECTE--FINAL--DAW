"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/app/context/ThemeContext.js";
// PWA desactivado temporalmente
// import PWAInstaller from "@/components/PWAInstaller.jsx";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <ThemeProvider>
                {/* PWA desactivado temporalmente */}
                {/* <PWAInstaller /> */}
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
}
