"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/app/context/ThemeContext.js";
import { BlurProvider } from "./context/BlurContext";
// PWA desactivado temporalmente
// import PWAInstaller from "@/components/PWAInstaller.jsx";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <ThemeProvider>
                <BlurProvider>
                    {/* PWA desactivado temporalmente */}
                    {/* <PWAInstaller /> */}
                    {children}
                </BlurProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
