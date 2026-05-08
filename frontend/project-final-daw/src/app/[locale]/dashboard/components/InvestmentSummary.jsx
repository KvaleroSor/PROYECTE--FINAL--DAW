"use client";

import { useFinancial } from "@/app/context/FinancialContext.js";
import { useInversion } from "@/app/context/InversionContext.js";
import { useBlur } from "@/app/context/BlurContext";
import { TrendingUp, DollarSign, Target, ArrowUpRight, Briefcase } from "lucide-react";

const InvestmentSummary = () => {
    const { isInvestmentFromNomina, isNomina, isPercentageSettings } = useFinancial();
    const { isInversions } = useInversion();
    const { isBlurred } = useBlur();

    const investmentPercentage = isPercentageSettings?.investment || 0;

    // Calcular datos reales de inversiones
    const activeInversions = isInversions.filter(inv => inv.status !== "closed");
    const closedInversions = isInversions.filter(inv => inv.status === "closed");

    const totalInvested = activeInversions.reduce((acc, inv) => acc + Number(inv.amount || 0), 0);
    const capitalFromClosedInversions = closedInversions.reduce((acc, inv) => {
        const finalValue = inv.final_value || (Number(inv.amount || 0) + ((inv.real_profitability || 0) * Number(inv.amount || 0)) / 100);
        return acc + finalValue;
    }, 0);

    // LÓGICA CORRECTA: Disponible = Presupuesto inicial - Invertido activo + Capital recuperado
    const availableToInvest = isInvestmentFromNomina - totalInvested + capitalFromClosedInversions;

    const currentValue = activeInversions.reduce((acc, inv) => {
        const profitability = ((inv.real_profitability || 0) * Number(inv.amount || 0)) / 100;
        return acc + Number(inv.amount || 0) + profitability;
    }, 0);

    const expectedReturn = activeInversions.length > 0
        ? activeInversions.reduce((acc, inv) => acc + (inv.target_profitability || 0), 0) / activeInversions.length
        : 0;

    return (
        <div className="w-full h-full flex flex-col p-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-6 h-6 text-slate-700" />
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Inversiones</h2>
                    <p className="text-xs text-slate-500">Gestiona tu cartera</p>
                </div>
            </div>

            {/* Disponible para Invertir */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Disponible para Invertir</span>
                    {isBlurred ? (
                        <span className={`text-lg font-bold blur-md select-none ${availableToInvest >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            €{availableToInvest.toFixed(2)}
                        </span>
                    ) : (
                        <span className={`text-lg font-bold ${availableToInvest >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            €{availableToInvest.toFixed(2)}
                        </span>
                    )}
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600">
                    <span>Presupuesto mensual</span>
                    {isBlurred ? (
                        <span className="font-semibold blur-md select-none">€{isInvestmentFromNomina.toFixed(2)} ({investmentPercentage.toFixed(1)}%)</span>
                    ) : (
                        <span className="font-semibold">€{isInvestmentFromNomina.toFixed(2)} ({investmentPercentage.toFixed(1)}%)</span>
                    )}
                </div>
                {capitalFromClosedInversions > 0 && (
                    <div className="flex justify-between items-center text-xs text-slate-600 mt-1">
                        <span>+ Capital recuperado</span>
                        {isBlurred ? (
                            <span className="font-semibold blur-md select-none">€{capitalFromClosedInversions.toFixed(2)}</span>
                        ) : (
                            <span className="font-semibold">€{capitalFromClosedInversions.toFixed(2)}</span>
                        )}
                    </div>
                )}
            </div>

            {/* Estadísticas */}
            <div className="space-y-3 flex-1">
                {/* Total Invertido */}
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-slate-700" />
                            <span className="text-sm font-medium text-slate-900">Total Invertido</span>
                        </div>
                    </div>
                    {isBlurred ? (
                        <p className="text-2xl font-bold text-slate-900 blur-md select-none">€{totalInvested.toFixed(2)}</p>
                    ) : (
                        <p className="text-2xl font-bold text-slate-900">€{totalInvested.toFixed(2)}</p>
                    )}
                    <p className="text-xs text-slate-500 mt-1">Acumulado histórico</p>
                </div>

                {/* Valor Actual */}
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-slate-700" />
                            <span className="text-sm font-medium text-slate-900">Valor Actual</span>
                        </div>
                    </div>
                    {isBlurred ? (
                        <p className="text-2xl font-bold text-slate-900 blur-md select-none">€{currentValue.toFixed(2)}</p>
                    ) : (
                        <p className="text-2xl font-bold text-slate-900">€{currentValue.toFixed(2)}</p>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">
                            +{expectedReturn.toFixed(2)}% esperado
                        </span>
                    </div>
                </div>

                {/* Rendimiento */}
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-slate-700" />
                            <span className="text-sm font-medium text-slate-900">Rendimiento</span>
                        </div>
                    </div>
                    {isBlurred ? (
                        <p className="text-2xl font-bold text-slate-900 blur-md select-none">
                            €{(currentValue - totalInvested).toFixed(2)}
                        </p>
                    ) : (
                        <p className="text-2xl font-bold text-slate-900">
                            €{(currentValue - totalInvested).toFixed(2)}
                        </p>
                    )}
                    <p className="text-xs text-slate-500 mt-1">
                        {totalInvested > 0
                            ? `${(((currentValue - totalInvested) / totalInvested) * 100).toFixed(2)}% ROI`
                            : 'Sin inversiones aún'
                        }
                    </p>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <p className="text-xs text-slate-600 mb-2">
                    💡 Próximamente podrás gestionar tus inversiones aquí
                </p>
            </div>
        </div>
    );
};

export default InvestmentSummary;
