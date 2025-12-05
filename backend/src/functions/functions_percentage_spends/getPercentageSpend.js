import PercentageSpend from "./../../models/percentage_settings.js";

const getSpendPercentage = async () => {
    try {
        // const userObjectId = new mongoose.Types.ObjectId();
        const resultGet = await PercentageSpend.find({});

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE SPEND PERCENTAGE COULD NOT BE FOUND | BBDD");
    }
};

export default getSpendPercentage;