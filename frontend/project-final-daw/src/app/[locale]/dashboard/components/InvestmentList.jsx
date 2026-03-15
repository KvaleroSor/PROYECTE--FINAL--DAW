"use client";

import { useInversion } from "@/app/context/InversionContext";
import { useFinancial } from "@/app/context/FinancialContext";
import { DollarSign, TrendingUp, TrendingDown, Plus, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";

const InvestmentList = () => {
    const t = useTranslations("investments");
    const { isInversions, isLoading, setIsFormInversionOpen } = useInversion();
    const { isInvestmentFromNomina } = useFinancial();

    // Filtrar inversiones activas y cerradas
    const activeInversions = isInversions.filter(inv => inv.status !== "closed");
    const closedInversions = isInversions.filter(inv => inv.status === "closed");

    // Calcular capital disponible
    const totalInvested = activeInversions.reduce((acc, inv) => acc + Number(inv.amount || 0), 0);
    const capitalFromClosedInversions = closedInversions.reduce((acc, inv) => {
        const finalValue = inv.final_value || (Number(inv.amount || 0) + ((inv.real_profitability || 0) * Number(inv.amount || 0)) / 100);
        return acc + finalValue;
    }, 0);
    const baseCapital = capitalFromClosedInversions > 0 ? capitalFromClosedInversions : isInvestmentFromNomina;
    const availableToInvest = baseCapital - totalInvested;

    // Calcular beneficios totales de inversiones cerradas
    const totalProfitFromClosed = closedInversions.reduce((acc, inv) => {
        const profit = inv.final_profit_loss || ((inv.real_profitability || 0) * Number(inv.amount || 0)) / 100;
        return acc + profit;
    }, 0);

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    {t("activeInvestments")}
                </h2>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800 dark:border-slate-400"></div>
                </div>
            </div>
        );
    }

    if (activeInversions.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 dark:bg-slate-700 p-4 rounded-xl">
                    <div className="flex flex-col sm:flex-col items-start sm:items-start gap-2">
                        <h2 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">
                            {t("activeInvestments")}
                        </h2>
                        <span className="text-sm text-slate-300 dark:text-slate-400">
                            ({activeInversions.length} {activeInversions.length !== 1 ? t("actives") : t("active")})
                        </span>
                    </div>
                    <button
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-3 sm:px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group border-slate-300 dark:border-slate-700 bg-slate-800 dark:bg-slate-400 text-slate-100 text-slate-100 text-sm sm:text-base flex-shrink-0"
                        onClick={() => setIsFormInversionOpen(true)}
                    >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                        <span>{t("addInvestment")}</span>
                    </button>
                </div>
                <div className="text-center py-8">
                    <DollarSign className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400">
                        {t("noActiveInvestments")}
                    </p>
                </div>
            </div>
        );
    }

    // Mostrar las últimas 5 inversiones activas
    const recentInversions = [...activeInversions]
        .sort((a, b) => new Date(b.inversion_date) - new Date(a.inversion_date))
        .slice(0, 5);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900 dark:bg-slate-700 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h2 className="text-xl font-semibold text-slate-100">
                        {t("activeInvestments")}
                    </h2>
                    <span className="text-sm text-slate-300 dark:text-slate-400">
                        ({activeInversions.length} {activeInversions.length !== 1 ? t("actives") : t("active")})
                    </span>
                </div>
                <button
                    className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-3 sm:px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group bg-slate-700 dark:bg-slate-500 hover:bg-slate-600 dark:hover:bg-slate-400 text-slate-100 text-sm sm:text-base flex-shrink-0"
                    onClick={() => setIsFormInversionOpen(true)}
                >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span>{t("addInvestment")}</span>
                </button>
            </div>

            {/* Tarjeta de información de capital disponible */}
            <div className="px-6 pt-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Wallet className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {t("capitalAvailableToInvest")}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-slate-600 dark:text-slate-400 mb-1">{t("available")}</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                €{availableToInvest.toFixed(2)}
                            </p>
                        </div>
                        {closedInversions.length > 0 && (
                            <>
                                <div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-1">{t("recoveredCapital")}</p>
                                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        €{capitalFromClosedInversions.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {t("from")} {closedInversions.length} {closedInversions.length !== 1 ? t("closedInvestments") : t("closedInvestment")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-1">{t("totalProfits")}</p>
                                    <p className={`text-lg font-semibold ${totalProfitFromClosed >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {totalProfitFromClosed >= 0 ? '+' : ''}€{totalProfitFromClosed.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {t("accumulated")}
                                    </p>
                                </div>
                            </>
                        )}
                        {closedInversions.length === 0 && (
                            <div className="sm:col-span-2">
                                <p className="text-slate-600 dark:text-slate-400 mb-1">{t("monthlyBudget")}</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    €{isInvestmentFromNomina.toFixed(2)}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {t("assignedFromSalary")}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-3">
                {recentInversions.map((inversion) => {
                    const profitability = ((inversion.real_profitability || 0) * (inversion.amount || 0)) / 100;
                    const totalValue = (inversion.amount || 0) + profitability;
                    const isPositive = (inversion.real_profitability || 0) >= 0;

                    return (
                        <div
                            key={inversion._id}
                            className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isPositive
                                    ? 'bg-green-100 dark:bg-green-900/30'
                                    : 'bg-red-100 dark:bg-red-900/30'
                                    }`}>
                                    {isPositive ? (
                                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    ) : (
                                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        {inversion.symbol && (
                                            <span className="text-slate-900 dark:text-slate-100 font-bold">
                                                {inversion.symbol}
                                            </span>
                                        )}
                                        <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-600 rounded text-xs text-slate-700 dark:text-slate-300">
                                            {inversion.type}
                                        </span>
                                    </div>
                                    {inversion.name && (
                                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                                            {inversion.name}
                                        </p>
                                    )}
                                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                        {new Date(inversion.inversion_date).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right flex-shrink-0 ml-4">
                                <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                    €{totalValue.toFixed(2)}
                                </p>
                                <p className={`text-sm font-medium ${isPositive
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                                    }`}>
                                    {isPositive ? '+' : ''}{(inversion.real_profitability || 0).toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {activeInversions.length > 5 && (
                <div className="px-6 pb-6 text-center">
                    <a
                        href="/dashboard/inversion"
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    >
                        {t("viewAllInvestments")}
                    </a>
                </div>
            )}
        </div>
    );
};

export default InvestmentList;
