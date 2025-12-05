import Nomina from "./../../models/nomina.js";

const postNomina = async (newNomina) => {
    try {
        const { user_id, amount, frequency, payment_start_date } = newNomina;

        const registerNomina = await Nomina.create({
            user_id: user_id,
            amount: amount,
            frequency: frequency,
            payment_start_date: payment_start_date,
        });

        return registerNomina;
    } catch (err) {
        console.error(err);
        console.log("❌ ERROR - THE NOMINA HAS NOT BEEN CREATED | BBDD");
        throw err;
    }
};

export default postNomina;
