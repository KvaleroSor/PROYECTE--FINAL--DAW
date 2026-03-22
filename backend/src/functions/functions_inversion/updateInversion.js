import Inversion from "./../../models/inversion.js";

const updateInversion = async (id, data) => {
    try {
        const resultUpdate = await Inversion.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        return resultUpdate;
    } catch (err) {
        console.log("❌ ERROR - THE INVERSION HAS NOT BEEN UPDATED | BBDD");
        console.error(err);
        throw err;
    }
};

export default updateInversion;
