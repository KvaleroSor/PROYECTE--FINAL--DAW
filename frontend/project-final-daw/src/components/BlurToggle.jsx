"use client";

import { useBlur } from "@/app/context/BlurContext";
import { EyeClosed, Eye } from "lucide-react";
import { useTranslations } from "next-intl";

const BlurToggle = () => {
    const { isBlurred, toggleTheme } = useBlur();
    const t = useTranslations("settings");

    return (
        <button
            // onClick={toggleTheme}
            className="dark:bg-slate-700 transition-all duration-300"
            aria-label={isBlurred ? t("lightMode") : t("darkMode")}
        >
            {isBlurred ? (
                <EyeClosed className="w-5 h-5 text-slate-700" />
            ) : (
                <Eye className="w-5 h-5 text-slate-700" />
            )}
        </button>
    );
};

export default BlurToggle;
