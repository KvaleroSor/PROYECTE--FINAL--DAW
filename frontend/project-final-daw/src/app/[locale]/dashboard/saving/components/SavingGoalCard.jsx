"use client";

import { useSaving } from "@/app/context/SavingContext.js";
import { Target, TrendingUp, Calendar, Trash2, Edit, Plus } from "lucide-react";

const SavingGoalCard = ({ goal }) => {
    const {
        calculateProgress,
        calculateMonthlyContribution,
        calculateMonthsRemaining,
        deleteSavingGoal,
        setSelectedGoal,
        setIsFormSavingOpen,
    } = useSaving();

    const progress = calculateProgress(goal.current_amount, goal.target_amount);
    const monthlyContribution = calculateMonthlyContribution(goal.percentage_allocation);
    const monthsRemaining = calculateMonthsRemaining(
        goal.current_amount,
        goal.target_amount,
        monthlyContribution
    );

    const priorityColors = {
        high: "border-red-500 bg-white dark:bg-slate-800",
        medium: "border-yellow-500 bg-white dark:bg-slate-800",
        low: "border-green-500 bg-white dark:bg-slate-800",
    };

    const priorityLabels = {
        high: "Alta",
        medium: "Media",
        low: "Baja",
    };

    const statusColors = {
        active: "bg-slate-100 dark:bg-slate-600 text-slate-800 dark:text-slate-200",
        completed: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
        paused: "bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300",
    };

    const statusLabels = {
        active: "Activa",
        completed: "Completada",
        paused: "Pausada",
    };

    const handleEdit = () => {
        setSelectedGoal(goal);
        setIsFormSavingOpen(true);
    };

    const handleDelete = async () => {
        if (window.confirm(`¿Estás seguro de eliminar la meta "${goal.goal_name}"?`)) {
            try {
                await deleteSavingGoal(goal._id);
            } catch (err) {
                console.error("Error al eliminar:", err);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Sin fecha límite";
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="group rounded-lg p-5 shadow-lg hover:shadow-md transition-all duration-300 border-gray-300 bg-white dark:bg-slate-700">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Target className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{goal.goal_name}</h3>
                    </div>
                    {goal.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{goal.description}</p>
                    )}
                </div>
            </div>

            {/* Tags: Estado y Prioridad */}
            <div className="flex gap-2 mb-4">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium  ${statusColors[goal.status]
                        }`}
                >
                    {statusLabels[goal.status]}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300">
                    Prioridad: {priorityLabels[goal.priority]}
                </span>
            </div>

            {/* Montos */}
            <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-300">Progreso</span>
                    <span className="text-md text-slate-900 dark:text-slate-300">
                        {goal.current_amount.toFixed(2)}€ / {goal.target_amount.toFixed(2)}€
                    </span>
                </div>

                {/* Barra de progreso */}
                <div className="w-full h-2 sm:h-3 bg-slate-100 dark:bg-slate-700 rounded-full border-2 dark:border-slate-800">
                    <div
                        className="bg-slate-700 dark:bg-slate-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-300 mt-1">
                    <span>{progress.toFixed(1)}% completado</span>
                    <span className="text-slate-700">{(goal.target_amount - goal.current_amount).toFixed(2)}€ restantes</span>
                </div>
            </div>

            {/* Información adicional */}
            <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <TrendingUp className="w-4 h-4" />
                        <span>Contribución mensual:</span>
                    </div>
                    <span className="text-slate-900 dark:text-slate-300">
                        {monthlyContribution.toFixed(2)}€
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span>Asignación:</span>
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">
                        {goal.percentage_allocation.toFixed(1)}%
                    </span>
                </div>

                {monthsRemaining !== Infinity && monthsRemaining > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-300">Tiempo estimado:</span>
                        <span className="text-slate-700 dark:text-slate-300">
                            {monthsRemaining} {monthsRemaining === 1 ? "mes" : "meses"}
                        </span>
                    </div>
                )}

                {goal.deadline && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-500">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <Calendar className="w-4 h-4" />
                            <span>Fecha límite:</span>
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{formatDate(goal.deadline)}</span>
                    </div>
                )}
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 pt-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col sm:flex-row gap-2">
                    <button
                        className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-900 dark:bg-slate-600 hover:bg-slate-800 dark:hover:bg-slate-500 text-white rounded-lg transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit()
                        }}
                    >
                        Editar Meta
                    </button>
                    <button
                        className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-700 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete()
                        }}
                    >
                        Eliminar Meta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavingGoalCard;

