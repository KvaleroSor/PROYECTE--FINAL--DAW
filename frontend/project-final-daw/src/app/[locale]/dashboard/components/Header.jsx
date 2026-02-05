"use client";

import { Search, Plus, Bell } from "lucide-react";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useSpends } from '@/app/context/SpendContext.js';
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import ThemeToggle from "@/components/ThemeToggle.jsx";
import LanguageSelector from "@/components/LanguageSelector.jsx";

const Header = () => {
    const { data: session, status } = useSession();
    const { setIsFormCategoryOpen } = useCategories();
    const { setIsFormSpendOpen } = useSpends();
    const t = useTranslations("header");

    return (
        <>
            <header className="relative w-full md:fixed md:top-0 md:left-60 md:right-0 md:w-auto z-30 min-h-[80px] md:h-[100px] flex justify-center items-center bg-slate-50 dark:bg-slate-800 transition-colors duration-300 px-2 sm:px-4 lg:px-6 mr-4 sm:mr-4 lg:mr-4">
                <div className="w-full h-full flex flex-row justify-between items-center shadow-lg hover:shadow-md transition-all duration-300 py-3 rounded-xl">
                    <div className="flex-1 ml-0 md:ml-4">
                        <h1 className="text-xl sm:text-2xl md:text-3xl text-slate-900 dark:text-slate-100">{t("title")}</h1>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hidden sm:block">{t("subtitle")}</p>
                    </div>
                    <div className="flex justify-end items-center gap-2 sm:gap-4 md:gap-6">
                        {/* <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 hidden sm:block" /> */}
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 hidden sm:block" />
                        <ThemeToggle />
                        <LanguageSelector />
                        <div className="hidden lg:flex flex-col border-l border-slate-500 dark:border-slate-600 pl-3 m-2">
                            <h1 className="text-md text-slate-900 dark:text-slate-100">{session?.user?.name}</h1>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{session?.user?.email}</p>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
