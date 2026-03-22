"use client";

import { useTranslations } from "next-intl";
import LanguageSelector from "@/components/LanguageSelector.jsx";
import ThemeToggle from "@/components/ThemeToggle.jsx";
import { useTheme } from "@/app/context/ThemeContext.js";
import { Plus, PencilLine } from "lucide-react";

export default function SettingsPage() {
    const t = useTranslations("settings");
    const { isDarkMode, toggleTheme } = useTheme();
    const tSettings = useTranslations("settings");

    return (
        <div className="px-2 sm:px-4 lg:px-4 py-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2 justify-start items-start p-2 sm:p-4 shadow-lg bg-slate-50 hover:shadow-md transition-all duration-300 rounded-2xl dark:bg-slate-800 max-w-full h-fit overflow-x-hidden">
                <h1 className="text-3xl text-slate-900 dark:text-slate-100">{t("title")}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t("description")}</p>
            </div>

            <div className="space-y-6">
                {/* Preferencias */}
                <div className="p-4 sm:p-6 shadow-lg bg-slate-50 hover:shadow-md transition-all duration-300 rounded-2xl dark:bg-slate-800 max-w-full overflow-x-hidden">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">{t("preferences")}</h2>

                        <div className="space-y-4">
                            {/* Idioma */}
                            <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">{t("language")}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t("languageDescription")}</p>
                                </div>
                                <LanguageSelector />
                            </div>

                            {/* Tema */}
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">{t("theme")}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t("themeDescription")}</p>
                                </div>
                                <div className="group top-4 right-4 flex justify-center items-center border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 rounded-full p-2 cursor-pointer"
                                    onClick={toggleTheme}
                                >
                                    <ThemeToggle />
                                    <span className="group ml-2 opacity-0 max-w-0 text-slate-700 dark:text-slate-200 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:opacity-100 group-hover:max-w-xs">
                                        {isDarkMode ? tSettings("lightMode") : tSettings("darkMode")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Password / Nickname */}
                <div className="p-4 sm:p-6 shadow-lg bg-slate-50 hover:shadow-md transition-all duration-300 rounded-2xl dark:bg-slate-800 max-w-full overflow-x-hidden">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">{t("title")}</h2>

                        <div className="space-y-4">
                            {/* Password */}
                            <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">{t("password")}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t("passwordDescription")}</p>
                                </div>
                                <div>
                                    <button className="flex items-center gap-2 h-10 px-3 sm:px-4 rounded-xl hover:gap-4 transition-all duration-300 shadow-lg hover:shadow-xl group bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-100 text-sm sm:text-base flex-shrink-0 border-none outline-none">
                                        <PencilLine className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>{t("changePassword")}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Nickname */}
                            <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">{t("nickname")}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t("nicknameDescription")}</p>
                                </div>
                                <div>
                                    <button className="flex items-center gap-2 h-10 px-3 sm:px-4 rounded-xl hover:gap-4 transition-all duration-300 shadow-lg hover:shadow-xl group bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-100 text-sm sm:text-base flex-shrink-0 border-none outline-none">
                                        <PencilLine className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>{t("changeNickname")}</span>
                                    </button>
                                </div>
                            </div>
                            {/* Location */}
                            <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">{t("location")}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t("locationDescription")}</p>
                                </div>
                                <div>
                                    <button className="flex items-center gap-2 h-10 px-3 sm:px-4 rounded-xl hover:gap-4 transition-all duration-300 shadow-lg hover:shadow-xl group bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-100 text-sm sm:text-base flex-shrink-0 border-none outline-none">
                                        <PencilLine className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="">{t("changeLocation")}</span>
                                    </button>
                                </div>
                            </div>
                            {/* Nomina */}
                            <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">{t("salary")}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t("salaryDescription")}</p>
                                </div>
                                <div>
                                    <button className="flex items-center gap-2 h-10 px-3 sm:px-4 rounded-xl hover:gap-4 transition-all duration-300 shadow-lg hover:shadow-xl group bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-100 text-sm sm:text-base flex-shrink-0 border-none outline-none">
                                        <PencilLine className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>{t("changeSalary")}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}