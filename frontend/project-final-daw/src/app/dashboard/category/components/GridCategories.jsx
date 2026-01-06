"use client";

import { useCategories } from "@/app/context/CategoryContext.js";
import { useSpends } from "@/app/context/SpendContext.js";
import { useFinancial } from "@/app/context/FinancialContext.js";
import { useState, useEffect } from "react";
import Category from "./Category.jsx";
import { useSession } from "next-auth/react";
import { Search, Plus, Bell } from "lucide-react";

const GridCategories = () => {
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

            const totalSpend = isCategories.reduce(
                (acc, cat) => acc + (cat.total_acumulated || 0),
                0
            );
            setIsShowTotalSpend(totalSpend);
        } else {
            setIsShowTotalAvailable(0);
            setIsShowTotalSpend(0);
        }
    }, [isCategories]);

    return (
        <>
            <div className="p-4 sm:p-6">
                <div className="mb-5 flex flex-row justify-between">
                    <div className="flex flex-col items-start">
                        <h1 className="text-slate-900 text-xl">
                            Categoria de Gastos
                        </h1>
                        <p className="text-slate-500">
                            Distribución del mes actual
                        </p>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-5">
                        <div className="flex flex-col">
                            <h1 className="text-2xl text-slate-900">
                                € {Number(isShowTotalSpend).toFixed(2)}
                            </h1>
                            {evaluateTotalAmountToSpend() !== false ? (
                                <h1 className="text-red-500">
                                    de €{" "}
                                    {Number(
                                        isTotalAmountToSpendFixedAndLeisure
                                    ).toFixed(2)}
                                </h1>
                            ) : (
                                <h1 className="text-slate-500">
                                    de €{" "}
                                    {Number(
                                        isTotalAmountToSpendFixedAndLeisure
                                    ).toFixed(2)}
                                </h1>
                            )}
                        </div>
                        <button
                            className="flex items-center gap-2 h-10 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group bg-slate-800 text-slate-200 hover:from-slate-200 to-purple-200"
                            onClick={handleClickButtonFormCategory}
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Crear Categoria</span>
                        </button>
                    </div>
                </div>
                {!isCategories ||
                    isCategories.length === 0 ||
                    (isLoading && (
                        <>
                            <div>
                                <p>No hay categorías todavía.</p>;
                            </div>
                        </>
                    ))}
                {isCategories && isCategories.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
