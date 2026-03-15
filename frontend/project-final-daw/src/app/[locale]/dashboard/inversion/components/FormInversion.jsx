"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useInversion } from "@/app/context/InversionContext.js";
import { useFinancial } from "@/app/context/FinancialContext.js";
import {
    Plus,
    X,
    Repeat,
    Ban,
    TrendingUp,
    Calendar,
    DollarSign,
    Target,
    Percent,
    AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AlertMessage from "@/components/AlertMessage.jsx";
import StockSearchInput from "./StockSearchInput.jsx";

const inversionSchema = z.object({
    symbol: z.string().optional(),
    name: z.string().optional(),
    type: z.string().min(1, "El tipo de inversión es requerido"),
    amount: z.number().positive("El monto debe ser mayor a 0"),
    date: z.string().min(1, "La fecha es requerida"),
    target_profitability: z.number().min(0, "La rentabilidad objetivo debe ser mayor o igual a 0"),
    real_profitability: z.number().optional(),
});

const FormInversion = () => {
    const { data: session } = useSession();
    const {
        isSelectedInversion,
        isFormInversionOpen,
        isInversionFromNomina,
        isInversions,
        isAlphaVantageData,
        isAlphaVantageLoading,
        isAlphaVantageLoaded,
        setIsFormInversionOpen,
        createInversion,
        updateInversionData,
        resetForm: resetContextForm,
    } = useInversion();

    const { isInvestmentFromNomina } = useFinancial();

    const [isButtonPushed, setIsButtonPushed] = useState("create");
    const [isError, setIsError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [availableToInvest, setAvailableToInvest] = useState(0);
    const [selectedStock, setSelectedStock] = useState(null);

    const inversionTypes = [
        "Acciones",
        "Bonos",
        "Fondos de Inversión",
        "ETFs",
        "Criptomonedas",
        "Bienes Raíces",
        "Otro",
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm({
        resolver: zodResolver(inversionSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            symbol: "",
            name: "",
            type: "",
            amount: "",
            date: new Date().toISOString().split("T")[0],
            target_profitability: "",
            real_profitability: 0,
        },
    });

    const watchAmount = watch("amount");

    const handleStockSelect = (stock) => {
        setSelectedStock(stock);
        setValue("symbol", stock.symbol);
        setValue("name", stock.name);

        // Auto-detectar tipo de inversión basado en assetType
        if (stock.assetType) {
            const assetTypeMap = {
                "Stock": "Acciones",
                "ETF": "ETFs",
                "Mutual Fund": "Fondos de Inversión",
                "Bond": "Bonos",
            };
            const mappedType = assetTypeMap[stock.assetType] || "Otro";
            setValue("type", mappedType);
        }
    };

    const handleClearStock = () => {
        setSelectedStock(null);
        setValue("symbol", "");
        setValue("name", "");
    };

    useEffect(() => {
        if (isSelectedInversion) {
            setIsButtonPushed("update");
            setSelectedStock(isSelectedInversion.symbol ? {
                symbol: isSelectedInversion.symbol,
                name: isSelectedInversion.name,
            } : null);
            reset({
                symbol: isSelectedInversion.symbol || "",
                name: isSelectedInversion.name || "",
                type: isSelectedInversion.type || "",
                amount: Number(isSelectedInversion.amount) || 0,
                date: isSelectedInversion.date
                    ? new Date(isSelectedInversion.date).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0],
                target_profitability: Number(isSelectedInversion.target_profitability) || 0,
                real_profitability: Number(isSelectedInversion.real_profitability) || 0,
            });
        } else {
            setIsButtonPushed("create");
            setSelectedStock(null);
            reset({
                symbol: "",
                name: "",
                type: "",
                amount: "",
                date: new Date().toISOString().split("T")[0],
                target_profitability: "",
                real_profitability: 0,
            });
        }
    }, [isSelectedInversion, reset]);

    useEffect(() => {
        const totalInvested = isInversions.reduce((acc, inv) => acc + Number(inv.amount || 0), 0);
        const available = isInvestmentFromNomina - totalInvested;
        setAvailableToInvest(available);
    }, [isInversions, isInvestmentFromNomina]);

    const handleCloseForm = () => {
        resetContextForm();
        setIsFormInversionOpen(false);
        setIsError("");
        setIsSuccess(false);
        setIsButtonPushed("create");
        reset();
    };

    const handleSubmitInversion = async (formData) => {
        setIsError("");
        setIsSuccess(false);

        if (isButtonPushed === "create") {
            if (formData.amount > availableToInvest) {
                setIsError(`Solo tienes €${availableToInvest.toFixed(2)} disponibles para invertir`);
                return;
            }

            try {
                const dataToSend = {
                    ...formData,
                    user_id: session?.user?.user_id,
                };

                await createInversion(dataToSend);
                setIsSuccess(true);
                setTimeout(() => {
                    handleCloseForm();
                }, 1500);
            } catch (err) {
                console.error(err);
                setIsError("Error al crear la inversión");
            }
        } else if (isButtonPushed === "update") {
            try {
                await updateInversionData(isSelectedInversion._id, formData);
                setIsSuccess(true);
                setTimeout(() => {
                    handleCloseForm();
                }, 1500);
            } catch (err) {
                console.error(err);
                setIsError("Error al actualizar la inversión");
            }
        }
    };

    const calculatePotentialReturn = () => {
        const amount = watchAmount || 0;
        const targetProfit = watch("target_profitability") || 0;
        return (amount * targetProfit) / 100;
    };

    return (
        <form
            className="w-full flex flex-col justify-start items-center gap-3 text-slate-700 dark:text-slate-300"
            onSubmit={handleSubmit(handleSubmitInversion)}
        >
            {/* Header */}
            <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-slate-700 rounded-xl p-4 shadow-lg hover:shadow-md transition-all duration-300">
                <div className="w-full flex flex-row justify-between mb-3 gap-2">
                    <div className="flex flex-col justify-start">
                        <h1 className="text-2xl text-slate-900 dark:text-slate-100">
                            {isSelectedInversion ? "Actualizar Inversión" : "Nueva Inversión"}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            {isSelectedInversion
                                ? "Modifica los datos de tu inversión"
                                : "Añade una nueva inversión a tu portfolio"}
                        </p>
                    </div>
                    <div>
                        <X
                            className="w-15 h-15 transition-all duration-300 hover:rotate-90 cursor-pointer text-slate-700 dark:text-slate-300"
                            onClick={handleCloseForm}
                        />
                    </div>
                </div>

                {/* Información de presupuesto disponible */}
                <div className="w-full bg-slate-100 dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                            Presupuesto de Inversión
                        </p>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-700 dark:text-slate-300">Total Mensual</span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">
                                €{isInvestmentFromNomina?.toFixed(2) || 0}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-300 dark:border-slate-500">
                            <span className="text-slate-700 dark:text-slate-300 font-medium">
                                Disponible
                            </span>
                            <span
                                className={`font-bold text-lg ${availableToInvest >= 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                    }`}
                            >
                                €{availableToInvest.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Alertas */}
                {isError && (
                    <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <p className="text-sm text-red-800 dark:text-red-300">{isError}</p>
                    </div>
                )}

                {isSuccess && (
                    <div className="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-3">
                        <p className="text-sm text-green-800 dark:text-green-300 text-center">
                            ✅ Inversión guardada exitosamente
                        </p>
                    </div>
                )}

                {/* Buscador de símbolos (opcional) */}
                <div className="w-full flex flex-col justify-start gap-2 mb-4">
                    <label className="text-slate-700 dark:text-slate-300 flex items-center justify-between">
                        <span>Buscar Símbolo (Opcional)</span>
                        {isAlphaVantageLoading && (
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                Cargando datos...
                            </span>
                        )}
                        {isAlphaVantageLoaded && !isAlphaVantageLoading && (
                            <span className="text-xs text-green-600 dark:text-green-400">
                                ✓ {isAlphaVantageData.length} símbolos disponibles
                            </span>
                        )}
                    </label>
                    <StockSearchInput
                        alphaVantageData={isAlphaVantageData}
                        isLoading={isAlphaVantageLoading}
                        onSelect={handleStockSelect}
                        selectedSymbol={selectedStock?.symbol}
                        onClear={handleClearStock}
                    />
                    {selectedStock && (
                        <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <p className="text-sm text-green-800 dark:text-green-300">
                                ✓ Seleccionado: <span className="font-bold">{selectedStock.symbol}</span>
                                {selectedStock.name && ` - ${selectedStock.name}`}
                            </p>
                        </div>
                    )}
                </div>

                {/* Tipo de inversión */}
                <div className="w-full flex flex-col justify-start gap-2 mb-4">
                    <label htmlFor="type" className="text-slate-700 dark:text-slate-300">
                        Tipo de Inversión {selectedStock && <span className="text-xs text-slate-500 dark:text-slate-400">(autocompletado)</span>}
                    </label>
                    <select
                        id="type"
                        className="h-12 w-full bg-gray-50 dark:bg-slate-500 border border-gray-200 dark:border-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors rounded-lg p-2 shadow-md text-slate-900 dark:text-slate-100"
                        {...register("type")}
                    >
                        <option value="">Selecciona un tipo</option>
                        {inversionTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {errors.type && <AlertMessage message={errors.type.message} type="error" />}
                    {selectedStock && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            💡 El tipo se autocompletó basado en el símbolo seleccionado, pero puedes cambiarlo si lo deseas
                        </p>
                    )}
                </div>

                {/* Monto */}
                <div className="w-full flex flex-col justify-start gap-2 mb-4">
                    <label htmlFor="amount" className="text-slate-700 dark:text-slate-300">
                        Monto de Inversión
                    </label>
                    <input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00 €"
                        className="h-12 w-full bg-gray-50 dark:bg-slate-500 border border-gray-200 dark:border-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors rounded-lg p-2 shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-900"
                        {...register("amount", { valueAsNumber: true })}
                    />
                    {errors.amount && <AlertMessage message={errors.amount.message} type="error" />}
                </div>

                {/* Fecha */}
                <div className="w-full flex flex-col justify-start gap-2 mb-4">
                    <label htmlFor="date" className="text-slate-700 dark:text-slate-300">
                        Fecha de Inversión
                    </label>
                    <input
                        id="date"
                        type="date"
                        className="h-12 w-full bg-gray-50 dark:bg-slate-500 border border-gray-200 dark:border-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors rounded-lg p-2 shadow-md text-slate-900 dark:text-slate-100"
                        {...register("date")}
                    />
                    {errors.date && <AlertMessage message={errors.date.message} type="error" />}
                </div>
            </div>

            {/* Rentabilidad */}
            <div className="w-full flex flex-col justify-start gap-4 bg-slate-50 dark:bg-slate-700 rounded-xl p-4 shadow-lg hover:shadow-md">
                <div className="w-full grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="target_profitability"
                            className="text-slate-700 dark:text-slate-300"
                        >
                            Rentabilidad Objetivo (%)
                        </label>
                        <input
                            id="target_profitability"
                            type="number"
                            step="0.01"
                            placeholder="5.00"
                            className="h-12 w-full bg-gray-50 dark:bg-slate-500 border border-gray-200 dark:border-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors rounded-lg p-2 shadow-md text-slate-900 dark:text-slate-100"
                            {...register("target_profitability", { valueAsNumber: true })}
                        />
                        {errors.target_profitability && (
                            <AlertMessage message={errors.target_profitability.message} type="error" />
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="real_profitability"
                            className="text-slate-700 dark:text-slate-300"
                        >
                            Rentabilidad Real (%)
                        </label>
                        <input
                            id="real_profitability"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="h-12 w-full bg-gray-50 dark:bg-slate-500 border border-gray-200 dark:border-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors rounded-lg p-2 shadow-md text-slate-900 dark:text-slate-100"
                            {...register("real_profitability", { valueAsNumber: true })}
                        />
                    </div>
                </div>

                {/* Retorno potencial */}
                {watchAmount > 0 && watch("target_profitability") > 0 && (
                    <div className="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <p className="text-sm text-green-800 dark:text-green-300">
                            💰 Retorno potencial:{" "}
                            <span className="font-bold">€{calculatePotentialReturn().toFixed(2)}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Botones de acción */}
            <div className="flex justify-center items-center w-full gap-3">
                {isButtonPushed === "create" ? (
                    <div className="flex flex-col w-full gap-2">
                        <button
                            id="button-create"
                            type="submit"
                            className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-800 dark:bg-slate-600 text-slate-100 hover:border-slate-100 dark:hover:border-slate-400"
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Crear Inversión</span>
                        </button>
                        <button
                            id="button-cancel"
                            type="button"
                            className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 hover:border-slate-900 dark:hover:border-slate-400 text-slate-600 dark:text-slate-300"
                            onClick={handleCloseForm}
                        >
                            <Ban className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Cancelar</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col w-full gap-2">
                        <button
                            id="button-update"
                            type="submit"
                            className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-800 dark:bg-slate-600 text-slate-100 hover:border-slate-100 dark:hover:border-slate-400"
                        >
                            <Repeat className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Actualizar Inversión</span>
                        </button>
                        <button
                            id="button-cancel"
                            type="button"
                            className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 hover:border-slate-900 dark:hover:border-slate-400 text-slate-600 dark:text-slate-300"
                            onClick={handleCloseForm}
                        >
                            <Ban className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Cancelar</span>
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default FormInversion;