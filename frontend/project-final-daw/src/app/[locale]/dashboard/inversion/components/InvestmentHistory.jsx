"use client";

import { useInversion } from "@/app/context/InversionContext";
import { History, TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react";
import { useTranslations } from "next-intl";

const InvestmentHistory = () => {
    const t = useTranslations("investments");
    const { isInversions } = useInversion();

    // Filtrar solo inversiones cerradas
    const closedInversions = isInversions.filter((inv) => inv.status === "closed");

    // Calcular totales fiscales
    const totalGains = closedInversions
        .filter((inv) => (inv.final_profit_loss || 0) > 0)
        .reduce((sum, inv) => sum + (inv.final_profit_loss || 0), 0);

    const totalLosses = closedInversions
        .filter((inv) => (inv.final_profit_loss || 0) < 0)
        .reduce((sum, inv) => sum + Math.abs(inv.final_profit_loss || 0), 0);

    const netResult = totalGains - totalLosses;

    if (closedInversions.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-md transition-all duration-300">
                <h2 className="text-3xl text-gray-900 dark:text-slate-100 mb-4">
                    {t("investmentHistory")}
                </h2>
                <div className="text-center py-12">
                    <History className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                        {t("noClosedInvestments")}
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                        {t("closedInvestmentsWillAppear")}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-md transition-all duration-300">
            <h2 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">
                {t("investmentHistory")}
            </h2>
            <p className="text-gray-600 dark:text-slate-400 mb-6">
                {closedInversions.length} {closedInversions.length !== 1 ? t("operationsPlural") : t("operations")} {closedInversions.length !== 1 ? t("closedPlural") : t("closed")}
            </p>

            {/* Resumen fiscal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-800 dark:bg-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-slate-100 dark:text-slate-100" />
                        <span className="text-sm text-slate-100 dark:text-slate-100 font-medium">
                            {t("totalGains")}
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-slate-100 dark:text-slate-100">
                        €{totalGains.toFixed(2)}
                    </p>
                </div>

                <div className="bg-red-600 dark:bg-red-600 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="w-5 h-5 text-slate-100 dark:text-slate-100" />
                        <span className="text-sm text-slate-100 dark:text-slate-100 font-medium">
                            {t("totalLosses")}
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-slate-100 dark:text-slate-100">
                        €{totalLosses.toFixed(2)}
                    </p>
                </div>

                <div className={`${netResult >= 0
                    ? "bg-blue-800 dark:bg-blue-800"
                    : "bg-orange-800 dark:bg-orange-800"
                    } rounded-lg p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className={`w-5 h-5 ${netResult >= 0
                            ? "text-slate-100 dark:text-slate-100"
                            : "text-slate-100 dark:text-slate-100"
                            }`} />
                        <span className={`text-sm font-medium ${netResult >= 0
                            ? "text-slate-100 dark:text-slate-100"
                            : "text-slate-100 dark:text-slate-100"
                            }`}>
                            {t("netFiscalResult")}
                        </span>
                    </div>
                    <p className={`text-2xl font-bold ${netResult >= 0
                        ? "text-slate-100 dark:text-slate-100"
                        : "text-slate-100 dark:text-slate-100"
                        }`}>
                        {netResult >= 0 ? '+ ' : ''}€{netResult.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Tabla de historial */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("title")}</th>
                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("type")}</th>
                            <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("invested")}</th>
                            <th className="text-center py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("opening")}</th>
                            <th className="text-center py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("closingDate")}</th>
                            <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("profitLoss")}</th>
                            <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{t("finalValue")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {closedInversions
                            .sort((a, b) => new Date(b.closing_date) - new Date(a.closing_date))
                            .map((inversion) => {
                                const isProfit = (inversion.final_profit_loss || 0) >= 0;
                                return (
                                    <tr
                                        key={inversion._id}
                                        className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                    >
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
                                        <td className="py-3 px-4">
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-sm text-slate-900 dark:text-slate-100">
                                                {inversion.type}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right text-slate-900 dark:text-slate-100 font-medium">
                                            €{Number(inversion.amount).toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-400 text-sm">
                                            {new Date(inversion.inversion_date).toLocaleDateString('es-ES')}
                                        </td>
                                        <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-400 text-sm">
                                            {new Date(inversion.closing_date).toLocaleDateString('es-ES')}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <span className={`font-bold ${isProfit
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400'
                                                }`}>
                                                {isProfit ? '+' : ''}€{Number(inversion.final_profit_loss || 0).toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right text-slate-900 dark:text-slate-100 font-semibold">
                                            €{Number(inversion.final_value || 0).toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            {/* Nota fiscal */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>📋 {t("taxInfo")}:</strong> {t("taxInfoMessage")}
                </p>
            </div>
        </div>
    );
};

export default InvestmentHistory;
