"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useFinancial } from "./FinancialContext.js";
import getInversions from "@/services/inversion/getInversions.js";
import postInversion from "@/services/inversion/postInversion.js";
import updateInversion from "@/services/inversion/updateInversion.js";
import deleteInversion from "@/services/inversion/deleteInversion.js";

const InversionContext = createContext();

export const InversionProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const { isInversionFromNomina } = useFinancial();

    // Estados principales
    const [isInversions, setIsInversions] = useState([]);
    const [isSelectedInversion, setIsSelectedInversion] = useState(null);
    const [isFormInversionOpen, setIsFormInversionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estados del formulario
    const [isType, setIsType] = useState("");
    const [isAmount, setIsAmount] = useState("");
    const [isInversionDate, setIsInversionDate] = useState(new Date());
    const [isTargetProfitability, setIsTargetProfitability] = useState("");
    const [isRealProfitability, setIsRealProfitability] = useState("");
    const [isTotal, setIsTotal] = useState("");

    // CRUD Operations

    const fetchInversions = async () => {
        if (!session?.user?.user_id || !session?.accessToken) return;

        console.log("🔄 FETCH INVERSIONS - Context");
        console.log("👤 Session User ID:", session?.user?.user_id);

        try {
            setIsLoading(true);
            setError(null);
            const data = await getInversions(session);
            setIsInversions(data.data || []);
            console.log("✅ Inversiones cargadas:", data.data);
        } catch (err) {
            console.error("❌ ERROR - NO SE PUEDEN CARGAR LAS INVERSIONES | CONTEXT:", err);
            setError(err.message);
            setIsInversions([]);
        } finally {
            setIsLoading(false);
        }
    };

    const createInversion = async (newInversion) => {
        console.log("🚀 INICIANDO CREACIÓN DE INVERSIÓN - Context");
        console.log("📋 Datos de inversión:", newInversion);

        try {
            const inversionData = {
                ...newInversion,
            };

            const res = await postInversion(inversionData, session);
            console.log("✅ INVERSIÓN CREADA EXITOSAMENTE:", res);
            await fetchInversions();
            resetForm();
            return res;
        } catch (err) {
            console.error("❌ ERROR al crear inversión | CONTEXT:", err);
            setError(err.message);
            throw err;
        }
    };

    const updateInversionData = async (id, updateData) => {
        console.log("🔄 ACTUALIZANDO INVERSIÓN - Context");
        console.log("ID:", id);
        console.log("Data:", updateData);

        try {
            const res = await updateInversion(id, updateData, session);
            console.log("✅ INVERSIÓN ACTUALIZADA:", res);
            await fetchInversions();
            return res;
        } catch (err) {
            console.error("❌ ERROR al actualizar inversión | CONTEXT:", err);
            setError(err.message);
            throw err;
        }
    };

    const deleteInversionData = async (id) => {
        console.log("🗑️ ELIMINANDO INVERSIÓN - Context");
        console.log("ID:", id);

        try {
            const res = await deleteInversion(id, session);
            console.log("✅ INVERSIÓN ELIMINADA:", res);
            await fetchInversions();
            return res;
        } catch (err) {
            console.error("❌ ERROR al eliminar inversión | CONTEXT:", err);
            setError(err.message);
            throw err;
        }
    };

    // Resetear formulario
    const resetForm = () => {
        setIsType("");
        setIsAmount("");
        setIsInversionDate(new Date());
        setIsTargetProfitability("");
        setIsRealProfitability("");
        setIsTotal("");
        setIsSelectedInversion(null);
        setError(null);
    };

    // Cargar inversiones al iniciar sesión
    useEffect(() => {
        if (status === "authenticated" && session?.user?.user_id && session?.accessToken) {
            fetchInversions();
        }
    }, [session, status]);

    return (
        <InversionContext.Provider
            value={{
                // Estados
                isInversions,
                isSelectedInversion,
                isFormInversionOpen,
                isLoading,
                error,
                isInversionFromNomina,

                // Estados del formulario
                isType,
                isAmount,
                isInversionDate,
                isTargetProfitability,
                isRealProfitability,
                isTotal,

                // Setters
                setIsFormInversionOpen,
                setIsSelectedInversion,
                setError,
                setIsType,
                setIsAmount,
                setIsInversionDate,
                setIsTargetProfitability,
                setIsRealProfitability,
                setIsTotal,

                // Funciones CRUD
                fetchInversions,
                createInversion,
                updateInversionData,
                deleteInversionData,
                resetForm,
            }}
        >
            {children}
        </InversionContext.Provider>
    );
};

export const useInversion = () => {
    const context = useContext(InversionContext);
    if (!context) {
        throw new Error("useInversion must be used within an InversionProvider");
    }
    return context;
};
