import SavingGoal from "./../../models/savings.js";

const updateSaving = async (id, updateData) => {
    try {
        updateData.updated_at = new Date();

        const resultUpdate = await SavingGoal.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            },
        );

        return resultUpdate;
    } catch (err) {
        console.log("❌ ERROR - THE SAVING GOAL HAS NOT BEEN UPDATED | BBDD");
        throw err;
    }
};

export default updateSaving;
