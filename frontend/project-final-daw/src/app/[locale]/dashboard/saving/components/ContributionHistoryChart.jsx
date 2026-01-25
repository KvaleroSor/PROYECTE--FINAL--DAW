"use client";

import { useSaving } from "@/app/context/SavingContext.js";
import { useEffect } from "react";
import {
    TrendingUp,
    Calendar,
    DollarSign,
    PiggyBank,
    ChevronDown,
    ChevronUp
} from "lucide-react";

const ContributionHistoryChart = () => {
    const {
        isContributionHistory,
        isTotalContributedAllTime,
        fetchContributionHistory,
        isLoading
    } = useSaving();

    useEffect(() => {
        fetchContributionHistory();
    }, []);

    // Asegurar que isTotalContributedAllTime sea un número válido
    const safeTotal = Number(isTotalContributedAllTime) || 0;

    // Nombres de meses en español
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Calcular tendencia (comparar últimos 2 meses)
    const calculateTrend = () => {
        if (!isContributionHistory || isContributionHistory.length < 2) return null;

        const [current, previous] = isContributionHistory;
        const difference = current.totalAmount - previous.totalAmount;
        const percentageChange = ((difference / previous.totalAmount) * 100).toFixed(1);

        return {
            difference,
            percentage: percentageChange,
            isPositive: difference >= 0
        };
    };

    const trend = calculateTrend();

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 transition-colors duration-300">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
                    <div className="h-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 space-y-6 transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2">
                        <TrendingUp className="text-blue-600 dark:text-blue-400" />
                        Historial de Contribuciones
                    </h2>
                    <p className="text-gray-600 dark:text-slate-400 mt-1">
                        Seguimiento mensual de tus aportaciones
                    </p>
                </div>

                {/* Total acumulado histórico */}
                <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-slate-400">Total Contribuido</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        €{safeTotal.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                        (Sin descontar imprevistos)
                    </p>
                </div>
            </div>

            {/* Tendencia */}
            {trend && (
                <div className={`p-4 rounded-lg border-l-4 ${trend.isPositive
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                    }`}>
                    <div className="flex items-center gap-2">
                        {trend.isPositive ? (
                            <ChevronUp className="text-green-600 dark:text-green-400" />
                        ) : (
                            <ChevronDown className="text-red-600 dark:text-red-400" />
                        )}
                        <span className={`font-semibold ${trend.isPositive ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                            }`}>
                            {trend.isPositive ? '+' : ''}{trend.percentage}% respecto al mes anterior
                        </span>
                        <span className="text-gray-600 dark:text-slate-400">
                            ({trend.isPositive ? '+' : ''}€{trend.difference.toFixed(2)})
                        </span>
                    </div>
                </div>
            )}

            {/* Historial por meses */}
            {isContributionHistory && isContributionHistory.length > 0 ? (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Contribuciones Mensuales
                    </h3>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {isContributionHistory.map((entry, index) => {
                            const maxAmount = Math.max(...isContributionHistory.map(e => e.totalAmount));
                            const barWidth = (entry.totalAmount / maxAmount) * 100;

                            return (
                                <div key={`${entry.year}-${entry.month}`}
                                    className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    {/* Fecha y monto */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                                            <span className="font-semibold text-gray-800 dark:text-slate-200">
                                                {monthNames[entry.month]} {entry.year}
                                            </span>
                                        </div>
                                        <span className="text-xl font-bold text-green-600 dark:text-green-400">
                                            €{entry.totalAmount.toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Barra de progreso */}
                                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 mb-3">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${barWidth}%` }}
                                        />
                                    </div>

                                    {/* Desglose por metas */}
                                    {entry.goals && entry.goals.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                            <p className="text-xs text-gray-500 dark:text-slate-400 mb-2 flex items-center gap-1">
                                                <PiggyBank className="w-3 h-3" />
                                                Desglose por metas:
                                            </p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {entry.goals.map((goal, idx) => (
                                                    <div key={idx}
                                                        className="text-xs bg-gray-50 dark:bg-slate-700 rounded px-2 py-1 flex items-center justify-between">
                                                        <span className="text-gray-700 dark:text-slate-300 truncate">
                                                            {goal.goalName}
                                                        </span>
                                                        <span className="font-semibold text-gray-900 dark:text-slate-100 ml-2">
                                                            €{goal.amount.toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <DollarSign className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-slate-400 text-lg">
                        Aún no hay historial de contribuciones
                    </p>
                    <p className="text-gray-400 dark:text-slate-500 text-sm mt-2">
                        Las contribuciones se registrarán automáticamente cada mes
                    </p>
                </div>
            )}
        </div>
    );
};

export default ContributionHistoryChart;
