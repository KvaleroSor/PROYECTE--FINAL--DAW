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
            <header className="sticky top-0 z-30 h-[100px] flex justify-center items-center bg-white dark:bg-slate-800 transition-colors duration-300 mx-4 mb-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6 lg:mt-8 rounded-2xl">
                <div className="w-full h-full flex flex-row justify-center items-center rounded-xl shadow-2xl hover:shadow-md transition-all duration-300">
                    <div className="w-full ml-4">
                        <h1 className="text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">{t("title")}</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{t("subtitle")}</p>
                    </div>
                    <div className="w-full flex justify-end items-center gap-6 mr-4">
                        <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <ThemeToggle />
                        <LanguageSelector />
                        <div className="flex flex-col border-l border-slate-500 dark:border-slate-600 pl-3">
                            <h1 className="text-slate-900 dark:text-slate-100">{session?.user?.name}</h1>
                            <p className="text-slate-600 dark:text-slate-400">{session?.user?.email}</p>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
