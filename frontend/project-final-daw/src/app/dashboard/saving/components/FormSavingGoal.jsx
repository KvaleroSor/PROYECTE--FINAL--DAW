"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSaving } from "@/app/context/SavingContext.js";
import {
    Target,
    Wallet,
    Calendar,
    Percent,
    X,
    TrendingUp,
    AlertCircle,
} from "lucide-react";

const FormSavingGoal = () => {
    const { data: session } = useSession();
    const {
        // Estados
        savingGoals,
        selectedGoal,
        isSavingFromNomina,
        isGoalName,
        isDescription,
        isTargetAmount,
        isCurrentAmount,
        isPercentageAllocation,
        isDeadline,
        isPriority,

        // Setters
        setIsFormSavingOpen,
        setIsGoalName,
        setIsDescription,
        setIsTargetAmount,
        setIsCurrentAmount,
        setIsPercentageAllocation,
        setIsDeadline,
        setIsPriority,

        // Funciones
        createSavingGoal,
        updateSavingGoal,
        calculateUnallocatedPercentage,
        calculateMonthlyContribution,
        resetForm,
    } = useSaving();

    const [isError, setIsError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const unallocatedPercentage = calculateUnallocatedPercentage();
    const monthlyContribution = calculateMonthlyContribution(isPercentageAllocation);

    const priorities = [
        { value: "high", label: "Alta", color: "bg-red-500" },
        { value: "medium", label: "Media", color: "bg-yellow-500" },
        { value: "low", label: "Baja", color: "bg-green-500" },
    ];

    const handleCloseForm = () => {
        resetForm();
        setIsFormSavingOpen(false);
        setIsError("");
        setIsSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError("");
        setIsSuccess(false);

        // Validaciones
        if (!isGoalName.trim()) {
            setIsError("El nombre de la meta es obligatorio");
            return;
        }

        if (!isTargetAmount || isTargetAmount <= 0) {
            setIsError("El monto objetivo debe ser mayor a 0");
            return;
        }

        if (!isPercentageAllocation || isPercentageAllocation <= 0) {
            setIsError("El porcentaje de asignación debe ser mayor a 0");
            return;
        }

        if (isPercentageAllocation > unallocatedPercentage) {
            setIsError(`Solo tienes ${unallocatedPercentage.toFixed(1)}% disponible para asignar`);
            return;
        }

        const goalData = {
            goal_name: isGoalName,
            description: isDescription,
            target_amount: Number(isTargetAmount),
            current_amount: Number(isCurrentAmount),
            percentage_allocation: Number(isPercentageAllocation),
            deadline: isDeadline || null,
            priority: isPriority,
        };

        try {
            if (selectedGoal) {
                await updateSavingGoal(selectedGoal._id, goalData);
            } else {
                await createSavingGoal(goalData);
            }
            setIsSuccess(true);
            setTimeout(() => {
                handleCloseForm();
            }, 1500);
        } catch (err) {
            setIsError(err.message || "Error al guardar la meta de ahorro");
        }
    };

    return (
        <form
            className="w-full flex flex-col justify-start items-center gap-3 text-slate-700"
            onSubmit={handleSubmit}
        >
            {/* Header */}
            <div className="w-full flex flex-row justify-between mb-3 gap-2">
                <div className="flex flex-col justify-start">
                    <h1 className="text-2xl font-semibold">
                        {selectedGoal ? "Editar Meta de Ahorro" : "Crear Meta de Ahorro"}
                    </h1>
                    <p className="text-sm text-gray-600">
                        {selectedGoal
                            ? "Actualiza tu meta de ahorro"
                            : "Define una nueva meta de ahorro"}
                    </p>
                </div>
                <div>
                    <X
                        className="w-8 h-8 transition-all duration-300 hover:rotate-90 cursor-pointer text-gray-600 hover:text-gray-900"
                        onClick={handleCloseForm}
                    />
                </div>
            </div>

            {/* Información de presupuesto disponible */}
            <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
                <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-5 h-5 text-blue-600" />
                    <p className="font-semibold text-blue-900">Presupuesto de Ahorro</p>
                </div>
                <div className="space-y-1 text-sm text-blue-800">
                    <p>Total mensual: <span className="font-bold">{isSavingFromNomina?.toFixed(2) || 0}€</span></p>
                    <p>Disponible: <span className="font-bold text-green-600">{unallocatedPercentage.toFixed(1)}%</span></p>
                </div>
            </div>

            {/* Alertas */}
            {isError && (
                <div className="w-full bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-sm text-red-800">{isError}</p>
                </div>
            )}

            {isSuccess && (
                <div className="w-full bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800 text-center">
                        ✅ Meta guardada exitosamente
                    </p>
                </div>
            )}

            {/* Nombre de la meta */}
            <div className="w-full flex flex-col gap-2">
                <label className="flex items-center gap-2 font-medium">
                    <Target className="w-4 h-4" />
                    Nombre de la Meta *
                </label>
                <input
                    type="text"
                    value={isGoalName}
                    onChange={(e) => setIsGoalName(e.target.value)}
                    placeholder="Ej: Viaje a Japón, Fondo emergencia..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>

            {/* Descripción (opcional) */}
            <div className="w-full flex flex-col gap-2">
                <label className="font-medium">Descripción (opcional)</label>
                <textarea
                    value={isDescription}
                    onChange={(e) => setIsDescription(e.target.value)}
                    placeholder="Describe tu meta de ahorro..."
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
            </div>

            {/* Monto objetivo y actual */}
            <div className="w-full grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 font-medium">
                        <TrendingUp className="w-4 h-4" />
                        Monto Objetivo *
                    </label>
                    <input
                        type="number"
                        value={isTargetAmount}
                        onChange={(e) => setIsTargetAmount(e.target.value)}
                        placeholder="3000"
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 font-medium">
                        <Wallet className="w-4 h-4" />
                        Monto Actual
                    </label>
                    <input
                        type="number"
                        value={isCurrentAmount}
                        onChange={(e) => setIsCurrentAmount(e.target.value)}
                        placeholder="0"
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Porcentaje de asignación */}
            <div className="w-full flex flex-col gap-2">
                <label className="flex items-center gap-2 font-medium">
                    <Percent className="w-4 h-4" />
                    Porcentaje de Asignación * (Disponible: {unallocatedPercentage.toFixed(1)}%)
                </label>
                <div className="flex gap-2 items-center">
                    <input
                        type="number"
                        value={isPercentageAllocation}
                        onChange={(e) => setIsPercentageAllocation(e.target.value)}
                        placeholder="50"
                        min="0"
                        max="100"
                        step="0.1"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                    <span className="text-gray-600">%</span>
                </div>
                {isPercentageAllocation > 0 && (
                    <p className="text-sm text-blue-600">
                        💰 Contribución mensual: <span className="font-bold">{monthlyContribution.toFixed(2)}€</span>
                    </p>
                )}
            </div>

            {/* Fecha límite */}
            <div className="w-full flex flex-col gap-2">
                <label className="flex items-center gap-2 font-medium">
                    <Calendar className="w-4 h-4" />
                    Fecha Límite (opcional)
                </label>
                <input
                    type="date"
                    value={isDeadline}
                    onChange={(e) => setIsDeadline(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Prioridad */}
            <div className="w-full flex flex-col gap-2">
                <label className="font-medium">Prioridad</label>
                <div className="flex gap-3">
                    {priorities.map((priority) => (
                        <button
                            key={priority.value}
                            type="button"
                            onClick={() => setIsPriority(priority.value)}
                            className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                                isPriority === priority.value
                                    ? `${priority.color} text-white border-transparent`
                                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                            }`}
                        >
                            {priority.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Botones de acción */}
            <div className="w-full flex gap-3 mt-4">
                <button
                    type="button"
                    onClick={handleCloseForm}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                    {selectedGoal ? "Actualizar Meta" : "Crear Meta"}
                </button>
            </div>
        </form>
    );
};

export default FormSavingGoal;
