import Category from "../../models/categories.js";
import mongoose from "mongoose";

const postCategory = async (newCategory) => {
    try {
        console.log("🔍 === DEBUGGING POSTCATEGORY FUNCTION ===");
        console.log("📋 FUNCTION RECEIVED:", newCategory);
        
        const { name, monthly_budget, total_acumulated = 0, color = "Blue", icon = "Point blue", user_id } = newCategory;
        
        console.log("👤 USER ID EXTRACTED:", user_id);
        console.log("🔍 USER ID TYPE:", typeof user_id);
        console.log("❓ USER ID EXISTS:", !!user_id);
        
        if (!user_id) {
            console.log("❌ USER ID IS MISSING OR FALSY IN FUNCTION");
            throw new Error("user_id is required");
        }
                
        let userIdParsed;
        try {
            userIdParsed = new mongoose.Types.ObjectId(user_id);
            console.log("✅ USER ID PARSED SUCCESSFULLY:", userIdParsed);
        } catch (error) {
            console.log("❌ INVALID USER ID FORMAT:", user_id);
            throw new Error("Invalid user_id format");
        }

        const categoryData = {
            name: name,
            monthly_budget: monthly_budget,
            total_acumulated: total_acumulated,
            color: color,
            icon: icon,
            user_id: userIdParsed
        };
        
        console.log("💾 DATA TO SAVE IN DB:", categoryData);

        const registreCategory = await Category.create(categoryData);

        console.log("✅ CATEGORY CREATED IN DB:", registreCategory);
        console.log("🆔 SAVED USER ID:", registreCategory.user_id);
        return registreCategory;
    } catch (err) {
        console.error(err);
        console.log("❌ ERROR - THE CATEGORY HAS NOT BEEN CREATED | BBDD");
        throw err;
    }
};

export default postCategory;
