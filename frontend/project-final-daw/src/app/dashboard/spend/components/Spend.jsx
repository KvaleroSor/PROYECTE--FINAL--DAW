import {
    Plus,
    ShoppingCart,
    Home,
    Car,
    Utensils,
    Heart,
    Smartphone,
    Palette,
    Wifi,
    Coffee,
    Zap,
    Ban,
    Calendar,
    CreditCard,
    TriangleAlert,
} from "lucide-react";
import { useIconSpendCategory } from "@/app/hooks/spend/useIconSpendCategory.js";

const Spend = ({ spend, session}) => {
    // CREAR HOOK PARA DEVOLVER EL ICONO DE CADA CATEGORÍA --> Pasando category_id al hook
    // CREAR HOOK PARA DEVOLVER EL NOMBRE DE LA CATEGORÍA --> Pasando category_id al hook
    const { isIconSpendCategory, isCategoryName } = useIconSpendCategory(spend.category_id);

    const sideLineColors = [
        "bg-slate-800",
        "bg-slate-600",
        "bg-slate-500",
        "bg-slate-400",
        "bg-emerald-600",
    ];

    const sideLineColor = sideLineColors[1 % sideLineColors.length];
    const Icon = isIconSpendCategory;

    const handleClick = () => {
        console.log("ICON", Icon);
    }

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group overflow-hidden flex-shrink-0"
            onClick={handleClick}
            >
                <div className="flex">
                    {/* Línea de color lateral */}
                    <div className={`w-1.5 ${sideLineColor}`}></div>

                    {/* Contenido */}
                    <div className="flex-1 p-5">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <Icon className={`w-6 h-6`} />
                                <div>
                                    <p className="text-lg font-medium text-slate-900">
                                        {spend.description}
                                    </p>
                                    <p className="text-md text-slate-500">
                                        {isCategoryName}
                                    </p>
                                </div>
                            </div>
                            <p className="text-2xl text-slate-900 font-medium">
                                € {spend.amount.toFixed(2)}
                                
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <span className="text-md text-slate-500 flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                {new Date(spend.date).toLocaleDateString("es-ES", {
                                    day: "2-digit",
                                    month: "long",
                                })}
                            </span>
                            {spend.payment_type && (
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-slate-400" />
                                    <span className="text-md text-slate-600">
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
