import { useSession } from "next-auth/react";
import Spend from "./Spend.jsx";
import { useSpendsMonth } from "@/app/hooks/spend/useSpendsMonth.js";

const GridSpends = () => {
    const { data: session } = useSession();
    const { isSpendsOfMonth } = useSpendsMonth();

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
                    {!isSpendsOfMonth || isSpendsOfMonth.length === 0 ? (
                        <div>
                            <p>No hay gastos todavía.</p>
                        </div>
                    ) : (
                        <>
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
