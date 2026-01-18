import Inversion from './../../models/inversion.js';

const getInversion = async (userId) => {
    try {        
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const resultGet = await Inversion.find({user_id: userObjectId});

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE INVERSION COULD NOT BE FOUND | BBDD");
    }
};

export default getInversion;
