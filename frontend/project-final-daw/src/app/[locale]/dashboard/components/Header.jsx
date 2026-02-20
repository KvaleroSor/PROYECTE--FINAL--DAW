"use client";

import { Search, Plus, Bell } from "lucide-react";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useSpends } from '@/app/context/SpendContext.js';
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import ThemeToggle from "@/components/ThemeToggle.jsx";
import LanguageSelector from "@/components/LanguageSelector.jsx";
import { useTheme } from "@/app/context/ThemeContext.js";
import { useBlur } from "@/app/context/BlurContext";
import BlurToggle from "@/components/BlurToggle";

const Header = () => {
    const { data: session, status } = useSession();
    const { setIsFormCategoryOpen } = useCategories();
    const { setIsFormSpendOpen } = useSpends();
    const t = useTranslations("header");
    const tSettings = useTranslations("settings");
    const { isDarkMode, toggleTheme } = useTheme();
    const { isBlurred, blurToggle } = useBlur();

    return (
        <>
            <header className="relative w-full lg:fixed lg:top-0 lg:left-60 lg:right-0 lg:w-auto z-30 min-h-[80px] lg:h-[100px] flex justify-center items-center bg-slate-50 dark:bg-slate-800 transition-colors duration-300 px-2 sm:px-4 lg:px-6 mr-2 sm:mr-4 lg:mr-4">
                <div className="w-full h-full flex flex-row justify-between items-center dark:bg-slate-800 shadow-lg hover:shadow-md transition-all duration-300 py-3 rounded-xl">
                    <div className="flex-1 ml-0 lg:ml-4">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl text-slate-900 dark:text-slate-100">{t("title")}</h1>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hidden sm:block">{t("subtitle")}</p>
                    </div>
                    <div className="flex justify-end items-center gap-2 sm:gap-4 md:gap-6">
                        {/* <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 hidden sm:block" /> */}
                        <div className="group top-4 right-4 flex justify-center items-center border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 rounded-full p-2 cursor-pointer">
                            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 hidden sm:block" />
                            <span className="group ml-2 opacity-0 max-w-0 text-slate-700 dark:text-slate-200 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:opacity-100 group-hover:max-w-xs">
                                {tSettings("notifications")}
                            </span>
                        </div>
                        <div className="group top-4 right-4 flex justify-center items-center border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 rounded-full p-2 cursor-pointer"
                            onClick={toggleTheme}
                        >
                            <ThemeToggle />
                            <span className="group ml-2 opacity-0 max-w-0 text-slate-700 dark:text-slate-200 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:opacity-100 group-hover:max-w-xs">
                                {isDarkMode ? tSettings("lightMode") : tSettings("darkMode")}
                            </span>
                        </div>
                        <div className="group top-4 right-4 flex justify-center items-center border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 rounded-full p-2 cursor-pointer"
                            onClick={blurToggle}
                        >
                            <BlurToggle />
                            <span className="group ml-2 opacity-0 max-w-0 text-slate-700 dark:text-slate-200 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:opacity-100 group-hover:max-w-xs">
                                {isBlurred ? tSettings("unblur") : tSettings("blur")}
                            </span>
                        </div>
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
