import Spend from "../../models/spends.js";

const updateSpend = async (id, data) => {
    try {
        const ressultUpdate = await Spend.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        return ressultUpdate;
    } catch (err) {
        console.log("❌ ERROR - THE SPEND HAS NOT BEEN UPDATED | BBDD");
        console.error(err);
        throw err;
    }
};

export default updateSpend;
