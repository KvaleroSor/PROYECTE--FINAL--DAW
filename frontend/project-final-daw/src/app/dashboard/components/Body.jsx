'use client';

import { useSession } from "next-auth/react";
import FormCategory from "../category/components/FormCategory.jsx";
import GridCategories from "../category/components/GridCategories.jsx";
import CategoryByIdTemp from "../category/components/CategoryByIdTemp.jsx";
import { useCategories } from "@/app/context/CategoryContext.js";


const Body = () => {
    const { isFormOpen } = useCategories();

    return (
        <>
            <div className="h-full grid grid-rows-[auto_auto_auto] lg:grid-rows-[3fr_2fr_5fr] sm:grid-cols-1">
                {isFormOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="w-full max-w-xl max-h-xl rounded-xl bg-white p-6">
                            <FormCategory />
                        </div>
                    </div>
                )}
                <div className="w-full flex flex-col sm:flex-row">
                    <div className="basis-[55%] border-2 rounded-xl m-3 flex flex-col justify-center items-center gap-5">
                        {/* <h1 className="text-3xl text-slate-700">CREAR CATEGORIA</h1> */}
                        {/* CAJA 1 */}
                        {/* <FormSpend /> */}
                    </div>
                    <div className="basis-[45%] border-2 rounded-xl m-3 flex justify-center items-center">
                        CAJA 2
                    </div>
                </div>
                <div className="border-2 rounded-xl m-3 flex justify-center items-center">
                    <GridCategories />
                    {/* CARRUSEL DE CATEGORIAS */}
                </div>
                <div className="w-full flex flex-col sm:flex-row">
                    <div className="basis-[60%] border-2 rounded-xl m-3 flex justify-center items-center">
                        {/* <CategoryByIdTemp /> */}
                        {/* CAJA 3 */}
                    </div>
                    <div className="basis-[40%] w-full border-2 rounded-xl m-3 flex justify-center items-center">
                        CAJA 4
                    </div>
                </div>
            </div>
        </>
    );
};

export default Body;
