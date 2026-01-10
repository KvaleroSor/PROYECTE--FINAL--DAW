"use client";

import { useSaving } from "@/app/context/SavingContext.js";
import { useFinancial } from "@/app/context/FinancialContext.js";
import SavingGoalCard from "./SavingGoalCard.jsx";
import MonthlyContributionStatus from "./MonthlyContributionStatus.jsx";
import { Plus, Target, Wallet, TrendingUp, AlertCircle } from "lucide-react";

const GridSavingGoals = () => {
    const {
        savingGoals,
        isLoading,
        setIsFormSavingOpen,
        calculateUnallocatedPercentage,
        isSavingFromNomina,
    } = useSaving();

    const unallocatedPercentage = calculateUnallocatedPercentage();
    const unallocatedAmount = (unallocatedPercentage / 100) * (isSavingFromNomina || 0);

    const totalSaved = savingGoals.reduce((sum, goal) => sum + goal.current_amount, 0);
    const totalTarget = savingGoals.reduce((sum, goal) => sum + goal.target_amount, 0);
    const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

    const activeGoals = savingGoals.filter((goal) => goal.status === "active");
    const completedGoals = savingGoals.filter((goal) => goal.status === "completed");

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Resumen general */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Tarjeta de resumen total */}
                <div className="bg-white border-2 border-slate-200 rounded-lg p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-slate-700" />
                        <p className="text-sm font-medium text-slate-600">Progreso Total</p>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">{overallProgress.toFixed(1)}%</p>
                    <p className="text-sm text-slate-500">
                        {totalSaved.toFixed(2)}€ de {totalTarget.toFixed(2)}€
                    </p>
                </div>

                {/* Tarjeta de metas activas */}
                <div className="bg-white border-2 border-slate-200 rounded-lg p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-slate-700" />
                        <p className="text-sm font-medium text-slate-600">Metas Activas</p>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">{activeGoals.length}</p>
                    <p className="text-sm text-slate-500">
                        {completedGoals.length} completadas
                    </p>
                </div>

                {/* Tarjeta de presupuesto disponible */}
                <div className="bg-white border-2 border-slate-200 rounded-lg p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Wallet className="w-5 h-5 text-slate-700" />
                        <p className="text-sm font-medium text-slate-600">Presupuesto Disponible</p>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">{unallocatedPercentage.toFixed(1)}%</p>
                    <p className="text-sm text-slate-500">{unallocatedAmount.toFixed(2)}€/mes</p>
                </div>
            </div>

            {/* Estado de contribuciones mensuales */}
            <MonthlyContributionStatus />

            {/* Botón para crear nueva meta */}
            <div className="mb-6">
                <button
                    onClick={() => setIsFormSavingOpen(true)}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Crear Nueva Meta de Ahorro
                </button>
            </div>

            {/* Mensaje si no hay presupuesto disponible */}
            {unallocatedPercentage <= 0 && savingGoals.length > 0 && (
                <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <p className="text-sm text-yellow-800">
                        Has asignado el 100% de tu presupuesto de ahorro. Para crear nuevas metas, 
                        edita o elimina alguna existente.
                    </p>
                </div>
            )}

            {/* Lista de metas */}
            {savingGoals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Target className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No tienes metas de ahorro
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md">
                        Crea tu primera meta de ahorro para empezar a alcanzar tus objetivos financieros
                    </p>
                    <button
                        onClick={() => setIsFormSavingOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Crear Mi Primera Meta
                    </button>
                </div>
            ) : (
                <>
                    {/* Metas activas */}
                    {activeGoals.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Metas Activas ({activeGoals.length})
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {activeGoals.map((goal) => (
                                    <SavingGoalCard key={goal._id} goal={goal} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Metas completadas */}
                    {completedGoals.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Target className="w-5 h-5 text-green-600" />
                                Metas Completadas ({completedGoals.length})
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {completedGoals.map((goal) => (
                                    <SavingGoalCard key={goal._id} goal={goal} />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GridSavingGoals;
