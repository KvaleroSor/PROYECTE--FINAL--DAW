import SavingGoal from "./../../models/savings.js";
import User from "./../../models/users.js";
import Spend from "./../../models/spends.js";
import Category from "./../../models/categories.js";

const processMonthlyContributions = async (user_id, savingFromNomina) => {
    try {
        // Calcular gastos imprevistos del mes actual
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Obtener categorías de tipo "Imprevistos"
        const imprevistosCategories = await Category.find({
            user_id,
            category_type: "Imprevistos",
        });

        const imprevistosCategoryIds = imprevistosCategories.map(
            (cat) => cat._id,
        );

        // Obtener gastos de imprevistos del mes actual
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const endOfMonth = new Date(
            currentYear,
            currentMonth + 1,
            0,
            23,
            59,
            59,
        );

        const imprevistosSpends = await Spend.find({
            user_id,
            category_id: { $in: imprevistosCategoryIds },
            date: { $gte: startOfMonth, $lte: endOfMonth },
        });

        const totalImprevistos = imprevistosSpends.reduce(
            (sum, spend) => sum + spend.amount,
            0,
        );

        // Calcular ahorro neto (restando imprevistos)
        const netSaving = Math.max(0, savingFromNomina - totalImprevistos);

        console.log(`💰 Ahorro bruto: €${savingFromNomina}`);
        console.log(`⚠️  Imprevistos: €${totalImprevistos}`);
        console.log(`✅ Ahorro neto: €${netSaving}`);

        // Obtener todas las metas activas del usuario
        const activeGoals = await SavingGoal.find({
            user_id,
            status: "active",
        });

        const updates = [];

        for (const goal of activeGoals) {
            // Verificar si ya existe una contribución para este mes/año
            const existingContribution =
                goal.monthly_contributions_history?.find(
                    (contribution) =>
                        contribution.month === currentMonth &&
                        contribution.year === currentYear,
                );

            if (existingContribution) {
                console.log(
                    `⚠️ Ya existe una contribución para ${goal.goal_name} en ${currentMonth + 1}/${currentYear}. Saltando...`,
                );
                continue; // Saltar esta meta, ya tiene contribución este mes
            }

            // Calcular la contribución mensual USANDO AHORRO NETO (después de imprevistos)
            const monthlyContribution =
                (goal.percentage_allocation / 100) * netSaving;

            // Actualizar el monto actual
            const newCurrentAmount = goal.current_amount + monthlyContribution;

            // Si alcanza el objetivo, marcar como completada
            const newStatus =
                newCurrentAmount >= goal.target_amount ? "completed" : "active";

            // Crear registro de contribución histórica
            const newContribution = {
                date: currentDate,
                amount: monthlyContribution,
                month: currentMonth,
                year: currentYear,
            };

            // Actualizar la meta con historial
            const updated = await SavingGoal.findByIdAndUpdate(
                goal._id,
                {
                    current_amount: Math.min(
                        newCurrentAmount,
                        goal.target_amount,
                    ),
                    status: newStatus,
                    total_contributed:
                        (goal.total_contributed || 0) + monthlyContribution,
                    $push: { monthly_contributions_history: newContribution },
                    updated_at: new Date(),
                },
                { new: true },
            );

            updates.push(updated);
            console.log(
                `✅ Contribución procesada para ${goal.goal_name}: €${monthlyContribution.toFixed(2)}`,
            );
        }

        // Calcular cuánto se distribuyó a las metas
        const totalDistributed = updates.reduce((sum, goal) => {
            const lastContribution =
                goal.monthly_contributions_history[
                    goal.monthly_contributions_history.length - 1
                ];
            return sum + (lastContribution?.amount || 0);
        }, 0);

        // El sobrante va a ahorroGeneral
        const remainingSavings = netSaving - totalDistributed;

        console.log(`📊 Ahorro neto: €${netSaving}`);
        console.log(`📊 Total distribuido a metas: €${totalDistributed}`);
        console.log(`📊 Sobrante para ahorroGeneral: €${remainingSavings}`);

        if (remainingSavings > 0) {
            await User.findByIdAndUpdate(
                user_id,
                { $inc: { ahorroGeneral: remainingSavings } },
                { new: true },
            );
            console.log(
                `💰 Añadido ${remainingSavings}€ al ahorroGeneral del usuario`,
            );
        } else {
            console.log(
                `⚠️ No hay sobrante para ahorroGeneral (remainingSavings: ${remainingSavings})`,
            );
        }

        return {
            processed: updates.length,
            goals: updates,
        };
    } catch (err) {
        console.log(
            "❌ ERROR - MONTHLY CONTRIBUTIONS COULD NOT BE PROCESSED | BBDD",
        );
        throw err;
    }
};

export default processMonthlyContributions;
