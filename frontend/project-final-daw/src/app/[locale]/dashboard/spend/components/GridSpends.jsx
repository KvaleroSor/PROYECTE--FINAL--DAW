"use client";

import { useSession } from "next-auth/react";
import Spend from "./Spend.jsx";
import { useSpendsMonth } from "@/app/hooks/spend/useSpendsMonth.js";
import { useSpends } from "@/app/context/SpendContext.js";
import { useTranslations } from "next-intl";

const GridSpends = () => {
    const t = useTranslations("expenses");
    const { data: session } = useSession();
    const { isSpendsOfMonth } = useSpendsMonth();
    const { isLoading, isSpends } = useSpends();

    return (
        <>
            <div className="w-full max-w-full h-full flex flex-col gap-2 p-4 bg-slate-50 shadow-lg hover:shadow-md transition-all duration-300 rounded-2xl dark:bg-slate-800 overflow-x-hidden">
                <div className="mb-5 flex flex-col  gap-3">
                    <div className="flex flex-col items-start">
                        <h1 className="text-slate-900 dark:text-slate-100 text-xl">
                            {t("monthlyExpenses")}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            {t("monthlyExpensesList")}
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="text-slate-500 flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                            <p>{t("loading")}</p>
                        </div>
                    ) : !isSpendsOfMonth || isSpendsOfMonth.length === 0 ? (
                        <div className="text-slate-500 bg-slate-50 dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                            <p className="font-medium mb-2">{t("noExpensesThisMonth")}</p>
                            {isSpends && isSpends.length > 0 && (
                                <p className="text-sm text-slate-400">
                                    {t("totalExpensesInfo", { count: isSpends.length })}
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                <span className="font-semibold">{isSpendsOfMonth.length}</span> {t("expensesRegistered")}
                            </div>
                            <div className="max-h-[610px] overflow-y-auto flex flex-col gap-3 no-scrollbar">
                                {isSpendsOfMonth.map((spend) => (
                                    <Spend
                                        key={spend._id}
                                        spend={spend}
                                        session={session}
                                    />
                                ))}
                            </div>

                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default GridSpends;
