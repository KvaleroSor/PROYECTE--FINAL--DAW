import Category from "../../models/categories.js";
import mongoose from "mongoose";

const getCategory = async (userId) => {
    try {            
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const resultGet = await Category.find({ user_id: userObjectId });

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE CATEGORY COULD NOT BE FOUND | BBDD");
    }
};

export default getCategory;
