"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSaving } from "@/app/context/SavingContext.js";
import { useSpends } from "@/app/context/SpendContext.js";
import { useCategories } from "@/app/context/CategoryContext.js";
import {
    Target,
    Wallet,
    Calendar,
    Percent,
    X,
    TrendingUp,
    AlertCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";

const FormSavingGoal = () => {
    const t = useTranslations("savings");
    const { data: session } = useSession();
    const { isSpends } = useSpends();
    const { isCategories } = useCategories();
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
    const [gastoImprevistos, setGastoImprevistos] = useState(0);
    const [netSaving, setNetSaving] = useState(0);

    const unallocatedPercentage = calculateUnallocatedPercentage();
    const monthlyContribution = calculateMonthlyContribution(isPercentageAllocation);

    // Calcular gastos imprevistos y ahorro neto
    useEffect(() => {
        const isCategoriesId = isCategories
            .filter((cat) => cat.category_type === "Imprevistos")
            .map((category) => category._id);

        const spendsByIds = isSpends.filter((spend) =>
            isCategoriesId.includes(spend.category_id)
        );

        const sumaTotal = spendsByIds
            .map((spend) => spend.amount)
            .reduce((acc, current) => acc + current, 0);

        setGastoImprevistos(sumaTotal);
        const calculatedNetSaving = isSavingFromNomina - sumaTotal;
        setNetSaving(calculatedNetSaving);
    }, [isSpends, isCategories, isSavingFromNomina]);

    const priorities = [
        { value: "high", label: t("priorityHigh"), color: "bg-red-500" },
        { value: "medium", label: t("priorityMedium"), color: "bg-yellow-500" },
        { value: "low", label: t("priorityLow"), color: "bg-green-500" },
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
            setIsError(t("goalNameRequired"));
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
            setIsError(err.message || t("errorSavingGoal"));
        }
    };

    return (
        <form
            className="w-full flex flex-col justify-start items-center gap-3 text-slate-700 dark:text-slate-300"
            onSubmit={handleSubmit}
        >
            {/* Header */}
            <div className="w-full flex flex-row justify-between mb-3 gap-2">
                <div className="flex flex-col justify-start">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        {selectedGoal ? t("editGoal") : t("createNewGoal")}
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {selectedGoal
                            ? t("updateGoal")
                            : t("defineNewGoal")}
                    </p>
                </div>
                <div>
                    <X
                        className="w-15 h-15 transition-all duration-300 hover:rotate-90 cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                        onClick={handleCloseForm}
                    />
                </div>
            </div>

            {/* Información de presupuesto disponible */}
            <div className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-4 mb-2">
                <div className="flex items-center gap-2 mb-3">
                    <Wallet className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{t("savingBudget")}</p>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-700 dark:text-slate-300">{t("totalMonthly")}</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">€{isSavingFromNomina?.toFixed(2) || 0}</span>
                    </div>
                    {gastoImprevistos > 0 && (
                        <div className="flex justify-between items-center">
                            <span className="text-slate-700 dark:text-slate-300">{t("unexpectedExpenses")}</span>
                            <span className="font-semibold text-red-600 dark:text-red-400">-€{gastoImprevistos.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-slate-300 dark:border-slate-600">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{t("realAvailable")}</span>
                        <span className={`font-bold text-lg ${netSaving >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            €{netSaving.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-700 dark:text-slate-300">{t("unassigned")}</span>
                        <span className="font-bold text-green-700 dark:text-green-400">{unallocatedPercentage.toFixed(1)}%</span>
                    </div>
                </div>
            </div>

            {/* Alertas */}
            {isError && (
                <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <p className="text-sm text-red-800 dark:text-red-300">{isError}</p>
                </div>
            )}

            {isSuccess && (
                <div className="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <p className="text-sm text-green-800 dark:text-green-300 text-center">
                        {t("goalSavedSuccessfully")}
                    </p>
                </div>
            )}

            {/* Nombre de la meta */}
            <div className="w-full flex flex-col gap-2">
                <label className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                    <Target className="w-4 h-4" />
                    {t("goalName")} *
                </label>
                <input
                    type="text"
                    value={isGoalName}
                    onChange={(e) => setIsGoalName(e.target.value)}
                    placeholder={t("goalNamePlaceholder")}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                    required
                />
            </div>

            {/* Descripción (opcional) */}
            <div className="w-full flex flex-col gap-2">
                <label className="font-medium text-slate-900 dark:text-slate-100">{t("descriptionOptional")}</label>
                <textarea
                    value={isDescription}
                    onChange={(e) => setIsDescription(e.target.value)}
                    placeholder={t("descriptionPlaceholder")}
                    rows="2"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                />
            </div>

            {/* Monto objetivo y actual */}
            <div className="w-full grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
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
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
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
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    />
                </div>
            </div>

            {/* Porcentaje de asignación */}
            <div className="w-full flex flex-col gap-2">
                <label className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
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
                        className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        required
                    />
                    <span className="text-slate-600 dark:text-slate-400">%</span>
                </div>
                {isPercentageAllocation > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                        💰 Contribución mensual: <span className="font-bold">{monthlyContribution.toFixed(2)}€</span>
                    </p>
                )}
            </div>

            {/* Fecha límite */}
            <div className="w-full flex flex-col gap-2">
                <label className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                    <Calendar className="w-4 h-4" />
                    {t("deadlineOptional")}
                </label>
                <input
                    type="date"
                    value={isDeadline}
                    onChange={(e) => setIsDeadline(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
            </div>

            {/* Prioridad */}
            <div className="w-full flex flex-col gap-2">
                <label className="font-medium text-slate-900 dark:text-slate-100">Prioridad</label>
                <div className="flex gap-3">
                    {priorities.map((priority) => (
                        <button
                            key={priority.value}
                            type="button"
                            onClick={() => setIsPriority(priority.value)}
                            className={`border-2 flex flex-1 justify-center items-center p-5 rounded-xl gap-2 cursor-pointer transition-colors ${isPriority === priority.value
                                ? "bg-slate-800 dark:bg-slate-600 text-slate-100 shadow-md"
                                : "border-slate-300 dark:border-slate-600 hover:border-slate-800 dark:hover:border-slate-400 bg-gray-100 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200"
                                }`}
                        >
                            {priority.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Botones de acción */}
            <div className="w-full flex flex-col gap-2 mt-4">
                <button
                    type="submit"
                    className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-800 dark:bg-slate-600 text-slate-100 hover:border-slate-100 dark:hover:border-slate-400"
                >
                    <Target className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    <span>{selectedGoal ? "Actualizar Meta" : "Crear Meta"}</span>
                </button>
                <button
                    type="button"
                    onClick={handleCloseForm}
                    className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 hover:border-slate-900 dark:hover:border-slate-400 text-slate-600 dark:text-slate-300"
                >
                    <X className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Cancelar</span>
                </button>
            </div>
        </form>
    );
};

export default FormSavingGoal;
