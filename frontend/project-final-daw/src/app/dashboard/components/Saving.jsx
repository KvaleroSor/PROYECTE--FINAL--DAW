import { PiggyBank } from "lucide-react";
import { useFinancial } from "@/app/context/FinancialContext.js";

const Saving = () => {
    return (
        <>
            <div className="w-full h-full flex flex-col">
                <div className="flex flex-row justify-start items-center">
                    <div className="w-12 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 border-2 bg-slate-800 m-3">
                        <PiggyBank className="w-7 h-7 text-slate-200" />
                    </div>
                    <div>
                        <h1 className="text-xl text-slate-900">Ahorro</h1>
                        <h3 className="text-md text-slate-500">Tus metas de ahorro</h3>
                    </div>
                </div>

                <div>caja 2</div>
                <div>caja 3</div>
            </div>
        </>
    );
};

export default Saving;
