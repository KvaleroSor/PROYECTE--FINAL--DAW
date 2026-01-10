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
        high: "border-red-500 bg-red-50",
        medium: "border-yellow-500 bg-yellow-50",
        low: "border-green-500 bg-green-50",
    };

    const priorityLabels = {
        high: "Alta",
        medium: "Media",
        low: "Baja",
    };

    const statusColors = {
        active: "bg-blue-100 text-blue-800",
        completed: "bg-green-100 text-green-800",
        paused: "bg-gray-100 text-gray-800",
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
        <div
            className={`border-l-4 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white ${
                priorityColors[goal.priority] || "border-gray-300"
            }`}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Target className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-bold text-gray-800">{goal.goal_name}</h3>
                    </div>
                    {goal.description && (
                        <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    )}
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                    <button
                        onClick={handleEdit}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Editar"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Eliminar"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Tags: Estado y Prioridad */}
            <div className="flex gap-2 mb-4">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[goal.status]
                    }`}
                >
                    {statusLabels[goal.status]}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    Prioridad: {priorityLabels[goal.priority]}
                </span>
            </div>

            {/* Montos */}
            <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progreso</span>
                    <span className="font-bold text-gray-800">
                        {goal.current_amount.toFixed(2)}€ / {goal.target_amount.toFixed(2)}€
                    </span>
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{progress.toFixed(1)}% completado</span>
                    <span>{(goal.target_amount - goal.current_amount).toFixed(2)}€ restantes</span>
                </div>
            </div>

            {/* Información adicional */}
            <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>Contribución mensual:</span>
                    </div>
                    <span className="font-bold text-blue-600">
                        {monthlyContribution.toFixed(2)}€
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span>Asignación:</span>
                    </div>
                    <span className="font-bold text-gray-700">
                        {goal.percentage_allocation.toFixed(1)}%
                    </span>
                </div>

                {monthsRemaining !== Infinity && monthsRemaining > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tiempo estimado:</span>
                        <span className="font-bold text-gray-700">
                            {monthsRemaining} {monthsRemaining === 1 ? "mes" : "meses"}
                        </span>
                    </div>
                )}

                {goal.deadline && (
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Fecha límite:</span>
                        </div>
                        <span className="font-medium text-gray-700">{formatDate(goal.deadline)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavingGoalCard;
