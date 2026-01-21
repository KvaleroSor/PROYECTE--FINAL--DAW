"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/app/context/ThemeContext.js";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
    );
}
