import SavingGoal from './../../models/savings.js';

const getSavingById = async (id) => {
    try {
        const resultGet = await SavingGoal.findById(id);
        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE SAVING GOAL COULD NOT BE FOUND | BBDD");
        throw err;
    }
};

export default getSavingById;
