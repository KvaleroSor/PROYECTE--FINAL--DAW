"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";
import getUserData from "@/services/users/getUserData.js";
import getSpendByCategory from '@/services/spends/getSpendByCategory.js';

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
    const [isFixedExpensesFromNomina, setIsFixedExpensesFromNomina] = useState(0);
    const [isLeisureExpensesFromNomina, setIsLeisureExpensesFromNomina] = useState(0);
    const [isInvestmentFromNomina, setIsInvestmentFromNomina] = useState(0);
    const [isSavingFromNomina, setIsSavingFromNomina] = useState(0);    
    

    const fetchFinancialData = async () => {
        if (!session?.user?.user_id) return;

        console.log("🔄 FETCH FINANCIAL DATA - Context");
        console.log("👤 Session User ID:", session?.user?.user_id);

        const userId = session?.user?.user_id;
        console.log(userId);

        try {
            setIsLoading(true);

            const userData = await getUserData(userId, session);
            console.log("💰 User Financial Data:", userData);
            console.log("USER DATA ON TRY CATCH", userData);
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
    };

    const calculateMonthlyBudgetCategory = (category_type, monthly_budget) => {        
        switch (category_type) {
            case "Gasto Fijo":
                return Number((monthly_budget / 100) * isFixedExpensesFromNomina).toFixed(2);

            case "Gasto Ocio":
                return Number((monthly_budget / 100) * isLeisureExpensesFromNomina).toFixed(2);

            case "Inversion":
                return Number((monthly_budget / 100) * isInvestmentFromNomina).toFixed(2);

            case "Ahorro":
                return Number((monthly_budget / 100) * isSavingFromNomina).toFixed(2);
        }
    };

    const calculateMonthlyTotalAmountSpend = async (category) => {
        try{
            const res = await getSpendByCategory(category._id, session);
            console.log("RESPONSE FETCH BY CATEGORY", res);
            const total = res.data.reduce((acc, curr) => acc + curr.amount, 0);
            console.log("TOTAL GASTOS",total);
            return total;
            
        }catch(err){
            console.error("ERROR - FALLO FETCH DESDE FINANCIAL SERVICES", err.message);            
        }
    };

    // Función para actualizar nómina
    const updateNomina = async (newNomina) => {
        // Aquí podrías hacer un fetch para actualizar en el servidor
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

                // Funciones de cálculo
                calculatePercentageToPercentageSettings,
                calculateMonthlyBudgetCategory,
                calculateMonthlyTotalAmountSpend,
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
