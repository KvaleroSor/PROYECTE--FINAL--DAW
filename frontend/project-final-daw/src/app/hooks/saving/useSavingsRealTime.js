import { useMemo } from "react";
import { useFinancial } from "@/app/context/FinancialContext";
import { useCategories } from "@/app/context/CategoryContext";
import { useSpends } from "@/app/context/SpendContext";
import { useLeisureSpendTotalAvailable } from "@/app/hooks/spend/useLeisureSpendTotalAvailable.js";
import { useFixedSpendTotalAvailable } from "@/app/hooks/spend/useFixedSpendTotalAvailable.js";

export const useSavingsRealTime = (isTotalContributedAllTime = 0) => {
    const { isSavingFromNomina, isAhorroGeneral } = useFinancial();
    const { isCategories } = useCategories();
    const { isSpends } = useSpends();
    const { isAvailableLeisure } = useLeisureSpendTotalAvailable();
    const { isAvailableFixed } = useFixedSpendTotalAvailable();

    const isTotalSavingsRealTime = useMemo(() => {
        // 1. Obtener categorías de tipo "Imprevistos"
        const imprevistosCategories = (isCategories || []).filter(
            (cat) => cat.category_type === "Imprevistos"
        );
        const imprevisosCategoryIds = imprevistosCategories.map((cat) => cat._id);

        // 2. Filtrar gastos del mes actual que sean de tipo "Imprevistos"
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const imprevistosSpends = (isSpends || []).filter((spend) => {
            const spendDate = new Date(spend.date);
            return (
                imprevisosCategoryIds.includes(spend.category_id) &&
                spendDate.getMonth() === currentMonth &&
                spendDate.getFullYear() === currentYear
            );
        });

        // 3. Calcular total de gastos imprevistos del mes actual
        const totalImprevistos = imprevistosSpends.reduce(
            (sum, spend) => sum + (spend.amount || 0),
            0
        );

        // 4. Total ahorrado = ahorroGeneral (sobrantes + metas eliminadas) + contribuciones metas activas + sobrantes de gasto fijo + sobrantes de gasto ocio
        // NOTA: NO sumamos ahorroNetoMesActual porque ya está incluido en:
        // - isTotalContributedAllTime (contribuciones procesadas a metas)
        // - isAhorroGeneral (sobrante después de distribuir a metas)
        // Solo se debe sumar si las contribuciones del mes NO han sido procesadas aún
        const totalAhorrado =
            (isAhorroGeneral || 0) +
            (isTotalContributedAllTime || 0) +
            (isAvailableLeisure || 0) +
            (isAvailableFixed || 0);

        return Number(totalAhorrado).toFixed(2);
    }, [
        isTotalContributedAllTime,
        isSavingFromNomina,
        isSpends,
        isCategories,
        isAhorroGeneral,
        isAvailableLeisure,
        isAvailableFixed,
    ]);

    const isTotalImprevistosPercentatge = useMemo(() => {
        // 1. Obtener categorías de tipo "Imprevistos"
        const imprevistosCategories = (isCategories || []).filter(
            (cat) => cat.category_type === "Imprevistos"
        );
        const imprevisosCategoryIds = imprevistosCategories.map((cat) => cat._id);

        // 2. Filtrar gastos del mes actual que sean de tipo "Imprevistos"
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const imprevistosSpends = (isSpends || []).filter((spend) => {
            const spendDate = new Date(spend.date);
            return (
                imprevisosCategoryIds.includes(spend.category_id) &&
                spendDate.getMonth() === currentMonth &&
                spendDate.getFullYear() === currentYear
            );
        });

        // 3. Calcular total de gastos imprevistos del mes actual
        const totalImprevistos = imprevistosSpends.reduce(
            (sum, spend) => sum + (spend.amount || 0),
            0
        );

        return Number((totalImprevistos / isSavingFromNomina) * 100).toFixed(0);
    }, [isSavingFromNomina, isSpends, isCategories]);

    const isTotalImprevistos = useMemo(() => {
        // 1. Obtener categorías de tipo "Imprevistos"
        const imprevistosCategories = (isCategories || []).filter(
            (cat) => cat.category_type === "Imprevistos"
        );
        const imprevisosCategoryIds = imprevistosCategories.map((cat) => cat._id);

        // 2. Filtrar gastos del mes actual que sean de tipo "Imprevistos"
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const imprevistosSpends = (isSpends || []).filter((spend) => {
            const spendDate = new Date(spend.date);
            return (
                imprevisosCategoryIds.includes(spend.category_id) &&
                spendDate.getMonth() === currentMonth &&
                spendDate.getFullYear() === currentYear
            );
        });

        // 3. Calcular total de gastos imprevistos del mes actual
        const totalImprevistos = imprevistosSpends.reduce(
            (sum, spend) => sum + (spend.amount || 0),
            0
        );

        return Number(totalImprevistos).toFixed(0);
    }, [isSavingFromNomina, isSpends, isCategories]);

    return { isTotalSavingsRealTime, isTotalImprevistosPercentatge, isTotalImprevistos };
};
