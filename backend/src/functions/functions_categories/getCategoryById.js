import Category from "../../models/categories.js";

const getCategoryById = async (id) => {
    try{
        const resultGetId = await Category.findById(id);
        return resultGetId;
    }catch(err){
        console.log("❌ ERROR - THE CATEGORY COULD NOT BE FOUND");
        console.error(err);
        throw err;
    }
};

export default getCategoryById;