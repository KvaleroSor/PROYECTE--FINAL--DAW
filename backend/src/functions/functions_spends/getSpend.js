import Spend from "../../models/spends.js";
import mongoose from "mongoose";

const getSpend = async (user_id) => {
    try {
        console.log("🔍 getSpend called with user_id:", user_id);
        
        if (!user_id) {
            throw new Error("user_id is required");
        }
        
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            throw new Error(`Invalid user_id format: ${user_id}`);
        }
        
        const userObjectId = new mongoose.Types.ObjectId(user_id);
        console.log("🔑 ObjectId created:", userObjectId);
        
        const resultGet = await Spend.find({user_id: userObjectId});
        console.log("✅ Spends found:", resultGet.length);

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE SPEND COULD NOT BE FOUND | BBDD");
        console.error(err);
        throw err;
    }
};

export default getSpend;
