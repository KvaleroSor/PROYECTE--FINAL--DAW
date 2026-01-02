import Spend from "./../../models/spends.js";
import Category from "./../../models/categories.js";

const postSpend = async (newSpend) => {
    try {
        const {
            user_id,
            category_id,
            description,
            amount,
            date,
            payment_type = "Tarjeta",
        } = newSpend;

        const registerSpend = await Spend.create({
            user_id: user_id,
            category_id: category_id,
            description: description,
            amount: amount,
            date: date,
            payment_type: payment_type,
        });

        if (registerSpend)
            await Category.findByIdAndUpdate(category_id, {
                $inc: { total_acumulated: amount },
            });

        return registerSpend;
    } catch (err) {
        console.error(err);
        console.log("❌ ERROR - THE EXPENSE HAS NOT BEEN CREATED | BBDD");
        throw err;
    }
};

export default postSpend;
