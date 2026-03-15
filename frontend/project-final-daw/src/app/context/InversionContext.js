"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useFinancial } from "./FinancialContext.js";
import getInversions from "@/services/inversion/getInversions.js";
import postInversion from "@/services/inversion/postInversion.js";
import updateInversion from "@/services/inversion/updateInversion.js";
import deleteInversion from "@/services/inversion/deleteInversion.js";
import Papa from "papaparse";

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

    // Cache de datos de Alpha Vantage
    const [isAlphaVantageData, setIsAlphaVantageData] = useState([]);
    const [isAlphaVantageLoading, setIsAlphaVantageLoading] = useState(false);
    const [isAlphaVantageLoaded, setIsAlphaVantageLoaded] = useState(false);

    // Estados del formulario
    const [isType, setIsType] = useState("");
    const [isAmount, setIsAmount] = useState("");
    const [isInversionDate, setIsInversionDate] = useState(new Date());
    const [isTargetProfitability, setIsTargetProfitability] = useState("");
    const [isRealProfitability, setIsRealProfitability] = useState("");
    const [isTotal, setIsTotal] = useState("");

    // Varibale de entorno api_key
    const api_key_alpha = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

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
                inversion_date: newInversion.date,
            };
            delete inversionData.date;

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

    // FETCH API INVESTMENT ALPHA VANTAGE (con caché)
    const fetchInvestmentAlphaVantage = async () => {
        // Si ya tenemos los datos cacheados, no hacer petición
        if (isAlphaVantageLoaded && isAlphaVantageData.length > 0) {
            console.log("✅ Usando datos cacheados de Alpha Vantage");
            return isAlphaVantageData;
        }

        // Si ya está cargando, esperar
        if (isAlphaVantageLoading) {
            console.log("⏳ Petición a Alpha Vantage en progreso...");
            return [];
        }

        try {
            setIsAlphaVantageLoading(true);
            console.log("🔄 Obteniendo datos de Alpha Vantage...");

            const response = await fetch(
                `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${api_key_alpha}`
            );
            const data = await response.text();

            // Parseamos la data porque está en formato CSV
            const parsedData = Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
            });

            console.log("✅ Datos parseados de Alpha Vantage:", parsedData.data.length, "símbolos");

            // Cachear los datos
            setIsAlphaVantageData(parsedData.data);
            setIsAlphaVantageLoaded(true);

            return parsedData.data;
        } catch (error) {
            console.error("❌ Error fetching investment data:", error);
            setError(error.message);
            throw error;
        } finally {
            setIsAlphaVantageLoading(false);
        }
    };

    // FETCH PRECIO EN TIEMPO REAL de un símbolo específico
    const fetchStockPrice = async (symbol) => {
        if (!symbol) return null;

        try {
            console.log(`🔄 Obteniendo precio de ${symbol}...`);

            const response = await fetch(
                `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${api_key_alpha}`
            );
            const data = await response.json();

            if (data["Global Quote"]) {
                const quote = data["Global Quote"];
                return {
                    symbol: quote["01. symbol"],
                    price: parseFloat(quote["05. price"]),
                    change: parseFloat(quote["09. change"]),
                    changePercent: quote["10. change percent"],
                    volume: parseInt(quote["06. volume"]),
                    latestTradingDay: quote["07. latest trading day"],
                };
            }

            console.warn(`⚠️ No se encontró precio para ${symbol}`);
            return null;
        } catch (error) {
            console.error(`❌ Error obteniendo precio de ${symbol}:`, error);
            return null;
        }
    };

    // ACTUALIZAR RENTABILIDAD REAL basada en precios actuales
    const updateRealProfitability = async (inversionId, symbol, initialPrice) => {
        if (!symbol) return;

        try {
            const currentPriceData = await fetchStockPrice(symbol);
            if (!currentPriceData || !initialPrice) return;

            const realProfitability =
                ((currentPriceData.price - initialPrice) / initialPrice) * 100;

            await updateInversionData(inversionId, {
                real_profitability: realProfitability,
            });

            console.log(
                `✅ Rentabilidad actualizada para ${symbol}: ${realProfitability.toFixed(2)}%`
            );
        } catch (error) {
            console.error("❌ Error actualizando rentabilidad:", error);
        }
    };

    // CERRAR INVERSIÓN - Marca como cerrada y devuelve dinero al presupuesto
    const closeInversion = async (inversionId, closingPrice = null) => {
        try {
            const inversion = isInversions.find((inv) => inv._id === inversionId);
            if (!inversion) {
                throw new Error("Inversión no encontrada");
            }

            // Calcular ganancia/pérdida final
            const profitLoss = ((inversion.real_profitability || 0) * inversion.amount) / 100;
            const finalValue = inversion.amount + profitLoss;

            const closingData = {
                status: "closed",
                closing_date: new Date().toISOString(),
                closing_price: closingPrice,
                final_profit_loss: profitLoss,
                final_value: finalValue,
            };

            await updateInversionData(inversionId, closingData);

            console.log(`✅ Inversión cerrada. Ganancia/Pérdida: €${profitLoss.toFixed(2)}`);
            console.log(`💰 Valor final devuelto al presupuesto: €${finalValue.toFixed(2)}`);

            await fetchInversions();

            return {
                success: true,
                finalValue,
                profitLoss,
            };
        } catch (error) {
            console.error("❌ Error cerrando inversión:", error);
            setError(error.message);
            throw error;
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
            // Cargar datos de Alpha Vantage en segundo plano
            if (!isAlphaVantageLoaded) {
                fetchInvestmentAlphaVantage();
            }
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

                // Estados de Alpha Vantage
                isAlphaVantageData,
                isAlphaVantageLoading,
                isAlphaVantageLoaded,

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
                fetchInvestmentAlphaVantage,
                fetchStockPrice,
                updateRealProfitability,
                closeInversion,
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
