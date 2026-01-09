"use client";

import { PiggyBank } from "lucide-react";
import { useFinancial } from "@/app/context/FinancialContext.js";
import { useSpends } from "@/app/context/SpendContext.js";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useState, useEffect } from "react";
import { trackSynchronousPlatformIOAccessInDev } from "next/dist/server/app-render/dynamic-rendering";

const Saving = () => {
    const { isSpends } = useSpends();
    const { isCategories } = useCategories();
    const { isSavingFromNomina } = useFinancial();
    const [isTotalSumSpendImprevistos, setIsTotalSumSpendImprevistos] =
        useState(0);

    useEffect(() => {        
        const isCategoriesId = isCategories
            .filter((cat) => cat.category_type === "Imprevistos")
            .map((category) => category._id);

        const spendsByIds = isSpends.filter((spend) =>
            isCategoriesId.includes(spend.category_id)
        );

        const sumaTotal = spendsByIds
            .map((spend) => spend.amount)
            .reduce((acc, current) => acc + current, 0);

        sumaTotal >= isSavingFromNomina
            ? setIsTotalSumSpendImprevistos(sumaTotal - isSavingFromNomina)
            : setIsTotalSumSpendImprevistos(isSavingFromNomina - sumaTotal);        
        
    }, [isSpends, isCategories, isSavingFromNomina]);

    return (
        <>
            <div className="w-full h-full flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-start items-center">
                        <div className="w-12 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 border-2 bg-slate-800 m-3">
                            <PiggyBank className="w-7 h-7 text-slate-200" />
                        </div>
                        <div>
                            <h1 className="text-xl text-slate-900">Ahorro</h1>
                            <h3 className="text-md text-slate-500">
                                Tus metas de ahorro
                            </h3>
                        </div>
                    </div>
                    <div className="mr-5">                       
                        {isTotalSumSpendImprevistos === 0 ? (
                            <h1 className="text-2xl text-slate-900">
                                € {Number(isSavingFromNomina).toFixed(2)}
                            </h1>
                        ) : (
                            <h1 className="text-2xl text-slate-900">
                                €{" "}
                                {Number(isTotalSumSpendImprevistos).toFixed(2)}
                            </h1>
                        )}
                    </div>
                </div>

                <div className="border-2">caja 2</div>
                <div className="border-2">caja 3</div>
            </div>
        </>
    );
};

export default Saving;
