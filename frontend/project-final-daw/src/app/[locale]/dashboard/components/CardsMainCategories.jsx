"use client";

import { Wallet, TrendingDown, PartyPopper, Landmark } from "lucide-react";
import { useFinancial } from "@/app/context/FinancialContext.js";
import { useLeisureSpendTotalAvailable } from "@/app/hooks/spend/useLeisureSpendTotalAvailable.js";
import { useFixedSpendTotalAvailable } from "@/app/hooks/spend/useFixedSpendTotalAvailable.js";
import { useInversionRealTime } from "@/app/hooks/inversion/useInversionRealTime.js";
import { useSaving } from "@/app/context/SavingContext.js";
import { useSpends } from "@/app/context/SpendContext.js";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const CardsMainCategories = () => {
    const t = useTranslations("cards");
    const { isTotalSavingsRealTime } = useSaving();
    const { isSpends } = useSpends();

    // Hooks personalizados
    const { isAvailableLeisure } = useLeisureSpendTotalAvailable();
    // const { isTotalInversionRealTime } = useInversionRealTime();
    const { isAvailableFixed } = useFixedSpendTotalAvailable();

    // Estados del componente
    const [isTotalSpends, setIsTotalSpends] = useState(0);

    useEffect(() => {
        if (isSpends && isSpends.length > 0) {
            const totalSpendsAmountMonth = isSpends.filter((spend) => {
                const spendDate = new Date(spend.date);
                return spendDate.getMonth() === new Date().getMonth() && spendDate.getFullYear() === new Date().getFullYear();
            }).reduce((acc, current) => acc + current.amount, 0);

            setIsTotalSpends(totalSpendsAmountMonth);
        }
    }, [isSpends]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full gap-3 sm:gap-4">
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h1 className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("savings")}</h1>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            €{Number(isTotalSavingsRealTime).toFixed(2)}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("totalSaved")}</p>
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h1 className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("spent")}</h1>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            €{Number(isTotalSpends).toFixed(2)}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("thisMonth")}</p>
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h1 className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("available")}</h1>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            €{Number(isAvailableFixed).toFixed(2)}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("fixed")}</p>
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h1 className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("available")}</h1>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            €{Number(isAvailableLeisure).toFixed(2)}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("leisure")}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardsMainCategories;
