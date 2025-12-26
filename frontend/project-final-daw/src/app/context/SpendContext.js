"use client";

import { createContext, useContext, useState, useEffect } from "react";
import postSpend from "./../../services/spends/postSpend.js";
import getSpendById from "@/services/spends/getSpendById.js";
import getSpends from "./../../services/spends/getSpends.js";
import updateSpend from "@/services/spends/updateSpend.js";
import removeSpends from "@/services/spends/removeSpends.js";

const SpendContext = createContext();

export const SpendProvider = ({ children }) => {
    // Estados
    const [spends, setSpends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSpends, setIsSpends] = useState([]);
    const [isSpend, setIsSpend] = useState({});
    const [isFormSpendOpen, setIsFormSpendOpen] = useState(false);
    const [isCategoryId, setIsCategoryId] = useState("");
    const [isDescription, setIsDescription] = useState("");
    const [isAmount, setIsAmount] = useState("");
    const [isData, setIsData] = useState(null);
    const [isPaymentType, setIsPaymentType] = useState("");
    const [isUpdatedPushed, setIsUpdatedPushed] = useState(false);

    const fetchSpends = async () => {
        if (!session?.user?.user_id) return;

        console.log("🔄 FETCH SPEND - Context");
        console.log("👤 Session User ID:", session?.user?.user_id);
        console.log("🔑 Session Access Token:", session?.accessToken);
        console.log("👨🏽‍💼 Role del usuario:", session?.role);

        try {
            setIsLoading(true);
            const data = await getSpends(session.user.user_id, session);
            setIsSpends(data.data);
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDEN CARGAR LOS GASTOS | GLOBAL CONTEXT:",
                err
            );
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
                "ERROR - NO SE PUEDE CARGAR LA CATEGORÍA | GLOBAL CONTEXT:",
                err
            );
        } finally {
            setIsLoading(false);
        }
    };

    const postNewSpend = async (newSpend, session) => {
        console.log("🚀 INICIANDO CREACIÓN DE CATEGORÍA - Context");
        console.log("📋 Datos de categoría:", newSpend);
        console.log("🔐 Sesión en context:", session);

        try {
            const res = await postSpend(newSpend, session);
            console.log("✅ GASTO CREADO EXITOSAMENTE:", res);
            await fetchSpends();
            return res;
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDE CREAR LA CATEGORIA | GLOBAL CONTEXT:",
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
                "ERROR - NO SE PUEDE ACTUALIZAR LA CATEGORIA | GLOBAL CONTEXT:",
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

    return (
        <SpendContext.Provider
            value={{
                // Estados
                isFormSpendOpen,
                isCategoryId,
                isDescription,
                isAmount,
                isData,
                isPaymentType,
                isUpdatedPushed,
                // Setters
                setIsFormSpendOpen,
                setIsCategoryId,
                setIsDescription,
                setIsAmount,
                setIsData,
                setIsPaymentType,
                setIsUpdatedPushed,
                // Funciones CRUD
                fetchSpends,
                fetchSpendById,
                postNewSpend,
                updatedSpend,
                deleteSpend,
                // Funciones de utilidad
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
