import Category from "./../../models/categories.js";

const getCategoryByCategoryType = async (category_type) => {
    try {
        const resultGetId = await Spend.find({ category_type: category_type });
        return resultGetId;
    } catch (err) {
        console.log("❌ ERROR - THE SPEND COULD NOT BE FOUND");
        console.error(err);
        throw err;
    }
};

export default getCategoryByCategoryType;
