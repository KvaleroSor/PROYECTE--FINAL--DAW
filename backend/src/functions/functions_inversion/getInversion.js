import Inversion from './../../models/inversion.js';
import mongoose from "mongoose";

const getInversion = async (userId) => {
    try {
        if (!userId) {
            throw new Error("userId is required");
        }
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error(`Invalid userId format: ${userId}`);
        }
        
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const resultGet = await Inversion.find({user_id: userObjectId});

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE INVERSION COULD NOT BE FOUND | BBDD");
    }
};

export default getInversion;
