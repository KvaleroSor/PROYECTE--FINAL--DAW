import SavingGoal from './../../models/savings.js';
import mongoose from "mongoose";

const getSavings = async (user_id) => {
    try {
        console.log("🔍 getSavings called with user_id:", user_id);
        
        if (!user_id) {
            throw new Error("user_id is required");
        }
        
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            throw new Error(`Invalid user_id format: ${user_id}`);
        }
        
        const userObjectId = new mongoose.Types.ObjectId(user_id);
        const resultGet = await SavingGoal.find({ user_id: userObjectId });
        console.log("✅ Savings found:", resultGet.length);
        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE SAVINGS COULD NOT BE FOUND | BBDD");
        throw err;
    }
};

export default getSavings;
