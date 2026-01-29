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
import { useSpends } from "@/app/context/SpendContext.js";

const Spend = ({ spend, session }) => {
    const {
        //Estado
        isCategoryId,
        isDescription,
        isAmount,
        isPaymentType,
        isUpdatedPushed,
        isSpendDate,
        //Setters
        setIsFormSpendOpen,
        setIsCategoryId,
        setIsDescription,
        setIsAmount,
        setIsPaymentType,
        setIsUpdatedPushed,
        setIsCategoryType,
        setIsSpendDate,
        //Crud
        postNewSpend,
        isCategoryType,
    } = useSpends();
    const { isIconSpendCategory, isCategoryName } = useIconSpendCategory(spend.category_id);
    const Icon = isIconSpendCategory;

    const handleClickUpdate = () => {
        setIsFormSpendOpen(true);
        setIsCategoryId(spend.category_id);
        setIsDescription(spend.description);
        setIsAmount(spend.amount);
        setIsPaymentType(spend.payment_type);
        setIsUpdatedPushed(true);
        setIsSpendDate(new Date(spend.date).toISOString().split('T')[0]);

        console.log("IS SPEND DATE", (new Date(spend.date).toISOString().split('T')[0]));
        console.log("IS SPEND DATE", new Date(isSpendDate));
    };

    return (
        <>
            <div
                className="bg-white dark:bg-slate-700 rounded-xl shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden flex-shrink-0"
                onClick={handleClickUpdate}
            >
                <div className="flex">
                    {/* Línea de color lateral */}
                    <div className="w-1.5 bg-slate-800 dark:bg-slate-400"></div>

                    {/* Contenido */}
                    <div className="flex-1 p-5">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="dark:border-slate-600 pr-2 transition-transform duration-300 group-hover:rotate-12">
                                    <Icon className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
                                        {spend.description}
                                    </p>
                                    <p className="text-md text-slate-500 dark:text-slate-400">
                                        {isCategoryName}
                                    </p>
                                </div>
                            </div>
                            <p className="text-2xl text-slate-900 dark:text-slate-100 font-medium">
                                € {spend.amount.toFixed(2)}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                            <span className="text-md text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                {new Date(spend.date).toLocaleDateString("es-ES", {
                                    day: "2-digit",
                                    month: "long",
                                })}
                            </span>
                            {spend.payment_type && (
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                                    <span className="text-md text-slate-600 dark:text-slate-400">
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
