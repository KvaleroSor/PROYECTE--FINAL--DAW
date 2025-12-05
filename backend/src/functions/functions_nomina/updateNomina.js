import Nomina from "../../models/nomina.js";

const updateNomina = async (id, data) => {
    try {
        const ressultUpdate = await Nomina.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        return ressultUpdate;
    } catch (err) {
        console.log("❌ ERROR - THE NOMINA HAS NOT BEEN UPDATED | BBDD");
        console.error(err);
        throw err;
    }
};

export default updateNomina;
