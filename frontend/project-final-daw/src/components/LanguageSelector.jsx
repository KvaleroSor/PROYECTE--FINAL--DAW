"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";

export default function LanguageSelector() {
    const t = useTranslations("languages");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleChange = (newLocale) => {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });
    };

    return (
        <div className="relative inline-block">
            <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <select
                    value={locale}
                    onChange={(e) => handleChange(e.target.value)}
                    disabled={isPending}
                    className="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 pr-8 text-sm cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50"
                >
                    {routing.locales.map((loc) => (
                        <option key={loc} value={loc}>
                            {t(loc)}
                        </option>
                    ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
