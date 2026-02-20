"use client";

import { useTheme } from "@/app/context/ThemeContext.js";
import { Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const t = useTranslations("settings");

    return (
        <button
            // onClick={toggleTheme}
            className="dark:bg-slate-700 transition-all duration-300"
            aria-label={isDarkMode ? t("lightMode") : t("darkMode")}
        >
            {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
                <Moon className="w-5 h-5 text-slate-700" />
            )}
        </button>
    );
};

export default ThemeToggle;
