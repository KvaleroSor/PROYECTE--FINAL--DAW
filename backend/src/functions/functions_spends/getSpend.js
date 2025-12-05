import Spend from "../../models/spends.js";

const getSpend = async (user_id) => {
    try {
        const userObjectId = new mongoose.Types.ObjectId(user_id);
        const resultGet = await Spend.find({user_id: userObjectId});

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE SPEND COULD NOT BE FOUND | BBDD");
    }
};

export default getSpend;
