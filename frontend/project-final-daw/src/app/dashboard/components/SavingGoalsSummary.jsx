"use client";

import { useSaving } from "@/app/context/SavingContext.js";
import { Target, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const SavingGoalsSummary = () => {
    const router = useRouter();
    const {
        savingGoals,
        setIsFormSavingOpen,
        calculateProgress,
        calculateMonthlyContribution,
    } = useSaving();

    // Obtener las 2-3 metas más importantes (activas con mayor prioridad)
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    const topGoals = savingGoals
        .filter((goal) => goal.status === "active")
        .sort((a, b) => {
            // Primero por prioridad, luego por porcentaje de progreso
            const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
            if (priorityDiff !== 0) return priorityDiff;
            
            const progressA = calculateProgress(a.current_amount, a.target_amount);
            const progressB = calculateProgress(b.current_amount, b.target_amount);
            return progressB - progressA;
        })
        .slice(0, 3);

    const priorityColors = {
        high: "border-l-red-500",
        medium: "border-l-yellow-500",
        low: "border-l-green-500",
    };

    if (savingGoals.length === 0) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <Target className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Sin Metas de Ahorro
                </h3>
                <p className="text-sm text-gray-500 mb-4 max-w-xs">
                    Define tus objetivos financieros y comienza a ahorrar
                </p>
                <button
                    onClick={() => setIsFormSavingOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Crear Meta
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col p-4">
            {/* Header */}
            <div className="flex flex-row justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-slate-700" />
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Metas Destacadas</h2>
                        <p className="text-xs text-slate-500">Tus principales objetivos</p>
                    </div>
                </div>
            </div>

            {/* Lista de metas destacadas */}
            <div className="space-y-3 flex-1 overflow-y-auto mb-4">
                {topGoals.map((goal) => {
                    const progress = calculateProgress(goal.current_amount, goal.target_amount);
                    const monthlyContribution = calculateMonthlyContribution(
                        goal.percentage_allocation
                    );

                    return (
                        <div
                            key={goal._id}
                            className={`border-l-4 ${priorityColors[goal.priority]} bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                            onClick={() => router.push('/dashboard/saving')}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-slate-900 text-sm">
                                    {goal.goal_name}
                                </h4>
                                <span className="text-xs font-bold text-slate-700">
                                    {progress.toFixed(0)}%
                                </span>
                            </div>

                            {/* Barra de progreso */}
                            <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                                <div
                                    className="bg-slate-700 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Información */}
                            <div className="flex justify-between items-center text-xs text-slate-600">
                                <span>
                                    €{goal.current_amount.toFixed(0)} / €{goal.target_amount.toFixed(0)}
                                </span>
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3 text-green-600" />
                                    <span className="text-green-600 font-medium">
                                        +€{monthlyContribution.toFixed(0)}/mes
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Botones de acción */}
            <div className="space-y-2">
                {savingGoals.length > 3 && (
                    <button
                        onClick={() => router.push('/dashboard/saving')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                    >
                        Ver Todas
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
                <button
                    onClick={() => setIsFormSavingOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Nueva Meta
                </button>
            </div>
        </div>
    );
};

export default SavingGoalsSummary;
