"use client";

import { useInversion } from "@/app/context/InversionContext";
import { Download, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

const ExportReports = () => {
    const t = useTranslations("investments");
    const { isInversions } = useInversion();

    // Exportar a CSV
    const exportToCSV = () => {
        if (isInversions.length === 0) {
            alert(t("noInvestmentsToExport"));
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
            alert(t("noInvestmentsToExport"));
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

    // Exportar informe fiscal para Hacienda (solo inversiones cerradas)
    const exportTaxReport = () => {
        const closedInversions = isInversions.filter(inv => inv.status === "closed");

        if (closedInversions.length === 0) {
            alert(t("noClosedInvestmentsForTaxReport"));
            return;
        }

        const currentYear = new Date().getFullYear();
        const yearInversions = closedInversions.filter(inv =>
            new Date(inv.closing_date).getFullYear() === currentYear
        );

        const totalGains = yearInversions
            .filter(inv => (inv.final_profit_loss || 0) > 0)
            .reduce((sum, inv) => sum + (inv.final_profit_loss || 0), 0);

        const totalLosses = yearInversions
            .filter(inv => (inv.final_profit_loss || 0) < 0)
            .reduce((sum, inv) => sum + Math.abs(inv.final_profit_loss || 0), 0);

        const netResult = totalGains - totalLosses;

        const taxReport = {
            titulo: `INFORME FISCAL DE INVERSIONES - AÑO ${currentYear}`,
            fecha_generacion: new Date().toISOString(),
            ejercicio_fiscal: currentYear,
            resumen_fiscal: {
                total_ganancias: totalGains.toFixed(2),
                total_perdidas: totalLosses.toFixed(2),
                resultado_neto: netResult.toFixed(2),
                numero_operaciones: yearInversions.length,
            },
            detalle_operaciones: yearInversions.map((inv) => ({
                fecha_apertura: new Date(inv.inversion_date).toLocaleDateString('es-ES'),
                fecha_cierre: new Date(inv.closing_date).toLocaleDateString('es-ES'),
                simbolo: inv.symbol || "N/A",
                nombre: inv.name || "N/A",
                tipo_activo: inv.type,
                importe_invertido: inv.amount.toFixed(2),
                valor_final: (inv.final_value || 0).toFixed(2),
                ganancia_perdida: (inv.final_profit_loss || 0).toFixed(2),
                rentabilidad_porcentual: (inv.real_profitability || 0).toFixed(2) + "%",
            })),
            nota_legal: "Este informe es un resumen de sus operaciones de inversión. Consulte con un asesor fiscal para la correcta declaración de impuestos.",
        };

        const csvContent = [
            "INFORME FISCAL DE INVERSIONES - AÑO " + currentYear,
            "Fecha de generación: " + new Date().toLocaleDateString('es-ES'),
            "",
            "RESUMEN FISCAL",
            `Total Ganancias,€${totalGains.toFixed(2)}`,
            `Total Pérdidas,€${totalLosses.toFixed(2)}`,
            `Resultado Neto,€${netResult.toFixed(2)}`,
            `Número de Operaciones,${yearInversions.length}`,
            "",
            "DETALLE DE OPERACIONES",
            "Fecha Apertura,Fecha Cierre,Símbolo,Nombre,Tipo,Invertido (€),Valor Final (€),Ganancia/Pérdida (€),Rentabilidad (%)",
            ...yearInversions.map(inv =>
                `${new Date(inv.inversion_date).toLocaleDateString('es-ES')},${new Date(inv.closing_date).toLocaleDateString('es-ES')},${inv.symbol || "N/A"},${inv.name || "N/A"},${inv.type},${inv.amount.toFixed(2)},${(inv.final_value || 0).toFixed(2)},${(inv.final_profit_loss || 0).toFixed(2)},${(inv.real_profitability || 0).toFixed(2)}%`
            ),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", `informe_fiscal_${currentYear}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-md transition-all duration-300">
            <h2 className="text-3xl text-gray-900 dark:text-slate-100 mb-4">
                {t("exportReports")}
            </h2>

            <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {t("downloadInvestmentData")}
                </p>

                <button
                    onClick={exportTaxReport}
                    disabled={isInversions.filter(inv => inv.status === "closed").length === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    <FileText className="w-5 h-5" />
                    <span>📋 {t("taxReportForHacienda")}</span>
                </button>

                <button
                    onClick={exportToCSV}
                    disabled={isInversions.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 dark:bg-slate-600 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-5 h-5" />
                    <span>{t("exportToCSV")}</span>
                </button>

                <button
                    onClick={exportToJSON}
                    disabled={isInversions.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-5 h-5" />
                    <span>{t("exportJSONReport")}</span>
                </button>

                {isInversions.length === 0 && (
                    <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
                        {t("addInvestmentsToExport")}
                    </p>
                )}
                {isInversions.filter(inv => inv.status === "closed").length === 0 && isInversions.length > 0 && (
                    <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
                        💡 {t("closeInvestmentsForTaxReport")}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ExportReports;
