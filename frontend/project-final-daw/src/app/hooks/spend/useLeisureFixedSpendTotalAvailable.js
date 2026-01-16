import { useMemo } from "react";
import { useFinancial } from "@/app/context/FinancialContext";
import { useCategories } from "@/app/context/CategoryContext";
import { useSpends } from "@/app/context/SpendContext";

export const useLeisureFixedSpendTotalAvailable = () => {
    const { isTotalAmountToSpendFixedAndLeisure } = useFinancial();
    const { isCategories } = useCategories();
    const { isSpends } = useSpends();

    const isAvailableFixedAndLeisure = useMemo(() => {
        if (
            !isSpends ||
            !isCategories ||
            !isTotalAmountToSpendFixedAndLeisure
        ) {
            return Number(isTotalAmountToSpendFixedAndLeisure).toFixed(2);
        }

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const totalGastado = isSpends
            .filter((spend) => {
                const spendDate = new Date(spend.date);
                const category = isCategories.find(
                    (cat) => cat._id === spend.category_id
                );

                return (
                    category &&
                    (category.category_type === "Gasto Fijo" ||
                        category.category_type === "Gasto Ocio") &&
                    spendDate.getMonth() === currentMonth &&
                    spendDate.getFullYear() === currentYear
                );
            })
            .reduce((acc, spend) => acc + spend.amount, 0);

        return Number(
            isTotalAmountToSpendFixedAndLeisure - totalGastado
        ).toFixed(2);
    }, [isSpends, isCategories, isTotalAmountToSpendFixedAndLeisure]);

    return { isAvailableFixedAndLeisure };
};
