"use client";

import { useInversion } from "@/app/context/InversionContext";
import { AlertCircle, TrendingUp, TrendingDown, CheckCircle } from "lucide-react";

const InvestmentAlerts = () => {
    const { isInversions } = useInversion();

    // Generar alertas basadas en el rendimiento
    const alerts = isInversions
        .map((inv) => {
            const realProfit = inv.real_profitability || 0;
            const targetProfit = inv.target_profitability || 0;
            const difference = realProfit - targetProfit;
            const displayName = inv.symbol || inv.type;

            if (Math.abs(difference) < 1) {
                return null; // No mostrar alerta si la diferencia es menor a 1%
            }

            if (realProfit >= targetProfit) {
                return {
                    type: "success",
                    icon: TrendingUp,
                    title: `${displayName} superando objetivo`,
                    message: `Rentabilidad real: ${realProfit.toFixed(2)}% (Objetivo: ${targetProfit.toFixed(2)}%)`,
                    difference: `+${difference.toFixed(2)}%`,
                    color: "green",
                };
            } else {
                return {
                    type: "warning",
                    icon: TrendingDown,
                    title: `${displayName} bajo objetivo`,
                    message: `Rentabilidad real: ${realProfit.toFixed(2)}% (Objetivo: ${targetProfit.toFixed(2)}%)`,
                    difference: `${difference.toFixed(2)}%`,
                    color: "red",
                };
            }
        })
        .filter(Boolean);

    if (alerts.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        Alertas de Rendimiento
                    </h2>
                </div>
                <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-slate-600 dark:text-slate-400">
                        Todas tus inversiones están dentro del rango esperado
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Alertas de Rendimiento
                </h2>
            </div>

            <div className="space-y-3">
                {alerts.map((alert, index) => {
                    const Icon = alert.icon;
                    const colorClasses = {
                        green: {
                            bg: "bg-green-50 dark:bg-green-900/20",
                            border: "border-green-200 dark:border-green-800",
                            icon: "text-green-600 dark:text-green-400",
                            text: "text-green-800 dark:text-green-300",
                            badge: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
                        },
                        red: {
                            bg: "bg-red-50 dark:bg-red-900/20",
                            border: "border-red-200 dark:border-red-800",
                            icon: "text-red-600 dark:text-red-400",
                            text: "text-red-800 dark:text-red-300",
                            badge: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
                        },
                    };

                    const colors = colorClasses[alert.color];

                    return (
                        <div
                            key={index}
                            className={`${colors.bg} ${colors.border} border rounded-lg p-4 flex items-start gap-3`}
                        >
                            <Icon className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <p className={`font-semibold ${colors.text}`}>
                                            {alert.title}
                                        </p>
                                        <p className={`text-sm ${colors.text} mt-1`}>
                                            {alert.message}
                                        </p>
                                    </div>
                                    <span
                                        className={`${colors.badge} px-2 py-1 rounded-md text-sm font-medium flex-shrink-0`}
                                    >
                                        {alert.difference}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InvestmentAlerts;
