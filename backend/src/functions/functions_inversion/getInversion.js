import Inversion from './../../models/inversion.js';

const getInversion = async () => {
    try {        
        const resultGet = await Inversion.find({});

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE INVERSION COULD NOT BE FOUND | BBDD");
    }
};

export default getInversion;
