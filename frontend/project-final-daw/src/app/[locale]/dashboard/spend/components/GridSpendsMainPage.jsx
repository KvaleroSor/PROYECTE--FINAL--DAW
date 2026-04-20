'use client';

import { Wallet, HandCoins, ReceiptText, Search, Calendar } from "lucide-react";
import GraphicMonthSpend from "./GraphicMonthSpend";
import GridSpends from "./GridSpends";
import Spend from "./Spend";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useSpends } from "@/app/context/SpendContext";
import { useCategories } from "@/app/context/CategoryContext";
import { useSession } from "next-auth/react";

const GridSpendsMainPage = () => {
    const t = useTranslations("expenses");
    const { isSpends, isLoading } = useSpends();
    const { setIsTotalSpendByMonth } = useSpends();
    const { isTotalSpendByMonth } = useSpends();
    const { isCategories } = useCategories();
    const { data: session } = useSession();
    const [isSearchOptionSelected, setIsSearchOptionSelected] = useState("year");
    const [isSearchOptionSpendCategorySelected, setIsSearchOptionSpendCategorySelected] = useState("spend");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Filtrar gastos según el tipo de búsqueda y query
    const filteredSpends = useMemo(() => {
        console.log("🔍 DEBUG - Total gastos:", isSpends?.length);
        console.log("🔍 DEBUG - Gastos:", isSpends);
        console.log("🔍 DEBUG - Filtro seleccionado:", isSearchOptionSelected);
        console.log("🔍 DEBUG - Fecha seleccionada:", selectedDate);
        console.log("🔍 DEBUG - Query búsqueda:", searchQuery);

        if (!isSpends || isSpends.length === 0) {
            console.log("❌ No hay gastos en el sistema");
            return [];
        }

        let filtered = [...isSpends];
        let filteredCategories = [...isCategories];

        //Envolvemos todo este condicional según si filtramos por categoria o por gasto
        if (isSearchOptionSpendCategorySelected === "spend") {
            // Filtrar por fecha según el tipo seleccionado
            if (isSearchOptionSelected === "day") {
                console.log("🔍 Filtrando por DÍA");
                filtered = filtered.filter(spend => {
                    if (!spend.date) return false;

                    // Intentar parsear la fecha de diferentes formas
                    let spendDate = new Date(spend.date);

                    // Si la fecha es inválida, intentar con el timestamp
                    if (isNaN(spendDate.getTime())) {
                        spendDate = new Date(parseInt(spend.date));
                    }

                    // Si sigue siendo inválida, saltar este gasto
                    if (isNaN(spendDate.getTime())) {
                        console.log("❌ Fecha inválida:", spend.date);
                        return false;
                    }

                    const compareDate = new Date(selectedDate);

                    console.log("Fecha gasto:", spendDate, "vs Fecha seleccionada:", compareDate);

                    // Normalizar fechas a medianoche para comparación exacta
                    spendDate.setHours(0, 0, 0, 0);
                    compareDate.setHours(0, 0, 0, 0);

                    const match = spendDate.getTime() === compareDate.getTime();
                    console.log("Match:", match);
                    return match;
                });
            } else if (isSearchOptionSelected === "month") {
                console.log("🔍 Filtrando por MES");
                console.log("Total gastos a filtrar:", filtered.length);

                filtered = filtered.filter((spend, index) => {
                    console.log(`\n--- Procesando gasto ${index + 1} ---`);
                    console.log("Gasto completo:", spend);
                    console.log("date:", spend.date);
                    console.log("Tipo de date:", typeof spend.date);

                    if (!spend.date) {
                        console.log("❌ No tiene date");
                        return false;
                    }

                    let spendDate = new Date(spend.date);
                    console.log("Después de new Date():", spendDate);
                    console.log("Es válida?:", !isNaN(spendDate.getTime()));

                    if (isNaN(spendDate.getTime())) {
                        console.log("⚠️ Intentando parsear como timestamp");
                        spendDate = new Date(parseInt(spend.date));
                        console.log("Después de parseInt:", spendDate);
                    }

                    if (isNaN(spendDate.getTime())) {
                        console.log("❌ Fecha inválida definitivamente");
                        return false;
                    }

                    const spendMonth = spendDate.getMonth();
                    const spendYear = spendDate.getFullYear();
                    const selectedMonth = selectedDate.getMonth();
                    const selectedYear = selectedDate.getFullYear();

                    console.log(`Fecha gasto: ${spendDate.toLocaleDateString()} (Mes: ${spendMonth}, Año: ${spendYear})`);
                    console.log(`Fecha buscada: ${selectedDate.toLocaleDateString()} (Mes: ${selectedMonth}, Año: ${selectedYear})`);

                    const match = (spendMonth === selectedMonth && spendYear === selectedYear);
                    console.log("✅ Match:", match);

                    return match;
                });
            } else if (isSearchOptionSelected === "year") {
                console.log("🔍 Filtrando por AÑO");
                filtered = filtered.filter(spend => {
                    if (!spend.date) {
                        console.log("❌ Gasto sin fecha:", spend);
                        return false;
                    }

                    console.log("📅 Fecha original del gasto:", spend.date, "Tipo:", typeof spend.date);

                    let spendDate = new Date(spend.date);

                    // Si la fecha es inválida, intentar con el timestamp
                    if (isNaN(spendDate.getTime())) {
                        console.log("⚠️ Fecha inválida, intentando parsear como timestamp");
                        spendDate = new Date(parseInt(spend.date));
                    }

                    // Si sigue siendo inválida, saltar este gasto
                    if (isNaN(spendDate.getTime())) {
                        console.log("❌ Fecha inválida después de intentar parsear:", spend.date);
                        return false;
                    }

                    const spendYear = spendDate.getFullYear();
                    const selectedYear = selectedDate.getFullYear();
                    const match = spendYear === selectedYear;

                    console.log("Año gasto:", spendYear, "vs", selectedYear, "Match:", match);
                    return match;
                });
            }

            console.log("✅ Gastos después de filtro de fecha:", filtered.length);

            // Filtrar por palabra clave en descripción (solo si hay texto)
            if (searchQuery.trim()) {
                console.log("🔍 Filtrando por palabra clave:", searchQuery);
                filtered = filtered.filter(spend =>
                    spend.description?.toLowerCase().includes(searchQuery.toLowerCase())
                );
                console.log("✅ Gastos después de filtro de texto:", filtered.length);
            }

            console.log("✅ RESULTADO FINAL:", filtered.length, "gastos");

            setIsTotalSpendByMonth(filtered.reduce((acc, spend) => acc + spend.amount, 0));

            return filtered;
        } else if (isSearchOptionSpendCategorySelected === 'category') {
            // Filtrar por palabra clave en descripción (solo si hay texto)

            //Anulamos la busqueda por dia, mes y año
            setIsSearchOptionSelected("null");

            if (searchQuery.trim()) {
                console.log("✅ Gastos después de filtro de fecha category:", filteredCategories.length);
                console.log(filteredCategories);
                console.log("🔍 Filtrando por palabra clave:", searchQuery);
                filteredCategories = filteredCategories.filter(cat =>
                    cat.name?.toLowerCase().includes(searchQuery.toLowerCase())
                );
                console.log("✅ Gastos después de filtro de texto category:", filteredCategories.length);
                console.log(filteredCategories);
            }

            console.log("✅ RESULTADO FINAL:", filteredCategories.length, "categorías filtradas");
            console.log("📊 Total gastos sin filtrar:", filtered.length);
            console.log("📋 IDs de categorías filtradas:", filteredCategories.map(cat => cat.id));
            console.log("📋 IDs de categorías en gastos:", [...new Set(filtered.map(spend => spend.category_id))]);

            const finalFiltered = filtered.filter((spend) => filteredCategories.some(cat => cat._id === spend.category_id));

            console.log("✅ FINAL FILTERED:", finalFiltered.length, "gastos encontrados");
            console.log("📄 Gastos finales:", finalFiltered);

            setIsTotalSpendByMonth(finalFiltered.reduce((acc, spend) => acc + spend.amount, 0));

            return finalFiltered;
        }


    }, [isSpends, isCategories, isSearchOptionSelected, isSearchOptionSpendCategorySelected, selectedDate, searchQuery]);

    // Calcular estadísticas basadas en los gastos reales
    const statistics = useMemo(() => {
        if (!isSpends || isSpends.length === 0) {
            return {
                monthlyAverage: 0,
                yearlyTotal: 0,
                totalTransactions: 0
            };
        }

        const currentYear = new Date().getFullYear();

        // Filtrar gastos del año actual
        const currentYearSpends = isSpends.filter(spend => {
            if (!spend.date) return false;
            const spendDate = new Date(spend.date);
            if (isNaN(spendDate.getTime())) return false;
            return spendDate.getFullYear() === currentYear;
        });

        // Total del año
        const yearlyTotal = currentYearSpends.reduce((sum, spend) => sum + (spend.amount || 0), 0);

        // Calcular media mensual (dividir total del año entre meses transcurridos)
        const currentMonth = new Date().getMonth() + 1; // 1-12
        const monthlyAverage = currentMonth > 0 ? yearlyTotal / currentMonth : 0;

        return {
            monthlyAverage,
            yearlyTotal,
            totalTransactions: isSpends.length
        };
    }, [isSpends]);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 dark:border-slate-400"></div>
            </div>
        );
    }

    return (<>
        {/* <div className="h-full grid grid-rows-[auto_auto_auto] lg:grid-rows-[3fr_2fr_5fr] sm:grid-cols-1"> */}
        <div className="w-full flex flex-col gap-4">

            {/* Header */}
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">
                <div className="mb-8">
                    <h1 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">{t("pageTitle")}</h1>
                    <p className="text-gray-600 dark:text-slate-400">
                        {t("pageSubtitle")}
                    </p>
                </div>
                <div className="w-full rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Tarjeta de media mensual*/}
                        <div className="gap-2 mb-2 bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                            <div className="flex flex-row justify-between items-center mb-3">
                                <div className="fex flex-col gap-2">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">{t("monthlyAverage")}</h1>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                                €{Number(statistics.monthlyAverage).toFixed(2)}
                            </h1>
                        </div>

                        {/* Tarjeta de total anual */}
                        <div className="gap-2 mb-2 bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                            <div className="flex flex-row justify-between items-center mb-3">
                                <div className="fex flex-col gap-2">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <HandCoins className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">{t("yearTotal")}</h1>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                                €{Number(statistics.yearlyTotal).toFixed(2)}
                            </h1>
                        </div>

                        {/* Tarjeta de número de transacciones */}
                        <div className="gap-2 mb-2 bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                            <div className="flex flex-row justify-between items-center mb-3">
                                <div className="fex flex-col gap-2">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 dark:bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <ReceiptText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">{t("totalTransactions")}</h1>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                                {statistics.totalTransactions}
                            </h1>
                        </div>
                    </div>

                </div>
            </div>

            {/* Gráfica */}
            <div className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">
                {/* <GridCategories /> */}
                <div className="w-full bg-white dark:bg-slate-700 rounded-xl shadow-lg hover:shadow-md p-2 transition-all duration-300 flex justify-center items-center">
                    <GraphicMonthSpend />
                </div>
            </div>

            {/* Buscador */}
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">
                <div className="w-full min-w-0 bg-white dark:bg-slate-700 rounded-xl">

                    <div className="w-full h-fit] rounded-xl flex justify-center items-center">
                        <div className="w-full flex flex-col gap-3 p-2">
                            <h1 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">{t("searchTitle")}</h1>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-slate-50 dark:bg-slate-700 py-2">
                                <button
                                    onClick={() => setIsSearchOptionSpendCategorySelected("spend")}
                                    className={`h-10 rounded-xl flex justify-center items-center m-1 mr-2 transition-all duration-300 ${isSearchOptionSpendCategorySelected === "spend"
                                        ? "bg-slate-800 dark:bg-slate-600 text-white"
                                        : "bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-500"
                                        }`}
                                >
                                    {t("byExpense")}
                                </button>
                                <button
                                    onClick={() => setIsSearchOptionSpendCategorySelected("category")}
                                    className={`h-10 rounded-xl flex justify-center items-center m-1 mr-2 transition-all duration-300 ${isSearchOptionSpendCategorySelected === "category"
                                        ? "bg-slate-800 dark:bg-slate-600 text-white"
                                        : "bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-500"
                                        }`}
                                >
                                    {t("byCategory")}
                                </button>
                            </div>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-xl bg-slate-50 dark:bg-slate-700 py-2">
                                <button
                                    onClick={() => setIsSearchOptionSelected("day")}
                                    className={`h-10 rounded-xl flex justify-center items-center m-1 ml-2 transition-all duration-300 ${isSearchOptionSelected === "day"
                                        ? "bg-slate-800 dark:bg-slate-600 text-white"
                                        : "bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-500"
                                        }`}
                                >
                                    {t("byDay")}
                                </button>
                                <button
                                    onClick={() => setIsSearchOptionSelected("month")}
                                    className={`h-10 rounded-xl flex justify-center items-center m-1 transition-all duration-300 ${isSearchOptionSelected === "month"
                                        ? "bg-slate-800 dark:bg-slate-600 text-white"
                                        : "bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-500"
                                        }`}
                                >
                                    {t("byMonth")}
                                </button>
                                <button
                                    onClick={() => setIsSearchOptionSelected("year")}
                                    className={`h-10 rounded-xl flex justify-center items-center m-1 mr-2 transition-all duration-300 ${isSearchOptionSelected === "year"
                                        ? "bg-slate-800 dark:bg-slate-600 text-white"
                                        : "bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-500"
                                        }`}
                                >
                                    {t("byYear")}
                                </button>
                            </div>
                            <div className="w-full flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 h-10 relative ml-2">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-500 dark:text-slate-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-full bg-slate-50 dark:bg-slate-600 rounded-xl text-slate-900 dark:text-slate-100 pl-12 pr-4 appearance-none border-2 border-transparent outline-none ring-0 focus:border-2 focus:border-slate-500 focus:ring-0 transition-all duration-300"
                                        placeholder={t("searchPlaceholder")}
                                    />
                                </div>
                                {(isSearchOptionSelected === 'day') && (
                                    <div className="h-10 relative ml-2 mr-2">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-500 dark:text-slate-400 pointer-events-none" />
                                        <input
                                            type="date"
                                            value={selectedDate.toISOString().split('T')[0]}
                                            onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                            className="w-full sm:w-auto h-full bg-slate-50 dark:bg-slate-600 rounded-xl text-slate-900 dark:text-slate-100 pl-12 pr-4 appearance-none border-2 border-transparent outline-none ring-0 focus:border-2 focus:border-slate-500 focus:ring-0 transition-all duration-300"
                                        />
                                    </div>
                                )}
                                {/* <div className="group relative w-full h-10 bg-slate-50 dark:bg-slate-600 rounded-xl p-2 border-2 border-transparent focus:border-slate-500 focus:ring-0 transition-all duration-300 mr-2">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-500 dark:text-slate-400" />
                                    <select className="w-full h-full appearance-none bg-slate-50 dark:bg-slate-600 rounded-xl pl-12 pr-4 outline-none focus:outline-none text-slate-500 dark:text-slate-400 cursor-pointer" value={"Enero"}>
                                        <option value="Enero">Enero</option>
                                        <option value="Febrero">Febrero</option>
                                        <option value="Marzo">Marzo</option>
                                        <option value="Abril">Abril</option>
                                        <option value="Mayo">Mayo</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-500 dark:text-slate-400" />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Resultados de búsqueda */}
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">
                <div className="w-full bg-white dark:bg-slate-700 rounded-xl p-4">
                    <div className="flex flex-row justify-between">
                        <div className="mb-4">
                            <h2 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">{t("results")}</h2>
                            <p className="text-gray-600 dark:text-slate-400">
                                {filteredSpends.length} {filteredSpends.length === 1 ? t("expenseFound") : t("expensesFound")}
                                {isSearchOptionSelected === "day" && ` el ${selectedDate.toLocaleDateString('es-ES')}`}
                                {isSearchOptionSelected === "month" && ` en ${selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`}
                                {isSearchOptionSelected === "year" && ` en ${selectedDate.getFullYear()}`}
                            </p>
                            {searchQuery && (
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {t("searching")} "{searchQuery}"
                                </p>
                            )}
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                                {t("totalInSystem")} {isSpends?.length || 0}
                            </p>
                        </div>

                        {(isTotalSpendByMonth > 0) && (
                            <div className="flex flex-col justify-center items-center gap-2 bg-slate-100 rounded-xl p-4 mb-2 shadow-lg hover:shadow-md dark:shadow-lg dark:hover:shadow-md dark:shadow-slate-900 dark:bg-slate-600 transition-all duration-300 px-10">
                                <h3 className="text-lg dark:text-slate-100">{t("totalAccumulated")}</h3>
                                <span className="text-3xl text-slate-900 dark:text-slate-100">{isTotalSpendByMonth.toFixed(2)} €</span>
                            </div>
                        )}
                    </div>

                    {filteredSpends.length === 0 ? (
                        <div className="text-center py-12">
                            <Search className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-500 dark:text-slate-400 text-lg">
                                {t("noExpensesFound")}
                            </p>
                            <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                                {t("tryChangingFilters")}
                            </p>
                        </div>
                    ) : (
                        <div className="max-h-[600px] overflow-y-auto flex flex-col gap-3 no-scrollbar px-1 py-1">
                            {filteredSpends.map((spend) => (
                                <Spend
                                    key={spend._id}
                                    spend={spend}
                                    session={session}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>);
}

export default GridSpendsMainPage;