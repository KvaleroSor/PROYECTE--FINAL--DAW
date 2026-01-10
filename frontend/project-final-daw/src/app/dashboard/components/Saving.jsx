"use client";

import { PiggyBank, AlertCircle, TrendingUp, Plus } from "lucide-react";
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
    const [isTotalSumSpendImprevistos, setIsTotalSumSpendImprevistos] = useState(0);
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
    const activeGoals = savingGoals.filter(goal => goal.status === "active");
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
                        <h1 className="text-xl font-semibold text-slate-900">Ahorro</h1>
                        <h3 className="text-sm text-slate-500">
                            Gestión de ahorros
                        </h3>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-500">Ahorro neto</p>
                    <h1 className={`text-2xl font-bold ${netSaving >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        €{Math.abs(netSaving).toFixed(2)}
                    </h1>
                </div>
            </div>

            {/* Resumen de ahorro disponible */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Presupuesto Total</span>
                    <span className="text-lg font-bold text-slate-900">
                        €{Number(isSavingFromNomina).toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Gastos Imprevistos</span>
                    <span className="font-semibold text-red-600">
                        -€{isTotalSumSpendImprevistos.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Estadísticas de metas */}
            {savingGoals.length > 0 ? (
                <div className="space-y-3 mb-4">
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-slate-700" />
                                <span className="text-sm font-medium text-slate-900">Metas Activas</span>
                            </div>
                            <span className="text-2xl font-bold text-slate-900">{activeGoals.length}</span>
                        </div>
                        <div className="text-xs text-slate-600">
                            {totalAllocatedPercentage.toFixed(1)}% del presupuesto asignado
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-600 mb-1">Progreso Total</p>
                                <p className="text-lg font-bold text-slate-900">
                                    €{totalSaved.toFixed(2)} <span className="text-sm font-normal text-slate-500">de</span> €{totalTarget.toFixed(2)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-slate-700">
                                    {totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(1) : 0}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <p className="text-sm font-medium text-yellow-900">Sin metas activas</p>
                    </div>
                    <p className="text-xs text-yellow-700 mb-3">
                        Crea tu primera meta de ahorro para empezar a alcanzar tus objetivos
                    </p>
                    <button
                        onClick={() => setIsFormSavingOpen(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Crear Meta
                    </button>
                </div>
            )}

            {/* Botón para ver todas las metas */}
            {savingGoals.length > 0 && (
                <button
                    onClick={() => router.push('/dashboard/saving')}
                    className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors text-sm font-medium"
                >
                    Ver Todas las Metas
                </button>
            )}
        </div>
    );
};

export default Saving;
