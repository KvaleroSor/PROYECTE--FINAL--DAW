"use client";

import { useInversion } from "@/app/context/InversionContext";
import { Download, FileText } from "lucide-react";

const ExportReports = () => {
    const { isInversions } = useInversion();

    // Exportar a CSV
    const exportToCSV = () => {
        if (isInversions.length === 0) {
            alert("No hay inversiones para exportar");
            return;
        }

        const headers = [
            "Símbolo",
            "Nombre",
            "Tipo",
            "Cantidad (€)",
            "Fecha",
            "Rent. Objetivo (%)",
            "Rent. Real (%)",
            "Ganancia (€)",
            "Valor Total (€)",
        ];

        const rows = isInversions.map((inv) => {
            const profitability = ((inv.real_profitability || 0) * (inv.amount || 0)) / 100;
            const totalValue = (inv.amount || 0) + profitability;

            return [
                inv.symbol || "N/A",
                inv.name || "N/A",
                inv.type,
                inv.amount.toFixed(2),
                new Date(inv.inversion_date).toLocaleDateString("es-ES"),
                (inv.target_profitability || 0).toFixed(2),
                (inv.real_profitability || 0).toFixed(2),
                profitability.toFixed(2),
                totalValue.toFixed(2),
            ];
        });

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", `inversiones_${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Exportar resumen en JSON
    const exportToJSON = () => {
        if (isInversions.length === 0) {
            alert("No hay inversiones para exportar");
            return;
        }

        const totalInvested = isInversions.reduce((sum, inv) => sum + (inv.amount || 0), 0);
        const totalProfitability = isInversions.reduce(
            (sum, inv) => sum + ((inv.real_profitability || 0) * (inv.amount || 0)) / 100,
            0
        );
        const averageProfitability = isInversions.length > 0
            ? isInversions.reduce((sum, inv) => sum + (inv.real_profitability || 0), 0) / isInversions.length
            : 0;

        const report = {
            fecha_reporte: new Date().toISOString(),
            resumen: {
                total_invertido: totalInvested,
                ganancia_total: totalProfitability,
                valor_total: totalInvested + totalProfitability,
                rentabilidad_promedio: averageProfitability,
                numero_inversiones: isInversions.length,
            },
            inversiones: isInversions.map((inv) => ({
                symbol: inv.symbol,
                name: inv.name,
                type: inv.type,
                amount: inv.amount,
                date: inv.inversion_date,
                target_profitability: inv.target_profitability,
                real_profitability: inv.real_profitability,
                profitability_amount: ((inv.real_profitability || 0) * (inv.amount || 0)) / 100,
                total_value: (inv.amount || 0) + ((inv.real_profitability || 0) * (inv.amount || 0)) / 100,
            })),
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], {
            type: "application/json",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", `reporte_inversiones_${new Date().toISOString().split("T")[0]}.json`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Exportar Reportes
                </h2>
            </div>

            <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Descarga tus datos de inversión en diferentes formatos
                </p>

                <button
                    onClick={exportToCSV}
                    disabled={isInversions.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 dark:bg-slate-600 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-5 h-5" />
                    <span>Exportar a CSV</span>
                </button>

                <button
                    onClick={exportToJSON}
                    disabled={isInversions.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-5 h-5" />
                    <span>Exportar Reporte JSON</span>
                </button>

                {isInversions.length === 0 && (
                    <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
                        Añade inversiones para poder exportar reportes
                    </p>
                )}
            </div>
        </div>
    );
};

export default ExportReports;
