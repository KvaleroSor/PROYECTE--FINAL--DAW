import PercentageSpend from "../../models/percentage_settings.js";

const updateSpendPercentage = async (id, data) => {
    try {
        const ressultUpdate = await PercentageSpend.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        return ressultUpdate;
    } catch (err) {
        console.log("❌ ERROR - THE SPEND PERCENTAGE HAS NOT BEEN UPDATED | BBDD");
        console.error(err);
        throw err;
    }
};

export default updateSpendPercentage;
