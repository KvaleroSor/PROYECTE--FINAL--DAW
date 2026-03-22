import Spend from "./../../models/spends.js";
import Category from "./../../models/categories.js";

const deleteSpend = async (id) => {
    try {
        const spend = await Spend.findById(id);

        if (!spend) {
            console.log("❌ ERROR - SPEND NOT FOUND | BBDD");
            return null;
        }

        await Category.findByIdAndUpdate(spend.category_id, {
            $inc: { total_acumulated: -spend.amount },
        });

        const resultDelete = await Spend.findByIdAndDelete(id);

        return resultDelete;
    } catch (err) {
        console.log("❌ ERROR - THE SPEND HAS NOT BEEN DELETED | BBDD");
        console.log(err);
        throw err;
    }
};

export default deleteSpend;
