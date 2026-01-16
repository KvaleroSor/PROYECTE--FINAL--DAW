import SavingGoal from './../../models/savings.js';

const getContributionHistory = async (user_id) => {
    try {
        // Obtener todas las metas del usuario con su historial
        const goals = await SavingGoal.find({ user_id })
            .select('goal_name monthly_contributions_history total_contributed')
            .sort({ created_at: -1 });

        // Agrupar contribuciones por mes/año
        const contributionsByMonth = {};
        
        goals.forEach(goal => {
            if (goal.monthly_contributions_history) {
                goal.monthly_contributions_history.forEach(contribution => {
                    const key = `${contribution.year}-${contribution.month}`;
                    
                    if (!contributionsByMonth[key]) {
                        contributionsByMonth[key] = {
                            month: contribution.month,
                            year: contribution.year,
                            date: contribution.date,
                            totalAmount: 0,
                            goals: []
                        };
                    }
                    
                    contributionsByMonth[key].totalAmount += contribution.amount;
                    contributionsByMonth[key].goals.push({
                        goalName: goal.goal_name,
                        amount: contribution.amount
                    });
                });
            }
        });

        // Convertir a array y ordenar por fecha descendente
        const historyArray = Object.values(contributionsByMonth)
            .sort((a, b) => {
                if (a.year !== b.year) return b.year - a.year;
                return b.month - a.month;
            });

        return {
            history: historyArray,
            goals: goals.map(goal => ({
                goalName: goal.goal_name,
                totalContributed: goal.total_contributed || 0
            }))
        };
    } catch (err) {
        console.log("❌ ERROR - CONTRIBUTION HISTORY COULD NOT BE RETRIEVED | BBDD");
        throw err;
    }
};

export default getContributionHistory;
