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
            <div className="h-full grid grid-rows-[auto_auto_auto] max-w-full overflow-x-hidden">
                {isFormCategoryOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-slate-800 dark:border-2 dark:border-slate-700 p-4 sm:p-6">
                            <FormCategory />
                        </div>
                    </div>
                )}
                {isFormSpendOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-slate-800 dark:border-2 dark:border-slate-700 p-4 sm:p-6">
                            <FormSpend />
                        </div>
                    </div>
                )}
                {isFormSavingOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-slate-800 dark:border-2 dark:border-slate-700 p-4 sm:p-6">
                            <FormSavingGoal />
                        </div>
                    </div>
                )}
                {isFormModifyPercentageOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-slate-800 dark:border-2 dark:border-slate-700 p-4 sm:p-6">
                            <FormModifyPercentage />
                        </div>
                    </div>
                )}
                <div className="flex flex-col justify-center items-center gap-4 px-2 py-3 sm:px-4 sm:py-3 lg:px-4 lg:py-4 w-full">
                    <CardsMainCategories />
                </div>
                <div className="pt-4 pb-4 px-2 sm:px-4 lg:px-6 w-full">
                    <GridCategories />
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-3 lg:gap-4 px-2 py-4 sm:px-4 lg:px-6">
                    <div className="w-full lg:w-[60%] min-w-0">
                        {/* <Saving /> */}
                        <GridSpends />
                    </div>
                    <div className="w-full lg:w-[40%] min-w-0">
                        {/* Repartición de la nómina en gráfico */}
                        <GraphicPercentatgeSpend />
                    </div>
                </div>
                <div className="px-2 py-4 sm:px-4 lg:px-6 w-full">
                    <GridInversion />
                </div>
            </div>
        </>
    );
};

export default Body;
