"use client";

import { useSaving } from "@/app/context/SavingContext.js";
import { useFinancial } from "@/app/context/FinancialContext.js";
import SavingGoalCard from "./SavingGoalCard.jsx";
import MonthlyContributionStatus from "./MonthlyContributionStatus.jsx";
import { Plus, Target, Wallet, TrendingUp, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const GridSavingGoals = () => {
    const t = useTranslations("savingsPage");
    const {
        savingGoals,
        isLoading,
        setIsFormSavingOpen,
        calculateUnallocatedPercentage,
        isSavingFromNomina,
    } = useSaving();

    const unallocatedPercentage = calculateUnallocatedPercentage();
    const unallocatedAmount = (unallocatedPercentage / 100) * (isSavingFromNomina || 0);

    const totalSaved = savingGoals.reduce((sum, goal) => sum + goal.current_amount, 0);
    const totalTarget = savingGoals.reduce((sum, goal) => sum + goal.target_amount, 0);
    const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

    const activeGoals = savingGoals.filter((goal) => goal.status === "active");
    const completedGoals = savingGoals.filter((goal) => goal.status === "completed");

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">
                        Metas de Ahorro
                    </h1>
                    <p className="text-gray-600 dark:text-slate-400">
                        Gestiona tus objetivos financieros y alcanza tus metas
                    </p>
                </div>
                {/* Resumen general */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Tarjeta de resumen total */}
                    <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{t("totalProgress")}</p>
                        </div>
                        <p className="text-3xl text-slate-900 dark:text-slate-100 mb-1">{overallProgress.toFixed(1)}%</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {totalSaved.toFixed(2)}€ {t("of")} {totalTarget.toFixed(2)}€
                        </p>
                    </div>

                    {/* Tarjeta de metas activas */}
                    <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{t("activeGoals")}</p>
                        </div>
                        <p className="text-3xl text-slate-900 dark:text-slate-100 mb-1">{activeGoals.length}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {completedGoals.length} {t("completed")}
                        </p>
                    </div>

                    {/* Tarjeta de presupuesto disponible */}
                    <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <Wallet className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{t("availableBudget")}</p>
                        </div>
                        <p className="text-3xl text-slate-900 dark:text-slate-100 mb-1">{unallocatedPercentage.toFixed(1)}%</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{unallocatedAmount.toFixed(2)}€/{t("month")}</p>
                    </div>
                </div>
            </div>

            {/* Estado de contribuciones mensuales */}
            {/* <MonthlyContributionStatus /> */}

            {/* Botón para crear nueva meta */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-md p-2 transition-all duration-300">
                <div className="mb-6 mt-6 flex flex-row justify-between">
                    <div>
                        <h2 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">
                            {t("activeGoals")} ({activeGoals.length})
                        </h2>
                    </div>
                    <button
                        onClick={() => setIsFormSavingOpen(true)}
                        className="flex items-center gap-2 h-10 px-3 sm:px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group bg-slate-800 dark:bg-slate-400 text-slate-100 text-sm sm:text-base flex-shrink-0"
                    >
                        <Plus className="group-hover:rotate-90 transition-transform duration-300 w-5 h-5" />
                        {t("createNewGoal")}
                    </button>

                </div>
                {/* Mensaje si no hay presupuesto disponible */}
                {unallocatedPercentage <= 0 && savingGoals.length > 0 && (
                    <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                        <p className="text-sm text-yellow-800 dark:text-yellow-300">
                            {t("budgetFullWarning")}
                        </p>
                    </div>
                )}

                {/* Lista de metas */}
                {savingGoals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Target className="w-16 h-16 text-gray-300 dark:text-slate-600 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-300 mb-2">
                            {t("noGoals")}
                        </h3>
                        <p className="text-gray-500 dark:text-slate-400 mb-6 max-w-md">
                            {t("createFirstGoalDescription")}
                        </p>
                        <button
                            onClick={() => setIsFormSavingOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            {t("createFirstGoal")}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Metas activas */}
                        {activeGoals.length > 0 && (
                            <div className="mb-8">

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {activeGoals.map((goal) => (
                                        <SavingGoalCard key={goal._id} goal={goal} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Metas completadas */}
                        {completedGoals.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    {t("completedGoals")} ({completedGoals.length})
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {completedGoals.map((goal) => (
                                        <SavingGoalCard key={goal._id} goal={goal} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}


            </div>
        </div>
    );
};

export default GridSavingGoals;
