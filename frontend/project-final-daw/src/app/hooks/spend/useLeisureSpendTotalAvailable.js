import { useMemo } from "react";
import { useFinancial } from "@/app/context/FinancialContext";
import { useCategories } from "@/app/context/CategoryContext";
import { useSpends } from "@/app/context/SpendContext";

export const useLeisureSpendTotalAvailable = () => {
    const { isLeisureExpensesFromNomina } = useFinancial();
    const { isCategories } = useCategories();
    const { isSpends } = useSpends();

    const isAvailableLeisure = useMemo(() => {
        if (!isSpends || !isCategories || !isLeisureExpensesFromNomina) {
            return Number(isLeisureExpensesFromNomina).toFixed(2);
        }

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        //Filtramos los gastos pero sin tener en cuenta si son "fijos" o "ocio" solo tenemos en cuenta la "fecha"
        const totalGastado = isSpends
            .filter((spend) => {
                const spendDate = new Date(spend.date);
                const category = isCategories.find((cat) => cat._id === spend.category_id);

                return (
                    category &&
                    category.category_type === "Gasto Ocio" &&
                    spendDate.getMonth() === currentMonth &&
                    spendDate.getFullYear() === currentYear
                );
            })
            .reduce((acc, spend) => acc + spend.amount, 0);

        return isLeisureExpensesFromNomina - totalGastado;
    }, [isSpends, isCategories, isLeisureExpensesFromNomina]);

    return { isAvailableLeisure };
};
