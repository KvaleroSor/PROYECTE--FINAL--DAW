"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/app/context/ThemeContext.js";
import PWAInstaller from "@/components/PWAInstaller.jsx";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <ThemeProvider>
                <PWAInstaller />
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
}
