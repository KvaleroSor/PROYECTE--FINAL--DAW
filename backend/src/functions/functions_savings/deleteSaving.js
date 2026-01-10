import SavingGoal from './../../models/savings.js';

const deleteSaving = async (id) => {
    try {    
        const resultDelete = await SavingGoal.findByIdAndDelete(id);
        return resultDelete;
    } catch (err) {
        console.log("❌ ERROR - THE SAVING GOAL HAS NOT BEEN DELETED | BBDD");
        throw err;
    }
};

export default deleteSaving;
