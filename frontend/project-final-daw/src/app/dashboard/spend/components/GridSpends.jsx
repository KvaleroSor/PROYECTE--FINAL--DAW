import { useSession } from "next-auth/react";
import Spend from "./Spend.jsx";
import { useSpendsMonth } from "@/app/hooks/spend/useSpendsMonth.js";
import { useSpends } from "@/app/context/SpendContext.js";

const GridSpends = () => {
    const { data: session } = useSession();
    const { isSpendsOfMonth } = useSpendsMonth();
    const { isLoading, isSpends } = useSpends();

    return (
        <>
            <div className="w-full h-full flex flex-col gap-2 p-4">
                <div className="mb-5 flex flex-col justify-between gap-3">
                    <div className="flex flex-col items-start">
                        <h1 className="text-slate-900 text-xl">
                            Gastos del mes
                        </h1>
                        <p className="text-slate-500">
                            Listado de los gastos del mes
                        </p>
                    </div>
                    
                    {isLoading ? (
                        <div className="text-slate-500 flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                            <p>Cargando gastos...</p>
                        </div>
                    ) : !isSpendsOfMonth || isSpendsOfMonth.length === 0 ? (
                        <div className="text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="font-medium mb-2">No hay gastos registrados para este mes todavía.</p>
                            {isSpends && isSpends.length > 0 && (
                                <p className="text-sm text-slate-400">
                                    Tienes {isSpends.length} {isSpends.length === 1 ? 'gasto' : 'gastos'} en total, pero ninguno de este mes.
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="text-sm text-slate-600 mb-2">
                                <span className="font-semibold">{isSpendsOfMonth.length}</span> {isSpendsOfMonth.length === 1 ? 'gasto registrado' : 'gastos registrados'}
                            </div>
                            {isSpendsOfMonth.map((spend) => (
                                <Spend
                                    key={spend._id}
                                    spend={spend}
                                    session={session}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default GridSpends;
