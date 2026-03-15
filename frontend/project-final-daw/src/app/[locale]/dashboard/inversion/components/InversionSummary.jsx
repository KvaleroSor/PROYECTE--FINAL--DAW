"use client";

import { useInversion } from "@/app/context/InversionContext";
import { TrendingUp, DollarSign, Target, Activity, PieChart, BarChart3, LineChart } from "lucide-react";
import PortfolioDistributionChart from "./PortfolioDistributionChart";
import ProfitabilityComparisonChart from "./ProfitabilityComparisonChart";
import PortfolioEvolutionChart from "./PortfolioEvolutionChart";
import InvestmentAlerts from "./InvestmentAlerts";
import MarketComparison from "./MarketComparison";
import ExportReports from "./ExportReports";

const InversionSummary = () => {
    const { isInversions, isInversionFromNomina, isLoading } = useInversion();

    // Calcular totales
    const isTotalInverted = isInversions.reduce(
        (sum, inv) => sum + (inv.amount || 0),
        0
    );

    const isTotalProfitability = isInversions.reduce(
        (sum, inv) => sum + ((inv.real_profitability || 0) * (inv.amount || 0)) / 100,
        0
    );

    const isAverageProfitability = isInversions.length > 0
        ? isInversions.reduce((sum, inv) => sum + (inv.real_profitability || 0), 0) / isInversions.length
        : 0;

    const isTotalValue = isTotalInverted + isTotalProfitability;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 dark:border-slate-400"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Tarjetas de resumen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Invertido */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-slate-500 dark:text-slate-400">INVERTIDO</h1>
                        </div>
                        <h1 className="text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            € {Number(isTotalInverted).toFixed(2)}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">Total invertido</p>
                    </div>
                </div>

                {/* Rentabilidad Total */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-slate-500 dark:text-slate-400">GANANCIA</h1>
                        </div>
                        <h1 className="text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            € {Number(isTotalProfitability).toFixed(2)}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">Rentabilidad total</p>
                    </div>
                </div>

                {/* Valor Total */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-slate-500 dark:text-slate-400">VALOR TOTAL</h1>
                        </div>
                        <h1 className="text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            € {Number(isTotalValue).toFixed(2)}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">Inversión + Ganancia</p>
                    </div>
                </div>

                {/* Rentabilidad Media */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-slate-500 dark:text-slate-400">RENTABILIDAD</h1>
                        </div>
                        <h1 className="text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            {Number(isAverageProfitability).toFixed(2)} %
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">Rentabilidad media</p>
                    </div>
                </div>
            </div>

            {/* Alertas de rendimiento */}
            {isInversions.length > 0 && <InvestmentAlerts />}

            {/* Gráficas de análisis */}
            {isInversions.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Distribución del Portfolio */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                <PieChart className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                Distribución del Portfolio
                            </h2>
                        </div>
                        <PortfolioDistributionChart />
                    </div>

                    {/* Comparación de Rentabilidad */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                Rentabilidad: Objetivo vs Real
                            </h2>
                        </div>
                        <ProfitabilityComparisonChart />
                    </div>

                    {/* Evolución del Portfolio */}
                    <div className="bg-white dark:bg-slate-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                <LineChart className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                Evolución del Portfolio
                            </h2>
                        </div>
                        <PortfolioEvolutionChart />
                    </div>
                </div>
            )}

            {/* Comparación con índices de mercado y exportación */}
            {isInversions.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <MarketComparison />
                    </div>
                    <div>
                        <ExportReports />
                    </div>
                </div>
            )}

            {/* Lista de inversiones */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Mis Inversiones ({isInversions.length})
                </h2>
                {isInversions.length === 0 ? (
                    <div className="text-center py-12">
                        <DollarSign className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 text-lg">
                            No tienes inversiones registradas
                        </p>
                        <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                            Presupuesto mensual: €{Number(isInversionFromNomina || 0).toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">Inversión</th>
                                    <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">Tipo</th>
                                    <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">Cantidad</th>
                                    <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">Rent. Objetivo</th>
                                    <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">Rent. Real</th>
                                    <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">Ganancia</th>
                                    <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">Valor Total</th>
                                    <th className="text-center py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isInversions.map((inversion) => {
                                    const profitability = ((inversion.real_profitability || 0) * (inversion.amount || 0)) / 100;
                                    const totalValue = (inversion.amount || 0) + profitability;
                                    return (
                                        <tr key={inversion._id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="flex flex-col">
                                                    {inversion.symbol && (
                                                        <span className="text-slate-900 dark:text-slate-100 font-bold">
                                                            {inversion.symbol}
                                                        </span>
                                                    )}
                                                    {inversion.name && (
                                                        <span className="text-slate-600 dark:text-slate-400 text-sm">
                                                            {inversion.name}
                                                        </span>
                                                    )}
                                                    {!inversion.symbol && !inversion.name && (
                                                        <span className="text-slate-500 dark:text-slate-400 italic text-sm">
                                                            Sin símbolo
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-slate-900 dark:text-slate-100">
                                                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-sm">
                                                    {inversion.type}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right text-slate-900 dark:text-slate-100 font-medium">
                                                €{Number(inversion.amount).toFixed(2)}
                                            </td>
                                            <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">
                                                {Number(inversion.target_profitability || 0).toFixed(2)}%
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <span className={`font-medium ${(inversion.real_profitability || 0) >= 0
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                                    }`}>
                                                    {Number(inversion.real_profitability || 0).toFixed(2)}%
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <span className={`font-medium ${profitability >= 0
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                                    }`}>
                                                    €{Number(profitability).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right text-slate-900 dark:text-slate-100 font-semibold">
                                                €{Number(totalValue).toFixed(2)}
                                            </td>
                                            <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-400 text-sm">
                                                {new Date(inversion.inversion_date).toLocaleDateString('es-ES')}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InversionSummary;
