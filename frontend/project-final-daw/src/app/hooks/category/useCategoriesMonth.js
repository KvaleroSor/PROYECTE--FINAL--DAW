import { useMemo } from "react";
import { useCategories } from "@/app/context/CategoryContext.js";
import { _length } from "../../../../.next/dev/server/chunks/ssr/6173e_zod_v4_ca76a929._";
import { FinancialProvider } from "@/app/context/FinancialContext.js";

export const useCategoriesMonth = () => {
    const { isCategories } = useCategories();

    const isCategoriesMonth = useMemo(
        () => {
            if (!isCategories || isCategories.length === 0) {
                return [];
            }

            const currenDate = new Date();
            const currentMont = currenDate.getMonth();
            const currentYear = currenDate.getFullYear();

            const totalCategoriesMonth = isCategories.filter((cat) => {
                const categoryDate = cat.date;
            });
        },
        { isCategories }
    );
};
