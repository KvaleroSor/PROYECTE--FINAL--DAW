import React from 'react'
import { useTranslations } from 'next-intl';
import { useFinancial } from '@/app/context/FinancialContext.js';
import { useSavingsRealTime } from "@/app/hooks/saving/useSavingsRealTime.js";
import { useState, useEffect } from 'react';
import { X, Repeat, Ban } from 'lucide-react';

const FormModifyPercentage = () => {
    const t = useTranslations("percentageChart");
    const { isPercentageSettings, isNomina, isFixedExpensesFromNomina, isLeisureExpensesFromNomina, isInvestmentFromNomina, isSavingFromNomina, setIsFormModifyPercentageOpen, setIsNomina, updatePercentageSettings, updateNomina } = useFinancial();
    const { isTotalImprevistosPercentatge, isTotalImprevistos, setIsTotalImprevistosPercentatge, setIsTotalImprevistos } = useSavingsRealTime();
    const [fixedPercentage, setFixedPercentage] = useState(isPercentageSettings.fixedExpenses);
    const [leisurePercentage, setLeisurePercentage] = useState(isPercentageSettings.leisureExpenses);
    const [investmentPercentage, setInvestmentPercentage] = useState(isPercentageSettings.investment);
    const [savingsPercentage, setSavingsPercentage] = useState(isPercentageSettings.savings);
    const [isTotalPercentage, setIsTotalPercentage] = useState(0);
    const [isTotalPercentageWrong, setIsTotalPercentageWrong] = useState(false);
    const [isNominaUpdated, setIsNominaUpdated] = useState(false);

    const handleClickCloseFormModifyPercentage = () => {
        setIsFormModifyPercentageOpen(false);
    };

    const handleCalculateTotalPercentage = () => {
        const fixedPercentageNumber = Number(fixedPercentage);
        const leisurePercentageNumber = Number(leisurePercentage);
        const investmentPercentageNumber = Number(investmentPercentage);
        const savingsPercentageNumber = Number(savingsPercentage);

        const total = fixedPercentageNumber + leisurePercentageNumber + investmentPercentageNumber + savingsPercentageNumber;

        setIsTotalPercentage(total);

        if (total > 100) {
            console.log("ERROR - LOS PORCENTAJES NO PUEDEN SER MAYORES A 100%");
            setIsTotalPercentageWrong(true);
            return;
        }

        if (total < 100) {
            console.log("ERROR - LOS PORCENTAJES NO PUEDEN SER MAYORES A 100%");
            setIsTotalPercentageWrong(true);
            return;
        }

        if (total === 100) {
            setIsTotalPercentageWrong(false);
            return;
        }
    };

    const handleSubmitFormModifyPercentage = async (e) => {
        e.preventDefault();

        if (isNominaUpdated && isNomina > 0) {
            try {
                updateNomina(isNomina);
                setIsNominaUpdated(false);
            } catch (err) {
                console.error("ERROR - NO SE PUEDE ACTUALIZAR LA NÓMINA DEL USUARIO:", err);
            }
        } else {
            const res = await updatePercentageSettings({
                fixedExpenses: Number(fixedPercentage),
                leisureExpenses: Number(leisurePercentage),
                investment: Number(investmentPercentage),
                savings: Number(savingsPercentage),
            });

            if (!res) {
                console.log("ERROR - NO SE PUEDE ACTUALIZAR LOS % DEL USUARIO");
                return;
            }

            setIsTotalImprevistosPercentatge(isTotalImprevistosPercentatge);
            setIsTotalImprevistos(isTotalImprevistos);
            setIsFormModifyPercentageOpen(false);
        }
    };

    useEffect(() => {
        handleCalculateTotalPercentage();
    }, [fixedPercentage, leisurePercentage, investmentPercentage, savingsPercentage]);

    useEffect(() => {
        setIsNominaUpdated(true);
    }, [isNomina]);

    return (
        <>
            <form className="w-full flex flex-col justify-start items-center gap-3 text-slate-700 dark:text-slate-300" onSubmit={(e) => {
                handleSubmitFormModifyPercentage(e);
            }}>
                <div className="w-full flex flex-row justify-between mb-8 gap-2">
                    <div className="flex flex-col justify-start">
                        <h1 className="text-2xl text-slate-900 dark:text-slate-100">Actualizar Porcentajes</h1>
                        <p className="text-slate-600 dark:text-slate-400">Personaliza tus porcentajes de gastos</p>
                    </div>
                    <div className="">
                        <X
                            className="w-15 h-15 transition-all duration-300 hover:rotate-90 cursor-pointer text-slate-700 dark:text-slate-300"
                            onClick={handleClickCloseFormModifyPercentage}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-row justify-center items-center mb-6 mx-6">
                    <div className="flex justify-center items-center rounded-l-xl w-full h-15 p-3 bg-slate-600 dark:bg-slate-600 text-white dark:text-slate-100"><span>{fixedPercentage} %</span></div>
                    <div className="flex justify-center items-center w-full h-15 p-3 bg-slate-500 dark:bg-blue-800 text-white dark:text-slate-100"><span>{leisurePercentage} %</span></div>
                    <div className="flex justify-center items-center w-full h-15 p-3 bg-sky-500 dark:bg-teal-800 text-white dark:text-slate-100"><span>{investmentPercentage} %</span></div>
                    <div className="flex justify-center items-center w-full h-15 p-3 bg-cyan-500 dark:bg-green-800 text-white dark:text-slate-100"><span>{savingsPercentage} %</span></div>
                    <div className="flex justify-center items-center rounded-r-xl w-full h-15 p-3 bg-slate-400 dark:bg-slate-700 text-white dark:text-slate-100"><span>{isTotalImprevistosPercentatge} %</span></div>
                </div>
                <div className="w-full flex flex-col justify-start gap-2 border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
                    <div className="w-full flex flex-row justify-start items-center gap-2 border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl p-4">
                        <div className="w-5 h-5 rounded-full bg-slate-600 dark:bg-slate-600">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-slate-900 dark:text-slate-100">{t("fixedExpense")}</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-slate-700 dark:text-slate-300">
                                <input type="number" value={fixedPercentage} className="w-16 p-2 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" onChange={(e) => setFixedPercentage(e.target.value)} />
                                <span>%</span>
                                <p>€ {Number(isFixedExpensesFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-start items-center gap-2 border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl p-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center rounded-full bg-slate-500 dark:bg-blue-800">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-slate-900 dark:text-slate-100 pr-4">{t("leisureExpense")}</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-slate-700 dark:text-slate-300">
                                <input type="number" value={leisurePercentage} className="w-16 p-2 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" onChange={(e) => setLeisurePercentage(e.target.value)} />
                                <span>%</span>
                                <p>€ {Number(isLeisureExpensesFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-start items-center gap-2 border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl p-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center rounded-full bg-sky-500 dark:bg-teal-800">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-slate-900 dark:text-slate-100 pr-4">{t("investment")}</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-slate-700 dark:text-slate-300">
                                <input type="number" value={investmentPercentage} className="w-16 p-2 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" onChange={(e) => setInvestmentPercentage(e.target.value)} />
                                <span>%</span>
                                <p>€ {Number(isInvestmentFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-start items-center gap-2 border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl p-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center rounded-full bg-cyan-500 dark:bg-green-800">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-slate-900 dark:text-slate-100 pr-4">{t("savings")}</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-slate-700 dark:text-slate-300">
                                <input type="number" value={savingsPercentage} className="w-16 p-2 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" onChange={(e) => setSavingsPercentage(e.target.value)} />
                                <span>%</span>
                                <p>€ {Number(isSavingFromNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {!isTotalPercentageWrong ? (
                    <div className="w-full flex flex-row justify-start items-center gap-2 border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 mt-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center rounded-full bg-slate-400 dark:bg-slate-700">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-slate-900 dark:text-slate-100 pr-4">Total</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-slate-700 dark:text-slate-300">
                                <p>{isTotalPercentage} %</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-row justify-start items-center gap-2 border-2 border-red-300 dark:border-red-700 bg-red-100 dark:bg-red-800 rounded-xl p-4 mt-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center rounded-full bg-red-500 dark:bg-red-700">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-red-500 dark:text-red-700 pr-4">Total</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-red-500 dark:text-red-700">
                                <p>{isTotalPercentage} %</p>
                            </div>
                        </div>
                    </div>
                )}

                < div className='w-full border-t-2 border-slate-300 dark:border-slate-700 my-4'>
                    <div className="w-full flex flex-row justify-start items-center gap-2 border-2 border-emerald-400 dark:border-emerald-700 bg-emerald-100 dark:bg-emerald-800 rounded-xl p-4 mt-4">
                        <div className="w-5 h-5 flex flex-row justify-center items-center rounded-full bg-emerald-500 dark:bg-emerald-00">
                        </div>
                        <div className="w-full flex flex-row justify-between items-center gap-4">
                            <p className="text-slate-900 dark:text-slate-100 pr-4">Nómina</p>
                            <div className="flex flex-row justify-center items-center gap-4 text-slate-700 dark:text-slate-300">
                                <input type="number" value={isNomina} className="w-28 p-2 rounded-xl border-2 border-emerald-300 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-900 text-slate-700 dark:text-slate-300" onChange={(e) => setIsNomina(e.target.value)} />
                                <p>€ {Number(isNomina).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex justify-center items-center w-full gap-3">
                    <div className="flex flex-col w-full gap-2">
                        <button
                            id="button-update"
                            type={
                                isTotalPercentageWrong
                                    ? "button"
                                    : "submit"
                            }
                            className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-800 dark:bg-slate-600 text-slate-100 hover:border-slate-100 dark:hover:border-slate-100"
                            onClick={
                                isTotalPercentageWrong
                                    ? handleClickCloseFormModifyPercentage
                                    : undefined
                            }
                        >
                            {isTotalPercentageWrong ? (
                                <>
                                    <X className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                    <span>Cerrar</span>
                                </>
                            ) : (
                                <>
                                    <Repeat className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                    <span>Actualizar Porcentajes</span>
                                </>
                            )}
                        </button>
                        <button
                            id="button-cancel"
                            type="submit"
                            className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 hover:border-slate-900 dark:hover:border-slate-400 text-slate-600 dark:text-slate-300"
                            onClick={handleClickCloseFormModifyPercentage}
                        >
                            <Ban className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Cancelar</span>
                        </button>
                    </div>
                </div>
            </form >
        </>
    )
}

export default FormModifyPercentage