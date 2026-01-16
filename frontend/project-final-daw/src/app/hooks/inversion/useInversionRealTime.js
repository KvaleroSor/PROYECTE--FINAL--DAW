import { useMemo } from "react";
import { useFinancial } from "@/app/context/FinancialContext";
import { useCategories } from "@/app/context/CategoryContext";
import { useInversion } from "@/app/context/InversionContext";

export const useInversionRealTime = () => {
    const { isInvestmentFromNomina } = useFinancial();
    const { isCategories } = useCategories();
    const { isInversions } = useInversion();

    const isTotalInversionRealTime = useMemo(() => {
        // 1. Obtener categorías de tipo "Imprevistos"
        const inversionCategories = (isCategories || []).filter(
            (cat) => cat.category_type === "Inversion"
        );
        const inversionCategoriesId = inversionCategories.map((cat) => cat._id);

        // 2. Filtrar inversiones del mes actual que sean de tipo "InversionSiguei"
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Filtrar las inversiones por fecha del mes actual
        const inversionAmount = (isInversions || []).filter((inversion) => {
            const inversionDate = new Date(inversion.inversion_date);
            return (
                inversionDate.getMonth() === currentMonth &&
                inversionDate.getFullYear() === currentYear
            );
        });

        // 3. Calcular total de inversion del mes actual
        const totalInversion = inversionAmount.reduce(
            (sum, inversion) => sum + (inversion.amount || 0),
            0
        );

        // 4. Calcular ahorro neto del mes actual (presupuesto - imprevistos)
        const amountNetoToInversion = Math.max(
            0,
            (isInvestmentFromNomina || 0) - totalInversion
        );        

        return Number(amountNetoToInversion).toFixed(2);
    }, [isInvestmentFromNomina, isInversions, isCategories]);    

    return { isTotalInversionRealTime };
};
