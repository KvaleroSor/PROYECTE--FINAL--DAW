import { useMemo } from "react";
import { useSpends } from "@/app/context/SpendContext";

export const useSpendsMonth = () => {
    const { isSpends } = useSpends();

    const isSpendsOfMonth = useMemo(() => {
        if (!isSpends || isSpends.length === 0) {
            return [];
        }

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const totalSpendMonth = isSpends.filter((spend) => {
            const spendDate = new Date(spend.date);
       
            return (
                spendDate.getMonth() === currentMonth &&
                spendDate.getFullYear() === currentYear
            );
        });

        console.log("🚀 IS SPENDS OF MONTH:", totalSpendMonth);        

        return totalSpendMonth;        

    }, [isSpends]);

    return { isSpendsOfMonth };
};
