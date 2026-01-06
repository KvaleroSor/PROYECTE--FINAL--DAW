"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";
import getUserData from "@/services/users/getUserData.js";
import getSpendByCategory from "@/services/spends/getSpendByCategory.js";

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
    const { data: session } = useSession();
    const [isNomina, setIsNomina] = useState(0);
    const [isPercentageSettings, setIsPercentageSettings] = useState({
        fixedExpenses: 0,
        leisureExpenses: 0,
        investment: 0,
        savings: 0,
    });
    const [additionalIncome, setAdditionalIncome] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFixedExpensesFromNomina, setIsFixedExpensesFromNomina] =
        useState(0);
    const [isLeisureExpensesFromNomina, setIsLeisureExpensesFromNomina] =
        useState(0);
    const [isInvestmentFromNomina, setIsInvestmentFromNomina] = useState(0);
    const [isSavingFromNomina, setIsSavingFromNomina] = useState(0);
    const [
        isTotalAmountToSpendFixedAndLeisure,
        setIsTotalAmountToSpendFixedAndLeisure,
    ] = useState(0);
    const [isAmountLookingImprevistos, setIsAmountLookingImprevistos] = useState(0);

    // ----------------------------------------------------------------------
    // FETCH DATA: Obtener datos iniciales del usuario
    // ----------------------------------------------------------------------

    /**
     * Obtiene los datos financieros del usuario (nómina y configuración de porcentajes)
     * desde el backend utilizando el ID de la sesión actual.
     */

    const fetchFinancialData = async () => {
        if (!session?.user?.user_id) return;

        const userId = session?.user?.user_id;

        try {
            setIsLoading(true);

            const userData = await getUserData(userId, session);

            if (userData.data) {
                setIsNomina(userData.data.nomina || 0);
                setIsPercentageSettings(
                    userData.data.percentageSpend || {
                        fixedExpenses: 0,
                        leisureExpenses: 0,
                        investment: 0,
                        savings: 0,
                    }
                );
            }
        } catch (err) {
            console.error(
                "ERROR - No se pueden cargar los datos financieros:",
                err
            );
        } finally {
            setIsLoading(false);
        }
    };

    // ----------------------------------------------------------------------
    // CÁLCULOS: Lógica de negocio financiera
    // ----------------------------------------------------------------------

    /**
     * Calcula los montos absolutos (en dinero) para cada grupo de gastos (Fijos, Ocio, Inversión, Ahorro)
     * aplicando los porcentajes configurados a la nómina actual.
     * Actualiza los estados correspondientes.
     */

    const calculatePercentageToPercentageSettings = async () => {
        setIsFixedExpensesFromNomina(
            (isPercentageSettings.fixedExpenses / 100) * isNomina
        );
        setIsLeisureExpensesFromNomina(
            (isPercentageSettings.leisureExpenses / 100) * isNomina
        );
        setIsInvestmentFromNomina(
            (isPercentageSettings.investment / 100) * isNomina
        );
        setIsSavingFromNomina((isPercentageSettings.savings / 100) * isNomina);

        console.log("MONTO ABSOLUTO POR CATEGORIA", isPercentageSettings);
        calcularTotalGastoFijoOcio();
    };

    const calcularTotalGastoFijoOcio = () => {
        const totalPercentage =
            isPercentageSettings.fixedExpenses +
            isPercentageSettings.leisureExpenses;
        const totalToSpendFixedAndSpendLeisure =
            (totalPercentage * isNomina) / 100;

        setIsTotalAmountToSpendFixedAndLeisure(
            totalToSpendFixedAndSpendLeisure
        );
    };

    /**
     * Calcula el presupuesto monetario específico para una categoría individual.
     * @param {string} category_type - El tipo de categoría (ej: "Gasto Fijo").
     * @param {number} monthly_budget - El porcentaje asignado a esa categoría específica.
     * @returns {string} El monto calculado formateado a 2 decimales.
     */

    const calculateCategoryPercentage = (monthly_budget, total_acumulated) => {
        console.log("MONTHLY BUDGET", monthly_budget);
        console.log("TOTAL ACUMULADO", total_acumulated);
        console.log(
            Number((total_acumulated * 100) / monthly_budget).toFixed(2)
        );
        return Number((total_acumulated * 100) / monthly_budget).toFixed(2);
    };

    /**
     * Obtiene y suma todos los gastos registrados en la base de datos para una categoría específica.
     * @param {object} category - El objeto de la categoría.
     * @returns {number} El total acumulado de gastos para esa categoría.
     */

    const calculateMonthlyTotalAmountSpend = async (category) => {
        try {
            const res = await getSpendByCategory(category._id, session);
            const total = res.data.reduce((acc, curr) => acc + curr.amount, 0);
            return Number(total).toFixed(2);
        } catch (err) {
            console.error(
                "ERROR - FALLO FETCH DESDE FINANCIAL SERVICES",
                err.message
            );
        }
    };

    const evaluateTotalAmountSpendToTotalSpendCategory = (
        isTotalAmountToCategory,
        isAmountSpendByCategory
    ) => {
        if (isTotalAmountToCategory >= isAmountSpendByCategory) {
            return true;
        } else {
            return false;
        }
    };

    const calculatePercentageBarCategory = (
        category_type,
        isAmountSpendByCategory,
        monthly_budget
    ) => {
        let totalGroupBudget;

        switch (category_type) {
            case "Gasto Fijo":
                totalGroupBudget = isFixedExpensesFromNomina;
                break;
            case "Gasto Ocio":
                totalGroupBudget = isLeisureExpensesFromNomina;
                break;
            case "Inversion":
                totalGroupBudget = isInvestmentFromNomina;
                break;
            case "Ahorro":
                totalGroupBudget = isSavingFromNomina;
                break;
            default:
                return 0;
        }

        if (totalGroupBudget === 0 || !monthly_budget) return 0;

        const categoryBudgetAmount = (monthly_budget / 100) * totalGroupBudget;

        if (categoryBudgetAmount === 0) return 0;

        return Number((isAmountSpendByCategory * 100) / categoryBudgetAmount);
    };

    const calculateAvailableMoneyToSpend = (
        isTotalAmountToCategory,
        isAmountSpendByCategory
    ) => {
        const result = isTotalAmountToCategory - isAmountSpendByCategory;

        return result < 0;
    };

    const calculateAmountSavingWithImprevistos = (
        category_type,
        total_acumulated
    ) => {
        if (category_type === "Imprevistos") {
            setIsAmountLookingImprevistos(
                isSavingFromNomina - total_acumulated
            );
        }

        console.log("VALOR DE AHORRO NÓMINA BAJANDO", isSavingFromNomina);
    };

    // ----------------------------------------------------------------------
    // ACTUALIZACIONES
    // ----------------------------------------------------------------------

    /**
     * Actualiza el estado local de la nómina.
     * (Nota: Actualmente solo actualiza el estado local, pendiente integración con backend si es necesario).
     */

    // Función para actualizar nómina
    const updateNomina = async (newNomina) => {
        // Fer una fetch per actualitzar el servidor
        setIsNomina(newNomina);
    };

    useEffect(() => {
        fetchFinancialData();
    }, [session]);

    return (
        <FinancialContext.Provider
            value={{
                // Estados
                isNomina,
                isPercentageSettings,
                additionalIncome,
                isLoading,
                isFixedExpensesFromNomina,
                isLeisureExpensesFromNomina,
                isInvestmentFromNomina,
                isSavingFromNomina,
                isTotalAmountToSpendFixedAndLeisure,
                isAmountLookingImprevistos,

                // Funciones de cálculo
                calculatePercentageToPercentageSettings,
                calculateCategoryPercentage,
                calculateMonthlyTotalAmountSpend,
                evaluateTotalAmountSpendToTotalSpendCategory,
                calculatePercentageBarCategory,
                calculateAvailableMoneyToSpend,
                calculateAmountSavingWithImprevistos,

                // Funciones de actualización
                setIsNomina,
                setIsPercentageSettings,
                setAdditionalIncome,
                updateNomina,
                fetchFinancialData,
                setIsFixedExpensesFromNomina,
                setIsLeisureExpensesFromNomina,
                setIsInvestmentFromNomina,
                setIsSavingFromNomina,
            }}
        >
            {children}
        </FinancialContext.Provider>
    );
};

export const useFinancial = () => useContext(FinancialContext);
