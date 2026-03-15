"use client";

import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useTheme } from "@/app/context/ThemeContext.js";
import {
    Sparkles,
    Zap,
    Shield,
    Heart,
} from "lucide-react";
import { useTranslations } from "next-intl";

import FormLogin from "./FormLogin.jsx";

const LandingPage = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const t = useTranslations("landing");
    const tSettings = useTranslations("settings");

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* //PART ESQUERRA */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-background-slate dark:bg-slate-800 p-14 transition-colors duration-300">
                <div className="w-full max-w-xl flex flex-col gap-8">
                    <h3 className="text-[4rem] font-light text-slate-900 dark:text-slate-100">
                        {t("mainTitle")}
                    </h3>

                    <p className="text-[1.8rem] font-light text-slate-700 dark:text-slate-300">
                        {t("mainDescription1")}
                        <br />
                        <br />
                        {t("mainDescription2")}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-10 sm:mt-12">
                        <div className="bg-white/20 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/30 dark:hover:bg-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border-slate dark:border-slate-600 shadow-lg hover:shadow-2xl">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 dark:bg-slate-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-200" />
                            </div>
                            <p className="text-xl mb-2 font-light text-slate-800 dark:text-slate-100">
                                {t("card1Title")}
                            </p>
                            <p className="text-lg font-light text-slate-600 dark:text-slate-300">
                                {t("card1Description")}
                            </p>
                        </div>
                        <div className="bg-white/20 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/30 dark:hover:bg-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border-slate dark:border-slate-600 shadow-lg hover:shadow-2xl">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 dark:bg-slate-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-200" />
                            </div>
                            <p className="text-xl mb-2 font-light text-slate-800 dark:text-slate-100">
                                {t("card2Title")}
                            </p>
                            <p className="text-lg font-light text-slate-600 dark:text-slate-300">
                                {t("card2Description")}
                            </p>
                        </div>
                        <div className="bg-white/20 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/30 dark:hover:bg-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border-slate dark:border-slate-600 shadow-lg hover:shadow-2xl">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 dark:bg-slate-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-200" />
                            </div>
                            <p className="text-xl mb-2 font-light text-slate-800 dark:text-slate-100">
                                {t("card3Title")}
                            </p>
                            <p className="text-lg font-light text-slate-600 dark:text-slate-300">
                                {t("card3Description")}
                            </p>
                        </div>
                        <div className="bg-white/20 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/30 dark:hover:bg-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border-slate dark:border-slate-600 shadow-lg hover:shadow-2xl">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 dark:bg-slate-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-200" />
                            </div>
                            <p className="text-xl mb-2 font-light text-slate-800 dark:text-slate-100">
                                {t("card4Title")}
                            </p>
                            <p className="text-lg font-light text-slate-600 dark:text-slate-300">
                                {t("card4Description")}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 sm:mt-12 flex flex-wrap gap-6 sm:gap-8">
                        <FaInstagram className="text-2xl sm:text-3xl mb-1 text-gray-600 dark:text-slate-400 cursor-pointer hover:rotate-180 tranisition-transform duration-300 hover:text-gray-800 dark:hover:text-slate-200" />
                        <FaFacebook className="text-2xl sm:text-3xl mb-1 text-gray-600 dark:text-slate-400 cursor-pointer hover:rotate-180 tranisition-transform duration-300 hover:text-gray-800 dark:hover:text-slate-200" />
                        <FaXTwitter className="text-2xl sm:text-3xl mb-1 text-gray-600 dark:text-slate-400 cursor-pointer hover:rotate-180 tranisition-transform duration-300 hover:text-gray-800 dark:hover:text-slate-200" />

                    </div>
                </div>
            </div>
            {/* //PART DRETA */}
            <div className="relative lg:w-1/2 bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-8 lg:p-16 transition-colors duration-300">
                <div className="absolute group top-4 right-4 flex justify-center items-center hover:gap-2 hover:border-2 hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-full p-2 cursor-pointer"
                    onClick={toggleTheme}
                >
                    <ThemeToggle />
                    <span className="group opacity-0 max-w-0 text-slate-700 dark:text-slate-200 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:opacity-100 group-hover:max-w-xs group-hover:ml-2">
                        {isDarkMode ? tSettings("lightMode") : tSettings("darkMode")}
                    </span>

                </div>
                <div className="absolute group top-14 right-2">
                    <LanguageSelector />
                </div>
                <div className="max-w-lg w-full border border-slate-200 dark:border-slate-700 p-10 rounded-xl shadow-2xl bg-white dark:bg-slate-800">
                    <div className="mb-10">
                        <h1 className="text-6xl mb-2 text-gray-800 dark:text-slate-100 pb-2 font-light">
                            {t("appTitle")}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-slate-400">
                            {t("loginSubtitle")}
                        </p>
                    </div>
                    <FormLogin />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
