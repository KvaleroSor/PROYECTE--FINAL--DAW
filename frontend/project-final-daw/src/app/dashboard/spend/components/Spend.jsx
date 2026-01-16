import {
    ShoppingCart,
    Coffee,
    Home,
    Zap,
    Car,
    Wifi,
    Calendar,
    CreditCard,
    LucideIcon,
} from "lucide-react";

const Spend = ({ spend, sessio}) => {
    // CREAR HOOK PARA DEVOLVER EL ICONO DE CADA CATEGORÍA --> Pasando category_id al hook
    //CREAR HOOK PARA DEVOLVER EL NOMBRE DE LA CATEGORÍA --> Pasando category_id al hook

    const sideLineColors = [
        "bg-slate-800",
        "bg-slate-600",
        "bg-slate-500",
        "bg-slate-400",
        "bg-emerald-600",
    ];

    const sideLineColor = sideLineColors[1 % sideLineColors.length];

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group overflow-hidden">
                <div className="flex">
                    {/* Línea de color lateral */}
                    <div className={`w-1.5 ${sideLineColor}`}></div>

                    {/* Contenido */}
                    <div className="flex-1 p-5">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <Car className={`w-5 h-5`} />
                                <div>
                                    <p className="text-sm font-medium text-slate-900">
                                        {spend.description}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {"category"}
                                    </p>
                                </div>
                            </div>
                            <p className="text-xl text-slate-900 font-medium">
                                € {spend.amount.toFixed(2)}
                                
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(spend.date).toLocaleDateString("es-ES", {
                                    day: "2-digit",
                                    month: "long",
                                })}
                            </span>
                            {spend.payment_type && (
                                <div className="flex items-center gap-1">
                                    <CreditCard className="w-3 h-3 text-slate-400" />
                                    <span className="text-xs text-slate-600">
                                        {spend.payment_type}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Spend;
