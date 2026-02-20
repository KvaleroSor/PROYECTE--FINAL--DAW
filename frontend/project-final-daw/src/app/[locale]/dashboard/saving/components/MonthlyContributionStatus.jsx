"use client";

import { useSaving } from "@/app/context/SavingContext.js";
import { Calendar, PlayCircle, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const MonthlyContributionStatus = () => {
    const t = useTranslations("savingsPage");
    const { data: session } = useSession();
    const { manualProcessContributions, isLoading } = useSaving();
    const [lastProcessed, setLastProcessed] = useState(null);
    const [nextProcessing, setNextProcessing] = useState(null);

    useEffect(() => {
        if (session?.user?.user_id) {
            const lastProcessedKey = `lastProcessed_${session.user.user_id}`;
            const stored = localStorage.getItem(lastProcessedKey);

            if (stored) {
                const date = new Date(stored);
                setLastProcessed(date);

                // Calcular la siguiente fecha de procesamiento (primer día del próximo mes)
                const next = new Date(date);
                next.setMonth(next.getMonth() + 1);
                next.setDate(1);
                setNextProcessing(next);
            }
        }
    }, [session]);

    const formatDate = (date) => {
        if (!date) return "Nunca";
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    //💡 REVISAR LA FORMA DE MOSTRAR PARA LA CONFIRMACIÓN ❌
    const handleManualProcess = async () => {
        if (window.confirm(t("processContributionsConfirm"))) {
            await manualProcessContributions();
            // Actualizar las fechas
            const date = new Date();
            setLastProcessed(date);
            const next = new Date(date);
            next.setMonth(next.getMonth() + 1);
            next.setDate(1);
            setNextProcessing(next);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg p-4 mb-6 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{t("monthlyContributionStatus.title")}</h3>
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Último procesamiento:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        {formatDate(lastProcessed)}
                    </span>
                </div>

                {nextProcessing && (
                    <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Próximo automático:</span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                            {formatDate(nextProcessing)}
                        </span>
                    </div>
                )}

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                        💡 Las contribuciones se procesan automáticamente cada mes. También puedes procesar manualmente si lo deseas.
                    </p>
                    <button
                        onClick={handleManualProcess}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 dark:bg-slate-600 text-white rounded-lg hover:bg-slate-900 dark:hover:bg-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                    >
                        <PlayCircle className="w-4 h-4" />
                        {isLoading ? "Procesando..." : "Procesar Contribución Manual"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MonthlyContributionStatus;
