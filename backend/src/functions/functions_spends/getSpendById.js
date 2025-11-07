import Spend from "../../models/spends.js";

const getSpendById = async (id) => {
    try{
        const resultGetId = await Spend.findById(id);
        return resultGetId;
    }catch(err){
        console.log("❌ ERROR - THE SPEND COULD NOT BE FOUND");
        console.error(err);
        throw err;
    }
};

export default getSpendById;