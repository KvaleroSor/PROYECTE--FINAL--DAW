"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import postSpend from "./../../services/spends/postSpend.js";
import getSpendById from "@/services/spends/getSpendById.js";
import getSpends from "./../../services/spends/getSpends.js";
import updateSpend from "@/services/spends/updateSpend.js";
import removeSpends from "@/services/spends/removeSpends.js";

const SpendContext = createContext();

export const SpendProvider = ({ children }) => {
    const { data: session, status } = useSession();
    
    // Estados principales
    const [isSpends, setIsSpends] = useState([]);
    const [isSpend, setIsSpend] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFormSpendOpen, setIsFormSpendOpen] = useState(false);
    const [isUpdatedPushed, setIsUpdatedPushed] = useState(false);
    
    // Estados del formulario
    const [isCategoryId, setIsCategoryId] = useState("");
    const [isDescription, setIsDescription] = useState("");
    const [isAmount, setIsAmount] = useState("");
    const [isData, setIsData] = useState(null);
    const [isPaymentType, setIsPaymentType] = useState("");
    const [isCategoryType, setIsCategoryType] = useState(null);

    

    const fetchSpends = async () => {
        if (!session?.accessToken) return;   
        
        const userId = session?.user?.user_id;

        try {
            setIsLoading(true);
            const data = await getSpends(userId, session);
            setIsSpends(data.data);
            console.log("DATA DE LOS GASTOS", data);
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDEN CARGAR LOS GASTOS | GLOBAL CONTEXT:",
                err
            );
            setIsSpends([]);                       
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSpendById = async (id, session) => {
        try {
            setIsLoading(true);
            const data = await getSpendById(id, session);
            console.log("DATA DESDE SERVER - ", data.data);
            setIsSpend(data.data);            
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDE CARGAR EL GASTO | GLOBAL CONTEXT:",
                err
            );
        } finally {
            setIsLoading(false);
        }
    };

    const postNewSpend = async (newSpend, session) => {
        try {
            const res = await postSpend(newSpend, session);
            console.log("✅ GASTO CREADO EXITOSAMENTE:", res);
            await fetchSpends();
            return res;
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDE CREAR EL GASTO | GLOBAL CONTEXT:",
                err
            );
        }
    };

    const updatedSpend = async (id, dataSpend, session) => {
        try {
            const res = await updateSpend(id, dataSpend, session);

            console.log("➡️ RESPUESTA FUNCTION FETCH:", res);

            await fetchSpends();
            await fetchSpendById(id, session);
            return res;
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDE ACTUALIZAR EL GASTO | GLOBAL CONTEXT:",
                err
            );
        }
    };

    const deleteSpend = async (id, session) => {
        try {
            const res = await removeSpends(id, session);
            await fetchSpends();
            setIsSpend({});
            return res;
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDE ELIMINAR EL GASTO | GLOBAL CONTEXT:",
                err
            );
        }
    };

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            fetchSpends();
        }
    }, [session, status]);

    return (
        <SpendContext.Provider
            value={{
                // Estados principales
                isSpends,
                isSpend,
                isLoading,
                error,
                isFormSpendOpen,
                isUpdatedPushed,

                // Estados del formulario
                isCategoryId,
                isDescription,
                isAmount,
                isData,
                isPaymentType,
                isCategoryType,

                // Setters
                setIsFormSpendOpen,
                setIsUpdatedPushed,
                setIsCategoryId,
                setIsDescription,
                setIsAmount,
                setIsData,
                setIsPaymentType,
                setIsCategoryType,

                // Funciones CRUD
                fetchSpends,
                fetchSpendById,
                postNewSpend,
                updatedSpend,
                deleteSpend,
            }}
        >
            {children}
        </SpendContext.Provider>
    );
};

export const useSpends = () => {
    const context = useContext(SpendContext);
    if (!context) {
        throw new Error("useSpends must be used within a SpendProvider");
    }
    return context;
};
