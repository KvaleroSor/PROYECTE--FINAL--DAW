"use client";

import { useState } from "react";
import { useInversion } from "@/app/context/InversionContext";
import { TrendingUp, DollarSign, Target, Activity, PieChart, BarChart3, LineChart, X, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import PortfolioDistributionChart from "./PortfolioDistributionChart";
import ProfitabilityComparisonChart from "./ProfitabilityComparisonChart";
import PortfolioEvolutionChart from "./PortfolioEvolutionChart";
import InvestmentAlerts from "./InvestmentAlerts";
import MarketComparison from "./MarketComparison";
import ExportReports from "./ExportReports";
import InvestmentHistory from "./InvestmentHistory";

const InversionSummary = () => {
    const t = useTranslations("investments");
    const tCommon = useTranslations("common");
    const { isInversions, isInversionFromNomina, isLoading, closeInversion } = useInversion();
    const [closingInversion, setClosingInversion] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    // Filtrar solo inversiones activas
    const activeInversions = isInversions.filter(inv => inv.status !== "closed");

    // Calcular totales solo de inversiones activas
    const totalInvested = activeInversions.reduce(
        (sum, inv) => sum + (inv.amount || 0),
        0
    );

    const totalProfitability = activeInversions.reduce(
        (sum, inv) => sum + ((inv.real_profitability || 0) * (inv.amount || 0)) / 100,
        0
    );

    const averageProfitability = activeInversions.length > 0
        ? activeInversions.reduce((sum, inv) => sum + (inv.real_profitability || 0), 0) / activeInversions.length
        : 0;

    const totalValue = totalInvested + totalProfitability;

    const handleCloseInversion = async () => {
        if (!closingInversion) return;

        setIsClosing(true);
        try {
            await closeInversion(closingInversion._id);
            setClosingInversion(null);
        } catch (error) {
            console.error("Error cerrando inversión:", error);
        } finally {
            setIsClosing(false);
        }
    };

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
                            <h1 className="text-slate-500 dark:text-slate-400">{t("totalInvested").toUpperCase()}</h1>
                        </div>
                        <h1 className="text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            € {Number(totalInvested).toFixed(2)}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">{t("totalInvested")}</p>
                    </div>
                </div>

                {/* Rentabilidad Total */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-slate-500 dark:text-slate-400">{t("performance").toUpperCase()}</h1>
                        </div>
                        <h1 className="text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            € {Number(totalProfitability).toFixed(2)}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">{t("performance")}</p>
                    </div>
                </div>

                {/* Valor Total */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-slate-500 dark:text-slate-400">{t("currentValue").toUpperCase()}</h1>
                        </div>
                        <h1 className="text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            € {Number(totalValue).toFixed(2)}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">{t("currentValue")}</p>
                    </div>
                </div>

                {/* Rentabilidad Media */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-slate-500 dark:text-slate-400">{t("roi").toUpperCase()}</h1>
                        </div>
                        <h1 className="text-4xl text-slate-900 dark:text-slate-100 mb-1">
                            {Number(averageProfitability).toFixed(2)} %
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">{t("roi")}</p>
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
                                {t("portfolioDistribution")}
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
                                {t("profitabilityComparison")}
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
                                {t("portfolioEvolution")}
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

            {/* Lista de inversiones activas */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    {t("activeInvestments")} ({activeInversions.length})
                </h2>
                {activeInversions.length === 0 ? (
                    <div className="text-center py-12">
                        <DollarSign className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 text-lg">
                            {t("noActiveInvestments")}
                        </p>
                        <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                            {t("monthlyBudget")}: €{Number(isInversionFromNomina || 0).toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("title")}</th>
                                    <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("type")}</th>
                                    <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("amount")}</th>
                                    <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("targetProfitability")}</th>
                                    <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("realProfitability")}</th>
                                    <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("performance")}</th>
                                    <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("currentValue")}</th>
                                    <th className="text-center py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{tCommon("date")}</th>
                                    <th className="text-center py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{tCommon("edit")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeInversions.map((inversion) => {
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
                                                            {t("noSymbol")}
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
                                            <td className="py-3 px-4 text-center">
                                                <button
                                                    onClick={() => setClosingInversion(inversion)}
                                                    className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm font-medium"
                                                >
                                                    {t("closeInvestment")}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Historial de inversiones cerradas */}
            <InvestmentHistory />

            {/* Modal de confirmación para cerrar inversión */}
            {closingInversion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl border-2 border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <X className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                {t("closeInvestment")}
                            </h3>
                        </div>

                        <div className="mb-6">
                            <p className="text-slate-700 dark:text-slate-300 mb-4">
                                {t("closeInvestmentConfirm")}
                            </p>

                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">{t("title")}:</span>
                                    <span className="font-bold text-slate-900 dark:text-slate-100">
                                        {closingInversion.symbol || closingInversion.type}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">{t("investedCapital")}:</span>
                                    <span className="font-medium text-slate-900 dark:text-slate-100">
                                        €{closingInversion.amount.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">{t("performance")}:</span>
                                    <span className={`font-medium ${(closingInversion.real_profitability || 0) >= 0
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {(closingInversion.real_profitability || 0) >= 0 ? '+' : ''}
                                        {(closingInversion.real_profitability || 0).toFixed(2)}%
                                    </span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-600">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">{t("finalValue")}:</span>
                                    <span className="font-bold text-slate-900 dark:text-slate-100">
                                        €{(closingInversion.amount + ((closingInversion.real_profitability || 0) * closingInversion.amount) / 100).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                <p className="text-sm text-blue-800 dark:text-blue-300">
                                    💰 {t("closeInvestmentNote")}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setClosingInversion(null)}
                                disabled={isClosing}
                                className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-medium disabled:opacity-50"
                            >
                                {tCommon("cancel")}
                            </button>
                            <button
                                onClick={handleCloseInversion}
                                disabled={isClosing}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isClosing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        {t("closingAction")}...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        {t("confirmClose")}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InversionSummary;
