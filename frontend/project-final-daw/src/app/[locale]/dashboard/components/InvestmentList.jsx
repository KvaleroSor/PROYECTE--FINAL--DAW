"use client";

import { useInversion } from "@/app/context/InversionContext";
import { useFinancial } from "@/app/context/FinancialContext";
import { useBlur } from "@/app/context/BlurContext";
import { DollarSign, TrendingUp, TrendingDown, Plus, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";

const InvestmentList = () => {
    const t = useTranslations("investments");
    const { isInversions, isLoading, setIsFormInversionOpen } = useInversion();
    const { isInvestmentFromNomina } = useFinancial();
    const { isBlurred } = useBlur();

    // Filtrar inversiones activas y cerradas
    const activeInversions = isInversions.filter(inv => inv.status !== "closed");
    const closedInversions = isInversions.filter(inv => inv.status === "closed");

    // Calcular capital disponible
    const totalInvested = activeInversions.reduce((acc, inv) => acc + Number(inv.amount || 0), 0);
    const capitalFromClosedInversions = closedInversions.reduce((acc, inv) => {
        const finalValue = inv.final_value || (Number(inv.amount || 0) + ((inv.real_profitability || 0) * Number(inv.amount || 0)) / 100);
        return acc + finalValue;
    }, 0);

    // LÓGICA CORRECTA: Disponible = Presupuesto inicial - Invertido activo + Capital recuperado
    const availableToInvest = isInvestmentFromNomina - totalInvested + capitalFromClosedInversions;

    // Calcular beneficios totales de inversiones cerradas
    const totalProfitFromClosed = closedInversions.reduce((acc, inv) => {
        const profit = inv.final_profit_loss || ((inv.real_profitability || 0) * Number(inv.amount || 0)) / 100;
        return acc + profit;
    }, 0);

    // Mostrar las últimas 5 inversiones activas
    const recentInversions = [...activeInversions]
        .sort((a, b) => new Date(b.inversion_date) - new Date(a.inversion_date))
        .slice(0, 5);

    return (
        <div className="w-full max-w-full h-full flex flex-col gap-2 p-3 sm:p-4 bg-slate-50 shadow-lg hover:shadow-md transition-all duration-300 rounded-2xl dark:bg-slate-800 overflow-x-hidden no-scrollbar">
            <div className="mb-4 sm:mb-5 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex flex-col items-start">
                        <h1 className="text-2xl sm:text-3xl text-gray-900 dark:text-slate-100 mb-2">
                            {t("activeInvestments")}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            {activeInversions.length} {activeInversions.length !== 1 ? t("actives") : t("active")}
                        </p>
                    </div>
                    <button
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-3 sm:px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group bg-slate-800 dark:bg-slate-600 hover:bg-slate-700 dark:hover:bg-slate-500 text-slate-100 text-sm sm:text-base flex-shrink-0"
                        onClick={() => setIsFormInversionOpen(true)}
                    >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                        <span>{t("addInvestment")}</span>
                    </button>
                </div>

                {isLoading ? (
                    <div className="text-slate-500 flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 dark:border-slate-400"></div>
                        <p>{t("loading")}</p>
                    </div>
                ) : activeInversions.length === 0 ? (
                    <div className="text-center py-8 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                        <DollarSign className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-500 dark:text-slate-400">
                            {t("noActiveInvestments")}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Tarjetas de información de capital disponible */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-3 sm:gap-4">
                            <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row justify-between items-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <h1 className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("available")}</h1>
                                    </div>
                                    {isBlurred ? (
                                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1 blur-md select-none">
                                            €{availableToInvest.toFixed(2)}
                                        </h1>
                                    ) : (
                                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                                            €{availableToInvest.toFixed(2)}
                                        </h1>
                                    )}
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("capitalAvailableToInvest")}</p>
                                </div>
                            </div>

                            {closedInversions.length > 0 ? (
                                <>
                                    <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                                </div>
                                                <h1 className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("recovered")}</h1>
                                            </div>
                                            {isBlurred ? (
                                                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1 blur-md select-none">
                                                    €{capitalFromClosedInversions.toFixed(2)}
                                                </h1>
                                            ) : (
                                                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                                                    €{capitalFromClosedInversions.toFixed(2)}
                                                </h1>
                                            )}
                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                                {t("from")} {closedInversions.length} {closedInversions.length !== 1 ? t("closedInvestments") : t("closedInvestment")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row justify-between items-center">
                                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${totalProfitFromClosed >= 0 ? 'bg-green-600 dark:bg-green-700' : 'bg-red-600 dark:bg-red-700'}`}>
                                                    {totalProfitFromClosed >= 0 ? (
                                                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                                    ) : (
                                                        <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                                    )}
                                                </div>
                                                <h1 className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("profits")}</h1>
                                            </div>
                                            {isBlurred ? (
                                                <h1 className={`text-2xl sm:text-3xl lg:text-4xl mb-1 blur-md select-none ${totalProfitFromClosed >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                    {totalProfitFromClosed >= 0 ? '+' : ''}€{totalProfitFromClosed.toFixed(2)}
                                                </h1>
                                            ) : (
                                                <h1 className={`text-2xl sm:text-3xl lg:text-4xl mb-1 ${totalProfitFromClosed >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                    {totalProfitFromClosed >= 0 ? '+' : ''}€{totalProfitFromClosed.toFixed(2)}
                                                </h1>
                                            )}
                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("accumulated")}</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300 sm:col-span-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-row justify-between items-center">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                            </div>
                                            <h1 className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("budget")}</h1>
                                        </div>
                                        {isBlurred ? (
                                            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1 blur-md select-none">
                                                €{isInvestmentFromNomina.toFixed(2)}
                                            </h1>
                                        ) : (
                                            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                                                €{isInvestmentFromNomina.toFixed(2)}
                                            </h1>
                                        )}
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t("assignedFromSalary")}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-row justify-between">
                            <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                <span className="font-semibold">{recentInversions.length}</span> {t("showing")}
                            </div>
                        </div>

                        <div className="max-h-[610px] overflow-y-auto flex flex-col gap-3 no-scrollbar px-1 py-1">
                            {recentInversions.map((inversion) => {
                                const profitability = ((inversion.real_profitability || 0) * (inversion.amount || 0)) / 100;
                                const totalValue = (inversion.amount || 0) + profitability;
                                const isPositive = (inversion.real_profitability || 0) >= 0;

                                return (
                                    <div
                                        key={inversion._id}
                                        className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
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
                                            {isBlurred ? (
                                                <p className="text-slate-900 dark:text-slate-100 font-semibold blur-md select-none">
                                                    €{totalValue.toFixed(2)}
                                                </p>
                                            ) : (
                                                <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                                    €{totalValue.toFixed(2)}
                                                </p>
                                            )}
                                            {isBlurred ? (
                                                <p className={`text-sm font-medium blur-md select-none ${isPositive
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                                    }`}>
                                                    {isPositive ? '+' : ''}{(inversion.real_profitability || 0).toFixed(2)}%
                                                </p>
                                            ) : (
                                                <p className={`text-sm font-medium ${isPositive
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                                    }`}>
                                                    {isPositive ? '+' : ''}{(inversion.real_profitability || 0).toFixed(2)}%
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InvestmentList;
