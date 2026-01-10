import SavingGoal from './../../models/savings.js';

const postSaving = async (newSaving) => {
    try {
        const { 
            user_id, 
            goal_name, 
            description,
            target_amount, 
            current_amount,
            percentage_allocation, 
            deadline,
            priority,
            status
        } = newSaving;
        
        const registerSaving = await SavingGoal.create({
            user_id,
            goal_name,
            description,
            target_amount,
            current_amount: current_amount || 0,
            percentage_allocation,
            deadline,
            priority: priority || "medium",
            status: status || "active"
        });
    
        return registerSaving;
    } catch (err) {
        console.error(err);
        console.log("❌ ERROR - THE SAVING GOAL HAS NOT BEEN CREATED | BBDD");
        throw err;
    }
};

export default postSaving;
