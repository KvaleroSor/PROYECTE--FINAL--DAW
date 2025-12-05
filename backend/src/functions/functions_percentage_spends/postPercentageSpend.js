import PercentageSpend from './../../models/percentage_settings.js';

const postSpendPercentage = async (newPercentageSpend) => {
    try {
        const { user_id, spend, leisureSpend, saving, inversion } =
            newPercentageSpend;

        const registerSpendPercentage = await PercentageSpend.create({
            user_id: user_id,
            spend: spend,
            leisureSpend: leisureSpend,
            saving: saving,
            inversion: inversion,
        });

        return registerSpendPercentage;
    } catch (err) {
        console.error(err);
        console.log(
            "❌ ERROR - THE SPEND PERCENTAGE HAS NOT BEEN CREATED | BBDD"
        );
        throw err;
    }
};

export default postSpendPercentage;
