"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";

import Sidebar from "./components/Sidebar.jsx";
import MobileSidebar from "./components/MobileSidebar.jsx";
import Header from "./components/Header.jsx";
import { CategoriesProvider } from "@/app/context/CategoryContext.js";
import { SpendProvider } from "@/app/context/SpendContext.js";
import { FinancialProvider } from "@/app/context/FinancialContext.js";
import { SavingProvider } from "@/app/context/SavingContext.js";
import { InversionProvider } from "@/app/context/InversionContext.js";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const locale = useLocale();

    useEffect(() => {
        if (status === "unauthenticated") {
            // Redirigir a la landing con el locale actual
            router.push(locale === "es" ? "/" : `/${locale}`);
        }
    }, [status, router, locale]);

    return (
        <CategoriesProvider>
            <SpendProvider>
                <FinancialProvider>
                    <SavingProvider>
                        <InversionProvider>
                            <div className="min-h-screen w-full overflow-x-hidden">
                                <Sidebar />
                                <MobileSidebar />
                                <div className="md:ml-60 flex-1 flex flex-col w-full">
                                    <Header />
                                    <main className="flex-1 w-full overflow-x-hidden">
                                        {children}
                                    </main>
                                </div>
                            </div>
                        </InversionProvider>
                    </SavingProvider>
                </FinancialProvider>
            </SpendProvider>
        </CategoriesProvider>
    );
}
