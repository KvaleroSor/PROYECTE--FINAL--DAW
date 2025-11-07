import Spend from "../../models/spends.js";

const getSpend = async () => {
    try {
        const resultGet = await Spend.find({});

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE SPEND COULD NOT BE FOUND | BBDD");
    }
};

export default getSpend;
