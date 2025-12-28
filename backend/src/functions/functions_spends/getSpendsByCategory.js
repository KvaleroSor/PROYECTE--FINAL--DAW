import Spend from "../../models/spends.js";

const getSpendsByCategory = async (category_id) => {
    try {
        const resultGetId = await Spend.find({category_id: category_id});
        return resultGetId;
    } catch (err) {
        console.log("❌ ERROR - THE SPEND COULD NOT BE FOUND");
        console.error(err);
        throw err;
    }
};

export default getSpendsByCategory;
