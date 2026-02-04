"use client";

import { useFinancial } from "@/app/context/FinancialContext.js";
import { useSavingsRealTime } from "@/app/hooks/saving/useSavingsRealTime.js";
import { useTranslations } from "next-intl";
import { PencilLine } from "lucide-react";

const GraphicPercentatgeSpend = () => {
    const t = useTranslations("percentageChart");
    const tCommon = useTranslations("common");
    const { isPercentageSettings, isNomina, isFixedExpensesFromNomina, isLeisureExpensesFromNomina, isInvestmentFromNomina, isSavingFromNomina, setIsFormModifyPercentageOpen } = useFinancial();
    const fixedPercentage = isPercentageSettings.fixedExpenses;
    const leisurePercentage = isPercentageSettings.leisureExpenses;
    const investmentPercentage = isPercentageSettings.investment;
    const savingsPercentage = isPercentageSettings.savings;
    const { isTotalImprevistosPercentatge, isTotalImprevistos } = useSavingsRealTime();

    const handleClickEditPercentageSettings = () => {
        setIsFormModifyPercentageOpen(true);
    };

    return (
        <>
            <div className="h-full flex flex-col gap-4 p-4 bg-slate-50 shadow-lg hover:shadow-md transition-all duration-300 rounded-2xl dark:bg-slate-800">
                <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-3 mb-6">
                    <div className="flex flex-col justify-start items-start">
                        <h1 className="text-slate-900 dark:text-slate-100 text-lg sm:text-xl">{t("title")}</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("subtitle")}</p>
                    </div>
                    <button className="border-2 border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 sm:px-4 bg-slate-800 dark:bg-slate-400 text-slate-100 flex flex-row justify-center items-center gap-2 hover:gap-3 dark:hover:bg-slate-500 transition-all duration-300 flex-shrink-0 text-sm sm:text-base"
                        onClick={handleClickEditPercentageSettings}
                    >
                        <PencilLine className="w-4 h-4" />
                        <span>{tCommon("edit")}</span>
                    </button>
                </div>
                <div className="flex flex-row justify-center items-center mb-10">
                    <div className="flex justify-center items-center rounded-l-xl w-full h-15 p-2 sm:p-3 bg-slate-600 dark:bg-slate-600 text-white dark:text-slate-100 text-xs sm:text-sm"><span>{fixedPercentage}%</span></div>
                    <div className="flex justify-center items-center w-full h-15 p-2 sm:p-3 bg-slate-500 dark:bg-blue-800 text-white dark:text-slate-100 text-xs sm:text-sm"><span>{leisurePercentage}%</span></div>
                    <div className="flex justify-center items-center w-full h-15 p-2 sm:p-3 bg-sky-500 dark:bg-teal-800 text-white dark:text-slate-100 text-xs sm:text-sm"><span>{investmentPercentage}%</span></div>
                    <div className="flex justify-center items-center w-full h-15 p-2 sm:p-3 bg-cyan-500 dark:bg-green-800 text-white dark:text-slate-100 text-xs sm:text-sm"><span>{savingsPercentage}%</span></div>
                    <div className="flex justify-center items-center rounded-r-xl w-full h-15 p-2 sm:p-3 bg-slate-400 dark:bg-slate-700 text-white dark:text-slate-100 text-xs sm:text-sm"><span>{isTotalImprevistosPercentatge}%</span></div>
                </div>
                <div className="flex flex-col justify-start items-start gap-6 sm:gap-10 mb-10">
                    <div className="w-full flex flex-row justify-center items-center gap-2 sm:gap-4">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-600 dark:bg-slate-600 flex-shrink-0">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-2 sm:gap-4">
                            <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">{t("fixedExpense")}</p>
                            <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex-shrink-0">
                                <p>{fixedPercentage}%</p>
                                <p className="whitespace-nowrap">€{Number(isFixedExpensesFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-2 sm:gap-4">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 flex flex-row justify-center items-center rounded-full bg-slate-500 dark:bg-blue-800 flex-shrink-0">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-2 sm:gap-4">
                            <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">{t("leisureExpense")}</p>
                            <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex-shrink-0">
                                <p>{leisurePercentage}%</p>
                                <p className="whitespace-nowrap">€{Number(isLeisureExpensesFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-2 sm:gap-4">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 flex flex-row justify-center items-center rounded-full bg-sky-500 dark:bg-teal-800 flex-shrink-0">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-2 sm:gap-4">
                            <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">{t("investment")}</p>
                            <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex-shrink-0">
                                <p>{investmentPercentage}%</p>
                                <p className="whitespace-nowrap">€{Number(isInvestmentFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-2 sm:gap-4">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 flex flex-row justify-center items-center rounded-full bg-cyan-500 dark:bg-green-800 flex-shrink-0">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-2 sm:gap-4">
                            <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">{t("savings")}</p>
                            <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex-shrink-0">
                                <p>{savingsPercentage}%</p>
                                <p className="whitespace-nowrap">€{Number(isSavingFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-2 sm:gap-4">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 flex flex-row justify-center items-center rounded-full bg-slate-400 dark:bg-slate-700 flex-shrink-0">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-2 sm:gap-4">
                            <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">{t("unexpected")}</p>
                            <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex-shrink-0">
                                <p>{isTotalImprevistosPercentatge}%</p>
                                <p className="whitespace-nowrap">€{Number(isTotalImprevistos).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-start items-center gap-2 sm:gap-4">
                    <h1 className="text-sm sm:text-base text-slate-500 dark:text-slate-400">{t("monthlySalary")}</h1>
                    <p className="text-lg sm:text-2xl text-slate-900 dark:text-slate-100">€{Number(isNomina).toFixed(2)}</p>
                </div>
            </div>
        </>
    );
};

export default GraphicPercentatgeSpend;