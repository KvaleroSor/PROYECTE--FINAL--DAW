"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import { CategoriesProvider } from "@/app/context/CategoryContext.js";
import { SpendProvider } from "@/app/context/SpendContext.js";
import { FinancialProvider } from "@/app/context/FinancialContext.js";
import { SavingProvider } from "@/app/context/SavingContext.js";
import { InversionProvider } from "@/app/context/InversionContext.js";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    return (
        <CategoriesProvider>
            <SpendProvider>
                <FinancialProvider>
                    <SavingProvider>
                        <InversionProvider>
                            <div className="min-h-screen w-full">
                                <div className="flex">
                                    <Sidebar />
                                    <div className="flex-1 flex flex-col">
                                        <Header />
                                        <main className="flex-1">
                                            {children}
                                        </main>
                                    </div>
                                </div>
                            </div>
                        </InversionProvider>
                    </SavingProvider>
                </FinancialProvider>
            </SpendProvider>
        </CategoriesProvider>
    );
}
