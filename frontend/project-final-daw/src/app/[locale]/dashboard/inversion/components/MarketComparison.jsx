"use client";

import { useInversion } from "@/app/context/InversionContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

const MarketComparison = () => {
    const t = useTranslations("investments");
    const { isInversions } = useInversion();

    // Calcular rentabilidad promedio del portfolio
    const portfolioReturn = isInversions.length > 0
        ? isInversions.reduce((sum, inv) => sum + (inv.real_profitability || 0), 0) / isInversions.length
        : 0;

    // Índices de referencia (valores aproximados anuales)
    const marketIndices = [
        { name: t("yourPortfolio"), value: portfolioReturn, color: "#1e293b" },
        { name: "S&P 500", value: 10.5, color: "#3b82f6" },
        { name: "NASDAQ", value: 12.3, color: "#8b5cf6" },
        { name: "DAX", value: 8.7, color: "#10b981" },
        { name: "IBEX 35", value: 6.2, color: "#f59e0b" },
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
                    <p className="text-slate-900 dark:text-slate-100 font-semibold">
                        {payload[0].payload.name}
                    </p>
                    <p className={`text-sm font-medium ${payload[0].value >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                        }`}>
                        {payload[0].value.toFixed(2)}% {t("profitabilityTooltip")}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-md transition-all duration-300">
            <h2 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">
                {t("marketComparison")}
            </h2>
            <p className="text-gray-600 dark:text-slate-400 mb-4">
                {t("averageAnnualReturn")}
            </p>

            {isInversions.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    {t("addInvestmentsToCompare")}
                </div>
            ) : (
                <>
                    <div className="w-full h-80 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={marketIndices}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                                <XAxis
                                    dataKey="name"
                                    className="text-slate-600 dark:text-slate-400"
                                    tick={{ fill: "currentColor" }}
                                />
                                <YAxis
                                    className="text-slate-600 dark:text-slate-400"
                                    tick={{ fill: "currentColor" }}
                                    label={{
                                        value: t("profitabilityLabel"),
                                        angle: -90,
                                        position: "insideLeft",
                                        className: "fill-slate-600 dark:fill-slate-400",
                                    }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="value"
                                    radius={[8, 8, 0, 0]}
                                >
                                    {marketIndices.map((entry, index) => (
                                        <Bar key={`cell-${index}`} dataKey="value" fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Análisis */}
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            {portfolioReturn > 10.5 ? (
                                <span className="text-green-600 dark:text-green-400 font-semibold">
                                    ✓ {t("portfolioBeatingIndex")} {(portfolioReturn - 10.5).toFixed(2)}%
                                </span>
                            ) : portfolioReturn > 0 ? (
                                <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                                    ⚠ {t("portfolioBelowIndex")} {(10.5 - portfolioReturn).toFixed(2)}% {t("belowSP500")}
                                </span>
                            ) : (
                                <span className="text-red-600 dark:text-red-400 font-semibold">
                                    ✗ {t("negativeReturn")}
                                </span>
                            )}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default MarketComparison;
