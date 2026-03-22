import Spend from "../../models/spends.js";
import Category from "../../models/categories.js";

const updateSpend = async (id, data) => {
    try {
        const oldSpend = await Spend.findById(id);

        if (!oldSpend) {
            console.log("❌ ERROR - SPEND NOT FOUND | BBDD");
            return null;
        }

        const oldCategoryId = oldSpend.category_id.toString();
        const newCategoryId = data.category_id
            ? data.category_id.toString()
            : oldCategoryId;
        const oldAmount = oldSpend.amount;
        const newAmount = data.amount !== undefined ? data.amount : oldAmount;

        if (oldCategoryId !== newCategoryId) {
            await Category.findByIdAndUpdate(oldCategoryId, {
                $inc: { total_acumulated: -oldAmount },
            });

            await Category.findByIdAndUpdate(newCategoryId, {
                $inc: { total_acumulated: newAmount },
            });
        } else if (oldAmount !== newAmount) {
            const difference = newAmount - oldAmount;
            await Category.findByIdAndUpdate(oldCategoryId, {
                $inc: { total_acumulated: difference },
            });
        }

        const resultUpdate = await Spend.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        return resultUpdate;
    } catch (err) {
        console.log("❌ ERROR - THE SPEND HAS NOT BEEN UPDATED | BBDD");
        console.error(err);
        throw err;
    }
};

export default updateSpend;
