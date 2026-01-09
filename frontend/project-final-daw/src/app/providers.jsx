"use client";

import { SessionProvider } from "next-auth/react";
import { FinancialProvider } from "./context/FinancialContext.js";
import  { SpendProvider }  from "./context/SpendContext.js";
import  { CategoriesProvider }  from "./context/CategoryContext.js"; 

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <CategoriesProvider>
                <SpendProvider>
                    <FinancialProvider>{children}</FinancialProvider>
                </SpendProvider>
            </CategoriesProvider>
        </SessionProvider>
    );
}
