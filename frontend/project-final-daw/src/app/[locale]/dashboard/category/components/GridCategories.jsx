"use client";

import { useCategories } from "@/app/context/CategoryContext.js";
import { useSpends } from "@/app/context/SpendContext.js";
import { useFinancial } from "@/app/context/FinancialContext.js";
import { useState, useEffect } from "react";
import Category from "./Category.jsx";
import { useSession } from "next-auth/react";
import { Search, Plus, Bell } from "lucide-react";
import { useTranslations } from "next-intl";

const GridCategories = () => {
    const t = useTranslations("categories");
    const { data: session } = useSession();
    const { isCategories, isLoading, setIsFormCategoryOpen, fetchCategories } =
        useCategories();
    const { isTotalAmountToSpendFixedAndLeisure } = useFinancial();
    const [isData, setIsData] = useState(null);
    const [isShowTotalSpend, setIsShowTotalSpend] = useState(0);
    const [isShowTotalAvailable, setIsShowTotalAvailable] = useState(0);
    const { isSpends } = useSpends();

    const evaluateTotalAmountToSpend = () => {
        return isShowTotalSpend > isTotalAmountToSpendFixedAndLeisure;
    };

    const handleClickButtonFormCategory = () => {
        setIsFormCategoryOpen(true);
    };

    useEffect(() => {
        if (session?.user?.user_id) {
            fetchCategories();
        }
    }, [isSpends, session]);

    useEffect(() => {
        if (isCategories && isCategories.length > 0) {
            const totalBudget = isCategories.reduce(
                (acc, cat) => acc + (cat.monthly_budget || 0),
                0
            );
            setIsShowTotalAvailable(totalBudget);

            const totalSpendsAmountMonth = isSpends.filter((spend) => {
                const spendDate = new Date(spend.date);
                return spendDate.getMonth() === new Date().getMonth() && spendDate.getFullYear() === new Date().getFullYear();
            }).reduce((acc, current) => acc + current.amount, 0);

            setIsShowTotalSpend(totalSpendsAmountMonth);
        } else {
            setIsShowTotalAvailable(0);
            setIsShowTotalSpend(0);
        }
    }, [isCategories]);

    return (
        <>
            <div className="p-4 sm:p-6 shadow-lg bg-slate-50 hover:shadow-md transition-all duration-300 rounded-2xl dark:bg-slate-800 max-w-full overflow-x-hidden">
                <div className="mb-5 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex flex-col items-start">
                            <h1 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">
                                {t("title")}
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                {t("monthlyDistribution")}
                            </p>
                        </div>
                        <button
                            className="flex items-center gap-2 h-10 px-3 sm:px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group bg-slate-800 dark:bg-slate-400 text-slate-100 text-sm sm:text-base flex-shrink-0"
                            onClick={handleClickButtonFormCategory}
                        >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                            <span>{t("addCategory")}</span>
                        </button>
                    </div>
                    <div className="flex flex-col items-end">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100">
                            €{Number(isShowTotalSpend).toFixed(2)}
                        </h1>
                        {evaluateTotalAmountToSpend() !== false ? (
                            <h1 className="text-sm sm:text-base text-red-500 dark:text-red-400">
                                {t("of")} €{Number(isTotalAmountToSpendFixedAndLeisure).toFixed(2)}
                            </h1>
                        ) : (
                            <h1 className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                                {t("of")} €{Number(isTotalAmountToSpendFixedAndLeisure).toFixed(2)}
                            </h1>
                        )}
                    </div>
                </div>
                {!isCategories ||
                    isCategories.length === 0 ||
                    (isLoading && (
                        <>
                            <div>
                                <p className="text-slate-600 dark:text-slate-400">{t("noCategories")}</p>
                            </div>
                        </>
                    ))}
                {isCategories && isCategories.length > 0 && (
                    // ACABAR DE AJUSTAR LA ALTRUA DE LA CAJA PARA QUE QUEPAN AL MENOS 2 TARJETAS EN VERTICAL
                    <div className="max-h-[800px] grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 overflow-y-auto no-scrollbar">
                        {isCategories?.map((category) => (
                            <Category
                                key={category.id}
                                category={category}
                                session={session}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default GridCategories;
