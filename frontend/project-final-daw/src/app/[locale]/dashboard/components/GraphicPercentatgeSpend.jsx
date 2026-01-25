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
            <div className="flex flex-col gap-4 p-4">
                <div className="w-full h-full flex flex-row justify-between items-start">
                    <div className="w-full h-full flex flex-col justify-start items-start mb-10">
                        <h1 className="text-slate-900 dark:text-slate-100 text-xl">{t("title")}</h1>
                        <p className="text-slate-500 dark:text-slate-400">{t("subtitle")}</p>
                    </div>
                    <div className="w-full h-full flex flex-row justify-end items-end">
                        <button className="border-2 border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 mr-2 bg-slate-800 dark:bg-slate-400 text-slate-100 dark:text-slate-100 flex flex-row justify-center items-center gap-2 hover:gap-4 dark:hover:bg-slate-500 transition-all duration-300"
                            onClick={handleClickEditPercentageSettings}
                        >
                            <PencilLine className="w-4 h-4" />
                            <span>{tCommon("edit")}</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center mb-10 mx-6">
                    <div className="flex justify-center items-center rounded-l-xl w-full h-15 p-3 bg-slate-600 dark:bg-slate-600 text-white dark:text-slate-100"><span>{fixedPercentage} %</span></div>
                    <div className="flex justify-center items-center w-full h-15 p-3 bg-slate-500 dark:bg-blue-800 text-white dark:text-slate-100"><span>{leisurePercentage} %</span></div>
                    <div className="flex justify-center items-center w-full h-15 p-3 bg-sky-500 dark:bg-teal-800 text-white dark:text-slate-100"><span>{investmentPercentage} %</span></div>
                    <div className="flex justify-center items-center w-full h-15 p-3 bg-cyan-500 dark:bg-green-800 text-white dark:text-slate-100"><span>{savingsPercentage} %</span></div>
                    <div className="flex justify-center items-center rounded-r-xl w-full h-15 p-3 bg-slate-400 dark:bg-slate-700 text-white dark:text-slate-100"><span>{isTotalImprevistosPercentatge} %</span></div>
                </div>
                <div className="flex flex-col justify-start items-start gap-10 mx-6 mb-10">
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="w-5 h-5 rounded-full bg-slate-600 dark:bg-slate-600">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-slate-900 dark:text-slate-100">{t("fixedExpense")}</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-slate-700 dark:text-slate-300">
                                <p>{fixedPercentage} %</p>
                                <p>€ {Number(isFixedExpensesFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center rounded-full bg-slate-500 dark:bg-blue-800">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-slate-900 dark:text-slate-100 pr-4">{t("leisureExpense")}</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-slate-700 dark:text-slate-300">
                                <p>{leisurePercentage} %</p>
                                <p>€ {Number(isLeisureExpensesFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center rounded-full bg-sky-500 dark:bg-teal-800">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-slate-900 dark:text-slate-100 pr-4">{t("investment")}</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-slate-700 dark:text-slate-300">
                                <p>{investmentPercentage} %</p>
                                <p>€ {Number(isInvestmentFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center rounded-full bg-cyan-500 dark:bg-green-800">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-slate-900 dark:text-slate-100 pr-4">{t("savings")}</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-slate-700 dark:text-slate-300">
                                <p>{savingsPercentage} %</p>
                                <p>€ {Number(isSavingFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center rounded-full bg-slate-400 dark:bg-slate-700">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-slate-900 dark:text-slate-100 pr-4">{t("unexpected")}</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-slate-700 dark:text-slate-300">
                                <p>{isTotalImprevistosPercentatge} %</p>
                                <p>€ {Number(isTotalImprevistos).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-start items-center gap-4">
                    <h1 className="text-slate-500 dark:text-slate-400">{t("monthlySalary")}</h1>
                    <p className="text-slate-900 dark:text-slate-100 text-2xl">€{Number(isNomina).toFixed(2)}</p>
                </div>
            </div>
        </>
    );
};

export default GraphicPercentatgeSpend;