"use client";

import { useSession } from "next-auth/react";
import FormCategory from "../category/components/FormCategory.jsx";
import GridCategories from "../category/components/GridCategories.jsx";
import CategoryByIdTemp from "../category/components/CategoryByIdTemp.jsx";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useSpends } from "@/app/context/SpendContext.js";
import FormSpend from "../spend/components/FormSpend.jsx";
import Saving from "./Saving.jsx";

const Body = () => {
    const { isFormCategoryOpen } = useCategories();
    const { isFormSpendOpen } = useSpends();

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
                <div className="w-full flex flex-col sm:flex-row">
                    <div className="h-auto basis-[55%] border-2 rounded-xl m-3 flex flex-col justify-center items-center gap-5 bg-white">
                        <Saving />
                    </div>
                    <div className="h-auto basis-[45%] border-2 rounded-xl m-3 flex justify-center items-center bg-white"></div>
                </div>
                <div className="border-2 rounded-xl m-3 flex justify-center items-center bg-white">
                    {/* CARRUSEL DE CATEGORIAS */}
                </div>
                <div className="pt-4 border-2 rounded-xl m-2 sm:m-3 lg:m-4 bg-white">
                    <GridCategories />
                </div>
            </div>
        </>
    );
};

export default Body;
