"use client";

import { useSession } from "next-auth/react";
import { useSpends } from "@/app/context/SpendContext.js";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useSaving } from "@/app/context/SavingContext.js";
import { useFinancial } from "@/app/context/FinancialContext.js";
import FormCategory from "../category/components/FormCategory.jsx";
import GridCategories from "../category/components/GridCategories.jsx";
import CategoryByIdTemp from "../category/components/CategoryByIdTemp.jsx";
import FormSpend from "../spend/components/FormSpend.jsx";
import FormSavingGoal from "../saving/components/FormSavingGoal.jsx";
import CardsMainCategories from "./CardsMainCategories.jsx";
import GridSpends from "../spend/components/GridSpends.jsx";
import GraphicPercentatgeSpend from "./GraphicPercentatgeSpend.jsx";
import FormModifyPercentage from "../settings/components/FormModifyPercentage.jsx";
import GridInversion from "../inversion/components/GridInversion.jsx";

const Body = () => {
    const { isFormCategoryOpen } = useCategories();
    const { isFormSpendOpen } = useSpends();
    const { isFormSavingOpen } = useSaving();
    const { isFormModifyPercentageOpen } = useFinancial();

    return (
        <>
            {/* <div className="h-full grid grid-rows-[auto_auto_auto] lg:grid-rows-[3fr_2fr_5fr] sm:grid-cols-1"> */}
            <div className="h-full grid grid-rows-[auto_auto_auto]">
                {isFormCategoryOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="w-full max-w-xl max-h-xl rounded-xl bg-white dark:bg-slate-800 dark:border-2 dark:border-slate-700 p-6">
                            <FormCategory />
                        </div>
                    </div>
                )}
                {isFormSpendOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="w-full max-w-xl max-h-xl rounded-xl bg-white dark:bg-slate-800 dark:border-2 dark:border-slate-700 p-6">
                            <FormSpend />
                        </div>
                    </div>
                )}
                {isFormSavingOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6">
                            <FormSavingGoal />
                        </div>
                    </div>
                )}
                {isFormModifyPercentageOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="w-full max-w-xl max-h-xl rounded-xl bg-white dark:bg-slate-800 dark:border-2 dark:border-slate-700 p-6">
                            <FormModifyPercentage />
                        </div>
                    </div>
                )}
                <div className="flex flex-col justify-center items-center gap-2 m-2 sm:m-3 lg:m-4">
                    <CardsMainCategories />
                </div>
                <div className="pt-4 m-4 sm:m-6 lg:m-8">
                    <GridCategories />
                </div>
                <div className="w-full flex flex-row gap-6">
                    <div className="w-[60%] m-2 sm:m-3 lg:m-4">
                        {/* <Saving /> */}
                        <GridSpends />
                    </div>
                    <div className="w-[40%] m-2 sm:m-3 lg:m-4">
                        {/* Repartición de la nómina en gráfico */}
                        <GraphicPercentatgeSpend />
                    </div>
                </div>
                <div className="m-4 sm:m-6 lg:m-8">
                    <GridInversion />
                </div>
            </div>
        </>
    );
};

export default Body;
