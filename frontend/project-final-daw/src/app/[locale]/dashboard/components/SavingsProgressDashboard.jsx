"use client";

import { useSaving } from "@/app/context/SavingContext.js";
import { useFinancial } from "@/app/context/FinancialContext.js";
import { TrendingUp, Target, Calendar, ArrowUp, ArrowDown, Minus, History } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

const SavingsProgressDashboard = () => {
    const { savingGoals, calculateProgress } = useSaving();
    const { isSavingFromNomina } = useFinancial();
    const router = useRouter();

    // Calcular estadísticas
    const activeGoals = savingGoals.filter(goal => goal.status === 'active');
    const totalSaved = savingGoals.reduce((sum, goal) => sum + goal.current_amount, 0);
    const totalTarget = savingGoals.reduce((sum, goal) => sum + goal.target_amount, 0);
    const totalProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

    // Calcular contribuciones totales del mes
    const totalMonthlyContribution = activeGoals.reduce((sum, goal) => {
        return sum + ((goal.percentage_allocation / 100) * isSavingFromNomina);
    }, 0);

    // Ordenar metas por progreso
    const goalsByProgress = [...activeGoals]
        .map(goal => ({
            ...goal,
            progress: calculateProgress(goal.current_amount, goal.target_amount)
        }))
        .sort((a, b) => b.progress - a.progress)
        .slice(0, 5);

    // Determinar tendencia (simulado por ahora)
    const trend = totalProgress > 50 ? 'up' : totalProgress > 25 ? 'stable' : 'down';

    return (
        <div className="w-full h-full p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-slate-700" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Progreso de Ahorro</h2>
                        <p className="text-sm text-slate-500">Visualiza tu avance mensual</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Indicador de tendencia */}
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${trend === 'up' ? 'bg-green-50 text-green-700' :
                            trend === 'stable' ? 'bg-yellow-50 text-yellow-700' :
                                'bg-red-50 text-red-700'
                        }`}>
                        {trend === 'up' && <ArrowUp className="w-4 h-4" />}
                        {trend === 'stable' && <Minus className="w-4 h-4" />}
                        {trend === 'down' && <ArrowDown className="w-4 h-4" />}
                        <span className="text-sm font-medium">
                            {trend === 'up' ? 'Excelente' : trend === 'stable' ? 'En camino' : 'Necesita impulso'}
                        </span>
                    </div>

                    {/* Botón para ver historial */}
                    <button
                        onClick={() => router.push('/dashboard/saving')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <History className="w-4 h-4" />
                        <span className="text-sm font-medium">Ver Historial</span>
                    </button>
                </div>
            </div>

            {savingGoals.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Target className="w-16 h-16 text-slate-300 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                        Sin metas de ahorro
                    </h3>
                    <p className="text-sm text-slate-500 max-w-xs">
                        Crea tu primera meta de ahorro para visualizar tu progreso aquí
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card 1: Resumen General */}
                    <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Target className="w-5 h-5 text-slate-700" />
                            <h3 className="font-semibold text-slate-900">Progreso Total</h3>
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="text-4xl text-slate-900">
                                    {totalProgress.toFixed(1)}%
                                </span>
                                <span className="text-sm text-slate-500">
                                    {activeGoals.length} metas activas
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3">
                                <div
                                    className="bg-slate-700 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(totalProgress, 100)}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-xs text-slate-600">
                            <p>€{totalSaved.toFixed(2)} de €{totalTarget.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Card 2: Este Mes */}
                    <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-5 h-5 text-slate-700" />
                            <h3 className="font-semibold text-slate-900">Este Mes</h3>
                        </div>
                        <div className="mb-3">
                            <p className="text-4xl text-slate-900">
                                €{totalMonthlyContribution.toFixed(2)}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">Contribución total</p>
                        </div>
                        <div className="text-xs text-slate-600">
                            <p>Presupuesto: €{isSavingFromNomina.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Card 3: Próxima Meta */}
                    <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-5 h-5 text-slate-700" />
                            <h3 className="font-semibold text-slate-900">Próxima a Completar</h3>
                        </div>
                        {goalsByProgress.length > 0 ? (
                            <>
                                <p className="text-lg font-bold text-slate-900 mb-1">
                                    {goalsByProgress[0].goal_name}
                                </p>
                                <div className="mb-2">
                                    <div className="w-full bg-slate-200 rounded-full h-2">
                                        <div
                                            className="bg-green-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min(goalsByProgress[0].progress, 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="text-xs text-slate-600">
                                    <p>{goalsByProgress[0].progress.toFixed(1)}% completado</p>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-slate-500">No hay metas activas</p>
                        )}
                    </div>

                    {/* Lista de metas con progreso */}
                    <div className="md:col-span-3 bg-white border-2 border-slate-200 rounded-lg p-5">
                        <h3 className="font-semibold text-slate-900 mb-4">Desglose por Meta</h3>
                        <div className="space-y-3">
                            {goalsByProgress.length > 0 ? (
                                goalsByProgress.map((goal) => (
                                    <div key={goal._id} className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-slate-900">
                                                    {goal.goal_name}
                                                </span>
                                                <span className="text-sm font-bold text-slate-700">
                                                    {goal.progress.toFixed(1)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-200 rounded-full h-2">
                                                <div
                                                    className="bg-slate-700 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between mt-1 text-xs text-slate-500">
                                                <span>€{goal.current_amount.toFixed(2)}</span>
                                                <span>€{goal.target_amount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-sm text-slate-500 py-4">
                                    No hay metas activas para mostrar
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavingsProgressDashboard;
