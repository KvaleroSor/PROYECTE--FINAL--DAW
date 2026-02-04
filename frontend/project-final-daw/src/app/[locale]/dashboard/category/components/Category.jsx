"use client";

import { useCategories } from "@/app/context/CategoryContext.js";
import { useFinancial } from "@/app/context/FinancialContext.js";
import { useSpends } from "@/app/context/SpendContext.js";
import { useState, useEffect } from "react";
import {
    Plus,
    ShoppingCart,
    Home,
    Car,
    Utensils,
    Heart,
    Smartphone,
    Palette,
} from "lucide-react";

const Category = ({ category, session }) => {
    const {
        setIsCategory,
        setIsUpdatedPushed,
        deleteCategory,
        setIsFormCategoryOpen,
        setIsCategoryType
    } = useCategories();
    const {
        isFixedExpensesFromNomina,
        isLeisureExpensesFromNomina,
        isInvestmentFromNomina,
        isSavingFromNomina,
        calculatePercentageToPercentageSettings,
        calculateCategoryPercentage,
        calculateMonthlyTotalAmountSpend,
        calculatePercentageBarCategory,
        calculateAvailableMoneyToSpend,
    } = useFinancial();
    const {
        isSpends,
        isCategoryId,
        isAmount,
        setIsFormSpendOpen,
        setIsCategoryId,
    } = useSpends();

    const [isCurrentPercentagePerCategory, setIsCurrentPercentagePerCategory] =
        useState(0);
    const [isAmountSpendByCategory, setIsAmountSpendByCategory] = useState(0);

    const {
        _id,
        name,
        monthly_budget,
        category_type,
        total_acumulated,
        color,
        icon,
    } = category;

    const availableIcons = [
        { icon: ShoppingCart, name: "ShoppingCart" },
        { icon: Home, name: "Home" },
        { icon: Car, name: "Car" },
        { icon: Utensils, name: "Utensils" },
        { icon: Heart, name: "Heart" },
        { icon: Smartphone, name: "Smartphone" },
        { icon: Palette, name: "Palette" },
        { icon: Plus, name: "Plus" },
    ];

    useEffect(() => {
        let isMounted = true;

        const updateData = async () => {
            if (monthly_budget) {
                setIsCurrentPercentagePerCategory(
                    calculateCategoryPercentage(
                        monthly_budget,
                        isAmountSpendByCategory
                    )
                );
                calculatePercentageToPercentageSettings();

                const amount = await calculateMonthlyTotalAmountSpend(category);

                if (isMounted) {
                    setIsAmountSpendByCategory(amount);
                }
                setIsCategoryType(category_type);
            }
        };

        updateData();

        return () => {
            isMounted = false;
        };
    }, [
        isFixedExpensesFromNomina,
        isLeisureExpensesFromNomina,
        isInvestmentFromNomina,
        isSavingFromNomina,
        isAmountSpendByCategory,
        calculateCategoryPercentage,
        monthly_budget,
        category_type,
        category,
        isSpends,
    ]);

    const handleClick = async (e, cat) => {
        if (e.target.closest("button")?.id !== "button-delete") {
            setIsCategory(cat);
            console.log("CATEGORÍA ", cat);
            setIsUpdatedPushed(true);
            setIsFormCategoryOpen(true);
            setIsCategoryType(cat.category_type);
            setIsCurrentPercentagePerCategory(
                calculateCategoryPercentage(monthly_budget, isAmountSpendByCategory)
            );
            calculatePercentageToPercentageSettings();
        } else {
            try {
                const res = await deleteCategory(cat._id, session);
            } catch (err) {
                console.error(err);
                return;
            }
        }
    };

    const handleClickAddSpend = () => {
        setIsFormSpendOpen(true);
    };

    const handleClickRemoveCategory = async () => {
        try {
            await deleteCategory(category._id, session);
        } catch (err) {
            console.error(err);
            return;
        }
    };

    const iconCategory = availableIcons.find((i) => i.name === icon);
    const Icono = iconCategory.icon;

    return (
        <>
            <div
                className="group w-full bg-white dark:bg-slate-700 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-md transition-all duration-300 overflow-hidden flex-shrink-0 cursor-pointer mb-4 sm:mb-10"
                onClick={(e) => {
                    handleClick(e, category);
                }}
            >
                <div className="w-full flex items-start justify-between mb-3 sm:mb-4 transition-all duration-300">
                    <div className="w-full flex flex-col justify-start gap-3 sm:gap-4">
                        <div className="flex flex-row justify-between items-center">
                            <div
                                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 border-2 bg-slate-800 dark:bg-slate-600 dark:border-slate-500 flex-shrink-0"
                            >
                                {Icono && (
                                    <Icono className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-slate-200" />
                                )}
                            </div>
                            <div className="flex justify-center items-center text-xs rounded-3xl text-slate-500 dark:text-slate-300 p-1 px-2 sm:px-3 bg-slate-100 dark:bg-slate-800">
                                {category_type && (
                                    <h3>{category_type.toUpperCase()}</h3>
                                )}
                            </div>
                        </div>
                        <div className="w-full flex-col text-gray-700 dark:text-gray-300">
                            <h3 className="mb-2 text-base sm:text-lg lg:text-xl text-slate-900 dark:text-slate-100 truncate">{name}</h3>
                            <div className="flex flex-row gap-1 sm:gap-2 items-baseline">
                                <h1 className="text-xl sm:text-2xl mb-2 sm:mb-4 text-slate-900 dark:text-slate-100">
                                    €{monthly_budget}
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">/mes</p>
                            </div>
                            <div className="mb-2 flex flex-row justify-between text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                <p>Gastado</p>
                                <p>€{isAmountSpendByCategory}</p>
                            </div>
                            <div className="w-full flex flex-col justify-center items-start gap-2 sm:gap-3">
                                <div className="w-full h-2 sm:h-3 bg-slate-100 dark:bg-slate-700 rounded-full border-2 dark:border-slate-800">
                                    {isCurrentPercentagePerCategory > 100 ? (
                                        <div
                                            className="h-full bg-slate-500 rounded-full"
                                            style={{
                                                width: `100%`,
                                            }}
                                        ></div>
                                    ) : (
                                        <div
                                            className="h-full bg-slate-500 rounded-full"
                                            style={{
                                                width: `${isCurrentPercentagePerCategory}%`,
                                            }}
                                        ></div>
                                    )}
                                </div>
                                <div className="w-full flex flex-row justify-between text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                    <div className="flex flex-row justify-center items-center">
                                        <h3>
                                            {Number(
                                                isCurrentPercentagePerCategory
                                            ).toFixed(2)}
                                        </h3>
                                        <span className="ml-1">%</span>
                                        <span className="ml-1 sm:ml-2">usado</span>
                                    </div>
                                    <div className="flex flex-row justify-center gap-1">
                                        {calculateAvailableMoneyToSpend(
                                            monthly_budget,
                                            isAmountSpendByCategory
                                        ) ? (
                                            <span className="text-red-500 dark:text-red-400 text-sm sm:text-base whitespace-nowrap">
                                                €{Number(
                                                    monthly_budget -
                                                    isAmountSpendByCategory
                                                ).toFixed(2)} excedido
                                            </span>
                                        ) : (
                                            <span className="text-slate-700 dark:text-slate-300 text-sm sm:text-base whitespace-nowrap">
                                                €{Number(
                                                    monthly_budget -
                                                    isAmountSpendByCategory
                                                ).toFixed(2)} disponible
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-700 pt-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <button
                            className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-700 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClickRemoveCategory();
                            }}
                        >
                            Eliminar Categoria
                        </button>
                        <button
                            className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-900 dark:bg-slate-600 hover:bg-slate-800 dark:hover:bg-slate-500 text-white rounded-lg transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClickAddSpend();
                                setIsCategoryId(_id);
                            }}
                        >
                            Añadir gasto
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
