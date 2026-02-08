'use client';

import { Plus, Target, Wallet, TrendingUp, AlertCircle, TrendingDown, PartyPopper, Landmark, HandCoins, ReceiptText, Search, Calendar, ChevronDown } from "lucide-react";
import GraphicMonthSpend from "./GraphicMonthSpend";
import GridSpends from "./GridSpends";
import { useState } from "react";

const GridSpendsMainPage = () => {
    // Hooks del componente
    const [isSearchOptionSelected, setIsSearchOptionSelected] = useState("month");


    // if (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center h-64">
    //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
    //         </div>
    //     );
    // }

    return (<>
        {/* <div className="h-full grid grid-rows-[auto_auto_auto] lg:grid-rows-[3fr_2fr_5fr] sm:grid-cols-1"> */}
        <div className="w-full flex flex-col gap-4">

            {/*Header */}
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">
                <div className="mb-8">
                    <h1 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">Gastos</h1>
                    <p className="text-gray-600 dark:text-slate-400">
                        Gestiona tus gastos y alcanza tus metas
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
                                <h1 className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">Media Mensual</h1>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                                €{Number(897).toFixed(2)}
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
                                <h1 className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">Total del Año</h1>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                                €{Number(10321).toFixed(2)}
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
                                <h1 className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">Transacciones totales</h1>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 mb-1">
                                231
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
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">
                <div className="w-full min-w-0 bg-white dark:bg-slate-700 rounded-xl">
                    {/* <Saving /> */}
                    {/* <GridSpends /> */}
                    <div className="w-full h-fit] rounded-xl flex justify-center items-center">
                        <div className="w-full flex flex-col gap-3 p-2">
                            <h1 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">Buscardor Gastos</h1>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-xl bg-slate-50 dark:bg-slate-700 py-2">
                                <div className="h-10 rounded-xl bg-white dark:bg-slate-600 flex justify-center items-center m-1 ml-2 pl-4">
                                    <button>Por mes</button>
                                </div>
                                <div className="h-10 rounded-xl bg-white dark:bg-slate-600 flex justify-center items-center m-1 pl-4">
                                    <button>Por dia</button>
                                </div>
                                <div className="h-10 rounded-xl bg-white dark:bg-slate-600 flex justify-center items-center m-1 mr-2 pl-4">
                                    <button>Por año</button>
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="h-10 relative ml-2">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-500 dark:text-slate-400" />
                                    <input type="text" className="w-full h-full bg-slate-50 dark:bg-slate-600 rounded-xl text-slate-500 pl-12 appearance-none border-2 border-transparent outline-none ring-0 focus:border-2 focus:border-slate-500 focus:ring-0 transition-all duration-300" placeholder="Buscar por nombre o categoria..." />
                                </div>
                                <div className="group relative w-full h-10 bg-slate-50 dark:bg-slate-600 rounded-xl p-2 border-2 border-transparent focus:border-slate-500 focus:ring-0 transition-all duration-300 mr-2">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-500 dark:text-slate-400" />
                                    <select className="w-full h-full appearance-none bg-slate-50 dark:bg-slate-600 rounded-xl pl-12 pr-4 outline-none focus:outline-none text-slate-500 dark:text-slate-400 cursor-pointer" value={"Enero"}>
                                        <option value="Enero">Enero</option>
                                        <option value="Febrero">Febrero</option>
                                        <option value="Marzo">Marzo</option>
                                        <option value="Abril">Abril</option>
                                        <option value="Mayo">Mayo</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-500 dark:text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">
                <div className="w-fullrounded-xl flex justify-center items-center">
                    <GridSpends />
                </div>
            </div>
        </div>
    </>);
}

export default GridSpendsMainPage;