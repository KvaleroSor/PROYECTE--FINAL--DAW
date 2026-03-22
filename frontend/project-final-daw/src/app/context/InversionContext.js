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
    const api_key_alpha = process.env.NEXT_PUBLIC_API_KEY_ALPHA_VANTAGE;

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

            // Si la inversión tiene un símbolo, obtener el precio inicial
            if (inversionData.symbol) {
                console.log(`📊 Obteniendo precio inicial para ${inversionData.symbol}...`);
                const stockPrice = await fetchStockPrice(inversionData.symbol);
                if (stockPrice && stockPrice.price) {
                    inversionData.initial_price = stockPrice.price;
                    console.log(`✅ Precio inicial guardado: $${stockPrice.price}`);
                } else {
                    console.warn(
                        `⚠️ No se pudo obtener precio inicial para ${inversionData.symbol}`
                    );
                }
            }

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

    // FETCH API INVESTMENT ALPHA VANTAGE (con caché en memoria y localStorage)
    const fetchInvestmentAlphaVantage = async () => {
        console.log("🔄 fetchInvestmentAlphaVantage llamado");
        console.log("  - isAlphaVantageLoaded:", isAlphaVantageLoaded);
        console.log("  - isAlphaVantageLoading:", isAlphaVantageLoading);
        console.log("  - isAlphaVantageData.length:", isAlphaVantageData.length);

        // Si ya tenemos los datos cacheados en memoria Y son válidos, no hacer petición
        if (isAlphaVantageLoaded && isAlphaVantageData.length > 0) {
            console.log(
                "✅ Usando datos cacheados en memoria:",
                isAlphaVantageData.length,
                "símbolos"
            );
            return isAlphaVantageData;
        }

        // Si ya está cargando, esperar
        if (isAlphaVantageLoading) {
            console.log("⏳ Petición a Alpha Vantage en progreso...");
            return [];
        }

        // Intentar cargar desde localStorage primero
        try {
            const cachedData = localStorage.getItem("alphaVantageData");
            const cachedTimestamp = localStorage.getItem("alphaVantageTimestamp");

            if (cachedData && cachedTimestamp) {
                const timestamp = parseInt(cachedTimestamp);
                const now = Date.now();
                const twentyFourHours = 24 * 60 * 60 * 1000;

                // Si los datos tienen menos de 24 horas, usarlos
                if (now - timestamp < twentyFourHours) {
                    const parsedCache = JSON.parse(cachedData);
                    if (parsedCache && parsedCache.length > 0) {
                        console.log(
                            "✅ Usando datos de localStorage:",
                            parsedCache.length,
                            "símbolos (edad:",
                            Math.floor((now - timestamp) / 1000 / 60),
                            "minutos)"
                        );
                        setIsAlphaVantageData(parsedCache);
                        setIsAlphaVantageLoaded(true);
                        return parsedCache;
                    } else {
                        console.warn("⚠️ Datos en localStorage vacíos, obteniendo nuevos...");
                    }
                } else {
                    console.log("⏰ Datos en localStorage expirados, obteniendo nuevos...");
                    localStorage.removeItem("alphaVantageData");
                    localStorage.removeItem("alphaVantageTimestamp");
                }
            } else {
                console.log("ℹ️ No hay datos en localStorage, obteniendo de API...");
            }
        } catch (storageError) {
            console.warn("⚠️ Error al leer localStorage:", storageError);
        }

        try {
            setIsAlphaVantageLoading(true);
            console.log("🔄 Obteniendo datos de Alpha Vantage...");
            console.log("🔑 API Key presente:", !!api_key_alpha);
            console.log("🔑 API Key length:", api_key_alpha?.length || 0);

            if (!api_key_alpha) {
                throw new Error(
                    "API Key de Alpha Vantage no configurada. Verifica tu archivo .env.local"
                );
            }

            const url = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${api_key_alpha}`;
            console.log("🌐 URL de petición:", url.replace(api_key_alpha, "***"));

            const response = await fetch(url);
            console.log("📡 Response status:", response.status);
            console.log("📡 Response ok:", response.ok);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.text();
            console.log("📦 Datos recibidos (primeros 200 caracteres):", data.substring(0, 200));
            console.log("📦 Longitud total de datos:", data.length);

            // Parseamos la data porque está en formato CSV
            const parsedData = Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
            });

            console.log("✅ Datos parseados de Alpha Vantage:", parsedData.data.length, "símbolos");

            if (parsedData.errors && parsedData.errors.length > 0) {
                console.warn("⚠️ Errores al parsear CSV:", parsedData.errors);
            }

            // Cachear los datos en memoria
            setIsAlphaVantageData(parsedData.data);
            setIsAlphaVantageLoaded(true);

            // Guardar en localStorage para persistencia
            try {
                localStorage.setItem("alphaVantageData", JSON.stringify(parsedData.data));
                localStorage.setItem("alphaVantageTimestamp", Date.now().toString());
                console.log("💾 Datos guardados en localStorage");
            } catch (storageError) {
                console.warn("⚠️ No se pudo guardar en localStorage:", storageError);
            }

            return parsedData.data;
        } catch (error) {
            console.error("❌ Error fetching investment data:", error);
            console.error("❌ Error completo:", error.message, error.stack);
            setError(error.message);
            setIsAlphaVantageLoaded(false);
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
            if (!currentPriceData || !initialPrice) {
                console.log(`⚠️ No se pudo obtener precio para ${symbol}`);
                return;
            }

            const realProfitability =
                ((currentPriceData.price - initialPrice) / initialPrice) * 100;

            console.log(
                `📊 ${symbol}: Precio inicial: $${initialPrice}, Precio actual: $${currentPriceData.price}, Rentabilidad: ${realProfitability.toFixed(2)}%`
            );

            // Actualizar en el backend
            await updateInversionData(inversionId, {
                real_profitability: realProfitability,
            });

            // CRÍTICO: Actualizar el estado local DIRECTAMENTE sin refetch (evita loop infinito)
            setIsInversions((prevInversions) =>
                prevInversions.map((inv) =>
                    inv._id === inversionId
                        ? { ...inv, real_profitability: realProfitability }
                        : inv
                )
            );

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

    // Monitorear cambios en el estado de Alpha Vantage
    useEffect(() => {
        console.log("🔍 CAMBIO EN ESTADO ALPHA VANTAGE:");
        console.log("  - isAlphaVantageLoaded:", isAlphaVantageLoaded);
        console.log("  - isAlphaVantageLoading:", isAlphaVantageLoading);
        console.log("  - isAlphaVantageData.length:", isAlphaVantageData.length);
    }, [isAlphaVantageLoaded, isAlphaVantageLoading, isAlphaVantageData]);

    // Cargar inversiones al iniciar sesión
    useEffect(() => {
        if (status === "authenticated" && session?.user?.user_id && session?.accessToken) {
            console.log("🔐 Usuario autenticado - Iniciando carga de datos");
            fetchInversions();
        }
    }, [session, status]);

    // Cargar datos de Alpha Vantage cuando el usuario está autenticado
    useEffect(() => {
        if (status === "authenticated" && session?.user?.user_id && session?.accessToken) {
            if (
                !isAlphaVantageLoaded &&
                !isAlphaVantageLoading &&
                isAlphaVantageData.length === 0
            ) {
                console.log("📡 Iniciando carga de datos de Alpha Vantage...");
                fetchInvestmentAlphaVantage();
            } else if (isAlphaVantageLoaded && isAlphaVantageData.length > 0) {
                console.log(
                    "✅ Datos de Alpha Vantage ya cargados:",
                    isAlphaVantageData.length,
                    "símbolos"
                );
            }
        }
    }, [status, session, isAlphaVantageLoaded, isAlphaVantageLoading, isAlphaVantageData.length]);

    // Actualizar rentabilidad de inversiones activas automáticamente
    useEffect(() => {
        if (!isInversions || isInversions.length === 0) {
            console.log("ℹ️ No hay inversiones para actualizar rentabilidad");
            return;
        }

        const activeInversions = isInversions.filter(
            (inv) => inv.status !== "closed" && inv.symbol && inv.initial_price
        );

        if (activeInversions.length === 0) {
            console.log("ℹ️ No hay inversiones activas con símbolo para actualizar");
            return;
        }

        console.log(
            `📊 Configurando actualización automática para ${activeInversions.length} inversiones activas`
        );

        let currentIndex = 0;
        let isUpdating = false;

        const updateNextInvestment = async () => {
            if (isUpdating) {
                console.log("⏳ Actualización en progreso, esperando...");
                return;
            }

            // Obtener inversiones activas actualizadas del estado actual
            const currentActiveInversions = isInversions.filter(
                (inv) => inv.status !== "closed" && inv.symbol && inv.initial_price
            );

            if (currentActiveInversions.length === 0) return;

            isUpdating = true;
            const inversion = currentActiveInversions[currentIndex];

            console.log(
                `🔄 Actualizando rentabilidad ${currentIndex + 1}/${currentActiveInversions.length}: ${inversion.symbol}`
            );

            try {
                await updateRealProfitability(
                    inversion._id,
                    inversion.symbol,
                    inversion.initial_price
                );
            } catch (error) {
                console.error(`❌ Error actualizando ${inversion.symbol}:`, error);
            }

            currentIndex = (currentIndex + 1) % currentActiveInversions.length;
            isUpdating = false;
        };

        // Actualizar la primera inversión después de 5 segundos (dar tiempo a que cargue la UI)
        const initialTimeout = setTimeout(() => {
            updateNextInvestment();
        }, 5000);

        // Actualizar cada 15 segundos (respetando límite de 5 llamadas/minuto de Alpha Vantage)
        const interval = setInterval(updateNextInvestment, 15000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, [isInversions]);

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
