import { Wallet, TrendingDown, TrendingUp, Calendar } from "lucide-react";
import { useFinancial } from "@/app/context/FinancialContext.js";

const CardsMainCategories = () => {
    const { isNomina } = useFinancial();

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                                <Wallet className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-slate-500">NÓMINA</h1>
                        </div>
                        <h1 className="text-4xl text-slate-900 mb-1">
                            € {Number(isNomina).toFixed(2)}
                        </h1>
                        <p className="text-slate-500">Nómina neta del mes</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardsMainCategories;
