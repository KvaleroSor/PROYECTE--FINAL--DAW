"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition, useState } from "react";
import { routing } from "@/i18n/routing";
import { Globe, Check } from "lucide-react";

export default function LanguageSelector() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("languages");

    const handleChange = (newLocale) => {
        if (newLocale === locale) return;
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });
        setIsOpen(false);
    };

    const languageNames = {
        en: t("en"),
        es: t("es"),
        ca: t("ca")
    };

    const secureHandleMouseLeave = () => {
        if (isOpen) {
            setTimeout(() => {
                setIsOpen(false);
            }, 2000);
        }
    }

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={secureHandleMouseLeave}
            onClick={() => setIsOpen(false)}
        >
            <div className="flex justify-center items-center border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 rounded-full p-2 cursor-pointer">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                <span className="ml-2 opacity-0 max-w-0 text-slate-700 dark:text-slate-200 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:opacity-100 group-hover:max-w-xs">
                    {languageNames[locale]}
                </span>
            </div>

            {isOpen && (
                <div className="absolute group top-full right-0 mt-2 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg shadow-lg overflow-hidden min-w-[140px] z-50">
                    {routing.locales.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => handleChange(loc)}
                            disabled={isPending}
                            className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors ${locale === loc ? 'bg-slate-50 dark:bg-slate-600' : ''
                                } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <span className="text-sm text-slate-700 dark:text-slate-200">
                                {languageNames[loc]}
                            </span>
                            {locale === loc && (
                                <Check className="w-4 h-4 text-blue-500" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}