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
    X,
    Repeat,
    Icon,
    MoreVertical,
    CircleX,
    SquareX,
    MoveRight,
} from "lucide-react";

const Category = ({ category, session }) => {
    const {
        setIsCategory,
        setIsUpdatedPushed,
        deleteCategory,
        setIsFormCategoryOpen,
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
    const { setIsFormSpendOpen } = useSpends();
    const { isSpends, isCategoryId, isAmount } = useSpends();
    const [isCurrentPercentagePerCategory, setIsCurrentPercentagePerCategory] = useState(0);
    const [isAmountSpendByCategory, setIsAmountSpendByCategory] = useState(0);
    // const [isValueBarToSpendCategory, setIsValueBarToSpendCategory] =
    //     useState(0);

    const {
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

    const availableColorsTagCategories = [
        {
            color: "border-indigo-400 bg-gradient-to-r from-indigo-200 to-cyan-200",
            name_category: "Gasto Fijo",
            name: "Snowflake",
        },
        {
            color: "border-teal-400 bg-gradient-to-r from-teal-100 to-teal-300",
            name_category: "Gasto Ocio",
            name: "Northern Lights",
        },
        {
            color: "border-pink-300 bg-gradient-to-r from-violet-200 to-pink-200",
            name_category: "Inversion",
            name: "Powder",
        },
        {
            color: "border-orange-300 bg-gradient-to-r from-rose-100 to-orange-200",
            name_category: "Ahorro",
            name: "Holly",
        },
    ];

    useEffect(() => {
        let isMounted = true;

        const updateData = async () => {
            if (monthly_budget) {
                setIsCurrentPercentagePerCategory(
                    calculateCategoryPercentage(
                        monthly_budget, 
                        total_acumulated
                    )
                );
                console.log("TOTAL ACUMULADO", isCurrentPercentagePerCategory);
                calculatePercentageToPercentageSettings();

                const amount = await calculateMonthlyTotalAmountSpend(category);
                console.log("ESTÁ MONTADO", isMounted);
                if (isMounted) {
                    setIsAmountSpendByCategory(amount);

                    // setIsValueBarToSpendCategory(
                    //     calculatePercentageBarCategory(
                    //         category_type,
                    //         amount,
                    //         monthly_budget
                    //     )
                    // );
                }
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
            setIsCurrentPercentagePerCategory(
                calculateCategoryPercentage(monthly_budget, total_acumulated)
            );
            calculatePercentageToPercentageSettings();           
        } else {
            const res = await deleteCategory(cat._id, session);
            console.log(res);
        }
    };

    const handleClickAddSpend = () => {
        setIsFormSpendOpen(true);
    };

    const iconCategory = availableIcons.find((i) => i.name === icon);
    const colorTag = availableColorsTagCategories.find(
        (avColor) => avColor.name_category === category_type
    );
    const Icono = iconCategory.icon;

    return (
        <>
            <div
                className="group w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={(e) => {
                    handleClick(e, category);
                }}
            >
                <div className="w-full flex items-start justify-between mb-4 transition-all duration-300 ">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <div className="flex flex-row justify-between">
                            <div
                                className={`w-12 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 border-2 bg-slate-800`}
                            >
                                {Icono && (
                                    <Icono className="w-7 h-7 text-slate-200" />
                                )}
                            </div>
                            <div className="flex justify-center items-center text-xs sm:text-sm rounded-3xl text-slate-500 m-3 p-1 px-3 bg-slate-100">
                                {category_type && colorTag && (
                                    <h3>{category_type.toUpperCase()}</h3>
                                )}
                            </div>
                        </div>
                        <div className="w-full flex-col text-gray-700">
                            <h3 className="mb-2 text-xl">{name}</h3>
                            <div className="flex flex-row gap-2">
                                <h1 className="text-2xl mb-4 text-slate-900">
                                    € {monthly_budget}
                                </h1>
                                <p className="text-slate-400">/mes</p>
                            </div>
                            <div className="mb-2 flex flex-row justify-between">
                                <p>Gastado</p>
                                <p>€ {isAmountSpendByCategory}</p>
                            </div>
                            <div className="w-full flex flex-col justify-center items-start gap-3">
                                <div className="w-full h-2.5 bg-indigo-50 rounded-full">
                                    {isCurrentPercentagePerCategory > 100 ? (
                                        <div
                                            // className="h-full bg-indigo-400 rounded-full"
                                            className="h-full bg-slate-800 rounded-full"
                                            style={{
                                                width: `100%`,
                                            }}
                                        ></div>
                                    ) : (
                                        <div
                                            // className="h-full bg-indigo-400 rounded-full"
                                            className="h-full bg-slate-800 rounded-full"
                                            style={{
                                                width: `${isCurrentPercentagePerCategory}%`,
                                            }}
                                        ></div>
                                    )}
                                </div>
                                <div className="w-full flex flex-row justify-between">
                                    <div className="flex flex-row justify-center items-center">
                                        <h3>
                                            {Number(
                                                isCurrentPercentagePerCategory
                                            ).toFixed(2)}
                                        </h3>
                                        <span className="ml-1">%</span>
                                        <span className="ml-2">usado</span>
                                    </div>
                                    <div className="flex flex-row justify-center gap-1">
                                        {calculateAvailableMoneyToSpend(
                                            monthly_budget,
                                            isAmountSpendByCategory
                                        ) ? (
                                            <span className="text-red-500 text-lg">
                                                €{" "}
                                                {Number(
                                                    monthly_budget -
                                                        isAmountSpendByCategory
                                                ).toFixed(2)}{" "}
                                                excedido
                                            </span>
                                        ) : (
                                            <span>
                                                €{" "}
                                                {Number(
                                                    monthly_budget -
                                                        isAmountSpendByCategory
                                                ).toFixed(2)}{" "}
                                                disponible
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-100 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex gap-2">
                        <button
                            className="flex-1 px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors"
                            onClick={(e) => {
                                e.stopPropagation(); 
                                console.log("Ver detalles de", name);
                            }}
                        >
                            Ver detalles
                        </button>
                        <button
                            className="flex-1 px-3 py-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("Añadir gasto a", name);
                                handleClickAddSpend();
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
