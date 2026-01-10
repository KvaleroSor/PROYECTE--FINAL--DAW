import SavingGoal from './../../models/savings.js';

const processMonthlyContributions = async (user_id, savingFromNomina) => {
    try {
        // Obtener todas las metas activas del usuario
        const activeGoals = await SavingGoal.find({ 
            user_id, 
            status: 'active' 
        });

        const updates = [];

        for (const goal of activeGoals) {
            // Calcular la contribución mensual
            const monthlyContribution = (goal.percentage_allocation / 100) * savingFromNomina;
            
            // Actualizar el monto actual
            const newCurrentAmount = goal.current_amount + monthlyContribution;
            
            // Si alcanza el objetivo, marcar como completada
            const newStatus = newCurrentAmount >= goal.target_amount ? 'completed' : 'active';
            
            // Actualizar la meta
            const updated = await SavingGoal.findByIdAndUpdate(
                goal._id,
                {
                    current_amount: Math.min(newCurrentAmount, goal.target_amount),
                    status: newStatus,
                    updated_at: new Date()
                },
                { new: true }
            );

            updates.push(updated);
        }

        return {
            processed: updates.length,
            goals: updates
        };
    } catch (err) {
        console.log("❌ ERROR - MONTHLY CONTRIBUTIONS COULD NOT BE PROCESSED | BBDD");
        throw err;
    }
};

export default processMonthlyContributions;
