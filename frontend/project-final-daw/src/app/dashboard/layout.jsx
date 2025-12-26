"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import { CategoriesProvider } from "@/app/context/CategoryContext.js";
import { SpendProvider } from "@/app/context/SpendContext.js";
import { FinancialProvider } from "@/app/context/FinancialContext.js";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    return (
        <FinancialProvider>
            <CategoriesProvider>
                <SpendProvider>
                    <div className="min-h-screen w-full">
                        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
                            <Sidebar />

                            <div className="grid grid-rows-[80px_auto]">
                                <Header />
                                <main className="w-full h-full">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </div>
                </SpendProvider>
            </CategoriesProvider>
        </FinancialProvider>
    );
}
