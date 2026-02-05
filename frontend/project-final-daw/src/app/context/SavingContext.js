"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useFinancial } from "./FinancialContext.js";
import { useSavingsRealTime } from "@/app/hooks/saving/useSavingsRealTime.js";
import getSavings from "@/services/savings/getSavings.js";
import getSavingById from "@/services/savings/getSavingById.js";
import postSaving from "@/services/savings/postSaving.js";
import updateSaving from "@/services/savings/updateSaving.js";
import deleteSaving from "@/services/savings/deleteSaving.js";
import processMonthlyContributions from "@/services/savings/processMonthlyContributions.js";
import getContributionHistory from "@/services/savings/getContributionHistory.js";
import { useLeisureSpendTotalAvailable } from "@/app/hooks/spend/useLeisureSpendTotalAvailable.js";
import { useFixedSpendTotalAvailable } from "@/app/hooks/spend/useFixedSpendTotalAvailable.js";

const SavingContext = createContext();

export const SavingProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const { isSavingFromNomina } = useFinancial();

    // Estados principales
    const [savingGoals, setSavingGoals] = useState([]);
    const [isContributionHistory, setIsContributionHistory] = useState([]);
    const [isTotalContributedAllTime, setIsTotalContributedAllTime] = useState(0);
    const [isTotalSavingsAccumulated, setIsTotalSavingsAccumulated] = useState(0);
    const [isFormSavingOpen, setIsFormSavingOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [error, setError] = useState(null);

    // Estados del formulario
    const [isGoalName, setIsGoalName] = useState("");
    const [isDescription, setIsDescription] = useState("");
    const [isTargetAmount, setIsTargetAmount] = useState("");
    const [isCurrentAmount, setIsCurrentAmount] = useState(0);
    const [isPercentageAllocation, setIsPercentageAllocation] = useState("");
    const [isDeadline, setIsDeadline] = useState("");
    const [isPriority, setIsPriority] = useState("medium");
    const [isStatus, setIsStatus] = useState("active");

    // Hooks personalizados
    const { isTotalSavingsRealTime } = useSavingsRealTime(isTotalContributedAllTime);
    const { isAvailableLeisure } = useLeisureSpendTotalAvailable();
    const { isAvailableFixed } = useFixedSpendTotalAvailable();

    // Calcular cuánto % queda sin asignar
    const calculateUnallocatedPercentage = () => {
        const totalAllocated = savingGoals.reduce(
            (sum, goal) => sum + (goal.percentage_allocation || 0),
            0
        );
        return 100 - totalAllocated;
    };

    // Calcular el monto mensual por meta según el porcentaje
    const calculateMonthlyContribution = (percentage_allocation) => {
        if (!isSavingFromNomina || !percentage_allocation) return 0;
        return (percentage_allocation / 100) * isSavingFromNomina;
    };

    // Calcular progreso de una meta
    const calculateProgress = (current, target) => {
        if (!target || target === 0) return 0;
        return Math.min((current / target) * 100, 100);
    };

    // Calcular meses restantes para completar meta
    const calculateMonthsRemaining = (current, target, monthlyContribution) => {
        if (!monthlyContribution || monthlyContribution === 0) return Infinity;
        const remaining = target - current;
        if (remaining <= 0) return 0;
        return Math.ceil(remaining / monthlyContribution);
    };

    // CRUD Operations

    const fetchSavings = async () => {
        if (!session?.user?.user_id || !session?.accessToken) return;

        const user_id = session?.user?.user_id;

        console.log("🔄 FETCH SAVINGS - Context");
        console.log("👤 Session User ID:", session?.user?.user_id);
        console.log("🔑 Session Access Token:", session?.accessToken);

        try {
            setIsLoading(true);
            setError(null);
            const data = await getSavings(user_id, session);
            setSavingGoals(data.data || []);

            // Calcular el total contribuido de todas las metas
            const totalContributed = (data.data || []).reduce(
                (sum, goal) => sum + (Number(goal.total_contributed) || 0),
                0
            );
            setIsTotalContributedAllTime(totalContributed);

            console.log("✅ Savings cargados:", data.data);
            console.log("💰 Total contribuido histórico:", totalContributed);
        } catch (err) {
            console.error("❌ ERROR - NO SE PUEDEN CARGAR LOS SAVINGS | CONTEXT:", err);
            setError(err.message);
            setSavingGoals([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchContributionHistory = async () => {
        if (!session?.user?.user_id || !session?.accessToken) return;

        try {
            console.log("📊 Obteniendo historial de contribuciones...");
            const data = await getContributionHistory(session);
            setIsContributionHistory(data.history || []);

            // Calcular ahorro total acumulado desde el historial
            const totalAccumulated = (data.history || []).reduce(
                (sum, entry) => sum + (Number(entry.totalAmount) || 0),
                0
            );
            setIsTotalSavingsAccumulated(totalAccumulated);

            console.log("✅ Historial cargado:", data);
            console.log("💰 Ahorro total acumulado:", totalAccumulated);
            return data;
        } catch (err) {
            console.error("❌ ERROR - NO SE PUEDE CARGAR EL HISTORIAL | CONTEXT:", err);
            setError(err.message);
            return null;
        }
    };

    const fetchSavingById = async (id) => {
        try {
            setIsLoading(true);
            const data = await getSavingById(id, session);
            console.log("✅ Saving by ID:", data.data);
            setSelectedGoal(data.data);
            return data.data;
        } catch (err) {
            console.error("❌ ERROR - NO SE PUEDE CARGAR EL SAVING | CONTEXT:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const createSavingGoal = async (newGoal) => {
        console.log("🚀 INICIANDO CREACIÓN DEL SAVING GOAL - Context");
        console.log("📋 Datos del saving:", newGoal);

        // Validar que no exceda el porcentaje disponible
        const unallocated = calculateUnallocatedPercentage();
        if (newGoal.percentage_allocation > unallocated) {
            const errorMsg = `Solo tienes ${unallocated}% disponible para asignar`;
            console.error("❌", errorMsg);
            setError(errorMsg);
            throw new Error(errorMsg);
        }

        try {
            const savingData = {
                ...newGoal,
            };

            const res = await postSaving(savingData, session);
            console.log("✅ SAVING GOAL CREADO EXITOSAMENTE:", res);
            await fetchSavings();
            resetForm();
            return res;
        } catch (err) {
            console.error("❌ ERROR al crear saving goal | CONTEXT:", err);
            setError(err.message);
            throw err;
        }
    };

    const updateSavingGoal = async (id, updateData) => {
        console.log("🔄 ACTUALIZANDO SAVING GOAL - Context");
        console.log("ID:", id);
        console.log("Data:", updateData);

        try {
            const res = await updateSaving(id, updateData, session);
            console.log("✅ SAVING GOAL ACTUALIZADO:", res);
            await fetchSavings();
            return res;
        } catch (err) {
            console.error("❌ ERROR al actualizar saving goal | CONTEXT:", err);
            setError(err.message);
            throw err;
        }
    };

    const deleteSavingGoal = async (id) => {
        console.log("🗑️ ELIMINANDO SAVING GOAL - Context");
        console.log("ID:", id);

        try {
            const res = await deleteSaving(id, session);
            console.log("✅ SAVING GOAL ELIMINADO:", res);
            await fetchSavings();
            return res;
        } catch (err) {
            console.error("❌ ERROR al eliminar saving goal | CONTEXT:", err);
            setError(err.message);
            throw err;
        }
    };

    // Actualizar solo el monto actual (para depósitos)
    const addContribution = async (id, amount) => {
        try {
            const goal = savingGoals.find((g) => g._id === id);
            if (!goal) throw new Error("Meta no encontrada");

            const newCurrentAmount = goal.current_amount + amount;
            const newStatus = newCurrentAmount >= goal.target_amount ? "completed" : goal.status;

            await updateSavingGoal(id, {
                current_amount: newCurrentAmount,
                status: newStatus,
            });
        } catch (err) {
            console.error("❌ ERROR al agregar contribución:", err);
            throw err;
        }
    };

    // Resetear formulario
    const resetForm = () => {
        setIsGoalName("");
        setIsDescription("");
        setIsTargetAmount("");
        setIsCurrentAmount(0);
        setIsPercentageAllocation("");
        setIsDeadline("");
        setIsPriority("medium");
        setIsStatus("active");
        setSelectedGoal(null);
        setError(null);
    };

    // Verificar si es un nuevo mes y procesar contribuciones automáticamente
    const checkAndProcessMonthlyContributions = async () => {
        if (!session?.user?.user_id || !isSavingFromNomina) return;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Obtener la última fecha de procesamiento desde localStorage
        const lastProcessedKey = `lastProcessed_${session.user.user_id}`;
        const lastProcessed = localStorage.getItem(lastProcessedKey);

        if (lastProcessed) {
            const lastDate = new Date(lastProcessed);
            const lastMonth = lastDate.getMonth();
            const lastYear = lastDate.getFullYear();

            // Si estamos en el mismo mes, no hacer nada
            if (currentMonth === lastMonth && currentYear === lastYear) {
                return;
            }
        }

        // Es un nuevo mes, procesar contribuciones
        try {
            console.log("📅 Nuevo mes detectado, procesando contribuciones...");
            await processMonthlyContributions(isSavingFromNomina, session);

            // Actualizar la fecha de último procesamiento
            localStorage.setItem(lastProcessedKey, currentDate.toISOString());

            // Recargar las metas actualizadas
            await fetchSavings();

            console.log("✅ Contribuciones mensuales procesadas automáticamente");
        } catch (err) {
            console.error("❌ Error al procesar contribuciones mensuales:", err);
        }
    };

    // Procesar contribución manual (botón)
    const manualProcessContributions = async () => {
        if (!session?.user?.user_id || !isSavingFromNomina) {
            setError("No se puede procesar: datos insuficientes");
            return;
        }

        try {
            setIsLoading(true);
            await processMonthlyContributions(isSavingFromNomina, session);

            // Actualizar la fecha de último procesamiento
            const lastProcessedKey = `lastProcessed_${session.user.user_id}`;
            localStorage.setItem(lastProcessedKey, new Date().toISOString());

            await fetchSavings();
            console.log("✅ Contribuciones procesadas manualmente");
        } catch (err) {
            console.error("❌ Error al procesar contribuciones:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Cargar savings al iniciar sesión
    useEffect(() => {
        if (status === "authenticated" && session?.user?.user_id && session?.accessToken) {
            fetchSavings();
            fetchContributionHistory(); // Cargar historial para calcular ahorro total
        }
    }, [session, status]);

    // Verificar y procesar contribuciones automáticamente cuando cambia isSavingFromNomina
    useEffect(() => {
        if (session?.user?.user_id && isSavingFromNomina) {
            checkAndProcessMonthlyContributions();
        }
    }, [session?.user?.user_id, isSavingFromNomina]);

    return (
        <SavingContext.Provider
            value={{
                // Estados
                savingGoals,
                isContributionHistory,
                isTotalContributedAllTime,
                isTotalSavingsAccumulated,
                isTotalSavingsRealTime,
                isFormSavingOpen,
                isLoading,
                selectedGoal,
                error,
                isSavingFromNomina,

                // Estados del formulario
                isGoalName,
                isDescription,
                isTargetAmount,
                isCurrentAmount,
                isPercentageAllocation,
                isDeadline,
                isPriority,
                isStatus,

                // Setters
                setIsFormSavingOpen,
                setSelectedGoal,
                setError,
                setIsGoalName,
                setIsDescription,
                setIsTargetAmount,
                setIsCurrentAmount,
                setIsPercentageAllocation,
                setIsDeadline,
                setIsPriority,
                setIsStatus,

                // Funciones CRUD
                fetchSavings,
                fetchSavingById,
                fetchContributionHistory,
                createSavingGoal,
                updateSavingGoal,
                deleteSavingGoal,
                addContribution,
                resetForm,

                // Funciones de cálculo
                calculateUnallocatedPercentage,
                calculateMonthlyContribution,
                calculateProgress,
                calculateMonthsRemaining,
                manualProcessContributions,
            }}
        >
            {children}
        </SavingContext.Provider>
    );
};

export const useSaving = () => {
    const context = useContext(SavingContext);
    if (!context) {
        throw new Error("useSaving must be used within a SavingProvider");
    }
    return context;
};
