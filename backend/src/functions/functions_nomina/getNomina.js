import Nomina from "../../models/nomina.js";

const getNomina = async () => {
    try {
        // const userObjectId = new mongoose.Types.ObjectId();
        const resultGet = await Nomina.find({});

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE NOMINA COULD NOT BE FOUND | BBDD");
    }
};

export default getNomina;