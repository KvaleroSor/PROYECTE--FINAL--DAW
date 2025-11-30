import Category from "../../models/categories.js";
import mongoose from "mongoose";

const getCategory = async (userId) => {
    try {
        console.log("🔍 SEARCHING FOR USER ID:", userId);
        console.log("🔍 USER ID TYPE:", typeof userId);
        
        // Convertir userId a ObjectId si es string
        const userObjectId = new mongoose.Types.ObjectId(userId);
        console.log("🔄 CONVERTED TO OBJECT ID:", userObjectId);
        console.log("🆔 OBJECT ID TYPE:", typeof userObjectId);
        
        const resultGet = await Category.find({user_id: userObjectId});
        
        console.log("📋 CATEGORIES FOUND:", resultGet.length);
        console.log("📋 CATEGORIES DATA:", resultGet);

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE CATEGORY COULD NOT BE FOUND | BBDD");
    }
};

export default getCategory;