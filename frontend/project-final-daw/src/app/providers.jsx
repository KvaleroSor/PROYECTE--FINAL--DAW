"use client";

import { SessionProvider } from "next-auth/react";
import { FinancialProvider } from "./context/FinancialContext.js";
import  { SpendProvider }  from "./context/SpendContext.js";
import  { CategoriesProvider }  from "./context/CategoryContext.js";
import  { SavingProvider }  from "./context/SavingContext.js";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <CategoriesProvider>
                <SpendProvider>
                    <FinancialProvider>
                        <SavingProvider>{children}</SavingProvider>
                    </FinancialProvider>
                </SpendProvider>
            </CategoriesProvider>
        </SessionProvider>
    );
}
