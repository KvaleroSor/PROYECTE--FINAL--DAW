"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";
import getUserData from "@/services/users/getUserData.js";

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
    const { data: session } = useSession();
    const [nomina, setNomina] = useState(0);
    const [percentageSettings, setPercentageSettings] = useState({
        fixedExpenses: 0,
        leisureExpenses: 0,
        investment: 0,
        savings: 0
    });
    const [additionalIncome, setAdditionalIncome] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFinancialData = async () => {
        if (!session?.user?.user_id) return;

        console.log("🔄 FETCH FINANCIAL DATA - Context");
        console.log("👤 Session User ID:", session?.user?.user_id);

        try {
            setIsLoading(true);
            
            const userData = await getUserData(session.user.user_id, session);
            console.log("💰 User Financial Data:", userData);
            
            if (userData.data) {
                setNomina(userData.data.nomina || 0);
                setPercentageSettings(userData.data.percentageSpend || {
                    fixedExpenses: 0,
                    leisureExpenses: 0,
                    investment: 0,
                    savings: 0
                });
            }
            
        } catch (err) {
            console.error("ERROR - No se pueden cargar los datos financieros:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para actualizar nómina
    const updateNomina = async (newNomina) => {
        // Aquí podrías hacer un fetch para actualizar en el servidor
        setNomina(newNomina);
    };

    useEffect(() => {
        fetchFinancialData();
    }, [session]);

    return (
        <FinancialContext.Provider
            value={{
                // Estados
                nomina,
                percentageSettings,
                additionalIncome,
                isLoading,
                
                // Funciones de cálculo

                
                // Funciones de actualización
                setNomina,
                setPercentageSettings,
                setAdditionalIncome,
                updateNomina,
                fetchFinancialData,
            }}
        >
            {children}
        </FinancialContext.Provider>
    );
};

export const useFinancial = () => useContext(FinancialContext);