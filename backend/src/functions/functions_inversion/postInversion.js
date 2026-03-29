import Inversion from "./../../models/inversion.js";

const postInversion = async (newInversion) => {
    try {
        const {
            user_id,
            symbol,
            name,
            type,
            amount,
            inversion_date,
            target_profitability,
            real_profitability,
            total,
            initial_price,
        } = newInversion;

        const registerInversion = await Inversion.create({
            user_id: user_id,
            symbol: symbol,
            name: name,
            type: type,
            amount: amount,
            inversion_date: inversion_date,
            target_profitability: target_profitability,
            real_profitability: real_profitability,
            total: total,
            initial_price: initial_price,
        });

        return registerInversion;
    } catch (err) {
        console.error(err);
        console.log("❌ ERROR - THE INVERSION HAS NOT BEEN CREATED | BBDD");
        throw err;
    }
};

export default postInversion;
