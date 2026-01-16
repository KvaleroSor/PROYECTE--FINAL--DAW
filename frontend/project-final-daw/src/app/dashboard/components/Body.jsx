"use client";

import { useSession } from "next-auth/react";
import FormCategory from "../category/components/FormCategory.jsx";
import GridCategories from "../category/components/GridCategories.jsx";
import CategoryByIdTemp from "../category/components/CategoryByIdTemp.jsx";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useSpends } from "@/app/context/SpendContext.js";
import { useSaving } from "@/app/context/SavingContext.js";
import FormSpend from "../spend/components/FormSpend.jsx";
import FormSavingGoal from "../saving/components/FormSavingGoal.jsx";
import Saving from "./Saving.jsx";
import SavingsProgressDashboard from "./SavingsProgressDashboard.jsx";
import CardsMainCategories from "./CardsMainCategories.jsx";
import GridSpends from "../spend/components/GridSpends.jsx";

const Body = () => {
    const { isFormCategoryOpen } = useCategories();
    const { isFormSpendOpen } = useSpends();
    const { isFormSavingOpen } = useSaving();

    return (
        <>
            {/* <div className="h-full grid grid-rows-[auto_auto_auto] lg:grid-rows-[3fr_2fr_5fr] sm:grid-cols-1"> */}
            <div className="h-full grid grid-rows-[auto_auto_auto]">
                {isFormCategoryOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="w-full max-w-xl max-h-xl rounded-xl bg-white p-6">
                            <FormCategory />
                        </div>
                    </div>
                )}
                {isFormSpendOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="w-full max-w-xl max-h-xl rounded-xl bg-white p-6">
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
                <div className="flex flex-col justify-center items-center gap-5 m-2 sm:m-3 lg:m-4">
                    <CardsMainCategories />
                </div>
                <div className="w-full flex flex-row gap-2">
                    <div className="w-[70%] border-2 rounded-xl flex flex-col justify-center items-center gap-5 bg-white m-2 sm:m-3 lg:m-4">
                        {/* <Saving /> */}
                        <GridSpends />
                    </div>
                    <div className="w-[30%] border-2 rounded-xl flex flex-col justify-center items-center gap-5 bg-white m-2 sm:m-3 lg:m-4">
                        Repartición de la nómina en gráfico
                    </div>
                </div>
                {/*   */}
                <div className="pt-4 border-2 rounded-xl m-2 sm:m-3 lg:m-4 bg-white">
                    <GridCategories />
                </div>
            </div>
        </>
    );
};

export default Body;
