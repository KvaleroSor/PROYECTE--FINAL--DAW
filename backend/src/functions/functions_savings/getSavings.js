import SavingGoal from './../../models/savings.js';

const getSavings = async (user_id) => {
    try {        
        const resultGet = await SavingGoal.find({ user_id });
        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE SAVINGS COULD NOT BE FOUND | BBDD");
        throw err;
    }
};

export default getSavings;
