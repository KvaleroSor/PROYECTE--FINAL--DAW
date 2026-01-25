"use client";

import {
    PiggyBank,
    AlertCircle,
    TrendingUp,
    Plus,
    Eye,
    EyeClosed,
} from "lucide-react";
import { useFinancial } from "@/app/context/FinancialContext.js";
import { useSpends } from "@/app/context/SpendContext.js";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useSaving } from "@/app/context/SavingContext.js";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Saving = () => {
    const router = useRouter();
    const { isSpends } = useSpends();
    const { isCategories } = useCategories();
    const { isSavingFromNomina } = useFinancial();
    const { savingGoals, setIsFormSavingOpen } = useSaving();
    const [isTotalSumSpendImprevistos, setIsTotalSumSpendImprevistos] =
        useState(0);
    const [netSaving, setNetSaving] = useState(0);

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

        setIsTotalSumSpendImprevistos(sumaTotal);
        const calculatedNetSaving = isSavingFromNomina - sumaTotal;
        setNetSaving(calculatedNetSaving);
    }, [isSpends, isCategories, isSavingFromNomina]);

    // Calcular estadísticas de metas
    const activeGoals = savingGoals.filter((goal) => goal.status === "active");
    const totalAllocatedPercentage = savingGoals.reduce(
        (sum, goal) => sum + (goal.percentage_allocation || 0),
        0
    );
    const totalSaved = savingGoals.reduce(
        (sum, goal) => sum + goal.current_amount,
        0
    );
    const totalTarget = savingGoals.reduce(
        (sum, goal) => sum + goal.target_amount,
        0
    );

    return (
        <div className="w-full h-full flex flex-col p-4">
            {/* Header */}
            <div className="flex flex-row justify-between items-center mb-4">
                <div className="flex flex-row justify-start items-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 border-2 bg-slate-800">
                        <PiggyBank className="w-7 h-7 text-slate-200" />
                    </div>
                    <div className="ml-3">
                        <h1 className="text-xl font-semibold text-slate-900">
                            Ahorro
                        </h1>
                        <h3 className="text-sm text-slate-500">
                            Gestión de ahorros
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Saving;
