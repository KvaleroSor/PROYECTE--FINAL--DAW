"use client";

import { useCategories } from "@/app/context/CategoryContext.js";
import { useFinancial } from "@/app/context/FinancialContext.js";
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
import { toRGBA } from "@/app/functions/toRGBA.js";

const Category = ({ category, session }) => {
    const { setIsCategory, setIsUpdatedPushed, deleteCategory, setIsFormOpen } =
        useCategories();
    const {
        isFixedExpensesFromNomina,
        isLeisureExpensesFromNomina,
        isInvestmentFromNomina,
        isSavingFromNomina,
        calculatePercentageToPercentageSettings,
        calculateMonthlyBudgetCategory,
        calculateMonthlyTotalAmountSpend,
    } = useFinancial();
    const [isTotalAmountToCategory, setIsTotalAmountToCategory] = useState(0);
    const [isAmountSpendByCategory, setIsAmountSpendByCategory] = useState(0);

    const {
        name,
        monthly_budget,
        category_type,
        total_acumulated = 0,
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
        { color: "border-indigo-400 bg-gradient-to-r from-indigo-200 to-cyan-200", name_category: "Gasto Fijo", name: "Snowflake"},
        { color: "border-teal-400 bg-gradient-to-r from-teal-100 to-teal-300", name_category: "Gasto Ocio", name: "Northern Lights"},
        { color: "border-pink-300 bg-gradient-to-r from-violet-200 to-pink-200", name_category: "Inversion", name: "Powder"},
        { color: "border-orange-300 bg-gradient-to-r from-rose-100 to-orange-200", name_category: "Ahorro", name: "Holly"},
]

    useEffect(() => {
        if (category_type && monthly_budget) {
            setIsTotalAmountToCategory(
                calculateMonthlyBudgetCategory(category_type, monthly_budget)
            );
            calculatePercentageToPercentageSettings();
            setIsAmountSpendByCategory(calculateMonthlyTotalAmountSpend(category));
        }
    }, [
        isFixedExpensesFromNomina,
        isLeisureExpensesFromNomina,
        isInvestmentFromNomina,
        isSavingFromNomina,
        calculateMonthlyBudgetCategory,
        monthly_budget,
        category_type,
    ]);

    const handleClick = async (e, cat) => {
        if (e.target.closest("button")?.id !== "button-delete") {
            setIsCategory(cat);
            console.log("CATEGORÍA ", cat);
            setIsUpdatedPushed(true);
            setIsFormOpen(true);
            setIsTotalAmountToCategory(
                calculateMonthlyBudgetCategory(category_type, monthly_budget)
            );
            calculatePercentageToPercentageSettings();
        } else {
            const res = await deleteCategory(cat._id, session);
            console.log(res);
        }
    };

    const iconCategory = availableIcons.find((i) => i.name === icon);
    const colorTag = availableColorsTagCategories.find((avColor) => avColor.name_category === category_type);
    const Icono = iconCategory.icon;

    return (
        <>
            <div
                className="w-[500px] group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={(e) => {
                    handleClick(e, category);
                }}
            >
                <div className="w-full flex items-start justify-between mb-4 transition-all duration-300 ">
                    <div className="w-full flex flex-col justify-start  gap-4">
                        <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 border-2`}
                            style={{
                                backgroundColor: toRGBA(color, 0.25),
                                border: `2px solid ${toRGBA(color, 0.6)}`,
                            }}
                        >
                            {Icono && (
                                <Icono className="w-7 h-7 text-gray-700" />
                            )}
                        </div>
                        <div className="w-full flex-col text-gray-700">
                            <h3>{name}</h3>
                            <div className="w-full flex flex-row justify-center items-center gap-3">
                                <div className="w-full h-2.5 bg-indigo-50 rounded-full">
                                    <div
                                        // className="h-full bg-indigo-400 rounded-full"
                                        className="h-full bg-gradient bg-indigo-400 to-cyan-400 rounded-full"
                                        style={{ width: `${monthly_budget}` }}
                                    ></div>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <h3>{monthly_budget}</h3>
                                    <span>%</span>
                                </div>
                            </div>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <h3>Partida Gasto</h3>
                                <MoveRight className="w-4 h-4" />
                                <span>{isTotalAmountToCategory} €</span>
                            </div>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <h3>Total Acumulado</h3>
                                <MoveRight className="w-4 h-4" />
                                <h3>{isAmountSpendByCategory} €</h3>
                            </div>
                            {category_type && colorTag && (
                                <h3 className={`w-fit p-1 rounded-lg border ${colorTag.color} text-slate-500 mt-3`}>
                                    {category_type}
                                </h3>
                            )}
                        </div>
                    </div>

                    <button
                        id="button-delete"
                        type="button"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                        // onClick={() => {handleButtonClick(category)}}
                    >
                        <CircleX className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Category;
