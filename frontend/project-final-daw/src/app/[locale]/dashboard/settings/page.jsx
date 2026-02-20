"use client";

import { useTranslations } from "next-intl";
import LanguageSelector from "@/components/LanguageSelector.jsx";
import ThemeToggle from "@/components/ThemeToggle.jsx";

export default function SettingsPage() {
    const t = useTranslations("settings");

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">{t("title")}</h1>

            <div className="space-y-6">
                {/* Preferencias */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
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
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}