"use client";

import { useFinancial } from "@/app/context/FinancialContext.js";
import { TrendingUp, DollarSign, Target, ArrowUpRight, Briefcase } from "lucide-react";

const InvestmentSummary = () => {
    const { isInvestmentFromNomina, isNomina, isPercentageSettings } = useFinancial();

    // Por ahora mostraremos datos del presupuesto de inversión
    // Cuando implementes el CRUD de inversiones, aquí conectarás con el contexto real
    const monthlyInvestmentBudget = isInvestmentFromNomina || 0;
    const investmentPercentage = isPercentageSettings?.investment || 0;

    // Datos de ejemplo - reemplazar cuando tengas inversiones reales
    const totalInvested = 0; // Suma de todas las inversiones
    const expectedReturn = 0; // target_profitability promedio
    const currentValue = 0; // total de inversiones

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

            {/* Presupuesto Mensual */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Presupuesto Mensual</span>
                    <span className="text-lg font-bold text-slate-900">
                        €{monthlyInvestmentBudget.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600">
                    <span>Asignado</span>
                    <span className="font-semibold">{investmentPercentage.toFixed(1)}% de la nómina</span>
                </div>
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
                    <p className="text-2xl font-bold text-slate-900">€{totalInvested.toFixed(2)}</p>
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
                    <p className="text-2xl font-bold text-slate-900">€{currentValue.toFixed(2)}</p>
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
                    <p className="text-2xl font-bold text-slate-900">
                        €{(currentValue - totalInvested).toFixed(2)}
                    </p>
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
