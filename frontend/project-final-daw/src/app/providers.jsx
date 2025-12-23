"use client";

import { SessionProvider } from "next-auth/react";
import { FinancialProvider } from "./context/FinancialContext.js";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <FinancialProvider>{children}</FinancialProvider>
        </SessionProvider>
    );
}
