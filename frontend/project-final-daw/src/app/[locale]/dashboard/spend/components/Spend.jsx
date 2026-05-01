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
        setIsSpend,
    } = useSpends();
    const { isIconSpendCategory, isCategoryName } = useIconSpendCategory(spend.category_id);
    const Icon = isIconSpendCategory;

    const handleClickUpdate = () => {
        setIsSpend(spend);
        setIsFormSpendOpen(true);
        setIsUpdatedPushed(true);

        console.log("IS SPEND DATE", (new Date(spend.date).toISOString().split('T')[0]));
        console.log("IS SPEND DATE", new Date(isSpendDate));
        console.log("SPEND DATE", spend);
    };

    return (
        <>
            <div
                className="bg-white dark:bg-slate-700 rounded-xl shadow-xl hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden flex-shrink-0"
                onClick={handleClickUpdate}
            >
                <div className="flex">
                    {/* Línea de color lateral */}
                    <div className="w-1.5 bg-slate-800 dark:bg-slate-400"></div>

                    {/* Contenido */}
                    <div className="flex-1 p-3 sm:p-4 md:p-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-3 gap-2 sm:gap-0">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="dark:border-slate-600 pr-1 sm:pr-2 transition-transform duration-300 group-hover:rotate-12">
                                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-slate-700 dark:text-slate-300" />
                                </div>
                                <div>
                                    <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100">
                                        {spend.description}
                                    </p>
                                    <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                                        {isCategoryName}
                                    </p>
                                </div>
                            </div>
                            <p className="text-xl sm:text-2xl text-slate-900 dark:text-slate-100 font-medium">
                                € {spend.amount.toFixed(2)}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 sm:pt-3 border-t border-slate-100 dark:border-slate-700 gap-2 sm:gap-0">
                            <span className="text-sm sm:text-base text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                                {new Date(spend.date).toLocaleDateString("es-ES", {
                                    day: "2-digit",
                                    month: "long",
                                })}
                            </span>
                            {spend.payment_type && (
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500" />
                                    <span className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
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
