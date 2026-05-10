import { useState } from "react";
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
    Trash2,
    Edit,
} from "lucide-react";
import { useIconSpendCategory } from "@/app/hooks/spend/useIconSpendCategory.js";
import { useSpends } from "@/app/context/SpendContext.js";
import { useBlur } from "@/app/context/BlurContext";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useTranslations } from "next-intl";

const Spend = ({ spend, session }) => {
    const t = useTranslations("expenses");
    const tCommon = useTranslations("common");
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
        deleteSpend,
        isCategoryType,
        setIsSpend,
    } = useSpends();
    const { isIconSpendCategory, isCategoryName } = useIconSpendCategory(spend.category_id);
    const { isBlurred } = useBlur();
    const Icon = isIconSpendCategory;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClickUpdate = () => {
        setIsSpend(spend);
        setIsFormSpendOpen(true);
        setIsUpdatedPushed(true);

        console.log("IS SPEND DATE", (new Date(spend.date).toISOString().split('T')[0]));
        console.log("IS SPEND DATE", new Date(isSpendDate));
        console.log("SPEND DATE", spend);
    };

    const handleDeleteSpend = async () => {
        setIsDeleting(true);
        try {
            await deleteSpend(spend._id, session);
            setShowDeleteModal(false);
        } catch (err) {
            console.error("Error eliminando gasto:", err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div
                className="bg-white dark:bg-slate-700 rounded-xl shadow-xl hover:shadow-md transition-all duration-300 group overflow-hidden flex-shrink-0"
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
                            {isBlurred ? (
                                <p className="text-xl sm:text-2xl text-slate-900 dark:text-slate-100 font-medium blur-md select-none">
                                    € {spend.amount.toFixed(2)}
                                </p>
                            ) : (
                                <p className="text-xl sm:text-2xl text-slate-900 dark:text-slate-100 font-medium">
                                    € {spend.amount.toFixed(2)}
                                </p>
                            )}
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

                        {/* Botones de acción en hover */}
                        <div className="border-t border-slate-100 dark:border-slate-700 mt-3 pt-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-700 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    {t("deleteExpenseButton")}
                                </button>
                                <button
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm bg-slate-900 dark:bg-slate-600 hover:bg-slate-800 dark:hover:bg-slate-500 text-white rounded-lg transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClickUpdate();
                                    }}
                                >
                                    <Edit className="w-4 h-4" />
                                    {t("editExpenseButton")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de confirmación para eliminar gasto */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteSpend}
                title={t("deleteExpenseTitle")}
                message={t("deleteExpenseConfirm")}
                confirmText={tCommon("delete")}
                cancelText={tCommon("cancel")}
                type="danger"
                isLoading={isDeleting}
                itemDetails={{
                    [t("expenseDescription")]: spend.description,
                    [t("expenseCategory")]: isCategoryName,
                    [t("expenseAmount")]: `€${spend.amount.toFixed(2)}`,
                    [t("expenseDate")]: new Date(spend.date).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }),
                    [t("expensePaymentType")]: spend.payment_type || t("noPaymentType")
                }}
            />
        </>
    );
};

export default Spend;
