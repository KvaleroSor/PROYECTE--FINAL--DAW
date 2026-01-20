import { useFinancial } from "@/app/context/FinancialContext.js";
import { useSavingsRealTime } from "@/app/hooks/saving/useSavingsRealTime.js";

const GraphicPercentatgeSpend = () => {
    const { isPercentageSettings, isNomina, isFixedExpensesFromNomina, isLeisureExpensesFromNomina, isInvestmentFromNomina, isSavingFromNomina } = useFinancial();
    const fixedPercentage = isPercentageSettings.fixedExpenses;
    const leisurePercentage = isPercentageSettings.leisureExpenses;
    const investmentPercentage = isPercentageSettings.investment;
    const savingsPercentage = isPercentageSettings.savings;
    const { isTotalImprevistosPercentatge, isTotalImprevistos } = useSavingsRealTime();
    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                <div className="w-full h-full flex flex-col justify-start items-start mb-10">
                    <h1 className="text-slate-900 text-xl">Gráfico de los Porcentajes</h1>
                    <p className="text-slate-500">Repartición de la nómina en gráfico</p>
                </div>
                <div className="flex flex-row justify-center items-center mb-10 mx-6">
                    <div className="flex justify-center items-center rounded-l-xl w-full h-20 p-3 bg-slate-100 text-slate-800"><span>{fixedPercentage} %</span></div>
                    <div className="flex justify-center items-center w-full h-20 p-3 bg-slate-200 text-slate-700"><span>{leisurePercentage} %</span></div>
                    <div className="flex justify-center items-center w-full h-20 p-3 bg-slate-300 text-slate-600"><span>{investmentPercentage} %</span></div>
                    <div className="flex justify-center items-center w-full h-20 p-3 bg-slate-400 text-slate-200"><span>{savingsPercentage} %</span></div>
                    <div className="flex justify-center items-center rounded-r-xl w-full h-20 p-3 bg-slate-500 text-slate-100"><span>{isTotalImprevistosPercentatge} %</span></div>
                </div>
                <div className="flex flex-col justify-start items-start gap-10 mx-6 mb-10">
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="w-5 h-5 rounded-full bg-slate-100 /">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="border-slate-900">Para el Gasto Fijo</p>
                            <div className="flex flex-row justify-center items-center gap-4">
                                <p>{fixedPercentage} %</p>
                                <p>€ {Number(isFixedExpensesFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center  rounded-full bg-slate-200">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="border-slate-900 pr-4">Para el Gasto Ocio</p>
                            <div className="flex flex-row justify-center items-center gap-4">
                                <p>{leisurePercentage} %</p>
                                <p>€ {Number(isLeisureExpensesFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center  rounded-full bg-slate-300">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="border-slate-900 pr-4">Para el Inversión</p>
                            <div className="flex flex-row justify-center items-center gap-4">
                                <p>{investmentPercentage} %</p>
                                <p>€ {Number(isInvestmentFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center  rounded-full bg-slate-500">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="border-slate-900 pr-4">Para los Ahorro</p>
                            <div className="flex flex-row justify-center items-center gap-4">
                                <p>{savingsPercentage} %</p>
                                <p>€ {Number(isSavingFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center  rounded-full bg-slate-500">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="border-slate-900 pr-4">Para los Imprevistos</p>
                            <div className="flex flex-row justify-center items-center gap-4">
                                <p>{isTotalImprevistosPercentatge} %</p>
                                <p>€ {Number(isTotalImprevistos).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-start items-center gap-4">
                    <h1 className="text-slate-500">Nómina mensual</h1>
                    <p className="text-slate-900 text-2xl">€{Number(isNomina).toFixed(2)}</p>
                </div>

            </div>
        </>

    );
};

export default GraphicPercentatgeSpend;